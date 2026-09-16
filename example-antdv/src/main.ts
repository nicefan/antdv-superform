import { createApp } from 'vue'
import App from './App.vue'
import superForm from 'superform-antdv'
import 'antdv-next/dist/antd.css'
import { Button } from 'antdv-next'

const app = createApp(App)
superForm.initialize()
// const InNumber = defineComponent({
//   setup(_, {attrs}) {
//     return () => h(
//       InputNumber,
//       {...props}, { style: 'width:100%', type: 'number', placeholder: '请输入' + option.label })
//     )
//   }
// })
const defaultProps = {
  rowButtons: {
    labelMode: 'icon',
  },
  Table: {
    indexColumn: true,
  },
  Form: {
    // layout: 'vertical',
  },
  Upload: {
    uploadMode: 'submit',
    showUploadList: {
      showDownloadIcon: true,
    },
  },
}
const tagColorList = ['pink', 'cyan', 'red', 'green', 'blue', 'orange', 'purple']

superForm.configure({
  tagViewer: (val) => {
    // 如果是布尔值，使用预定义的颜色
    if (typeof val === 'boolean' || typeof val === 'number') {
      return val ? 'success' : 'error'
    }
    // 如果在预定义颜色列表中找到，则返回对应颜色，否则返回默认颜色
    return tagColorList[val] || 'default'
  },

  // 配置组件默认参数
  defaultProps,
  // 配置默认按钮属性
  // buttonRoles() {
  //   return ['add']
  // },
})

app.use(Button as any).mount('#app')
