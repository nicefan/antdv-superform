<script lang="ts">
import { resetFields, setFieldsValue } from '../../utils/fields'
import { buildModelsMap } from '../../utils/buildModel'
import { PropType, h, provide, reactive, readonly, ref, watch } from 'vue'
import baseComp from '../override'
import Collections from '../Collections'
import { ButtonGroup } from '../buttons'
import { cloneDeep } from 'lodash-es'
import useControl from '../useControl'

export default {
  name: 'ExaForm',
  props: {
    option: {
      required: true,
      type: Object as PropType<ExFormOption>,
    },
    source: {
      type: Object,
    },
    /** 按钮事件 */
    methods: Object,
  },
  emits: ['register', 'submit', 'reset'],
  setup(props, { expose, emit, slots }) {
    const formRef = ref()
    const modelData = ref({})

    let { subItems, buttons, ignoreRules } = props.option
    const buttonsConfig = Array.isArray(buttons) ? { actions: buttons } : { ...buttons }
    if (buttonsConfig.actions?.length) {
      subItems = [
        ...subItems,
        {
          type: 'InfoSlot',
          isBlock: true,
          align: 'center',
          colProps: { flex: 'auto' },
          render: () => h(ButtonGroup, { config: buttonsConfig, param: { ...effectData, formRef } }),
        },
      ]
    }

    const { modelsMap, rules, initialData } = buildModelsMap(subItems, modelData)
    provide('exaProvider', { data: readonly(modelData), ignoreRules })
    const effectData = reactive({ formData: modelData, current: modelData })

    const { attrs } = useControl({ option: props.option, effectData })

    const actions = {
      submit: () => {
        return formRef.value.validate().then((...args) => {
          const data = cloneDeep(modelData.value)
          emit('submit', data)
          return data
        })
      },
      setFieldsValue(data) {
        return setFieldsValue(modelData.value, data)
      },
      resetFields(defData = initialData) {
        resetFields(modelData.value, defData)
        formRef.value?.clearValidate()
        const data = cloneDeep(modelData.value)
        emit('reset', data)
        return data
      },
    }

    watch(
      () => props.source,
      (data) => data && actions.resetFields(data),
      { immediate: true }
    )

    expose(actions)
    const getForm = (form) => {
      if (!form) return
      const obj = { ...form, ...actions }
      if (formRef.value) {
        Object.assign(formRef.value, obj)
      } else {
        formRef.value = reactive(obj)
        emit('register', formRef.value)
      }
    }
    provide('rootSlots', slots)

    return () =>
      h(
        baseComp.Form,
        {
          ref: getForm,
          class: ['exa-form', props.option.compact && 'exa-form-compact'],
          model: modelData.value,
          ...attrs,
        },
        {
          ...slots,
          default: () => [
            h(Collections, { option: props.option, model: { refData: modelData, children: modelsMap } }),
            // buttons &&
            //   h(baseComp.Row, { justify: 'end' }, () =>
            //     h(ButtonGroup, { config: buttons, param: { ...effectData, formRef } })
            //   ),
            slots.default?.(),
          ],
        }
      )
  },
}
</script>
<style src="./style.module.scss" module></style>
