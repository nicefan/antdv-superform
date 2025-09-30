<script lang="ts">
import { FormItemRest } from 'ant-design-vue'
import base from './base'
import Collections from './Collections'
import { computed, defineComponent, h, mergeProps, ref, watch } from 'vue'
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
    let _propChain = model.propChain
    const extProps: Obj = {}
    // InputGroup 表单校验
    if (ruleObj) {
      watch(
        () => model.refData,
        () => formItemContext.value?.onFieldChange(),
        { deep: true }
      )
    } else if (model.children && compact) {
      if (field) {
        const rule = {
          type: 'object',
          required: false,
          fields: {} as Obj,
        }
        model.children.forEach((val) => {
          if (val.rules && val.fieldName) {
            if (val.rules[0].required) rule.required = true
            rule.fields[val.fieldName] = val.rules
          }
        })
        ruleObj = [rule]
        // 监听子组件数据变化
        watch(
          () => model.refData,
          () => formItemContext.value?.onFieldChange(),
          { deep: true }
        )
      } else {
        const { rules, propChain, refName } =
          [...model.children.values()].find((val) => !!val.rules) || ({} as ModelData)
        if (refName) {
          ruleObj = rules
          _propChain = propChain
          watch(
            () => model.refData[refName],
            () => formItemContext.value?.onFieldChange()
          )
        }
      }
    } else {
      extProps.style = 'margin: 0'
    }

    // 生成FormItem
    const rules = computed(() => (props.disabled ? undefined : ruleObj))
    const formItemAttrs = mergeProps(globalProps.FormItem, option.formItemProps, extProps)
    const _label = createLabelNode(option, props.effectData)

    return () =>
      h(
        base.FormItem,
        { ...formItemAttrs, rules: rules.value, ref: formItemContext, name: _propChain },
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
