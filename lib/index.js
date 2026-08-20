import "./style.css";
import { get, set, merge as merge$1, isNumber, update, cloneDeep, isPlainObject, defaults, uniq, isFunction, mergeWith, isArray, isString, isObject as isObject$1, throttle, omit, debounce, mapKeys, camelCase } from "lodash-es";
import { h, inject, reactive, ref, isRef, watchEffect, computed, toValue, toRef, watch, unref, toRefs, mergeProps, markRaw, defineComponent, openBlock, createBlock, withModifiers, withCtx, createElementBlock, Fragment, renderList, createVNode, createSlots, resolveDynamicComponent, normalizeProps, guardReactiveProps, createCommentVNode, provide, toRaw, readonly, shallowRef, nextTick, useAttrs, onMounted, shallowReactive, getCurrentInstance, onUnmounted, render as render$1, watchPostEffect, renderSlot, createTextVNode, toDisplayString, Teleport, useSlots } from "vue";
import { Tag, Tooltip, Modal, Space, Dropdown, Menu, MenuItem, Button, Divider, AutoComplete, Card, CheckableTag, Checkbox, CheckboxGroup, Col, Collapse, CollapsePanel, DatePicker, Descriptions as Descriptions$1, DescriptionsItem, Form, FormItem, Input, InputGroup, InputNumber, InputSearch, List, ListItem, Radio, RadioButton, RadioGroup, RangePicker, Row, Select, Switch, TabPane, Table, Tabs, Textarea, TimePicker, TimeRangePicker, TreeSelect, Upload, message, FormItemRest, ConfigProvider, Image } from "ant-design-vue";
import { InfoCircleOutlined, DownOutlined, EllipsisOutlined, PlusOutlined, MinusOutlined, SyncOutlined, LoadingOutlined, PaperClipOutlined, UploadOutlined, CloseCircleOutlined, UpOutlined } from "@ant-design/icons-vue";
import { nanoid } from "nanoid";
const containers = [
  "Form",
  "Group",
  "Card",
  "List",
  "ListGroup",
  "Tabs",
  "Table",
  "Collapse",
  "Descriptions",
  "Fragment"
];
const independentTypes = [...containers, "InputGroup", "InputList"];
const formItemTypes = [
  "Textarea",
  "Input",
  "InputNumber",
  "InputGroup",
  "InputList",
  "AutoComplete",
  "Select",
  "Switch",
  "DateRange",
  "TimeRange",
  "DatePicker",
  "TimePicker",
  "Radio",
  "Checkbox",
  "TreeSelect",
  "Upload",
  "TagInput",
  "TagSelect"
];
function getIconNode(icon) {
  var _a;
  if (typeof icon === "string") {
    return ((_a = globalConfig.customIcon) == null ? void 0 : _a.call(globalConfig, icon)) || h("span", { class: "anticon " + icon });
  } else {
    return icon && h(icon);
  }
}
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
function useVModel({ option, model, effectData }, defaultValue) {
  const {
    type,
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
  if (type.endsWith("Range") && endField) {
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
    watch(refValue, updateValue);
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
  const { trigger, required, type = "string", len, max, min, pattern, validator, message: message2 } = item || {};
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
        message: message2 || `${label}不能为空！`
      });
    } else {
      rules.push({ required, trigger, message: message2 || `${label}不能为空！` });
    }
  }
  const typeRule = ruleTypeMap[type];
  if (typeRule) {
    const message22 = formatStr(typeRule.message, { label });
    rules.push({ ...typeRule, trigger, message: message22 });
  }
  if (pattern) {
    rules.push({ pattern, trigger, message: message2 });
  }
  if (len || isNumber(max) || isNumber(min)) {
    const rule = getRangeRule(type, len, max, min);
    const message22 = formatStr(rule.message, { label, len, max, min });
    rules.push({ ...rule, trigger, message: message22, type });
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
    var _a;
    if (typeof child !== "object")
      return;
    const subModel = buildModelData(child, currentData, propChain);
    const { required, label, subItems, columns } = child;
    if (child.rules || required) {
      const _rules = child.rules || [];
      const _r = Array.isArray(_rules) ? _rules : [_rules];
      if (!_r.length && required) {
        _r.push({ required: true });
      }
      let ruleType = "string";
      if (subModel.refData) {
        const refValue = toValue(subModel.refData);
        const baseType = typeof refValue;
        ruleType = baseType === "object" && Array.isArray(refValue) ? "array" : baseType;
      }
      if (_r[0] && "required" in _r[0]) {
        (_a = _r[0]).type ?? (_a.type = ruleType);
      }
      subModel.rules = _r.map((item) => buildRule(item, label)).flat();
      if (subModel.propChain.length) {
        rules[subModel.propChain.join(".")] = subModel.rules;
      }
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
  return h(
    Tag,
    { color: item.color },
    { default: () => item.label || value, icon: item.icon || (() => getIconNode(item.icon)) }
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
      const {
        attrs: { disabled, ...attrs }
      } = render({ option, effectData: param });
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
        return buildTagRender({ label: text ? "是" : "否", color: text ? "success" : "error" });
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
  } else if (colType === "Textarea") {
    return (param = effectData) => {
      return h("pre", { style: "white-space: break-spaces;" }, param.value ?? toValue(initialValue));
    };
  } else if (!content && (colType === "Upload" || colType.startsWith("Ext"))) {
    return (param = effectData) => {
      const vModels = getVModelProps(option, param.current);
      const slots = useInnerSlots(option.slots, param, rootSlots);
      const {
        attrs: { disabled, ...attrs }
      } = render({ option, effectData: param });
      return h(
        Controls[colType],
        reactive({ option, effectData: param, ...attrs, ...vModels, value: param.value, isView: true, disabled }),
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
    tooltip && h(Tooltip, tipProps, {
      title: () => toNode(tooltip.title, effectData),
      default: () => h(
        "a",
        { class: "ant-typography ant-typography-secondary", style: { marginLeft: "4px" } },
        getIconNode(tooltip.icon || InfoCircleOutlined)
      )
    })
  ];
};
const BUILTIN_TYPES = /* @__PURE__ */ new Set([
  "Input",
  "Textarea",
  "InputNumber",
  "AutoComplete",
  "Select",
  "TreeSelect",
  "DatePicker",
  "DateRange",
  "TimePicker",
  "TimeRange",
  "Switch",
  "Radio",
  "Checkbox",
  "Upload",
  "TagInput",
  "TagSelect",
  "Text",
  "HTML",
  "Hidden",
  "InputSlot",
  "InfoSlot",
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
const INPUT_TYPES = /* @__PURE__ */ new Set(["Input", "InputNumber", "Textarea", "AutoComplete"]);
const SELECT_TYPES = /* @__PURE__ */ new Set(["Select", "TreeSelect"]);
const OPTION_TYPES = /* @__PURE__ */ new Set(["Select", "TreeSelect", "Radio", "Checkbox"]);
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
const issue = (level, code, path, message2) => ({ level, code, path, message: message2 });
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
function diagnoseItem(item, path, diagnostics, kind) {
  var _a, _b, _c;
  if (!isObject(item)) {
    if (typeof item !== "string")
      diagnostics.push(issue("error", "invalid-item", path, "字段配置必须是对象。"));
    return;
  }
  const { type } = item;
  if (type !== void 0 && (typeof type !== "string" || !BUILTIN_TYPES.has(type) && !type.startsWith("Ext"))) {
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
  const defaultValueFormat = ["DatePicker", "DateRange"].includes(type) ? "YYYY-MM-DD" : ["TimePicker", "TimeRange"].includes(type) ? "HH:mm:ss" : void 0;
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
    diagnoseItems(item.subItems, `${path}.subItems`, diagnostics, kind === "table" ? "form" : kind);
  if (item.columns)
    diagnoseItems(item.columns, `${path}.columns`, diagnostics, "table");
}
function diagnoseItems(items, path, diagnostics, kind) {
  if (!Array.isArray(items)) {
    diagnostics.push(issue("error", "invalid-items", path, "必须是数组。"));
    return;
  }
  const fields = /* @__PURE__ */ new Map();
  items.forEach((item, index) => {
    const itemPath = `${path}[${index}]`;
    diagnoseItem(item, itemPath, diagnostics, kind);
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
function diagnoseSchema$1(schema, kind = "auto") {
  var _a, _b, _c, _d, _e, _f, _g;
  const diagnostics = [];
  if (!isObject(schema))
    return [issue("error", "invalid-schema", "schema", "schema 必须是对象。")];
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
      diagnoseItems(schema.columns, "schema.columns", diagnostics, "table");
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
      diagnoseItems(schema.searchForm.subItems, "schema.searchForm.subItems", diagnostics, "form");
    if ((_f = (_e = schema.rowEditor) == null ? void 0 : _e.form) == null ? void 0 : _f.subItems)
      diagnoseItems(schema.rowEditor.form.subItems, "schema.rowEditor.form.subItems", diagnostics, "form");
  } else if (!Array.isArray(schema.subItems)) {
    diagnostics.push(issue("error", "missing-sub-items", "schema.subItems", "表单或详情必须配置 subItems。"));
  } else {
    if (((_g = schema.attrs) == null ? void 0 : _g.labelAlign) === "right")
      diagnostics.push(
        issue("suggestion", "redundant-default", "schema.attrs.labelAlign", "labelAlign: 'right' 是默认值，可以省略。")
      );
    diagnoseItems(schema.subItems, "schema.subItems", diagnostics, resolvedKind);
  }
  return diagnostics;
}
function diagnoseSchema(schema, kind = "auto") {
  return diagnoseSchema$1(schema, kind);
}
function reportSchemaDiagnostics(schema, kind, name) {
  var _a, _b;
  const diagnostics = diagnoseSchema(schema, kind);
  if (!diagnostics.length)
    return diagnostics;
  (_a = console.groupCollapsed) == null ? void 0 : _a.call(console, `[antdv-superform] ${name} schema 诊断：${diagnostics.length} 项`);
  diagnostics.forEach(({ level, path, message: message2 }) => {
    const output = `[antdv-superform] ${path}: ${message2}`;
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
          Modal.confirm({
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
      !(e.domEvent || e).stopPropagation();
      (_a = item.onClick) == null ? void 0 : _a.call(item, { ...param, e });
    };
    const _class = item.color && `ant-btn-${item.color}`;
    const menu = item.dropdown && computed(() => {
      const config2 = toValue(item.dropdown);
      if (isPlainObject(config2)) {
        return Object.entries(config2).map(([value, label]) => ({ value, label }));
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
      attrs: { ...defaultAttrs, class: _class, ...item.attrs, disabled: disabled2 }
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
const _sfc_main$v = /* @__PURE__ */ defineComponent({
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
      return openBlock(), createBlock(unref(Space), mergeProps({
        class: "sup-buttons",
        onClick: _cache[0] || (_cache[0] = withModifiers(() => {
        }, ["stop"])),
        size: unref(isDivider) ? 0 : "small"
      }, unref(attrs)), {
        default: withCtx(() => [
          (openBlock(true), createElementBlock(Fragment, null, renderList(unref(btns), ({ attrs: attrs2, icon, label, tooltipTitle, dropdownProps, menu, render: render2, onClick }, index) => {
            return openBlock(), createElementBlock(Fragment, { key: label }, [
              createVNode(unref(Tooltip), { title: tooltipTitle }, {
                default: withCtx(() => [
                  menu ? (openBlock(), createBlock(unref(Dropdown), mergeProps({
                    key: 0,
                    disabled: attrs2.disabled
                  }, dropdownProps), {
                    overlay: withCtx(() => [
                      createVNode(unref(Menu), { onClick }, {
                        default: withCtx(() => [
                          (openBlock(true), createElementBlock(Fragment, null, renderList(menu, (item) => {
                            return openBlock(), createBlock(unref(MenuItem), {
                              key: item.value,
                              disabled: item.disabled
                            }, createSlots({
                              default: withCtx(() => [
                                (openBlock(), createBlock(resolveDynamicComponent(() => unref(toNode)(item.label, unref(effectData)))))
                              ]),
                              _: 2
                            }, [
                              item.icon ? {
                                name: "icon",
                                fn: withCtx(() => [
                                  (openBlock(), createBlock(resolveDynamicComponent(unref(getIconNode)(item.icon))))
                                ]),
                                key: "0"
                              } : void 0
                            ]), 1032, ["disabled"]);
                          }), 128))
                        ]),
                        _: 2
                      }, 1032, ["onClick"])
                    ]),
                    default: withCtx(() => [
                      createVNode(unref(Button), normalizeProps(guardReactiveProps(attrs2)), {
                        default: withCtx(() => [
                          icon ? (openBlock(), createBlock(resolveDynamicComponent(unref(getIconNode)(icon)), { key: 0 })) : createCommentVNode("", true),
                          (openBlock(), createBlock(resolveDynamicComponent(() => unref(toNode)(label, unref(effectData))))),
                          createVNode(unref(DownOutlined))
                        ]),
                        _: 2
                      }, 1040)
                    ]),
                    _: 2
                  }, 1040, ["disabled"])) : render2 ? (openBlock(), createBlock(resolveDynamicComponent(() => render2({ props: attrs2, ...unref(effectData) })), { key: 1 })) : (openBlock(), createBlock(unref(Button), mergeProps({ key: 2 }, attrs2, { onClick }), {
                    default: withCtx(() => [
                      icon && !labelOnly ? (openBlock(), createBlock(resolveDynamicComponent(unref(getIconNode)(icon)), { key: 0 })) : createCommentVNode("", true),
                      !icon || !iconOnly ? (openBlock(), createBlock(resolveDynamicComponent(() => unref(toNode)(label, unref(effectData))), { key: 1 })) : createCommentVNode("", true)
                    ]),
                    _: 2
                  }, 1040, ["onClick"]))
                ]),
                _: 2
              }, 1032, ["title"]),
              unref(isDivider) && index < unref(btns).length - 1 ? (openBlock(), createBlock(unref(Divider), {
                key: 0,
                type: "vertical",
                class: "buttons-divider"
              })) : createCommentVNode("", true)
            ], 64);
          }), 128)),
          unref(moreBtns).length ? (openBlock(), createBlock(unref(Dropdown), { key: 0 }, {
            overlay: withCtx(() => [
              createVNode(unref(Menu), null, {
                default: withCtx(() => [
                  (openBlock(true), createElementBlock(Fragment, null, renderList(unref(moreBtns), ({ attrs: attrs2, icon, label, tooltipTitle, onClick }) => {
                    return openBlock(), createBlock(unref(MenuItem), {
                      key: label,
                      disabled: attrs2.disabled
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(Tooltip), { title: tooltipTitle }, {
                          default: withCtx(() => [
                            createVNode(unref(Button), mergeProps({ block: "" }, attrs2, {
                              shape: "",
                              onClick
                            }), {
                              default: withCtx(() => [
                                icon ? (openBlock(), createBlock(resolveDynamicComponent(unref(getIconNode)(icon)), { key: 0 })) : createCommentVNode("", true),
                                (openBlock(), createBlock(resolveDynamicComponent(() => unref(toNode)(label, unref(effectData)))))
                              ]),
                              _: 2
                            }, 1040, ["onClick"])
                          ]),
                          _: 2
                        }, 1032, ["title"])
                      ]),
                      _: 2
                    }, 1032, ["disabled"]);
                  }), 128))
                ]),
                _: 1
              })
            ]),
            default: withCtx(() => [
              createVNode(unref(Button), normalizeProps(guardReactiveProps(unref(defaultAttrs))), {
                default: withCtx(() => [
                  unref(moreLabel) ? (openBlock(), createBlock(resolveDynamicComponent(() => unref(toNode)(unref(moreLabel), unref(effectData))), { key: 0 })) : (openBlock(), createBlock(unref(EllipsisOutlined), { key: 1 }))
                ]),
                _: 1
              }, 16)
            ]),
            _: 1
          })) : createCommentVNode("", true)
        ]),
        _: 1
      }, 16, ["size"]);
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
  return (props = {}) => h(_sfc_main$v, { option: buttons, methods, effectData, ...props });
}
const _base = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  AutoComplete,
  Button,
  Card,
  CheckableTag,
  Checkbox,
  CheckboxGroup,
  Col,
  Collapse,
  CollapsePanel,
  DatePicker,
  Descriptions: Descriptions$1,
  DescriptionsItem,
  Form,
  FormItem,
  Input,
  InputGroup,
  InputNumber,
  InputSearch,
  List,
  ListItem,
  Modal,
  Radio,
  RadioButton,
  RadioGroup,
  RangePicker,
  Row,
  Select,
  Space,
  Switch,
  TabPane,
  Table,
  Tabs,
  Tag,
  Textarea,
  TimePicker,
  TimeRangePicker,
  Tooltip,
  TreeSelect,
  Upload
}, Symbol.toStringTag, { value: "Module" }));
const base = { ..._base };
function override(comps) {
  Object.keys(comps).forEach((key) => {
    base[key] = comps[key];
  });
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
  setup(props, ctx) {
    const { type: parentType, attrs: parentAttrs, gutter = 16, subSpan } = props.option;
    const rowProps = { gutter, ...props.option.rowProps, ...ctx.attrs };
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
      if (formItemTypes.includes(type) && editable !== void 0 && editable !== true) {
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
      const independent = independentTypes.includes(type);
      if (!independent && (!block || option.field && option.label)) {
        const __rules = formatRule(subData.rules, effectData);
        const rules = computed(
          () => unref(attrs.disabled) ? void 0 : !option.required || required.value ? __rules : __rules.slice(1)
        );
        const formItemAttrs = mergeProps(globalProps.FormItem, option.formItemProps);
        const label = createLabelNode(option, effectData);
        node = () => h(
          base.FormItem,
          { ...formItemAttrs, name: subData.propChain, rules: rules.value, colon: !!label },
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
              key: idx,
              ...ctx.attrs
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
        currentGroup.push(() => !hidden.value && h(Col, mergeProps({ style: alignStyle, key: idx }, colProps), node));
        if (breakAfter)
          currentGroup = void 0;
      }
    }
    let hasWrap = false;
    const content = () => nodes.map((item, idx) => {
      if (Array.isArray(item)) {
        hasWrap = true;
        return h(Row, rowProps, () => item.map((node) => node()));
      } else {
        return item();
      }
    });
    return () => props.option.isContainer && hasWrap ? h(Controls.Group, { class: "sup-form-section", ...ctx.attrs, ...props }, { innerContent: content }) : content();
  }
});
function buildInnerNode(option, model, effectData, attrs) {
  const { type, viewRender, render: render2 = viewRender } = option;
  if (!type)
    return;
  const rootSlots = inject("rootSlots", {});
  const slots = useInnerSlots(option.slots, effectData);
  const renderSlot2 = render2 && (typeof render2 === "function" ? render2 : rootSlots[render2]);
  const renderNode = renderSlot2 && (() => renderSlot2({ props: attrs, ...effectData }));
  let node;
  if (type === "InfoSlot") {
    node = renderNode;
  } else if (type === "Text") {
    node = renderNode || (() => h("span", attrs, model.refData));
  } else if (type === "HTML") {
    node = renderNode || (() => h("span", { ...attrs, innerHTML: model.refData }));
  } else if (type === "Buttons") {
    node = () => h(_sfc_main$v, { option, effectData, ...attrs });
  } else if (containers.includes(type) || type === "InputList") {
    node = () => h(Controls[type], reactive({ option, model, effectData, ...attrs }), slots);
  } else {
    const valueProps = useVModel({ option, model, effectData });
    const allAttrs = { ...attrs, ...valueProps };
    if (type === "InputSlot") {
      node = () => renderSlot2 == null ? void 0 : renderSlot2(reactive({ props: allAttrs, ...effectData }));
    }
    const component = Controls[type];
    if (!component) {
      console.error(`组件 '${type}' 配置错误，请检查名称是否正确！`);
    } else if (type.startsWith("Ext")) {
      node = () => h(component, reactive({ option, effectData, ...allAttrs }), slots);
    } else {
      node = () => h(component, reactive({ option, model, effectData, ...allAttrs }), slots);
    }
  }
  return node;
}
const _sfc_main$u = defineComponent({
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
const Descriptions = defineComponent({
  props: {
    items: {
      type: Array,
      required: true
    },
    config: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const gridConfig = inject("gridConfig", {});
    const { subSpan, column } = props.config;
    const {
      layout,
      bordered,
      mode = bordered && "table",
      labelBgColor,
      borderColor,
      rowProps,
      colon,
      size = "middle",
      tableLayout,
      ...descriptionsProps
    } = gridConfig;
    let colNum = column || (Number(subSpan) ? Math.floor(24 / subSpan) : gridConfig.column);
    colNum ?? (colNum = Number(gridConfig.subSpan) ? Math.floor(24 / gridConfig.subSpan) : 2);
    function getRowGroup() {
      const group = [];
      let current = [];
      let n = 0;
      props.items.forEach(({ option, label, content, hidden }, idx) => {
        if (unref(hidden))
          return;
        const { span = option.span } = option.descriptionsProps || {};
        let ceil = Number(span) ? Math.ceil(span / (24 / colNum)) : 1;
        ceil = ceil > colNum ? colNum : ceil;
        const attrs = { ...descriptionsProps, ...option.formItemProps, ...option.descriptionsProps };
        const labelStyle = { ...attrs.labelAlign && { textAlign: attrs.labelAlign }, ...attrs.labelStyle };
        const item = {
          labelCol: mergeProps(attrs.labelCol, { style: labelStyle, class: { "sup-label-no-colon": attrs.noColon } }),
          wrapperCol: mergeProps(
            { style: layout === "vertical" && { textAlign: attrs.labelAlign } },
            { style: attrs.contentStyle },
            attrs.wrapperCol
          ),
          option,
          attrs,
          span,
          label,
          content,
          colspan: ceil
        };
        if (mode === "table") {
          if (n + ceil <= colNum) {
            n += ceil;
            current.push(item);
          } else {
            group.push(current);
            if (n < colNum) {
              const mod = colNum - n;
              current[current.length - 1].colspan += mod;
            }
            n = ceil;
            current = [item];
          }
        } else {
          current.push(item);
        }
        if (option.breakAfter ?? option.wrapping) {
          group.push(current);
          n = 0;
          current = [];
        }
        if (idx === props.items.length - 1 && current.length) {
          group.push(current);
        }
      });
      return group;
    }
    const rowGroup = computed(() => getRowGroup());
    if (mode === "table") {
      let colorStyle = "";
      borderColor && (colorStyle += `--descriptions-border-color:${borderColor};`);
      labelBgColor && (colorStyle += `--descriptions-bg-color:${labelBgColor};`);
      const rows = () => layout === "vertical" ? rowGroup.value.flatMap((group) => [
        (group.length > 1 || group[0].label) && h(
          "tr",
          { class: "ant-descriptions-row" },
          group.map(
            (item) => {
              var _a;
              return h(
                "th",
                mergeProps(
                  {
                    class: "ant-descriptions-item-label",
                    colspan: item.colspan,
                    style: `width: ${(item.span / 24 * 100).toFixed(2)}%`
                  },
                  { class: item.labelCol.class, style: item.labelCol.style }
                ),
                (_a = item.label) == null ? void 0 : _a.call(item)
              );
            }
          )
        ),
        h(
          "tr",
          { class: "ant-descriptions-row" },
          group.map(
            (item) => h(
              "td",
              mergeProps(
                { class: "ant-descriptions-item-content", colspan: item.colspan },
                { class: item.wrapperCol.class, style: item.wrapperCol.style }
              ),
              item.content()
            )
          )
        )
      ]) : (
        // 横向排列
        rowGroup.value.map(
          (group, idx) => h(
            "tr",
            { class: "ant-descriptions-row" },
            group.flatMap(
              (item) => !item.label ? [
                h(
                  "td",
                  {
                    class: "ant-descriptions-item-content",
                    style: item.wrapperCol.style,
                    colspan: item.colspan * 2
                  },
                  item.content()
                )
              ] : [
                h(
                  "th",
                  mergeProps(
                    { class: "ant-descriptions-item-label" },
                    { class: item.labelCol.class, style: item.labelCol.style }
                  ),
                  item.label()
                ),
                h(
                  "td",
                  mergeProps(
                    {
                      class: "ant-descriptions-item-content",
                      style: item.wrapperCol.style,
                      colspan: item.colspan * 2 - 1
                    },
                    { class: item.wrapperCol.class }
                  ),
                  item.content()
                )
              ]
            )
          )
        )
      );
      return () => h(
        "div",
        {
          style: colorStyle,
          class: ["ant-descriptions", "ant-descriptions-bordered", size !== "default" && "ant-descriptions-" + size]
        },
        h("div", { class: "ant-descriptions-view" }, h("table", { style: { tableLayout } }, rows()))
      );
    } else {
      const render2 = () => rowGroup.value.map(
        (group) => h(
          Row,
          { class: "ant-descriptions-row", ...rowProps },
          () => group.map(({ option, content, span, label, labelCol, wrapperCol, attrs }) => {
            const colProps = { span, ...attrs.colProps || option.colProps };
            if (colProps.span === 0 || colProps.flex) {
              colProps.span = void 0;
            } else if (!Number(colProps.span)) {
              colProps.span = gridConfig.column ? 24 / gridConfig.column : gridConfig.subSpan;
            }
            return h(
              Col,
              colProps,
              () => h(Row, { class: ["ant-descriptions-item-container"] }, () => [
                label && h(
                  Col,
                  mergeProps({ class: "ant-descriptions-item-label" }, labelCol),
                  () => h("label", {}, label())
                ),
                h(
                  Col,
                  { class: "ant-descriptions-item-content", ...wrapperCol },
                  () => !attrs.noInput && mode === "form" && label !== void 0 ? h("div", { class: "sup-descriptions-item-input" }, content()) : content()
                )
              ])
            );
          })
        )
      );
      return () => h(
        "div",
        {
          class: [
            "ant-descriptions",
            layout === "vertical" && "ant-descriptions-vertical",
            mode === "form" ? "sup-descriptions-mode-form" : "sup-descriptions-default",
            colon === false && "ant-descriptions-item-no-colon",
            size && size !== "default" && "ant-descriptions-" + size
          ]
        },
        h("div", { class: "ant-descriptions-view" }, render2())
      );
    }
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
    const attrs = { subSpan: option.subSpan, ...option.descriptionsProps, ...ctx.attrs };
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
      item.node ?? (item.node = () => h(Descriptions, { config: attrs, items: item.group, class: attrs.class }));
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
          slot = () => h(
            Row,
            rowProps,
            () => items.map((item, idx2) => {
              const colProps = item.option.colProps || { span: item.option.span ?? presetSpan };
              return !unref(item.hidden) && h(Col, { ...globalProps.Col, ...colProps, key: idx2 }, item.node);
            })
          );
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
    const { parent, refData } = toRefs(model);
    const effectData = getEffectData({
      parent: parentEffect,
      current: parent,
      isView: true,
      field: model.refName,
      value: refData,
      text: refData,
      ..."index" in model && { index: model.index, record: field ? refData : parent }
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
        render$12 = () => h(Space, { direction: isBreak ? "vertical" : "horizontal" }, () => contents == null ? void 0 : contents.map((node) => node()));
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
      const defRender = () => h(Control, reactive({ option, model, effectData, isView: true, ...globalProps[viewType], ...attrs }), slots);
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
        const style2 = option.align && { textAlign: option.align };
        render$12 = ((_c = nodeItems[0]) == null ? void 0 : _c.content) || render$12;
        nodes.push({ option, isBlock, node: () => h(render$12, { style: style2 }), hidden });
      }
      currentGroup = void 0;
    }
  });
  return nodes;
}
function getContent(option, model, parentEffect) {
  const { parent, refData } = toRefs(model);
  const value = model.refName ? refData : void 0;
  const effectData = toRaw(parent.value) === toRaw(parentEffect.current) ? parentEffect : getEffectData({ parent: parentEffect, current: parent, text: value, value, field: model.refName, isView: true });
  const content = getViewNode(option, effectData);
  return content === false ? void 0 : () => content ? content() : String(model.refData ?? "");
}
const _sfc_main$t = defineComponent({
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
      buttonsSlot = createButtons({ config: _buttons, effectData, isView: _isView });
    }
    const { style: style2, class: _class, ...attrs } = ctx.attrs;
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
          effectData,
          ...attrs
        }) : h(Collections, { option, model, effectData, ...attrs })
      )
    };
    const CustomComponent = option.component && toRaw(option.component);
    let titleButton, bottomButton;
    const buttonAlign = buttons == null ? void 0 : buttons.align;
    if (buttonsSlot) {
      if (buttons.placement === "bottom") {
        bottomButton = () => h("div", { class: "sup-bottom-buttons", style: { textAlign: buttonAlign || "center" } }, buttonsSlot());
      } else {
        titleButton = () => h(
          Col,
          { class: "sup-title-buttons", flex: 1, style: { textAlign: buttonAlign || (title ? "right" : void 0) } },
          buttonsSlot
        );
      }
    }
    if (CustomComponent) {
      return () => h(CustomComponent, {}, slots);
    } else {
      return () => h("div", mergeProps({ class: _class, style: style2 }, { class: "sup-group" }), [
        (title || titleButton) && h(Row, { align: "middle", class: "sup-titlebar" }, () => [
          title && h(Col, { class: "sup-title" }, slots.title),
          titleButton == null ? void 0 : titleButton()
        ]),
        slots.default(),
        bottomButton && bottomButton()
      ]);
    }
  }
});
const _sfc_main$s = {
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
      onSubmit: submitRegister,
      formRef
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
        return formRef.value.validate().then((...args) => {
          return submitValidate(modelData.value).then(
            () => {
              const data = cloneDeep(modelData.value);
              emit("submit", data);
              return data;
            },
            (err) => {
              typeof err === "object" && err.message && message.error(err.message);
              return Promise.reject(err);
            }
          );
        });
      },
      setFieldsValue(data) {
        var _a2;
        (_a2 = formRef.value) == null ? void 0 : _a2.clearValidate();
        return setFieldsValue(modelData.value, data, initialData);
      },
      resetFields(data = {}) {
        var _a2;
        resetFields(modelData.value, data, initialData);
        (_a2 = formRef.value) == null ? void 0 : _a2.clearValidate();
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
          render: () => h(_sfc_main$v, {
            option: buttonsConfig,
            methods: { submit: actions.submit, reset: actions.resetFields, search: actions.submit },
            effectData
          }),
          ...buttonsConfig.placement === "inline" && { span: "auto", block: false, align: buttonsConfig.align || "right" }
        }
      ];
    }
    const { modelsMap } = buildModelsMap(option.subItems, modelData);
    const initialData = cloneDeep(modelData.value);
    watch(
      () => unref(props.dataSource ?? props.option.dataSource),
      (data) => {
        var _a2;
        if (data) {
          (_a2 = formRef.value) == null ? void 0 : _a2.clearValidate();
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
    return () => h(
      base.Form,
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
const _sfc_main$r = defineComponent({
  inheritAttrs: false,
  props: {
    option: { type: Object, required: true },
    model: { type: Object, required: true },
    effectData: Object,
    compact: { type: Boolean, default: true },
    disabled: void 0
  },
  setup(props, { attrs }) {
    var _a, _b;
    const { option, model, compact } = props;
    const { field, slots } = option;
    const formItemContext = ref();
    let ruleObj = formatRule(model.rules, props.effectData);
    let _propChain = model.propChain;
    const extProps = {};
    const objectRule = {
      type: "object",
      required: false,
      fields: {}
    };
    if (model.children && compact) {
      for (const val of model.children.values()) {
        if (((_a = val.rules) == null ? void 0 : _a.length) && val.fieldName) {
          if (val.rules[0].required)
            objectRule.required = true;
          const effectData = reactive({
            ...props.effectData,
            parent: props.effectData,
            current: val.parent,
            field: val.fieldName,
            value: val.refData
          });
          const rule = objectRule.fields[val.fieldName] = formatRule(val.rules, effectData);
          if (!model.refName) {
            _propChain = val.propChain;
            ruleObj = rule;
            watch(
              () => unref(val.refData),
              () => {
                var _a2;
                return (_a2 = formItemContext.value) == null ? void 0 : _a2.onFieldChange();
              }
            );
            break;
          }
        }
      }
    } else {
      extProps.style = "margin: 0";
    }
    if (model.refName) {
      ruleObj = (ruleObj || []).concat([objectRule]);
      extProps.required = !!((_b = ruleObj[0]) == null ? void 0 : _b.required);
      watch(
        () => model.refData,
        () => {
          var _a2;
          return (_a2 = formItemContext.value) == null ? void 0 : _a2.onFieldChange();
        },
        { deep: true }
      );
    }
    const inheritAttrs = inject("inheritOptions", {});
    const rules = computed(
      () => props.disabled ? void 0 : !option.required || unref(inheritAttrs.required) ? ruleObj : ruleObj.slice(1)
    );
    const formItemAttrs = mergeProps(globalProps.FormItem, option.formItemProps, extProps);
    const _label = createLabelNode(option, props.effectData);
    return () => h(
      base.FormItem,
      { ...formItemAttrs, rules: rules.value, ref: formItemContext, name: _propChain },
      {
        label: _label,
        default: (slots == null ? void 0 : slots.default) || (() => h(
          FormItemRest,
          () => h(
            base.InputGroup,
            mergeProps({ compact, style: compact && { display: "flex" } }, attrs),
            () => h(Collections, { option, model, effectData: props.effectData })
          )
        ))
      }
    );
  }
});
const _sfc_main$q = defineComponent({
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
    const fristItem = columns[0];
    const isSingle = columns.length === 1 && fristItem.field === "$index";
    const isFormItem = !labelIndex && (label || labelSlot);
    const orgList = toRef(model, "refData");
    const extProvider = inject("exaProvider") || {};
    const methods = {
      add: {
        onClick({ index }) {
          orgList.value.splice(index + 1, 0, isSingle ? void 0 : {});
        },
        icon: () => h(PlusOutlined)
      },
      delete: {
        disabled: () => orgList.value.length === 1,
        confirmText: "",
        icon: () => h(MinusOutlined),
        onClick({ index }) {
          orgList.value.splice(index, 1);
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
    const listItems = shallowRef([]);
    watch(
      [orgList, () => orgList.value.length],
      ([list]) => {
        if (list.length === 0) {
          list.push(isSingle ? void 0 : {});
          return;
        }
        listItems.value = list.map((record, idx) => {
          const propChain = [...model.propChain, idx];
          if (listItems.value.length && extProvider.formRef) {
            nextTick(() => {
              var _a;
              (_a = extProvider.formRef.value) == null ? void 0 : _a.validate([propChain]);
            });
          }
          const oldItem = listItems.value[idx];
          if (oldItem) {
            oldItem.refData.value = record;
            return oldItem;
          }
          const refData = computed({
            get: () => orgList.value[idx],
            set: (val) => orgList.value[idx] = val
          });
          const newModel = {
            index: idx,
            parent: orgList,
            refData,
            propChain
          };
          const ghostModel = /* @__PURE__ */ new Map();
          let itemOption;
          if (isSingle) {
            itemOption = { ...fristItem };
            ghostModel.set(itemOption, {
              ...childrenMap.get(fristItem),
              ...newModel
            });
          } else {
            if (childrenMap.size === 1 && !fristItem.field && independentTypes.includes(fristItem.type)) {
              itemOption = { ...fristItem, field: String(idx) };
              const oldModel = [...childrenMap.values()][0];
              ghostModel.set(itemOption, {
                ...oldModel,
                ...newModel,
                refName: String(idx),
                children: cloneModels(oldModel.children || /* @__PURE__ */ new Map(), refData, propChain).modelsMap
              });
            } else {
              itemOption = compact ? {
                ..._option,
                type: "InputGroup",
                initialValue: void 0,
                field: String(idx)
              } : { type: "Group", span: "auto" };
              ghostModel.set(itemOption, {
                ...newModel,
                refName: String(idx),
                children: cloneModels(childrenMap, refData, propChain).modelsMap
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
            key: nanoid()
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
        return h(Collections, { model: model2, option: { subSpan: "auto", ...option }, effectData, key });
      });
    };
    if (isView) {
      if (isFormItem) {
        if (isSingle) {
          const { label: label2, labelSlot: labelSlot2 = label2 } = fristItem;
          const breakAfter = fristItem.breakAfter ?? fristItem.wrapping;
          return () => h(
            Space,
            { direction: breakAfter ? "vertical" : "horizontal" },
            () => listItems.value.map(({ refData, key }, index) => {
              const itemEffectData = {
                ...effectData,
                parent: effectData,
                current: orgList.value,
                field: fristItem.field,
                value: refData.value,
                index,
                record: refData.value
              };
              return h("span", { key }, [toNode(labelSlot2, itemEffectData), labelSlot2 ? ": " : "", refData.value]);
            })
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
      const formItemContext = ref();
      if (option.rules) {
        watch(
          () => orgList.value.length,
          () => {
            var _a;
            (_a = formItemContext.value) == null ? void 0 : _a.onFieldChange();
          }
        );
      }
      const children = /* @__PURE__ */ new Map([
        [
          {
            ..._option,
            formItemProps: { ..._option.formItemProps, ref: formItemContext, style: "margin: 0" },
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
const _sfc_main$p = /* @__PURE__ */ defineComponent({
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
    return () => h(base.Card, {}, {
      title: title && (() => h("div", {
        class: "sup-title"
      }, toNode(title, effectData))),
      extra: () => buttons && !isView && h(_sfc_main$v, {
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
const _sfc_main$o = defineComponent({
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
    const { modelsMap: childrenMap, rules } = model.listData;
    const { propChain } = model;
    const orgList = toRef(model, "refData");
    const attrs = useAttrs();
    const rowKey = attrs.rowKey || "id";
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
            effectData: reactive({ parent: effectData, current: orgList, index: idx, record })
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
      __slots.header = () => h(Row, { align: "middle" }, () => [
        titleSlot && h(Col, { class: "sup-title", flex: 1 }, titleSlot),
        extraSlot && h(Col, { class: "sup-title-buttons", style: { textAlign: buttonsConfig == null ? void 0 : buttonsConfig["align"] } }, extraSlot)
      ]);
    }
    const rowButtonsConfig = rowButtons && {
      buttonType: "link",
      size: "small",
      ...globalProps.rowButtons,
      ...Array.isArray(rowButtons) ? { actions: rowButtons } : rowButtons
    };
    __slots.renderItem = ({ item }) => h(
      base.ListItem,
      { key: item.hash },
      {
        default: () => {
          var _a;
          return [
            isView ? h(DetailLayouts, { option, modelsMap: item.model.children, effectData: item.effectData }) : h(Collections, { model: item.model, option, class: "ant-list-item-meta", effectData: item.effectData }),
            rowButtonsConfig && ((_a = createButtons({
              config: rowButtonsConfig,
              methods,
              effectData: item.effectData,
              isView
            })) == null ? void 0 : _a({ class: "ant-list-item-action" }))
          ];
        }
      }
    );
    return () => h(base.List, { dataSource: listItems.value }, __slots);
  }
});
const _sfc_main$n = defineComponent({
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
        icon: () => h(PlusOutlined),
        onClick({ index }) {
          orgList.value.splice(index + 1, 0, {});
          orgList.value = [...toRaw(orgList.value)];
        }
      },
      delete: {
        hidden: () => orgList.value.length === 1,
        disabled: false,
        confirmText: "",
        icon: () => h(MinusOutlined),
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
            effectData: reactive({ parent: effectData, current: orgList, index: idx, record })
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
const __default__ = {
  name: "ExTabs"
};
const _sfc_main$m = /* @__PURE__ */ defineComponent({
  ...__default__,
  props: {
    option: {},
    model: {},
    effectData: {},
    isView: {
      type: Boolean
    }
  },
  setup(__props) {
    const {
      Tabs: Tabs2,
      TabPane: TabPane2
    } = base;
    const {
      option,
      model,
      isView,
      effectData: parentEffect
    } = __props;
    const activeKey = ref(option.activeKey);
    const paneKeys = [];
    const planeHideEvent = (idx, key, invalid) => {
      paneKeys[idx] = !invalid && key;
      if (invalid && activeKey.value === key) {
        activeKey.value = paneKeys.find((val) => val);
      }
    };
    onMounted(() => {
      activeKey.value ?? (activeKey.value = paneKeys.find((val) => val));
    });
    const panes = [...model.children].map(([option2, model2], idx) => {
      const {
        key,
        field,
        label,
        icon
      } = option2;
      const effectData = getEffectData({
        parent: parentEffect,
        current: toRef(model2, "parent"),
        field: model2.refName,
        value: model2.refData
      });
      const {
        hidden,
        attrs
      } = render({
        option: option2,
        effectData
      });
      const tabKey = key || field || String(idx);
      const tabLabel = () => [getIconNode(icon), toNode(label, effectData)];
      watchEffect(() => {
        planeHideEvent(idx, tabKey, unref(hidden) || unref(attrs.disabled));
      });
      return {
        attrs: reactive({
          ...attrs,
          key: tabKey,
          tab: tabLabel
        }),
        hidden,
        option: {
          ...option2,
          type: "TabPane"
        },
        model: model2,
        effectData
      };
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(Tabs2), {
        activeKey: activeKey.value,
        "onUpdate:activeKey": _cache[0] || (_cache[0] = ($event) => activeKey.value = $event)
      }, {
        rightExtra: withCtx(() => [!_ctx.isView && _ctx.option.buttons ? (openBlock(), createBlock(unref(_sfc_main$v), {
          key: 0,
          option: _ctx.option.buttons
        }, null, 8, ["option"])) : createCommentVNode("", true)]),
        default: withCtx(() => [(openBlock(true), createElementBlock(Fragment, null, renderList(unref(panes), ({
          attrs,
          hidden,
          option: option2,
          model: model2,
          effectData
        }) => {
          return openBlock(), createElementBlock(Fragment, {
            key: attrs.key
          }, [!hidden.value ? (openBlock(), createBlock(unref(TabPane2), normalizeProps(mergeProps({
            key: 0
          }, attrs)), {
            default: withCtx(() => [_ctx.isView ? (openBlock(), createBlock(unref(DetailLayouts), {
              key: 0,
              option: option2,
              modelsMap: model2.children,
              effectData
            }, null, 8, ["option", "modelsMap", "effectData"])) : (openBlock(), createBlock(unref(Collections), {
              key: 1,
              option: option2,
              model: model2,
              effectData
            }, null, 8, ["option", "model", "effectData"]))]),
            _: 2
          }, 1040)) : createCommentVNode("", true)], 64);
        }), 128))]),
        _: 1
      }, 8, ["activeKey"]);
    };
  }
});
const _sfc_main$l = defineComponent({
  name: "SuperForm",
  props: {
    schema: Object,
    model: Object,
    dataSource: Object,
    isContainer: Boolean
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
      return (props, ctx) => h(_sfc_main$l, { ...props, onRegister: register }, ctx == null ? void 0 : ctx.slots);
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
function defineForm(option) {
  return option;
}
function createModal(content, { buttons, ...__config } = {}) {
  const visible = ref(false);
  const config = reactive({ ...__config, ...globalProps.Modal });
  const modalRef = ref();
  const footer = buttons && (() => h(_sfc_main$v, { option: buttons, effectData: { modalRef } }));
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
  const modalSlot = (props, ctx) => h(
    base.Modal,
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
    modalRef,
    modalSlot,
    setModal,
    closeModal,
    openModal
  };
}
function useModal(content, config) {
  const { modalSlot, openModal, modalRef, closeModal, setModal } = createModal(content, config);
  const ins = getCurrentInstance();
  const wrap = document.createDocumentFragment();
  let vm;
  const global = inject("configProvider");
  const Wrapper = (props) => {
    var _a;
    const rootPrefixCls = (_a = global == null ? void 0 : global.getPrefixCls) == null ? void 0 : _a.call(global);
    const prefixCls = props.prefixCls || "".concat(rootPrefixCls, "-modal");
    return h(
      ConfigProvider,
      { ...global, "notUpdateGlobalConfig": true, "prefixCls": rootPrefixCls },
      () => modalSlot({ ...props, rootPrefixCls, prefixCls }, {})
    );
  };
  const destroy = () => {
    render$1(null, wrap);
    vm = null;
  };
  if (global) {
    onUnmounted(() => {
      vm && destroy();
    });
  }
  const open = (option) => {
    var _a, _b;
    if (modalRef.value) {
      return openModal(option);
    } else {
      vm = createVNode(Wrapper);
      vm.appContext = ins == null ? void 0 : ins.appContext;
      render$1(vm, wrap);
      if ((_a = modalRef.value) == null ? void 0 : _a.destroyOnClose) {
        const afterClose = (_b = modalRef.value) == null ? void 0 : _b.afterClose;
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
        modelsMap,
        rules
      } = cloneModelsFlat(toRaw(childrenMap), editData);
      const form = Form.useForm(editData, ref(rules));
      form.clearValidate();
      Object.assign(editInfo, {
        ...info,
        form,
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
      return editInfo.form.validate().then(async () => {
        var _a;
        const raw = toRaw(editInfo.form.modelRef);
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
        (err == null ? void 0 : err.errorFields) && message.error(err.errorFields[0].errors[0]);
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
    return editInfo.isEdit ? h(_sfc_main$v, {
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
        form
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
      if (rules) {
        form.rulesRef.value[ruleName] = computed(() => unref(attrs.disabled) || unref(hidden) ? [] : rules);
      }
      return () => editableRef.value ? h(base.FormItem, {
        wrapperCol: {},
        ...form.validateInfos[ruleName]
      }, inputSlot) : viewRender ? viewRender({
        ...effectData,
        isView: true
      }) : refData.value;
    }
  });
  const getEditRender = (option, viewRender) => {
    const component = Controls[option.type];
    if (component || option.type === "InputSlot") {
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
      return () => selfEditableRef.value ? h(base.FormItem, reactive({
        wrapperCol: {},
        name: model2.value.propChain,
        rules
      }), inputSlot) : viewNode ? viewNode() : refData.value;
    }
  });
  const getEditRender = (option) => {
    const component = Controls[option.type];
    if (component || option.type === "InputSlot" && option.editable !== false) {
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
  const detail = () => h(_sfc_main$u, { option: { descriptionsProps }, modelsMap, source });
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
const _sfc_main$k = defineComponent({
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
    const { Card: Card2, Tabs: Tabs2, TabPane: TabPane2 } = base;
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
    const customTab = (item) => toNode(innerSlots.customTab || props.customTab || item.tab, { ...props.effectData, item });
    if (props.bordered) {
      return () => h(
        Card2,
        {
          tabList: tabList.value,
          activeTabKey: activeKey.value,
          onTabChange: updateActiveKey
        },
        {
          ..._slots,
          default: innerContent,
          customTab,
          title,
          tabBarExtraContent: tabBarExtraSlot || (!title ? extra : void 0),
          extra: tabBarExtraSlot || title ? extra : void 0,
          ...innerSlots
        }
      );
    } else {
      return () => [
        title ? titleBar == null ? void 0 : titleBar() : null,
        h(
          Tabs2,
          {
            ...attrs,
            activeKey: activeKey.value,
            "onUpdate:activeKey": updateActiveKey
          },
          {
            ..._slots,
            default: () => tabList.value.map((item) => h(TabPane2, { ...item, tab: () => customTab(item) })),
            rightExtra: tabBarExtraSlot || (!title ? extra : void 0),
            ...innerSlots
          }
        ),
        innerContent == null ? void 0 : innerContent()
      ];
    }
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
  const component = Controls[option.type];
  if (isFree && (component || option.type === "InputSlot")) {
    return (param) => {
      return h(InputNode, { option, effectData: { ...param } });
    };
  }
};
function buildColumns({ childrenMap, context, option, attrs, isView, effectData: parentData }) {
  const { list, methods, buttonMethods, getEditRender, editButtonsSlot } = context;
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
function findRowIndex(list, target, rowKey) {
  const targetKey = rowKey(target);
  return list.findIndex((record) => record === target || rowKey(record) === targetKey);
}
const _sfc_main$j = defineComponent({
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
      if (key)
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
    const selectedRowKeys = ref((__rowSelection == null ? void 0 : __rowSelection.selectedRowKeys) || []);
    const selectedRows = ref([]);
    const rowSelection = __rowSelection && {
      fixed: true,
      ...__rowSelection,
      selectedRowKeys,
      onChange: (_selectedRowKeys, _selectedRows) => {
        var _a2;
        selectedRowKeys.value = _selectedRowKeys;
        selectedRows.value = _selectedRows;
        (_a2 = __rowSelection == null ? void 0 : __rowSelection.onChange) == null ? void 0 : _a2.call(__rowSelection, _selectedRowKeys, _selectedRows);
      },
      ...editInline && {
        getCheckboxProps: (record) => {
          var _a2;
          return {
            disabled: !orgList.value.includes(record),
            ...(_a2 = __rowSelection == null ? void 0 : __rowSelection.getCheckboxProps) == null ? void 0 : _a2.call(__rowSelection, record)
          };
        }
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
          selectedRowKeys.value = selectedRowKeys.value.filter((key) => !keys.includes(key));
          selectedRows.value = selectedRows.value.filter((item) => !keys.includes(rowKey(item)));
        }
        items.forEach((item) => {
          const index = findRowIndex(orgList.value, item, rowKey);
          if (index > -1)
            orgList.value.splice(index, 1);
        });
        return reload == null ? void 0 : reload();
      }
    };
    const context = buildData({ option, model, orgList, rowKey, setRowKey, listener, isView, effectData });
    const columns = buildColumns({ childrenMap: model.listData.modelsMap, context, option, attrs, isView, effectData });
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
    const editParam = reactive({ ...effectData, selectedRows, selectedRowKeys, tableRef: exposed });
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
    const { title: titleSlot = titleString, extra: extraSlot, ...__slots } = slots;
    const titleBar = (titleSlot || extraSlot) && (() => h(Row, { align: "middle", class: "sup-titlebar" }, () => [
      titleSlot && h(
        Col,
        { class: "sup-title" },
        createLabelNode({ labelSlot: titleSlot, tooltip: option.tooltip }, effectData)
      ),
      extraSlot && h(
        Col,
        { class: "sup-title-buttons", flex: 1, style: { textAlign: (buttonsConfig == null ? void 0 : buttonsConfig.align) || "right" } },
        extraSlot
      )
    ]));
    __slots.headerCell = (col) => {
      var _a2;
      return ((_a2 = slots.headerCell) == null ? void 0 : _a2.call(slots, col)) || toNode(col.title, effectData);
    };
    const render2 = () => [
      ...modalSlot.map((slot) => slot()),
      h(
        base.Table,
        {
          ...globalProps.Table,
          ref: tableRef,
          dataSource: list.value,
          columns: reactive(columns),
          tableLayout: "fixed",
          pagination: false,
          ...attrs,
          rowSelection,
          rowKey,
          expandedRowKeys: expandedRowKeys.value,
          "onUpdate:expandedRowKeys": updateExpand,
          class: ["sup-table-wrapper", option.editable && "sup-table-editable"]
        },
        __slots
      )
    ];
    if (option.tabs) {
      return () => h(_sfc_main$k, { ...option.tabs, effectData }, {
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
const _sfc_main$i = defineComponent({
  props: {
    option: { type: Object, required: true },
    model: Object,
    effectData: Object
  },
  setup(props) {
    return () => h(base.Textarea, { style: "width: 100%", allowClear: true, placeholder: `请输入${props.option.label}` });
  }
});
const _hoisted_1$1 = {
  key: 0,
  class: "sup-title ant-descriptions-header"
};
const _sfc_main$h = /* @__PURE__ */ defineComponent({
  ...{
    inheritAttrs: false
  },
  __name: "Collapse",
  props: {
    option: {},
    model: {},
    effectData: {},
    isView: { type: Boolean }
  },
  setup(__props) {
    const { Collapse: Collapse2, CollapsePanel: CollapsePanel2 } = base;
    const props = __props;
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
        attrs: { disabled, ...attrs }
      } = render({ option, effectData });
      const { key, field } = option;
      return {
        attrs: reactive(attrs),
        option: { ...option, type: "CollapsePanel" },
        effectData,
        model,
        header: () => toNode(option.label),
        key: key || field || String(idx),
        hidden,
        disabled
      };
    });
    const acKey = ref(props.option.activeKey || panels[0].key);
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(Fragment, null, [
        unref(title) ? (openBlock(), createElementBlock("div", _hoisted_1$1, [
          (openBlock(), createBlock(resolveDynamicComponent(unref(toNode)(unref(title), _ctx.effectData))))
        ])) : createCommentVNode("", true),
        createVNode(unref(Collapse2), mergeProps({
          activeKey: acKey.value,
          "onUpdate:activeKey": _cache[0] || (_cache[0] = ($event) => acKey.value = $event)
        }, _ctx.$attrs), {
          default: withCtx(() => [
            (openBlock(true), createElementBlock(Fragment, null, renderList(unref(panels), ({ attrs, hidden, option, disabled, model, header, effectData, key }) => {
              return openBlock(), createElementBlock(Fragment, { key }, [
                !hidden.value ? (openBlock(), createBlock(unref(CollapsePanel2), mergeProps({
                  key: 0,
                  collapsible: unref(disabled) ? "disabled" : void 0
                }, attrs), createSlots({
                  header: withCtx(() => [
                    (openBlock(), createBlock(resolveDynamicComponent(header)))
                  ]),
                  default: withCtx(() => [
                    _ctx.isView ? (openBlock(), createBlock(unref(DetailLayouts), {
                      key: 0,
                      option,
                      modelsMap: model.children,
                      effectData
                    }, null, 8, ["option", "modelsMap", "effectData"])) : (openBlock(), createBlock(unref(Collections), {
                      key: 1,
                      option,
                      model,
                      effectData
                    }, null, 8, ["option", "model", "effectData"]))
                  ]),
                  _: 2
                }, [
                  !_ctx.isView ? {
                    name: "extra",
                    fn: withCtx(() => [
                      option.buttons ? (openBlock(), createBlock(unref(_sfc_main$v), {
                        key: 0,
                        option: option.buttons,
                        effectData
                      }, null, 8, ["option", "effectData"])) : createCommentVNode("", true)
                    ]),
                    key: "0"
                  } : void 0
                ]), 1040, ["collapsible"])) : createCommentVNode("", true)
              ], 64);
            }), 128))
          ]),
          _: 1
        }, 16, ["activeKey"])
      ], 64);
    };
  }
});
const _sfc_main$g = defineComponent({
  props: {
    option: {
      required: true,
      type: Object
    },
    model: Object,
    effectData: Object,
    addonAfter: void 0,
    enterButton: void 0,
    onSearch: Function,
    disabled: Boolean
  },
  setup(props, { slots }) {
    const { option, effectData, addonAfter, enterButton, onSearch } = props;
    const attrs = reactive({
      placeholder: "请输入" + (isString(option.label) ? option.label : ""),
      disabled: toRef(props, "disabled")
    });
    if (onSearch) {
      const loading = ref(false);
      const { addonAfter: addonAfterSlot, ...slotsRest } = slots;
      let enterButtonSlot = slots.enterButton || (enterButton ? void 0 : addonAfterSlot);
      const enterButtonProp = enterButton || addonAfter;
      if (!enterButtonSlot) {
        if (isObject$1(enterButtonProp)) {
          const { label, icon, ...rest } = enterButton;
          enterButtonSlot = () => h(
            base.Button,
            { loading: loading.value, ...rest },
            { icon: () => getIconNode(icon), default: () => toNode(label) }
          );
        } else if (isFunction(enterButtonProp)) {
          enterButtonSlot = () => h(base.Button, { type: "primary", loading: loading.value }, enterButtonProp);
        }
      }
      attrs.onSearch = async (...args) => {
        loading.value = true;
        try {
          await (onSearch == null ? void 0 : onSearch(...args));
        } finally {
          loading.value = false;
        }
      };
      if (enterButtonSlot) {
        return () => h(base.InputSearch, attrs, { ...slotsRest, enterButton: enterButtonSlot });
      }
      return () => h(base.InputSearch, { ...attrs, enterButton: enterButtonProp }, slotsRest);
    } else {
      return () => h(base.Input, { ...attrs, addonAfter }, slots);
    }
  }
});
const _sfc_main$f = /* @__PURE__ */ defineComponent({
  __name: "InputNumber",
  props: {
    option: {},
    model: {},
    effectData: {}
  },
  setup(__props) {
    const { InputNumber: InputNumber2 } = base;
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(InputNumber2), {
        style: { "width": "100%" },
        type: "number",
        placeholder: "请输入" + _ctx.option.label
      }, null, 8, ["placeholder"]);
    };
  }
});
const _sfc_main$e = /* @__PURE__ */ defineComponent({
  __name: "Select",
  props: {
    option: {},
    model: {},
    effectData: {},
    options: {},
    labelField: {},
    dictName: {},
    valueToNumber: { type: Boolean },
    labelAsValue: { type: Boolean },
    valueToLabel: { type: Boolean },
    fieldNames: {},
    onChange: {},
    onSearch: {}
  },
  emits: ["update:labelValue"],
  setup(__props, { emit: __emit }) {
    var _a;
    const { Select: Select2 } = base;
    const emit = __emit;
    const props = __props;
    const { options: orgOptions, labelField } = props.option;
    const attrs = useAttrs();
    const { optionsRef, setOptions } = useOptions(props.option, props.options, props.effectData);
    let onChange = props.onChange;
    if (labelField) {
      const labelName = ((_a = props.fieldNames) == null ? void 0 : _a.label) || "label";
      onChange = (...args) => {
        var _a2;
        const item = args[1];
        emit("update:labelValue", Array.isArray(item) ? item.map((item2) => item2[labelName]) : item == null ? void 0 : item[labelName]);
        (_a2 = props.onChange) == null ? void 0 : _a2.call(props, ...args);
      };
    }
    let onSearch = props.onSearch && throttle(props.onSearch, 600, { leading: false });
    if (attrs.showSearch && !onSearch && typeof orgOptions === "function") {
      const searchHandler = (val) => {
        Promise.resolve(orgOptions(props.effectData, val)).then((data) => {
          setOptions(data);
        });
      };
      onSearch = throttle(searchHandler, 600, { leading: false });
    }
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(Select2), {
        "option-filter-prop": "label",
        placeholder: "请选择" + _ctx.option.label,
        options: unref(optionsRef),
        onChange: unref(onChange),
        onSearch: unref(onSearch)
      }, createSlots({ _: 2 }, [
        renderList(_ctx.$slots, (_, name) => {
          return {
            name,
            fn: withCtx((data) => [
              renderSlot(_ctx.$slots, name, normalizeProps(guardReactiveProps(data || {})))
            ])
          };
        })
      ]), 1032, ["placeholder", "options", "onChange", "onSearch"]);
    };
  }
});
const _sfc_main$d = defineComponent({
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
    value: {
      type: [Number, String, Boolean]
    },
    options: Object,
    /** 字典名称 */
    dictName: String,
    /** 选项中的value转成number类型 */
    valueToNumber: Boolean,
    /** 使用选项 label 作为字段值 */
    labelAsValue: Boolean,
    /** @deprecated 使用 `labelAsValue` */
    valueToLabel: Boolean,
    /** 第一个选项为选中值 */
    firstIsChecked: Boolean,
    /** 默认是否选中 */
    defaultChecked: Boolean
  },
  emits: ["update:value"],
  setup(props, ctx) {
    const [falseName, trueName] = props.option.valueLabels || [];
    const { optionsRef } = useOptions(props.option, props.options, props.effectData);
    const defTrueValue = props.valueToNumber ? 1 : true;
    const defFalseValue = props.valueToNumber ? 0 : false;
    const attrs = computed(() => {
      const [first, scond] = optionsRef.value;
      if (props.firstIsChecked) {
        return {
          checkedChildren: (first == null ? void 0 : first.label) ?? trueName,
          unCheckedChildren: (scond == null ? void 0 : scond.label) ?? falseName,
          checkedValue: (first == null ? void 0 : first.value) ?? defTrueValue,
          unCheckedValue: (scond == null ? void 0 : scond.value) ?? defFalseValue
        };
      } else {
        return {
          checkedChildren: (scond == null ? void 0 : scond.label) ?? trueName,
          unCheckedChildren: (first == null ? void 0 : first.label) ?? falseName,
          checkedValue: (scond == null ? void 0 : scond.value) ?? defTrueValue,
          unCheckedValue: (first == null ? void 0 : first.value) ?? defFalseValue
        };
      }
    });
    watch(
      () => [props.value, optionsRef.value],
      ([val, options]) => {
        if (val === void 0 && (!props.options || options.length)) {
          ctx.emit("update:value", props.defaultChecked ? attrs.value.checkedValue : attrs.value.unCheckedValue);
        }
      },
      { immediate: true }
    );
    return () => h(
      base.Switch,
      reactive({
        ...attrs.value,
        checked: props.value,
        "onUpdate:checked": (val) => ctx.emit("update:value", val)
      })
    );
  }
});
const _sfc_main$c = defineComponent({
  props: {
    option: Object,
    model: Object,
    effectData: Object,
    disabledDate: Function
  },
  setup(props, ctx) {
    const disabledDate = (currentDate) => {
      var _a;
      return (_a = props.disabledDate) == null ? void 0 : _a.call(props, currentDate, props.effectData);
    };
    return () => h(base.RangePicker, { valueFormat: "YYYY-MM-DD", disabledDate }, ctx.slots);
  }
});
const _sfc_main$b = defineComponent({
  props: {
    option: Object,
    model: Object,
    effectData: Object,
    disabledDate: Function
  },
  setup(props, ctx) {
    const disabledDate = (currentDate) => {
      var _a;
      return (_a = props.disabledDate) == null ? void 0 : _a.call(props, currentDate, props.effectData);
    };
    return () => h(base.DatePicker, { valueFormat: "YYYY-MM-DD", disabledDate }, ctx.slots);
  }
});
const _sfc_main$a = defineComponent({
  props: {
    option: { type: Object, required: true },
    model: Object,
    effectData: Object,
    options: null,
    /** 字典名称 */
    dictName: String
  },
  setup(props, ctx) {
    const { optionsRef } = useOptions({ ...props.option, labelAsValue: true }, props.options, props.effectData);
    return () => h(
      base.AutoComplete,
      { placeholder: `请输入${props.option.label}`, options: optionsRef.value, filterOption: true },
      ctx.slots
    );
  }
});
const _sfc_main$9 = defineComponent({
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
    options: null,
    onChange: Function
  },
  emits: ["update:labelValue"],
  setup(props, { attrs, emit }) {
    const { optionsRef } = useOptions(props.option, props.options, props.effectData);
    const optionType = attrs.optionType || attrs.buttonStyle && "button";
    let onChange = props.onChange;
    if (props.option.labelField) {
      onChange = (e) => {
        var _a, _b;
        const labels = (_a = optionsRef.value.find((item) => item.value === e.target.value)) == null ? void 0 : _a.label;
        emit("update:labelValue", labels);
        (_b = props.onChange) == null ? void 0 : _b.call(props, e);
      };
    }
    return () => h(
      base.RadioGroup,
      { name: props.option.field, optionType, onChange },
      () => optionsRef.value.map(
        (item) => h(
          optionType === "button" ? RadioButton : Radio,
          { value: item.value, disabled: item.disabled },
          () => toNode(item.label, props.effectData)
        )
      )
    );
  }
});
const _sfc_main$8 = defineComponent({
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
    options: null,
    onChange: Function
  },
  emits: ["update:labelValue"],
  setup(props, ctx) {
    const { optionsRef } = useOptions(props.option, props.options, props.effectData);
    let onChange = props.onChange;
    const labelField = props.option.labelField;
    if (labelField) {
      onChange = (items) => {
        var _a;
        const labels = items.map((key) => {
          var _a2;
          return (_a2 = optionsRef.value.find(({ value }) => value == key)) == null ? void 0 : _a2.label;
        });
        ctx.emit("update:labelValue", labels);
        (_a = props.onChange) == null ? void 0 : _a.call(props, items);
      };
    }
    return () => h(base.CheckboxGroup, { options: optionsRef.value, name: props.option.field, onChange });
  }
});
const _sfc_main$7 = defineComponent({
  props: {
    option: { type: Object, required: true },
    effectData: { type: Object, required: true },
    model: Object,
    onChange: Function
  },
  emits: ["update:labelValue"],
  setup(props, ctx) {
    const dataRef = ref([]);
    const { data, treeData = data, labelField, label } = props.option;
    if (typeof treeData === "function") {
      watchPostEffect(() => {
        Promise.resolve(treeData(props.effectData)).then((res) => {
          dataRef.value = res || [];
        });
      });
    } else if (treeData) {
      watch(
        () => unref(treeData),
        (data2) => dataRef.value = data2,
        { immediate: true }
      );
    }
    let onChange = props.onChange;
    if (labelField) {
      onChange = (...args) => {
        var _a;
        const [val, labels] = args;
        ctx.emit("update:labelValue", Array.isArray(val) ? labels : labels[0]);
        (_a = props.onChange) == null ? void 0 : _a.call(props, ...args);
      };
    }
    return () => h(
      base.TreeSelect,
      { allowClear: true, placeholder: `请选择${label}`, onChange, treeData: dataRef.value },
      ctx.slots
    );
  }
});
const _sfc_main$6 = /* @__PURE__ */ defineComponent({
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
    const setVisible = (boo) => {
      emit("update:value", boo);
    };
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(Image).PreviewGroup, {
        style: { display: "none" },
        preview: {
          visible: _ctx.visible,
          onVisibleChange: setVisible,
          current: _ctx.current
        }
      }, {
        default: withCtx(() => [
          (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.images, (img, index) => {
            return openBlock(), createBlock(unref(Image), {
              key: index,
              width: _ctx.width,
              src: img,
              height: _ctx.height
            }, null, 8, ["width", "src", "height"]);
          }), 128))
        ]),
        _: 1
      }, 8, ["preview"]);
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
  const slot = () => !isUnmounted.value && h(_sfc_main$6, __config);
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
function acceptValidtor(file, accept) {
  return accept.split(",").some((str) => {
    var _a;
    return ((_a = file.name) == null ? void 0 : _a.endsWith(str)) || file.type && new RegExp(`^${str.replace("*", "\\S*")}$`).test(file.type);
  });
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
  const modal = Modal.info({
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
      icon: () => h(CloseCircleOutlined),
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
const _sfc_main$5 = defineComponent({
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
    const preview = usePreview();
    const __names = {
      ...valueKey && { [valueKey]: valueKey },
      uid: "uid",
      status: "status",
      url: "url",
      name: "name",
      ...infoNames
    };
    if (mode === "custom")
      __names.originFileObj = "originFileObj";
    const convertInfo = (info) => {
      const __info = { status: "done", ...info };
      Object.entries(__names).forEach(([key, name]) => {
        if (name && name !== key && name in __info) {
          __info[key] = __info[name];
          delete __info[name];
        }
      });
      return __info;
    };
    const reconvert = (info) => {
      const __info = {};
      Object.entries(__names).forEach(([key, name]) => {
        const value = info[key];
        if (name && value !== void 0)
          __info[name] = value;
      });
      return __info;
    };
    const { onSubmit } = inject("exaProvider", {});
    const innerFileList = ref([]);
    const outFileList = shallowRef([]);
    const outValues = shallowRef();
    const tasks = /* @__PURE__ */ new Map();
    const waitingTasks = /* @__PURE__ */ new Map();
    const updateFileList = (list) => {
      outFileList.value = list.map(reconvert);
      if (!props.isView) {
        ctx.emit("update:fileList", outFileList.value);
        updateValue();
      }
      innerFileList.value = list;
    };
    const updateValue = () => {
      if (props.isSingle) {
        const frist = toRaw(outFileList.value[0]);
        outValues.value = !valueKey ? frist : (frist == null ? void 0 : frist[valueKey]) ?? (frist == null ? void 0 : frist[__names.uid]);
      } else if (valueKey) {
        outValues.value = outFileList.value.map((item) => item[valueKey] ?? item[__names.uid]);
      } else {
        outValues.value = outFileList.value;
      }
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
      let stack = Promise.resolve();
      if (mode === "auto") {
        for (const item of innerFileList.value) {
          if (item.status === "error") {
            const error = item.response || { message: "文件上传错误，请删除后重新上传！" };
            return Promise.reject(error);
          } else if (item.status === "uploading") {
            isLoading.value = true;
          }
          stack = Promise.all(tasks.values());
        }
      } else if (mode === "submit") {
        const __tasks = [];
        for (const item of innerFileList.value) {
          if (item.status !== "done") {
            isLoading.value = true;
            item.status = "uploading";
            const task = waitingTasks.get(item.uid);
            __tasks.push(task());
          }
          stack = Promise.all(__tasks);
        }
      }
      if (removeFileMap.size)
        isLoading.value = true;
      if (isLoading.value) {
        const modal = createLoadModal(" 文件同步中，请稍候...");
        return stack.then(
          (data) => (
            // 文件删除出错不中断提交
            Promise.all([...removeFileMap.values()].map((handler) => handler())).then(() => data).catch((err) => console.error(err)).finally(() => {
              modal == null ? void 0 : modal.destroy();
              isLoading.value = false;
              return data;
            })
          )
        ).catch((err) => {
          isLoading.value = false;
          modal.setError("文件上传失败", err);
          return false;
        });
      }
      return stack;
    });
    const beforeUpload = (file, resFileList) => {
      if (props.beforeUpload) {
        const res = props.beforeUpload(file, resFileList);
        if (res !== void 0)
          return res;
      }
      const errMessage = (() => {
        if (maxCount > 1) {
          const count = outFileList.value.length + resFileList.indexOf(file);
          if (count >= maxCount) {
            return "文件数量最多" + maxCount;
          }
        }
        if (accept && !acceptValidtor(file, accept)) {
          return "请选择正确的文件类型！";
        }
        if (minSize || maxSize) {
          const fileSize = file.size / 1024 / 1024;
          if (minSize && minSize > fileSize) {
            return "文件最小需要" + minSize + "M";
          }
          if (maxSize && maxSize < fileSize) {
            return "文件最大不超过" + maxSize + "M";
          }
        }
        if (!repeatable) {
          const item = innerFileList.value.find((item2) => item2.name === file.name);
          if (item) {
            return `文件重复: ${item.name}`;
          }
        }
      })();
      if (errMessage) {
        message.error(errMessage);
        return Upload.LIST_IGNORE;
      }
      if (mode === "custom") {
        if (showUploadList !== false) {
          return false;
        }
      } else if (maxCount === 1 && innerFileList.value.length) {
        const info = innerFileList.value[0];
        tasks.delete(info.uid);
        waitingTasks.delete(info.uid);
        if (info.status === "done" && apis.delete) {
          const __file = { ...outFileList.value[0] };
          removeFileMap.set(__file, () => apis.delete(__file));
        }
      }
    };
    function handleChange({ file, fileList, event }) {
      var _a;
      if (file.status === "removed") {
        tasks.delete(file.uid);
        waitingTasks.delete(file.uid);
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
        const promise = upload(args);
        tasks.set(file.uid, promise);
        return promise;
      } else if (mode === "submit") {
        waitingTasks.set(file.uid, () => upload(args));
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
    const removeFileMap = /* @__PURE__ */ new Map();
    const remove = async (file) => {
      var _a;
      let result = await ((_a = props.onRemove) == null ? void 0 : _a.call(props, file));
      if (result !== false && apis.delete && file.status === "done") {
        return new Promise((resolve) => {
          const modal = Modal.confirm({
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
                removeFileMap.set(
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
        return h(SyncOutlined);
      } else if (file.status === "uploading") {
        return h(LoadingOutlined);
      } else {
        return h(PaperClipOutlined);
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
        return ((_b = (_a = ctx.slots).default) == null ? void 0 : _b.call(_a, effectData)) || h("div", [h(PlusOutlined), titleSlot ? titleSlot() : h("div", { style: "margin-top:8px" }, title)]);
      };
    } else {
      slots.default = () => {
        var _a, _b;
        return [
          ((_b = (_a = ctx.slots).default) == null ? void 0 : _b.call(_a, effectData)) || h(base.Button, {}, () => [h(UploadOutlined), titleSlot ? titleSlot() : title]),
          tip && h("div", { class: "sup-upload-tip" }, tip)
        ];
      };
    }
    const isView = computed(() => props.disabled || props.isView);
    const hideBody = computed(() => hideOnMax && maxCount && innerFileList.value.length >= maxCount);
    return () => isView.value && innerFileList.value.length === 0 ? h("div", { class: "sup-upload-tip" }, "暂无附件") : h(
      base.Upload,
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
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
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
    valueToString: { type: Boolean },
    newLabel: { default: "添加" },
    isView: { type: Boolean },
    closable: { type: Boolean, default: true }
  },
  emits: ["update:value"],
  setup(__props, { emit: __emit }) {
    const { Input: Input2, Tooltip: Tooltip2, Tag: Tag2 } = base;
    const props = __props;
    const emit = __emit;
    const inputRef = ref();
    const inputValue = ref("");
    const inputVisible = ref(false);
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
    const updateValue = (val) => {
      if (props.stringifyValue || props.valueToString) {
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
          return openBlock(), createElementBlock(Fragment, { key: tag }, [
            tag.length > 20 ? (openBlock(), createBlock(unref(Tooltip2), {
              key: 0,
              title: tag
            }, {
              default: withCtx(() => [
                createVNode(unref(Tag2), mergeProps({
                  closable: getClosable(tag, index),
                  onClose: ($event) => handleClose(tag)
                }, _ctx.$attrs), {
                  default: withCtx(() => [
                    createTextVNode(toDisplayString(`${tag.slice(0, 20)}...`), 1)
                  ]),
                  _: 2
                }, 1040, ["closable", "onClose"])
              ]),
              _: 2
            }, 1032, ["title"])) : (openBlock(), createBlock(unref(Tag2), mergeProps({
              key: 1,
              closable: getClosable(tag, index),
              onClose: ($event) => handleClose(tag)
            }, _ctx.$attrs), {
              default: withCtx(() => [
                createTextVNode(toDisplayString(tag), 1)
              ]),
              _: 2
            }, 1040, ["closable", "onClose"]))
          ], 64);
        }), 128)),
        inputVisible.value ? (openBlock(), createBlock(unref(Input2), {
          key: 0,
          ref_key: "inputRef",
          ref: inputRef,
          value: inputValue.value,
          "onUpdate:value": _cache[0] || (_cache[0] = ($event) => inputValue.value = $event),
          type: "text",
          size: "small",
          style: { width: "78px" },
          onBlur: handleInputConfirm
        }, null, 8, ["value"])) : (openBlock(), createBlock(unref(Tag2), {
          key: 1,
          style: { "background": "#fff", "border-style": "dashed" },
          onClick: showInput
        }, {
          default: withCtx(() => [
            createVNode(unref(PlusOutlined)),
            (openBlock(), createBlock(resolveDynamicComponent(() => unref(toNode)(_ctx.newLabel, _ctx.effectData))))
          ]),
          _: 1
        }))
      ], 64);
    };
  }
});
const _hoisted_1 = {
  key: 1,
  class: "ant-form-item-extra"
};
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
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
    valueToString: { type: Boolean },
    multiple: { type: Boolean },
    isView: { type: Boolean },
    placeholder: {}
  },
  emits: ["update:value", "change", "check"],
  setup(__props, { emit: __emit }) {
    const { CheckableTag: CheckableTag2 } = base;
    const props = __props;
    const emit = __emit;
    const { optionsRef } = useOptions(props.option, props.options, props.effectData);
    const selected = computed(() => {
      const { value } = props;
      const stringifyValue = props.stringifyValue || props.valueToString;
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
    const updateValue = (val) => {
      if (!props.multiple) {
        emit("update:value", val[0]);
      } else if (props.stringifyValue || props.valueToString) {
        emit("update:value", val.join(","));
      } else {
        emit("update:value", val);
      }
    };
    return (_ctx, _cache) => {
      return unref(optionsRef).length ? (openBlock(true), createElementBlock(Fragment, { key: 0 }, renderList(unref(optionsRef), ({ label, value }) => {
        return openBlock(), createBlock(unref(CheckableTag2), mergeProps(_ctx.$attrs, {
          class: "tag-select",
          key: value,
          checked: selected.value.indexOf(value) > -1,
          onChange: (checked) => handleChange(value, checked)
        }), {
          default: withCtx(() => [
            createTextVNode(toDisplayString(label), 1)
          ]),
          _: 2
        }, 1040, ["checked", "onChange"]);
      }), 128)) : (openBlock(), createElementBlock("div", _hoisted_1, toDisplayString(_ctx.placeholder), 1));
    };
  }
});
const components = {
  Form: _sfc_main$s,
  Group: _sfc_main$t,
  Card: _sfc_main$p,
  List: _sfc_main$o,
  ListGroup: _sfc_main$n,
  Tabs: _sfc_main$m,
  Table: _sfc_main$j,
  Collapse: _sfc_main$h,
  Descriptions: _sfc_main$t,
  Fragment: _sfc_main$t
};
const formItems = {
  Textarea: _sfc_main$i,
  Input: _sfc_main$g,
  InputNumber: _sfc_main$f,
  InputGroup: _sfc_main$r,
  InputList: _sfc_main$q,
  AutoComplete: _sfc_main$a,
  Select: _sfc_main$e,
  Switch: _sfc_main$d,
  DateRange: _sfc_main$c,
  TimeRange: base.TimeRangePicker,
  DatePicker: _sfc_main$b,
  TimePicker: base.TimePicker,
  Radio: _sfc_main$9,
  Checkbox: _sfc_main$8,
  TreeSelect: _sfc_main$7,
  Upload: _sfc_main$5,
  TagInput: _sfc_main$4,
  TagSelect: _sfc_main$3
};
const allItems = { ...formItems, ...components };
function addComponent(name, component) {
  const customName = `Ext${name}`;
  allItems[customName] = (props) => {
    return h(component, props);
  };
}
const Controls = allItems;
const globalConfig = {
  tagViewer: ["pink", "red", "orange", "green", "cyan", "blue", "purple"]
};
const globalProps = {
  FormItem: {
    validateFirst: true
  },
  Table: {
    size: "small"
  },
  TimePicker: {
    valueFormat: "HH:mm:ss"
  },
  TimeRange: {
    valueFormat: "HH:mm:ss"
  }
};
const install = async (app, config = {}) => {
  const { locale, components: components2, defaultProps, ..._config } = config;
  app.provide("localeData", { locale, exist: true });
  Object.assign(globalConfig, _config);
  components2 && override(components2);
  defaultProps && setDefaultProps(defaultProps);
};
function registerComponent(name, component) {
  addComponent(name, component);
}
function registComponent(name, component) {
  registerComponent(name, component);
}
function setDefaultProps(props) {
  merge$1(globalProps, props);
}
const plugin = {
  install,
  registerComponent,
  registComponent,
  setDefaultProps
};
const style = "";
const resultTransform = (res) => {
  var _a, _b;
  return ((_b = (_a = globalConfig.tableApiSetting) == null ? void 0 : _a.resultTransform) == null ? void 0 : _b.call(_a, res)) || res;
};
const pageTransform = (param) => {
  const { currentField, sizeField } = globalConfig.tableApiSetting || {};
  if (currentField || sizeField) {
    return {
      [currentField || "current"]: param.current,
      [sizeField || "size"]: param.size
    };
  }
  return param;
};
function useQuery(option, updateSource) {
  const pageParam = reactive({});
  const loading = ref(false);
  let searchParam = {};
  let latestRequestId = 0;
  let activeController;
  const callbacks = [];
  const onLoaded = (cb) => callbacks.push(cb);
  if (option.onLoaded) {
    callbacks.push(option.onLoaded);
  }
  const request = async (param) => {
    var _a, _b, _c;
    const _params = merge({}, pageTransform(pageParam), searchParam, param);
    const _data = ((_a = option.beforeQuery) == null ? void 0 : _a.call(option, _params)) || _params;
    const queryApi = (_b = option.apis) == null ? void 0 : _b.query;
    activeController == null ? void 0 : activeController.abort();
    const requestId = ++latestRequestId;
    if (!queryApi) {
      activeController = void 0;
      loading.value = false;
      return;
    }
    const controller = new AbortController();
    activeController = controller;
    loading.value = true;
    try {
      const res = await queryApi(_data, { signal: controller.signal });
      if (requestId !== latestRequestId || controller.signal.aborted)
        return;
      const _res = ((_c = option.afterQuery) == null ? void 0 : _c.call(option, res)) || res;
      return setPageData(resultTransform(_res));
    } finally {
      if (requestId === latestRequestId) {
        activeController = void 0;
        loading.value = false;
      }
    }
  };
  const setPageData = (res) => {
    if (Array.isArray(res)) {
      updateSource(res);
      if (pagination.value !== false) {
        pageParam.current = 1;
        pagination.value = { ...pagination.value, total: res.length };
      }
    } else if (res == null ? void 0 : res.records) {
      updateSource(res.records);
      if (pagination.value !== false) {
        pageParam.current = res.current;
        pageParam.size = res.size;
        pagination.value = { ...pagination.value, total: res.total };
      }
    }
    return Promise.all(callbacks.map((cb) => cb(res)));
  };
  const goPage = (current, size = pageParam.size) => {
    pageParam.current = current;
    pageParam.size = size;
    return request();
  };
  const query = (param) => {
    if (pagination.value)
      pageParam.current = 1;
    return request(param);
  };
  const throttleRequest = throttle(query, 300, { leading: false });
  const cancelQuery = () => {
    activeController == null ? void 0 : activeController.abort();
    activeController = void 0;
    latestRequestId += 1;
    loading.value = false;
  };
  const formParams = {};
  const setQueryParams = (data, target) => {
    if (target === "dynamic") {
      searchParam = merge({}, formParams, data);
    } else {
      Object.assign(formParams, data);
      merge(searchParam, data);
    }
  };
  const getQueryParams = () => searchParam;
  const pagination = ref(false);
  watch(
    () => {
      var _a;
      return option.pagination ?? ((_a = option.attrs) == null ? void 0 : _a.pagination);
    },
    (def) => {
      if (def === false) {
        pagination.value = false;
        return;
      }
      Object.assign(pageParam, { size: (def == null ? void 0 : def.pageSize) || 10, current: (def == null ? void 0 : def.current) || 1 });
      pagination.value = mergeProps(
        {
          onChange: goPage
          // onShowSizeChange: goPage,
        },
        {
          ...def,
          pageSize: pageParam.size,
          current: pageParam.current
        }
      );
    },
    {
      immediate: true,
      flush: "sync"
    }
  );
  watch(pageParam, (p) => {
    pagination.value && (pagination.value = { ...pagination.value, pageSize: p.size, current: p.current });
  });
  return {
    goPage,
    reload: request,
    throttleRequest,
    cancelQuery,
    setQueryParams,
    getQueryParams,
    query,
    pagination,
    setPageData,
    onLoaded,
    loading
  };
}
function useSearchForm(tableOption, tableRef, onChange) {
  var _a;
  const { columns, searchForm } = tableOption;
  const schema = searchForm || tableOption.searchSchema || {};
  const formRef = ref();
  const dataSource = schema.dataSource || reactive({});
  const { buttons = {}, searchOnChange, limit, ...formOption } = schema;
  const expanded = ref(false);
  const subItems = [];
  schema.subItems.forEach((item) => {
    if (typeof item === "string") {
      const col = columns.find((col2) => col2.field === item);
      col && subItems.push({ type: "Input", ...omit(col, "span", "disabled", "hidden"), editable: true, exclude: [] });
    } else {
      return subItems.push({ ...item });
    }
  });
  if (limit && subItems.length > limit) {
    subItems.forEach((item, index) => {
      if (index >= limit) {
        const hidden = item.hidden;
        item.hidden = (...args) => !expanded.value || (hidden == null ? void 0 : hidden(...args));
      }
    });
  }
  const defaultAction = {
    search() {
      var _a2;
      onChange(dataSource);
      (_a2 = schema.onSubmit) == null ? void 0 : _a2.call(schema, toRaw(dataSource));
    },
    reset(data) {
      formRef.value.resetFields(data);
    }
  };
  const buttonsConfig = Array.isArray(buttons) ? { actions: buttons } : { ...buttons };
  buttonsConfig.actions ?? (buttonsConfig.actions = !searchOnChange ? ["search", "reset"] : void 0);
  if ((_a = buttonsConfig.actions) == null ? void 0 : _a.length) {
    if (limit && subItems.length > limit)
      buttonsConfig.actions = [
        {
          label: () => expanded.value ? ["收起 ", h(UpOutlined)] : ["展开 ", h(DownOutlined)],
          attrs: { type: "link" },
          onClick: () => expanded.value = !expanded.value
        },
        ...buttonsConfig.actions
      ];
    subItems.push({
      type: "InfoSlot",
      align: "right",
      span: "auto",
      render: () => h(_sfc_main$v, {
        option: buttonsConfig,
        methods: defaultAction,
        effectData: getEffectData({ table: tableRef, form: formRef })
      })
    });
  }
  const unWatch = watch(formRef, () => {
    onChange(dataSource);
    if (searchOnChange) {
      watch(dataSource, onChange);
    }
    unWatch();
  });
  const formNode = () => h(Controls.Form, {
    option: {
      ...formOption,
      ignoreRules: true,
      dataSource,
      subItems
    },
    ref: formRef,
    onSubmit: defaultAction.search,
    onReset: defaultAction.search
  });
  return { formNode, formRef, ...defaultAction, dataSource };
}
function getBoundingClientRect(element) {
  if (!element || !element.getBoundingClientRect) {
    return 0;
  }
  return element.getBoundingClientRect();
}
function getViewportOffset(element) {
  const doc = document.documentElement;
  const docScrollLeft = doc.scrollLeft;
  const docScrollTop = doc.scrollTop;
  const docClientLeft = doc.clientLeft;
  const docClientTop = doc.clientTop;
  const pageXOffset = window.pageXOffset;
  const pageYOffset = window.pageYOffset;
  const box = getBoundingClientRect(element);
  const { left: retLeft, top: rectTop, width: rectWidth, height: rectHeight } = box;
  const scrollLeft = (pageXOffset || docScrollLeft) - (docClientLeft || 0);
  const scrollTop = (pageYOffset || docScrollTop) - (docClientTop || 0);
  const offsetLeft = retLeft + pageXOffset;
  const offsetTop = rectTop + pageYOffset;
  const left = offsetLeft - scrollLeft;
  const top = offsetTop - scrollTop;
  const clientWidth = window.document.documentElement.clientWidth;
  const clientHeight = window.document.documentElement.clientHeight;
  return {
    left,
    top,
    right: clientWidth - rectWidth - left,
    bottom: clientHeight - rectHeight - top,
    rightIncludeBody: clientWidth - left,
    bottomIncludeBody: clientHeight - top
  };
}
function useTableScroll(option, dataRef, wrapRef, abortController) {
  const debounceRedoHeight = debounce(redoHeight, 100);
  const getScrollRef = ref({});
  let beResize = false;
  const listenResize = () => {
    var _a;
    beResize = true;
    if (abortController) {
      window.addEventListener("resize", debounceRedoHeight, { signal: abortController.signal });
    } else {
      document.addEventListener("redoHeight", debounceRedoHeight);
    }
    getScrollRef.value = (_a = option.attrs) == null ? void 0 : _a.scroll;
    watch(
      () => {
        var _a2;
        return [wrapRef.value, (_a2 = unref(dataRef)) == null ? void 0 : _a2.length];
      },
      () => {
        debounceRedoHeight();
      },
      { flush: "post" }
    );
    const unwatch = watch(
      wrapRef,
      (el) => {
        if (el) {
          el.style.overflow = "hidden";
          const resizeObserver = new ResizeObserver(() => {
            debounceRedoHeight();
          });
          resizeObserver.observe(el);
          unwatch();
        }
      },
      { immediate: true, flush: "post" }
    );
  };
  onUnmounted(() => {
    beResize && document.removeEventListener("redoHeight", debounceRedoHeight);
  });
  function redoHeight() {
    if (!beResize)
      return;
    nextTick(() => {
      calcTableHeight();
    });
  }
  function setHeight(height) {
    getScrollRef.value = {
      y: height,
      x: "100%"
      // scrollToFirstRowOnChange: true,
    };
  }
  async function calcTableHeight() {
    var _a;
    const { maxHeight, inheritHeight, isFixedHeight, resizeHeightOffset } = option;
    const wrapEl = unref(wrapRef);
    if (!wrapEl)
      return;
    const tableEl = wrapEl.querySelector(".ant-table");
    if (!tableEl)
      return;
    await nextTick();
    const outerStyle = getComputedStyle(wrapEl.parentElement);
    const tableView = getViewportOffset(tableEl);
    const wrapView = getViewportOffset(wrapEl);
    const paddingHeight = tableView.left - wrapView.left;
    const outerPadding = (parseInt(outerStyle.marginBottom) || 0) + (parseInt(outerStyle.paddingBottom) || 0);
    let bottomIncludeBody = 0;
    if (wrapEl && inheritHeight) {
      bottomIncludeBody = wrapView.bottomIncludeBody - wrapView.bottom - (tableView.top - wrapView.top);
    } else {
      bottomIncludeBody = tableView.bottomIncludeBody - outerPadding;
    }
    const titleEl = tableEl.querySelector(".ant-table-title");
    const headerHeight = (titleEl == null ? void 0 : titleEl.parentElement) === tableEl ? titleEl.offsetHeight ?? 0 : 0;
    const headEl = tableEl.querySelector(".ant-table-thead ");
    if (!headEl)
      return;
    let headerCellHeight = 0;
    if (headEl) {
      headerCellHeight = headEl.offsetHeight;
    }
    let footerHeight = 0;
    const footerEl = tableEl.querySelector(".ant-table-footer");
    if (footerEl && footerEl.parentElement === tableEl) {
      footerHeight += footerEl.offsetHeight || 0;
    }
    let paginationHeight = 0;
    const paginationEl = wrapEl.querySelector(".ant-pagination");
    if (paginationEl) {
      paginationHeight = paginationEl.offsetHeight + 16;
    }
    let tableHeight = Math.ceil(bottomIncludeBody) - (resizeHeightOffset || 0) - paddingHeight - paginationHeight;
    const innerHeight = maxHeight || tableHeight - footerHeight - headerHeight - headerCellHeight - 1;
    if (maxHeight && isFixedHeight) {
      tableHeight = maxHeight + footerHeight + headerHeight + headerCellHeight + 1;
    }
    if (isFixedHeight) {
      tableEl.style.height = `${tableHeight}px`;
      tableEl.style["overflow-y"] = "hidden";
      if (!inheritHeight) {
        wrapEl.style.height = "unset";
      }
      const tableWrap = wrapEl.querySelector(".ant-table-wrapper");
      tableWrap.style.height = "";
      tableWrap.style["overflow-y"] = void 0;
      if (!(((_a = unref(dataRef)) == null ? void 0 : _a.length) > 0)) {
        const emptyEl = tableEl.querySelector(".ant-empty");
        if (emptyEl) {
          const emptyCell = tableEl.querySelector(".ant-table-tbody .ant-table-cell");
          emptyCell.style.height = `${innerHeight}px`;
        }
        return;
      }
    }
    if (tableEl.scrollHeight > tableHeight) {
      setHeight(innerHeight);
    } else {
      const bodyEl = tableEl.querySelector(".ant-table-body");
      if (bodyEl) {
        setHeight(bodyEl.scrollHeight <= innerHeight ? null : innerHeight);
      }
    }
  }
  return { getScrollRef, redoHeight, debounceRedoHeight, listenResize };
}
const _sfc_main$2 = defineComponent({
  name: "SuperTable",
  inheritAttrs: false,
  props: {
    dataSource: Array,
    schema: Object
  },
  emits: ["register", "load", "update:dataSource"],
  setup(props, ctx) {
    const { style: style2, class: ctxClass, ...ctxAttrs } = ctx.attrs;
    const option = shallowReactive({ attrs: ctxAttrs });
    const dataRef = ref([]);
    const wrapRef = ref();
    const updateSource = (data) => {
      dataRef.value = data;
      ctx.emit("update:dataSource", data);
      if (isRef(option.dataSource)) {
        option.dataSource.value = data;
      }
    };
    watchEffect(() => props.dataSource && updateSource(props.dataSource));
    watchEffect(() => option.dataSource && updateSource(unref(option.dataSource)));
    const searchForm = ref();
    const setOption = (_option) => {
      if (globalConfig.schemaDiagnostics)
        reportSchemaDiagnostics(_option, "table", "SuperTable");
      const { isScanHeight, inheritHeight, isFixedHeight, isContainer, ...attrs } = mergeProps(
        globalProps.Table,
        { ..._option.attrs },
        { ...option.attrs }
      );
      Object.assign(option, { isScanHeight, inheritHeight, isFixedHeight, isContainer }, _option, { attrs });
    };
    watchEffect(() => props.schema && setOption(toRaw(props.schema)));
    const {
      loading,
      pagination,
      setPageData,
      onLoaded,
      goPage,
      reload,
      query,
      throttleRequest,
      cancelQuery,
      setQueryParams,
      getQueryParams
    } = useQuery(option, updateSource);
    const { getScrollRef, redoHeight, listenResize } = useTableScroll(option, dataRef, wrapRef);
    const tableFormRef = shallowRef();
    const exposed = {
      setOption,
      setData: (data) => {
        data && updateSource(data);
      },
      redoHeight,
      goPage,
      reload,
      query,
      onLoaded,
      resetSearchForm(data) {
        try {
          return searchForm.value.formRef.resetFields(data);
        } catch (e) {
          console.warn(e);
        }
      },
      setPageData,
      getQueryParams,
      getData: () => dataRef.value,
      dataRef,
      searchForm: computed(() => {
        var _a;
        return (_a = searchForm.value) == null ? void 0 : _a.formRef;
      }),
      validate: async () => {
        var _a;
        return (_a = tableFormRef.value) == null ? void 0 : _a.validate();
      },
      setColumns: (cols) => {
        var _a;
        if (!initQuery && !((_a = option.columns) == null ? void 0 : _a.length)) {
          Object.assign(option, { columns: cols });
        } else {
          Object.assign(option, { columns: cols });
          updateColumns(cols);
        }
      }
    };
    const tableRef = ref({ ...exposed });
    const register = (comp) => {
      Object.assign(tableRef.value, toRefs(comp), exposed);
      ctx.emit("register", tableRef.value);
    };
    ctx.emit("register", tableRef.value);
    ctx.expose(tableRef.value);
    const tableAttrs = reactive({
      reload,
      onRegister: register,
      loading
    });
    onUnmounted(() => {
      cancelQuery();
      ctx.emit("register", null);
    });
    provide("rootSlots", ctx.slots);
    const slots = ref({});
    const tableSlot = ref();
    const effectData = reactive({ formData: dataRef, current: dataRef, queryParams: computed(getQueryParams) });
    let initQuery = false;
    const unWatch = watch(
      option,
      (opt) => {
        var _a2;
        var _a;
        if (!((_a2 = opt == null ? void 0 : opt.columns) == null ? void 0 : _a2.length))
          return;
        if (tableSlot.value) {
          unWatch();
          return;
        }
        const { columns, maxHeight, isScanHeight = true, inheritHeight } = opt;
        const model = reactive({
          refData: dataRef,
          listData: buildModelsMap(columns)
        });
        slots.value = useInnerSlots(option.slots, effectData, ctx.slots);
        const searchSchema = opt.searchForm || opt.searchSchema;
        const {
          attrs: { onLoad, ...attrs }
        } = render({ option: opt, effectData });
        Object.assign(tableAttrs, attrs, { pagination });
        onLoaded((data) => {
          ctx.emit("load", data);
          onLoad == null ? void 0 : onLoad(data);
        });
        if (searchSchema) {
          searchForm.value = useSearchForm(opt, tableRef, (data) => {
            setQueryParams(data, "form");
            initQuery && throttleRequest();
          });
        }
        const tabsField = opt.tabs && opt.tabs.field;
        if (opt.tabs && tabsField) {
          const tabsKey = (_a = opt.tabs).activeKey ?? (_a.activeKey = ref(opt.tabs.defaultActiveKey));
          const tabParam = {};
          watch(
            tabsKey,
            (key) => {
              if (key === void 0)
                return;
              set(tabParam, tabsField, key);
              setQueryParams(tabParam);
              initQuery && throttleRequest();
            },
            { immediate: true }
          );
        }
        watch(
          ref(opt.params),
          (p) => {
            setQueryParams(p, "dynamic");
            initQuery && throttleRequest();
          },
          { deep: true, immediate: true }
        );
        nextTick(() => {
          initQuery = true;
          if (option.immediate !== false) {
            throttleRequest();
          }
        });
        if (isScanHeight || inheritHeight || maxHeight) {
          listenResize();
          tableAttrs.scroll = getScrollRef;
          const { onChange, onExpandedRowsChange } = tableAttrs;
          tableAttrs.onChange = (...args) => {
            onChange == null ? void 0 : onChange(...args);
          };
          tableAttrs.onExpandedRowsChange = (param) => {
            onExpandedRowsChange == null ? void 0 : onExpandedRowsChange(param);
            redoHeight();
          };
          watch(dataRef, redoHeight);
        }
        const table = () => h(Controls.Table, { option, effectData, model, ...tableAttrs }, slots.value);
        if (option.editable) {
          tableSlot.value = () => h(base.Form, { model: dataRef.value, ref: tableFormRef }, table);
        } else {
          tableSlot.value = table;
        }
      },
      {
        immediate: true
      }
    );
    const updateColumns = (cols) => {
      const model = reactive({
        refData: dataRef,
        listData: buildModelsMap(cols)
      });
      const table = () => h(Controls.Table, { option, effectData, model, key: Symbol(), ...tableAttrs }, slots.value);
      if (option.editable) {
        tableSlot.value = () => h(base.Form, { model: dataRef.value, ref: tableFormRef }, table);
      } else {
        tableSlot.value = table;
      }
    };
    return () => tableSlot.value && h(
      DataProvider,
      { name: "exaProvider", data: { data: dataRef } },
      () => {
        var _a, _b;
        return !searchForm.value || ((_a = option.searchForm) == null ? void 0 : _a.teleport) ? h(
          "div",
          mergeProps(
            {
              ref: wrapRef,
              class: [option.isContainer && "sup-container", "sup-table", "sup-form-section"]
            },
            {
              class: ctxClass,
              style: style2
            }
          ),
          [
            ((_b = option.searchForm) == null ? void 0 : _b.teleport) && h(
              Teleport,
              { to: option.searchForm.teleport },
              h("div", { class: "sup-form-section sup-table-search" }, h(searchForm.value.formNode))
            ),
            tableSlot.value()
          ]
        ) : h(
          "div",
          mergeProps(
            { ref: wrapRef, class: [option.isContainer && "sup-container", "sup-table"] },
            { class: ctxClass, style: style2 }
          ),
          [
            h("div", { class: "sup-form-section sup-table-search" }, h(searchForm.value.formNode)),
            h("div", { class: "sup-form-section section-last" }, h(tableSlot.value))
          ]
        );
      }
    );
  }
});
const useTable = (option, data) => {
  const [tableRef, getTable] = useGetRef();
  const syncOption = Promise.resolve(typeof option === "function" ? option() : option);
  const register = (actions) => {
    if (actions) {
      if (!tableRef.value) {
        syncOption.then(actions.setOption);
        data && actions.setData(data);
      }
      tableRef.value = actions;
    } else if (actions === null) {
      tableRef.value = void 0;
    } else {
      return (props, ctx) => h(_sfc_main$2, { ...props, onRegister: register }, ctx == null ? void 0 : ctx.slots);
    }
  };
  const asyncCall = async (key, ...params) => {
    const form = await getTable();
    if (key && key in form) {
      if (typeof form[key] === "function") {
        return form[key](...params);
      } else {
        return form[key];
      }
    }
  };
  return [
    register,
    {
      /** 异步获取表格引用 */
      getTable,
      tableRef,
      redoHeight() {
        asyncCall("redoHeight");
      },
      setData(data2) {
        asyncCall("setPageData", data2);
      },
      /** 返回当前表格数据 */
      getData() {
        var _a;
        return toValue((_a = tableRef.value) == null ? void 0 : _a.dataRef);
      },
      dataSource: computed(() => {
        var _a;
        return (_a = tableRef.value) == null ? void 0 : _a.dataRef;
      }),
      /** 跳转到指定页 */
      goPage(page) {
        return asyncCall("goPage", page);
      },
      /** 设置表格列 */
      setColumns(cols) {
        asyncCall("setColumns", cols);
      },
      /** 刷新数据，不改动查询条件与当前页 */
      reload() {
        return asyncCall("reload");
      },
      /** 手动执行条件查询，不覆盖搜索表单参数 */
      query(param) {
        return asyncCall("query", param);
      },
      /** 查询完成，返回结果回调 */
      onLoaded(callback) {
        asyncCall("onLoaded", callback);
      },
      /** 重置查询表单，并重新查询 */
      resetSearchForm(param) {
        var _a;
        (_a = tableRef.value) == null ? void 0 : _a.resetSearchForm(param);
      },
      getQueryParams: () => {
        var _a;
        return (_a = tableRef.value) == null ? void 0 : _a.getQueryParams();
      },
      // setQueryParams: (params: Obj) => asyncCall('setQueryParams', params),
      selectedRowKeys: computed(() => {
        var _a;
        return (_a = tableRef.value) == null ? void 0 : _a.selectedRowKeys;
      }),
      selectedRows: computed(() => {
        var _a;
        return (_a = tableRef.value) == null ? void 0 : _a.selectedRows;
      }),
      /** 设置选中行 */
      setSelectedRows: (arr) => {
        var _a;
        return (_a = tableRef.value) == null ? void 0 : _a.setSelectedRows(arr);
      },
      expandedRowKeys: computed(() => {
        var _a;
        return (_a = tableRef.value) == null ? void 0 : _a.expandedRowKeys;
      }),
      setExpandedRowKeys: (arr) => {
        var _a;
        return (_a = tableRef.value) == null ? void 0 : _a.setExpandedRowKeys(arr);
      },
      expandAll() {
        asyncCall("expandAll");
      },
      /** 新增行 */
      add: (param) => {
        var _a;
        return (_a = tableRef.value) == null ? void 0 : _a.add(param);
      },
      /** 修改行，须判断是否已有选中行 */
      edit: (param) => {
        var _a;
        return (_a = tableRef.value) == null ? void 0 : _a.edit(param);
      },
      /** 删除行，须判断是否已有选中行 */
      delete: () => {
        var _a;
        return (_a = tableRef.value) == null ? void 0 : _a.delete();
      },
      /** 查看详情，须判断是否已有选中行 */
      detail: (param) => {
        var _a;
        return (_a = tableRef.value) == null ? void 0 : _a.detail(param);
      },
      asyncCall,
      /** `editable`模式下进行表单校验 */
      validate() {
        return asyncCall("validate");
      }
    }
  ];
};
function defineTable(option) {
  return option;
}
const _sfc_main$1 = defineComponent({
  props: {
    limit: Number,
    buttonType: String,
    buttonShape: String,
    size: String,
    /** 按钮显示方式icon/label */
    labelMode: String,
    hidden: [Boolean, Function],
    /** 无权限时的展示方式，默认隐藏 */
    unauthorized: String,
    /** @deprecated 使用 `unauthorized: 'disable'` */
    invalidDisabled: Boolean,
    disabled: [Boolean, Function],
    actions: Array,
    effectData: Object
  },
  setup(props, { slots }) {
    var _a;
    const slotsNode = (_a = slots.default) == null ? void 0 : _a.call(slots);
    const { effectData, ...config } = props;
    const __actions = !slotsNode ? props.actions : slotsNode.flatMap(({ children, props: props2 = {} }) => {
      const { roleName, onClick, confirmText, tooltip, disabledTooltip, icon, ...attrs } = mapKeys(
        props2,
        (_, key) => camelCase(key)
      );
      if (!onClick || !children)
        return [];
      return {
        label: children.default || children,
        icon,
        tooltip,
        disabledTooltip,
        roleName,
        onClick,
        confirmText,
        attrs
      };
    });
    return () => h(_sfc_main$v, { option: { ...config, actions: __actions }, effectData });
  }
});
function useButtons(option) {
  const vNode = () => h(_sfc_main$1, option);
  return [vNode];
}
const _sfc_main = defineComponent({
  props: {
    dataSource: Object,
    schema: Object
  },
  emits: ["register"],
  setup(props, ctx) {
    var _a;
    const option = shallowRef(props.schema || {});
    const dataRef = ref(((_a = props.schema) == null ? void 0 : _a.dataSource) || {});
    watch(
      () => props.schema,
      (schema) => {
        if (globalConfig.schemaDiagnostics && schema)
          reportSchemaDiagnostics(schema, "detail", "SuperDetail");
        option.value = schema || {};
        if (schema == null ? void 0 : schema.dataSource)
          dataRef.value = schema.dataSource;
      },
      { immediate: true }
    );
    watch(
      () => props.dataSource,
      (data) => {
        data && (dataRef.value = data);
      },
      { immediate: true }
    );
    const exposed = {
      setOption: (_option) => {
        if (globalConfig.schemaDiagnostics)
          reportSchemaDiagnostics(_option, "detail", "SuperDetail");
        option.value = _option;
        _option.dataSource && (dataRef.value = _option.dataSource);
      },
      setData: (data) => {
        dataRef.value = data;
      }
    };
    const modelsMap = ref();
    watch(
      option,
      (opt) => {
        if (!(opt == null ? void 0 : opt.subItems)) {
          modelsMap.value = void 0;
          return;
        }
        const data = buildModelsMap(opt.subItems, dataRef);
        modelsMap.value = data.modelsMap;
      },
      { immediate: true }
    );
    ctx.expose(exposed);
    ctx.emit("register", exposed);
    provide("exaProvider", readonly({ data: dataRef }));
    provide("rootSlots", ctx.slots);
    return () => modelsMap.value && h(
      "div",
      { class: ["sup-detail", option.value.isContainer && "sup-container"] },
      h(DetailLayouts, {
        option: {
          type: "Descriptions",
          ...option.value
        },
        ...option.value.attrs,
        ...option.value.descriptionsProps,
        modelsMap: modelsMap.value,
        isRoot: true
      })
    );
  }
});
function useDetail(option, data) {
  const source = toRef(data);
  const actionsRef = ref();
  const syncOption = Promise.resolve(typeof option === "function" ? option() : option);
  const register = (actions) => {
    if (actions) {
      if (!actionsRef.value) {
        syncOption.then(actions.setOption);
        if (source.value) {
          watch(
            source,
            (_d) => {
              actions.setData(_d);
            },
            { immediate: true }
          );
        }
      }
      actionsRef.value = actions;
    } else {
      return (props) => h(_sfc_main, { ...props, onRegister: register }, useSlots());
    }
  };
  return [
    register,
    {
      setData(data2) {
        if (actionsRef.value) {
          actionsRef.value.setData(data2);
        } else {
          source.value = data2;
        }
      }
    }
  ];
}
function defineDetail(option) {
  return option;
}
export {
  _sfc_main$1 as SuperButtons,
  _sfc_main as SuperDetail,
  _sfc_main$l as SuperForm,
  _sfc_main$2 as SuperTable,
  createModal,
  plugin as default,
  defineDetail,
  defineForm,
  defineTable,
  diagnoseSchema,
  useButtons,
  useDetail,
  useForm,
  useModal,
  useModalForm,
  useTable
};
