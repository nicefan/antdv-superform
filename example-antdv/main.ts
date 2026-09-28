import { createApp } from 'vue'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import 'antdv-next/dist/antd.css'
import superform, { createAntdvAdapter } from 'superform-antdv'
import App from './App.vue'

dayjs.locale('zh-cn')
// 默认按产品配置演示；仅开发开关启用冲突默认值，用于验证显式 attrs 优先级。
const base = new URLSearchParams(location.search).get('defaults') === 'on' ? createAntdvAdapter() : undefined
superform.initialize(
  base
    ? {
        overrides: {
          uiComponents: {
            tabs: { defaults: { tabPosition: 'left' }, render: ({ state }) => base.render.tabs!(state) },
            collapse: { defaults: { accordion: true }, render: ({ state }) => base.render.collapse!(state) },
          },
        },
      }
    : undefined
)
createApp(App).mount('#app')
