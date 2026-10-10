<template>
  <SuperForm @register="register" />
</template>

<script setup>
import { SuperForm, useForm } from 'superform-antdv'

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
      detailOption: {
        title: '商品资料',
        mode: 'table',
        attrs: { column: 1 },
        subItems: [
          { type: 'Text', field: 'product', label: '商品' },
          { type: 'InputNumber', field: 'quantity', label: '数量' },
          {
            type: 'Text',
            label: '小计',
            viewRender: ({ current }) => `${current.quantity * current.price} 元`,
          },
        ],
        modalProps: { width: 600 },
      },
      rowButtons: { actions: ['detail'] },
      columns: [
        { type: 'Hidden', field: 'id' },
        { type: 'Input', field: 'product', label: '商品', required: true },
        { type: 'InputNumber', field: 'quantity', label: '数量', required: true },
        { type: 'InputNumber', field: 'price', label: '单价', required: true },
      ],
    },
  ],
})
</script>
