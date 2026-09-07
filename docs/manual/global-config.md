# 全局配置

官方产品的启动配置拆成三个明确入口：`initialize()` 绑定 Adapter 和字段组件，`configure()` 设置跨页面行为，`registerComponent(s)` 注册项目业务字段。它们不再放入 Vue `app.use()`。

## 统一应用入口

```ts
// src/main.ts
import { createApp } from "vue";
import superform from "superform-antdv";
import App from "./App.vue";

superform.initialize();
superform.configure({
  schemaDiagnostics: import.meta.env.DEV,
  dictApi: (name) => api.dictionary(name),
  customIcon: (name) => iconRegistry[name]?.(),
  buttonRoles: () => permissionStore.currentPageRoles,
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
    FormItem: { validateFirst: true },
    Input: { allowClear: true },
    Select: { allowClear: true },
    Table: { size: "small", bordered: true },
    Modal: { centered: true },
    rowButtons: { labelMode: "icon" },
  },
});

createApp(App).mount("#app");
```

语言和主题不属于 SuperForm Core 配置。AntDV 使用 `ConfigProvider`，Element Plus 使用其 Config Provider 或项目现有全局化方案。

## 配置项

| 属性 | 类型 | 默认值 | 用途 |
| --- | --- | --- | --- |
| `schemaDiagnostics` | boolean | `false` | 开发期自动诊断 |
| `dictApi` | function | — | 统一字典服务 |
| `customIcon` | function | — | 业务图标注册表 |
| `buttonRoles` | function | — | 当前权限标识 |
| `defaultButtons` | object | — | 内置和项目通用按钮默认值 |
| `tagViewer` | object/array/function/false | 内置颜色数组 | 全局只读 Tag 策略 |
| `tableApiSetting` | object | — | 后端分页字段与结果转换 |
| `defaultProps` | object | Adapter 默认值 | 组件默认属性 |

`configure()` 可以在初始化前后调用，但必须在页面渲染前完成应用级配置。不要在页面生命周期中频繁修改全局状态。

## 字典与接口服务

`dictApi(name)` 必须返回标准 `{ label, value }[]`。组件库按需调用但不负责缓存，项目可以在服务层合并并发请求：

```ts
const dictionaryCache = new Map<string, Promise<Array<{ label: string; value: string | number }>>>();

function getDictionary(name: string) {
  if (!dictionaryCache.has(name)) {
    dictionaryCache.set(name, api.dictionary(name));
  }
  return dictionaryCache.get(name)!;
}

superform.configure({ dictApi: getDictionary });
```

字段如何使用 `dictName` 见[字典与权限](/manual/dictionaries-and-permissions)。

## 图标、权限与按钮

```ts
superform.configure({
  customIcon: (name) => iconRegistry[name]?.(),
  buttonRoles: () => permissionStore.currentPageRoles,
  defaultButtons: {
    add: { label: "新建", icon: "plus" },
    delete: { confirmText: "确认删除选中的数据？" },
    export: { label: "导出", icon: "download", onClick: exportCurrentData },
  },
});
```

`buttonRoles()` 只负责前端显示或禁用，不能替代后端鉴权。按钮最终优先级为：库内置动作 → `defaultButtons` → 宿主提供的方法 → 当前 `actions` 对象。

## defaultProps 合并顺序

```text
Adapter 默认值 → configure.defaultProps → Schema attrs → dynamicAttrs / 运行状态
```

也可以在应用启动阶段继续合并：

```ts
superform.setDefaultProps({
  Input: { allowClear: true },
  DatePicker: { valueFormat: "YYYY-MM-DD" },
});
```

`defaultProps` 只设置属性，不负责提供实际字段组件。字段组件由自动导入插件或 `initialize({ components })` 提供；项目业务组件由 `registerComponent(s)` 提供。

## tableApiSetting

```ts
superform.configure({
  tableApiSetting: {
    currentField: "pageNum",
    sizeField: "pageSize",
    resultTransform(result) {
      return result.pagination
        ? {
            current: result.pagination.page,
            size: result.pagination.pageSize,
            total: result.pagination.total,
            records: result.items,
          }
        : result.items;
    },
  },
});
```

`resultTransform` 必须返回数组或标准分页对象。单个接口的特殊结构优先使用表格 `afterQuery`，不要在全局转换函数中判断大量 URL。
