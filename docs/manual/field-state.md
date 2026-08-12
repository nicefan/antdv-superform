# 字段状态与联动

字段联动的关键不是“监听所有变化”，而是先判断业务结果属于哪一类：显示状态、编辑状态、组件属性、派生数据，还是副作用。SuperForm 为这些结果提供了不同入口，让 Schema 的意图保持明确。

## hidden：控制是否渲染

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
  type: 'Radio',
  field: 'customerType',
  label: '客户类型',
  options: { personal: '个人', company: '企业' },
  onUpdate: ({ current }) => {
    if (current.customerType !== 'company') current.companyName = undefined
  },
}
```

隐藏不等于跳过校验。条件字段通常让 `hidden` 和 `required` 使用同一个判断，具体见[动态必填](/manual/validation#动态必填)。

## disabled：控制是否允许输入

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

## editable：在编辑与只读之间切换

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

只读内容如何映射选项、范围和自定义渲染，见[插槽与自定义渲染](/manual/rendering)。

## required：让业务条件成为规则

```ts
{
  type: 'Textarea',
  field: 'reason',
  label: '原因',
  required: ({ current }) => current.result === 'reject',
}
```

它同时更新必填标识和必填规则，不需要手工维护两份状态。默认提示由 `label` 推导，例如 `label: '原因'` 会生成“原因不能为空！”。完整规则展开见[校验机制](/manual/validation#required-的自动展开)。

## dynamicAttrs：联动 UI 参数

```ts
{
  type: 'InputNumber',
  field: 'discount',
  label: '折扣',
  dynamicAttrs: ({ current }) => ({
    min: 0,
    max: current.vip ? 50 : 20,
    addonAfter: '%',
  }),
}
```

适合动态上下限、占位提示、选项组件的交互属性等。它只应返回底层组件属性，不负责写模型或调用接口。属性合并顺序见[响应式配置：dynamicAttrs](/manual/reactivity#dynamicattrs-计算底层组件属性)。

## computed：生成派生字段

```ts
{
  type: 'InputNumber',
  field: 'total',
  label: '合计',
  computed: (_value, { current }) => {
    return Number(current.price || 0) * Number(current.quantity || 0)
  },
  editable: false,
}
```

`computed` 的返回值会写回 `total`，因此能被提交、校验和其他字段继续依赖。只需格式化显示而不改变数据时，使用 `viewRender`。

## onUpdate：执行值变化后的动作

```ts
{
  type: 'Select',
  field: 'province',
  label: '省份',
  onUpdate: async ({ current, value }) => {
    current.city = undefined
    cityOptions.value = await api.getCities(value)
  },
}
```

它适合：

- 清理依赖字段。
- 请求下一级选项。
- 把变化通知给业务状态。
- 执行无法表示为纯计算的副作用。

如果只需处理底层组件的特定交互参数，使用 `onChange`、`onSearch` 等事件。两者差异见[事件与上下文](/manual/events-and-context#onupdate-与组件事件的区别)。

## 选择正确的联动入口

| 目标               | 首选配置       |
| ------------------ | -------------- |
| 是否出现           | `hidden`       |
| 是否允许操作       | `disabled`     |
| 输入态与只读态切换 | `editable`     |
| 是否必填           | `required`     |
| 动态组件属性       | `dynamicAttrs` |
| 计算并存储字段     | `computed`     |
| 值变化后的业务动作 | `onUpdate`     |
| 底层组件特定事件   | `onChange` 等  |
| 只修改展示结果     | `viewRender`   |

## 一个完整联动示例

```ts
const isRejected = ({ current }) => current.result === 'reject'

const schema = {
  subItems: [
    {
      type: 'Radio',
      field: 'result',
      label: '审核结果',
      options: { pass: '通过', reject: '驳回' },
      required: true,
      onUpdate: ({ current }) => {
        if (current.result !== 'reject') current.reason = undefined
      },
    },
    {
      type: 'Textarea',
      field: 'reason',
      label: '驳回原因',
      hidden: (data) => !isRejected(data),
      required: isRejected,
      dynamicAttrs: ({ current }) => ({
        maxlength: current.urgent ? 200 : 500,
      }),
    },
  ],
}
```

这个 Schema 同时表达了显示、必填、清理旧值和动态长度限制，各项职责彼此独立。可运行版本见[字段联动示例](/examples?example=form-linkage)。
