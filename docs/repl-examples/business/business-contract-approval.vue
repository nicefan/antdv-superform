<template>
  <div class="demo-note">选择“退回修改”或“拒绝”，审批原因会自动显示并变为必填。</div>
  <SuperForm @register="register" @submit="submitted = $event" />
  <pre class="demo-model">{{ submitted || model }}</pre>
</template>

<script setup>
import { h, ref } from 'vue'
import { SuperForm, useForm } from 'superform-antdv'

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
          type: 'RadioGroup',
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
          type: 'TextArea',
          field: 'approvalReason',
          label: '退回/拒绝原因',
          span: 24,
          hidden: (data) => !needsReason(data),
          required: needsReason,
          attrs: { rows: 3, maxlength: 300, showCount: true },
        },
        {
          type: 'TextArea',
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
</script>
