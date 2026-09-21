<template>
  <div class="demo-note">修改数量或单价，行金额与订单合计会写回模型。</div>
  <SuperForm @register="register" />
  <pre class="demo-model">{{ model }}</pre>
</template>

<script setup>
import { SuperForm, useForm } from 'superform-antdv'
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
      options: { source: customerOptions },
    },
    {
      type: 'Select',
      field: 'currency',
      label: '币种',
      initialValue: 'CNY',
      options: { source: ['CNY', 'USD', 'EUR'] },
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
    { type: 'TextArea', field: 'deliveryAddress', label: '交付地址', span: 24, required: true },
  ],
})
const model = form.dataSource
</script>
