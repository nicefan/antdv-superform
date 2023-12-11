import { type PropType, defineComponent, h, inject, mergeProps } from 'vue'
import { Col, Row } from 'ant-design-vue'
import base from '../base'
import { globalProps } from '../../plugin'
import { toNode } from '../../utils'

export default defineComponent({
  props: {
    option: {
      type: Object as PropType<MixWrapper>,
      required: true,
    },
    items: {
      type: Array as PropType<{ label: string; span: number; content: Fn; option: Obj }[]>,
      required: true,
    },
    effectData: Object,
  },
  setup(props) {
    const { type, subSpan, title, label, attrs: __attrs } = props.option || {}
    const gridConfig: Obj = inject('gridConfig', {})
    const {
      column,
      layout,
      bordered,
      mode = bordered && 'table',
      labelBgColor,
      borderColor,
      rowProps,
      colon,
      ...descriptionsProps
    } = {
      ...globalProps.Descriptions,
      ...gridConfig.descriptionsProps,
      __attrs,
      ...props.option.descriptionsProps,
    } as Obj
    const presetSpan = subSpan ?? (column ? 24 / column : gridConfig.subSpan)
    const colNum = (column as number) || Math.floor(24 / presetSpan)
    // if (typeof descriptionsProps?.column === 'number') {
    //   presetSpan = Math.floor(24 / descriptionsProps.column)
    // }
    const __title = type !== 'Group' ? '' : title || label
    const rowGroup = (function () {
      const group: any[] = []
      let current: any[] = []
      let n = 0
      props.items.forEach(({ option, span = presetSpan, label, content }, idx) => {
        let ceil = span ? Math.ceil(span / presetSpan) : 1
        ceil = ceil > colNum ? colNum : ceil
        const attrs = { ...descriptionsProps, ...option.formItemProps, ...option.descriptionsProps }
        const labelStyle = (attrs.labelAlign ? `align: ${attrs.labelAlign};` : '') + attrs.labelStyle
        const item: Obj = {
          labelCol: mergeProps({ style: labelStyle, class: { 'sup-label-no-colon': attrs.noColon } }, attrs.labelCol),
          wrapperCol: mergeProps({ style: attrs.contentStyle }, attrs.wrapperCol),
          option,
          attrs,
          span,
          label,
          content,
          colspan: ceil,
        }

        if (n + ceil <= colNum) {
          n += ceil
          current.push(item)
        } else {
          group.push(current)
          if (n < colNum) {
            const mod = colNum - n
            current[current.length - 1].colspan += mod
          }
          n = ceil
          current = [item]
        }
        if (idx === props.items.length - 1) {
          // if (n < colNum) {
          //   const mod = colNum - n
          //   item.colspan += mod
          // }
          group.push(current)
        }
      })
      return group
    })()
    let colorStyle = ''
    borderColor && (colorStyle += `--descriptions-border-color:${borderColor};`)
    labelBgColor && (colorStyle += `--descriptions-bg-color:${labelBgColor};`)
    const prefixCls = inject<any>('configProvider', undefined)?.getPrefixCls() || 'ant'
    let content
    if (mode === 'table') {
      const rows = () =>
        layout === 'vertical'
          ? rowGroup.flatMap((group) => [
              h(
                'tr',
                { class: 'ant-descriptions-row' },
                group.map((item) =>
                  h(
                    'th',
                    mergeProps(
                      {
                        class: 'ant-descriptions-item-label',
                        colspan: item.colspan,
                        style: `width: ${((item.span / 24) * 100).toFixed(2)}%`,
                      },
                      { class: item.labelCol.class, style: item.labelCol.style }
                    ),
                    toNode(item.label, props.effectData)
                  )
                )
              ),
              h(
                'tr',
                { class: 'ant-descriptions-row' },
                group.map((item) =>
                  h(
                    'td',
                    mergeProps(
                      { class: 'ant-descriptions-item-content', colspan: item.colspan },
                      { class: item.wrapperCol.class, style: item.wrapperCol.style }
                    ),
                    item.content()
                  )
                )
              ),
            ])
          : // 横向排列
            rowGroup.map((group, idx) =>
              h(
                'tr',
                { class: 'ant-descriptions-row' },
                group.flatMap((item) => [
                  h(
                    'th',
                    mergeProps(
                      { class: 'ant-descriptions-item-label' },
                      { class: item.labelCol.class, style: item.labelCol.style }
                    ),
                    toNode(item.label, props.effectData)
                  ),
                  h(
                    'td',
                    mergeProps(
                      {
                        class: 'ant-descriptions-item-content',
                        style: item.wrapperCol.style,
                        colspan: item.colspan * 2 - 1,
                      },
                      { class: item.wrapperCol.class }
                    ),
                    item.content()
                  ),
                ])
              )
            )
      content = () => h('table', {}, rows())
    } else {
      content = () =>
        rowGroup.map((group) =>
          h(Row, { class: 'ant-descriptions-row', ...rowProps }, () =>
            group.map((item) =>
              h(Col, { span: item.span, ...item.option.colProps }, () =>
                h(Row, { class: ['ant-descriptions-item-container'] }, () => [
                  h(Col, mergeProps({ class: 'ant-descriptions-item-label' }, item.labelCol), () =>
                    h('label', {}, toNode(item.label, props.effectData))
                  ),
                  h(Col, { class: 'ant-descriptions-item-content', ...item.wrapperCol }, () =>
                    h(
                      'div',
                      {
                        class: { 'sup-descriptions-item-input': !item.attrs.noStyle && mode === 'form' },
                      },
                      item.content()
                    )
                  ),
                ])
              )
            )
          )
        )
    }
    return () =>
      h(
        'div',
        {
          style: colorStyle,
          class: [
            'ant-descriptions-view',
            layout === 'vertical' && 'ant-descriptions-vertical',
            mode === 'form' && 'sup-descriptions-mode-form',
            mode === 'table' && 'ant-descriptions-bordered',
            colon === false && 'ant-descriptions-item-no-colon',
          ],
        },
        content()
      )
  },
})
