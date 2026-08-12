# 安装

## 安装依赖

当前支持 Vue `>= 3.3.13`、Ant Design Vue `>= 3.2.20`。业务项目已经使用符合要求的版本时，只需安装组件包：

```bash
pnpm add antdv-superform
```

Vue 与 Ant Design Vue 是 peer dependency。如果项目尚未安装它们，再一并添加：

```bash
pnpm add vue ant-design-vue antdv-superform
```

也可以使用 npm 或 yarn。

## 应用级安装

```ts
import { createApp } from "vue";
import Antdv from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
import SuperFormPlugin from "antdv-superform";
import App from "./App.vue";

createApp(App).use(Antdv).use(SuperFormPlugin).mount("#app");
```

导入 `antdv-superform` 时会自动加载组件包自身样式，不要再手动引入 `antdv-superform/lib/style.css`。Ant Design Vue 的安装与主题样式仍按业务项目现有方式统一配置。

插件安装负责：

- 注册页面组件和内置字段。
- 接入字典、权限和图标。
- 设置全局默认属性和按钮。
- 替换底层组件、注册业务字段。
- 可选开启开发期 Schema 诊断。

最小安装不需要传配置。企业项目建议集中在一个安装文件中：

```ts
app.use(SuperFormPlugin, {
  schemaDiagnostics: import.meta.env.DEV,
  dictApi: (name) => dictionaryService.getOptions(name),
  buttonRoles: () => permissionStore.roles,
  defaultProps: {
    Form: { layout: "horizontal" },
    Table: { size: "small", bordered: true },
  },
});
```

各项配置见[全局配置](/manual/global-config)和[字典与权限](/manual/dictionaries-and-permissions)。

## 公共导入约定

运行时 API 与类型都从包根入口导入：

```ts
import {
  SuperForm,
  SuperTable,
  SuperDetail,
  useForm,
  useTable,
  defineForm,
} from "antdv-superform";

import type {
  ExtFormOption,
  RootTableOption,
  UniOption,
} from "antdv-superform";
```

不要从 `antdv-superform/lib/...`、`src/...` 或其他内部路径导入。内部目录和构建结构不属于兼容性承诺。

## TypeScript 配置

`defineForm`、`defineTable` 和 `defineDetail` 用于收窄 Schema 类型，运行时原样返回参数：

```ts
import { defineForm } from "antdv-superform";

export const userForm = defineForm({
  subItems: [{ type: "Input", field: "name", label: "姓名" }],
});
```

也可以显式标注公开类型：

```ts
import type { ExtFormOption } from "antdv-superform";

const schema: ExtFormOption = {
  subItems: [],
};
```

前者通常拥有更好的字面量推导，后者适合函数参数或跨模块约束。

## AI 工具初始化

在消费项目根目录执行：

```bash
npx antdv-superform init-ai
```

命令只更新已存在的 AGENTS.md、CLAUDE.md、GEMINI.md、Copilot 或 Cursor 指令入口；不会覆盖既有约束。详细行为见 [AI 编码指引](/manual/ai-guide)。

## 安装后检查

```vue
<template>
  <SuperForm :schema="{ subItems: [] }" />
</template>

<script setup lang="ts">
import { SuperForm } from "antdv-superform";
</script>
```

若组件无法渲染，依次检查：Vue 是否重复安装、Ant Design Vue 样式是否引入、插件是否 `app.use()`、导入是否来自包根入口。

下一步阅读[快速开始](/manual/quick-start)。
