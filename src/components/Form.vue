<script lang="ts">
import { type PropType, h, provide, reactive, readonly, ref, unref, watch } from 'vue'
import { cloneDeep } from 'lodash-es'
import { resetFields, setFieldsValue } from '../utils/fields'
import { buildModelsMap, useControl } from '../utils'
import Collections from './Collections'
import { message } from '../compat/antdv'
import { ButtonGroup } from './buttons'
import { clearUIFormValidation, renderUIForm, validateUIForm } from '../adapter'

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
    const modelData = ref<Obj>({})
    const {
      option: { onSubmit, onReset, buttons, ...option },
      ignoreRules,
      compact,
    } = props

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
    provide('inheritOptions', {
      disabled: attrs.disabled,
      subSpan: option.subSpan,
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
        return validateUIForm(formRef.value).then((...args) => {
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
        formRef.value && clearUIFormValidation(formRef.value)
        return setFieldsValue(modelData.value, data, initialData)
      },
      resetFields(data: Obj = {}) {
        resetFields(modelData.value, data, initialData)
        formRef.value && clearUIFormValidation(formRef.value)
        const cloneData = cloneDeep(modelData.value)
        onReset?.(cloneData as Obj)
        emit('reset', cloneData)
        return cloneData
      },
    }

    const buttonsConfig: any = Array.isArray(buttons) ? { actions: buttons } : buttons
    if (buttonsConfig?.actions?.length) {
      option.subItems = [
        ...option.subItems,
        {
          type: 'InfoSlot',
          align: buttonsConfig.align || 'center',
          block: true,
          render: () =>
            h(ButtonGroup, {
              option: buttonsConfig,
              methods: {
                submit: actions.submit,
                reset: actions.resetFields,
                search: actions.submit,
              },
              effectData,
            }),
          ...(buttonsConfig.placement === 'inline' && {
            span: 'auto',
            block: false,
            align: buttonsConfig.align || 'right',
          }),
        },
      ]
    }

    const { modelsMap } = buildModelsMap(option.subItems, modelData)
    const initialData = cloneDeep(modelData.value)
    watch(
      () => unref(props.dataSource ?? props.option.dataSource),
      (data) => {
        if (data) {
          formRef.value && clearUIFormValidation(formRef.value)
          modelData.value = data
        }
      },
      { immediate: true, flush: 'sync' }
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

    return () =>
      renderUIForm(
        {
          ref: getForm,
          class: ['sup-form', compact && 'sup-form-compact', ignoreRules && 'sup-form-simple'],
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
