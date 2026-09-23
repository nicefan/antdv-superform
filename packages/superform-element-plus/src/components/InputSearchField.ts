import { cloneVNode, defineComponent, h, mergeProps } from 'vue'
import { ElButton } from 'element-plus'
import type { FormComponentProps } from 'superform'
import { builtInIcons, fieldComponentProps, useUIComponent } from 'superform/sdk'

export type InputSearchProps = FormComponentProps<typeof import('element-plus')['ElInput']> & {
  enterButton?: boolean | string
  loading?: boolean
  onSearch?: (value: string, event: KeyboardEvent | MouseEvent) => void
}

/** 只补搜索入口，值绑定、原生事件和输入能力仍由已注册的 Input 提供。 */
export default defineComponent({
  name: 'ElementPlusInputSearchField',
  inheritAttrs: false,
  props: fieldComponentProps,
  setup(props, { slots }) {
    const component = useUIComponent('InputSearch')
    const search = (event: KeyboardEvent | MouseEvent) => {
      if (props.attrs.disabled || props.attrs.loading) return
      props.attrs.onSearch?.(String(props.attrs.modelValue ?? ''), event)
    }
    return () => {
      const { enterButton, loading, onSearch, ref, ...attrs } = props.attrs
      const node = h(component, mergeProps(attrs, {
        onKeydown: (event: KeyboardEvent) => {
          // 输入法确认和长按回车不提交；阻止原生表单提交造成重复操作。
          if (event.key !== 'Enter' || event.isComposing || event.repeat || event.defaultPrevented) return
          event.preventDefault()
          search(event)
        },
      }), {
        ...slots,
        append: slots.append ?? (() => h(ElButton, {
          nativeType: 'button', disabled: attrs.disabled, loading,
          'aria-label': '搜索', onClick: search,
        }, { default: () => slots.enterButton?.() ?? (typeof enterButton === 'string' ? enterButton : enterButton ? '搜索' : builtInIcons.search()) })),
      })
      // ref 指向原生输入组件，保持调用方读取实例的方式。
      return ref ? cloneVNode(node, { ref }, true) : node
    }
  },
})
