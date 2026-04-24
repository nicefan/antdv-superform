# antdv-superform

一个基于 `Vue 3` 与 `Ant Design Vue 3` 的声明式业务组件库，用一份 schema 同时驱动表单、详情、表格、按钮区和弹窗场景，适合后台 CRUD、配置页和低样板代码的中后台页面。

## 特性

- 基于 schema 描述页面结构，减少模板层重复代码
- 同一份配置可复用到 `SuperForm`、`SuperDetail`、`SuperTable`
- 内置常见业务容器：`Group`、`Card`、`Tabs`、`Collapse`、`List`、`Table`
- 内置常见字段组件：`Input`、`Select`、`DateRange`、`Upload`、`TreeSelect`、`TagInput` 等
- 支持动态显隐、禁用、联动计算、校验规则、字典选项、查看态渲染
- 支持表格搜索、分页、行内/弹窗编辑、行按钮、详情弹窗
- 支持全局默认按钮、全局默认属性、字典接口、自定义图标和自定义扩展组件

## 适用场景

- 后台新增 / 编辑 / 查看页
- 带搜索区的列表页
- 一体化的查询 + 表格 + 编辑弹窗页面
- 希望通过配置驱动 UI，而不是手写大量 `a-form-item` / `a-table-column` 的项目

## 安装

```bash
pnpm add antdv-superform ant-design-vue vue
```

当前包的 `peerDependencies`：

- `vue >= 3.3.13`
- `ant-design-vue >= 3.2.20`

## 快速开始

### 1. 注册插件

```ts
import { createApp } from 'vue'
import Antd from 'ant-design-vue'
import superform from 'antdv-superform'
import 'ant-design-vue/dist/reset.css'
import 'antdv-superform/lib/style.css'

import App from './App.vue'

createApp(App).use(Antd).use(superform).mount('#app')
```

### 2. 定义一个表单

```vue
<template>
  <SuperForm @register="register" @submit="handleSubmit" />
</template>

<script setup lang="ts">
import { defineForm, SuperForm, useForm } from 'antdv-superform'

const schema = defineForm({
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
  onSubmit(data) {
    console.log(data)
    return Promise.resolve()
  },
})

const [register, form] = useForm(schema)

function handleSubmit(data: Record<string, unknown>) {
  console.log('submit event:', data)
}

// 例如：
// form.setFieldsValue({ name: '张三' })
// form.submit()
</script>
```

## 核心模块

### `SuperForm`

用于渲染配置化表单，支持：

- 表单校验
- 字段联动
- 查看态渲染
- 嵌套容器
- 列表字段
- 上传组件
- 自定义插槽
- 按钮区配置

常见字段类型：

- `Input`
- `Textarea`
- `InputNumber`
- `AutoComplete`
- `Select`
- `TagSelect`
- `TagInput`
- `Radio`
- `Checkbox`
- `Switch`
- `DatePicker`
- `TimePicker`
- `DateRange`
- `TreeSelect`
- `Upload`
- `Hidden`
- `InfoSlot`
- `InputSlot`
- `Buttons`

常见容器类型：

- `Form`
- `Group`
- `Card`
- `Descriptions`
- `Tabs`
- `Collapse`
- `List`
- `ListGroup`
- `InputGroup`
- `InputList`
- `Table`

### `SuperTable`

用于渲染带搜索和编辑能力的业务表格。

能力包括：

- 搜索表单 `searchForm`
- 数据查询 `apis.query`
- 分页与参数管理
- 行选择
- 行按钮与顶部按钮
- 行内编辑或弹窗编辑 `rowEditor`
- 内置详情查看
- Tabs 筛选
- 动态列配置

最小示例：

```ts
import { defineTable, useTable } from 'antdv-superform'

const [register, table] = useTable(
  defineTable({
    attrs: {
      rowKey: 'id',
    },
    apis: {
      query: async () => {
        return {
          current: 1,
          size: 10,
          total: 1,
          records: [{ id: '1', title: '示例数据', status: 1 }],
        }
      },
    },
    searchForm: {
      subItems: ['title', { type: 'Select', field: 'status', label: '状态', options: ['启用', '停用'] }],
      buttons: ['search', 'reset'],
    },
    columns: [
      { type: 'Input', field: 'title', label: '标题', rules: { required: true } },
      { type: 'Switch', field: 'status', label: '状态' },
    ],
    rowButtons: ['edit', 'delete', 'detail'],
  })
)

table.reload()
```

`useTable` 常用实例方法：

- `reload()`
- `query(params?)`
- `resetSearchForm(params?)`
- `setData(data)`
- `getData()`
- `goPage(page)`
- `setColumns(columns)`
- `add()`
- `edit()`
- `delete()`
- `detail()`
- `validate()`

### `SuperDetail`

