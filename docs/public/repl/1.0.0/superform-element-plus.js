import { defineComponent as Y, provide as xe, reactive as $, inject as ge, computed as N, toRaw as W, toRefs as Te, unref as z, mergeProps as oe, h as C, toRef as le, ref as k, watch as B, shallowRef as st, useAttrs as Kn, shallowReactive as it, onMounted as bn, toValue as ie, getCurrentInstance as gn, onUnmounted as Ct, isRef as Ne, markRaw as Hn, openBlock as Ce, createBlock as He, resolveDynamicComponent as rt, watchPostEffect as Gn, nextTick as Ie, createVNode as hn, render as xt, watchEffect as ke, readonly as yn, createElementBlock as yt, Fragment as Ft, renderList as wn, toDisplayString as Wn, Teleport as Yn, useSlots as Qn } from "vue";
import { isFunction as Xe, defaults as Fe, get as je, set as We, isArray as Sn, merge as mt, isPlainObject as ue, isNumber as qe, update as Xn, uniq as Zn, throttle as jt, cloneDeep as Ge, mergeWith as Jn, ElForm as eo, ElFormItem as to, ElRow as no, ElCol as oo, ElSpace as Yt, ElCard as Qt, ElTabs as Xt, ElTabPane as Zt, ElTooltip as _n, ElCheckTag as ao, ElTag as ro, ElMessage as lo, ElMessageBox as tt, ElDialog as so, ElButton as Nt, ElUpload as io, ElImageViewer as uo, ElTable as co, ElTableColumn as Jt, ElPagination as fo, ElOption as po, mapKeys as mo, omit as vo, debounce as bo, camelCase as go, ElInput as ho, ElInputNumber as yo, ElInputOtp as wo, ElInputTag as So, ElAutocomplete as _o, ElMention as Co, ElSelect as Io, ElSelectV2 as Ao, ElCascader as Oo, ElTreeSelect as Do, ElRadio as Po, ElRadioGroup as To, ElCheckbox as Eo, ElCheckboxGroup as Ro, ElSwitch as ko, ElDatePicker as xo, ElTimePicker as Fo, ElTimeSelect as jo, ElColorPicker as Mo, ElRate as $o, ElSlider as Uo, ElSegmented as Vo, ElTransfer as No } from "./element-plus.js";
let ut = (e = 21) => crypto.getRandomValues(new Uint8Array(e)).reduce((t, n) => (n &= 63, n < 36 ? t += n.toString(36) : n < 62 ? t += (n - 26).toString(36).toUpperCase() : n > 62 ? t += "-" : t += "_", t), "");
const Bo = [
  "Form",
  "Group",
  "Card",
  "List",
  "ListGroup",
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
], Cn = new Set(Bo), ne = {
  tagViewer: ["pink", "red", "orange", "green", "cyan", "blue", "purple"]
};
let ze;
const In = {}, An = {};
function Vr(e) {
  return e;
}
function U() {
  if (!ze)
    throw new Error(
      "SuperForm 尚未初始化 UIAdapter；官方产品请先调用 superForm.initialize()，独立 Core 请调用 superForm.useAdapter(adapter)"
    );
  return ze;
}
function en(e) {
  if (ze && ze !== e)
    throw new Error(
      `UIAdapter 已初始化为 '${ze.name}'，不能切换为 '${e.name}'`
    );
  ze = e, On(e.fieldComponents || {}, "manual");
}
function vt(e) {
  var t;
  return (t = U().fields) == null ? void 0 : t[e];
}
function On(e, t = "manual") {
  const n = t === "manual" ? In : An;
  Object.entries(e).forEach(([a, o]) => {
    o && (n[a] = o);
  });
}
function Dn(e) {
  const t = vt(e);
  if (t)
    return In[t.component] ?? An[t.component];
}
function Bt(e) {
  var t;
  const n = Dn(e);
  if (!n) {
    const a = ((t = vt(e)) == null ? void 0 : t.component) ?? e;
    throw new Error(
      `UIAdapter '${U().name}' 支持字段 '${e}'，但组件 '${String(
        a
      )}' 尚未注册；请启用自动导入插件，或在 superForm.initialize({ components }) 中提供`
    );
  }
  return n;
}
function Lo(e) {
  return typeof e == "string" ? U().components[e] : e;
}
function bt(e, t) {
  const n = e && Lo(e);
  if (!n)
    throw new Error(
      `UIAdapter '${U().name}' 未提供 ${t} capability`
    );
  return n;
}
function Pn(e, t) {
  const n = { ...e }, { prop: a = "value", event: o = "update:value" } = t || {};
  if (a !== "value" && (n[a] = n.value, delete n.value), o !== "update:value") {
    const l = o.startsWith("on") ? o : `on${o[0].toUpperCase()}${o.slice(1)}`;
    n[l] = n["onUpdate:value"], delete n["onUpdate:value"];
  }
  return n;
}
function qo(e) {
  const t = U().layout, n = e === "compactSpace" ? (t == null ? void 0 : t.compactSpace) ?? (t == null ? void 0 : t.space) : t == null ? void 0 : t[e];
  return { component: bt(n, e), layout: t };
}
function wt(e, t = {}) {
  var n;
  const a = U().form, o = bt(a == null ? void 0 : a.component, "Form");
  return C(o, ((n = a == null ? void 0 : a.transformProps) == null ? void 0 : n.call(a, e)) ?? e, t);
}
function It(e, t = {}) {
  var n;
  const a = U().form, o = bt(a == null ? void 0 : a.item, "FormItem");
  return C(o, ((n = a == null ? void 0 : a.transformItemProps) == null ? void 0 : n.call(a, e)) ?? e, t);
}
function zo(e) {
  const t = U().form;
  if (!t)
    throw new Error(
      `UIAdapter '${U().name}' 未提供 Form capability`
    );
  return t.validate(e);
}
function Tt(e) {
  const t = U().form;
  if (!t)
    throw new Error(
      `UIAdapter '${U().name}' 未提供 Form capability`
    );
  return t.clearValidate(e);
}
function re(e, t = {}, n = {}) {
  var a, o;
  const { component: l, layout: r } = qo(e);
  return C(l, ((o = (a = r == null ? void 0 : r.transformProps) == null ? void 0 : a[e]) == null ? void 0 : o.call(a, t)) ?? t, n);
}
function Tn(e) {
  var t;
  return (t = U().containers) == null ? void 0 : t[e];
}
function Ko(e, t) {
  const n = Tn(e);
  let a = Pn(t, n == null ? void 0 : n.model);
  return n != null && n.transformProps && (a = n.transformProps(a)), a;
}
function Me(e, t = {}, n = {}) {
  const a = Tn(e), o = bt(
    a == null ? void 0 : a.component,
    `Container(${e})`
  ), l = Ko(e, t);
  return a != null && a.render ? a.render(o, l, n) : C(o, l, n);
}
function Ho(e, t = {}) {
  const n = U().icons;
  if (!n)
    throw new Error(
      `UIAdapter '${U().name}' 未提供 Icon capability`
    );
  return n.render(e, t);
}
function Ue(e) {
  var t;
  const n = U().icons;
  if (!n)
    throw new Error(
      `UIAdapter '${U().name}' 未提供 Icon capability`
    );
  const a = (t = n.semantic) == null ? void 0 : t[e];
  return a ? C(bt(a, `Icon(${e})`)) : void 0;
}
function Lt(e, t = {}, n = {}) {
  const a = U().actions;
  if (!a)
    throw new Error(
      `UIAdapter '${U().name}' 未提供 Action capability`
    );
  return a.render(e, t, n);
}
function St(e, t = {}, n = {}) {
  const a = U().presentation;
  if (!a)
    throw new Error(
      `UIAdapter '${U().name}' 未提供 Presentation capability`
    );
  return a.render(e, t, n);
}
function qt(e, t) {
  const n = U().services;
  if (!n)
    throw new Error(
      `UIAdapter '${U().name}' 未提供 Service capability`
    );
  return n.message(e, t);
}
function En(e) {
  const t = U().services;
  if (!t)
    throw new Error(
      `UIAdapter '${U().name}' 未提供 Service capability`
    );
  return t.confirm(e);
}
function Go(e) {
  const t = U().services;
  if (!t)
    throw new Error(
      `UIAdapter '${U().name}' 未提供 Service capability`
    );
  return t.info(e);
}
function Wo(e = {}, t = {}) {
  const n = U().modal;
  if (!n)
    throw new Error(
      `UIAdapter '${U().name}' 未提供 Modal capability`
    );
  return n.render(e, t);
}
function Yo() {
  var e, t;
  return (t = (e = U().modal) == null ? void 0 : e.useContext) == null ? void 0 : t.call(e);
}
function Qo(e, t, n = {}) {
  var a, o;
  return ((o = (a = U().modal) == null ? void 0 : a.wrapContext) == null ? void 0 : o.call(a, e, t, n)) ?? e();
}
function Xo() {
  const e = U().upload;
  if (!e)
    throw new Error(
      `UIAdapter '${U().name}' 未提供 Upload capability`
    );
  return e.listIgnore;
}
function Zo(e = {}, t = {}) {
  const n = U().upload;
  if (!n)
    throw new Error(
      `UIAdapter '${U().name}' 未提供 Upload capability`
    );
  return n.render(e, t);
}
function Jo(e = {}, t = {}) {
  const n = U().upload;
  if (!n)
    throw new Error(
      `UIAdapter '${U().name}' 未提供 Upload capability`
    );
  return n.renderTrigger(e, t);
}
function ea(e = {}) {
  const t = U().preview;
  if (!t)
    throw new Error(
      `UIAdapter '${U().name}' 未提供 Preview capability`
    );
  return t.render(e);
}
function ta(e, t = {}) {
  const n = U().table;
  if (!n)
    throw new Error(
      `UIAdapter '${U().name}' 未提供 Table capability`
    );
  return n.render(e, t);
}
function na(e, t = {}) {
  const n = U().table;
  if (!n)
    throw new Error(
      `UIAdapter '${U().name}' 未提供 Table capability`
    );
  return n.renderFilter(e, t);
}
function oa() {
  const e = U().table;
  if (!e)
    throw new Error(
      `UIAdapter '${U().name}' 未提供 Table capability`
    );
  return e.selectors;
}
function zt(e, t, n) {
  const a = vt(e);
  let o = Pn(
    { ...a == null ? void 0 : a.defaultProps, ...t },
    a == null ? void 0 : a.model
  );
  return a != null && a.transformProps && (o = a.transformProps(o, { type: e, ...n })), o;
}
function aa(e, t, n, a = {}) {
  const o = Bt(e), l = vt(e), r = zt(e, t, n);
  return l != null && l.render ? l.render(o, r, { type: e, ...n }, a) : C(o, r, a);
}
function At(e) {
  if (e)
    return Ho(e, { customIcon: ne.customIcon });
}
const Be = Ue;
function ye(e) {
  const t = ge("exaProvider", {}).data;
  return $({ ...e || {}, formData: t });
}
function ct(e, t) {
  const n = k(Ne(e) ? e : !!e);
  return typeof e == "function" && ke(() => {
    n.value = e(t);
  }), n;
}
function tn(e, t) {
  return ct(e, t);
}
function Mt(e, t) {
  const n = $({});
  return e && ke(() => {
    Object.assign(n, e(t));
  }), n;
}
function ra(e = {}, t) {
  const n = {};
  return Object.keys(e).forEach((a) => {
    !e[a] || a === "onUpdate" || (a.match(/^on[A-Z]/) ? n[a] = (...o) => e[a](t, ...o) : a === "on" && Object.entries(e.on).forEach(([o, l]) => {
      const r = "on" + o.charAt(0).toUpperCase() + o.slice(1);
      n[r] = (...s) => l(t, ...s);
    }));
  }), n;
}
function Kt({ option: e, model: t, effectData: n }, a, o = {}) {
  const {
    field: l,
    endField: r,
    keepField: s,
    labelField: i,
    stringifyValue: u,
    valueToString: b,
    computed: h,
    value: p,
    onUpdate: w
  } = e, d = r ?? s, f = u ?? b, c = {}, g = e.vModelFields || {};
  if (i && (c.labelValue = N(() => je(t.parent, i)), c["onUpdate:labelValue"] = (y) => {
    const _ = f ? y == null ? void 0 : y.toString() : y;
    We(t.parent, i, _);
  }), Object.entries(g).forEach(([y, _]) => {
    var O;
    typeof _ == "string" ? ((O = t.parent)[_] ?? (O[_] = void 0), c[y] = N(() => je(t.parent, _)), c[`onUpdate:${y}`] = (T) => {
      We(t.parent, _, T);
    }) : Ne(_) ? (c[y] = _, c[`onUpdate:${y}`] = (T) => _.value = T) : c[y] = _;
  }), !l)
    return Ne(p) && Object.assign(c, {
      value: p,
      "onUpdate:value": (y) => p.value = y
    }), c;
  a !== void 0 && (t.refData ?? (t.refData = ie(a)));
  const m = le(t, "refData"), v = k(), S = (y = ie(a)) => {
    v.value = y, m.value !== y && a !== void 0 && (m.value = y);
  };
  Object.assign(c, {
    value: v,
    "onUpdate:value": S
  }), Ne(p) && (B(m, (y) => p.value = y), B(p, S));
  let A = ie(t.refData), I;
  if (o.splitRange && d)
    v.value = [m.value, t.parent[d]], I = (y) => {
      const [_, O] = y || [];
      m.value = _, A = _, t.parent[d] = O;
    }, B([m, () => t.parent[d]], (y) => {
      v.value = y;
    });
  else if (f) {
    const y = (_) => (_ == null ? void 0 : _.toString().split(",")) || [];
    v.value = y(m.value), I = (_) => {
      const O = (_ == null ? void 0 : _.toString()) || "";
      m.value = O, A = O;
    }, B(m, (_) => {
      _ !== A && (v.value = y(_));
    });
  } else
    v.value = A, I = (y) => {
      m.value = y, A = y;
    }, B(m, S, { flush: "sync" });
  return B(v, I, { flush: "sync" }), w && B(m, () => w(n)), h && B(
    // 使用ref让计算结果即使一样也会进行后面的赋值
    () => k(h(A, n)),
    (y) => I(z(y)),
    { immediate: !0 }
  ), c;
}
function he({ option: e, effectData: t, inheritDisabled: n }) {
  const { type: a, dynamicAttrs: o, disabled: l, hidden: r, required: s } = e, i = ct(r, t), u = ct(s, t), b = n === void 0 && l === void 0 ? void 0 : N(() => {
    let f = ie(n);
    return f || (typeof l == "function" ? f = !!l(t) : f = ie(l)), f;
  }), h = ra(e, t), p = typeof o == "function" ? { ...Te(Mt(o, t)) } : {}, w = oe({ ...X[a] }, { ...e.attrs }, h, p);
  return { attrs: mt({}, e.attrs, w, { disabled: b }), hidden: i, required: u };
}
function nn(e, t = {}) {
  const n = new RegExp("{(\\w*)}", "g");
  return e.replace(n, (a, o) => t[o] || "");
}
const on = {
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
}, an = {
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
function la(e, t, n, a) {
  let o;
  if (t)
    o = { type: e, len: t, message: "len" };
  else if (qe(n) && qe(a))
    o = { type: e, max: n, min: a, message: "range" };
  else if (qe(n))
    o = { type: e, max: n, message: "max" };
  else if (qe(a))
    o = { type: e, min: a, message: "min" };
  else
    return !1;
  return e === "number" ? (o.message = an.number[o.message], o.transform = (l) => Number(l)) : o.message = an.string[o.message], o;
}
function sa(e, t = "") {
  const { trigger: n, required: a, type: o = "string", len: l, max: r, min: s, pattern: i, validator: u, message: b } = e || {}, h = [];
  a && (o === "string" || o in on ? h.push({
    required: a,
    trigger: n,
    // validator: noEmpty,
    pattern: /^[\s\S]*.*[^\s][\s\S]*$/,
    // transform: (value) => value + '',
    // whitespace: true,
    message: b || `${t}不能为空！`
  }) : h.push({ required: a, trigger: n, message: b || `${t}不能为空！` }));
  const p = on[o];
  if (p) {
    const w = nn(p.message, { label: t });
    h.push({ ...p, trigger: n, message: w });
  }
  if (i && h.push({ pattern: i, trigger: n, message: b }), l || qe(r) || qe(s)) {
    const w = la(o, l, r, s), d = nn(w.message, { label: t, len: l, max: r, min: s });
    h.push({ ...w, trigger: n, message: d, type: o });
  }
  return u && h.push({ validator: u, trigger: n }), h;
}
function Rn(e, t, n) {
  const { field: a, columns: o, subItems: l, initialValue: r, value: s } = e, i = e.endField ?? e.keepField ?? e.labelField, u = a ? a.split(".") : [], b = n.concat(u), h = u.splice(-1)[0], p = $({
    refName: h,
    initialValue: r,
    fieldName: a,
    origin: t,
    parent: t,
    refData: t,
    propChain: b
  });
  return h ? (u.length && (p.parent = N(() => je(t.value, u))), p.refData = N({
    get: () => je(t.value, a),
    set: (w) => We(t.value, a, w)
  }), B(
    t,
    () => {
      p.refData ?? (p.refData = ie(r) ?? ie(s) ?? (o && [] || l && {})), i && Xn(p.parent, i, (w) => w);
    },
    { immediate: !0, flush: "sync" }
  )) : s && (p.refData = k(s), p.propChain = []), p;
}
const dt = (e, t) => e == null ? void 0 : e.map((n) => n.validator ? { ...n, validator: async (o, ...l) => {
  const r = await n.validator({ ...o, ...t }, ...l);
  if (r === !1 || r instanceof Error)
    throw r;
} } : n);
function Ye(e, t, n = []) {
  const a = le(t || {}), o = {}, l = /* @__PURE__ */ new Map();
  return e.forEach((r) => {
    if (typeof r != "object")
      return;
    const s = Rn(r, a, n), { required: i, label: u, subItems: b, columns: h } = r;
    if ((r.rules || i) && s.propChain.length) {
      const p = r.rules || [], w = Array.isArray(p) ? p : [p];
      if (i) {
        const f = w[0];
        f ? f.required = i : w.push({ required: i });
      }
      let d = "string";
      if (s.refData) {
        const f = typeof s.refData;
        d = f === "object" && Array.isArray(s.refData) ? "array" : f;
      }
      s.rules = w.map((f) => sa({ type: d, ...f }, u)).flat(), o[s.propChain.join(".")] = s.rules;
    }
    if (b) {
      const p = Ye(b, le(s, "refData"), s.propChain);
      Object.assign(o, p.rules), s.children = p.modelsMap;
    } else
      h && (s.listData = Ye(h));
    l.set(Hn(r), s);
  }), {
    rules: o,
    modelsMap: l
  };
}
function Le(e, t, n = [], a) {
  const o = le(t || {}), l = {}, r = [...e].map(([s, i]) => {
    const { children: u, rules: b, listData: h } = i, p = a !== void 0 ? [...n, a] : n, w = Rn(s, o, p);
    if (a !== void 0 && (w.index = a), w.rules = b, w.propChain.length && b && (l[w.propChain.join(".")] = b), u) {
      const { modelsMap: d, rules: f } = Le(u, le(w, "refData"), w.propChain);
      Object.assign(l, f), w.children = d;
    }
    return h && (w.listData = h), [s, w];
  });
  return { modelsMap: new Map(r), rules: l };
}
function kn(e, t, n, a) {
  const { modelsMap: o, rules: l } = Le(e, t, n, a), r = [];
  return function s(i) {
    for (const [u, b] of i)
      r.push([u, b]), b.children && s(b.children);
  }(o), { modelsMap: new Map(r), rules: l };
}
const ia = (e, t) => Object.prototype.hasOwnProperty.call(e, t);
function Ht(e, t = {}, n = {}) {
  for (const [a, o] of Object.entries(e))
    Array.isArray(o) ? e[a] = Ge((t == null ? void 0 : t[a]) ?? (n == null ? void 0 : n[a])) : Object.prototype.toString.call(o) === "[object Object]" ? Ht(o, t == null ? void 0 : t[a], n == null ? void 0 : n[a]) : e[a] = (t == null ? void 0 : t[a]) ?? (n == null ? void 0 : n[a]);
}
function xn(e, t, n = {}) {
  for (const [a, o] of Object.entries(e)) {
    if (!ia(t, a))
      continue;
    const l = t[a] ?? (n == null ? void 0 : n[a]);
    ue(o) && ue(l) ? xn(o, l, n == null ? void 0 : n[a]) : Array.isArray(l) || ue(l) ? e[a] = Ge(l) : e[a] = l;
  }
}
function rn() {
  let e;
  return { promise: new Promise((n) => {
    e = n;
  }), resolve: e };
}
function Fn() {
  const e = k();
  let t = rn(), n = !0;
  return B(e, (o) => {
    o ? (t.resolve(!0), n = !1) : n || (t = rn(), n = !0);
  }), [e, () => t.promise.then(() => e.value)];
}
function ee(e, t = {}) {
  return e ? typeof e == "function" ? e(t || {}, {}) : typeof e != "object" ? C("span", e) : C(e, { effectData: t }) : null;
}
function Ze(e, t, n) {
  const a = n || ge("rootSlots", {}), o = {};
  return e && Object.entries(e).forEach(([l, r]) => {
    const s = typeof r == "string" ? a[r] : r;
    s && (o[l] = (i) => typeof s == "function" ? s({ ...t, ...i || {} }) : s);
  }), o;
}
const ln = (e, t) => {
  const n = {};
  return e.vModelFields && Object.entries(e.vModelFields).forEach(([a, o]) => {
    n[a] = t[o];
  }), n;
}, sn = (e, t, n) => ue(e) || !ue(e == null ? void 0 : e[0]) ? Object.entries(e).map(([a, o]) => ({ value: a, label: o })) : Array.isArray(e) ? e.map((a) => ({ label: a[t], value: a[n] })) : [], ua = (e, t, n) => {
  var a, o, l, r;
  const { options: s, dictName: i } = e, u = ((o = (a = e.attrs) == null ? void 0 : a.fieldNames) == null ? void 0 : o.label) || "label", b = ((r = (l = e.attrs) == null ? void 0 : l.fieldNames) == null ? void 0 : r.value) || "value", h = z(s);
  i && ne.dictApi ? ne.dictApi(i).then((p) => n.value = p) : typeof s == "function" ? Promise.resolve(s(t)).then((p) => {
    n.value = sn(p, u, b);
  }).catch((p) => {
    console.warn("useOptionsLabel", p);
  }) : n.value = sn(h, u, b);
}, ht = ({ value: e, label: t = e, color: n, icon: a, tagViewer: o = !0 }) => {
  const l = { color: n, label: t, icon: a };
  if (o !== !0 || !n) {
    const r = o === !0 ? ne.tagViewer : o;
    if (typeof r == "function") {
      const s = r(e);
      ue(s) ? Object.assign(l, s) : l.color = s;
    } else if (Array.isArray(r) && ue(r[0])) {
      const s = r.find((i) => i.value == e);
      Object.assign(l, s);
    }
    l.color ?? (l.color = n || r[e] || e === !0 && "success" || e === !1 && "error" || "default");
  }
  return St(
    "tag",
    { color: l.color },
    {
      default: () => l.label || e,
      icon: l.icon || (() => At(l.icon))
    }
  );
};
function gt(e, t = {}) {
  const {
    type: n = "",
    viewRender: a,
    render: o,
    options: l,
    dictName: r,
    labelField: s,
    valueToNumber: i,
    tagViewer: u,
    initialValue: b
  } = e, h = e.endField ?? e.keepField, p = ge("rootSlots", {}), w = a || n === "InfoSlot" && o, d = typeof w == "string" ? p[w] : w;
  if (w && !d)
    return !1;
  let f = !1;
  const c = (() => {
    var m, v;
    if (s)
      return ({ current: S } = t) => String(je(S, s) ?? "");
    if (h)
      return ({ current: S, text: A } = t) => (A || "") + " - " + (je(S, h) || "");
    if ((l || r) && n !== "AutoComplete") {
      f = !(u === !1 || !u && ne.tagViewer === !1);
      let S = e.labelAsValue ?? e.valueToLabel;
      (m = z(l)) != null && m[0] && !ue((v = z(l)) == null ? void 0 : v[0]) && !i && (S = !0);
      const A = k();
      return (I = t, y) => {
        const _ = [], O = (I.text || I.value) ?? ie(b) ?? "";
        if (O === "")
          return "";
        if (S)
          return !y && f ? ht({ value: O, label: O, tagViewer: u }) : O;
        A.value || ua(e, I, A);
        const R = (Array.isArray(O) ? O : typeof O == "string" ? O.split(",") : [O]).map((E) => {
          var F;
          const L = (F = z(A)) == null ? void 0 : F.find(({ value: V }) => V == E);
          return !y && f && _.push(ht({ value: E, label: E, ...L, tagViewer: u })), L ? L.label : E;
        });
        return _.length ? _ : R.join(",");
      };
    } else if (n === "Switch")
      return ({ text: S } = t) => (e.valueLabels || "否是")[S ?? ie(b)];
  })(), g = !0;
  if (d)
    return (m = t) => {
      const v = ln(e, m.current), { attrs: S } = he({ option: e, effectData: m }), A = { ...S };
      delete A.disabled;
      const I = $({
        props: { ...A, ...v },
        ...m,
        ...c && { text: N(() => c(m, g)) },
        isView: !0
      });
      return d(I);
    };
  if (u && !f)
    return (m = t) => {
      const v = m.text ?? ie(b);
      return typeof v == "boolean" && u === !0 ? ht({
        label: v ? "是" : "否",
        color: v ? "success" : "error"
      }) : (Array.isArray(v) ? v : typeof v == "string" ? v.split(",") : [v]).map((I) => ht({ value: I, tagViewer: u }));
    };
  if (n === "Text" && (e.attrs || e.dynamicAttrs))
    return (m = t) => {
      const v = (c == null ? void 0 : c(m)) || (m.value ?? ie(b)), S = Mt(e.dynamicAttrs, m), A = oe({ ...e.attrs, title: v }, S);
      return C("span", A, v);
    };
  if (n === "HTML")
    return (m = t) => {
      const v = Mt(e.dynamicAttrs, m), S = oe({ ...e.attrs, innerHTML: m.value }, v);
      return C("span", S);
    };
  if (n === "TextArea")
    return (m = t) => C("pre", { style: "white-space: break-spaces;" }, m.value ?? ie(b));
  if (!c && (n === "Upload" || _t(n)))
    return (m = t) => {
      const v = ln(e, m.current), S = Ze(e.slots, m, p), {
        attrs: { disabled: A, ...I }
      } = he({ option: e, effectData: m });
      if (n === "Upload")
        return C(
          me.Upload,
          $({ option: e, effectData: m, ...I, ...v, value: m.value, isView: !0, disabled: A }),
          S
        );
      const y = _t(n);
      return y && C(
        y.component,
        $(
          Bn(y, {
            ...I,
            ...v,
            value: m.value,
            disabled: A
          })
        ),
        S
      );
    };
  if (n === "Buttons") {
    const m = Qe({ config: e, isView: !0 });
    return !!m && ((v = t) => m({ param: v }));
  } else
    return c;
}
const Je = (e, t) => {
  const { title: n, label: a, labelSlot: o, tooltip: l } = e, r = l && (ue(l) ? l : { title: l }), s = n || o || a;
  return s === void 0 ? void 0 : () => [
    ee(s, t),
    l && Lt("tooltip", r, {
      title: () => ee(l.title, t),
      default: () => C(
        "span",
        {
          class: "sup-label-tooltip"
        },
        l.icon ? At(l.icon) : Be("info")
      )
    })
  ];
}, ca = /* @__PURE__ */ new Set([
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
]), da = {
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
}, fa = /* @__PURE__ */ new Set(["Input", "InputNumber", "TextArea", "AutoComplete"]), pa = /* @__PURE__ */ new Set(["Select", "TreeSelect"]), ma = /* @__PURE__ */ new Set(["Select", "TreeSelect", "RadioGroup", "CheckboxGroup"]), va = /* @__PURE__ */ new Set([
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
]), ba = /* @__PURE__ */ new Set(["table", "form", "description"]), ga = /* @__PURE__ */ new Set([
  "attrs",
  "dynamicAttrs",
  "dataSource",
  "initialValue",
  "options",
  "params",
  "rules",
  "treeData",
  "value"
]), Pe = (e) => e !== null && typeof e == "object" && !Array.isArray(e), K = (e, t, n, a) => ({ level: e, code: t, path: n, message: a });
function $t(e, t, n, a) {
  if (!(!e || typeof e != "object" || a.has(e))) {
    if (a.add(e), Pe(e))
      for (const [o, l] of Object.entries(da))
        Object.prototype.hasOwnProperty.call(e, o) && n.push(K("warning", "deprecated-api", `${t}.${o}`, `已废弃，${l}。`));
    for (const [o, l] of Object.entries(e))
      typeof l == "function" || ga.has(o) || (Array.isArray(l) ? l.forEach((r, s) => $t(r, `${t}.${o}[${s}]`, n, a)) : Pe(l) && $t(l, `${t}.${o}`, n, a));
  }
}
function ha(e, t, n, a, o) {
  var l, r, s;
  if (!Pe(e)) {
    typeof e != "string" && n.push(K("error", "invalid-item", t, "字段配置必须是对象。"));
    return;
  }
  const { type: i } = e;
  if (i !== void 0 && (typeof i != "string" || !o.has(i)) && n.push(K("error", "unknown-type", `${t}.type`, `未知字段类型 ${JSON.stringify(i)}。`)), i === void 0 && a !== "table" && n.push(K("warning", "missing-type", `${t}.type`, "表单或详情字段建议明确配置 type。")), Array.isArray(e.exclude)) {
    const p = e.exclude.filter((w) => !ba.has(w));
    p.length && n.push(
      K(
        "error",
        "invalid-exclude",
        `${t}.exclude`,
        `只支持 table、form、description，当前包含：${p.join("、")}。`
      )
    );
  } else
    e.exclude !== void 0 && n.push(K("error", "invalid-exclude", `${t}.exclude`, "exclude 必须是字符串数组。"));
  e.visibleIn !== void 0 && !["form", "detail", "both"].includes(e.visibleIn) && n.push(
    K("error", "invalid-visible-in", `${t}.visibleIn`, "visibleIn 只支持 'form'、'detail'、'both'。")
  ), e.unauthorized !== void 0 && !["hide", "disable"].includes(e.unauthorized) && n.push(
    K("error", "invalid-unauthorized", `${t}.unauthorized`, "unauthorized 只支持 'hide'、'disable'。")
  ), ma.has(i) && !e.options && !e.dictName && n.push(K("warning", "missing-options", t, `${i} 未配置 options 或 dictName。`));
  const u = (l = e.attrs) == null ? void 0 : l.placeholder, b = fa.has(i) ? `请输入${typeof e.label == "string" ? e.label : ""}` : pa.has(i) ? `请选择${typeof e.label == "string" ? e.label : ""}` : void 0;
  b !== void 0 && u === b && n.push(
    K("suggestion", "redundant-default", `${t}.attrs.placeholder`, "与内置 placeholder 相同，可以省略。")
  );
  const h = ["DatePicker", "DateRangePicker"].includes(i) ? "YYYY-MM-DD" : ["TimePicker", "TimeRangePicker"].includes(i) ? "HH:mm:ss" : void 0;
  h && ((r = e.attrs) == null ? void 0 : r.valueFormat) === h && n.push(
    K("suggestion", "redundant-default", `${t}.attrs.valueFormat`, "与内置 valueFormat 相同，可以省略。")
  ), i === "InputGroup" && ((s = e.attrs) == null ? void 0 : s.compact) === !0 && n.push(
    K("suggestion", "redundant-default", `${t}.attrs.compact`, "InputGroup 默认使用紧凑布局，可以省略。")
  ), e.block === !1 && !va.has(i) && n.push(K("suggestion", "redundant-default", `${t}.block`, "block: false 是默认行为，可以省略。")), e.breakAfter === !1 && n.push(
    K("suggestion", "redundant-default", `${t}.breakAfter`, "breakAfter: false 是默认行为，可以省略。")
  ), (e.options || e.dictName) && e.tagViewer === !0 && n.push(
    K("suggestion", "redundant-default", `${t}.tagViewer`, "选项字段默认使用 Tag 展示，可以省略。")
  );
  for (const p of ["hidden", "disabled"])
    e[p] === !1 && n.push(K("suggestion", "redundant-default", `${t}.${p}`, `${p}: false 可以省略。`));
  Object.prototype.hasOwnProperty.call(e, "initialValue") && e.initialValue === void 0 && n.push(
    K("suggestion", "redundant-default", `${t}.initialValue`, "initialValue: undefined 可以省略。")
  );
  for (const p of ["attrs", "rowProps"])
    Pe(e[p]) && Object.keys(e[p]).length === 0 && n.push(K("suggestion", "empty-config", `${t}.${p}`, `空的 ${p} 配置可以省略。`));
  for (const p of ["rules", "options"])
    Array.isArray(e[p]) && e[p].length === 0 && n.push(K("suggestion", "empty-config", `${t}.${p}`, `空的 ${p} 配置可以省略。`));
  e.subItems && Ke(e.subItems, `${t}.subItems`, n, a === "table" ? "form" : a, o), e.columns && Ke(e.columns, `${t}.columns`, n, "table", o);
}
function Ke(e, t, n, a, o) {
  if (!Array.isArray(e)) {
    n.push(K("error", "invalid-items", t, "必须是数组。"));
    return;
  }
  const l = /* @__PURE__ */ new Map();
  e.forEach((r, s) => {
    const i = `${t}[${s}]`;
    ha(r, i, n, a, o), !(!Pe(r) || typeof r.field != "string" || !r.field) && (l.has(r.field) ? n.push(
      K(
        "warning",
        "duplicate-field",
        `${i}.field`,
        `字段 ${r.field} 与 ${l.get(r.field)} 重复。`
      )
    ) : l.set(r.field, `${t}[${s}].field`));
  });
}
function ya(e, t = "auto", n = []) {
  var a, o, l, r, s, i, u;
  const b = [];
  if (!Pe(e))
    return [K("error", "invalid-schema", "schema", "schema 必须是对象。")];
  const h = /* @__PURE__ */ new Set([...ca, ...n]);
  $t(e, "schema", b, /* @__PURE__ */ new WeakSet());
  const p = t === "auto" ? Array.isArray(e.columns) ? "table" : "form" : t;
  if (!["form", "table", "detail"].includes(p))
    return [K("error", "invalid-schema-type", "schema", `未知 schema 类型 ${JSON.stringify(t)}。`)];
  if (e.subSpan === 8 && b.push(K("suggestion", "redundant-default", "schema.subSpan", "subSpan: 8 是默认值，可以省略。")), e.gutter === 16 && b.push(K("suggestion", "redundant-default", "schema.gutter", "gutter: 16 是默认值，可以省略。")), Pe(e.params) && Object.keys(e.params).length === 0 && b.push(K("suggestion", "empty-config", "schema.params", "空的 params 配置可以省略。")), p === "table") {
    for (const w of ["editMode", "addMode"])
      Object.prototype.hasOwnProperty.call(e, w) && b.push(K("warning", "deprecated-api", `schema.${w}`, `已废弃，使用 rowEditor.${w}。`));
    Array.isArray(e.columns) ? Ke(e.columns, "schema.columns", b, "table", h) : b.push(K("error", "missing-columns", "schema.columns", "表格必须配置 columns。")), e.immediate === !0 && b.push(
      K("suggestion", "redundant-default", "schema.immediate", "immediate: true 是默认值，可以省略。")
    ), e.pagination === !1 && b.push(
      K("suggestion", "redundant-default", "schema.pagination", "pagination: false 是默认值，可以省略。")
    ), ((a = e.attrs) == null ? void 0 : a.rowKey) === "id" && b.push(
      K("suggestion", "redundant-default", "schema.attrs.rowKey", "rowKey: 'id' 是默认值，可以省略。")
    ), ((o = e.attrs) == null ? void 0 : o.size) === "small" && b.push(
      K("suggestion", "redundant-default", "schema.attrs.size", "size: 'small' 是默认值，可以省略。")
    ), ((l = e.attrs) == null ? void 0 : l.tableLayout) === "fixed" && b.push(
      K(
        "suggestion",
        "redundant-default",
        "schema.attrs.tableLayout",
        "tableLayout: 'fixed' 是默认值，可以省略。"
      )
    ), Pe(e.pagination) && e.pagination.current === 1 && b.push(
      K("suggestion", "redundant-default", "schema.pagination.current", "分页 current 默认是 1，可以省略。")
    ), Pe(e.pagination) && e.pagination.pageSize === 10 && b.push(
      K("suggestion", "redundant-default", "schema.pagination.pageSize", "分页 pageSize 默认是 10，可以省略。")
    ), (r = e.searchForm) != null && r.subItems && Ke(e.searchForm.subItems, "schema.searchForm.subItems", b, "form", h), (i = (s = e.rowEditor) == null ? void 0 : s.form) != null && i.subItems && Ke(e.rowEditor.form.subItems, "schema.rowEditor.form.subItems", b, "form", h);
  } else
    Array.isArray(e.subItems) ? (((u = e.attrs) == null ? void 0 : u.labelAlign) === "right" && b.push(
      K("suggestion", "redundant-default", "schema.attrs.labelAlign", "labelAlign: 'right' 是默认值，可以省略。")
    ), Ke(e.subItems, "schema.subItems", b, p, h)) : b.push(K("error", "missing-sub-items", "schema.subItems", "表单或详情必须配置 subItems。"));
  return b;
}
function wa(e, t = "auto") {
  return ya(e, t, mr());
}
function ft(e, t, n) {
  var a, o;
  const l = wa(e, t);
  return l.length && ((a = console.groupCollapsed) == null || a.call(console, `[superform] ${n} schema 诊断：${l.length} 项`), l.forEach(({ level: r, path: s, message: i }) => {
    const u = `[superform] ${s}: ${i}`;
    r === "error" ? console.error(u) : r === "warning" ? console.warn(u) : console.info(u);
  }), (o = console.groupEnd) == null || o.call(console)), l;
}
const Sa = () => mt(
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
        danger: !0
      },
      confirmText: "确定要删除吗？",
      disabled: (e) => {
        var t;
        return !e.record && !(((t = e.selectedRows) == null ? void 0 : t.length) > 0);
      }
    },
    edit: {
      label: "修改",
      disabled: (e) => {
        var t;
        return !e.record && ((t = e.selectedRows) == null ? void 0 : t.length) !== 1;
      }
    },
    detail: {
      label: "查看",
      disabled: (e) => {
        var t;
        return !e.record && ((t = e.selectedRows) == null ? void 0 : t.length) !== 1;
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
  ne.defaultButtons
);
function _a(e) {
  const t = Sa();
  return Object.keys(e).forEach((n) => {
    t[n] ? typeof e[n] == "function" ? t[n].onClick = e[n] : mt(t[n], { attrs: { title: t[n].label } }, e[n]) : t[n] = e[n];
  }), t;
}
function Ca(e, t = {}, n = {}) {
  const a = _a(t), o = [];
  return Array.isArray(e) && e.forEach((l) => {
    const r = typeof l == "string" ? l : l.name, { onClick: s, ...i } = a[r] || {};
    i.attrs = Fe({ ...n }, i.attrs), typeof l == "object" && Object.assign(i, l, { attrs: { ...i.attrs, ...l.attrs } });
    const u = k(!1), b = i.attrs.loading, h = Ne(b);
    !h && b && (i.attrs.loading = u);
    const p = (c) => {
      h || (u.value = c ? b : !1);
    }, w = { label: i.label, ...l.meta }, d = l.onClick, f = (c, g, m) => {
      c ? En({
        title: () => ee(c, m),
        okText: "确定",
        cancelText: "取消",
        ...X.Modal,
        onOk: g
      }) : (p(!0), Promise.resolve(g()).finally(() => {
        p(!1);
      }));
    };
    i.onClick = (c) => {
      const g = { ...c, meta: w };
      d && s ? f(
        i.confirmText,
        () => d(g, async (m) => s({ ...g, ...m })),
        c
      ) : f(i.confirmText, () => {
        var m;
        return (m = s || d) == null ? void 0 : m(g);
      }, c);
    }, o.push(i);
  }), o;
}
function Ia(e, t, n) {
  const { size: a, buttonShape: o, buttonType: l, limit: r, hidden: s, disabled: i, actions: u } = e, b = e.unauthorized ?? (e.invalidDisabled || e.roleMode === "disable" ? "disable" : e.roleMode && "hide"), h = e.labelMode === "icon", p = { size: a, type: l, shape: o }, w = tn(i, t), d = ct(s, t);
  let f = Ca(u, n, p);
  if (ne.buttonRoles) {
    const S = ne.buttonRoles();
    f = f.filter((A) => {
      if (!(!A.roleName || S.includes(A.roleName)))
        if ((A.unauthorized ?? (A.invalidDisabled || A.roleMode === "disable" ? "disable" : A.roleMode && "hide") ?? b ?? "hide") === "disable")
          A.disabled = !0;
        else
          return !1;
      return !0;
    });
  }
  const c = ge("rootSlots", {}), g = f.map((S) => {
    const A = ct(S.hidden, t), I = S.disabled !== void 0 ? tn(S.disabled, t) : w, y = (R) => {
      var E;
      return (E = S.onClick) == null ? void 0 : E.call(S, { ...t, e: R });
    }, _ = S.dropdown && N(() => {
      const R = ie(S.dropdown);
      return ue(R) ? Object.entries(R).map(([E, F]) => ({
        value: E,
        label: F
      })) : typeof R[0] != "object" ? Zn(R).map((E) => ({ value: E, label: E })) : R;
    }), O = typeof S.customRender == "string" ? c[S.customRender] : S.customRender, T = N(() => {
      const R = I.value && S.disabledTooltip ? S.disabledTooltip : S.tooltip || (h && S.icon ? S.label : void 0);
      return typeof R == "function" ? R(t) : R;
    });
    return {
      isHide: A,
      render: O,
      menu: _,
      ...S,
      tooltipTitle: T,
      onClick: y,
      attrs: { ...p, ...S.attrs, disabled: I }
    };
  }), m = k([]), v = k([]);
  return ke(() => {
    const S = d.value ? [] : g.filter(({ isHide: A }) => !A.value);
    if (m.value = S, r != null) {
      const A = h && S.length === r + 1 ? r + 1 : r;
      m.value = S.slice(0, A), v.value = S.slice(A);
    }
  }), { btns: m, moreBtns: v, defaultAttrs: p };
}
const Ae = /* @__PURE__ */ Y({
  __name: "ButtonGroup",
  props: {
    option: {},
    methods: {},
    effectData: {}
  },
  setup(e) {
    const t = e, { option: n, methods: a, effectData: o } = t, l = Array.isArray(n) ? { actions: n } : n, { attrs: r, moreLabel: s, divider: i, buttonType: u } = l, b = l.labelMode === "icon", h = l.labelMode === "label", { btns: p, moreBtns: w, defaultAttrs: d } = Ia(l, $(o || {}), a || l.methods), f = i ?? ((r == null ? void 0 : r.direction) !== "vertical" && ["link", "text"].includes(u || ""));
    return (c, g) => (Ce(), He(rt(
      () => z(Lt)("group", {
        groupProps: z(r),
        buttons: z(p),
        moreButtons: z(w),
        defaultButtonProps: z(d),
        divider: z(f),
        labelOnly: h,
        iconOnly: b,
        moreLabel: z(s),
        effectData: z(o)
      })
    )));
  }
});
function Qe({ config: e, methods: t, effectData: n, isView: a }) {
  const o = Array.isArray(e) ? { actions: e } : e, l = (o == null ? void 0 : o.visibleIn) ?? (o == null ? void 0 : o.validOn);
  if (!o || a && l === "form" || !a && l === "detail")
    return;
  let r = o.actions || [];
  if (l || (o.actions = r = r.filter((s) => {
    if (typeof s == "string")
      return !a;
    {
      const i = s.visibleIn ?? s.validOn;
      return a ? i !== "form" : i !== "detail";
    }
  })), r.length !== 0)
    return (s = {}) => C(Ae, { option: o, methods: t, effectData: n, ...s });
}
const Gt = Y({
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
    return xe(e.name, e.data || {}), t.slots.default;
  }
});
function Ve(e, t, n) {
  var a, o, l, r;
  const { options: s, dictName: i, valueToNumber: u } = e, b = ((o = (a = e.attrs) == null ? void 0 : a.fieldNames) == null ? void 0 : o.label) || "label", h = ((r = (l = e.attrs) == null ? void 0 : l.fieldNames) == null ? void 0 : r.value) || "value", p = k(t || []);
  return typeof s == "function" ? Gn(() => {
    Promise.resolve(s(n)).then((d) => {
      p.value = d;
    });
  }) : s ? B(
    () => z(s),
    (d) => p.value = d,
    { immediate: !0 }
  ) : i && ne.dictApi && ne.dictApi(i).then((d) => p.value = d), {
    optionsRef: N(() => {
      let d = e.labelAsValue ?? e.valueToLabel;
      const f = Sn(p.value) ? p.value : [];
      return f[0] && !ue(f[0]) && !u && (d = !0), ue(p.value) || !ue(f[0]) ? Object.entries(p.value).map(([c, g]) => ({
        label: g,
        value: d ? g : u ? Number(c) : c
      })) : f.map((c) => ({
        ...c,
        label: c[b],
        value: d ? c[b] : u ? Number(c[h]) : c[h]
      }));
    }),
    setOptions(d) {
      p.value = d;
    }
  };
}
function nt(e) {
  const t = { ...e };
  return delete t.labelValue, delete t["onUpdate:labelValue"], t;
}
function Et(e, t) {
  const n = (a) => {
    var o;
    return (o = e.find((l) => Object.is(l.value, a))) == null ? void 0 : o.label;
  };
  return Array.isArray(t) ? t.map(n) : n(t);
}
const un = {
  picker: ({ option: e, effectData: t }) => ({
    modelBehavior: {
      splitRange: !!(e.endField ?? e.keepField)
    },
    transformProps(n) {
      const a = n.disabledDate;
      return typeof a != "function" ? n : {
        ...n,
        disabledDate: (o) => a(o, t)
      };
    }
  }),
  input: ({ attrs: e }) => {
    const t = k(!1), n = e.onSearch, a = typeof n == "function", o = a ? async (...l) => {
      t.value = !0;
      try {
        await n(...l);
      } finally {
        t.value = !1;
      }
    } : void 0;
    return {
      transformProps: (l) => ({
        ...l,
        search: a,
        searchLoading: t.value,
        ...o && { onSearch: o }
      })
    };
  },
  autoComplete: ({ option: e, effectData: t, attrs: n }) => {
    const { optionsRef: a } = Ve({ ...e, labelAsValue: !0 }, n.options, t);
    return {
      transformProps: (o) => ({ ...o, options: a.value })
    };
  },
  select: ({ option: e, effectData: t, attrs: n }) => {
    const { optionsRef: a, setOptions: o } = Ve(e, n.options, t), l = typeof n.onSearch == "function" ? jt(n.onSearch, 600, { leading: !1 }) : void 0, r = n.showSearch && !l && typeof e.options == "function" ? jt(
      (u) => {
        Promise.resolve(e.options(t, u)).then(o);
      },
      600,
      { leading: !1 }
    ) : void 0;
    let s = {};
    const i = (u) => {
      var b;
      e.labelField && ((b = s["onUpdate:labelValue"]) == null || b.call(s, Et(a.value, u)));
    };
    return {
      transformProps(u) {
        return s = u, {
          ...nt(u),
          options: a.value,
          onValueChange: i,
          onSearch: l || r
        };
      }
    };
  },
  radioGroup: ({ option: e, effectData: t, attrs: n }) => {
    const { optionsRef: a } = Ve(e, n.options, t);
    let o = {};
    const l = (r) => {
      var s;
      e.labelField && ((s = o["onUpdate:labelValue"]) == null || s.call(o, Et(a.value, r)));
    };
    return {
      transformProps(r) {
        return o = r, {
          ...nt(r),
          options: a.value.map((i) => ({
            ...i,
            label: ee(i.label, t)
          })),
          onValueChange: l
        };
      }
    };
  },
  checkboxGroup: ({ option: e, effectData: t, attrs: n }) => {
    const { optionsRef: a } = Ve(e, n.options, t);
    let o = {};
    const l = (r) => {
      var s;
      e.labelField && ((s = o["onUpdate:labelValue"]) == null || s.call(o, Et(a.value, r)));
    };
    return {
      transformProps(r) {
        return o = r, {
          ...nt(r),
          options: a.value,
          onValueChange: l
        };
      }
    };
  },
  treeSelect: ({ option: e, effectData: t }) => {
    const n = k([]), a = e.treeData ?? e.data;
    typeof a == "function" ? ke(() => {
      Promise.resolve(a(t)).then((r) => n.value = r || []);
    }) : a && B(
      () => z(a),
      (r) => n.value = r || [],
      { immediate: !0 }
    );
    let o = {};
    const l = (r, s) => {
      var i;
      e.labelField && ((i = o["onUpdate:labelValue"]) == null || i.call(o, s));
    };
    return {
      transformProps(r) {
        return o = r, { ...nt(r), treeData: n.value, onValueChange: l };
      }
    };
  },
  switch: ({ option: e, effectData: t, attrs: n, model: a }) => {
    const { optionsRef: o } = Ve(e, n.options, t), l = le(a, "refData"), [r, s] = e.valueLabels || [], i = e.valueToNumber ?? n.valueToNumber, u = i ? 1 : !0, b = i ? 0 : !1, h = N(() => {
      const [c, g] = o.value;
      return n.firstIsChecked ? {
        trueLabel: (c == null ? void 0 : c.label) ?? s,
        falseLabel: (g == null ? void 0 : g.label) ?? r,
        trueValue: (c == null ? void 0 : c.value) ?? u,
        falseValue: (g == null ? void 0 : g.value) ?? b
      } : {
        trueLabel: (g == null ? void 0 : g.label) ?? s,
        falseLabel: (c == null ? void 0 : c.label) ?? r,
        trueValue: (g == null ? void 0 : g.value) ?? u,
        falseValue: (c == null ? void 0 : c.value) ?? b
      };
    }), p = (c) => {
      if (!e.labelField)
        return;
      const g = o.value.find((v) => Object.is(v.value, c)), m = (g == null ? void 0 : g.label) ?? (Object.is(c, h.value.trueValue) ? h.value.trueLabel : Object.is(c, h.value.falseValue) ? h.value.falseLabel : void 0);
      We(a.parent, e.labelField, m);
    }, w = N(
      () => n.options !== void 0 || e.options !== void 0 || !!e.dictName
    );
    B(
      [l, o],
      ([c, g]) => {
        if (c === void 0) {
          if (w.value && !g.length)
            return;
          const m = n.defaultChecked ? h.value.trueValue : h.value.falseValue;
          a.refData = m, p(m);
        } else
          p(c);
      },
      { immediate: !0 }
    );
    let d = {};
    const f = (c) => {
      var g;
      (g = d["onUpdate:value"]) == null || g.call(d, c), p(c);
    };
    return {
      transformProps(c) {
        return d = c, { ...nt(c), ...h.value, "onUpdate:value": f };
      }
    };
  }
};
function Aa(e, t) {
  const n = e.map((a) => {
    var o;
    return (o = un[a]) == null ? void 0 : o.call(un, t);
  }).filter(Boolean);
  return {
    modelBehavior: Object.assign({}, ...n.map(({ modelBehavior: a }) => a)),
    transformProps: (a) => n.reduce((o, l) => l.transformProps ? l.transformProps(o) : o, a)
  };
}
const Oa = Y({
  name: "FieldProcessorRenderer",
  inheritAttrs: !1,
  props: {
    // 不能命名为 type，否则 Input 的 attrs.type 会覆盖 Schema 字段类型。
    fieldType: { type: String, required: !0 },
    processors: { type: Array, required: !0 },
    option: { type: Object, required: !0 },
    model: { type: Object, required: !0 },
    effectData: { type: Object, required: !0 }
  },
  setup(e, t) {
    const n = Aa(e.processors, {
      option: e.option,
      effectData: e.effectData,
      attrs: t.attrs,
      model: e.model
    }), a = Kt(
      {
        option: e.option,
        model: e.model,
        effectData: e.effectData
      },
      void 0,
      n.modelBehavior
    );
    return () => {
      const o = n.transformProps($({ ...t.attrs, ...a }));
      return aa(
        e.fieldType,
        o,
        {
          option: e.option,
          effectData: e.effectData
        },
        t.slots
      );
    };
  }
}), Ee = Y({
  inheritAttrs: !1,
  name: "Collections",
  props: {
    option: {
      type: Object,
      default: () => ({})
    },
    model: {
      required: !0,
      type: Object
    },
    effectData: Object
  },
  setup(e) {
    const { type: t, attrs: n, gutter: a = 16, subSpan: o } = e.option, l = { gutter: a, ...e.option.rowProps }, r = ge("inheritOptions", {}), s = o ?? r.subSpan, i = N(() => e.model.index), u = [];
    let b;
    const h = [...e.model.children];
    for (let d = 0; d < h.length; d++) {
      const [f, c] = h[d], { type: g, align: m, span: v, hideInForm: S, exclude: A, editable: I } = f, y = f.block ?? f.blocked, _ = f.breakAfter ?? f.wrapping, { parent: O, refData: T } = W(c), R = ye({
        parent: e.effectData,
        current: O,
        field: c.refName,
        value: T,
        ...i.value !== void 0 && {
          index: i,
          record: c.refName ? O : T
        }
      });
      if (g === "Hidden" || (A ? A.includes("form") : S)) {
        Kt({ option: f, model: c, effectData: R });
        continue;
      }
      const { hidden: E, required: F, attrs: L } = he({
        option: f,
        effectData: R,
        inheritDisabled: r.disabled
      });
      if (g === "Fragment") {
        c.children && h.splice(
          d + 1,
          0,
          ...[...c.children].map(([G, J]) => [{ ...G, hidden: E, disabled: L.disabled }, J])
        );
        continue;
      }
      let V = Ot(f, c, R, L);
      if (!V)
        continue;
      if ((Pt(g) || Dn(g)) && I !== void 0 && I !== !0) {
        const G = V, J = N(() => Xe(I) ? I(R) : I), ce = gt(f, $({ ...Te(R), isView: !0 }));
        V = () => J.value ? G() : ce ? ce() : T.value;
      }
      const q = { ...f.colProps, span: v };
      if (Fe(q, { span: s }, X.Col, { span: 8 }), (q.span === 0 || q.flex) && (q.span = void 0), t === "InputGroup" && (n == null ? void 0 : n.compact) !== !1) {
        const G = Number(q.span) && (100 / (24 / q.span)).toFixed(2) + "%";
        u.push(() => !E.value && C(V, oe({ style: { width: G } }, q)));
        continue;
      }
      let H = V;
      const Q = [...pt, "InputList", "InputGroup"].includes(g);
      if (!Q && (!y || f.field && f.label)) {
        const G = dt(c.rules, R), J = N(
          () => z(L.disabled) ? void 0 : !f.required || F.value ? G : G.slice(1)
        ), ce = oe(X.FormItem, f.formItemProps), de = Je(f, R);
        H = () => It(
          $({
            ...ce,
            name: c.propChain,
            rules: J,
            colon: !!de
          }),
          {
            default: V,
            label: de
          }
        );
      }
      if (Q) {
        const G = {
          required: F,
          disabled: L.disabled,
          subSpan: f.subSpan ?? s
        };
        H = () => C(Gt, { name: "inheritOptions", data: G }, V);
      }
      const se = y ?? (pt.includes(g) && !f.span), x = m && `text-align: ${m}`;
      se ? (b = void 0, u.push(
        () => !E.value && C(
          "div",
          {
            class: ["sup-form-section", g === "Descriptions" && "sup-detail"],
            style: x,
            key: d
          },
          H()
        )
      )) : (g === "InputList" && (q.span = v ?? 24), b || u.push(b = []), b.push(
        () => !E.value && re("col", oe({ style: x, key: d }, q), { default: H })
      ), _ && (b = void 0));
    }
    let p = !1;
    const w = () => u.map((d) => Array.isArray(d) ? (p = !0, re("row", l, {
      default: () => d.map((f) => f())
    })) : d());
    return () => e.option.isContainer && p ? C(
      me.Group,
      {
        class: "sup-form-section",
        option: e.option,
        model: e.model,
        effectData: e.effectData
      },
      { innerContent: w }
    ) : w();
  }
});
function Ot(e, t, n, a) {
  const { type: o, render: l } = e;
  if (!o)
    return;
  const r = ge("rootSlots", {}), s = Ze(e.slots, n), i = l ? void 0 : vt(o), u = i == null ? void 0 : i.processors, b = i ? void 0 : _t(o), h = !l && i ? Bt(o) : void 0, p = l ? typeof l == "function" ? l : r[l] : (b == null ? void 0 : b.component) || me[o] || h;
  let w;
  if (o === "InfoSlot")
    w = p && (() => p({ props: a, ...n }));
  else if (o === "Text")
    w = () => C("span", a, t.refData);
  else if (o === "HTML")
    w = () => C("span", { ...a, innerHTML: t.refData });
  else if (o === "Buttons")
    w = () => C(Ae, { option: e, effectData: n, ...a });
  else if (pt.includes(o) || o === "InputList")
    w = () => C(me[o], $({ option: e, model: t, effectData: n, ...a }), s);
  else if (!p)
    console.error(`组件 '${o}' 配置错误，请检查名称或'render'是否正确！`);
  else if (h && (u != null && u.length))
    w = () => C(Oa, { ...a, fieldType: o, processors: u, option: e, model: t, effectData: n }, s);
  else {
    const d = Kt({ option: e, model: t, effectData: n }), f = { ...a, ...d };
    o === "InputSlot" ? w = () => p == null ? void 0 : p($({ props: f, ...n })) : h ? w = () => C(h, $(zt(o, f, { option: e, effectData: n })), s) : (b == null ? void 0 : b.source) === "custom" || (b == null ? void 0 : b.source) === "auto" ? w = () => C(p, $(Bn(b, f)), s) : w = () => C(p, $({ option: e, model: t, effectData: n, ...f }), s);
  }
  return w;
}
const Da = Y({
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
    const n = le(e, "source"), { modelsMap: a } = Le(e.modelsMap, n);
    return xe("exaProvider", { data: le(e, "source") }), () => {
      var o;
      return C(
        "div",
        { class: ["sup-form-section sup-detail", ((o = t.attrs) == null ? void 0 : o.isContainer) && "sup-container"] },
        C(me.Descriptions, {
          option: e.option,
          model: { children: a },
          effectData: $({ current: n }),
          isView: !0
        })
      );
    };
  }
}), $e = Y({
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
  setup({ option: e, modelsMap: t, isRoot: n, effectData: a }, o) {
    var l;
    const r = ge("exaProvider", {}).attrs, s = ge("gridConfig", r), i = {
      ...X.Descriptions,
      ...s
    }, u = Fe({ gutter: e.gutter }, e.rowProps || i.rowProps, X.row, {
      gutter: 16
    }), b = {
      subSpan: e.subSpan,
      ...e.descriptionsProps,
      ...o.attrs
    }, h = Fe(
      {
        subSpan: e.subSpan ?? i.subSpan,
        rowProps: u,
        ...b
      },
      i
    ), p = h.subSpan ?? (h.subSpan = ((l = X.Col) == null ? void 0 : l.span) ?? 12), w = Ut(t, e, a), d = [];
    let f, c;
    w.forEach((m, v) => {
      m.node ?? (m.node = () => Me("descriptions", {
        config: b,
        items: m.group,
        class: b.class
      })), m.isBlock ? (m.group || m.option.type === "InputList" ? (c || (c = [], d.push(["section", c])), c.push(m)) : (d.push(["block", m]), c = void 0), f = void 0) : (!f && d.push(["row", f = []]), f.push(m), c = void 0);
    });
    const g = () => C(
      Gt,
      { name: "gridConfig", data: h },
      () => d.map(([m, v], S) => {
        let A = v.node;
        return m === "row" ? A = () => re("row", u, {
          default: () => v.map((I, y) => {
            const _ = I.option.colProps || {
              span: I.option.span ?? p
            };
            return !z(I.hidden) && re("col", { ...X.Col, ..._, key: y }, { default: I.node });
          })
        }) : m === "section" && (A = () => v.map((I) => !z(I.hidden) && I.node())), !z(v.hidden) && (d.length > 1 ? C("div", { class: "sup-form-section", key: S }, A()) : A());
      })
    );
    return n ? () => C(
      me.Group,
      oe(
        { class: "sup-form-section" },
        {
          option: e,
          model: {},
          effectData: ye({}),
          isView: !0,
          ...b
        }
      ),
      { innerContent: g }
    ) : g;
  }
});
function Ut(e, t, n) {
  const a = [];
  let o;
  const l = ge("rootSlots", {});
  return [...e].forEach(([r, s], i) => {
    var u, b, h;
    const { type: p = "", field: w, hideInDescription: d, viewRender: f, exclude: c } = r;
    if (p === "Hidden" || d || c != null && c.includes("description"))
      return;
    const { parent: g, refData: m } = Te($(s)), v = ye({
      parent: n,
      current: g,
      isView: !0,
      field: s.refName,
      value: m,
      text: m,
      ..."index" in s && {
        index: s.index,
        record: w ? m : g
      }
    }), { attrs: S, hidden: A } = he({ option: r, effectData: v }), I = Ze(r.slots, v), y = Je(r, v);
    let _ = r.block ?? r.blocked, O;
    const T = [], R = typeof f == "string" ? l[f] : f;
    O = R && (() => ee(R, v));
    const E = s.children || ((u = s.listData) == null ? void 0 : u.modelsMap);
    if (p === "InputGroup") {
      if (!f) {
        let F = r.breakAfter ?? r.wrapping;
        const V = (b = Ut(E, r, v)[0].group) == null ? void 0 : b.map(({ option: q, content: H }) => {
          const Q = q.labelSlot || q.label, se = (S == null ? void 0 : S.compact) === !1 && Q;
          return F = (q.breakAfter ?? q.wrapping) || F, () => C("span", [se && ee(Q, v), se && ": ", H == null ? void 0 : H()]);
        });
        O = () => re(
          "space",
          { direction: F ? "vertical" : "horizontal" },
          {
            default: () => V == null ? void 0 : V.map((q) => q())
          }
        );
      }
      T.push({ option: r, label: y, hidden: A, content: O });
    } else if (p === "Fragment") {
      const F = Ut(E, r, v), L = F[0].group;
      L && (F.shift(), T.push(...L.map((V) => ({ ...V, hidden: A })))), F.length && (o = void 0, a.push(...F));
    } else if (s.children || s.listData || pt.includes(p)) {
      _ ?? (_ = !r.span);
      const F = [...pt, "InputList"].includes(p) ? p : "Group", L = me[F], V = () => C(
        L,
        $({
          option: r,
          model: s,
          effectData: v,
          isView: !0,
          ...X[F],
          ...S
        }),
        I
      );
      O ?? (O = V), p === "InputList" && (!_ || y && !(S != null && S.labelIndex) ? T.push({
        option: { ...r },
        label: y,
        hidden: A,
        content: O
      }) : O = V);
    } else {
      const F = Pa(r, s, v);
      F && T.push({ option: r, label: y, hidden: A, content: F });
    }
    if (!(!T.length && !O))
      if (T.length && !_)
        o || (o = [], a.push({ option: t, isBlock: !0, group: o })), o.push(...T);
      else {
        if (T.length && y)
          a.push({ option: t, isBlock: _, group: T });
        else {
          const F = r.align && { textAlign: r.align };
          O = ((h = T[0]) == null ? void 0 : h.content) || O, a.push({
            option: r,
            isBlock: _,
            node: () => C(O, { style: F }),
            hidden: A
          });
        }
        o = void 0;
      }
  }), a;
}
function Pa(e, t, n) {
  const { parent: a, refData: o } = Te($(t)), l = t.refName ? o : void 0, r = W(a.value) === W(n.current) ? n : ye({
    parent: n,
    current: a,
    text: l,
    value: l,
    field: t.refName,
    isView: !0
  }), s = gt(e, r);
  return s === !1 ? void 0 : () => s ? s() : String(t.refData ?? "");
}
const Rt = Y({
  inheritAttrs: !1,
  props: {
    option: { type: Object, required: !0 },
    model: { type: Object, required: !0 },
    effectData: Object,
    isView: Boolean
  },
  setup({ option: e, model: t, effectData: n, isView: a }, o) {
    const { type: l, label: r, title: s = r, buttons: i, contentAttrs: u } = e, b = l === "Descriptions" || a;
    let h;
    if (i) {
      const S = Array.isArray(i) ? { actions: i } : i;
      l === "Descriptions" && (S.visibleIn ?? (S.visibleIn = S.validOn ?? "detail")), h = Qe({
        config: S,
        effectData: n,
        isView: b
      });
    }
    const { style: p, class: w, ...d } = o.attrs, f = {
      ...o.slots,
      title: s ? Je(e, n) : void 0,
      actions: h,
      default: () => C(
        "div",
        u,
        o.slots.innerContent ? o.slots.innerContent(d) : b ? C($e, {
          option: { descriptionsProps: d, ...e },
          modelsMap: t.children,
          effectData: n
        }) : C(Ee, { option: e, model: t, effectData: n })
      )
    }, c = e.component && W(e.component);
    let g, m;
    const v = i == null ? void 0 : i.align;
    return h && (i.placement === "bottom" ? m = () => C(
      "div",
      {
        class: "sup-bottom-buttons",
        style: { textAlign: v || "center" }
      },
      h()
    ) : g = () => re(
      "col",
      {
        class: "sup-title-buttons",
        flex: 1,
        style: {
          textAlign: v || (s ? "right" : void 0)
        }
      },
      { default: h }
    )), c ? () => C(c, {}, f) : () => C("div", oe({ class: w, style: p }, { class: "sup-group" }), [
      (s || g) && re(
        "row",
        { align: "middle", class: "sup-titlebar" },
        {
          default: () => [
            s && re("col", { class: "sup-title" }, { default: f.title }),
            g == null ? void 0 : g()
          ]
        }
      ),
      f.default(),
      m && m()
    ]);
  }
}), Ta = {
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
  setup(e, { expose: t, emit: n, slots: a }) {
    var o;
    const l = k(), r = k({}), {
      option: { onSubmit: s, onReset: i, buttons: u, ...b },
      ignoreRules: h,
      compact: p
    } = e, w = $({ formData: r, current: r }), { attrs: d } = he({ option: b, effectData: w }), f = /* @__PURE__ */ new Set(), c = (_) => {
      _ && f.add(_);
    };
    xe("exaProvider", {
      data: yn(r),
      attrs: d,
      onSubmit: c
    }), xe("inheritOptions", {
      disabled: d.disabled,
      subSpan: b.subSpan
    });
    const g = (_) => Promise.all(
      [...f, s].map(async (O) => {
        const T = await (O == null ? void 0 : O(_));
        return T === !1 || T && T.errMessage ? Promise.reject({ message: T && T.errMessage }) : T;
      })
    );
    h && Object.assign(d, { hideRequiredMark: !0, validateTrigger: "none" });
    const m = {
      dataSource: r,
      submit: () => zo(l.value).then((..._) => g(r.value).then(
        () => {
          const O = Ge(r.value);
          return n("submit", O), O;
        },
        (O) => (typeof O == "object" && O.message && qt("error", O.message), Promise.reject(O))
      )),
      setFieldsValue(_) {
        return l.value && Tt(l.value), xn(r.value, _, A);
      },
      resetFields(_ = {}) {
        Ht(r.value, _, A), l.value && Tt(l.value);
        const O = Ge(r.value);
        return i == null || i(O), n("reset", O), O;
      }
    }, v = Array.isArray(u) ? { actions: u } : u;
    (o = v == null ? void 0 : v.actions) != null && o.length && (b.subItems = [
      ...b.subItems,
      {
        type: "InfoSlot",
        align: v.align || "center",
        block: !0,
        render: () => C(Ae, {
          option: v,
          methods: {
            submit: m.submit,
            reset: m.resetFields,
            search: m.submit
          },
          effectData: w
        }),
        ...v.placement === "inline" && {
          span: "auto",
          block: !1,
          align: v.align || "right"
        }
      }
    ]);
    const { modelsMap: S } = Ye(b.subItems, r), A = Ge(r.value);
    B(
      () => z(e.dataSource ?? e.option.dataSource),
      (_) => {
        _ && (l.value && Tt(l.value), r.value = _);
      },
      { immediate: !0, flush: "sync" }
    );
    const I = $({ ...m }), y = (_) => {
      if (!_) {
        n("register", null);
        return;
      }
      Object.assign(I, _, m), l.value = _, n("register", I);
    };
    return t(I), () => wt(
      {
        ref: y,
        class: ["sup-form", p && "sup-form-compact", h && "sup-form-simple"],
        model: r.value,
        labelAlign: "right",
        ...d
      },
      {
        ...a,
        default: () => C(Ee, {
          option: b,
          model: { refData: r, children: S },
          effectData: w
        })
      }
    );
  }
}, Ea = Y({
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
    const { option: a, model: o, compact: l } = e, { slots: r } = a, s = k();
    let i = dt(o.rules, e.effectData), u = o.propChain;
    const b = {};
    if (i)
      B(
        () => o.refData,
        () => {
          var f, c;
          return (c = (f = s.value) == null ? void 0 : f.onFieldChange) == null ? void 0 : c.call(f);
        },
        { deep: !0 }
      );
    else if (o.children && l) {
      const f = {
        type: "object",
        required: !1,
        fields: {}
      };
      for (const c of o.children.values())
        if (c.rules && c.fieldName) {
          c.rules[0].required && (f.required = !0);
          const g = $({
            ...e.effectData,
            parent: e.effectData,
            current: c.parent,
            field: c.fieldName,
            value: c.refData
          });
          if (f.fields[c.fieldName] = dt(c.rules, g), !o.refName) {
            u = c.propChain, i = f.fields[c.fieldName], B(
              () => z(c.refData),
              () => {
                var m, v;
                return (v = (m = s.value) == null ? void 0 : m.onFieldChange) == null ? void 0 : v.call(m);
              }
            );
            break;
          }
        }
      o.refName && (i = [f], B(
        () => o.refData,
        () => {
          var c, g;
          return (g = (c = s.value) == null ? void 0 : c.onFieldChange) == null ? void 0 : g.call(c);
        },
        { deep: !0 }
      ));
    } else
      b.style = "margin: 0";
    b.required = !!((n = i[0]) != null && n.required);
    const h = ge("inheritOptions", {}), p = N(
      () => e.disabled ? void 0 : !a.required || z(h.required) ? i : i.slice(1)
    ), w = oe(X.FormItem, a.formItemProps, b), d = Je(a, e.effectData);
    return () => It(
      {
        ...w,
        rules: p.value,
        ref: s,
        name: u
      },
      {
        label: d,
        default: (r == null ? void 0 : r.default) || (() => re(l ? "compactSpace" : "space", oe(l ? { block: !0 } : {}, t), {
          default: () => C(Ee, {
            option: a,
            model: o,
            effectData: e.effectData
          })
        }))
      }
    );
  }
}), Ra = Y({
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
    const { model: t, option: n, isView: a, effectData: o, labelIndex: l } = e, { columns: r, rowButtons: s, label: i, labelSlot: u, compact: b, slots: h, ...p } = n, { modelsMap: w } = t.listData, d = r.length === 1 && r[0].field === "$index", f = !l && (i || u), c = le(t, "refData");
    let g = 0;
    const m = {
      add: {
        onClick({ index: y }) {
          c.value.splice(y + 1, 0, d ? void 0 : {}), c.value = [...W(c.value)];
        },
        icon: () => Be("add")
      },
      delete: {
        disabled: () => c.value.length === 1,
        confirmText: "",
        icon: () => Be("remove"),
        onClick({ index: y }) {
          c.value.splice(y, 1), c.value = [...W(c.value)];
        }
      }
    }, v = !a && s !== !1 && {
      type: "Buttons",
      buttonType: "link",
      size: "small",
      colProps: { flex: "0" },
      labelMode: "icon",
      ...X.rowButtons,
      methods: m,
      actions: ["add", "delete"],
      ...Array.isArray(s) ? { actions: s } : s
    }, S = /* @__PURE__ */ new WeakMap(), A = st([]);
    B(
      () => c.value.map((y) => W(y)),
      (y) => {
        y.length === 0 && c.value.push(d ? void 0 : {});
        const _ = y.length ? y : c.value.map((R) => W(R)), O = A.value;
        d && O.length !== _.length && (g += 1);
        const T = _.map((R, E) => {
          var F;
          const L = W(R);
          return L !== null && typeof L == "object" ? (S.has(L) || S.set(L, ut(12)), S.get(L)) : ((F = O[E]) == null ? void 0 : F.baseKey) ?? ut(12);
        });
        A.value = _.map((R, E) => {
          const F = le(c.value, E), L = [...t.propChain, E], V = {
            index: E,
            parent: c,
            refData: F,
            propChain: L
          }, q = /* @__PURE__ */ new Map();
          let H;
          if (d)
            H = { ...r[0] }, q.set(H, {
              ...w.get(r[0]),
              ...V
            });
          else if (w.size === 1 || !r[0].field) {
            H = {
              subSpan: "auto",
              ...r[0],
              field: String(E)
            };
            const Q = [...w.values()][0];
            q.set(H, {
              ...Q,
              ...V,
              refName: String(E),
              children: Le(Q.children || /* @__PURE__ */ new Map(), R, L).modelsMap
            });
          } else
            H = b ? {
              ...p,
              type: "InputGroup",
              initialValue: void 0,
              subSpan: n.subSpan ?? "auto",
              field: String(E)
            } : { type: "Group", span: "auto" }, q.set(H, {
              ...V,
              refName: String(E),
              children: Le(w, R, L).modelsMap
            });
          return l && (H.label ?? (H.label = i), H.labelSlot ?? (H.labelSlot = u || H.label + String(E + 1))), v && q.set(v, { parent: c, index: E }), {
            children: q,
            model: { parent: c, children: q, index: E },
            refData: F,
            baseKey: T[E],
            key: d ? `${String(T[E])}:${E}:${g}` : T[E]
            // effectData: reactive({ parent: effectData, current: orgList, index: idx, record: refData }),
          };
        });
      },
      {
        immediate: !0
      }
    );
    const I = () => A.value.map(({ model: y, key: _ }) => C(Ee, { model: y, option: n, effectData: o, key: _ }));
    if (a) {
      if (f)
        if (d) {
          const { label: O, labelSlot: T = O } = r[0], R = r[0].breakAfter ?? r[0].wrapping;
          return () => re(
            "space",
            { direction: R ? "vertical" : "horizontal" },
            {
              default: () => A.value.map(({ refData: E, key: F }, L) => {
                const V = {
                  ...o,
                  parent: o,
                  current: c.value,
                  field: r[0].field,
                  value: E.value,
                  index: L,
                  record: E.value
                };
                return C("span", { key: F }, [ee(T, V), T ? ": " : "", E.value]);
              })
            }
          );
        } else
          return () => A.value.map(({ children: O, key: T }) => C($e, {
            key: T,
            modelsMap: O,
            option: n,
            effectData: o
          }));
      const y = {}, _ = N(() => new Map(A.value.flatMap(({ children: O }) => [...O])));
      return () => C($e, {
        option: { ...p, label: i, labelSlot: u },
        modelsMap: _.value,
        effectData: o,
        ...y
      });
    } else if (f) {
      const y = /* @__PURE__ */ new Map([
        [
          {
            ...p,
            label: i,
            labelSlot: u,
            type: "InfoSlot",
            block: !1,
            render: I
          },
          t
        ]
      ]);
      return () => C(Ee, { model: { children: y }, option: n, effectData: o });
    } else
      return I;
  }
}), ka = /* @__PURE__ */ Y({
  props: {
    option: {
      type: Object,
      required: !0
    },
    model: {
      type: Object,
      required: !0
    },
    effectData: Object,
    isView: Boolean
  },
  setup({
    option: e,
    model: t,
    effectData: n,
    isView: a
  }) {
    const {
      label: o,
      title: l = o,
      buttons: r
    } = e;
    return () => Me("card", {}, {
      title: l && (() => C("div", {
        class: "sup-title"
      }, ee(l, n))),
      extra: () => r && !a && C(Ae, {
        option: r,
        effectData: n
      }),
      default: () => a ? C($e, {
        option: e,
        modelsMap: t.children,
        effectData: n
      }) : C(Ee, {
        option: e,
        model: t,
        effectData: n
      })
    });
  }
}), xa = Y({
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
    isView: Boolean
  },
  setup({ model: e, option: t, isView: n, effectData: a }, o) {
    const { buttons: l, rowButtons: r, label: s, title: i = s } = t, { modelsMap: u } = e.listData, { propChain: b } = e, h = le(e, "refData"), p = Kn(), w = p.rowKey || "id", d = () => {
      const y = { ...p };
      return delete y.rowKey, delete y.itemClass, delete y.itemStyle, y;
    }, f = {
      add() {
        h.value.push({});
      },
      delete({ record: y }) {
        const _ = h.value.indexOf(y);
        h.value.splice(_, 1);
      }
    }, c = /* @__PURE__ */ new WeakMap(), g = k([]);
    B(
      () => [...h.value],
      (y) => {
        g.value = y.map((_, O) => {
          const T = W(_);
          c.has(T) || c.set(T, _[w] || ut(12));
          const R = c.get(T), { modelsMap: E } = Le(u, _, b, O);
          return {
            hash: R,
            model: { refData: k(_), children: E, index: O },
            effectData: $({
              parent: a,
              current: h,
              index: O,
              record: _
            })
          };
        });
      },
      {
        immediate: !0
      }
    );
    const m = { ...o.slots };
    if (m.title || (m.title = i && (() => ee(i, a))), l) {
      const y = l.targetSlot ?? l.forSlot ?? "extra", _ = m[y], O = Qe({
        config: l,
        effectData: a,
        methods: f,
        isView: n
      });
      (_ || O) && (m[y] = () => [_ == null ? void 0 : _(), O == null ? void 0 : O()]);
    }
    const { title: v, extra: S, ...A } = m;
    (v || S) && (A.header = () => re(
      "row",
      { align: "middle" },
      {
        default: () => [
          v && re("col", { class: "sup-title", flex: 1 }, { default: v }),
          S && re(
            "col",
            {
              class: "sup-title-buttons",
              style: { textAlign: l == null ? void 0 : l.align }
            },
            { default: S }
          )
        ]
      }
    ));
    const I = r && {
      buttonType: "link",
      size: "small",
      ...X.rowButtons,
      ...Array.isArray(r) ? { actions: r } : r
    };
    return A.renderItem = ({ item: y }) => Me(
      "listItem",
      { key: y.hash, class: p.itemClass, style: p.itemStyle },
      {
        default: () => {
          var _;
          return [
            n ? C($e, {
              option: t,
              modelsMap: y.model.children,
              effectData: y.effectData
            }) : C(Ee, {
              model: y.model,
              option: t,
              class: "sup-list-item-content",
              effectData: y.effectData
            }),
            I && ((_ = Qe({
              config: I,
              methods: f,
              effectData: y.effectData,
              isView: n
            })) == null ? void 0 : _({ class: "sup-list-item-actions" }))
          ];
        }
      }
    ), () => Me("list", { ...d(), dataSource: g.value }, A);
  }
}), Fa = Y({
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
    const { model: n, isView: a, effectData: o, labelIndex: l, rowKey: r = "" } = e, { columns: s, rowButtons: i, slots: u, ...b } = e.option, { modelsMap: h, rules: p } = n.listData, { propChain: w } = n, d = le(n, "refData"), f = {
      add: {
        icon: () => Be("add"),
        onClick({ index: A }) {
          d.value.splice(A + 1, 0, {}), d.value = [...W(d.value)];
        }
      },
      delete: {
        hidden: () => d.value.length === 1,
        disabled: !1,
        confirmText: "",
        icon: () => Be("remove"),
        onClick({ index: A }) {
          d.value = d.value.filter((I, y) => y !== A);
        }
      }
    }, c = !a && i !== !1 && {
      type: "Buttons",
      buttonType: "link",
      size: "small",
      labelMode: "icon",
      ...X.rowButtons,
      methods: f,
      actions: ["add", "delete"],
      ...Array.isArray(i) ? { actions: i } : i
    }, g = /* @__PURE__ */ new WeakMap(), m = k([]);
    B(
      d,
      (A) => {
        A.length === 0 && A.push({}), m.value = A.map((I, y) => {
          const _ = W(I);
          g.has(_) || g.set(_, I[r] || ut(12));
          const { modelsMap: O } = Le(h, I, w, y);
          return {
            key: g.get(_),
            model: { refData: k(I), children: O, index: y },
            effectData: $({
              parent: o,
              current: d,
              index: y,
              record: I
            })
          };
        });
      },
      {
        immediate: !0
      }
    );
    const v = {
      ...b,
      type: "Group",
      buttons: c,
      subItems: s
    }, S = b.title || b.label;
    return typeof S == "string" && l && (v.title = ({ index: A }) => S + String(A + 1)), () => m.value.map(({ model: A, effectData: I, key: y }) => C(me.Group, { model: A, option: v, effectData: I, key: y, isView: a }, t.slots));
  }
}), ja = /* @__PURE__ */ Y({
  name: "ExTabs",
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
  setup(e) {
    const t = k(e.option.activeKey), n = [], a = (l, r, s) => {
      n[l] = s ? void 0 : r, s && t.value === r && (t.value = n.find(Boolean));
    }, o = [...e.model.children].map(([l, r], s) => {
      const {
        key: i,
        field: u,
        label: b,
        icon: h
      } = l, p = ye({
        parent: e.effectData,
        current: le(r, "parent"),
        field: r.refName,
        value: r.refData
      }), {
        hidden: w,
        attrs: d
      } = he({
        option: l,
        effectData: p
      }), f = i || u || String(s), c = () => [At(h), ee(b, p)];
      return ke(() => a(s, f, z(w) || z(d.disabled))), {
        attrs: $({
          ...d,
          key: f,
          label: c
        }),
        hidden: w,
        option: {
          ...l,
          type: "TabPane"
        },
        model: r,
        effectData: p
      };
    });
    return bn(() => {
      t.value ?? (t.value = n.find(Boolean));
    }), () => Me("tabs", {
      value: t.value,
      "onUpdate:value": (l) => t.value = l
    }, {
      extra: () => !e.isView && e.option.buttons ? C(Ae, {
        option: e.option.buttons
      }) : void 0,
      default: () => o.map(({
        attrs: l,
        hidden: r,
        option: s,
        model: i,
        effectData: u
      }) => !r.value && Me("tab", l, {
        default: () => e.isView ? C($e, {
          option: s,
          modelsMap: i.children,
          effectData: u
        }) : C(Ee, {
          option: s,
          model: i,
          effectData: u
        })
      }))
    });
  }
}), Ma = Y({
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
    var n, a;
    const o = k(), l = it({
      ...e.schema,
      dataSource: e.dataSource || e.model || ((n = e.schema) == null ? void 0 : n.dataSource),
      attrs: oe({ ...X.Form }, { ...(a = e.schema) == null ? void 0 : a.attrs })
    });
    ne.schemaDiagnostics && e.schema && ft(e.schema, "form", "SuperForm");
    const r = {
      setOption: (b) => {
        var h;
        ne.schemaDiagnostics && ft(b, "form", "SuperForm"), Fe(l, b), l.attrs = oe(l.attrs, { ...b.attrs }, { ...(h = e.schema) == null ? void 0 : h.attrs });
      }
    };
    xe("rootSlots", t.slots), t.emit("register", r);
    const s = (b) => {
      o.value = b, t.emit("register", r, b);
    };
    bn(() => t.expose(o.value));
    const i = N(() => e.isContainer || l.isContainer);
    return () => l.subItems && C(
      me.Form,
      {
        option: l,
        // dataSource: formData.value,
        onRegister: s,
        compact: e.compact,
        ignoreRules: e.ignoreRules,
        class: { "sup-container": i.value }
      },
      Ze(l.slots, ye(), t.slots)
    );
  }
});
function $a(e) {
  const [t, n] = Fn(), a = Promise.resolve(typeof e == "function" ? e() : e), o = (r, s) => {
    if (r)
      t.value || a.then(r.setOption), t.value = s;
    else
      return (i, u) => C(Ma, { ...i, onRegister: o }, u == null ? void 0 : u.slots);
  }, l = async (r, s) => {
    const i = await n();
    if (r && r in i)
      return typeof i[r] == "function" ? i[r](s) : i[r];
    if (!r)
      return i;
  };
  return [
    o,
    {
      dataSource: N(() => {
        var r;
        return (r = t.value) == null ? void 0 : r.dataSource;
      }),
      getForm: n,
      asyncCall: l,
      getData() {
        var r;
        return ie((r = t.value) == null ? void 0 : r.dataSource);
      },
      submit: () => l("submit"),
      resetFields: (r) => l("resetFields", r),
      setFieldsValue: (r) => l("setFieldsValue", r),
      /**
       * @deprecated 使用`resetFields`
       */
      setData(r) {
        l("resetFields", r);
      }
    }
  ];
}
function jn(e, { buttons: t, ...n } = {}) {
  const a = k(!1), o = $({ ...n, ...X.Modal }), l = k(), r = t && (() => C(Ae, { option: t, effectData: { modalRef: l } })), s = k(!1), i = () => {
    var f;
    return s.value = !0, Promise.resolve((f = o.onOk) == null ? void 0 : f.call(o)).then(() => {
      a.value = !1;
    }).catch((c) => console.error(c)).finally(() => s.value = !1);
  }, u = () => o.icon ? [At(o.icon), ee(o.title)] : ee(o.title), b = (f) => a.value = f;
  return {
    config: o,
    modalRef: l,
    modalSlot: (f, c) => Wo(
      {
        ref: l,
        visible: a.value,
        class: "sup-modal",
        "onUpdate:visible": b,
        confirmLoading: s.value,
        ...o,
        title: void 0,
        ...f,
        onOk: i
      },
      { footer: r, title: u, ...c == null ? void 0 : c.slots, ...e && { default: e } }
    ),
    setModal: (f) => {
      Object.assign(o, f);
    },
    closeModal: () => (a.value = !1, Ie()),
    openModal: async (f) => (Object.assign(o, f), a.value = !0, Ie())
  };
}
function Mn(e, t) {
  const { modalSlot: n, openModal: a, modalRef: o, closeModal: l, setModal: r, config: s } = jn(e, t), i = gn(), u = document.createDocumentFragment();
  let b;
  const h = Yo(), p = (f) => Qo(
    (c = {}) => n({ ...f, ...c }, {}),
    h,
    f
  ), w = () => {
    xt(null, u), b = null;
  };
  return Ct(() => {
    b && w();
  }), {
    modalRef: o,
    openModal: (f) => {
      if (o.value)
        return a(f);
      if (b = hn(p), b.appContext = i == null ? void 0 : i.appContext, xt(b, u), s.destroyOnClose) {
        const c = s.afterClose;
        r({
          afterClose() {
            c == null || c(), w();
          }
        });
      }
      return Ie(() => a(f));
    },
    modalSlot: n,
    closeModal: l,
    setModal: r
  };
}
function Nr(e, t = {}) {
  const { title: n, ...a } = e, [o, l] = $a(a), r = Mn(o(), { maskClosable: !1, title: n, ...t });
  return { ...r, openModal: ({ data: i, onOk: u = t.onOk, ...b } = {}) => {
    const h = () => l.submit().then((p) => u ? u(p) : p);
    return l.resetFields(i), r.openModal({ ...b, onOk: h });
  }, formActions: l };
}
const lt = (e, ...t) => Jn(e, ...t, (n, a, o, l) => {
  if (a === void 0)
    l[o] = void 0;
  else if (Array.isArray(n))
    return a;
});
function Ua(e) {
  const t = /* @__PURE__ */ new WeakMap(), n = (o) => {
    const l = W(o);
    let r = t.get(l);
    return r || (r = it({
      isEdit: !1
    }), t.set(l, r)), r;
  };
  return {
    getEditInfo: n,
    setEditInfo: (o, l) => {
      const r = n(o);
      if (r.editData)
        Ht(r.editData, o), Object.assign(r, l);
      else {
        const s = $(Ge(o)), {
          modelsMap: i
        } = kn(W(e), s);
        Object.assign(r, {
          ...l,
          forms: it({}),
          modelsMap: i,
          editData: s
        });
      }
    }
  };
}
function Va({
  childrenMap: e,
  orgList: t,
  listener: n,
  rowEditor: a
}) {
  const o = k(!1), l = k([]);
  B(() => [...t.value], (d) => {
    l.value = d, o.value = !1;
  }, {
    immediate: !0
  });
  const {
    getEditInfo: r,
    setEditInfo: s
  } = Ua(e), i = {
    add({
      index: d,
      resetData: f
    }) {
      const c = {
        ...f
      };
      d !== void 0 ? l.value.splice(d + 1, 0, c) : l.value.push(c), s(c, {
        index: d,
        isEdit: !0,
        isNew: !0
      }), o.value = !0;
    },
    edit({
      record: d,
      selectedRows: f,
      resetData: c
    }) {
      const g = d || f[0];
      s(lt(g, c), {
        isEdit: !0
      }), o.value = !0;
    },
    delete({
      record: d,
      selectedRows: f
    }) {
      const c = d ? [d] : f;
      return n.onDelete(c);
    }
  }, u = {
    add: {
      disabled: () => o.value,
      onClick: i.add
    },
    edit: {
      disabled: (d) => {
        var f;
        return o.value || !(d.record || ((f = d.selectedRows) == null ? void 0 : f.length) === 1);
      },
      onClick: i.edit
    },
    delete: {
      disabled: (d) => {
        var f;
        return o.value || !(d.record || ((f = d.selectedRows) == null ? void 0 : f.length) > 0);
      },
      onClick: i.delete
    }
  }, b = [{
    label: "保存",
    loading: !0,
    onClick: async (d) => {
      const {
        record: f
      } = d, c = r(f);
      return Promise.all(Object.values(c.forms).map((g) => g.validate())).then(async () => {
        var g;
        const m = W(c.editData);
        if (await ((g = a == null ? void 0 : a.onSave) == null ? void 0 : g.call(a, {
          ...d,
          isNew: c.isNew
        })) === !1)
          return !1;
        c.isNew ? (Object.assign(f, m), n.onSave(f, c.index).then(() => {
          c.isNew = !1, c.isEdit = !1;
        })) : n.onUpdate(m, f).then(() => {
          c.isEdit = !1;
        }), o.value = !1;
      }).catch((g) => {
        console.log("error", g), g != null && g.errorFields && qt("error", g.errorFields[0].errors[0]);
      });
    }
  }, {
    label: "取消",
    onClick: async (d) => {
      var f;
      const c = r(d.record);
      await ((f = a == null ? void 0 : a.onCancel) == null ? void 0 : f.call(a, {
        ...d,
        isNew: c.isNew
      })) !== !1 && (c.isNew && l.value.splice(c.index + 1, 1), c.isEdit = !1, o.value = !1);
    }
  }], h = (d, f) => r(d.record).isEdit ? C(Ae, {
    key: "edit",
    option: {
      ...f,
      actions: b
    },
    effectData: d
  }) : null, p = /* @__PURE__ */ Y({
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
      editInfo: f,
      viewRender: c
    }) {
      const {
        editable: g = !0
      } = d, {
        modelsMap: m,
        forms: v
      } = f, S = m.get(W(d)), {
        index: A,
        parent: I,
        refData: y
      } = Te(S), _ = S.propChain.join("."), O = ye({
        current: I,
        value: y,
        index: A
      }), {
        attrs: T,
        hidden: R
      } = he({
        option: d,
        effectData: O
      }), E = N(() => !R.value && (Xe(g) ? g(O) : g)), F = Ot(d, S, O, T), L = dt(S.rules, O), V = N(() => z(T.disabled) || z(R) ? [] : L);
      return () => E.value ? wt({
        ref: (q) => {
          q && (v[_] = q);
        },
        model: f.editData
      }, {
        default: () => It({
          name: S.propChain,
          rules: V.value,
          wrapperCol: {}
        }, {
          default: F
        })
      }) : c ? c({
        ...O,
        isView: !0
      }) : y.value;
    }
  });
  return {
    list: l,
    methods: i,
    buttonMethods: u,
    getEditRender: (d, f) => {
      if (Pt(d.type) || d.type === "InputSlot")
        return ({
          record: c
        }) => {
          const g = r(c);
          if (g.isEdit)
            return C(p, {
              option: d,
              editInfo: g,
              viewRender: f
            });
        };
    },
    editButtonsSlot: h
  };
}
function Na({ rowKey: e, option: t, listener: n }) {
  const a = k(), o = t.rowEditor, l = (o == null ? void 0 : o.form) || t.editForm || t.formSchema || {};
  l.subItems = l.subItems || t.columns.filter((d) => {
    var f;
    return !(d.hideInForm || (f = d.exclude) != null && f.includes("form"));
  });
  const r = k(l.dataSource || {}), s = () => C(me.Form, {
    option: l,
    dataSource: r,
    onRegister: (d) => a.value = d
  }), i = {
    ...X.Modal,
    maskClosable: !1,
    ...t.modalProps,
    ...o == null ? void 0 : o.modalProps
  }, { modalSlot: u, openModal: b, closeModal: h } = jn(s, i), p = ({ meta: d, ...f }) => ee(i.title, { meta: d, ...f }) || `${l.title ? l.title + " - " : ""}  ${d.title || d.label}`;
  return { modalSlot: u, methods: {
    add(d = {}) {
      const { meta: f = {}, resetData: c, index: g } = d;
      return r.value = { ...c }, Ie(() => {
        var m;
        (m = a.value) == null || m.clearValidate();
      }), f.title ?? (f.title = "新增"), f.name = "add", f.isNew = !0, b({
        ...f,
        title: p({ ...d, source: r.value, meta: f }),
        onOk: async () => a.value.submit().then(async (m) => {
          var v;
          if (await ((v = o == null ? void 0 : o.onSave) == null ? void 0 : v.call(o, { ...d, source: m, meta: f })) !== !1)
            return n.onSave(m, g);
        }),
        onCancel: async () => {
          var m;
          return await ((m = o == null ? void 0 : o.onCancel) == null ? void 0 : m.call(o, { ...d, meta: f })), h();
        }
      });
    },
    async edit(d) {
      var f, c, g;
      const { record: m, selectedRows: v, resetData: S, meta: A = {} } = d, I = m || v[0];
      if (!I)
        return Promise.reject(new Error("未选择记录"));
      const y = await ((c = (f = t.apis) == null ? void 0 : f.info) == null ? void 0 : c.call(f, e(I), I));
      return r.value = lt({}, I, y, S), Fe(A, { name: "edit", title: "编辑", isNew: !1 }), (g = a.value) == null || g.clearValidate(), b({
        ...A,
        title: p({ ...d, source: r.value, meta: A }),
        onOk: async () => a.value.submit().then(async (_) => {
          var O;
          if (await ((O = o == null ? void 0 : o.onSave) == null ? void 0 : O.call(o, { ...d, source: _, meta: A })) !== !1)
            return n.onUpdate(_, I);
        }),
        onCancel: async () => {
          var _;
          return await ((_ = o == null ? void 0 : o.onCancel) == null ? void 0 : _.call(o, { ...d, meta: A })), h();
        }
      });
    },
    delete({ record: d, selectedRows: f }) {
      const c = d ? [d] : f;
      return n.onDelete(c);
    }
  } };
}
function Ba({
  model: e,
  orgList: t,
  rowKey: n,
  setRowKey: a,
  editableRef: o
}) {
  const {
    modelsMap: l
  } = e.listData, r = k([]), s = /* @__PURE__ */ new WeakMap(), i = /* @__PURE__ */ new WeakMap();
  B(() => [...t.value], (p) => {
    r.value = p.map((w, d) => {
      const f = s.get(W(w)) || it({});
      if (f.index !== d) {
        f.index = d;
        const {
          modelsMap: g
        } = kn(W(l), w, e.propChain, d);
        f.modelsMap = g;
      }
      f.record ?? (f.record = $({
        ...Te(w)
      }));
      const c = n(w);
      return a(f.record, c), s.set(W(w), f), i.set(W(f.record), f), f.record;
    });
  }, {
    immediate: !0
  });
  const u = {
    add({
      index: p,
      resetData: w
    }) {
      const d = {
        ...w
      };
      p !== void 0 ? t.value.splice(p + 1, 0, d) : t.value.push(d);
    }
    // delete({ record }) {
    //   const orgIdx = orgList.value.indexOf(record)
    //   orgList.value.splice(orgIdx, 1)
    // },
  }, b = /* @__PURE__ */ Y({
    inheritAttrs: !1,
    props: {
      option: {
        type: Object,
        required: !0
      }
    },
    setup({
      option: p
    }, w) {
      const {
        record: d
      } = w.attrs, f = N(() => i.get(W(d)).modelsMap.get(p)), {
        index: c,
        parent: g,
        refData: m
      } = Te(f.value), v = ye({
        current: g,
        value: m,
        list: t,
        record: d,
        index: c
      }), {
        editable: S = !0
      } = p, {
        attrs: A,
        hidden: I
      } = he({
        option: p,
        effectData: v
      }), y = N(() => !I.value && o.value && (Xe(S) ? S(v) : S)), _ = Ot(p, f.value, v, A), O = gt(p, $({
        ...Te(v),
        isView: !0
      })), T = dt(f.value.rules, v), R = T && N(() => z(A.disabled) ? void 0 : T);
      return () => y.value ? It($({
        wrapperCol: {},
        name: f.value.propChain,
        rules: R
      }), {
        default: _
      }) : O ? O() : m.value;
    }
  });
  return {
    list: r,
    methods: u,
    getEditRender: (p) => {
      if (Pt(p.type) || p.type === "InputSlot" && p.editable !== !1)
        return (w) => C(b, {
          option: p,
          ...w
        });
    }
  };
}
function La(e, t, n) {
  const a = k({}), { title: o, apis: l } = e, { modalProps: r, ...s } = e.descriptionsProps || {}, i = () => C(Da, { option: { descriptionsProps: s }, modelsMap: t, source: a }), u = {
    ...X.Modal,
    footer: null,
    ...e.modalProps,
    ...r
  }, b = (w) => ee(u.title, w) || `${o ? o + " - " : ""}详情`, { openModal: h, modalSlot: p } = Mn(i, u);
  return {
    detailSlot: p,
    openDetail: async ({ record: w, selectedRows: d, meta: f = {}, ...c }) => {
      const g = w || d[0];
      if (l != null && l.info) {
        const m = await l.info(n(g), g);
        a.value = Object.assign({}, g, m);
      } else
        a.value = g;
      f.name = "detail", h({ ...f, title: b({ ...c, source: a.value, meta: f }) });
    }
  };
}
function qa({ option: e, model: t, orgList: n, rowKey: a, setRowKey: o, listener: l, isView: r, effectData: s }) {
  const { modelsMap: i } = t.listData, u = {
    list: n,
    modalSlot: [],
    methods: {
      delete({ record: g, selectedRows: m }) {
        const v = g ? [g] : m;
        return l.onDelete(v);
      }
    }
  }, { edit: b, editable: h = b, rowEditor: p } = e, { editMode: w, addMode: d } = p || e;
  if (!r && h) {
    const g = N(() => Xe(h) ? h(s) : h), { methods: m, ...v } = Ba({ model: t, orgList: n, rowKey: a, setRowKey: o, editableRef: g });
    Object.assign(u.methods, m), Object.assign(u, v);
  } else if (w === "inline") {
    const { list: g, methods: m, buttonMethods: v, editButtonsSlot: S, getEditRender: A } = Va({
      childrenMap: i,
      orgList: n,
      listener: l,
      rowEditor: p
    });
    u.list = g, Object.assign(u.methods, m), Object.assign(u, { buttonMethods: v, editButtonsSlot: S, getEditRender: A });
  }
  if (w === "modal" || d === "modal") {
    const { modalSlot: g, methods: m } = Na({ rowKey: a, option: e, listener: l });
    u.methods.edit ? (u.methods.add = m.add, u.buttonMethods || (u.buttonMethods = {}), u.buttonMethods.add = m.add) : Object.assign(u.methods, m), u.modalSlot.push(g);
  }
  const { detailSlot: f, openDetail: c } = La(e, i, a);
  return u.modalSlot.push(f), u.methods.detail = c, u;
}
const za = Y({
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
  setup(e, { attrs: t, slots: n, emit: a }) {
    const { optionsRef: o } = Ve(
      { ...e, labelAsValue: e.labelAsValue || e.valueToLabel },
      [],
      e.effectData
    ), l = k(e.activeKey ?? e.defaultActiveKey), r = (v) => {
      l.value = v, a("update:activeKey", v);
    }, {
      default: s,
      extra: i,
      rightExtra: u,
      tabBarExtraContent: b,
      tabBarExtra: h,
      title: p,
      titleBar: w,
      ...d
    } = n, f = Ze(e.slots, e.effectData), c = h || u || b, g = N(() => {
      var v;
      const S = o.value.map(({ value: A, label: I, ...y }) => ({
        ...y,
        key: y.key ?? A,
        tab: y.tab ?? I
      }));
      return l.value === void 0 && r((v = S[0]) == null ? void 0 : v.key), S;
    }), m = (v) => ee(f.customTab || e.customTab || v.tab, {
      ...e.effectData,
      item: v
    });
    return () => [
      !e.bordered && p ? w == null ? void 0 : w() : null,
      na(
        {
          bordered: e.bordered,
          items: g.value.map((v) => ({
            ...v,
            tab: m(v)
          })),
          value: l.value,
          onValueChange: r,
          attrs: t
        },
        {
          ...d,
          ...f,
          default: s,
          title: p,
          tabExtra: c || (p ? void 0 : i),
          cardExtra: c || p ? i : void 0
        }
      )
    ];
  }
}), Ka = Y({
  props: {
    option: { type: Object, required: !0 },
    effectData: { type: Object, required: !0 }
  },
  setup(e) {
    const t = e.option, { field: n, editable: a } = e.option, o = $({});
    B(
      () => e.effectData,
      (d) => Object.assign(o, d),
      { immediate: !0 }
    );
    const l = n.split(".").slice(0, -1), r = N(() => je(o.record, l)), s = N({
      get: () => je(o.record, n),
      set: (d) => We(o.record, n, d)
    }), i = { parent: r, refData: s }, { attrs: u, hidden: b } = he({ option: t, effectData: { ...o, inTable: !0 } }), h = Ot(t, i, o, u), p = N(() => Xe(a) ? a(o) : z(a)), w = gt(t, o);
    return () => b.value ? "" : p.value ? C("div", { class: "editable-cell" }, h()) : w ? w() : s.value;
  }
}), Ha = (e) => {
  if (!e.editable)
    return;
  const t = ne.buttonRoles && ne.buttonRoles() || [];
  if ((!e.roleName || t.includes(e.roleName)) && (Pt(e.type) || e.type === "InputSlot"))
    return (a) => C(Ka, { option: e, effectData: { ...a } });
};
function Ga({
  childrenMap: e,
  context: t,
  option: n,
  attrs: a,
  isView: o,
  effectData: l
}) {
  const { methods: r, buttonMethods: s, getEditRender: i, editButtonsSlot: u } = t, b = ye({ list: l.value, isView: o, parent: l }), h = function d(f = e) {
    const c = [];
    return [...f].forEach(([g, m]) => {
      var v, S;
      if (g.type === "Hidden" || g.hideInTable || g.hidden === !0 || (v = g.exclude) != null && v.includes("table"))
        return;
      const A = Je(g, b);
      if (m.children) {
        const I = d(m.children);
        g.ignoreTableTitle ? c.push(...I) : c.push({
          title: A,
          children: I
        });
      } else {
        const I = {
          title: A,
          key: g.field || g.label,
          dataIndex: m.propChain.length > 1 ? m.propChain : m.propChain[0]
        };
        g.options || g.dictName || g.type === "Switch" || (S = g.type) != null && S.includes("Picker") ? I.align = "center" : g.type === "InputNumber" && (I.align = "right"), Object.assign(I, g.columnProps), Fe(I, n.columnProps, X.Column);
        const y = I.customRender || gt(g) || void 0, _ = i ? i(g, y) : Ha(g);
        I.customRender = Wa(y, _, b), c.push(I);
      }
    }), c;
  }(), p = Qa(n, a);
  p && h.unshift(p);
  const w = Ya({
    buttons: n.rowButtons,
    methods: s || r,
    editButtonsSlot: u,
    isView: o,
    effectData: b
  });
  return w && (Fe(w, n.columnProps, X.Column), h.push(w)), h;
}
function Wa(e, t, n) {
  if (t || e) {
    const a = (o) => {
      const l = (t == null ? void 0 : t(o)) ?? (e == null ? void 0 : e({ ...o, isView: !0 })) ?? String(o.text ?? "");
      return l && typeof l == "string" && o.column.ellipsis ? C("span", { title: l }, l) : l;
    };
    return (o) => C(a, { ...n, ...o, current: o.record });
  } else
    return ({ text: a }) => String(a ?? "");
}
function Ya({ buttons: e, methods: t, editButtonsSlot: n, isView: a, effectData: o }) {
  const l = {
    buttonType: "link",
    size: "small",
    ...X.rowButtons,
    ...Array.isArray(e) ? { actions: e } : e
  }, { columnProps: r, ...s } = l, i = Qe({ config: s, methods: t, isView: a });
  if (!i)
    return;
  const u = (b) => (n == null ? void 0 : n(b, s)) || i({ key: b.record, effectData: b });
  return {
    title: "操作",
    key: "action",
    fixed: "right",
    minWidth: 100,
    width: 100,
    align: "center",
    resizable: !1,
    ...r,
    customRender: (b) => C(u, { ...o, ...b, current: b.record })
  };
}
const Qa = (e, t) => {
  var n;
  const a = e.indexColumn ?? ((n = X.Table) == null ? void 0 : n.indexColumn);
  if (a)
    return {
      key: "INDEX",
      title: "序号",
      width: 60,
      align: "center",
      customRender: ({ index: o }) => {
        var l, r;
        return ((((l = t.pagination) == null ? void 0 : l.current) || 1) - 1) * (((r = t.pagination) == null ? void 0 : r.pageSize) || 10) + o + 1;
      },
      ...ue(a) && a
    };
}, Xa = Y({
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
  setup({ option: e, model: t, reload: n, effectData: a, isView: o, ...l }, r) {
    var s, i, u;
    const b = ((s = e.rowEditor) == null ? void 0 : s.editMode) === "inline", h = r.attrs, p = /* @__PURE__ */ new WeakMap(), w = h.rowKey || "id", d = (D) => {
      const P = D[w];
      if (P != null)
        return P;
      const j = W(D);
      return p.has(j) || p.set(j, ut(12)), p.get(j);
    }, f = (D, P) => p.set(W(D), P), c = le(t, "refData"), g = ((i = e.attrs) == null ? void 0 : i.rowSelection) || void 0, m = g == null ? void 0 : g.selectedRowKeys, v = Ne(m) ? m : k(m || []), S = k([]), {
      selectedRowKeys: A,
      onChange: I,
      getCheckboxProps: y,
      ..._
    } = g || {}, O = g && {
      attrs: {
        fixed: !0,
        ..._
      },
      onChange: (D, P, j) => {
        var M;
        v.value = D, S.value = P, (M = g == null ? void 0 : g.onChange) == null || M.call(g, D, P, j);
      },
      isRowSelectable: (D) => {
        var P, j;
        return b && !c.value.includes(D) ? !1 : !((j = (P = g == null ? void 0 : g.getCheckboxProps) == null ? void 0 : P.call(g, D)) != null && j.disabled);
      }
    }, T = h.childrenColumnName || "children", R = (D, P = 0, j = 1) => {
      const M = [], Z = P === j;
      return D.forEach((be) => {
        be[T] && (M.push(d(be)), Z || M.push(...R(be[T], P, j + 1)));
      }), M;
    }, E = k(((u = e.attrs) == null ? void 0 : u.expandedRowKeys) || []), F = (D) => {
      E.value = D, r.emit("expandedRowsChange", D);
    };
    (l.defaultExpandLevel || h.defaultExpandAllRows) && B(
      c,
      (D, P) => {
        D.length && !(P != null && P.length) && F(R(D, Number(l.defaultExpandLevel)));
      },
      { immediate: !0 }
    );
    const V = qa({
      option: e,
      model: t,
      orgList: c,
      rowKey: d,
      setRowKey: f,
      listener: {
        async onSave(D, P) {
          var j;
          if ((j = e.apis) != null && j.save)
            return await e.apis.save(D), D.parentId && (E.value = [...E.value, D.parentId]), n == null ? void 0 : n();
          P !== void 0 ? c.value.splice(P + 1, 0, D) : c.value.push(D);
        },
        async onUpdate(D, P) {
          var j;
          (j = e.apis) != null && j.update && await e.apis.update(D), Object.assign(P, D);
          const M = d(P);
          if (M) {
            const Z = c.value.findIndex((be) => d(be) === M);
            Z > -1 && c.value.splice(Z, 1, P);
          }
          return n == null ? void 0 : n();
        },
        async onDelete(D) {
          var P, j;
          const M = D.map((Z) => d(Z));
          try {
            await ((j = (P = e.apis) == null ? void 0 : P.delete) == null ? void 0 : j.call(P, M, D));
          } catch (Z) {
            return console.error(Z), Z;
          }
          return O && (v.value = v.value.filter(
            (Z) => !M.includes(Z)
          ), S.value = S.value.filter(
            (Z) => !M.includes(d(Z))
          )), D.forEach((Z) => {
            c.value.splice(H.value.indexOf(Z), 1);
          }), n == null ? void 0 : n();
        }
      },
      isView: o,
      effectData: a
    }), q = Ga({
      childrenMap: t.listData.modelsMap,
      context: V,
      option: e,
      attrs: h,
      isView: o,
      effectData: a
    }), { list: H, methods: Q, buttonMethods: se = Q, modalSlot: x } = V, G = {
      selectedRowKeys: v,
      selectedRows: S,
      setSelectedRows: (D) => {
        S.value = D, v.value = D.map((P) => d(P));
      },
      expandedRowKeys: E,
      setExpandedRowKeys: F,
      expandAll: () => {
        F(R(c.value));
      },
      add: (D) => {
        var P;
        return (P = Q.add) == null ? void 0 : P.call(Q, D);
      },
      edit: (D) => {
        var P;
        return (P = Q.edit) == null ? void 0 : P.call(Q, { ...de, ...D });
      },
      delete: () => {
        var D;
        return (D = Q.delete) == null ? void 0 : D.call(Q, de);
      },
      detail: (D) => {
        var P;
        return (P = Q.detail) == null ? void 0 : P.call(Q, { ...de, ...D });
      }
    }, J = $({ ...G }), ce = k();
    B(
      ce,
      (D) => {
        Object.assign(J, D, G), r.emit("register", J);
      },
      { flush: "sync" }
    );
    const de = $({
      ...a,
      selectedRows: S,
      selectedRowKeys: v,
      tableRef: J
    }), fe = { ...r.slots }, pe = e.buttons, we = (pe == null ? void 0 : pe.targetSlot) ?? (pe == null ? void 0 : pe.forSlot) ?? "extra";
    if (pe) {
      const D = fe[we], P = Qe({
        config: pe,
        effectData: de,
        methods: se,
        isView: o
      });
      (D || P) && (fe[we] = () => [D == null ? void 0 : D(), P == null ? void 0 : P()]);
    }
    const Re = e.title || e.label, {
      title: ve = Re,
      extra: Oe,
      ...Se
    } = fe, _e = (ve || Oe) && (() => re(
      "row",
      { align: "middle", class: "sup-titlebar" },
      {
        default: () => [
          ve && re(
            "col",
            { class: "sup-title" },
            {
              default: Je(
                { labelSlot: ve, tooltip: e.tooltip },
                a
              )
            }
          ),
          Oe && re(
            "col",
            {
              class: "sup-title-buttons",
              flex: 1,
              style: { textAlign: (pe == null ? void 0 : pe.align) || "right" }
            },
            { default: Oe }
          )
        ]
      }
    ));
    Se.headerCell = (D) => {
      var P;
      return ((P = fe.headerCell) == null ? void 0 : P.call(fe, D)) || ee(D.title, a);
    };
    const ae = () => {
      const {
        rowSelection: D,
        expandedRowKeys: P,
        ...j
      } = h;
      return [
        ...x.map((M) => M()),
        ta(
          {
            ...X.Table,
            ref: ce,
            data: H.value,
            columns: $(q),
            tableLayout: "fixed",
            pagination: !1,
            ...j,
            selection: O && {
              ...O,
              selectedKeys: v.value
            },
            rowKey: d,
            expandedKeys: E.value,
            onExpandedChange: F,
            class: [
              "sup-table-wrapper",
              e.editable && "sup-table-editable"
            ]
          },
          Se
        )
      ];
    };
    return e.tabs ? () => C(za, { ...e.tabs, effectData: a }, {
      [we]: fe[we],
      title: ve && (() => ee(ve, a)),
      extra: Oe,
      titleBar: _e,
      default: ae
    }) : () => [_e == null ? void 0 : _e(), ae()];
  }
}), Za = /* @__PURE__ */ Y({
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
    attrs: t
  }) {
    var n;
    const a = e.option.title || e.option.label, o = [...e.model.children].map(([r, s], i) => {
      const u = ye({
        parent: e.effectData,
        current: le(e.model, "parent"),
        field: s.refName,
        value: s.refData
      }), {
        hidden: b,
        attrs: {
          disabled: h,
          ...p
        }
      } = he({
        option: r,
        effectData: u
      }), {
        key: w,
        field: d
      } = r;
      return {
        attrs: $(p),
        option: {
          ...r,
          type: "CollapsePanel"
        },
        effectData: u,
        model: s,
        header: () => ee(r.label),
        key: w || d || String(i),
        hidden: b,
        disabled: h
      };
    }), l = k(e.option.activeKey || ((n = o[0]) == null ? void 0 : n.key));
    return () => [a && C("div", {
      class: ["sup-titlebar", "sup-title"]
    }, ee(a, e.effectData)), Me("collapse", {
      ...t,
      value: l.value,
      "onUpdate:value": (r) => l.value = r
    }, {
      default: () => o.map(({
        attrs: r,
        hidden: s,
        option: i,
        disabled: u,
        model: b,
        header: h,
        effectData: p,
        key: w
      }) => !s.value && Me("collapsePanel", {
        ...r,
        key: w,
        disabled: z(u)
      }, {
        header: h,
        extra: () => !e.isView && i.buttons ? C(Ae, {
          option: i.buttons,
          effectData: p
        }) : void 0,
        default: () => e.isView ? C($e, {
          option: i,
          modelsMap: b.children,
          effectData: p
        }) : C(Ee, {
          option: i,
          model: b,
          effectData: p
        })
      }))
    })];
  }
}), Ja = /* @__PURE__ */ Y({
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
    const n = t, a = e, o = (r) => {
      n("update:value", r);
    }, l = () => ea({
      images: a.images,
      visible: a.visible,
      current: a.current,
      width: a.width,
      height: a.height,
      "onUpdate:visible": o
    });
    return (r, s) => (Ce(), He(l));
  }
});
function er(e) {
  const t = k(!1), n = $({
    visible: t,
    images: [],
    "onUpdate:value": (i) => t.value = i,
    ...e
  }), a = k(!1), o = () => !a.value && C(Ja, n), l = gn();
  Ct(() => {
    a.value = !0;
  });
  let r;
  return { open: (i) => {
    if (typeof i == "string")
      n.images = [i];
    else if (Array.isArray(i))
      n.images = [...i];
    else {
      const { src: u, ...b } = i || {};
      u && (n.images = [u]), Object.assign(n, b);
    }
    if (!r) {
      const u = document.createElement("div");
      r = hn(o, { appContext: l == null ? void 0 : l.appContext }), r.appContext = l == null ? void 0 : l.appContext, xt(r, u);
    }
    Ie(() => t.value = !0);
  } };
}
function tr(e, t) {
  return new Promise((n, a) => {
    const o = new FileReader();
    t === "text" ? o.readAsText(e) : o.readAsDataURL(e), o.onload = () => n({ result: o.result, file: e }), o.onerror = (l) => a(l);
  });
}
function nr(e, t, n) {
  const a = typeof n < "u" ? [n, e] : [e], o = new Blob(a, { type: "application/octet-stream" }), l = window.URL.createObjectURL(o), r = document.createElement("a");
  r.style.display = "none", r.href = l, r.setAttribute("download", t), typeof r.download > "u" && r.setAttribute("target", "_blank"), document.body.appendChild(r), r.click(), document.body.removeChild(r), window.URL.revokeObjectURL(l);
}
function or(e, t) {
  return t.split(",").some((n) => {
    var a;
    return ((a = e.name) == null ? void 0 : a.endsWith(n)) || e.type && new RegExp(`^${n.replace("*", "\\S*")}$`).test(e.type);
  });
}
function ar(e) {
  const { mode: t, valueKey: n, infoNames: a, maxCount: o, accept: l, minSize: r, maxSize: s, repeatable: i } = e, u = {
    ...n && { [n]: n },
    uid: "uid",
    status: "status",
    url: "url",
    name: "name",
    ...a
  };
  t === "custom" && (u.originFileObj = "originFileObj");
  const b = /* @__PURE__ */ new Map(), h = /* @__PURE__ */ new Map(), p = /* @__PURE__ */ new Map();
  return {
    clearTask: (I) => {
      b.delete(I), h.delete(I);
    },
    convertInfo: (I) => {
      const y = { status: "done", ...I };
      return Object.entries(u).forEach(([_, O]) => {
        O && O !== _ && O in y && (y[_] = y[O], delete y[O]);
      }), y;
    },
    getValue: (I, y) => {
      if (y) {
        const _ = I[0];
        return n ? (_ == null ? void 0 : _[n]) ?? (_ == null ? void 0 : _[u.uid]) : _;
      }
      return n ? I.map((_) => _[n] ?? _[u.uid]) : I;
    },
    hasPendingWork: (I) => p.size > 0 || t === "auto" && I.some((y) => y.status === "uploading") || t === "submit" && I.some((y) => y.status !== "done"),
    queueDelete: (I, y) => p.set(I, y),
    reconvert: (I) => {
      const y = {};
      return Object.entries(u).forEach(([_, O]) => {
        const T = I[_];
        O && T !== void 0 && (y[O] = T);
      }), y;
    },
    registerRequest: (I, y) => {
      if (t === "auto") {
        const _ = y();
        return b.set(I, _), _;
      }
      t === "submit" && h.set(I, y);
    },
    submit: async (I) => {
      let y = Promise.resolve();
      if (t === "auto") {
        const O = I.find((T) => T.status === "error");
        if (O)
          throw O.response || { message: "文件上传错误，请删除后重新上传！" };
        y = Promise.all(b.values());
      } else if (t === "submit") {
        const O = I.filter((T) => T.status !== "done").map((T) => {
          var R;
          return T.status = "uploading", (R = h.get(T.uid)) == null ? void 0 : R();
        }).filter(Boolean);
        y = Promise.all(O);
      }
      const _ = await y;
      return await Promise.all([...p.values()].map((O) => O())).catch((O) => console.error(O)), _;
    },
    validate: (I, y, _) => {
      if (o > 1 && _.length + y.indexOf(I) >= o)
        return `文件数量最多${o}`;
      if (l && !or(I, l))
        return "请选择正确的文件类型！";
      if (r || s) {
        const O = (I.size || 0) / 1024 / 1024;
        if (r && r > O)
          return `文件最小需要${r}M`;
        if (s && s < O)
          return `文件最大不超过${s}M`;
      }
      if (!i) {
        const O = _.find((T) => T.name === I.name);
        if (O)
          return `文件重复: ${O.name}`;
      }
    }
  };
}
const rr = ".png,.jpg,.jpeg,.gif,.webp,.svg,.tif,.tiff";
function lr(e) {
  var t, n, a, o;
  if (e.thumbUrl)
    return !0;
  if (e.url || e.originFileObj) {
    const l = (n = (t = e.name || e.url) == null ? void 0 : t.match(/[^\\.]*$/)) == null ? void 0 : n[0];
    if (l && rr.includes(l))
      return !0;
    {
      const r = e.type || ((o = (a = e.url) == null ? void 0 : a.match(/^data:(\S*?);/)) == null ? void 0 : o[1]);
      return r == null ? void 0 : r.startsWith("image");
    }
  }
}
function cn(e, t) {
  const n = Go({
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
  return { setError: (o, l) => {
    n.update({
      icon: () => Ue("error"),
      okButtonProps: {
        loading: !1
      },
      type: "error",
      title: o,
      content: l == null ? void 0 : l.message
    });
  }, ...n };
}
const sr = Y({
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
      apis: a = {},
      isSingle: o,
      minSize: l,
      maxSize: r,
      infoNames: s,
      repeatable: i,
      showUploadList: u,
      onPreview: b,
      onDownload: h,
      isImageUrl: p = lr,
      hideOnMax: w,
      valueKey: d
    } = e, f = (o ? 1 : e.maxCount) || 1 / 0, { accept: c, listType: g } = t.attrs, m = ar({
      mode: n,
      valueKey: d,
      infoNames: s,
      maxCount: f,
      accept: c,
      minSize: l,
      maxSize: r,
      repeatable: i
    }), v = er(), { convertInfo: S, reconvert: A } = m, { onSubmit: I } = ge("exaProvider", {}), y = k([]), _ = st([]), O = st(), T = (D) => {
      _.value = D.map(A), e.isView || (t.emit("update:fileList", _.value), R()), y.value = D;
    }, R = () => {
      O.value = m.getValue(W(_.value), !!e.isSingle), t.emit("update:value", O.value);
    };
    B(
      () => W(e.value),
      (D) => {
        if (D !== O.value)
          if (O.value = D, !D)
            y.value = [];
          else {
            const P = Sn(D) ? D : [D];
            _.value = d ? P.map((j) => ({ [d]: j })) : P, y.value = _.value.map(S);
          }
      },
      { immediate: !0, flush: "sync" }
    ), B(
      () => W(e.fileList),
      (D) => {
        if (D && D !== _.value) {
          const P = D.map(S);
          T(P);
        }
      },
      { immediate: !0 }
    );
    const E = k(!1);
    I == null || I(() => {
      if (E.value = m.hasPendingWork(y.value), E.value) {
        const D = cn(" 文件同步中，请稍候...");
        return m.submit(y.value).then((P) => (D.destroy(), P)).catch((P) => (E.value = !1, D.setError("文件上传失败", P), !1)).finally(() => E.value = !1);
      }
      return m.submit(y.value);
    });
    const F = (D, P) => {
      if (e.beforeUpload) {
        const M = e.beforeUpload(D, P);
        if (M !== void 0)
          return M;
      }
      const j = m.validate(D, P, y.value);
      if (j)
        return qt("error", j), Xo();
      if (n === "custom") {
        if (u !== !1)
          return !1;
      } else if (f === 1 && y.value.length) {
        const M = y.value[0];
        if (m.clearTask(M.uid), M.status === "done" && a.delete) {
          const Z = { ..._.value[0] };
          m.queueDelete(Z, () => a.delete(Z));
        }
      }
    };
    function L({ file: D, fileList: P, event: j }) {
      var M;
      D.status === "removed" ? m.clearTask(D.uid) : D.status === "uploading" && !j && n !== "auto" && (D.status = "waiting"), (M = e.onChange) == null || M.call(e, { file: D, fileList: P, event: j }), T([...P]);
    }
    const V = (D) => {
      const { file: P } = D;
      if (n === "auto")
        return m.registerRequest(P.uid, () => Q(D));
      if (n === "submit")
        m.registerRequest(P.uid, () => Q(D));
      else if (n === "base64" || n === "text")
        return tr(P, n).then(({ result: j }) => H({ url: j }, P));
    }, q = (D, P) => {
      const j = y.value.find((M) => M.uid === P.uid);
      return Object.assign(j, { error: D, status: "error" }), T([...y.value]), Promise.reject(D);
    }, H = (D, P) => {
      const j = y.value.find((M) => M.uid === P.uid);
      return Object.assign(j, S(D), { status: "done" }), T([...y.value]), D;
    }, Q = (D) => {
      const { file: P, filename: j, onProgress: M, onError: Z, onSuccess: be } = D;
      if (!a.upload)
        return Promise.resolve().then(() => q(Error("Api config error"), P));
      const et = new FormData();
      et.append(j, P);
      const zn = (De) => {
        De.total > 0 && (De.percent = De.loaded / De.total * 100), M(De);
      };
      return a.upload(et, { onUploadProgress: zn }).then(
        (De) => H(De, P),
        (De) => q(De, P)
      );
    }, se = async (D) => {
      var P;
      let j = await ((P = e.onRemove) == null ? void 0 : P.call(e, D));
      return j !== !1 && a.delete && D.status === "done" ? new Promise((M) => {
        const Z = En({
          title: "确定删除吗？",
          okText: "确定",
          cancelText: "取消",
          closable: !1,
          maskClosable: !1,
          ...X.Modal,
          onOk() {
            const be = A(D), et = () => a.delete(be);
            if (n === "submit")
              m.queueDelete(
                be,
                () => et()
                // .then(
                //   () => removeFileMap.delete(__file)
                //   // () => updateFileList([...innerFileList.value, __file]) // 删除失败后还原文件
                // )
              ), M(!0);
            else
              return Z.update({
                okCancel: !1,
                title: "文件删除中……"
              }), et().then(M, () => (Z.update({
                okCancel: !1,
                title: "文件删除失败",
                type: "error",
                onOk: void 0
              }), M(!1), Promise.reject()));
          },
          onCancel() {
            M(!1);
          }
        });
      }) : j;
    }, x = k(!1), G = h || ((D) => {
      if (a.download && !x.value) {
        const P = cn("文件下载中，请稍候...");
        a.download(A(D)).then((j) => nr(j, D.name)).then(() => P.destroy()).catch((j) => {
          P.setError("文件下载失败", j);
        }).finally(() => E.value = !1);
      }
    }), J = N(
      () => typeof u == "boolean" ? u : {
        showRemoveIcon: !e.isView && !e.disabled,
        showDownloadIcon: e.isView,
        ...u
      }
    ), ce = async (D) => {
      if (b) {
        const P = await b(A(D));
        P && v.open(P);
      } else if (p(D)) {
        let P;
        const j = y.value.filter((M) => p(M)).map((M, Z) => {
          M === D && (P = Z);
          const be = M.url || M.thumbUrl;
          return !be && M.originFileObj && (M.objectUrl = window.URL.createObjectURL(M.originFileObj)), be || M.objectUrl;
        });
        v.open({ images: j, current: P });
      }
    }, de = ({ file: D, listType: P }) => D.status === "waiting" ? Ue("sync") : D.status === "uploading" ? Ue("loading") : Ue("attachment"), fe = e.title, pe = typeof e.title == "string" ? e.title : "上传文件", we = $({ ...W(e.effectData), fileList: y }), Re = Xe(fe) && (() => fe(we)), ve = [];
    c && ve.push("支持文件格式：" + c), r && ve.push("单个文件不超过" + r + "MB");
    const Oe = e.tip ?? ve.join(", "), Se = { ...t.slots };
    g === "picture-card" ? Se.default = () => {
      var D, P;
      return ((P = (D = t.slots).default) == null ? void 0 : P.call(D, we)) || C("div", [
        Ue("add"),
        Re ? Re() : C("div", { style: "margin-top:8px" }, pe)
      ]);
    } : Se.default = () => {
      var D, P;
      return [
        ((P = (D = t.slots).default) == null ? void 0 : P.call(D, we)) || Jo(
          {},
          { default: () => [Ue("upload"), Re ? Re() : pe] }
        ),
        Oe && C("div", { class: "sup-upload-tip" }, Oe)
      ];
    };
    const _e = N(() => e.disabled || e.isView), ae = N(() => w && f && y.value.length >= f);
    return () => _e.value && y.value.length === 0 ? C("div", { class: "sup-upload-tip" }, "暂无附件") : Zo(
      {
        class: { "upload-disabled": _e.value },
        customRequest: V,
        beforeUpload: F,
        fileList: y.value,
        onChange: L,
        onPreview: ce,
        onRemove: se,
        showUploadList: J.value,
        maxCount: f,
        isImageUrl: p,
        iconRender: de,
        onDownload: G
      },
      {
        ...Se,
        default: () => _e.value || (ae.value ? null : Se.default())
      }
    );
  }
}), ir = /* @__PURE__ */ Y({
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
    const n = e, a = t, o = k(), l = k(""), r = k(!1), s = N(() => Bt("Input")), i = N(
      () => zt(
        "Input",
        {
          value: l.value,
          "onUpdate:value": (g) => l.value = g
        },
        { option: n.option, effectData: n.effectData }
      )
    ), u = (g, m) => typeof n.closable == "function" ? n.closable(g, m) : n.closable, b = N(() => n.value ? typeof n.value == "string" ? n.value.split(",") : n.value : []), h = () => {
      r.value = !0, Ie(() => {
        o.value.focus();
      });
    }, p = (g) => {
      const m = b.value.filter((v) => v !== g);
      f(m);
    }, w = (g, m) => {
      const v = St(
        "tag",
        {
          removable: u(g, m),
          onRemove: () => p(g)
        },
        { default: () => g.length > 20 ? `${g.slice(0, 20)}...` : g }
      );
      return g.length > 20 ? Lt("tooltip", { title: g }, { default: () => v }) : v;
    }, d = () => St(
      "tag",
      { class: "sup-tag-add", onClick: h },
      { default: () => [Be("add"), ee(n.newLabel, n.effectData)] }
    ), f = (g) => {
      n.stringifyValue ? a("update:value", g.join(",")) : a("update:value", g);
    }, c = () => {
      l.value && b.value.indexOf(l.value) === -1 && f([...b.value, l.value]), r.value = !1, l.value = "";
    };
    return (g, m) => (Ce(), yt(Ft, null, [
      (Ce(!0), yt(Ft, null, wn(b.value, (v, S) => (Ce(), He(rt(() => w(v, S)), { key: v }))), 128)),
      r.value ? (Ce(), He(rt(s.value), oe({
        key: 0,
        ref_key: "inputRef",
        ref: o
      }, i.value, {
        class: "sup-tag-input",
        onBlur: c
      }), null, 16)) : (Ce(), He(rt(d), { key: 1 }))
    ], 64));
  }
}), ur = {
  key: 1,
  class: "sup-tag-select-empty"
}, cr = /* @__PURE__ */ Y({
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
    const n = e, a = t, { optionsRef: o } = Ve(n.option, n.options, n.effectData), l = N(() => {
      const { value: u } = n, b = n.stringifyValue;
      return u === void 0 ? [] : b ? u.split(",") : Array.isArray(u) ? u : [u];
    }), r = (u, b) => {
      const h = n.multiple ? b ? [...l.value, u] : l.value.filter((p) => p !== u) : [u];
      a("check", u, b), i(h), a("change", u, h);
    }, s = (u, b) => St(
      "checkableTag",
      {
        class: "tag-select",
        selected: l.value.includes(b),
        onSelectedChange: (h) => r(b, h)
      },
      { default: () => u }
    ), i = (u) => {
      n.multiple ? n.stringifyValue ? a("update:value", u.join(",")) : a("update:value", u) : a("update:value", u[0]);
    };
    return (u, b) => z(o).length ? (Ce(!0), yt(Ft, { key: 0 }, wn(z(o), ({ label: h, value: p }) => (Ce(), He(rt(() => s(h, p)), { key: p }))), 128)) : (Ce(), yt("div", ur, Wn(e.placeholder), 1));
  }
}), $n = {
  Form: Ta,
  Group: Rt,
  Card: ka,
  List: xa,
  ListGroup: Fa,
  Tabs: ja,
  Table: Xa,
  Collapse: Za,
  Descriptions: Rt,
  Fragment: Rt
}, dr = {
  InputGroup: Ea,
  InputList: Ra,
  Upload: sr,
  TagInput: ir,
  TagSelect: cr
}, pt = Object.keys($n), fr = {
  ...$n,
  ...dr
}, Dt = {}, Wt = {}, Vt = /* @__PURE__ */ new Set();
function Un(e) {
  return typeof e == "object" && e && "component" in e ? e : { component: e };
}
function Vn(e, t, n, a = []) {
  const o = /* @__PURE__ */ new Set([
    ...Cn,
    ...a
  ]);
  Object.entries(t).forEach(([l, r]) => {
    if (r) {
      if (o.has(l))
        throw new Error(
          `Schema 类型 '${l}' 为 Core 保留类型，不能注册为 ${n} 组件`
        );
      e[l] = { ...Un(r), source: n };
    }
  });
}
function Nn(e, t = []) {
  Vn(Dt, e, "custom", [
    ...Vt,
    ...t
  ]);
}
function pr(e) {
  const t = new Set(e);
  for (const n of Object.keys(Dt))
    if (t.has(n))
      throw new Error(
        `Schema 类型 '${n}' 已注册为项目组件，不能再由 UIAdapter 接管`
      );
  Vt.clear(), t.forEach((n) => Vt.add(n));
}
function Br(e, t = []) {
  const n = Object.fromEntries(
    Object.entries(e).map(([l, r]) => [
      l,
      r && Un(r).component
    ])
  );
  On(n, "auto");
  const a = new Set(t), o = Object.fromEntries(
    Object.entries(e).filter(
      ([l]) => !Cn.has(l) && !a.has(l)
    )
  );
  Vn(Wt, o, "auto");
}
function _t(e) {
  return Dt[e] || Wt[e];
}
function Pt(e) {
  return !!_t(e);
}
function mr() {
  return [
    .../* @__PURE__ */ new Set([
      ...Object.keys(Dt),
      ...Object.keys(Wt)
    ])
  ];
}
function Bn(e, t) {
  const { prop: n = "value", event: a = "update:value" } = e.model || {}, o = { ...t };
  if (n !== "value" && (o[n] = o.value, delete o.value), a !== "update:value") {
    const l = a.startsWith("on") ? a : `on${a[0].toUpperCase()}${a.slice(1)}`;
    o[l] = o["onUpdate:value"], delete o["onUpdate:value"];
  }
  return o;
}
const me = fr, X = {};
let dn = !1, fn;
function vr(e) {
  if (fn) {
    en(e);
    return;
  }
  pr(Object.keys(e.fields || {})), en(e), fn = e, dn || (mt(X, e.defaults || {}), dn = !0);
}
function br(e) {
  return vr(e), e;
}
function gr(e = {}) {
  const { defaultProps: t, ...n } = e;
  Object.assign(ne, n), t && Ln(t);
}
function hr(e, t) {
  Nn({ [e]: t });
}
function yr(e) {
  Nn(e);
}
function Ln(e) {
  mt(X, e);
}
const pn = {
  useAdapter: br,
  configure: gr,
  registerComponent: hr,
  registerComponents: yr,
  setDefaultProps: Ln
}, mn = Symbol.for("superform.official-product");
function wr(e, t) {
  let n = !1;
  const a = {
    ...pn,
    initialize(o = {}) {
      var l;
      const r = o.components, s = Object.keys(r || {});
      if (n) {
        if (s.length)
          throw new Error(
            `SuperForm '${e}' 已初始化，不能再追加字段组件`
          );
        return a;
      }
      const i = t(r);
      for (const h of s)
        if (!((l = i.fields) != null && l[h]))
          throw new Error(
            `UIAdapter '${i.name}' 未声明字段 '${h}'，不能初始化对应 UI 组件`
          );
      const u = globalThis, b = u[mn];
      if (b && b !== e)
        throw new Error(
          `SuperForm 已初始化官方产品 '${String(
            b
          )}'，不能再初始化 '${e}'`
        );
      return pn.useAdapter(i), u[mn] = e, n = !0, a;
    }
  };
  return a;
}
const Sr = Y({
  name: "SuperFormElementPlusAddIcon",
  setup: () => () => C("span", { "aria-hidden": "true" }, "+")
}), ot = (e, t) => Y({
  name: e,
  setup: () => () => C("span", { "aria-hidden": "true" }, t)
});
function _r(e, t) {
  var a;
  const n = { ...e.attrs, disabled: z((a = e.attrs) == null ? void 0 : a.disabled) };
  return e.render ? e.render({ props: n, ...t }) : C(
    _n,
    {
      content: z(e.tooltipTitle),
      disabled: !z(e.tooltipTitle)
    },
    {
      default: () => C(
        Nt,
        { ...n, onClick: (o) => {
          var l;
          return (l = e.onClick) == null ? void 0 : l.call(e, o);
        } },
        () => ee(e.label, t)
      )
    }
  );
}
function at(e) {
  return typeof e == "function" ? e() : e;
}
const Cr = {
  components: {
    Form: eo,
    FormItem: to,
    Row: no,
    Col: oo,
    Space: Yt,
    Card: Qt,
    Tabs: Xt,
    TabPane: Zt
  },
  form: {
    component: "Form",
    item: "FormItem",
    validate: (e) => e.validate(),
    clearValidate: (e) => e.clearValidate()
  },
  layout: {
    row: "Row",
    col: "Col",
    space: "Space"
  },
  containers: {
    card: { component: "Card" },
    tabs: {
      component: "Tabs",
      model: { prop: "modelValue", event: "update:modelValue" }
    },
    tab: {
      component: "TabPane",
      render(e, t, n) {
        const { label: a, ...o } = t;
        return C(e, o, { ...n, label: a });
      }
    }
  },
  icons: {
    semantic: {
      add: Sr,
      upload: ot("SuperFormElementPlusUploadIcon", "↑"),
      attachment: ot("SuperFormElementPlusAttachmentIcon", "⌕"),
      loading: ot("SuperFormElementPlusLoadingIcon", "…"),
      sync: ot("SuperFormElementPlusSyncIcon", "↻"),
      error: ot("SuperFormElementPlusErrorIcon", "×")
    },
    render(e) {
      return typeof e == "string" ? C("span", e) : e ? C(W(e)) : void 0;
    }
  },
  actions: {
    render(e, t, n) {
      if (e === "tooltip") {
        const { title: s, ...i } = t;
        return C(_n, { ...i, content: s }, n);
      }
      const { buttons: a, moreButtons: o, groupProps: l, effectData: r } = t;
      return C(
        Yt,
        l,
        () => [...a, ...o].map(
          (s) => _r(s, r)
        )
      );
    }
  },
  presentation: {
    render(e, t, n) {
      if (e === "checkableTag") {
        const { selected: r, onSelectedChange: s, ...i } = t;
        return C(
          ao,
          { ...i, checked: r, onChange: s },
          n
        );
      }
      const { removable: a, onRemove: o, ...l } = t;
      return C(
        ro,
        { ...l, closable: a, onClose: o },
        n
      );
    }
  },
  services: {
    message(e, t) {
      lo({ type: e, message: at(t) });
    },
    confirm(e) {
      return tt.confirm(
        at(e.content) ?? "",
        at(e.title),
        {
          ...e,
          confirmButtonText: e.okText,
          cancelButtonText: e.cancelText
        }
      ).then(e.onOk).catch(e.onCancel), { update: () => {
      }, destroy: () => tt.close() };
    },
    info(e) {
      let t = { ...e };
      const n = () => {
        tt.alert(
          at(t.content) ?? "",
          at(t.title),
          {
            ...t,
            confirmButtonText: t.okText
          }
        ).then(t.onOk).catch(() => {
        });
      };
      return n(), {
        update(a) {
          t = { ...t, ...a }, tt.close(), n();
        },
        destroy: () => tt.close()
      };
    }
  },
  modal: {
    render(e, t) {
      const {
        visible: n,
        "onUpdate:visible": a,
        afterClose: o,
        ...l
      } = e, { title: r, ...s } = t;
      return C(
        so,
        {
          ...l,
          modelValue: n,
          "onUpdate:modelValue": a,
          onClosed: o
        },
        r ? { ...s, header: r } : s
      );
    }
  },
  upload: {
    listIgnore: !1,
    renderTrigger: (e, t) => C(Nt, e, t),
    render(e, t) {
      const {
        maxCount: n,
        showUploadList: a,
        beforeUpload: o,
        customRequest: l,
        onChange: r,
        iconRender: s,
        isImageUrl: i,
        ...u
      } = e, b = (p) => ({
        ...p,
        status: p.status === "ready" ? "uploading" : p.status === "success" ? "done" : p.status === "fail" ? "error" : p.status
      }), h = (p) => ({
        ...p,
        status: p.status === "waiting" ? "ready" : p.status === "done" ? "success" : p.status
      });
      return C(
        io,
        {
          ...u,
          limit: n,
          fileList: (e.fileList || []).map(h),
          showFileList: a !== !1,
          beforeUpload: (p) => o == null ? void 0 : o(p, [p]),
          httpRequest: l,
          onChange: (p, w) => r == null ? void 0 : r({
            file: b(p),
            fileList: w.map(b)
          })
        },
        t
      );
    }
  },
  preview: {
    render(e) {
      return e.visible ? C(uo, {
        urlList: e.images ?? [],
        initialIndex: e.current ?? 0,
        onClose: () => {
          var t;
          return (t = e["onUpdate:visible"]) == null ? void 0 : t.call(e, !1);
        }
      }) : null;
    }
  },
  table: {
    render(e, t) {
      var g;
      const {
        data: n,
        columns: a = [],
        selection: o,
        expandedKeys: l,
        onExpandedChange: r,
        pagination: s,
        rowKey: i,
        scroll: u,
        ...b
      } = e, h = (m) => typeof i == "function" ? i(m) : m[i], p = (m, v) => (Array.isArray(v) ? v : String(v).split(".")).reduce(
        (S, A) => S == null ? void 0 : S[A],
        m
      ), w = (m) => m.map((v) => {
        const {
          dataIndex: S,
          title: A,
          children: I,
          customRender: y,
          key: _,
          ...O
        } = v;
        return C(
          Jt,
          {
            ...O,
            key: _ ?? (Array.isArray(S) ? S.join(".") : S),
            prop: Array.isArray(S) ? S.join(".") : S
          },
          I != null && I.length ? {
            header: () => {
              var T;
              return (T = t.headerCell) == null ? void 0 : T.call(t, { ...v, title: A });
            },
            default: () => w(I)
          } : {
            header: () => {
              var T;
              return (T = t.headerCell) == null ? void 0 : T.call(t, { ...v, title: A });
            },
            default: ({ row: T, $index: R }) => (y == null ? void 0 : y({
              text: p(T, S),
              record: T,
              index: R,
              column: v
            })) ?? p(T, S)
          }
        );
      });
      let d = !1;
      const c = C(
        co,
        {
          ...b,
          ref: (m) => {
            !m || !o || Ie(() => {
              var A;
              d = !0, (A = m.clearSelection) == null || A.call(m);
              const v = new Set(o.selectedKeys), S = (I) => I.forEach((y) => {
                var _;
                v.has(h(y)) && ((_ = m.toggleRowSelection) == null || _.call(m, y, !0)), Array.isArray(y.children) && S(y.children);
              });
              S(n), d = !1;
            });
          },
          data: n,
          rowKey: i,
          maxHeight: ((g = z(u)) == null ? void 0 : g.y) ?? b.maxHeight,
          expandRowKeys: l,
          onExpandChange: (m, v) => {
            if (Array.isArray(v)) {
              r == null || r(v.map(h));
              return;
            }
            const S = new Set(l || []), A = h(m);
            v ? S.add(A) : S.delete(A), r == null || r([...S]);
          },
          onSelectionChange: (m) => {
            var v;
            return !d && ((v = o == null ? void 0 : o.onChange) == null ? void 0 : v.call(o, m.map(h), m, {}));
          }
        },
        {
          ...t,
          default: () => {
            var m;
            return [
              o && C(Jt, {
                type: "selection",
                fixed: ((m = o.attrs) == null ? void 0 : m.fixed) ?? !0,
                selectable: o.isRowSelectable,
                ...o.attrs
              }),
              ...w(a)
            ];
          }
        }
      );
      return s ? C("div", { class: "sup-table-adapter" }, [
        c,
        C(fo, {
          currentPage: s.current,
          pageSize: s.pageSize,
          total: s.total,
          pageSizes: s.pageSizeOptions,
          layout: "total, sizes, prev, pager, next, jumper",
          "onUpdate:currentPage": (m) => {
            var v;
            return (v = s.onChange) == null ? void 0 : v.call(s, m, s.pageSize);
          },
          "onUpdate:pageSize": (m) => {
            var v;
            return (v = s.onShowSizeChange || s.onChange) == null ? void 0 : v(
              s.current ?? 1,
              m
            );
          },
          ...s.attrs
        })
      ]) : c;
    },
    renderFilter(e, t) {
      var w;
      const { bordered: n, items: a, value: o, onValueChange: l, attrs: r = {} } = e, { tabExtra: s, cardExtra: i, ...u } = t, b = C(
        Xt,
        { ...r, modelValue: o, "onUpdate:modelValue": l },
        {
          default: () => a.map(
            (d) => C(Zt, { ...d, label: d.tab, name: d.key })
          )
        }
      ), p = [C("div", { class: "sup-table-tabs" }, [
        b,
        s == null ? void 0 : s()
      ]), (w = u.default) == null ? void 0 : w.call(u)];
      return n ? C(
        Qt,
        {},
        {
          default: () => p,
          header: u.title || i ? () => {
            var d;
            return [(d = u.title) == null ? void 0 : d.call(u), i == null ? void 0 : i()];
          } : void 0
        }
      ) : p;
    },
    selectors: {
      table: ".el-table",
      header: ".el-table__header-wrapper",
      footer: ".el-table__footer-wrapper",
      pagination: ".el-pagination",
      empty: ".el-table__empty-block",
      emptyCell: ".el-table__empty-block",
      body: ".el-table__body-wrapper .el-scrollbar__wrap"
    }
  }
}, te = { prop: "modelValue", event: "update:modelValue" };
function kt(e) {
  const { onValueChange: t, onChange: n, ...a } = e;
  return {
    ...a,
    onChange: (o) => {
      t == null || t(o), n == null || n(o);
    }
  };
}
const Ir = {
  component: "Input",
  model: { prop: "modelValue", event: "update:modelValue" },
  processors: ["input"],
  transformProps(e, { option: t }) {
    return { placeholder: `请输入${t.label ?? ""}`, ...e };
  },
  render(e, t, n, a) {
    const { search: o, searchLoading: l, ...r } = t;
    return o ? C(e, r, {
      ...a,
      append: a.append || (() => C(Nt, { loading: l, onClick: () => {
        var s;
        return (s = t.onSearch) == null ? void 0 : s.call(t, t.modelValue);
      } }, () => "搜索"))
    }) : C(e, r, a);
  }
}, Ar = {
  Input: Ir,
  InputNumber: { component: "InputNumber", model: te },
  InputOtp: { component: "InputOtp", model: te },
  InputTag: { component: "InputTag", model: te },
  Autocomplete: { component: "Autocomplete", model: te },
  Mention: { component: "Mention", model: te },
  Switch: {
    component: "Switch",
    processors: ["switch"],
    model: { prop: "modelValue", event: "update:modelValue" },
    transformProps(e) {
      const { trueValue: t, falseValue: n, trueLabel: a, falseLabel: o, ...l } = e;
      return {
        ...l,
        activeValue: t,
        inactiveValue: n,
        activeText: a,
        inactiveText: o
      };
    }
  },
  Select: {
    component: "Select",
    processors: ["select"],
    model: { prop: "modelValue", event: "update:modelValue" },
    transformProps(e, { option: t }) {
      const { options: n, onValueChange: a, onChange: o, ...l } = e;
      return {
        placeholder: `请选择${t.label ?? ""}`,
        ...l,
        options: n,
        onChange: (r) => {
          a == null || a(r), o == null || o(r);
        }
      };
    },
    render(e, t, n, a) {
      const { options: o = [], ...l } = t;
      return C(e, l, {
        ...a,
        default: () => o.map((r) => C(po, r))
      });
    }
  },
  SelectV2: {
    component: "SelectV2",
    processors: ["select"],
    model: te,
    transformProps(e, { option: t }) {
      return kt({ placeholder: `请选择${t.label ?? ""}`, ...e });
    }
  },
  Cascader: { component: "Cascader", model: te },
  TreeSelect: { component: "TreeSelect", model: te },
  Radio: { component: "Radio", model: te },
  RadioGroup: {
    component: "RadioGroup",
    processors: ["radioGroup"],
    model: te,
    transformProps: kt
  },
  Checkbox: { component: "Checkbox", model: te },
  CheckboxGroup: {
    component: "CheckboxGroup",
    processors: ["checkboxGroup"],
    model: te,
    transformProps: kt
  },
  DatePicker: {
    component: "DatePicker",
    processors: ["picker"],
    model: te
  },
  TimePicker: {
    component: "TimePicker",
    processors: ["picker"],
    model: te
  },
  TimeSelect: { component: "TimeSelect", model: te },
  ColorPicker: { component: "ColorPicker", model: te },
  Rate: {
    component: "Rate",
    model: te
  },
  Slider: { component: "Slider", model: te },
  Segmented: { component: "Segmented", model: te },
  Transfer: { component: "Transfer", model: te }
}, Or = {
  FormItem: { validateEvent: !0 }
};
function qn(e = {}) {
  return {
    name: "element-plus",
    ...Cr,
    fields: Ar,
    fieldComponents: e.components,
    defaults: Or
  };
}
const Lr = qn();
function qr(e) {
  return e;
}
const Dr = (e) => {
  var t, n;
  return ((n = (t = ne.tableApiSetting) == null ? void 0 : t.resultTransform) == null ? void 0 : n.call(t, e)) || e;
}, Pr = (e) => {
  const { currentField: t, sizeField: n } = ne.tableApiSetting || {};
  return t || n ? {
    [t || "current"]: e.current,
    [n || "size"]: e.size
  } : e;
};
function Tr(e, t) {
  const n = $({}), a = k(!1);
  let o = {}, l = 0, r;
  const s = [], i = (v) => s.push(v);
  e.onLoaded && s.push(e.onLoaded);
  const u = async (v) => {
    var S, A, I;
    const y = lt({}, Pr(n), o, v), _ = ((S = e.beforeQuery) == null ? void 0 : S.call(e, y)) || y, O = (A = e.apis) == null ? void 0 : A.query;
    r == null || r.abort();
    const T = ++l;
    if (!O) {
      r = void 0, a.value = !1;
      return;
    }
    const R = new AbortController();
    r = R, a.value = !0;
    try {
      const E = await O(_, { signal: R.signal });
      if (T !== l || R.signal.aborted)
        return;
      const F = ((I = e.afterQuery) == null ? void 0 : I.call(e, E)) || E;
      return b(Dr(F));
    } finally {
      T === l && (r = void 0, a.value = !1);
    }
  }, b = (v) => (Array.isArray(v) ? (t(v), m.value !== !1 && (n.current = 1, m.value = { ...m.value, total: v.length })) : v != null && v.records && (t(v.records), m.value !== !1 && (n.current = v.current, n.size = v.size, m.value = { ...m.value, total: v.total })), Promise.all(s.map((S) => S(v)))), h = (v, S = n.size) => (n.current = v, n.size = S, u()), p = (v) => (m.value && (n.current = 1), u(v)), w = jt(p, 300, { leading: !1 }), d = () => {
    r == null || r.abort(), r = void 0, l += 1, a.value = !1;
  }, f = {}, c = (v, S) => {
    S === "dynamic" ? o = lt({}, f, v) : (Object.assign(f, v), lt(o, v));
  }, g = () => o, m = k(!1);
  return B(
    () => {
      var v;
      return e.pagination ?? ((v = e.attrs) == null ? void 0 : v.pagination);
    },
    (v) => {
      if (v === !1) {
        m.value = !1;
        return;
      }
      Object.assign(n, { size: (v == null ? void 0 : v.pageSize) || 10, current: (v == null ? void 0 : v.current) || 1 }), m.value = oe(
        {
          onChange: h
          // onShowSizeChange: goPage,
        },
        {
          ...v,
          pageSize: n.size,
          current: n.current
        }
      );
    },
    {
      immediate: !0,
      flush: "sync"
    }
  ), B(n, (v) => {
    m.value && (m.value = { ...m.value, pageSize: v.size, current: v.current });
  }), {
    goPage: h,
    reload: u,
    throttleRequest: w,
    cancelQuery: d,
    setQueryParams: c,
    getQueryParams: g,
    query: p,
    pagination: m,
    setPageData: b,
    onLoaded: i,
    loading: a
  };
}
function Er(e, t, n) {
  var a;
  const { columns: o, searchForm: l } = e, r = l || e.searchSchema || {}, s = k(), i = r.dataSource || $({}), { buttons: u = {}, searchOnChange: b, limit: h, ...p } = r, w = k(!1), d = [];
  r.subItems.forEach((v) => {
    if (typeof v == "string") {
      const S = o.find((A) => A.field === v);
      S && d.push({
        type: "Input",
        ...vo(S, "span", "disabled", "hidden"),
        editable: !0,
        exclude: []
      });
    } else
      return d.push({ ...v });
  }), h && d.length > h && d.forEach((v, S) => {
    if (S >= h) {
      const A = v.hidden;
      v.hidden = (...I) => !w.value || (A == null ? void 0 : A(...I));
    }
  });
  const f = {
    search() {
      var v;
      n(i), (v = r.onSubmit) == null || v.call(r, W(i));
    },
    reset(v) {
      s.value.resetFields(v);
    }
  }, c = Array.isArray(u) ? { actions: u } : { ...u };
  c.actions ?? (c.actions = b ? void 0 : ["search", "reset"]), (a = c.actions) != null && a.length && (h && d.length > h && (c.actions = [
    {
      label: () => [
        w.value ? "收起 " : "展开 ",
        Be(w.value ? "collapse" : "expand")
      ],
      attrs: { type: "link" },
      onClick: () => w.value = !w.value
    },
    ...c.actions
  ]), d.push({
    type: "InfoSlot",
    align: "right",
    span: "auto",
    render: () => C(Ae, {
      option: c,
      methods: f,
      effectData: ye({ table: t, form: s })
    })
  }));
  const g = B(s, () => {
    n(i), b && B(i, n), g();
  });
  return { formNode: () => C(me.Form, {
    option: {
      ...p,
      ignoreRules: !0,
      dataSource: i,
      subItems: d
    },
    ref: s,
    onSubmit: f.search,
    onReset: f.search
  }), formRef: s, ...f, dataSource: i };
}
function Rr(e) {
  return !e || !e.getBoundingClientRect ? 0 : e.getBoundingClientRect();
}
function vn(e) {
  const t = document.documentElement, n = t.scrollLeft, a = t.scrollTop, o = t.clientLeft, l = t.clientTop, r = window.pageXOffset, s = window.pageYOffset, i = Rr(e), { left: u, top: b, width: h, height: p } = i, w = (r || n) - (o || 0), d = (s || a) - (l || 0), f = u + r, c = b + s, g = f - w, m = c - d, v = window.document.documentElement.clientWidth, S = window.document.documentElement.clientHeight;
  return {
    left: g,
    top: m,
    right: v - h - g,
    bottom: S - p - m,
    rightIncludeBody: v - g,
    bottomIncludeBody: S - m
  };
}
function kr(e, t, n, a) {
  const o = oa(), l = (w, d) => d ? w.querySelector(d) : null, r = bo(b, 100), s = k({});
  let i = !1;
  const u = () => {
    var w;
    i = !0, a ? window.addEventListener("resize", r, {
      signal: a.signal
    }) : document.addEventListener("redoHeight", r), s.value = (w = e.attrs) == null ? void 0 : w.scroll, B(
      () => {
        var f;
        return [n.value, (f = z(t)) == null ? void 0 : f.length];
      },
      () => {
        r();
      },
      { flush: "post" }
    );
    const d = B(
      n,
      (f) => {
        f && (f.style.overflow = "hidden", new ResizeObserver(() => {
          r();
        }).observe(f), d());
      },
      { immediate: !0, flush: "post" }
    );
  };
  Ct(() => {
    i && document.removeEventListener("redoHeight", r);
  });
  function b() {
    i && Ie(() => {
      p();
    });
  }
  function h(w) {
    s.value = {
      y: w,
      x: "100%"
      // scrollToFirstRowOnChange: true,
    };
  }
  async function p() {
    var w;
    const { maxHeight: d, inheritHeight: f, isFixedHeight: c, resizeHeightOffset: g } = e, m = z(n);
    if (!m)
      return;
    const v = l(m, o.table);
    if (!v)
      return;
    await Ie();
    const S = getComputedStyle(m.parentElement), A = vn(v), I = vn(m), y = A.left - I.left, _ = (parseInt(S.marginBottom) || 0) + (parseInt(S.paddingBottom) || 0);
    let O = 0;
    m && f ? O = I.bottomIncludeBody - I.bottom - (A.top - I.top) : O = A.bottomIncludeBody - _;
    const T = l(v, o.title), R = (T == null ? void 0 : T.parentElement) === v ? T.offsetHeight ?? 0 : 0, E = l(v, o.header);
    if (!E)
      return;
    let F = 0;
    E && (F = E.offsetHeight);
    let L = 0;
    const V = l(v, o.footer);
    V && V.parentElement === v && (L += V.offsetHeight || 0);
    let q = 0;
    const H = l(m, o.pagination);
    H && (q = H.offsetHeight + 16);
    let Q = Math.ceil(O) - (g || 0) - y - q;
    const se = d || Q - L - R - F - 1;
    if (d && c && (Q = d + L + R + F + 1), c) {
      v.style.height = `${Q}px`, v.style["overflow-y"] = "hidden", f || (m.style.height = "unset");
      const x = l(m, o.wrapper);
      if (x && (x.style.height = "", x.style["overflow-y"] = ""), !(((w = z(t)) == null ? void 0 : w.length) > 0)) {
        if (l(v, o.empty)) {
          const J = l(v, o.emptyCell);
          J && (J.style.height = `${se}px`);
        }
        return;
      }
    }
    if (v.scrollHeight > Q)
      h(se);
    else {
      const x = l(v, o.body);
      x && h(x.scrollHeight <= se ? null : se);
    }
  }
  return { getScrollRef: s, redoHeight: b, debounceRedoHeight: r, listenResize: u };
}
const xr = Y({
  name: "SuperTable",
  inheritAttrs: !1,
  props: {
    dataSource: Array,
    schema: Object
  },
  emits: ["register", "load", "update:dataSource"],
  setup(e, t) {
    const { style: n, class: a, ...o } = t.attrs, l = it({ attrs: o }), r = k([]), s = k(), i = (x) => {
      r.value = x, t.emit("update:dataSource", x), Ne(l.dataSource) && (l.dataSource.value = x);
    };
    ke(() => e.dataSource && i(e.dataSource)), ke(() => l.dataSource && i(z(l.dataSource)));
    const u = k(), b = (x) => {
      ne.schemaDiagnostics && ft(x, "table", "SuperTable");
      const { isScanHeight: G, inheritHeight: J, isFixedHeight: ce, isContainer: de, ...fe } = oe(
        X.Table,
        { ...x.attrs },
        { ...l.attrs }
      );
      Object.assign(l, { isScanHeight: G, inheritHeight: J, isFixedHeight: ce, isContainer: de }, x, { attrs: fe });
    };
    ke(() => e.schema && b(W(e.schema)));
    const {
      loading: h,
      pagination: p,
      setPageData: w,
      onLoaded: d,
      goPage: f,
      reload: c,
      query: g,
      throttleRequest: m,
      cancelQuery: v,
      setQueryParams: S,
      getQueryParams: A
    } = Tr(l, i), { getScrollRef: I, redoHeight: y, listenResize: _ } = kr(l, r, s), O = st(), T = {
      setOption: b,
      setData: (x) => {
        x && i(x);
      },
      redoHeight: y,
      goPage: f,
      reload: c,
      query: g,
      onLoaded: d,
      resetSearchForm(x) {
        try {
          return u.value.formRef.resetFields(x);
        } catch (G) {
          console.warn(G);
        }
      },
      setPageData: w,
      getQueryParams: A,
      getData: () => r.value,
      dataRef: r,
      searchForm: N(() => {
        var x;
        return (x = u.value) == null ? void 0 : x.formRef;
      }),
      validate: async () => {
        var x;
        return (x = O.value) == null ? void 0 : x.validate();
      },
      setColumns: (x) => {
        var G;
        !H && !((G = l.columns) != null && G.length) ? Object.assign(l, { columns: x }) : (Object.assign(l, { columns: x }), se(x));
      }
    }, R = k({ ...T }), E = (x) => {
      Object.assign(R.value, Te($(x)), T), t.emit("register", R.value);
    };
    t.emit("register", R.value), t.expose(R.value);
    const F = $({
      reload: c,
      onRegister: E,
      loading: h
    });
    Ct(() => {
      v(), t.emit("register", null);
    }), xe("rootSlots", t.slots);
    const L = k({}), V = k(), q = $({ formData: r, current: r, queryParams: N(A) });
    let H = !1;
    const Q = B(
      l,
      (x) => {
        var G, J;
        if (!((G = x == null ? void 0 : x.columns) != null && G.length))
          return;
        if (V.value) {
          Q();
          return;
        }
        const { columns: ce, maxHeight: de, isScanHeight: fe = !0, inheritHeight: pe } = x, we = $({
          refData: r,
          listData: Ye(ce)
        });
        L.value = Ze(l.slots, q, t.slots);
        const Re = x.searchForm || x.searchSchema, {
          attrs: { onLoad: ve, ...Oe }
        } = he({ option: x, effectData: q });
        Object.assign(F, Oe, { pagination: p }), d((ae) => {
          t.emit("load", ae), ve == null || ve(ae);
        }), Re && (u.value = Er(x, R, (ae) => {
          S(ae, "form"), H && m();
        }));
        const Se = x.tabs && x.tabs.field;
        if (x.tabs && Se) {
          const ae = (J = x.tabs).activeKey ?? (J.activeKey = k(x.tabs.defaultActiveKey)), D = {};
          B(
            ae,
            (P) => {
              P !== void 0 && (We(D, Se, P), S(D), H && m());
            },
            { immediate: !0 }
          );
        }
        if (B(
          k(x.params),
          (ae) => {
            S(ae, "dynamic"), H && m();
          },
          { deep: !0, immediate: !0 }
        ), Ie(() => {
          H = !0, l.immediate !== !1 && m();
        }), fe || pe || de) {
          _(), F.scroll = I;
          const { onChange: ae, onExpandedRowsChange: D } = F;
          F.onChange = (...P) => {
            ae == null || ae(...P);
          }, F.onExpandedRowsChange = (P) => {
            D == null || D(P), y();
          }, B(r, y);
        }
        const _e = () => C(me.Table, { option: l, effectData: q, model: we, ...F }, L.value);
        l.editable ? V.value = () => wt({ model: r.value, ref: O }, { default: _e }) : V.value = _e;
      },
      {
        immediate: !0
      }
    ), se = (x) => {
      const G = $({
        refData: r,
        listData: Ye(x)
      }), J = () => C(me.Table, { option: l, effectData: q, model: G, key: Symbol(), ...F }, L.value);
      l.editable ? V.value = () => wt({ model: r.value, ref: O }, { default: J }) : V.value = J;
    };
    return () => V.value && C(
      Gt,
      { name: "exaProvider", data: { data: r } },
      () => {
        var x, G;
        return !u.value || (x = l.searchForm) != null && x.teleport ? C(
          "div",
          oe(
            {
              ref: s,
              class: [l.isContainer && "sup-container", "sup-table", "sup-form-section"]
            },
            {
              class: a,
              style: n
            }
          ),
          [
            ((G = l.searchForm) == null ? void 0 : G.teleport) && C(
              Yn,
              { to: l.searchForm.teleport },
              C("div", { class: "sup-form-section sup-table-search" }, C(u.value.formNode))
            ),
            V.value()
          ]
        ) : C(
          "div",
          oe(
            { ref: s, class: [l.isContainer && "sup-container", "sup-table"] },
            { class: a, style: n }
          ),
          [
            C("div", { class: "sup-form-section sup-table-search" }, C(u.value.formNode)),
            C("div", { class: "sup-form-section section-last" }, C(V.value))
          ]
        );
      }
    );
  }
}), zr = (e, t) => {
  const [n, a] = Fn(), o = Promise.resolve(typeof e == "function" ? e() : e), l = (s) => {
    if (s)
      n.value || (o.then(s.setOption), t && s.setData(t)), n.value = s;
    else if (s === null)
      n.value = void 0;
    else
      return (i, u) => C(xr, { ...i, onRegister: l }, u == null ? void 0 : u.slots);
  }, r = async (s, i) => {
    const u = await a();
    if (s && s in u)
      return typeof u[s] == "function" ? u[s](i) : u[s];
  };
  return [
    l,
    {
      /** 异步获取表格引用 */
      getTable: a,
      tableRef: n,
      redoHeight() {
        r("redoHeight");
      },
      setData(s) {
        r("setPageData", s);
      },
      /** 返回当前表格数据 */
      getData() {
        var s;
        return ie((s = n.value) == null ? void 0 : s.dataRef);
      },
      dataSource: N(() => {
        var s;
        return (s = n.value) == null ? void 0 : s.dataRef;
      }),
      /** 跳转到指定页 */
      goPage(s) {
        var i;
        (i = n.value) == null || i.goPage(s);
      },
      /** 设置表格列 */
      setColumns(s) {
        r("setColumns", s);
      },
      /** 刷新数据，不改动查询条件与当前页 */
      reload() {
        var s;
        return (s = n.value) == null ? void 0 : s.reload();
      },
      /** 手动执行条件查询，不覆盖搜索表单参数 */
      query(s) {
        var i;
        return (i = n.value) == null ? void 0 : i.query(s);
      },
      /** 查询完成，返回结果回调 */
      onLoaded(s) {
        r("onLoaded", s);
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
        r("expandAll");
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
      asyncCall: r,
      /** `editable`模式下进行表单校验 */
      validate() {
        return r("validate");
      }
    }
  ];
};
function Kr(e) {
  return e;
}
const Fr = Y({
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
  setup(e, { slots: t }) {
    var n;
    const a = (n = t.default) == null ? void 0 : n.call(t), { effectData: o, ...l } = e, r = a ? a.flatMap(({ children: s, props: i = {} }) => {
      const { roleName: u, onClick: b, confirmText: h, tooltip: p, disabledTooltip: w, icon: d, ...f } = mo(
        i,
        (c, g) => go(g)
      );
      return !b || !s ? [] : {
        label: s.default || s,
        icon: d,
        tooltip: p,
        disabledTooltip: w,
        roleName: u,
        onClick: b,
        confirmText: h,
        attrs: f
      };
    }) : e.actions;
    return () => C(Ae, { option: { ...l, actions: r }, effectData: o });
  }
});
function Hr(e) {
  return [() => C(Fr, e)];
}
const jr = Y({
  props: {
    dataSource: Object,
    schema: Object
  },
  emits: ["register"],
  setup(e, t) {
    var n;
    const a = st(e.schema || {});
    ne.schemaDiagnostics && e.schema && ft(e.schema, "detail", "SuperDetail");
    const o = k(((n = e.schema) == null ? void 0 : n.dataSource) || {});
    B(
      () => e.dataSource,
      (s) => {
        s && (o.value = s);
      },
      { immediate: !0 }
    );
    const l = {
      setOption: (s) => {
        ne.schemaDiagnostics && ft(s, "detail", "SuperDetail"), a.value = s, s.dataSource && (o.value = s.dataSource);
      },
      setData: (s) => {
        o.value = s;
      }
    }, r = k();
    return B(
      a,
      (s) => {
        if (!(s != null && s.subItems))
          return;
        const i = Ye(s.subItems, o);
        r.value = i.modelsMap;
      },
      { immediate: !0 }
    ), t.expose(l), t.emit("register", l), xe("exaProvider", yn({ data: o })), xe("rootSlots", t.slots), () => r.value && C(
      "div",
      { class: ["sup-detail", a.value.isContainer && "sup-container"] },
      C($e, {
        option: {
          type: "Descriptions",
          ...a.value
        },
        ...a.value.attrs,
        ...a.value.descriptionsProps,
        modelsMap: r.value,
        isRoot: !0
      })
    );
  }
});
function Gr(e, t) {
  const n = le(t), a = k(), o = Promise.resolve(typeof e == "function" ? e() : e), l = (r) => {
    if (r)
      a.value || (o.then(r.setOption), n.value && B(
        n,
        (s) => {
          r.setData(s);
        },
        { immediate: !0 }
      )), a.value = r;
    else
      return (s) => C(jr, { ...s, onRegister: l }, Qn());
  };
  return [
    l,
    {
      setData(r) {
        a.value ? a.value.setData(r) : n.value = r;
      }
    }
  ];
}
function Wr(e) {
  return e;
}
const Mr = wr(
  "superform-element-plus",
  (e) => qn({ components: e })
), Yr = Mr, Qr = {
  Input: ho,
  InputNumber: yo,
  InputOtp: wo,
  InputTag: So,
  Autocomplete: _o,
  Mention: Co,
  Select: Io,
  SelectV2: Ao,
  Cascader: Oo,
  TreeSelect: Do,
  Radio: Po,
  RadioGroup: To,
  Checkbox: Eo,
  CheckboxGroup: Ro,
  Switch: ko,
  DatePicker: xo,
  TimePicker: Fo,
  TimeSelect: jo,
  ColorPicker: Mo,
  Rate: $o,
  Slider: Uo,
  Segmented: Vo,
  Transfer: No
};
export {
  Fr as SuperButtons,
  jr as SuperDetail,
  Ma as SuperForm,
  xr as SuperTable,
  gr as configure,
  qn as createElementPlusAdapter,
  jn as createModal,
  Yr as default,
  Wr as defineDetail,
  qr as defineForm,
  Kr as defineTable,
  Vr as defineUIAdapter,
  wa as diagnoseSchema,
  Lr as elementPlusAdapter,
  Cr as elementPlusCapabilities,
  Or as elementPlusDefaults,
  Ar as elementPlusFields,
  Qr as fieldComponents,
  Br as registerAutoImportedComponents,
  hr as registerComponent,
  yr as registerComponents,
  br as useAdapter,
  Hr as useButtons,
  Gr as useDetail,
  $a as useForm,
  Mn as useModal,
  Nr as useModalForm,
  zr as useTable
};
