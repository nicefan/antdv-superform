import { requireDayjs_min as ns, commonjsGlobal as rs, Row as da, Col as fa, Tabs as pa, collapse_default as as, InternalTable as os, card_default as va, TabPane as ss, Divider as ls, Dropdown as ma, button_default as kn, Menu as ba, SubMenu as is, MenuItem as ga, Space as ha, InternalTooltip as ya, Upload as lr, form_default as us, InternalFormItem as cs, SpaceCompact as ds, Tag as fs, CheckableTag as ps, Empty as vs, useConfig as ms, ConfigProvider as bs, Modal as xn, Image as ir, staticMethods as gs, CompoundedInput as hs, InternalTextArea as ys, InputNumber as ws, InputOTP as _s, InputPassword as Ss, InputSearch as Cs, AutoComplete as xs, Cascader as As, color_picker_default as Os, Select as Ts, radio_default as $s, RadioGroup as Is, checkbox_default as Ms, CheckboxGroup as Ps, DatePicker as Ds, DateRangePicker as Rs, DateMonthPicker as Es, DateQuarterPicker as js, DateWeekPicker as Fs, DateYearPicker as Ls, TimePicker as ks, TimeRangePicker as Ns, TreeSelect as Us, Switch as Bs, Rate as Vs, Mentions as qs, Segmented as zs, Slider as Hs, InternalTransfer as Gs } from "./antd.js";
import { defineComponent as J, reactive as k, provide as Ke, h as S, toRef as le, inject as we, mergeProps as ee, unref as Q, toRefs as Ye, toRaw as ne, computed as N, watch as z, shallowRef as ke, ref as L, shallowReactive as Wt, onMounted as wa, toValue as se, getCurrentInstance as _a, onUnmounted as Nn, isRef as et, onScopeDispose as ur, markRaw as Ks, watchEffect as He, openBlock as Ee, createBlock as pt, resolveDynamicComponent as Ot, readonly as Sa, onBeforeUnmount as Ca, nextTick as Ne, render as An, createVNode as xa, createElementBlock as Zt, Fragment as On, renderList as Aa, toDisplayString as Ys, Teleport as Ws, useSlots as Zs } from "vue";
var Qs = { exports: {} };
(function(e, t) {
  (function(n, r) {
    e.exports = r(ns());
  })(rs, function(n) {
    function r(s) {
      return s && typeof s == "object" && "default" in s ? s : { default: s };
    }
    var a = r(n), o = { name: "zh-cn", weekdays: "星期日_星期一_星期二_星期三_星期四_星期五_星期六".split("_"), weekdaysShort: "周日_周一_周二_周三_周四_周五_周六".split("_"), weekdaysMin: "日_一_二_三_四_五_六".split("_"), months: "一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月".split("_"), monthsShort: "1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月".split("_"), ordinal: function(s, l) {
      return l === "W" ? s + "周" : s + "日";
    }, weekStart: 1, yearStart: 4, formats: { LT: "HH:mm", LTS: "HH:mm:ss", L: "YYYY/MM/DD", LL: "YYYY年M月D日", LLL: "YYYY年M月D日Ah点mm分", LLLL: "YYYY年M月D日ddddAh点mm分", l: "YYYY/M/D", ll: "YYYY年M月D日", lll: "YYYY年M月D日 HH:mm", llll: "YYYY年M月D日dddd HH:mm" }, relativeTime: { future: "%s内", past: "%s前", s: "几秒", m: "1 分钟", mm: "%d 分钟", h: "1 小时", hh: "%d 小时", d: "1 天", dd: "%d 天", M: "1 个月", MM: "%d 个月", y: "1 年", yy: "%d 年" }, meridiem: function(s, l) {
      var i = 100 * s + l;
      return i < 600 ? "凌晨" : i < 900 ? "早上" : i < 1100 ? "上午" : i < 1300 ? "中午" : i < 1800 ? "下午" : "晚上";
    } };
    return a.default.locale(o, null, !0), o;
  });
})(Qs);
var Js = typeof global == "object" && global && global.Object === Object && global;
const Oa = Js;
var Xs = typeof self == "object" && self && self.Object === Object && self, el = Oa || Xs || Function("return this")();
const Me = el;
var tl = Me.Symbol;
const xe = tl;
var Ta = Object.prototype, nl = Ta.hasOwnProperty, rl = Ta.toString, xt = xe ? xe.toStringTag : void 0;
function al(e) {
  var t = nl.call(e, xt), n = e[xt];
  try {
    e[xt] = void 0;
    var r = !0;
  } catch {
  }
  var a = rl.call(e);
  return r && (t ? e[xt] = n : delete e[xt]), a;
}
var ol = Object.prototype, sl = ol.toString;
function ll(e) {
  return sl.call(e);
}
var il = "[object Null]", ul = "[object Undefined]", cr = xe ? xe.toStringTag : void 0;
function Qe(e) {
  return e == null ? e === void 0 ? ul : il : cr && cr in Object(e) ? al(e) : ll(e);
}
function Te(e) {
  return e != null && typeof e == "object";
}
var cl = "[object Symbol]";
function tn(e) {
  return typeof e == "symbol" || Te(e) && Qe(e) == cl;
}
function $a(e, t) {
  for (var n = -1, r = e == null ? 0 : e.length, a = Array(r); ++n < r; )
    a[n] = t(e[n], n, e);
  return a;
}
var dl = Array.isArray;
const he = dl;
var fl = 1 / 0, dr = xe ? xe.prototype : void 0, fr = dr ? dr.toString : void 0;
function Ia(e) {
  if (typeof e == "string")
    return e;
  if (he(e))
    return $a(e, Ia) + "";
  if (tn(e))
    return fr ? fr.call(e) : "";
  var t = e + "";
  return t == "0" && 1 / e == -fl ? "-0" : t;
}
var pl = /\s/;
function vl(e) {
  for (var t = e.length; t-- && pl.test(e.charAt(t)); )
    ;
  return t;
}
var ml = /^\s+/;
function bl(e) {
  return e && e.slice(0, vl(e) + 1).replace(ml, "");
}
function ve(e) {
  var t = typeof e;
  return e != null && (t == "object" || t == "function");
}
var pr = 0 / 0, gl = /^[-+]0x[0-9a-f]+$/i, hl = /^0b[01]+$/i, yl = /^0o[0-7]+$/i, wl = parseInt;
function vr(e) {
  if (typeof e == "number")
    return e;
  if (tn(e))
    return pr;
  if (ve(e)) {
    var t = typeof e.valueOf == "function" ? e.valueOf() : e;
    e = ve(t) ? t + "" : t;
  }
  if (typeof e != "string")
    return e === 0 ? e : +e;
  e = bl(e);
  var n = hl.test(e);
  return n || yl.test(e) ? wl(e.slice(2), n ? 2 : 8) : gl.test(e) ? pr : +e;
}
function nn(e) {
  return e;
}
var _l = "[object AsyncFunction]", Sl = "[object Function]", Cl = "[object GeneratorFunction]", xl = "[object Proxy]";
function Be(e) {
  if (!ve(e))
    return !1;
  var t = Qe(e);
  return t == Sl || t == Cl || t == _l || t == xl;
}
var Al = Me["__core-js_shared__"];
const gn = Al;
var mr = function() {
  var e = /[^.]+$/.exec(gn && gn.keys && gn.keys.IE_PROTO || "");
  return e ? "Symbol(src)_1." + e : "";
}();
function Ol(e) {
  return !!mr && mr in e;
}
var Tl = Function.prototype, $l = Tl.toString;
function st(e) {
  if (e != null) {
    try {
      return $l.call(e);
    } catch {
    }
    try {
      return e + "";
    } catch {
    }
  }
  return "";
}
var Il = /[\\^$.*+?()[\]{}|]/g, Ml = /^\[object .+?Constructor\]$/, Pl = Function.prototype, Dl = Object.prototype, Rl = Pl.toString, El = Dl.hasOwnProperty, jl = RegExp(
  "^" + Rl.call(El).replace(Il, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
);
function Fl(e) {
  if (!ve(e) || Ol(e))
    return !1;
  var t = Be(e) ? jl : Ml;
  return t.test(st(e));
}
function Ll(e, t) {
  return e == null ? void 0 : e[t];
}
function lt(e, t) {
  var n = Ll(e, t);
  return Fl(n) ? n : void 0;
}
var kl = lt(Me, "WeakMap");
const Tn = kl;
var br = Object.create, Nl = function() {
  function e() {
  }
  return function(t) {
    if (!ve(t))
      return {};
    if (br)
      return br(t);
    e.prototype = t;
    var n = new e();
    return e.prototype = void 0, n;
  };
}();
const Ul = Nl;
function Bl(e, t, n) {
  switch (n.length) {
    case 0:
      return e.call(t);
    case 1:
      return e.call(t, n[0]);
    case 2:
      return e.call(t, n[0], n[1]);
    case 3:
      return e.call(t, n[0], n[1], n[2]);
  }
  return e.apply(t, n);
}
function Vl() {
}
function Ma(e, t) {
  var n = -1, r = e.length;
  for (t || (t = Array(r)); ++n < r; )
    t[n] = e[n];
  return t;
}
var ql = 800, zl = 16, Hl = Date.now;
function Gl(e) {
  var t = 0, n = 0;
  return function() {
    var r = Hl(), a = zl - (r - n);
    if (n = r, a > 0) {
      if (++t >= ql)
        return arguments[0];
    } else
      t = 0;
    return e.apply(void 0, arguments);
  };
}
function Kl(e) {
  return function() {
    return e;
  };
}
var Yl = function() {
  try {
    var e = lt(Object, "defineProperty");
    return e({}, "", {}), e;
  } catch {
  }
}();
const Qt = Yl;
var Wl = Qt ? function(e, t) {
  return Qt(e, "toString", {
    configurable: !0,
    enumerable: !1,
    value: Kl(t),
    writable: !0
  });
} : nn;
const Zl = Wl;
var Ql = Gl(Zl);
const Pa = Ql;
function Jl(e, t) {
  for (var n = -1, r = e == null ? 0 : e.length; ++n < r && t(e[n], n, e) !== !1; )
    ;
  return e;
}
function Xl(e, t, n, r) {
  for (var a = e.length, o = n + (r ? 1 : -1); r ? o-- : ++o < a; )
    if (t(e[o], o, e))
      return o;
  return -1;
}
function ei(e) {
  return e !== e;
}
function ti(e, t, n) {
  for (var r = n - 1, a = e.length; ++r < a; )
    if (e[r] === t)
      return r;
  return -1;
}
function ni(e, t, n) {
  return t === t ? ti(e, t, n) : Xl(e, ei, n);
}
function ri(e, t) {
  var n = e == null ? 0 : e.length;
  return !!n && ni(e, t, 0) > -1;
}
var ai = 9007199254740991, oi = /^(?:0|[1-9]\d*)$/;
function rn(e, t) {
  var n = typeof e;
  return t = t ?? ai, !!t && (n == "number" || n != "symbol" && oi.test(e)) && e > -1 && e % 1 == 0 && e < t;
}
function an(e, t, n) {
  t == "__proto__" && Qt ? Qt(e, t, {
    configurable: !0,
    enumerable: !0,
    value: n,
    writable: !0
  }) : e[t] = n;
}
function yt(e, t) {
  return e === t || e !== e && t !== t;
}
var si = Object.prototype, li = si.hasOwnProperty;
function Un(e, t, n) {
  var r = e[t];
  (!(li.call(e, t) && yt(r, n)) || n === void 0 && !(t in e)) && an(e, t, n);
}
function wt(e, t, n, r) {
  var a = !n;
  n || (n = {});
  for (var o = -1, s = t.length; ++o < s; ) {
    var l = t[o], i = r ? r(n[l], e[l], l, n, e) : void 0;
    i === void 0 && (i = e[l]), a ? an(n, l, i) : Un(n, l, i);
  }
  return n;
}
var gr = Math.max;
function Da(e, t, n) {
  return t = gr(t === void 0 ? e.length - 1 : t, 0), function() {
    for (var r = arguments, a = -1, o = gr(r.length - t, 0), s = Array(o); ++a < o; )
      s[a] = r[t + a];
    a = -1;
    for (var l = Array(t + 1); ++a < t; )
      l[a] = r[a];
    return l[t] = n(s), Bl(e, this, l);
  };
}
function Ra(e, t) {
  return Pa(Da(e, t, nn), e + "");
}
var ii = 9007199254740991;
function Bn(e) {
  return typeof e == "number" && e > -1 && e % 1 == 0 && e <= ii;
}
function on(e) {
  return e != null && Bn(e.length) && !Be(e);
}
function Ea(e, t, n) {
  if (!ve(n))
    return !1;
  var r = typeof t;
  return (r == "number" ? on(n) && rn(t, n.length) : r == "string" && t in n) ? yt(n[t], e) : !1;
}
function ja(e) {
  return Ra(function(t, n) {
    var r = -1, a = n.length, o = a > 1 ? n[a - 1] : void 0, s = a > 2 ? n[2] : void 0;
    for (o = e.length > 3 && typeof o == "function" ? (a--, o) : void 0, s && Ea(n[0], n[1], s) && (o = a < 3 ? void 0 : o, a = 1), t = Object(t); ++r < a; ) {
      var l = n[r];
      l && e(t, l, r, o);
    }
    return t;
  });
}
var ui = Object.prototype;
function Vn(e) {
  var t = e && e.constructor, n = typeof t == "function" && t.prototype || ui;
  return e === n;
}
function ci(e, t) {
  for (var n = -1, r = Array(e); ++n < e; )
    r[n] = t(n);
  return r;
}
var di = "[object Arguments]";
function hr(e) {
  return Te(e) && Qe(e) == di;
}
var Fa = Object.prototype, fi = Fa.hasOwnProperty, pi = Fa.propertyIsEnumerable, vi = hr(function() {
  return arguments;
}()) ? hr : function(e) {
  return Te(e) && fi.call(e, "callee") && !pi.call(e, "callee");
};
const Pt = vi;
function mi() {
  return !1;
}
var La = typeof exports == "object" && exports && !exports.nodeType && exports, yr = La && typeof module == "object" && module && !module.nodeType && module, bi = yr && yr.exports === La, wr = bi ? Me.Buffer : void 0, gi = wr ? wr.isBuffer : void 0, hi = gi || mi;
const Dt = hi;
var yi = "[object Arguments]", wi = "[object Array]", _i = "[object Boolean]", Si = "[object Date]", Ci = "[object Error]", xi = "[object Function]", Ai = "[object Map]", Oi = "[object Number]", Ti = "[object Object]", $i = "[object RegExp]", Ii = "[object Set]", Mi = "[object String]", Pi = "[object WeakMap]", Di = "[object ArrayBuffer]", Ri = "[object DataView]", Ei = "[object Float32Array]", ji = "[object Float64Array]", Fi = "[object Int8Array]", Li = "[object Int16Array]", ki = "[object Int32Array]", Ni = "[object Uint8Array]", Ui = "[object Uint8ClampedArray]", Bi = "[object Uint16Array]", Vi = "[object Uint32Array]", re = {};
re[Ei] = re[ji] = re[Fi] = re[Li] = re[ki] = re[Ni] = re[Ui] = re[Bi] = re[Vi] = !0;
re[yi] = re[wi] = re[Di] = re[_i] = re[Ri] = re[Si] = re[Ci] = re[xi] = re[Ai] = re[Oi] = re[Ti] = re[$i] = re[Ii] = re[Mi] = re[Pi] = !1;
function qi(e) {
  return Te(e) && Bn(e.length) && !!re[Qe(e)];
}
function qn(e) {
  return function(t) {
    return e(t);
  };
}
var ka = typeof exports == "object" && exports && !exports.nodeType && exports, Tt = ka && typeof module == "object" && module && !module.nodeType && module, zi = Tt && Tt.exports === ka, hn = zi && Oa.process, Hi = function() {
  try {
    var e = Tt && Tt.require && Tt.require("util").types;
    return e || hn && hn.binding && hn.binding("util");
  } catch {
  }
}();
const bt = Hi;
var _r = bt && bt.isTypedArray, Gi = _r ? qn(_r) : qi;
const zn = Gi;
var Ki = Object.prototype, Yi = Ki.hasOwnProperty;
function Na(e, t) {
  var n = he(e), r = !n && Pt(e), a = !n && !r && Dt(e), o = !n && !r && !a && zn(e), s = n || r || a || o, l = s ? ci(e.length, String) : [], i = l.length;
  for (var p in e)
    (t || Yi.call(e, p)) && !(s && // Safari 9 has enumerable `arguments.length` in strict mode.
    (p == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
    a && (p == "offset" || p == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
    o && (p == "buffer" || p == "byteLength" || p == "byteOffset") || // Skip index properties.
    rn(p, i))) && l.push(p);
  return l;
}
function Ua(e, t) {
  return function(n) {
    return e(t(n));
  };
}
var Wi = Ua(Object.keys, Object);
const Zi = Wi;
var Qi = Object.prototype, Ji = Qi.hasOwnProperty;
function Xi(e) {
  if (!Vn(e))
    return Zi(e);
  var t = [];
  for (var n in Object(e))
    Ji.call(e, n) && n != "constructor" && t.push(n);
  return t;
}
function Vt(e) {
  return on(e) ? Na(e) : Xi(e);
}
function eu(e) {
  var t = [];
  if (e != null)
    for (var n in Object(e))
      t.push(n);
  return t;
}
var tu = Object.prototype, nu = tu.hasOwnProperty;
function ru(e) {
  if (!ve(e))
    return eu(e);
  var t = Vn(e), n = [];
  for (var r in e)
    r == "constructor" && (t || !nu.call(e, r)) || n.push(r);
  return n;
}
function _t(e) {
  return on(e) ? Na(e, !0) : ru(e);
}
var au = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, ou = /^\w*$/;
function Hn(e, t) {
  if (he(e))
    return !1;
  var n = typeof e;
  return n == "number" || n == "symbol" || n == "boolean" || e == null || tn(e) ? !0 : ou.test(e) || !au.test(e) || t != null && e in Object(t);
}
var su = lt(Object, "create");
const Rt = su;
function lu() {
  this.__data__ = Rt ? Rt(null) : {}, this.size = 0;
}
function iu(e) {
  var t = this.has(e) && delete this.__data__[e];
  return this.size -= t ? 1 : 0, t;
}
var uu = "__lodash_hash_undefined__", cu = Object.prototype, du = cu.hasOwnProperty;
function fu(e) {
  var t = this.__data__;
  if (Rt) {
    var n = t[e];
    return n === uu ? void 0 : n;
  }
  return du.call(t, e) ? t[e] : void 0;
}
var pu = Object.prototype, vu = pu.hasOwnProperty;
function mu(e) {
  var t = this.__data__;
  return Rt ? t[e] !== void 0 : vu.call(t, e);
}
var bu = "__lodash_hash_undefined__";
function gu(e, t) {
  var n = this.__data__;
  return this.size += this.has(e) ? 0 : 1, n[e] = Rt && t === void 0 ? bu : t, this;
}
function tt(e) {
  var t = -1, n = e == null ? 0 : e.length;
  for (this.clear(); ++t < n; ) {
    var r = e[t];
    this.set(r[0], r[1]);
  }
}
tt.prototype.clear = lu;
tt.prototype.delete = iu;
tt.prototype.get = fu;
tt.prototype.has = mu;
tt.prototype.set = gu;
function hu() {
  this.__data__ = [], this.size = 0;
}
function sn(e, t) {
  for (var n = e.length; n--; )
    if (yt(e[n][0], t))
      return n;
  return -1;
}
var yu = Array.prototype, wu = yu.splice;
function _u(e) {
  var t = this.__data__, n = sn(t, e);
  if (n < 0)
    return !1;
  var r = t.length - 1;
  return n == r ? t.pop() : wu.call(t, n, 1), --this.size, !0;
}
function Su(e) {
  var t = this.__data__, n = sn(t, e);
  return n < 0 ? void 0 : t[n][1];
}
function Cu(e) {
  return sn(this.__data__, e) > -1;
}
function xu(e, t) {
  var n = this.__data__, r = sn(n, e);
  return r < 0 ? (++this.size, n.push([e, t])) : n[r][1] = t, this;
}
function Ve(e) {
  var t = -1, n = e == null ? 0 : e.length;
  for (this.clear(); ++t < n; ) {
    var r = e[t];
    this.set(r[0], r[1]);
  }
}
Ve.prototype.clear = hu;
Ve.prototype.delete = _u;
Ve.prototype.get = Su;
Ve.prototype.has = Cu;
Ve.prototype.set = xu;
var Au = lt(Me, "Map");
const Et = Au;
function Ou() {
  this.size = 0, this.__data__ = {
    hash: new tt(),
    map: new (Et || Ve)(),
    string: new tt()
  };
}
function Tu(e) {
  var t = typeof e;
  return t == "string" || t == "number" || t == "symbol" || t == "boolean" ? e !== "__proto__" : e === null;
}
function ln(e, t) {
  var n = e.__data__;
  return Tu(t) ? n[typeof t == "string" ? "string" : "hash"] : n.map;
}
function $u(e) {
  var t = ln(this, e).delete(e);
  return this.size -= t ? 1 : 0, t;
}
function Iu(e) {
  return ln(this, e).get(e);
}
function Mu(e) {
  return ln(this, e).has(e);
}
function Pu(e, t) {
  var n = ln(this, e), r = n.size;
  return n.set(e, t), this.size += n.size == r ? 0 : 1, this;
}
function qe(e) {
  var t = -1, n = e == null ? 0 : e.length;
  for (this.clear(); ++t < n; ) {
    var r = e[t];
    this.set(r[0], r[1]);
  }
}
qe.prototype.clear = Ou;
qe.prototype.delete = $u;
qe.prototype.get = Iu;
qe.prototype.has = Mu;
qe.prototype.set = Pu;
var Du = "Expected a function";
function Gn(e, t) {
  if (typeof e != "function" || t != null && typeof t != "function")
    throw new TypeError(Du);
  var n = function() {
    var r = arguments, a = t ? t.apply(this, r) : r[0], o = n.cache;
    if (o.has(a))
      return o.get(a);
    var s = e.apply(this, r);
    return n.cache = o.set(a, s) || o, s;
  };
  return n.cache = new (Gn.Cache || qe)(), n;
}
Gn.Cache = qe;
var Ru = 500;
function Eu(e) {
  var t = Gn(e, function(r) {
    return n.size === Ru && n.clear(), r;
  }), n = t.cache;
  return t;
}
var ju = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, Fu = /\\(\\)?/g, Lu = Eu(function(e) {
  var t = [];
  return e.charCodeAt(0) === 46 && t.push(""), e.replace(ju, function(n, r, a, o) {
    t.push(a ? o.replace(Fu, "$1") : r || n);
  }), t;
});
const ku = Lu;
function qt(e) {
  return e == null ? "" : Ia(e);
}
function zt(e, t) {
  return he(e) ? e : Hn(e, t) ? [e] : ku(qt(e));
}
var Nu = 1 / 0;
function nt(e) {
  if (typeof e == "string" || tn(e))
    return e;
  var t = e + "";
  return t == "0" && 1 / e == -Nu ? "-0" : t;
}
function un(e, t) {
  t = zt(t, e);
  for (var n = 0, r = t.length; e != null && n < r; )
    e = e[nt(t[n++])];
  return n && n == r ? e : void 0;
}
function $e(e, t, n) {
  var r = e == null ? void 0 : un(e, t);
  return r === void 0 ? n : r;
}
function Kn(e, t) {
  for (var n = -1, r = t.length, a = e.length; ++n < r; )
    e[a + n] = t[n];
  return e;
}
var Sr = xe ? xe.isConcatSpreadable : void 0;
function Uu(e) {
  return he(e) || Pt(e) || !!(Sr && e && e[Sr]);
}
function Ba(e, t, n, r, a) {
  var o = -1, s = e.length;
  for (n || (n = Uu), a || (a = []); ++o < s; ) {
    var l = e[o];
    t > 0 && n(l) ? t > 1 ? Ba(l, t - 1, n, r, a) : Kn(a, l) : r || (a[a.length] = l);
  }
  return a;
}
function Bu(e) {
  var t = e == null ? 0 : e.length;
  return t ? Ba(e, 1) : [];
}
function Vu(e) {
  return Pa(Da(e, void 0, Bu), e + "");
}
var qu = Ua(Object.getPrototypeOf, Object);
const Yn = qu;
var zu = "[object Object]", Hu = Function.prototype, Gu = Object.prototype, Va = Hu.toString, Ku = Gu.hasOwnProperty, Yu = Va.call(Object);
function je(e) {
  if (!Te(e) || Qe(e) != zu)
    return !1;
  var t = Yn(e);
  if (t === null)
    return !0;
  var n = Ku.call(t, "constructor") && t.constructor;
  return typeof n == "function" && n instanceof n && Va.call(n) == Yu;
}
function qa(e, t, n) {
  var r = -1, a = e.length;
  t < 0 && (t = -t > a ? 0 : a + t), n = n > a ? a : n, n < 0 && (n += a), a = t > n ? 0 : n - t >>> 0, t >>>= 0;
  for (var o = Array(a); ++r < a; )
    o[r] = e[r + t];
  return o;
}
function Wu(e, t, n) {
  var r = e.length;
  return n = n === void 0 ? r : n, !t && n >= r ? e : qa(e, t, n);
}
var Zu = "\\ud800-\\udfff", Qu = "\\u0300-\\u036f", Ju = "\\ufe20-\\ufe2f", Xu = "\\u20d0-\\u20ff", ec = Qu + Ju + Xu, tc = "\\ufe0e\\ufe0f", nc = "\\u200d", rc = RegExp("[" + nc + Zu + ec + tc + "]");
function za(e) {
  return rc.test(e);
}
function ac(e) {
  return e.split("");
}
var Ha = "\\ud800-\\udfff", oc = "\\u0300-\\u036f", sc = "\\ufe20-\\ufe2f", lc = "\\u20d0-\\u20ff", ic = oc + sc + lc, uc = "\\ufe0e\\ufe0f", cc = "[" + Ha + "]", $n = "[" + ic + "]", In = "\\ud83c[\\udffb-\\udfff]", dc = "(?:" + $n + "|" + In + ")", Ga = "[^" + Ha + "]", Ka = "(?:\\ud83c[\\udde6-\\uddff]){2}", Ya = "[\\ud800-\\udbff][\\udc00-\\udfff]", fc = "\\u200d", Wa = dc + "?", Za = "[" + uc + "]?", pc = "(?:" + fc + "(?:" + [Ga, Ka, Ya].join("|") + ")" + Za + Wa + ")*", vc = Za + Wa + pc, mc = "(?:" + [Ga + $n + "?", $n, Ka, Ya, cc].join("|") + ")", bc = RegExp(In + "(?=" + In + ")|" + mc + vc, "g");
function gc(e) {
  return e.match(bc) || [];
}
function hc(e) {
  return za(e) ? gc(e) : ac(e);
}
function yc(e) {
  return function(t) {
    t = qt(t);
    var n = za(t) ? hc(t) : void 0, r = n ? n[0] : t.charAt(0), a = n ? Wu(n, 1).join("") : t.slice(1);
    return r[e]() + a;
  };
}
var wc = yc("toUpperCase");
const _c = wc;
function Sc(e) {
  return _c(qt(e).toLowerCase());
}
function Cc(e, t, n, r) {
  var a = -1, o = e == null ? 0 : e.length;
  for (r && o && (n = e[++a]); ++a < o; )
    n = t(n, e[a], a, e);
  return n;
}
function xc(e) {
  return function(t) {
    return e == null ? void 0 : e[t];
  };
}
var Ac = {
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
}, Oc = xc(Ac);
const Tc = Oc;
var $c = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g, Ic = "\\u0300-\\u036f", Mc = "\\ufe20-\\ufe2f", Pc = "\\u20d0-\\u20ff", Dc = Ic + Mc + Pc, Rc = "[" + Dc + "]", Ec = RegExp(Rc, "g");
function jc(e) {
  return e = qt(e), e && e.replace($c, Tc).replace(Ec, "");
}
var Fc = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g;
function Lc(e) {
  return e.match(Fc) || [];
}
var kc = /[a-z][A-Z]|[A-Z]{2}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/;
function Nc(e) {
  return kc.test(e);
}
var Qa = "\\ud800-\\udfff", Uc = "\\u0300-\\u036f", Bc = "\\ufe20-\\ufe2f", Vc = "\\u20d0-\\u20ff", qc = Uc + Bc + Vc, Ja = "\\u2700-\\u27bf", Xa = "a-z\\xdf-\\xf6\\xf8-\\xff", zc = "\\xac\\xb1\\xd7\\xf7", Hc = "\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf", Gc = "\\u2000-\\u206f", Kc = " \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000", eo = "A-Z\\xc0-\\xd6\\xd8-\\xde", Yc = "\\ufe0e\\ufe0f", to = zc + Hc + Gc + Kc, no = "['’]", Cr = "[" + to + "]", Wc = "[" + qc + "]", ro = "\\d+", Zc = "[" + Ja + "]", ao = "[" + Xa + "]", oo = "[^" + Qa + to + ro + Ja + Xa + eo + "]", Qc = "\\ud83c[\\udffb-\\udfff]", Jc = "(?:" + Wc + "|" + Qc + ")", Xc = "[^" + Qa + "]", so = "(?:\\ud83c[\\udde6-\\uddff]){2}", lo = "[\\ud800-\\udbff][\\udc00-\\udfff]", ut = "[" + eo + "]", ed = "\\u200d", xr = "(?:" + ao + "|" + oo + ")", td = "(?:" + ut + "|" + oo + ")", Ar = "(?:" + no + "(?:d|ll|m|re|s|t|ve))?", Or = "(?:" + no + "(?:D|LL|M|RE|S|T|VE))?", io = Jc + "?", uo = "[" + Yc + "]?", nd = "(?:" + ed + "(?:" + [Xc, so, lo].join("|") + ")" + uo + io + ")*", rd = "\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])", ad = "\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])", od = uo + io + nd, sd = "(?:" + [Zc, so, lo].join("|") + ")" + od, ld = RegExp([
  ut + "?" + ao + "+" + Ar + "(?=" + [Cr, ut, "$"].join("|") + ")",
  td + "+" + Or + "(?=" + [Cr, ut + xr, "$"].join("|") + ")",
  ut + "?" + xr + "+" + Ar,
  ut + "+" + Or,
  ad,
  rd,
  ro,
  sd
].join("|"), "g");
function id(e) {
  return e.match(ld) || [];
}
function ud(e, t, n) {
  return e = qt(e), t = n ? void 0 : t, t === void 0 ? Nc(e) ? id(e) : Lc(e) : e.match(t) || [];
}
var cd = "['’]", dd = RegExp(cd, "g");
function fd(e) {
  return function(t) {
    return Cc(ud(jc(t).replace(dd, "")), e, "");
  };
}
var pd = fd(function(e, t, n) {
  return t = t.toLowerCase(), e + (n ? Sc(t) : t);
});
const vd = pd;
function md() {
  this.__data__ = new Ve(), this.size = 0;
}
function bd(e) {
  var t = this.__data__, n = t.delete(e);
  return this.size = t.size, n;
}
function gd(e) {
  return this.__data__.get(e);
}
function hd(e) {
  return this.__data__.has(e);
}
var yd = 200;
function wd(e, t) {
  var n = this.__data__;
  if (n instanceof Ve) {
    var r = n.__data__;
    if (!Et || r.length < yd - 1)
      return r.push([e, t]), this.size = ++n.size, this;
    n = this.__data__ = new qe(r);
  }
  return n.set(e, t), this.size = n.size, this;
}
function Oe(e) {
  var t = this.__data__ = new Ve(e);
  this.size = t.size;
}
Oe.prototype.clear = md;
Oe.prototype.delete = bd;
Oe.prototype.get = gd;
Oe.prototype.has = hd;
Oe.prototype.set = wd;
function _d(e, t) {
  return e && wt(t, Vt(t), e);
}
function Sd(e, t) {
  return e && wt(t, _t(t), e);
}
var co = typeof exports == "object" && exports && !exports.nodeType && exports, Tr = co && typeof module == "object" && module && !module.nodeType && module, Cd = Tr && Tr.exports === co, $r = Cd ? Me.Buffer : void 0, Ir = $r ? $r.allocUnsafe : void 0;
function fo(e, t) {
  if (t)
    return e.slice();
  var n = e.length, r = Ir ? Ir(n) : new e.constructor(n);
  return e.copy(r), r;
}
function xd(e, t) {
  for (var n = -1, r = e == null ? 0 : e.length, a = 0, o = []; ++n < r; ) {
    var s = e[n];
    t(s, n, e) && (o[a++] = s);
  }
  return o;
}
function po() {
  return [];
}
var Ad = Object.prototype, Od = Ad.propertyIsEnumerable, Mr = Object.getOwnPropertySymbols, Td = Mr ? function(e) {
  return e == null ? [] : (e = Object(e), xd(Mr(e), function(t) {
    return Od.call(e, t);
  }));
} : po;
const Wn = Td;
function $d(e, t) {
  return wt(e, Wn(e), t);
}
var Id = Object.getOwnPropertySymbols, Md = Id ? function(e) {
  for (var t = []; e; )
    Kn(t, Wn(e)), e = Yn(e);
  return t;
} : po;
const vo = Md;
function Pd(e, t) {
  return wt(e, vo(e), t);
}
function mo(e, t, n) {
  var r = t(e);
  return he(e) ? r : Kn(r, n(e));
}
function Mn(e) {
  return mo(e, Vt, Wn);
}
function bo(e) {
  return mo(e, _t, vo);
}
var Dd = lt(Me, "DataView");
const Pn = Dd;
var Rd = lt(Me, "Promise");
const Dn = Rd;
var Ed = lt(Me, "Set");
const vt = Ed;
var Pr = "[object Map]", jd = "[object Object]", Dr = "[object Promise]", Rr = "[object Set]", Er = "[object WeakMap]", jr = "[object DataView]", Fd = st(Pn), Ld = st(Et), kd = st(Dn), Nd = st(vt), Ud = st(Tn), Xe = Qe;
(Pn && Xe(new Pn(new ArrayBuffer(1))) != jr || Et && Xe(new Et()) != Pr || Dn && Xe(Dn.resolve()) != Dr || vt && Xe(new vt()) != Rr || Tn && Xe(new Tn()) != Er) && (Xe = function(e) {
  var t = Qe(e), n = t == jd ? e.constructor : void 0, r = n ? st(n) : "";
  if (r)
    switch (r) {
      case Fd:
        return jr;
      case Ld:
        return Pr;
      case kd:
        return Dr;
      case Nd:
        return Rr;
      case Ud:
        return Er;
    }
  return t;
});
const jt = Xe;
var Bd = Object.prototype, Vd = Bd.hasOwnProperty;
function qd(e) {
  var t = e.length, n = new e.constructor(t);
  return t && typeof e[0] == "string" && Vd.call(e, "index") && (n.index = e.index, n.input = e.input), n;
}
var zd = Me.Uint8Array;
const Jt = zd;
function Zn(e) {
  var t = new e.constructor(e.byteLength);
  return new Jt(t).set(new Jt(e)), t;
}
function Hd(e, t) {
  var n = t ? Zn(e.buffer) : e.buffer;
  return new e.constructor(n, e.byteOffset, e.byteLength);
}
var Gd = /\w*$/;
function Kd(e) {
  var t = new e.constructor(e.source, Gd.exec(e));
  return t.lastIndex = e.lastIndex, t;
}
var Fr = xe ? xe.prototype : void 0, Lr = Fr ? Fr.valueOf : void 0;
function Yd(e) {
  return Lr ? Object(Lr.call(e)) : {};
}
function go(e, t) {
  var n = t ? Zn(e.buffer) : e.buffer;
  return new e.constructor(n, e.byteOffset, e.length);
}
var Wd = "[object Boolean]", Zd = "[object Date]", Qd = "[object Map]", Jd = "[object Number]", Xd = "[object RegExp]", ef = "[object Set]", tf = "[object String]", nf = "[object Symbol]", rf = "[object ArrayBuffer]", af = "[object DataView]", of = "[object Float32Array]", sf = "[object Float64Array]", lf = "[object Int8Array]", uf = "[object Int16Array]", cf = "[object Int32Array]", df = "[object Uint8Array]", ff = "[object Uint8ClampedArray]", pf = "[object Uint16Array]", vf = "[object Uint32Array]";
function mf(e, t, n) {
  var r = e.constructor;
  switch (t) {
    case rf:
      return Zn(e);
    case Wd:
    case Zd:
      return new r(+e);
    case af:
      return Hd(e, n);
    case of:
    case sf:
    case lf:
    case uf:
    case cf:
    case df:
    case ff:
    case pf:
    case vf:
      return go(e, n);
    case Qd:
      return new r();
    case Jd:
    case tf:
      return new r(e);
    case Xd:
      return Kd(e);
    case ef:
      return new r();
    case nf:
      return Yd(e);
  }
}
function ho(e) {
  return typeof e.constructor == "function" && !Vn(e) ? Ul(Yn(e)) : {};
}
var bf = "[object Map]";
function gf(e) {
  return Te(e) && jt(e) == bf;
}
var kr = bt && bt.isMap, hf = kr ? qn(kr) : gf;
const yf = hf;
var wf = "[object Set]";
function _f(e) {
  return Te(e) && jt(e) == wf;
}
var Nr = bt && bt.isSet, Sf = Nr ? qn(Nr) : _f;
const Cf = Sf;
var xf = 1, Af = 2, Of = 4, yo = "[object Arguments]", Tf = "[object Array]", $f = "[object Boolean]", If = "[object Date]", Mf = "[object Error]", wo = "[object Function]", Pf = "[object GeneratorFunction]", Df = "[object Map]", Rf = "[object Number]", _o = "[object Object]", Ef = "[object RegExp]", jf = "[object Set]", Ff = "[object String]", Lf = "[object Symbol]", kf = "[object WeakMap]", Nf = "[object ArrayBuffer]", Uf = "[object DataView]", Bf = "[object Float32Array]", Vf = "[object Float64Array]", qf = "[object Int8Array]", zf = "[object Int16Array]", Hf = "[object Int32Array]", Gf = "[object Uint8Array]", Kf = "[object Uint8ClampedArray]", Yf = "[object Uint16Array]", Wf = "[object Uint32Array]", te = {};
te[yo] = te[Tf] = te[Nf] = te[Uf] = te[$f] = te[If] = te[Bf] = te[Vf] = te[qf] = te[zf] = te[Hf] = te[Df] = te[Rf] = te[_o] = te[Ef] = te[jf] = te[Ff] = te[Lf] = te[Gf] = te[Kf] = te[Yf] = te[Wf] = !0;
te[Mf] = te[wo] = te[kf] = !1;
function $t(e, t, n, r, a, o) {
  var s, l = t & xf, i = t & Af, p = t & Of;
  if (n && (s = a ? n(e, r, a, o) : n(e)), s !== void 0)
    return s;
  if (!ve(e))
    return e;
  var c = he(e);
  if (c) {
    if (s = qd(e), !l)
      return Ma(e, s);
  } else {
    var v = jt(e), b = v == wo || v == Pf;
    if (Dt(e))
      return fo(e, l);
    if (v == _o || v == yo || b && !a) {
      if (s = i || b ? {} : ho(e), !l)
        return i ? Pd(e, Sd(s, e)) : $d(e, _d(s, e));
    } else {
      if (!te[v])
        return a ? e : {};
      s = mf(e, v, l);
    }
  }
  o || (o = new Oe());
  var g = o.get(e);
  if (g)
    return g;
  o.set(e, s), Cf(e) ? e.forEach(function(d) {
    s.add($t(d, t, n, d, e, o));
  }) : yf(e) && e.forEach(function(d, m) {
    s.set(m, $t(d, t, n, m, e, o));
  });
  var h = p ? i ? bo : Mn : i ? _t : Vt, _ = c ? void 0 : h(e);
  return Jl(_ || e, function(d, m) {
    _ && (m = d, d = e[m]), Un(s, m, $t(d, t, n, m, e, o));
  }), s;
}
var Zf = 1, Qf = 4;
function Ge(e) {
  return $t(e, Zf | Qf);
}
var Jf = "__lodash_hash_undefined__";
function Xf(e) {
  return this.__data__.set(e, Jf), this;
}
function ep(e) {
  return this.__data__.has(e);
}
function Ft(e) {
  var t = -1, n = e == null ? 0 : e.length;
  for (this.__data__ = new qe(); ++t < n; )
    this.add(e[t]);
}
Ft.prototype.add = Ft.prototype.push = Xf;
Ft.prototype.has = ep;
function tp(e, t) {
  for (var n = -1, r = e == null ? 0 : e.length; ++n < r; )
    if (t(e[n], n, e))
      return !0;
  return !1;
}
function So(e, t) {
  return e.has(t);
}
var np = 1, rp = 2;
function Co(e, t, n, r, a, o) {
  var s = n & np, l = e.length, i = t.length;
  if (l != i && !(s && i > l))
    return !1;
  var p = o.get(e), c = o.get(t);
  if (p && c)
    return p == t && c == e;
  var v = -1, b = !0, g = n & rp ? new Ft() : void 0;
  for (o.set(e, t), o.set(t, e); ++v < l; ) {
    var h = e[v], _ = t[v];
    if (r)
      var d = s ? r(_, h, v, t, e, o) : r(h, _, v, e, t, o);
    if (d !== void 0) {
      if (d)
        continue;
      b = !1;
      break;
    }
    if (g) {
      if (!tp(t, function(m, u) {
        if (!So(g, u) && (h === m || a(h, m, n, r, o)))
          return g.push(u);
      })) {
        b = !1;
        break;
      }
    } else if (!(h === _ || a(h, _, n, r, o))) {
      b = !1;
      break;
    }
  }
  return o.delete(e), o.delete(t), b;
}
function ap(e) {
  var t = -1, n = Array(e.size);
  return e.forEach(function(r, a) {
    n[++t] = [a, r];
  }), n;
}
function Qn(e) {
  var t = -1, n = Array(e.size);
  return e.forEach(function(r) {
    n[++t] = r;
  }), n;
}
var op = 1, sp = 2, lp = "[object Boolean]", ip = "[object Date]", up = "[object Error]", cp = "[object Map]", dp = "[object Number]", fp = "[object RegExp]", pp = "[object Set]", vp = "[object String]", mp = "[object Symbol]", bp = "[object ArrayBuffer]", gp = "[object DataView]", Ur = xe ? xe.prototype : void 0, yn = Ur ? Ur.valueOf : void 0;
function hp(e, t, n, r, a, o, s) {
  switch (n) {
    case gp:
      if (e.byteLength != t.byteLength || e.byteOffset != t.byteOffset)
        return !1;
      e = e.buffer, t = t.buffer;
    case bp:
      return !(e.byteLength != t.byteLength || !o(new Jt(e), new Jt(t)));
    case lp:
    case ip:
    case dp:
      return yt(+e, +t);
    case up:
      return e.name == t.name && e.message == t.message;
    case fp:
    case vp:
      return e == t + "";
    case cp:
      var l = ap;
    case pp:
      var i = r & op;
      if (l || (l = Qn), e.size != t.size && !i)
        return !1;
      var p = s.get(e);
      if (p)
        return p == t;
      r |= sp, s.set(e, t);
      var c = Co(l(e), l(t), r, a, o, s);
      return s.delete(e), c;
    case mp:
      if (yn)
        return yn.call(e) == yn.call(t);
  }
  return !1;
}
var yp = 1, wp = Object.prototype, _p = wp.hasOwnProperty;
function Sp(e, t, n, r, a, o) {
  var s = n & yp, l = Mn(e), i = l.length, p = Mn(t), c = p.length;
  if (i != c && !s)
    return !1;
  for (var v = i; v--; ) {
    var b = l[v];
    if (!(s ? b in t : _p.call(t, b)))
      return !1;
  }
  var g = o.get(e), h = o.get(t);
  if (g && h)
    return g == t && h == e;
  var _ = !0;
  o.set(e, t), o.set(t, e);
  for (var d = s; ++v < i; ) {
    b = l[v];
    var m = e[b], u = t[b];
    if (r)
      var f = s ? r(u, m, b, t, e, o) : r(m, u, b, e, t, o);
    if (!(f === void 0 ? m === u || a(m, u, n, r, o) : f)) {
      _ = !1;
      break;
    }
    d || (d = b == "constructor");
  }
  if (_ && !d) {
    var y = e.constructor, w = t.constructor;
    y != w && "constructor" in e && "constructor" in t && !(typeof y == "function" && y instanceof y && typeof w == "function" && w instanceof w) && (_ = !1);
  }
  return o.delete(e), o.delete(t), _;
}
var Cp = 1, Br = "[object Arguments]", Vr = "[object Array]", Yt = "[object Object]", xp = Object.prototype, qr = xp.hasOwnProperty;
function Ap(e, t, n, r, a, o) {
  var s = he(e), l = he(t), i = s ? Vr : jt(e), p = l ? Vr : jt(t);
  i = i == Br ? Yt : i, p = p == Br ? Yt : p;
  var c = i == Yt, v = p == Yt, b = i == p;
  if (b && Dt(e)) {
    if (!Dt(t))
      return !1;
    s = !0, c = !1;
  }
  if (b && !c)
    return o || (o = new Oe()), s || zn(e) ? Co(e, t, n, r, a, o) : hp(e, t, i, n, r, a, o);
  if (!(n & Cp)) {
    var g = c && qr.call(e, "__wrapped__"), h = v && qr.call(t, "__wrapped__");
    if (g || h) {
      var _ = g ? e.value() : e, d = h ? t.value() : t;
      return o || (o = new Oe()), a(_, d, n, r, o);
    }
  }
  return b ? (o || (o = new Oe()), Sp(e, t, n, r, a, o)) : !1;
}
function cn(e, t, n, r, a) {
  return e === t ? !0 : e == null || t == null || !Te(e) && !Te(t) ? e !== e && t !== t : Ap(e, t, n, r, cn, a);
}
var Op = 1, Tp = 2;
function $p(e, t, n, r) {
  var a = n.length, o = a, s = !r;
  if (e == null)
    return !o;
  for (e = Object(e); a--; ) {
    var l = n[a];
    if (s && l[2] ? l[1] !== e[l[0]] : !(l[0] in e))
      return !1;
  }
  for (; ++a < o; ) {
    l = n[a];
    var i = l[0], p = e[i], c = l[1];
    if (s && l[2]) {
      if (p === void 0 && !(i in e))
        return !1;
    } else {
      var v = new Oe();
      if (r)
        var b = r(p, c, i, e, t, v);
      if (!(b === void 0 ? cn(c, p, Op | Tp, r, v) : b))
        return !1;
    }
  }
  return !0;
}
function xo(e) {
  return e === e && !ve(e);
}
function Ip(e) {
  for (var t = Vt(e), n = t.length; n--; ) {
    var r = t[n], a = e[r];
    t[n] = [r, a, xo(a)];
  }
  return t;
}
function Ao(e, t) {
  return function(n) {
    return n == null ? !1 : n[e] === t && (t !== void 0 || e in Object(n));
  };
}
function Mp(e) {
  var t = Ip(e);
  return t.length == 1 && t[0][2] ? Ao(t[0][0], t[0][1]) : function(n) {
    return n === e || $p(n, e, t);
  };
}
function Pp(e, t) {
  return e != null && t in Object(e);
}
function Dp(e, t, n) {
  t = zt(t, e);
  for (var r = -1, a = t.length, o = !1; ++r < a; ) {
    var s = nt(t[r]);
    if (!(o = e != null && n(e, s)))
      break;
    e = e[s];
  }
  return o || ++r != a ? o : (a = e == null ? 0 : e.length, !!a && Bn(a) && rn(s, a) && (he(e) || Pt(e)));
}
function Rp(e, t) {
  return e != null && Dp(e, t, Pp);
}
var Ep = 1, jp = 2;
function Fp(e, t) {
  return Hn(e) && xo(t) ? Ao(nt(e), t) : function(n) {
    var r = $e(n, e);
    return r === void 0 && r === t ? Rp(n, e) : cn(t, r, Ep | jp);
  };
}
function Lp(e) {
  return function(t) {
    return t == null ? void 0 : t[e];
  };
}
function kp(e) {
  return function(t) {
    return un(t, e);
  };
}
function Np(e) {
  return Hn(e) ? Lp(nt(e)) : kp(e);
}
function Up(e) {
  return typeof e == "function" ? e : e == null ? nn : typeof e == "object" ? he(e) ? Fp(e[0], e[1]) : Mp(e) : Np(e);
}
function Bp(e) {
  return function(t, n, r) {
    for (var a = -1, o = Object(t), s = r(t), l = s.length; l--; ) {
      var i = s[e ? l : ++a];
      if (n(o[i], i, o) === !1)
        break;
    }
    return t;
  };
}
var Vp = Bp();
const Oo = Vp;
function qp(e, t) {
  return e && Oo(e, t, Vt);
}
var zp = function() {
  return Me.Date.now();
};
const wn = zp;
var Hp = "Expected a function", Gp = Math.max, Kp = Math.min;
function To(e, t, n) {
  var r, a, o, s, l, i, p = 0, c = !1, v = !1, b = !0;
  if (typeof e != "function")
    throw new TypeError(Hp);
  t = vr(t) || 0, ve(n) && (c = !!n.leading, v = "maxWait" in n, o = v ? Gp(vr(n.maxWait) || 0, t) : o, b = "trailing" in n ? !!n.trailing : b);
  function g(C) {
    var x = r, A = a;
    return r = a = void 0, p = C, s = e.apply(A, x), s;
  }
  function h(C) {
    return p = C, l = setTimeout(m, t), c ? g(C) : s;
  }
  function _(C) {
    var x = C - i, A = C - p, T = t - x;
    return v ? Kp(T, o - A) : T;
  }
  function d(C) {
    var x = C - i, A = C - p;
    return i === void 0 || x >= t || x < 0 || v && A >= o;
  }
  function m() {
    var C = wn();
    if (d(C))
      return u(C);
    l = setTimeout(m, _(C));
  }
  function u(C) {
    return l = void 0, b && r ? g(C) : (r = a = void 0, s);
  }
  function f() {
    l !== void 0 && clearTimeout(l), p = 0, r = i = a = l = void 0;
  }
  function y() {
    return l === void 0 ? s : u(wn());
  }
  function w() {
    var C = wn(), x = d(C);
    if (r = arguments, a = this, i = C, x) {
      if (l === void 0)
        return h(i);
      if (v)
        return clearTimeout(l), l = setTimeout(m, t), g(i);
    }
    return l === void 0 && (l = setTimeout(m, t)), s;
  }
  return w.cancel = f, w.flush = y, w;
}
var $o = Object.prototype, Yp = $o.hasOwnProperty, Wp = Ra(function(e, t) {
  e = Object(e);
  var n = -1, r = t.length, a = r > 2 ? t[2] : void 0;
  for (a && Ea(t[0], t[1], a) && (r = 1); ++n < r; )
    for (var o = t[n], s = _t(o), l = -1, i = s.length; ++l < i; ) {
      var p = s[l], c = e[p];
      (c === void 0 || yt(c, $o[p]) && !Yp.call(e, p)) && (e[p] = o[p]);
    }
  return e;
});
const We = Wp;
function Rn(e, t, n) {
  (n !== void 0 && !yt(e[t], n) || n === void 0 && !(t in e)) && an(e, t, n);
}
function Zp(e) {
  return Te(e) && on(e);
}
function En(e, t) {
  if (!(t === "constructor" && typeof e[t] == "function") && t != "__proto__")
    return e[t];
}
function Qp(e) {
  return wt(e, _t(e));
}
function Jp(e, t, n, r, a, o, s) {
  var l = En(e, n), i = En(t, n), p = s.get(i);
  if (p) {
    Rn(e, n, p);
    return;
  }
  var c = o ? o(l, i, n + "", e, t, s) : void 0, v = c === void 0;
  if (v) {
    var b = he(i), g = !b && Dt(i), h = !b && !g && zn(i);
    c = i, b || g || h ? he(l) ? c = l : Zp(l) ? c = Ma(l) : g ? (v = !1, c = fo(i, !0)) : h ? (v = !1, c = go(i, !0)) : c = [] : je(i) || Pt(i) ? (c = l, Pt(l) ? c = Qp(l) : (!ve(l) || Be(l)) && (c = ho(i))) : v = !1;
  }
  v && (s.set(i, c), a(c, i, r, o, s), s.delete(i)), Rn(e, n, c);
}
function Jn(e, t, n, r, a) {
  e !== t && Oo(t, function(o, s) {
    if (a || (a = new Oe()), ve(o))
      Jp(e, t, s, n, Jn, r, a);
    else {
      var l = r ? r(En(e, s), o, s + "", e, t, a) : void 0;
      l === void 0 && (l = o), Rn(e, s, l);
    }
  }, _t);
}
var Xp = ja(function(e, t, n, r) {
  Jn(e, t, n, r);
});
const ev = Xp;
function tv(e, t, n) {
  for (var r = -1, a = e == null ? 0 : e.length; ++r < a; )
    if (n(t, e[r]))
      return !0;
  return !1;
}
function nv(e) {
  var t = e == null ? 0 : e.length;
  return t ? e[t - 1] : void 0;
}
function rv(e) {
  return typeof e == "function" ? e : nn;
}
function av(e, t) {
  return t.length < 2 ? e : un(e, qa(t, 0, -1));
}
function ov(e, t) {
  return cn(e, t);
}
var sv = "[object Number]";
function ct(e) {
  return typeof e == "number" || Te(e) && Qe(e) == sv;
}
function lv(e, t) {
  var n = {};
  return t = Up(t), qp(e, function(r, a, o) {
    an(n, t(r, a, o), r);
  }), n;
}
var iv = ja(function(e, t, n) {
  Jn(e, t, n);
});
const Ht = iv;
var uv = Object.prototype, cv = uv.hasOwnProperty;
function dv(e, t) {
  t = zt(t, e);
  var n = -1, r = t.length;
  if (!r)
    return !0;
  for (; ++n < r; ) {
    var a = nt(t[n]);
    if (a === "__proto__" && !cv.call(e, "__proto__") || (a === "constructor" || a === "prototype") && n < r - 1)
      return !1;
  }
  var o = av(e, t);
  return o == null || delete o[nt(nv(t))];
}
function fv(e) {
  return je(e) ? void 0 : e;
}
var pv = 1, vv = 2, mv = 4, bv = Vu(function(e, t) {
  var n = {};
  if (e == null)
    return n;
  var r = !1;
  t = $a(t, function(o) {
    return o = zt(o, e), r || (r = o.length > 1), o;
  }), wt(e, bo(e), n), r && (n = $t(n, pv | vv | mv, fv));
  for (var a = t.length; a--; )
    dv(n, t[a]);
  return n;
});
const gv = bv;
function Io(e, t, n, r) {
  if (!ve(e))
    return e;
  t = zt(t, e);
  for (var a = -1, o = t.length, s = o - 1, l = e; l != null && ++a < o; ) {
    var i = nt(t[a]), p = n;
    if (i === "__proto__" || i === "constructor" || i === "prototype")
      return e;
    if (a != s) {
      var c = l[i];
      p = r ? r(c, i, l) : void 0, p === void 0 && (p = ve(c) ? c : rn(t[a + 1]) ? [] : {});
    }
    Un(l, i, p), l = l[i];
  }
  return e;
}
function Lt(e, t, n) {
  return e == null ? e : Io(e, t, n);
}
var hv = "Expected a function";
function yv(e, t, n) {
  var r = !0, a = !0;
  if (typeof e != "function")
    throw new TypeError(hv);
  return ve(n) && (r = "leading" in n ? !!n.leading : r, a = "trailing" in n ? !!n.trailing : a), To(e, t, {
    leading: r,
    maxWait: t,
    trailing: a
  });
}
var wv = 1 / 0, _v = vt && 1 / Qn(new vt([, -0]))[1] == wv ? function(e) {
  return new vt(e);
} : Vl;
const Sv = _v;
var Cv = 200;
function xv(e, t, n) {
  var r = -1, a = ri, o = e.length, s = !0, l = [], i = l;
  if (n)
    s = !1, a = tv;
  else if (o >= Cv) {
    var p = t ? null : Sv(e);
    if (p)
      return Qn(p);
    s = !1, a = So, i = new Ft();
  } else
    i = t ? [] : l;
  e:
    for (; ++r < o; ) {
      var c = e[r], v = t ? t(c) : c;
      if (c = n || c !== 0 ? c : 0, s && v === v) {
        for (var b = i.length; b--; )
          if (i[b] === v)
            continue e;
        t && i.push(v), l.push(c);
      } else
        a(i, v, n) || (i !== l && i.push(v), l.push(c));
    }
  return l;
}
function Av(e) {
  return e && e.length ? xv(e) : [];
}
function Ov(e, t, n, r) {
  return Io(e, t, n(un(e, t)), r);
}
function Tv(e, t, n) {
  return e == null ? e : Ov(e, t, rv(n));
}
let mt = (e = 21) => crypto.getRandomValues(new Uint8Array(e)).reduce((t, n) => (n &= 63, n < 36 ? t += n.toString(36) : n < 62 ? t += (n - 26).toString(36).toUpperCase() : n > 62 ? t += "-" : t += "_", t), "");
const Mo = [
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
], Po = new Set(Mo);
function zr(e) {
  const t = () => S("div", e.contentAttrs, [e.content()]);
  if (e.component)
    return S(
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
  return S("div", ee(e.attrs || {}, { class: "sup-group" }), [
    (e.title || !n && e.extra) && S(
      "div",
      {
        class: "sup-titlebar",
        style: { display: "flex", alignItems: "center" }
      },
      [
        e.title && S("div", { class: "sup-title" }, [e.title()]),
        !n && e.extra && S(
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
    n && e.extra && S(
      "div",
      {
        class: "sup-bottom-buttons",
        style: { textAlign: e.extraAlign }
      },
      [e.extra()]
    )
  ]);
}
const $v = /* @__PURE__ */ new Set(["group", "card", "tabs", "collapse", "descriptions", "upload"]);
function Do(e = {}) {
  return Xn(Object.fromEntries(Object.entries(e).map(([t, n]) => [t, { render: n }]))).render;
}
function Xn(e = {}) {
  const t = {}, n = { render: t };
  for (const r of Object.keys(e)) {
    const a = e[r];
    if (!a)
      continue;
    a.service && Object.assign(n, { [r]: a.service }), a.schemaDefaults && (n.defaults = { ...a.schemaDefaults });
    const { defaults: o, adaptProps: s } = a, l = $v.has(r), i = a.render, p = a.component;
    Object.assign(t, {
      [r]: (c = {}, v = {}) => {
        const b = l ? c.attrs || {} : c, g = {
          type: r,
          attrs: o ? { ...o, ...b } : b,
          state: c,
          slots: l && c.slots || v
        };
        return s && (g.attrs = s(g.attrs, g)), l && (g.state = { ...c, attrs: g.attrs, slots: g.slots }), i ? i(g) : S(p, g.attrs, g.slots);
      }
    });
  }
  return n;
}
const Ro = /* @__PURE__ */ new Map(), Eo = /* @__PURE__ */ new Map(), It = /* @__PURE__ */ new Map();
function jo(e, t = "manual") {
  const n = t === "manual" ? Ro : Eo;
  Object.entries(e).forEach(([r, a]) => {
    a && n.set(r, a);
  });
}
function er(e) {
  var t;
  const n = rt();
  if (!n.supportedFields.includes(e))
    return;
  const r = ((t = n.fieldSources) == null ? void 0 : t[e]) ?? e, a = [
    r,
    ...Object.keys(n.fieldSources || {}).filter(
      (o) => {
        var s;
        return o !== r && ((s = n.fieldSources) == null ? void 0 : s[o]) === r;
      }
    )
  ];
  return It.get(r) ?? a.map((o) => Ro.get(o)).find(Boolean) ?? a.map((o) => Eo.get(o)).find(Boolean);
}
function Iv(e) {
  var t;
  const n = It.get(e);
  if (n)
    return n;
  const r = er(e);
  if (!r)
    throw new Error(
      `UIAdapter '${rt().name}' 支持字段 '${e}'，但组件 '${e}' 尚未注册；请启用自动导入插件，或在 superForm.initialize({ components }) 中提供`
    );
  const a = ((t = rt().fieldSources) == null ? void 0 : t[e]) ?? e;
  return It.set(a, r), It.set(e, r), r;
}
function Mv(e) {
  const t = It.get(e);
  if (!t)
    throw new Error(`原始 UI 组件 '${e}' 尚未加载`);
  return t;
}
let dt;
function Pv(e) {
  if (!("uiComponents" in e))
    return e;
  const { uiComponents: t, ...n } = e, r = Xn(t);
  return { ...n, ...r, render: { ...r.render, ...Do(e.render) } };
}
function rt() {
  if (!dt)
    throw new Error(
      "SuperForm 尚未初始化 UIAdapter；官方产品请先调用 superForm.initialize()，独立 Core 请调用 superForm.useAdapter(adapter)"
    );
  return dt;
}
function Hr(e) {
  if (dt) {
    if (dt !== e)
      throw new Error(`UIAdapter 已初始化为 '${dt.name}'，不能切换为 '${e.name}'`);
    return;
  }
  dt = e, jo(e.fieldComponents || {}, "manual");
}
function Fo(e, t = {}) {
  const { uiComponents: n, ...r } = t, a = Xn(n);
  return {
    ...e,
    ...a,
    ...r,
    defaults: { ...e.defaults, ...a.defaults },
    render: { ...e.render, ...a.render, ...Do(t.render) }
  };
}
const Gr = {};
function q(e) {
  const t = Gr[e];
  if (t)
    return t;
  const n = rt();
  let r = n.render[e];
  if (e === "group") {
    const a = n.render.group || zr;
    r = (o) => o.component ? zr(o) : a(o);
  } else
    e === "compactSpace" && (r || (r = n.render.space));
  if (!r)
    throw new Error(`UIAdapter '${n.name}' 未提供 render.${e}`);
  return Gr[e] = r, r;
}
function pe(e) {
  const t = rt(), n = t[e];
  if (!n)
    throw new Error(`UIAdapter '${t.name}' 未提供 ${e} 协议`);
  return n;
}
const Dv = {
  type: { type: String, required: !0 },
  option: { type: Object, required: !0 },
  model: { type: Object, required: !0 },
  effectData: { type: Object, required: !0 },
  binding: { type: Object, required: !0 },
  state: { type: Object, required: !0 },
  attrs: { type: Object, required: !0 }
};
function Rv(e, t) {
  return (...n) => {
    const r = e(...n);
    for (const a of Array.isArray(t) ? t : [t])
      typeof a == "function" && a !== e && a(...n);
    return r;
  };
}
function tr({ prop: e = "value", event: t = "update:value" } = {}, n) {
  const r = t.startsWith("on") ? t : `on${t[0].toUpperCase()}${t.slice(1)}`;
  return (a, o) => {
    const s = { ...n ? n(a, o) : a }, { binding: l, state: i, option: p, effectData: c } = o;
    i.disabled !== void 0 && (s.disabled = i.disabled), p.disabledDate !== void 0 && (s.disabledDate = (...v) => p.disabledDate(c, ...v));
    for (const [v, b] of Object.entries(l)) {
      if (p.labelField && (v === "labelValue" || v === "onUpdate:labelValue"))
        continue;
      const g = v === "value" ? e : v === "onUpdate:value" ? r : v;
      s[g] = v.startsWith("onUpdate:") && typeof b == "function" ? Rv(b, s[g]) : b;
    }
    return s;
  };
}
function Ev(e, t) {
  return Object.fromEntries(
    Object.entries(e).map(([n, { model: r, ...a }]) => [
      n,
      {
        ...a,
        // 两条渲染路径共用绑定和属性转换，扩展渲染不能再次合成原生事件。
        adaptProps: tr(r ?? t, a.adaptProps)
      }
    ])
  );
}
const Kr = /* @__PURE__ */ new Map(), jv = tr();
function Lo(e) {
  var t, n;
  const r = Kr.get(e);
  if (r)
    return r;
  const a = rt();
  if (!a.supportedFields.includes(e))
    return;
  const o = (t = a.fields) == null ? void 0 : t[e], s = (o == null ? void 0 : o.component) ?? (o != null && o.render && !er(e) ? void 0 : Iv(e)), l = (o == null ? void 0 : o.adaptProps) ?? a.adaptFieldProps ?? jv, i = (n = o == null ? void 0 : o.processors) != null && n.some((c) => ["options", "picker", "range"].includes(c)) ? "请选择" : "请输入", p = {
    ...o,
    type: e,
    component: s,
    render(c) {
      var v;
      const b = Object.assign(l(c.attrs, c), o == null ? void 0 : o.fixedProps), g = ((v = o == null ? void 0 : o.adaptSlots) == null ? void 0 : v.call(o, c.slots, c)) ?? c.slots;
      return o != null && o.render ? o.render({ ...c, attrs: b, slots: g }) : S(s, b, g);
    },
    // 只缓存提示前缀，label 按当前字段读取，避免同类型字段串用提示文案。
    // defaults/attrs 的 class/style 按 Vue 规则合并；fixedProps 最后直接覆盖，不能被用户配置改写。
    getAttrs: (c, v, b = {}) => Object.assign(
      ee(
        { placeholder: b.placeholder ?? `${i}${v.label ?? ""}` },
        (o == null ? void 0 : o.defaults) ?? {},
        c,
        // 两套 UI 均接收标准 options；只在专项结果存在时覆盖，空数组也有效。
        b.options === void 0 ? {} : { options: b.options }
      ),
      o == null ? void 0 : o.fixedProps
    ),
    adaptProps: l
  };
  return Kr.set(e, p), p;
}
function at(e) {
  var t, n;
  return (n = (t = pe("icons").semantic) == null ? void 0 : t[e]) == null ? void 0 : n.call(t);
}
function Pe(e) {
  const t = we("exaProvider", {}).data;
  return k({ ...e || {}, formData: t });
}
function Yr(e, t) {
  const n = L(et(e) ? e : !!e);
  return typeof e == "function" && He(() => {
    n.value = e(t);
  }), n;
}
function jn(e, t) {
  const n = k({});
  return e && He(() => {
    Object.assign(n, e(t));
  }), n;
}
function Fv(e = {}, t) {
  const n = {};
  return Object.keys(e).forEach((r) => {
    !e[r] || r === "onUpdate" || (r.match(/^on[A-Z]/) ? n[r] = (...a) => e[r](t, ...a) : r === "on" && Object.entries(e.on).forEach(([a, o]) => {
      const s = "on" + a.charAt(0).toUpperCase() + a.slice(1);
      n[s] = (...l) => o(t, ...l);
    }));
  }), n;
}
function nr({ option: e, model: t, effectData: n }, r) {
  const {
    field: a,
    endField: o,
    labelField: s,
    stringifyValue: l,
    computed: i,
    value: p,
    onUpdate: c
  } = e, v = {}, b = e.vModelFields || {};
  if (s && (v.labelValue = N(() => $e(t.parent, s)), v["onUpdate:labelValue"] = (u) => {
    const f = l ? u == null ? void 0 : u.toString() : u;
    Lt(t.parent, s, f);
  }), Object.entries(b).forEach(([u, f]) => {
    var y;
    typeof f == "string" ? ((y = t.parent)[f] ?? (y[f] = void 0), v[u] = N(() => $e(t.parent, f)), v[`onUpdate:${u}`] = (w) => {
      Lt(t.parent, f, w);
    }) : et(f) ? (v[u] = f, v[`onUpdate:${u}`] = (w) => f.value = w) : v[u] = f;
  }), !a)
    return et(p) && Object.assign(v, {
      value: p,
      "onUpdate:value": (u) => p.value = u
    }), v;
  r !== void 0 && (t.refData ?? (t.refData = se(r)));
  const g = le(t, "refData"), h = L(), _ = (u = se(r)) => {
    h.value = u, g.value !== u && r !== void 0 && (g.value = u);
  };
  Object.assign(v, {
    value: h,
    "onUpdate:value": _
  }), et(p) && (z(g, (u) => p.value = u), z(p, _));
  let d = se(t.refData), m;
  if (o)
    h.value = [g.value, t.parent[o]], m = (u) => {
      const [f, y] = u || [];
      g.value = f, d = f, t.parent[o] = y;
    }, z([g, () => t.parent[o]], (u) => {
      h.value = u;
    });
  else if (l) {
    const u = (f) => (f == null ? void 0 : f.toString().split(",")) || [];
    h.value = u(g.value), m = (f) => {
      const y = (f == null ? void 0 : f.toString()) || "";
      g.value = y, d = y;
    }, z(g, (f) => {
      f !== d && (h.value = u(f));
    });
  } else
    h.value = d, m = (u) => {
      g.value = u, d = u;
    }, z(g, _);
  return z(h, m, { flush: "sync" }), c && z(g, () => c(n)), i && z(
    // 使用ref让计算结果即使一样也会进行后面的赋值
    () => L(i(d, n)),
    (u) => m(Q(u)),
    { immediate: !0 }
  ), v;
}
function Ie({ option: e, effectData: t, inheritDisabled: n }) {
  const { type: r, dynamicAttrs: a, disabled: o, hidden: s, required: l } = e, i = Yr(s, t), p = Yr(l, t), c = n === void 0 && o === void 0 ? void 0 : N(() => {
    let d = se(n);
    if (!(!d && o === void 0))
      return d || (typeof o == "function" ? d = !!o(t) : d = se(o)), d;
  }), v = Fv(e, t), b = typeof a == "function" ? { ...Ye(jn(a, t)) } : {}, g = ee({ ...Z[r] }, { ...e.attrs }, v, b), h = Ht({}, e.attrs, g);
  return { attrs: { ...h, ...c && {
    disabled: N(() => c.value ?? se(h.disabled))
  } }, nativeAttrs: h, disabled: c, hidden: i, required: p };
}
function Wr(e, t = {}) {
  const n = new RegExp("{(\\w*)}", "g");
  return e.replace(n, (r, a) => t[a] || "");
}
const Zr = {
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
}, Qr = {
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
function Lv(e, t, n, r) {
  let a;
  if (t)
    a = { type: e, len: t, message: "len" };
  else if (ct(n) && ct(r))
    a = { type: e, max: n, min: r, message: "range" };
  else if (ct(n))
    a = { type: e, max: n, message: "max" };
  else if (ct(r))
    a = { type: e, min: r, message: "min" };
  else
    return !1;
  return e === "number" ? (a.message = Qr.number[a.message], a.transform = (o) => Number(o)) : a.message = Qr.string[a.message], a;
}
function kv(e, t = "") {
  const { trigger: n, required: r, type: a = "string", len: o, max: s, min: l, pattern: i, validator: p, message: c } = e || {}, v = [];
  r && (a === "string" || a in Zr ? v.push({
    required: r,
    trigger: n,
    // validator: noEmpty,
    pattern: /^[\s\S]*.*[^\s][\s\S]*$/,
    // transform: (value) => value + '',
    // whitespace: true,
    message: c || `${t}不能为空！`
  }) : v.push({ required: r, trigger: n, message: c || `${t}不能为空！` }));
  const b = Zr[a];
  if (b) {
    const g = Wr(b.message, { label: t });
    v.push({ ...b, trigger: n, message: g });
  }
  if (i && v.push({ pattern: i, trigger: n, message: c }), o || ct(s) || ct(l)) {
    const g = Lv(a, o, s, l), h = Wr(g.message, { label: t, len: o, max: s, min: l });
    v.push({ ...g, trigger: n, message: h, type: a });
  }
  return p && v.push({ validator: p, trigger: n }), v;
}
function ko(e, t, n) {
  const { field: r, columns: a, subItems: o, initialValue: s, value: l } = e, i = e.endField ?? e.labelField, p = r ? r.split(".") : [], c = n.concat(p), v = p.splice(-1)[0], b = k({
    refName: v,
    initialValue: s,
    fieldName: r,
    origin: t,
    parent: t,
    refData: t,
    propChain: c
  });
  return v ? (p.length && (b.parent = N(() => $e(t.value, p))), b.refData = N({
    get: () => $e(t.value, r),
    set: (g) => Lt(t.value, r, g)
  }), z(
    t,
    () => {
      b.refData ?? (b.refData = se(s) ?? se(l) ?? (a && [] || o && {})), i && Tv(b.parent, i, (g) => g);
    },
    { immediate: !0, flush: "sync" }
  )) : l && (b.refData = L(l), b.propChain = []), b;
}
const kt = (e, t) => e == null ? void 0 : e.map((n) => n.validator ? { ...n, validator: async (a, ...o) => {
  const s = await n.validator({ ...a, ...t }, ...o);
  if (s === !1 || s instanceof Error)
    throw s;
} } : n);
function gt(e, t, n = []) {
  const r = le(t || {}), a = {}, o = /* @__PURE__ */ new Map();
  return e.forEach((s) => {
    if (typeof s != "object")
      return;
    const l = ko(s, r, n), { required: i, label: p, subItems: c, columns: v } = s;
    if (s.rules || i) {
      const b = s.rules || [], g = Array.isArray(b) ? b : [b];
      if (i) {
        const _ = g[0];
        _ ? _.required = i : g.push({ required: i });
      }
      let h = "string";
      if (l.refData) {
        const _ = typeof l.refData;
        h = _ === "object" && Array.isArray(l.refData) ? "array" : _;
      }
      l.rules = g.map((_) => kv({ type: h, ..._ }, p)).flat(), l.propChain.length && (a[l.propChain.join(".")] = l.rules);
    }
    if (c) {
      const b = gt(c, le(l, "refData"), l.propChain);
      Object.assign(a, b.rules), l.children = b.modelsMap;
    } else
      v && (l.listData = gt(v));
    o.set(Ks(s), l);
  }), {
    rules: a,
    modelsMap: o
  };
}
function Nt(e, t, n) {
  const r = e.propChain;
  if (e.index === n && r.length === t.length && r.every((o, s) => o === t[s]))
    return;
  const a = (o) => {
    var s, l;
    (s = o.propChain) != null && s.length && r.every((i, p) => o.propChain[p] === i) && (o.propChain = [...t, ...o.propChain.slice(r.length)]), o.index !== void 0 && (o.index = n), (l = o.children) == null || l.forEach(a);
  };
  a(e);
}
function ot(e, t, n = [], r) {
  const a = le(t || {}), o = {}, s = [...e].map(([l, i]) => {
    const { children: p, rules: c, listData: v } = i, b = r !== void 0 ? [...n, r] : n, g = ko(l, a, b);
    if (r !== void 0 && (g.index = r), g.rules = c, g.propChain.length && c && (o[g.propChain.join(".")] = c), p) {
      const { modelsMap: h, rules: _ } = ot(p, le(g, "refData"), g.propChain);
      Object.assign(o, _), g.children = h;
    }
    return v && (g.listData = v), [l, g];
  });
  return { modelsMap: new Map(s), rules: o };
}
function No(e, t, n, r) {
  const { modelsMap: a, rules: o } = ot(e, t, n, r), s = [];
  return function l(i) {
    for (const [p, c] of i)
      s.push([p, c]), c.children && l(c.children);
  }(a), { modelsMap: new Map(s), rootModels: a, rules: o };
}
const Nv = (e, t) => Object.prototype.hasOwnProperty.call(e, t);
function Uo(e, t = {}, n = {}) {
  for (const [r, a] of Object.entries(e))
    Array.isArray(a) ? e[r] = Ge((t == null ? void 0 : t[r]) ?? (n == null ? void 0 : n[r])) : Object.prototype.toString.call(a) === "[object Object]" ? Uo(a, t == null ? void 0 : t[r], n == null ? void 0 : n[r]) : e[r] = (t == null ? void 0 : t[r]) ?? (n == null ? void 0 : n[r]);
}
function Bo(e, t, n = {}) {
  for (const [r, a] of Object.entries(e)) {
    if (!Nv(t, r))
      continue;
    const o = t[r] ?? (n == null ? void 0 : n[r]);
    je(a) && je(o) ? Bo(a, o, n == null ? void 0 : n[r]) : Array.isArray(o) || je(o) ? e[r] = Ge(o) : e[r] = o;
  }
}
function Jr() {
  let e;
  return { promise: new Promise((n) => {
    e = n;
  }), resolve: e };
}
function Vo() {
  const e = L();
  let t = Jr(), n = !0;
  return z(e, (a) => {
    a ? (t.resolve(!0), n = !1) : n || (t = Jr(), n = !0);
  }), [e, () => t.promise.then(() => e.value)];
}
function ae(e, t = {}) {
  return e ? typeof e == "function" ? e(t || {}, {}) : typeof e != "object" ? S("span", e) : S(e, { effectData: t }) : null;
}
const ue = {
  tagViewer: ["pink", "red", "orange", "green", "cyan", "blue", "purple"]
};
function St(e, t, n) {
  const r = n || we("rootSlots", {}), a = {};
  return e && Object.entries(e).forEach(([o, s]) => {
    const l = typeof s == "string" ? r[s] : s;
    l && (a[o] = (i) => typeof l == "function" ? l({ ...t, ...i || {} }) : l);
  }), a;
}
function rr(e, t, n = !1, r = {}) {
  if (t != null)
    for (const a of e) {
      const o = a[r.value ?? "value"];
      if (Object.is(o, t) || n && String(o) === t)
        return a;
      const s = a[r.children ?? "children"], l = Array.isArray(s) && rr(s, t, n, r);
      if (l)
        return l;
    }
}
function dn(e, t = {}, n = !0) {
  const r = L([]);
  let a = 0;
  (e == null ? void 0 : e.source) !== void 0 && e.dictName !== void 0 && console.warn("[SuperForm] options.source 与 options.dictName 同时配置，优先使用 source，忽略 dictName");
  const o = async (l = t) => {
    var i;
    const p = ++a, c = Q(e == null ? void 0 : e.source), v = (e == null ? void 0 : e.source) !== void 0 ? typeof c == "function" ? await c(l) : c : (e == null ? void 0 : e.dictName) !== void 0 ? await ((i = ue.dictApi) == null ? void 0 : i.call(ue, e.dictName)) : void 0;
    p === a && (r.value = v ?? []);
  };
  return e && n && He(() => {
    o();
  }), { optionsRef: N(() => {
    var l, i, p;
    const c = r.value, v = ((l = e == null ? void 0 : e.fieldNames) == null ? void 0 : l.label) ?? "label", b = ((i = e == null ? void 0 : e.fieldNames) == null ? void 0 : i.value) ?? "value", g = ((p = e == null ? void 0 : e.fieldNames) == null ? void 0 : p.children) ?? "children", h = (_) => _.map((d, m) => {
      const u = je(d), f = u ? d[v] : d, y = e != null && e.labelAsValue ? f : u ? d[b] : e != null && e.valueToNumber ? m : d;
      return {
        ...u ? d : {},
        label: f,
        value: e != null && e.valueToNumber && !e.labelAsValue ? Number(y) : y,
        ...u && Array.isArray(d[g]) && { children: h(d[g]) }
      };
    });
    return Array.isArray(c) ? h(c) : Object.entries(c ?? {}).map(([_, d]) => ({
      label: d,
      value: e != null && e.labelAsValue ? d : e != null && e.valueToNumber ? Number(_) : _
    }));
  }), load: o };
}
const Xr = (e, t) => {
  const n = {};
  return e.vModelFields && Object.entries(e.vModelFields).forEach(([r, a]) => {
    n[r] = t[a];
  }), n;
}, _n = ({ value: e, label: t = e, color: n, icon: r, tagViewer: a = !0 }) => {
  const o = { color: n, label: t, icon: r };
  if (a !== !0 || !n) {
    const s = a === !0 ? ue.tagViewer : a;
    if (typeof s == "function") {
      const l = s(e);
      je(l) ? Object.assign(o, l) : o.color = l;
    } else if (Array.isArray(s) && je(s[0])) {
      const l = s.find((i) => i.value == e);
      Object.assign(o, l);
    }
    o.color ?? (o.color = n || s[e] || e === !0 && "success" || e === !1 && "error" || "default");
  }
  return q("tag")(
    { color: o.color },
    {
      default: () => o.label || e,
      icon: o.icon
    }
  );
};
function Gt(e, t = {}) {
  const { type: n = "", viewRender: r, render: a, labelField: o, tagViewer: s, initialValue: l } = e, i = e.options, p = e.endField, c = we("rootSlots", {}), v = r || n === "InfoSlot" && a, b = typeof v == "string" ? c[v] : v;
  if (v && !b)
    return !1;
  let g = !1;
  const h = (() => {
    if (o)
      return ({ current: d } = t) => String($e(d, o) ?? "");
    if (p)
      return ({ current: d, text: m } = t) => (m || "") + " - " + ($e(d, p) || "");
    if (i !== void 0) {
      g = !(s === !1 || !s && ue.tagViewer === !1);
      const { optionsRef: d, load: m } = dn(i, t, !1);
      let u = !1;
      return (f = t, y) => {
        u || (u = !0, m(f));
        const w = f.text ?? f.value ?? se(l) ?? "";
        if (w === "")
          return "";
        const x = (Array.isArray(w) ? w : e.stringifyValue && typeof w == "string" ? w.split(",") : [w]).map((A) => {
          const T = rr(d.value, A, e.stringifyValue), $ = (T == null ? void 0 : T.label) ?? A;
          return !y && g ? _n({ ...T, value: A, label: $, tagViewer: s }) : $;
        });
        return !y && g ? x : x.join(",");
      };
    } else if (n === "Switch")
      return ({ text: d, value: m } = t) => {
        const u = d ?? m ?? se(l);
        return u === !0 ? "是" : u === !1 ? "否" : u;
      };
  })(), _ = !0;
  if (b)
    return (d = t) => {
      const m = Xr(e, d.current), { attrs: u } = Ie({ option: e, effectData: d }), f = { ...u };
      delete f.disabled;
      const y = k({
        props: { ...f, ...m },
        ...d,
        ...h && { text: N(() => h(d, _)) },
        isView: !0
      });
      return b(y);
    };
  if (s && !g)
    return (d = t) => {
      const m = d.text ?? se(l);
      return typeof m == "boolean" && s === !0 ? _n({
        label: m ? "是" : "否",
        color: m ? "success" : "error"
      }) : (Array.isArray(m) ? m : typeof m == "string" ? m.split(",") : [m]).map((y) => _n({ value: y, tagViewer: s }));
    };
  if (n === "Text" && (e.attrs || e.dynamicAttrs))
    return (d = t) => {
      const m = (h == null ? void 0 : h(d)) || (d.value ?? se(l)), u = jn(e.dynamicAttrs, d), f = ee({ ...e.attrs, title: m }, u);
      return S("span", f, m);
    };
  if (n === "HTML")
    return (d = t) => {
      const m = jn(e.dynamicAttrs, d), u = ee({ ...e.attrs, innerHTML: d.value }, m);
      return S("span", u);
    };
  if (n === "TextArea")
    return (d = t) => S("pre", { style: "white-space: break-spaces;" }, d.value ?? se(l));
  if (!h && (n === "Upload" || en(n)))
    return (d = t) => {
      const m = Xr(e, d.current), u = St(e.slots, d, c), {
        attrs: { disabled: f, ...y }
      } = Ie({ option: e, effectData: d });
      if (n === "Upload")
        return S(
          _e.Upload,
          k({ option: e, effectData: d, ...y, ...m, value: d.value, isView: !0, disabled: f }),
          u
        );
      const w = en(n);
      return w && S(
        w.component,
        k(
          Zo(w, {
            ...y,
            ...m,
            value: d.value,
            disabled: f
          })
        ),
        u
      );
    };
  if (n === "Buttons") {
    const d = fn({ config: e, isView: !0 });
    return !!d && ((m = t) => d({ param: m }));
  } else
    return h;
}
const Ct = (e, t) => {
  const { title: n, label: r, labelSlot: a, tooltip: o } = e, s = o && (je(o) ? o : { title: o }), l = n || a || r;
  return l === void 0 ? void 0 : () => [
    ae(l, t),
    o && q("tooltip")(s, {
      title: () => ae(o.title, t),
      default: () => S(
        "span",
        {
          class: "sup-label-tooltip"
        },
        o.icon ? o.icon() : at("info")
      )
    })
  ];
}, Uv = /* @__PURE__ */ new Set([
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
]), Bv = {
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
}, Vv = /* @__PURE__ */ new Set(["Input", "InputNumber", "TextArea", "AutoComplete"]), qv = /* @__PURE__ */ new Set(["Select", "TreeSelect"]), zv = /* @__PURE__ */ new Set(["Select", "TreeSelect", "RadioGroup", "CheckboxGroup"]), Hv = /* @__PURE__ */ new Set([
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
]), Gv = /* @__PURE__ */ new Set(["table", "form", "description"]), Kv = /* @__PURE__ */ new Set([
  "attrs",
  "dynamicAttrs",
  "dataSource",
  "initialValue",
  "options",
  "params",
  "rules",
  "treeData",
  "value"
]), Le = (e) => e !== null && typeof e == "object" && !Array.isArray(e), K = (e, t, n, r) => ({ level: e, code: t, path: n, message: r });
function Fn(e, t, n, r) {
  if (!(!e || typeof e != "object" || r.has(e))) {
    if (r.add(e), Le(e))
      for (const [a, o] of Object.entries(Bv))
        Object.prototype.hasOwnProperty.call(e, a) && n.push(K("warning", "deprecated-api", `${t}.${a}`, `已废弃，${o}。`));
    for (const [a, o] of Object.entries(e))
      typeof o == "function" || Kv.has(a) || (Array.isArray(o) ? o.forEach((s, l) => Fn(s, `${t}.${a}[${l}]`, n, r)) : Le(o) && Fn(o, `${t}.${a}`, n, r));
  }
}
function Yv(e, t, n, r, a) {
  var o, s, l;
  if (!Le(e)) {
    typeof e != "string" && n.push(K("error", "invalid-item", t, "字段配置必须是对象。"));
    return;
  }
  const { type: i } = e;
  if (i !== void 0 && (typeof i != "string" || !a.has(i)) && n.push(K("error", "unknown-type", `${t}.type`, `未知字段类型 ${JSON.stringify(i)}。`)), i === void 0 && r !== "table" && n.push(K("warning", "missing-type", `${t}.type`, "表单或详情字段建议明确配置 type。")), Array.isArray(e.exclude)) {
    const b = e.exclude.filter((g) => !Gv.has(g));
    b.length && n.push(
      K(
        "error",
        "invalid-exclude",
        `${t}.exclude`,
        `只支持 table、form、description，当前包含：${b.join("、")}。`
      )
    );
  } else
    e.exclude !== void 0 && n.push(K("error", "invalid-exclude", `${t}.exclude`, "exclude 必须是字符串数组。"));
  e.visibleIn !== void 0 && !["form", "detail", "both"].includes(e.visibleIn) && n.push(
    K("error", "invalid-visible-in", `${t}.visibleIn`, "visibleIn 只支持 'form'、'detail'、'both'。")
  ), e.unauthorized !== void 0 && !["hide", "disable"].includes(e.unauthorized) && n.push(
    K("error", "invalid-unauthorized", `${t}.unauthorized`, "unauthorized 只支持 'hide'、'disable'。")
  ), zv.has(i) && !e.options && !e.dictName && n.push(K("warning", "missing-options", t, `${i} 未配置 options 或 dictName。`));
  const p = (o = e.attrs) == null ? void 0 : o.placeholder, c = Vv.has(i) ? `请输入${typeof e.label == "string" ? e.label : ""}` : qv.has(i) ? `请选择${typeof e.label == "string" ? e.label : ""}` : void 0;
  c !== void 0 && p === c && n.push(
    K("suggestion", "redundant-default", `${t}.attrs.placeholder`, "与内置 placeholder 相同，可以省略。")
  );
  const v = ["DatePicker", "DateRangePicker"].includes(i) ? "YYYY-MM-DD" : ["TimePicker", "TimeRangePicker"].includes(i) ? "HH:mm:ss" : void 0;
  v && ((s = e.attrs) == null ? void 0 : s.valueFormat) === v && n.push(
    K("suggestion", "redundant-default", `${t}.attrs.valueFormat`, "与内置 valueFormat 相同，可以省略。")
  ), i === "InputGroup" && ((l = e.attrs) == null ? void 0 : l.compact) === !0 && n.push(
    K("suggestion", "redundant-default", `${t}.attrs.compact`, "InputGroup 默认使用紧凑布局，可以省略。")
  ), e.block === !1 && !Hv.has(i) && n.push(K("suggestion", "redundant-default", `${t}.block`, "block: false 是默认行为，可以省略。")), e.breakAfter === !1 && n.push(
    K("suggestion", "redundant-default", `${t}.breakAfter`, "breakAfter: false 是默认行为，可以省略。")
  ), (e.options || e.dictName) && e.tagViewer === !0 && n.push(
    K("suggestion", "redundant-default", `${t}.tagViewer`, "选项字段默认使用 Tag 展示，可以省略。")
  );
  for (const b of ["hidden", "disabled"])
    e[b] === !1 && n.push(K("suggestion", "redundant-default", `${t}.${b}`, `${b}: false 可以省略。`));
  Object.prototype.hasOwnProperty.call(e, "initialValue") && e.initialValue === void 0 && n.push(
    K("suggestion", "redundant-default", `${t}.initialValue`, "initialValue: undefined 可以省略。")
  );
  for (const b of ["attrs", "rowProps"])
    Le(e[b]) && Object.keys(e[b]).length === 0 && n.push(K("suggestion", "empty-config", `${t}.${b}`, `空的 ${b} 配置可以省略。`));
  for (const b of ["rules", "options"])
    Array.isArray(e[b]) && e[b].length === 0 && n.push(K("suggestion", "empty-config", `${t}.${b}`, `空的 ${b} 配置可以省略。`));
  e.subItems && ft(e.subItems, `${t}.subItems`, n, r === "table" ? "form" : r, a), e.columns && ft(e.columns, `${t}.columns`, n, "table", a);
}
function ft(e, t, n, r, a) {
  if (!Array.isArray(e)) {
    n.push(K("error", "invalid-items", t, "必须是数组。"));
    return;
  }
  const o = /* @__PURE__ */ new Map();
  e.forEach((s, l) => {
    const i = `${t}[${l}]`;
    Yv(s, i, n, r, a), !(!Le(s) || typeof s.field != "string" || !s.field) && (o.has(s.field) ? n.push(
      K(
        "warning",
        "duplicate-field",
        `${i}.field`,
        `字段 ${s.field} 与 ${o.get(s.field)} 重复。`
      )
    ) : o.set(s.field, `${t}[${l}].field`));
  });
}
function Wv(e, t = "auto", n = []) {
  var r, a, o, s, l, i, p;
  const c = [];
  if (!Le(e))
    return [K("error", "invalid-schema", "schema", "schema 必须是对象。")];
  const v = /* @__PURE__ */ new Set([...Uv, ...n]);
  Fn(e, "schema", c, /* @__PURE__ */ new WeakSet());
  const b = t === "auto" ? Array.isArray(e.columns) ? "table" : "form" : t;
  if (!["form", "table", "detail"].includes(b))
    return [K("error", "invalid-schema-type", "schema", `未知 schema 类型 ${JSON.stringify(t)}。`)];
  if (e.subSpan === 8 && c.push(K("suggestion", "redundant-default", "schema.subSpan", "subSpan: 8 是默认值，可以省略。")), e.gutter === 16 && c.push(K("suggestion", "redundant-default", "schema.gutter", "gutter: 16 是默认值，可以省略。")), Le(e.params) && Object.keys(e.params).length === 0 && c.push(K("suggestion", "empty-config", "schema.params", "空的 params 配置可以省略。")), b === "table") {
    for (const g of ["editMode", "addMode"])
      Object.prototype.hasOwnProperty.call(e, g) && c.push(K("warning", "deprecated-api", `schema.${g}`, `已废弃，使用 rowEditor.${g}。`));
    Array.isArray(e.columns) ? ft(e.columns, "schema.columns", c, "table", v) : c.push(K("error", "missing-columns", "schema.columns", "表格必须配置 columns。")), e.immediate === !0 && c.push(
      K("suggestion", "redundant-default", "schema.immediate", "immediate: true 是默认值，可以省略。")
    ), e.pagination === !1 && c.push(
      K("suggestion", "redundant-default", "schema.pagination", "pagination: false 是默认值，可以省略。")
    ), ((r = e.attrs) == null ? void 0 : r.rowKey) === "id" && c.push(
      K("suggestion", "redundant-default", "schema.attrs.rowKey", "rowKey: 'id' 是默认值，可以省略。")
    ), ((a = e.attrs) == null ? void 0 : a.size) === "small" && c.push(
      K("suggestion", "redundant-default", "schema.attrs.size", "size: 'small' 是默认值，可以省略。")
    ), ((o = e.attrs) == null ? void 0 : o.tableLayout) === "fixed" && c.push(
      K(
        "suggestion",
        "redundant-default",
        "schema.attrs.tableLayout",
        "tableLayout: 'fixed' 是默认值，可以省略。"
      )
    ), Le(e.pagination) && e.pagination.current === 1 && c.push(
      K("suggestion", "redundant-default", "schema.pagination.current", "分页 current 默认是 1，可以省略。")
    ), Le(e.pagination) && e.pagination.pageSize === 10 && c.push(
      K("suggestion", "redundant-default", "schema.pagination.pageSize", "分页 pageSize 默认是 10，可以省略。")
    ), (s = e.searchForm) != null && s.subItems && ft(e.searchForm.subItems, "schema.searchForm.subItems", c, "form", v), (i = (l = e.rowEditor) == null ? void 0 : l.form) != null && i.subItems && ft(e.rowEditor.form.subItems, "schema.rowEditor.form.subItems", c, "form", v);
  } else
    Array.isArray(e.subItems) ? (((p = e.attrs) == null ? void 0 : p.labelAlign) === "right" && c.push(
      K("suggestion", "redundant-default", "schema.attrs.labelAlign", "labelAlign: 'right' 是默认值，可以省略。")
    ), ft(e.subItems, "schema.subItems", c, b, v)) : c.push(K("error", "missing-sub-items", "schema.subItems", "表单或详情必须配置 subItems。"));
  return c;
}
function Zv(e, t = "auto") {
  return Wv(e, t, Hm());
}
function Ut(e, t, n) {
  var r, a;
  const o = Zv(e, t);
  return o.length && ((r = console.groupCollapsed) == null || r.call(console, `[superform] ${n} schema 诊断：${o.length} 项`), o.forEach(({ level: s, path: l, message: i }) => {
    const p = `[superform] ${l}: ${i}`;
    s === "error" ? console.error(p) : s === "warning" ? console.warn(p) : console.info(p);
  }), (a = console.groupEnd) == null || a.call(console)), o;
}
function ce(e, t = !1) {
  return () => S("svg", {
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
    S("g", [
      ...e.map((n) => S("path", { d: n })),
      ...t ? [S("animateTransform", {
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
const ge = {
  add: ce(["M12 5v14M5 12h14"]),
  remove: ce(["M5 12h14"]),
  delete: ce(["M4 7h16M9 7V4h6v3M6 7l1 14h10l1-14M10 11v6M14 11v6"]),
  edit: ce(["M14 5l5 5M4 20l5-1L21 7l-5-5L4 14z"]),
  detail: ce(["M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z", "M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0"]),
  submit: ce(["M3 11L21 3l-8 18-3-7zM10 14L21 3"]),
  search: ce(["M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0M15 15l6 6"]),
  reset: ce(["M4 10a8 8 0 1 1 1 8M4 4v6h6"]),
  more: ce(["M5 12h.01M12 12h.01M19 12h.01"]),
  expand: ce(["M5 9l7 7 7-7"]),
  collapse: ce(["M5 15l7-7 7 7"]),
  info: ce(["M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0M12 11v6M12 7h.01"]),
  upload: ce(["M12 16V3M7 8l5-5 5 5M4 15v6h16v-6"]),
  attachment: ce(["M8 13l7-7a3 3 0 0 1 4 4L9 20a5 5 0 0 1-7-7L13 2M6 15l8-8"]),
  loading: ce(["M20 12a8 8 0 1 1-8-8"], !0),
  sync: ce(["M4 10a8 8 0 0 1 14-4l2 3M20 3v6h-6M20 14a8 8 0 0 1-14 4l-2-3M4 21v-6h6"]),
  error: ce(["M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0M8 8l8 8M16 8l-8 8"])
}, ea = { confirm: "确定", cancel: "取消" }, Qv = {
  add: { label: "新增", icon: ge.add },
  delete: {
    label: "删除",
    icon: ge.delete,
    confirmText: "确定要删除吗？",
    disabled: (e) => {
      var t;
      return !e.record && !(((t = e.selectedRows) == null ? void 0 : t.length) > 0);
    }
  },
  edit: { label: "修改", icon: ge.edit, disabled: (e) => {
    var t;
    return !e.record && ((t = e.selectedRows) == null ? void 0 : t.length) !== 1;
  } },
  detail: { label: "查看", icon: ge.detail, disabled: (e) => {
    var t;
    return !e.record && ((t = e.selectedRows) == null ? void 0 : t.length) !== 1;
  } },
  submit: { label: "提交", icon: ge.submit },
  search: { label: "查询", icon: ge.search },
  reset: { label: "重置", icon: ge.reset },
  save: { label: "保存" },
  cancel: { label: "取消" },
  expand: {
    label: (e) => e.expanded ? "收起" : "展开",
    icon: (e) => se(e == null ? void 0 : e.expanded) ? ge.collapse() : ge.expand()
  }
}, Jv = () => {
  const e = Ht(
    {},
    Qv,
    Z.ButtonActions,
    ue.defaultButtons
  );
  return Object.entries(ue.defaultButtons || {}).forEach(([t, n]) => {
    Object.prototype.hasOwnProperty.call(n, "icon") && (e[t].icon = n.icon);
  }), e;
};
function Xv(e) {
  const t = Jv();
  return Object.keys(e).forEach((n) => {
    if (t[n])
      if (typeof e[n] == "function")
        t[n].onClick = e[n];
      else {
        const { icon: r, ...a } = e[n];
        Ht(t[n], a), Object.prototype.hasOwnProperty.call(e[n], "icon") && (t[n].icon = r);
      }
    else
      t[n] = typeof e[n] == "function" ? { onClick: e[n] } : e[n];
  }), t;
}
function em(e, t = {}, n = {}) {
  const r = Xv(t), a = [];
  return Array.isArray(e) && e.forEach((o) => {
    const s = typeof o == "string" ? o : o.name, { onClick: l, ...i } = r[s] || {};
    i.attrs = We({ ...n }, i.attrs), typeof o == "object" && Object.assign(i, o, { attrs: { ...i.attrs, ...o.attrs } }), i.name = s;
    const p = L(!1), c = L(!1), v = i.attrs.loading, b = et(v);
    !b && v && (i.attrs.loading = c);
    const g = (m) => {
      b || (c.value = m ? v : !1);
    }, h = { label: i.label, ...typeof o == "object" ? o.meta : {} }, _ = typeof o == "object" ? o.onClick : void 0, d = (m, u, f) => {
      if (p.value)
        return Promise.resolve();
      p.value = !0;
      const y = async () => {
        g(!0);
        try {
          return await u();
        } finally {
          g(!1);
        }
      };
      return m ? new Promise((w, C) => {
        let x = !1;
        const A = (T) => {
          x || (x = !0, p.value = !1, w(T));
        };
        try {
          pe("services").confirm({
            title: () => ae(m, f),
            okText: ea.confirm,
            cancelText: ea.cancel,
            ...Z.Modal,
            onCancel: async (...T) => {
              var $, I;
              const P = await ((I = ($ = Z.Modal) == null ? void 0 : $.onCancel) == null ? void 0 : I.call($, ...T));
              return A(!1), P;
            },
            afterClose: (...T) => {
              var $, I;
              return A(!1), (I = ($ = Z.Modal) == null ? void 0 : $.afterClose) == null ? void 0 : I.call($, ...T);
            },
            onOk: async () => {
              try {
                const T = await y();
                return A(T), T;
              } catch (T) {
                throw C(T), T;
              }
            }
          });
        } catch (T) {
          p.value = !1, C(T);
        }
      }) : y().finally(() => {
        p.value = !1;
      });
    };
    i.onClick = (m) => {
      const u = { ...m, meta: h };
      return _ && l ? d(
        i.confirmText,
        () => _(u, async (f) => l({ ...u, ...f })),
        m
      ) : d(i.confirmText, () => {
        var f;
        return (f = l || _) == null ? void 0 : f(u);
      }, m);
    }, a.push({ ...i, pending: p });
  }), a;
}
function qo(e, t, n, r = {}, a = () => !0) {
  var o, s;
  const { buttonProps: l, limit: i, hidden: p, disabled: c, actions: v } = e, b = e.labelMode === "icon", g = e.labelMode === "label", h = { ...(o = Z.Buttons) == null ? void 0 : o.buttonProps, ...l }, _ = (w) => N(() => !!(typeof w == "function" ? w(t) : se(w))), d = _(p), m = _(c), u = (w) => w.unauthorized ?? (w.invalidDisabled || w.roleMode === "disable" ? "disable" : w.roleMode && "hide"), f = (s = ue.buttonRoles) == null ? void 0 : s.call(ue), y = em(v, n || e.methods, h).flatMap((w, C) => {
    const x = f && w.roleName && !f.includes(w.roleName), A = u(w) ?? u(e) ?? "hide";
    if (x && A === "hide")
      return [];
    const T = _(w.hidden), $ = w.disabled === void 0 ? m : _(w.disabled), I = w.attrs || {}, P = _(I.disabled), D = N(() => !!x || m.value || $.value || P.value), H = typeof w.customRender == "string" ? r[w.customRender] : w.customRender, B = w.dropdown && N(() => {
      const V = typeof w.dropdown == "function" ? w.dropdown(t) : se(w.dropdown);
      return V ? Array.isArray(V) ? Av(V).map(
        (G) => typeof G == "object" && G !== null ? G : { value: G, label: String(G) }
      ) : Object.entries(V).map(([G, oe]) => ({ value: G, label: oe })) : [];
    }), U = {
      get visible() {
        return a() && !d.value && !T.value;
      },
      get disabled() {
        return D.value;
      },
      get loading() {
        return w.pending.value || !!se(I.loading);
      },
      async execute(V, R) {
        var G;
        if (!(!U.visible || U.disabled || U.loading))
          return (G = w.onClick) == null ? void 0 : G.call(w, { ...t, ...R, e: V });
      }
    }, Y = N(() => {
      const V = D.value && w.disabledTooltip ? w.disabledTooltip : w.tooltip || (b && w.icon ? w.label : void 0);
      return ae(V, t);
    }), W = {
      key: C,
      name: w.name,
      label: () => ae(w.label, t),
      icon: w.icon ? () => {
        var V;
        return (V = w.icon) == null ? void 0 : V.call(w, t);
      } : void 0,
      tooltip: () => Y.value,
      get disabled() {
        return U.disabled || w.pending.value;
      },
      get attrs() {
        return Object.fromEntries(Object.entries(I).map(([V, R]) => [V, Q(R)]));
      },
      get menu() {
        return B ? B.value.map((V, R) => ({
          key: R,
          value: V.value,
          label: () => ae(V.label, t),
          icon: V.icon ? () => {
            var G;
            return (G = V.icon) == null ? void 0 : G.call(V, t);
          } : void 0,
          disabled: !!(typeof V.disabled == "function" ? V.disabled(t) : se(V.disabled))
        })) : void 0;
      },
      dropdownProps: w.dropdownProps,
      render: H ? (V) => H({ ...t, props: V }) : void 0,
      onClick: (V) => U.execute(V),
      onSelect: (V, R) => {
        var G;
        const oe = (G = W.menu) == null ? void 0 : G.find((me) => Object.is(me.value, V));
        if (!(!oe || oe.disabled))
          return U.execute(R, { value: V });
      }
    };
    return [{ action: U, uiItem: W }];
  });
  return {
    render() {
      const w = y.filter((A) => A.action.visible).map((A) => A.uiItem);
      if (!w.length)
        return null;
      const C = i == null || !Number.isFinite(i) ? w.length : Math.max(0, Math.floor(i)), x = b && w.length === C + 1 ? C + 1 : C;
      return q("actionGroup")({
        groupProps: e.attrs,
        buttons: w.slice(0, x),
        moreButtons: w.slice(x),
        defaultButtonProps: h,
        divider: e.divider,
        labelOnly: g,
        iconOnly: b,
        moreLabel: () => e.moreLabel === void 0 ? ge.more() : ae(e.moreLabel, t)
      });
    }
  };
}
const Fe = /* @__PURE__ */ J({
  __name: "ButtonGroup",
  props: {
    option: {},
    methods: {},
    effectData: {}
  },
  setup(e) {
    const t = e, n = Array.isArray(t.option) ? { actions: t.option } : t.option, r = qo(n, k(t.effectData || {}), t.methods, we("rootSlots", {}));
    return (a, o) => (Ee(), pt(Ot(() => Q(r).render())));
  }
});
function fn({ config: e, methods: t, effectData: n, isView: r }) {
  const a = Array.isArray(e) ? { actions: e } : e, o = (a == null ? void 0 : a.visibleIn) ?? (a == null ? void 0 : a.validOn);
  if (!a || r && o === "form" || !r && o === "detail")
    return;
  let s = a.actions || [];
  if (o || (s = s.filter((l) => {
    if (typeof l == "string")
      return !r;
    {
      const i = l.visibleIn ?? l.validOn;
      return r ? i !== "form" : i !== "detail";
    }
  })), s.length !== 0)
    return (l = {}) => S(Fe, { option: { ...a, actions: s }, methods: t, effectData: n, ...l });
}
function ta({ option: e, effectData: t, attrs: n }) {
  const r = e.options !== void 0;
  if (!r && !e.labelField)
    return;
  const a = n ?? e.attrs ?? {}, o = r ? dn(e.options, t).optionsRef : N(() => Q(a.options) ?? []);
  return {
    state: r ? N(() => ({ options: o.value })) : void 0,
    bindModel(s) {
      const l = s["onUpdate:labelValue"];
      l && z([() => Q(s.value), o, () => r ? void 0 : Q(a.fieldNames)], ([i, p, c]) => {
        const v = (b) => {
          var g;
          return (g = rr(p, b, e.stringifyValue, c)) == null ? void 0 : g[(c == null ? void 0 : c.label) ?? "label"];
        };
        l(Array.isArray(i) ? i.map(v) : v(i));
      }, { immediate: !0, deep: !0 });
    }
  };
}
const na = {
  options: ta,
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
    const r = L([]);
    return He(() => {
      const a = typeof n == "function" ? n(t) : Q(n);
      Promise.resolve(a).then((o) => {
        r.value = o ?? [];
      });
    }), { state: N(() => ({ treeData: r.value })) };
  },
  switch: (e) => {
    const t = ta(e);
    return t != null && t.state ? {
      bindModel: t.bindModel,
      state: N(() => {
        const [n = { value: !1 }, r = { value: !0 }] = t.state.value.options;
        return { switch: {
          unchecked: { value: n.value, label: n.label },
          checked: { value: r.value, label: r.label }
        } };
      })
    } : t;
  }
};
function tm(e, t) {
  const n = e.map((r) => {
    var a;
    return (a = na[r]) == null ? void 0 : a.call(na, t);
  }).filter(Boolean);
  return {
    bindModel: (r) => n.forEach((a) => {
      var o;
      return (o = a.bindModel) == null ? void 0 : o.call(a, r);
    }),
    state: N(() => Object.assign({}, ...n.map((r) => {
      var a;
      return (a = r.state) == null ? void 0 : a.value;
    })))
  };
}
const nm = J({
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
    const n = tm(e.field.processors || [], {
      option: e.option,
      attrs: k(e.inputAttrs),
      effectData: e.effectData,
      model: e.model
    }), r = nr({
      option: e.option,
      model: e.model,
      effectData: e.effectData
    });
    return n.bindModel(r), () => {
      const a = e.field, o = {
        type: a.type,
        option: e.option,
        model: e.model,
        effectData: e.effectData,
        binding: k(r),
        state: { ...e.state, ...n.state.value }
      }, s = k(a.getAttrs(e.inputAttrs, e.option, o.state));
      return a.render({ ...o, attrs: s, slots: t.slots });
    };
  }
}), ar = J({
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
    return Ke(e.name, e.data || {}), t.slots.default;
  }
});
function rm(e, t) {
  const n = we("inheritOptions", {}), r = e.option.subSpan ?? n.subSpan, a = N(() => e.model.index), o = [], s = [...e.model.children];
  for (let l = 0; l < s.length; l++) {
    const [i, p] = s[l], { type: c, align: v, span: b, hideInForm: g, exclude: h, editable: _ } = i, d = i.block ?? i.blocked, m = i.breakAfter ?? i.wrapping, { parent: u, refData: f } = ne(p), y = Pe({
      parent: e.effectData,
      current: u,
      field: p.refName,
      value: f,
      ...a.value !== void 0 && {
        index: a,
        record: p.refName ? u : f
      }
    });
    if (c === "Hidden" || (h ? h.includes("form") : g)) {
      nr({ option: i, model: p, effectData: y });
      continue;
    }
    const { hidden: w, required: C, attrs: x, nativeAttrs: A, disabled: T } = Ie({
      option: i,
      effectData: y,
      inheritDisabled: n.disabled
    });
    if (c === "Fragment") {
      p.children && s.splice(
        l + 1,
        0,
        ...[...p.children].map(([U, Y]) => [{ ...U, hidden: w, disabled: x.disabled }, Y])
      );
      continue;
    }
    let $ = t(i, p, y, x, { attrs: A, disabled: T });
    if (!$)
      continue;
    if ((bn(c) || er(c)) && _ !== void 0 && _ !== !0) {
      const U = $, Y = N(() => Be(_) ? _(y) : _), W = Gt(i, k({ ...Ye(y), isView: !0 }));
      $ = () => Y.value ? U() : W ? W() : f.value;
    }
    const I = { ...i.colProps, ...b !== void 0 && { span: b } };
    We(I, { span: r }, Z.Col, { span: 8 }), (I.span === 0 || I.flex) && (I.span = void 0);
    let P = $;
    const D = [...ht, "InputList", "InputGroup"].includes(c);
    if (e.fieldWrapper !== "none" && !D && (!d || i.field && i.label)) {
      const U = kt(p.rules, y), Y = N(
        () => {
          var R;
          return Q(x.disabled) || (R = !i.required || C.value ? U : U.slice(1)) == null ? void 0 : R.map(
            (G) => n.ignoreRules ? { ...G, trigger: "none", validateTrigger: !1 } : G
          );
        }
      ), W = ee(Z.FormItem, i.formItemProps), V = Ct(i, y);
      P = () => q("formItem")(
        k({
          ...W,
          name: p.propChain,
          rules: Y,
          colon: !!V
        }),
        {
          default: $,
          label: V
        }
      );
    }
    if (D && e.fieldWrapper !== "none") {
      const U = {
        required: C,
        disabled: x.disabled,
        subSpan: i.subSpan ?? r,
        ignoreRules: n.ignoreRules
      };
      P = () => S(ar, { name: "inheritOptions", data: U }, $);
    }
    const H = d ?? (ht.includes(c) && !i.span), B = !H && c === "InputList" ? { ...I, span: b ?? 24 } : I;
    o.push({
      key: l,
      hidden: w,
      content: P,
      layout: {
        block: H,
        breakAfter: m,
        align: v,
        colProps: B,
        compactProps: I,
        detail: c === "Descriptions"
      }
    });
  }
  return o;
}
function am(e, t) {
  const n = [];
  let r;
  for (const o of e)
    o.layout.block ? (n.push(o), r = void 0) : (r || n.push(r = []), r.push(o), o.layout.breakAfter && (r = void 0));
  const a = () => {
    if (t.layout === "compact")
      return e.map((l) => {
        if (l.hidden.value)
          return !1;
        const { span: i, flex: p, style: c } = l.layout.compactProps, v = Number(i) ? (Number(i) / 24 * 100).toFixed(2) + "%" : void 0;
        return S(l.content, {
          key: l.key,
          style: ee({
            width: v,
            flex: p ?? (i === "auto" ? "1 1 0" : void 0),
            minWidth: 0
          }, c)
        });
      });
    const { gutter: o = 16 } = t.option, s = { gutter: o, ...t.option.rowProps };
    return n.map((l) => Array.isArray(l) ? q("row")(
      { ...s, key: l[0].key },
      {
        default: () => l.map(
          (i) => !i.hidden.value && q("col")(
            ee(
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
    ) : !l.hidden.value && S(
      "div",
      {
        key: l.key,
        class: ["sup-form-section", l.layout.detail && "sup-detail"],
        style: l.layout.align && { textAlign: l.layout.align }
      },
      [l.content()]
    ));
  };
  return {
    // 首次渲染前即可确定是否需要 Group，不依赖 renderNodes 的执行副作用。
    hasWrap: t.layout === "grid" && n.some(Array.isArray),
    renderNodes: a,
    render: () => t.layout === "grid" ? a() : q(t.layout === "compact" ? "compactSpace" : "space")(
      ee(t.layout === "compact" ? { block: !0 } : {}, t.layoutAttrs || {}),
      // 紧凑容器必须直接接收各字段，不能额外套一个组件层阻断首尾上下文。
      { default: () => a().filter(Boolean) }
    )
  };
}
const Ue = J({
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
    const n = rm(e, pn), r = am(n, e);
    return () => t.default ? t.default({ nodes: r.renderNodes().filter(Boolean) }) : e.option.isContainer && r.hasWrap ? S(
      _e.Group,
      {
        class: "sup-form-section",
        option: e.option,
        model: e.model,
        effectData: e.effectData
      },
      { innerContent: r.render }
    ) : r.render();
  }
});
function pn(e, t, n, r, a) {
  const { type: o, render: s } = e;
  if (!o)
    return;
  const l = we("rootSlots", {}), i = St(e.slots, n), p = s ? void 0 : Lo(o), c = p == null ? void 0 : p.processors, v = (a == null ? void 0 : a.attrs) ?? r, b = k({ disabled: a == null ? void 0 : a.disabled }), g = p ? void 0 : en(o), h = s ? typeof s == "function" ? s : l[s] : (g == null ? void 0 : g.component) || _e[o] || (p == null ? void 0 : p.component) || (p == null ? void 0 : p.render);
  let _;
  if (o === "InfoSlot")
    _ = h && (() => h({ props: r, ...n }));
  else if (o === "Text")
    _ = () => S("span", r, t.refData);
  else if (o === "HTML")
    _ = () => S("span", { ...r, innerHTML: t.refData });
  else if (o === "Buttons")
    _ = () => S(Fe, { option: e, effectData: n, ...r });
  else if (ht.includes(o) || o === "InputList")
    _ = () => S(_e[o], k({ option: e, model: t, effectData: n, ...r }), i);
  else if (!h)
    console.error(`组件 '${o}' 配置错误，请检查名称或'render'是否正确！`);
  else if (p && (c != null && c.length))
    _ = () => S(nm, { inputAttrs: v, state: b, field: p, option: e, model: t, effectData: n }, i);
  else {
    const d = nr({ option: e, model: t, effectData: n }), m = { ...r, ...d };
    o === "InputSlot" ? _ = () => h == null ? void 0 : h(k({ props: m, ...n })) : p ? _ = () => {
      const u = { type: o, option: e, model: t, effectData: n, binding: k(d), state: b }, f = k(p.getAttrs(v, e, u.state));
      return p.render({ ...u, attrs: f, slots: i });
    } : (g == null ? void 0 : g.source) === "custom" || (g == null ? void 0 : g.source) === "auto" ? _ = () => S(h, k(Zo(g, m)), i) : _ = () => S(h, k({ option: e, model: t, effectData: n, ...m }), i);
  }
  return _;
}
const om = J({
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
    const n = le(e, "source"), { modelsMap: r } = ot(e.modelsMap, n);
    return Ke("exaProvider", { data: le(e, "source") }), () => {
      var a;
      return S(
        "div",
        { class: ["sup-form-section sup-detail", ((a = t.attrs) == null ? void 0 : a.isContainer) && "sup-container"] },
        S(_e.Descriptions, {
          option: e.option,
          model: { children: r },
          effectData: k({ current: n }),
          isView: !0
        })
      );
    };
  }
}), Ze = J({
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
  setup({ option: e, modelsMap: t, isRoot: n, effectData: r }, a) {
    var o;
    const s = we("exaProvider", {}).attrs, l = we("gridConfig", s), i = {
      ...Z.Descriptions,
      ...l
    }, p = We({ gutter: e.gutter }, e.rowProps || i.rowProps, Z.row, {
      gutter: 16
    }), c = {
      subSpan: e.subSpan,
      ...e.descriptionsProps,
      ...a.attrs
    }, v = We(
      {
        subSpan: e.subSpan ?? i.subSpan,
        rowProps: p,
        ...c
      },
      i
    ), b = v.subSpan ?? (v.subSpan = ((o = Z.Col) == null ? void 0 : o.span) ?? 12), g = Ln(t, e, r), h = [];
    let _, d;
    g.forEach((u, f) => {
      u.node ?? (u.node = () => q("descriptions")(sm(u.group, v))), u.isBlock ? (u.group || u.option.type === "InputList" ? (d || (d = [], h.push(["section", d])), d.push(u)) : (h.push(["block", u]), d = void 0), _ = void 0) : (!_ && h.push(["row", _ = []]), _.push(u), d = void 0);
    });
    const m = () => S(
      ar,
      { name: "gridConfig", data: v },
      () => h.map(([u, f], y) => {
        let w = f.node;
        return u === "row" ? w = () => q("row")(p, {
          default: () => f.map((C, x) => {
            const A = C.option.colProps || {
              span: C.option.span ?? b
            };
            return !Q(C.hidden) && q("col")({ ...Z.Col, ...A, key: x }, { default: C.node });
          })
        }) : u === "section" && (w = () => f.map((C) => !Q(C.hidden) && C.node())), !Q(f.hidden) && (h.length > 1 ? S("div", { class: "sup-form-section", key: y }, w()) : w());
      })
    );
    return n ? () => S(
      _e.Group,
      ee(
        { class: "sup-form-section" },
        {
          option: e,
          model: {},
          effectData: Pe({}),
          isView: !0,
          ...c
        }
      ),
      { innerContent: m }
    ) : m;
  }
});
function sm(e, t) {
  const {
    subSpan: n,
    column: r,
    layout: a,
    bordered: o,
    mode: s = o ? "table" : "default",
    rowProps: l,
    colon: i,
    size: p = "middle",
    tableLayout: c,
    labelCol: v,
    wrapperCol: b,
    ...g
  } = t, h = Math.max(1, Math.floor(Number(r) || (Number(n) ? 24 / Number(n) : 2))), _ = [];
  let d = [], m = 0;
  const u = () => {
    d.length && (m < h && (d[d.length - 1].colspan += h - m), _.push(d), d = [], m = 0);
  };
  return e.forEach(({ option: f, label: y, content: w, hidden: C }, x) => {
    if (Q(C))
      return;
    const A = { ...g, ...f.formItemProps, ...f.descriptionsProps }, T = Number(A.span ?? f.span);
    let $ = T ? Math.ceil(T / (24 / h)) : 1;
    $ = Math.max(1, Math.min(h, $));
    const I = {
      ...A.labelAlign && { textAlign: A.labelAlign },
      ...A.labelStyle
    }, P = { span: A.span ?? f.span, ...A.colProps || f.colProps };
    P.span === 0 || P.flex ? P.span = void 0 : Number(P.span) || (P.span = 24 / h);
    const D = {
      key: x,
      attrs: A,
      colProps: P,
      labelCol: ee(v, A.labelCol, {
        style: I,
        class: { "sup-label-no-colon": A.noColon }
      }),
      wrapperCol: ee(
        b,
        { style: a === "vertical" && { textAlign: A.labelAlign } },
        { style: A.contentStyle },
        A.wrapperCol
      ),
      label: y,
      content: w,
      colspan: $
    };
    m + $ > h && u(), d.push(D), m += $, (f.breakAfter ?? f.wrapping) && u();
  }), u(), { attrs: g, mode: s, layout: a, rowProps: l, colon: i, size: p, tableLayout: c, column: h, rows: _ };
}
function Ln(e, t, n) {
  const r = [];
  let a;
  const o = we("rootSlots", {});
  return [...e].forEach(([s, l], i) => {
    var p, c, v;
    const { type: b = "", field: g, hideInDescription: h, viewRender: _, exclude: d } = s;
    if (b === "Hidden" || h || d != null && d.includes("description"))
      return;
    const { parent: m, refData: u } = Ye(k(l)), f = Pe({
      parent: n,
      current: m,
      isView: !0,
      field: l.refName,
      value: u,
      text: u,
      ..."index" in l && {
        index: l.index,
        record: g ? u : m
      }
    }), { attrs: y, hidden: w } = Ie({ option: s, effectData: f }), C = St(s.slots, f), x = Ct(s, f);
    let A = s.block ?? s.blocked, T;
    const $ = [], I = typeof _ == "string" ? o[_] : _;
    T = I && (() => ae(I, f));
    const P = l.children || ((p = l.listData) == null ? void 0 : p.modelsMap);
    if (b === "InputGroup") {
      if (!_) {
        let D = s.breakAfter ?? s.wrapping;
        const B = (c = Ln(P, s, f)[0].group) == null ? void 0 : c.map(({ option: U, content: Y }) => {
          const W = U.labelSlot || U.label, V = (y == null ? void 0 : y.compact) === !1 && W;
          return D = (U.breakAfter ?? U.wrapping) || D, () => S("span", [V && ae(W, f), V && ": ", Y == null ? void 0 : Y()]);
        });
        T = () => q("space")(
          { direction: D ? "vertical" : "horizontal" },
          {
            default: () => B == null ? void 0 : B.map((U) => U())
          }
        );
      }
      $.push({ option: s, label: x, hidden: w, content: T });
    } else if (b === "Fragment") {
      const D = Ln(P, s, f), H = D[0].group;
      H && (D.shift(), $.push(...H.map((B) => ({ ...B, hidden: w })))), D.length && (a = void 0, r.push(...D));
    } else if (l.children || l.listData || ht.includes(b)) {
      A ?? (A = !s.span);
      const D = [...ht, "InputList"].includes(b) ? b : "Group", H = _e[D], B = () => S(
        H,
        k({
          option: s,
          model: l,
          effectData: f,
          isView: !0,
          ...Z[D],
          ...y
        }),
        C
      );
      T ?? (T = B), b === "InputList" && (!A || x && !(y != null && y.labelIndex) ? $.push({
        option: { ...s },
        label: x,
        hidden: w,
        content: T
      }) : T = B);
    } else {
      const D = lm(s, l, f);
      D && $.push({ option: s, label: x, hidden: w, content: D });
    }
    if (!(!$.length && !T))
      if ($.length && !A)
        a || (a = [], r.push({ option: t, isBlock: !0, group: a })), a.push(...$);
      else {
        if ($.length && x)
          r.push({ option: t, isBlock: A, group: $ });
        else {
          const D = s.align && { textAlign: s.align };
          T = ((v = $[0]) == null ? void 0 : v.content) || T, r.push({
            option: s,
            isBlock: A,
            node: () => S(T, { style: D }),
            hidden: w
          });
        }
        a = void 0;
      }
  }), r;
}
function lm(e, t, n) {
  const { parent: r, refData: a } = Ye(k(t)), o = t.refName ? a : void 0, s = ne(r.value) === ne(n.current) ? n : Pe({
    parent: n,
    current: r,
    text: o,
    value: o,
    field: t.refName,
    isView: !0
  }), l = Gt(e, s);
  return l === !1 ? void 0 : () => l ? l() : String(t.refData ?? "");
}
const Sn = J({
  inheritAttrs: !1,
  props: {
    option: { type: Object, required: !0 },
    model: { type: Object, required: !0 },
    effectData: Object,
    isView: Boolean
  },
  setup({ option: e, model: t, effectData: n, isView: r }, a) {
    const { type: o, label: s, title: l = s, buttons: i, contentAttrs: p } = e, c = o === "Descriptions" || r;
    let v;
    if (i) {
      const b = Array.isArray(i) ? { actions: i } : i;
      o === "Descriptions" && (b.visibleIn ?? (b.visibleIn = b.validOn ?? "detail")), v = fn({
        config: b,
        effectData: n,
        isView: c
      });
    }
    return () => {
      const { style: b, class: g, ...h } = a.attrs, _ = a.slots.title || (l ? Ct(e, n) : void 0), d = a.slots.extra || a.slots.actions || v, m = (i == null ? void 0 : i.placement) === "bottom" ? "bottom" : "title";
      return q("group")({
        attrs: { class: g, style: b },
        contentAttrs: p,
        component: e.component && ne(e.component),
        slots: a.slots,
        title: _,
        extra: d,
        extraPlacement: m,
        extraAlign: (i == null ? void 0 : i.align) || (m === "bottom" ? "center" : _ ? "right" : void 0),
        content: () => a.slots.innerContent ? a.slots.innerContent(h) : a.slots.default ? a.slots.default() : c ? S(Ze, {
          option: { descriptionsProps: h, ...e },
          modelsMap: t.children,
          effectData: n
        }) : S(Ue, { option: e, model: t, effectData: n })
      });
    };
  }
}), zo = {
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
  setup(e, { expose: t, emit: n, slots: r }) {
    var a;
    const o = ke(), s = L({}), {
      option: { onSubmit: l, onReset: i, buttons: p, ...c },
      ignoreRules: v,
      compact: b
    } = e, g = k({ formData: s, current: s }), { attrs: h } = Ie({ option: c, effectData: g }), _ = /* @__PURE__ */ new Set(), d = ($) => {
      if ($)
        return _.add($), () => _.delete($);
    }, m = async ($) => {
      if (!o.value || v || !$.length)
        return;
      const I = pe("form");
      if (!I.validateField)
        throw new Error("当前 UIAdapter 未实现 form.validateField");
      await I.validateField(o.value, $);
    }, u = () => {
      o.value && pe("form").clearValidate(o.value);
    };
    Ke("exaProvider", {
      data: Sa(s),
      attrs: h,
      onSubmit: d,
      validateField: m
    }), Ke("inheritOptions", {
      disabled: h.disabled,
      subSpan: c.subSpan,
      ignoreRules: v
    });
    const f = ($) => Promise.all(
      [..._, l].map(async (I) => {
        const P = await (I == null ? void 0 : I($));
        return P === !1 || P && P.errMessage ? Promise.reject({ message: P && P.errMessage }) : P;
      })
    );
    v && Object.assign(h, { hideRequiredMark: !0, validateTrigger: !1 });
    const y = {
      dataSource: s,
      getNativeInstance: () => o.value,
      async validate() {
        if (!o.value)
          throw new Error("表单尚未挂载或已卸载");
        await pe("form").validate(o.value);
      },
      validateField: m,
      clearValidate: u,
      async submit() {
        await y.validate();
        try {
          await f(s.value);
        } catch (I) {
          throw I && typeof I == "object" && "message" in I && I.message && pe("services").message("error", I.message), I;
        }
        const $ = Ge(s.value);
        return n("submit", $), $;
      },
      setFieldsValue($) {
        return u(), Bo(s.value, $, x);
      },
      resetFields($ = {}) {
        Uo(s.value, $, x), u();
        const I = Ge(s.value);
        return i == null || i(I), n("reset", I), I;
      }
    }, w = Array.isArray(p) ? { actions: p } : p;
    (a = w == null ? void 0 : w.actions) != null && a.length && (c.subItems = [
      ...c.subItems,
      {
        type: "InfoSlot",
        align: w.align || "center",
        block: !0,
        render: () => S(Fe, {
          option: w,
          methods: {
            submit: y.submit,
            reset: y.resetFields,
            search: y.submit
          },
          effectData: g
        }),
        ...w.placement === "inline" && {
          span: "auto",
          block: !1,
          align: w.align || "right"
        }
      }
    ]);
    const { modelsMap: C } = gt(c.subItems, s), x = Ge(s.value);
    z(
      () => Q(e.dataSource ?? e.option.dataSource),
      ($) => {
        $ && (u(), s.value = $);
      },
      { immediate: !0, flush: "sync" }
    );
    const A = k({ ...y }), T = ($) => {
      if (o.value = $, !$) {
        n("register", null);
        return;
      }
      n("register", A);
    };
    return Ca(() => {
      _.clear(), o.value = void 0;
    }), t(A), () => q("form")(
      {
        ref: T,
        class: ["sup-form", b && "sup-form-compact", v && "sup-form-simple"],
        model: s.value,
        labelAlign: "right",
        ...h
      },
      {
        ...r,
        default: () => S(Ue, {
          option: c,
          model: { refData: s, children: C },
          effectData: g
        })
      }
    );
  }
}, im = J({
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
    const { option: r, model: a, compact: o } = e, { slots: s } = r;
    let l = a, i = kt(a.rules, e.effectData), p = le(a, "propChain");
    const c = {}, v = {
      type: "object",
      required: !1,
      fields: {}
    }, b = a.refName !== void 0 || a.index !== void 0;
    if (a.children && o) {
      for (const u of a.children.values())
        if ((n = u.rules) != null && n.length && u.fieldName) {
          u.rules[0].required && (v.required = !0);
          const f = k({
            ...e.effectData,
            parent: e.effectData,
            current: le(u, "parent"),
            field: u.fieldName,
            value: le(u, "refData")
          }), y = v.fields[u.fieldName] = kt(u.rules, f);
          if (!b) {
            p = le(u, "propChain"), i = y, l = u;
            break;
          }
        }
    } else
      c.style = "margin: 0";
    b && (i = (i || []).concat([v])), i || (i = []), c.required = i.some((u) => u.required);
    const g = we("inheritOptions", {}), h = N(
      () => e.disabled ? void 0 : (!r.required || Q(g.required) ? i : i.slice(1)).map(
        (u) => g.ignoreRules ? { ...u, trigger: "none", validateTrigger: !1 } : u
      )
    ), _ = ee(Z.FormItem, r.formItemProps, c), d = Ct(r, e.effectData), m = we("exaProvider", {});
    return z(
      () => Q(l.refData),
      () => {
        var u, f;
        !e.disabled && ((u = h.value) != null && u.length) && ((f = m.validateField) == null || f.call(m, p.value).catch(() => {
        }));
      },
      { deep: !0, flush: "post" }
    ), () => q("formItem")(
      {
        ..._,
        rules: h.value,
        name: p.value
      },
      {
        label: d,
        default: (s == null ? void 0 : s.default) || (() => S(Ue, {
          option: r,
          model: a,
          effectData: e.effectData,
          layout: o ? "compact" : "space",
          fieldWrapper: o ? "none" : "formItem",
          layoutAttrs: t
        }))
      }
    );
  }
});
function vn(e, t) {
  const n = Array.isArray(t) ? { actions: t } : t;
  return {
    ...e,
    ...n,
    buttonProps: { ...e.buttonProps, ...n == null ? void 0 : n.buttonProps }
  };
}
const um = J({
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
    const { model: t, option: n, isView: r, effectData: a, labelIndex: o } = e, { columns: s, rowButtons: l, label: i, labelSlot: p, compact: c, slots: v, ...b } = n, { modelsMap: g } = t.listData, h = s[0], _ = g.get(h), d = s.length === 1 && h.field === "$index", m = !o && (i || p), u = le(t, "refData");
    let f = [];
    const y = {
      add: {
        onClick({ index: T }) {
          u.value.splice(T + 1, 0, d ? void 0 : {}), f.splice(T + 1, 0, void 0);
        },
        icon: () => at("add")
      },
      delete: {
        disabled: () => u.value.length === 1,
        confirmText: "",
        icon: () => at("remove"),
        onClick({ index: T }) {
          u.value.splice(T, 1), f.splice(T, 1);
        }
      }
    }, w = !r && l !== !1 && vn(
      {
        type: "Buttons",
        colProps: { flex: "0" },
        labelMode: "icon",
        ...Z.rowButtons,
        methods: y,
        actions: ["add", "delete"]
      },
      l
    ), C = ke([]), x = (T, $) => {
      const I = [...t.propChain, $], P = k({ ...d ? _ : {}, index: $, parent: u, propChain: I }), D = d ? N({
        get: () => u.value[P.index],
        set: (Y) => {
          u.value[P.index] = Y;
        }
      }) : L(T);
      P.refData = D;
      const H = /* @__PURE__ */ new Map();
      let B;
      d ? (B = { ...h }, Object.assign(P, { initialValue: _.initialValue, rules: _.rules })) : g.size === 1 && !h.field && [...ht, "InputGroup", "InputList"].includes(h.type) ? (B = { ...h }, Object.assign(P, {
        initialValue: _.initialValue,
        rules: _.rules,
        listData: _.listData,
        children: ot(_.children || /* @__PURE__ */ new Map(), D, I).modelsMap
      })) : (B = { type: c ? "InputGroup" : "Group", initialValue: void 0, span: "auto" }, P.children = ot(g, D, I).modelsMap), H.set(B, P), o && (B.label ?? (B.label = i), B.labelSlot ?? (B.labelSlot = p || (({ index: Y }) => B.label + String(Y + 1)))), w && H.set(w, k({ parent: u, index: $ }));
      const U = k({ parent: u, children: H, index: $, propChain: I });
      return {
        children: U.children,
        model: U,
        refData: D,
        key: mt(12),
        effectData: k({ parent: a, current: u, index: $ })
      };
    };
    if (d)
      z(
        [() => u.value, () => u.value.length, () => [...t.propChain]],
        () => {
          u.value.length === 0 && u.value.push(void 0), C.value = u.value.map((T, $) => {
            const I = f[$];
            return I ? (Nt(I.model, [...t.propChain, $], $), I.effectData.index = $, I) : x(T, $);
          }), f = [...C.value];
        },
        { immediate: !0 }
      );
    else {
      const T = /* @__PURE__ */ new WeakMap();
      z(
        [() => [...u.value], () => u.value.length, () => [...t.propChain]],
        () => {
          u.value.length === 0 && u.value.push({}), C.value = u.value.map(($, I) => {
            let P = T.get(ne($));
            return P ? (P.refData.value = $, Nt(P.model, [...t.propChain, I], I), P.effectData.index = I) : (P = x($, I), T.set(ne($), P)), P;
          });
        },
        { immediate: !0 }
      );
    }
    const A = () => C.value.map(({ model: T, effectData: $, key: I }) => S(Ue, { model: T, option: { subSpan: "auto", ...n }, effectData: $, key: I }));
    if (r) {
      if (m)
        if (d) {
          const { label: I, labelSlot: P = I } = s[0], D = s[0].breakAfter ?? s[0].wrapping;
          return () => q("space")(
            { direction: D ? "vertical" : "horizontal" },
            {
              default: () => C.value.map(({ refData: H, key: B }, U) => {
                const Y = {
                  ...a,
                  parent: a,
                  current: u.value,
                  field: s[0].field,
                  value: H.value,
                  index: U,
                  record: H.value
                };
                return S("span", { key: B }, [ae(P, Y), P ? ": " : "", H.value]);
              })
            }
          );
        } else
          return () => C.value.map(({ children: I, key: P }) => S(Ze, {
            key: P,
            modelsMap: I,
            option: n,
            effectData: a
          }));
      const T = {}, $ = N(() => new Map(C.value.flatMap(({ children: I }) => [...I])));
      return () => S(Ze, {
        option: { ...b, label: i, labelSlot: p },
        modelsMap: $.value,
        effectData: a,
        ...T
      });
    } else if (m) {
      const T = /* @__PURE__ */ new Map([
        [
          {
            ...b,
            formItemProps: { ...b.formItemProps, style: "margin: 0" },
            label: i,
            labelSlot: p,
            type: "InfoSlot",
            block: !1,
            span: 24,
            // FormItem 对单个与多个子节点采用不同包装；固定根节点，避免 1/2 行切换时重挂首行并清除校验状态。
            render: () => S("div", { style: "width: 100%" }, A())
          },
          t
        ]
      ]);
      return () => S(Ue, { model: { children: T }, option: n, effectData: a });
    } else
      return A;
  }
}), cm = J({
  inheritAttrs: !1,
  props: {
    option: { type: Object, required: !0 },
    model: { type: Object, required: !0 },
    effectData: Object,
    isView: Boolean
  },
  setup(e, { attrs: t, slots: n }) {
    return () => {
      const { option: r, model: a, effectData: o, isView: s } = e, { title: l = r.label, buttons: i } = r;
      return q("card")({
        attrs: t,
        slots: n,
        title: n.title || (l ? () => ae(l, o) : void 0),
        extra: n.extra || (i && !s ? () => S(Fe, { option: i, effectData: o }) : void 0),
        content: n.default || (() => s ? S(Ze, { option: r, modelsMap: a.children, effectData: o }) : S(Ue, { option: r, model: a, effectData: o }))
      });
    };
  }
}), dm = J({
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
    var n, r;
    const a = L(), o = Wt({
      ...e.schema,
      dataSource: e.dataSource || e.model || ((n = e.schema) == null ? void 0 : n.dataSource),
      attrs: ee({ ...Z.Form }, { ...(r = e.schema) == null ? void 0 : r.attrs })
    });
    ue.schemaDiagnostics && e.schema && Ut(e.schema, "form", "SuperForm");
    const s = {
      setOption: (c) => {
        var v;
        ue.schemaDiagnostics && Ut(c, "form", "SuperForm"), We(o, c), o.attrs = ee(o.attrs, { ...c.attrs }, { ...(v = e.schema) == null ? void 0 : v.attrs });
      }
    };
    Ke("rootSlots", t.slots), t.emit("register", s);
    const l = (c) => {
      a.value = c, t.emit("register", s, c);
    };
    wa(() => t.expose(a.value));
    const i = N(() => e.isContainer || o.isContainer);
    return () => o.subItems && S(
      _e.Form,
      {
        option: o,
        // dataSource: formData.value,
        onRegister: l,
        compact: e.compact,
        ignoreRules: e.ignoreRules,
        class: { "sup-container": i.value }
      },
      St(o.slots, Pe(), t.slots)
    );
  }
});
function fm(e) {
  const [t, n] = Vo(), r = Promise.resolve(typeof e == "function" ? e() : e), a = (s, l) => {
    if (s)
      t.value || r.then(s.setOption), t.value = l;
    else
      return (i, p) => S(dm, { ...i, onRegister: a }, p == null ? void 0 : p.slots);
  }, o = async (s, l) => {
    const i = await n();
    if (s && s in i)
      return typeof i[s] == "function" ? i[s](l) : i[s];
    if (!s)
      return i;
  };
  return [
    a,
    {
      dataSource: N(() => {
        var s;
        return (s = t.value) == null ? void 0 : s.dataSource;
      }),
      getForm: n,
      asyncCall: o,
      getData() {
        var s;
        return se((s = t.value) == null ? void 0 : s.dataSource);
      },
      submit: () => o("submit"),
      validate: () => o("validate"),
      validateField: (s) => o("validateField", s),
      clearValidate: () => o("clearValidate"),
      getNativeInstance: () => o("getNativeInstance"),
      resetFields: (s) => o("resetFields", s),
      setFieldsValue: (s) => o("setFieldsValue", s),
      /**
       * @deprecated 使用`resetFields`
       */
      setData(s) {
        o("resetFields", s);
      }
    }
  ];
}
function or(e, { buttons: t, ...n } = {}) {
  const r = L(!1), a = k({ ...n, ...Z.Modal }), o = L(), s = t && (() => S(Fe, { option: t, effectData: { modalRef: o } })), l = L(!1), i = () => {
    if (!(l.value || c))
      return l.value = !0, Promise.resolve().then(() => {
        var m;
        return (m = a.onOk) == null ? void 0 : m.call(a);
      }).then((m) => {
        m !== !1 && (r.value = !1);
      }).catch((m) => console.error(m)).finally(() => l.value = !1);
  }, p = () => a.icon ? [a.icon(), ae(a.title)] : ae(a.title);
  let c;
  const v = (...m) => l.value ? Promise.resolve(!1) : c || (c = Promise.resolve().then(() => {
    var u;
    return (u = a.onCancel) == null ? void 0 : u.call(a, ...m);
  }).then((u) => (u !== !1 && (r.value = !1), u)).catch((u) => (console.error(u), !1)).finally(() => {
    c = void 0;
  })), b = (m) => {
    if (m)
      r.value = !0;
    else if (r.value)
      return v();
  };
  return {
    config: a,
    modalRef: o,
    modalSlot: (m, u) => q("modal")(
      {
        ref: o,
        visible: r.value,
        class: "sup-modal",
        "onUpdate:visible": b,
        confirmLoading: l.value,
        ...a,
        title: void 0,
        ...m,
        onOk: i,
        onCancel: v
      },
      { footer: s, title: p, ...u == null ? void 0 : u.slots, ...e && { default: e } }
    ),
    setModal: (m) => {
      Object.assign(a, m);
    },
    closeModal: () => (r.value = !1, Ne()),
    openModal: async (m) => (Object.assign(a, m), r.value = !0, Ne())
  };
}
function Ho(e, t) {
  var n;
  const { modalSlot: r, openModal: a, modalRef: o, closeModal: s, setModal: l, config: i } = or(e, t), p = _a(), c = document.createElement("div");
  let v;
  const b = rt().modal, g = (n = b == null ? void 0 : b.useContext) == null ? void 0 : n.call(b), h = () => {
    const u = i.afterClose;
    i.destroyOnClose && d(), u == null || u();
  }, _ = (u) => {
    var f;
    return ((f = b == null ? void 0 : b.wrapContext) == null ? void 0 : f.call(
      b,
      (y = {}) => r({ ...u, ...y, afterClose: h }, {}),
      g,
      u
    )) ?? r({ ...u, afterClose: h }, {});
  }, d = () => {
    An(null, c), c.remove(), v = null;
  };
  return Nn(d), {
    modalRef: o,
    openModal: (u) => v ? a(u) : (v = xa(_), v.appContext = p == null ? void 0 : p.appContext, document.body.appendChild(c), An(v, c), Ne(() => a(u))),
    modalSlot: r,
    closeModal: s,
    setModal: l
  };
}
function Ab(e, t = {}) {
  const { title: n, ...r } = e, { onSubmitError: a, ...o } = t, [s, l] = fm(r), i = Ho(s(), { maskClosable: !1, title: n, ...o });
  return { ...i, openModal: ({ data: c, onOk: v = t.onOk, onSubmitError: b = a, ...g } = {}) => {
    const h = async () => {
      try {
        const _ = await l.submit();
        return v ? await v(_) : _;
      } catch (_) {
        try {
          await (b == null ? void 0 : b(_));
        } catch (d) {
          console.error(d);
        }
        throw _;
      }
    };
    return l.resetFields(c), i.openModal({ ...g, onOk: h });
  }, formActions: l };
}
const Cn = J({
  name: "CollectionList",
  inheritAttrs: !1,
  props: {
    option: { type: Object, required: !0 },
    model: { type: Object, required: !0 },
    effectData: { type: Object, required: !0 },
    isView: Boolean
  },
  setup(e, { attrs: t, slots: n }) {
    const r = le(e.model, "refData"), a = ke([]), o = /* @__PURE__ */ new WeakMap(), s = L(), l = L([]), i = L(), p = L({}), c = L(0), v = e.option.editModal && or(
      () => {
        var u, f, y;
        return S(zo, {
          key: c.value,
          option: {
            ...(u = e.option.editModal) == null ? void 0 : u.form,
            subItems: ((y = (f = e.option.editModal) == null ? void 0 : f.form) == null ? void 0 : y.subItems) || e.option.columns
          },
          dataSource: p.value,
          onRegister: (w) => {
            i.value = w;
          }
        });
      },
      { maskClosable: !1, ...e.option.editModal.modalProps }
    ), b = (u) => {
      Ne(() => {
        const f = a.value.find((y) => ne(y.model.refData) === ne(u));
        f && (e.option.type === "TabList" && (s.value = f.key), e.option.type === "CollapseList" && !l.value.includes(f.key) && (l.value = [...l.value, f.key]));
      });
    }, g = (u, f) => {
      var y, w;
      if (!(e.isView || !v))
        return p.value = Ge((u == null ? void 0 : u.model.refData) || {}), c.value++, v.openModal({
          title: ((w = (y = e.option.editModal) == null ? void 0 : y.modalProps) == null ? void 0 : w.title) || (u ? "编辑" : "新增"),
          onOk: async () => {
            if (e.isView)
              return;
            const C = await i.value.submit();
            if (u) {
              const x = a.value.indexOf(u);
              if (x < 0)
                throw new Error("当前记录已删除");
              Object.assign(r.value[x], C);
            } else {
              const x = C;
              if (f === null)
                r.value.unshift(x);
              else {
                const A = a.value.indexOf(f);
                if (A < 0)
                  throw new Error("新增位置对应的记录已删除");
                r.value.splice(A + 1, 0, x);
              }
              b(x);
            }
          }
        });
    }, h = {
      add: ({ listItemKey: u } = {}) => {
        if (e.isView)
          return;
        const f = a.value.find((w) => w.key === u);
        if (u !== void 0 && !f)
          throw new Error("新增位置对应的记录已删除");
        if (v)
          return g(void 0, f || null);
        const y = {};
        f ? r.value.splice(a.value.indexOf(f) + 1, 0, y) : r.value.unshift(y), b(y);
      },
      edit: ({ listItemKey: u }) => {
        const f = a.value.find((y) => y.key === u);
        if (f)
          return g(f);
      },
      delete: ({ listItemKey: u }) => {
        const f = a.value.findIndex((y) => y.key === u);
        !e.isView && f >= 0 && r.value.splice(f, 1);
      }
    }, _ = we("rootSlots", {}), d = (u, f, y) => {
      if (u !== !1)
        return qo(
          vn({ ...Z.rowButtons, actions: y }, u),
          f,
          h,
          _,
          () => !e.isView
        );
    }, m = d(e.option.buttons, e.effectData, ["add"]);
    return z(
      [() => [...r.value], () => [...e.model.propChain]],
      () => {
        var u;
        const f = a.value, y = f.findIndex((A) => A.key === s.value), w = /* @__PURE__ */ new Map(), C = /* @__PURE__ */ new Set();
        a.value = r.value.map((A, T) => {
          const $ = ne(A), I = w.get($) || 0;
          w.set($, I + 1);
          const P = o.get($) || [];
          let D = P[I];
          if (!D) {
            const H = L(A), { modelsMap: B } = ot(e.model.listData.modelsMap, H, e.model.propChain, T);
            D = {
              key: I ? mt(12) : $e(A, String(t.rowKey || "id")) ?? mt(12),
              model: k({ refData: H, children: B, index: T, propChain: [...e.model.propChain, T] }),
              effectData: k({ parent: e.effectData, current: r, index: T, record: A })
            }, D.buttons = d(
              e.option.rowButtons,
              D.effectData,
              v ? ["add", "edit", "delete"] : ["add", "delete"]
            ), P[I] = D, o.set($, P);
          }
          return C.has(D.key) && (D.key = mt(12)), C.add(D.key), D.effectData.listItemKey = D.key, D.model.refData = A, D.effectData.record = A, Nt(D.model, [...e.model.propChain, T], T), D.effectData.index = T, D;
        }), a.value.some((A) => A.key === s.value) || (s.value = (u = a.value[Math.min(Math.max(y, 0), a.value.length - 1)]) == null ? void 0 : u.key);
        const x = f.findIndex(
          (A) => l.value.includes(A.key) && !a.value.some((T) => T.key === A.key)
        );
        if (l.value = l.value.filter((A) => a.value.some((T) => T.key === A)), x >= 0 && a.value.length) {
          const A = a.value[Math.min(x, a.value.length - 1)].key;
          l.value.includes(A) || l.value.push(A);
        }
      },
      { immediate: !0 }
    ), () => {
      const { option: u, isView: f } = e, { span: y = 24 } = t, w = { ...t };
      delete w.rowKey, delete w.span;
      const C = u.title ?? u.label, x = !f && m ? () => m.render() : void 0, A = n.title || C || x ? () => q("space")(
        {},
        {
          default: () => [n.title ? n.title() : ae(C, e.effectData), x == null ? void 0 : x()]
        }
      ) : void 0, T = a.value.map((I, P) => ({
        key: I.key,
        title: () => ae(u.titleField ? $e(I.model.refData, u.titleField) : String(P + 1), I.effectData),
        extra: !f && u.type !== "TabList" && I.buttons ? () => I.buttons.render() : void 0,
        content: () => f || v ? S(Ze, { option: u, modelsMap: I.model.children, effectData: I.effectData }) : S(Ue, { option: u, model: I.model, effectData: I.effectData })
      })), $ = () => T.length ? u.type === "TabList" ? q("tabs")({
        attrs: w,
        items: T,
        activeKeys: s.value,
        onActiveChange: (I) => {
          s.value = I;
        },
        extra: f ? void 0 : () => {
          var I, P;
          return (P = (I = a.value.find((D) => D.key === s.value)) == null ? void 0 : I.buttons) == null ? void 0 : P.render();
        }
      }) : u.type === "CollapseList" ? q("collapse")({
        attrs: w,
        items: T,
        activeKeys: l.value,
        onActiveChange: (I) => {
          l.value = Array.isArray(I) ? I : [I];
        }
      }) : q("row")(
        { gutter: u.gutter ?? [16, 16], ...u.rowProps },
        {
          default: () => T.map(
            (I) => q("col")(
              { key: I.key, span: y },
              {
                default: () => q("card")({
                  attrs: w,
                  title: I.title,
                  extra: I.extra,
                  content: I.content
                })
              }
            )
          )
        }
      ) : q("empty")();
      return [q("group")({ title: A, content: $ }), v && S(v.modalSlot)];
    };
  }
}), pm = J({
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
    const { model: n, isView: r, effectData: a, labelIndex: o, rowKey: s = "" } = e, { columns: l, rowButtons: i, slots: p, ...c } = e.option, { modelsMap: v, rules: b } = n.listData, g = le(n, "refData"), h = {
      add: {
        icon: () => at("add"),
        onClick({ index: y }) {
          g.value.splice(y + 1, 0, {}), g.value = [...ne(g.value)];
        }
      },
      delete: {
        hidden: () => g.value.length === 1,
        disabled: !1,
        confirmText: "",
        icon: () => at("remove"),
        onClick({ index: y }) {
          g.value = g.value.filter((w, C) => C !== y);
        }
      }
    }, _ = !r && i !== !1 && vn(
      {
        type: "Buttons",
        labelMode: "icon",
        ...Z.rowButtons,
        methods: h,
        actions: ["add", "delete"]
      },
      i
    ), d = /* @__PURE__ */ new WeakMap(), m = L([]);
    z(
      [() => [...g.value], () => [...n.propChain]],
      () => {
        const y = g.value;
        y.length === 0 && y.push({}), m.value = y.map((w, C) => {
          const x = ne(w), A = d.get(x);
          if (A)
            return A.refData.value = w, Nt(A.model, [...n.propChain, C], C), A.effectData.index = C, A;
          const T = L(w), { modelsMap: $ } = ot(v, T, n.propChain, C), I = {
            key: w[s] || mt(12),
            refData: T,
            model: k({ refData: T, children: $, index: C, propChain: [...n.propChain, C] }),
            effectData: k({
              parent: a,
              current: g,
              index: C,
              record: w
            })
          };
          return d.set(x, I), I;
        });
      },
      {
        immediate: !0
      }
    );
    const u = {
      ...c,
      type: "Group",
      buttons: _,
      subItems: l
    }, f = c.title || c.label;
    return typeof f == "string" && o && (u.title = ({ index: y }) => f + String(y + 1)), () => m.value.map(({ model: y, effectData: w, key: C }) => S(_e.Group, { model: y, option: u, effectData: w, key: C, isView: r }, t.slots));
  }
}), vm = /* @__PURE__ */ J({
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
    const r = L(e.option.activeKey), a = [], o = (l, i, p) => {
      a[l] = p ? void 0 : i, p && r.value === i && (r.value = a.find(Boolean));
    }, s = [...e.model.children].map(([l, i], p) => {
      const {
        key: c,
        field: v,
        label: b,
        icon: g
      } = l, h = Pe({
        parent: e.effectData,
        current: le(i, "parent"),
        field: i.refName,
        value: i.refData
      }), {
        hidden: _,
        attrs: d
      } = Ie({
        option: l,
        effectData: h
      }), m = c || v || String(p), u = () => [g == null ? void 0 : g(), ae(b, h)];
      return He(() => o(p, m, Q(_) || Q(d.disabled))), {
        attrs: k(d),
        key: m,
        title: u,
        hidden: _,
        option: l,
        model: i,
        effectData: h
      };
    });
    return wa(() => {
      r.value ?? (r.value = a.find(Boolean));
    }), () => q("tabs")({
      attrs: t,
      slots: n,
      content: n.default,
      activeKeys: r.value,
      onActiveChange: (l) => {
        r.value = l;
      },
      extra: n.extra || (!e.isView && e.option.buttons ? () => S(Fe, {
        option: e.option.buttons,
        effectData: e.effectData
      }) : void 0),
      // 显隐和禁用属于 Schema 语义，两个 Adapter 消费相同的有效子项。
      items: s.filter(({
        hidden: l
      }) => !l.value).map(({
        attrs: l,
        key: i,
        title: p,
        option: c,
        model: v,
        effectData: b
      }) => ({
        key: i,
        attrs: l,
        title: p,
        disabled: Q(l.disabled),
        content: () => e.isView ? S(Ze, {
          option: c,
          modelsMap: v.children,
          effectData: b
        }) : S(Ue, {
          option: c,
          model: v,
          effectData: b
        })
      }))
    });
  }
}), Mt = (e, ...t) => ev(e, ...t, (n, r, a, o) => {
  if (r === void 0)
    o[a] = void 0;
  else if (Array.isArray(n))
    return r;
});
function mm({
  childrenMap: e,
  orgList: t,
  listener: n,
  rowEditor: r,
  rowKey: a
}) {
  const o = ke(), s = N(() => {
    var d;
    return !!((d = o.value) != null && d.isEdit);
  }), l = (d) => {
    const m = o.value;
    return m != null && m.isEdit && a(d) === m.key ? m : {
      isEdit: !1
    };
  }, i = N(() => {
    const d = [...t.value], m = o.value;
    if (!(m != null && m.isEdit))
      return d;
    if (m.isNew) {
      const u = m.anchorKey === void 0 ? d.length - 1 : d.findIndex((f) => a(f) === m.anchorKey);
      d.splice(u < 0 ? Math.min(m.index, d.length) : u + 1, 0, m.record);
    } else
      d.some((u) => a(u) === m.key) || d.splice(Math.min(m.index, d.length), 0, m.record);
    return d;
  }), p = (d, m, u) => {
    const f = k(Ge(m)), {
      modelsMap: y
    } = No(ne(e), f);
    o.value = Wt({
      record: d,
      key: a(d),
      editData: f,
      modelsMap: y,
      forms: Wt({}),
      isEdit: !0,
      saving: !1,
      ...u
    });
  }, c = {
    add({
      index: d,
      record: m,
      resetData: u
    } = {}) {
      if (s.value)
        return;
      const f = m ?? (d === void 0 ? void 0 : t.value[d]);
      if (d !== void 0 && !f)
        throw new Error("新增位置已失效，请重新选择插入位置");
      const y = {
        ...u
      }, w = f && a(f), C = f ? t.value.findIndex((x) => a(x) === w) + 1 : t.value.length;
      p(y, y, {
        isNew: !0,
        index: C,
        anchorKey: w
      });
    },
    edit({
      record: d,
      selectedRows: m,
      resetData: u
    }) {
      if (s.value)
        return;
      const f = d || (m == null ? void 0 : m[0]), y = f ? t.value.findIndex((w) => a(w) === a(f)) : -1;
      if (y < 0)
        throw new Error("编辑记录已不存在，请重新选择");
      p(t.value[y], Mt({}, t.value[y], u), {
        isNew: !1,
        index: y
      });
    },
    delete({
      record: d,
      selectedRows: m
    }) {
      if (!s.value)
        return n.onDelete(d ? [d] : m);
    }
  }, v = {
    add: {
      disabled: () => s.value,
      onClick: c.add
    },
    edit: {
      disabled: (d) => {
        var m;
        return s.value || !(d.record || ((m = d.selectedRows) == null ? void 0 : m.length) === 1);
      },
      onClick: c.edit
    },
    delete: {
      disabled: (d) => {
        var m;
        return s.value || !(d.record || ((m = d.selectedRows) == null ? void 0 : m.length) > 0);
      },
      onClick: c.delete
    }
  }, b = [{
    name: "save",
    attrs: {
      loading: !0
    },
    onClick: async (d) => {
      var m;
      const {
        record: u
      } = d, f = l(u);
      if (!(!f.isEdit || f.saving)) {
        f.saving = !0;
        try {
          const y = pe("form");
          if (await Promise.all(Object.values(f.forms).map((x) => y.validate(x))), await ((m = r == null ? void 0 : r.onSave) == null ? void 0 : m.call(r, {
            ...d,
            isNew: f.isNew
          })) === !1)
            return !1;
          const C = Ge(ne(f.editData));
          if (f.isNew) {
            const x = f.anchorKey === void 0 ? void 0 : t.value.findIndex((A) => a(A) === f.anchorKey);
            if (x === -1)
              throw new Error("新增锚点已不存在，请取消后重新选择插入位置");
            await n.onSave(C, x), f.isNew = !1;
          } else {
            const x = t.value.find((A) => a(A) === f.key);
            if (!x)
              throw new Error("编辑记录已被移除，请取消本次编辑");
            await n.onUpdate(C, x);
          }
          f.isEdit = !1, o.value = void 0;
        } catch (y) {
          throw y instanceof Error && pe("services").message("error", y.message), y;
        } finally {
          f.saving = !1;
        }
      }
    }
  }, {
    name: "cancel",
    disabled: ({
      record: d
    }) => l(d).saving,
    onClick: async (d) => {
      var m;
      const u = l(d.record);
      if (!(!u.isEdit || u.saving)) {
        u.saving = !0;
        try {
          if (await ((m = r == null ? void 0 : r.onCancel) == null ? void 0 : m.call(r, {
            ...d,
            isNew: u.isNew
          })) === !1)
            return;
          u.isEdit = !1, o.value = void 0;
        } finally {
          u.saving = !1;
        }
      }
    }
  }], g = (d, m) => l(d.record).isEdit ? S(Fe, {
    key: "edit",
    option: {
      ...m,
      actions: b
    },
    effectData: d
  }) : null, h = /* @__PURE__ */ J({
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
      editInfo: m,
      viewRender: u
    }) {
      const {
        editable: f = !0
      } = d, {
        modelsMap: y,
        forms: w
      } = m, C = y.get(ne(d)), {
        index: x,
        parent: A,
        refData: T
      } = Ye(C), $ = C.propChain.join("."), I = Pe({
        current: A,
        value: T,
        index: x
      }), {
        attrs: P,
        hidden: D,
        nativeAttrs: H,
        disabled: B
      } = Ie({
        option: d,
        effectData: I
      }), U = N(() => !D.value && (Be(f) ? f(I) : f)), Y = pn(d, C, I, P, {
        attrs: H,
        disabled: B
      }), W = kt(C.rules, I), V = N(() => Q(P.disabled) || Q(D) ? [] : W);
      return () => U.value ? q("form")({
        ref: (R) => {
          R ? w[$] = R : delete w[$];
        },
        model: m.editData
      }, {
        default: () => q("formItem")({
          name: C.propChain,
          rules: V.value,
          wrapperCol: {}
        }, {
          default: Y
        })
      }) : u ? u({
        ...I,
        isView: !0
      }) : T.value;
    }
  });
  return {
    list: i,
    methods: c,
    buttonMethods: v,
    getEditRender: (d, m) => {
      if (sr(d.type) === "enhanced" || bn(d.type) || d.type === "InputSlot")
        return ({
          record: u
        }) => {
          const f = l(u);
          if (f.isEdit)
            return S(h, {
              key: f.key,
              option: d,
              editInfo: f,
              viewRender: m
            });
        };
    },
    editButtonsSlot: g
  };
}
function bm({ rowKey: e, option: t, listener: n, orgList: r }) {
  const a = ke(), o = t.rowEditor, s = (o == null ? void 0 : o.form) || t.editForm || t.formSchema || {};
  s.subItems = s.subItems || t.columns.filter((d) => {
    var m;
    return !(d.hideInForm || (m = d.exclude) != null && m.includes("form"));
  });
  let l;
  const i = (d) => {
    a.value ? a.value.resetFields(d) : l = d;
  }, p = () => S(_e.Form, {
    option: s,
    onRegister: (d) => {
      if (a.value = d, d && l) {
        const m = l;
        l = void 0, d.resetFields(m);
      }
    }
  }), c = {
    ...Z.Modal,
    maskClosable: !1,
    ...t.modalProps,
    ...o == null ? void 0 : o.modalProps
  }, { modalSlot: v, openModal: b, closeModal: g } = or(p, c), h = ({ meta: d, ...m }) => ae(c.title, { meta: d, ...m }) || `${s.title ? s.title + " - " : ""}  ${d.title || d.label}`;
  return { modalSlot: v, methods: {
    add(d = {}) {
      const { meta: m = {}, resetData: u, index: f } = d;
      let y = d.record ?? (f === void 0 ? void 0 : r.value[f]);
      (f !== void 0 || d.record) && (!y || !r.value.some((x) => e(x) === e(y))) && (console.warn("[SuperForm] 新增位置已失效，将追加到末尾"), y = void 0);
      const w = y && e(y), C = { ...u };
      return i(C), m.title ?? (m.title = "新增"), m.name = "add", m.isNew = !0, b({
        ...m,
        title: h({ ...d, source: C, meta: m }),
        onOk: async () => a.value.submit().then(async (x) => {
          var A;
          if (await ((A = o == null ? void 0 : o.onSave) == null ? void 0 : A.call(o, { ...d, source: x, meta: m })) === !1)
            return !1;
          let $ = w === void 0 ? void 0 : r.value.findIndex((I) => e(I) === w);
          return $ === -1 && (console.warn("[SuperForm] 新增锚点已不存在，将追加到末尾"), $ = void 0), n.onSave(x, $);
        }),
        onCancel: async () => {
          var x;
          return await ((x = o == null ? void 0 : o.onCancel) == null ? void 0 : x.call(o, { ...d, meta: m })) === !1 ? !1 : g();
        }
      });
    },
    async edit(d) {
      var m, u;
      const { record: f, selectedRows: y, resetData: w, meta: C = {} } = d, x = f || y[0];
      if (!x)
        return Promise.reject(new Error("未选择记录"));
      const A = await ((u = (m = t.apis) == null ? void 0 : m.info) == null ? void 0 : u.call(m, e(x), x)), T = Mt({}, x, A, w);
      return i(T), We(C, { name: "edit", title: "编辑", isNew: !1 }), b({
        ...C,
        title: h({ ...d, source: T, meta: C }),
        onOk: async () => a.value.submit().then(async ($) => {
          var I;
          return await ((I = o == null ? void 0 : o.onSave) == null ? void 0 : I.call(o, { ...d, source: $, meta: C })) === !1 ? !1 : n.onUpdate($, x);
        }),
        onCancel: async () => {
          var $;
          return await (($ = o == null ? void 0 : o.onCancel) == null ? void 0 : $.call(o, { ...d, meta: C })) === !1 ? !1 : g();
        }
      });
    },
    delete({ record: d, selectedRows: m }) {
      const u = d ? [d] : m;
      return n.onDelete(u);
    }
  } };
}
function gm({
  model: e,
  orgList: t,
  editableRef: n,
  rowKey: r
}) {
  const {
    modelsMap: a
  } = e.listData, o = le(e, "propChain", []), s = /* @__PURE__ */ new WeakMap(), l = (v, b) => {
    const g = ne(v), h = [...o.value, b];
    let _ = s.get(g);
    if (_)
      Nt(_.model, h, b);
    else {
      const {
        modelsMap: d,
        rootModels: m
      } = No(ne(a), v, o.value, b);
      _ = {
        key: Symbol(),
        modelsMap: d,
        model: k({
          children: m,
          index: b,
          propChain: h
        })
      }, s.set(g, _);
    }
    return _;
  };
  z([() => [...t.value], () => [...o.value]], ([v]) => {
    v.forEach(l);
  }, {
    immediate: !0,
    flush: "sync"
  });
  const i = {
    add({
      index: v,
      record: b,
      resetData: g
    } = {}) {
      const h = {
        ...g
      }, _ = b ? t.value.findIndex((d) => r(d) === r(b)) : v;
      if (_ !== void 0) {
        if (!t.value[_])
          throw new Error("新增位置已失效，请重新选择插入位置");
        t.value.splice(_ + 1, 0, h);
      } else
        t.value.push(h);
    }
    // delete({ record }) {
    //   const orgIdx = orgList.value.indexOf(record)
    //   orgList.value.splice(orgIdx, 1)
    // },
  }, p = /* @__PURE__ */ J({
    inheritAttrs: !1,
    props: {
      option: {
        type: Object,
        required: !0
      }
    },
    setup({
      option: v
    }, b) {
      const {
        record: g
      } = b.attrs, h = N(() => s.get(ne(g)).modelsMap.get(v)), {
        index: _,
        parent: d,
        refData: m
      } = Ye(h.value), u = Pe({
        current: d,
        value: m,
        list: t,
        record: g,
        index: _
      }), {
        editable: f = !0
      } = v, {
        attrs: y,
        hidden: w,
        nativeAttrs: C,
        disabled: x
      } = Ie({
        option: v,
        effectData: u
      }), A = N(() => !w.value && n.value && (Be(f) ? f(u) : f)), T = pn(v, h.value, u, y, {
        attrs: C,
        disabled: x
      }), $ = Gt(v, k({
        ...Ye(u),
        isView: !0
      })), I = kt(h.value.rules, u), P = I && N(() => Q(y.disabled) ? void 0 : I);
      return () => A.value ? q("formItem")({
        wrapperCol: {},
        name: h.value.propChain,
        rules: P == null ? void 0 : P.value
      }, {
        default: T
      }) : $ ? $() : m.value;
    }
  });
  return {
    list: t,
    methods: i,
    getEditRender: (v) => {
      if (sr(v.type) === "enhanced" || bn(v.type) || v.type === "InputSlot" && v.editable !== !1)
        return (b) => {
          const g = t.value.findIndex((_) => ne(_) === ne(b.record)), h = l(b.record, g < 0 ? b.index : g);
          return S(p, {
            key: h.key,
            option: v,
            ...b
          });
        };
    }
  };
}
function hm(e, t, n) {
  const r = L({}), { title: a, apis: o } = e, { modalProps: s, ...l } = e.descriptionsProps || {}, i = () => S(om, { option: { descriptionsProps: l }, modelsMap: t, source: r }), p = {
    ...Z.Modal,
    footer: null,
    ...e.modalProps,
    ...s
  }, c = (g) => ae(p.title, g) || `${a ? a + " - " : ""}详情`, { openModal: v, modalSlot: b } = Ho(i, p);
  return {
    detailSlot: b,
    openDetail: async ({ record: g, selectedRows: h, meta: _ = {}, ...d }) => {
      const m = g || h[0];
      if (o != null && o.info) {
        const u = await o.info(n(m), m);
        r.value = Object.assign({}, m, u);
      } else
        r.value = m;
      _.name = "detail", v({ ..._, title: c({ ...d, source: r.value, meta: _ }) });
    }
  };
}
function ym({ option: e, model: t, orgList: n, rowKey: r, listener: a, isView: o, effectData: s }) {
  const { modelsMap: l } = t.listData, i = {
    list: n,
    modalSlot: [],
    methods: {
      delete({ record: d, selectedRows: m }) {
        const u = d ? [d] : m;
        return a.onDelete(u);
      }
    }
  }, { edit: p, editable: c = p, rowEditor: v } = e, { editMode: b, addMode: g } = v || e;
  if (!o && c) {
    const d = N(() => Be(c) ? c(s) : c), { methods: m, ...u } = gm({ model: t, orgList: n, editableRef: d, rowKey: r });
    Object.assign(i.methods, m), Object.assign(i, u);
  } else if (b === "inline") {
    const { list: d, methods: m, buttonMethods: u, editButtonsSlot: f, getEditRender: y } = mm({
      childrenMap: l,
      orgList: n,
      listener: a,
      rowEditor: v,
      rowKey: r
    });
    i.list = d, Object.assign(i.methods, m), Object.assign(i, { buttonMethods: u, editButtonsSlot: f, getEditRender: y });
  }
  if (b === "modal" || g === "modal") {
    const { modalSlot: d, methods: m } = bm({ rowKey: r, option: e, listener: a, orgList: n });
    i.methods.edit ? (i.methods.add = m.add, i.buttonMethods || (i.buttonMethods = {}), i.buttonMethods.add = m.add) : Object.assign(i.methods, m), i.modalSlot.push(d);
  }
  const { detailSlot: h, openDetail: _ } = hm(e, l, r);
  return i.modalSlot.push(h), i.methods.detail = _, i;
}
const wm = J({
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
  setup(e, { attrs: t, slots: n, emit: r }) {
    const { optionsRef: a } = dn(e.options, e.effectData), o = L(e.activeKey ?? e.defaultActiveKey), s = (f) => {
      o.value = f, r("update:activeKey", f);
    }, {
      default: l,
      extra: i,
      rightExtra: p,
      tabBarExtraContent: c,
      tabBarExtra: v,
      title: b,
      titleBar: g,
      ...h
    } = n, _ = St(e.slots, e.effectData), d = v || p || c, m = N(() => {
      var f;
      const y = a.value.map(({ value: w, label: C, ...x }) => ({
        ...x,
        key: x.key ?? w,
        tab: x.tab ?? C
      }));
      return o.value === void 0 && s((f = y[0]) == null ? void 0 : f.key), y;
    }), u = (f) => ae(_.customTab || e.customTab || f.tab, {
      ...e.effectData,
      item: f
    });
    return () => [
      !e.bordered && b ? g == null ? void 0 : g() : null,
      q("tableFilter")(
        {
          bordered: e.bordered,
          items: m.value.map((f) => ({
            ...f,
            tab: u(f)
          })),
          value: o.value,
          onValueChange: s,
          attrs: t
        },
        {
          ...h,
          ..._,
          default: l,
          title: b,
          tabExtra: d || (b ? void 0 : i),
          cardExtra: d || b ? i : void 0
        }
      )
    ];
  }
}), _m = J({
  props: {
    option: { type: Object, required: !0 },
    effectData: { type: Object, required: !0 }
  },
  setup(e) {
    const t = e.option, { field: n, editable: r } = e.option, a = k({});
    z(
      () => e.effectData,
      (d) => Object.assign(a, d),
      { immediate: !0 }
    );
    const o = n.split(".").slice(0, -1), s = N(() => $e(a.record, o)), l = N({
      get: () => $e(a.record, n),
      set: (d) => Lt(a.record, n, d)
    }), i = { parent: s, refData: l }, { attrs: p, hidden: c, nativeAttrs: v, disabled: b } = Ie({
      option: t,
      effectData: { ...a, inTable: !0 }
    }), g = pn(t, i, a, p, { attrs: v, disabled: b }), h = N(() => Be(r) ? r(a) : Q(r)), _ = Gt(t, a);
    return () => c.value ? "" : h.value ? S("div", { class: "editable-cell" }, g()) : _ ? _() : l.value;
  }
}), Sm = (e) => {
  if (!e.editable)
    return;
  const t = ue.buttonRoles && ue.buttonRoles() || [];
  if ((!e.roleName || t.includes(e.roleName)) && (sr(e.type) === "enhanced" || bn(e.type) || e.type === "InputSlot"))
    return (r) => S(_m, { option: e, effectData: { ...r } });
};
function Cm({
  childrenMap: e,
  context: t,
  option: n,
  attrs: r,
  isView: a,
  effectData: o
}) {
  const { methods: s, buttonMethods: l, getEditRender: i, editButtonsSlot: p } = t, c = Pe({ list: o.value, isView: a, parent: o }), v = (n.rowEditor || n).editMode !== "modal", b = function _(d = e) {
    const m = [];
    return [...d].forEach(([u, f]) => {
      var y, w;
      if (u.type === "Hidden" || u.hideInTable || u.hidden === !0 || (y = u.exclude) != null && y.includes("table"))
        return;
      const C = Ct(u, c);
      if (f.children) {
        const x = _(f.children);
        u.ignoreTableTitle ? m.push(...x) : m.push({
          title: C,
          children: x
        });
      } else {
        const x = {
          title: C,
          key: u.field || u.label,
          dataIndex: f.propChain.length > 1 ? f.propChain : f.propChain[0]
        };
        u.options || u.type === "Switch" || (w = u.type) != null && w.includes("Picker") ? x.align = "center" : u.type === "InputNumber" && (x.align = "right"), Object.assign(x, u.columnProps), We(x, n.columnProps, Z.Column);
        const A = x.customRender || Gt(u) || void 0, T = i ? i(u, A) : v ? Sm(u) : void 0;
        x.customRender = xm(A, T, c), m.push(x);
      }
    }), m;
  }(), g = Om(n, r);
  g && b.unshift(g);
  const h = Am({
    buttons: n.rowButtons,
    // 行内编辑需要覆盖新增/编辑/删除的禁用状态，但不能丢失详情等通用动作。
    methods: { ...s || {}, ...l || {} },
    editButtonsSlot: p,
    isView: a,
    effectData: c
  });
  return h && (We(h, n.columnProps, Z.Column), b.push(h)), b;
}
function xm(e, t, n) {
  if (t || e) {
    const r = (a) => {
      const o = (t == null ? void 0 : t(a)) ?? (e == null ? void 0 : e({ ...a, isView: !0 })) ?? String(a.text ?? "");
      return o && typeof o == "string" && a.column.ellipsis ? S("span", { title: o }, o) : o;
    };
    return (a) => S(r, { ...n, ...a, current: a.record });
  } else
    return ({ text: r }) => String(r ?? "");
}
function Am({ buttons: e, methods: t, editButtonsSlot: n, isView: r, effectData: a }) {
  const o = vn(Z.rowButtons || {}, e), { columnProps: s, ...l } = o, i = fn({ config: l, methods: t, isView: r });
  if (!i)
    return;
  const p = (c) => (n == null ? void 0 : n(c, l)) || i({ key: c.record, effectData: c });
  return {
    title: "操作",
    key: "action",
    fixed: "right",
    minWidth: 100,
    width: 100,
    align: "center",
    resizable: !1,
    ...s,
    customRender: (c) => S(p, { ...a, ...c, current: c.record })
  };
}
const Om = (e, t) => {
  var n;
  const r = e.indexColumn ?? ((n = Z.Table) == null ? void 0 : n.indexColumn);
  if (r)
    return {
      key: "INDEX",
      title: "序号",
      width: 60,
      align: "center",
      customRender: ({ index: a }) => {
        var o, s;
        return ((((o = t.pagination) == null ? void 0 : o.current) || 1) - 1) * (((s = t.pagination) == null ? void 0 : s.pageSize) || 10) + a + 1;
      },
      ...je(r) && r
    };
}, Tm = J({
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
  setup({ option: e, model: t, reload: n, effectData: r, isView: a, ...o }, s) {
    var l, i, p;
    const c = ((l = e.rowEditor) == null ? void 0 : l.editMode) === "inline", v = s.attrs, b = /* @__PURE__ */ new WeakMap(), g = v.rowKey || "id", h = (O) => {
      const M = typeof g == "function" ? g(O) : O[g];
      if (M != null)
        return M;
      const F = ne(O);
      return b.has(F) || b.set(F, mt(12)), b.get(F);
    }, _ = le(t, "refData"), d = ((i = e.attrs) == null ? void 0 : i.rowSelection) || void 0, m = d == null ? void 0 : d.selectedRowKeys, u = et(m) ? m : L(m || []), f = L([]), {
      selectedRowKeys: y,
      onChange: w,
      getCheckboxProps: C,
      ...x
    } = d || {}, A = d && {
      attrs: {
        fixed: !0,
        ...x
      },
      onChange: (O, M, F) => {
        var j;
        if (d != null && d.preserveSelectedRowKeys) {
          const E = $(), X = f.value.filter((ie) => !E.has(h(ie))), fe = new Map([...X, ...M].map((ie) => [h(ie), ie]));
          O = [.../* @__PURE__ */ new Set([...X.map(h), ...O])], M = O.map((ie) => fe.get(ie)).filter(Boolean);
        }
        O.length === u.value.length && O.every((E, X) => E === u.value[X]) && M.length === f.value.length && M.every((E, X) => E === f.value[X]) || (u.value = O, f.value = M, (j = d == null ? void 0 : d.onChange) == null || j.call(d, O, M, F));
      },
      isRowSelectable: (O) => {
        var M, F;
        return c && !_.value.includes(O) ? !1 : !((F = (M = d == null ? void 0 : d.getCheckboxProps) == null ? void 0 : M.call(d, O)) != null && F.disabled);
      }
    }, T = v.childrenColumnName || "children", $ = () => {
      const O = /* @__PURE__ */ new Map(), M = (F) => F.forEach((j) => {
        O.set(h(j), j), Array.isArray(j[T]) && M(j[T]);
      });
      return M(_.value), O;
    };
    z(
      () => [$(), [...u.value]],
      ([O, M]) => {
        var F;
        const j = d == null ? void 0 : d.preserveSelectedRowKeys, E = j ? [...M] : M.filter((be) => O.has(be)), X = new Map(f.value.map((be) => [h(be), be])), fe = E.map((be) => O.get(be) ?? (j ? X.get(be) : void 0)).filter((be) => !!be);
        (E.length !== M.length || fe.length !== f.value.length || fe.some((be, ts) => be !== f.value[ts])) && (f.value = fe, E.length !== M.length && (u.value = E), (F = d == null ? void 0 : d.onChange) == null || F.call(d, E, fe, { type: "none" }));
      },
      { immediate: !0 }
    );
    const I = (O, M = 0, F = 1) => {
      const j = [], E = M === F;
      return O.forEach((X) => {
        X[T] && (j.push(h(X)), E || j.push(...I(X[T], M, F + 1)));
      }), j;
    }, P = L(((p = e.attrs) == null ? void 0 : p.expandedRowKeys) || []), D = (O) => {
      P.value = O, s.emit("expandedRowsChange", O);
    };
    (o.defaultExpandLevel || v.defaultExpandAllRows) && z(
      _,
      (O, M) => {
        O.length && !(M != null && M.length) && D(I(O, Number(o.defaultExpandLevel)));
      },
      { immediate: !0 }
    );
    const B = ym({
      option: e,
      model: t,
      orgList: _,
      rowKey: h,
      listener: {
        async onSave(O, M) {
          var F;
          if ((F = e.apis) != null && F.save)
            return await e.apis.save(O), O.parentId && (P.value = [...P.value, O.parentId]), n == null ? void 0 : n();
          M !== void 0 ? _.value.splice(M + 1, 0, O) : _.value.push(O);
        },
        async onUpdate(O, M) {
          var F;
          const j = h(M), E = () => _.value.findIndex((fe) => h(fe) === j);
          if (E() < 0)
            throw new Error("编辑记录已被移除，请取消本次编辑");
          (F = e.apis) != null && F.update && await e.apis.update(O);
          const X = E();
          if (X < 0)
            throw new Error("保存期间记录已被移除，请刷新确认服务端结果");
          return Object.assign(_.value[X], O), n == null ? void 0 : n();
        },
        async onDelete(O) {
          var M, F;
          const j = O.map((E) => h(E));
          try {
            await ((F = (M = e.apis) == null ? void 0 : M.delete) == null ? void 0 : F.call(M, j, O));
          } catch (E) {
            return console.error(E), E;
          }
          return A && (u.value = u.value.filter((E) => !j.includes(E)), f.value = f.value.filter((E) => !j.includes(h(E)))), O.forEach((E) => {
            const X = h(E), fe = _.value.findIndex((ie) => ie === E || h(ie) === X);
            fe !== -1 && _.value.splice(fe, 1);
          }), n == null ? void 0 : n();
        }
      },
      isView: a,
      effectData: r
    }), U = Cm({
      childrenMap: t.listData.modelsMap,
      context: B,
      option: e,
      attrs: v,
      isView: a,
      effectData: r
    }), { list: Y, methods: W, buttonMethods: V = W, modalSlot: R } = B, G = {
      selectedRowKeys: u,
      selectedRows: f,
      setSelectedRows: (O) => {
        f.value = O, u.value = O.map((M) => h(M));
      },
      expandedRowKeys: P,
      setExpandedRowKeys: D,
      expandAll: () => {
        D(I(_.value));
      },
      add: (O) => {
        var M;
        return (M = W.add) == null ? void 0 : M.call(W, O);
      },
      edit: (O) => {
        var M;
        return (M = W.edit) == null ? void 0 : M.call(W, { ...Se, ...O });
      },
      delete: () => {
        var O;
        return (O = W.delete) == null ? void 0 : O.call(W, Se);
      },
      detail: (O) => {
        var M;
        return (M = W.detail) == null ? void 0 : M.call(W, { ...Se, ...O });
      }
    }, oe = k({ ...G }), me = L();
    z(
      me,
      (O) => {
        Object.assign(oe, O, G), s.emit("register", oe);
      },
      { flush: "sync" }
    );
    const Se = k({
      ...r,
      selectedRows: f,
      selectedRowKeys: u,
      tableRef: oe
    }), Ce = { ...s.slots }, ye = e.buttons, ze = (ye == null ? void 0 : ye.targetSlot) ?? (ye == null ? void 0 : ye.forSlot) ?? "extra";
    if (ye) {
      const O = Ce[ze], M = fn({
        config: ye,
        effectData: Se,
        methods: V,
        isView: a
      });
      (O || M) && (Ce[ze] = () => [O == null ? void 0 : O(), M == null ? void 0 : M()]);
    }
    const it = e.title || e.label, { title: Ae = it, extra: De, ...Je } = Ce, Re = (Ae || De) && (() => q("row")(
      { align: "middle", class: "sup-titlebar" },
      {
        default: () => [
          Ae && q("col")(
            { class: "sup-title" },
            {
              default: Ct({ labelSlot: Ae, tooltip: e.tooltip }, r)
            }
          ),
          De && q("col")(
            {
              class: "sup-title-buttons",
              flex: 1,
              style: { textAlign: (ye == null ? void 0 : ye.align) || "right" }
            },
            { default: De }
          )
        ]
      }
    ));
    Je.headerCell = (O) => {
      var M;
      return ((M = Ce.headerCell) == null ? void 0 : M.call(Ce, O)) || ae(O.title, r);
    };
    const de = () => {
      const { rowSelection: O, expandedRowKeys: M, ...F } = v;
      return [
        ...R.map((j) => j()),
        q("table")(
          {
            ...Z.Table,
            ref: me,
            data: Y.value,
            columns: k(U),
            tableLayout: "fixed",
            pagination: !1,
            ...F,
            selection: A && {
              ...A,
              selectedKeys: u.value
            },
            rowKey: h,
            expandedKeys: P.value,
            onExpandedChange: D,
            class: ["sup-table-wrapper", e.editable && "sup-table-editable"]
          },
          Je
        )
      ];
    };
    return e.tabs ? () => S(wm, { ...e.tabs, effectData: r }, {
      [ze]: Ce[ze],
      title: Ae && (() => ae(Ae, r)),
      extra: De,
      titleBar: Re,
      default: de
    }) : () => [Re == null ? void 0 : Re(), de()];
  }
}), $m = /* @__PURE__ */ J({
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
    var r;
    const a = e.option.title || e.option.label, o = [...e.model.children].map(([l, i], p) => {
      const c = Pe({
        parent: e.effectData,
        current: le(e.model, "parent"),
        field: i.refName,
        value: i.refData
      }), {
        hidden: v,
        attrs: {
          disabled: b,
          ...g
        }
      } = Ie({
        option: l,
        effectData: c
      }), {
        key: h,
        field: _
      } = l;
      return {
        attrs: k(g),
        option: l,
        effectData: c,
        model: i,
        header: () => {
          var d;
          return [(d = l.icon) == null ? void 0 : d.call(l), ae(l.label, c)];
        },
        key: h || _ || String(p),
        hidden: v,
        disabled: b
      };
    }), s = L(e.option.activeKey || ((r = o[0]) == null ? void 0 : r.key));
    return () => q("collapse")({
      attrs: t,
      slots: n,
      content: n.default,
      title: n.title || (a ? () => ae(a, e.effectData) : void 0),
      activeKeys: s.value,
      onActiveChange: (l) => {
        s.value = l;
      },
      items: o.filter(({
        hidden: l
      }) => !l.value).map(({
        attrs: l,
        option: i,
        disabled: p,
        model: c,
        header: v,
        effectData: b,
        key: g
      }) => ({
        key: g,
        attrs: l,
        title: v,
        disabled: Q(p),
        extra: !e.isView && i.buttons ? () => S(Fe, {
          option: i.buttons,
          effectData: b
        }) : void 0,
        content: () => e.isView ? S(Ze, {
          option: i,
          modelsMap: c.children,
          effectData: b
        }) : S(Ue, {
          option: i,
          model: c,
          effectData: b
        })
      }))
    });
  }
}), Im = /* @__PURE__ */ J({
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
    const n = t, r = e, a = (s) => {
      n("update:value", s);
    }, o = () => q("preview")({
      images: r.images,
      visible: r.visible,
      current: r.current,
      width: r.width,
      height: r.height,
      "onUpdate:visible": a
    });
    return (s, l) => (Ee(), pt(o));
  }
});
function Mm(e) {
  const t = L(!1), n = k({
    visible: t,
    images: [],
    "onUpdate:value": (i) => t.value = i,
    ...e
  }), r = L(!1), a = () => !r.value && S(Im, n), o = _a();
  Nn(() => {
    r.value = !0;
  });
  let s;
  return { open: (i) => {
    if (typeof i == "string")
      n.images = [i];
    else if (Array.isArray(i))
      n.images = [...i];
    else {
      const { src: p, ...c } = i || {};
      p && (n.images = [p]), Object.assign(n, c);
    }
    if (!s) {
      const p = document.createElement("div");
      s = xa(a, { appContext: o == null ? void 0 : o.appContext }), s.appContext = o == null ? void 0 : o.appContext, An(s, p);
    }
    Ne(() => t.value = !0);
  } };
}
function Pm(e, t) {
  return new Promise((n, r) => {
    const a = new FileReader();
    t === "text" ? a.readAsText(e) : a.readAsDataURL(e), a.onload = () => n({ result: a.result, file: e }), a.onerror = (o) => r(o);
  });
}
function Dm(e, t, n) {
  const r = typeof n < "u" ? [n, e] : [e], a = new Blob(r, { type: "application/octet-stream" }), o = window.URL.createObjectURL(a), s = document.createElement("a");
  s.style.display = "none", s.href = o, s.setAttribute("download", t), typeof s.download > "u" && s.setAttribute("target", "_blank"), document.body.appendChild(s), s.click(), document.body.removeChild(s), window.URL.revokeObjectURL(o);
}
function Rm(e, t) {
  var n, r;
  const a = ((n = e.name) == null ? void 0 : n.toLowerCase()) || "", o = ((r = e.type) == null ? void 0 : r.toLowerCase()) || "";
  return t.split(",").some((s) => {
    const l = s.trim().toLowerCase();
    return l ? l.startsWith(".") ? a.endsWith(l) : l.endsWith("/*") ? o.startsWith(l.slice(0, -1)) : o === l : !1;
  });
}
function Em(e) {
  const { mode: t, valueKey: n, infoNames: r, maxCount: a, accept: o, minSize: s, maxSize: l, repeatable: i } = e, p = {
    ...n && { [n]: n },
    uid: "uid",
    status: "status",
    url: "url",
    name: "name",
    ...r
  };
  t === "custom" && (p.file = "file");
  const c = /* @__PURE__ */ new Map(), v = /* @__PURE__ */ new Map(), b = /* @__PURE__ */ new Map();
  return {
    clearTask: (C) => {
      c.delete(C), v.delete(C);
    },
    convertInfo: (C) => {
      const x = { status: "done", ...C };
      return Object.entries(p).forEach(([A, T]) => {
        T && T !== A && T in x && (x[A] = x[T], delete x[T]);
      }), x;
    },
    getValue: (C, x) => {
      if (x) {
        const A = C[0];
        return n ? (A == null ? void 0 : A[n]) ?? (A == null ? void 0 : A[p.uid]) : A;
      }
      return n ? C.map((A) => A[n] ?? A[p.uid]) : C;
    },
    hasPendingWork: (C) => b.size > 0 || t === "auto" && C.some((x) => x.status === "uploading") || (t === "base64" || t === "text") && C.some((x) => x.status !== "done") || t === "submit" && C.some((x) => x.status !== "done"),
    queueDelete: (C, x) => b.set(C, x),
    reconvert: (C) => {
      const x = {};
      return Object.entries(p).forEach(([A, T]) => {
        const $ = C[A];
        T && $ !== void 0 && (x[T] = $);
      }), x;
    },
    registerRequest: (C, x) => {
      if (t === "auto" || t === "base64" || t === "text") {
        const A = x();
        return c.set(C, A), A.catch(() => {
        }), A;
      }
      t === "submit" && v.set(C, x);
    },
    submit: async (C) => {
      let x = Promise.resolve();
      if (t === "auto" || t === "base64" || t === "text") {
        const $ = C.find((I) => I.status === "error");
        if ($)
          throw $.error || $.response || { message: "文件处理失败，请删除后重新选择！" };
        x = Promise.all(c.values());
      } else if (t === "submit") {
        const $ = C.filter((I) => I.status !== "done").map((I) => {
          var P;
          return I.status = "uploading", (P = v.get(I.uid)) == null ? void 0 : P();
        }).filter(Boolean);
        x = Promise.all($);
      }
      const A = await x, T = [...b.values()];
      return b.clear(), await Promise.all(T.map(async ($) => {
        try {
          await $();
        } catch (I) {
          console.error(I);
        }
      })), A;
    },
    validate: (C, x, A) => {
      if (a > 1 && A.length + x.indexOf(C) >= a)
        return `文件数量最多${a}`;
      if (o && !Rm(C, o))
        return "请选择正确的文件类型！";
      if (s || l) {
        const T = (C.size || 0) / 1024 / 1024;
        if (s && s > T)
          return `文件最小需要${s}M`;
        if (l && l < T)
          return `文件最大不超过${l}M`;
      }
      if (!i) {
        const T = A.find(($) => $.name === C.name);
        if (T)
          return `文件重复: ${T.name}`;
      }
    }
  };
}
const jm = /* @__PURE__ */ new Set(["png", "jpg", "jpeg", "gif", "webp", "svg", "tif", "tiff"]);
function Fm(e) {
  var t, n, r, a, o;
  if (e.thumbUrl)
    return !0;
  if (e.url || e.file) {
    const s = (n = (t = e.name || e.url) == null ? void 0 : t.split(/[?#]/)[0].match(/\.([^.\/\\]+)$/)) == null ? void 0 : n[1].toLowerCase();
    if (s && jm.has(s))
      return !0;
    {
      const l = e.type || ((r = e.file) == null ? void 0 : r.type) || ((o = (a = e.url) == null ? void 0 : a.match(/^data:(\S*?);/)) == null ? void 0 : o[1]);
      return l == null ? void 0 : l.startsWith("image");
    }
  }
}
function ra(e, t) {
  const n = pe("services").info({
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
  return { setError: (a, o) => {
    n.update({
      icon: () => at("error"),
      okButtonProps: {
        loading: !1
      },
      type: "error",
      title: a,
      content: o == null ? void 0 : o.message
    });
  }, ...n };
}
let Lm = 0;
const km = J({
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
      apis: r = {},
      isSingle: a,
      minSize: o,
      maxSize: s,
      infoNames: l,
      repeatable: i,
      onPreview: p,
      onDownload: c,
      isImage: v = Fm,
      hideOnMax: b,
      valueKey: g
    } = e, h = (a ? 1 : e.maxCount) || 1 / 0, { accept: _ } = t.attrs, d = Em({
      mode: n,
      valueKey: g,
      infoNames: l,
      maxCount: h,
      accept: _,
      minSize: o,
      maxSize: s,
      repeatable: i
    }), m = Mm(), { convertInfo: u, reconvert: f } = d, { onSubmit: y } = we("exaProvider", {}), w = L([]), C = /* @__PURE__ */ new Set();
    let x = !1;
    ur(() => {
      x = !0, C.forEach((O) => URL.revokeObjectURL(O));
    }), z(w, (O, M) => {
      const F = new Set(O.map((E) => E.uid));
      M.forEach((E) => {
        F.has(E.uid) || d.clearTask(E.uid);
      });
      const j = new Set(O.map((E) => E.objectUrl));
      C.forEach((E) => {
        j.has(E) || (URL.revokeObjectURL(E), C.delete(E));
      });
    });
    const A = ke([]), T = ke(), $ = (O) => {
      A.value = O.map(f), e.isView || (t.emit("update:fileList", A.value), I()), w.value = O;
    }, I = () => {
      T.value = d.getValue(ne(A.value), !!e.isSingle), t.emit("update:value", T.value);
    };
    z(
      () => ne(e.value),
      (O) => {
        if (O !== T.value)
          if (T.value = O, !O)
            w.value = [];
          else {
            const M = he(O) ? O : [O];
            A.value = g ? M.map((F) => ({ [g]: F })) : M, w.value = A.value.map(u);
          }
      },
      { immediate: !0, flush: "sync" }
    ), z(
      () => ne(e.fileList),
      (O) => {
        if (O && O !== A.value) {
          const M = O.map(u);
          $(M);
        }
      },
      { immediate: !0 }
    );
    const P = L(!1), D = y == null ? void 0 : y(async () => {
      if (await H, P.value = d.hasPendingWork(w.value), P.value) {
        const O = ra(" 文件同步中，请稍候...");
        return d.submit(w.value).then((M) => (O.destroy(), M)).catch((M) => {
          throw P.value = !1, O.setError("文件上传失败", M), M;
        }).finally(() => P.value = !1);
      }
      return d.submit(w.value);
    });
    D && ur(D);
    let H = Promise.resolve();
    const B = (O) => {
      const M = H.then(async () => {
        var F, j;
        if (x || e.isView || e.disabled || await ((F = e.beforeSelect) == null ? void 0 : F.call(e, O)) === !1 || x || e.isView || e.disabled)
          return;
        const E = {
          uid: `upload-${Date.now()}-${++Lm}`,
          file: O,
          name: O.name,
          type: O.type,
          size: O.size,
          status: n === "auto" || n === "base64" || n === "text" ? "uploading" : "waiting"
        }, X = d.validate(E, [E], w.value);
        if (X) {
          pe("services").message("error", X);
          return;
        }
        v(E) && (E.objectUrl = URL.createObjectURL(O), C.add(E.objectUrl)), (h === 1 ? w.value : []).forEach((ie) => {
          if (d.clearTask(ie.uid), ie.status === "done" && r.delete) {
            const be = f(ie);
            d.queueDelete(be, () => r.delete(be));
          }
        }), $(h === 1 ? [E] : [...w.value, E]), n === "base64" || n === "text" ? d.registerRequest(E.uid, () => Pm(O, n).then(
          ({ result: ie }) => Y({ url: ie }, E),
          (ie) => U(ie, E)
        )) : n !== "custom" && d.registerRequest(E.uid, () => W(E)), (j = e.onChange) == null || j.call(e, { file: E, fileList: [...w.value] });
      }).catch((F) => {
        pe("services").message("error", (F == null ? void 0 : F.message) || "文件选择失败");
      });
      return H = M, M;
    }, U = (O, M) => {
      var F;
      const j = w.value.find((E) => E.uid === M.uid);
      if (!(x || !j))
        return Object.assign(j, { error: O, status: "error" }), $([...w.value]), (F = e.onChange) == null || F.call(e, { file: j, fileList: [...w.value] }), Promise.reject(O);
    }, Y = (O, M) => {
      var F;
      const j = w.value.find((E) => E.uid === M.uid);
      if (!(x || !j))
        return Object.assign(j, u(O), { status: "done" }), $([...w.value]), (F = e.onChange) == null || F.call(e, { file: j, fileList: [...w.value] }), O;
    }, W = (O) => {
      if (!r.upload)
        return Promise.resolve().then(() => U(Error("Api config error"), O));
      const M = new FormData();
      M.append(t.attrs.name || "file", O.file);
      const F = (j) => {
        j.total > 0 && (j.percent = j.loaded / j.total * 100);
        const E = w.value.find((X) => X.uid === O.uid);
        !x && E && (E.percent = j.percent);
      };
      return Promise.resolve().then(() => r.upload(M, { onUploadProgress: F })).then(
        (j) => Y(j, O),
        (j) => U(j, O)
      );
    }, V = async (O) => {
      var M;
      if (e.isView || e.disabled)
        return !1;
      let F = await ((M = e.beforeRemove) == null ? void 0 : M.call(e, O));
      return F !== !1 && r.delete && O.status === "done" ? new Promise((j) => {
        const E = pe("services").confirm({
          title: "确定删除吗？",
          okText: "确定",
          cancelText: "取消",
          closable: !1,
          maskClosable: !1,
          ...Z.Modal,
          onOk() {
            const X = f(O), fe = () => r.delete(X);
            if (n === "submit")
              d.queueDelete(X, fe), j(!0);
            else
              return E.update({
                okCancel: !1,
                title: "文件删除中……"
              }), fe().then(j, () => (E.update({
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
      }) : F;
    }, R = /* @__PURE__ */ new Set(), G = async (O) => {
      var M;
      if (!(e.isView || e.disabled || !e.removable || R.has(O.uid))) {
        R.add(O.uid);
        try {
          if (await V(O) === !1 || x)
            return;
          d.clearTask(O.uid), $(w.value.filter((F) => F.uid !== O.uid)), (M = e.onChange) == null || M.call(e, { file: O, fileList: [...w.value] });
        } catch (F) {
          pe("services").message("error", (F == null ? void 0 : F.message) || "文件删除失败");
        } finally {
          R.delete(O.uid);
        }
      }
    }, oe = L(!1), me = N(() => e.downloadable ?? !!(c || r.download)), Se = (O) => {
      if (me.value) {
        if (c)
          return c(O);
        if (r.download && !oe.value) {
          oe.value = !0;
          const M = ra("文件下载中，请稍候...");
          return Promise.resolve().then(() => r.download(f(O))).then((F) => Dm(F, O.name)).then(() => M.destroy()).catch((F) => {
            M.setError("文件下载失败", F);
          }).finally(() => oe.value = !1);
        }
      }
    }, Ce = async (O) => {
      if (e.previewable)
        if (p) {
          const M = await p(f(O));
          M && m.open(M);
        } else if (v(O)) {
          let M = -1;
          const F = w.value.filter((j) => v(j)).map((j, E) => {
            j.uid === O.uid && (M = E);
            const X = j.url || j.thumbUrl;
            return !X && !j.objectUrl && j.file && (j.objectUrl = window.URL.createObjectURL(j.file), C.add(j.objectUrl)), X || j.objectUrl;
          });
          F[M] ? m.open({ images: F, current: M }) : Se(O);
        } else
          Se(O);
    }, ye = e.title, ze = typeof e.title == "string" ? e.title : "上传文件", it = k({ ...ne(e.effectData), fileList: w }), Ae = Be(ye) && (() => ye(it)), De = [];
    _ && De.push("支持文件格式：" + _), s && De.push("单个文件不超过" + s + "MB");
    const Je = e.tip ?? De.join(", "), Re = N(() => e.disabled || e.isView), de = N(() => b && h && w.value.length >= h);
    return () => q("upload")({
      attrs: t.attrs,
      files: w.value,
      readonly: Re.value,
      showList: e.showList,
      removable: e.removable && !Re.value,
      downloadable: me.value,
      previewable: e.previewable,
      hideTrigger: Re.value || !!de.value,
      title: () => Ae ? Ae() : ze,
      tip: Je,
      select: B,
      remove: G,
      preview: Ce,
      download: Se,
      isImage: (O) => !!v(O)
    }, {
      ...t.slots,
      ...t.slots.default && { default: () => {
        var O, M;
        return (M = (O = t.slots).default) == null ? void 0 : M.call(O, it);
      } }
    });
  }
}), Nm = /* @__PURE__ */ J({
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
    const n = e, r = t, a = L(), o = L(""), s = L(!1), l = N(() => Lo("Input")), i = () => {
      const m = l.value, u = {
        type: "Input",
        option: n.option,
        model: n.model,
        effectData: n.effectData,
        state: {},
        binding: { value: o.value, "onUpdate:value": (y) => o.value = y }
      }, f = m.getAttrs(
        {
          ref: (y) => a.value = y,
          class: "sup-tag-input",
          onBlur: d
        },
        n.option,
        u.state
      );
      return m.render({ ...u, attrs: f, slots: {} });
    }, p = (m, u) => typeof n.closable == "function" ? n.closable(m, u) : n.closable, c = N(() => n.value ? typeof n.value == "string" ? n.value.split(",") : n.value : []), v = () => {
      s.value = !0, Ne(() => {
        a.value.focus();
      });
    }, b = (m) => {
      const u = c.value.filter((f) => f !== m);
      _(u);
    }, g = (m, u) => {
      const f = q("tag")(
        {
          removable: p(m, u),
          onRemove: () => b(m)
        },
        { default: () => m.length > 20 ? `${m.slice(0, 20)}...` : m }
      );
      return m.length > 20 ? q("tooltip")({ title: m }, { default: () => f }) : f;
    }, h = () => q("tag")(
      { class: "sup-tag-add", onClick: v },
      { default: () => [at("add"), ae(n.newLabel, n.effectData)] }
    ), _ = (m) => {
      n.stringifyValue ? r("update:value", m.join(",")) : r("update:value", m);
    }, d = () => {
      o.value && c.value.indexOf(o.value) === -1 && _([...c.value, o.value]), s.value = !1, o.value = "";
    };
    return (m, u) => (Ee(), Zt(On, null, [
      (Ee(!0), Zt(On, null, Aa(c.value, (f, y) => (Ee(), pt(Ot(() => g(f, y)), { key: f }))), 128)),
      s.value ? (Ee(), pt(Ot(i), { key: 0 })) : (Ee(), pt(Ot(h), { key: 1 }))
    ], 64));
  }
}), Um = {
  key: 1,
  class: "sup-tag-select-empty"
}, Bm = /* @__PURE__ */ J({
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
    const n = e, r = t, { optionsRef: a } = dn(n.option.options, n.effectData), o = N(() => n.option.options === void 0 ? n.options ?? [] : a.value), s = N(() => {
      const { value: c } = n, v = n.stringifyValue;
      return c === void 0 ? [] : v ? c.split(",") : Array.isArray(c) ? c : [c];
    }), l = (c, v) => {
      const b = n.multiple ? v ? [...s.value, c] : s.value.filter((g) => g !== c) : [c];
      r("check", c, v), p(b), r("change", c, b);
    }, i = (c, v) => q("checkableTag")(
      {
        class: "tag-select",
        selected: s.value.includes(v),
        onSelectedChange: (b) => l(v, b)
      },
      { default: () => c }
    ), p = (c) => {
      n.multiple ? n.stringifyValue ? r("update:value", c.join(",")) : r("update:value", c) : r("update:value", c[0]);
    };
    return (c, v) => o.value.length ? (Ee(!0), Zt(On, { key: 0 }, Aa(o.value, ({ label: b, value: g }) => (Ee(), pt(Ot(() => i(b, g)), { key: g }))), 128)) : (Ee(), Zt("div", Um, Ys(e.placeholder), 1));
  }
}), Go = {
  Form: zo,
  Group: Sn,
  Card: cm,
  CardList: Cn,
  TabList: Cn,
  CollapseList: Cn,
  GroupList: pm,
  Tabs: vm,
  Table: Tm,
  Collapse: $m,
  Descriptions: Sn,
  Fragment: Sn
}, Vm = {
  InputGroup: im,
  InputList: um,
  Upload: km,
  TagInput: Nm,
  TagSelect: Bm
}, ht = Object.keys(Go), qm = {
  ...Go,
  ...Vm
}, Kt = {}, mn = {}, Xt = /* @__PURE__ */ new Set();
function Ko(e) {
  return typeof e == "object" && e && "component" in e ? e : { component: e };
}
function Yo(e, t, n, r = []) {
  const a = /* @__PURE__ */ new Set([...Po, ...r]);
  Object.entries(t).forEach(([o, s]) => {
    if (s) {
      if (a.has(o))
        throw new Error(`Schema 类型 '${o}' 为 Core 保留类型，不能注册为 ${n} 组件`);
      e[o] = { ...Ko(s), source: n };
    }
  });
}
function Wo(e, t = []) {
  Yo(Kt, e, "custom", [...Xt, ...t]);
}
function zm(e) {
  const t = new Set(e);
  for (const n of Object.keys(Kt))
    if (t.has(n))
      throw new Error(`Schema 类型 '${n}' 已注册为项目组件，不能再由 UIAdapter 接管`);
  Xt.clear(), t.forEach((n) => Xt.add(n));
}
function Ob(e, t = []) {
  const n = Object.fromEntries(
    Object.entries(e).map(([o, s]) => [o, s && Ko(s).component])
  );
  jo(n, "auto");
  const r = new Set(t), a = Object.fromEntries(
    Object.entries(e).filter(([o]) => !Po.has(o) && !r.has(o))
  );
  Yo(mn, a, "auto");
}
function en(e) {
  return Kt[e] || mn[e];
}
function bn(e) {
  return !!en(e);
}
function Hm() {
  return [.../* @__PURE__ */ new Set([...Object.keys(Kt), ...Object.keys(mn)])];
}
function sr(e, t = []) {
  var n, r;
  return Mo.includes(e) ? "core" : Xt.has(e) || new Set(t).has(e) ? "enhanced" : ((n = Kt[e]) == null ? void 0 : n.source) || ((r = mn[e]) == null ? void 0 : r.source);
}
function Zo(e, t) {
  const { prop: n = "value", event: r = "update:value" } = e.model || {}, a = { ...t };
  if (n !== "value" && (a[n] = a.value, delete a.value), r !== "update:value") {
    const o = r.startsWith("on") ? r : `on${r[0].toUpperCase()}${r.slice(1)}`;
    a[o] = a["onUpdate:value"], delete a["onUpdate:value"];
  }
  return a;
}
const _e = qm, Z = {};
let aa = !1, oa;
function Gm(e) {
  if (oa) {
    Hr(e);
    return;
  }
  zm(e.supportedFields), Hr(e), oa = e, aa || (Ht(Z, e.defaults || {}), aa = !0);
}
function Km(e) {
  return Gm(e), e;
}
function Ym(e = {}) {
  const { defaultProps: t, ...n } = e;
  Object.assign(ue, n), t && Qo(t);
}
function Wm(e, t) {
  Wo({ [e]: t });
}
function Zm(e) {
  Wo(e);
}
function Qo(e) {
  Ht(Z, e);
}
const sa = {
  useAdapter: Km,
  configure: Ym,
  registerComponent: Wm,
  registerComponents: Zm,
  setDefaultProps: Qo
};
class Qm extends Error {
  constructor(t, n) {
    super(t.flatMap((r) => r.messages)[0] || "表单校验失败"), this.fields = t, this.cause = n, this.name = "FormValidationError";
  }
}
const la = Symbol.for("superform.official-product");
function Jm(e, t) {
  let n = !1;
  const r = {
    ...sa,
    initialize(a = {}) {
      const o = a.components, s = Object.keys(o || {});
      if (n) {
        if (s.length || a.overrides)
          throw new Error(`SuperForm '${e}' 已初始化，不能再追加字段组件或覆盖 UI 协议`);
        return r;
      }
      const l = Fo(t(o), a.overrides);
      for (const c of s)
        if (!l.supportedFields.includes(c))
          throw new Error(`UIAdapter '${l.name}' 未声明字段 '${c}'，不能初始化对应 UI 组件`);
      const i = globalThis, p = i[la];
      if (p && p !== e)
        throw new Error(`SuperForm 已初始化官方产品 '${String(p)}'，不能再初始化 '${e}'`);
      return sa.useAdapter(l), i[la] = e, n = !0, r;
    }
  };
  return r;
}
const Xm = [
  "Input",
  "TextArea",
  "InputNumber",
  "InputOTP",
  "InputPassword",
  "InputSearch",
  "AutoComplete",
  "Cascader",
  "ColorPicker",
  "Select",
  "Radio",
  "RadioGroup",
  "Checkbox",
  "CheckboxGroup",
  "DatePicker",
  "DateRangePicker",
  "DateMonthPicker",
  "DateQuarterPicker",
  "DateWeekPicker",
  "DateYearPicker",
  "TimePicker",
  "TimeRangePicker",
  "TreeSelect",
  "Switch",
  "Rate",
  "Mentions",
  "Segmented",
  "Slider",
  "Transfer"
], eb = J({
  name: "AntdvTreeSelectField",
  inheritAttrs: !1,
  props: Dv,
  setup(e, { slots: t }) {
    const n = Mv("TreeSelect"), r = N(() => e.state.treeData ?? e.attrs.treeData ?? []);
    return e.option.labelField && z(
      () => [e.binding.value, r.value, e.attrs.fieldNames, e.attrs.treeNodeLabelProp],
      () => {
        var c, v;
        const a = e.attrs.fieldNames || {}, o = e.attrs.treeNodeLabelProp || a.label || "title", s = (b, g) => {
          for (const h of b) {
            if (Object.is(h[a.value || "value"], g))
              return h[o] ?? h.label ?? g;
            const _ = h[a.children || "children"], d = Array.isArray(_) ? s(_, g) : void 0;
            if (d !== void 0)
              return d;
          }
        }, l = (b) => {
          if (b == null)
            return;
          const g = typeof b == "object" ? b.value : b;
          return s(r.value, g) ?? b.label ?? g;
        }, i = e.binding.value, p = Array.isArray(i) ? i.map(l) : l(i);
        ov(p, e.binding.labelValue) || (v = (c = e.binding)["onUpdate:labelValue"]) == null || v.call(c, p);
      },
      { immediate: !0, deep: !0 }
    ), () => S(n, { ...e.attrs, treeData: r.value }, t);
  }
}), tb = tr();
function Jo() {
  return Ev({
    TextArea: {
      defaults: { allowClear: !0, style: { width: "100%" } }
    },
    InputNumber: {
      defaults: { type: "number", style: { width: "100%" } }
    },
    AutoComplete: {
      processors: ["options"],
      defaults: { filterOption: !0 }
    },
    Select: {
      processors: ["options"],
      defaults: { optionFilterProp: "label" }
    },
    Radio: { model: { prop: "checked", event: "update:checked" } },
    Checkbox: { model: { prop: "checked", event: "update:checked" } },
    RadioGroup: { processors: ["options"] },
    CheckboxGroup: { processors: ["options"] },
    // 清除 Core 通用提示兜底，使用组件库默认文案；用户 attrs.placeholder 仍优先。
    DatePicker: { defaults: { placeholder: void 0, valueFormat: "YYYY-MM-DD" } },
    DateRangePicker: { defaults: { placeholder: void 0, valueFormat: "YYYY-MM-DD" } },
    DateMonthPicker: { defaults: { placeholder: void 0 } },
    DateQuarterPicker: { defaults: { placeholder: void 0 } },
    DateWeekPicker: { defaults: { placeholder: void 0 } },
    DateYearPicker: { defaults: { placeholder: void 0 } },
    TimePicker: { defaults: { placeholder: void 0, valueFormat: "HH:mm:ss" } },
    TimeRangePicker: { defaults: { placeholder: void 0, valueFormat: "HH:mm:ss" } },
    TreeSelect: {
      processors: ["tree"],
      defaults: { allowClear: !0 },
      render: ({ slots: e, ...t }) => S(eb, t, e)
    },
    Switch: {
      processors: ["switch"],
      model: { prop: "checked", event: "update:checked" },
      adaptProps(e, { state: t }) {
        const n = t.switch;
        return n ? {
          ...e,
          checkedValue: n.checked.value,
          unCheckedValue: n.unchecked.value,
          checkedChildren: n.checked.label,
          unCheckedChildren: n.unchecked.label
        } : e;
      }
    },
    Transfer: { model: { prop: "targetKeys", event: "update:targetKeys" } }
  });
}
const Tb = Jo();
function At(e, t, n) {
  return S(e === "row" ? da : fa, t, n);
}
const nb = J({
  props: { state: { type: Object, required: !0 } },
  setup(e) {
    const t = (n) => n.label ? [
      S("th", ee({ class: "ant-descriptions-item-label" }, n.labelCol), [n.label()]),
      S(
        "td",
        ee({ class: "ant-descriptions-item-content", colspan: n.colspan * 2 - 1 }, n.wrapperCol),
        [n.content()]
      )
    ] : [
      S(
        "td",
        ee({ class: "ant-descriptions-item-content", colspan: n.colspan * 2 }, n.wrapperCol),
        [n.content()]
      )
    ];
    return () => {
      const n = e.state;
      if (n.mode === "table") {
        const a = n.layout === "vertical" ? n.rows.flatMap((o) => [
          (o.length > 1 || o[0].label) && S(
            "tr",
            { class: "ant-descriptions-row" },
            o.map(
              (s) => {
                var l;
                return S(
                  "th",
                  ee({ class: "ant-descriptions-item-label", colspan: s.colspan }, s.labelCol),
                  [(l = s.label) == null ? void 0 : l.call(s)]
                );
              }
            )
          ),
          S(
            "tr",
            { class: "ant-descriptions-row" },
            o.map(
              (s) => S(
                "td",
                ee({ class: "ant-descriptions-item-content", colspan: s.colspan }, s.wrapperCol),
                [s.content()]
              )
            )
          )
        ]) : n.rows.map((o) => S("tr", { class: "ant-descriptions-row" }, o.flatMap(t)));
        return S(
          "div",
          {
            ...n.attrs,
            class: [
              "ant-descriptions",
              "ant-descriptions-bordered",
              n.size !== "default" && `ant-descriptions-${n.size}`,
              n.attrs.class
            ]
          },
          S("div", { class: "ant-descriptions-view" }, S("table", { style: { tableLayout: n.tableLayout } }, a))
        );
      }
      const r = n.rows.map(
        (a) => At(
          "row",
          { class: "ant-descriptions-row", ...n.rowProps },
          {
            default: () => a.map((o) => At(
              "col",
              { ...o.colProps, key: o.key },
              {
                default: () => At(
                  "row",
                  { class: "ant-descriptions-item-container" },
                  {
                    default: () => [
                      o.label && At("col", ee({ class: "ant-descriptions-item-label" }, o.labelCol), {
                        default: () => {
                          var s;
                          return S("label", {}, [(s = o.label) == null ? void 0 : s.call(o)]);
                        }
                      }),
                      At(
                        "col",
                        ee({ class: "ant-descriptions-item-content" }, o.wrapperCol),
                        {
                          default: () => !o.attrs.noInput && n.mode === "form" && o.label ? S("div", { class: "sup-descriptions-item-input" }, [o.content()]) : o.content()
                        }
                      )
                    ]
                  }
                )
              }
            ))
          }
        )
      );
      return S(
        "div",
        {
          ...n.attrs,
          class: [
            "ant-descriptions",
            n.layout === "vertical" && "ant-descriptions-vertical",
            n.mode === "form" ? "sup-descriptions-mode-form" : "sup-descriptions-default",
            n.colon === !1 && "ant-descriptions-item-no-colon",
            n.size !== "default" && `ant-descriptions-${n.size}`,
            n.attrs.class
          ]
        },
        S("div", { class: "ant-descriptions-view" }, r)
      );
    };
  }
}), rb = (e) => {
  var s;
  const t = (l) => e.content ? String(l) : typeof l == "number" ? "number:" + l : /^(number:|string:)/.test(l) ? "string:" + l : l, n = new Map(e.items.map((l) => [t(l.key), l])), r = e.content ? void 0 : e.items.map((l) => {
    const { closeIcon: i, ...p } = l.attrs || {};
    return {
      ...p,
      key: t(l.key),
      label: l.title,
      content: l.content,
      disabled: l.disabled,
      closeIcon: typeof i == "function" ? i() : i
    };
  }), { tabPosition: a, ...o } = e.attrs || {};
  return S(
    pa,
    ee(a === void 0 ? o : { ...o, tabPlacement: a }, {
      items: r,
      activeKey: e.activeKeys === void 0 ? void 0 : t(e.activeKeys),
      "onUpdate:activeKey": (l) => {
        var p, c;
        const i = n.get(l);
        e.content ? (p = e.onActiveChange) == null || p.call(e, l) : i && ((c = e.onActiveChange) == null || c.call(e, i.key));
      }
    }),
    {
      ...e.slots,
      rightExtra: e.extra || ((s = e.slots) == null ? void 0 : s.rightExtra),
      default: e.content
    }
  );
}, ab = rb, ob = (e) => {
  const t = e.content ? void 0 : e.items.map((n) => {
    var r;
    return {
      ...n.attrs,
      key: n.key,
      // Collapse 的 items 接收节点而非插槽函数；用函数组件延迟求值，保留依赖追踪与面板懒挂载。
      label: n.title && S(n.title),
      extra: n.extra && S(n.extra),
      content: S(n.content),
      collapsible: n.disabled ? "disabled" : (r = n.attrs) == null ? void 0 : r.collapsible
    };
  });
  return [
    e.title && S("div", { class: ["sup-titlebar", "sup-title"] }, [e.title()]),
    S(
      as,
      ee(e.attrs || {}, {
        items: t,
        activeKey: e.activeKeys,
        onChange: e.onActiveChange
      }),
      {
        ...e.slots,
        default: e.content
      }
    )
  ];
}, sb = ob, lb = (e, t = {}) => {
  const { data: n, selection: r, expandedKeys: a, onExpandedChange: o, pagination: s, ...l } = e, i = (p = []) => p.map((c) => {
    const { customRender: v, children: b, ...g } = c;
    return {
      ...g,
      ...v ? {
        // antdv-next 使用 render，Core 的 customRender 参数需要在 Adapter 边界转换。
        render: (h, _, d) => v({ text: h, record: _, index: d, column: c })
      } : {},
      ...b != null && b.length ? { children: i(b) } : {}
    };
  });
  return S(
    os,
    {
      ...l,
      dataSource: n,
      columns: i(l.columns),
      rowSelection: r && {
        ...r.attrs,
        selectedRowKeys: r.selectedKeys,
        onChange: r.onChange,
        getCheckboxProps: r.isRowSelectable ? (p) => {
          var c;
          return {
            disabled: !((c = r.isRowSelectable) != null && c.call(r, p))
          };
        } : void 0
      },
      pagination: s && {
        ...s.attrs,
        ...s,
        attrs: void 0
      },
      expandedRowKeys: a,
      "onUpdate:expandedRowKeys": o
    },
    t
  );
}, ib = (e, t = {}) => {
  var g;
  const { bordered: n, items: r, value: a, onValueChange: o, attrs: s = {} } = e, { tabExtra: l, cardExtra: i, ...p } = t;
  if (n)
    return S(
      va,
      {
        tabList: r,
        activeTabKey: a,
        onTabChange: o
      },
      {
        ...p,
        customTab: ({ tab: h }) => h,
        tabBarExtraContent: l,
        extra: i
      }
    );
  const { tabPosition: c, ...v } = s;
  return [S(
    pa,
    {
      ...v,
      ...c === void 0 ? {} : { tabPlacement: c },
      activeKey: a,
      "onUpdate:activeKey": o
    },
    {
      ...p,
      default: () => r.map((h) => S(ss, { ...h, tab: () => h.tab })),
      rightExtra: l
    }
  ), (g = t.default) == null ? void 0 : g.call(t)];
}, ub = {
  table: ".ant-table",
  title: ".ant-table-title",
  header: ".ant-table-thead",
  footer: ".ant-table-footer",
  pagination: ".ant-pagination",
  wrapper: ".ant-table-wrapper",
  empty: ".ant-empty",
  emptyCell: ".ant-table-tbody .ant-table-cell",
  body: ".ant-table-body"
};
function Bt(e) {
  var t, n;
  (n = (t = (e == null ? void 0 : e.domEvent) || e) == null ? void 0 : t.stopPropagation) == null || n.call(t);
}
function Xo(e) {
  var t;
  return (t = e.menu) == null ? void 0 : t.map((n) => S(ga, {
    key: `${e.key}:${n.key}`,
    disabled: e.disabled || n.disabled,
    onClick: (r) => (Bt(r), e.onSelect(n.value, r.domEvent || r))
  }, { icon: n.icon, default: n.label }));
}
function cb(e, t) {
  const n = {
    ...e.attrs,
    disabled: e.disabled,
    onClick: (a) => {
      if (Bt(a), !e.menu)
        return e.onClick(a);
    }
  };
  let r = e.render ? e.render(n) : S(kn, n, () => {
    var a;
    return [
      !t.labelOnly && ((a = e.icon) == null ? void 0 : a.call(e)),
      (!t.iconOnly || !e.icon) && e.label(),
      e.menu && ge.expand()
    ];
  });
  if (e.menu) {
    const a = r;
    r = S(ma, { ...e.dropdownProps, disabled: e.disabled }, {
      default: () => a,
      popupRender: () => S(ba, {}, () => Xo(e))
    });
  }
  return S(ya, {}, { title: e.tooltip, default: () => S("span", { onClick: Bt }, [r]) });
}
function db(e) {
  const { groupProps: t, buttons: n, moreButtons: r, defaultButtonProps: a } = e, o = e.divider ?? ((t == null ? void 0 : t.direction) !== "vertical" && ["link", "text"].includes(String((a == null ? void 0 : a.variant) ?? (a == null ? void 0 : a.type) ?? ""))), s = n.flatMap((l, i) => [
    S("span", { key: l.key }, [cb(l, e)]),
    o && i < n.length - 1 ? S(ls, { type: "vertical", class: "sup-buttons-divider" }) : void 0
  ]);
  return r.length && s.push(S(ma, {}, {
    default: () => S(kn, { ...a, onClick: Bt }, e.moreLabel),
    popupRender: () => S(ba, {}, () => r.map((l) => l.menu ? S(is, { key: l.key, disabled: l.disabled }, {
      title: l.label,
      icon: l.icon,
      default: () => Xo(l)
    }) : S(ga, {
      key: l.key,
      disabled: l.disabled,
      onClick: (i) => (Bt(i), l.onClick(i.domEvent || i))
    }, { icon: l.icon, default: l.label })))
  })), S(ha, { size: o ? 0 : "small", ...t, class: ["sup-buttons", t == null ? void 0 : t.class] }, () => s);
}
const fb = (e, t = {}) => {
  const n = (r) => e.files.find((a) => a.uid === r.uid);
  return S("div", { class: "sup-upload" }, [
    S(lr, {
      ...e.attrs,
      disabled: e.readonly,
      fileList: e.files.map((r) => ({
        ...r,
        thumbUrl: r.thumbUrl || r.objectUrl,
        // 等待提交不属于上传中，避免原生列表一直显示进度。
        status: r.status === "waiting" ? void 0 : r.status
      })),
      showUploadList: e.showList && {
        showRemoveIcon: e.removable && !e.readonly,
        showPreviewIcon: e.previewable,
        showDownloadIcon: e.downloadable,
        extra: (r) => {
          var a;
          return ((a = n(r)) == null ? void 0 : a.status) === "waiting" ? " 待处理" : null;
        }
      },
      maxCount: void 0,
      customRequest: void 0,
      // 选入及请求仍由 Core 管理，原生列表只消费受控状态。
      beforeUpload: (r) => (e.select(r), lr.LIST_IGNORE),
      onChange: void 0,
      onRemove: async (r) => {
        const a = n(r);
        return a && await e.remove(a), !1;
      },
      onPreview: (r) => {
        const a = n(r);
        a && e.previewable && e.preview(a);
      },
      onDownload: (r) => {
        const a = n(r);
        a && e.downloadable && e.download(a);
      },
      isImageUrl: (r) => {
        const a = n(r);
        return !!(a && e.isImage(a));
      },
      onSuccess: void 0,
      onError: void 0,
      "onUpdate:fileList": void 0
    }, {
      ...t,
      ...t.file && { itemRender: ({ file: r }) => t.file({ file: n(r) }) },
      default: () => {
        var r;
        return e.hideTrigger ? null : ((r = t.default) == null ? void 0 : r.call(t)) ?? (e.attrs.listType === "picture-card" ? S("div", [ge.add(), e.title()]) : S(kn, {}, { default: () => [ge.upload(), e.title()] }));
      }
    }),
    !e.hideTrigger && e.tip && S("div", { class: "sup-upload-tip" }, e.tip),
    e.readonly && e.showList && !e.files.length && S("div", { class: "sup-upload-tip" }, "暂无附件")
  ]);
};
async function ia(e, t) {
  try {
    t ? await e.validateFields(t) : await e.validate();
  } catch (n) {
    throw Array.isArray(n == null ? void 0 : n.errorFields) ? new Qm(
      n.errorFields.map((r) => ({ path: r.name, messages: r.errors })),
      n
    ) : n;
  }
}
const pb = {
  form: {
    service: {
      validate: ia,
      validateField: (e, t) => ia(e, [t]),
      clearValidate: (e) => e.clearValidate()
    },
    component: us,
    adaptProps: ({ hideRequiredMark: e, ...t }) => e ? { ...t, requiredMark: !1 } : t
  },
  formItem: { defaults: { validateFirst: !0 }, component: cs },
  row: { component: da },
  col: { component: fa },
  space: { component: ha },
  compactSpace: { component: ds },
  card: {
    render: ({ state: e }) => S(va, e.attrs, {
      ...e.slots,
      title: e.title && (() => S("div", { class: "sup-title" }, [e.title()])),
      extra: e.extra,
      default: e.content
    })
  },
  tabs: { render: ({ state: e }) => ab(e) },
  collapse: { render: ({ state: e }) => sb(e) },
  descriptions: { render: ({ state: e }) => S(nb, { state: e }) },
  actionGroup: {
    schemaDefaults: {
      rowButtons: { buttonProps: { type: "link", size: "small" } },
      ButtonActions: {
        save: { attrs: { type: "primary" } },
        expand: { attrs: { type: "link" } },
        add: { attrs: { type: "primary" } },
        delete: { attrs: { danger: !0 } },
        submit: { attrs: { type: "primary" } },
        search: { attrs: { type: "primary" } }
      }
    },
    render: ({ attrs: e }) => db(e)
  },
  tooltip: { component: ya },
  tag: {
    component: fs,
    adaptProps: ({ removable: e, onRemove: t, ...n }) => ({ ...n, closable: e, onClose: t })
  },
  checkableTag: {
    component: ps,
    adaptProps: ({ selected: e, onSelectedChange: t, ...n }) => ({
      ...n,
      checked: e,
      onChange: t
    })
  },
  empty: { component: vs },
  modal: {
    service: {
      useContext: ms,
      wrapContext: (e, t, n) => {
        var s;
        const r = t == null ? void 0 : t.value, a = (s = r == null ? void 0 : r.getPrefixCls) == null ? void 0 : s.call(r), o = n.prefixCls || `${a}-modal`;
        return S(
          bs,
          { ...r, prefixCls: a },
          () => e({ ...n, rootPrefixCls: a, prefixCls: o })
        );
      }
    },
    component: xn,
    adaptProps: ({ visible: e, "onUpdate:visible": t, ...n }) => ({
      ...n,
      open: e,
      "onUpdate:open": t
    })
  },
  upload: { render: ({ state: e, slots: t }) => fb(e, t) },
  preview: {
    render: ({ attrs: e }) => {
      const { visible: t, "onUpdate:visible": n, images: r = [], current: a, width: o, height: s } = e;
      return S(
        ir.PreviewGroup,
        {
          style: { display: "none" },
          preview: { visible: t, current: a, onVisibleChange: n }
        },
        () => r.map((l, i) => S(ir, { key: i, src: l, width: o, height: s }))
      );
    }
  },
  table: {
    service: { selectors: ub },
    defaults: { size: "small" },
    render: ({ attrs: e, slots: t }) => lb(e, t)
  },
  tableFilter: { render: ({ attrs: e, slots: t }) => ib(e, t) }
};
function es(e = {}) {
  return Fo(
    Pv({
      name: "antdv-next",
      uiComponents: pb,
      supportedFields: Xm,
      adaptFieldProps: tb,
      fields: Jo(),
      fieldComponents: e.components,
      icons: { semantic: ge },
      services: {
        message: (t, n) => gs[t](n),
        confirm(t) {
          const n = xn.confirm(t);
          return {
            update: (r) => n.update(r),
            destroy: () => n.destroy()
          };
        },
        info(t) {
          const n = xn.info(t);
          return {
            update: (r) => n.update(r),
            destroy: () => n.destroy()
          };
        }
      }
    }),
    e.overrides
  );
}
const $b = es();
function Ib(e) {
  return e;
}
const vb = (e) => {
  var t, n;
  return ((n = (t = ue.tableApiSetting) == null ? void 0 : t.resultTransform) == null ? void 0 : n.call(t, e)) || e;
}, ua = (e) => {
  const { currentField: t, sizeField: n } = ue.tableApiSetting || {};
  return t || n ? {
    [t || "current"]: e.current,
    [n || "size"]: e.size
  } : e;
};
function mb(e, t, n) {
  const r = k({}), a = L(!1);
  let o = {}, s = 0, l;
  const i = [], p = (y) => i.push(y);
  e.onLoaded && i.push(e.onLoaded);
  const c = async (y) => {
    var w, C, x, A;
    const T = Mt({}, ua(r), o, y), $ = ((w = e.beforeQuery) == null ? void 0 : w.call(e, T)) || T, I = (C = e.apis) == null ? void 0 : C.query;
    l == null || l.abort();
    const P = ++s;
    if (!I) {
      l = void 0, a.value = !1;
      return;
    }
    const D = new AbortController();
    l = D, a.value = !0;
    try {
      const H = await I($, { signal: D.signal });
      if (P !== s || D.signal.aborted)
        return;
      const B = ((x = e.afterQuery) == null ? void 0 : x.call(e, H)) || H, U = vb(B);
      if (f.value && !Array.isArray(U) && ((A = U == null ? void 0 : U.records) == null ? void 0 : A.length) === 0 && Number.isFinite(U.total)) {
        const Y = Math.max(1, Math.ceil(U.total / (U.size || r.size)));
        if (r.current > Y)
          return r.current = Y, c({ ...y, ...ua(r) });
      }
      return v(U);
    } finally {
      P === s && (l = void 0, a.value = !1);
    }
  }, v = (y) => (Array.isArray(y) ? (t(y), f.value !== !1 && (r.current = 1, f.value = { ...f.value, total: y.length })) : y != null && y.records && (t(y.records), f.value !== !1 && (r.current = y.current, r.size = y.size, f.value = { ...f.value, total: y.total })), Promise.all(i.map((w) => w(y)))), b = (y, w = r.size) => (r.current = y, r.size = w, c()), g = (y) => (f.value && (r.current = 1), c(y)), h = yv((y) => g(y).catch((w) => {
    (w == null ? void 0 : w.name) !== "AbortError" && console.error(w);
  }), 300, { leading: !1 }), _ = () => {
    l == null || l.abort(), l = void 0, s += 1, a.value = !1;
  }, d = {}, m = (y, w) => {
    w === "dynamic" ? o = Mt({}, d, y) : (Object.assign(d, y), Mt(o, y));
  }, u = () => o, f = L(!1);
  return z(
    () => {
      var y;
      return e.pagination ?? ((y = e.attrs) == null ? void 0 : y.pagination);
    },
    (y) => {
      if (y === !1) {
        f.value = !1;
        return;
      }
      Object.assign(r, { size: (y == null ? void 0 : y.pageSize) || 10, current: (y == null ? void 0 : y.current) || 1 });
      const w = y == null ? void 0 : y.onChange, C = y == null ? void 0 : y.onShowSizeChange;
      f.value = {
        ...y,
        onChange: (x, A) => {
          const T = b(x, A);
          return w == null || w(x, A), T;
        },
        onShowSizeChange: (x, A) => {
          const T = b(x, A);
          return C == null || C(x, A), T;
        },
        pageSize: r.size,
        current: r.current
      };
    },
    {
      immediate: !0,
      flush: "sync"
    }
  ), z(r, (y) => {
    f.value && (f.value = { ...f.value, pageSize: y.size, current: y.current });
  }), z(
    () => {
      var y, w;
      return [(y = e.apis) == null ? void 0 : y.query, (n == null ? void 0 : n.value.length) ?? ((w = Q(e.dataSource)) == null ? void 0 : w.length), r.current, r.size, f.value === !1];
    },
    ([y, w]) => {
      if (y || !f.value || w === void 0)
        return;
      const C = Math.min(Math.max(1, r.current), Math.max(1, Math.ceil(w / r.size)));
      r.current = C, (f.value.total !== w || f.value.current !== C) && (f.value = { ...f.value, total: w, current: C });
    },
    { immediate: !0 }
  ), {
    goPage: b,
    reload: c,
    throttleRequest: h,
    cancelQuery: _,
    setQueryParams: m,
    getQueryParams: u,
    query: g,
    pagination: f,
    setPageData: v,
    onLoaded: p,
    loading: a
  };
}
function bb(e, t, n) {
  var r;
  const { columns: a, searchForm: o } = e, s = o || e.searchSchema || {}, l = L(), i = s.dataSource || k({}), { buttons: p = {}, searchOnChange: c, limit: v, ...b } = s, g = L(!1), h = [];
  s.subItems.forEach((f) => {
    if (typeof f == "string") {
      const y = a.find((w) => w.field === f);
      y && h.push({
        type: "Input",
        ...gv(y, "span", "disabled", "hidden"),
        editable: !0,
        exclude: []
      });
    } else
      return h.push({ ...f });
  }), v && h.length > v && h.forEach((f, y) => {
    if (y >= v) {
      const w = f.hidden;
      f.hidden = (...C) => !g.value || (w == null ? void 0 : w(...C));
    }
  });
  const _ = {
    search() {
      var f;
      n(i), (f = s.onSubmit) == null || f.call(s, ne(i));
    },
    reset(f) {
      l.value.resetFields(f);
    }
  }, d = Array.isArray(p) ? { actions: p } : { ...p };
  d.actions ?? (d.actions = c ? void 0 : ["search", "reset"]), (r = d.actions) != null && r.length && (v && h.length > v && (d.actions = [
    {
      name: "expand",
      onClick: () => g.value = !g.value
    },
    ...d.actions
  ]), h.push({
    type: "InfoSlot",
    align: "right",
    span: "auto",
    render: () => S("div", { style: { display: "flex", justifyContent: "flex-end", width: "100%" } }, [
      S(Fe, {
        option: d,
        methods: _,
        effectData: Pe({ table: t, form: l, expanded: g })
      })
    ])
  }));
  const m = z(l, () => {
    n(i), c && z(i, n), m();
  });
  return { formNode: () => S(_e.Form, {
    option: {
      ...b,
      ignoreRules: !0,
      dataSource: i,
      subItems: h
    },
    ref: l,
    onSubmit: _.search,
    onReset: _.search
  }), formRef: l, ..._, dataSource: i };
}
function gb(e) {
  return !e || !e.getBoundingClientRect ? 0 : e.getBoundingClientRect();
}
function ca(e) {
  const t = document.documentElement, n = t.scrollLeft, r = t.scrollTop, a = t.clientLeft, o = t.clientTop, s = window.pageXOffset, l = window.pageYOffset, i = gb(e), { left: p, top: c, width: v, height: b } = i, g = (s || n) - (a || 0), h = (l || r) - (o || 0), _ = p + s, d = c + l, m = _ - g, u = d - h, f = window.document.documentElement.clientWidth, y = window.document.documentElement.clientHeight;
  return {
    left: m,
    top: u,
    right: f - v - m,
    bottom: y - b - u,
    rightIncludeBody: f - m,
    bottomIncludeBody: y - u
  };
}
function hb(e, t, n, r) {
  const a = pe("table").selectors, o = (g, h) => h ? g.querySelector(h) : null, s = To(c, 100), l = L({});
  let i = !1;
  const p = () => {
    var g;
    i = !0, r ? window.addEventListener("resize", s, {
      signal: r.signal
    }) : document.addEventListener("redoHeight", s), l.value = (g = e.attrs) == null ? void 0 : g.scroll, z(
      () => {
        var _;
        return [n.value, (_ = Q(t)) == null ? void 0 : _.length];
      },
      () => {
        s();
      },
      { flush: "post" }
    );
    const h = z(
      n,
      (_) => {
        _ && (_.style.overflow = "hidden", new ResizeObserver(() => {
          s();
        }).observe(_), h());
      },
      { immediate: !0, flush: "post" }
    );
  };
  Nn(() => {
    i && document.removeEventListener("redoHeight", s);
  });
  function c() {
    i && Ne(() => {
      b();
    });
  }
  function v(g) {
    l.value = {
      y: g,
      x: "100%"
      // scrollToFirstRowOnChange: true,
    };
  }
  async function b() {
    var g;
    const { maxHeight: h, inheritHeight: _, isFixedHeight: d, resizeHeightOffset: m } = e, u = Q(n);
    if (!u)
      return;
    const f = o(u, a.table);
    if (!f)
      return;
    await Ne();
    const y = getComputedStyle(u.parentElement), w = ca(f), C = ca(u), x = w.left - C.left, A = (parseInt(y.marginBottom) || 0) + (parseInt(y.paddingBottom) || 0);
    let T = 0;
    u && _ ? T = C.bottomIncludeBody - C.bottom - (w.top - C.top) : T = w.bottomIncludeBody - A;
    const $ = o(f, a.title), I = ($ == null ? void 0 : $.parentElement) === f ? $.offsetHeight ?? 0 : 0, P = o(f, a.header);
    if (!P)
      return;
    let D = 0;
    P && (D = P.offsetHeight);
    let H = 0;
    const B = o(f, a.footer);
    B && B.parentElement === f && (H += B.offsetHeight || 0);
    let U = 0;
    const Y = o(u, a.pagination);
    Y && (U = Y.offsetHeight + 16);
    let W = Math.ceil(T) - (m || 0) - x - U;
    const V = h || W - H - I - D - 1;
    if (h && d && (W = h + H + I + D + 1), d) {
      f.style.height = `${W}px`, f.style["overflow-y"] = "hidden", _ || (u.style.height = "unset");
      const R = o(u, a.wrapper);
      if (R && (R.style.height = "", R.style["overflow-y"] = ""), !(((g = Q(t)) == null ? void 0 : g.length) > 0)) {
        if (o(f, a.empty)) {
          const oe = o(f, a.emptyCell);
          oe && (oe.style.height = `${V}px`);
        }
        return;
      }
    }
    if (f.scrollHeight > W)
      v(V);
    else {
      const R = o(f, a.body);
      R && v(R.scrollHeight <= V ? null : V);
    }
  }
  return { getScrollRef: l, redoHeight: c, debounceRedoHeight: s, listenResize: p };
}
const yb = J({
  name: "SuperTable",
  inheritAttrs: !1,
  props: {
    dataSource: Array,
    schema: Object
  },
  emits: ["register", "load", "update:dataSource"],
  setup(e, t) {
    const { style: n, class: r, ...a } = t.attrs, o = Wt({ attrs: a }), s = L([]), l = L(), i = (R) => {
      s.value = R, t.emit("update:dataSource", R), et(o.dataSource) && (o.dataSource.value = R);
    };
    He(() => e.dataSource && i(e.dataSource)), He(() => o.dataSource && i(Q(o.dataSource)));
    const p = L(), c = (R) => {
      ue.schemaDiagnostics && Ut(R, "table", "SuperTable");
      const { isScanHeight: G, inheritHeight: oe, isFixedHeight: me, isContainer: Se, ...Ce } = ee(
        Z.Table,
        { ...R.attrs },
        { ...o.attrs }
      );
      Object.assign(o, { isScanHeight: G, inheritHeight: oe, isFixedHeight: me, isContainer: Se }, R, { attrs: Ce });
    };
    He(() => e.schema && c(ne(e.schema)));
    const {
      loading: v,
      pagination: b,
      setPageData: g,
      onLoaded: h,
      goPage: _,
      reload: d,
      query: m,
      throttleRequest: u,
      cancelQuery: f,
      setQueryParams: y,
      getQueryParams: w
    } = mb(o, i, s), { getScrollRef: C, redoHeight: x, listenResize: A } = hb(o, s, l), T = ke(), $ = {
      setOption: c,
      setData: (R) => {
        R && i(R);
      },
      redoHeight: x,
      goPage: _,
      reload: d,
      query: m,
      onLoaded: h,
      resetSearchForm(R) {
        try {
          return p.value.formRef.resetFields(R);
        } catch (G) {
          console.warn(G);
        }
      },
      setPageData: g,
      getQueryParams: w,
      getData: () => s.value,
      dataRef: s,
      searchForm: N(() => {
        var R;
        return (R = p.value) == null ? void 0 : R.formRef;
      }),
      validate: async () => {
        T.value && await pe("form").validate(T.value);
      },
      setColumns: (R) => {
        var G;
        !Y && !((G = o.columns) != null && G.length) ? Object.assign(o, { columns: R }) : (Object.assign(o, { columns: R }), V(R));
      }
    }, I = L({ ...$ }), P = (R) => {
      Object.assign(I.value, Ye(k(R)), $), t.emit("register", I.value);
    };
    t.emit("register", I.value), t.expose(I.value);
    const D = k({
      reload: d,
      onRegister: P,
      loading: v
    });
    Ca(() => {
      f(), t.emit("register", null);
    }), Ke("rootSlots", t.slots);
    const H = L({}), B = L(), U = k({ formData: s, current: s, queryParams: N(w) });
    let Y = !1;
    const W = z(
      o,
      (R) => {
        var G, oe;
        if (!((G = R == null ? void 0 : R.columns) != null && G.length))
          return;
        if (B.value) {
          W();
          return;
        }
        const { columns: me, maxHeight: Se, isScanHeight: Ce = !0, inheritHeight: ye } = R, ze = k({
          refData: s,
          listData: gt(me)
        });
        H.value = St(o.slots, U, t.slots);
        const it = R.searchForm || R.searchSchema, {
          attrs: { onLoad: Ae, ...De }
        } = Ie({ option: R, effectData: U });
        Object.assign(D, De, { pagination: b }), h((de) => {
          t.emit("load", de), Ae == null || Ae(de);
        }), it && (p.value = bb(R, I, (de) => {
          y(de, "form"), Y && u();
        }));
        const Je = R.tabs && R.tabs.field;
        if (R.tabs && Je) {
          const de = (oe = R.tabs).activeKey ?? (oe.activeKey = L(R.tabs.defaultActiveKey)), O = {};
          z(
            de,
            (M) => {
              M !== void 0 && (Lt(O, Je, M), y(O), Y && u());
            },
            { immediate: !0 }
          );
        }
        if (z(
          L(R.params),
          (de) => {
            y(de, "dynamic"), Y && u();
          },
          { deep: !0, immediate: !0 }
        ), Ne(() => {
          Y = !0, o.immediate !== !1 && u();
        }), Ce || ye || Se) {
          A(), D.scroll = C;
          const { onChange: de, onExpandedRowsChange: O } = D;
          D.onChange = (...M) => {
            de == null || de(...M);
          }, D.onExpandedRowsChange = (M) => {
            O == null || O(M), x();
          }, z(s, x);
        }
        const Re = () => S(_e.Table, { option: o, effectData: U, model: ze, ...D }, H.value);
        o.editable ? B.value = () => q("form")({ model: s.value, ref: T }, { default: Re }) : B.value = Re;
      },
      {
        immediate: !0
      }
    ), V = (R) => {
      const G = k({
        refData: s,
        listData: gt(R)
      }), oe = Symbol(), me = () => S(_e.Table, { option: o, effectData: U, model: G, key: oe, ...D }, H.value);
      o.editable ? B.value = () => q("form")({ model: s.value, ref: T }, { default: me }) : B.value = me;
    };
    return () => B.value && S(
      ar,
      { name: "exaProvider", data: { data: s } },
      () => {
        var R, G;
        return !p.value || (R = o.searchForm) != null && R.teleport ? S(
          "div",
          ee(
            {
              ref: l,
              class: [o.isContainer && "sup-container", "sup-table", "sup-form-section"]
            },
            {
              class: r,
              style: n
            }
          ),
          [
            ((G = o.searchForm) == null ? void 0 : G.teleport) && S(
              Ws,
              { to: o.searchForm.teleport },
              S("div", { class: "sup-form-section sup-table-search" }, S(p.value.formNode))
            ),
            B.value()
          ]
        ) : S(
          "div",
          ee(
            { ref: l, class: [o.isContainer && "sup-container", "sup-table"] },
            { class: r, style: n }
          ),
          [
            S("div", { class: "sup-form-section sup-table-search" }, S(p.value.formNode)),
            S("div", { class: "sup-form-section section-last" }, S(B.value))
          ]
        );
      }
    );
  }
}), Mb = (e, t) => {
  const [n, r] = Vo(), a = Promise.resolve(typeof e == "function" ? e() : e), o = (l) => {
    if (l)
      n.value || (a.then(l.setOption), t && l.setData(t)), n.value = l;
    else if (l === null)
      n.value = void 0;
    else
      return (i, p) => S(yb, { ...i, onRegister: o }, p == null ? void 0 : p.slots);
  }, s = async (l, ...i) => {
    const p = await r();
    if (l && l in p)
      return typeof p[l] == "function" ? p[l](...i) : p[l];
  };
  return [
    o,
    {
      /** 异步获取表格引用 */
      getTable: r,
      tableRef: n,
      redoHeight() {
        s("redoHeight");
      },
      setData(l) {
        s("setPageData", l);
      },
      /** 返回当前表格数据 */
      getData() {
        var l;
        return se((l = n.value) == null ? void 0 : l.dataRef);
      },
      dataSource: N(() => {
        var l;
        return (l = n.value) == null ? void 0 : l.dataRef;
      }),
      /** 跳转到指定页 */
      goPage(l) {
        return s("goPage", l);
      },
      /** 设置表格列 */
      setColumns(l) {
        s("setColumns", l);
      },
      /** 刷新数据，不改动查询条件与当前页 */
      reload() {
        return s("reload");
      },
      /** 手动执行条件查询，不覆盖搜索表单参数 */
      query(l) {
        return s("query", l);
      },
      /** 查询完成，返回结果回调 */
      onLoaded(l) {
        s("onLoaded", l);
      },
      /** 重置查询表单，并重新查询 */
      resetSearchForm(l) {
        var i;
        (i = n.value) == null || i.resetSearchForm(l);
      },
      getQueryParams: () => {
        var l;
        return (l = n.value) == null ? void 0 : l.getQueryParams();
      },
      // setQueryParams: (params: Obj) => asyncCall('setQueryParams', params),
      selectedRowKeys: N(() => {
        var l;
        return (l = n.value) == null ? void 0 : l.selectedRowKeys;
      }),
      selectedRows: N(() => {
        var l;
        return (l = n.value) == null ? void 0 : l.selectedRows;
      }),
      /** 设置选中行 */
      setSelectedRows: (l) => {
        var i;
        return (i = n.value) == null ? void 0 : i.setSelectedRows(l);
      },
      expandedRowKeys: N(() => {
        var l;
        return (l = n.value) == null ? void 0 : l.expandedRowKeys;
      }),
      setExpandedRowKeys: (l) => {
        var i;
        return (i = n.value) == null ? void 0 : i.setExpandedRowKeys(l);
      },
      expandAll() {
        s("expandAll");
      },
      /** 新增行 */
      add: (l) => {
        var i;
        return (i = n.value) == null ? void 0 : i.add(l);
      },
      /** 修改行，须判断是否已有选中行 */
      edit: (l) => {
        var i;
        return (i = n.value) == null ? void 0 : i.edit(l);
      },
      /** 删除行，须判断是否已有选中行 */
      delete: () => {
        var l;
        return (l = n.value) == null ? void 0 : l.delete();
      },
      /** 查看详情，须判断是否已有选中行 */
      detail: (l) => {
        var i;
        return (i = n.value) == null ? void 0 : i.detail(l);
      },
      asyncCall: s,
      /** `editable`模式下进行表单校验 */
      validate() {
        return s("validate");
      }
    }
  ];
};
function Pb(e) {
  return e;
}
const wb = J({
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
    const r = (n = t.default) == null ? void 0 : n.call(t), { effectData: a, ...o } = e, s = r ? r.flatMap(({ children: l, props: i = {} }) => {
      const { roleName: p, onClick: c, confirmText: v, tooltip: b, disabledTooltip: g, icon: h, ..._ } = lv(
        i,
        (d, m) => vd(m)
      );
      return !c || !l ? [] : {
        label: l.default || l,
        icon: h,
        tooltip: b,
        disabledTooltip: g,
        roleName: p,
        onClick: c,
        confirmText: v,
        attrs: _
      };
    }) : e.actions;
    return () => S("div", {
      style: { display: "flex", justifyContent: { left: "flex-start", center: "center", right: "flex-end" }[e.align || "left"] }
    }, [S(Fe, { option: { ...o, actions: s }, effectData: a })]);
  }
});
function Db(e) {
  return [() => S(wb, e)];
}
const _b = J({
  props: {
    dataSource: Object,
    schema: Object
  },
  emits: ["register"],
  setup(e, t) {
    const n = ke(e.schema || {}), r = L({});
    z(
      () => e.schema,
      (s) => {
        ue.schemaDiagnostics && s && Ut(s, "detail", "SuperDetail"), n.value = s || {};
      },
      { immediate: !0 }
    ), z(
      () => Q(e.dataSource ?? n.value.dataSource),
      (s) => {
        s != null && (r.value = s);
      },
      { immediate: !0 }
    );
    const a = {
      setOption: (s) => {
        ue.schemaDiagnostics && Ut(s, "detail", "SuperDetail"), n.value = s;
      },
      setData: (s) => {
        r.value = s;
      }
    }, o = L();
    return z(
      n,
      (s) => {
        if (!(s != null && s.subItems)) {
          o.value = void 0;
          return;
        }
        const l = gt(s.subItems, r);
        o.value = l.modelsMap;
      },
      { immediate: !0 }
    ), t.expose(a), t.emit("register", a), Ke("exaProvider", Sa({ data: r })), Ke("rootSlots", t.slots), () => o.value && S(
      "div",
      { class: ["sup-detail", n.value.isContainer && "sup-container"] },
      S(Ze, {
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
function Rb(e, t) {
  const n = le(t), r = L(), a = Promise.resolve(typeof e == "function" ? e() : e), o = (s) => {
    if (s)
      r.value || (a.then(s.setOption), n.value && z(
        n,
        (l) => {
          s.setData(l);
        },
        { immediate: !0 }
      )), r.value = s;
    else
      return (l) => S(_b, { ...l, onRegister: o }, Zs());
  };
  return [
    o,
    {
      setData(s) {
        r.value ? r.value.setData(s) : n.value = s;
      }
    }
  ];
}
function Eb(e) {
  return e;
}
const Sb = Jm(
  "superform-antdv",
  (e) => es({ components: e })
), jb = Sb, Fb = {
  Input: hs,
  TextArea: ys,
  InputNumber: ws,
  InputOTP: _s,
  InputPassword: Ss,
  InputSearch: Cs,
  AutoComplete: xs,
  Cascader: As,
  ColorPicker: Os,
  Select: Ts,
  Radio: $s,
  RadioGroup: Is,
  Checkbox: Ms,
  CheckboxGroup: Ps,
  DatePicker: Ds,
  DateRangePicker: Rs,
  DateMonthPicker: Es,
  DateQuarterPicker: js,
  DateWeekPicker: Fs,
  DateYearPicker: Ls,
  TimePicker: ks,
  TimeRangePicker: Ns,
  TreeSelect: Us,
  Switch: Bs,
  Rate: Vs,
  Mentions: qs,
  Segmented: zs,
  Slider: Hs,
  Transfer: Gs
};
export {
  Qm as FormValidationError,
  wb as SuperButtons,
  _b as SuperDetail,
  dm as SuperForm,
  yb as SuperTable,
  $b as antdvAdapter,
  Tb as antdvFields,
  Ym as configure,
  es as createAntdvAdapter,
  Jo as createAntdvFields,
  or as createModal,
  jb as default,
  Eb as defineDetail,
  Ib as defineForm,
  Pb as defineTable,
  Pv as defineUIAdapter,
  Zv as diagnoseSchema,
  Fb as fieldComponents,
  Ob as registerAutoImportedComponents,
  Wm as registerComponent,
  Zm as registerComponents,
  Km as useAdapter,
  Db as useButtons,
  Rb as useDetail,
  fm as useForm,
  Ho as useModal,
  Ab as useModalForm,
  Mb as useTable
};