用于把表单 schema 复用为详情展示视图，适合“编辑/查看共用一份配置”的场景。

```ts
import { useDetail } from 'antdv-superform'

const [register, detail] = useDetail(schema)

detail.setData({
  name: '张三',
  status: 1,
})
```

### `SuperButtons`

用于独立渲染按钮组，也可以作为表单、详情、表格内部按钮配置复用。

```ts
import { useButtons } from 'antdv-superform'

const [Buttons] = useButtons({
  actions: [
    { label: '新增', name: 'add' },
    { label: '刷新', onClick: () => console.log('reload') },
  ],
})
```

### `useModal` / `useModalForm`

用于快速创建业务弹窗，支持把表单直接挂进弹窗中。

```ts
import { useModal, useModalForm } from 'antdv-superform'

const { openModal } = useModal(() => '这里是弹窗内容', {
  title: '提示',
})

const modalForm = useModalForm(schema, {
  title: '编辑数据',
})
```

## Schema 设计说明

每个配置项由 `type` 驱动，常见字段如下：

- `type`: 组件类型
- `field`: 字段名，支持嵌套路径
- `label`: 标签文本或渲染函数
- `initialValue`: 初始值
- `rules`: 校验规则
- `attrs`: 透传给实际组件的属性
- `hidden`: 是否隐藏，支持函数
- `disabled`: 是否禁用，支持函数
- `computed`: 基于上下文自动计算字段值
- `onUpdate`: 字段值变化后的回调
- `exclude`: 排除在 `form` / `table` / `description` 中显示
- `viewRender`: 查看态自定义渲染
- `slots`: 透传内部插槽

联动函数可拿到的上下文通常包含：

- `formData`: 整个表单数据
- `current`: 当前字段所在对象
- `value`: 当前值
- `field`: 当前字段名
- `index`: 列表项索引
- `parent`: 父级上下文
- `isView`: 是否处于查看态

## 全局配置

插件安装时支持传入全局配置：

```ts
app.use(superform, {
  locale,
  dictApi: async (name) => [],
  customIcon: (name) => h('span', name),
  buttonRoles: () => ['add', 'edit'],
  defaultButtons: {
    add: {
      label: '新增',
      attrs: { type: 'primary' },
    },
  },
  defaultProps: {
    FormItem: {
      validateFirst: true,
    },
    Table: {
      size: 'small',
    },
  },
})
```

支持的全局能力包括：

- `dictApi`: 统一字典请求
- `customIcon`: 自定义图标解析
- `buttonRoles`: 动态按钮权限
- `defaultButtons`: 内置按钮模板
- `defaultProps`: 全局默认组件属性
- `tagViewer`: 标签态颜色映射
- `components`: 覆盖基础 Ant Design Vue 组件

## 自定义扩展组件

可以通过插件实例注册自定义组件，注册后在 schema 中通过 `Ext组件名` 使用。

```ts
import superform from 'antdv-superform'
import MyAmount from './MyAmount.vue'

superform.registComponent('Amount', MyAmount)
```

随后即可这样声明：

```ts
{
  type: 'ExtAmount',
  field: 'amount',
  label: '金额',
}
```

## Upload 组件补充

`Upload` 在 Ant Design Vue 的基础上额外扩展了业务常用能力：

- `attrs.apis.upload`
- `attrs.apis.delete`
- `attrs.apis.download`
- `attrs.infoNames`
- `attrs.valueKey`
- `attrs.minSize`
- `attrs.maxSize`
- `attrs.isSingle`
- `attrs.hideOnMax`
- `attrs.uploadMode`
- `attrs.tip`
- `attrs.repeatable`
- `attrs.isView`

其中 `uploadMode` 支持：

- `auto`: 选中文件后立即上传
- `submit`: 表单提交时上传
- `custom`: 自行处理文件上传
- `base64`: 转成 base64 保存
- `text`: 作为文本读取

更详细的上传扩展说明可参考 [doc/upload.md](./doc/upload.md)。

## 开发

```bash
pnpm install
pnpm dev
```

常用脚本：

- `pnpm dev`: 启动本地示例
- `pnpm build`: 类型检查并构建
- `pnpm build:dist`: 打包发布产物
- `pnpm rollup`: Rollup 构建
- `pnpm dts`: 生成声明文件
- `pnpm serve`: 预览构建结果

示例代码位于 `example/` 目录，包含：

- 表单示例
- 详情展示示例
- 表格示例
- 弹窗与按钮示例

## 导出内容

库当前主入口导出了以下模块：

- 默认导出：插件对象
- `SuperForm`
- `SuperTable`
- `SuperDetail`
- `SuperButtons`
- `useForm`
- `useTable`
- `useDetail`
- `useModal`
- `defineForm`
- `defineTable`
- `defineDetail`
- 全量类型导出 `exaTypes`

## License

MIT
