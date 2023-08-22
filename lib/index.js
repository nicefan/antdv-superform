import zhCN from "ant-design-vue/es/locale/zh_CN";
import { merge, cloneDeep, mergeWith } from "lodash-es";
import { h, inject, reactive, toRefs, ref, unref, watchEffect, readonly, toValue, toRef, watch, onMounted, mergeProps, defineComponent, openBlock, createBlock, withModifiers, withCtx, createElementBlock, Fragment, renderList, resolveDynamicComponent, createCommentVNode, createTextVNode, toDisplayString, createVNode, normalizeProps, guardReactiveProps, provide, computed, renderSlot, useAttrs, createElementVNode, getCurrentInstance, render as render$1, nextTick, toRaw, shallowReactive, createSlots, watchPostEffect, useSlots } from "vue";
import { Modal, Space, Button, Tooltip, Dropdown, Menu, MenuItem, Card, Checkbox, CheckboxGroup, Col, Collapse, CollapsePanel, DatePicker, Form as Form$1, FormItem, Input, InputGroup, InputNumber, InputSearch, List, ListItem, Radio, RadioButton, RadioGroup, RangePicker, Row, Select, Switch, TabPane, Table, Tabs, TimePicker, TreeSelect, Divider } from "ant-design-vue";
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
    del: {
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
      const config = { ...defaultActions[name] };
      if (typeof item === "object") {
        const innerMethod = config.onClick;
        const _onClick = item.onClick;
        Object.assign(config, item, { attrs: { ...config.attrs, ...item.attrs } });
        if (_onClick) {
          config.onClick = (param) => {
            const action = async (text = config.confirmText) => {
              var _a;
              if (text) {
                return new Promise(
                  (resolve) => Modal.confirm({
                    title: text,
                    okText: "确定",
                    cancelText: "取消",
                    onOk() {
                      innerMethod == null ? void 0 : innerMethod(param);
                      resolve(void 0);
                    }
                  })
                );
              } else {
                (_a = item.method) == null ? void 0 : _a.call(item, param);
              }
            };
            _onClick(param, action);
          };
        }
      }
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
  var _a;
  const formData = (_a = inject("exaProvider", {})) == null ? void 0 : _a.data;
  return reactive({ formData, ...toRefs(reactive(param || {})) });
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
function useShow(hide, data) {
  const show = getComputedStatus(hide, data);
  show.value = !show.value;
  return show;
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
function getListener(option = {}, formData) {
  const listener = {};
  Object.entries(option).forEach(([key, fn]) => {
    const name = "on" + key.charAt(0).toUpperCase() + key.slice(1);
    listener[name] = (...args) => fn(readonly(formData), ...args);
  });
  return listener;
}
function useVModel({ option, model, effectData }, defaultValue) {
  const { type, keepField, computed: __computed } = option;
  if (defaultValue !== void 0)
    model.refData ?? (model.refData = toValue(defaultValue));
  const refValue = toRef(model, "refData");
  const tempData = ref(model.refData);
  const vModel = reactive({
    value: tempData,
    "onUpdate:value": (val = toValue(defaultValue)) => {
      tempData.value = val;
      refValue.value = val;
    }
  });
  let raw = toValue(tempData);
  let effect;
  if (type === "DateRange" && keepField) {
    tempData.value = [];
    effect = ([start, end]) => {
      refValue.value = start;
      raw = start;
      model.parent[keepField] = end;
    };
    watch([refValue, () => model.parent[keepField]], vModel["onUpdate:value"]);
  } else {
    effect = (value) => {
      refValue.value = value;
      raw = value;
    };
    watch(refValue, vModel["onUpdate:value"]);
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
  return vModel;
}
function render({ option, effectData, inheritDisabled }) {
  const { type, labelField, dynamicAttrs: __attrs, disabled: __disabled, hidden: __hidden } = option;
  const hidden = getComputedStatus(__hidden, effectData);
  const disabled = unref(inheritDisabled) === void 0 ? ref() : inheritDisabled;
  if (unref(disabled) === void 0 && __disabled !== void 0) {
    if (typeof __disabled === "function") {
      watchEffect(() => {
        disabled.value = __disabled(effectData);
      });
    } else {
      disabled.value = !!__disabled;
    }
  }
  const listener = getListener(option.on, effectData);
  const computedAttr = typeof __attrs === "function" ? { ...toRefs(getComputedAttr(__attrs, effectData)) } : {};
  if (type === "Select" && labelField) {
    const change = listener.onChange;
    listener.onChange = function(val, currentOption) {
      effectData.current[labelField] = currentOption.label;
      change && change(val, currentOption);
    };
  }
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
  const { trigger = "change", required, type = "string", len, max, min, pattern, validator, message: message2 } = item || {};
  const rules = [];
  if (required) {
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
  const { field, initialValue, columns, subItems } = option;
  const nameArr = field ? field.split(".") : [];
  const propChain = __chain.concat(nameArr);
  const refName = nameArr.splice(-1)[0];
  let currentRules;
  const parent = ref(parentData.value);
  if (refName) {
    watch(
      parentData,
      (data) => {
        var _a, _b;
        parent.value = data;
        nameArr.forEach((name) => {
          var _a2;
          parent.value = (_a2 = parent.value)[name] ?? (_a2[name] = {});
        });
        if (columns || subItems) {
          (_a = parent.value)[refName] ?? (_a[refName] = columns ? [] : {});
        } else {
          (_b = parent.value)[refName] ?? (_b[refName] = initialValue);
        }
      },
      { immediate: true, flush: "sync" }
    );
  }
  return reactive({
    refName,
    initialValue,
    fieldName: field,
    parent,
    refData: refName ? toRef(parent.value, refName) : parent,
    rules: currentRules,
    propChain
  });
}
function buildModelsMap(items, data, propChain = []) {
  const currentData = toRef(reactive(data || {}));
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
      const children = buildModelsMap(subItems, subModel.refData, subModel.propChain);
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
    initialData: cloneDeep(currentData)
  };
}
function cloneModels(orgModels, data, parentChain = []) {
  const currentData = toRef(data || {});
  const newRules = {};
  const models = [...orgModels].map(([option, model]) => {
    const { children, propChain, rules } = model;
    const newModel = buildModelData(option, currentData, parentChain);
    newModel.rules = rules;
    newRules[propChain.join(".")] = rules;
    if (children) {
      const { modelsMap, rules: childrenRules } = cloneModels(children, newModel.refData, newModel.propChain);
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
const _hoisted_1$1 = { key: 1 };
function useButton(config, param, methods) {
  const { size, buttonShape, buttonType, limit = 3, hidden, disabled, actions } = config;
  const defaultAttrs = { size, type: buttonType, shape: buttonShape };
  const dis = useDisabled(disabled, param);
  const show = useShow(hidden, param);
  const actionBtns = mergeActions(actions, methods);
  const allBtns = actionBtns.map((item) => {
    const show2 = useShow(item.hidden, param);
    const disabled2 = item.disabled !== void 0 ? useDisabled(item.disabled, param) : dis;
    const onClick = (e) => {
      var _a;
      e.stopPropagation();
      (_a = item.onClick) == null ? void 0 : _a.call(item, param);
    };
    return { show: show2, ...item, attrs: { ...defaultAttrs, ...item.attrs, disabled: disabled2, onClick } };
  });
  const btns = ref([]);
  const moreBtns = ref([]);
  watchEffect(() => {
    const items = !show.value ? [] : allBtns.filter(({ show: show2 }) => show2.value);
    const count = items.length === limit + 1 ? limit + 1 : limit;
    btns.value = items.slice(0, count);
    moreBtns.value = items.slice(count);
  });
  return { btns, moreBtns, defaultAttrs };
}
const _sfc_main$m = /* @__PURE__ */ defineComponent({
  __name: "ButtonGroup",
  props: {
    config: {
      required: true,
      type: [Array, Object]
    },
    methods: Object,
    param: Object
  },
  setup(__props) {
    const props = __props;
    const { config, methods, param } = props;
    const __config = Array.isArray(config) ? { actions: config } : config;
    const { btns, moreBtns, defaultAttrs } = useButton(__config, reactive(param || {}), methods);
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(Space), {
        onClick: _cache[0] || (_cache[0] = withModifiers(() => {
        }, ["stop"]))
      }, {
        default: withCtx(() => [
          (openBlock(true), createElementBlock(Fragment, null, renderList(unref(btns), ({ attrs, icon, label }) => {
            return openBlock(), createBlock(unref(Button), mergeProps({ key: label }, attrs), {
              default: withCtx(() => [
                unref(__config).iconOnly && icon ? (openBlock(), createBlock(unref(Tooltip), {
                  key: 0,
                  title: label
                }, {
                  default: withCtx(() => [
                    (openBlock(), createBlock(resolveDynamicComponent(unref(useIcon)(icon))))
                  ]),
                  _: 2
                }, 1032, ["title"])) : (openBlock(), createElementBlock("span", _hoisted_1$1, [
                  icon ? (openBlock(), createBlock(resolveDynamicComponent(unref(useIcon)(icon)), { key: 0 })) : createCommentVNode("", true),
                  createTextVNode(" " + toDisplayString(label), 1)
                ]))
              ]),
              _: 2
            }, 1040);
          }), 128)),
          unref(moreBtns).length ? (openBlock(), createBlock(unref(Dropdown), { key: 0 }, {
            overlay: withCtx(() => [
              (openBlock(true), createElementBlock(Fragment, null, renderList(unref(moreBtns), ({ attrs, icon, label }) => {
                return openBlock(), createBlock(unref(Menu), { key: label }, {
                  default: withCtx(() => [
                    createVNode(unref(MenuItem), {
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
                    }, 1032, ["disabled"])
                  ]),
                  _: 2
                }, 1024);
              }), 128))
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
      });
    };
  }
});
const _base = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Button,
  Card,
  Checkbox,
  CheckboxGroup,
  Col,
  Collapse,
  CollapsePanel,
  DatePicker,
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
  RadioGroup,
  RangePicker,
  Row,
  Select,
  Space,
  Switch,
  TabPane,
  Table,
  Tabs,
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
    provide(props.name, readonly(props.data || {}));
    return ctx.slots.default;
  }
});
const sectionList = ["List", "Group", "Tabs", "Table", "Collapse", "Card"];
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
    }
  },
  setup(props) {
    const rowProps = { gutter: props.option.gutter ?? 16, ...props.option.rowProps };
    const presetSpan = props.option.subSpan ?? inject("subSpan", void 0);
    if ("subSpan" in props.option)
      provide("subSpan", props.option.subSpan);
    const nodes = [];
    let currentGroup;
    [...props.model.children].forEach(([option, subData], idx) => {
      const { type, align, isBlock, columns } = option;
      if (type === "Hidden")
        return;
      const effectData = getEffectData({ current: toRef(props.model, "refData"), value: toRef(subData, "refData") });
      const { attrs, hidden } = render({
        option,
        effectData,
        inheritDisabled: inject("disabled", void 0)
      });
      const __node = useBuildNode(option, subData, effectData, attrs);
      const node = subData.children ? () => h(DataProvider, { name: "disabled", data: attrs.disabled }, __node) : __node;
      const alignStyle = align && "text-align: " + align;
      if (isBlock || sectionList.includes(type) && isBlock !== false) {
        currentGroup = void 0;
        nodes.push(() => !hidden.value && h("div", { class: "exa-form-section", style: alignStyle, key: idx }, node()));
      } else {
        let colProps = option.colProps;
        if (!colProps) {
          colProps = { ...globalProps.Col };
          colProps.span = option.span ?? presetSpan ?? colProps.span ?? 8;
        }
        if (align)
          colProps.style = alignStyle;
        if (!currentGroup) {
          nodes.push(currentGroup = []);
        }
        currentGroup.push(() => !hidden.value && h(Col, { ...colProps, key: idx }, node));
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
function useBuildNode(option, model, effectData, attrs) {
  const { type, label } = option;
  const slots = inject("rootSlots", {});
  const getWrapperNode = (node2, isBlock) => isBlock ? node2 : () => h(base.FormItem, reactive({ label, ...globalProps.formItem, ...option.formItemProps }), node2);
  const node = (() => {
    switch (type) {
      case "InfoSlot": {
        const slot = slots[option.slotName] || option.render;
        const node2 = () => typeof slot === "string" ? slot : slot == null ? void 0 : slot({ effectData, attrs });
        return getWrapperNode(node2, option.isBlock);
      }
      case "Text":
        return getWrapperNode(() => h("span", attrs, model.refData), option.isBlock);
      case "Buttons":
        return getWrapperNode(() => h(_sfc_main$m, { config: option, param: effectData }), option.isBlock);
      default: {
        let slotAttrs = { option, model, effectData };
        if (sectionList.includes(type)) {
          Object.assign(slotAttrs, attrs);
        } else {
          const ignoreRules = inject("exaProvider", {}).ignoreRules;
          const rules = computed(() => ignoreRules || attrs.disabled.value ? void 0 : model.rules);
          slotAttrs = reactive({
            ...slotAttrs,
            attrs,
            ...globalProps.formItem,
            ...option.formItemProps,
            name: model.propChain,
            label,
            rules
          });
        }
        return () => h(Controls[type], slotAttrs);
      }
    }
  })();
  return node;
}
const _sfc_main$l = /* @__PURE__ */ defineComponent({
  __name: "Group",
  props: {
    option: {},
    model: {},
    effectData: {}
  },
  setup(__props) {
    const props = __props;
    const title = props.option.title || props.option.label;
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", null, [
        unref(title) ? (openBlock(), createBlock(unref(Row), {
          key: 0,
          span: 24,
          class: "title"
        }, {
          default: withCtx(() => [
            renderSlot(_ctx.$slots, "title", {}, () => [
              createVNode(unref(Divider), { orientation: "left" }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(unref(title)), 1)
                ]),
                _: 1
              })
            ])
          ]),
          _: 3
        })) : createCommentVNode("", true),
        createVNode(unref(Collections), normalizeProps(guardReactiveProps(props)), null, 16)
      ]);
    };
  }
});
const _sfc_main$k = {
  name: "ExaForm",
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
    const modelData = ref({});
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
          render: () => h(_sfc_main$m, { config: buttons, param: { ...effectData, formRef } })
        }
      ];
    }
    const { modelsMap, initialData } = buildModelsMap(subItems, modelData);
    provide("exaProvider", { data: readonly(modelData), ignoreRules });
    const effectData = reactive({ formData: modelData, current: modelData });
    const { attrs } = render({ option: props.option, effectData });
    const actions = {
      submit: () => {
        return formRef.value.validate().then((...args) => {
          const data = cloneDeep(modelData.value);
          emit("submit", data);
          return data;
        });
      },
      setFieldsValue(data) {
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
      (data) => data && actions.resetFields(data),
      { immediate: true }
    );
    expose(actions);
    const getForm = (form) => {
      if (!form)
        return;
      const obj = { ...form, ...actions };
      if (formRef.value) {
        Object.assign(formRef.value, obj);
      } else {
        formRef.value = reactive(obj);
        emit("register", formRef.value);
      }
    };
    provide("rootSlots", slots);
    return () => h(
      base.Form,
      {
        ref: getForm,
        class: ["exa-form", props.option.compact && "exa-form-compact"],
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
const Form = /* @__PURE__ */ _export_sfc(_sfc_main$k, [["__cssModules", cssModules]]);
const _sfc_main$j = /* @__PURE__ */ defineComponent({
  __name: "InputGroup",
  props: {
    option: {},
    model: {},
    attrs: {},
    effectData: {}
  },
  setup(__props) {
    const { FormItem: FormItem2, InputGroup: InputGroup2 } = base;
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(FormItem2), { style: { "margin": "0" } }, {
        default: withCtx(() => [
          createVNode(unref(InputGroup2), normalizeProps(guardReactiveProps(_ctx.attrs)), {
            default: withCtx(() => [
              createVNode(unref(Collections), normalizeProps(guardReactiveProps({ option: _ctx.option, model: _ctx.model })), null, 16)
            ]),
            _: 1
          }, 16)
        ]),
        _: 1
      });
    };
  }
});
const _sfc_main$i = /* @__PURE__ */ defineComponent({
  __name: "Card",
  props: {
    option: {},
    model: {},
    effectData: {}
  },
  setup(__props) {
    const props = __props;
    const { label, title = label, buttons } = props.option;
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(base).Card, { title: unref(title) }, {
        extra: withCtx(() => [
          unref(buttons) ? (openBlock(), createBlock(unref(_sfc_main$m), {
            key: 0,
            config: unref(buttons),
            param: props.effectData
          }, null, 8, ["config", "param"])) : createCommentVNode("", true)
        ]),
        default: withCtx(() => [
          createVNode(unref(Collections), normalizeProps(guardReactiveProps(props)), null, 16)
        ]),
        _: 1
      }, 8, ["title"]);
    };
  }
});
const _hoisted_1 = { style: { "font-size": "16px" } };
const _sfc_main$h = /* @__PURE__ */ defineComponent({
  __name: "List",
  props: {
    option: {},
    model: {},
    effectData: {}
  },
  setup(__props) {
    const props = __props;
    const { Row: Row2, List: List2, ListItem: ListItem2 } = base;
    const { buttons, rowButtons, label } = props.option;
    const { modelsMap: childrenMap, initialData, rules } = props.model.listData;
    const { propChain } = props.model;
    const orgList = toRef(props.model, "refData");
    const attrs = useAttrs();
    const rowKey = attrs.rowKey || "id";
    const methods = {
      add() {
        orgList.value.push(cloneDeep(initialData));
      },
      del({ record }) {
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
            effectData: reactive({ ...toRefs(props.effectData), index: idx, record })
          };
        });
      },
      {
        immediate: true
      }
    );
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(List2), mergeProps({ "data-source": listItems.value }, unref(attrs)), {
        header: withCtx(() => [
          unref(label) || unref(buttons) ? (openBlock(), createBlock(unref(Row2), {
            key: 0,
            type: "flex",
            justify: "space-between",
            align: "middle"
          }, {
            default: withCtx(() => [
              createElementVNode("span", _hoisted_1, toDisplayString(unref(label)), 1),
              unref(buttons) ? (openBlock(), createBlock(unref(_sfc_main$m), {
                key: 0,
                config: unref(buttons),
                param: _ctx.effectData,
                methods
              }, null, 8, ["config", "param"])) : createCommentVNode("", true)
            ]),
            _: 1
          })) : createCommentVNode("", true)
        ]),
        renderItem: withCtx(({ item }) => [
          (openBlock(), createBlock(unref(ListItem2), {
            key: item.hash
          }, {
            actions: withCtx(() => [
              unref(rowButtons) ? (openBlock(), createBlock(unref(_sfc_main$m), {
                key: 0,
                config: unref(rowButtons),
                methods,
                param: item.effectData
              }, null, 8, ["config", "param"])) : createCommentVNode("", true)
            ]),
            default: withCtx(() => [
              createVNode(unref(Collections), {
                style: { "width": "100%" },
                model: item.model
              }, null, 8, ["model"])
            ]),
            _: 2
          }, 1024))
        ]),
        _: 1
      }, 16, ["data-source"]);
    };
  }
});
const __default__ = {
  name: "ExTabs"
};
const _sfc_main$g = /* @__PURE__ */ defineComponent({
  ...__default__,
  props: {
    option: {},
    model: {},
    effectData: {}
  },
  setup(__props) {
    const props = __props;
    const {
      Tabs: Tabs2,
      TabPane: TabPane2
    } = base;
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
        rightExtra: withCtx(() => [_ctx.option.buttons ? (openBlock(), createBlock(unref(_sfc_main$m), {
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
            default: withCtx(() => [createVNode(unref(Collections), {
              option,
              model
            }, null, 8, ["option", "model"])]),
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
  const slots = {
    default: content
  };
  if (buttons) {
    slots.footer = () => h(_sfc_main$m, { config: buttons, param: { modalRef } });
  }
  const onOk = () => {
    var _a;
    return Promise.resolve((_a = config.onOk) == null ? void 0 : _a.call(config)).then(() => {
      visible.value = false;
    });
  };
  const updateVisible = (val) => visible.value = val;
  const modalSlot = (props, ctx) => h(
    base.Modal,
    { ref: modalRef, visible: visible.value, "onUpdate:visible": updateVisible, ...config, ...props, onOk },
    { ...ctx == null ? void 0 : ctx.slots, ...slots }
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
      const vm = createVNode(modalSlot);
      vm.appContext = ins == null ? void 0 : ins.appContext;
      render$1(vm, wrap);
      return nextTick(() => openModal(option));
    }
  };
  return {
    openModal: open,
    modalSlot,
    closeModal,
    setModal
  };
}
const style$1 = {
  "table-form-item": "_table-form-item_1f50l_1"
};
function inlineRender({
  childrenMap,
  orgList,
  rowKey,
  listener
}) {
  const newItems = ref([]);
  const list = ref([]);
  const editMap = /* @__PURE__ */ new WeakMap();
  watch(() => [...orgList.value], (org) => {
    list.value = org.concat(newItems.value);
  }, {
    immediate: true
  });
  watch(() => [...newItems.value], (items) => {
    list.value = orgList.value.concat(items);
  });
  const effectData = getEffectData();
  const {
    modelsMap: fModels
  } = cloneModelsFlat(childrenMap);
  const setEditMap = (data, info) => {
    let editInfo = editMap.get(data);
    if (!editInfo) {
      const editData = cloneDeep(data);
      const {
        modelsMap,
        rules
      } = cloneModelsFlat(childrenMap, editData);
      const form = useForm$1(reactive(editData), ref(rules));
      editInfo = shallowReactive({
        ...info,
        form,
        modelsMap,
        editData
      });
      editMap.set(data, editInfo);
    } else {
      resetFields(editInfo.editData, data);
      Object.assign(editInfo, info);
    }
    return editInfo;
  };
  const methods = {
    add() {
      const item = {
        [rowKey]: nanoid(12)
      };
      newItems.value.push(item);
      setEditMap(item, {
        isEdit: true,
        isNew: true
      });
    },
    edit({
      record,
      selectedRows
    }) {
      const data = record || selectedRows[0];
      setEditMap(toRaw(data), {
        isEdit: true
      });
    },
    del({
      record,
      selectedRows
    }) {
      const items = record ? [record] : selectedRows;
      listener.onDelete(items);
    }
  };
  const save = ({
    record
  }) => {
    const editInfo = editMap.get(toRaw(record));
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
  };
  const cancel = ({
    record
  }) => {
    const editInfo = editMap.get(toRaw(record));
    if (editInfo.isNew) {
      newItems.value.splice(newItems.value.indexOf(record), 1);
    }
    editInfo.isEdit = false;
  };
  const {
    Space: Space2,
    Button: Button2
  } = base;
  const editButtons = (args) => createVNode(Space2, null, {
    default: () => [createVNode(Button2, {
      "type": "link",
      "onClick": () => save(args)
    }, {
      default: () => [createTextVNode("保存")]
    }), createVNode(Button2, {
      "type": "link",
      "onClick": () => cancel(args)
    }, {
      default: () => [createTextVNode("取消")]
    })]
  });
  const actionSlot = (param) => {
    const editInfo = editMap.get(toRaw(param.record));
    if (editInfo == null ? void 0 : editInfo.isEdit) {
      return editButtons(param);
    }
  };
  const colRenderMap = /* @__PURE__ */ new Map();
  for (const [option, _model] of fModels) {
    const component = Controls[option.type];
    if (!component || !option.field || option.hideInTable)
      continue;
    const node = ({
      model,
      validateInfo,
      editData
    }) => {
      const {
        attrs
      } = render({
        option,
        effectData: reactive({
          ...effectData,
          current: editData
        })
      });
      return h(component, {
        option,
        model,
        attrs: reactive(attrs),
        effectData,
        ...validateInfo,
        class: style$1["table-form-item"]
      });
    };
    const ruleName = _model.propChain.join(".");
    const customRender = (props) => {
      const {
        modelsMap,
        isEdit,
        form,
        editData
      } = editMap.get(toRaw(props.record)) || {};
      if (isEdit) {
        const model = modelsMap.get(option);
        const validateInfo = form.validateInfos[ruleName];
        return node({
          model,
          validateInfo,
          editData
        });
      }
    };
    colRenderMap.set(option, customRender);
  }
  return {
    list,
    editMap,
    colRenderMap,
    methods,
    actionSlot
  };
}
function modalEdit({ listData, rowKey, option, listener }) {
  const { initialData, rules } = listData;
  const source = ref({});
  const formRef = ref();
  const formOption = { ...option.formSechma };
  formOption.subItems = formOption.subItems || option.columns.filter((item) => !item.hideInForm);
  const editForm = () => h(Controls.Form, {
    option: formOption,
    source: source.value,
    onRegister: (data) => formRef.value = data
  });
  const { modalSlot, openModal } = createModal(editForm, { maskClosable: false, ...option.modalProps });
  const methods = {
    add() {
      source.value = merge({}, initialData, { [rowKey]: nanoid(12) });
      openModal({
        title: "新增",
        onOk() {
          return formRef.value.submit().then((data) => {
            return listener.onSave(data);
          });
        }
      });
    },
    edit({ record, selectedRows }) {
      const data = record || selectedRows[0];
      source.value = data;
      openModal({
        title: "修改",
        onOk() {
          return formRef.value.submit().then((newData) => {
            return listener.onUpdate(newData, data);
          });
        }
      });
    },
    del({ record, selectedRows }) {
      const items = record ? [record] : selectedRows;
      return listener.onDelete(items);
    }
  };
  return { modalSlot, methods };
}
function buildColumns({ childrenMap, methods, actionSlot, colEditMap, effectData }) {
  const rootSlots = { ...inject("rootSlots", {}), ...actionSlot };
  const renderMap = /* @__PURE__ */ new WeakMap();
  const renderProduce = (param, render2) => {
    const record = toRaw(param.record);
    const row = renderMap.get(record) || /* @__PURE__ */ new Map();
    renderMap.set(record, row);
    if (!row.has(param.column)) {
      const activeParam = reactive(param);
      const node = computed(() => render2(activeParam));
      row.set(param.column, { activeParam, node });
      return node.value;
    } else {
      const { activeParam, node } = row.get(param.column);
      Object.assign(activeParam, param);
      return node.value;
    }
  };
  const columns = function getConfig(_models) {
    const _columns = [];
    [..._models].forEach(([col, model]) => {
      if (col.type === "Hidden" || col.hideInTable)
        return;
      if (model.children) {
        _columns.push({
          title: col.label,
          children: getConfig(model.children)
        });
      } else {
        const { type: colType, viewRender, render: render2, options: colOptions, labelField } = col;
        const colEditRender = colEditMap == null ? void 0 : colEditMap.get(col);
        let textRender;
        if (viewRender || colType === "InfoSlot") {
          const _render = viewRender | render2;
          textRender = typeof _render === "string" ? rootSlots[_render] : viewRender;
        } else if (labelField) {
          textRender = ({ record }) => record[labelField];
        } else if (colOptions && typeof (colOptions == null ? void 0 : colOptions[0]) !== "string") {
          let options;
          if (typeof colOptions === "function") {
            Promise.resolve(colOptions(getEffectData())).then((data) => options = data);
          } else {
            options = unref(colOptions);
          }
          textRender = ({ text }) => {
            var _a;
            return (_a = options == null ? void 0 : options.find(({ value }) => value === text)) == null ? void 0 : _a.label;
          };
        } else if (colType === "Switch") {
          textRender = ({ text }) => (col.valueLabels || "否是")[text];
        } else if (colType === "Buttons") {
          textRender = (param) => h(_sfc_main$m, { config: col, param: reactive({ ...effectData, ...param }), methods });
        } else
          ;
        let customRender;
        if (colEditRender || textRender) {
          const __render = (param) => (colEditRender == null ? void 0 : colEditRender(param)) || (textRender == null ? void 0 : textRender(param)) || param.text;
          customRender = (param) => renderProduce(param, __render);
        }
        _columns.push({
          title: col.label,
          dataIndex: model.propChain.join("."),
          ...col.columnProps,
          customRender
        });
      }
    });
    return _columns;
  }(childrenMap);
  return columns;
}
function buildData({ option, listData, orgList, rowKey, listener }) {
  const { modelsMap: childrenMap, initialData } = listData;
  const effectData = { ...getEffectData(), current: orgList };
  const { editMode, addMode, rowButtons } = option;
  const context = { list: orgList, columns: [] };
  let editActionSlot;
  let colEditMap;
  if (editMode === "inline") {
    const { list, actionSlot: actionSlot2, colRenderMap, methods } = inlineRender({ childrenMap, orgList, rowKey, listener });
    context.list = list;
    context.methods = methods;
    Object.assign(context, {
      list,
      methods
    });
    editActionSlot = actionSlot2;
    colEditMap = colRenderMap;
  }
  if (editMode === "modal" || addMode === "modal") {
    const { modalSlot, methods } = modalEdit({ listData, rowKey, option, listener });
    if (context.methods) {
      context.methods.add = methods.add;
    } else {
      context.methods = methods;
    }
    context.modalSlot = modalSlot;
  }
  let actionSlot;
  let actionColumn;
  if (rowButtons) {
    const { columnProps, forSlot, ...buttons } = rowButtons;
    const render2 = (param) => {
      return (editActionSlot == null ? void 0 : editActionSlot(param)) || h(_sfc_main$m, { config: buttons, param: reactive({ ...effectData, ...param }), methods: context.methods });
    };
    if (forSlot) {
      actionSlot = { [forSlot]: render2 };
    } else {
      actionColumn = {
        title: "操作",
        key: "action",
        fixed: "right",
        minWidth: "100",
        align: "center",
        ...columnProps,
        customRender: render2
      };
    }
  }
  context.columns = buildColumns({ childrenMap, methods: context.methods, actionSlot, colEditMap, effectData });
  if (actionColumn)
    context.columns.push(actionColumn);
  return context;
}
const _sfc_main$f = defineComponent({
  name: "ExaTable",
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
    const editParam = reactive({ ...effectData, current: orgList, selectedRows, selectedRowKeys });
    const buttons = option.buttons && (() => option.buttons && h(_sfc_main$m, {
      config: option.buttons,
      param: editParam,
      methods
    }));
    const exposed = reactive({
      selectedRowKeys,
      selectedRows,
      add: () => methods == null ? void 0 : methods.add(),
      edit: () => methods == null ? void 0 : methods.edit(editParam),
      delete: () => methods == null ? void 0 : methods.delete(editParam)
    });
    const tableRef = ref();
    const getTable = (el) => {
      if (!el)
        return;
      Object.assign(exposed, el);
      if (!tableRef.value) {
        tableRef.value = el;
        ctx.emit("register", exposed);
      }
    };
    const rootSlots = inject("rootSlot", {});
    const slots = { ...ctx.slots };
    if (option.slots) {
      Object.entries(option.slots).forEach(([key, value]) => {
        slots[key] = typeof value === "string" ? rootSlots[value] : value;
      });
    }
    slots[((_a = option.buttons) == null ? void 0 : _a.forSlot) || "title"] = buttons;
    return () => [
      modalSlot == null ? void 0 : modalSlot(),
      h(
        base.Table,
        {
          ref: getTable,
          dataSource: list.value,
          columns,
          tableLayout: "fixed",
          ...attrs,
          rowSelection,
          rowKey
        },
        slots
      )
    ];
  }
});
const _sfc_main$e = /* @__PURE__ */ defineComponent({
  __name: "Collapse",
  props: {
    option: {},
    model: {},
    effectData: {}
  },
  setup(__props) {
    const props = __props;
    const { Collapse: Collapse2, CollapsePanel: CollapsePanel2 } = base;
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
      return openBlock(), createBlock(unref(Collapse2), {
        activeKey: acKey.value,
        "onUpdate:activeKey": _cache[0] || (_cache[0] = ($event) => acKey.value = $event)
      }, {
        default: withCtx(() => [
          (openBlock(true), createElementBlock(Fragment, null, renderList(unref(panels), (panel) => {
            return openBlock(), createElementBlock(Fragment, {
              key: panel.key
            }, [
              !panel.hidden.value ? (openBlock(), createBlock(unref(CollapsePanel2), mergeProps({
                key: 0,
                header: panel.option.label,
                collapsible: panel.disabled.value ? "disabled" : "header"
              }, panel.attrs), {
                extra: withCtx(() => [
                  panel.option.buttons ? (openBlock(), createBlock(unref(_sfc_main$m), {
                    key: 0,
                    config: panel.option.buttons,
                    param: _ctx.effectData
                  }, null, 8, ["config", "param"])) : createCommentVNode("", true)
                ]),
                default: withCtx(() => [
                  createVNode(unref(Collections), {
                    option: panel.option,
                    model: panel.model
                  }, null, 8, ["option", "model"])
                ]),
                _: 2
              }, 1040, ["header", "collapsible"])) : createCommentVNode("", true)
            ], 64);
          }), 128))
        ]),
        _: 1
      }, 8, ["activeKey"]);
    };
  }
});
const _sfc_main$d = /* @__PURE__ */ defineComponent({
  __name: "Input",
  props: {
    option: {},
    model: {},
    attrs: {},
    effectData: {}
  },
  setup(__props) {
    const props = __props;
    const { Input: Input2, Button: Button2, Tooltip: Tooltip2, FormItem: FormItem2 } = base;
    const valueProps = useVModel(props);
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(FormItem2), null, {
        default: withCtx(() => [
          createVNode(unref(Input2), mergeProps({
            placeholder: "请输入" + (_ctx.option.label || ""),
            "max-length": "100",
            class: _ctx.option.btnClick ? "ant-input-search ant-input-search-enter-button" : ""
          }, { ..._ctx.attrs, ...unref(valueProps) }), createSlots({
            addonAfter: withCtx(() => [
              _ctx.option.btnClick ? (openBlock(), createBlock(unref(Button2), {
                key: 0,
                disabled: _ctx.attrs.disabled,
                class: "ant-input-search-button",
                onClick: _cache[0] || (_cache[0] = ($event) => {
                  var _a, _b;
                  return (_b = (_a = _ctx.option).btnClick) == null ? void 0 : _b.call(_a, _ctx.effectData, $event);
                })
              }, {
                default: withCtx(() => [
                  (openBlock(), createBlock(resolveDynamicComponent(_ctx.option.addonAfterIcon ? unref(useIcon)(_ctx.option.addonAfterIcon) : unref(SearchOutlined))))
                ]),
                _: 1
              }, 8, ["disabled"])) : _ctx.option.addonAfterIcon ? (openBlock(), createBlock(resolveDynamicComponent(unref(useIcon)(_ctx.option.addonAfterIcon)), { key: 1 })) : createCommentVNode("", true)
            ]),
            suffix: withCtx(() => [
              _ctx.option.suffixIcon ? (openBlock(), createBlock(resolveDynamicComponent(unref(useIcon)(_ctx.option.suffixIcon)), { key: 0 })) : createCommentVNode("", true),
              _ctx.option.suffixTips ? (openBlock(), createBlock(unref(Tooltip2), {
                key: 1,
                title: "{item.suffixTips}"
              })) : createCommentVNode("", true)
            ]),
            _: 2
          }, [
            _ctx.option.addonBeforeIcon ? {
              name: "addonBefore",
              fn: withCtx(() => [
                (openBlock(), createBlock(resolveDynamicComponent(unref(useIcon)(_ctx.option.addonBeforeIcon))))
              ]),
              key: "0"
            } : void 0,
            _ctx.option.prefixIcon ? {
              name: "prefix",
              fn: withCtx(() => [
                (openBlock(), createBlock(resolveDynamicComponent(unref(useIcon)(_ctx.option.prefixIcon))))
              ]),
              key: "1"
            } : void 0
          ]), 1040, ["placeholder", "class"])
        ]),
        _: 1
      });
    };
  }
});
const _sfc_main$c = /* @__PURE__ */ defineComponent({
  __name: "InputNumber",
  props: {
    option: {},
    model: {},
    attrs: {},
    effectData: {}
  },
  setup(__props) {
    const props = __props;
    const { FormItem: FormItem2, InputNumber: InputNumber2 } = base;
    const valueProps = useVModel(props);
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(FormItem2), null, {
        default: withCtx(() => [
          createVNode(unref(InputNumber2), mergeProps({
            style: { "width": "100%" },
            type: "number",
            placeholder: "请输入" + _ctx.option.label
          }, { ...unref(valueProps), ...props.attrs }), null, 16, ["placeholder"])
        ]),
        _: 1
      });
    };
  }
});
const _sfc_main$b = /* @__PURE__ */ defineComponent({
  __name: "Select",
  props: {
    option: {},
    model: {},
    attrs: {},
    effectData: {}
  },
  setup(__props) {
    var _a;
    const props = __props;
    const { FormItem: FormItem2, Select: Select2 } = base;
    const valueProps = useVModel(props);
    const options = ref(((_a = props.attrs) == null ? void 0 : _a.options) || []);
    const _options = props.option.options;
    if (typeof _options === "function") {
      watchPostEffect(() => {
        Promise.resolve(_options(props.effectData)).then((data) => {
          options.value = data;
        });
      });
    } else if (_options) {
      watch(
        () => props.option.options,
        (data) => options.value = unref(data),
        { immediate: true }
      );
    } else if (props.option.dictName && globalConfig.dictApi) {
      globalConfig.dictApi(props.option.dictName).then((data) => options.value = data);
    }
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(FormItem2), null, {
        default: withCtx(() => [
          createVNode(unref(Select2), mergeProps({
            "option-filter-prop": "label",
            placeholder: "请选择" + _ctx.option.label
          }, { ...unref(valueProps), ...props.attrs, options: options.value }), null, 16, ["placeholder"])
        ]),
        _: 1
      });
    };
  }
});
const _sfc_main$a = /* @__PURE__ */ defineComponent({
  __name: "Switch",
  props: {
    option: {},
    model: {},
    attrs: {},
    effectData: {}
  },
  setup(__props) {
    const props = __props;
    const { FormItem: FormItem2, Switch: Switch2 } = base;
    const valueProps = useVModel(props, 0);
    const [falseName, trueName] = props.option.valueLabels || [];
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(FormItem2), null, {
        default: withCtx(() => [
          createVNode(unref(Switch2), mergeProps({
            checked: unref(valueProps).value,
            "onUpdate:checked": _cache[0] || (_cache[0] = ($event) => unref(valueProps).value = $event),
            "checked-children": unref(trueName),
            "un-checked-children": unref(falseName),
            "checked-value": 1,
            "un-checked-value": 0
          }, _ctx.attrs), null, 16, ["checked", "checked-children", "un-checked-children"])
        ]),
        _: 1
      });
    };
  }
});
const _sfc_main$9 = /* @__PURE__ */ defineComponent({
  __name: "DateRange",
  props: {
    option: {},
    model: {},
    attrs: {},
    effectData: {}
  },
  setup(__props) {
    const props = __props;
    const { FormItem: FormItem2, RangePicker: RangePicker2 } = base;
    const valueProps = useVModel(props);
    const disabledDate = (currentDate) => {
      var _a, _b;
      return (_b = (_a = props.attrs).disabledDate) == null ? void 0 : _b.call(_a, currentDate, props.effectData);
    };
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(FormItem2), null, {
        default: withCtx(() => [
          createVNode(unref(RangePicker2), mergeProps({ "value-format": "YYYY-MM-DD" }, { ...unref(valueProps), ...props.attrs }, { "disabled-date": disabledDate }), null, 16)
        ]),
        _: 1
      });
    };
  }
});
const _sfc_main$8 = /* @__PURE__ */ defineComponent({
  __name: "DatePicker",
  props: {
    option: {},
    model: {},
    attrs: {},
    effectData: {}
  },
  setup(__props) {
    const props = __props;
    const { FormItem: FormItem2, DatePicker: DatePicker2 } = base;
    const valueProps = useVModel(props);
    const disabledDate = (currentDate) => {
      var _a, _b;
      return (_b = (_a = props.attrs).disabledDate) == null ? void 0 : _b.call(_a, currentDate, props.effectData);
    };
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(FormItem2), null, {
        default: withCtx(() => [
          createVNode(unref(DatePicker2), mergeProps({
            autofocus: "",
            "value-format": "YYYY-MM-DD"
          }, { ...unref(valueProps), ...props.attrs }, { "disabled-date": disabledDate }), null, 16)
        ]),
        _: 1
      });
    };
  }
});
const _sfc_main$7 = /* @__PURE__ */ defineComponent({
  __name: "TimePicker",
  props: {
    option: {},
    model: {},
    attrs: {},
    effectData: {}
  },
  setup(__props) {
    const props = __props;
    const { FormItem: FormItem2, TimePicker: TimePicker2 } = base;
    const valueProps = useVModel(props);
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(FormItem2), null, {
        default: withCtx(() => [
          createVNode(unref(TimePicker2), normalizeProps(guardReactiveProps({ ...unref(valueProps), ...props.attrs })), null, 16)
        ]),
        _: 1
      });
    };
  }
});
const _sfc_main$6 = /* @__PURE__ */ defineComponent({
  __name: "Radio",
  props: {
    option: {},
    model: {},
    attrs: {},
    effectData: {}
  },
  setup(__props) {
    const props = __props;
    const { FormItem: FormItem2, RadioButton: RadioButton2, RadioGroup: RadioGroup2, Radio: Radio2 } = base;
    const valueProps = useVModel(props);
    const options = ref(props.attrs.options || []);
    const _options = props.option.options;
    if (typeof _options === "function") {
      watchPostEffect(() => {
        Promise.resolve(_options(props.effectData)).then((data) => {
          options.value = data;
        });
      });
    } else if (_options) {
      options.value = unref(_options);
    }
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(FormItem2), null, {
        default: withCtx(() => [
          createVNode(unref(RadioGroup2), mergeProps({
            name: _ctx.option.field
          }, { ...unref(valueProps), ...props.attrs }), {
            default: withCtx(() => [
              _ctx.attrs.buttonStyle ? (openBlock(true), createElementBlock(Fragment, { key: 0 }, renderList(options.value, ({ label, value, disabled }) => {
                return openBlock(), createBlock(unref(RadioButton2), {
                  key: value,
                  value,
                  disabled
                }, {
                  default: withCtx(() => [
                    createTextVNode(toDisplayString(label), 1)
                  ]),
                  _: 2
                }, 1032, ["value", "disabled"]);
              }), 128)) : (openBlock(true), createElementBlock(Fragment, { key: 1 }, renderList(options.value, ({ label, value, disabled }) => {
                return openBlock(), createBlock(unref(Radio2), {
                  key: value,
                  value,
                  disabled
                }, {
                  default: withCtx(() => [
                    createTextVNode(toDisplayString(label), 1)
                  ]),
                  _: 2
                }, 1032, ["value", "disabled"]);
              }), 128))
            ]),
            _: 1
          }, 16, ["name"])
        ]),
        _: 1
      });
    };
  }
});
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "Checkbox",
  props: {
    option: {},
    model: {},
    attrs: {},
    effectData: {}
  },
  setup(__props) {
    const props = __props;
    const { FormItem: FormItem2, CheckboxGroup: CheckboxGroup2 } = base;
    const valueProps = useVModel(props);
    const options = ref(props.attrs.options || []);
    const _options = props.option.options;
    if (typeof _options === "function") {
      watchPostEffect(() => {
        Promise.resolve(_options(props.effectData)).then((data) => {
          options.value = data;
        });
      });
    } else if (_options) {
      options.value = unref(_options);
    }
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(FormItem2), null, {
        default: withCtx(() => [
          createVNode(unref(CheckboxGroup2), mergeProps({
            name: _ctx.option.field
          }, { ...unref(valueProps), ...props.attrs }, { options: options.value }), null, 16, ["name", "options"])
        ]),
        _: 1
      });
    };
  }
});
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "TreeSelect",
  props: {
    option: {},
    model: {},
    attrs: {},
    effectData: {}
  },
  setup(__props) {
    const props = __props;
    const { FormItem: FormItem2, TreeSelect: TreeSelect2 } = base;
    const valueProps = useVModel(props);
    const treeData = ref([]);
    const _data = props.option.data;
    if (typeof _data === "function") {
      watchPostEffect(() => {
        Promise.resolve(_data(props.effectData)).then((data) => {
          treeData.value = data;
        });
      });
    } else if (_data) {
      treeData.value = unref(_data);
    }
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(FormItem2), null, {
        default: withCtx(() => [
          createVNode(unref(TreeSelect2), mergeProps({
            placeholder: "请选择" + _ctx.option.label
          }, { ...unref(valueProps), ...props.attrs }, { "tree-data": treeData.value }), null, 16, ["placeholder", "tree-data"])
        ]),
        _: 1
      });
    };
  }
});
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "InputSlot",
  props: {
    option: {},
    model: {},
    attrs: {},
    effectData: {}
  },
  setup(__props) {
    const props = __props;
    const { FormItem: FormItem2 } = base;
    const valueProps = props.option.field && useVModel(props);
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(FormItem2), null, {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default", mergeProps({ style: "width: 100%" }, { ...unref(valueProps), ...props.attrs }))
        ]),
        _: 3
      });
    };
  }
});
const components = {
  Form,
  Group: _sfc_main$l,
  InputGroup: _sfc_main$j,
  Card: _sfc_main$i,
  List: _sfc_main$h,
  Tabs: _sfc_main$g,
  Table: _sfc_main$f,
  Collapse: _sfc_main$e,
  Input: _sfc_main$d,
  InputNumber: _sfc_main$c,
  Select: _sfc_main$b,
  Switch: _sfc_main$a,
  DateRange: _sfc_main$9,
  DatePicker: _sfc_main$8,
  TimePicker: _sfc_main$7,
  Radio: _sfc_main$6,
  Checkbox: _sfc_main$5,
  TreeSelect: _sfc_main$4,
  InputSlot: _sfc_main$3
};
function addComponent(name, component) {
  components[name] = defineComponent({
    name,
    props: ["option", "model", "effectData", "attrs"],
    setup({ option, model, effectData, attrs }) {
      const valueProps = useVModel({ option, model, effectData });
      const allAttrs = reactive({ ...toRefs(valueProps), ...toRefs(attrs) });
      return () => h(
        base.FormItem,
        {},
        () => typeof component === "function" ? component({ option, effectData, attrs: allAttrs }) : h(component, allAttrs)
      );
    }
  });
}
const Controls = components;
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
  const { locale = zhCN, components: components2, dictApi, customIcon, defaultProps } = config;
  app.provide("localeData", { locale, exist: true });
  globalConfig.dictApi = dictApi;
  globalConfig.customIcon = customIcon;
  components2 && override(components2);
  defaultProps && setDefaultProps(defaultProps);
};
function registComponent(name, component) {
  addComponent(name, component);
}
function setDefaultProps(props) {
  merge(globalConfig, props);
}
const plugin = {
  install,
  registComponent,
  setDefaultProps
};
const style = "";
const _sfc_main$2 = defineComponent({
  name: "ExaForm",
  props: {
    config: Object,
    model: Object
  },
  emits: ["register"],
  setup(props, { slots, expose, attrs, emit }) {
    var _a;
    const formData = ref(props.model);
    const formRef = ref();
    const formOption = reactive({
      ...props.config,
      attrs: mergeProps({ ...globalProps.Form }, { ...(_a = props.config) == null ? void 0 : _a.attrs }, attrs)
    });
    const actions = {
      setOption: (_option) => {
        merge(formOption, _option, { attrs: { ...formOption.attrs, ..._option.attrs } });
      },
      setData: (data) => {
        formData.value = data;
      }
    };
    watch(() => props.model, actions.setData);
    expose(actions);
    const register = (compRef) => {
      formRef.value = compRef;
      emit("register", actions, reactive({ ...toRefs(compRef), ...actions }));
    };
    emit("register", actions);
    const formNode = () => formOption.subItems && h(
      Controls.Form,
      {
        option: formOption,
        source: formData.value,
        class: formOption.isContainer && "exa-container",
        onRegister: register
      },
      slots
    );
    return formNode;
  }
});
function useForm(option, data) {
  const model = ref(data);
  const formRef = ref();
  const actionsRef = ref();
  const register = (actions, _ref) => {
    if (actions) {
      if (!actionsRef.value) {
        actions.setOption(option);
        actions.setData(model.value);
      }
      actionsRef.value = actions;
      formRef.value = _ref;
    } else {
      return (props) => h(_sfc_main$2, { config: option, model: model.value, ...props, onRegister: register }, useSlots());
    }
  };
  const _promise = new Promise((resolve) => watch(formRef, resolve));
  const getForm = async (key, param) => {
    const form = await _promise;
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
      setData(data2) {
        if (actionsRef.value) {
          actionsRef.value.setData(data2);
        } else {
          model.value = data2;
        }
      },
      getForm,
      submit: () => getForm("submit"),
      resetFields: (rest) => getForm("resetFields", rest),
      setFieldsValue: (data2) => getForm("setFieldsValue", data2)
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
  const requestParams = computed(() => ({
    ...unref(option.params),
    ...searchParam.value,
    ...pageParam.value
  }));
  const loading = ref(false);
  const dataSource = ref();
  const callbacks = [];
  const onLoaded = (cb) => callbacks.push(cb);
  const request = (params = {}) => {
    var _a;
    const _params = {
      ...requestParams.value,
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
  const goPage = (current, size = pageParam.size) => {
    pageParam.current = current;
    pageParam.size = size;
  };
  const onSearch = (param) => {
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
    return queryApi.value && { ...option.apis, query: request };
  });
  watch([apis, requestParams], () => queryApi.value && request(), { immediate: true });
  return {
    apis,
    goPage,
    request,
    onSearch,
    requestParams,
    pagination,
    dataSource,
    onLoaded
  };
}
function useSearchForm(columns, searchSechma, effectData, onChange) {
  const { buttons = {}, ...formOption } = {
    ignoreRules: true,
    ...searchSechma
  };
  formOption.subItems = searchSechma.subItems.map((item) => {
    if (typeof item === "string") {
      return columns.find((col) => col.field === item);
    } else {
      return item;
    }
  });
  const formRef = ref();
  const formData = reactive({});
  const onRegister = (form) => {
    formRef.value = form;
  };
  const defaultAction = {
    submit() {
      formRef.value.submit().then(onChange);
    },
    reset() {
      const data = formRef.value.resetFields();
      onChange(data);
    }
  };
  const buttonsConfig = Array.isArray(buttons) ? { actions: buttons } : { ...buttons };
  const actions = mergeActions(buttonsConfig.actions || ["submit", "reset"], defaultAction);
  if (actions == null ? void 0 : actions.length) {
    formOption.subItems.push({
      type: "InfoSlot",
      align: "right",
      colProps: { flex: "auto" },
      render: () => h(_sfc_main$m, { config: { ...buttonsConfig, actions }, param: effectData })
    });
  }
  const searchForm = () => h(Controls.Form, { option: formOption, source: formData, onRegister });
  return searchForm;
}
const _sfc_main$1 = defineComponent({
  name: "ExaTable",
  inheritAttrs: false,
  props: {
    dataSource: Object,
    option: Object
  },
  emits: ["register"],
  setup(props, ctx) {
    const dataRef = ref(props.dataSource || []);
    const option = reactive(props.option || {});
    merge(option, { attrs: mergeProps(option.attrs, ctx.attrs) });
    const { dataSource, pagination, onLoaded, apis, goPage, request, onSearch } = useQuery(option);
    const exposed = {
      setOption: (_option) => {
        const attrs = mergeProps(globalProps.Table, { ..._option.attrs }, option.attrs);
        merge(option, _option, { attrs });
      },
      setData: (data) => {
        dataRef.value = data;
      },
      goPage,
      request,
      onSearch,
      onLoaded,
      dataRef
    };
    watch(() => dataSource.value || props.dataSource, exposed.setData);
    ctx.expose(exposed);
    const table = {};
    const register = (comp) => {
      Object.assign(table, comp, exposed);
      ctx.emit("register", exposed, reactive(table));
    };
    ctx.emit("register", exposed);
    const tableAttrs = reactive({
      option,
      apis,
      pagination,
      onRegister: register
      // onChange: handleTableChange,
    });
    const searchForm = ref();
    const unWatch = watch(
      () => option,
      (opt) => {
        if (!(opt == null ? void 0 : opt.columns))
          return;
        const { columns, searchSechma } = opt;
        const listData = buildModelsMap(columns);
        const effectData = getEffectData({ current: dataRef });
        const { attrs } = render({ option: opt, effectData });
        searchForm.value = useSearchForm(columns, searchSechma, { ...effectData, table }, (data) => {
          onSearch(data);
        });
        Object.assign(tableAttrs, {
          model: {
            refData: dataRef,
            listData
          },
          effectData,
          ...attrs
        });
        nextTick(() => {
          unWatch();
        });
      },
      {
        immediate: true
      }
    );
    provide("rootSlots", ctx.slots);
    return () => option.columns && h(
      DataProvider,
      { name: "exaProvider", data: { data: dataRef, apis } },
      () => h("div", { class: option.isContainer && "exa-container" }, [
        searchForm.value && h("div", { class: "exa-form-section exa-table-search" }, searchForm.value()),
        option.columns && h("div", { class: "exa-form-section section-last" }, h(Controls.Table, tableAttrs, ctx.slots))
      ])
    );
  }
});
const useTable = (option, data) => {
  const tableRef = ref();
  const dataSource = ref(data || []);
  const actionsRef = ref();
  const register = (actions, _tableRef) => {
    if (actions) {
      if (!actionsRef.value) {
        actions.setOption(option);
        actions.setData(dataSource.value);
      }
      tableRef.value = _tableRef;
      actionsRef.value = actions;
    } else {
      return (props, ctx) => h(_sfc_main$1, { dataSource: dataSource.value, ...props, onRegister: register }, ctx == null ? void 0 : ctx.slots);
    }
  };
  const _promise = new Promise((resolve) => watch(tableRef, resolve));
  const getTable = async (key, param) => {
    const form = await _promise;
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
      setData(data2) {
        if (actionsRef.value) {
          actionsRef.value.setData(data2);
        } else {
          dataSource.value = data2;
        }
      },
      tableRef,
      getTable
    }
  ];
};
function defineTable(option) {
  return option;
}
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "exaButtons",
  props: {
    limit: {},
    buttonType: {},
    buttonShape: {},
    size: {},
    iconOnly: { type: Boolean },
    hidden: { type: Boolean },
    disabled: { type: Boolean },
    actions: {}
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(_sfc_main$m), { config: _ctx.$props }, null, 8, ["config"]);
    };
  }
});
function useButtons(config) {
  const vNode = () => h(_sfc_main$m, { config });
  return [vNode];
}
export {
  _sfc_main as ExaButtons,
  _sfc_main$2 as ExaForm,
  _sfc_main$1 as ExaTable,
  plugin as default,
  defineForm,
  defineTable,
  useButtons,
  useForm,
  useModal,
  useTable
};
