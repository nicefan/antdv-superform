## 事件与上下文

Schema 事件不是简单转发底层组件事件。SuperForm 会先注入当前字段的数据上下文，再追加组件原始参数，让同一套回调写法可以用于普通字段、嵌套对象和数组行。

### 两种事件写法

事件可以直接写在节点顶层：

```ts
{
  type: 'Input',
  field: 'keyword',
  onChange(effectData, event) {
    console.log(effectData.value, event)
  },
  onBlur(effectData, event) {},
}
```

也可以集中写在 `on` 中：

```ts
{
  type: 'Input',
  field: 'keyword',
  on: {
    change(effectData, event) {},
    blur(effectData, event) {},
  },
}
```

`on.change` 会转换为底层组件的 `onChange`。顶层 `onXxx` 更便于类型提示，`on` 更适合批量组合事件；两种写法不要为同一事件重复配置。

事件最终调用形式为：

```ts
schemaHandler(effectData, ...componentEventArgs);
```

后面的参数完全来自底层组件，因此 Input 的 `onChange`、Select 的 `onSelect` 等仍应参照 Ant Design Vue 对应组件。

### onUpdate 与组件事件的区别

`onUpdate(effectData)` 专门观察字段实际存储值：

```ts
{
  type: 'Select',
  field: 'province',
  label: '省份',
  onUpdate({ current, value }) {
    current.city = undefined
    loadCities(value)
  },
}
```

| 回调              | 触发依据           | 典型用途                       |
| ----------------- | ------------------ | ------------------------------ |
| `onChange` 等事件 | 底层组件发出事件   | 获取原始事件参数、响应具体交互 |
| `onUpdate`        | 模型字段值发生变化 | 字段联动、请求数据、清理依赖值 |
| `computed`        | 响应依赖重新计算   | 生成并写回派生值               |

`onUpdate` 不会作为普通 `onXxx` 监听器传给底层组件。它观察的是实际模型值，因此外部数据同步造成的值变化也可能触发；回调应避免无条件重复写回同一字段。

### effectData 上下文

常用字段如下：

| 字段       | 含义                       | 常见场景                    |
| ---------- | -------------------------- | --------------------------- |
| `formData` | 根表单数据                 | 跨容器联动、提交级判断      |
| `current`  | 当前字段所属对象或当前记录 | 同级字段联动                |
| `parent`   | 上一级 effectData          | 需要沿嵌套上下文向上访问    |
| `value`    | 当前字段值                 | 当前值判断                  |
| `field`    | 当前字段在当前对象中的名称 | 通用处理函数                |
| `index`    | 数组元素下标               | InputList、ListGroup、Table |
| `record`   | 数组或表格当前记录         | 行操作、列渲染              |
| `isView`   | 当前是否处于只读展示       | 同一渲染函数适配编辑和查看  |

回调参数保持响应式。可以直接读取值，不需要手工 `.value`：

```ts
hidden: ({ current, value }) => current.status !== "active" || !value;
```

#### current 与 formData

```ts
{
  type: 'Group',
  field: 'invoice',
  subItems: [
    {
      type: 'Input',
      field: 'title',
      disabled: ({ current }) => current.type === 'personal',
      hidden: ({ formData }) => !formData.needInvoice,
    },
  ],
}
```

这里 `current` 是 `invoice`，`formData` 是整个表单。优先用 `current` 表达组内依赖，能让 Group 被移动或复用时仍保持正确。

#### parent 不是父数据的别名

`parent` 指向上一级 `effectData`，因此上一级数据通常通过 `parent.current` 读取：

```ts
hidden: ({ parent }) => parent?.current?.mode !== "advanced";
```

如果只是跨多层读取根数据，直接使用 `formData` 更清楚；`parent` 更适合组件或通用字段组确实需要理解嵌套关系的情况。

#### 数组行上下文

在 InputList、ListGroup 和 Table 列中：

```ts
{
  type: 'InputNumber',
  field: 'quantity',
  disabled: ({ record }) => record.locked,
  onUpdate: ({ record, index, value }) => {
    console.log('第几行', index, '当前记录', record, '新数量', value)
  },
}
```

`current` 与 `record` 通常都指向当前行对象；`record` 更能表达行级业务语义。数组结构和编辑模式见[数组与表格](/manual/fields/collections)。

### 远程选项函数

`options` 为函数时也会收到上下文：

```ts
options: ({ current }) => api.getCities({ province: current.province });
```

Select 同时满足以下条件时会自动进入远程搜索模式：

- `attrs.showSearch` 已开启。
- `options` 是函数。
- 没有显式配置 `onSearch`。

此时框架约以 600ms 尾部节流调用：

```ts
options(effectData, keyword);
```

若显式提供 `onSearch`，业务代码完全接管搜索过程，框架不再自动用关键字调用 `options`。返回格式、字典归一化和原始值数组规则见[选择输入：远程搜索](/manual/fields/selections#远程搜索)。

### 页面组件的扩展上下文

页面组件会在基础字段之上补充自己的上下文。例如 SuperTable 按钮还可能获得 `selectedRows`、`selectedRowKeys`、`tableRef` 及页面动作。不要假设所有字段位置都拥有这些值；可复用回调应只读取当前场景明确提供的数据。

相关内容：

- [字段状态与联动](/manual/reactivity#字段状态与联动)：如何选择状态函数、事件和计算字段。
- [渲染与插槽](/manual/rendering)：渲染函数中的上下文。
- [按钮组 SuperButtons](/manual/super-buttons)：按钮动作和上下文。
