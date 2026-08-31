import { defineComponent, h } from 'vue'

/** antdv-next 已移除旧 List；1.0 用项目内的轻量列表承载表单行。 */
export const SuperListItem = defineComponent({
  name: 'SuperListItem',
  inheritAttrs: false,
  setup(_, { attrs, slots }) {
    return () => h('li', { ...attrs, class: ['sup-list-item', attrs.class] }, slots.default?.())
  },
})

export const SuperList = defineComponent({
  name: 'SuperList',
  inheritAttrs: false,
  props: {
    dataSource: { type: Array, default: () => [] },
  },
  setup(props, { attrs, slots }) {
    return () =>
      h('section', { ...attrs, class: ['sup-list', attrs.class] }, [
        slots.header && h('header', { class: 'sup-list-header' }, slots.header()),
        h(
          'ul',
          { class: 'sup-list-items' },
          props.dataSource.map((item, index) => slots.renderItem?.({ item, index }))
        ),
      ])
  },
})
