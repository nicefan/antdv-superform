var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
import { Divider, Row, InputGroup, FormItem, Tooltip, Button, MenuItem, Menu, Dropdown, Space, Card, ListItem, List, Modal as Modal$1, Table as Table$1, Form, CollapsePanel, Collapse, Input, InputNumber, Select, Switch, RangePicker, DatePicker, TimePicker, RadioButton, Radio, RadioGroup, CheckboxGroup, TreeSelect, Col } from "ant-design-vue/es";
import "ant-design-vue/es/form/style/css";
import { ref, inject, readonly, onMounted, watchEffect, toRefs, shallowReactive, reactive, defineComponent, openBlock, createElementBlock, mergeProps, unref, createBlock, withCtx, renderSlot, createVNode, createTextVNode, toDisplayString, createCommentVNode, normalizeProps, guardReactiveProps, resolveComponent, withModifiers, Fragment, renderList, watch, createElementVNode, KeepAlive, provide, getCurrentInstance, render as render$2, h, toRaw, toRef, computed, watchPostEffect } from "vue";
import "ant-design-vue/es/row/style/css";
import "ant-design-vue/es/col/style/css";
import "ant-design-vue/es/divider/style/css";
import "ant-design-vue/es/input/style/css";
import "ant-design-vue/es/card/style/css";
import "ant-design-vue/es/space/style/css";
import "ant-design-vue/es/dropdown/style/css";
import "ant-design-vue/es/menu/style/css";
import "ant-design-vue/es/button/style/css";
import "ant-design-vue/es/tooltip/style/css";
import Modal from "ant-design-vue/es/modal";
import "ant-design-vue/es/modal/style";
import "ant-design-vue/es/list/style/css";
import { nanoid } from "nanoid";
import cloneDeep from "lodash/cloneDeep";
import "ant-design-vue/es/table/style/css";
import "ant-design-vue/es/modal/style/css";
import { useForm } from "ant-design-vue/es/form";
import message from "ant-design-vue/es/message";
import "ant-design-vue/es/collapse/style/css";
import "ant-design-vue/es/input-number/style/css";
import "ant-design-vue/es/select/style/css";
import "ant-design-vue/es/switch/style/css";
import "ant-design-vue/es/date-picker/style/css";
import "ant-design-vue/es/time-picker/style/css";
import "ant-design-vue/es/radio/style/css";
import "ant-design-vue/es/checkbox/style/css";
import "ant-design-vue/es/tree-select/style/css";
import lock from "@ant-design/icons-svg/inline-svg/outlined/lock.svg";
import down from "@ant-design/icons-svg/inline-svg/outlined/down.svg";
import mail from "@ant-design/icons-svg/inline-svg/outlined/mail.svg";
import search from "@ant-design/icons-svg/inline-svg/outlined/search.svg";
import user from "@ant-design/icons-svg/inline-svg/outlined/user.svg";
import Icon from "@ant-design/icons-vue/es/components/Icon";
import "moment/dist/locale/zh-cn";
import zhCN from "ant-design-vue/es/locale/zh_CN";
var Controls = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  get Group() {
    return _sfc_main$g;
  },
  get InputGroup() {
    return _sfc_main$f;
  },
  get Card() {
    return _sfc_main$d;
  },
  get List() {
    return _sfc_main$c;
  },
  get Tabs() {
    return _sfc_main$b;
  },
  get Table() {
    return Table;
  },
  get Collapse() {
    return _sfc_main$a;
  },
  get Input() {
    return _sfc_main$9;
  },
  get InputNumber() {
    return _sfc_main$8;
  },
  get Select() {
    return _sfc_main$7;
  },
  get Switch() {
    return _sfc_main$6;
  },
  get DateRange() {
    return _sfc_main$5;
  },
  get DatePicker() {
    return _sfc_main$4;
  },
  get TimePicker() {
    return _sfc_main$3;
  },
  get Radio() {
    return _sfc_main$2;
  },
  get Checkbox() {
    return _sfc_main$1;
  },
  get TreeSelect() {
    return _sfc_main;
  }
});
var __defProp$2 = Object.defineProperty;
var __defProps$1 = Object.defineProperties;
var __getOwnPropDescs$1 = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols$2 = Object.getOwnPropertySymbols;
var __hasOwnProp$2 = Object.prototype.hasOwnProperty;
var __propIsEnum$2 = Object.prototype.propertyIsEnumerable;
var __defNormalProp$2 = (obj, key, value) => key in obj ? __defProp$2(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$2 = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$2.call(b, prop))
      __defNormalProp$2(a, prop, b[prop]);
  if (__getOwnPropSymbols$2)
    for (var prop of __getOwnPropSymbols$2(b)) {
      if (__propIsEnum$2.call(b, prop))
        __defNormalProp$2(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps$1 = (a, b) => __defProps$1(a, __getOwnPropDescs$1(b));
function formatStr(str, data = {}) {
  const reg = new RegExp("{(\\w*)}", "g");
  return str.replace(reg, (match, key) => data[key] || "");
}
const ruleTypeMap = {
  email: {
    type: "email",
    message: "\u8BF7\u8F93\u5165\u6B63\u786E\u7684\u90AE\u7BB1\u5730\u5740"
  },
  integer: {
    type: "integer",
    message: "{label}\u5FC5\u987B\u4E3A\u6574\u6570",
    pattern: /^[+]{0,1}(\d+)$/,
    transform: (value) => Number(value)
  },
  number: {
    type: "number",
    message: "{label}\u5FC5\u987B\u4E3A\u6570\u5B57",
    transform: (value) => Number(value)
  },
  idcard: {
    pattern: /^[1-9]\d{5}(19[4-9]|20[0,1])\d(0[1-9]|1[0-2])([0-2][0-9]|30|31)\d{3}[\d|X|x]$/,
    message: "\u8BF7\u8F93\u5165\u6B63\u786E\u7684\u8EAB\u4EFD\u8BC1\u53F7"
  },
  phone: {
    pattern: /^(\d{3,4}-?)?\d{7,8}$/,
    message: "\u8BF7\u8F93\u5165\u6B63\u786E\u7684\u7535\u8BDD\u53F7\u7801"
  },
  mobile: {
    pattern: /^1[3-9][0-9]\d{8}$/,
    message: "\u8BF7\u8F93\u5165\u6B63\u786E\u7684\u624B\u673A\u53F7"
  },
  twoDecimal: {
    pattern: /^-?\d+(\.\d{1,2})?$/,
    message: "\u6700\u591A\u652F\u63012\u4F4D\u5C0F\u6570"
  },
  word: {
    pattern: /^[A-Za-z0-9][A-Za-z0-9_]*$/,
    message: "{label}\u53EA\u80FD\u4E3A\u5B57\u6BCD\u6570\u5B57\u53CA\u4E0B\u5212\u7EBF\uFF0C\u4E14\u9996\u5B57\u7B26\u4E0D\u80FD\u4E3A_"
  },
  dictKey: {
    pattern: /^[a-zA-Z]+$/,
    message: "{label}\u683C\u5F0F\u9519\u8BEF\u8BF7\u91CD\u65B0\u8F93\u5165"
  }
};
const rangeMsg = {
  "string": {
    len: "{label}\u957F\u5EA6\u5FC5\u987B\u7B49\u4E8E{len}",
    max: "{label}\u957F\u5EA6\u4E0D\u80FD\u8D85\u8FC7{max}",
    min: "{label}\u957F\u5EA6\u81F3\u5C11\u4E3A{min}",
    range: "{label}\u957F\u5EA6\u5FC5\u987B{min}\u81F3{max}\u4E4B\u95F4"
  },
  "number": {
    len: "{label}\u9700\u7B49\u4E8E{len}",
    max: "{label}\u9700\u5C0F\u4E8E{max}",
    min: "{label}\u9700\u5927\u4E8E{min}",
    range: "{label}\u9700\u5728{min}\u81F3{max}\u4E4B\u95F4"
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
      pattern: /^[\s\S]*.*[^\s][\s\S]*$/,
      message: message2 || `\u8BF7\u8F93\u5165${label}\uFF01`
    });
  }
  const typeRule = ruleTypeMap[type];
  if (typeRule) {
    const message22 = formatStr(typeRule.message, { label });
    rules.push(__spreadProps$1(__spreadValues$2({}, typeRule), { trigger, message: message22 }));
  }
  if (pattern) {
    rules.push({ pattern, trigger, message: message2 });
  }
  if (len || !isNaN(Number(max)) || !isNaN(Number(min))) {
    const rule = getRangeRule(type, len, max, min);
    const message22 = formatStr(rule.message, { label, len, max, min });
    rules.push(__spreadProps$1(__spreadValues$2({}, rule), { trigger, message: message22 }));
  }
  if (validator) {
    rules.push({ validator, trigger });
  }
  return rules;
}
var __defProp$1 = Object.defineProperty;
var __getOwnPropSymbols$1 = Object.getOwnPropertySymbols;
var __hasOwnProp$1 = Object.prototype.hasOwnProperty;
var __propIsEnum$1 = Object.prototype.propertyIsEnumerable;
var __defNormalProp$1 = (obj, key, value) => key in obj ? __defProp$1(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$1 = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$1.call(b, prop))
      __defNormalProp$1(a, prop, b[prop]);
  if (__getOwnPropSymbols$1)
    for (var prop of __getOwnPropSymbols$1(b)) {
      if (__propIsEnum$1.call(b, prop))
        __defNormalProp$1(a, prop, b[prop]);
    }
  return a;
};
function useShow(hide, data) {
  const show = ref(!hide);
  if (typeof hide === "function") {
    const formData = inject("formData");
    const dataRef = readonly(__spreadValues$1({ formData }, data));
    onMounted(() => watchEffect(() => {
      show.value = !hide(dataRef);
    }));
  }
  return show;
}
function useDisabled(dis, data = {}) {
  if (typeof dis === "function") {
    const disabled = ref(!!dis);
    const formData = inject("formData");
    const dataRef = readonly(__spreadValues$1({ formData }, toRefs(shallowReactive(data))));
    onMounted(() => watchEffect(() => {
      disabled.value = dis(dataRef);
    }));
    return disabled;
  }
  return !!dis;
}
function getListener(option = {}, formData) {
  const listener = {};
  Object.entries(option).forEach(([key, fn]) => {
    const name = "on" + key.charAt(0).toUpperCase() + key.slice(1);
    listener[name] = (...args) => fn(readonly(formData), ...args);
  });
  return listener;
}
function buildModel$1(option, { parent, propChain = [], rules = {} }) {
  const { prop = "", keepProp, label, rules: _rules, initialValue } = option;
  const propArr = prop.split(".");
  let refName;
  let currentRules;
  propArr.forEach((name, idx, arr) => {
    var _a, _b;
    if (idx < arr.length - 1 || !!option.columns) {
      parent[name] = parent[name] || (option.type === "List" || option.type === "Table" ? [] : {});
      parent = reactive(parent[name]);
      rules = rules[name] = rules[name] || {};
    } else {
      currentRules = rules[name];
      parent[name] = (_a = parent[name]) != null ? _a : initialValue;
      if (keepProp)
        parent[keepProp] = (_b = parent[keepProp]) != null ? _b : void 0;
      refName = name;
      if (_rules && !currentRules) {
        const _r = Array.isArray(_rules) ? _rules : [_rules];
        currentRules = rules[name] = _r.map((item) => buildRule(item, label)).flat();
      }
    }
  });
  return {
    refName,
    parent,
    rules,
    currentRules,
    propChain: propChain.concat(propArr)
  };
}
function buildModelDeep(cols, { parent, propChain = [], rules = {} }) {
  const parentModel = { parent, propChain, rules };
  const models = [];
  cols.forEach((item) => {
    if (item.prop) {
      const model = buildModel$1(item, parentModel);
      models.push([model.propChain.join("."), model]);
      if (item.columns) {
        const subs = buildModelDeep(item.columns, model);
        models.push(...subs);
      }
    } else if (item.columns) {
      const subs = buildModelDeep(item.columns, parentModel);
      models.push(...subs);
    }
  });
  return models;
}
const _sfc_main$g = /* @__PURE__ */ defineComponent({
  props: {
    option: null,
    modelData: null
  },
  setup(__props) {
    const props = __props;
    const { attr, title } = props.option;
    return (_ctx, _cache) => {
      const _component_a_divider = Divider;
      const _component_a_row = Row;
      return openBlock(), createElementBlock("div", mergeProps({
        style: { "width": "100%" },
        class: "form-group-list ant-row"
      }, unref(attr)), [
        unref(title) ? (openBlock(), createBlock(_component_a_row, {
          key: 0,
          span: 24,
          class: "title"
        }, {
          default: withCtx(() => [
            renderSlot(_ctx.$slots, "title", {}, () => [
              createVNode(_component_a_divider, { orientation: "left" }, {
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
      ], 16);
    };
  }
});
const _sfc_main$f = /* @__PURE__ */ defineComponent({
  props: {
    option: null,
    modelData: null
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _cache) => {
      const _component_a_input_group = InputGroup;
      const _component_a_form_item = FormItem;
      return openBlock(), createBlock(_component_a_form_item, {
        label: __props.option.label,
        style: { "margin": "0" }
      }, {
        default: withCtx(() => [
          createVNode(_component_a_input_group, normalizeProps(guardReactiveProps(props.option.attr)), {
            default: withCtx(() => [
              createVNode(unref(Collections), normalizeProps(guardReactiveProps(props)), null, 16)
            ]),
            _: 1
          }, 16)
        ]),
        _: 1
      }, 8, ["label"]);
    };
  }
});
var _export_sfc = (sfc, props) => {
  for (const [key, val] of props) {
    sfc[key] = val;
  }
  return sfc;
};
const _sfc_main$e = defineComponent({
  props: {
    config: {
      required: true,
      type: Object
    },
    methods: Object,
    param: Object
  },
  setup(props) {
    const { config, methods } = props;
    const formData = inject("formData");
    const param = readonly(__spreadValues({ formData }, props.param));
    const { btns, moreBtns, defAttr } = useButton(config, param, methods);
    return {
      btns,
      moreBtns,
      defAttr
    };
  }
});
function useButton(config, param, methods) {
  const { type, shape, limit = 3, hide, disabled, size, actions } = config;
  const dis = useDisabled(disabled, param);
  const show = useShow(hide, param);
  const actionBtns = [];
  if (actions && methods) {
    const actionsKeys = Array.isArray(actions) ? actions : Object.keys(actions);
    actionsKeys.forEach((key) => {
      const obj = { method: methods[key] };
      let label;
      switch (key) {
        case "add":
          label = "\u65B0\u589E";
          break;
        case "del":
          label = "\u5220\u9664";
          obj.danger = true;
          obj.confirmText = "\u786E\u5B9A\u8981\u5220\u9664\u5417\uFF1F";
          obj.disabled = (param2) => {
            var _a;
            return !param2.record && !(((_a = param2.selectedRowKeys) == null ? void 0 : _a.length) > 0);
          };
          break;
        case "edit":
          label = "\u4FEE\u6539";
          obj.disabled = (param2) => {
            var _a;
            return !param2.record && !(((_a = param2.selectedRowKeys) == null ? void 0 : _a.length) === 1);
          };
      }
      actionBtns.push(Object.assign(obj, __spreadValues({ label }, actions[key])));
    });
  }
  const allBtns = actionBtns.concat(config.items || []).map((item) => {
    const show2 = useShow(item.hide, param);
    const disabled2 = item.disabled !== void 0 ? useDisabled(item.disabled, param) : dis;
    const onClick = (e) => {
      var _a, _b;
      if (item.confirmText) {
        Modal.confirm({
          title: item.confirmText,
          okText: "\u786E\u5B9A",
          cancelText: "\u53D6\u6D88",
          onOk() {
            var _a2, _b2;
            (_a2 = item.method) == null ? void 0 : _a2.call(item, param);
            (_b2 = item.onClick) == null ? void 0 : _b2.call(item, param);
          }
        });
      } else {
        e.stopPropagation();
        (_a = item.method) == null ? void 0 : _a.call(item, param);
        (_b = item.onClick) == null ? void 0 : _b.call(item, param);
      }
    };
    return __spreadProps(__spreadValues({ show: show2 }, item), { attr: __spreadProps(__spreadValues({ size, type, shape }, item.attr), { disabled: disabled2, onClick }) });
  });
  const btns = ref([]);
  const moreBtns = ref([]);
  watchEffect(() => {
    const items = !show.value ? [] : allBtns.filter(({ show: show2 }) => show2.value);
    const count = items.length === limit + 1 ? limit + 1 : limit;
    btns.value = items.slice(0, count);
    moreBtns.value = items.slice(count);
  });
  return { btns, moreBtns, defAttr: { size, type, shape } };
}
const _hoisted_1$1 = { key: 1 };
const _hoisted_2 = /* @__PURE__ */ createTextVNode(" \u66F4\u591A ");
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_v_icon = resolveComponent("v-icon");
  const _component_a_tooltip = Tooltip;
  const _component_a_button = Button;
  const _component_a_menu_item = MenuItem;
  const _component_a_menu = Menu;
  const _component_a_dropdown = Dropdown;
  const _component_a_space = Space;
  return openBlock(), createBlock(_component_a_space, {
    onClick: _cache[0] || (_cache[0] = withModifiers(() => {
    }, ["stop"]))
  }, {
    default: withCtx(() => [
      (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.btns, ({ attr, icon, label }) => {
        return openBlock(), createBlock(_component_a_button, mergeProps({ key: label }, attr), {
          default: withCtx(() => [
            _ctx.$props.config.iconOnly && icon ? (openBlock(), createBlock(_component_a_tooltip, {
              key: 0,
              title: label
            }, {
              default: withCtx(() => [
                createVNode(_component_v_icon, { type: icon }, null, 8, ["type"])
              ]),
              _: 2
            }, 1032, ["title"])) : (openBlock(), createElementBlock("span", _hoisted_1$1, [
              icon ? (openBlock(), createBlock(_component_v_icon, {
                key: 0,
                type: icon
              }, null, 8, ["type"])) : createCommentVNode("", true),
              createTextVNode(" " + toDisplayString(label), 1)
            ]))
          ]),
          _: 2
        }, 1040);
      }), 128)),
      _ctx.moreBtns.length ? (openBlock(), createBlock(_component_a_dropdown, { key: 0 }, {
        overlay: withCtx(() => [
          (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.moreBtns, ({ attr, icon, label }) => {
            return openBlock(), createBlock(_component_a_menu, { key: label }, {
              default: withCtx(() => [
                createVNode(_component_a_menu_item, {
                  disabled: attr.disabled
                }, {
                  default: withCtx(() => [
                    createVNode(_component_a_button, mergeProps({ block: "" }, attr, { shape: "" }), {
                      default: withCtx(() => [
                        icon ? (openBlock(), createBlock(_component_v_icon, {
                          key: 0,
                          type: icon
                        }, null, 8, ["type"])) : createCommentVNode("", true),
                        createTextVNode(toDisplayString(label), 1)
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
          createVNode(_component_a_button, normalizeProps(guardReactiveProps(_ctx.defAttr)), {
            default: withCtx(() => [
              _hoisted_2,
              createVNode(_component_v_icon, { type: "down" })
            ]),
            _: 1
          }, 16)
        ]),
        _: 1
      })) : createCommentVNode("", true)
    ]),
    _: 1
  });
}
var ButtonGroup = /* @__PURE__ */ _export_sfc(_sfc_main$e, [["render", _sfc_render]]);
const _sfc_main$d = /* @__PURE__ */ defineComponent({
  props: {
    option: null,
    modelData: null
  },
  setup(__props) {
    const props = __props;
    const { attr, title, buttons } = props.option;
    return (_ctx, _cache) => {
      const _component_a_card = Card;
      return openBlock(), createBlock(_component_a_card, mergeProps({ title: unref(title) }, unref(attr)), {
        extra: withCtx(() => [
          unref(buttons) ? (openBlock(), createBlock(ButtonGroup, {
            key: 0,
            config: unref(buttons)
          }, null, 8, ["config"])) : createCommentVNode("", true)
        ]),
        default: withCtx(() => [
          createVNode(unref(Collections), normalizeProps(guardReactiveProps(props)), null, 16)
        ]),
        _: 1
      }, 16, ["title"]);
    };
  }
});
const _hoisted_1 = { style: { "font-size": "16px" } };
const _sfc_main$c = /* @__PURE__ */ defineComponent({
  props: {
    option: null,
    modelData: null
  },
  setup(__props) {
    const props = __props;
    const { columns, buttons, itemButtons, label, attr } = props.option;
    const defaultData = {};
    buildModelDeep(columns, { parent: defaultData });
    inject("formData");
    const rowKey = (attr == null ? void 0 : attr.rowKey) || "id";
    const itemsMap = {};
    const listItems = ref([]);
    const orgList = props.modelData.parent;
    const methods = {
      add() {
        orgList.push(cloneDeep(defaultData));
      },
      del({ record }) {
        const orgIdx = orgList.indexOf(record);
        orgList.splice(orgIdx, 1);
        delete itemsMap[record[rowKey]];
      }
    };
    watch(() => orgList.length, () => {
      listItems.value = orgList.map((item, idx) => {
        const hash = item[rowKey] || nanoid(12);
        let hashItem = itemsMap[hash];
        if (!hashItem) {
          item[rowKey] = hash;
          const itemModel = buildModel$1({ prop: String(idx), columns: true }, props.modelData);
          hashItem = itemModel;
        }
        return hashItem;
      });
    });
    return (_ctx, _cache) => {
      const _component_a_row = Row;
      const _component_a_list_item = ListItem;
      const _component_a_list = List;
      return openBlock(), createBlock(_component_a_list, { "data-source": listItems.value }, {
        header: withCtx(() => [
          unref(label) || unref(buttons) ? (openBlock(), createBlock(_component_a_row, {
            key: 0,
            type: "flex",
            justify: "space-between",
            align: "middle"
          }, {
            default: withCtx(() => [
              createElementVNode("span", _hoisted_1, toDisplayString(unref(label)), 1),
              unref(buttons) ? (openBlock(), createBlock(ButtonGroup, {
                key: 0,
                config: unref(buttons),
                param: { listData: unref(orgList) },
                methods
              }, null, 8, ["config", "param"])) : createCommentVNode("", true)
            ]),
            _: 1
          })) : createCommentVNode("", true)
        ]),
        renderItem: withCtx(({ item, index }) => [
          createVNode(_component_a_list_item, {
            key: item.parent[unref(rowKey)]
          }, {
            actions: withCtx(() => [
              unref(itemButtons) ? (openBlock(), createBlock(ButtonGroup, {
                key: 0,
                config: unref(itemButtons),
                methods,
                param: { listData: unref(orgList), index, record: item.parent }
              }, null, 8, ["config", "param"])) : createCommentVNode("", true)
            ]),
            default: withCtx(() => [
              createVNode(unref(Collections), {
                style: { "width": "100%" },
                "model-data": item,
                option: props.option
              }, null, 8, ["model-data", "option"])
            ]),
            _: 2
          }, 1024)
        ]),
        _: 1
      }, 8, ["data-source"]);
    };
  }
});
const __default__ = {
  name: "ExTabs"
};
function setup(__props) {
  const props = __props;
  const formData = inject("formData");
  const {
    subItems: tabsOption,
    activeKey,
    attr,
    buttons
  } = props.option;
  const tabMap = {};
  const allList = tabsOption.map((itemOption, idx) => {
    const {
      key,
      prop,
      label,
      icon,
      hide,
      disabled: dis
    } = itemOption;
    const tabKey = key || prop || String(idx);
    const subModel = !prop ? props.modelData : buildModel$1(itemOption, props.modelData);
    const effectData = {
      current: subModel.parent
    };
    const disabled = useDisabled(dis, effectData);
    const show = useShow(hide, effectData);
    const tabLabel = (icon ? createVNode(resolveComponent("v-icon"), {
      "type": icon
    }, null) : "") + label;
    tabMap[tabKey] = {
      modelData: subModel,
      option: itemOption
    };
    return reactive({
      key: tabKey,
      tab: tabLabel,
      disabled,
      show
    });
  });
  const acKey = ref(unref(activeKey) || allList[0].key);
  const tabList = ref(allList);
  watch(allList, () => {
    var _a;
    let validKey;
    tabList.value = allList.filter((item) => {
      if (item.show && !item.disabled) {
        validKey = validKey != null ? validKey : item.key;
      } else if (acKey.value === item.key) {
        acKey.value = validKey;
      }
      return item.show;
    });
    acKey.value = (_a = acKey.value) != null ? _a : validKey;
  }, {
    deep: true
  });
  const listener = getListener(props.option.on, {
    formData
  });
  const _tabChange = listener.onTabChange;
  listener.onTabChange = (key) => {
    acKey.value = key;
    _tabChange == null ? void 0 : _tabChange(key);
  };
  return (_ctx, _cache) => {
    const _component_a_card = Card;
    return openBlock(), createBlock(_component_a_card, mergeProps({
      "tab-list": tabList.value,
      "active-tab-key": acKey.value
    }, __spreadValues(__spreadValues({}, unref(attr)), unref(listener))), {
      tabBarExtraContent: withCtx(() => [unref(buttons) ? (openBlock(), createBlock(ButtonGroup, {
        key: 0,
        config: unref(buttons)
      }, null, 8, ["config"])) : createCommentVNode("", true)]),
      default: withCtx(() => [(openBlock(), createBlock(KeepAlive, null, [createVNode(unref(Collections), mergeProps(tabMap[acKey.value], {
        key: acKey.value
      }), null, 16)], 1024))]),
      _: 1
    }, 16, ["tab-list", "active-tab-key"]);
  };
}
var _sfc_main$b = /* @__PURE__ */ defineComponent(__spreadProps(__spreadValues({}, __default__), {
  props: {
    option: null,
    modelData: null
  },
  setup
}));
defineComponent({
  props: {
    provides: {
      type: Object,
      default: () => {
      }
    }
  },
  setup(props, {
    expose,
    slots
  }) {
    Object.entries(props.provides).forEach(([key, value]) => provide(key, value));
    const visible = ref(false);
    const porxyOk = (orgOk) => () => Promise.resolve(orgOk == null ? void 0 : orgOk()).then(() => {
      visible.value = false;
    });
    const config = ref({});
    expose({
      open(_config) {
        Object.assign(config, _config, {
          onOk: porxyOk(_config.onOk)
        });
        visible.value = true;
      }
    });
    return () => createVNode(Modal$1, mergeProps({
      "visible": visible.value,
      "onUpdate:visible": ($event) => visible.value = $event
    }, config), slots);
  }
});
function useModal(content, config = {}) {
  const visible = ref(false);
  const _config = reactive(__spreadValues({}, config));
  const onOk = () => {
    var _a;
    return Promise.resolve((_a = _config.onOk) == null ? void 0 : _a.call(_config)).then(() => {
      visible.value = false;
    });
  };
  const refM = ref();
  const slot = () => createVNode(Modal$1, mergeProps({
    "ref": refM,
    "visible": visible.value,
    "onUpdate:visible": ($event) => visible.value = $event
  }, __spreadProps(__spreadValues({}, _config), {
    onOk
  })), {
    default: () => h(content)
  });
  const wrap = document.createElement("div");
  const ins = getCurrentInstance();
  const vm = createVNode(slot);
  vm.appContext = ins == null ? void 0 : ins.appContext;
  onMounted(() => render$2(vm, wrap));
  const openModal = (option) => {
    Object.assign(_config, option);
    visible.value = true;
  };
  return {
    openModal
  };
}
var style = {
  "table-form-item": "_table-form-item_1vvv4_1"
};
function buildInlineForm(columns) {
  const modelMap = {};
  const defaultData = {};
  const rules = {};
  columns.forEach((col) => {
    modelMap[col.prop] = buildModel$1(col, {
      parent: defaultData,
      rules
    });
  });
  return (def = defaultData) => {
    const editData = reactive(cloneDeep(def));
    const form = useForm(editData, ref(rules));
    const nodes = {};
    columns.forEach((col) => {
      const {
        refName,
        propChain
      } = modelMap[col.prop];
      let parent = editData;
      propChain.slice(0, -1).forEach((name) => {
        parent = reactive(parent[name] = parent[name] || {});
      });
      const modelData = {
        refName,
        parent
      };
      nodes[col.prop] = () => h(Controls[col.type], __spreadProps(__spreadValues({
        option: col,
        modelData
      }, form.validateInfos[refName]), {
        class: style["table-form-item"]
      }));
    });
    return __spreadValues({
      nodes
    }, form);
  };
}
function render$1(cols, orgList, rowKey) {
  const createForm = buildInlineForm(cols);
  const newItems = ref([]);
  const list = ref([]);
  const editMap = {};
  watch(() => orgList.length, () => {
    list.value = orgList.concat(newItems.value);
  });
  watch(() => newItems.value, (items) => {
    list.value = orgList.concat(items);
  });
  const methods = {
    add() {
      const hash = nanoid(12);
      editMap[hash] = shallowReactive({
        isEdit: true,
        isNew: true,
        form: createForm()
      });
      newItems.value = newItems.value.concat({
        [rowKey]: hash
      });
    },
    edit({
      record,
      selectedRows
    }) {
      const data = record || selectedRows[0];
      const editInfo = editMap[data[rowKey]];
      if (editInfo) {
        editInfo.isEdit = true;
      } else {
        editMap[data[rowKey]] = shallowReactive({
          isEdit: true,
          form: createForm()
        });
      }
    },
    del({
      record,
      selectedRows
    }) {
      const items = record ? [record] : selectedRows;
      items.forEach((item) => {
        orgList.splice(orgList.indexOf(item), 1);
        delete editMap[item[rowKey]];
      });
    }
  };
  const save = ({
    record
  }) => {
    const editInfo = editMap[record[rowKey]];
    editInfo.form.validate().then(() => {
      const raw = toRaw(editInfo.form.modelRef);
      if (editInfo.isNew) {
        newItems.value.splice(newItems.value.indexOf(record), 1);
        editInfo.isNew = false;
        editInfo.isEdit = false;
        orgList.push(__spreadValues(__spreadValues({}, record), raw));
      } else {
        Object.assign(toRaw(record), raw);
        editInfo.isEdit = false;
      }
    }).catch((err) => {
      console.log("error", err);
      message.error(err.errorFields[0].errors[0]);
    });
  };
  const cancel = ({
    record
  }) => {
    const key = record[rowKey];
    const editInfo = editMap[key];
    if (editInfo.isNew) {
      newItems.value = newItems.value.filter((item) => item[rowKey] !== key);
      delete editMap[key];
    } else {
      editInfo.isEdit = false;
      editInfo.form.resetFields(record);
    }
  };
  const editButtons = (args) => createVNode(Space, null, {
    default: () => [createVNode(Button, {
      "type": "link",
      "onClick": () => save(args)
    }, {
      default: () => [createTextVNode("\u4FDD\u5B58")]
    }), createVNode(Button, {
      "type": "link",
      "onClick": () => cancel(args)
    }, {
      default: () => [createTextVNode("\u53D6\u6D88")]
    })]
  });
  const actionSlot = (param) => {
    const editInfo = editMap[param.record[rowKey]];
    if (editInfo == null ? void 0 : editInfo.isEdit) {
      return editButtons(param);
    }
  };
  const columns = cols.map((item) => {
    return __spreadValues({
      title: item.label,
      dataIndex: item.prop,
      customRender({
        record,
        text
      }) {
        const editInfo = editMap[record[rowKey]];
        return (editInfo == null ? void 0 : editInfo.isEdit) ? h(editInfo.form.nodes[item.prop]) : text;
      }
    }, item.attr);
  });
  return {
    list,
    columns,
    methods,
    actionSlot
  };
}
function modalEdit(cols, list, rowKey) {
  const modelRef = reactive({});
  const rules = {};
  cols.map((col) => ({
    option: col,
    modelData: buildModel$1(col, {
      parent: modelRef,
      rules
    })
  }));
  const defData = cloneDeep(modelRef);
  const formData = inject("formData");
  const formRef = ref();
  const editForm = defineComponent({
    provide: {
      formData
    },
    setup() {
      return () => createVNode(Form, {
        "ref": formRef,
        "class": "exa-form",
        "model": modelRef,
        "rules": rules,
        "layout": "vertical"
      }, {
        default: () => [createVNode(Collections, {
          "option": {
            columns: cols
          },
          "modelData": {
            parent: modelRef
          }
        }, null)]
      });
    }
  });
  const {
    openModal
  } = useModal(editForm);
  const methods = {
    add() {
      Object.assign(modelRef, cloneDeep(defData), {
        [rowKey]: nanoid(12)
      });
      openModal({
        title: "\u65B0\u589E",
        onOk() {
          return formRef.value.validate().then(() => {
            list.push(cloneDeep(modelRef));
          });
        }
      });
    },
    edit({
      record,
      selectedRows
    }) {
      const data = record || selectedRows[0];
      Object.assign(modelRef, cloneDeep(data));
      openModal({
        title: "\u4FEE\u6539",
        onOk() {
          return formRef.value.validate().then(() => {
            const idx = list.indexOf(data);
            Object.assign(list[idx], cloneDeep(modelRef));
          });
        }
      });
    },
    del({
      record,
      selectedRows
    }) {
      const items = record ? [record] : selectedRows;
      items.forEach((item) => {
        list.splice(list.indexOf(item), 1);
      });
    }
  };
  return {
    methods
  };
}
function buildData(option, orgList, rowKey) {
  const {
    columns,
    itemButtons,
    buttons
  } = option;
  let context;
  if (option.editMode === "inline") {
    context = render$1(columns, orgList, rowKey);
    if (option.addMode === "modal") {
      const modalInfo = modalEdit(columns, orgList, rowKey);
      context.methods.add = modalInfo.methods.add;
    }
  } else {
    const cols = columns.map((item) => {
      return __spreadValues({
        title: item.label,
        dataIndex: item.prop
      }, item.attr);
    });
    const {
      methods
    } = modalEdit(columns, orgList, rowKey);
    context = {
      list: ref(orgList),
      columns: cols,
      methods
    };
  }
  if (itemButtons) {
    context.columns.push({
      title: "\u64CD\u4F5C",
      key: "action",
      customRender: (param) => {
        var _a;
        console.log("table");
        return ((_a = context.actionSlot) == null ? void 0 : _a.call(context, param)) || h(ButtonGroup, {
          config: itemButtons,
          param,
          methods: context.methods
        });
      }
    });
  }
  return context;
}
var Table = defineComponent({
  name: "ExaTable",
  props: {
    option: {
      required: true,
      type: Object
    },
    modelData: {
      required: true,
      type: Object
    }
  },
  setup({
    option,
    modelData
  }) {
    var _a;
    const editInline = option.editMode === "inline";
    const rowKey = ((_a = option.attr) == null ? void 0 : _a.rowKey) || "id";
    const {
      list,
      columns,
      methods
    } = buildData(option, modelData.parent, rowKey);
    const selectedRowKeys = ref([]);
    const selectedRows = ref([]);
    const _del = methods.del;
    methods.del = (param) => {
      _del(param);
      if (param.record) {
        selectedRowKeys.value = selectedRowKeys.value.filter((key) => key !== param.record[rowKey]);
        selectedRows.value = selectedRows.value.filter((item) => item[rowKey] !== param.record[rowKey]);
      } else {
        selectedRowKeys.value = [];
        selectedRows.value = [];
      }
    };
    const rowSelection = __spreadValues({
      fixed: true,
      selectedRowKeys,
      onChange: (_selectedRowKeys, _selectedRows) => {
        selectedRowKeys.value = _selectedRowKeys;
        selectedRows.value = _selectedRows;
      }
    }, editInline && {
      getCheckboxProps: (record) => ({
        disabled: !modelData.parent.includes(record)
      })
    });
    const btns = option.buttons && h(ButtonGroup, {
      config: option.buttons,
      param: {
        selectedRows,
        selectedRowKeys
      },
      methods
    });
    return () => createVNode(Fragment, null, [btns, createVNode(Table$1, mergeProps({
      "dataSource": list.value,
      "columns": columns
    }, option.attr, {
      "rowSelection": rowSelection,
      "rowKey": rowKey,
      "tableLayout": "fixed"
    }), null)]);
  }
});
const _sfc_main$a = /* @__PURE__ */ defineComponent({
  props: {
    option: null,
    modelData: null
  },
  setup(__props) {
    const props = __props;
    const { attr, subItems, activeKey } = props.option;
    inject("formData");
    const panels = subItems.map((itemOption, idx) => {
      const { key, prop, icon, hide, disabled: dis } = itemOption;
      const subModel = !prop ? props.modelData : buildModel$1(itemOption, props.modelData);
      const effectData = { current: subModel.parent };
      const tabKey = key || prop || String(idx);
      const disabled = useDisabled(dis, effectData);
      const show = useShow(hide, effectData);
      const attrs = reactive(__spreadValues(__spreadProps(__spreadValues({}, itemOption.attr), { disabled }), getListener(itemOption.on, effectData)));
      return { key: tabKey, attrs, show, modelData: subModel, option: itemOption };
    });
    const acKey = ref(activeKey || panels[0].key);
    return (_ctx, _cache) => {
      const _component_a_collapse_panel = CollapsePanel;
      const _component_a_collapse = Collapse;
      return openBlock(), createBlock(_component_a_collapse, mergeProps({
        activeKey: acKey.value,
        "onUpdate:activeKey": _cache[0] || (_cache[0] = ($event) => acKey.value = $event)
      }, unref(attr)), {
        default: withCtx(() => [
          (openBlock(true), createElementBlock(Fragment, null, renderList(unref(panels), (panel) => {
            return openBlock(), createElementBlock(Fragment, {
              key: panel.key
            }, [
              panel.show ? (openBlock(), createBlock(_component_a_collapse_panel, mergeProps({
                key: 0,
                header: panel.option.label
              }, panel.attrs), {
                extra: withCtx(() => [
                  panel.option.buttons ? (openBlock(), createBlock(ButtonGroup, {
                    key: 0,
                    config: panel.option.buttons
                  }, null, 8, ["config"])) : createCommentVNode("", true)
                ]),
                default: withCtx(() => [
                  createVNode(unref(Collections), {
                    option: panel.option,
                    "model-data": panel.modelData
                  }, null, 8, ["option", "model-data"])
                ]),
                _: 2
              }, 1040, ["header"])) : createCommentVNode("", true)
            ], 64);
          }), 128))
        ]),
        _: 1
      }, 16, ["activeKey"]);
    };
  }
});
var __defProp2 = Object.defineProperty;
var __defProps2 = Object.defineProperties;
var __getOwnPropDescs2 = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols2 = Object.getOwnPropertySymbols;
var __hasOwnProp2 = Object.prototype.hasOwnProperty;
var __propIsEnum2 = Object.prototype.propertyIsEnumerable;
var __defNormalProp2 = (obj, key, value) => key in obj ? __defProp2(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues2 = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp2.call(b, prop))
      __defNormalProp2(a, prop, b[prop]);
  if (__getOwnPropSymbols2)
    for (var prop of __getOwnPropSymbols2(b)) {
      if (__propIsEnum2.call(b, prop))
        __defNormalProp2(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps2 = (a, b) => __defProps2(a, __getOwnPropDescs2(b));
function render({ option, modelData }) {
  const { type, label, prop, attr, disabled: __disabled, computed: __computed, keepProp } = option;
  const { refName, parent, currentRules, propChain } = modelData;
  const refValue = toRef(parent, refName);
  const tempData = reactive({ [refName]: parent[refName] });
  const vModel = {
    value: toRef(tempData, refName),
    "onUpdate:value": (val) => {
      tempData[refName] = val;
    }
  };
  let effect;
  if (type === "DateRange" && keepProp) {
    tempData[refName] = [];
    effect = ([start, end]) => {
      refValue.value = start;
      parent[keepProp] = end;
    };
    watch([refValue, () => parent[keepProp]], vModel["onUpdate:value"]);
  } else {
    effect = (value) => {
      refValue.value = value;
    };
    watch(refValue, vModel["onUpdate:value"]);
  }
  watch(() => tempData[refName], effect, { flush: "sync" });
  const formData = inject("formData") || {};
  const effectData = { current: parent };
  if (__computed) {
    const raw = tempData[refName];
    onMounted(() => watch(() => __computed(raw, effectData), effect));
  }
  const disabled = useDisabled(__disabled, effectData);
  const listener = getListener(option.on, effectData);
  const _attr = __spreadValues2(__spreadValues2({}, attr), listener);
  if (type === "Select" && keepProp) {
    const change = listener.onChange;
    listener.onChange = function(val, currentOption) {
      parent[keepProp] = currentOption.label;
      change && change(val, currentOption);
    };
  }
  const ruleName = currentRules && computed(() => unref(disabled) ? void 0 : propChain);
  const attrs = reactive(__spreadProps2(__spreadValues2(__spreadValues2({}, vModel), _attr), { disabled }));
  return { effectData, formData, attrs, ruleName, label, rules: modelData.currentRules };
}
const _sfc_main$9 = /* @__PURE__ */ defineComponent({
  props: {
    option: null,
    modelData: null
  },
  setup(__props) {
    const props = __props;
    const { formData, attrs, ruleName, label, rules } = render(props);
    return (_ctx, _cache) => {
      const _component_v_icon = resolveComponent("v-icon");
      const _component_a_button = Button;
      const _component_a_tooltip = Tooltip;
      const _component_a_input = Input;
      const _component_a_form_item = FormItem;
      return openBlock(), createBlock(_component_a_form_item, {
        name: unref(ruleName),
        label: unref(label)
      }, {
        default: withCtx(() => [
          createVNode(_component_a_input, mergeProps({
            readonly: !!__props.option.keepProp,
            placeholder: "\u8BF7\u8F93\u5165" + (unref(label) || ""),
            "max-length": "100",
            class: __props.option.btnClick ? "ant-input-search ant-input-search-enter-button" : ""
          }, unref(attrs)), {
            addonAfter: withCtx(() => [
              __props.option.btnClick ? (openBlock(), createBlock(_component_a_button, {
                key: 0,
                disabled: unref(attrs).disabled,
                class: "ant-input-search-button",
                onClick: _cache[0] || (_cache[0] = ($event) => {
                  var _a, _b;
                  return (_b = (_a = __props.option).btnClick) == null ? void 0 : _b.call(_a, unref(formData), $event);
                })
              }, {
                default: withCtx(() => [
                  createVNode(_component_v_icon, {
                    type: __props.option.addonAfterIcon || "search"
                  }, null, 8, ["type"])
                ]),
                _: 1
              }, 8, ["disabled"])) : __props.option.addonAfterIcon ? (openBlock(), createBlock(_component_v_icon, {
                key: 1,
                type: __props.option.addonAfterIcon
              }, null, 8, ["type"])) : createCommentVNode("", true)
            ]),
            addonBefore: withCtx(() => [
              __props.option.addonBeforeIcon ? (openBlock(), createBlock(_component_v_icon, {
                key: 0,
                type: __props.option.addonBeforeIcon
              }, null, 8, ["type"])) : createCommentVNode("", true)
            ]),
            prefix: withCtx(() => [
              __props.option.prefixIcon ? (openBlock(), createBlock(_component_v_icon, {
                key: 0,
                type: __props.option.prefixIcon
              }, null, 8, ["type"])) : createCommentVNode("", true)
            ]),
            suffix: withCtx(() => [
              __props.option.suffixIcon ? (openBlock(), createBlock(_component_v_icon, {
                key: 0,
                type: __props.option.suffixIcon
              }, null, 8, ["type"])) : createCommentVNode("", true),
              __props.option.suffixTips ? (openBlock(), createBlock(_component_a_tooltip, {
                key: 1,
                title: "{item.suffixTips}"
              }, {
                default: withCtx(() => [
                  createVNode(_component_v_icon, {
                    type: "info-circle",
                    style: { "color": "rgba(0, 0, 0, 0.45)" }
                  })
                ]),
                _: 1
              })) : createCommentVNode("", true)
            ]),
            _: 1
          }, 16, ["readonly", "placeholder", "class"])
        ]),
        _: 1
      }, 8, ["name", "label"]);
    };
  }
});
const _sfc_main$8 = /* @__PURE__ */ defineComponent({
  props: {
    option: null,
    modelData: null
  },
  setup(__props) {
    const props = __props;
    const { formData, attrs, ruleName, label } = render(props);
    return (_ctx, _cache) => {
      const _component_a_input_number = InputNumber;
      const _component_a_form_item = FormItem;
      return openBlock(), createBlock(_component_a_form_item, {
        name: unref(ruleName),
        label: unref(label)
      }, {
        default: withCtx(() => [
          createVNode(_component_a_input_number, mergeProps({
            style: { "width": "100%" },
            type: "number",
            placeholder: "\u8BF7\u8F93\u5165" + unref(label)
          }, unref(attrs)), null, 16, ["placeholder"])
        ]),
        _: 1
      }, 8, ["name", "label"]);
    };
  }
});
const _sfc_main$7 = /* @__PURE__ */ defineComponent({
  props: {
    option: null,
    modelData: null
  },
  setup(__props) {
    const props = __props;
    const { effectData, attrs, ruleName, label } = render(props);
    const options = ref(attrs.options || []);
    const _options = props.option.options;
    if (typeof _options === "function") {
      watchPostEffect(() => {
        Promise.resolve(_options(effectData)).then((data) => {
          options.value = data;
        });
      });
    } else if (_options) {
      options.value = unref(_options);
    }
    return (_ctx, _cache) => {
      const _component_a_select = Select;
      const _component_a_form_item = FormItem;
      return openBlock(), createBlock(_component_a_form_item, {
        name: unref(ruleName),
        label: unref(label)
      }, {
        default: withCtx(() => [
          createVNode(_component_a_select, mergeProps({
            "option-filter-prop": "label",
            placeholder: "\u8BF7\u9009\u62E9" + unref(label)
          }, unref(attrs), { options: options.value }), null, 16, ["placeholder", "options"])
        ]),
        _: 1
      }, 8, ["name", "label"]);
    };
  }
});
const _sfc_main$6 = /* @__PURE__ */ defineComponent({
  props: {
    option: null,
    modelData: null
  },
  setup(__props) {
    const props = __props;
    const { formData, attrs, ruleName, label } = render(props);
    const [trueName, falseName] = props.option.valueLabels || [];
    return (_ctx, _cache) => {
      const _component_a_switch = Switch;
      const _component_a_form_item = FormItem;
      return openBlock(), createBlock(_component_a_form_item, {
        name: unref(ruleName),
        label: unref(label)
      }, {
        default: withCtx(() => [
          createVNode(_component_a_switch, mergeProps({
            "checked-children": unref(trueName),
            "un-checked-children": unref(falseName),
            "checked-value": 1,
            "un-checked-value": 0,
            checked: unref(attrs).value
          }, unref(attrs), {
            "onUpdate:checked": unref(attrs)["onUpdate:value"]
          }), null, 16, ["checked-children", "un-checked-children", "checked", "onUpdate:checked"])
        ]),
        _: 1
      }, 8, ["name", "label"]);
    };
  }
});
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  props: {
    option: null,
    modelData: null
  },
  setup(__props) {
    const props = __props;
    const { formData, attrs, ruleName, label } = render(props);
    const disabledDate = (currentDate) => {
      var _a;
      return (_a = attrs.disabledDate) == null ? void 0 : _a.call(attrs, { formData, currentDate });
    };
    return (_ctx, _cache) => {
      const _component_a_range_picker = RangePicker;
      const _component_a_form_item = FormItem;
      return openBlock(), createBlock(_component_a_form_item, {
        name: unref(ruleName),
        label: unref(label)
      }, {
        default: withCtx(() => [
          createVNode(_component_a_range_picker, mergeProps({ "value-format": "YYYY-MM-DD" }, unref(attrs), { "disabled-date": disabledDate }), null, 16)
        ]),
        _: 1
      }, 8, ["name", "label"]);
    };
  }
});
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  props: {
    option: null,
    modelData: null
  },
  setup(__props) {
    const props = __props;
    const { formData, attrs, ruleName, label } = render(props);
    const disabledDate = (currentDate) => {
      var _a;
      return (_a = attrs.disabledDate) == null ? void 0 : _a.call(attrs, { formData, currentDate });
    };
    return (_ctx, _cache) => {
      const _component_a_date_picker = DatePicker;
      const _component_a_form_item = FormItem;
      return openBlock(), createBlock(_component_a_form_item, {
        name: unref(ruleName),
        label: unref(label)
      }, {
        default: withCtx(() => [
          createVNode(_component_a_date_picker, mergeProps({
            autofocus: "",
            "value-format": "YYYY-MM-DD"
          }, unref(attrs), { "disabled-date": disabledDate }), null, 16)
        ]),
        _: 1
      }, 8, ["name", "label"]);
    };
  }
});
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  props: {
    option: null,
    modelData: null
  },
  setup(__props) {
    const props = __props;
    const { formData, attrs, ruleName, label } = render(props);
    return (_ctx, _cache) => {
      const _component_a_time_picker = TimePicker;
      const _component_a_form_item = FormItem;
      return openBlock(), createBlock(_component_a_form_item, {
        name: unref(ruleName),
        label: unref(label)
      }, {
        default: withCtx(() => [
          createVNode(_component_a_time_picker, normalizeProps(guardReactiveProps(unref(attrs))), null, 16)
        ]),
        _: 1
      }, 8, ["name", "label"]);
    };
  }
});
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  props: {
    option: null,
    modelData: null
  },
  setup(__props) {
    const props = __props;
    const { effectData, attrs, ruleName, label } = render(props);
    const options = ref(attrs.options || []);
    const _options = props.option.options;
    if (typeof _options === "function") {
      watchPostEffect(() => {
        Promise.resolve(_options(effectData)).then((data) => {
          options.value = data;
        });
      });
    } else if (_options) {
      options.value = unref(_options);
    }
    return (_ctx, _cache) => {
      const _component_a_radio_button = RadioButton;
      const _component_a_radio = Radio;
      const _component_a_radio_group = RadioGroup;
      const _component_a_form_item = FormItem;
      return openBlock(), createBlock(_component_a_form_item, {
        name: unref(ruleName),
        label: unref(label)
      }, {
        default: withCtx(() => [
          createVNode(_component_a_radio_group, mergeProps({
            name: __props.option.prop
          }, unref(attrs)), {
            default: withCtx(() => [
              unref(attrs).buttonStyle ? (openBlock(true), createElementBlock(Fragment, { key: 0 }, renderList(options.value, ({ label: label2, value, disabled }) => {
                return openBlock(), createBlock(_component_a_radio_button, {
                  key: value,
                  value,
                  disabled
                }, {
                  default: withCtx(() => [
                    createTextVNode(toDisplayString(label2), 1)
                  ]),
                  _: 2
                }, 1032, ["value", "disabled"]);
              }), 128)) : (openBlock(true), createElementBlock(Fragment, { key: 1 }, renderList(options.value, ({ label: label2, value, disabled }) => {
                return openBlock(), createBlock(_component_a_radio, {
                  key: value,
                  value,
                  disabled
                }, {
                  default: withCtx(() => [
                    createTextVNode(toDisplayString(label2), 1)
                  ]),
                  _: 2
                }, 1032, ["value", "disabled"]);
              }), 128))
            ]),
            _: 1
          }, 16, ["name"])
        ]),
        _: 1
      }, 8, ["name", "label"]);
    };
  }
});
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  props: {
    option: null,
    modelData: null
  },
  setup(__props) {
    const props = __props;
    const { effectData, attrs, ruleName, label } = render(props);
    const options = ref(attrs.options || []);
    const _options = props.option.options;
    if (typeof _options === "function") {
      watchPostEffect(() => {
        Promise.resolve(_options(effectData)).then((data) => {
          options.value = data;
        });
      });
    } else if (_options) {
      options.value = unref(_options);
    }
    return (_ctx, _cache) => {
      const _component_a_checkbox_group = CheckboxGroup;
      const _component_a_form_item = FormItem;
      return openBlock(), createBlock(_component_a_form_item, {
        name: unref(ruleName),
        label: unref(label)
      }, {
        default: withCtx(() => [
          createVNode(_component_a_checkbox_group, mergeProps({
            name: __props.option.prop
          }, unref(attrs), { options: options.value }), null, 16, ["name", "options"])
        ]),
        _: 1
      }, 8, ["name", "label"]);
    };
  }
});
const _sfc_main = /* @__PURE__ */ defineComponent({
  props: {
    option: null,
    modelData: null
  },
  setup(__props) {
    const props = __props;
    const { effectData, attrs, ruleName, label } = render(props);
    const treeData = ref([]);
    const _data = props.option.data;
    if (typeof _data === "function") {
      watchPostEffect(() => {
        Promise.resolve(_data(effectData)).then((data) => {
          treeData.value = data;
        });
      });
    } else if (_data) {
      treeData.value = unref(_data);
    }
    return (_ctx, _cache) => {
      const _component_a_tree_select = TreeSelect;
      const _component_a_form_item = FormItem;
      return openBlock(), createBlock(_component_a_form_item, {
        name: unref(ruleName),
        label: unref(label)
      }, {
        default: withCtx(() => [
          createVNode(_component_a_tree_select, mergeProps({
            placeholder: "\u8BF7\u9009\u62E9" + __props.option.label
          }, unref(attrs), { "tree-data": treeData.value }), null, 16, ["placeholder", "tree-data"])
        ]),
        _: 1
      }, 8, ["name", "label"]);
    };
  }
});
var Collections = defineComponent({
  name: "Collections",
  props: {
    option: {
      required: true,
      type: Object
    },
    modelData: {
      required: true,
      type: Object
    }
  },
  setup({
    option,
    modelData
  }) {
    const {
      columns,
      gutter = 16
    } = option || {};
    if (!(columns == null ? void 0 : columns.length))
      return;
    const cols = columns.sort(({
      sort = 1
    }, {
      sort: b_sort = 1
    }) => sort - b_sort);
    const formData = inject("formData");
    const children = cols.map((col) => {
      var _a;
      const span = (_a = col.span) != null ? _a : col.columns || col.subItems ? 24 : 8;
      const subModel = !col.prop ? modelData : buildModel$1(col, modelData);
      const show = useShow(col.hide, {
        formData,
        current: readonly(subModel.parent)
      });
      const slot = () => h(Controls[col.type], {
        option: col,
        modelData: subModel
      });
      return () => show.value && createVNode(Col, {
        "span": span
      }, {
        default: slot
      });
    });
    const slots = {
      default() {
        return children.map((node) => node());
      }
    };
    return () => createVNode(Row, {
      "gutter": gutter
    }, slots);
  }
});
function defineForm(option) {
  return option;
}
function buildForm(optionData) {
  const formRef = ref();
  const FormComponent = () => h(ExaForm, {
    options: optionData,
    ref: formRef
  });
  const onSubmit = () => formRef.value.onSubmit();
  return {
    FormComponent,
    onSubmit
  };
}
function buildModel(optionData) {
  const formRef = ref();
  const FormComponent = () => h(ExaForm, {
    options: optionData,
    ref: formRef
  });
  const {
    openModal
  } = useModal(FormComponent);
  const onSubmit = () => formRef.value.onSubmit();
  return {
    openModal,
    onSubmit
  };
}
const ExaForm = defineComponent({
  name: "ExaForm",
  props: {
    options: {
      type: Object,
      default: () => ({
        columns: []
      })
    }
  },
  setup(props, {
    slots,
    expose
  }) {
    const formData = reactive({});
    const formRef = ref();
    const modelData = {
      propChain: [],
      rules: {},
      parent: formData
    };
    provide("formData", readonly(formData));
    expose({
      onSubmit: () => {
        return formRef.value.validate().then((...args) => {
          console.log(args);
          return toRaw(formData);
        });
      }
    });
    return () => createVNode(Form, {
      "ref": formRef,
      "class": "exa-form",
      "model": formData,
      "rules": modelData.rules,
      "layout": "vertical"
    }, {
      default: () => [createVNode(Collections, {
        "option": props.options,
        "modelData": modelData
      }, null), slots.default]
    });
  }
});
const icons = {
  lock,
  mail,
  search,
  user,
  down,
  mail2: mail
};
const registerIcon = function() {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("aria-hidden", "true");
  svg.style.position = "absolute";
  svg.style.width = "0";
  svg.style.height = "0";
  svg.style.overflow = "hidden";
  function insertRoot() {
    document.body.insertBefore(svg, document.body.firstChild);
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", insertRoot);
  } else {
    insertRoot();
  }
  const regNames = {};
  const append = function(name) {
    var _a;
    if (icons[name]) {
      svg.insertAdjacentHTML("beforeend", icons[name]);
      icons[name] = null;
      regNames[name] = (_a = svg.lastElementChild) == null ? void 0 : _a.id;
    }
  };
  return function(name) {
    append(name);
    return regNames[name];
  };
}();
const VIcon = (props, context) => {
  const iconId = registerIcon(props.type);
  const content = h("use", { "xlink:href": "#" + iconId });
  return h(Icon, context.attrs, { default: () => content });
};
VIcon.props = ["type"];
const install = (app) => {
  app.provide("localeData", { antLocale: zhCN, exist: true });
  app.component("VIcon", VIcon);
};
export { VIcon, buildForm, buildModel, install as default, defineForm, useModal };
