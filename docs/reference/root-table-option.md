# RootTableOption

`SuperTable` 是这个组件库的核心入口。它把：

- 表格
- 搜索表单
- 编辑表单
- 详情展示
- 按钮系统

整合在一套配置里，而这套顶层配置类型就是 `RootTableOption`。

源码上，`RootTableOption` 大致可以理解为：

```ts
RootTableOption =
  Omit<ExtTableOption, 'type' | 'field'>
  + TableScanHight
  + 表格根级查询/数据源配置
```

## 阅读方式

这一页只覆盖当前应使用的 `RootTableOption` 配置，不解释兼容层字段。

这一页按“顶层配置项”逐项列出：

- 配置项名称
- 作用
- 常见值
- 详细说明跳转

如果某个字段在源码里存在，但语义不够明确，我会标记为 `待补充`。

## 一、基础展示与结构

### `title`

- 类型：`VSlot`
- 作用：表格标题
- 说明：用于表格上方标题栏，也会影响部分详情弹窗标题生成
- 参考：
  - [SuperTable](/components/super-table)

### `tooltip`

- 类型：`VSlot | Tooltip 配置`
- 作用：标题旁的提示信息
- 说明：继承自基础 schema 配置
- 参考：
  - [Schema 总览](/reference/schema)

### `attrs`

- 类型：`TableProps & 扩展字段`
- 作用：透传给底层表格组件
- 常见配置：
  - `rowKey`
  - `bordered`
  - `scroll`
  - `pagination`
  - `rowSelection`
- 额外增强：
  - `defaultExpandLevel`
  - `rowSelection?: false | TableProps['rowSelection']`
- 参考：
  - [场景差异配置](/reference/context-props)

### `isContainer`

- 类型：`boolean`
- 作用：是否按容器块样式包裹表格
- 说明：影响外层区块结构与样式表现
- 参考：
  - [SuperTable](/components/super-table)

## 二、列配置

### `columns`

- 类型：`ExtColumnsItem[]`
- 作用：定义表格列，也是新增/编辑弹窗默认表单字段来源
- 说明：
  - 表格显示时映射为列
  - `modal` 编辑时会自动转换为表单 `subItems`
- 参考：
  - [字段类型](/reference/field-types)
  - [场景差异配置](/reference/context-props)
  - [SuperTable](/components/super-table)

### `columnProps`

- 类型：`TableColumnProps`
- 作用：整张表所有列的默认列配置
- 说明：
  - 字段级 `columnProps` 优先级更高
  - 常用于统一设置 `ellipsis`、`align`、`width`
- 参考：
  - [场景差异配置](/reference/context-props)

### `indexColumn`

- 类型：`boolean | TableColumnProps`
- 作用：是否显示序号列
- 说明：
  - `true` 时使用内置序号列
  - 对象时可覆盖序号列配置
- 参考：
  - [SuperTable](/components/super-table)

## 三、查询与数据源

### `apis`

- 类型：`TableApis | TableApis['query']`
- 作用：定义表格的业务接口
- 内置支持：
  - `query`
  - `info`
  - `save`
  - `update`
  - `delete`
  - `export`
- 说明：
  - `query` 用于列表查询
  - `info` 用于编辑/详情前读取单条详情
  - `save` / `update` / `delete` 供内置动作使用
- 参考：
  - [表格查询协议](/reference/table-query)
  - [SuperTable](/components/super-table)

### `dataSource`

- 类型：`Obj[] | Ref<any[]>`
- 作用：本地数据源
- 说明：
  - 可直接传数组
  - 也可传 `Ref`，表格内部会同步写回
- 参考：
  - [useTable](/components/use-table)

### `params`

- 类型：`Obj`
- 作用：动态查询参数
- 说明：
  - 会和分页参数、搜索表单参数一起合并到最终查询参数中
- 参考：
  - [表格查询协议](/reference/table-query)

### `immediate`

- 类型：`boolean`
- 作用：是否在初始化后立即查询
- 默认：`true`
- 参考：
  - [SuperTable](/components/super-table)

### `beforeQuery`

- 类型：`(data: Obj) => Obj | void`
- 作用：请求前加工查询参数
- 适合：
  - 重命名字段
  - 合并额外条件
  - 删除空值
