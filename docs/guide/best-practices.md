# 最佳实践

## 1. schema 与页面分离

推荐把 schema 放到独立文件：

- `schema.ts`
- `form.schema.ts`
- `table.schema.ts`

不要把大量 schema 内联在页面组件里，否则页面层会同时承担布局、接口和联动逻辑。

## 2. 表单与详情优先复用一份 schema

如果一个实体既有编辑页也有详情页，优先复用同一份 schema，再通过：

- `viewRender`
- `descriptionsProps`
- `exclude`

来收敛差异。

## 3. 选择类字段优先统一数据来源

在同一项目内，尽量统一这几种写法的边界：

- 静态 `options`
- `dictName + dictApi`
- 远程函数型 `options`

不要同一个业务字段今天用静态数组，明天换对象映射，后天再换远程函数。

## 4. 把联动逻辑控制在 schema 内

适合放在 schema 中的逻辑：

- `hidden`
- `disabled`
- `computed`
- `onUpdate`

不建议把同一份字段联动同时写在：

- schema
- 页面 `watch`
- 模板条件渲染

三处同时维护。

## 5. 表格查询协议保持稳定

推荐统一成：

```ts
{
  current: 1,
  size: 10,
  total: 100,
  records: []
}
```

如果后端不一致，用插件级 `tableApiSetting` 做统一适配，不要在每个页面各写一套转换。

## 6. 自定义组件先做业务适配层

当你要注册扩展组件时，建议先包一层项目内适配，而不是直接把第三方组件原样挂上。

重点约束：

- 输入值格式
- 更新事件
- 查看态显示方式
- 透传属性边界

## 7. 让 AI 只学当前写法

在团队协作和自动生成场景里，文档、示例和模板应只保留当前使用方式。这样 AI 才能稳定输出可落地代码。
