# SuperTable

`SuperTable` 是这套组件库的核心入口。它不是纯展示表格，而是把搜索、分页、编辑、详情、按钮区和数据查询协议整合在一起。

## 核心能力

- 搜索表单 `searchForm`
- 顶部按钮 `buttons`
- 行按钮 `rowButtons`
- 查询与分页
- 行内编辑或弹窗编辑 `rowEditor`
- 详情查看
- Tabs 过滤
- 高度自适应滚动

## 典型用法

```vue
<template>
  <SuperTable @register="register" />
</template>

<script setup lang="ts">
import { SuperTable, useTable, defineTable } from 'antdv-superform'

const [register] = useTable(
  defineTable({
    attrs: { rowKey: 'id' },
    apis: {
      query: async () => ({
        current: 1,
        size: 10,
        total: 1,
        records: [{ id: '1', title: '示例', status: 1 }],
      }),
    },
    searchForm: {
      subItems: ['title'],
      buttons: ['search', 'reset'],
    },
    columns: [
      { type: 'Input', field: 'title', label: '标题' },
      { type: 'Switch', field: 'status', label: '状态' },
    ],
    rowButtons: ['edit', 'delete', 'detail'],
  })
)
</script>
```

## Props

- `schema`: 表格 schema，类型为 `RootTableOption`
- `dataSource`: 外部数据源，可直接传数组

## Events

- `register(actions)`: 暴露表格实例
- `load(data)`: 查询完成后触发
- `update:dataSource(data)`: 内部数据变化时回传

## 内置表格方法

表格内部默认会生成这些业务动作：

- `add`
- `edit`
- `delete`
- `detail`

这些方法既会暴露到 `useTable()` 返回的实例上，也可直接被按钮系统复用。

## 弹窗编辑模式

当你希望新增或编辑使用弹窗表单时，需要配置：

```ts
rowEditor: {
  addMode: 'modal',
  editMode: 'modal',
}
```

或至少让对应动作走 `modal` 模式。

## 编辑模式

表格编辑分为三种常见模式。

### 行编辑

行编辑通过 `rowEditor` 配置：

```ts
rowEditor: {
  editMode: 'inline',
  addMode: 'inline',
}
```

- `editMode` 控制编辑动作
- `addMode` 控制新增动作
- `addMode` 不配置时默认跟随 `editMode`

### 弹窗编辑

弹窗编辑同样通过 `rowEditor` 配置：

```ts
rowEditor: {
  editMode: 'modal',
  addMode: 'modal',
}
```

当 `apis.save` 和 `apis.update` 存在时：

- 新增保存会调用 `apis.save`
- 编辑保存会调用 `apis.update`
- 保存成功后会刷新表格

### 全表编辑

顶级 `editable` 开启后，表格整体进入可编辑状态：

```ts
defineTable({
  editable: true,
  columns: [
    { type: 'Input', field: 'name', label: '名称' },
    { type: 'Input', field: 'code', label: '编码', editable: false },
  ],
})
```

- 顶级 `editable: true` 时，字段默认可编辑
- 子字段配置 `editable: false` 可关闭该列编辑
- 顶级 `editable` 未开启时，也可以在单个字段上配置 `editable: true`
- 字段级编辑常用于开关切换等轻量操作

### 自动表单生成规则

在弹窗编辑模式下，表格会自动把 `columns` 转成弹窗表单的 `subItems`。

默认逻辑是：

```ts
rowEditor.form?.subItems ?? option.columns.filter(...)
```

也就是说：

- 如果你没有显式提供 `rowEditor.form.subItems`
- 会自动从 `columns` 派生出编辑表单字段
- 再叠加 `rowEditor.form` 里的表单容器配置，生成最终弹窗

这非常适合列表页直接复用列定义做新增/编辑表单。

## `rowEditor.form`

你可以通过 `rowEditor.form` 补充弹窗表单配置，例如：

```ts
rowEditor: {
  addMode: 'modal',
  editMode: 'modal',
  form: {
    attrs: {
      layout: 'vertical',
    },
    subSpan: 24,
  },
}
```

这里的 `form` 不一定要手写 `subItems`；如果不写，会回退到 `columns -> subItems` 的自动转换。

## 自定义按钮与内置动作联动

当需要在执行内置 `add` / `edit` / `delete` / `detail` 之前做额外处理时，可以把动作写成对象配置：

```ts
buttons: {
  actions: [
    {
      name: 'add',
      onClick: (effectData, action) => action(),
    },
  ],
}
```

这里：

- `effectData` 是当前表格上下文
- `action` 是对应的内置操作方法

行按钮也可以这样写：

```ts
rowButtons: {
  actions: [
    {
      name: 'edit',
      onClick: (effectData, action) => action(),
    },
  ],
}
```

## `effectData` 能拿到什么

在表格按钮场景里，常见上下文包括：

- `record`: 当前行数据
- `selectedRows`
- `selectedRowKeys`
- `tableRef`
- `meta`

如果是顶部按钮，通常更多依赖 `selectedRows` / `tableRef`。

## `action(resetData)` 的用法

对象式按钮的第二个参数 `action` 是内置动作的包装函数，可以继续传递参数，最常见的是 `resetData`：

```ts
{
  name: 'add',
  onClick: (effectData, action) =>
    action({
      resetData: {
        status: 1,
        deptId: effectData.queryParams?.deptId,
      },
    }),
}
```

`resetData` 的作用：

- `add` 时：作为新表单的默认值
- `edit` 时：在读取原始记录后再合并进去，用于预填充或修正字段

这适合：

- 默认带入某些字段
- 进入编辑前做数据修正
- 按当前筛选条件预填新增表单

## 什么时候需要对象式动作

建议在这些场景用对象式动作，而不是直接写字符串：

- 打开前先校验选中状态
- 打开前先弹出提示
- 需要给 `add` / `edit` 注入 `resetData`
- 需要埋点或记录日志

## 查询结果格式

支持两种返回结果：

```ts
// 1. 直接数组
[{ id: '1' }]

// 2. 分页对象
{
  current: 1,
  size: 10,
  total: 100,
  records: [{ id: '1' }]
}
```

更详细的协议见 [表格查询协议](/reference/table-query)。
