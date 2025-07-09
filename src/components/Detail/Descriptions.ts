import { type PropType, defineComponent, h, inject, mergeProps, unref } from 'vue'
import { Col, Row } from 'ant-design-vue'
import base from '../base'
import { toNode } from '../../utils'
import { defaults } from 'lodash-es'
import { globalProps } from '../../plugin'

export default defineComponent({
  props: {
    items: {
      type: Array as PropType<{ label?: Fn; span: number; content: Fn; option: Obj; hidden: Ref }[]>,
      required: true,
    },
    config: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const gridConfig: Obj = inject('gridConfig', {})

    const { subSpan, column } = props.config
    const {
      layout,
      bordered,
      mode = bordered && 'table',
      labelBgColor,
      borderColor,
      rowProps,
      colon,
      size = 'middle',
      ...descriptionsProps
    } = gridConfig

    let colNum = column || (Number(subSpan) ? Math.floor(24 / subSpan) : gridConfig.column)
    colNum ??= Number(gridConfig.subSpan) ? Math.floor(24 / gridConfig.subSpan) : 2
    const rowGroup = (function () {
      const group: any[] = []
      let current: any[] = []
      let n = 0
      props.items.forEach(({ option, label, content, hidden }, idx) => {
        const { span = option.span } = option.descriptionsProps || {}
        let ceil = Number(span) ? Math.ceil(span / (24 / colNum)) : 1
        ceil = ceil > colNum ? colNum : ceil
        const attrs = { ...descriptionsProps, ...option.formItemProps, ...option.descriptionsProps }
        const labelStyle = mergeProps(attrs.labelAlign ? { textAlign: attrs.labelAlign } : {}, attrs.labelStyle)
        const item: Obj = {
          labelCol: mergeProps({ style: labelStyle, class: { 'sup-label-no-colon': attrs.noColon } }, attrs.labelCol),
          wrapperCol: mergeProps(
            { style: layout === 'vertical' && { textAlign: attrs.labelAlign } },
            { style: attrs.contentStyle },
            attrs.wrapperCol
          ),
          option,
          attrs,
          span,
          label,
          content,
          hidden,
          colspan: ceil,
        }
        if (mode === 'table') {
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
        } else {
          current.push(item)
        }
        if (option.wrapping) {
          group.push(current)
          n = 0
          current = []
        }
        if (idx === props.items.length - 1 && current.length) {
          // if (n < colNum) {
          //   const mod = colNum - n
          //   item.colspan += mod
          // }
          group.push(current)
        }
      })
      return group
    })()

    if (mode === 'table') {
      let colorStyle = ''
      borderColor && (colorStyle += `--descriptions-border-color:${borderColor};`)
      labelBgColor && (colorStyle += `--descriptions-bg-color:${labelBgColor};`)
      const rows = () =>
        layout === 'vertical'
          ? rowGroup.flatMap((group) => [
              (group.length > 1 || group[0].label) &&
                h(
                  'tr',
                  { class: 'ant-descriptions-row' },
                  group.map(
                    (item) =>
                      !unref(item.hidden) &&
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
                        item.label?.()
                      )
                  )
                ),
              h(
                'tr',
                { class: 'ant-descriptions-row' },
                group.map(
                  (item) =>
                    !unref(item.hidden) &&
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
                group.flatMap(
                  (item) =>
                    !unref(item.hidden) &&
                    (!item.label
                      ? [
                          h(
                            'td',
                            {
                              class: 'ant-descriptions-item-content',
                              style: item.wrapperCol.style,
                              colspan: item.colspan * 2,
                            },
                            item.content()
                          ),
                        ]
                      : [
                          h(
                            'th',
                            mergeProps(
                              { class: 'ant-descriptions-item-label' },
                              { class: item.labelCol.class, style: item.labelCol.style }
                            ),
                            item.label()
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
            )

      return () =>
        h(
          'div',
          {
            style: colorStyle,
            class: ['ant-descriptions', 'ant-descriptions-bordered', size !== 'default' && 'ant-descriptions-' + size],
          },
          h('div', { class: 'ant-descriptions-view' }, h('table', {}, rows()))
        )
    } else {
      const render = () =>
        rowGroup.map((group) =>
          h(Row, { class: 'ant-descriptions-row', ...rowProps }, () =>
            group.map(({ option, content, span, label, labelCol, wrapperCol, hidden, attrs }) => {
              if (unref(hidden)) return null
              const colProps = { span, ...(attrs.colProps || option.colProps) }
              if (colProps.span === 0 || colProps.flex) {
                colProps.span = undefined
              } else if (!Number(colProps.span)) {
                colProps.span = gridConfig.column ? 24 / gridConfig.column : gridConfig.subSpan
              }

              return h(Col, colProps, () =>
                h(Row, { class: ['ant-descriptions-item-container'] }, () => [
                  label &&
                    h(Col, mergeProps({ class: 'ant-descriptions-item-label' }, labelCol), () =>
                      h('label', {}, label())
                    ),
                  h(Col, { class: 'ant-descriptions-item-content', ...wrapperCol }, () =>
                    !attrs.noInput && mode === 'form' && label !== undefined
                      ? h('div', { class: 'sup-descriptions-item-input' }, content())
                      : content()
                  ),
                ])
              )
            })
          )
        )
      return () =>
        h(
          'div',
          {
            class: [
              'ant-descriptions',
              layout === 'vertical' && 'ant-descriptions-vertical',
              mode === 'form' ? 'sup-descriptions-mode-form' : 'sup-descriptions-default',
              colon === false && 'ant-descriptions-item-no-colon',
              size && size !== 'default' && 'ant-descriptions-' + size,
            ],
          },
          h('div', { class: 'ant-descriptions-view' }, render())
        )
    }
  },
})
