# Schema 约定

这一页不列历史写法，只说明当前推荐的 schema 组织方式。

## 推荐结构

```ts
export const userFormSchema = defineForm({
  attrs: {},
  buttons: ['submit', 'reset'],
  subItems: [],
})
```

## 命名建议

- 表单：`xxxFormSchema`
- 表格：`xxxTableSchema`
- 详情：`xxxDetailSchema`

## 字段顺序建议

推荐字段按这个顺序书写，便于阅读：

```ts
{
  type: 'Input',
  field: 'name',
  label: '姓名',
  initialValue: '',
  rules: { required: true },
  attrs: {},
  hidden: false,
  disabled: false,
}
```

## 推荐约束

- `type` 必填
- 输入类节点尽量显式声明 `field`
- 容器节点统一使用 `subItems`
- 复杂函数逻辑尽量写成具名函数，不要内联太多层

## 不推荐的写法

- 在一个节点上同时叠加过多联动函数
- 把页面级接口逻辑直接写进字段函数
- 在文档、示例和模板里混入非当前使用方式
