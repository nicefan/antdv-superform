import { createApp, defineComponent, h } from 'vue'
import App from './App.vue'
import superForm from '../src'
import 'ant-design-vue/dist/antd.css'
import { Button, InputNumber, Table, Textarea } from 'ant-design-vue'
import {
  PlusOutlined,
  DeleteOutlined,
  EditOutlined,
  ProfileOutlined,
  SendOutlined,
  SearchOutlined,
  ReloadOutlined,
} from '@ant-design/icons-vue'
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

const defaultButtons = {
  add: {
    label: '新增',
    icon: PlusOutlined,
    attrs: {
      type: 'primary',
    },
  },
  delete: {
    label: '删除',
    icon: DeleteOutlined,
    attrs: {
      danger: true,
    },
  },
  edit: {
    label: '修改',
    icon: EditOutlined,
  },
  detail: {
    label: '查看',
    icon: ProfileOutlined,
  },
  submit: {
    label: '提交',
    icon: SendOutlined,
    attrs: {
      type: 'primary',
    },
  },
  search: {
    label: '查询',
    icon: SearchOutlined,
    attrs: {
      type: 'primary',
    },
  },
  reset: {
    icon: ReloadOutlined,
    label: '重置',
  },
}

const defaultProps = {
  rowButtons: {
    labelMode: 'icon',
  },
  Table: {
    indexColumn: true,
  },
  Form: {
    layout: 'vertical',
  },
  Upload: {
    uploadMode: 'submit',
    showUploadList: {
      showDownloadIcon: true,
    },
  },
}
app
  .use(superForm, {
    // 覆盖Antd组件，
    components: {
      Table: Table,
    },
    // 配置组件默认参数
    defaultProps,
    // 配置默认按钮属性
    defaultButtons,
    // buttonRoles() {
    //   return ['add']
    // },
  })
  .use(Button)
  .mount('#app')
