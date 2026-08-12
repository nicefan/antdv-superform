# 字典与权限接入

字典解决“业务值如何显示”，按钮权限解决“当前用户是否看到或操作动作”。两者都是前端适配层，不替代后端数据校验和鉴权。

## 字典接入

```ts
app.use(SuperFormPlugin, {
  dictApi: async (name) => {
    const result = await dictionaryApi.get(name);
    return result.map((item) => ({
      label: item.name,
      value: item.code,
      disabled: item.disabled,
    }));
  },
});
```

字段只声明名称：

```ts
{ type: 'Select', field: 'status', label: '状态', dictName: 'enabled_status' }
```

同一结果用于 Select 选项以及表格、详情的只读映射。

### options 与 dictName 的选择

| 来源               | 适合场景               |
| ------------------ | ---------------------- |
| `options` 静态数组 | 页面常量、不会复用     |
| `options` Ref/函数 | 依赖当前模型或实时接口 |
| `dictName`         | 跨页面共享的标准字典   |

组件库不内置缓存。缓存、请求合并、过期和租户隔离应在 dictApi 中完成：

```ts
const cache = new Map();

async function dictApi(name) {
  if (!cache.has(name)) cache.set(name, api.getDictionary(name));
  return cache.get(name);
}
```

## 标签展示

options 或 dictName 存在时只读默认使用 Tag。字段级配置优先于全局：

```ts
// 全局颜色序列
tagViewer: ['blue', 'green', 'orange']

// 全局值到颜色
tagViewer: { enabled: 'green', disabled: 'default' }

// 当前字段关闭 Tag
{ type: 'Select', field: 'status', dictName: 'status', tagViewer: false }

// 当前字段完整规则
{
  type: 'Select',
  field: 'status',
  options: statusOptions,
  tagViewer: (value) => ({
    label: value === 'error' ? '异常' : '正常',
    color: value === 'error' ? 'red' : 'green',
  }),
}
```

`tagViewer` 还接受字符串数组、值到颜色对象、`{ label?, value, color, icon? }[]`。只想显示普通选项文字时设为 `false`。

项目中的状态值通常是稳定的，更推荐在全局函数中把值、显示标签和语义色一起标准化：

```ts
app.use(SuperFormPlugin, {
  tagViewer(value) {
    const statusMap: Record<string, { label: string; color: string }> = {
      0: { label: "停用", color: "default" },
      1: { label: "启用", color: "green" },
      2: { label: "异常", color: "red" },
    };
    return statusMap[String(value)];
  },
});
```

函数只接收当前值；返回颜色字符串时保留 options/dictName 提供的标签，返回对象时可以同时覆盖 `label`、`color` 和 `icon`。

## 按钮权限

```ts
app.use(SuperFormPlugin, {
  buttonRoles: () => permissionStore.currentRoles,
});
```

`buttonRoles()` 在按钮组或表格操作列构建时读取当前权限数组，不会持续监听 store。路由权限模式下，应先在导航守卫或页面进入阶段更新当前页面权限，再挂载页面；同一页面内权限发生变化时，需要让相关按钮组重新创建。

```ts
{
  name: 'delete',
  roleName: 'user:delete',
  unauthorized: 'disable',
  disabledTooltip: '当前账号没有删除权限',
}
```

| 配置                      | 行为         |
| ------------------------- | ------------ |
| 无 `roleName`             | 不做权限过滤 |
| 命中角色                  | 正常显示     |
| 未命中，默认              | 隐藏         |
| `unauthorized: 'hide'`    | 明确隐藏     |
| `unauthorized: 'disable'` | 显示但禁用   |

按钮组也可设置统一 `unauthorized`，单按钮配置优先。

## 可见场景与业务状态

权限、场景、动态状态是三层不同判断：

```ts
{
  name: 'approve',
  roleName: 'order:approve',
  visibleIn: 'detail',
  hidden: ({ record }) => record.status !== 'pending',
  disabled: ({ record }) => record.locked,
}
```

- `roleName`：用户是否有权限。
- `visibleIn`：表单/详情场景是否展示。
- `hidden` / `disabled`：当前业务数据是否允许操作。

## 安全边界

按钮权限只控制前端界面。后端必须再次校验用户身份、资源范围和动作权限。字段级权限可在生成 Schema 前过滤，或用 `hidden` / `disabled` 响应业务状态。
