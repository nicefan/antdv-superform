# Antdv SuperForm

基于 Vue 3 和 Ant Design Vue 的配置式表单与表格组件库。使用统一的 schema 描述字段、校验、查询、编辑和详情展示，适合中后台系统中结构重复、联动较多的业务页面。

> 用一份清晰的配置统一数据、界面和交互，让复杂的业务页面写得更少、读得更懂、改得更稳。

## 核心优势

传统中后台开发中，一个业务字段往往需要在表单模板、数据模型、校验规则、查询条件、表格列和详情展示之间重复定义。Antdv SuperForm 将这些信息收拢到同一份 schema，让页面代码从“拼装组件”转向“描述业务”。

**一致的开发与使用体验**

使用统一 schema 生成表单、查询、表格、详情和弹窗，字段配置可在编辑与只读场景复用。同类页面天然保持一致，减少不同开发者、不同页面之间的实现偏差，也更容易沉淀团队规范。

**大幅减少重复编码**

自动处理组件渲染、数据模型、v-model、校验、栅格布局、值转换、字典选项，以及表格分页和常用 CRUD。省去大量模板、状态和胶水代码，把开发重点放回业务字段与交互本身。

**业务逻辑集中清晰**

默认值、必填与校验、显隐、禁用、联动、事件和展示规则都围绕字段集中定义，并提供整体回显、局部赋值和模型重置。阅读 schema 即可理解页面的主要数据结构和业务逻辑，修改字段时不必在多个文件和代码层之间来回查找。

**配置灵活且易于扩展**

简单场景直接声明，复杂场景可使用函数、Ref、插槽、自定义渲染、数组编辑组件和弹窗编辑；还可注册业务组件、替换底层组件并设置全局默认值。保留配置式开发效率的同时，不被固定模板限制，可以逐步适配复杂业务和项目级设计规范。

一项字段配置即可同时表达它的数据与界面意图：

```ts
{
  type: 'Select',
  field: 'status',
  label: '状态',
  required: true,
  options: statusOptions,
}
```

它可以被表单用于编辑，被表格用于展示，被详情用于回显，也可以直接复用到查询和弹窗中。字段变化时，相关规则集中修改，避免多处实现逐渐不一致。

组件库同时提供完整的 TypeScript 类型、[`AI_GUIDE.md`](AI_GUIDE.md)、AI 项目指令初始化和 schema 诊断能力，让开发者与 AI 都能基于同一套公开规则生成和检查配置。

## 环境要求

- Vue `>= 3.3.13`
- Ant Design Vue `>= 3.2.20`

Vue 和 Ant Design Vue 是 peer dependencies，需要由消费项目安装。

## 安装

```bash
pnpm add antdv-superform ant-design-vue
```

也可以使用 npm：

```bash
npm install antdv-superform ant-design-vue
```

## 应用级配置

插件安装用于配置字典、权限、默认属性和底层组件替换，不会代替组件导入。

```ts
import { createApp } from 'vue'
import AntdvSuperForm, { antdvAdapter } from 'antdv-superform'
import App from './App.vue'

const app = createApp(App)

app.use(AntdvSuperForm, {
  adapter: antdvAdapter,
  schemaDiagnostics: import.meta.env.DEV,
  dictApi: (name) => api.getDictionary(name),
  buttonRoles: () => permissionStore.roles,
  tableApiSetting: {
    currentField: 'current',
    sizeField: 'size',
    resultTransform: (result) => result.data,
  },
})

app.mount('#app')
```

`dictApi(name)` 应返回 `Promise<{ label, value }[]>`。未使用这些全局能力时，可以省略插件安装，直接导入组件和组合函数。

## 快速开始

### 表单

```vue
<template>
  <SuperForm @register="register" />
</template>

<script setup lang="ts">
import { SuperForm, useForm } from 'antdv-superform'

const [register, form] = useForm({
  subSpan: 12,
  buttons: { actions: ['submit', 'reset'] },
  subItems: [
    { type: 'Hidden', field: 'id' },
    {
      type: 'Input',
      field: 'name',
      label: '名称',
      required: true,
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
  ],
  async onSubmit(data) {
    await api.save(data)
  },
})

async function validateAndGetData() {
  const data = await form.submit()
  console.log(data)
}
</script>
```

