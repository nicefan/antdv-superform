import { get, set, merge as merge$1, isNumber, update, cloneDeep, isPlainObject, defaults, uniq, isArray, throttle, isFunction, mergeWith } from "lodash-es";
import { h, inject, reactive, ref, isRef, watchEffect, computed, toValue, toRef, watch, unref, toRefs, mergeProps, markRaw, defineComponent, openBlock, createBlock, resolveDynamicComponent, provide, watchPostEffect, toRaw, readonly, shallowRef, useAttrs, onMounted, shallowReactive, getCurrentInstance, onUnmounted, nextTick, createVNode, render as render$1, createElementBlock, Fragment, renderList, toDisplayString } from "vue";
import { nanoid } from "nanoid";
import { r as reservedSchemaTypes } from "./schemaTypes.js";
const globalConfig = {
  tagViewer: ["pink", "red", "orange", "green", "cyan", "blue", "purple"]
};
let activeAdapter;
const manualUIComponents = {};
const autoImportedUIComponents = {};
function defineUIAdapter(adapter) {
  return adapter;
}
function getUIAdapter() {
  if (!activeAdapter) {
    throw new Error(
      "SuperForm 尚未初始化 UIAdapter；官方产品请先调用 superForm.initialize()，独立 Core 请调用 superForm.useAdapter(adapter)"
    );
  }
  return activeAdapter;
}
function initializeUIAdapter(adapter) {
  if (activeAdapter && activeAdapter !== adapter) {
    throw new Error(
      `UIAdapter 已初始化为 '${activeAdapter.name}'，不能切换为 '${adapter.name}'`
    );
  }
  activeAdapter = adapter;
  registerUIComponents(adapter.fieldComponents || {}, "manual");
}
function getUIFieldAdapter(type) {
  var _a;
  return (_a = getUIAdapter().fields) == null ? void 0 : _a[type];
}
function registerUIComponents(components, source = "manual") {
  const registry = source === "manual" ? manualUIComponents : autoImportedUIComponents;
  Object.entries(components).forEach(([name, component]) => {
    if (component)
      registry[name] = component;
  });
}
function resolveUIComponent(type) {
  const field = getUIFieldAdapter(type);
  if (!field)
    return;
  return manualUIComponents[field.component] ?? autoImportedUIComponents[field.component];
}
function requireUIComponent(type) {
  var _a;
  const component = resolveUIComponent(type);
  if (!component) {
    const registeredName = ((_a = getUIFieldAdapter(type)) == null ? void 0 : _a.component) ?? type;
    throw new Error(
      `UIAdapter '${getUIAdapter().name}' 支持字段 '${type}'，但组件 '${String(
        registeredName
      )}' 尚未注册；请启用自动导入插件，或在 superForm.initialize({ components }) 中提供`
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
    throw new Error(
      `UIAdapter '${getUIAdapter().name}' 未提供 ${capability} capability`
    );
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
    throw new Error(
      `UIAdapter '${getUIAdapter().name}' 未提供 Form capability`
    );
  return form.validate(instance);
}
function clearUIFormValidation(instance) {
  const form = getUIAdapter().form;
  if (!form)
    throw new Error(
      `UIAdapter '${getUIAdapter().name}' 未提供 Form capability`
    );
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
  const component = requireAdapterComponent(
    container == null ? void 0 : container.component,
    `Container(${type})`
  );
  const mapped = mapUIContainerProps(type, props);
  return (container == null ? void 0 : container.render) ? container.render(component, mapped, slots) : h(component, mapped, slots);
}
function renderUIIcon(icon, context = {}) {
  const icons = getUIAdapter().icons;
  if (!icons)
    throw new Error(
      `UIAdapter '${getUIAdapter().name}' 未提供 Icon capability`
    );
  return icons.render(icon, context);
}
function renderUISemanticIcon(name) {
  var _a;
  const icons = getUIAdapter().icons;
  if (!icons)
    throw new Error(
      `UIAdapter '${getUIAdapter().name}' 未提供 Icon capability`
    );
  const component = (_a = icons.semantic) == null ? void 0 : _a[name];
  return component ? h(requireAdapterComponent(component, `Icon(${name})`)) : void 0;
}
function renderUIAction(type, props = {}, slots = {}) {
  const actions = getUIAdapter().actions;
  if (!actions)
    throw new Error(
      `UIAdapter '${getUIAdapter().name}' 未提供 Action capability`
    );
  return actions.render(type, props, slots);
}
function renderUIPresentation(type, props = {}, slots = {}) {
  const presentation = getUIAdapter().presentation;
  if (!presentation)
    throw new Error(
      `UIAdapter '${getUIAdapter().name}' 未提供 Presentation capability`
    );
  return presentation.render(type, props, slots);
}
function showUIMessage(type, content) {
  const services = getUIAdapter().services;
  if (!services)
    throw new Error(
      `UIAdapter '${getUIAdapter().name}' 未提供 Service capability`
    );
  return services.message(type, content);
}
function openUIConfirm(props) {
  const services = getUIAdapter().services;
  if (!services)
    throw new Error(
      `UIAdapter '${getUIAdapter().name}' 未提供 Service capability`
    );
  return services.confirm(props);
}
function openUIInfo(props) {
  const services = getUIAdapter().services;
  if (!services)
    throw new Error(
      `UIAdapter '${getUIAdapter().name}' 未提供 Service capability`
    );
  return services.info(props);
}
function renderUIModal(props = {}, slots = {}) {
  const modal = getUIAdapter().modal;
  if (!modal)
    throw new Error(
      `UIAdapter '${getUIAdapter().name}' 未提供 Modal capability`
    );
  return modal.render(props, slots);
}
function useUIModalContext() {
  var _a, _b;
  return (_b = (_a = getUIAdapter().modal) == null ? void 0 : _a.useContext) == null ? void 0 : _b.call(_a);
}
function wrapUIModalContext(content, context, props = {}) {
  var _a, _b;
  return ((_b = (_a = getUIAdapter().modal) == null ? void 0 : _a.wrapContext) == null ? void 0 : _b.call(_a, content, context, props)) ?? content();
}
function getUIUploadListIgnore() {
  const upload = getUIAdapter().upload;
  if (!upload)
    throw new Error(
      `UIAdapter '${getUIAdapter().name}' 未提供 Upload capability`
    );
  return upload.listIgnore;
}
function renderUIUpload(props = {}, slots = {}) {
  const upload = getUIAdapter().upload;
  if (!upload)
    throw new Error(
      `UIAdapter '${getUIAdapter().name}' 未提供 Upload capability`
    );
  return upload.render(props, slots);
}
function renderUIUploadTrigger(props = {}, slots = {}) {
  const upload = getUIAdapter().upload;
  if (!upload)
    throw new Error(
      `UIAdapter '${getUIAdapter().name}' 未提供 Upload capability`
    );
  return upload.renderTrigger(props, slots);
}
function renderUIPreview(props = {}) {
  const preview = getUIAdapter().preview;
  if (!preview)
    throw new Error(
      `UIAdapter '${getUIAdapter().name}' 未提供 Preview capability`
    );
  return preview.render(props);
}
function renderUITable(props, slots = {}) {
  const table = getUIAdapter().table;
  if (!table)
    throw new Error(
      `UIAdapter '${getUIAdapter().name}' 未提供 Table capability`
    );
  return table.render(props, slots);
}
function renderUITableFilter(props, slots = {}) {
  const table = getUIAdapter().table;
  if (!table)
    throw new Error(
      `UIAdapter '${getUIAdapter().name}' 未提供 Table capability`
    );
  return table.renderFilter(props, slots);
}
function getUITableSelectors() {
  const table = getUIAdapter().table;
  if (!table)
    throw new Error(
      `UIAdapter '${getUIAdapter().name}' 未提供 Table capability`
    );
  return table.selectors;
}
function mapUIFieldProps(type, props, context) {
  const field = getUIFieldAdapter(type);
  let mapped = mapModelBinding(
    { ...field == null ? void 0 : field.defaultProps, ...props },
    field == null ? void 0 : field.model
  );
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
function getIconNode(icon) {
  if (!icon)
    return;
  return renderUIIcon(icon, { customIcon: globalConfig.customIcon });
}
const getSemanticIconNode = renderUISemanticIcon;
function getEffectData(param) {
  const formData = inject("exaProvider", {}).data;
  return reactive({ ...param || {}, formData });
}
function getComputedStatus(org, dataRef) {
  const res = ref(isRef(org) ? org : !!org);
  if (typeof org === "function") {
    watchEffect(() => {
      res.value = org(dataRef);
    });
  }
  return res;
}
function useDisabled(dis, data) {
  return getComputedStatus(dis, data);
}
function getComputedAttr(handler, dataRef) {
  const result = reactive({});
  if (handler) {
    watchEffect(() => {
      Object.assign(result, handler(dataRef));
    });
  }
  return result;
}
function getListener(option = {}, effectData) {
  const listener = {};
  Object.keys(option).forEach((key) => {
    if (!option[key] || key === "onUpdate")
      return;
    if (key.match(/^on[A-Z]/)) {
      listener[key] = (...args) => option[key](effectData, ...args);
    } else if (key === "on") {
      Object.entries(option.on).forEach(([key2, fn]) => {
        const name = "on" + key2.charAt(0).toUpperCase() + key2.slice(1);
        listener[name] = (...args) => fn(effectData, ...args);
      });
    }
  });
  return listener;
}
function useVModel({ option, model, effectData }, defaultValue, behavior = {}) {
  const {
    field,
    endField: newEndField,
    keepField,
    labelField,
    stringifyValue: newStringifyValue,
    valueToString,
    computed: __computed,
    value,
    onUpdate
  } = option;
  const endField = newEndField ?? keepField;
  const stringifyValue = newStringifyValue ?? valueToString;
  const vModels = {};
  const vModelFields = option.vModelFields || {};
  if (labelField) {
    vModels["labelValue"] = computed(() => get(model.parent, labelField));
    vModels[`onUpdate:labelValue`] = (val) => {
      const value2 = stringifyValue ? val == null ? void 0 : val.toString() : val;
      set(model.parent, labelField, value2);
    };
  }
  Object.entries(vModelFields).forEach(([name, field2]) => {
    var _a;
    if (typeof field2 === "string") {
      (_a = model.parent)[field2] ?? (_a[field2] = void 0);
      vModels[name] = computed(() => get(model.parent, field2));
      vModels[`onUpdate:${name}`] = (val) => {
        set(model.parent, field2, val);
      };
    } else if (isRef(field2)) {
      vModels[name] = field2;
      vModels[`onUpdate:${name}`] = (val) => field2.value = val;
    } else {
      vModels[name] = field2;
    }
  });
  if (!field) {
    if (isRef(value)) {
      Object.assign(vModels, {
        value,
        "onUpdate:value": (val) => value.value = val
      });
    }
    return vModels;
  }
  if (defaultValue !== void 0)
    model.refData ?? (model.refData = toValue(defaultValue));
  const refValue = toRef(model, "refData");
  const tempData = ref();
  const updateValue = (val = toValue(defaultValue)) => {
    tempData.value = val;
    if (refValue.value !== val && defaultValue !== void 0)
      refValue.value = val;
  };
  Object.assign(vModels, {
    value: tempData,
    "onUpdate:value": updateValue
  });
  if (isRef(value)) {
    watch(refValue, (val) => value.value = val);
    watch(value, updateValue);
  }
  let raw = toValue(model.refData);
  let effect;
  if (behavior.splitRange && endField) {
    tempData.value = [refValue.value, model.parent[endField]];
    effect = (val) => {
      const [start, end] = val || [];
      refValue.value = start;
      raw = start;
      model.parent[endField] = end;
    };
    watch([refValue, () => model.parent[endField]], (arr) => {
      tempData.value = arr;
    });
  } else if (stringifyValue) {
    const convert = (val) => {
      return (val == null ? void 0 : val.toString().split(",")) || [];
    };
    tempData.value = convert(refValue.value);
    effect = (val) => {
      const str = (val == null ? void 0 : val.toString()) || "";
      refValue.value = str;
      raw = str;
    };
    watch(refValue, (val) => {
      val !== raw && (tempData.value = convert(val));
    });
  } else {
    tempData.value = raw;
    effect = (value2) => {
      refValue.value = value2;
      raw = value2;
    };
    watch(refValue, updateValue, { flush: "sync" });
  }
  watch(tempData, effect, { flush: "sync" });
  if (onUpdate) {
    watch(refValue, () => onUpdate(effectData));
  }
  if (__computed) {
    watch(
      // 使用ref让计算结果即使一样也会进行后面的赋值
      () => ref(__computed(raw, effectData)),
      (val) => effect(unref(val)),
      { immediate: true }
    );
  }
  return vModels;
}
function render({ option, effectData, inheritDisabled }) {
  const { type, dynamicAttrs: __attrs, disabled: __disabled, hidden: __hidden, required: __required } = option;
  const hidden = getComputedStatus(__hidden, effectData);
  const required = getComputedStatus(__required, effectData);
  const disabled = inheritDisabled === void 0 && __disabled === void 0 ? void 0 : computed(() => {
    let bool = toValue(inheritDisabled);
    if (!bool) {
      if (typeof __disabled === "function") {
        bool = !!__disabled(effectData);
      } else {
        bool = toValue(__disabled);
      }
    }
    return bool;
  });
  const listener = getListener(option, effectData);
  const computedAttr = typeof __attrs === "function" ? { ...toRefs(getComputedAttr(__attrs, effectData)) } : {};
  const __merged = mergeProps({ ...globalProps[type] }, { ...option.attrs }, listener, computedAttr);
  const attrs = merge$1({}, option.attrs, __merged, { disabled });
  return { attrs, hidden, required };
}
function formatStr(str, data = {}) {
  const reg = new RegExp("{(\\w*)}", "g");
  return str.replace(reg, (match, key) => data[key] || "");
}
const ruleTypeMap = {
  email: {
    type: "email",
    message: "请输入正确的邮箱地址"
  },
  integer: {
    type: "integer",
    message: "{label}必须为整数",
    pattern: /^[+]{0,1}(\d+)$/,
    transform: (value) => Number(value)
  },
  number: {
    type: "number",
    message: "{label}必须为数字",
    transform: (value) => Number(value)
  },
  idcard: {
    pattern: /^[1-9]\d{5}(19[4-9]|20[0,1])\d(0[1-9]|1[0-2])([0-2][0-9]|30|31)\d{3}[\d|X|x]$/,
    message: "请输入正确的身份证号"
  },
  phone: {
    pattern: /^(\d{3,4}-?)?\d{7,8}$/,
    message: "请输入正确的电话号码"
  },
  mobile: {
    pattern: /^1[3-9][0-9]\d{8}$/,
    message: "请输入正确的手机号"
  },
  twoDecimal: {
    pattern: /^-?\d+(\.\d{1,2})?$/,
    message: "最多支持2位小数"
  },
  word: {
    pattern: /^[A-Za-z0-9][A-Za-z0-9_]*$/,
    message: "{label}只能为字母数字及下划线，且首字符不能为_"
  }
};
const rangeMsg = {
  "string": {
    len: "{label}长度必须等于{len}",
    max: "{label}长度不能超过{max}",
    min: "{label}长度至少为{min}",
    range: "{label}长度必须{min}至{max}之间"
  },
  "number": {
    len: "{label}需等于{len}",
    max: "{label}需小于{max}",
    min: "{label}需大于{min}",
    range: "{label}需在{min}至{max}之间"
  }
};
function getRangeRule(type, len, max, min) {
  let rule;
  if (len) {
    rule = { type, len, message: "len" };
  } else if (isNumber(max) && isNumber(min)) {
    rule = { type, max, min, message: "range" };
  } else if (isNumber(max)) {
    rule = { type, max, message: "max" };
  } else if (isNumber(min)) {
    rule = { type, min, message: "min" };
  } else {
    return false;
  }
  if (type === "number") {
    rule.message = rangeMsg.number[rule.message];
    rule.transform = (value) => Number(value);
  } else {
    rule.message = rangeMsg.string[rule.message];
  }
  return rule;
}
function buildRule(item, label = "") {
  const { trigger, required, type = "string", len, max, min, pattern, validator, message } = item || {};
  const rules = [];
  if (required) {
    if (type === "string" || type in ruleTypeMap) {
      rules.push({
        required,
        trigger,
        // validator: noEmpty,
        pattern: /^[\s\S]*.*[^\s][\s\S]*$/,
        // transform: (value) => value + '',
        // whitespace: true,
        message: message || `${label}不能为空！`
      });
    } else {
      rules.push({ required, trigger, message: message || `${label}不能为空！` });
    }
  }
  const typeRule = ruleTypeMap[type];
  if (typeRule) {
    const message2 = formatStr(typeRule.message, { label });
    rules.push({ ...typeRule, trigger, message: message2 });
  }
  if (pattern) {
    rules.push({ pattern, trigger, message });
  }
  if (len || isNumber(max) || isNumber(min)) {
    const rule = getRangeRule(type, len, max, min);
    const message2 = formatStr(rule.message, { label, len, max, min });
    rules.push({ ...rule, trigger, message: message2, type });
  }
  if (validator) {
    rules.push({ validator, trigger });
  }
  return rules;
}
function buildModelData(option, origin, __chain) {
  const { field, columns, subItems, initialValue, value } = option;
  const relatedField = option.endField ?? option.keepField ?? option.labelField;
  const nameArr = field ? field.split(".") : [];
  const propChain = __chain.concat(nameArr);
  const refName = nameArr.splice(-1)[0];
  const model = reactive({
    refName,
    initialValue,
    fieldName: field,
    origin,
    parent: origin,
    refData: origin,
    propChain
  });
  if (refName) {
    if (nameArr.length)
      model.parent = computed(() => get(origin.value, nameArr));
    model.refData = computed({
      get: () => get(origin.value, field),
      set: (val) => set(origin.value, field, val)
    });
    watch(
      origin,
      () => {
        model.refData ?? (model.refData = toValue(initialValue) ?? toValue(value) ?? (columns && [] || subItems && {}));
        if (relatedField)
          update(model.parent, relatedField, (v) => v);
      },
      { immediate: true, flush: "sync" }
    );
  } else if (value) {
    model.refData = ref(value);
    model.propChain = [];
  }
  return model;
}
const formatRule = (rules, effectData) => {
  return rules == null ? void 0 : rules.map((item) => {
    if (!item.validator)
      return item;
    const validator = async (data, ...args) => {
      const re = await item.validator({ ...data, ...effectData }, ...args);
      if (re === false || re instanceof Error) {
        throw re;
      }
    };
    return { ...item, validator };
  });
};
function buildModelsMap(items, data, propChain = []) {
  const currentData = toRef(data || {});
  const rules = {};
  const modelsMap = /* @__PURE__ */ new Map();
  items.forEach((child) => {
    if (typeof child !== "object")
      return;
    const subModel = buildModelData(child, currentData, propChain);
    const { required, label, subItems, columns } = child;
    if ((child.rules || required) && subModel.propChain.length) {
      const _rules = child.rules || [];
      const _r = Array.isArray(_rules) ? _rules : [_rules];
      if (required) {
        const first = _r[0];
        if (first) {
          first.required = required;
        } else {
          _r.push({ required });
        }
      }
      let ruleType = "string";
      if (subModel.refData) {
        const baseType = typeof subModel.refData;
        ruleType = baseType === "object" && Array.isArray(subModel.refData) ? "array" : baseType;
      }
      subModel.rules = _r.map((item) => buildRule({ type: ruleType, ...item }, label)).flat();
      rules[subModel.propChain.join(".")] = subModel.rules;
    }
    if (subItems) {
      const children = buildModelsMap(subItems, toRef(subModel, "refData"), subModel.propChain);
      Object.assign(rules, children.rules);
      subModel.children = children.modelsMap;
    } else if (columns) {
      subModel.listData = buildModelsMap(columns);
    }
    modelsMap.set(markRaw(child), subModel);
  });
  return {
    rules,
    modelsMap
  };
}
function cloneModels(orgModels, data, parentChain = [], index) {
  const currentData = toRef(data || {});
  const newRules = {};
  const models = [...orgModels].map(([option, model]) => {
    const { children, rules, listData } = model;
    const chain = index !== void 0 ? [...parentChain, index] : parentChain;
    const newModel = buildModelData(option, currentData, chain);
    if (index !== void 0) {
      newModel.index = index;
    }
    newModel.rules = rules;
    if (newModel.propChain.length && rules) {
      newRules[newModel.propChain.join(".")] = rules;
    }
    if (children) {
      const { modelsMap, rules: childrenRules } = cloneModels(children, toRef(newModel, "refData"), newModel.propChain);
      Object.assign(newRules, childrenRules);
      newModel.children = modelsMap;
    }
    if (listData) {
      newModel.listData = listData;
    }
    return [option, newModel];
  });
  return { modelsMap: new Map(models), rules: newRules };
}
function cloneModelsFlat(orgMaps, data, chain, index) {
  const { modelsMap, rules } = cloneModels(orgMaps, data, chain, index);
  const newMaps = [];
  (function deepCopy(_maps) {
    for (const [option, model] of _maps) {
      newMaps.push([option, model]);
      if (model.children) {
        deepCopy(model.children);
      }
    }
  })(modelsMap);
  return { modelsMap: new Map(newMaps), rules };
}
const hasOwn = (target, key) => Object.prototype.hasOwnProperty.call(target, key);
function resetFields(origin, data = {}, initial = {}) {
  for (const [key, value] of Object.entries(origin)) {
    if (Array.isArray(value)) {
      origin[key] = cloneDeep((data == null ? void 0 : data[key]) ?? (initial == null ? void 0 : initial[key]));
    } else if (Object.prototype.toString.call(value) === "[object Object]") {
      resetFields(value, data == null ? void 0 : data[key], initial == null ? void 0 : initial[key]);
    } else {
      origin[key] = (data == null ? void 0 : data[key]) ?? (initial == null ? void 0 : initial[key]);
    }
  }
}
function setFieldsValue(origin, data, initial = {}) {
  for (const [key, currentValue] of Object.entries(origin)) {
    if (!hasOwn(data, key))
      continue;
    const newData = data[key] ?? (initial == null ? void 0 : initial[key]);
    if (isPlainObject(currentValue) && isPlainObject(newData)) {
      setFieldsValue(currentValue, newData, initial == null ? void 0 : initial[key]);
    } else if (Array.isArray(newData) || isPlainObject(newData)) {
      origin[key] = cloneDeep(newData);
    } else {
      origin[key] = newData;
    }
  }
}
function usePromise() {
  let resolve;
  const promise = new Promise((_resolve) => {
    resolve = _resolve;
  });
  return { promise, resolve };
}
function useGetRef() {
  const formRef = ref();
  let status = usePromise();
  let waiting = true;
  watch(formRef, (form) => {
    if (form) {
      status.resolve(true);
      waiting = false;
    } else if (!waiting) {
      status = usePromise();
      waiting = true;
    }
  });
  const getForm = () => status.promise.then(() => formRef.value);
  return [formRef, getForm];
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
function useInnerSlots(slots, effectData, rootSlots) {
  const __rootSlots = rootSlots || inject("rootSlots", {});
  const innerSlots = {};
  if (slots) {
    Object.entries(slots).forEach(([key, value]) => {
      const slot = typeof value === "string" ? __rootSlots[value] : value;
      if (!slot)
        return;
      innerSlots[key] = (data) => typeof slot === "function" ? slot({ ...effectData, ...data || {} }) : slot;
    });
  }
  return innerSlots;
}
const getVModelProps = (options, parent) => {
  const vModels = {};
  if (options.vModelFields) {
    Object.entries(options.vModelFields).forEach(([name, field]) => {
      vModels[name] = parent[field];
    });
  }
  return vModels;
};
const formatOptions = (opt, labelName, valueName) => {
  if (isPlainObject(opt) || !isPlainObject(opt == null ? void 0 : opt[0])) {
    return Object.entries(opt).map(([key, label]) => ({ value: key, label }));
  } else {
    return Array.isArray(opt) ? opt.map((item) => ({ label: item[labelName], value: item[valueName] })) : [];
  }
};
const getOptions = (option, _effectData, optionsArr) => {
  var _a, _b, _c, _d;
  const { options, dictName } = option;
  const labelName = ((_b = (_a = option.attrs) == null ? void 0 : _a.fieldNames) == null ? void 0 : _b.label) || "label";
  const valueName = ((_d = (_c = option.attrs) == null ? void 0 : _c.fieldNames) == null ? void 0 : _d.value) || "value";
  const __options = unref(options);
  if (dictName && globalConfig.dictApi) {
    globalConfig.dictApi(dictName).then((data) => optionsArr.value = data);
  } else if (typeof options === "function") {
    Promise.resolve(options(_effectData)).then((data) => {
      optionsArr.value = formatOptions(data, labelName, valueName);
    }).catch((err) => {
      console.warn("useOptionsLabel", err);
    });
  } else {
    optionsArr.value = formatOptions(__options, labelName, valueName);
  }
};
const buildTagRender = ({ value, label = value, color, icon, tagViewer = true }) => {
  const item = { color, label, icon };
  if (tagViewer !== true || !color) {
    const tagOption = tagViewer === true ? globalConfig.tagViewer : tagViewer;
    if (typeof tagOption === "function") {
      const res = tagOption(value);
      if (isPlainObject(res)) {
        Object.assign(item, res);
      } else {
        item.color = res;
      }
    } else if (Array.isArray(tagOption) && isPlainObject(tagOption[0])) {
      const tag = tagOption.find((item2) => item2.value == value);
      Object.assign(item, tag);
    }
    item.color ?? (item.color = color || tagOption[value] || value === true && "success" || value === false && "error" || "default");
  }
  return renderUIPresentation(
    "tag",
    { color: item.color },
    {
      default: () => item.label || value,
      icon: item.icon || (() => getIconNode(item.icon))
    }
  );
};
function getViewNode(option, effectData = {}) {
  const {
    type: colType = "",
    viewRender,
    render: render$12,
    options: colOptions,
    dictName,
    labelField,
    valueToNumber,
    tagViewer,
    initialValue
  } = option;
  const endField = option.endField ?? option.keepField;
  const rootSlots = inject("rootSlots", {});
  const __render = viewRender || colType === "InfoSlot" && render$12;
  const colRender = typeof __render === "string" ? rootSlots[__render] : __render;
  if (__render && !colRender)
    return false;
  let autoTag = false;
  const content = (() => {
    var _a, _b;
    if (labelField) {
      return ({ current } = effectData) => String(get(current, labelField) ?? "");
    } else if (endField) {
      return ({ current, text } = effectData) => (text || "") + " - " + (get(current, endField) || "");
    } else if ((colOptions || dictName) && colType !== "AutoComplete") {
      autoTag = !(tagViewer === false || !tagViewer && globalConfig.tagViewer === false);
      let labelAsValue = option.labelAsValue ?? option.valueToLabel;
      if (((_a = unref(colOptions)) == null ? void 0 : _a[0]) && !isPlainObject((_b = unref(colOptions)) == null ? void 0 : _b[0]) && !valueToNumber) {
        labelAsValue = true;
      }
      const optionsArr = ref();
      return (param = effectData, inner) => {
        const tags = [];
        const text = (param.text || param.value) ?? toValue(initialValue) ?? "";
        if (text === "")
          return "";
        if (labelAsValue) {
          return !inner && autoTag ? buildTagRender({ value: text, label: text, tagViewer }) : text;
        }
        if (!optionsArr.value) {
          getOptions(option, param, optionsArr);
        }
        const arr = Array.isArray(text) ? text : typeof text === "string" ? text.split(",") : [text];
        const values = arr.map((val) => {
          var _a2;
          const item = (_a2 = unref(optionsArr)) == null ? void 0 : _a2.find(({ value }) => value == val);
          if (!inner && autoTag) {
            tags.push(buildTagRender({ value: val, label: val, ...item, tagViewer }));
          }
          return item ? item.label : val;
        });
        return tags.length ? tags : values.join(",");
      };
    } else if (colType === "Switch") {
      return ({ text } = effectData) => (option.valueLabels || "否是")[text ?? toValue(initialValue)];
    }
  })();
  const ISINNER = true;
  if (colRender) {
    return (param = effectData) => {
      const vModels = getVModelProps(option, param.current);
      const { attrs: controlledAttrs } = render({ option, effectData: param });
      const attrs = { ...controlledAttrs };
      delete attrs.disabled;
      const props = reactive({
        props: { ...attrs, ...vModels },
        ...param,
        ...content && { text: computed(() => content(param, ISINNER)) },
        isView: true
      });
      return colRender(props);
    };
  } else if (tagViewer && !autoTag) {
    return (param = effectData) => {
      const text = param.text ?? toValue(initialValue);
      if (typeof text === "boolean" && tagViewer === true) {
        return buildTagRender({
          label: text ? "是" : "否",
          color: text ? "success" : "error"
        });
      }
      const arr = Array.isArray(text) ? text : typeof text === "string" ? text.split(",") : [text];
      const tags = arr.map((value) => buildTagRender({ value, tagViewer }));
      return tags;
    };
  } else if (colType === "Text" && (option.attrs || option.dynamicAttrs)) {
    return (param = effectData) => {
      const text = (content == null ? void 0 : content(param)) || (param.value ?? toValue(initialValue));
      const dynamicAttrs = getComputedAttr(option.dynamicAttrs, param);
      const attrs = mergeProps({ ...option.attrs, title: text }, dynamicAttrs);
      return h("span", attrs, text);
    };
  } else if (colType === "HTML") {
    return (param = effectData) => {
      const dynamicAttrs = getComputedAttr(option.dynamicAttrs, param);
      const attrs = mergeProps({ ...option.attrs, innerHTML: param.value }, dynamicAttrs);
      return h("span", attrs);
    };
  } else if (colType === "TextArea") {
    return (param = effectData) => {
      return h("pre", { style: "white-space: break-spaces;" }, param.value ?? toValue(initialValue));
    };
  } else if (!content && (colType === "Upload" || getFormComponent(colType))) {
    return (param = effectData) => {
      const vModels = getVModelProps(option, param.current);
      const slots = useInnerSlots(option.slots, param, rootSlots);
      const {
        attrs: { disabled, ...attrs }
      } = render({ option, effectData: param });
      if (colType === "Upload") {
        return h(
          Controls.Upload,
          reactive({ option, effectData: param, ...attrs, ...vModels, value: param.value, isView: true, disabled }),
          slots
        );
      }
      const definition = getFormComponent(colType);
      return definition && h(
        definition.component,
        reactive(
          mapFormComponentModel(definition, {
            ...attrs,
            ...vModels,
            value: param.value,
            disabled
          })
        ),
        slots
      );
    };
  } else if (colType === "Buttons") {
    const buttonsSlot = createButtons({ config: option, isView: true });
    return !!buttonsSlot && ((param = effectData) => buttonsSlot({ param }));
  } else {
    return content;
  }
}
const createLabelNode = (option, effectData) => {
  const { title, label, labelSlot, tooltip } = option;
  const tipProps = tooltip && (isPlainObject(tooltip) ? tooltip : { title: tooltip });
  const _label = title || labelSlot || label;
  return _label === void 0 ? void 0 : () => [
    toNode(_label, effectData),
    tooltip && renderUIAction("tooltip", tipProps, {
      title: () => toNode(tooltip.title, effectData),
      default: () => h(
        "span",
        {
          class: "sup-label-tooltip"
        },
        tooltip.icon ? getIconNode(tooltip.icon) : getSemanticIconNode("info")
      )
    })
  ];
};
const BUILTIN_TYPES = /* @__PURE__ */ new Set([
  "Input",
  "TextArea",
  "InputNumber",
  "AutoComplete",
  "Select",
  "TreeSelect",
  "DatePicker",
  "DateRangePicker",
  "TimePicker",
  "TimeRangePicker",
  "Switch",
  "Radio",
  "RadioGroup",
  "Checkbox",
  "CheckboxGroup",
  "Upload",
  "TagInput",
  "TagSelect",
  "Text",
  "HTML",
  "Hidden",
  "InputSlot",
  "InfoSlot",
  "Buttons",
  "Form",
  "Group",
  "Fragment",
  "Card",
  "List",
  "ListGroup",
  "Tabs",
  "Collapse",
  "Descriptions",
  "Table",
  "InputGroup",
  "InputList"
]);
const DEPRECATED_KEYS = {
  hideInTable: "使用 exclude: ['table']",
  hideInForm: "使用 exclude: ['form']",
  hideInDescription: "使用 exclude: ['description']",
  searchSchema: "使用 searchForm",
  editForm: "使用 rowEditor.form",
  validOn: "使用 visibleIn",
  invalidDisabled: "使用 unauthorized: 'disable'",
  roleMode: "使用 unauthorized: 'hide' | 'disable'",
  valueToLabel: "使用 labelAsValue",
  valueToString: "使用 stringifyValue",
  blocked: "使用 block",
  wrapping: "使用 breakAfter",
  forSlot: "使用 targetSlot",
  keepField: "使用 endField"
};
const INPUT_TYPES = /* @__PURE__ */ new Set(["Input", "InputNumber", "TextArea", "AutoComplete"]);
const SELECT_TYPES = /* @__PURE__ */ new Set(["Select", "TreeSelect"]);
const OPTION_TYPES = /* @__PURE__ */ new Set(["Select", "TreeSelect", "RadioGroup", "CheckboxGroup"]);
const CONTAINER_TYPES = /* @__PURE__ */ new Set([
  "Form",
  "Group",
  "Fragment",
  "Card",
  "List",
  "ListGroup",
  "Tabs",
  "Collapse",
  "Descriptions",
  "Table"
]);
const EXCLUDE_VALUES = /* @__PURE__ */ new Set(["table", "form", "description"]);
const DATA_KEYS = /* @__PURE__ */ new Set([
  "attrs",
  "dynamicAttrs",
  "dataSource",
  "initialValue",
  "options",
  "params",
  "rules",
  "treeData",
  "value"
]);
const isObject = (value) => value !== null && typeof value === "object" && !Array.isArray(value);
const issue = (level, code, path, message) => ({ level, code, path, message });
function scanDeprecated(value, path, diagnostics, seen) {
  if (!value || typeof value !== "object" || seen.has(value))
    return;
  seen.add(value);
  if (isObject(value)) {
    for (const [key, replacement] of Object.entries(DEPRECATED_KEYS)) {
      if (Object.prototype.hasOwnProperty.call(value, key)) {
        diagnostics.push(issue("warning", "deprecated-api", `${path}.${key}`, `已废弃，${replacement}。`));
      }
    }
  }
  for (const [key, child] of Object.entries(value)) {
    if (typeof child === "function" || DATA_KEYS.has(key))
      continue;
    if (Array.isArray(child)) {
      child.forEach((item, index) => scanDeprecated(item, `${path}.${key}[${index}]`, diagnostics, seen));
    } else if (isObject(child)) {
      scanDeprecated(child, `${path}.${key}`, diagnostics, seen);
    }
  }
}
function diagnoseItem(item, path, diagnostics, kind, schemaTypes) {
  var _a, _b, _c;
  if (!isObject(item)) {
    if (typeof item !== "string")
      diagnostics.push(issue("error", "invalid-item", path, "字段配置必须是对象。"));
    return;
  }
  const { type } = item;
  if (type !== void 0 && (typeof type !== "string" || !schemaTypes.has(type))) {
    diagnostics.push(issue("error", "unknown-type", `${path}.type`, `未知字段类型 ${JSON.stringify(type)}。`));
  }
  if (type === void 0 && kind !== "table") {
    diagnostics.push(issue("warning", "missing-type", `${path}.type`, "表单或详情字段建议明确配置 type。"));
  }
  if (Array.isArray(item.exclude)) {
    const invalid = item.exclude.filter((value) => !EXCLUDE_VALUES.has(value));
    if (invalid.length) {
      diagnostics.push(
        issue(
          "error",
          "invalid-exclude",
          `${path}.exclude`,
          `只支持 table、form、description，当前包含：${invalid.join("、")}。`
        )
      );
    }
  } else if (item.exclude !== void 0) {
    diagnostics.push(issue("error", "invalid-exclude", `${path}.exclude`, "exclude 必须是字符串数组。"));
  }
  if (item.visibleIn !== void 0 && !["form", "detail", "both"].includes(item.visibleIn)) {
    diagnostics.push(
      issue("error", "invalid-visible-in", `${path}.visibleIn`, "visibleIn 只支持 'form'、'detail'、'both'。")
    );
  }
  if (item.unauthorized !== void 0 && !["hide", "disable"].includes(item.unauthorized)) {
    diagnostics.push(
      issue("error", "invalid-unauthorized", `${path}.unauthorized`, "unauthorized 只支持 'hide'、'disable'。")
    );
  }
  if (OPTION_TYPES.has(type) && !item.options && !item.dictName) {
    diagnostics.push(issue("warning", "missing-options", path, `${type} 未配置 options 或 dictName。`));
  }
  const placeholder = (_a = item.attrs) == null ? void 0 : _a.placeholder;
  const defaultPlaceholder = INPUT_TYPES.has(type) ? `请输入${typeof item.label === "string" ? item.label : ""}` : SELECT_TYPES.has(type) ? `请选择${typeof item.label === "string" ? item.label : ""}` : void 0;
  if (defaultPlaceholder !== void 0 && placeholder === defaultPlaceholder) {
    diagnostics.push(
      issue("suggestion", "redundant-default", `${path}.attrs.placeholder`, "与内置 placeholder 相同，可以省略。")
    );
  }
  const defaultValueFormat = ["DatePicker", "DateRangePicker"].includes(type) ? "YYYY-MM-DD" : ["TimePicker", "TimeRangePicker"].includes(type) ? "HH:mm:ss" : void 0;
  if (defaultValueFormat && ((_b = item.attrs) == null ? void 0 : _b.valueFormat) === defaultValueFormat) {
    diagnostics.push(
      issue("suggestion", "redundant-default", `${path}.attrs.valueFormat`, "与内置 valueFormat 相同，可以省略。")
    );
  }
  if (type === "InputGroup" && ((_c = item.attrs) == null ? void 0 : _c.compact) === true) {
    diagnostics.push(
      issue("suggestion", "redundant-default", `${path}.attrs.compact`, "InputGroup 默认使用紧凑布局，可以省略。")
    );
  }
  if (item.block === false && !CONTAINER_TYPES.has(type)) {
    diagnostics.push(issue("suggestion", "redundant-default", `${path}.block`, "block: false 是默认行为，可以省略。"));
  }
  if (item.breakAfter === false) {
    diagnostics.push(
      issue("suggestion", "redundant-default", `${path}.breakAfter`, "breakAfter: false 是默认行为，可以省略。")
    );
  }
  if ((item.options || item.dictName) && item.tagViewer === true) {
    diagnostics.push(
      issue("suggestion", "redundant-default", `${path}.tagViewer`, "选项字段默认使用 Tag 展示，可以省略。")
    );
  }
  for (const key of ["hidden", "disabled"]) {
    if (item[key] === false) {
      diagnostics.push(issue("suggestion", "redundant-default", `${path}.${key}`, `${key}: false 可以省略。`));
    }
  }
  if (Object.prototype.hasOwnProperty.call(item, "initialValue") && item.initialValue === void 0) {
    diagnostics.push(
      issue("suggestion", "redundant-default", `${path}.initialValue`, "initialValue: undefined 可以省略。")
    );
  }
  for (const key of ["attrs", "rowProps"]) {
    if (isObject(item[key]) && Object.keys(item[key]).length === 0) {
      diagnostics.push(issue("suggestion", "empty-config", `${path}.${key}`, `空的 ${key} 配置可以省略。`));
    }
  }
  for (const key of ["rules", "options"]) {
    if (Array.isArray(item[key]) && item[key].length === 0) {
      diagnostics.push(issue("suggestion", "empty-config", `${path}.${key}`, `空的 ${key} 配置可以省略。`));
    }
  }
  if (item.subItems)
    diagnoseItems(item.subItems, `${path}.subItems`, diagnostics, kind === "table" ? "form" : kind, schemaTypes);
  if (item.columns)
    diagnoseItems(item.columns, `${path}.columns`, diagnostics, "table", schemaTypes);
}
function diagnoseItems(items, path, diagnostics, kind, schemaTypes) {
  if (!Array.isArray(items)) {
    diagnostics.push(issue("error", "invalid-items", path, "必须是数组。"));
    return;
  }
  const fields = /* @__PURE__ */ new Map();
  items.forEach((item, index) => {
    const itemPath = `${path}[${index}]`;
    diagnoseItem(item, itemPath, diagnostics, kind, schemaTypes);
    if (!isObject(item) || typeof item.field !== "string" || !item.field)
      return;
    if (fields.has(item.field)) {
      diagnostics.push(
        issue(
          "warning",
          "duplicate-field",
          `${itemPath}.field`,
          `字段 ${item.field} 与 ${fields.get(item.field)} 重复。`
        )
      );
    } else {
      fields.set(item.field, `${path}[${index}].field`);
    }
  });
}
function diagnoseSchema$1(schema, kind = "auto", registeredTypes = []) {
  var _a, _b, _c, _d, _e, _f, _g;
  const diagnostics = [];
  if (!isObject(schema))
    return [issue("error", "invalid-schema", "schema", "schema 必须是对象。")];
  const schemaTypes = /* @__PURE__ */ new Set([...BUILTIN_TYPES, ...registeredTypes]);
  scanDeprecated(schema, "schema", diagnostics, /* @__PURE__ */ new WeakSet());
  const resolvedKind = kind === "auto" ? Array.isArray(schema.columns) ? "table" : "form" : kind;
  if (!["form", "table", "detail"].includes(resolvedKind)) {
    return [issue("error", "invalid-schema-type", "schema", `未知 schema 类型 ${JSON.stringify(kind)}。`)];
  }
  if (schema.subSpan === 8)
    diagnostics.push(issue("suggestion", "redundant-default", "schema.subSpan", "subSpan: 8 是默认值，可以省略。"));
  if (schema.gutter === 16)
    diagnostics.push(issue("suggestion", "redundant-default", "schema.gutter", "gutter: 16 是默认值，可以省略。"));
  if (isObject(schema.params) && Object.keys(schema.params).length === 0) {
    diagnostics.push(issue("suggestion", "empty-config", "schema.params", "空的 params 配置可以省略。"));
  }
  if (resolvedKind === "table") {
    for (const key of ["editMode", "addMode"]) {
      if (Object.prototype.hasOwnProperty.call(schema, key)) {
        diagnostics.push(issue("warning", "deprecated-api", `schema.${key}`, `已废弃，使用 rowEditor.${key}。`));
      }
    }
    if (!Array.isArray(schema.columns))
      diagnostics.push(issue("error", "missing-columns", "schema.columns", "表格必须配置 columns。"));
    else
      diagnoseItems(schema.columns, "schema.columns", diagnostics, "table", schemaTypes);
    if (schema.immediate === true)
      diagnostics.push(
        issue("suggestion", "redundant-default", "schema.immediate", "immediate: true 是默认值，可以省略。")
      );
    if (schema.pagination === false)
      diagnostics.push(
        issue("suggestion", "redundant-default", "schema.pagination", "pagination: false 是默认值，可以省略。")
      );
    if (((_a = schema.attrs) == null ? void 0 : _a.rowKey) === "id")
      diagnostics.push(
        issue("suggestion", "redundant-default", "schema.attrs.rowKey", "rowKey: 'id' 是默认值，可以省略。")
      );
    if (((_b = schema.attrs) == null ? void 0 : _b.size) === "small")
      diagnostics.push(
        issue("suggestion", "redundant-default", "schema.attrs.size", "size: 'small' 是默认值，可以省略。")
      );
    if (((_c = schema.attrs) == null ? void 0 : _c.tableLayout) === "fixed")
      diagnostics.push(
        issue(
          "suggestion",
          "redundant-default",
          "schema.attrs.tableLayout",
          "tableLayout: 'fixed' 是默认值，可以省略。"
        )
      );
    if (isObject(schema.pagination) && schema.pagination.current === 1)
      diagnostics.push(
        issue("suggestion", "redundant-default", "schema.pagination.current", "分页 current 默认是 1，可以省略。")
      );
    if (isObject(schema.pagination) && schema.pagination.pageSize === 10)
      diagnostics.push(
        issue("suggestion", "redundant-default", "schema.pagination.pageSize", "分页 pageSize 默认是 10，可以省略。")
      );
    if ((_d = schema.searchForm) == null ? void 0 : _d.subItems)
      diagnoseItems(schema.searchForm.subItems, "schema.searchForm.subItems", diagnostics, "form", schemaTypes);
    if ((_f = (_e = schema.rowEditor) == null ? void 0 : _e.form) == null ? void 0 : _f.subItems)
      diagnoseItems(schema.rowEditor.form.subItems, "schema.rowEditor.form.subItems", diagnostics, "form", schemaTypes);
  } else if (!Array.isArray(schema.subItems)) {
    diagnostics.push(issue("error", "missing-sub-items", "schema.subItems", "表单或详情必须配置 subItems。"));
  } else {
    if (((_g = schema.attrs) == null ? void 0 : _g.labelAlign) === "right")
      diagnostics.push(
        issue("suggestion", "redundant-default", "schema.attrs.labelAlign", "labelAlign: 'right' 是默认值，可以省略。")
      );
    diagnoseItems(schema.subItems, "schema.subItems", diagnostics, resolvedKind, schemaTypes);
  }
  return diagnostics;
}
function diagnoseSchema(schema, kind = "auto") {
  return diagnoseSchema$1(schema, kind, getRegisteredFormComponentTypes());
}
function reportSchemaDiagnostics(schema, kind, name) {
  var _a, _b;
  const diagnostics = diagnoseSchema(schema, kind);
  if (!diagnostics.length)
    return diagnostics;
  (_a = console.groupCollapsed) == null ? void 0 : _a.call(console, `[superform] ${name} schema 诊断：${diagnostics.length} 项`);
  diagnostics.forEach(({ level, path, message }) => {
    const output = `[superform] ${path}: ${message}`;
    if (level === "error")
      console.error(output);
    else if (level === "warning")
      console.warn(output);
    else
      console.info(output);
  });
  (_b = console.groupEnd) == null ? void 0 : _b.call(console);
  return diagnostics;
}
const getDefault = () => {
  return merge$1(
    {
      add: {
        label: "新增",
        attrs: {
          type: "primary"
        }
      },
      delete: {
        label: "删除",
        attrs: {
          danger: true
        },
        confirmText: "确定要删除吗？",
        disabled: (param) => {
          var _a;
          return !param.record && !(((_a = param.selectedRows) == null ? void 0 : _a.length) > 0);
        }
      },
      edit: {
        label: "修改",
        disabled: (param) => {
          var _a;
          return !param.record && !(((_a = param.selectedRows) == null ? void 0 : _a.length) === 1);
        }
      },
      detail: {
        label: "查看",
        disabled: (param) => {
          var _a;
          return !param.record && !(((_a = param.selectedRows) == null ? void 0 : _a.length) === 1);
        }
      },
      submit: {
        label: "提交",
        attrs: {
          type: "primary"
        }
      },
      search: {
        label: "查询",
        attrs: {
          type: "primary"
        }
      },
      reset: {
        label: "重置"
      }
    },
    globalConfig.defaultButtons
  );
};
function buildDefaultActions(methods) {
  const actions = getDefault();
  Object.keys(methods).forEach((key) => {
    if (actions[key]) {
      if (typeof methods[key] === "function") {
        actions[key].onClick = methods[key];
      } else {
        merge$1(actions[key], { attrs: { title: actions[key].label } }, methods[key]);
      }
    } else {
      actions[key] = methods[key];
    }
  });
  return actions;
}
function mergeActions(actions, methods = {}, commonAttrs = {}) {
  const defaultActions = buildDefaultActions(methods);
  const actionBtns = [];
  if (Array.isArray(actions)) {
    actions.forEach((item) => {
      const name = typeof item === "string" ? item : item.name;
      const { onClick: innerMethod, ...config } = defaultActions[name] || {};
      config.attrs = defaults({ ...commonAttrs }, config.attrs);
      if (typeof item === "object") {
        Object.assign(config, item, { attrs: { ...config.attrs, ...item.attrs } });
      }
      const loading = ref(false);
      const __loading = config.attrs.loading;
      const isCustomLoading = isRef(__loading);
      if (!isCustomLoading && __loading) {
        config.attrs.loading = loading;
      }
      const setLoading = (flag) => {
        if (!isCustomLoading) {
          loading.value = flag ? __loading : false;
        }
      };
      const meta = { label: config.label, ...item.meta };
      const _onClick = item.onClick;
      const _action = (text, method, param) => {
        if (text) {
          openUIConfirm({
            title: () => toNode(text, param),
            okText: "确定",
            cancelText: "取消",
            ...globalProps.Modal,
            onOk: method
          });
        } else {
          setLoading(true);
          Promise.resolve(method()).finally(() => {
            setLoading(false);
          });
        }
      };
      config.onClick = (param) => {
        const metaParam = { ...param, meta };
        if (_onClick && innerMethod) {
          _action(
            config.confirmText,
            () => _onClick(metaParam, async (__param) => innerMethod({ ...metaParam, ...__param })),
            param
          );
        } else {
          _action(config.confirmText, () => {
            var _a;
            return (_a = innerMethod || _onClick) == null ? void 0 : _a(metaParam);
          }, param);
        }
      };
      actionBtns.push(config);
    });
  }
  return actionBtns;
}
function useButton(config, param, methods) {
  const { size, buttonShape, buttonType, limit, hidden, disabled, actions } = config;
  const groupUnauthorized = config.unauthorized ?? (config.invalidDisabled ? "disable" : config.roleMode === "disable" ? "disable" : config.roleMode && "hide");
  const iconOnly = config.labelMode === "icon";
  const defaultAttrs = { size, type: buttonType, shape: buttonShape };
  const dis = useDisabled(disabled, param);
  const isHide = getComputedStatus(hidden, param);
  let actionBtns = mergeActions(actions, methods, defaultAttrs);
  if (globalConfig.buttonRoles) {
    const roles = globalConfig.buttonRoles();
    actionBtns = actionBtns.filter((item) => {
      const isFree = !item.roleName || roles.includes(item.roleName);
      if (!isFree) {
        const unauthorized = item.unauthorized ?? (item.invalidDisabled ? "disable" : item.roleMode === "disable" ? "disable" : item.roleMode && "hide") ?? groupUnauthorized ?? "hide";
        if (unauthorized === "disable") {
          item.disabled = true;
        } else {
          return false;
        }
      }
      return true;
    });
  }
  const rootSlots = inject("rootSlots", {});
  const allBtns = actionBtns.map((item) => {
    const isHide2 = getComputedStatus(item.hidden, param);
    const disabled2 = item.disabled !== void 0 ? useDisabled(item.disabled, param) : dis;
    const onClick = (e) => {
      var _a;
      return (_a = item.onClick) == null ? void 0 : _a.call(item, { ...param, e });
    };
    const menu = item.dropdown && computed(() => {
      const config2 = toValue(item.dropdown);
      if (isPlainObject(config2)) {
        return Object.entries(config2).map(([value, label]) => ({
          value,
          label
        }));
      } else if (typeof config2[0] !== "object") {
        return uniq(config2).map((txt) => ({ value: txt, label: txt }));
      }
      return config2;
    });
    const render2 = typeof item.customRender === "string" ? rootSlots[item.customRender] : item.customRender;
    const tooltipTitle = computed(() => {
      const tips = disabled2.value && item.disabledTooltip ? item.disabledTooltip : item.tooltip || (iconOnly && item.icon ? item.label : void 0);
      return typeof tips === "function" ? tips(param) : tips;
    });
    return {
      isHide: isHide2,
      render: render2,
      menu,
      ...item,
      tooltipTitle,
      onClick,
      attrs: { ...defaultAttrs, ...item.attrs, disabled: disabled2 }
    };
  });
  const btns = ref([]);
  const moreBtns = ref([]);
  watchEffect(() => {
    const items = isHide.value ? [] : allBtns.filter(({ isHide: isHide2 }) => !isHide2.value);
    btns.value = items;
    if (limit !== void 0 && limit !== null) {
      const count = iconOnly && items.length === limit + 1 ? limit + 1 : limit;
      btns.value = items.slice(0, count);
      moreBtns.value = items.slice(count);
    }
  });
  return { btns, moreBtns, defaultAttrs };
}
const _sfc_main$h = /* @__PURE__ */ defineComponent({
  __name: "ButtonGroup",
  props: {
    option: {},
    methods: {},
    effectData: {}
  },
  setup(__props) {
    const props = __props;
    const { option, methods, effectData } = props;
    const __config = Array.isArray(option) ? { actions: option } : option;
    const { attrs, moreLabel, divider, buttonType } = __config;
    const iconOnly = __config.labelMode === "icon";
    const labelOnly = __config.labelMode === "label";
    const { btns, moreBtns, defaultAttrs } = useButton(__config, reactive(effectData || {}), methods || __config.methods);
    const isDivider = divider ?? ((attrs == null ? void 0 : attrs.direction) !== "vertical" && ["link", "text"].includes(buttonType || ""));
    return (_ctx, _cache) => {
      return openBlock(), createBlock(resolveDynamicComponent(
        () => unref(renderUIAction)("group", {
          groupProps: unref(attrs),
          buttons: unref(btns),
          moreButtons: unref(moreBtns),
          defaultButtonProps: unref(defaultAttrs),
          divider: unref(isDivider),
          labelOnly,
          iconOnly,
          moreLabel: unref(moreLabel),
          effectData: unref(effectData)
        })
      ));
    };
  }
});
function createButtons({ config, methods, effectData, isView }) {
  const buttons = Array.isArray(config) ? { actions: config } : config;
  const visibleIn = (buttons == null ? void 0 : buttons.visibleIn) ?? (buttons == null ? void 0 : buttons.validOn);
  if (!buttons || isView && visibleIn === "form" || !isView && visibleIn === "detail")
    return;
  let actions = buttons.actions || [];
  if (!visibleIn) {
    buttons.actions = actions = actions.filter((item) => {
      if (typeof item === "string") {
        return !isView;
      } else {
        const itemVisibleIn = item.visibleIn ?? item.validOn;
        if (isView) {
          return itemVisibleIn !== "form";
        } else {
          return itemVisibleIn !== "detail";
        }
      }
    });
  }
  if (actions.length === 0)
    return;
  return (props = {}) => h(_sfc_main$h, { option: buttons, methods, effectData, ...props });
}
const DataProvider = defineComponent({
  name: "DataProvider",
  props: {
    name: {
      type: String,
      require: true
    },
    data: {
      type: void 0,
      require: true
    }
  },
  setup(props, ctx) {
    provide(props.name, props.data || {});
    return ctx.slots.default;
  }
});
function useOptions(option, attrOptions, effectData) {
  var _a, _b, _c, _d;
  const { options: orgOptions, dictName, valueToNumber } = option;
  const labelName = ((_b = (_a = option.attrs) == null ? void 0 : _a.fieldNames) == null ? void 0 : _b.label) || "label";
  const valueName = ((_d = (_c = option.attrs) == null ? void 0 : _c.fieldNames) == null ? void 0 : _d.value) || "value";
  const list = ref(attrOptions || []);
  if (typeof orgOptions === "function") {
    watchPostEffect(() => {
      Promise.resolve(orgOptions(effectData)).then((data) => {
        list.value = data;
      });
    });
  } else if (orgOptions) {
    watch(
      () => unref(orgOptions),
      (data) => list.value = data,
      { immediate: true }
    );
  } else if (dictName && globalConfig.dictApi) {
    globalConfig.dictApi(dictName).then((data) => list.value = data);
  }
  const optionsRef = computed(() => {
    let labelAsValue = option.labelAsValue ?? option.valueToLabel;
    const _list = isArray(list.value) ? list.value : [];
    if (_list[0] && !isPlainObject(_list[0]) && !valueToNumber) {
      labelAsValue = true;
    }
    if (isPlainObject(list.value) || !isPlainObject(_list[0])) {
      return Object.entries(list.value).map(([value, label]) => ({
        label,
        value: labelAsValue ? label : valueToNumber ? Number(value) : value
      }));
    }
    return _list.map((item) => ({
      ...item,
      label: item[labelName],
      value: labelAsValue ? item[labelName] : valueToNumber ? Number(item[valueName]) : item[valueName]
    }));
  });
  return {
    optionsRef,
    setOptions(data) {
      list.value = data;
    }
  };
}
function omitLabelModelProps(props) {
  const rest = { ...props };
  delete rest.labelValue;
  delete rest["onUpdate:labelValue"];
  return rest;
}
function getOptionLabels(options, value) {
  const getLabel = (current) => {
    var _a;
    return (_a = options.find((item) => Object.is(item.value, current))) == null ? void 0 : _a.label;
  };
  return Array.isArray(value) ? value.map(getLabel) : getLabel(value);
}
const processors = {
  picker: ({ option, effectData }) => ({
    modelBehavior: {
      splitRange: Boolean(option.endField ?? option.keepField)
    },
    transformProps(props) {
      const disabledDate = props.disabledDate;
      if (typeof disabledDate !== "function")
        return props;
      return {
        ...props,
        disabledDate: (currentDate) => disabledDate(currentDate, effectData)
      };
    }
  }),
  input: ({ attrs }) => {
    const loading = ref(false);
    const onSearch = attrs.onSearch;
    const search = typeof onSearch === "function";
    const searchHandler = search ? async (...args) => {
      loading.value = true;
      try {
        await onSearch(...args);
      } finally {
        loading.value = false;
      }
    } : void 0;
    return {
      transformProps: (props) => ({
        ...props,
        search,
        searchLoading: loading.value,
        ...searchHandler && { onSearch: searchHandler }
      })
    };
  },
  autoComplete: ({ option, effectData, attrs }) => {
    const { optionsRef } = useOptions({ ...option, labelAsValue: true }, attrs.options, effectData);
    return {
      transformProps: (props) => ({ ...props, options: optionsRef.value })
    };
  },
  select: ({ option, effectData, attrs }) => {
    const { optionsRef, setOptions } = useOptions(option, attrs.options, effectData);
    const explicitSearch = typeof attrs.onSearch === "function" ? throttle(attrs.onSearch, 600, { leading: false }) : void 0;
    const remoteSearch = attrs.showSearch && !explicitSearch && typeof option.options === "function" ? throttle(
      (keyword) => {
        Promise.resolve(option.options(effectData, keyword)).then(setOptions);
      },
      600,
      { leading: false }
    ) : void 0;
    let boundProps = {};
    const onValueChange = (value) => {
      var _a;
      if (option.labelField)
        (_a = boundProps["onUpdate:labelValue"]) == null ? void 0 : _a.call(boundProps, getOptionLabels(optionsRef.value, value));
    };
    return {
      transformProps(props) {
        boundProps = props;
        const rest = omitLabelModelProps(props);
        return {
          ...rest,
          options: optionsRef.value,
          onValueChange,
          onSearch: explicitSearch || remoteSearch
        };
      }
    };
  },
  radioGroup: ({ option, effectData, attrs }) => {
    const { optionsRef } = useOptions(option, attrs.options, effectData);
    let boundProps = {};
    const onValueChange = (value) => {
      var _a;
      if (option.labelField)
        (_a = boundProps["onUpdate:labelValue"]) == null ? void 0 : _a.call(boundProps, getOptionLabels(optionsRef.value, value));
    };
    return {
      transformProps(props) {
        boundProps = props;
        const rest = omitLabelModelProps(props);
        return {
          ...rest,
          options: optionsRef.value.map((item) => ({
            ...item,
            label: toNode(item.label, effectData)
          })),
          onValueChange
        };
      }
    };
  },
  checkboxGroup: ({ option, effectData, attrs }) => {
    const { optionsRef } = useOptions(option, attrs.options, effectData);
    let boundProps = {};
    const onValueChange = (value) => {
      var _a;
      if (option.labelField)
        (_a = boundProps["onUpdate:labelValue"]) == null ? void 0 : _a.call(boundProps, getOptionLabels(optionsRef.value, value));
    };
    return {
      transformProps(props) {
        boundProps = props;
        const rest = omitLabelModelProps(props);
        return {
          ...rest,
          options: optionsRef.value,
          onValueChange
        };
      }
    };
  },
  treeSelect: ({ option, effectData }) => {
    const dataRef = ref([]);
    const treeData = option.treeData ?? option.data;
    if (typeof treeData === "function") {
      watchEffect(() => {
        Promise.resolve(treeData(effectData)).then((data) => dataRef.value = data || []);
      });
    } else if (treeData) {
      watch(
        () => unref(treeData),
        (data) => dataRef.value = data || [],
        { immediate: true }
      );
    }
    let boundProps = {};
    const onValueChange = (_value, labels) => {
      var _a;
      if (option.labelField)
        (_a = boundProps["onUpdate:labelValue"]) == null ? void 0 : _a.call(boundProps, labels);
    };
    return {
      transformProps(props) {
        boundProps = props;
        const rest = omitLabelModelProps(props);
        return { ...rest, treeData: dataRef.value, onValueChange };
      }
    };
  },
  switch: ({ option, effectData, attrs, model }) => {
    const { optionsRef } = useOptions(option, attrs.options, effectData);
    const modelValue = toRef(model, "refData");
    const [falseName, trueName] = option.valueLabels || [];
    const valueToNumber = option.valueToNumber ?? attrs.valueToNumber;
    const trueDefault = valueToNumber ? 1 : true;
    const falseDefault = valueToNumber ? 0 : false;
    const state = computed(() => {
      const [first, second] = optionsRef.value;
      return attrs.firstIsChecked ? {
        trueLabel: (first == null ? void 0 : first.label) ?? trueName,
        falseLabel: (second == null ? void 0 : second.label) ?? falseName,
        trueValue: (first == null ? void 0 : first.value) ?? trueDefault,
        falseValue: (second == null ? void 0 : second.value) ?? falseDefault
      } : {
        trueLabel: (second == null ? void 0 : second.label) ?? trueName,
        falseLabel: (first == null ? void 0 : first.label) ?? falseName,
        trueValue: (second == null ? void 0 : second.value) ?? trueDefault,
        falseValue: (first == null ? void 0 : first.value) ?? falseDefault
      };
    });
    const syncLabel = (value) => {
      if (!option.labelField)
        return;
      const item = optionsRef.value.find((item2) => Object.is(item2.value, value));
      const label = (item == null ? void 0 : item.label) ?? (Object.is(value, state.value.trueValue) ? state.value.trueLabel : Object.is(value, state.value.falseValue) ? state.value.falseLabel : void 0);
      set(model.parent, option.labelField, label);
    };
    const hasOptionsSource = computed(
      () => attrs.options !== void 0 || option.options !== void 0 || Boolean(option.dictName)
    );
    watch(
      [modelValue, optionsRef],
      ([value, options]) => {
        if (value === void 0) {
          if (hasOptionsSource.value && !options.length)
            return;
          const initial = attrs.defaultChecked ? state.value.trueValue : state.value.falseValue;
          model.refData = initial;
          syncLabel(initial);
        } else {
          syncLabel(value);
        }
      },
      { immediate: true }
    );
    let boundProps = {};
    const updateValue = (value) => {
      var _a;
      (_a = boundProps["onUpdate:value"]) == null ? void 0 : _a.call(boundProps, value);
      syncLabel(value);
    };
    return {
      transformProps(props) {
        boundProps = props;
        const rest = omitLabelModelProps(props);
        return { ...rest, ...state.value, "onUpdate:value": updateValue };
      }
    };
  }
};
function resolveFieldProcessors(names, context) {
  const states = names.map((name) => {
    var _a;
    return (_a = processors[name]) == null ? void 0 : _a.call(processors, context);
  }).filter(Boolean);
  return {
    modelBehavior: Object.assign({}, ...states.map(({ modelBehavior }) => modelBehavior)),
    transformProps: (props) => states.reduce((current, state) => state.transformProps ? state.transformProps(current) : current, props)
  };
}
const FieldProcessorRenderer = defineComponent({
  name: "FieldProcessorRenderer",
  inheritAttrs: false,
  props: {
    // 不能命名为 type，否则 Input 的 attrs.type 会覆盖 Schema 字段类型。
    fieldType: { type: String, required: true },
    processors: { type: Array, required: true },
    option: { type: Object, required: true },
    model: { type: Object, required: true },
    effectData: { type: Object, required: true }
  },
  setup(props, ctx) {
    const processorState = resolveFieldProcessors(props.processors, {
      option: props.option,
      effectData: props.effectData,
      attrs: ctx.attrs,
      model: props.model
    });
    const valueProps = useVModel(
      {
        option: props.option,
        model: props.model,
        effectData: props.effectData
      },
      void 0,
      processorState.modelBehavior
    );
    return () => {
      const processedProps = processorState.transformProps(reactive({ ...ctx.attrs, ...valueProps }));
      return renderUIField(
        props.fieldType,
        processedProps,
        {
          option: props.option,
          effectData: props.effectData
        },
        ctx.slots
      );
    };
  }
});
const Collections = defineComponent({
  inheritAttrs: false,
  name: "Collections",
  props: {
    option: {
      type: Object,
      default: () => ({})
    },
    model: {
      required: true,
      type: Object
    },
    effectData: Object
  },
  setup(props) {
    const { type: parentType, attrs: parentAttrs, gutter = 16, subSpan } = props.option;
    const rowProps = { gutter, ...props.option.rowProps };
    const inheritOptions = inject("inheritOptions", {});
    const presetSpan = subSpan ?? inheritOptions.subSpan;
    const index = computed(() => props.model.index);
    const nodes = [];
    let currentGroup;
    const childrenArr = [...props.model.children];
    for (let idx = 0; idx < childrenArr.length; idx++) {
      const [option, subData] = childrenArr[idx];
      const { type, align, span, hideInForm, exclude, editable } = option;
      const block = option.block ?? option.blocked;
      const breakAfter = option.breakAfter ?? option.wrapping;
      const { parent, refData } = toRaw(subData);
      const effectData = getEffectData({
        parent: props.effectData,
        current: parent,
        field: subData.refName,
        value: refData,
        ...index.value !== void 0 && {
          index,
          record: !subData.refName ? refData : parent
        }
      });
      if (type === "Hidden" || (exclude ? exclude.includes("form") : hideInForm)) {
        useVModel({ option, model: subData, effectData });
        continue;
      }
      const { hidden, required, attrs } = render({
        option,
        effectData,
        inheritDisabled: inheritOptions.disabled
      });
      if (type === "Fragment") {
        subData.children && childrenArr.splice(
          idx + 1,
          0,
          ...[...subData.children].map(([o, d]) => [{ ...o, hidden, disabled: attrs.disabled }, d])
        );
        continue;
      }
      let innerNode = buildInnerNode(option, subData, effectData, attrs);
      if (!innerNode)
        continue;
      if ((hasFormComponent(type) || resolveUIComponent(type)) && editable !== void 0 && editable !== true) {
        const inputNode = innerNode;
        const editableRef = computed(() => isFunction(editable) ? editable(effectData) : editable);
        const viewNode = getViewNode(option, reactive({ ...toRefs(effectData), isView: true }));
        innerNode = () => editableRef.value ? inputNode() : viewNode ? viewNode() : refData.value;
      }
      const colProps = { ...option.colProps, span };
      defaults(colProps, { span: presetSpan }, globalProps.Col, { span: 8 });
      if (colProps.span === 0 || colProps.flex) {
        colProps.span = void 0;
      }
      if (parentType === "InputGroup" && (parentAttrs == null ? void 0 : parentAttrs.compact) !== false) {
        const width = Number(colProps.span) && (100 / (24 / colProps.span)).toFixed(2) + "%";
        nodes.push(() => !hidden.value && h(innerNode, mergeProps({ style: { width } }, colProps)));
        continue;
      }
      let node = innerNode;
      const independent = [...containers, "InputList", "InputGroup"].includes(type);
      if (!independent && (!block || option.field && option.label)) {
        const __rules = formatRule(subData.rules, effectData);
        const rules = computed(
          () => unref(attrs.disabled) ? void 0 : !option.required || required.value ? __rules : __rules.slice(1)
        );
        const formItemAttrs = mergeProps(globalProps.FormItem, option.formItemProps);
        const label = createLabelNode(option, effectData);
        node = () => renderUIFormItem(
          reactive({
            ...formItemAttrs,
            name: subData.propChain,
            rules,
            colon: !!label
          }),
          {
            default: innerNode,
            label
          }
        );
      }
      if (independent) {
        const inheritOptions2 = {
          required,
          disabled: attrs.disabled,
          subSpan: option.subSpan ?? presetSpan
        };
        node = () => h(DataProvider, { name: "inheritOptions", data: inheritOptions2 }, innerNode);
      }
      const __isBlock = block ?? (containers.includes(type) && !option.span);
      const alignStyle = align && `text-align: ${align}`;
      if (__isBlock) {
        currentGroup = void 0;
        nodes.push(
          () => !hidden.value && h(
            "div",
            {
              class: ["sup-form-section", type === "Descriptions" && "sup-detail"],
              style: alignStyle,
              key: idx
            },
            node()
          )
        );
      } else {
        if (type === "InputList") {
          colProps.span = span ?? 24;
        }
        if (!currentGroup) {
          nodes.push(currentGroup = []);
        }
        currentGroup.push(
          () => !hidden.value && renderUILayout("col", mergeProps({ style: alignStyle, key: idx }, colProps), { default: node })
        );
        if (breakAfter)
          currentGroup = void 0;
      }
    }
    let hasWrap = false;
    const content = () => nodes.map((item) => {
      if (Array.isArray(item)) {
        hasWrap = true;
        return renderUILayout("row", rowProps, {
          default: () => item.map((node) => node())
        });
      } else {
        return item();
      }
    });
    return () => props.option.isContainer && hasWrap ? h(
      Controls.Group,
      {
        class: "sup-form-section",
        option: props.option,
        model: props.model,
        effectData: props.effectData
      },
      { innerContent: content }
    ) : content();
  }
});
function buildInnerNode(option, model, effectData, attrs) {
  const { type, render: render2 } = option;
  if (!type)
    return;
  const rootSlots = inject("rootSlots", {});
  const slots = useInnerSlots(option.slots, effectData);
  const fieldAdapter = !render2 ? getUIFieldAdapter(type) : void 0;
  const processors2 = fieldAdapter == null ? void 0 : fieldAdapter.processors;
  const definition = fieldAdapter ? void 0 : getFormComponent(type);
  const adapterComponent = !render2 && fieldAdapter ? requireUIComponent(type) : void 0;
  const renderSlot = render2 ? typeof render2 === "function" ? render2 : rootSlots[render2] : (definition == null ? void 0 : definition.component) || Controls[type] || adapterComponent;
  let node;
  if (type === "InfoSlot") {
    node = renderSlot && (() => renderSlot({ props: attrs, ...effectData }));
  } else if (type === "Text") {
    node = () => h("span", attrs, model.refData);
  } else if (type === "HTML") {
    node = () => h("span", { ...attrs, innerHTML: model.refData });
  } else if (type === "Buttons") {
    node = () => h(_sfc_main$h, { option, effectData, ...attrs });
  } else if (containers.includes(type) || type === "InputList") {
    node = () => h(Controls[type], reactive({ option, model, effectData, ...attrs }), slots);
  } else {
    if (!renderSlot) {
      console.error(`组件 '${type}' 配置错误，请检查名称或'render'是否正确！`);
    } else if (adapterComponent && (processors2 == null ? void 0 : processors2.length)) {
      node = () => h(FieldProcessorRenderer, { ...attrs, fieldType: type, processors: processors2, option, model, effectData }, slots);
    } else {
      const valueProps = useVModel({ option, model, effectData });
      const allAttrs = { ...attrs, ...valueProps };
      if (type === "InputSlot") {
        node = () => renderSlot == null ? void 0 : renderSlot(reactive({ props: allAttrs, ...effectData }));
      } else if (adapterComponent) {
        node = () => h(adapterComponent, reactive(mapUIFieldProps(type, allAttrs, { option, effectData })), slots);
      } else if ((definition == null ? void 0 : definition.source) === "custom" || (definition == null ? void 0 : definition.source) === "auto") {
        node = () => h(renderSlot, reactive(mapFormComponentModel(definition, allAttrs)), slots);
      } else {
        node = () => h(renderSlot, reactive({ option, model, effectData, ...allAttrs }), slots);
      }
    }
  }
  return node;
}
const _sfc_main$g = defineComponent({
  props: {
    option: {
      required: true,
      type: Object
    },
    modelsMap: {
      type: Object,
      required: true
    },
    source: {
      type: Object,
      required: true
    }
  },
  setup(props, ctx) {
    const source = toRef(props, "source");
    const { modelsMap } = cloneModels(props.modelsMap, source);
    provide("exaProvider", { data: toRef(props, "source") });
    return () => {
      var _a;
      return h(
        "div",
        { class: ["sup-form-section sup-detail", ((_a = ctx.attrs) == null ? void 0 : _a.isContainer) && "sup-container"] },
        h(Controls.Descriptions, {
          option: props.option,
          model: { children: modelsMap },
          effectData: reactive({ current: source }),
          isView: true
        })
      );
    };
  }
});
const DetailLayouts = defineComponent({
  inheritAttrs: false,
  props: {
    option: { type: Object, required: true },
    modelsMap: {
      type: Object,
      required: true
    },
    isRoot: Boolean,
    effectData: Object
  },
  setup({ option, modelsMap, isRoot, effectData }, ctx) {
    var _a;
    const formAttrs = inject("exaProvider", {}).attrs;
    const gridConfig = inject("gridConfig", formAttrs);
    const config = {
      ...globalProps.Descriptions,
      ...gridConfig
    };
    const rowProps = defaults({ gutter: option.gutter }, option.rowProps || config.rowProps, globalProps.row, {
      gutter: 16
    });
    const attrs = {
      subSpan: option.subSpan,
      ...option.descriptionsProps,
      ...ctx.attrs
    };
    const provideData = defaults(
      {
        subSpan: option.subSpan ?? config.subSpan,
        rowProps,
        ...attrs
      },
      config
    );
    const presetSpan = provideData.subSpan ?? (provideData.subSpan = ((_a = globalProps.Col) == null ? void 0 : _a.span) ?? 12);
    const nodes = buildNodes(modelsMap, option, effectData);
    const nodeGroup = [];
    let rowGroup;
    let section;
    nodes.forEach((item, idx) => {
      item.node ?? (item.node = () => renderUIContainer("descriptions", {
        config: attrs,
        items: item.group,
        class: attrs.class
      }));
      if (item.isBlock) {
        if (item.group || item.option.type === "InputList") {
          if (!section) {
            section = [];
            nodeGroup.push(["section", section]);
          }
          section.push(item);
        } else {
          nodeGroup.push(["block", item]);
          section = void 0;
        }
        rowGroup = void 0;
      } else {
        !rowGroup && nodeGroup.push(["row", rowGroup = []]);
        rowGroup.push(item);
        section = void 0;
      }
    });
    const content = () => h(
      DataProvider,
      { name: "gridConfig", data: provideData },
      () => nodeGroup.map(([type, items], idx) => {
        let slot = items.node;
        if (type === "row") {
          slot = () => renderUILayout("row", rowProps, {
            default: () => items.map((item, idx2) => {
              const colProps = item.option.colProps || {
                span: item.option.span ?? presetSpan
              };
              return !unref(item.hidden) && renderUILayout("col", { ...globalProps.Col, ...colProps, key: idx2 }, { default: item.node });
            })
          });
        } else if (type === "section") {
          slot = () => items.map((item) => !unref(item.hidden) && item.node());
        }
        return !unref(items.hidden) && (nodeGroup.length > 1 ? h("div", { class: "sup-form-section", key: idx }, slot()) : slot());
      })
    );
    if (isRoot) {
      return () => h(
        Controls.Group,
        mergeProps(
          { class: "sup-form-section" },
          {
            option,
            model: {},
            effectData: getEffectData({}),
            isView: true,
            ...attrs
          }
        ),
        { innerContent: content }
      );
    } else {
      return content;
    }
  }
});
function buildNodes(modelsMap, preOption, parentEffect) {
  const nodes = [];
  let currentGroup;
  const rootSlots = inject("rootSlots", {});
  [...modelsMap].forEach(([option, model], idx) => {
    var _a, _b, _c;
    const { type = "", field, hideInDescription, viewRender, exclude } = option;
    if (type === "Hidden" || hideInDescription || (exclude == null ? void 0 : exclude.includes("description")))
      return;
    const { parent, refData } = toRefs(reactive(model));
    const effectData = getEffectData({
      parent: parentEffect,
      current: parent,
      isView: true,
      field: model.refName,
      value: refData,
      text: refData,
      ..."index" in model && {
        index: model.index,
        record: field ? refData : parent
      }
    });
    const { attrs, hidden } = render({ option, effectData });
    const slots = useInnerSlots(option.slots, effectData);
    const label = createLabelNode(option, effectData);
    let isBlock = option.block ?? option.blocked;
    let render$12;
    const nodeItems = [];
    const __viewRender = typeof viewRender === "string" ? rootSlots[viewRender] : viewRender;
    render$12 = __viewRender && (() => toNode(__viewRender, effectData));
    const modelsMap2 = model.children || ((_a = model.listData) == null ? void 0 : _a.modelsMap);
    if (type === "InputGroup") {
      if (!viewRender) {
        let isBreak = option.breakAfter ?? option.wrapping;
        const subNodes = buildNodes(modelsMap2, option, effectData);
        const contents = (_b = subNodes[0].group) == null ? void 0 : _b.map(({ option: opt, content }) => {
          const labelSlot = opt.labelSlot || opt.label;
          const showLabel = (attrs == null ? void 0 : attrs.compact) === false && labelSlot;
          isBreak = (opt.breakAfter ?? opt.wrapping) || isBreak;
          return () => h("span", [showLabel && toNode(labelSlot, effectData), showLabel && ": ", content == null ? void 0 : content()]);
        });
        render$12 = () => renderUILayout(
          "space",
          { direction: isBreak ? "vertical" : "horizontal" },
          {
            default: () => contents == null ? void 0 : contents.map((node) => node())
          }
        );
      }
      nodeItems.push({ option, label, hidden, content: render$12 });
    } else if (type === "Fragment") {
      const subNodes = buildNodes(modelsMap2, option, effectData);
      const subItems = subNodes[0].group;
      if (subItems) {
        subNodes.shift();
        nodeItems.push(...subItems.map((item) => ({ ...item, hidden })));
      }
      if (subNodes.length) {
        currentGroup = void 0;
        nodes.push(...subNodes);
      }
    } else if (model.children || model.listData || containers.includes(type)) {
      isBlock ?? (isBlock = !option.span);
      const viewType = [...containers, "InputList"].includes(type) ? type : "Group";
      const Control = Controls[viewType];
      const defRender = () => h(
        Control,
        reactive({
          option,
          model,
          effectData,
          isView: true,
          ...globalProps[viewType],
          ...attrs
        }),
        slots
      );
      render$12 ?? (render$12 = defRender);
      if (type === "InputList") {
        if (!isBlock || label && !(attrs == null ? void 0 : attrs.labelIndex)) {
          nodeItems.push({
            option: { ...option },
            label,
            hidden,
            content: render$12
          });
        } else {
          render$12 = defRender;
        }
      }
    } else {
      const content = getContent(option, model, effectData);
      content && nodeItems.push({ option, label, hidden, content });
    }
    if (!nodeItems.length && !render$12)
      return;
    if (nodeItems.length && !isBlock) {
      if (!currentGroup) {
        currentGroup = [];
        nodes.push({ option: preOption, isBlock: true, group: currentGroup });
      }
      currentGroup.push(...nodeItems);
    } else {
      if (nodeItems.length && label) {
        nodes.push({ option: preOption, isBlock, group: nodeItems });
      } else {
        const style = option.align && { textAlign: option.align };
        render$12 = ((_c = nodeItems[0]) == null ? void 0 : _c.content) || render$12;
        nodes.push({
          option,
          isBlock,
          node: () => h(render$12, { style }),
          hidden
        });
      }
      currentGroup = void 0;
    }
  });
  return nodes;
}
function getContent(option, model, parentEffect) {
  const { parent, refData } = toRefs(reactive(model));
  const value = model.refName ? refData : void 0;
  const effectData = toRaw(parent.value) === toRaw(parentEffect.current) ? parentEffect : getEffectData({
    parent: parentEffect,
    current: parent,
    text: value,
    value,
    field: model.refName,
    isView: true
  });
  const content = getViewNode(option, effectData);
  return content === false ? void 0 : () => content ? content() : String(model.refData ?? "");
}
const _sfc_main$f = defineComponent({
  inheritAttrs: false,
  props: {
    option: { type: Object, required: true },
    model: { type: Object, required: true },
    effectData: Object,
    isView: Boolean
  },
  setup({ option, model, effectData, isView }, ctx) {
    const { type, label, title = label, buttons, contentAttrs } = option;
    const _isView = type === "Descriptions" || isView;
    let buttonsSlot;
    if (buttons) {
      const _buttons = Array.isArray(buttons) ? { actions: buttons } : buttons;
      if (type === "Descriptions") {
        _buttons.visibleIn ?? (_buttons.visibleIn = _buttons.validOn ?? "detail");
      }
      buttonsSlot = createButtons({
        config: _buttons,
        effectData,
        isView: _isView
      });
    }
    const { style, class: _class, ...attrs } = ctx.attrs;
    const slots = {
      ...ctx.slots,
      title: title ? createLabelNode(option, effectData) : void 0,
      actions: buttonsSlot,
      default: () => h(
        "div",
        contentAttrs,
        ctx.slots.innerContent ? ctx.slots.innerContent(attrs) : _isView ? h(DetailLayouts, {
          option: { descriptionsProps: attrs, ...option },
          modelsMap: model.children,
          effectData
        }) : h(Collections, { option, model, effectData })
      )
    };
    const CustomComponent = option.component && toRaw(option.component);
    let titleButton, bottomButton;
    const buttonAlign = buttons == null ? void 0 : buttons.align;
    if (buttonsSlot) {
      if (buttons.placement === "bottom") {
        bottomButton = () => h(
          "div",
          {
            class: "sup-bottom-buttons",
            style: { textAlign: buttonAlign || "center" }
          },
          buttonsSlot()
        );
      } else {
        titleButton = () => renderUILayout(
          "col",
          {
            class: "sup-title-buttons",
            flex: 1,
            style: {
              textAlign: buttonAlign || (title ? "right" : void 0)
            }
          },
          { default: buttonsSlot }
        );
      }
    }
    if (CustomComponent) {
      return () => h(CustomComponent, {}, slots);
    } else {
      return () => h("div", mergeProps({ class: _class, style }, { class: "sup-group" }), [
        (title || titleButton) && renderUILayout(
          "row",
          { align: "middle", class: "sup-titlebar" },
          {
            default: () => [
              title && renderUILayout("col", { class: "sup-title" }, { default: slots.title }),
              titleButton == null ? void 0 : titleButton()
            ]
          }
        ),
        slots.default(),
        bottomButton && bottomButton()
      ]);
    }
  }
});
const _sfc_main$e = {
  name: "SuperForm",
  props: {
    option: {
      required: true,
      type: Object
    },
    dataSource: Object,
    /** 按钮事件 */
    methods: Object,
    ignoreRules: {
      default: (raw) => raw.option.ignoreRules,
      type: Boolean
    },
    compact: {
      default: (raw) => raw.option.compact,
      type: Boolean
    }
  },
  emits: ["register", "submit", "reset"],
  setup(props, { expose, emit, slots: ctxSlots }) {
    var _a;
    const formRef = ref();
    const modelData = ref({});
    const {
      option: { onSubmit, onReset, buttons, ...option },
      ignoreRules,
      compact
    } = props;
    const effectData = reactive({ formData: modelData, current: modelData });
    const { attrs } = render({ option, effectData });
    const submitHandlers = /* @__PURE__ */ new Set();
    const submitRegister = (fn) => {
      fn && submitHandlers.add(fn);
    };
    provide("exaProvider", {
      data: readonly(modelData),
      attrs,
      onSubmit: submitRegister
    });
    provide("inheritOptions", {
      disabled: attrs.disabled,
      subSpan: option.subSpan
    });
    const submitValidate = (data) => Promise.all(
      [...submitHandlers, onSubmit].map(async (fn) => {
        const validate = await (fn == null ? void 0 : fn(data));
        if (validate === false || validate && validate.errMessage) {
          return Promise.reject({ message: validate && validate.errMessage });
        } else {
          return validate;
        }
      })
    );
    if (ignoreRules) {
      Object.assign(attrs, { hideRequiredMark: true, validateTrigger: "none" });
    }
    const actions = {
      dataSource: modelData,
      submit: () => {
        return validateUIForm(formRef.value).then((...args) => {
          return submitValidate(modelData.value).then(
            () => {
              const data = cloneDeep(modelData.value);
              emit("submit", data);
              return data;
            },
            (err) => {
              typeof err === "object" && err.message && showUIMessage("error", err.message);
              return Promise.reject(err);
            }
          );
        });
      },
      setFieldsValue(data) {
        formRef.value && clearUIFormValidation(formRef.value);
        return setFieldsValue(modelData.value, data, initialData);
      },
      resetFields(data = {}) {
        resetFields(modelData.value, data, initialData);
        formRef.value && clearUIFormValidation(formRef.value);
        const cloneData = cloneDeep(modelData.value);
        onReset == null ? void 0 : onReset(cloneData);
        emit("reset", cloneData);
        return cloneData;
      }
    };
    const buttonsConfig = Array.isArray(buttons) ? { actions: buttons } : buttons;
    if ((_a = buttonsConfig == null ? void 0 : buttonsConfig.actions) == null ? void 0 : _a.length) {
      option.subItems = [
        ...option.subItems,
        {
          type: "InfoSlot",
          align: buttonsConfig.align || "center",
          block: true,
          render: () => h(_sfc_main$h, {
            option: buttonsConfig,
            methods: {
              submit: actions.submit,
              reset: actions.resetFields,
              search: actions.submit
            },
            effectData
          }),
          ...buttonsConfig.placement === "inline" && {
            span: "auto",
            block: false,
            align: buttonsConfig.align || "right"
          }
        }
      ];
    }
    const { modelsMap } = buildModelsMap(option.subItems, modelData);
    const initialData = cloneDeep(modelData.value);
    watch(
      () => unref(props.dataSource ?? props.option.dataSource),
      (data) => {
        if (data) {
          formRef.value && clearUIFormValidation(formRef.value);
          modelData.value = data;
        }
      },
      { immediate: true, flush: "sync" }
    );
    const exposeData = reactive({ ...actions });
    const getForm = (form) => {
      if (!form) {
        emit("register", null);
        return;
      }
      Object.assign(exposeData, form, actions);
      formRef.value = form;
      emit("register", exposeData);
    };
    expose(exposeData);
    return () => renderUIForm(
      {
        ref: getForm,
        class: ["sup-form", compact && "sup-form-compact", ignoreRules && "sup-form-simple"],
        model: modelData.value,
        labelAlign: "right",
        ...attrs
      },
      {
        ...ctxSlots,
        default: () => h(Collections, {
          option,
          model: { refData: modelData, children: modelsMap },
          effectData
        })
      }
    );
  }
};
const _sfc_main$d = defineComponent({
  inheritAttrs: false,
  props: {
    option: { type: Object, required: true },
    model: { type: Object, required: true },
    effectData: Object,
    compact: { type: Boolean, default: true },
    disabled: void 0
  },
  setup(props, { attrs }) {
    var _a;
    const { option, model, compact } = props;
    const { slots } = option;
    const formItemContext = ref();
    let ruleObj = formatRule(model.rules, props.effectData);
    let _propChain = model.propChain;
    const extProps = {};
    if (ruleObj) {
      watch(
        () => model.refData,
        () => {
          var _a2, _b;
          return (_b = (_a2 = formItemContext.value) == null ? void 0 : _a2.onFieldChange) == null ? void 0 : _b.call(_a2);
        },
        { deep: true }
      );
    } else if (model.children && compact) {
      const rule = {
        type: "object",
        required: false,
        fields: {}
      };
      for (const val of model.children.values()) {
        if (val.rules && val.fieldName) {
          if (val.rules[0].required)
            rule.required = true;
          const effectData = reactive({
            ...props.effectData,
            parent: props.effectData,
            current: val.parent,
            field: val.fieldName,
            value: val.refData
          });
          rule.fields[val.fieldName] = formatRule(val.rules, effectData);
          if (!model.refName) {
            _propChain = val.propChain;
            ruleObj = rule.fields[val.fieldName];
            watch(
              () => unref(val.refData),
              () => {
                var _a2, _b;
                return (_b = (_a2 = formItemContext.value) == null ? void 0 : _a2.onFieldChange) == null ? void 0 : _b.call(_a2);
              }
            );
            break;
          }
        }
      }
      if (model.refName) {
        ruleObj = [rule];
        watch(
          () => model.refData,
          () => {
            var _a2, _b;
            return (_b = (_a2 = formItemContext.value) == null ? void 0 : _a2.onFieldChange) == null ? void 0 : _b.call(_a2);
          },
          { deep: true }
        );
      }
    } else {
      extProps.style = "margin: 0";
    }
    extProps.required = !!((_a = ruleObj[0]) == null ? void 0 : _a.required);
    const inheritAttrs = inject("inheritOptions", {});
    const rules = computed(
      () => props.disabled ? void 0 : !option.required || unref(inheritAttrs.required) ? ruleObj : ruleObj.slice(1)
    );
    const formItemAttrs = mergeProps(globalProps.FormItem, option.formItemProps, extProps);
    const _label = createLabelNode(option, props.effectData);
    return () => renderUIFormItem(
      {
        ...formItemAttrs,
        rules: rules.value,
        ref: formItemContext,
        name: _propChain
      },
      {
        label: _label,
        default: (slots == null ? void 0 : slots.default) || (() => renderUILayout(compact ? "compactSpace" : "space", mergeProps(compact ? { block: true } : {}, attrs), {
          default: () => h(Collections, {
            option,
            model,
            effectData: props.effectData
          })
        }))
      }
    );
  }
});
const _sfc_main$c = defineComponent({
  inheritAttrs: false,
  props: {
    option: {
      required: true,
      type: Object
    },
    model: {
      required: true,
      type: Object
    },
    effectData: {
      type: Object,
      required: true
    },
    isView: Boolean,
    labelIndex: Boolean
  },
  setup(props) {
    const { model, option, isView, effectData, labelIndex } = props;
    const { columns, rowButtons, label, labelSlot, compact, slots: _optionSlots, ..._option } = option;
    const { modelsMap: childrenMap } = model.listData;
    const isSingle = columns.length === 1 && columns[0].field === "$index";
    const isFormItem = !labelIndex && (label || labelSlot);
    const orgList = toRef(model, "refData");
    let singleVersion = 0;
    const methods = {
      add: {
        onClick({ index }) {
          orgList.value.splice(index + 1, 0, isSingle ? void 0 : {});
          orgList.value = [...toRaw(orgList.value)];
        },
        icon: () => getSemanticIconNode("add")
      },
      delete: {
        disabled: () => orgList.value.length === 1,
        confirmText: "",
        icon: () => getSemanticIconNode("remove"),
        onClick({ index }) {
          orgList.value.splice(index, 1);
          orgList.value = [...toRaw(orgList.value)];
        }
      }
    };
    const rowButtonsConfig = !isView && rowButtons !== false && {
      type: "Buttons",
      buttonType: "link",
      size: "small",
      colProps: { flex: "0" },
      labelMode: "icon",
      ...globalProps.rowButtons,
      methods,
      actions: ["add", "delete"],
      ...Array.isArray(rowButtons) ? { actions: rowButtons } : rowButtons
    };
    const keyMap = /* @__PURE__ */ new WeakMap();
    const listItems = shallowRef([]);
    watch(
      () => orgList.value.map((record) => toRaw(record)),
      (currentList) => {
        if (currentList.length === 0) {
          orgList.value.push(isSingle ? void 0 : {});
        }
        const list = currentList.length ? currentList : orgList.value.map((record) => toRaw(record));
        const previousItems = listItems.value;
        if (isSingle && previousItems.length !== list.length) {
          singleVersion += 1;
        }
        const keys = list.map((record, idx) => {
          var _a;
          const rawRecord = toRaw(record);
          if (rawRecord !== null && typeof rawRecord === "object") {
            if (!keyMap.has(rawRecord)) {
              keyMap.set(rawRecord, nanoid(12));
            }
            return keyMap.get(rawRecord);
          }
          return ((_a = previousItems[idx]) == null ? void 0 : _a.baseKey) ?? nanoid(12);
        });
        listItems.value = list.map((record, idx) => {
          const refData = toRef(orgList.value, idx);
          const propChain = [...model.propChain, idx];
          const newModel = {
            index: idx,
            parent: orgList,
            refData,
            propChain
          };
          const ghostModel = /* @__PURE__ */ new Map();
          let itemOption;
          if (isSingle) {
            itemOption = { ...columns[0] };
            ghostModel.set(itemOption, {
              ...childrenMap.get(columns[0]),
              ...newModel
            });
          } else {
            if (childrenMap.size === 1 || !columns[0].field) {
              itemOption = {
                subSpan: "auto",
                ...columns[0],
                field: String(idx)
              };
              const oldModel = [...childrenMap.values()][0];
              ghostModel.set(itemOption, {
                ...oldModel,
                ...newModel,
                refName: String(idx),
                children: cloneModels(oldModel.children || /* @__PURE__ */ new Map(), record, propChain).modelsMap
              });
            } else {
              itemOption = compact ? {
                ..._option,
                type: "InputGroup",
                initialValue: void 0,
                subSpan: option.subSpan ?? "auto",
                field: String(idx)
              } : { type: "Group", span: "auto" };
              ghostModel.set(itemOption, {
                ...newModel,
                refName: String(idx),
                children: cloneModels(childrenMap, record, propChain).modelsMap
              });
            }
          }
          if (labelIndex) {
            itemOption.label ?? (itemOption.label = label);
            itemOption.labelSlot ?? (itemOption.labelSlot = labelSlot || itemOption.label + String(idx + 1));
          }
          rowButtonsConfig && ghostModel.set(rowButtonsConfig, { parent: orgList, index: idx });
          return {
            children: ghostModel,
            model: { parent: orgList, children: ghostModel, index: idx },
            refData,
            baseKey: keys[idx],
            key: isSingle ? `${String(keys[idx])}:${idx}:${singleVersion}` : keys[idx]
            // effectData: reactive({ parent: effectData, current: orgList, index: idx, record: refData }),
          };
        });
      },
      {
        immediate: true
      }
    );
    const render2 = () => {
      return listItems.value.map(({ model: model2, key }) => {
        return h(Collections, { model: model2, option, effectData, key });
      });
    };
    if (isView) {
      if (isFormItem) {
        if (isSingle) {
          const { label: label2, labelSlot: labelSlot2 = label2 } = columns[0];
          const breakAfter = columns[0].breakAfter ?? columns[0].wrapping;
          return () => renderUILayout(
            "space",
            { direction: breakAfter ? "vertical" : "horizontal" },
            {
              default: () => listItems.value.map(({ refData, key }, index) => {
                const itemEffectData = {
                  ...effectData,
                  parent: effectData,
                  current: orgList.value,
                  field: columns[0].field,
                  value: refData.value,
                  index,
                  record: refData.value
                };
                return h("span", { key }, [toNode(labelSlot2, itemEffectData), labelSlot2 ? ": " : "", refData.value]);
              })
            }
          );
        } else {
          return () => listItems.value.map(({ children: children2, key }) => {
            return h(DetailLayouts, {
              key,
              modelsMap: children2,
              option,
              effectData
            });
          });
        }
      }
      const attrs = {};
      const children = computed(() => {
        return new Map(listItems.value.flatMap(({ children: children2 }) => [...children2]));
      });
      return () => h(DetailLayouts, {
        option: { ..._option, label, labelSlot },
        modelsMap: children.value,
        effectData,
        ...attrs
      });
    } else if (isFormItem) {
      const children = /* @__PURE__ */ new Map([
        [
          {
            ..._option,
            label,
            labelSlot,
            type: "InfoSlot",
            block: false,
            render: render2
          },
          model
        ]
      ]);
      return () => h(Collections, { model: { children }, option, effectData });
    } else {
      return render2;
    }
  }
});
const _sfc_main$b = /* @__PURE__ */ defineComponent({
  props: {
    option: {
      type: Object,
      required: true
    },
    model: {
      type: Object,
      required: true
    },
    effectData: Object,
    isView: Boolean
  },
  setup({
    option,
    model,
    effectData,
    isView
  }) {
    const {
      label,
      title = label,
      buttons
    } = option;
    return () => renderUIContainer("card", {}, {
      title: title && (() => h("div", {
        class: "sup-title"
      }, toNode(title, effectData))),
      extra: () => buttons && !isView && h(_sfc_main$h, {
        option: buttons,
        effectData
      }),
      default: () => isView ? h(DetailLayouts, {
        option,
        modelsMap: model.children,
        effectData
      }) : h(Collections, {
        option,
        model,
        effectData
      })
    });
  }
});
const _sfc_main$a = defineComponent({
  props: {
    option: {
      required: true,
      type: Object
    },
    model: {
      required: true,
      type: Object
    },
    effectData: {
      type: Object,
      required: true
    },
    isView: Boolean
  },
  setup({ model, option, isView, effectData }, ctx) {
    const { buttons: buttonsConfig, rowButtons, label, title = label } = option;
    const { modelsMap: childrenMap } = model.listData;
    const { propChain } = model;
    const orgList = toRef(model, "refData");
    const attrs = useAttrs();
    const rowKey = attrs.rowKey || "id";
    const getListAttrs = () => {
      const listAttrs = { ...attrs };
      delete listAttrs.rowKey;
      delete listAttrs.itemClass;
      delete listAttrs.itemStyle;
      return listAttrs;
    };
    const methods = {
      add() {
        orgList.value.push({});
      },
      delete({ record }) {
        const orgIdx = orgList.value.indexOf(record);
        orgList.value.splice(orgIdx, 1);
      }
    };
    const keyMap = /* @__PURE__ */ new WeakMap();
    const listItems = ref([]);
    watch(
      () => [...orgList.value],
      (org) => {
        listItems.value = org.map((record, idx) => {
          const raw = toRaw(record);
          if (!keyMap.has(raw)) {
            keyMap.set(raw, record[rowKey] || nanoid(12));
          }
          const hash = keyMap.get(raw);
          const { modelsMap } = cloneModels(childrenMap, record, propChain, idx);
          return {
            hash,
            model: { refData: ref(record), children: modelsMap, index: idx },
            effectData: reactive({
              parent: effectData,
              current: orgList,
              index: idx,
              record
            })
          };
        });
      },
      {
        immediate: true
      }
    );
    const slots = { ...ctx.slots };
    slots.title || (slots.title = title && (() => toNode(title, effectData)));
    if (buttonsConfig) {
      const slotName = buttonsConfig["targetSlot"] ?? buttonsConfig["forSlot"] ?? "extra";
      const orgSlot = slots[slotName];
      const buttonsSlot = createButtons({
        config: buttonsConfig,
        effectData,
        methods,
        isView
      });
      if (orgSlot || buttonsSlot) {
        slots[slotName] = () => [orgSlot == null ? void 0 : orgSlot(), buttonsSlot == null ? void 0 : buttonsSlot()];
      }
    }
    const { title: titleSlot, extra: extraSlot, ...__slots } = slots;
    if (titleSlot || extraSlot) {
      __slots.header = () => renderUILayout(
        "row",
        { align: "middle" },
        {
          default: () => [
            titleSlot && renderUILayout("col", { class: "sup-title", flex: 1 }, { default: titleSlot }),
            extraSlot && renderUILayout(
              "col",
              {
                class: "sup-title-buttons",
                style: { textAlign: buttonsConfig == null ? void 0 : buttonsConfig["align"] }
              },
              { default: extraSlot }
            )
          ]
        }
      );
    }
    const rowButtonsConfig = rowButtons && {
      buttonType: "link",
      size: "small",
      ...globalProps.rowButtons,
      ...Array.isArray(rowButtons) ? { actions: rowButtons } : rowButtons
    };
    __slots.renderItem = ({ item }) => renderUIContainer(
      "listItem",
      { key: item.hash, class: attrs.itemClass, style: attrs.itemStyle },
      {
        default: () => {
          var _a;
          return [
            isView ? h(DetailLayouts, {
              option,
              modelsMap: item.model.children,
              effectData: item.effectData
            }) : h(Collections, {
              model: item.model,
              option,
              class: "sup-list-item-content",
              effectData: item.effectData
            }),
            rowButtonsConfig && ((_a = createButtons({
              config: rowButtonsConfig,
              methods,
              effectData: item.effectData,
              isView
            })) == null ? void 0 : _a({ class: "sup-list-item-actions" }))
          ];
        }
      }
    );
    return () => renderUIContainer("list", { ...getListAttrs(), dataSource: listItems.value }, __slots);
  }
});
const _sfc_main$9 = defineComponent({
  inheritAttrs: false,
  props: {
    option: {
      required: true,
      type: Object
    },
    model: {
      required: true,
      type: Object
    },
    effectData: {
      type: Object,
      required: true
    },
    isView: Boolean,
    rowKey: String,
    labelIndex: Boolean
  },
  setup(props, ctx) {
    const { model, isView, effectData, labelIndex, rowKey = "" } = props;
    const { columns, rowButtons, slots: optionSlots, ...option } = props.option;
    const { modelsMap: childrenMap, rules } = model.listData;
    const { propChain } = model;
    const orgList = toRef(model, "refData");
    const methods = {
      add: {
        icon: () => getSemanticIconNode("add"),
        onClick({ index }) {
          orgList.value.splice(index + 1, 0, {});
          orgList.value = [...toRaw(orgList.value)];
        }
      },
      delete: {
        hidden: () => orgList.value.length === 1,
        disabled: false,
        confirmText: "",
        icon: () => getSemanticIconNode("remove"),
        onClick({ index }) {
          orgList.value = orgList.value.filter((_, idx) => idx !== index);
        }
      }
    };
    const rowButtonsConfig = !isView && rowButtons !== false && {
      type: "Buttons",
      buttonType: "link",
      size: "small",
      labelMode: "icon",
      ...globalProps.rowButtons,
      methods,
      actions: ["add", "delete"],
      ...Array.isArray(rowButtons) ? { actions: rowButtons } : rowButtons
    };
    const keyMap = /* @__PURE__ */ new WeakMap();
    const listItems = ref([]);
    watch(
      orgList,
      (list) => {
        if (list.length === 0) {
          list.push({});
        }
        listItems.value = list.map((record, idx) => {
          const raw = toRaw(record);
          if (!keyMap.has(raw)) {
            keyMap.set(raw, record[rowKey] || nanoid(12));
          }
          const { modelsMap } = cloneModels(childrenMap, record, propChain, idx);
          return {
            key: keyMap.get(raw),
            model: { refData: ref(record), children: modelsMap, index: idx },
            effectData: reactive({
              parent: effectData,
              current: orgList,
              index: idx,
              record
            })
          };
        });
      },
      {
        immediate: true
      }
    );
    const groupOption = {
      ...option,
      type: "Group",
      buttons: rowButtonsConfig,
      subItems: columns
    };
    const title = option.title || option.label;
    if (typeof title === "string" && labelIndex) {
      groupOption.title = ({ index }) => title + String(index + 1);
    }
    return () => listItems.value.map(({ model: model2, effectData: effectData2, key }) => {
      return h(Controls.Group, { model: model2, option: groupOption, effectData: effectData2, key, isView }, ctx.slots);
    });
  }
});
const _sfc_main$8 = /* @__PURE__ */ defineComponent({
  name: "ExTabs",
  props: {
    option: {
      type: Object,
      required: true
    },
    model: {
      type: Object,
      required: true
    },
    effectData: {
      type: Object,
      required: true
    },
    isView: Boolean
  },
  setup(props) {
    const activeKey = ref(props.option.activeKey);
    const paneKeys = [];
    const updatePaneVisibility = (idx, key, invalid) => {
      paneKeys[idx] = invalid ? void 0 : key;
      if (invalid && activeKey.value === key)
        activeKey.value = paneKeys.find(Boolean);
    };
    const panes = [...props.model.children].map(([option, model], idx) => {
      const {
        key,
        field,
        label,
        icon
      } = option;
      const effectData = getEffectData({
        parent: props.effectData,
        current: toRef(model, "parent"),
        field: model.refName,
        value: model.refData
      });
      const {
        hidden,
        attrs
      } = render({
        option,
        effectData
      });
      const tabKey = key || field || String(idx);
      const tabLabel = () => [getIconNode(icon), toNode(label, effectData)];
      watchEffect(() => updatePaneVisibility(idx, tabKey, unref(hidden) || unref(attrs.disabled)));
      return {
        attrs: reactive({
          ...attrs,
          key: tabKey,
          label: tabLabel
        }),
        hidden,
        option: {
          ...option,
          type: "TabPane"
        },
        model,
        effectData
      };
    });
    onMounted(() => {
      activeKey.value ?? (activeKey.value = paneKeys.find(Boolean));
    });
    return () => renderUIContainer("tabs", {
      value: activeKey.value,
      "onUpdate:value": (value) => activeKey.value = value
    }, {
      extra: () => !props.isView && props.option.buttons ? h(_sfc_main$h, {
        option: props.option.buttons
      }) : void 0,
      default: () => panes.map(({
        attrs,
        hidden,
        option,
        model,
        effectData
      }) => !hidden.value && renderUIContainer("tab", attrs, {
        default: () => props.isView ? h(DetailLayouts, {
          option,
          modelsMap: model.children,
          effectData
        }) : h(Collections, {
          option,
          model,
          effectData
        })
      }))
    });
  }
});
const _sfc_main$7 = defineComponent({
  name: "SuperForm",
  props: {
    schema: Object,
    model: Object,
    dataSource: Object,
    isContainer: Boolean,
    compact: { type: Boolean, default: void 0 },
    ignoreRules: { type: Boolean, default: void 0 }
  },
  emits: ["register"],
  setup(props, ctx) {
    var _a, _b;
    const formRef = ref();
    const formOption = shallowReactive({
      ...props.schema,
      dataSource: props.dataSource || props.model || ((_a = props.schema) == null ? void 0 : _a.dataSource),
      attrs: mergeProps({ ...globalProps.Form }, { ...(_b = props.schema) == null ? void 0 : _b.attrs })
    });
    if (globalConfig.schemaDiagnostics && props.schema)
      reportSchemaDiagnostics(props.schema, "form", "SuperForm");
    const actions = {
      setOption: (_option) => {
        var _a2;
        if (globalConfig.schemaDiagnostics)
          reportSchemaDiagnostics(_option, "form", "SuperForm");
        defaults(formOption, _option);
        formOption.attrs = mergeProps(formOption.attrs, { ..._option.attrs }, { ...(_a2 = props.schema) == null ? void 0 : _a2.attrs });
      }
    };
    provide("rootSlots", ctx.slots);
    ctx.emit("register", actions);
    const register = (compRef) => {
      formRef.value = compRef;
      ctx.emit("register", actions, compRef);
    };
    onMounted(() => ctx.expose(formRef.value));
    const isContainer = computed(() => props.isContainer || formOption.isContainer);
    const formNode = () => formOption.subItems && h(
      Controls.Form,
      {
        option: formOption,
        // dataSource: formData.value,
        onRegister: register,
        compact: props.compact,
        ignoreRules: props.ignoreRules,
        class: { "sup-container": isContainer.value }
      },
      useInnerSlots(formOption.slots, getEffectData(), ctx.slots)
    );
    return formNode;
  }
});
function useForm(option) {
  const [formRef, getForm] = useGetRef();
  const syncOption = Promise.resolve(typeof option === "function" ? option() : option);
  const register = (actions, ref2) => {
    if (actions) {
      if (!formRef.value) {
        syncOption.then(actions.setOption);
      }
      formRef.value = ref2;
    } else {
      return (props, ctx) => h(_sfc_main$7, { ...props, onRegister: register }, ctx == null ? void 0 : ctx.slots);
    }
  };
  const asyncCall = async (key, param) => {
    const form = await getForm();
    if (key && key in form) {
      if (typeof form[key] === "function") {
        return form[key](param);
      } else {
        return form[key];
      }
    } else if (!key) {
      return form;
    }
  };
  return [
    register,
    {
      dataSource: computed(() => {
        var _a;
        return (_a = formRef.value) == null ? void 0 : _a.dataSource;
      }),
      getForm,
      asyncCall,
      getData() {
        var _a;
        return toValue((_a = formRef.value) == null ? void 0 : _a.dataSource);
      },
      submit: () => asyncCall("submit"),
      resetFields: (rest) => asyncCall("resetFields", rest),
      setFieldsValue: (data) => asyncCall("setFieldsValue", data),
      /**
       * @deprecated 使用`resetFields`
       */
      setData(data) {
        asyncCall("resetFields", data);
      }
    }
  ];
}
function createModal(content, { buttons, ...__config } = {}) {
  const visible = ref(false);
  const config = reactive({ ...__config, ...globalProps.Modal });
  const modalRef = ref();
  const footer = buttons && (() => h(_sfc_main$h, { option: buttons, effectData: { modalRef } }));
  const confirmLoading = ref(false);
  const onOk = () => {
    var _a;
    confirmLoading.value = true;
    return Promise.resolve((_a = config.onOk) == null ? void 0 : _a.call(config)).then(() => {
      visible.value = false;
    }).catch((err) => console.error(err)).finally(() => confirmLoading.value = false);
  };
  const titleSlot = () => config.icon ? [getIconNode(config.icon), toNode(config.title)] : toNode(config.title);
  const updateVisible = (val) => visible.value = val;
  const modalSlot = (props, ctx) => renderUIModal(
    {
      ref: modalRef,
      visible: visible.value,
      class: "sup-modal",
      "onUpdate:visible": updateVisible,
      confirmLoading: confirmLoading.value,
      ...config,
      title: void 0,
      ...props,
      onOk
    },
    { footer, title: titleSlot, ...ctx == null ? void 0 : ctx.slots, ...content && { default: content } }
  );
  const openModal = async (option) => {
    Object.assign(config, option);
    visible.value = true;
    return nextTick();
  };
  const closeModal = () => {
    visible.value = false;
    return nextTick();
  };
  const setModal = (option) => {
    Object.assign(config, option);
  };
  return {
    config,
    modalRef,
    modalSlot,
    setModal,
    closeModal,
    openModal
  };
}
function useModal(content, config) {
  const { modalSlot, openModal, modalRef, closeModal, setModal, config: modalConfig } = createModal(content, config);
  const ins = getCurrentInstance();
  const wrap = document.createDocumentFragment();
  let vm;
  const configContext = useUIModalContext();
  const Wrapper = (props) => {
    return wrapUIModalContext(
      (contextProps = {}) => modalSlot({ ...props, ...contextProps }, {}),
      configContext,
      props
    );
  };
  const destroy = () => {
    render$1(null, wrap);
    vm = null;
  };
  onUnmounted(() => {
    vm && destroy();
  });
  const open = (option) => {
    if (modalRef.value) {
      return openModal(option);
    } else {
      vm = createVNode(Wrapper);
      vm.appContext = ins == null ? void 0 : ins.appContext;
      render$1(vm, wrap);
      if (modalConfig.destroyOnClose) {
        const afterClose = modalConfig.afterClose;
        setModal({
          afterClose() {
            afterClose == null ? void 0 : afterClose();
            destroy();
          }
        });
      }
      return nextTick(() => openModal(option));
    }
  };
  return {
    modalRef,
    openModal: open,
    modalSlot,
    closeModal,
    setModal
  };
}
function useModalForm(formOption, config = {}) {
  const { title, ...option } = formOption;
  const [register, form] = useForm(option);
  const modal = useModal(register(), { maskClosable: false, title, ...config });
  const openModal = ({ data, onOk = config.onOk, ...__config } = {}) => {
    const __onOk = () => {
      return form.submit().then((data2) => onOk ? onOk(data2) : data2);
    };
    form.resetFields(data);
    return modal.openModal({ ...__config, onOk: __onOk });
  };
  return { ...modal, openModal, formActions: form };
}
const merge = (obj, ...source) => {
  return mergeWith(obj, ...source, (objValue, srcValue, key, current) => {
    if (srcValue === void 0) {
      current[key] = void 0;
    } else if (Array.isArray(objValue)) {
      return srcValue;
    }
  });
};
function createEditCache(childrenMap) {
  const editMap = /* @__PURE__ */ new WeakMap();
  const getEditInfo = (record) => {
    const raw = toRaw(record);
    let editInfo = editMap.get(raw);
    if (!editInfo) {
      editInfo = shallowReactive({
        isEdit: false
      });
      editMap.set(raw, editInfo);
    }
    return editInfo;
  };
  const setEditInfo = (data, info) => {
    const editInfo = getEditInfo(data);
    if (!editInfo.editData) {
      const editData = reactive(cloneDeep(data));
      const {
        modelsMap
      } = cloneModelsFlat(toRaw(childrenMap), editData);
      Object.assign(editInfo, {
        ...info,
        forms: shallowReactive({}),
        modelsMap,
        editData
      });
    } else {
      resetFields(editInfo.editData, data);
      Object.assign(editInfo, info);
    }
  };
  return {
    getEditInfo,
    setEditInfo
  };
}
function inlineRender({
  childrenMap,
  orgList,
  listener,
  rowEditor
}) {
  const hasEditor = ref(false);
  const list = ref([]);
  watch(() => [...orgList.value], (org) => {
    list.value = org;
    hasEditor.value = false;
  }, {
    immediate: true
  });
  const {
    getEditInfo,
    setEditInfo
  } = createEditCache(childrenMap);
  const methods = {
    add({
      index,
      resetData
    }) {
      const item = {
        ...resetData
      };
      if (index !== void 0) {
        list.value.splice(index + 1, 0, item);
      } else {
        list.value.push(item);
      }
      setEditInfo(item, {
        index,
        isEdit: true,
        isNew: true
      });
      hasEditor.value = true;
    },
    edit({
      record,
      selectedRows,
      resetData
    }) {
      const data = record || selectedRows[0];
      setEditInfo(merge(data, resetData), {
        isEdit: true
      });
      hasEditor.value = true;
    },
    delete({
      record,
      selectedRows
    }) {
      const items = record ? [record] : selectedRows;
      return listener.onDelete(items);
    }
  };
  const buttonMethods = {
    add: {
      disabled: () => hasEditor.value,
      onClick: methods.add
    },
    edit: {
      disabled: (param) => {
        var _a;
        return hasEditor.value || !(param.record || ((_a = param.selectedRows) == null ? void 0 : _a.length) === 1);
      },
      onClick: methods.edit
    },
    delete: {
      disabled: (param) => {
        var _a;
        return hasEditor.value || !(param.record || ((_a = param.selectedRows) == null ? void 0 : _a.length) > 0);
      },
      onClick: methods.delete
    }
  };
  const editActions = [{
    label: "保存",
    loading: true,
    onClick: async (args) => {
      const {
        record
      } = args;
      const editInfo = getEditInfo(record);
      return Promise.all(Object.values(editInfo.forms).map((form) => form.validate())).then(async () => {
        var _a;
        const raw = toRaw(editInfo.editData);
        const custom = await ((_a = rowEditor == null ? void 0 : rowEditor.onSave) == null ? void 0 : _a.call(rowEditor, {
          ...args,
          isNew: editInfo.isNew
        }));
        if (custom === false)
          return false;
        if (editInfo.isNew) {
          Object.assign(record, raw);
          listener.onSave(record, editInfo.index).then(() => {
            editInfo.isNew = false;
            editInfo.isEdit = false;
          });
        } else {
          listener.onUpdate(raw, record).then(() => {
            editInfo.isEdit = false;
          });
        }
        hasEditor.value = false;
      }).catch((err) => {
        console.log("error", err);
        (err == null ? void 0 : err.errorFields) && showUIMessage("error", err.errorFields[0].errors[0]);
      });
    }
  }, {
    label: "取消",
    onClick: async (args) => {
      var _a;
      const editInfo = getEditInfo(args.record);
      const custom = await ((_a = rowEditor == null ? void 0 : rowEditor.onCancel) == null ? void 0 : _a.call(rowEditor, {
        ...args,
        isNew: editInfo.isNew
      }));
      if (custom === false)
        return;
      if (editInfo.isNew) {
        list.value.splice(editInfo.index + 1, 1);
      }
      editInfo.isEdit = false;
      hasEditor.value = false;
    }
  }];
  const editButtonsSlot = (param, config) => {
    const editInfo = getEditInfo(param.record);
    return editInfo.isEdit ? h(_sfc_main$h, {
      key: "edit",
      option: {
        ...config,
        actions: editActions
      },
      effectData: param
    }) : null;
  };
  const InputNode2 = /* @__PURE__ */ defineComponent({
    props: {
      option: {
        type: Object,
        required: true
      },
      editInfo: {
        type: Object,
        required: true
      },
      viewRender: {
        type: Function
      }
    },
    setup({
      option,
      editInfo,
      viewRender
    }) {
      const {
        editable = true
      } = option;
      const {
        modelsMap,
        forms
      } = editInfo;
      const model = modelsMap.get(toRaw(option));
      const {
        index,
        parent,
        refData
      } = toRefs(model);
      const ruleName = model.propChain.join(".");
      const effectData = getEffectData({
        current: parent,
        value: refData,
        index
      });
      const {
        attrs,
        hidden
      } = render({
        option,
        effectData
      });
      const editableRef = computed(() => !hidden.value && (isFunction(editable) ? editable(effectData) : editable));
      const inputSlot = buildInnerNode(option, model, effectData, attrs);
      const rules = formatRule(model.rules, effectData);
      const activeRules = computed(() => unref(attrs.disabled) || unref(hidden) ? [] : rules);
      return () => editableRef.value ? renderUIForm({
        ref: (instance) => {
          if (instance)
            forms[ruleName] = instance;
        },
        model: editInfo.editData
      }, {
        default: () => renderUIFormItem({
          name: model.propChain,
          rules: activeRules.value,
          wrapperCol: {}
        }, {
          default: inputSlot
        })
      }) : viewRender ? viewRender({
        ...effectData,
        isView: true
      }) : refData.value;
    }
  });
  const getEditRender = (option, viewRender) => {
    if (hasFormComponent(option.type) || option.type === "InputSlot") {
      return ({
        record
      }) => {
        const editInfo = getEditInfo(record);
        if (editInfo.isEdit) {
          return h(InputNode2, {
            option,
            editInfo,
            viewRender
          });
        }
      };
    }
  };
  return {
    list,
    methods,
    buttonMethods,
    getEditRender,
    editButtonsSlot
  };
}
function editModal({ rowKey, option, listener }) {
  const formRef = ref();
  const rowEditor = option.rowEditor;
  const formOption = (rowEditor == null ? void 0 : rowEditor.form) || option.editForm || option.formSchema || {};
  formOption.subItems = formOption.subItems || option.columns.filter((item) => {
    var _a;
    return !(item.hideInForm || ((_a = item.exclude) == null ? void 0 : _a.includes("form")));
  });
  const source = ref(formOption.dataSource || {});
  const editForm = () => h(Controls.Form, {
    option: formOption,
    dataSource: source,
    onRegister: (data) => formRef.value = data
  });
  const modalProps = {
    ...globalProps.Modal,
    maskClosable: false,
    ...option.modalProps,
    ...rowEditor == null ? void 0 : rowEditor.modalProps
  };
  const { modalSlot, openModal, closeModal } = createModal(editForm, modalProps);
  const getTitle = ({ meta, ...param }) => {
    return toNode(modalProps.title, { meta, ...param }) || `${formOption.title ? formOption.title + " - " : ""}  ${meta.title || meta.label}`;
  };
  const methods = {
    add(args = {}) {
      const { meta = {}, resetData, index } = args;
      source.value = { ...resetData };
      nextTick(() => {
        var _a;
        (_a = formRef.value) == null ? void 0 : _a.clearValidate();
      });
      meta.title ?? (meta.title = "新增");
      meta.name = "add";
      meta.isNew = true;
      return openModal({
        ...meta,
        title: getTitle({ ...args, source: source.value, meta }),
        onOk: async () => {
          return formRef.value.submit().then(async (data) => {
            var _a;
            const custom = await ((_a = rowEditor == null ? void 0 : rowEditor.onSave) == null ? void 0 : _a.call(rowEditor, { ...args, source: data, meta }));
            if (custom === false)
              return;
            return listener.onSave(data, index);
          });
        },
        onCancel: async () => {
          var _a;
          await ((_a = rowEditor == null ? void 0 : rowEditor.onCancel) == null ? void 0 : _a.call(rowEditor, { ...args, meta }));
          return closeModal();
        }
      });
    },
    async edit(args) {
      var _a, _b, _c;
      const { record, selectedRows, resetData, meta = {} } = args;
      const data = record || selectedRows[0];
      if (!data) {
        return Promise.reject(new Error("未选择记录"));
      }
      const res = await ((_b = (_a = option.apis) == null ? void 0 : _a.info) == null ? void 0 : _b.call(_a, rowKey(data), data));
      source.value = merge({}, data, res, resetData);
      defaults(meta, { name: "edit", title: "编辑", isNew: false });
      (_c = formRef.value) == null ? void 0 : _c.clearValidate();
      return openModal({
        ...meta,
        title: getTitle({ ...args, source: source.value, meta }),
        onOk: async () => {
          return formRef.value.submit().then(async (newData) => {
            var _a2;
            const custom = await ((_a2 = rowEditor == null ? void 0 : rowEditor.onSave) == null ? void 0 : _a2.call(rowEditor, { ...args, source: newData, meta }));
            if (custom === false)
              return;
            return listener.onUpdate(newData, data);
          });
        },
        onCancel: async () => {
          var _a2;
          await ((_a2 = rowEditor == null ? void 0 : rowEditor.onCancel) == null ? void 0 : _a2.call(rowEditor, { ...args, meta }));
          return closeModal();
        }
      });
    },
    delete({ record, selectedRows }) {
      const items = record ? [record] : selectedRows;
      return listener.onDelete(items);
    }
  };
  return { modalSlot, methods };
}
function useTableEdit({
  model,
  orgList,
  rowKey,
  setRowKey,
  editableRef
}) {
  const {
    modelsMap: childrenMap
  } = model.listData;
  const editList = ref([]);
  const listMap = /* @__PURE__ */ new WeakMap();
  const keyMap = /* @__PURE__ */ new WeakMap();
  watch(() => [...orgList.value], (org) => {
    editList.value = org.map((record, idx) => {
      const listItem = listMap.get(toRaw(record)) || shallowReactive({});
      if (listItem.index !== idx) {
        listItem.index = idx;
        const {
          modelsMap
        } = cloneModelsFlat(toRaw(childrenMap), record, model.propChain, idx);
        listItem.modelsMap = modelsMap;
      }
      listItem.record ?? (listItem.record = reactive({
        ...toRefs(record)
      }));
      const hash = rowKey(record);
      setRowKey(listItem.record, hash);
      listMap.set(toRaw(record), listItem);
      keyMap.set(toRaw(listItem.record), listItem);
      return listItem.record;
    });
  }, {
    immediate: true
  });
  const methods = {
    add({
      index,
      resetData
    }) {
      const item = {
        ...resetData
      };
      if (index !== void 0) {
        orgList.value.splice(index + 1, 0, item);
      } else {
        orgList.value.push(item);
      }
    }
    // delete({ record }) {
    //   const orgIdx = orgList.value.indexOf(record)
    //   orgList.value.splice(orgIdx, 1)
    // },
  };
  const InputNode2 = /* @__PURE__ */ defineComponent({
    inheritAttrs: false,
    props: {
      option: {
        type: Object,
        required: true
      }
    },
    setup({
      option
    }, ctx) {
      const {
        record
      } = ctx.attrs;
      const model2 = computed(() => {
        const row = keyMap.get(toRaw(record));
        return row.modelsMap.get(option);
      });
      const {
        index,
        parent,
        refData
      } = toRefs(model2.value);
      const effectData = getEffectData({
        current: parent,
        value: refData,
        list: orgList,
        record,
        index
      });
      const {
        editable = true
      } = option;
      const {
        attrs,
        hidden
      } = render({
        option,
        effectData
      });
      const selfEditableRef = computed(() => !hidden.value && editableRef.value && (isFunction(editable) ? editable(effectData) : editable));
      const inputSlot = buildInnerNode(option, model2.value, effectData, attrs);
      const viewNode = getViewNode(option, reactive({
        ...toRefs(effectData),
        isView: true
      }));
      const __rules = formatRule(model2.value.rules, effectData);
      const rules = __rules && computed(() => unref(attrs.disabled) ? void 0 : __rules);
      return () => selfEditableRef.value ? renderUIFormItem(reactive({
        wrapperCol: {},
        name: model2.value.propChain,
        rules
      }), {
        default: inputSlot
      }) : viewNode ? viewNode() : refData.value;
    }
  });
  const getEditRender = (option) => {
    if (hasFormComponent(option.type) || option.type === "InputSlot" && option.editable !== false) {
      return (args) => h(InputNode2, {
        option,
        ...args
      });
    }
  };
  return {
    list: editList,
    methods,
    getEditRender
  };
}
function buildDetail(option, modelsMap, rowKey) {
  const source = ref({});
  const { title, apis } = option;
  const { modalProps, ...descriptionsProps } = option.descriptionsProps || {};
  const detail = () => h(_sfc_main$g, { option: { descriptionsProps }, modelsMap, source });
  const modalConfig = {
    ...globalProps.Modal,
    footer: null,
    ...option.modalProps,
    ...modalProps
  };
  const getTitle = (param) => {
    return toNode(modalConfig.title, param) || `${title ? title + " - " : ""}详情`;
  };
  const { openModal, modalSlot } = useModal(detail, modalConfig);
  return {
    detailSlot: modalSlot,
    openDetail: async ({ record, selectedRows, meta = {}, ...params }) => {
      const data = record || selectedRows[0];
      if (apis == null ? void 0 : apis.info) {
        const res = await apis.info(rowKey(data), data);
        source.value = Object.assign({}, data, res);
      } else {
        source.value = data;
      }
      meta.name = "detail";
      openModal({ ...meta, title: getTitle({ ...params, source: source.value, meta }) });
    }
  };
}
function buildData({ option, model, orgList, rowKey, setRowKey, listener, isView, effectData }) {
  const { modelsMap: childrenMap } = model.listData;
  const context = {
    list: orgList,
    modalSlot: [],
    methods: {
      delete({ record, selectedRows }) {
        const items = record ? [record] : selectedRows;
        return listener.onDelete(items);
      }
    }
  };
  const { edit, editable = edit, rowEditor } = option;
  const { editMode, addMode } = rowEditor || option;
  if (!isView && editable) {
    const editableRef = computed(() => isFunction(editable) ? editable(effectData) : editable);
    const { methods, ..._context } = useTableEdit({ model, orgList, rowKey, setRowKey, editableRef });
    Object.assign(context.methods, methods);
    Object.assign(context, _context);
  } else if (editMode === "inline") {
    const { list, methods, buttonMethods, editButtonsSlot, getEditRender } = inlineRender({
      childrenMap,
      orgList,
      listener,
      rowEditor
    });
    context.list = list;
    Object.assign(context.methods, methods);
    Object.assign(context, { buttonMethods, editButtonsSlot, getEditRender });
  }
  if (editMode === "modal" || addMode === "modal") {
    const { modalSlot, methods } = editModal({ rowKey, option, listener });
    if (context.methods.edit) {
      context.methods.add = methods.add;
      context.buttonMethods || (context.buttonMethods = {});
      context.buttonMethods.add = methods.add;
    } else {
      Object.assign(context.methods, methods);
    }
    context.modalSlot.push(modalSlot);
  }
  const { detailSlot, openDetail } = buildDetail(option, childrenMap, rowKey);
  context.modalSlot.push(detailSlot);
  context.methods.detail = openDetail;
  return context;
}
const _sfc_main$6 = defineComponent({
  props: {
    effectData: Object,
    options: null,
    bordered: Boolean,
    /** 字典名称 */
    dictName: String,
    /** 使用选项 label 作为字段值 */
    labelAsValue: Boolean,
    /** @deprecated 使用 `labelAsValue` */
    valueToLabel: Boolean,
    activeKey: [String, Number, Object],
    defaultActiveKey: [String, Number],
    customTab: Function,
    slots: Object
  },
  emits: ["update:activeKey"],
  setup(props, { attrs, slots, emit }) {
    const { optionsRef } = useOptions(
      { ...props, labelAsValue: props.labelAsValue || props.valueToLabel },
      [],
      props.effectData
    );
    const activeKey = ref(props.activeKey ?? props.defaultActiveKey);
    const updateActiveKey = (key) => {
      activeKey.value = key;
      emit("update:activeKey", key);
    };
    const {
      default: innerContent,
      extra,
      rightExtra,
      tabBarExtraContent,
      tabBarExtra,
      title,
      titleBar,
      ..._slots
    } = slots;
    const innerSlots = useInnerSlots(props.slots, props.effectData);
    const tabBarExtraSlot = tabBarExtra || rightExtra || tabBarExtraContent;
    const tabList = computed(() => {
      var _a;
      const list = optionsRef.value.map(({ value, label, ...item }) => ({
        ...item,
        key: item.key ?? value,
        tab: item.tab ?? label
      }));
      if (activeKey.value === void 0) {
        updateActiveKey((_a = list[0]) == null ? void 0 : _a.key);
      }
      return list;
    });
    const customTab = (item) => toNode(innerSlots.customTab || props.customTab || item.tab, {
      ...props.effectData,
      item
    });
    return () => [
      !props.bordered && title ? titleBar == null ? void 0 : titleBar() : null,
      renderUITableFilter(
        {
          bordered: props.bordered,
          items: tabList.value.map((item) => ({
            ...item,
            tab: customTab(item)
          })),
          value: activeKey.value,
          onValueChange: updateActiveKey,
          attrs
        },
        {
          ..._slots,
          ...innerSlots,
          default: innerContent,
          title,
          tabExtra: tabBarExtraSlot || (!title ? extra : void 0),
          cardExtra: tabBarExtraSlot || title ? extra : void 0
        }
      )
    ];
  }
});
const InputNode = defineComponent({
  props: {
    option: { type: Object, required: true },
    effectData: { type: Object, required: true }
  },
  setup(props) {
    const option = props.option;
    const { field, editable } = props.option;
    const effectData = reactive({});
    watch(
      () => props.effectData,
      (data) => Object.assign(effectData, data),
      { immediate: true }
    );
    const path = field.split(".").slice(0, -1);
    const parent = computed(() => get(effectData.record, path));
    const refData = computed({
      get: () => get(effectData.record, field),
      set: (val) => set(effectData.record, field, val)
    });
    const model = { parent, refData };
    const { attrs, hidden } = render({ option, effectData: { ...effectData, inTable: true } });
    const inputSlot = buildInnerNode(option, model, effectData, attrs);
    const editableRef = computed(() => isFunction(editable) ? editable(effectData) : unref(editable));
    const viewNode = getViewNode(option, effectData);
    return () => {
      if (hidden.value)
        return "";
      if (editableRef.value) {
        return h("div", { class: "editable-cell" }, inputSlot());
      }
      return viewNode ? viewNode() : refData.value;
    };
  }
});
const getEditNode = (option) => {
  if (!option.editable)
    return;
  const roles = globalConfig.buttonRoles && globalConfig.buttonRoles() || [];
  const isFree = !option.roleName || roles.includes(option.roleName);
  if (isFree && (hasFormComponent(option.type) || option.type === "InputSlot")) {
    return (param) => {
      return h(InputNode, { option, effectData: { ...param } });
    };
  }
};
function buildColumns({
  childrenMap,
  context,
  option,
  attrs,
  isView,
  effectData: parentData
}) {
  const { methods, buttonMethods, getEditRender, editButtonsSlot } = context;
  const effectData = getEffectData({ list: parentData.value, isView, parent: parentData });
  const columns = function getColumns(_models = childrenMap) {
    const _columns = [];
    [..._models].forEach(([col, model]) => {
      var _a, _b;
      if (col.type === "Hidden" || col.hideInTable || col.hidden === true || ((_a = col.exclude) == null ? void 0 : _a.includes("table")))
        return;
      const title = createLabelNode(col, effectData);
      if (model.children) {
        const subColumns = getColumns(model.children);
        if (col.ignoreTableTitle) {
          _columns.push(...subColumns);
        } else {
          _columns.push({
            title,
            children: subColumns
          });
        }
      } else {
        const column = {
          title,
          key: col.field || col.label,
          dataIndex: model.propChain.length > 1 ? model.propChain : model.propChain[0]
        };
        if (col.options || col.dictName || col.type === "Switch" || ((_b = col.type) == null ? void 0 : _b.includes("Picker"))) {
          column.align = "center";
        } else if (col.type === "InputNumber") {
          column.align = "right";
        }
        Object.assign(column, col.columnProps);
        defaults(column, option.columnProps, globalProps.Column);
        const viewRender = column.customRender || getViewNode(col) || void 0;
        const editRender = getEditRender ? getEditRender(col, viewRender) : getEditNode(col);
        column.customRender = parseRender(viewRender, editRender, effectData);
        _columns.push(column);
      }
    });
    return _columns;
  }();
  const indexColumn = buildIndexColumn(option, attrs);
  if (indexColumn)
    columns.unshift(indexColumn);
  const actionColumn = buildActionSlot({
    buttons: option.rowButtons,
    methods: buttonMethods || methods,
    editButtonsSlot,
    isView,
    effectData
  });
  if (actionColumn) {
    defaults(actionColumn, option.columnProps, globalProps.Column);
    columns.push(actionColumn);
  }
  return columns;
}
function parseRender(viewRender, editRender, effectData) {
  if (editRender || viewRender) {
    const __render = (param) => {
      const result = (editRender == null ? void 0 : editRender(param)) ?? (viewRender == null ? void 0 : viewRender({ ...param, isView: true })) ?? String(param.text ?? "");
      if (result && typeof result === "string" && param.column.ellipsis) {
        return h("span", { title: result }, result);
      }
      return result;
    };
    return (param) => h(__render, { ...effectData, ...param, current: param.record });
  } else {
    return ({ text }) => String(text ?? "");
  }
}
function buildActionSlot({ buttons, methods, editButtonsSlot, isView, effectData }) {
  const buttonsConfig = {
    buttonType: "link",
    size: "small",
    ...globalProps.rowButtons,
    ...Array.isArray(buttons) ? { actions: buttons } : buttons
  };
  const { columnProps, ...config } = buttonsConfig;
  const buttonsSlot = createButtons({ config, methods, isView });
  if (!buttonsSlot)
    return;
  const render2 = (param) => {
    return (editButtonsSlot == null ? void 0 : editButtonsSlot(param, config)) || buttonsSlot({ key: param.record, effectData: param });
  };
  return {
    title: "操作",
    key: "action",
    fixed: "right",
    minWidth: 100,
    width: 100,
    align: "center",
    resizable: false,
    ...columnProps,
    customRender: (param) => h(render2, { ...effectData, ...param, current: param.record })
  };
}
const buildIndexColumn = (option, attrs) => {
  var _a;
  const indexColumn = option.indexColumn ?? ((_a = globalProps.Table) == null ? void 0 : _a.indexColumn);
  if (!indexColumn)
    return;
  return {
    key: "INDEX",
    title: "序号",
    width: 60,
    align: "center",
    customRender: ({ index }) => {
      var _a2, _b;
      return ((((_a2 = attrs.pagination) == null ? void 0 : _a2.current) || 1) - 1) * (((_b = attrs.pagination) == null ? void 0 : _b.pageSize) || 10) + index + 1;
    },
    ...isPlainObject(indexColumn) && indexColumn
  };
};
const _sfc_main$5 = defineComponent({
  name: "SuperTable",
  inheritAttrs: false,
  props: {
    option: {
      required: true,
      type: Object
    },
    model: {
      required: true,
      type: Object
    },
    effectData: {
      required: true,
      type: Object
    },
    isView: Boolean,
    reload: Function,
    expandedRowKeys: Array,
    defaultExpandLevel: null
  },
  emits: ["register", "expandedRowsChange"],
  setup({ option, model, reload, effectData, isView, ...props }, ctx) {
    var _a, _b, _c;
    const editInline = ((_a = option.rowEditor) == null ? void 0 : _a.editMode) === "inline";
    const attrs = ctx.attrs;
    const keyMap = /* @__PURE__ */ new WeakMap();
    const rowKeyField = attrs.rowKey || "id";
    const rowKey = (record) => {
      const key = record[rowKeyField];
      if (key !== void 0 && key !== null)
        return key;
      const raw = toRaw(record);
      if (!keyMap.has(raw)) {
        keyMap.set(raw, nanoid(12));
      }
      return keyMap.get(raw);
    };
    const setRowKey = (record, key) => keyMap.set(toRaw(record), key);
    const orgList = toRef(model, "refData");
    const __rowSelection = ((_b = option.attrs) == null ? void 0 : _b.rowSelection) || void 0;
    const configuredSelectedKeys = __rowSelection == null ? void 0 : __rowSelection.selectedRowKeys;
    const selectedRowKeys = isRef(configuredSelectedKeys) ? configuredSelectedKeys : ref(configuredSelectedKeys || []);
    const selectedRows = ref([]);
    const {
      selectedRowKeys: _selectedRowKeys,
      onChange: _onSelectionChange,
      getCheckboxProps: _getCheckboxProps,
      ...selectionAttrs
    } = __rowSelection || {};
    const rowSelection = __rowSelection && {
      attrs: {
        fixed: true,
        ...selectionAttrs
      },
      onChange: (_selectedRowKeys2, _selectedRows, info) => {
        var _a2;
        selectedRowKeys.value = _selectedRowKeys2;
        selectedRows.value = _selectedRows;
        (_a2 = __rowSelection == null ? void 0 : __rowSelection.onChange) == null ? void 0 : _a2.call(__rowSelection, _selectedRowKeys2, _selectedRows, info);
      },
      isRowSelectable: (record) => {
        var _a2, _b2;
        if (editInline && !orgList.value.includes(record))
          return false;
        return !((_b2 = (_a2 = __rowSelection == null ? void 0 : __rowSelection.getCheckboxProps) == null ? void 0 : _a2.call(__rowSelection, record)) == null ? void 0 : _b2.disabled);
      }
    };
    const childrenField = attrs.childrenColumnName || "children";
    const getExpandKeys = (list2, deep = 0, level = 1) => {
      const arr = [];
      const isEnd = deep === level;
      list2.forEach((item) => {
        if (item[childrenField]) {
          arr.push(rowKey(item));
          if (!isEnd) {
            arr.push(...getExpandKeys(item[childrenField], deep, level + 1));
          }
        }
      });
      return arr;
    };
    const expandedRowKeys = ref(((_c = option.attrs) == null ? void 0 : _c.expandedRowKeys) || []);
    const updateExpand = (val) => {
      expandedRowKeys.value = val;
      ctx.emit("expandedRowsChange", val);
    };
    if (props.defaultExpandLevel || attrs.defaultExpandAllRows) {
      watch(
        orgList,
        (list2, old) => {
          if (list2.length && !(old == null ? void 0 : old.length)) {
            updateExpand(getExpandKeys(list2, Number(props.defaultExpandLevel)));
          }
        },
        { immediate: true }
      );
    }
    const listener = {
      async onSave(data, index) {
        var _a2;
        if ((_a2 = option.apis) == null ? void 0 : _a2.save) {
          await option.apis.save(data);
          if (data.parentId) {
            expandedRowKeys.value = [...expandedRowKeys.value, data.parentId];
          }
          return reload == null ? void 0 : reload();
        } else {
          if (index !== void 0) {
            orgList.value.splice(index + 1, 0, data);
          } else {
            orgList.value.push(data);
          }
        }
      },
      async onUpdate(newData, oldData) {
        var _a2;
        if ((_a2 = option.apis) == null ? void 0 : _a2.update) {
          await option.apis.update(newData);
        }
        Object.assign(oldData, newData);
        const key = rowKey(oldData);
        if (key) {
          const idx = orgList.value.findIndex((item) => rowKey(item) === key);
          if (idx > -1) {
            orgList.value.splice(idx, 1, oldData);
          }
        }
        return reload == null ? void 0 : reload();
      },
      async onDelete(items) {
        var _a2, _b2;
        const keys = items.map((item) => rowKey(item));
        try {
          await ((_b2 = (_a2 = option.apis) == null ? void 0 : _a2.delete) == null ? void 0 : _b2.call(_a2, keys, items));
        } catch (error) {
          console.error(error);
          return error;
        }
        if (rowSelection) {
          selectedRowKeys.value = selectedRowKeys.value.filter(
            (key) => !keys.includes(key)
          );
          selectedRows.value = selectedRows.value.filter(
            (item) => !keys.includes(rowKey(item))
          );
        }
        items.forEach((item) => {
          orgList.value.splice(list.value.indexOf(item), 1);
        });
        return reload == null ? void 0 : reload();
      }
    };
    const context = buildData({
      option,
      model,
      orgList,
      rowKey,
      setRowKey,
      listener,
      isView,
      effectData
    });
    const columns = buildColumns({
      childrenMap: model.listData.modelsMap,
      context,
      option,
      attrs,
      isView,
      effectData
    });
    const { list, methods, buttonMethods = methods, modalSlot } = context;
    const actions = {
      selectedRowKeys,
      selectedRows,
      setSelectedRows: (arr) => {
        selectedRows.value = arr;
        selectedRowKeys.value = arr.map((item) => rowKey(item));
      },
      expandedRowKeys,
      setExpandedRowKeys: updateExpand,
      expandAll: () => {
        updateExpand(getExpandKeys(orgList.value));
      },
      add: (param) => {
        var _a2;
        return (_a2 = methods.add) == null ? void 0 : _a2.call(methods, param);
      },
      edit: (param) => {
        var _a2;
        return (_a2 = methods.edit) == null ? void 0 : _a2.call(methods, { ...editParam, ...param });
      },
      delete: () => {
        var _a2;
        return (_a2 = methods.delete) == null ? void 0 : _a2.call(methods, editParam);
      },
      detail: (param) => {
        var _a2;
        return (_a2 = methods.detail) == null ? void 0 : _a2.call(methods, { ...editParam, ...param });
      }
    };
    const exposed = reactive({ ...actions });
    const tableRef = ref();
    watch(
      tableRef,
      (table) => {
        Object.assign(exposed, table, actions);
        ctx.emit("register", exposed);
      },
      { flush: "sync" }
    );
    const editParam = reactive({
      ...effectData,
      selectedRows,
      selectedRowKeys,
      tableRef: exposed
    });
    const slots = { ...ctx.slots };
    const buttonsConfig = option.buttons;
    const slotName = (buttonsConfig == null ? void 0 : buttonsConfig.targetSlot) ?? (buttonsConfig == null ? void 0 : buttonsConfig.forSlot) ?? "extra";
    if (buttonsConfig) {
      const orgSlot = slots[slotName];
      const buttonsSlot = createButtons({
        config: buttonsConfig,
        effectData: editParam,
        methods: buttonMethods,
        isView
      });
      if (orgSlot || buttonsSlot) {
        slots[slotName] = () => [orgSlot == null ? void 0 : orgSlot(), buttonsSlot == null ? void 0 : buttonsSlot()];
      }
    }
    const titleString = option.title || option.label;
    const {
      title: titleSlot = titleString,
      extra: extraSlot,
      ...__slots
    } = slots;
    const titleBar = (titleSlot || extraSlot) && (() => renderUILayout(
      "row",
      { align: "middle", class: "sup-titlebar" },
      {
        default: () => [
          titleSlot && renderUILayout(
            "col",
            { class: "sup-title" },
            {
              default: createLabelNode(
                { labelSlot: titleSlot, tooltip: option.tooltip },
                effectData
              )
            }
          ),
          extraSlot && renderUILayout(
            "col",
            {
              class: "sup-title-buttons",
              flex: 1,
              style: { textAlign: (buttonsConfig == null ? void 0 : buttonsConfig.align) || "right" }
            },
            { default: extraSlot }
          )
        ]
      }
    ));
    __slots.headerCell = (col) => {
      var _a2;
      return ((_a2 = slots.headerCell) == null ? void 0 : _a2.call(slots, col)) || toNode(col.title, effectData);
    };
    const render2 = () => {
      const {
        rowSelection: _rowSelection,
        expandedRowKeys: _expandedRowKeys,
        ...tableAttrs
      } = attrs;
      return [
        ...modalSlot.map((slot) => slot()),
        renderUITable(
          {
            ...globalProps.Table,
            ref: tableRef,
            data: list.value,
            columns: reactive(columns),
            tableLayout: "fixed",
            pagination: false,
            ...tableAttrs,
            selection: rowSelection && {
              ...rowSelection,
              selectedKeys: selectedRowKeys.value
            },
            rowKey,
            expandedKeys: expandedRowKeys.value,
            onExpandedChange: updateExpand,
            class: [
              "sup-table-wrapper",
              option.editable && "sup-table-editable"
            ]
          },
          __slots
        )
      ];
    };
    if (option.tabs) {
      return () => h(_sfc_main$6, { ...option.tabs, effectData }, {
        [slotName]: slots[slotName],
        title: titleSlot && (() => toNode(titleSlot, effectData)),
        extra: extraSlot,
        titleBar,
        default: render2
      });
    } else {
      return () => [titleBar == null ? void 0 : titleBar(), render2()];
    }
  }
});
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  name: "ExCollapse",
  inheritAttrs: false,
  props: {
    option: {
      type: Object,
      required: true
    },
    model: {
      type: Object,
      required: true
    },
    effectData: {
      type: Object,
      required: true
    },
    isView: Boolean
  },
  setup(props, {
    attrs: rootAttrs
  }) {
    var _a;
    const title = props.option.title || props.option.label;
    const panels = [...props.model.children].map(([option, model], idx) => {
      const effectData = getEffectData({
        parent: props.effectData,
        current: toRef(props.model, "parent"),
        field: model.refName,
        value: model.refData
      });
      const {
        hidden,
        attrs: {
          disabled,
          ...attrs
        }
      } = render({
        option,
        effectData
      });
      const {
        key,
        field
      } = option;
      return {
        attrs: reactive(attrs),
        option: {
          ...option,
          type: "CollapsePanel"
        },
        effectData,
        model,
        header: () => toNode(option.label),
        key: key || field || String(idx),
        hidden,
        disabled
      };
    });
    const activeKey = ref(props.option.activeKey || ((_a = panels[0]) == null ? void 0 : _a.key));
    return () => [title && h("div", {
      class: ["sup-titlebar", "sup-title"]
    }, toNode(title, props.effectData)), renderUIContainer("collapse", {
      ...rootAttrs,
      value: activeKey.value,
      "onUpdate:value": (value) => activeKey.value = value
    }, {
      default: () => panels.map(({
        attrs,
        hidden,
        option,
        disabled,
        model,
        header,
        effectData,
        key
      }) => !hidden.value && renderUIContainer("collapsePanel", {
        ...attrs,
        key,
        disabled: unref(disabled)
      }, {
        header,
        extra: () => !props.isView && option.buttons ? h(_sfc_main$h, {
          option: option.buttons,
          effectData
        }) : void 0,
        default: () => props.isView ? h(DetailLayouts, {
          option,
          modelsMap: model.children,
          effectData
        }) : h(Collections, {
          option,
          model,
          effectData
        })
      }))
    })];
  }
});
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "Preview",
  props: {
    images: {},
    visible: { type: Boolean },
    current: {},
    width: {},
    height: {}
  },
  emits: ["update:value"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    const props = __props;
    const setVisible = (boo) => {
      emit("update:value", boo);
    };
    const RenderPreview = () => renderUIPreview({
      images: props.images,
      visible: props.visible,
      current: props.current,
      width: props.width,
      height: props.height,
      "onUpdate:visible": setVisible
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(RenderPreview);
    };
  }
});
function usePreview(config) {
  const visible = ref(false);
  const __config = reactive({
    visible,
    images: [],
    "onUpdate:value": (val) => visible.value = val,
    ...config
  });
  const isUnmounted = ref(false);
  const slot = () => !isUnmounted.value && h(_sfc_main$3, __config);
  const ins = getCurrentInstance();
  onUnmounted(() => {
    isUnmounted.value = true;
  });
  let vm;
  const open = (option) => {
    if (typeof option === "string") {
      __config.images = [option];
    } else if (Array.isArray(option)) {
      __config.images = [...option];
    } else {
      const { src, ...other } = option || {};
      if (src)
        __config.images = [src];
      Object.assign(__config, other);
    }
    if (!vm) {
      const wrap = document.createElement("div");
      vm = createVNode(slot, { appContext: ins == null ? void 0 : ins.appContext });
      vm.appContext = ins == null ? void 0 : ins.appContext;
      render$1(vm, wrap);
    }
    nextTick(() => visible.value = true);
  };
  return { open };
}
function getBase64WithFile(file, mode) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    if (mode === "text") {
      reader.readAsText(file);
    } else {
      reader.readAsDataURL(file);
    }
    reader.onload = () => resolve({ result: reader.result, file });
    reader.onerror = (error) => reject(error);
  });
}
function downloadByData(data, filename, bom) {
  const blobData = typeof bom !== "undefined" ? [bom, data] : [data];
  const blob = new Blob(blobData, { type: "application/octet-stream" });
  const blobURL = window.URL.createObjectURL(blob);
  const tempLink = document.createElement("a");
  tempLink.style.display = "none";
  tempLink.href = blobURL;
  tempLink.setAttribute("download", filename);
  if (typeof tempLink.download === "undefined") {
    tempLink.setAttribute("target", "_blank");
  }
  document.body.appendChild(tempLink);
  tempLink.click();
  document.body.removeChild(tempLink);
  window.URL.revokeObjectURL(blobURL);
}
function accepts(file, accept) {
  return accept.split(",").some((rule) => {
    var _a;
    return ((_a = file.name) == null ? void 0 : _a.endsWith(rule)) || file.type && new RegExp(`^${rule.replace("*", "\\S*")}$`).test(file.type);
  });
}
function createUploadController(options) {
  const { mode, valueKey, infoNames, maxCount, accept, minSize, maxSize, repeatable } = options;
  const names = {
    ...valueKey && { [valueKey]: valueKey },
    uid: "uid",
    status: "status",
    url: "url",
    name: "name",
    ...infoNames
  };
  if (mode === "custom")
    names.originFileObj = "originFileObj";
  const uploadTasks = /* @__PURE__ */ new Map();
  const waitingTasks = /* @__PURE__ */ new Map();
  const removeTasks = /* @__PURE__ */ new Map();
  const convertInfo = (info) => {
    const result = { status: "done", ...info };
    Object.entries(names).forEach(([key, name]) => {
      if (name && name !== key && name in result) {
        result[key] = result[name];
        delete result[name];
      }
    });
    return result;
  };
  const reconvert = (info) => {
    const result = {};
    Object.entries(names).forEach(([key, name]) => {
      const value = info[key];
      if (name && value !== void 0)
        result[name] = value;
    });
    return result;
  };
  const getValue = (list, isSingle) => {
    if (isSingle) {
      const first = list[0];
      return !valueKey ? first : (first == null ? void 0 : first[valueKey]) ?? (first == null ? void 0 : first[names.uid]);
    }
    return valueKey ? list.map((item) => item[valueKey] ?? item[names.uid]) : list;
  };
  const validate = (file, selectedFiles, currentFiles) => {
    if (maxCount > 1 && currentFiles.length + selectedFiles.indexOf(file) >= maxCount) {
      return `文件数量最多${maxCount}`;
    }
    if (accept && !accepts(file, accept))
      return "请选择正确的文件类型！";
    if (minSize || maxSize) {
      const size = (file.size || 0) / 1024 / 1024;
      if (minSize && minSize > size)
        return `文件最小需要${minSize}M`;
      if (maxSize && maxSize < size)
        return `文件最大不超过${maxSize}M`;
    }
    if (!repeatable) {
      const repeated = currentFiles.find((item) => item.name === file.name);
      if (repeated)
        return `文件重复: ${repeated.name}`;
    }
  };
  const clearTask = (uid) => {
    uploadTasks.delete(uid);
    waitingTasks.delete(uid);
  };
  const registerRequest = (uid, request) => {
    if (mode === "auto") {
      const task = request();
      uploadTasks.set(uid, task);
      return task;
    }
    if (mode === "submit")
      waitingTasks.set(uid, request);
  };
  const queueDelete = (file, handler) => removeTasks.set(file, handler);
  const submit = async (files) => {
    let uploads = Promise.resolve();
    if (mode === "auto") {
      const failed = files.find((file) => file.status === "error");
      if (failed)
        throw failed.response || { message: "文件上传错误，请删除后重新上传！" };
      uploads = Promise.all(uploadTasks.values());
    } else if (mode === "submit") {
      const tasks = files.filter((file) => file.status !== "done").map((file) => {
        var _a;
        file.status = "uploading";
        return (_a = waitingTasks.get(file.uid)) == null ? void 0 : _a();
      }).filter(Boolean);
      uploads = Promise.all(tasks);
    }
    const data = await uploads;
    await Promise.all([...removeTasks.values()].map((handler) => handler())).catch((error) => console.error(error));
    return data;
  };
  const hasPendingWork = (files) => {
    return removeTasks.size > 0 || mode === "auto" && files.some((file) => file.status === "uploading") || mode === "submit" && files.some((file) => file.status !== "done");
  };
  return {
    clearTask,
    convertInfo,
    getValue,
    hasPendingWork,
    queueDelete,
    reconvert,
    registerRequest,
    submit,
    validate
  };
}
const imgs = ".png,.jpg,.jpeg,.gif,.webp,.svg,.tif,.tiff";
function fileIsImage(file) {
  var _a, _b, _c, _d;
  if (file.thumbUrl)
    return true;
  if (file.url || file.originFileObj) {
    const exName = (_b = (_a = file.name || file.url) == null ? void 0 : _a.match(/[^\\.]*$/)) == null ? void 0 : _b[0];
    if (exName && imgs.includes(exName)) {
      return true;
    } else {
      const type = file.type || ((_d = (_c = file.url) == null ? void 0 : _c.match(/^data:(\S*?);/)) == null ? void 0 : _d[1]);
      return type == null ? void 0 : type.startsWith("image");
    }
  }
}
function createLoadModal(title, onOk) {
  const modal = openUIInfo({
    title: () => title,
    okButtonProps: {
      loading: true
    },
    closable: false,
    centered: true,
    maskClosable: false,
    keyboard: false,
    onOk
  });
  const setError = (title2, err) => {
    modal.update({
      icon: () => renderUISemanticIcon("error"),
      okButtonProps: {
        loading: false
      },
      type: "error",
      title: title2,
      content: err == null ? void 0 : err.message
    });
  };
  return { setError, ...modal };
}
const _sfc_main$2 = defineComponent({
  props: {
    option: { type: Object, required: true },
    model: Object,
    effectData: { type: Object, required: true },
    value: null,
    fileList: Array,
    /** 指定文件信息字段 */
    infoNames: Object,
    /** 指定文件信息中一个属性存为绑定值 */
    valueKey: String,
    //TODO apis 可从全局配置， 当前配置为字符串时，作为url参数传到全局api方法
    customRequest: Function,
    minSize: Number,
    maxSize: Number,
    isSingle: Boolean,
    maxCount: Number,
    uploadMode: String,
    tip: String,
    title: [String, Function],
    /** 超出最大数量隐藏上传 */
    hideOnMax: Boolean,
    repeatable: Boolean,
    isView: Boolean,
    disabled: Boolean,
    isImageUrl: Function,
    beforeUpload: Function,
    showUploadList: { type: [Object, Boolean], default: void 0 },
    onPreview: Function,
    onRemove: Function,
    onDownload: Function,
    onChange: Function,
    apis: Object
  },
  emits: ["update:value", "update:fileList"],
  setup(props, ctx) {
    const {
      uploadMode: mode = "auto",
      apis = {},
      isSingle,
      minSize,
      maxSize,
      infoNames,
      repeatable,
      showUploadList,
      onPreview,
      onDownload,
      isImageUrl = fileIsImage,
      hideOnMax,
      valueKey
    } = props;
    const maxCount = (isSingle ? 1 : props.maxCount) || Infinity;
    const { accept, listType } = ctx.attrs;
    const controller = createUploadController({
      mode,
      valueKey,
      infoNames,
      maxCount,
      accept,
      minSize,
      maxSize,
      repeatable
    });
    const preview = usePreview();
    const { convertInfo, reconvert } = controller;
    const { onSubmit } = inject("exaProvider", {});
    const innerFileList = ref([]);
    const outFileList = shallowRef([]);
    const outValues = shallowRef();
    const updateFileList = (list) => {
      outFileList.value = list.map(reconvert);
      if (!props.isView) {
        ctx.emit("update:fileList", outFileList.value);
        updateValue();
      }
      innerFileList.value = list;
    };
    const updateValue = () => {
      outValues.value = controller.getValue(toRaw(outFileList.value), Boolean(props.isSingle));
      ctx.emit("update:value", outValues.value);
    };
    watch(
      () => toRaw(props.value),
      (value) => {
        if (value !== outValues.value) {
          outValues.value = value;
          if (!value) {
            innerFileList.value = [];
          } else {
            const values = isArray(value) ? value : [value];
            outFileList.value = valueKey ? values.map((val) => ({ [valueKey]: val })) : values;
            innerFileList.value = outFileList.value.map(convertInfo);
          }
        }
      },
      { immediate: true, flush: "sync" }
    );
    watch(
      () => toRaw(props.fileList),
      (list) => {
        if (list && list !== outFileList.value) {
          const fileList = list.map(convertInfo);
          updateFileList(fileList);
        }
      },
      { immediate: true }
    );
    const isLoading = ref(false);
    onSubmit == null ? void 0 : onSubmit(() => {
      isLoading.value = controller.hasPendingWork(innerFileList.value);
      if (isLoading.value) {
        const modal = createLoadModal(" 文件同步中，请稍候...");
        return controller.submit(innerFileList.value).then((data) => {
          modal.destroy();
          return data;
        }).catch((err) => {
          isLoading.value = false;
          modal.setError("文件上传失败", err);
          return false;
        }).finally(() => isLoading.value = false);
      }
      return controller.submit(innerFileList.value);
    });
    const beforeUpload = (file, resFileList) => {
      if (props.beforeUpload) {
        const res = props.beforeUpload(file, resFileList);
        if (res !== void 0)
          return res;
      }
      const errMessage = controller.validate(file, resFileList, innerFileList.value);
      if (errMessage) {
        showUIMessage("error", errMessage);
        return getUIUploadListIgnore();
      }
      if (mode === "custom") {
        if (showUploadList !== false) {
          return false;
        }
      } else if (maxCount === 1 && innerFileList.value.length) {
        const info = innerFileList.value[0];
        controller.clearTask(info.uid);
        if (info.status === "done" && apis.delete) {
          const __file = { ...outFileList.value[0] };
          controller.queueDelete(__file, () => apis.delete(__file));
        }
      }
    };
    function handleChange({ file, fileList, event }) {
      var _a;
      if (file.status === "removed") {
        controller.clearTask(file.uid);
      } else if (file.status === "uploading") {
        if (!event && mode !== "auto") {
          file.status = "waiting";
        }
      }
      (_a = props.onChange) == null ? void 0 : _a.call(props, { file, fileList, event });
      updateFileList([...fileList]);
    }
    const customRequest = (args) => {
      const { file } = args;
      if (mode === "auto") {
        return controller.registerRequest(file.uid, () => upload(args));
      } else if (mode === "submit") {
        controller.registerRequest(file.uid, () => upload(args));
      } else if (mode === "base64" || mode === "text") {
        return getBase64WithFile(file, mode).then(({ result }) => successHandler({ url: result }, file));
      }
    };
    const errorHandler = (error, file) => {
      const changeItem = innerFileList.value.find((item) => item.uid === file.uid);
      Object.assign(changeItem, { error, status: "error" });
      updateFileList([...innerFileList.value]);
      return Promise.reject(error);
    };
    const successHandler = (data, file) => {
      const changeItem = innerFileList.value.find((item) => item.uid === file.uid);
      Object.assign(changeItem, convertInfo(data), { status: "done" });
      updateFileList([...innerFileList.value]);
      return data;
    };
    const upload = (args) => {
      const { file, filename, onProgress, onError, onSuccess } = args;
      if (!apis.upload) {
        return Promise.resolve().then(() => errorHandler(Error("Api config error"), file));
      }
      const formData = new FormData();
      formData.append(filename, file);
      const onUploadProgress = (e) => {
        if (e.total > 0) {
          e.percent = e.loaded / e.total * 100;
        }
        onProgress(e);
      };
      return apis.upload(formData, { onUploadProgress }).then(
        (res) => successHandler(res, file),
        (err) => errorHandler(err, file)
      );
    };
    const remove = async (file) => {
      var _a;
      let result = await ((_a = props.onRemove) == null ? void 0 : _a.call(props, file));
      if (result !== false && apis.delete && file.status === "done") {
        return new Promise((resolve) => {
          const modal = openUIConfirm({
            title: "确定删除吗？",
            okText: "确定",
            cancelText: "取消",
            closable: false,
            maskClosable: false,
            ...globalProps.Modal,
            onOk() {
              const __file = reconvert(file);
              const handler = () => apis.delete(__file);
              if (mode === "submit") {
                controller.queueDelete(
                  __file,
                  () => handler()
                  // .then(
                  //   () => removeFileMap.delete(__file)
                  //   // () => updateFileList([...innerFileList.value, __file]) // 删除失败后还原文件
                  // )
                );
                resolve(true);
              } else {
                modal.update({
                  okCancel: false,
                  title: "文件删除中……"
                });
                return handler().then(resolve, () => {
                  modal.update({
                    okCancel: false,
                    title: "文件删除失败",
                    type: "error",
                    onOk: void 0
                  });
                  resolve(false);
                  return Promise.reject();
                });
              }
            },
            onCancel() {
              resolve(false);
            }
          });
        });
      }
      return result;
    };
    const downloading = ref(false);
    const fileDownload = onDownload || ((file) => {
      if (apis.download && !downloading.value) {
        const downModal = createLoadModal("文件下载中，请稍候...");
        apis.download(reconvert(file)).then((result) => downloadByData(result, file.name)).then(() => downModal.destroy()).catch((err) => {
          downModal.setError("文件下载失败", err);
        }).finally(() => isLoading.value = false);
      }
    });
    const listConfig = computed(
      () => typeof showUploadList === "boolean" ? showUploadList : {
        showRemoveIcon: !props.isView && !props.disabled,
        showDownloadIcon: props.isView,
        ...showUploadList
      }
    );
    const filePreview = async (file) => {
      if (onPreview) {
        const src = await onPreview(reconvert(file));
        src && preview.open(src);
      } else if (isImageUrl(file)) {
        let current;
        const images = innerFileList.value.filter((item) => isImageUrl(item)).map((item, idx) => {
          if (item === file)
            current = idx;
          const url = item.url || item.thumbUrl;
          if (!url && item.originFileObj) {
            item.objectUrl = window.URL.createObjectURL(item.originFileObj);
          }
          return url || item.objectUrl;
        });
        preview.open({ images, current });
      }
    };
    const iconRender = ({ file, listType: listType2 }) => {
      if (file.status === "waiting") {
        return renderUISemanticIcon("sync");
      } else if (file.status === "uploading") {
        return renderUISemanticIcon("loading");
      } else {
        return renderUISemanticIcon("attachment");
      }
    };
    const __title = props.title;
    const title = typeof props.title === "string" ? props.title : "上传文件";
    const effectData = reactive({ ...toRaw(props.effectData), fileList: innerFileList });
    const titleSlot = isFunction(__title) && (() => __title(effectData));
    const tips = [];
    accept && tips.push("支持文件格式：" + accept);
    maxSize && tips.push("单个文件不超过" + maxSize + "MB");
    const tip = props.tip ?? tips.join(", ");
    const slots = { ...ctx.slots };
    if (listType === "picture-card") {
      slots.default = () => {
        var _a, _b;
        return ((_b = (_a = ctx.slots).default) == null ? void 0 : _b.call(_a, effectData)) || h("div", [
          renderUISemanticIcon("add"),
          titleSlot ? titleSlot() : h("div", { style: "margin-top:8px" }, title)
        ]);
      };
    } else {
      slots.default = () => {
        var _a, _b;
        return [
          ((_b = (_a = ctx.slots).default) == null ? void 0 : _b.call(_a, effectData)) || renderUIUploadTrigger(
            {},
            { default: () => [renderUISemanticIcon("upload"), titleSlot ? titleSlot() : title] }
          ),
          tip && h("div", { class: "sup-upload-tip" }, tip)
        ];
      };
    }
    const isView = computed(() => props.disabled || props.isView);
    const hideBody = computed(() => hideOnMax && maxCount && innerFileList.value.length >= maxCount);
    return () => isView.value && innerFileList.value.length === 0 ? h("div", { class: "sup-upload-tip" }, "暂无附件") : renderUIUpload(
      {
        class: { "upload-disabled": isView.value },
        customRequest,
        beforeUpload,
        fileList: innerFileList.value,
        onChange: handleChange,
        onPreview: filePreview,
        onRemove: remove,
        showUploadList: listConfig.value,
        maxCount,
        isImageUrl,
        iconRender,
        onDownload: fileDownload
      },
      {
        ...slots,
        default: () => isView.value || (hideBody.value ? null : slots.default())
      }
    );
  }
});
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  ...{
    inheritAttrs: false
  },
  __name: "TagInput",
  props: {
    option: {},
    model: {},
    effectData: {},
    value: {},
    stringifyValue: { type: Boolean },
    newLabel: { default: "添加" },
    isView: { type: Boolean },
    closable: { type: Boolean, default: true }
  },
  emits: ["update:value"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const inputRef = ref();
    const inputValue = ref("");
    const inputVisible = ref(false);
    const Input = computed(() => requireUIComponent("Input"));
    const inputProps = computed(
      () => mapUIFieldProps(
        "Input",
        {
          value: inputValue.value,
          "onUpdate:value": (value) => inputValue.value = value
        },
        { option: props.option, effectData: props.effectData }
      )
    );
    const getClosable = (tag, index) => {
      if (typeof props.closable === "function") {
        return props.closable(tag, index);
      }
      return props.closable;
    };
    const tags = computed(() => {
      if (!props.value) {
        return [];
      } else if (typeof props.value === "string") {
        return props.value.split(",");
      } else {
        return props.value;
      }
    });
    const showInput = () => {
      inputVisible.value = true;
      nextTick(() => {
        inputRef.value.focus();
      });
    };
    const handleClose = (removedTag) => {
      const _tags = tags.value.filter((tag) => tag !== removedTag);
      updateValue(_tags);
    };
    const renderTag = (tag, index) => {
      const node = renderUIPresentation(
        "tag",
        {
          removable: getClosable(tag, index),
          onRemove: () => handleClose(tag)
        },
        { default: () => tag.length > 20 ? `${tag.slice(0, 20)}...` : tag }
      );
      return tag.length > 20 ? renderUIAction("tooltip", { title: tag }, { default: () => node }) : node;
    };
    const renderAddTag = () => renderUIPresentation(
      "tag",
      { class: "sup-tag-add", onClick: showInput },
      { default: () => [getSemanticIconNode("add"), toNode(props.newLabel, props.effectData)] }
    );
    const updateValue = (val) => {
      if (props.stringifyValue) {
        emit("update:value", val.join(","));
      } else {
        emit("update:value", val);
      }
    };
    const handleInputConfirm = () => {
      if (inputValue.value && tags.value.indexOf(inputValue.value) === -1) {
        updateValue([...tags.value, inputValue.value]);
      }
      inputVisible.value = false;
      inputValue.value = "";
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(Fragment, null, [
        (openBlock(true), createElementBlock(Fragment, null, renderList(tags.value, (tag, index) => {
          return openBlock(), createBlock(resolveDynamicComponent(() => renderTag(tag, index)), { key: tag });
        }), 128)),
        inputVisible.value ? (openBlock(), createBlock(resolveDynamicComponent(Input.value), mergeProps({
          key: 0,
          ref_key: "inputRef",
          ref: inputRef
        }, inputProps.value, {
          class: "sup-tag-input",
          onBlur: handleInputConfirm
        }), null, 16)) : (openBlock(), createBlock(resolveDynamicComponent(renderAddTag), { key: 1 }))
      ], 64);
    };
  }
});
const _hoisted_1 = {
  key: 1,
  class: "sup-tag-select-empty"
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  ...{
    inheritAttrs: false
  },
  __name: "TagSelect",
  props: {
    option: {},
    model: {},
    effectData: {},
    value: {},
    options: {},
    stringifyValue: { type: Boolean },
    multiple: { type: Boolean },
    isView: { type: Boolean },
    placeholder: {}
  },
  emits: ["update:value", "change", "check"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const { optionsRef } = useOptions(props.option, props.options, props.effectData);
    const selected = computed(() => {
      const { value } = props;
      const stringifyValue = props.stringifyValue;
      if (value === void 0) {
        return [];
      } else if (stringifyValue) {
        return value.split(",");
      } else if (Array.isArray(value)) {
        return value;
      } else {
        return [value];
      }
    });
    const handleChange = (tag, checked) => {
      const nextSelected = props.multiple ? checked ? [...selected.value, tag] : selected.value.filter((_tag) => _tag !== tag) : [tag];
      emit("check", tag, checked);
      updateValue(nextSelected);
      emit("change", tag, nextSelected);
    };
    const renderOption = (label, value) => renderUIPresentation(
      "checkableTag",
      {
        class: "tag-select",
        selected: selected.value.includes(value),
        onSelectedChange: (checked) => handleChange(value, checked)
      },
      { default: () => label }
    );
    const updateValue = (val) => {
      if (!props.multiple) {
        emit("update:value", val[0]);
      } else if (props.stringifyValue) {
        emit("update:value", val.join(","));
      } else {
        emit("update:value", val);
      }
    };
    return (_ctx, _cache) => {
      return unref(optionsRef).length ? (openBlock(true), createElementBlock(Fragment, { key: 0 }, renderList(unref(optionsRef), ({ label, value }) => {
        return openBlock(), createBlock(resolveDynamicComponent(() => renderOption(label, value)), { key: value });
      }), 128)) : (openBlock(), createElementBlock("div", _hoisted_1, toDisplayString(__props.placeholder), 1));
    };
  }
});
const containerComponents = {
  Form: _sfc_main$e,
  Group: _sfc_main$f,
  Card: _sfc_main$b,
  List: _sfc_main$a,
  ListGroup: _sfc_main$9,
  Tabs: _sfc_main$8,
  Table: _sfc_main$5,
  Collapse: _sfc_main$4,
  Descriptions: _sfc_main$f,
  Fragment: _sfc_main$f
};
const coreFields = {
  InputGroup: _sfc_main$d,
  InputList: _sfc_main$c,
  Upload: _sfc_main$2,
  TagInput: _sfc_main$1,
  TagSelect: _sfc_main
};
const containers = Object.keys(containerComponents);
const controls = {
  ...containerComponents,
  ...coreFields
};
const customDefinitions = {};
const autoDefinitions = {};
const adapterFieldTypes = /* @__PURE__ */ new Set();
function normalizeComponent(component) {
  if (typeof component === "object" && component && "component" in component)
    return component;
  return { component };
}
function registerComponents$1(definitions, components, source, additionalReservedTypes = []) {
  const reservedTypes = /* @__PURE__ */ new Set([
    ...reservedSchemaTypes,
    ...additionalReservedTypes
  ]);
  Object.entries(components).forEach(([name, config]) => {
    if (!config)
      return;
    if (reservedTypes.has(name)) {
      throw new Error(
        `Schema 类型 '${name}' 为 Core 保留类型，不能注册为 ${source} 组件`
      );
    }
    definitions[name] = { ...normalizeComponent(config), source };
  });
}
function registerCustomComponents(components, adapterEnhancedTypes = []) {
  registerComponents$1(customDefinitions, components, "custom", [
    ...adapterFieldTypes,
    ...adapterEnhancedTypes
  ]);
}
function registerAdapterFieldTypes(types) {
  const nextTypes = new Set(types);
  for (const name of Object.keys(customDefinitions)) {
    if (nextTypes.has(name))
      throw new Error(
        `Schema 类型 '${name}' 已注册为项目组件，不能再由 UIAdapter 接管`
      );
  }
  adapterFieldTypes.clear();
  nextTypes.forEach((name) => adapterFieldTypes.add(name));
}
function registerAutoImportedComponents(components, adapterFields = []) {
  const uiComponents = Object.fromEntries(
    Object.entries(components).map(([name, config]) => [
      name,
      config && normalizeComponent(config).component
    ])
  );
  registerUIComponents(uiComponents, "auto");
  const adapterFieldNames = new Set(adapterFields);
  const projectComponents = Object.fromEntries(
    Object.entries(components).filter(
      ([name]) => !reservedSchemaTypes.has(name) && !adapterFieldNames.has(name)
    )
  );
  registerComponents$1(autoDefinitions, projectComponents, "auto");
}
function getFormComponent(type) {
  return customDefinitions[type] || autoDefinitions[type];
}
function hasFormComponent(type) {
  return !!getFormComponent(type);
}
function getRegisteredFormComponentTypes() {
  return [
    .../* @__PURE__ */ new Set([
      ...Object.keys(customDefinitions),
      ...Object.keys(autoDefinitions)
    ])
  ];
}
function mapFormComponentModel(definition, props) {
  const { prop = "value", event = "update:value" } = definition.model || {};
  const mapped = { ...props };
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
const Controls = controls;
const globalProps = {};
let adapterApplied = false;
let configuredAdapter;
function applyAdapter(adapter) {
  if (configuredAdapter) {
    initializeUIAdapter(adapter);
    return;
  }
  registerAdapterFieldTypes(Object.keys(adapter.fields || {}));
  initializeUIAdapter(adapter);
  configuredAdapter = adapter;
  if (!adapterApplied) {
    merge$1(globalProps, adapter.defaults || {});
    adapterApplied = true;
  }
}
function useAdapter(adapter) {
  applyAdapter(adapter);
  return adapter;
}
function configure(config = {}) {
  const { defaultProps, ...runtimeConfig } = config;
  Object.assign(globalConfig, runtimeConfig);
  if (defaultProps)
    setDefaultProps(defaultProps);
}
function registerComponent(name, component) {
  registerCustomComponents({ [name]: component });
}
function registerComponents(components) {
  registerCustomComponents(components);
}
function setDefaultProps(props) {
  merge$1(globalProps, props);
}
const superform = {
  useAdapter,
  configure,
  registerComponent,
  registerComponents,
  setDefaultProps
};
export {
  registerUIComponents as A,
  toNode as B,
  Controls as C,
  DataProvider as D,
  _sfc_main$h as _,
  getSemanticIconNode as a,
  getEffectData as b,
  getUITableSelectors as c,
  buildModelsMap as d,
  renderUIForm as e,
  reportSchemaDiagnostics as f,
  globalConfig as g,
  globalProps as h,
  useGetRef as i,
  DetailLayouts as j,
  diagnoseSchema as k,
  defineUIAdapter as l,
  merge as m,
  registerAutoImportedComponents as n,
  configure as o,
  registerComponent as p,
  registerComponents as q,
  render as r,
  superform as s,
  useAdapter as t,
  useInnerSlots as u,
  _sfc_main$7 as v,
  useForm as w,
  createModal as x,
  useModal as y,
  useModalForm as z
};
