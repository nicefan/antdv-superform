# 自定义扩展组件

## 场景说明

适合内置字段不足、需要接入项目私有业务组件的场景，例如：

- 金额输入组件
- 区域选择器
- 业务专属选择弹窗

## 最小 Schema

先注册扩展组件：

```ts
import superform from 'antdv-superform'
import MyAmount from './MyAmount.vue'

superform.registComponent('Amount', MyAmount)
```

再在 schema 中使用：

```ts
{
  type: 'ExtAmount',
  field: 'amount',
  label: '金额',
  attrs: {
    precision: 2,
  },
}
```

## 关键点

- 注册名是 `Amount`，schema 使用时类型名会自动变成 `ExtAmount`
- 扩展组件应尽量保持输入输出简单
- 推荐优先兼容常见的值绑定模式
- 复杂业务组件先做适配层，再注册到 schema 中
