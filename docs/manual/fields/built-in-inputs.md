# 内置输入组件

这些组件由 SuperForm 提供组合、模型和交互能力，底层 UI 通过 Adapter 渲染。它们与 UI 库的同类组件分别列出，例如 `TagInput` 与 Element Plus 的 `InputTag` 是不同入口。

## InputGroup

InputGroup 是紧凑输入容器，不是页面根 Form。它使用 `subItems` 组合多个字段，并继承 `subSpan`、`gutter`、`rowProps`。

```ts
{
  type: 'InputGroup',
  field: 'phone',
  label: '联系电话',
  subItems: [
    { type: 'Input', field: 'areaCode', span: 8 },
    { type: 'Input', field: 'number', span: 16 },
  ],
}
```

### 对象绑定与当前对象绑定

```ts
// 有 field：形成 phone.areaCode / phone.number
{ type: 'InputGroup', field: 'phone', subItems: [...] }

// 无 field：子项直接写入当前对象
{ type: 'InputGroup', subItems: [...] }
```

默认紧凑模式将子项 `span` 换算为百分比宽度并拼接控件。通过 `attrs.compact: false` 使用普通 Row/Col，适合子项需要间距或响应式断点的情况。

InputGroup 会把子项规则汇总到统一 FormItem；`required`、`disabled` 也可由容器统一控制。

## TagInput

TagInput 适合用户自由创建标签，不依赖预设 options。

```ts
{
  type: 'TagInput',
  field: 'keywords',
  label: '关键词',
  attrs: {
    newLabel: '添加关键词',
    closable: (tag, index) => index > 0 && tag !== 'system',
  },
}
```

### 数组与字符串模式

```ts
// 推荐：模型为 string[]
{ type: 'TagInput', field: 'tags' }

// 提交为逗号分隔字符串：模型为 'vue,typescript'
{
  type: 'TagInput',
  field: 'tags',
  attrs: { stringifyValue: true },
}
```

| attrs 属性       | 类型             | 默认值   | 说明                             |
| ---------------- | ---------------- | -------- | -------------------------------- |
| `newLabel`       | string/function  | `'添加'` | 新增入口内容                     |
| `closable`       | boolean/function | `true`   | 是否可删除，也可按标签和下标判断 |
| `stringifyValue` | boolean          | `false`  | 是否把标签数组保存为逗号字符串   |

重复标签会被忽略。字符串模式没有逗号转义，标签自身可能含逗号时必须使用数组。

## TagSelect

TagSelect 把少量选项直接展示为可点击 Tag：

```ts
{
  type: 'TagSelect',
  field: 'topics',
  label: '主题',
  options: { source: topicOptions },
  attrs: {
    multiple: true,
    stringifyValue: false,
    placeholder: '暂无可选主题',
  },
}
```

| 配置                         | 字段值     |
| ---------------------------- | ---------- |
| 默认                         | 单个 value |
| `attrs.multiple: true`       | value 数组 |
| `attrs.stringifyValue: true` | 逗号字符串 |

`options` 使用配置包，`dictName`、`valueToNumber`、`labelAsValue` 放在 options 内；`stringifyValue` 放在字段顶层。组件事件包括 `onCheck(effectData, tag, checked)` 与 `onChange(effectData, tag, nextSelected)`。
