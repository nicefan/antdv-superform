# 按钮组 SuperButtons

SuperButtons 将同一套动作配置用于独立按钮组、表单按钮、表格工具栏、行操作和数组操作。按钮配置分为“按钮组如何排列”与“单个按钮做什么”两层。

## 已集成的组件与功能

SuperButtons 不只是独立按钮组件，也是页面组件和结构容器共用的动作层。宿主负责注入方法与业务上下文，按钮配置负责文案、权限、状态、确认和交互表现。

| 集成位置                                    | 配置入口                     | 已集成功能                                                      |
| ------------------------------------------- | ---------------------------- | --------------------------------------------------------------- |
| SuperForm                                   | `buttons`                    | 提交前校验、提交、重置，并提供 `formData`                       |
| SuperTable 查询表单                         | `searchForm.buttons`         | 查询、重置；配置 `limit` 时自动加入展开/收起                    |
| SuperTable / Table                          | `buttons`、`rowButtons`      | 新增、编辑、详情、删除、批量操作，以及选中行和表格实例上下文    |
| List / ListGroup / InputList                | `buttons`、`rowButtons`      | 数组新增、行删除和自定义行操作，并提供当前项与索引              |
| SuperModal                                  | `buttons`                    | 自定义弹窗 footer，并向动作提供 `modalRef`                      |
| Group / Descriptions                        | `buttons`                    | 分组标题区或底部动作，可按编辑/详情场景控制显示                 |
| Card / Tabs / Collapse                      | `buttons`、页签项/折叠项按钮 | 卡片标题、页签栏右侧、折叠面板标题区的业务动作                  |
| Schema 内联 `Buttons` / 独立 `SuperButtons` | 节点属性 / 组件 props        | 在任意布局位置渲染动作组，通过 `methods`、`effectData` 注入能力 |

内置动作只有在宿主提供同名方法时才会执行对应业务。例如 SuperForm 为 `submit`、`reset` 注入表单动作，Table 为 `add`、`edit`、`detail`、`delete` 注入行编辑动作；普通容器中的业务按钮应自行提供 `onClick`。

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

## 内置动作与全局默认

内置动作提供常用文案、样式、确认提示和禁用条件，宿主组件再注入实际方法。例如 `delete` 默认带危险样式和确认提示，未提供当前记录且没有选中行时自动禁用。

项目可以通过插件的 `defaultButtons` 统一覆盖内置动作，也可以注册跨页面复用的项目动作：

```ts
superform.configure({
  defaultButtons: {
    add: { label: "新建", icon: "plus" },
    delete: { confirmText: "确认删除选中的数据？" },
    export: {
      label: "导出",
      icon: "download",
      onClick: ({ selectedRows }) => api.export(selectedRows),
    },
  },
});
```

页面随后可以直接引用动作名：

```ts
const buttons = {
  actions: ["add", "delete", "export"],
};
```

合并顺序为：库内置动作 → 全局 `defaultButtons` → 宿主方法 → 当前 `actions` 对象。因此，全局配置负责团队默认规范，页面对象只覆盖当前业务差异。自定义动作必须在 `defaultButtons` 或当前对象中提供 `onClick`。

## 按钮组全部属性

| 属性                  | 类型             | 默认值         | 用途                                  |
| --------------------- | ---------------- | -------------- | ------------------------------------- |
| `actions`             | array            | `[]`           | 动作名或 ButtonItem 数组              |
| `attrs`               | object           | `{}`           | Ant Design Vue Space 属性和 HTML 属性 |
| `limit`               | number           | —              | 超出数量进入“更多”菜单                |
| `buttonType`          | string           | `'default'`    | 按钮类型                              |
| `buttonShape`         | string           | `'default'`    | 按钮形状                              |
| `size`                | string           | `'middle'`     | 按钮尺寸                              |
| `align`               | string           | —              | `left`、`center`、`right`             |
| `placement`           | string           | —              | 表单内 `top`、`bottom`、`inline`      |
| `divider`             | boolean          | 按按钮类型计算 | 链接/文本按钮默认显示分隔符           |
| `labelMode`           | string           | `'both'`       | `icon`、`label`、`both`               |
| `moreLabel`           | string/function  | 省略号图标     | “更多”菜单触发内容                    |
| `visibleIn`           | string           | `'both'`       | `form`、`detail`、`both`              |
| `unauthorized`        | string           | `'hide'`       | 组级无权限策略：`hide` 或 `disable`   |
| `hidden` / `disabled` | boolean/function | `false`        | 静态值或上下文函数                    |
| `targetSlot`          | string           | 宿主决定       | 将按钮组渲染到宿主指定插槽            |
| `methods`             | object           | `{}`           | 为字符串动作提供宿主方法表            |
| `effectData`          | object           | `{}`           | 独立使用时补充响应式上下文            |

## 单个 ButtonItem 全部属性

| 属性                  | 类型                      | 默认值   | 说明                                       |
| --------------------- | ------------------------- | -------- | ------------------------------------------ |
| `name`                | string                    | —        | 动作标识；命中内置动作时继承默认配置和方法 |
| `label`               | string/function           | 按动作名 | 文本、插槽名或上下文函数                   |
| `customRender`        | string/function           | —        | 完全自定义按钮内容                         |
| `icon`                | string/Component          | —        | 图标名或组件                               |
| `color`               | string                    | —        | 语义色或自定义颜色                         |
| `attrs`               | object                    | `{}`     | Ant Design Vue Button 属性                 |
| `confirmText`         | string/function           | —        | 点击后先确认                               |
| `tooltip`             | string                    | —        | 普通提示                                   |
| `disabledTooltip`     | string/function           | —        | 禁用时提示                                 |
| `dropdown`            | array/object/Ref/function | —        | 按钮旁的下拉选项                           |
| `roleName`            | string                    | —        | 权限标识                                   |
| `unauthorized`        | string                    | `'hide'` | 无权限时隐藏或禁用                         |
| `visibleIn`           | string                    | `'both'` | 编辑/详情显示范围                          |
| `hidden` / `disabled` | boolean/function          | `false`  | 静态或上下文函数                           |
| `meta`                | object                    | `{}`     | 传给内置方法的附加参数                     |
| `onClick`             | function                  | —        | `(context, originalAction?)`               |

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
    { label: '启用', value: 'enable' }, // value 会作为 onClick 的第二个参数
    { label: '停用', value: 'disable' },
  ],
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

无权限默认隐藏。按钮级策略优先于组级策略；前端隐藏不替代后端鉴权。权限接入见[字典与权限](/manual/dictionaries-and-permissions#按钮权限)。

## 上下文差异

- 表格工具栏：`selectedRows`、`selectedRowKeys`、`tableRef`。
- 行按钮：`record`、`index`、当前列上下文。
- 表单按钮：`formData` 和 `submit/reset/search` 方法。
- 弹窗自定义 footer：`modalRef`。
- 独立 SuperButtons：通过 `effectData` 明确传入。

可运行配置见[按钮组示例](/examples?example=buttons)。
