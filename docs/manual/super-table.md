# 表格 SuperTable

SuperTable 在字段级 Table 容器之上增加独立数据源、查询表单、请求生命周期、分页和页面级动作。SuperTable 管“数据从哪里来、何时查询”；Table 管“列怎样显示和编辑”。

## 基本使用

```vue
<template>
  <SuperTable @register="register" />
</template>

<script setup lang="ts">
import { SuperTable, useTable } from "superform-antdv";

const [register, table] = useTable({
  isContainer: true,
  pagination: { pageSize: 20 },
  attrs: { rowKey: "userId" },
  apis: { query: api.page },
  columns: [
    { field: "name", label: "姓名" },
    { field: "status", label: "状态", type: "Select", dictName: "status" },
  ],
});
</script>
```

`useTable` 的 Schema 可以是对象、函数或异步函数；第二参数可传本地数组或 Ref。

## 根配置总览

推荐按职责而不是字母顺序组织配置。不存在的分组直接省略，不需要用空对象占位：

```text
顶层单属性
→ attrs
→ apis
→ params
→ beforeQuery / afterQuery
→ on* 事件
→ searchForm
→ rowEditor
→ buttons
→ rowButtons
→ tabs
→ columnProps
→ columns
```

“顶层单属性”包括 `title`、`dataSource`、`immediate`、`pagination`、`editable`、`indexColumn` 及高度策略等独立值。将请求入口、动态参数和请求转换连续放置，能直接读出完整数据链路；把 `columns` 固定在最后，较长的列定义不会打断页面行为配置。

| 属性                         | 类型                 | 默认值     | 作用                                                                                               |
| ---------------------------- | -------------------- | ---------- | -------------------------------------------------------------------------------------------------- |
| `title`                      | string/function      | —          | 表格标题                                                                                           |
| `dataSource`                 | array/Ref            | `[]`       | 本地数据源                                                                                         |
| `immediate`                  | boolean              | `true`     | 是否首次自动查询                                                                                   |
| `pagination`                 | boolean/object       | 标准分页   | `false` 关闭分页，object 用于自定义分页                                                            |
| `editable`                   | boolean/function     | `false`    | 整表编辑状态                                                                                       |
| `indexColumn`                | boolean/object       | `false`    | 序号列                                                                                             |
| 高度策略                     | boolean/number       | 见高度章节 | `isContainer`、`isScanHeight`、`inheritHeight`、`maxHeight`、`isFixedHeight`、`resizeHeightOffset` |
| `attrs`                      | object               | `{}`       | Ant Design Vue Table 属性                                                                          |
| `apis`                       | object               | `{}`       | 查询、详情、保存、更新、删除接口                                                                   |
| `params`                     | object/Ref           | `{}`       | 响应式附加查询参数                                                                                 |
| `beforeQuery` / `afterQuery` | function             | —          | 请求前后转换                                                                                       |
| `on*`                        | function             | —          | `onLoaded` 等表格事件                                                                              |
| `searchForm`                 | object               | —          | 查询表单配置                                                                                       |
| `rowEditor`                  | object               | —          | 行内或弹窗编辑配置                                                                                 |
| `buttons` / `rowButtons`     | array/object/boolean | —          | 工具栏与操作列                                                                                     |
| `tabs`                       | object/boolean       | —          | 表格顶部标签筛选                                                                                   |
| `columnProps`                | object               | `{}`       | 所有列的公共属性                                                                                   |
| `columns`                    | array                | 必填       | 表格列，未声明 `type` 时为只读文本列                                                               |

## 远程与本地数据对比

### 远程查询

```ts
{
  pagination: { current: 1, pageSize: 20 },
  apis: {
    query: (params, { signal }) => api.page(params, { signal }),
  },
}
```

配置 `apis.query` 后，初始化、分页、查询条件和公开刷新动作都进入统一请求入口。新请求会取消旧请求，并只允许最后一次响应更新表格。

### 本地数组

```ts
const rows = ref([{ id: 1, name: "本地记录" }]);
const [register, table] = useTable({ attrs: { rowKey: "id" }, columns }, rows);
```

也可以使用根 `dataSource` 或 `table.setData(rows)`。本地模式不会自动执行后端分页。

## apis 完整契约

| 属性     | 类型     | 默认值 | 调用形式               | 用途               |
| -------- | -------- | ------ | ---------------------- | ------------------ |
| `query`  | function | —      | `(params, { signal })` | 查询数据           |
| `info`   | function | —      | `(rowKeyValue, row)`   | 弹窗编辑前读取详情 |
| `save`   | function | —      | `(newData)`            | 新增               |
| `update` | function | —      | `(updatedData)`        | 更新               |
| `delete` | function | —      | `(keys, rows)`         | 删除选择行或当前行 |

