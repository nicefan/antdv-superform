# 响应式与联动

Schema 可以是稳定的普通对象，变化留给其中的函数和 Ref。SuperForm 会在响应式作用域中执行这些配置，并追踪函数实际读取的数据；依赖改变后，只更新对应状态或属性，不要求业务代码重建整份 Schema。

本页按“响应式配置 → 派生数据 → 字段状态 → 联动示例”组织。事件签名与回调参数集中见[事件与上下文](/manual/events-and-context)。

<span id="响应式配置"></span>

## 静态值、Ref 与函数 {#三种配置形态}

| 形态   | 示例                                        | 适用情况                 |
| ------ | ------------------------------------------- | ------------------------ |
| 静态值 | `disabled: true`                            | 生命周期内不变           |
| Ref    | `disabled: locked`                          | 状态由 Schema 外部控制   |
| 函数   | `disabled: ({ current }) => current.locked` | 状态依赖当前模型或上下文 |

`hidden`、`disabled`、`required` 等状态均支持静态值和函数，其中状态值也可直接使用 Ref。

```ts
{
  type: 'TextArea',
  field: 'rejectReason',
  label: '驳回原因',
  hidden: ({ current }) => current.result !== 'reject',
  required: ({ current }) => current.result === 'reject',
  disabled: ({ formData }) => !formData.canReview,
}
```

当 `current.result` 或 `formData.canReview` 改变时，相应结果会自动更新。这里无需手工调用刷新方法。

## 联动的数据范围 {#effectdata-决定依赖范围}

状态函数接收当前节点的 `effectData`：

- `current`：当前字段所属对象；数组列中是当前行。
- `formData`：根表单数据，适合跨容器联动。
- `value`：当前字段值。
- `index`、`record`：数组或表格场景中的行信息。
- `parent`：上一级响应上下文。

```ts
disabled: ({ current }) => !current.country;

// 跨业务分组时读取根模型
hidden: ({ formData }) => formData.orderType !== "company";
```

