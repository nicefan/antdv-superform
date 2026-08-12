# 按钮组 SuperButtons

SuperButtons 将同一套动作配置用于独立按钮组、表单按钮、表格工具栏、行操作和数组操作。按钮配置分为“按钮组如何排列”与“单个按钮做什么”两层。

## 三种使用入口

```ts
// 1. 组合函数，返回渲染函数
const [renderButtons] = useButtons({
  actions: [{ name: 'export', label: '导出', onClick: exportData }],
})

// 2. 直接组件
// <SuperButtons :actions="actions" align="right" />

// 3. Schema 内联节点
{
  type: 'Buttons',
  span: 'auto',
  actions: ['search', 'reset'],
}
```

宿主已有动作时可以使用字符串；独立业务动作使用完整对象。

## actions 的三种写法

```ts
// 最简数组
buttons: ['submit', 'reset']

// 带组配置
buttons: {
  align: 'center',
  actions: ['submit', 'reset'],
}

// 覆盖与自定义
buttons: {
  actions: [
    { name: 'submit', label: '保存并关闭' },
    { name: 'export', label: '导出', onClick: exportData },
  ],
}
```

内置名称为 `add`、`delete`、`edit`、`detail`、`submit`、`search`、`reset`。字符串只有在宿主提供同名方法时才有动作；`export`、`import`、`download` 必须自行配置 `onClick`。

## 按钮组全部属性

| 属性                  | 类型/用途                                               |
| --------------------- | ------------------------------------------------------- |
| `actions`             | 动作名或 ButtonItem 数组                                |
| `attrs`               | Ant Design Vue Space 属性和 HTML 属性                   |
| `limit`               | 超出数量进入“更多”菜单                                  |
| `buttonType`          | `primary`、`link`、`text`、`dashed`、`ghost`、`default` |
| `buttonShape`         | `circle`、`round`、`default`                            |
| `size`                | `large`、`middle`、`small`                              |
| `align`               | `left`、`center`、`right`                               |
| `placement`           | 表单内 `top`、`bottom`、`inline`                        |
| `divider`             | 链接/文本按钮间的分隔符；这两类默认开启                 |
| `labelMode`           | `icon`、`label`、`both`                                 |
| `moreLabel`           | “更多”菜单触发内容，字符串或函数                        |
| `visibleIn`           | `form`、`detail`、`both`                                |
| `unauthorized`        | 组级无权限策略：`hide` 或 `disable`                     |
| `hidden` / `disabled` | 静态值或上下文函数                                      |
| `targetSlot`          | 将按钮组渲染到宿主指定插槽                              |
| `methods`             | 为字符串动作提供宿主方法表                              |
| `effectData`          | 独立使用时补充响应式上下文                              |

旧属性 `validOn`、`invalidDisabled`、`roleMode`、`forSlot` 分别迁移到 `visibleIn`、`unauthorized`、`unauthorized`、`targetSlot`。

## 单个 ButtonItem 全部属性

| 属性                  | 说明                                       |
| --------------------- | ------------------------------------------ |
| `name`                | 动作标识；命中内置动作时继承默认配置和方法 |
| `label`               | 文本、插槽名或上下文函数                   |
| `customRender`        | 完全自定义按钮内容                         |
| `icon`                | 图标名或组件                               |
| `color`               | 语义色或自定义颜色                         |
| `attrs`               | Ant Design Vue Button 属性                 |
| `confirmText`         | 点击后先确认；支持上下文函数               |
| `tooltip`             | 普通提示                                   |
| `disabledTooltip`     | 禁用时提示；支持上下文函数                 |
| `dropdown`            | 按钮旁的下拉选项                           |
| `dropdownProps`       | Ant Design Vue Dropdown 属性               |
| `roleName`            | 权限标识                                   |
| `unauthorized`        | 无权限时隐藏或禁用                         |
| `visibleIn`           | 编辑/详情显示范围                          |
| `hidden` / `disabled` | 静态或上下文函数                           |
| `meta`                | 传给内置方法的附加参数                     |
| `onClick`             | `(context, originalAction?)`               |

旧 `validOn`、`invalidDisabled`、`roleMode` 仍在类型中仅为兼容，不应在新 Schema 使用。

## 覆盖内置动作

```ts
{
  name: 'add',
  label: '新增启用用户',
  meta: { source: 'toolbar' },
  onClick: (context, action) => {
    return action({
      resetData: { status: 1 },
      meta: context.meta,
    })
  },
}
```

第二个参数只在宿主确实提供原动作时存在。自定义 `export` 不要调用它：

```ts
{
  name: 'export',
  label: '导出',
  confirmText: ({ selectedRows }) => `确认导出 ${selectedRows.length} 条？`,
  disabled: ({ selectedRows }) => selectedRows.length === 0,
  onClick: ({ selectedRows }) => api.export(selectedRows),
}
```

## 下拉按钮

```ts
{
  label: '变更状态',
  dropdown: [
    { label: '启用', value: 'enable' },
    { label: '停用', value: 'disable' },
  ],
  dropdownProps: { placement: 'bottomRight' },
  onClick: (context, value) => updateStatus(context.record, value),
}
```

`dropdown` 使用通用选项格式；适合多个相近动作，不适合承载复杂表单。

## 权限与显示范围

```ts
{
  name: 'delete',
  roleName: 'user:delete',
  unauthorized: 'disable',
  visibleIn: 'detail',
}
```

无权限默认隐藏。按钮级策略优先于组级策略；前端隐藏不替代后端鉴权。权限接入见[字典与权限接入](/manual/dictionaries-and-permissions#按钮权限)。

## 上下文差异

- 表格工具栏：`selectedRows`、`selectedRowKeys`、`tableRef`。
- 行按钮：`record`、`index`、当前列上下文。
- 表单按钮：`formData` 和 `submit/reset/search` 方法。
- 弹窗自定义 footer：`modalRef`。
- 独立 SuperButtons：通过 `effectData` 明确传入。

可运行配置见[按钮组示例](/examples?example=buttons)。
