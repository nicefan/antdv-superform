<template><SuperForm @register="register" /></template>

<script setup>
import { SuperForm, useForm } from 'superform-antdv'

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
          subItems: [{ type: 'TextArea', field: 'description', label: '说明', span: 24 }],
        },
        {
          label: '备注',
          subItems: [{ type: 'TextArea', field: 'remark', label: '备注', span: 24 }],
        },
      ],
    },
  ],
})
</script>
