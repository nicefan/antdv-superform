<template><SuperForm @register="register" /></template>

<script setup>
import { h } from 'vue'
import { SuperForm, useForm } from 'superform-antdv'

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
</script>