也可以直接传入 schema：

```vue
<SuperForm :schema="schema" :data-source="record" />
```

表单模型由 schema 建立。指定 `dataSource` 时，组件会为传入对象补齐 schema 中缺失的字段，并与该对象保持绑定。一般回显一条完整记录使用 `resetFields(record)`，局部赋值使用 `setFieldsValue(partial)`。

常用动作：

```ts
await form.submit()
form.resetFields(record?)
form.setFieldsValue(partial)
form.getData()
await form.getForm()
```

### 表格

```vue
<template>
  <SuperTable @register="register" />
</template>

<script setup lang="ts">
import { SuperTable, useTable } from 'antdv-superform'

const [register, table] = useTable({
  immediate: true,
  pagination: { pageSize: 20 },
  attrs: {
    rowKey: 'id',
    rowSelection: {},
  },
  apis: {
    query: (params, { signal }) => api.queryUsers(params, { signal }),
    info: (id) => api.getUser(id),
    save: (data) => api.addUser(data),
    update: (data) => api.updateUser(data),
    delete: (keys) => api.deleteUsers(keys),
  },
  searchForm: {
    subSpan: 'auto',
    subItems: ['name', 'status'],
  },
  columns: [
    { type: 'Input', field: 'name', label: '姓名', required: true },
    {
      type: 'Select',
      field: 'status',
      label: '状态',
      options: [
        { label: '启用', value: 1 },
        { label: '停用', value: 0 },
      ],
    },
  ],
  rowEditor: {
    editMode: 'modal',
    addMode: 'modal',
    form: { subSpan: 12 },
  },
  buttons: { actions: ['add', 'delete'] },
  rowButtons: { actions: ['detail', 'edit', 'delete'] },
})
</script>
```

查询响应可以直接返回数组，或者返回：

```ts
{
  current: number
  size: number
  total: number
  records: any[]
}
```

其他响应结构应通过表格的 `afterQuery` 或全局 `tableApiSetting.resultTransform` 转换。

常用动作：

```ts
await table.query(params) // 回到第一页并查询
await table.reload()      // 保留当前页和条件刷新
table.goPage(page)
table.resetSearchForm(data?)
table.getQueryParams()
table.setData(rows)
table.getData()
table.add({ resetData })
table.edit({ record })
table.delete()
table.detail({ record })
```

连续查询遵循“最后一次生效”。`apis.query` 的第二个参数包含 `{ signal }`，业务请求支持取消时应继续传递该信号。

## Schema 基础

字段通常包含：

```ts
{
  type: 'Input',
  field: 'name',
  label: '名称',
  initialValue: '',
  required: true,
  attrs: { placeholder: '请输入名称' },
}
```

- `type`：内置或已注册的字段类型。
- `field`：模型字段，支持点路径。
- `label`：表单标签或表格标题。
- `initialValue`：标准初始值。
- `required`：简单必填校验。
- `rules`：其他校验，可使用单个对象或规则数组。
- `attrs`：传给底层 Ant Design Vue 组件的属性。
- `hidden`、`disabled`、`dynamicAttrs`、`computed`：支持根据当前上下文动态计算。

当前常用字段类型：

```text
Input, TextArea, InputNumber, AutoComplete, Select, TreeSelect,
DatePicker, DateRangePicker, TimePicker, TimeRangePicker, Switch, RadioGroup, CheckboxGroup,
Upload, TagInput, TagSelect, Text, HTML, Hidden, InputSlot, InfoSlot
```

当前常用容器类型：

```text
Form, Group, Fragment, Card, List, ListGroup, Tabs, Collapse,
Descriptions, Table, InputGroup, InputList
```

完整配置规则参见 [`AI_GUIDE.md`](AI_GUIDE.md)。

## 选项和值

Select、RadioGroup、CheckboxGroup、Switch 等选项型字段支持对象数组、原始值数组、对象字典、Ref、函数和 `dictName`。

推荐使用对象数组：

