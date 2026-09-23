# 选项与值处理

本页包括 Select、TreeSelect、Radio、Checkbox、Switch 和 TagSelect。选择字段的核心是明确“选项来源、控件值、业务存储值、只读文本”四者的关系。

## 适用字段

| 增强能力 | AntDV | Element Plus |
| --- | --- | --- |
| 选择值与选项处理 | Select、RadioGroup、CheckboxGroup | Select、SelectV2、RadioGroup、CheckboxGroup |
| 输入建议按标签处理 | AutoComplete | Autocomplete 使用 UI 自身的建议接口 |
| 树选项处理 | TreeSelect | TreeSelect 使用 UI 自身的数据协议 |
| 开关业务值映射 | Switch | Switch |
| 可点击标签选项 | 内置 TagSelect | 内置 TagSelect |

以下行为只适用于启用相应处理的字段；单个 Radio、Checkbox、Cascader 等不能因名称相近而套用同一套配置。字段底层 `attrs` 使用所选 UI 库的属性。

## 通用 options 配置

顶层 `options` 是 SuperForm 的选项配置包，不直接写数组、Ref、函数或字典名。页面数据放在 `source`，全局字典放在 `dictName`：

```ts
{
  type: 'Select',
  field: 'role',
  options: {
    source: [
      { label: '管理员', value: 'admin', disabled: false },
      { label: '普通用户', value: 'user' },
    ],
  },
}

{
  type: 'Select',
  field: 'status',
  options: { dictName: 'article_status' },
}
```

`options.source` 支持：

```ts
// 原始值数组
options: { source: ['draft', 'published'] }

// 对象字典
options: { source: { draft: '草稿', published: '已发布' } }

// Ref
options: { source: statusOptions }

// 函数或 Promise；只接收 effectData
options: { source: ({ current }) => api.getOptions(current.category) }
```

`source` 与 `dictName` 可以同时配置，但 source 始终优先；即使 source 是空数组、暂时为空的 Ref 或返回空值，也不会回退到字典，并会输出配置警告。

## 通用值转换属性

| 属性 | 位置 | 默认值 | 结果 |
| --- | --- | --- | --- |
| `fieldNames` | `options.fieldNames` | — | 映射 `label/value/children`，递归归一化子选项 |
| `valueToNumber` | `options.valueToNumber` | `false` | value 归一化为 number；原始数组使用数字下标 |
| `labelAsValue` | `options.labelAsValue` | `false` | 字段直接保存选项 label |
| `labelField` | 字段顶层 | — | value 存 `field`，label 另存同级字段 |
| `stringifyValue` | 字段顶层 | `false` | 多选数组转逗号字符串 |

```ts
// 直接存 label
{
  type: 'Select',
  field: 'department',
  options: {
    source: departments,
    labelAsValue: true,
  },
}

// value + label
{
  type: 'Select',
  field: 'departmentId',
  labelField: 'departmentName',
  options: { source: departments },
}
```

### fieldNames

后端选项字段不是 `label/value` 时，在配置包中映射，不放入 UI 的 `attrs.fieldNames`：

```ts
{
  type: 'Select',
  field: 'userId',
  options: {
    source: [{ userName: '张三', userId: 8 }],
    fieldNames: { label: 'userName', value: 'userId' },
  },
}
```

需要让 `labelField` 从原生选项中读取标签时，可在未配置顶层 `options` 的情况下使用 `attrs.options/fieldNames`；如果配置了顶层 `options`，则以顶层配置为准。

## Select
## Select

AntDV Select 与 Element Plus Select、SelectV2 都接入选择处理；普通 UI Props 分别遵循对应组件。下面以 AntDV 写法举例。

```ts
{
  type: 'Select',
  field: 'roles',
  label: '角色',
  options: { source: roleOptions },
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

Select / SelectV2 不提供 SuperForm 专项搜索、节流或 loading。搜索关键词、过滤策略和 loading 使用当前 UI 框架的原生属性与事件；`options.source` 只接收 effectData，不接收 keyword。

AntDV 可以由原生 `onSearch` 维护业务关键词：

```ts
const keyword = ref('')

