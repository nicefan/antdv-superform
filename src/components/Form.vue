<script lang="ts">
import { type PropType, h, provide, reactive, readonly, ref, shallowRef, onBeforeUnmount, unref, watch } from 'vue'
import { cloneDeep } from 'lodash-es'
import { resetFields, setFieldsValue } from '../utils/fields'
import { buildModelsMap, useControl } from '../utils'
import Collections from './Collections'
import { ButtonGroup } from './buttons'
import { getUIRender, getUIService } from '../adapter'

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
    const formRef = shallowRef()
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
      if (!fn) return
      submitHandlers.add(fn)
      return () => submitHandlers.delete(fn)
    }

    const validateField = async (path: (string | number)[]) => {
      // 挂载前或空路径不能触发校验，避免底层将空路径解释为整表校验。
      if (!formRef.value || ignoreRules || !path.length) return
      const service = getUIService('form')
      if (!service.validateField) throw new Error('当前 UIAdapter 未实现 form.validateField')
      await service.validateField(formRef.value, path)
    }
    const clearValidate = () => {
      if (formRef.value) getUIService('form').clearValidate(formRef.value)
    }

    provide('exaProvider', {
      data: readonly(modelData),
      attrs,
      onSubmit: submitRegister,
      validateField,
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
      getNativeInstance: () => formRef.value,
      async validate() {
        if (!formRef.value) throw new Error('表单尚未挂载或已卸载')
        await getUIService('form').validate(formRef.value)
      },
      validateField,
      clearValidate,
      async submit() {
        await actions.validate()
        try {
          await submitValidate(modelData.value)
        } catch (err) {
          // 只提示业务拦截错误；字段校验仍由 UI 表单就地展示。
          if (err && typeof err === 'object' && 'message' in err && err.message) {
            getUIService('services').message('error', err.message)
          }
          throw err
        }
        const data = cloneDeep(modelData.value)
        emit('submit', data)
        return data
      },
      setFieldsValue(data) {
        clearValidate()
        return setFieldsValue(modelData.value, data, initialData)
      },
      resetFields(data: Obj = {}) {
        resetFields(modelData.value, data, initialData)
        clearValidate()
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
          clearValidate()
          modelData.value = data
        }
      },
      { immediate: true, flush: 'sync' }
    )

    const exposeData = reactive({ ...actions })
    const getForm = (form) => {
      formRef.value = form
      if (!form) {
        // 销毁时返回null
        emit('register', null)
        return
      }
      emit('register', exposeData)
    }
    onBeforeUnmount(() => {
      submitHandlers.clear()
      formRef.value = undefined
    })
    expose(exposeData)

    return () =>
      getUIRender('form')(
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
