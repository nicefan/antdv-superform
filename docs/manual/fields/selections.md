# 选择输入

本页包括 Select、TreeSelect、Radio、Checkbox、Switch 和 TagSelect。选择字段的核心是明确“选项来源、控件值、业务存储值、只读文本”四者的关系。

## 通用 options 格式

### 推荐：标准对象数组

```ts
options: [
  { label: '管理员', value: 'admin', disabled: false },
  { label: '普通用户', value: 'user' },
]
```

`DefaultOptionType` 明确声明 `label`、`value`、`children`、`disabled`，并允许携带业务附加字段。当前 Select 不支持分组选项，也不消费 `fieldNames.options`；`children` 主要服务树形数据或底层组件场景。

### 其他来源对比

```ts
// 原始值数组：label 与 value 都是元素本身
options: ['draft', 'published']

// 对象字典：键是 value，值是 label
options: { draft: '草稿', published: '已发布' }

// Ref：外部更新后选项响应
options: statusOptions

// 函数或 Promise：收到 effectData
options: ({ current }) => api.getOptions(current.category)

// 全局字典
dictName: 'article_status'
```

标准对象数组语义最明确。原始值数组配置 `valueToNumber: true` 时，兼容行为会改用数字下标作为 value；不要把它理解为对元素做 `Number()` 转换。

## 通用值转换属性

| 属性             | 结果                                         | 适合场景                   |
| ---------------- | -------------------------------------------- | -------------------------- |
| `valueToNumber`  | 选项 value 归一化为 number；原始数组使用下标 | 后端要求数字枚举           |
| `labelAsValue`   | 字段直接保存选项 label                       | 值与文案完全一致的简单接口 |
| `labelField`     | value 存 `field`，label 另存一个字段         | 同时提交 ID 和名称         |
| `stringifyValue` | 多选数组转逗号字符串                         | 兼容旧接口                 |
| `tagViewer`      | 控制只读 Tag 显示                            | 表格、详情状态展示         |

旧 `valueToLabel`、`valueToString` 分别改用 `labelAsValue`、`stringifyValue`。

### 三种存储方式对比

```ts
// 1. 只存 value：{ departmentId: 12 }
{ type: 'Select', field: 'departmentId', options }

// 2. 直接存 label：{ department: '研发中心' }
{ type: 'Select', field: 'department', labelAsValue: true, options }

// 3. value + label：{ departmentId: 12, departmentName: '研发中心' }
{
  type: 'Select',
  field: 'departmentId',
  labelField: 'departmentName',
  options,
}
```

