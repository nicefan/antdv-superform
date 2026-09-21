---
search: false
prev: false
next: false
---

# 组件与 Adapter 边界

按主题查看配置与使用说明。

<!-- 章节锚点供站外链接与收藏定位。 -->

## 三种组件来源

[查看三种组件来源](/manual/ui-decoupling#三种组件来源)

## 修改默认属性

[查看修改默认属性](/manual/global-config#defaultprops-合并顺序)

## 固定 UI 的项目级覆盖

[查看 fixed render 与 initialize overrides](/manual/ui-decoupling#固定-ui-render-与业务覆盖)

只调整字段原生属性使用 `attrs` / `defaultProps`；单个 Group 使用 Schema `component`；整个项目替换 Group、Tabs、Table 等固定 UI 结构时，在首次 `initialize({ overrides: { render } })` 中覆盖对应渲染器。

## 何时需要自定义 Adapter

[查看何时需要自定义 Adapter](/manual/ui-decoupling#何时需要自定义-adapter)



<!-- 章节定位标识。 -->
<span id="迁移旧覆盖配置"></span>
