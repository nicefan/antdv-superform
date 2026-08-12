# 全局默认配置

插件安装配置用于接入应用级字典、权限、图标、组件和默认属性。配置只做跨页面一致性；单个页面的业务差异仍写在 Schema。

## 统一应用入口

`ConfigProvider` 负责 Ant Design Vue 组件的语言与主题上下文，插件安装配置负责 SuperForm 创建的表单、表格和弹窗。配置量不大时可以分别内联在 `main.ts` 和 `App.vue`，不必额外创建配置文件。

```ts
// src/main.ts
import { createApp } from 'vue'
import Antdv from 'ant-design-vue'
import zhCN from 'ant-design-vue/es/locale/zh_CN'
import 'ant-design-vue/dist/antd.css'
import SuperFormPlugin from 'antdv-superform'
import 'antdv-superform/lib/style.css'
import App from './App.vue'

createApp(App)
  .use(Antdv)
  .use(SuperFormPlugin, {
    locale: zhCN,
    schemaDiagnostics: import.meta.env.DEV,
    defaultProps: {
      Input: { allowClear: true },
      Select: { allowClear: true },
      DatePicker: { valueFormat: 'YYYY-MM-DD' },
    },
  })
  .mount('#app')
```

在根组件中直接配置 Ant Design Vue 上下文：

```vue
<!-- src/App.vue -->
<template>
  <ConfigProvider :locale="zhCN">
    <RouterView />
  </ConfigProvider>
</template>

<script setup lang="ts">
import { ConfigProvider } from 'ant-design-vue'
import zhCN from 'ant-design-vue/es/locale/zh_CN'
</script>
```

文档站的在线示例把 `ConfigProvider`、中文 Locale 和插件安装配置直接放在统一的 `App.vue` 中，`Example.vue` 只保留当前示例的业务配置。这样示例切换时不会重复安装插件，也不需要在每段业务代码中声明 `ConfigProvider`。

## 完整安装配置

```ts
import SuperFormPlugin from 'antdv-superform'

app.use(SuperFormPlugin, {
  locale: zhCN,
  schemaDiagnostics: import.meta.env.DEV,
  dictApi: (name) => api.dictionary(name),
  customIcon: (name) => iconRegistry[name]?.(),
  buttonRoles: () => permissionStore.roles,
  defaultButtons: {
    add: { label: '新增', icon: 'plus' },
    delete: { confirmText: '确认删除？' },
  },
  tagViewer: ['blue', 'green', 'orange'],
  tableApiSetting: {
    currentField: 'pageNum',
    sizeField: 'pageSize',
    resultTransform: normalizePage,
  },
  defaultProps: {
    Form: { layout: 'horizontal' },
    Table: {
      size: 'small',
      bordered: true,
      isFixedHeight: true,
      resizeHeightOffset: 36,
    },
    Modal: { centered: true },
    Upload: { maxSize: 20, apis: uploadApis },
    rowButtons: { labelMode: 'icon' },
  },
  components: {
    Input: ProjectInput,
    Table: ProjectTable,
  },
})
```

## 配置项详解

| 属性                | 契约                          | 适合放什么                |
| ------------------- | ----------------------------- | ------------------------- |
| `locale`            | Ant Design Vue Locale         | 应用语言环境              |
| `schemaDiagnostics` | boolean                       | 开发期自动诊断            |
| `dictApi`           | `(name) => Promise<Option[]>` | 统一字典服务              |
| `customIcon`        | `(name) => VNode`             | 业务图标注册表            |
| `buttonRoles`       | `() => string[]`              | 当前权限标识              |
| `defaultButtons`    | 按 name 的 ButtonItem 映射    | 新增、删除等默认文案/图标 |
| `tagViewer`         | 颜色映射、数组、函数或 false  | 全局只读 Tag 策略         |
| `tableApiSetting`   | 分页字段与响应转换            | 后端表格协议              |
| `defaultProps`      | 按组件名称的属性对象          | 设计系统默认值            |
| `components`        | 基础组件映射                  | 全局替换包装组件          |

## defaultProps 的层级

```ts
defaultProps: {
  FormItem: { validateFirst: true },
  Input: { allowClear: true },
  Select: { allowClear: true },
  DatePicker: { valueFormat: 'YYYY-MM-DD' },
  TimeRange: { valueFormat: 'HH:mm:ss' },
  buttons: { size: 'small' },
  rowButtons: { buttonType: 'link', labelMode: 'icon' },
}
```

合并优先级：

```text
库内置默认 → defaultProps → Schema attrs → dynamicAttrs / 运行状态
```

安装后可继续深度合并：

```ts
SuperFormPlugin.setDefaultProps({
  Input: { allowClear: true },
})
```

它适合按应用启动阶段追加主题配置，不适合在页面生命周期里频繁切换。

## tableApiSetting

```ts
tableApiSetting: {
  currentField: 'pageNum',
  sizeField: 'pageSize',
  resultTransform(result) {
    return result.pagination
      ? {
          current: result.pagination.page,
          size: result.pagination.pageSize,
          total: result.pagination.total,
          records: result.items,
        }
      : result.items
  },
}
```

`resultTransform` 必须返回数组或标准分页对象。单接口差异使用 `afterQuery`，不要在全局函数中判断大量 URL。

## 内置默认值

| 场景                   | 默认                  |
| ---------------------- | --------------------- |
| 字段栅格               | span 8                |
| Row gutter             | 16                    |
| FormItem               | `validateFirst: true` |
| Table                  | `size: 'small'`       |
| TimePicker / TimeRange | `HH:mm:ss`            |
| DatePicker / DateRange | `YYYY-MM-DD`          |
| options 只读展示       | Tag + 内置颜色组      |

默认满足需求时不要在每个 Schema 重复生成。组件替换细节见[底层组件包装扩展](/manual/component-overrides)。

`isFixedHeight` 与 `resizeHeightOffset` 不是库内置的 Table 默认值。上方完整示例把它们作为业务项目的统一页面策略：固定表格区域，并为页面底部保留 36px。高度模式、作用范围和单页覆盖方式见[SuperTable：页面容器与高度策略](/manual/super-table#页面容器与高度策略)。
