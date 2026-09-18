import { cloneVNode, defineComponent, h, shallowRef, unref, watch } from 'vue'
import type { TreeSelectInstance } from 'element-plus'
import { createFieldPropsAdapter, fieldComponentProps, useUIComponent } from 'superform/sdk'

const adaptProps = createFieldPropsAdapter({ prop: 'modelValue', event: 'update:modelValue' })

/** 标签复用组件库已计算的结果，不额外遍历树或维护节点索引。 */
export default defineComponent({
  name: 'ElementPlusTreeSelectField',
  inheritAttrs: false,
  props: fieldComponentProps,
  setup(props, { slots }) {
    const component = useUIComponent('TreeSelect')
    const instance = shallowRef<TreeSelectInstance>()
    if (props.option.labelField) {
      // 更新后读取公开的 Select 标签状态，初始值、异步数据和懒加载缓存均由组件库处理。
      watch(() => unref(instance.value?.selectRef?.selectedLabel), (label) => {
        if (label !== undefined) props.binding['onUpdate:labelValue']?.(label)
      }, { flush: 'post' })
    }
    return () => {
      const attrs = props.state.treeData === undefined
        ? props.attrs
        : { ...props.attrs, data: props.state.treeData }
      const node = h(component, adaptProps(attrs, props), slots)
      // 合并内部引用，保留调用方对原始组件的 ref。
      return cloneVNode(node, { ref: instance }, true)
    }
  },
})
