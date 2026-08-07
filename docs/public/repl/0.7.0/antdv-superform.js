import { h as y, inject as Ce, reactive as q, ref as P, isRef as Je, watchEffect as Ke, computed as H, toValue as ve, toRef as me, watch as U, unref as R, toRefs as je, mergeProps as Z, markRaw as ds, createVNode as fe, defineComponent as W, openBlock as $, createBlock as z, withModifiers as fs, withCtx as te, createElementBlock as pe, Fragment as Se, renderList as Fe, createSlots as Bt, resolveDynamicComponent as we, normalizeProps as gt, guardReactiveProps as kt, createCommentVNode as Ae, provide as Ve, toRaw as re, readonly as yn, useAttrs as Sn, onMounted as On, shallowReactive as St, getCurrentInstance as wn, onUnmounted as Ot, nextTick as $e, render as Tt, watchPostEffect as Cn, renderSlot as ps, shallowRef as vt, createTextVNode as Pt, toDisplayString as ht, Teleport as ms, useSlots as bs } from "vue";
import { isObject as pt, isArrayLike as gs, isIndex as vs, eq as Et, baseRest as xn, toString as wt, hasUnicode as hs, stringToArray as ys, castSlice as Ss, keysIn as qt, baseAssignValue as Dn, copyObject as Os, isArray as it, isBuffer as ws, isTypedArray as Cs, isArrayLikeObject as xs, copyArray as Ds, cloneBuffer as As, cloneTypedArray as Is, isPlainObject as he, isArguments as Qt, isFunction as ze, initCloneObject as Rs, baseFor as Ms, Stack as js, identity as ks, isObjectLike as Ts, baseGetTag as Ps, baseIteratee as _s, baseForOwn as Fs, baseSet as An, debounce as In, baseGet as $s, get as Be, cloneDeep as Xe, Tag as Rn, AntdIcon as Ut, Tooltip as yt, InfoCircleOutlined as Ns, Modal as Ct, Space as xt, Dropdown as Jt, Menu as Xt, MenuItem as en, Button as ot, DownOutlined as Mn, Divider as Ls, EllipsisOutlined as Vs, uniq as Bs, index as Es, Card as qs, CheckableTag as Us, Checkbox as zs, CheckboxGroup as Hs, Col as xe, Collapse as Ks, CollapsePanel as Gs, DatePicker as Ws, Descriptions as Ys, DescriptionsItem as Zs, Form as jn, FormItem as Qs, Input as Js, Group as Xs, index$1 as ea, Search as ta, List as na, Item as sa, Radio as kn, RadioButton as Tn, Group$1 as aa, RangePicker as ra, Row as Ee, VcSelect as oa, index$2 as la, TabPane as ia, index$3 as ua, Tabs as ca, TextArea as da, TimePicker as fa, TimeRangePicker as pa, index$4 as ma, Upload as Pn, message as zt, FormItemRest as ba, PlusOutlined as Dt, ConfigProvider as ga, Image as tn, LoadingOutlined as va, PaperClipOutlined as ha, CloseCircleOutlined as ya, omit as Sa, UpOutlined as Oa } from "./antd.js";
function _n(e, n, t) {
  if (!pt(t))
    return !1;
  var a = typeof n;
  return (a == "number" ? gs(t) && vs(n, t.length) : a == "string" && n in t) ? Et(t[n], e) : !1;
}
function Fn(e) {
  return xn(function(n, t) {
    var a = -1, s = t.length, r = s > 1 ? t[s - 1] : void 0, l = s > 2 ? t[2] : void 0;
    for (r = e.length > 3 && typeof r == "function" ? (s--, r) : void 0, l && _n(t[0], t[1], l) && (r = s < 3 ? void 0 : r, s = 1), n = Object(n); ++a < s; ) {
      var o = t[a];
      o && e(n, o, a, r);
    }
    return n;
  });
}
function wa(e) {
  return function(n) {
    n = wt(n);
    var t = hs(n) ? ys(n) : void 0, a = t ? t[0] : n.charAt(0), s = t ? Ss(t, 1).join("") : n.slice(1);
    return a[e]() + s;
  };
}
var Ca = wa("toUpperCase");
const xa = Ca;
function Da(e) {
  return xa(wt(e).toLowerCase());
}
function Aa(e, n, t, a) {
  var s = -1, r = e == null ? 0 : e.length;
  for (a && r && (t = e[++s]); ++s < r; )
    t = n(t, e[s], s, e);
  return t;
}
function Ia(e) {
  return function(n) {
    return e == null ? void 0 : e[n];
  };
}
var Ra = {
  // Latin-1 Supplement block.
  À: "A",
  Á: "A",
  Â: "A",
  Ã: "A",
  Ä: "A",
  Å: "A",
  à: "a",
  á: "a",
  â: "a",
  ã: "a",
  ä: "a",
  å: "a",
  Ç: "C",
  ç: "c",
  Ð: "D",
  ð: "d",
  È: "E",
  É: "E",
  Ê: "E",
  Ë: "E",
  è: "e",
  é: "e",
  ê: "e",
  ë: "e",
  Ì: "I",
  Í: "I",
  Î: "I",
  Ï: "I",
  ì: "i",
  í: "i",
  î: "i",
  ï: "i",
  Ñ: "N",
  ñ: "n",
  Ò: "O",
  Ó: "O",
  Ô: "O",
  Õ: "O",
  Ö: "O",
  Ø: "O",
  ò: "o",
  ó: "o",
  ô: "o",
  õ: "o",
  ö: "o",
  ø: "o",
  Ù: "U",
  Ú: "U",
  Û: "U",
  Ü: "U",
  ù: "u",
  ú: "u",
  û: "u",
  ü: "u",
  Ý: "Y",
  ý: "y",
  ÿ: "y",
  Æ: "Ae",
  æ: "ae",
  Þ: "Th",
  þ: "th",
  ß: "ss",
  // Latin Extended-A block.
  Ā: "A",
  Ă: "A",
  Ą: "A",
  ā: "a",
  ă: "a",
  ą: "a",
  Ć: "C",
  Ĉ: "C",
  Ċ: "C",
  Č: "C",
  ć: "c",
  ĉ: "c",
  ċ: "c",
  č: "c",
  Ď: "D",
  Đ: "D",
  ď: "d",
  đ: "d",
  Ē: "E",
  Ĕ: "E",
  Ė: "E",
  Ę: "E",
  Ě: "E",
  ē: "e",
  ĕ: "e",
  ė: "e",
  ę: "e",
  ě: "e",
  Ĝ: "G",
  Ğ: "G",
  Ġ: "G",
  Ģ: "G",
  ĝ: "g",
  ğ: "g",
  ġ: "g",
  ģ: "g",
  Ĥ: "H",
  Ħ: "H",
  ĥ: "h",
  ħ: "h",
  Ĩ: "I",
  Ī: "I",
  Ĭ: "I",
  Į: "I",
  İ: "I",
  ĩ: "i",
  ī: "i",
  ĭ: "i",
  į: "i",
  ı: "i",
  Ĵ: "J",
  ĵ: "j",
  Ķ: "K",
  ķ: "k",
  ĸ: "k",
  Ĺ: "L",
  Ļ: "L",
  Ľ: "L",
  Ŀ: "L",
  Ł: "L",
  ĺ: "l",
  ļ: "l",
  ľ: "l",
  ŀ: "l",
  ł: "l",
  Ń: "N",
  Ņ: "N",
  Ň: "N",
  Ŋ: "N",
  ń: "n",
  ņ: "n",
  ň: "n",
  ŋ: "n",
  Ō: "O",
  Ŏ: "O",
  Ő: "O",
  ō: "o",
  ŏ: "o",
  ő: "o",
  Ŕ: "R",
  Ŗ: "R",
  Ř: "R",
  ŕ: "r",
  ŗ: "r",
  ř: "r",
  Ś: "S",
  Ŝ: "S",
  Ş: "S",
  Š: "S",
  ś: "s",
  ŝ: "s",
  ş: "s",
  š: "s",
  Ţ: "T",
  Ť: "T",
  Ŧ: "T",
  ţ: "t",
  ť: "t",
  ŧ: "t",
  Ũ: "U",
  Ū: "U",
  Ŭ: "U",
  Ů: "U",
  Ű: "U",
  Ų: "U",
  ũ: "u",
  ū: "u",
  ŭ: "u",
  ů: "u",
  ű: "u",
  ų: "u",
  Ŵ: "W",
  ŵ: "w",
  Ŷ: "Y",
  ŷ: "y",
  Ÿ: "Y",
  Ź: "Z",
  Ż: "Z",
  Ž: "Z",
  ź: "z",
  ż: "z",
  ž: "z",
  Ĳ: "IJ",
  ĳ: "ij",
  Œ: "Oe",
  œ: "oe",
  ŉ: "'n",
  ſ: "s"
}, Ma = Ia(Ra);
const ja = Ma;
var ka = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g, Ta = "\\u0300-\\u036f", Pa = "\\ufe20-\\ufe2f", _a = "\\u20d0-\\u20ff", Fa = Ta + Pa + _a, $a = "[" + Fa + "]", Na = RegExp($a, "g");
function La(e) {
  return e = wt(e), e && e.replace(ka, ja).replace(Na, "");
}
var Va = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g;
function Ba(e) {
  return e.match(Va) || [];
}
var Ea = /[a-z][A-Z]|[A-Z]{2}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/;
function qa(e) {
  return Ea.test(e);
}
var $n = "\\ud800-\\udfff", Ua = "\\u0300-\\u036f", za = "\\ufe20-\\ufe2f", Ha = "\\u20d0-\\u20ff", Ka = Ua + za + Ha, Nn = "\\u2700-\\u27bf", Ln = "a-z\\xdf-\\xf6\\xf8-\\xff", Ga = "\\xac\\xb1\\xd7\\xf7", Wa = "\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf", Ya = "\\u2000-\\u206f", Za = " \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000", Vn = "A-Z\\xc0-\\xd6\\xd8-\\xde", Qa = "\\ufe0e\\ufe0f", Bn = Ga + Wa + Ya + Za, En = "['’]", nn = "[" + Bn + "]", Ja = "[" + Ka + "]", qn = "\\d+", Xa = "[" + Nn + "]", Un = "[" + Ln + "]", zn = "[^" + $n + Bn + qn + Nn + Ln + Vn + "]", er = "\\ud83c[\\udffb-\\udfff]", tr = "(?:" + Ja + "|" + er + ")", nr = "[^" + $n + "]", Hn = "(?:\\ud83c[\\udde6-\\uddff]){2}", Kn = "[\\ud800-\\udbff][\\udc00-\\udfff]", Ze = "[" + Vn + "]", sr = "\\u200d", sn = "(?:" + Un + "|" + zn + ")", ar = "(?:" + Ze + "|" + zn + ")", an = "(?:" + En + "(?:d|ll|m|re|s|t|ve))?", rn = "(?:" + En + "(?:D|LL|M|RE|S|T|VE))?", Gn = tr + "?", Wn = "[" + Qa + "]?", rr = "(?:" + sr + "(?:" + [nr, Hn, Kn].join("|") + ")" + Wn + Gn + ")*", or = "\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])", lr = "\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])", ir = Wn + Gn + rr, ur = "(?:" + [Xa, Hn, Kn].join("|") + ")" + ir, cr = RegExp([
  Ze + "?" + Un + "+" + an + "(?=" + [nn, Ze, "$"].join("|") + ")",
  ar + "+" + rn + "(?=" + [nn, Ze + sn, "$"].join("|") + ")",
  Ze + "?" + sn + "+" + an,
  Ze + "+" + rn,
  lr,
  or,
  qn,
  ur
].join("|"), "g");
function dr(e) {
  return e.match(cr) || [];
}
function fr(e, n, t) {
  return e = wt(e), n = t ? void 0 : n, n === void 0 ? qa(e) ? dr(e) : Ba(e) : e.match(n) || [];
}
var pr = "['’]", mr = RegExp(pr, "g");
function br(e) {
  return function(n) {
    return Aa(fr(La(n).replace(mr, "")), e, "");
  };
}
var gr = br(function(e, n, t) {
  return n = n.toLowerCase(), e + (t ? Da(n) : n);
});
const vr = gr;
var Yn = Object.prototype, hr = Yn.hasOwnProperty, yr = xn(function(e, n) {
  e = Object(e);
  var t = -1, a = n.length, s = a > 2 ? n[2] : void 0;
  for (s && _n(n[0], n[1], s) && (a = 1); ++t < a; )
    for (var r = n[t], l = qt(r), o = -1, i = l.length; ++o < i; ) {
      var u = l[o], b = e[u];
      (b === void 0 || Et(b, Yn[u]) && !hr.call(e, u)) && (e[u] = r[u]);
    }
  return e;
});
const qe = yr;
function _t(e, n, t) {
  (t !== void 0 && !Et(e[n], t) || t === void 0 && !(n in e)) && Dn(e, n, t);
}
function Ft(e, n) {
  if (!(n === "constructor" && typeof e[n] == "function") && n != "__proto__")
    return e[n];
}
function Sr(e) {
  return Os(e, qt(e));
}
function Or(e, n, t, a, s, r, l) {
  var o = Ft(e, t), i = Ft(n, t), u = l.get(i);
  if (u) {
    _t(e, t, u);
    return;
  }
  var b = r ? r(o, i, t + "", e, n, l) : void 0, m = b === void 0;
  if (m) {
    var v = it(i), h = !v && ws(i), f = !v && !h && Cs(i);
    b = i, v || h || f ? it(o) ? b = o : xs(o) ? b = Ds(o) : h ? (m = !1, b = As(i, !0)) : f ? (m = !1, b = Is(i, !0)) : b = [] : he(i) || Qt(i) ? (b = o, Qt(o) ? b = Sr(o) : (!pt(o) || ze(o)) && (b = Rs(i))) : m = !1;
  }
  m && (l.set(i, b), s(b, i, a, r, l), l.delete(i)), _t(e, t, b);
}
function Ht(e, n, t, a, s) {
  e !== n && Ms(n, function(r, l) {
    if (s || (s = new js()), pt(r))
      Or(e, n, l, t, Ht, a, s);
    else {
      var o = a ? a(Ft(e, l), r, l + "", e, n, s) : void 0;
      o === void 0 && (o = r), _t(e, l, o);
    }
  }, qt);
}
var wr = Fn(function(e, n, t, a) {
  Ht(e, n, t, a);
});
const Cr = wr;
function xr(e) {
  return typeof e == "function" ? e : ks;
}
var Dr = "[object String]";
function Ar(e) {
  return typeof e == "string" || !it(e) && Ts(e) && Ps(e) == Dr;
}
function Ir(e, n) {
  var t = {};
  return n = _s(n), Fs(e, function(a, s, r) {
    Dn(t, n(a, s, r), a);
  }), t;
}
var Rr = Fn(function(e, n, t) {
  Ht(e, n, t);
});
const At = Rr;
function ut(e, n, t) {
  return e == null ? e : An(e, n, t);
}
var Mr = "Expected a function";
function $t(e, n, t) {
  var a = !0, s = !0;
  if (typeof e != "function")
    throw new TypeError(Mr);
  return pt(t) && (a = "leading" in t ? !!t.leading : a, s = "trailing" in t ? !!t.trailing : s), In(e, n, {
    leading: a,
    maxWait: n,
    trailing: s
  });
}
function jr(e, n, t, a) {
  return An(e, n, t($s(e, n)), a);
}
function kr(e, n, t) {
  return e == null ? e : jr(e, n, xr(t));
}
function Pe(e) {
  var n;
  return typeof e == "string" ? ((n = ie.customIcon) == null ? void 0 : n.call(ie, e)) || y("span", { class: "anticon " + e }) : e && y(e);
}
function Re(e) {
  const n = Ce("exaProvider", {}).data;
  return q({ ...e || {}, formData: n });
}
function ct(e, n) {
  const t = P(Je(e) ? e : !!e);
  return typeof e == "function" && Ke(() => {
    t.value = e(n);
  }), t;
}
function on(e, n) {
  return ct(e, n);
}
function Nt(e, n) {
  const t = q({});
  return e && Ke(() => {
    Object.assign(t, e(n));
  }), t;
}
function Tr(e = {}, n) {
  const t = {};
  return Object.keys(e).forEach((a) => {
    !e[a] || a === "onUpdate" || (a.match(/^on[A-Z]/) ? t[a] = (...s) => e[a](n, ...s) : a === "on" && Object.entries(e.on).forEach(([s, r]) => {
      const l = "on" + s.charAt(0).toUpperCase() + s.slice(1);
      t[l] = (...o) => r(n, ...o);
    }));
  }), t;
}
function Zn({ option: e, model: n, effectData: t }, a) {
  const {
    type: s,
    field: r,
    endField: l,
    keepField: o,
    labelField: i,
    stringifyValue: u,
    valueToString: b,
    computed: m,
    value: v,
    onUpdate: h
  } = e, f = l ?? o, d = u ?? b, p = {}, O = e.vModelFields || {};
  if (i && (p.labelValue = H(() => Be(n.parent, i)), p["onUpdate:labelValue"] = (w) => {
    const x = d ? w == null ? void 0 : w.toString() : w;
    ut(n.parent, i, x);
  }), Object.entries(O).forEach(([w, x]) => {
    var A;
    typeof x == "string" ? ((A = n.parent)[x] ?? (A[x] = void 0), p[w] = H(() => Be(n.parent, x)), p[`onUpdate:${w}`] = (I) => {
      ut(n.parent, x, I);
    }) : Je(x) ? (p[w] = x, p[`onUpdate:${w}`] = (I) => x.value = I) : p[w] = x;
  }), !r)
    return Je(v) && Object.assign(p, {
      value: v,
      "onUpdate:value": (w) => v.value = w
    }), p;
  a !== void 0 && (n.refData ?? (n.refData = ve(a)));
  const c = me(n, "refData"), g = P(), S = (w = ve(a)) => {
    g.value = w, c.value !== w && a !== void 0 && (c.value = w);
  };
  Object.assign(p, {
    value: g,
    "onUpdate:value": S
  }), Je(v) && (U(c, (w) => v.value = w), U(v, S));
  let C = ve(n.refData), D;
  if (s.endsWith("Range") && f)
    g.value = [c.value, n.parent[f]], D = (w) => {
      const [x, A] = w || [];
      c.value = x, C = x, n.parent[f] = A;
    }, U([c, () => n.parent[f]], (w) => {
      g.value = w;
    });
  else if (d) {
    const w = (x) => (x == null ? void 0 : x.toString().split(",")) || [];
    g.value = w(c.value), D = (x) => {
      const A = (x == null ? void 0 : x.toString()) || "";
      c.value = A, C = A;
    }, U(c, (x) => {
      x !== C && (g.value = w(x));
    });
  } else
    g.value = C, D = (w) => {
      c.value = w, C = w;
    }, U(c, S, { flush: "sync" });
  return U(g, D, { flush: "sync" }), h && U(c, () => h(t)), m && U(
    // 使用ref让计算结果即使一样也会进行后面的赋值
    () => P(m(C, t)),
    (w) => D(R(w)),
    { immediate: !0 }
  ), p;
}
function Ie({ option: e, effectData: n, inheritDisabled: t }) {
  const { type: a, dynamicAttrs: s, disabled: r, hidden: l, required: o } = e, i = ct(l, n), u = ct(o, n), b = t === void 0 && r === void 0 ? void 0 : H(() => {
    let d = ve(t);
    return d || (typeof r == "function" ? d = !!r(n) : d = ve(r)), d;
  }), m = Tr(e, n), v = typeof s == "function" ? { ...je(Nt(s, n)) } : {}, h = Z({ ...oe[a] }, { ...e.attrs }, m, v);
  return { attrs: At({}, e.attrs, h, { disabled: b }), hidden: i, required: u };
}
function ln(e, n = {}) {
  const t = new RegExp("{(\\w*)}", "g");
  return e.replace(t, (a, s) => n[s] || "");
}
const un = {
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
}, cn = {
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
function Pr(e, n, t, a) {
  let s;
  if (n)
    s = { type: e, len: n, message: "len" };
  else if (!isNaN(t) && !isNaN(a))
    s = { type: e, max: t, min: a, message: "range" };
  else if (!isNaN(t))
    s = { type: e, max: t, message: "max" };
  else if (!isNaN(a))
    s = { type: e, min: a, message: "min" };
  else
    return !1;
  return e === "number" ? (s.message = cn.number[s.message], s.transform = (r) => Number(r)) : s.message = cn.string[s.message], s;
}
function _r(e, n = "") {
  const { trigger: t, required: a, type: s = "string", len: r, max: l, min: o, pattern: i, validator: u, message: b } = e || {}, m = [];
  a && (s === "string" || s in un ? m.push({
    required: a,
    trigger: t,
    // validator: noEmpty,
    pattern: /^[\s\S]*.*[^\s][\s\S]*$/,
    // transform: (value) => value + '',
    // whitespace: true,
    message: b || `${n}不能为空！`
  }) : m.push({ required: a, trigger: t, message: b || `${n}不能为空！` }));
  const v = un[s];
  if (v) {
    const h = ln(v.message, { label: n });
    m.push({ ...v, trigger: t, message: h });
  }
  if (i && m.push({ pattern: i, trigger: t, message: b }), r || !isNaN(Number(l)) || !isNaN(Number(o))) {
    const h = Pr(s, r, l, o), f = ln(h.message, { label: n, len: r, max: l, min: o });
    m.push({ ...h, trigger: t, message: f, type: s });
  }
  return u && m.push({ validator: u, trigger: t }), m;
}
function Qn(e, n, t) {
  const { field: a, columns: s, subItems: r, initialValue: l, value: o } = e, i = e.endField ?? e.keepField ?? e.labelField, u = a ? a.split(".") : [], b = t.concat(u), m = u.splice(-1)[0], v = q({
    refName: m,
    initialValue: l,
    fieldName: a,
    origin: n,
    parent: n,
    refData: n,
    propChain: b
  });
  return m ? (u.length && (v.parent = H(() => Be(n.value, u))), v.refData = H({
    get: () => Be(n.value, a),
    set: (h) => ut(n.value, a, h)
  }), U(
    n,
    () => {
      v.refData ?? (v.refData = ve(l) ?? ve(o) ?? (s && [] || r && {})), i && kr(v.parent, i, (h) => h);
    },
    { immediate: !0, flush: "sync" }
  )) : o && (v.refData = P(o), v.propChain = []), v;
}
const It = (e, n) => e == null ? void 0 : e.map((t) => t.validator ? { ...t, validator: async (s, ...r) => {
  const l = await t.validator({ ...s, ...n }, ...r);
  if (l === !1 || l instanceof Error)
    throw l;
} } : t);
function et(e, n, t = []) {
  const a = me(n || {}), s = {}, r = /* @__PURE__ */ new Map();
  return e.forEach((l) => {
    if (typeof l != "object")
      return;
    const o = Qn(l, a, t), { required: i, label: u, subItems: b, columns: m } = l;
    if ((l.rules || i) && o.propChain.length) {
      const v = l.rules || [], h = Array.isArray(v) ? v : [v];
      if (i) {
        const d = h[0];
        d ? d.required = i : h.push({ required: i });
      }
      let f = "string";
      if (o.refData) {
        const d = typeof o.refData;
        f = d === "object" && Array.isArray(o.refData) ? "array" : d;
      }
      o.rules = h.map((d) => _r({ type: f, ...d }, u)).flat(), s[o.propChain.join(".")] = o.rules;
    }
    if (b) {
      const v = et(b, me(o, "refData"), o.propChain);
      Object.assign(s, v.rules), o.children = v.modelsMap;
    } else
      m && (o.listData = et(m));
    r.set(ds(l), o);
  }), {
    rules: s,
    modelsMap: r
  };
}
function nt(e, n, t = [], a) {
  const s = me(n || {}), r = {}, l = [...e].map(([o, i]) => {
    const { children: u, rules: b, listData: m } = i, v = a !== void 0 ? [...t, a] : t, h = Qn(o, s, v);
    if (a !== void 0 && (h.index = a), h.rules = b, h.propChain.length && b && (r[h.propChain.join(".")] = b), u) {
      const { modelsMap: f, rules: d } = nt(u, me(h, "refData"), h.propChain);
      Object.assign(r, d), h.children = f;
    }
    return m && (h.listData = m), [o, h];
  });
  return { modelsMap: new Map(l), rules: r };
}
function Jn(e, n, t, a) {
  const { modelsMap: s, rules: r } = nt(e, n, t, a), l = [];
  return function o(i) {
    for (const [u, b] of i)
      l.push([u, b]), b.children && o(b.children);
  }(s), { modelsMap: new Map(l), rules: r };
}
const Fr = (e, n) => Object.prototype.hasOwnProperty.call(e, n);
function Kt(e, n = {}, t = {}) {
  for (const [a, s] of Object.entries(e))
    Array.isArray(s) ? e[a] = Xe((n == null ? void 0 : n[a]) ?? (t == null ? void 0 : t[a])) : Object.prototype.toString.call(s) === "[object Object]" ? Kt(s, n == null ? void 0 : n[a], t == null ? void 0 : t[a]) : e[a] = (n == null ? void 0 : n[a]) ?? (t == null ? void 0 : t[a]);
}
function Xn(e, n, t = {}) {
  for (const [a, s] of Object.entries(e)) {
    if (!Fr(n, a))
      continue;
    const r = n[a] ?? (t == null ? void 0 : t[a]);
    he(s) && he(r) ? Xn(s, r, t == null ? void 0 : t[a]) : Array.isArray(r) || he(r) ? e[a] = Xe(r) : e[a] = r;
  }
}
function dn() {
  let e;
  return { promise: new Promise((t) => {
    e = t;
  }), resolve: e };
}
function es() {
  const e = P();
  let n = dn(), t = !0;
  return U(e, (s) => {
    s ? (n.resolve(!0), t = !1) : t || (n = dn(), t = !0);
  }), [e, () => n.promise.then(() => e.value)];
}
function ae(e, n = {}) {
  return e ? typeof e == "function" ? e(n || {}, {}) : typeof e != "object" ? y("span", e) : y(e, { effectData: n }) : null;
}
function st(e, n, t) {
  const a = t || Ce("rootSlots", {}), s = {};
  return e && Object.entries(e).forEach(([r, l]) => {
    const o = typeof l == "string" ? a[l] : l;
    o && (s[r] = (i) => typeof o == "function" ? o({ ...n, ...i || {} }) : o);
  }), s;
}
const fn = (e, n) => {
  const t = {};
  return e.vModelFields && Object.entries(e.vModelFields).forEach(([a, s]) => {
    t[a] = n[s];
  }), t;
}, pn = (e, n, t) => he(e) || !he(e == null ? void 0 : e[0]) ? Object.entries(e).map(([a, s]) => ({ value: a, label: s })) : Array.isArray(e) ? e.map((a) => ({ label: a[n], value: a[t] })) : [], $r = (e, n, t) => {
  var i, u, b, m;
  const { options: a, dictName: s } = e, r = ((u = (i = e.attrs) == null ? void 0 : i.fieldNames) == null ? void 0 : u.label) || "label", l = ((m = (b = e.attrs) == null ? void 0 : b.fieldNames) == null ? void 0 : m.value) || "value", o = R(a);
  s && ie.dictApi ? ie.dictApi(s).then((v) => t.value = v) : typeof a == "function" ? Promise.resolve(a(n)).then((v) => {
    t.value = pn(v, r, l);
  }).catch((v) => {
    console.warn("useOptionsLabel", v);
  }) : t.value = pn(o, r, l);
}, bt = ({ value: e, label: n = e, color: t, icon: a, tagViewer: s = !0 }) => {
  const r = { color: t, label: n, icon: a };
  if (s !== !0 || !t) {
    const l = s === !0 ? ie.tagViewer : s;
    if (typeof l == "function") {
      const o = l(e);
      he(o) ? Object.assign(r, o) : r.color = o;
    } else if (Array.isArray(l) && he(l[0])) {
      const o = l.find((i) => i.value == e);
      Object.assign(r, o);
    }
    r.color ?? (r.color = t || l[e] || e === !0 && "success" || e === !1 && "error" || "default");
  }
  return y(
    Rn,
    { color: r.color },
    { default: () => r.label || e, icon: r.icon || (() => Pe(r.icon)) }
  );
};
function mt(e, n = {}) {
  const {
    type: t = "",
    viewRender: a,
    render: s,
    options: r,
    dictName: l,
    labelField: o,
    valueToNumber: i,
    tagViewer: u,
    initialValue: b
  } = e, m = e.endField ?? e.keepField, v = Ce("rootSlots", {}), h = a || t === "InfoSlot" && s, f = typeof h == "string" ? v[h] : h;
  if (h && !f)
    return !1;
  let d = !1;
  const p = (() => {
    var c, g;
    if (o)
      return ({ current: S } = n) => String(Be(S, o) ?? "");
    if (m)
      return ({ current: S, text: C } = n) => (C || "") + " - " + (Be(S, m) || "");
    if ((r || l) && t !== "AutoComplete") {
      d = !(u === !1 || !u && ie.tagViewer === !1);
      let S = e.labelAsValue ?? e.valueToLabel;
      (c = R(r)) != null && c[0] && !he((g = R(r)) == null ? void 0 : g[0]) && !i && (S = !0);
      const C = P();
      return (D = n, w) => {
        const x = [], A = (D.text || D.value) ?? ve(b) ?? "";
        if (A === "")
          return "";
        if (S)
          return !w && d ? bt({ value: A, label: A, tagViewer: u }) : A;
        C.value || $r(e, D, C);
        const _ = (Array.isArray(A) ? A : typeof A == "string" ? A.split(",") : [A]).map((j) => {
          var E;
          const T = (E = R(C)) == null ? void 0 : E.find(({ value: K }) => K == j);
          return !w && d && x.push(bt({ value: j, label: j, ...T, tagViewer: u })), T ? T.label : j;
        });
        return x.length ? x : _.join(",");
      };
    } else if (t === "Switch")
      return ({ text: S } = n) => (e.valueLabels || "否是")[S ?? ve(b)];
  })(), O = !0;
  if (f)
    return (c = n) => {
      const g = fn(e, c.current), {
        attrs: { disabled: S, ...C }
      } = Ie({ option: e, effectData: c }), D = q({
        props: { ...C, ...g },
        ...c,
        ...p && { text: H(() => p(c, O)) },
        isView: !0
      });
      return f(D);
    };
  if (u && !d)
    return (c = n) => {
      const g = c.text ?? ve(b);
      return typeof g == "boolean" && u === !0 ? bt({ label: g ? "是" : "否", color: g ? "success" : "error" }) : (Array.isArray(g) ? g : typeof g == "string" ? g.split(",") : [g]).map((D) => bt({ value: D, tagViewer: u }));
    };
  if (t === "Text" && (e.attrs || e.dynamicAttrs))
    return (c = n) => {
      const g = (p == null ? void 0 : p(c)) || (c.value ?? ve(b)), S = Nt(e.dynamicAttrs, c), C = Z({ ...e.attrs, title: g }, S);
      return y("span", C, g);
    };
  if (t === "HTML")
    return (c = n) => {
      const g = Nt(e.dynamicAttrs, c), S = Z({ ...e.attrs, innerHTML: c.value }, g);
      return y("span", S);
    };
  if (t === "Textarea")
    return (c = n) => y("pre", { style: "white-space: break-spaces;" }, c.value ?? ve(b));
  if (!p && (t === "Upload" || t.startsWith("Ext")))
    return (c = n) => {
      const g = fn(e, c.current), S = st(e.slots, c, v), {
        attrs: { disabled: C, ...D }
      } = Ie({ option: e, effectData: c });
      return y(
        be[t],
        q({ option: e, effectData: c, ...D, ...g, value: c.value, isView: !0, disabled: C }),
        S
      );
    };
  if (t === "Buttons") {
    const c = tt({ config: e, isView: !0 });
    return !!c && ((g = n) => c({ param: g }));
  } else
    return p;
}
var Nr = { icon: { tag: "svg", attrs: { viewBox: "64 64 896 896", focusable: "false" }, children: [{ tag: "path", attrs: { d: "M872 474H152c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h720c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8z" } }] }, name: "minus", theme: "outlined" };
const Lr = Nr;
function mn(e) {
  for (var n = 1; n < arguments.length; n++) {
    var t = arguments[n] != null ? Object(arguments[n]) : {}, a = Object.keys(t);
    typeof Object.getOwnPropertySymbols == "function" && (a = a.concat(Object.getOwnPropertySymbols(t).filter(function(s) {
      return Object.getOwnPropertyDescriptor(t, s).enumerable;
    }))), a.forEach(function(s) {
      Vr(e, s, t[s]);
    });
  }
  return e;
}
function Vr(e, n, t) {
  return n in e ? Object.defineProperty(e, n, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[n] = t, e;
}
var Gt = function(n, t) {
  var a = mn({}, n, t.attrs);
  return fe(Ut, mn({}, a, {
    icon: Lr
  }), null);
};
Gt.displayName = "MinusOutlined";
Gt.inheritAttrs = !1;
const ts = Gt;
var Br = { icon: { tag: "svg", attrs: { viewBox: "64 64 896 896", focusable: "false" }, children: [{ tag: "path", attrs: { d: "M168 504.2c1-43.7 10-86.1 26.9-126 17.3-41 42.1-77.7 73.7-109.4S337 212.3 378 195c42.4-17.9 87.4-27 133.9-27s91.5 9.1 133.8 27A341.5 341.5 0 01755 268.8c9.9 9.9 19.2 20.4 27.8 31.4l-60.2 47a8 8 0 003 14.1l175.7 43c5 1.2 9.9-2.6 9.9-7.7l.8-180.9c0-6.7-7.7-10.5-12.9-6.3l-56.4 44.1C765.8 155.1 646.2 92 511.8 92 282.7 92 96.3 275.6 92 503.8a8 8 0 008 8.2h60c4.4 0 7.9-3.5 8-7.8zm756 7.8h-60c-4.4 0-7.9 3.5-8 7.8-1 43.7-10 86.1-26.9 126-17.3 41-42.1 77.8-73.7 109.4A342.45 342.45 0 01512.1 856a342.24 342.24 0 01-243.2-100.8c-9.9-9.9-19.2-20.4-27.8-31.4l60.2-47a8 8 0 00-3-14.1l-175.7-43c-5-1.2-9.9 2.6-9.9 7.7l-.7 181c0 6.7 7.7 10.5 12.9 6.3l56.4-44.1C258.2 868.9 377.8 932 512.2 932c229.2 0 415.5-183.7 419.8-411.8a8 8 0 00-8-8.2z" } }] }, name: "sync", theme: "outlined" };
const Er = Br;
function bn(e) {
  for (var n = 1; n < arguments.length; n++) {
    var t = arguments[n] != null ? Object(arguments[n]) : {}, a = Object.keys(t);
    typeof Object.getOwnPropertySymbols == "function" && (a = a.concat(Object.getOwnPropertySymbols(t).filter(function(s) {
      return Object.getOwnPropertyDescriptor(t, s).enumerable;
    }))), a.forEach(function(s) {
      qr(e, s, t[s]);
    });
  }
  return e;
}
function qr(e, n, t) {
  return n in e ? Object.defineProperty(e, n, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[n] = t, e;
}
var Wt = function(n, t) {
  var a = bn({}, n, t.attrs);
  return fe(Ut, bn({}, a, {
    icon: Er
  }), null);
};
Wt.displayName = "SyncOutlined";
Wt.inheritAttrs = !1;
const Ur = Wt;
var zr = { icon: { tag: "svg", attrs: { viewBox: "64 64 896 896", focusable: "false" }, children: [{ tag: "path", attrs: { d: "M400 317.7h73.9V656c0 4.4 3.6 8 8 8h60c4.4 0 8-3.6 8-8V317.7H624c6.7 0 10.4-7.7 6.3-12.9L518.3 163a8 8 0 00-12.6 0l-112 141.7c-4.1 5.3-.4 13 6.3 13zM878 626h-60c-4.4 0-8 3.6-8 8v154H214V634c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8v198c0 17.7 14.3 32 32 32h684c17.7 0 32-14.3 32-32V634c0-4.4-3.6-8-8-8z" } }] }, name: "upload", theme: "outlined" };
const Hr = zr;
function gn(e) {
  for (var n = 1; n < arguments.length; n++) {
    var t = arguments[n] != null ? Object(arguments[n]) : {}, a = Object.keys(t);
    typeof Object.getOwnPropertySymbols == "function" && (a = a.concat(Object.getOwnPropertySymbols(t).filter(function(s) {
      return Object.getOwnPropertyDescriptor(t, s).enumerable;
    }))), a.forEach(function(s) {
      Kr(e, s, t[s]);
    });
  }
  return e;
}
function Kr(e, n, t) {
  return n in e ? Object.defineProperty(e, n, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[n] = t, e;
}
var Yt = function(n, t) {
  var a = gn({}, n, t.attrs);
  return fe(Ut, gn({}, a, {
    icon: Hr
  }), null);
};
Yt.displayName = "UploadOutlined";
Yt.inheritAttrs = !1;
const Gr = Yt, at = (e, n) => {
  const { title: t, label: a, labelSlot: s, tooltip: r } = e, l = r && (he(r) ? r : { title: r }), o = t || s || a;
  return o === void 0 ? void 0 : () => [
    ae(o, n),
    r && y(yt, l, {
      title: () => ae(r.title, n),
      default: () => y(
        "a",
        { class: "ant-typography ant-typography-secondary", style: { marginLeft: "4px" } },
        Pe(r.icon || Ns)
      )
    })
  ];
}, Wr = /* @__PURE__ */ new Set([
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
]), Yr = {
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
}, Zr = /* @__PURE__ */ new Set(["Input", "InputNumber", "Textarea", "AutoComplete"]), Qr = /* @__PURE__ */ new Set(["Select", "TreeSelect"]), Jr = /* @__PURE__ */ new Set(["Select", "TreeSelect", "Radio", "Checkbox"]), Xr = /* @__PURE__ */ new Set([
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
]), eo = /* @__PURE__ */ new Set(["table", "form", "description"]), to = /* @__PURE__ */ new Set([
  "attrs",
  "dynamicAttrs",
  "dataSource",
  "initialValue",
  "options",
  "params",
  "rules",
  "treeData",
  "value"
]), _e = (e) => e !== null && typeof e == "object" && !Array.isArray(e), Y = (e, n, t, a) => ({ level: e, code: n, path: t, message: a });
function Lt(e, n, t, a) {
  if (!(!e || typeof e != "object" || a.has(e))) {
    if (a.add(e), _e(e))
      for (const [s, r] of Object.entries(Yr))
        Object.prototype.hasOwnProperty.call(e, s) && t.push(Y("warning", "deprecated-api", `${n}.${s}`, `已废弃，${r}。`));
    for (const [s, r] of Object.entries(e))
      typeof r == "function" || to.has(s) || (Array.isArray(r) ? r.forEach((l, o) => Lt(l, `${n}.${s}[${o}]`, t, a)) : _e(r) && Lt(r, `${n}.${s}`, t, a));
  }
}
function no(e, n, t, a) {
  var i, u, b;
  if (!_e(e)) {
    typeof e != "string" && t.push(Y("error", "invalid-item", n, "字段配置必须是对象。"));
    return;
  }
  const { type: s } = e;
  if (s !== void 0 && (typeof s != "string" || !Wr.has(s) && !s.startsWith("Ext")) && t.push(Y("error", "unknown-type", `${n}.type`, `未知字段类型 ${JSON.stringify(s)}。`)), s === void 0 && a !== "table" && t.push(Y("warning", "missing-type", `${n}.type`, "表单或详情字段建议明确配置 type。")), Array.isArray(e.exclude)) {
    const m = e.exclude.filter((v) => !eo.has(v));
    m.length && t.push(
      Y(
        "error",
        "invalid-exclude",
        `${n}.exclude`,
        `只支持 table、form、description，当前包含：${m.join("、")}。`
      )
    );
  } else
    e.exclude !== void 0 && t.push(Y("error", "invalid-exclude", `${n}.exclude`, "exclude 必须是字符串数组。"));
  e.visibleIn !== void 0 && !["form", "detail", "both"].includes(e.visibleIn) && t.push(
    Y("error", "invalid-visible-in", `${n}.visibleIn`, "visibleIn 只支持 'form'、'detail'、'both'。")
  ), e.unauthorized !== void 0 && !["hide", "disable"].includes(e.unauthorized) && t.push(
    Y("error", "invalid-unauthorized", `${n}.unauthorized`, "unauthorized 只支持 'hide'、'disable'。")
  ), Jr.has(s) && !e.options && !e.dictName && t.push(Y("warning", "missing-options", n, `${s} 未配置 options 或 dictName。`));
  const r = (i = e.attrs) == null ? void 0 : i.placeholder, l = Zr.has(s) ? `请输入${typeof e.label == "string" ? e.label : ""}` : Qr.has(s) ? `请选择${typeof e.label == "string" ? e.label : ""}` : void 0;
  l !== void 0 && r === l && t.push(
    Y("suggestion", "redundant-default", `${n}.attrs.placeholder`, "与内置 placeholder 相同，可以省略。")
  );
  const o = ["DatePicker", "DateRange"].includes(s) ? "YYYY-MM-DD" : ["TimePicker", "TimeRange"].includes(s) ? "HH:mm:ss" : void 0;
  o && ((u = e.attrs) == null ? void 0 : u.valueFormat) === o && t.push(
    Y("suggestion", "redundant-default", `${n}.attrs.valueFormat`, "与内置 valueFormat 相同，可以省略。")
  ), s === "InputGroup" && ((b = e.attrs) == null ? void 0 : b.compact) === !0 && t.push(
    Y("suggestion", "redundant-default", `${n}.attrs.compact`, "InputGroup 默认使用紧凑布局，可以省略。")
  ), e.block === !1 && !Xr.has(s) && t.push(Y("suggestion", "redundant-default", `${n}.block`, "block: false 是默认行为，可以省略。")), e.breakAfter === !1 && t.push(
    Y("suggestion", "redundant-default", `${n}.breakAfter`, "breakAfter: false 是默认行为，可以省略。")
  ), (e.options || e.dictName) && e.tagViewer === !0 && t.push(
    Y("suggestion", "redundant-default", `${n}.tagViewer`, "选项字段默认使用 Tag 展示，可以省略。")
  );
  for (const m of ["hidden", "disabled"])
    e[m] === !1 && t.push(Y("suggestion", "redundant-default", `${n}.${m}`, `${m}: false 可以省略。`));
  Object.prototype.hasOwnProperty.call(e, "initialValue") && e.initialValue === void 0 && t.push(
    Y("suggestion", "redundant-default", `${n}.initialValue`, "initialValue: undefined 可以省略。")
  );
  for (const m of ["attrs", "rowProps"])
    _e(e[m]) && Object.keys(e[m]).length === 0 && t.push(Y("suggestion", "empty-config", `${n}.${m}`, `空的 ${m} 配置可以省略。`));
  for (const m of ["rules", "options"])
    Array.isArray(e[m]) && e[m].length === 0 && t.push(Y("suggestion", "empty-config", `${n}.${m}`, `空的 ${m} 配置可以省略。`));
  e.subItems && Qe(e.subItems, `${n}.subItems`, t, a === "table" ? "form" : a), e.columns && Qe(e.columns, `${n}.columns`, t, "table");
}
function Qe(e, n, t, a) {
  if (!Array.isArray(e)) {
    t.push(Y("error", "invalid-items", n, "必须是数组。"));
    return;
  }
  const s = /* @__PURE__ */ new Map();
  e.forEach((r, l) => {
    const o = `${n}[${l}]`;
    no(r, o, t, a), !(!_e(r) || typeof r.field != "string" || !r.field) && (s.has(r.field) ? t.push(
      Y(
        "warning",
        "duplicate-field",
        `${o}.field`,
        `字段 ${r.field} 与 ${s.get(r.field)} 重复。`
      )
    ) : s.set(r.field, `${n}[${l}].field`));
  });
}
function so(e, n = "auto") {
  var s, r, l, o, i, u, b;
  const t = [];
  if (!_e(e))
    return [Y("error", "invalid-schema", "schema", "schema 必须是对象。")];
  Lt(e, "schema", t, /* @__PURE__ */ new WeakSet());
  const a = n === "auto" ? Array.isArray(e.columns) ? "table" : "form" : n;
  if (!["form", "table", "detail"].includes(a))
    return [Y("error", "invalid-schema-type", "schema", `未知 schema 类型 ${JSON.stringify(n)}。`)];
  if (e.subSpan === 8 && t.push(Y("suggestion", "redundant-default", "schema.subSpan", "subSpan: 8 是默认值，可以省略。")), e.gutter === 16 && t.push(Y("suggestion", "redundant-default", "schema.gutter", "gutter: 16 是默认值，可以省略。")), _e(e.params) && Object.keys(e.params).length === 0 && t.push(Y("suggestion", "empty-config", "schema.params", "空的 params 配置可以省略。")), a === "table") {
    for (const m of ["editMode", "addMode"])
      Object.prototype.hasOwnProperty.call(e, m) && t.push(Y("warning", "deprecated-api", `schema.${m}`, `已废弃，使用 rowEditor.${m}。`));
    Array.isArray(e.columns) ? Qe(e.columns, "schema.columns", t, "table") : t.push(Y("error", "missing-columns", "schema.columns", "表格必须配置 columns。")), e.immediate === !0 && t.push(
      Y("suggestion", "redundant-default", "schema.immediate", "immediate: true 是默认值，可以省略。")
    ), e.pagination === !1 && t.push(
      Y("suggestion", "redundant-default", "schema.pagination", "pagination: false 是默认值，可以省略。")
    ), ((s = e.attrs) == null ? void 0 : s.rowKey) === "id" && t.push(
      Y("suggestion", "redundant-default", "schema.attrs.rowKey", "rowKey: 'id' 是默认值，可以省略。")
    ), ((r = e.attrs) == null ? void 0 : r.size) === "small" && t.push(
      Y("suggestion", "redundant-default", "schema.attrs.size", "size: 'small' 是默认值，可以省略。")
    ), ((l = e.attrs) == null ? void 0 : l.tableLayout) === "fixed" && t.push(
      Y(
        "suggestion",
        "redundant-default",
        "schema.attrs.tableLayout",
        "tableLayout: 'fixed' 是默认值，可以省略。"
      )
    ), _e(e.pagination) && e.pagination.current === 1 && t.push(
      Y("suggestion", "redundant-default", "schema.pagination.current", "分页 current 默认是 1，可以省略。")
    ), _e(e.pagination) && e.pagination.pageSize === 10 && t.push(
      Y("suggestion", "redundant-default", "schema.pagination.pageSize", "分页 pageSize 默认是 10，可以省略。")
    ), (o = e.searchForm) != null && o.subItems && Qe(e.searchForm.subItems, "schema.searchForm.subItems", t, "form"), (u = (i = e.rowEditor) == null ? void 0 : i.form) != null && u.subItems && Qe(e.rowEditor.form.subItems, "schema.rowEditor.form.subItems", t, "form");
  } else
    Array.isArray(e.subItems) ? (((b = e.attrs) == null ? void 0 : b.labelAlign) === "right" && t.push(
      Y("suggestion", "redundant-default", "schema.attrs.labelAlign", "labelAlign: 'right' 是默认值，可以省略。")
    ), Qe(e.subItems, "schema.subItems", t, a)) : t.push(Y("error", "missing-sub-items", "schema.subItems", "表单或详情必须配置 subItems。"));
  return t;
}
function ao(e, n = "auto") {
  return so(e, n);
}
function dt(e, n, t) {
  var s, r;
  const a = ao(e, n);
  return a.length && ((s = console.groupCollapsed) == null || s.call(console, `[antdv-superform] ${t} schema 诊断：${a.length} 项`), a.forEach(({ level: l, path: o, message: i }) => {
    const u = `[antdv-superform] ${o}: ${i}`;
    l === "error" ? console.error(u) : l === "warning" ? console.warn(u) : console.info(u);
  }), (r = console.groupEnd) == null || r.call(console)), a;
}
const ro = () => At(
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
        var n;
        return !e.record && !(((n = e.selectedRows) == null ? void 0 : n.length) > 0);
      }
    },
    edit: {
      label: "修改",
      disabled: (e) => {
        var n;
        return !e.record && ((n = e.selectedRows) == null ? void 0 : n.length) !== 1;
      }
    },
    detail: {
      label: "查看",
      disabled: (e) => {
        var n;
        return !e.record && ((n = e.selectedRows) == null ? void 0 : n.length) !== 1;
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
  ie.defaultButtons
);
function oo(e) {
  const n = ro();
  return Object.keys(e).forEach((t) => {
    n[t] ? typeof e[t] == "function" ? n[t].onClick = e[t] : At(n[t], { attrs: { title: n[t].label } }, e[t]) : n[t] = e[t];
  }), n;
}
function lo(e, n = {}, t = {}) {
  const a = oo(n), s = [];
  return Array.isArray(e) && e.forEach((r) => {
    const l = typeof r == "string" ? r : r.name, { onClick: o, ...i } = a[l] || {};
    i.attrs = qe({ ...t }, i.attrs), typeof r == "object" && Object.assign(i, r, { attrs: { ...i.attrs, ...r.attrs } });
    const u = P(!1), b = i.attrs.loading, m = Je(b);
    !m && b && (i.attrs.loading = u);
    const v = (p) => {
      m || (u.value = p ? b : !1);
    }, h = { label: i.label, ...r.meta }, f = r.onClick, d = (p, O, c) => {
      p ? Ct.confirm({
        title: () => ae(p, c),
        okText: "确定",
        cancelText: "取消",
        ...oe.Modal,
        onOk: O
      }) : (v(!0), Promise.resolve(O()).finally(() => {
        v(!1);
      }));
    };
    i.onClick = (p) => {
      const O = { ...p, meta: h };
      f && o ? d(
        i.confirmText,
        () => f(O, async (c) => o({ ...O, ...c })),
        p
      ) : d(i.confirmText, () => {
        var c;
        return (c = o || f) == null ? void 0 : c(O);
      }, p);
    }, s.push(i);
  }), s;
}
function io(e, n, t) {
  const { size: a, buttonShape: s, buttonType: r, limit: l, hidden: o, disabled: i, actions: u } = e, b = e.unauthorized ?? (e.invalidDisabled || e.roleMode === "disable" ? "disable" : e.roleMode && "hide"), m = e.labelMode === "icon", v = { size: a, type: r, shape: s }, h = on(i, n), f = ct(o, n);
  let d = lo(u, t, v);
  if (ie.buttonRoles) {
    const S = ie.buttonRoles();
    d = d.filter((C) => {
      if (!(!C.roleName || S.includes(C.roleName)))
        if ((C.unauthorized ?? (C.invalidDisabled || C.roleMode === "disable" ? "disable" : C.roleMode && "hide") ?? b ?? "hide") === "disable")
          C.disabled = !0;
        else
          return !1;
      return !0;
    });
  }
  const p = Ce("rootSlots", {}), O = d.map((S) => {
    const C = ct(S.hidden, n), D = S.disabled !== void 0 ? on(S.disabled, n) : h, w = (j) => {
      var T;
      (j.domEvent || j).stopPropagation(), (T = S.onClick) == null || T.call(S, { ...n, e: j });
    }, x = S.color && `ant-btn-${S.color}`, A = S.dropdown && H(() => {
      const j = ve(S.dropdown);
      return he(j) ? Object.entries(j).map(([T, E]) => ({ value: T, label: E })) : typeof j[0] != "object" ? Bs(j).map((T) => ({ value: T, label: T })) : j;
    }), I = typeof S.customRender == "string" ? p[S.customRender] : S.customRender, _ = H(() => {
      const j = D.value && S.disabledTooltip ? S.disabledTooltip : S.tooltip || (m && S.icon ? S.label : void 0);
      return typeof j == "function" ? j(n) : j;
    });
    return {
      isHide: C,
      render: I,
      menu: A,
      ...S,
      tooltipTitle: _,
      onClick: w,
      attrs: { ...v, class: x, ...S.attrs, disabled: D }
    };
  }), c = P([]), g = P([]);
  return Ke(() => {
    const S = f.value ? [] : O.filter(({ isHide: C }) => !C.value);
    if (c.value = S, l != null) {
      const C = m && S.length === l + 1 ? l + 1 : l;
      c.value = S.slice(0, C), g.value = S.slice(C);
    }
  }), { btns: c, moreBtns: g, defaultAttrs: v };
}
const ke = /* @__PURE__ */ W({
  __name: "ButtonGroup",
  props: {
    option: {},
    methods: {},
    effectData: {}
  },
  setup(e) {
    const n = e, { option: t, methods: a, effectData: s } = n, r = Array.isArray(t) ? { actions: t } : t, { attrs: l, moreLabel: o, divider: i, buttonType: u } = r, b = r.labelMode === "icon", m = r.labelMode === "label", { btns: v, moreBtns: h, defaultAttrs: f } = io(r, q(s || {}), a || r.methods), d = i ?? ((l == null ? void 0 : l.direction) !== "vertical" && ["link", "text"].includes(u || ""));
    return (p, O) => ($(), z(R(xt), Z({
      class: "sup-buttons",
      onClick: O[0] || (O[0] = fs(() => {
      }, ["stop"])),
      size: R(d) ? 0 : "small"
    }, R(l)), {
      default: te(() => [
        ($(!0), pe(Se, null, Fe(R(v), ({ attrs: c, icon: g, label: S, tooltipTitle: C, dropdownProp: D, menu: w, render: x, onClick: A }, I) => ($(), pe(Se, { key: S }, [
          fe(R(yt), { title: C }, {
            default: te(() => [
              w ? ($(), z(R(Jt), Z({
                key: 0,
                disabled: c.disabled
              }, D), {
                overlay: te(() => [
                  fe(R(Xt), { onClick: A }, {
                    default: te(() => [
                      ($(!0), pe(Se, null, Fe(w, (_) => ($(), z(R(en), {
                        key: _.value,
                        disabled: _.disabled
                      }, Bt({
                        default: te(() => [
                          ($(), z(we(() => R(ae)(_.label, R(s)))))
                        ]),
                        _: 2
                      }, [
                        _.icon ? {
                          name: "icon",
                          fn: te(() => [
                            ($(), z(we(R(Pe)(_.icon))))
                          ]),
                          key: "0"
                        } : void 0
                      ]), 1032, ["disabled"]))), 128))
                    ]),
                    _: 2
                  }, 1032, ["onClick"])
                ]),
                default: te(() => [
                  fe(R(ot), gt(kt(c)), {
                    default: te(() => [
                      g ? ($(), z(we(R(Pe)(g)), { key: 0 })) : Ae("", !0),
                      ($(), z(we(() => R(ae)(S, R(s))))),
                      fe(R(Mn))
                    ]),
                    _: 2
                  }, 1040)
                ]),
                _: 2
              }, 1040, ["disabled"])) : x ? ($(), z(we(() => x({ props: c, ...R(s) })), { key: 1 })) : ($(), z(R(ot), Z({ key: 2 }, c, { onClick: A }), {
                default: te(() => [
                  g && !m ? ($(), z(we(R(Pe)(g)), { key: 0 })) : Ae("", !0),
                  !g || !b ? ($(), z(we(() => R(ae)(S, R(s))), { key: 1 })) : Ae("", !0)
                ]),
                _: 2
              }, 1040, ["onClick"]))
            ]),
            _: 2
          }, 1032, ["title"]),
          R(d) && I < R(v).length - 1 ? ($(), z(R(Ls), {
            key: 0,
            type: "vertical",
            class: "buttons-divider"
          })) : Ae("", !0)
        ], 64))), 128)),
        R(h).length ? ($(), z(R(Jt), { key: 0 }, {
          overlay: te(() => [
            fe(R(Xt), null, {
              default: te(() => [
                ($(!0), pe(Se, null, Fe(R(h), ({ attrs: c, icon: g, label: S, tooltipTitle: C, onClick: D }) => ($(), z(R(en), {
                  key: S,
                  disabled: c.disabled
                }, {
                  default: te(() => [
                    fe(R(yt), { title: C }, {
                      default: te(() => [
                        fe(R(ot), Z({ block: "" }, c, {
                          shape: "",
                          onClick: D
                        }), {
                          default: te(() => [
                            g ? ($(), z(we(R(Pe)(g)), { key: 0 })) : Ae("", !0),
                            ($(), z(we(() => R(ae)(S, R(s)))))
                          ]),
                          _: 2
                        }, 1040, ["onClick"])
                      ]),
                      _: 2
                    }, 1032, ["title"])
                  ]),
                  _: 2
                }, 1032, ["disabled"]))), 128))
              ]),
              _: 1
            })
          ]),
          default: te(() => [
            fe(R(ot), gt(kt(R(f))), {
              default: te(() => [
                R(o) ? ($(), z(we(() => R(ae)(R(o), R(s))), { key: 0 })) : ($(), z(R(Vs), { key: 1 }))
              ]),
              _: 1
            }, 16)
          ]),
          _: 1
        })) : Ae("", !0)
      ]),
      _: 1
    }, 16, ["size"]));
  }
});
function tt({ config: e, methods: n, effectData: t, isView: a }) {
  const s = Array.isArray(e) ? { actions: e } : e, r = (s == null ? void 0 : s.visibleIn) ?? (s == null ? void 0 : s.validOn);
  if (!s || a && r === "form" || !a && r === "detail")
    return;
  let l = s.actions || [];
  if (r || (s.actions = l = l.filter((o) => {
    if (typeof o == "string")
      return !a;
    {
      const i = o.visibleIn ?? o.validOn;
      return a ? i !== "form" : i !== "detail";
    }
  })), l.length !== 0)
    return (o = {}) => y(ke, { option: s, methods: n, effectData: t, ...o });
}
const uo = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  AutoComplete: Es,
  Button: ot,
  Card: qs,
  CheckableTag: Us,
  Checkbox: zs,
  CheckboxGroup: Hs,
  Col: xe,
  Collapse: Ks,
  CollapsePanel: Gs,
  DatePicker: Ws,
  Descriptions: Ys,
  DescriptionsItem: Zs,
  Form: jn,
  FormItem: Qs,
  Input: Js,
  InputGroup: Xs,
  InputNumber: ea,
  InputSearch: ta,
  List: na,
  ListItem: sa,
  Modal: Ct,
  Radio: kn,
  RadioButton: Tn,
  RadioGroup: aa,
  RangePicker: ra,
  Row: Ee,
  Select: oa,
  Space: xt,
  Switch: la,
  TabPane: ia,
  Table: ua,
  Tabs: ca,
  Tag: Rn,
  Textarea: da,
  TimePicker: fa,
  TimeRangePicker: pa,
  Tooltip: yt,
  TreeSelect: ma,
  Upload: Pn
}, Symbol.toStringTag, { value: "Module" })), G = { ...uo };
function co(e) {
  Object.keys(e).forEach((n) => {
    G[n] = e[n];
  });
}
const Zt = W({
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
  setup(e, n) {
    return Ve(e.name, e.data || {}), n.slots.default;
  }
}), Ne = W({
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
  setup(e, n) {
    const { type: t, attrs: a, gutter: s = 16, subSpan: r } = e.option, l = { gutter: s, ...e.option.rowProps, ...n.attrs }, o = Ce("inheritOptions", {}), i = r ?? o.subSpan, u = H(() => e.model.index), b = [];
    let m;
    const v = [...e.model.children];
    for (let d = 0; d < v.length; d++) {
      const [p, O] = v[d], { type: c, align: g, span: S, hideInForm: C, exclude: D, editable: w } = p, x = p.block ?? p.blocked, A = p.breakAfter ?? p.wrapping, { parent: I, refData: _ } = je(O), j = Re({
        parent: e.effectData,
        current: I,
        field: O.refName,
        value: _,
        ...u.value !== void 0 && {
          index: u,
          record: O.refName ? I : _
        }
      });
      if (c === "Hidden" || (D ? D.includes("form") : C)) {
        Zn({ option: p, model: O, effectData: j });
        continue;
      }
      const { hidden: T, required: E, attrs: K } = Ie({
        option: p,
        effectData: j,
        inheritDisabled: o.disabled
      });
      if (c === "Fragment") {
        O.children && v.splice(
          d + 1,
          0,
          ...[...O.children].map(([le, ye]) => [{ ...le, hidden: T, disabled: K.disabled }, ye])
        );
        continue;
      }
      let J = Rt(p, O, j, K);
      if (!J)
        continue;
      if (ul.includes(c) && w !== void 0 && w !== !0) {
        const le = J, ye = H(() => ze(w) ? w(j) : w), ge = mt(p, q({ ...je(j), isView: !0 }));
        J = () => ye.value ? le() : ge ? ge() : _.value;
      }
      const Q = { ...p.colProps, span: S };
      if (qe(Q, { span: i }, oe.Col, { span: 8 }), (Q.span === 0 || Q.flex) && (Q.span = void 0), t === "InputGroup" && (a == null ? void 0 : a.compact) !== !1) {
        const le = Number(Q.span) && (100 / (24 / Q.span)).toFixed(2) + "%";
        b.push(() => !T.value && y(J, Z({ style: { width: le } }, Q)));
        continue;
      }
      let ee = J;
      const ce = [...ft, "InputList", "InputGroup"].includes(c);
      if (!ce && (!x || p.field && p.label)) {
        const le = It(O.rules, j), ye = H(
          () => R(K.disabled) ? void 0 : !p.required || E.value ? le : le.slice(1)
        ), ge = Z(oe.FormItem, p.formItemProps), De = at(p, j);
        ee = () => y(G.FormItem, q({ ...ge, name: O.propChain, rules: ye, colon: !!De }), {
          default: J,
          label: De
        });
      }
      if (ce) {
        const le = {
          required: E,
          disabled: K.disabled,
          subSpan: p.subSpan ?? i
        };
        ee = () => y(Zt, { name: "inheritOptions", data: le }, J);
      }
      const L = x ?? (ft.includes(c) && !p.span), se = g && `text-align: ${g}`;
      L ? (m = void 0, b.push(
        () => !T.value && y(
          "div",
          {
            class: ["sup-form-section", c === "Descriptions" && "sup-detail"],
            style: se,
            key: d,
            ...n.attrs
          },
          ee()
        )
      )) : (c === "InputList" && (Q.span = 24), m || b.push(m = []), m.push(() => !T.value && y(xe, Z({ style: se, key: d }, Q), ee)), A && (m = void 0));
    }
    let h = !1;
    const f = () => b.map((d, p) => Array.isArray(d) ? (h = !0, y(Ee, l, () => d.map((O) => O()))) : d());
    return () => e.option.isContainer && h ? y(be.Group, { class: "sup-form-section", ...n.attrs, ...e }, { innerContent: f }) : f();
  }
});
function Rt(e, n, t, a) {
  const { type: s, render: r } = e;
  if (!s)
    return;
  const l = Ce("rootSlots", {}), o = st(e.slots, t), i = r ? typeof r == "function" ? r : l[r] : be[s];
  let u;
  if (s === "InfoSlot")
    u = i && (() => i({ props: a, ...t }));
  else if (s === "Text")
    u = () => y("span", a, n.refData);
  else if (s === "HTML")
    u = () => y("span", { ...a, innerHTML: n.refData });
  else if (s === "Buttons")
    u = () => y(ke, { option: e, effectData: t, ...a });
  else if (ft.includes(s) || s === "InputList")
    u = () => y(be[s], q({ option: e, model: n, effectData: t, ...a }), o);
  else {
    const b = Zn({ option: e, model: n, effectData: t }), m = { ...a, ...b };
    i ? s === "InputSlot" ? u = () => i == null ? void 0 : i(q({ props: m, ...t })) : s.startsWith("Ext") ? u = () => y(i, q({ option: e, effectData: t, ...m }), o) : u = () => y(i, q({ option: e, model: n, effectData: t, ...m }), o) : console.error(`组件 '${s}' 配置错误，请检查名称或'render'是否正确！`);
  }
  return u;
}
const fo = W({
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
  setup(e, n) {
    const t = me(e, "source"), { modelsMap: a } = nt(e.modelsMap, t);
    return Ve("exaProvider", { data: me(e, "source") }), () => {
      var s;
      return y(
        "div",
        { class: ["sup-form-section sup-detail", ((s = n.attrs) == null ? void 0 : s.isContainer) && "sup-container"] },
        y(be.Descriptions, {
          option: e.option,
          model: { children: a },
          effectData: q({ current: t }),
          isView: !0
        })
      );
    };
  }
}), po = W({
  props: {
    items: {
      type: Array,
      required: !0
    },
    config: {
      type: Object,
      required: !0
    }
  },
  setup(e) {
    const n = Ce("gridConfig", {}), { subSpan: t, column: a } = e.config, {
      layout: s,
      bordered: r,
      mode: l = r && "table",
      labelBgColor: o,
      borderColor: i,
      rowProps: u,
      colon: b,
      size: m = "middle",
      tableLayout: v,
      ...h
    } = n;
    let f = a || (Number(t) ? Math.floor(24 / t) : n.column);
    f ?? (f = Number(n.subSpan) ? Math.floor(24 / n.subSpan) : 2);
    function d() {
      const O = [];
      let c = [], g = 0;
      return e.items.forEach(({ option: S, label: C, content: D, hidden: w }, x) => {
        if (R(w))
          return;
        const { span: A = S.span } = S.descriptionsProps || {};
        let I = Number(A) ? Math.ceil(A / (24 / f)) : 1;
        I = I > f ? f : I;
        const _ = { ...h, ...S.formItemProps, ...S.descriptionsProps }, j = { ..._.labelAlign && { textAlign: _.labelAlign }, ..._.labelStyle }, T = {
          labelCol: Z(_.labelCol, { style: j, class: { "sup-label-no-colon": _.noColon } }),
          wrapperCol: Z(
            { style: s === "vertical" && { textAlign: _.labelAlign } },
            { style: _.contentStyle },
            _.wrapperCol
          ),
          option: S,
          attrs: _,
          span: A,
          label: C,
          content: D,
          colspan: I
        };
        if (l === "table")
          if (g + I <= f)
            g += I, c.push(T);
          else {
            if (O.push(c), g < f) {
              const E = f - g;
              c[c.length - 1].colspan += E;
            }
            g = I, c = [T];
          }
        else
          c.push(T);
        (S.breakAfter ?? S.wrapping) && (O.push(c), g = 0, c = []), x === e.items.length - 1 && c.length && O.push(c);
      }), O;
    }
    const p = H(() => d());
    if (l === "table") {
      let O = "";
      i && (O += `--descriptions-border-color:${i};`), o && (O += `--descriptions-bg-color:${o};`);
      const c = () => s === "vertical" ? p.value.flatMap((g) => [
        (g.length > 1 || g[0].label) && y(
          "tr",
          { class: "ant-descriptions-row" },
          g.map(
            (S) => {
              var C;
              return y(
                "th",
                Z(
                  {
                    class: "ant-descriptions-item-label",
                    colspan: S.colspan,
                    style: `width: ${(S.span / 24 * 100).toFixed(2)}%`
                  },
                  { class: S.labelCol.class, style: S.labelCol.style }
                ),
                (C = S.label) == null ? void 0 : C.call(S)
              );
            }
          )
        ),
        y(
          "tr",
          { class: "ant-descriptions-row" },
          g.map(
            (S) => y(
              "td",
              Z(
                { class: "ant-descriptions-item-content", colspan: S.colspan },
                { class: S.wrapperCol.class, style: S.wrapperCol.style }
              ),
              S.content()
            )
          )
        )
      ]) : (
        // 横向排列
        p.value.map(
          (g, S) => y(
            "tr",
            { class: "ant-descriptions-row" },
            g.flatMap(
              (C) => C.label ? [
                y(
                  "th",
                  Z(
                    { class: "ant-descriptions-item-label" },
                    { class: C.labelCol.class, style: C.labelCol.style }
                  ),
                  C.label()
                ),
                y(
                  "td",
                  Z(
                    {
                      class: "ant-descriptions-item-content",
                      style: C.wrapperCol.style,
                      colspan: C.colspan * 2 - 1
                    },
                    { class: C.wrapperCol.class }
                  ),
                  C.content()
                )
              ] : [
                y(
                  "td",
                  {
                    class: "ant-descriptions-item-content",
                    style: C.wrapperCol.style,
                    colspan: C.colspan * 2
                  },
                  C.content()
                )
              ]
            )
          )
        )
      );
      return () => y(
        "div",
        {
          style: O,
          class: ["ant-descriptions", "ant-descriptions-bordered", m !== "default" && "ant-descriptions-" + m]
        },
        y("div", { class: "ant-descriptions-view" }, y("table", { style: { tableLayout: v } }, c()))
      );
    } else {
      const O = () => p.value.map(
        (c) => y(
          Ee,
          { class: "ant-descriptions-row", ...u },
          () => c.map(({ option: g, content: S, span: C, label: D, labelCol: w, wrapperCol: x, attrs: A }) => {
            const I = { span: C, ...A.colProps || g.colProps };
            return I.span === 0 || I.flex ? I.span = void 0 : Number(I.span) || (I.span = n.column ? 24 / n.column : n.subSpan), y(
              xe,
              I,
              () => y(Ee, { class: ["ant-descriptions-item-container"] }, () => [
                D && y(
                  xe,
                  Z({ class: "ant-descriptions-item-label" }, w),
                  () => y("label", {}, D())
                ),
                y(
                  xe,
                  { class: "ant-descriptions-item-content", ...x },
                  () => !A.noInput && l === "form" && D !== void 0 ? y("div", { class: "sup-descriptions-item-input" }, S()) : S()
                )
              ])
            );
          })
        )
      );
      return () => y(
        "div",
        {
          class: [
            "ant-descriptions",
            s === "vertical" && "ant-descriptions-vertical",
            l === "form" ? "sup-descriptions-mode-form" : "sup-descriptions-default",
            b === !1 && "ant-descriptions-item-no-colon",
            m && m !== "default" && "ant-descriptions-" + m
          ]
        },
        y("div", { class: "ant-descriptions-view" }, O())
      );
    }
  }
}), Ue = W({
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
  setup({ option: e, modelsMap: n, isRoot: t, effectData: a }, s) {
    var O;
    const r = Ce("exaProvider", {}).attrs, l = Ce("gridConfig", r), o = {
      ...oe.Descriptions,
      ...l
    }, i = qe({ gutter: e.gutter }, e.rowProps || o.rowProps, oe.row, {
      gutter: 16
    }), u = { subSpan: e.subSpan, ...e.descriptionsProps, ...s.attrs }, b = qe(
      {
        subSpan: e.subSpan ?? o.subSpan,
        rowProps: i,
        ...u
      },
      o
    ), m = b.subSpan ?? (b.subSpan = ((O = oe.Col) == null ? void 0 : O.span) ?? 12), v = Vt(n, e, a), h = [];
    let f, d;
    v.forEach((c, g) => {
      c.node ?? (c.node = () => y(po, { config: u, items: c.group, class: u.class })), c.isBlock ? (c.group || c.option.type === "InputList" ? (d || (d = [], h.push(["section", d])), d.push(c)) : (h.push(["block", c]), d = void 0), f = void 0) : (!f && h.push(["row", f = []]), f.push(c), d = void 0);
    });
    const p = () => y(
      Zt,
      { name: "gridConfig", data: b },
      () => h.map(([c, g], S) => {
        let C = g.node;
        return c === "row" ? C = () => y(
          Ee,
          i,
          () => g.map((D, w) => {
            const x = D.option.colProps || { span: D.option.span ?? m };
            return !R(D.hidden) && y(xe, { ...oe.Col, ...x, key: w }, D.node);
          })
        ) : c === "section" && (C = () => g.map((D) => !R(D.hidden) && D.node())), !R(g.hidden) && (h.length > 1 ? y("div", { class: "sup-form-section", key: S }, C()) : C());
      })
    );
    return t ? () => y(
      be.Group,
      Z(
        { class: "sup-form-section" },
        {
          option: e,
          model: {},
          effectData: Re({}),
          isView: !0,
          ...u
        }
      ),
      { innerContent: p }
    ) : p;
  }
});
function Vt(e, n, t) {
  const a = [];
  let s;
  const r = Ce("rootSlots", {});
  return [...e].forEach(([l, o], i) => {
    var I, _, j;
    const { type: u = "", field: b, hideInDescription: m, viewRender: v, exclude: h } = l;
    if (u === "Hidden" || m || h != null && h.includes("description"))
      return;
    const { parent: f, refData: d } = je(o), p = Re({
      parent: t,
      current: f,
      isView: !0,
      field: o.refName,
      value: d,
      text: d,
      ..."index" in o && { index: o.index, record: b ? d : f }
    }), { attrs: O, hidden: c } = Ie({ option: l, effectData: p }), g = st(l.slots, p), S = at(l, p);
    let C = l.block ?? l.blocked, D;
    const w = [], x = typeof v == "string" ? r[v] : v;
    D = x && (() => ae(x, p));
    const A = o.children || ((I = o.listData) == null ? void 0 : I.modelsMap);
    if (u === "InputGroup") {
      if (!v) {
        let T = l.breakAfter ?? l.wrapping;
        const K = (_ = Vt(A, l, p)[0].group) == null ? void 0 : _.map(({ option: J, content: Q }) => {
          const ee = J.labelSlot || J.label, ce = (O == null ? void 0 : O.compact) === !1 && ee;
          return T = (J.breakAfter ?? J.wrapping) || T, () => y("span", [ce && ae(ee, p), ce && ": ", Q == null ? void 0 : Q()]);
        });
        D = () => y(xt, { direction: T ? "vertical" : "horizontal" }, () => K == null ? void 0 : K.map((J) => J()));
      }
      w.push({ option: l, label: S, hidden: c, content: D });
    } else if (u === "Fragment") {
      const T = Vt(A, l, p), E = T[0].group;
      E && (T.shift(), w.push(...E.map((K) => ({ ...K, hidden: c })))), T.length && (s = void 0, a.push(...T));
    } else if (o.children || o.listData || ft.includes(u)) {
      C ?? (C = !l.span);
      const T = [...ft, "InputList"].includes(u) ? u : "Group", E = be[T], K = () => y(E, q({ option: l, model: o, effectData: p, isView: !0, ...oe[T], ...O }), g);
      D ?? (D = K), u === "InputList" && (!C || S && !(O != null && O.labelIndex) ? w.push({
        option: { ...l },
        label: S,
        hidden: c,
        content: D
      }) : D = K);
    } else {
      const T = mo(l, o, p);
      T && w.push({ option: l, label: S, hidden: c, content: T });
    }
    if (!(!w.length && !D))
      if (w.length && !C)
        s || (s = [], a.push({ option: n, isBlock: !0, group: s })), s.push(...w);
      else {
        if (w.length && S)
          a.push({ option: n, isBlock: C, group: w });
        else {
          const T = l.align && { textAlign: l.align };
          D = ((j = w[0]) == null ? void 0 : j.content) || D, a.push({ option: l, isBlock: C, node: () => y(D, { style: T }), hidden: c });
        }
        s = void 0;
      }
  }), a;
}
function mo(e, n, t) {
  const { parent: a, refData: s } = je(n), r = n.refName ? s : void 0, l = re(a.value) === re(t.current) ? t : Re({ parent: t, current: a, text: r, value: r, field: n.refName, isView: !0 }), o = mt(e, l);
  return o === !1 ? void 0 : () => o ? o() : String(n.refData ?? "");
}
const jt = W({
  inheritAttrs: !1,
  props: {
    option: { type: Object, required: !0 },
    model: { type: Object, required: !0 },
    effectData: Object,
    isView: Boolean
  },
  setup({ option: e, model: n, effectData: t, isView: a }, s) {
    const { type: r, label: l, title: o = l, buttons: i, contentAttrs: u } = e, b = r === "Descriptions" || a;
    let m;
    if (i) {
      const S = Array.isArray(i) ? { actions: i } : i;
      r === "Descriptions" && (S.visibleIn ?? (S.visibleIn = S.validOn ?? "detail")), m = tt({ config: S, effectData: t, isView: b });
    }
    const { style: v, class: h, ...f } = s.attrs, d = {
      ...s.slots,
      title: o ? at(e, t) : void 0,
      actions: m,
      default: () => y(
        "div",
        u,
        s.slots.innerContent ? s.slots.innerContent(f) : b ? y(Ue, {
          option: { descriptionsProps: f, ...e },
          modelsMap: n.children,
          effectData: t,
          ...f
        }) : y(Ne, { option: e, model: n, effectData: t, ...f })
      )
    }, p = e.component && re(e.component);
    let O, c;
    const g = i == null ? void 0 : i.align;
    return m && (i.placement === "bottom" ? c = () => y("div", { class: "sup-bottom-buttons", style: { textAlign: g || "center" } }, m()) : O = () => y(
      xe,
      { class: "sup-title-buttons", flex: 1, style: { textAlign: g || (o ? "right" : void 0) } },
      m
    )), p ? () => y(p, {}, d) : () => y("div", Z({ class: h, style: v }, { class: "sup-group" }), [
      (o || O) && y(Ee, { align: "middle", class: "sup-titlebar" }, () => [
        o && y(xe, { class: "sup-title" }, d.title),
        O == null ? void 0 : O()
      ]),
      d.default(),
      c && c()
    ]);
  }
}), bo = {
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
  setup(e, { expose: n, emit: t, slots: a }) {
    var w;
    const s = P(), r = P({}), {
      option: { onSubmit: l, onReset: o, buttons: i, ...u },
      ignoreRules: b,
      compact: m
    } = e, v = q({ formData: r, current: r }), { attrs: h } = Ie({ option: u, effectData: v }), f = /* @__PURE__ */ new Set(), d = (x) => {
      x && f.add(x);
    };
    Ve("exaProvider", {
      data: yn(r),
      attrs: h,
      onSubmit: d
    }), Ve("inheritOptions", {
      disabled: h.disabled,
      subSpan: u.subSpan
    });
    const p = (x) => Promise.all(
      [...f, l].map(async (A) => {
        const I = await (A == null ? void 0 : A(x));
        return I === !1 || I && I.errMessage ? Promise.reject({ message: I && I.errMessage }) : I;
      })
    );
    b && Object.assign(h, { hideRequiredMark: !0, validateTrigger: "none" });
    const O = {
      dataSource: r,
      submit: () => s.value.validate().then((...x) => p(r.value).then(
        () => {
          const A = Xe(r.value);
          return t("submit", A), A;
        },
        (A) => (typeof A == "object" && A.message && zt.error(A.message), Promise.reject(A))
      )),
      setFieldsValue(x) {
        var A;
        return (A = s.value) == null || A.clearValidate(), Xn(r.value, x, S);
      },
      resetFields(x = {}) {
        var I;
        Kt(r.value, x, S), (I = s.value) == null || I.clearValidate();
        const A = Xe(r.value);
        return o == null || o(A), t("reset", A), A;
      }
    }, c = Array.isArray(i) ? { actions: i } : i;
    (w = c == null ? void 0 : c.actions) != null && w.length && (u.subItems = [
      ...u.subItems,
      {
        type: "InfoSlot",
        align: c.align || "center",
        block: !0,
        render: () => y(ke, {
          option: c,
          methods: { submit: O.submit, reset: O.resetFields, search: O.submit },
          effectData: v
        }),
        ...c.placement === "inline" && { span: "auto", block: !1, align: c.align || "right" }
      }
    ]);
    const { modelsMap: g } = et(u.subItems, r), S = Xe(r.value);
    U(
      () => R(e.dataSource ?? e.option.dataSource),
      (x) => {
        var A;
        x && ((A = s.value) == null || A.clearValidate(), r.value = x);
      },
      { immediate: !0, flush: "sync" }
    );
    const C = q({ ...O }), D = (x) => {
      if (!x) {
        t("register", null);
        return;
      }
      Object.assign(C, x, O), s.value = x, t("register", C);
    };
    return n(C), () => y(
      G.Form,
      {
        ref: D,
        class: ["sup-form", m && "sup-form-compact", b && "sup-form-simple"],
        model: r.value,
        labelAlign: "right",
        ...h
      },
      {
        ...a,
        default: () => y(Ne, {
          option: u,
          model: { refData: r, children: g },
          effectData: v
        })
      }
    );
  }
}, go = W({
  inheritAttrs: !1,
  props: {
    option: { type: Object, required: !0 },
    model: { type: Object, required: !0 },
    effectData: Object,
    compact: { type: Boolean, default: !0 },
    disabled: void 0
  },
  setup(e, { attrs: n }) {
    const { option: t, model: a, compact: s } = e, { field: r, slots: l } = t, o = P();
    let i = It(a.rules, e.effectData), u = a.propChain;
    const b = {};
    if (i)
      U(
        () => a.refData,
        () => {
          var d;
          return (d = o.value) == null ? void 0 : d.onFieldChange();
        },
        { deep: !0 }
      );
    else if (a.children && s)
      if (r) {
        const d = {
          type: "object",
          required: !1,
          fields: {}
        };
        a.children.forEach((p) => {
          p.rules && p.fieldName && (p.rules[0].required && (d.required = !0), d.fields[p.fieldName] = p.rules);
        }), i = [d], U(
          () => a.refData,
          () => {
            var p;
            return (p = o.value) == null ? void 0 : p.onFieldChange();
          },
          { deep: !0 }
        );
      } else {
        const { rules: d, propChain: p, refName: O } = [...a.children.values()].find((c) => !!c.rules) || {};
        O && (i = d, u = p, U(
          () => a.refData[O],
          () => {
            var c;
            return (c = o.value) == null ? void 0 : c.onFieldChange();
          }
        ));
      }
    else
      b.style = "margin: 0";
    const m = Ce("inheritOptions", {}), v = H(
      () => e.disabled ? void 0 : !t.required || R(m.required) ? i : i.slice(1)
    ), h = Z(oe.FormItem, t.formItemProps, b), f = at(t, e.effectData);
    return () => y(
      G.FormItem,
      { ...h, rules: v.value, ref: o, name: u },
      {
        label: f,
        default: (l == null ? void 0 : l.default) || (() => y(
          ba,
          () => y(
            G.InputGroup,
            Z({ compact: s, style: s && { display: "flex" } }, n),
            () => y(Ne, { option: t, model: a, effectData: e.effectData })
          )
        ))
      }
    );
  }
});
let Mt = (e = 21) => crypto.getRandomValues(new Uint8Array(e)).reduce((n, t) => (t &= 63, t < 36 ? n += t.toString(36) : t < 62 ? n += (t - 26).toString(36).toUpperCase() : t > 62 ? n += "-" : n += "_", n), "");
const vo = W({
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
  setup(e, n) {
    const { model: t, option: a, isView: s, effectData: r, labelIndex: l } = e, { columns: o, rowButtons: i, label: u, labelSlot: b, slots: m, ...v } = a, { modelsMap: h } = t.listData, f = o.length === 1 && o[0].field === "$index", d = !l && (u || b), { propChain: p, rules: O } = t, c = me(t, "refData"), g = {
      add: {
        onClick({ index: x }) {
          c.value.splice(x + 1, 0, f ? void 0 : {}), c.value = [...re(c.value)];
        },
        icon: () => y(Dt)
      },
      delete: {
        disabled: () => c.value.length === 1,
        confirmText: "",
        icon: () => y(ts),
        onClick({ index: x }) {
          c.value = re(c.value).filter((A, I) => I !== x);
        }
      }
    }, S = !s && i !== !1 && {
      type: "Buttons",
      buttonType: "link",
      size: "small",
      colProps: { flex: "0" },
      labelMode: "icon",
      ...oe.rowButtons,
      methods: g,
      actions: ["add", "delete"],
      ...Array.isArray(i) ? { actions: i } : i
    }, C = {
      ...v,
      type: "InputGroup",
      label: u,
      labelSlot: b,
      subSpan: a.subSpan ?? "auto",
      attrs: {
        compact: !1
      }
    }, D = P([]);
    U(
      c,
      (x) => {
        x.length === 0 && x.push(f ? void 0 : {}), D.value = x.map((A, I) => {
          const _ = me(c.value, I);
          let j = { ...o[0] }, T;
          if (f)
            T = {
              ...h.get(o[0]),
              index: I,
              parent: c,
              refData: _,
              propChain: [...p, I]
            };
          else {
            const K = nt(h, A, p, I).modelsMap;
            K.size === 1 && !o[0].field ? T = {
              ...K.get(o[0]),
              parent: c,
              refData: _
            } : (j = { ...C }, T = { parent: c, refData: _, children: K, index: I }, l || (j = { type: "Group", span: "auto" }));
          }
          l && (j.label ?? (j.label = u), j.labelSlot ?? (j.labelSlot = b || j.label + String(I + 1)));
          const E = /* @__PURE__ */ new Map([[j, q(T)]]);
          return S && E.set(S, { parent: c, index: I }), {
            children: E,
            model: q({ parent: c, children: E, index: I }),
            key: _.value ?? Mt()
            // effectData: reactive({ parent: effectData, current: orgList, index: idx, record: refData }),
          };
        });
      },
      {
        immediate: !0
      }
    );
    const w = () => D.value.map(({ model: x, key: A }) => y(Ne, { model: x, option: a, effectData: r, key: A }));
    if ({ ...n.slots }, s) {
      if (d)
        if (f) {
          const { label: I, labelSlot: _ = I } = o[0], j = o[0].breakAfter ?? o[0].wrapping;
          return () => y(
            xt,
            { direction: j ? "vertical" : "horizontal" },
            () => D.value.map(({ children: T }) => y("span", [ae(_, r), _ ? ": " : "", r.value]))
          );
        } else
          return () => D.value.map(({ children: I }) => y(Ue, { modelsMap: I, option: a, effectData: r }));
      const x = {}, A = H(() => new Map(D.value.flatMap(({ children: I }) => [...I])));
      return () => y(Ue, { option: C, modelsMap: A.value, effectData: r, key: Date(), ...x });
    } else if (d) {
      const x = /* @__PURE__ */ new Map([[{ ...C, slots: { default: w } }, t]]);
      return () => y(Ne, { model: { children: x }, option: a, effectData: r });
    } else
      return w;
  }
}), ho = /* @__PURE__ */ W({
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
    model: n,
    effectData: t,
    isView: a
  }) {
    const {
      label: s,
      title: r = s,
      buttons: l
    } = e;
    return () => y(G.Card, {}, {
      title: r && (() => y("div", {
        class: "sup-title"
      }, ae(r, t))),
      extra: () => l && !a && y(ke, {
        option: l,
        effectData: t
      }),
      default: () => a ? y(Ue, {
        option: e,
        modelsMap: n.children,
        effectData: t
      }) : y(Ne, {
        option: e,
        model: n,
        effectData: t
      })
    });
  }
}), yo = W({
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
  setup({ model: e, option: n, isView: t, effectData: a }, s) {
    const { buttons: r, rowButtons: l, label: o, title: i = o } = n, { modelsMap: u, rules: b } = e.listData, { propChain: m } = e, v = me(e, "refData"), f = Sn().rowKey || "id", d = {
      add() {
        v.value.push({});
      },
      delete({ record: w }) {
        const x = v.value.indexOf(w);
        v.value.splice(x, 1);
      }
    }, p = /* @__PURE__ */ new WeakMap(), O = P([]);
    U(
      () => [...v.value],
      (w) => {
        O.value = w.map((x, A) => {
          const I = re(x);
          p.has(I) || p.set(I, x[f] || Mt(12));
          const _ = p.get(I), { modelsMap: j } = nt(u, x, m, A);
          return {
            hash: _,
            model: { refData: P(x), children: j, index: A },
            effectData: q({ parent: a, current: v, index: A, record: x })
          };
        });
      },
      {
        immediate: !0
      }
    );
    const c = { ...s.slots };
    if (c.title || (c.title = i && (() => ae(i, a))), r) {
      const w = r.targetSlot ?? r.forSlot ?? "extra", x = c[w], A = tt({
        config: r,
        effectData: a,
        methods: d,
        isView: t
      });
      (x || A) && (c[w] = () => [x == null ? void 0 : x(), A == null ? void 0 : A()]);
    }
    const { title: g, extra: S, ...C } = c;
    (g || S) && (C.header = () => y(Ee, { align: "middle" }, () => [
      g && y(xe, { class: "sup-title", flex: 1 }, g),
      S && y(xe, { class: "sup-title-buttons", style: { textAlign: r == null ? void 0 : r.align } }, S)
    ]));
    const D = l && {
      buttonType: "link",
      size: "small",
      ...oe.rowButtons,
      ...Array.isArray(l) ? { actions: l } : l
    };
    return C.renderItem = ({ item: w }) => y(
      G.ListItem,
      { key: w.hash },
      {
        default: () => {
          var x;
          return [
            t ? y(Ue, { option: n, modelsMap: w.model.children, effectData: w.effectData }) : y(Ne, { model: w.model, option: n, class: "ant-list-item-meta", effectData: w.effectData }),
            D && ((x = tt({
              config: D,
              methods: d,
              effectData: w.effectData,
              isView: t
            })) == null ? void 0 : x({ class: "ant-list-item-action" }))
          ];
        }
      }
    ), () => y(G.List, { dataSource: O.value }, C);
  }
}), So = W({
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
  setup(e, n) {
    const { model: t, isView: a, effectData: s, labelIndex: r, rowKey: l = "" } = e, { columns: o, rowButtons: i, slots: u, ...b } = e.option, { modelsMap: m, rules: v } = t.listData, { propChain: h } = t, f = me(t, "refData"), d = {
      add: {
        icon: () => y(Dt),
        onClick({ index: C }) {
          f.value.splice(C + 1, 0, {}), f.value = [...re(f.value)];
        }
      },
      delete: {
        hidden: () => f.value.length === 1,
        disabled: !1,
        confirmText: "",
        icon: () => y(ts),
        onClick({ index: C }) {
          f.value = f.value.filter((D, w) => w !== C);
        }
      }
    }, p = !a && i !== !1 && {
      type: "Buttons",
      buttonType: "link",
      size: "small",
      labelMode: "icon",
      ...oe.rowButtons,
      methods: d,
      actions: ["add", "delete"],
      ...Array.isArray(i) ? { actions: i } : i
    }, O = /* @__PURE__ */ new WeakMap(), c = P([]);
    U(
      f,
      (C) => {
        C.length === 0 && C.push({}), c.value = C.map((D, w) => {
          const x = re(D);
          O.has(x) || O.set(x, D[l] || Mt(12));
          const { modelsMap: A } = nt(m, D, h, w);
          return {
            key: O.get(x),
            model: { refData: P(D), children: A, index: w },
            effectData: q({ parent: s, current: f, index: w, record: D })
          };
        });
      },
      {
        immediate: !0
      }
    );
    const g = {
      ...b,
      type: "Group",
      buttons: p,
      subItems: o
    }, S = b.title || b.label;
    return typeof S == "string" && r && (g.title = ({ index: C }) => S + String(C + 1)), () => c.value.map(({ model: C, effectData: D, key: w }, x) => y(be.Group, { model: C, option: g, effectData: D, key: w + x, isView: a }, n.slots));
  }
}), Oo = {
  name: "ExTabs"
}, wo = /* @__PURE__ */ W({
  ...Oo,
  props: {
    option: {},
    model: {},
    effectData: {},
    isView: {
      type: Boolean
    }
  },
  setup(e) {
    const {
      Tabs: n,
      TabPane: t
    } = G, {
      option: a,
      model: s,
      isView: r,
      effectData: l
    } = e, o = P(a.activeKey), i = [], u = (m, v, h) => {
      i[m] = !h && v, h && o.value === v && (o.value = i.find((f) => f));
    };
    On(() => {
      o.value ?? (o.value = i.find((m) => m));
    });
    const b = [...s.children].map(([m, v], h) => {
      const {
        key: f,
        field: d,
        label: p,
        icon: O
      } = m, c = Re({
        parent: l,
        current: me(v, "parent"),
        field: v.refName,
        value: v.refData
      }), {
        hidden: g,
        attrs: S
      } = Ie({
        option: m,
        effectData: c
      }), C = f || d || String(h), D = () => [Pe(O), ae(p, c)];
      return Ke(() => {
        u(h, C, R(g) || R(S.disabled));
      }), {
        attrs: q({
          ...S,
          key: C,
          tab: D
        }),
        hidden: g,
        option: {
          ...m,
          type: "TabPane"
        },
        model: v,
        effectData: c
      };
    });
    return (m, v) => ($(), z(R(n), {
      activeKey: o.value,
      "onUpdate:activeKey": v[0] || (v[0] = (h) => o.value = h)
    }, {
      rightExtra: te(() => [!m.isView && m.option.buttons ? ($(), z(R(ke), {
        key: 0,
        option: m.option.buttons
      }, null, 8, ["option"])) : Ae("", !0)]),
      default: te(() => [($(!0), pe(Se, null, Fe(R(b), ({
        attrs: h,
        hidden: f,
        option: d,
        model: p,
        effectData: O
      }) => ($(), pe(Se, {
        key: h.key
      }, [f.value ? Ae("", !0) : ($(), z(R(t), gt(Z({
        key: 0
      }, h)), {
        default: te(() => [m.isView ? ($(), z(R(Ue), {
          key: 0,
          option: d,
          modelsMap: p.children,
          effectData: O
        }, null, 8, ["option", "modelsMap", "effectData"])) : ($(), z(R(Ne), {
          key: 1,
          option: d,
          model: p,
          effectData: O
        }, null, 8, ["option", "model", "effectData"]))]),
        _: 2
      }, 1040))], 64))), 128))]),
      _: 1
    }, 8, ["activeKey"]));
  }
}), Co = W({
  name: "SuperForm",
  props: {
    schema: Object,
    model: Object,
    dataSource: Object,
    isContainer: Boolean
  },
  emits: ["register"],
  setup(e, n) {
    var i, u;
    const t = P(), a = St({
      ...e.schema,
      dataSource: e.dataSource || e.model || ((i = e.schema) == null ? void 0 : i.dataSource),
      attrs: Z({ ...oe.Form }, { ...(u = e.schema) == null ? void 0 : u.attrs })
    });
    ie.schemaDiagnostics && e.schema && dt(e.schema, "form", "SuperForm");
    const s = {
      setOption: (b) => {
        var m;
        ie.schemaDiagnostics && dt(b, "form", "SuperForm"), qe(a, b), a.attrs = Z(a.attrs, { ...b.attrs }, { ...(m = e.schema) == null ? void 0 : m.attrs });
      }
    };
    Ve("rootSlots", n.slots), n.emit("register", s);
    const r = (b) => {
      t.value = b, n.emit("register", s, b);
    };
    On(() => n.expose(t.value));
    const l = H(() => e.isContainer || a.isContainer);
    return () => a.subItems && y(
      be.Form,
      {
        option: a,
        // dataSource: formData.value,
        onRegister: r,
        class: { "sup-container": l.value }
      },
      st(a.slots, Re(), n.slots)
    );
  }
});
function xo(e) {
  const [n, t] = es(), a = Promise.resolve(typeof e == "function" ? e() : e), s = (l, o) => {
    if (l)
      n.value || a.then(l.setOption), n.value = o;
    else
      return (i, u) => y(Co, { ...i, onRegister: s }, u == null ? void 0 : u.slots);
  }, r = async (l, o) => {
    const i = await t();
    if (l && l in i)
      return typeof i[l] == "function" ? i[l](o) : i[l];
    if (!l)
      return i;
  };
  return [
    s,
    {
      dataSource: H(() => {
        var l;
        return (l = n.value) == null ? void 0 : l.dataSource;
      }),
      getForm: t,
      asyncCall: r,
      getData() {
        var l;
        return ve((l = n.value) == null ? void 0 : l.dataSource);
      },
      submit: () => r("submit"),
      resetFields: (l) => r("resetFields", l),
      setFieldsValue: (l) => r("setFieldsValue", l),
      /**
       * @deprecated 使用`resetFields`
       */
      setData(l) {
        r("resetFields", l);
      }
    }
  ];
}
function xl(e) {
  return e;
}
function ns(e, { buttons: n, ...t } = {}) {
  const a = P(!1), s = q({ ...t, ...oe.Modal }), r = P(), l = n && (() => y(ke, { option: n, effectData: { modalRef: r } })), o = P(!1), i = () => {
    var d;
    return o.value = !0, Promise.resolve((d = s.onOk) == null ? void 0 : d.call(s)).then(() => {
      a.value = !1;
    }).catch((p) => console.error(p)).finally(() => o.value = !1);
  }, u = () => s.icon ? [Pe(s.icon), ae(s.title)] : ae(s.title), b = (d) => a.value = d;
  return {
    modalRef: r,
    modalSlot: (d, p) => y(
      G.Modal,
      {
        ref: r,
        visible: a.value,
        class: "sup-modal",
        "onUpdate:visible": b,
        confirmLoading: o.value,
        ...s,
        title: void 0,
        ...d,
        onOk: i
      },
      { footer: l, title: u, ...p == null ? void 0 : p.slots, ...e && { default: e } }
    ),
    setModal: (d) => {
      Object.assign(s, d);
    },
    closeModal: () => (a.value = !1, $e()),
    openModal: async (d) => (Object.assign(s, d), a.value = !0, $e())
  };
}
function ss(e, n) {
  const { modalSlot: t, openModal: a, modalRef: s, closeModal: r, setModal: l } = ns(e, n), o = wn(), i = document.createDocumentFragment();
  let u;
  const b = Ce("configProvider"), m = (f) => {
    var O;
    const d = (O = b == null ? void 0 : b.getPrefixCls) == null ? void 0 : O.call(b), p = f.prefixCls || "".concat(d, "-modal");
    return y(
      ga,
      { ...b, notUpdateGlobalConfig: !0, prefixCls: d },
      () => t({ ...f, rootPrefixCls: d, prefixCls: p }, {})
    );
  }, v = () => {
    Tt(null, i), u = null;
  };
  return b && Ot(() => {
    u && v();
  }), {
    modalRef: s,
    openModal: (f) => {
      var d, p;
      if (s.value)
        return a(f);
      if (u = fe(m), u.appContext = o == null ? void 0 : o.appContext, Tt(u, i), (d = s.value) != null && d.destroyOnClose) {
        const O = (p = s.value) == null ? void 0 : p.afterClose;
        l({
          afterClose() {
            O == null || O(), v();
          }
        });
      }
      return $e(() => a(f));
    },
    modalSlot: t,
    closeModal: r,
    setModal: l
  };
}
function Dl(e, n = {}) {
  const { title: t, ...a } = e, [s, r] = xo(a), l = ss(s(), { maskClosable: !1, title: t, ...n });
  return { ...l, openModal: ({ data: i, onOk: u = n.onOk, ...b } = {}) => {
    const m = () => r.submit().then((v) => u ? u(v) : v);
    return r.resetFields(i), l.openModal({ ...b, onOk: m });
  }, formActions: r };
}
const lt = (e, ...n) => Cr(e, ...n, (t, a, s, r) => {
  if (a === void 0)
    r[s] = void 0;
  else if (Array.isArray(t))
    return a;
});
function Do(e) {
  const n = /* @__PURE__ */ new WeakMap(), t = (s) => {
    const r = re(s);
    let l = n.get(r);
    return l || (l = St({
      isEdit: !1
    }), n.set(r, l)), l;
  };
  return {
    getEditInfo: t,
    setEditInfo: (s, r) => {
      const l = t(s);
      if (l.editData)
        Kt(l.editData, s), Object.assign(l, r);
      else {
        const o = q(Xe(s)), {
          modelsMap: i,
          rules: u
        } = Jn(re(e), o), b = jn.useForm(o, P(u));
        b.clearValidate(), Object.assign(l, {
          ...r,
          form: b,
          modelsMap: i,
          editData: o
        });
      }
    }
  };
}
function Ao({
  childrenMap: e,
  orgList: n,
  listener: t,
  rowEditor: a
}) {
  const s = P(!1), r = P([]);
  U(() => [...n.value], (f) => {
    r.value = f, s.value = !1;
  }, {
    immediate: !0
  });
  const {
    getEditInfo: l,
    setEditInfo: o
  } = Do(e), i = {
    add({
      index: f,
      resetData: d
    }) {
      const p = {
        ...d
      };
      f !== void 0 ? r.value.splice(f + 1, 0, p) : r.value.push(p), o(p, {
        index: f,
        isEdit: !0,
        isNew: !0
      }), s.value = !0;
    },
    edit({
      record: f,
      selectedRows: d,
      resetData: p
    }) {
      const O = f || d[0];
      o(lt(O, p), {
        isEdit: !0
      }), s.value = !0;
    },
    delete({
      record: f,
      selectedRows: d
    }) {
      const p = f ? [f] : d;
      return t.onDelete(p);
    }
  }, u = {
    add: {
      disabled: () => s.value,
      onClick: i.add
    },
    edit: {
      disabled: (f) => {
        var d;
        return s.value || !(f.record || ((d = f.selectedRows) == null ? void 0 : d.length) === 1);
      },
      onClick: i.edit
    },
    delete: {
      disabled: (f) => {
        var d;
        return s.value || !(f.record || ((d = f.selectedRows) == null ? void 0 : d.length) > 0);
      },
      onClick: i.delete
    }
  }, b = [{
    label: "保存",
    loading: !0,
    onClick: async (f) => {
      const {
        record: d
      } = f, p = l(d);
      return p.form.validate().then(async () => {
        var g;
        const O = re(p.form.modelRef);
        if (await ((g = a == null ? void 0 : a.onSave) == null ? void 0 : g.call(a, {
          ...f,
          isNew: p.isNew
        })) === !1)
          return !1;
        p.isNew ? (Object.assign(d, O), t.onSave(d, p.index).then(() => {
          p.isNew = !1, p.isEdit = !1;
        })) : t.onUpdate(O, d).then(() => {
          p.isEdit = !1;
        }), s.value = !1;
      }).catch((O) => {
        console.log("error", O), O != null && O.errorFields && zt.error(O.errorFields[0].errors[0]);
      });
    }
  }, {
    label: "取消",
    onClick: async (f) => {
      var O;
      const d = l(f.record);
      await ((O = a == null ? void 0 : a.onCancel) == null ? void 0 : O.call(a, {
        ...f,
        isNew: d.isNew
      })) !== !1 && (d.isNew && r.value.splice(d.index + 1, 1), d.isEdit = !1, s.value = !1);
    }
  }], m = (f, d) => l(f.record).isEdit ? y(ke, {
    key: "edit",
    option: {
      ...d,
      actions: b
    },
    effectData: f
  }) : null, v = /* @__PURE__ */ W({
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
      option: f,
      editInfo: d,
      viewRender: p
    }) {
      const {
        editable: O = !0
      } = f, {
        modelsMap: c,
        form: g
      } = d, S = c.get(re(f)), {
        index: C,
        parent: D,
        refData: w
      } = je(S), x = S.propChain.join("."), A = Re({
        current: D,
        value: w,
        index: C
      }), {
        attrs: I,
        hidden: _
      } = Ie({
        option: f,
        effectData: A
      }), j = H(() => !_.value && (ze(O) ? O(A) : O)), T = Rt(f, S, A, I), E = It(S.rules, A);
      return E && (g.rulesRef.value[x] = H(() => R(I.disabled) || R(_) ? [] : E)), () => j.value ? y(G.FormItem, {
        wrapperCol: {},
        ...g.validateInfos[x]
      }, T) : p ? p({
        ...A,
        isView: !0
      }) : w.value;
    }
  });
  return {
    list: r,
    methods: i,
    buttonMethods: u,
    getEditRender: (f, d) => {
      if (be[f.type] || f.type === "InputSlot")
        return ({
          record: O
        }) => {
          const c = l(O);
          if (c.isEdit)
            return y(v, {
              option: f,
              editInfo: c,
              viewRender: d
            });
        };
    },
    editButtonsSlot: m
  };
}
function Io({ rowKey: e, option: n, listener: t }) {
  const a = P(), s = n.rowEditor, r = (s == null ? void 0 : s.form) || n.editForm || n.formSchema || {};
  r.subItems = r.subItems || n.columns.filter((f) => {
    var d;
    return !(f.hideInForm || (d = f.exclude) != null && d.includes("form"));
  });
  const l = P(r.dataSource || {}), o = () => y(be.Form, {
    option: r,
    dataSource: l,
    onRegister: (f) => a.value = f
  }), i = {
    ...oe.Modal,
    maskClosable: !1,
    ...n.modalProps,
    ...s == null ? void 0 : s.modalProps
  }, { modalSlot: u, openModal: b, closeModal: m } = ns(o, i), v = ({ meta: f, ...d }) => ae(i.title, { meta: f, ...d }) || `${r.title ? r.title + " - " : ""}  ${f.title || f.label}`;
  return { modalSlot: u, methods: {
    add(f = {}) {
      const { meta: d = {}, resetData: p, index: O } = f;
      return l.value = { ...p }, $e(() => {
        var c;
        (c = a.value) == null || c.clearValidate();
      }), d.title ?? (d.title = "新增"), d.name = "add", d.isNew = !0, b({
        ...d,
        title: v({ ...f, source: l.value, meta: d }),
        onOk: async () => a.value.submit().then(async (c) => {
          var S;
          if (await ((S = s == null ? void 0 : s.onSave) == null ? void 0 : S.call(s, { ...f, source: c, meta: d })) !== !1)
            return t.onSave(c, O);
        }),
        onCancel: async () => {
          var c;
          return await ((c = s == null ? void 0 : s.onCancel) == null ? void 0 : c.call(s, { ...f, meta: d })), m();
        }
      });
    },
    async edit(f) {
      var C, D, w;
      const { record: d, selectedRows: p, resetData: O, meta: c = {} } = f, g = d || p[0];
      if (!g)
        return Promise.reject(new Error("未选择记录"));
      const S = await ((D = (C = n.apis) == null ? void 0 : C.info) == null ? void 0 : D.call(C, e(g), g));
      return l.value = lt({}, g, S, O), qe(c, { name: "edit", title: "编辑", isNew: !1 }), (w = a.value) == null || w.clearValidate(), b({
        ...c,
        title: v({ ...f, source: l.value, meta: c }),
        onOk: async () => a.value.submit().then(async (x) => {
          var I;
          if (await ((I = s == null ? void 0 : s.onSave) == null ? void 0 : I.call(s, { ...f, source: x, meta: c })) !== !1)
            return t.onUpdate(x, g);
        }),
        onCancel: async () => {
          var x;
          return await ((x = s == null ? void 0 : s.onCancel) == null ? void 0 : x.call(s, { ...f, meta: c })), m();
        }
      });
    },
    delete({ record: f, selectedRows: d }) {
      const p = f ? [f] : d;
      return t.onDelete(p);
    }
  } };
}
function Ro({
  model: e,
  orgList: n,
  rowKey: t,
  setRowKey: a,
  editableRef: s
}) {
  const {
    modelsMap: r
  } = e.listData, l = P([]), o = /* @__PURE__ */ new WeakMap(), i = /* @__PURE__ */ new WeakMap();
  U(() => [...n.value], (v) => {
    l.value = v.map((h, f) => {
      const d = o.get(re(h)) || St({});
      if (d.index !== f) {
        d.index = f;
        const {
          modelsMap: O
        } = Jn(re(r), h, e.propChain, f);
        d.modelsMap = O;
      }
      d.record ?? (d.record = q({
        ...je(h)
      }));
      const p = t(h);
      return a(d.record, p), o.set(re(h), d), i.set(re(d.record), d), d.record;
    });
  }, {
    immediate: !0
  });
  const u = {
    add({
      index: v,
      resetData: h
    }) {
      const f = {
        ...h
      };
      v !== void 0 ? n.value.splice(v + 1, 0, f) : n.value.push(f);
    }
    // delete({ record }) {
    //   const orgIdx = orgList.value.indexOf(record)
    //   orgList.value.splice(orgIdx, 1)
    // },
  }, b = /* @__PURE__ */ W({
    inheritAttrs: !1,
    props: {
      option: {
        type: Object,
        required: !0
      }
    },
    setup({
      option: v
    }, h) {
      const {
        record: f
      } = h.attrs, d = H(() => i.get(re(f)).modelsMap.get(v)), {
        index: p,
        parent: O,
        refData: c
      } = je(d.value), g = Re({
        current: O,
        value: c,
        list: n,
        record: f,
        index: p
      }), {
        editable: S = !0
      } = v, {
        attrs: C,
        hidden: D
      } = Ie({
        option: v,
        effectData: g
      }), w = H(() => !D.value && s.value && (ze(S) ? S(g) : S)), x = Rt(v, d.value, g, C), A = mt(v, q({
        ...je(g),
        isView: !0
      })), I = It(d.value.rules, g), _ = I && H(() => R(C.disabled) ? void 0 : I);
      return () => w.value ? y(G.FormItem, q({
        wrapperCol: {},
        name: d.value.propChain,
        rules: _
      }), x) : A ? A() : c.value;
    }
  });
  return {
    list: l,
    methods: u,
    getEditRender: (v) => {
      if (be[v.type] || v.type === "InputSlot" && v.editable !== !1)
        return (f) => y(b, {
          option: v,
          ...f
        });
    }
  };
}
function Mo(e, n, t) {
  const a = P({}), { title: s, apis: r } = e, { modalProps: l, ...o } = e.descriptionsProps || {}, i = () => y(fo, { option: { descriptionsProps: o }, modelsMap: n, source: a }), u = {
    ...oe.Modal,
    footer: null,
    ...e.modalProps,
    ...l
  }, b = (h) => ae(u.title, h) || `${s ? s + " - " : ""}详情`, { openModal: m, modalSlot: v } = ss(i, u);
  return {
    detailSlot: v,
    openDetail: async ({ record: h, selectedRows: f, meta: d = {}, ...p }) => {
      const O = h || f[0];
      if (r != null && r.info) {
        const c = await r.info(t(O), O);
        a.value = Object.assign({}, O, c);
      } else
        a.value = O;
      d.name = "detail", m({ ...d, title: b({ ...p, source: a.value, meta: d }) });
    }
  };
}
function jo({ option: e, model: n, orgList: t, rowKey: a, setRowKey: s, listener: r, isView: l, effectData: o }) {
  const { modelsMap: i } = n.listData, u = {
    list: t,
    modalSlot: [],
    methods: {
      delete({ record: O, selectedRows: c }) {
        const g = O ? [O] : c;
        return r.onDelete(g);
      }
    }
  }, { edit: b, editable: m = b, rowEditor: v } = e, { editMode: h, addMode: f } = v || e;
  if (!l && m) {
    const O = H(() => ze(m) ? m(o) : m), { methods: c, ...g } = Ro({ model: n, orgList: t, rowKey: a, setRowKey: s, editableRef: O });
    Object.assign(u.methods, c), Object.assign(u, g);
  } else if (h === "inline") {
    const { list: O, methods: c, buttonMethods: g, editButtonsSlot: S, getEditRender: C } = Ao({
      childrenMap: i,
      orgList: t,
      listener: r,
      rowEditor: v
    });
    u.list = O, Object.assign(u.methods, c), Object.assign(u, { buttonMethods: g, editButtonsSlot: S, getEditRender: C });
  }
  if (h === "modal" || f === "modal") {
    const { modalSlot: O, methods: c } = Io({ rowKey: a, option: e, listener: r });
    u.methods.edit ? (u.methods.add = c.add, u.buttonMethods || (u.buttonMethods = {}), u.buttonMethods.add = c.add) : Object.assign(u.methods, c), u.modalSlot.push(O);
  }
  const { detailSlot: d, openDetail: p } = Mo(e, i, a);
  return u.modalSlot.push(d), u.methods.detail = p, u;
}
function Ge(e, n, t) {
  var b, m, v, h;
  const { options: a, dictName: s, valueToNumber: r } = e, l = ((m = (b = e.attrs) == null ? void 0 : b.fieldNames) == null ? void 0 : m.label) || "label", o = ((h = (v = e.attrs) == null ? void 0 : v.fieldNames) == null ? void 0 : h.value) || "value", i = P(n || []);
  return typeof a == "function" ? Cn(() => {
    Promise.resolve(a(t)).then((f) => {
      i.value = f;
    });
  }) : a ? U(
    () => R(a),
    (f) => i.value = f,
    { immediate: !0 }
  ) : s && ie.dictApi && ie.dictApi(s).then((f) => i.value = f), {
    optionsRef: H(() => {
      let f = e.labelAsValue ?? e.valueToLabel;
      const d = it(i.value) ? i.value : [];
      return d[0] && !he(d[0]) && !r && (f = !0), he(i.value) || !he(d[0]) ? Object.entries(i.value).map(([p, O]) => ({
        label: O,
        value: f ? O : r ? Number(p) : p
      })) : d.map((p) => ({
        ...p,
        label: p[l],
        value: f ? p[l] : r ? Number(p[o]) : p[o]
      }));
    }),
    setOptions(f) {
      i.value = f;
    }
  };
}
const ko = W({
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
  setup(e, { attrs: n, slots: t, emit: a }) {
    const { Card: s, Tabs: r, TabPane: l } = G, { optionsRef: o } = Ge(
      { ...e, labelAsValue: e.labelAsValue || e.valueToLabel },
      [],
      e.effectData
    ), i = P(e.activeKey ?? e.defaultActiveKey), u = (D) => {
      i.value = D, a("update:activeKey", D);
    }, {
      default: b,
      extra: m,
      rightExtra: v,
      tabBarExtraContent: h,
      tabBarExtra: f,
      title: d,
      titleBar: p,
      ...O
    } = t, c = st(e.slots, e.effectData), g = f || v || h, S = H(() => {
      var w;
      const D = o.value.map(({ value: x, label: A, ...I }) => ({
        ...I,
        key: I.key ?? x,
        tab: I.tab ?? A
      }));
      return i.value === void 0 && u((w = D[0]) == null ? void 0 : w.key), D;
    }), C = (D) => ae(c.customTab || e.customTab || D.tab, { ...e.effectData, item: D });
    return e.bordered ? () => y(
      s,
      {
        tabList: S.value,
        activeTabKey: i.value,
        onTabChange: u
      },
      {
        ...O,
        default: b,
        customTab: C,
        title: d,
        tabBarExtraContent: g || (d ? void 0 : m),
        extra: g || d ? m : void 0,
        ...c
      }
    ) : () => [
      d ? p == null ? void 0 : p() : null,
      y(
        r,
        {
          ...n,
          activeKey: i.value,
          "onUpdate:activeKey": u
        },
        {
          ...O,
          default: () => S.value.map((D) => y(l, { ...D, tab: () => C(D) })),
          rightExtra: g || (d ? void 0 : m),
          ...c
        }
      ),
      b == null ? void 0 : b()
    ];
  }
}), To = W({
  props: {
    option: { type: Object, required: !0 },
    effectData: { type: Object, required: !0 }
  },
  setup(e) {
    const n = e.option, { field: t, editable: a } = e.option, s = q({});
    U(
      () => e.effectData,
      (f) => Object.assign(s, f),
      { immediate: !0 }
    );
    const r = t.split(".").slice(0, -1), l = H(() => Be(s.record, r)), o = H({
      get: () => Be(s.record, t),
      set: (f) => ut(s.record, t, f)
    }), i = { parent: l, refData: o }, { attrs: u, hidden: b } = Ie({ option: n, effectData: { ...s, inTable: !0 } }), m = Rt(n, i, s, u), v = H(() => ze(a) ? a(s) : R(a)), h = mt(n, s);
    return () => b.value ? "" : v.value ? y("div", { class: "editable-cell" }, m()) : h ? h() : o.value;
  }
}), Po = (e) => {
  if (!e.editable)
    return;
  const n = ie.buttonRoles && ie.buttonRoles() || [], t = !e.roleName || n.includes(e.roleName), a = be[e.type];
  if (t && (a || e.type === "InputSlot"))
    return (s) => y(To, { option: e, effectData: { ...s } });
};
function _o({ childrenMap: e, context: n, option: t, attrs: a, isView: s, effectData: r }) {
  const { list: l, methods: o, buttonMethods: i, getEditRender: u, editButtonsSlot: b } = n, m = Re({ list: r.value, isView: s, parent: r }), v = function d(p = e) {
    const O = [];
    return [...p].forEach(([c, g]) => {
      var C, D;
      if (c.type === "Hidden" || c.hideInTable || c.hidden === !0 || (C = c.exclude) != null && C.includes("table"))
        return;
      const S = at(c, m);
      if (g.children) {
        const w = d(g.children);
        c.ignoreTableTitle ? O.push(...w) : O.push({
          title: S,
          children: w
        });
      } else {
        const w = {
          title: S,
          key: c.field || c.label,
          dataIndex: g.propChain.length > 1 ? g.propChain : g.propChain[0]
        };
        c.options || c.dictName || c.type === "Switch" || (D = c.type) != null && D.includes("Picker") ? w.align = "center" : c.type === "InputNumber" && (w.align = "right"), Object.assign(w, c.columnProps), qe(w, t.columnProps, oe.Column);
        const x = w.customRender || mt(c) || void 0, A = u ? u(c, x) : Po(c);
        w.customRender = Fo(x, A, m), O.push(w);
      }
    }), O;
  }(), h = No(t, a);
  h && v.unshift(h);
  const f = $o({
    buttons: t.rowButtons,
    methods: i || o,
    editButtonsSlot: b,
    isView: s,
    effectData: m
  });
  return f && (qe(f, t.columnProps, oe.Column), v.push(f)), v;
}
function Fo(e, n, t) {
  if (n || e) {
    const a = (s) => {
      const r = (n == null ? void 0 : n(s)) ?? (e == null ? void 0 : e({ ...s, isView: !0 })) ?? String(s.text ?? "");
      return r && typeof r == "string" && s.column.ellipsis ? y("span", { title: r }, r) : r;
    };
    return (s) => y(a, { ...t, ...s, current: s.record });
  } else
    return ({ text: a }) => String(a ?? "");
}
function $o({ buttons: e, methods: n, editButtonsSlot: t, isView: a, effectData: s }) {
  const r = {
    buttonType: "link",
    size: "small",
    ...oe.rowButtons,
    ...Array.isArray(e) ? { actions: e } : e
  }, { columnProps: l, ...o } = r, i = tt({ config: o, methods: n, isView: a });
  if (!i)
    return;
  const u = (b) => (t == null ? void 0 : t(b, o)) || i({ key: b.record, effectData: b });
  return {
    title: "操作",
    key: "action",
    fixed: "right",
    minWidth: 100,
    width: 100,
    align: "center",
    resizable: !1,
    ...l,
    customRender: (b) => y(u, { ...s, ...b, current: b.record })
  };
}
const No = (e, n) => {
  var a;
  const t = e.indexColumn ?? ((a = oe.Table) == null ? void 0 : a.indexColumn);
  if (t)
    return {
      key: "INDEX",
      title: "序号",
      width: 60,
      align: "center",
      customRender: ({ index: s }) => {
        var r, l;
        return ((((r = n.pagination) == null ? void 0 : r.current) || 1) - 1) * (((l = n.pagination) == null ? void 0 : l.pageSize) || 10) + s + 1;
      },
      ...he(t) && t
    };
}, Lo = W({
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
  setup({ option: e, model: n, reload: t, effectData: a, isView: s, ...r }, l) {
    var We, Le, He;
    const o = ((We = e.rowEditor) == null ? void 0 : We.editMode) === "inline", i = l.attrs, u = /* @__PURE__ */ new WeakMap(), b = i.rowKey || "id", m = (F) => {
      const N = F[b];
      if (N)
        return N;
      const ne = re(F);
      return u.has(ne) || u.set(ne, Mt(12)), u.get(ne);
    }, v = (F, N) => u.set(re(F), N), h = me(n, "refData"), f = ((Le = e.attrs) == null ? void 0 : Le.rowSelection) || void 0, d = P((f == null ? void 0 : f.selectedRowKeys) || []), p = P([]), O = f && {
      fixed: !0,
      ...f,
      selectedRowKeys: d,
      onChange: (F, N) => {
        var ne;
        d.value = F, p.value = N, (ne = f == null ? void 0 : f.onChange) == null || ne.call(f, F, N);
      },
      ...o && {
        getCheckboxProps: (F) => {
          var N;
          return {
            disabled: !h.value.includes(F),
            ...(N = f == null ? void 0 : f.getCheckboxProps) == null ? void 0 : N.call(f, F)
          };
        }
      }
    }, c = i.childrenColumnName || "children", g = (F, N = 0, ne = 1) => {
      const de = [], X = N === ne;
      return F.forEach((ue) => {
        ue[c] && (de.push(m(ue)), X || de.push(...g(ue[c], N, ne + 1)));
      }), de;
    }, S = P(((He = e.attrs) == null ? void 0 : He.expandedRowKeys) || []), C = (F) => {
      S.value = F, l.emit("expandedRowsChange", F);
    };
    (r.defaultExpandLevel || i.defaultExpandAllRows) && U(
      h,
      (F, N) => {
        F.length && !(N != null && N.length) && C(g(F, Number(r.defaultExpandLevel)));
      },
      { immediate: !0 }
    );
    const w = jo({ option: e, model: n, orgList: h, rowKey: m, setRowKey: v, listener: {
      async onSave(F, N) {
        var ne;
        if ((ne = e.apis) != null && ne.save)
          return await e.apis.save(F), F.parentId && (S.value = [...S.value, F.parentId]), t == null ? void 0 : t();
        N !== void 0 ? h.value.splice(N + 1, 0, F) : h.value.push(F);
      },
      async onUpdate(F, N) {
        var de;
        (de = e.apis) != null && de.update && await e.apis.update(F), Object.assign(N, F);
        const ne = m(N);
        if (ne) {
          const X = h.value.findIndex((ue) => m(ue) === ne);
          X > -1 && h.value.splice(X, 1, N);
        }
        return t == null ? void 0 : t();
      },
      async onDelete(F) {
        var ne, de;
        const N = F.map((X) => m(X));
        try {
          await ((de = (ne = e.apis) == null ? void 0 : ne.delete) == null ? void 0 : de.call(ne, N, F));
        } catch (X) {
          return console.error(X), X;
        }
        return O && (d.value = d.value.filter((X) => !N.includes(X)), p.value = p.value.filter((X) => !N.includes(m(X)))), F.forEach((X) => {
          h.value.splice(A.value.indexOf(X), 1);
        }), t == null ? void 0 : t();
      }
    }, isView: s, effectData: a }), x = _o({ childrenMap: n.listData.modelsMap, context: w, option: e, attrs: i, isView: s, effectData: a }), { list: A, methods: I, buttonMethods: _ = I, modalSlot: j } = w, T = {
      selectedRowKeys: d,
      selectedRows: p,
      setSelectedRows: (F) => {
        p.value = F, d.value = F.map((N) => m(N));
      },
      expandedRowKeys: S,
      setExpandedRowKeys: C,
      expandAll: () => {
        C(g(h.value));
      },
      add: (F) => {
        var N;
        return (N = I.add) == null ? void 0 : N.call(I, F);
      },
      edit: (F) => {
        var N;
        return (N = I.edit) == null ? void 0 : N.call(I, { ...J, ...F });
      },
      delete: () => {
        var F;
        return (F = I.delete) == null ? void 0 : F.call(I, J);
      },
      detail: (F) => {
        var N;
        return (N = I.detail) == null ? void 0 : N.call(I, { ...J, ...F });
      }
    }, E = q({ ...T }), K = P();
    U(
      K,
      (F) => {
        Object.assign(E, F, T), l.emit("register", E);
      },
      { flush: "sync" }
    );
    const J = q({ ...a, selectedRows: p, selectedRowKeys: d, tableRef: E }), Q = { ...l.slots }, ee = e.buttons, ce = (ee == null ? void 0 : ee.targetSlot) ?? (ee == null ? void 0 : ee.forSlot) ?? "extra";
    if (ee) {
      const F = Q[ce], N = tt({
        config: ee,
        effectData: J,
        methods: _,
        isView: s
      });
      (F || N) && (Q[ce] = () => [F == null ? void 0 : F(), N == null ? void 0 : N()]);
    }
    const L = e.title || e.label, { title: se = L, extra: le, ...ye } = Q, ge = (se || le) && (() => y(Ee, { align: "middle", class: "sup-titlebar" }, () => [
      se && y(
        xe,
        { class: "sup-title" },
        at({ labelSlot: se, tooltip: e.tooltip }, a)
      ),
      le && y(
        xe,
        { class: "sup-title-buttons", flex: 1, style: { textAlign: (ee == null ? void 0 : ee.align) || "right" } },
        le
      )
    ]));
    ye.headerCell = (F) => {
      var N;
      return ((N = Q.headerCell) == null ? void 0 : N.call(Q, F)) || ae(F.title, a);
    };
    const De = () => [
      ...j.map((F) => F()),
      y(
        G.Table,
        {
          ...oe.Table,
          ref: K,
          dataSource: A.value,
          columns: q(x),
          tableLayout: "fixed",
          pagination: !1,
          ...i,
          rowSelection: O,
          rowKey: m,
          expandedRowKeys: S.value,
          "onUpdate:expandedRowKeys": C,
          class: ["sup-table-wrapper", e.editable && "sup-table-editable"]
        },
        ye
      )
    ];
    return e.tabs ? () => y(ko, { ...e.tabs, effectData: a }, {
      [ce]: Q[ce],
      title: se && (() => ae(se, a)),
      extra: le,
      titleBar: ge,
      default: De
    }) : () => [ge == null ? void 0 : ge(), De()];
  }
}), Vo = W({
  props: {
    option: { type: Object, required: !0 },
    model: Object,
    effectData: Object
  },
  setup(e) {
    return () => y(G.Textarea, { style: "width: 100%", allowClear: !0, placeholder: `请输入${e.option.label}` });
  }
}), Bo = {
  key: 0,
  class: "sup-title ant-descriptions-header"
}, Eo = /* @__PURE__ */ W({
  inheritAttrs: !1,
  __name: "Collapse",
  props: {
    option: {},
    model: {},
    effectData: {},
    isView: { type: Boolean }
  },
  setup(e) {
    const { Collapse: n, CollapsePanel: t } = G, a = e, s = a.option.title || a.option.label, r = [...a.model.children].map(([o, i], u) => {
      const b = Re({
        parent: a.effectData,
        current: me(a.model, "parent"),
        field: i.refName,
        value: i.refData
      }), {
        hidden: m,
        attrs: { disabled: v, ...h }
      } = Ie({ option: o, effectData: b }), { key: f, field: d } = o;
      return {
        attrs: q(h),
        option: { ...o, type: "CollapsePanel" },
        effectData: b,
        model: i,
        header: () => ae(o.label),
        key: f || d || String(u),
        hidden: m,
        disabled: v
      };
    }), l = P(a.option.activeKey || r[0].key);
    return (o, i) => ($(), pe(Se, null, [
      R(s) ? ($(), pe("div", Bo, [
        ($(), z(we(R(ae)(R(s), o.effectData))))
      ])) : Ae("", !0),
      fe(R(n), Z({
        activeKey: l.value,
        "onUpdate:activeKey": i[0] || (i[0] = (u) => l.value = u)
      }, o.$attrs), {
        default: te(() => [
          ($(!0), pe(Se, null, Fe(R(r), ({ attrs: u, hidden: b, option: m, disabled: v, model: h, header: f, effectData: d, key: p }) => ($(), pe(Se, { key: p }, [
            b.value ? Ae("", !0) : ($(), z(R(t), Z({
              key: 0,
              collapsible: R(v) ? "disabled" : void 0
            }, u), Bt({
              header: te(() => [
                ($(), z(we(f)))
              ]),
              default: te(() => [
                o.isView ? ($(), z(R(Ue), {
                  key: 0,
                  option: m,
                  modelsMap: h.children,
                  effectData: d
                }, null, 8, ["option", "modelsMap", "effectData"])) : ($(), z(R(Ne), {
                  key: 1,
                  option: m,
                  model: h,
                  effectData: d
                }, null, 8, ["option", "model", "effectData"]))
              ]),
              _: 2
            }, [
              o.isView ? void 0 : {
                name: "extra",
                fn: te(() => [
                  m.buttons ? ($(), z(R(ke), {
                    key: 0,
                    option: m.buttons,
                    effectData: d
                  }, null, 8, ["option", "effectData"])) : Ae("", !0)
                ]),
                key: "0"
              }
            ]), 1040, ["collapsible"]))
          ], 64))), 128))
        ]),
        _: 1
      }, 16, ["activeKey"])
    ], 64));
  }
}), qo = W({
  props: {
    option: {
      required: !0,
      type: Object
    },
    model: Object,
    effectData: Object,
    addonAfter: void 0,
    enterButton: void 0,
    onSearch: Function,
    disabled: Boolean
  },
  setup(e, { slots: n }) {
    const { option: t, effectData: a, addonAfter: s, enterButton: r, onSearch: l } = e, o = q({
      placeholder: "请输入" + (Ar(t.label) ? t.label : ""),
      disabled: me(e, "disabled")
    });
    if (l) {
      const i = P(!1), { addonAfter: u, ...b } = n;
      let m = n.enterButton || (r ? void 0 : u);
      const v = r || s;
      if (!m)
        if (pt(v)) {
          const { label: h, icon: f, ...d } = r;
          m = () => y(
            G.Button,
            { loading: i.value, ...d },
            { icon: () => Pe(f), default: () => ae(h) }
          );
        } else
          ze(v) && (m = () => y(G.Button, { type: "primary", loading: i.value }, v));
      return o.onSearch = async (...h) => {
        i.value = !0;
        try {
          await (l == null ? void 0 : l(...h));
        } finally {
          i.value = !1;
        }
      }, m ? () => y(G.InputSearch, o, { ...b, enterButton: m }) : () => y(G.InputSearch, { ...o, enterButton: v }, b);
    } else
      return () => y(G.Input, { ...o, addonAfter: s }, n);
  }
}), Uo = /* @__PURE__ */ W({
  __name: "InputNumber",
  props: {
    option: {},
    model: {},
    effectData: {}
  },
  setup(e) {
    const { InputNumber: n } = G;
    return (t, a) => ($(), z(R(n), {
      style: { width: "100%" },
      type: "number",
      placeholder: "请输入" + t.option.label
    }, null, 8, ["placeholder"]));
  }
}), zo = /* @__PURE__ */ W({
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
  setup(e, { emit: n }) {
    var v;
    const { Select: t } = G, a = n, s = e, { options: r, labelField: l } = s.option, o = Sn(), { optionsRef: i, setOptions: u } = Ge(s.option, s.options, s.effectData);
    let b = s.onChange;
    if (l) {
      const h = ((v = s.fieldNames) == null ? void 0 : v.label) || "label";
      b = (...f) => {
        var p;
        const d = f[1];
        a("update:labelValue", Array.isArray(d) ? d.map((O) => O[h]) : d == null ? void 0 : d[h]), (p = s.onChange) == null || p.call(s, ...f);
      };
    }
    let m = s.onSearch && $t(s.onSearch, 600, { leading: !1 });
    return o.showSearch && !m && typeof r == "function" && (m = $t((f) => {
      Promise.resolve(r(s.effectData, f)).then((d) => {
        u(d);
      });
    }, 600, { leading: !1 })), (h, f) => ($(), z(R(t), {
      "option-filter-prop": "label",
      placeholder: "请选择" + h.option.label,
      options: R(i),
      onChange: R(b),
      onSearch: R(m)
    }, Bt({ _: 2 }, [
      Fe(h.$slots, (d, p) => ({
        name: p,
        fn: te((O) => [
          ps(h.$slots, p, gt(kt(O || {})))
        ])
      }))
    ]), 1032, ["placeholder", "options", "onChange", "onSearch"]));
  }
}), Ho = W({
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
  setup(e, n) {
    const [t, a] = e.option.valueLabels || [], { optionsRef: s } = Ge(e.option, e.options, e.effectData), r = e.valueToNumber ? 1 : !0, l = e.valueToNumber ? 0 : !1, o = H(() => {
      const [i, u] = s.value;
      return e.firstIsChecked ? {
        checkedChildren: (i == null ? void 0 : i.label) ?? a,
        unCheckedChildren: (u == null ? void 0 : u.label) ?? t,
        checkedValue: (i == null ? void 0 : i.value) ?? r,
        unCheckedValue: (u == null ? void 0 : u.value) ?? l
      } : {
        checkedChildren: (u == null ? void 0 : u.label) ?? a,
        unCheckedChildren: (i == null ? void 0 : i.label) ?? t,
        checkedValue: (u == null ? void 0 : u.value) ?? r,
        unCheckedValue: (i == null ? void 0 : i.value) ?? l
      };
    });
    return U(
      () => [e.value, s.value],
      ([i, u]) => {
        i === void 0 && (!e.options || u.length) && n.emit("update:value", e.defaultChecked ? o.value.checkedValue : o.value.unCheckedValue);
      },
      { immediate: !0 }
    ), () => y(
      G.Switch,
      q({
        ...o.value,
        checked: e.value,
        "onUpdate:checked": (i) => n.emit("update:value", i)
      })
    );
  }
}), Ko = W({
  props: {
    option: Object,
    model: Object,
    effectData: Object,
    disabledDate: Function
  },
  setup(e, n) {
    const t = (a) => {
      var s;
      return (s = e.disabledDate) == null ? void 0 : s.call(e, a, e.effectData);
    };
    return () => y(G.RangePicker, { valueFormat: "YYYY-MM-DD", disabledDate: t }, n.slots);
  }
}), Go = W({
  props: {
    option: Object,
    model: Object,
    effectData: Object,
    disabledDate: Function
  },
  setup(e, n) {
    const t = (a) => {
      var s;
      return (s = e.disabledDate) == null ? void 0 : s.call(e, a, e.effectData);
    };
    return () => y(G.DatePicker, { valueFormat: "YYYY-MM-DD", disabledDate: t }, n.slots);
  }
}), Wo = W({
  props: {
    option: { type: Object, required: !0 },
    model: Object,
    effectData: Object,
    options: null,
    /** 字典名称 */
    dictName: String
  },
  setup(e, n) {
    const { optionsRef: t } = Ge({ ...e.option, labelAsValue: !0 }, e.options, e.effectData);
    return () => y(
      G.AutoComplete,
      { placeholder: `请输入${e.option.label}`, options: t.value, filterOption: !0 },
      n.slots
    );
  }
}), Yo = W({
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
    options: null,
    onChange: Function
  },
  emits: ["update:labelValue"],
  setup(e, { attrs: n, emit: t }) {
    const { optionsRef: a } = Ge(e.option, e.options, e.effectData), s = n.optionType || n.buttonStyle && "button";
    let r = e.onChange;
    return e.option.labelField && (r = (l) => {
      var i, u;
      const o = (i = a.value.find((b) => b.value === l.target.value)) == null ? void 0 : i.label;
      t("update:labelValue", o), (u = e.onChange) == null || u.call(e, l);
    }), () => y(
      G.RadioGroup,
      { name: e.option.field, optionType: s, onChange: r },
      () => a.value.map(
        (l) => y(
          s === "button" ? Tn : kn,
          { value: l.value, disabled: l.disabled },
          () => ae(l.label, e.effectData)
        )
      )
    );
  }
}), Zo = W({
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
    options: null,
    onChange: Function
  },
  emits: ["update:labelValue"],
  setup(e, n) {
    const { optionsRef: t } = Ge(e.option, e.options, e.effectData);
    let a = e.onChange;
    return e.option.labelField && (a = (r) => {
      var o;
      const l = r.map((i) => {
        var u;
        return (u = t.value.find(({ value: b }) => b == i)) == null ? void 0 : u.label;
      });
      n.emit("update:labelValue", l), (o = e.onChange) == null || o.call(e, r);
    }), () => y(G.CheckboxGroup, { options: t.value, name: e.option.field, onChange: a });
  }
}), Qo = W({
  props: {
    option: { type: Object, required: !0 },
    effectData: { type: Object, required: !0 },
    model: Object,
    onChange: Function
  },
  emits: ["update:labelValue"],
  setup(e, n) {
    const t = P([]), { data: a, treeData: s = a, labelField: r, label: l } = e.option;
    typeof s == "function" ? Cn(() => {
      Promise.resolve(s(e.effectData)).then((i) => {
        t.value = i || [];
      });
    }) : s && U(
      () => R(s),
      (i) => t.value = i,
      { immediate: !0 }
    );
    let o = e.onChange;
    return r && (o = (...i) => {
      var m;
      const [u, b] = i;
      n.emit("update:labelValue", Array.isArray(u) ? b : b[0]), (m = e.onChange) == null || m.call(e, ...i);
    }), () => y(
      G.TreeSelect,
      { allowClear: !0, placeholder: `请选择${l}`, onChange: o, treeData: t.value },
      n.slots
    );
  }
}), Jo = /* @__PURE__ */ W({
  __name: "Preview",
  props: {
    images: {},
    visible: { type: Boolean },
    current: {},
    width: {},
    height: {}
  },
  emits: ["update:value"],
  setup(e, { emit: n }) {
    const t = n, a = (s) => {
      t("update:value", s);
    };
    return (s, r) => ($(), z(R(tn).PreviewGroup, {
      style: { display: "none" },
      preview: {
        visible: s.visible,
        onVisibleChange: a,
        current: s.current
      }
    }, {
      default: te(() => [
        ($(!0), pe(Se, null, Fe(s.images, (l, o) => ($(), z(R(tn), {
          key: o,
          width: s.width,
          src: l,
          height: s.height
        }, null, 8, ["width", "src", "height"]))), 128))
      ]),
      _: 1
    }, 8, ["preview"]));
  }
});
function Xo(e) {
  const n = P(!1), t = q({
    visible: n,
    images: [],
    "onUpdate:value": (i) => n.value = i,
    ...e
  }), a = P(!1), s = () => !a.value && y(Jo, t), r = wn();
  Ot(() => {
    a.value = !0;
  });
  let l;
  return { open: (i) => {
    if (typeof i == "string")
      t.images = [i];
    else if (Array.isArray(i))
      t.images = [...i];
    else {
      const { src: u, ...b } = i || {};
      u && (t.images = [u]), Object.assign(t, b);
    }
    if (!l) {
      const u = document.createElement("div");
      l = fe(s, { appContext: r == null ? void 0 : r.appContext }), l.appContext = r == null ? void 0 : r.appContext, Tt(l, u);
    }
    $e(() => n.value = !0);
  } };
}
function el(e, n) {
  return new Promise((t, a) => {
    const s = new FileReader();
    n === "text" ? s.readAsText(e) : s.readAsDataURL(e), s.onload = () => t({ result: s.result, file: e }), s.onerror = (r) => a(r);
  });
}
function tl(e, n, t) {
  const a = typeof t < "u" ? [t, e] : [e], s = new Blob(a, { type: "application/octet-stream" }), r = window.URL.createObjectURL(s), l = document.createElement("a");
  l.style.display = "none", l.href = r, l.setAttribute("download", n), typeof l.download > "u" && l.setAttribute("target", "_blank"), document.body.appendChild(l), l.click(), document.body.removeChild(l), window.URL.revokeObjectURL(r);
}
function nl(e, n) {
  return n.split(",").some((t) => {
    var a;
    return ((a = e.name) == null ? void 0 : a.endsWith(t)) || e.type && new RegExp(`^${t.replace("*", "\\S*")}$`).test(e.type);
  });
}
const sl = ".png,.jpg,.jpeg,.gif,.webp,.svg,.tif,.tiff";
function al(e) {
  var n, t, a, s;
  if (e.thumbUrl)
    return !0;
  if (e.url || e.originFileObj) {
    const r = (t = (n = e.name || e.url) == null ? void 0 : n.match(/[^\\.]*$/)) == null ? void 0 : t[0];
    if (r && sl.includes(r))
      return !0;
    {
      const l = e.type || ((s = (a = e.url) == null ? void 0 : a.match(/^data:(\S*?);/)) == null ? void 0 : s[1]);
      return l == null ? void 0 : l.startsWith("image");
    }
  }
}
function vn(e, n) {
  const t = Ct.info({
    title: () => e,
    okButtonProps: {
      loading: !0
    },
    closable: !1,
    centered: !0,
    maskClosable: !1,
    keyboard: !1,
    onOk: n
  });
  return { setError: (s, r) => {
    t.update({
      icon: () => y(ya),
      okButtonProps: {
        loading: !1
      },
      type: "error",
      title: s,
      content: r == null ? void 0 : r.message
    });
  }, ...t };
}
const rl = W({
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
  setup(e, n) {
    const {
      uploadMode: t = "auto",
      apis: a = {},
      isSingle: s,
      minSize: r,
      maxSize: l,
      infoNames: o,
      repeatable: i,
      showUploadList: u,
      onPreview: b,
      onDownload: m,
      isImageUrl: v = al,
      hideOnMax: h,
      valueKey: f
    } = e, d = (s ? 1 : e.maxCount) || 1 / 0, { accept: p, listType: O } = n.attrs, c = Xo(), g = {
      ...f && { [f]: f },
      uid: "uid",
      status: "status",
      url: "url",
      name: "name",
      ...o
    };
    t === "custom" && (g.originFileObj = "originFileObj");
    const S = (M) => {
      const k = { status: "done", ...M };
      return Object.entries(g).forEach(([B, V]) => {
        V && V !== B && V in k && (k[B] = k[V], delete k[V]);
      }), k;
    }, C = (M) => {
      const k = {};
      return Object.entries(g).forEach(([B, V]) => {
        const Oe = M[B];
        V && Oe !== void 0 && (k[V] = Oe);
      }), k;
    }, { onSubmit: D } = Ce("exaProvider", {}), w = P([]), x = vt([]), A = vt(), I = /* @__PURE__ */ new Map(), _ = /* @__PURE__ */ new Map(), j = (M) => {
      x.value = M.map(C), e.isView || (n.emit("update:fileList", x.value), T()), w.value = M;
    }, T = () => {
      if (e.isSingle) {
        const M = re(x.value[0]);
        A.value = f ? (M == null ? void 0 : M[f]) ?? (M == null ? void 0 : M[g.uid]) : M;
      } else
        f ? A.value = x.value.map((M) => M[f] ?? M[g.uid]) : A.value = x.value;
      n.emit("update:value", A.value);
    };
    U(
      () => re(e.value),
      (M) => {
        if (M !== A.value)
          if (A.value = M, !M)
            w.value = [];
          else {
            const k = it(M) ? M : [M];
            x.value = f ? k.map((B) => ({ [f]: B })) : k, w.value = x.value.map(S);
          }
      },
      { immediate: !0, flush: "sync" }
    ), U(
      () => re(e.fileList),
      (M) => {
        if (M && M !== x.value) {
          const k = M.map(S);
          j(k);
        }
      },
      { immediate: !0 }
    );
    const E = P(!1);
    D == null || D(() => {
      let M = Promise.resolve();
      if (t === "auto")
        for (const k of w.value) {
          if (k.status === "error") {
            const B = k.response || { message: "文件上传错误，请删除后重新上传！" };
            return Promise.reject(B);
          } else
            k.status === "uploading" && (E.value = !0);
          M = Promise.all(I.values());
        }
      else if (t === "submit") {
        const k = [];
        for (const B of w.value) {
          if (B.status !== "done") {
            E.value = !0, B.status = "uploading";
            const V = _.get(B.uid);
            k.push(V());
          }
          M = Promise.all(k);
        }
      }
      if (se.size && (E.value = !0), E.value) {
        const k = vn(" 文件同步中，请稍候...");
        return M.then(
          (B) => (
            // 文件删除出错不中断提交
            Promise.all([...se.values()].map((V) => V())).then(() => B).catch((V) => console.error(V)).finally(() => (k == null || k.destroy(), E.value = !1, B))
          )
        ).catch((B) => (E.value = !1, k.setError("文件上传失败", B), !1));
      }
      return M;
    });
    const K = (M, k) => {
      if (e.beforeUpload) {
        const V = e.beforeUpload(M, k);
        if (V !== void 0)
          return V;
      }
      const B = (() => {
        if (d > 1 && x.value.length + k.indexOf(M) >= d)
          return "文件数量最多" + d;
        if (p && !nl(M, p))
          return "请选择正确的文件类型！";
        if (r || l) {
          const V = M.size / 1024 / 1024;
          if (r && r > V)
            return "文件最小需要" + r + "M";
          if (l && l < V)
            return "文件最大不超过" + l + "M";
        }
        if (!i) {
          const V = w.value.find((Oe) => Oe.name === M.name);
          if (V)
            return `文件重复: ${V.name}`;
        }
      })();
      if (B)
        return zt.error(B), Pn.LIST_IGNORE;
      if (t === "custom") {
        if (u !== !1)
          return !1;
      } else if (d === 1 && w.value.length) {
        const V = w.value[0];
        if (I.delete(V.uid), _.delete(V.uid), V.status === "done" && a.delete) {
          const Oe = { ...x.value[0] };
          se.set(Oe, () => a.delete(Oe));
        }
      }
    };
    function J({ file: M, fileList: k, event: B }) {
      var V;
      M.status === "removed" ? (I.delete(M.uid), _.delete(M.uid)) : M.status === "uploading" && !B && t !== "auto" && (M.status = "waiting"), (V = e.onChange) == null || V.call(e, { file: M, fileList: k, event: B }), j([...k]);
    }
    const Q = (M) => {
      const { file: k } = M;
      if (t === "auto") {
        const B = L(M);
        return I.set(k.uid, B), B;
      } else if (t === "submit")
        _.set(k.uid, () => L(M));
      else if (t === "base64" || t === "text")
        return el(k, t).then(({ result: B }) => ce({ url: B }, k));
    }, ee = (M, k) => {
      const B = w.value.find((V) => V.uid === k.uid);
      return Object.assign(B, { error: M, status: "error" }), j([...w.value]), Promise.reject(M);
    }, ce = (M, k) => {
      const B = w.value.find((V) => V.uid === k.uid);
      return Object.assign(B, S(M), { status: "done" }), j([...w.value]), M;
    }, L = (M) => {
      const { file: k, filename: B, onProgress: V, onError: Oe, onSuccess: Ye } = M;
      if (!a.upload)
        return Promise.resolve().then(() => ee(Error("Api config error"), k));
      const rt = new FormData();
      rt.append(B, k);
      const cs = (Te) => {
        Te.total > 0 && (Te.percent = Te.loaded / Te.total * 100), V(Te);
      };
      return a.upload(rt, { onUploadProgress: cs }).then(
        (Te) => ce(Te, k),
        (Te) => ee(Te, k)
      );
    }, se = /* @__PURE__ */ new Map(), le = async (M) => {
      var B;
      let k = await ((B = e.onRemove) == null ? void 0 : B.call(e, M));
      return k !== !1 && a.delete && M.status === "done" ? new Promise((V) => {
        const Oe = Ct.confirm({
          title: "确定删除吗？",
          okText: "确定",
          cancelText: "取消",
          closable: !1,
          maskClosable: !1,
          ...oe.Modal,
          onOk() {
            const Ye = C(M), rt = () => a.delete(Ye);
            if (t === "submit")
              se.set(
                Ye,
                () => rt()
                // .then(
                //   () => removeFileMap.delete(__file)
                //   // () => updateFileList([...innerFileList.value, __file]) // 删除失败后还原文件
                // )
              ), V(!0);
            else
              return Oe.update({
                okCancel: !1,
                title: "文件删除中……"
              }), rt().then(V, () => (Oe.update({
                okCancel: !1,
                title: "文件删除失败",
                type: "error",
                onOk: void 0
              }), V(!1), Promise.reject()));
          },
          onCancel() {
            V(!1);
          }
        });
      }) : k;
    }, ye = P(!1), ge = m || ((M) => {
      if (a.download && !ye.value) {
        const k = vn("文件下载中，请稍候...");
        a.download(C(M)).then((B) => tl(B, M.name)).then(() => k.destroy()).catch((B) => {
          k.setError("文件下载失败", B);
        }).finally(() => E.value = !1);
      }
    }), De = H(
      () => typeof u == "boolean" ? u : {
        showRemoveIcon: !e.isView && !e.disabled,
        showDownloadIcon: e.isView,
        ...u
      }
    ), We = async (M) => {
      if (b) {
        const k = await b(C(M));
        k && c.open(k);
      } else if (v(M)) {
        let k;
        const B = w.value.filter((V) => v(V)).map((V, Oe) => {
          V === M && (k = Oe);
          const Ye = V.url || V.thumbUrl;
          return !Ye && V.originFileObj && (V.objectUrl = window.URL.createObjectURL(V.originFileObj)), Ye || V.objectUrl;
        });
        c.open({ images: B, current: k });
      }
    }, Le = ({ file: M, listType: k }) => M.status === "waiting" ? y(Ur) : M.status === "uploading" ? y(va) : y(ha), He = e.title, F = typeof e.title == "string" ? e.title : "上传文件", N = q({ ...re(e.effectData), fileList: w }), ne = ze(He) && (() => He(N)), de = [];
    p && de.push("支持文件格式：" + p), l && de.push("单个文件不超过" + l + "MB");
    const X = e.tip ?? de.join(", "), ue = { ...n.slots };
    O === "picture-card" ? ue.default = () => {
      var M, k;
      return ((k = (M = n.slots).default) == null ? void 0 : k.call(M, N)) || y("div", [y(Dt), ne ? ne() : y("div", { style: "margin-top:8px" }, F)]);
    } : ue.default = () => {
      var M, k;
      return [
        ((k = (M = n.slots).default) == null ? void 0 : k.call(M, N)) || y(G.Button, {}, () => [y(Gr), ne ? ne() : F]),
        X && y("div", { class: "sup-upload-tip" }, X)
      ];
    };
    const Me = H(() => e.disabled || e.isView), us = H(() => h && d && w.value.length >= d);
    return () => Me.value && w.value.length === 0 ? y("div", { class: "sup-upload-tip" }, "暂无附件") : y(
      G.Upload,
      {
        class: { "upload-disabled": Me.value },
        customRequest: Q,
        beforeUpload: K,
        fileList: w.value,
        onChange: J,
        onPreview: We,
        onRemove: le,
        showUploadList: De.value,
        maxCount: d,
        isImageUrl: v,
        iconRender: Le,
        onDownload: ge
      },
      {
        ...ue,
        default: () => Me.value || (us.value ? null : ue.default())
      }
    );
  }
}), ol = /* @__PURE__ */ W({
  inheritAttrs: !1,
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
    closable: { type: Boolean, default: !0 }
  },
  emits: ["update:value"],
  setup(e, { emit: n }) {
    const { Input: t, Tooltip: a, Tag: s } = G, r = e, l = n, o = P(), i = P(""), u = P(!1), b = (p, O) => typeof r.closable == "function" ? r.closable(p, O) : r.closable, m = H(() => r.value ? typeof r.value == "string" ? r.value.split(",") : r.value : []), v = () => {
      u.value = !0, $e(() => {
        o.value.focus();
      });
    }, h = (p) => {
      const O = m.value.filter((c) => c !== p);
      f(O);
    }, f = (p) => {
      r.stringifyValue || r.valueToString ? l("update:value", p.join(",")) : l("update:value", p);
    }, d = () => {
      i.value && m.value.indexOf(i.value) === -1 && f([...m.value, i.value]), u.value = !1, i.value = "";
    };
    return (p, O) => ($(), pe(Se, null, [
      ($(!0), pe(Se, null, Fe(m.value, (c, g) => ($(), pe(Se, { key: c }, [
        c.length > 20 ? ($(), z(R(a), {
          key: 0,
          title: c
        }, {
          default: te(() => [
            fe(R(s), Z({
              closable: b(c, g),
              onClose: (S) => h(c)
            }, p.$attrs), {
              default: te(() => [
                Pt(ht(`${c.slice(0, 20)}...`), 1)
              ]),
              _: 2
            }, 1040, ["closable", "onClose"])
          ]),
          _: 2
        }, 1032, ["title"])) : ($(), z(R(s), Z({
          key: 1,
          closable: b(c, g),
          onClose: (S) => h(c)
        }, p.$attrs), {
          default: te(() => [
            Pt(ht(c), 1)
          ]),
          _: 2
        }, 1040, ["closable", "onClose"]))
      ], 64))), 128)),
      u.value ? ($(), z(R(t), {
        key: 0,
        ref_key: "inputRef",
        ref: o,
        value: i.value,
        "onUpdate:value": O[0] || (O[0] = (c) => i.value = c),
        type: "text",
        size: "small",
        style: { width: "78px" },
        onBlur: d
      }, null, 8, ["value"])) : ($(), z(R(s), {
        key: 1,
        style: { background: "#fff", "border-style": "dashed" },
        onClick: v
      }, {
        default: te(() => [
          fe(R(Dt)),
          ($(), z(we(() => R(ae)(p.newLabel, p.effectData))))
        ]),
        _: 1
      }))
    ], 64));
  }
}), ll = {
  key: 1,
  class: "ant-form-item-extra"
}, il = /* @__PURE__ */ W({
  inheritAttrs: !1,
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
  setup(e, { emit: n }) {
    const { CheckableTag: t } = G, a = e, s = n, { optionsRef: r } = Ge(a.option, a.options, a.effectData), l = H(() => {
      const { value: u } = a, b = a.stringifyValue || a.valueToString;
      return u === void 0 ? [] : b ? u.split(",") : Array.isArray(u) ? u : [u];
    }), o = (u, b) => {
      const m = a.multiple ? b ? [...l.value, u] : l.value.filter((v) => v !== u) : [u];
      s("check", u, b), i(m), s("change", u, m);
    }, i = (u) => {
      a.multiple ? a.stringifyValue || a.valueToString ? s("update:value", u.join(",")) : s("update:value", u) : s("update:value", u[0]);
    };
    return (u, b) => R(r).length ? ($(!0), pe(Se, { key: 0 }, Fe(R(r), ({ label: m, value: v }) => ($(), z(R(t), Z(u.$attrs, {
      class: "tag-select",
      key: v,
      checked: l.value.indexOf(v) > -1,
      onChange: (h) => o(v, h)
    }), {
      default: te(() => [
        Pt(ht(m), 1)
      ]),
      _: 2
    }, 1040, ["checked", "onChange"]))), 128)) : ($(), pe("div", ll, ht(u.placeholder), 1));
  }
}), as = {
  Form: bo,
  Group: jt,
  Card: ho,
  List: yo,
  ListGroup: So,
  Tabs: wo,
  Table: Lo,
  Collapse: Eo,
  Descriptions: jt,
  Fragment: jt
}, rs = {
  Textarea: Vo,
  Input: qo,
  InputNumber: Uo,
  InputGroup: go,
  InputList: vo,
  AutoComplete: Wo,
  Select: zo,
  Switch: Ho,
  DateRange: Ko,
  TimeRange: G.TimeRangePicker,
  DatePicker: Go,
  TimePicker: G.TimePicker,
  Radio: Yo,
  Checkbox: Zo,
  TreeSelect: Qo,
  Upload: rl,
  TagInput: ol,
  TagSelect: il
}, ft = Object.keys(as), ul = Object.keys(rs), os = { ...rs, ...as };
function cl(e, n) {
  const t = `Ext${e}`;
  os[t] = (a) => y(n, a);
}
const be = os, ie = {
  tagViewer: ["pink", "red", "orange", "green", "cyan", "blue", "purple"]
}, oe = {
  FormItem: {
    validateFirst: !0
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
}, dl = async (e, n = {}) => {
  const { locale: t, components: a, defaultProps: s, ...r } = n;
  e.provide("localeData", { locale: t, exist: !0 }), Object.assign(ie, r), a && co(a), s && is(s);
};
function ls(e, n) {
  cl(e, n);
}
function fl(e, n) {
  ls(e, n);
}
function is(e) {
  At(oe, e);
}
const Al = {
  install: dl,
  registerComponent: ls,
  registComponent: fl,
  setDefaultProps: is
};
const pl = (e) => {
  var n, t;
  return ((t = (n = ie.tableApiSetting) == null ? void 0 : n.resultTransform) == null ? void 0 : t.call(n, e)) || e;
}, ml = (e) => {
  const { currentField: n, sizeField: t } = ie.tableApiSetting || {};
  return n || t ? {
    [n || "current"]: e.current,
    [t || "size"]: e.size
  } : e;
};
function bl(e, n) {
  const t = q({}), a = P(!1);
  let s = {}, r = 0, l;
  const o = [], i = (g) => o.push(g);
  e.onLoaded && o.push(e.onLoaded);
  const u = async (g) => {
    var A, I, _;
    const S = lt({}, ml(t), s, g), C = ((A = e.beforeQuery) == null ? void 0 : A.call(e, S)) || S, D = (I = e.apis) == null ? void 0 : I.query;
    l == null || l.abort();
    const w = ++r;
    if (!D) {
      l = void 0, a.value = !1;
      return;
    }
    const x = new AbortController();
    l = x, a.value = !0;
    try {
      const j = await D(C, { signal: x.signal });
      if (w !== r || x.signal.aborted)
        return;
      const T = ((_ = e.afterQuery) == null ? void 0 : _.call(e, j)) || j;
      return b(pl(T));
    } finally {
      w === r && (l = void 0, a.value = !1);
    }
  }, b = (g) => (Array.isArray(g) ? (n(g), c.value !== !1 && (t.current = 1, c.value = { ...c.value, total: g.length })) : g != null && g.records && (n(g.records), c.value !== !1 && (t.current = g.current, t.size = g.size, c.value = { ...c.value, total: g.total })), Promise.all(o.map((S) => S(g)))), m = (g, S = t.size) => (t.current = g, t.size = S, u()), v = (g) => (c.value && (t.current = 1), u(g)), h = $t(v, 300, { leading: !1 }), f = () => {
    l == null || l.abort(), l = void 0, r += 1, a.value = !1;
  }, d = {}, p = (g, S) => {
    S === "dynamic" ? s = lt({}, d, g) : (Object.assign(d, g), lt(s, g));
  }, O = () => s, c = P(!1);
  return U(
    () => {
      var g;
      return e.pagination ?? ((g = e.attrs) == null ? void 0 : g.pagination);
    },
    (g) => {
      if (g === !1) {
        c.value = !1;
        return;
      }
      Object.assign(t, { size: (g == null ? void 0 : g.pageSize) || 10, current: (g == null ? void 0 : g.current) || 1 }), c.value = Z(
        {
          onChange: m
          // onShowSizeChange: goPage,
        },
        {
          ...g,
          pageSize: t.size,
          current: t.current
        }
      );
    },
    {
      immediate: !0,
      flush: "sync"
    }
  ), U(t, (g) => {
    c.value && (c.value = { ...c.value, pageSize: g.size, current: g.current });
  }), {
    goPage: m,
    reload: u,
    throttleRequest: h,
    cancelQuery: f,
    setQueryParams: p,
    getQueryParams: O,
    query: v,
    pagination: c,
    setPageData: b,
    onLoaded: i,
    loading: a
  };
}
function gl(e, n, t) {
  var c;
  const { columns: a, searchForm: s } = e, r = s || e.searchSchema || {}, l = P(), o = r.dataSource || q({}), { buttons: i = {}, searchOnChange: u, limit: b, ...m } = r, v = P(!1), h = [];
  r.subItems.forEach((g) => {
    if (typeof g == "string") {
      const S = a.find((C) => C.field === g);
      S && h.push({ type: "Input", ...Sa(S, "span", "disabled", "hidden"), editable: !0, exclude: [] });
    } else
      return h.push({ ...g });
  }), b && h.length > b && h.forEach((g, S) => {
    if (S >= b) {
      const C = g.hidden;
      g.hidden = (...D) => !v.value || (C == null ? void 0 : C(...D));
    }
  });
  const f = {
    search() {
      var g;
      t(o), (g = r.onSubmit) == null || g.call(r, re(o));
    },
    reset(g) {
      l.value.resetFields(g);
    }
  }, d = Array.isArray(i) ? { actions: i } : { ...i };
  d.actions ?? (d.actions = u ? void 0 : ["search", "reset"]), (c = d.actions) != null && c.length && (b && h.length > b && (d.actions = [
    {
      label: () => v.value ? ["收起 ", y(Oa)] : ["展开 ", y(Mn)],
      attrs: { type: "link" },
      onClick: () => v.value = !v.value
    },
    ...d.actions
  ]), h.push({
    type: "InfoSlot",
    align: "right",
    span: "auto",
    render: () => y(ke, {
      option: d,
      methods: f,
      effectData: Re({ table: n, form: l })
    })
  }));
  const p = U(l, () => {
    t(o), u && U(o, t), p();
  });
  return { formNode: () => y(be.Form, {
    option: {
      ...m,
      ignoreRules: !0,
      dataSource: o,
      subItems: h
    },
    ref: l,
    onSubmit: f.search,
    onReset: f.search
  }), formRef: l, ...f, dataSource: o };
}
function vl(e) {
  return !e || !e.getBoundingClientRect ? 0 : e.getBoundingClientRect();
}
function hn(e) {
  const n = document.documentElement, t = n.scrollLeft, a = n.scrollTop, s = n.clientLeft, r = n.clientTop, l = window.pageXOffset, o = window.pageYOffset, i = vl(e), { left: u, top: b, width: m, height: v } = i, h = (l || t) - (s || 0), f = (o || a) - (r || 0), d = u + l, p = b + o, O = d - h, c = p - f, g = window.document.documentElement.clientWidth, S = window.document.documentElement.clientHeight;
  return {
    left: O,
    top: c,
    right: g - m - O,
    bottom: S - v - c,
    rightIncludeBody: g - O,
    bottomIncludeBody: S - c
  };
}
function hl(e, n, t, a) {
  const s = In(i, 100), r = P({});
  let l = !1;
  const o = () => {
    var v;
    l = !0, a ? window.addEventListener("resize", s, { signal: a.signal }) : document.addEventListener("redoHeight", s), r.value = (v = e.attrs) == null ? void 0 : v.scroll, U(
      () => {
        var h;
        return [t.value, (h = R(n)) == null ? void 0 : h.length];
      },
      () => {
        s();
      },
      { flush: "post" }
    );
    const m = U(
      t,
      (h) => {
        h && (h.style.overflow = "hidden", new ResizeObserver(() => {
          s();
        }).observe(h), m());
      },
      { immediate: !0, flush: "post" }
    );
  };
  Ot(() => {
    l && document.removeEventListener("redoHeight", s);
  });
  function i() {
    l && $e(() => {
      b();
    });
  }
  function u(m) {
    r.value = {
      y: m,
      x: "100%"
      // scrollToFirstRowOnChange: true,
    };
  }
  async function b() {
    var Q;
    const { maxHeight: m, inheritHeight: v, isFixedHeight: h, resizeHeightOffset: f } = e, d = R(t);
    if (!d)
      return;
    const p = d.querySelector(".ant-table");
    if (!p)
      return;
    await $e();
    const O = getComputedStyle(d.parentElement), c = hn(p), g = hn(d), S = c.left - g.left, C = (parseInt(O.marginBottom) || 0) + (parseInt(O.paddingBottom) || 0);
    let D = 0;
    d && v ? D = g.bottomIncludeBody - g.bottom - (c.top - g.top) : D = c.bottomIncludeBody - C;
    const w = p.querySelector(".ant-table-title"), x = (w == null ? void 0 : w.parentElement) === p ? w.offsetHeight ?? 0 : 0, A = p.querySelector(".ant-table-thead ");
    if (!A)
      return;
    let I = 0;
    A && (I = A.offsetHeight);
    let _ = 0;
    const j = p.querySelector(".ant-table-footer");
    j && j.parentElement === p && (_ += j.offsetHeight || 0);
    let T = 0;
    const E = d.querySelector(".ant-pagination");
    E && (T = E.offsetHeight + 16);
    let K = Math.ceil(D) - (f || 0) - S - T;
    const J = m || K - _ - x - I - 1;
    if (m && h && (K = m + _ + x + I + 1), h) {
      p.style.height = `${K}px`, p.style["overflow-y"] = "hidden", v || (d.style.height = "unset");
      const ee = d.querySelector(".ant-table-wrapper");
      if (ee.style.height = "", ee.style["overflow-y"] = void 0, !(((Q = R(n)) == null ? void 0 : Q.length) > 0)) {
        if (p.querySelector(".ant-empty")) {
          const L = p.querySelector(".ant-table-tbody .ant-table-cell");
          L.style.height = `${J}px`;
        }
        return;
      }
    }
    if (p.scrollHeight > K)
      u(J);
    else {
      const ee = p.querySelector(".ant-table-body");
      ee && u(ee.scrollHeight <= J ? null : J);
    }
  }
  return { getScrollRef: r, redoHeight: i, debounceRedoHeight: s, listenResize: o };
}
const yl = W({
  name: "SuperTable",
  inheritAttrs: !1,
  props: {
    dataSource: Array,
    schema: Object
  },
  emits: ["register", "load", "update:dataSource"],
  setup(e, n) {
    const { style: t, class: a, ...s } = n.attrs, r = St({ attrs: s }), l = P([]), o = P(), i = (L) => {
      l.value = L, n.emit("update:dataSource", L), Je(r.dataSource) && (r.dataSource.value = L);
    };
    Ke(() => e.dataSource && i(e.dataSource)), Ke(() => r.dataSource && i(R(r.dataSource)));
    const u = P(), b = (L) => {
      ie.schemaDiagnostics && dt(L, "table", "SuperTable");
      const { isScanHeight: se, inheritHeight: le, isFixedHeight: ye, isContainer: ge, ...De } = Z(
        oe.Table,
        { ...L.attrs },
        { ...r.attrs }
      );
      Object.assign(r, { isScanHeight: se, inheritHeight: le, isFixedHeight: ye, isContainer: ge }, L, { attrs: De });
    };
    Ke(() => e.schema && b(re(e.schema)));
    const {
      loading: m,
      pagination: v,
      setPageData: h,
      onLoaded: f,
      goPage: d,
      reload: p,
      query: O,
      throttleRequest: c,
      cancelQuery: g,
      setQueryParams: S,
      getQueryParams: C
    } = bl(r, i), { getScrollRef: D, redoHeight: w, listenResize: x } = hl(r, l, o), A = vt(), I = {
      setOption: b,
      setData: (L) => {
        L && i(L);
      },
      redoHeight: w,
      goPage: d,
      reload: p,
      query: O,
      onLoaded: f,
      resetSearchForm(L) {
        try {
          return u.value.formRef.resetFields(L);
        } catch (se) {
          console.warn(se);
        }
      },
      setPageData: h,
      getQueryParams: C,
      getData: () => l.value,
      dataRef: l,
      searchForm: H(() => {
        var L;
        return (L = u.value) == null ? void 0 : L.formRef;
      }),
      validate: async () => {
        var L;
        return (L = A.value) == null ? void 0 : L.validate();
      },
      setColumns: (L) => {
        var se;
        !Q && !((se = r.columns) != null && se.length) ? Object.assign(r, { columns: L }) : (Object.assign(r, { columns: L }), ce(L));
      }
    }, _ = P({ ...I }), j = (L) => {
      Object.assign(_.value, je(L), I), n.emit("register", _.value);
    };
    n.emit("register", _.value), n.expose(_.value);
    const T = q({
      reload: p,
      onRegister: j,
      loading: m
    });
    Ot(() => {
      g(), n.emit("register", null);
    }), Ve("rootSlots", n.slots);
    const E = P({}), K = P(), J = q({ formData: l, current: l, queryParams: H(C) });
    let Q = !1;
    const ee = U(
      r,
      (L) => {
        var ne, de;
        if (!((ne = L == null ? void 0 : L.columns) != null && ne.length))
          return;
        if (K.value) {
          ee();
          return;
        }
        const { columns: se, maxHeight: le, isScanHeight: ye = !0, inheritHeight: ge } = L, De = q({
          refData: l,
          listData: et(se)
        });
        E.value = st(r.slots, J, n.slots);
        const We = L.searchForm || L.searchSchema, {
          attrs: { onLoad: Le, ...He }
        } = Ie({ option: L, effectData: J });
        Object.assign(T, He, { pagination: v }), f((X) => {
          n.emit("load", X), Le == null || Le(X);
        }), We && (u.value = gl(L, _, (X) => {
          S(X, "form"), Q && c();
        }));
        const F = L.tabs && L.tabs.field;
        if (L.tabs && F) {
          const X = (de = L.tabs).activeKey ?? (de.activeKey = P(L.tabs.defaultActiveKey)), ue = {};
          U(
            X,
            (Me) => {
              Me !== void 0 && (ut(ue, F, Me), S(ue), Q && c());
            },
            { immediate: !0 }
          );
        }
        if (U(
          P(L.params),
          (X) => {
            S(X, "dynamic"), Q && c();
          },
          { deep: !0, immediate: !0 }
        ), $e(() => {
          Q = !0, r.immediate !== !1 && c();
        }), ye || ge || le) {
          x(), T.scroll = D;
          const { onChange: X, onExpandedRowsChange: ue } = T;
          T.onChange = (...Me) => {
            X == null || X(...Me);
          }, T.onExpandedRowsChange = (Me) => {
            ue == null || ue(Me), w();
          }, U(l, w);
        }
        const N = () => y(be.Table, { option: r, effectData: J, model: De, ...T }, E.value);
        r.editable ? K.value = () => y(G.Form, { model: l.value, ref: A }, N) : K.value = N;
      },
      {
        immediate: !0
      }
    ), ce = (L) => {
      const se = q({
        refData: l,
        listData: et(L)
      }), le = () => y(be.Table, { option: r, effectData: J, model: se, key: Symbol(), ...T }, E.value);
      r.editable ? K.value = () => y(G.Form, { model: l.value, ref: A }, le) : K.value = le;
    };
    return () => K.value && y(
      Zt,
      { name: "exaProvider", data: { data: l } },
      () => {
        var L, se;
        return !u.value || (L = r.searchForm) != null && L.teleport ? y(
          "div",
          Z(
            {
              ref: o,
              class: [r.isContainer && "sup-container", "sup-table", "sup-form-section"]
            },
            {
              class: a,
              style: t
            }
          ),
          [
            ((se = r.searchForm) == null ? void 0 : se.teleport) && y(
              ms,
              { to: r.searchForm.teleport },
              y("div", { class: "sup-form-section sup-table-search" }, y(u.value.formNode))
            ),
            K.value()
          ]
        ) : y(
          "div",
          Z(
            { ref: o, class: [r.isContainer && "sup-container", "sup-table"] },
            { class: a, style: t }
          ),
          [
            y("div", { class: "sup-form-section sup-table-search" }, y(u.value.formNode)),
            y("div", { class: "sup-form-section section-last" }, y(K.value))
          ]
        );
      }
    );
  }
}), Il = (e, n) => {
  const [t, a] = es(), s = Promise.resolve(typeof e == "function" ? e() : e), r = (o) => {
    if (o)
      t.value || (s.then(o.setOption), n && o.setData(n)), t.value = o;
    else if (o === null)
      t.value = void 0;
    else
      return (i, u) => y(yl, { ...i, onRegister: r }, u == null ? void 0 : u.slots);
  }, l = async (o, i) => {
    const u = await a();
    if (o && o in u)
      return typeof u[o] == "function" ? u[o](i) : u[o];
  };
  return [
    r,
    {
      /** 异步获取表格引用 */
      getTable: a,
      tableRef: t,
      redoHeight() {
        l("redoHeight");
      },
      setData(o) {
        l("setPageData", o);
      },
      /** 返回当前表格数据 */
      getData() {
        var o;
        return ve((o = t.value) == null ? void 0 : o.dataRef);
      },
      dataSource: H(() => {
        var o;
        return (o = t.value) == null ? void 0 : o.dataRef;
      }),
      /** 跳转到指定页 */
      goPage(o) {
        var i;
        (i = t.value) == null || i.goPage(o);
      },
      /** 设置表格列 */
      setColumns(o) {
        l("setColumns", o);
      },
      /** 刷新数据，不改动查询条件与当前页 */
      reload() {
        var o;
        return (o = t.value) == null ? void 0 : o.reload();
      },
      /** 手动执行条件查询，不覆盖搜索表单参数 */
      query(o) {
        var i;
        return (i = t.value) == null ? void 0 : i.query(o);
      },
      /** 查询完成，返回结果回调 */
      onLoaded(o) {
        l("onLoaded", o);
      },
      /** 重置查询表单，并重新查询 */
      resetSearchForm(o) {
        var i;
        (i = t.value) == null || i.resetSearchForm(o);
      },
      getQueryParams: () => {
        var o;
        return (o = t.value) == null ? void 0 : o.getQueryParams();
      },
      // setQueryParams: (params: Obj) => asyncCall('setQueryParams', params),
      selectedRowKeys: H(() => {
        var o;
        return (o = t.value) == null ? void 0 : o.selectedRowKeys;
      }),
      selectedRows: H(() => {
        var o;
        return (o = t.value) == null ? void 0 : o.selectedRows;
      }),
      /** 设置选中行 */
      setSelectedRows: (o) => {
        var i;
        return (i = t.value) == null ? void 0 : i.setSelectedRows(o);
      },
      expandedRowKeys: H(() => {
        var o;
        return (o = t.value) == null ? void 0 : o.expandedRowKeys;
      }),
      setExpandedRowKeys: (o) => {
        var i;
        return (i = t.value) == null ? void 0 : i.setExpandedRowKeys(o);
      },
      expandAll() {
        l("expandAll");
      },
      /** 新增行 */
      add: (o) => {
        var i;
        return (i = t.value) == null ? void 0 : i.add(o);
      },
      /** 修改行，须判断是否已有选中行 */
      edit: (o) => {
        var i;
        return (i = t.value) == null ? void 0 : i.edit(o);
      },
      /** 删除行，须判断是否已有选中行 */
      delete: () => {
        var o;
        return (o = t.value) == null ? void 0 : o.delete();
      },
      /** 查看详情，须判断是否已有选中行 */
      detail: (o) => {
        var i;
        return (i = t.value) == null ? void 0 : i.detail(o);
      },
      asyncCall: l,
      /** `editable`模式下进行表单校验 */
      validate() {
        return l("validate");
      }
    }
  ];
};
function Rl(e) {
  return e;
}
const Sl = W({
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
  setup(e, { slots: n }) {
    var l;
    const t = (l = n.default) == null ? void 0 : l.call(n), { effectData: a, ...s } = e, r = t ? t.flatMap(({ children: o, props: i = {} }) => {
      const { roleName: u, onClick: b, confirmText: m, tooltip: v, disabledTooltip: h, icon: f, ...d } = Ir(
        i,
        (p, O) => vr(O)
      );
      return !b || !o ? [] : {
        label: o.default || o,
        icon: f,
        tooltip: v,
        disabledTooltip: h,
        roleName: u,
        onClick: b,
        confirmText: m,
        attrs: d
      };
    }) : e.actions;
    return () => y(ke, { option: { ...s, actions: r }, effectData: a });
  }
});
function Ml(e) {
  return [() => y(Sl, e)];
}
const Ol = W({
  props: {
    dataSource: Object,
    schema: Object
  },
  emits: ["register"],
  setup(e, n) {
    var l;
    const t = vt(e.schema || {});
    ie.schemaDiagnostics && e.schema && dt(e.schema, "detail", "SuperDetail");
    const a = P(((l = e.schema) == null ? void 0 : l.dataSource) || {});
    U(
      () => e.dataSource,
      (o) => {
        o && (a.value = o);
      },
      { immediate: !0 }
    );
    const s = {
      setOption: (o) => {
        ie.schemaDiagnostics && dt(o, "detail", "SuperDetail"), t.value = o, o.dataSource && (a.value = o.dataSource);
      },
      setData: (o) => {
        a.value = o;
      }
    }, r = P();
    return U(
      t,
      (o) => {
        if (!(o != null && o.subItems))
          return;
        const i = et(o.subItems, a);
        r.value = i.modelsMap;
      },
      { immediate: !0 }
    ), n.expose(s), n.emit("register", s), Ve("exaProvider", yn({ data: a })), Ve("rootSlots", n.slots), () => r.value && y(
      "div",
      { class: ["sup-detail", t.value.isContainer && "sup-container"] },
      y(Ue, {
        option: {
          type: "Descriptions",
          ...t.value
        },
        ...t.value.attrs,
        ...t.value.descriptionsProps,
        modelsMap: r.value,
        isRoot: !0
      })
    );
  }
});
function jl(e, n) {
  const t = me(n), a = P(), s = Promise.resolve(typeof e == "function" ? e() : e), r = (l) => {
    if (l)
      a.value || (s.then(l.setOption), t.value && U(
        t,
        (o) => {
          l.setData(o);
        },
        { immediate: !0 }
      )), a.value = l;
    else
      return (o) => y(Ol, { ...o, onRegister: r }, bs());
  };
  return [
    r,
    {
      setData(l) {
        a.value ? a.value.setData(l) : t.value = l;
      }
    }
  ];
}
function kl(e) {
  return e;
}
export {
  Sl as SuperButtons,
  Ol as SuperDetail,
  Co as SuperForm,
  yl as SuperTable,
  ns as createModal,
  Al as default,
  kl as defineDetail,
  xl as defineForm,
  Rl as defineTable,
  ao as diagnoseSchema,
  Ml as useButtons,
  jl as useDetail,
  xo as useForm,
  ss as useModal,
  Dl as useModalForm,
  Il as useTable
};
