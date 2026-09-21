import { ElTabs, ElTabPane } from 'element-plus'
import { defineComponent, h, mergeProps, onBeforeUnmount, onMounted, ref, type PropType } from 'vue'
import type { UIRenderers, UITabsState } from 'superform/sdk'
import './Tabs.css'

function renderNativeTabs(state: UITabsState) {
  return h(
    ElTabs,
    mergeProps(state.attrs || {}, {
      modelValue: state.activeKeys,
      'onUpdate:modelValue': state.onActiveChange,
    }),
    {
      ...state.slots,
      default:
        state.content ||
        (() =>
          state.items.map((item) =>
            h(
              ElTabPane,
              { ...item.attrs, key: item.key, name: item.key, disabled: item.disabled },
              {
                label: () => [
                  item.title?.(),
                  item.extra && h('span', { onClick: (event: Event) => event.stopPropagation() }, [item.extra()]),
                ],
                default: item.content,
              }
            )
          )),
    }
  )
}

const TabsWithExtra = defineComponent({
  props: { state: { type: Object as PropType<UITabsState>, required: true } },
  setup(props) {
    const extraRef = ref<HTMLElement>()
    const extraWidth = ref(0)
    const extraHeight = ref(0)
    let observer: ResizeObserver | undefined
    onMounted(() => {
      const extra = extraRef.value
      if (!extra) return
      const measure = () => {
        extraWidth.value = extra.offsetWidth
        extraHeight.value = extra.offsetHeight
      }
      // 首次挂载立即预留空间；后续仅在操作区实际尺寸改变时更新。
      measure()
      if (typeof ResizeObserver === 'undefined') return
      observer = new ResizeObserver(measure)
      observer.observe(extra)
    })
    onBeforeUnmount(() => observer?.disconnect())

    return () => {
      const position = props.state.attrs?.tabPosition || 'top'
      return h(
        'div',
        {
          class: ['sup-tabs-with-extra', `sup-tabs-with-extra-${position}`],
          style: {
            '--sup-tabs-extra-width': `${extraWidth.value}px`,
            '--sup-tabs-extra-height': `${extraHeight.value}px`,
          },
        },
        [
          renderNativeTabs(props.state),
          h('div', { ref: extraRef, class: 'sup-tabs-bar-extra' }, [props.state.extra?.()]),
        ]
      )
    }
  },
})

const renderTabs: UIRenderers['tabs'] = (state) => (state.extra ? h(TabsWithExtra, { state }) : renderNativeTabs(state))

export default renderTabs
