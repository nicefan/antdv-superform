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
默认值、必填与校验、显隐、禁用、联动、事件和展示规则都围绕字段集中定义，并提供整体回显、局部赋值和模型重置。


## 环境要求

- Vue `>= 3.3.13`
- Ant Design Vue `>= 3.2.20`

## 安装

```bash
pnpm add antdv-superform ant-design-vue
```

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

表单模型由 schema 建立。指定 `dataSource` 时，组件会为自动初始化数据结构，并与该对象保持绑定。


### 表格

查询表单、编辑表单、详情描述复用columns配置, 实现一次配置完成增删改查。

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

生成的指引要求 AI 在使用组件库前读取：`node_modules/antdv-superform/AI_GUIDE.md`

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
