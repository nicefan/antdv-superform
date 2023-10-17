<script lang="ts">
import { PropType, h, provide, reactive, readonly, ref, watch } from 'vue'
import { cloneDeep } from 'lodash-es'
import { resetFields, setFieldsValue } from '../utils/fields'
import { buildModelsMap, useControl } from '../utils'
import Collections from './Collections'
import base from './base'
import { ButtonGroup } from './buttons'

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
    const modelData = ref(props.source || {})
    const { buttons, ignoreRules } = props.option
    let subItems = props.option.subItems
    if (buttons) {
      subItems = [
        ...subItems,
        {
          type: 'InfoSlot',
          isBlock: true,
          align: 'center',
          colProps: { flex: 'auto' },
          render: () => h(ButtonGroup, { config: buttons, param: { ...effectData, formRef: exposeData } }),
        },
      ]
    }

    const { modelsMap, initialData } = buildModelsMap(subItems, modelData)
    provide('exaProvider', { data: readonly(modelData), ignoreRules })
    const effectData = reactive({ formData: modelData, current: modelData })

    const { attrs } = useControl({ option: props.option, effectData })

    const actions = {
      dataSource: modelData,
      submit: () => {
        return formRef.value.validate().then((...args) => {
          const data = cloneDeep(modelData.value)
          emit('submit', data)
          return data
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
        return data
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
    provide('rootSlots', slots)

    return () =>
      h(
        base.Form,
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
