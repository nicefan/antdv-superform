import { defineComponent as Y, reactive as B, provide as Ne, h as k, toRef as oe, inject as be, mergeProps as ne, unref as W, toRefs as Be, toRaw as Z, computed as N, watch as H, shallowRef as Ie, ref as T, shallowReactive as gt, onMounted as Ft, toValue as le, getCurrentInstance as gn, onUnmounted as $t, isRef as ze, onScopeDispose as oo, markRaw as ao, watchEffect as $e, openBlock as ke, createBlock as Qe, resolveDynamicComponent as rt, readonly as yn, onBeforeUnmount as Vt, nextTick as De, createVNode as wn, render as Et, createElementBlock as yt, Fragment as Pt, renderList as Sn, toDisplayString as ro, cloneVNode as Cn, Teleport as lo, useSlots as so } from "vue";
import { defaults as Le, get as Oe, set as ut, isFunction as et, isArray as io, merge as pt, isPlainObject as je, cloneDeep as Ve, isNumber as Ge, update as uo, uniq as co, mergeWith as fo, ElButton as lt, ElDescriptions as po, ElDescriptionsItem as vo, ElTabs as _n, ElTabPane as xn, ElCollapse as mo, ElCollapseItem as bo, ElTable as ho, ElTableColumn as Gt, ElPagination as go, ElCard as An, ElDivider as yo, ElSpace as kn, ElTooltip as In, ElUpload as wo, ElForm as So, ElFormItem as Co, ElRow as _o, ElCol as xo, ElTag as Ao, ElCheckTag as ko, ElEmpty as Io, ElDialog as Do, ElImageViewer as Oo, ElMessage as Mo, ElMessageBox as ot, mapKeys as Eo, throttle as Po, omit as Ro, debounce as jo, camelCase as To, ElInput as bt, ElInputNumber as Fo, ElInputOtp as $o, ElInputTag as Vo, ElAutocomplete as No, ElMention as Bo, ElSelect as Lo, ElSelectV2 as qo, ElCascader as Uo, ElTreeSelect as zo, ElRadio as Ko, ElRadioGroup as Ho, ElCheckbox as Go, ElCheckboxGroup as Wo, ElSwitch as Yo, ElDatePicker as Wt, ElTimePicker as Yt, ElTimeSelect as Qo, ElColorPicker as Xo, ElRate as Zo, ElSlider as Jo, ElSegmented as ea, ElTransfer as ta } from "./element-plus.js";
let Xe = (e = 21) => crypto.getRandomValues(new Uint8Array(e)).reduce((t, n) => (n &= 63, n < 36 ? t += n.toString(36) : n < 62 ? t += (n - 26).toString(36).toUpperCase() : n > 62 ? t += "-" : t += "_", t), "");
const Dn = [
  "Form",
  "Group",
  "Card",
  "CardList",
  "TabList",
  "CollapseList",
  "GroupList",
  "Tabs",
  "Table",
  "Collapse",
  "Descriptions",
  "Fragment",
  "Buttons",
  "Hidden",
  "InputSlot",
  "InfoSlot",
  "Text",
  "HTML",
  "Upload",
  "InputGroup",
  "InputList",
  "TagInput",
  "TagSelect"
], On = new Set(Dn);
function Qt(e) {
  const t = () => k("div", e.contentAttrs, [e.content()]);
  if (e.component)
    return k(
      e.component,
      {},
      {
        ...e.slots,
        title: e.title,
        actions: e.extra,
        default: t
      }
    );
  const n = e.extraPlacement === "bottom";
  return k("div", ne(e.attrs || {}, { class: "sup-group" }), [
    (e.title || !n && e.extra) && k(
      "div",
      {
        class: "sup-titlebar",
        style: { display: "flex", alignItems: "center" }
      },
      [
        e.title && k("div", { class: "sup-title" }, [e.title()]),
        !n && e.extra && k(
          "div",
          {
            class: "sup-title-buttons",
            style: { flex: 1, textAlign: e.extraAlign }
          },
          [e.extra()]
        )
      ]
    ),
    t(),
    n && e.extra && k(
      "div",
      {
        class: "sup-bottom-buttons",
        style: { textAlign: e.extraAlign }
      },
      [e.extra()]
    )
  ]);
}
const na = /* @__PURE__ */ new Set(["group", "card", "tabs", "collapse", "descriptions"]);
function Mn(e = {}) {
  return Nt(Object.fromEntries(Object.entries(e).map(([t, n]) => [t, { render: n }]))).render;
}
function Nt(e = {}) {
  const t = {}, n = { render: t };
  for (const o of Object.keys(e)) {
    const r = e[o];
    if (!r)
      continue;
    r.service && Object.assign(n, { [o]: r.service }), r.schemaDefaults && (n.defaults = { ...r.schemaDefaults });
    const { defaults: a, adaptProps: l } = r, s = na.has(o), i = r.render, m = r.component;
    Object.assign(t, {
      [o]: (f = {}, b = {}) => {
        const v = s ? f.attrs || {} : f, h = {
          type: o,
          attrs: a ? { ...a, ...v } : v,
          state: f,
          slots: s && f.slots || b
        };
        return l && (h.attrs = l(h.attrs, h)), s && (h.state = { ...f, attrs: h.attrs, slots: h.slots }), i ? i(h) : k(m, h.attrs, h.slots);
      }
    });
  }
  return n;
}
const En = /* @__PURE__ */ new Map(), Pn = /* @__PURE__ */ new Map(), st = /* @__PURE__ */ new Map();
function Rn(e, t = "manual") {
  const n = t === "manual" ? En : Pn;
  Object.entries(e).forEach(([o, r]) => {
    r && n.set(o, r);
  });
}
function Bt(e) {
  var t;
  const n = Ke();
  if (!n.supportedFields.includes(e))
    return;
  const o = ((t = n.fieldSources) == null ? void 0 : t[e]) ?? e, r = [
    o,
    ...Object.keys(n.fieldSources || {}).filter(
      (a) => {
        var l;
        return a !== o && ((l = n.fieldSources) == null ? void 0 : l[a]) === o;
      }
    )
  ];
  return st.get(o) ?? r.map((a) => En.get(a)).find(Boolean) ?? r.map((a) => Pn.get(a)).find(Boolean);
}
function oa(e) {
  var t;
  const n = st.get(e);
  if (n)
    return n;
  const o = Bt(e);
  if (!o)
    throw new Error(
      `UIAdapter '${Ke().name}' 支持字段 '${e}'，但组件 '${e}' 尚未注册；请启用自动导入插件，或在 superForm.initialize({ components }) 中提供`
    );
  const r = ((t = Ke().fieldSources) == null ? void 0 : t[e]) ?? e;
  return st.set(r, o), st.set(e, o), o;
}
function jn(e) {
  const t = st.get(e);
  if (!t)
    throw new Error(`原始 UI 组件 '${e}' 尚未加载`);
  return t;
}
let We;
function aa(e) {
  if (!("uiComponents" in e))
    return e;
  const { uiComponents: t, ...n } = e, o = Nt(t);
  return { ...n, ...o, render: { ...o.render, ...Mn(e.render) } };
}
function Ke() {
  if (!We)
    throw new Error(
      "SuperForm 尚未初始化 UIAdapter；官方产品请先调用 superForm.initialize()，独立 Core 请调用 superForm.useAdapter(adapter)"
    );
  return We;
}
function Xt(e) {
  if (We) {
    if (We !== e)
      throw new Error(`UIAdapter 已初始化为 '${We.name}'，不能切换为 '${e.name}'`);
    return;
  }
  We = e, Rn(e.fieldComponents || {}, "manual");
}
function Tn(e, t = {}) {
  const { uiComponents: n, ...o } = t, r = Nt(n);
  return {
    ...e,
    ...r,
    ...o,
    defaults: { ...e.defaults, ...r.defaults },
    render: { ...e.render, ...r.render, ...Mn(t.render) }
  };
}
const Zt = {};
function z(e) {
  const t = Zt[e];
  if (t)
    return t;
  const n = Ke();
  let o = n.render[e];
  if (e === "group") {
    const r = n.render.group || Qt;
    o = (a) => a.component ? Qt(a) : r(a);
  } else
    e === "compactSpace" && (o || (o = n.render.space));
  if (!o)
    throw new Error(`UIAdapter '${n.name}' 未提供 render.${e}`);
  return Zt[e] = o, o;
}
function de(e) {
  const t = Ke(), n = t[e];
  if (!n)
    throw new Error(`UIAdapter '${t.name}' 未提供 ${e} 协议`);
  return n;
}
const Fn = {
  type: { type: String, required: !0 },
  option: { type: Object, required: !0 },
  model: { type: Object, required: !0 },
  effectData: { type: Object, required: !0 },
  binding: { type: Object, required: !0 },
  state: { type: Object, required: !0 },
  attrs: { type: Object, required: !0 }
};
function ra(e, t) {
  return (...n) => {
    const o = e(...n);
    for (const r of Array.isArray(t) ? t : [t])
      typeof r == "function" && r !== e && r(...n);
    return o;
  };
}
function Lt({ prop: e = "value", event: t = "update:value" } = {}, n) {
  const o = t.startsWith("on") ? t : `on${t[0].toUpperCase()}${t.slice(1)}`;
  return (r, a) => {
    const l = { ...n ? n(r, a) : r }, { binding: s, state: i, option: m, effectData: f } = a;
    i.disabled !== void 0 && (l.disabled = i.disabled), m.disabledDate !== void 0 && (l.disabledDate = (...b) => m.disabledDate(f, ...b));
    for (const [b, v] of Object.entries(s)) {
      if (m.labelField && (b === "labelValue" || b === "onUpdate:labelValue"))
        continue;
      const h = b === "value" ? e : b === "onUpdate:value" ? o : b;
      l[h] = b.startsWith("onUpdate:") && typeof v == "function" ? ra(v, l[h]) : v;
    }
    return l;
  };
}
function la(e, t) {
  return Object.fromEntries(
    Object.entries(e).map(([n, { model: o, ...r }]) => [
      n,
      {
        ...r,
        // 两条渲染路径共用绑定和属性转换，扩展渲染不能再次合成原生事件。
        adaptProps: Lt(o ?? t, r.adaptProps)
      }
    ])
  );
}
const Jt = /* @__PURE__ */ new Map(), sa = Lt();
function $n(e) {
  var t, n;
  const o = Jt.get(e);
  if (o)
    return o;
  const r = Ke();
  if (!r.supportedFields.includes(e))
    return;
  const a = (t = r.fields) == null ? void 0 : t[e], l = (a == null ? void 0 : a.component) ?? (a != null && a.render && !Bt(e) ? void 0 : oa(e)), s = (a == null ? void 0 : a.adaptProps) ?? r.adaptFieldProps ?? sa, i = (n = a == null ? void 0 : a.processors) != null && n.some((f) => ["options", "picker", "range"].includes(f)) ? "请选择" : "请输入", m = {
    ...a,
    type: e,
    component: l,
    render(f) {
      var b;
      const v = Object.assign(s(f.attrs, f), a == null ? void 0 : a.fixedProps), h = ((b = a == null ? void 0 : a.adaptSlots) == null ? void 0 : b.call(a, f.slots, f)) ?? f.slots;
      return a != null && a.render ? a.render({ ...f, attrs: v, slots: h }) : k(l, v, h);
    },
    // 只缓存提示前缀，label 按当前字段读取，避免同类型字段串用提示文案。
    // defaults/attrs 的 class/style 按 Vue 规则合并；fixedProps 最后直接覆盖，不能被用户配置改写。
    getAttrs: (f, b, v = {}) => Object.assign(
      ne(
        { placeholder: v.placeholder ?? `${i}${b.label ?? ""}` },
        (a == null ? void 0 : a.defaults) ?? {},
        f,
        // 两套 UI 均接收标准 options；只在专项结果存在时覆盖，空数组也有效。
        v.options === void 0 ? {} : { options: v.options }
      ),
      a == null ? void 0 : a.fixedProps
    ),
    adaptProps: s
  };
  return Jt.set(e, m), m;
}
function me(e) {
  var t, n;
  return (n = (t = de("icons").semantic) == null ? void 0 : t[e]) == null ? void 0 : n.call(t);
}
function _e(e) {
  const t = be("exaProvider", {}).data;
  return B({ ...e || {}, formData: t });
}
function en(e, t) {
  const n = T(ze(e) ? e : !!e);
  return typeof e == "function" && $e(() => {
    n.value = e(t);
  }), n;
}
function Rt(e, t) {
  const n = B({});
  return e && $e(() => {
    Object.assign(n, e(t));
  }), n;
}
function ia(e = {}, t) {
  const n = {};
  return Object.keys(e).forEach((o) => {
    !e[o] || o === "onUpdate" || (o.match(/^on[A-Z]/) ? n[o] = (...r) => e[o](t, ...r) : o === "on" && Object.entries(e.on).forEach(([r, a]) => {
      const l = "on" + r.charAt(0).toUpperCase() + r.slice(1);
      n[l] = (...s) => a(t, ...s);
    }));
  }), n;
}
function qt({ option: e, model: t, effectData: n }, o) {
  const {
    field: r,
    endField: a,
    labelField: l,
    stringifyValue: s,
    computed: i,
    value: m,
    onUpdate: f
  } = e, b = {}, v = e.vModelFields || {};
  if (l && (b.labelValue = N(() => Oe(t.parent, l)), b["onUpdate:labelValue"] = (u) => {
    const c = s ? u == null ? void 0 : u.toString() : u;
    ut(t.parent, l, c);
  }), Object.entries(v).forEach(([u, c]) => {
    var g;
    typeof c == "string" ? ((g = t.parent)[c] ?? (g[c] = void 0), b[u] = N(() => Oe(t.parent, c)), b[`onUpdate:${u}`] = (S) => {
      ut(t.parent, c, S);
    }) : ze(c) ? (b[u] = c, b[`onUpdate:${u}`] = (S) => c.value = S) : b[u] = c;
  }), !r)
    return ze(m) && Object.assign(b, {
      value: m,
      "onUpdate:value": (u) => m.value = u
    }), b;
  o !== void 0 && (t.refData ?? (t.refData = le(o)));
  const h = oe(t, "refData"), y = T(), w = (u = le(o)) => {
    y.value = u, h.value !== u && o !== void 0 && (h.value = u);
  };
  Object.assign(b, {
    value: y,
    "onUpdate:value": w
  }), ze(m) && (H(h, (u) => m.value = u), H(m, w));
  let d = le(t.refData), p;
  if (a)
    y.value = [h.value, t.parent[a]], p = (u) => {
      const [c, g] = u || [];
      h.value = c, d = c, t.parent[a] = g;
    }, H([h, () => t.parent[a]], (u) => {
      y.value = u;
    });
  else if (s) {
    const u = (c) => (c == null ? void 0 : c.toString().split(",")) || [];
    y.value = u(h.value), p = (c) => {
      const g = (c == null ? void 0 : c.toString()) || "";
      h.value = g, d = g;
    }, H(h, (c) => {
      c !== d && (y.value = u(c));
    });
  } else
    y.value = d, p = (u) => {
      h.value = u, d = u;
    }, H(h, w);
  return H(y, p, { flush: "sync" }), f && H(h, () => f(n)), i && H(
    // 使用ref让计算结果即使一样也会进行后面的赋值
    () => T(i(d, n)),
    (u) => p(W(u)),
    { immediate: !0 }
  ), b;
}
function Ce({ option: e, effectData: t, inheritDisabled: n }) {
  const { type: o, dynamicAttrs: r, disabled: a, hidden: l, required: s } = e, i = en(l, t), m = en(s, t), f = n === void 0 && a === void 0 ? void 0 : N(() => {
    let d = le(n);
    if (!(!d && a === void 0))
      return d || (typeof a == "function" ? d = !!a(t) : d = le(a)), d;
  }), b = ia(e, t), v = typeof r == "function" ? { ...Be(Rt(r, t)) } : {}, h = ne({ ...Q[o] }, { ...e.attrs }, b, v), y = pt({}, e.attrs, h);
  return { attrs: { ...y, ...f && {
    disabled: N(() => f.value ?? le(y.disabled))
  } }, nativeAttrs: y, disabled: f, hidden: i, required: m };
}
function tn(e, t = {}) {
  const n = new RegExp("{(\\w*)}", "g");
  return e.replace(n, (o, r) => t[r] || "");
}
const nn = {
  email: {
    type: "email",
    message: "请输入正确的邮箱地址"
  },
  integer: {
    type: "integer",
    message: "{label}必须为整数",
    pattern: /^[+]{0,1}(\d+)$/,
    transform: (e) => Number(e)
  },
  number: {
    type: "number",
    message: "{label}必须为数字",
    transform: (e) => Number(e)
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
}, on = {
  string: {
    len: "{label}长度必须等于{len}",
    max: "{label}长度不能超过{max}",
    min: "{label}长度至少为{min}",
    range: "{label}长度必须{min}至{max}之间"
  },
  number: {
    len: "{label}需等于{len}",
    max: "{label}需小于{max}",
    min: "{label}需大于{min}",
    range: "{label}需在{min}至{max}之间"
  }
};
function ua(e, t, n, o) {
  let r;
  if (t)
    r = { type: e, len: t, message: "len" };
  else if (Ge(n) && Ge(o))
    r = { type: e, max: n, min: o, message: "range" };
  else if (Ge(n))
    r = { type: e, max: n, message: "max" };
  else if (Ge(o))
    r = { type: e, min: o, message: "min" };
  else
    return !1;
  return e === "number" ? (r.message = on.number[r.message], r.transform = (a) => Number(a)) : r.message = on.string[r.message], r;
}
function ca(e, t = "") {
  const { trigger: n, required: o, type: r = "string", len: a, max: l, min: s, pattern: i, validator: m, message: f } = e || {}, b = [];
  o && (r === "string" || r in nn ? b.push({
    required: o,
    trigger: n,
    // validator: noEmpty,
    pattern: /^[\s\S]*.*[^\s][\s\S]*$/,
    // transform: (value) => value + '',
    // whitespace: true,
    message: f || `${t}不能为空！`
  }) : b.push({ required: o, trigger: n, message: f || `${t}不能为空！` }));
  const v = nn[r];
  if (v) {
    const h = tn(v.message, { label: t });
    b.push({ ...v, trigger: n, message: h });
  }
  if (i && b.push({ pattern: i, trigger: n, message: f }), a || Ge(l) || Ge(s)) {
    const h = ua(r, a, l, s), y = tn(h.message, { label: t, len: a, max: l, min: s });
    b.push({ ...h, trigger: n, message: y, type: r });
  }
  return m && b.push({ validator: m, trigger: n }), b;
}
function Vn(e, t, n) {
  const { field: o, columns: r, subItems: a, initialValue: l, value: s } = e, i = e.endField ?? e.labelField, m = o ? o.split(".") : [], f = n.concat(m), b = m.splice(-1)[0], v = B({
    refName: b,
    initialValue: l,
    fieldName: o,
    origin: t,
    parent: t,
    refData: t,
    propChain: f
  });
  return b ? (m.length && (v.parent = N(() => Oe(t.value, m))), v.refData = N({
    get: () => Oe(t.value, o),
    set: (h) => ut(t.value, o, h)
  }), H(
    t,
    () => {
      v.refData ?? (v.refData = le(l) ?? le(s) ?? (r && [] || a && {})), i && uo(v.parent, i, (h) => h);
    },
    { immediate: !0, flush: "sync" }
  )) : s && (v.refData = T(s), v.propChain = []), v;
}
const ct = (e, t) => e == null ? void 0 : e.map((n) => n.validator ? { ...n, validator: async (r, ...a) => {
  const l = await n.validator({ ...r, ...t }, ...a);
  if (l === !1 || l instanceof Error)
    throw l;
} } : n);
function Ze(e, t, n = []) {
  const o = oe(t || {}), r = {}, a = /* @__PURE__ */ new Map();
  return e.forEach((l) => {
    if (typeof l != "object")
      return;
    const s = Vn(l, o, n), { required: i, label: m, subItems: f, columns: b } = l;
    if (l.rules || i) {
      const v = l.rules || [], h = Array.isArray(v) ? v : [v];
      if (i) {
        const w = h[0];
        w ? w.required = i : h.push({ required: i });
      }
      let y = "string";
      if (s.refData) {
        const w = typeof s.refData;
        y = w === "object" && Array.isArray(s.refData) ? "array" : w;
      }
      s.rules = h.map((w) => ca({ type: y, ...w }, m)).flat(), s.propChain.length && (r[s.propChain.join(".")] = s.rules);
    }
    if (f) {
      const v = Ze(f, oe(s, "refData"), s.propChain);
      Object.assign(r, v.rules), s.children = v.modelsMap;
    } else
      b && (s.listData = Ze(b));
    a.set(ao(l), s);
  }), {
    rules: r,
    modelsMap: a
  };
}
function dt(e, t, n) {
  const o = e.propChain;
  if (e.index === n && o.length === t.length && o.every((a, l) => a === t[l]))
    return;
  const r = (a) => {
    var l, s;
    (l = a.propChain) != null && l.length && o.every((i, m) => a.propChain[m] === i) && (a.propChain = [...t, ...a.propChain.slice(o.length)]), a.index !== void 0 && (a.index = n), (s = a.children) == null || s.forEach(r);
  };
  r(e);
}
function He(e, t, n = [], o) {
  const r = oe(t || {}), a = {}, l = [...e].map(([s, i]) => {
    const { children: m, rules: f, listData: b } = i, v = o !== void 0 ? [...n, o] : n, h = Vn(s, r, v);
    if (o !== void 0 && (h.index = o), h.rules = f, h.propChain.length && f && (a[h.propChain.join(".")] = f), m) {
      const { modelsMap: y, rules: w } = He(m, oe(h, "refData"), h.propChain);
      Object.assign(a, w), h.children = y;
    }
    return b && (h.listData = b), [s, h];
  });
  return { modelsMap: new Map(l), rules: a };
}
function Nn(e, t, n, o) {
  const { modelsMap: r, rules: a } = He(e, t, n, o), l = [];
  return function s(i) {
    for (const [m, f] of i)
      l.push([m, f]), f.children && s(f.children);
  }(r), { modelsMap: new Map(l), rootModels: r, rules: a };
}
const da = (e, t) => Object.prototype.hasOwnProperty.call(e, t);
function Bn(e, t = {}, n = {}) {
  for (const [o, r] of Object.entries(e))
    Array.isArray(r) ? e[o] = Ve((t == null ? void 0 : t[o]) ?? (n == null ? void 0 : n[o])) : Object.prototype.toString.call(r) === "[object Object]" ? Bn(r, t == null ? void 0 : t[o], n == null ? void 0 : n[o]) : e[o] = (t == null ? void 0 : t[o]) ?? (n == null ? void 0 : n[o]);
}
function Ln(e, t, n = {}) {
  for (const [o, r] of Object.entries(e)) {
    if (!da(t, o))
      continue;
    const a = t[o] ?? (n == null ? void 0 : n[o]);
    je(r) && je(a) ? Ln(r, a, n == null ? void 0 : n[o]) : Array.isArray(a) || je(a) ? e[o] = Ve(a) : e[o] = a;
  }
}
function an() {
  let e;
  return { promise: new Promise((n) => {
    e = n;
  }), resolve: e };
}
function qn() {
  const e = T();
  let t = an(), n = !0;
  return H(e, (r) => {
    r ? (t.resolve(!0), n = !1) : n || (t = an(), n = !0);
  }), [e, () => t.promise.then(() => e.value)];
}
function ee(e, t = {}) {
  return e ? typeof e == "function" ? e(t || {}, {}) : typeof e != "object" ? k("span", e) : k(e, { effectData: t }) : null;
}
const se = {
  tagViewer: ["pink", "red", "orange", "green", "cyan", "blue", "purple"]
};
function tt(e, t, n) {
  const o = n || be("rootSlots", {}), r = {};
  return e && Object.entries(e).forEach(([a, l]) => {
    const s = typeof l == "string" ? o[l] : l;
    s && (r[a] = (i) => typeof s == "function" ? s({ ...t, ...i || {} }) : s);
  }), r;
}
function Ut(e, t, n = !1, o = {}) {
  if (t != null)
    for (const r of e) {
      const a = r[o.value ?? "value"];
      if (Object.is(a, t) || n && String(a) === t)
        return r;
      const l = r[o.children ?? "children"], s = Array.isArray(l) && Ut(l, t, n, o);
      if (s)
        return s;
    }
}
function Ct(e, t = {}, n = !0) {
  const o = T([]);
  let r = 0;
  (e == null ? void 0 : e.source) !== void 0 && e.dictName !== void 0 && console.warn("[SuperForm] options.source 与 options.dictName 同时配置，优先使用 source，忽略 dictName");
  const a = async (s = t) => {
    var i;
    const m = ++r, f = W(e == null ? void 0 : e.source), b = (e == null ? void 0 : e.source) !== void 0 ? typeof f == "function" ? await f(s) : f : (e == null ? void 0 : e.dictName) !== void 0 ? await ((i = se.dictApi) == null ? void 0 : i.call(se, e.dictName)) : void 0;
    m === r && (o.value = b ?? []);
  };
  return e && n && $e(() => {
    a();
  }), { optionsRef: N(() => {
    var s, i, m;
    const f = o.value, b = ((s = e == null ? void 0 : e.fieldNames) == null ? void 0 : s.label) ?? "label", v = ((i = e == null ? void 0 : e.fieldNames) == null ? void 0 : i.value) ?? "value", h = ((m = e == null ? void 0 : e.fieldNames) == null ? void 0 : m.children) ?? "children", y = (w) => w.map((d, p) => {
      const u = je(d), c = u ? d[b] : d, g = e != null && e.labelAsValue ? c : u ? d[v] : e != null && e.valueToNumber ? p : d;
      return {
        ...u ? d : {},
        label: c,
        value: e != null && e.valueToNumber && !e.labelAsValue ? Number(g) : g,
        ...u && Array.isArray(d[h]) && { children: y(d[h]) }
      };
    });
    return Array.isArray(f) ? y(f) : Object.entries(f ?? {}).map(([w, d]) => ({
      label: d,
      value: e != null && e.labelAsValue ? d : e != null && e.valueToNumber ? Number(w) : w
    }));
  }), load: a };
}
const rn = (e, t) => {
  const n = {};
  return e.vModelFields && Object.entries(e.vModelFields).forEach(([o, r]) => {
    n[o] = t[r];
  }), n;
}, Dt = ({ value: e, label: t = e, color: n, icon: o, tagViewer: r = !0 }) => {
  const a = { color: n, label: t, icon: o };
  if (r !== !0 || !n) {
    const l = r === !0 ? se.tagViewer : r;
    if (typeof l == "function") {
      const s = l(e);
      je(s) ? Object.assign(a, s) : a.color = s;
    } else if (Array.isArray(l) && je(l[0])) {
      const s = l.find((i) => i.value == e);
      Object.assign(a, s);
    }
    a.color ?? (a.color = n || l[e] || e === !0 && "success" || e === !1 && "error" || "default");
  }
  return z("tag")(
    { color: a.color },
    {
      default: () => a.label || e,
      icon: a.icon
    }
  );
};
function vt(e, t = {}) {
  const { type: n = "", viewRender: o, render: r, labelField: a, tagViewer: l, initialValue: s } = e, i = e.options, m = e.endField, f = be("rootSlots", {}), b = o || n === "InfoSlot" && r, v = typeof b == "string" ? f[b] : b;
  if (b && !v)
    return !1;
  let h = !1;
  const y = (() => {
    if (a)
      return ({ current: d } = t) => String(Oe(d, a) ?? "");
    if (m)
      return ({ current: d, text: p } = t) => (p || "") + " - " + (Oe(d, m) || "");
    if (i !== void 0) {
      h = !(l === !1 || !l && se.tagViewer === !1);
      const { optionsRef: d, load: p } = Ct(i, t, !1);
      let u = !1;
      return (c = t, g) => {
        u || (u = !0, p(c));
        const S = c.text ?? c.value ?? le(s) ?? "";
        if (S === "")
          return "";
        const A = (Array.isArray(S) ? S : e.stringifyValue && typeof S == "string" ? S.split(",") : [S]).map((C) => {
          const _ = Ut(d.value, C, e.stringifyValue), x = (_ == null ? void 0 : _.label) ?? C;
          return !g && h ? Dt({ ..._, value: C, label: x, tagViewer: l }) : x;
        });
        return !g && h ? A : A.join(",");
      };
    } else if (n === "Switch")
      return ({ text: d, value: p } = t) => {
        const u = d ?? p ?? le(s);
        return u === !0 ? "是" : u === !1 ? "否" : u;
      };
  })(), w = !0;
  if (v)
    return (d = t) => {
      const p = rn(e, d.current), { attrs: u } = Ce({ option: e, effectData: d }), c = { ...u };
      delete c.disabled;
      const g = B({
        props: { ...c, ...p },
        ...d,
        ...y && { text: N(() => y(d, w)) },
        isView: !0
      });
      return v(g);
    };
  if (l && !h)
    return (d = t) => {
      const p = d.text ?? le(s);
      return typeof p == "boolean" && l === !0 ? Dt({
        label: p ? "是" : "否",
        color: p ? "success" : "error"
      }) : (Array.isArray(p) ? p : typeof p == "string" ? p.split(",") : [p]).map((g) => Dt({ value: g, tagViewer: l }));
    };
  if (n === "Text" && (e.attrs || e.dynamicAttrs))
    return (d = t) => {
      const p = (y == null ? void 0 : y(d)) || (d.value ?? le(s)), u = Rt(e.dynamicAttrs, d), c = ne({ ...e.attrs, title: p }, u);
      return k("span", c, p);
    };
  if (n === "HTML")
    return (d = t) => {
      const p = Rt(e.dynamicAttrs, d), u = ne({ ...e.attrs, innerHTML: d.value }, p);
      return k("span", u);
    };
  if (n === "TextArea")
    return (d = t) => k("pre", { style: "white-space: break-spaces;" }, d.value ?? le(s));
  if (!y && (n === "Upload" || St(n)))
    return (d = t) => {
      const p = rn(e, d.current), u = tt(e.slots, d, f), {
        attrs: { disabled: c, ...g }
      } = Ce({ option: e, effectData: d });
      if (n === "Upload")
        return k(
          he.Upload,
          B({ option: e, effectData: d, ...g, ...p, value: d.value, isView: !0, disabled: c }),
          u
        );
      const S = St(n);
      return S && k(
        S.component,
        B(
          Qn(S, {
            ...g,
            ...p,
            value: d.value,
            disabled: c
          })
        ),
        u
      );
    };
  if (n === "Buttons") {
    const d = _t({ config: e, isView: !0 });
    return !!d && ((p = t) => d({ param: p }));
  } else
    return y;
}
const nt = (e, t) => {
  const { title: n, label: o, labelSlot: r, tooltip: a } = e, l = a && (je(a) ? a : { title: a }), s = n || r || o;
  return s === void 0 ? void 0 : () => [
    ee(s, t),
    a && z("tooltip")(l, {
      title: () => ee(a.title, t),
      default: () => k(
        "span",
        {
          class: "sup-label-tooltip"
        },
        a.icon ? a.icon() : me("info")
      )
    })
  ];
}, fa = /* @__PURE__ */ new Set([
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
  "CardList",
  "TabList",
  "CollapseList",
  "GroupList",
  "Tabs",
  "Collapse",
  "Descriptions",
  "Table",
  "InputGroup",
  "InputList"
]), pa = {
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
}, va = /* @__PURE__ */ new Set(["Input", "InputNumber", "TextArea", "AutoComplete"]), ma = /* @__PURE__ */ new Set(["Select", "TreeSelect"]), ba = /* @__PURE__ */ new Set(["Select", "TreeSelect", "RadioGroup", "CheckboxGroup"]), ha = /* @__PURE__ */ new Set([
  "Form",
  "Group",
  "Fragment",
  "Card",
  "CardList",
  "TabList",
  "CollapseList",
  "GroupList",
  "Tabs",
  "Collapse",
  "Descriptions",
  "Table"
]), ga = /* @__PURE__ */ new Set(["table", "form", "description"]), ya = /* @__PURE__ */ new Set([
  "attrs",
  "dynamicAttrs",
  "dataSource",
  "initialValue",
  "options",
  "params",
  "rules",
  "treeData",
  "value"
]), Re = (e) => e !== null && typeof e == "object" && !Array.isArray(e), G = (e, t, n, o) => ({ level: e, code: t, path: n, message: o });
function jt(e, t, n, o) {
  if (!(!e || typeof e != "object" || o.has(e))) {
    if (o.add(e), Re(e))
      for (const [r, a] of Object.entries(pa))
        Object.prototype.hasOwnProperty.call(e, r) && n.push(G("warning", "deprecated-api", `${t}.${r}`, `已废弃，${a}。`));
    for (const [r, a] of Object.entries(e))
      typeof a == "function" || ya.has(r) || (Array.isArray(a) ? a.forEach((l, s) => jt(l, `${t}.${r}[${s}]`, n, o)) : Re(a) && jt(a, `${t}.${r}`, n, o));
  }
}
function wa(e, t, n, o, r) {
  var a, l, s;
  if (!Re(e)) {
    typeof e != "string" && n.push(G("error", "invalid-item", t, "字段配置必须是对象。"));
    return;
  }
  const { type: i } = e;
  if (i !== void 0 && (typeof i != "string" || !r.has(i)) && n.push(G("error", "unknown-type", `${t}.type`, `未知字段类型 ${JSON.stringify(i)}。`)), i === void 0 && o !== "table" && n.push(G("warning", "missing-type", `${t}.type`, "表单或详情字段建议明确配置 type。")), Array.isArray(e.exclude)) {
    const v = e.exclude.filter((h) => !ga.has(h));
    v.length && n.push(
      G(
        "error",
        "invalid-exclude",
        `${t}.exclude`,
        `只支持 table、form、description，当前包含：${v.join("、")}。`
      )
    );
  } else
    e.exclude !== void 0 && n.push(G("error", "invalid-exclude", `${t}.exclude`, "exclude 必须是字符串数组。"));
  e.visibleIn !== void 0 && !["form", "detail", "both"].includes(e.visibleIn) && n.push(
    G("error", "invalid-visible-in", `${t}.visibleIn`, "visibleIn 只支持 'form'、'detail'、'both'。")
  ), e.unauthorized !== void 0 && !["hide", "disable"].includes(e.unauthorized) && n.push(
    G("error", "invalid-unauthorized", `${t}.unauthorized`, "unauthorized 只支持 'hide'、'disable'。")
  ), ba.has(i) && !e.options && !e.dictName && n.push(G("warning", "missing-options", t, `${i} 未配置 options 或 dictName。`));
  const m = (a = e.attrs) == null ? void 0 : a.placeholder, f = va.has(i) ? `请输入${typeof e.label == "string" ? e.label : ""}` : ma.has(i) ? `请选择${typeof e.label == "string" ? e.label : ""}` : void 0;
  f !== void 0 && m === f && n.push(
    G("suggestion", "redundant-default", `${t}.attrs.placeholder`, "与内置 placeholder 相同，可以省略。")
  );
  const b = ["DatePicker", "DateRangePicker"].includes(i) ? "YYYY-MM-DD" : ["TimePicker", "TimeRangePicker"].includes(i) ? "HH:mm:ss" : void 0;
  b && ((l = e.attrs) == null ? void 0 : l.valueFormat) === b && n.push(
    G("suggestion", "redundant-default", `${t}.attrs.valueFormat`, "与内置 valueFormat 相同，可以省略。")
  ), i === "InputGroup" && ((s = e.attrs) == null ? void 0 : s.compact) === !0 && n.push(
    G("suggestion", "redundant-default", `${t}.attrs.compact`, "InputGroup 默认使用紧凑布局，可以省略。")
  ), e.block === !1 && !ha.has(i) && n.push(G("suggestion", "redundant-default", `${t}.block`, "block: false 是默认行为，可以省略。")), e.breakAfter === !1 && n.push(
    G("suggestion", "redundant-default", `${t}.breakAfter`, "breakAfter: false 是默认行为，可以省略。")
  ), (e.options || e.dictName) && e.tagViewer === !0 && n.push(
    G("suggestion", "redundant-default", `${t}.tagViewer`, "选项字段默认使用 Tag 展示，可以省略。")
  );
  for (const v of ["hidden", "disabled"])
    e[v] === !1 && n.push(G("suggestion", "redundant-default", `${t}.${v}`, `${v}: false 可以省略。`));
  Object.prototype.hasOwnProperty.call(e, "initialValue") && e.initialValue === void 0 && n.push(
    G("suggestion", "redundant-default", `${t}.initialValue`, "initialValue: undefined 可以省略。")
  );
  for (const v of ["attrs", "rowProps"])
    Re(e[v]) && Object.keys(e[v]).length === 0 && n.push(G("suggestion", "empty-config", `${t}.${v}`, `空的 ${v} 配置可以省略。`));
  for (const v of ["rules", "options"])
    Array.isArray(e[v]) && e[v].length === 0 && n.push(G("suggestion", "empty-config", `${t}.${v}`, `空的 ${v} 配置可以省略。`));
  e.subItems && Ye(e.subItems, `${t}.subItems`, n, o === "table" ? "form" : o, r), e.columns && Ye(e.columns, `${t}.columns`, n, "table", r);
}
function Ye(e, t, n, o, r) {
  if (!Array.isArray(e)) {
    n.push(G("error", "invalid-items", t, "必须是数组。"));
    return;
  }
  const a = /* @__PURE__ */ new Map();
  e.forEach((l, s) => {
    const i = `${t}[${s}]`;
    wa(l, i, n, o, r), !(!Re(l) || typeof l.field != "string" || !l.field) && (a.has(l.field) ? n.push(
      G(
        "warning",
        "duplicate-field",
        `${i}.field`,
        `字段 ${l.field} 与 ${a.get(l.field)} 重复。`
      )
    ) : a.set(l.field, `${t}[${s}].field`));
  });
}
function Sa(e, t = "auto", n = []) {
  var o, r, a, l, s, i, m;
  const f = [];
  if (!Re(e))
    return [G("error", "invalid-schema", "schema", "schema 必须是对象。")];
  const b = /* @__PURE__ */ new Set([...fa, ...n]);
  jt(e, "schema", f, /* @__PURE__ */ new WeakSet());
  const v = t === "auto" ? Array.isArray(e.columns) ? "table" : "form" : t;
  if (!["form", "table", "detail"].includes(v))
    return [G("error", "invalid-schema-type", "schema", `未知 schema 类型 ${JSON.stringify(t)}。`)];
  if (e.subSpan === 8 && f.push(G("suggestion", "redundant-default", "schema.subSpan", "subSpan: 8 是默认值，可以省略。")), e.gutter === 16 && f.push(G("suggestion", "redundant-default", "schema.gutter", "gutter: 16 是默认值，可以省略。")), Re(e.params) && Object.keys(e.params).length === 0 && f.push(G("suggestion", "empty-config", "schema.params", "空的 params 配置可以省略。")), v === "table") {
    for (const h of ["editMode", "addMode"])
      Object.prototype.hasOwnProperty.call(e, h) && f.push(G("warning", "deprecated-api", `schema.${h}`, `已废弃，使用 rowEditor.${h}。`));
    Array.isArray(e.columns) ? Ye(e.columns, "schema.columns", f, "table", b) : f.push(G("error", "missing-columns", "schema.columns", "表格必须配置 columns。")), e.immediate === !0 && f.push(
      G("suggestion", "redundant-default", "schema.immediate", "immediate: true 是默认值，可以省略。")
    ), e.pagination === !1 && f.push(
      G("suggestion", "redundant-default", "schema.pagination", "pagination: false 是默认值，可以省略。")
    ), ((o = e.attrs) == null ? void 0 : o.rowKey) === "id" && f.push(
      G("suggestion", "redundant-default", "schema.attrs.rowKey", "rowKey: 'id' 是默认值，可以省略。")
    ), ((r = e.attrs) == null ? void 0 : r.size) === "small" && f.push(
      G("suggestion", "redundant-default", "schema.attrs.size", "size: 'small' 是默认值，可以省略。")
    ), ((a = e.attrs) == null ? void 0 : a.tableLayout) === "fixed" && f.push(
      G(
        "suggestion",
        "redundant-default",
        "schema.attrs.tableLayout",
        "tableLayout: 'fixed' 是默认值，可以省略。"
      )
    ), Re(e.pagination) && e.pagination.current === 1 && f.push(
      G("suggestion", "redundant-default", "schema.pagination.current", "分页 current 默认是 1，可以省略。")
    ), Re(e.pagination) && e.pagination.pageSize === 10 && f.push(
      G("suggestion", "redundant-default", "schema.pagination.pageSize", "分页 pageSize 默认是 10，可以省略。")
    ), (l = e.searchForm) != null && l.subItems && Ye(e.searchForm.subItems, "schema.searchForm.subItems", f, "form", b), (i = (s = e.rowEditor) == null ? void 0 : s.form) != null && i.subItems && Ye(e.rowEditor.form.subItems, "schema.rowEditor.form.subItems", f, "form", b);
  } else
    Array.isArray(e.subItems) ? (((m = e.attrs) == null ? void 0 : m.labelAlign) === "right" && f.push(
      G("suggestion", "redundant-default", "schema.attrs.labelAlign", "labelAlign: 'right' 是默认值，可以省略。")
    ), Ye(e.subItems, "schema.subItems", f, v, b)) : f.push(G("error", "missing-sub-items", "schema.subItems", "表单或详情必须配置 subItems。"));
  return f;
}
function Ca(e, t = "auto") {
  return Sa(e, t, mr());
}
function ft(e, t, n) {
  var o, r;
  const a = Ca(e, t);
  return a.length && ((o = console.groupCollapsed) == null || o.call(console, `[superform] ${n} schema 诊断：${a.length} 项`), a.forEach(({ level: l, path: s, message: i }) => {
    const m = `[superform] ${s}: ${i}`;
    l === "error" ? console.error(m) : l === "warning" ? console.warn(m) : console.info(m);
  }), (r = console.groupEnd) == null || r.call(console)), a;
}
function ie(e, t = !1) {
  return () => k("svg", {
    viewBox: "0 0 24 24",
    width: "1em",
    height: "1em",
    fill: "none",
    stroke: "currentColor",
    "stroke-width": 1.8,
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    "aria-hidden": "true",
    focusable: "false",
    style: { display: "inline-block", verticalAlign: "-0.125em", flexShrink: 0 }
  }, [
    k("g", [
      ...e.map((n) => k("path", { d: n })),
      ...t ? [k("animateTransform", {
        attributeName: "transform",
        type: "rotate",
        from: "0 12 12",
        to: "360 12 12",
        dur: "1s",
        repeatCount: "indefinite"
      })] : []
    ])
  ]);
}
const Pe = {
  add: ie(["M12 5v14M5 12h14"]),
  remove: ie(["M5 12h14"]),
  delete: ie(["M4 7h16M9 7V4h6v3M6 7l1 14h10l1-14M10 11v6M14 11v6"]),
  edit: ie(["M14 5l5 5M4 20l5-1L21 7l-5-5L4 14z"]),
  detail: ie(["M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z", "M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0"]),
  submit: ie(["M3 11L21 3l-8 18-3-7zM10 14L21 3"]),
  search: ie(["M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0M15 15l6 6"]),
  reset: ie(["M4 10a8 8 0 1 1 1 8M4 4v6h6"]),
  more: ie(["M5 12h.01M12 12h.01M19 12h.01"]),
  expand: ie(["M5 9l7 7 7-7"]),
  collapse: ie(["M5 15l7-7 7 7"]),
  info: ie(["M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0M12 11v6M12 7h.01"]),
  upload: ie(["M12 16V3M7 8l5-5 5 5M4 15v6h16v-6"]),
  attachment: ie(["M8 13l7-7a3 3 0 0 1 4 4L9 20a5 5 0 0 1-7-7L13 2M6 15l8-8"]),
  loading: ie(["M20 12a8 8 0 1 1-8-8"], !0),
  sync: ie(["M4 10a8 8 0 0 1 14-4l2 3M20 3v6h-6M20 14a8 8 0 0 1-14 4l-2-3M4 21v-6h6"]),
  error: ie(["M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0M8 8l8 8M16 8l-8 8"])
}, _a = () => {
  const e = pt(
    {
      add: {
        icon: Pe.add,
        label: "新增"
      },
      delete: {
        icon: Pe.delete,
        label: "删除",
        confirmText: "确定要删除吗？",
        disabled: (t) => {
          var n;
          return !t.record && !(((n = t.selectedRows) == null ? void 0 : n.length) > 0);
        }
      },
      edit: {
        icon: Pe.edit,
        label: "修改",
        disabled: (t) => {
          var n;
          return !t.record && ((n = t.selectedRows) == null ? void 0 : n.length) !== 1;
        }
      },
      detail: {
        icon: Pe.detail,
        label: "查看",
        disabled: (t) => {
          var n;
          return !t.record && ((n = t.selectedRows) == null ? void 0 : n.length) !== 1;
        }
      },
      submit: {
        icon: Pe.submit,
        label: "提交"
      },
      search: {
        icon: Pe.search,
        label: "查询"
      },
      reset: {
        icon: Pe.reset,
        label: "重置"
      }
    },
    Q.ButtonActions,
    se.defaultButtons
  );
  return Object.entries(se.defaultButtons || {}).forEach(([t, n]) => {
    Object.prototype.hasOwnProperty.call(n, "icon") && (e[t].icon = n.icon);
  }), e;
};
function xa(e) {
  const t = _a();
  return Object.keys(e).forEach((n) => {
    if (t[n])
      if (typeof e[n] == "function")
        t[n].onClick = e[n];
      else {
        const { icon: o, ...r } = e[n];
        pt(t[n], { attrs: { title: t[n].label } }, r), Object.prototype.hasOwnProperty.call(e[n], "icon") && (t[n].icon = o);
      }
    else
      t[n] = e[n];
  }), t;
}
function Aa(e, t = {}, n = {}) {
  const o = xa(t), r = [];
  return Array.isArray(e) && e.forEach((a) => {
    const l = typeof a == "string" ? a : a.name, { onClick: s, ...i } = o[l] || {};
    i.attrs = Le({ ...n }, i.attrs), typeof a == "object" && Object.assign(i, a, { attrs: { ...i.attrs, ...a.attrs } }), i.name = l;
    const m = T(!1), f = T(!1), b = i.attrs.loading, v = ze(b);
    !v && b && (i.attrs.loading = f);
    const h = (p) => {
      v || (f.value = p ? b : !1);
    }, y = { label: i.label, ...typeof a == "object" ? a.meta : {} }, w = typeof a == "object" ? a.onClick : void 0, d = (p, u, c) => {
      if (m.value)
        return Promise.resolve();
      m.value = !0;
      const g = async () => {
        h(!0);
        try {
          return await u();
        } finally {
          h(!1);
        }
      };
      return p ? new Promise((S, D) => {
        let A = !1;
        const C = (_) => {
          A || (A = !0, m.value = !1, S(_));
        };
        try {
          de("services").confirm({
            title: () => ee(p, c),
            okText: "确定",
            cancelText: "取消",
            ...Q.Modal,
            onCancel: async (..._) => {
              var x, I;
              const M = await ((I = (x = Q.Modal) == null ? void 0 : x.onCancel) == null ? void 0 : I.call(x, ..._));
              return C(!1), M;
            },
            afterClose: (..._) => {
              var x, I;
              return C(!1), (I = (x = Q.Modal) == null ? void 0 : x.afterClose) == null ? void 0 : I.call(x, ..._);
            },
            onOk: async () => {
              try {
                const _ = await g();
                return C(_), _;
              } catch (_) {
                throw D(_), _;
              }
            }
          });
        } catch (_) {
          m.value = !1, D(_);
        }
      }) : g().finally(() => {
        m.value = !1;
      });
    };
    i.onClick = (p) => {
      const u = { ...p, meta: y };
      return w && s ? d(
        i.confirmText,
        () => w(u, async (c) => s({ ...u, ...c })),
        p
      ) : d(i.confirmText, () => {
        var c;
        return (c = s || w) == null ? void 0 : c(u);
      }, p);
    }, r.push({ ...i, pending: m });
  }), r;
}
function Un(e, t, n, o = {}, r = () => !0) {
  var a, l;
  const { buttonProps: s, limit: i, hidden: m, disabled: f, actions: b } = e, v = e.labelMode === "icon", h = e.labelMode === "label", y = { ...(a = Q.Buttons) == null ? void 0 : a.buttonProps, ...s }, w = (S) => N(() => !!(typeof S == "function" ? S(t) : le(S))), d = w(m), p = w(f), u = (S) => S.unauthorized ?? (S.invalidDisabled || S.roleMode === "disable" ? "disable" : S.roleMode && "hide"), c = (l = se.buttonRoles) == null ? void 0 : l.call(se), g = Aa(b, n || e.methods, y).flatMap((S) => {
    const D = c && S.roleName && !c.includes(S.roleName), A = u(S) ?? u(e) ?? "hide";
    if (D && A === "hide")
      return [];
    const C = w(S.hidden), _ = S.disabled === void 0 ? p : w(S.disabled), x = S.attrs || {}, I = w(x.disabled), M = N(() => !!D || _.value || I.value), E = typeof S.customRender == "string" ? o[S.customRender] : S.customRender, U = S.dropdown && N(() => {
      const L = le(S.dropdown);
      return je(L) ? Object.entries(L).map(([K, J]) => ({ value: K, label: J })) : typeof (L == null ? void 0 : L[0]) != "object" ? co(L || []).map((K) => ({ value: K, label: K })) : L;
    }), F = {
      get visible() {
        return r() && !d.value && !C.value;
      },
      get disabled() {
        return M.value;
      },
      get loading() {
        return S.pending.value || !!le(x.loading);
      },
      async execute(L) {
        var K;
        if (!(!F.visible || F.disabled || F.loading))
          return (K = S.onClick) == null ? void 0 : K.call(S, { ...t, e: L });
      }
    }, $ = N(() => {
      const L = M.value && S.disabledTooltip ? S.disabledTooltip : S.tooltip || (v && S.icon ? S.label : void 0);
      return typeof L == "function" ? L(t) : L;
    });
    return [
      {
        ...S,
        action: F,
        render: E,
        menu: U,
        tooltipTitle: $,
        onClick: F.execute,
        attrs: { ...y, ...S.attrs, disabled: N(() => F.disabled || S.pending.value) }
      }
    ];
  });
  return {
    render() {
      const S = g.filter((A) => A.action.visible);
      if (!S.length)
        return null;
      const D = i == null ? S.length : v && S.length === i + 1 ? i + 1 : i;
      return z("actionGroup")({
        groupProps: e.attrs,
        buttons: S.slice(0, D),
        moreButtons: S.slice(D),
        defaultButtonProps: y,
        divider: e.divider,
        labelOnly: h,
        iconOnly: v,
        moreLabel: e.moreLabel,
        effectData: t
      });
    }
  };
}
const Me = /* @__PURE__ */ Y({
  __name: "ButtonGroup",
  props: {
    option: {},
    methods: {},
    effectData: {}
  },
  setup(e) {
    const t = e, n = Array.isArray(t.option) ? { actions: t.option } : t.option, o = Un(n, B(t.effectData || {}), t.methods, be("rootSlots", {}));
    return (r, a) => (ke(), Qe(rt(() => W(o).render())));
  }
});
function _t({ config: e, methods: t, effectData: n, isView: o }) {
  const r = Array.isArray(e) ? { actions: e } : e, a = (r == null ? void 0 : r.visibleIn) ?? (r == null ? void 0 : r.validOn);
  if (!r || o && a === "form" || !o && a === "detail")
    return;
  let l = r.actions || [];
  if (a || (r.actions = l = l.filter((s) => {
    if (typeof s == "string")
      return !o;
    {
      const i = s.visibleIn ?? s.validOn;
      return o ? i !== "form" : i !== "detail";
    }
  })), l.length !== 0)
    return (s = {}) => k(Me, { option: r, methods: t, effectData: n, ...s });
}
function ln({ option: e, effectData: t, attrs: n }) {
  const o = e.options !== void 0;
  if (!o && !e.labelField)
    return;
  const r = n ?? e.attrs ?? {}, a = o ? Ct(e.options, t).optionsRef : N(() => W(r.options) ?? []);
  return {
    state: o ? N(() => ({ options: a.value })) : void 0,
    bindModel(l) {
      const s = l["onUpdate:labelValue"];
      s && H([() => W(l.value), a, () => o ? void 0 : W(r.fieldNames)], ([i, m, f]) => {
        const b = (v) => {
          var h;
          return (h = Ut(m, v, e.stringifyValue, f)) == null ? void 0 : h[(f == null ? void 0 : f.label) ?? "label"];
        };
        s(Array.isArray(i) ? i.map(b) : b(i));
      }, { immediate: !0, deep: !0 });
    }
  };
}
const sn = {
  options: ln,
  picker: ({ option: e }) => ({
    state: N(() => ({ placeholder: `请选择${e.label ?? ""}` }))
  }),
  range: ({ option: e }) => ({
    state: N(() => ({
      placeholder: [`请选择开始${e.label ?? ""}`, `请选择结束${e.label ?? ""}`]
    }))
  }),
  tree: ({ option: e, effectData: t }) => {
    const n = e.treeData;
    if (n === void 0)
      return;
    const o = T([]);
    return $e(() => {
      const r = typeof n == "function" ? n(t) : W(n);
      Promise.resolve(r).then((a) => {
        o.value = a ?? [];
      });
    }), { state: N(() => ({ treeData: o.value })) };
  },
  switch: (e) => {
    const t = ln(e);
    return t != null && t.state ? {
      bindModel: t.bindModel,
      state: N(() => {
        const [n = { value: !1 }, o = { value: !0 }] = t.state.value.options;
        return { switch: {
          unchecked: { value: n.value, label: n.label },
          checked: { value: o.value, label: o.label }
        } };
      })
    } : t;
  }
};
function ka(e, t) {
  const n = e.map((o) => {
    var r;
    return (r = sn[o]) == null ? void 0 : r.call(sn, t);
  }).filter(Boolean);
  return {
    bindModel: (o) => n.forEach((r) => {
      var a;
      return (a = r.bindModel) == null ? void 0 : a.call(r, o);
    }),
    state: N(() => Object.assign({}, ...n.map((o) => {
      var r;
      return (r = o.state) == null ? void 0 : r.value;
    })))
  };
}
const Ia = Y({
  name: "FieldProcessorRenderer",
  inheritAttrs: !1,
  props: {
    // 直接接收已经解析的配置，渲染阶段不再按类型查询 Adapter。
    field: { type: Object, required: !0 },
    inputAttrs: { type: Object, required: !0 },
    state: { type: Object, required: !0 },
    option: { type: Object, required: !0 },
    model: { type: Object, required: !0 },
    effectData: { type: Object, required: !0 }
  },
  setup(e, t) {
    const n = ka(e.field.processors || [], {
      option: e.option,
      attrs: B(e.inputAttrs),
      effectData: e.effectData,
      model: e.model
    }), o = qt({
      option: e.option,
      model: e.model,
      effectData: e.effectData
    });
    return n.bindModel(o), () => {
      const r = e.field, a = {
        type: r.type,
        option: e.option,
        model: e.model,
        effectData: e.effectData,
        binding: B(o),
        state: { ...e.state, ...n.state.value }
      }, l = B(r.getAttrs(e.inputAttrs, e.option, a.state));
      return r.render({ ...a, attrs: l, slots: t.slots });
    };
  }
}), zt = Y({
  name: "DataProvider",
  props: {
    name: {
      type: String,
      require: !0
    },
    data: {
      type: void 0,
      require: !0
    }
  },
  setup(e, t) {
    return Ne(e.name, e.data || {}), t.slots.default;
  }
});
function Da(e, t) {
  const n = be("inheritOptions", {}), o = e.option.subSpan ?? n.subSpan, r = N(() => e.model.index), a = [], l = [...e.model.children];
  for (let s = 0; s < l.length; s++) {
    const [i, m] = l[s], { type: f, align: b, span: v, hideInForm: h, exclude: y, editable: w } = i, d = i.block ?? i.blocked, p = i.breakAfter ?? i.wrapping, { parent: u, refData: c } = Z(m), g = _e({
      parent: e.effectData,
      current: u,
      field: m.refName,
      value: c,
      ...r.value !== void 0 && {
        index: r,
        record: m.refName ? u : c
      }
    });
    if (f === "Hidden" || (y ? y.includes("form") : h)) {
      qt({ option: i, model: m, effectData: g });
      continue;
    }
    const { hidden: S, required: D, attrs: A, nativeAttrs: C, disabled: _ } = Ce({
      option: i,
      effectData: g,
      inheritDisabled: n.disabled
    });
    if (f === "Fragment") {
      m.children && l.splice(
        s + 1,
        0,
        ...[...m.children].map(([$, L]) => [{ ...$, hidden: S, disabled: A.disabled }, L])
      );
      continue;
    }
    let x = t(i, m, g, A, { attrs: C, disabled: _ });
    if (!x)
      continue;
    if ((It(f) || Bt(f)) && w !== void 0 && w !== !0) {
      const $ = x, L = N(() => et(w) ? w(g) : w), K = vt(i, B({ ...Be(g), isView: !0 }));
      x = () => L.value ? $() : K ? K() : c.value;
    }
    const I = { ...i.colProps, span: v };
    Le(I, { span: o }, Q.Col, { span: 8 }), (I.span === 0 || I.flex) && (I.span = void 0);
    let M = x;
    const E = [...Je, "InputList", "InputGroup"].includes(f);
    if (e.fieldWrapper !== "none" && !E && (!d || i.field && i.label)) {
      const $ = ct(m.rules, g), L = N(
        () => W(A.disabled) ? void 0 : !i.required || D.value ? $ : $.slice(1)
      ), K = ne(Q.FormItem, i.formItemProps), J = nt(i, g);
      M = () => z("formItem")(
        B({
          ...K,
          name: m.propChain,
          rules: L,
          colon: !!J
        }),
        {
          default: x,
          label: J
        }
      );
    }
    if (E && e.fieldWrapper !== "none") {
      const $ = {
        required: D,
        disabled: A.disabled,
        subSpan: i.subSpan ?? o
      };
      M = () => k(zt, { name: "inheritOptions", data: $ }, x);
    }
    const U = d ?? (Je.includes(f) && !i.span), F = !U && f === "InputList" ? { ...I, span: v ?? 24 } : I;
    a.push({
      key: s,
      hidden: S,
      content: M,
      layout: {
        block: U,
        breakAfter: p,
        align: b,
        colProps: F,
        compactProps: I,
        detail: f === "Descriptions"
      }
    });
  }
  return a;
}
function Oa(e, t) {
  const n = [];
  let o;
  for (const a of e)
    a.layout.block ? (n.push(a), o = void 0) : (o || n.push(o = []), o.push(a), a.layout.breakAfter && (o = void 0));
  const r = () => {
    if (t.layout === "compact")
      return e.map((s) => {
        if (s.hidden.value)
          return !1;
        const { span: i, flex: m } = s.layout.compactProps, f = Number(i) ? (Number(i) / 24 * 100).toFixed(2) + "%" : void 0;
        return k(s.content, {
          key: s.key,
          style: {
            width: f,
            flex: m ?? (i === "auto" ? "1 1 0" : void 0),
            minWidth: 0
          }
        });
      });
    const { gutter: a = 16 } = t.option, l = { gutter: a, ...t.option.rowProps };
    return n.map((s) => Array.isArray(s) ? z("row")(
      { ...l, key: s[0].key },
      {
        default: () => s.map(
          (i) => !i.hidden.value && z("col")(
            ne(
              {
                key: i.key,
                style: i.layout.align && { textAlign: i.layout.align }
              },
              i.layout.colProps
            ),
            { default: i.content }
          )
        )
      }
    ) : !s.hidden.value && k(
      "div",
      {
        key: s.key,
        class: ["sup-form-section", s.layout.detail && "sup-detail"],
        style: s.layout.align && { textAlign: s.layout.align }
      },
      [s.content()]
    ));
  };
  return {
    // 首次渲染前即可确定是否需要 Group，不依赖 renderNodes 的执行副作用。
    hasWrap: t.layout === "grid" && n.some(Array.isArray),
    renderNodes: r,
    render: () => t.layout === "grid" ? r() : z(t.layout === "compact" ? "compactSpace" : "space")(
      ne(t.layout === "compact" ? { block: !0 } : {}, t.layoutAttrs || {}),
      // 紧凑容器必须直接接收各字段，不能额外套一个组件层阻断首尾上下文。
      { default: () => r().filter(Boolean) }
    )
  };
}
const Te = Y({
  inheritAttrs: !1,
  name: "Collections",
  props: {
    option: { type: Object, default: () => ({}) },
    model: {
      required: !0,
      type: Object
    },
    effectData: Object,
    layout: { type: String, default: "grid" },
    layoutAttrs: Object,
    fieldWrapper: { type: String, default: "formItem" }
  },
  setup(e, { slots: t }) {
    const n = Da(e, xt), o = Oa(n, e);
    return () => t.default ? t.default({ nodes: o.renderNodes().filter(Boolean) }) : e.option.isContainer && o.hasWrap ? k(
      he.Group,
      {
        class: "sup-form-section",
        option: e.option,
        model: e.model,
        effectData: e.effectData
      },
      { innerContent: o.render }
    ) : o.render();
  }
});
function xt(e, t, n, o, r) {
  const { type: a, render: l } = e;
  if (!a)
    return;
  const s = be("rootSlots", {}), i = tt(e.slots, n), m = l ? void 0 : $n(a), f = m == null ? void 0 : m.processors, b = (r == null ? void 0 : r.attrs) ?? o, v = B({ disabled: r == null ? void 0 : r.disabled }), h = m ? void 0 : St(a), y = l ? typeof l == "function" ? l : s[l] : (h == null ? void 0 : h.component) || he[a] || (m == null ? void 0 : m.component) || (m == null ? void 0 : m.render);
  let w;
  if (a === "InfoSlot")
    w = y && (() => y({ props: o, ...n }));
  else if (a === "Text")
    w = () => k("span", o, t.refData);
  else if (a === "HTML")
    w = () => k("span", { ...o, innerHTML: t.refData });
  else if (a === "Buttons")
    w = () => k(Me, { option: e, effectData: n, ...o });
  else if (Je.includes(a) || a === "InputList")
    w = () => k(he[a], B({ option: e, model: t, effectData: n, ...o }), i);
  else if (!y)
    console.error(`组件 '${a}' 配置错误，请检查名称或'render'是否正确！`);
  else if (m && (f != null && f.length))
    w = () => k(Ia, { inputAttrs: b, state: v, field: m, option: e, model: t, effectData: n }, i);
  else {
    const d = qt({ option: e, model: t, effectData: n }), p = { ...o, ...d };
    a === "InputSlot" ? w = () => y == null ? void 0 : y(B({ props: p, ...n })) : m ? w = () => {
      const u = { type: a, option: e, model: t, effectData: n, binding: B(d), state: v }, c = B(m.getAttrs(b, e, u.state));
      return m.render({ ...u, attrs: c, slots: i });
    } : (h == null ? void 0 : h.source) === "custom" || (h == null ? void 0 : h.source) === "auto" ? w = () => k(y, B(Qn(h, p)), i) : w = () => k(y, B({ option: e, model: t, effectData: n, ...p }), i);
  }
  return w;
}
const Ma = Y({
  props: {
    option: {
      required: !0,
      type: Object
    },
    modelsMap: {
      type: Object,
      required: !0
    },
    source: {
      type: Object,
      required: !0
    }
  },
  setup(e, t) {
    const n = oe(e, "source"), { modelsMap: o } = He(e.modelsMap, n);
    return Ne("exaProvider", { data: oe(e, "source") }), () => {
      var r;
      return k(
        "div",
        { class: ["sup-form-section sup-detail", ((r = t.attrs) == null ? void 0 : r.isContainer) && "sup-container"] },
        k(he.Descriptions, {
          option: e.option,
          model: { children: o },
          effectData: B({ current: n }),
          isView: !0
        })
      );
    };
  }
}), qe = Y({
  inheritAttrs: !1,
  props: {
    option: { type: Object, required: !0 },
    modelsMap: {
      type: Object,
      required: !0
    },
    isRoot: Boolean,
    effectData: Object
  },
  setup({ option: e, modelsMap: t, isRoot: n, effectData: o }, r) {
    var a;
    const l = be("exaProvider", {}).attrs, s = be("gridConfig", l), i = {
      ...Q.Descriptions,
      ...s
    }, m = Le({ gutter: e.gutter }, e.rowProps || i.rowProps, Q.row, {
      gutter: 16
    }), f = {
      subSpan: e.subSpan,
      ...e.descriptionsProps,
      ...r.attrs
    }, b = Le(
      {
        subSpan: e.subSpan ?? i.subSpan,
        rowProps: m,
        ...f
      },
      i
    ), v = b.subSpan ?? (b.subSpan = ((a = Q.Col) == null ? void 0 : a.span) ?? 12), h = Tt(t, e, o), y = [];
    let w, d;
    h.forEach((u, c) => {
      u.node ?? (u.node = () => z("descriptions")(Ea(u.group, b))), u.isBlock ? (u.group || u.option.type === "InputList" ? (d || (d = [], y.push(["section", d])), d.push(u)) : (y.push(["block", u]), d = void 0), w = void 0) : (!w && y.push(["row", w = []]), w.push(u), d = void 0);
    });
    const p = () => k(
      zt,
      { name: "gridConfig", data: b },
      () => y.map(([u, c], g) => {
        let S = c.node;
        return u === "row" ? S = () => z("row")(m, {
          default: () => c.map((D, A) => {
            const C = D.option.colProps || {
              span: D.option.span ?? v
            };
            return !W(D.hidden) && z("col")({ ...Q.Col, ...C, key: A }, { default: D.node });
          })
        }) : u === "section" && (S = () => c.map((D) => !W(D.hidden) && D.node())), !W(c.hidden) && (y.length > 1 ? k("div", { class: "sup-form-section", key: g }, S()) : S());
      })
    );
    return n ? () => k(
      he.Group,
      ne(
        { class: "sup-form-section" },
        {
          option: e,
          model: {},
          effectData: _e({}),
          isView: !0,
          ...f
        }
      ),
      { innerContent: p }
    ) : p;
  }
});
function Ea(e, t) {
  const {
    subSpan: n,
    column: o,
    layout: r,
    bordered: a,
    mode: l = a ? "table" : "default",
    rowProps: s,
    colon: i,
    size: m = "middle",
    tableLayout: f,
    labelCol: b,
    wrapperCol: v,
    ...h
  } = t, y = Math.max(1, Math.floor(Number(o) || (Number(n) ? 24 / Number(n) : 2))), w = [];
  let d = [], p = 0;
  const u = () => {
    d.length && (p < y && (d[d.length - 1].colspan += y - p), w.push(d), d = [], p = 0);
  };
  return e.forEach(({ option: c, label: g, content: S, hidden: D }, A) => {
    if (W(D))
      return;
    const C = { ...h, ...c.formItemProps, ...c.descriptionsProps }, _ = Number(C.span ?? c.span);
    let x = _ ? Math.ceil(_ / (24 / y)) : 1;
    x = Math.max(1, Math.min(y, x));
    const I = {
      ...C.labelAlign && { textAlign: C.labelAlign },
      ...C.labelStyle
    }, M = { span: C.span ?? c.span, ...C.colProps || c.colProps };
    M.span === 0 || M.flex ? M.span = void 0 : Number(M.span) || (M.span = 24 / y);
    const E = {
      key: A,
      attrs: C,
      colProps: M,
      labelCol: ne(b, C.labelCol, {
        style: I,
        class: { "sup-label-no-colon": C.noColon }
      }),
      wrapperCol: ne(
        v,
        { style: r === "vertical" && { textAlign: C.labelAlign } },
        { style: C.contentStyle },
        C.wrapperCol
      ),
      label: g,
      content: S,
      colspan: x
    };
    p + x > y && u(), d.push(E), p += x, (c.breakAfter ?? c.wrapping) && u();
  }), u(), { attrs: h, mode: l, layout: r, rowProps: s, colon: i, size: m, tableLayout: f, column: y, rows: w };
}
function Tt(e, t, n) {
  const o = [];
  let r;
  const a = be("rootSlots", {});
  return [...e].forEach(([l, s], i) => {
    var m, f, b;
    const { type: v = "", field: h, hideInDescription: y, viewRender: w, exclude: d } = l;
    if (v === "Hidden" || y || d != null && d.includes("description"))
      return;
    const { parent: p, refData: u } = Be(B(s)), c = _e({
      parent: n,
      current: p,
      isView: !0,
      field: s.refName,
      value: u,
      text: u,
      ..."index" in s && {
        index: s.index,
        record: h ? u : p
      }
    }), { attrs: g, hidden: S } = Ce({ option: l, effectData: c }), D = tt(l.slots, c), A = nt(l, c);
    let C = l.block ?? l.blocked, _;
    const x = [], I = typeof w == "string" ? a[w] : w;
    _ = I && (() => ee(I, c));
    const M = s.children || ((m = s.listData) == null ? void 0 : m.modelsMap);
    if (v === "InputGroup") {
      if (!w) {
        let E = l.breakAfter ?? l.wrapping;
        const F = (f = Tt(M, l, c)[0].group) == null ? void 0 : f.map(({ option: $, content: L }) => {
          const K = $.labelSlot || $.label, J = (g == null ? void 0 : g.compact) === !1 && K;
          return E = ($.breakAfter ?? $.wrapping) || E, () => k("span", [J && ee(K, c), J && ": ", L == null ? void 0 : L()]);
        });
        _ = () => z("space")(
          { direction: E ? "vertical" : "horizontal" },
          {
            default: () => F == null ? void 0 : F.map(($) => $())
          }
        );
      }
      x.push({ option: l, label: A, hidden: S, content: _ });
    } else if (v === "Fragment") {
      const E = Tt(M, l, c), U = E[0].group;
      U && (E.shift(), x.push(...U.map((F) => ({ ...F, hidden: S })))), E.length && (r = void 0, o.push(...E));
    } else if (s.children || s.listData || Je.includes(v)) {
      C ?? (C = !l.span);
      const E = [...Je, "InputList"].includes(v) ? v : "Group", U = he[E], F = () => k(
        U,
        B({
          option: l,
          model: s,
          effectData: c,
          isView: !0,
          ...Q[E],
          ...g
        }),
        D
      );
      _ ?? (_ = F), v === "InputList" && (!C || A && !(g != null && g.labelIndex) ? x.push({
        option: { ...l },
        label: A,
        hidden: S,
        content: _
      }) : _ = F);
    } else {
      const E = Pa(l, s, c);
      E && x.push({ option: l, label: A, hidden: S, content: E });
    }
    if (!(!x.length && !_))
      if (x.length && !C)
        r || (r = [], o.push({ option: t, isBlock: !0, group: r })), r.push(...x);
      else {
        if (x.length && A)
          o.push({ option: t, isBlock: C, group: x });
        else {
          const E = l.align && { textAlign: l.align };
          _ = ((b = x[0]) == null ? void 0 : b.content) || _, o.push({
            option: l,
            isBlock: C,
            node: () => k(_, { style: E }),
            hidden: S
          });
        }
        r = void 0;
      }
  }), o;
}
function Pa(e, t, n) {
  const { parent: o, refData: r } = Be(B(t)), a = t.refName ? r : void 0, l = Z(o.value) === Z(n.current) ? n : _e({
    parent: n,
    current: o,
    text: a,
    value: a,
    field: t.refName,
    isView: !0
  }), s = vt(e, l);
  return s === !1 ? void 0 : () => s ? s() : String(t.refData ?? "");
}
const Ot = Y({
  inheritAttrs: !1,
  props: {
    option: { type: Object, required: !0 },
    model: { type: Object, required: !0 },
    effectData: Object,
    isView: Boolean
  },
  setup({ option: e, model: t, effectData: n, isView: o }, r) {
    const { type: a, label: l, title: s = l, buttons: i, contentAttrs: m } = e, f = a === "Descriptions" || o;
    let b;
    if (i) {
      const v = Array.isArray(i) ? { actions: i } : i;
      a === "Descriptions" && (v.visibleIn ?? (v.visibleIn = v.validOn ?? "detail")), b = _t({
        config: v,
        effectData: n,
        isView: f
      });
    }
    return () => {
      const { style: v, class: h, ...y } = r.attrs, w = r.slots.title || (s ? nt(e, n) : void 0), d = r.slots.extra || r.slots.actions || b, p = (i == null ? void 0 : i.placement) === "bottom" ? "bottom" : "title";
      return z("group")({
        attrs: { class: h, style: v },
        contentAttrs: m,
        component: e.component && Z(e.component),
        slots: r.slots,
        title: w,
        extra: d,
        extraPlacement: p,
        extraAlign: (i == null ? void 0 : i.align) || (p === "bottom" ? "center" : w ? "right" : void 0),
        content: () => r.slots.innerContent ? r.slots.innerContent(y) : r.slots.default ? r.slots.default() : f ? k(qe, {
          option: { descriptionsProps: y, ...e },
          modelsMap: t.children,
          effectData: n
        }) : k(Te, { option: e, model: t, effectData: n })
      });
    };
  }
}), zn = {
  name: "SuperForm",
  props: {
    option: {
      required: !0,
      type: Object
    },
    dataSource: Object,
    /** 按钮事件 */
    methods: Object,
    ignoreRules: {
      default: (e) => e.option.ignoreRules,
      type: Boolean
    },
    compact: {
      default: (e) => e.option.compact,
      type: Boolean
    }
  },
  emits: ["register", "submit", "reset"],
  setup(e, { expose: t, emit: n, slots: o }) {
    var r;
    const a = Ie(), l = T({}), {
      option: { onSubmit: s, onReset: i, buttons: m, ...f },
      ignoreRules: b,
      compact: v
    } = e, h = B({ formData: l, current: l }), { attrs: y } = Ce({ option: f, effectData: h }), w = /* @__PURE__ */ new Set(), d = (x) => {
      if (x)
        return w.add(x), () => w.delete(x);
    }, p = async (x) => {
      if (!a.value || b || !x.length)
        return;
      const I = de("form");
      if (!I.validateField)
        throw new Error("当前 UIAdapter 未实现 form.validateField");
      await I.validateField(a.value, x);
    }, u = () => {
      a.value && de("form").clearValidate(a.value);
    };
    Ne("exaProvider", {
      data: yn(l),
      attrs: y,
      onSubmit: d,
      validateField: p
    }), Ne("inheritOptions", {
      disabled: y.disabled,
      subSpan: f.subSpan
    });
    const c = (x) => Promise.all(
      [...w, s].map(async (I) => {
        const M = await (I == null ? void 0 : I(x));
        return M === !1 || M && M.errMessage ? Promise.reject({ message: M && M.errMessage }) : M;
      })
    );
    b && Object.assign(y, { hideRequiredMark: !0, validateTrigger: "none" });
    const g = {
      dataSource: l,
      getNativeInstance: () => a.value,
      async validate() {
        if (!a.value)
          throw new Error("表单尚未挂载或已卸载");
        await de("form").validate(a.value);
      },
      validateField: p,
      clearValidate: u,
      async submit() {
        await g.validate();
        try {
          await c(l.value);
        } catch (I) {
          throw I && typeof I == "object" && "message" in I && I.message && de("services").message("error", I.message), I;
        }
        const x = Ve(l.value);
        return n("submit", x), x;
      },
      setFieldsValue(x) {
        return u(), Ln(l.value, x, A);
      },
      resetFields(x = {}) {
        Bn(l.value, x, A), u();
        const I = Ve(l.value);
        return i == null || i(I), n("reset", I), I;
      }
    }, S = Array.isArray(m) ? { actions: m } : m;
    (r = S == null ? void 0 : S.actions) != null && r.length && (f.subItems = [
      ...f.subItems,
      {
        type: "InfoSlot",
        align: S.align || "center",
        block: !0,
        render: () => k(Me, {
          option: S,
          methods: {
            submit: g.submit,
            reset: g.resetFields,
            search: g.submit
          },
          effectData: h
        }),
        ...S.placement === "inline" && {
          span: "auto",
          block: !1,
          align: S.align || "right"
        }
      }
    ]);
    const { modelsMap: D } = Ze(f.subItems, l), A = Ve(l.value);
    H(
      () => W(e.dataSource ?? e.option.dataSource),
      (x) => {
        x && (u(), l.value = x);
      },
      { immediate: !0, flush: "sync" }
    );
    const C = B({ ...g }), _ = (x) => {
      if (a.value = x, !x) {
        n("register", null);
        return;
      }
      n("register", C);
    };
    return Vt(() => {
      w.clear(), a.value = void 0;
    }), t(C), () => z("form")(
      {
        ref: _,
        class: ["sup-form", v && "sup-form-compact", b && "sup-form-simple"],
        model: l.value,
        labelAlign: "right",
        ...y
      },
      {
        ...o,
        default: () => k(Te, {
          option: f,
          model: { refData: l, children: D },
          effectData: h
        })
      }
    );
  }
}, Ra = Y({
  inheritAttrs: !1,
  props: {
    option: { type: Object, required: !0 },
    model: { type: Object, required: !0 },
    effectData: Object,
    compact: { type: Boolean, default: !0 },
    disabled: void 0
  },
  setup(e, { attrs: t }) {
    var n;
    const { option: o, model: r, compact: a } = e, { slots: l } = o;
    let s = r, i = ct(r.rules, e.effectData), m = oe(r, "propChain");
    const f = {}, b = {
      type: "object",
      required: !1,
      fields: {}
    }, v = r.refName !== void 0 || r.index !== void 0;
    if (r.children && a) {
      for (const u of r.children.values())
        if ((n = u.rules) != null && n.length && u.fieldName) {
          u.rules[0].required && (b.required = !0);
          const c = B({
            ...e.effectData,
            parent: e.effectData,
            current: oe(u, "parent"),
            field: u.fieldName,
            value: oe(u, "refData")
          }), g = b.fields[u.fieldName] = ct(u.rules, c);
          if (!v) {
            m = oe(u, "propChain"), i = g, s = u;
            break;
          }
        }
    } else
      f.style = "margin: 0";
    v && (i = (i || []).concat([b])), i || (i = []), f.required = i.some((u) => u.required);
    const h = be("inheritOptions", {}), y = N(
      () => e.disabled ? void 0 : !o.required || W(h.required) ? i : i.slice(1)
    ), w = ne(Q.FormItem, o.formItemProps, f), d = nt(o, e.effectData), p = be("exaProvider", {});
    return H(
      () => W(s.refData),
      () => {
        var u, c;
        !e.disabled && ((u = y.value) != null && u.length) && ((c = p.validateField) == null || c.call(p, m.value).catch(() => {
        }));
      },
      { deep: !0, flush: "post" }
    ), () => z("formItem")(
      {
        ...w,
        rules: y.value,
        name: m.value
      },
      {
        label: d,
        default: (l == null ? void 0 : l.default) || (() => k(Te, {
          option: o,
          model: r,
          effectData: e.effectData,
          layout: a ? "compact" : "space",
          fieldWrapper: a ? "none" : "formItem",
          layoutAttrs: t
        }))
      }
    );
  }
});
function At(e, t) {
  const n = Array.isArray(t) ? { actions: t } : t;
  return {
    ...e,
    ...n,
    buttonProps: { ...e.buttonProps, ...n == null ? void 0 : n.buttonProps }
  };
}
const ja = Y({
  inheritAttrs: !1,
  props: {
    option: {
      required: !0,
      type: Object
    },
    model: {
      required: !0,
      type: Object
    },
    effectData: {
      type: Object,
      required: !0
    },
    isView: Boolean,
    labelIndex: Boolean
  },
  setup(e) {
    const { model: t, option: n, isView: o, effectData: r, labelIndex: a } = e, { columns: l, rowButtons: s, label: i, labelSlot: m, compact: f, slots: b, ...v } = n, { modelsMap: h } = t.listData, y = l[0], w = h.get(y), d = l.length === 1 && y.field === "$index", p = !a && (i || m), u = oe(t, "refData");
    let c = [];
    const g = {
      add: {
        onClick({ index: _ }) {
          u.value.splice(_ + 1, 0, d ? void 0 : {}), c.splice(_ + 1, 0, void 0);
        },
        icon: () => me("add")
      },
      delete: {
        disabled: () => u.value.length === 1,
        confirmText: "",
        icon: () => me("remove"),
        onClick({ index: _ }) {
          u.value.splice(_, 1), c.splice(_, 1);
        }
      }
    }, S = !o && s !== !1 && At(
      {
        type: "Buttons",
        colProps: { flex: "0" },
        labelMode: "icon",
        ...Q.rowButtons,
        methods: g,
        actions: ["add", "delete"]
      },
      s
    ), D = Ie([]), A = (_, x) => {
      const I = [...t.propChain, x], M = B({ ...d ? w : {}, index: x, parent: u, propChain: I }), E = d ? N({
        get: () => u.value[M.index],
        set: (L) => {
          u.value[M.index] = L;
        }
      }) : T(_);
      M.refData = E;
      const U = /* @__PURE__ */ new Map();
      let F;
      d ? (F = { ...y }, Object.assign(M, { initialValue: w.initialValue, rules: w.rules })) : h.size === 1 && !y.field && [...Je, "InputGroup", "InputList"].includes(y.type) ? (F = { ...y }, Object.assign(M, {
        initialValue: w.initialValue,
        rules: w.rules,
        listData: w.listData,
        children: He(w.children || /* @__PURE__ */ new Map(), E, I).modelsMap
      })) : (F = { type: f ? "InputGroup" : "Group", initialValue: void 0, span: "auto" }, M.children = He(h, E, I).modelsMap), U.set(F, M), a && (F.label ?? (F.label = i), F.labelSlot ?? (F.labelSlot = m || (({ index: L }) => F.label + String(L + 1)))), S && U.set(S, B({ parent: u, index: x }));
      const $ = B({ parent: u, children: U, index: x, propChain: I });
      return {
        children: $.children,
        model: $,
        refData: E,
        key: Xe(12),
        effectData: B({ parent: r, current: u, index: x })
      };
    };
    if (d)
      H(
        [() => u.value, () => u.value.length, () => [...t.propChain]],
        () => {
          u.value.length === 0 && u.value.push(void 0), D.value = u.value.map((_, x) => {
            const I = c[x];
            return I ? (dt(I.model, [...t.propChain, x], x), I.effectData.index = x, I) : A(_, x);
          }), c = [...D.value];
        },
        { immediate: !0 }
      );
    else {
      const _ = /* @__PURE__ */ new WeakMap();
      H(
        [() => [...u.value], () => u.value.length, () => [...t.propChain]],
        () => {
          u.value.length === 0 && u.value.push({}), D.value = u.value.map((x, I) => {
            let M = _.get(Z(x));
            return M ? (M.refData.value = x, dt(M.model, [...t.propChain, I], I), M.effectData.index = I) : (M = A(x, I), _.set(Z(x), M)), M;
          });
        },
        { immediate: !0 }
      );
    }
    const C = () => D.value.map(({ model: _, effectData: x, key: I }) => k(Te, { model: _, option: { subSpan: "auto", ...n }, effectData: x, key: I }));
    if (o) {
      if (p)
        if (d) {
          const { label: I, labelSlot: M = I } = l[0], E = l[0].breakAfter ?? l[0].wrapping;
          return () => z("space")(
            { direction: E ? "vertical" : "horizontal" },
            {
              default: () => D.value.map(({ refData: U, key: F }, $) => {
                const L = {
                  ...r,
                  parent: r,
                  current: u.value,
                  field: l[0].field,
                  value: U.value,
                  index: $,
                  record: U.value
                };
                return k("span", { key: F }, [ee(M, L), M ? ": " : "", U.value]);
              })
            }
          );
        } else
          return () => D.value.map(({ children: I, key: M }) => k(qe, {
            key: M,
            modelsMap: I,
            option: n,
            effectData: r
          }));
      const _ = {}, x = N(() => new Map(D.value.flatMap(({ children: I }) => [...I])));
      return () => k(qe, {
        option: { ...v, label: i, labelSlot: m },
        modelsMap: x.value,
        effectData: r,
        ..._
      });
    } else if (p) {
      const _ = /* @__PURE__ */ new Map([
        [
          {
            ...v,
            formItemProps: { ...v.formItemProps, style: "margin: 0" },
            label: i,
            labelSlot: m,
            type: "InfoSlot",
            block: !1,
            span: 24,
            // FormItem 对单个与多个子节点采用不同包装；固定根节点，避免 1/2 行切换时重挂首行并清除校验状态。
            render: () => k("div", C())
          },
          t
        ]
      ]);
      return () => k(Te, { model: { children: _ }, option: n, effectData: r });
    } else
      return C;
  }
}), Ta = Y({
  inheritAttrs: !1,
  props: {
    option: { type: Object, required: !0 },
    model: { type: Object, required: !0 },
    effectData: Object,
    isView: Boolean
  },
  setup(e, { attrs: t, slots: n }) {
    return () => {
      const { option: o, model: r, effectData: a, isView: l } = e, { title: s = o.label, buttons: i } = o;
      return z("card")({
        attrs: t,
        slots: n,
        title: n.title || (s ? () => ee(s, a) : void 0),
        extra: n.extra || (i && !l ? () => k(Me, { option: i, effectData: a }) : void 0),
        content: n.default || (() => l ? k(qe, { option: o, modelsMap: r.children, effectData: a }) : k(Te, { option: o, model: r, effectData: a }))
      });
    };
  }
}), Fa = Y({
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
  setup(e, t) {
    var n, o;
    const r = T(), a = gt({
      ...e.schema,
      dataSource: e.dataSource || e.model || ((n = e.schema) == null ? void 0 : n.dataSource),
      attrs: ne({ ...Q.Form }, { ...(o = e.schema) == null ? void 0 : o.attrs })
    });
    se.schemaDiagnostics && e.schema && ft(e.schema, "form", "SuperForm");
    const l = {
      setOption: (f) => {
        var b;
        se.schemaDiagnostics && ft(f, "form", "SuperForm"), Le(a, f), a.attrs = ne(a.attrs, { ...f.attrs }, { ...(b = e.schema) == null ? void 0 : b.attrs });
      }
    };
    Ne("rootSlots", t.slots), t.emit("register", l);
    const s = (f) => {
      r.value = f, t.emit("register", l, f);
    };
    Ft(() => t.expose(r.value));
    const i = N(() => e.isContainer || a.isContainer);
    return () => a.subItems && k(
      he.Form,
      {
        option: a,
        // dataSource: formData.value,
        onRegister: s,
        compact: e.compact,
        ignoreRules: e.ignoreRules,
        class: { "sup-container": i.value }
      },
      tt(a.slots, _e(), t.slots)
    );
  }
});
function $a(e) {
  const [t, n] = qn(), o = Promise.resolve(typeof e == "function" ? e() : e), r = (l, s) => {
    if (l)
      t.value || o.then(l.setOption), t.value = s;
    else
      return (i, m) => k(Fa, { ...i, onRegister: r }, m == null ? void 0 : m.slots);
  }, a = async (l, s) => {
    const i = await n();
    if (l && l in i)
      return typeof i[l] == "function" ? i[l](s) : i[l];
    if (!l)
      return i;
  };
  return [
    r,
    {
      dataSource: N(() => {
        var l;
        return (l = t.value) == null ? void 0 : l.dataSource;
      }),
      getForm: n,
      asyncCall: a,
      getData() {
        var l;
        return le((l = t.value) == null ? void 0 : l.dataSource);
      },
      submit: () => a("submit"),
      validate: () => a("validate"),
      validateField: (l) => a("validateField", l),
      clearValidate: () => a("clearValidate"),
      getNativeInstance: () => a("getNativeInstance"),
      resetFields: (l) => a("resetFields", l),
      setFieldsValue: (l) => a("setFieldsValue", l),
      /**
       * @deprecated 使用`resetFields`
       */
      setData(l) {
        a("resetFields", l);
      }
    }
  ];
}
function Kt(e, { buttons: t, ...n } = {}) {
  const o = T(!1), r = B({ ...n, ...Q.Modal }), a = T(), l = t && (() => k(Me, { option: t, effectData: { modalRef: a } })), s = T(!1), i = () => {
    if (!(s.value || f))
      return s.value = !0, Promise.resolve().then(() => {
        var p;
        return (p = r.onOk) == null ? void 0 : p.call(r);
      }).then((p) => {
        p !== !1 && (o.value = !1);
      }).catch((p) => console.error(p)).finally(() => s.value = !1);
  }, m = () => r.icon ? [r.icon(), ee(r.title)] : ee(r.title);
  let f;
  const b = (...p) => s.value ? Promise.resolve(!1) : f || (f = Promise.resolve().then(() => {
    var u;
    return (u = r.onCancel) == null ? void 0 : u.call(r, ...p);
  }).then((u) => (u !== !1 && (o.value = !1), u)).catch((u) => (console.error(u), !1)).finally(() => {
    f = void 0;
  })), v = (p) => {
    if (p)
      o.value = !0;
    else if (o.value)
      return b();
  };
  return {
    config: r,
    modalRef: a,
    modalSlot: (p, u) => z("modal")(
      {
        ref: a,
        visible: o.value,
        class: "sup-modal",
        "onUpdate:visible": v,
        confirmLoading: s.value,
        ...r,
        title: void 0,
        ...p,
        onOk: i,
        onCancel: b
      },
      { footer: l, title: m, ...u == null ? void 0 : u.slots, ...e && { default: e } }
    ),
    setModal: (p) => {
      Object.assign(r, p);
    },
    closeModal: () => (o.value = !1, De()),
    openModal: async (p) => (Object.assign(r, p), o.value = !0, De())
  };
}
function Kn(e, t) {
  var n;
  const { modalSlot: o, openModal: r, modalRef: a, closeModal: l, setModal: s, config: i } = Kt(e, t), m = gn(), f = document.createElement("div");
  document.body.appendChild(f);
  let b;
  const v = Ke().modal, h = (n = v == null ? void 0 : v.useContext) == null ? void 0 : n.call(v), y = (p) => {
    var u;
    return ((u = v == null ? void 0 : v.wrapContext) == null ? void 0 : u.call(
      v,
      (c = {}) => o({ ...p, ...c }, {}),
      h,
      p
    )) ?? o(p, {});
  }, w = () => {
    Et(null, f), f.remove(), b = null;
  };
  return $t(() => {
    b && w();
  }), {
    modalRef: a,
    openModal: (p) => {
      if (a.value)
        return r(p);
      if (b = wn(y), b.appContext = m == null ? void 0 : m.appContext, Et(b, f), i.destroyOnClose) {
        const u = i.afterClose;
        s({
          afterClose() {
            u == null || u(), w();
          }
        });
      }
      return De(() => r(p));
    },
    modalSlot: o,
    closeModal: l,
    setModal: s
  };
}
function el(e, t = {}) {
  const { title: n, ...o } = e, [r, a] = $a(o), l = Kn(r(), { maskClosable: !1, title: n, ...t });
  return { ...l, openModal: ({ data: i, onOk: m = t.onOk, ...f } = {}) => {
    const b = () => a.submit().then((v) => m ? m(v) : v);
    return a.resetFields(i), l.openModal({ ...f, onOk: b });
  }, formActions: a };
}
const Mt = Y({
  name: "CollectionList",
  inheritAttrs: !1,
  props: {
    option: { type: Object, required: !0 },
    model: { type: Object, required: !0 },
    effectData: { type: Object, required: !0 },
    isView: Boolean
  },
  setup(e, { attrs: t, slots: n }) {
    const o = oe(e.model, "refData"), r = Ie([]), a = /* @__PURE__ */ new WeakMap(), l = T(), s = T([]), i = T(), m = T({}), f = T(0), b = e.option.editModal && Kt(
      () => {
        var u, c, g;
        return k(zn, {
          key: f.value,
          option: {
            ...(u = e.option.editModal) == null ? void 0 : u.form,
            subItems: ((g = (c = e.option.editModal) == null ? void 0 : c.form) == null ? void 0 : g.subItems) || e.option.columns
          },
          dataSource: m.value,
          onRegister: (S) => {
            i.value = S;
          }
        });
      },
      { maskClosable: !1, ...e.option.editModal.modalProps }
    ), v = (u) => {
      De(() => {
        const c = r.value.find((g) => Z(g.model.refData) === Z(u));
        c && (e.option.type === "TabList" && (l.value = c.key), e.option.type === "CollapseList" && !s.value.includes(c.key) && (s.value = [...s.value, c.key]));
      });
    }, h = (u, c) => {
      var g, S;
      if (!(e.isView || !b))
        return m.value = Ve((u == null ? void 0 : u.model.refData) || {}), f.value++, b.openModal({
          title: ((S = (g = e.option.editModal) == null ? void 0 : g.modalProps) == null ? void 0 : S.title) || (u ? "编辑" : "新增"),
          onOk: async () => {
            if (e.isView)
              return;
            const D = await i.value.submit();
            if (u) {
              const A = r.value.indexOf(u);
              if (A < 0)
                throw new Error("当前记录已删除");
              Object.assign(o.value[A], D);
            } else {
              const A = D;
              if (c === null)
                o.value.unshift(A);
              else {
                const C = r.value.indexOf(c);
                if (C < 0)
                  throw new Error("新增位置对应的记录已删除");
                o.value.splice(C + 1, 0, A);
              }
              v(A);
            }
          }
        });
    }, y = {
      add: ({ listItemKey: u } = {}) => {
        if (e.isView)
          return;
        const c = r.value.find((S) => S.key === u);
        if (u !== void 0 && !c)
          throw new Error("新增位置对应的记录已删除");
        if (b)
          return h(void 0, c || null);
        const g = {};
        c ? o.value.splice(r.value.indexOf(c) + 1, 0, g) : o.value.unshift(g), v(g);
      },
      edit: ({ listItemKey: u }) => {
        const c = r.value.find((g) => g.key === u);
        if (c)
          return h(c);
      },
      delete: ({ listItemKey: u }) => {
        const c = r.value.findIndex((g) => g.key === u);
        !e.isView && c >= 0 && o.value.splice(c, 1);
      }
    }, w = be("rootSlots", {}), d = (u, c, g) => {
      if (u !== !1)
        return Un(
          At({ ...Q.rowButtons, actions: g }, u),
          c,
          y,
          w,
          () => !e.isView
        );
    }, p = d(e.option.buttons, e.effectData, ["add"]);
    return H(
      [() => [...o.value], () => [...e.model.propChain]],
      () => {
        var u;
        const c = r.value, g = c.findIndex((C) => C.key === l.value), S = /* @__PURE__ */ new Map(), D = /* @__PURE__ */ new Set();
        r.value = o.value.map((C, _) => {
          const x = Z(C), I = S.get(x) || 0;
          S.set(x, I + 1);
          const M = a.get(x) || [];
          let E = M[I];
          if (!E) {
            const U = T(C), { modelsMap: F } = He(e.model.listData.modelsMap, U, e.model.propChain, _);
            E = {
              key: I ? Xe(12) : Oe(C, String(t.rowKey || "id")) ?? Xe(12),
              model: B({ refData: U, children: F, index: _, propChain: [...e.model.propChain, _] }),
              effectData: B({ parent: e.effectData, current: o, index: _, record: C })
            }, E.buttons = d(
              e.option.rowButtons,
              E.effectData,
              b ? ["add", "edit", "delete"] : ["add", "delete"]
            ), M[I] = E, a.set(x, M);
          }
          return D.has(E.key) && (E.key = Xe(12)), D.add(E.key), E.effectData.listItemKey = E.key, E.model.refData = C, E.effectData.record = C, dt(E.model, [...e.model.propChain, _], _), E.effectData.index = _, E;
        }), r.value.some((C) => C.key === l.value) || (l.value = (u = r.value[Math.min(Math.max(g, 0), r.value.length - 1)]) == null ? void 0 : u.key);
        const A = c.findIndex(
          (C) => s.value.includes(C.key) && !r.value.some((_) => _.key === C.key)
        );
        if (s.value = s.value.filter((C) => r.value.some((_) => _.key === C)), A >= 0 && r.value.length) {
          const C = r.value[Math.min(A, r.value.length - 1)].key;
          s.value.includes(C) || s.value.push(C);
        }
      },
      { immediate: !0 }
    ), () => {
      const { option: u, isView: c } = e, { span: g = 24 } = t, S = { ...t };
      delete S.rowKey, delete S.span;
      const D = u.title ?? u.label, A = !c && p ? () => p.render() : void 0, C = n.title || D || A ? () => z("space")(
        {},
        {
          default: () => [n.title ? n.title() : ee(D, e.effectData), A == null ? void 0 : A()]
        }
      ) : void 0, _ = r.value.map((I, M) => ({
        key: I.key,
        title: () => ee(u.titleField ? Oe(I.model.refData, u.titleField) : String(M + 1), I.effectData),
        extra: !c && u.type !== "TabList" && I.buttons ? () => I.buttons.render() : void 0,
        content: () => c || b ? k(qe, { option: u, modelsMap: I.model.children, effectData: I.effectData }) : k(Te, { option: u, model: I.model, effectData: I.effectData })
      })), x = () => _.length ? u.type === "TabList" ? z("tabs")({
        attrs: S,
        items: _,
        activeKeys: l.value,
        onActiveChange: (I) => {
          l.value = I;
        },
        extra: c ? void 0 : () => {
          var I, M;
          return (M = (I = r.value.find((E) => E.key === l.value)) == null ? void 0 : I.buttons) == null ? void 0 : M.render();
        }
      }) : u.type === "CollapseList" ? z("collapse")({
        attrs: S,
        items: _,
        activeKeys: s.value,
        onActiveChange: (I) => {
          s.value = Array.isArray(I) ? I : [I];
        }
      }) : z("row")(
        { gutter: u.gutter ?? [16, 16], ...u.rowProps },
        {
          default: () => _.map(
            (I) => z("col")(
              { key: I.key, span: g },
              {
                default: () => z("card")({
                  attrs: S,
                  title: I.title,
                  extra: I.extra,
                  content: I.content
                })
              }
            )
          )
        }
      ) : z("empty")();
      return [z("group")({ title: C, content: x }), b && k(b.modalSlot)];
    };
  }
}), Va = Y({
  inheritAttrs: !1,
  props: {
    option: {
      required: !0,
      type: Object
    },
    model: {
      required: !0,
      type: Object
    },
    effectData: {
      type: Object,
      required: !0
    },
    isView: Boolean,
    rowKey: String,
    labelIndex: Boolean
  },
  setup(e, t) {
    const { model: n, isView: o, effectData: r, labelIndex: a, rowKey: l = "" } = e, { columns: s, rowButtons: i, slots: m, ...f } = e.option, { modelsMap: b, rules: v } = n.listData, h = oe(n, "refData"), y = {
      add: {
        icon: () => me("add"),
        onClick({ index: g }) {
          h.value.splice(g + 1, 0, {}), h.value = [...Z(h.value)];
        }
      },
      delete: {
        hidden: () => h.value.length === 1,
        disabled: !1,
        confirmText: "",
        icon: () => me("remove"),
        onClick({ index: g }) {
          h.value = h.value.filter((S, D) => D !== g);
        }
      }
    }, w = !o && i !== !1 && At(
      {
        type: "Buttons",
        labelMode: "icon",
        ...Q.rowButtons,
        methods: y,
        actions: ["add", "delete"]
      },
      i
    ), d = /* @__PURE__ */ new WeakMap(), p = T([]);
    H(
      [() => [...h.value], () => [...n.propChain]],
      () => {
        const g = h.value;
        g.length === 0 && g.push({}), p.value = g.map((S, D) => {
          const A = Z(S), C = d.get(A);
          if (C)
            return C.refData.value = S, dt(C.model, [...n.propChain, D], D), C.effectData.index = D, C;
          const _ = T(S), { modelsMap: x } = He(b, _, n.propChain, D), I = {
            key: S[l] || Xe(12),
            refData: _,
            model: B({ refData: _, children: x, index: D, propChain: [...n.propChain, D] }),
            effectData: B({
              parent: r,
              current: h,
              index: D,
              record: S
            })
          };
          return d.set(A, I), I;
        });
      },
      {
        immediate: !0
      }
    );
    const u = {
      ...f,
      type: "Group",
      buttons: w,
      subItems: s
    }, c = f.title || f.label;
    return typeof c == "string" && a && (u.title = ({ index: g }) => c + String(g + 1)), () => p.value.map(({ model: g, effectData: S, key: D }) => k(he.Group, { model: g, option: u, effectData: S, key: D, isView: o }, t.slots));
  }
}), Na = /* @__PURE__ */ Y({
  name: "ExTabs",
  inheritAttrs: !1,
  props: {
    option: {
      type: Object,
      required: !0
    },
    model: {
      type: Object,
      required: !0
    },
    effectData: {
      type: Object,
      required: !0
    },
    isView: Boolean
  },
  setup(e, {
    attrs: t,
    slots: n
  }) {
    const o = T(e.option.activeKey), r = [], a = (s, i, m) => {
      r[s] = m ? void 0 : i, m && o.value === i && (o.value = r.find(Boolean));
    }, l = [...e.model.children].map(([s, i], m) => {
      const {
        key: f,
        field: b,
        label: v,
        icon: h
      } = s, y = _e({
        parent: e.effectData,
        current: oe(i, "parent"),
        field: i.refName,
        value: i.refData
      }), {
        hidden: w,
        attrs: d
      } = Ce({
        option: s,
        effectData: y
      }), p = f || b || String(m), u = () => [h == null ? void 0 : h(), ee(v, y)];
      return $e(() => a(m, p, W(w) || W(d.disabled))), {
        attrs: B(d),
        key: p,
        title: u,
        hidden: w,
        option: s,
        model: i,
        effectData: y
      };
    });
    return Ft(() => {
      o.value ?? (o.value = r.find(Boolean));
    }), () => z("tabs")({
      attrs: t,
      slots: n,
      content: n.default,
      activeKeys: o.value,
      onActiveChange: (s) => {
        o.value = s;
      },
      extra: n.extra || (!e.isView && e.option.buttons ? () => k(Me, {
        option: e.option.buttons,
        effectData: e.effectData
      }) : void 0),
      // 显隐和禁用属于 Schema 语义，两个 Adapter 消费相同的有效子项。
      items: l.filter(({
        hidden: s
      }) => !s.value).map(({
        attrs: s,
        key: i,
        title: m,
        option: f,
        model: b,
        effectData: v
      }) => ({
        key: i,
        attrs: s,
        title: m,
        disabled: W(s.disabled),
        content: () => e.isView ? k(qe, {
          option: f,
          modelsMap: b.children,
          effectData: v
        }) : k(Te, {
          option: f,
          model: b,
          effectData: v
        })
      }))
    });
  }
}), it = (e, ...t) => fo(e, ...t, (n, o, r, a) => {
  if (o === void 0)
    a[r] = void 0;
  else if (Array.isArray(n))
    return o;
});
function Ba({
  childrenMap: e,
  orgList: t,
  listener: n,
  rowEditor: o,
  rowKey: r
}) {
  const a = Ie(), l = N(() => {
    var d;
    return !!((d = a.value) != null && d.isEdit);
  }), s = (d) => {
    const p = a.value;
    return p != null && p.isEdit && r(d) === p.key ? p : {
      isEdit: !1
    };
  }, i = N(() => {
    const d = [...t.value], p = a.value;
    if (!(p != null && p.isEdit))
      return d;
    if (p.isNew) {
      const u = p.anchorKey === void 0 ? d.length - 1 : d.findIndex((c) => r(c) === p.anchorKey);
      d.splice(u < 0 ? Math.min(p.index, d.length) : u + 1, 0, p.record);
    } else
      d.some((u) => r(u) === p.key) || d.splice(Math.min(p.index, d.length), 0, p.record);
    return d;
  }), m = (d, p, u) => {
    const c = B(Ve(p)), {
      modelsMap: g
    } = Nn(Z(e), c);
    a.value = gt({
      record: d,
      key: r(d),
      editData: c,
      modelsMap: g,
      forms: gt({}),
      isEdit: !0,
      saving: !1,
      ...u
    });
  }, f = {
    add({
      index: d,
      record: p,
      resetData: u
    } = {}) {
      if (l.value)
        return;
      const c = p ?? (d === void 0 ? void 0 : t.value[d]);
      if (d !== void 0 && !c)
        throw new Error("新增位置已失效，请重新选择插入位置");
      const g = {
        ...u
      }, S = c && r(c), D = c ? t.value.findIndex((A) => r(A) === S) + 1 : t.value.length;
      m(g, g, {
        isNew: !0,
        index: D,
        anchorKey: S
      });
    },
    edit({
      record: d,
      selectedRows: p,
      resetData: u
    }) {
      if (l.value)
        return;
      const c = d || (p == null ? void 0 : p[0]), g = c ? t.value.findIndex((S) => r(S) === r(c)) : -1;
      if (g < 0)
        throw new Error("编辑记录已不存在，请重新选择");
      m(t.value[g], it({}, t.value[g], u), {
        isNew: !1,
        index: g
      });
    },
    delete({
      record: d,
      selectedRows: p
    }) {
      if (!l.value)
        return n.onDelete(d ? [d] : p);
    }
  }, b = {
    add: {
      disabled: () => l.value,
      onClick: f.add
    },
    edit: {
      disabled: (d) => {
        var p;
        return l.value || !(d.record || ((p = d.selectedRows) == null ? void 0 : p.length) === 1);
      },
      onClick: f.edit
    },
    delete: {
      disabled: (d) => {
        var p;
        return l.value || !(d.record || ((p = d.selectedRows) == null ? void 0 : p.length) > 0);
      },
      onClick: f.delete
    }
  }, v = [{
    label: "保存",
    loading: !0,
    onClick: async (d) => {
      var p;
      const {
        record: u
      } = d, c = s(u);
      if (!(!c.isEdit || c.saving)) {
        c.saving = !0;
        try {
          const g = de("form");
          if (await Promise.all(Object.values(c.forms).map((A) => g.validate(A))), await ((p = o == null ? void 0 : o.onSave) == null ? void 0 : p.call(o, {
            ...d,
            isNew: c.isNew
          })) === !1)
            return !1;
          const D = Ve(Z(c.editData));
          if (c.isNew) {
            const A = c.anchorKey === void 0 ? void 0 : t.value.findIndex((C) => r(C) === c.anchorKey);
            if (A === -1)
              throw new Error("新增锚点已不存在，请取消后重新选择插入位置");
            await n.onSave(D, A), c.isNew = !1;
          } else {
            const A = t.value.find((C) => r(C) === c.key);
            if (!A)
              throw new Error("编辑记录已被移除，请取消本次编辑");
            await n.onUpdate(D, A);
          }
          c.isEdit = !1, a.value = void 0;
        } catch (g) {
          throw g instanceof Error && de("services").message("error", g.message), g;
        } finally {
          c.saving = !1;
        }
      }
    }
  }, {
    label: "取消",
    disabled: ({
      record: d
    }) => s(d).saving,
    onClick: async (d) => {
      var p;
      const u = s(d.record);
      if (!(!u.isEdit || u.saving)) {
        u.saving = !0;
        try {
          if (await ((p = o == null ? void 0 : o.onCancel) == null ? void 0 : p.call(o, {
            ...d,
            isNew: u.isNew
          })) === !1)
            return;
          u.isEdit = !1, a.value = void 0;
        } finally {
          u.saving = !1;
        }
      }
    }
  }], h = (d, p) => s(d.record).isEdit ? k(Me, {
    key: "edit",
    option: {
      ...p,
      actions: v
    },
    effectData: d
  }) : null, y = /* @__PURE__ */ Y({
    props: {
      option: {
        type: Object,
        required: !0
      },
      editInfo: {
        type: Object,
        required: !0
      },
      viewRender: {
        type: Function
      }
    },
    setup({
      option: d,
      editInfo: p,
      viewRender: u
    }) {
      const {
        editable: c = !0
      } = d, {
        modelsMap: g,
        forms: S
      } = p, D = g.get(Z(d)), {
        index: A,
        parent: C,
        refData: _
      } = Be(D), x = D.propChain.join("."), I = _e({
        current: C,
        value: _,
        index: A
      }), {
        attrs: M,
        hidden: E,
        nativeAttrs: U,
        disabled: F
      } = Ce({
        option: d,
        effectData: I
      }), $ = N(() => !E.value && (et(c) ? c(I) : c)), L = xt(d, D, I, M, {
        attrs: U,
        disabled: F
      }), K = ct(D.rules, I), J = N(() => W(M.disabled) || W(E) ? [] : K);
      return () => $.value ? z("form")({
        ref: (V) => {
          V ? S[x] = V : delete S[x];
        },
        model: p.editData
      }, {
        default: () => z("formItem")({
          name: D.propChain,
          rules: J.value,
          wrapperCol: {}
        }, {
          default: L
        })
      }) : u ? u({
        ...I,
        isView: !0
      }) : _.value;
    }
  });
  return {
    list: i,
    methods: f,
    buttonMethods: b,
    getEditRender: (d, p) => {
      if (Ht(d.type) === "enhanced" || It(d.type) || d.type === "InputSlot")
        return ({
          record: u
        }) => {
          const c = s(u);
          if (c.isEdit)
            return k(y, {
              key: c.key,
              option: d,
              editInfo: c,
              viewRender: p
            });
        };
    },
    editButtonsSlot: h
  };
}
function La({ rowKey: e, option: t, listener: n, orgList: o }) {
  const r = Ie(), a = t.rowEditor, l = (a == null ? void 0 : a.form) || t.editForm || t.formSchema || {};
  l.subItems = l.subItems || t.columns.filter((d) => {
    var p;
    return !(d.hideInForm || (p = d.exclude) != null && p.includes("form"));
  });
  let s;
  const i = (d) => {
    r.value ? r.value.resetFields(d) : s = d;
  }, m = () => k(he.Form, {
    option: l,
    onRegister: (d) => {
      if (r.value = d, d && s) {
        const p = s;
        s = void 0, d.resetFields(p);
      }
    }
  }), f = {
    ...Q.Modal,
    maskClosable: !1,
    ...t.modalProps,
    ...a == null ? void 0 : a.modalProps
  }, { modalSlot: b, openModal: v, closeModal: h } = Kt(m, f), y = ({ meta: d, ...p }) => ee(f.title, { meta: d, ...p }) || `${l.title ? l.title + " - " : ""}  ${d.title || d.label}`;
  return { modalSlot: b, methods: {
    add(d = {}) {
      const { meta: p = {}, resetData: u, index: c } = d;
      let g = d.record ?? (c === void 0 ? void 0 : o.value[c]);
      (c !== void 0 || d.record) && (!g || !o.value.some((A) => e(A) === e(g))) && (console.warn("[SuperForm] 新增位置已失效，将追加到末尾"), g = void 0);
      const S = g && e(g), D = { ...u };
      return i(D), p.title ?? (p.title = "新增"), p.name = "add", p.isNew = !0, v({
        ...p,
        title: y({ ...d, source: D, meta: p }),
        onOk: async () => r.value.submit().then(async (A) => {
          var C;
          if (await ((C = a == null ? void 0 : a.onSave) == null ? void 0 : C.call(a, { ...d, source: A, meta: p })) === !1)
            return !1;
          let x = S === void 0 ? void 0 : o.value.findIndex((I) => e(I) === S);
          return x === -1 && (console.warn("[SuperForm] 新增锚点已不存在，将追加到末尾"), x = void 0), n.onSave(A, x);
        }),
        onCancel: async () => {
          var A;
          return await ((A = a == null ? void 0 : a.onCancel) == null ? void 0 : A.call(a, { ...d, meta: p })) === !1 ? !1 : h();
        }
      });
    },
    async edit(d) {
      var p, u;
      const { record: c, selectedRows: g, resetData: S, meta: D = {} } = d, A = c || g[0];
      if (!A)
        return Promise.reject(new Error("未选择记录"));
      const C = await ((u = (p = t.apis) == null ? void 0 : p.info) == null ? void 0 : u.call(p, e(A), A)), _ = it({}, A, C, S);
      return i(_), Le(D, { name: "edit", title: "编辑", isNew: !1 }), v({
        ...D,
        title: y({ ...d, source: _, meta: D }),
        onOk: async () => r.value.submit().then(async (x) => {
          var I;
          return await ((I = a == null ? void 0 : a.onSave) == null ? void 0 : I.call(a, { ...d, source: x, meta: D })) === !1 ? !1 : n.onUpdate(x, A);
        }),
        onCancel: async () => {
          var x;
          return await ((x = a == null ? void 0 : a.onCancel) == null ? void 0 : x.call(a, { ...d, meta: D })) === !1 ? !1 : h();
        }
      });
    },
    delete({ record: d, selectedRows: p }) {
      const u = d ? [d] : p;
      return n.onDelete(u);
    }
  } };
}
function qa({
  model: e,
  orgList: t,
  editableRef: n,
  rowKey: o
}) {
  const {
    modelsMap: r
  } = e.listData, a = oe(e, "propChain", []), l = /* @__PURE__ */ new WeakMap(), s = (b, v) => {
    const h = Z(b), y = [...a.value, v];
    let w = l.get(h);
    if (w)
      dt(w.model, y, v);
    else {
      const {
        modelsMap: d,
        rootModels: p
      } = Nn(Z(r), b, a.value, v);
      w = {
        key: Symbol(),
        modelsMap: d,
        model: B({
          children: p,
          index: v,
          propChain: y
        })
      }, l.set(h, w);
    }
    return w;
  };
  H([() => [...t.value], () => [...a.value]], ([b]) => {
    b.forEach(s);
  }, {
    immediate: !0,
    flush: "sync"
  });
  const i = {
    add({
      index: b,
      record: v,
      resetData: h
    } = {}) {
      const y = {
        ...h
      }, w = v ? t.value.findIndex((d) => o(d) === o(v)) : b;
      if (w !== void 0) {
        if (!t.value[w])
          throw new Error("新增位置已失效，请重新选择插入位置");
        t.value.splice(w + 1, 0, y);
      } else
        t.value.push(y);
    }
    // delete({ record }) {
    //   const orgIdx = orgList.value.indexOf(record)
    //   orgList.value.splice(orgIdx, 1)
    // },
  }, m = /* @__PURE__ */ Y({
    inheritAttrs: !1,
    props: {
      option: {
        type: Object,
        required: !0
      }
    },
    setup({
      option: b
    }, v) {
      const {
        record: h
      } = v.attrs, y = N(() => l.get(Z(h)).modelsMap.get(b)), {
        index: w,
        parent: d,
        refData: p
      } = Be(y.value), u = _e({
        current: d,
        value: p,
        list: t,
        record: h,
        index: w
      }), {
        editable: c = !0
      } = b, {
        attrs: g,
        hidden: S,
        nativeAttrs: D,
        disabled: A
      } = Ce({
        option: b,
        effectData: u
      }), C = N(() => !S.value && n.value && (et(c) ? c(u) : c)), _ = xt(b, y.value, u, g, {
        attrs: D,
        disabled: A
      }), x = vt(b, B({
        ...Be(u),
        isView: !0
      })), I = ct(y.value.rules, u), M = I && N(() => W(g.disabled) ? void 0 : I);
      return () => C.value ? z("formItem")({
        wrapperCol: {},
        name: y.value.propChain,
        rules: M == null ? void 0 : M.value
      }, {
        default: _
      }) : x ? x() : p.value;
    }
  });
  return {
    list: t,
    methods: i,
    getEditRender: (b) => {
      if (Ht(b.type) === "enhanced" || It(b.type) || b.type === "InputSlot" && b.editable !== !1)
        return (v) => {
          const h = t.value.findIndex((w) => Z(w) === Z(v.record)), y = s(v.record, h < 0 ? v.index : h);
          return k(m, {
            key: y.key,
            option: b,
            ...v
          });
        };
    }
  };
}
function Ua(e, t, n) {
  const o = T({}), { title: r, apis: a } = e, { modalProps: l, ...s } = e.descriptionsProps || {}, i = () => k(Ma, { option: { descriptionsProps: s }, modelsMap: t, source: o }), m = {
    ...Q.Modal,
    footer: null,
    ...e.modalProps,
    ...l
  }, f = (h) => ee(m.title, h) || `${r ? r + " - " : ""}详情`, { openModal: b, modalSlot: v } = Kn(i, m);
  return {
    detailSlot: v,
    openDetail: async ({ record: h, selectedRows: y, meta: w = {}, ...d }) => {
      const p = h || y[0];
      if (a != null && a.info) {
        const u = await a.info(n(p), p);
        o.value = Object.assign({}, p, u);
      } else
        o.value = p;
      w.name = "detail", b({ ...w, title: f({ ...d, source: o.value, meta: w }) });
    }
  };
}
function za({ option: e, model: t, orgList: n, rowKey: o, listener: r, isView: a, effectData: l }) {
  const { modelsMap: s } = t.listData, i = {
    list: n,
    modalSlot: [],
    methods: {
      delete({ record: d, selectedRows: p }) {
        const u = d ? [d] : p;
        return r.onDelete(u);
      }
    }
  }, { edit: m, editable: f = m, rowEditor: b } = e, { editMode: v, addMode: h } = b || e;
  if (!a && f) {
    const d = N(() => et(f) ? f(l) : f), { methods: p, ...u } = qa({ model: t, orgList: n, editableRef: d, rowKey: o });
    Object.assign(i.methods, p), Object.assign(i, u);
  } else if (v === "inline") {
    const { list: d, methods: p, buttonMethods: u, editButtonsSlot: c, getEditRender: g } = Ba({
      childrenMap: s,
      orgList: n,
      listener: r,
      rowEditor: b,
      rowKey: o
    });
    i.list = d, Object.assign(i.methods, p), Object.assign(i, { buttonMethods: u, editButtonsSlot: c, getEditRender: g });
  }
  if (v === "modal" || h === "modal") {
    const { modalSlot: d, methods: p } = La({ rowKey: o, option: e, listener: r, orgList: n });
    i.methods.edit ? (i.methods.add = p.add, i.buttonMethods || (i.buttonMethods = {}), i.buttonMethods.add = p.add) : Object.assign(i.methods, p), i.modalSlot.push(d);
  }
  const { detailSlot: y, openDetail: w } = Ua(e, s, o);
  return i.modalSlot.push(y), i.methods.detail = w, i;
}
const Ka = Y({
  props: {
    effectData: Object,
    options: null,
    bordered: Boolean,
    activeKey: [String, Number, Object],
    defaultActiveKey: [String, Number],
    customTab: Function,
    slots: Object
  },
  emits: ["update:activeKey"],
  setup(e, { attrs: t, slots: n, emit: o }) {
    const { optionsRef: r } = Ct(e.options, e.effectData), a = T(e.activeKey ?? e.defaultActiveKey), l = (c) => {
      a.value = c, o("update:activeKey", c);
    }, {
      default: s,
      extra: i,
      rightExtra: m,
      tabBarExtraContent: f,
      tabBarExtra: b,
      title: v,
      titleBar: h,
      ...y
    } = n, w = tt(e.slots, e.effectData), d = b || m || f, p = N(() => {
      var c;
      const g = r.value.map(({ value: S, label: D, ...A }) => ({
        ...A,
        key: A.key ?? S,
        tab: A.tab ?? D
      }));
      return a.value === void 0 && l((c = g[0]) == null ? void 0 : c.key), g;
    }), u = (c) => ee(w.customTab || e.customTab || c.tab, {
      ...e.effectData,
      item: c
    });
    return () => [
      !e.bordered && v ? h == null ? void 0 : h() : null,
      z("tableFilter")(
        {
          bordered: e.bordered,
          items: p.value.map((c) => ({
            ...c,
            tab: u(c)
          })),
          value: a.value,
          onValueChange: l,
          attrs: t
        },
        {
          ...y,
          ...w,
          default: s,
          title: v,
          tabExtra: d || (v ? void 0 : i),
          cardExtra: d || v ? i : void 0
        }
      )
    ];
  }
}), Ha = Y({
  props: {
    option: { type: Object, required: !0 },
    effectData: { type: Object, required: !0 }
  },
  setup(e) {
    const t = e.option, { field: n, editable: o } = e.option, r = B({});
    H(
      () => e.effectData,
      (d) => Object.assign(r, d),
      { immediate: !0 }
    );
    const a = n.split(".").slice(0, -1), l = N(() => Oe(r.record, a)), s = N({
      get: () => Oe(r.record, n),
      set: (d) => ut(r.record, n, d)
    }), i = { parent: l, refData: s }, { attrs: m, hidden: f, nativeAttrs: b, disabled: v } = Ce({
      option: t,
      effectData: { ...r, inTable: !0 }
    }), h = xt(t, i, r, m, { attrs: b, disabled: v }), y = N(() => et(o) ? o(r) : W(o)), w = vt(t, r);
    return () => f.value ? "" : y.value ? k("div", { class: "editable-cell" }, h()) : w ? w() : s.value;
  }
}), Ga = (e) => {
  if (!e.editable)
    return;
  const t = se.buttonRoles && se.buttonRoles() || [];
  if ((!e.roleName || t.includes(e.roleName)) && (Ht(e.type) === "enhanced" || It(e.type) || e.type === "InputSlot"))
    return (o) => k(Ha, { option: e, effectData: { ...o } });
};
function Wa({
  childrenMap: e,
  context: t,
  option: n,
  attrs: o,
  isView: r,
  effectData: a
}) {
  const { methods: l, buttonMethods: s, getEditRender: i, editButtonsSlot: m } = t, f = _e({ list: a.value, isView: r, parent: a }), b = (n.rowEditor || n).editMode !== "modal", v = function w(d = e) {
    const p = [];
    return [...d].forEach(([u, c]) => {
      var g, S;
      if (u.type === "Hidden" || u.hideInTable || u.hidden === !0 || (g = u.exclude) != null && g.includes("table"))
        return;
      const D = nt(u, f);
      if (c.children) {
        const A = w(c.children);
        u.ignoreTableTitle ? p.push(...A) : p.push({
          title: D,
          children: A
        });
      } else {
        const A = {
          title: D,
          key: u.field || u.label,
          dataIndex: c.propChain.length > 1 ? c.propChain : c.propChain[0]
        };
        u.options || u.type === "Switch" || (S = u.type) != null && S.includes("Picker") ? A.align = "center" : u.type === "InputNumber" && (A.align = "right"), Object.assign(A, u.columnProps), Le(A, n.columnProps, Q.Column);
        const C = A.customRender || vt(u) || void 0, _ = i ? i(u, C) : b ? Ga(u) : void 0;
        A.customRender = Ya(C, _, f), p.push(A);
      }
    }), p;
  }(), h = Xa(n, o);
  h && v.unshift(h);
  const y = Qa({
    buttons: n.rowButtons,
    // 行内编辑需要覆盖新增/编辑/删除的禁用状态，但不能丢失详情等通用动作。
    methods: { ...l || {}, ...s || {} },
    editButtonsSlot: m,
    isView: r,
    effectData: f
  });
  return y && (Le(y, n.columnProps, Q.Column), v.push(y)), v;
}
function Ya(e, t, n) {
  if (t || e) {
    const o = (r) => {
      const a = (t == null ? void 0 : t(r)) ?? (e == null ? void 0 : e({ ...r, isView: !0 })) ?? String(r.text ?? "");
      return a && typeof a == "string" && r.column.ellipsis ? k("span", { title: a }, a) : a;
    };
    return (r) => k(o, { ...n, ...r, current: r.record });
  } else
    return ({ text: o }) => String(o ?? "");
}
function Qa({ buttons: e, methods: t, editButtonsSlot: n, isView: o, effectData: r }) {
  const a = At(Q.rowButtons || {}, e), { columnProps: l, ...s } = a, i = _t({ config: s, methods: t, isView: o });
  if (!i)
    return;
  const m = (f) => (n == null ? void 0 : n(f, s)) || i({ key: f.record, effectData: f });
  return {
    title: "操作",
    key: "action",
    fixed: "right",
    minWidth: 100,
    width: 100,
    align: "center",
    resizable: !1,
    ...l,
    customRender: (f) => k(m, { ...r, ...f, current: f.record })
  };
}
const Xa = (e, t) => {
  var n;
  const o = e.indexColumn ?? ((n = Q.Table) == null ? void 0 : n.indexColumn);
  if (o)
    return {
      key: "INDEX",
      title: "序号",
      width: 60,
      align: "center",
      customRender: ({ index: r }) => {
        var a, l;
        return ((((a = t.pagination) == null ? void 0 : a.current) || 1) - 1) * (((l = t.pagination) == null ? void 0 : l.pageSize) || 10) + r + 1;
      },
      ...je(o) && o
    };
}, Za = Y({
  name: "SuperTable",
  inheritAttrs: !1,
  props: {
    option: {
      required: !0,
      type: Object
    },
    model: {
      required: !0,
      type: Object
    },
    effectData: {
      required: !0,
      type: Object
    },
    isView: Boolean,
    reload: Function,
    expandedRowKeys: Array,
    defaultExpandLevel: null
  },
  emits: ["register", "expandedRowsChange"],
  setup({ option: e, model: t, reload: n, effectData: o, isView: r, ...a }, l) {
    var s, i, m;
    const f = ((s = e.rowEditor) == null ? void 0 : s.editMode) === "inline", b = l.attrs, v = /* @__PURE__ */ new WeakMap(), h = b.rowKey || "id", y = (R) => {
      const O = typeof h == "function" ? h(R) : R[h];
      if (O != null)
        return O;
      const P = Z(R);
      return v.has(P) || v.set(P, Xe(12)), v.get(P);
    }, w = oe(t, "refData"), d = ((i = e.attrs) == null ? void 0 : i.rowSelection) || void 0, p = d == null ? void 0 : d.selectedRowKeys, u = ze(p) ? p : T(p || []), c = T([]), {
      selectedRowKeys: g,
      onChange: S,
      getCheckboxProps: D,
      ...A
    } = d || {}, C = d && {
      attrs: {
        fixed: !0,
        ...A
      },
      onChange: (R, O, P) => {
        var q;
        if (d != null && d.preserveSelectedRowKeys) {
          const j = x(), X = c.value.filter((ue) => !j.has(y(ue))), re = new Map([...X, ...O].map((ue) => [y(ue), ue]));
          R = [.../* @__PURE__ */ new Set([...X.map(y), ...R])], O = R.map((ue) => re.get(ue)).filter(Boolean);
        }
        R.length === u.value.length && R.every((j, X) => j === u.value[X]) && O.length === c.value.length && O.every((j, X) => j === c.value[X]) || (u.value = R, c.value = O, (q = d == null ? void 0 : d.onChange) == null || q.call(d, R, O, P));
      },
      isRowSelectable: (R) => {
        var O, P;
        return f && !w.value.includes(R) ? !1 : !((P = (O = d == null ? void 0 : d.getCheckboxProps) == null ? void 0 : O.call(d, R)) != null && P.disabled);
      }
    }, _ = b.childrenColumnName || "children", x = () => {
      const R = /* @__PURE__ */ new Map(), O = (P) => P.forEach((q) => {
        R.set(y(q), q), Array.isArray(q[_]) && O(q[_]);
      });
      return O(w.value), R;
    };
    H(
      () => [x(), [...u.value]],
      ([R, O]) => {
        var P;
        const q = d == null ? void 0 : d.preserveSelectedRowKeys, j = q ? [...O] : O.filter((ve) => R.has(ve)), X = new Map(c.value.map((ve) => [y(ve), ve])), re = j.map((ve) => R.get(ve) ?? (q ? X.get(ve) : void 0)).filter((ve) => !!ve);
        (j.length !== O.length || re.length !== c.value.length || re.some((ve, Se) => ve !== c.value[Se])) && (c.value = re, j.length !== O.length && (u.value = j), (P = d == null ? void 0 : d.onChange) == null || P.call(d, j, re, { type: "none" }));
      },
      { immediate: !0 }
    );
    const I = (R, O = 0, P = 1) => {
      const q = [], j = O === P;
      return R.forEach((X) => {
        X[_] && (q.push(y(X)), j || q.push(...I(X[_], O, P + 1)));
      }), q;
    }, M = T(((m = e.attrs) == null ? void 0 : m.expandedRowKeys) || []), E = (R) => {
      M.value = R, l.emit("expandedRowsChange", R);
    };
    (a.defaultExpandLevel || b.defaultExpandAllRows) && H(
      w,
      (R, O) => {
        R.length && !(O != null && O.length) && E(I(R, Number(a.defaultExpandLevel)));
      },
      { immediate: !0 }
    );
    const F = za({
      option: e,
      model: t,
      orgList: w,
      rowKey: y,
      listener: {
        async onSave(R, O) {
          var P;
          if ((P = e.apis) != null && P.save)
            return await e.apis.save(R), R.parentId && (M.value = [...M.value, R.parentId]), n == null ? void 0 : n();
          O !== void 0 ? w.value.splice(O + 1, 0, R) : w.value.push(R);
        },
        async onUpdate(R, O) {
          var P;
          const q = y(O), j = () => w.value.findIndex((re) => y(re) === q);
          if (j() < 0)
            throw new Error("编辑记录已被移除，请取消本次编辑");
          (P = e.apis) != null && P.update && await e.apis.update(R);
          const X = j();
          if (X < 0)
            throw new Error("保存期间记录已被移除，请刷新确认服务端结果");
          return Object.assign(w.value[X], R), n == null ? void 0 : n();
        },
        async onDelete(R) {
          var O, P;
          const q = R.map((j) => y(j));
          try {
            await ((P = (O = e.apis) == null ? void 0 : O.delete) == null ? void 0 : P.call(O, q, R));
          } catch (j) {
            return console.error(j), j;
          }
          return C && (u.value = u.value.filter((j) => !q.includes(j)), c.value = c.value.filter((j) => !q.includes(y(j)))), R.forEach((j) => {
            const X = y(j), re = w.value.findIndex((ue) => ue === j || y(ue) === X);
            re !== -1 && w.value.splice(re, 1);
          }), n == null ? void 0 : n();
        }
      },
      isView: r,
      effectData: o
    }), $ = Wa({
      childrenMap: t.listData.modelsMap,
      context: F,
      option: e,
      attrs: b,
      isView: r,
      effectData: o
    }), { list: L, methods: K, buttonMethods: J = K, modalSlot: V } = F, te = {
      selectedRowKeys: u,
      selectedRows: c,
      setSelectedRows: (R) => {
        c.value = R, u.value = R.map((O) => y(O));
      },
      expandedRowKeys: M,
      setExpandedRowKeys: E,
      expandAll: () => {
        E(I(w.value));
      },
      add: (R) => {
        var O;
        return (O = K.add) == null ? void 0 : O.call(K, R);
      },
      edit: (R) => {
        var O;
        return (O = K.edit) == null ? void 0 : O.call(K, { ...xe, ...R });
      },
      delete: () => {
        var R;
        return (R = K.delete) == null ? void 0 : R.call(K, xe);
      },
      detail: (R) => {
        var O;
        return (O = K.detail) == null ? void 0 : O.call(K, { ...xe, ...R });
      }
    }, ce = B({ ...te }), ye = T();
    H(
      ye,
      (R) => {
        Object.assign(ce, R, te), l.emit("register", ce);
      },
      { flush: "sync" }
    );
    const xe = B({
      ...o,
      selectedRows: c,
      selectedRowKeys: u,
      tableRef: ce
    }), ge = { ...l.slots }, fe = e.buttons, Ee = (fe == null ? void 0 : fe.targetSlot) ?? (fe == null ? void 0 : fe.forSlot) ?? "extra";
    if (fe) {
      const R = ge[Ee], O = _t({
        config: fe,
        effectData: xe,
        methods: J,
        isView: r
      });
      (R || O) && (ge[Ee] = () => [R == null ? void 0 : R(), O == null ? void 0 : O()]);
    }
    const Ue = e.title || e.label, { title: pe = Ue, extra: Ae, ...Fe } = ge, we = (pe || Ae) && (() => z("row")(
      { align: "middle", class: "sup-titlebar" },
      {
        default: () => [
          pe && z("col")(
            { class: "sup-title" },
            {
              default: nt({ labelSlot: pe, tooltip: e.tooltip }, o)
            }
          ),
          Ae && z("col")(
            {
              class: "sup-title-buttons",
              flex: 1,
              style: { textAlign: (fe == null ? void 0 : fe.align) || "right" }
            },
            { default: Ae }
          )
        ]
      }
    ));
    Fe.headerCell = (R) => {
      var O;
      return ((O = ge.headerCell) == null ? void 0 : O.call(ge, R)) || ee(R.title, o);
    };
    const ae = () => {
      const { rowSelection: R, expandedRowKeys: O, ...P } = b;
      return [
        ...V.map((q) => q()),
        z("table")(
          {
            ...Q.Table,
            ref: ye,
            data: L.value,
            columns: B($),
            tableLayout: "fixed",
            pagination: !1,
            ...P,
            selection: C && {
              ...C,
              selectedKeys: u.value
            },
            rowKey: y,
            expandedKeys: M.value,
            onExpandedChange: E,
            class: ["sup-table-wrapper", e.editable && "sup-table-editable"]
          },
          Fe
        )
      ];
    };
    return e.tabs ? () => k(Ka, { ...e.tabs, effectData: o }, {
      [Ee]: ge[Ee],
      title: pe && (() => ee(pe, o)),
      extra: Ae,
      titleBar: we,
      default: ae
    }) : () => [we == null ? void 0 : we(), ae()];
  }
}), Ja = /* @__PURE__ */ Y({
  name: "ExCollapse",
  inheritAttrs: !1,
  props: {
    option: {
      type: Object,
      required: !0
    },
    model: {
      type: Object,
      required: !0
    },
    effectData: {
      type: Object,
      required: !0
    },
    isView: Boolean
  },
  setup(e, {
    attrs: t,
    slots: n
  }) {
    var o;
    const r = e.option.title || e.option.label, a = [...e.model.children].map(([s, i], m) => {
      const f = _e({
        parent: e.effectData,
        current: oe(e.model, "parent"),
        field: i.refName,
        value: i.refData
      }), {
        hidden: b,
        attrs: {
          disabled: v,
          ...h
        }
      } = Ce({
        option: s,
        effectData: f
      }), {
        key: y,
        field: w
      } = s;
      return {
        attrs: B(h),
        option: s,
        effectData: f,
        model: i,
        header: () => {
          var d;
          return [(d = s.icon) == null ? void 0 : d.call(s), ee(s.label, f)];
        },
        key: y || w || String(m),
        hidden: b,
        disabled: v
      };
    }), l = T(e.option.activeKey || ((o = a[0]) == null ? void 0 : o.key));
    return () => z("collapse")({
      attrs: t,
      slots: n,
      content: n.default,
      title: n.title || (r ? () => ee(r, e.effectData) : void 0),
      activeKeys: l.value,
      onActiveChange: (s) => {
        l.value = s;
      },
      items: a.filter(({
        hidden: s
      }) => !s.value).map(({
        attrs: s,
        option: i,
        disabled: m,
        model: f,
        header: b,
        effectData: v,
        key: h
      }) => ({
        key: h,
        attrs: s,
        title: b,
        disabled: W(m),
        extra: !e.isView && i.buttons ? () => k(Me, {
          option: i.buttons,
          effectData: v
        }) : void 0,
        content: () => e.isView ? k(qe, {
          option: i,
          modelsMap: f.children,
          effectData: v
        }) : k(Te, {
          option: i,
          model: f,
          effectData: v
        })
      }))
    });
  }
}), er = /* @__PURE__ */ Y({
  __name: "Preview",
  props: {
    images: {},
    visible: { type: Boolean },
    current: {},
    width: {},
    height: {}
  },
  emits: ["update:value"],
  setup(e, { emit: t }) {
    const n = t, o = e, r = (l) => {
      n("update:value", l);
    }, a = () => z("preview")({
      images: o.images,
      visible: o.visible,
      current: o.current,
      width: o.width,
      height: o.height,
      "onUpdate:visible": r
    });
    return (l, s) => (ke(), Qe(a));
  }
});
function tr(e) {
  const t = T(!1), n = B({
    visible: t,
    images: [],
    "onUpdate:value": (i) => t.value = i,
    ...e
  }), o = T(!1), r = () => !o.value && k(er, n), a = gn();
  $t(() => {
    o.value = !0;
  });
  let l;
  return { open: (i) => {
    if (typeof i == "string")
      n.images = [i];
    else if (Array.isArray(i))
      n.images = [...i];
    else {
      const { src: m, ...f } = i || {};
      m && (n.images = [m]), Object.assign(n, f);
    }
    if (!l) {
      const m = document.createElement("div");
      l = wn(r, { appContext: a == null ? void 0 : a.appContext }), l.appContext = a == null ? void 0 : a.appContext, Et(l, m);
    }
    De(() => t.value = !0);
  } };
}
function nr(e, t) {
  return new Promise((n, o) => {
    const r = new FileReader();
    t === "text" ? r.readAsText(e) : r.readAsDataURL(e), r.onload = () => n({ result: r.result, file: e }), r.onerror = (a) => o(a);
  });
}
function or(e, t, n) {
  const o = typeof n < "u" ? [n, e] : [e], r = new Blob(o, { type: "application/octet-stream" }), a = window.URL.createObjectURL(r), l = document.createElement("a");
  l.style.display = "none", l.href = a, l.setAttribute("download", t), typeof l.download > "u" && l.setAttribute("target", "_blank"), document.body.appendChild(l), l.click(), document.body.removeChild(l), window.URL.revokeObjectURL(a);
}
function ar(e, t) {
  return t.split(",").some((n) => {
    var o;
    return ((o = e.name) == null ? void 0 : o.endsWith(n)) || e.type && new RegExp(`^${n.replace("*", "\\S*")}$`).test(e.type);
  });
}
function rr(e) {
  const { mode: t, valueKey: n, infoNames: o, maxCount: r, accept: a, minSize: l, maxSize: s, repeatable: i } = e, m = {
    ...n && { [n]: n },
    uid: "uid",
    status: "status",
    url: "url",
    name: "name",
    ...o
  };
  t === "custom" && (m.originFileObj = "originFileObj");
  const f = /* @__PURE__ */ new Map(), b = /* @__PURE__ */ new Map(), v = /* @__PURE__ */ new Map();
  return {
    clearTask: (D) => {
      f.delete(D), b.delete(D);
    },
    convertInfo: (D) => {
      const A = { status: "done", ...D };
      return Object.entries(m).forEach(([C, _]) => {
        _ && _ !== C && _ in A && (A[C] = A[_], delete A[_]);
      }), A;
    },
    getValue: (D, A) => {
      if (A) {
        const C = D[0];
        return n ? (C == null ? void 0 : C[n]) ?? (C == null ? void 0 : C[m.uid]) : C;
      }
      return n ? D.map((C) => C[n] ?? C[m.uid]) : D;
    },
    hasPendingWork: (D) => v.size > 0 || t === "auto" && D.some((A) => A.status === "uploading") || t === "submit" && D.some((A) => A.status !== "done"),
    queueDelete: (D, A) => v.set(D, A),
    reconvert: (D) => {
      const A = {};
      return Object.entries(m).forEach(([C, _]) => {
        const x = D[C];
        _ && x !== void 0 && (A[_] = x);
      }), A;
    },
    registerRequest: (D, A) => {
      if (t === "auto") {
        const C = A();
        return f.set(D, C), C;
      }
      t === "submit" && b.set(D, A);
    },
    submit: async (D) => {
      let A = Promise.resolve();
      if (t === "auto") {
        const _ = D.find((x) => x.status === "error");
        if (_)
          throw _.response || { message: "文件上传错误，请删除后重新上传！" };
        A = Promise.all(f.values());
      } else if (t === "submit") {
        const _ = D.filter((x) => x.status !== "done").map((x) => {
          var I;
          return x.status = "uploading", (I = b.get(x.uid)) == null ? void 0 : I();
        }).filter(Boolean);
        A = Promise.all(_);
      }
      const C = await A;
      return await Promise.all([...v.values()].map((_) => _())).catch((_) => console.error(_)), C;
    },
    validate: (D, A, C) => {
      if (r > 1 && C.length + A.indexOf(D) >= r)
        return `文件数量最多${r}`;
      if (a && !ar(D, a))
        return "请选择正确的文件类型！";
      if (l || s) {
        const _ = (D.size || 0) / 1024 / 1024;
        if (l && l > _)
          return `文件最小需要${l}M`;
        if (s && s < _)
          return `文件最大不超过${s}M`;
      }
      if (!i) {
        const _ = C.find((x) => x.name === D.name);
        if (_)
          return `文件重复: ${_.name}`;
      }
    }
  };
}
const lr = ".png,.jpg,.jpeg,.gif,.webp,.svg,.tif,.tiff";
function sr(e) {
  var t, n, o, r;
  if (e.thumbUrl)
    return !0;
  if (e.url || e.originFileObj) {
    const a = (n = (t = e.name || e.url) == null ? void 0 : t.match(/[^\\.]*$/)) == null ? void 0 : n[0];
    if (a && lr.includes(a))
      return !0;
    {
      const l = e.type || ((r = (o = e.url) == null ? void 0 : o.match(/^data:(\S*?);/)) == null ? void 0 : r[1]);
      return l == null ? void 0 : l.startsWith("image");
    }
  }
}
function un(e, t) {
  const n = de("services").info({
    title: () => e,
    okButtonProps: {
      loading: !0
    },
    closable: !1,
    centered: !0,
    maskClosable: !1,
    keyboard: !1,
    onOk: t
  });
  return { setError: (r, a) => {
    n.update({
      icon: () => me("error"),
      okButtonProps: {
        loading: !1
      },
      type: "error",
      title: r,
      content: a == null ? void 0 : a.message
    });
  }, ...n };
}
const ir = Y({
  props: {
    option: { type: Object, required: !0 },
    model: Object,
    effectData: { type: Object, required: !0 },
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
  setup(e, t) {
    const {
      uploadMode: n = "auto",
      apis: o = {},
      isSingle: r,
      minSize: a,
      maxSize: l,
      infoNames: s,
      repeatable: i,
      showUploadList: m,
      onPreview: f,
      onDownload: b,
      isImageUrl: v = sr,
      hideOnMax: h,
      valueKey: y
    } = e, w = (r ? 1 : e.maxCount) || 1 / 0, { accept: d, listType: p } = t.attrs, u = rr({
      mode: n,
      valueKey: y,
      infoNames: s,
      maxCount: w,
      accept: d,
      minSize: a,
      maxSize: l,
      repeatable: i
    }), c = tr(), { convertInfo: g, reconvert: S } = u, { onSubmit: D } = be("exaProvider", {}), A = T([]), C = Ie([]), _ = Ie(), x = (O) => {
      C.value = O.map(S), e.isView || (t.emit("update:fileList", C.value), I()), A.value = O;
    }, I = () => {
      _.value = u.getValue(Z(C.value), !!e.isSingle), t.emit("update:value", _.value);
    };
    H(
      () => Z(e.value),
      (O) => {
        if (O !== _.value)
          if (_.value = O, !O)
            A.value = [];
          else {
            const P = io(O) ? O : [O];
            C.value = y ? P.map((q) => ({ [y]: q })) : P, A.value = C.value.map(g);
          }
      },
      { immediate: !0, flush: "sync" }
    ), H(
      () => Z(e.fileList),
      (O) => {
        if (O && O !== C.value) {
          const P = O.map(g);
          x(P);
        }
      },
      { immediate: !0 }
    );
    const M = T(!1), E = D == null ? void 0 : D(() => {
      if (M.value = u.hasPendingWork(A.value), M.value) {
        const O = un(" 文件同步中，请稍候...");
        return u.submit(A.value).then((P) => (O.destroy(), P)).catch((P) => (M.value = !1, O.setError("文件上传失败", P), !1)).finally(() => M.value = !1);
      }
      return u.submit(A.value);
    });
    E && oo(E);
    const U = (O, P) => {
      if (e.beforeUpload) {
        const j = e.beforeUpload(O, P);
        if (j !== void 0)
          return j;
      }
      const q = u.validate(O, P, A.value);
      if (q)
        return de("services").message("error", q), de("upload").listIgnore;
      if (n === "custom") {
        if (m !== !1)
          return !1;
      } else if (w === 1 && A.value.length) {
        const j = A.value[0];
        if (u.clearTask(j.uid), j.status === "done" && o.delete) {
          const X = { ...C.value[0] };
          u.queueDelete(X, () => o.delete(X));
        }
      }
    };
    function F({ file: O, fileList: P, event: q }) {
      var j;
      O.status === "removed" ? u.clearTask(O.uid) : O.status === "uploading" && !q && n !== "auto" && (O.status = "waiting"), (j = e.onChange) == null || j.call(e, { file: O, fileList: P, event: q }), x([...P]);
    }
    const $ = (O) => {
      const { file: P } = O;
      if (n === "auto")
        return u.registerRequest(P.uid, () => J(O));
      if (n === "submit")
        u.registerRequest(P.uid, () => J(O));
      else if (n === "base64" || n === "text")
        return nr(P, n).then(({ result: q }) => K({ url: q }, P));
    }, L = (O, P) => {
      const q = A.value.find((j) => j.uid === P.uid);
      return Object.assign(q, { error: O, status: "error" }), x([...A.value]), Promise.reject(O);
    }, K = (O, P) => {
      const q = A.value.find((j) => j.uid === P.uid);
      return Object.assign(q, g(O), { status: "done" }), x([...A.value]), O;
    }, J = (O) => {
      const { file: P, filename: q, onProgress: j, onError: X, onSuccess: re } = O;
      if (!o.upload)
        return Promise.resolve().then(() => L(Error("Api config error"), P));
      const ue = new FormData();
      ue.append(q, P);
      const ve = (Se) => {
        Se.total > 0 && (Se.percent = Se.loaded / Se.total * 100), j(Se);
      };
      return o.upload(ue, { onUploadProgress: ve }).then(
        (Se) => K(Se, P),
        (Se) => L(Se, P)
      );
    }, V = async (O) => {
      var P;
      let q = await ((P = e.onRemove) == null ? void 0 : P.call(e, O));
      return q !== !1 && o.delete && O.status === "done" ? new Promise((j) => {
        const X = de("services").confirm({
          title: "确定删除吗？",
          okText: "确定",
          cancelText: "取消",
          closable: !1,
          maskClosable: !1,
          ...Q.Modal,
          onOk() {
            const re = S(O), ue = () => o.delete(re);
            if (n === "submit")
              u.queueDelete(
                re,
                () => ue()
                // .then(
                //   () => removeFileMap.delete(__file)
                //   // () => updateFileList([...innerFileList.value, __file]) // 删除失败后还原文件
                // )
              ), j(!0);
            else
              return X.update({
                okCancel: !1,
                title: "文件删除中……"
              }), ue().then(j, () => (X.update({
                okCancel: !1,
                title: "文件删除失败",
                type: "error",
                onOk: void 0
              }), j(!1), Promise.reject()));
          },
          onCancel() {
            j(!1);
          }
        });
      }) : q;
    }, te = T(!1), ce = b || ((O) => {
      if (o.download && !te.value) {
        const P = un("文件下载中，请稍候...");
        o.download(S(O)).then((q) => or(q, O.name)).then(() => P.destroy()).catch((q) => {
          P.setError("文件下载失败", q);
        }).finally(() => M.value = !1);
      }
    }), ye = N(
      () => typeof m == "boolean" ? m : {
        showRemoveIcon: !e.isView && !e.disabled,
        showDownloadIcon: e.isView,
        ...m
      }
    ), xe = async (O) => {
      if (f) {
        const P = await f(S(O));
        P && c.open(P);
      } else if (v(O)) {
        let P;
        const q = A.value.filter((j) => v(j)).map((j, X) => {
          j === O && (P = X);
          const re = j.url || j.thumbUrl;
          return !re && j.originFileObj && (j.objectUrl = window.URL.createObjectURL(j.originFileObj)), re || j.objectUrl;
        });
        c.open({ images: q, current: P });
      }
    }, ge = ({ file: O, listType: P }) => O.status === "waiting" ? me("sync") : O.status === "uploading" ? me("loading") : me("attachment"), fe = e.title, Ee = typeof e.title == "string" ? e.title : "上传文件", Ue = B({ ...Z(e.effectData), fileList: A }), pe = et(fe) && (() => fe(Ue)), Ae = [];
    d && Ae.push("支持文件格式：" + d), l && Ae.push("单个文件不超过" + l + "MB");
    const Fe = e.tip ?? Ae.join(", "), we = { ...t.slots };
    p === "picture-card" ? we.default = () => {
      var O, P;
      return ((P = (O = t.slots).default) == null ? void 0 : P.call(O, Ue)) || k("div", [me("add"), pe ? pe() : k("div", { style: "margin-top:8px" }, Ee)]);
    } : we.default = () => {
      var O, P;
      return [
        ((P = (O = t.slots).default) == null ? void 0 : P.call(O, Ue)) || z("uploadTrigger")(
          {},
          { default: () => [me("upload"), pe ? pe() : Ee] }
        ),
        Fe && k("div", { class: "sup-upload-tip" }, Fe)
      ];
    };
    const ae = N(() => e.disabled || e.isView), R = N(() => h && w && A.value.length >= w);
    return () => ae.value && A.value.length === 0 ? k("div", { class: "sup-upload-tip" }, "暂无附件") : z("upload")(
      {
        class: { "upload-disabled": ae.value },
        customRequest: $,
        beforeUpload: U,
        fileList: A.value,
        onChange: F,
        onPreview: xe,
        onRemove: V,
        showUploadList: ye.value,
        maxCount: w,
        isImageUrl: v,
        iconRender: ge,
        onDownload: ce
      },
      {
        ...we,
        default: () => ae.value || (R.value ? null : we.default())
      }
    );
  }
}), ur = /* @__PURE__ */ Y({
  inheritAttrs: !1,
  __name: "TagInput",
  props: {
    option: {},
    model: {},
    effectData: {},
    value: {},
    stringifyValue: { type: Boolean },
    newLabel: { default: "添加" },
    isView: { type: Boolean },
    closable: { type: Boolean, default: !0 }
  },
  emits: ["update:value"],
  setup(e, { emit: t }) {
    const n = e, o = t, r = T(), a = T(""), l = T(!1), s = N(() => $n("Input")), i = () => {
      const p = s.value, u = {
        type: "Input",
        option: n.option,
        model: n.model,
        effectData: n.effectData,
        state: {},
        binding: { value: a.value, "onUpdate:value": (g) => a.value = g }
      }, c = p.getAttrs(
        {
          ref: (g) => r.value = g,
          class: "sup-tag-input",
          onBlur: d
        },
        n.option,
        u.state
      );
      return p.render({ ...u, attrs: c, slots: {} });
    }, m = (p, u) => typeof n.closable == "function" ? n.closable(p, u) : n.closable, f = N(() => n.value ? typeof n.value == "string" ? n.value.split(",") : n.value : []), b = () => {
      l.value = !0, De(() => {
        r.value.focus();
      });
    }, v = (p) => {
      const u = f.value.filter((c) => c !== p);
      w(u);
    }, h = (p, u) => {
      const c = z("tag")(
        {
          removable: m(p, u),
          onRemove: () => v(p)
        },
        { default: () => p.length > 20 ? `${p.slice(0, 20)}...` : p }
      );
      return p.length > 20 ? z("tooltip")({ title: p }, { default: () => c }) : c;
    }, y = () => z("tag")(
      { class: "sup-tag-add", onClick: b },
      { default: () => [me("add"), ee(n.newLabel, n.effectData)] }
    ), w = (p) => {
      n.stringifyValue ? o("update:value", p.join(",")) : o("update:value", p);
    }, d = () => {
      a.value && f.value.indexOf(a.value) === -1 && w([...f.value, a.value]), l.value = !1, a.value = "";
    };
    return (p, u) => (ke(), yt(Pt, null, [
      (ke(!0), yt(Pt, null, Sn(f.value, (c, g) => (ke(), Qe(rt(() => h(c, g)), { key: c }))), 128)),
      l.value ? (ke(), Qe(rt(i), { key: 0 })) : (ke(), Qe(rt(y), { key: 1 }))
    ], 64));
  }
}), cr = {
  key: 1,
  class: "sup-tag-select-empty"
}, dr = /* @__PURE__ */ Y({
  inheritAttrs: !1,
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
  setup(e, { emit: t }) {
    const n = e, o = t, { optionsRef: r } = Ct(n.option.options, n.effectData), a = N(() => n.option.options === void 0 ? n.options ?? [] : r.value), l = N(() => {
      const { value: f } = n, b = n.stringifyValue;
      return f === void 0 ? [] : b ? f.split(",") : Array.isArray(f) ? f : [f];
    }), s = (f, b) => {
      const v = n.multiple ? b ? [...l.value, f] : l.value.filter((h) => h !== f) : [f];
      o("check", f, b), m(v), o("change", f, v);
    }, i = (f, b) => z("checkableTag")(
      {
        class: "tag-select",
        selected: l.value.includes(b),
        onSelectedChange: (v) => s(b, v)
      },
      { default: () => f }
    ), m = (f) => {
      n.multiple ? n.stringifyValue ? o("update:value", f.join(",")) : o("update:value", f) : o("update:value", f[0]);
    };
    return (f, b) => a.value.length ? (ke(!0), yt(Pt, { key: 0 }, Sn(a.value, ({ label: v, value: h }) => (ke(), Qe(rt(() => i(v, h)), { key: h }))), 128)) : (ke(), yt("div", cr, ro(e.placeholder), 1));
  }
}), Hn = {
  Form: zn,
  Group: Ot,
  Card: Ta,
  CardList: Mt,
  TabList: Mt,
  CollapseList: Mt,
  GroupList: Va,
  Tabs: Na,
  Table: Za,
  Collapse: Ja,
  Descriptions: Ot,
  Fragment: Ot
}, fr = {
  InputGroup: Ra,
  InputList: ja,
  Upload: ir,
  TagInput: ur,
  TagSelect: dr
}, Je = Object.keys(Hn), pr = {
  ...Hn,
  ...fr
}, mt = {}, kt = {}, wt = /* @__PURE__ */ new Set();
function Gn(e) {
  return typeof e == "object" && e && "component" in e ? e : { component: e };
}
function Wn(e, t, n, o = []) {
  const r = /* @__PURE__ */ new Set([...On, ...o]);
  Object.entries(t).forEach(([a, l]) => {
    if (l) {
      if (r.has(a))
        throw new Error(`Schema 类型 '${a}' 为 Core 保留类型，不能注册为 ${n} 组件`);
      e[a] = { ...Gn(l), source: n };
    }
  });
}
function Yn(e, t = []) {
  Wn(mt, e, "custom", [...wt, ...t]);
}
function vr(e) {
  const t = new Set(e);
  for (const n of Object.keys(mt))
    if (t.has(n))
      throw new Error(`Schema 类型 '${n}' 已注册为项目组件，不能再由 UIAdapter 接管`);
  wt.clear(), t.forEach((n) => wt.add(n));
}
function tl(e, t = []) {
  const n = Object.fromEntries(
    Object.entries(e).map(([a, l]) => [a, l && Gn(l).component])
  );
  Rn(n, "auto");
  const o = new Set(t), r = Object.fromEntries(
    Object.entries(e).filter(([a]) => !On.has(a) && !o.has(a))
  );
  Wn(kt, r, "auto");
}
function St(e) {
  return mt[e] || kt[e];
}
function It(e) {
  return !!St(e);
}
function mr() {
  return [.../* @__PURE__ */ new Set([...Object.keys(mt), ...Object.keys(kt)])];
}
function Ht(e, t = []) {
  var n, o;
  return Dn.includes(e) ? "core" : wt.has(e) || new Set(t).has(e) ? "enhanced" : ((n = mt[e]) == null ? void 0 : n.source) || ((o = kt[e]) == null ? void 0 : o.source);
}
function Qn(e, t) {
  const { prop: n = "value", event: o = "update:value" } = e.model || {}, r = { ...t };
  if (n !== "value" && (r[n] = r.value, delete r.value), o !== "update:value") {
    const a = o.startsWith("on") ? o : `on${o[0].toUpperCase()}${o.slice(1)}`;
    r[a] = r["onUpdate:value"], delete r["onUpdate:value"];
  }
  return r;
}
const he = pr, Q = {};
let cn = !1, dn;
function br(e) {
  if (dn) {
    Xt(e);
    return;
  }
  vr(e.supportedFields), Xt(e), dn = e, cn || (pt(Q, e.defaults || {}), cn = !0);
}
function hr(e) {
  return br(e), e;
}
function gr(e = {}) {
  const { defaultProps: t, ...n } = e;
  Object.assign(se, n), t && Xn(t);
}
function yr(e, t) {
  Yn({ [e]: t });
}
function wr(e) {
  Yn(e);
}
function Xn(e) {
  pt(Q, e);
}
const fn = {
  useAdapter: hr,
  configure: gr,
  registerComponent: yr,
  registerComponents: wr,
  setDefaultProps: Xn
};
class Sr extends Error {
  constructor(t, n) {
    super(t.flatMap((o) => o.messages)[0] || "表单校验失败"), this.fields = t, this.cause = n, this.name = "FormValidationError";
  }
}
const pn = Symbol.for("superform.official-product");
function Cr(e, t) {
  let n = !1;
  const o = {
    ...fn,
    initialize(r = {}) {
      const a = r.components, l = Object.keys(a || {});
      if (n) {
        if (l.length || r.overrides)
          throw new Error(`SuperForm '${e}' 已初始化，不能再追加字段组件或覆盖 UI 协议`);
        return o;
      }
      const s = Tn(t(a), r.overrides);
      for (const f of l)
        if (!s.supportedFields.includes(f))
          throw new Error(`UIAdapter '${s.name}' 未声明字段 '${f}'，不能初始化对应 UI 组件`);
      const i = globalThis, m = i[pn];
      if (m && m !== e)
        throw new Error(`SuperForm 已初始化官方产品 '${String(m)}'，不能再初始化 '${e}'`);
      return fn.useAdapter(s), i[pn] = e, n = !0, o;
    }
  };
  return o;
}
const Zn = {
  Input: "ElInput",
  TextArea: "ElInput",
  InputPassword: "ElInput",
  InputSearch: "ElInput",
  InputNumber: "ElInputNumber",
  InputOtp: "ElInputOtp",
  InputTag: "ElInputTag",
  Autocomplete: "ElAutocomplete",
  Mention: "ElMention",
  Select: "ElSelect",
  SelectV2: "ElSelectV2",
  Cascader: "ElCascader",
  TreeSelect: "ElTreeSelect",
  Radio: "ElRadio",
  RadioGroup: "ElRadioGroup",
  Checkbox: "ElCheckbox",
  CheckboxGroup: "ElCheckboxGroup",
  Switch: "ElSwitch",
  DatePicker: "ElDatePicker",
  DateRangePicker: "ElDatePicker",
  TimePicker: "ElTimePicker",
  TimeRangePicker: "ElTimePicker",
  TimeSelect: "ElTimeSelect",
  ColorPicker: "ElColorPicker",
  Rate: "ElRate",
  Slider: "ElSlider",
  Segmented: "ElSegmented",
  Transfer: "ElTransfer"
}, Jn = Object.keys(Zn), vn = /* @__PURE__ */ new Map(), _r = Object.fromEntries(
  Jn.map((e) => {
    const t = Zn[e], n = vn.get(t) ?? e;
    return vn.set(t, n), [e, n];
  })
), xr = Y({
  name: "ElementPlusInputSearchField",
  inheritAttrs: !1,
  props: Fn,
  setup(e, { slots: t }) {
    const n = jn("InputSearch"), o = (r) => {
      var a, l;
      e.attrs.disabled || e.attrs.loading || (l = (a = e.attrs).onSearch) == null || l.call(a, String(e.attrs.modelValue ?? ""), r);
    };
    return () => {
      const { enterButton: r, loading: a, onSearch: l, ref: s, ...i } = e.attrs, m = k(n, ne(i, {
        onKeydown: (f) => {
          f.key !== "Enter" || f.isComposing || f.repeat || f.defaultPrevented || (f.preventDefault(), o(f));
        }
      }), {
        ...t,
        append: t.append ?? (() => k(lt, {
          nativeType: "button",
          disabled: i.disabled,
          loading: a,
          "aria-label": "搜索",
          onClick: o
        }, { default: () => {
          var f;
          return ((f = t.enterButton) == null ? void 0 : f.call(t)) ?? (typeof r == "string" ? r : r ? "搜索" : Pe.search());
        } }))
      });
      return s ? Cn(m, { ref: s }, !0) : m;
    };
  }
}), Ar = Y({
  name: "ElementPlusTreeSelectField",
  inheritAttrs: !1,
  props: Fn,
  setup(e, { slots: t }) {
    const n = jn("TreeSelect"), o = Ie();
    return e.option.labelField && H(
      () => {
        var r, a;
        return W((a = (r = o.value) == null ? void 0 : r.selectRef) == null ? void 0 : a.selectedLabel);
      },
      (r) => {
        var a, l;
        r !== void 0 && ((l = (a = e.binding)["onUpdate:labelValue"]) == null || l.call(a, r));
      },
      { flush: "post" }
    ), () => {
      const r = e.state.treeData === void 0 ? e.attrs : { ...e.attrs, data: e.state.treeData }, a = k(n, r, t);
      return Cn(a, { ref: o }, !0);
    };
  }
}), eo = { prop: "modelValue", event: "update:modelValue" }, kr = Lt(eo), ht = ({ placeholder: e, ...t }) => {
  const [n, o] = Array.isArray(e) ? e : [e, e];
  return {
    ...t,
    startPlaceholder: t.startPlaceholder === void 0 ? n : t.startPlaceholder,
    endPlaceholder: t.endPlaceholder === void 0 ? o : t.endPlaceholder
  };
}, Ir = la(
  {
    TextArea: { fixedProps: { type: "textarea" } },
    InputPassword: {
      fixedProps: { type: "password" },
      defaults: { showPassword: !0 }
    },
    InputSearch: {
      render: ({ slots: e, ...t }) => k(xr, t, e)
    },
    Switch: {
      processors: ["switch"],
      adaptProps(e, { state: t }) {
        const n = t.switch;
        return n ? {
          ...e,
          activeValue: n.checked.value,
          inactiveValue: n.unchecked.value,
          activeText: n.checked.label,
          inactiveText: n.unchecked.label
        } : e;
      }
    },
    Select: {
      processors: ["options"]
    },
    SelectV2: {
      processors: ["options"]
    },
    RadioGroup: { processors: ["options"] },
    CheckboxGroup: { processors: ["options"] },
    TreeSelect: {
      processors: ["tree"],
      render: ({ slots: e, ...t }) => k(Ar, t, e)
    },
    DatePicker: {
      processors: ["picker"],
      // 原始组件允许用户选择模式；固定别名不经过这个分支。
      adaptProps: (e, t) => typeof e.type == "string" && e.type.endsWith("range") ? ht(e) : e
    },
    DateRangePicker: {
      fixedProps: { type: "daterange" },
      processors: ["range"],
      adaptProps: ht
    },
    TimePicker: {
      processors: ["picker"],
      adaptProps: (e, t) => e.isRange ? ht(e) : e
    },
    TimeRangePicker: {
      fixedProps: { isRange: !0 },
      processors: ["range"],
      adaptProps: ht
    }
  },
  eo
), Dr = Y({
  props: { state: { type: Object, required: !0 } },
  setup(e) {
    return () => {
      const t = e.state;
      return k(
        po,
        {
          ...t.attrs,
          column: t.column,
          border: t.mode === "table" ? !0 : t.attrs.border,
          direction: t.layout || t.attrs.direction,
          size: t.size === "small" || t.size === "large" || t.size === "default" ? t.size : void 0
        },
        {
          default: () => t.rows.flatMap(
            (n) => n.map(
              (o) => k(
                vo,
                {
                  ...o.attrs,
                  key: o.key,
                  span: o.colspan
                },
                { label: o.label, default: o.content }
              )
            )
          )
        }
      );
    };
  }
});
function to(e) {
  return k(
    _n,
    ne(e.attrs || {}, {
      modelValue: e.activeKeys,
      "onUpdate:modelValue": e.onActiveChange
    }),
    {
      ...e.slots,
      default: e.content || (() => e.items.map(
        (t) => k(
          xn,
          { ...t.attrs, key: t.key, name: t.key, disabled: t.disabled },
          {
            label: () => {
              var n;
              return [
                (n = t.title) == null ? void 0 : n.call(t),
                t.extra && k("span", { onClick: (o) => o.stopPropagation() }, [t.extra()])
              ];
            },
            default: t.content
          }
        )
      ))
    }
  );
}
const Or = Y({
  props: { state: { type: Object, required: !0 } },
  setup(e) {
    const t = T(), n = T(0), o = T(0);
    let r;
    return Ft(() => {
      const a = t.value;
      if (!a)
        return;
      const l = () => {
        n.value = a.offsetWidth, o.value = a.offsetHeight;
      };
      l(), !(typeof ResizeObserver > "u") && (r = new ResizeObserver(l), r.observe(a));
    }), Vt(() => r == null ? void 0 : r.disconnect()), () => {
      var l, s, i;
      const a = ((l = e.state.attrs) == null ? void 0 : l.tabPosition) || "top";
      return k(
        "div",
        {
          class: ["sup-tabs-with-extra", `sup-tabs-with-extra-${a}`],
          style: {
            "--sup-tabs-extra-width": `${n.value}px`,
            "--sup-tabs-extra-height": `${o.value}px`
          }
        },
        [
          to(e.state),
          k("div", { ref: t, class: "sup-tabs-bar-extra" }, [(i = (s = e.state).extra) == null ? void 0 : i.call(s)])
        ]
      );
    };
  }
}), Mr = (e) => e.extra ? k(Or, { state: e }) : to(e), Er = Mr, Pr = (e) => [
  e.title && k("div", { class: ["sup-titlebar", "sup-title"] }, [e.title()]),
  k(
    mo,
    ne(e.attrs || {}, {
      modelValue: e.activeKeys,
      "onUpdate:modelValue": e.onActiveChange
    }),
    {
      ...e.slots,
      default: e.content || (() => e.items.map(
        (t) => k(
          bo,
          {
            ...t.attrs,
            key: t.key,
            name: t.key,
            disabled: t.disabled
          },
          {
            title: () => {
              var n;
              return [
                (n = t.title) == null ? void 0 : n.call(t),
                t.extra && k(
                  "span",
                  {
                    style: { marginLeft: "auto" },
                    onClick: (o) => o.stopPropagation()
                  },
                  [t.extra()]
                )
              ];
            },
            default: t.content
          }
        )
      ))
    }
  )
], Rr = Pr, jr = Y({
  inheritAttrs: !1,
  props: ["data", "pagination", "tableRef"],
  setup(e, { attrs: t, slots: n }) {
    const o = N(() => {
      const { data: r, pagination: a } = e, l = (a == null ? void 0 : a.pageSize) || 10, s = (((a == null ? void 0 : a.current) || 1) - 1) * l;
      return a && r.length > l ? r.slice(s, s + l) : r;
    });
    return () => Fr({ ...t, data: e.data, pagination: e.pagination, ref: e.tableRef }, n, o.value);
  }
}), Tr = ({ ref: e, ...t }, n = {}) => k(jr, { ...t, tableRef: e }, n), Fr = (e, t, n) => {
  var A;
  const { data: o, columns: r = [], selection: a, expandedKeys: l, onExpandedChange: s, pagination: i, rowKey: m, scroll: f, ref: b, ...v } = e, h = (C) => typeof m == "function" ? m(C) : C[m], y = (C, _) => (Array.isArray(_) ? _ : String(_).split(".")).reduce((x, I) => x == null ? void 0 : x[I], C), w = (C) => C.map((_) => {
    const { dataIndex: x, title: I, children: M, customRender: E, key: U, ...F } = _;
    return k(
      Gt,
      {
        ...F,
        key: U ?? (Array.isArray(x) ? x.join(".") : x),
        prop: Array.isArray(x) ? x.join(".") : x
      },
      M != null && M.length ? {
        header: () => {
          var $;
          return ($ = t.headerCell) == null ? void 0 : $.call(t, { ..._, title: I });
        },
        default: () => w(M)
      } : {
        header: () => {
          var $;
          return ($ = t.headerCell) == null ? void 0 : $.call(t, { ..._, title: I });
        },
        default: ({ row: $, $index: L }) => {
          const K = (E == null ? void 0 : E({
            text: y($, x),
            record: $,
            index: L,
            column: _
          })) ?? y($, x);
          return K == null ? [] : Array.isArray(K) ? K : [K];
        }
      }
    );
  });
  let d = !0;
  const p = (C) => {
    !C || !a || De(() => {
      var I;
      d = !0, (I = C.clearSelection) == null || I.call(C);
      const _ = new Set(a.selectedKeys), x = (M) => M.forEach((E) => {
        var U;
        _.has(h(E)) && ((U = C.toggleRowSelection) == null || U.call(C, E, !0)), Array.isArray(E.children) && x(E.children);
      });
      x(n), d = !1;
    });
  }, c = k(
    ho,
    {
      ...v,
      ref: (C) => {
        p(C), typeof b == "function" ? b(C) : b && typeof b == "object" && (b.value = C);
      },
      data: n,
      rowKey: m,
      maxHeight: ((A = W(f)) == null ? void 0 : A.y) ?? v.maxHeight,
      expandRowKeys: l,
      onExpandChange: (C, _) => {
        if (Array.isArray(_)) {
          s == null || s(_.map(h));
          return;
        }
        const x = new Set(l || []), I = h(C);
        _ ? x.add(I) : x.delete(I), s == null || s([...x]);
      },
      onSelectionChange: (C) => {
        var E;
        if (d || !a)
          return;
        const _ = new Set(n.map(h)), x = new Set(a.selectedKeys), M = [...o.filter((U) => x.has(h(U)) && !_.has(h(U))), ...C];
        (E = a.onChange) == null || E.call(a, M.map(h), M, {});
      }
    },
    {
      ...t,
      default: () => {
        var C;
        return [
          a && k(Gt, {
            type: "selection",
            fixed: ((C = a.attrs) == null ? void 0 : C.fixed) ?? !0,
            selectable: a.isRowSelectable,
            ...a.attrs
          }),
          ...w(r)
        ];
      }
    }
  );
  if (!i)
    return c;
  const { small: g, ...S } = i.attrs || {}, D = {
    currentPage: i.current,
    pageSize: i.pageSize,
    // 查询结果异步返回前没有 total，Element Plus 会把分页判定为非法；本地数组模式则回退到当前数据量。
    total: i.total ?? o.length,
    pageSizes: i.pageSizeOptions,
    layout: "total, sizes, prev, pager, next, jumper",
    onCurrentChange: (C) => {
      var _;
      return (_ = i.onChange) == null ? void 0 : _.call(i, C, i.pageSize);
    },
    onSizeChange: (C) => {
      var _;
      return (_ = i.onShowSizeChange || i.onChange) == null ? void 0 : _(i.current ?? 1, C);
    },
    ...S,
    ...g !== void 0 ? { size: g ? "small" : void 0 } : {},
    small: !1
  };
  return k("div", { class: "sup-table-adapter" }, [
    c,
    k(go, D)
  ]);
}, $r = (e, t = {}) => {
  var h;
  const { bordered: n, items: o, value: r, onValueChange: a, attrs: l = {} } = e, { tabExtra: s, cardExtra: i, ...m } = t, f = k(
    _n,
    { ...l, modelValue: r, "onUpdate:modelValue": a },
    {
      default: () => o.map((y) => {
        const { tab: w, key: d, ...p } = y;
        return k(xn, { ...p, key: d, name: d }, { label: () => w });
      })
    }
  ), v = [k("div", { class: "sup-table-tabs" }, [f, s == null ? void 0 : s()]), (h = m.default) == null ? void 0 : h.call(m)];
  return n ? k(
    An,
    {},
    {
      default: () => v,
      header: m.title || i ? () => {
        var y;
        return [(y = m.title) == null ? void 0 : y.call(m), i == null ? void 0 : i()];
      } : void 0
    }
  ) : v;
}, Vr = {
  table: ".el-table",
  header: ".el-table__header-wrapper",
  footer: ".el-table__footer-wrapper",
  pagination: ".el-pagination",
  empty: ".el-table__empty-block",
  emptyCell: ".el-table__empty-block",
  body: ".el-table__body-wrapper .el-scrollbar__wrap"
};
function Nr(e, t, n, o) {
  var a, l;
  const r = { ...e.attrs, disabled: W((a = e.attrs) == null ? void 0 : a.disabled), loading: W((l = e.attrs) == null ? void 0 : l.loading) };
  return e.render ? e.render({ props: r, ...t }) : k(
    In,
    {
      content: W(e.tooltipTitle),
      disabled: !W(e.tooltipTitle)
    },
    {
      default: () => k(lt, { ...r, onClick: (s) => {
        var i;
        return (i = e.onClick) == null ? void 0 : i.call(e, s);
      } }, () => [
        e.icon && !o ? e.icon() : void 0,
        !e.icon || !n ? ee(e.label, t) : void 0
      ])
    }
  );
}
function Br(e) {
  const { buttons: t, moreButtons: n, groupProps: o, effectData: r, iconOnly: a, labelOnly: l, defaultButtonProps: s } = e, i = e.divider ?? ((o == null ? void 0 : o.direction) !== "vertical" && (!!(s != null && s.link) || (s == null ? void 0 : s.text) === !0)), m = [...t, ...n], f = m.flatMap((b, v) => [
    Nr(b, r, !!a, !!l),
    i && v < m.length - 1 ? k(yo, { direction: "vertical" }) : void 0
  ]);
  return k(kn, { ...o, size: i ? 0 : o == null ? void 0 : o.size }, () => f);
}
const Lr = (e, t = {}) => {
  const {
    maxCount: n,
    showUploadList: o,
    beforeUpload: r,
    customRequest: a,
    onChange: l,
    iconRender: s,
    isImageUrl: i,
    ...m
  } = e, f = (v) => ({
    ...v,
    status: v.status === "ready" ? "uploading" : v.status === "success" ? "done" : v.status === "fail" ? "error" : v.status
  }), b = (v) => ({
    ...v,
    status: v.status === "waiting" ? "ready" : v.status === "done" ? "success" : v.status
  });
  return k(
    wo,
    {
      ...m,
      limit: n,
      fileList: (e.fileList || []).map(b),
      showFileList: o !== !1,
      beforeUpload: (v) => r == null ? void 0 : r(v, [v]),
      httpRequest: a,
      onChange: (v, h) => l == null ? void 0 : l({
        file: f(v),
        fileList: h.map(f)
      })
    },
    t
  );
};
async function mn(e, t) {
  try {
    t ? await e.validateField([t.join(".")]) : await e.validate();
  } catch (n) {
    if (!n || typeof n != "object" || n instanceof Error)
      throw n;
    const o = Object.entries(n);
    throw !o.length || !o.every(([, r]) => Array.isArray(r)) ? n : new Sr(
      o.map(([r, a]) => ({
        path: t || r.split("."),
        messages: a.flatMap((l) => l.message ? [l.message] : [])
      })),
      n
    );
  }
}
const qr = {
  form: {
    service: {
      validate: (e) => mn(e),
      validateField: mn,
      clearValidate: (e) => e.clearValidate()
    },
    component: So
  },
  formItem: {
    defaults: { validateEvent: !0 },
    component: Co,
    adaptProps: ({ name: e, ...t }) => ({ ...t, prop: e == null ? void 0 : e.map(String) })
  },
  row: {
    component: _o,
    adaptProps: ({ gutter: e, style: t, ...n }) => {
      if (!Array.isArray(e))
        return { ...n, gutter: e, style: t };
      const [o, r] = e;
      return {
        ...n,
        gutter: o,
        // Element Plus 只有水平 gutter，垂直间距用 rowGap 保留 Core 的二维布局语义。
        style: { ...t || {}, rowGap: r ? `${r}px` : void 0 }
      };
    }
  },
  col: {
    component: xo,
    adaptProps: ({ span: e, style: t, ...n }) => e === "auto" ? { ...n, span: 24, style: { ...t || {}, flex: "1 1 0", maxWidth: "none" } } : { ...n, span: e, style: t }
  },
  space: { component: kn },
  card: {
    render: ({ state: e }) => {
      var t;
      return k(An, e.attrs, {
        ...e.slots,
        header: e.title || e.extra ? () => {
          var n;
          return k(
            "div",
            {
              class: "sup-titlebar",
              style: { display: "flex", alignItems: "center", justifyContent: "space-between" }
            },
            [e.title && k("div", { class: "sup-title" }, [e.title()]), (n = e.extra) == null ? void 0 : n.call(e)]
          );
        } : (t = e.slots) == null ? void 0 : t.header,
        default: e.content
      });
    }
  },
  tabs: { render: ({ state: e }) => Er(e) },
  collapse: { render: ({ state: e }) => Rr(e) },
  descriptions: { render: ({ state: e }) => k(Dr, { state: e }) },
  actionGroup: {
    schemaDefaults: {
      rowButtons: { buttonProps: { link: !0, size: "small" } },
      ButtonActions: {
        expand: { attrs: { link: !0 } },
        add: { attrs: { type: "primary" } },
        delete: { attrs: { type: "danger" } },
        submit: { attrs: { type: "primary" } },
        search: { attrs: { type: "primary" } }
      }
    },
    render: ({ attrs: e }) => Br(e)
  },
  tooltip: { component: In, adaptProps: ({ title: e, ...t }) => ({ ...t, content: e }) },
  tag: {
    adaptProps: ({ removable: e, onRemove: t, ...n }) => ({ ...n, closable: e, onClose: t }),
    render: ({ attrs: e, slots: t }) => k(Ao, e, { ...t, default: () => {
      var n, o;
      return [(n = t.icon) == null ? void 0 : n.call(t), (o = t.default) == null ? void 0 : o.call(t)];
    } })
  },
  checkableTag: {
    component: ko,
    adaptProps: ({ selected: e, onSelectedChange: t, ...n }) => ({
      ...n,
      checked: e,
      onChange: t
    })
  },
  empty: { component: Io },
  modal: {
    render: ({ attrs: e, slots: t }) => {
      const { visible: n, "onUpdate:visible": o, afterClose: r, footer: a, ...l } = e, { title: s, footer: i, ...m } = t, f = () => [
        k(lt, {
          onClick: async () => {
            var v;
            await ((v = e.onCancel) == null ? void 0 : v.call(e)) !== !1 && (o == null || o(!1));
          }
        }, "取 消"),
        k(lt, {
          type: "primary",
          loading: e.confirmLoading,
          onClick: () => {
            var b;
            return (b = e.onOk) == null ? void 0 : b.call(e);
          }
        }, "确 定")
      ];
      return k(
        Do,
        {
          ...l,
          // 关闭图标、遮罩和 Escape 与底部取消按钮使用同一业务拦截。
          beforeClose: l.beforeClose || (async (b) => {
            var v;
            await ((v = e.onCancel) == null ? void 0 : v.call(e)) !== !1 && b();
          }),
          modelValue: n,
          "onUpdate:modelValue": o,
          onClosed: r
        },
        {
          ...m,
          ...s ? { header: s } : {},
          ...a === null ? {} : { footer: i || f }
        }
      );
    }
  },
  upload: { service: { listIgnore: !1 }, render: ({ attrs: e, slots: t }) => Lr(e, t) },
  uploadTrigger: { component: lt },
  preview: {
    render: ({ attrs: e }) => e.visible ? k(Oo, {
      urlList: e.images ?? [],
      initialIndex: e.current ?? 0,
      onClose: () => {
        var t;
        return (t = e["onUpdate:visible"]) == null ? void 0 : t.call(e, !1);
      }
    }) : null
  },
  table: { service: { selectors: Vr }, render: ({ attrs: e, slots: t }) => Tr(e, t) },
  tableFilter: { render: ({ attrs: e, slots: t }) => $r(e, t) }
};
function at(e) {
  return typeof e == "function" ? e() : e;
}
function no(e = {}) {
  return Tn(
    aa({
      name: "element-plus",
      uiComponents: qr,
      supportedFields: Jn,
      fieldSources: _r,
      adaptFieldProps: kr,
      fields: Ir,
      fieldComponents: e.components,
      icons: { semantic: Pe },
      services: {
        message(t, n) {
          Mo({ type: t, message: at(n) });
        },
        confirm(t) {
          return ot.confirm(at(t.content) ?? "", at(t.title), {
            ...t,
            confirmButtonText: t.okText,
            cancelButtonText: t.cancelText
          }).then(t.onOk).catch(t.onCancel), { update: () => {
          }, destroy: () => ot.close() };
        },
        info(t) {
          let n = { ...t };
          const o = () => {
            ot.alert(
              at(n.content) ?? "",
              at(n.title),
              {
                ...n,
                confirmButtonText: n.okText
              }
            ).then(n.onOk).catch(() => {
            });
          };
          return o(), {
            update(r) {
              n = { ...n, ...r }, ot.close(), o();
            },
            destroy: () => ot.close()
          };
        }
      }
    }),
    e.overrides
  );
}
const nl = no();
function ol(e) {
  return e;
}
const Ur = (e) => {
  var t, n;
  return ((n = (t = se.tableApiSetting) == null ? void 0 : t.resultTransform) == null ? void 0 : n.call(t, e)) || e;
}, bn = (e) => {
  const { currentField: t, sizeField: n } = se.tableApiSetting || {};
  return t || n ? {
    [t || "current"]: e.current,
    [n || "size"]: e.size
  } : e;
};
function zr(e, t, n) {
  const o = B({}), r = T(!1);
  let a = {}, l = 0, s;
  const i = [], m = (g) => i.push(g);
  e.onLoaded && i.push(e.onLoaded);
  const f = async (g) => {
    var S, D, A, C;
    const _ = it({}, bn(o), a, g), x = ((S = e.beforeQuery) == null ? void 0 : S.call(e, _)) || _, I = (D = e.apis) == null ? void 0 : D.query;
    s == null || s.abort();
    const M = ++l;
    if (!I) {
      s = void 0, r.value = !1;
      return;
    }
    const E = new AbortController();
    s = E, r.value = !0;
    try {
      const U = await I(x, { signal: E.signal });
      if (M !== l || E.signal.aborted)
        return;
      const F = ((A = e.afterQuery) == null ? void 0 : A.call(e, U)) || U, $ = Ur(F);
      if (c.value && !Array.isArray($) && ((C = $ == null ? void 0 : $.records) == null ? void 0 : C.length) === 0 && Number.isFinite($.total)) {
        const L = Math.max(1, Math.ceil($.total / ($.size || o.size)));
        if (o.current > L)
          return o.current = L, f({ ...g, ...bn(o) });
      }
      return b($);
    } finally {
      M === l && (s = void 0, r.value = !1);
    }
  }, b = (g) => (Array.isArray(g) ? (t(g), c.value !== !1 && (o.current = 1, c.value = { ...c.value, total: g.length })) : g != null && g.records && (t(g.records), c.value !== !1 && (o.current = g.current, o.size = g.size, c.value = { ...c.value, total: g.total })), Promise.all(i.map((S) => S(g)))), v = (g, S = o.size) => (o.current = g, o.size = S, f()), h = (g) => (c.value && (o.current = 1), f(g)), y = Po((g) => h(g).catch((S) => {
    (S == null ? void 0 : S.name) !== "AbortError" && console.error(S);
  }), 300, { leading: !1 }), w = () => {
    s == null || s.abort(), s = void 0, l += 1, r.value = !1;
  }, d = {}, p = (g, S) => {
    S === "dynamic" ? a = it({}, d, g) : (Object.assign(d, g), it(a, g));
  }, u = () => a, c = T(!1);
  return H(
    () => {
      var g;
      return e.pagination ?? ((g = e.attrs) == null ? void 0 : g.pagination);
    },
    (g) => {
      if (g === !1) {
        c.value = !1;
        return;
      }
      Object.assign(o, { size: (g == null ? void 0 : g.pageSize) || 10, current: (g == null ? void 0 : g.current) || 1 });
      const S = g == null ? void 0 : g.onChange, D = g == null ? void 0 : g.onShowSizeChange;
      c.value = {
        ...g,
        onChange: (A, C) => {
          const _ = v(A, C);
          return S == null || S(A, C), _;
        },
        onShowSizeChange: (A, C) => {
          const _ = v(A, C);
          return D == null || D(A, C), _;
        },
        pageSize: o.size,
        current: o.current
      };
    },
    {
      immediate: !0,
      flush: "sync"
    }
  ), H(o, (g) => {
    c.value && (c.value = { ...c.value, pageSize: g.size, current: g.current });
  }), H(
    () => {
      var g, S;
      return [(g = e.apis) == null ? void 0 : g.query, (n == null ? void 0 : n.value.length) ?? ((S = W(e.dataSource)) == null ? void 0 : S.length), o.current, o.size, c.value === !1];
    },
    ([g, S]) => {
      if (g || !c.value || S === void 0)
        return;
      const D = Math.min(Math.max(1, o.current), Math.max(1, Math.ceil(S / o.size)));
      o.current = D, (c.value.total !== S || c.value.current !== D) && (c.value = { ...c.value, total: S, current: D });
    },
    { immediate: !0 }
  ), {
    goPage: v,
    reload: f,
    throttleRequest: y,
    cancelQuery: w,
    setQueryParams: p,
    getQueryParams: u,
    query: h,
    pagination: c,
    setPageData: b,
    onLoaded: m,
    loading: r
  };
}
function Kr(e, t, n) {
  var o;
  const { columns: r, searchForm: a } = e, l = a || e.searchSchema || {}, s = T(), i = l.dataSource || B({}), { buttons: m = {}, searchOnChange: f, limit: b, ...v } = l, h = T(!1), y = [];
  l.subItems.forEach((c) => {
    if (typeof c == "string") {
      const g = r.find((S) => S.field === c);
      g && y.push({
        type: "Input",
        ...Ro(g, "span", "disabled", "hidden"),
        editable: !0,
        exclude: []
      });
    } else
      return y.push({ ...c });
  }), b && y.length > b && y.forEach((c, g) => {
    if (g >= b) {
      const S = c.hidden;
      c.hidden = (...D) => !h.value || (S == null ? void 0 : S(...D));
    }
  });
  const w = {
    search() {
      var c;
      n(i), (c = l.onSubmit) == null || c.call(l, Z(i));
    },
    reset(c) {
      s.value.resetFields(c);
    }
  }, d = Array.isArray(m) ? { actions: m } : { ...m };
  d.actions ?? (d.actions = f ? void 0 : ["search", "reset"]), (o = d.actions) != null && o.length && (b && y.length > b && (d.actions = [
    {
      label: () => [
        h.value ? "收起 " : "展开 ",
        me(h.value ? "collapse" : "expand")
      ],
      name: "expand",
      onClick: () => h.value = !h.value
    },
    ...d.actions
  ]), y.push({
    type: "InfoSlot",
    align: "right",
    span: "auto",
    render: () => k(Me, {
      option: d,
      methods: w,
      effectData: _e({ table: t, form: s })
    })
  }));
  const p = H(s, () => {
    n(i), f && H(i, n), p();
  });
  return { formNode: () => k(he.Form, {
    option: {
      ...v,
      ignoreRules: !0,
      dataSource: i,
      subItems: y
    },
    ref: s,
    onSubmit: w.search,
    onReset: w.search
  }), formRef: s, ...w, dataSource: i };
}
function Hr(e) {
  return !e || !e.getBoundingClientRect ? 0 : e.getBoundingClientRect();
}
function hn(e) {
  const t = document.documentElement, n = t.scrollLeft, o = t.scrollTop, r = t.clientLeft, a = t.clientTop, l = window.pageXOffset, s = window.pageYOffset, i = Hr(e), { left: m, top: f, width: b, height: v } = i, h = (l || n) - (r || 0), y = (s || o) - (a || 0), w = m + l, d = f + s, p = w - h, u = d - y, c = window.document.documentElement.clientWidth, g = window.document.documentElement.clientHeight;
  return {
    left: p,
    top: u,
    right: c - b - p,
    bottom: g - v - u,
    rightIncludeBody: c - p,
    bottomIncludeBody: g - u
  };
}
function Gr(e, t, n, o) {
  const r = de("table").selectors, a = (h, y) => y ? h.querySelector(y) : null, l = jo(f, 100), s = T({});
  let i = !1;
  const m = () => {
    var h;
    i = !0, o ? window.addEventListener("resize", l, {
      signal: o.signal
    }) : document.addEventListener("redoHeight", l), s.value = (h = e.attrs) == null ? void 0 : h.scroll, H(
      () => {
        var w;
        return [n.value, (w = W(t)) == null ? void 0 : w.length];
      },
      () => {
        l();
      },
      { flush: "post" }
    );
    const y = H(
      n,
      (w) => {
        w && (w.style.overflow = "hidden", new ResizeObserver(() => {
          l();
        }).observe(w), y());
      },
      { immediate: !0, flush: "post" }
    );
  };
  $t(() => {
    i && document.removeEventListener("redoHeight", l);
  });
  function f() {
    i && De(() => {
      v();
    });
  }
  function b(h) {
    s.value = {
      y: h,
      x: "100%"
      // scrollToFirstRowOnChange: true,
    };
  }
  async function v() {
    var h;
    const { maxHeight: y, inheritHeight: w, isFixedHeight: d, resizeHeightOffset: p } = e, u = W(n);
    if (!u)
      return;
    const c = a(u, r.table);
    if (!c)
      return;
    await De();
    const g = getComputedStyle(u.parentElement), S = hn(c), D = hn(u), A = S.left - D.left, C = (parseInt(g.marginBottom) || 0) + (parseInt(g.paddingBottom) || 0);
    let _ = 0;
    u && w ? _ = D.bottomIncludeBody - D.bottom - (S.top - D.top) : _ = S.bottomIncludeBody - C;
    const x = a(c, r.title), I = (x == null ? void 0 : x.parentElement) === c ? x.offsetHeight ?? 0 : 0, M = a(c, r.header);
    if (!M)
      return;
    let E = 0;
    M && (E = M.offsetHeight);
    let U = 0;
    const F = a(c, r.footer);
    F && F.parentElement === c && (U += F.offsetHeight || 0);
    let $ = 0;
    const L = a(u, r.pagination);
    L && ($ = L.offsetHeight + 16);
    let K = Math.ceil(_) - (p || 0) - A - $;
    const J = y || K - U - I - E - 1;
    if (y && d && (K = y + U + I + E + 1), d) {
      c.style.height = `${K}px`, c.style["overflow-y"] = "hidden", w || (u.style.height = "unset");
      const V = a(u, r.wrapper);
      if (V && (V.style.height = "", V.style["overflow-y"] = ""), !(((h = W(t)) == null ? void 0 : h.length) > 0)) {
        if (a(c, r.empty)) {
          const ce = a(c, r.emptyCell);
          ce && (ce.style.height = `${J}px`);
        }
        return;
      }
    }
    if (c.scrollHeight > K)
      b(J);
    else {
      const V = a(c, r.body);
      V && b(V.scrollHeight <= J ? null : J);
    }
  }
  return { getScrollRef: s, redoHeight: f, debounceRedoHeight: l, listenResize: m };
}
const Wr = Y({
  name: "SuperTable",
  inheritAttrs: !1,
  props: {
    dataSource: Array,
    schema: Object
  },
  emits: ["register", "load", "update:dataSource"],
  setup(e, t) {
    const { style: n, class: o, ...r } = t.attrs, a = gt({ attrs: r }), l = T([]), s = T(), i = (V) => {
      l.value = V, t.emit("update:dataSource", V), ze(a.dataSource) && (a.dataSource.value = V);
    };
    $e(() => e.dataSource && i(e.dataSource)), $e(() => a.dataSource && i(W(a.dataSource)));
    const m = T(), f = (V) => {
      se.schemaDiagnostics && ft(V, "table", "SuperTable");
      const { isScanHeight: te, inheritHeight: ce, isFixedHeight: ye, isContainer: xe, ...ge } = ne(
        Q.Table,
        { ...V.attrs },
        { ...a.attrs }
      );
      Object.assign(a, { isScanHeight: te, inheritHeight: ce, isFixedHeight: ye, isContainer: xe }, V, { attrs: ge });
    };
    $e(() => e.schema && f(Z(e.schema)));
    const {
      loading: b,
      pagination: v,
      setPageData: h,
      onLoaded: y,
      goPage: w,
      reload: d,
      query: p,
      throttleRequest: u,
      cancelQuery: c,
      setQueryParams: g,
      getQueryParams: S
    } = zr(a, i, l), { getScrollRef: D, redoHeight: A, listenResize: C } = Gr(a, l, s), _ = Ie(), x = {
      setOption: f,
      setData: (V) => {
        V && i(V);
      },
      redoHeight: A,
      goPage: w,
      reload: d,
      query: p,
      onLoaded: y,
      resetSearchForm(V) {
        try {
          return m.value.formRef.resetFields(V);
        } catch (te) {
          console.warn(te);
        }
      },
      setPageData: h,
      getQueryParams: S,
      getData: () => l.value,
      dataRef: l,
      searchForm: N(() => {
        var V;
        return (V = m.value) == null ? void 0 : V.formRef;
      }),
      validate: async () => {
        _.value && await de("form").validate(_.value);
      },
      setColumns: (V) => {
        var te;
        !L && !((te = a.columns) != null && te.length) ? Object.assign(a, { columns: V }) : (Object.assign(a, { columns: V }), J(V));
      }
    }, I = T({ ...x }), M = (V) => {
      Object.assign(I.value, Be(B(V)), x), t.emit("register", I.value);
    };
    t.emit("register", I.value), t.expose(I.value);
    const E = B({
      reload: d,
      onRegister: M,
      loading: b
    });
    Vt(() => {
      c(), t.emit("register", null);
    }), Ne("rootSlots", t.slots);
    const U = T({}), F = T(), $ = B({ formData: l, current: l, queryParams: N(S) });
    let L = !1;
    const K = H(
      a,
      (V) => {
        var te, ce;
        if (!((te = V == null ? void 0 : V.columns) != null && te.length))
          return;
        if (F.value) {
          K();
          return;
        }
        const { columns: ye, maxHeight: xe, isScanHeight: ge = !0, inheritHeight: fe } = V, Ee = B({
          refData: l,
          listData: Ze(ye)
        });
        U.value = tt(a.slots, $, t.slots);
        const Ue = V.searchForm || V.searchSchema, {
          attrs: { onLoad: pe, ...Ae }
        } = Ce({ option: V, effectData: $ });
        Object.assign(E, Ae, { pagination: v }), y((ae) => {
          t.emit("load", ae), pe == null || pe(ae);
        }), Ue && (m.value = Kr(V, I, (ae) => {
          g(ae, "form"), L && u();
        }));
        const Fe = V.tabs && V.tabs.field;
        if (V.tabs && Fe) {
          const ae = (ce = V.tabs).activeKey ?? (ce.activeKey = T(V.tabs.defaultActiveKey)), R = {};
          H(
            ae,
            (O) => {
              O !== void 0 && (ut(R, Fe, O), g(R), L && u());
            },
            { immediate: !0 }
          );
        }
        if (H(
          T(V.params),
          (ae) => {
            g(ae, "dynamic"), L && u();
          },
          { deep: !0, immediate: !0 }
        ), De(() => {
          L = !0, a.immediate !== !1 && u();
        }), ge || fe || xe) {
          C(), E.scroll = D;
          const { onChange: ae, onExpandedRowsChange: R } = E;
          E.onChange = (...O) => {
            ae == null || ae(...O);
          }, E.onExpandedRowsChange = (O) => {
            R == null || R(O), A();
          }, H(l, A);
        }
        const we = () => k(he.Table, { option: a, effectData: $, model: Ee, ...E }, U.value);
        a.editable ? F.value = () => z("form")({ model: l.value, ref: _ }, { default: we }) : F.value = we;
      },
      {
        immediate: !0
      }
    ), J = (V) => {
      const te = B({
        refData: l,
        listData: Ze(V)
      }), ce = Symbol(), ye = () => k(he.Table, { option: a, effectData: $, model: te, key: ce, ...E }, U.value);
      a.editable ? F.value = () => z("form")({ model: l.value, ref: _ }, { default: ye }) : F.value = ye;
    };
    return () => F.value && k(
      zt,
      { name: "exaProvider", data: { data: l } },
      () => {
        var V, te;
        return !m.value || (V = a.searchForm) != null && V.teleport ? k(
          "div",
          ne(
            {
              ref: s,
              class: [a.isContainer && "sup-container", "sup-table", "sup-form-section"]
            },
            {
              class: o,
              style: n
            }
          ),
          [
            ((te = a.searchForm) == null ? void 0 : te.teleport) && k(
              lo,
              { to: a.searchForm.teleport },
              k("div", { class: "sup-form-section sup-table-search" }, k(m.value.formNode))
            ),
            F.value()
          ]
        ) : k(
          "div",
          ne(
            { ref: s, class: [a.isContainer && "sup-container", "sup-table"] },
            { class: o, style: n }
          ),
          [
            k("div", { class: "sup-form-section sup-table-search" }, k(m.value.formNode)),
            k("div", { class: "sup-form-section section-last" }, k(F.value))
          ]
        );
      }
    );
  }
}), al = (e, t) => {
  const [n, o] = qn(), r = Promise.resolve(typeof e == "function" ? e() : e), a = (s) => {
    if (s)
      n.value || (r.then(s.setOption), t && s.setData(t)), n.value = s;
    else if (s === null)
      n.value = void 0;
    else
      return (i, m) => k(Wr, { ...i, onRegister: a }, m == null ? void 0 : m.slots);
  }, l = async (s, ...i) => {
    const m = await o();
    if (s && s in m)
      return typeof m[s] == "function" ? m[s](...i) : m[s];
  };
  return [
    a,
    {
      /** 异步获取表格引用 */
      getTable: o,
      tableRef: n,
      redoHeight() {
        l("redoHeight");
      },
      setData(s) {
        l("setPageData", s);
      },
      /** 返回当前表格数据 */
      getData() {
        var s;
        return le((s = n.value) == null ? void 0 : s.dataRef);
      },
      dataSource: N(() => {
        var s;
        return (s = n.value) == null ? void 0 : s.dataRef;
      }),
      /** 跳转到指定页 */
      goPage(s) {
        return l("goPage", s);
      },
      /** 设置表格列 */
      setColumns(s) {
        l("setColumns", s);
      },
      /** 刷新数据，不改动查询条件与当前页 */
      reload() {
        return l("reload");
      },
      /** 手动执行条件查询，不覆盖搜索表单参数 */
      query(s) {
        return l("query", s);
      },
      /** 查询完成，返回结果回调 */
      onLoaded(s) {
        l("onLoaded", s);
      },
      /** 重置查询表单，并重新查询 */
      resetSearchForm(s) {
        var i;
        (i = n.value) == null || i.resetSearchForm(s);
      },
      getQueryParams: () => {
        var s;
        return (s = n.value) == null ? void 0 : s.getQueryParams();
      },
      // setQueryParams: (params: Obj) => asyncCall('setQueryParams', params),
      selectedRowKeys: N(() => {
        var s;
        return (s = n.value) == null ? void 0 : s.selectedRowKeys;
      }),
      selectedRows: N(() => {
        var s;
        return (s = n.value) == null ? void 0 : s.selectedRows;
      }),
      /** 设置选中行 */
      setSelectedRows: (s) => {
        var i;
        return (i = n.value) == null ? void 0 : i.setSelectedRows(s);
      },
      expandedRowKeys: N(() => {
        var s;
        return (s = n.value) == null ? void 0 : s.expandedRowKeys;
      }),
      setExpandedRowKeys: (s) => {
        var i;
        return (i = n.value) == null ? void 0 : i.setExpandedRowKeys(s);
      },
      expandAll() {
        l("expandAll");
      },
      /** 新增行 */
      add: (s) => {
        var i;
        return (i = n.value) == null ? void 0 : i.add(s);
      },
      /** 修改行，须判断是否已有选中行 */
      edit: (s) => {
        var i;
        return (i = n.value) == null ? void 0 : i.edit(s);
      },
      /** 删除行，须判断是否已有选中行 */
      delete: () => {
        var s;
        return (s = n.value) == null ? void 0 : s.delete();
      },
      /** 查看详情，须判断是否已有选中行 */
      detail: (s) => {
        var i;
        return (i = n.value) == null ? void 0 : i.detail(s);
      },
      asyncCall: l,
      /** `editable`模式下进行表单校验 */
      validate() {
        return l("validate");
      }
    }
  ];
};
function rl(e) {
  return e;
}
const Yr = Y({
  props: {
    limit: Number,
    buttonProps: Object,
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
  setup(e, { slots: t }) {
    var n;
    const o = (n = t.default) == null ? void 0 : n.call(t), { effectData: r, ...a } = e, l = o ? o.flatMap(({ children: s, props: i = {} }) => {
      const { roleName: m, onClick: f, confirmText: b, tooltip: v, disabledTooltip: h, icon: y, ...w } = Eo(
        i,
        (d, p) => To(p)
      );
      return !f || !s ? [] : {
        label: s.default || s,
        icon: y,
        tooltip: v,
        disabledTooltip: h,
        roleName: m,
        onClick: f,
        confirmText: b,
        attrs: w
      };
    }) : e.actions;
    return () => k(Me, { option: { ...a, actions: l }, effectData: r });
  }
});
function ll(e) {
  return [() => k(Yr, e)];
}
const Qr = Y({
  props: {
    dataSource: Object,
    schema: Object
  },
  emits: ["register"],
  setup(e, t) {
    const n = Ie(e.schema || {}), o = T({});
    H(
      () => e.schema,
      (l) => {
        se.schemaDiagnostics && l && ft(l, "detail", "SuperDetail"), n.value = l || {};
      },
      { immediate: !0 }
    ), H(
      () => W(e.dataSource ?? n.value.dataSource),
      (l) => {
        l != null && (o.value = l);
      },
      { immediate: !0 }
    );
    const r = {
      setOption: (l) => {
        se.schemaDiagnostics && ft(l, "detail", "SuperDetail"), n.value = l;
      },
      setData: (l) => {
        o.value = l;
      }
    }, a = T();
    return H(
      n,
      (l) => {
        if (!(l != null && l.subItems)) {
          a.value = void 0;
          return;
        }
        const s = Ze(l.subItems, o);
        a.value = s.modelsMap;
      },
      { immediate: !0 }
    ), t.expose(r), t.emit("register", r), Ne("exaProvider", yn({ data: o })), Ne("rootSlots", t.slots), () => a.value && k(
      "div",
      { class: ["sup-detail", n.value.isContainer && "sup-container"] },
      k(qe, {
        option: {
          type: "Descriptions",
          ...n.value
        },
        ...n.value.attrs,
        ...n.value.descriptionsProps,
        modelsMap: a.value,
        isRoot: !0
      })
    );
  }
});
function sl(e, t) {
  const n = oe(t), o = T(), r = Promise.resolve(typeof e == "function" ? e() : e), a = (l) => {
    if (l)
      o.value || (r.then(l.setOption), n.value && H(
        n,
        (s) => {
          l.setData(s);
        },
        { immediate: !0 }
      )), o.value = l;
    else
      return (s) => k(Qr, { ...s, onRegister: a }, so());
  };
  return [
    a,
    {
      setData(l) {
        o.value ? o.value.setData(l) : n.value = l;
      }
    }
  ];
}
function il(e) {
  return e;
}
const Xr = Cr(
  "superform-element-plus",
  (e) => no({ components: e })
), ul = Xr, cl = {
  Input: bt,
  TextArea: bt,
  InputPassword: bt,
  InputSearch: bt,
  InputNumber: Fo,
  InputOtp: $o,
  InputTag: Vo,
  Autocomplete: No,
  Mention: Bo,
  Select: Lo,
  SelectV2: qo,
  Cascader: Uo,
  TreeSelect: zo,
  Radio: Ko,
  RadioGroup: Ho,
  Checkbox: Go,
  CheckboxGroup: Wo,
  Switch: Yo,
  DatePicker: Wt,
  DateRangePicker: Wt,
  TimePicker: Yt,
  TimeRangePicker: Yt,
  TimeSelect: Qo,
  ColorPicker: Xo,
  Rate: Zo,
  Slider: Jo,
  Segmented: ea,
  Transfer: ta
};
export {
  Sr as FormValidationError,
  Yr as SuperButtons,
  Qr as SuperDetail,
  Fa as SuperForm,
  Wr as SuperTable,
  gr as configure,
  no as createElementPlusAdapter,
  Kt as createModal,
  ul as default,
  il as defineDetail,
  ol as defineForm,
  rl as defineTable,
  aa as defineUIAdapter,
  Ca as diagnoseSchema,
  nl as elementPlusAdapter,
  Ir as elementPlusFields,
  cl as fieldComponents,
  tl as registerAutoImportedComponents,
  yr as registerComponent,
  wr as registerComponents,
  hr as useAdapter,
  ll as useButtons,
  sl as useDetail,
  $a as useForm,
  Kn as useModal,
  el as useModalForm,
  al as useTable
};
