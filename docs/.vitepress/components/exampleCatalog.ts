export interface ExampleItem {
  id: string
  title: string
  description: string
  level?: '基础' | '进阶' | '综合'
  code: string
}

export interface ExampleGroup {
  title: string
  items: ExampleItem[]
}

export const exampleGroups: ExampleGroup[] = [
  {
    title: '表单',
    items: [
      {
        id: 'form-basics',
        title: '基础表单',
        description: '字段、校验、提交和重置。',
        code: `<template>
  <SuperForm @register="register" @submit="result = $event" />
  <pre>{{ result }}</pre>
</template>

<script setup>
import { ref } from 'vue'
import { SuperForm, useForm } from 'antdv-superform'

const result = ref()
const [register] = useForm({
  subSpan: 12,
  buttons: { actions: ['submit', 'reset'] },
  subItems: [
    { type: 'Input', field: 'name', label: '姓名', required: true },
    { type: 'InputNumber', field: 'age', label: '年龄', attrs: { min: 0 } },
    {
      type: 'Select',
      field: 'status',
      label: '状态',
      initialValue: 1,
      options: [
        { label: '启用', value: 1 },
        { label: '停用', value: 0 },
      ],
    },
    { type: 'Textarea', field: 'remark', label: '备注', span: 24 },
  ],
})
</script>`,
      },
      {
        id: 'form-linkage',
        title: '状态与联动',
        description: '动态显隐、必填、属性和计算字段。',
        code: `<template><SuperForm @register="register" /></template>

<script setup>
import { SuperForm, useForm } from 'antdv-superform'

const [register] = useForm({
  subSpan: 12,
  subItems: [
    {
      type: 'Radio',
      field: 'result',
      label: '审核结果',
      initialValue: 'pass',
      options: [
        { label: '通过', value: 'pass' },
        { label: '驳回', value: 'reject' },
      ],
    },
    {
      type: 'Textarea',
      field: 'reason',
      label: '驳回原因',
      span: 24,
      hidden: ({ current }) => current.result !== 'reject',
      required: ({ current }) => current.result === 'reject',
    },
    { type: 'InputNumber', field: 'quantity', label: '数量', initialValue: 1 },
    { type: 'InputNumber', field: 'price', label: '单价', initialValue: 100 },
    {
      type: 'InputNumber',
      field: 'amount',
      label: '金额',
      disabled: true,
      computed: (_value, { current }) => current.quantity * current.price,
    },
  ],
})
</script>`,
      },
    ],
  },
  {
    title: '字段配置对比',
    items: [
      {
        id: 'basic-inputs',
        title: '基础输入配置对比',
        description: '同屏比较 Input、数字、文本域和标签的不同配置。',
        code: `<template>
  <SuperForm @register="register" />
  <pre class="demo-model">{{ model }}</pre>
</template>

<script setup>
import { SuperForm, useForm } from 'antdv-superform'

const [register, form] = useForm({
  subSpan: 12,
  subItems: [
    { type: 'Input', field: 'defaultInput', label: '默认输入' },
    {
      type: 'Input',
      field: 'limitedInput',
      label: '限制长度',
      attrs: { maxlength: 12, showCount: true, prefix: 'NO.' },
    },
    {
      type: 'Input',
      field: 'keyword',
      label: '搜索输入',
      attrs: { enterButton: '搜索' },
      onSearch: (_data, value) => alert('搜索：' + value),
    },
    { type: 'InputNumber', field: 'quantity', label: '整数数量', attrs: { min: 0, step: 1 } },
    {
      type: 'InputNumber',
      field: 'price',
      label: '金额输入',
      attrs: { min: 0, precision: 2, addonAfter: '元' },
    },
    { type: 'AutoComplete', field: 'city', label: '城市', options: ['北京', '上海', '深圳'] },
    { type: 'Textarea', field: 'fixedRemark', label: '固定行文本域', attrs: { rows: 3 } },
    {
      type: 'Textarea',
      field: 'autoRemark',
      label: '自适应文本域',
      attrs: { autoSize: { minRows: 2, maxRows: 6 }, maxlength: 100, showCount: true },
    },
    { type: 'TagInput', field: 'arrayTags', label: '数组标签', initialValue: ['Vue', 'Schema'] },
    {
      type: 'TagInput',
      field: 'stringTags',
      label: '字符串标签',
      initialValue: '合同,客户',
      attrs: { stringifyValue: true, newLabel: '新增关键词' },
    },
    {
      type: 'InputGroup',
      field: 'phone',
      label: '紧凑输入组',
      span: 24,
      subItems: [
        {
          type: 'Select',
          field: 'countryCode',
          span: 6,
          initialValue: '+86',
          options: ['+86', '+852'],
        },
        { type: 'Input', field: 'number', span: 18, attrs: { placeholder: '手机号' } },
      ],
    },
    {
      type: 'InputGroup',
      field: 'range',
      label: '非紧凑输入组',
      span: 24,
      attrs: { compact: false },
      subItems: [
        { type: 'InputNumber', field: 'min', span: 10 },
        { type: 'InfoSlot', render: () => '至', span: 'auto', align: 'center' },
        { type: 'InputNumber', field: 'max', span: 10 },
      ],
    },
  ],
})
const model = form.dataSource
</script>`,
      },
      {
        id: 'selections',
        title: '选择输入配置对比',
        description: '比较单选、多选、标签同步、字符串值和按钮形态。',
        code: `<template>
  <SuperForm @register="register" />
  <pre class="demo-model">{{ model }}</pre>
</template>

<script setup>
import { SuperForm, useForm } from 'antdv-superform'

const options = [
  { label: '研发', value: 'dev' },
  { label: '产品', value: 'product' },
  { label: '设计', value: 'design' },
]
const [register, form] = useForm({
  subSpan: 12,
  subItems: [
    {
      type: 'Select',
      field: 'departmentId',
      label: '单选 + 标签同步',
      options,
      labelField: 'departmentName',
    },
    {
      type: 'Select',
      field: 'departments',
      label: '多选数组',
      options,
      attrs: { mode: 'multiple', maxTagCount: 2 },
    },
    {
      type: 'Select',
      field: 'departmentCodes',
      label: '多选字符串',
      options,
      stringifyValue: true,
      attrs: { mode: 'multiple' },
    },
    {
      type: 'Radio',
      field: 'role',
      label: '普通单选',
      options: { owner: '负责人', member: '成员' },
    },
    {
      type: 'Radio',
      field: 'priority',
      label: '按钮单选',
      initialValue: 'normal',
      options: { normal: '普通', urgent: '紧急' },
      attrs: { optionType: 'button', buttonStyle: 'solid' },
    },
    {
      type: 'Checkbox',
      field: 'skills',
      label: '复选数组',
      options: ['Vue', 'TypeScript', 'Node.js'],
    },
    {
      type: 'Checkbox',
      field: 'skillText',
      label: '复选字符串',
      options: ['Vue', 'TypeScript', 'Node.js'],
      stringifyValue: true,
    },
    { type: 'Switch', field: 'enabled', label: '布尔开关' },
    {
      type: 'Switch',
      field: 'status',
      label: '枚举开关 + 标签同步',
      labelField: 'statusName',
      options: [
        { label: '停用', value: 0 },
        { label: '启用', value: 1 },
      ],
    },
    { type: 'TagSelect', field: 'team', label: '标签单选', options },
    { type: 'TagSelect', field: 'teams', label: '标签多选', options, attrs: { multiple: true } },
    {
      type: 'TreeSelect',
      field: 'regionCode',
      labelField: 'regionName',
      label: '树选择 + 标签同步',
      treeData: [
        {
          title: '中国',
          value: 'cn',
          children: [
            { title: '上海', value: 'sh' },
            { title: '北京', value: 'bj' },
          ],
        },
      ],
    },
  ],
})
const model = form.dataSource
</script>`,
      },
      {
        id: 'date-time',
        title: '日期时间配置对比',
        description: '比较显示格式、存储格式和范围的三种数据模型。',
        code: `<template>
  <SuperForm @register="register" />
  <pre class="demo-model">{{ model }}</pre>
</template>

<script setup>
import { SuperForm, useForm } from 'antdv-superform'

const [register, form] = useForm({
  subSpan: 12,
  subItems: [
    { type: 'DatePicker', field: 'date', label: '标准日期' },
    {
      type: 'DatePicker',
      field: 'month',
      label: '月份选择',
      attrs: { picker: 'month', format: 'YYYY年MM月', valueFormat: 'YYYY-MM' },
    },
    {
      type: 'DatePicker',
      field: 'meetingAt',
      label: '日期时间',
      attrs: { showTime: true, valueFormat: 'YYYY-MM-DD HH:mm:ss' },
    },
    { type: 'TimePicker', field: 'remindAt', label: '时间点', attrs: { minuteStep: 15 } },
    { type: 'DateRange', field: 'validRange', label: '范围数组', span: 24 },
    {
      type: 'DateRange',
      field: 'startDate',
      endField: 'endDate',
      label: '开始/结束字段',
      span: 24,
    },
    {
      type: 'DateRange',
      field: 'rangeText',
      label: '逗号字符串',
      span: 24,
      stringifyValue: true,
    },
    { type: 'TimeRange', field: 'startTime', endField: 'endTime', label: '时间双字段', span: 24 },
  ],
})
const model = form.dataSource
</script>`,
      },
      {
        id: 'upload',
        title: '文件上传配置对比',
        description: '比较单文件、多文件、base64、文本和完整 fileList。',
        code: `<template>
  <SuperForm @register="register" />
  <pre class="demo-model">{{ model }}</pre>
</template>

<script setup>
import { SuperForm, useForm } from 'antdv-superform'

const [register, form] = useForm({
  subItems: [
    {
      type: 'Upload',
      field: 'avatarBase64',
      label: 'Base64 单图',
      attrs: {
        uploadMode: 'base64',
        isSingle: true,
        accept: '.png,.jpg,.jpeg',
        maxSize: 2,
        listType: 'picture',
      },
    },
    {
      type: 'Upload',
      field: 'importFile',
      label: 'Custom 单文件',
      attrs: {
        uploadMode: 'custom',
        isSingle: true,
        accept: '.xlsx',
        tip: '保留 originFileObj，由业务上传',
      },
    },
    {
      type: 'Upload',
      field: 'attachments',
      label: 'Custom 多附件',
      attrs: { uploadMode: 'custom', maxCount: 3, hideOnMax: true, repeatable: false },
    },
    {
      type: 'Upload',
      field: 'attachmentNames',
      label: '值 + 完整列表',
      vModelFields: { fileList: 'attachmentFiles' },
      attrs: { uploadMode: 'custom', valueKey: 'name', maxCount: 2 },
    },
    {
      type: 'Upload',
      field: 'textContent',
      label: '读取文本',
      attrs: { uploadMode: 'text', isSingle: true, accept: '.txt,.json' },
    },
  ],
})
const model = form.dataSource
</script>`,
      },
      {
        id: 'rendering',
        title: '展示与自定义渲染',
        description: 'Text、HTML、Hidden、InputSlot 与 InfoSlot。',
        code: `<template><SuperForm @register="register" /></template>

<script setup>
import { h } from 'vue'
import { SuperForm, useForm } from 'antdv-superform'

const [register] = useForm({
  subItems: [
    { type: 'Hidden', field: 'id', initialValue: 1001 },
    {
      type: 'Text',
      field: 'code',
      label: '编码',
      initialValue: 'SF-001',
      attrs: { style: 'font-weight: 600' },
    },
    {
      type: 'HTML',
      field: 'notice',
      label: '提示',
      initialValue: '<strong style="color:#1677ff">可信 HTML</strong>',
    },
    {
      type: 'InputSlot',
      field: 'color',
      label: '颜色',
      initialValue: '#1677ff',
      render: ({ props }) =>
        h('input', {
          type: 'color',
          value: props.value,
          onInput: (e) => props['onUpdate:value'](e.target.value),
        }),
    },
    {
      type: 'InfoSlot',
      block: true,
      render: ({ current }) => h('p', '当前颜色：' + current.color),
    },
  ],
})
</script>`,
      },
    ],
  },
  {
    title: '容器与数组',
    items: [
      {
        id: 'containers',
        title: '布局容器',
        description: 'Group、Fragment、Card、Tabs 与 Collapse。',
        code: `<template><SuperForm @register="register" /></template>

<script setup>
import { SuperForm, useForm } from 'antdv-superform'

const [register] = useForm({
  subItems: [
    {
      type: 'Group',
      title: '基础信息',
      subItems: [
        { type: 'Input', field: 'name', label: '名称' },
        { type: 'Input', field: 'code', label: '编码' },
      ],
    },
    {
      type: 'Card',
      title: '联系方式',
      subItems: [
        { type: 'Input', field: 'mobile', label: '手机' },
        { type: 'Input', field: 'email', label: '邮箱' },
      ],
    },
    {
      type: 'Tabs',
      subItems: [
        {
          label: '说明',
          subItems: [{ type: 'Textarea', field: 'description', label: '说明', span: 24 }],
        },
        {
          label: '备注',
          subItems: [{ type: 'Textarea', field: 'remark', label: '备注', span: 24 }],
        },
      ],
    },
  ],
})
</script>`,
      },
      {
        id: 'collections',
        title: '数组编辑',
        description: 'InputList、ListGroup 和 List 的数据形态与布局。',
        code: `<template><SuperForm @register="register" /></template>

<script setup>
import { SuperForm, useForm } from 'antdv-superform'

const [register] = useForm({
  subItems: [
    {
      type: 'InputList',
      field: 'emails',
      label: '通知邮箱',
      initialValue: () => [''],
      columns: [{ type: 'Input', field: '$index', rules: { type: 'email' } }],
    },
    {
      type: 'ListGroup',
      field: 'experiences',
      title: '工作经历',
      initialValue: () => [{}],
      attrs: { labelIndex: true },
      columns: [
        { type: 'Input', field: 'company', label: '公司', required: true },
        { type: 'Input', field: 'position', label: '职位' },
        { type: 'DateRange', field: 'startDate', endField: 'endDate', label: '任职时间' },
      ],
    },
  ],
})
</script>`,
      },
      {
        id: 'table-local',
        title: 'Table 数组表格',
        description: '表单内的本地数组、列渲染和整表编辑。',
        code: `<template>
  <SuperForm @register="register" />
</template>

<script setup>
import { SuperForm, useForm } from 'antdv-superform'

const [register] = useForm({
  subItems: [
    {
      type: 'Table',
      field: 'items',
      title: '订单明细',
      editable: true,
      initialValue: () => [
        { id: 1, product: '机械键盘', quantity: 2, price: 399 },
        { id: 2, product: '显示器', quantity: 1, price: 1299 },
      ],
      attrs: { rowKey: 'id' },
      columns: [
        { type: 'Hidden', field: 'id' },
        { type: 'Input', field: 'product', label: '商品', required: true },
        { type: 'InputNumber', field: 'quantity', label: '数量', required: true },
        { type: 'InputNumber', field: 'price', label: '单价', required: true },
      ],
    },
  ],
})
</script>`,
      },
    ],
  },
  {
    title: '业务表单',
    items: [
      {
        id: 'business-employee',
        title: '员工资料登记',
        level: '基础',
        description: '基础资料、联系方式、岗位与标签。',
        code: `<template>
  <div class="demo-note">基础业务表单：先掌握字段、默认值、校验和提交。</div>
  <SuperForm @register="register" @submit="submitted = $event" />
  <pre class="demo-model">{{ submitted || model }}</pre>
</template>

<script setup>
import { ref } from 'vue'
import { SuperForm, useForm } from 'antdv-superform'
import { departmentOptions } from './mock'

const submitted = ref()
const [register, form] = useForm({
  subSpan: 12,
  buttons: { actions: ['submit', 'reset'] },
  subItems: [
    { type: 'Hidden', field: 'employeeId' },
    { type: 'Input', field: 'name', label: '姓名', required: true },
    { type: 'Input', field: 'mobile', label: '手机号', required: true, rules: { type: 'mobile' } },
    { type: 'Input', field: 'email', label: '邮箱', rules: { type: 'email' } },
    { type: 'DatePicker', field: 'joinedAt', label: '入职日期', required: true },
    {
      type: 'Select',
      field: 'departmentId',
      labelField: 'departmentName',
      label: '所属部门',
      options: departmentOptions,
      required: true,
    },
    { type: 'Input', field: 'position', label: '岗位' },
    { type: 'Switch', field: 'enabled', label: '在职状态', initialValue: true },
    { type: 'TagInput', field: 'skills', label: '技能标签', span: 24, initialValue: ['Vue'] },
  ],
})
const model = form.dataSource
</script>`,
      },
      {
        id: 'business-customer',
        title: '客户建档',
        level: '进阶',
        description: '个人/企业客户切换、动态显隐和条件必填。',
        code: `<template>
  <div class="demo-note">切换客户类型，观察企业字段的显隐、必填和模型保留。</div>
  <SuperForm @register="register" />
  <pre class="demo-model">{{ model }}</pre>
</template>

<script setup>
import { SuperForm, useForm } from 'antdv-superform'

const isCompany = ({ current }) => current.customerType === 'company'
const [register, form] = useForm({
  subSpan: 12,
  buttons: { actions: ['submit', 'reset'] },
  subItems: [
    {
      type: 'Radio',
      field: 'customerType',
      label: '客户类型',
      initialValue: 'personal',
      options: { personal: '个人客户', company: '企业客户' },
      attrs: { optionType: 'button', buttonStyle: 'solid' },
    },
    { type: 'Input', field: 'customerName', label: '客户名称', required: true },
    {
      type: 'Input',
      field: 'creditCode',
      label: '统一社会信用代码',
      hidden: (data) => !isCompany(data),
      required: isCompany,
    },
    {
      type: 'Input',
      field: 'legalRepresentative',
      label: '法定代表人',
      hidden: (data) => !isCompany(data),
      required: isCompany,
    },
    {
      type: 'Select',
      field: 'customerLevel',
      label: '客户等级',
      initialValue: 'normal',
      options: { normal: '普通', important: '重点', strategic: '战略' },
    },
    {
      type: 'Card',
      title: '主要联系人',
      subSpan: 12,
      subItems: [
        { type: 'Input', field: 'contact.name', label: '联系人', required: true },
        { type: 'Input', field: 'contact.mobile', label: '联系电话', rules: { type: 'mobile' } },
        { type: 'Input', field: 'contact.email', label: '联系邮箱', rules: { type: 'email' } },
        {
          type: 'Select',
          field: 'contact.preference',
          label: '首选方式',
          options: ['电话', '邮件', '微信'],
        },
      ],
    },
    { type: 'Textarea', field: 'address', label: '联系地址', span: 24, attrs: { rows: 2 } },
    {
      type: 'Textarea',
      field: 'remark',
      label: '客户备注',
      span: 24,
      attrs: { rows: 3, maxlength: 300, showCount: true },
    },
  ],
})
const model = form.dataSource
</script>`,
      },
      {
        id: 'business-order',
        title: '销售订单',
        level: '进阶',
        description: '客户、订单明细、行金额与订单合计。',
        code: `<template>
  <div class="demo-note">修改数量或单价，行金额与订单合计会写回模型。</div>
  <SuperForm @register="register" />
  <pre class="demo-model">{{ model }}</pre>
</template>

<script setup>
import { SuperForm, useForm } from 'antdv-superform'
import { cloneMock, customerOptions, mockOrderItems } from './mock'

const [register, form] = useForm({
  subSpan: 12,
  buttons: { actions: ['submit', 'reset'] },
  subItems: [
    {
      type: 'Input',
      field: 'orderNo',
      label: '订单编号',
      initialValue: 'SO-2026-001',
      disabled: true,
    },
    { type: 'DatePicker', field: 'orderDate', label: '订单日期', required: true },
    {
      type: 'Select',
      field: 'customerId',
      labelField: 'customerName',
      label: '客户',
      required: true,
      options: customerOptions,
    },
    {
      type: 'Select',
      field: 'currency',
      label: '币种',
      initialValue: 'CNY',
      options: ['CNY', 'USD', 'EUR'],
    },
    {
      type: 'Table',
      field: 'items',
      title: '订单明细',
      editable: true,
      initialValue: () => cloneMock(mockOrderItems),
      attrs: { rowKey: 'id', pagination: false },
      buttons: { actions: ['add'] },
      rowButtons: { actions: ['delete'], columnProps: { width: 80 } },
      columns: [
        { type: 'Hidden', field: 'id' },
        { type: 'Input', field: 'product', label: '商品/服务', required: true },
        {
          type: 'InputNumber',
          field: 'quantity',
          label: '数量',
          initialValue: 1,
          attrs: { min: 1 },
        },
        {
          type: 'InputNumber',
          field: 'price',
          label: '单价',
          initialValue: 0,
          attrs: { min: 0, precision: 2 },
        },
        {
          type: 'InputNumber',
          field: 'amount',
          label: '行金额',
          editable: false,
          computed: (_value, { current }) =>
            Number(current.quantity || 0) * Number(current.price || 0),
        },
      ],
    },
    {
      type: 'InputNumber',
      field: 'totalAmount',
      label: '订单合计',
      disabled: true,
      attrs: { precision: 2, addonAfter: '元' },
      computed: (_value, { current }) =>
        (current.items || []).reduce((sum, item) => sum + Number(item.amount || 0), 0),
    },
    { type: 'Textarea', field: 'deliveryAddress', label: '交付地址', span: 24, required: true },
  ],
})
const model = form.dataSource
</script>`,
      },
      {
        id: 'business-contract',
        title: '合同登记',
        level: '综合',
        description: '合同主体、金额、期限、付款计划和附件。',
        code: `<template>
  <div class="demo-note">综合表单：包含多层分组、关联字段、双日期字段、明细表与附件。</div>
  <SuperForm @register="register" @submit="submitted = $event" />
  <pre class="demo-model">{{ submitted || model }}</pre>
</template>

<script setup>
import { ref } from 'vue'
import { SuperForm, useForm } from 'antdv-superform'
import { cloneMock, customerOptions, mockPaymentPlans } from './mock'

const submitted = ref()
const [register, form] = useForm({
  subSpan: 12,
  buttons: { align: 'center', actions: ['submit', 'reset'] },
  subItems: [
    {
      type: 'Card',
      title: '合同基本信息',
      subSpan: 12,
      subItems: [
        { type: 'Hidden', field: 'contractId' },
        {
          type: 'Input',
          field: 'contractNo',
          label: '合同编号',
          initialValue: 'HT-2026-001',
          required: true,
        },
        { type: 'Input', field: 'contractName', label: '合同名称', required: true },
        {
          type: 'Select',
          field: 'contractType',
          label: '合同类型',
          required: true,
          options: { sales: '销售合同', purchase: '采购合同', service: '服务合同' },
        },
        {
          type: 'DateRange',
          field: 'startDate',
          endField: 'endDate',
          label: '合同期限',
          required: true,
        },
        {
          type: 'InputNumber',
          field: 'amount',
          label: '合同金额',
          required: true,
          attrs: { min: 0, precision: 2, addonAfter: '元' },
        },
        {
          type: 'Select',
          field: 'currency',
          label: '币种',
          initialValue: 'CNY',
          options: ['CNY', 'USD', 'EUR'],
        },
      ],
    },
    {
      type: 'Card',
      title: '合同双方',
      subSpan: 12,
      subItems: [
        {
          type: 'Select',
          field: 'customerId',
          labelField: 'customerName',
          label: '甲方客户',
          required: true,
          options: customerOptions,
        },
        { type: 'Input', field: 'customerContact', label: '甲方联系人' },
        {
          type: 'Input',
          field: 'supplierName',
          label: '乙方主体',
          initialValue: '示例软件有限公司',
          required: true,
        },
        { type: 'Input', field: 'supplierContact', label: '乙方联系人' },
      ],
    },
    {
      type: 'Table',
      field: 'paymentPlans',
      title: '付款计划',
      editable: true,
      initialValue: () => cloneMock(mockPaymentPlans),
      attrs: { rowKey: 'id', pagination: false },
      buttons: { actions: ['add'] },
      rowButtons: { actions: ['delete'], columnProps: { width: 80 } },
      columns: [
        { type: 'Hidden', field: 'id' },
        { type: 'Input', field: 'stage', label: '付款阶段', required: true },
        {
          type: 'InputNumber',
          field: 'ratio',
          label: '付款比例',
          attrs: { min: 0, max: 100, addonAfter: '%' },
          required: true,
        },
        { type: 'DatePicker', field: 'plannedDate', label: '计划日期' },
        {
          type: 'InputNumber',
          field: 'plannedAmount',
          label: '计划金额',
          editable: false,
          computed: (_value, { current, formData }) =>
            (Number(formData.amount || 0) * Number(current.ratio || 0)) / 100,
        },
      ],
    },
    {
      type: 'Textarea',
      field: 'terms',
      label: '主要条款',
      span: 24,
      attrs: { rows: 4, maxlength: 1000, showCount: true },
    },
    {
      type: 'Upload',
      field: 'attachments',
      label: '合同附件',
      span: 24,
      attrs: {
        uploadMode: 'custom',
        maxCount: 5,
        hideOnMax: true,
        accept: '.pdf,.doc,.docx',
        tip: '演示环境保留本地文件，不提交服务器',
      },
    },
  ],
})
const model = form.dataSource
</script>`,
      },
      {
        id: 'business-contract-approval',
        title: '合同审批',
        level: '综合',
        description: '只读摘要、审批结果、条件原因和风险意见。',
        code: `<template>
  <div class="demo-note">选择“退回修改”或“拒绝”，审批原因会自动显示并变为必填。</div>
  <SuperForm @register="register" @submit="submitted = $event" />
  <pre class="demo-model">{{ submitted || model }}</pre>
</template>

<script setup>
import { h, ref } from 'vue'
import { SuperForm, useForm } from 'antdv-superform'

const submitted = ref()
const needsReason = ({ current }) => ['return', 'reject'].includes(current.approvalResult)
const [register, form] = useForm({
  dataSource: {
    contractId: 9001,
    contractNo: 'HT-2026-001',
    contractName: '企业软件采购合同',
    customerName: '星海科技有限公司',
    amount: 188000,
  },
  subSpan: 12,
  buttons: { align: 'center', actions: ['submit', 'reset'] },
  subItems: [
    { type: 'Hidden', field: 'contractId' },
    {
      type: 'Card',
      title: '合同摘要',
      subItems: [
        { type: 'Text', field: 'contractNo', label: '合同编号' },
        { type: 'Text', field: 'contractName', label: '合同名称' },
        { type: 'Text', field: 'customerName', label: '客户名称' },
        {
          type: 'InfoSlot',
          label: '合同金额',
          render: ({ current }) => h('strong', '¥ ' + Number(current.amount || 0).toLocaleString()),
        },
      ],
    },
    {
      type: 'Card',
      title: '审批意见',
      subSpan: 12,
      subItems: [
        {
          type: 'Radio',
          field: 'approvalResult',
          label: '审批结果',
          initialValue: 'approve',
          required: true,
          options: { approve: '同意', return: '退回修改', reject: '拒绝' },
          attrs: { optionType: 'button', buttonStyle: 'solid' },
        },
        {
          type: 'Select',
          field: 'riskLevel',
          label: '风险等级',
          initialValue: 'low',
          options: { low: '低风险', medium: '中风险', high: '高风险' },
        },
        {
          type: 'Textarea',
          field: 'approvalReason',
          label: '退回/拒绝原因',
          span: 24,
          hidden: (data) => !needsReason(data),
          required: needsReason,
          attrs: { rows: 3, maxlength: 300, showCount: true },
        },
        {
          type: 'Textarea',
          field: 'riskOpinion',
          label: '风险意见',
          span: 24,
          required: ({ current }) => current.riskLevel === 'high',
          dynamicAttrs: ({ current }) => ({
            placeholder: current.riskLevel === 'high' ? '高风险合同必须填写处置意见' : '可选填写',
          }),
        },
        { type: 'Switch', field: 'notifyOwner', label: '通知合同负责人', initialValue: true },
      ],
    },
  ],
})
const model = form.dataSource
</script>`,
      },
    ],
  },
  {
    title: '页面组件',
    items: [
      {
        id: 'table-query',
        title: 'SuperTable 查询',
        description: '搜索、分页、请求参数和最后一次响应生效。',
        code: `<template>
  <SuperTable @register="register" />
</template>

<script setup>
import { SuperTable, useTable } from 'antdv-superform'
import { mockApis, statusOptions } from './mock'

const [register] = useTable({
  pagination: { pageSize: 8 },
  attrs: { rowKey: 'id' },
  apis: { query: mockApis.users.page },
  searchForm: { subItems: ['name', 'status'] },
  columns: [
    { type: 'Input', field: 'name', label: '姓名' },
    { type: 'Select', field: 'status', label: '状态', options: statusOptions },
  ],
})
</script>`,
      },
      {
        id: 'table-search-on-change',
        title: '查询条件即时生效',
        level: '进阶',
        description: 'searchOnChange 让任意查询字段变化后自动刷新。',
        code: `<template>
  <div class="demo-note">修改关键词、状态或部门，表格会自动刷新，无需点击查询。</div>
  <SuperTable @register="register" />
</template>

<script setup>
import { SuperTable, useTable } from 'antdv-superform'
import { departmentNameOptions, mockApis, statusOptions } from './mock'

const [register] = useTable({
  isScanHeight: false,
  pagination: false,
  attrs: { rowKey: 'id' },
  apis: { query: mockApis.users.list },
  searchForm: {
    searchOnChange: true,
    subSpan: 8,
    subItems: [
      { type: 'Input', field: 'name', label: '姓名' },
      {
        type: 'Select',
        field: 'status',
        label: '状态',
        options: statusOptions,
      },
      {
        type: 'Select',
        field: 'department',
        label: '部门',
        options: departmentNameOptions,
      },
    ],
  },
  columns: [
    { field: 'name', label: '姓名' },
    { field: 'department', label: '部门' },
    { field: 'status', label: '状态', options: statusOptions },
  ],
})
</script>`,
      },
      {
        id: 'table-mixed-query',
        title: '手动与即时混合查询',
        level: '进阶',
        description: '文本条件手动提交，选择条件通过 params 即时查询。',
        code: `<template>
  <div class="demo-note">输入名称后点击查询；切换状态会通过 params 立即刷新。</div>
  <SuperTable @register="register" />
</template>

<script setup>
import { reactive, toRef } from 'vue'
import { SuperTable, useTable } from 'antdv-superform'
import { mockApis, statusOptions } from './mock'

const filters = reactive({ status: undefined })
const status = toRef(filters, 'status')

const [register] = useTable({
  isScanHeight: false,
  pagination: false,
  attrs: { rowKey: 'id' },
  apis: { query: mockApis.customers.list },
  params: { status },
  searchForm: {
    subItems: [
      { type: 'Input', field: 'name', label: '客户名称' },
      {
        type: 'Select',
        field: 'status',
        label: '状态',
        value: status,
        options: statusOptions,
      },
    ],
  },
  columns: [
    { field: 'name', label: '客户名称' },
    { field: 'status', label: '状态', options: statusOptions },
  ],
})
</script>`,
      },
      {
        id: 'table-master-detail',
        title: '主从表联动',
        level: '综合',
        description: '左表选择记录，通过响应式 params 驱动右表查询。',
        code: `<template>
  <div class="demo-note">选择左侧部门后，右侧员工表才会发起查询。</div>
  <div class="linked-tables">
    <SuperTable @register="registerDepartments" />
    <SuperTable @register="registerEmployees" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { SuperTable, useTable } from 'antdv-superform'
import { mockApis, mockDepartments } from './mock'

const departmentId = ref()

const [registerDepartments] = useTable(
  {
    title: '部门',
    isScanHeight: false,
    pagination: false,
    attrs: {
      rowKey: 'id',
      rowSelection: {
        type: 'radio',
        onSelect: (record, selected) => selected && (departmentId.value = record.id),
      },
    },
    columns: [{ field: 'name', label: '部门名称' }],
  },
  mockDepartments
)

const [registerEmployees] = useTable({
  title: '部门员工',
  isScanHeight: false,
  pagination: false,
  immediate: false,
  attrs: { rowKey: 'id' },
  apis: { query: mockApis.employees.list },
  params: { departmentId },
  columns: [
    { field: 'name', label: '姓名' },
    { field: 'position', label: '岗位' },
  ],
})
</script>

<style>
.linked-tables {
  display: grid;
  grid-template-columns: minmax(220px, 1fr) 2fr;
  gap: 16px;
}
@media (max-width: 720px) {
  .linked-tables {
    grid-template-columns: 1fr;
  }
}
</style>`,
      },
      {
        id: 'detail',
        title: 'SuperDetail',
        description: '选项映射、范围和自定义只读展示。',
        code: `<template><SuperDetail :schema="schema" :data-source="record" /></template>

<script setup>
import { SuperDetail } from 'antdv-superform'

const record = {
  name: 'Antdv SuperForm',
  status: 1,
  startDate: '2026-01-01',
  endDate: '2026-12-31',
  description: '同一份字段 Schema 可以服务于输入和只读展示。',
}
const schema = {
  mode: 'table',
  attrs: { bordered: true },
  subSpan: 12,
  subItems: [
    { field: 'name', label: '名称' },
    { field: 'status', label: '状态', options: { 0: '停用', 1: '启用' } },
    { type: 'DateRange', field: 'startDate', endField: 'endDate', label: '有效期' },
    { type: 'Textarea', field: 'description', label: '说明', span: 24 },
  ],
}
</script>`,
      },
      {
        id: 'modal-form',
        title: '弹窗表单',
        description: 'useModalForm 的打开、回填和确认提交。',
        code: `<template>
  <ModalDemo />
</template>

<script setup>
import { defineComponent, h } from 'vue'
import { useModalForm } from 'antdv-superform'

const ModalDemo = defineComponent({
  setup() {
    const modal = useModalForm(
      {
        title: '编辑用户',
        subSpan: 24,
        subItems: [
          { type: 'Hidden', field: 'id' },
          { type: 'Input', field: 'name', label: '姓名', required: true },
          { type: 'Switch', field: 'enabled', label: '启用' },
        ],
      },
      {
        width: 520,
        onOk: async (data) => console.log('提交数据', data),
      }
    )
    const open = () => modal.openModal({ data: { id: 1, name: '张三', enabled: true } })
    return () => h('button', { class: 'open', onClick: open }, '编辑用户')
  },
})
</script>

<style>
.open {
  padding: 8px 16px;
  color: white;
  background: #1677ff;
  border: 0;
  border-radius: 6px;
}
</style>`,
      },
      {
        id: 'buttons',
        title: '按钮组',
        description: '按钮外观、确认、禁用与更多菜单。',
        code: `<template>
  <SuperButtons button-type="default" :limit="3" :actions="actions" />
</template>

<script setup>
import { SuperButtons } from 'antdv-superform'

const actions = [
  { name: 'save', label: '保存', attrs: { type: 'primary' }, onClick: () => alert('已保存') },
  { name: 'preview', label: '预览', onClick: () => alert('预览') },
  { name: 'archive', label: '归档', confirmText: '确定归档吗？', onClick: () => alert('已归档') },
  { name: 'disabled', label: '不可用', disabled: true, disabledTooltip: '当前状态不可用' },
]
</script>`,
      },
    ],
  },
]

export const allExamples = exampleGroups.flatMap((group) => group.items)
