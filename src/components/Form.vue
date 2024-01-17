<script lang="ts">
import { type PropType, h, provide, inject, reactive, readonly, ref, watch } from 'vue'
import { cloneDeep } from 'lodash-es'
import { resetFields, setFieldsValue } from '../utils/fields'
import { buildModelsMap, useControl } from '../utils'
import Collections from './Collections'
import base from './base'
import { message } from 'ant-design-vue'

export default {
  name: 'SuperForm',
  props: {
    option: {
      required: true,
      type: Object as PropType<GetOption<'Form'>>,
    },
    source: {
      type: Object,
    },
    /** 按钮事件 */
    methods: Object,
    disabled: null as any,
    ignoreRules: {
      default: (raw) => raw.option.ignoreRules,
      type: Boolean,
    },
    compact: {
      default: (raw) => raw.option.compact,
      type: Boolean,
    },
  },
  // emits: ['register', 'submit', 'reset'],
  setup(props, { expose, emit, slots: ctxSlots }) {
    const formRef = ref()
    const modelData = ref(props.source || {})
    const {
      option: { onSubmit, onReset, ...option },
      ignoreRules,
      compact,
    } = props

    const { modelsMap, initialData } = buildModelsMap(option.subItems, modelData)
    const effectData = reactive({ formData: modelData, current: modelData })
    const { attrs } = useControl({ option, effectData })

    const submitHandlers = new Set<Fn>()

    // 子组件表单提交时校验拦截
    const submitRegister = (fn?: Fn<undefined | false | ({ errMessage: string } & Obj) | Awaited<any>>) => {
      fn && submitHandlers.add(fn)
    }
    submitRegister(onSubmit)

    provide('exaProvider', {
      data: readonly(modelData),
      attrs,
      onSubmit: submitRegister,
    })

    const submitValidate = (data) =>
      Promise.all(
        [...submitHandlers].map(async (fn) => {
          const validate = await fn(data)
          if (validate === false || (validate && validate.errMessage)) {
            return Promise.reject({ message: validate && validate.errMessage })
          } else {
            return validate
          }
        })
      )

    if (ignoreRules) {
      Object.assign(attrs, { hideRequiredMark: true, validateTrigger: 'none' })
    }
    const actions = {
      dataSource: modelData,
      submit: () => {
        return formRef.value.validate().then((...args) => {
          return submitValidate(modelData.value).then(
            () => {
              const data = cloneDeep(modelData.value)
              emit('submit', data)
              return data
            },
            (err) => {
              typeof err === 'object' && err.message && message.error(err.message)
              return Promise.reject(err)
            }
          )
        })
      },
      setFieldsValue(data) {
        formRef.value?.clearValidate()
        return setFieldsValue(modelData.value, data)
      },
      resetFields(defData = initialData) {
        resetFields(modelData.value, defData)
        formRef.value?.clearValidate()
        const data = cloneDeep(modelData.value)
        emit('reset', data)
        return onReset ? onReset(data) : data
      },
    }

    watch(
      () => props.source,
      (data) => {
        if (data) {
          formRef.value?.clearValidate()
          modelData.value = data
        }
      }
    )

    const exposeData = reactive({ ...actions })
    const getForm = (form) => {
      if (!form) {
        // 销毁时返回null
        emit('register', null)
        return
      }
      Object.assign(exposeData, form, actions)
      formRef.value = form
      emit('register', exposeData)
    }
    expose(exposeData)
    const rootSlots = inject('rootSlots', {})
    const { default: defaultSlot, ...__slots } = ctxSlots
    Object.assign(rootSlots, __slots)
    provide('rootSlots', rootSlots)

    const slots = { ...__slots }
    if (option.slots) {
      Object.entries(option.slots).forEach(([key, value]) => {
        slots[key] = typeof value === 'string' ? rootSlots[value] : value
      })
    }

    return () =>
      h(
        base.Form,
        {
          ref: getForm,
          class: ['sup-form', compact && 'sup-form-compact'],
          model: modelData.value,
          labelAlign: 'right',
          ...attrs,
        },
        {
          ...slots,
          default: () => [
            h(Collections, {
              option,
              model: { refData: modelData, children: modelsMap },
              effectData,
              disabled: attrs.disabled,
            }),
            defaultSlot?.(),
          ],
        }
      )
  },
}
</script>
<style src="./style.module.scss" module></style>
