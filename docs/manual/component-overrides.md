# 替换底层组件

`components` 用于全局替换组件库内部依赖的 Ant Design Vue 基础组件，适合统一埋点、主题、可访问性或企业级二次封装。它与注册业务字段不同：替换 Input 会影响所有 Input Schema。

## 安装时替换

```ts
app.use(SuperFormPlugin, {
  components: {
    Input: ProjectInput,
    Table: ProjectTable,
    Modal: ProjectModal,
  },
});
```

## 可替换名称

| 分类          | 名称                                                              |
| ------------- | ----------------------------------------------------------------- |
| 布局与反馈    | `Divider`、`Tooltip`、`Space`                                     |
| 表单          | `FormItem`、`InputGroup`                                          |
| 按钮/菜单     | `Button`、`MenuItem`、`Menu`、`Dropdown`                          |
| 容器          | `Card`、`ListItem`、`List`、`Modal`、`Table`                      |
| Tabs/Collapse | `Tabs`、`TabPane`、`Collapse`、`CollapsePanel`                    |
| 文本输入      | `Input`、`InputSearch`、`InputNumber`                             |
| 选择          | `Select`、`TreeSelect`、`Switch`                                  |
| 日期时间      | `DatePicker`、`RangePicker`、`TimePicker`                         |
| 单复选        | `Radio`、`RadioButton`、`RadioGroup`、`Checkbox`、`CheckboxGroup` |

名称区分大小写，并表示组件库内部槽位，不等同于 Schema `type`。

## 包装组件必须保持的契约

```vue
<template>
  <AInput
    v-bind="$attrs"
    :value="value"
    @update:value="emit('update:value', $event)"
  >
    <template v-for="(_, name) in $slots" #[name]="slotProps">
      <slot :name="name" v-bind="slotProps || {}" />
    </template>
  </AInput>
</template>
```

- 接收对应 Ant Design Vue props 与 HTML attributes。
- 透传默认和具名插槽。
- 保持原 v-model 名称与事件，例如 `value` / `update:value`。
- 不改变 `change`、`search`、`select` 等事件参数。
- 透传 `ref` 或暴露原组件关键方法。
- Form、Table、Modal 尤其要保留校验、滚动、关闭等实例能力。

## 替换与扩展字段对比

| 需求                         | 入口                           |
| ---------------------------- | ------------------------------ |
| 所有 Input 自动埋点          | `components.Input`             |
| 所有 Table 统一空状态        | `components.Table`             |
| 单个页面自定义一次输入       | InputSlot                      |
| 多页面复用“用户选择器”       | `registerComponent` 注册 Ext\* |
| 只改一个 Schema 的底层 props | 当前节点 `attrs`               |

替换范围很大，建议为包装组件写 v-model、事件、插槽和 ref 冒烟测试。业务字段扩展见[注册自定义字段](/manual/custom-fields)。