- 参考：
  - [表格查询协议](/reference/table-query)

### `afterQuery`

- 类型：`(data: Obj) => Obj | void`
- 作用：请求后加工返回结果
- 适合：
  - 做局部结果适配
  - 对数据做轻量转换
- 参考：
  - [表格查询协议](/reference/table-query)

### `onLoaded`

- 类型：`Fn`
- 作用：查询完成后的回调
- 说明：会在列表数据装载完成后执行
- 参考：
  - [useTable](/components/use-table)

### `pagination`

- 类型：`PaginationProps | false`
- 作用：分页配置
- 说明：
  - `false` 时关闭分页
  - 否则使用分页配置并与查询逻辑联动
- 参考：
  - [表格查询协议](/reference/table-query)

## 四、搜索表单

### `searchForm`

- 类型：`Omit<ExtFormOption, 'subItems'> & { ... }`
- 作用：配置表格顶部搜索表单
- 必填核心字段：
  - `subItems`
- 扩展字段：
  - `searchOnChange`
  - `teleport`
  - `limit`
  - `advanced`
- 说明：
  - 本质上是一个被内嵌到表格中的 `Form`
  - `subItems` 支持字符串简写和完整字段配置
- 参考：
  - [SuperTable](/components/super-table)
  - [字段类型](/reference/field-types)

## 五、编辑能力

`SuperTable` 的编辑能力分三类：

- 行编辑：通过 `rowEditor` 控制，可选择弹窗模式或行内模式
- 全表编辑：通过顶级 `editable` 开启，整张表都进入编辑状态
- 字段级编辑：在单个 `columns` 项上配置 `editable`

### `editable`

- 类型：`boolean | Fn<boolean>`
- 作用：整表编辑模式
- 说明：
  - 顶级 `editable` 开启后，表格全部字段默认进入可编辑状态
  - 子元素可单独配置 `editable: false` 关闭某一列编辑
  - 适合整张表作为一个可编辑表格的场景
- 参考：
  - [SuperTable](/components/super-table)

### `rowEditor`

- 类型：对象
- 作用：控制新增/编辑使用行内模式还是弹窗模式
- 子项：
  - `editMode?: 'inline' | 'modal'`
  - `addMode?: 'inline' | 'modal'`
  - `form?`
  - `modalProps?`
  - `onSave?`
  - `onCancel?`
- 说明：
  - `editMode` 控制编辑动作使用弹窗还是行内编辑
  - `addMode` 控制新增动作使用弹窗还是行内编辑
  - `addMode` 不配置时，默认跟随 `editMode`
  - `modal` 模式下，`columns` 会自动转换成表单 `subItems`
  - 自动生成的 `subItems` 会再与 `rowEditor.form` 合并生成弹窗表单
  - 如果 `apis.save` / `apis.update` 存在，保存时会调用对应接口，并在成功后刷新表格
- 参考：
  - [SuperTable](/components/super-table)
  - [场景差异配置](/reference/context-props)

### 字段级 `editable`

- 类型：`boolean | Fn<boolean>`
- 作用：控制单个列是否可编辑
- 说明：
  - 当顶级 `editable` 开启时，字段默认可编辑，除非字段配置 `editable: false`
  - 当顶级 `editable` 未开启时，字段仍可单独配置 `editable: true`
  - 单字段编辑常用于开关切换、状态维护等轻量操作

示例：

```ts
columns: [
  { type: 'Input', field: 'name', label: '名称', editable: false },
  { type: 'Switch', field: 'enabled', label: '启用', editable: true },
]
```

## 六、按钮系统

### `buttons`

- 类型：`ExtButtons<'add' | 'delete' | 'edit' | 'detail'> | false`
- 作用：表格顶部按钮区
- 内置动作：
  - `add`
  - `delete`
  - `edit`
  - `detail`
- 说明：
  - 可直接写字符串数组
  - 也可写对象式动作，接管内置行为
- 参考：
  - [SuperTable](/components/super-table)
  - [SuperButtons / useButtons](/components/buttons)

### `rowButtons`

- 类型：`false | ExtButtons<...> & { columnProps?: TableColumnProps }`
- 作用：行级按钮列
- 内置动作：
  - `add`
  - `edit`
  - `delete`
  - `detail`
