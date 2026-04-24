# 快速开始

这一节用最小示例带你跑通一个表单页面。

## 第一步：定义 schema

```ts
import { defineForm } from 'antdv-superform'

export const userFormSchema = defineForm({
  attrs: {
    layout: 'vertical',
  },
  buttons: ['submit', 'reset'],
  subItems: [
    {
      type: 'Input',
      field: 'name',
      label: '姓名',
      rules: { required: true },
    },
    {
      type: 'Select',
      field: 'status',
      label: '状态',
      options: [
        { label: '启用', value: 1 },
        { label: '停用', value: 0 },
      ],
    },
    {
      type: 'DateRange',
      field: 'startDate',
      keepField: 'endDate',
      label: '有效期',
    },
  ],
})
```

## 第二步：在页面中注册表单

```vue
<template>
  <SuperForm @register="register" @submit="handleSubmit" />
</template>

<script setup lang="ts">
import { SuperForm, useForm } from 'antdv-superform'
import { userFormSchema } from './schema'

const [register, form] = useForm(userFormSchema)

function handleSubmit(data: Record<string, unknown>) {
  console.log('submit:', data)
}
</script>
```

## 第三步：通过实例方法控制表单

```ts
form.setFieldsValue({
  name: '张三',
  status: 1,
})

await form.submit()
```

## 你已经获得了什么

这个最小示例已经具备：

- 表单渲染
- 字段绑定
- 校验能力
- 提交事件
- 重置按钮

## 接下来建议看什么

- 想理解 schema 是怎么组织的：看 [基础概念](/guide/concepts)
- 想判断是否适合你的页面：看 [常见场景](/guide/scenarios)
