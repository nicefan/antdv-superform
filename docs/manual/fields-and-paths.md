# 字段与数据路径

Schema 与数据模型是相辅相成的：Schema 决定模型应具备的结构，数据源提供当前业务值；模型变化又会驱动控件、校验、联动和只读展示。理解 `field`，就理解了整个系统的数据坐标。

## field 是模型中的地址

`field` 表示当前节点在所属模型中的存储路径，支持点路径：

```ts
{
  type: 'Input',
  field: 'profile.name',
  label: '姓名',
}
```

即使数据源最初是空对象，组件也会按 Schema 建立中间结构：

```ts
const dataSource = {
  profile: {
    name: undefined,
  },
}
```

因此 `field` 不只是取值表达式，它还参与：

- 建立初始模型结构。
- 生成 Ant Design Vue FormItem 的校验路径。
- 确定 `effectData.field` 和 `effectData.value`。
- 决定 `setFieldsValue`、`resetFields` 能更新哪些字段。
- 在表格和详情中读取对应单元格内容。

字段路径应保持稳定。不要在一次表单生命周期中动态改变同一节点的 `field`；业务条件变化应使用 `hidden`、`disabled` 或切换整份 Schema。

## 模型怎样被建立

每个节点会按下面的优先级确定初始值：

```text
initialValue
  ↓ 未提供
value
  ↓ 未提供
columns ? [] : subItems ? {} : undefined
```

例如：

```ts
const schema = {
  subItems: [
    { type: 'Input', field: 'name', initialValue: '' },
    {
      type: 'Group',
      field: 'address',
      subItems: [{ type: 'Input', field: 'city' }],
    },
    {
      type: 'InputList',
      field: 'contacts',
      columns: [{ type: 'Input', field: 'mobile' }],
    },
  ],
}
```

对应的标准初始模型为：

```ts
{
  name: '',
  address: {
    city: undefined,
  },
  contacts: [],
}
```

数组和对象初始值建议使用函数，避免多次创建表单时共享同一引用：

```ts
{
  type: 'InputList',
  field: 'contacts',
  initialValue: () => [{ name: '', mobile: '' }],
  columns: [
    { type: 'Input', field: 'name', label: '联系人' },
    { type: 'Input', field: 'mobile', label: '手机号' },
  ],
}
```

## 相对路径与嵌套上下文

进入带 `field` 的对象容器后，子项路径相对于该对象：

```ts
{
  type: 'Group',
  field: 'receiver',
  subItems: [
    { type: 'Input', field: 'name', label: '收件人' },
    { type: 'Input', field: 'mobile', label: '手机号' },
  ],
}
```

最终路径分别是 `receiver.name` 和 `receiver.mobile`。在子字段回调中：

- `current` 是 `receiver` 对象。
- `formData` 始终是根表单对象。
- `parent` 指向上一级响应上下文，而不是简单的数据对象副本。

数组的 `columns` 同样使用相对路径，每一行都会建立独立字段模型，并提供 `index` 和 `record`。详见[数组与表格](/manual/fields/collections)。

## 一个控件绑定多个字段

有些交互展示为一个控件，但业务模型需要保存多个值。SuperForm 用关联字段显式表达这种关系。

### labelField：同时保存值与显示文本

```ts
{
  type: 'Select',
  field: 'departmentId',
  labelField: 'departmentName',
  label: '部门',
  options: departmentOptions,
}
```

选中后模型形态为：

```ts
{
  departmentId: 12,
  departmentName: '研发中心',
}
```

`field` 保存提交值，`labelField` 保存显示文本。表格和详情的只读渲染也会优先读取 `labelField`，这能避免只有 ID 时再次查字典。支持范围、选项归一化和 `labelAsValue` 的关系见[选择输入：通用选项](/manual/fields/selections#通用-options-格式)。

### endField：把范围拆成两个业务字段

```ts
{
  type: 'DateRange',
  field: 'startDate',
  endField: 'endDate',
  label: '有效期',
}
```

控件仍接收 `[start, end]`，模型则保存为：

```ts
{
  startDate: '2026-08-01',
  endDate: '2026-08-31',
}
```

回显时组件会重新把两个字段组合成范围值；只读模式显示为“开始值 - 结束值”。不配置 `endField` 时，范围字段也可以保存为数组或通过 `stringifyValue` 保存为逗号字符串。详见[日期与时间：DateRange 值模式](/manual/fields/date-time#daterange-的三种值模式)。

### vModelFields：扩展额外 v-model

```ts
{
  type: 'ExtAddressPicker',
  field: 'districtCode',
  vModelFields: {
    provinceCode: 'provinceCode',
    cityCode: 'cityCode',
  },
}
```

键是扩展组件的 v-model 参数名，值可以是当前对象中的字段名或外部 Ref。适用于一个组件同时更新多个业务字段，具体契约见[注册自定义字段：多个 v-model](/manual/custom-fields#多个-v-model)。

## 无 field 的节点

并非每个节点都要进入模型：

- `InfoSlot`、`Buttons` 等辅助节点通常没有 `field`。
- 只有 `value: someRef`、没有 `field` 的输入控件会直接绑定该 Ref，但不会进入表单提交模型。
- 容器可以不设 `field`，此时只组织布局，子字段仍绑定当前对象。

需要提交或回显但不显示的值，应使用 `Hidden` 明确声明：

```ts
{ type: 'Hidden', field: 'id' }
```

`Hidden` 不生成可见控件，但会让 `id` 成为标准模型的一部分，并参与重置和提交。详见[展示与辅助：Hidden](/manual/fields/display#hidden)。

## 表格列路径

表格列也使用 `field` 读取记录，支持点路径。未声明 `type` 的列按只读文本列处理；需要进入 Table 容器的行内编辑或弹窗表单时，列必须声明有效字段类型。

页面级 [SuperTable](/manual/super-table) 负责独立数据源、查询和 API 绑定；字段级 [Table 数组容器](/manual/fields/collections#table-数组容器) 负责模型内部数组的显示与编辑，两者的数据边界不同。
