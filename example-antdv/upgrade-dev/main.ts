import { createApp } from 'vue'
import 'antdv-next/dist/antd.css'
import superForm from 'superform-antdv'
import { createAntdvAdapter } from 'superform-antdv'
import App from './App.vue'

// 仅验证页设置默认属性，对比容器显式 attrs 的覆盖结果。
const base = createAntdvAdapter()
superForm.initialize({
  overrides: {
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
  },
})
createApp(App).mount('#app')
