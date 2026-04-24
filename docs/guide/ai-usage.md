# AI 使用建议

这套文档只面向当前使用方式，不覆盖兼容层字段，也不解释历史写法。目标是让 AI 直接生成可用于现有业务的代码。

## 推荐输入信息

在让 AI 生成页面前，至少应明确这些信息：

- 当前页面是 `表单`、`详情`、`表格`，还是组合场景
- 是否需要复用同一份 schema
- 数据来源是本地对象还是远程接口
- 是否存在搜索区
- 是否需要弹窗编辑
- 选择类字段的选项来源是静态、字典还是远程接口
- 提交时是直接提交字段值，还是需要额外转换

## 推荐生成顺序

1. 先确定使用 `defineForm`、`defineTable` 或 `defineDetail`
2. 先写 `subItems` / `columns` 的结构
3. 再补 `rules`、`hidden`、`disabled`、`computed`
4. 最后补 `buttons`、`rowButtons`、`rowEditor`、`slots`

不要先写复杂副作用，再回头拼字段结构。

## 推荐输出风格

- 优先用 `defineForm` / `defineTable`
- 优先把 schema 独立成常量或单独文件
- 优先使用 `exclude`
- 优先使用 `rowEditor`
- 对表格查询，优先返回标准分页结构
- 对选择类字段，优先明确 `options`、`labelField`、值转换策略

## 推荐提示模板

```txt
请基于 antdv-superform 生成一个用户管理页面：
- 使用 defineTable
- 包含搜索区、表格、弹窗编辑
- 查询接口返回 current/size/total/records
- 编辑弹窗使用 rowEditor
- 状态字段用 Select，选项固定为启用/停用
- 部门字段保存 deptId，并通过 labelField 同步 deptName
```

## 结论

这套库最适合结构明确、约束明确的业务页。输入信息越完整，生成结果越稳定。
