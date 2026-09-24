import { h, mergeProps } from 'vue'
import { getUIRender } from '../adapter'
import type { CollectionNode } from './useCollectionNodes'

export type CollectionLayoutMode = 'grid' | 'compact' | 'space'

/** 只组织 Schema 布局，不在渲染过程中建立字段绑定或校验。 */
export function createCollectionLayout(
  nodes: CollectionNode[],
  props: {
    option: Obj
    layout: CollectionLayoutMode
    layoutAttrs?: Obj
  }
) {
  const groups: Array<CollectionNode | CollectionNode[]> = []
  let row: CollectionNode[] | undefined
  for (const node of nodes) {
    if (node.layout.block) {
      groups.push(node)
      row = undefined
    } else {
      if (!row) groups.push((row = []))
      row.push(node)
      if (node.layout.breakAfter) row = undefined
    }
  }

  const renderNodes = () => {
    if (props.layout === 'compact') {
      return nodes.map((node) => {
        if (node.hidden.value) return false
        const { span, flex, style } = node.layout.compactProps
        const width = Number(span) ? ((Number(span) / 24) * 100).toFixed(2) + '%' : undefined
        return h(node.content, {
          key: node.key,
          style: mergeProps({
            width,
            flex: flex ?? (span === 'auto' ? '1 1 0' : undefined),
            minWidth: 0,
          },style),
        })
      })
    }
    const { gutter = 16 } = props.option
    const rowProps = { gutter, ...props.option.rowProps }
    return groups.map((group) => {
      if (Array.isArray(group)) {
        return getUIRender('row')(
          { ...rowProps, key: group[0].key },
          {
            default: () =>
              group.map(
                (node) =>
                  !node.hidden.value &&
                  getUIRender('col')(
                    mergeProps(
                      {
                        key: node.key,
                        style: node.layout.align && { textAlign: node.layout.align },
                      },
                      node.layout.colProps
                    ),
                    { default: node.content }
                  )
              ),
          }
        )
      }
      return (
        !group.hidden.value &&
        h(
          'div',
          {
            key: group.key,
            class: ['sup-form-section', group.layout.detail && 'sup-detail'],
            style: group.layout.align && { textAlign: group.layout.align },
          },
          [group.content()]
        )
      )
    })
  }

  return {
    // 首次渲染前即可确定是否需要 Group，不依赖 renderNodes 的执行副作用。
    hasWrap: props.layout === 'grid' && groups.some(Array.isArray),
    renderNodes,
    render: () =>
      props.layout === 'grid'
        ? renderNodes()
        : getUIRender(props.layout === 'compact' ? 'compactSpace' : 'space')(
            mergeProps(props.layout === 'compact' ? { block: true } : {}, props.layoutAttrs || {}),
            // 紧凑容器必须直接接收各字段，不能额外套一个组件层阻断首尾上下文。
            { default: () => renderNodes().filter(Boolean) }
          ),
  }
}
