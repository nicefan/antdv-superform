## 数据源与双向绑定

SuperForm 的数据模型由两部分共同决定：Schema 给出稳定的结构和标准初始值，`dataSource` 给出本次业务记录。这样无论新增空记录、编辑不完整记录，还是切换到另一条记录，表单始终知道应有哪些字段以及如何重置。

### 建模与绑定顺序

内部流程可以概括为：

```text
1. 从空对象开始
2. 按 Schema 建立完整字段结构
3. 克隆为“标准初始模型”
4. 读取并绑定 dataSource
5. 按 Schema 补齐 dataSource 缺失字段
```

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

### 对象与 Ref 的差异

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

这适合弹窗复用同一个表单编辑多条记录。`useForm` 只接收 Schema；不要使用旧式 `useForm(schema, record)`，外部对象统一通过 Schema 的 `dataSource` 绑定。

### 标准初始模型与当前模型

两者用途不同：

| 模型         | 来源                                            | 用途                   |
| ------------ | ----------------------------------------------- | ---------------------- |
| 标准初始模型 | Schema 的 `initialValue` / `value` / 结构默认值 | 无参数重置、缺省值回退 |
| 当前模型     | 当前 `dataSource` 或内部对象                    | 输入绑定、联动、提交   |

例如编辑记录中 `name` 为“张三”，但 Schema 的 `initialValue` 为 `''`；调用无参数 `resetFields()` 后，字段恢复为 `''`，不是恢复到第一次传入的“张三”。需要把一条记录作为重置目标时，应显式传入：

```ts
form.resetFields(recordSnapshot);
```

### 数据动作的边界

| 动作                       | 语义                                   | 是否增加模型外字段 |
| -------------------------- | -------------------------------------- | ------------------ |
| `getData()` / `dataSource` | 读取当前绑定模型                       | 不适用             |
| `setFieldsValue(partial)`  | 只更新已建立且本次提供的字段           | 否                 |
| `resetFields()`            | 按已建立字段恢复标准初始值             | 否                 |
| `resetFields(record)`      | 按已建立字段从记录回填，缺项回退初始值 | 否                 |
| `submit()`                 | 校验后返回当前模型深拷贝               | 否                 |

```ts
form.setFieldsValue({
  name: "王五",
  unknown: 123, // Schema 模型中没有该字段，不会被加入
});
```

对象会按已建立结构递归更新，数组和新对象会深拷贝后替换，避免直接复用传入集合引用。`setFieldsValue` 只处理参数中实际出现的字段；未提供的字段保持不变。

需要提交 `id`、版本号等不可见字段时，请用 `Hidden` 把它们加入 Schema 模型，而不是依赖动作保留任意外部属性。详见[字段与数据路径：无 field 的节点](/manual/schema#无-field-的节点)。

### 字段级 Ref

节点的 `value` 可以直接绑定外部 Ref。

#### 同时配置 field

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

#### 只有 value，没有 field

```ts
{
  type: 'Input',
  value: keyword,
}
```

控件直接更新 `keyword.value`，但它没有模型路径，不进入表单提交数据。适合临时筛选器或只服务于页面交互的控件。

### 复合值的双向转换

有些字段在控件值和业务模型之间存在转换层。

#### 范围拆分

```ts
{
  type: 'DateRange',
  field: 'startDate',
  endField: 'endDate',
}
```

控件使用 `[startDate, endDate]`，模型保存两个字段。任一模型字段在外部变化时，控件范围都会重新同步。详见[DateRange 值模式](/manual/fields/date-time#daterange-的三种值模式)。

#### 数组与逗号字符串

```ts
{
  type: 'Select',
  field: 'roleIds',
  stringifyValue: true,
  attrs: { mode: 'multiple' },
}
```

控件使用数组，模型保存逗号字符串：

```text
['admin', 'editor'] ↔ 'admin,editor'
```

#### 选项标签同步

```ts
{
  type: 'Select',
  field: 'departmentId',
  labelField: 'departmentName',
  options: departments,
}
```

一次选择同时更新值字段与文本字段；完整语义见[选择输入：通用选项](/manual/fields/selections#通用-options-格式)。

#### 扩展组件的多个 v-model

自定义字段可以通过 `vModelFields` 将额外 v-model 映射到同级字段或 Ref，见[注册自定义字段](/manual/custom-fields#多个-v-model)。

### 提交不是重新组装任意对象

`submit()` 的结果是当前标准模型的深拷贝。这个约束使提交字段可由 Schema 审核，也保证重置、校验和提交围绕同一套路径工作。若后端参数结构不同，建议在 API 层显式转换，相关约定见[接口与数据适配](/manual/backend-contracts)。
