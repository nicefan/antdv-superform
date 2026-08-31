<script lang="ts">
import { h, type PropType, defineComponent } from 'vue'
import { mapKeys, camelCase } from 'lodash-es'
import { ButtonGroup } from '../components/buttons'
import type { ButtonItem } from '../exaTypes'

export default defineComponent({
  props: {
    limit: Number,
    buttonType: String as PropType<'primary' | 'link' | 'text' | 'dashed' | 'default'>,
    buttonShape: String as PropType<'circle' | 'round' | 'default'>,
    size: String as PropType<'large' | 'middle' | 'small'>,
    /** 按钮显示方式icon/label */
    labelMode: String as PropType<'icon' | 'label' | 'both'>,
    hidden: [Boolean, Function] as PropType<boolean | Fn<boolean>>,
    /** 无权限时的展示方式，默认隐藏 */
    unauthorized: String as PropType<'hide' | 'disable'>,
    /** @deprecated 使用 `unauthorized: 'disable'` */
    invalidDisabled: Boolean,
    disabled: [Boolean, Function] as PropType<boolean | Fn<boolean>>,
    actions: Array as PropType<ButtonItem[]>,
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
    return () => h(ButtonGroup, { option: { ...config, actions: __actions }, effectData })
  },
})
</script>
