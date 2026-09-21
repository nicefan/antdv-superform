# 介绍

SuperForm 是面向 Vue 3 的 Schema 驱动界面库，官方提供 AntDV Next 与 Element Plus 产品包。它用同一套字段定义组织表单输入、表格列、详情展示、数组编辑和业务按钮，适合字段重复度高、交互规则集中、需要统一接口契约的中后台应用。

## 它解决什么问题

普通后台页面通常需要分别维护表单、列表列、详情和编辑弹窗。字段越多，标签、字典、校验和只读展示越容易不一致。SuperForm 将稳定的业务描述放进 Schema：

```ts
const statusField = {
  type: "Select",
  field: "status",
  label: "状态",
  options: { dictName: "enabled_status" },
  required: true,
};
```

这项定义可以同时提供：

- 表单中的 Select、必填标识和校验。
- 表格中的状态列和字典标签。
- 详情中的只读文本或 Tag。
- 编辑弹窗中的回显和提交字段。

Schema 不是为了取代 Vue，而是把重复、结构化的部分标准化。复杂业务内容仍可使用插槽、渲染函数和扩展组件。

## 三层结构

```text
页面组件
├─ SuperForm：表单生命周期
├─ SuperTable：独立查询数据与 API 生命周期
├─ SuperDetail：只读详情
├─ SuperModal：命令式弹窗
└─ SuperButtons：统一动作体系
        ↓
结构容器
├─ Group / Card / Tabs / Collapse / Descriptions
└─ InputList / GroupList / CardList / TabList / CollapseList / Table
        ↓
字段组件
└─ Input / Select / DateRangePicker / Upload / 项目业务字段 ...
```

页面组件负责完整场景，容器负责嵌套和数组结构，字段负责一个具体值的输入与展示。特别需要区分：页面级 SuperTable 管理独立数据与查询 API；字段级 Table 管理模型内部数组及编辑能力。

## 适合与不适合的场景

| 场景                             | 建议                                  |
| -------------------------------- | ------------------------------------- |
| 配置型新增/编辑表单              | 优先 SuperForm                        |
| 查询、分页、CRUD 列表            | 优先 SuperTable                       |
| 详情页或嵌入式只读分组           | SuperDetail / Descriptions            |
| 对象数组编辑                     | InputList、GroupList、CardList、TabList、CollapseList 或 Table   |
| 高度定制的少量输入               | InputSlot 或注册项目业务字段           |
| 自由画布、图表编排、非结构化页面 | 使用普通 Vue 页面，局部接入字段或按钮 |

## 环境要求

| 依赖 | 版本 |
| --- | --- |
| Vue | `>= 3.5.0` |
| AntDV Next | `>= 1.5.0` |
| Element Plus | `>= 2.14.5` |

两者是 peer dependency，应由业务应用安装并保持单实例。

## 推荐阅读路径

1. [安装](/manual/installation)：选择产品包、初始化 Adapter 并接入字段组件。
2. [快速开始](/manual/quick-start)：体验一张包含查询和 CRUD 的完整 SuperTable 页面。
3. 阅读 [Schema 概览](/manual/schema)和[字段与数据模型](/manual/fields-and-paths)，了解配置位置、模型初始化与外部数据绑定。
4. 根据当前问题阅读[布局与结构](/manual/layout)、[响应式与联动](/manual/reactivity)、[校验机制](/manual/validation)或[渲染与插槽](/manual/rendering)。
5. 按需求进入“页面组件”或“字段组件”，再到[示例](/examples)中修改完整可运行代码。

查找具体函数、动作或配置时，直接进入 [API 索引](/api)。

准备把组件库交给 AI 编码工具时，再阅读 [AI 编码指引](/manual/ai-guide)和 [Schema 诊断](/manual/schema-diagnostics)。