优先读取距离最近的 `current`，让字段组更容易复用；只有确实跨层级时再读取 `formData`。完整参数见[effectData 上下文](/manual/events-and-context#effectdata-上下文)。

<!-- 章节锚点供站外链接与收藏定位。 -->
<span id="dynamicattrs-联动-ui-参数"></span>

## 选项与数据源更新 {#options-与-datasource-的响应性}

选项和数据源也可以独立响应：

```ts
const cities = ref([]);
const record = ref({ province: undefined, city: undefined });

const schema = {
  dataSource: record,
  subItems: [
    {
      type: "Select",
      field: "province",
      label: "省份",
      options: { source: provinceOptions },
    },
    { type: "Select", field: "city", label: "城市", options: { source: cities } },
  ],
};
```

- `options.source` 可以是数组、对象、Ref 或函数；函数只接收 effectData，可返回数组或 Promise。
- `dataSource` 可以是对象或 Ref；Ref 指向新对象时，SuperForm 切换到新模型。
- 字段 `value` 可以绑定 Ref，与模型字段进行双向同步。

远程搜索通过当前 UI 的原生搜索事件维护业务关键词，再由 `options.source` 读取该响应式状态；完整规则见[选择输入：远程搜索](/manual/fields/selections#远程搜索)。数据源切换的具体行为见[Schema 与数据模型](/manual/fields-and-paths#数据源与双向绑定)。

<span id="字段状态与计算"></span>

## 显隐、禁用与只读 {#字段状态与联动}

字段联动的关键不是“监听所有变化”，而是先判断业务结果属于哪一类：显示状态、编辑状态、组件属性、派生数据，还是副作用。SuperForm 为这些结果提供了不同入口，让 Schema 的意图保持明确。

### hidden：控制是否渲染

```ts
{
  type: 'Input',
  field: 'companyName',
  label: '企业名称',
  hidden: ({ current }) => current.customerType !== 'company',
}
```

隐藏后节点不渲染，但 `companyName` 仍在模型中，原值也不会自动清空。这使字段临时隐藏后可以恢复原输入。

如果业务要求隐藏时清空值，应把动作写在控制字段的 `onUpdate` 中：

```ts
{
  type: 'RadioGroup',
  field: 'customerType',
  label: '客户类型',
  options: { source: { personal: '个人', company: '企业' } },
  onUpdate: ({ current }) => {
    if (current.customerType !== 'company') current.companyName = undefined
  },
}
```

隐藏不等于跳过校验。条件字段通常让 `hidden` 和 `required` 使用同一个判断，具体见[动态必填](/manual/validation#动态必填)。

<!-- 章节锚点供站外链接与收藏定位。 -->
<span id="状态优先级与继承"></span>

### disabled：控制是否允许输入

```ts
{
  type: 'Input',
  field: 'contractNo',
  label: '合同编号',
  disabled: ({ current }) => current.status !== 'draft',
}
```

禁用字段仍显示、仍保留模型值并进入提交数据，但当前字段规则会暂停。容器的禁用状态向下继承，且父级禁用优先：

```ts
{
  type: 'Card',
  disabled: ({ formData }) => formData.readonly,
  subItems: [/* 整组字段都会禁用 */],
}
```

如果希望不可编辑时仍保持纯文本视觉，表格列或表单字段可使用 `editable` 在输入控件和只读内容之间切换。

### editable：在编辑与只读之间切换

```ts
{
  type: 'InputNumber',
  field: 'approvedAmount',
  label: '核准金额',
  editable: ({ current }) => current.status === 'reviewing',
}
```

`editable: false` 与 `disabled: true` 不同：

| 状态              | 视觉结果       | 表单值 | 校验               |
| ----------------- | -------------- | ------ | ------------------ |
| `disabled`        | 仍是禁用控件   | 保留   | 暂停               |
| `editable: false` | 切换为只读展示 | 保留   | 字段仍属于表单模型 |
| `hidden`          | 不渲染         | 保留   | 需自行配合条件规则 |

只读内容如何映射选项、范围和自定义渲染，见[渲染与插槽](/manual/rendering)。

<!-- 章节锚点供站外链接与收藏定位。 -->
<span id="required-让业务条件成为规则"></span>
<span id="onupdate-执行值变化后的动作"></span>
<span id="选择正确的联动入口"></span>

## dynamicAttrs：动态属性 {#dynamicattrs-计算底层组件属性}

固定属性放在 `attrs`，随数据变化的属性放在 `dynamicAttrs`：

```ts
{
  type: 'Input',
  field: 'shortName',
  label: '简称',
  attrs: {
    allowClear: true,
  },
  dynamicAttrs: ({ current }) => ({
    maxlength: current.nameType === 'short' ? 20 : 100,
    placeholder: current.nameType === 'short' ? '请输入 20 字以内简称' : '请输入名称',
  }),
}
```

最终传给底层组件的属性由以下来源合并：

```text
全局字段默认配置
  → attrs 静态配置
  → 节点事件监听器
  → dynamicAttrs 动态结果
  → 继承/计算得到的 disabled
```

因此动态结果可以覆盖同名静态属性。`dynamicAttrs` 应只返回组件属性，不要在其中修改模型；它可能随依赖多次执行，副作用会造成难以追踪的更新。

<!-- 章节锚点供站外链接与收藏定位。 -->
<span id="computed-生成派生字段"></span>

## computed：计算字段值 {#computed-计算并写回字段}

节点的 `computed(value, effectData)` 不是 Vue 模板中的只读计算，它会把返回值持续写回当前字段：

```ts
{
  type: 'InputNumber',
  field: 'amount',
  label: '金额',
  computed: (_value, { current }) => {
    return Number(current.quantity || 0) * Number(current.price || 0)
  },
  disabled: true,
}
```

执行顺序可理解为：

```text
读取 quantity / price
  → 计算 amount
  → 写入当前模型的 amount
  → 输入控件与提交数据同步更新
```

它适合派生字段、合计值和规范化结果。注意：

- 计算函数会立即执行一次。
- 返回值即实际存储值，不只是显示文本。
- 不要在函数中反向修改其依赖字段，否则可能形成循环更新。
- 只想改变只读显示时，使用 [`viewRender`](/manual/rendering#viewrender-自定义只读内容)。

<span id="组合联动与事件"></span>

## 联动入口选择 {#联动入口选择}

| 目标               | 首选配置       |
| ------------------ | -------------- |
| 是否出现           | `hidden`       |
| 是否允许操作       | `disabled`     |
| 输入态与只读态切换 | `editable`     |
| 是否必填           | [`required`](/manual/validation#required-的自动展开) |
| 动态组件属性       | `dynamicAttrs` |
| 计算并存储字段     | `computed`     |
| 值变化后的业务动作 | [`onUpdate`](/manual/events-and-context#onupdate-与组件事件的区别) |
| 底层组件特定事件   | `onChange` 等  |
| 只修改展示结果     | `viewRender`   |

<!-- 章节锚点供站外链接与收藏定位。 -->
<span id="一个完整联动示例"></span>

### 场景示例：审批联动 {#完整联动示例}

```ts
const isRejected = ({ current }) => current.result === "reject";

const schema = {
  subItems: [
    {
      type: "RadioGroup",
      field: "result",
      label: "审核结果",
      options: { source: { pass: "通过", reject: "驳回" } },
      required: true,
      onUpdate: ({ current }) => {
        if (current.result !== "reject") current.reason = undefined;
      },
    },
    {
      type: "TextArea",
      field: "reason",
      label: "驳回原因",
      hidden: (data) => !isRejected(data),
      required: isRejected,
      dynamicAttrs: ({ current }) => ({
        maxlength: current.urgent ? 200 : 500,
      }),
    },
  ],
};
```

这个 Schema 同时表达了显示、必填、清理依赖字段的值和动态长度限制，各项职责彼此独立。可运行版本见[字段联动示例](/examples?example=form-linkage)。

## 避免副作用与循环 {#保持响应式配置可维护}

- 让函数尽量只读取参数并返回结果，避免在状态函数中改数据。
- 复用的条件先提取为具名函数，例如 `canEditPrice(effectData)`。
- 一个字段需要触发业务请求时使用事件或 `onUpdate`，不要借用 `dynamicAttrs`。
- 大量字段依赖同一个派生状态时，可在 Schema 外用 Vue `computed` 统一计算，再把 Ref 传入。

需要处理业务副作用时，使用 `onUpdate` 或组件事件，参数说明见下方参考。

## 事件与回调参数 {#事件与上下文}

<!-- 章节锚点供站外链接与收藏定位。 -->
<span id="两种事件写法"></span>
<span id="onupdate-与组件事件的区别"></span>
<span id="effectdata-上下文"></span>
<span id="current-与-formdata"></span>
<span id="parent-不是父数据的别名"></span>
<span id="数组行上下文"></span>
<span id="远程选项函数"></span>
<span id="页面组件的扩展上下文"></span>

完整说明见[事件与上下文](/manual/events-and-context)。

