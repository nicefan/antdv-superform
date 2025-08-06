<script lang="ts">
import base from './base'
import { toNode, getIconNode } from '../utils'
import { defineComponent, h, reactive, ref, toRef, type PropType } from 'vue'
import { isFunction, isObject, isString } from 'lodash-es'

// const { InputSearch, Button } = baseComps

export default defineComponent({
  props: {
    option: {
      required: true,
      type: Object as PropType<GetOption<'Input'>>,
    },
    model: Object,
    effectData: Object,
    addonAfter: undefined as any,
    enterButton: undefined as any,
    onSearch: Function as PropType<Fn>,
    disabled: Boolean,
  },
  setup(props, { slots }) {
    const { option, effectData, addonAfter, enterButton, onSearch } = props

    const attrs: Obj = reactive({
      placeholder: '请输入' + (isString(option.label) ? option.label : ''),
      disabled: toRef(props, 'disabled'),
    })
    if (onSearch) {
      const loading = ref(false)
      const { addonAfter: addonAfterSlot, ...slotsRest } = slots
      let enterButtonSlot = (slots.enterButton || (enterButton ? undefined : addonAfterSlot)) as Fn | undefined

      const enterButtonProp = enterButton || addonAfter
      if (!enterButtonSlot) {
        if (isObject(enterButtonProp)) {
          const { label, icon, ...rest } = enterButton as any
          enterButtonSlot = () =>
            h(
              base.Button,
              { loading: loading.value, ...rest },
              { icon: () => getIconNode(icon), default: () => toNode(label) }
            )
        } else if (isFunction(enterButtonProp)) {
          enterButtonSlot = () => h(base.Button, { type: 'primary', loading: loading.value }, enterButtonProp)
        }
      }
      attrs.onSearch = async (...args) => {
        loading.value = true
        try {
          await onSearch?.(...args)
        } finally {
          loading.value = false
        }
      }
      if (enterButtonSlot) {
        return () => h(base.InputSearch, attrs, { ...slotsRest, enterButton: enterButtonSlot })
      }
      return () => h(base.InputSearch, { ...attrs, enterButton: enterButtonProp }, slotsRest)
    } else {
      return () => h(base.Input, { ...attrs, addonAfter }, slots)
    }
  },
})
</script>
