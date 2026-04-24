# 约束与坑点

这一页记录当前版本最容易踩的点。

## 1. `valueToLabel` / `valueToNumber` / `valueToString` 要明确目标

选择类字段支持多种值转换，但要清楚你最终要提交的是什么：

- 原始值
- 数字值
- 标签文本
- 逗号拼接字符串

如果字段在不同页面里用不同转换方式，后续会很难统一。

## 2. `Upload` 组件同时支持 `value` 与 `fileList`

这会带来双数据源问题。推荐规则：

- 只需要提交文件标识时，用 `value + valueKey`
- 需要完整文件列表时，用 `fileList`

不要在同一业务里同时把两者都作为主数据源。

## 3. 表格查询结果最好统一格式

推荐统一为：

```ts
{
  current,
  size,
  total,
  records,
}
```

## 4. `computed` 更适合派生值，不适合复杂副作用

适合：

- 根据另一个字段自动计算展示值
- 自动同步简单派生值

不适合：

- 发请求
- 弹窗
- 大量跨字段副作用

复杂副作用建议移到页面逻辑层。

## 5. 扩展组件名称会自动带 `Ext` 前缀

注册：

```ts
superform.registComponent('Amount', MyAmount)
```

使用：

```ts
{ type: 'ExtAmount' }
```

不是直接写 `Amount`。
