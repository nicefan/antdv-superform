import { h, ref } from 'vue'
import { buildForm, buildModel, defineForm, useModal } from '../src'

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
          slots: {
            title: 'title',
          },
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
    columns: [
      {
        type: 'Input',
        prop: 'name',
        label: '姓名',
        rules: { required: true },
        btnClick(...args) {
          console.log('change:', args)
          acKey.value = 'tab1'
        },
      },
      {
        type: 'DatePicker',
        prop: 'born',
        label: '生日',
        rules: { required: true, trigger: 'change' },
      },
      {
        type: 'Select',
        prop: 'forever',
        keepProp: 'foreverName',
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
        prop: 'isReg',
        valueLabels: ['是', '否'],
      },
      {
        type: 'InputGroup',
        label: '详细地址',
        span: 16,
        gutter: 0,
        columns: [
          {
            type: 'Input',
            prop: 'addr',
            // label: '地址',
            span: 16,
          },
          {
            type: 'Input',
            prop: 'street',
            // label: '街道',
          },
        ],
      },
      {
        type: 'DateRange',
        label: '有效期',
        prop: 'startDate',
        keepProp: 'endDate',
      },
      {
        type: 'Table',
        prop: 'table',
        label: '表格',
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
            prop: 'col1',
            initialValue: 'init',
            rules: { required: true },
          },
          {
            type: 'Input',
            prop: 'col2',
            label: 'col2',
          },
        ],
      },

      {
        type: 'Card',
        prop: 'group',
        title: '分格线',
        buttons: {
          limit: 3,
          size: 'small',
          type: 'primary',
          iconOnly: true,
          items: [
            {
              disabled: (data) => data.forever === 2,
              label: '新增',
            },
            {
              label: '修改',
              hide: ({ formData }) => formData.forever === 3,
            },
            {
              label: '删除',
              icon: 'user',
              confirmText: '确定删除吗？',
              disabled: ({ formData }) => formData.forever === 2,
              attr: { danger: true },
            },
          ],
        },
        columns: [
          {
            type: 'InputNumber',
            prop: 'width',
            label: '体重',
            initialValue: 120,
            disabled: (data) => data.forever === 2,
            computed: (val, data) => (data.forever === 1 ? val + 1 : val),
            attr: { max: 200, min: 110 },
            rules: { required: true, type: 'number', min: 110 },
          },
          {
            type: 'Input',
            prop: 'height',
            label: '身高',
            initialValue: 170,
            attr: { type: 'number' },
            rules: { type: 'number', min: 150 },
          },
          {
            type: 'Radio',
            prop: 'radio',
            label: '天气',
            attr: { buttonStyle: 'outline' },
            options: [
              { label: '晴天', value: '1' },
              { label: '雨天', value: '2' },
            ],
          },
          {
            type: 'Checkbox',
            prop: 'food',
            label: '食物',
            options: [
              { label: '中餐', value: '1' },
              { label: '西餐', value: '2' },
            ],
          },
          {
            type: 'TreeSelect',
            prop: 'tree',
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
            columns: [
              {
                type: 'List',
                prop: 'list',
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
                    prop: 'tab1',
                    initialValue: 'init',
                    rules: { required: true },
                  },
                  {
                    type: 'Input',
                    prop: 'filed2',
                    label: 'filed2',
                  },
                ],
              },
            ],
          },
          {
            key: 'tab2',
            label: '第二页',
            hide: ({ formData }) => formData.forever === 3,
            // disabled: true,
            columns: [
              {
                type: 'Input',
                prop: 'tab2',
                label: 'tab2',
              },
              {
                type: 'Input',
                prop: 'tab4',
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
            columns: [
              {
                type: 'Input',
                prop: 'tab3',
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
            prop: 'collapse',
            label: '百叶窗',
            buttons: {
              limit: 1,
              size: 'small',
              type: 'primary',
              iconOnly: true,
              items: [
                {
                  label: '新增',
                  onClick(arg) {
                    console.log('onclick', arg)
                    openModal()
                  },
                },
                {
                  label: '修改',
                  hide: (data) => data.forever === 3,
                },
                {
                  label: '删除',
                  icon: 'user',
                  confirmText: '确定删除吗？',
                  disabled: (data) => data.forever === 2,
                  attr: { danger: true },
                },
              ],
            },
            columns: [
              {
                type: 'InputNumber',
                prop: 'width',
                label: '体重',
                initialValue: 120,
                attr: { max: 200, min: 110 },
                rules: { required: true },
              },
              {
                type: 'Input',
                prop: 'home',
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
  const { openModal, onSubmit } = buildModel(options)
  return { openModal, onSubmit }
}
