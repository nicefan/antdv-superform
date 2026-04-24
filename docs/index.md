---
layout: home

hero:
  name: "antdv-superform"
  text: "配置驱动的 Ant Design Vue 业务组件库"
  tagline: "用一份 schema 统一构建表单、详情、表格、按钮区与弹窗场景。"
  image:
    src: /logo.svg
    alt: antdv-superform
  actions:
    - theme: brand
      text: 快速开始
      link: /guide/getting-started
    - theme: alt
      text: 查看 SuperTable
      link: /reference/root-table-option

features:
  - title: 一份配置，多处复用
    details: 同一份 schema 可以复用到 SuperForm、SuperDetail 和 SuperTable，减少重复定义与维护成本。
  - title: 面向业务 CRUD
    details: 内置搜索表单、表格编辑、详情展示、按钮区和弹窗能力，适合中后台快速交付。
  - title: 联动与扩展友好
    details: 支持 hidden、disabled、computed、viewRender、自定义组件注册和全局按钮配置。
---

## 为什么选择它

`antdv-superform` 适合这样一类项目：你已经基于 `Vue 3 + Ant Design Vue` 开发中后台，但发现大量页面都在重复写表单项、表格列、搜索区和按钮区逻辑。这个库把这些重复工作抽成声明式 schema，让页面开发更接近“描述业务结构”，而不是“堆模板细节”。

## 你可以用它做什么

- 快速搭建新增 / 编辑 / 查看页面
- 构建带搜索、分页、编辑能力的一体化列表页
- 让表单与详情页共用一份字段配置
- 统一按钮权限、默认样式和全局组件行为
- 通过扩展组件机制接入项目私有业务组件

## 推荐阅读路径

- 初次接入：看 [安装](/guide/installation) 和 [快速开始](/guide/getting-started)
- 做列表页：先看 [RootTableOption](/reference/root-table-option)，再套 [SuperTable 模板](/examples/)
- 查字段：看 [字段类型](/reference/field-types) 和 [场景差异配置](/reference/context-props)
- 给 AI 生成代码：先看 [AI 使用建议](/guide/ai-usage) 和 [示例模板](/examples/)
