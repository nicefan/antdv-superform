# 基础概念

在使用 `antdv-superform` 之前，先建立三个关键认知，会更容易上手。

## 1. Schema 是第一入口

这个库的核心不是“先写模板，再补逻辑”，而是“先定义 schema，再交给组件渲染”。

一个 schema 会描述：

- 页面有哪些字段
- 字段属于什么类型
- 字段怎么校验
- 字段在什么条件下显示、禁用或联动
- 是否需要分组、分页签、折叠区或表格承载

## 2. 同一份配置可以复用到不同视图

你定义的字段结构，不只可以用于表单，还可以复用到：

- 详情展示
- 表格行编辑
- 弹窗表单

这也是它和普通表单封装最大的区别之一。

## 3. 组件负责渲染，Hook 负责控制

通常配套使用方式是：

- `SuperForm` / `SuperTable` / `SuperDetail` 负责渲染
- `useForm` / `useTable` / `useDetail` 负责注册和实例控制

例如：

```ts
const [register, form] = useForm(schema)
```

其中：

- `register` 用来把 schema 和组件实例连接起来
- `form` 提供提交、重置、赋值等实例方法

## 常见 schema 字段

你会最常接触这些配置项：

- `type`
- `field`
- `label`
- `initialValue`
- `rules`
- `attrs`
- `hidden`
- `disabled`
- `computed`
- `viewRender`
- `subItems`

## 常见类型

字段组件类型：

- `Input`
- `Select`
- `Switch`
- `DatePicker`
- `DateRange`
- `Upload`

容器类型：

- `Group`
- `Card`
- `Tabs`
- `Collapse`
- `List`
- `Table`

## 理解方式建议

如果你第一次接触这类声明式库，不要试图一次看全所有类型。更高效的方式是：

1. 先掌握 `Input`、`Select`、`DateRange`
2. 再理解 `Group`、`Tabs`、`Table`
3. 最后再看联动、上传、自定义组件这些高级能力
