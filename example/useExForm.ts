import { h, ref } from 'vue'
import { buildForm, buildModal, defineForm, useModal } from '../src'

export default function exampleForm() {
  const list = ref<any[]>([{ value: '一', label: '一' }])
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
  const acKey = ref('')
  const options = defineForm({
    sectionClass: 'exform-section',
    subItems: [
      {
        type: 'Group',
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
        ]
      },
      {
        type: 'Table',
        field: 'table',
        label: '表格',
        attrs: { bordered: true },
        editMode: 'inline',
        addMode: 'modal',
        buttons: {
          actions: ['add', 'edit', 'del'],
        },
        itemButtons: {
          type: 'link',
          actions: ['edit', 'del'],
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
            type: 'Group',
            label: '分组',
            subItems: [
              { type: 'Input', field: 'group1', label: '分组1' },
              { type: 'Input', field: 'group2', label: '分组2' },
            ],
          },
          { type: 'Input', field: 'col2', label: 'col2' },
        ],
      },

      {
        type: 'Card',
        field: 'group',
        title: '分格线',
        buttons: {
          limit: 3,
          size: 'small',
          type: 'primary',
          iconOnly: true,
          subItems: [
            {
              disabled: (data) => {
                console.log(data)
                return data.formData.forever === 2
              },
              label: '新增',
            },
            {
              label: '修改',
              hidden: ({ formData }) => formData.forever === 3,
            },
            {
              label: '删除',
              icon: 'user',
              confirmText: '确定删除吗？',
              disabled: ({ formData }) => formData.forever === 2,
              attrs: { danger: true },
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
            computed: (val, { record }) => (record.forever === 1 ? val + 1 : val),
            attrs: { max: 200, min: 110 },
            rules: { required: true, type: 'number', min: 110 },
          },
          {
            type: 'Input',
            field: 'height',
            label: '身高',
            disabled: ({ record }) => record?.forever === 2,
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
            data: treeData,
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
            subItems: [
              {
                type: 'List',
                field: 'list',
                label: '列表',
                buttons: {
                  actions: {
                    add: {},
                  },
                },
                itemButtons: {
                  type: 'link',
                  actions: ['del'],
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
                field: 'tab3',
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
              type: 'primary',
              iconOnly: true,
              subItems: [
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
                },
                {
                  label: '删除',
                  icon: 'user',
                  confirmText: '确定删除吗？',
                  disabled: ({ formData }) => formData.forever === 2,
                  attrs: { danger: true },
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
export function useExampleForm() {
  const { options } = exampleForm()
  const { FormComponent, onSubmit } = buildForm(options)
  return { FormComponent, onSubmit }
}
export function useExampleModal() {
  const { options } = exampleForm()
  const { openModal, onSubmit } = buildModal(options)
  return { openModal, onSubmit }
}
