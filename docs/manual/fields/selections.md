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

## 通用 options 格式

### 推荐：标准对象数组

```ts
options: [
  { label: "管理员", value: "admin", disabled: false },
  { label: "普通用户", value: "user" },
];
```

`DefaultOptionType` 明确声明 `label`、`value`、`children`、`disabled`，并允许携带业务附加字段。`children` 主要服务树形数据或底层组件场景。

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

标准对象数组语义最明确。原始值数组配置 `valueToNumber: true` 时会改用数字下标作为 value；不要把它理解为对元素做 `Number()` 转换。

## 通用值转换属性

| 属性             | 类型                          | 默认值  | 结果                                         | 适合场景                   |
| ---------------- | ----------------------------- | ------- | -------------------------------------------- | -------------------------- |
| `valueToNumber`  | boolean                       | `false` | 选项 value 归一化为 number；原始数组使用下标 | 后端要求数字枚举           |
| `labelAsValue`   | boolean                       | `false` | 字段直接保存选项 label                       | 值与文案完全一致的简单接口 |
| `labelField`     | string                        | —       | value 存 `field`，label 另存一个字段         | 同时提交 ID 和名称         |
| `stringifyValue` | boolean                       | `false` | 多选数组转逗号字符串                         | 接口使用逗号分隔值         |

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

第三种最适合详情回显和提交快照。`labelField` 是同级数据路径，见[Schema 与数据模型](/manual/fields-and-paths#labelfield-同时保存值与显示文本)。

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

AntDV Select 与 Element Plus Select、SelectV2 都接入选择处理；普通 UI Props 分别遵循对应组件。下面以 AntDV 写法举例。

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
  current.lastKeyword = keyword;
  loadOptions(keyword);
};
```

显式 `onSearch` 后不会自动用关键词调用 `options`。

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
  options: levelOptions,
  attrs: {
    optionType: 'button',
    buttonStyle: 'solid',
  },
}
```

专属 `attrs` 是 RadioGroupProps；支持通用 `options`、`dictName`、值转换和 `labelField`。

## CheckboxGroup

Checkbox 对应 Checkbox.Group，字段通常是 value 数组：

```ts
{
  type: 'CheckboxGroup',
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
    { label: '停用', value: 0 }, // 第一项：默认作为未选中状态的标签和值
    { label: '启用', value: 1 }, // 第二项：默认作为选中状态的标签和值
  ],
  // options 已同时定义开关文案、绑定值和只读显示，无需再配置：
  // valueLabels: ['停用', '启用'],
  // attrs: { checkedChildren: '启用', unCheckedChildren: '停用' },
}
```

配置 `options` 时，组件直接使用第一项作为未选中状态、第二项作为选中状态，同时取得各自的 `label` 和 `value`。因此通常只写 `options` 即可，不要重复配置 `valueLabels`、`checkedChildren`、`unCheckedChildren` 或默认值为 `false` 的 `firstIsChecked`。

配置 `labelField` 时，Switch 会在初始化、外部值变化和用户切换时，将当前 options 对应的 label 同步写入该字段。异步 options 加载完成前不会先写入临时的 `false` 值。

只有业务明确要求“第一项表示选中”时才反转顺序：

```ts
{
  type: 'Switch',
  field: 'status',
  label: '状态',
  options: [
    { label: '启用', value: 1 }, // firstIsChecked 为 true 后，第一项表示选中
    { label: '停用', value: 0 }, // 第二项表示未选中
  ],
  attrs: {
    firstIsChecked: true,
  },
}
```

未配置 `options` 时，Switch 默认使用 `true/false`；配置 `valueToNumber: true` 后改用 `1/0`。此时可用 `valueLabels` 补充只读文案，或通过 Ant Design Vue 的 `checkedChildren`、`unCheckedChildren` 自定义开关内部内容。

## TagSelect

[TagSelect 的配置与事件](/manual/fields/built-in-inputs#tagselect)。

<span id="选择输入"></span>
