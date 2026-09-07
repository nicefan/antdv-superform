# Schema 与数据模型

Schema 不只是“组件配置列表”。它同时描述字段如何显示、数据存在哪里、初始模型是什么形状、如何校验，以及字段之间如何联动。SuperForm 会据此建立数据模型，再让输入、只读展示和页面组件共享同一份业务定义。

本章按“配置声明 → 字段路径 → 数据绑定”的顺序展开。第一次阅读建议顺序浏览；查阅具体能力时可直接使用右侧目录定位 `field`、`labelField`、`endField`、`dataSource` 或字段级 Ref。

```text
Schema 声明
├─ 结构：字段、容器、数组
├─ 视图：label、type、attrs、布局
├─ 模型：field、initialValue、关联字段
├─ 行为：rules、事件、响应式配置
└─ 场景：表单、表格、详情
```

这种设计的价值是：新增一个业务字段时，通常只需在 Schema 中补充一次定义，而不必分别维护表单控件、模型初始化、校验规则和只读文案。

## 从一项声明到完整行为

下面是一项典型字段配置：

```ts
{
  type: 'Input',
  field: 'profile.name',
  label: '姓名',
  required: true,
  initialValue: '',
  span: 12,
  attrs: {
    maxlength: 30,
    allowClear: true,
  },
}
```

运行时它会同时产生以下结果：

- `type: 'Input'` 选择文本输入控件。
- `field: 'profile.name'` 建立 `profile.name` 数据路径；中间对象缺失时自动补齐。
- `label: '姓名'` 生成表单标签，并为 Input 推导“请输入姓名”占位提示。
- `required: true` 生成必填标识和默认必填规则，提示为“姓名不能为空！”。
- `initialValue: ''` 进入 Schema 标准初始模型，供初始化和重置使用。
- `span: 12` 让字段在 24 栅格中占半行。
- `attrs` 继续传给底层 Ant Design Vue Input。

可以把其中的自动推导理解成下面的等价展开：

```ts
{
  label: '姓名',
  required: true,
  attrs: {
    // 未显式填写 placeholder 时，Input 会根据 label 自动生成
    placeholder: '请输入姓名',
  },
  rules: [
    // required: true 会根据 label 自动生成默认提示
    { required: true, message: '姓名不能为空！' },
  ],
}
```

这段代码用于解释运行效果；组件不会改写传入的原始 Schema。显式配置始终优先，例如 `attrs.placeholder: '填写联系人姓名'` 或自定义 `rules.message` 会覆盖默认文案。

不同字段使用符合交互习惯的提示语：Input、TextArea、InputNumber、AutoComplete 默认使用“请输入…”，Select、TreeSelect 默认使用“请选择…”。各类型的默认值与专属配置见[基础输入](/manual/fields/basic-inputs)和[选择输入](/manual/fields/selections)。

## 根节点、容器与字段

```text
SuperForm 根 Schema
└─ subItems
   ├─ 字段节点：绑定一个值
   ├─ 容器节点：组织一组 subItems
   └─ 数组节点：用 columns 描述数组元素
```

根节点对应 [SuperForm](/manual/super-form)，负责数据源、提交、重置和整体布局。它本身不是字段类型，也不需要在 `subItems` 中再写一个 `Form` 容器。

节点的角色由结构配置决定：

| 节点     | 主要结构     | 数据结果               | 典型类型                    |
| -------- | ------------ | ---------------------- | --------------------------- |
| 普通字段 | `field`      | 标量、对象或组件约定值 | Input、Select、Upload       |
| 对象容器 | `subItems`   | 默认补为对象           | Group、Card、Tabs           |
| 数组容器 | `columns`    | 默认补为空数组         | InputList、ListGroup、Table |
| 辅助节点 | 无需 `field` | 不进入提交模型         | InfoSlot、Buttons           |

完整的容器差异见[布局容器](/manual/fields/containers)，数组数据结构见[数组与表格](/manual/fields/collections)。

## 配置分层

业务语义写在节点顶层，底层组件能力写在 `attrs` 中：

```ts
{
  // SuperForm 识别的业务配置
  type: 'Input',
  field: 'name',
  label: '名称',
  required: true,
  hidden: ({ current }) => current.archived,
  span: 12,

  // 交给 Ant Design Vue Input 的属性
  attrs: {
    maxlength: 50,
    allowClear: true,
  },
}
```

不要把 `field`、`required`、`span`、`hidden` 等 Schema 能力放进 `attrs`。反过来，底层组件的 `allowClear`、`maxlength`、`mode` 等属性也应留在 `attrs`，这样 Schema 层与 UI 组件层的职责清晰。

## 一份字段，多种页面场景

同一字段定义可以用于表单、表格和详情。`exclude` 用来声明不适用的场景：

```ts
{
  type: 'Hidden',
  field: 'id',
  exclude: ['table', 'description'],
}
```

可用值为：

- `form`：不进入编辑表单。
- `table`：不生成表格列。
- `description`：不进入详情展示。

需要回显和提交、但不应显示的主键或上下文字段，建议声明为 `Hidden`，不要只把它留在外部对象中。

## 何时拆分 Schema

优先维护一份共享字段定义；当不同页面的业务语义已经不同，再按场景拆分。例如列表中的“状态”可能只读并支持筛选，编辑页中的“状态”可能需要权限联动，此时可以共享基础字段后再组合：

```ts
const statusField = {
  type: "Select",
  field: "status",
  label: "状态",
  options: statusOptions,
};

const editStatus = {
  ...statusField,
  required: true,
  disabled: ({ formData }) => !formData.canEditStatus,
};
```

这样保留字段名、选项和值语义的一致性，又不会强行把所有场景塞进大量条件函数。

## 类型辅助

```ts
import { defineDetail, defineForm, defineTable } from "superform-antdv";

const schema = defineForm({
  subItems: [{ type: "Input", field: "name", label: "名称" }],
});
```

类型辅助函数只约束输入并改善编辑器提示，不改变运行时结果。动态 Schema 仍可以使用函数或异步函数交给相应组合函数。

下面继续从字段路径和数据绑定两个角度展开模型细节。前者解释 Schema 如何确定数据坐标与结构，后者解释业务对象如何成为当前模型并参与重置、提交和双向同步。

<!--@include: ./_partials/fields-and-paths.md-->

<!--@include: ./_partials/data-binding.md-->
