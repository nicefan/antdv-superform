# 弹窗 SuperModal

弹窗能力分为三层：`createModal` 创建可手动挂载的弹窗，`useModal` 自动管理 DOM 生命周期，`useModalForm` 再组合 SuperForm 的回填与提交。

<span id="创建弹窗"></span>

## 选择弹窗 API {#选择哪一个-api}

| API            | 内容        | 挂载方式       | 适合场景               |
| -------------- | ----------- | -------------- | ---------------------- |
| `useModalForm` | Schema 表单 | 自动           | 新增、编辑弹窗         |
| `useModal`     | 任意 VNode  | 自动           | 预览、确认、业务面板   |
| `createModal`  | 任意 VNode  | 手动或自行包装 | 基础设施封装、特殊挂载 |

## useModalForm：表单弹窗 {#usemodalform}

```ts
const modal = useModalForm(
  {
    title: "编辑用户",
    subSpan: 24,
    subItems: [
      { type: "Hidden", field: "id" },
      { type: "Input", field: "name", label: "姓名", required: true },
    ],
  },
  {
    width: 640,
    maskClosable: false,
    onOk: (data) => api.save(data),
  }
);

await modal.openModal({
  data: record,
  title: "修改用户",
});
```

打开顺序是：`resetFields(data)` 回填 → 合并本次 Modal 配置 → 打开。确认顺序是：`form.submit()` → 调用 `onOk(data)` → Promise 成功后关闭。

```ts
// reject/throw 会保留弹窗，便于用户修正
onOk: async (data) => {
  const result = await api.save(data);
  if (!result.success) throw new Error(result.message);
};
```

返回对象中的 `formActions` 是完整 useForm 动作：

```ts
modal.formActions.setFieldsValue({ status: 1 });
modal.formActions.resetFields();
await modal.formActions.submit();
```

## useModal：内容弹窗 {#usemodal}

```ts
import { h } from "vue";

const modal = useModal(() => h(UserPreview, { userId }), {
  title: "用户预览",
  width: 900,
  destroyOnClose: true,
});

await modal.openModal();
await modal.closeModal();
```

`openModal(config?)` 的参数只覆盖或追加本次弹窗配置；`setModal(config)` 修改持久配置：

```ts
modal.setModal({ width: 1000 });
modal.openModal({ title: "本次标题" });
```

`content` 表示弹窗内容；打开参数中的 `data` 用于传入业务数据。

<span id="弹窗按钮与动作"></span>

## 自定义底部按钮 {#自定义底部按钮}

```ts
let modal: ReturnType<typeof useModal>;
modal = useModal(renderContent, {
  title: "批量处理",
  buttons: {
    align: "right",
    actions: [
      { label: "取消", onClick: () => modal.closeModal() },
      { label: "执行", attrs: { type: "primary" }, onClick: runTask },
    ],
  },
});
```

配置 `buttons` 后由 SuperButtons 渲染自定义 footer；不配置时沿用底层 Modal 默认 footer。按钮上下文包含 `modalRef`。

## 弹窗动作与引用 {#返回动作}

| 动作/属性            | 类型     | 默认值 | 说明                         |
| -------------------- | -------- | ------ | ---------------------------- |
| `openModal(config?)` | function | —      | 合并配置、挂载并打开         |
| `closeModal()`       | function | —      | 关闭并等待下一次 Vue tick    |
| `setModal(config)`   | function | —      | 合并持久配置                 |
| `modalRef`           | Ref      | —      | 底层 Modal 引用              |
| `modalSlot`          | function | —      | 手动渲染入口，主要供封装使用 |
| `formActions`        | object   | —      | 仅 `useModalForm` 提供       |

Modal 的 `title`、`width`、`centered`、`maskClosable`、`destroyOnClose`、`afterClose` 等属性遵循 Ant Design Vue Modal 契约。全局默认值通过 `defaultProps.Modal` 设置。

<span id="生命周期"></span>

## 运行环境与生命周期 {#运行环境}

`useModal` 和 `createModal` 会创建 DOM 容器，只能在浏览器环境及 Vue setup 生命周期中调用，不应在 SSR 服务端求值。组件卸载时会清理已挂载弹窗；`destroyOnClose` 会在关闭后销毁内容实例。

完整交互见[弹窗表单示例](/examples?example=modal-form)。

