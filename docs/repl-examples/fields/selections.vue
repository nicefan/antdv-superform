<template>
  <SuperForm @register="register" />
  <pre class="demo-model">{{ model }}</pre>
</template>

<script setup>
import { SuperForm, useForm } from 'superform-antdv'

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
      type: 'RadioGroup',
      field: 'role',
      label: '普通单选',
      options: { owner: '负责人', member: '成员' },
    },
    {
      type: 'RadioGroup',
      field: 'priority',
      label: '按钮单选',
      initialValue: 'normal',
      options: { normal: '普通', urgent: '紧急' },
      attrs: { optionType: 'button', buttonStyle: 'solid' },
    },
    {
      type: 'CheckboxGroup',
      field: 'skills',
      label: '复选数组',
      options: ['Vue', 'TypeScript', 'Node.js'],
    },
    {
      type: 'CheckboxGroup',
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
</script>
