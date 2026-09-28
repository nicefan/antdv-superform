import { defineComponent as Q, reactive as N, provide as $e, h as C, toRef as le, inject as be, mergeProps as ae, unref as X, toRefs as Ve, toRaw as ee, computed as L, watch as K, shallowRef as Ie, ref as $, shallowReactive as st, onMounted as Ft, toValue as oe, getCurrentInstance as $t, onUnmounted as Vt, isRef as Ue, onScopeDispose as Wt, markRaw as ca, watchEffect as Re, openBlock as Oe, createBlock as Qe, resolveDynamicComponent as ot, readonly as Cn, onBeforeUnmount as Nt, nextTick as Ce, render as it, createVNode as kn, createElementBlock as yt, Fragment as Et, renderList as xn, toDisplayString as da, cloneVNode as _n, Teleport as fa, useSlots as pa } from "vue";
import { defaults as Ne, get as De, set as ut, isFunction as tt, isArray as va, merge as pt, isPlainObject as Te, cloneDeep as Fe, isNumber as Ge, update as ma, uniq as ba, mergeWith as ha, ElButton as we, ElDescriptions as ga, ElDescriptionsItem as ya, ElTabs as An, ElTabPane as On, ElCollapse as wa, ElCollapseItem as Sa, ElTable as Ca, ElTableColumn as Yt, ElPagination as ka, ElCard as In, ElDivider as xa, ElDropdown as Dn, ElDropdownMenu as Mn, ElDropdownItem as Pt, ElSpace as En, ElTooltip as Pn, useNamespace as _a, ElUpload as Aa, ElProgress as Oa, ElForm as Ia, ElFormItem as Da, ElRow as Ma, ElCol as Ea, ElTag as Pa, ElCheckTag as ja, ElEmpty as Ra, ElDialog as jn, ElImageViewer as Ta, ElMessage as Fa, mapKeys as $a, throttle as Va, omit as Na, debounce as La, camelCase as Ba, ElInput as bt, ElInputNumber as Ua, ElInputOtp as qa, ElInputTag as za, ElAutocomplete as Ka, ElMention as Ha, ElSelect as Ga, ElSelectV2 as Wa, ElCascader as Ya, ElTreeSelect as Qa, ElRadio as Xa, ElRadioGroup as Za, ElCheckbox as Ja, ElCheckboxGroup as eo, ElSwitch as to, ElDatePicker as Qt, ElTimePicker as Xt, ElTimeSelect as no, ElColorPicker as ao, ElRate as oo, ElSlider as lo, ElSegmented as ro, ElTransfer as so } from "./element-plus.js";
let Xe = (e = 21) => crypto.getRandomValues(new Uint8Array(e)).reduce((t, n) => (n &= 63, n < 36 ? t += n.toString(36) : n < 62 ? t += (n - 26).toString(36).toUpperCase() : n > 62 ? t += "-" : t += "_", t), "");
const Rn = [
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
], Tn = new Set(Rn);
function Zt(e) {
  const t = () => C("div", e.contentAttrs, [e.content()]);
  if (e.component)
    return C(
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
  return C("div", ae(e.attrs || {}, { class: "sup-group" }), [
    (e.title || !n && e.extra) && C(
      "div",
      {
        class: "sup-titlebar",
        style: { display: "flex", alignItems: "center" }
      },
      [
        e.title && C("div", { class: "sup-title" }, [e.title()]),
        !n && e.extra && C(
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
    n && e.extra && C(
      "div",
      {
        class: "sup-bottom-buttons",
        style: { textAlign: e.extraAlign }
      },
      [e.extra()]
    )
  ]);
}
const io = /* @__PURE__ */ new Set(["group", "card", "tabs", "collapse", "descriptions", "upload"]);
function Fn(e = {}) {
  return Lt(Object.fromEntries(Object.entries(e).map(([t, n]) => [t, { render: n }]))).render;
}
function Lt(e = {}) {
  const t = {}, n = { render: t };
  for (const a of Object.keys(e)) {
    const l = e[a];
    if (!l)
      continue;
    l.service && Object.assign(n, { [a]: l.service }), l.schemaDefaults && (n.defaults = { ...l.schemaDefaults });
    const { defaults: o, adaptProps: r } = l, s = io.has(a), i = l.render, b = l.component;
    Object.assign(t, {
      [a]: (f = {}, p = {}) => {
        const v = s ? f.attrs || {} : f, h = {
          type: a,
          attrs: o ? { ...o, ...v } : v,
          state: f,
          slots: s && f.slots || p
        };
        return r && (h.attrs = r(h.attrs, h)), s && (h.state = { ...f, attrs: h.attrs, slots: h.slots }), i ? i(h) : C(b, h.attrs, h.slots);
      }
    });
  }
  return n;
}
const $n = /* @__PURE__ */ new Map(), Vn = /* @__PURE__ */ new Map(), lt = /* @__PURE__ */ new Map();
function Nn(e, t = "manual") {
  const n = t === "manual" ? $n : Vn;
  Object.entries(e).forEach(([a, l]) => {
    l && n.set(a, l);
  });
}
function Bt(e) {
  var t;
  const n = qe();
  if (!n.supportedFields.includes(e))
    return;
  const a = ((t = n.fieldSources) == null ? void 0 : t[e]) ?? e, l = [
    a,
    ...Object.keys(n.fieldSources || {}).filter(
      (o) => {
        var r;
        return o !== a && ((r = n.fieldSources) == null ? void 0 : r[o]) === a;
      }
    )
  ];
  return lt.get(a) ?? l.map((o) => $n.get(o)).find(Boolean) ?? l.map((o) => Vn.get(o)).find(Boolean);
}
function uo(e) {
  var t;
  const n = lt.get(e);
  if (n)
    return n;
  const a = Bt(e);
  if (!a)
    throw new Error(
      `UIAdapter '${qe().name}' 支持字段 '${e}'，但组件 '${e}' 尚未注册；请启用自动导入插件，或在 superForm.initialize({ components }) 中提供`
    );
  const l = ((t = qe().fieldSources) == null ? void 0 : t[e]) ?? e;
  return lt.set(l, a), lt.set(e, a), a;
}
function Ln(e) {
  const t = lt.get(e);
  if (!t)
    throw new Error(`原始 UI 组件 '${e}' 尚未加载`);
  return t;
}
let We;
function co(e) {
  if (!("uiComponents" in e))
    return e;
  const { uiComponents: t, ...n } = e, a = Lt(t);
  return { ...n, ...a, render: { ...a.render, ...Fn(e.render) } };
}
function qe() {
  if (!We)
    throw new Error(
      "SuperForm 尚未初始化 UIAdapter；官方产品请先调用 superForm.initialize()，独立 Core 请调用 superForm.useAdapter(adapter)"
    );
  return We;
}
function Jt(e) {
  if (We) {
    if (We !== e)
      throw new Error(`UIAdapter 已初始化为 '${We.name}'，不能切换为 '${e.name}'`);
    return;
  }
  We = e, Nn(e.fieldComponents || {}, "manual");
}
function Bn(e, t = {}) {
  const { uiComponents: n, ...a } = t, l = Lt(n);
  return {
    ...e,
    ...l,
    ...a,
    defaults: { ...e.defaults, ...l.defaults },
    render: { ...e.render, ...l.render, ...Fn(t.render) }
  };
}
const en = {};
function z(e) {
  const t = en[e];
  if (t)
    return t;
  const n = qe();
  let a = n.render[e];
  if (e === "group") {
    const l = n.render.group || Zt;
    a = (o) => o.component ? Zt(o) : l(o);
  } else
    e === "compactSpace" && (a || (a = n.render.space));
  if (!a)
    throw new Error(`UIAdapter '${n.name}' 未提供 render.${e}`);
  return en[e] = a, a;
}
function fe(e) {
  const t = qe(), n = t[e];
  if (!n)
    throw new Error(`UIAdapter '${t.name}' 未提供 ${e} 协议`);
  return n;
}
const Un = {
  type: { type: String, required: !0 },
  option: { type: Object, required: !0 },
  model: { type: Object, required: !0 },
  effectData: { type: Object, required: !0 },
  binding: { type: Object, required: !0 },
  state: { type: Object, required: !0 },
  attrs: { type: Object, required: !0 }
};
function fo(e, t) {
  return (...n) => {
    const a = e(...n);
    for (const l of Array.isArray(t) ? t : [t])
      typeof l == "function" && l !== e && l(...n);
    return a;
  };
}
function Ut({ prop: e = "value", event: t = "update:value" } = {}, n) {
  const a = t.startsWith("on") ? t : `on${t[0].toUpperCase()}${t.slice(1)}`;
  return (l, o) => {
    const r = { ...n ? n(l, o) : l }, { binding: s, state: i, option: b, effectData: f } = o;
    i.disabled !== void 0 && (r.disabled = i.disabled), b.disabledDate !== void 0 && (r.disabledDate = (...p) => b.disabledDate(f, ...p));
    for (const [p, v] of Object.entries(s)) {
      if (b.labelField && (p === "labelValue" || p === "onUpdate:labelValue"))
        continue;
      const h = p === "value" ? e : p === "onUpdate:value" ? a : p;
      r[h] = p.startsWith("onUpdate:") && typeof v == "function" ? fo(v, r[h]) : v;
    }
    return r;
  };
}
function po(e, t) {
  return Object.fromEntries(
    Object.entries(e).map(([n, { model: a, ...l }]) => [
      n,
      {
        ...l,
        // 两条渲染路径共用绑定和属性转换，扩展渲染不能再次合成原生事件。
        adaptProps: Ut(a ?? t, l.adaptProps)
      }
    ])
  );
}
const tn = /* @__PURE__ */ new Map(), vo = Ut();
function qn(e) {
  var t, n;
  const a = tn.get(e);
  if (a)
    return a;
  const l = qe();
  if (!l.supportedFields.includes(e))
    return;
  const o = (t = l.fields) == null ? void 0 : t[e], r = (o == null ? void 0 : o.component) ?? (o != null && o.render && !Bt(e) ? void 0 : uo(e)), s = (o == null ? void 0 : o.adaptProps) ?? l.adaptFieldProps ?? vo, i = (n = o == null ? void 0 : o.processors) != null && n.some((f) => ["options", "picker", "range"].includes(f)) ? "请选择" : "请输入", b = {
    ...o,
    type: e,
    component: r,
    render(f) {
      var p;
      const v = Object.assign(s(f.attrs, f), o == null ? void 0 : o.fixedProps), h = ((p = o == null ? void 0 : o.adaptSlots) == null ? void 0 : p.call(o, f.slots, f)) ?? f.slots;
      return o != null && o.render ? o.render({ ...f, attrs: v, slots: h }) : C(r, v, h);
    },
    // 只缓存提示前缀，label 按当前字段读取，避免同类型字段串用提示文案。
    // defaults/attrs 的 class/style 按 Vue 规则合并；fixedProps 最后直接覆盖，不能被用户配置改写。
    getAttrs: (f, p, v = {}) => Object.assign(
      ae(
        { placeholder: v.placeholder ?? `${i}${p.label ?? ""}` },
        (o == null ? void 0 : o.defaults) ?? {},
        f,
        // 两套 UI 均接收标准 options；只在专项结果存在时覆盖，空数组也有效。
        v.options === void 0 ? {} : { options: v.options }
      ),
      o == null ? void 0 : o.fixedProps
    ),
    adaptProps: s
  };
  return tn.set(e, b), b;
}
function ze(e) {
  var t, n;
  return (n = (t = fe("icons").semantic) == null ? void 0 : t[e]) == null ? void 0 : n.call(t);
}
function xe(e) {
  const t = be("exaProvider", {}).data;
  return N({ ...e || {}, formData: t });
}
function nn(e, t) {
  const n = $(Ue(e) ? e : !!e);
  return typeof e == "function" && Re(() => {
    n.value = e(t);
  }), n;
}
function jt(e, t) {
  const n = N({});
  return e && Re(() => {
    Object.assign(n, e(t));
  }), n;
}
function mo(e = {}, t) {
  const n = {};
  return Object.keys(e).forEach((a) => {
    !e[a] || a === "onUpdate" || (a.match(/^on[A-Z]/) ? n[a] = (...l) => e[a](t, ...l) : a === "on" && Object.entries(e.on).forEach(([l, o]) => {
      const r = "on" + l.charAt(0).toUpperCase() + l.slice(1);
      n[r] = (...s) => o(t, ...s);
    }));
  }), n;
}
function qt({ option: e, model: t, effectData: n }, a) {
  const {
    field: l,
    endField: o,
    labelField: r,
    stringifyValue: s,
    computed: i,
    value: b,
    onUpdate: f
  } = e, p = {}, v = e.vModelFields || {};
  if (r && (p.labelValue = L(() => De(t.parent, r)), p["onUpdate:labelValue"] = (u) => {
    const d = s ? u == null ? void 0 : u.toString() : u;
    ut(t.parent, r, d);
  }), Object.entries(v).forEach(([u, d]) => {
    var g;
    typeof d == "string" ? ((g = t.parent)[d] ?? (g[d] = void 0), p[u] = L(() => De(t.parent, d)), p[`onUpdate:${u}`] = (y) => {
      ut(t.parent, d, y);
    }) : Ue(d) ? (p[u] = d, p[`onUpdate:${u}`] = (y) => d.value = y) : p[u] = d;
  }), !l)
    return Ue(b) && Object.assign(p, {
      value: b,
      "onUpdate:value": (u) => b.value = u
    }), p;
  a !== void 0 && (t.refData ?? (t.refData = oe(a)));
  const h = le(t, "refData"), w = $(), S = (u = oe(a)) => {
    w.value = u, h.value !== u && a !== void 0 && (h.value = u);
  };
  Object.assign(p, {
    value: w,
    "onUpdate:value": S
  }), Ue(b) && (K(h, (u) => b.value = u), K(b, S));
  let c = oe(t.refData), m;
  if (o)
    w.value = [h.value, t.parent[o]], m = (u) => {
      const [d, g] = u || [];
      h.value = d, c = d, t.parent[o] = g;
    }, K([h, () => t.parent[o]], (u) => {
      w.value = u;
    });
  else if (s) {
    const u = (d) => (d == null ? void 0 : d.toString().split(",")) || [];
    w.value = u(h.value), m = (d) => {
      const g = (d == null ? void 0 : d.toString()) || "";
      h.value = g, c = g;
    }, K(h, (d) => {
      d !== c && (w.value = u(d));
    });
  } else
    w.value = c, m = (u) => {
      h.value = u, c = u;
    }, K(h, S);
  return K(w, m, { flush: "sync" }), f && K(h, () => f(n)), i && K(
    // 使用ref让计算结果即使一样也会进行后面的赋值
    () => $(i(c, n)),
    (u) => m(X(u)),
    { immediate: !0 }
  ), p;
}
function ke({ option: e, effectData: t, inheritDisabled: n }) {
  const { type: a, dynamicAttrs: l, disabled: o, hidden: r, required: s } = e, i = nn(r, t), b = nn(s, t), f = n === void 0 && o === void 0 ? void 0 : L(() => {
    let c = oe(n);
    if (!(!c && o === void 0))
      return c || (typeof o == "function" ? c = !!o(t) : c = oe(o)), c;
  }), p = mo(e, t), v = typeof l == "function" ? { ...Ve(jt(l, t)) } : {}, h = ae({ ...Z[a] }, { ...e.attrs }, p, v), w = pt({}, e.attrs, h);
  return { attrs: { ...w, ...f && {
    disabled: L(() => f.value ?? oe(w.disabled))
  } }, nativeAttrs: w, disabled: f, hidden: i, required: b };
}
function an(e, t = {}) {
  const n = new RegExp("{(\\w*)}", "g");
  return e.replace(n, (a, l) => t[l] || "");
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
}, ln = {
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
function bo(e, t, n, a) {
  let l;
  if (t)
    l = { type: e, len: t, message: "len" };
  else if (Ge(n) && Ge(a))
    l = { type: e, max: n, min: a, message: "range" };
  else if (Ge(n))
    l = { type: e, max: n, message: "max" };
  else if (Ge(a))
    l = { type: e, min: a, message: "min" };
  else
    return !1;
  return e === "number" ? (l.message = ln.number[l.message], l.transform = (o) => Number(o)) : l.message = ln.string[l.message], l;
}
function ho(e, t = "") {
  const { trigger: n, required: a, type: l = "string", len: o, max: r, min: s, pattern: i, validator: b, message: f } = e || {}, p = [];
  a && (l === "string" || l in on ? p.push({
    required: a,
    trigger: n,
    // validator: noEmpty,
    pattern: /^[\s\S]*.*[^\s][\s\S]*$/,
    // transform: (value) => value + '',
    // whitespace: true,
    message: f || `${t}不能为空！`
  }) : p.push({ required: a, trigger: n, message: f || `${t}不能为空！` }));
  const v = on[l];
  if (v) {
    const h = an(v.message, { label: t });
    p.push({ ...v, trigger: n, message: h });
  }
  if (i && p.push({ pattern: i, trigger: n, message: f }), o || Ge(r) || Ge(s)) {
    const h = bo(l, o, r, s), w = an(h.message, { label: t, len: o, max: r, min: s });
    p.push({ ...h, trigger: n, message: w, type: l });
  }
  return b && p.push({ validator: b, trigger: n }), p;
}
function zn(e, t, n) {
  const { field: a, columns: l, subItems: o, initialValue: r, value: s } = e, i = e.endField ?? e.labelField, b = a ? a.split(".") : [], f = n.concat(b), p = b.splice(-1)[0], v = N({
    refName: p,
    initialValue: r,
    fieldName: a,
    origin: t,
    parent: t,
    refData: t,
    propChain: f
  });
  return p ? (b.length && (v.parent = L(() => De(t.value, b))), v.refData = L({
    get: () => De(t.value, a),
    set: (h) => ut(t.value, a, h)
  }), K(
    t,
    () => {
      v.refData ?? (v.refData = oe(r) ?? oe(s) ?? (l && [] || o && {})), i && ma(v.parent, i, (h) => h);
    },
    { immediate: !0, flush: "sync" }
  )) : s && (v.refData = $(s), v.propChain = []), v;
}
const ct = (e, t) => e == null ? void 0 : e.map((n) => n.validator ? { ...n, validator: async (l, ...o) => {
  const r = await n.validator({ ...l, ...t }, ...o);
  if (r === !1 || r instanceof Error)
    throw r;
} } : n);
function Je(e, t, n = []) {
  const a = le(t || {}), l = {}, o = /* @__PURE__ */ new Map();
  return e.forEach((r) => {
    if (typeof r != "object")
      return;
    const s = zn(r, a, n), { required: i, label: b, subItems: f, columns: p } = r;
    if (r.rules || i) {
      const v = r.rules || [], h = Array.isArray(v) ? v : [v];
      if (i) {
        const S = h[0];
        S ? S.required = i : h.push({ required: i });
      }
      let w = "string";
      if (s.refData) {
        const S = typeof s.refData;
        w = S === "object" && Array.isArray(s.refData) ? "array" : S;
      }
      s.rules = h.map((S) => ho({ type: w, ...S }, b)).flat(), s.propChain.length && (l[s.propChain.join(".")] = s.rules);
    }
    if (f) {
      const v = Je(f, le(s, "refData"), s.propChain);
      Object.assign(l, v.rules), s.children = v.modelsMap;
    } else
      p && (s.listData = Je(p));
    o.set(ca(r), s);
  }), {
    rules: l,
    modelsMap: o
  };
}
function dt(e, t, n) {
  const a = e.propChain;
  if (e.index === n && a.length === t.length && a.every((o, r) => o === t[r]))
    return;
  const l = (o) => {
    var r, s;
    (r = o.propChain) != null && r.length && a.every((i, b) => o.propChain[b] === i) && (o.propChain = [...t, ...o.propChain.slice(a.length)]), o.index !== void 0 && (o.index = n), (s = o.children) == null || s.forEach(l);
  };
  l(e);
}
function Ke(e, t, n = [], a) {
  const l = le(t || {}), o = {}, r = [...e].map(([s, i]) => {
    const { children: b, rules: f, listData: p } = i, v = a !== void 0 ? [...n, a] : n, h = zn(s, l, v);
    if (a !== void 0 && (h.index = a), h.rules = f, h.propChain.length && f && (o[h.propChain.join(".")] = f), b) {
      const { modelsMap: w, rules: S } = Ke(b, le(h, "refData"), h.propChain);
      Object.assign(o, S), h.children = w;
    }
    return p && (h.listData = p), [s, h];
  });
  return { modelsMap: new Map(r), rules: o };
}
function Kn(e, t, n, a) {
  const { modelsMap: l, rules: o } = Ke(e, t, n, a), r = [];
  return function s(i) {
    for (const [b, f] of i)
      r.push([b, f]), f.children && s(f.children);
  }(l), { modelsMap: new Map(r), rootModels: l, rules: o };
}
const go = (e, t) => Object.prototype.hasOwnProperty.call(e, t);
function Hn(e, t = {}, n = {}) {
  for (const [a, l] of Object.entries(e))
    Array.isArray(l) ? e[a] = Fe((t == null ? void 0 : t[a]) ?? (n == null ? void 0 : n[a])) : Object.prototype.toString.call(l) === "[object Object]" ? Hn(l, t == null ? void 0 : t[a], n == null ? void 0 : n[a]) : e[a] = (t == null ? void 0 : t[a]) ?? (n == null ? void 0 : n[a]);
}
function Gn(e, t, n = {}) {
  for (const [a, l] of Object.entries(e)) {
    if (!go(t, a))
      continue;
    const o = t[a] ?? (n == null ? void 0 : n[a]);
    Te(l) && Te(o) ? Gn(l, o, n == null ? void 0 : n[a]) : Array.isArray(o) || Te(o) ? e[a] = Fe(o) : e[a] = o;
  }
}
function rn() {
  let e;
  return { promise: new Promise((n) => {
    e = n;
  }), resolve: e };
}
function Wn() {
  const e = $();
  let t = rn(), n = !0;
  return K(e, (l) => {
    l ? (t.resolve(!0), n = !1) : n || (t = rn(), n = !0);
  }), [e, () => t.promise.then(() => e.value)];
}
function te(e, t = {}) {
  return e ? typeof e == "function" ? e(t || {}, {}) : typeof e != "object" ? C("span", e) : C(e, { effectData: t }) : null;
}
const se = {
  tagViewer: ["pink", "red", "orange", "green", "cyan", "blue", "purple"]
};
function nt(e, t, n) {
  const a = n || be("rootSlots", {}), l = {};
  return e && Object.entries(e).forEach(([o, r]) => {
    const s = typeof r == "string" ? a[r] : r;
    s && (l[o] = (i) => typeof s == "function" ? s({ ...t, ...i || {} }) : s);
  }), l;
}
function zt(e, t, n = !1, a = {}) {
  if (t != null)
    for (const l of e) {
      const o = l[a.value ?? "value"];
      if (Object.is(o, t) || n && String(o) === t)
        return l;
      const r = l[a.children ?? "children"], s = Array.isArray(r) && zt(r, t, n, a);
      if (s)
        return s;
    }
}
function Ct(e, t = {}, n = !0) {
  const a = $([]);
  let l = 0;
  (e == null ? void 0 : e.source) !== void 0 && e.dictName !== void 0 && console.warn("[SuperForm] options.source 与 options.dictName 同时配置，优先使用 source，忽略 dictName");
  const o = async (s = t) => {
    var i;
    const b = ++l, f = X(e == null ? void 0 : e.source), p = (e == null ? void 0 : e.source) !== void 0 ? typeof f == "function" ? await f(s) : f : (e == null ? void 0 : e.dictName) !== void 0 ? await ((i = se.dictApi) == null ? void 0 : i.call(se, e.dictName)) : void 0;
    b === l && (a.value = p ?? []);
  };
  return e && n && Re(() => {
    o();
  }), { optionsRef: L(() => {
    var s, i, b;
    const f = a.value, p = ((s = e == null ? void 0 : e.fieldNames) == null ? void 0 : s.label) ?? "label", v = ((i = e == null ? void 0 : e.fieldNames) == null ? void 0 : i.value) ?? "value", h = ((b = e == null ? void 0 : e.fieldNames) == null ? void 0 : b.children) ?? "children", w = (S) => S.map((c, m) => {
      const u = Te(c), d = u ? c[p] : c, g = e != null && e.labelAsValue ? d : u ? c[v] : e != null && e.valueToNumber ? m : c;
      return {
        ...u ? c : {},
        label: d,
        value: e != null && e.valueToNumber && !e.labelAsValue ? Number(g) : g,
        ...u && Array.isArray(c[h]) && { children: w(c[h]) }
      };
    });
    return Array.isArray(f) ? w(f) : Object.entries(f ?? {}).map(([S, c]) => ({
      label: c,
      value: e != null && e.labelAsValue ? c : e != null && e.valueToNumber ? Number(S) : S
    }));
  }), load: o };
}
const sn = (e, t) => {
  const n = {};
  return e.vModelFields && Object.entries(e.vModelFields).forEach(([a, l]) => {
    n[a] = t[l];
  }), n;
}, It = ({ value: e, label: t = e, color: n, icon: a, tagViewer: l = !0 }) => {
  const o = { color: n, label: t, icon: a };
  if (l !== !0 || !n) {
    const r = l === !0 ? se.tagViewer : l;
    if (typeof r == "function") {
      const s = r(e);
      Te(s) ? Object.assign(o, s) : o.color = s;
    } else if (Array.isArray(r) && Te(r[0])) {
      const s = r.find((i) => i.value == e);
      Object.assign(o, s);
    }
    o.color ?? (o.color = n || r[e] || e === !0 && "success" || e === !1 && "error" || "default");
  }
  return z("tag")(
    { color: o.color },
    {
      default: () => o.label || e,
      icon: o.icon
    }
  );
};
function vt(e, t = {}) {
  const { type: n = "", viewRender: a, render: l, labelField: o, tagViewer: r, initialValue: s } = e, i = e.options, b = e.endField, f = be("rootSlots", {}), p = a || n === "InfoSlot" && l, v = typeof p == "string" ? f[p] : p;
  if (p && !v)
    return !1;
  let h = !1;
  const w = (() => {
    if (o)
      return ({ current: c } = t) => String(De(c, o) ?? "");
    if (b)
      return ({ current: c, text: m } = t) => (m || "") + " - " + (De(c, b) || "");
    if (i !== void 0) {
      h = !(r === !1 || !r && se.tagViewer === !1);
      const { optionsRef: c, load: m } = Ct(i, t, !1);
      let u = !1;
      return (d = t, g) => {
        u || (u = !0, m(d));
        const y = d.text ?? d.value ?? oe(s) ?? "";
        if (y === "")
          return "";
        const A = (Array.isArray(y) ? y : e.stringifyValue && typeof y == "string" ? y.split(",") : [y]).map((k) => {
          const _ = zt(c.value, k, e.stringifyValue), x = (_ == null ? void 0 : _.label) ?? k;
          return !g && h ? It({ ..._, value: k, label: x, tagViewer: r }) : x;
        });
        return !g && h ? A : A.join(",");
      };
    } else if (n === "Switch")
      return ({ text: c, value: m } = t) => {
        const u = c ?? m ?? oe(s);
        return u === !0 ? "是" : u === !1 ? "否" : u;
      };
  })(), S = !0;
  if (v)
    return (c = t) => {
      const m = sn(e, c.current), { attrs: u } = ke({ option: e, effectData: c }), d = { ...u };
      delete d.disabled;
      const g = N({
        props: { ...d, ...m },
        ...c,
        ...w && { text: L(() => w(c, S)) },
        isView: !0
      });
      return v(g);
    };
  if (r && !h)
    return (c = t) => {
      const m = c.text ?? oe(s);
      return typeof m == "boolean" && r === !0 ? It({
        label: m ? "是" : "否",
        color: m ? "success" : "error"
      }) : (Array.isArray(m) ? m : typeof m == "string" ? m.split(",") : [m]).map((g) => It({ value: g, tagViewer: r }));
    };
  if (n === "Text" && (e.attrs || e.dynamicAttrs))
    return (c = t) => {
      const m = (w == null ? void 0 : w(c)) || (c.value ?? oe(s)), u = jt(e.dynamicAttrs, c), d = ae({ ...e.attrs, title: m }, u);
      return C("span", d, m);
    };
  if (n === "HTML")
    return (c = t) => {
      const m = jt(e.dynamicAttrs, c), u = ae({ ...e.attrs, innerHTML: c.value }, m);
      return C("span", u);
    };
  if (n === "TextArea")
    return (c = t) => C("pre", { style: "white-space: break-spaces;" }, c.value ?? oe(s));
  if (!w && (n === "Upload" || St(n)))
    return (c = t) => {
      const m = sn(e, c.current), u = nt(e.slots, c, f), {
        attrs: { disabled: d, ...g }
      } = ke({ option: e, effectData: c });
      if (n === "Upload")
        return C(
          he.Upload,
          N({ option: e, effectData: c, ...g, ...m, value: c.value, isView: !0, disabled: d }),
          u
        );
      const y = St(n);
      return y && C(
        y.component,
        N(
          na(y, {
            ...g,
            ...m,
            value: c.value,
            disabled: d
          })
        ),
        u
      );
    };
  if (n === "Buttons") {
    const c = kt({ config: e, isView: !0 });
    return !!c && ((m = t) => c({ param: m }));
  } else
    return w;
}
const at = (e, t) => {
  const { title: n, label: a, labelSlot: l, tooltip: o } = e, r = o && (Te(o) ? o : { title: o }), s = n || l || a;
  return s === void 0 ? void 0 : () => [
    te(s, t),
    o && z("tooltip")(r, {
      title: () => te(o.title, t),
      default: () => C(
        "span",
        {
          class: "sup-label-tooltip"
        },
        o.icon ? o.icon() : ze("info")
      )
    })
  ];
}, yo = /* @__PURE__ */ new Set([
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
]), wo = {
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
}, So = /* @__PURE__ */ new Set(["Input", "InputNumber", "TextArea", "AutoComplete"]), Co = /* @__PURE__ */ new Set(["Select", "TreeSelect"]), ko = /* @__PURE__ */ new Set(["Select", "TreeSelect", "RadioGroup", "CheckboxGroup"]), xo = /* @__PURE__ */ new Set([
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
]), _o = /* @__PURE__ */ new Set(["table", "form", "description"]), Ao = /* @__PURE__ */ new Set([
  "attrs",
  "dynamicAttrs",
  "dataSource",
  "initialValue",
  "options",
  "params",
  "rules",
  "treeData",
  "value"
]), Ee = (e) => e !== null && typeof e == "object" && !Array.isArray(e), W = (e, t, n, a) => ({ level: e, code: t, path: n, message: a });
function Rt(e, t, n, a) {
  if (!(!e || typeof e != "object" || a.has(e))) {
    if (a.add(e), Ee(e))
      for (const [l, o] of Object.entries(wo))
        Object.prototype.hasOwnProperty.call(e, l) && n.push(W("warning", "deprecated-api", `${t}.${l}`, `已废弃，${o}。`));
    for (const [l, o] of Object.entries(e))
      typeof o == "function" || Ao.has(l) || (Array.isArray(o) ? o.forEach((r, s) => Rt(r, `${t}.${l}[${s}]`, n, a)) : Ee(o) && Rt(o, `${t}.${l}`, n, a));
  }
}
function Oo(e, t, n, a, l) {
  var o, r, s;
  if (!Ee(e)) {
    typeof e != "string" && n.push(W("error", "invalid-item", t, "字段配置必须是对象。"));
    return;
  }
  const { type: i } = e;
  if (i !== void 0 && (typeof i != "string" || !l.has(i)) && n.push(W("error", "unknown-type", `${t}.type`, `未知字段类型 ${JSON.stringify(i)}。`)), i === void 0 && a !== "table" && n.push(W("warning", "missing-type", `${t}.type`, "表单或详情字段建议明确配置 type。")), Array.isArray(e.exclude)) {
    const v = e.exclude.filter((h) => !_o.has(h));
    v.length && n.push(
      W(
        "error",
        "invalid-exclude",
        `${t}.exclude`,
        `只支持 table、form、description，当前包含：${v.join("、")}。`
      )
    );
  } else
    e.exclude !== void 0 && n.push(W("error", "invalid-exclude", `${t}.exclude`, "exclude 必须是字符串数组。"));
  e.visibleIn !== void 0 && !["form", "detail", "both"].includes(e.visibleIn) && n.push(
    W("error", "invalid-visible-in", `${t}.visibleIn`, "visibleIn 只支持 'form'、'detail'、'both'。")
  ), e.unauthorized !== void 0 && !["hide", "disable"].includes(e.unauthorized) && n.push(
    W("error", "invalid-unauthorized", `${t}.unauthorized`, "unauthorized 只支持 'hide'、'disable'。")
  ), ko.has(i) && !e.options && !e.dictName && n.push(W("warning", "missing-options", t, `${i} 未配置 options 或 dictName。`));
  const b = (o = e.attrs) == null ? void 0 : o.placeholder, f = So.has(i) ? `请输入${typeof e.label == "string" ? e.label : ""}` : Co.has(i) ? `请选择${typeof e.label == "string" ? e.label : ""}` : void 0;
  f !== void 0 && b === f && n.push(
    W("suggestion", "redundant-default", `${t}.attrs.placeholder`, "与内置 placeholder 相同，可以省略。")
  );
  const p = ["DatePicker", "DateRangePicker"].includes(i) ? "YYYY-MM-DD" : ["TimePicker", "TimeRangePicker"].includes(i) ? "HH:mm:ss" : void 0;
  p && ((r = e.attrs) == null ? void 0 : r.valueFormat) === p && n.push(
    W("suggestion", "redundant-default", `${t}.attrs.valueFormat`, "与内置 valueFormat 相同，可以省略。")
  ), i === "InputGroup" && ((s = e.attrs) == null ? void 0 : s.compact) === !0 && n.push(
    W("suggestion", "redundant-default", `${t}.attrs.compact`, "InputGroup 默认使用紧凑布局，可以省略。")
  ), e.block === !1 && !xo.has(i) && n.push(W("suggestion", "redundant-default", `${t}.block`, "block: false 是默认行为，可以省略。")), e.breakAfter === !1 && n.push(
    W("suggestion", "redundant-default", `${t}.breakAfter`, "breakAfter: false 是默认行为，可以省略。")
  ), (e.options || e.dictName) && e.tagViewer === !0 && n.push(
    W("suggestion", "redundant-default", `${t}.tagViewer`, "选项字段默认使用 Tag 展示，可以省略。")
  );
  for (const v of ["hidden", "disabled"])
    e[v] === !1 && n.push(W("suggestion", "redundant-default", `${t}.${v}`, `${v}: false 可以省略。`));
  Object.prototype.hasOwnProperty.call(e, "initialValue") && e.initialValue === void 0 && n.push(
    W("suggestion", "redundant-default", `${t}.initialValue`, "initialValue: undefined 可以省略。")
  );
  for (const v of ["attrs", "rowProps"])
    Ee(e[v]) && Object.keys(e[v]).length === 0 && n.push(W("suggestion", "empty-config", `${t}.${v}`, `空的 ${v} 配置可以省略。`));
  for (const v of ["rules", "options"])
    Array.isArray(e[v]) && e[v].length === 0 && n.push(W("suggestion", "empty-config", `${t}.${v}`, `空的 ${v} 配置可以省略。`));
  e.subItems && Ye(e.subItems, `${t}.subItems`, n, a === "table" ? "form" : a, l), e.columns && Ye(e.columns, `${t}.columns`, n, "table", l);
}
function Ye(e, t, n, a, l) {
  if (!Array.isArray(e)) {
    n.push(W("error", "invalid-items", t, "必须是数组。"));
    return;
  }
  const o = /* @__PURE__ */ new Map();
  e.forEach((r, s) => {
    const i = `${t}[${s}]`;
    Oo(r, i, n, a, l), !(!Ee(r) || typeof r.field != "string" || !r.field) && (o.has(r.field) ? n.push(
      W(
        "warning",
        "duplicate-field",
        `${i}.field`,
        `字段 ${r.field} 与 ${o.get(r.field)} 重复。`
      )
    ) : o.set(r.field, `${t}[${s}].field`));
  });
}
function Io(e, t = "auto", n = []) {
  var a, l, o, r, s, i, b;
  const f = [];
  if (!Ee(e))
    return [W("error", "invalid-schema", "schema", "schema 必须是对象。")];
  const p = /* @__PURE__ */ new Set([...yo, ...n]);
  Rt(e, "schema", f, /* @__PURE__ */ new WeakSet());
  const v = t === "auto" ? Array.isArray(e.columns) ? "table" : "form" : t;
  if (!["form", "table", "detail"].includes(v))
    return [W("error", "invalid-schema-type", "schema", `未知 schema 类型 ${JSON.stringify(t)}。`)];
  if (e.subSpan === 8 && f.push(W("suggestion", "redundant-default", "schema.subSpan", "subSpan: 8 是默认值，可以省略。")), e.gutter === 16 && f.push(W("suggestion", "redundant-default", "schema.gutter", "gutter: 16 是默认值，可以省略。")), Ee(e.params) && Object.keys(e.params).length === 0 && f.push(W("suggestion", "empty-config", "schema.params", "空的 params 配置可以省略。")), v === "table") {
    for (const h of ["editMode", "addMode"])
      Object.prototype.hasOwnProperty.call(e, h) && f.push(W("warning", "deprecated-api", `schema.${h}`, `已废弃，使用 rowEditor.${h}。`));
    Array.isArray(e.columns) ? Ye(e.columns, "schema.columns", f, "table", p) : f.push(W("error", "missing-columns", "schema.columns", "表格必须配置 columns。")), e.immediate === !0 && f.push(
      W("suggestion", "redundant-default", "schema.immediate", "immediate: true 是默认值，可以省略。")
    ), e.pagination === !1 && f.push(
      W("suggestion", "redundant-default", "schema.pagination", "pagination: false 是默认值，可以省略。")
    ), ((a = e.attrs) == null ? void 0 : a.rowKey) === "id" && f.push(
      W("suggestion", "redundant-default", "schema.attrs.rowKey", "rowKey: 'id' 是默认值，可以省略。")
    ), ((l = e.attrs) == null ? void 0 : l.size) === "small" && f.push(
      W("suggestion", "redundant-default", "schema.attrs.size", "size: 'small' 是默认值，可以省略。")
    ), ((o = e.attrs) == null ? void 0 : o.tableLayout) === "fixed" && f.push(
      W(
        "suggestion",
        "redundant-default",
        "schema.attrs.tableLayout",
        "tableLayout: 'fixed' 是默认值，可以省略。"
      )
    ), Ee(e.pagination) && e.pagination.current === 1 && f.push(
      W("suggestion", "redundant-default", "schema.pagination.current", "分页 current 默认是 1，可以省略。")
    ), Ee(e.pagination) && e.pagination.pageSize === 10 && f.push(
      W("suggestion", "redundant-default", "schema.pagination.pageSize", "分页 pageSize 默认是 10，可以省略。")
    ), (r = e.searchForm) != null && r.subItems && Ye(e.searchForm.subItems, "schema.searchForm.subItems", f, "form", p), (i = (s = e.rowEditor) == null ? void 0 : s.form) != null && i.subItems && Ye(e.rowEditor.form.subItems, "schema.rowEditor.form.subItems", f, "form", p);
  } else
    Array.isArray(e.subItems) ? (((b = e.attrs) == null ? void 0 : b.labelAlign) === "right" && f.push(
      W("suggestion", "redundant-default", "schema.attrs.labelAlign", "labelAlign: 'right' 是默认值，可以省略。")
    ), Ye(e.subItems, "schema.subItems", f, v, p)) : f.push(W("error", "missing-sub-items", "schema.subItems", "表单或详情必须配置 subItems。"));
  return f;
}
function Do(e, t = "auto") {
  return Io(e, t, xl());
}
function ft(e, t, n) {
  var a, l;
  const o = Do(e, t);
  return o.length && ((a = console.groupCollapsed) == null || a.call(console, `[superform] ${n} schema 诊断：${o.length} 项`), o.forEach(({ level: r, path: s, message: i }) => {
    const b = `[superform] ${s}: ${i}`;
    r === "error" ? console.error(b) : r === "warning" ? console.warn(b) : console.info(b);
  }), (l = console.groupEnd) == null || l.call(console)), o;
}
function ie(e, t = !1) {
  return () => C("svg", {
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
    C("g", [
      ...e.map((n) => C("path", { d: n })),
      ...t ? [C("animateTransform", {
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
const ue = {
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
}, un = { confirm: "确定", cancel: "取消" }, Mo = {
  add: { label: "新增", icon: ue.add },
  delete: {
    label: "删除",
    icon: ue.delete,
    confirmText: "确定要删除吗？",
    disabled: (e) => {
      var t;
      return !e.record && !(((t = e.selectedRows) == null ? void 0 : t.length) > 0);
    }
  },
  edit: { label: "修改", icon: ue.edit, disabled: (e) => {
    var t;
    return !e.record && ((t = e.selectedRows) == null ? void 0 : t.length) !== 1;
  } },
  detail: { label: "查看", icon: ue.detail, disabled: (e) => {
    var t;
    return !e.record && ((t = e.selectedRows) == null ? void 0 : t.length) !== 1;
  } },
  submit: { label: "提交", icon: ue.submit },
  search: { label: "查询", icon: ue.search },
  reset: { label: "重置", icon: ue.reset },
  save: { label: "保存" },
  cancel: { label: "取消" },
  expand: {
    label: (e) => e.expanded ? "收起" : "展开",
    icon: (e) => oe(e == null ? void 0 : e.expanded) ? ue.collapse() : ue.expand()
  }
}, Eo = () => {
  const e = pt(
    {},
    Mo,
    Z.ButtonActions,
    se.defaultButtons
  );
  return Object.entries(se.defaultButtons || {}).forEach(([t, n]) => {
    Object.prototype.hasOwnProperty.call(n, "icon") && (e[t].icon = n.icon);
  }), e;
};
function Po(e) {
  const t = Eo();
  return Object.keys(e).forEach((n) => {
    if (t[n])
      if (typeof e[n] == "function")
        t[n].onClick = e[n];
      else {
        const { icon: a, ...l } = e[n];
        pt(t[n], l), Object.prototype.hasOwnProperty.call(e[n], "icon") && (t[n].icon = a);
      }
    else
      t[n] = typeof e[n] == "function" ? { onClick: e[n] } : e[n];
  }), t;
}
function jo(e, t = {}, n = {}) {
  const a = Po(t), l = [];
  return Array.isArray(e) && e.forEach((o) => {
    const r = typeof o == "string" ? o : o.name, { onClick: s, ...i } = a[r] || {};
    i.attrs = Ne({ ...n }, i.attrs), typeof o == "object" && Object.assign(i, o, { attrs: { ...i.attrs, ...o.attrs } }), i.name = r;
    const b = $(!1), f = $(!1), p = i.attrs.loading, v = Ue(p);
    !v && p && (i.attrs.loading = f);
    const h = (m) => {
      v || (f.value = m ? p : !1);
    }, w = { label: i.label, ...typeof o == "object" ? o.meta : {} }, S = typeof o == "object" ? o.onClick : void 0, c = (m, u, d) => {
      if (b.value)
        return Promise.resolve();
      b.value = !0;
      const g = async () => {
        h(!0);
        try {
          return await u();
        } finally {
          h(!1);
        }
      };
      return m ? new Promise((y, I) => {
        let A = !1;
        const k = (_) => {
          A || (A = !0, b.value = !1, y(_));
        };
        try {
          fe("services").confirm({
            title: () => te(m, d),
            okText: un.confirm,
            cancelText: un.cancel,
            ...Z.Modal,
            onCancel: async (..._) => {
              var x, O;
              const E = await ((O = (x = Z.Modal) == null ? void 0 : x.onCancel) == null ? void 0 : O.call(x, ..._));
              return k(!1), E;
            },
            afterClose: (..._) => {
              var x, O;
              return k(!1), (O = (x = Z.Modal) == null ? void 0 : x.afterClose) == null ? void 0 : O.call(x, ..._);
            },
            onOk: async () => {
              try {
                const _ = await g();
                return k(_), _;
              } catch (_) {
                throw I(_), _;
              }
            }
          });
        } catch (_) {
          b.value = !1, I(_);
        }
      }) : g().finally(() => {
        b.value = !1;
      });
    };
    i.onClick = (m) => {
      const u = { ...m, meta: w };
      return S && s ? c(
        i.confirmText,
        () => S(u, async (d) => s({ ...u, ...d })),
        m
      ) : c(i.confirmText, () => {
        var d;
        return (d = s || S) == null ? void 0 : d(u);
      }, m);
    }, l.push({ ...i, pending: b });
  }), l;
}
function Yn(e, t, n, a = {}, l = () => !0) {
  var o, r;
  const { buttonProps: s, limit: i, hidden: b, disabled: f, actions: p } = e, v = e.labelMode === "icon", h = e.labelMode === "label", w = { ...(o = Z.Buttons) == null ? void 0 : o.buttonProps, ...s }, S = (y) => L(() => !!(typeof y == "function" ? y(t) : oe(y))), c = S(b), m = S(f), u = (y) => y.unauthorized ?? (y.invalidDisabled || y.roleMode === "disable" ? "disable" : y.roleMode && "hide"), d = (r = se.buttonRoles) == null ? void 0 : r.call(se), g = jo(p, n || e.methods, w).flatMap((y, I) => {
    const A = d && y.roleName && !d.includes(y.roleName), k = u(y) ?? u(e) ?? "hide";
    if (A && k === "hide")
      return [];
    const _ = S(y.hidden), x = y.disabled === void 0 ? m : S(y.disabled), O = y.attrs || {}, E = S(O.disabled), P = L(() => !!A || m.value || x.value || E.value), U = typeof y.customRender == "string" ? a[y.customRender] : y.customRender, B = y.dropdown && L(() => {
      const q = typeof y.dropdown == "function" ? y.dropdown(t) : oe(y.dropdown);
      return q ? Array.isArray(q) ? ba(q).map(
        (H) => typeof H == "object" && H !== null ? H : { value: H, label: String(H) }
      ) : Object.entries(q).map(([H, ne]) => ({ value: H, label: ne })) : [];
    }), j = {
      get visible() {
        return l() && !c.value && !_.value;
      },
      get disabled() {
        return P.value;
      },
      get loading() {
        return y.pending.value || !!oe(O.loading);
      },
      async execute(q, R) {
        var H;
        if (!(!j.visible || j.disabled || j.loading))
          return (H = y.onClick) == null ? void 0 : H.call(y, { ...t, ...R, e: q });
      }
    }, G = L(() => {
      const q = P.value && y.disabledTooltip ? y.disabledTooltip : y.tooltip || (v && y.icon ? y.label : void 0);
      return te(q, t);
    }), Y = {
      key: I,
      name: y.name,
      label: () => te(y.label, t),
      icon: y.icon ? () => {
        var q;
        return (q = y.icon) == null ? void 0 : q.call(y, t);
      } : void 0,
      tooltip: () => G.value,
      get disabled() {
        return j.disabled || y.pending.value;
      },
      get attrs() {
        return Object.fromEntries(Object.entries(O).map(([q, R]) => [q, X(R)]));
      },
      get menu() {
        return B ? B.value.map((q, R) => ({
          key: R,
          value: q.value,
          label: () => te(q.label, t),
          icon: q.icon ? () => {
            var H;
            return (H = q.icon) == null ? void 0 : H.call(q, t);
          } : void 0,
          disabled: !!(typeof q.disabled == "function" ? q.disabled(t) : oe(q.disabled))
        })) : void 0;
      },
      dropdownProps: y.dropdownProps,
      render: U ? (q) => U({ ...t, props: q }) : void 0,
      onClick: (q) => j.execute(q),
      onSelect: (q, R) => {
        var H;
        const ne = (H = Y.menu) == null ? void 0 : H.find((pe) => Object.is(pe.value, q));
        if (!(!ne || ne.disabled))
          return j.execute(R, { value: q });
      }
    };
    return [{ action: j, uiItem: Y }];
  });
  return {
    render() {
      const y = g.filter((k) => k.action.visible).map((k) => k.uiItem);
      if (!y.length)
        return null;
      const I = i == null || !Number.isFinite(i) ? y.length : Math.max(0, Math.floor(i)), A = v && y.length === I + 1 ? I + 1 : I;
      return z("actionGroup")({
        groupProps: e.attrs,
        buttons: y.slice(0, A),
        moreButtons: y.slice(A),
        defaultButtonProps: w,
        divider: e.divider,
        labelOnly: h,
        iconOnly: v,
        moreLabel: () => e.moreLabel === void 0 ? ue.more() : te(e.moreLabel, t)
      });
    }
  };
}
const Me = /* @__PURE__ */ Q({
  __name: "ButtonGroup",
  props: {
    option: {},
    methods: {},
    effectData: {}
  },
  setup(e) {
    const t = e, n = Array.isArray(t.option) ? { actions: t.option } : t.option, a = Yn(n, N(t.effectData || {}), t.methods, be("rootSlots", {}));
    return (l, o) => (Oe(), Qe(ot(() => X(a).render())));
  }
});
function kt({ config: e, methods: t, effectData: n, isView: a }) {
  const l = Array.isArray(e) ? { actions: e } : e, o = (l == null ? void 0 : l.visibleIn) ?? (l == null ? void 0 : l.validOn);
  if (!l || a && o === "form" || !a && o === "detail")
    return;
  let r = l.actions || [];
  if (o || (r = r.filter((s) => {
    if (typeof s == "string")
      return !a;
    {
      const i = s.visibleIn ?? s.validOn;
      return a ? i !== "form" : i !== "detail";
    }
  })), r.length !== 0)
    return (s = {}) => C(Me, { option: { ...l, actions: r }, methods: t, effectData: n, ...s });
}
function cn({ option: e, effectData: t, attrs: n }) {
  const a = e.options !== void 0;
  if (!a && !e.labelField)
    return;
  const l = n ?? e.attrs ?? {}, o = a ? Ct(e.options, t).optionsRef : L(() => X(l.options) ?? []);
  return {
    state: a ? L(() => ({ options: o.value })) : void 0,
    bindModel(r) {
      const s = r["onUpdate:labelValue"];
      s && K([() => X(r.value), o, () => a ? void 0 : X(l.fieldNames)], ([i, b, f]) => {
        const p = (v) => {
          var h;
          return (h = zt(b, v, e.stringifyValue, f)) == null ? void 0 : h[(f == null ? void 0 : f.label) ?? "label"];
        };
        s(Array.isArray(i) ? i.map(p) : p(i));
      }, { immediate: !0, deep: !0 });
    }
  };
}
const dn = {
  options: cn,
  picker: ({ option: e }) => ({
    state: L(() => ({ placeholder: `请选择${e.label ?? ""}` }))
  }),
  range: ({ option: e }) => ({
    state: L(() => ({
      placeholder: [`请选择开始${e.label ?? ""}`, `请选择结束${e.label ?? ""}`]
    }))
  }),
  tree: ({ option: e, effectData: t }) => {
    const n = e.treeData;
    if (n === void 0)
      return;
    const a = $([]);
    return Re(() => {
      const l = typeof n == "function" ? n(t) : X(n);
      Promise.resolve(l).then((o) => {
        a.value = o ?? [];
      });
    }), { state: L(() => ({ treeData: a.value })) };
  },
  switch: (e) => {
    const t = cn(e);
    return t != null && t.state ? {
      bindModel: t.bindModel,
      state: L(() => {
        const [n = { value: !1 }, a = { value: !0 }] = t.state.value.options;
        return { switch: {
          unchecked: { value: n.value, label: n.label },
          checked: { value: a.value, label: a.label }
        } };
      })
    } : t;
  }
};
function Ro(e, t) {
  const n = e.map((a) => {
    var l;
    return (l = dn[a]) == null ? void 0 : l.call(dn, t);
  }).filter(Boolean);
  return {
    bindModel: (a) => n.forEach((l) => {
      var o;
      return (o = l.bindModel) == null ? void 0 : o.call(l, a);
    }),
    state: L(() => Object.assign({}, ...n.map((a) => {
      var l;
      return (l = a.state) == null ? void 0 : l.value;
    })))
  };
}
const To = Q({
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
    const n = Ro(e.field.processors || [], {
      option: e.option,
      attrs: N(e.inputAttrs),
      effectData: e.effectData,
      model: e.model
    }), a = qt({
      option: e.option,
      model: e.model,
      effectData: e.effectData
    });
    return n.bindModel(a), () => {
      const l = e.field, o = {
        type: l.type,
        option: e.option,
        model: e.model,
        effectData: e.effectData,
        binding: N(a),
        state: { ...e.state, ...n.state.value }
      }, r = N(l.getAttrs(e.inputAttrs, e.option, o.state));
      return l.render({ ...o, attrs: r, slots: t.slots });
    };
  }
}), Kt = Q({
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
    return $e(e.name, e.data || {}), t.slots.default;
  }
});
function Fo(e, t) {
  const n = be("inheritOptions", {}), a = e.option.subSpan ?? n.subSpan, l = L(() => e.model.index), o = [], r = [...e.model.children];
  for (let s = 0; s < r.length; s++) {
    const [i, b] = r[s], { type: f, align: p, span: v, hideInForm: h, exclude: w, editable: S } = i, c = i.block ?? i.blocked, m = i.breakAfter ?? i.wrapping, { parent: u, refData: d } = ee(b), g = xe({
      parent: e.effectData,
      current: u,
      field: b.refName,
      value: d,
      ...l.value !== void 0 && {
        index: l,
        record: b.refName ? u : d
      }
    });
    if (f === "Hidden" || (w ? w.includes("form") : h)) {
      qt({ option: i, model: b, effectData: g });
      continue;
    }
    const { hidden: y, required: I, attrs: A, nativeAttrs: k, disabled: _ } = ke({
      option: i,
      effectData: g,
      inheritDisabled: n.disabled
    });
    if (f === "Fragment") {
      b.children && r.splice(
        s + 1,
        0,
        ...[...b.children].map(([j, G]) => [{ ...j, hidden: y, disabled: A.disabled }, G])
      );
      continue;
    }
    let x = t(i, b, g, A, { attrs: k, disabled: _ });
    if (!x)
      continue;
    if ((Ot(f) || Bt(f)) && S !== void 0 && S !== !0) {
      const j = x, G = L(() => tt(S) ? S(g) : S), Y = vt(i, N({ ...Ve(g), isView: !0 }));
      x = () => G.value ? j() : Y ? Y() : d.value;
    }
    const O = { ...i.colProps, ...v !== void 0 && { span: v } };
    Ne(O, { span: a }, Z.Col, { span: 8 }), (O.span === 0 || O.flex) && (O.span = void 0);
    let E = x;
    const P = [...et, "InputList", "InputGroup"].includes(f);
    if (e.fieldWrapper !== "none" && !P && (!c || i.field && i.label)) {
      const j = ct(b.rules, g), G = L(
        () => {
          var R;
          return X(A.disabled) || (R = !i.required || I.value ? j : j.slice(1)) == null ? void 0 : R.map(
            (H) => n.ignoreRules ? { ...H, trigger: "none", validateTrigger: !1 } : H
          );
        }
      ), Y = ae(Z.FormItem, i.formItemProps), q = at(i, g);
      E = () => z("formItem")(
        N({
          ...Y,
          name: b.propChain,
          rules: G,
          colon: !!q
        }),
        {
          default: x,
          label: q
        }
      );
    }
    if (P && e.fieldWrapper !== "none") {
      const j = {
        required: I,
        disabled: A.disabled,
        subSpan: i.subSpan ?? a,
        ignoreRules: n.ignoreRules
      };
      E = () => C(Kt, { name: "inheritOptions", data: j }, x);
    }
    const U = c ?? (et.includes(f) && !i.span), B = !U && f === "InputList" ? { ...O, span: v ?? 24 } : O;
    o.push({
      key: s,
      hidden: y,
      content: E,
      layout: {
        block: U,
        breakAfter: m,
        align: p,
        colProps: B,
        compactProps: O,
        detail: f === "Descriptions"
      }
    });
  }
  return o;
}
function $o(e, t) {
  const n = [];
  let a;
  for (const o of e)
    o.layout.block ? (n.push(o), a = void 0) : (a || n.push(a = []), a.push(o), o.layout.breakAfter && (a = void 0));
  const l = () => {
    if (t.layout === "compact")
      return e.map((s) => {
        if (s.hidden.value)
          return !1;
        const { span: i, flex: b, style: f } = s.layout.compactProps, p = Number(i) ? (Number(i) / 24 * 100).toFixed(2) + "%" : void 0;
        return C(s.content, {
          key: s.key,
          style: ae({
            width: p,
            flex: b ?? (i === "auto" ? "1 1 0" : void 0),
            minWidth: 0
          }, f)
        });
      });
    const { gutter: o = 16 } = t.option, r = { gutter: o, ...t.option.rowProps };
    return n.map((s) => Array.isArray(s) ? z("row")(
      { ...r, key: s[0].key },
      {
        default: () => s.map(
          (i) => !i.hidden.value && z("col")(
            ae(
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
    ) : !s.hidden.value && C(
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
    renderNodes: l,
    render: () => t.layout === "grid" ? l() : z(t.layout === "compact" ? "compactSpace" : "space")(
      ae(t.layout === "compact" ? { block: !0 } : {}, t.layoutAttrs || {}),
      // 紧凑容器必须直接接收各字段，不能额外套一个组件层阻断首尾上下文。
      { default: () => l().filter(Boolean) }
    )
  };
}
const Pe = Q({
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
    const n = Fo(e, xt), a = $o(n, e);
    return () => t.default ? t.default({ nodes: a.renderNodes().filter(Boolean) }) : e.option.isContainer && a.hasWrap ? C(
      he.Group,
      {
        class: "sup-form-section",
        option: e.option,
        model: e.model,
        effectData: e.effectData
      },
      { innerContent: a.render }
    ) : a.render();
  }
});
function xt(e, t, n, a, l) {
  const { type: o, render: r } = e;
  if (!o)
    return;
  const s = be("rootSlots", {}), i = nt(e.slots, n), b = r ? void 0 : qn(o), f = b == null ? void 0 : b.processors, p = (l == null ? void 0 : l.attrs) ?? a, v = N({ disabled: l == null ? void 0 : l.disabled }), h = b ? void 0 : St(o), w = r ? typeof r == "function" ? r : s[r] : (h == null ? void 0 : h.component) || he[o] || (b == null ? void 0 : b.component) || (b == null ? void 0 : b.render);
  let S;
  if (o === "InfoSlot")
    S = w && (() => w({ props: a, ...n }));
  else if (o === "Text")
    S = () => C("span", a, t.refData);
  else if (o === "HTML")
    S = () => C("span", { ...a, innerHTML: t.refData });
  else if (o === "Buttons")
    S = () => C(Me, { option: e, effectData: n, ...a });
  else if (et.includes(o) || o === "InputList")
    S = () => C(he[o], N({ option: e, model: t, effectData: n, ...a }), i);
  else if (!w)
    console.error(`组件 '${o}' 配置错误，请检查名称或'render'是否正确！`);
  else if (b && (f != null && f.length))
    S = () => C(To, { inputAttrs: p, state: v, field: b, option: e, model: t, effectData: n }, i);
  else {
    const c = qt({ option: e, model: t, effectData: n }), m = { ...a, ...c };
    o === "InputSlot" ? S = () => w == null ? void 0 : w(N({ props: m, ...n })) : b ? S = () => {
      const u = { type: o, option: e, model: t, effectData: n, binding: N(c), state: v }, d = N(b.getAttrs(p, e, u.state));
      return b.render({ ...u, attrs: d, slots: i });
    } : (h == null ? void 0 : h.source) === "custom" || (h == null ? void 0 : h.source) === "auto" ? S = () => C(w, N(na(h, m)), i) : S = () => C(w, N({ option: e, model: t, effectData: n, ...m }), i);
  }
  return S;
}
const Vo = Q({
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
    const n = le(e, "source"), { modelsMap: a } = Ke(e.modelsMap, n);
    return $e("exaProvider", { data: le(e, "source") }), () => {
      var l;
      return C(
        "div",
        { class: ["sup-form-section sup-detail", ((l = t.attrs) == null ? void 0 : l.isContainer) && "sup-container"] },
        C(he.Descriptions, {
          option: e.option,
          model: { children: a },
          effectData: N({ current: n }),
          isView: !0
        })
      );
    };
  }
}), Le = Q({
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
  setup({ option: e, modelsMap: t, isRoot: n, effectData: a }, l) {
    var o;
    const r = be("exaProvider", {}).attrs, s = be("gridConfig", r), i = {
      ...Z.Descriptions,
      ...s
    }, b = Ne({ gutter: e.gutter }, e.rowProps || i.rowProps, Z.row, {
      gutter: 16
    }), f = {
      subSpan: e.subSpan,
      ...e.descriptionsProps,
      ...l.attrs
    }, p = Ne(
      {
        subSpan: e.subSpan ?? i.subSpan,
        rowProps: b,
        ...f
      },
      i
    ), v = p.subSpan ?? (p.subSpan = ((o = Z.Col) == null ? void 0 : o.span) ?? 12), h = Tt(t, e, a), w = [];
    let S, c;
    h.forEach((u, d) => {
      u.node ?? (u.node = () => z("descriptions")(No(u.group, p))), u.isBlock ? (u.group || u.option.type === "InputList" ? (c || (c = [], w.push(["section", c])), c.push(u)) : (w.push(["block", u]), c = void 0), S = void 0) : (!S && w.push(["row", S = []]), S.push(u), c = void 0);
    });
    const m = () => C(
      Kt,
      { name: "gridConfig", data: p },
      () => w.map(([u, d], g) => {
        let y = d.node;
        return u === "row" ? y = () => z("row")(b, {
          default: () => d.map((I, A) => {
            const k = I.option.colProps || {
              span: I.option.span ?? v
            };
            return !X(I.hidden) && z("col")({ ...Z.Col, ...k, key: A }, { default: I.node });
          })
        }) : u === "section" && (y = () => d.map((I) => !X(I.hidden) && I.node())), !X(d.hidden) && (w.length > 1 ? C("div", { class: "sup-form-section", key: g }, y()) : y());
      })
    );
    return n ? () => C(
      he.Group,
      ae(
        { class: "sup-form-section" },
        {
          option: e,
          model: {},
          effectData: xe({}),
          isView: !0,
          ...f
        }
      ),
      { innerContent: m }
    ) : m;
  }
});
function No(e, t) {
  const {
    subSpan: n,
    column: a,
    layout: l,
    bordered: o,
    mode: r = o ? "table" : "default",
    rowProps: s,
    colon: i,
    size: b = "middle",
    tableLayout: f,
    labelCol: p,
    wrapperCol: v,
    ...h
  } = t, w = Math.max(1, Math.floor(Number(a) || (Number(n) ? 24 / Number(n) : 2))), S = [];
  let c = [], m = 0;
  const u = () => {
    c.length && (m < w && (c[c.length - 1].colspan += w - m), S.push(c), c = [], m = 0);
  };
  return e.forEach(({ option: d, label: g, content: y, hidden: I }, A) => {
    if (X(I))
      return;
    const k = { ...h, ...d.formItemProps, ...d.descriptionsProps }, _ = Number(k.span ?? d.span);
    let x = _ ? Math.ceil(_ / (24 / w)) : 1;
    x = Math.max(1, Math.min(w, x));
    const O = {
      ...k.labelAlign && { textAlign: k.labelAlign },
      ...k.labelStyle
    }, E = { span: k.span ?? d.span, ...k.colProps || d.colProps };
    E.span === 0 || E.flex ? E.span = void 0 : Number(E.span) || (E.span = 24 / w);
    const P = {
      key: A,
      attrs: k,
      colProps: E,
      labelCol: ae(p, k.labelCol, {
        style: O,
        class: { "sup-label-no-colon": k.noColon }
      }),
      wrapperCol: ae(
        v,
        { style: l === "vertical" && { textAlign: k.labelAlign } },
        { style: k.contentStyle },
        k.wrapperCol
      ),
      label: g,
      content: y,
      colspan: x
    };
    m + x > w && u(), c.push(P), m += x, (d.breakAfter ?? d.wrapping) && u();
  }), u(), { attrs: h, mode: r, layout: l, rowProps: s, colon: i, size: b, tableLayout: f, column: w, rows: S };
}
function Tt(e, t, n) {
  const a = [];
  let l;
  const o = be("rootSlots", {});
  return [...e].forEach(([r, s], i) => {
    var b, f, p;
    const { type: v = "", field: h, hideInDescription: w, viewRender: S, exclude: c } = r;
    if (v === "Hidden" || w || c != null && c.includes("description"))
      return;
    const { parent: m, refData: u } = Ve(N(s)), d = xe({
      parent: n,
      current: m,
      isView: !0,
      field: s.refName,
      value: u,
      text: u,
      ..."index" in s && {
        index: s.index,
        record: h ? u : m
      }
    }), { attrs: g, hidden: y } = ke({ option: r, effectData: d }), I = nt(r.slots, d), A = at(r, d);
    let k = r.block ?? r.blocked, _;
    const x = [], O = typeof S == "string" ? o[S] : S;
    _ = O && (() => te(O, d));
    const E = s.children || ((b = s.listData) == null ? void 0 : b.modelsMap);
    if (v === "InputGroup") {
      if (!S) {
        let P = r.breakAfter ?? r.wrapping;
        const B = (f = Tt(E, r, d)[0].group) == null ? void 0 : f.map(({ option: j, content: G }) => {
          const Y = j.labelSlot || j.label, q = (g == null ? void 0 : g.compact) === !1 && Y;
          return P = (j.breakAfter ?? j.wrapping) || P, () => C("span", [q && te(Y, d), q && ": ", G == null ? void 0 : G()]);
        });
        _ = () => z("space")(
          { direction: P ? "vertical" : "horizontal" },
          {
            default: () => B == null ? void 0 : B.map((j) => j())
          }
        );
      }
      x.push({ option: r, label: A, hidden: y, content: _ });
    } else if (v === "Fragment") {
      const P = Tt(E, r, d), U = P[0].group;
      U && (P.shift(), x.push(...U.map((B) => ({ ...B, hidden: y })))), P.length && (l = void 0, a.push(...P));
    } else if (s.children || s.listData || et.includes(v)) {
      k ?? (k = !r.span);
      const P = [...et, "InputList"].includes(v) ? v : "Group", U = he[P], B = () => C(
        U,
        N({
          option: r,
          model: s,
          effectData: d,
          isView: !0,
          ...Z[P],
          ...g
        }),
        I
      );
      _ ?? (_ = B), v === "InputList" && (!k || A && !(g != null && g.labelIndex) ? x.push({
        option: { ...r },
        label: A,
        hidden: y,
        content: _
      }) : _ = B);
    } else {
      const P = Lo(r, s, d);
      P && x.push({ option: r, label: A, hidden: y, content: P });
    }
    if (!(!x.length && !_))
      if (x.length && !k)
        l || (l = [], a.push({ option: t, isBlock: !0, group: l })), l.push(...x);
      else {
        if (x.length && A)
          a.push({ option: t, isBlock: k, group: x });
        else {
          const P = r.align && { textAlign: r.align };
          _ = ((p = x[0]) == null ? void 0 : p.content) || _, a.push({
            option: r,
            isBlock: k,
            node: () => C(_, { style: P }),
            hidden: y
          });
        }
        l = void 0;
      }
  }), a;
}
function Lo(e, t, n) {
  const { parent: a, refData: l } = Ve(N(t)), o = t.refName ? l : void 0, r = ee(a.value) === ee(n.current) ? n : xe({
    parent: n,
    current: a,
    text: o,
    value: o,
    field: t.refName,
    isView: !0
  }), s = vt(e, r);
  return s === !1 ? void 0 : () => s ? s() : String(t.refData ?? "");
}
const Dt = Q({
  inheritAttrs: !1,
  props: {
    option: { type: Object, required: !0 },
    model: { type: Object, required: !0 },
    effectData: Object,
    isView: Boolean
  },
  setup({ option: e, model: t, effectData: n, isView: a }, l) {
    const { type: o, label: r, title: s = r, buttons: i, contentAttrs: b } = e, f = o === "Descriptions" || a;
    let p;
    if (i) {
      const v = Array.isArray(i) ? { actions: i } : i;
      o === "Descriptions" && (v.visibleIn ?? (v.visibleIn = v.validOn ?? "detail")), p = kt({
        config: v,
        effectData: n,
        isView: f
      });
    }
    return () => {
      const { style: v, class: h, ...w } = l.attrs, S = l.slots.title || (s ? at(e, n) : void 0), c = l.slots.extra || l.slots.actions || p, m = (i == null ? void 0 : i.placement) === "bottom" ? "bottom" : "title";
      return z("group")({
        attrs: { class: h, style: v },
        contentAttrs: b,
        component: e.component && ee(e.component),
        slots: l.slots,
        title: S,
        extra: c,
        extraPlacement: m,
        extraAlign: (i == null ? void 0 : i.align) || (m === "bottom" ? "center" : S ? "right" : void 0),
        content: () => l.slots.innerContent ? l.slots.innerContent(w) : l.slots.default ? l.slots.default() : f ? C(Le, {
          option: { descriptionsProps: w, ...e },
          modelsMap: t.children,
          effectData: n
        }) : C(Pe, { option: e, model: t, effectData: n })
      });
    };
  }
}), Qn = {
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
    var l;
    const o = Ie(), r = $({}), {
      option: { onSubmit: s, onReset: i, buttons: b, ...f },
      ignoreRules: p,
      compact: v
    } = e, h = N({ formData: r, current: r }), { attrs: w } = ke({ option: f, effectData: h }), S = /* @__PURE__ */ new Set(), c = (x) => {
      if (x)
        return S.add(x), () => S.delete(x);
    }, m = async (x) => {
      if (!o.value || p || !x.length)
        return;
      const O = fe("form");
      if (!O.validateField)
        throw new Error("当前 UIAdapter 未实现 form.validateField");
      await O.validateField(o.value, x);
    }, u = () => {
      o.value && fe("form").clearValidate(o.value);
    };
    $e("exaProvider", {
      data: Cn(r),
      attrs: w,
      onSubmit: c,
      validateField: m
    }), $e("inheritOptions", {
      disabled: w.disabled,
      subSpan: f.subSpan,
      ignoreRules: p
    });
    const d = (x) => Promise.all(
      [...S, s].map(async (O) => {
        const E = await (O == null ? void 0 : O(x));
        return E === !1 || E && E.errMessage ? Promise.reject({ message: E && E.errMessage }) : E;
      })
    );
    p && Object.assign(w, { hideRequiredMark: !0, validateTrigger: !1 });
    const g = {
      dataSource: r,
      getNativeInstance: () => o.value,
      async validate() {
        if (!o.value)
          throw new Error("表单尚未挂载或已卸载");
        await fe("form").validate(o.value);
      },
      validateField: m,
      clearValidate: u,
      async submit() {
        await g.validate();
        try {
          await d(r.value);
        } catch (O) {
          throw O && typeof O == "object" && "message" in O && O.message && fe("services").message("error", O.message), O;
        }
        const x = Fe(r.value);
        return n("submit", x), x;
      },
      setFieldsValue(x) {
        return u(), Gn(r.value, x, A);
      },
      resetFields(x = {}) {
        Hn(r.value, x, A), u();
        const O = Fe(r.value);
        return i == null || i(O), n("reset", O), O;
      }
    }, y = Array.isArray(b) ? { actions: b } : b;
    (l = y == null ? void 0 : y.actions) != null && l.length && (f.subItems = [
      ...f.subItems,
      {
        type: "InfoSlot",
        align: y.align || "center",
        block: !0,
        render: () => C(Me, {
          option: y,
          methods: {
            submit: g.submit,
            reset: g.resetFields,
            search: g.submit
          },
          effectData: h
        }),
        ...y.placement === "inline" && {
          span: "auto",
          block: !1,
          align: y.align || "right"
        }
      }
    ]);
    const { modelsMap: I } = Je(f.subItems, r), A = Fe(r.value);
    K(
      () => X(e.dataSource ?? e.option.dataSource),
      (x) => {
        x && (u(), r.value = x);
      },
      { immediate: !0, flush: "sync" }
    );
    const k = N({ ...g }), _ = (x) => {
      if (o.value = x, !x) {
        n("register", null);
        return;
      }
      n("register", k);
    };
    return Nt(() => {
      S.clear(), o.value = void 0;
    }), t(k), () => z("form")(
      {
        ref: _,
        class: ["sup-form", v && "sup-form-compact", p && "sup-form-simple"],
        model: r.value,
        labelAlign: "right",
        ...w
      },
      {
        ...a,
        default: () => C(Pe, {
          option: f,
          model: { refData: r, children: I },
          effectData: h
        })
      }
    );
  }
}, Bo = Q({
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
    const { option: a, model: l, compact: o } = e, { slots: r } = a;
    let s = l, i = ct(l.rules, e.effectData), b = le(l, "propChain");
    const f = {}, p = {
      type: "object",
      required: !1,
      fields: {}
    }, v = l.refName !== void 0 || l.index !== void 0;
    if (l.children && o) {
      for (const u of l.children.values())
        if ((n = u.rules) != null && n.length && u.fieldName) {
          u.rules[0].required && (p.required = !0);
          const d = N({
            ...e.effectData,
            parent: e.effectData,
            current: le(u, "parent"),
            field: u.fieldName,
            value: le(u, "refData")
          }), g = p.fields[u.fieldName] = ct(u.rules, d);
          if (!v) {
            b = le(u, "propChain"), i = g, s = u;
            break;
          }
        }
    } else
      f.style = "margin: 0";
    v && (i = (i || []).concat([p])), i || (i = []), f.required = i.some((u) => u.required);
    const h = be("inheritOptions", {}), w = L(
      () => e.disabled ? void 0 : (!a.required || X(h.required) ? i : i.slice(1)).map(
        (u) => h.ignoreRules ? { ...u, trigger: "none", validateTrigger: !1 } : u
      )
    ), S = ae(Z.FormItem, a.formItemProps, f), c = at(a, e.effectData), m = be("exaProvider", {});
    return K(
      () => X(s.refData),
      () => {
        var u, d;
        !e.disabled && ((u = w.value) != null && u.length) && ((d = m.validateField) == null || d.call(m, b.value).catch(() => {
        }));
      },
      { deep: !0, flush: "post" }
    ), () => z("formItem")(
      {
        ...S,
        rules: w.value,
        name: b.value
      },
      {
        label: c,
        default: (r == null ? void 0 : r.default) || (() => C(Pe, {
          option: a,
          model: l,
          effectData: e.effectData,
          layout: o ? "compact" : "space",
          fieldWrapper: o ? "none" : "formItem",
          layoutAttrs: t
        }))
      }
    );
  }
});
function _t(e, t) {
  const n = Array.isArray(t) ? { actions: t } : t;
  return {
    ...e,
    ...n,
    buttonProps: { ...e.buttonProps, ...n == null ? void 0 : n.buttonProps }
  };
}
const Uo = Q({
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
    const { model: t, option: n, isView: a, effectData: l, labelIndex: o } = e, { columns: r, rowButtons: s, label: i, labelSlot: b, compact: f, slots: p, ...v } = n, { modelsMap: h } = t.listData, w = r[0], S = h.get(w), c = r.length === 1 && w.field === "$index", m = !o && (i || b), u = le(t, "refData");
    let d = [];
    const g = {
      add: {
        onClick({ index: _ }) {
          u.value.splice(_ + 1, 0, c ? void 0 : {}), d.splice(_ + 1, 0, void 0);
        },
        icon: () => ze("add")
      },
      delete: {
        disabled: () => u.value.length === 1,
        confirmText: "",
        icon: () => ze("remove"),
        onClick({ index: _ }) {
          u.value.splice(_, 1), d.splice(_, 1);
        }
      }
    }, y = !a && s !== !1 && _t(
      {
        type: "Buttons",
        colProps: { flex: "0" },
        labelMode: "icon",
        ...Z.rowButtons,
        methods: g,
        actions: ["add", "delete"]
      },
      s
    ), I = Ie([]), A = (_, x) => {
      const O = [...t.propChain, x], E = N({ ...c ? S : {}, index: x, parent: u, propChain: O }), P = c ? L({
        get: () => u.value[E.index],
        set: (G) => {
          u.value[E.index] = G;
        }
      }) : $(_);
      E.refData = P;
      const U = /* @__PURE__ */ new Map();
      let B;
      c ? (B = { ...w }, Object.assign(E, { initialValue: S.initialValue, rules: S.rules })) : h.size === 1 && !w.field && [...et, "InputGroup", "InputList"].includes(w.type) ? (B = { ...w }, Object.assign(E, {
        initialValue: S.initialValue,
        rules: S.rules,
        listData: S.listData,
        children: Ke(S.children || /* @__PURE__ */ new Map(), P, O).modelsMap
      })) : (B = { type: f ? "InputGroup" : "Group", initialValue: void 0, span: "auto" }, E.children = Ke(h, P, O).modelsMap), U.set(B, E), o && (B.label ?? (B.label = i), B.labelSlot ?? (B.labelSlot = b || (({ index: G }) => B.label + String(G + 1)))), y && U.set(y, N({ parent: u, index: x }));
      const j = N({ parent: u, children: U, index: x, propChain: O });
      return {
        children: j.children,
        model: j,
        refData: P,
        key: Xe(12),
        effectData: N({ parent: l, current: u, index: x })
      };
    };
    if (c)
      K(
        [() => u.value, () => u.value.length, () => [...t.propChain]],
        () => {
          u.value.length === 0 && u.value.push(void 0), I.value = u.value.map((_, x) => {
            const O = d[x];
            return O ? (dt(O.model, [...t.propChain, x], x), O.effectData.index = x, O) : A(_, x);
          }), d = [...I.value];
        },
        { immediate: !0 }
      );
    else {
      const _ = /* @__PURE__ */ new WeakMap();
      K(
        [() => [...u.value], () => u.value.length, () => [...t.propChain]],
        () => {
          u.value.length === 0 && u.value.push({}), I.value = u.value.map((x, O) => {
            let E = _.get(ee(x));
            return E ? (E.refData.value = x, dt(E.model, [...t.propChain, O], O), E.effectData.index = O) : (E = A(x, O), _.set(ee(x), E)), E;
          });
        },
        { immediate: !0 }
      );
    }
    const k = () => I.value.map(({ model: _, effectData: x, key: O }) => C(Pe, { model: _, option: { subSpan: "auto", ...n }, effectData: x, key: O }));
    if (a) {
      if (m)
        if (c) {
          const { label: O, labelSlot: E = O } = r[0], P = r[0].breakAfter ?? r[0].wrapping;
          return () => z("space")(
            { direction: P ? "vertical" : "horizontal" },
            {
              default: () => I.value.map(({ refData: U, key: B }, j) => {
                const G = {
                  ...l,
                  parent: l,
                  current: u.value,
                  field: r[0].field,
                  value: U.value,
                  index: j,
                  record: U.value
                };
                return C("span", { key: B }, [te(E, G), E ? ": " : "", U.value]);
              })
            }
          );
        } else
          return () => I.value.map(({ children: O, key: E }) => C(Le, {
            key: E,
            modelsMap: O,
            option: n,
            effectData: l
          }));
      const _ = {}, x = L(() => new Map(I.value.flatMap(({ children: O }) => [...O])));
      return () => C(Le, {
        option: { ...v, label: i, labelSlot: b },
        modelsMap: x.value,
        effectData: l,
        ..._
      });
    } else if (m) {
      const _ = /* @__PURE__ */ new Map([
        [
          {
            ...v,
            formItemProps: { ...v.formItemProps, style: "margin: 0" },
            label: i,
            labelSlot: b,
            type: "InfoSlot",
            block: !1,
            span: 24,
            // FormItem 对单个与多个子节点采用不同包装；固定根节点，避免 1/2 行切换时重挂首行并清除校验状态。
            render: () => C("div", { style: "width: 100%" }, k())
          },
          t
        ]
      ]);
      return () => C(Pe, { model: { children: _ }, option: n, effectData: l });
    } else
      return k;
  }
}), qo = Q({
  inheritAttrs: !1,
  props: {
    option: { type: Object, required: !0 },
    model: { type: Object, required: !0 },
    effectData: Object,
    isView: Boolean
  },
  setup(e, { attrs: t, slots: n }) {
    return () => {
      const { option: a, model: l, effectData: o, isView: r } = e, { title: s = a.label, buttons: i } = a;
      return z("card")({
        attrs: t,
        slots: n,
        title: n.title || (s ? () => te(s, o) : void 0),
        extra: n.extra || (i && !r ? () => C(Me, { option: i, effectData: o }) : void 0),
        content: n.default || (() => r ? C(Le, { option: a, modelsMap: l.children, effectData: o }) : C(Pe, { option: a, model: l, effectData: o }))
      });
    };
  }
}), zo = Q({
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
    const l = $(), o = st({
      ...e.schema,
      dataSource: e.dataSource || e.model || ((n = e.schema) == null ? void 0 : n.dataSource),
      attrs: ae({ ...Z.Form }, { ...(a = e.schema) == null ? void 0 : a.attrs })
    });
    se.schemaDiagnostics && e.schema && ft(e.schema, "form", "SuperForm");
    const r = {
      setOption: (f) => {
        var p;
        se.schemaDiagnostics && ft(f, "form", "SuperForm"), Ne(o, f), o.attrs = ae(o.attrs, { ...f.attrs }, { ...(p = e.schema) == null ? void 0 : p.attrs });
      }
    };
    $e("rootSlots", t.slots), t.emit("register", r);
    const s = (f) => {
      l.value = f, t.emit("register", r, f);
    };
    Ft(() => t.expose(l.value));
    const i = L(() => e.isContainer || o.isContainer);
    return () => o.subItems && C(
      he.Form,
      {
        option: o,
        // dataSource: formData.value,
        onRegister: s,
        compact: e.compact,
        ignoreRules: e.ignoreRules,
        class: { "sup-container": i.value }
      },
      nt(o.slots, xe(), t.slots)
    );
  }
});
function Ko(e) {
  const [t, n] = Wn(), a = Promise.resolve(typeof e == "function" ? e() : e), l = (r, s) => {
    if (r)
      t.value || a.then(r.setOption), t.value = s;
    else
      return (i, b) => C(zo, { ...i, onRegister: l }, b == null ? void 0 : b.slots);
  }, o = async (r, s) => {
    const i = await n();
    if (r && r in i)
      return typeof i[r] == "function" ? i[r](s) : i[r];
    if (!r)
      return i;
  };
  return [
    l,
    {
      dataSource: L(() => {
        var r;
        return (r = t.value) == null ? void 0 : r.dataSource;
      }),
      getForm: n,
      asyncCall: o,
      getData() {
        var r;
        return oe((r = t.value) == null ? void 0 : r.dataSource);
      },
      submit: () => o("submit"),
      validate: () => o("validate"),
      validateField: (r) => o("validateField", r),
      clearValidate: () => o("clearValidate"),
      getNativeInstance: () => o("getNativeInstance"),
      resetFields: (r) => o("resetFields", r),
      setFieldsValue: (r) => o("setFieldsValue", r),
      /**
       * @deprecated 使用`resetFields`
       */
      setData(r) {
        o("resetFields", r);
      }
    }
  ];
}
function Ht(e, { buttons: t, ...n } = {}) {
  const a = $(!1), l = N({ ...n, ...Z.Modal }), o = $(), r = t && (() => C(Me, { option: t, effectData: { modalRef: o } })), s = $(!1), i = () => {
    if (!(s.value || f))
      return s.value = !0, Promise.resolve().then(() => {
        var m;
        return (m = l.onOk) == null ? void 0 : m.call(l);
      }).then((m) => {
        m !== !1 && (a.value = !1);
      }).catch((m) => console.error(m)).finally(() => s.value = !1);
  }, b = () => l.icon ? [l.icon(), te(l.title)] : te(l.title);
  let f;
  const p = (...m) => s.value ? Promise.resolve(!1) : f || (f = Promise.resolve().then(() => {
    var u;
    return (u = l.onCancel) == null ? void 0 : u.call(l, ...m);
  }).then((u) => (u !== !1 && (a.value = !1), u)).catch((u) => (console.error(u), !1)).finally(() => {
    f = void 0;
  })), v = (m) => {
    if (m)
      a.value = !0;
    else if (a.value)
      return p();
  };
  return {
    config: l,
    modalRef: o,
    modalSlot: (m, u) => z("modal")(
      {
        ref: o,
        visible: a.value,
        class: "sup-modal",
        "onUpdate:visible": v,
        confirmLoading: s.value,
        ...l,
        title: void 0,
        ...m,
        onOk: i,
        onCancel: p
      },
      { footer: r, title: b, ...u == null ? void 0 : u.slots, ...e && { default: e } }
    ),
    setModal: (m) => {
      Object.assign(l, m);
    },
    closeModal: () => (a.value = !1, Ce()),
    openModal: async (m) => (Object.assign(l, m), a.value = !0, Ce())
  };
}
function Xn(e, t) {
  var n;
  const { modalSlot: a, openModal: l, modalRef: o, closeModal: r, setModal: s, config: i } = Ht(e, t), b = $t(), f = document.createElement("div");
  let p;
  const v = qe().modal, h = (n = v == null ? void 0 : v.useContext) == null ? void 0 : n.call(v), w = () => {
    const u = i.afterClose;
    i.destroyOnClose && c(), u == null || u();
  }, S = (u) => {
    var d;
    return ((d = v == null ? void 0 : v.wrapContext) == null ? void 0 : d.call(
      v,
      (g = {}) => a({ ...u, ...g, afterClose: w }, {}),
      h,
      u
    )) ?? a({ ...u, afterClose: w }, {});
  }, c = () => {
    it(null, f), f.remove(), p = null;
  };
  return Vt(c), {
    modalRef: o,
    openModal: (u) => p ? l(u) : (p = kn(S), p.appContext = b == null ? void 0 : b.appContext, document.body.appendChild(f), it(p, f), Ce(() => l(u))),
    modalSlot: a,
    closeModal: r,
    setModal: s
  };
}
function dr(e, t = {}) {
  const { title: n, ...a } = e, { onSubmitError: l, ...o } = t, [r, s] = Ko(a), i = Xn(r(), { maskClosable: !1, title: n, ...o });
  return { ...i, openModal: ({ data: f, onOk: p = t.onOk, onSubmitError: v = l, ...h } = {}) => {
    const w = async () => {
      try {
        const S = await s.submit();
        return p ? await p(S) : S;
      } catch (S) {
        try {
          await (v == null ? void 0 : v(S));
        } catch (c) {
          console.error(c);
        }
        throw S;
      }
    };
    return s.resetFields(f), i.openModal({ ...h, onOk: w });
  }, formActions: s };
}
const Mt = Q({
  name: "CollectionList",
  inheritAttrs: !1,
  props: {
    option: { type: Object, required: !0 },
    model: { type: Object, required: !0 },
    effectData: { type: Object, required: !0 },
    isView: Boolean
  },
  setup(e, { attrs: t, slots: n }) {
    const a = le(e.model, "refData"), l = Ie([]), o = /* @__PURE__ */ new WeakMap(), r = $(), s = $([]), i = $(), b = $({}), f = $(0), p = e.option.editModal && Ht(
      () => {
        var u, d, g;
        return C(Qn, {
          key: f.value,
          option: {
            ...(u = e.option.editModal) == null ? void 0 : u.form,
            subItems: ((g = (d = e.option.editModal) == null ? void 0 : d.form) == null ? void 0 : g.subItems) || e.option.columns
          },
          dataSource: b.value,
          onRegister: (y) => {
            i.value = y;
          }
        });
      },
      { maskClosable: !1, ...e.option.editModal.modalProps }
    ), v = (u) => {
      Ce(() => {
        const d = l.value.find((g) => ee(g.model.refData) === ee(u));
        d && (e.option.type === "TabList" && (r.value = d.key), e.option.type === "CollapseList" && !s.value.includes(d.key) && (s.value = [...s.value, d.key]));
      });
    }, h = (u, d) => {
      var g, y;
      if (!(e.isView || !p))
        return b.value = Fe((u == null ? void 0 : u.model.refData) || {}), f.value++, p.openModal({
          title: ((y = (g = e.option.editModal) == null ? void 0 : g.modalProps) == null ? void 0 : y.title) || (u ? "编辑" : "新增"),
          onOk: async () => {
            if (e.isView)
              return;
            const I = await i.value.submit();
            if (u) {
              const A = l.value.indexOf(u);
              if (A < 0)
                throw new Error("当前记录已删除");
              Object.assign(a.value[A], I);
            } else {
              const A = I;
              if (d === null)
                a.value.unshift(A);
              else {
                const k = l.value.indexOf(d);
                if (k < 0)
                  throw new Error("新增位置对应的记录已删除");
                a.value.splice(k + 1, 0, A);
              }
              v(A);
            }
          }
        });
    }, w = {
      add: ({ listItemKey: u } = {}) => {
        if (e.isView)
          return;
        const d = l.value.find((y) => y.key === u);
        if (u !== void 0 && !d)
          throw new Error("新增位置对应的记录已删除");
        if (p)
          return h(void 0, d || null);
        const g = {};
        d ? a.value.splice(l.value.indexOf(d) + 1, 0, g) : a.value.unshift(g), v(g);
      },
      edit: ({ listItemKey: u }) => {
        const d = l.value.find((g) => g.key === u);
        if (d)
          return h(d);
      },
      delete: ({ listItemKey: u }) => {
        const d = l.value.findIndex((g) => g.key === u);
        !e.isView && d >= 0 && a.value.splice(d, 1);
      }
    }, S = be("rootSlots", {}), c = (u, d, g) => {
      if (u !== !1)
        return Yn(
          _t({ ...Z.rowButtons, actions: g }, u),
          d,
          w,
          S,
          () => !e.isView
        );
    }, m = c(e.option.buttons, e.effectData, ["add"]);
    return K(
      [() => [...a.value], () => [...e.model.propChain]],
      () => {
        var u;
        const d = l.value, g = d.findIndex((k) => k.key === r.value), y = /* @__PURE__ */ new Map(), I = /* @__PURE__ */ new Set();
        l.value = a.value.map((k, _) => {
          const x = ee(k), O = y.get(x) || 0;
          y.set(x, O + 1);
          const E = o.get(x) || [];
          let P = E[O];
          if (!P) {
            const U = $(k), { modelsMap: B } = Ke(e.model.listData.modelsMap, U, e.model.propChain, _);
            P = {
              key: O ? Xe(12) : De(k, String(t.rowKey || "id")) ?? Xe(12),
              model: N({ refData: U, children: B, index: _, propChain: [...e.model.propChain, _] }),
              effectData: N({ parent: e.effectData, current: a, index: _, record: k })
            }, P.buttons = c(
              e.option.rowButtons,
              P.effectData,
              p ? ["add", "edit", "delete"] : ["add", "delete"]
            ), E[O] = P, o.set(x, E);
          }
          return I.has(P.key) && (P.key = Xe(12)), I.add(P.key), P.effectData.listItemKey = P.key, P.model.refData = k, P.effectData.record = k, dt(P.model, [...e.model.propChain, _], _), P.effectData.index = _, P;
        }), l.value.some((k) => k.key === r.value) || (r.value = (u = l.value[Math.min(Math.max(g, 0), l.value.length - 1)]) == null ? void 0 : u.key);
        const A = d.findIndex(
          (k) => s.value.includes(k.key) && !l.value.some((_) => _.key === k.key)
        );
        if (s.value = s.value.filter((k) => l.value.some((_) => _.key === k)), A >= 0 && l.value.length) {
          const k = l.value[Math.min(A, l.value.length - 1)].key;
          s.value.includes(k) || s.value.push(k);
        }
      },
      { immediate: !0 }
    ), () => {
      const { option: u, isView: d } = e, { span: g = 24 } = t, y = { ...t };
      delete y.rowKey, delete y.span;
      const I = u.title ?? u.label, A = !d && m ? () => m.render() : void 0, k = n.title || I || A ? () => z("space")(
        {},
        {
          default: () => [n.title ? n.title() : te(I, e.effectData), A == null ? void 0 : A()]
        }
      ) : void 0, _ = l.value.map((O, E) => ({
        key: O.key,
        title: () => te(u.titleField ? De(O.model.refData, u.titleField) : String(E + 1), O.effectData),
        extra: !d && u.type !== "TabList" && O.buttons ? () => O.buttons.render() : void 0,
        content: () => d || p ? C(Le, { option: u, modelsMap: O.model.children, effectData: O.effectData }) : C(Pe, { option: u, model: O.model, effectData: O.effectData })
      })), x = () => _.length ? u.type === "TabList" ? z("tabs")({
        attrs: y,
        items: _,
        activeKeys: r.value,
        onActiveChange: (O) => {
          r.value = O;
        },
        extra: d ? void 0 : () => {
          var O, E;
          return (E = (O = l.value.find((P) => P.key === r.value)) == null ? void 0 : O.buttons) == null ? void 0 : E.render();
        }
      }) : u.type === "CollapseList" ? z("collapse")({
        attrs: y,
        items: _,
        activeKeys: s.value,
        onActiveChange: (O) => {
          s.value = Array.isArray(O) ? O : [O];
        }
      }) : z("row")(
        { gutter: u.gutter ?? [16, 16], ...u.rowProps },
        {
          default: () => _.map(
            (O) => z("col")(
              { key: O.key, span: g },
              {
                default: () => z("card")({
                  attrs: y,
                  title: O.title,
                  extra: O.extra,
                  content: O.content
                })
              }
            )
          )
        }
      ) : z("empty")();
      return [z("group")({ title: k, content: x }), p && C(p.modalSlot)];
    };
  }
}), Ho = Q({
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
    const { model: n, isView: a, effectData: l, labelIndex: o, rowKey: r = "" } = e, { columns: s, rowButtons: i, slots: b, ...f } = e.option, { modelsMap: p, rules: v } = n.listData, h = le(n, "refData"), w = {
      add: {
        icon: () => ze("add"),
        onClick({ index: g }) {
          h.value.splice(g + 1, 0, {}), h.value = [...ee(h.value)];
        }
      },
      delete: {
        hidden: () => h.value.length === 1,
        disabled: !1,
        confirmText: "",
        icon: () => ze("remove"),
        onClick({ index: g }) {
          h.value = h.value.filter((y, I) => I !== g);
        }
      }
    }, S = !a && i !== !1 && _t(
      {
        type: "Buttons",
        labelMode: "icon",
        ...Z.rowButtons,
        methods: w,
        actions: ["add", "delete"]
      },
      i
    ), c = /* @__PURE__ */ new WeakMap(), m = $([]);
    K(
      [() => [...h.value], () => [...n.propChain]],
      () => {
        const g = h.value;
        g.length === 0 && g.push({}), m.value = g.map((y, I) => {
          const A = ee(y), k = c.get(A);
          if (k)
            return k.refData.value = y, dt(k.model, [...n.propChain, I], I), k.effectData.index = I, k;
          const _ = $(y), { modelsMap: x } = Ke(p, _, n.propChain, I), O = {
            key: y[r] || Xe(12),
            refData: _,
            model: N({ refData: _, children: x, index: I, propChain: [...n.propChain, I] }),
            effectData: N({
              parent: l,
              current: h,
              index: I,
              record: y
            })
          };
          return c.set(A, O), O;
        });
      },
      {
        immediate: !0
      }
    );
    const u = {
      ...f,
      type: "Group",
      buttons: S,
      subItems: s
    }, d = f.title || f.label;
    return typeof d == "string" && o && (u.title = ({ index: g }) => d + String(g + 1)), () => m.value.map(({ model: g, effectData: y, key: I }) => C(he.Group, { model: g, option: u, effectData: y, key: I, isView: a }, t.slots));
  }
}), Go = /* @__PURE__ */ Q({
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
    const a = $(e.option.activeKey), l = [], o = (s, i, b) => {
      l[s] = b ? void 0 : i, b && a.value === i && (a.value = l.find(Boolean));
    }, r = [...e.model.children].map(([s, i], b) => {
      const {
        key: f,
        field: p,
        label: v,
        icon: h
      } = s, w = xe({
        parent: e.effectData,
        current: le(i, "parent"),
        field: i.refName,
        value: i.refData
      }), {
        hidden: S,
        attrs: c
      } = ke({
        option: s,
        effectData: w
      }), m = f || p || String(b), u = () => [h == null ? void 0 : h(), te(v, w)];
      return Re(() => o(b, m, X(S) || X(c.disabled))), {
        attrs: N(c),
        key: m,
        title: u,
        hidden: S,
        option: s,
        model: i,
        effectData: w
      };
    });
    return Ft(() => {
      a.value ?? (a.value = l.find(Boolean));
    }), () => z("tabs")({
      attrs: t,
      slots: n,
      content: n.default,
      activeKeys: a.value,
      onActiveChange: (s) => {
        a.value = s;
      },
      extra: n.extra || (!e.isView && e.option.buttons ? () => C(Me, {
        option: e.option.buttons,
        effectData: e.effectData
      }) : void 0),
      // 显隐和禁用属于 Schema 语义，两个 Adapter 消费相同的有效子项。
      items: r.filter(({
        hidden: s
      }) => !s.value).map(({
        attrs: s,
        key: i,
        title: b,
        option: f,
        model: p,
        effectData: v
      }) => ({
        key: i,
        attrs: s,
        title: b,
        disabled: X(s.disabled),
        content: () => e.isView ? C(Le, {
          option: f,
          modelsMap: p.children,
          effectData: v
        }) : C(Pe, {
          option: f,
          model: p,
          effectData: v
        })
      }))
    });
  }
}), rt = (e, ...t) => ha(e, ...t, (n, a, l, o) => {
  if (a === void 0)
    o[l] = void 0;
  else if (Array.isArray(n))
    return a;
});
function Wo({
  childrenMap: e,
  orgList: t,
  listener: n,
  rowEditor: a,
  rowKey: l
}) {
  const o = Ie(), r = L(() => {
    var c;
    return !!((c = o.value) != null && c.isEdit);
  }), s = (c) => {
    const m = o.value;
    return m != null && m.isEdit && l(c) === m.key ? m : {
      isEdit: !1
    };
  }, i = L(() => {
    const c = [...t.value], m = o.value;
    if (!(m != null && m.isEdit))
      return c;
    if (m.isNew) {
      const u = m.anchorKey === void 0 ? c.length - 1 : c.findIndex((d) => l(d) === m.anchorKey);
      c.splice(u < 0 ? Math.min(m.index, c.length) : u + 1, 0, m.record);
    } else
      c.some((u) => l(u) === m.key) || c.splice(Math.min(m.index, c.length), 0, m.record);
    return c;
  }), b = (c, m, u) => {
    const d = N(Fe(m)), {
      modelsMap: g
    } = Kn(ee(e), d);
    o.value = st({
      record: c,
      key: l(c),
      editData: d,
      modelsMap: g,
      forms: st({}),
      isEdit: !0,
      saving: !1,
      ...u
    });
  }, f = {
    add({
      index: c,
      record: m,
      resetData: u
    } = {}) {
      if (r.value)
        return;
      const d = m ?? (c === void 0 ? void 0 : t.value[c]);
      if (c !== void 0 && !d)
        throw new Error("新增位置已失效，请重新选择插入位置");
      const g = {
        ...u
      }, y = d && l(d), I = d ? t.value.findIndex((A) => l(A) === y) + 1 : t.value.length;
      b(g, g, {
        isNew: !0,
        index: I,
        anchorKey: y
      });
    },
    edit({
      record: c,
      selectedRows: m,
      resetData: u
    }) {
      if (r.value)
        return;
      const d = c || (m == null ? void 0 : m[0]), g = d ? t.value.findIndex((y) => l(y) === l(d)) : -1;
      if (g < 0)
        throw new Error("编辑记录已不存在，请重新选择");
      b(t.value[g], rt({}, t.value[g], u), {
        isNew: !1,
        index: g
      });
    },
    delete({
      record: c,
      selectedRows: m
    }) {
      if (!r.value)
        return n.onDelete(c ? [c] : m);
    }
  }, p = {
    add: {
      disabled: () => r.value,
      onClick: f.add
    },
    edit: {
      disabled: (c) => {
        var m;
        return r.value || !(c.record || ((m = c.selectedRows) == null ? void 0 : m.length) === 1);
      },
      onClick: f.edit
    },
    delete: {
      disabled: (c) => {
        var m;
        return r.value || !(c.record || ((m = c.selectedRows) == null ? void 0 : m.length) > 0);
      },
      onClick: f.delete
    }
  }, v = [{
    name: "save",
    attrs: {
      loading: !0
    },
    onClick: async (c) => {
      var m;
      const {
        record: u
      } = c, d = s(u);
      if (!(!d.isEdit || d.saving)) {
        d.saving = !0;
        try {
          const g = fe("form");
          if (await Promise.all(Object.values(d.forms).map((A) => g.validate(A))), await ((m = a == null ? void 0 : a.onSave) == null ? void 0 : m.call(a, {
            ...c,
            isNew: d.isNew
          })) === !1)
            return !1;
          const I = Fe(ee(d.editData));
          if (d.isNew) {
            const A = d.anchorKey === void 0 ? void 0 : t.value.findIndex((k) => l(k) === d.anchorKey);
            if (A === -1)
              throw new Error("新增锚点已不存在，请取消后重新选择插入位置");
            await n.onSave(I, A), d.isNew = !1;
          } else {
            const A = t.value.find((k) => l(k) === d.key);
            if (!A)
              throw new Error("编辑记录已被移除，请取消本次编辑");
            await n.onUpdate(I, A);
          }
          d.isEdit = !1, o.value = void 0;
        } catch (g) {
          throw g instanceof Error && fe("services").message("error", g.message), g;
        } finally {
          d.saving = !1;
        }
      }
    }
  }, {
    name: "cancel",
    disabled: ({
      record: c
    }) => s(c).saving,
    onClick: async (c) => {
      var m;
      const u = s(c.record);
      if (!(!u.isEdit || u.saving)) {
        u.saving = !0;
        try {
          if (await ((m = a == null ? void 0 : a.onCancel) == null ? void 0 : m.call(a, {
            ...c,
            isNew: u.isNew
          })) === !1)
            return;
          u.isEdit = !1, o.value = void 0;
        } finally {
          u.saving = !1;
        }
      }
    }
  }], h = (c, m) => s(c.record).isEdit ? C(Me, {
    key: "edit",
    option: {
      ...m,
      actions: v
    },
    effectData: c
  }) : null, w = /* @__PURE__ */ Q({
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
      option: c,
      editInfo: m,
      viewRender: u
    }) {
      const {
        editable: d = !0
      } = c, {
        modelsMap: g,
        forms: y
      } = m, I = g.get(ee(c)), {
        index: A,
        parent: k,
        refData: _
      } = Ve(I), x = I.propChain.join("."), O = xe({
        current: k,
        value: _,
        index: A
      }), {
        attrs: E,
        hidden: P,
        nativeAttrs: U,
        disabled: B
      } = ke({
        option: c,
        effectData: O
      }), j = L(() => !P.value && (tt(d) ? d(O) : d)), G = xt(c, I, O, E, {
        attrs: U,
        disabled: B
      }), Y = ct(I.rules, O), q = L(() => X(E.disabled) || X(P) ? [] : Y);
      return () => j.value ? z("form")({
        ref: (R) => {
          R ? y[x] = R : delete y[x];
        },
        model: m.editData
      }, {
        default: () => z("formItem")({
          name: I.propChain,
          rules: q.value,
          wrapperCol: {}
        }, {
          default: G
        })
      }) : u ? u({
        ...O,
        isView: !0
      }) : _.value;
    }
  });
  return {
    list: i,
    methods: f,
    buttonMethods: p,
    getEditRender: (c, m) => {
      if (Gt(c.type) === "enhanced" || Ot(c.type) || c.type === "InputSlot")
        return ({
          record: u
        }) => {
          const d = s(u);
          if (d.isEdit)
            return C(w, {
              key: d.key,
              option: c,
              editInfo: d,
              viewRender: m
            });
        };
    },
    editButtonsSlot: h
  };
}
function Yo({ rowKey: e, option: t, listener: n, orgList: a }) {
  const l = Ie(), o = t.rowEditor, r = (o == null ? void 0 : o.form) || t.editForm || t.formSchema || {};
  r.subItems = r.subItems || t.columns.filter((c) => {
    var m;
    return !(c.hideInForm || (m = c.exclude) != null && m.includes("form"));
  });
  let s;
  const i = (c) => {
    l.value ? l.value.resetFields(c) : s = c;
  }, b = () => C(he.Form, {
    option: r,
    onRegister: (c) => {
      if (l.value = c, c && s) {
        const m = s;
        s = void 0, c.resetFields(m);
      }
    }
  }), f = {
    ...Z.Modal,
    maskClosable: !1,
    ...t.modalProps,
    ...o == null ? void 0 : o.modalProps
  }, { modalSlot: p, openModal: v, closeModal: h } = Ht(b, f), w = ({ meta: c, ...m }) => te(f.title, { meta: c, ...m }) || `${r.title ? r.title + " - " : ""}  ${c.title || c.label}`;
  return { modalSlot: p, methods: {
    add(c = {}) {
      const { meta: m = {}, resetData: u, index: d } = c;
      let g = c.record ?? (d === void 0 ? void 0 : a.value[d]);
      (d !== void 0 || c.record) && (!g || !a.value.some((A) => e(A) === e(g))) && (console.warn("[SuperForm] 新增位置已失效，将追加到末尾"), g = void 0);
      const y = g && e(g), I = { ...u };
      return i(I), m.title ?? (m.title = "新增"), m.name = "add", m.isNew = !0, v({
        ...m,
        title: w({ ...c, source: I, meta: m }),
        onOk: async () => l.value.submit().then(async (A) => {
          var k;
          if (await ((k = o == null ? void 0 : o.onSave) == null ? void 0 : k.call(o, { ...c, source: A, meta: m })) === !1)
            return !1;
          let x = y === void 0 ? void 0 : a.value.findIndex((O) => e(O) === y);
          return x === -1 && (console.warn("[SuperForm] 新增锚点已不存在，将追加到末尾"), x = void 0), n.onSave(A, x);
        }),
        onCancel: async () => {
          var A;
          return await ((A = o == null ? void 0 : o.onCancel) == null ? void 0 : A.call(o, { ...c, meta: m })) === !1 ? !1 : h();
        }
      });
    },
    async edit(c) {
      var m, u;
      const { record: d, selectedRows: g, resetData: y, meta: I = {} } = c, A = d || g[0];
      if (!A)
        return Promise.reject(new Error("未选择记录"));
      const k = await ((u = (m = t.apis) == null ? void 0 : m.info) == null ? void 0 : u.call(m, e(A), A)), _ = rt({}, A, k, y);
      return i(_), Ne(I, { name: "edit", title: "编辑", isNew: !1 }), v({
        ...I,
        title: w({ ...c, source: _, meta: I }),
        onOk: async () => l.value.submit().then(async (x) => {
          var O;
          return await ((O = o == null ? void 0 : o.onSave) == null ? void 0 : O.call(o, { ...c, source: x, meta: I })) === !1 ? !1 : n.onUpdate(x, A);
        }),
        onCancel: async () => {
          var x;
          return await ((x = o == null ? void 0 : o.onCancel) == null ? void 0 : x.call(o, { ...c, meta: I })) === !1 ? !1 : h();
        }
      });
    },
    delete({ record: c, selectedRows: m }) {
      const u = c ? [c] : m;
      return n.onDelete(u);
    }
  } };
}
function Qo({
  model: e,
  orgList: t,
  editableRef: n,
  rowKey: a
}) {
  const {
    modelsMap: l
  } = e.listData, o = le(e, "propChain", []), r = /* @__PURE__ */ new WeakMap(), s = (p, v) => {
    const h = ee(p), w = [...o.value, v];
    let S = r.get(h);
    if (S)
      dt(S.model, w, v);
    else {
      const {
        modelsMap: c,
        rootModels: m
      } = Kn(ee(l), p, o.value, v);
      S = {
        key: Symbol(),
        modelsMap: c,
        model: N({
          children: m,
          index: v,
          propChain: w
        })
      }, r.set(h, S);
    }
    return S;
  };
  K([() => [...t.value], () => [...o.value]], ([p]) => {
    p.forEach(s);
  }, {
    immediate: !0,
    flush: "sync"
  });
  const i = {
    add({
      index: p,
      record: v,
      resetData: h
    } = {}) {
      const w = {
        ...h
      }, S = v ? t.value.findIndex((c) => a(c) === a(v)) : p;
      if (S !== void 0) {
        if (!t.value[S])
          throw new Error("新增位置已失效，请重新选择插入位置");
        t.value.splice(S + 1, 0, w);
      } else
        t.value.push(w);
    }
    // delete({ record }) {
    //   const orgIdx = orgList.value.indexOf(record)
    //   orgList.value.splice(orgIdx, 1)
    // },
  }, b = /* @__PURE__ */ Q({
    inheritAttrs: !1,
    props: {
      option: {
        type: Object,
        required: !0
      }
    },
    setup({
      option: p
    }, v) {
      const {
        record: h
      } = v.attrs, w = L(() => r.get(ee(h)).modelsMap.get(p)), {
        index: S,
        parent: c,
        refData: m
      } = Ve(w.value), u = xe({
        current: c,
        value: m,
        list: t,
        record: h,
        index: S
      }), {
        editable: d = !0
      } = p, {
        attrs: g,
        hidden: y,
        nativeAttrs: I,
        disabled: A
      } = ke({
        option: p,
        effectData: u
      }), k = L(() => !y.value && n.value && (tt(d) ? d(u) : d)), _ = xt(p, w.value, u, g, {
        attrs: I,
        disabled: A
      }), x = vt(p, N({
        ...Ve(u),
        isView: !0
      })), O = ct(w.value.rules, u), E = O && L(() => X(g.disabled) ? void 0 : O);
      return () => k.value ? z("formItem")({
        wrapperCol: {},
        name: w.value.propChain,
        rules: E == null ? void 0 : E.value
      }, {
        default: _
      }) : x ? x() : m.value;
    }
  });
  return {
    list: t,
    methods: i,
    getEditRender: (p) => {
      if (Gt(p.type) === "enhanced" || Ot(p.type) || p.type === "InputSlot" && p.editable !== !1)
        return (v) => {
          const h = t.value.findIndex((S) => ee(S) === ee(v.record)), w = s(v.record, h < 0 ? v.index : h);
          return C(b, {
            key: w.key,
            option: p,
            ...v
          });
        };
    }
  };
}
function Xo(e, t, n) {
  const a = $({}), { title: l, apis: o } = e, { modalProps: r, ...s } = e.descriptionsProps || {}, i = () => C(Vo, { option: { descriptionsProps: s }, modelsMap: t, source: a }), b = {
    ...Z.Modal,
    footer: null,
    ...e.modalProps,
    ...r
  }, f = (h) => te(b.title, h) || `${l ? l + " - " : ""}详情`, { openModal: p, modalSlot: v } = Xn(i, b);
  return {
    detailSlot: v,
    openDetail: async ({ record: h, selectedRows: w, meta: S = {}, ...c }) => {
      const m = h || w[0];
      if (o != null && o.info) {
        const u = await o.info(n(m), m);
        a.value = Object.assign({}, m, u);
      } else
        a.value = m;
      S.name = "detail", p({ ...S, title: f({ ...c, source: a.value, meta: S }) });
    }
  };
}
function Zo({ option: e, model: t, orgList: n, rowKey: a, listener: l, isView: o, effectData: r }) {
  const { modelsMap: s } = t.listData, i = {
    list: n,
    modalSlot: [],
    methods: {
      delete({ record: c, selectedRows: m }) {
        const u = c ? [c] : m;
        return l.onDelete(u);
      }
    }
  }, { edit: b, editable: f = b, rowEditor: p } = e, { editMode: v, addMode: h } = p || e;
  if (!o && f) {
    const c = L(() => tt(f) ? f(r) : f), { methods: m, ...u } = Qo({ model: t, orgList: n, editableRef: c, rowKey: a });
    Object.assign(i.methods, m), Object.assign(i, u);
  } else if (v === "inline") {
    const { list: c, methods: m, buttonMethods: u, editButtonsSlot: d, getEditRender: g } = Wo({
      childrenMap: s,
      orgList: n,
      listener: l,
      rowEditor: p,
      rowKey: a
    });
    i.list = c, Object.assign(i.methods, m), Object.assign(i, { buttonMethods: u, editButtonsSlot: d, getEditRender: g });
  }
  if (v === "modal" || h === "modal") {
    const { modalSlot: c, methods: m } = Yo({ rowKey: a, option: e, listener: l, orgList: n });
    i.methods.edit ? (i.methods.add = m.add, i.buttonMethods || (i.buttonMethods = {}), i.buttonMethods.add = m.add) : Object.assign(i.methods, m), i.modalSlot.push(c);
  }
  const { detailSlot: w, openDetail: S } = Xo(e, s, a);
  return i.modalSlot.push(w), i.methods.detail = S, i;
}
const Jo = Q({
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
  setup(e, { attrs: t, slots: n, emit: a }) {
    const { optionsRef: l } = Ct(e.options, e.effectData), o = $(e.activeKey ?? e.defaultActiveKey), r = (d) => {
      o.value = d, a("update:activeKey", d);
    }, {
      default: s,
      extra: i,
      rightExtra: b,
      tabBarExtraContent: f,
      tabBarExtra: p,
      title: v,
      titleBar: h,
      ...w
    } = n, S = nt(e.slots, e.effectData), c = p || b || f, m = L(() => {
      var d;
      const g = l.value.map(({ value: y, label: I, ...A }) => ({
        ...A,
        key: A.key ?? y,
        tab: A.tab ?? I
      }));
      return o.value === void 0 && r((d = g[0]) == null ? void 0 : d.key), g;
    }), u = (d) => te(S.customTab || e.customTab || d.tab, {
      ...e.effectData,
      item: d
    });
    return () => [
      !e.bordered && v ? h == null ? void 0 : h() : null,
      z("tableFilter")(
        {
          bordered: e.bordered,
          items: m.value.map((d) => ({
            ...d,
            tab: u(d)
          })),
          value: o.value,
          onValueChange: r,
          attrs: t
        },
        {
          ...w,
          ...S,
          default: s,
          title: v,
          tabExtra: c || (v ? void 0 : i),
          cardExtra: c || v ? i : void 0
        }
      )
    ];
  }
}), el = Q({
  props: {
    option: { type: Object, required: !0 },
    effectData: { type: Object, required: !0 }
  },
  setup(e) {
    const t = e.option, { field: n, editable: a } = e.option, l = N({});
    K(
      () => e.effectData,
      (c) => Object.assign(l, c),
      { immediate: !0 }
    );
    const o = n.split(".").slice(0, -1), r = L(() => De(l.record, o)), s = L({
      get: () => De(l.record, n),
      set: (c) => ut(l.record, n, c)
    }), i = { parent: r, refData: s }, { attrs: b, hidden: f, nativeAttrs: p, disabled: v } = ke({
      option: t,
      effectData: { ...l, inTable: !0 }
    }), h = xt(t, i, l, b, { attrs: p, disabled: v }), w = L(() => tt(a) ? a(l) : X(a)), S = vt(t, l);
    return () => f.value ? "" : w.value ? C("div", { class: "editable-cell" }, h()) : S ? S() : s.value;
  }
}), tl = (e) => {
  if (!e.editable)
    return;
  const t = se.buttonRoles && se.buttonRoles() || [];
  if ((!e.roleName || t.includes(e.roleName)) && (Gt(e.type) === "enhanced" || Ot(e.type) || e.type === "InputSlot"))
    return (a) => C(el, { option: e, effectData: { ...a } });
};
function nl({
  childrenMap: e,
  context: t,
  option: n,
  attrs: a,
  isView: l,
  effectData: o
}) {
  const { methods: r, buttonMethods: s, getEditRender: i, editButtonsSlot: b } = t, f = xe({ list: o.value, isView: l, parent: o }), p = (n.rowEditor || n).editMode !== "modal", v = function S(c = e) {
    const m = [];
    return [...c].forEach(([u, d]) => {
      var g, y;
      if (u.type === "Hidden" || u.hideInTable || u.hidden === !0 || (g = u.exclude) != null && g.includes("table"))
        return;
      const I = at(u, f);
      if (d.children) {
        const A = S(d.children);
        u.ignoreTableTitle ? m.push(...A) : m.push({
          title: I,
          children: A
        });
      } else {
        const A = {
          title: I,
          key: u.field || u.label,
          dataIndex: d.propChain.length > 1 ? d.propChain : d.propChain[0]
        };
        u.options || u.type === "Switch" || (y = u.type) != null && y.includes("Picker") ? A.align = "center" : u.type === "InputNumber" && (A.align = "right"), Object.assign(A, u.columnProps), Ne(A, n.columnProps, Z.Column);
        const k = A.customRender || vt(u) || void 0, _ = i ? i(u, k) : p ? tl(u) : void 0;
        A.customRender = al(k, _, f), m.push(A);
      }
    }), m;
  }(), h = ll(n, a);
  h && v.unshift(h);
  const w = ol({
    buttons: n.rowButtons,
    // 行内编辑需要覆盖新增/编辑/删除的禁用状态，但不能丢失详情等通用动作。
    methods: { ...r || {}, ...s || {} },
    editButtonsSlot: b,
    isView: l,
    effectData: f
  });
  return w && (Ne(w, n.columnProps, Z.Column), v.push(w)), v;
}
function al(e, t, n) {
  if (t || e) {
    const a = (l) => {
      const o = (t == null ? void 0 : t(l)) ?? (e == null ? void 0 : e({ ...l, isView: !0 })) ?? String(l.text ?? "");
      return o && typeof o == "string" && l.column.ellipsis ? C("span", { title: o }, o) : o;
    };
    return (l) => C(a, { ...n, ...l, current: l.record });
  } else
    return ({ text: a }) => String(a ?? "");
}
function ol({ buttons: e, methods: t, editButtonsSlot: n, isView: a, effectData: l }) {
  const o = _t(Z.rowButtons || {}, e), { columnProps: r, ...s } = o, i = kt({ config: s, methods: t, isView: a });
  if (!i)
    return;
  const b = (f) => (n == null ? void 0 : n(f, s)) || i({ key: f.record, effectData: f });
  return {
    title: "操作",
    key: "action",
    fixed: "right",
    minWidth: 100,
    width: 100,
    align: "center",
    resizable: !1,
    ...r,
    customRender: (f) => C(b, { ...l, ...f, current: f.record })
  };
}
const ll = (e, t) => {
  var n;
  const a = e.indexColumn ?? ((n = Z.Table) == null ? void 0 : n.indexColumn);
  if (a)
    return {
      key: "INDEX",
      title: "序号",
      width: 60,
      align: "center",
      customRender: ({ index: l }) => {
        var o, r;
        return ((((o = t.pagination) == null ? void 0 : o.current) || 1) - 1) * (((r = t.pagination) == null ? void 0 : r.pageSize) || 10) + l + 1;
      },
      ...Te(a) && a
    };
}, rl = Q({
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
  setup({ option: e, model: t, reload: n, effectData: a, isView: l, ...o }, r) {
    var s, i, b;
    const f = ((s = e.rowEditor) == null ? void 0 : s.editMode) === "inline", p = r.attrs, v = /* @__PURE__ */ new WeakMap(), h = p.rowKey || "id", w = (D) => {
      const M = typeof h == "function" ? h(D) : D[h];
      if (M != null)
        return M;
      const V = ee(D);
      return v.has(V) || v.set(V, Xe(12)), v.get(V);
    }, S = le(t, "refData"), c = ((i = e.attrs) == null ? void 0 : i.rowSelection) || void 0, m = c == null ? void 0 : c.selectedRowKeys, u = Ue(m) ? m : $(m || []), d = $([]), {
      selectedRowKeys: g,
      onChange: y,
      getCheckboxProps: I,
      ...A
    } = c || {}, k = c && {
      attrs: {
        fixed: !0,
        ...A
      },
      onChange: (D, M, V) => {
        var F;
        if (c != null && c.preserveSelectedRowKeys) {
          const T = x(), J = d.value.filter((re) => !T.has(w(re))), de = new Map([...J, ...M].map((re) => [w(re), re]));
          D = [.../* @__PURE__ */ new Set([...J.map(w), ...D])], M = D.map((re) => de.get(re)).filter(Boolean);
        }
        D.length === u.value.length && D.every((T, J) => T === u.value[J]) && M.length === d.value.length && M.every((T, J) => T === d.value[J]) || (u.value = D, d.value = M, (F = c == null ? void 0 : c.onChange) == null || F.call(c, D, M, V));
      },
      isRowSelectable: (D) => {
        var M, V;
        return f && !S.value.includes(D) ? !1 : !((V = (M = c == null ? void 0 : c.getCheckboxProps) == null ? void 0 : M.call(c, D)) != null && V.disabled);
      }
    }, _ = p.childrenColumnName || "children", x = () => {
      const D = /* @__PURE__ */ new Map(), M = (V) => V.forEach((F) => {
        D.set(w(F), F), Array.isArray(F[_]) && M(F[_]);
      });
      return M(S.value), D;
    };
    K(
      () => [x(), [...u.value]],
      ([D, M]) => {
        var V;
        const F = c == null ? void 0 : c.preserveSelectedRowKeys, T = F ? [...M] : M.filter((ve) => D.has(ve)), J = new Map(d.value.map((ve) => [w(ve), ve])), de = T.map((ve) => D.get(ve) ?? (F ? J.get(ve) : void 0)).filter((ve) => !!ve);
        (T.length !== M.length || de.length !== d.value.length || de.some((ve, ua) => ve !== d.value[ua])) && (d.value = de, T.length !== M.length && (u.value = T), (V = c == null ? void 0 : c.onChange) == null || V.call(c, T, de, { type: "none" }));
      },
      { immediate: !0 }
    );
    const O = (D, M = 0, V = 1) => {
      const F = [], T = M === V;
      return D.forEach((J) => {
        J[_] && (F.push(w(J)), T || F.push(...O(J[_], M, V + 1)));
      }), F;
    }, E = $(((b = e.attrs) == null ? void 0 : b.expandedRowKeys) || []), P = (D) => {
      E.value = D, r.emit("expandedRowsChange", D);
    };
    (o.defaultExpandLevel || p.defaultExpandAllRows) && K(
      S,
      (D, M) => {
        D.length && !(M != null && M.length) && P(O(D, Number(o.defaultExpandLevel)));
      },
      { immediate: !0 }
    );
    const B = Zo({
      option: e,
      model: t,
      orgList: S,
      rowKey: w,
      listener: {
        async onSave(D, M) {
          var V;
          if ((V = e.apis) != null && V.save)
            return await e.apis.save(D), D.parentId && (E.value = [...E.value, D.parentId]), n == null ? void 0 : n();
          M !== void 0 ? S.value.splice(M + 1, 0, D) : S.value.push(D);
        },
        async onUpdate(D, M) {
          var V;
          const F = w(M), T = () => S.value.findIndex((de) => w(de) === F);
          if (T() < 0)
            throw new Error("编辑记录已被移除，请取消本次编辑");
          (V = e.apis) != null && V.update && await e.apis.update(D);
          const J = T();
          if (J < 0)
            throw new Error("保存期间记录已被移除，请刷新确认服务端结果");
          return Object.assign(S.value[J], D), n == null ? void 0 : n();
        },
        async onDelete(D) {
          var M, V;
          const F = D.map((T) => w(T));
          try {
            await ((V = (M = e.apis) == null ? void 0 : M.delete) == null ? void 0 : V.call(M, F, D));
          } catch (T) {
            return console.error(T), T;
          }
          return k && (u.value = u.value.filter((T) => !F.includes(T)), d.value = d.value.filter((T) => !F.includes(w(T)))), D.forEach((T) => {
            const J = w(T), de = S.value.findIndex((re) => re === T || w(re) === J);
            de !== -1 && S.value.splice(de, 1);
          }), n == null ? void 0 : n();
        }
      },
      isView: l,
      effectData: a
    }), j = nl({
      childrenMap: t.listData.modelsMap,
      context: B,
      option: e,
      attrs: p,
      isView: l,
      effectData: a
    }), { list: G, methods: Y, buttonMethods: q = Y, modalSlot: R } = B, H = {
      selectedRowKeys: u,
      selectedRows: d,
      setSelectedRows: (D) => {
        d.value = D, u.value = D.map((M) => w(M));
      },
      expandedRowKeys: E,
      setExpandedRowKeys: P,
      expandAll: () => {
        P(O(S.value));
      },
      add: (D) => {
        var M;
        return (M = Y.add) == null ? void 0 : M.call(Y, D);
      },
      edit: (D) => {
        var M;
        return (M = Y.edit) == null ? void 0 : M.call(Y, { ...ge, ...D });
      },
      delete: () => {
        var D;
        return (D = Y.delete) == null ? void 0 : D.call(Y, ge);
      },
      detail: (D) => {
        var M;
        return (M = Y.detail) == null ? void 0 : M.call(Y, { ...ge, ...D });
      }
    }, ne = N({ ...H }), pe = $();
    K(
      pe,
      (D) => {
        Object.assign(ne, D, H), r.emit("register", ne);
      },
      { flush: "sync" }
    );
    const ge = N({
      ...a,
      selectedRows: d,
      selectedRowKeys: u,
      tableRef: ne
    }), ye = { ...r.slots }, me = e.buttons, je = (me == null ? void 0 : me.targetSlot) ?? (me == null ? void 0 : me.forSlot) ?? "extra";
    if (me) {
      const D = ye[je], M = kt({
        config: me,
        effectData: ge,
        methods: q,
        isView: l
      });
      (D || M) && (ye[je] = () => [D == null ? void 0 : D(), M == null ? void 0 : M()]);
    }
    const He = e.title || e.label, { title: Se = He, extra: _e, ...Be } = ye, Ae = (Se || _e) && (() => z("row")(
      { align: "middle", class: "sup-titlebar" },
      {
        default: () => [
          Se && z("col")(
            { class: "sup-title" },
            {
              default: at({ labelSlot: Se, tooltip: e.tooltip }, a)
            }
          ),
          _e && z("col")(
            {
              class: "sup-title-buttons",
              flex: 1,
              style: { textAlign: (me == null ? void 0 : me.align) || "right" }
            },
            { default: _e }
          )
        ]
      }
    ));
    Be.headerCell = (D) => {
      var M;
      return ((M = ye.headerCell) == null ? void 0 : M.call(ye, D)) || te(D.title, a);
    };
    const ce = () => {
      const { rowSelection: D, expandedRowKeys: M, ...V } = p;
      return [
        ...R.map((F) => F()),
        z("table")(
          {
            ...Z.Table,
            ref: pe,
            data: G.value,
            columns: N(j),
            tableLayout: "fixed",
            pagination: !1,
            ...V,
            selection: k && {
              ...k,
              selectedKeys: u.value
            },
            rowKey: w,
            expandedKeys: E.value,
            onExpandedChange: P,
            class: ["sup-table-wrapper", e.editable && "sup-table-editable"]
          },
          Be
        )
      ];
    };
    return e.tabs ? () => C(Jo, { ...e.tabs, effectData: a }, {
      [je]: ye[je],
      title: Se && (() => te(Se, a)),
      extra: _e,
      titleBar: Ae,
      default: ce
    }) : () => [Ae == null ? void 0 : Ae(), ce()];
  }
}), sl = /* @__PURE__ */ Q({
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
    var a;
    const l = e.option.title || e.option.label, o = [...e.model.children].map(([s, i], b) => {
      const f = xe({
        parent: e.effectData,
        current: le(e.model, "parent"),
        field: i.refName,
        value: i.refData
      }), {
        hidden: p,
        attrs: {
          disabled: v,
          ...h
        }
      } = ke({
        option: s,
        effectData: f
      }), {
        key: w,
        field: S
      } = s;
      return {
        attrs: N(h),
        option: s,
        effectData: f,
        model: i,
        header: () => {
          var c;
          return [(c = s.icon) == null ? void 0 : c.call(s), te(s.label, f)];
        },
        key: w || S || String(b),
        hidden: p,
        disabled: v
      };
    }), r = $(e.option.activeKey || ((a = o[0]) == null ? void 0 : a.key));
    return () => z("collapse")({
      attrs: t,
      slots: n,
      content: n.default,
      title: n.title || (l ? () => te(l, e.effectData) : void 0),
      activeKeys: r.value,
      onActiveChange: (s) => {
        r.value = s;
      },
      items: o.filter(({
        hidden: s
      }) => !s.value).map(({
        attrs: s,
        option: i,
        disabled: b,
        model: f,
        header: p,
        effectData: v,
        key: h
      }) => ({
        key: h,
        attrs: s,
        title: p,
        disabled: X(b),
        extra: !e.isView && i.buttons ? () => C(Me, {
          option: i.buttons,
          effectData: v
        }) : void 0,
        content: () => e.isView ? C(Le, {
          option: i,
          modelsMap: f.children,
          effectData: v
        }) : C(Pe, {
          option: i,
          model: f,
          effectData: v
        })
      }))
    });
  }
}), il = /* @__PURE__ */ Q({
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
    const n = t, a = e, l = (r) => {
      n("update:value", r);
    }, o = () => z("preview")({
      images: a.images,
      visible: a.visible,
      current: a.current,
      width: a.width,
      height: a.height,
      "onUpdate:visible": l
    });
    return (r, s) => (Oe(), Qe(o));
  }
});
function ul(e) {
  const t = $(!1), n = N({
    visible: t,
    images: [],
    "onUpdate:value": (i) => t.value = i,
    ...e
  }), a = $(!1), l = () => !a.value && C(il, n), o = $t();
  Vt(() => {
    a.value = !0;
  });
  let r;
  return { open: (i) => {
    if (typeof i == "string")
      n.images = [i];
    else if (Array.isArray(i))
      n.images = [...i];
    else {
      const { src: b, ...f } = i || {};
      b && (n.images = [b]), Object.assign(n, f);
    }
    if (!r) {
      const b = document.createElement("div");
      r = kn(l, { appContext: o == null ? void 0 : o.appContext }), r.appContext = o == null ? void 0 : o.appContext, it(r, b);
    }
    Ce(() => t.value = !0);
  } };
}
function cl(e, t) {
  return new Promise((n, a) => {
    const l = new FileReader();
    t === "text" ? l.readAsText(e) : l.readAsDataURL(e), l.onload = () => n({ result: l.result, file: e }), l.onerror = (o) => a(o);
  });
}
function dl(e, t, n) {
  const a = typeof n < "u" ? [n, e] : [e], l = new Blob(a, { type: "application/octet-stream" }), o = window.URL.createObjectURL(l), r = document.createElement("a");
  r.style.display = "none", r.href = o, r.setAttribute("download", t), typeof r.download > "u" && r.setAttribute("target", "_blank"), document.body.appendChild(r), r.click(), document.body.removeChild(r), window.URL.revokeObjectURL(o);
}
function fl(e, t) {
  var n, a;
  const l = ((n = e.name) == null ? void 0 : n.toLowerCase()) || "", o = ((a = e.type) == null ? void 0 : a.toLowerCase()) || "";
  return t.split(",").some((r) => {
    const s = r.trim().toLowerCase();
    return s ? s.startsWith(".") ? l.endsWith(s) : s.endsWith("/*") ? o.startsWith(s.slice(0, -1)) : o === s : !1;
  });
}
function pl(e) {
  const { mode: t, valueKey: n, infoNames: a, maxCount: l, accept: o, minSize: r, maxSize: s, repeatable: i } = e, b = {
    ...n && { [n]: n },
    uid: "uid",
    status: "status",
    url: "url",
    name: "name",
    ...a
  };
  t === "custom" && (b.file = "file");
  const f = /* @__PURE__ */ new Map(), p = /* @__PURE__ */ new Map(), v = /* @__PURE__ */ new Map();
  return {
    clearTask: (I) => {
      f.delete(I), p.delete(I);
    },
    convertInfo: (I) => {
      const A = { status: "done", ...I };
      return Object.entries(b).forEach(([k, _]) => {
        _ && _ !== k && _ in A && (A[k] = A[_], delete A[_]);
      }), A;
    },
    getValue: (I, A) => {
      if (A) {
        const k = I[0];
        return n ? (k == null ? void 0 : k[n]) ?? (k == null ? void 0 : k[b.uid]) : k;
      }
      return n ? I.map((k) => k[n] ?? k[b.uid]) : I;
    },
    hasPendingWork: (I) => v.size > 0 || t === "auto" && I.some((A) => A.status === "uploading") || (t === "base64" || t === "text") && I.some((A) => A.status !== "done") || t === "submit" && I.some((A) => A.status !== "done"),
    queueDelete: (I, A) => v.set(I, A),
    reconvert: (I) => {
      const A = {};
      return Object.entries(b).forEach(([k, _]) => {
        const x = I[k];
        _ && x !== void 0 && (A[_] = x);
      }), A;
    },
    registerRequest: (I, A) => {
      if (t === "auto" || t === "base64" || t === "text") {
        const k = A();
        return f.set(I, k), k.catch(() => {
        }), k;
      }
      t === "submit" && p.set(I, A);
    },
    submit: async (I) => {
      let A = Promise.resolve();
      if (t === "auto" || t === "base64" || t === "text") {
        const x = I.find((O) => O.status === "error");
        if (x)
          throw x.error || x.response || { message: "文件处理失败，请删除后重新选择！" };
        A = Promise.all(f.values());
      } else if (t === "submit") {
        const x = I.filter((O) => O.status !== "done").map((O) => {
          var E;
          return O.status = "uploading", (E = p.get(O.uid)) == null ? void 0 : E();
        }).filter(Boolean);
        A = Promise.all(x);
      }
      const k = await A, _ = [...v.values()];
      return v.clear(), await Promise.all(_.map(async (x) => {
        try {
          await x();
        } catch (O) {
          console.error(O);
        }
      })), k;
    },
    validate: (I, A, k) => {
      if (l > 1 && k.length + A.indexOf(I) >= l)
        return `文件数量最多${l}`;
      if (o && !fl(I, o))
        return "请选择正确的文件类型！";
      if (r || s) {
        const _ = (I.size || 0) / 1024 / 1024;
        if (r && r > _)
          return `文件最小需要${r}M`;
        if (s && s < _)
          return `文件最大不超过${s}M`;
      }
      if (!i) {
        const _ = k.find((x) => x.name === I.name);
        if (_)
          return `文件重复: ${_.name}`;
      }
    }
  };
}
const vl = /* @__PURE__ */ new Set(["png", "jpg", "jpeg", "gif", "webp", "svg", "tif", "tiff"]);
function ml(e) {
  var t, n, a, l, o;
  if (e.thumbUrl)
    return !0;
  if (e.url || e.file) {
    const r = (n = (t = e.name || e.url) == null ? void 0 : t.split(/[?#]/)[0].match(/\.([^.\/\\]+)$/)) == null ? void 0 : n[1].toLowerCase();
    if (r && vl.has(r))
      return !0;
    {
      const s = e.type || ((a = e.file) == null ? void 0 : a.type) || ((o = (l = e.url) == null ? void 0 : l.match(/^data:(\S*?);/)) == null ? void 0 : o[1]);
      return s == null ? void 0 : s.startsWith("image");
    }
  }
}
function fn(e, t) {
  const n = fe("services").info({
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
  return { setError: (l, o) => {
    n.update({
      icon: () => ze("error"),
      okButtonProps: {
        loading: !1
      },
      type: "error",
      title: l,
      content: o == null ? void 0 : o.message
    });
  }, ...n };
}
let bl = 0;
const hl = Q({
  inheritAttrs: !1,
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
    isImage: Function,
    beforeSelect: Function,
    beforeRemove: Function,
    showList: { type: Boolean, default: !0 },
    removable: { type: Boolean, default: !0 },
    downloadable: { type: Boolean, default: void 0 },
    previewable: { type: Boolean, default: !0 },
    onPreview: Function,
    onDownload: Function,
    onChange: Function,
    apis: Object
  },
  emits: ["update:value", "update:fileList"],
  setup(e, t) {
    const {
      uploadMode: n = "auto",
      apis: a = {},
      isSingle: l,
      minSize: o,
      maxSize: r,
      infoNames: s,
      repeatable: i,
      onPreview: b,
      onDownload: f,
      isImage: p = ml,
      hideOnMax: v,
      valueKey: h
    } = e, w = (l ? 1 : e.maxCount) || 1 / 0, { accept: S } = t.attrs, c = pl({
      mode: n,
      valueKey: h,
      infoNames: s,
      maxCount: w,
      accept: S,
      minSize: o,
      maxSize: r,
      repeatable: i
    }), m = ul(), { convertInfo: u, reconvert: d } = c, { onSubmit: g } = be("exaProvider", {}), y = $([]), I = /* @__PURE__ */ new Set();
    let A = !1;
    Wt(() => {
      A = !0, I.forEach((D) => URL.revokeObjectURL(D));
    }), K(y, (D, M) => {
      const V = new Set(D.map((T) => T.uid));
      M.forEach((T) => {
        V.has(T.uid) || c.clearTask(T.uid);
      });
      const F = new Set(D.map((T) => T.objectUrl));
      I.forEach((T) => {
        F.has(T) || (URL.revokeObjectURL(T), I.delete(T));
      });
    });
    const k = Ie([]), _ = Ie(), x = (D) => {
      k.value = D.map(d), e.isView || (t.emit("update:fileList", k.value), O()), y.value = D;
    }, O = () => {
      _.value = c.getValue(ee(k.value), !!e.isSingle), t.emit("update:value", _.value);
    };
    K(
      () => ee(e.value),
      (D) => {
        if (D !== _.value)
          if (_.value = D, !D)
            y.value = [];
          else {
            const M = va(D) ? D : [D];
            k.value = h ? M.map((V) => ({ [h]: V })) : M, y.value = k.value.map(u);
          }
      },
      { immediate: !0, flush: "sync" }
    ), K(
      () => ee(e.fileList),
      (D) => {
        if (D && D !== k.value) {
          const M = D.map(u);
          x(M);
        }
      },
      { immediate: !0 }
    );
    const E = $(!1), P = g == null ? void 0 : g(async () => {
      if (await U, E.value = c.hasPendingWork(y.value), E.value) {
        const D = fn(" 文件同步中，请稍候...");
        return c.submit(y.value).then((M) => (D.destroy(), M)).catch((M) => {
          throw E.value = !1, D.setError("文件上传失败", M), M;
        }).finally(() => E.value = !1);
      }
      return c.submit(y.value);
    });
    P && Wt(P);
    let U = Promise.resolve();
    const B = (D) => {
      const M = U.then(async () => {
        var V, F;
        if (A || e.isView || e.disabled || await ((V = e.beforeSelect) == null ? void 0 : V.call(e, D)) === !1 || A || e.isView || e.disabled)
          return;
        const T = {
          uid: `upload-${Date.now()}-${++bl}`,
          file: D,
          name: D.name,
          type: D.type,
          size: D.size,
          status: n === "auto" || n === "base64" || n === "text" ? "uploading" : "waiting"
        }, J = c.validate(T, [T], y.value);
        if (J) {
          fe("services").message("error", J);
          return;
        }
        p(T) && (T.objectUrl = URL.createObjectURL(D), I.add(T.objectUrl)), (w === 1 ? y.value : []).forEach((re) => {
          if (c.clearTask(re.uid), re.status === "done" && a.delete) {
            const ve = d(re);
            c.queueDelete(ve, () => a.delete(ve));
          }
        }), x(w === 1 ? [T] : [...y.value, T]), n === "base64" || n === "text" ? c.registerRequest(T.uid, () => cl(D, n).then(
          ({ result: re }) => G({ url: re }, T),
          (re) => j(re, T)
        )) : n !== "custom" && c.registerRequest(T.uid, () => Y(T)), (F = e.onChange) == null || F.call(e, { file: T, fileList: [...y.value] });
      }).catch((V) => {
        fe("services").message("error", (V == null ? void 0 : V.message) || "文件选择失败");
      });
      return U = M, M;
    }, j = (D, M) => {
      var V;
      const F = y.value.find((T) => T.uid === M.uid);
      if (!(A || !F))
        return Object.assign(F, { error: D, status: "error" }), x([...y.value]), (V = e.onChange) == null || V.call(e, { file: F, fileList: [...y.value] }), Promise.reject(D);
    }, G = (D, M) => {
      var V;
      const F = y.value.find((T) => T.uid === M.uid);
      if (!(A || !F))
        return Object.assign(F, u(D), { status: "done" }), x([...y.value]), (V = e.onChange) == null || V.call(e, { file: F, fileList: [...y.value] }), D;
    }, Y = (D) => {
      if (!a.upload)
        return Promise.resolve().then(() => j(Error("Api config error"), D));
      const M = new FormData();
      M.append(t.attrs.name || "file", D.file);
      const V = (F) => {
        F.total > 0 && (F.percent = F.loaded / F.total * 100);
        const T = y.value.find((J) => J.uid === D.uid);
        !A && T && (T.percent = F.percent);
      };
      return Promise.resolve().then(() => a.upload(M, { onUploadProgress: V })).then(
        (F) => G(F, D),
        (F) => j(F, D)
      );
    }, q = async (D) => {
      var M;
      if (e.isView || e.disabled)
        return !1;
      let V = await ((M = e.beforeRemove) == null ? void 0 : M.call(e, D));
      return V !== !1 && a.delete && D.status === "done" ? new Promise((F) => {
        const T = fe("services").confirm({
          title: "确定删除吗？",
          okText: "确定",
          cancelText: "取消",
          closable: !1,
          maskClosable: !1,
          ...Z.Modal,
          onOk() {
            const J = d(D), de = () => a.delete(J);
            if (n === "submit")
              c.queueDelete(J, de), F(!0);
            else
              return T.update({
                okCancel: !1,
                title: "文件删除中……"
              }), de().then(F, () => (T.update({
                okCancel: !1,
                title: "文件删除失败",
                type: "error",
                onOk: void 0
              }), F(!1), Promise.reject()));
          },
          onCancel() {
            F(!1);
          }
        });
      }) : V;
    }, R = /* @__PURE__ */ new Set(), H = async (D) => {
      var M;
      if (!(e.isView || e.disabled || !e.removable || R.has(D.uid))) {
        R.add(D.uid);
        try {
          if (await q(D) === !1 || A)
            return;
          c.clearTask(D.uid), x(y.value.filter((V) => V.uid !== D.uid)), (M = e.onChange) == null || M.call(e, { file: D, fileList: [...y.value] });
        } catch (V) {
          fe("services").message("error", (V == null ? void 0 : V.message) || "文件删除失败");
        } finally {
          R.delete(D.uid);
        }
      }
    }, ne = $(!1), pe = L(() => e.downloadable ?? !!(f || a.download)), ge = (D) => {
      if (pe.value) {
        if (f)
          return f(D);
        if (a.download && !ne.value) {
          ne.value = !0;
          const M = fn("文件下载中，请稍候...");
          return Promise.resolve().then(() => a.download(d(D))).then((V) => dl(V, D.name)).then(() => M.destroy()).catch((V) => {
            M.setError("文件下载失败", V);
          }).finally(() => ne.value = !1);
        }
      }
    }, ye = async (D) => {
      if (e.previewable)
        if (b) {
          const M = await b(d(D));
          M && m.open(M);
        } else if (p(D)) {
          let M = -1;
          const V = y.value.filter((F) => p(F)).map((F, T) => {
            F.uid === D.uid && (M = T);
            const J = F.url || F.thumbUrl;
            return !J && !F.objectUrl && F.file && (F.objectUrl = window.URL.createObjectURL(F.file), I.add(F.objectUrl)), J || F.objectUrl;
          });
          V[M] ? m.open({ images: V, current: M }) : ge(D);
        } else
          ge(D);
    }, me = e.title, je = typeof e.title == "string" ? e.title : "上传文件", He = N({ ...ee(e.effectData), fileList: y }), Se = tt(me) && (() => me(He)), _e = [];
    S && _e.push("支持文件格式：" + S), r && _e.push("单个文件不超过" + r + "MB");
    const Be = e.tip ?? _e.join(", "), Ae = L(() => e.disabled || e.isView), ce = L(() => v && w && y.value.length >= w);
    return () => z("upload")({
      attrs: t.attrs,
      files: y.value,
      readonly: Ae.value,
      showList: e.showList,
      removable: e.removable && !Ae.value,
      downloadable: pe.value,
      previewable: e.previewable,
      hideTrigger: Ae.value || !!ce.value,
      title: () => Se ? Se() : je,
      tip: Be,
      select: B,
      remove: H,
      preview: ye,
      download: ge,
      isImage: (D) => !!p(D)
    }, {
      ...t.slots,
      ...t.slots.default && { default: () => {
        var D, M;
        return (M = (D = t.slots).default) == null ? void 0 : M.call(D, He);
      } }
    });
  }
}), gl = /* @__PURE__ */ Q({
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
    const n = e, a = t, l = $(), o = $(""), r = $(!1), s = L(() => qn("Input")), i = () => {
      const m = s.value, u = {
        type: "Input",
        option: n.option,
        model: n.model,
        effectData: n.effectData,
        state: {},
        binding: { value: o.value, "onUpdate:value": (g) => o.value = g }
      }, d = m.getAttrs(
        {
          ref: (g) => l.value = g,
          class: "sup-tag-input",
          onBlur: c
        },
        n.option,
        u.state
      );
      return m.render({ ...u, attrs: d, slots: {} });
    }, b = (m, u) => typeof n.closable == "function" ? n.closable(m, u) : n.closable, f = L(() => n.value ? typeof n.value == "string" ? n.value.split(",") : n.value : []), p = () => {
      r.value = !0, Ce(() => {
        l.value.focus();
      });
    }, v = (m) => {
      const u = f.value.filter((d) => d !== m);
      S(u);
    }, h = (m, u) => {
      const d = z("tag")(
        {
          removable: b(m, u),
          onRemove: () => v(m)
        },
        { default: () => m.length > 20 ? `${m.slice(0, 20)}...` : m }
      );
      return m.length > 20 ? z("tooltip")({ title: m }, { default: () => d }) : d;
    }, w = () => z("tag")(
      { class: "sup-tag-add", onClick: p },
      { default: () => [ze("add"), te(n.newLabel, n.effectData)] }
    ), S = (m) => {
      n.stringifyValue ? a("update:value", m.join(",")) : a("update:value", m);
    }, c = () => {
      o.value && f.value.indexOf(o.value) === -1 && S([...f.value, o.value]), r.value = !1, o.value = "";
    };
    return (m, u) => (Oe(), yt(Et, null, [
      (Oe(!0), yt(Et, null, xn(f.value, (d, g) => (Oe(), Qe(ot(() => h(d, g)), { key: d }))), 128)),
      r.value ? (Oe(), Qe(ot(i), { key: 0 })) : (Oe(), Qe(ot(w), { key: 1 }))
    ], 64));
  }
}), yl = {
  key: 1,
  class: "sup-tag-select-empty"
}, wl = /* @__PURE__ */ Q({
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
    const n = e, a = t, { optionsRef: l } = Ct(n.option.options, n.effectData), o = L(() => n.option.options === void 0 ? n.options ?? [] : l.value), r = L(() => {
      const { value: f } = n, p = n.stringifyValue;
      return f === void 0 ? [] : p ? f.split(",") : Array.isArray(f) ? f : [f];
    }), s = (f, p) => {
      const v = n.multiple ? p ? [...r.value, f] : r.value.filter((h) => h !== f) : [f];
      a("check", f, p), b(v), a("change", f, v);
    }, i = (f, p) => z("checkableTag")(
      {
        class: "tag-select",
        selected: r.value.includes(p),
        onSelectedChange: (v) => s(p, v)
      },
      { default: () => f }
    ), b = (f) => {
      n.multiple ? n.stringifyValue ? a("update:value", f.join(",")) : a("update:value", f) : a("update:value", f[0]);
    };
    return (f, p) => o.value.length ? (Oe(!0), yt(Et, { key: 0 }, xn(o.value, ({ label: v, value: h }) => (Oe(), Qe(ot(() => i(v, h)), { key: h }))), 128)) : (Oe(), yt("div", yl, da(e.placeholder), 1));
  }
}), Zn = {
  Form: Qn,
  Group: Dt,
  Card: qo,
  CardList: Mt,
  TabList: Mt,
  CollapseList: Mt,
  GroupList: Ho,
  Tabs: Go,
  Table: rl,
  Collapse: sl,
  Descriptions: Dt,
  Fragment: Dt
}, Sl = {
  InputGroup: Bo,
  InputList: Uo,
  Upload: hl,
  TagInput: gl,
  TagSelect: wl
}, et = Object.keys(Zn), Cl = {
  ...Zn,
  ...Sl
}, mt = {}, At = {}, wt = /* @__PURE__ */ new Set();
function Jn(e) {
  return typeof e == "object" && e && "component" in e ? e : { component: e };
}
function ea(e, t, n, a = []) {
  const l = /* @__PURE__ */ new Set([...Tn, ...a]);
  Object.entries(t).forEach(([o, r]) => {
    if (r) {
      if (l.has(o))
        throw new Error(`Schema 类型 '${o}' 为 Core 保留类型，不能注册为 ${n} 组件`);
      e[o] = { ...Jn(r), source: n };
    }
  });
}
function ta(e, t = []) {
  ea(mt, e, "custom", [...wt, ...t]);
}
function kl(e) {
  const t = new Set(e);
  for (const n of Object.keys(mt))
    if (t.has(n))
      throw new Error(`Schema 类型 '${n}' 已注册为项目组件，不能再由 UIAdapter 接管`);
  wt.clear(), t.forEach((n) => wt.add(n));
}
function fr(e, t = []) {
  const n = Object.fromEntries(
    Object.entries(e).map(([o, r]) => [o, r && Jn(r).component])
  );
  Nn(n, "auto");
  const a = new Set(t), l = Object.fromEntries(
    Object.entries(e).filter(([o]) => !Tn.has(o) && !a.has(o))
  );
  ea(At, l, "auto");
}
function St(e) {
  return mt[e] || At[e];
}
function Ot(e) {
  return !!St(e);
}
function xl() {
  return [.../* @__PURE__ */ new Set([...Object.keys(mt), ...Object.keys(At)])];
}
function Gt(e, t = []) {
  var n, a;
  return Rn.includes(e) ? "core" : wt.has(e) || new Set(t).has(e) ? "enhanced" : ((n = mt[e]) == null ? void 0 : n.source) || ((a = At[e]) == null ? void 0 : a.source);
}
function na(e, t) {
  const { prop: n = "value", event: a = "update:value" } = e.model || {}, l = { ...t };
  if (n !== "value" && (l[n] = l.value, delete l.value), a !== "update:value") {
    const o = a.startsWith("on") ? a : `on${a[0].toUpperCase()}${a.slice(1)}`;
    l[o] = l["onUpdate:value"], delete l["onUpdate:value"];
  }
  return l;
}
const he = Cl, Z = {};
let pn = !1, vn;
function _l(e) {
  if (vn) {
    Jt(e);
    return;
  }
  kl(e.supportedFields), Jt(e), vn = e, pn || (pt(Z, e.defaults || {}), pn = !0);
}
function Al(e) {
  return _l(e), e;
}
function Ol(e = {}) {
  const { defaultProps: t, ...n } = e;
  Object.assign(se, n), t && aa(t);
}
function Il(e, t) {
  ta({ [e]: t });
}
function Dl(e) {
  ta(e);
}
function aa(e) {
  pt(Z, e);
}
const mn = {
  useAdapter: Al,
  configure: Ol,
  registerComponent: Il,
  registerComponents: Dl,
  setDefaultProps: aa
};
class Ml extends Error {
  constructor(t, n) {
    super(t.flatMap((a) => a.messages)[0] || "表单校验失败"), this.fields = t, this.cause = n, this.name = "FormValidationError";
  }
}
const bn = Symbol.for("superform.official-product");
function El(e, t) {
  let n = !1;
  const a = {
    ...mn,
    initialize(l = {}) {
      const o = l.components, r = Object.keys(o || {});
      if (n) {
        if (r.length || l.overrides)
          throw new Error(`SuperForm '${e}' 已初始化，不能再追加字段组件或覆盖 UI 协议`);
        return a;
      }
      const s = Bn(t(o), l.overrides);
      for (const f of r)
        if (!s.supportedFields.includes(f))
          throw new Error(`UIAdapter '${s.name}' 未声明字段 '${f}'，不能初始化对应 UI 组件`);
      const i = globalThis, b = i[bn];
      if (b && b !== e)
        throw new Error(`SuperForm 已初始化官方产品 '${String(b)}'，不能再初始化 '${e}'`);
      return mn.useAdapter(s), i[bn] = e, n = !0, a;
    }
  };
  return a;
}
const oa = {
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
}, la = Object.keys(oa), hn = /* @__PURE__ */ new Map(), Pl = Object.fromEntries(
  la.map((e) => {
    const t = oa[e], n = hn.get(t) ?? e;
    return hn.set(t, n), [e, n];
  })
), jl = Q({
  name: "ElementPlusInputSearchField",
  inheritAttrs: !1,
  props: Un,
  setup(e, { slots: t }) {
    const n = Ln("InputSearch"), a = (l) => {
      var o, r;
      e.attrs.disabled || e.attrs.loading || (r = (o = e.attrs).onSearch) == null || r.call(o, String(e.attrs.modelValue ?? ""), l);
    };
    return () => {
      const { enterButton: l, loading: o, onSearch: r, ref: s, ...i } = e.attrs, b = C(n, ae(i, {
        onKeydown: (f) => {
          f.key !== "Enter" || f.isComposing || f.repeat || f.defaultPrevented || (f.preventDefault(), a(f));
        }
      }), {
        ...t,
        append: t.append ?? (() => C(we, {
          nativeType: "button",
          disabled: i.disabled,
          loading: o,
          "aria-label": "搜索",
          onClick: a
        }, { default: () => {
          var f;
          return ((f = t.enterButton) == null ? void 0 : f.call(t)) ?? (typeof l == "string" ? l : l ? "搜索" : ue.search());
        } }))
      });
      return s ? _n(b, { ref: s }, !0) : b;
    };
  }
}), Rl = Q({
  name: "ElementPlusTreeSelectField",
  inheritAttrs: !1,
  props: Un,
  setup(e, { slots: t }) {
    const n = Ln("TreeSelect"), a = Ie();
    return e.option.labelField && K(
      () => {
        var l, o;
        return X((o = (l = a.value) == null ? void 0 : l.selectRef) == null ? void 0 : o.selectedLabel);
      },
      (l) => {
        var o, r;
        l !== void 0 && ((r = (o = e.binding)["onUpdate:labelValue"]) == null || r.call(o, l));
      },
      { flush: "post" }
    ), () => {
      const l = e.state.treeData === void 0 ? e.attrs : { ...e.attrs, data: e.state.treeData }, o = C(n, l, t);
      return _n(o, { ref: a }, !0);
    };
  }
}), ra = { prop: "modelValue", event: "update:modelValue" }, Tl = Ut(ra), ht = ({ placeholder: e, ...t }) => {
  const [n, a] = Array.isArray(e) ? e : [e, e];
  return {
    ...t,
    startPlaceholder: t.startPlaceholder === void 0 ? n : t.startPlaceholder,
    endPlaceholder: t.endPlaceholder === void 0 ? a : t.endPlaceholder
  };
}, Fl = po(
  {
    TextArea: { fixedProps: { type: "textarea" } },
    InputPassword: {
      fixedProps: { type: "password" },
      defaults: { showPassword: !0 }
    },
    InputSearch: {
      render: ({ slots: e, ...t }) => C(jl, t, e)
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
      render: ({ slots: e, ...t }) => C(Rl, t, e)
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
  ra
), $l = Q({
  props: { state: { type: Object, required: !0 } },
  setup(e) {
    return () => {
      const t = e.state;
      return C(
        ga,
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
              (a) => C(
                ya,
                {
                  ...a.attrs,
                  key: a.key,
                  span: a.colspan
                },
                { label: a.label, default: a.content }
              )
            )
          )
        }
      );
    };
  }
});
function sa(e) {
  return C(
    An,
    ae(e.attrs || {}, {
      modelValue: e.activeKeys,
      "onUpdate:modelValue": e.onActiveChange
    }),
    {
      ...e.slots,
      default: e.content || (() => e.items.map(
        (t) => C(
          On,
          { ...t.attrs, key: t.key, name: t.key, disabled: t.disabled },
          {
            label: () => {
              var n;
              return [
                (n = t.title) == null ? void 0 : n.call(t),
                t.extra && C("span", { onClick: (a) => a.stopPropagation() }, [t.extra()])
              ];
            },
            default: t.content
          }
        )
      ))
    }
  );
}
const Vl = Q({
  props: { state: { type: Object, required: !0 } },
  setup(e) {
    const t = $(), n = $(0), a = $(0);
    let l;
    return Ft(() => {
      const o = t.value;
      if (!o)
        return;
      const r = () => {
        n.value = o.offsetWidth, a.value = o.offsetHeight;
      };
      r(), !(typeof ResizeObserver > "u") && (l = new ResizeObserver(r), l.observe(o));
    }), Nt(() => l == null ? void 0 : l.disconnect()), () => {
      var r, s, i;
      const o = ((r = e.state.attrs) == null ? void 0 : r.tabPosition) || "top";
      return C(
        "div",
        {
          class: ["sup-tabs-with-extra", `sup-tabs-with-extra-${o}`],
          style: {
            "--sup-tabs-extra-width": `${n.value}px`,
            "--sup-tabs-extra-height": `${a.value}px`
          }
        },
        [
          sa(e.state),
          C("div", { ref: t, class: "sup-tabs-bar-extra" }, [(i = (s = e.state).extra) == null ? void 0 : i.call(s)])
        ]
      );
    };
  }
}), Nl = (e) => e.extra ? C(Vl, { state: e }) : sa(e), Ll = Nl, Bl = (e) => [
  e.title && C("div", { class: ["sup-titlebar", "sup-title"] }, [e.title()]),
  C(
    wa,
    ae(e.attrs || {}, {
      modelValue: e.activeKeys,
      "onUpdate:modelValue": e.onActiveChange
    }),
    {
      ...e.slots,
      default: e.content || (() => e.items.map(
        (t) => C(
          Sa,
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
                t.extra && C(
                  "span",
                  {
                    style: { marginLeft: "auto" },
                    onClick: (a) => a.stopPropagation()
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
], Ul = Bl, ql = Q({
  inheritAttrs: !1,
  props: ["data", "pagination", "tableRef"],
  setup(e, { attrs: t, slots: n }) {
    const a = L(() => {
      const { data: l, pagination: o } = e, r = (o == null ? void 0 : o.pageSize) || 10, s = (((o == null ? void 0 : o.current) || 1) - 1) * r;
      return o && l.length > r ? l.slice(s, s + r) : l;
    });
    return () => Kl({ ...t, data: e.data, pagination: e.pagination, ref: e.tableRef }, n, a.value);
  }
}), zl = ({ ref: e, ...t }, n = {}) => C(ql, { ...t, tableRef: e }, n), Kl = (e, t, n) => {
  var A;
  const { data: a, columns: l = [], selection: o, expandedKeys: r, onExpandedChange: s, pagination: i, rowKey: b, scroll: f, ref: p, ...v } = e, h = (k) => typeof b == "function" ? b(k) : k[b], w = (k, _) => (Array.isArray(_) ? _ : String(_).split(".")).reduce((x, O) => x == null ? void 0 : x[O], k), S = (k) => k.map((_) => {
    const { dataIndex: x, title: O, children: E, customRender: P, key: U, ...B } = _;
    return C(
      Yt,
      {
        ...B,
        key: U ?? (Array.isArray(x) ? x.join(".") : x),
        prop: Array.isArray(x) ? x.join(".") : x
      },
      E != null && E.length ? {
        header: () => {
          var j;
          return (j = t.headerCell) == null ? void 0 : j.call(t, { ..._, title: O });
        },
        default: () => S(E)
      } : {
        header: () => {
          var j;
          return (j = t.headerCell) == null ? void 0 : j.call(t, { ..._, title: O });
        },
        default: ({ row: j, $index: G }) => {
          const Y = (P == null ? void 0 : P({
            text: w(j, x),
            record: j,
            index: G,
            column: _
          })) ?? w(j, x);
          return Y == null ? [] : Array.isArray(Y) ? Y : [Y];
        }
      }
    );
  });
  let c = !0;
  const m = (k) => {
    !k || !o || Ce(() => {
      var O;
      c = !0, (O = k.clearSelection) == null || O.call(k);
      const _ = new Set(o.selectedKeys), x = (E) => E.forEach((P) => {
        var U;
        _.has(h(P)) && ((U = k.toggleRowSelection) == null || U.call(k, P, !0)), Array.isArray(P.children) && x(P.children);
      });
      x(n), c = !1;
    });
  }, d = C(
    Ca,
    {
      ...v,
      ref: (k) => {
        m(k), typeof p == "function" ? p(k) : p && typeof p == "object" && (p.value = k);
      },
      data: n,
      rowKey: b,
      maxHeight: ((A = X(f)) == null ? void 0 : A.y) ?? v.maxHeight,
      expandRowKeys: r,
      onExpandChange: (k, _) => {
        if (Array.isArray(_)) {
          s == null || s(_.map(h));
          return;
        }
        const x = new Set(r || []), O = h(k);
        _ ? x.add(O) : x.delete(O), s == null || s([...x]);
      },
      onSelectionChange: (k) => {
        var P;
        if (c || !o)
          return;
        const _ = new Set(n.map(h)), x = new Set(o.selectedKeys), E = [...a.filter((U) => x.has(h(U)) && !_.has(h(U))), ...k];
        (P = o.onChange) == null || P.call(o, E.map(h), E, {});
      }
    },
    {
      ...t,
      default: () => {
        var k;
        return [
          o && C(Yt, {
            type: "selection",
            fixed: ((k = o.attrs) == null ? void 0 : k.fixed) ?? !0,
            selectable: o.isRowSelectable,
            ...o.attrs
          }),
          ...S(l)
        ];
      }
    }
  );
  if (!i)
    return d;
  const { small: g, ...y } = i.attrs || {}, I = {
    currentPage: i.current,
    pageSize: i.pageSize,
    // 查询结果异步返回前没有 total，Element Plus 会把分页判定为非法；本地数组模式则回退到当前数据量。
    total: i.total ?? a.length,
    pageSizes: i.pageSizeOptions,
    layout: "total, sizes, prev, pager, next, jumper",
    onCurrentChange: (k) => {
      var _;
      return (_ = i.onChange) == null ? void 0 : _.call(i, k, i.pageSize);
    },
    onSizeChange: (k) => {
      var _;
      return (_ = i.onShowSizeChange || i.onChange) == null ? void 0 : _(i.current ?? 1, k);
    },
    ...y,
    ...g !== void 0 ? { size: g ? "small" : void 0 } : {},
    small: !1
  };
  return C("div", { class: "sup-table-adapter" }, [
    d,
    C(ka, I)
  ]);
}, Hl = (e, t = {}) => {
  var h;
  const { bordered: n, items: a, value: l, onValueChange: o, attrs: r = {} } = e, { tabExtra: s, cardExtra: i, ...b } = t, f = C(
    An,
    { ...r, modelValue: l, "onUpdate:modelValue": o },
    {
      default: () => a.map((w) => {
        const { tab: S, key: c, ...m } = w;
        return C(On, { ...m, key: c, name: c }, { label: () => S });
      })
    }
  ), v = [C("div", { class: "sup-table-tabs" }, [f, s == null ? void 0 : s()]), (h = b.default) == null ? void 0 : h.call(b)];
  return n ? C(
    In,
    {},
    {
      default: () => v,
      header: b.title || i ? () => {
        var w;
        return [(w = b.title) == null ? void 0 : w.call(b), i == null ? void 0 : i()];
      } : void 0
    }
  ) : v;
}, Gl = {
  table: ".el-table",
  header: ".el-table__header-wrapper",
  footer: ".el-table__footer-wrapper",
  pagination: ".el-pagination",
  empty: ".el-table__empty-block",
  emptyCell: ".el-table__empty-block",
  body: ".el-table__body-wrapper .el-scrollbar__wrap"
};
function Ze(e) {
  var t;
  (t = e == null ? void 0 : e.stopPropagation) == null || t.call(e);
}
function Wl(e, t) {
  return C(Dn, {
    ...e.dropdownProps,
    disabled: e.disabled,
    onCommand: (n) => e.onSelect(n.value)
  }, {
    default: () => t,
    dropdown: () => C(Mn, {}, () => {
      var n;
      return (n = e.menu) == null ? void 0 : n.map((a) => C(
        Pt,
        { key: a.key, command: { value: a.value }, disabled: e.disabled || a.disabled, onClick: Ze },
        () => {
          var l;
          return [(l = a.icon) == null ? void 0 : l.call(a), a.label()];
        }
      ));
    })
  });
}
function Yl(e, t) {
  var o;
  const n = {
    ...e.attrs,
    disabled: e.disabled,
    onClick: (r) => {
      if (Ze(r), !e.menu)
        return e.onClick(r);
    }
  };
  let a = e.render ? e.render(n) : C(we, n, () => {
    var r;
    return [
      !t.labelOnly && ((r = e.icon) == null ? void 0 : r.call(e)),
      (!t.iconOnly || !e.icon) && e.label(),
      e.menu && ue.expand()
    ];
  });
  e.menu && (a = Wl(e, a));
  const l = (o = e.tooltip) == null ? void 0 : o.call(e);
  return C(Pn, { disabled: !l }, {
    content: () => l,
    default: () => C("span", { onClick: Ze }, [a])
  });
}
function Ql(e) {
  const { buttons: t, moreButtons: n, groupProps: a, defaultButtonProps: l } = e, o = e.divider ?? ((a == null ? void 0 : a.direction) !== "vertical" && (!!(l != null && l.link) || (l == null ? void 0 : l.text) === !0)), r = t.flatMap((s, i) => [
    C("span", { key: s.key }, [Yl(s, e)]),
    o && i < t.length - 1 ? C(xa, { direction: "vertical" }) : void 0
  ]);
  return n.length && r.push(C(Dn, {
    onCommand: (s) => s.selected ? s.button.onSelect(s.value) : s.button.onClick()
  }, {
    default: () => C(we, { ...l, onClick: Ze }, e.moreLabel),
    // Element Plus 的 DropdownMenu 只接收 DropdownItem；折叠动作的菜单选项直接列为条目。
    dropdown: () => C(Mn, {}, () => n.flatMap((s) => s.menu ? s.menu.map((i) => C(Pt, {
      key: `${s.key}:${i.key}`,
      command: { button: s, value: i.value, selected: !0 },
      disabled: s.disabled || i.disabled,
      onClick: Ze
    }, () => {
      var b;
      return [s.label(), " / ", (b = i.icon) == null ? void 0 : b.call(i), i.label()];
    })) : [C(Pt, {
      key: s.key,
      command: { button: s, selected: !1 },
      disabled: s.disabled,
      onClick: Ze
    }, () => {
      var i;
      return [(i = s.icon) == null ? void 0 : i.call(s), s.label()];
    })]))
  })), C(En, { ...a, size: o ? 0 : a == null ? void 0 : a.size, class: ["sup-buttons", a == null ? void 0 : a.class] }, () => r);
}
const Xl = Q({
  inheritAttrs: !1,
  props: {
    state: { type: Object, required: !0 }
  },
  setup(e, { slots: t }) {
    const n = _a("upload"), a = $(0), l = /* @__PURE__ */ new Map();
    let o = 0;
    return () => {
      const r = e.state;
      a.value;
      const s = new Set(r.files.map((p) => p.uid));
      l.forEach((p, v) => {
        s.has(v) || l.delete(v);
      });
      const i = r.files.map((p) => (l.has(p.uid) || l.set(p.uid, ++o), {
        name: p.name,
        uid: l.get(p.uid),
        url: p.url || p.thumbUrl || p.objectUrl,
        size: p.size,
        percentage: p.percent ?? 0,
        status: p.status === "waiting" ? "ready" : p.status === "error" ? "fail" : p.status === "uploading" ? "uploading" : "success"
      })), b = (p) => r.files.find((v) => l.get(v.uid) === p.uid), f = r.attrs.listType === "picture-card";
      return C("div", { class: "sup-upload" }, [
        C(Aa, {
          ...r.attrs,
          class: [r.attrs.class, {
            "sup-upload-hide-trigger": r.hideTrigger,
            "sup-upload-no-remove": !r.removable || r.readonly,
            "sup-upload-no-preview": !r.previewable
          }],
          disabled: r.readonly,
          fileList: i,
          showFileList: r.showList,
          limit: void 0,
          autoUpload: !1,
          beforeUpload: () => !1,
          // 不接管原生请求生命周期，避免失败时原生组件移除 Core 文件。
          httpRequest: async () => {
          },
          onChange: async (p) => {
            var v;
            if (!(!p.raw || b(p)))
              try {
                await r.select(p.raw);
              } finally {
                (v = p.url) != null && v.startsWith("blob:") && URL.revokeObjectURL(p.url), a.value++;
              }
          },
          beforeRemove: async (p) => {
            const v = b(p);
            return v && await r.remove(v), !1;
          },
          onPreview: (p) => {
            const v = b(p);
            v && r.previewable && r.preview(v);
          },
          onRemove: void 0,
          onSuccess: void 0,
          onError: void 0,
          onProgress: void 0,
          "onUpdate:fileList": void 0
        }, {
          ...t,
          default: () => {
            var p;
            return r.hideTrigger ? null : ((p = t.default) == null ? void 0 : p.call(t)) ?? (f ? C("div", [ue.add(), r.title()]) : C(we, {}, { default: () => [ue.upload(), r.title()] }));
          },
          // ElUpload 没有下载配置；只在需要扩展操作时使用官方文件插槽。
          ...(t.file || r.downloadable) && {
            file: ({ file: p }) => {
              const v = b(p);
              return v ? t.file ? t.file({ file: v }) : [
                r.attrs.listType !== "text" && r.attrs.listType && r.isImage(v) && p.url ? C("img", { class: n.be("list", "item-thumbnail"), src: p.url, alt: v.name }) : null,
                C("div", { class: n.be("list", "item-info") }, [
                  C(we, { link: !0, disabled: !r.previewable, onClick: () => r.preview(v) }, { default: () => v.name }),
                  v.status === "waiting" && C("span", {}, " 待处理"),
                  v.status === "error" && C("span", { role: "status" }, " 处理失败"),
                  v.status === "uploading" && C(Oa, { percentage: v.percent ?? 0, strokeWidth: 2 })
                ]),
                C("span", { class: f ? n.be("list", "item-actions") : "sup-upload-actions" }, [
                  f && r.previewable && C(we, { link: !0, onClick: () => r.preview(v) }, { default: () => "预览" }),
                  C(we, { link: !0, onClick: () => r.download(v) }, { default: () => "下载" }),
                  r.removable && !r.readonly && C(we, { link: !0, onClick: () => r.remove(v) }, { default: () => "删除" })
                ])
              ] : null;
            }
          },
          tip: () => {
            var p;
            return ((p = t.tip) == null ? void 0 : p.call(t)) ?? (!r.hideTrigger && r.tip && C("div", { class: "sup-upload-tip" }, r.tip));
          }
        }),
        r.readonly && r.showList && !r.files.length && C("div", { class: "sup-upload-tip" }, "暂无附件")
      ]);
    };
  }
}), Zl = (e, t = {}) => C(Xl, { state: e }, t);
async function gn(e, t) {
  try {
    t ? await e.validateField(t.map((n) => n.join("."))) : await e.validate();
  } catch (n) {
    if (!n || typeof n != "object" || n instanceof Error)
      throw n;
    const a = Object.entries(n);
    throw !a.length || !a.every(([, l]) => Array.isArray(l)) ? n : new Ml(
      a.map(([l, o]) => ({
        path: (t == null ? void 0 : t.find((r) => r.join(".") === l)) || l.split("."),
        messages: o.flatMap((r) => r.message ? [r.message] : [])
      })),
      n
    );
  }
}
const Jl = {
  form: {
    service: {
      validate: gn,
      validateField: (e, t) => gn(e, [t]),
      clearValidate: (e) => e.clearValidate()
    },
    component: Ia,
    adaptProps: ({ hideRequiredMark: e, validateTrigger: t, ...n }) => e ? { ...n, hideRequiredAsterisk: !0 } : n
  },
  formItem: {
    defaults: { validateEvent: !0 },
    component: Da,
    adaptProps: ({ name: e, ...t }) => ({ ...t, prop: e == null ? void 0 : e.map(String) })
  },
  row: {
    component: Ma,
    adaptProps: ({ gutter: e, style: t, ...n }) => {
      if (!Array.isArray(e))
        return { ...n, gutter: e, style: t };
      const [a, l] = e;
      return {
        ...n,
        gutter: a,
        // Element Plus 只有水平 gutter，垂直间距用 rowGap 保留 Core 的二维布局语义。
        style: { ...t || {}, rowGap: l ? `${l}px` : void 0 }
      };
    }
  },
  col: {
    component: Ea,
    // ElCol 的默认 span 为 24；auto 显式传 null 才不会生成 el-col-24。
    adaptProps: ({ span: e, flex: t, ...n }) => ae(n, { span: e === "auto" || t !== void 0 ? null : e, style: { flex: t ?? (e === "auto" ? "1 1 0" : void 0) } })
  },
  space: { component: En },
  card: {
    render: ({ state: e }) => {
      var t;
      return C(In, e.attrs, {
        ...e.slots,
        header: e.title || e.extra ? () => {
          var n;
          return C(
            "div",
            {
              class: "sup-titlebar",
              style: { display: "flex", alignItems: "center", justifyContent: "space-between" }
            },
            [e.title && C("div", { class: "sup-title" }, [e.title()]), (n = e.extra) == null ? void 0 : n.call(e)]
          );
        } : (t = e.slots) == null ? void 0 : t.header,
        default: e.content
      });
    }
  },
  tabs: { render: ({ state: e }) => Ll(e) },
  collapse: { render: ({ state: e }) => Ul(e) },
  descriptions: { render: ({ state: e }) => C($l, { state: e }) },
  actionGroup: {
    schemaDefaults: {
      rowButtons: { buttonProps: { text: !0 } },
      ButtonActions: {
        save: { attrs: { type: "primary" } },
        expand: { attrs: { link: !0 } },
        add: { attrs: { type: "primary" } },
        delete: { attrs: { type: "danger" } },
        submit: { attrs: { type: "primary" } },
        search: { attrs: { type: "primary" } }
      }
    },
    render: ({ attrs: e }) => Ql(e)
  },
  tooltip: { component: Pn, adaptProps: ({ title: e, ...t }) => ({ ...t, content: e }) },
  tag: {
    adaptProps: ({ removable: e, onRemove: t, ...n }) => ({ ...n, closable: e, onClose: t }),
    render: ({ attrs: e, slots: t }) => C(Pa, e, { ...t, default: () => {
      var n, a;
      return [(n = t.icon) == null ? void 0 : n.call(t), (a = t.default) == null ? void 0 : a.call(t)];
    } })
  },
  checkableTag: {
    component: ja,
    adaptProps: ({ selected: e, onSelectedChange: t, ...n }) => ({
      ...n,
      checked: e,
      onChange: t
    })
  },
  empty: { component: Ra },
  modal: {
    render: ({ attrs: e, slots: t }) => {
      const {
        visible: n,
        "onUpdate:visible": a,
        afterClose: l,
        footer: o,
        maskClosable: r,
        keyboard: s,
        closable: i,
        centered: b,
        ...f
      } = e, { title: p, footer: v, ...h } = t, w = () => [
        C(we, {
          onClick: async () => {
            var c;
            await ((c = e.onCancel) == null ? void 0 : c.call(e)) !== !1 && (a == null || a(!1));
          }
        }, () => "取 消"),
        C(we, {
          type: "primary",
          loading: e.confirmLoading,
          onClick: () => {
            var S;
            return (S = e.onOk) == null ? void 0 : S.call(e);
          }
        }, () => "确 定")
      ];
      return C(
        jn,
        {
          ...f,
          closeOnClickModal: r ?? f.closeOnClickModal,
          closeOnPressEscape: s ?? f.closeOnPressEscape,
          showClose: i ?? f.showClose,
          alignCenter: b ?? f.alignCenter,
          // 关闭图标、遮罩和 Escape 与底部取消按钮使用同一业务拦截。
          beforeClose: f.beforeClose || (async (S) => {
            var c;
            await ((c = e.onCancel) == null ? void 0 : c.call(e)) !== !1 && S();
          }),
          modelValue: n,
          "onUpdate:modelValue": a,
          onClosed: l
        },
        {
          ...h,
          ...p ? { header: p } : {},
          ...o === null ? {} : { footer: v || w }
        }
      );
    }
  },
  upload: { render: ({ state: e, slots: t }) => Zl(e, t) },
  preview: {
    render: ({ attrs: e }) => e.visible ? C(Ta, {
      urlList: e.images ?? [],
      initialIndex: e.current ?? 0,
      onClose: () => {
        var t;
        return (t = e["onUpdate:visible"]) == null ? void 0 : t.call(e, !1);
      }
    }) : null
  },
  table: { service: { selectors: Gl }, render: ({ attrs: e, slots: t }) => zl(e, t) },
  tableFilter: { render: ({ attrs: e, slots: t }) => Hl(e, t) }
};
function gt(e) {
  return typeof e == "function" ? e() : e;
}
function yn(e, t) {
  var S;
  const n = st({ ...e }), a = $(!1), l = $(!1), o = document.createElement("div"), r = (S = $t()) == null ? void 0 : S.appContext;
  let s = !1, i = !1, b = !1;
  const f = () => {
    var c;
    s || (s = !0, it(null, o), o.remove(), (c = n.afterClose) == null || c.call(n));
  }, p = () => {
    s || i || (i = !0, a.value = !1, b || f());
  }, v = async (c, m = "cancel") => {
    var u, d;
    if (!(l.value || i || s)) {
      l.value = !0;
      try {
        c ? await ((u = n.onOk) == null ? void 0 : u.call(n)) : await ((d = n.onCancel) == null ? void 0 : d.call(n, m)), p();
      } catch {
      } finally {
        l.value = !1;
      }
    }
  }, h = Q(() => () => {
    const {
      title: c,
      content: m,
      icon: u,
      type: d,
      onOk: g,
      onCancel: y,
      afterClose: I,
      okText: A,
      cancelText: k,
      okButtonProps: _,
      cancelButtonProps: x,
      okCancel: O,
      closable: E,
      maskClosable: P,
      keyboard: U,
      centered: B,
      ...j
    } = n, G = u === void 0 ? ue[d] || ue.info : u;
    return C(jn, {
      width: 420,
      ...j,
      modelValue: a.value,
      showClose: E ?? j.showClose ?? !1,
      closeOnClickModal: P ?? j.closeOnClickModal ?? !1,
      closeOnPressEscape: U ?? j.closeOnPressEscape ?? !0,
      alignCenter: B ?? j.alignCenter,
      beforeClose: () => v(!1, "close"),
      onOpen: () => {
        b = !0;
      },
      onClosed: f
    }, {
      header: () => [gt(G), gt(c)],
      default: () => gt(m),
      footer: () => [
        (O ?? t) && C(we, {
          ...x,
          disabled: l.value || (x == null ? void 0 : x.disabled),
          onClick: () => v(!1)
        }, () => k || "取消"),
        C(we, {
          type: "primary",
          ..._,
          loading: l.value || (_ == null ? void 0 : _.loading),
          onClick: () => v(!0)
        }, () => A || "确定")
      ]
    });
  }), w = C(h);
  return w.appContext = r ?? null, document.body.appendChild(o), it(w, o), Ce(() => {
    !s && !i && (a.value = !0);
  }), {
    update(c) {
      !s && !i && Object.assign(n, c);
    },
    destroy: p
  };
}
function ia(e = {}) {
  return Bn(
    co({
      name: "element-plus",
      uiComponents: Jl,
      supportedFields: la,
      fieldSources: Pl,
      adaptFieldProps: Tl,
      fields: Fl,
      fieldComponents: e.components,
      icons: { semantic: ue },
      services: {
        message(t, n) {
          Fa({ type: t, message: gt(n) });
        },
        confirm: (t) => yn(t, !0),
        info: (t) => yn(t, !1)
      }
    }),
    e.overrides
  );
}
const pr = ia();
function vr(e) {
  return e;
}
const er = (e) => {
  var t, n;
  return ((n = (t = se.tableApiSetting) == null ? void 0 : t.resultTransform) == null ? void 0 : n.call(t, e)) || e;
}, wn = (e) => {
  const { currentField: t, sizeField: n } = se.tableApiSetting || {};
  return t || n ? {
    [t || "current"]: e.current,
    [n || "size"]: e.size
  } : e;
};
function tr(e, t, n) {
  const a = N({}), l = $(!1);
  let o = {}, r = 0, s;
  const i = [], b = (g) => i.push(g);
  e.onLoaded && i.push(e.onLoaded);
  const f = async (g) => {
    var y, I, A, k;
    const _ = rt({}, wn(a), o, g), x = ((y = e.beforeQuery) == null ? void 0 : y.call(e, _)) || _, O = (I = e.apis) == null ? void 0 : I.query;
    s == null || s.abort();
    const E = ++r;
    if (!O) {
      s = void 0, l.value = !1;
      return;
    }
    const P = new AbortController();
    s = P, l.value = !0;
    try {
      const U = await O(x, { signal: P.signal });
      if (E !== r || P.signal.aborted)
        return;
      const B = ((A = e.afterQuery) == null ? void 0 : A.call(e, U)) || U, j = er(B);
      if (d.value && !Array.isArray(j) && ((k = j == null ? void 0 : j.records) == null ? void 0 : k.length) === 0 && Number.isFinite(j.total)) {
        const G = Math.max(1, Math.ceil(j.total / (j.size || a.size)));
        if (a.current > G)
          return a.current = G, f({ ...g, ...wn(a) });
      }
      return p(j);
    } finally {
      E === r && (s = void 0, l.value = !1);
    }
  }, p = (g) => (Array.isArray(g) ? (t(g), d.value !== !1 && (a.current = 1, d.value = { ...d.value, total: g.length })) : g != null && g.records && (t(g.records), d.value !== !1 && (a.current = g.current, a.size = g.size, d.value = { ...d.value, total: g.total })), Promise.all(i.map((y) => y(g)))), v = (g, y = a.size) => (a.current = g, a.size = y, f()), h = (g) => (d.value && (a.current = 1), f(g)), w = Va((g) => h(g).catch((y) => {
    (y == null ? void 0 : y.name) !== "AbortError" && console.error(y);
  }), 300, { leading: !1 }), S = () => {
    s == null || s.abort(), s = void 0, r += 1, l.value = !1;
  }, c = {}, m = (g, y) => {
    y === "dynamic" ? o = rt({}, c, g) : (Object.assign(c, g), rt(o, g));
  }, u = () => o, d = $(!1);
  return K(
    () => {
      var g;
      return e.pagination ?? ((g = e.attrs) == null ? void 0 : g.pagination);
    },
    (g) => {
      if (g === !1) {
        d.value = !1;
        return;
      }
      Object.assign(a, { size: (g == null ? void 0 : g.pageSize) || 10, current: (g == null ? void 0 : g.current) || 1 });
      const y = g == null ? void 0 : g.onChange, I = g == null ? void 0 : g.onShowSizeChange;
      d.value = {
        ...g,
        onChange: (A, k) => {
          const _ = v(A, k);
          return y == null || y(A, k), _;
        },
        onShowSizeChange: (A, k) => {
          const _ = v(A, k);
          return I == null || I(A, k), _;
        },
        pageSize: a.size,
        current: a.current
      };
    },
    {
      immediate: !0,
      flush: "sync"
    }
  ), K(a, (g) => {
    d.value && (d.value = { ...d.value, pageSize: g.size, current: g.current });
  }), K(
    () => {
      var g, y;
      return [(g = e.apis) == null ? void 0 : g.query, (n == null ? void 0 : n.value.length) ?? ((y = X(e.dataSource)) == null ? void 0 : y.length), a.current, a.size, d.value === !1];
    },
    ([g, y]) => {
      if (g || !d.value || y === void 0)
        return;
      const I = Math.min(Math.max(1, a.current), Math.max(1, Math.ceil(y / a.size)));
      a.current = I, (d.value.total !== y || d.value.current !== I) && (d.value = { ...d.value, total: y, current: I });
    },
    { immediate: !0 }
  ), {
    goPage: v,
    reload: f,
    throttleRequest: w,
    cancelQuery: S,
    setQueryParams: m,
    getQueryParams: u,
    query: h,
    pagination: d,
    setPageData: p,
    onLoaded: b,
    loading: l
  };
}
function nr(e, t, n) {
  var a;
  const { columns: l, searchForm: o } = e, r = o || e.searchSchema || {}, s = $(), i = r.dataSource || N({}), { buttons: b = {}, searchOnChange: f, limit: p, ...v } = r, h = $(!1), w = [];
  r.subItems.forEach((d) => {
    if (typeof d == "string") {
      const g = l.find((y) => y.field === d);
      g && w.push({
        type: "Input",
        ...Na(g, "span", "disabled", "hidden"),
        editable: !0,
        exclude: []
      });
    } else
      return w.push({ ...d });
  }), p && w.length > p && w.forEach((d, g) => {
    if (g >= p) {
      const y = d.hidden;
      d.hidden = (...I) => !h.value || (y == null ? void 0 : y(...I));
    }
  });
  const S = {
    search() {
      var d;
      n(i), (d = r.onSubmit) == null || d.call(r, ee(i));
    },
    reset(d) {
      s.value.resetFields(d);
    }
  }, c = Array.isArray(b) ? { actions: b } : { ...b };
  c.actions ?? (c.actions = f ? void 0 : ["search", "reset"]), (a = c.actions) != null && a.length && (p && w.length > p && (c.actions = [
    {
      name: "expand",
      onClick: () => h.value = !h.value
    },
    ...c.actions
  ]), w.push({
    type: "InfoSlot",
    align: "right",
    span: "auto",
    render: () => C("div", { style: { display: "flex", justifyContent: "flex-end", width: "100%" } }, [
      C(Me, {
        option: c,
        methods: S,
        effectData: xe({ table: t, form: s, expanded: h })
      })
    ])
  }));
  const m = K(s, () => {
    n(i), f && K(i, n), m();
  });
  return { formNode: () => C(he.Form, {
    option: {
      ...v,
      ignoreRules: !0,
      dataSource: i,
      subItems: w
    },
    ref: s,
    onSubmit: S.search,
    onReset: S.search
  }), formRef: s, ...S, dataSource: i };
}
function ar(e) {
  return !e || !e.getBoundingClientRect ? 0 : e.getBoundingClientRect();
}
function Sn(e) {
  const t = document.documentElement, n = t.scrollLeft, a = t.scrollTop, l = t.clientLeft, o = t.clientTop, r = window.pageXOffset, s = window.pageYOffset, i = ar(e), { left: b, top: f, width: p, height: v } = i, h = (r || n) - (l || 0), w = (s || a) - (o || 0), S = b + r, c = f + s, m = S - h, u = c - w, d = window.document.documentElement.clientWidth, g = window.document.documentElement.clientHeight;
  return {
    left: m,
    top: u,
    right: d - p - m,
    bottom: g - v - u,
    rightIncludeBody: d - m,
    bottomIncludeBody: g - u
  };
}
function or(e, t, n, a) {
  const l = fe("table").selectors, o = (h, w) => w ? h.querySelector(w) : null, r = La(f, 100), s = $({});
  let i = !1;
  const b = () => {
    var h;
    i = !0, a ? window.addEventListener("resize", r, {
      signal: a.signal
    }) : document.addEventListener("redoHeight", r), s.value = (h = e.attrs) == null ? void 0 : h.scroll, K(
      () => {
        var S;
        return [n.value, (S = X(t)) == null ? void 0 : S.length];
      },
      () => {
        r();
      },
      { flush: "post" }
    );
    const w = K(
      n,
      (S) => {
        S && (S.style.overflow = "hidden", new ResizeObserver(() => {
          r();
        }).observe(S), w());
      },
      { immediate: !0, flush: "post" }
    );
  };
  Vt(() => {
    i && document.removeEventListener("redoHeight", r);
  });
  function f() {
    i && Ce(() => {
      v();
    });
  }
  function p(h) {
    s.value = {
      y: h,
      x: "100%"
      // scrollToFirstRowOnChange: true,
    };
  }
  async function v() {
    var h;
    const { maxHeight: w, inheritHeight: S, isFixedHeight: c, resizeHeightOffset: m } = e, u = X(n);
    if (!u)
      return;
    const d = o(u, l.table);
    if (!d)
      return;
    await Ce();
    const g = getComputedStyle(u.parentElement), y = Sn(d), I = Sn(u), A = y.left - I.left, k = (parseInt(g.marginBottom) || 0) + (parseInt(g.paddingBottom) || 0);
    let _ = 0;
    u && S ? _ = I.bottomIncludeBody - I.bottom - (y.top - I.top) : _ = y.bottomIncludeBody - k;
    const x = o(d, l.title), O = (x == null ? void 0 : x.parentElement) === d ? x.offsetHeight ?? 0 : 0, E = o(d, l.header);
    if (!E)
      return;
    let P = 0;
    E && (P = E.offsetHeight);
    let U = 0;
    const B = o(d, l.footer);
    B && B.parentElement === d && (U += B.offsetHeight || 0);
    let j = 0;
    const G = o(u, l.pagination);
    G && (j = G.offsetHeight + 16);
    let Y = Math.ceil(_) - (m || 0) - A - j;
    const q = w || Y - U - O - P - 1;
    if (w && c && (Y = w + U + O + P + 1), c) {
      d.style.height = `${Y}px`, d.style["overflow-y"] = "hidden", S || (u.style.height = "unset");
      const R = o(u, l.wrapper);
      if (R && (R.style.height = "", R.style["overflow-y"] = ""), !(((h = X(t)) == null ? void 0 : h.length) > 0)) {
        if (o(d, l.empty)) {
          const ne = o(d, l.emptyCell);
          ne && (ne.style.height = `${q}px`);
        }
        return;
      }
    }
    if (d.scrollHeight > Y)
      p(q);
    else {
      const R = o(d, l.body);
      R && p(R.scrollHeight <= q ? null : q);
    }
  }
  return { getScrollRef: s, redoHeight: f, debounceRedoHeight: r, listenResize: b };
}
const lr = Q({
  name: "SuperTable",
  inheritAttrs: !1,
  props: {
    dataSource: Array,
    schema: Object
  },
  emits: ["register", "load", "update:dataSource"],
  setup(e, t) {
    const { style: n, class: a, ...l } = t.attrs, o = st({ attrs: l }), r = $([]), s = $(), i = (R) => {
      r.value = R, t.emit("update:dataSource", R), Ue(o.dataSource) && (o.dataSource.value = R);
    };
    Re(() => e.dataSource && i(e.dataSource)), Re(() => o.dataSource && i(X(o.dataSource)));
    const b = $(), f = (R) => {
      se.schemaDiagnostics && ft(R, "table", "SuperTable");
      const { isScanHeight: H, inheritHeight: ne, isFixedHeight: pe, isContainer: ge, ...ye } = ae(
        Z.Table,
        { ...R.attrs },
        { ...o.attrs }
      );
      Object.assign(o, { isScanHeight: H, inheritHeight: ne, isFixedHeight: pe, isContainer: ge }, R, { attrs: ye });
    };
    Re(() => e.schema && f(ee(e.schema)));
    const {
      loading: p,
      pagination: v,
      setPageData: h,
      onLoaded: w,
      goPage: S,
      reload: c,
      query: m,
      throttleRequest: u,
      cancelQuery: d,
      setQueryParams: g,
      getQueryParams: y
    } = tr(o, i, r), { getScrollRef: I, redoHeight: A, listenResize: k } = or(o, r, s), _ = Ie(), x = {
      setOption: f,
      setData: (R) => {
        R && i(R);
      },
      redoHeight: A,
      goPage: S,
      reload: c,
      query: m,
      onLoaded: w,
      resetSearchForm(R) {
        try {
          return b.value.formRef.resetFields(R);
        } catch (H) {
          console.warn(H);
        }
      },
      setPageData: h,
      getQueryParams: y,
      getData: () => r.value,
      dataRef: r,
      searchForm: L(() => {
        var R;
        return (R = b.value) == null ? void 0 : R.formRef;
      }),
      validate: async () => {
        _.value && await fe("form").validate(_.value);
      },
      setColumns: (R) => {
        var H;
        !G && !((H = o.columns) != null && H.length) ? Object.assign(o, { columns: R }) : (Object.assign(o, { columns: R }), q(R));
      }
    }, O = $({ ...x }), E = (R) => {
      Object.assign(O.value, Ve(N(R)), x), t.emit("register", O.value);
    };
    t.emit("register", O.value), t.expose(O.value);
    const P = N({
      reload: c,
      onRegister: E,
      loading: p
    });
    Nt(() => {
      d(), t.emit("register", null);
    }), $e("rootSlots", t.slots);
    const U = $({}), B = $(), j = N({ formData: r, current: r, queryParams: L(y) });
    let G = !1;
    const Y = K(
      o,
      (R) => {
        var H, ne;
        if (!((H = R == null ? void 0 : R.columns) != null && H.length))
          return;
        if (B.value) {
          Y();
          return;
        }
        const { columns: pe, maxHeight: ge, isScanHeight: ye = !0, inheritHeight: me } = R, je = N({
          refData: r,
          listData: Je(pe)
        });
        U.value = nt(o.slots, j, t.slots);
        const He = R.searchForm || R.searchSchema, {
          attrs: { onLoad: Se, ..._e }
        } = ke({ option: R, effectData: j });
        Object.assign(P, _e, { pagination: v }), w((ce) => {
          t.emit("load", ce), Se == null || Se(ce);
        }), He && (b.value = nr(R, O, (ce) => {
          g(ce, "form"), G && u();
        }));
        const Be = R.tabs && R.tabs.field;
        if (R.tabs && Be) {
          const ce = (ne = R.tabs).activeKey ?? (ne.activeKey = $(R.tabs.defaultActiveKey)), D = {};
          K(
            ce,
            (M) => {
              M !== void 0 && (ut(D, Be, M), g(D), G && u());
            },
            { immediate: !0 }
          );
        }
        if (K(
          $(R.params),
          (ce) => {
            g(ce, "dynamic"), G && u();
          },
          { deep: !0, immediate: !0 }
        ), Ce(() => {
          G = !0, o.immediate !== !1 && u();
        }), ye || me || ge) {
          k(), P.scroll = I;
          const { onChange: ce, onExpandedRowsChange: D } = P;
          P.onChange = (...M) => {
            ce == null || ce(...M);
          }, P.onExpandedRowsChange = (M) => {
            D == null || D(M), A();
          }, K(r, A);
        }
        const Ae = () => C(he.Table, { option: o, effectData: j, model: je, ...P }, U.value);
        o.editable ? B.value = () => z("form")({ model: r.value, ref: _ }, { default: Ae }) : B.value = Ae;
      },
      {
        immediate: !0
      }
    ), q = (R) => {
      const H = N({
        refData: r,
        listData: Je(R)
      }), ne = Symbol(), pe = () => C(he.Table, { option: o, effectData: j, model: H, key: ne, ...P }, U.value);
      o.editable ? B.value = () => z("form")({ model: r.value, ref: _ }, { default: pe }) : B.value = pe;
    };
    return () => B.value && C(
      Kt,
      { name: "exaProvider", data: { data: r } },
      () => {
        var R, H;
        return !b.value || (R = o.searchForm) != null && R.teleport ? C(
          "div",
          ae(
            {
              ref: s,
              class: [o.isContainer && "sup-container", "sup-table", "sup-form-section"]
            },
            {
              class: a,
              style: n
            }
          ),
          [
            ((H = o.searchForm) == null ? void 0 : H.teleport) && C(
              fa,
              { to: o.searchForm.teleport },
              C("div", { class: "sup-form-section sup-table-search" }, C(b.value.formNode))
            ),
            B.value()
          ]
        ) : C(
          "div",
          ae(
            { ref: s, class: [o.isContainer && "sup-container", "sup-table"] },
            { class: a, style: n }
          ),
          [
            C("div", { class: "sup-form-section sup-table-search" }, C(b.value.formNode)),
            C("div", { class: "sup-form-section section-last" }, C(B.value))
          ]
        );
      }
    );
  }
}), mr = (e, t) => {
  const [n, a] = Wn(), l = Promise.resolve(typeof e == "function" ? e() : e), o = (s) => {
    if (s)
      n.value || (l.then(s.setOption), t && s.setData(t)), n.value = s;
    else if (s === null)
      n.value = void 0;
    else
      return (i, b) => C(lr, { ...i, onRegister: o }, b == null ? void 0 : b.slots);
  }, r = async (s, ...i) => {
    const b = await a();
    if (s && s in b)
      return typeof b[s] == "function" ? b[s](...i) : b[s];
  };
  return [
    o,
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
        return oe((s = n.value) == null ? void 0 : s.dataRef);
      },
      dataSource: L(() => {
        var s;
        return (s = n.value) == null ? void 0 : s.dataRef;
      }),
      /** 跳转到指定页 */
      goPage(s) {
        return r("goPage", s);
      },
      /** 设置表格列 */
      setColumns(s) {
        r("setColumns", s);
      },
      /** 刷新数据，不改动查询条件与当前页 */
      reload() {
        return r("reload");
      },
      /** 手动执行条件查询，不覆盖搜索表单参数 */
      query(s) {
        return r("query", s);
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
      selectedRowKeys: L(() => {
        var s;
        return (s = n.value) == null ? void 0 : s.selectedRowKeys;
      }),
      selectedRows: L(() => {
        var s;
        return (s = n.value) == null ? void 0 : s.selectedRows;
      }),
      /** 设置选中行 */
      setSelectedRows: (s) => {
        var i;
        return (i = n.value) == null ? void 0 : i.setSelectedRows(s);
      },
      expandedRowKeys: L(() => {
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
function br(e) {
  return e;
}
const rr = Q({
  props: {
    align: String,
    divider: { type: Boolean, default: void 0 },
    moreLabel: [String, Function, Object],
    attrs: Object,
    methods: Object,
    visibleIn: String,
    validOn: String,
    roleMode: String,
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
    const a = (n = t.default) == null ? void 0 : n.call(t), { effectData: l, ...o } = e, r = a ? a.flatMap(({ children: s, props: i = {} }) => {
      const { roleName: b, onClick: f, confirmText: p, tooltip: v, disabledTooltip: h, icon: w, ...S } = $a(
        i,
        (c, m) => Ba(m)
      );
      return !f || !s ? [] : {
        label: s.default || s,
        icon: w,
        tooltip: v,
        disabledTooltip: h,
        roleName: b,
        onClick: f,
        confirmText: p,
        attrs: S
      };
    }) : e.actions;
    return () => C("div", {
      style: { display: "flex", justifyContent: { left: "flex-start", center: "center", right: "flex-end" }[e.align || "left"] }
    }, [C(Me, { option: { ...o, actions: r }, effectData: l })]);
  }
});
function hr(e) {
  return [() => C(rr, e)];
}
const sr = Q({
  props: {
    dataSource: Object,
    schema: Object
  },
  emits: ["register"],
  setup(e, t) {
    const n = Ie(e.schema || {}), a = $({});
    K(
      () => e.schema,
      (r) => {
        se.schemaDiagnostics && r && ft(r, "detail", "SuperDetail"), n.value = r || {};
      },
      { immediate: !0 }
    ), K(
      () => X(e.dataSource ?? n.value.dataSource),
      (r) => {
        r != null && (a.value = r);
      },
      { immediate: !0 }
    );
    const l = {
      setOption: (r) => {
        se.schemaDiagnostics && ft(r, "detail", "SuperDetail"), n.value = r;
      },
      setData: (r) => {
        a.value = r;
      }
    }, o = $();
    return K(
      n,
      (r) => {
        if (!(r != null && r.subItems)) {
          o.value = void 0;
          return;
        }
        const s = Je(r.subItems, a);
        o.value = s.modelsMap;
      },
      { immediate: !0 }
    ), t.expose(l), t.emit("register", l), $e("exaProvider", Cn({ data: a })), $e("rootSlots", t.slots), () => o.value && C(
      "div",
      { class: ["sup-detail", n.value.isContainer && "sup-container"] },
      C(Le, {
        option: {
          type: "Descriptions",
          ...n.value
        },
        ...n.value.attrs,
        ...n.value.descriptionsProps,
        modelsMap: o.value,
        isRoot: !0
      })
    );
  }
});
function gr(e, t) {
  const n = le(t), a = $(), l = Promise.resolve(typeof e == "function" ? e() : e), o = (r) => {
    if (r)
      a.value || (l.then(r.setOption), n.value && K(
        n,
        (s) => {
          r.setData(s);
        },
        { immediate: !0 }
      )), a.value = r;
    else
      return (s) => C(sr, { ...s, onRegister: o }, pa());
  };
  return [
    o,
    {
      setData(r) {
        a.value ? a.value.setData(r) : n.value = r;
      }
    }
  ];
}
function yr(e) {
  return e;
}
const ir = El(
  "superform-element-plus",
  (e) => ia({ components: e })
), wr = ir, Sr = {
  Input: bt,
  TextArea: bt,
  InputPassword: bt,
  InputSearch: bt,
  InputNumber: Ua,
  InputOtp: qa,
  InputTag: za,
  Autocomplete: Ka,
  Mention: Ha,
  Select: Ga,
  SelectV2: Wa,
  Cascader: Ya,
  TreeSelect: Qa,
  Radio: Xa,
  RadioGroup: Za,
  Checkbox: Ja,
  CheckboxGroup: eo,
  Switch: to,
  DatePicker: Qt,
  DateRangePicker: Qt,
  TimePicker: Xt,
  TimeRangePicker: Xt,
  TimeSelect: no,
  ColorPicker: ao,
  Rate: oo,
  Slider: lo,
  Segmented: ro,
  Transfer: so
};
export {
  Ml as FormValidationError,
  rr as SuperButtons,
  sr as SuperDetail,
  zo as SuperForm,
  lr as SuperTable,
  Ol as configure,
  ia as createElementPlusAdapter,
  Ht as createModal,
  wr as default,
  yr as defineDetail,
  vr as defineForm,
  br as defineTable,
  co as defineUIAdapter,
  Do as diagnoseSchema,
  pr as elementPlusAdapter,
  Fl as elementPlusFields,
  Sr as fieldComponents,
  fr as registerAutoImportedComponents,
  Il as registerComponent,
  Dl as registerComponents,
  Al as useAdapter,
  hr as useButtons,
  gr as useDetail,
  Ko as useForm,
  Xn as useModal,
  dr as useModalForm,
  mr as useTable
};
