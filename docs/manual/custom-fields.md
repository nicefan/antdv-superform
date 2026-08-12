# 自定义字段开发

业务字段通过插件对象的 `registerComponent` 注册。适合把用户选择器、组织树弹窗、地图坐标等可复用交互纳入 Schema 的模型、状态和只读体系。

## 注册与命名

```ts
import SuperFormPlugin from "antdv-superform";
import UserPicker from "./UserPicker.vue";

SuperFormPlugin.registerComponent("UserPicker", UserPicker);
```

Schema 类型自动增加 Ext 前缀：

```ts
{
  type: 'ExtUserPicker',
  field: 'userId',
  label: '用户',
}
```

Schema 类型必须使用 `Ext` 前缀，不要写 `type: 'UserPicker'`。

## 组件接收参数

```ts
defineProps<{
  option: object;
  effectData: object;
  value?: unknown;
  disabled?: boolean;
  isView?: boolean;
  labelValue?: unknown;
  selectedItems?: unknown[];
}>();

const emit = defineEmits([
  "update:value",
  "update:labelValue",
  "update:selectedItems",
]);
```

| 参数                                 | 来源                                             |
| ------------------------------------ | ------------------------------------------------ |
| `option`                             | 当前完整 Schema 节点                             |
| `effectData`                         | 当前字段上下文                                   |
| `value` / `onUpdate:value`           | 主 `field` 双向绑定                              |
| `labelValue` / `onUpdate:labelValue` | `labelField` 双向绑定                            |
| 其他 v-model                         | `vModelFields` 声明                              |
| 普通 props                           | 全局默认、`attrs`、事件、`dynamicAttrs` 合并结果 |
| `disabled`                           | 字段与父容器计算结果                             |
| `isView`                             | 详情或表格只读模式                               |

## 主值绑定

```vue
<script setup lang="ts">
const props = defineProps<{ value?: string; disabled?: boolean }>();
const emit = defineEmits<{ "update:value": [value?: string] }>();

function selectUser(user) {
  emit("update:value", user.id);
}
</script>
```

扩展字段必须遵循 `value` / `update:value`，否则 `field`、校验和提交无法同步。

## labelField 双向绑定

```ts
{
  type: 'ExtUserPicker',
  field: 'userId',
  labelField: 'userName',
}
```

组件选中时同时发出：

```ts
emit("update:value", user.id);
emit("update:labelValue", user.name);
```

模型得到 `{ userId, userName }`，只读模式也可直接使用 userName。

## 多个 v-model

### 映射当前对象字段

```ts
{
  type: 'ExtUserPicker',
  field: 'userId',
  vModelFields: {
    selectedItems: 'selectedUsers',
    departmentId: 'departmentId',
  },
}
```

### 映射外部 Ref

```ts
const selectedUsers = ref([])

{
  type: 'ExtUserPicker',
  field: 'userId',
  vModelFields: {
    selectedItems: selectedUsers,
  },
}
```

### 传静态对象

```ts
vModelFields: {
  pickerConfig: { scope: 'tenant' },
}
```

字符串创建同级字段映射，Ref 保持外部双向值，其他对象作为静态参数。键名就是组件 prop/v-model 名称。

## attrs、事件与 dynamicAttrs

```ts
{
  type: 'ExtUserPicker',
  field: 'userId',
  attrs: { multiple: false },
  dynamicAttrs: ({ current }) => ({ tenantId: current.tenantId }),
  onChange: ({ current }, user) => {
    current.departmentId = user.departmentId
  },
}
```

扩展组件会像内置字段一样收到合并属性和包装后的事件。不要在组件内部再次解析 Schema 的 hidden/required；外层已负责布局和校验。

## 只读模式

```vue
<template>
  <span v-if="isView">{{ labelValue || value || "-" }}</span>
  <UserPickerInput v-else v-bind="$attrs" />
</template>
```

详情和表格会以 `isView: true` 渲染 Ext\* 组件，除非字段提供 `viewRender`。扩展组件必须隐藏编辑入口并给出稳定只读内容。

## InputSlot 与 Ext\* 的选择

| 情况                        | 选择                 |
| --------------------------- | -------------------- |
| 一个页面一次使用            | InputSlot            |
| 多页面复用                  | Ext\*                |
| 需要 labelField、多 v-model | Ext\*                |
| 需要专属 TypeScript 属性    | Ext\* + 项目类型辅助 |
| 替换所有同类基础控件        | components 全局替换  |

运行时注册不会自动扩充 npm 包静态联合类型。项目应为业务扩展维护类型辅助，不要把业务组件伪装成内置字段。
