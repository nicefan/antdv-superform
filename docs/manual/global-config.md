# 全局默认配置

插件安装配置用于接入应用级字典、权限、图标、组件和默认属性。配置只做跨页面一致性；单个页面的业务差异仍写在 Schema。

## 统一应用入口

`ConfigProvider` 负责 Ant Design Vue 组件的语言与主题上下文，插件安装配置负责 SuperForm 创建的表单、表格和弹窗。配置量不大时可以分别内联在 `main.ts` 和 `App.vue`，不必额外创建配置文件。

```ts
// src/main.ts
import { createApp } from "vue";
import Antdv from "ant-design-vue";
import zhCN from "ant-design-vue/es/locale/zh_CN";
import "ant-design-vue/dist/antd.css";
import SuperFormPlugin from "antdv-superform";
import App from "./App.vue";

createApp(App)
  .use(Antdv)
  .use(SuperFormPlugin, {
    locale: zhCN,
    schemaDiagnostics: import.meta.env.DEV,
    defaultProps: {
      Input: { allowClear: true },
      Select: { allowClear: true },
      DatePicker: { valueFormat: "YYYY-MM-DD" },
    },
  })
  .mount("#app");
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
import { ConfigProvider } from "ant-design-vue";
import zhCN from "ant-design-vue/es/locale/zh_CN";
</script>
```

文档站的在线示例把 `ConfigProvider`、中文 Locale 和插件安装配置直接放在统一的 `App.vue` 中，`Example.vue` 只保留当前示例的业务配置。这样示例切换时不会重复安装插件，也不需要在每段业务代码中声明 `ConfigProvider`。

## 完整安装配置

```ts
import SuperFormPlugin from "antdv-superform";

app.use(SuperFormPlugin, {
  locale: zhCN,
  schemaDiagnostics: import.meta.env.DEV,
  dictApi: (name) => api.dictionary(name),
  customIcon: (name) => iconRegistry[name]?.(),
  buttonRoles: () => permissionStore.roles,
  defaultButtons: {
    add: { label: "新增", icon: "plus" },
    delete: { confirmText: "确认删除？" },
  },
  tagViewer: ["blue", "green", "orange"],
  tableApiSetting: {
    currentField: "pageNum",
    sizeField: "pageSize",
    resultTransform: normalizePage,
  },
  defaultProps: {
    Form: { layout: "horizontal" },
    Table: {
      size: "small",
      bordered: true,
      isFixedHeight: true,
      resizeHeightOffset: 36,
    },
    Modal: { centered: true },
    Upload: { maxSize: 20, apis: uploadApis },
    rowButtons: { labelMode: "icon" },
  },
  components: {
    Input: ProjectInput,
    Table: ProjectTable,
  },
});
```

这组配置可以按职责分为三类：

- **开发与接口适配**：`schemaDiagnostics`、`dictApi`、`tableApiSetting`。
- **项目级交互规范**：`buttonRoles`、`defaultButtons`、`tagViewer`、`customIcon`。
- **设计系统接入**：`defaultProps`、`components`。

它们都应描述跨页面稳定的项目约定。只有某个页面才需要的字典、按钮或接口差异，仍放在当前 Schema 中。

## 配置项详解

| 属性                | 类型                          | 默认值       | 适合放什么                |
| ------------------- | ----------------------------- | ------------ | ------------------------- |
| `locale`            | object                        | —            | 应用语言环境              |
| `schemaDiagnostics` | boolean                       | `false`      | 开发期自动诊断            |
| `dictApi`           | function                      | —            | 统一字典服务              |
| `customIcon`        | function                      | —            | 业务图标注册表            |
| `buttonRoles`       | function                      | —            | 当前权限标识              |
| `defaultButtons`    | object                        | —            | 新增、删除等默认文案/图标 |
| `tagViewer`         | object/array/function/boolean | 内置颜色数组 | 全局只读 Tag 策略         |
| `tableApiSetting`   | object                        | —            | 后端表格协议              |
| `defaultProps`      | object                        | 内置组件默认 | 设计系统默认值            |
| `components`        | object                        | 内置基础组件 | 全局替换包装组件          |

