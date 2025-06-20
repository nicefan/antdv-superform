<script lang="ts">
import { h, type PropType, defineComponent } from 'vue'
import { mapKeys, camelCase } from 'lodash-es'
import { ButtonGroup } from '../components/buttons'
import type { ButtonItem } from '../exaTypes'

export default defineComponent({
  props: {
    limit: Number,
    buttonType: String as PropType<'primary' | 'link' | 'text' | 'dashed' | 'ghost' | 'default'>,
    buttonShape: String as PropType<'circle' | 'round' | 'default'>,
    size: String as PropType<'large' | 'middle' | 'small'>,
    /** 按钮显示方式icon/label */
    labelMode: String as PropType<'icon' | 'label' | 'both'>,
    hidden: Boolean || Function,
    disabled: Boolean || (Function as PropType<Fn<boolean>>),
    actions: Array as PropType<ButtonItem[]>,
    effectData: Object,
  },
  setup(props, { slots }) {
    const slotsNode = slots.default?.()
    const { effectData, ...config } = props
    const __actions = !slotsNode
      ? props.actions
      : slotsNode.flatMap(({ children, props = {} }: any) => {
          const { roleName, roleMode, onClick, confirmText, tooltip, icon, ...attrs } = mapKeys(props, (_, key) =>
            camelCase(key)
          )
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
    return () => h(ButtonGroup, { option: { ...config, actions: __actions }, effectData })
  },
})
</script>
