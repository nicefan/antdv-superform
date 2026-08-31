<script setup lang="ts">
import { ref } from 'vue'
import { Modal } from 'antdv-next'
import { SuperTable, useTable } from 'antdv-superform'
import { contractApi, initialContracts } from './homeQuickStartMock'

const dataSource = ref(initialContracts)

const [register] = useTable({
  title: '合同管理',
  isScanHeight: false,
  dataSource,
  attrs: {
    rowSelection: {},
    size: 'small',
  },
  apis: contractApi,
  searchForm: {
    subItems: ['name', 'category'],
  },
  rowEditor: {
    editMode: 'modal',
    addMode: 'modal',
    form: { subSpan: 24 },
  },
  buttons: {
    actions: ['add', { label: '批量删除', name: 'delete' }],
  },
  rowButtons: {
    actions: [
      'detail',
      'edit',
      'delete',
      {
        label: '归档',
        disabledTooltip: '禁用状态不可操作',
        onClick: ({ record }) => {
          Modal.success({ title: record.name + '归档成功' })
        },
        disabled: ({ record }) => record.status === 0,
      },
    ],
    columnProps: { width: 190 },
  },
  columns: [
    { type: 'Hidden', field: 'id' },
    { type: 'Input', field: 'name', label: '合同名称', required: true },
    {
      type: 'Select',
      field: 'category',
      label: '合同类型',
      options: [
        { label: '软件许可', value: 'software' },
        { label: '专业服务', value: 'service' },
        { label: '采购合同', value: 'purchase' },
      ],
      required: true,
    },
    { type: 'DatePicker', field: 'signedAt', label: '签订日期', required: true },
    {
      type: 'InputNumber',
      field: 'amount',
      label: '合同金额',
      required: true,
      attrs: { min: 0, precision: 2, addonAfter: '元' },
      viewRender: ({ text, value }) => `¥${Number(text ?? value ?? 0).toLocaleString()}`,
    },
    {
      type: 'Switch',
      field: 'status',
      label: '状态',
      options: [
        { label: '普通', value: 0 },
        { label: '活动', value: 1 },
      ],
      editable: true,
      exclude: ['form'],
      columnProps: { width: 90 },
      onChange: ({ record }, value) => contractApi.setStatus(record.id, value),
    },
    {
      type: 'Textarea',
      field: 'description',
      label: '合同说明',
      exclude: ['table'],
      span: 24,
      attrs: { rows: 3, maxlength: 300, showCount: true },
    },
  ],
})
</script>

<template>
  <SuperTable @register="register" />
</template>
