<script lang="ts">
import { ButtonGroup } from '../components/buttons'
import { h, PropType, defineComponent } from 'vue'

export default defineComponent({
  props: {
    limit: Number,
    buttonType: String as PropType<'primary' | 'link' | 'text' | 'dashed' | 'ghost' | 'default'>,
    buttonShape: String as PropType<'circle' | 'round' | 'default'>,
    size: String as PropType<'large' | 'middle' | 'small'>,
    /** 是否只显示图标 */
    iconOnly: Boolean,
    hidden: Boolean || Function,
    disabled: Boolean || (Function as PropType<Fn<boolean>>),
    actions: Array as PropType<ButtonItem[]>,
  },
  setup(props, { slots }) {
    const slotsNode = slots.default?.()
    const actions = !slotsNode
      ? props.actions
      : slotsNode.flatMap(({ children, props }: any) => {
          const { roleName, roleMode, onClick, confirmText, tooltip, icon, ...attrs } = props || {}
          if (!onClick || !children) return []
          return {
            label: children.default || children,
            icon,
            tooltip,
            roleMode,
            roleName,
            onClick,
            confirmText,
            attrs,
          }
        })
    return () => h(ButtonGroup, { config: { ...props, actions } })
  },
})
</script>
