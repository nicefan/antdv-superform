<script lang="ts">
import { FormItemRest } from 'ant-design-vue'
import base from './base'
import Collections from './Collections'
import { computed, defineComponent, h, inject, mergeProps, reactive, ref, unref, watch } from 'vue'
import { globalProps } from '../plugin'
import { formatRule } from '../utils/buildModel'
import { createLabelNode } from '../utils/labelNode'

export default defineComponent({
  inheritAttrs: false,
  props: {
    option: { type: Object as any, required: true },
    model: { type: Object as any, required: true },
    effectData: Object,
    compact: { type: Boolean, default: true },
    disabled: undefined as any,
  },
  setup(props, { attrs }) {
    const { option, model, compact } = props
    const { field, slots } = option

    const formItemContext = ref()
    let ruleObj = formatRule(model.rules, props.effectData)
    let _propChain 
    const extProps: Obj = {}
    // InputGroup 表单校验
    const objectRule = {
      type: 'object',
      required: false,
      fields: {} as Obj,
    }
    const isBind = model.refName !== undefined || model.index !== undefined

    if (model.children && compact) {
      for (const val of model.children.values()) {
        if (val.rules?.length && val.fieldName) {
          if (val.rules[0].required) objectRule.required = true
          const effectData = reactive({
            ...props.effectData,
            parent: props.effectData,
            current: val.parent,
            field: val.fieldName,
            value: val.refData,
          })

          const rule = (objectRule.fields[val.fieldName] = formatRule(val.rules, effectData))
          if (!isBind) {
            // Group 未绑定字段，取第一个子项的字段作为校验字段
            _propChain = val
            ruleObj = rule
            watch(
              () => unref(val.refData),
              () => formItemContext.value?.onFieldChange()
            )
            break
          }
        }
      }
    } else {
      extProps.style = 'margin: 0'
    }
    const propChain = computed(() => {
      return _propChain ? _propChain.propChain : model.propChain
    })
    if (isBind) {
      ruleObj = (ruleObj || []).concat([objectRule])
      extProps.required = !!ruleObj[0]?.required
      watch(
        () => unref(model.refData),
        () => formItemContext.value?.onFieldChange(),
        { deep: true }
      )
    }
    const inheritAttrs = inject<Obj>('inheritOptions', {})

    // 生成FormItem
    const rules = computed(() =>
      props.disabled ? undefined : !option.required || unref(inheritAttrs.required) ? ruleObj : ruleObj.slice(1)
    )
    const formItemAttrs = mergeProps(globalProps.FormItem, option.formItemProps, extProps)
    const _label = createLabelNode(option, props.effectData)

    return () =>
      h(
        base.FormItem,
        { ...formItemAttrs, rules: rules.value, ref: formItemContext, name: propChain.value },
        {
          label: _label,
          default:
            slots?.default ||
            (() =>
              h(FormItemRest, () =>
                h(base.InputGroup, mergeProps({ compact, style: compact && { display: 'flex' } }, attrs), () =>
                  h(Collections, { option, model, effectData: props.effectData })
                )
              )),
        }
      )
  },
})
</script>
