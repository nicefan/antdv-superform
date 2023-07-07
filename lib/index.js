import lock from "@ant-design/icons-svg/inline-svg/outlined/lock.svg";
import down from "@ant-design/icons-svg/inline-svg/outlined/down.svg";
import mail from "@ant-design/icons-svg/inline-svg/outlined/mail.svg";
import search from "@ant-design/icons-svg/inline-svg/outlined/search.svg";
import user from "@ant-design/icons-svg/inline-svg/outlined/user.svg";
import Icon from "@ant-design/icons-vue/es/components/Icon";
import { defineComponent, h, ref, unref, watchEffect, inject, readonly, toRefs, shallowReactive, reactive, computed, createVNode, openBlock, createElementBlock, normalizeProps, guardReactiveProps, createBlock, withCtx, renderSlot, createTextVNode, toDisplayString, createCommentVNode, resolveComponent, withModifiers, Fragment, renderList, mergeProps, watch, createElementVNode, KeepAlive, getCurrentInstance, onMounted, render as render$1, toRaw, watchPostEffect, toRef, isRef, provide, isVNode } from "vue";
import zhCN from "ant-design-vue/es/locale/zh_CN";
import { Button, Card, Checkbox, CheckboxGroup, Col, Collapse, CollapsePanel, DatePicker, Form, FormItem, Input, InputGroup, InputNumber, InputSearch, List, ListItem, Modal, Radio, RadioButton, RadioGroup, RangePicker, Row, Select, Space, Switch, TabPane, Table as Table$1, Tabs, TimePicker, Tooltip, TreeSelect, Divider, Dropdown, Menu, MenuItem, ConfigProvider } from "ant-design-vue";
import cloneDeep from "lodash/cloneDeep";
import { nanoid } from "nanoid";
import { useForm } from "ant-design-vue/es/form";
import message from "ant-design-vue/es/message";
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
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
const VIcon = defineComponent({
  props: {
    type: { type: String, required: true },
    spin: Boolean,
    rotate: Number,
    twoToneColor: String
  },
  setup(props, context) {
    const iconId = registerIcon(props.type);
    const content = h("use", { "xlink:href": "#" + iconId });
    return () => h(Icon, context.attrs, { default: () => content });
  }
});
const base = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Button,
  Card,
  Checkbox,
  CheckboxGroup,
  Col,
  Collapse,
  CollapsePanel,
  DatePicker,
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
  Table: Table$1,
  Tabs,
  TimePicker,
  Tooltip,
  TreeSelect
}, Symbol.toStringTag, { value: "Module" }));
const _base = base;
function override(comps) {
  Object.keys(comps).forEach((key) => {
    _base["A" + key] = comps[key];
  });
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
function getEffectData(param) {
  const formData = inject("formData");
  return readonly({ formData, ...toRefs(shallowReactive(param)) });
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
function buildModel(option, { parent, propChain = [], rules = {}, refName }) {
  const { field = "", keepField, label, rules: _rules, initialValue } = option;
  const nameArr = field.split(".");
  let current = refName ? parent[refName] : parent;
  let _refName;
  let currentRules;
  nameArr.forEach((name, idx, arr) => {
    const isLast = idx === arr.length - 1;
    const isWrap = !!(option.columns || option.subItems);
    if (!isLast) {
      current[name] || (current[name] = {});
      current = reactive(current[name]);
      rules = rules[name] || (rules[name] = {});
    } else if (isWrap) {
      _refName = name;
      current[name] ?? (current[name] = option.columns ? [] : {});
      rules = rules[name] || (rules[name] = {});
    } else {
      _refName = name;
      current[name] ?? (current[name] = initialValue);
      if (keepField)
        current[keepField] ?? (current[keepField] = void 0);
      if (_rules) {
        const _r = Array.isArray(_rules) ? _rules : [_rules];
        currentRules = rules[name] = _r.map((item) => buildRule(item, label)).flat();
      }
    }
  });
  return {
    // propRef: toRef(_parent, _refName),
    refName: _refName,
    parent: current,
    rules,
    currentRules,
    propChain: propChain.concat(nameArr)
  };
}
function buildModelDeep(children, { parent, propChain = [], rules = {}, refName = "" }) {
  const currentModel = { parent, propChain, rules, refName };
  const cols = children.sort(({ sort = 1 }, { sort: b_sort = 1 }) => sort - b_sort);
  const models = /* @__PURE__ */ new Map();
  cols.forEach((child) => {
    const { field, subItems, columns } = child;
    const subModel = field ? buildModel(child, currentModel) : currentModel;
    const item = {
      model: subModel
    };
    if (subItems) {
      item.children = buildModelDeep(subItems, subModel);
    } else if (columns) {
      const initModel = { parent: reactive({}), rules: {} };
      item.listData = {
        model: initModel,
        children: buildModelDeep(columns, initModel)
      };
    }
    models.set(child, item);
  });
  return models;
}
function getPropertyDeep(target, names) {
  let result = target;
  names.forEach((name) => {
    result = result == null ? void 0 : result[name];
  });
  return result;
}
function cloneModels(orgModels, data) {
  const models = [...orgModels].map(([option, { model, children }]) => {
    const parent = getPropertyDeep(data, model.propChain.slice(0, -1));
    const item = {
      model: { ...model, parent },
      ...children && { children: cloneModels(children, data) }
    };
    return [option, item];
  });
  return new Map(models);
}
function flatModels(orgModels, data) {
  const models = [];
  for (const [option, { model, children }] of orgModels) {
    if (children) {
      models.push(...flatModels(children, data));
    } else if (data) {
      const parent = getPropertyDeep(data, model.propChain.slice(0, -1));
      models.push([option, { ...model, parent }]);
    } else {
      models.push([option, model]);
    }
  }
  return new Map(models);
}
function setFieldsValue(modelsMap, data) {
  var _a;
  for (const [option, { model, children, listData }] of modelsMap) {
    if (children) {
      setFieldsValue(children, data);
    } else {
      const parent = getPropertyDeep(data, model.propChain.slice(0, -1));
      if (!parent)
        continue;
      const curValue = parent[model.refName];
      if (listData) {
        model.parent[model.refName].splice(0);
        const rowKey = ((_a = option.attrs) == null ? void 0 : _a.rowKey) || "id";
        curValue == null ? void 0 : curValue.forEach((item) => {
          const def = cloneDeep(listData.model.parent);
          setFieldsValue(cloneModels(listData.children, def), item);
          def[rowKey] = item[rowKey] || nanoid(12);
          model.parent[model.refName].push(def);
        });
      } else {
        const keepField = option.keepField;
        keepField && (model.parent[keepField] = parent[keepField]);
        model.parent[model.refName] = curValue;
      }
    }
  }
}
function render({ option, model }) {
  const { type, keepField, attrs: __attrs, disabled: __disabled, hidden: __hidden } = option;
  const { parent, currentRules, propChain } = model;
  const effectData = getEffectData({ record: parent });
  const hidden = getComputedStatus(__hidden, effectData);
  const disabled = getComputedStatus(__disabled, effectData);
  const listener = getListener(option.on, effectData);
  const computedAttr = typeof __attrs === "function" ? { ...toRefs(getComputedAttr(__attrs, effectData)) } : __attrs || {};
  if (type === "Select" && keepField) {
    const change = listener.onChange;
    listener.onChange = function(val, currentOption) {
      parent[keepField] = currentOption.label;
      change && change(val, currentOption);
    };
  }
  const ruleName = currentRules && computed(() => unref(disabled) ? void 0 : propChain);
  const attrs = reactive({ ...listener, ...computedAttr, disabled });
  return { effectData, attrs, ruleName, hidden };
}
const Collections = /* @__PURE__ */ defineComponent({
  name: "Collections",
  props: {
    option: {
      type: Object
    },
    model: {
      type: Object
    },
    children: {
      required: true,
      type: Object
    }
  },
  setup({
    option,
    children
  }) {
    const {
      gutter = 16
    } = option || {};
    const nodes = [...children].map(([subOption, subData]) => {
      const span = subOption.span ?? (subData.children || subOption.columns ? 24 : 8);
      const props = {
        option: subOption,
        ...subData
      };
      const {
        effectData,
        attrs,
        ruleName,
        hidden
      } = render(props);
      const {
        type,
        label
      } = subOption;
      const slot = () => h(components[type], reactive({
        ...props,
        attrs,
        effectData,
        name: ruleName,
        label
      }));
      return () => !hidden.value && createVNode(Col, {
        "span": span
      }, {
        default: slot
      });
    });
    const slots = {
      default() {
        return nodes.map((node) => node());
      }
    };
    return () => createVNode(Row, {
      "gutter": gutter
    }, slots);
  }
});
const _sfc_main$g = /* @__PURE__ */ defineComponent({
  __name: "Group",
  props: {
    option: {},
    model: {},
    children: {},
    attrs: {},
    effectData: {}
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", normalizeProps(guardReactiveProps(_ctx.attrs)), [
        _ctx.option.title ? (openBlock(), createBlock(unref(Row), {
          key: 0,
          span: 24,
          class: "title"
        }, {
          default: withCtx(() => [
            renderSlot(_ctx.$slots, "title", {}, () => [
              createVNode(unref(Divider), { orientation: "left" }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(_ctx.option.title), 1)
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
  __name: "InputGroup",
  props: {
    option: {},
    model: {},
    children: {},
    attrs: {},
    effectData: {}
  },
  setup(__props) {
    const props = __props;
    const { FormItem: FormItem2, InputGroup: InputGroup2 } = _base;
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(FormItem2), { style: { "margin": "0" } }, {
        default: withCtx(() => [
          createVNode(unref(InputGroup2), normalizeProps(guardReactiveProps(_ctx.attrs)), {
            default: withCtx(() => [
              createVNode(unref(Collections), normalizeProps(guardReactiveProps(props)), null, 16)
            ]),
            _: 1
          }, 16)
        ]),
        _: 1
      });
    };
  }
});
const _sfc_main$e = defineComponent({
  components: {
    VIcon,
    ASpace: Space,
    AButton: Button,
    ATooltip: Tooltip,
    ADropdown: Dropdown,
    AMenu: Menu,
    AMenuItem: MenuItem
  },
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
    const param = readonly({ formData, ...props.param });
    const { btns, moreBtns, defAttr } = useButton(config, param, methods);
    return {
      btns,
      moreBtns,
      defAttr
    };
  }
});
function useButton(config, param, methods) {
  const { type, shape, limit = 3, hidden, disabled, size, actions } = config;
  const dis = useDisabled(disabled, param);
  const show = useShow(hidden, param);
  const actionBtns = [];
  if (actions && methods) {
    const actionsKeys = Array.isArray(actions) ? actions : Object.keys(actions);
    actionsKeys.forEach((key) => {
      const obj = { method: methods[key] };
      let label;
      switch (key) {
        case "add":
          label = "新增";
          break;
        case "del":
          label = "删除";
          obj.danger = true;
          obj.confirmText = "确定要删除吗？";
          obj.disabled = (param2) => {
            var _a;
            return !param2.record && !(((_a = param2.selectedRowKeys) == null ? void 0 : _a.length) > 0);
          };
          break;
        case "edit":
          label = "修改";
          obj.disabled = (param2) => {
            var _a;
            return !param2.record && !(((_a = param2.selectedRowKeys) == null ? void 0 : _a.length) === 1);
          };
      }
      actionBtns.push(Object.assign(obj, { label, ...actions[key] }));
    });
  }
  const allBtns = actionBtns.concat(config.subItems || []).map((item) => {
    const show2 = useShow(item.hide, param);
    const disabled2 = item.disabled !== void 0 ? useDisabled(item.disabled, param) : dis;
    const onClick = (e) => {
      var _a, _b;
      if (item.confirmText) {
        Modal.confirm({
          title: item.confirmText,
          okText: "确定",
          cancelText: "取消",
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
    return { show: show2, ...item, attr: { size, type, shape, ...item.attr, disabled: disabled2, onClick } };
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
const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const _hoisted_1$1 = { key: 1 };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_v_icon = resolveComponent("v-icon");
  const _component_a_tooltip = resolveComponent("a-tooltip");
  const _component_a_button = resolveComponent("a-button");
  const _component_a_menu_item = resolveComponent("a-menu-item");
  const _component_a_menu = resolveComponent("a-menu");
  const _component_a_dropdown = resolveComponent("a-dropdown");
  const _component_a_space = resolveComponent("a-space");
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
              createTextVNode(" 更多 "),
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
const ButtonGroup = /* @__PURE__ */ _export_sfc(_sfc_main$e, [["render", _sfc_render]]);
const _sfc_main$d = /* @__PURE__ */ defineComponent({
  __name: "Card",
  props: {
    option: {},
    children: {},
    attrs: {},
    effectData: {}
  },
  setup(__props) {
    const props = __props;
    const { title, buttons } = props.option;
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(_base).Card, mergeProps({ title: unref(title) }, _ctx.attrs), {
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
  __name: "List",
  props: {
    option: {},
    model: {},
    listData: {},
    attrs: {},
    effectData: {}
  },
  setup(__props) {
    var _a;
    const props = __props;
    const { Row: Row2, List: List2, ListItem: ListItem2 } = _base;
    const { buttons, itemButtons, label } = props.option;
    const defaultData = props.listData.model.parent;
    const modelsMap = props.listData.children;
    const { parent, refName } = props.model;
    const orgList = parent[refName];
    const rowKey = ((_a = props.attrs) == null ? void 0 : _a.rowKey) || "id";
    const itemsMap = {};
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
    const listItems = ref([]);
    watch(
      () => orgList.length,
      () => {
        listItems.value = orgList.map((item) => {
          const hash = item[rowKey] || nanoid(12);
          let itemModel = itemsMap[hash];
          if (!itemModel) {
            item[rowKey] = hash;
            itemModel = itemsMap[hash] = cloneModels(modelsMap, item);
          }
          return itemModel;
        });
      }
    );
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(List2), mergeProps({ "data-source": listItems.value }, _ctx.attrs), {
        header: withCtx(() => [
          unref(label) || unref(buttons) ? (openBlock(), createBlock(unref(Row2), {
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
        renderItem: withCtx(({ item: models, index }) => [
          (openBlock(), createBlock(unref(ListItem2), {
            key: _ctx.model.parent[unref(rowKey)]
          }, {
            actions: withCtx(() => [
              unref(itemButtons) ? (openBlock(), createBlock(ButtonGroup, {
                key: 0,
                config: unref(itemButtons),
                methods,
                param: { listData: unref(orgList), index, record: _ctx.model.parent }
              }, null, 8, ["config", "param"])) : createCommentVNode("", true)
            ]),
            default: withCtx(() => [
              createVNode(unref(Collections), {
                style: { "width": "100%" },
                children: models
              }, null, 8, ["children"])
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
const _sfc_main$b = /* @__PURE__ */ defineComponent({
  ...__default__,
  props: {
    option: {},
    model: {},
    children: {},
    attrs: {},
    effectData: {}
  },
  setup(__props) {
    const props = __props;
    const {
      Card: Card2
    } = _base;
    const {
      activeKey,
      buttons
    } = props.option;
    const tabMap = {};
    const allList = [...props.children].map(([itemOption, data], idx) => {
      const {
        attrs,
        hidden
      } = render({
        option: itemOption,
        model: data
      });
      const {
        key,
        field,
        label,
        icon
      } = itemOption;
      const tabKey = key || field || String(idx);
      const tabLabel = (icon ? createVNode(VIcon, {
        "type": icon
      }, null) : "") + label;
      tabMap[tabKey] = {
        children: data.children,
        option: itemOption
      };
      return reactive({
        key: tabKey,
        tab: tabLabel,
        disabled: attrs.disabled,
        hidden
      });
    });
    const acKey = ref(unref(activeKey) || allList[0].key);
    const tabList = ref(allList);
    watch(allList, () => {
      let validKey;
      tabList.value = allList.filter((item) => {
        if (!item.hidden && !item.disabled) {
          validKey = validKey ?? item.key;
        } else if (acKey.value === item.key) {
          acKey.value = validKey;
        }
        return !item.hidden;
      });
      acKey.value = acKey.value ?? validKey;
    }, {
      deep: true
    });
    const onTabChange = (key) => {
      var _a, _b;
      acKey.value = key;
      (_b = (_a = props.attrs).onTabChange) == null ? void 0 : _b.call(_a, key);
    };
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(Card2), mergeProps({
        "tab-list": tabList.value,
        "active-tab-key": acKey.value
      }, _ctx.attrs, {
        onTabChange
      }), {
        tabBarExtraContent: withCtx(() => [unref(buttons) ? (openBlock(), createBlock(ButtonGroup, {
          key: 0,
          config: unref(buttons)
        }, null, 8, ["config"])) : createCommentVNode("", true)]),
        default: withCtx(() => [(openBlock(), createBlock(KeepAlive, null, [(openBlock(), createBlock(unref(Collections), mergeProps(tabMap[acKey.value], {
          key: acKey.value
        }), null, 16))], 1024))]),
        _: 1
      }, 16, ["tab-list", "active-tab-key"]);
    };
  }
});
function createModal(content, config = {}) {
  const visible = ref(false);
  const _config = reactive({
    ...config
  });
  const onOk = () => {
    var _a;
    return Promise.resolve((_a = _config.onOk) == null ? void 0 : _a.call(_config)).then(() => {
      visible.value = false;
    });
  };
  const refM = ref();
  const modalSlot = () => createVNode(_base.Modal, mergeProps({
    "ref": refM,
    "visible": visible.value,
    "onUpdate:visible": ($event) => visible.value = $event
  }, {
    ..._config,
    onOk
  }), {
    default: content
  });
  const openModal = (option) => {
    Object.assign(_config, option);
    visible.value = true;
  };
  return {
    modalSlot,
    openModal
  };
}
function useModal(content, config = {}) {
  const {
    modalSlot,
    openModal
  } = createModal(content, config);
  const wrap = document.createElement("div");
  const ins = getCurrentInstance();
  const vm = createVNode(modalSlot);
  vm.appContext = ins == null ? void 0 : ins.appContext;
  onMounted(() => render$1(vm, wrap));
  return {
    openModal
  };
}
const style = {
  "table-form-item": "_table-form-item_1f50l_1"
};
function buildInlineForm(modelsMap, data) {
  const editData = reactive(cloneDeep(data));
  const rules = {};
  const nodes = /* @__PURE__ */ new Map();
  const models = flatModels(modelsMap, editData);
  for (const [option, model] of models) {
    const ruleName = model.propChain.join(".");
    model.currentRules && (rules[ruleName] = model.currentRules);
    const node = () => {
      const {
        effectData,
        attrs
      } = render({
        option,
        model
      });
      return h(components[option.type], {
        option,
        model,
        attrs,
        effectData,
        ...form.validateInfos[ruleName],
        class: style["table-form-item"]
      });
    };
    nodes.set(option, node);
  }
  const form = useForm(editData, ref(rules));
  return {
    nodes,
    form
  };
}
function inlineRender({
  parentModel,
  modelsMap,
  orgList,
  rowKey
}) {
  const newItems = ref([]);
  const list = ref([]);
  const editMap = shallowReactive({});
  watch(shallowReactive(orgList), () => {
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
        ...buildInlineForm(modelsMap, parentModel.parent)
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
          ...buildInlineForm(modelsMap, data)
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
        orgList.push({
          ...record,
          ...raw
        });
      } else {
        Object.assign(toRaw(record), raw);
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
  const {
    Space: Space2,
    Button: Button2
  } = _base;
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
    const editInfo = editMap[param.record[rowKey]];
    if (editInfo == null ? void 0 : editInfo.isEdit) {
      return editButtons(param);
    }
  };
  const colRenderMap = /* @__PURE__ */ new Map();
  const models = flatModels(modelsMap);
  for (const col of models.keys()) {
    const customRender = ({
      record,
      text
    }) => {
      var _a;
      const editInfo = editMap[record[rowKey]];
      return (editInfo == null ? void 0 : editInfo.isEdit) && ((_a = editInfo.nodes.get(col)) == null ? void 0 : _a()) || text;
    };
    colRenderMap.set(col, customRender);
  }
  return {
    list,
    editMap,
    colRenderMap,
    methods,
    actionSlot
  };
}
function modalEdit({
  parentModel,
  modelsMap,
  orgList,
  rowKey
}) {
  const {
    parent,
    rules
  } = parentModel;
  const copyData = parent;
  const modelRef = reactive(cloneDeep(parent));
  const children = cloneModels(modelsMap, modelRef);
  const formRef = ref();
  const editForm = () => createVNode(_base.Form, {
    "ref": formRef,
    "class": "exa-form",
    "model": modelRef,
    "rules": rules,
    "layout": "vertical"
  }, {
    default: () => [createVNode(Collections, {
      "children": children
    }, null)]
  });
  const {
    modalSlot,
    openModal
  } = createModal(editForm);
  const methods = {
    add() {
      Object.assign(modelRef, cloneDeep(copyData), {
        [rowKey]: nanoid(12)
      });
      openModal({
        title: "新增",
        onOk() {
          return formRef.value.validate().then(() => {
            orgList.push(cloneDeep(modelRef));
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
        title: "修改",
        onOk() {
          return formRef.value.validate().then(() => {
            const idx = orgList.indexOf(data);
            Object.assign(orgList[idx], cloneDeep(modelRef));
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
        orgList.splice(orgList.indexOf(item), 1);
      });
    }
  };
  return {
    modalSlot,
    methods
  };
}
function buildColumns(models, colRenderMap) {
  const columns = function getConfig(_models) {
    return [..._models].map(([col, {
      model,
      children
    }]) => {
      if (children) {
        return {
          title: col.label,
          children: getConfig(children)
        };
      } else {
        const colRender = colRenderMap == null ? void 0 : colRenderMap.get(col);
        const customRender = ({
          record,
          text
        }) => {
          let renderText = text;
          if (Array.isArray(col.options)) {
            col.options.find(({
              value,
              label
            }) => {
              if (value === text) {
                renderText = label;
                return true;
              }
            });
          } else if (col.type === "Switch") {
            renderText = (col.valueLabels || "否是")[text];
          }
          return colRender ? colRender({
            record,
            text: renderText
          }) : renderText;
        };
        return {
          title: col.label,
          dataIndex: model.propChain.join("."),
          customRender,
          ...col.attrs
        };
      }
    });
  }(models);
  return columns;
}
function buildData({
  option,
  listData,
  orgList,
  rowKey
}) {
  const {
    itemButtons
  } = option;
  const parentModel = listData.model;
  const modelsMap = listData.children;
  let context;
  const _param = {
    parentModel,
    modelsMap,
    orgList,
    rowKey
  };
  if (option.editMode === "inline") {
    const {
      list,
      actionSlot,
      colRenderMap,
      methods
    } = inlineRender(_param);
    const columns = buildColumns(modelsMap, colRenderMap);
    context = {
      columns,
      list,
      methods,
      actionSlot
    };
    if (option.addMode === "modal") {
      const {
        modalSlot,
        methods: {
          add
        }
      } = modalEdit(_param);
      context.methods.add = add;
      context.modalSlot = modalSlot;
    }
  } else {
    const columns = buildColumns(modelsMap);
    const {
      modalSlot,
      methods
    } = modalEdit(_param);
    context = {
      modalSlot,
      methods,
      columns,
      list: ref(orgList)
    };
  }
  if (itemButtons) {
    context.columns.push({
      title: "操作",
      key: "action",
      customRender: (param) => {
        var _a;
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
const Table = /* @__PURE__ */ defineComponent({
  name: "ExaTable",
  props: {
    option: {
      required: true,
      type: Object
    },
    model: {
      required: true,
      type: Object
    },
    listData: {
      required: true,
      type: Object
    },
    attrs: {
      required: true,
      type: Object
    },
    effectData: Object
  },
  setup({
    option,
    model,
    listData,
    attrs
  }, ctx) {
    const editInline = option.editMode === "inline";
    const rowKey = attrs.rowKey || "id";
    const orgList = model.parent[model.refName];
    const {
      list,
      columns,
      methods,
      modalSlot
    } = buildData({
      option,
      listData,
      orgList,
      rowKey
    });
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
    const rowSelection = reactive({
      fixed: true,
      selectedRowKeys,
      onChange: (_selectedRowKeys, _selectedRows) => {
        selectedRowKeys.value = _selectedRowKeys;
        selectedRows.value = _selectedRows;
      },
      ...editInline && {
        getCheckboxProps: (record) => ({
          disabled: !orgList.includes(record)
        })
      }
    });
    const actions = option.buttons && (() => option.buttons && createVNode(ButtonGroup, {
      "config": option.buttons,
      "param": {
        selectedRows,
        selectedRowKeys
      },
      "methods": methods
    }, null));
    return () => createVNode(Fragment, null, [modalSlot == null ? void 0 : modalSlot(), createVNode(_base.Table, mergeProps({
      "dataSource": list.value,
      "columns": columns
    }, ctx.attrs, attrs, {
      "rowSelection": rowSelection,
      "rowKey": rowKey,
      "tableLayout": "fixed",
      "title": actions
    }), {
      tableTitle: actions
    })]);
  }
});
const _sfc_main$a = /* @__PURE__ */ defineComponent({
  __name: "Collapse",
  props: {
    option: {},
    model: {},
    children: {},
    attrs: {},
    effectData: {}
  },
  setup(__props) {
    const props = __props;
    const { Collapse: Collapse2, CollapsePanel: CollapsePanel2 } = _base;
    const panels = [...props.children].map(([option, data], idx) => {
      const { attrs: __attrs, hidden } = render({ option, model: data });
      const { key, field } = option;
      const { disabled, ...attrs } = toRefs(__attrs);
      return {
        attrs: reactive(attrs),
        option,
        propsData: data,
        key: key || field || String(idx),
        hidden,
        disabled
      };
    });
    const { activeKey } = props.option;
    const acKey = ref(activeKey || panels[0].key);
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(Collapse2), mergeProps({
        activeKey: acKey.value,
        "onUpdate:activeKey": _cache[0] || (_cache[0] = ($event) => acKey.value = $event)
      }, _ctx.attrs), {
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
                  panel.option.buttons ? (openBlock(), createBlock(ButtonGroup, {
                    key: 0,
                    config: panel.option.buttons
                  }, null, 8, ["config"])) : createCommentVNode("", true)
                ]),
                default: withCtx(() => [
                  createVNode(unref(Collections), mergeProps({
                    option: panel.option
                  }, panel.propsData), null, 16, ["option"])
                ]),
                _: 2
              }, 1040, ["header", "collapsible"])) : createCommentVNode("", true)
            ], 64);
          }), 128))
        ]),
        _: 1
      }, 16, ["activeKey"]);
    };
  }
});
const _sfc_main$9 = /* @__PURE__ */ defineComponent({
  __name: "Input",
  props: {
    option: {},
    model: {},
    attrs: {},
    effectData: {}
  },
  setup(__props) {
    const props = __props;
    const { Input: Input2, Button: Button2, Tooltip: Tooltip2, FormItem: FormItem2 } = _base;
    const valueProps = useVModel(props);
    const allAttrs = reactive({ ...valueProps, ...props.attrs });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(FormItem2), null, {
        default: withCtx(() => [
          createVNode(unref(Input2), mergeProps({
            readonly: !!_ctx.option.keepField,
            placeholder: "请输入" + (_ctx.option.label || ""),
            "max-length": "100",
            class: _ctx.option.btnClick ? "ant-input-search ant-input-search-enter-button" : ""
          }, allAttrs), {
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
                  createVNode(unref(VIcon), {
                    type: _ctx.option.addonAfterIcon || "search"
                  }, null, 8, ["type"])
                ]),
                _: 1
              }, 8, ["disabled"])) : _ctx.option.addonAfterIcon ? (openBlock(), createBlock(unref(VIcon), {
                key: 1,
                type: _ctx.option.addonAfterIcon
              }, null, 8, ["type"])) : createCommentVNode("", true)
            ]),
            addonBefore: withCtx(() => [
              _ctx.option.addonBeforeIcon ? (openBlock(), createBlock(unref(VIcon), {
                key: 0,
                type: _ctx.option.addonBeforeIcon
              }, null, 8, ["type"])) : createCommentVNode("", true)
            ]),
            prefix: withCtx(() => [
              _ctx.option.prefixIcon ? (openBlock(), createBlock(unref(VIcon), {
                key: 0,
                type: _ctx.option.prefixIcon
              }, null, 8, ["type"])) : createCommentVNode("", true)
            ]),
            suffix: withCtx(() => [
              _ctx.option.suffixIcon ? (openBlock(), createBlock(unref(VIcon), {
                key: 0,
                type: _ctx.option.suffixIcon
              }, null, 8, ["type"])) : createCommentVNode("", true),
              _ctx.option.suffixTips ? (openBlock(), createBlock(unref(Tooltip2), {
                key: 1,
                title: "{item.suffixTips}"
              }, {
                default: withCtx(() => [
                  createVNode(unref(VIcon), {
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
      });
    };
  }
});
const _sfc_main$8 = /* @__PURE__ */ defineComponent({
  __name: "InputNumber",
  props: {
    option: {},
    model: {},
    attrs: {},
    effectData: {}
  },
  setup(__props) {
    const props = __props;
    const { FormItem: FormItem2, InputNumber: InputNumber2 } = _base;
    const valueProps = useVModel(props);
    const allAttrs = reactive({ ...valueProps, ...props.attrs });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(FormItem2), null, {
        default: withCtx(() => [
          createVNode(unref(InputNumber2), mergeProps({
            style: { "width": "100%" },
            type: "number",
            placeholder: "请输入" + _ctx.option.label
          }, allAttrs), null, 16, ["placeholder"])
        ]),
        _: 1
      });
    };
  }
});
const _sfc_main$7 = /* @__PURE__ */ defineComponent({
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
    const { FormItem: FormItem2, Select: Select2 } = _base;
    const valueProps = useVModel(props);
    const allAttrs = reactive({ ...valueProps, ...props.attrs });
    const options = ref(((_a = props.attrs) == null ? void 0 : _a.options) || []);
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
          createVNode(unref(Select2), mergeProps({
            "option-filter-prop": "label",
            placeholder: "请选择" + _ctx.option.label
          }, allAttrs, { options: options.value }), null, 16, ["placeholder", "options"])
        ]),
        _: 1
      });
    };
  }
});
function useVModel({ option, model }) {
  const { type, keepField, computed: __computed } = option;
  const { refName, parent } = model;
  const refValue = toRef(parent, refName);
  const tempData = reactive({ [refName]: parent[refName] });
  const vModel = {
    value: toRef(tempData, refName),
    "onUpdate:value": (val) => {
      tempData[refName] = val;
    }
  };
  let effect;
  if (type === "DateRange" && keepField) {
    tempData[refName] = [];
    effect = ([start, end]) => {
      refValue.value = start;
      parent[keepField] = end;
    };
    watch([refValue, () => parent[keepField]], vModel["onUpdate:value"]);
  } else {
    effect = (value) => {
      refValue.value = value;
    };
    watch(refValue, vModel["onUpdate:value"]);
  }
  watch(() => tempData[refName], effect, { flush: "sync" });
  if (__computed) {
    const effectData = getEffectData({ record: parent });
    const raw = tempData[refName];
    onMounted(() => watch(() => __computed(raw, effectData), effect));
  }
  return vModel;
}
const _sfc_main$6 = /* @__PURE__ */ defineComponent({
  __name: "Switch",
  props: {
    option: {},
    model: {},
    attrs: {},
    effectData: {}
  },
  setup(__props) {
    const props = __props;
    const { FormItem: FormItem2, Switch: Switch2 } = _base;
    const { value } = useVModel(props);
    const [falseName, trueName] = props.option.valueLabels || [];
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(FormItem2), null, {
        default: withCtx(() => [
          createVNode(unref(Switch2), mergeProps({
            checked: unref(value),
            "onUpdate:checked": _cache[0] || (_cache[0] = ($event) => isRef(value) ? value.value = $event : null),
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
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "DateRange",
  props: {
    option: {},
    model: {},
    attrs: {},
    effectData: {}
  },
  setup(__props) {
    const props = __props;
    const { FormItem: FormItem2, RangePicker: RangePicker2 } = _base;
    const valueProps = useVModel(props);
    const allAttrs = reactive({ ...valueProps, ...props.attrs });
    const disabledDate = (currentDate) => {
      var _a, _b;
      return (_b = (_a = props.attrs).disabledDate) == null ? void 0 : _b.call(_a, currentDate, props.effectData);
    };
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(FormItem2), null, {
        default: withCtx(() => [
          createVNode(unref(RangePicker2), mergeProps({ "value-format": "YYYY-MM-DD" }, allAttrs, { "disabled-date": disabledDate }), null, 16)
        ]),
        _: 1
      });
    };
  }
});
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "DatePicker",
  props: {
    option: {},
    model: {},
    attrs: {},
    effectData: {}
  },
  setup(__props) {
    const props = __props;
    const { FormItem: FormItem2, DatePicker: DatePicker2 } = _base;
    const valueProps = useVModel(props);
    const allAttrs = reactive({ ...valueProps, ...props.attrs });
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
          }, allAttrs, { "disabled-date": disabledDate }), null, 16)
        ]),
        _: 1
      });
    };
  }
});
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "TimePicker",
  props: {
    option: {},
    model: {},
    attrs: {},
    effectData: {}
  },
  setup(__props) {
    const props = __props;
    const { FormItem: FormItem2, TimePicker: TimePicker2 } = _base;
    const valueProps = useVModel(props);
    const allAttrs = reactive({ ...valueProps, ...props.attrs });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(FormItem2), null, {
        default: withCtx(() => [
          createVNode(unref(TimePicker2), normalizeProps(guardReactiveProps(allAttrs)), null, 16)
        ]),
        _: 1
      });
    };
  }
});
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "Radio",
  props: {
    option: {},
    model: {},
    attrs: {},
    effectData: {}
  },
  setup(__props) {
    const props = __props;
    const { FormItem: FormItem2, RadioButton: RadioButton2, RadioGroup: RadioGroup2, Radio: Radio2 } = _base;
    const valueProps = useVModel(props);
    const allAttrs = reactive({ ...valueProps, ...props.attrs });
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
          }, allAttrs), {
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
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "Checkbox",
  props: {
    option: {},
    model: {},
    attrs: {},
    effectData: {}
  },
  setup(__props) {
    const props = __props;
    const { FormItem: FormItem2, CheckboxGroup: CheckboxGroup2 } = _base;
    const valueProps = useVModel(props);
    const allAttrs = reactive({ ...valueProps, ...props.attrs });
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
          }, allAttrs, { options: options.value }), null, 16, ["name", "options"])
        ]),
        _: 1
      });
    };
  }
});
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "TreeSelect",
  props: {
    option: {},
    model: {},
    attrs: {},
    effectData: {}
  },
  setup(__props) {
    const props = __props;
    const { FormItem: FormItem2, TreeSelect: TreeSelect2 } = _base;
    const valueProps = useVModel(props);
    const allAttrs = reactive({ ...valueProps, ...props.attrs });
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
          }, allAttrs, { "tree-data": treeData.value }), null, 16, ["placeholder", "tree-data"])
        ]),
        _: 1
      });
    };
  }
});
const components = {
  Group: _sfc_main$g,
  InputGroup: _sfc_main$f,
  Card: _sfc_main$d,
  List: _sfc_main$c,
  Tabs: _sfc_main$b,
  Table,
  Collapse: _sfc_main$a,
  Input: _sfc_main$9,
  InputNumber: _sfc_main$8,
  Select: _sfc_main$7,
  Switch: _sfc_main$6,
  DateRange: _sfc_main$5,
  DatePicker: _sfc_main$4,
  TimePicker: _sfc_main$3,
  Radio: _sfc_main$2,
  Checkbox: _sfc_main$1,
  TreeSelect: _sfc_main
};
function addComponent(name, component) {
  components[name] = defineComponent({
    name,
    props: ["option", "model", "effectData", "attrs"],
    setup({ option, model, effectData, attrs }) {
      const valueProps = useVModel({ option, model });
      const allAttrs = reactive({ valueProps, ...attrs });
      return () => h(
        _base.FormItem,
        {},
        () => typeof component === "function" ? component({ option, effectData, attrs: allAttrs }) : h(component, attrs)
      );
    }
  });
}
const install = async (app, config = {}) => {
  const { locale = zhCN, components: components2 } = config;
  app.provide("localeData", { locale, exist: true });
  app.component("VIcon", VIcon);
  components2 && override(components2);
};
async function registComponent(name, component) {
  addComponent(name, component);
}
const plugin = {
  install,
  registComponent
};
function _isSlot(s) {
  return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !isVNode(s);
}
function defineForm(option) {
  return option;
}
function buildForm(optionData) {
  const formRef = ref();
  const FormComponent = () => h(ExaForm, {
    option: optionData,
    ref: formRef
  });
  const onSubmit = () => formRef.value.onSubmit();
  return {
    FormComponent,
    onSubmit,
    resetFields: () => formRef.value.getExpose().resetFields(),
    setFieldsValue: (data) => formRef.value.setFieldsValue(data)
  };
}
function buildModal(optionData) {
  const formRef = ref();
  const FormComponent = () => h(ExaForm, {
    option: optionData,
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
const ExaForm = /* @__PURE__ */ defineComponent({
  name: "ExaForm",
  props: {
    option: {
      type: Object,
      default: () => ({
        subItems: []
      })
    }
  },
  setup(props, {
    slots,
    expose,
    attrs
  }) {
    var _a, _b;
    const formData = reactive({});
    const formRef = ref();
    const modelData = {
      rules: {},
      parent: formData
    };
    const modelsMap = buildModelDeep(props.option.subItems, modelData);
    provide("formData", readonly(formData));
    expose({
      getExpose() {
        return formRef.value;
      },
      onSubmit: () => {
        return formRef.value.validate().then((...args) => {
          console.log(args);
          return toRaw(formData);
        });
      },
      setFieldsValue(data) {
        return setFieldsValue(modelsMap, data);
      }
    });
    let locale = (_a = inject("configProvider")) == null ? void 0 : _a.locale;
    const formNode = () => createVNode(Form, mergeProps({
      "ref": formRef,
      "class": "exa-form",
      "model": formData,
      "rules": modelData.rules,
      "layout": "vertical"
    }, props.option.attrs, attrs), {
      default: () => [createVNode(Collections, {
        "option": props.option,
        "children": modelsMap
      }, null), slots.default]
    });
    if (!locale) {
      locale = ((_b = inject("localeData")) == null ? void 0 : _b.locale) || zhCN;
      dayjs.locale(locale.locale);
      return () => {
        let _slot;
        return createVNode(ConfigProvider, {
          "locale": locale
        }, _isSlot(_slot = formNode()) ? _slot : {
          default: () => [_slot]
        });
      };
    } else {
      console.log(inject("configProvider"));
      return formNode;
    }
  }
});
export {
  buildForm,
  buildModal,
  plugin as default,
  defineForm,
  useModal
};
