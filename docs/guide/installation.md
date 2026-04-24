# 安装

## 环境要求

- `vue >= 3.3.13`
- `ant-design-vue >= 3.2.20`

## 安装依赖

```bash
pnpm add antdv-superform vue ant-design-vue
```

如果你的项目还没有安装日期相关依赖，通常也会一并安装业务里常见的 `dayjs`。

## 注册插件

```ts
import { createApp } from 'vue'
import Antd from 'ant-design-vue'
import superform from 'antdv-superform'
import 'ant-design-vue/dist/reset.css'
import 'antdv-superform/lib/style.css'

import App from './App.vue'

createApp(App)
  .use(Antd)
  .use(superform)
  .mount('#app')
```

## 可选的全局配置

你可以在 `app.use(superform, config)` 时传入全局配置：

```ts
app.use(superform, {
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

常见可配项包括：

- `defaultButtons`
- `defaultProps`
- `dictApi`
- `customIcon`
- `buttonRoles`
- `tagViewer`
- `components`

## 本项目文档开发

当前仓库已经预留了文档脚本：

```bash
pnpm docs:dev
pnpm docs:build
pnpm docs:preview
```

如果本地还没有安装 `vitepress` 依赖，请先执行安装依赖后再启动。