接口适配见[接口与数据适配](/manual/backend-contracts)。

## 查询参数与转换

参数合并顺序，右侧覆盖左侧：

```text
分页参数 → searchForm 数据 → params → query(tempParams)
```

```ts
{
  params: {
    tenantId: currentTenantId, // Ref/computed 会自动解包并触发查询
  },
  beforeQuery(params) {
    return { ...params, keyword: params.keyword?.trim() }
  },
  afterQuery(result) {
    return {
      current: result.pageNum,
      size: result.pageSize,
      total: result.totalCount,
      records: result.list,
    }
  },
  onLoaded(result) {
    console.log('表格已更新', result)
  },
}
```

- `beforeQuery` 不返回值时继续使用原参数，返回对象时以新对象请求。
- `afterQuery` 适合当前接口；全局统一响应使用 `tableApiSetting.resultTransform`。
- 响应可直接是数组，或 `{ current, size, total, records }`。
- `getQueryParams()` 只返回搜索数据与 `params`，不含分页和上次临时参数。

## 搜索表单

### 复用列

```ts
searchForm: {
  subItems: ['name', 'status'],
}
```

字符串会复制同名列，移除列的 `span`、`disabled`、`hidden` 并转为可编辑查询字段。列未声明 `type` 时查询项默认使用 Input。

### 独立查询字段

```ts
searchForm: {
  subSpan: 'auto',
  limit: 4, // 默认展示前 4 项，其余条件由“展开/收起”按钮控制
  teleport: '#table-search-area', // 可选：把查询表单渲染到页面指定区域
  searchOnChange: false, // 默认值；保留“查询”和“重置”按钮
  subItems: [
    {
      type: 'DateRangePicker',
      field: 'startDate',
      endField: 'endDate', // 起止日期分别绑定到两个字段
      label: '创建时间',
    },
  ],
}
```

| 属性             | 类型                               | 默认值  | 行为                                                |
| ---------------- | ---------------------------------- | ------- | --------------------------------------------------- |
| `subItems`       | array                              | 必填    | 字段 Schema 或列字段名                              |
| `searchOnChange` | boolean                            | `false` | 搜索模型变化后自动查询                              |
| `limit`          | number                             | —       | 超出数量的条件折叠                                  |
| `teleport`       | string                             | —       | 将搜索表单传送到 CSS 选择器目标                     |
| 其他 Form 属性   | string/number/boolean/object/array | 继承    | `subSpan`、`attrs`、`buttons`、`compact` 等继续有效 |

### 查询触发方式怎么选

查询表单有三种常用触发策略。它们共享同一套参数合并和请求竞态控制，但交互意图不同。

#### 手动查询：默认策略

```ts
searchForm: {
  subItems: ['keyword', 'status'],
}
```

未配置 `searchOnChange` 时，查询表单默认生成“查询”和“重置”按钮。用户可以连续调整多个条件，最后一次性提交，适合字段较多、接口成本较高或需要明确查询动作的页面。

#### 全量即时查询：任意查询字段变化即刷新

```ts
searchForm: {
  searchOnChange: true,
  subItems: [
    { type: 'Input', field: 'keyword', label: '关键词' },
    {
      type: 'Select',
      field: 'status',
      label: '状态',
      options: [
        { label: '启用', value: 1 },
        { label: '停用', value: 0 },
      ],
    },
  ],
}
```

开启后不再自动生成“查询”和“重置”按钮，搜索模型变化会触发查询。内部自动查询使用约 300ms 的尾部节流，同一窗口内只执行最后一次，适合轻量筛选器和数据量可控的即时反馈页面。Input 每次输入都会进入触发链路；接口成本较高时应保留手动查询，或改用只让选择项即时生效的混合策略。

可运行代码见[查询条件即时生效](/examples?example=table-search-on-change)。

#### 混合查询：文本手动提交，选择项即时生效

```ts
import { reactive, toRef } from "vue";

const filterState = reactive<{ status?: number }>({});
const status = toRef(filterState, "status");

const [register] = useTable({
  apis: { query: api.page },
  params: { status },
  searchForm: {
    // 不开启 searchOnChange，因此仍保留查询、重置按钮
    subItems: [
      { type: "Input", field: "keyword", label: "关键词" },
      {
        type: "Select",
        field: "status",
        label: "状态",
        value: status,
        options: [
          { label: "启用", value: 1 },
          { label: "停用", value: 0 },
        ],
      },
    ],
  },
  columns,
});
```

