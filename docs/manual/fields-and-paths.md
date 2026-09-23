# 字段与数据模型 {#字段与数据路径}

Schema 与数据模型是相辅相成的：Schema 决定模型应具备的结构，数据源提供当前业务值；模型变化又会驱动控件、校验、联动和只读展示。理解 `field`，就理解了整个系统的数据坐标。

<span id="字段与数据模型"></span>

## field 如何映射数据 {#field-是模型中的地址}

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
};
```

因此 `field` 不只是取值表达式，它还参与：

- 建立初始模型结构。
- 生成 Ant Design Vue FormItem 的校验路径。
- 确定 `effectData.field` 和 `effectData.value`。
- 决定 `setFieldsValue`、`resetFields` 能更新哪些字段。
- 在表格和详情中读取对应单元格内容。

字段路径应保持稳定。不要在一次表单生命周期中动态改变同一节点的 `field`；业务条件变化应使用 `hidden`、`disabled` 或切换整份 Schema。

## 嵌套字段与点路径 {#相对路径与嵌套上下文}

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

数组的 `columns` 同样使用相对路径，每一行都会建立独立字段模型，并提供 `index` 和 `record`。详见[数组容器](/manual/fields/collections)。

## 表单模型如何初始化 {#模型怎样被建立}

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
    { type: "Input", field: "name", initialValue: "" },
    {
      type: "Group",
      field: "address",
      subItems: [{ type: "Input", field: "city" }],
    },
    {
      type: "InputList",
      field: "contacts",
      columns: [{ type: "Input", field: "mobile" }],
    },
  ],
};
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

### 数据源绑定 {#建模与绑定顺序}

传入 `dataSource` 后，表单会按 Schema 补齐缺失字段，并将输入同步到传入对象：

```ts
const record = ref({ id: 1, name: "张三" });

