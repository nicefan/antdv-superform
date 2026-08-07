# 动态数据源

切换 Ref 指向的对象时，表单跟随当前对象，并按 schema 补齐缺失字段。

```vue playground
<template>
  <button class="switch-button" @click="switchRecord">切换记录</button>
  <SuperForm @register="register" />
  <pre>{{ record }}</pre>
</template>

<script setup>
import { ref } from 'vue'
import { SuperForm, useForm } from 'antdv-superform'

const records = [
  { id: 1, name: '张三', enabled: true },
  { id: 2, name: '李四' },
]
const current = ref(0)
const record = ref(records[0])

const [register] = useForm({
  dataSource: record,
  subItems: [
    { type: 'Hidden', field: 'id' },
    { type: 'Input', field: 'name', label: '姓名' },
    { type: 'Switch', field: 'enabled', label: '启用' },
  ],
})

function switchRecord() {
  current.value = (current.value + 1) % records.length
  record.value = records[current.value]
}
</script>

<style>
.switch-button { margin-bottom: 16px; padding: 6px 14px; }
</style>
```
