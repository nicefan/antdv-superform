# 校验机制

校验仍由 Ant Design Vue Form 执行，SuperForm 负责把更贴近业务的 Schema 声明展开成 FormItem 规则，并把当前数据上下文交给自定义校验器。简单字段保持简洁，复杂约束仍可完整表达。

<span id="字段校验规则"></span>

## required：必填规则 {#required-的自动展开}

最常见的必填字段只需声明：

```ts
{
  type: 'Input',
  field: 'name',
  label: '姓名',
  required: true,
}
```

运行时可理解为自动生成：

```ts
{
  rules: [
    // required: true 根据 label 自动生成必填规则和提示文案
    { required: true, message: '姓名不能为空！' },
  ],
}
```

这既控制标签的必填标识，也参与提交校验。对于字符串类规则，默认必填检查还会拒绝纯空白内容。原始 Schema 不会被改写，以上只是等价的运行结果。

如需业务文案，把 `required` 与 `rules` 合并使用：

```ts
{
  type: 'Input',
  field: 'name',
  label: '姓名',
  required: true,
  rules: {
    message: '请填写合同签署人姓名',
  },
}
```

当 `rules` 已存在时，`required` 会合入第一项规则，再按规则类型展开；无需再重复写一条 `{ required: true }`。

## 动态必填 {#动态必填}

`required` 可以是依赖模型的函数：

```ts
{
  type: 'TextArea',
  field: 'rejectReason',
  label: '驳回原因',
  required: ({ current }) => current.result === 'reject',
}
```

框架会保留生成好的规则，并根据函数结果决定当前是否启用第一条必填规则，同时更新必填标识。这样规则结构稳定，状态随模型变化。

字段被禁用时，当前字段的规则整体暂停；隐藏字段并不等于禁用，隐藏后其模型仍存在，是否校验应由 `required` 条件明确控制：

```ts
const showReason = ({ current }) => current.result === 'reject'

{
  type: 'TextArea',
  field: 'rejectReason',
  hidden: (data) => !showReason(data),
  required: showReason,
}
```

## rules：规则与提示 {#rules-的展开方式}

`rules` 接受单个对象或数组。一个规则对象可以产生多条实际规则，例如同时声明必填、格式和长度：

```ts
{
  type: 'Input',
  field: 'account',
  label: '账号',
  rules: {
    required: true,
    type: 'word',
    min: 4,
    max: 20,
    trigger: 'blur',
  },
}
```

需要让每个约束拥有独立提示时，使用数组：

```ts
{
  type: 'Input',
  field: 'mobile',
  label: '手机号',
  rules: [
    { required: true, message: '请输入手机号' },
    { type: 'mobile', message: '手机号格式不正确' },
  ],
}
```

支持的规则能力包括：

| 配置          | 类型             | 默认值     | 作用                              |
| ------------- | ---------------- | ---------- | --------------------------------- |
| `required`    | boolean/function | `false`    | 必填，并基于 `label` 生成默认提示 |
| `type`        | string           | 自动推断   | 内置类型或扩展格式                |
| `pattern`     | RegExp           | —          | 正则校验                          |
| `len`         | number           | —          | 固定长度或数值                    |
| `min` / `max` | number           | —          | 字符长度或数值范围                |
| `trigger`     | string/array     | 组件默认值 | `blur` 或 `change`                |
| `message`     | string           | 自动生成   | 覆盖默认提示                      |
| `validator`   | function         | —          | 访问上下文的业务校验              |

内置扩展类型为 `email`、`integer`、`number`、`idcard`、`phone`、`mobile`、`twoDecimal` 和 `word`。其中 `integer`、`number` 会在校验时转换为 Number 判断；它们不会因此改变模型中原本的存储类型。

## validator：自定义校验 {#自定义校验器}

SuperForm 将 Ant Design Vue 校验器包装为更符合 Schema 回调习惯的签名：

```ts
{
  type: 'Input',
  field: 'mobile',
  label: '手机号',
  rules: {
    validator: ({ current }, value) => {
      if (value === current.backupMobile) {
        return new Error('手机号不能与备用手机号相同')
      }
      return true
    },
  },
}
```

第一个参数是当前 `effectData`，第二个参数是字段值。以下结果表示失败：

- 返回 `false`。
- 返回 `Error`。
- 返回 rejected Promise，或异步函数抛出错误。

异步示例：

```ts
validator: async (_effectData, value) => {
  const exists = await api.checkCode(value);
  return exists ? new Error("编码已存在") : true;
};
```

不要在校验器里修正字段值；值转换或派生应使用输入事件、`onUpdate` 或 `computed`，避免一次校验意外触发另一轮校验。

<span id="校验触发与提交"></span>

## 校验与提交顺序 {#提交流程}

`form.submit()` 会先校验字段，再等待 Upload 等提交任务。完整执行顺序与 `onSubmit` 拦截行为见[SuperForm：Schema 回调与组件事件](/manual/super-form#schema-回调与组件事件)。

FormItem 全局默认 `validateFirst: true`，即同一字段遇到首个失败规则后停止。可通过[全局配置](/manual/global-config)或节点的 `formItemProps` 调整。

## ignoreRules：搜索校验 {#ignorerules-的边界}

`ignoreRules` 会隐藏必填标识并把表单的 `validateTrigger` 设为 `none`。SuperTable 的搜索表单会自动使用它，因为搜索条件不应阻止查询；普通新增或编辑表单不建议开启。

SuperForm 的完整提交、重置和动作 API 见[表单 SuperForm](/manual/super-form)。

## InputGroup 紧凑分组校验

`InputGroup` 的 `rules.validator` 可校验整个绑定对象。在 `InputList.columns` 中配置单个无 `field` 的 InputGroup 时，分组绑定当前行，validator 的第二参数就是行对象；子项仍可配置各自的规则。

```ts
columns: [{
  type: 'InputGroup',
  rules: {
    validator: (_context, row) =>
      !!(row.value1?.trim() || row.value2?.trim()) || new Error('至少填写一项'),
  },
  subItems: [
    { type: 'Input', field: 'value1', rules: { min: 2 } },
    { type: 'Input', field: 'value2' },
  ],
}]
```

组规则与子字段规则均参与校验。
