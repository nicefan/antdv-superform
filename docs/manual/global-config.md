# 全局配置

在 `src/main.ts` 中通过 `configure()` 设置项目通用配置，只填写需要的项。

<span id="应用配置入口"></span>

## 设置配置 {#统一应用入口}

```ts
import superform from 'superform-antdv'

superform.configure({
  defaultProps: {
    Input: { allowClear: true },
    Table: { size: 'small', bordered: true },
  },
})
```

Element Plus 项目从 `superform-element-plus` 导入。应用默认配置在页面渲染前设置；语言可以在运行时切换。

## 配置项 {#配置项}

| 属性 | 用途 | 默认值 |
| --- | --- | --- |
| `locale` | [内置文案语言](/manual/locale) | 简体中文 `zhCN` |
| `schemaDiagnostics` | 开发期 Schema 诊断 | `false` |
| `dictApi` | 字典查询函数 | — |
| `buttonRoles` | 返回当前权限标识的函数 | — |
| `defaultButtons` | 通用按钮配置 | — |
| `tagViewer` | [只读 Tag 颜色](/manual/rendering#tagviewer-只读配置) | 内置颜色数组 |
| `tableApiSetting` | 分页参数名与结果转换 | — |
| `defaultProps` | 组件默认属性 | Adapter 默认值 |

<span id="数据与业务服务"></span>

## 接入字典 {#字典与接口服务}

`dictApi(name)` 返回 `{ label, value }[]`：

```ts
superform.configure({
  dictApi: async (name) => {
    const result = await dictionaryApi.get(name)
    return result.map((item) => ({ label: item.name, value: item.code }))
  },
})
```

字段通过 `dictName` 使用字典：

```ts
{ type: 'Select', field: 'status', label: '状态', options: { dictName: 'enabled_status' } }
```

### 选择选项来源 {#options-与-dictname-的选择}

| 配置 | 适用场景 |
| --- | --- |
| `options.source` 数组 | 固定选项 |
| `options.source` Ref 或函数 | 随数据变化的选项 |
| `options.dictName` | 多处复用的字典 |

同时配置时优先使用 `source`。需要缓存字典结果时，在业务的 `dictApi` 中处理。

## 设置按钮与权限 {#图标、权限与按钮}

```ts
superform.configure({
  buttonRoles: () => permissionStore.currentPageRoles,
  defaultButtons: {
    add: { label: '新建' },
    delete: { confirmText: '确认删除选中的数据？' },
    export: { label: '导出', onClick: exportCurrentData },
  },
})
```

页面通过 `actions: ['add', 'delete', 'export']` 使用这些按钮。局部按钮配置可以覆盖全局默认值；权限匹配和动作配置见[按钮组](/manual/super-buttons)。

## 适配分页接口 {#tableapisetting}

后端参数名或返回结构不同时，配置对应映射：

```ts
superform.configure({
  tableApiSetting: {
    currentField: 'pageNum',
    sizeField: 'pageSize',
    resultTransform: (result) => ({
      current: result.page,
      size: result.pageSize,
      total: result.total,
      records: result.items,
    }),
  },
})
```

无分页时，`resultTransform` 直接返回数组。单个表格的结果转换可使用 `afterQuery`。

<span id="组件默认属性"></span>

## 设置组件默认属性 {#defaultprops-合并顺序}

通过 `defaultProps` 设置默认属性，也可以用 `setDefaultProps()` 继续合并：

```ts
superform.setDefaultProps({
  Input: { allowClear: true },
  Modal: { centered: true },
})
```

属性按以下顺序覆盖：

```text
Adapter 默认值 → defaultProps → Schema attrs → dynamicAttrs / 运行状态
```

范围、多行和密码等固定模式由字段类型决定，不能通过 `attrs` 改为其他模式。字段组件的提供方式见[安装](/manual/installation)。
