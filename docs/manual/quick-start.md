# 快速开始

完成[安装与初始化](/manual/installation)后，从一个包含姓名、状态和提交按钮的表单开始。

## 1. 创建表单

```vue
<template>
  <SuperForm @register="register" @submit="handleSubmit" />
</template>

<script setup lang="ts">
import { ref } from "vue";
import { SuperForm, defineForm, useForm } from "superform-antdv";

const record = ref<{ id?: number; name: string; status: number }>({
  name: "",
  status: 1,
});

const schema = defineForm({
  dataSource: record,
  subSpan: 12,
  buttons: { actions: ["submit", "reset"] },
  subItems: [
    { type: "Hidden", field: "id" },
    {
      type: "Input",
      field: "name",
      label: "姓名",
      required: true,
      // Input 会根据 label 自动生成 placeholder: '请输入姓名'
    },
    {
      type: "Select",
      field: "status",
      label: "状态",
      initialValue: 1,
      options: [
        { label: "启用", value: 1 },
        { label: "停用", value: 0 },
      ],
      // Select 会根据 label 自动生成 placeholder: '请选择状态'
    },
  ],
});

const [register, form] = useForm(schema);

function handleSubmit(data: typeof record.value) {
  console.log("通过校验的表单数据", data);
}
</script>
```

Schema 描述字段、默认值和校验；`useForm` 返回注册函数和动作对象。姓名为空时，提交会提示“姓名不能为空！”。

## 2. 绑定与更新数据

`dataSource: record` 将表单绑定到外部 Ref，输入时会同步修改 `record.value`。

```ts
// 切换到另一条记录，表单随数据源同步
record.value = { id: 8, name: "张三", status: 1 };

// 局部更新表单中的字段
form.setFieldsValue({ status: 0 });
```

需要按 Schema 初始值补齐一条记录时使用 `form.resetFields(data)`；无参数时恢复初始值。完整边界见[数据源与双向绑定](/manual/fields-and-paths#对象与-ref-的差异)。

## 3. 校验与提交

点击内置提交按钮会先执行校验，成功后调用示例中的 `handleSubmit`。业务保存逻辑可放在该回调中。也可以从业务代码主动提交：

```ts
const data = await form.submit();
```

`submit()` 返回数据副本，并同样触发 `submit` 事件。接口保存选择事件回调或命令式调用中的一个位置，避免重复请求。

## 4. 加入一个联动字段

```ts
{
  type: 'TextArea',
  field: 'disableReason',
  label: '停用原因',
  hidden: ({ current }) => current.status !== 0,
  required: ({ current }) => current.status === 0,
}
```

同一个条件同时控制显示和必填。字段隐藏时值不会自动清除；需要清除时在状态字段的 `onUpdate` 中显式处理。详见[响应式与联动](/manual/reactivity#字段状态与联动)。

## 5. 下一步

- [表单 SuperForm](/manual/super-form)：声明式用法、配置与完整动作。
- [基础表单示例](/examples?example=form-basics)：修改并运行代码。
- [员工资料登记](/examples?example=business-employee)与[合同登记](/examples?example=business-contract)：组合字段、容器与联动。

### 完整业务示例 {#完整业务页面}

掌握表单后，可展开合同管理示例，体验查询、列表、编辑与详情。页面配置见 [SuperTable](/manual/super-table)。

<details>
<summary>合同管理：完整业务页面与源码</summary>

<HomeQuickStart />

<<< ../.vitepress/components/HomeQuickStartDemo.vue

</details>

<!-- 章节定位标识。 -->
<span id="示例代码"></span>
<span id="一个示例-覆盖一张业务页面需要的一切"></span>
<span id="_1-创建-schema"></span>
<span id="_2-选择使用方式"></span>
<span id="注册模式-需要命令式动作"></span>
<span id="声明式模式-只由模板驱动"></span>
<span id="_3-回填与局部更新"></span>
