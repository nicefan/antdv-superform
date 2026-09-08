<template>
  <SuperButtons button-type="default" :limit="3" :actions="actions" />
</template>

<script setup>
import { SuperButtons } from 'superform-antdv'

const actions = [
  { name: 'save', label: '保存', attrs: { type: 'primary' }, onClick: () => alert('已保存') },
  { name: 'preview', label: '预览', onClick: () => alert('预览') },
  { name: 'archive', label: '归档', confirmText: '确定归档吗？', onClick: () => alert('已归档') },
  { name: 'disabled', label: '不可用', disabled: true, disabledTooltip: '当前状态不可用' },
]
</script>
