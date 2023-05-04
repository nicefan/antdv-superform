import { createApp, h } from 'vue'
import App from './App.vue'
import superForm from '../src'
import 'ant-design-vue/dist/antd.css'
import { InputNumber } from 'ant-design-vue'
const app = createApp(App)
superForm.registComponent('InNumber', ({ attrs, option }) => {
  return h(InputNumber, Object.assign(attrs, { style: 'width:100%', type: 'number', placeholder: '请输入' + option.label }))
})
app.use(superForm).mount('#app')
