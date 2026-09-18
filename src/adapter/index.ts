import { h, type Component, type VNodeChild } from "vue";
import type {
  AdapterComponent,
  ActionRenderType,
  ContainerAdapter,
  LayoutComponentName,
  PresentationRenderType,
  UIMessageType,
  UITableFilterProps,
  UITableRenderProps,
} from "./types";

import { getUIAdapter } from './runtime';
export { defineUIAdapter, getUIAdapter, initializeUIAdapter } from './runtime';
export { registerUIComponents, resolveUIComponent, requireUIComponent, useUIComponent } from './fieldRegistry';
export type { UIComponentSource } from './fieldRegistry';
export { resolveUIField } from './fields';

/** 解析 Adapter 内部固定 UI 原语。 */
function resolveAdapterComponent(
  component: AdapterComponent
): Component | undefined {
  return typeof component === "string"
    ? getUIAdapter().components[component]
    : component;
}

/** 获取必需的固定 UI 原语，并统一处理 capability 缺失。 */
function requireAdapterComponent(
  component: AdapterComponent | undefined,
  capability: string
) {
  const resolved = component && resolveAdapterComponent(component);
  if (!resolved)
    throw new Error(
      `UIAdapter '${getUIAdapter().name}' 未提供 ${capability} capability`
    );
  return resolved;
}

/** 将 Core 的标准 value 协议映射为具体 UI 组件 model。 */
function mapModelBinding(
  props: Obj,
  model?: { prop?: string; event?: string }
) {
  const mapped = { ...props };
  const { prop = "value", event = "update:value" } = model || {};
  if (prop !== "value") {
    mapped[prop] = mapped.value;
    delete mapped.value;
  }
  if (event !== "update:value") {
    const listener = event.startsWith("on")
      ? event
      : `on${event[0].toUpperCase()}${event.slice(1)}`;
    mapped[listener] = mapped["onUpdate:value"];
    delete mapped["onUpdate:value"];
  }
  return mapped;
}

/** 获取布局 capability 及其实际组件。 */
function getUILayout(type: LayoutComponentName) {
  const layout = getUIAdapter().layout;
  const configured =
    type === "compactSpace"
      ? layout?.compactSpace ?? layout?.space
      : layout?.[type];
  return { component: requireAdapterComponent(configured, type), layout };
}

/** 使用当前 Adapter 渲染表单容器。 */
export function renderUIForm(props: Obj, slots: Obj = {}) {
  const form = getUIAdapter().form;
  const component = requireAdapterComponent(form?.component, "Form");
  return h(component, form?.transformProps?.(props) ?? props, slots);
}

/** 使用当前 Adapter 渲染表单项。 */
export function renderUIFormItem(props: Obj, slots: Obj = {}) {
  const form = getUIAdapter().form;
  const component = requireAdapterComponent(form?.item, "FormItem");
  return h(component, form?.transformItemProps?.(props) ?? props, slots);
}

/** 调用当前 UI 表单实例的校验方法。 */
export function validateUIForm(instance: unknown) {
  const form = getUIAdapter().form;
  if (!form)
    throw new Error(
      `UIAdapter '${getUIAdapter().name}' 未提供 Form capability`
    );
  return form.validate(instance);
}

/** 调用当前 UI 表单实例的局部校验，不能回退为整表校验。 */
export function validateUIFormField(instance: unknown, path: (string | number)[]) {
  const form = getUIAdapter().form;
  if (!form?.validateField)
    throw new Error(`UIAdapter '${getUIAdapter().name}' 未提供字段校验能力`);
  return form.validateField(instance, path);
}

/** 清理当前 UI 表单实例的校验状态。 */
export function clearUIFormValidation(instance: unknown) {
  const form = getUIAdapter().form;
  if (!form)
    throw new Error(
      `UIAdapter '${getUIAdapter().name}' 未提供 Form capability`
    );
  return form.clearValidate(instance);
}

/** 使用当前 Adapter 渲染布局原语。 */
export function renderUILayout(
  type: LayoutComponentName,
  props: Obj = {},
  slots: Obj = {}
) {
  const { component, layout } = getUILayout(type);
  return h(component, layout?.transformProps?.[type]?.(props) ?? props, slots);
}

/** 获取指定容器的 Adapter 协议。 */
export function getUIContainerAdapter(
  type: string
): ContainerAdapter | undefined {
  return getUIAdapter().containers?.[type];
}

/** 将 Core 容器属性映射为具体 UI 协议。 */
export function mapUIContainerProps(type: string, props: Obj) {
  const container = getUIContainerAdapter(type);
  let mapped = mapModelBinding(props, container?.model);
  if (container?.transformProps) mapped = container.transformProps(mapped);
  return mapped;
}

/** 使用当前 Adapter 渲染容器。 */
export function renderUIContainer(
  type: string,
  props: Obj = {},
  slots: Obj = {}
) {
  const container = getUIContainerAdapter(type);
  const component = requireAdapterComponent(
    container?.component,
    `Container(${type})`
  );
  const mapped = mapUIContainerProps(type, props);
  return container?.render
    ? container.render(component, mapped, slots)
    : h(component, mapped, slots);
}

/** 渲染 Core 内置交互使用的语义图标。 */
export function renderUISemanticIcon(name: string) {
  const icons = getUIAdapter().icons;
  if (!icons)
    throw new Error(
      `UIAdapter '${getUIAdapter().name}' 未提供 Icon capability`
    );
  return icons.semantic?.[name]?.();
}

/** 获取布局类型对应的实际 UI 组件。 */
export function resolveUILayoutComponent(type: LayoutComponentName) {
  return getUILayout(type).component;
}

