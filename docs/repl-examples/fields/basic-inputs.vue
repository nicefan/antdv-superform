<template>
  <SuperForm @register="register" />
  <pre class="demo-model">{{ model }}</pre>
</template>

<script setup>
import { SuperForm, useForm } from 'superform-antdv'

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
      type: 'InputSearch',
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
    {
      type: 'AutoComplete',
      field: 'city',
      label: '城市',
      options: { source: ['北京', '上海', '深圳'] },
    },
    { type: 'TextArea', field: 'fixedRemark', label: '固定行文本域', attrs: { rows: 3 } },
    {
      type: 'TextArea',
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
          options: { source: ['+86', '+852'] },
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
</script>
