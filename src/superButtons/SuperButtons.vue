<script lang="ts">
import { h, type Component, type PropType, defineComponent } from 'vue'
import { mapKeys, camelCase } from 'lodash-es'
import { ButtonGroup } from '../components/buttons'
import type { ExtButtonGroup } from '../exaTypes'

const SuperButtons: Component = defineComponent({
  props: {
    align: String as PropType<ExtButtonGroup['align']>,
    divider: { type: Boolean, default: undefined },
    moreLabel: [String, Function, Object] as PropType<ExtButtonGroup['moreLabel']>,
    attrs: Object as PropType<ExtButtonGroup['attrs']>,
    methods: Object as PropType<ExtButtonGroup['methods']>,
    visibleIn: String as PropType<ExtButtonGroup['visibleIn']>,
    validOn: String as PropType<ExtButtonGroup['validOn']>,
    roleMode: String as PropType<ExtButtonGroup['roleMode']>,
    limit: Number,
    buttonProps: Object as PropType<ExtButtonGroup['buttonProps']>,
    /** 按钮显示方式icon/label */
    labelMode: String as PropType<'icon' | 'label' | 'both'>,
    hidden: [Boolean, Function] as PropType<boolean | Fn<boolean>>,
    /** 无权限时的展示方式，默认隐藏 */
    unauthorized: String as PropType<'hide' | 'disable'>,
    /** @deprecated 使用 `unauthorized: 'disable'` */
    invalidDisabled: Boolean,
    disabled: [Boolean, Function] as PropType<boolean | Fn<boolean>>,
    actions: Array as PropType<ExtButtonGroup['actions']>,
    effectData: Object,
  },
  setup(props, { slots }) {
    const slotsNode = slots.default?.()
    const { effectData, ...config } = props
    const __actions = !slotsNode
      ? props.actions
      : slotsNode.flatMap(({ children, props = {} }: any) => {
          const { roleName, onClick, confirmText, tooltip, disabledTooltip, icon, ...attrs } = mapKeys(
            props,
            (_, key) => camelCase(key)
          )
          if (!onClick || !children) return []
          return {
            label: children.default || children,
            icon,
            tooltip,
            disabledTooltip,
            roleName,
            onClick,
            confirmText,
            attrs,
          }
        })
    return () => h('div', {
      style: { display: 'flex', justifyContent: { left: 'flex-start', center: 'center', right: 'flex-end' }[props.align || 'left'] },
    }, [h(ButtonGroup, { option: { ...config, actions: __actions }, effectData })])
  },
})
export default SuperButtons
</script>
