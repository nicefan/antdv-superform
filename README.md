# Antdv SuperForm

基于 Vue 3 和 Ant Design Vue 的配置式表单与表格组件库。用一份 Schema 统一表单、表格、查询和详情，让中后台开发更高效。

[在线文档](https://nicefan.github.io/antdv-superform/) · [快速开始](https://nicefan.github.io/antdv-superform/manual/quick-start) · [在线示例](https://nicefan.github.io/antdv-superform/examples)

## 为什么使用

- **一份配置，多处复用**：字段定义可以同时服务于表单、查询、表格、详情和编辑弹窗。
- **减少重复代码**：统一处理数据模型、校验、布局、联动、字典、分页和常用 CRUD。
- **兼顾简单与复杂场景**：支持函数、Ref、插槽、自定义渲染、数组编辑和业务组件扩展。
- **对 TypeScript 与 AI 友好**：提供完整类型、Schema 诊断工具和随版本发布的 AI 编码指引。

## 安装

当前支持 Vue `>= 3.3.13`、Ant Design Vue `>= 3.2.20`。项目已使用符合要求的版本时，只需安装本组件包：

```bash
pnpm add antdv-superform
```

组件包被引入时会自动加载自身样式，不需要再手动引入 `antdv-superform/lib/style.css`。如需字典、权限或全局默认配置，可在应用入口安装插件：

```ts
import { createApp } from "vue";
import SuperFormPlugin from "antdv-superform";
import App from "./App.vue";

createApp(App)
  .use(SuperFormPlugin, {
    // 开发环境自动检查 Schema，并在控制台输出问题与建议。
    schemaDiagnostics: import.meta.env.DEV,
    // 统一获取字典选项，一般使用缓存接口数据调取。
    // dictApi: (name) => dictionaryApi.getOptions(name),
    // 按钮权限判断，按钮加载时调取，一般在页面切换时将当前页面权限组更新到store中。
    // buttonRoles: () => permissionStore.roles,
    // 按钮统一设置，覆盖补充内置按钮配置及将项目中常用的按钮进行标准化配置。
    defaultButtons: {
      add: { label: "新增", icon: "plus" },
      delete: { confirmText: "确认删除选中的数据？" },
    },
    // 设置只读 Tag 的默认颜色，也可使用函数统一映射项目常用值、标签和颜色。
    tagViewer: ["blue", "green", "orange", "red"],
    // 适配项目的分页请求字段和接口响应结构。
    tableApiSetting: {
      currentField: "pageNum",
      sizeField: "pageSize",
      resultTransform: (result) => ({
        current: result.pageNum,
        size: result.pageSize,
        total: result.total,
        records: result.list,
      }),
    },
    // 统一设置底层组件的默认属性，页面 Schema 中的配置仍可覆盖它。
    defaultProps: {
      Input: { allowClear: true },
      Select: { allowClear: true },
      Table: { size: "small", bordered: true },
    },
    // 使用项目封装组件替换组件库的底层组件。
    components: {
      // Input: ProjectInput,
    },
  })
  .mount("#app");
```

内置按钮名称、继承规则和覆盖方式参见[按钮组 SuperButtons](https://nicefan.github.io/antdv-superform/manual/super-buttons#内置动作与全局默认)。

字典、权限、全局默认属性和底层组件替换等能力，参见[全局配置](https://nicefan.github.io/antdv-superform/manual/global-config)。

## 快速开始

```vue
<script setup lang="ts">
import { SuperForm, defineForm } from "antdv-superform";

const schema = defineForm({
  subSpan: 12,
  buttons: { actions: ["submit", "reset"] },
  subItems: [
    { type: "Input", field: "name", label: "名称", required: true },
    {
      type: "Select",
      field: "status",
      label: "状态",
      initialValue: 1,
      options: [
        { label: "停用", value: 0 },
        { label: "启用", value: 1 },
      ],
    },
  ],
  async onSubmit(data) {
    console.log("通过校验的数据", data);
  },
});
</script>

<template>
  <SuperForm :schema="schema" />
</template>
```

这段配置已经完成了普通开发中需要分别编写的工作：

- 根据字段建立 `{ name: '', status: 1 }` 数据模型，并完成字段与控件的双向绑定。
- 生成表单栅格、文本输入框和状态选择框，无需逐项编写组件模板。
- 根据 `label` 自动生成“请输入名称”和“请选择状态”等 placeholder。
- 将 `required: true` 转换为必填校验规则，并在提交前完成校验。
- 统一处理选项值与展示标签，自动回显状态对应的文本。
- 根据 `buttons` 生成提交和重置按钮，并将校验通过的数据交给 `onSubmit`。

完整的查询、分页和 CRUD 页面示例见 [SuperTable 快速开始](https://nicefan.github.io/antdv-superform/manual/quick-start)。

## 主要能力

- 页面组件：`SuperForm`、`SuperTable`、`SuperDetail`、`SuperModal`、`SuperButtons`
- 字段与容器：输入、选择、日期时间、上传、数组编辑、分组、卡片、标签页和折叠面板
- 工程能力：全局默认配置、字典与权限接入、自定义字段、Schema 诊断和 AI 编码指引

详细 API、字段配置和适用场景以[在线手册](https://nicefan.github.io/antdv-superform/manual/)为准。

## AI 编码指引

npm 包内包含 [`AI_GUIDE.md`](AI_GUIDE.md)。在使用本组件库的项目根目录执行：

```bash
npx antdv-superform init-ai
```

该命令会更新项目中已有的 AGENTS、Claude、Gemini、Copilot 或 Cursor 指令入口，引导 AI 读取当前安装版本的公开 API 和推荐用法。

## 本地开发

```bash
pnpm install
pnpm dev
pnpm test
```

## License

[MIT](LICENSE)
