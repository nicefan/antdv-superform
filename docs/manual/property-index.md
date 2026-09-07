# 配置属性索引

本页补充跨组件复用但不适合在每个示例重复展开的公开配置。UI 框架专属属性仍以当前产品包的 TypeScript 提示为准。

## Form 与 FormItem

| 属性 | 作用 |
| --- | --- |
| `colon` / `noColon` | 控制表单标签冒号；新代码优先使用当前 Adapter 支持的 Form 属性 |
| `hideRequiredMark` | 隐藏必填标记 |
| `scrollToFirstError` | 校验失败时滚动到第一个错误字段 |
| `validateOnRuleChange` | rules 改变后是否重新校验 |
| `hasFeedback` | 显示字段校验反馈图标 |
| `help` | 自定义字段帮助或错误内容 |
| `htmlFor` | 指定标签关联的控件 id |
| `validateStatus` | 显式设置字段校验状态 |

## 布局

Row 常用 `justify`、`wrap`；Col 常用 `flex`、`offset`、`order`、`pull`、`push`；Space 常用 `direction`。这些属性由 Adapter 映射到当前 UI 框架的布局能力。

## 容器与展示

- Descriptions 使用 `column`、`contentStyle`、`labelStyle` 控制列数和内容样式。
- Modal 的 `content` 表示弹窗内容。
- Card、Tabs、Collapse 等标题区域可使用 `extra`。
- Tabs/Collapse 项可以使用 `defaultActiveKey`；关闭能力对应组件支持的 `closeIcon`。

完整容器结构见[布局容器](/manual/fields/containers)，弹窗配置见[SuperModal](/manual/super-modal)。

## Table 与 Upload

- 分页对象使用 `current`、`pageSize`、`total`。
- 弹窗打开参数中的 `data` 用于传入业务数据；TreeSelect 的旧 `data` 已迁移为 `treeData`。
- Upload 可在 `vModelFields` 中通过 `fileList` 指定附加文件列表字段。
- `uploadMode` 支持 `auto`、`submit`、`custom`、`base64`、`text`，用于选择上传或内容转换时机。

只配置 UI 外观时放入当前节点 `attrs`；影响模型、接口或 Core 流程的配置使用手册明确列出的 Schema 属性。
