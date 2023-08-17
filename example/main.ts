import { createApp, defineComponent, h } from 'vue'
import App from './App.vue'
import superForm from '../src'
import 'ant-design-vue/dist/antd.css'
import { InputNumber, Table, Textarea } from 'ant-design-vue'
const app = createApp(App)
// const InNumber = defineComponent({
//   setup(_, {attrs}) {
//     return () => h(
//       InputNumber,
//       {...props}, { style: 'width:100%', type: 'number', placeholder: '请输入' + option.label })
//     )
//   }
// })
superForm.registComponent('InNumber', InputNumber)
superForm.registComponent('Textarea', ({ attrs, option }) => {
  return h(Textarea, Object.assign(attrs, { placeholder: '请输入' + option.label }))
})
const defaultProps = {
  Form: {
    layout: 'vertical'
  }
}
app
  .use(superForm, {
    // 覆盖Antd组件，
    components: {
      Table: Table,
    },
    // 配置组件默认参数
    defaultProps,
  })
  .mount('#app')
