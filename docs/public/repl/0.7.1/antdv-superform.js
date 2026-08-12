import { requireDayjs_min as fs, commonjsGlobal as ps, isObject as vt, isArrayLike as ms, isIndex as bs, eq as Et, baseRest as Sn, toString as Ct, hasUnicode as gs, stringToArray as vs, castSlice as hs, keysIn as qt, baseAssignValue as On, copyObject as ys, isArray as ut, isBuffer as Ss, isTypedArray as Os, isArrayLikeObject as ws, copyArray as Cs, cloneBuffer as xs, cloneTypedArray as Ds, isPlainObject as he, isArguments as Jt, isFunction as ze, initCloneObject as _s, baseFor as As, Stack as Ms, identity as Is, isObjectLike as Rs, baseGetTag as js, baseIteratee as ks, baseForOwn as Ts, baseSet as wn, debounce as Cn, baseGet as Ps, get as Ve, isNumber as Je, cloneDeep as et, Tag as xn, AntdIcon as Ut, Tooltip as St, InfoCircleOutlined as Fs, Modal as xt, Space as Dt, Dropdown as Xt, Menu as en, MenuItem as tn, Button as lt, DownOutlined as Dn, Divider as $s, EllipsisOutlined as Ns, uniq as Ls, index as Vs, Card as Bs, CheckableTag as Es, Checkbox as qs, CheckboxGroup as Us, Col as xe, Collapse as zs, CollapsePanel as Hs, DatePicker as Ys, Descriptions as Ks, DescriptionsItem as Gs, Form as _n, FormItem as Ws, Input as Zs, Group as Qs, index$1 as Js, Search as Xs, List as ea, Item as ta, Radio as An, RadioButton as Mn, Group$1 as na, RangePicker as sa, Row as Be, VcSelect as aa, index$2 as ra, TabPane as oa, index$3 as la, Tabs as ia, TextArea as ua, TimePicker as ca, TimeRangePicker as da, index$4 as fa, Upload as In, message as zt, FormItemRest as pa, PlusOutlined as _t, ConfigProvider as ma, Image as nn, LoadingOutlined as ba, PaperClipOutlined as ga, CloseCircleOutlined as va, omit as ha, UpOutlined as ya } from "./antd.js";
import { h as S, inject as Ce, reactive as H, ref as F, isRef as tt, watchEffect as Ye, computed as K, toValue as ve, toRef as me, watch as z, unref as A, toRefs as Pe, mergeProps as X, markRaw as Sa, createVNode as fe, defineComponent as Z, openBlock as $, createBlock as Y, withModifiers as Oa, withCtx as te, createElementBlock as pe, Fragment as Se, renderList as Fe, createSlots as Ht, resolveDynamicComponent as we, normalizeProps as Ot, guardReactiveProps as kt, createCommentVNode as _e, provide as Ee, toRaw as ne, readonly as Rn, shallowRef as ct, useAttrs as jn, onMounted as kn, shallowReactive as At, getCurrentInstance as Tn, onUnmounted as Mt, nextTick as $e, render as Tt, watchPostEffect as Pn, renderSlot as wa, createTextVNode as Pt, toDisplayString as wt, Teleport as Ca, useSlots as xa } from "vue";
var Da = { exports: {} };
(function(e, n) {
  (function(t, a) {
    e.exports = a(fs());
  })(ps, function(t) {
    function a(o) {
      return o && typeof o == "object" && "default" in o ? o : { default: o };
    }
    var s = a(t), r = { name: "zh-cn", weekdays: "星期日_星期一_星期二_星期三_星期四_星期五_星期六".split("_"), weekdaysShort: "周日_周一_周二_周三_周四_周五_周六".split("_"), weekdaysMin: "日_一_二_三_四_五_六".split("_"), months: "一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月".split("_"), monthsShort: "1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月".split("_"), ordinal: function(o, l) {
      return l === "W" ? o + "周" : o + "日";
    }, weekStart: 1, yearStart: 4, formats: { LT: "HH:mm", LTS: "HH:mm:ss", L: "YYYY/MM/DD", LL: "YYYY年M月D日", LLL: "YYYY年M月D日Ah点mm分", LLLL: "YYYY年M月D日ddddAh点mm分", l: "YYYY/M/D", ll: "YYYY年M月D日", lll: "YYYY年M月D日 HH:mm", llll: "YYYY年M月D日dddd HH:mm" }, relativeTime: { future: "%s内", past: "%s前", s: "几秒", m: "1 分钟", mm: "%d 分钟", h: "1 小时", hh: "%d 小时", d: "1 天", dd: "%d 天", M: "1 个月", MM: "%d 个月", y: "1 年", yy: "%d 年" }, meridiem: function(o, l) {
      var i = 100 * o + l;
      return i < 600 ? "凌晨" : i < 900 ? "早上" : i < 1100 ? "上午" : i < 1300 ? "中午" : i < 1800 ? "下午" : "晚上";
    } };
    return s.default.locale(r, null, !0), r;
  });
})(Da);
function Fn(e, n, t) {
  if (!vt(t))
    return !1;
  var a = typeof n;
  return (a == "number" ? ms(t) && bs(n, t.length) : a == "string" && n in t) ? Et(t[n], e) : !1;
}
function $n(e) {
  return Sn(function(n, t) {
    var a = -1, s = t.length, r = s > 1 ? t[s - 1] : void 0, o = s > 2 ? t[2] : void 0;
    for (r = e.length > 3 && typeof r == "function" ? (s--, r) : void 0, o && Fn(t[0], t[1], o) && (r = s < 3 ? void 0 : r, s = 1), n = Object(n); ++a < s; ) {
      var l = t[a];
      l && e(n, l, a, r);
    }
    return n;
  });
}
function _a(e) {
  return function(n) {
    n = Ct(n);
    var t = gs(n) ? vs(n) : void 0, a = t ? t[0] : n.charAt(0), s = t ? hs(t, 1).join("") : n.slice(1);
    return a[e]() + s;
  };
}
var Aa = _a("toUpperCase");
const Ma = Aa;
function Ia(e) {
  return Ma(Ct(e).toLowerCase());
}
function Ra(e, n, t, a) {
  var s = -1, r = e == null ? 0 : e.length;
  for (a && r && (t = e[++s]); ++s < r; )
    t = n(t, e[s], s, e);
  return t;
}
function ja(e) {
  return function(n) {
    return e == null ? void 0 : e[n];
  };
}
var ka = {
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
}, Ta = ja(ka);
const Pa = Ta;
var Fa = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g, $a = "\\u0300-\\u036f", Na = "\\ufe20-\\ufe2f", La = "\\u20d0-\\u20ff", Va = $a + Na + La, Ba = "[" + Va + "]", Ea = RegExp(Ba, "g");
function qa(e) {
  return e = Ct(e), e && e.replace(Fa, Pa).replace(Ea, "");
}
var Ua = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g;
function za(e) {
  return e.match(Ua) || [];
}
var Ha = /[a-z][A-Z]|[A-Z]{2}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/;
function Ya(e) {
  return Ha.test(e);
}
var Nn = "\\ud800-\\udfff", Ka = "\\u0300-\\u036f", Ga = "\\ufe20-\\ufe2f", Wa = "\\u20d0-\\u20ff", Za = Ka + Ga + Wa, Ln = "\\u2700-\\u27bf", Vn = "a-z\\xdf-\\xf6\\xf8-\\xff", Qa = "\\xac\\xb1\\xd7\\xf7", Ja = "\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf", Xa = "\\u2000-\\u206f", er = " \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000", Bn = "A-Z\\xc0-\\xd6\\xd8-\\xde", tr = "\\ufe0e\\ufe0f", En = Qa + Ja + Xa + er, qn = "['’]", sn = "[" + En + "]", nr = "[" + Za + "]", Un = "\\d+", sr = "[" + Ln + "]", zn = "[" + Vn + "]", Hn = "[^" + Nn + En + Un + Ln + Vn + Bn + "]", ar = "\\ud83c[\\udffb-\\udfff]", rr = "(?:" + nr + "|" + ar + ")", or = "[^" + Nn + "]", Yn = "(?:\\ud83c[\\udde6-\\uddff]){2}", Kn = "[\\ud800-\\udbff][\\udc00-\\udfff]", Qe = "[" + Bn + "]", lr = "\\u200d", an = "(?:" + zn + "|" + Hn + ")", ir = "(?:" + Qe + "|" + Hn + ")", rn = "(?:" + qn + "(?:d|ll|m|re|s|t|ve))?", on = "(?:" + qn + "(?:D|LL|M|RE|S|T|VE))?", Gn = rr + "?", Wn = "[" + tr + "]?", ur = "(?:" + lr + "(?:" + [or, Yn, Kn].join("|") + ")" + Wn + Gn + ")*", cr = "\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])", dr = "\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])", fr = Wn + Gn + ur, pr = "(?:" + [sr, Yn, Kn].join("|") + ")" + fr, mr = RegExp([
  Qe + "?" + zn + "+" + rn + "(?=" + [sn, Qe, "$"].join("|") + ")",
  ir + "+" + on + "(?=" + [sn, Qe + an, "$"].join("|") + ")",
  Qe + "?" + an + "+" + rn,
  Qe + "+" + on,
  dr,
  cr,
  Un,
  pr
].join("|"), "g");
function br(e) {
  return e.match(mr) || [];
}
function gr(e, n, t) {
  return e = Ct(e), n = t ? void 0 : n, n === void 0 ? Ya(e) ? br(e) : za(e) : e.match(n) || [];
}
var vr = "['’]", hr = RegExp(vr, "g");
function yr(e) {
  return function(n) {
    return Ra(gr(qa(n).replace(hr, "")), e, "");
  };
}
var Sr = yr(function(e, n, t) {
  return n = n.toLowerCase(), e + (t ? Ia(n) : n);
});
const Or = Sr;
var Zn = Object.prototype, wr = Zn.hasOwnProperty, Cr = Sn(function(e, n) {
  e = Object(e);
  var t = -1, a = n.length, s = a > 2 ? n[2] : void 0;
  for (s && Fn(n[0], n[1], s) && (a = 1); ++t < a; )
    for (var r = n[t], o = qt(r), l = -1, i = o.length; ++l < i; ) {
      var u = o[l], b = e[u];
      (b === void 0 || Et(b, Zn[u]) && !wr.call(e, u)) && (e[u] = r[u]);
    }
  return e;
});
const qe = Cr;
function Ft(e, n, t) {
  (t !== void 0 && !Et(e[n], t) || t === void 0 && !(n in e)) && On(e, n, t);
}
function $t(e, n) {
  if (!(n === "constructor" && typeof e[n] == "function") && n != "__proto__")
    return e[n];
}
function xr(e) {
  return ys(e, qt(e));
}
function Dr(e, n, t, a, s, r, o) {
  var l = $t(e, t), i = $t(n, t), u = o.get(i);
  if (u) {
    Ft(e, t, u);
    return;
  }
  var b = r ? r(l, i, t + "", e, n, o) : void 0, m = b === void 0;
  if (m) {
    var v = ut(i), y = !v && Ss(i), c = !v && !y && Os(i);
    b = i, v || y || c ? ut(l) ? b = l : ws(l) ? b = Cs(l) : y ? (m = !1, b = xs(i, !0)) : c ? (m = !1, b = Ds(i, !0)) : b = [] : he(i) || Jt(i) ? (b = l, Jt(l) ? b = xr(l) : (!vt(l) || ze(l)) && (b = _s(i))) : m = !1;
  }
  m && (o.set(i, b), s(b, i, a, r, o), o.delete(i)), Ft(e, t, b);
}
function Yt(e, n, t, a, s) {
  e !== n && As(n, function(r, o) {
    if (s || (s = new Ms()), vt(r))
      Dr(e, n, o, t, Yt, a, s);
    else {
      var l = a ? a($t(e, o), r, o + "", e, n, s) : void 0;
      l === void 0 && (l = r), Ft(e, o, l);
    }
  }, qt);
}
var _r = $n(function(e, n, t, a) {
  Yt(e, n, t, a);
});
const Ar = _r;
function Mr(e) {
  return typeof e == "function" ? e : Is;
}
var Ir = "[object String]";
function Rr(e) {
  return typeof e == "string" || !ut(e) && Rs(e) && js(e) == Ir;
}
function jr(e, n) {
  var t = {};
  return n = ks(n), Ts(e, function(a, s, r) {
    On(t, n(a, s, r), a);
  }), t;
}
var kr = $n(function(e, n, t) {
  Yt(e, n, t);
});
const It = kr;
function dt(e, n, t) {
  return e == null ? e : wn(e, n, t);
}
var Tr = "Expected a function";
function Nt(e, n, t) {
  var a = !0, s = !0;
  if (typeof e != "function")
    throw new TypeError(Tr);
  return vt(t) && (a = "leading" in t ? !!t.leading : a, s = "trailing" in t ? !!t.trailing : s), Cn(e, n, {
    leading: a,
    maxWait: n,
    trailing: s
  });
}
function Pr(e, n, t, a) {
  return wn(e, n, t(Ps(e, n)), a);
}
function Fr(e, n, t) {
  return e == null ? e : Pr(e, n, Mr(t));
}
function ke(e) {
  var n;
  return typeof e == "string" ? ((n = ie.customIcon) == null ? void 0 : n.call(ie, e)) || S("span", { class: "anticon " + e }) : e && S(e);
}
function Me(e) {
  const n = Ce("exaProvider", {}).data;
  return H({ ...e || {}, formData: n });
}
function ft(e, n) {
  const t = F(tt(e) ? e : !!e);
  return typeof e == "function" && Ye(() => {
    t.value = e(n);
  }), t;
}
function ln(e, n) {
  return ft(e, n);
}
function Lt(e, n) {
  const t = H({});
  return e && Ye(() => {
    Object.assign(t, e(n));
  }), t;
}
function $r(e = {}, n) {
  const t = {};
  return Object.keys(e).forEach((a) => {
    !e[a] || a === "onUpdate" || (a.match(/^on[A-Z]/) ? t[a] = (...s) => e[a](n, ...s) : a === "on" && Object.entries(e.on).forEach(([s, r]) => {
      const o = "on" + s.charAt(0).toUpperCase() + s.slice(1);
      t[o] = (...l) => r(n, ...l);
    }));
  }), t;
}
function Qn({ option: e, model: n, effectData: t }, a) {
  const {
    type: s,
    field: r,
    endField: o,
    keepField: l,
    labelField: i,
    stringifyValue: u,
    valueToString: b,
    computed: m,
    value: v,
    onUpdate: y
  } = e, c = o ?? l, d = u ?? b, p = {}, h = e.vModelFields || {};
  if (i && (p.labelValue = K(() => Ve(n.parent, i)), p["onUpdate:labelValue"] = (w) => {
    const x = d ? w == null ? void 0 : w.toString() : w;
    dt(n.parent, i, x);
  }), Object.entries(h).forEach(([w, x]) => {
    var D;
    typeof x == "string" ? ((D = n.parent)[x] ?? (D[x] = void 0), p[w] = K(() => Ve(n.parent, x)), p[`onUpdate:${w}`] = (M) => {
      dt(n.parent, x, M);
    }) : tt(x) ? (p[w] = x, p[`onUpdate:${w}`] = (M) => x.value = M) : p[w] = x;
  }), !r)
    return tt(v) && Object.assign(p, {
      value: v,
      "onUpdate:value": (w) => v.value = w
    }), p;
  a !== void 0 && (n.refData ?? (n.refData = ve(a)));
  const f = me(n, "refData"), g = F(), O = (w = ve(a)) => {
    g.value = w, f.value !== w && a !== void 0 && (f.value = w);
  };
  Object.assign(p, {
    value: g,
    "onUpdate:value": O
  }), tt(v) && (z(f, (w) => v.value = w), z(v, O));
  let C = ve(n.refData), _;
  if (s.endsWith("Range") && c)
    g.value = [f.value, n.parent[c]], _ = (w) => {
      const [x, D] = w || [];
      f.value = x, C = x, n.parent[c] = D;
    }, z([f, () => n.parent[c]], (w) => {
      g.value = w;
    });
  else if (d) {
    const w = (x) => (x == null ? void 0 : x.toString().split(",")) || [];
    g.value = w(f.value), _ = (x) => {
      const D = (x == null ? void 0 : x.toString()) || "";
      f.value = D, C = D;
    }, z(f, (x) => {
      x !== C && (g.value = w(x));
    });
  } else
    g.value = C, _ = (w) => {
      f.value = w, C = w;
    }, z(f, O, { flush: "sync" });
  return z(g, _, { flush: "sync" }), y && z(f, () => y(t)), m && z(
    // 使用ref让计算结果即使一样也会进行后面的赋值
    () => F(m(C, t)),
    (w) => _(A(w)),
    { immediate: !0 }
  ), p;
}
function Ae({ option: e, effectData: n, inheritDisabled: t }) {
  const { type: a, dynamicAttrs: s, disabled: r, hidden: o, required: l } = e, i = ft(o, n), u = ft(l, n), b = t === void 0 && r === void 0 ? void 0 : K(() => {
    let d = ve(t);
    return d || (typeof r == "function" ? d = !!r(n) : d = ve(r)), d;
  }), m = $r(e, n), v = typeof s == "function" ? { ...Pe(Lt(s, n)) } : {}, y = X({ ...oe[a] }, { ...e.attrs }, m, v);
  return { attrs: It({}, e.attrs, y, { disabled: b }), hidden: i, required: u };
}
function un(e, n = {}) {
  const t = new RegExp("{(\\w*)}", "g");
  return e.replace(t, (a, s) => n[s] || "");
}
const cn = {
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
}, dn = {
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
function Nr(e, n, t, a) {
  let s;
  if (n)
    s = { type: e, len: n, message: "len" };
  else if (Je(t) && Je(a))
    s = { type: e, max: t, min: a, message: "range" };
  else if (Je(t))
    s = { type: e, max: t, message: "max" };
  else if (Je(a))
    s = { type: e, min: a, message: "min" };
  else
    return !1;
  return e === "number" ? (s.message = dn.number[s.message], s.transform = (r) => Number(r)) : s.message = dn.string[s.message], s;
}
function Lr(e, n = "") {
  const { trigger: t, required: a, type: s = "string", len: r, max: o, min: l, pattern: i, validator: u, message: b } = e || {}, m = [];
  a && (s === "string" || s in cn ? m.push({
    required: a,
    trigger: t,
    // validator: noEmpty,
    pattern: /^[\s\S]*.*[^\s][\s\S]*$/,
    // transform: (value) => value + '',
    // whitespace: true,
    message: b || `${n}不能为空！`
  }) : m.push({ required: a, trigger: t, message: b || `${n}不能为空！` }));
  const v = cn[s];
  if (v) {
    const y = un(v.message, { label: n });
    m.push({ ...v, trigger: t, message: y });
  }
  if (i && m.push({ pattern: i, trigger: t, message: b }), r || Je(o) || Je(l)) {
    const y = Nr(s, r, o, l), c = un(y.message, { label: n, len: r, max: o, min: l });
    m.push({ ...y, trigger: t, message: c, type: s });
  }
  return u && m.push({ validator: u, trigger: t }), m;
}
function Jn(e, n, t) {
  const { field: a, columns: s, subItems: r, initialValue: o, value: l } = e, i = e.endField ?? e.keepField ?? e.labelField, u = a ? a.split(".") : [], b = t.concat(u), m = u.splice(-1)[0], v = H({
    refName: m,
    initialValue: o,
    fieldName: a,
    origin: n,
    parent: n,
    refData: n,
    propChain: b
  });
  return m ? (u.length && (v.parent = K(() => Ve(n.value, u))), v.refData = K({
    get: () => Ve(n.value, a),
    set: (y) => dt(n.value, a, y)
  }), z(
    n,
    () => {
      v.refData ?? (v.refData = ve(o) ?? ve(l) ?? (s && [] || r && {})), i && Fr(v.parent, i, (y) => y);
    },
    { immediate: !0, flush: "sync" }
  )) : l && (v.refData = F(l), v.propChain = []), v;
}
const pt = (e, n) => e == null ? void 0 : e.map((t) => t.validator ? { ...t, validator: async (s, ...r) => {
  const o = await t.validator({ ...s, ...n }, ...r);
  if (o === !1 || o instanceof Error)
    throw o;
} } : t);
function nt(e, n, t = []) {
  const a = me(n || {}), s = {}, r = /* @__PURE__ */ new Map();
  return e.forEach((o) => {
    if (typeof o != "object")
      return;
    const l = Jn(o, a, t), { required: i, label: u, subItems: b, columns: m } = o;
    if ((o.rules || i) && l.propChain.length) {
      const v = o.rules || [], y = Array.isArray(v) ? v : [v];
      if (i) {
        const d = y[0];
        d ? d.required = i : y.push({ required: i });
      }
      let c = "string";
      if (l.refData) {
        const d = typeof l.refData;
        c = d === "object" && Array.isArray(l.refData) ? "array" : d;
      }
      l.rules = y.map((d) => Lr({ type: c, ...d }, u)).flat(), s[l.propChain.join(".")] = l.rules;
    }
    if (b) {
      const v = nt(b, me(l, "refData"), l.propChain);
      Object.assign(s, v.rules), l.children = v.modelsMap;
    } else
      m && (l.listData = nt(m));
    r.set(Sa(o), l);
  }), {
    rules: s,
    modelsMap: r
  };
}
function Ke(e, n, t = [], a) {
  const s = me(n || {}), r = {}, o = [...e].map(([l, i]) => {
    const { children: u, rules: b, listData: m } = i, v = a !== void 0 ? [...t, a] : t, y = Jn(l, s, v);
    if (a !== void 0 && (y.index = a), y.rules = b, y.propChain.length && b && (r[y.propChain.join(".")] = b), u) {
      const { modelsMap: c, rules: d } = Ke(u, me(y, "refData"), y.propChain);
      Object.assign(r, d), y.children = c;
    }
    return m && (y.listData = m), [l, y];
  });
  return { modelsMap: new Map(o), rules: r };
}
function Xn(e, n, t, a) {
  const { modelsMap: s, rules: r } = Ke(e, n, t, a), o = [];
  return function l(i) {
    for (const [u, b] of i)
      o.push([u, b]), b.children && l(b.children);
  }(s), { modelsMap: new Map(o), rules: r };
}
const Vr = (e, n) => Object.prototype.hasOwnProperty.call(e, n);
function Kt(e, n = {}, t = {}) {
  for (const [a, s] of Object.entries(e))
    Array.isArray(s) ? e[a] = et((n == null ? void 0 : n[a]) ?? (t == null ? void 0 : t[a])) : Object.prototype.toString.call(s) === "[object Object]" ? Kt(s, n == null ? void 0 : n[a], t == null ? void 0 : t[a]) : e[a] = (n == null ? void 0 : n[a]) ?? (t == null ? void 0 : t[a]);
}
function es(e, n, t = {}) {
  for (const [a, s] of Object.entries(e)) {
    if (!Vr(n, a))
      continue;
    const r = n[a] ?? (t == null ? void 0 : t[a]);
    he(s) && he(r) ? es(s, r, t == null ? void 0 : t[a]) : Array.isArray(r) || he(r) ? e[a] = et(r) : e[a] = r;
  }
}
function fn() {
  let e;
  return { promise: new Promise((t) => {
    e = t;
  }), resolve: e };
}
function ts() {
  const e = F();
  let n = fn(), t = !0;
  return z(e, (s) => {
    s ? (n.resolve(!0), t = !1) : t || (n = fn(), t = !0);
  }), [e, () => n.promise.then(() => e.value)];
}
function re(e, n = {}) {
  return e ? typeof e == "function" ? e(n || {}, {}) : typeof e != "object" ? S("span", e) : S(e, { effectData: n }) : null;
}
function at(e, n, t) {
  const a = t || Ce("rootSlots", {}), s = {};
  return e && Object.entries(e).forEach(([r, o]) => {
    const l = typeof o == "string" ? a[o] : o;
    l && (s[r] = (i) => typeof l == "function" ? l({ ...n, ...i || {} }) : l);
  }), s;
}
const pn = (e, n) => {
  const t = {};
  return e.vModelFields && Object.entries(e.vModelFields).forEach(([a, s]) => {
    t[a] = n[s];
  }), t;
}, mn = (e, n, t) => he(e) || !he(e == null ? void 0 : e[0]) ? Object.entries(e).map(([a, s]) => ({ value: a, label: s })) : Array.isArray(e) ? e.map((a) => ({ label: a[n], value: a[t] })) : [], Br = (e, n, t) => {
  var i, u, b, m;
  const { options: a, dictName: s } = e, r = ((u = (i = e.attrs) == null ? void 0 : i.fieldNames) == null ? void 0 : u.label) || "label", o = ((m = (b = e.attrs) == null ? void 0 : b.fieldNames) == null ? void 0 : m.value) || "value", l = A(a);
  s && ie.dictApi ? ie.dictApi(s).then((v) => t.value = v) : typeof a == "function" ? Promise.resolve(a(n)).then((v) => {
    t.value = mn(v, r, o);
  }).catch((v) => {
    console.warn("useOptionsLabel", v);
  }) : t.value = mn(l, r, o);
}, yt = ({ value: e, label: n = e, color: t, icon: a, tagViewer: s = !0 }) => {
  const r = { color: t, label: n, icon: a };
  if (s !== !0 || !t) {
    const o = s === !0 ? ie.tagViewer : s;
    if (typeof o == "function") {
      const l = o(e);
      he(l) ? Object.assign(r, l) : r.color = l;
    } else if (Array.isArray(o) && he(o[0])) {
      const l = o.find((i) => i.value == e);
      Object.assign(r, l);
    }
    r.color ?? (r.color = t || o[e] || e === !0 && "success" || e === !1 && "error" || "default");
  }
  return S(
    xn,
    { color: r.color },
    { default: () => r.label || e, icon: r.icon || (() => ke(r.icon)) }
  );
};
function ht(e, n = {}) {
  const {
    type: t = "",
    viewRender: a,
    render: s,
    options: r,
    dictName: o,
    labelField: l,
    valueToNumber: i,
    tagViewer: u,
    initialValue: b
  } = e, m = e.endField ?? e.keepField, v = Ce("rootSlots", {}), y = a || t === "InfoSlot" && s, c = typeof y == "string" ? v[y] : y;
  if (y && !c)
    return !1;
  let d = !1;
  const p = (() => {
    var f, g;
    if (l)
      return ({ current: O } = n) => String(Ve(O, l) ?? "");
    if (m)
      return ({ current: O, text: C } = n) => (C || "") + " - " + (Ve(O, m) || "");
    if ((r || o) && t !== "AutoComplete") {
      d = !(u === !1 || !u && ie.tagViewer === !1);
      let O = e.labelAsValue ?? e.valueToLabel;
      (f = A(r)) != null && f[0] && !he((g = A(r)) == null ? void 0 : g[0]) && !i && (O = !0);
      const C = F();
      return (_ = n, w) => {
        const x = [], D = (_.text || _.value) ?? ve(b) ?? "";
        if (D === "")
          return "";
        if (O)
          return !w && d ? yt({ value: D, label: D, tagViewer: u }) : D;
        C.value || Br(e, _, C);
        const T = (Array.isArray(D) ? D : typeof D == "string" ? D.split(",") : [D]).map((R) => {
          var B;
          const j = (B = A(C)) == null ? void 0 : B.find(({ value: U }) => U == R);
          return !w && d && x.push(yt({ value: R, label: R, ...j, tagViewer: u })), j ? j.label : R;
        });
        return x.length ? x : T.join(",");
      };
    } else if (t === "Switch")
      return ({ text: O } = n) => (e.valueLabels || "否是")[O ?? ve(b)];
  })(), h = !0;
  if (c)
    return (f = n) => {
      const g = pn(e, f.current), {
        attrs: { disabled: O, ...C }
      } = Ae({ option: e, effectData: f }), _ = H({
        props: { ...C, ...g },
        ...f,
        ...p && { text: K(() => p(f, h)) },
        isView: !0
      });
      return c(_);
    };
  if (u && !d)
    return (f = n) => {
      const g = f.text ?? ve(b);
      return typeof g == "boolean" && u === !0 ? yt({ label: g ? "是" : "否", color: g ? "success" : "error" }) : (Array.isArray(g) ? g : typeof g == "string" ? g.split(",") : [g]).map((_) => yt({ value: _, tagViewer: u }));
    };
  if (t === "Text" && (e.attrs || e.dynamicAttrs))
    return (f = n) => {
      const g = (p == null ? void 0 : p(f)) || (f.value ?? ve(b)), O = Lt(e.dynamicAttrs, f), C = X({ ...e.attrs, title: g }, O);
      return S("span", C, g);
    };
  if (t === "HTML")
    return (f = n) => {
      const g = Lt(e.dynamicAttrs, f), O = X({ ...e.attrs, innerHTML: f.value }, g);
      return S("span", O);
    };
  if (t === "Textarea")
    return (f = n) => S("pre", { style: "white-space: break-spaces;" }, f.value ?? ve(b));
  if (!p && (t === "Upload" || t.startsWith("Ext")))
    return (f = n) => {
      const g = pn(e, f.current), O = at(e.slots, f, v), {
        attrs: { disabled: C, ..._ }
      } = Ae({ option: e, effectData: f });
      return S(
        be[t],
        H({ option: e, effectData: f, ..._, ...g, value: f.value, isView: !0, disabled: C }),
        O
      );
    };
  if (t === "Buttons") {
    const f = st({ config: e, isView: !0 });
    return !!f && ((g = n) => f({ param: g }));
  } else
    return p;
}
var Er = { icon: { tag: "svg", attrs: { viewBox: "64 64 896 896", focusable: "false" }, children: [{ tag: "path", attrs: { d: "M872 474H152c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h720c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8z" } }] }, name: "minus", theme: "outlined" };
const qr = Er;
function bn(e) {
  for (var n = 1; n < arguments.length; n++) {
    var t = arguments[n] != null ? Object(arguments[n]) : {}, a = Object.keys(t);
    typeof Object.getOwnPropertySymbols == "function" && (a = a.concat(Object.getOwnPropertySymbols(t).filter(function(s) {
      return Object.getOwnPropertyDescriptor(t, s).enumerable;
    }))), a.forEach(function(s) {
      Ur(e, s, t[s]);
    });
  }
  return e;
}
function Ur(e, n, t) {
  return n in e ? Object.defineProperty(e, n, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[n] = t, e;
}
var Gt = function(n, t) {
  var a = bn({}, n, t.attrs);
  return fe(Ut, bn({}, a, {
    icon: qr
  }), null);
};
Gt.displayName = "MinusOutlined";
Gt.inheritAttrs = !1;
const ns = Gt;
var zr = { icon: { tag: "svg", attrs: { viewBox: "64 64 896 896", focusable: "false" }, children: [{ tag: "path", attrs: { d: "M168 504.2c1-43.7 10-86.1 26.9-126 17.3-41 42.1-77.7 73.7-109.4S337 212.3 378 195c42.4-17.9 87.4-27 133.9-27s91.5 9.1 133.8 27A341.5 341.5 0 01755 268.8c9.9 9.9 19.2 20.4 27.8 31.4l-60.2 47a8 8 0 003 14.1l175.7 43c5 1.2 9.9-2.6 9.9-7.7l.8-180.9c0-6.7-7.7-10.5-12.9-6.3l-56.4 44.1C765.8 155.1 646.2 92 511.8 92 282.7 92 96.3 275.6 92 503.8a8 8 0 008 8.2h60c4.4 0 7.9-3.5 8-7.8zm756 7.8h-60c-4.4 0-7.9 3.5-8 7.8-1 43.7-10 86.1-26.9 126-17.3 41-42.1 77.8-73.7 109.4A342.45 342.45 0 01512.1 856a342.24 342.24 0 01-243.2-100.8c-9.9-9.9-19.2-20.4-27.8-31.4l60.2-47a8 8 0 00-3-14.1l-175.7-43c-5-1.2-9.9 2.6-9.9 7.7l-.7 181c0 6.7 7.7 10.5 12.9 6.3l56.4-44.1C258.2 868.9 377.8 932 512.2 932c229.2 0 415.5-183.7 419.8-411.8a8 8 0 00-8-8.2z" } }] }, name: "sync", theme: "outlined" };
const Hr = zr;
function gn(e) {
  for (var n = 1; n < arguments.length; n++) {
    var t = arguments[n] != null ? Object(arguments[n]) : {}, a = Object.keys(t);
    typeof Object.getOwnPropertySymbols == "function" && (a = a.concat(Object.getOwnPropertySymbols(t).filter(function(s) {
      return Object.getOwnPropertyDescriptor(t, s).enumerable;
    }))), a.forEach(function(s) {
      Yr(e, s, t[s]);
    });
  }
  return e;
}
function Yr(e, n, t) {
  return n in e ? Object.defineProperty(e, n, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[n] = t, e;
}
var Wt = function(n, t) {
  var a = gn({}, n, t.attrs);
  return fe(Ut, gn({}, a, {
    icon: Hr
  }), null);
};
Wt.displayName = "SyncOutlined";
Wt.inheritAttrs = !1;
const Kr = Wt;
var Gr = { icon: { tag: "svg", attrs: { viewBox: "64 64 896 896", focusable: "false" }, children: [{ tag: "path", attrs: { d: "M400 317.7h73.9V656c0 4.4 3.6 8 8 8h60c4.4 0 8-3.6 8-8V317.7H624c6.7 0 10.4-7.7 6.3-12.9L518.3 163a8 8 0 00-12.6 0l-112 141.7c-4.1 5.3-.4 13 6.3 13zM878 626h-60c-4.4 0-8 3.6-8 8v154H214V634c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8v198c0 17.7 14.3 32 32 32h684c17.7 0 32-14.3 32-32V634c0-4.4-3.6-8-8-8z" } }] }, name: "upload", theme: "outlined" };
const Wr = Gr;
function vn(e) {
  for (var n = 1; n < arguments.length; n++) {
    var t = arguments[n] != null ? Object(arguments[n]) : {}, a = Object.keys(t);
    typeof Object.getOwnPropertySymbols == "function" && (a = a.concat(Object.getOwnPropertySymbols(t).filter(function(s) {
      return Object.getOwnPropertyDescriptor(t, s).enumerable;
    }))), a.forEach(function(s) {
      Zr(e, s, t[s]);
    });
  }
  return e;
}
function Zr(e, n, t) {
  return n in e ? Object.defineProperty(e, n, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[n] = t, e;
}
var Zt = function(n, t) {
  var a = vn({}, n, t.attrs);
  return fe(Ut, vn({}, a, {
    icon: Wr
  }), null);
};
Zt.displayName = "UploadOutlined";
Zt.inheritAttrs = !1;
const Qr = Zt, rt = (e, n) => {
  const { title: t, label: a, labelSlot: s, tooltip: r } = e, o = r && (he(r) ? r : { title: r }), l = t || s || a;
  return l === void 0 ? void 0 : () => [
    re(l, n),
    r && S(St, o, {
      title: () => re(r.title, n),
      default: () => S(
        "a",
        { class: "ant-typography ant-typography-secondary", style: { marginLeft: "4px" } },
        ke(r.icon || Fs)
      )
    })
  ];
}, Jr = /* @__PURE__ */ new Set([
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
]), Xr = {
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
}, eo = /* @__PURE__ */ new Set(["Input", "InputNumber", "Textarea", "AutoComplete"]), to = /* @__PURE__ */ new Set(["Select", "TreeSelect"]), no = /* @__PURE__ */ new Set(["Select", "TreeSelect", "Radio", "Checkbox"]), so = /* @__PURE__ */ new Set([
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
]), ao = /* @__PURE__ */ new Set(["table", "form", "description"]), ro = /* @__PURE__ */ new Set([
  "attrs",
  "dynamicAttrs",
  "dataSource",
  "initialValue",
  "options",
  "params",
  "rules",
  "treeData",
  "value"
]), Te = (e) => e !== null && typeof e == "object" && !Array.isArray(e), Q = (e, n, t, a) => ({ level: e, code: n, path: t, message: a });
function Vt(e, n, t, a) {
  if (!(!e || typeof e != "object" || a.has(e))) {
    if (a.add(e), Te(e))
      for (const [s, r] of Object.entries(Xr))
        Object.prototype.hasOwnProperty.call(e, s) && t.push(Q("warning", "deprecated-api", `${n}.${s}`, `已废弃，${r}。`));
    for (const [s, r] of Object.entries(e))
      typeof r == "function" || ro.has(s) || (Array.isArray(r) ? r.forEach((o, l) => Vt(o, `${n}.${s}[${l}]`, t, a)) : Te(r) && Vt(r, `${n}.${s}`, t, a));
  }
}
function oo(e, n, t, a) {
  var i, u, b;
  if (!Te(e)) {
    typeof e != "string" && t.push(Q("error", "invalid-item", n, "字段配置必须是对象。"));
    return;
  }
  const { type: s } = e;
  if (s !== void 0 && (typeof s != "string" || !Jr.has(s) && !s.startsWith("Ext")) && t.push(Q("error", "unknown-type", `${n}.type`, `未知字段类型 ${JSON.stringify(s)}。`)), s === void 0 && a !== "table" && t.push(Q("warning", "missing-type", `${n}.type`, "表单或详情字段建议明确配置 type。")), Array.isArray(e.exclude)) {
    const m = e.exclude.filter((v) => !ao.has(v));
    m.length && t.push(
      Q(
        "error",
        "invalid-exclude",
        `${n}.exclude`,
        `只支持 table、form、description，当前包含：${m.join("、")}。`
      )
    );
  } else
    e.exclude !== void 0 && t.push(Q("error", "invalid-exclude", `${n}.exclude`, "exclude 必须是字符串数组。"));
  e.visibleIn !== void 0 && !["form", "detail", "both"].includes(e.visibleIn) && t.push(
    Q("error", "invalid-visible-in", `${n}.visibleIn`, "visibleIn 只支持 'form'、'detail'、'both'。")
  ), e.unauthorized !== void 0 && !["hide", "disable"].includes(e.unauthorized) && t.push(
    Q("error", "invalid-unauthorized", `${n}.unauthorized`, "unauthorized 只支持 'hide'、'disable'。")
  ), no.has(s) && !e.options && !e.dictName && t.push(Q("warning", "missing-options", n, `${s} 未配置 options 或 dictName。`));
  const r = (i = e.attrs) == null ? void 0 : i.placeholder, o = eo.has(s) ? `请输入${typeof e.label == "string" ? e.label : ""}` : to.has(s) ? `请选择${typeof e.label == "string" ? e.label : ""}` : void 0;
  o !== void 0 && r === o && t.push(
    Q("suggestion", "redundant-default", `${n}.attrs.placeholder`, "与内置 placeholder 相同，可以省略。")
  );
  const l = ["DatePicker", "DateRange"].includes(s) ? "YYYY-MM-DD" : ["TimePicker", "TimeRange"].includes(s) ? "HH:mm:ss" : void 0;
  l && ((u = e.attrs) == null ? void 0 : u.valueFormat) === l && t.push(
    Q("suggestion", "redundant-default", `${n}.attrs.valueFormat`, "与内置 valueFormat 相同，可以省略。")
  ), s === "InputGroup" && ((b = e.attrs) == null ? void 0 : b.compact) === !0 && t.push(
    Q("suggestion", "redundant-default", `${n}.attrs.compact`, "InputGroup 默认使用紧凑布局，可以省略。")
  ), e.block === !1 && !so.has(s) && t.push(Q("suggestion", "redundant-default", `${n}.block`, "block: false 是默认行为，可以省略。")), e.breakAfter === !1 && t.push(
    Q("suggestion", "redundant-default", `${n}.breakAfter`, "breakAfter: false 是默认行为，可以省略。")
  ), (e.options || e.dictName) && e.tagViewer === !0 && t.push(
    Q("suggestion", "redundant-default", `${n}.tagViewer`, "选项字段默认使用 Tag 展示，可以省略。")
  );
  for (const m of ["hidden", "disabled"])
    e[m] === !1 && t.push(Q("suggestion", "redundant-default", `${n}.${m}`, `${m}: false 可以省略。`));
  Object.prototype.hasOwnProperty.call(e, "initialValue") && e.initialValue === void 0 && t.push(
    Q("suggestion", "redundant-default", `${n}.initialValue`, "initialValue: undefined 可以省略。")
  );
  for (const m of ["attrs", "rowProps"])
    Te(e[m]) && Object.keys(e[m]).length === 0 && t.push(Q("suggestion", "empty-config", `${n}.${m}`, `空的 ${m} 配置可以省略。`));
  for (const m of ["rules", "options"])
    Array.isArray(e[m]) && e[m].length === 0 && t.push(Q("suggestion", "empty-config", `${n}.${m}`, `空的 ${m} 配置可以省略。`));
  e.subItems && Xe(e.subItems, `${n}.subItems`, t, a === "table" ? "form" : a), e.columns && Xe(e.columns, `${n}.columns`, t, "table");
}
function Xe(e, n, t, a) {
  if (!Array.isArray(e)) {
    t.push(Q("error", "invalid-items", n, "必须是数组。"));
    return;
  }
  const s = /* @__PURE__ */ new Map();
  e.forEach((r, o) => {
    const l = `${n}[${o}]`;
    oo(r, l, t, a), !(!Te(r) || typeof r.field != "string" || !r.field) && (s.has(r.field) ? t.push(
      Q(
        "warning",
        "duplicate-field",
        `${l}.field`,
        `字段 ${r.field} 与 ${s.get(r.field)} 重复。`
      )
    ) : s.set(r.field, `${n}[${o}].field`));
  });
}
function lo(e, n = "auto") {
  var s, r, o, l, i, u, b;
  const t = [];
  if (!Te(e))
    return [Q("error", "invalid-schema", "schema", "schema 必须是对象。")];
  Vt(e, "schema", t, /* @__PURE__ */ new WeakSet());
  const a = n === "auto" ? Array.isArray(e.columns) ? "table" : "form" : n;
  if (!["form", "table", "detail"].includes(a))
    return [Q("error", "invalid-schema-type", "schema", `未知 schema 类型 ${JSON.stringify(n)}。`)];
  if (e.subSpan === 8 && t.push(Q("suggestion", "redundant-default", "schema.subSpan", "subSpan: 8 是默认值，可以省略。")), e.gutter === 16 && t.push(Q("suggestion", "redundant-default", "schema.gutter", "gutter: 16 是默认值，可以省略。")), Te(e.params) && Object.keys(e.params).length === 0 && t.push(Q("suggestion", "empty-config", "schema.params", "空的 params 配置可以省略。")), a === "table") {
    for (const m of ["editMode", "addMode"])
      Object.prototype.hasOwnProperty.call(e, m) && t.push(Q("warning", "deprecated-api", `schema.${m}`, `已废弃，使用 rowEditor.${m}。`));
    Array.isArray(e.columns) ? Xe(e.columns, "schema.columns", t, "table") : t.push(Q("error", "missing-columns", "schema.columns", "表格必须配置 columns。")), e.immediate === !0 && t.push(
      Q("suggestion", "redundant-default", "schema.immediate", "immediate: true 是默认值，可以省略。")
    ), e.pagination === !1 && t.push(
      Q("suggestion", "redundant-default", "schema.pagination", "pagination: false 是默认值，可以省略。")
    ), ((s = e.attrs) == null ? void 0 : s.rowKey) === "id" && t.push(
      Q("suggestion", "redundant-default", "schema.attrs.rowKey", "rowKey: 'id' 是默认值，可以省略。")
    ), ((r = e.attrs) == null ? void 0 : r.size) === "small" && t.push(
      Q("suggestion", "redundant-default", "schema.attrs.size", "size: 'small' 是默认值，可以省略。")
    ), ((o = e.attrs) == null ? void 0 : o.tableLayout) === "fixed" && t.push(
      Q(
        "suggestion",
        "redundant-default",
        "schema.attrs.tableLayout",
        "tableLayout: 'fixed' 是默认值，可以省略。"
      )
    ), Te(e.pagination) && e.pagination.current === 1 && t.push(
      Q("suggestion", "redundant-default", "schema.pagination.current", "分页 current 默认是 1，可以省略。")
    ), Te(e.pagination) && e.pagination.pageSize === 10 && t.push(
      Q("suggestion", "redundant-default", "schema.pagination.pageSize", "分页 pageSize 默认是 10，可以省略。")
    ), (l = e.searchForm) != null && l.subItems && Xe(e.searchForm.subItems, "schema.searchForm.subItems", t, "form"), (u = (i = e.rowEditor) == null ? void 0 : i.form) != null && u.subItems && Xe(e.rowEditor.form.subItems, "schema.rowEditor.form.subItems", t, "form");
  } else
    Array.isArray(e.subItems) ? (((b = e.attrs) == null ? void 0 : b.labelAlign) === "right" && t.push(
      Q("suggestion", "redundant-default", "schema.attrs.labelAlign", "labelAlign: 'right' 是默认值，可以省略。")
    ), Xe(e.subItems, "schema.subItems", t, a)) : t.push(Q("error", "missing-sub-items", "schema.subItems", "表单或详情必须配置 subItems。"));
  return t;
}
function io(e, n = "auto") {
  return lo(e, n);
}
function mt(e, n, t) {
  var s, r;
  const a = io(e, n);
  return a.length && ((s = console.groupCollapsed) == null || s.call(console, `[antdv-superform] ${t} schema 诊断：${a.length} 项`), a.forEach(({ level: o, path: l, message: i }) => {
    const u = `[antdv-superform] ${l}: ${i}`;
    o === "error" ? console.error(u) : o === "warning" ? console.warn(u) : console.info(u);
  }), (r = console.groupEnd) == null || r.call(console)), a;
}
const uo = () => It(
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
function co(e) {
  const n = uo();
  return Object.keys(e).forEach((t) => {
    n[t] ? typeof e[t] == "function" ? n[t].onClick = e[t] : It(n[t], { attrs: { title: n[t].label } }, e[t]) : n[t] = e[t];
  }), n;
}
function fo(e, n = {}, t = {}) {
  const a = co(n), s = [];
  return Array.isArray(e) && e.forEach((r) => {
    const o = typeof r == "string" ? r : r.name, { onClick: l, ...i } = a[o] || {};
    i.attrs = qe({ ...t }, i.attrs), typeof r == "object" && Object.assign(i, r, { attrs: { ...i.attrs, ...r.attrs } });
    const u = F(!1), b = i.attrs.loading, m = tt(b);
    !m && b && (i.attrs.loading = u);
    const v = (p) => {
      m || (u.value = p ? b : !1);
    }, y = { label: i.label, ...r.meta }, c = r.onClick, d = (p, h, f) => {
      p ? xt.confirm({
        title: () => re(p, f),
        okText: "确定",
        cancelText: "取消",
        ...oe.Modal,
        onOk: h
      }) : (v(!0), Promise.resolve(h()).finally(() => {
        v(!1);
      }));
    };
    i.onClick = (p) => {
      const h = { ...p, meta: y };
      c && l ? d(
        i.confirmText,
        () => c(h, async (f) => l({ ...h, ...f })),
        p
      ) : d(i.confirmText, () => {
        var f;
        return (f = l || c) == null ? void 0 : f(h);
      }, p);
    }, s.push(i);
  }), s;
}
function po(e, n, t) {
  const { size: a, buttonShape: s, buttonType: r, limit: o, hidden: l, disabled: i, actions: u } = e, b = e.unauthorized ?? (e.invalidDisabled || e.roleMode === "disable" ? "disable" : e.roleMode && "hide"), m = e.labelMode === "icon", v = { size: a, type: r, shape: s }, y = ln(i, n), c = ft(l, n);
  let d = fo(u, t, v);
  if (ie.buttonRoles) {
    const O = ie.buttonRoles();
    d = d.filter((C) => {
      if (!(!C.roleName || O.includes(C.roleName)))
        if ((C.unauthorized ?? (C.invalidDisabled || C.roleMode === "disable" ? "disable" : C.roleMode && "hide") ?? b ?? "hide") === "disable")
          C.disabled = !0;
        else
          return !1;
      return !0;
    });
  }
  const p = Ce("rootSlots", {}), h = d.map((O) => {
    const C = ft(O.hidden, n), _ = O.disabled !== void 0 ? ln(O.disabled, n) : y, w = (R) => {
      var j;
      (R.domEvent || R).stopPropagation(), (j = O.onClick) == null || j.call(O, { ...n, e: R });
    }, x = O.color && `ant-btn-${O.color}`, D = O.dropdown && K(() => {
      const R = ve(O.dropdown);
      return he(R) ? Object.entries(R).map(([j, B]) => ({ value: j, label: B })) : typeof R[0] != "object" ? Ls(R).map((j) => ({ value: j, label: j })) : R;
    }), M = typeof O.customRender == "string" ? p[O.customRender] : O.customRender, T = K(() => {
      const R = _.value && O.disabledTooltip ? O.disabledTooltip : O.tooltip || (m && O.icon ? O.label : void 0);
      return typeof R == "function" ? R(n) : R;
    });
    return {
      isHide: C,
      render: M,
      menu: D,
      ...O,
      tooltipTitle: T,
      onClick: w,
      attrs: { ...v, class: x, ...O.attrs, disabled: _ }
    };
  }), f = F([]), g = F([]);
  return Ye(() => {
    const O = c.value ? [] : h.filter(({ isHide: C }) => !C.value);
    if (f.value = O, o != null) {
      const C = m && O.length === o + 1 ? o + 1 : o;
      f.value = O.slice(0, C), g.value = O.slice(C);
    }
  }), { btns: f, moreBtns: g, defaultAttrs: v };
}
const Re = /* @__PURE__ */ Z({
  __name: "ButtonGroup",
  props: {
    option: {},
    methods: {},
    effectData: {}
  },
  setup(e) {
    const n = e, { option: t, methods: a, effectData: s } = n, r = Array.isArray(t) ? { actions: t } : t, { attrs: o, moreLabel: l, divider: i, buttonType: u } = r, b = r.labelMode === "icon", m = r.labelMode === "label", { btns: v, moreBtns: y, defaultAttrs: c } = po(r, H(s || {}), a || r.methods), d = i ?? ((o == null ? void 0 : o.direction) !== "vertical" && ["link", "text"].includes(u || ""));
    return (p, h) => ($(), Y(A(Dt), X({
      class: "sup-buttons",
      onClick: h[0] || (h[0] = Oa(() => {
      }, ["stop"])),
      size: A(d) ? 0 : "small"
    }, A(o)), {
      default: te(() => [
        ($(!0), pe(Se, null, Fe(A(v), ({ attrs: f, icon: g, label: O, tooltipTitle: C, dropdownProp: _, menu: w, render: x, onClick: D }, M) => ($(), pe(Se, { key: O }, [
          fe(A(St), { title: C }, {
            default: te(() => [
              w ? ($(), Y(A(Xt), X({
                key: 0,
                disabled: f.disabled
              }, _), {
                overlay: te(() => [
                  fe(A(en), { onClick: D }, {
                    default: te(() => [
                      ($(!0), pe(Se, null, Fe(w, (T) => ($(), Y(A(tn), {
                        key: T.value,
                        disabled: T.disabled
                      }, Ht({
                        default: te(() => [
                          ($(), Y(we(() => A(re)(T.label, A(s)))))
                        ]),
                        _: 2
                      }, [
                        T.icon ? {
                          name: "icon",
                          fn: te(() => [
                            ($(), Y(we(A(ke)(T.icon))))
                          ]),
                          key: "0"
                        } : void 0
                      ]), 1032, ["disabled"]))), 128))
                    ]),
                    _: 2
                  }, 1032, ["onClick"])
                ]),
                default: te(() => [
                  fe(A(lt), Ot(kt(f)), {
                    default: te(() => [
                      g ? ($(), Y(we(A(ke)(g)), { key: 0 })) : _e("", !0),
                      ($(), Y(we(() => A(re)(O, A(s))))),
                      fe(A(Dn))
                    ]),
                    _: 2
                  }, 1040)
                ]),
                _: 2
              }, 1040, ["disabled"])) : x ? ($(), Y(we(() => x({ props: f, ...A(s) })), { key: 1 })) : ($(), Y(A(lt), X({ key: 2 }, f, { onClick: D }), {
                default: te(() => [
                  g && !m ? ($(), Y(we(A(ke)(g)), { key: 0 })) : _e("", !0),
                  !g || !b ? ($(), Y(we(() => A(re)(O, A(s))), { key: 1 })) : _e("", !0)
                ]),
                _: 2
              }, 1040, ["onClick"]))
            ]),
            _: 2
          }, 1032, ["title"]),
          A(d) && M < A(v).length - 1 ? ($(), Y(A($s), {
            key: 0,
            type: "vertical",
            class: "buttons-divider"
          })) : _e("", !0)
        ], 64))), 128)),
        A(y).length ? ($(), Y(A(Xt), { key: 0 }, {
          overlay: te(() => [
            fe(A(en), null, {
              default: te(() => [
                ($(!0), pe(Se, null, Fe(A(y), ({ attrs: f, icon: g, label: O, tooltipTitle: C, onClick: _ }) => ($(), Y(A(tn), {
                  key: O,
                  disabled: f.disabled
                }, {
                  default: te(() => [
                    fe(A(St), { title: C }, {
                      default: te(() => [
                        fe(A(lt), X({ block: "" }, f, {
                          shape: "",
                          onClick: _
                        }), {
                          default: te(() => [
                            g ? ($(), Y(we(A(ke)(g)), { key: 0 })) : _e("", !0),
                            ($(), Y(we(() => A(re)(O, A(s)))))
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
            fe(A(lt), Ot(kt(A(c))), {
              default: te(() => [
                A(l) ? ($(), Y(we(() => A(re)(A(l), A(s))), { key: 0 })) : ($(), Y(A(Ns), { key: 1 }))
              ]),
              _: 1
            }, 16)
          ]),
          _: 1
        })) : _e("", !0)
      ]),
      _: 1
    }, 16, ["size"]));
  }
});
function st({ config: e, methods: n, effectData: t, isView: a }) {
  const s = Array.isArray(e) ? { actions: e } : e, r = (s == null ? void 0 : s.visibleIn) ?? (s == null ? void 0 : s.validOn);
  if (!s || a && r === "form" || !a && r === "detail")
    return;
  let o = s.actions || [];
  if (r || (s.actions = o = o.filter((l) => {
    if (typeof l == "string")
      return !a;
    {
      const i = l.visibleIn ?? l.validOn;
      return a ? i !== "form" : i !== "detail";
    }
  })), o.length !== 0)
    return (l = {}) => S(Re, { option: s, methods: n, effectData: t, ...l });
}
const mo = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  AutoComplete: Vs,
  Button: lt,
  Card: Bs,
  CheckableTag: Es,
  Checkbox: qs,
  CheckboxGroup: Us,
  Col: xe,
  Collapse: zs,
  CollapsePanel: Hs,
  DatePicker: Ys,
  Descriptions: Ks,
  DescriptionsItem: Gs,
  Form: _n,
  FormItem: Ws,
  Input: Zs,
  InputGroup: Qs,
  InputNumber: Js,
  InputSearch: Xs,
  List: ea,
  ListItem: ta,
  Modal: xt,
  Radio: An,
  RadioButton: Mn,
  RadioGroup: na,
  RangePicker: sa,
  Row: Be,
  Select: aa,
  Space: Dt,
  Switch: ra,
  TabPane: oa,
  Table: la,
  Tabs: ia,
  Tag: xn,
  Textarea: ua,
  TimePicker: ca,
  TimeRangePicker: da,
  Tooltip: St,
  TreeSelect: fa,
  Upload: In
}, Symbol.toStringTag, { value: "Module" })), W = { ...mo };
function bo(e) {
  Object.keys(e).forEach((n) => {
    W[n] = e[n];
  });
}
const Qt = Z({
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
    return Ee(e.name, e.data || {}), n.slots.default;
  }
}), Ne = Z({
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
    const { type: t, attrs: a, gutter: s = 16, subSpan: r } = e.option, o = { gutter: s, ...e.option.rowProps, ...n.attrs }, l = Ce("inheritOptions", {}), i = r ?? l.subSpan, u = K(() => e.model.index), b = [];
    let m;
    const v = [...e.model.children];
    for (let d = 0; d < v.length; d++) {
      const [p, h] = v[d], { type: f, align: g, span: O, hideInForm: C, exclude: _, editable: w } = p, x = p.block ?? p.blocked, D = p.breakAfter ?? p.wrapping, { parent: M, refData: T } = ne(h), R = Me({
        parent: e.effectData,
        current: M,
        field: h.refName,
        value: T,
        ...u.value !== void 0 && {
          index: u,
          record: h.refName ? M : T
        }
      });
      if (f === "Hidden" || (_ ? _.includes("form") : C)) {
        Qn({ option: p, model: h, effectData: R });
        continue;
      }
      const { hidden: j, required: B, attrs: U } = Ae({
        option: p,
        effectData: R,
        inheritDisabled: l.disabled
      });
      if (f === "Fragment") {
        h.children && v.splice(
          d + 1,
          0,
          ...[...h.children].map(([le, ye]) => [{ ...le, hidden: j, disabled: U.disabled }, ye])
        );
        continue;
      }
      let G = Rt(p, h, R, U);
      if (!G)
        continue;
      if (pl.includes(f) && w !== void 0 && w !== !0) {
        const le = G, ye = K(() => ze(w) ? w(R) : w), ge = ht(p, H({ ...Pe(R), isView: !0 }));
        G = () => ye.value ? le() : ge ? ge() : T.value;
      }
      const E = { ...p.colProps, span: O };
      if (qe(E, { span: i }, oe.Col, { span: 8 }), (E.span === 0 || E.flex) && (E.span = void 0), t === "InputGroup" && (a == null ? void 0 : a.compact) !== !1) {
        const le = Number(E.span) && (100 / (24 / E.span)).toFixed(2) + "%";
        b.push(() => !j.value && S(G, X({ style: { width: le } }, E)));
        continue;
      }
      let J = G;
      const ce = [...gt, "InputList", "InputGroup"].includes(f);
      if (!ce && (!x || p.field && p.label)) {
        const le = pt(h.rules, R), ye = K(
          () => A(U.disabled) ? void 0 : !p.required || B.value ? le : le.slice(1)
        ), ge = X(oe.FormItem, p.formItemProps), De = rt(p, R);
        J = () => S(W.FormItem, H({ ...ge, name: h.propChain, rules: ye, colon: !!De }), {
          default: G,
          label: De
        });
      }
      if (ce) {
        const le = {
          required: B,
          disabled: U.disabled,
          subSpan: p.subSpan ?? i
        };
        J = () => S(Qt, { name: "inheritOptions", data: le }, G);
      }
      const L = x ?? (gt.includes(f) && !p.span), ae = g && `text-align: ${g}`;
      L ? (m = void 0, b.push(
        () => !j.value && S(
          "div",
          {
            class: ["sup-form-section", f === "Descriptions" && "sup-detail"],
            style: ae,
            key: d,
            ...n.attrs
          },
          J()
        )
      )) : (f === "InputList" && (E.span = O ?? 24), m || b.push(m = []), m.push(() => !j.value && S(xe, X({ style: ae, key: d }, E), J)), D && (m = void 0));
    }
    let y = !1;
    const c = () => b.map((d, p) => Array.isArray(d) ? (y = !0, S(Be, o, () => d.map((h) => h()))) : d());
    return () => e.option.isContainer && y ? S(be.Group, { class: "sup-form-section", ...n.attrs, ...e }, { innerContent: c }) : c();
  }
});
function Rt(e, n, t, a) {
  const { type: s, render: r } = e;
  if (!s)
    return;
  const o = Ce("rootSlots", {}), l = at(e.slots, t), i = r ? typeof r == "function" ? r : o[r] : be[s];
  let u;
  if (s === "InfoSlot")
    u = i && (() => i({ props: a, ...t }));
  else if (s === "Text")
    u = () => S("span", a, n.refData);
  else if (s === "HTML")
    u = () => S("span", { ...a, innerHTML: n.refData });
  else if (s === "Buttons")
    u = () => S(Re, { option: e, effectData: t, ...a });
  else if (gt.includes(s) || s === "InputList")
    u = () => S(be[s], H({ option: e, model: n, effectData: t, ...a }), l);
  else {
    const b = Qn({ option: e, model: n, effectData: t }), m = { ...a, ...b };
    i ? s === "InputSlot" ? u = () => i == null ? void 0 : i(H({ props: m, ...t })) : s.startsWith("Ext") ? u = () => S(i, H({ option: e, effectData: t, ...m }), l) : u = () => S(i, H({ option: e, model: n, effectData: t, ...m }), l) : console.error(`组件 '${s}' 配置错误，请检查名称或'render'是否正确！`);
  }
  return u;
}
const go = Z({
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
    const t = me(e, "source"), { modelsMap: a } = Ke(e.modelsMap, t);
    return Ee("exaProvider", { data: me(e, "source") }), () => {
      var s;
      return S(
        "div",
        { class: ["sup-form-section sup-detail", ((s = n.attrs) == null ? void 0 : s.isContainer) && "sup-container"] },
        S(be.Descriptions, {
          option: e.option,
          model: { children: a },
          effectData: H({ current: t }),
          isView: !0
        })
      );
    };
  }
}), vo = Z({
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
      mode: o = r && "table",
      labelBgColor: l,
      borderColor: i,
      rowProps: u,
      colon: b,
      size: m = "middle",
      tableLayout: v,
      ...y
    } = n;
    let c = a || (Number(t) ? Math.floor(24 / t) : n.column);
    c ?? (c = Number(n.subSpan) ? Math.floor(24 / n.subSpan) : 2);
    function d() {
      const h = [];
      let f = [], g = 0;
      return e.items.forEach(({ option: O, label: C, content: _, hidden: w }, x) => {
        if (A(w))
          return;
        const { span: D = O.span } = O.descriptionsProps || {};
        let M = Number(D) ? Math.ceil(D / (24 / c)) : 1;
        M = M > c ? c : M;
        const T = { ...y, ...O.formItemProps, ...O.descriptionsProps }, R = { ...T.labelAlign && { textAlign: T.labelAlign }, ...T.labelStyle }, j = {
          labelCol: X(T.labelCol, { style: R, class: { "sup-label-no-colon": T.noColon } }),
          wrapperCol: X(
            { style: s === "vertical" && { textAlign: T.labelAlign } },
            { style: T.contentStyle },
            T.wrapperCol
          ),
          option: O,
          attrs: T,
          span: D,
          label: C,
          content: _,
          colspan: M
        };
        if (o === "table")
          if (g + M <= c)
            g += M, f.push(j);
          else {
            if (h.push(f), g < c) {
              const B = c - g;
              f[f.length - 1].colspan += B;
            }
            g = M, f = [j];
          }
        else
          f.push(j);
        (O.breakAfter ?? O.wrapping) && (h.push(f), g = 0, f = []), x === e.items.length - 1 && f.length && h.push(f);
      }), h;
    }
    const p = K(() => d());
    if (o === "table") {
      let h = "";
      i && (h += `--descriptions-border-color:${i};`), l && (h += `--descriptions-bg-color:${l};`);
      const f = () => s === "vertical" ? p.value.flatMap((g) => [
        (g.length > 1 || g[0].label) && S(
          "tr",
          { class: "ant-descriptions-row" },
          g.map(
            (O) => {
              var C;
              return S(
                "th",
                X(
                  {
                    class: "ant-descriptions-item-label",
                    colspan: O.colspan,
                    style: `width: ${(O.span / 24 * 100).toFixed(2)}%`
                  },
                  { class: O.labelCol.class, style: O.labelCol.style }
                ),
                (C = O.label) == null ? void 0 : C.call(O)
              );
            }
          )
        ),
        S(
          "tr",
          { class: "ant-descriptions-row" },
          g.map(
            (O) => S(
              "td",
              X(
                { class: "ant-descriptions-item-content", colspan: O.colspan },
                { class: O.wrapperCol.class, style: O.wrapperCol.style }
              ),
              O.content()
            )
          )
        )
      ]) : (
        // 横向排列
        p.value.map(
          (g, O) => S(
            "tr",
            { class: "ant-descriptions-row" },
            g.flatMap(
              (C) => C.label ? [
                S(
                  "th",
                  X(
                    { class: "ant-descriptions-item-label" },
                    { class: C.labelCol.class, style: C.labelCol.style }
                  ),
                  C.label()
                ),
                S(
                  "td",
                  X(
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
                S(
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
      return () => S(
        "div",
        {
          style: h,
          class: ["ant-descriptions", "ant-descriptions-bordered", m !== "default" && "ant-descriptions-" + m]
        },
        S("div", { class: "ant-descriptions-view" }, S("table", { style: { tableLayout: v } }, f()))
      );
    } else {
      const h = () => p.value.map(
        (f) => S(
          Be,
          { class: "ant-descriptions-row", ...u },
          () => f.map(({ option: g, content: O, span: C, label: _, labelCol: w, wrapperCol: x, attrs: D }) => {
            const M = { span: C, ...D.colProps || g.colProps };
            return M.span === 0 || M.flex ? M.span = void 0 : Number(M.span) || (M.span = n.column ? 24 / n.column : n.subSpan), S(
              xe,
              M,
              () => S(Be, { class: ["ant-descriptions-item-container"] }, () => [
                _ && S(
                  xe,
                  X({ class: "ant-descriptions-item-label" }, w),
                  () => S("label", {}, _())
                ),
                S(
                  xe,
                  { class: "ant-descriptions-item-content", ...x },
                  () => !D.noInput && o === "form" && _ !== void 0 ? S("div", { class: "sup-descriptions-item-input" }, O()) : O()
                )
              ])
            );
          })
        )
      );
      return () => S(
        "div",
        {
          class: [
            "ant-descriptions",
            s === "vertical" && "ant-descriptions-vertical",
            o === "form" ? "sup-descriptions-mode-form" : "sup-descriptions-default",
            b === !1 && "ant-descriptions-item-no-colon",
            m && m !== "default" && "ant-descriptions-" + m
          ]
        },
        S("div", { class: "ant-descriptions-view" }, h())
      );
    }
  }
}), Ue = Z({
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
    var h;
    const r = Ce("exaProvider", {}).attrs, o = Ce("gridConfig", r), l = {
      ...oe.Descriptions,
      ...o
    }, i = qe({ gutter: e.gutter }, e.rowProps || l.rowProps, oe.row, {
      gutter: 16
    }), u = { subSpan: e.subSpan, ...e.descriptionsProps, ...s.attrs }, b = qe(
      {
        subSpan: e.subSpan ?? l.subSpan,
        rowProps: i,
        ...u
      },
      l
    ), m = b.subSpan ?? (b.subSpan = ((h = oe.Col) == null ? void 0 : h.span) ?? 12), v = Bt(n, e, a), y = [];
    let c, d;
    v.forEach((f, g) => {
      f.node ?? (f.node = () => S(vo, { config: u, items: f.group, class: u.class })), f.isBlock ? (f.group || f.option.type === "InputList" ? (d || (d = [], y.push(["section", d])), d.push(f)) : (y.push(["block", f]), d = void 0), c = void 0) : (!c && y.push(["row", c = []]), c.push(f), d = void 0);
    });
    const p = () => S(
      Qt,
      { name: "gridConfig", data: b },
      () => y.map(([f, g], O) => {
        let C = g.node;
        return f === "row" ? C = () => S(
          Be,
          i,
          () => g.map((_, w) => {
            const x = _.option.colProps || { span: _.option.span ?? m };
            return !A(_.hidden) && S(xe, { ...oe.Col, ...x, key: w }, _.node);
          })
        ) : f === "section" && (C = () => g.map((_) => !A(_.hidden) && _.node())), !A(g.hidden) && (y.length > 1 ? S("div", { class: "sup-form-section", key: O }, C()) : C());
      })
    );
    return t ? () => S(
      be.Group,
      X(
        { class: "sup-form-section" },
        {
          option: e,
          model: {},
          effectData: Me({}),
          isView: !0,
          ...u
        }
      ),
      { innerContent: p }
    ) : p;
  }
});
function Bt(e, n, t) {
  const a = [];
  let s;
  const r = Ce("rootSlots", {});
  return [...e].forEach(([o, l], i) => {
    var M, T, R;
    const { type: u = "", field: b, hideInDescription: m, viewRender: v, exclude: y } = o;
    if (u === "Hidden" || m || y != null && y.includes("description"))
      return;
    const { parent: c, refData: d } = Pe(l), p = Me({
      parent: t,
      current: c,
      isView: !0,
      field: l.refName,
      value: d,
      text: d,
      ..."index" in l && { index: l.index, record: b ? d : c }
    }), { attrs: h, hidden: f } = Ae({ option: o, effectData: p }), g = at(o.slots, p), O = rt(o, p);
    let C = o.block ?? o.blocked, _;
    const w = [], x = typeof v == "string" ? r[v] : v;
    _ = x && (() => re(x, p));
    const D = l.children || ((M = l.listData) == null ? void 0 : M.modelsMap);
    if (u === "InputGroup") {
      if (!v) {
        let j = o.breakAfter ?? o.wrapping;
        const U = (T = Bt(D, o, p)[0].group) == null ? void 0 : T.map(({ option: G, content: E }) => {
          const J = G.labelSlot || G.label, ce = (h == null ? void 0 : h.compact) === !1 && J;
          return j = (G.breakAfter ?? G.wrapping) || j, () => S("span", [ce && re(J, p), ce && ": ", E == null ? void 0 : E()]);
        });
        _ = () => S(Dt, { direction: j ? "vertical" : "horizontal" }, () => U == null ? void 0 : U.map((G) => G()));
      }
      w.push({ option: o, label: O, hidden: f, content: _ });
    } else if (u === "Fragment") {
      const j = Bt(D, o, p), B = j[0].group;
      B && (j.shift(), w.push(...B.map((U) => ({ ...U, hidden: f })))), j.length && (s = void 0, a.push(...j));
    } else if (l.children || l.listData || gt.includes(u)) {
      C ?? (C = !o.span);
      const j = [...gt, "InputList"].includes(u) ? u : "Group", B = be[j], U = () => S(B, H({ option: o, model: l, effectData: p, isView: !0, ...oe[j], ...h }), g);
      _ ?? (_ = U), u === "InputList" && (!C || O && !(h != null && h.labelIndex) ? w.push({
        option: { ...o },
        label: O,
        hidden: f,
        content: _
      }) : _ = U);
    } else {
      const j = ho(o, l, p);
      j && w.push({ option: o, label: O, hidden: f, content: j });
    }
    if (!(!w.length && !_))
      if (w.length && !C)
        s || (s = [], a.push({ option: n, isBlock: !0, group: s })), s.push(...w);
      else {
        if (w.length && O)
          a.push({ option: n, isBlock: C, group: w });
        else {
          const j = o.align && { textAlign: o.align };
          _ = ((R = w[0]) == null ? void 0 : R.content) || _, a.push({ option: o, isBlock: C, node: () => S(_, { style: j }), hidden: f });
        }
        s = void 0;
      }
  }), a;
}
function ho(e, n, t) {
  const { parent: a, refData: s } = Pe(n), r = n.refName ? s : void 0, o = ne(a.value) === ne(t.current) ? t : Me({ parent: t, current: a, text: r, value: r, field: n.refName, isView: !0 }), l = ht(e, o);
  return l === !1 ? void 0 : () => l ? l() : String(n.refData ?? "");
}
const jt = Z({
  inheritAttrs: !1,
  props: {
    option: { type: Object, required: !0 },
    model: { type: Object, required: !0 },
    effectData: Object,
    isView: Boolean
  },
  setup({ option: e, model: n, effectData: t, isView: a }, s) {
    const { type: r, label: o, title: l = o, buttons: i, contentAttrs: u } = e, b = r === "Descriptions" || a;
    let m;
    if (i) {
      const O = Array.isArray(i) ? { actions: i } : i;
      r === "Descriptions" && (O.visibleIn ?? (O.visibleIn = O.validOn ?? "detail")), m = st({ config: O, effectData: t, isView: b });
    }
    const { style: v, class: y, ...c } = s.attrs, d = {
      ...s.slots,
      title: l ? rt(e, t) : void 0,
      actions: m,
      default: () => S(
        "div",
        u,
        s.slots.innerContent ? s.slots.innerContent(c) : b ? S(Ue, {
          option: { descriptionsProps: c, ...e },
          modelsMap: n.children,
          effectData: t,
          ...c
        }) : S(Ne, { option: e, model: n, effectData: t, ...c })
      )
    }, p = e.component && ne(e.component);
    let h, f;
    const g = i == null ? void 0 : i.align;
    return m && (i.placement === "bottom" ? f = () => S("div", { class: "sup-bottom-buttons", style: { textAlign: g || "center" } }, m()) : h = () => S(
      xe,
      { class: "sup-title-buttons", flex: 1, style: { textAlign: g || (l ? "right" : void 0) } },
      m
    )), p ? () => S(p, {}, d) : () => S("div", X({ class: y, style: v }, { class: "sup-group" }), [
      (l || h) && S(Be, { align: "middle", class: "sup-titlebar" }, () => [
        l && S(xe, { class: "sup-title" }, d.title),
        h == null ? void 0 : h()
      ]),
      d.default(),
      f && f()
    ]);
  }
}), yo = {
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
    const s = F(), r = F({}), {
      option: { onSubmit: o, onReset: l, buttons: i, ...u },
      ignoreRules: b,
      compact: m
    } = e, v = H({ formData: r, current: r }), { attrs: y } = Ae({ option: u, effectData: v }), c = /* @__PURE__ */ new Set(), d = (x) => {
      x && c.add(x);
    };
    Ee("exaProvider", {
      data: Rn(r),
      attrs: y,
      onSubmit: d
    }), Ee("inheritOptions", {
      disabled: y.disabled,
      subSpan: u.subSpan
    });
    const p = (x) => Promise.all(
      [...c, o].map(async (D) => {
        const M = await (D == null ? void 0 : D(x));
        return M === !1 || M && M.errMessage ? Promise.reject({ message: M && M.errMessage }) : M;
      })
    );
    b && Object.assign(y, { hideRequiredMark: !0, validateTrigger: "none" });
    const h = {
      dataSource: r,
      submit: () => s.value.validate().then((...x) => p(r.value).then(
        () => {
          const D = et(r.value);
          return t("submit", D), D;
        },
        (D) => (typeof D == "object" && D.message && zt.error(D.message), Promise.reject(D))
      )),
      setFieldsValue(x) {
        var D;
        return (D = s.value) == null || D.clearValidate(), es(r.value, x, O);
      },
      resetFields(x = {}) {
        var M;
        Kt(r.value, x, O), (M = s.value) == null || M.clearValidate();
        const D = et(r.value);
        return l == null || l(D), t("reset", D), D;
      }
    }, f = Array.isArray(i) ? { actions: i } : i;
    (w = f == null ? void 0 : f.actions) != null && w.length && (u.subItems = [
      ...u.subItems,
      {
        type: "InfoSlot",
        align: f.align || "center",
        block: !0,
        render: () => S(Re, {
          option: f,
          methods: { submit: h.submit, reset: h.resetFields, search: h.submit },
          effectData: v
        }),
        ...f.placement === "inline" && { span: "auto", block: !1, align: f.align || "right" }
      }
    ]);
    const { modelsMap: g } = nt(u.subItems, r), O = et(r.value);
    z(
      () => A(e.dataSource ?? e.option.dataSource),
      (x) => {
        var D;
        x && ((D = s.value) == null || D.clearValidate(), r.value = x);
      },
      { immediate: !0, flush: "sync" }
    );
    const C = H({ ...h }), _ = (x) => {
      if (!x) {
        t("register", null);
        return;
      }
      Object.assign(C, x, h), s.value = x, t("register", C);
    };
    return n(C), () => S(
      W.Form,
      {
        ref: _,
        class: ["sup-form", m && "sup-form-compact", b && "sup-form-simple"],
        model: r.value,
        labelAlign: "right",
        ...y
      },
      {
        ...a,
        default: () => S(Ne, {
          option: u,
          model: { refData: r, children: g },
          effectData: v
        })
      }
    );
  }
}, So = Z({
  inheritAttrs: !1,
  props: {
    option: { type: Object, required: !0 },
    model: { type: Object, required: !0 },
    effectData: Object,
    compact: { type: Boolean, default: !0 },
    disabled: void 0
  },
  setup(e, { attrs: n }) {
    var d;
    const { option: t, model: a, compact: s } = e, { field: r, slots: o } = t, l = F();
    let i = pt(a.rules, e.effectData), u = a.propChain;
    const b = {};
    if (i)
      z(
        () => a.refData,
        () => {
          var p;
          return (p = l.value) == null ? void 0 : p.onFieldChange();
        },
        { deep: !0 }
      );
    else if (a.children && s) {
      const p = {
        type: "object",
        required: !1,
        fields: {}
      };
      for (const h of a.children.values())
        if (h.rules && h.fieldName) {
          h.rules[0].required && (p.required = !0);
          const f = H({
            ...e.effectData,
            parent: e.effectData,
            current: h.parent,
            field: h.fieldName,
            value: h.refData
          });
          if (p.fields[h.fieldName] = pt(h.rules, f), !a.refName) {
            u = h.propChain, i = p.fields[h.fieldName], z(
              () => A(h.refData),
              () => {
                var g;
                return (g = l.value) == null ? void 0 : g.onFieldChange();
              }
            );
            break;
          }
        }
      a.refName && (i = [p], z(
        () => a.refData,
        () => {
          var h;
          return (h = l.value) == null ? void 0 : h.onFieldChange();
        },
        { deep: !0 }
      ));
    } else
      b.style = "margin: 0";
    b.required = !!((d = i[0]) != null && d.required);
    const m = Ce("inheritOptions", {}), v = K(
      () => e.disabled ? void 0 : !t.required || A(m.required) ? i : i.slice(1)
    ), y = X(oe.FormItem, t.formItemProps, b), c = rt(t, e.effectData);
    return () => S(
      W.FormItem,
      { ...y, rules: v.value, ref: l, name: u },
      {
        label: c,
        default: (o == null ? void 0 : o.default) || (() => S(
          pa,
          () => S(
            W.InputGroup,
            X({ compact: s, style: s && { display: "flex" } }, n),
            () => S(Ne, { option: t, model: a, effectData: e.effectData })
          )
        ))
      }
    );
  }
});
let bt = (e = 21) => crypto.getRandomValues(new Uint8Array(e)).reduce((n, t) => (t &= 63, t < 36 ? n += t.toString(36) : t < 62 ? n += (t - 26).toString(36).toUpperCase() : t > 62 ? n += "-" : n += "_", n), "");
const Oo = Z({
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
    const { model: n, option: t, isView: a, effectData: s, labelIndex: r } = e, { columns: o, rowButtons: l, label: i, labelSlot: u, compact: b, slots: m, ...v } = t, { modelsMap: y } = n.listData, c = o.length === 1 && o[0].field === "$index", d = !r && (i || u), p = me(n, "refData");
    let h = 0;
    const f = {
      add: {
        onClick({ index: w }) {
          p.value.splice(w + 1, 0, c ? void 0 : {}), p.value = [...ne(p.value)];
        },
        icon: () => S(_t)
      },
      delete: {
        disabled: () => p.value.length === 1,
        confirmText: "",
        icon: () => S(ns),
        onClick({ index: w }) {
          p.value.splice(w, 1), p.value = [...ne(p.value)];
        }
      }
    }, g = !a && l !== !1 && {
      type: "Buttons",
      buttonType: "link",
      size: "small",
      colProps: { flex: "0" },
      labelMode: "icon",
      ...oe.rowButtons,
      methods: f,
      actions: ["add", "delete"],
      ...Array.isArray(l) ? { actions: l } : l
    }, O = /* @__PURE__ */ new WeakMap(), C = ct([]);
    z(
      () => p.value.map((w) => ne(w)),
      (w) => {
        w.length === 0 && p.value.push(c ? void 0 : {});
        const x = w.length ? w : p.value.map((T) => ne(T)), D = C.value;
        c && D.length !== x.length && (h += 1);
        const M = x.map((T, R) => {
          var B;
          const j = ne(T);
          return j !== null && typeof j == "object" ? (O.has(j) || O.set(j, bt(12)), O.get(j)) : ((B = D[R]) == null ? void 0 : B.baseKey) ?? bt(12);
        });
        C.value = x.map((T, R) => {
          const j = me(p.value, R), B = [...n.propChain, R], U = {
            index: R,
            parent: p,
            refData: j,
            propChain: B
          }, G = /* @__PURE__ */ new Map();
          let E;
          if (c)
            E = { ...o[0] }, G.set(E, {
              ...y.get(o[0]),
              ...U
            });
          else if (y.size === 1 || !o[0].field) {
            E = { subSpan: "auto", ...o[0], field: String(R) };
            const J = [...y.values()][0];
            G.set(E, {
              ...J,
              ...U,
              refName: String(R),
              children: Ke(J.children || /* @__PURE__ */ new Map(), T, B).modelsMap
            });
          } else
            E = b ? {
              ...v,
              type: "InputGroup",
              initialValue: void 0,
              subSpan: t.subSpan ?? "auto",
              field: String(R)
            } : { type: "Group", span: "auto" }, G.set(E, {
              ...U,
              refName: String(R),
              children: Ke(y, T, B).modelsMap
            });
          return r && (E.label ?? (E.label = i), E.labelSlot ?? (E.labelSlot = u || E.label + String(R + 1))), g && G.set(g, { parent: p, index: R }), {
            children: G,
            model: { parent: p, children: G, index: R },
            refData: j,
            baseKey: M[R],
            key: c ? `${String(M[R])}:${R}:${h}` : M[R]
            // effectData: reactive({ parent: effectData, current: orgList, index: idx, record: refData }),
          };
        });
      },
      {
        immediate: !0
      }
    );
    const _ = () => C.value.map(({ model: w, key: x }) => S(Ne, { model: w, option: t, effectData: s, key: x }));
    if (a) {
      if (d)
        if (c) {
          const { label: D, labelSlot: M = D } = o[0], T = o[0].breakAfter ?? o[0].wrapping;
          return () => S(
            Dt,
            { direction: T ? "vertical" : "horizontal" },
            () => C.value.map(({ refData: R, key: j }, B) => {
              const U = {
                ...s,
                parent: s,
                current: p.value,
                field: o[0].field,
                value: R.value,
                index: B,
                record: R.value
              };
              return S("span", { key: j }, [re(M, U), M ? ": " : "", R.value]);
            })
          );
        } else
          return () => C.value.map(({ children: D, key: M }) => S(Ue, {
            key: M,
            modelsMap: D,
            option: t,
            effectData: s
          }));
      const w = {}, x = K(() => new Map(C.value.flatMap(({ children: D }) => [...D])));
      return () => S(Ue, {
        option: { ...v, label: i, labelSlot: u },
        modelsMap: x.value,
        effectData: s,
        ...w
      });
    } else if (d) {
      const w = /* @__PURE__ */ new Map([
        [
          {
            ...v,
            label: i,
            labelSlot: u,
            type: "InfoSlot",
            block: !1,
            render: _
          },
          n
        ]
      ]);
      return () => S(Ne, { model: { children: w }, option: t, effectData: s });
    } else
      return _;
  }
}), wo = /* @__PURE__ */ Z({
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
      buttons: o
    } = e;
    return () => S(W.Card, {}, {
      title: r && (() => S("div", {
        class: "sup-title"
      }, re(r, t))),
      extra: () => o && !a && S(Re, {
        option: o,
        effectData: t
      }),
      default: () => a ? S(Ue, {
        option: e,
        modelsMap: n.children,
        effectData: t
      }) : S(Ne, {
        option: e,
        model: n,
        effectData: t
      })
    });
  }
}), Co = Z({
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
    const { buttons: r, rowButtons: o, label: l, title: i = l } = n, { modelsMap: u, rules: b } = e.listData, { propChain: m } = e, v = me(e, "refData"), c = jn().rowKey || "id", d = {
      add() {
        v.value.push({});
      },
      delete({ record: w }) {
        const x = v.value.indexOf(w);
        v.value.splice(x, 1);
      }
    }, p = /* @__PURE__ */ new WeakMap(), h = F([]);
    z(
      () => [...v.value],
      (w) => {
        h.value = w.map((x, D) => {
          const M = ne(x);
          p.has(M) || p.set(M, x[c] || bt(12));
          const T = p.get(M), { modelsMap: R } = Ke(u, x, m, D);
          return {
            hash: T,
            model: { refData: F(x), children: R, index: D },
            effectData: H({ parent: a, current: v, index: D, record: x })
          };
        });
      },
      {
        immediate: !0
      }
    );
    const f = { ...s.slots };
    if (f.title || (f.title = i && (() => re(i, a))), r) {
      const w = r.targetSlot ?? r.forSlot ?? "extra", x = f[w], D = st({
        config: r,
        effectData: a,
        methods: d,
        isView: t
      });
      (x || D) && (f[w] = () => [x == null ? void 0 : x(), D == null ? void 0 : D()]);
    }
    const { title: g, extra: O, ...C } = f;
    (g || O) && (C.header = () => S(Be, { align: "middle" }, () => [
      g && S(xe, { class: "sup-title", flex: 1 }, g),
      O && S(xe, { class: "sup-title-buttons", style: { textAlign: r == null ? void 0 : r.align } }, O)
    ]));
    const _ = o && {
      buttonType: "link",
      size: "small",
      ...oe.rowButtons,
      ...Array.isArray(o) ? { actions: o } : o
    };
    return C.renderItem = ({ item: w }) => S(
      W.ListItem,
      { key: w.hash },
      {
        default: () => {
          var x;
          return [
            t ? S(Ue, { option: n, modelsMap: w.model.children, effectData: w.effectData }) : S(Ne, { model: w.model, option: n, class: "ant-list-item-meta", effectData: w.effectData }),
            _ && ((x = st({
              config: _,
              methods: d,
              effectData: w.effectData,
              isView: t
            })) == null ? void 0 : x({ class: "ant-list-item-action" }))
          ];
        }
      }
    ), () => S(W.List, { dataSource: h.value }, C);
  }
}), xo = Z({
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
    const { model: t, isView: a, effectData: s, labelIndex: r, rowKey: o = "" } = e, { columns: l, rowButtons: i, slots: u, ...b } = e.option, { modelsMap: m, rules: v } = t.listData, { propChain: y } = t, c = me(t, "refData"), d = {
      add: {
        icon: () => S(_t),
        onClick({ index: C }) {
          c.value.splice(C + 1, 0, {}), c.value = [...ne(c.value)];
        }
      },
      delete: {
        hidden: () => c.value.length === 1,
        disabled: !1,
        confirmText: "",
        icon: () => S(ns),
        onClick({ index: C }) {
          c.value = c.value.filter((_, w) => w !== C);
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
    }, h = /* @__PURE__ */ new WeakMap(), f = F([]);
    z(
      c,
      (C) => {
        C.length === 0 && C.push({}), f.value = C.map((_, w) => {
          const x = ne(_);
          h.has(x) || h.set(x, _[o] || bt(12));
          const { modelsMap: D } = Ke(m, _, y, w);
          return {
            key: h.get(x),
            model: { refData: F(_), children: D, index: w },
            effectData: H({ parent: s, current: c, index: w, record: _ })
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
      subItems: l
    }, O = b.title || b.label;
    return typeof O == "string" && r && (g.title = ({ index: C }) => O + String(C + 1)), () => f.value.map(({ model: C, effectData: _, key: w }) => S(be.Group, { model: C, option: g, effectData: _, key: w, isView: a }, n.slots));
  }
}), Do = {
  name: "ExTabs"
}, _o = /* @__PURE__ */ Z({
  ...Do,
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
    } = W, {
      option: a,
      model: s,
      isView: r,
      effectData: o
    } = e, l = F(a.activeKey), i = [], u = (m, v, y) => {
      i[m] = !y && v, y && l.value === v && (l.value = i.find((c) => c));
    };
    kn(() => {
      l.value ?? (l.value = i.find((m) => m));
    });
    const b = [...s.children].map(([m, v], y) => {
      const {
        key: c,
        field: d,
        label: p,
        icon: h
      } = m, f = Me({
        parent: o,
        current: me(v, "parent"),
        field: v.refName,
        value: v.refData
      }), {
        hidden: g,
        attrs: O
      } = Ae({
        option: m,
        effectData: f
      }), C = c || d || String(y), _ = () => [ke(h), re(p, f)];
      return Ye(() => {
        u(y, C, A(g) || A(O.disabled));
      }), {
        attrs: H({
          ...O,
          key: C,
          tab: _
        }),
        hidden: g,
        option: {
          ...m,
          type: "TabPane"
        },
        model: v,
        effectData: f
      };
    });
    return (m, v) => ($(), Y(A(n), {
      activeKey: l.value,
      "onUpdate:activeKey": v[0] || (v[0] = (y) => l.value = y)
    }, {
      rightExtra: te(() => [!m.isView && m.option.buttons ? ($(), Y(A(Re), {
        key: 0,
        option: m.option.buttons
      }, null, 8, ["option"])) : _e("", !0)]),
      default: te(() => [($(!0), pe(Se, null, Fe(A(b), ({
        attrs: y,
        hidden: c,
        option: d,
        model: p,
        effectData: h
      }) => ($(), pe(Se, {
        key: y.key
      }, [c.value ? _e("", !0) : ($(), Y(A(t), Ot(X({
        key: 0
      }, y)), {
        default: te(() => [m.isView ? ($(), Y(A(Ue), {
          key: 0,
          option: d,
          modelsMap: p.children,
          effectData: h
        }, null, 8, ["option", "modelsMap", "effectData"])) : ($(), Y(A(Ne), {
          key: 1,
          option: d,
          model: p,
          effectData: h
        }, null, 8, ["option", "model", "effectData"]))]),
        _: 2
      }, 1040))], 64))), 128))]),
      _: 1
    }, 8, ["activeKey"]));
  }
}), Ao = Z({
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
    const t = F(), a = At({
      ...e.schema,
      dataSource: e.dataSource || e.model || ((i = e.schema) == null ? void 0 : i.dataSource),
      attrs: X({ ...oe.Form }, { ...(u = e.schema) == null ? void 0 : u.attrs })
    });
    ie.schemaDiagnostics && e.schema && mt(e.schema, "form", "SuperForm");
    const s = {
      setOption: (b) => {
        var m;
        ie.schemaDiagnostics && mt(b, "form", "SuperForm"), qe(a, b), a.attrs = X(a.attrs, { ...b.attrs }, { ...(m = e.schema) == null ? void 0 : m.attrs });
      }
    };
    Ee("rootSlots", n.slots), n.emit("register", s);
    const r = (b) => {
      t.value = b, n.emit("register", s, b);
    };
    kn(() => n.expose(t.value));
    const o = K(() => e.isContainer || a.isContainer);
    return () => a.subItems && S(
      be.Form,
      {
        option: a,
        // dataSource: formData.value,
        onRegister: r,
        class: { "sup-container": o.value }
      },
      at(a.slots, Me(), n.slots)
    );
  }
});
function Mo(e) {
  const [n, t] = ts(), a = Promise.resolve(typeof e == "function" ? e() : e), s = (o, l) => {
    if (o)
      n.value || a.then(o.setOption), n.value = l;
    else
      return (i, u) => S(Ao, { ...i, onRegister: s }, u == null ? void 0 : u.slots);
  }, r = async (o, l) => {
    const i = await t();
    if (o && o in i)
      return typeof i[o] == "function" ? i[o](l) : i[o];
    if (!o)
      return i;
  };
  return [
    s,
    {
      dataSource: K(() => {
        var o;
        return (o = n.value) == null ? void 0 : o.dataSource;
      }),
      getForm: t,
      asyncCall: r,
      getData() {
        var o;
        return ve((o = n.value) == null ? void 0 : o.dataSource);
      },
      submit: () => r("submit"),
      resetFields: (o) => r("resetFields", o),
      setFieldsValue: (o) => r("setFieldsValue", o),
      /**
       * @deprecated 使用`resetFields`
       */
      setData(o) {
        r("resetFields", o);
      }
    }
  ];
}
function Ml(e) {
  return e;
}
function ss(e, { buttons: n, ...t } = {}) {
  const a = F(!1), s = H({ ...t, ...oe.Modal }), r = F(), o = n && (() => S(Re, { option: n, effectData: { modalRef: r } })), l = F(!1), i = () => {
    var d;
    return l.value = !0, Promise.resolve((d = s.onOk) == null ? void 0 : d.call(s)).then(() => {
      a.value = !1;
    }).catch((p) => console.error(p)).finally(() => l.value = !1);
  }, u = () => s.icon ? [ke(s.icon), re(s.title)] : re(s.title), b = (d) => a.value = d;
  return {
    modalRef: r,
    modalSlot: (d, p) => S(
      W.Modal,
      {
        ref: r,
        visible: a.value,
        class: "sup-modal",
        "onUpdate:visible": b,
        confirmLoading: l.value,
        ...s,
        title: void 0,
        ...d,
        onOk: i
      },
      { footer: o, title: u, ...p == null ? void 0 : p.slots, ...e && { default: e } }
    ),
    setModal: (d) => {
      Object.assign(s, d);
    },
    closeModal: () => (a.value = !1, $e()),
    openModal: async (d) => (Object.assign(s, d), a.value = !0, $e())
  };
}
function as(e, n) {
  const { modalSlot: t, openModal: a, modalRef: s, closeModal: r, setModal: o } = ss(e, n), l = Tn(), i = document.createDocumentFragment();
  let u;
  const b = Ce("configProvider"), m = (c) => {
    var h;
    const d = (h = b == null ? void 0 : b.getPrefixCls) == null ? void 0 : h.call(b), p = c.prefixCls || "".concat(d, "-modal");
    return S(
      ma,
      { ...b, notUpdateGlobalConfig: !0, prefixCls: d },
      () => t({ ...c, rootPrefixCls: d, prefixCls: p }, {})
    );
  }, v = () => {
    Tt(null, i), u = null;
  };
  return b && Mt(() => {
    u && v();
  }), {
    modalRef: s,
    openModal: (c) => {
      var d, p;
      if (s.value)
        return a(c);
      if (u = fe(m), u.appContext = l == null ? void 0 : l.appContext, Tt(u, i), (d = s.value) != null && d.destroyOnClose) {
        const h = (p = s.value) == null ? void 0 : p.afterClose;
        o({
          afterClose() {
            h == null || h(), v();
          }
        });
      }
      return $e(() => a(c));
    },
    modalSlot: t,
    closeModal: r,
    setModal: o
  };
}
function Il(e, n = {}) {
  const { title: t, ...a } = e, [s, r] = Mo(a), o = as(s(), { maskClosable: !1, title: t, ...n });
  return { ...o, openModal: ({ data: i, onOk: u = n.onOk, ...b } = {}) => {
    const m = () => r.submit().then((v) => u ? u(v) : v);
    return r.resetFields(i), o.openModal({ ...b, onOk: m });
  }, formActions: r };
}
const it = (e, ...n) => Ar(e, ...n, (t, a, s, r) => {
  if (a === void 0)
    r[s] = void 0;
  else if (Array.isArray(t))
    return a;
});
function Io(e) {
  const n = /* @__PURE__ */ new WeakMap(), t = (s) => {
    const r = ne(s);
    let o = n.get(r);
    return o || (o = At({
      isEdit: !1
    }), n.set(r, o)), o;
  };
  return {
    getEditInfo: t,
    setEditInfo: (s, r) => {
      const o = t(s);
      if (o.editData)
        Kt(o.editData, s), Object.assign(o, r);
      else {
        const l = H(et(s)), {
          modelsMap: i,
          rules: u
        } = Xn(ne(e), l), b = _n.useForm(l, F(u));
        b.clearValidate(), Object.assign(o, {
          ...r,
          form: b,
          modelsMap: i,
          editData: l
        });
      }
    }
  };
}
function Ro({
  childrenMap: e,
  orgList: n,
  listener: t,
  rowEditor: a
}) {
  const s = F(!1), r = F([]);
  z(() => [...n.value], (c) => {
    r.value = c, s.value = !1;
  }, {
    immediate: !0
  });
  const {
    getEditInfo: o,
    setEditInfo: l
  } = Io(e), i = {
    add({
      index: c,
      resetData: d
    }) {
      const p = {
        ...d
      };
      c !== void 0 ? r.value.splice(c + 1, 0, p) : r.value.push(p), l(p, {
        index: c,
        isEdit: !0,
        isNew: !0
      }), s.value = !0;
    },
    edit({
      record: c,
      selectedRows: d,
      resetData: p
    }) {
      const h = c || d[0];
      l(it(h, p), {
        isEdit: !0
      }), s.value = !0;
    },
    delete({
      record: c,
      selectedRows: d
    }) {
      const p = c ? [c] : d;
      return t.onDelete(p);
    }
  }, u = {
    add: {
      disabled: () => s.value,
      onClick: i.add
    },
    edit: {
      disabled: (c) => {
        var d;
        return s.value || !(c.record || ((d = c.selectedRows) == null ? void 0 : d.length) === 1);
      },
      onClick: i.edit
    },
    delete: {
      disabled: (c) => {
        var d;
        return s.value || !(c.record || ((d = c.selectedRows) == null ? void 0 : d.length) > 0);
      },
      onClick: i.delete
    }
  }, b = [{
    label: "保存",
    loading: !0,
    onClick: async (c) => {
      const {
        record: d
      } = c, p = o(d);
      return p.form.validate().then(async () => {
        var g;
        const h = ne(p.form.modelRef);
        if (await ((g = a == null ? void 0 : a.onSave) == null ? void 0 : g.call(a, {
          ...c,
          isNew: p.isNew
        })) === !1)
          return !1;
        p.isNew ? (Object.assign(d, h), t.onSave(d, p.index).then(() => {
          p.isNew = !1, p.isEdit = !1;
        })) : t.onUpdate(h, d).then(() => {
          p.isEdit = !1;
        }), s.value = !1;
      }).catch((h) => {
        console.log("error", h), h != null && h.errorFields && zt.error(h.errorFields[0].errors[0]);
      });
    }
  }, {
    label: "取消",
    onClick: async (c) => {
      var h;
      const d = o(c.record);
      await ((h = a == null ? void 0 : a.onCancel) == null ? void 0 : h.call(a, {
        ...c,
        isNew: d.isNew
      })) !== !1 && (d.isNew && r.value.splice(d.index + 1, 1), d.isEdit = !1, s.value = !1);
    }
  }], m = (c, d) => o(c.record).isEdit ? S(Re, {
    key: "edit",
    option: {
      ...d,
      actions: b
    },
    effectData: c
  }) : null, v = /* @__PURE__ */ Z({
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
      editInfo: d,
      viewRender: p
    }) {
      const {
        editable: h = !0
      } = c, {
        modelsMap: f,
        form: g
      } = d, O = f.get(ne(c)), {
        index: C,
        parent: _,
        refData: w
      } = Pe(O), x = O.propChain.join("."), D = Me({
        current: _,
        value: w,
        index: C
      }), {
        attrs: M,
        hidden: T
      } = Ae({
        option: c,
        effectData: D
      }), R = K(() => !T.value && (ze(h) ? h(D) : h)), j = Rt(c, O, D, M), B = pt(O.rules, D);
      return B && (g.rulesRef.value[x] = K(() => A(M.disabled) || A(T) ? [] : B)), () => R.value ? S(W.FormItem, {
        wrapperCol: {},
        ...g.validateInfos[x]
      }, j) : p ? p({
        ...D,
        isView: !0
      }) : w.value;
    }
  });
  return {
    list: r,
    methods: i,
    buttonMethods: u,
    getEditRender: (c, d) => {
      if (be[c.type] || c.type === "InputSlot")
        return ({
          record: h
        }) => {
          const f = o(h);
          if (f.isEdit)
            return S(v, {
              option: c,
              editInfo: f,
              viewRender: d
            });
        };
    },
    editButtonsSlot: m
  };
}
function jo({ rowKey: e, option: n, listener: t }) {
  const a = F(), s = n.rowEditor, r = (s == null ? void 0 : s.form) || n.editForm || n.formSchema || {};
  r.subItems = r.subItems || n.columns.filter((c) => {
    var d;
    return !(c.hideInForm || (d = c.exclude) != null && d.includes("form"));
  });
  const o = F(r.dataSource || {}), l = () => S(be.Form, {
    option: r,
    dataSource: o,
    onRegister: (c) => a.value = c
  }), i = {
    ...oe.Modal,
    maskClosable: !1,
    ...n.modalProps,
    ...s == null ? void 0 : s.modalProps
  }, { modalSlot: u, openModal: b, closeModal: m } = ss(l, i), v = ({ meta: c, ...d }) => re(i.title, { meta: c, ...d }) || `${r.title ? r.title + " - " : ""}  ${c.title || c.label}`;
  return { modalSlot: u, methods: {
    add(c = {}) {
      const { meta: d = {}, resetData: p, index: h } = c;
      return o.value = { ...p }, $e(() => {
        var f;
        (f = a.value) == null || f.clearValidate();
      }), d.title ?? (d.title = "新增"), d.name = "add", d.isNew = !0, b({
        ...d,
        title: v({ ...c, source: o.value, meta: d }),
        onOk: async () => a.value.submit().then(async (f) => {
          var O;
          if (await ((O = s == null ? void 0 : s.onSave) == null ? void 0 : O.call(s, { ...c, source: f, meta: d })) !== !1)
            return t.onSave(f, h);
        }),
        onCancel: async () => {
          var f;
          return await ((f = s == null ? void 0 : s.onCancel) == null ? void 0 : f.call(s, { ...c, meta: d })), m();
        }
      });
    },
    async edit(c) {
      var C, _, w;
      const { record: d, selectedRows: p, resetData: h, meta: f = {} } = c, g = d || p[0];
      if (!g)
        return Promise.reject(new Error("未选择记录"));
      const O = await ((_ = (C = n.apis) == null ? void 0 : C.info) == null ? void 0 : _.call(C, e(g), g));
      return o.value = it({}, g, O, h), qe(f, { name: "edit", title: "编辑", isNew: !1 }), (w = a.value) == null || w.clearValidate(), b({
        ...f,
        title: v({ ...c, source: o.value, meta: f }),
        onOk: async () => a.value.submit().then(async (x) => {
          var M;
          if (await ((M = s == null ? void 0 : s.onSave) == null ? void 0 : M.call(s, { ...c, source: x, meta: f })) !== !1)
            return t.onUpdate(x, g);
        }),
        onCancel: async () => {
          var x;
          return await ((x = s == null ? void 0 : s.onCancel) == null ? void 0 : x.call(s, { ...c, meta: f })), m();
        }
      });
    },
    delete({ record: c, selectedRows: d }) {
      const p = c ? [c] : d;
      return t.onDelete(p);
    }
  } };
}
function ko({
  model: e,
  orgList: n,
  rowKey: t,
  setRowKey: a,
  editableRef: s
}) {
  const {
    modelsMap: r
  } = e.listData, o = F([]), l = /* @__PURE__ */ new WeakMap(), i = /* @__PURE__ */ new WeakMap();
  z(() => [...n.value], (v) => {
    o.value = v.map((y, c) => {
      const d = l.get(ne(y)) || At({});
      if (d.index !== c) {
        d.index = c;
        const {
          modelsMap: h
        } = Xn(ne(r), y, e.propChain, c);
        d.modelsMap = h;
      }
      d.record ?? (d.record = H({
        ...Pe(y)
      }));
      const p = t(y);
      return a(d.record, p), l.set(ne(y), d), i.set(ne(d.record), d), d.record;
    });
  }, {
    immediate: !0
  });
  const u = {
    add({
      index: v,
      resetData: y
    }) {
      const c = {
        ...y
      };
      v !== void 0 ? n.value.splice(v + 1, 0, c) : n.value.push(c);
    }
    // delete({ record }) {
    //   const orgIdx = orgList.value.indexOf(record)
    //   orgList.value.splice(orgIdx, 1)
    // },
  }, b = /* @__PURE__ */ Z({
    inheritAttrs: !1,
    props: {
      option: {
        type: Object,
        required: !0
      }
    },
    setup({
      option: v
    }, y) {
      const {
        record: c
      } = y.attrs, d = K(() => i.get(ne(c)).modelsMap.get(v)), {
        index: p,
        parent: h,
        refData: f
      } = Pe(d.value), g = Me({
        current: h,
        value: f,
        list: n,
        record: c,
        index: p
      }), {
        editable: O = !0
      } = v, {
        attrs: C,
        hidden: _
      } = Ae({
        option: v,
        effectData: g
      }), w = K(() => !_.value && s.value && (ze(O) ? O(g) : O)), x = Rt(v, d.value, g, C), D = ht(v, H({
        ...Pe(g),
        isView: !0
      })), M = pt(d.value.rules, g), T = M && K(() => A(C.disabled) ? void 0 : M);
      return () => w.value ? S(W.FormItem, H({
        wrapperCol: {},
        name: d.value.propChain,
        rules: T
      }), x) : D ? D() : f.value;
    }
  });
  return {
    list: o,
    methods: u,
    getEditRender: (v) => {
      if (be[v.type] || v.type === "InputSlot" && v.editable !== !1)
        return (c) => S(b, {
          option: v,
          ...c
        });
    }
  };
}
function To(e, n, t) {
  const a = F({}), { title: s, apis: r } = e, { modalProps: o, ...l } = e.descriptionsProps || {}, i = () => S(go, { option: { descriptionsProps: l }, modelsMap: n, source: a }), u = {
    ...oe.Modal,
    footer: null,
    ...e.modalProps,
    ...o
  }, b = (y) => re(u.title, y) || `${s ? s + " - " : ""}详情`, { openModal: m, modalSlot: v } = as(i, u);
  return {
    detailSlot: v,
    openDetail: async ({ record: y, selectedRows: c, meta: d = {}, ...p }) => {
      const h = y || c[0];
      if (r != null && r.info) {
        const f = await r.info(t(h), h);
        a.value = Object.assign({}, h, f);
      } else
        a.value = h;
      d.name = "detail", m({ ...d, title: b({ ...p, source: a.value, meta: d }) });
    }
  };
}
function Po({ option: e, model: n, orgList: t, rowKey: a, setRowKey: s, listener: r, isView: o, effectData: l }) {
  const { modelsMap: i } = n.listData, u = {
    list: t,
    modalSlot: [],
    methods: {
      delete({ record: h, selectedRows: f }) {
        const g = h ? [h] : f;
        return r.onDelete(g);
      }
    }
  }, { edit: b, editable: m = b, rowEditor: v } = e, { editMode: y, addMode: c } = v || e;
  if (!o && m) {
    const h = K(() => ze(m) ? m(l) : m), { methods: f, ...g } = ko({ model: n, orgList: t, rowKey: a, setRowKey: s, editableRef: h });
    Object.assign(u.methods, f), Object.assign(u, g);
  } else if (y === "inline") {
    const { list: h, methods: f, buttonMethods: g, editButtonsSlot: O, getEditRender: C } = Ro({
      childrenMap: i,
      orgList: t,
      listener: r,
      rowEditor: v
    });
    u.list = h, Object.assign(u.methods, f), Object.assign(u, { buttonMethods: g, editButtonsSlot: O, getEditRender: C });
  }
  if (y === "modal" || c === "modal") {
    const { modalSlot: h, methods: f } = jo({ rowKey: a, option: e, listener: r });
    u.methods.edit ? (u.methods.add = f.add, u.buttonMethods || (u.buttonMethods = {}), u.buttonMethods.add = f.add) : Object.assign(u.methods, f), u.modalSlot.push(h);
  }
  const { detailSlot: d, openDetail: p } = To(e, i, a);
  return u.modalSlot.push(d), u.methods.detail = p, u;
}
function Ge(e, n, t) {
  var b, m, v, y;
  const { options: a, dictName: s, valueToNumber: r } = e, o = ((m = (b = e.attrs) == null ? void 0 : b.fieldNames) == null ? void 0 : m.label) || "label", l = ((y = (v = e.attrs) == null ? void 0 : v.fieldNames) == null ? void 0 : y.value) || "value", i = F(n || []);
  return typeof a == "function" ? Pn(() => {
    Promise.resolve(a(t)).then((c) => {
      i.value = c;
    });
  }) : a ? z(
    () => A(a),
    (c) => i.value = c,
    { immediate: !0 }
  ) : s && ie.dictApi && ie.dictApi(s).then((c) => i.value = c), {
    optionsRef: K(() => {
      let c = e.labelAsValue ?? e.valueToLabel;
      const d = ut(i.value) ? i.value : [];
      return d[0] && !he(d[0]) && !r && (c = !0), he(i.value) || !he(d[0]) ? Object.entries(i.value).map(([p, h]) => ({
        label: h,
        value: c ? h : r ? Number(p) : p
      })) : d.map((p) => ({
        ...p,
        label: p[o],
        value: c ? p[o] : r ? Number(p[l]) : p[l]
      }));
    }),
    setOptions(c) {
      i.value = c;
    }
  };
}
const Fo = Z({
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
    const { Card: s, Tabs: r, TabPane: o } = W, { optionsRef: l } = Ge(
      { ...e, labelAsValue: e.labelAsValue || e.valueToLabel },
      [],
      e.effectData
    ), i = F(e.activeKey ?? e.defaultActiveKey), u = (_) => {
      i.value = _, a("update:activeKey", _);
    }, {
      default: b,
      extra: m,
      rightExtra: v,
      tabBarExtraContent: y,
      tabBarExtra: c,
      title: d,
      titleBar: p,
      ...h
    } = t, f = at(e.slots, e.effectData), g = c || v || y, O = K(() => {
      var w;
      const _ = l.value.map(({ value: x, label: D, ...M }) => ({
        ...M,
        key: M.key ?? x,
        tab: M.tab ?? D
      }));
      return i.value === void 0 && u((w = _[0]) == null ? void 0 : w.key), _;
    }), C = (_) => re(f.customTab || e.customTab || _.tab, { ...e.effectData, item: _ });
    return e.bordered ? () => S(
      s,
      {
        tabList: O.value,
        activeTabKey: i.value,
        onTabChange: u
      },
      {
        ...h,
        default: b,
        customTab: C,
        title: d,
        tabBarExtraContent: g || (d ? void 0 : m),
        extra: g || d ? m : void 0,
        ...f
      }
    ) : () => [
      d ? p == null ? void 0 : p() : null,
      S(
        r,
        {
          ...n,
          activeKey: i.value,
          "onUpdate:activeKey": u
        },
        {
          ...h,
          default: () => O.value.map((_) => S(o, { ..._, tab: () => C(_) })),
          rightExtra: g || (d ? void 0 : m),
          ...f
        }
      ),
      b == null ? void 0 : b()
    ];
  }
}), $o = Z({
  props: {
    option: { type: Object, required: !0 },
    effectData: { type: Object, required: !0 }
  },
  setup(e) {
    const n = e.option, { field: t, editable: a } = e.option, s = H({});
    z(
      () => e.effectData,
      (c) => Object.assign(s, c),
      { immediate: !0 }
    );
    const r = t.split(".").slice(0, -1), o = K(() => Ve(s.record, r)), l = K({
      get: () => Ve(s.record, t),
      set: (c) => dt(s.record, t, c)
    }), i = { parent: o, refData: l }, { attrs: u, hidden: b } = Ae({ option: n, effectData: { ...s, inTable: !0 } }), m = Rt(n, i, s, u), v = K(() => ze(a) ? a(s) : A(a)), y = ht(n, s);
    return () => b.value ? "" : v.value ? S("div", { class: "editable-cell" }, m()) : y ? y() : l.value;
  }
}), No = (e) => {
  if (!e.editable)
    return;
  const n = ie.buttonRoles && ie.buttonRoles() || [], t = !e.roleName || n.includes(e.roleName), a = be[e.type];
  if (t && (a || e.type === "InputSlot"))
    return (s) => S($o, { option: e, effectData: { ...s } });
};
function Lo({ childrenMap: e, context: n, option: t, attrs: a, isView: s, effectData: r }) {
  const { list: o, methods: l, buttonMethods: i, getEditRender: u, editButtonsSlot: b } = n, m = Me({ list: r.value, isView: s, parent: r }), v = function d(p = e) {
    const h = [];
    return [...p].forEach(([f, g]) => {
      var C, _;
      if (f.type === "Hidden" || f.hideInTable || f.hidden === !0 || (C = f.exclude) != null && C.includes("table"))
        return;
      const O = rt(f, m);
      if (g.children) {
        const w = d(g.children);
        f.ignoreTableTitle ? h.push(...w) : h.push({
          title: O,
          children: w
        });
      } else {
        const w = {
          title: O,
          key: f.field || f.label,
          dataIndex: g.propChain.length > 1 ? g.propChain : g.propChain[0]
        };
        f.options || f.dictName || f.type === "Switch" || (_ = f.type) != null && _.includes("Picker") ? w.align = "center" : f.type === "InputNumber" && (w.align = "right"), Object.assign(w, f.columnProps), qe(w, t.columnProps, oe.Column);
        const x = w.customRender || ht(f) || void 0, D = u ? u(f, x) : No(f);
        w.customRender = Vo(x, D, m), h.push(w);
      }
    }), h;
  }(), y = Eo(t, a);
  y && v.unshift(y);
  const c = Bo({
    buttons: t.rowButtons,
    methods: i || l,
    editButtonsSlot: b,
    isView: s,
    effectData: m
  });
  return c && (qe(c, t.columnProps, oe.Column), v.push(c)), v;
}
function Vo(e, n, t) {
  if (n || e) {
    const a = (s) => {
      const r = (n == null ? void 0 : n(s)) ?? (e == null ? void 0 : e({ ...s, isView: !0 })) ?? String(s.text ?? "");
      return r && typeof r == "string" && s.column.ellipsis ? S("span", { title: r }, r) : r;
    };
    return (s) => S(a, { ...t, ...s, current: s.record });
  } else
    return ({ text: a }) => String(a ?? "");
}
function Bo({ buttons: e, methods: n, editButtonsSlot: t, isView: a, effectData: s }) {
  const r = {
    buttonType: "link",
    size: "small",
    ...oe.rowButtons,
    ...Array.isArray(e) ? { actions: e } : e
  }, { columnProps: o, ...l } = r, i = st({ config: l, methods: n, isView: a });
  if (!i)
    return;
  const u = (b) => (t == null ? void 0 : t(b, l)) || i({ key: b.record, effectData: b });
  return {
    title: "操作",
    key: "action",
    fixed: "right",
    minWidth: 100,
    width: 100,
    align: "center",
    resizable: !1,
    ...o,
    customRender: (b) => S(u, { ...s, ...b, current: b.record })
  };
}
const Eo = (e, n) => {
  var a;
  const t = e.indexColumn ?? ((a = oe.Table) == null ? void 0 : a.indexColumn);
  if (t)
    return {
      key: "INDEX",
      title: "序号",
      width: 60,
      align: "center",
      customRender: ({ index: s }) => {
        var r, o;
        return ((((r = n.pagination) == null ? void 0 : r.current) || 1) - 1) * (((o = n.pagination) == null ? void 0 : o.pageSize) || 10) + s + 1;
      },
      ...he(t) && t
    };
}, qo = Z({
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
  setup({ option: e, model: n, reload: t, effectData: a, isView: s, ...r }, o) {
    var We, Le, He;
    const l = ((We = e.rowEditor) == null ? void 0 : We.editMode) === "inline", i = o.attrs, u = /* @__PURE__ */ new WeakMap(), b = i.rowKey || "id", m = (P) => {
      const N = P[b];
      if (N)
        return N;
      const se = ne(P);
      return u.has(se) || u.set(se, bt(12)), u.get(se);
    }, v = (P, N) => u.set(ne(P), N), y = me(n, "refData"), c = ((Le = e.attrs) == null ? void 0 : Le.rowSelection) || void 0, d = F((c == null ? void 0 : c.selectedRowKeys) || []), p = F([]), h = c && {
      fixed: !0,
      ...c,
      selectedRowKeys: d,
      onChange: (P, N) => {
        var se;
        d.value = P, p.value = N, (se = c == null ? void 0 : c.onChange) == null || se.call(c, P, N);
      },
      ...l && {
        getCheckboxProps: (P) => {
          var N;
          return {
            disabled: !y.value.includes(P),
            ...(N = c == null ? void 0 : c.getCheckboxProps) == null ? void 0 : N.call(c, P)
          };
        }
      }
    }, f = i.childrenColumnName || "children", g = (P, N = 0, se = 1) => {
      const de = [], ee = N === se;
      return P.forEach((ue) => {
        ue[f] && (de.push(m(ue)), ee || de.push(...g(ue[f], N, se + 1)));
      }), de;
    }, O = F(((He = e.attrs) == null ? void 0 : He.expandedRowKeys) || []), C = (P) => {
      O.value = P, o.emit("expandedRowsChange", P);
    };
    (r.defaultExpandLevel || i.defaultExpandAllRows) && z(
      y,
      (P, N) => {
        P.length && !(N != null && N.length) && C(g(P, Number(r.defaultExpandLevel)));
      },
      { immediate: !0 }
    );
    const w = Po({ option: e, model: n, orgList: y, rowKey: m, setRowKey: v, listener: {
      async onSave(P, N) {
        var se;
        if ((se = e.apis) != null && se.save)
          return await e.apis.save(P), P.parentId && (O.value = [...O.value, P.parentId]), t == null ? void 0 : t();
        N !== void 0 ? y.value.splice(N + 1, 0, P) : y.value.push(P);
      },
      async onUpdate(P, N) {
        var de;
        (de = e.apis) != null && de.update && await e.apis.update(P), Object.assign(N, P);
        const se = m(N);
        if (se) {
          const ee = y.value.findIndex((ue) => m(ue) === se);
          ee > -1 && y.value.splice(ee, 1, N);
        }
        return t == null ? void 0 : t();
      },
      async onDelete(P) {
        var se, de;
        const N = P.map((ee) => m(ee));
        try {
          await ((de = (se = e.apis) == null ? void 0 : se.delete) == null ? void 0 : de.call(se, N, P));
        } catch (ee) {
          return console.error(ee), ee;
        }
        return h && (d.value = d.value.filter((ee) => !N.includes(ee)), p.value = p.value.filter((ee) => !N.includes(m(ee)))), P.forEach((ee) => {
          y.value.splice(D.value.indexOf(ee), 1);
        }), t == null ? void 0 : t();
      }
    }, isView: s, effectData: a }), x = Lo({ childrenMap: n.listData.modelsMap, context: w, option: e, attrs: i, isView: s, effectData: a }), { list: D, methods: M, buttonMethods: T = M, modalSlot: R } = w, j = {
      selectedRowKeys: d,
      selectedRows: p,
      setSelectedRows: (P) => {
        p.value = P, d.value = P.map((N) => m(N));
      },
      expandedRowKeys: O,
      setExpandedRowKeys: C,
      expandAll: () => {
        C(g(y.value));
      },
      add: (P) => {
        var N;
        return (N = M.add) == null ? void 0 : N.call(M, P);
      },
      edit: (P) => {
        var N;
        return (N = M.edit) == null ? void 0 : N.call(M, { ...G, ...P });
      },
      delete: () => {
        var P;
        return (P = M.delete) == null ? void 0 : P.call(M, G);
      },
      detail: (P) => {
        var N;
        return (N = M.detail) == null ? void 0 : N.call(M, { ...G, ...P });
      }
    }, B = H({ ...j }), U = F();
    z(
      U,
      (P) => {
        Object.assign(B, P, j), o.emit("register", B);
      },
      { flush: "sync" }
    );
    const G = H({ ...a, selectedRows: p, selectedRowKeys: d, tableRef: B }), E = { ...o.slots }, J = e.buttons, ce = (J == null ? void 0 : J.targetSlot) ?? (J == null ? void 0 : J.forSlot) ?? "extra";
    if (J) {
      const P = E[ce], N = st({
        config: J,
        effectData: G,
        methods: T,
        isView: s
      });
      (P || N) && (E[ce] = () => [P == null ? void 0 : P(), N == null ? void 0 : N()]);
    }
    const L = e.title || e.label, { title: ae = L, extra: le, ...ye } = E, ge = (ae || le) && (() => S(Be, { align: "middle", class: "sup-titlebar" }, () => [
      ae && S(
        xe,
        { class: "sup-title" },
        rt({ labelSlot: ae, tooltip: e.tooltip }, a)
      ),
      le && S(
        xe,
        { class: "sup-title-buttons", flex: 1, style: { textAlign: (J == null ? void 0 : J.align) || "right" } },
        le
      )
    ]));
    ye.headerCell = (P) => {
      var N;
      return ((N = E.headerCell) == null ? void 0 : N.call(E, P)) || re(P.title, a);
    };
    const De = () => [
      ...R.map((P) => P()),
      S(
        W.Table,
        {
          ...oe.Table,
          ref: U,
          dataSource: D.value,
          columns: H(x),
          tableLayout: "fixed",
          pagination: !1,
          ...i,
          rowSelection: h,
          rowKey: m,
          expandedRowKeys: O.value,
          "onUpdate:expandedRowKeys": C,
          class: ["sup-table-wrapper", e.editable && "sup-table-editable"]
        },
        ye
      )
    ];
    return e.tabs ? () => S(Fo, { ...e.tabs, effectData: a }, {
      [ce]: E[ce],
      title: ae && (() => re(ae, a)),
      extra: le,
      titleBar: ge,
      default: De
    }) : () => [ge == null ? void 0 : ge(), De()];
  }
}), Uo = Z({
  props: {
    option: { type: Object, required: !0 },
    model: Object,
    effectData: Object
  },
  setup(e) {
    return () => S(W.Textarea, { style: "width: 100%", allowClear: !0, placeholder: `请输入${e.option.label}` });
  }
}), zo = {
  key: 0,
  class: "sup-title ant-descriptions-header"
}, Ho = /* @__PURE__ */ Z({
  inheritAttrs: !1,
  __name: "Collapse",
  props: {
    option: {},
    model: {},
    effectData: {},
    isView: { type: Boolean }
  },
  setup(e) {
    const { Collapse: n, CollapsePanel: t } = W, a = e, s = a.option.title || a.option.label, r = [...a.model.children].map(([l, i], u) => {
      const b = Me({
        parent: a.effectData,
        current: me(a.model, "parent"),
        field: i.refName,
        value: i.refData
      }), {
        hidden: m,
        attrs: { disabled: v, ...y }
      } = Ae({ option: l, effectData: b }), { key: c, field: d } = l;
      return {
        attrs: H(y),
        option: { ...l, type: "CollapsePanel" },
        effectData: b,
        model: i,
        header: () => re(l.label),
        key: c || d || String(u),
        hidden: m,
        disabled: v
      };
    }), o = F(a.option.activeKey || r[0].key);
    return (l, i) => ($(), pe(Se, null, [
      A(s) ? ($(), pe("div", zo, [
        ($(), Y(we(A(re)(A(s), l.effectData))))
      ])) : _e("", !0),
      fe(A(n), X({
        activeKey: o.value,
        "onUpdate:activeKey": i[0] || (i[0] = (u) => o.value = u)
      }, l.$attrs), {
        default: te(() => [
          ($(!0), pe(Se, null, Fe(A(r), ({ attrs: u, hidden: b, option: m, disabled: v, model: y, header: c, effectData: d, key: p }) => ($(), pe(Se, { key: p }, [
            b.value ? _e("", !0) : ($(), Y(A(t), X({
              key: 0,
              collapsible: A(v) ? "disabled" : void 0
            }, u), Ht({
              header: te(() => [
                ($(), Y(we(c)))
              ]),
              default: te(() => [
                l.isView ? ($(), Y(A(Ue), {
                  key: 0,
                  option: m,
                  modelsMap: y.children,
                  effectData: d
                }, null, 8, ["option", "modelsMap", "effectData"])) : ($(), Y(A(Ne), {
                  key: 1,
                  option: m,
                  model: y,
                  effectData: d
                }, null, 8, ["option", "model", "effectData"]))
              ]),
              _: 2
            }, [
              l.isView ? void 0 : {
                name: "extra",
                fn: te(() => [
                  m.buttons ? ($(), Y(A(Re), {
                    key: 0,
                    option: m.buttons,
                    effectData: d
                  }, null, 8, ["option", "effectData"])) : _e("", !0)
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
}), Yo = Z({
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
    const { option: t, effectData: a, addonAfter: s, enterButton: r, onSearch: o } = e, l = H({
      placeholder: "请输入" + (Rr(t.label) ? t.label : ""),
      disabled: me(e, "disabled")
    });
    if (o) {
      const i = F(!1), { addonAfter: u, ...b } = n;
      let m = n.enterButton || (r ? void 0 : u);
      const v = r || s;
      if (!m)
        if (vt(v)) {
          const { label: y, icon: c, ...d } = r;
          m = () => S(
            W.Button,
            { loading: i.value, ...d },
            { icon: () => ke(c), default: () => re(y) }
          );
        } else
          ze(v) && (m = () => S(W.Button, { type: "primary", loading: i.value }, v));
      return l.onSearch = async (...y) => {
        i.value = !0;
        try {
          await (o == null ? void 0 : o(...y));
        } finally {
          i.value = !1;
        }
      }, m ? () => S(W.InputSearch, l, { ...b, enterButton: m }) : () => S(W.InputSearch, { ...l, enterButton: v }, b);
    } else
      return () => S(W.Input, { ...l, addonAfter: s }, n);
  }
}), Ko = /* @__PURE__ */ Z({
  __name: "InputNumber",
  props: {
    option: {},
    model: {},
    effectData: {}
  },
  setup(e) {
    const { InputNumber: n } = W;
    return (t, a) => ($(), Y(A(n), {
      style: { width: "100%" },
      type: "number",
      placeholder: "请输入" + t.option.label
    }, null, 8, ["placeholder"]));
  }
}), Go = /* @__PURE__ */ Z({
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
    const { Select: t } = W, a = n, s = e, { options: r, labelField: o } = s.option, l = jn(), { optionsRef: i, setOptions: u } = Ge(s.option, s.options, s.effectData);
    let b = s.onChange;
    if (o) {
      const y = ((v = s.fieldNames) == null ? void 0 : v.label) || "label";
      b = (...c) => {
        var p;
        const d = c[1];
        a("update:labelValue", Array.isArray(d) ? d.map((h) => h[y]) : d == null ? void 0 : d[y]), (p = s.onChange) == null || p.call(s, ...c);
      };
    }
    let m = s.onSearch && Nt(s.onSearch, 600, { leading: !1 });
    return l.showSearch && !m && typeof r == "function" && (m = Nt((c) => {
      Promise.resolve(r(s.effectData, c)).then((d) => {
        u(d);
      });
    }, 600, { leading: !1 })), (y, c) => ($(), Y(A(t), {
      "option-filter-prop": "label",
      placeholder: "请选择" + y.option.label,
      options: A(i),
      onChange: A(b),
      onSearch: A(m)
    }, Ht({ _: 2 }, [
      Fe(y.$slots, (d, p) => ({
        name: p,
        fn: te((h) => [
          wa(y.$slots, p, Ot(kt(h || {})))
        ])
      }))
    ]), 1032, ["placeholder", "options", "onChange", "onSearch"]));
  }
}), Wo = Z({
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
    const [t, a] = e.option.valueLabels || [], { optionsRef: s } = Ge(e.option, e.options, e.effectData), r = e.valueToNumber ? 1 : !0, o = e.valueToNumber ? 0 : !1, l = K(() => {
      const [i, u] = s.value;
      return e.firstIsChecked ? {
        checkedChildren: (i == null ? void 0 : i.label) ?? a,
        unCheckedChildren: (u == null ? void 0 : u.label) ?? t,
        checkedValue: (i == null ? void 0 : i.value) ?? r,
        unCheckedValue: (u == null ? void 0 : u.value) ?? o
      } : {
        checkedChildren: (u == null ? void 0 : u.label) ?? a,
        unCheckedChildren: (i == null ? void 0 : i.label) ?? t,
        checkedValue: (u == null ? void 0 : u.value) ?? r,
        unCheckedValue: (i == null ? void 0 : i.value) ?? o
      };
    });
    return z(
      () => [e.value, s.value],
      ([i, u]) => {
        i === void 0 && (!e.options || u.length) && n.emit("update:value", e.defaultChecked ? l.value.checkedValue : l.value.unCheckedValue);
      },
      { immediate: !0 }
    ), () => S(
      W.Switch,
      H({
        ...l.value,
        checked: e.value,
        "onUpdate:checked": (i) => n.emit("update:value", i)
      })
    );
  }
}), Zo = Z({
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
    return () => S(W.RangePicker, { valueFormat: "YYYY-MM-DD", disabledDate: t }, n.slots);
  }
}), Qo = Z({
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
    return () => S(W.DatePicker, { valueFormat: "YYYY-MM-DD", disabledDate: t }, n.slots);
  }
}), Jo = Z({
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
    return () => S(
      W.AutoComplete,
      { placeholder: `请输入${e.option.label}`, options: t.value, filterOption: !0 },
      n.slots
    );
  }
}), Xo = Z({
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
    return e.option.labelField && (r = (o) => {
      var i, u;
      const l = (i = a.value.find((b) => b.value === o.target.value)) == null ? void 0 : i.label;
      t("update:labelValue", l), (u = e.onChange) == null || u.call(e, o);
    }), () => S(
      W.RadioGroup,
      { name: e.option.field, optionType: s, onChange: r },
      () => a.value.map(
        (o) => S(
          s === "button" ? Mn : An,
          { value: o.value, disabled: o.disabled },
          () => re(o.label, e.effectData)
        )
      )
    );
  }
}), el = Z({
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
      var l;
      const o = r.map((i) => {
        var u;
        return (u = t.value.find(({ value: b }) => b == i)) == null ? void 0 : u.label;
      });
      n.emit("update:labelValue", o), (l = e.onChange) == null || l.call(e, r);
    }), () => S(W.CheckboxGroup, { options: t.value, name: e.option.field, onChange: a });
  }
}), tl = Z({
  props: {
    option: { type: Object, required: !0 },
    effectData: { type: Object, required: !0 },
    model: Object,
    onChange: Function
  },
  emits: ["update:labelValue"],
  setup(e, n) {
    const t = F([]), { data: a, treeData: s = a, labelField: r, label: o } = e.option;
    typeof s == "function" ? Pn(() => {
      Promise.resolve(s(e.effectData)).then((i) => {
        t.value = i || [];
      });
    }) : s && z(
      () => A(s),
      (i) => t.value = i,
      { immediate: !0 }
    );
    let l = e.onChange;
    return r && (l = (...i) => {
      var m;
      const [u, b] = i;
      n.emit("update:labelValue", Array.isArray(u) ? b : b[0]), (m = e.onChange) == null || m.call(e, ...i);
    }), () => S(
      W.TreeSelect,
      { allowClear: !0, placeholder: `请选择${o}`, onChange: l, treeData: t.value },
      n.slots
    );
  }
}), nl = /* @__PURE__ */ Z({
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
    return (s, r) => ($(), Y(A(nn).PreviewGroup, {
      style: { display: "none" },
      preview: {
        visible: s.visible,
        onVisibleChange: a,
        current: s.current
      }
    }, {
      default: te(() => [
        ($(!0), pe(Se, null, Fe(s.images, (o, l) => ($(), Y(A(nn), {
          key: l,
          width: s.width,
          src: o,
          height: s.height
        }, null, 8, ["width", "src", "height"]))), 128))
      ]),
      _: 1
    }, 8, ["preview"]));
  }
});
function sl(e) {
  const n = F(!1), t = H({
    visible: n,
    images: [],
    "onUpdate:value": (i) => n.value = i,
    ...e
  }), a = F(!1), s = () => !a.value && S(nl, t), r = Tn();
  Mt(() => {
    a.value = !0;
  });
  let o;
  return { open: (i) => {
    if (typeof i == "string")
      t.images = [i];
    else if (Array.isArray(i))
      t.images = [...i];
    else {
      const { src: u, ...b } = i || {};
      u && (t.images = [u]), Object.assign(t, b);
    }
    if (!o) {
      const u = document.createElement("div");
      o = fe(s, { appContext: r == null ? void 0 : r.appContext }), o.appContext = r == null ? void 0 : r.appContext, Tt(o, u);
    }
    $e(() => n.value = !0);
  } };
}
function al(e, n) {
  return new Promise((t, a) => {
    const s = new FileReader();
    n === "text" ? s.readAsText(e) : s.readAsDataURL(e), s.onload = () => t({ result: s.result, file: e }), s.onerror = (r) => a(r);
  });
}
function rl(e, n, t) {
  const a = typeof t < "u" ? [t, e] : [e], s = new Blob(a, { type: "application/octet-stream" }), r = window.URL.createObjectURL(s), o = document.createElement("a");
  o.style.display = "none", o.href = r, o.setAttribute("download", n), typeof o.download > "u" && o.setAttribute("target", "_blank"), document.body.appendChild(o), o.click(), document.body.removeChild(o), window.URL.revokeObjectURL(r);
}
function ol(e, n) {
  return n.split(",").some((t) => {
    var a;
    return ((a = e.name) == null ? void 0 : a.endsWith(t)) || e.type && new RegExp(`^${t.replace("*", "\\S*")}$`).test(e.type);
  });
}
const ll = ".png,.jpg,.jpeg,.gif,.webp,.svg,.tif,.tiff";
function il(e) {
  var n, t, a, s;
  if (e.thumbUrl)
    return !0;
  if (e.url || e.originFileObj) {
    const r = (t = (n = e.name || e.url) == null ? void 0 : n.match(/[^\\.]*$/)) == null ? void 0 : t[0];
    if (r && ll.includes(r))
      return !0;
    {
      const o = e.type || ((s = (a = e.url) == null ? void 0 : a.match(/^data:(\S*?);/)) == null ? void 0 : s[1]);
      return o == null ? void 0 : o.startsWith("image");
    }
  }
}
function hn(e, n) {
  const t = xt.info({
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
      icon: () => S(va),
      okButtonProps: {
        loading: !1
      },
      type: "error",
      title: s,
      content: r == null ? void 0 : r.message
    });
  }, ...t };
}
const ul = Z({
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
      maxSize: o,
      infoNames: l,
      repeatable: i,
      showUploadList: u,
      onPreview: b,
      onDownload: m,
      isImageUrl: v = il,
      hideOnMax: y,
      valueKey: c
    } = e, d = (s ? 1 : e.maxCount) || 1 / 0, { accept: p, listType: h } = n.attrs, f = sl(), g = {
      ...c && { [c]: c },
      uid: "uid",
      status: "status",
      url: "url",
      name: "name",
      ...l
    };
    t === "custom" && (g.originFileObj = "originFileObj");
    const O = (I) => {
      const k = { status: "done", ...I };
      return Object.entries(g).forEach(([q, V]) => {
        V && V !== q && V in k && (k[q] = k[V], delete k[V]);
      }), k;
    }, C = (I) => {
      const k = {};
      return Object.entries(g).forEach(([q, V]) => {
        const Oe = I[q];
        V && Oe !== void 0 && (k[V] = Oe);
      }), k;
    }, { onSubmit: _ } = Ce("exaProvider", {}), w = F([]), x = ct([]), D = ct(), M = /* @__PURE__ */ new Map(), T = /* @__PURE__ */ new Map(), R = (I) => {
      x.value = I.map(C), e.isView || (n.emit("update:fileList", x.value), j()), w.value = I;
    }, j = () => {
      if (e.isSingle) {
        const I = ne(x.value[0]);
        D.value = c ? (I == null ? void 0 : I[c]) ?? (I == null ? void 0 : I[g.uid]) : I;
      } else
        c ? D.value = x.value.map((I) => I[c] ?? I[g.uid]) : D.value = x.value;
      n.emit("update:value", D.value);
    };
    z(
      () => ne(e.value),
      (I) => {
        if (I !== D.value)
          if (D.value = I, !I)
            w.value = [];
          else {
            const k = ut(I) ? I : [I];
            x.value = c ? k.map((q) => ({ [c]: q })) : k, w.value = x.value.map(O);
          }
      },
      { immediate: !0, flush: "sync" }
    ), z(
      () => ne(e.fileList),
      (I) => {
        if (I && I !== x.value) {
          const k = I.map(O);
          R(k);
        }
      },
      { immediate: !0 }
    );
    const B = F(!1);
    _ == null || _(() => {
      let I = Promise.resolve();
      if (t === "auto")
        for (const k of w.value) {
          if (k.status === "error") {
            const q = k.response || { message: "文件上传错误，请删除后重新上传！" };
            return Promise.reject(q);
          } else
            k.status === "uploading" && (B.value = !0);
          I = Promise.all(M.values());
        }
      else if (t === "submit") {
        const k = [];
        for (const q of w.value) {
          if (q.status !== "done") {
            B.value = !0, q.status = "uploading";
            const V = T.get(q.uid);
            k.push(V());
          }
          I = Promise.all(k);
        }
      }
      if (ae.size && (B.value = !0), B.value) {
        const k = hn(" 文件同步中，请稍候...");
        return I.then(
          (q) => (
            // 文件删除出错不中断提交
            Promise.all([...ae.values()].map((V) => V())).then(() => q).catch((V) => console.error(V)).finally(() => (k == null || k.destroy(), B.value = !1, q))
          )
        ).catch((q) => (B.value = !1, k.setError("文件上传失败", q), !1));
      }
      return I;
    });
    const U = (I, k) => {
      if (e.beforeUpload) {
        const V = e.beforeUpload(I, k);
        if (V !== void 0)
          return V;
      }
      const q = (() => {
        if (d > 1 && x.value.length + k.indexOf(I) >= d)
          return "文件数量最多" + d;
        if (p && !ol(I, p))
          return "请选择正确的文件类型！";
        if (r || o) {
          const V = I.size / 1024 / 1024;
          if (r && r > V)
            return "文件最小需要" + r + "M";
          if (o && o < V)
            return "文件最大不超过" + o + "M";
        }
        if (!i) {
          const V = w.value.find((Oe) => Oe.name === I.name);
          if (V)
            return `文件重复: ${V.name}`;
        }
      })();
      if (q)
        return zt.error(q), In.LIST_IGNORE;
      if (t === "custom") {
        if (u !== !1)
          return !1;
      } else if (d === 1 && w.value.length) {
        const V = w.value[0];
        if (M.delete(V.uid), T.delete(V.uid), V.status === "done" && a.delete) {
          const Oe = { ...x.value[0] };
          ae.set(Oe, () => a.delete(Oe));
        }
      }
    };
    function G({ file: I, fileList: k, event: q }) {
      var V;
      I.status === "removed" ? (M.delete(I.uid), T.delete(I.uid)) : I.status === "uploading" && !q && t !== "auto" && (I.status = "waiting"), (V = e.onChange) == null || V.call(e, { file: I, fileList: k, event: q }), R([...k]);
    }
    const E = (I) => {
      const { file: k } = I;
      if (t === "auto") {
        const q = L(I);
        return M.set(k.uid, q), q;
      } else if (t === "submit")
        T.set(k.uid, () => L(I));
      else if (t === "base64" || t === "text")
        return al(k, t).then(({ result: q }) => ce({ url: q }, k));
    }, J = (I, k) => {
      const q = w.value.find((V) => V.uid === k.uid);
      return Object.assign(q, { error: I, status: "error" }), R([...w.value]), Promise.reject(I);
    }, ce = (I, k) => {
      const q = w.value.find((V) => V.uid === k.uid);
      return Object.assign(q, O(I), { status: "done" }), R([...w.value]), I;
    }, L = (I) => {
      const { file: k, filename: q, onProgress: V, onError: Oe, onSuccess: Ze } = I;
      if (!a.upload)
        return Promise.resolve().then(() => J(Error("Api config error"), k));
      const ot = new FormData();
      ot.append(q, k);
      const ds = (je) => {
        je.total > 0 && (je.percent = je.loaded / je.total * 100), V(je);
      };
      return a.upload(ot, { onUploadProgress: ds }).then(
        (je) => ce(je, k),
        (je) => J(je, k)
      );
    }, ae = /* @__PURE__ */ new Map(), le = async (I) => {
      var q;
      let k = await ((q = e.onRemove) == null ? void 0 : q.call(e, I));
      return k !== !1 && a.delete && I.status === "done" ? new Promise((V) => {
        const Oe = xt.confirm({
          title: "确定删除吗？",
          okText: "确定",
          cancelText: "取消",
          closable: !1,
          maskClosable: !1,
          ...oe.Modal,
          onOk() {
            const Ze = C(I), ot = () => a.delete(Ze);
            if (t === "submit")
              ae.set(
                Ze,
                () => ot()
                // .then(
                //   () => removeFileMap.delete(__file)
                //   // () => updateFileList([...innerFileList.value, __file]) // 删除失败后还原文件
                // )
              ), V(!0);
            else
              return Oe.update({
                okCancel: !1,
                title: "文件删除中……"
              }), ot().then(V, () => (Oe.update({
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
    }, ye = F(!1), ge = m || ((I) => {
      if (a.download && !ye.value) {
        const k = hn("文件下载中，请稍候...");
        a.download(C(I)).then((q) => rl(q, I.name)).then(() => k.destroy()).catch((q) => {
          k.setError("文件下载失败", q);
        }).finally(() => B.value = !1);
      }
    }), De = K(
      () => typeof u == "boolean" ? u : {
        showRemoveIcon: !e.isView && !e.disabled,
        showDownloadIcon: e.isView,
        ...u
      }
    ), We = async (I) => {
      if (b) {
        const k = await b(C(I));
        k && f.open(k);
      } else if (v(I)) {
        let k;
        const q = w.value.filter((V) => v(V)).map((V, Oe) => {
          V === I && (k = Oe);
          const Ze = V.url || V.thumbUrl;
          return !Ze && V.originFileObj && (V.objectUrl = window.URL.createObjectURL(V.originFileObj)), Ze || V.objectUrl;
        });
        f.open({ images: q, current: k });
      }
    }, Le = ({ file: I, listType: k }) => I.status === "waiting" ? S(Kr) : I.status === "uploading" ? S(ba) : S(ga), He = e.title, P = typeof e.title == "string" ? e.title : "上传文件", N = H({ ...ne(e.effectData), fileList: w }), se = ze(He) && (() => He(N)), de = [];
    p && de.push("支持文件格式：" + p), o && de.push("单个文件不超过" + o + "MB");
    const ee = e.tip ?? de.join(", "), ue = { ...n.slots };
    h === "picture-card" ? ue.default = () => {
      var I, k;
      return ((k = (I = n.slots).default) == null ? void 0 : k.call(I, N)) || S("div", [S(_t), se ? se() : S("div", { style: "margin-top:8px" }, P)]);
    } : ue.default = () => {
      var I, k;
      return [
        ((k = (I = n.slots).default) == null ? void 0 : k.call(I, N)) || S(W.Button, {}, () => [S(Qr), se ? se() : P]),
        ee && S("div", { class: "sup-upload-tip" }, ee)
      ];
    };
    const Ie = K(() => e.disabled || e.isView), cs = K(() => y && d && w.value.length >= d);
    return () => Ie.value && w.value.length === 0 ? S("div", { class: "sup-upload-tip" }, "暂无附件") : S(
      W.Upload,
      {
        class: { "upload-disabled": Ie.value },
        customRequest: E,
        beforeUpload: U,
        fileList: w.value,
        onChange: G,
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
        default: () => Ie.value || (cs.value ? null : ue.default())
      }
    );
  }
}), cl = /* @__PURE__ */ Z({
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
    const { Input: t, Tooltip: a, Tag: s } = W, r = e, o = n, l = F(), i = F(""), u = F(!1), b = (p, h) => typeof r.closable == "function" ? r.closable(p, h) : r.closable, m = K(() => r.value ? typeof r.value == "string" ? r.value.split(",") : r.value : []), v = () => {
      u.value = !0, $e(() => {
        l.value.focus();
      });
    }, y = (p) => {
      const h = m.value.filter((f) => f !== p);
      c(h);
    }, c = (p) => {
      r.stringifyValue || r.valueToString ? o("update:value", p.join(",")) : o("update:value", p);
    }, d = () => {
      i.value && m.value.indexOf(i.value) === -1 && c([...m.value, i.value]), u.value = !1, i.value = "";
    };
    return (p, h) => ($(), pe(Se, null, [
      ($(!0), pe(Se, null, Fe(m.value, (f, g) => ($(), pe(Se, { key: f }, [
        f.length > 20 ? ($(), Y(A(a), {
          key: 0,
          title: f
        }, {
          default: te(() => [
            fe(A(s), X({
              closable: b(f, g),
              onClose: (O) => y(f)
            }, p.$attrs), {
              default: te(() => [
                Pt(wt(`${f.slice(0, 20)}...`), 1)
              ]),
              _: 2
            }, 1040, ["closable", "onClose"])
          ]),
          _: 2
        }, 1032, ["title"])) : ($(), Y(A(s), X({
          key: 1,
          closable: b(f, g),
          onClose: (O) => y(f)
        }, p.$attrs), {
          default: te(() => [
            Pt(wt(f), 1)
          ]),
          _: 2
        }, 1040, ["closable", "onClose"]))
      ], 64))), 128)),
      u.value ? ($(), Y(A(t), {
        key: 0,
        ref_key: "inputRef",
        ref: l,
        value: i.value,
        "onUpdate:value": h[0] || (h[0] = (f) => i.value = f),
        type: "text",
        size: "small",
        style: { width: "78px" },
        onBlur: d
      }, null, 8, ["value"])) : ($(), Y(A(s), {
        key: 1,
        style: { background: "#fff", "border-style": "dashed" },
        onClick: v
      }, {
        default: te(() => [
          fe(A(_t)),
          ($(), Y(we(() => A(re)(p.newLabel, p.effectData))))
        ]),
        _: 1
      }))
    ], 64));
  }
}), dl = {
  key: 1,
  class: "ant-form-item-extra"
}, fl = /* @__PURE__ */ Z({
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
    const { CheckableTag: t } = W, a = e, s = n, { optionsRef: r } = Ge(a.option, a.options, a.effectData), o = K(() => {
      const { value: u } = a, b = a.stringifyValue || a.valueToString;
      return u === void 0 ? [] : b ? u.split(",") : Array.isArray(u) ? u : [u];
    }), l = (u, b) => {
      const m = a.multiple ? b ? [...o.value, u] : o.value.filter((v) => v !== u) : [u];
      s("check", u, b), i(m), s("change", u, m);
    }, i = (u) => {
      a.multiple ? a.stringifyValue || a.valueToString ? s("update:value", u.join(",")) : s("update:value", u) : s("update:value", u[0]);
    };
    return (u, b) => A(r).length ? ($(!0), pe(Se, { key: 0 }, Fe(A(r), ({ label: m, value: v }) => ($(), Y(A(t), X(u.$attrs, {
      class: "tag-select",
      key: v,
      checked: o.value.indexOf(v) > -1,
      onChange: (y) => l(v, y)
    }), {
      default: te(() => [
        Pt(wt(m), 1)
      ]),
      _: 2
    }, 1040, ["checked", "onChange"]))), 128)) : ($(), pe("div", dl, wt(u.placeholder), 1));
  }
}), rs = {
  Form: yo,
  Group: jt,
  Card: wo,
  List: Co,
  ListGroup: xo,
  Tabs: _o,
  Table: qo,
  Collapse: Ho,
  Descriptions: jt,
  Fragment: jt
}, os = {
  Textarea: Uo,
  Input: Yo,
  InputNumber: Ko,
  InputGroup: So,
  InputList: Oo,
  AutoComplete: Jo,
  Select: Go,
  Switch: Wo,
  DateRange: Zo,
  TimeRange: W.TimeRangePicker,
  DatePicker: Qo,
  TimePicker: W.TimePicker,
  Radio: Xo,
  Checkbox: el,
  TreeSelect: tl,
  Upload: ul,
  TagInput: cl,
  TagSelect: fl
}, gt = Object.keys(rs), pl = Object.keys(os), ls = { ...os, ...rs };
function ml(e, n) {
  const t = `Ext${e}`;
  ls[t] = (a) => S(n, a);
}
const be = ls, ie = {
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
}, bl = async (e, n = {}) => {
  const { locale: t, components: a, defaultProps: s, ...r } = n;
  e.provide("localeData", { locale: t, exist: !0 }), Object.assign(ie, r), a && bo(a), s && us(s);
};
function is(e, n) {
  ml(e, n);
}
function gl(e, n) {
  is(e, n);
}
function us(e) {
  It(oe, e);
}
const Rl = {
  install: bl,
  registerComponent: is,
  registComponent: gl,
  setDefaultProps: us
};
const vl = (e) => {
  var n, t;
  return ((t = (n = ie.tableApiSetting) == null ? void 0 : n.resultTransform) == null ? void 0 : t.call(n, e)) || e;
}, hl = (e) => {
  const { currentField: n, sizeField: t } = ie.tableApiSetting || {};
  return n || t ? {
    [n || "current"]: e.current,
    [t || "size"]: e.size
  } : e;
};
function yl(e, n) {
  const t = H({}), a = F(!1);
  let s = {}, r = 0, o;
  const l = [], i = (g) => l.push(g);
  e.onLoaded && l.push(e.onLoaded);
  const u = async (g) => {
    var D, M, T;
    const O = it({}, hl(t), s, g), C = ((D = e.beforeQuery) == null ? void 0 : D.call(e, O)) || O, _ = (M = e.apis) == null ? void 0 : M.query;
    o == null || o.abort();
    const w = ++r;
    if (!_) {
      o = void 0, a.value = !1;
      return;
    }
    const x = new AbortController();
    o = x, a.value = !0;
    try {
      const R = await _(C, { signal: x.signal });
      if (w !== r || x.signal.aborted)
        return;
      const j = ((T = e.afterQuery) == null ? void 0 : T.call(e, R)) || R;
      return b(vl(j));
    } finally {
      w === r && (o = void 0, a.value = !1);
    }
  }, b = (g) => (Array.isArray(g) ? (n(g), f.value !== !1 && (t.current = 1, f.value = { ...f.value, total: g.length })) : g != null && g.records && (n(g.records), f.value !== !1 && (t.current = g.current, t.size = g.size, f.value = { ...f.value, total: g.total })), Promise.all(l.map((O) => O(g)))), m = (g, O = t.size) => (t.current = g, t.size = O, u()), v = (g) => (f.value && (t.current = 1), u(g)), y = Nt(v, 300, { leading: !1 }), c = () => {
    o == null || o.abort(), o = void 0, r += 1, a.value = !1;
  }, d = {}, p = (g, O) => {
    O === "dynamic" ? s = it({}, d, g) : (Object.assign(d, g), it(s, g));
  }, h = () => s, f = F(!1);
  return z(
    () => {
      var g;
      return e.pagination ?? ((g = e.attrs) == null ? void 0 : g.pagination);
    },
    (g) => {
      if (g === !1) {
        f.value = !1;
        return;
      }
      Object.assign(t, { size: (g == null ? void 0 : g.pageSize) || 10, current: (g == null ? void 0 : g.current) || 1 }), f.value = X(
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
  ), z(t, (g) => {
    f.value && (f.value = { ...f.value, pageSize: g.size, current: g.current });
  }), {
    goPage: m,
    reload: u,
    throttleRequest: y,
    cancelQuery: c,
    setQueryParams: p,
    getQueryParams: h,
    query: v,
    pagination: f,
    setPageData: b,
    onLoaded: i,
    loading: a
  };
}
function Sl(e, n, t) {
  var f;
  const { columns: a, searchForm: s } = e, r = s || e.searchSchema || {}, o = F(), l = r.dataSource || H({}), { buttons: i = {}, searchOnChange: u, limit: b, ...m } = r, v = F(!1), y = [];
  r.subItems.forEach((g) => {
    if (typeof g == "string") {
      const O = a.find((C) => C.field === g);
      O && y.push({ type: "Input", ...ha(O, "span", "disabled", "hidden"), editable: !0, exclude: [] });
    } else
      return y.push({ ...g });
  }), b && y.length > b && y.forEach((g, O) => {
    if (O >= b) {
      const C = g.hidden;
      g.hidden = (..._) => !v.value || (C == null ? void 0 : C(..._));
    }
  });
  const c = {
    search() {
      var g;
      t(l), (g = r.onSubmit) == null || g.call(r, ne(l));
    },
    reset(g) {
      o.value.resetFields(g);
    }
  }, d = Array.isArray(i) ? { actions: i } : { ...i };
  d.actions ?? (d.actions = u ? void 0 : ["search", "reset"]), (f = d.actions) != null && f.length && (b && y.length > b && (d.actions = [
    {
      label: () => v.value ? ["收起 ", S(ya)] : ["展开 ", S(Dn)],
      attrs: { type: "link" },
      onClick: () => v.value = !v.value
    },
    ...d.actions
  ]), y.push({
    type: "InfoSlot",
    align: "right",
    span: "auto",
    render: () => S(Re, {
      option: d,
      methods: c,
      effectData: Me({ table: n, form: o })
    })
  }));
  const p = z(o, () => {
    t(l), u && z(l, t), p();
  });
  return { formNode: () => S(be.Form, {
    option: {
      ...m,
      ignoreRules: !0,
      dataSource: l,
      subItems: y
    },
    ref: o,
    onSubmit: c.search,
    onReset: c.search
  }), formRef: o, ...c, dataSource: l };
}
function Ol(e) {
  return !e || !e.getBoundingClientRect ? 0 : e.getBoundingClientRect();
}
function yn(e) {
  const n = document.documentElement, t = n.scrollLeft, a = n.scrollTop, s = n.clientLeft, r = n.clientTop, o = window.pageXOffset, l = window.pageYOffset, i = Ol(e), { left: u, top: b, width: m, height: v } = i, y = (o || t) - (s || 0), c = (l || a) - (r || 0), d = u + o, p = b + l, h = d - y, f = p - c, g = window.document.documentElement.clientWidth, O = window.document.documentElement.clientHeight;
  return {
    left: h,
    top: f,
    right: g - m - h,
    bottom: O - v - f,
    rightIncludeBody: g - h,
    bottomIncludeBody: O - f
  };
}
function wl(e, n, t, a) {
  const s = Cn(i, 100), r = F({});
  let o = !1;
  const l = () => {
    var v;
    o = !0, a ? window.addEventListener("resize", s, { signal: a.signal }) : document.addEventListener("redoHeight", s), r.value = (v = e.attrs) == null ? void 0 : v.scroll, z(
      () => {
        var y;
        return [t.value, (y = A(n)) == null ? void 0 : y.length];
      },
      () => {
        s();
      },
      { flush: "post" }
    );
    const m = z(
      t,
      (y) => {
        y && (y.style.overflow = "hidden", new ResizeObserver(() => {
          s();
        }).observe(y), m());
      },
      { immediate: !0, flush: "post" }
    );
  };
  Mt(() => {
    o && document.removeEventListener("redoHeight", s);
  });
  function i() {
    o && $e(() => {
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
    var E;
    const { maxHeight: m, inheritHeight: v, isFixedHeight: y, resizeHeightOffset: c } = e, d = A(t);
    if (!d)
      return;
    const p = d.querySelector(".ant-table");
    if (!p)
      return;
    await $e();
    const h = getComputedStyle(d.parentElement), f = yn(p), g = yn(d), O = f.left - g.left, C = (parseInt(h.marginBottom) || 0) + (parseInt(h.paddingBottom) || 0);
    let _ = 0;
    d && v ? _ = g.bottomIncludeBody - g.bottom - (f.top - g.top) : _ = f.bottomIncludeBody - C;
    const w = p.querySelector(".ant-table-title"), x = (w == null ? void 0 : w.parentElement) === p ? w.offsetHeight ?? 0 : 0, D = p.querySelector(".ant-table-thead ");
    if (!D)
      return;
    let M = 0;
    D && (M = D.offsetHeight);
    let T = 0;
    const R = p.querySelector(".ant-table-footer");
    R && R.parentElement === p && (T += R.offsetHeight || 0);
    let j = 0;
    const B = d.querySelector(".ant-pagination");
    B && (j = B.offsetHeight + 16);
    let U = Math.ceil(_) - (c || 0) - O - j;
    const G = m || U - T - x - M - 1;
    if (m && y && (U = m + T + x + M + 1), y) {
      p.style.height = `${U}px`, p.style["overflow-y"] = "hidden", v || (d.style.height = "unset");
      const J = d.querySelector(".ant-table-wrapper");
      if (J.style.height = "", J.style["overflow-y"] = void 0, !(((E = A(n)) == null ? void 0 : E.length) > 0)) {
        if (p.querySelector(".ant-empty")) {
          const L = p.querySelector(".ant-table-tbody .ant-table-cell");
          L.style.height = `${G}px`;
        }
        return;
      }
    }
    if (p.scrollHeight > U)
      u(G);
    else {
      const J = p.querySelector(".ant-table-body");
      J && u(J.scrollHeight <= G ? null : G);
    }
  }
  return { getScrollRef: r, redoHeight: i, debounceRedoHeight: s, listenResize: l };
}
const Cl = Z({
  name: "SuperTable",
  inheritAttrs: !1,
  props: {
    dataSource: Array,
    schema: Object
  },
  emits: ["register", "load", "update:dataSource"],
  setup(e, n) {
    const { style: t, class: a, ...s } = n.attrs, r = At({ attrs: s }), o = F([]), l = F(), i = (L) => {
      o.value = L, n.emit("update:dataSource", L), tt(r.dataSource) && (r.dataSource.value = L);
    };
    Ye(() => e.dataSource && i(e.dataSource)), Ye(() => r.dataSource && i(A(r.dataSource)));
    const u = F(), b = (L) => {
      ie.schemaDiagnostics && mt(L, "table", "SuperTable");
      const { isScanHeight: ae, inheritHeight: le, isFixedHeight: ye, isContainer: ge, ...De } = X(
        oe.Table,
        { ...L.attrs },
        { ...r.attrs }
      );
      Object.assign(r, { isScanHeight: ae, inheritHeight: le, isFixedHeight: ye, isContainer: ge }, L, { attrs: De });
    };
    Ye(() => e.schema && b(ne(e.schema)));
    const {
      loading: m,
      pagination: v,
      setPageData: y,
      onLoaded: c,
      goPage: d,
      reload: p,
      query: h,
      throttleRequest: f,
      cancelQuery: g,
      setQueryParams: O,
      getQueryParams: C
    } = yl(r, i), { getScrollRef: _, redoHeight: w, listenResize: x } = wl(r, o, l), D = ct(), M = {
      setOption: b,
      setData: (L) => {
        L && i(L);
      },
      redoHeight: w,
      goPage: d,
      reload: p,
      query: h,
      onLoaded: c,
      resetSearchForm(L) {
        try {
          return u.value.formRef.resetFields(L);
        } catch (ae) {
          console.warn(ae);
        }
      },
      setPageData: y,
      getQueryParams: C,
      getData: () => o.value,
      dataRef: o,
      searchForm: K(() => {
        var L;
        return (L = u.value) == null ? void 0 : L.formRef;
      }),
      validate: async () => {
        var L;
        return (L = D.value) == null ? void 0 : L.validate();
      },
      setColumns: (L) => {
        var ae;
        !E && !((ae = r.columns) != null && ae.length) ? Object.assign(r, { columns: L }) : (Object.assign(r, { columns: L }), ce(L));
      }
    }, T = F({ ...M }), R = (L) => {
      Object.assign(T.value, Pe(L), M), n.emit("register", T.value);
    };
    n.emit("register", T.value), n.expose(T.value);
    const j = H({
      reload: p,
      onRegister: R,
      loading: m
    });
    Mt(() => {
      g(), n.emit("register", null);
    }), Ee("rootSlots", n.slots);
    const B = F({}), U = F(), G = H({ formData: o, current: o, queryParams: K(C) });
    let E = !1;
    const J = z(
      r,
      (L) => {
        var se, de;
        if (!((se = L == null ? void 0 : L.columns) != null && se.length))
          return;
        if (U.value) {
          J();
          return;
        }
        const { columns: ae, maxHeight: le, isScanHeight: ye = !0, inheritHeight: ge } = L, De = H({
          refData: o,
          listData: nt(ae)
        });
        B.value = at(r.slots, G, n.slots);
        const We = L.searchForm || L.searchSchema, {
          attrs: { onLoad: Le, ...He }
        } = Ae({ option: L, effectData: G });
        Object.assign(j, He, { pagination: v }), c((ee) => {
          n.emit("load", ee), Le == null || Le(ee);
        }), We && (u.value = Sl(L, T, (ee) => {
          O(ee, "form"), E && f();
        }));
        const P = L.tabs && L.tabs.field;
        if (L.tabs && P) {
          const ee = (de = L.tabs).activeKey ?? (de.activeKey = F(L.tabs.defaultActiveKey)), ue = {};
          z(
            ee,
            (Ie) => {
              Ie !== void 0 && (dt(ue, P, Ie), O(ue), E && f());
            },
            { immediate: !0 }
          );
        }
        if (z(
          F(L.params),
          (ee) => {
            O(ee, "dynamic"), E && f();
          },
          { deep: !0, immediate: !0 }
        ), $e(() => {
          E = !0, r.immediate !== !1 && f();
        }), ye || ge || le) {
          x(), j.scroll = _;
          const { onChange: ee, onExpandedRowsChange: ue } = j;
          j.onChange = (...Ie) => {
            ee == null || ee(...Ie);
          }, j.onExpandedRowsChange = (Ie) => {
            ue == null || ue(Ie), w();
          }, z(o, w);
        }
        const N = () => S(be.Table, { option: r, effectData: G, model: De, ...j }, B.value);
        r.editable ? U.value = () => S(W.Form, { model: o.value, ref: D }, N) : U.value = N;
      },
      {
        immediate: !0
      }
    ), ce = (L) => {
      const ae = H({
        refData: o,
        listData: nt(L)
      }), le = () => S(be.Table, { option: r, effectData: G, model: ae, key: Symbol(), ...j }, B.value);
      r.editable ? U.value = () => S(W.Form, { model: o.value, ref: D }, le) : U.value = le;
    };
    return () => U.value && S(
      Qt,
      { name: "exaProvider", data: { data: o } },
      () => {
        var L, ae;
        return !u.value || (L = r.searchForm) != null && L.teleport ? S(
          "div",
          X(
            {
              ref: l,
              class: [r.isContainer && "sup-container", "sup-table", "sup-form-section"]
            },
            {
              class: a,
              style: t
            }
          ),
          [
            ((ae = r.searchForm) == null ? void 0 : ae.teleport) && S(
              Ca,
              { to: r.searchForm.teleport },
              S("div", { class: "sup-form-section sup-table-search" }, S(u.value.formNode))
            ),
            U.value()
          ]
        ) : S(
          "div",
          X(
            { ref: l, class: [r.isContainer && "sup-container", "sup-table"] },
            { class: a, style: t }
          ),
          [
            S("div", { class: "sup-form-section sup-table-search" }, S(u.value.formNode)),
            S("div", { class: "sup-form-section section-last" }, S(U.value))
          ]
        );
      }
    );
  }
}), jl = (e, n) => {
  const [t, a] = ts(), s = Promise.resolve(typeof e == "function" ? e() : e), r = (l) => {
    if (l)
      t.value || (s.then(l.setOption), n && l.setData(n)), t.value = l;
    else if (l === null)
      t.value = void 0;
    else
      return (i, u) => S(Cl, { ...i, onRegister: r }, u == null ? void 0 : u.slots);
  }, o = async (l, i) => {
    const u = await a();
    if (l && l in u)
      return typeof u[l] == "function" ? u[l](i) : u[l];
  };
  return [
    r,
    {
      /** 异步获取表格引用 */
      getTable: a,
      tableRef: t,
      redoHeight() {
        o("redoHeight");
      },
      setData(l) {
        o("setPageData", l);
      },
      /** 返回当前表格数据 */
      getData() {
        var l;
        return ve((l = t.value) == null ? void 0 : l.dataRef);
      },
      dataSource: K(() => {
        var l;
        return (l = t.value) == null ? void 0 : l.dataRef;
      }),
      /** 跳转到指定页 */
      goPage(l) {
        var i;
        (i = t.value) == null || i.goPage(l);
      },
      /** 设置表格列 */
      setColumns(l) {
        o("setColumns", l);
      },
      /** 刷新数据，不改动查询条件与当前页 */
      reload() {
        var l;
        return (l = t.value) == null ? void 0 : l.reload();
      },
      /** 手动执行条件查询，不覆盖搜索表单参数 */
      query(l) {
        var i;
        return (i = t.value) == null ? void 0 : i.query(l);
      },
      /** 查询完成，返回结果回调 */
      onLoaded(l) {
        o("onLoaded", l);
      },
      /** 重置查询表单，并重新查询 */
      resetSearchForm(l) {
        var i;
        (i = t.value) == null || i.resetSearchForm(l);
      },
      getQueryParams: () => {
        var l;
        return (l = t.value) == null ? void 0 : l.getQueryParams();
      },
      // setQueryParams: (params: Obj) => asyncCall('setQueryParams', params),
      selectedRowKeys: K(() => {
        var l;
        return (l = t.value) == null ? void 0 : l.selectedRowKeys;
      }),
      selectedRows: K(() => {
        var l;
        return (l = t.value) == null ? void 0 : l.selectedRows;
      }),
      /** 设置选中行 */
      setSelectedRows: (l) => {
        var i;
        return (i = t.value) == null ? void 0 : i.setSelectedRows(l);
      },
      expandedRowKeys: K(() => {
        var l;
        return (l = t.value) == null ? void 0 : l.expandedRowKeys;
      }),
      setExpandedRowKeys: (l) => {
        var i;
        return (i = t.value) == null ? void 0 : i.setExpandedRowKeys(l);
      },
      expandAll() {
        o("expandAll");
      },
      /** 新增行 */
      add: (l) => {
        var i;
        return (i = t.value) == null ? void 0 : i.add(l);
      },
      /** 修改行，须判断是否已有选中行 */
      edit: (l) => {
        var i;
        return (i = t.value) == null ? void 0 : i.edit(l);
      },
      /** 删除行，须判断是否已有选中行 */
      delete: () => {
        var l;
        return (l = t.value) == null ? void 0 : l.delete();
      },
      /** 查看详情，须判断是否已有选中行 */
      detail: (l) => {
        var i;
        return (i = t.value) == null ? void 0 : i.detail(l);
      },
      asyncCall: o,
      /** `editable`模式下进行表单校验 */
      validate() {
        return o("validate");
      }
    }
  ];
};
function kl(e) {
  return e;
}
const xl = Z({
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
    var o;
    const t = (o = n.default) == null ? void 0 : o.call(n), { effectData: a, ...s } = e, r = t ? t.flatMap(({ children: l, props: i = {} }) => {
      const { roleName: u, onClick: b, confirmText: m, tooltip: v, disabledTooltip: y, icon: c, ...d } = jr(
        i,
        (p, h) => Or(h)
      );
      return !b || !l ? [] : {
        label: l.default || l,
        icon: c,
        tooltip: v,
        disabledTooltip: y,
        roleName: u,
        onClick: b,
        confirmText: m,
        attrs: d
      };
    }) : e.actions;
    return () => S(Re, { option: { ...s, actions: r }, effectData: a });
  }
});
function Tl(e) {
  return [() => S(xl, e)];
}
const Dl = Z({
  props: {
    dataSource: Object,
    schema: Object
  },
  emits: ["register"],
  setup(e, n) {
    var o;
    const t = ct(e.schema || {});
    ie.schemaDiagnostics && e.schema && mt(e.schema, "detail", "SuperDetail");
    const a = F(((o = e.schema) == null ? void 0 : o.dataSource) || {});
    z(
      () => e.dataSource,
      (l) => {
        l && (a.value = l);
      },
      { immediate: !0 }
    );
    const s = {
      setOption: (l) => {
        ie.schemaDiagnostics && mt(l, "detail", "SuperDetail"), t.value = l, l.dataSource && (a.value = l.dataSource);
      },
      setData: (l) => {
        a.value = l;
      }
    }, r = F();
    return z(
      t,
      (l) => {
        if (!(l != null && l.subItems))
          return;
        const i = nt(l.subItems, a);
        r.value = i.modelsMap;
      },
      { immediate: !0 }
    ), n.expose(s), n.emit("register", s), Ee("exaProvider", Rn({ data: a })), Ee("rootSlots", n.slots), () => r.value && S(
      "div",
      { class: ["sup-detail", t.value.isContainer && "sup-container"] },
      S(Ue, {
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
function Pl(e, n) {
  const t = me(n), a = F(), s = Promise.resolve(typeof e == "function" ? e() : e), r = (o) => {
    if (o)
      a.value || (s.then(o.setOption), t.value && z(
        t,
        (l) => {
          o.setData(l);
        },
        { immediate: !0 }
      )), a.value = o;
    else
      return (l) => S(Dl, { ...l, onRegister: r }, xa());
  };
  return [
    r,
    {
      setData(o) {
        a.value ? a.value.setData(o) : t.value = o;
      }
    }
  ];
}
function Fl(e) {
  return e;
}
export {
  xl as SuperButtons,
  Dl as SuperDetail,
  Ao as SuperForm,
  Cl as SuperTable,
  ss as createModal,
  Rl as default,
  Fl as defineDetail,
  Ml as defineForm,
  kl as defineTable,
  io as diagnoseSchema,
  Tl as useButtons,
  Pl as useDetail,
  Mo as useForm,
  as as useModal,
  Il as useModalForm,
  jl as useTable
};
