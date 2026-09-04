import { h } from "vue";
const globalConfig = {
  tagViewer: ["pink", "red", "orange", "green", "cyan", "blue", "purple"]
};
let activeAdapter;
const registeredUIComponents = {};
function defineUIAdapter(adapter) {
  return adapter;
}
function getUIAdapter() {
  if (!activeAdapter) {
    throw new Error("SuperForm 尚未初始化 UIAdapter，请先调用 superform.useAdapter(adapter)");
  }
  return activeAdapter;
}
function initializeUIAdapter(adapter) {
  if (activeAdapter && activeAdapter !== adapter) {
    throw new Error(`UIAdapter 已初始化为 '${activeAdapter.name}'，不能切换为 '${adapter.name}'`);
  }
  activeAdapter = adapter;
  registerUIComponents(adapter.fieldComponents || {});
}
function getUIFieldAdapter(type) {
  var _a;
  return (_a = getUIAdapter().fields) == null ? void 0 : _a[type];
}
function registerUIComponents(components) {
  Object.entries(components).forEach(([name, component]) => {
    if (component)
      registeredUIComponents[name] = component;
  });
}
function resolveUIComponent(type) {
  const field = getUIFieldAdapter(type);
  if (!field)
    return;
  return registeredUIComponents[field.component];
}
function requireUIComponent(type) {
  var _a;
  const component = resolveUIComponent(type);
  if (!component) {
    const registeredName = ((_a = getUIFieldAdapter(type)) == null ? void 0 : _a.component) ?? type;
    throw new Error(
      `UIAdapter '${getUIAdapter().name}' 支持字段 '${type}'，但组件 '${String(
        registeredName
      )}' 尚未注册；请启用自动导入插件，或使用 Adapter 的 full 入口`
    );
  }
  return component;
}
function resolveAdapterComponent(component) {
  return typeof component === "string" ? getUIAdapter().components[component] : component;
}
function requireAdapterComponent(component, capability) {
  const resolved = component && resolveAdapterComponent(component);
  if (!resolved)
    throw new Error(`UIAdapter '${getUIAdapter().name}' 未提供 ${capability} capability`);
  return resolved;
}
function mapModelBinding(props, model) {
  const mapped = { ...props };
  const { prop = "value", event = "update:value" } = model || {};
  if (prop !== "value") {
    mapped[prop] = mapped.value;
    delete mapped.value;
  }
  if (event !== "update:value") {
    const listener = event.startsWith("on") ? event : `on${event[0].toUpperCase()}${event.slice(1)}`;
    mapped[listener] = mapped["onUpdate:value"];
    delete mapped["onUpdate:value"];
  }
  return mapped;
}
function getUILayout(type) {
  const layout = getUIAdapter().layout;
  const configured = type === "compactSpace" ? (layout == null ? void 0 : layout.compactSpace) ?? (layout == null ? void 0 : layout.space) : layout == null ? void 0 : layout[type];
  return { component: requireAdapterComponent(configured, type), layout };
}
function renderUIForm(props, slots = {}) {
  var _a;
  const form = getUIAdapter().form;
  const component = requireAdapterComponent(form == null ? void 0 : form.component, "Form");
  return h(component, ((_a = form == null ? void 0 : form.transformProps) == null ? void 0 : _a.call(form, props)) ?? props, slots);
}
function renderUIFormItem(props, slots = {}) {
  var _a;
  const form = getUIAdapter().form;
  const component = requireAdapterComponent(form == null ? void 0 : form.item, "FormItem");
  return h(component, ((_a = form == null ? void 0 : form.transformItemProps) == null ? void 0 : _a.call(form, props)) ?? props, slots);
}
function validateUIForm(instance) {
  const form = getUIAdapter().form;
  if (!form)
    throw new Error(`UIAdapter '${getUIAdapter().name}' 未提供 Form capability`);
  return form.validate(instance);
}
function clearUIFormValidation(instance) {
  const form = getUIAdapter().form;
  if (!form)
    throw new Error(`UIAdapter '${getUIAdapter().name}' 未提供 Form capability`);
  return form.clearValidate(instance);
}
function renderUILayout(type, props = {}, slots = {}) {
  var _a, _b;
  const { component, layout } = getUILayout(type);
  return h(component, ((_b = (_a = layout == null ? void 0 : layout.transformProps) == null ? void 0 : _a[type]) == null ? void 0 : _b.call(_a, props)) ?? props, slots);
}
function getUIContainerAdapter(type) {
  var _a;
  return (_a = getUIAdapter().containers) == null ? void 0 : _a[type];
}
function mapUIContainerProps(type, props) {
  const container = getUIContainerAdapter(type);
  let mapped = mapModelBinding(props, container == null ? void 0 : container.model);
  if (container == null ? void 0 : container.transformProps)
    mapped = container.transformProps(mapped);
  return mapped;
}
function renderUIContainer(type, props = {}, slots = {}) {
  const container = getUIContainerAdapter(type);
  const component = requireAdapterComponent(container == null ? void 0 : container.component, `Container(${type})`);
  const mapped = mapUIContainerProps(type, props);
  return (container == null ? void 0 : container.render) ? container.render(component, mapped, slots) : h(component, mapped, slots);
}
function renderUIIcon(icon, context = {}) {
  const icons = getUIAdapter().icons;
  if (!icons)
    throw new Error(`UIAdapter '${getUIAdapter().name}' 未提供 Icon capability`);
  return icons.render(icon, context);
}
function renderUISemanticIcon(name) {
  var _a;
  const icons = getUIAdapter().icons;
  if (!icons)
    throw new Error(`UIAdapter '${getUIAdapter().name}' 未提供 Icon capability`);
  const component = (_a = icons.semantic) == null ? void 0 : _a[name];
  return component ? h(requireAdapterComponent(component, `Icon(${name})`)) : void 0;
}
function renderUIAction(type, props = {}, slots = {}) {
  const actions = getUIAdapter().actions;
  if (!actions)
    throw new Error(`UIAdapter '${getUIAdapter().name}' 未提供 Action capability`);
  return actions.render(type, props, slots);
}
function renderUIPresentation(type, props = {}, slots = {}) {
  const presentation = getUIAdapter().presentation;
  if (!presentation)
    throw new Error(`UIAdapter '${getUIAdapter().name}' 未提供 Presentation capability`);
  return presentation.render(type, props, slots);
}
function mapUIFieldProps(type, props, context) {
  const field = getUIFieldAdapter(type);
  let mapped = mapModelBinding({ ...field == null ? void 0 : field.defaultProps, ...props }, field == null ? void 0 : field.model);
  if (field == null ? void 0 : field.transformProps)
    mapped = field.transformProps(mapped, { type, ...context });
  return mapped;
}
function renderUIField(type, props, context, slots = {}) {
  const component = requireUIComponent(type);
  const field = getUIFieldAdapter(type);
  const mapped = mapUIFieldProps(type, props, context);
  return (field == null ? void 0 : field.render) ? field.render(component, mapped, { type, ...context }, slots) : h(component, mapped, slots);
}
function toNode(node, param = {}) {
  if (!node)
    return null;
  if (typeof node === "function") {
    return node(param || {}, {});
  } else if (typeof node !== "object") {
    return h("span", node);
  } else {
    return h(node, { effectData: param });
  }
}
export {
  renderUISemanticIcon as a,
  renderUIPresentation as b,
  renderUIAction as c,
  renderUIField as d,
  resolveUIComponent as e,
  renderUILayout as f,
  globalConfig as g,
  requireUIComponent as h,
  getUIFieldAdapter as i,
  renderUIFormItem as j,
  renderUIContainer as k,
  clearUIFormValidation as l,
  mapUIFieldProps as m,
  renderUIForm as n,
  registerUIComponents as o,
  initializeUIAdapter as p,
  defineUIAdapter as q,
  renderUIIcon as r,
  toNode as t,
  validateUIForm as v
};
