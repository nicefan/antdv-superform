<template>
  <AForm
    :ref="getForm"
    :class="['exa-form', option.compact && 'exa-form-compact']"
    :model="model"
    :rules="!option.ignoreRules ? modelData.rules : undefined"
    v-bind="option.attrs"
  >
    <Collections :option="option" :children="modelsMap" />
    <ARow v-if="option.buttons" justify="end">
      <ButtonGroup :config="option.buttons" :methods="methods" :param="{ formData: model, formRef }" />
    </ARow>
    <slot />
  </AForm>
</template>
<script lang="ts">
import { buildModelMaps, setFieldsValue } from '../../utils/util'
import { PropType, computed, nextTick, onMounted, reactive, ref, toRaw, toRefs, watch } from 'vue'
import baseComp from '../override'
import Collections from '../Collections'
import { ButtonGroup } from '../buttons'

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
      type: Object as PropType<FormOption>,
    },
    rules: {
      type: Object,
      default: () => {},
    },
    model: {
      type: Object,
      required: true,
    },
    /** 按钮事件 */
    methods: Object,
  },
  emits: ['register'],
  setup(props, { expose, emit }) {
    const formRef = ref()
    const modelData = {
      rules: props.rules || {},
      parent: props.model,
    }
    const { subItems, buttons } = props.option
    const modelsMap = buildModelMaps(subItems, modelData)

    const actions = {
      onSubmit: () => {
        return formRef.value.validate().then((...args) => {
          console.log(args)
          return toRaw(props.model)
        })
      },
      setFieldsValue(data) {
        return setFieldsValue(modelsMap, data)
      },
    }

    watch(() => props.model, actions.setFieldsValue)

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
      modelsMap,
      modelData,
    }
  },
}
</script>
<style src="./style.module.scss" module></style>
