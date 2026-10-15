import { type PropType, defineComponent, h, mergeProps, ref } from 'vue'
import { Col, Row } from 'antdv-next'
import useDescriptionsStyle from 'antdv-next/dist/descriptions/style/index'
import type { UIDescriptionItem, UIDescriptionsProps } from 'superform/sdk'

function renderLayout(type: 'row' | 'col', props: Obj, slots: Obj) {
  return h(type === 'row' ? Row : Col, props, slots)
}

/** 将 Core 已整理的详情状态转换为 Ant Design Vue 原生结构。 */
export default defineComponent({
  props: { state: { type: Object as PropType<UIDescriptionsProps>, required: true } },
  setup(props) {
    // 自定义详情结构也必须注册原生样式，并挂载对应的哈希及主题变量类。
    const [hashId, cssVarCls] = useDescriptionsStyle(ref('ant-descriptions'))
    const renderTableItem = (item: UIDescriptionItem) =>
      !item.label
        ? [
            h(
              'td',
              mergeProps({ class: 'ant-descriptions-item-content', colspan: item.colspan * 2 }, item.wrapperCol),
              [item.content()]
            ),
          ]
        : [
            h('th', mergeProps({ class: 'ant-descriptions-item-label' }, item.labelCol), [item.label()]),
            h(
              'td',
              mergeProps({ class: 'ant-descriptions-item-content', colspan: item.colspan * 2 - 1 }, item.wrapperCol),
              [item.content()]
            ),
          ]

    return () => {
      const state = props.state
      if (state.mode === 'table') {
        const rows =
          state.layout === 'vertical'
            ? state.rows.flatMap((group) => [
                (group.length > 1 || group[0].label) &&
                  h(
                    'tr',
                    { class: 'ant-descriptions-row' },
                    group.map((item) =>
                      h(
                        'th',
                        mergeProps({ class: 'ant-descriptions-item-label', colspan: item.colspan }, item.labelCol),
                        [item.label?.()]
                      )
                    )
                  ),
                h(
                  'tr',
                  { class: 'ant-descriptions-row' },
                  group.map((item) =>
                    h(
                      'td',
                      mergeProps({ class: 'ant-descriptions-item-content', colspan: item.colspan }, item.wrapperCol),
                      [item.content()]
                    )
                  )
                ),
              ])
            : state.rows.map((group) => h('tr', { class: 'ant-descriptions-row' }, group.flatMap(renderTableItem)))
        return h(
          'div',
          {
            ...state.attrs,
            class: [
              'ant-descriptions',
              'ant-descriptions-bordered',
              hashId.value,
              cssVarCls.value,
              state.size !== 'default' && `ant-descriptions-${state.size === 'middle' ? 'medium' : state.size}`,
              state.attrs.class,
            ],
          },
          h('div', { class: 'ant-descriptions-view' }, h('table', { style: { tableLayout: state.tableLayout } }, rows))
        )
      }

      const rows = state.rows.map((group) =>
        renderLayout(
          'row',
          { class: 'ant-descriptions-row', ...state.rowProps },
          {
            default: () =>
              group.map((item) => {
                return renderLayout(
                  'col',
                  { ...item.colProps, key: item.key },
                  {
                    default: () =>
                      renderLayout(
                        'row',
                        { class: 'ant-descriptions-item-container' },
                        {
                          default: () => [
                            item.label &&
                              renderLayout('col', mergeProps({ class: 'ant-descriptions-item-label' }, item.labelCol), {
                                default: () => h('label', {}, [item.label?.()]),
                              }),
                            renderLayout(
                              'col',
                              mergeProps({ class: 'ant-descriptions-item-content' }, item.wrapperCol),
                              {
                                default: () =>
                                  !item.attrs.noInput && state.mode === 'form' && item.label
                                    ? h('div', { class: 'sup-descriptions-item-input' }, [item.content()])
                                    : item.content(),
                              }
                            ),
                          ],
                        }
                      ),
                  }
                )
              }),
          }
        )
      )
      return h(
        'div',
        {
          ...state.attrs,
          class: [
            'ant-descriptions',
            hashId.value,
            cssVarCls.value,
            state.layout === 'vertical' && 'ant-descriptions-vertical',
            state.mode === 'form' ? 'sup-descriptions-mode-form' : 'sup-descriptions-default',
            state.colon === false && 'ant-descriptions-item-no-colon',
            state.size !== 'default' && `ant-descriptions-${state.size === 'middle' ? 'medium' : state.size}`,
            state.attrs.class,
          ],
        },
        h('div', { class: 'ant-descriptions-view' }, rows)
      )
    }
  },
})
