# 场景差异配置

同一份字段配置在表单、表格、详情三个场景下，会有不同的附加配置。理解这一点，比单独记字段更重要。

## 总体原则

一个字段节点通常有三层配置：

1. 通用层：无论在哪个场景都生效
2. 底层组件层：通过 `attrs` 传给实际组件
3. 场景层：只在表单、表格或详情中生效

## 通用层

这些字段通常跨场景都有效：

- `type`
- `field`
- `label`
- `rules`
- `hidden`
- `disabled`
- `computed`
- `viewRender`
- `span`
- `colProps`
- `slots`

## 表单场景

表单显示时，重点关注这些配置：

- `attrs`
  - 透传给底层输入组件
  - 例如 `InputProps`、`SelectProps`、`TreeSelectProps`
- `formItemProps`
  - 对应当前字段外层 `Form.Item` 的配置
  - 例如 `labelCol`、`wrapperCol`、`extra`、`validateStatus`
- `span`
  - 当前字段自身占用的栅格宽度
- `colProps`
  - 外层 `Col` 的配置
- `editable`
  - 某些场景下控制当前字段是否进入编辑态

## 表格场景

字段被用于表格列时，重点关注：

- `columnProps`
  - 对应当前字段映射成表格列时的 `TableColumnProps`
  - 例如 `width`、`align`、`ellipsis`
- `viewRender`
  - 表格查看态单元格渲染
- `editable`
  - 当前列在编辑模式下是否可编辑
- `exclude: ['table']`
  - 排除在表格中显示

### `columnProps` 与 `option.columnProps`

- 字段级 `columnProps`：只作用于当前列
- 表格级 `columnProps`：作为整张表所有列的默认列配置

字段级优先级更高。

## 详情场景

字段用于详情显示时，重点关注：

- `descriptionsProps`
  - 对应详情模式下当前项的描述布局配置
  - 例如 `span`、`labelCol`、`wrapperCol`、`mode`
- `viewRender`
  - 查看态渲染
- `labelField`
  - 某些选择类字段用于显示标签文本
  - 典型场景是 `deptId + deptName` 这类 id/名称双字段同步
- `exclude: ['description']`
  - 排除在详情中显示

## 对照表

### 字段级差异配置

- `attrs`
  - 表单：输入组件 props
  - 表格：主要在编辑态输入组件中参与
  - 详情：通常不直接主导最终展示

- `formItemProps`
  - 表单：当前表单项的 `Form.Item` 配置
  - 表格：通常无效
  - 详情：部分字段会被合并进描述布局

- `columnProps`
  - 表单：无效
  - 表格：当前列 `TableColumnProps`
  - 详情：无效

- `descriptionsProps`
  - 表单：可用于按详情样式局部显示
  - 表格：常用于表格详情弹窗或子表说明
  - 详情：当前项或容器在详情模式下的配置核心

- `labelField`
  - 表单：编辑时会把选择结果的显示名称同步到 `labelField`
  - 表格：查看态优先显示 `labelField` 对应字段，而不是原始 id
  - 详情：查看态优先显示 `labelField` 对应字段

## 容器级差异配置

### `Form.attrs`

- 对应：`FormProps`
- 用于整个表单容器

### `Table.attrs`

- 对应：`TableProps`
- 另外增强了：
  - `defaultExpandLevel`
  - `rowSelection`

### `rowEditor`

`rowEditor` 是表格编辑行为的核心配置，主要控制：

- `editMode: 'inline' | 'modal'`
- `addMode: 'inline' | 'modal'`
- `form`
- `modalProps`
- `onSave`
- `onCancel`

当 `addMode` 或 `editMode` 为 `modal` 时：

- 表格会尝试把 `columns` 自动转换成表单 `subItems`
- 再与 `rowEditor.form` 合并，生成新增/编辑弹窗
- `addMode` 不配置时，默认跟随 `editMode`
- 若配置了 `apis.save` / `apis.update`，保存时会调用对应接口，并在成功后刷新表格

也就是说，`rowEditor.form` 更像是“对自动生成表单的补充配置”，而不是必须完整重写一份表单。

### `editable`

表格编辑还支持顶级 `editable` 和字段级 `editable`：

- 顶级 `editable` 开启时，表格整体进入可编辑状态
- 子字段可通过 `editable: false` 关闭编辑
- 顶级 `editable` 未开启时，字段仍可单独配置 `editable: true`
- 字段级编辑通常用于开关切换、状态维护等轻量操作

### `Descriptions.attrs`

- 对应：`ExtDescriptionsProps`
- 主要用于详情布局控制

## `subSpan` 与 `span`

这是最容易混淆的一组配置。

- `subSpan`
  - 容器级默认宽度
  - 会向子级继承
- `span`
  - 字段级最终宽度
  - 优先级高于继承下来的 `subSpan`

推荐理解为：

```txt
容器负责给默认值，字段负责给最终值
```

## 推荐写法

```ts
{
  type: 'Group',
  title: '基础信息',
  subSpan: 12,
  subItems: [
    {
      type: 'Input',
      field: 'name',
      label: '姓名',
      formItemProps: {
        required: true,
      },
    },
    {
      type: 'Select',
      field: 'deptId',
      labelField: 'deptName',
      label: '部门',
      options: async () => [],
      columnProps: {
        width: 200,
      },
    },
    {
      type: 'Input',
      field: 'memo',
      label: '备注',
      span: 24,
      descriptionsProps: {
        span: 2,
      },
    },
  ],
}
```

这里的含义是：

- 表单中，`deptId` 编辑时渲染为选择框，并同步保存 `deptId` 和 `deptName`
- 表格和详情中，`deptId` 优先显示 `deptName`
- `memo` 在表单中占满一整行，详情中描述跨度单独配置
