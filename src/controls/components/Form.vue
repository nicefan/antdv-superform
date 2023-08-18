<template>
  <AForm :ref="getForm" :class="['exa-form', option.compact && 'exa-form-compact']" :model="modelData" v-bind="attrs">
    <Collections :option="option" :model="model" :disabled="attrs.disabled" />
    <ARow v-if="option.buttons" justify="end">
      <ButtonGroup :config="option.buttons" :methods="methods" :param="{ ...effectData, formRef }" />
    </ARow>
    <slot />
  </AForm>
</template>
<script lang="ts">
import { resetFields, setFieldsValue } from '../../utils/fields'
import { buildModelsMap } from '../../utils/buildModel'
import { PropType, provide, reactive, readonly, ref, watch } from 'vue'
import baseComp from '../override'
import Collections from '../Collections'
import { ButtonGroup } from '../buttons'
import { cloneDeep } from 'lodash-es'
import useControl from '../useControl'

export default {
  name: 'ExaForm',
  components: {
    AForm: baseComp.Form,
    ARow: baseComp.Row,
    Collections,
    ButtonGroup,
  },
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
  setup(props, { expose, emit }) {
    const formRef = ref()
    const modelData = ref({})

    const { subItems, buttons, ignoreRules } = props.option
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

    return {
      formRef,
      getForm,
      modelData,
      model: {
        refData: modelData,
        children: modelsMap,
      },
      attrs,
      effectData,
      rules,
    }
  },
}
</script>
<style src="./style.module.scss" module></style>
