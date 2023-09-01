import { h, ref } from 'vue'
import { useForm, defineForm, useModal } from '../src'
import { AppleOutlined, AndroidOutlined, UserOutlined } from '@ant-design/icons-vue';

export default function exampleForm() {
  const list = ref<any[]>([
    { value: 'a', label: '一' },
    { value: 'b', label: '二' },
  ])
  const { openModal } = useModal(() => '这是内容')
  const selectList = ['游戏', '唱歌', '跑步', '打牌'].map((label, value) => ({ label, value }))
  const treeData = [
    {
      title: 'Node1',
      value: '0-0',
      key: '0-0',
      children: [
        {
          value: '0-0-1',
          key: '0-0-1',
          title: 'title',
        },
        {
          title: 'Child Node2',
          value: '0-0-2',
          key: '0-0-2',
        },
      ],
    },
    {
      title: 'Node2',
      value: '0-1',
      key: '0-1',
    },
  ]
  const acKey = ref()
  const options = defineForm({
    attrs: {
      layout: 'vertical',
      // labelCol: { span: 5 },
      // wrapperCol: {span: 18}
    },
    buttons: ['submit'],
    subSpan: 12,
    subItems: [
      {
        type: 'Group',
        descriptionsProps: {
          title: '基本信息',
        },
        subItems: [
          {
            type: 'Input',
            field: 'name',
            label: '姓名',
            rules: { required: true },
            btnClick(...args) {
              console.log('change:', args)
              acKey.value = 'tab1'
            },
          },
          // {
          //   type: 'Hidden',
          //   field: 'subName',
          // },
          {
            type: 'InfoSlot',
            field: 'array',
            label: 'render',
            initialValue: ['a'],
            render: (props) => {
              return h('h2', props.value?.[0])
            },
          },
          {
            type: 'InputSlot',
            field: 'test',
            label: '模板插槽',
            render: 'test',
          },
          {
            type: 'Text',
            label: '提示',
            field: 'text',
            initialValue: '默认消息。',
          },
          {
            type: 'DatePicker',
            field: 'born',
            label: '生日',
            rules: { required: true, trigger: 'change' },
          },
          {
            type: 'Select',
            field: 'forever',
            labelField: 'foreverName',
            label: '爱好',
            /** 依赖数据变化切换 */
            // options: (data) => (data.age > 18 ? selectList.slice(0, 2) : selectList.slice(2)),
            /** 异步请求更新 */
            // options: () => Promise.resolve().then(() => selectList.slice(0, 2)),
            /** 传递响应式数组，本地进行更新 */
            // options: list
            /** 静态固定数组 */
            options: selectList,
            // disabled: (data) => data.age > 20,
          },
          {
            type: 'Select',
            field: 'other',
            // labelField: 'foreverName',
            label: '其它',
            options: () => Promise.resolve(selectList),
            computed(val, data) {
              return data.formData.forever !== null && 'a'
            },
          },
          {
            type: 'Input',
            field: 'memo',
            // labelField: 'foreverName',
            label: '备注',
            disabled(data) {
              return !!data.current.foreverName
            },
            computed(val, data) {
              return data.formData.foreverName
            },
          },
          {
            type: 'Switch',
            label: '是否注册',
            field: 'isReg',
            valueLabels: ['是', '否'],
          },
          {
            type: 'InputGroup',
            label: '详细地址',
            span: 16,
            gutter: 0,
            subItems: [
              {
                type: 'Input',
                field: 'addr',
                // label: '地址',
                span: 16,
              },
              {
                type: 'Input',
                field: 'street',
                span: 8,
                // label: '街道',
              },
            ],
          },
          {
            type: 'DateRange',
            label: '有效期',
            field: 'startDate',
            keepField: 'endDate',
          },
        ],
      },
      {
        type: 'Card',
        field: 'group',
        title: '分格线',
        disabled: ({ formData }) => !!formData.isReg,
        buttons: {
          limit: 3,
          size: 'small',
          buttonType: 'primary',
          iconOnly: true,
          actions: [
            {
              disabled: (data) => {
                console.log(data)
                return data.formData.forever === 2
              },
              label: '新增',
              onClick() {},
            },
            {
              label: '修改',
              hidden: ({ formData }) => formData.forever === 3,
              onClick() {},
            },
            {
              label: '删除',
              icon: AndroidOutlined,
              confirmText: '确定删除吗？',
              disabled: ({ formData }) => formData.forever === 2,
              attrs: { danger: true },
              onClick() {},
            },
          ],
        },
        subItems: [
          {
            type: 'InNumber',
            field: 'width',
            label: '体重',
            initialValue: 120,
            disabled: (data) => data.formData.forever === 2,
            computed: (val, data) => {
              console.log(data.current)
              return data.formData.forever === 1 ? 110 : val
            },
            attrs: { max: 200, min: 110 },
            rules: { required: true, type: 'number', min: 110 },
          },
          {
            type: 'Input',
            field: 'height',
            label: '身高',
            disabled: (data) => data.formData.forever === 2,
            initialValue: 170,
            attrs: { type: 'number' },
            rules: { type: 'number', min: 150 },
          },
          {
            type: 'Radio',
            field: 'radio',
            label: '天气',
            attrs: { buttonStyle: 'outline' },
            options: [
              { label: '晴天', value: '1' },
              { label: '雨天', value: '2' },
            ],
          },
          {
            type: 'Checkbox',
            field: 'food',
            label: '食物',
            options: [
              { label: '中餐', value: '1' },
              { label: '西餐', value: '2' },
            ],
          },
          {
            type: 'TreeSelect',
            field: 'tree',
            label: '树形',
            labelField: 'treeName',
            data: treeData,
            on: {
              change(...args) {
                console.log(args)
              }
            }
          },
        ],
      },
      {
        type: 'Table',
        field: 'table',
        label: '表格',
        attrs: { bordered: true },
        editMode: 'inline',
        // addMode: 'modal',
        buttons: {
          actions: ['add', 'edit', 'del'],
        },
        rowButtons: {
          buttonType: 'link',
          actions: ['edit', 'del'],
        },
        formSechma: {
          subSpan: 12,
          attrs: {
            layout: 'vertical',
          },
        },
        columns: [
          {
            type: 'Input',
            label: 'col1',
            field: 'col1',
            initialValue: 'init',
            rules: { required: true },
          },
          {
            type: '',
            label: '分组',
            span: 24,
            subItems: [
              { type: 'Input', field: 'group1', label: '分组1' },
              { type: 'Input', field: 'group2', label: '分组2' },
            ],
          },
          { type: 'Input', field: 'col2', label: 'col2', hideInTable: true },
        ],
      },
      {
        type: 'Buttons',
        align: 'center',
        isBlock: true,
        actions: [
          {
            icon: AndroidOutlined,
            label: '导入',
            onClick() {},
          },
        ],
      },
      {
        type: 'Tabs',
        activeKey: acKey,
        subItems: [
          {
            key: 'tab1',
            label: '第一页',
            icon: AppleOutlined,
            subItems: [
              {
                type: 'List',
                field: 'list',
                label: '列表',
                rules: { min: 1 },
                buttons: {
                  actions: [
                    {
                      name: 'add',
                    },
                  ],
                },
                rowButtons: {
                  buttonType: 'link',
                  actions: [
                    {
                      name: 'del',
                      onClick(data, action) {
                        if (data.listData.length === 1) {
                          alert('必须保留一条记录')
                        } else {
                          action().then(() => {
                            alert('删除成功')
                          })
                        }
                      },
                    },
                  ],
                },
                columns: [
                  {
                    type: 'Input',
                    label: 'tab1',
                    field: 'tab1',
                    initialValue: 'init',
                    rules: { required: true },
                  },
                  {
                    type: 'Input',
                    field: 'filed2',
                    label: 'filed2',
                  },
                ],
              },
            ],
          },
          {
            key: 'tab2',
            label: '第二页',
            hidden: ({ formData }) => formData.forever === 3,
            // disabled: true,
            subItems: [
              {
                type: 'Input',
                field: 'tab2',
                label: 'tab2',
              },
              {
                type: 'Input',
                field: 'tab4',
                label: 'tab4',
              },
            ],
          },
          {
            key: 'tab3',
            label: '第三页',
            disabled: ({ formData }) => {
              console.log(formData)
              return !formData.isReg
            },
            // disabled: true,
            subItems: [
              {
                type: 'Input',
                field: 'tab3.input',
                label: 'tab3',
              },
            ],
          },
        ],
      },
      {
        type: 'Collapse',
        subItems: [
          {
            field: 'collapse',
            label: '百叶窗',
            // disabled: true,
            buttons: {
              limit: 1,
              size: 'small',
              buttonType: 'primary',
              iconOnly: true,
              actions: [
                {
                  label: '新增',
                  onClick(arg) {
                    console.log('onclick', arg)
                    openModal()
                  },
                },
                {
                  label: '修改',
                  hidden: ({ formData }) => formData.forever === 3,
                  onClick() {},
                },
                {
                  label: '删除',
                  icon: UserOutlined,
                  confirmText: '确定删除吗？',
                  disabled: ({ formData }) => formData.forever === 2,
                  attrs: { danger: true },
                  onClick() {},
                },
              ],
            },
            subItems: [
              {
                type: 'InputNumber',
                field: 'width',
                label: '体重',
                initialValue: 120,
                attrs: { max: 200, min: 110 },
                rules: { required: true },
              },
              {
                type: 'Input',
                field: 'home',
                label: '籍贯',
              },
            ],
          },
        ],
      },
    ],
  })

  const changeSelect = () => {
    list.value = selectList.slice(2)
  }
  return {
    changeSelect,
    options,
  }
}
