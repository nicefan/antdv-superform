# 选项与联动

```vue playground
<template><SuperForm @register="register" /></template>

<script setup>
import { SuperForm, useForm } from 'antdv-superform'

const [register] = useForm({
  subItems: [
    { type: 'Select', field: 'city', label: '城市', options: ['北京', '上海', '深圳'] },
    {
      type: 'Select',
      field: 'level',
      label: '等级',
      options: [
        { name: '高级', code: 'senior' },
        { name: '初级', code: 'junior' },
      ],
      fieldNames: { label: 'name', value: 'code' },
    },
  ],
})
</script>
```

远程搜索在 `showSearch` 开启、options 为函数且未显式配置 `onSearch` 时，以约 600ms 节流调用 `options(effectData, keyword)`。
