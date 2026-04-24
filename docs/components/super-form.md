# SuperForm

`SuperForm` 用于渲染配置化表单。它本身负责把 schema 转成真实表单结构，实例控制通常配合 `useForm` 一起使用。

## 典型用法

```vue
<template>
  <SuperForm @register="register" @submit="handleSubmit" />
</template>

<script setup lang="ts">
import { SuperForm, useForm, defineForm } from 'antdv-superform'

const schema = defineForm({
  attrs: { layout: 'vertical' },
  buttons: ['submit', 'reset'],
  subItems: [
    { type: 'Input', field: 'name', label: '姓名', rules: { required: true } },
    { type: 'Select', field: 'status', label: '状态', options: ['启用', '停用'] },
  ],
})

const [register] = useForm(schema)

function handleSubmit(data: Record<string, unknown>) {
  console.log(data)
}
</script>
```

## Props

- `schema`: 表单 schema，类型来自 `ExtFormOption`
- `dataSource`: 外部传入的数据对象

## Events

- `register(actions, ref?)`: 暴露内部实例
- `submit(data)`: 表单提交完成后触发

## 能力边界

- 支持字段联动：`hidden`、`disabled`、`computed`
- 支持容器嵌套：`Group`、`Card`、`Tabs`、`Collapse`
- 支持列表字段：`List`、`ListGroup`、`InputList`
- 支持查看态复用：通过 `SuperDetail` 复用同一份 schema
- 支持按钮区：`buttons` 或独立的 `Buttons` 节点

## 使用建议

- 业务表单优先通过 `defineForm` 收敛类型
- 把复杂联动尽量集中在 schema 内，不要同时在页面模板里重复写条件
- 页面层推荐通过 `useForm` 管理赋值、提交和重置
