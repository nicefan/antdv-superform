# 表单 SuperForm

SuperForm 是根表单容器，负责建立标准模型、绑定数据源、组织校验、等待子组件提交任务并暴露表单动作。`Form` 对应的就是 SuperForm，不需要在 `subItems` 中再放一个 Form 容器。

## 两种使用方式

### useForm 注册模式

```vue
<template>
  <SuperForm @register="register" />
</template>

<script setup lang="ts">
import { SuperForm, useForm } from "antdv-superform";

const [register, form] = useForm({
  subSpan: 12,
  subItems: [{ type: "Input", field: "name", label: "名称" }],
});

const save = async () => api.save(await form.submit());
</script>
```

Schema 也可以由函数或 Promise 异步提供，适合根据权限加载配置。动作对象在组件挂载前即可稳定持有，实际调用会等待内部实例。

### props 声明式模式

```vue
<SuperForm
  :schema="schema"
  :data-source="record"
  :is-container="true"
  @submit="handleSubmit"
  @reset="handleReset"
/>
```

只需渲染和监听事件时更直接；需要频繁提交、回填或操作底层实例时优先注册模式。

## 根 Schema 属性

| 属性                | 类型            | 默认值  | 作用与适用场景                                    |
| ------------------- | --------------- | ------- | ------------------------------------------------- |
| `subItems`          | array           | 必填    | 字段、容器和辅助节点                              |
| `dataSource`        | object/Ref      | `{}`    | 外部双向模型；缺失字段会按 Schema 补齐            |
| `attrs`             | object          | `{}`    | 传给 Ant Design Vue Form，如 `layout`、`labelCol` |
| `isContainer`       | boolean         | `false` | 增加页面容器样式，适合独立页面表单                |
| `compact`           | boolean         | `false` | 减少纵向间距，适合搜索或密集编辑                  |
| `ignoreRules`       | boolean         | `false` | 关闭触发校验并隐藏必填标识，仅适合搜索表单        |
| `subSpan`           | number/string   | `8`     | 子项默认栅格；字符串仅支持 `'auto'`               |
| `gutter`            | number          | `16`    | Row 间距                                          |
| `rowProps`          | object          | `{}`    | 根 Row 响应式布局属性                             |
| `buttons`           | array/object    | —       | 表单按钮；根表单没有默认按钮                      |
| `descriptionsProps` | object          | —       | Schema 被详情场景复用时控制只读布局               |
| `title`             | string/function | —       | 继承自分组配置；通常由页面标题承担                |
| `slots`             | object          | —       | 把根插槽交给内部节点使用                          |

`attrs` 与布局配置不要混用：

```ts
{
  subSpan: 12, // SuperForm 栅格
  gutter: 24,
  attrs: {
    layout: 'horizontal', // Ant Design Vue Form
    labelCol: { span: 6 },
  },
}
```

## 表单按钮

```ts
buttons: {
  placement: 'bottom',
  align: 'center',
  actions: ['submit', 'reset'],
}
```

可用宿主动作是 `submit`、`reset`、`search`。`placement` 对比：

| 值       | 布局           | 适合场景           |
| -------- | -------------- | ------------------ |
| `top`    | 内容上方       | 筛选器或顶部工具条 |
| `bottom` | 内容下方       | 标准编辑表单       |
| `inline` | 进入当前栅格行 | 单行查询条件       |

完整按钮属性见[按钮组 SuperButtons](/manual/super-buttons)。

## Schema 回调与组件事件

```ts
const schema = {
  onSubmit(data) {
    return api.precheck(data);
  },
  onReset(data) {
    console.log("重置后的副本", data);
  },
  subItems: [],
};
```

提交顺序：字段校验 → Upload 等注册任务 → `schema.onSubmit(data)` → 组件 `submit` 事件 → 返回深拷贝。`onSubmit` 返回 `false` 或 `{ errMessage }` 会拒绝提交。

## useForm 动作

| 动作/属性                 | 类型     | 默认值 | 返回与行为                                     |
| ------------------------- | -------- | ------ | ---------------------------------------------- |
| `submit()`                | function | —      | `Promise`；完成完整提交流程并返回数据副本      |
| `resetFields(data?)`      | function | —      | 无参数恢复 Schema 初始值；有参数按标准模型回填 |
| `setFieldsValue(partial)` | function | —      | 只更新已建立且本次提供的字段                   |
| `getData()`               | function | —      | 当前模型引用                                   |
| `dataSource`              | Ref      | `{}`   | 指向当前模型的只读 computed                    |
| `getForm()`               | function | —      | 等待并返回内部表单实例                         |
| `asyncCall(name, param?)` | function | —      | 调用内部实例能力的逃生口                       |

```ts
form.setFieldsValue({ status: 1 });
form.resetFields({ id: 8, name: "张三" });
const data = await form.submit();
```

`asyncCall` 只在确实没有稳定动作时使用；例如直接调用明确的 `submit()` 比 `asyncCall('submit')` 更清楚。

## dataSource 使用选择

```ts
// 需要与外部记录实时双向同步
const record = ref({ id: 1, name: "张三" });
const [register] = useForm({ dataSource: record, subItems });

// 不希望编辑时直接修改列表原记录
form.resetFields(structuredClone(row));
```

前者适合状态共享，后者适合“确认后才保存”的编辑体验。模型细节见[Schema 与数据模型](/manual/schema#数据源与双向绑定)。

## 从字段练习到业务表单

示例区按两条线组织：字段示例用于同屏比较同一组件的不同配置；业务示例按复杂度逐步组合校验、联动、容器和明细数据。

1. [员工资料登记（基础）](/examples?example=business-employee)：字段、默认值、校验与提交。
2. [客户建档（进阶）](/examples?example=business-customer)：客户类型切换、动态显隐与条件必填。
3. [销售订单（进阶）](/examples?example=business-order)：可编辑订单明细、行金额与订单合计。
4. [合同登记（综合）](/examples?example=business-contract)：合同双方、期限、金额、付款计划和附件。
5. [合同审批（综合）](/examples?example=business-contract-approval)：只读摘要、审批结果与风险意见联动。
