# 快速开始

先直接体验一张完整的合同管理页面，再看实现它需要多少代码。

<HomeQuickStart />

## 示例代码

<<< ../.vitepress/components/HomeQuickStartDemo.vue

## 一个示例，覆盖一张业务页面需要的一切

<div class="feature-grid home-feature-grid">
  <div class="feature-card">
    <strong>一份字段配置，贯穿四个场景</strong>
    <p>合同名称、类型、日期、金额和状态同时服务于查询、列表、编辑与详情，不再重复声明。</p>
  </div>
  <div class="feature-card">
    <strong>完整 CRUD，不堆模板代码</strong>
    <p>查询、新增、修改、删除、批量删除和详情都由稳定的 API 契约驱动，页面只描述业务差异。</p>
  </div>
  <div class="feature-card">
    <strong>字段类型天然懂得如何展示</strong>
    <p>Select 自动映射标签，日期保持统一格式，金额按数值对齐，Switch 可以直接修改状态。</p>
  </div>
  <div class="feature-card">
    <strong>数据源双向同步</strong>
    <p>响应式 dataSource 既提供首屏数据，也持续接收查询和 CRUD 后的最新列表。</p>
  </div>
  <div class="feature-card">
    <strong>列表精简，编辑与详情更完整</strong>
    <p>“合同说明”只在编辑和详情中出现。一处 exclude 配置，就能准确控制字段参与的场景。</p>
  </div>
  <div class="feature-card">
    <strong>按钮理解当前业务状态</strong>
    <p>自定义“归档”按钮读取当前行状态：活动记录可以操作，普通记录自动禁用并说明原因。</p>
  </div>
</div>

**这就是 Antdv SuperForm 的价值：用更少、更集中的代码，交付更完整、更一致的中后台体验。**

下面继续拆解 Schema、模型、自动默认值和动作对象如何配合。

## 1. 创建 Schema

```ts
import { defineForm } from 'antdv-superform'

const schema = defineForm({
  subSpan: 12,
  buttons: { actions: ['submit', 'reset'] },
  subItems: [
    { type: 'Hidden', field: 'id' },
    {
      type: 'Input',
      field: 'name',
      label: '姓名',
      required: true,
      // Input 会根据 label 自动生成 placeholder: '请输入姓名'
    },
    {
      type: 'Select',
      field: 'status',
      label: '状态',
      initialValue: 1,
      options: [
        { label: '启用', value: 1 },
        { label: '停用', value: 0 },
      ],
      // Select 会根据 label 自动生成 placeholder: '请选择状态'
    },
  ],
})
```

这份 Schema 会建立模型 `{ id, name, status }`，并让 `required: true` 自动生成“姓名不能为空！”规则。

## 2. 选择使用方式

### 注册模式：需要命令式动作

```vue
<template>
  <SuperForm @register="register" @submit="handleSubmitted" />
</template>

<script setup lang="ts">
import { SuperForm, useForm } from 'antdv-superform'

const [register, form] = useForm(schema)

async function save() {
  const data = await form.submit()
  await api.save(data)
}

function handleSubmitted(data) {
  console.log('通过校验的数据副本', data)
}
</script>
```

适合提交、回填、弹窗复用或需要从业务代码调用表单实例的页面。

### 声明式模式：只由模板驱动

```vue
<template>
  <SuperForm :schema="schema" :data-source="record" @submit="api.save" />
</template>
```

适合动作很少、外部对象直接作为模型的页面。`dataSource` 会被表单双向修改并按 Schema 补齐字段。

## 3. 回填与局部更新

```ts
// 整条记录回填：缺少字段时回退到 Schema 初始值
form.resetFields({ id: 8, name: '张三' })

// 只更新传入且模型中已经建立的字段
form.setFieldsValue({ status: 0 })

// 读取当前模型引用
const current = form.getData()

// 校验并取得深拷贝结果
const result = await form.submit()
```

`resetFields()` 无参数时恢复 Schema 标准初始模型。模型外字段不会被动作自动加入；需要提交的主键应声明为 Hidden。

## 4. 加入一个联动字段

```ts
{
  type: 'Textarea',
  field: 'disableReason',
  label: '停用原因',
  hidden: ({ current }) => current.status !== 0,
  required: ({ current }) => current.status === 0,
}
```

同一个条件同时控制显示和必填。字段隐藏时值不会自动清除；需要清除时在状态字段的 `onUpdate` 中显式处理。详见[字段状态与联动](/manual/field-state)。

## 5. 下一步

- 理解模型初始化：[字段与数据路径](/manual/fields-and-paths)。
- 掌握完整动作：[表单 SuperForm](/manual/super-form)。
- 查具体字段：[基础输入](/manual/fields/basic-inputs)与[选择输入](/manual/fields/selections)。
- 修改运行代码：[基础表单示例](/examples?example=form-basics)。
- 从真实结构继续练习：[员工资料登记](/examples?example=business-employee) → [客户建档](/examples?example=business-customer) → [合同登记](/examples?example=business-contract)。
