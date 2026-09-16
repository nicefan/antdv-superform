# 安装

## 选择官方产品包

SuperForm 1.0 将 Core 与官方 UI 实现分开发布。业务项目只安装一个产品包，不需要再安装或导入 Core `superform`。

AntDV Next：

```bash
pnpm add superform-antdv antdv-next
```

Element Plus：

```bash
pnpm add superform-element-plus element-plus
```

当前运行基线为 Vue `>= 3.5.0`、AntDV Next `>= 1.5.0` 或 Element Plus `>= 2.14.5`。Vue 与所选 UI 框架是 peer dependencies。

## 显式初始化

官方产品包导入时没有初始化副作用。应用必须在渲染 SuperForm 组件前调用一次 `initialize()`。

```ts
import { createApp } from "vue";
import superform from "superform-antdv";
import App from "./App.vue";

superform.initialize();
superform.configure({
  schemaDiagnostics: import.meta.env.DEV,
});

createApp(App).mount("#app");
```

`initialize()` 绑定官方 Adapter；`configure()` 设置字典、权限、按钮和默认属性等 Core 行为。Element Plus 项目只需将导入改为 `superform-element-plus`。

产品包会加载 SuperForm 自身样式。UI 框架的全局样式、主题、语言环境仍按对应框架的项目约定配置。

## 提供字段组件

Adapter 会声明支持的字段名称、Props 和 model 协议，但普通输入组件不会默认全量进入产品根入口。可以从以下三种方式中选择一种。

### Vite 按需导入（推荐）

```ts
// vite.config.ts
import { defineConfig } from "vite";
import SuperFormComponents from "superform-antdv/unplugin";

export default defineConfig({
  plugins: [
    SuperFormComponents({
      dirs: ["src"],
      entry: "src/main.ts",
      dts: "src/superform-components.d.ts",
    }),
  ],
});
```

产品插件已经内置官方 resolver、产品包导入路径和类型模块。入口仍需调用无参 `superform.initialize()`。完整规则见 [unplugin 自动导入](/manual/auto-components)。

### 手动按需登记

```ts
import superform from "superform-antdv";
import { Input, Rate, Select } from "antdv-next";

superform.initialize({
  components: { Input, Select, Rate },
});
```

组件对象的 key 使用 Schema 名称。Element Plus 导出带 `El` 前缀，因此需要显式映射：

```ts
import superform from "superform-element-plus";
import { ElInput, ElRate, ElSelect } from "element-plus";

superform.initialize({
  components: {
    Input: ElInput,
    Select: ElSelect,
    Rate: ElRate,
  },
});
```

### 全量登记

```ts
import superform from "superform-antdv";
import { fieldComponents } from "superform-antdv/components";

superform.initialize({ components: fieldComponents });
```

`/components` 是独立的全量入口；未导入时不会由产品根入口主动加载全部字段。

## 公共导入约定

页面组件、组合函数、Schema 辅助函数和类型都从所选产品包根入口导入：

```ts
import {
  SuperDetail,
  SuperForm,
  SuperTable,
  defineForm,
  useForm,
  useTable,
} from "superform-antdv";

import type { ExtFormOption, RootTableOption, UniOption } from "superform-antdv";
```

不要从 `dist/`、`src/` 或其他内部路径导入。第三方 Adapter 开发者才直接安装 `superform` 并使用 `superform/sdk`。

## AI 工具初始化

CLI 属于独立 Core 包，需要时将它作为开发依赖安装：

```bash
pnpm add -D superform
npx superform init-ai
```

详细行为见 [AI 编码指引](/manual/ai-guide)。

## 安装后检查

```vue
<template>
  <SuperForm :schema="{ subItems: [] }" />
</template>

<script setup lang="ts">
import { SuperForm } from "superform-antdv";
</script>
```

若字段提示“组件未注册”，检查 Vite 插件是否扫描到该 Schema，或是否在首次 `initialize({ components })` 时手动提供了组件。下一步阅读[快速开始](/manual/quick-start)。
