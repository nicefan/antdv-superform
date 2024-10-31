<script lang="ts">
import { type PropType, h, provide, inject, reactive, readonly, ref, watch, toRef } from 'vue'
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
    dataSource: Object,
    /** 按钮事件 */
    methods: Object,
    ignoreRules: {
      default: (raw) => raw.option.ignoreRules,
      type: Boolean,
    },
    compact: {
      default: (raw) => raw.option.compact,
      type: Boolean,
    },
  },
  emits: ['register', 'submit', 'reset'],
  setup(props, { expose, emit, slots: ctxSlots }) {
    const formRef = ref()
    const modelData = props.dataSource ? toRef(props, 'dataSource') : ref(props.option.dataSource || {})
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
    // submitRegister(onSubmit)

    provide('exaProvider', {
      data: readonly(modelData),
      attrs,
      onSubmit: submitRegister,
    })

    const submitValidate = (data) =>
      Promise.all(
        [...submitHandlers, onSubmit].map(async (fn) => {
          const validate = await fn?.(data)
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
        return setFieldsValue(modelData.value, data, initialData)
      },
      resetFields(data: Obj = {}) {
        resetFields(modelData.value, data, initialData)
        formRef.value?.clearValidate()
        const cloneData = cloneDeep(modelData.value)
        emit('reset', cloneData)
        return onReset ? onReset(cloneData) : cloneData
      },
    }

    // watch(
    //   () => props.dataSource,
    //   (data) => {
    //     if (data) {
    //       formRef.value?.clearValidate()
    //       modelData.value = data
    //     }
    //   }
    // )

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
          ...ctxSlots,
          default: () =>
            h(Collections, {
              option,
              model: { refData: modelData, children: modelsMap },
              effectData,
            }),
        }
      )
  },
}
</script>
<style src="./style.module.scss" module></style>