/** 使用当前 Adapter 渲染动作能力。 */
export function renderUIAction(
  type: ActionRenderType,
  props: Obj = {},
  slots: Obj = {}
) {
  const actions = getUIAdapter().actions;
  if (!actions)
    throw new Error(
      `UIAdapter '${getUIAdapter().name}' 未提供 Action capability`
    );
  return actions.render(type, props, slots);
}

/** 使用当前 Adapter 渲染展示原语。 */
export function renderUIPresentation(
  type: PresentationRenderType,
  props: Obj = {},
  slots: Obj = {}
) {
  const presentation = getUIAdapter().presentation;
  if (!presentation)
    throw new Error(
      `UIAdapter '${getUIAdapter().name}' 未提供 Presentation capability`
    );
  return presentation.render(type, props, slots);
}

/** 显示当前 UI 框架的轻量消息。 */
export function showUIMessage(type: UIMessageType, content: unknown) {
  const services = getUIAdapter().services;
  if (!services)
    throw new Error(
      `UIAdapter '${getUIAdapter().name}' 未提供 Service capability`
    );
  return services.message(type, content);
}

/** 打开当前 UI 框架的命令式确认框。 */
export function openUIConfirm(props: Obj) {
  const services = getUIAdapter().services;
  if (!services)
    throw new Error(
      `UIAdapter '${getUIAdapter().name}' 未提供 Service capability`
    );
  return services.confirm(props);
}

/** 打开当前 UI 框架的可更新信息框。 */
export function openUIInfo(props: Obj) {
  const services = getUIAdapter().services;
  if (!services)
    throw new Error(
      `UIAdapter '${getUIAdapter().name}' 未提供 Service capability`
    );
  return services.info(props);
}

/** 渲染受控弹窗。 */
export function renderUIModal(props: Obj = {}, slots: Obj = {}) {
  const modal = getUIAdapter().modal;
  if (!modal)
    throw new Error(
      `UIAdapter '${getUIAdapter().name}' 未提供 Modal capability`
    );
  return modal.render(props, slots);
}

/** 捕获命令式弹窗挂载时需要恢复的 UI 框架上下文。 */
export function useUIModalContext() {
  return getUIAdapter().modal?.useContext?.();
}

/** 为脱离当前组件树的弹窗恢复 UI 框架上下文。 */
export function wrapUIModalContext(
  content: (props?: Obj) => VNodeChild,
  context: unknown,
  props: Obj = {}
) {
  return (
    getUIAdapter().modal?.wrapContext?.(content, context, props) ?? content()
  );
}

/** 获取上传忽略标记。 */
export function getUIUploadListIgnore() {
  const upload = getUIAdapter().upload;
  if (!upload)
    throw new Error(
      `UIAdapter '${getUIAdapter().name}' 未提供 Upload capability`
    );
  return upload.listIgnore;
}

/** 渲染当前 UI 框架的上传组件。 */
export function renderUIUpload(props: Obj = {}, slots: Obj = {}) {
  const upload = getUIAdapter().upload;
  if (!upload)
    throw new Error(
      `UIAdapter '${getUIAdapter().name}' 未提供 Upload capability`
    );
  return upload.render(props, slots);
}

/** 渲染默认上传触发按钮。 */
export function renderUIUploadTrigger(props: Obj = {}, slots: Obj = {}) {
  const upload = getUIAdapter().upload;
  if (!upload)
    throw new Error(
      `UIAdapter '${getUIAdapter().name}' 未提供 Upload capability`
    );
  return upload.renderTrigger(props, slots);
}

/** 渲染受控图片预览。 */
export function renderUIPreview(props: Obj = {}) {
  const preview = getUIAdapter().preview;
  if (!preview)
    throw new Error(
      `UIAdapter '${getUIAdapter().name}' 未提供 Preview capability`
    );
  return preview.render(props);
}

/** 渲染表格、列与分页。 */
export function renderUITable(props: UITableRenderProps, slots: Obj = {}) {
  const table = getUIAdapter().table;
  if (!table)
    throw new Error(
      `UIAdapter '${getUIAdapter().name}' 未提供 Table capability`
    );
  return table.render(props, slots);
}

/** 渲染表格的选项卡筛选。 */
export function renderUITableFilter(
  props: UITableFilterProps,
  slots: Obj = {}
) {
  const table = getUIAdapter().table;
  if (!table)
    throw new Error(
      `UIAdapter '${getUIAdapter().name}' 未提供 Table capability`
    );
  return table.renderFilter(props, slots);
}

/** 获取当前 UI 表格的 DOM 选择器。 */
export function getUITableSelectors() {
  const table = getUIAdapter().table;
  if (!table)
    throw new Error(
      `UIAdapter '${getUIAdapter().name}' 未提供 Table capability`
    );
  return table.selectors;
}

export type {
  AdapterComponent,
  ActionAdapter,
  ActionRenderType,
  ContainerAdapter,
  ComponentModelConfig,
  FieldAdapter,
  FieldAdapterContext,
  FieldPropsAdapter,
  FieldState,
  ResolvedField,
  FormAdapter,
  IconAdapter,
  LayoutAdapter,
  LayoutComponentName,
  PresentationAdapter,
  PresentationRenderType,
  PreviewAdapter,
  ModalAdapter,
  ServiceAdapter,
  TableAdapter,
  UIMessageType,
  UIServiceHandle,
  UploadAdapter,
  UITableColumn,
  UITableFilterProps,
  UITablePagination,
  UITableRenderProps,
  UITableSelection,
  UITableSelectors,
  UIAdapter,
} from "./types";
