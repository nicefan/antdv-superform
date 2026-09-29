# 表格 SuperTable

SuperTable 在字段级 Table 容器之上增加独立数据源、查询表单、请求生命周期、分页和页面级动作。SuperTable 管“数据从哪里来、何时查询”；Table 管“列怎样显示和编辑”。

<span id="配置与数据"></span>

## useTable：基本用法 {#基本使用}

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
    { field: "status", label: "状态", type: "Select", options: { dictName: "status" } },
  ],
});
</script>
```

`useTable` 的 Schema 可以是对象、函数或异步函数；第二参数可传本地数组或 Ref。

## 根 Schema 配置 {#根配置总览}

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
| 高度策略                     | number/string/boolean | 未设置 | `maxHeight`、`fixedHeight`、`heightOffset`；外观容器使用 `isContainer` |
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

## 远程与本地数据 {#远程与本地数据对比}

### apis.query：远程数据 {#远程查询}

```ts
{
  pagination: { current: 1, pageSize: 20 },
  apis: {
    query: (params, { signal }) => api.page(params, { signal }),
  },
}
```

配置 `apis.query` 后，初始化、分页、查询条件和公开刷新动作都进入统一请求入口。新请求会取消前一次请求，并只允许最后一次响应更新表格。

### dataSource：本地数组 {#本地数组}

```ts
const rows = ref([{ id: 1, name: "本地记录" }]);
const [register, table] = useTable({ attrs: { rowKey: "id" }, columns }, rows);
```

也可以使用根 `dataSource` 或 `table.setData(rows)`。本地模式不会自动执行后端分页。

## apis：查询与 CRUD {#apis-完整契约}

| 属性     | 类型     | 默认值 | 调用形式               | 用途               |
| -------- | -------- | ------ | ---------------------- | ------------------ |
| `query`  | function | —      | `(params, { signal })` | 查询数据           |
| `info`   | function | —      | `(rowKeyValue, row)`   | 弹窗编辑前读取详情 |
| `save`   | function | —      | `(newData)`            | 新增               |
| `update` | function | —      | `(updatedData)`        | 更新               |
| `delete` | function | —      | `(keys, rows)`         | 删除选择行或当前行 |

弹窗编辑按“当前行 → 可选 `info` 结果 → `resetData`”合并。保存、更新、删除成功后调用 `reload()` 保留当前分页刷新。接口适配示例见[接口与数据适配](/manual/backend-contracts#tableapis-crud)。

<span id="查询与搜索"></span>

## 查询参数与转换 {#查询参数与转换}

`params` 用于提供搜索表单之外的查询条件，例如租户、业务状态或当前选中的部门。固定条件可以直接传值；需要随外部状态更新时，可以使用 Ref、computed 或 reactive 对象中的响应式属性。动态参数变化后，表格会自动回到第一页查询。

`params` 持续参与后续请求；只想为单次查询补充条件时，使用 `query(tempParams)`。

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
- `query(tempParams)` 的临时参数只作用于本次请求，不会永久保存。
- `getQueryParams()` 只返回搜索数据与 `params`，不含分页和上次临时参数。

### 场景示例：主从表联动 {#主从表联动-外部状态驱动-params}

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

`immediate: false` 关闭右表首次自动查询。左表选择部门后更新 `departmentId`，右表随动态参数变化回到第一页查询，因此选择事件只需更新数据，无需再调用 `query()`。

可运行代码见[主从表联动](/examples?example=table-master-detail)。

## searchForm：搜索表单 {#搜索表单}

### searchForm.subItems：复用列作为查询字段 {#复用列}

```ts
searchForm: {
  subItems: ['name', 'status'],
}
```

字符串会复制同名列，移除列的 `span`、`disabled`、`hidden` 并转为可编辑查询字段。列未声明 `type` 时查询项默认使用 Input。

### searchForm：独立配置查询字段 {#独立查询字段}

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

## 手动与即时查询 {#查询触发方式怎么选}

查询表单有三种常用触发策略。它们共享同一套参数合并和请求竞态控制，但交互意图不同。

### 手动查询：提交搜索条件后请求 {#手动查询-默认策略}

```ts
searchForm: {
  subItems: ['keyword', 'status'],
}
```

未配置 `searchOnChange` 时，查询表单默认生成“查询”和“重置”按钮。用户可以连续调整多个条件，最后一次性提交，适合字段较多、接口成本较高或需要明确查询动作的页面。

### 全量即时查询：搜索字段变化后请求 {#全量即时查询-任意查询字段变化即刷新}

```ts
searchForm: {
  searchOnChange: true,
  subItems: [
    { type: 'Input', field: 'keyword', label: '关键词' },
    {
      type: 'Select',
      field: 'status',
      label: '状态',
      options: {
        source: [
          { label: '启用', value: 1 },
          { label: '停用', value: 0 },
        ],
      },
    },
  ],
}
```

开启后不自动生成“查询”和“重置”按钮，搜索模型变化会触发查询。内部自动查询使用约 300ms 的尾部节流，同一窗口内只执行最后一次，适合轻量筛选器和数据量可控的即时反馈页面。Input 每次输入都会进入触发链路；接口成本较高时应保留手动查询，或改用只让选择项即时生效的混合策略。

可运行代码见[查询条件即时生效](/examples?example=table-search-on-change)。

### 混合查询：文本提交与选择项即时生效 {#混合查询-文本手动提交-选择项即时生效}

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
        options: {
          source: [
            { label: "启用", value: 1 },
            { label: "停用", value: 0 },
          ],
        },
      },
    ],
  },
  columns,
});
```