## 开发诊断与接口服务

`schemaDiagnostics` 适合只在开发环境开启。SuperForm、SuperTable 和 SuperDetail 接收最终 Schema 时会把可静态识别的问题输出到控制台，完整规则见 [Schema 诊断](/manual/schema-diagnostics#开发期自动诊断)。

`dictApi` 是所有 `dictName` 字段的统一取数入口。组件库会按需调用它，但不会缓存结果；业务项目通常在字典服务中完成缓存、并发请求合并、租户隔离和失效刷新：

```ts
const dictionaryCache = new Map<
  string,
  Promise<Array<{ label: string; value: string | number }>>
>();

function getDictionary(name: string) {
  if (!dictionaryCache.has(name)) {
    dictionaryCache.set(name, api.dictionary(name));
  }
  return dictionaryCache.get(name)!;
}

app.use(SuperFormPlugin, {
  dictApi: getDictionary,
});
```

接口必须返回标准 `{ label, value }[]`。字段如何使用 `dictName`、局部 `options` 与缓存策略见[字典与权限接入](/manual/dictionaries-and-permissions#字典接入)。

## 图标、权限与按钮规范

`customIcon(name)` 把 Schema 或按钮中的图标名称转换成项目图标 VNode，适合接入现有图标注册表：

```ts
app.use(SuperFormPlugin, {
  customIcon: (name) => iconRegistry[name]?.(),
});
```

`buttonRoles()` 返回当前页面可用的权限标识。按钮组和表格操作列在构建时读取一次当前结果；常见做法是在路由切换或页面进入前把该页面权限写入 store，再挂载页面组件：

```ts
app.use(SuperFormPlugin, {
  buttonRoles: () => permissionStore.currentPageRoles,
});
```

它只负责前端显示或禁用，不能替代后端鉴权。权限策略详见[字典与权限接入：按钮权限](/manual/dictionaries-and-permissions#按钮权限)。

`defaultButtons` 按动作 `name` 与内置配置深度合并，可统一修改内置按钮，也可以把项目常用动作标准化：

```ts
app.use(SuperFormPlugin, {
  defaultButtons: {
    // 覆盖内置动作的默认文案与图标
    add: { label: "新建", icon: "plus" },
    delete: { confirmText: "确认删除选中的数据？" },
    // 注册项目通用动作，页面可直接在 actions 中写 'export'
    export: { label: "导出", icon: "download", onClick: exportCurrentData },
  },
});
```

最终优先级为：库内置动作 → `defaultButtons` → 宿主提供的方法 → 当前 `actions` 对象。内置动作名称、继承与覆盖规则见[按钮组 SuperButtons：内置动作与全局默认](/manual/super-buttons#内置动作与全局默认)。

## 全局只读 Tag 策略

`tagViewer` 只影响字段的只读展示。颜色数组以当前值作为索引，适合从 0 开始的连续数字值；对象或函数更适合把项目常用值、标签和语义颜色固定配对：

```ts
app.use(SuperFormPlugin, {
  tagViewer: (value) => {
    const statusMap: Record<string, { label: string; color: string }> = {
      enabled: { label: "启用", color: "green" },
      disabled: { label: "停用", color: "default" },
      error: { label: "异常", color: "red" },
    };
    return statusMap[String(value)] ?? "blue";
  },
});
```

函数接收当前值，可以返回颜色字符串，也可以返回 `{ label, color, icon }`。字段级 `tagViewer` 优先于全局配置，设为 `false` 可关闭当前字段的 Tag 展示。更多值形态见[字典与权限接入：标签展示](/manual/dictionaries-and-permissions#标签展示)。

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
});
```

它适合按应用启动阶段追加主题配置，不适合在页面生命周期里频繁切换。

`components` 与 `defaultProps` 的作用不同：前者替换底层组件实现，后者只设置默认属性。全局替换会影响所有对应字段，包装组件必须保持原组件的 v-model、事件、插槽和实例契约，详见[底层组件包装扩展](/manual/component-overrides)。

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