- 说明：
  - `columnProps` 用于当前操作列本身
  - 可通过对象式动作获取 `effectData` 和 `action`
- 参考：
  - [SuperTable](/components/super-table)

## 七、详情与弹窗

### `modalProps`

- 类型：`ModalFuncProps | Obj`
- 作用：通用弹窗配置
- 说明：
  - 会影响编辑弹窗和部分详情弹窗
  - 与 `rowEditor.modalProps`、`descriptionsProps.modalProps` 可能叠加
- 状态：细粒度覆盖优先级 `待补充`
- 参考：
  - [useModal / useModalForm](/components/modal)

### `descriptionsProps`

- 类型：`ExtDescriptionsProps & { modalProps?: ModalFuncProps | Obj }`
- 作用：详情展示配置
- 用途：
  - 控制 `detail` 查看时的描述布局
  - 配合详情弹窗展示
- 参考：
  - [场景差异配置](/reference/context-props)
  - [SuperDetail](/components/super-detail)

## 八、Tabs 筛选

### `tabs`

- 类型：`TabsHeader | false`
- 作用：在表格上方生成基于 tabs 的筛选器
- 常见字段：
  - `field`
  - `options`
  - `dictName`
  - `valueToLabel`
  - `activeKey`
  - `customTab`
  - 以及 `TabsProps` 中除 `activeKey` 外的常见配置
- 说明：
  - 当配置了 `field` 时，切换 tabs 会把当前值写入查询参数并触发查询
- 参考：
  - [字段类型](/reference/field-types)
  - [表格查询协议](/reference/table-query)

## 九、高度与滚动

这些字段来自 `TableScanHight`。

### `maxHeight`

- 类型：`number`
- 作用：表格最大高度
- 说明：与自动滚动高度计算相关

### `isScanHeight`

- 类型：`boolean`
- 作用：是否自动计算表格高度到底部
- 说明：默认语义为开启自动高度扫描

### `resizeHeightOffset`

- 类型：`number`
- 作用：高度补偿值
- 说明：用于在高度计算时做额外偏移
- 状态：更细粒度使用场景 `待补充`

### `isFixedHeight`

- 类型：`boolean`
- 作用：固定表格高度
- 说明：分页区域会跟随到底部
- 状态：详细交互效果 `待补充`

### `inheritHeight`

- 类型：`boolean`
- 作用：按父元素继承高度
- 说明：适合父级已有固定布局高度的场景

## 十、继承自基础 schema 的通用字段

`RootTableOption` 还继承了一些基础能力：

- `hidden`
- `disabled`
- `align`
- `slots`
- `viewRender`
- `on*` 事件扩展

这些字段在根级表格场景下不是最常用，但仍然存在。

参考：

- [Schema 总览](/reference/schema)

## 一个完整示例

```ts
defineTable({
  title: '用户列表',
  isContainer: true,
  attrs: {
    rowKey: 'id',
    bordered: true,
  },
  apis: {
    query: api.queryUsers,
    info: api.getUserInfo,
    save: api.createUser,
    update: api.updateUser,
    delete: api.deleteUsers,
  },
  params: {
    status: 1,
  },
  searchForm: {
    subItems: ['name', 'status'],
    buttons: ['search', 'reset'],
  },
  rowEditor: {
    addMode: 'modal',
    editMode: 'modal',
    form: {
      attrs: { layout: 'vertical' },
      subSpan: 12,
    },
  },
  buttons: ['add'],
  rowButtons: ['edit', 'delete', 'detail'],
  columns: [
    { type: 'Input', field: 'name', label: '姓名' },
    { type: 'Select', field: 'deptId', labelField: 'deptName', label: '部门' },
    { type: 'Switch', field: 'status', label: '状态' },
  ],
  descriptionsProps: {
    column: 2,
  },
  pagination: {
    pageSize: 10,
  },
})
```

## 待补充项汇总

以下配置项在源码中存在，但当前语义还需要进一步从行为层补全：

- `modalProps`、`rowEditor.modalProps`、`descriptionsProps.modalProps` 的叠加优先级
- `resizeHeightOffset` 的典型使用场景
- `isFixedHeight` 的完整布局表现