```ts
options: [
  { label: '管理员', value: 'admin' },
  { label: '普通用户', value: 'user' },
]
```

常用配置：

- `labelField`：把选中项 label 同步保存到另一个模型字段。
- `labelAsValue`：使用 label 作为模型值。
- `valueToNumber`：将选项 value 转为数字。
- `stringifyValue`：把多值结果转换为逗号分隔字符串。
- `tagViewer`：控制只读模式的 Tag 展示。

`DateRangePicker` 和 `TimeRangePicker` 可以通过 `endField` 把开始值和结束值分别保存到两个字段。

## 数组对象编辑

表单字段需要编辑对象数组时，可以按复杂程度选择：

- `InputList`：字段较少，一项可以在一行内完成。
- `List`、`ListGroup`：一项需要多行展示。
- `Table`：字段较多、列结构明确，或需要复杂的行级操作。

## 扩展组件

通过插件对象注册业务字段。注册名称不包含 `Ext`，schema 类型需要使用 `Ext` 前缀：

```ts
import AntdvSuperForm from 'antdv-superform'
import UserPicker from './UserPicker.vue'

AntdvSuperForm.registerComponent('UserPicker', UserPicker)
```

```ts
{
  type: 'ExtUserPicker',
  field: 'userId',
  label: '用户',
}
```

还可以通过安装配置的 `components` 替换底层 Ant Design Vue 组件，通过 `setDefaultProps()` 设置组件默认属性。

## TypeScript 辅助函数

```ts
import { defineForm, defineTable, defineDetail } from 'antdv-superform'

const form = defineForm({ /* ... */ })
const table = defineTable({ /* ... */ })
const detail = defineDetail({ /* ... */ })
```

这些函数不改变运行时数据，只用于获得更准确的 schema 类型检查和编辑器提示。

## AI 编码指引

npm 包会发布 [`AI_GUIDE.md`](AI_GUIDE.md)。安装依赖后，在消费项目根目录执行：

```bash
npx antdv-superform init-ai
```

该命令不要求选择 AI 工具，而是检测项目中已经存在的 `AGENTS.md`、`CLAUDE.md`、`GEMINI.md`、`.github/copilot-instructions.md`、`.cursorrules` 等入口，并向所有已发现的文件添加或更新带标记的指引。若项目已经存在 `.cursor/rules/`，则创建或更新专属的 `antdv-superform.mdc`。现有内容不会被覆盖。

生成的指引要求 AI 在使用组件库前读取：

```text
node_modules/antdv-superform/AI_GUIDE.md
```

重复执行命令不会重复追加内容。若没有检测到任何 AI 入口，命令不会创建文件，而是在终端输出一段可复制的提示词，供用户添加到实际使用工具的项目指令中。升级组件库后无需复制指南，新会话会直接读取当前安装版本附带的文件。

`AI_GUIDE.md` 记录当前公开 API、推荐用法、边界条件和已废弃名称；项目自身的业务约束仍应保留在原有 AI 入口中。

生成可序列化的 schema 后，AI 或开发者可以直接运行：

```bash
npx antdv-superform diagnose-schema schema.json --type table
npx antdv-superform diagnose-schema schema.json --type form --json
```

动态函数、Ref 等无法写入 JSON 的 schema，可以在项目代码或测试中调用公共 API：

```ts
import { diagnoseSchema } from 'antdv-superform'

const diagnostics = diagnoseSchema(schema, 'table')
```

安装时设置 `schemaDiagnostics: import.meta.env.DEV`，还会在组件接收最终 schema 时把诊断结果输出到开发控制台。诊断结果分为 `error`、`warning` 和 `suggestion`；CLI 发现 error 时返回非零退出码。

## 本地开发

```bash
pnpm install
pnpm dev
pnpm test
pnpm run build
```

- `pnpm dev`：启动示例开发服务器。
- `pnpm test`：运行 Vitest 单元测试。
- `pnpm run build`：执行类型检查并生成 `lib/`。
- `pnpm serve`：预览构建结果。

## 文档

- [在线文档](https://nicefan.github.io/antdv-superform/)
- [AI 使用指引](AI_GUIDE.md)

## License

[MIT](LICENSE)
