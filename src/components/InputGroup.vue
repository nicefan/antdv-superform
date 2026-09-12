<script lang="ts">
import Collections from './Collections'
import { computed, defineComponent, h, inject, mergeProps, reactive, ref, toRef, unref, watch } from 'vue'
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
    let _propChain = toRef(model, 'propChain')
    const extProps: Obj = {}
    const objectRule = {
      type: 'object',
      required: false,
      fields: {} as Obj,
    }
    // 列表行由 index 绑定，即使没有 refName，也应按整行对象校验子字段。
    const isBind = model.refName !== undefined || model.index !== undefined
    if (model.children && compact) {
      for (const val of model.children.values()) {
        if (val.rules?.length && val.fieldName) {
          if (val.rules[0].required) objectRule.required = true
          const effectData = reactive({
            ...props.effectData,
            parent: props.effectData,
            current: toRef(val, 'parent'),
            field: val.fieldName,
            value: toRef(val, 'refData'),
          })
          const childRules = (objectRule.fields[val.fieldName] = formatRule(val.rules, effectData))
          if (!isBind) {
            // 未绑定对象的分组沿用第一个子字段作为校验入口。
            _propChain = toRef(val, 'propChain')
            ruleObj = childRules
            watch(
              () => unref(val.refData),
              () => formItemContext.value?.onFieldChange?.()
            )
            break
          }
        }
      }
    } else {
      extProps.style = 'margin: 0'
    }
    if (isBind) {
      // 自身规则与紧凑布局的子字段规则都要生效，不能因已有规则而跳过子字段。
      ruleObj = (ruleObj || []).concat([objectRule])
      watch(
        () => unref(model.refData),
        () => formItemContext.value?.onFieldChange?.(),
        { deep: true }
      )
    }
    ruleObj ||= []
    extProps.required = ruleObj.some((rule) => rule.required)
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
          name: _propChain.value,
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