const [register, form] = useForm({
  dataSource: record,
  subItems: [
    { type: "Hidden", field: "id" },
    { type: "Input", field: "name", label: "姓名", initialValue: "" },
    { type: "Switch", field: "enabled", label: "启用" },
  ],
});
```

绑定后 `record.value` 会具备：

```ts
{
  id: 1,
  name: '张三',
  enabled: undefined,
}
```

也就是说，传入对象不是只读快照，而是当前表单模型本身；用户输入和 Schema 补齐都会反映到该对象。若业务需要保留原始记录，应在传入前自行克隆。


## 无 field 的节点 {#无-field-的节点}

并非每个节点都要进入模型：

- `InfoSlot`、`Buttons` 等辅助节点通常没有 `field`。
- 只有 `value: someRef`、没有 `field` 的输入控件会直接绑定该 Ref，但不会进入表单提交模型。
- 容器可以不设 `field`，此时只组织布局，子字段仍绑定当前对象。

需要提交或回显但不显示的值，应使用 `Hidden` 明确声明：

```ts
{ type: 'Hidden', field: 'id' }
```

`Hidden` 不生成可见控件，但会让 `id` 成为标准模型的一部分，并参与重置和提交。详见[展示与辅助：Hidden](/manual/fields/display#hidden)。

## 表格列的 field {#表格列路径}

表格列也使用 `field` 读取记录，支持点路径。未声明 `type` 的列按只读文本列处理；需要进入 Table 容器的行内编辑或弹窗表单时，列必须声明有效字段类型。

页面级 [SuperTable](/manual/super-table) 负责独立数据源、查询和 API 绑定；字段级 [Table 数组容器](/manual/fields/table#table-数组容器) 负责模型内部数组的显示与编辑，两者的数据边界不同。

<span id="关联字段与值映射"></span>

## 一个控件绑定多个字段 {#一个控件绑定多个字段}

有些交互展示为一个控件，但业务模型需要保存多个值。SuperForm 用关联字段显式表达这种关系。

### labelField：同时保存值与显示文本

```ts
{
  type: 'Select',
  field: 'departmentId',
  labelField: 'departmentName',
  label: '部门',
  options: { source: departmentOptions },
}
```

选中后模型形态为：

```ts
{
  departmentId: 12,
  departmentName: '研发中心',
}
```

`field` 保存提交值，`labelField` 保存显示文本。表格和详情的只读渲染也会优先读取 `labelField`，这能避免只有 ID 时再次查字典。支持范围、选项归一化和 `labelAsValue` 的关系见[选项与值处理](/manual/fields/selections#通用-options-格式)。

### endField：把范围拆成两个业务字段

```ts
{
  type: 'DateRangePicker',
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

回显时组件会重新把两个字段组合成范围值；只读模式显示为“开始值 - 结束值”。不配置 `endField` 时，范围字段也可以保存为数组或通过 `stringifyValue` 保存为逗号字符串。详见[日期与范围值](/manual/fields/date-time#daterangepicker-的三种值模式)。

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

键是扩展组件的 v-model 参数名，值可以是当前对象中的字段名或外部 Ref。适用于一个组件同时更新多个业务字段，项目组件的注册方式见[自定义字段](/manual/custom-fields#注册项目组件)。



## initialValue：字段默认值 {#标准初始模型与当前模型}

两者用途不同：

| 模型         | 来源                                            | 用途                   |
| ------------ | ----------------------------------------------- | ---------------------- |
| 标准初始模型 | Schema 的 `initialValue` / `value` / 结构默认值 | 无参数重置、缺省值回退 |
| 当前模型     | 当前 `dataSource` 或内部对象                    | 输入绑定、联动、提交   |

例如编辑记录中 `name` 为“张三”，但 Schema 的 `initialValue` 为 `''`；调用无参数 `resetFields()` 后，字段恢复为 `''`，不是恢复到第一次传入的“张三”。需要把一条记录作为重置目标时，应显式传入：

```ts
form.resetFields(recordSnapshot);
```

## dataSource：外部数据源 {#对象与-ref-的差异}

`dataSource` 可以是普通对象或 Ref：

```ts
// 固定绑定一个响应式对象
dataSource: reactive({ name: "" });

// 支持整体切换记录
dataSource: currentRecord;
```

Ref 会被整体解包。当 `currentRecord.value` 指向新对象时，SuperForm 清除当前校验状态并切换模型，随后按 Schema 补齐新对象缺失的字段：

```ts
currentRecord.value = { id: 2, name: "李四" };
```

这适合弹窗复用同一个表单编辑多条记录。`useForm` 只接收 Schema；外部对象通过 Schema 的 `dataSource` 绑定。

## value：绑定外部 Ref {#字段级-ref}

节点的 `value` 可以直接绑定外部 Ref。

### field 与 value 同时使用 {#同时配置-field}

```ts
const keyword = ref('')

{
  type: 'Input',
  field: 'keyword',
  value: keyword,
  label: '关键词',
}
```

此时存在双向同步：

```text
输入控件 ↔ 表单模型 keyword ↔ 外部 Ref
```

字段会进入校验、重置和提交模型。

### 无 field 的 Ref 绑定 {#只有-value-没有-field}

```ts
{
  type: 'Input',
  value: keyword,
}
```

控件直接更新 `keyword.value`，但它没有模型路径，不进入表单提交数据。适合临时筛选器或只服务于页面交互的控件。

### 复合字段的值映射 {#复合值的双向转换}

控件值与业务模型可以使用不同形态；外部模型变化也会同步到控件。按需求查阅：

| 数据关系 | 配置与说明 |
| --- | --- |
| 范围对应两个字段 | [endField](/manual/fields/date-time#endfield-双字段模式) |
| 数组对应逗号字符串 | [选择字段值转换](/manual/fields/selections#通用值转换属性) |
| 同时保存选中值与标签 | [labelField](/manual/fields-and-paths#labelfield-同时保存值与显示文本) |
| 额外 v-model 对应字段或 Ref | [vModelFields](/manual/fields-and-paths#vmodelfields-扩展额外-v-model) |

<span id="数据更新与提交"></span>

## 回填与局部更新 {#数据动作的边界}

动作签名及返回值见 [useForm 动作](/manual/super-form#useform-动作)。数据更新以已建立的 Schema 模型为边界，不增加模型外字段：

```ts
form.setFieldsValue({
  name: "王五",
  unknown: 123, // Schema 模型中没有该字段，不会被加入
});
```

对象会按已建立结构递归更新，数组和新对象会深拷贝后替换，避免直接复用传入集合引用。`setFieldsValue` 只处理参数中实际出现的字段；未提供的字段保持不变。

需要提交 `id`、版本号等不可见字段时，请用 `Hidden` 把它们加入 Schema 模型，而不是依赖动作保留任意外部属性。详见[字段与数据路径：无 field 的节点](/manual/fields-and-paths#无-field-的节点)。

### 提交数据的范围 {#提交不是重新组装任意对象}

`submit()` 的结果是当前标准模型的深拷贝。这个约束使提交字段可由 Schema 审核，也保证重置、校验和提交围绕同一套路径工作。若后端参数结构不同，建议在 API 层显式转换，相关约定见[接口与数据适配](/manual/backend-contracts)。


<span id="数据源与双向绑定"></span>
<span id="初始化与数据绑定"></span>
