# 布局容器

本页包括 Group、Fragment、Card、Tabs、Collapse 和 Descriptions。它们通过 `subItems` 组织节点，不负责页面级查询。

## 容器共享配置

大多数容器继承 ExtBaseOption 与 ExtRow：`field`、`initialValue`、`hidden`、`disabled`、`exclude`、`attrs`、`dynamicAttrs`、事件、`span`、`block`、`breakAfter`、`align`、`subSpan`、`gutter`、`rowProps` 等。

```ts
{
  type: 'Group',
  field: 'contact',
  hidden: ({ formData }) => !formData.hasContact,
  disabled: ({ formData }) => formData.readonly,
  subSpan: 12,
  gutter: 24,
  rowProps: { align: 'middle' },
  subItems: [],
}
```

带 `field` 时子项绑定该对象；不带 `field` 时只组织当前对象的布局。

## Group

Group 是通用分组容器：

```ts
{
  type: 'Group',
  title: ({ current }) => `联系人：${current.name || '未填写'}`,
  buttons: {
    placement: 'bottom',
    actions: [{ label: '复制地址', onClick: copyAddress }],
  },
  component: ProjectSection,
  contentAttrs: { class: 'contact-content' },
  ignoreTableTitle: false,
  descriptionsProps: { mode: 'form' },
  subItems: [],
}
```

| 属性                | 类型            | 默认值     | 说明                          |
| ------------------- | --------------- | ---------- | ----------------------------- |
| `title`             | string/function | —          | 标题                          |
| `label`             | string/function | —          | 字段或容器标签语义            |
| `buttons`           | array/object    | —          | 标题区或底部按钮              |
| `subItems`          | array           | —          | 子节点                        |
| `component`         | Component       | 内置 Group | 用业务组件包装当前分组        |
| `contentAttrs`      | object          | `{}`       | 内容区域 HTML 属性            |
| `ignoreTableTitle`  | boolean         | `false`    | Schema 用于表格时忽略分组表头 |
| `descriptionsProps` | object          | —          | 只读详情布局                  |

`component` 适合项目统一 Section 外壳；只想换全局基础组件时使用[替换底层组件](/manual/component-overrides)。

## Fragment

Fragment 没有视觉包装，会将子项展开到当前位置：

```ts
{
  type: 'Fragment',
  hidden: ({ formData }) => !formData.showAudit,
  disabled: ({ formData }) => formData.auditLocked,
  subSpan: 12,
  subItems: auditFields,
}
```

公开类型仅允许 `type`、`field`、`disabled`、`exclude`、`hidden`、`subItems`、`subSpan`。它会把 hidden/disabled 作用于展开后的直接子项，适合复用逻辑字段组。Fragment 从 0.6.16 提供。

## Card

Card 使用 Ant Design Vue Card 包装内容：

```ts
{
  type: 'Card',
  title: '基本信息',
  attrs: { size: 'small', bordered: true },
  buttons: {
    actions: [{ label: '刷新', onClick: refresh }],
  },
  subItems: [],
}
```

`title` 渲染 Card 标题，编辑模式下 `buttons` 进入 extra 区。只读模式内部字段切换为详情布局。Card 继承 GroupBase 的 `title`、`buttons`、`subItems`、`descriptionsProps` 和行布局属性。

## Tabs

### 根配置

```ts
const activeTab = ref('base')

{
  type: 'Tabs',
  activeKey: activeTab,
  buttons: { actions: [{ label: '新增页签', onClick: addTab }] },
  attrs: { tabPosition: 'top' },
  subItems: [],
}
```

| 属性        | 类型         | 默认值       | 说明                                      |
| ----------- | ------------ | ------------ | ----------------------------------------- |
| `activeKey` | Ref          | 首个可用页签 | 双向控制当前页签                          |
| `buttons`   | array/object | —            | 页签栏右侧 `add` / `refresh` 或自定义动作 |
| `subItems`  | array        | 必填         | ExtTabItem 数组                           |
| `attrs`     | object       | `{}`         | Tabs 底层属性                             |

### 页签项 ExtTabItem

```ts
{
  label: '基本信息',
  key: 'base',
  icon: 'user',
  disabled: ({ formData }) => formData.lockBase,
  hidden: ({ formData }) => !formData.showBase,
  buttons: { actions: [{ label: '刷新', onClick: refreshBase }] },
  subSpan: 12,
  subItems: [],
}
```

每项必填 `label`、`subItems`，可配置 `key`、`icon`，并继承 GroupBase 的标题、按钮、布局、状态和 `descriptionsProps`。当前页签隐藏后，组件会选择下一个可用页签。

## Collapse

```ts
const activePanel = ref('base')

{
  type: 'Collapse',
  title: '更多信息',
  activeKey: activePanel,
  attrs: { accordion: true },
  subItems: [
    {
      label: '基本信息',
      key: 'base',
      icon: 'info',
      buttons: { actions: [{ label: '刷新', onClick: refresh }] },
      subItems: [],
    },
  ],
}
```

根 `activeKey` 可为字符串或 Ref；根 `title` 是折叠组标题。CollapseItem 必填 `label`、`subItems`，可配置 `key`、`icon`、`buttons` 及 GroupBase 的状态与布局。面板 hidden 时不渲染，disabled 时不可展开；只读模式不显示面板操作按钮。

## Descriptions

Descriptions 在其他 Schema 中嵌入只读信息；独立详情页面优先 SuperDetail。

```ts
{
  type: 'Descriptions',
  title: '审批信息',
  dataSource: approvalRecord,
  mode: 'table',
  isContainer: false,
  attrs: {
    bordered: true,
    column: 2,
    labelAlign: 'right',
    tableLayout: 'fixed',
    noInput: true,
  },
  buttons: {
    visibleIn: 'detail',
    actions: [{ label: '查看日志', onClick: showLogs }],
  },
  subItems: [],
}
```

| 属性          | 类型            | 默认值      | 说明                                      |
| ------------- | --------------- | ----------- | ----------------------------------------- |
| `title`       | string/function | —           | 详情区标题                                |
| `dataSource`  | object/Ref      | 当前上下文  | 独立只读对象                              |
| `buttons`     | array/object    | —           | 详情操作按钮                              |
| `mode`        | string          | `'default'` | `default`、`table`、`form`                |
| `attrs`       | object          | `{}`        | ExtDescriptionsProps 与 DescriptionsProps |
| `isContainer` | boolean         | `false`     | 是否使用页面容器样式                      |
| `subItems`    | array           | 必填        | 详情字段                                  |
| `subSpan`     | number/string   | `12`        | 详情项默认栅格                            |
| `gutter`      | number          | `16`        | 详情栅格间距                              |
| `rowProps`    | object          | `{}`        | 详情 Row 属性                             |

`attrs.wrapperCol`、`labelCol`、`labelAlign`、`tableLayout`、`noInput`、`span` 的差异见[详情 SuperDetail](/manual/super-detail#extdescriptionsprops-细节)。

## 布局选择

| 需求                  | 容器         |
| --------------------- | ------------ |
| 普通分组、可换包装    | Group        |
| 无 DOM 外壳的逻辑复用 | Fragment     |
| 明确卡片视觉层级      | Card         |
| 同级内容切换          | Tabs         |
| 内容折叠展开          | Collapse     |
| 嵌入只读信息          | Descriptions |

完整组合见[布局容器示例](/examples?example=containers)。