选择字段通过 `value` 与 `params` 中的同一 Ref 双向绑定：选择变化会更新动态参数并自动查询；普通 Input 仍等待用户点击“查询”。这比同时开启 `searchOnChange` 更精确，也避免同一个选择值从搜索模型和动态参数产生两条重复触发链路。

可运行代码见[手动与即时混合查询](/examples?example=table-mixed-query)。

### 主从表联动：外部状态驱动 params

```ts
import { ref } from "vue";

const departmentId = ref<number>();

const [registerDetail] = useTable({
  immediate: false,
  attrs: { rowKey: "userId" },
  apis: { query: api.queryUsers },
  params: { departmentId },
  columns: userColumns,
});

// 左表选择部门时执行
function selectDepartment(record: { departmentId: number }) {
  departmentId.value = record.departmentId;
}
```

`immediate: false` 阻止右表在必要条件为空时首次查询。左表选择记录后更新 `departmentId`，右表监听到 `params` 变化，会自动回到第一页查询。`params` 可以包含 Ref、computed，或 reactive 对象中的响应式属性；不要在点击事件中重复调用 `query()`。

可运行代码见[主从表联动](/examples?example=table-master-detail)。

## 分页与请求动作

```ts
pagination: false // 显式关闭分页

pagination: {
  current: 1,
  pageSize: 20,
  showSizeChanger: true,
}
```

省略 `pagination` 时启用标准分页，初始页为 `1`、每页 `10` 条。不分页写 `pagination: false`，分页策略有业务差异时传入配置对象。默认请求字段为 `current` 和 `size`；可在全局 `tableApiSetting` 改名。

| 动作                     | 页码       | 参数               | 返回         |
| ------------------------ | ---------- | ------------------ | ------------ |
| `query(temp?)`           | 回到第一页 | 临时参数只作用本次 | 请求 Promise |
| `reload()`               | 保留当前页 | 当前搜索与动态参数 | 请求 Promise |
| `goPage(page)`           | 切换指定页 | 当前搜索与动态参数 | 请求 Promise |
| `resetSearchForm(data?)` | 回到第一页 | 重置后的搜索数据   | 发起查询     |

## 列、选择与展开

```ts
{
  attrs: {
    rowKey: 'userId',
    rowSelection: {},
    defaultExpandLevel: 2,
  },
  columnProps: { ellipsis: true },
  indexColumn: { title: '序号', width: 72 },
}
```

- `attrs.rowKey` 应使用稳定业务主键，默认读取 `id`。
- `rowSelection: {}` 开启选择；`false` 或省略关闭。
- `defaultExpandLevel` 为数字时展开指定层级，`'all'` 展开全部。
- `columnProps` 提供所有列的默认 TableColumnProps，单列 `columnProps` 可覆盖。
- `indexColumn: true` 使用默认序号列，对象形式用于定制。

## tabs 标签筛选

```ts
tabs: {
  field: 'status',
  initialValue: 'all',
  bordered: true,
  options: [
    { label: '全部', value: 'all' },
    { label: '启用', value: 'enabled' },
  ],
  activeKey: statusTab,
  customTab: ({ option }) => option.label,
  slots: {},
}
```

`options` 也支持 `dictName`、`labelAsValue`；`activeKey` 可与外部 Ref 双向控制。设置 `tabs: false` 关闭。

## 编辑与弹窗属性

