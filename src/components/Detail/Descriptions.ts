import { type PropType, defineComponent, h, inject, mergeProps, unref } from 'vue'
import { Col, Row } from 'ant-design-vue'
import base from '../base'
import { toNode } from '../../utils'

export default defineComponent({
  props: {
    option: {
      type: Object as PropType<MixWrapper>,
      required: true,
    },
    items: {
      type: Array as PropType<{ label: string; span: number; content: Fn; option: Obj; hidden: Ref }[]>,
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
      size,
      ...descriptionsProps
    } = {
      // bordered: true,
      size: 'middle',
      ...gridConfig,
      ...__attrs,
      ...props.option.descriptionsProps,
    } as Obj
    const presetSpan = subSpan ?? (column ? 24 / column : descriptionsProps.subSpan)
    const colNum = (column as number) || Math.floor(24 / presetSpan)
    // if (typeof descriptionsProps?.column === 'number') {
    //   presetSpan = Math.floor(24 / descriptionsProps.column)
    // }
    // const __title = type !== 'Group' ? '' : title || label
    const rowGroup = (function () {
      const group: any[] = []
      let current: any[] = []
      let n = 0
      props.items.forEach(({ option, span = presetSpan, label, content, hidden }, idx) => {
        let ceil = Number(span) ? Math.ceil(span / presetSpan) : 1
        ceil = ceil > colNum ? colNum : ceil
        const attrs = { ...descriptionsProps, ...option.formItemProps, ...option.descriptionsProps }
        const labelStyle = mergeProps(attrs.labelAlign ? { textAlign: attrs.labelAlign } : {}, attrs.labelStyle)
        const item: Obj = {
          labelCol: mergeProps({ style: labelStyle, class: { 'sup-label-no-colon': attrs.noColon } }, attrs.labelCol),
          wrapperCol: mergeProps({ style: attrs.contentStyle }, attrs.wrapperCol),
          option,
          attrs,
          span,
          label,
          content,
          hidden,
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
        if (option.isBreak) {
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
    let colorStyle = ''
    borderColor && (colorStyle += `--descriptions-border-color:${borderColor};`)
    labelBgColor && (colorStyle += `--descriptions-bg-color:${labelBgColor};`)
    // const prefixCls = inject<any>('configProvider', undefined)?.getPrefixCls() || 'ant'
    let content
    if (mode === 'table') {
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
                        toNode(item.label, props.effectData)
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
                    (group.length === 1 && !item.label
                      ? [h('td', { colspan: item.colspan * 2 }, item.content())]
                      : [
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
            )
      content = () => h('table', {}, rows())
    } else {
      content = () =>
        rowGroup.map((group) =>
          group.length === 1 && !group[0].label
            ? group[0].content()
            : h(Row, { class: 'ant-descriptions-row', ...rowProps }, () =>
                group.map(
                  (item) =>
                    !unref(item.hidden) &&
                    h(Col, { span: item.span, ...item.option.colProps }, () =>
                      h(Row, { class: ['ant-descriptions-item-container'] }, () => [
                        h(Col, mergeProps({ class: 'ant-descriptions-item-label' }, item.labelCol), () =>
                          h('label', {}, toNode(item.label, props.effectData))
                        ),
                        h(Col, { class: 'ant-descriptions-item-content', ...item.wrapperCol }, () =>
                          !item.attrs.noInput && mode === 'form'
                            ? h('div', { class: 'sup-descriptions-item-input' }, item.content())
                            : item.content()
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
            mode === 'form'
              ? 'sup-descriptions-mode-form'
              : mode === 'table'
              ? 'ant-descriptions-bordered'
              : 'sup-descriptions-default',
            colon === false && 'ant-descriptions-item-no-colon',
            size && size !== 'default' && 'ant-descriptions-' + size,
          ],
        },
        content()
      )
  },
})
