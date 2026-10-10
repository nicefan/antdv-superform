<template>
  <div class="detail-actions">
    <button @click="replaceRecord">替换数据源</button>
    <button @click="detail.setData({ ...record, name: '通过 setData 切换的记录' })">
      切换当前详情
    </button>
  </div>
  <SuperDetail @register="register" />
</template>

<script setup>
import { ref } from 'vue'
import { SuperDetail, useDetail } from 'superform-antdv'

const record = ref({
  name: 'Antdv SuperForm',
  status: 1,
  startDate: '2026-01-01',
  endDate: '2026-12-31',
  description: '同一份字段 Schema 可以服务于输入和只读展示。',
})
const [register, detail] = useDetail({
  title: '项目信息',
  dataSource: record,
  useSectionStyle: true,
  mode: 'table',
  attrs: { bordered: true },
  subSpan: 12,
  subItems: [
    { field: 'name', label: '名称' },
    { field: 'status', label: '状态', options: { source: { 0: '停用', 1: '启用' } } },
    { type: 'DateRangePicker', field: 'startDate', endField: 'endDate', label: '有效期' },
    { type: 'TextArea', field: 'description', label: '说明', span: 24 },
  ],
})

function replaceRecord() {
  record.value = { ...record.value, status: record.value.status === 1 ? 0 : 1 }
}
</script>

<style scoped>
.detail-actions {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
}
</style>
