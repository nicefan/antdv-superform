import "./style.css";
import zhCN from "ant-design-vue/es/locale/zh_CN";
import { defaults, merge, cloneDeep, mergeWith, isArray, isPlainObject, uniq, throttle, debounce, mapKeys, camelCase } from "lodash-es";
import { h, inject, reactive, ref, unref, watchEffect, toValue, toRef, watch, onMounted, computed, toRefs, mergeProps, defineComponent, openBlock, createBlock, withModifiers, withCtx, createElementBlock, Fragment, renderList, createVNode, normalizeProps, guardReactiveProps, resolveDynamicComponent, createCommentVNode, createTextVNode, toDisplayString, provide, toRaw, readonly, useAttrs, onUnmounted, getCurrentInstance, nextTick, render as render$1, shallowReactive, createSlots, normalizeClass, watchPostEffect, shallowRef, useSlots } from "vue";
import { Modal, Space, Tooltip, Button, Divider, Dropdown, Menu, MenuItem, Card, Checkbox, CheckboxGroup as CheckboxGroup$1, Col, Collapse, CollapsePanel, DatePicker, Descriptions as Descriptions$1, DescriptionsItem, Form as Form$1, FormItem, Input, InputGroup, InputNumber, InputSearch, List, ListItem, Radio, RadioButton, RadioGroup as RadioGroup$1, RangePicker, Row, Select, Switch as Switch$1, TabPane, Table, Tabs, Textarea, TimePicker, TreeSelect, Upload, message, FormItemRest, Image } from "ant-design-vue";
import { EllipsisOutlined, SearchOutlined, CloseCircleOutlined, SyncOutlined, LoadingOutlined, PaperClipOutlined, PlusOutlined, UploadOutlined } from "@ant-design/icons-vue";
import { nanoid } from "nanoid";
import message$1 from "ant-design-vue/es/message";
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
      const meta = { label: config.label, ...item.meta };
      const _onClick = item.onClick;
      const _action = async (text, method) => {
        if (text) {
          return new Promise(
            (resolve) => Modal.confirm({
              title: text,
              okText: "确定",
              cancelText: "取消",
              ...globalProps.Modal,
              onOk: () => {
                resolve(method());
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
      vModels[name] = toRef(model.parent, field2);
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
  const cols = items.sort(({ sort = 1 }, { sort: b_sort = 1 }) => sort - b_sort);
  const modelsMap = /* @__PURE__ */ new Map();
  cols.forEach((child) => {
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
    const { children, propChain = [], rules } = model;
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
  for (const [key, value] of Object.entries(origin)) {
    if (Array.isArray(value)) {
      origin[key] = cloneDeep(initial[key]);
    } else if (Object.prototype.toString.call(value) === "[object Object]") {
      resetFields(value, initial[key]);
    } else {
      origin[key] = initial[key];
    }
  }
}
function setFieldsValue(origin, data) {
  mergeWith(origin, data, (objValue, srcValue, key, current) => {
    if (Array.isArray(objValue)) {
      return cloneDeep(srcValue);
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
const buildProps = (option, effectData, model) => {
  const valueProps = useVModel({ option, model, effectData });
  return { ...option.attrs, ...valueProps };
};
function getViewNode(option, model, slots) {
  const {
    type: colType = "",
    viewRender,
    render: render2,
    options: colOptions,
    dictName,
    labelField,
    keepField,
    valueToNumber,
    valueToLabel
  } = option;
  const __render = viewRender || colType === "InfoSlot" && render2;
  if (__render) {
    const slot = typeof __render === "string" ? slots[__render] : __render;
    return (effectData) => {
      const attrs = buildProps(option, effectData, model);
      return slot(reactive({ props: attrs, ...effectData }));
    };
  } else if (labelField) {
    return ({ current }) => current[labelField];
  } else if (keepField) {
    return ({ current, text }) => (text || "") + " - " + (current[labelField] || "");
  } else if (colOptions && typeof colOptions[0] === "string") {
    if (valueToLabel)
      return;
    return ({ text }) => colOptions[text];
  } else if (dictName || colOptions) {
    const options = ref();
    if (dictName && globalConfig.dictApi) {
      globalConfig.dictApi(dictName).then((data) => options.value = data);
    } else if (typeof colOptions === "function") {
      Promise.resolve(colOptions({})).then((data) => options.value = data);
    } else {
      options.value = unref(colOptions);
    }
    return ({ text }) => {
      const arr = Array.isArray(text) ? text : typeof text === "string" ? text.split(",") : [text];
      const labels = arr.map((val) => {
        var _a;
        const item = (_a = options.value) == null ? void 0 : _a.find(({ value }) => (valueToNumber ? Number(value) : value) === val);
        return item ? item.label : val;
      });
      return labels.join(",");
    };
  } else if (colType === "Switch") {
    return ({ text }) => (option.valueLabels || "否是")[text];
  } else if (colType === "Buttons") {
    const buttonsSlot = createButtons({ config: option, isView: true });
    return !!buttonsSlot && ((param) => buttonsSlot({ param }));
  } else if (colType === "Upload" || colType.startsWith("Ext")) {
    return (effectData) => {
      const attrs = buildProps(option, effectData, model);
      return h(Controls[colType], reactive({ option, effectData, ...attrs, isView: true }), slots);
    };
  } else
    ;
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
const _sfc_main$r = /* @__PURE__ */ defineComponent({
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
                      !icon || !unref(__config).iconOnly ? (openBlock(), createBlock(resolveDynamicComponent(() => unref(toNode)(label, unref(param))), { key: 1 })) : createCommentVNode("", true)
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
function createButtons({ config, methods, params, isView }) {
  const buttons = Array.isArray(config) ? { actions: config } : config;
  if (!buttons || isView && buttons.vaildIn === "form" || !isView && buttons.vaildIn === "detail")
    return;
  let actions = buttons.actions || [];
  if (!buttons.vaildIn) {
    buttons.actions = actions = actions.filter((item) => {
      if (typeof item === "string") {
        return !isView;
      } else {
        const vaildIn = item.vaildIn;
        if (isView) {
          return vaildIn === "both" || vaildIn === "detail";
        } else {
          return vaildIn !== "detail";
        }
      }
    });
  }
  if (actions.length === 0)
    return;
  return (props = {}) => h(_sfc_main$r, { config: buttons, methods, param: params, ...props });
}
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
    effectData: Object,
    disabled: [Boolean, Object]
  },
  setup(props, ctx) {
    const { type: parentType, attrs: parentAttrs, gutter = 16, subSpan } = props.option;
    const rowProps = { gutter, ...props.option.rowProps, ...ctx.attrs };
    const inheritOptions = inject("inheritOptions", { disabled: toRef(props, "disabled") });
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
          colProps.flex = "1";
      } else {
        defaults(colProps, { span: presetSpan }, globalProps.Col, { span: 8 });
      }
      const { parent, refData } = toRefs(subData);
      const effectData = getEffectData({
        ...props.effectData,
        current: parent.value === refData.value ? toRef(props.model, "parent") : parent,
        value: refData
      });
      const { attrs, hidden } = render({
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
      if (independent) {
        const inheritOptions2 = {
          disabled: attrs.disabled,
          subSpan: option.subSpan ?? presetSpan
        };
        node = () => h(DataProvider, { name: "inheritOptions", data: inheritOptions2 }, innerNode);
      }
      const isListFormItem = type === "InputList" && (labelSlot || label);
      if (isListFormItem || !independent && (option.field || !isBlock)) {
        const rules = computed(() => attrs.disabled.value ? void 0 : subData.rules);
        const formItemAttrs = mergeProps(globalProps.FormItem, option.formItemProps);
        const _label = labelSlot || label;
        const _slots = { default: innerNode };
        _label !== void 0 && (_slots.label = () => toNode(_label, effectData));
        node = () => h(base.FormItem, reactive({ ...formItemAttrs, name: subData.propChain, rules, colon: !!_label }), _slots);
      }
      const __isBlock = isBlock ?? (containers.includes(type) && !option.span);
      const alignStyle = align && `text-align: ${align}`;
      if (__isBlock) {
        currentGroup = void 0;
        nodes.push(
          () => !hidden.value && h("div", { class: "sup-form-section", style: alignStyle, key: idx, ...ctx.attrs }, node())
        );
      } else {
        if (type === "InputList") {
          currentGroup = void 0;
          colProps.span = option.span;
          colProps.flex = "auto";
        }
        if (!currentGroup) {
          nodes.push(currentGroup = []);
        }
        currentGroup.push(() => !hidden.value && h(Col, mergeProps({ style: alignStyle, key: idx }, colProps), node));
        if (option.isWrap || type === "InputList")
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
  const { default: _, ...slots } = rootSlots;
  if (option.slots) {
    Object.entries(option.slots).forEach(([key, value]) => {
      slots[key] = typeof value === "string" ? rootSlots[value] : value;
    });
  }
  const renderSlot = render2 ? typeof render2 === "function" ? render2 : slots[render2] : Controls[type];
  let node;
  if (type === "Text" || type === "InfoSlot") {
    node = renderSlot ? () => renderSlot({ props: attrs, ...effectData }) : () => h("span", attrs, model.refData);
  } else if (type === "Buttons") {
    node = () => h(_sfc_main$r, { config: option, param: effectData });
  } else if (containers.includes(type) || type === "InputList") {
    const viewProps = type === "Descriptions" && { isView: true, class: "sup-detail" };
    node = () => h(Controls[type], reactive({ option, model, effectData, ...attrs, ...viewProps }), slots);
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
      size,
      ...descriptionsProps
    } = {
      // bordered: true,
      size: "middle",
      ...gridConfig,
      ...__attrs,
      ...props.option.descriptionsProps
    };
    const presetSpan = subSpan ?? (column ? 24 / column : descriptionsProps.subSpan);
    const colNum = column || Math.floor(24 / presetSpan);
    const rowGroup = function() {
      const group = [];
      let current = [];
      let n = 0;
      props.items.forEach(({ option, span = presetSpan, label: label2, content: content2, hidden }, idx) => {
        let ceil = Number(span) ? Math.ceil(span / presetSpan) : 1;
        ceil = ceil > colNum ? colNum : ceil;
        const attrs = { ...descriptionsProps, ...option.formItemProps, ...option.descriptionsProps };
        const labelStyle = mergeProps(attrs.labelAlign ? { textAlign: attrs.labelAlign } : {}, attrs.labelStyle);
        const item = {
          labelCol: mergeProps({ style: labelStyle, class: { "sup-label-no-colon": attrs.noColon } }, attrs.labelCol),
          wrapperCol: mergeProps({ style: attrs.contentStyle }, attrs.wrapperCol),
          option,
          attrs,
          span,
          label: label2,
          content: content2,
          hidden,
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
        if (option.isBreak) {
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
    let colorStyle = "";
    borderColor && (colorStyle += `--descriptions-border-color:${borderColor};`);
    labelBgColor && (colorStyle += `--descriptions-bg-color:${labelBgColor};`);
    let content;
    if (mode === "table") {
      const rows = () => layout === "vertical" ? rowGroup.flatMap((group) => [
        (group.length > 1 || group[0].label) && h(
          "tr",
          { class: "ant-descriptions-row" },
          group.map(
            (item) => !unref(item.hidden) && h(
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
              (item) => !unref(item.hidden) && (group.length === 1 && !item.label ? [h("td", { colspan: item.colspan * 2 }, item.content())] : [
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
        )
      );
      content = () => h("table", {}, rows());
    } else {
      content = () => rowGroup.map(
        (group) => group.length === 1 && !group[0].label ? group[0].content() : h(
          Row,
          { class: "ant-descriptions-row", ...rowProps },
          () => group.map(
            (item) => !unref(item.hidden) && h(
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
                  () => !item.attrs.noInput && mode === "form" ? h("div", { class: "sup-descriptions-item-input" }, item.content()) : item.content()
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
          mode === "form" ? "sup-descriptions-mode-form" : mode === "table" ? "ant-descriptions-bordered" : "sup-descriptions-default",
          colon === false && "ant-descriptions-item-no-colon",
          size && size !== "default" && "ant-descriptions-" + size
        ]
      },
      content()
    );
  }
});
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
  const rootSlots = { ...inject("rootSlots", {}) };
  const columns = [];
  [..._models].forEach(([col, model]) => {
    if (col.type === "Hidden" || col.hideInTable || col.hidden === true)
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
        // ...globalProps.Column,
        ...col.columnProps,
        customRender: getViewNode(col, model, rootSlots)
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
      ...columnProps,
      customRender: render2
    }
  };
}
defineComponent({
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
    const { rowButtons } = option;
    const attrs = ctx.attrs;
    const rowKey = attrs.rowKey || "id";
    const orgList = toRef(model, "refData");
    const listData = model.listData;
    const actionColumn = buildActionSlot({ buttons: rowButtons, methods: {}, isView: true });
    const columns = useColumns({ childrenMap: listData.modelsMap, actionColumn });
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
  inheritAttrs: false,
  props: {
    option: { type: Object, required: true },
    modelsMap: {
      type: Object,
      required: true
    }
  },
  setup({ option, modelsMap }, ctx) {
    const formAttrs = inject("exaProvider", {}).attrs;
    const gridConfig = inject("gridConfig", formAttrs);
    const config = {
      ...globalProps.Descriptions,
      ...gridConfig,
      subSpan: option.subSpan,
      gutter: option.gutter,
      rowProps: option.rowProps,
      ...ctx.attrs,
      ...option.attrs,
      ...option.descriptionsProps
    };
    config.mode ?? (config.mode = config.bordered ? "table" : void 0);
    const rowProps = { ...globalProps.Row, gutter: config.gutter, ...config.rowProps };
    rowProps.gutter ?? (rowProps.gutter = 16);
    const presetSpan = config.subSpan ?? (config.subSpan = 12);
    const items = buildNodes(modelsMap, option, config);
    const nodeGroup = [];
    let current;
    let isRoot;
    items.forEach((item, idx) => {
      isRoot = isRoot || !item.option.type || item.option.type === "Discriptions";
      if (item.isBlock) {
        if (items.length === 1) {
          nodeGroup.push(item.node);
        } else {
          nodeGroup.push(() => !unref(item.hidden) && h("div", { class: "sup-form-section", key: idx }, item.node()));
        }
        current = void 0;
      } else {
        let colProps = item.option.colProps;
        if (!colProps) {
          colProps = { ...globalProps.Col };
          colProps.span = item.option.span ?? presetSpan ?? colProps.span ?? 8;
        }
        nodeGroup.push(current = []);
        current.push(() => !unref(item.hidden) && h(Col, { ...colProps, key: idx }, item.node));
      }
    });
    const content = () => h(
      DataProvider,
      { name: "gridConfig", data: config },
      () => nodeGroup.map((item, idx) => {
        if (Array.isArray(item)) {
          return h(Row, rowProps, () => item.map((node) => node()));
        } else {
          return item();
        }
      })
    );
    if (isRoot) {
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
  let currentGroup = [];
  const rootSlots = inject("rootSlots", {});
  [...modelsMap].forEach(([option, model], idx) => {
    var _a;
    const { type, label, labelSlot, attrs, span, hideInDescription } = option;
    if (type === "Hidden" || hideInDescription)
      return;
    const effectData = getEffectData({ current: toRef(model, "parent"), text: toRef(model, "refData") });
    const hidden = getComputedStatus(option.hidden, effectData);
    const __label = labelSlot || label;
    let isBlock = option.isBlock;
    let wrapNode;
    let node;
    if (model.children || model.listData) {
      const modelsMap2 = model.children || ((_a = model.listData) == null ? void 0 : _a.modelsMap);
      if (type === "InputGroup") {
        const contents = [...modelsMap2].map((ent) => getContent(...ent));
        node = {
          option,
          label: __label,
          span,
          hidden,
          content: () => contents.map((node2) => node2 == null ? void 0 : node2())
        };
      } else {
        isBlock ?? (isBlock = !option.span);
        const viewType = ["Tabs", "Collapse", "Card", "Table", "Group", "List", "InputList"].includes(type) ? type : "Group";
        const Control = Controls[viewType];
        wrapNode = () => h(Control, { option, model, effectData, isView: true, ...globalProps[viewType], ...attrs }, rootSlots);
        if (type === "InputList") {
          if (__label || config.mode !== "table") {
            isBlock = false;
            node = {
              option: { ...option, descriptionsProps: { noInput: true } },
              label: __label,
              span: 24,
              hidden,
              content: wrapNode
            };
          }
        }
      }
    } else {
      const content = getContent(option, model);
      node = content && {
        option,
        label: __label,
        span,
        hidden,
        content
      };
    }
    let blockNode;
    if (node) {
      if (isBlock) {
        const last = currentGroup.splice(-1)[0];
        const style2 = option.align && { textAlign: option.align };
        blockNode = { option: preOption, isBlock, node: () => h("div", { style: style2 }, last.content()) };
      } else {
        currentGroup.push(node);
      }
    } else if (wrapNode) {
      blockNode = { option, isBlock, node: wrapNode, hidden };
    }
    if (blockNode || idx === modelsMap.size - 1) {
      if (currentGroup == null ? void 0 : currentGroup.length) {
        const props = { option: preOption, items: currentGroup, effectData, class: config.class };
        nodes.push({ option: preOption, isBlock: true, node: () => h(Descriptions, props) });
        currentGroup = [];
      }
      blockNode && nodes.push(blockNode);
    }
  });
  return nodes;
}
function getContent(option, model) {
  const rootSlots = inject("rootSlots", {});
  const value = toRef(model, "refData");
  const effectData = getEffectData({ current: toRef(model, "parent"), value, text: value });
  const content = getViewNode(option, model, rootSlots);
  return content === false ? void 0 : () => !content ? effectData.text : content(effectData);
}
const _sfc_main$q = defineComponent({
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
const _sfc_main$p = defineComponent({
  props: {
    option: { type: Object, required: true },
    model: { type: Object, required: true },
    effectData: Object,
    disabled: Boolean,
    isView: Boolean
  },
  setup({ option, model, effectData, isView }, ctx) {
    const { type, label, title = label, buttons } = option;
    let buttonsSlot;
    if (buttons) {
      const _buttons = Array.isArray(buttons) ? { actions: buttons } : buttons;
      if (type === "Discriptions") {
        _buttons.vaildIn ?? (_buttons.vaildIn = "detail");
      }
      buttonsSlot = createButtons({ config: _buttons, params: effectData, isView });
    }
    const slots = {
      ...ctx.slots,
      title: title ? () => toNode(title, effectData) : void 0,
      actions: buttonsSlot,
      default: ctx.slots.innerContent || (isView ? () => h(DetailLayouts, { option, modelsMap: model.children }) : () => h(Collections, { option, model }))
    };
    const CustomComponent = option.component && toRaw(option.component);
    let titleButton, bottomButton;
    if (buttonsSlot) {
      if (buttons.placement === "bottom") {
        bottomButton = () => h("div", { class: "sup-bottom-buttons", style: { textAlign: buttons.align } }, buttonsSlot());
      } else {
        titleButton = () => h(Col, { class: "sup-title-buttons", flex: 1, style: { textAlign: buttons.align } }, buttonsSlot);
      }
    }
    if (CustomComponent) {
      return () => h(CustomComponent, {}, slots);
    } else {
      return () => h("div", {}, [
        (title || buttonsSlot) && h(Row, { align: "middle", class: "ant-descriptions-header" }, () => [
          h(Col, { class: "sup-title" }, slots.title),
          titleButton && titleButton()
        ]),
        slots.default(),
        bottomButton && bottomButton()
      ]);
    }
  }
});
const _sfc_main$o = {
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
    disabled: null,
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
        return setFieldsValue(modelData.value, data);
      },
      resetFields(defData = initialData) {
        var _a;
        resetFields(modelData.value, defData);
        (_a = formRef.value) == null ? void 0 : _a.clearValidate();
        const data = cloneDeep(modelData.value);
        emit("reset", data);
        return onReset ? onReset(data) : data;
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
    const rootSlots = inject("rootSlots", {});
    const { default: defaultSlot, ...__slots } = ctxSlots;
    Object.assign(rootSlots, __slots);
    provide("rootSlots", rootSlots);
    const slots = { ...__slots };
    if (option.slots) {
      Object.entries(option.slots).forEach(([key, value]) => {
        slots[key] = typeof value === "string" ? rootSlots[value] : value;
      });
    }
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
        ...slots,
        default: () => [
          h(Collections, {
            option,
            model: { refData: modelData, children: modelsMap },
            effectData,
            disabled: attrs.disabled
          }),
          defaultSlot == null ? void 0 : defaultSlot()
        ]
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
const Form = /* @__PURE__ */ _export_sfc(_sfc_main$o, [["__cssModules", cssModules]]);
const _sfc_main$n = defineComponent({
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
      extProps.style = "margin: 0";
    }
    const rules = computed(() => props.disabled ? void 0 : ruleObj);
    const formItemAttrs = mergeProps(globalProps.FormItem, option.formItemProps, extProps);
    return () => h(
      base.FormItem,
      { ...formItemAttrs, rules: rules.value, ref: formItemContext, name: _propChain },
      {
        label: () => toNode(labelSlot || label, props.effectData),
        default: () => h(FormItemRest, () => h(base.InputGroup, { compact, ...attrs }, () => h(Collections, { option, model })))
      }
    );
  }
});
const _sfc_main$m = defineComponent({
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
    const { columns, buttons: buttonsConfig, rowButtons, label, title = label, slots: optionSlots } = option;
    const { modelsMap: childrenMap, initialData, rules } = model.listData;
    const isSingle = columns.length === 1 && columns[0].field === "$index";
    const __initialData = isSingle ? initialData.$index : toRaw(initialData);
    const { propChain } = model;
    const orgList = toRef(model, "refData");
    const methods = {
      add() {
        orgList.value = orgList.value.concat(cloneDeep(__initialData));
      },
      delete: {
        hidden: () => orgList.value.length === 1,
        disabled: false,
        confirmText: void 0,
        onClick({ index }) {
          orgList.value = orgList.value.filter((_, idx) => idx === index);
        }
      }
    };
    let innerModels = childrenMap;
    const rowButtonsConfig = rowButtons && !isView && {
      type: "Buttons",
      buttonType: "link",
      size: "small",
      span: "auto",
      methods,
      ...Array.isArray(rowButtons) ? { actions: rowButtons } : rowButtons
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
          let children = /* @__PURE__ */ new Map();
          if (isSingle) {
            const itemOption = { ...columns[0] };
            option.label && !option.subSpan && !itemOption.span && (itemOption.span = "auto");
            if (typeof itemOption.label === "string" && labelIndex)
              itemOption.label += String(idx + 1);
            children.set(itemOption, {
              ...childrenMap.get(columns[0]),
              parent: orgList,
              refData,
              propChain: [...propChain, idx]
            });
          } else {
            const __children = cloneModels(innerModels, record, [...propChain, idx]).modelsMap;
            __children.forEach((model2, opt) => {
              const itemOption = { ...opt };
              !option.subSpan && !opt.span && (itemOption.span = "auto");
              if (typeof opt.label === "string" && labelIndex)
                itemOption.label += String(idx + 1);
              children.set(itemOption, model2);
            });
          }
          rowButtonsConfig && children.set(rowButtonsConfig, { parent: orgList, refData });
          return {
            model: { parent: orgList, refData, children },
            effectData: reactive({ ...effectData, current: orgList, index: idx, record: refData })
          };
        });
      },
      {
        immediate: true
      }
    );
    ({ ...ctx.slots });
    if (isView) {
      const attrs = {};
      const children = computed(() => {
        const children2 = /* @__PURE__ */ new Map();
        listItems.value.forEach(({ model: model2 }) => {
          if (isSingle) {
            model2.children.forEach((_model, opt) => children2.set(opt, _model));
          } else {
            let _option;
            model2.children.forEach((_model, opt) => {
              _option = opt;
              children2.set(opt, _model);
            });
            _option.isBreak = true;
            attrs.column = columns.length;
          }
        });
        return children2;
      });
      if (label) {
        attrs.mode = "text";
        attrs.class = "sup-descriptions-nest";
      }
      return () => h(DetailLayouts, { option, modelsMap: children.value, key: Date(), ...attrs });
    } else {
      return () => listItems.value.map(({ model: model2, effectData: effectData2 }, idx) => {
        return h(Collections, { model: model2, option, effectData: effectData2, key: model2 });
      });
    }
  }
});
const _sfc_main$l = /* @__PURE__ */ defineComponent({
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
      extra: () => buttons && !isView && h(_sfc_main$r, {
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
const _sfc_main$k = defineComponent({
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
        h(Col, { class: "sup-title" }, slots.title),
        h(Col, { class: "sup-title-buttons", flex: 1, style: { textAlign: buttonsConfig == null ? void 0 : buttonsConfig.align } }, extraSlot)
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
            isView ? h(DetailLayouts, { option, modelsMap: item.model.children, mode: "default", labelAlign: "right" }) : h(Collections, { model: item.model, option, class: "ant-list-item-meta" }),
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
const __default__ = {
  name: "ExTabs"
};
const _sfc_main$j = /* @__PURE__ */ defineComponent({
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
      const tabLabel = () => [useIcon(icon), toNode(label, effectData)];
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
        option: {
          ...option,
          type: "TabPane"
        },
        model
      };
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(Tabs2), {
        activeKey: activeKey.value,
        "onUpdate:activeKey": _cache[0] || (_cache[0] = ($event) => activeKey.value = $event)
      }, {
        rightExtra: withCtx(() => [!_ctx.isView && _ctx.option.buttons ? (openBlock(), createBlock(unref(_sfc_main$r), {
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
const _sfc_main$i = defineComponent({
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
    const formOption = reactive({
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
      ctx.slots
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
      return (props, ctx) => h(_sfc_main$i, { ...props, onRegister: register }, ctx == null ? void 0 : ctx.slots);
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
  if (buttons) {
    __config.footer = () => h(_sfc_main$r, { config: buttons, param: { modalRef } });
  }
  const onOk = () => {
    var _a;
    return Promise.resolve((_a = config.onOk) == null ? void 0 : _a.call(config)).then(() => {
      visible.value = false;
    }).catch((err) => console.error(err));
  };
  const isUnmounted = ref(false);
  onUnmounted(() => {
    isUnmounted.value = true;
  });
  const updateVisible = (val) => visible.value = val;
  const modalSlot = (props, ctx) => !isUnmounted.value && h(
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
      const vm = createVNode(modalSlot, { appContext: ins == null ? void 0 : ins.appContext });
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
function useModalForm({ title, ...option }, config = {}) {
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
    return editInfo.isEdit ? h(_sfc_main$r, {
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
    editButtonsSlot
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
  const detail = () => h(_sfc_main$q, { option, modelsMap, source });
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
  context.columns.forEach((item) => {
    defaults(item, option.columnProps, globalProps.Column);
  });
  context.methods.detail = buildDetail(option, childrenMap, rowKey);
  return context;
}
const _sfc_main$h = defineComponent({
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
    disabled: Boolean,
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
    const { list, columns, methods, modalSlot } = buildData({ option, listData, orgList, rowKey, listener, isView });
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
    const slots = { ...ctx.slots };
    const buttonsConfig = option.buttons;
    if (buttonsConfig) {
      const slotName = buttonsConfig.forSlot || "extra";
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
    const { title: titleSlot, extra: extraSlot, ...__slots } = slots;
    if (titleString || titleSlot || extraSlot) {
      __slots.title = () => h(Row, { align: "middle" }, () => [
        h(Col, { class: "sup-title" }, () => toNode(titleSlot || titleString, effectData)),
        extraSlot && h(Col, { class: "sup-title-buttons", flex: 1, style: { textAlign: buttonsConfig == null ? void 0 : buttonsConfig.align } }, extraSlot)
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
const _sfc_main$g = defineComponent({
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
const _sfc_main$f = /* @__PURE__ */ defineComponent({
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
                  collapsible: disabled.value ? "disabled" : void 0
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
                      option.buttons ? (openBlock(), createBlock(unref(_sfc_main$r), {
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
const _sfc_main$e = /* @__PURE__ */ defineComponent({
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
          unref(addonAfter) && !unref(option).enterButton && !_ctx.onSearch ? (openBlock(), createBlock(resolveDynamicComponent(unref(toNode)(unref(addonAfter))), { key: 0 })) : createCommentVNode("", true),
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
              unref(addonAfter) ? (openBlock(), createBlock(resolveDynamicComponent(unref(toNode)(unref(addonAfter))), { key: 0 })) : (openBlock(), createBlock(unref(SearchOutlined), { key: 1 }))
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
const _sfc_main$d = /* @__PURE__ */ defineComponent({
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
const _sfc_main$c = /* @__PURE__ */ defineComponent({
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
const _sfc_main$b = defineComponent({
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
const _sfc_main$a = defineComponent({
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
const _sfc_main$9 = defineComponent({
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
const _sfc_main$8 = defineComponent({
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
const _sfc_main$7 = defineComponent({
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
  setup(props) {
    const { optionsRef } = useOptions(props.option, props.options, props.effectData);
    return () => h(CheckboxGroup, { options: optionsRef.value, name: props.option.field });
  }
});
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
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
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
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
  const slot = () => !isUnmounted.value && h(_sfc_main$4, __config);
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
const _sfc_main$3 = defineComponent({
  props: {
    option: { type: Object, required: true },
    model: Object,
    effectData: Object,
    value: [String, Array],
    fileList: Array,
    /** 指定文件信息字段 */
    infoNames: Object,
    //TODO apis 可从全局配置， 当前配置为字符串时，作为url参数传到全局api方法
    customRequest: Function,
    minSize: Number,
    maxSize: Number,
    isSingle: Boolean,
    maxCount: Number,
    uploadMode: String,
    tip: String,
    title: String,
    repeatable: Boolean,
    isView: Boolean,
    disabled: Boolean,
    isImageUrl: Function,
    beforeUpload: Function,
    onPreview: Function,
    onRemove: Function,
    apis: Object
  },
  emits: ["update:value", "update:fileList"],
  setup(props, ctx) {
    const {
      uploadMode: mode = "auto",
      apis = {},
      minSize,
      maxSize,
      maxCount,
      infoNames,
      repeatable,
      onPreview,
      isImageUrl = fileIsImage
    } = { ...globalProps.Upload, ...props };
    const { accept, listType } = ctx.attrs;
    const { label, vModelFields = {} } = props.option;
    const preview = usePreview();
    let valueField = "uid";
    let nameMap = [];
    const __names = { uid: "uid", status: "status", url: "url", name: "name", ...infoNames };
    if (mode === "custom")
      __names.originFileObj = "";
    Object.entries(__names).map(([key, value]) => {
      const { name = key, isValue } = typeof value === "object" ? value : { name: value };
      if (isValue) {
        valueField = key;
      }
      nameMap.push([key, name]);
    });
    const convertInfo = (info) => {
      const __info = { status: "done", ...info };
      nameMap.forEach(([key, name]) => {
        if (name && name !== key) {
          __info[key] = __info[name];
          delete __info[name];
        }
      });
      return __info;
    };
    const reconvert = (info) => {
      const __info = {};
      nameMap.forEach(([key, name]) => {
        const value = info[key];
        if (name && value !== void 0)
          __info[name] = value;
      });
      return __info;
    };
    const valueIsFileList = props.option.field === vModelFields.fileList;
    ref([]);
    const { onSubmit } = inject("exaProvider", {});
    const innerFileList = ref([]);
    const outFileList = shallowRef([]);
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
      if (valueIsFileList) {
        ctx.emit("update:value", outFileList.value);
      } else {
        ctx.emit(
          "update:value",
          innerFileList.value.map((item) => item[valueField])
        );
      }
    };
    watch(
      () => toRaw(props.fileList),
      (list) => {
        if (!list) {
          updateFileList([]);
        } else if (list !== outFileList.value) {
          const fileList = list.map(convertInfo);
          updateFileList(fileList);
        }
      },
      { immediate: true }
    );
    const isLoading = ref(true);
    const openModal = (onOk) => {
      return Modal.info({
        title: () => " 文件上传中，请稍候...",
        okText: null,
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
            const error = item.response || { message: "文件上传错误！" };
            stack = Promise.reject(error);
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
      if (isLoading.value) {
        const modal = openModal();
        return stack.then((data) => {
          modal == null ? void 0 : modal.destroy();
          return data;
        }).catch((err) => {
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
        if (maxCount) {
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
    };
    function handleChange({ file, fileList, event }) {
      if (file.status === "removed") {
        tasks.delete(file.uid);
        waitingTasks.delete(file.uid);
      } else if (mode !== "auto" && !event && file.status === "uploading") {
        file.status = "waiting";
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
        onError(error);
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
    const remove = async (file) => {
      var _a;
      let result = await ((_a = props.onRemove) == null ? void 0 : _a.call(props, file));
      if (apis.delete) {
        return new Promise((resolve) => {
          Modal.confirm({
            title: "确定删除吗？",
            okText: "确定",
            cancelText: "取消",
            ...globalProps.Modal,
            onOk() {
              resolve(apis.delete(file));
            },
            onCancel() {
              resolve(false);
            }
          });
        });
      }
      return result;
    };
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
          return item.url || item.thumbUrl;
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
    const title = "上传文件";
    const tips = [];
    accept && tips.push("支持文件格式：" + accept);
    maxSize && tips.push("单个文件不超过" + maxSize + "MB");
    const tip = props.tip || tips.join(", ");
    const slots = {};
    if (listType === "picture-card") {
      slots.default = () => props.title ? toNode(props.title) : h("div", [h(PlusOutlined), h("div", { style: "margin-top:8px" }, title)]);
    } else {
      slots.default = () => [
        h(base.Button, {}, () => props.title ? toNode(props.title) : [h(UploadOutlined), title]),
        tip && h("div", { class: "sup-upload-tip" }, tip)
      ];
    }
    const isView = computed(() => props.disabled || props.isView);
    return () => isView.value && outFileList.value.length === 0 ? h("div", { class: "sup-upload-tip" }, "暂无附件") : h(
      base.Upload,
      {
        ...globalProps.Upload,
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
        iconRender
      },
      {
        default: isView.value ? null : slots.default
      }
    );
  }
});
const components = {
  Form,
  Group: _sfc_main$p,
  Card: _sfc_main$l,
  List: _sfc_main$k,
  Tabs: _sfc_main$j,
  Table: _sfc_main$h,
  Collapse: _sfc_main$f,
  Descriptions: _sfc_main$p
};
const formItems = {
  Textarea: _sfc_main$g,
  Input: _sfc_main$e,
  InputNumber: _sfc_main$d,
  InputGroup: _sfc_main$n,
  InputList: _sfc_main$m,
  Select: _sfc_main$c,
  Switch: _sfc_main$b,
  DateRange: _sfc_main$a,
  DatePicker: _sfc_main$9,
  TimePicker: _sfc_main$8,
  Radio: _sfc_main$7,
  Checkbox: _sfc_main$6,
  TreeSelect: _sfc_main$5,
  Upload: _sfc_main$3
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
  const actions = buttonsConfig.actions || ["submit", "reset"];
  if (actions == null ? void 0 : actions.length) {
    formOption.subItems.push({
      type: "InfoSlot",
      align: "right",
      span: "auto",
      render: () => h(_sfc_main$r, {
        config: { ...buttonsConfig, actions, methods: defaultAction },
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
    option: Object
  },
  emits: ["register", "change"],
  setup(props, ctx) {
    const dataRef = ref(props.dataSource || []);
    const wrapRef = ref();
    const option = reactive(props.option || {});
    const { style: style2, class: ctxClass, ...ctxAttrs } = ctx.attrs;
    merge(option, { attrs: mergeProps(option.attrs, ctxAttrs) });
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
    const windowResize = new AbortController();
    onUnmounted(() => {
      windowResize.abort();
    });
    provide("rootSlots", ctx.slots);
    const slots = { ...ctx.slots };
    const unWatch = watch(
      option,
      (opt) => {
        if (!(opt == null ? void 0 : opt.columns))
          return;
        if (tableAttrs.model) {
          unWatch();
          return;
        }
        const { columns, searchSechma, beforeSearch, maxHeight, isScanHeight = true, inheritHeight } = opt;
        const listData = buildModelsMap(columns);
        const effectData = reactive({ formData: dataRef, current: dataRef });
        const model = reactive({
          refData: dataRef,
          listData
        });
        if (option.slots) {
          Object.entries(option.slots).forEach(([key, value]) => {
            slots[key] = typeof value === "string" ? ctx.slots[value] : value;
          });
        }
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
          const { getScrollRef, redoHeight } = useTableScroll(option, dataRef, wrapRef, windowResize);
          tableAttrs.scroll = getScrollRef;
          const handleTableChange = tableAttrs.onChange;
          tableAttrs.onChange = (param) => {
            !loading.value && redoHeight();
            handleTableChange == null ? void 0 : handleTableChange(param);
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
          h("div", { class: "sup-form-section section-last" }, h(Controls.Table, tableAttrs, ctx.slots))
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
        h(Controls.Table, tableAttrs, slots)
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
    return () => h(_sfc_main$r, { config: { ...props, actions } });
  }
});
function useButtons(config) {
  const vNode = () => h(_sfc_main$r, { config });
  return [vNode];
}
const _sfc_main = defineComponent({
  name: "SuperTable",
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
      h(DetailLayouts, { option: { type: "Discriptions", ...option }, modelsMap: modelsMap.value })
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
function defineDetail(option) {
  return option;
}
export {
  _sfc_main$1 as SuperButtons,
  _sfc_main as SuperDetail,
  _sfc_main$i as SuperForm,
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
