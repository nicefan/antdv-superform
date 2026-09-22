import { computed, defineComponent, h, watch } from 'vue'
import { isEqual } from 'lodash-es'
import { fieldComponentProps, useUIComponent } from 'superform/sdk'

/** 原生 change 只覆盖用户操作；外部赋值和树数据刷新也需要同步标签。 */
export default defineComponent({
  name: 'AntdvTreeSelectField',
  inheritAttrs: false,
  props: fieldComponentProps,
  setup(props, { slots }) {
    const component = useUIComponent('TreeSelect')
    const treeData = computed(() => props.state.treeData ?? props.attrs.treeData ?? [])
    if (props.option.labelField) {
      watch(
        () => [props.binding.value, treeData.value, props.attrs.fieldNames, props.attrs.treeNodeLabelProp],
        () => {
          const names = props.attrs.fieldNames || {}
          const labelKey = props.attrs.treeNodeLabelProp || names.label || 'title'
          const find = (items, value): any => {
            for (const item of items) {
              if (Object.is(item[names.value || 'value'], value)) return item[labelKey] ?? item.label ?? value
              const children = item[names.children || 'children']
              const label = Array.isArray(children) ? find(children, value) : undefined
              if (label !== undefined) return label
            }
          }
          const labelOf = (value) => {
            if (value == null) return undefined
            const raw = typeof value === 'object' ? value.value : value
            return find(treeData.value, raw) ?? value.label ?? raw
          }
          const value = props.binding.value
          const label = Array.isArray(value) ? value.map(labelOf) : labelOf(value)
          // 多选每次计算都会产生新数组，仅标签实际变化时写回，避免父子重复更新。
          if (!isEqual(label, props.binding.labelValue)) props.binding['onUpdate:labelValue']?.(label)
        },
        { immediate: true, deep: true }
      )
    }
    return () => h(component, { ...props.attrs, treeData: treeData.value }, slots)
  },
})