编辑能力来自底层 Table，完整配置见[数组与表格：Table](/manual/fields/collections#table-数组容器)。根级 `modalProps` 配置编辑弹窗，`descriptionsProps.modalProps` 配置详情弹窗；编辑弹窗优先集中配置在 `rowEditor.modalProps`。

## 页面容器与高度策略

这些配置描述 SuperTable 在页面中的占位方式，应写在表格 Schema 根级；`attrs` 只放 Ant Design Vue Table 属性。先根据页面结构选择一种主要高度策略，再决定是否需要固定表格区域。

### 容器模式 `isContainer`

```ts
{
  isContainer: true,
  searchForm: { subItems: ['keyword', 'status'] },
  columns,
}
```

`isContainer` 默认 `false`。开启后根节点增加 `.sup-container`：查询表单和表格主体仍是两个 `.sup-form-section`，并获得独立的白色背景、16px 内边距和区块间距，适合占据页面主体的独立列表页。

业务主题可覆盖这些稳定类名：

```css
.user-list .sup-container > .sup-form-section {
  padding: 20px;
  background: var(--page-panel-bg);
}

.user-list .sup-table-search {
  margin-bottom: 12px;
}
```

嵌入 Card、弹窗或已有面板时通常保持 `false`，避免重复背景和内边距。

### 高度配置总览

| 属性                 | 类型    | 默认值  | 实际控制范围                                         | 典型场景                 |
| -------------------- | ------- | ------- | ---------------------------------------------------- | ------------------------ |
| `isScanHeight`       | boolean | `true`  | 从表格位置计算到视口底部的剩余高度                   | 独立列表页、页面最后区域 |
| `inheritHeight`      | boolean | `false` | 从父容器取得可用高度                                 | Flex、Tabs 内部填充      |
| `maxHeight`          | number  | —       | 当前实现中作为表格行滚动区域的最大高度               | 页面上下还有其他内容     |
| `isFixedHeight`      | boolean | `false` | 固定表格外观高度，数据较少时保留空白，分页保持在底部 | 多个列表对齐、固定工作区 |
| `resizeHeightOffset` | number  | `0`     | 在自动计算结果上额外扣除的底部距离                   | 页脚、底部安全间距       |

> `isFixedHeight: true` 和 `resizeHeightOffset: 36` 是常见的业务推荐值，但不是当前源码内置默认值。项目希望所有列表保持一致时，可通过全局 `defaultProps.Table` 统一设置。

### 自动填满到窗口底部

```ts
{
  isContainer: true,
  // isScanHeight 默认 true，满足需求时可以省略
  resizeHeightOffset: 36,
  columns,
}
```

自动高度从表格顶部位置计算到视口底部的距离，扣除外层底部 margin/padding、分页、表头、标题和 `resizeHeightOffset` 后，将剩余空间交给表格行区域滚动。它适合 SuperTable 位于独立页面主体或页面最后一个区块的情况。

页面结构变化、数据变化、展开行变化和窗口尺寸变化都会触发重新计算；业务代码改变外围布局后，也可调用 `table.redoHeight()`。

### 继承父容器高度

```vue
<template>
  <section class="workspace">
    <SuperTable @register="register" />
  </section>
</template>

<script setup lang="ts">
const [register] = useTable({
  inheritHeight: true,
  apis: { query: api.page },
  columns,
});
</script>

<style scoped>
.workspace {
  flex: 1;
  min-height: 0;
  overflow: hidden;
}
</style>
```

`inheritHeight` 适合 Flex 布局。父级除了 `flex: 1` 和 `overflow: hidden`，通常还要设置 `min-height: 0`，否则 Flex 子项可能无法收缩，最终仍把页面撑高。

### 限制滚动区域高度

```ts
{
  isScanHeight: false,
  maxHeight: 360,
  columns,
}
```

`maxHeight` 适合详情、图表和表格混排的页面。按当前实现，它直接作为表格行滚动区域高度，不包含查询表单、表头和分页；因此不要把它理解为整个 SuperTable 根节点的总高度。若业务需要整个组件严格限制在某个高度，应由外层容器控制，并结合 `inheritHeight`。

### 固定表格区域并将分页置底

```ts
{
  isFixedHeight: true,
  maxHeight: 360,
  columns,
}
```

开启 `isFixedHeight` 后，即使当前页数据较少，表格区域也保留计算高度；分页位于固定区域之后，多个并列表格或上下切换的数据集不会因行数变化产生跳动。它是高度策略的修饰项：需要配合默认开启的 `isScanHeight`、`inheritHeight` 或 `maxHeight` 使用，单独配置没有可计算的高度来源。

### 全局统一底部修正与固定高度

```ts
import superForm from "superform-antdv";

superForm.configure({
  defaultProps: {
    Table: {
      isFixedHeight: true,
      resizeHeightOffset: 36,
    },
  },
});
```

全局默认适合统一页面壳的底部留白。个别嵌入式表格仍可在 Schema 根级使用 `isFixedHeight: false`、`resizeHeightOffset: 0` 覆盖。

## useTable 动作与状态

| API                                                        | 说明                 |
| ---------------------------------------------------------- | -------------------- |
| `getTable()` / `tableRef`                                  | 获取内部动作实例     |
| `setData()` / `getData()` / `dataSource`                   | 本地数据读写         |
| `setColumns()`                                             | 替换列配置           |
| `selectedRows` / `selectedRowKeys` / `setSelectedRows()`   | 选择状态             |
| `expandedRowKeys` / `setExpandedRowKeys()` / `expandAll()` | 展开状态             |
| `add()` / `edit()` / `delete()` / `detail()`               | CRUD 动作            |
| `validate()`                                               | 整表编辑校验         |
| `redoHeight()`                                             | 重新计算高度         |
| `onLoaded(callback)`                                       | 动态注册加载完成回调 |
| `asyncCall()`                                              | 底层逃生口           |

可运行查询见[远程表格示例](/examples?example=table-query)，本地编辑见[Table 容器示例](/examples?example=table-local)。
