# useModal / useModalForm

## useModal

`useModal` 用于快速创建一个业务弹窗。

```ts
import { useModal } from 'antdv-superform'

const { openModal, closeModal, setModal } = useModal(() => '这里是弹窗内容', {
  title: '提示',
  destroyOnClose: true,
})
```

常用返回值：

- `openModal(option?)`
- `closeModal()`
- `setModal(option?)`
- `modalRef`

## useModalForm

`useModalForm` 把表单和弹窗组合起来，适合做新增/编辑弹窗。

```ts
import { useModalForm } from 'antdv-superform'

const modalForm = useModalForm(schema, {
  title: '编辑数据',
})

modalForm.openModal({
  data: {
    name: '张三',
  },
})
```

## 适合场景

- 列表页新增/编辑弹窗
- 表单预览弹窗
- 简单确认或输入型弹窗
