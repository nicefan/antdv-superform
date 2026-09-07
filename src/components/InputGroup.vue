<script lang="ts">
import Collections from './Collections'
import { computed, defineComponent, h, inject, mergeProps, reactive, ref, unref, watch } from 'vue'
import { globalProps } from '../plugin'
import { formatRule } from '../utils/buildModel'
import { createLabelNode } from '../utils/labelNode'
import { renderUIFormItem, renderUILayout } from '../adapter'

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
    const { slots } = option

    const formItemContext = ref()
    let ruleObj = formatRule(model.rules, props.effectData)
    let _propChain = model.propChain
    const extProps: Obj = {}
    // InputGroup 表单校验
    if (ruleObj) {
      watch(
        () => model.refData,
        () => formItemContext.value?.onFieldChange?.(),
        { deep: true }
      )
    } else if (model.children && compact) {
      const rule = {
        type: 'object',
        required: false,
        fields: {} as Obj,
      }
      for (const val of model.children.values()) {
        if (val.rules && val.fieldName) {
          if (val.rules[0].required) rule.required = true
          const effectData = reactive({
            ...props.effectData,
            parent: props.effectData,
            current: val.parent,
            field: val.fieldName,
            value: val.refData,
          })

          rule.fields[val.fieldName] = formatRule(val.rules, effectData)
          if (!model.refName) {
            // Group 未绑定字段，取第一个子项的字段作为校验字段
            _propChain = val.propChain
            ruleObj = rule.fields[val.fieldName]
            watch(
              () => unref(val.refData),
              () => formItemContext.value?.onFieldChange?.()
            )
            break
          }
        }
      }
      if (model.refName) {
        ruleObj = [rule]
        watch(
          () => model.refData,
          () => formItemContext.value?.onFieldChange?.(),
          { deep: true }
        )
      }
    } else {
      extProps.style = 'margin: 0'
    }
    extProps.required = !!ruleObj[0]?.required
    const inheritAttrs = inject<Obj>('inheritOptions', {})

    // 生成FormItem
    const rules = computed(() =>
      props.disabled ? undefined : !option.required || unref(inheritAttrs.required) ? ruleObj : ruleObj.slice(1)
    )
    const formItemAttrs = mergeProps(globalProps.FormItem, option.formItemProps, extProps)
    const _label = createLabelNode(option, props.effectData)

    return () =>
      renderUIFormItem(
        {
          ...formItemAttrs,
          rules: rules.value,
          ref: formItemContext,
          name: _propChain,
        },
        {
          label: _label,
          default:
            slots?.default ||
            (() =>
              renderUILayout(compact ? 'compactSpace' : 'space', mergeProps(compact ? { block: true } : {}, attrs), {
                default: () =>
                  h(Collections, {
                    option,
                    model,
                    effectData: props.effectData,
                  }),
              })),
        }
      )
  },
})
</script>
