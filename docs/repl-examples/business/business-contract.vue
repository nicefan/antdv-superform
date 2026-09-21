<template>
  <div class="demo-note">综合表单：包含多层分组、关联字段、双日期字段、明细表与附件。</div>
  <SuperForm @register="register" @submit="submitted = $event" />
  <pre class="demo-model">{{ submitted || model }}</pre>
</template>

<script setup>
import { ref } from 'vue'
import { SuperForm, useForm } from 'superform-antdv'
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
          options: { source: { sales: '销售合同', purchase: '采购合同', service: '服务合同' } },
        },
        {
          type: 'DateRangePicker',
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
          options: { source: ['CNY', 'USD', 'EUR'] },
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
          options: { source: customerOptions },
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
      type: 'TextArea',
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
</script>
