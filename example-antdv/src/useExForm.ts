import { h, ref, toRaw, watchEffect } from 'vue'
import { useForm, defineForm, useModal } from 'superform-antdv'
import { LeafIcon, RobotIcon, UserIcon, SearchIcon } from './icons'
import { Button, message, Modal } from 'antdv-next'
import { uniq } from 'lodash-es'
import CustomGroup from './CustomGroup.vue'
import { getBase64WithFile } from './utils/file'

export default function exampleForm() {
  const list = ref<any[]>([
    { value: '1', label: '一' },
    { value: '2', label: '二' },
  ])
  const tableRef = ref<any>()
  setTimeout(() => {
    tableRef.value?.redoHeight()
  }, 1500)

  const { openModal } = useModal(() => '这是内容', {
    destroyOnClose: false,
  })
  const selectList = ['游戏', '唱歌', '跑步', '打牌']
  const valname = ref('云')
  const areaList = ['湖南', '广东']
  const areaSearch = ref('')
  const nameSearchLoading = ref(false)
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
      mode: 'table',
      column: 2,
    },
    buttons: {
      attrs: {
        size: 40,
      },
      visibleIn: 'form',
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
        block: true,
      },
      {
        type: 'Descriptions',
        title: '基本信息',
        attrs: {
          bordered: true,
          labelStyle: { width: '140px' },
          // labelCol: {style: 'width:140px'}
        },
        subSpan: 8,
        buttons: {
          // vaildIn:'detail',
          actions: [
            {
              label: '开始',
              dropdown: [
                { label: '按钮一', value: 'start1', icon: RobotIcon },
                { label: '按钮二', value: 'start2', icon: RobotIcon },
              ],
              onClick(data) {
                console.log(data)
                message.info(data.e.key)
              },
            },
            {
              customRender: 'test',
            },
          ],
        },
        // component: CustomGroup,
        subItems: [
          {
            type: 'Input',
            label: '标题',
            value: valname,
            span: 16,
          },
          {
            type: 'HTML',
            label: '编号',
            // attrs: {
            //   innerHTML: '<a>avc</a>'
            // },
            value: '<a>123456</a>',
          },
          {
            type: 'Text',
            field: 'text',
            label: '文本一',
            initialValue: '文本一',
          },

          {
            type: 'Text',
            label: '文本三',
            value: '文本三',
            hidden: ({ current }) => current.isReg,
          },
          {
            type: 'Text',
            label: '文本四',
            value: '文本四',
          },
          {
            type: 'Text',
            label: '文本二',
            value: '文本二',
          },
        ],
      },
      {
        type: 'Group',
        title: () => h('span', {}, '详细信息'),
        descriptionsProps: {
          mode: 'form',
          column: 3,
        },
        contentAttrs: {
          style: 'border:1px solid #eee; padding:12px',
        },
        subItems: [
          {
            type: 'InfoSlot',
            // field: 'array',
            // label: 'render',
            // span: 24,
            block: true,
            // initialValue: ['自定义消息'],
            render: ({ current }) => {
              return h('h2', { style: 'border-bottom:1px solid #eee' }, '自定' + (current.name || ''))
            },
          },
          {
            type: 'Rate',
            field: 'rating',
            label: '评分',
            initialValue: 3,
            attrs: {
              allowHalf: true,
            },
          },
          {
            type: 'InputSearch',
            field: 'name',
            // value: valname,
            label: '姓名',
            tooltip: { title: '姓名是啥？' },
            rules: {
              required: true,
              // message: '请输入',
              validator(d) {
                console.log(d)
                // if (d.value.length < 2)
                // return Promise.reject('姓名至少2个字符')
                // throw '姓名至少2个字符'
                return d.value.length > 1 || Error('姓名至少2个字符')
              },
            },
            computed: (val, { current, field }) => current[field]?.trim?.(),
            attrs: {
              enterButton: true,
              loading: nameSearchLoading,
            },
            slots: {
              prefix: () => UserIcon(),
              searchIcon: () => SearchIcon(),
            },
            async onSearch(...args) {
              console.log('change:', args)
              acKey.value = 'tab1'
              // 搜索过程由业务维护 loading，InputSearch 只提供原生事件和展示。
              nameSearchLoading.value = true
              try {
                await new Promise((resolve) => setTimeout(resolve, 1000))
              } finally {
                nameSearchLoading.value = false
              }
            },
          },

          {
            type: 'TagInput',
            label: '标签',
            field: 'tags',
            initialValue: 'abc,ddo',
            attrs: {
              stringifyValue: true,
            },
          },
          {
            type: 'Switch',
            label: '是否注册',
            field: 'isReg',
            options: {
              source: [
                { value: false, label: '否' },
                { value: true, label: '是' },
              ],
            },
          },
          {
            type: 'Group',
            disabled: ({ current }) => current.isReg,
            subItems: [
              {
                type: 'DatePicker',
                field: 'born',
                initialValue: '2020-09-01',
                label: '生日',
                rules: { required: true, trigger: 'change' },
                disabled: ({ current }) => {
                  return !current.isReg
                },
              },
              {
                type: 'Select',
                field: 'forever',
                labelField: 'foreverName',
                label: '爱好',
                attrs: {
                  placeholder: '使用普通数组生成下拉选项',
                },
                options: {
                  source: selectList,
                  valueToNumber: true,
                  // 联动选项：source: ({ current }) => current.age > 18 ? selectList.slice(0, 2) : selectList.slice(2),
                  // 异步选项：source: () => Promise.resolve(selectList.slice(0, 2)),
                },
                // disabled: (data) => data.age > 20,
              },
            ],
          },
          {
            type: 'TagSelect',
            field: 'other',
            label: '特长',
            options: {
              source: selectList,
              // 响应式选项可使用 source: list。
            },
            attrs: {
              // placeholder: 'value转换成字符型',
              multiple: true,
            },
            // computed(val, data) {
            //   return data.formData.forever !== null && 1
            // },
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
            // rules: { type: 'number', min: 150 },
          },
          {
            type: 'DateRangePicker',
            label: '起止日期',
            field: 'startDate',
            endField: 'endDate',
          },
          {
            type: 'InputGroup',
            label: '地址',
            // field: 'address',
            // span: 16,
            gutter: 0,

            subItems: [
              {
                type: 'Select',
                field: 'street',
                label: '省份',
                // hidden: true,
                span: 8,
                attrs: {
                  placeholder: '可输入动态添加选项',
                  showSearch: true,
                  filterOption: false,
                  defaultActiveFirstOption: true,
                  onSearch: (value) => {
                    areaSearch.value = value
                  },
                },
                required: ({ current }) => current.isReg,
                options: {
                  labelAsValue: true,
                  // 原生搜索事件更新业务状态，source 只接收字段上下文。
                  source: ({ value }) => {
                    if (areaSearch.value) return uniq([...areaList, areaSearch.value])
                    if (value && !areaList.includes(value)) areaList.push(value)
                    return areaList
                  },
                },
              },
              {
                type: 'Input',
                field: 'addr',
                label: '地址',
                span: 'auto',
                attrs: {
                  allowClear: true,
                },
              },
              {
                type: 'InfoSlot',
                hideInDescription: true,
                colProps: { style: { width: '80px' } },
                render: () => h(Button, () => '选择'),
              },
            ],
          },
          {
            type: 'TextArea',
            field: 'memo',
            label: '备注',
            breakAfter: true,
            disabled(data) {
              return !data.formData.foreverName
            },
            computed(val, data) {
              return data.formData.foreverName
            },
            onUpdate: (args) => {
              console.log('memo:update', args.value)
            },
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
              uploadMode: 'custom',
              listType: 'picture-card',
              isSingle: true,
              valueKey: 'url',
              // showUploadList: false,
            },
            onChange({ current }, { file, fileList }) {
              getBase64WithFile(file).then(({ result }) => {
                fileList[0].url = result
              })
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
            block: true,
            actions: [
              {
                icon: RobotIcon,
                label: '导入',
                onClick() {},
              },
            ],
          },
        ],
      },
      {
        type: 'GroupList',
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
        descriptionsProps: {
          tableLayout: 'fixed',
        },
        contentAttrs: {
          style: 'border-top:1px solid #eee; padding-top: 12px',
        },
        title: (data) => {
          return '列表' + (data.index + 1)
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
        descriptionsProps: {
          tableLayout: 'fixed',
        },
        buttons: {
          limit: 3,
          buttonProps: { size: 'small', type: 'primary' },
          labelMode: 'icon',
          actions: [
            {
              disabled: (data) => {
                console.log(data)
                return data.formData.forever === 2
              },
              label: '新增',
              disabledTooltip: '新增按钮已禁用',
              onClick() {},
            },
            {
              label: '修改',
              hidden: ({ formData }) => formData.forever === 3,
              onClick() {},
            },
            {
              label: '删除',
              icon: RobotIcon,
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
            type: 'InputNumber',
            label: '自定义组件',
            field: 'de',
            attrs: {
              style: 'width: 100%',
              placeholder: '使用当前 Adapter 的真实组件名',
            },
            viewRender: ({ value }) => value,
          },
          {
            type: 'InfoSlot',
            // field: 'test',
            label: '模板插槽',
            attrs: {
              style: 'color: skyblue',
            },
            // labelSlot: ({ current }) => h('span', { style: 'color:red' }, `模板插槽${current.name || ''}`),
            render: 'test',
          },
          {
            type: 'RadioGroup',
            field: 'radio',
            label: '天气',
            attrs: {
              optionType: 'button',
              buttonStyle: 'solid',
              options: [
                { label: '晴天', value: '1' },
                { label: '雨天', value: '2' },
              ],
            },
          },
          {
            type: 'CheckboxGroup',
            field: 'food',
            label: '食物',
            initialValue: [],
            labelField: 'foodName',
            options: {
              source: [
                { label: '中餐', value: '1' },
                { label: '西餐', value: '2' },
              ],
            },
          },
          {
            type: 'TreeSelect',
            field: 'tree',
            label: '树形',
            // labelField: 'treeName',
            treeData,
            // initialValue: () => ['0-0'],
            attrs: {
              // multiple: true,
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
          {
            type: 'InputList',
            field: 'nameList',
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
                // span: 'auto',
                field: '$index', // 只有一个控件并绑定$index时，直接存为数组值。
                // label: '姓名',
                // labelSlot: (data) =>{
                //   return '姓名' + '一二三四'[data.index] //只有一个元素时，可获取到index
                // },
                rules: { required: true },
              },
            ],
          },
          { type: 'Input', field: 'nameRate', label: '客户率' },
          {
            type: 'InputList',
            field: 'datelist',
            // subSpan: 12,
            descriptionsProps: {
              span: 24,
              column: 2,
            },
            compact: true,
            initialValue: () => [{}, {}],
            label: '付款日期',
            // rules: { min: 2 },
            rowButtons: ['add', 'delete'],
            // attrs: {
            //   labelIndex: true,
            // },
            // labelSlot:(data)=> {
            //   // labelIndex为true时，可以为每行生成一个label
            //   return '付款日期' + data.index
            // },
            // hidden: (data) => {
            //   return false
            // },
            // viewRender(data) {
            //   return JSON.stringify(data.value)
            // },
            columns: [
              // {
              //   type: 'InputGroup',
              //   labelSlot: ({ current, index }) => {
              //     // labelIndex为true时，可以为每行生成一个label
              //     const id = index + 1
              //     if (current.length === id) {
              //       return '付款日期' + id + 'end'
              //     }
              //     return '付款日期' + id
              //   },
              //   subItems: [
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
                type: 'Input',
                label: '日期c',
                field: 'index3',
                // required: true,
                rules: { required: true },
                // span: 12,
              },
              //   ],
              // },

              // {
              //   type: 'DatePicker',
              //   label: ({index}) =>'日期a' + (index+1),
              //   field: 'index1',
              //   rules: {required: true}
              //   // span: 12,
              // },
            ],
          },
        ],
      },
      {
        type: 'Table',
        field: 'table',
        label: '表格',
        attrs: { bordered: true, ref: tableRef },
        editable: ({ current }) => {
          return !current.isReg
        },
        // rowEditor: {
        //   editMode: 'inline',
        //   // addMode: 'inline',
        //   singleEdit: true,
        //   form: {
        //     subSpan: 12,
        //     attrs: {
        //       layout: 'vertical',
        //     },
        //   },
        // },
        buttons: {
          visibleIn: 'form',
          actions: [
            {
              name: 'add',
              onClick: (args, action) => {
                console.log(args)
                action()
              },
            },
            'edit',
            'delete',
          ],
        },
        rowButtons: {
          columnProps: { width: 120 },
          buttonProps: { type: 'link' },
          labelMode: 'icon',
          actions: [
            {
              name: 'add',
              onClick: (args, action) => {
                console.log(args)
                action()
              },
            },
            'edit',
            'delete',
          ],
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
              {
                type: 'TreeSelect',
                field: 'selectIds',
                labelField: 'selectNames',
                label: '分组2',
                treeData,
                attrs: { multiple: true },
                editable: ({ current }) => {
                  return !current.okable
                },
              },
            ],
          },
          { type: 'Switch', field: 'okable', label: '开关' },
          {
            type: 'Input',
            field: 'col2',
            label: 'col2',
            rules: { required: true },
            hidden: ({ current }) => {
              return !current.okable
            },
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
            icon: LeafIcon,
            field: 'tab1',
            disabled: (data) => {
              return false
            },
            subItems: [
              {
                type: 'CardList',
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
                  buttonProps: { type: 'link' },
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
                type: 'TimeRangePicker',
                label: '有效期',
                field: 'startDate',
                endField: 'endDate',
              },
            ],
          },
          {
            key: 'tab3',
            label: '第三页',
            field: 'tab3',
            // disabled: ({ formData, ...args }) => {
            //   console.log(formData)
            //   return !formData.isReg
            // },
            disabled: true,
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
              buttonProps: { size: 'small', type: 'primary' },
              labelMode: 'icon',
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
                  icon: UserIcon,
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
