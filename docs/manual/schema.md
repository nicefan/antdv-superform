# Schema 概览

Schema 描述页面的数据结构、展示方式和交互行为。表单用它建立字段模型并处理输入，表格用它组织列、查询和编辑，详情用它读取并展示记录。它们可以共享字段定义，但根配置和运行时职责各不相同。

本页介绍 Schema 的结构与配置分层。字段路径、初始化及绑定细节见[字段与数据模型](/manual/fields-and-paths)；查找具体配置或动作可使用 [API 索引](/api)。

```text
Schema 声明
├─ 结构：字段、容器、数组
├─ 视图：label、type、attrs、布局
├─ 模型：field、initialValue、关联字段
├─ 行为：rules、事件、响应式配置
└─ 场景：表单、表格、详情
```

## 表单、表格与详情 {#类型辅助}

根据宿主组件选择根 Schema：

| 定义入口 | 主要结构 | 根配置负责什么 |
| --- | --- | --- |
| [defineForm](/manual/super-form#根-schema-属性) | `subItems` | 表单数据源、整体布局、提交与重置 |
| [defineTable](/manual/super-table#根配置总览) | `columns` | 表格数据源、查询接口、搜索、分页与编辑 |
| [defineDetail](/manual/super-detail#根配置) | `subItems` | 详情记录、展示布局和操作按钮 |

三个函数提供对应配置的类型提示，并原样返回配置对象；实际行为由 SuperForm、SuperTable、SuperDetail 及对应组合函数执行。表单的模型初始化和输入校验，不等同于表格读取列表记录或详情展示数据时的行为。

<span id="schema-结构与配置"></span>

## 字段声明与默认行为 {#从一项声明到完整行为}

下面是一项典型的表单字段配置，其中加入了复用为表格列时的外观配置。示例使用 AntDV 产品包：

```ts
const nameField = {
  type: 'Input' as const,
  field: 'profile.name',
  label: '姓名',
  required: true,
  initialValue: '',
  span: 12,
  // 输入属性在表单或表格编辑时使用
  attrs: {
    maxlength: 30,
    allowClear: true,
  },
  // 列宽与表单栅格分别配置
  columnProps: {
    width: 180,
    ellipsis: true,
  },
}
```

放入表单的 `subItems` 后：

- `type: 'Input'` 选择文本输入控件。
- `field: 'profile.name'` 建立 `profile.name` 数据路径；中间对象缺失时自动补齐。
- `label: '姓名'` 生成表单标签，并为 Input 推导“请输入姓名”占位提示。
- `required: true` 生成必填标识和默认必填规则，提示为“姓名不能为空！”。
- `initialValue: ''` 进入 Schema 标准初始模型，供初始化和重置使用。
- `span: 12` 让字段在 24 栅格中占半行。
- `attrs` 传给当前 Adapter 的 Input；`columnProps` 不决定表单布局。

放入表格的 `columns` 后，`field` 用于读取每条记录的 `profile.name`，`label` 用于列标题，`columnProps` 控制列宽和省略显示。进入编辑场景时，输入类型、校验和输入属性才参与相应表单或编辑控件的行为；声明 Input 并不等于开启行内编辑。

放入详情的 `subItems` 后，组件读取同一路径并展示内容，不创建 Input 输入框。字段的选项映射、关联标签和 `viewRender` 等也可用于只读展示。

```ts
import { defineForm, defineTable, defineDetail } from 'superform-antdv'

const formSchema = defineForm({
  subItems: [nameField],
  buttons: { actions: ['submit', 'reset'] },
})

const tableSchema = defineTable({
  columns: [nameField],
  dataSource: [{ id: 1, profile: { name: '张三' } }],
  attrs: { rowKey: 'id' },
})

const detailSchema = defineDetail({
  subItems: [nameField],
  dataSource: { profile: { name: '张三' } },
  mode: 'table',
})
```

这里复用的是字段定义，三份根配置各自持有数据和行为。表格还可配置 `apis`、`params`、`searchForm`，详情通过 `mode` 设置布局；完整用法分别见[表单](/manual/super-form)、[表格](/manual/super-table)和[详情](/manual/super-detail)。

Adapter 可以按字段类型补充输入或选择提示。各产品的默认属性与增强范围见 [UI 输入组件](/manual/fields/basic-inputs)和[选项与值处理](/manual/fields/selections)。

## 根节点、容器与字段 {#根节点、容器与字段}

```text
表单根 Schema → subItems → 输入字段、对象容器、数组容器
表格根 Schema → columns  → 展示列、可编辑字段、分组
详情根 Schema → subItems → 只读字段、展示容器
```

根 Schema 描述整个宿主组件，不需要为了创建页面而在内部再包一层同名容器。字段和容器描述其中的数据或结构：

| 节点 | 结构与含义 | 典型类型 |
| --- | --- | --- |
| 字段 | `field` 指向当前对象中的数据；输入和只读行为由场景决定 | Input、Select、Upload |
| 对象容器 | `subItems` 组织子项；带 `field` 时可形成嵌套对象，不带时复用当前数据层级 | Group、Card |
| 数组容器 | `field` 绑定模型中的数组，`columns` 描述数组元素 | InputList、ListGroup、Table |
| 展示与操作节点 | 组织内容或动作，不承担普通输入字段的值绑定 | InfoSlot、Buttons |

页面级 SuperTable 管理独立列表和查询，字段级 Table 绑定表单模型中的数组。两者都使用 `columns`，但数据边界不同。详细结构见[布局容器](/manual/fields/containers)、[数组容器](/manual/fields/collections)和 [Table 数组表格](/manual/fields/table)。

## Schema 与 attrs {#配置分层}

属性写在哪里，由当前节点负责的组件决定：

- **Schema 顶层**：字段的 `field`、`required`、`span`，或表格根的 `columns`、`params`、`searchForm` 等，由对应组件处理。
- **attrs**：当前节点的底层 UI 属性。Input 字段中是输入控件属性，表格根中是 Table 属性，详情根中是详情布局属性。
- **columnProps**：表格列属性。列上的配置覆盖表格根提供的同名列默认值。
- **formItemProps / descriptionsProps**：分别定制字段的表单项和详情展示，具体位置见对应组件章节。

例如，表格列中的 `attrs.maxlength` 限制编辑输入长度，`columnProps.width` 设置列表列宽，`span` 设置编辑表单中的栅格跨度。同一字段中的这些配置各自作用于不同部分，不能把它们全部放进 `attrs`。

<span id="schema-复用与类型"></span>

## exclude：控制使用场景 {#一份字段-多种页面场景}

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

上例保留表单模型中的 id，同时不生成对应列表列和详情项。需要随表单提交的不可见字段，应保留其字段声明；隐藏输入和排除表单场景不是同一个操作。

## 业务字段组复用 {#何时拆分-schema}

除了在表单、表格和详情之间复用字段，还可以复用地址、订单明细等业务字段组。需要明确三类边界：

- **数据路径**：子项使用相对 field，同一地址组放入收货地址或开票地址容器后，各自绑定对应对象。带 field 的 Group 建立数据层级，Fragment 用于展开字段集合。
- **联动上下文**：组内逻辑优先读取 current，避免写死根模型中的路径；表格行、编辑表单和详情提供的上下文按各自场景使用。
- **实例状态**：共享字段定义不要求共享 dataSource、选项 Ref 或业务请求状态。需要独立状态时，由每个页面实例创建并传入。

拆分文件不会自动改变模型结构或隔离状态。字段路径见[字段与数据模型](/manual/fields-and-paths#相对路径与嵌套上下文)，回调参数见[事件与上下文](/manual/events-and-context#effectdata-上下文)，搜索字段复用列的行为见[搜索表单](/manual/super-table#搜索表单)。

<span id="配置的使用范围"></span>

<span id="模型与绑定参考"></span>

## 字段与数据模型 {#字段与数据路径}

<!-- 章节锚点供站外链接与收藏定位。 -->
<span id="field-是模型中的地址"></span>
<span id="模型怎样被建立"></span>
<span id="相对路径与嵌套上下文"></span>
<span id="一个控件绑定多个字段"></span>
<span id="labelfield-同时保存值与显示文本"></span>
<span id="endfield-把范围拆成两个业务字段"></span>
<span id="vmodelfields-扩展额外-v-model"></span>
<span id="无-field-的节点"></span>
<span id="表格列路径"></span>

完整说明见[字段与数据模型](/manual/fields-and-paths)。

<span id="数据源与双向绑定"></span>

<!-- 章节锚点供站外链接与收藏定位。 -->
<span id="建模与绑定顺序"></span>
<span id="对象与-ref-的差异"></span>
<span id="标准初始模型与当前模型"></span>
<span id="数据动作的边界"></span>
<span id="字段级-ref"></span>
<span id="同时配置-field"></span>
<span id="只有-value-没有-field"></span>
<span id="复合值的双向转换"></span>
<span id="范围拆分"></span>
<span id="数组与逗号字符串"></span>
<span id="选项标签同步"></span>
<span id="扩展组件的多个-v-model"></span>
<span id="提交不是重新组装任意对象"></span>



<!-- 章节定位标识。 -->
<span id="schema-与数据模型"></span>