选择字段通过 `value` 与 `params` 中的同一 Ref 双向绑定：选择变化会更新动态参数并自动查询；普通 Input 仍等待用户点击“查询”。这比同时开启 `searchOnChange` 更精确，也避免同一个选择值从搜索模型和动态参数产生两条重复触发链路。

可运行代码见[手动与即时混合查询](/examples?example=table-mixed-query)。

## 分页与请求动作 {#分页与请求动作}

两套 UI 支持 `pagination.placement` 数组：`topStart`、`topCenter`、`topEnd`、`bottomStart`、`bottomCenter`、`bottomEnd`，默认 `['bottomEnd']`；`['none']` 隐藏分页。每个方向最多一组，如 `['topEnd', 'bottomEnd']` 显示同步的上下分页。Element Plus 分页与表格间距为 16px。

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

## tabs：标签筛选 {#tabs-标签筛选}

```ts
tabs: {
  field: 'status',
  initialValue: 'all',
  bordered: true,
  options: {
    source: [
      { label: '全部', value: 'all' },
      { label: '启用', value: 'enabled' },
    ],
  },
  activeKey: statusTab,
  customTab: ({ option }) => option.label,
  slots: {},
}
```

`tabs.options` 使用同一 OptionsConfig，可配置 `source`、`dictName`、`labelAsValue` 等；`activeKey` 可与外部 Ref 双向控制。设置 `tabs: false` 关闭。

<span id="列与编辑"></span>

## 列、选择与展开 {#列、选择与展开}

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

## 编辑与弹窗配置 {#编辑与弹窗属性}

编辑能力来自底层 Table，完整配置见[数组容器：Table](/manual/fields/table#table-数组容器)。根级 `modalProps` 配置编辑弹窗，`descriptionsProps.modalProps` 配置详情弹窗；编辑弹窗优先集中配置在 `rowEditor.modalProps`。

<span id="布局与高度"></span>

## 容器与高度配置 {#页面容器与高度策略}

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

| 属性 | 类型 | 默认值 | 作用 |
| --- | --- | --- | --- |
| `maxHeight` | `number \| 'viewport' \| 'parent'` | 未设置 | 内容滚动区域的高度上限，或高度的计算来源 |
| `fixedHeight` | boolean | 未设置 | 为 `true` 时保留指定或计算出的高度，内容较少也不收缩 |
| `heightOffset` | number | 未设置 | `viewport` / `parent` 模式额外扣除的底部空间，单位 px |

未配置 `maxHeight` 时按内容自然布局，不自动限制到视口或父容器。`fixedHeight`、`heightOffset` 单独配置不启用高度计算。需要直接控制原生表格滚动时，可以使用 `attrs.scroll`。

高度属性建议写在 Schema 根级，也支持写入 `attrs` 或通过 `defaultProps.Table` 统一配置；根级值优先。`isContainer` 只控制外观与间距，不启用高度约束。

### 根据视口剩余空间计算

```ts
{
  maxHeight: 'viewport',
  fixedHeight: true,
  heightOffset: 24,
  columns,
}
```

从表格当前位置到视口底部计算剩余空间，扣除外层底部间距、查询区等已占据的位置、表头、标题、页脚、下方分页和 `heightOffset` 后，得到内容区域高度上限。`viewport` 不是把整个视口高度直接赋给表格。内容不足时是否保留空白由 `fixedHeight` 控制。

窗口、容器和数据变化会触发重算；业务改变外围布局后也可调用 `table.redoHeight()`。

### 根据父容器剩余空间计算

```vue
<template>
  <section class="workspace">
    <SuperTable @register="register" />
  </section>
</template>

<script setup lang="ts">
const [register] = useTable({
  maxHeight: 'parent',
  fixedHeight: true,
  apis: { query: api.page },
  columns,
});
</script>

<style scoped>
.workspace {
  height: 480px;
  overflow: hidden;
}
</style>
```

父容器必须具有明确的可用高度，也可以由 Flex 布局分配，并设置 `min-height: 0` 以允许收缩。表格读取父元素内容区底边，扣除表格上方及非内容区域的占用；父元素尺寸变化时自动重算。不需要给 SuperTable 自身设置固定高度。

### 自定义内容区域高度上限

```ts
{
  maxHeight: 360,
  columns,
}
```

数字 `maxHeight` 直接表示内容滚动区域高度上限，单位 px，不包含查询区、标题、表头、页脚和分页。内容超过上限时内部滚动，内容较少时自然收缩。`heightOffset` 不影响数字模式。

### 固定高度

```ts
{ maxHeight: 360, fixedHeight: true, columns }
{ maxHeight: 'viewport', fixedHeight: true, columns }
{ maxHeight: 'parent', fixedHeight: true, columns }
```

`fixedHeight: true` 配合任一 `maxHeight` 模式使用，少量数据或空数据时也保留相应高度，分页跟随固定区域排列。关闭 `fixedHeight` 后恢复按内容收缩；将 `maxHeight` 清为 `undefined` 后移除高度约束并恢复原生 `attrs.scroll`。

### 项目级高度配置

```ts
import superForm from 'superform-antdv';

superForm.configure({
  defaultProps: {
    Table: {
      maxHeight: 'viewport',
      fixedHeight: true,
      heightOffset: 24,
    },
  },
});
```

库不设置默认高度策略。项目需要统一页面布局时再显式配置；个别表格可在 Schema 根级用 `fixedHeight: false`、`heightOffset: 0` 覆盖，或显式设置 `maxHeight: undefined` 恢复自然高度。

<span id="动作与状态"></span>

## 表格动作与状态 {#usetable-动作与状态}

`query`、`reload`、`goPage` 会等待组件注册，并返回请求 Promise。

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
