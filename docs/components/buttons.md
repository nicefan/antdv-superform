# SuperButtons / useButtons

按钮系统既可以独立使用，也可以作为表单、详情、表格的一部分复用。

## `SuperButtons`

适合直接在模板中渲染按钮组：

```vue
<SuperButtons :actions="['submit', 'reset']" />
```

## `useButtons`

适合在脚本中生成可复用的按钮节点：

```ts
import { useButtons } from 'antdv-superform'

const [Buttons] = useButtons({
  actions: [
    { label: '刷新', onClick: () => console.log('reload') },
    { name: 'add', label: '新增' },
  ],
})
```

## 内置动作

默认按钮动作包括：

- `add`
- `delete`
- `edit`
- `detail`
- `submit`
- `search`
- `reset`

这些动作可以通过插件级 `defaultButtons` 覆盖，也可以在单次配置中追加 `attrs`、`confirmText`、`onClick`。

## 常见字段

- `actions`
- `limit`
- `buttonType`
- `buttonShape`
- `size`
- `align`
- `placement`
- `labelMode`
- `divider`
- `moreLabel`
- `methods`
- `effectData`