第三种最适合详情回显和提交快照。`labelField` 是同级数据路径，见[字段与数据路径](/manual/fields-and-paths#labelfield-同时保存值与显示文本)。

## fieldNames

后端已有扁平选项字段时可通过 Select 的 `attrs.fieldNames` 映射：

```ts
{
  type: 'Select',
  field: 'userId',
  options: [{ userName: '张三', userId: 8 }],
  attrs: {
    fieldNames: { label: 'userName', value: 'userId' },
  },
}
```

组件会先归一化为标准 `label/value` 再交给底层控件，表单和只读显示保持一致。全局 `dictApi` 仍应直接返回标准格式。

## Select

```ts
{
  type: 'Select',
  field: 'roles',
  label: '角色',
  options: roleOptions,
  attrs: {
    mode: 'multiple',
    allowClear: true,
    showSearch: true,
    optionFilterProp: 'label',
  },
}
```

默认占位符为“请选择 + label”，默认按 `label` 过滤。`attrs` 继承 Ant Design Vue SelectProps，如 `mode`、`allowClear`、`showSearch`、`filterOption`、`fieldNames`、`maxTagCount`、`loading`。

### 远程搜索

```ts
{
  type: 'Select',
  field: 'userId',
  label: '用户',
  attrs: {
    showSearch: true,
    filterOption: false,
  },
  options: (_effectData, keyword) => api.searchUsers(keyword),
}
```

当 `showSearch` 开启、`options` 是函数且没有显式 `onSearch` 时，组件约以 600ms 尾部节流调用 `options(effectData, keyword)`。

```ts
// 完全接管关键词与加载状态
onSearch: ({ current }, keyword) => {
  current.lastKeyword = keyword
  loadOptions(keyword)
}
```

显式 `onSearch` 后不会自动用关键词调用 `options`。

## TreeSelect

TreeSelect 使用 `treeData`，不走扁平 options 归一化：

```ts
{
  type: 'TreeSelect',
  field: 'orgId',
  labelField: 'orgName',
  label: '组织',
  treeData: ({ formData }) => api.getOrgTree(formData.tenantId),
  attrs: {
    treeCheckable: false,
    allowClear: true,
    fieldNames: { label: 'name', value: 'id', children: 'children' },
  },
}
```

| 属性         | 说明                                                                    |
| ------------ | ----------------------------------------------------------------------- |
| `treeData`   | 数组、返回数组的函数或 Promise 函数                                     |
| `labelField` | 同步保存选择标签；多选时保存标签数组                                    |
| `attrs`      | TreeSelectProps，如 `multiple`、`treeCheckable`、`treeDefaultExpandAll` |
| `data`       | 已废弃，改用 `treeData`                                                 |

字段值形态受 `multiple`、`treeCheckable`、`labelInValue` 等底层属性影响，使用前应与接口类型对齐。

## Radio

Radio 对应 Radio.Group，字段保存单个 value：

```ts
{
  type: 'Radio',
  field: 'level',
  label: '等级',
  options: levelOptions,
  attrs: {
    optionType: 'button',
    buttonStyle: 'solid',
  },
}
```

专属 `attrs` 是 RadioGroupProps；支持通用 `options`、`dictName`、值转换和 `labelField`。

## Checkbox

Checkbox 对应 Checkbox.Group，字段通常是 value 数组：

```ts
{
  type: 'Checkbox',
  field: 'permissions',
  labelField: 'permissionNames',
  label: '权限',
  options: permissionOptions,
  stringifyValue: true,
}
```

默认保存数组；`stringifyValue` 保存逗号字符串；`labelField` 保存对应 label 数组。单个布尔状态使用 Switch，而不是无 options 的 Checkbox。

## Switch

### 布尔模式

```ts
{ type: 'Switch', field: 'enabled', label: '启用' }
```

值未定义时会写入默认未选中值；`defaultChecked` 通过 `attrs.defaultChecked: true` 改为默认选中。

### 业务枚举模式

```ts
{
  type: 'Switch',
  field: 'status',
  label: '状态',
  options: [
    { label: '停用', value: 0 },
    { label: '启用', value: 1 },
  ],
  valueLabels: ['停用', '启用'],
  attrs: {
    firstIsChecked: false,
    checkedChildren: '启用',
    unCheckedChildren: '停用',
  },
}
```

默认第二个选项是选中值、第一个是未选中值；`firstIsChecked` 反转。无 options 时 `valueToNumber` 使用 `0/1`。`valueLabels` 只控制只读显示文案，`attrs` 其余部分继承 SwitchProps。

## TagSelect

TagSelect 把少量选项直接展示为可点击 Tag：

```ts
{
  type: 'TagSelect',
  field: 'topics',
  label: '主题',
  options: topicOptions,
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

顶层 ExtSelect 的 `options`、`dictName`、`valueToNumber`、`labelAsValue`、`stringifyValue` 也可使用；attrs 中的 `valueToString` 已废弃。组件事件包括 `onCheck(effectData, tag, checked)` 与 `onChange(effectData, tag, nextSelected)`。

## tagViewer 只读配置

```ts
// 关闭 Tag，显示普通文本
tagViewer: false

// 按值映射颜色
tagViewer: { enabled: 'green', disabled: 'default' }

// 颜色数组，按选项顺序循环
tagViewer: ['blue', 'green', 'orange']

// 完整条目
tagViewer: [
  { value: 1, label: '启用', color: 'green', icon: () => h(CheckOutlined) },
]

// 动态规则：函数参数是当前值
tagViewer: (value) => ({
  label: value ? '启用' : '停用',
  color: value ? 'green' : 'red',
})
```

配置 options 后默认开启 Tag。全局颜色策略见[字典与权限接入](/manual/dictionaries-and-permissions#标签展示)。

完整可运行代码见[选择输入示例](/examples?example=selections)。
