# SuperModal

`useModal` 创建可编程弹窗；`useModalForm` 将表单与弹窗组合。

```ts
const modal = useModal(() => h(UserDetail), { title: '用户详情' })
await modal.openModal()
```

```ts
const modalForm = useModalForm(formSchema, { title: '编辑用户' })
await modalForm.openModal({ data: record })
```

表格弹窗编辑时，可选的 `apis.info` 会先完成，然后按“当前行、接口结果、resetData”顺序合并表单数据。
