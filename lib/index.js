import "./style.css";
import zhCN from "ant-design-vue/es/locale/zh_CN";
import { merge, cloneDeep, mergeWith, defaults, isArray, uniq, throttle, debounce, mapKeys, camelCase } from "lodash-es";
import { h, inject, reactive, ref, unref, watchEffect, toValue, toRef, watch, onMounted, computed, toRefs, mergeProps, defineComponent, openBlock, createBlock, withModifiers, withCtx, createElementBlock, Fragment, renderList, createVNode, normalizeProps, guardReactiveProps, resolveDynamicComponent, createCommentVNode, createTextVNode, toDisplayString, provide, toRaw, readonly, useAttrs, getCurrentInstance, nextTick, render as render$1, shallowReactive, createSlots, normalizeClass, watchPostEffect, onUnmounted, useSlots } from "vue";
import { Modal, Space, Tooltip, Button, Divider, Dropdown, Menu, MenuItem, Card, Checkbox, CheckboxGroup as CheckboxGroup$1, Col, Collapse, CollapsePanel, DatePicker, Descriptions as Descriptions$1, DescriptionsItem, Form as Form$1, FormItem, Input, InputGroup, InputNumber, InputSearch, List, ListItem, Radio, RadioButton, RadioGroup as RadioGroup$1, RangePicker, Row, Select, Switch as Switch$1, TabPane, Table, Tabs, Textarea, TimePicker, TreeSelect, FormItemRest } from "ant-design-vue";
import { EllipsisOutlined, SearchOutlined } from "@ant-design/icons-vue";
import { nanoid } from "nanoid";
import message from "ant-design-vue/es/message";
import { useForm as useForm$1 } from "ant-design-vue/es/form";
const getDefault = () => {
  return {
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
      // onClick(param) {
      //   console.log(param)
      // },
    },
    reset: {
      label: "重置"
    }
  };
};
function buildDefaultActions(methods) {
  const actions = getDefault();
  Object.keys(methods).forEach((key) => {
    if (typeof methods[key] === "function") {
      actions[key] && (actions[key].onClick = methods[key]);
    } else {
      Object.assign(actions[key], methods[key]);
    }
  });
  return actions;
}
function mergeActions(actions, methods = {}) {
  const defaultActions = buildDefaultActions(methods);
  const actionBtns = [];
  if (Array.isArray(actions)) {
    actions.forEach((item) => {
      const name = typeof item === "string" ? item : item.name;
      const { onClick: innerMethod, ...config } = defaultActions[name] || {};
      if (typeof item === "object") {
        Object.assign(config, item, { attrs: { ...config.attrs, ...item.attrs } });
      }
      const meta = { label: config.label, ...item.meta };
      const _onClick = item.onClick;
      const _action = async (text, method) => {
        if (text) {
          return new Promise(
            (resolve) => Modal.confirm({
              title: text,
              okText: "确定",
              cancelText: "取消",
              onOk() {
                method();
                resolve(void 0);
              }
            })
          );
        } else {
          return method();
        }
      };
      config.onClick = (param) => {
        if (_onClick && innerMethod) {
          _onClick(param, (exParam = {}) => {
            const { confirmText = config.confirmText, __param } = exParam;
            return _action(confirmText, () => innerMethod == null ? void 0 : innerMethod({ ...param, meta, ...__param }));
          });
        } else {
          _action(config.confirmText, () => {
            var _a;
            return (_a = innerMethod || _onClick) == null ? void 0 : _a({ ...param, meta });
          });
        }
      };
      actionBtns.push(config);
    });
  }
  return actionBtns;
}
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
  return reactive({ formData, ...param || {} });
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
  const { type, field, keepField, computed: __computed } = option;
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
        () => ref(__computed(raw, effectData)),
        (val) => effect(unref(val))
      )
    );
  }
  return {
    value: tempData,
    "onUpdate:value": updateValue
  };
}
function render({ option, effectData, inheritDisabled }) {
  const { type, dynamicAttrs: __attrs, disabled: __disabled, hidden: __hidden } = option;
  const hidden = getComputedStatus(__hidden, effectData);
  const disabled = computed(() => {
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
    rule.type = "string";
    rule.message = rangeMsg.string[rule.message];
  }
  return rule;
}
function buildRule(item, label = "") {
  const { trigger, required, type = "string", len, max, min, pattern, validator, message: message2 } = item || {};
  const rules = [];
  if (required && type === "string") {
    rules.push({
      required,
      trigger,
      // validator: noEmpty,
      pattern: /^[\s\S]*.*[^\s][\s\S]*$/,
      // transform: (value) => value + '',
      // whitespace: true,
      message: message2 || `请输入${label}！`
    });
  }
  const typeRule = ruleTypeMap[type];
  if (typeRule) {
    const message22 = formatStr(typeRule.message, { label });
    rules.push({ ...typeRule, trigger, message: message22 });
  } else if (type !== "string") {
    rules.push({ required, type, trigger, message: message2 || `请添加${label}` });
  }
  if (pattern) {
    rules.push({ pattern, trigger, message: message2 });
  }
  if (len || !isNaN(Number(max)) || !isNaN(Number(min))) {
    const rule = getRangeRule(type, len, max, min);
    const message22 = formatStr(rule.message, { label, len, max, min });
    rules.push({ ...rule, trigger, message: message22 });
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
  let currentRules;
  const model = reactive({
    refName,
    initialValue,
    fieldName: field,
    parent: ref(),
    refData: ref(),
    rules: currentRules,
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
          model.parent = (_a2 = model.parent)[name] ?? (_a2[name] = {});
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
        model.refData = ref(data);
      }
    },
    { immediate: true, flush: "sync" }
  );
  return model;
}
function buildModelsMap(items, data, propChain = []) {
  const currentData = toRef(data || {});
  const rules = {};
  const cols = items.sort(({ sort = 1 }, { sort: b_sort = 1 }) => sort - b_sort);
  const modelsMap = /* @__PURE__ */ new Map();
  cols.forEach((child) => {
    const subModel = buildModelData(child, currentData, propChain);
    const { rules: _rules, label, subItems, columns } = child;
    if (_rules) {
      const _r = Array.isArray(_rules) ? _rules : [_rules];
      subModel.rules = _r.map((item) => buildRule(item, label)).flat();
      rules[subModel.propChain.join(".")] = subModel.rules;
    }
    if (subItems) {
      const children = buildModelsMap(subItems, toRef(subModel, "refData"), subModel.propChain);
      Object.assign(rules, children.rules);
      subModel.children = children.modelsMap;
    } else if (columns) {
      subModel.listData = buildModelsMap(columns);
    }
    modelsMap.set(child, subModel);
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
    const { children, propChain, rules } = model;
    const newModel = buildModelData(option, currentData, parentChain);
    newModel.rules = rules;
    if (propChain.length) {
      newRules[propChain.join(".")] = rules;
    }
    if (children) {
      const { modelsMap, rules: childrenRules } = cloneModels(children, toRef(newModel, "refData"), newModel.propChain);
      Object.assign(newRules, childrenRules);
      newModel.children = modelsMap;
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
function resetFields(origin, initial = {}) {
  var _a;
  for (const [key, value] of Object.entries(origin)) {
    if (Array.isArray(value)) {
      value.splice(0);
      if ((_a = initial[key]) == null ? void 0 : _a.length)
        value.push(...cloneDeep(initial[key]));
    } else if (Object.prototype.toString.call(value) === "[object Object]") {
      resetFields(value, initial[key]);
    } else {
      origin[key] = initial[key];
    }
  }
}
function setFieldsValue(origin, data) {
  mergeWith(origin, data, (objValue, srcValue) => {
    if (Array.isArray(objValue)) {
      objValue.splice(0, objValue.length, ...cloneDeep(srcValue));
      return objValue;
    }
  });
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
    return h(node);
  }
}
function useButton(config, param, methods) {
  const { size, buttonShape, buttonType, roleMode, limit = 3, hidden, disabled, actions } = config;
  const defaultAttrs = { size, type: buttonType, shape: buttonShape };
  const dis = useDisabled(disabled, param);
  const isHide = getComputedStatus(hidden, param);
  let actionBtns = mergeActions(actions, methods);
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
const _sfc_main$p = /* @__PURE__ */ defineComponent({
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
    const { btns, moreBtns, defaultAttrs } = useButton(__config, reactive(param || {}), methods);
    const isDivider = __config.divider ?? ["link", "text"].includes(__config.buttonType || "");
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
              tooltip || unref(__config).iconOnly && icon ? (openBlock(), createBlock(unref(Tooltip), {
                key: 0,
                title: tooltip || label
              }, {
                default: withCtx(() => [
                  createVNode(unref(Button), normalizeProps(guardReactiveProps(attrs)), {
                    default: withCtx(() => [
                      icon ? (openBlock(), createBlock(resolveDynamicComponent(unref(useIcon)(icon)), { key: 0 })) : createCommentVNode("", true),
                      !icon || !unref(__config).iconOnly ? (openBlock(), createBlock(resolveDynamicComponent(() => toValue(label)), { key: 1 })) : createCommentVNode("", true)
                    ]),
                    _: 2
                  }, 1040)
                ]),
                _: 2
              }, 1032, ["title"])) : (openBlock(), createBlock(unref(Button), normalizeProps(mergeProps({ key: 1 }, attrs)), {
                default: withCtx(() => [
                  icon ? (openBlock(), createBlock(resolveDynamicComponent(unref(useIcon)(icon)), { key: 0 })) : createCommentVNode("", true),
                  createTextVNode(),
                  (openBlock(), createBlock(resolveDynamicComponent(() => toValue(label))))
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
                  createVNode(unref(EllipsisOutlined))
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
const _base = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Button,
  Card,
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
  Textarea,
  TimePicker,
  Tooltip,
  TreeSelect
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
    disabled: [Boolean, Object]
  },
  setup(props, ctx) {
    const { type: parentType, attrs: parentAttrs, gutter = 16, subSpan } = props.option;
    const rowProps = { gutter, ...props.option.rowProps, ...ctx.attrs };
    const inheritOptions = inject("inheritOptions", {});
    const presetSpan = subSpan ?? inheritOptions.subSpan;
    const nodes = [];
    let currentGroup;
    [...props.model.children].forEach(([option, subData], idx) => {
      const { type, label, align, isBlock, span, hideInForm, labelSlot } = option;
      if (type === "Hidden" || hideInForm)
        return;
      const colProps = { ...option.colProps, span };
      if (span === "auto" || presetSpan === 0 && span === void 0) {
        colProps.span = void 0;
        if (span === "auto")
          colProps.flex = "auto";
      } else {
        defaults(colProps, { span: presetSpan }, globalProps.Col, { span: 8 });
      }
      const effectData = getEffectData({ current: toRef(subData, "parent"), value: toRef(subData, "refData") });
      const { attrs, hidden } = render({
        option,
        effectData,
        inheritDisabled: inheritOptions.disabled
      });
      const __node = buildInnerNode(option, subData, effectData, attrs);
      if (parentType === "InputGroup" && (parentAttrs == null ? void 0 : parentAttrs.compact) !== false) {
        const width = (100 / (24 / colProps.span)).toFixed(2) + "%";
        nodes.push(() => h(__node, { style: `width:${width};` }));
        return;
      }
      let node = __node;
      if (containers.includes(type) || type === "InputGroup") {
        const inheritOptions2 = {
          disabled: attrs.disabled,
          subSpan: option.subSpan ?? presetSpan
        };
        node = () => h(DataProvider, { name: "inheritOptions", data: inheritOptions2 }, __node);
      } else if (!(isBlock && !option.field)) {
        const rules = computed(() => attrs.disabled.value ? void 0 : subData.rules);
        const formItemAttrs = mergeProps(globalProps.FormItem, option.formItemProps);
        const _label = labelSlot || label;
        const _slots = { default: node };
        _label !== void 0 && (_slots.label = () => (labelSlot == null ? void 0 : labelSlot({ ...effectData, label })) || label);
        node = () => h(base.FormItem, { ...formItemAttrs, name: subData.propChain, rules: rules.value, colon: !!_label }, _slots);
      }
      const __isBlock = isBlock ?? (containers.includes(type) && !option.span);
      const alignStyle = align && `text-align: ${align}`;
      if (__isBlock) {
        currentGroup = void 0;
        nodes.push(
          () => !hidden.value && h("div", { class: "sup-form-section", style: alignStyle, key: idx, ...ctx.attrs }, node())
        );
      } else {
        if (!currentGroup) {
          nodes.push(currentGroup = []);
        }
        currentGroup.push(() => !hidden.value && h(Col, mergeProps({ style: alignStyle, key: idx }, colProps), node));
        if (option.isWrap)
          currentGroup = void 0;
      }
    });
    return () => nodes.map((item) => {
      if (Array.isArray(item)) {
        return h(Row, rowProps, () => item.map((node) => node()));
      } else {
        return item();
      }
    });
  }
});
function buildInnerNode(option, model, effectData, attrs) {
  const { type, render: render2 } = option;
  const slots = inject("rootSlots", {});
  const renderSlot = render2 ? typeof render2 === "function" ? render2 : slots[render2] : Controls[type];
  let node;
  if (type === "Text" || type === "InfoSlot") {
    node = renderSlot ? () => renderSlot({ attrs, ...effectData }) : () => h("span", attrs, model.refData);
  } else if (type === "Buttons") {
    node = () => h(_sfc_main$p, { config: option, param: effectData });
  } else if (containers.includes(type)) {
    const viewProps = type === "Descriptions" && { isView: true, class: "sup-detail" };
    node = () => h(Controls[type], reactive({ option, model, effectData, ...attrs, ...viewProps }), slots);
  } else {
    const valueProps = useVModel({ option, model, effectData });
    const allAttrs = { ...attrs, ...valueProps };
    if (type === "InputSlot" || type.startsWith("Ext")) {
      if (!renderSlot) {
        console.error(`组件 '${type}' 配置错误，请检查名称或'render'是否正确！`);
      }
      node = () => renderSlot == null ? void 0 : renderSlot(reactive({ attrs: allAttrs, ...toRefs(effectData) }));
    } else {
      node = () => h(Controls[type], reactive({ option, model, effectData, ...allAttrs }), slots);
    }
  }
  return node;
}
const Descriptions = defineComponent({
  props: {
    option: {
      type: Object,
      required: true
    },
    items: {
      type: Array,
      required: true
    },
    effectData: Object
  },
  setup(props) {
    var _a;
    const { type, subSpan, title, label, attrs: __attrs } = props.option || {};
    const gridConfig = inject("gridConfig", {});
    const {
      column,
      layout,
      bordered,
      mode = bordered && "table",
      labelBgColor,
      borderColor,
      rowProps,
      colon,
      ...descriptionsProps
    } = {
      ...globalProps.Descriptions,
      ...gridConfig.descriptionsProps,
      __attrs,
      ...props.option.descriptionsProps
    };
    const presetSpan = subSpan ?? (column ? 24 / column : gridConfig.subSpan);
    const colNum = column || Math.floor(24 / presetSpan);
    const rowGroup = function() {
      const group = [];
      let current = [];
      let n = 0;
      props.items.forEach(({ option, span = presetSpan, label: label2, content: content2 }, idx) => {
        let ceil = span ? Math.ceil(span / presetSpan) : 1;
        ceil = ceil > colNum ? colNum : ceil;
        const attrs = { ...descriptionsProps, ...option.formItemProps, ...option.descriptionsProps };
        const labelStyle = mergeProps(attrs.labelAlign ? { align: attrs.labelAlign } : {}, attrs.labelStyle);
        const item = {
          labelCol: mergeProps({ style: labelStyle, class: { "sup-label-no-colon": attrs.noColon } }, attrs.labelCol),
          wrapperCol: mergeProps({ style: attrs.contentStyle }, attrs.wrapperCol),
          option,
          attrs,
          span,
          label: label2,
          content: content2,
          colspan: ceil
        };
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
        if (idx === props.items.length - 1) {
          group.push(current);
        }
      });
      return group;
    }();
    let colorStyle = "";
    borderColor && (colorStyle += `--descriptions-border-color:${borderColor};`);
    labelBgColor && (colorStyle += `--descriptions-bg-color:${labelBgColor};`);
    ((_a = inject("configProvider", void 0)) == null ? void 0 : _a.getPrefixCls()) || "ant";
    let content;
    if (mode === "table") {
      const rows = () => layout === "vertical" ? rowGroup.flatMap((group) => [
        h(
          "tr",
          { class: "ant-descriptions-row" },
          group.map(
            (item) => h(
              "th",
              mergeProps(
                {
                  class: "ant-descriptions-item-label",
                  colspan: item.colspan,
                  style: `width: ${(item.span / 24 * 100).toFixed(2)}%`
                },
                { class: item.labelCol.class, style: item.labelCol.style }
              ),
              toNode(item.label, props.effectData)
            )
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
        rowGroup.map(
          (group, idx) => h(
            "tr",
            { class: "ant-descriptions-row" },
            group.flatMap((item) => [
              h(
                "th",
                mergeProps(
                  { class: "ant-descriptions-item-label" },
                  { class: item.labelCol.class, style: item.labelCol.style }
                ),
                toNode(item.label, props.effectData)
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
      );
      content = () => h("table", {}, rows());
    } else {
      content = () => rowGroup.map(
        (group) => h(
          Row,
          { class: "ant-descriptions-row", ...rowProps },
          () => group.map(
            (item) => h(
              Col,
              { span: item.span, ...item.option.colProps },
              () => h(Row, { class: ["ant-descriptions-item-container"] }, () => [
                h(
                  Col,
                  mergeProps({ class: "ant-descriptions-item-label" }, item.labelCol),
                  () => h("label", {}, toNode(item.label, props.effectData))
                ),
                h(
                  Col,
                  { class: "ant-descriptions-item-content", ...item.wrapperCol },
                  () => h(
                    "div",
                    {
                      class: { "sup-descriptions-item-input": !item.attrs.noStyle && mode === "form" }
                    },
                    item.content()
                  )
                )
              ])
            )
          )
        )
      );
    }
    return () => h(
      "div",
      {
        style: colorStyle,
        class: [
          "ant-descriptions-view",
          layout === "vertical" && "ant-descriptions-vertical",
          mode === "form" && "sup-descriptions-mode-form",
          mode === "table" && "ant-descriptions-bordered",
          colon === false && "ant-descriptions-item-no-colon"
        ]
      },
      content()
    );
  }
});
function useColumns({ childrenMap, effectData, getEditRender, actionColumn }) {
  const { columns, colsMap } = buildColumns(childrenMap);
  const rootSlots = { ...inject("rootSlots", {}) };
  if (actionColumn) {
    const { forSlot, render: render2, column } = actionColumn;
    if (forSlot) {
      rootSlots[forSlot] = render2;
    } else {
      columns.push(column);
      colsMap.set("action", column);
    }
  }
  [...colsMap].forEach(([col, column]) => {
    let textRender = column.customRender;
    if (typeof textRender === "string") {
      textRender = rootSlots[textRender];
    }
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
    if (col.type === "Hidden" || col.hideInTable)
      return;
    if (model.children) {
      const sub = buildColumns(model.children, colsMap);
      columns.push({
        title: col.label,
        children: sub.columns
      });
    } else {
      const column = {
        title: col.label,
        dataIndex: model.propChain.join("."),
        ...globalProps.Column,
        ...col.columnProps,
        customRender: getColRender(col)
      };
      columns.push(column);
      colsMap.set(col, column);
    }
  });
  return { columns, colsMap };
}
function getColRender(option) {
  const {
    type: colType,
    viewRender,
    render: render2,
    options: colOptions,
    dictName,
    labelField,
    keepField,
    valueToNumber,
    valueToLabel
  } = option;
  if (viewRender) {
    return viewRender;
  } else if (colType === "InfoSlot" || colType === "Text") {
    return typeof render2 === "string" ? render2 : (param) => render2 == null ? void 0 : render2(param);
  } else if (labelField) {
    return ({ record }) => record[labelField];
  } else if (keepField) {
    return ({ record, text }) => text + " - " + record[labelField];
  } else if (isArray(colOptions) && typeof colOptions[0] === "string") {
    if (valueToLabel)
      return;
    return ({ text }) => colOptions[text];
  } else if (dictName || colOptions) {
    const options = ref();
    if (dictName && globalConfig.dictApi) {
      globalConfig.dictApi(dictName).then((data) => options.value = data);
    } else if (typeof colOptions === "function") {
      Promise.resolve(colOptions()).then((data) => options.value = data);
    } else {
      options.value = unref(colOptions);
    }
    return ({ text }) => {
      var _a, _b;
      return (_b = (_a = options.value) == null ? void 0 : _a.find(({ value }) => (valueToNumber ? Number(value) : value) === text)) == null ? void 0 : _b.label;
    };
  } else if (colType === "Switch") {
    return ({ text }) => (option.valueLabels || "否是")[text];
  } else if (colType === "Buttons") {
    return (param) => h(_sfc_main$p, { config: option, param });
  } else
    ;
}
function buildActionSlot(rowButtons, methods, getEditActions) {
  const buttonsConfig = {
    buttonType: "link",
    size: "small",
    ...Array.isArray(rowButtons) ? { actions: rowButtons } : rowButtons
  };
  const { columnProps, forSlot, ...config } = buttonsConfig;
  const render2 = (param) => {
    const actions = getEditActions == null ? void 0 : getEditActions(param);
    return actions ? h(_sfc_main$p, { key: "edit", config: { ...config, actions }, param }) : h(_sfc_main$p, { key: param.record, config, param, methods });
  };
  return {
    forSlot,
    render: render2,
    column: {
      title: "操作",
      key: "action",
      fixed: "right",
      minWidth: 100,
      align: "center",
      ...columnProps,
      customRender: render2
    }
  };
}
const _sfc_main$o = defineComponent({
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
    effectData: Object,
    apis: Object
  },
  emits: ["register"],
  setup({ option, model, apis = {}, effectData }, ctx) {
    var _a;
    const attrs = ctx.attrs;
    const rowKey = attrs.rowKey || "id";
    const orgList = toRef(model, "refData");
    const listData = model.listData;
    const columns = useColumns({ childrenMap: listData.modelsMap });
    const title = ((_a = option.descriptionsProps) == null ? void 0 : _a.title) || option.title || option.label;
    const titleSlot = () => title && h("div", { class: "sup-title ant-descriptions-header" }, toNode(title));
    return () => [
      titleSlot(),
      h(base.Table, {
        dataSource: orgList.value,
        columns,
        tableLayout: "fixed",
        bordered: true,
        pagination: false,
        ...attrs,
        rowKey
      })
    ];
  }
});
const DetailLayouts = defineComponent({
  props: {
    option: Object,
    modelsMap: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const { subSpan, gutter, rowProps, type, attrs = {}, descriptionsProps = attrs } = props.option || {};
    const __rowProps = { ...globalProps.Row, gutter, ...rowProps };
    __rowProps.gutter ?? (__rowProps.gutter = 16);
    const formAttrs = inject("exaProvider", {}).attrs;
    let gridConfig = inject("gridConfig", { descriptionsProps: formAttrs });
    const presetSpan = subSpan ?? descriptionsProps.subSpan ?? (gridConfig.subSpan || 12);
    gridConfig = { subSpan: presetSpan, descriptionsProps: { ...gridConfig.descriptionsProps, ...descriptionsProps } };
    const items = buildNodes(props.modelsMap, props.option);
    const nodeGroup = [];
    let current;
    if (type === "Card") {
      nodeGroup.push(...items.map((item) => item.node));
    } else {
      items.forEach((item, idx) => {
        if (item.isBlock) {
          nodeGroup.push(() => h("div", { class: "sup-form-section", key: idx }, item.node()));
          current = void 0;
        } else {
          let colProps = item.option.colProps;
          if (!colProps) {
            colProps = { ...globalProps.Col };
            colProps.span = item.option.span ?? presetSpan ?? colProps.span ?? 8;
          }
          nodeGroup.push(current = []);
          current.push(() => h(Col, { ...colProps, key: idx }, item.node));
        }
      });
    }
    return () => h(
      DataProvider,
      { name: "gridConfig", data: gridConfig },
      () => nodeGroup.map((item) => {
        if (Array.isArray(item)) {
          return h(Row, __rowProps, () => item.map((node) => node()));
        } else {
          return item();
        }
      })
    );
  }
});
function buildNodes(modelsMap, preOption) {
  const nodes = [];
  let currentGroup = [];
  [...modelsMap].forEach(([option, model], idx) => {
    var _a;
    const { type, label, labelSlot, attrs, span, hideInDescription } = option;
    if (type === "Hidden" || hideInDescription)
      return;
    const effectData = getEffectData({ current: toRef(model, model.refData ? "refData" : "parent") });
    let isBlock = option.isBlock;
    let wrapNode;
    if (model.children || model.listData) {
      isBlock ?? (isBlock = !option.span);
      const modelsMap2 = model.children || ((_a = model.listData) == null ? void 0 : _a.modelsMap);
      if (type === "InputGroup") {
        const contents = [...modelsMap2].map((ent) => getContent(...ent));
        currentGroup.push({
          option,
          label: labelSlot || label,
          span,
          content: () => contents.map((node) => node == null ? void 0 : node())
        });
      } else {
        const viewType = ["Tabs", "Collapse", "Card", "Table", "Group"].includes(type) ? type : type === "List" ? "Table" : "Group";
        const Control = viewType === "Table" ? _sfc_main$o : Controls[viewType];
        wrapNode = () => h(Control, { option, model, effectData, isView: true, ...globalProps[viewType], ...attrs });
      }
    } else {
      currentGroup.push({
        option,
        label: labelSlot || label,
        span,
        content: getContent(option, model)
      });
    }
    if (isBlock || wrapNode || idx === modelsMap.size - 1) {
      if (currentGroup == null ? void 0 : currentGroup.length) {
        const props = { option: preOption, items: currentGroup, effectData };
        const preBlock = preOption.isBlock ?? !preOption.span;
        nodes.push({ option: preOption, isBlock: preBlock, node: () => h(Descriptions, props) });
        currentGroup = [];
      }
      wrapNode && nodes.push({ option, isBlock, node: wrapNode });
    }
  });
  return nodes;
}
function getContent(option, model) {
  const rootSlots = inject("rootSlots", {});
  const value = toRef(model, "refData");
  const effectData = getEffectData({ current: model.parent, value, text: value });
  const {
    type: colType,
    viewRender,
    render: render2,
    options: colOptions,
    dictName,
    labelField,
    keepField,
    valueToNumber,
    valueToLabel
  } = option;
  if (viewRender || colType === "InfoSlot") {
    const _render = viewRender || render2;
    return () => {
      var _a;
      return typeof _render === "function" ? _render == null ? void 0 : _render(effectData) : (_a = rootSlots[_render]) == null ? void 0 : _a.call(rootSlots, effectData);
    };
  } else if (labelField) {
    return () => model.parent[labelField];
  } else if (keepField) {
    return () => `${model.refData ?? ""} - ${model.parent[keepField] ?? ""}`;
  } else if (isArray(colOptions) && typeof colOptions[0] === "string") {
    if (valueToLabel)
      return;
    return () => colOptions[model.refData];
  } else if (dictName || colOptions && typeof colOptions[0] !== "string") {
    if (valueToLabel)
      return;
    const options = ref();
    if (dictName && globalConfig.dictApi) {
      globalConfig.dictApi(dictName).then((data) => options.value = data);
    } else if (typeof colOptions === "function") {
      Promise.resolve(colOptions(effectData)).then((data) => options.value = data);
    } else {
      options.value = unref(colOptions);
    }
    return () => {
      var _a, _b;
      return (_b = (_a = options.value) == null ? void 0 : _a.find(({ value: value2 }) => (valueToNumber ? Number(value2) : value2) === model.refData)) == null ? void 0 : _b.label;
    };
  } else if (colType === "Switch") {
    return () => (option.valueLabels || "否是")[model.refData];
  } else if (colType === "Buttons") {
    return () => h(_sfc_main$p, { config: option, param: effectData });
  } else {
    return () => model.refData;
  }
}
const _sfc_main$n = defineComponent({
  props: {
    option: {
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
    const { modelsMap } = cloneModels(props.modelsMap, toRef(props, "source"));
    provide("exaProvider", { data: toRef(props, "source") });
    return () => {
      var _a;
      return h(
        "div",
        { class: ["sup-form sup-detail", ((_a = ctx.attrs) == null ? void 0 : _a.isContainer) && "sup-container"] },
        h(DetailLayouts, { option: props.option, modelsMap })
      );
    };
  }
});
const _sfc_main$m = defineComponent({
  props: {
    option: { type: Object, required: true },
    model: { type: Object, required: true },
    effectData: Object,
    disabled: Boolean,
    isView: Boolean
  },
  setup({ option, model, effectData, isView }, ctx) {
    const { label, title = label, buttons } = option;
    const slots = {
      ...ctx.slots,
      title: () => toNode(title, effectData),
      extra: () => buttons && !isView && h(_sfc_main$p, { config: buttons, param: effectData }),
      default: () => isView ? h(DetailLayouts, { option, modelsMap: model.children }) : h(Collections, { option, model })
    };
    const CustomComponent = option.component && toRaw(option.component);
    if (CustomComponent) {
      return () => h(CustomComponent, {}, slots);
    } else {
      return () => h("div", {}, [
        title && h("div", { class: "sup-title ant-descriptions-header" }, slots.title()),
        slots.default()
      ]);
    }
  }
});
const _sfc_main$l = {
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
    methods: Object
  },
  emits: ["register", "submit", "reset"],
  setup(props, { expose, emit, slots }) {
    const formRef = ref();
    const modelData = ref(props.source || {});
    const { buttons, ignoreRules } = props.option;
    let subItems = props.option.subItems;
    if (buttons) {
      subItems = [
        ...subItems,
        {
          type: "InfoSlot",
          isBlock: true,
          align: "center",
          colProps: { flex: "auto" },
          render: () => h(_sfc_main$p, { config: buttons, param: { ...effectData, formRef: exposeData } })
        }
      ];
    }
    const { modelsMap, initialData } = buildModelsMap(subItems, modelData);
    const effectData = reactive({ formData: modelData, current: modelData });
    const { attrs } = render({ option: props.option, effectData });
    provide("exaProvider", { data: readonly(modelData), attrs });
    if (ignoreRules) {
      Object.assign(attrs, { hideRequiredMark: true, validateTrigger: "none" });
    }
    const actions = {
      dataSource: modelData,
      submit: () => {
        return formRef.value.validate().then((...args) => {
          const data = cloneDeep(modelData.value);
          emit("submit", data);
          return data;
        });
      },
      setFieldsValue(data) {
        var _a;
        (_a = formRef.value) == null ? void 0 : _a.clearValidate();
        return setFieldsValue(modelData.value, data);
      },
      resetFields(defData = initialData) {
        var _a;
        resetFields(modelData.value, defData);
        (_a = formRef.value) == null ? void 0 : _a.clearValidate();
        const data = cloneDeep(modelData.value);
        emit("reset", data);
        return data;
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
    provide("rootSlots", slots);
    return () => h(
      base.Form,
      {
        ref: getForm,
        class: ["sup-form", props.option.compact && "sup-form-compact"],
        model: modelData.value,
        ...attrs
      },
      {
        ...slots,
        default: () => {
          var _a;
          return [
            h(Collections, { option: props.option, model: { refData: modelData, children: modelsMap } }),
            // buttons &&
            //   h(baseComp.Row, { justify: 'end' }, () =>
            //     h(ButtonGroup, { config: buttons, param: { ...effectData, formRef } })
            //   ),
            (_a = slots.default) == null ? void 0 : _a.call(slots)
          ];
        }
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
const Form = /* @__PURE__ */ _export_sfc(_sfc_main$l, [["__cssModules", cssModules]]);
const _sfc_main$k = defineComponent({
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
    const { field, label, labelSlot } = option;
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
        watch(model.refData, () => () => formItemContext.value.onFieldChange(), { deep: true });
      } else {
        const { rules: rules2, propChain, refName } = [...model.children.values()].find((val) => !!val.rules);
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
      extProps.style = "margin: 0";
    }
    const rules = computed(() => props.disabled ? void 0 : ruleObj);
    const formItemAttrs = mergeProps(globalProps.FormItem, option.formItemProps, extProps);
    return () => h(
      base.FormItem,
      { ...formItemAttrs, rules: rules.value, ref: formItemContext, name: _propChain },
      {
        label: () => (labelSlot == null ? void 0 : labelSlot(props.effectData)) || label,
        default: () => h(FormItemRest, () => h(base.InputGroup, { compact, ...attrs }, () => h(Collections, { option, model })))
      }
    );
  }
});
const _sfc_main$j = /* @__PURE__ */ defineComponent({
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
    disabled: Boolean,
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
      extra: () => buttons && !isView && h(_sfc_main$p, {
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
const _sfc_main$i = defineComponent({
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
  setup({ model, option, isView, effectData }) {
    const { buttons: buttonsConfig, rowButtons, label, title = label, slots: optionSlots } = option;
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
    const rootSlots = inject("rootSlot", {});
    const slots = {};
    if (optionSlots) {
      Object.entries(optionSlots).forEach(([key, value]) => {
        slots[key] = typeof value === "string" ? rootSlots[value] : value;
      });
    }
    slots.title || (slots.title = title && (() => toNode(title, effectData)));
    if (!isView && buttonsConfig) {
      const slotName = buttonsConfig["forSlot"] || "extra";
      const orgSlot = slots[slotName];
      slots[slotName] = () => [orgSlot == null ? void 0 : orgSlot(), h(_sfc_main$p, { config: buttonsConfig, param: effectData, methods })];
    }
    const { title: titleSlot, extra: extraSlot, ...__slots } = slots;
    if (titleSlot || extraSlot) {
      __slots.header = () => h(Row, { justify: "space-between", align: "middle" }, () => [
        h("div", { class: "sup-title" }, titleSlot == null ? void 0 : titleSlot()),
        extraSlot == null ? void 0 : extraSlot()
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
        default: () => isView ? h(DetailLayouts, { option, modelsMap: item.model.children }) : [
          h(Collections, { model: item.model, option, class: "ant-list-item-meta" }),
          rowButtonsConfig && h(_sfc_main$p, {
            config: rowButtonsConfig,
            methods,
            param: item.effectData,
            class: "ant-list-item-action"
          })
        ]
      }
    );
    return () => h(base.List, { dataSource: listItems.value }, __slots);
  }
});
const __default__ = {
  name: "ExTabs"
};
const _sfc_main$h = /* @__PURE__ */ defineComponent({
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
    const props = __props;
    const activeKey = ref(toRef(props.option, "activeKey"));
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
    const panes = [...props.model.children].map(([option, model], idx) => {
      const {
        key,
        field,
        label,
        icon
      } = option;
      const effectData = getEffectData({
        current: toRef(props.model, "refData")
      });
      const {
        attrs,
        hidden
      } = render({
        option,
        effectData
      });
      const tabKey = key || field || String(idx);
      const tabLabel = () => [useIcon(icon), label];
      watchEffect(() => {
        planeHideEvent(idx, tabKey, hidden.value || attrs.disabled.value);
      });
      return {
        attrs: reactive({
          ...attrs,
          key: tabKey,
          tab: tabLabel
        }),
        hidden,
        option,
        model
      };
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(Tabs2), {
        activeKey: activeKey.value,
        "onUpdate:activeKey": _cache[0] || (_cache[0] = ($event) => activeKey.value = $event)
      }, {
        rightExtra: withCtx(() => [!_ctx.isView && _ctx.option.buttons ? (openBlock(), createBlock(unref(_sfc_main$p), {
          key: 0,
          config: _ctx.option.buttons
        }, null, 8, ["config"])) : createCommentVNode("", true)]),
        default: withCtx(() => [(openBlock(true), createElementBlock(Fragment, null, renderList(unref(panes), ({
          attrs,
          hidden,
          option,
          model
        }) => {
          return openBlock(), createElementBlock(Fragment, {
            key: attrs.key
          }, [!hidden.value ? (openBlock(), createBlock(unref(TabPane2), normalizeProps(mergeProps({
            key: 0
          }, attrs)), {
            default: withCtx(() => [_ctx.isView ? (openBlock(), createBlock(unref(DetailLayouts), {
              key: 0,
              option,
              modelsMap: model.children
            }, null, 8, ["option", "modelsMap"])) : (openBlock(), createBlock(unref(Collections), {
              key: 1,
              option,
              model
            }, null, 8, ["option", "model"]))]),
            _: 2
          }, 1040)) : createCommentVNode("", true)], 64);
        }), 128))]),
        _: 1
      }, 8, ["activeKey"]);
    };
  }
});
function createModal(content, { buttons, ...__config } = {}) {
  const visible = ref(false);
  const config = reactive({ ...__config, ...globalProps.Modal });
  const modalRef = ref();
  if (buttons) {
    __config.footer = () => h(_sfc_main$p, { config: buttons, param: { modalRef } });
  }
  const onOk = () => {
    var _a;
    return Promise.resolve((_a = config.onOk) == null ? void 0 : _a.call(config)).then(() => {
      visible.value = false;
    }).catch((err) => console.error(err));
  };
  const updateVisible = (val) => visible.value = val;
  const modalSlot = (props, ctx) => h(
    base.Modal,
    { ref: modalRef, visible: visible.value, "onUpdate:visible": updateVisible, ...config, ...props, onOk },
    { ...ctx == null ? void 0 : ctx.slots, default: content }
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
function useModal(content, config = {}) {
  const { modalSlot, openModal, modalRef, closeModal, setModal } = createModal(content, config);
  const ins = getCurrentInstance();
  const open = (option) => {
    if (modalRef.value) {
      return openModal(option);
    } else {
      const wrap = document.createElement("div");
      const vm = createVNode(modalSlot, { appContext: ins.appContext });
      vm.appContext = ins == null ? void 0 : ins.appContext;
      render$1(vm, wrap);
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
      listener.onDelete(items);
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
          listener.onSave(record);
          editInfo.isNew = false;
        } else {
          listener.onUpdate(raw, record);
        }
        editInfo.isEdit = false;
      }).catch((err) => {
        console.log("error", err);
        message.error(err.errorFields[0].errors[0]);
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
  const getEditActions = (param) => {
    const editInfo = getEditInfo(param.record);
    return editInfo.isEdit ? editActions : null;
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
      const model = modelsMap.get(option);
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
    getEditActions
  };
}
function modalEdit({ initialData, rowKey, option, listener }) {
  const source = ref({});
  const formRef = ref();
  const formOption = { ...option.formSechma };
  formOption.subItems = formOption.subItems || option.columns.filter((item) => !item.hideInForm);
  const editForm = () => h(Controls.Form, {
    option: formOption,
    source: source.value,
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
      openModal({
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
      openModal({
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
  const detail = () => h(_sfc_main$n, { option, modelsMap, source });
  const { openModal, closeModal } = useModal(detail, {
    ...globalProps.Modal,
    ...option.modalProps,
    title: "查看详情",
    footer: null
  });
  return async ({ record, selectedRows, meta }) => {
    var _a;
    const data = record || selectedRows[0];
    if ((_a = option.apis) == null ? void 0 : _a.info) {
      source.value = await option.apis.info(record[rowKey], record);
    } else {
      source.value = data;
    }
    openModal({ ...meta });
  };
}
function buildData({ option, listData, orgList, rowKey, listener }) {
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
  let __getEditActions;
  if (editMode === "inline") {
    const { list, methods, getEditActions, getEditRender } = inlineRender({ childrenMap, orgList, rowKey, listener });
    context.list = list;
    Object.assign(context.methods, methods);
    __getEditActions = getEditActions;
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
  const actionColumn = rowButtons && buildActionSlot(rowButtons, context.methods, __getEditActions);
  context.columns = useColumns({ childrenMap, effectData, getEditRender: __getEditRender, actionColumn });
  context.methods.detail = buildDetail(option, childrenMap, rowKey);
  return context;
}
const _sfc_main$g = defineComponent({
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
    disabled: Boolean,
    effectData: Object,
    apis: Object
  },
  emits: ["register"],
  setup({ option, model, apis = {}, effectData }, ctx) {
    const editInline = option.editMode === "inline";
    const attrs = ctx.attrs;
    const rowKey = attrs.rowKey || "id";
    const orgList = toRef(model, "refData");
    const listData = model.listData;
    const selectedRowKeys = ref([]);
    const selectedRows = ref([]);
    const rowSelection = !attrs.rowSelection && attrs.rowSelection !== void 0 ? void 0 : reactive(
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
    );
    const listener = {
      async onSave(data) {
        if (apis.save) {
          await apis.save(data);
          return apis.query();
        } else {
          orgList.value.push(data);
        }
      },
      async onUpdate(newData, oldData) {
        if (apis.update) {
          await apis.update(newData);
          return apis.query();
        } else {
          Object.assign(oldData, newData);
        }
      },
      async onDelete(items) {
        if (apis.delete) {
          await apis.delete(items);
          return apis.query();
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
    const { list, columns, methods, modalSlot } = buildData({ option, listData, orgList, rowKey, listener });
    const tableRef = ref();
    const actions = {
      selectedRowKeys,
      selectedRows,
      reload: (param) => {
        var _a;
        return (_a = apis.query) == null ? void 0 : _a.call(apis, param);
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
    const rootSlots = inject("rootSlot", {});
    const slots = { ...ctx.slots };
    if (option.slots) {
      Object.entries(option.slots).forEach(([key, value]) => {
        slots[key] = typeof value === "string" ? rootSlots[value] : value;
      });
    }
    const buttonsConfig = option.buttons;
    if (buttonsConfig) {
      const slotName = buttonsConfig.forSlot || "extra";
      const orgSlot = slots[slotName];
      slots[slotName] = () => [
        orgSlot == null ? void 0 : orgSlot(),
        h(_sfc_main$p, {
          config: buttonsConfig,
          param: editParam,
          methods
        })
      ];
    }
    const titleString = option.title || option.label;
    const { title: titleSlot, extra: extraSlot, ...__slots } = slots;
    if (titleString || titleSlot || extraSlot) {
      __slots.title = () => h(Row, { justify: "space-between", align: "middle" }, () => [
        h("div", { class: "sup-title" }, toNode(titleSlot || titleString, effectData)),
        extraSlot == null ? void 0 : extraSlot()
      ]);
    }
    return () => [
      modalSlot == null ? void 0 : modalSlot(),
      h(
        base.Table,
        {
          ref: tableRef,
          dataSource: list.value,
          columns,
          tableLayout: "fixed",
          pagination: false,
          ...attrs,
          rowSelection,
          rowKey
        },
        __slots
      )
    ];
  }
});
const _sfc_main$f = defineComponent({
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
const _sfc_main$e = /* @__PURE__ */ defineComponent({
  ...{
    inheritAttrs: false
  },
  __name: "Collapse",
  props: {
    option: {},
    model: {},
    effectData: {},
    disabled: { type: Boolean },
    isView: { type: Boolean }
  },
  setup(__props) {
    const { Collapse: Collapse2, CollapsePanel: CollapsePanel2 } = base;
    const props = __props;
    const title = props.option.title || props.option.label;
    const panels = [...props.model.children].map(([option, model], idx) => {
      const effectData = getEffectData({ current: toRef(props.model, "refData") });
      const { attrs: __attrs, hidden } = render({ option, effectData });
      const { key, field } = option;
      const { disabled, ...attrs } = __attrs;
      return {
        attrs: reactive(attrs),
        option,
        effectData,
        model,
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
            (openBlock(true), createElementBlock(Fragment, null, renderList(unref(panels), ({ attrs, hidden, option, disabled, model, key }) => {
              return openBlock(), createElementBlock(Fragment, { key }, [
                !hidden.value ? (openBlock(), createBlock(unref(CollapsePanel2), mergeProps({
                  key: 0,
                  header: option.label,
                  collapsible: disabled.value ? "disabled" : void 0
                }, attrs), createSlots({
                  default: withCtx(() => [
                    _ctx.isView ? (openBlock(), createBlock(unref(DetailLayouts), {
                      key: 0,
                      option,
                      modelsMap: model.children
                    }, null, 8, ["option", "modelsMap"])) : (openBlock(), createBlock(unref(Collections), {
                      key: 1,
                      option,
                      model
                    }, null, 8, ["option", "model"]))
                  ]),
                  _: 2
                }, [
                  !_ctx.isView ? {
                    name: "extra",
                    fn: withCtx(() => [
                      option.buttons ? (openBlock(), createBlock(unref(_sfc_main$p), {
                        key: 0,
                        config: option.buttons,
                        param: _ctx.effectData
                      }, null, 8, ["config", "param"])) : createCommentVNode("", true)
                    ]),
                    key: "0"
                  } : void 0
                ]), 1040, ["header", "collapsible"])) : createCommentVNode("", true)
              ], 64);
            }), 128))
          ]),
          _: 1
        }, 16, ["activeKey"])
      ], 64);
    };
  }
});
const _sfc_main$d = /* @__PURE__ */ defineComponent({
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
    onSearch: {}
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
        class: normalizeClass(_ctx.onSearch || unref(option).enterButton ? "ant-input-search ant-input-search-enter-button" : "")
      }, createSlots({
        addonAfter: withCtx(() => [
          unref(option).enterButton ? (openBlock(), createBlock(resolveDynamicComponent(unref(toNode)(unref(option).enterButton, _ctx.effectData)), {
            key: 0,
            onClick: _cache[0] || (_cache[0] = () => {
              var _a;
              return (_a = _ctx.onSearch) == null ? void 0 : _a.call(_ctx, _ctx.effectData.value);
            })
          })) : _ctx.onSearch ? (openBlock(), createBlock(unref(Button2), {
            key: 1,
            disabled: _ctx.$attrs.disabled,
            onClick: _cache[1] || (_cache[1] = () => {
              var _a;
              return (_a = _ctx.onSearch) == null ? void 0 : _a.call(_ctx, _ctx.effectData.value);
            })
          }, {
            default: withCtx(() => [
              unref(addonAfter) ? (openBlock(), createBlock(resolveDynamicComponent(unref(toNode)(unref(addonAfter))), { key: 0 })) : (openBlock(), createBlock(unref(SearchOutlined), { key: 1 }))
            ]),
            _: 1
          }, 8, ["disabled"])) : unref(addonAfter) ? (openBlock(), createBlock(resolveDynamicComponent(unref(toNode)(unref(addonAfter))), { key: 2 })) : createCommentVNode("", true)
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
      ]), 1032, ["placeholder", "class"]);
    };
  }
});
const _sfc_main$c = /* @__PURE__ */ defineComponent({
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
    const _list = list.value;
    if (!_list.length)
      return _list;
    let _options = _list;
    if (_list.length && typeof _list[0] !== "object") {
      _options = uniq(_list).map((val, idx) => {
        const label = String(val);
        return { value: valueToLabel ? label : idx, label };
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
const _sfc_main$b = /* @__PURE__ */ defineComponent({
  __name: "Select",
  props: {
    option: {},
    model: {},
    effectData: {},
    options: {},
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
const _sfc_main$9 = defineComponent({
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
const _sfc_main$8 = defineComponent({
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
    return () => h(base.DatePicker, { autofocus: true, valueFormat: "YYYY-MM-DD", disabledDate });
  }
});
const _sfc_main$7 = defineComponent({
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
const _sfc_main$6 = defineComponent({
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
const _sfc_main$5 = defineComponent({
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
  setup(props) {
    const { optionsRef } = useOptions(props.option, props.options, props.effectData);
    return () => h(CheckboxGroup, { options: optionsRef.value, name: props.option.field });
  }
});
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
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
const components = {
  Form,
  Group: _sfc_main$m,
  Card: _sfc_main$j,
  List: _sfc_main$i,
  Tabs: _sfc_main$h,
  Table: _sfc_main$g,
  Collapse: _sfc_main$e,
  Descriptions: _sfc_main$m
};
const formItems = {
  Textarea: _sfc_main$f,
  Input: _sfc_main$d,
  InputNumber: _sfc_main$c,
  InputGroup: _sfc_main$k,
  Select: _sfc_main$b,
  Switch: _sfc_main$a,
  DateRange: _sfc_main$9,
  DatePicker: _sfc_main$8,
  TimePicker: _sfc_main$7,
  Radio: _sfc_main$6,
  Checkbox: _sfc_main$5,
  TreeSelect: _sfc_main$4
};
const containers = Object.keys(components);
const allItems = { ...formItems, ...components };
function addComponent(name, component) {
  const customName = `Ext${name}`;
  allItems[customName] = (props) => {
    return typeof component === "function" ? component(props) : h(component, props.attrs);
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
const _sfc_main$3 = defineComponent({
  inheritAttrs: false,
  name: "SuperForm",
  props: {
    config: Object,
    model: Object,
    isContainer: Boolean,
    /** 减少行距 */
    compact: Boolean
  },
  emits: ["register"],
  setup(props, ctx) {
    var _a;
    const { config, model, ...others } = props;
    const { class: __class, ...attrs } = ctx.attrs;
    const formData = ref({});
    const formRef = ref();
    const formOption = reactive({
      ...config,
      ...others,
      attrs: mergeProps({ ...globalProps.Form }, { ...(_a = props.config) == null ? void 0 : _a.attrs }, attrs)
    });
    const actions = {
      setOption: (_option) => {
        merge(formOption, _option, formOption);
        if (formOption.model) {
          formData.value = formOption.model;
          delete formOption.model;
        }
      },
      setData: (data) => {
        data && (formData.value = data);
      }
    };
    watchEffect(() => actions.setData(props.model));
    ctx.emit("register", actions);
    const register = (compRef) => {
      formRef.value = compRef;
      ctx.emit("register", actions, compRef);
    };
    onMounted(() => ctx.expose(formRef.value));
    const formNode = () => formOption.subItems && h(
      Controls.Form,
      {
        option: formOption,
        source: formData.value,
        onRegister: register,
        ...mergeProps({ class: __class }, { class: formOption.isContainer && "sup-container" })
      },
      ctx.slots
    );
    return formNode;
  }
});
function useForm(option, data) {
  const [formRef, getForm] = useGetRef();
  const register = (actions, ref2) => {
    if (actions) {
      if (!formRef.value) {
        if (typeof option === "function") {
          Promise.resolve(option()).then((_option) => {
            actions.setOption(_option);
          });
        } else {
          actions.setOption(option);
        }
        if (data) {
          watchEffect(() => actions.setData(data));
        }
      }
      formRef.value = ref2;
    } else {
      return (props, ctx) => h(_sfc_main$3, { ...props, onRegister: register }, ctx == null ? void 0 : ctx.slots);
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
  const request = (params = {}) => {
    var _a;
    if (!queryApi.value)
      return;
    if (loading.value)
      return Promise.reject(() => console.warn("跳过重复执行！")).finally();
    const _params = {
      ...unref(option.params),
      ...searchParam.value,
      ...pageParam,
      ...params
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
  const throttleRequest = throttle(request, 200, { "trailing": true });
  const goPage = (current, size = pageParam.size) => {
    pageParam.current = current;
    pageParam.size = size;
    throttleRequest();
  };
  const query = (param) => {
    searchParam.value = { ...param };
    pageParam.current = 1;
    return throttleRequest();
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
          // TODO 默认分页参数
          onChange: goPage,
          onShowSizeChange: goPage
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
  watch(
    () => [apis.value, option.params],
    () => queryApi.value && throttleRequest(),
    { immediate: true, deep: true }
  );
  return {
    apis,
    goPage,
    reload: request,
    query,
    pagination,
    dataSource,
    onLoaded,
    loading
  };
}
function useSearchForm(columns, searchSechma, tableRef, onChange) {
  const { buttons = {}, ...formOption } = searchSechma;
  Object.assign(formOption, {
    ignoreRules: true
  });
  formOption.subItems = searchSechma.subItems.map((item) => {
    if (typeof item === "string") {
      return columns.find((col) => col.field === item);
    } else {
      return item;
    }
  });
  const formRef = ref();
  const formData = reactive({});
  const defaultAction = {
    submit() {
      onChange(toRaw(formData));
    },
    reset() {
      const data = formRef.value.resetFields();
      onChange(data);
    }
  };
  const buttonsConfig = Array.isArray(buttons) ? { actions: buttons } : { ...buttons };
  const __actions = buttonsConfig.actions || ["submit", "reset"];
  if (__actions.includes("submit"))
    __actions[__actions.indexOf("submit")] = { name: "submit", label: "查询" };
  const actions = mergeActions(__actions, defaultAction);
  if (actions == null ? void 0 : actions.length) {
    formOption.subItems.push({
      type: "InfoSlot",
      align: "right",
      span: "auto",
      render: () => h(_sfc_main$p, {
        config: { ...buttonsConfig, actions },
        param: getEffectData({ table: tableRef, form: formRef })
      })
    });
  } else {
    const debounceQuery = debounce(onChange, 500, { maxWait: 1e3 });
    watch(formData, debounceQuery);
  }
  const formNode = () => h(Controls.Form, { option: formOption, source: formData, ref: formRef });
  return { formNode, formRef };
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
function useTableScroll(option, dataRef, wrapRef) {
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
    window.addEventListener("resize", debounceRedoHeight);
    onUnmounted(() => {
      window.removeEventListener("resize", debounceRedoHeight);
    });
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
      x: "100%",
      scrollToFirstRowOnChange: true,
      ...scroll
    };
  }
  async function calcTableHeight() {
    var _a;
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
    const headerHeight = ((_a = tableEl.querySelector(".ant-table-title")) == null ? void 0 : _a.offsetHeight) ?? 0;
    const headEl = tableEl.querySelector(".ant-table-thead ");
    if (!headEl)
      return;
    let headerCellHeight = 0;
    if (headEl) {
      headerCellHeight = headEl.offsetHeight;
    }
    let footerHeight = 0;
    const footerEl = tableEl.querySelector(".ant-table-footer");
    if (footerEl) {
      footerHeight += footerEl.offsetHeight || 0;
    }
    let paginationHeight = 0;
    const paginationEl = wrapEl.querySelector(".ant-pagination");
    if (paginationEl) {
      paginationHeight = paginationEl.offsetHeight + 16;
    }
    let tableHeight = bottomIncludeBody - (resizeHeightOffset || 0) - paddingHeight - paginationHeight;
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
    option: Object,
    class: [Object, String]
  },
  emits: ["register", "change"],
  setup(props, ctx) {
    const dataRef = ref(props.dataSource || []);
    const wrapRef = ref();
    const option = reactive(props.option || {});
    merge(option, { attrs: mergeProps(option.attrs, ctx.attrs) });
    const searchForm = ref();
    const { dataSource, loading, pagination, onLoaded, apis, goPage, reload, query } = useQuery(option);
    onLoaded((data) => {
      ctx.emit("change", data);
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
    onUnmounted(() => ctx.emit("register", null));
    ctx.expose(tableRef.value);
    const tableAttrs = reactive({
      option,
      apis,
      pagination,
      onRegister: register,
      loading
    });
    const unWatch = watch(
      () => option,
      (opt) => {
        if (!(opt == null ? void 0 : opt.columns))
          return;
        const { columns, searchSechma, beforeSearch, maxHeight, isScanHeight = true, inheritHeight } = opt;
        const listData = buildModelsMap(columns);
        const effectData = reactive({ formData: dataRef, current: dataRef });
        const model = reactive({
          refData: dataRef,
          listData
        });
        const { attrs } = render({ option: opt, effectData });
        searchForm.value = searchSechma && useSearchForm(columns, searchSechma, tableRef, (data) => {
          const _data = (beforeSearch == null ? void 0 : beforeSearch({ ...effectData, table: tableRef, param: data })) || data;
          query(_data);
        });
        Object.assign(tableAttrs, attrs, {
          effectData,
          model
        });
        if (isScanHeight || inheritHeight || maxHeight) {
          const { getScrollRef, redoHeight } = useTableScroll(option, dataRef, wrapRef);
          tableAttrs.scroll = getScrollRef;
          const handleTableChange = tableAttrs.onChange;
          tableAttrs.onChange = (param) => {
            !loading.value && redoHeight();
            handleTableChange == null ? void 0 : handleTableChange(param);
          };
        }
        nextTick(() => unWatch());
      },
      {
        immediate: true
      }
    );
    provide("rootSlots", ctx.slots);
    return () => option.columns && h(
      DataProvider,
      { name: "exaProvider", data: { data: dataRef, apis } },
      () => searchForm.value ? h("div", { ref: wrapRef, class: [option.isContainer && "sup-container", "sup-table", props.class] }, [
        h("div", { class: "sup-form-section sup-table-search" }, searchForm.value.formNode()),
        h("div", { class: "sup-form-section section-last" }, h(Controls.Table, tableAttrs, ctx.slots))
      ]) : h(
        "div",
        {
          ref: wrapRef,
          class: [option.isContainer && "sup-container", "sup-table", "sup-form-section", props.class]
        },
        h(Controls.Table, tableAttrs, ctx.slots)
      )
    );
  }
});
const useTable = (option, data) => {
  const [tableRef, getTable] = useGetRef();
  const register = (actions) => {
    if (actions) {
      if (!tableRef.value) {
        if (typeof option === "function") {
          Promise.resolve(option()).then((_option) => {
            actions.setOption(_option);
          });
        } else {
          actions.setOption(option);
        }
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
    return () => h(_sfc_main$p, { config: { ...props, actions } });
  }
});
function useButtons(config) {
  const vNode = () => h(_sfc_main$p, { config });
  return [vNode];
}
const _sfc_main = defineComponent({
  name: "SuperTable",
  inheritAttrs: false,
  props: {
    dataSource: Object,
    option: Object
  },
  emits: ["register"],
  setup(props, ctx) {
    const dataRef = ref(props.dataSource || {});
    const option = shallowReactive(props.option || {});
    const exposed = {
      setOption: (_option) => {
        Object.assign(option, _option);
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
      { class: ["sup-form sup-detail", option.isContainer && "sup-container"] },
      h(DetailLayouts, { option, modelsMap: modelsMap.value })
    );
  }
});
function useDetail(option, data = {}) {
  const source = toRef(data);
  const actionsRef = ref();
  const register = (actions) => {
    if (actions) {
      if (!actionsRef.value) {
        if (typeof option === "function") {
          Promise.resolve(option()).then((_option) => {
            actions.setOption(_option);
          });
        } else {
          actions.setOption(option);
        }
        actions.setData(source.value);
      }
      actionsRef.value = actions;
    } else {
      return (props) => h(_sfc_main, { config: option, dataSource: source, ...props, onRegister: register }, useSlots());
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
export {
  _sfc_main$1 as SuperButtons,
  _sfc_main as SuperDetail,
  _sfc_main$3 as SuperForm,
  _sfc_main$2 as SuperTable,
  createModal,
  plugin as default,
  defineForm,
  defineTable,
  useButtons,
  useDetail,
  useForm,
  useModal,
  useTable
};
