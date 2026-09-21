<template>
  <div class="demo-note">切换客户类型，观察企业字段的显隐、必填和模型保留。</div>
  <SuperForm @register="register" />
  <pre class="demo-model">{{ model }}</pre>
</template>

<script setup>
import { SuperForm, useForm } from 'superform-antdv'

const isCompany = ({ current }) => current.customerType === 'company'
const [register, form] = useForm({
  subSpan: 12,
  buttons: { actions: ['submit', 'reset'] },
  subItems: [
    {
      type: 'RadioGroup',
      field: 'customerType',
      label: '客户类型',
      initialValue: 'personal',
      options: { source: { personal: '个人客户', company: '企业客户' } },
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
      options: { source: { normal: '普通', important: '重点', strategic: '战略' } },
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
          options: { source: ['电话', '邮件', '微信'] },
        },
      ],
    },
    { type: 'TextArea', field: 'address', label: '联系地址', span: 24, attrs: { rows: 2 } },
    {
      type: 'TextArea',
      field: 'remark',
      label: '客户备注',
      span: 24,
      attrs: { rows: 3, maxlength: 300, showCount: true },
    },
  ],
})
const model = form.dataSource
</script>
