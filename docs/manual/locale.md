# 语言包

默认使用简体中文。需要英文时，设置 `locale: enUS`。

## 配置语言 {#配置语言}

```ts
import superform, { enUS } from 'superform-antdv'

superform.configure({ locale: enUS })
```

Element Plus 项目从 `superform-element-plus` 导入。语言包提供 SuperForm 的默认按钮、输入提示、校验和上传等文案；分页、日期面板等原生文案还需配置 UI 框架语言。

## 配置 UI 框架语言 {#与-ui-框架协同}

在应用根组件中同时配置 SuperForm 和 UI 框架的语言：

::: code-group

```vue [AntDV Next]
<script setup lang="ts">
import { ConfigProvider } from 'antdv-next'
import uiEnUS from 'antdv-next/locale/en_US'
import superform, { enUS } from 'superform-antdv'

superform.configure({ locale: enUS })
</script>

<template>
  <ConfigProvider :locale="uiEnUS">
    <RouterView />
  </ConfigProvider>
</template>
```

```vue [Element Plus]
<script setup lang="ts">
import { ElConfigProvider } from 'element-plus'
import uiEn from 'element-plus/es/locale/lang/en'
import superform, { enUS } from 'superform-element-plus'

superform.configure({ locale: enUS })
</script>

<template>
  <ElConfigProvider :locale="uiEn">
    <RouterView />
  </ElConfigProvider>
</template>
```

:::

应用启动时仍需完成 `superform.initialize()`，见[安装](/manual/installation#显式初始化)。

## 修改默认文案 {#覆盖文案}

基于语言包覆盖需要修改的消息：

```ts
superform.configure({
  locale: {
    ...enUS,
    messages: {
      ...enUS.messages,
      submit: 'Send',
      input: 'Enter {label}',
      required: '{label} is required',
    },
  },
})
```

消息中的 `{label}`、`{min}`、`{max}` 等参数会在使用时替换。保留基础语言包的 `messages`，可以让其余文案继续使用该语言；省略的消息键回退到中文，每次配置独立合成。

完整语言包类型为 `SuperFormLocale`，部分配置类型为 `SuperFormLocaleConfig`，均从所选产品包导入。

## 切换语言 {#切换语言}

在语言选择事件中再次调用 `configure()`，并同步更新 ConfigProvider 的 `locale`：

```ts
import superform, { enUS, zhCN } from 'superform-antdv'

function changeLanguage(language: 'zh-CN' | 'en-US') {
  superform.configure({ locale: language === 'en-US' ? enUS : zhCN })
}
```

语言配置对整个应用生效，切换时保留表单值和编辑状态。已有校验错误在下次校验时更新。

## 自定义文案优先 {#文案范围与优先级}

显式设置的按钮 `label`、`attrs.placeholder`、规则 `message` 和弹窗文案优先于语言包。固定字符串不会随语言切换。

Schema 字段标签、选项和业务内容由项目自行翻译。日期库的语言与格式按项目配置。
