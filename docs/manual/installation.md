# 安装

## 1. 选择产品包

按项目使用的 UI 框架安装一个产品包：

::: code-group

```bash [AntDV Next]
pnpm add superform-antdv antdv-next
```

```bash [Element Plus]
pnpm add superform-element-plus element-plus
```

:::

需要 Vue `>= 3.5.0`，以及 AntDV Next `>= 1.5.0` 或 Element Plus `>= 2.14.5`。UI 框架样式按对应框架的方式加载。

## 2. 配置字段组件

### Vite 按需导入（推荐）

在 `vite.config.ts` 中添加插件：

```ts
import { defineConfig } from 'vite'
import SuperFormComponents from 'superform-antdv/unplugin'

export default defineConfig({
  plugins: [
    SuperFormComponents({
      dirs: ['src'],
      entry: 'src/main.ts',
      dts: 'src/superform-components.d.ts',
    }),
  ],
})
```

Element Plus 项目将插件导入改为 `superform-element-plus/unplugin`。扫描规则和动态字段配置见[自动导入](/manual/auto-components)。

### 手动提供组件

不使用自动导入时，在初始化时提供需要的字段组件：

::: code-group

```ts [AntDV Next]
import superform from 'superform-antdv'
import { Input, Select } from 'antdv-next'

superform.initialize({ components: { Input, Select } })
```

```ts [Element Plus]
import superform from 'superform-element-plus'
import { ElInput, ElSelect } from 'element-plus'

superform.initialize({
  components: { Input: ElInput, Select: ElSelect },
})
```

:::

`components` 的 key 使用 Schema 字段名称，如 `Input`、`Select`。

需要全部字段时，从所选产品包的 `/components` 入口导入：

```ts
import superform from 'superform-antdv'
import { fieldComponents } from 'superform-antdv/components'

superform.initialize({ components: fieldComponents })
```

## 3. 初始化应用 {#显式初始化}

使用自动导入时，在应用挂载前调用 `initialize()`：

```ts
// src/main.ts
import { createApp } from 'vue'
import superform from 'superform-antdv'
import App from './App.vue'

superform.initialize()
createApp(App).mount('#app')
```

手动提供组件的项目，将上面的初始化调用替换为带 `components` 的调用。Element Plus 项目使用 `superform-element-plus` 入口。

字典、按钮和默认属性按需通过[全局配置](/manual/global-config)设置；需要英文界面时见[语言包](/manual/locale)。

## 4. 使用组件

页面组件、组合函数和类型都从所选产品包导入：

```ts
import { SuperForm, defineForm, useForm } from 'superform-antdv'
import type { ExtFormOption } from 'superform-antdv'
```

下一步阅读[快速开始](/manual/quick-start)，创建表单并绑定数据。

若字段提示“组件未注册”，检查插件是否扫描到该 Schema，或是否在首次 `initialize({ components })` 时提供了组件。

## AI 工具初始化

需要生成 AI 编码配置时，安装 CLI 并执行：

```bash
pnpm add -D superform
npx superform init-ai
```

详细用法见[AI 编码指引](/manual/ai-guide)。
