# 响应式与联动

Schema 可以是稳定的普通对象，变化留给其中的函数和 Ref。SuperForm 会在响应式作用域中执行这些配置，并追踪函数实际读取的数据；依赖改变后，只更新对应状态或属性，不要求业务代码重建整份 Schema。

本章按“响应式配置 → 字段状态与模型联动 → 事件和上下文”的顺序组织。状态函数负责描述结果，`computed` 负责派生值，`onUpdate` 与组件事件负责副作用；先区分这三类职责，复杂联动会更容易维护。

## 三种配置形态

| 形态   | 示例                                        | 适用情况                 |
| ------ | ------------------------------------------- | ------------------------ |
| 静态值 | `disabled: true`                            | 生命周期内不变           |
| Ref    | `disabled: locked`                          | 状态由 Schema 外部控制   |
| 函数   | `disabled: ({ current }) => current.locked` | 状态依赖当前模型或上下文 |

`hidden`、`disabled`、`required` 等状态均支持静态值和函数，其中状态值也可直接使用 Ref。

```ts
{
  type: 'Textarea',
  field: 'rejectReason',
  label: '驳回原因',
  hidden: ({ current }) => current.result !== 'reject',
  required: ({ current }) => current.result === 'reject',
  disabled: ({ formData }) => !formData.canReview,
}
```

当 `current.result` 或 `formData.canReview` 改变时，相应结果会自动更新。这里无需手工调用刷新方法。

## effectData 决定依赖范围

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

优先读取距离最近的 `current`，让字段组更容易复用；只有确实跨层级时再读取 `formData`。完整上下文见本页的[事件与上下文](#effectdata-上下文)。

## dynamicAttrs：计算底层组件属性

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

## computed：计算并写回字段

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

## options 与 dataSource 的响应性

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
      options: provinceOptions,
    },
    { type: "Select", field: "city", label: "城市", options: cities },
  ],
};
```

- `options` 可以是数组、Ref 或函数；函数可返回数组或 Promise。
- `dataSource` 可以是对象或 Ref；Ref 指向新对象时，SuperForm 切换到新模型。
- 字段 `value` 可以绑定 Ref，与模型字段进行双向同步。

选项函数的远程搜索参数和触发条件见[选择输入：远程搜索](/manual/fields/selections#远程搜索)，数据源切换的具体行为见[Schema 与数据模型](/manual/schema#数据源与双向绑定)。

## 状态优先级与继承

容器禁用会传递给后代。父级已经禁用时，子项返回 `disabled: false` 也不会重新启用：

```ts
{
  type: 'Card',
  disabled: ({ formData }) => formData.readonly,
  subItems: [
    { type: 'Input', field: 'name', disabled: false }, // 父级禁用时仍禁用
  ],
}
```

禁用字段暂停其当前校验规则，但仍保留在模型和提交数据中。隐藏字段同样保留模型值。完整状态语义和选择建议见本页的[字段状态与联动](#字段状态与联动)。

## 保持响应式配置可维护

- 让函数尽量只读取参数并返回结果，避免在状态函数中改数据。
- 复用的条件先提取为具名函数，例如 `canEditPrice(effectData)`。
- 一个字段需要触发业务请求时使用事件或 `onUpdate`，不要借用 `dynamicAttrs`。
- 大量字段依赖同一个派生状态时，可在 Schema 外用 Vue `computed` 统一计算，再把 Ref 传入。

前面的内容解释响应式配置如何建立依赖；下面继续说明这些依赖如何落实为字段状态、模型联动和业务事件。

<!--@include: ./_partials/field-state.md-->

<!--@include: ./_partials/events-and-context.md-->
