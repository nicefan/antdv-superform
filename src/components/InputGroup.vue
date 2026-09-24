<script lang="ts">
import Collections from './Collections'
import { computed, defineComponent, h, inject, mergeProps, reactive, toRef, unref, watch } from 'vue'
import { globalProps } from '../plugin'
import { formatRule } from '../utils/buildModel'
import { createLabelNode } from '../utils/labelNode'
import { getUIRender } from '../adapter'

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

    let validationModel = model
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
            validationModel = val
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
    }
    ruleObj ||= []
    extProps.required = ruleObj.some((rule) => rule.required)
    const inheritAttrs = inject<Obj>('inheritOptions', {})

    // 生成FormItem
    const rules = computed(() =>
      props.disabled
        ? undefined
        : (!option.required || unref(inheritAttrs.required) ? ruleObj : ruleObj.slice(1)).map((rule) =>
            inheritAttrs.ignoreRules ? { ...rule, trigger: 'none', validateTrigger: false } : rule
          )
    )
    const formItemAttrs = mergeProps(globalProps.FormItem, option.formItemProps, extProps)
    const _label = createLabelNode(option, props.effectData)

    const provider = inject<{ validateField?: (path: (string | number)[]) => Promise<unknown> }>('exaProvider', {})
    // 对象内字段修改不会改变整组引用；等行路径更新后，仅校验当前分组。
    watch(
      () => unref(validationModel.refData),
      () => {
        if (!props.disabled && rules.value?.length) {
          // 校验错误由表单项展示，输入过程不向外抛出校验失败。
          provider.validateField?.(_propChain.value).catch(() => {})
        }
      },
      { deep: true, flush: 'post' }
    )

    return () =>
      getUIRender('formItem')(
        {
          ...formItemAttrs,
          rules: rules.value,
          name: _propChain.value,
        },
        {
          label: _label,
          default:
            slots?.default ||
            (() =>
              h(Collections, {
                option,
                model,
                effectData: props.effectData,
                layout: compact ? 'compact' : 'space',
                fieldWrapper: compact ? 'none' : 'formItem',
                layoutAttrs: attrs,
              })),
        }
      )
  },
})
</script>
