import { createApp, defineComponent, h, type Component } from 'vue'
import 'element-plus/dist/index.css'
import superform from 'superform-element-plus'
import { createElementPlusAdapter } from 'superform-element-plus'
import { ElDatePicker, ElTimePicker } from 'element-plus'
import App from './App.vue'

// 切换模式必须整页重载，避免在已锁定的 Adapter 上重复初始化。
const registration = new URLSearchParams(location.search).get('registration') || 'auto'
// 手动组件增加可见来源标记，避免同源注册问题被自动导入的原始组件掩盖。
const marked = (component: Component) =>
  defineComponent({
    inheritAttrs: false,
    setup(_, { attrs, slots }) {
      return () =>
        h('div', [
          h('small', { style: { display: 'block', color: '#18794e' } }, `手动来源：${registration}`),
          h(component, attrs, slots),
        ])
    },
  })
const components =
  registration === 'range'
    ? { DateRangePicker: marked(ElDatePicker), TimeRangePicker: marked(ElTimePicker) }
    : registration === 'original'
    ? { DatePicker: marked(ElDatePicker), TimePicker: marked(ElTimePicker) }
    : undefined
const base = new URLSearchParams(location.search).get('defaults') === 'on' ? createElementPlusAdapter() : undefined
superform.initialize({
  components,
  overrides: base
    ? {
        uiComponents: {
          tabs: {
            defaults: { tabPosition: 'left' },
            render: ({ state }) => base.render.tabs!(state),
          },
          collapse: {
            defaults: { accordion: true },
            render: ({ state }) => base.render.collapse!(state),
          },
        },
      }
    : undefined,
})
createApp(App).mount('#app')
