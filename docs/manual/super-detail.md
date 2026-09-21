# 详情 SuperDetail

SuperDetail 使用与表单、表格相同的字段 Schema 渲染只读详情。它会复用字段路径、字典映射、关联字段、Tag、范围和自定义展示，因此无需再维护一份“详情专用文案逻辑”。

<span id="创建与更新详情"></span>

## 注册与声明式用法 {#两种使用方式}

### 声明式

```vue
<SuperDetail :schema="detailSchema" :data-source="record" />
```

适合数据由父组件控制的详情页。

### 注册模式

```vue
<SuperDetail @register="register" />

<script setup lang="ts">
import { SuperDetail, useDetail } from "superform-antdv";

const [register, detail] = useDetail(detailSchema, initialData);
detail.setData(record);
</script>
```

Schema 可以是对象、函数或 Promise；需要在同一详情实例中切换记录时使用 `setData()`。

## 切换详情数据 {#当前数据更新}

```ts
const [register, detail] = useDetail(schema, firstRecord);

// 之后切换记录
detail.setData(nextRecord);
```

声明式模式直接更新 `dataSource`，其优先级高于 Schema 中的数据源。替换 `schema` 或调用 `setOption()` 可更新详情字段；仅替换配置时保留当前数据。需要注意：详情数据用于读取，不提供表单式 `setFieldsValue` 或 `resetFields` 语义。

完整效果见[详情示例](/examples?example=detail)。

<span id="详情配置与布局"></span>

## 根 Schema 配置 {#根配置}

```ts
import { defineDetail } from "superform-antdv";

const detailSchema = defineDetail({
  title: "用户信息",
  mode: "table",
  subSpan: 12,
  attrs: {
    bordered: true,
    labelAlign: "right",
  },
  buttons: {
    visibleIn: "detail",
    actions: [{ label: "返回", onClick: () => router.back() }],
  },
  subItems: [],
});
```

| 属性          | 类型            | 默认值      | 作用                        |
| ------------- | --------------- | ----------- | --------------------------- |
| `subItems`    | array           | 必填        | 详情字段和嵌套容器          |
| `dataSource`  | object/Ref      | `{}`        | 当前详情对象                |
| `title`       | string/function | —           | 页面或分组标题              |
| `mode`        | string          | `'default'` | `default`、`table`、`form`  |
| `attrs`       | object          | `{}`        | Descriptions 与详情布局属性 |
| `subSpan`     | number/string   | `12`        | 详情项默认栅格              |
| `gutter`      | number          | `16`        | 栅格间距                    |
| `rowProps`    | object          | `{}`        | Row 属性                    |
| `buttons`     | array/object    | —           | 详情操作按钮                |
| `isContainer` | boolean         | `false`     | 页面容器样式                |

字段可以省略 `type`，此时直接展示值。使用 `exclude: ['description']` 排除详情字段。

## mode：详情布局 {#三种布局模式}

| 模式      | 特点                        | 适合场景                   |
| --------- | --------------------------- | -------------------------- |
| `default` | 标准 Descriptions 布局      | 常规键值详情               |
| `table`   | 分组按表格式结构展示        | 对齐要求高、分组较多       |
| `form`    | 接近表单 label/control 布局 | 查看态与编辑态需要视觉一致 |

```ts
// 标准两列详情
{ mode: 'default', subSpan: 12, attrs: { bordered: true } }

// 表单式详情
{
  mode: 'form',
  attrs: {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
    noInput: false,
  },
}
```

## 详情外观配置 {#extdescriptionsprops-细节}

| 属性          | 类型          | 默认值      | 说明                                |
| ------------- | ------------- | ----------- | ----------------------------------- |
| `mode`        | string        | `'default'` | 当前详情布局模式                    |
| `wrapperCol`  | object        | 继承布局    | 内容列属性；传空对象可清空继承值    |
| `labelCol`    | object        | 继承布局    | 标签列属性；传空对象可清空继承值    |
| `labelAlign`  | string        | —           | `left`、`center`、`right`           |
| `tableLayout` | string        | `'auto'`    | 表格式分组的 `fixed` / `auto`       |
| `noInput`     | boolean       | `false`     | `form` 模式不使用输入框风格包裹内容 |
| `span`        | number        | —           | 当前详情项跨度                      |
| `subSpan`     | number/string | `12`        | 内部默认栅格                        |
| `gutter`      | number        | `16`        | 内部栅格间距                        |
| `rowProps`    | object        | `{}`        | 内部 Row 属性                       |
| 其他属性      | object        | 组件默认值  | 传给 Ant Design Vue Descriptions    |

`attrs` 用于详情根；字段或容器的 `descriptionsProps` 用于局部覆盖：

```ts
{
  type: 'Group',
  title: '审计信息',
  descriptionsProps: {
    mode: 'table',
    tableLayout: 'fixed',
    subSpan: 12,
  },
  subItems: [],
}
```

<span id="字段展示"></span>

## 字段展示优先级 {#字段展示优先级}

1. `viewRender` 自定义显示。
2. `labelField` 关联文本。
3. `endField` 范围组合。
4. `options.source` / `options.dictName` 值到标签映射和 `tagViewer`。
5. Upload 或 Ext\* 组件的 `isView: true` 模式。
6. 默认文本值。

```ts
subItems: [
  { field: "departmentId", label: "部门", labelField: "departmentName" },
  { field: "startDate", endField: "endDate", label: "有效期" },
  { field: "status", label: "状态", options: { dictName: "status" } },
];
```

详细映射见[渲染与插槽](/manual/rendering#默认只读映射)。
