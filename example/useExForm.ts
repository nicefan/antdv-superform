import { h, ref, toRaw, watchEffect } from 'vue'
import { useForm, defineForm, useModal } from '../src'
import { AppleOutlined, AndroidOutlined, UserOutlined } from '@ant-design/icons-vue'
import { Button, Modal } from 'ant-design-vue'
import { uniq } from 'lodash-es'
import CustomGroup from './CustomGroup.vue'

export default function exampleForm() {
  const list = ref<any[]>([
    { value: '1', label: '一' },
    { value: '2', label: '二' },
  ])

  const { openModal } = useModal(() => '这是内容', {
    destroyOnClose: false,
  })
  const selectList = ['游戏', '唱歌', '跑步', '打牌']
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
  const acKey = ref<string>()
  watchEffect(() => {
    console.log(acKey.value)
  })
  const options = defineForm({
    attrs: {
      layout: 'horizontal',
      labelCol: { style: 'width:120px;' },
      wrapperCol: { style: 'margin-right: 20px' },
    },
    descriptionsProps: {
      mode: 'form',
      column: 2,
    },
    buttons: {
      attrs: {
        size: 40,
      },
      actions: ['submit', 'reset'],
    },
    onSubmit: (data) => {
      console.log(data)
      return Promise.resolve()
    },
    subSpan: 12,
    subItems: [
      {
        type: 'InfoSlot',
        render: 'formTop',
        blocked: true,
      },
      {
        type: 'Descriptions',
        title: '基本信息',
        attrs: {
          // 边框及标签底色
          // borderColor: '#faf2f2',
          // labelBgColor: '#faf2f2',
          bordered: true,
        },
        buttons: {
          // vaildIn:'detail',
          actions: [
            {
              label: '开始',
            },
          ],
        },
        // component: CustomGroup,
        subItems: [
          {
            type: 'Input',
            field: 'company',
            initialValue: '阿里巴巴',
            label: '公司名称',
          },
          {
            type: 'HTML',
            label: '编号',
            field: 'ser',
            // attrs: {
            //   innerHTML: '<a>avc</a>'
            // },
            initialValue: '<a>123456</a>',
          },
        ],
      },
      {
        type: 'Group',
        title: () => h('h1', {}, '基本信息'),
        descriptionsProps: {
          title: '基本信息',
          mode: 'form',
          column: 3,
        },
        subItems: [
          {
            type: 'InfoSlot',
            field: 'array',
            // label: 'render',
            // span: 24,
            blocked: true,
            initialValue: ['自定义消息'],
            render: (props) => {
              return h('h2', { style: 'border-bottom:1px solid' }, props.value?.[0])
            },
          },
          {
            type: 'Input',
            field: 'name',
            label: '姓名',
            rules: { required: true },
            prefix: UserOutlined,
            attrs: {
              // 可改变查询按钮标签
              addonAfter: '查询',
            },
            // 可个性化查询按钮
            // enterButton: () => h(Button, () => 'abc'),
            // 显示查询图标按钮
            onSearch(...args) {
              console.log('change:', args)
              acKey.value = 'tab1'
            },
          },

          {
            type: 'ExtInNumber',
            label: '自定义组件',
            field: 'de',
            attrs: {
              style: 'width: 100%',
              placeholder: '自定义组件加Ext前缀',
            },
            viewRender: ({ value }) => value,
          },
          {
            type: 'InputSlot',
            // field: 'test',
            label: '模板插槽',
            labelSlot: ({ current }) => h('span', { style: 'color:red' }, `模板插槽${current.name || ''}`),
            render: 'test',
          },
          {
            type: 'TagInput',
            label: '标签',
            field: 'tags',
            initialValue: 'abc,ddo',
            attrs: {
              valueToString: true,
              class: 'a',
            },
          },
          {
            type: 'DatePicker',
            field: 'born',
            initialValue: '2020-09-01',
            label: '生日',
            rules: { required: true, trigger: 'change' },
          },
          {
            type: 'Select',
            field: 'forever',
            labelField: 'foreverName',
            label: '爱好',
            valueToNumber: true,
            attrs: {
              placeholder: '使用普通数组生成下拉选项',
            },
            /** 依赖数据变化切换 */
            // options: (data) => (data.age > 18 ? selectList.slice(0, 2) : selectList.slice(2)),
            /** 异步请求更新 */
            // options: () => Promise.resolve().then(() => selectList.slice(0, 2)),
            /** 传递响应式数组，本地进行更新 */
            options: list,
            /** 静态固定数组 */
            // options: selectList,
            // disabled: (data) => data.age > 20,
          },
          {
            type: 'TagSelect',
            field: 'other',
            label: '其它',
            // options: () => Promise.resolve(list.value),
            options: selectList,
            // valueToNumber: true,
            attrs: {
              // placeholder: 'value转换成字符型',
              multiple: true,
            },
            // computed(val, data) {
            //   return data.formData.forever !== null && 1
            // },
          },
          {
            type: 'Textarea',
            field: 'memo',
            label: '备注',
            wrapping: true,
            disabled(data) {
              return !!data.formData.foreverName
            },
            computed(val, data) {
              return data.formData.foreverName
            },
          },
          {
            type: 'Switch',
            label: '是否注册',
            field: 'isReg',
            valueLabels: ['否', '是'],
            options: () =>
              new Promise((resolve) => {
                setTimeout(() => {
                  resolve([
                    { value: 'a', label: 'A' },
                    { value: 'b', label: 'B' },
                  ])
                }, 1000)
              }),
            attrs: {
              firstIsChecked: true,
              defaultChecked: true,
            },
          },
          {
            type: 'InputGroup',
            label: '详细地址',
            // field: 'address',
            // span: 16,
            gutter: 0,
            subItems: [
              {
                type: 'Input',
                field: 'addr',
                label: '地址',
                span: 14,
                rules: { required: true },
                attrs: {
                  allowClear: true,
                },
              },
              {
                type: 'Select',
                field: 'street',
                label: '街道',
                // hidden: true,
                span: 'auto',
                attrs: {
                  placeholder: '可输入动态添加选项',
                  showSearch: true,
                },
                /** value将使用label保存 */
                valueToLabel: true,
                /** 依赖数据变化切换, showSearch打开时，可以获取第二个参数，可以实现动态查询 */
                options: (data, searchText) => {
                  if (searchText) {
                    return uniq([...selectList, searchText])
                  }
                  if (data.value && !selectList.includes(data.value)) {
                    selectList.push(data.value)
                  }
                  return selectList
                },
              },

              // {
              //   type: 'InfoSlot',
              //   span:2,
              //   render: () => h(Button, ()=>'选择')
              // },
            ],
          },
          {
            type: 'DateRange',
            label: '有效期',
            field: 'startDate',
            keepField: 'endDate',
            hidden: ({ current }) => !current.isReg,
          },
          {
            type: 'InputList',
            field: 'datelist',
            // subSpan: 12,
            descriptionsProps: {
              span: 24,
              column: 2,
            },
            // label: '付款日期',
            rules: { min: 2 },
            rowButtons: ['add', 'delete'],
            // attrs: {
            //   labelIndex: true,
            // },
            // labelSlot:(data)=> {
            //   // labelIndex为true时，可以为每行生成一个label
            //   return '付款日期' + data.index
            // },
            hidden: (data) => {
              return false
            },
            // viewRender(data) {
            //   return JSON.stringify(data.value)
            // },
            columns: [
              {
                type: 'InputGroup',
                labelSlot: (data) => {
                  // labelIndex为true时，可以为每行生成一个label
                  return '付款日期' + data.index
                },
                subItems: [
                  {
                    type: 'DatePicker',
                    label: '日期b',
                    field: 'index2',
                    onChange: (...args) => {
                      console.log(args)
                      // 要获取到当前行时，需要取parent.index
                    },
                    // span: 8,
                  },

                  {
                    type: 'DatePicker',
                    label: '日期c',
                    field: 'index3',
                    attrs: {
                      picker: 'quarter',
                    },
                    // rules: {required: true}
                    // span: 12,
                  },
                ],
              },

              // {
              //   type: 'DatePicker',
              //   label: ({index}) =>'日期a' + (index+1),
              //   field: 'index1',
              //   rules: {required: true}
              //   // span: 12,
              // },
            ],
          },
          {
            type: 'Upload',
            label: '头像',
            field: 'head',
            span: 24,
            rules: { required: true },
            descriptionsProps: {
              noInput: true,
            },
            attrs: {
              // apis: {
              //   delete: (file) => new Promise((resolve, reject) => setTimeout(reject, 5000)),
              //   upload: (data) => new Promise((resolve, reject) => setTimeout(()=>resolve({url:'http://abc.jpg'}), 5000)),
              // },
              uploadMode: 'base64',
              listType: 'picture-card',
              isSingle: true,
              valueKey: 'url',
              // showUploadList: false,
            },
            // slots: {
            //   default(data) {
            //     const {value, fileList} = data
            //     const url = fileList[0]?.objectUrl || fileList[0]?.url
            //     return h('div', {style: {background:`center / cover url("${url}")`, width: '100%', height:'100%'}})
            //   }
            // },
          },
          {
            type: 'Upload',
            label: '附件',
            field: 'file',
            // vModelFields: {
            //   fileList: 'fileList',
            // },
            span: 24,
            // rules: { required: true, type: 'array', min: 3 },
            descriptionsProps: {
              noInput: true,
            },
            disabled: ({ formData }) => !!formData.isReg,
            attrs: {
              valueKey: 'uid',
              apis: {
                delete: (file) => new Promise((resolve, reject) => setTimeout(reject, 5000)),
                upload: (data) => new Promise((resolve, reject) => setTimeout(() => reject({ message: 'abc' }), 5000)),
              },
              uploadMode: 'submit',
              multiple: true,
              accept: 'image/*',
              maxSize: 5,
              // listType: 'picture-card',
            },
          },
          {
            type: 'Buttons',
            align: 'center',
            blocked: true,
            actions: [
              {
                icon: AndroidOutlined,
                label: '导入',
                onClick() {},
              },
            ],
          },
        ],
      },
      {
        type: 'ListGroup',
        field: 'listGroup',
        // title: '列表表单',
        // descriptionsProps: {
        //   column: 3,
        //   mode: 'table',
        // },
        subSpan: 6,
        attrs: {
          // labelIndex: true,
        },
        hidden: (data) => {
          return false
        },
        rowButtons: {
          align: 'left',
        },
        title: (data) => {
          return '列表' + data.index
        },
        columns: [
          {
            type: 'DatePicker',
            label: '季度',
            field: 'quarter',
            attrs: {
              picker: 'quarter',
            },
          },
          {
            type: 'InputNumber',
            label: '金额',
            field: 'money',
            rules: { required: true },
          },
          {
            type: 'InputNumber',
            label: '合计',
            field: 'total',
            attrs: {
              readonly: true,
            },
            computed(_, { formData, current, parent }) {
              let total = 0
              formData.listGroup.some((item, i) => {
                total += item.money || 0
                return i === parent.index
              })
              // current.total = total
              return total
            },
          },
          {
            type: 'InputNumber',
            label: '合计2',
            field: 'total2',
            attrs: {
              readonly: true,
            },
            computed(_, data) {
              return data.current.total + 1
            },
          },
        ],
      },
      {
        type: 'Card',
        field: 'group',
        title: () => h('b', '分格线'),
        // hidden:({current}) => current.isReg,
        // disabled: ({ formData }) => !!formData.isReg,
        // descriptionsProps: {
        //   column: 3,
        //   labelCol: {},
        // },
        buttons: {
          limit: 3,
          size: 'small',
          buttonType: 'primary',
          labelMode: 'icon',
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
              onClick() {
                console.log('删除了')
              },
            },
          ],
        },
        subItems: [
          {
            type: 'InputList',
            field: 'nameList',
            // subSpan: 20,
            rules: { required: true, min: 2 },
            label: '客户', // 唯一子元素有定义label时，此处无效
            attrs: {
              // labelIndex: true, // 自动给标签加序号
            },
            // labelSlot: (data) =>{
            //   return '姓名' + '一二三四'[data.index]
            // },
            // rowButtons: ['add', 'delete'],
            columns: [
              {
                type: 'Input',
                field: '$index', // 只有一个控件并绑定$index时，直接存为数组值。
                // label: '姓名',
                // labelSlot: (data) =>{
                //   return '姓名' + '一二三四'[data.index] //只有一个元素时，可获取到index
                // },
                // rules: { required: true },
              },
            ],
          },
          {
            type: 'DateRange',
            label: '有效期',
            field: 'born',
            keepField: 'end',
          },
          {
            type: 'InputNumber',
            field: 'width',
            label: '体重',
            // initialValue: 120,
            // disabled: (data) => !!data.formData.name,
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
            attrs: {
              buttonStyle: 'solid',
              options: [
                { label: '晴天', value: '1' },
                { label: '雨天', value: '2' },
              ],
            },
          },
          {
            type: 'Checkbox',
            field: 'food',
            label: '食物',
            initialValue: [],
            labelField: 'foodName',
            options: [
              { label: '中餐', value: '1' },
              { label: '西餐', value: '2' },
            ],
          },
          {
            type: 'TreeSelect',
            field: 'tree',
            label: '树形',
            // labelField: 'treeName',
            data: treeData,
            // initialValue: () => ['0-0'],
            attrs: {
              multiple: true,
            },
            on: {
              change(...args) {
                console.log(args)
              },
            },
            slots: {
              title: (data) => h('span', {}, `${data.title}[${data.value}]`),
            },
          },
        ],
      },
      {
        type: 'Table',
        field: 'table',
        label: '表格',
        // attrs: { bordered: true },
        // edit: true,
        editMode: 'inline',
        // addMode: 'modal',
        buttons: {
          actions: ['add', 'edit', 'delete'],
        },
        rowButtons: {
          buttonType: 'link',
          labelMode: 'icon',
          actions: [
            {
              name: 'add',
              meta: {
                onOk: (...args) => {
                  console.log(args)
                },
              },
            },
            'edit',
            'delete',
          ],
        },
        editForm: {
          subSpan: 12,
          attrs: {
            layout: 'vertical',
          },
        },
        columns: [
          {
            type: 'Input',
            labelSlot: () => h('span', { style: 'color:red' }, '第一列'),
            label: '第一列',
            field: 'col1',
            initialValue: 'init',
            rules: { required: true },
          },
          {
            type: 'Group',
            label: '分组',
            span: 24,
            subItems: [
              { type: 'Input', field: 'group1', label: '分组1', rules: { required: true } },
              { type: 'Select', field: 'group2', label: '分组2', options: list },
            ],
          },
          { type: 'Switch', field: 'okable', label: '开关' },
          {
            type: 'Input',
            field: 'col2',
            label: 'col2',
            rules: { required: true },
            hidden: ({ current }) => !current.okable,
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
            field: 'tab1',
            disabled: (data) => {
              return false
            },
            subItems: [
              {
                type: 'List',
                field: 'list',
                label: '列表',
                initialValue: () => [{ field1: '' }],
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
                  disabled: (data) => {
                    console.log(data)
                    return false
                  },
                  actions: [
                    {
                      name: 'delete',
                      onClick(data, action) {
                        if (data.current.length === 1) {
                          Modal.error({ title: '必须保留一条记录' })
                        } else {
                          action().then(() => {
                            Modal.success({ title: '删除成功' })
                          })
                        }
                      },
                    },
                  ],
                },
                columns: [
                  {
                    type: 'Input',
                    label: 'field1',
                    field: 'field1',
                    initialValue: 'init',
                    rules: { required: true },
                    disabled: (data) => {
                      return false
                    },
                  },
                  {
                    type: 'Input',
                    field: 'filed2',
                    label: 'filed2',
                  },
                  {
                    type: 'Input',
                    field: 'filed3',
                    label: 'filed3',
                  },
                ],
              },
            ],
          },
          {
            key: 'tab2',
            label: '第二页',
            field: 'tab2',
            hidden: ({ formData, ...args }) => {
              return formData.forever === 3
            },
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
              {
                type: 'DateRange',
                label: '有效期',
                field: 'startDate',
                keepField: 'endDate',
              },
            ],
          },
          {
            key: 'tab3',
            label: '第三页',
            field: 'tab3',
            disabled: ({ formData, ...args }) => {
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
        title: '百叶窗',
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
