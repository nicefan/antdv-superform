# SuperDetail

`SuperDetail` 用于把表单/描述 schema 渲染成查看态页面。它的价值不在于独立造一套详情配置，而在于尽量复用表单结构。

## 典型用法

```vue
<template>
  <SuperDetail @register="register" />
</template>

<script setup lang="ts">
import { SuperDetail, useDetail } from 'antdv-superform'

const [register, detail] = useDetail(schema)

detail.setData({
  name: '张三',
  status: 1,
})
</script>
```

## Props

- `schema`: 详情 schema
- `dataSource`: 详情数据

## Events

- `register(actions)`: 暴露详情实例

## 适合的用法

- 编辑页和详情页字段高度重合
- 弹窗预览
- 列表详情查看

## 查看态渲染

你可以通过这些能力控制查看态：

- `viewRender`
- `labelField`
- `tagViewer`
- `exclude: ['description']`
- `descriptionsProps`
