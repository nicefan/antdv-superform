# 全局配置

官方产品的启动配置拆成三个明确入口：`initialize()` 绑定 Adapter 和字段组件，`configure()` 设置跨页面行为，`registerComponent(s)` 注册项目业务字段。这些入口在应用启动时显式调用。

<span id="应用配置入口"></span>

## configure：配置入口 {#统一应用入口}

```ts
// src/main.ts
import { createApp } from "vue";
import superform from "superform-antdv";
import App from "./App.vue";

superform.initialize();
superform.configure({
  schemaDiagnostics: import.meta.env.DEV,
  dictApi: (name) => api.dictionary(name),
  buttonRoles: () => permissionStore.currentPageRoles,
  defaultButtons: {
    add: { label: "新增" },
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

## 全局配置项 {#配置项}

| 属性 | 类型 | 默认值 | 用途 |
| --- | --- | --- | --- |
| `schemaDiagnostics` | boolean | `false` | 开发期自动诊断 |
| `dictApi` | function | — | 统一字典服务 |
| `buttonRoles` | function | — | 当前权限标识 |
| `defaultButtons` | object | — | 内置和项目通用按钮默认值 |
| `tagViewer` | object/array/function/false | 内置颜色数组 | 全局只读 Tag 策略 |
| `tableApiSetting` | object | — | 后端分页字段与结果转换 |
| `defaultProps` | object | Adapter 默认值 | 组件默认属性 |

`configure()` 可以在初始化前后调用，但必须在页面渲染前完成应用级配置。不要在页面生命周期中频繁修改全局状态。

<span id="数据与业务服务"></span>

## dictApi：字典服务 {#字典与接口服务}

```ts
superform.configure({
  dictApi: async (name) => {
    const result = await dictionaryApi.get(name);
    return result.map((item) => ({
      label: item.name,
      value: item.code,
      disabled: item.disabled,
    }));
  },
});
```

字段只声明名称：

```ts
{ type: 'Select', field: 'status', label: '状态', options: { dictName: 'enabled_status' } }
```

同一结果用于 Select 选项以及表格、详情的只读映射。

### options 与 dictName 的选择

| 来源               | 适合场景               |
| ------------------ | ---------------------- |
| `options.source` 静态数据 | 页面常量、不会复用     |
| `options.source` Ref/函数 | 依赖当前模型或实时接口 |
| `options.dictName` | 跨页面共享的标准字典   |

组件库不内置缓存。缓存、请求合并、有效期和租户隔离应在 dictApi 中完成：

```ts
const cache = new Map();

async function dictApi(name) {
  if (!cache.has(name)) cache.set(name, api.getDictionary(name));
  return cache.get(name);
}
```

`dictApi(name)` 返回标准 `{ label, value }[]`。局部非标准字段通过 `options.fieldNames` 映射；`options.source` 与 `options.dictName` 同时存在时优先使用 source。返回契约见[字典接口](/manual/backend-contracts#字典接口)，显示配置见 [tagViewer](/manual/rendering#tagviewer-只读配置)。

## 按钮权限与默认按钮 {#图标、权限与按钮}

```ts
superform.configure({
  buttonRoles: () => permissionStore.currentPageRoles,
  defaultButtons: {
    add: { label: "新建" },
    delete: { confirmText: "确认删除选中的数据？" },
    export: { label: "导出", onClick: exportCurrentData },
  },
});
```

`icon` 接收渲染函数：

```ts
import { h } from 'vue'
import DownloadIcon from './icons/DownloadIcon.vue'

const actions = {
  export: { label: '导出', icon: () => h(DownloadIcon), onClick: exportCurrentData },
}
```

`buttonRoles()` 的读取时机、无权限策略与场景判断见[按钮权限](/manual/super-buttons#权限与显示范围)。按钮最终优先级为：库内置动作 → `defaultButtons` → 宿主提供的方法 → 当前 `actions` 对象。

## 分页接口映射 {#tableapisetting}

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

<span id="组件默认属性"></span>

## 组件默认属性 {#defaultprops-合并顺序}

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
