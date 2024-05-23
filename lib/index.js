import "./style.css";
import zhCN from "ant-design-vue/es/locale/zh_CN";
import { merge, cloneDeep, isPlainObject, defaults, isArray, uniq, throttle, isFunction, debounce, mapKeys, camelCase } from "lodash-es";
import { h, inject, reactive, ref, unref, watchEffect, toValue, toRef, computed, watch, onMounted, toRefs, mergeProps, markRaw, isRef, defineComponent, openBlock, createBlock, withModifiers, withCtx, createElementBlock, Fragment, renderList, createVNode, normalizeProps, guardReactiveProps, resolveDynamicComponent, createCommentVNode, createTextVNode, toDisplayString, provide, toRaw, readonly, useAttrs, shallowReactive, onUnmounted, nextTick, getCurrentInstance, render as render$1, watchPostEffect, createSlots, normalizeClass, shallowRef, useSlots } from "vue";
import { Modal, Space, Tooltip, Button, Divider, Dropdown, Menu, MenuItem, Card, CheckableTag, Checkbox, CheckboxGroup as CheckboxGroup$1, Col, Collapse, CollapsePanel, DatePicker, Descriptions as Descriptions$1, DescriptionsItem, Form as Form$1, FormItem, Input, InputGroup, InputNumber, InputSearch, List, ListItem, Radio, RadioButton, RadioGroup as RadioGroup$1, RangePicker, Row, Select, Switch as Switch$1, TabPane, Table, Tabs, Tag, Textarea, TimePicker, TreeSelect, Upload, message, FormItemRest, Image } from "ant-design-vue";
import { EllipsisOutlined, PlusOutlined, MinusOutlined, SearchOutlined, CloseCircleOutlined, SyncOutlined, LoadingOutlined, PaperClipOutlined, UploadOutlined } from "@ant-design/icons-vue";
import { nanoid } from "nanoid";
import message$1 from "ant-design-vue/es/message";
import { useForm as useForm$1 } from "ant-design-vue/es/form";
function useIcon(icon) {
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
  const res = ref(!!unref(org));
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
  const { type, field, keepField, computed: __computed, vModelFields } = option;
  if (!field)
    return;
  if (defaultValue !== void 0)
    model.refData ?? (model.refData = toValue(defaultValue));
  const refValue = toRef(model, "refData");
  const tempData = ref(model.refData);
  const updateValue = (val = toValue(defaultValue)) => {
    tempData.value = val;
    if (refValue.value !== val && defaultValue !== void 0)
      refValue.value = val;
  };
  const vModels = {
    value: tempData,
    "onUpdate:value": updateValue
  };
  if (vModelFields) {
    Object.entries(vModelFields).forEach(([name, field2]) => {
      var _a;
      (_a = model.parent)[field2] ?? (_a[field2] = void 0);
      vModels[name] = computed(() => model.parent[field2]);
      vModels[`onUpdate:${name}`] = (val) => {
        model.parent[field2] = val;
      };
    });
  }
  let raw = toValue(tempData);
  let effect;
  if (type === "DateRange" && keepField) {
    tempData.value = [];
    effect = (val) => {
      const [start, end] = val || [];
      refValue.value = start;
      raw = start;
      model.parent[keepField] = end;
    };
    watch([refValue, () => model.parent[keepField]], updateValue);
  } else {
    effect = (value) => {
      refValue.value = value;
      raw = value;
    };
    watch(refValue, updateValue);
  }
  watch(tempData, effect, { flush: "sync" });
  if (__computed) {
    onMounted(
      () => watch(
        // 使用ref让计算结果即使一样也会进行后面的赋值
        () => ref(__computed(raw, effectData)),
        (val) => effect(unref(val))
      )
    );
  }
  return vModels;
}
function render({ option, effectData, inheritDisabled }) {
  const { type, dynamicAttrs: __attrs, disabled: __disabled, hidden: __hidden } = option;
  const hidden = getComputedStatus(__hidden, effectData);
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
  const attrs = merge({}, option.attrs, __merged, { disabled });
  return { attrs, hidden };
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
  } else if (!isNaN(max) && !isNaN(min)) {
    rule = { type, max, min, message: "range" };
  } else if (!isNaN(max)) {
    rule = { type, max, message: "max" };
  } else if (!isNaN(min)) {
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
        message: message2 || `请输入${label}！`
      });
    } else {
      rules.push({ required, trigger, message: message2 || `请添加${label}` });
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
  if (len || !isNaN(Number(max)) || !isNaN(Number(min))) {
    const rule = getRangeRule(type, len, max, min);
    const message22 = formatStr(rule.message, { label, len, max, min });
    rules.push({ ...rule, trigger, message: message22, type });
  }
  if (validator) {
    rules.push({ validator, trigger });
  }
  return rules;
}
function buildModelData(option, parentData, __chain) {
  const { field, keepField = option.labelField, columns, subItems, initialValue } = option;
  const nameArr = field ? field.split(".") : [];
  const propChain = __chain.concat(nameArr);
  const refName = nameArr.splice(-1)[0];
  const model = reactive({
    refName,
    initialValue,
    fieldName: field,
    parent: ref(),
    refData: ref(),
    propChain
  });
  watch(
    parentData,
    (data) => {
      var _a, _b, _c;
      model.parent = data;
      if (refName) {
        nameArr.forEach((name) => {
          var _a2;
          (_a2 = model.parent)[name] ?? (_a2[name] = {});
          model.parent = toRef(model.parent, name);
        });
        if (columns || subItems) {
          (_a = model.parent)[refName] ?? (_a[refName] = toValue(initialValue) ?? (columns ? [] : {}));
        } else {
          (_b = model.parent)[refName] ?? (_b[refName] = toValue(initialValue));
        }
        model.refData = toRef(model.parent, refName);
        if (keepField)
          (_c = model.parent)[keepField] ?? (_c[keepField] = void 0);
      } else {
        model.refData = data;
      }
    },
    { immediate: true, flush: "sync" }
  );
  return model;
}
function buildModelsMap(items, data, propChain = []) {
  const currentData = toRef(data || {});
  const rules = {};
  const modelsMap = /* @__PURE__ */ new Map();
  items.forEach((child) => {
    if (typeof child !== "object")
      return;
    const subModel = buildModelData(child, currentData, propChain);
    const { rules: _rules, label, subItems, columns } = child;
    if (_rules) {
      const _r = Array.isArray(_rules) ? _rules : [_rules];
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
    modelsMap,
    initialData: cloneDeep(currentData.value)
  };
}
function cloneModels(orgModels, data, parentChain = []) {
  const currentData = toRef(data || {});
  const newRules = {};
  const models = [...orgModels].map(([option, model]) => {
    const { children, propChain = [], rules, listData } = model;
    const newModel = buildModelData(option, currentData, parentChain);
    newModel.rules = rules;
    if (propChain.length && rules) {
      newRules[propChain.join(".")] = rules;
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
function cloneModelsFlat(orgMaps, data, chain) {
  const { modelsMap, rules } = cloneModels(orgMaps, data, chain);
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
function resetFields(origin, data = {}, initial = {}) {
  for (const [key, value] of Object.entries(origin)) {
    if (Array.isArray(value)) {
      origin[key] = cloneDeep(data[key] ?? initial[key]);
    } else if (Object.prototype.toString.call(value) === "[object Object]") {
      resetFields(value, data[key], initial[key]);
    } else {
      origin[key] = data[key] ?? initial[key];
    }
  }
}
function setFieldsValue(origin, data, initial = {}) {
  for (const [key, value] of Object.entries(data)) {
    const newData = value ?? initial[key];
    if (Array.isArray(newData)) {
      origin[key] = cloneDeep(newData);
    } else if (Object.prototype.toString.call(newData) === "[object Object]") {
      setFieldsValue(origin[key], newData, initial[key]);
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
  watch(formRef, (form) => {
    if (form) {
      status.resolve(true);
    } else {
      status = usePromise();
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
function useInnerSlots(slots, rootSlots) {
  const __rootSlots = rootSlots || inject("rootSlots", {});
  const innerSlots = { ...slots };
  if (slots) {
    Object.entries(slots).forEach(([key, value]) => {
      innerSlots[key] = typeof value === "string" ? __rootSlots[value] : value;
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
function getViewNode(option, effectData = {}) {
  const {
    type: colType = "",
    viewRender,
    render: render$12,
    options: colOptions,
    dictName,
    labelField,
    keepField,
    valueToNumber,
    valueToLabel
  } = option;
  const rootSlots = inject("rootSlots", {});
  const content = (() => {
    if (labelField) {
      return ({ current } = effectData) => current[labelField];
    } else if (keepField) {
      return ({ current, text } = effectData) => (text || "") + " - " + (current[labelField] || "");
    } else if (colOptions || dictName) {
      if (valueToLabel)
        return;
      if (isPlainObject(colOptions) || typeof (colOptions == null ? void 0 : colOptions[0]) === "string") {
        return ({ text } = effectData) => colOptions[text];
      } else {
        const options = ref();
        if (dictName && globalConfig.dictApi) {
          globalConfig.dictApi(dictName).then((data) => options.value = data);
        } else if (typeof colOptions === "function") {
          Promise.resolve(colOptions(effectData)).then((data) => options.value = data);
        } else {
          options.value = unref(colOptions);
        }
        return ({ text } = effectData) => {
          const arr = Array.isArray(text) ? text : typeof text === "string" ? text.split(",") : [text];
          const labels = arr.map((val) => {
            var _a;
            const item = (_a = options.value) == null ? void 0 : _a.find(({ value }) => (valueToNumber ? Number(value) : value) === val);
            return item ? item.label : val;
          });
          return labels.join(", ");
        };
      }
    } else if (colType === "Switch") {
      return ({ text } = effectData) => (option.valueLabels || "否是")[text];
    } else if (colType === "Buttons") {
      const buttonsSlot = createButtons({ config: option, isView: true });
      return !!buttonsSlot && ((param = effectData) => buttonsSlot({ param }));
    } else
      ;
  })();
  const __render = viewRender || colType === "InfoSlot" && render$12;
  const colRender = typeof __render === "string" ? rootSlots[__render] : __render;
  if (__render && !colRender)
    return false;
  if (colRender || colType === "Upload" || colType.startsWith("Ext")) {
    const slots = useInnerSlots(option.slots);
    return (param = effectData) => {
      const vModels = getVModelProps(option, param.current);
      const {
        attrs: { disabled, ...attrs }
      } = render({ option, effectData: param });
      const props = reactive({
        props: { ...attrs, ...vModels },
        ...param,
        ...content && { text: computed(() => content(param)) }
      });
      return colRender ? colRender(props) : h(
        Controls[colType],
        reactive({ option, effectData: param, ...attrs, ...vModels, value: param.value, isView: true }),
        slots
      );
    };
  } else {
    return content;
  }
}
const getDefault = () => {
  return merge(
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
          return !param.record && !(((_a = param.selectedRowKeys) == null ? void 0 : _a.length) > 0);
        }
      },
      edit: {
        label: "修改",
        disabled: (param) => {
          var _a;
          return !param.record && !(((_a = param.selectedRowKeys) == null ? void 0 : _a.length) === 1);
        }
      },
      detail: {
        label: "查看",
        disabled: (param) => {
          var _a;
          return !param.record && !(((_a = param.selectedRowKeys) == null ? void 0 : _a.length) === 1);
        }
      },
      submit: {
        label: "确定",
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
        merge(actions[key], { attrs: { title: actions[key].label } }, methods[key]);
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
      if (!isCustomLoading) {
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
        if (_onClick && innerMethod) {
          _action(config.confirmText, () => _onClick(param, async (__param = param) => innerMethod(__param)), param);
        } else {
          _action(config.confirmText, () => {
            var _a;
            return (_a = innerMethod || _onClick) == null ? void 0 : _a({ ...param, meta });
          }, param);
        }
      };
      actionBtns.push(config);
    });
  }
  return actionBtns;
}
function useButton(config, param, methods) {
  const { size, buttonShape, buttonType, roleMode, limit = 3, hidden, disabled, actions } = config;
  const defaultAttrs = { size, type: buttonType, shape: buttonShape };
  const dis = useDisabled(disabled, param);
  const isHide = getComputedStatus(hidden, param);
  let actionBtns = mergeActions(actions, methods, defaultAttrs);
  if (globalConfig.buttonRoles) {
    const roles = globalConfig.buttonRoles();
    actionBtns = actionBtns.filter((item) => {
      const isFree = !item.roleName || roles.includes(item.roleName);
      if (!isFree) {
        if ((item.roleMode || roleMode) === "disable") {
          item.disabled = true;
        } else {
          return false;
        }
      }
      return true;
    });
  }
  const allBtns = actionBtns.map((item) => {
    const isHide2 = getComputedStatus(item.hidden, param);
    const disabled2 = item.disabled !== void 0 ? useDisabled(item.disabled, param) : dis;
    const onClick = (e) => {
      var _a;
      e.stopPropagation();
      (_a = item.onClick) == null ? void 0 : _a.call(item, param);
    };
    const _class = item.color && `ant-btn-${item.color}`;
    return { isHide: isHide2, ...item, attrs: { ...defaultAttrs, class: _class, ...item.attrs, disabled: disabled2, onClick } };
  });
  const btns = ref([]);
  const moreBtns = ref([]);
  watchEffect(() => {
    const items = isHide.value ? [] : allBtns.filter(({ isHide: isHide2 }) => !isHide2.value);
    const count = items.length === limit + 1 ? limit + 1 : limit;
    btns.value = items.slice(0, count);
    moreBtns.value = items.slice(count);
  });
  return { btns, moreBtns, defaultAttrs };
}
const _sfc_main$v = /* @__PURE__ */ defineComponent({
  __name: "ButtonGroup",
  props: {
    config: {},
    methods: {},
    param: {}
  },
  setup(__props) {
    const props = __props;
    const { config, methods, param } = props;
    const __config = Array.isArray(config) ? { actions: config } : config;
    const { btns, moreBtns, defaultAttrs } = useButton(__config, reactive(param || {}), methods || __config.methods);
    const isDivider = __config.divider ?? ["link", "text"].includes(__config.buttonType || "");
    const { moreLabel, iconOnly } = __config;
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(Space), {
        class: "sup-buttons",
        onClick: _cache[0] || (_cache[0] = withModifiers(() => {
        }, ["stop"])),
        size: unref(isDivider) ? 0 : "small"
      }, {
        default: withCtx(() => [
          (openBlock(true), createElementBlock(Fragment, null, renderList(unref(btns), ({ attrs, icon, label, tooltip }, index) => {
            return openBlock(), createElementBlock(Fragment, { key: label }, [
              tooltip || unref(iconOnly) && icon ? (openBlock(), createBlock(unref(Tooltip), {
                key: 0,
                title: tooltip || label
              }, {
                default: withCtx(() => [
                  createVNode(unref(Button), normalizeProps(guardReactiveProps(attrs)), {
                    default: withCtx(() => [
                      icon ? (openBlock(), createBlock(resolveDynamicComponent(unref(useIcon)(icon)), { key: 0 })) : createCommentVNode("", true),
                      !icon || !unref(iconOnly) ? (openBlock(), createBlock(resolveDynamicComponent(() => unref(toNode)(label, unref(param))), { key: 1 })) : createCommentVNode("", true)
                    ]),
                    _: 2
                  }, 1040)
                ]),
                _: 2
              }, 1032, ["title"])) : (openBlock(), createBlock(unref(Button), normalizeProps(mergeProps({ key: 1 }, attrs)), {
                default: withCtx(() => [
                  icon ? (openBlock(), createBlock(resolveDynamicComponent(unref(useIcon)(icon)), { key: 0 })) : createCommentVNode("", true),
                  createTextVNode(),
                  (openBlock(), createBlock(resolveDynamicComponent(() => unref(toNode)(label, unref(param)))))
                ]),
                _: 2
              }, 1040)),
              unref(isDivider) && index < unref(btns).length - 1 ? (openBlock(), createBlock(unref(Divider), {
                key: 2,
                type: "vertical",
                class: "buttons-divider"
              })) : createCommentVNode("", true)
            ], 64);
          }), 128)),
          unref(moreBtns).length ? (openBlock(), createBlock(unref(Dropdown), { key: 0 }, {
            overlay: withCtx(() => [
              createVNode(unref(Menu), null, {
                default: withCtx(() => [
                  (openBlock(true), createElementBlock(Fragment, null, renderList(unref(moreBtns), ({ attrs, icon, label }) => {
                    return openBlock(), createBlock(unref(MenuItem), {
                      key: label,
                      disabled: attrs.disabled
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(Button), mergeProps({ block: "" }, attrs, { shape: "" }), {
                          default: withCtx(() => [
                            icon ? (openBlock(), createBlock(resolveDynamicComponent(unref(useIcon)(icon)), { key: 0 })) : createCommentVNode("", true),
                            createTextVNode(" " + toDisplayString(label), 1)
                          ]),
                          _: 2
                        }, 1040)
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
                  unref(moreLabel) ? (openBlock(), createBlock(resolveDynamicComponent(() => unref(toNode)(unref(moreLabel), unref(param))), { key: 0 })) : (openBlock(), createBlock(unref(EllipsisOutlined), { key: 1 }))
                ]),
                _: 1
              }, 16)
            ]),
            _: 1
          })) : createCommentVNode("", true)
        ]),
        _: 1
      }, 8, ["size"]);
    };
  }
});
function createButtons({ config, methods, params, isView }) {
  const buttons = Array.isArray(config) ? { actions: config } : config;
  if (!buttons || isView && buttons.validOn === "form" || !isView && buttons.validOn === "detail")
    return;
  let actions = buttons.actions || [];
  if (!buttons.validOn) {
    buttons.actions = actions = actions.filter((item) => {
      if (typeof item === "string") {
        return !isView;
      } else {
        const validOn = item.validOn;
        if (isView) {
          return validOn === "both" || validOn === "detail";
        } else {
          return validOn !== "detail";
        }
      }
    });
  }
  if (actions.length === 0)
    return;
  return (props = {}) => h(_sfc_main$v, { config: buttons, methods, param: params, ...props });
}
const _base = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Button,
  Card,
  CheckableTag,
  Checkbox,
  CheckboxGroup: CheckboxGroup$1,
  Col,
  Collapse,
  CollapsePanel,
  DatePicker,
  Descriptions: Descriptions$1,
  DescriptionsItem,
  Form: Form$1,
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
  RadioGroup: RadioGroup$1,
  RangePicker,
  Row,
  Select,
  Space,
  Switch: Switch$1,
  TabPane,
  Table,
  Tabs,
  Tag,
  Textarea,
  TimePicker,
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
    const nodes = [];
    let currentGroup;
    [...props.model.children].forEach(([option, subData], idx) => {
      const { type, label, align, blocked, span, hideInForm, labelSlot } = option;
      if (type === "Hidden" || hideInForm)
        return;
      const colProps = { ...option.colProps, span };
      defaults(colProps, { span: presetSpan }, globalProps.Col, { span: 8 });
      if (colProps.span === 0 || colProps.flex) {
        colProps.span = void 0;
      }
      const { parent, refData } = toRefs(subData);
      const effectData = getEffectData({
        ...props.effectData,
        current: parent,
        field: subData.refName,
        value: subData.refName ? refData : void 0
      });
      const { hidden, attrs } = render({
        option,
        effectData,
        inheritDisabled: inheritOptions.disabled
      });
      const innerNode = buildInnerNode(option, subData, effectData, attrs);
      if (!innerNode)
        return;
      if (parentType === "InputGroup" && (parentAttrs == null ? void 0 : parentAttrs.compact) !== false) {
        const width = (100 / (24 / colProps.span)).toFixed(2) + "%";
        nodes.push(() => h(innerNode, { style: `width:${width};` }));
        return;
      }
      let node = innerNode;
      const independent = [...containers, "InputList", "InputGroup"].includes(type);
      if (!independent && (option.field || !blocked)) {
        const rules = computed(() => unref(attrs.disabled) ? void 0 : subData.rules);
        const formItemAttrs = mergeProps(globalProps.FormItem, option.formItemProps);
        const _label = labelSlot || label;
        const _slots = { default: innerNode };
        _label !== void 0 && (_slots.label = () => toNode(_label, effectData));
        node = () => h(base.FormItem, reactive({ ...formItemAttrs, name: subData.propChain, rules, colon: !!_label }), _slots);
      }
      if (independent) {
        const inheritOptions2 = {
          disabled: attrs.disabled,
          subSpan: option.subSpan ?? presetSpan
        };
        node = () => h(DataProvider, { name: "inheritOptions", data: inheritOptions2 }, innerNode);
      }
      const __isBlock = blocked ?? (containers.includes(type) && !option.span);
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
          colProps.span = 24;
        }
        if (!currentGroup) {
          nodes.push(currentGroup = []);
        }
        currentGroup.push(() => !hidden.value && h(Col, mergeProps({ style: alignStyle, key: idx }, colProps), node));
        if (option.wrapping)
          currentGroup = void 0;
      }
    });
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
  const { type, render: render2 } = option;
  const rootSlots = inject("rootSlots", {});
  const slots = useInnerSlots(option.slots);
  const renderSlot = render2 ? typeof render2 === "function" ? render2 : rootSlots[render2] : Controls[type];
  let node;
  if (type === "Text" || type === "InfoSlot") {
    node = renderSlot ? () => renderSlot({ props: attrs, ...effectData }) : () => h("span", attrs, model.refData);
  } else if (type === "Buttons") {
    node = () => h(_sfc_main$v, { config: option, param: effectData });
  } else if (containers.includes(type) || type === "InputList") {
    node = () => h(Controls[type], reactive({ option, model, effectData, ...attrs }), slots);
  } else {
    const valueProps = useVModel({ option, model, effectData });
    const allAttrs = { ...attrs, ...valueProps };
    if (!renderSlot) {
      console.error(`组件 '${type}' 配置错误，请检查名称或'render'是否正确！`);
    } else if (type === "InputSlot") {
      node = () => renderSlot == null ? void 0 : renderSlot(reactive({ props: allAttrs, ...effectData }));
    } else if (type.startsWith("Ext")) {
      node = () => h(renderSlot, reactive({ option, effectData, ...allAttrs }), slots);
    } else {
      node = () => h(renderSlot, reactive({ option, model, effectData, ...allAttrs }), slots);
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
        { class: ["sup-form sup-detail", ((_a = ctx.attrs) == null ? void 0 : _a.isContainer) && "sup-container"] },
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
      ...descriptionsProps
    } = gridConfig;
    let colNum = column || (Number(subSpan) ? Math.floor(24 / subSpan) : gridConfig.column);
    colNum ?? (colNum = Number(gridConfig.subSpan) ? Math.floor(24 / gridConfig.subSpan) : 2);
    const rowGroup = function() {
      const group = [];
      let current = [];
      let n = 0;
      props.items.forEach(({ option, label, content, hidden }, idx) => {
        const { span = option.span } = option.descriptionsProps || {};
        let ceil = Number(span) ? Math.ceil(span / (24 / colNum)) : 1;
        ceil = ceil > colNum ? colNum : ceil;
        const attrs = { ...descriptionsProps, ...option.formItemProps, ...option.descriptionsProps };
        const labelStyle = mergeProps(attrs.labelAlign ? { textAlign: attrs.labelAlign } : {}, attrs.labelStyle);
        const item = {
          labelCol: mergeProps({ style: labelStyle, class: { "sup-label-no-colon": attrs.noColon } }, attrs.labelCol),
          wrapperCol: mergeProps({ style: attrs.contentStyle }, attrs.wrapperCol),
          option,
          attrs,
          span,
          label,
          content,
          hidden,
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
        if (option.wrapping) {
          group.push(current);
          n = 0;
          current = [];
        }
        if (idx === props.items.length - 1 && current.length) {
          group.push(current);
        }
      });
      return group;
    }();
    if (mode === "table") {
      let colorStyle = "";
      borderColor && (colorStyle += `--descriptions-border-color:${borderColor};`);
      labelBgColor && (colorStyle += `--descriptions-bg-color:${labelBgColor};`);
      const rows = () => layout === "vertical" ? rowGroup.flatMap((group) => [
        (group.length > 1 || group[0].label) && h(
          "tr",
          { class: "ant-descriptions-row" },
          group.map(
            (item) => {
              var _a;
              return !unref(item.hidden) && h(
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
            (item) => !unref(item.hidden) && h(
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
        rowGroup.map(
          (group, idx) => h(
            "tr",
            { class: "ant-descriptions-row" },
            group.flatMap(
              (item) => !unref(item.hidden) && (!item.label ? [
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
              ])
            )
          )
        )
      );
      return () => h(
        "div",
        {
          style: colorStyle,
          class: [
            "ant-descriptions-view",
            "ant-descriptions-bordered",
            size !== "default" && "ant-descriptions-" + size
          ]
        },
        h("table", {}, rows())
      );
    } else {
      const render2 = () => rowGroup.map(
        (group) => h(
          Row,
          { class: "ant-descriptions-row", ...rowProps },
          () => group.map(({ option, content, span, label, labelCol, wrapperCol, hidden, attrs }) => {
            if (unref(hidden))
              return null;
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
                  () => !attrs.noInput && mode === "form" && label ? h("div", { class: "sup-descriptions-item-input" }, content()) : content()
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
            "ant-descriptions-view",
            layout === "vertical" && "ant-descriptions-vertical",
            mode === "form" ? "sup-descriptions-mode-form" : "sup-descriptions-default",
            colon === false && "ant-descriptions-item-no-colon",
            size && size !== "default" && "ant-descriptions-" + size
          ]
        },
        render2()
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
    isRoot: Boolean
  },
  setup({ option, modelsMap, isRoot }, ctx) {
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
    const provideData = {
      ...config,
      subSpan: option.subSpan ?? config.subSpan,
      rowProps,
      ...attrs
    };
    const presetSpan = provideData.subSpan ?? (provideData.subSpan = ((_a = globalProps.Col) == null ? void 0 : _a.span) ?? 12);
    const nodes = buildNodes(modelsMap, option);
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
    if (isRoot && nodeGroup.length === 1) {
      return () => h(
        Controls.Group,
        {
          class: "sup-form-section",
          option,
          model: {},
          effectData: getEffectData({}),
          isView: true
        },
        { innerContent: content }
      );
    } else {
      return content;
    }
  }
});
function buildNodes(modelsMap, preOption, config) {
  const nodes = [];
  let currentGroup;
  const rootSlots = inject("rootSlots", {});
  [...modelsMap].forEach(([option, model], idx) => {
    var _a;
    const { type, label, field, labelSlot = label, hideInDescription, viewRender } = option;
    if (type === "Hidden" || hideInDescription)
      return;
    const effectData = getEffectData({
      current: toRef(model, "parent"),
      index: idx,
      field,
      value: toRef(model, "refData"),
      text: toRef(model, "refData")
    });
    const { attrs, hidden } = render({ option, effectData });
    const slots = useInnerSlots(option.slots);
    const __label = labelSlot && (() => toNode(labelSlot, effectData));
    let isBlock = option.blocked;
    let wrapNode;
    let node;
    if (model.children || model.listData) {
      const __viewRender = typeof viewRender === "string" ? rootSlots[viewRender] : viewRender;
      wrapNode = __viewRender && (() => toNode(__viewRender, effectData));
      const modelsMap2 = model.children || ((_a = model.listData) == null ? void 0 : _a.modelsMap);
      if (type === "InputGroup") {
        if (!viewRender) {
          let isBreak = option.wrapping;
          const contents = [...modelsMap2].map(([opt, model2]) => {
            const labelSlot2 = opt.labelSlot || opt.label;
            const showLabel = (attrs == null ? void 0 : attrs.compact) === false && labelSlot2;
            const content = getContent(opt, model2);
            isBreak = opt.wrapping || isBreak;
            return () => h("span", [showLabel && toNode(labelSlot2, effectData), showLabel && ": ", content == null ? void 0 : content()]);
          });
          wrapNode = () => h(Space, { direction: isBreak ? "vertical" : "horizontal" }, () => contents.map((node2) => node2()));
        }
        node = {
          option,
          label: __label,
          hidden,
          content: wrapNode
        };
      } else {
        isBlock ?? (isBlock = !option.span);
        const viewType = [...containers, "InputList"].includes(type) ? type : "Group";
        const Control = Controls[viewType];
        const defRender = () => h(Control, reactive({ option, model, effectData, isView: true, ...globalProps[viewType], ...attrs }), slots);
        wrapNode ?? (wrapNode = defRender);
        if (type === "InputList") {
          if (!isBlock || labelSlot && !(attrs == null ? void 0 : attrs.labelIndex)) {
            node = {
              option: { ...option },
              label: __label,
              hidden,
              content: wrapNode
            };
          } else {
            wrapNode = defRender;
          }
        }
      }
    } else {
      const content = getContent(option, model);
      node = content && {
        option,
        label: __label,
        hidden,
        content
      };
    }
    let blockNode;
    if (node) {
      if (isBlock) {
        if (option.label) {
          blockNode = { option: preOption, isBlock, group: [node] };
        } else {
          const style2 = option.align && { textAlign: option.align };
          blockNode = { option: preOption, isBlock, node: () => h(node.content, { style: style2 }) };
        }
      } else {
        if (!currentGroup) {
          currentGroup = [];
          nodes.push({ option: preOption, isBlock: true, group: currentGroup });
        }
        currentGroup.push(node);
      }
    } else if (wrapNode) {
      blockNode = { option, isBlock, node: wrapNode, hidden };
    }
    if (blockNode) {
      currentGroup = void 0;
      nodes.push(blockNode);
    }
  });
  return nodes;
}
function getContent(option, model) {
  const { parent, refData } = toRefs(model);
  const value = model.refName ? refData : void 0;
  const effectData = getEffectData({ current: parent, text: value, value, field: model.refName });
  const content = getViewNode(option, effectData);
  return content === false ? void 0 : () => content ? content() : model.refData;
}
const _sfc_main$t = defineComponent({
  props: {
    option: { type: Object, required: true },
    model: { type: Object, required: true },
    effectData: Object,
    isView: Boolean
  },
  setup({ option, model, effectData, isView }, ctx) {
    const { type, label, title = label, buttons } = option;
    const _isView = type === "Descriptions" || isView;
    let buttonsSlot;
    if (buttons) {
      const _buttons = Array.isArray(buttons) ? { actions: buttons } : buttons;
      if (type === "Descriptions") {
        _buttons.validOn ?? (_buttons.validOn = "detail");
      }
      buttonsSlot = createButtons({ config: _buttons, params: effectData, isView: _isView });
    }
    const slots = {
      ...ctx.slots,
      title: title ? () => toNode(title, effectData) : void 0,
      actions: buttonsSlot,
      default: ctx.slots.innerContent || (_isView ? () => h(DetailLayouts, { option: { descriptionsProps: option.attrs, ...option }, modelsMap: model.children }) : () => h(Collections, { option, model, effectData }))
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
    } else if (title || buttonsSlot) {
      return () => h("div", {}, [
        (title || titleButton) && h(Row, { align: "middle", class: "ant-descriptions-header" }, () => [
          title && h(Col, { class: "sup-title" }, slots.title),
          titleButton == null ? void 0 : titleButton()
        ]),
        slots.default(),
        bottomButton && bottomButton()
      ]);
    } else if (ctx.slots.innerContent) {
      return () => h("div", slots.default());
    } else {
      return slots.default;
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
    source: {
      type: Object
    },
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
  // emits: ['register', 'submit', 'reset'],
  setup(props, { expose, emit, slots: ctxSlots }) {
    const formRef = ref();
    const modelData = ref(props.source || {});
    const {
      option: { onSubmit, onReset, ...option },
      ignoreRules,
      compact
    } = props;
    const { modelsMap, initialData } = buildModelsMap(option.subItems, modelData);
    const effectData = reactive({ formData: modelData, current: modelData });
    const { attrs } = render({ option, effectData });
    const submitHandlers = /* @__PURE__ */ new Set();
    const submitRegister = (fn) => {
      fn && submitHandlers.add(fn);
    };
    submitRegister(onSubmit);
    provide("exaProvider", {
      data: readonly(modelData),
      attrs,
      onSubmit: submitRegister
    });
    const submitValidate = (data) => Promise.all(
      [...submitHandlers].map(async (fn) => {
        const validate = await fn(data);
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
        var _a;
        (_a = formRef.value) == null ? void 0 : _a.clearValidate();
        return setFieldsValue(modelData.value, data, initialData);
      },
      resetFields(data = {}) {
        var _a;
        resetFields(modelData.value, data, initialData);
        (_a = formRef.value) == null ? void 0 : _a.clearValidate();
        const cloneData = cloneDeep(modelData.value);
        emit("reset", cloneData);
        return onReset ? onReset(cloneData) : cloneData;
      }
    };
    watch(
      () => props.source,
      (data) => {
        var _a;
        if (data) {
          (_a = formRef.value) == null ? void 0 : _a.clearValidate();
          modelData.value = data;
        }
      }
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
        class: ["sup-form", compact && "sup-form-compact"],
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
const style0 = {
  "table-form-item": "_table-form-item_1f50l_1"
};
const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const cssModules = {
  "$style": style0
};
const Form = /* @__PURE__ */ _export_sfc(_sfc_main$s, [["__cssModules", cssModules]]);
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
    const { option, model, compact } = props;
    const { field, label, labelSlot, slots } = option;
    const formItemContext = ref();
    let ruleObj = model.rules;
    let _propChain = model.propChain;
    const extProps = {};
    if (model.children && compact) {
      if (field) {
        const rule = {
          type: "object",
          required: false,
          fields: {}
        };
        model.children.forEach((val) => {
          if (val.rules && val.fieldName) {
            if (val.rules[0].required)
              rule.required = true;
            rule.fields[val.fieldName] = val.rules;
          }
        });
        ruleObj = [rule];
        watch(
          () => model.refData,
          () => formItemContext.value.onFieldChange(),
          { deep: true }
        );
      } else {
        const { rules: rules2, propChain, refName } = [...model.children.values()].find((val) => !!val.rules) || {};
        if (refName) {
          ruleObj = rules2;
          _propChain = propChain;
          watch(
            () => model.refData[refName],
            () => formItemContext.value.onFieldChange()
          );
        }
      }
    } else {
      if (ruleObj) {
        watch(
          () => model.refData,
          () => formItemContext.value.onFieldChange()
        );
      }
      extProps.style = "margin: 0";
    }
    const rules = computed(() => props.disabled ? void 0 : ruleObj);
    const formItemAttrs = mergeProps(globalProps.FormItem, option.formItemProps, extProps);
    return () => h(
      base.FormItem,
      { ...formItemAttrs, rules: rules.value, ref: formItemContext, name: _propChain },
      {
        label: () => toNode(labelSlot || label, props.effectData),
        default: (slots == null ? void 0 : slots.default) || (() => h(
          FormItemRest,
          () => h(base.InputGroup, { compact, ...attrs }, () => h(Collections, { option, model }))
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
  setup(props, ctx) {
    const { model, option, isView, effectData, labelIndex } = props;
    const { columns, rowButtons, label, labelSlot, slots: optionSlots, ..._option } = option;
    const { modelsMap: childrenMap, initialData } = model.listData;
    const isSingle = columns.length === 1 && columns[0].field === "$index";
    const __initialData = isSingle ? initialData.$index : toRaw(initialData);
    const isFormItem = !labelIndex && (label || labelSlot);
    const { propChain, rules } = model;
    const orgList = toRef(model, "refData");
    const methods = {
      add: {
        onClick({ index }) {
          orgList.value.splice(index + 1, 0, cloneDeep(__initialData));
          orgList.value = [...toRaw(orgList.value)];
        },
        label: () => h(PlusOutlined)
      },
      delete: {
        disabled: () => orgList.value.length === 1,
        confirmText: "",
        label: () => h(MinusOutlined),
        onClick({ index }) {
          orgList.value = toRaw(orgList.value).filter((_, idx) => idx !== index);
        }
      }
    };
    const rowButtonsConfig = !isView && rowButtons !== false && {
      type: "Buttons",
      buttonType: "link",
      size: "small",
      colProps: { flex: "0" },
      methods,
      actions: ["add", "delete"],
      ...Array.isArray(rowButtons) ? { actions: rowButtons } : rowButtons
    };
    const groupOption = {
      ..._option,
      type: "InputGroup",
      label,
      labelSlot,
      subSpan: option.subSpan ?? "auto",
      attrs: {
        compact: false
      }
    };
    const listItems = ref([]);
    watch(
      orgList,
      (list) => {
        if (list.length === 0) {
          list.push(cloneDeep(__initialData));
        }
        listItems.value = list.map((record, idx) => {
          const refData = toRef(orgList.value, idx);
          let itemOption = { ...columns[0] };
          let itemModel;
          if (isSingle) {
            itemModel = {
              ...childrenMap.get(columns[0]),
              refName: String(idx),
              parent: orgList,
              refData,
              propChain: [...propChain, idx]
            };
          } else {
            const cloneChild = cloneModels(childrenMap, record, [...propChain, idx]).modelsMap;
            if (cloneChild.size === 1) {
              itemModel = cloneChild.get(columns[0]);
            } else {
              itemOption = { ...groupOption };
              itemModel = { parent: orgList, refData, children: cloneChild };
              if (!labelIndex) {
                itemOption = { type: "Group", span: "auto" };
              }
            }
          }
          if (labelIndex) {
            itemOption.label ?? (itemOption.label = label);
            itemOption.labelSlot ?? (itemOption.labelSlot = (label || itemOption.label) + String(idx + 1));
          }
          const children = /* @__PURE__ */ new Map([[itemOption, reactive(itemModel)]]);
          rowButtonsConfig && children.set(rowButtonsConfig, { parent: orgList });
          return {
            children,
            effectData: reactive({ ...effectData, current: orgList, field: idx, index: idx, record: refData })
          };
        });
      },
      {
        immediate: true
      }
    );
    const render2 = () => {
      return listItems.value.map(({ children, effectData: effectData2 }, idx) => {
        return h(Collections, { model: { parent: orgList, children }, option, effectData: effectData2, key: effectData2 });
      });
    };
    ({ ...ctx.slots });
    if (isView) {
      if (isFormItem) {
        if (isSingle) {
          const { wrapping, label: label2, labelSlot: labelSlot2 = label2 } = columns[0];
          return () => h(
            Space,
            { direction: wrapping ? "vertical" : "horizontal" },
            () => listItems.value.map(({ children: children2, effectData: effectData2 }) => {
              return h("span", [toNode(labelSlot2, effectData2), labelSlot2 ? ": " : "", effectData2.record]);
            })
          );
        } else {
          return () => listItems.value.map(({ children: children2, effectData: effectData2 }) => {
            return h(DetailLayouts, { modelsMap: children2, option, effectData: effectData2 });
          });
        }
      }
      const attrs = {};
      const children = computed(() => {
        return new Map(listItems.value.flatMap(({ children: children2 }) => [...children2]));
      });
      return () => h(DetailLayouts, { option: groupOption, modelsMap: children.value, key: Date(), ...attrs });
    } else if (isFormItem) {
      const children = /* @__PURE__ */ new Map([[{ ...groupOption, slots: { default: render2 } }, model]]);
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
        config: buttons,
        param: effectData
      }),
      default: () => isView ? h(DetailLayouts, {
        option,
        modelsMap: model.children
      }) : h(Collections, {
        option,
        model
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
    const { modelsMap: childrenMap, initialData, rules } = model.listData;
    const { propChain } = model;
    const orgList = toRef(model, "refData");
    const attrs = useAttrs();
    const rowKey = attrs.rowKey || "id";
    const methods = {
      add() {
        orgList.value.push(cloneDeep(initialData));
      },
      delete({ record }) {
        const orgIdx = orgList.value.indexOf(record);
        orgList.value.splice(orgIdx, 1);
      }
    };
    const listItems = ref([]);
    watch(
      () => [...orgList.value],
      (org) => {
        listItems.value = org.map((record, idx) => {
          const hash = record[rowKey] || nanoid(12);
          record[rowKey] = hash;
          const { modelsMap } = cloneModels(childrenMap, record, [...propChain, idx]);
          return {
            hash,
            model: { refData: ref(record), children: modelsMap },
            effectData: reactive({ ...effectData, current: toRef(model, "refData"), index: idx, record })
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
      const slotName = buttonsConfig["forSlot"] || "extra";
      const orgSlot = slots[slotName];
      const buttonsSlot = createButtons({
        config: buttonsConfig,
        params: effectData,
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
      ...Array.isArray(rowButtons) ? { actions: rowButtons } : rowButtons
    };
    __slots.renderItem = ({ item }) => h(
      base.ListItem,
      { key: item.hash },
      {
        default: () => {
          var _a;
          return [
            isView ? h(DetailLayouts, { option, modelsMap: item.model.children }) : h(Collections, { model: item.model, option, class: "ant-list-item-meta" }),
            rowButtonsConfig && ((_a = createButtons({
              config: rowButtonsConfig,
              methods,
              params: item.effectData,
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
    const { modelsMap: childrenMap, initialData, rules } = model.listData;
    const { propChain } = model;
    const orgList = toRef(model, "refData");
    const methods = {
      add: {
        label: () => h(PlusOutlined),
        onClick({ index }) {
          orgList.value.splice(index + 1, 0, cloneDeep(initialData));
          orgList.value = [...toRaw(orgList.value)];
        }
      },
      delete: {
        hidden: () => orgList.value.length === 1,
        disabled: false,
        confirmText: "",
        label: () => h(MinusOutlined),
        onClick({ index }) {
          orgList.value = orgList.value.filter((_, idx) => idx !== index);
        }
      }
    };
    const rowButtonsConfig = !isView && rowButtons !== false && {
      type: "Buttons",
      buttonType: "link",
      size: "small",
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
          list.push(cloneDeep(initialData));
        }
        listItems.value = list.map((record, idx) => {
          const raw = toRaw(record);
          if (!keyMap.has(raw)) {
            keyMap.set(raw, record[rowKey] || nanoid(12));
          }
          const { modelsMap } = cloneModels(childrenMap, record, [...propChain, idx]);
          return {
            key: keyMap.get(raw),
            model: { refData: ref(record), children: modelsMap },
            effectData: reactive({ ...effectData, current: orgList, index: idx, record })
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
    return () => listItems.value.map(({ model: model2, effectData: effectData2, key }, idx) => {
      return h(Controls.Group, { model: model2, option: groupOption, effectData: effectData2, key: key + idx, isView }, ctx.slots);
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
      isView
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
        current: toRef(model2, "refData")
      });
      const {
        hidden,
        attrs
      } = render({
        option: option2,
        effectData
      });
      const tabKey = key || field || String(idx);
      const tabLabel = () => [useIcon(icon), toNode(label, effectData)];
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
        model: model2
      };
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(Tabs2), {
        activeKey: activeKey.value,
        "onUpdate:activeKey": _cache[0] || (_cache[0] = ($event) => activeKey.value = $event)
      }, {
        rightExtra: withCtx(() => [!_ctx.isView && _ctx.option.buttons ? (openBlock(), createBlock(unref(_sfc_main$v), {
          key: 0,
          config: _ctx.option.buttons
        }, null, 8, ["config"])) : createCommentVNode("", true)]),
        default: withCtx(() => [(openBlock(true), createElementBlock(Fragment, null, renderList(unref(panes), ({
          attrs,
          hidden,
          option: option2,
          model: model2
        }) => {
          return openBlock(), createElementBlock(Fragment, {
            key: attrs.key
          }, [!hidden.value ? (openBlock(), createBlock(unref(TabPane2), normalizeProps(mergeProps({
            key: 0
          }, attrs)), {
            default: withCtx(() => [_ctx.isView ? (openBlock(), createBlock(unref(DetailLayouts), {
              key: 0,
              option: option2,
              modelsMap: model2.children
            }, null, 8, ["option", "modelsMap"])) : (openBlock(), createBlock(unref(Collections), {
              key: 1,
              option: option2,
              model: model2
            }, null, 8, ["option", "model"]))]),
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
    config: Object,
    model: Object,
    isContainer: Boolean
  },
  emits: ["register"],
  setup(props, ctx) {
    var _a;
    const formData = ref({});
    const formRef = ref();
    const formOption = shallowReactive({
      ...props.config,
      // ...others,
      attrs: mergeProps({ ...globalProps.Form }, { ...(_a = props.config) == null ? void 0 : _a.attrs })
    });
    const actions = {
      setOption: (_option) => {
        merge(formOption, props.config, _option);
        formOption.attrs = mergeProps({ ...globalProps.Form }, { ...formOption.attrs });
        if (formOption.model) {
          formData.value = formOption.model;
          delete formOption.model;
        }
      },
      setData: (data) => {
        data && (formData.value = data);
      }
    };
    provide("rootSlots", ctx.slots);
    watchEffect(() => actions.setData(props.model));
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
        source: formData.value,
        onRegister: register,
        class: { "sup-container": isContainer.value }
      },
      useInnerSlots(formOption.slots, ctx.slots)
    );
    return formNode;
  }
});
function useForm(option, data) {
  const [formRef, getForm] = useGetRef();
  const syncOption = Promise.resolve(typeof option === "function" ? option() : option);
  const register = (actions, ref2) => {
    if (actions) {
      if (!formRef.value) {
        syncOption.then(actions.setOption);
        if (data) {
          watchEffect(() => actions.setData(data));
        }
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
      setFieldsValue: (data2) => asyncCall("setFieldsValue", data2),
      /**
       * @deprecated 使用`resetFields`
       */
      setData(data2) {
        asyncCall("resetFields", data2);
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
  const footer = buttons && (() => h(_sfc_main$v, { config: buttons, param: { modalRef } }));
  const confirmLoading = ref(false);
  const onOk = () => {
    var _a;
    confirmLoading.value = true;
    return Promise.resolve((_a = config.onOk) == null ? void 0 : _a.call(config)).then(() => {
      visible.value = false;
    }).catch((err) => console.error(err)).finally(() => confirmLoading.value = false);
  };
  const titleSlot = () => config.icon ? [useIcon(config.icon), toNode(config.title)] : toNode(config.title);
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
    { footer, title: titleSlot, ...ctx == null ? void 0 : ctx.slots, default: content }
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
  const wrap = document.createDocumentFragment();
  let vm;
  const destroy = () => {
    render$1(null, wrap);
    vm = null;
  };
  onUnmounted(() => {
    vm && destroy();
  });
  const open = (option) => {
    var _a, _b;
    if (modalRef.value) {
      return openModal(option);
    } else {
      const ins = getCurrentInstance();
      vm = createVNode(modalSlot);
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
  return { openModal, closeModal: modal.closeModal, formActions: form };
}
const style$1 = {
  "table-form-item": "_table-form-item_1f50l_1"
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
      const form = useForm$1(editData, ref(rules));
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
  rowKey,
  listener
}) {
  const newItems = ref([]);
  const list = ref([]);
  watch(() => [...orgList.value], (org) => {
    list.value = org.concat(newItems.value);
  }, {
    immediate: true
  });
  watch(() => [...newItems.value], (items) => {
    list.value = orgList.value.concat(items);
  });
  const {
    getEditInfo,
    setEditInfo
  } = createEditCache(childrenMap);
  const methods = {
    add() {
      const item = {
        [rowKey]: nanoid(12)
      };
      newItems.value.push(item);
      setEditInfo(item, {
        isEdit: true,
        isNew: true
      });
    },
    edit({
      record,
      selectedRows
    }) {
      const data = record || selectedRows[0];
      setEditInfo(toRaw(data), {
        isEdit: true
      });
    },
    delete({
      record,
      selectedRows
    }) {
      const items = record ? [record] : selectedRows;
      return listener.onDelete(items);
    }
  };
  const editActions = [{
    label: "保存",
    onClick: ({
      record
    }) => {
      const editInfo = getEditInfo(record);
      editInfo.form.validate().then(() => {
        const raw = toRaw(editInfo.form.modelRef);
        if (editInfo.isNew) {
          newItems.value.splice(newItems.value.indexOf(record), 1);
          Object.assign(record, raw);
          listener.onSave(record).then(() => {
            newItems.value.splice(newItems.value.indexOf(record), 1);
            editInfo.isNew = false;
            editInfo.isEdit = false;
          });
        } else {
          listener.onUpdate(raw, record).then(() => {
            editInfo.isEdit = false;
          });
        }
      }).catch((err) => {
        console.log("error", err);
        message$1.error(err.errorFields[0].errors[0]);
      });
    }
  }, {
    label: "取消",
    onClick: ({
      record
    }) => {
      const editInfo = getEditInfo(record);
      if (editInfo.isNew) {
        newItems.value.splice(newItems.value.indexOf(record), 1);
      }
      editInfo.isEdit = false;
    }
  }];
  const editButtonsSlot = (param, config) => {
    const editInfo = getEditInfo(param.record);
    return editInfo.isEdit ? h(_sfc_main$v, {
      key: "edit",
      config: {
        ...config,
        actions: editActions
      },
      param
    }) : null;
  };
  const InputNode = /* @__PURE__ */ defineComponent({
    props: {
      option: {
        type: Object,
        required: true
      },
      record: {
        type: Object,
        required: true
      }
    },
    setup({
      option,
      record
    }) {
      const {
        modelsMap,
        form
      } = getEditInfo(record);
      const model = modelsMap.get(toRaw(option));
      const ruleName = model.propChain.join(".");
      const effectData = getEffectData({
        current: model.parent,
        value: toRef(model, "refData")
      });
      const {
        attrs
      } = render({
        option,
        effectData
      });
      const inputSlot = buildInnerNode(option, model, effectData, attrs);
      return () => h(base.FormItem, {
        ...form.validateInfos[ruleName],
        class: style$1["table-form-item"]
      }, inputSlot);
    }
  });
  const getEditRender = (option) => {
    const component = Controls[option.type];
    if (component || option.type === "InputSlot") {
      return ({
        record
      }) => {
        const {
          isEdit
        } = getEditInfo(record);
        if (isEdit) {
          return h(InputNode, {
            option,
            record
          });
        }
      };
    }
  };
  return {
    list,
    methods,
    getEditRender,
    editButtonsSlot
  };
}
function useColumns({ childrenMap, effectData, getEditRender, actionColumn }) {
  ({ ...inject("rootSlots", {}) });
  const { columns, colsMap } = buildColumns(childrenMap);
  if (actionColumn) {
    const { forSlot, render: render2, column } = actionColumn;
    if (forSlot)
      ;
    else {
      columns.push(column);
      colsMap.set("action", column);
    }
  }
  [...colsMap].forEach(([col, column]) => {
    const textRender = column.customRender;
    const colEditRender = getEditRender == null ? void 0 : getEditRender(col);
    if (colEditRender || textRender) {
      const __render = (param) => (colEditRender == null ? void 0 : colEditRender(param)) || (textRender == null ? void 0 : textRender(param)) || param.text;
      column.customRender = (param) => h(__render, { ...effectData, ...param, current: param.record });
    }
  });
  return columns;
}
function buildColumns(_models, colsMap = /* @__PURE__ */ new Map()) {
  const columns = [];
  [..._models].forEach(([col, model]) => {
    if (col.type === "Hidden" || col.hideInTable || col.hidden === true)
      return;
    const title = col.labelSlot || col.label;
    if (model.children) {
      const sub = buildColumns(model.children, colsMap);
      columns.push({
        title,
        children: sub.columns
      });
    } else {
      const column = {
        title,
        dataIndex: model.propChain.join("."),
        // ...globalProps.Column,
        ...col.columnProps,
        customRender: getViewNode(col)
      };
      columns.push(column);
      colsMap.set(col, column);
    }
  });
  return { columns, colsMap };
}
function buildActionSlot({ buttons, methods, editSlot, isView }) {
  const buttonsConfig = {
    buttonType: "link",
    size: "small",
    ...Array.isArray(buttons) ? { actions: buttons } : buttons
  };
  const { columnProps, forSlot, ...config } = buttonsConfig;
  const buttonsSlot = createButtons({ config, methods, isView });
  if (!buttonsSlot)
    return;
  const render2 = (param) => {
    return (editSlot == null ? void 0 : editSlot(param, config)) || buttonsSlot({ key: param.record, param });
  };
  return {
    forSlot,
    render: render2,
    column: {
      title: "操作",
      dataIndex: "action",
      fixed: "right",
      minWidth: 100,
      align: "center",
      resizable: false,
      ...columnProps,
      customRender: render2
    }
  };
}
function modalEdit({ initialData, rowKey, option, listener }) {
  const source = ref({});
  const formRef = ref();
  const formOption = { ...option.formSchema };
  formOption.subItems = formOption.subItems || option.columns.filter((item) => !item.hideInForm);
  const editForm = () => h(Controls.Form, {
    option: formOption,
    source,
    onRegister: (data) => formRef.value = data
  });
  const { modalSlot, openModal } = createModal(editForm, {
    ...globalProps.Modal,
    maskClosable: false,
    ...option.modalProps
  });
  const methods = {
    add({ meta = {}, resetData } = {}) {
      source.value = merge({}, initialData, { [rowKey]: nanoid(12), ...resetData });
      return openModal({
        title: meta.title || meta.label || "新增",
        onOk() {
          return formRef.value.submit().then((data) => {
            return listener.onSave(data);
          });
        }
      });
    },
    async edit({ record, selectedRows, meta }) {
      var _a;
      const data = record || selectedRows[0];
      if ((_a = option.apis) == null ? void 0 : _a.info) {
        source.value = await option.apis.info(record[rowKey], record);
      } else {
        source.value = cloneDeep(data);
      }
      return openModal({
        title: meta.title || meta.label || "修改",
        onOk() {
          return formRef.value.submit().then((newData) => {
            return listener.onUpdate(newData, data);
          });
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
function buildDetail(option, modelsMap, rowKey) {
  const source = ref({});
  const { title, modalProps, apis, ..._option } = option;
  const detail = () => h(_sfc_main$u, { option: _option, modelsMap, source });
  const { openModal, closeModal } = useModal(detail, {
    ...globalProps.Modal,
    ...modalProps,
    title: `${title ? title + " - " : ""}详情`,
    footer: null
  });
  return async ({ record, selectedRows, meta }) => {
    const data = record || selectedRows[0];
    if (apis == null ? void 0 : apis.info) {
      source.value = await apis.info(record[rowKey], record);
    } else {
      source.value = data;
    }
    openModal({ ...meta });
  };
}
function buildData({ option, listData, orgList, rowKey, listener, isView }) {
  const { modelsMap: childrenMap, initialData } = listData;
  const context = {
    list: orgList,
    columns: [],
    methods: {
      delete({ record, selectedRows }) {
        const items = record ? [record] : selectedRows;
        return listener.onDelete(items);
      }
    }
  };
  const { editMode, addMode, rowButtons } = option;
  let __getEditRender;
  let __editButtonsSlot;
  if (editMode === "inline") {
    const { list, methods, editButtonsSlot, getEditRender } = inlineRender({ childrenMap, orgList, rowKey, listener });
    context.list = list;
    Object.assign(context.methods, methods);
    __editButtonsSlot = editButtonsSlot;
    __getEditRender = getEditRender;
  }
  if (editMode === "modal" || addMode === "modal") {
    const { modalSlot, methods } = modalEdit({ initialData, rowKey, option, listener });
    if (context.methods.edit) {
      context.methods.add = methods.add;
    } else {
      Object.assign(context.methods, methods);
    }
    context.modalSlot = modalSlot;
  }
  const effectData = getEffectData({ current: context.list });
  const actionColumn = buildActionSlot({
    buttons: rowButtons,
    methods: context.methods,
    editSlot: __editButtonsSlot,
    isView
  });
  context.columns = useColumns({ childrenMap, effectData, getEditRender: __getEditRender, actionColumn });
  (function mergeOption(columns = context.columns) {
    columns.forEach((item) => {
      defaults(item, option.columnProps, globalProps.Column);
      if (item.children)
        mergeOption(item.children);
    });
  })();
  context.methods.detail = buildDetail(option, childrenMap, rowKey);
  return context;
}
function useOptions(option, attrOptions, effectData) {
  const { options: orgOptions, dictName, valueToNumber, valueToLabel } = option;
  const list = ref(attrOptions || []);
  if (typeof orgOptions === "function") {
    watchPostEffect(() => {
      Promise.resolve(orgOptions(effectData)).then((data) => {
        list.value = data;
      });
    });
  } else if (orgOptions) {
    watch(
      () => option.options,
      (data) => list.value = unref(data),
      { immediate: true }
    );
  } else if (dictName && globalConfig.dictApi) {
    globalConfig.dictApi(dictName).then((data) => list.value = data);
  }
  const optionsRef = computed(() => {
    let _list = isArray(list.value) ? list.value : [];
    if (isPlainObject(list.value)) {
      _list = Object.entries(list.value).map(([value, label]) => ({ value, label }));
    }
    if (!_list.length)
      return _list;
    let _options = _list;
    if (typeof _list[0] !== "object") {
      _options = uniq(_list).map((val, idx) => {
        const label = String(val);
        return { value: valueToLabel ? label : String(idx), label };
      });
    } else if (valueToLabel) {
      _options = _list.map(({ label }) => ({ value: label, label }));
    }
    if (valueToNumber) {
      return _options.map((item) => ({
        ...item,
        value: Number(item.value)
      }));
    } else {
      return _options;
    }
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
    options: [Array, Object],
    bordered: Boolean,
    /** 字典名称 */
    dictName: String,
    /** 选项中的value使用label */
    valueToLabel: Boolean,
    activeKey: [String, Number, Object],
    slots: Object
  },
  emits: ["update:activeKey"],
  setup(props, { attrs, slots, emit }) {
    const { Card: Card2, Tabs: Tabs2, TabPane: TabPane2 } = base;
    const { optionsRef } = useOptions(props, props.options, props.effectData);
    const activeKey = ref(props.activeKey);
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
    const innerSlots = useInnerSlots(props.slots);
    const tabBarExtraSlot = tabBarExtra || rightExtra || tabBarExtraContent;
    const tabList = computed(() => {
      const list = optionsRef.value.map(({ value, label }) => ({ key: value, tab: label }));
      if (activeKey.value === void 0) {
        updateActiveKey(list[0].key);
      }
      return list;
    });
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
            default: () => tabList.value.map((item) => h(TabPane2, item)),
            rightExtra: tabBarExtraSlot || (!title ? extra : void 0),
            ...innerSlots
          }
        ),
        innerContent == null ? void 0 : innerContent()
      ];
    }
  }
});
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
    isView: Boolean,
    effectData: Object,
    apis: Object
  },
  emits: ["register"],
  setup({ option, model, apis = {}, effectData, isView }, ctx) {
    const editInline = option.editMode === "inline";
    const attrs = ctx.attrs;
    const rowKey = attrs.rowKey || "id";
    const orgList = toRef(model, "refData");
    const listData = model.listData;
    const selectedRowKeys = ref([]);
    const selectedRows = ref([]);
    const rowSelection = attrs.rowSelection || attrs.rowSelection === void 0 && editInline ? reactive(
      mergeProps(attrs.rowSelection, {
        fixed: true,
        selectedRowKeys,
        onChange: (_selectedRowKeys, _selectedRows) => {
          selectedRowKeys.value = _selectedRowKeys;
          selectedRows.value = _selectedRows;
        },
        ...editInline && {
          getCheckboxProps: (record) => ({
            disabled: !orgList.value.includes(record)
          })
        }
      })
    ) : void 0;
    const listener = {
      async onSave(data) {
        orgList.value.push(data);
        if (apis.save) {
          await apis.save(data);
          return apis.query(true);
        }
      },
      async onUpdate(newData, oldData) {
        if (apis.update) {
          await apis.update(newData);
          return apis.query(true);
        } else {
          Object.assign(oldData, newData);
        }
      },
      async onDelete(items) {
        if (apis.delete) {
          await apis.delete(items);
          return apis.query(true);
        } else {
          items.forEach((item) => {
            orgList.value.splice(orgList.value.indexOf(item), 1);
          });
        }
        if (rowSelection) {
          if (items.length === 1) {
            selectedRowKeys.value = selectedRowKeys.value.filter((key) => key !== items[0][rowKey]);
            selectedRows.value = selectedRows.value.filter((item) => item[rowKey] !== items[0][rowKey]);
          } else {
            selectedRowKeys.value = [];
            selectedRows.value = [];
          }
        }
      }
    };
    const { list, columns, methods, modalSlot } = buildData({ option, listData, orgList, rowKey, listener, isView });
    const tableRef = ref();
    const actions = {
      selectedRowKeys,
      selectedRows,
      setSelectedRows: (arr) => {
        selectedRows.value = arr;
        selectedRowKeys.value = arr.map((item) => item[rowKey]);
      },
      reload: () => {
        var _a;
        return (_a = apis.query) == null ? void 0 : _a.call(apis, true);
      },
      add: (param) => {
        var _a;
        return (_a = methods.add) == null ? void 0 : _a.call(methods, param);
      },
      edit: (param) => {
        var _a;
        return (_a = methods.edit) == null ? void 0 : _a.call(methods, { ...editParam, ...param });
      },
      delete: () => {
        var _a;
        return (_a = methods.delete) == null ? void 0 : _a.call(methods, editParam);
      },
      detail: (param) => {
        var _a;
        return (_a = methods.detail) == null ? void 0 : _a.call(methods, { ...editParam, ...param });
      }
    };
    const exposed = reactive({ ...actions });
    watch(
      tableRef,
      (table) => {
        Object.assign(exposed, table, actions);
        ctx.emit("register", exposed);
      },
      { flush: "sync" }
    );
    const editParam = reactive({ ...effectData, current: orgList, selectedRows, selectedRowKeys, tableRef: exposed });
    const slots = { ...ctx.slots };
    const buttonsConfig = option.buttons;
    const slotName = (buttonsConfig == null ? void 0 : buttonsConfig.forSlot) || "extra";
    if (buttonsConfig) {
      const orgSlot = slots[slotName];
      const buttonsSlot = createButtons({
        config: buttonsConfig,
        params: editParam,
        methods,
        isView
      });
      if (orgSlot || buttonsSlot) {
        slots[slotName] = () => [orgSlot == null ? void 0 : orgSlot(), buttonsSlot == null ? void 0 : buttonsSlot()];
      }
    }
    const titleString = option.title || option.label;
    const { title: titleSlot = titleString, extra: extraSlot, ...__slots } = slots;
    const titleBar = (titleSlot || extraSlot) && (() => h(Row, { align: "middle", class: "sup-titlebar" }, () => [
      titleSlot && h(Col, { class: "sup-title" }, () => toNode(titleSlot, effectData)),
      extraSlot && h(
        Col,
        { class: "sup-title-buttons", flex: 1, style: { textAlign: (buttonsConfig == null ? void 0 : buttonsConfig.align) || "right" } },
        extraSlot
      )
    ]));
    __slots.headerCell = (col) => {
      var _a;
      return ((_a = slots.headerCell) == null ? void 0 : _a.call(slots, col)) || toNode(col.title, effectData);
    };
    const render2 = () => [
      modalSlot == null ? void 0 : modalSlot(),
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
          rowKey
        },
        __slots
      )
    ];
    if (option.tabsFilter) {
      return () => h(_sfc_main$k, { ...option.tabsFilter, effectData }, {
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
const _hoisted_1 = {
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
      const effectData = getEffectData({ current: toRef(props.model, "refData") });
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
        unref(title) ? (openBlock(), createElementBlock("div", _hoisted_1, [
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
                      modelsMap: model.children
                    }, null, 8, ["option", "modelsMap"])) : (openBlock(), createBlock(unref(Collections), {
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
                        config: option.buttons,
                        param: effectData
                      }, null, 8, ["config", "param"])) : createCommentVNode("", true)
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
const _sfc_main$g = /* @__PURE__ */ defineComponent({
  __name: "Input",
  props: {
    option: {},
    model: {},
    effectData: {},
    addonAfter: {},
    addonBefore: {},
    suffix: {},
    prefix: {},
    suffixTips: {},
    onSearch: {},
    disabled: { type: Boolean }
  },
  setup(__props) {
    const { Input: Input2, Button: Button2, Tooltip: Tooltip2 } = base;
    const props = __props;
    const option = props.option;
    const {
      addonAfter = props.addonAfter,
      addonBefore = props.addonBefore,
      suffix = props.suffix,
      prefix = props.prefix,
      suffixTips = props.suffixTips
    } = props.option;
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(Input2), {
        placeholder: "请输入" + (unref(option).label || ""),
        "max-length": "100",
        "allow-clear": "",
        disabled: _ctx.disabled,
        class: normalizeClass(_ctx.onSearch || unref(option).enterButton ? "ant-input-search ant-input-search-enter-button" : "")
      }, createSlots({
        addonAfter: withCtx(() => [
          unref(addonAfter) && !unref(option).enterButton && !_ctx.onSearch ? (openBlock(), createBlock(resolveDynamicComponent(unref(toNode)(unref(addonAfter), _ctx.effectData.value)), { key: 0 })) : createCommentVNode("", true),
          !_ctx.disabled && unref(option).enterButton ? (openBlock(), createBlock(resolveDynamicComponent(unref(toNode)(unref(option).enterButton, _ctx.effectData)), {
            key: 1,
            onClick: _cache[0] || (_cache[0] = () => {
              var _a;
              return (_a = _ctx.onSearch) == null ? void 0 : _a.call(_ctx, _ctx.effectData.value);
            })
          })) : !_ctx.disabled && _ctx.onSearch ? (openBlock(), createBlock(unref(Button2), {
            key: 2,
            onClick: _cache[1] || (_cache[1] = () => {
              var _a;
              return (_a = _ctx.onSearch) == null ? void 0 : _a.call(_ctx, _ctx.effectData.value);
            })
          }, {
            default: withCtx(() => [
              unref(addonAfter) ? (openBlock(), createBlock(resolveDynamicComponent(unref(toNode)(unref(addonAfter), _ctx.effectData.value)), { key: 0 })) : (openBlock(), createBlock(unref(SearchOutlined), { key: 1 }))
            ]),
            _: 1
          })) : createCommentVNode("", true)
        ]),
        _: 2
      }, [
        unref(addonBefore) ? {
          name: "addonBefore",
          fn: withCtx(() => [
            (openBlock(), createBlock(resolveDynamicComponent(unref(toNode)(unref(addonBefore)))))
          ]),
          key: "0"
        } : void 0,
        unref(prefix) ? {
          name: "prefix",
          fn: withCtx(() => [
            (openBlock(), createBlock(resolveDynamicComponent(unref(toNode)(unref(prefix)))))
          ]),
          key: "1"
        } : void 0,
        unref(suffix) ? {
          name: "suffix",
          fn: withCtx(() => [
            unref(suffix) ? (openBlock(), createBlock(resolveDynamicComponent(unref(toNode)(unref(suffix))), { key: 0 })) : createCommentVNode("", true),
            unref(suffixTips) ? (openBlock(), createBlock(unref(Tooltip2), {
              key: 1,
              title: unref(suffixTips)
            }, null, 8, ["title"])) : createCommentVNode("", true)
          ]),
          key: "2"
        } : void 0
      ]), 1032, ["placeholder", "disabled", "class"]);
    };
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
        "allow-clear": "",
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
    valueToLabel: { type: Boolean },
    onChange: {},
    onSearch: {}
  },
  setup(__props) {
    const { Select: Select2 } = base;
    const props = __props;
    const { options: orgOptions, labelField } = props.option;
    const attrs = useAttrs();
    const { optionsRef, setOptions } = useOptions(props.option, props.options, props.effectData);
    let onChange = props.onChange;
    if (labelField) {
      const model = toRef(props, "model");
      onChange = (...args) => {
        var _a;
        const [_, item] = args;
        model.value.parent[labelField] = Array.isArray(item) ? item.map(({ lable }) => lable) : item == null ? void 0 : item.label;
        (_a = props.onChange) == null ? void 0 : _a.call(props, ...args);
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
        "allow-clear": "",
        placeholder: "请选择" + _ctx.option.label,
        options: unref(optionsRef),
        onChange: unref(onChange),
        onSearch: unref(onSearch)
      }, null, 8, ["placeholder", "options", "onChange", "onSearch"]);
    };
  }
});
const { Switch } = base;
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
      type: Number
    }
  },
  emits: ["update:value"],
  setup(props, ctx) {
    const [falseName, trueName] = props.option.valueLabels || [];
    ctx.emit("update:value", props.value ?? 0);
    return () => h(
      Switch,
      reactive({
        checkedChildren: trueName,
        unCheckedChildren: falseName,
        checkedValue: 1,
        unCheckedValue: 0,
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
  setup(props) {
    const disabledDate = (currentDate) => {
      var _a;
      return (_a = props.disabledDate) == null ? void 0 : _a.call(props, currentDate, props.effectData);
    };
    return () => h(base.RangePicker, { autofocus: true, valueFormat: "YYYY-MM-DD", disabledDate });
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
    return () => h(base.DatePicker, { autofocus: true, valueFormat: "YYYY-MM-DD", disabledDate }, ctx.slots);
  }
});
const _sfc_main$a = defineComponent({
  props: {
    option: { type: Object, required: true },
    model: Object,
    effectData: Object
  },
  setup(props) {
    return () => h(base.TimePicker);
  }
});
const { RadioGroup } = base;
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
    options: Array
  },
  setup(props, { attrs }) {
    const { optionsRef } = useOptions(props.option, props.options, props.effectData);
    const allAttrs = reactive({ name: props.option.field, options: optionsRef });
    if (attrs.buttonStyle) {
      allAttrs.optionType = "button";
    }
    return () => h(RadioGroup, allAttrs);
  }
});
const { CheckboxGroup } = base;
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
    options: Array,
    onChange: Function
  },
  setup(props) {
    const { optionsRef } = useOptions(props.option, props.options, props.effectData);
    let onChange = props.onChange;
    const labelField = props.option.labelField;
    if (labelField) {
      const model = toRef(props, "model");
      onChange = (items) => {
        var _a;
        const labels = items.map((key) => {
          var _a2;
          return (_a2 = optionsRef.value.find(({ value }) => value == key)) == null ? void 0 : _a2.label;
        });
        model.value.parent[labelField] = labels;
        (_a = props.onChange) == null ? void 0 : _a.call(props, items);
      };
    }
    return () => h(CheckboxGroup, { options: optionsRef.value, name: props.option.field, onChange });
  }
});
const _sfc_main$7 = /* @__PURE__ */ defineComponent({
  __name: "TreeSelect",
  props: {
    option: {},
    model: {},
    effectData: {},
    onChange: {}
  },
  setup(__props) {
    const { TreeSelect: TreeSelect2 } = base;
    const props = __props;
    const treeData = ref([]);
    const { data, labelField } = props.option;
    if (typeof data === "function") {
      watchPostEffect(() => {
        Promise.resolve(data(props.effectData)).then((res) => {
          treeData.value = res;
        });
      });
    } else if (data) {
      watch(
        () => props.option.data,
        (data2) => treeData.value = data2,
        { immediate: true }
      );
    }
    let onChange = props.onChange;
    if (labelField) {
      const current = props.effectData.current;
      onChange = (...args) => {
        var _a;
        const [val, labels] = args;
        current[labelField] = Array.isArray(val) ? labels : labels[0];
        (_a = props.onChange) == null ? void 0 : _a.call(props, ...args);
      };
    }
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(TreeSelect2), {
        placeholder: "请选择" + _ctx.option.label,
        "allow-clear": "",
        onChange: unref(onChange),
        "tree-data": treeData.value
      }, null, 8, ["placeholder", "onChange", "tree-data"]);
    };
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
function acceptValidtor(accept, file) {
  return accept.split(",").some((str) => {
    return file.name.endsWith(str) || file.type && new RegExp(`^${str.replace("*", "\\S*")}$`).test(file.type);
  });
}
function fileIsImage(file) {
  return (file.url || file.thumbUrl) && acceptValidtor(".png,.jpg,.jpeg,.gif,.webp,.svg,.tif,.tiff", file);
}
const _sfc_main$5 = defineComponent({
  props: {
    option: { type: Object, required: true },
    model: Object,
    effectData: { type: Object, required: true },
    value: [String, Array, Object],
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
    outHide: Boolean,
    repeatable: Boolean,
    isView: Boolean,
    disabled: Boolean,
    isImageUrl: Function,
    beforeUpload: Function,
    onPreview: Function,
    onRemove: Function,
    onDownload: Function,
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
      maxCount = isSingle ? 1 : 0,
      infoNames,
      repeatable,
      onPreview,
      onDownload,
      isImageUrl = fileIsImage,
      outHide,
      valueKey
    } = props;
    const { accept, listType } = ctx.attrs;
    const preview = usePreview();
    const __names = { uid: "uid", status: "status", url: "url", name: "name", ...infoNames };
    if (mode === "custom")
      __names.originFileObj = "";
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
      innerFileList.value = list;
      outFileList.value = list.map(reconvert);
      if (props.isView)
        return;
      ctx.emit("update:fileList", outFileList.value);
      updateValue();
    };
    const updateValue = () => {
      var _a;
      if (props.isSingle) {
        const frist = toRaw(outFileList.value[0]);
        outValues.value = !valueKey ? frist : (frist == null ? void 0 : frist[valueKey]) ?? ((_a = innerFileList.value[0]) == null ? void 0 : _a.uid);
      } else if (valueKey) {
        outValues.value = innerFileList.value.map((item) => item[__names[valueKey]] ?? item.uid);
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
          if (!valueKey && value) {
            outFileList.value = isArray(value) ? value : [value];
            const fileList = outFileList.value.map(convertInfo);
            innerFileList.value = fileList;
          } else {
            innerFileList.value = [];
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
    const openModal = (onOk) => {
      return Modal.info({
        title: () => " 文件同步中，请稍候...",
        okButtonProps: reactive({
          loading: isLoading
        }),
        closable: false,
        centered: true,
        maskClosable: false,
        keyboard: false,
        onOk
      });
    };
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
        const modal = openModal();
        return stack.then(
          (data) => (
            // 文件删除出错不中断提交
            Promise.all([...removeFileMap.values()].map((handler) => handler())).then(() => data).catch((err) => console.error(err)).finally(() => {
              modal == null ? void 0 : modal.destroy();
              return data;
            })
          )
        ).catch((err) => {
          isLoading.value = false;
          modal.update({
            icon: () => h(CloseCircleOutlined),
            type: "error",
            title: "文件上传失败",
            content: err == null ? void 0 : err.message
          });
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
        if (accept && !acceptValidtor(accept, file)) {
          return "请选择正确的文件类型！";
        }
        if (minSize || maxSize) {
          const fileSize = file.size / 1024 / 1024;
          if (minSize && minSize > fileSize) {
            return "文件最小需要" + minSize + "M";
          }
          if (maxSize && maxSize < fileSize) {
            return "文件最大不超过" + minSize + "M";
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
        return false;
      }
      if (maxCount === 1 && innerFileList.value.length) {
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
      if (file.status === "removed") {
        tasks.delete(file.uid);
        waitingTasks.delete(file.uid);
      } else if (file.status === "uploading") {
        if (!event && mode !== "auto") {
          file.status = "waiting";
        }
        if (listType == null ? void 0 : listType.startsWith("picture")) {
          file.objectUrl = window.URL.createObjectURL(file.originFileObj);
        }
      }
      updateFileList([...fileList]);
    }
    const customRequest = (args) => {
      const { file } = args;
      if (mode === "auto") {
        tasks.set(file.uid, upload(args));
      } else if (mode === "submit") {
        waitingTasks.set(file.uid, () => upload(args));
      }
    };
    const upload = (args) => {
      const { file, filename, onProgress, onError, onSuccess } = args;
      const errorHandler = (error) => {
        const changeItem = innerFileList.value.find((item) => item.uid === file.uid);
        Object.assign(changeItem, { error, status: "error" });
        updateFileList([...innerFileList.value]);
        return Promise.reject(error);
      };
      const successHandler = (data) => {
        const changeItem = innerFileList.value.find((item) => item.uid === file.uid);
        Object.assign(changeItem, convertInfo(data), { status: "done" });
        updateFileList([...innerFileList.value]);
        return data;
      };
      if (!apis.upload) {
        return Promise.resolve().then(() => errorHandler(Error("Api config error")));
      }
      const formData = new FormData();
      formData.append(filename, file);
      const onUploadProgress = (e) => {
        if (e.total > 0) {
          e.percent = e.loaded / e.total * 100;
        }
        onProgress(e);
      };
      return apis.upload(formData, {
        onUploadProgress
      }).then(successHandler, errorHandler);
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
    const fileDownload = onDownload || ((file) => {
      if (apis.download) {
        apis.download(reconvert(file)).then((result) => downloadByData(result, file.name));
      }
    });
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
    const listConfig = computed(() => ({
      showRemoveIcon: !props.isView && !props.disabled,
      showDownloadIcon: props.isView
    }));
    const filePreview = (file) => {
      if (onPreview) {
        const src = onPreview(file);
        src && preview.open(src);
      } else if (isImageUrl(file)) {
        let current;
        const images = innerFileList.value.filter((item) => isImageUrl(item)).map((item, idx) => {
          if (item === file)
            current = idx;
          return item.objectUrl || item.url || item.thumbUrl;
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
    const hideBody = computed(() => outHide && maxCount && innerFileList.value.length >= maxCount);
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
        default: isView.value || hideBody.value ? null : slots.default
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
    valueToString: { type: Boolean },
    isView: { type: Boolean }
  },
  emits: ["update:value"],
  setup(__props, { emit: __emit }) {
    const { Input: Input2, Tooltip: Tooltip2, Tag: Tag2 } = base;
    const props = __props;
    const emit = __emit;
    const inputRef = ref();
    const inputValue = ref("");
    const inputVisible = ref(false);
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
      if (props.valueToString) {
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
                createVNode(unref(Tag2), {
                  closable: index !== 0,
                  onClose: ($event) => handleClose(tag)
                }, {
                  default: withCtx(() => [
                    createTextVNode(toDisplayString(`${tag.slice(0, 20)}...`), 1)
                  ]),
                  _: 2
                }, 1032, ["closable", "onClose"])
              ]),
              _: 2
            }, 1032, ["title"])) : (openBlock(), createBlock(unref(Tag2), {
              key: 1,
              closable: index !== 0,
              onClose: ($event) => handleClose(tag)
            }, {
              default: withCtx(() => [
                createTextVNode(toDisplayString(tag), 1)
              ]),
              _: 2
            }, 1032, ["closable", "onClose"]))
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
            createTextVNode(" New Tag ")
          ]),
          _: 1
        }))
      ], 64);
    };
  }
});
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
    valueToString: { type: Boolean },
    multiple: { type: Boolean },
    isView: { type: Boolean }
  },
  emits: ["update:value", "change"],
  setup(__props, { emit: __emit }) {
    const { CheckableTag: CheckableTag2 } = base;
    const props = __props;
    const emit = __emit;
    const { optionsRef } = useOptions(props.option, props.options, props.effectData);
    const selected = computed(() => {
      const { value, valueToString } = props;
      if (value === void 0) {
        return [];
      } else if (valueToString) {
        return value.split(",");
      } else if (Array.isArray(value)) {
        return value;
      } else {
        return [value];
      }
    });
    const handleChange = (tag, checked) => {
      const nextSelected = props.multiple ? checked ? [...selected.value, tag] : selected.value.filter((_tag) => _tag !== tag) : checked ? [tag] : [];
      updateValue(nextSelected);
      emit("change", props.effectData, tag, checked);
    };
    const updateValue = (val) => {
      if (!props.multiple) {
        emit("update:value", val[0]);
      } else if (props.valueToString) {
        emit("update:value", val.join(","));
      } else {
        emit("update:value", val);
      }
    };
    return (_ctx, _cache) => {
      return openBlock(true), createElementBlock(Fragment, null, renderList(unref(optionsRef), ({ label, value }) => {
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
      }), 128);
    };
  }
});
const components = {
  Form,
  Group: _sfc_main$t,
  Card: _sfc_main$p,
  List: _sfc_main$o,
  ListGroup: _sfc_main$n,
  Tabs: _sfc_main$m,
  Table: _sfc_main$j,
  Collapse: _sfc_main$h,
  Descriptions: _sfc_main$t
};
const formItems = {
  Textarea: _sfc_main$i,
  Input: _sfc_main$g,
  InputNumber: _sfc_main$f,
  InputGroup: _sfc_main$r,
  InputList: _sfc_main$q,
  Select: _sfc_main$e,
  Switch: _sfc_main$d,
  DateRange: _sfc_main$c,
  DatePicker: _sfc_main$b,
  TimePicker: _sfc_main$a,
  Radio: _sfc_main$9,
  Checkbox: _sfc_main$8,
  TreeSelect: _sfc_main$7,
  Upload: _sfc_main$5,
  TagInput: _sfc_main$4,
  TagSelect: _sfc_main$3
};
const containers = Object.keys(components);
const allItems = { ...formItems, ...components };
function addComponent(name, component) {
  const customName = `Ext${name}`;
  allItems[customName] = (props) => {
    return h(component, props);
  };
}
const Controls = allItems;
const globalConfig = {};
const globalProps = {
  FormItem: {
    validateFirst: true
  },
  Table: {
    size: "small"
  }
};
const install = async (app, config = {}) => {
  const { locale = zhCN, components: components2, defaultProps, ..._config } = config;
  app.provide("localeData", { locale, exist: true });
  Object.assign(globalConfig, _config);
  components2 && override(components2);
  defaultProps && setDefaultProps(defaultProps);
};
function registComponent(name, component) {
  addComponent(name, component);
}
function setDefaultProps(props) {
  merge(globalProps, props);
}
const plugin = {
  install,
  registComponent,
  setDefaultProps
};
const style = "";
function useQuery(option) {
  const queryApi = computed(() => {
    var _a;
    return typeof option.apis === "function" ? apis : (_a = option.apis) == null ? void 0 : _a.query;
  });
  const pageParam = reactive({});
  const searchParam = ref();
  const loading = ref(false);
  const dataSource = ref();
  const callbacks = [];
  const onLoaded = (cb) => callbacks.push(cb);
  const request = (param) => {
    var _a;
    if (!queryApi.value)
      return;
    if (loading.value)
      return Promise.reject(() => console.warn("跳过重复执行！")).finally();
    const _params = {
      ...ref(option.params).value,
      ...searchParam.value,
      ...param,
      ...pageParam
    };
    loading.value = true;
    return Promise.resolve(
      (_a = queryApi.value) == null ? void 0 : _a.call(queryApi, _params).then((res) => {
        if (Array.isArray(res)) {
          dataSource.value = res;
          pagination.value = false;
        } else if (res == null ? void 0 : res.records) {
          dataSource.value = res.records;
          pagination.value && (pagination.value = { ...pagination.value, total: res.total, pageSize: res.size, current: res.current });
        }
        callbacks.forEach((cb) => cb(res));
      })
    ).finally(() => {
      loading.value = false;
    });
  };
  const throttleRequest = throttle(request, 300, { "leading": false });
  const goPage = (current, size = pageParam.size) => {
    pageParam.current = current;
    pageParam.size = size;
    throttleRequest();
  };
  const query = (param) => {
    if (param === true) {
      return request();
    }
    pageParam.current = 1;
    return throttleRequest(param);
  };
  const setSearchParam = (param) => {
    searchParam.value = param;
  };
  const pagination = ref(false);
  watch(
    () => {
      var _a;
      return option.pagination || ((_a = option.attrs) == null ? void 0 : _a.pagination);
    },
    (def) => {
      pagination.value = (def || def !== false) && mergeProps(
        {
          onChange: goPage
          // onShowSizeChange: goPage,
        },
        def
      );
      if (def == null ? void 0 : def.pageSize)
        pageParam.size = def.pageSize;
    },
    {
      immediate: true,
      flush: "sync"
    }
  );
  const apis = computed(() => {
    return queryApi.value && { ...option.apis, query: throttleRequest };
  });
  return {
    apis,
    goPage,
    reload: throttleRequest,
    setSearchParam,
    query,
    pagination,
    dataSource,
    onLoaded,
    loading
  };
}
function useSearchForm(tableOption, tableRef, onChange) {
  var _a;
  const { columns, searchSchema } = tableOption;
  const { buttons = {}, searchOnChange, ...formOption } = searchSchema;
  Object.assign(formOption, {
    ignoreRules: true,
    subItems: []
  });
  searchSchema.subItems.forEach((item) => {
    if (typeof item === "string") {
      const col = columns.find((col2) => col2.field === item);
      col && formOption.subItems.push({ type: "Input", ...col });
    } else {
      return formOption.subItems.push(item);
    }
  });
  const formRef = ref();
  const formData = reactive({});
  const defaultAction = {
    search() {
      onChange(toRaw(formData), true);
    },
    reset() {
      const data = formRef.value.resetFields();
      onChange(data, true);
    }
  };
  const setParams = (params) => {
    params && Object.keys(params).forEach((key) => {
      if (key in formData)
        formData[key] = params[key];
    });
  };
  const isDebounce = !!searchOnChange;
  const buttonsConfig = Array.isArray(buttons) ? { actions: buttons } : { ...buttons };
  buttonsConfig.actions ?? (buttonsConfig.actions = !searchOnChange ? ["search", "reset"] : void 0);
  if (buttonsConfig !== false && ((_a = buttonsConfig.actions) == null ? void 0 : _a.length)) {
    formOption.subItems.push({
      type: "InfoSlot",
      align: "right",
      span: "auto",
      render: () => h(_sfc_main$v, {
        config: { ...buttonsConfig, methods: defaultAction },
        param: getEffectData({ table: tableRef, form: formRef })
      })
    });
  }
  const paramsRef = ref(tableOption.params);
  nextTick(() => {
    if (tableOption.params) {
      watch(
        paramsRef,
        (params) => {
          setParams(params);
          onChange(toRaw(formData), !isDebounce);
        },
        { immediate: true, deep: true }
      );
    } else {
      onChange(formData, false);
    }
    if (isDebounce) {
      watch(
        [paramsRef, formData],
        () => {
          onChange(formData, true);
        },
        { deep: true }
      );
    }
  });
  const formNode = () => h(Controls.Form, { option: formOption, source: formData, ref: formRef });
  return { formNode, formRef, formData };
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
  const scrollHeightRef = ref(null);
  const debounceRedoHeight = debounce(redoHeight, 100);
  const {
    maxHeight,
    isScanHeight = true,
    inheritHeight,
    isFixedHeight,
    resizeHeightOffset,
    attrs: { scroll }
  } = option;
  if (isScanHeight || inheritHeight || maxHeight) {
    watch(
      () => {
        var _a;
        return [wrapRef.value, (_a = unref(dataRef)) == null ? void 0 : _a.length];
      },
      () => {
        debounceRedoHeight();
      },
      {
        flush: "post"
      }
    );
    if (abortController) {
      window.addEventListener("resize", debounceRedoHeight, { signal: abortController.signal });
    } else {
      window.addEventListener("resize", debounceRedoHeight);
      onUnmounted(() => {
        window.removeEventListener("resize", debounceRedoHeight);
      });
    }
  }
  function redoHeight() {
    nextTick(() => {
      calcTableHeight();
    });
  }
  const getScrollRef = ref(scroll);
  function setHeight(height) {
    scrollHeightRef.value = height;
    getScrollRef.value = {
      y: height,
      // x: 'auto',
      scrollToFirstRowOnChange: true,
      ...scroll
    };
  }
  async function calcTableHeight() {
    const tableData = unref(dataRef);
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
      if (!unref(tableData) || tableData.length === 0) {
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
  return { getScrollRef, redoHeight, debounceRedoHeight };
}
const _sfc_main$2 = defineComponent({
  name: "SuperTable",
  inheritAttrs: false,
  props: {
    dataSource: Array,
    option: Object
  },
  emits: ["register", "change"],
  setup(props, ctx) {
    const dataRef = ref(props.dataSource || []);
    const wrapRef = ref();
    const option = shallowReactive(props.option || {});
    const { style: style2, class: ctxClass, ...ctxAttrs } = ctx.attrs;
    merge(option, { attrs: mergeProps(option.attrs, ctxAttrs) });
    const searchForm = ref();
    const { dataSource, loading, pagination, onLoaded, apis, goPage, reload, query, setSearchParam } = useQuery(option);
    onLoaded((data) => {
      var _a;
      ctx.emit("change", data);
      (_a = option.onChange) == null ? void 0 : _a.call(option, data);
    });
    const exposed = {
      setOption: (_option) => {
        const { isScanHeight, inheritHeight, isFixedHeight, isContainer, ...attrs } = mergeProps(
          globalProps.Table,
          { ..._option.attrs },
          option.attrs
        );
        Object.assign(option, { isScanHeight, inheritHeight, isFixedHeight, isContainer }, _option, { attrs });
      },
      setData: (data) => {
        data && (dataRef.value = data);
      },
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
      getData: () => dataRef.value,
      dataRef
    };
    watch(() => dataSource.value || props.dataSource, exposed.setData);
    const tableRef = ref({ ...exposed });
    const register = (comp) => {
      Object.assign(tableRef.value, toRefs(comp), exposed);
      ctx.emit("register", tableRef.value);
    };
    ctx.emit("register", tableRef.value);
    ctx.expose(tableRef.value);
    const tableAttrs = reactive({
      option,
      apis,
      pagination,
      onRegister: register,
      loading
    });
    const windowResize = new AbortController();
    onUnmounted(() => {
      windowResize.abort();
      ctx.emit("register", null);
    });
    provide("rootSlots", ctx.slots);
    const slots = ref({});
    const unWatch = watch(
      option,
      (opt) => {
        if (!(opt == null ? void 0 : opt.columns))
          return;
        if (tableAttrs.model) {
          unWatch();
          return;
        }
        slots.value = useInnerSlots(option.slots, ctx.slots);
        const { columns, searchSchema, beforeSearch, maxHeight, isScanHeight = true, inheritHeight } = opt;
        const listData = buildModelsMap(columns);
        const effectData = reactive({ formData: dataRef, current: dataRef });
        const model = reactive({
          refData: dataRef,
          listData
        });
        const { attrs } = render({ option: opt, effectData });
        if (searchSchema) {
          searchForm.value = useSearchForm(opt, tableRef, (data, isSearch) => {
            const _data = (beforeSearch == null ? void 0 : beforeSearch({ ...effectData, table: tableRef, param: data })) || data;
            setSearchParam(_data);
            isSearch && query();
          });
        } else if (opt.params) {
          watch(
            () => opt.params,
            () => query(),
            { deep: true }
          );
        }
        if (option.immediate !== false) {
          nextTick(() => {
            query();
          });
        }
        Object.assign(tableAttrs, attrs, {
          effectData,
          model
        });
        if (isScanHeight || inheritHeight || maxHeight) {
          const { getScrollRef, redoHeight } = useTableScroll(option, dataRef, wrapRef, windowResize);
          tableAttrs.scroll = getScrollRef;
          const { onChange, onExpandedRowsChange } = tableAttrs;
          tableAttrs.onChange = (...args) => {
            !loading.value && redoHeight();
            onChange == null ? void 0 : onChange(...args);
          };
          tableAttrs.onExpandedRowsChange = (param) => {
            onExpandedRowsChange == null ? void 0 : onExpandedRowsChange(param);
            redoHeight();
          };
        }
      },
      {
        immediate: true
      }
    );
    return () => option.columns && h(
      DataProvider,
      { name: "exaProvider", data: { data: dataRef, apis } },
      () => searchForm.value ? h(
        "div",
        mergeProps(
          { ref: wrapRef, class: [option.isContainer && "sup-container", "sup-table"] },
          { class: ctxClass, style: style2 }
        ),
        [
          h("div", { class: "sup-form-section sup-table-search" }, searchForm.value.formNode()),
          h("div", { class: "sup-form-section section-last" }, h(Controls.Table, tableAttrs, slots.value))
        ]
      ) : h(
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
        h(Controls.Table, tableAttrs, slots.value)
      )
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
  const asyncCall = async (key, param) => {
    const form = await getTable();
    if (key && key in form) {
      if (typeof form[key] === "function") {
        return form[key](param);
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
      setData(data2) {
        asyncCall("setData", data2);
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
        var _a;
        (_a = tableRef.value) == null ? void 0 : _a.goPage(page);
      },
      /** 刷新数据，不改动查询条件与当前页 */
      reload() {
        var _a;
        (_a = tableRef.value) == null ? void 0 : _a.reload();
      },
      /** 增加条件刷新数据 */
      request(param) {
        var _a;
        (_a = tableRef.value) == null ? void 0 : _a.reload(param);
      },
      /** 手动执行条件查询，覆盖搜索表单参数 */
      query(param) {
        var _a;
        return (_a = tableRef.value) == null ? void 0 : _a.query(param);
      },
      /** 查询完成，返回结果回调 */
      onLoaded(callback) {
        asyncCall("onLoaded", callback);
      },
      /** 重置查询表单，并重新查询 */
      resetSearchForm(param) {
        var _a, _b;
        (_a = tableRef.value) == null ? void 0 : _a.resetSearchForm(param);
        (_b = tableRef.value) == null ? void 0 : _b.query(param);
      },
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
      asyncCall
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
    /** 是否只显示图标 */
    iconOnly: Boolean,
    hidden: Boolean || Function,
    disabled: Boolean || Function,
    actions: Array
  },
  setup(props, { slots }) {
    var _a;
    const slotsNode = (_a = slots.default) == null ? void 0 : _a.call(slots);
    const actions = !slotsNode ? props.actions : slotsNode.flatMap(({ children, props: props2 = {} }) => {
      const { roleName, roleMode, onClick, confirmText, tooltip, icon, ...attrs } = mapKeys(
        props2,
        (_, key) => camelCase(key)
      );
      if (!onClick || !children)
        return [];
      return {
        label: children.default || children,
        icon,
        tooltip,
        roleMode,
        roleName,
        onClick,
        confirmText,
        attrs
      };
    });
    return () => h(_sfc_main$v, { config: { ...props, actions } });
  }
});
function useButtons(config) {
  const vNode = () => h(_sfc_main$v, { config });
  return [vNode];
}
const _sfc_main = defineComponent({
  props: {
    dataSource: Object,
    option: Object
  },
  emits: ["register"],
  setup(props, ctx) {
    const dataRef = ref(props.dataSource || {});
    const option = shallowRef(props.option || {});
    const exposed = {
      setOption: (_option) => {
        option.value = _option;
      },
      setData: (data) => {
        dataRef.value = data;
      }
    };
    watch(() => props.dataSource, exposed.setData);
    const modelsMap = ref();
    watch(
      option,
      (opt) => {
        if (!(opt == null ? void 0 : opt.subItems))
          return;
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
          ...option.value,
          descriptionsProps: { ...option.value.attrs, ...option.value.descriptionsProps }
        },
        modelsMap: modelsMap.value,
        isRoot: true
      })
    );
  }
});
function useDetail(option, data = {}) {
  const source = toRef(data);
  const actionsRef = ref();
  const syncOption = Promise.resolve(typeof option === "function" ? option() : option);
  const register = (actions) => {
    if (actions) {
      if (!actionsRef.value) {
        syncOption.then(actions.setOption);
        actions.setData(source);
      }
      actionsRef.value = actions;
    } else {
      return (props) => h(_sfc_main, { config: option, ...props, onRegister: register }, useSlots());
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
  useButtons,
  useDetail,
  useForm,
  useModal,
  useModalForm,
  useTable
};