{
  type: 'Select',
  field: 'userId',
  attrs: {
    showSearch: true,
    filterOption: false,
    onSearch: value => { keyword.value = value },
  },
  options: {
    source: () => api.searchUsers(keyword.value),
  },
}
```

Element Plus 同理使用自身的 `remoteMethod`、`filterable`、`loading` 等原生协议。SuperForm 不额外包装这些事件，也不会自动切换远程模式。

## TreeSelect
## TreeSelect

本节的增强配置适用于 AntDV TreeSelect。Element Plus TreeSelect 的树数据与选择属性直接使用底层组件协议。

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

| 属性         | 类型           | 默认值 | 说明                                                                    |
| ------------ | -------------- | ------ | ----------------------------------------------------------------------- |
| `treeData`   | array/function | `[]`   | 数组、返回数组的函数或 Promise 函数                                     |
| `labelField` | string         | —      | 同步保存选择标签；多选时保存标签数组                                    |
| `attrs`      | object         | `{}`   | TreeSelectProps，如 `multiple`、`treeCheckable`、`treeDefaultExpandAll` |

字段值形态受 `multiple`、`treeCheckable`、`labelInValue` 等底层属性影响，使用前应与接口类型对齐。

## RadioGroup

Radio 对应 Radio.Group，字段保存单个 value：

```ts
{
  type: 'RadioGroup',
  field: 'level',
  label: '等级',
  options: { source: levelOptions },
  attrs: {
    optionType: 'button',
    buttonStyle: 'solid',
  },
}
```

专属 `attrs` 是 RadioGroupProps；选项来源与值转换统一写在 `options` 配置包，`labelField` 仍位于字段顶层。

## CheckboxGroup

Checkbox 对应 Checkbox.Group，字段通常是 value 数组：

```ts
{
  type: 'CheckboxGroup',
  field: 'permissions',
  labelField: 'permissionNames',
  label: '权限',
  options: { source: permissionOptions },
  stringifyValue: true,
}
```

默认保存数组；`stringifyValue` 保存逗号字符串；`labelField` 保存对应 label 数组。单个布尔状态使用 Switch，而不是无 options 的 Checkbox。

## Switch

### 布尔模式

```ts
{ type: 'Switch', field: 'enabled', label: '启用' }
```

未配置 `options` 时，Switch 使用 `false/true`。初始值只由 `initialValue`、外部 value 或数据源建立；不会根据 UI 的 `defaultChecked` 反推模型。

### 业务枚举模式

```ts
{
  type: 'Switch',
  field: 'status',
  label: '状态',
  options: {
    source: [
      { label: '停用', value: 0 }, // 第 0 项：unchecked
      { label: '启用', value: 1 }, // 第 1 项：checked
    ],
  },
}
```

Switch 固定把归一化后的第 0 项作为 unchecked、第 1 项作为 checked，并把对应 value 与 label 交给当前 Adapter 映射到原生组件。业务需要不同含义时直接调整 source 的两项顺序与值。

配置 `labelField` 时，当前选项标签会通过统一模型入口同步到关联字段：

```ts
{
  type: 'Switch',
  field: 'status',
  labelField: 'statusName',
  options: {
    source: [
      { label: '停用', value: 0 },
      { label: '启用', value: 1 },
    ],
  },
}
```

## TagSelect

[TagSelect 的配置与事件](/manual/fields/built-in-inputs#tagselect)。

<span id="选择输入"></span>

## TreeSelect 数据与标签

顶层 treeData 支持数组、Ref，以及接收 effectData 的同步/异步函数。未配置时保留原生 attrs.treeData（AntDV）或 attrs.data（Element Plus）。labelField 接收选择项标签，外部赋值和异步标签更新也会同步；单选为单个标签，多选为标签数组。自定义节点字段和懒加载参数按目标 UI 原生属性配置。
