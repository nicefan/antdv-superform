import { requireDayjs_min as ss, commonjsGlobal as ls, Row as bo, Col as go, PlusOutlined as is, MinusOutlined as us, EllipsisOutlined as ho, DownOutlined as yo, UpOutlined as cs, InfoCircleOutlined as ds, UploadOutlined as fs, PaperClipOutlined as ps, LoadingOutlined as vs, SyncOutlined as ms, CloseCircleOutlined as bs, InternalTooltip as zn, CheckableTag as wo, Tag as _o, staticMethods as gs, Modal as Sn, useConfig as hs, ConfigProvider as ys, Upload as gr, button_default as Xe, Image as hr, InternalTable as ws, card_default as So, Tabs as Co, TabPane as Ao, Divider as Oo, Dropdown as Gn, Menu as Kn, MenuItem as Yn, Space as To, form_default as _s, InternalFormItem as Ss, SpaceCompact as Cs, collapse_default as As, CollapsePanel as Os, CompoundedInput as Ts, InternalTextArea as xs, InputNumber as $s, InputOTP as Is, InputPassword as Ps, InputSearch as Ds, AutoComplete as Rs, Cascader as Ms, color_picker_default as Es, Select as Fs, radio_default as js, RadioGroup as Ls, checkbox_default as Us, CheckboxGroup as Ns, DatePicker as ks, DateRangePicker as Bs, DateMonthPicker as Vs, DateQuarterPicker as Hs, DateWeekPicker as qs, DateYearPicker as zs, TimePicker as Gs, TimeRangePicker as Ks, TreeSelect as Ys, Switch as Ws, Rate as Zs, Mentions as Qs, Segmented as Js, Slider as Xs, InternalTransfer as el } from "./antd.js";
import { defineComponent as W, provide as qe, reactive as L, inject as we, computed as k, toRaw as Y, toRefs as Fe, unref as B, mergeProps as te, h as _, toRef as ie, ref as R, watch as V, shallowRef as Pt, useAttrs as tl, shallowReactive as Dt, onMounted as xo, toValue as ce, getCurrentInstance as $o, onUnmounted as ln, isRef as Je, markRaw as nl, openBlock as Pe, createBlock as ct, resolveDynamicComponent as Tt, watchPostEffect as rl, nextTick as je, createVNode as Io, render as Pn, watchEffect as He, readonly as Po, createElementBlock as en, Fragment as Dn, renderList as Do, toDisplayString as ol, Teleport as al, useSlots as sl } from "vue";
var ll = { exports: {} };
(function(e, t) {
  (function(n, r) {
    e.exports = r(ss());
  })(ls, function(n) {
    function r(s) {
      return s && typeof s == "object" && "default" in s ? s : { default: s };
    }
    var o = r(n), a = { name: "zh-cn", weekdays: "星期日_星期一_星期二_星期三_星期四_星期五_星期六".split("_"), weekdaysShort: "周日_周一_周二_周三_周四_周五_周六".split("_"), weekdaysMin: "日_一_二_三_四_五_六".split("_"), months: "一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月".split("_"), monthsShort: "1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月".split("_"), ordinal: function(s, l) {
      return l === "W" ? s + "周" : s + "日";
    }, weekStart: 1, yearStart: 4, formats: { LT: "HH:mm", LTS: "HH:mm:ss", L: "YYYY/MM/DD", LL: "YYYY年M月D日", LLL: "YYYY年M月D日Ah点mm分", LLLL: "YYYY年M月D日ddddAh点mm分", l: "YYYY/M/D", ll: "YYYY年M月D日", lll: "YYYY年M月D日 HH:mm", llll: "YYYY年M月D日dddd HH:mm" }, relativeTime: { future: "%s内", past: "%s前", s: "几秒", m: "1 分钟", mm: "%d 分钟", h: "1 小时", hh: "%d 小时", d: "1 天", dd: "%d 天", M: "1 个月", MM: "%d 个月", y: "1 年", yy: "%d 年" }, meridiem: function(s, l) {
      var i = 100 * s + l;
      return i < 600 ? "凌晨" : i < 900 ? "早上" : i < 1100 ? "上午" : i < 1300 ? "中午" : i < 1800 ? "下午" : "晚上";
    } };
    return o.default.locale(a, null, !0), a;
  });
})(ll);
var il = typeof global == "object" && global && global.Object === Object && global;
const Ro = il;
var ul = typeof self == "object" && self && self.Object === Object && self, cl = Ro || ul || Function("return this")();
const Oe = cl;
var dl = Oe.Symbol;
const _e = dl;
var Mo = Object.prototype, fl = Mo.hasOwnProperty, pl = Mo.toString, Ct = _e ? _e.toStringTag : void 0;
function vl(e) {
  var t = fl.call(e, Ct), n = e[Ct];
  try {
    e[Ct] = void 0;
    var r = !0;
  } catch {
  }
  var o = pl.call(e);
  return r && (t ? e[Ct] = n : delete e[Ct]), o;
}
var ml = Object.prototype, bl = ml.toString;
function gl(e) {
  return bl.call(e);
}
var hl = "[object Null]", yl = "[object Undefined]", yr = _e ? _e.toStringTag : void 0;
function Ye(e) {
  return e == null ? e === void 0 ? yl : hl : yr && yr in Object(e) ? vl(e) : gl(e);
}
function Ce(e) {
  return e != null && typeof e == "object";
}
var wl = "[object Symbol]";
function un(e) {
  return typeof e == "symbol" || Ce(e) && Ye(e) == wl;
}
function Eo(e, t) {
  for (var n = -1, r = e == null ? 0 : e.length, o = Array(r); ++n < r; )
    o[n] = t(e[n], n, e);
  return o;
}
var _l = Array.isArray;
const de = _l;
var Sl = 1 / 0, wr = _e ? _e.prototype : void 0, _r = wr ? wr.toString : void 0;
function Fo(e) {
  if (typeof e == "string")
    return e;
  if (de(e))
    return Eo(e, Fo) + "";
  if (un(e))
    return _r ? _r.call(e) : "";
  var t = e + "";
  return t == "0" && 1 / e == -Sl ? "-0" : t;
}
var Cl = /\s/;
function Al(e) {
  for (var t = e.length; t-- && Cl.test(e.charAt(t)); )
    ;
  return t;
}
var Ol = /^\s+/;
function Tl(e) {
  return e && e.slice(0, Al(e) + 1).replace(Ol, "");
}
function fe(e) {
  var t = typeof e;
  return e != null && (t == "object" || t == "function");
}
var Sr = 0 / 0, xl = /^[-+]0x[0-9a-f]+$/i, $l = /^0b[01]+$/i, Il = /^0o[0-7]+$/i, Pl = parseInt;
function Cr(e) {
  if (typeof e == "number")
    return e;
  if (un(e))
    return Sr;
  if (fe(e)) {
    var t = typeof e.valueOf == "function" ? e.valueOf() : e;
    e = fe(t) ? t + "" : t;
  }
  if (typeof e != "string")
    return e === 0 ? e : +e;
  e = Tl(e);
  var n = $l.test(e);
  return n || Il.test(e) ? Pl(e.slice(2), n ? 2 : 8) : xl.test(e) ? Sr : +e;
}
function cn(e) {
  return e;
}
var Dl = "[object AsyncFunction]", Rl = "[object Function]", Ml = "[object GeneratorFunction]", El = "[object Proxy]";
function Ne(e) {
  if (!fe(e))
    return !1;
  var t = Ye(e);
  return t == Rl || t == Ml || t == Dl || t == El;
}
var Fl = Oe["__core-js_shared__"];
const Cn = Fl;
var Ar = function() {
  var e = /[^.]+$/.exec(Cn && Cn.keys && Cn.keys.IE_PROTO || "");
  return e ? "Symbol(src)_1." + e : "";
}();
function jl(e) {
  return !!Ar && Ar in e;
}
var Ll = Function.prototype, Ul = Ll.toString;
function ot(e) {
  if (e != null) {
    try {
      return Ul.call(e);
    } catch {
    }
    try {
      return e + "";
    } catch {
    }
  }
  return "";
}
var Nl = /[\\^$.*+?()[\]{}|]/g, kl = /^\[object .+?Constructor\]$/, Bl = Function.prototype, Vl = Object.prototype, Hl = Bl.toString, ql = Vl.hasOwnProperty, zl = RegExp(
  "^" + Hl.call(ql).replace(Nl, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
);
function Gl(e) {
  if (!fe(e) || jl(e))
    return !1;
  var t = Ne(e) ? zl : kl;
  return t.test(ot(e));
}
function Kl(e, t) {
  return e == null ? void 0 : e[t];
}
function at(e, t) {
  var n = Kl(e, t);
  return Gl(n) ? n : void 0;
}
var Yl = at(Oe, "WeakMap");
const Rn = Yl;
var Or = Object.create, Wl = function() {
  function e() {
  }
  return function(t) {
    if (!fe(t))
      return {};
    if (Or)
      return Or(t);
    e.prototype = t;
    var n = new e();
    return e.prototype = void 0, n;
  };
}();
const Zl = Wl;
function Ql(e, t, n) {
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
function Jl() {
}
function jo(e, t) {
  var n = -1, r = e.length;
  for (t || (t = Array(r)); ++n < r; )
    t[n] = e[n];
  return t;
}
var Xl = 800, ei = 16, ti = Date.now;
function ni(e) {
  var t = 0, n = 0;
  return function() {
    var r = ti(), o = ei - (r - n);
    if (n = r, o > 0) {
      if (++t >= Xl)
        return arguments[0];
    } else
      t = 0;
    return e.apply(void 0, arguments);
  };
}
function ri(e) {
  return function() {
    return e;
  };
}
var oi = function() {
  try {
    var e = at(Object, "defineProperty");
    return e({}, "", {}), e;
  } catch {
  }
}();
const tn = oi;
var ai = tn ? function(e, t) {
  return tn(e, "toString", {
    configurable: !0,
    enumerable: !1,
    value: ri(t),
    writable: !0
  });
} : cn;
const si = ai;
var li = ni(si);
const Lo = li;
function ii(e, t) {
  for (var n = -1, r = e == null ? 0 : e.length; ++n < r && t(e[n], n, e) !== !1; )
    ;
  return e;
}
function ui(e, t, n, r) {
  for (var o = e.length, a = n + (r ? 1 : -1); r ? a-- : ++a < o; )
    if (t(e[a], a, e))
      return a;
  return -1;
}
function ci(e) {
  return e !== e;
}
function di(e, t, n) {
  for (var r = n - 1, o = e.length; ++r < o; )
    if (e[r] === t)
      return r;
  return -1;
}
function fi(e, t, n) {
  return t === t ? di(e, t, n) : ui(e, ci, n);
}
function pi(e, t) {
  var n = e == null ? 0 : e.length;
  return !!n && fi(e, t, 0) > -1;
}
var vi = 9007199254740991, mi = /^(?:0|[1-9]\d*)$/;
function dn(e, t) {
  var n = typeof e;
  return t = t ?? vi, !!t && (n == "number" || n != "symbol" && mi.test(e)) && e > -1 && e % 1 == 0 && e < t;
}
function fn(e, t, n) {
  t == "__proto__" && tn ? tn(e, t, {
    configurable: !0,
    enumerable: !0,
    value: n,
    writable: !0
  }) : e[t] = n;
}
function gt(e, t) {
  return e === t || e !== e && t !== t;
}
var bi = Object.prototype, gi = bi.hasOwnProperty;
function Wn(e, t, n) {
  var r = e[t];
  (!(gi.call(e, t) && gt(r, n)) || n === void 0 && !(t in e)) && fn(e, t, n);
}
function ht(e, t, n, r) {
  var o = !n;
  n || (n = {});
  for (var a = -1, s = t.length; ++a < s; ) {
    var l = t[a], i = r ? r(n[l], e[l], l, n, e) : void 0;
    i === void 0 && (i = e[l]), o ? fn(n, l, i) : Wn(n, l, i);
  }
  return n;
}
var Tr = Math.max;
function Uo(e, t, n) {
  return t = Tr(t === void 0 ? e.length - 1 : t, 0), function() {
    for (var r = arguments, o = -1, a = Tr(r.length - t, 0), s = Array(a); ++o < a; )
      s[o] = r[t + o];
    o = -1;
    for (var l = Array(t + 1); ++o < t; )
      l[o] = r[o];
    return l[t] = n(s), Ql(e, this, l);
  };
}
function No(e, t) {
  return Lo(Uo(e, t, cn), e + "");
}
var hi = 9007199254740991;
function Zn(e) {
  return typeof e == "number" && e > -1 && e % 1 == 0 && e <= hi;
}
function pn(e) {
  return e != null && Zn(e.length) && !Ne(e);
}
function ko(e, t, n) {
  if (!fe(n))
    return !1;
  var r = typeof t;
  return (r == "number" ? pn(n) && dn(t, n.length) : r == "string" && t in n) ? gt(n[t], e) : !1;
}
function Bo(e) {
  return No(function(t, n) {
    var r = -1, o = n.length, a = o > 1 ? n[o - 1] : void 0, s = o > 2 ? n[2] : void 0;
    for (a = e.length > 3 && typeof a == "function" ? (o--, a) : void 0, s && ko(n[0], n[1], s) && (a = o < 3 ? void 0 : a, o = 1), t = Object(t); ++r < o; ) {
      var l = n[r];
      l && e(t, l, r, a);
    }
    return t;
  });
}
var yi = Object.prototype;
function Qn(e) {
  var t = e && e.constructor, n = typeof t == "function" && t.prototype || yi;
  return e === n;
}
function wi(e, t) {
  for (var n = -1, r = Array(e); ++n < e; )
    r[n] = t(n);
  return r;
}
var _i = "[object Arguments]";
function xr(e) {
  return Ce(e) && Ye(e) == _i;
}
var Vo = Object.prototype, Si = Vo.hasOwnProperty, Ci = Vo.propertyIsEnumerable, Ai = xr(function() {
  return arguments;
}()) ? xr : function(e) {
  return Ce(e) && Si.call(e, "callee") && !Ci.call(e, "callee");
};
const Rt = Ai;
function Oi() {
  return !1;
}
var Ho = typeof exports == "object" && exports && !exports.nodeType && exports, $r = Ho && typeof module == "object" && module && !module.nodeType && module, Ti = $r && $r.exports === Ho, Ir = Ti ? Oe.Buffer : void 0, xi = Ir ? Ir.isBuffer : void 0, $i = xi || Oi;
const Mt = $i;
var Ii = "[object Arguments]", Pi = "[object Array]", Di = "[object Boolean]", Ri = "[object Date]", Mi = "[object Error]", Ei = "[object Function]", Fi = "[object Map]", ji = "[object Number]", Li = "[object Object]", Ui = "[object RegExp]", Ni = "[object Set]", ki = "[object String]", Bi = "[object WeakMap]", Vi = "[object ArrayBuffer]", Hi = "[object DataView]", qi = "[object Float32Array]", zi = "[object Float64Array]", Gi = "[object Int8Array]", Ki = "[object Int16Array]", Yi = "[object Int32Array]", Wi = "[object Uint8Array]", Zi = "[object Uint8ClampedArray]", Qi = "[object Uint16Array]", Ji = "[object Uint32Array]", X = {};
X[qi] = X[zi] = X[Gi] = X[Ki] = X[Yi] = X[Wi] = X[Zi] = X[Qi] = X[Ji] = !0;
X[Ii] = X[Pi] = X[Vi] = X[Di] = X[Hi] = X[Ri] = X[Mi] = X[Ei] = X[Fi] = X[ji] = X[Li] = X[Ui] = X[Ni] = X[ki] = X[Bi] = !1;
function Xi(e) {
  return Ce(e) && Zn(e.length) && !!X[Ye(e)];
}
function Jn(e) {
  return function(t) {
    return e(t);
  };
}
var qo = typeof exports == "object" && exports && !exports.nodeType && exports, xt = qo && typeof module == "object" && module && !module.nodeType && module, eu = xt && xt.exports === qo, An = eu && Ro.process, tu = function() {
  try {
    var e = xt && xt.require && xt.require("util").types;
    return e || An && An.binding && An.binding("util");
  } catch {
  }
}();
const pt = tu;
var Pr = pt && pt.isTypedArray, nu = Pr ? Jn(Pr) : Xi;
const Xn = nu;
var ru = Object.prototype, ou = ru.hasOwnProperty;
function zo(e, t) {
  var n = de(e), r = !n && Rt(e), o = !n && !r && Mt(e), a = !n && !r && !o && Xn(e), s = n || r || o || a, l = s ? wi(e.length, String) : [], i = l.length;
  for (var u in e)
    (t || ou.call(e, u)) && !(s && // Safari 9 has enumerable `arguments.length` in strict mode.
    (u == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
    o && (u == "offset" || u == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
    a && (u == "buffer" || u == "byteLength" || u == "byteOffset") || // Skip index properties.
    dn(u, i))) && l.push(u);
  return l;
}
function Go(e, t) {
  return function(n) {
    return e(t(n));
  };
}
var au = Go(Object.keys, Object);
const su = au;
var lu = Object.prototype, iu = lu.hasOwnProperty;
function uu(e) {
  if (!Qn(e))
    return su(e);
  var t = [];
  for (var n in Object(e))
    iu.call(e, n) && n != "constructor" && t.push(n);
  return t;
}
function Ht(e) {
  return pn(e) ? zo(e) : uu(e);
}
function cu(e) {
  var t = [];
  if (e != null)
    for (var n in Object(e))
      t.push(n);
  return t;
}
var du = Object.prototype, fu = du.hasOwnProperty;
function pu(e) {
  if (!fe(e))
    return cu(e);
  var t = Qn(e), n = [];
  for (var r in e)
    r == "constructor" && (t || !fu.call(e, r)) || n.push(r);
  return n;
}
function yt(e) {
  return pn(e) ? zo(e, !0) : pu(e);
}
var vu = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, mu = /^\w*$/;
function er(e, t) {
  if (de(e))
    return !1;
  var n = typeof e;
  return n == "number" || n == "symbol" || n == "boolean" || e == null || un(e) ? !0 : mu.test(e) || !vu.test(e) || t != null && e in Object(t);
}
var bu = at(Object, "create");
const Et = bu;
function gu() {
  this.__data__ = Et ? Et(null) : {}, this.size = 0;
}
function hu(e) {
  var t = this.has(e) && delete this.__data__[e];
  return this.size -= t ? 1 : 0, t;
}
var yu = "__lodash_hash_undefined__", wu = Object.prototype, _u = wu.hasOwnProperty;
function Su(e) {
  var t = this.__data__;
  if (Et) {
    var n = t[e];
    return n === yu ? void 0 : n;
  }
  return _u.call(t, e) ? t[e] : void 0;
}
var Cu = Object.prototype, Au = Cu.hasOwnProperty;
function Ou(e) {
  var t = this.__data__;
  return Et ? t[e] !== void 0 : Au.call(t, e);
}
var Tu = "__lodash_hash_undefined__";
function xu(e, t) {
  var n = this.__data__;
  return this.size += this.has(e) ? 0 : 1, n[e] = Et && t === void 0 ? Tu : t, this;
}
function et(e) {
  var t = -1, n = e == null ? 0 : e.length;
  for (this.clear(); ++t < n; ) {
    var r = e[t];
    this.set(r[0], r[1]);
  }
}
et.prototype.clear = gu;
et.prototype.delete = hu;
et.prototype.get = Su;
et.prototype.has = Ou;
et.prototype.set = xu;
function $u() {
  this.__data__ = [], this.size = 0;
}
function vn(e, t) {
  for (var n = e.length; n--; )
    if (gt(e[n][0], t))
      return n;
  return -1;
}
var Iu = Array.prototype, Pu = Iu.splice;
function Du(e) {
  var t = this.__data__, n = vn(t, e);
  if (n < 0)
    return !1;
  var r = t.length - 1;
  return n == r ? t.pop() : Pu.call(t, n, 1), --this.size, !0;
}
function Ru(e) {
  var t = this.__data__, n = vn(t, e);
  return n < 0 ? void 0 : t[n][1];
}
function Mu(e) {
  return vn(this.__data__, e) > -1;
}
function Eu(e, t) {
  var n = this.__data__, r = vn(n, e);
  return r < 0 ? (++this.size, n.push([e, t])) : n[r][1] = t, this;
}
function ke(e) {
  var t = -1, n = e == null ? 0 : e.length;
  for (this.clear(); ++t < n; ) {
    var r = e[t];
    this.set(r[0], r[1]);
  }
}
ke.prototype.clear = $u;
ke.prototype.delete = Du;
ke.prototype.get = Ru;
ke.prototype.has = Mu;
ke.prototype.set = Eu;
var Fu = at(Oe, "Map");
const Ft = Fu;
function ju() {
  this.size = 0, this.__data__ = {
    hash: new et(),
    map: new (Ft || ke)(),
    string: new et()
  };
}
function Lu(e) {
  var t = typeof e;
  return t == "string" || t == "number" || t == "symbol" || t == "boolean" ? e !== "__proto__" : e === null;
}
function mn(e, t) {
  var n = e.__data__;
  return Lu(t) ? n[typeof t == "string" ? "string" : "hash"] : n.map;
}
function Uu(e) {
  var t = mn(this, e).delete(e);
  return this.size -= t ? 1 : 0, t;
}
function Nu(e) {
  return mn(this, e).get(e);
}
function ku(e) {
  return mn(this, e).has(e);
}
function Bu(e, t) {
  var n = mn(this, e), r = n.size;
  return n.set(e, t), this.size += n.size == r ? 0 : 1, this;
}
function Be(e) {
  var t = -1, n = e == null ? 0 : e.length;
  for (this.clear(); ++t < n; ) {
    var r = e[t];
    this.set(r[0], r[1]);
  }
}
Be.prototype.clear = ju;
Be.prototype.delete = Uu;
Be.prototype.get = Nu;
Be.prototype.has = ku;
Be.prototype.set = Bu;
var Vu = "Expected a function";
function tr(e, t) {
  if (typeof e != "function" || t != null && typeof t != "function")
    throw new TypeError(Vu);
  var n = function() {
    var r = arguments, o = t ? t.apply(this, r) : r[0], a = n.cache;
    if (a.has(o))
      return a.get(o);
    var s = e.apply(this, r);
    return n.cache = a.set(o, s) || a, s;
  };
  return n.cache = new (tr.Cache || Be)(), n;
}
tr.Cache = Be;
var Hu = 500;
function qu(e) {
  var t = tr(e, function(r) {
    return n.size === Hu && n.clear(), r;
  }), n = t.cache;
  return t;
}
var zu = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, Gu = /\\(\\)?/g, Ku = qu(function(e) {
  var t = [];
  return e.charCodeAt(0) === 46 && t.push(""), e.replace(zu, function(n, r, o, a) {
    t.push(o ? a.replace(Gu, "$1") : r || n);
  }), t;
});
const Yu = Ku;
function qt(e) {
  return e == null ? "" : Fo(e);
}
function zt(e, t) {
  return de(e) ? e : er(e, t) ? [e] : Yu(qt(e));
}
var Wu = 1 / 0;
function tt(e) {
  if (typeof e == "string" || un(e))
    return e;
  var t = e + "";
  return t == "0" && 1 / e == -Wu ? "-0" : t;
}
function bn(e, t) {
  t = zt(t, e);
  for (var n = 0, r = t.length; e != null && n < r; )
    e = e[tt(t[n++])];
  return n && n == r ? e : void 0;
}
function Le(e, t, n) {
  var r = e == null ? void 0 : bn(e, t);
  return r === void 0 ? n : r;
}
function nr(e, t) {
  for (var n = -1, r = t.length, o = e.length; ++n < r; )
    e[o + n] = t[n];
  return e;
}
var Dr = _e ? _e.isConcatSpreadable : void 0;
function Zu(e) {
  return de(e) || Rt(e) || !!(Dr && e && e[Dr]);
}
function Ko(e, t, n, r, o) {
  var a = -1, s = e.length;
  for (n || (n = Zu), o || (o = []); ++a < s; ) {
    var l = e[a];
    t > 0 && n(l) ? t > 1 ? Ko(l, t - 1, n, r, o) : nr(o, l) : r || (o[o.length] = l);
  }
  return o;
}
function Qu(e) {
  var t = e == null ? 0 : e.length;
  return t ? Ko(e, 1) : [];
}
function Ju(e) {
  return Lo(Uo(e, void 0, Qu), e + "");
}
var Xu = Go(Object.getPrototypeOf, Object);
const rr = Xu;
var ec = "[object Object]", tc = Function.prototype, nc = Object.prototype, Yo = tc.toString, rc = nc.hasOwnProperty, oc = Yo.call(Object);
function se(e) {
  if (!Ce(e) || Ye(e) != ec)
    return !1;
  var t = rr(e);
  if (t === null)
    return !0;
  var n = rc.call(t, "constructor") && t.constructor;
  return typeof n == "function" && n instanceof n && Yo.call(n) == oc;
}
function Wo(e, t, n) {
  var r = -1, o = e.length;
  t < 0 && (t = -t > o ? 0 : o + t), n = n > o ? o : n, n < 0 && (n += o), o = t > n ? 0 : n - t >>> 0, t >>>= 0;
  for (var a = Array(o); ++r < o; )
    a[r] = e[r + t];
  return a;
}
function ac(e, t, n) {
  var r = e.length;
  return n = n === void 0 ? r : n, !t && n >= r ? e : Wo(e, t, n);
}
var sc = "\\ud800-\\udfff", lc = "\\u0300-\\u036f", ic = "\\ufe20-\\ufe2f", uc = "\\u20d0-\\u20ff", cc = lc + ic + uc, dc = "\\ufe0e\\ufe0f", fc = "\\u200d", pc = RegExp("[" + fc + sc + cc + dc + "]");
function Zo(e) {
  return pc.test(e);
}
function vc(e) {
  return e.split("");
}
var Qo = "\\ud800-\\udfff", mc = "\\u0300-\\u036f", bc = "\\ufe20-\\ufe2f", gc = "\\u20d0-\\u20ff", hc = mc + bc + gc, yc = "\\ufe0e\\ufe0f", wc = "[" + Qo + "]", Mn = "[" + hc + "]", En = "\\ud83c[\\udffb-\\udfff]", _c = "(?:" + Mn + "|" + En + ")", Jo = "[^" + Qo + "]", Xo = "(?:\\ud83c[\\udde6-\\uddff]){2}", ea = "[\\ud800-\\udbff][\\udc00-\\udfff]", Sc = "\\u200d", ta = _c + "?", na = "[" + yc + "]?", Cc = "(?:" + Sc + "(?:" + [Jo, Xo, ea].join("|") + ")" + na + ta + ")*", Ac = na + ta + Cc, Oc = "(?:" + [Jo + Mn + "?", Mn, Xo, ea, wc].join("|") + ")", Tc = RegExp(En + "(?=" + En + ")|" + Oc + Ac, "g");
function xc(e) {
  return e.match(Tc) || [];
}
function $c(e) {
  return Zo(e) ? xc(e) : vc(e);
}
function Ic(e) {
  return function(t) {
    t = qt(t);
    var n = Zo(t) ? $c(t) : void 0, r = n ? n[0] : t.charAt(0), o = n ? ac(n, 1).join("") : t.slice(1);
    return r[e]() + o;
  };
}
var Pc = Ic("toUpperCase");
const Dc = Pc;
function Rc(e) {
  return Dc(qt(e).toLowerCase());
}
function Mc(e, t, n, r) {
  var o = -1, a = e == null ? 0 : e.length;
  for (r && a && (n = e[++o]); ++o < a; )
    n = t(n, e[o], o, e);
  return n;
}
function Ec(e) {
  return function(t) {
    return e == null ? void 0 : e[t];
  };
}
var Fc = {
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
}, jc = Ec(Fc);
const Lc = jc;
var Uc = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g, Nc = "\\u0300-\\u036f", kc = "\\ufe20-\\ufe2f", Bc = "\\u20d0-\\u20ff", Vc = Nc + kc + Bc, Hc = "[" + Vc + "]", qc = RegExp(Hc, "g");
function zc(e) {
  return e = qt(e), e && e.replace(Uc, Lc).replace(qc, "");
}
var Gc = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g;
function Kc(e) {
  return e.match(Gc) || [];
}
var Yc = /[a-z][A-Z]|[A-Z]{2}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/;
function Wc(e) {
  return Yc.test(e);
}
var ra = "\\ud800-\\udfff", Zc = "\\u0300-\\u036f", Qc = "\\ufe20-\\ufe2f", Jc = "\\u20d0-\\u20ff", Xc = Zc + Qc + Jc, oa = "\\u2700-\\u27bf", aa = "a-z\\xdf-\\xf6\\xf8-\\xff", ed = "\\xac\\xb1\\xd7\\xf7", td = "\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf", nd = "\\u2000-\\u206f", rd = " \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000", sa = "A-Z\\xc0-\\xd6\\xd8-\\xde", od = "\\ufe0e\\ufe0f", la = ed + td + nd + rd, ia = "['’]", Rr = "[" + la + "]", ad = "[" + Xc + "]", ua = "\\d+", sd = "[" + oa + "]", ca = "[" + aa + "]", da = "[^" + ra + la + ua + oa + aa + sa + "]", ld = "\\ud83c[\\udffb-\\udfff]", id = "(?:" + ad + "|" + ld + ")", ud = "[^" + ra + "]", fa = "(?:\\ud83c[\\udde6-\\uddff]){2}", pa = "[\\ud800-\\udbff][\\udc00-\\udfff]", st = "[" + sa + "]", cd = "\\u200d", Mr = "(?:" + ca + "|" + da + ")", dd = "(?:" + st + "|" + da + ")", Er = "(?:" + ia + "(?:d|ll|m|re|s|t|ve))?", Fr = "(?:" + ia + "(?:D|LL|M|RE|S|T|VE))?", va = id + "?", ma = "[" + od + "]?", fd = "(?:" + cd + "(?:" + [ud, fa, pa].join("|") + ")" + ma + va + ")*", pd = "\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])", vd = "\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])", md = ma + va + fd, bd = "(?:" + [sd, fa, pa].join("|") + ")" + md, gd = RegExp([
  st + "?" + ca + "+" + Er + "(?=" + [Rr, st, "$"].join("|") + ")",
  dd + "+" + Fr + "(?=" + [Rr, st + Mr, "$"].join("|") + ")",
  st + "?" + Mr + "+" + Er,
  st + "+" + Fr,
  vd,
  pd,
  ua,
  bd
].join("|"), "g");
function hd(e) {
  return e.match(gd) || [];
}
function yd(e, t, n) {
  return e = qt(e), t = n ? void 0 : t, t === void 0 ? Wc(e) ? hd(e) : Kc(e) : e.match(t) || [];
}
var wd = "['’]", _d = RegExp(wd, "g");
function Sd(e) {
  return function(t) {
    return Mc(yd(zc(t).replace(_d, "")), e, "");
  };
}
var Cd = Sd(function(e, t, n) {
  return t = t.toLowerCase(), e + (n ? Rc(t) : t);
});
const Ad = Cd;
function Od() {
  this.__data__ = new ke(), this.size = 0;
}
function Td(e) {
  var t = this.__data__, n = t.delete(e);
  return this.size = t.size, n;
}
function xd(e) {
  return this.__data__.get(e);
}
function $d(e) {
  return this.__data__.has(e);
}
var Id = 200;
function Pd(e, t) {
  var n = this.__data__;
  if (n instanceof ke) {
    var r = n.__data__;
    if (!Ft || r.length < Id - 1)
      return r.push([e, t]), this.size = ++n.size, this;
    n = this.__data__ = new Be(r);
  }
  return n.set(e, t), this.size = n.size, this;
}
function Se(e) {
  var t = this.__data__ = new ke(e);
  this.size = t.size;
}
Se.prototype.clear = Od;
Se.prototype.delete = Td;
Se.prototype.get = xd;
Se.prototype.has = $d;
Se.prototype.set = Pd;
function Dd(e, t) {
  return e && ht(t, Ht(t), e);
}
function Rd(e, t) {
  return e && ht(t, yt(t), e);
}
var ba = typeof exports == "object" && exports && !exports.nodeType && exports, jr = ba && typeof module == "object" && module && !module.nodeType && module, Md = jr && jr.exports === ba, Lr = Md ? Oe.Buffer : void 0, Ur = Lr ? Lr.allocUnsafe : void 0;
function ga(e, t) {
  if (t)
    return e.slice();
  var n = e.length, r = Ur ? Ur(n) : new e.constructor(n);
  return e.copy(r), r;
}
function Ed(e, t) {
  for (var n = -1, r = e == null ? 0 : e.length, o = 0, a = []; ++n < r; ) {
    var s = e[n];
    t(s, n, e) && (a[o++] = s);
  }
  return a;
}
function ha() {
  return [];
}
var Fd = Object.prototype, jd = Fd.propertyIsEnumerable, Nr = Object.getOwnPropertySymbols, Ld = Nr ? function(e) {
  return e == null ? [] : (e = Object(e), Ed(Nr(e), function(t) {
    return jd.call(e, t);
  }));
} : ha;
const or = Ld;
function Ud(e, t) {
  return ht(e, or(e), t);
}
var Nd = Object.getOwnPropertySymbols, kd = Nd ? function(e) {
  for (var t = []; e; )
    nr(t, or(e)), e = rr(e);
  return t;
} : ha;
const ya = kd;
function Bd(e, t) {
  return ht(e, ya(e), t);
}
function wa(e, t, n) {
  var r = t(e);
  return de(e) ? r : nr(r, n(e));
}
function Fn(e) {
  return wa(e, Ht, or);
}
function _a(e) {
  return wa(e, yt, ya);
}
var Vd = at(Oe, "DataView");
const jn = Vd;
var Hd = at(Oe, "Promise");
const Ln = Hd;
var qd = at(Oe, "Set");
const dt = qd;
var kr = "[object Map]", zd = "[object Object]", Br = "[object Promise]", Vr = "[object Set]", Hr = "[object WeakMap]", qr = "[object DataView]", Gd = ot(jn), Kd = ot(Ft), Yd = ot(Ln), Wd = ot(dt), Zd = ot(Rn), We = Ye;
(jn && We(new jn(new ArrayBuffer(1))) != qr || Ft && We(new Ft()) != kr || Ln && We(Ln.resolve()) != Br || dt && We(new dt()) != Vr || Rn && We(new Rn()) != Hr) && (We = function(e) {
  var t = Ye(e), n = t == zd ? e.constructor : void 0, r = n ? ot(n) : "";
  if (r)
    switch (r) {
      case Gd:
        return qr;
      case Kd:
        return kr;
      case Yd:
        return Br;
      case Wd:
        return Vr;
      case Zd:
        return Hr;
    }
  return t;
});
const jt = We;
var Qd = Object.prototype, Jd = Qd.hasOwnProperty;
function Xd(e) {
  var t = e.length, n = new e.constructor(t);
  return t && typeof e[0] == "string" && Jd.call(e, "index") && (n.index = e.index, n.input = e.input), n;
}
var ef = Oe.Uint8Array;
const nn = ef;
function ar(e) {
  var t = new e.constructor(e.byteLength);
  return new nn(t).set(new nn(e)), t;
}
function tf(e, t) {
  var n = t ? ar(e.buffer) : e.buffer;
  return new e.constructor(n, e.byteOffset, e.byteLength);
}
var nf = /\w*$/;
function rf(e) {
  var t = new e.constructor(e.source, nf.exec(e));
  return t.lastIndex = e.lastIndex, t;
}
var zr = _e ? _e.prototype : void 0, Gr = zr ? zr.valueOf : void 0;
function of(e) {
  return Gr ? Object(Gr.call(e)) : {};
}
function Sa(e, t) {
  var n = t ? ar(e.buffer) : e.buffer;
  return new e.constructor(n, e.byteOffset, e.length);
}
var af = "[object Boolean]", sf = "[object Date]", lf = "[object Map]", uf = "[object Number]", cf = "[object RegExp]", df = "[object Set]", ff = "[object String]", pf = "[object Symbol]", vf = "[object ArrayBuffer]", mf = "[object DataView]", bf = "[object Float32Array]", gf = "[object Float64Array]", hf = "[object Int8Array]", yf = "[object Int16Array]", wf = "[object Int32Array]", _f = "[object Uint8Array]", Sf = "[object Uint8ClampedArray]", Cf = "[object Uint16Array]", Af = "[object Uint32Array]";
function Of(e, t, n) {
  var r = e.constructor;
  switch (t) {
    case vf:
      return ar(e);
    case af:
    case sf:
      return new r(+e);
    case mf:
      return tf(e, n);
    case bf:
    case gf:
    case hf:
    case yf:
    case wf:
    case _f:
    case Sf:
    case Cf:
    case Af:
      return Sa(e, n);
    case lf:
      return new r();
    case uf:
    case ff:
      return new r(e);
    case cf:
      return rf(e);
    case df:
      return new r();
    case pf:
      return of(e);
  }
}
function Ca(e) {
  return typeof e.constructor == "function" && !Qn(e) ? Zl(rr(e)) : {};
}
var Tf = "[object Map]";
function xf(e) {
  return Ce(e) && jt(e) == Tf;
}
var Kr = pt && pt.isMap, $f = Kr ? Jn(Kr) : xf;
const If = $f;
var Pf = "[object Set]";
function Df(e) {
  return Ce(e) && jt(e) == Pf;
}
var Yr = pt && pt.isSet, Rf = Yr ? Jn(Yr) : Df;
const Mf = Rf;
var Ef = 1, Ff = 2, jf = 4, Aa = "[object Arguments]", Lf = "[object Array]", Uf = "[object Boolean]", Nf = "[object Date]", kf = "[object Error]", Oa = "[object Function]", Bf = "[object GeneratorFunction]", Vf = "[object Map]", Hf = "[object Number]", Ta = "[object Object]", qf = "[object RegExp]", zf = "[object Set]", Gf = "[object String]", Kf = "[object Symbol]", Yf = "[object WeakMap]", Wf = "[object ArrayBuffer]", Zf = "[object DataView]", Qf = "[object Float32Array]", Jf = "[object Float64Array]", Xf = "[object Int8Array]", ep = "[object Int16Array]", tp = "[object Int32Array]", np = "[object Uint8Array]", rp = "[object Uint8ClampedArray]", op = "[object Uint16Array]", ap = "[object Uint32Array]", Q = {};
Q[Aa] = Q[Lf] = Q[Wf] = Q[Zf] = Q[Uf] = Q[Nf] = Q[Qf] = Q[Jf] = Q[Xf] = Q[ep] = Q[tp] = Q[Vf] = Q[Hf] = Q[Ta] = Q[qf] = Q[zf] = Q[Gf] = Q[Kf] = Q[np] = Q[rp] = Q[op] = Q[ap] = !0;
Q[kf] = Q[Oa] = Q[Yf] = !1;
function $t(e, t, n, r, o, a) {
  var s, l = t & Ef, i = t & Ff, u = t & jf;
  if (n && (s = o ? n(e, r, o, a) : n(e)), s !== void 0)
    return s;
  if (!fe(e))
    return e;
  var c = de(e);
  if (c) {
    if (s = Xd(e), !l)
      return jo(e, s);
  } else {
    var b = jt(e), d = b == Oa || b == Bf;
    if (Mt(e))
      return ga(e, l);
    if (b == Ta || b == Aa || d && !o) {
      if (s = i || d ? {} : Ca(e), !l)
        return i ? Bd(e, Rd(s, e)) : Ud(e, Dd(s, e));
    } else {
      if (!Q[b])
        return o ? e : {};
      s = Of(e, b, l);
    }
  }
  a || (a = new Se());
  var y = a.get(e);
  if (y)
    return y;
  a.set(e, s), Mf(e) ? e.forEach(function(f) {
    s.add($t(f, t, n, f, e, a));
  }) : If(e) && e.forEach(function(f, g) {
    s.set(g, $t(f, t, n, g, e, a));
  });
  var v = u ? i ? _a : Fn : i ? yt : Ht, p = c ? void 0 : v(e);
  return ii(p || e, function(f, g) {
    p && (g = f, f = e[g]), Wn(s, g, $t(f, t, n, g, e, a));
  }), s;
}
var sp = 1, lp = 4;
function ft(e) {
  return $t(e, sp | lp);
}
var ip = "__lodash_hash_undefined__";
function up(e) {
  return this.__data__.set(e, ip), this;
}
function cp(e) {
  return this.__data__.has(e);
}
function Lt(e) {
  var t = -1, n = e == null ? 0 : e.length;
  for (this.__data__ = new Be(); ++t < n; )
    this.add(e[t]);
}
Lt.prototype.add = Lt.prototype.push = up;
Lt.prototype.has = cp;
function dp(e, t) {
  for (var n = -1, r = e == null ? 0 : e.length; ++n < r; )
    if (t(e[n], n, e))
      return !0;
  return !1;
}
function xa(e, t) {
  return e.has(t);
}
var fp = 1, pp = 2;
function $a(e, t, n, r, o, a) {
  var s = n & fp, l = e.length, i = t.length;
  if (l != i && !(s && i > l))
    return !1;
  var u = a.get(e), c = a.get(t);
  if (u && c)
    return u == t && c == e;
  var b = -1, d = !0, y = n & pp ? new Lt() : void 0;
  for (a.set(e, t), a.set(t, e); ++b < l; ) {
    var v = e[b], p = t[b];
    if (r)
      var f = s ? r(p, v, b, t, e, a) : r(v, p, b, e, t, a);
    if (f !== void 0) {
      if (f)
        continue;
      d = !1;
      break;
    }
    if (y) {
      if (!dp(t, function(g, m) {
        if (!xa(y, m) && (v === g || o(v, g, n, r, a)))
          return y.push(m);
      })) {
        d = !1;
        break;
      }
    } else if (!(v === p || o(v, p, n, r, a))) {
      d = !1;
      break;
    }
  }
  return a.delete(e), a.delete(t), d;
}
function vp(e) {
  var t = -1, n = Array(e.size);
  return e.forEach(function(r, o) {
    n[++t] = [o, r];
  }), n;
}
function sr(e) {
  var t = -1, n = Array(e.size);
  return e.forEach(function(r) {
    n[++t] = r;
  }), n;
}
var mp = 1, bp = 2, gp = "[object Boolean]", hp = "[object Date]", yp = "[object Error]", wp = "[object Map]", _p = "[object Number]", Sp = "[object RegExp]", Cp = "[object Set]", Ap = "[object String]", Op = "[object Symbol]", Tp = "[object ArrayBuffer]", xp = "[object DataView]", Wr = _e ? _e.prototype : void 0, On = Wr ? Wr.valueOf : void 0;
function $p(e, t, n, r, o, a, s) {
  switch (n) {
    case xp:
      if (e.byteLength != t.byteLength || e.byteOffset != t.byteOffset)
        return !1;
      e = e.buffer, t = t.buffer;
    case Tp:
      return !(e.byteLength != t.byteLength || !a(new nn(e), new nn(t)));
    case gp:
    case hp:
    case _p:
      return gt(+e, +t);
    case yp:
      return e.name == t.name && e.message == t.message;
    case Sp:
    case Ap:
      return e == t + "";
    case wp:
      var l = vp;
    case Cp:
      var i = r & mp;
      if (l || (l = sr), e.size != t.size && !i)
        return !1;
      var u = s.get(e);
      if (u)
        return u == t;
      r |= bp, s.set(e, t);
      var c = $a(l(e), l(t), r, o, a, s);
      return s.delete(e), c;
    case Op:
      if (On)
        return On.call(e) == On.call(t);
  }
  return !1;
}
var Ip = 1, Pp = Object.prototype, Dp = Pp.hasOwnProperty;
function Rp(e, t, n, r, o, a) {
  var s = n & Ip, l = Fn(e), i = l.length, u = Fn(t), c = u.length;
  if (i != c && !s)
    return !1;
  for (var b = i; b--; ) {
    var d = l[b];
    if (!(s ? d in t : Dp.call(t, d)))
      return !1;
  }
  var y = a.get(e), v = a.get(t);
  if (y && v)
    return y == t && v == e;
  var p = !0;
  a.set(e, t), a.set(t, e);
  for (var f = s; ++b < i; ) {
    d = l[b];
    var g = e[d], m = t[d];
    if (r)
      var h = s ? r(m, g, d, t, e, a) : r(g, m, d, e, t, a);
    if (!(h === void 0 ? g === m || o(g, m, n, r, a) : h)) {
      p = !1;
      break;
    }
    f || (f = d == "constructor");
  }
  if (p && !f) {
    var C = e.constructor, T = t.constructor;
    C != T && "constructor" in e && "constructor" in t && !(typeof C == "function" && C instanceof C && typeof T == "function" && T instanceof T) && (p = !1);
  }
  return a.delete(e), a.delete(t), p;
}
var Mp = 1, Zr = "[object Arguments]", Qr = "[object Array]", Qt = "[object Object]", Ep = Object.prototype, Jr = Ep.hasOwnProperty;
function Fp(e, t, n, r, o, a) {
  var s = de(e), l = de(t), i = s ? Qr : jt(e), u = l ? Qr : jt(t);
  i = i == Zr ? Qt : i, u = u == Zr ? Qt : u;
  var c = i == Qt, b = u == Qt, d = i == u;
  if (d && Mt(e)) {
    if (!Mt(t))
      return !1;
    s = !0, c = !1;
  }
  if (d && !c)
    return a || (a = new Se()), s || Xn(e) ? $a(e, t, n, r, o, a) : $p(e, t, i, n, r, o, a);
  if (!(n & Mp)) {
    var y = c && Jr.call(e, "__wrapped__"), v = b && Jr.call(t, "__wrapped__");
    if (y || v) {
      var p = y ? e.value() : e, f = v ? t.value() : t;
      return a || (a = new Se()), o(p, f, n, r, a);
    }
  }
  return d ? (a || (a = new Se()), Rp(e, t, n, r, o, a)) : !1;
}
function lr(e, t, n, r, o) {
  return e === t ? !0 : e == null || t == null || !Ce(e) && !Ce(t) ? e !== e && t !== t : Fp(e, t, n, r, lr, o);
}
var jp = 1, Lp = 2;
function Up(e, t, n, r) {
  var o = n.length, a = o, s = !r;
  if (e == null)
    return !a;
  for (e = Object(e); o--; ) {
    var l = n[o];
    if (s && l[2] ? l[1] !== e[l[0]] : !(l[0] in e))
      return !1;
  }
  for (; ++o < a; ) {
    l = n[o];
    var i = l[0], u = e[i], c = l[1];
    if (s && l[2]) {
      if (u === void 0 && !(i in e))
        return !1;
    } else {
      var b = new Se();
      if (r)
        var d = r(u, c, i, e, t, b);
      if (!(d === void 0 ? lr(c, u, jp | Lp, r, b) : d))
        return !1;
    }
  }
  return !0;
}
function Ia(e) {
  return e === e && !fe(e);
}
function Np(e) {
  for (var t = Ht(e), n = t.length; n--; ) {
    var r = t[n], o = e[r];
    t[n] = [r, o, Ia(o)];
  }
  return t;
}
function Pa(e, t) {
  return function(n) {
    return n == null ? !1 : n[e] === t && (t !== void 0 || e in Object(n));
  };
}
function kp(e) {
  var t = Np(e);
  return t.length == 1 && t[0][2] ? Pa(t[0][0], t[0][1]) : function(n) {
    return n === e || Up(n, e, t);
  };
}
function Bp(e, t) {
  return e != null && t in Object(e);
}
function Vp(e, t, n) {
  t = zt(t, e);
  for (var r = -1, o = t.length, a = !1; ++r < o; ) {
    var s = tt(t[r]);
    if (!(a = e != null && n(e, s)))
      break;
    e = e[s];
  }
  return a || ++r != o ? a : (o = e == null ? 0 : e.length, !!o && Zn(o) && dn(s, o) && (de(e) || Rt(e)));
}
function Hp(e, t) {
  return e != null && Vp(e, t, Bp);
}
var qp = 1, zp = 2;
function Gp(e, t) {
  return er(e) && Ia(t) ? Pa(tt(e), t) : function(n) {
    var r = Le(n, e);
    return r === void 0 && r === t ? Hp(n, e) : lr(t, r, qp | zp);
  };
}
function Kp(e) {
  return function(t) {
    return t == null ? void 0 : t[e];
  };
}
function Yp(e) {
  return function(t) {
    return bn(t, e);
  };
}
function Wp(e) {
  return er(e) ? Kp(tt(e)) : Yp(e);
}
function Zp(e) {
  return typeof e == "function" ? e : e == null ? cn : typeof e == "object" ? de(e) ? Gp(e[0], e[1]) : kp(e) : Wp(e);
}
function Qp(e) {
  return function(t, n, r) {
    for (var o = -1, a = Object(t), s = r(t), l = s.length; l--; ) {
      var i = s[e ? l : ++o];
      if (n(a[i], i, a) === !1)
        break;
    }
    return t;
  };
}
var Jp = Qp();
const Da = Jp;
function Xp(e, t) {
  return e && Da(e, t, Ht);
}
var ev = function() {
  return Oe.Date.now();
};
const Tn = ev;
var tv = "Expected a function", nv = Math.max, rv = Math.min;
function Ra(e, t, n) {
  var r, o, a, s, l, i, u = 0, c = !1, b = !1, d = !0;
  if (typeof e != "function")
    throw new TypeError(tv);
  t = Cr(t) || 0, fe(n) && (c = !!n.leading, b = "maxWait" in n, a = b ? nv(Cr(n.maxWait) || 0, t) : a, d = "trailing" in n ? !!n.trailing : d);
  function y(A) {
    var w = r, S = o;
    return r = o = void 0, u = A, s = e.apply(S, w), s;
  }
  function v(A) {
    return u = A, l = setTimeout(g, t), c ? y(A) : s;
  }
  function p(A) {
    var w = A - i, S = A - u, O = t - w;
    return b ? rv(O, a - S) : O;
  }
  function f(A) {
    var w = A - i, S = A - u;
    return i === void 0 || w >= t || w < 0 || b && S >= a;
  }
  function g() {
    var A = Tn();
    if (f(A))
      return m(A);
    l = setTimeout(g, p(A));
  }
  function m(A) {
    return l = void 0, d && r ? y(A) : (r = o = void 0, s);
  }
  function h() {
    l !== void 0 && clearTimeout(l), u = 0, r = i = o = l = void 0;
  }
  function C() {
    return l === void 0 ? s : m(Tn());
  }
  function T() {
    var A = Tn(), w = f(A);
    if (r = arguments, o = this, i = A, w) {
      if (l === void 0)
        return v(i);
      if (b)
        return clearTimeout(l), l = setTimeout(g, t), y(i);
    }
    return l === void 0 && (l = setTimeout(g, t)), s;
  }
  return T.cancel = h, T.flush = C, T;
}
var Ma = Object.prototype, ov = Ma.hasOwnProperty, av = No(function(e, t) {
  e = Object(e);
  var n = -1, r = t.length, o = r > 2 ? t[2] : void 0;
  for (o && ko(t[0], t[1], o) && (r = 1); ++n < r; )
    for (var a = t[n], s = yt(a), l = -1, i = s.length; ++l < i; ) {
      var u = s[l], c = e[u];
      (c === void 0 || gt(c, Ma[u]) && !ov.call(e, u)) && (e[u] = a[u]);
    }
  return e;
});
const ze = av;
function Un(e, t, n) {
  (n !== void 0 && !gt(e[t], n) || n === void 0 && !(t in e)) && fn(e, t, n);
}
function sv(e) {
  return Ce(e) && pn(e);
}
function Nn(e, t) {
  if (!(t === "constructor" && typeof e[t] == "function") && t != "__proto__")
    return e[t];
}
function lv(e) {
  return ht(e, yt(e));
}
function iv(e, t, n, r, o, a, s) {
  var l = Nn(e, n), i = Nn(t, n), u = s.get(i);
  if (u) {
    Un(e, n, u);
    return;
  }
  var c = a ? a(l, i, n + "", e, t, s) : void 0, b = c === void 0;
  if (b) {
    var d = de(i), y = !d && Mt(i), v = !d && !y && Xn(i);
    c = i, d || y || v ? de(l) ? c = l : sv(l) ? c = jo(l) : y ? (b = !1, c = ga(i, !0)) : v ? (b = !1, c = Sa(i, !0)) : c = [] : se(i) || Rt(i) ? (c = l, Rt(l) ? c = lv(l) : (!fe(l) || Ne(l)) && (c = Ca(i))) : b = !1;
  }
  b && (s.set(i, c), o(c, i, r, a, s), s.delete(i)), Un(e, n, c);
}
function ir(e, t, n, r, o) {
  e !== t && Da(t, function(a, s) {
    if (o || (o = new Se()), fe(a))
      iv(e, t, s, n, ir, r, o);
    else {
      var l = r ? r(Nn(e, s), a, s + "", e, t, o) : void 0;
      l === void 0 && (l = a), Un(e, s, l);
    }
  }, yt);
}
var uv = Bo(function(e, t, n, r) {
  ir(e, t, n, r);
});
const cv = uv;
function dv(e, t, n) {
  for (var r = -1, o = e == null ? 0 : e.length; ++r < o; )
    if (n(t, e[r]))
      return !0;
  return !1;
}
function fv(e) {
  var t = e == null ? 0 : e.length;
  return t ? e[t - 1] : void 0;
}
function pv(e) {
  return typeof e == "function" ? e : cn;
}
function vv(e, t) {
  return t.length < 2 ? e : bn(e, Wo(t, 0, -1));
}
var mv = "[object Number]";
function lt(e) {
  return typeof e == "number" || Ce(e) && Ye(e) == mv;
}
function bv(e, t) {
  var n = {};
  return t = Zp(t), Xp(e, function(r, o, a) {
    fn(n, t(r, o, a), r);
  }), n;
}
var gv = Bo(function(e, t, n) {
  ir(e, t, n);
});
const Gt = gv;
var hv = Object.prototype, yv = hv.hasOwnProperty;
function wv(e, t) {
  t = zt(t, e);
  var n = -1, r = t.length;
  if (!r)
    return !0;
  for (; ++n < r; ) {
    var o = tt(t[n]);
    if (o === "__proto__" && !yv.call(e, "__proto__") || (o === "constructor" || o === "prototype") && n < r - 1)
      return !1;
  }
  var a = vv(e, t);
  return a == null || delete a[tt(fv(t))];
}
function _v(e) {
  return se(e) ? void 0 : e;
}
var Sv = 1, Cv = 2, Av = 4, Ov = Ju(function(e, t) {
  var n = {};
  if (e == null)
    return n;
  var r = !1;
  t = Eo(t, function(a) {
    return a = zt(a, e), r || (r = a.length > 1), a;
  }), ht(e, _a(e), n), r && (n = $t(n, Sv | Cv | Av, _v));
  for (var o = t.length; o--; )
    wv(n, t[o]);
  return n;
});
const Tv = Ov;
function Ea(e, t, n, r) {
  if (!fe(e))
    return e;
  t = zt(t, e);
  for (var o = -1, a = t.length, s = a - 1, l = e; l != null && ++o < a; ) {
    var i = tt(t[o]), u = n;
    if (i === "__proto__" || i === "constructor" || i === "prototype")
      return e;
    if (o != s) {
      var c = l[i];
      u = r ? r(c, i, l) : void 0, u === void 0 && (u = fe(c) ? c : dn(t[o + 1]) ? [] : {});
    }
    Wn(l, i, u), l = l[i];
  }
  return e;
}
function vt(e, t, n) {
  return e == null ? e : Ea(e, t, n);
}
var xv = "Expected a function";
function kn(e, t, n) {
  var r = !0, o = !0;
  if (typeof e != "function")
    throw new TypeError(xv);
  return fe(n) && (r = "leading" in n ? !!n.leading : r, o = "trailing" in n ? !!n.trailing : o), Ra(e, t, {
    leading: r,
    maxWait: t,
    trailing: o
  });
}
var $v = 1 / 0, Iv = dt && 1 / sr(new dt([, -0]))[1] == $v ? function(e) {
  return new dt(e);
} : Jl;
const Pv = Iv;
var Dv = 200;
function Rv(e, t, n) {
  var r = -1, o = pi, a = e.length, s = !0, l = [], i = l;
  if (n)
    s = !1, o = dv;
  else if (a >= Dv) {
    var u = t ? null : Pv(e);
    if (u)
      return sr(u);
    s = !1, o = xa, i = new Lt();
  } else
    i = t ? [] : l;
  e:
    for (; ++r < a; ) {
      var c = e[r], b = t ? t(c) : c;
      if (c = n || c !== 0 ? c : 0, s && b === b) {
        for (var d = i.length; d--; )
          if (i[d] === b)
            continue e;
        t && i.push(b), l.push(c);
      } else
        o(i, b, n) || (i !== l && i.push(b), l.push(c));
    }
  return l;
}
function Mv(e) {
  return e && e.length ? Rv(e) : [];
}
function Ev(e, t, n, r) {
  return Ea(e, t, n(bn(e, t)), r);
}
function Fv(e, t, n) {
  return e == null ? e : Ev(e, t, pv(n));
}
let Ut = (e = 21) => crypto.getRandomValues(new Uint8Array(e)).reduce((t, n) => (n &= 63, n < 36 ? t += n.toString(36) : n < 62 ? t += (n - 26).toString(36).toUpperCase() : n > 62 ? t += "-" : t += "_", t), "");
const jv = [
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
], Fa = new Set(jv), re = {
  tagViewer: ["pink", "red", "orange", "green", "cyan", "blue", "purple"]
};
let it;
const ja = {}, La = {};
function Fb(e) {
  return e;
}
function U() {
  if (!it)
    throw new Error(
      "SuperForm 尚未初始化 UIAdapter；官方产品请先调用 superForm.initialize()，独立 Core 请调用 superForm.useAdapter(adapter)"
    );
  return it;
}
function Xr(e) {
  if (it && it !== e)
    throw new Error(
      `UIAdapter 已初始化为 '${it.name}'，不能切换为 '${e.name}'`
    );
  it = e, Ua(e.fieldComponents || {}, "manual");
}
function Kt(e) {
  var t;
  return (t = U().fields) == null ? void 0 : t[e];
}
function Ua(e, t = "manual") {
  const n = t === "manual" ? ja : La;
  Object.entries(e).forEach(([r, o]) => {
    o && (n[r] = o);
  });
}
function Na(e) {
  const t = Kt(e);
  if (t)
    return ja[t.component] ?? La[t.component];
}
function ur(e) {
  var t;
  const n = Na(e);
  if (!n) {
    const r = ((t = Kt(e)) == null ? void 0 : t.component) ?? e;
    throw new Error(
      `UIAdapter '${U().name}' 支持字段 '${e}'，但组件 '${String(
        r
      )}' 尚未注册；请启用自动导入插件，或在 superForm.initialize({ components }) 中提供`
    );
  }
  return n;
}
function Lv(e) {
  return typeof e == "string" ? U().components[e] : e;
}
function Yt(e, t) {
  const n = e && Lv(e);
  if (!n)
    throw new Error(
      `UIAdapter '${U().name}' 未提供 ${t} capability`
    );
  return n;
}
function ka(e, t) {
  const n = { ...e }, { prop: r = "value", event: o = "update:value" } = t || {};
  if (r !== "value" && (n[r] = n.value, delete n.value), o !== "update:value") {
    const a = o.startsWith("on") ? o : `on${o[0].toUpperCase()}${o.slice(1)}`;
    n[a] = n["onUpdate:value"], delete n["onUpdate:value"];
  }
  return n;
}
function Uv(e) {
  const t = U().layout, n = e === "compactSpace" ? (t == null ? void 0 : t.compactSpace) ?? (t == null ? void 0 : t.space) : t == null ? void 0 : t[e];
  return { component: Yt(n, e), layout: t };
}
function rn(e, t = {}) {
  var n;
  const r = U().form, o = Yt(r == null ? void 0 : r.component, "Form");
  return _(o, ((n = r == null ? void 0 : r.transformProps) == null ? void 0 : n.call(r, e)) ?? e, t);
}
function gn(e, t = {}) {
  var n;
  const r = U().form, o = Yt(r == null ? void 0 : r.item, "FormItem");
  return _(o, ((n = r == null ? void 0 : r.transformItemProps) == null ? void 0 : n.call(r, e)) ?? e, t);
}
function Nv(e) {
  const t = U().form;
  if (!t)
    throw new Error(
      `UIAdapter '${U().name}' 未提供 Form capability`
    );
  return t.validate(e);
}
function xn(e) {
  const t = U().form;
  if (!t)
    throw new Error(
      `UIAdapter '${U().name}' 未提供 Form capability`
    );
  return t.clearValidate(e);
}
function le(e, t = {}, n = {}) {
  var r, o;
  const { component: a, layout: s } = Uv(e);
  return _(a, ((o = (r = s == null ? void 0 : s.transformProps) == null ? void 0 : r[e]) == null ? void 0 : o.call(r, t)) ?? t, n);
}
function Ba(e) {
  var t;
  return (t = U().containers) == null ? void 0 : t[e];
}
function kv(e, t) {
  const n = Ba(e);
  let r = ka(t, n == null ? void 0 : n.model);
  return n != null && n.transformProps && (r = n.transformProps(r)), r;
}
function Ge(e, t = {}, n = {}) {
  const r = Ba(e), o = Yt(
    r == null ? void 0 : r.component,
    `Container(${e})`
  ), a = kv(e, t);
  return r != null && r.render ? r.render(o, a, n) : _(o, a, n);
}
function Bv(e, t = {}) {
  const n = U().icons;
  if (!n)
    throw new Error(
      `UIAdapter '${U().name}' 未提供 Icon capability`
    );
  return n.render(e, t);
}
function Ze(e) {
  var t;
  const n = U().icons;
  if (!n)
    throw new Error(
      `UIAdapter '${U().name}' 未提供 Icon capability`
    );
  const r = (t = n.semantic) == null ? void 0 : t[e];
  return r ? _(Yt(r, `Icon(${e})`)) : void 0;
}
function cr(e, t = {}, n = {}) {
  const r = U().actions;
  if (!r)
    throw new Error(
      `UIAdapter '${U().name}' 未提供 Action capability`
    );
  return r.render(e, t, n);
}
function on(e, t = {}, n = {}) {
  const r = U().presentation;
  if (!r)
    throw new Error(
      `UIAdapter '${U().name}' 未提供 Presentation capability`
    );
  return r.render(e, t, n);
}
function dr(e, t) {
  const n = U().services;
  if (!n)
    throw new Error(
      `UIAdapter '${U().name}' 未提供 Service capability`
    );
  return n.message(e, t);
}
function Va(e) {
  const t = U().services;
  if (!t)
    throw new Error(
      `UIAdapter '${U().name}' 未提供 Service capability`
    );
  return t.confirm(e);
}
function Vv(e) {
  const t = U().services;
  if (!t)
    throw new Error(
      `UIAdapter '${U().name}' 未提供 Service capability`
    );
  return t.info(e);
}
function Hv(e = {}, t = {}) {
  const n = U().modal;
  if (!n)
    throw new Error(
      `UIAdapter '${U().name}' 未提供 Modal capability`
    );
  return n.render(e, t);
}
function qv() {
  var e, t;
  return (t = (e = U().modal) == null ? void 0 : e.useContext) == null ? void 0 : t.call(e);
}
function zv(e, t, n = {}) {
  var r, o;
  return ((o = (r = U().modal) == null ? void 0 : r.wrapContext) == null ? void 0 : o.call(r, e, t, n)) ?? e();
}
function Gv() {
  const e = U().upload;
  if (!e)
    throw new Error(
      `UIAdapter '${U().name}' 未提供 Upload capability`
    );
  return e.listIgnore;
}
function Kv(e = {}, t = {}) {
  const n = U().upload;
  if (!n)
    throw new Error(
      `UIAdapter '${U().name}' 未提供 Upload capability`
    );
  return n.render(e, t);
}
function Yv(e = {}, t = {}) {
  const n = U().upload;
  if (!n)
    throw new Error(
      `UIAdapter '${U().name}' 未提供 Upload capability`
    );
  return n.renderTrigger(e, t);
}
function Wv(e = {}) {
  const t = U().preview;
  if (!t)
    throw new Error(
      `UIAdapter '${U().name}' 未提供 Preview capability`
    );
  return t.render(e);
}
function Zv(e, t = {}) {
  const n = U().table;
  if (!n)
    throw new Error(
      `UIAdapter '${U().name}' 未提供 Table capability`
    );
  return n.render(e, t);
}
function Qv(e, t = {}) {
  const n = U().table;
  if (!n)
    throw new Error(
      `UIAdapter '${U().name}' 未提供 Table capability`
    );
  return n.renderFilter(e, t);
}
function Jv() {
  const e = U().table;
  if (!e)
    throw new Error(
      `UIAdapter '${U().name}' 未提供 Table capability`
    );
  return e.selectors;
}
function fr(e, t, n) {
  const r = Kt(e);
  let o = ka(
    { ...r == null ? void 0 : r.defaultProps, ...t },
    r == null ? void 0 : r.model
  );
  return r != null && r.transformProps && (o = r.transformProps(o, { type: e, ...n })), o;
}
function Xv(e, t, n, r = {}) {
  const o = ur(e), a = Kt(e), s = fr(e, t, n);
  return a != null && a.render ? a.render(o, s, { type: e, ...n }, r) : _(o, s, r);
}
function hn(e) {
  if (e)
    return Bv(e, { customIcon: re.customIcon });
}
const nt = Ze;
function Te(e) {
  const t = we("exaProvider", {}).data;
  return L({ ...e || {}, formData: t });
}
function Nt(e, t) {
  const n = R(Je(e) ? e : !!e);
  return typeof e == "function" && He(() => {
    n.value = e(t);
  }), n;
}
function eo(e, t) {
  return Nt(e, t);
}
function Bn(e, t) {
  const n = L({});
  return e && He(() => {
    Object.assign(n, e(t));
  }), n;
}
function em(e = {}, t) {
  const n = {};
  return Object.keys(e).forEach((r) => {
    !e[r] || r === "onUpdate" || (r.match(/^on[A-Z]/) ? n[r] = (...o) => e[r](t, ...o) : r === "on" && Object.entries(e.on).forEach(([o, a]) => {
      const s = "on" + o.charAt(0).toUpperCase() + o.slice(1);
      n[s] = (...l) => a(t, ...l);
    }));
  }), n;
}
function pr({ option: e, model: t, effectData: n }, r, o = {}) {
  const {
    field: a,
    endField: s,
    keepField: l,
    labelField: i,
    stringifyValue: u,
    valueToString: c,
    computed: b,
    value: d,
    onUpdate: y
  } = e, v = s ?? l, p = u ?? c, f = {}, g = e.vModelFields || {};
  if (i && (f.labelValue = k(() => Le(t.parent, i)), f["onUpdate:labelValue"] = (w) => {
    const S = p ? w == null ? void 0 : w.toString() : w;
    vt(t.parent, i, S);
  }), Object.entries(g).forEach(([w, S]) => {
    var O;
    typeof S == "string" ? ((O = t.parent)[S] ?? (O[S] = void 0), f[w] = k(() => Le(t.parent, S)), f[`onUpdate:${w}`] = (I) => {
      vt(t.parent, S, I);
    }) : Je(S) ? (f[w] = S, f[`onUpdate:${w}`] = (I) => S.value = I) : f[w] = S;
  }), !a)
    return Je(d) && Object.assign(f, {
      value: d,
      "onUpdate:value": (w) => d.value = w
    }), f;
  r !== void 0 && (t.refData ?? (t.refData = ce(r)));
  const m = ie(t, "refData"), h = R(), C = (w = ce(r)) => {
    h.value = w, m.value !== w && r !== void 0 && (m.value = w);
  };
  Object.assign(f, {
    value: h,
    "onUpdate:value": C
  }), Je(d) && (V(m, (w) => d.value = w), V(d, C));
  let T = ce(t.refData), A;
  if (o.splitRange && v)
    h.value = [m.value, t.parent[v]], A = (w) => {
      const [S, O] = w || [];
      m.value = S, T = S, t.parent[v] = O;
    }, V([m, () => t.parent[v]], (w) => {
      h.value = w;
    });
  else if (p) {
    const w = (S) => (S == null ? void 0 : S.toString().split(",")) || [];
    h.value = w(m.value), A = (S) => {
      const O = (S == null ? void 0 : S.toString()) || "";
      m.value = O, T = O;
    }, V(m, (S) => {
      S !== T && (h.value = w(S));
    });
  } else
    h.value = T, A = (w) => {
      m.value = w, T = w;
    }, V(m, C, { flush: "sync" });
  return V(h, A, { flush: "sync" }), y && V(m, () => y(n)), b && V(
    // 使用ref让计算结果即使一样也会进行后面的赋值
    () => R(b(T, n)),
    (w) => A(B(w)),
    { immediate: !0 }
  ), f;
}
function Ae({ option: e, effectData: t, inheritDisabled: n }) {
  const { type: r, dynamicAttrs: o, disabled: a, hidden: s, required: l } = e, i = Nt(s, t), u = Nt(l, t), c = n === void 0 && a === void 0 ? void 0 : k(() => {
    let p = ce(n);
    return p || (typeof a == "function" ? p = !!a(t) : p = ce(a)), p;
  }), b = em(e, t), d = typeof o == "function" ? { ...Fe(Bn(o, t)) } : {}, y = te({ ...J[r] }, { ...e.attrs }, b, d);
  return { attrs: Gt({}, e.attrs, y, { disabled: c }), hidden: i, required: u };
}
function to(e, t = {}) {
  const n = new RegExp("{(\\w*)}", "g");
  return e.replace(n, (r, o) => t[o] || "");
}
const no = {
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
}, ro = {
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
function tm(e, t, n, r) {
  let o;
  if (t)
    o = { type: e, len: t, message: "len" };
  else if (lt(n) && lt(r))
    o = { type: e, max: n, min: r, message: "range" };
  else if (lt(n))
    o = { type: e, max: n, message: "max" };
  else if (lt(r))
    o = { type: e, min: r, message: "min" };
  else
    return !1;
  return e === "number" ? (o.message = ro.number[o.message], o.transform = (a) => Number(a)) : o.message = ro.string[o.message], o;
}
function nm(e, t = "") {
  const { trigger: n, required: r, type: o = "string", len: a, max: s, min: l, pattern: i, validator: u, message: c } = e || {}, b = [];
  r && (o === "string" || o in no ? b.push({
    required: r,
    trigger: n,
    // validator: noEmpty,
    pattern: /^[\s\S]*.*[^\s][\s\S]*$/,
    // transform: (value) => value + '',
    // whitespace: true,
    message: c || `${t}不能为空！`
  }) : b.push({ required: r, trigger: n, message: c || `${t}不能为空！` }));
  const d = no[o];
  if (d) {
    const y = to(d.message, { label: t });
    b.push({ ...d, trigger: n, message: y });
  }
  if (i && b.push({ pattern: i, trigger: n, message: c }), a || lt(s) || lt(l)) {
    const y = tm(o, a, s, l), v = to(y.message, { label: t, len: a, max: s, min: l });
    b.push({ ...y, trigger: n, message: v, type: o });
  }
  return u && b.push({ validator: u, trigger: n }), b;
}
function Ha(e, t, n) {
  const { field: r, columns: o, subItems: a, initialValue: s, value: l } = e, i = e.endField ?? e.keepField ?? e.labelField, u = r ? r.split(".") : [], c = n.concat(u), b = u.splice(-1)[0], d = L({
    refName: b,
    initialValue: s,
    fieldName: r,
    origin: t,
    parent: t,
    refData: t,
    propChain: c
  });
  return b ? (u.length && (d.parent = k(() => Le(t.value, u))), d.refData = k({
    get: () => Le(t.value, r),
    set: (y) => vt(t.value, r, y)
  }), V(
    t,
    () => {
      d.refData ?? (d.refData = ce(s) ?? ce(l) ?? (o && [] || a && {})), i && Fv(d.parent, i, (y) => y);
    },
    { immediate: !0, flush: "sync" }
  )) : l && (d.refData = R(l), d.propChain = []), d;
}
const kt = (e, t) => e == null ? void 0 : e.map((n) => n.validator ? { ...n, validator: async (o, ...a) => {
  const s = await n.validator({ ...o, ...t }, ...a);
  if (s === !1 || s instanceof Error)
    throw s;
} } : n);
function mt(e, t, n = []) {
  const r = ie(t || {}), o = {}, a = /* @__PURE__ */ new Map();
  return e.forEach((s) => {
    if (typeof s != "object")
      return;
    const l = Ha(s, r, n), { required: i, label: u, subItems: c, columns: b } = s;
    if ((s.rules || i) && l.propChain.length) {
      const d = s.rules || [], y = Array.isArray(d) ? d : [d];
      if (i) {
        const p = y[0];
        p ? p.required = i : y.push({ required: i });
      }
      let v = "string";
      if (l.refData) {
        const p = typeof l.refData;
        v = p === "object" && Array.isArray(l.refData) ? "array" : p;
      }
      l.rules = y.map((p) => nm({ type: v, ...p }, u)).flat(), o[l.propChain.join(".")] = l.rules;
    }
    if (c) {
      const d = mt(c, ie(l, "refData"), l.propChain);
      Object.assign(o, d.rules), l.children = d.modelsMap;
    } else
      b && (l.listData = mt(b));
    a.set(nl(s), l);
  }), {
    rules: o,
    modelsMap: a
  };
}
function rt(e, t, n = [], r) {
  const o = ie(t || {}), a = {}, s = [...e].map(([l, i]) => {
    const { children: u, rules: c, listData: b } = i, d = r !== void 0 ? [...n, r] : n, y = Ha(l, o, d);
    if (r !== void 0 && (y.index = r), y.rules = c, y.propChain.length && c && (a[y.propChain.join(".")] = c), u) {
      const { modelsMap: v, rules: p } = rt(u, ie(y, "refData"), y.propChain);
      Object.assign(a, p), y.children = v;
    }
    return b && (y.listData = b), [l, y];
  });
  return { modelsMap: new Map(s), rules: a };
}
function qa(e, t, n, r) {
  const { modelsMap: o, rules: a } = rt(e, t, n, r), s = [];
  return function l(i) {
    for (const [u, c] of i)
      s.push([u, c]), c.children && l(c.children);
  }(o), { modelsMap: new Map(s), rules: a };
}
const rm = (e, t) => Object.prototype.hasOwnProperty.call(e, t);
function vr(e, t = {}, n = {}) {
  for (const [r, o] of Object.entries(e))
    Array.isArray(o) ? e[r] = ft((t == null ? void 0 : t[r]) ?? (n == null ? void 0 : n[r])) : Object.prototype.toString.call(o) === "[object Object]" ? vr(o, t == null ? void 0 : t[r], n == null ? void 0 : n[r]) : e[r] = (t == null ? void 0 : t[r]) ?? (n == null ? void 0 : n[r]);
}
function za(e, t, n = {}) {
  for (const [r, o] of Object.entries(e)) {
    if (!rm(t, r))
      continue;
    const a = t[r] ?? (n == null ? void 0 : n[r]);
    se(o) && se(a) ? za(o, a, n == null ? void 0 : n[r]) : Array.isArray(a) || se(a) ? e[r] = ft(a) : e[r] = a;
  }
}
function oo() {
  let e;
  return { promise: new Promise((n) => {
    e = n;
  }), resolve: e };
}
function Ga() {
  const e = R();
  let t = oo(), n = !0;
  return V(e, (o) => {
    o ? (t.resolve(!0), n = !1) : n || (t = oo(), n = !0);
  }), [e, () => t.promise.then(() => e.value)];
}
function oe(e, t = {}) {
  return e ? typeof e == "function" ? e(t || {}, {}) : typeof e != "object" ? _("span", e) : _(e, { effectData: t }) : null;
}
function wt(e, t, n) {
  const r = n || we("rootSlots", {}), o = {};
  return e && Object.entries(e).forEach(([a, s]) => {
    const l = typeof s == "string" ? r[s] : s;
    l && (o[a] = (i) => typeof l == "function" ? l({ ...t, ...i || {} }) : l);
  }), o;
}
const ao = (e, t) => {
  const n = {};
  return e.vModelFields && Object.entries(e.vModelFields).forEach(([r, o]) => {
    n[r] = t[o];
  }), n;
}, so = (e, t, n) => se(e) || !se(e == null ? void 0 : e[0]) ? Object.entries(e).map(([r, o]) => ({ value: r, label: o })) : Array.isArray(e) ? e.map((r) => ({ label: r[t], value: r[n] })) : [], om = (e, t, n) => {
  var r, o, a, s;
  const { options: l, dictName: i } = e, u = ((o = (r = e.attrs) == null ? void 0 : r.fieldNames) == null ? void 0 : o.label) || "label", c = ((s = (a = e.attrs) == null ? void 0 : a.fieldNames) == null ? void 0 : s.value) || "value", b = B(l);
  i && re.dictApi ? re.dictApi(i).then((d) => n.value = d) : typeof l == "function" ? Promise.resolve(l(t)).then((d) => {
    n.value = so(d, u, c);
  }).catch((d) => {
    console.warn("useOptionsLabel", d);
  }) : n.value = so(b, u, c);
}, Jt = ({ value: e, label: t = e, color: n, icon: r, tagViewer: o = !0 }) => {
  const a = { color: n, label: t, icon: r };
  if (o !== !0 || !n) {
    const s = o === !0 ? re.tagViewer : o;
    if (typeof s == "function") {
      const l = s(e);
      se(l) ? Object.assign(a, l) : a.color = l;
    } else if (Array.isArray(s) && se(s[0])) {
      const l = s.find((i) => i.value == e);
      Object.assign(a, l);
    }
    a.color ?? (a.color = n || s[e] || e === !0 && "success" || e === !1 && "error" || "default");
  }
  return on(
    "tag",
    { color: a.color },
    {
      default: () => a.label || e,
      icon: a.icon || (() => hn(a.icon))
    }
  );
};
function Wt(e, t = {}) {
  const {
    type: n = "",
    viewRender: r,
    render: o,
    options: a,
    dictName: s,
    labelField: l,
    valueToNumber: i,
    tagViewer: u,
    initialValue: c
  } = e, b = e.endField ?? e.keepField, d = we("rootSlots", {}), y = r || n === "InfoSlot" && o, v = typeof y == "string" ? d[y] : y;
  if (y && !v)
    return !1;
  let p = !1;
  const f = (() => {
    var m, h;
    if (l)
      return ({ current: C } = t) => String(Le(C, l) ?? "");
    if (b)
      return ({ current: C, text: T } = t) => (T || "") + " - " + (Le(C, b) || "");
    if ((a || s) && n !== "AutoComplete") {
      p = !(u === !1 || !u && re.tagViewer === !1);
      let C = e.labelAsValue ?? e.valueToLabel;
      (m = B(a)) != null && m[0] && !se((h = B(a)) == null ? void 0 : h[0]) && !i && (C = !0);
      const T = R();
      return (A = t, w) => {
        const S = [], O = (A.text || A.value) ?? ce(c) ?? "";
        if (O === "")
          return "";
        if (C)
          return !w && p ? Jt({ value: O, label: O, tagViewer: u }) : O;
        T.value || om(e, A, T);
        const D = (Array.isArray(O) ? O : typeof O == "string" ? O.split(",") : [O]).map((P) => {
          var M;
          const H = (M = B(T)) == null ? void 0 : M.find(({ value: N }) => N == P);
          return !w && p && S.push(Jt({ value: P, label: P, ...H, tagViewer: u })), H ? H.label : P;
        });
        return S.length ? S : D.join(",");
      };
    } else if (n === "Switch")
      return ({ text: C } = t) => (e.valueLabels || "否是")[C ?? ce(c)];
  })(), g = !0;
  if (v)
    return (m = t) => {
      const h = ao(e, m.current), { attrs: C } = Ae({ option: e, effectData: m }), T = { ...C };
      delete T.disabled;
      const A = L({
        props: { ...T, ...h },
        ...m,
        ...f && { text: k(() => f(m, g)) },
        isView: !0
      });
      return v(A);
    };
  if (u && !p)
    return (m = t) => {
      const h = m.text ?? ce(c);
      return typeof h == "boolean" && u === !0 ? Jt({
        label: h ? "是" : "否",
        color: h ? "success" : "error"
      }) : (Array.isArray(h) ? h : typeof h == "string" ? h.split(",") : [h]).map((A) => Jt({ value: A, tagViewer: u }));
    };
  if (n === "Text" && (e.attrs || e.dynamicAttrs))
    return (m = t) => {
      const h = (f == null ? void 0 : f(m)) || (m.value ?? ce(c)), C = Bn(e.dynamicAttrs, m), T = te({ ...e.attrs, title: h }, C);
      return _("span", T, h);
    };
  if (n === "HTML")
    return (m = t) => {
      const h = Bn(e.dynamicAttrs, m), C = te({ ...e.attrs, innerHTML: m.value }, h);
      return _("span", C);
    };
  if (n === "TextArea")
    return (m = t) => _("pre", { style: "white-space: break-spaces;" }, m.value ?? ce(c));
  if (!f && (n === "Upload" || an(n)))
    return (m = t) => {
      const h = ao(e, m.current), C = wt(e.slots, m, d), {
        attrs: { disabled: T, ...A }
      } = Ae({ option: e, effectData: m });
      if (n === "Upload")
        return _(
          ge.Upload,
          L({ option: e, effectData: m, ...A, ...h, value: m.value, isView: !0, disabled: T }),
          C
        );
      const w = an(n);
      return w && _(
        w.component,
        L(
          Xa(w, {
            ...A,
            ...h,
            value: m.value,
            disabled: T
          })
        ),
        C
      );
    };
  if (n === "Buttons") {
    const m = bt({ config: e, isView: !0 });
    return !!m && ((h = t) => m({ param: h }));
  } else
    return f;
}
const _t = (e, t) => {
  const { title: n, label: r, labelSlot: o, tooltip: a } = e, s = a && (se(a) ? a : { title: a }), l = n || o || r;
  return l === void 0 ? void 0 : () => [
    oe(l, t),
    a && cr("tooltip", s, {
      title: () => oe(a.title, t),
      default: () => _(
        "span",
        {
          class: "sup-label-tooltip"
        },
        a.icon ? hn(a.icon) : nt("info")
      )
    })
  ];
}, am = /* @__PURE__ */ new Set([
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
]), sm = {
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
}, lm = /* @__PURE__ */ new Set(["Input", "InputNumber", "TextArea", "AutoComplete"]), im = /* @__PURE__ */ new Set(["Select", "TreeSelect"]), um = /* @__PURE__ */ new Set(["Select", "TreeSelect", "RadioGroup", "CheckboxGroup"]), cm = /* @__PURE__ */ new Set([
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
]), dm = /* @__PURE__ */ new Set(["table", "form", "description"]), fm = /* @__PURE__ */ new Set([
  "attrs",
  "dynamicAttrs",
  "dataSource",
  "initialValue",
  "options",
  "params",
  "rules",
  "treeData",
  "value"
]), Ee = (e) => e !== null && typeof e == "object" && !Array.isArray(e), z = (e, t, n, r) => ({ level: e, code: t, path: n, message: r });
function Vn(e, t, n, r) {
  if (!(!e || typeof e != "object" || r.has(e))) {
    if (r.add(e), Ee(e))
      for (const [o, a] of Object.entries(sm))
        Object.prototype.hasOwnProperty.call(e, o) && n.push(z("warning", "deprecated-api", `${t}.${o}`, `已废弃，${a}。`));
    for (const [o, a] of Object.entries(e))
      typeof a == "function" || fm.has(o) || (Array.isArray(a) ? a.forEach((s, l) => Vn(s, `${t}.${o}[${l}]`, n, r)) : Ee(a) && Vn(a, `${t}.${o}`, n, r));
  }
}
function pm(e, t, n, r, o) {
  var a, s, l;
  if (!Ee(e)) {
    typeof e != "string" && n.push(z("error", "invalid-item", t, "字段配置必须是对象。"));
    return;
  }
  const { type: i } = e;
  if (i !== void 0 && (typeof i != "string" || !o.has(i)) && n.push(z("error", "unknown-type", `${t}.type`, `未知字段类型 ${JSON.stringify(i)}。`)), i === void 0 && r !== "table" && n.push(z("warning", "missing-type", `${t}.type`, "表单或详情字段建议明确配置 type。")), Array.isArray(e.exclude)) {
    const d = e.exclude.filter((y) => !dm.has(y));
    d.length && n.push(
      z(
        "error",
        "invalid-exclude",
        `${t}.exclude`,
        `只支持 table、form、description，当前包含：${d.join("、")}。`
      )
    );
  } else
    e.exclude !== void 0 && n.push(z("error", "invalid-exclude", `${t}.exclude`, "exclude 必须是字符串数组。"));
  e.visibleIn !== void 0 && !["form", "detail", "both"].includes(e.visibleIn) && n.push(
    z("error", "invalid-visible-in", `${t}.visibleIn`, "visibleIn 只支持 'form'、'detail'、'both'。")
  ), e.unauthorized !== void 0 && !["hide", "disable"].includes(e.unauthorized) && n.push(
    z("error", "invalid-unauthorized", `${t}.unauthorized`, "unauthorized 只支持 'hide'、'disable'。")
  ), um.has(i) && !e.options && !e.dictName && n.push(z("warning", "missing-options", t, `${i} 未配置 options 或 dictName。`));
  const u = (a = e.attrs) == null ? void 0 : a.placeholder, c = lm.has(i) ? `请输入${typeof e.label == "string" ? e.label : ""}` : im.has(i) ? `请选择${typeof e.label == "string" ? e.label : ""}` : void 0;
  c !== void 0 && u === c && n.push(
    z("suggestion", "redundant-default", `${t}.attrs.placeholder`, "与内置 placeholder 相同，可以省略。")
  );
  const b = ["DatePicker", "DateRangePicker"].includes(i) ? "YYYY-MM-DD" : ["TimePicker", "TimeRangePicker"].includes(i) ? "HH:mm:ss" : void 0;
  b && ((s = e.attrs) == null ? void 0 : s.valueFormat) === b && n.push(
    z("suggestion", "redundant-default", `${t}.attrs.valueFormat`, "与内置 valueFormat 相同，可以省略。")
  ), i === "InputGroup" && ((l = e.attrs) == null ? void 0 : l.compact) === !0 && n.push(
    z("suggestion", "redundant-default", `${t}.attrs.compact`, "InputGroup 默认使用紧凑布局，可以省略。")
  ), e.block === !1 && !cm.has(i) && n.push(z("suggestion", "redundant-default", `${t}.block`, "block: false 是默认行为，可以省略。")), e.breakAfter === !1 && n.push(
    z("suggestion", "redundant-default", `${t}.breakAfter`, "breakAfter: false 是默认行为，可以省略。")
  ), (e.options || e.dictName) && e.tagViewer === !0 && n.push(
    z("suggestion", "redundant-default", `${t}.tagViewer`, "选项字段默认使用 Tag 展示，可以省略。")
  );
  for (const d of ["hidden", "disabled"])
    e[d] === !1 && n.push(z("suggestion", "redundant-default", `${t}.${d}`, `${d}: false 可以省略。`));
  Object.prototype.hasOwnProperty.call(e, "initialValue") && e.initialValue === void 0 && n.push(
    z("suggestion", "redundant-default", `${t}.initialValue`, "initialValue: undefined 可以省略。")
  );
  for (const d of ["attrs", "rowProps"])
    Ee(e[d]) && Object.keys(e[d]).length === 0 && n.push(z("suggestion", "empty-config", `${t}.${d}`, `空的 ${d} 配置可以省略。`));
  for (const d of ["rules", "options"])
    Array.isArray(e[d]) && e[d].length === 0 && n.push(z("suggestion", "empty-config", `${t}.${d}`, `空的 ${d} 配置可以省略。`));
  e.subItems && ut(e.subItems, `${t}.subItems`, n, r === "table" ? "form" : r, o), e.columns && ut(e.columns, `${t}.columns`, n, "table", o);
}
function ut(e, t, n, r, o) {
  if (!Array.isArray(e)) {
    n.push(z("error", "invalid-items", t, "必须是数组。"));
    return;
  }
  const a = /* @__PURE__ */ new Map();
  e.forEach((s, l) => {
    const i = `${t}[${l}]`;
    pm(s, i, n, r, o), !(!Ee(s) || typeof s.field != "string" || !s.field) && (a.has(s.field) ? n.push(
      z(
        "warning",
        "duplicate-field",
        `${i}.field`,
        `字段 ${s.field} 与 ${a.get(s.field)} 重复。`
      )
    ) : a.set(s.field, `${t}[${l}].field`));
  });
}
function vm(e, t = "auto", n = []) {
  var r, o, a, s, l, i, u;
  const c = [];
  if (!Ee(e))
    return [z("error", "invalid-schema", "schema", "schema 必须是对象。")];
  const b = /* @__PURE__ */ new Set([...am, ...n]);
  Vn(e, "schema", c, /* @__PURE__ */ new WeakSet());
  const d = t === "auto" ? Array.isArray(e.columns) ? "table" : "form" : t;
  if (!["form", "table", "detail"].includes(d))
    return [z("error", "invalid-schema-type", "schema", `未知 schema 类型 ${JSON.stringify(t)}。`)];
  if (e.subSpan === 8 && c.push(z("suggestion", "redundant-default", "schema.subSpan", "subSpan: 8 是默认值，可以省略。")), e.gutter === 16 && c.push(z("suggestion", "redundant-default", "schema.gutter", "gutter: 16 是默认值，可以省略。")), Ee(e.params) && Object.keys(e.params).length === 0 && c.push(z("suggestion", "empty-config", "schema.params", "空的 params 配置可以省略。")), d === "table") {
    for (const y of ["editMode", "addMode"])
      Object.prototype.hasOwnProperty.call(e, y) && c.push(z("warning", "deprecated-api", `schema.${y}`, `已废弃，使用 rowEditor.${y}。`));
    Array.isArray(e.columns) ? ut(e.columns, "schema.columns", c, "table", b) : c.push(z("error", "missing-columns", "schema.columns", "表格必须配置 columns。")), e.immediate === !0 && c.push(
      z("suggestion", "redundant-default", "schema.immediate", "immediate: true 是默认值，可以省略。")
    ), e.pagination === !1 && c.push(
      z("suggestion", "redundant-default", "schema.pagination", "pagination: false 是默认值，可以省略。")
    ), ((r = e.attrs) == null ? void 0 : r.rowKey) === "id" && c.push(
      z("suggestion", "redundant-default", "schema.attrs.rowKey", "rowKey: 'id' 是默认值，可以省略。")
    ), ((o = e.attrs) == null ? void 0 : o.size) === "small" && c.push(
      z("suggestion", "redundant-default", "schema.attrs.size", "size: 'small' 是默认值，可以省略。")
    ), ((a = e.attrs) == null ? void 0 : a.tableLayout) === "fixed" && c.push(
      z(
        "suggestion",
        "redundant-default",
        "schema.attrs.tableLayout",
        "tableLayout: 'fixed' 是默认值，可以省略。"
      )
    ), Ee(e.pagination) && e.pagination.current === 1 && c.push(
      z("suggestion", "redundant-default", "schema.pagination.current", "分页 current 默认是 1，可以省略。")
    ), Ee(e.pagination) && e.pagination.pageSize === 10 && c.push(
      z("suggestion", "redundant-default", "schema.pagination.pageSize", "分页 pageSize 默认是 10，可以省略。")
    ), (s = e.searchForm) != null && s.subItems && ut(e.searchForm.subItems, "schema.searchForm.subItems", c, "form", b), (i = (l = e.rowEditor) == null ? void 0 : l.form) != null && i.subItems && ut(e.rowEditor.form.subItems, "schema.rowEditor.form.subItems", c, "form", b);
  } else
    Array.isArray(e.subItems) ? (((u = e.attrs) == null ? void 0 : u.labelAlign) === "right" && c.push(
      z("suggestion", "redundant-default", "schema.attrs.labelAlign", "labelAlign: 'right' 是默认值，可以省略。")
    ), ut(e.subItems, "schema.subItems", c, d, b)) : c.push(z("error", "missing-sub-items", "schema.subItems", "表单或详情必须配置 subItems。"));
  return c;
}
function mm(e, t = "auto") {
  return vm(e, t, ub());
}
function Bt(e, t, n) {
  var r, o;
  const a = mm(e, t);
  return a.length && ((r = console.groupCollapsed) == null || r.call(console, `[superform] ${n} schema 诊断：${a.length} 项`), a.forEach(({ level: s, path: l, message: i }) => {
    const u = `[superform] ${l}: ${i}`;
    s === "error" ? console.error(u) : s === "warning" ? console.warn(u) : console.info(u);
  }), (o = console.groupEnd) == null || o.call(console)), a;
}
const bm = () => Gt(
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
  re.defaultButtons
);
function gm(e) {
  const t = bm();
  return Object.keys(e).forEach((n) => {
    t[n] ? typeof e[n] == "function" ? t[n].onClick = e[n] : Gt(t[n], { attrs: { title: t[n].label } }, e[n]) : t[n] = e[n];
  }), t;
}
function hm(e, t = {}, n = {}) {
  const r = gm(t), o = [];
  return Array.isArray(e) && e.forEach((a) => {
    const s = typeof a == "string" ? a : a.name, { onClick: l, ...i } = r[s] || {};
    i.attrs = ze({ ...n }, i.attrs), typeof a == "object" && Object.assign(i, a, { attrs: { ...i.attrs, ...a.attrs } });
    const u = R(!1), c = i.attrs.loading, b = Je(c);
    !b && c && (i.attrs.loading = u);
    const d = (f) => {
      b || (u.value = f ? c : !1);
    }, y = { label: i.label, ...a.meta }, v = a.onClick, p = (f, g, m) => {
      f ? Va({
        title: () => oe(f, m),
        okText: "确定",
        cancelText: "取消",
        ...J.Modal,
        onOk: g
      }) : (d(!0), Promise.resolve(g()).finally(() => {
        d(!1);
      }));
    };
    i.onClick = (f) => {
      const g = { ...f, meta: y };
      v && l ? p(
        i.confirmText,
        () => v(g, async (m) => l({ ...g, ...m })),
        f
      ) : p(i.confirmText, () => {
        var m;
        return (m = l || v) == null ? void 0 : m(g);
      }, f);
    }, o.push(i);
  }), o;
}
function ym(e, t, n) {
  const { size: r, buttonShape: o, buttonType: a, limit: s, hidden: l, disabled: i, actions: u } = e, c = e.unauthorized ?? (e.invalidDisabled || e.roleMode === "disable" ? "disable" : e.roleMode && "hide"), b = e.labelMode === "icon", d = { size: r, type: a, shape: o }, y = eo(i, t), v = Nt(l, t);
  let p = hm(u, n, d);
  if (re.buttonRoles) {
    const C = re.buttonRoles();
    p = p.filter((T) => {
      if (!(!T.roleName || C.includes(T.roleName)))
        if ((T.unauthorized ?? (T.invalidDisabled || T.roleMode === "disable" ? "disable" : T.roleMode && "hide") ?? c ?? "hide") === "disable")
          T.disabled = !0;
        else
          return !1;
      return !0;
    });
  }
  const f = we("rootSlots", {}), g = p.map((C) => {
    const T = Nt(C.hidden, t), A = C.disabled !== void 0 ? eo(C.disabled, t) : y, w = (D) => {
      var P;
      return (P = C.onClick) == null ? void 0 : P.call(C, { ...t, e: D });
    }, S = C.dropdown && k(() => {
      const D = ce(C.dropdown);
      return se(D) ? Object.entries(D).map(([P, M]) => ({
        value: P,
        label: M
      })) : typeof D[0] != "object" ? Mv(D).map((P) => ({ value: P, label: P })) : D;
    }), O = typeof C.customRender == "string" ? f[C.customRender] : C.customRender, I = k(() => {
      const D = A.value && C.disabledTooltip ? C.disabledTooltip : C.tooltip || (b && C.icon ? C.label : void 0);
      return typeof D == "function" ? D(t) : D;
    });
    return {
      isHide: T,
      render: O,
      menu: S,
      ...C,
      tooltipTitle: I,
      onClick: w,
      attrs: { ...d, ...C.attrs, disabled: A }
    };
  }), m = R([]), h = R([]);
  return He(() => {
    const C = v.value ? [] : g.filter(({ isHide: T }) => !T.value);
    if (m.value = C, s != null) {
      const T = b && C.length === s + 1 ? s + 1 : s;
      m.value = C.slice(0, T), h.value = C.slice(T);
    }
  }), { btns: m, moreBtns: h, defaultAttrs: d };
}
const De = /* @__PURE__ */ W({
  __name: "ButtonGroup",
  props: {
    option: {},
    methods: {},
    effectData: {}
  },
  setup(e) {
    const t = e, { option: n, methods: r, effectData: o } = t, a = Array.isArray(n) ? { actions: n } : n, { attrs: s, moreLabel: l, divider: i, buttonType: u } = a, c = a.labelMode === "icon", b = a.labelMode === "label", { btns: d, moreBtns: y, defaultAttrs: v } = ym(a, L(o || {}), r || a.methods), p = i ?? ((s == null ? void 0 : s.direction) !== "vertical" && ["link", "text"].includes(u || ""));
    return (f, g) => (Pe(), ct(Tt(
      () => B(cr)("group", {
        groupProps: B(s),
        buttons: B(d),
        moreButtons: B(y),
        defaultButtonProps: B(v),
        divider: B(p),
        labelOnly: b,
        iconOnly: c,
        moreLabel: B(l),
        effectData: B(o)
      })
    )));
  }
});
function bt({ config: e, methods: t, effectData: n, isView: r }) {
  const o = Array.isArray(e) ? { actions: e } : e, a = (o == null ? void 0 : o.visibleIn) ?? (o == null ? void 0 : o.validOn);
  if (!o || r && a === "form" || !r && a === "detail")
    return;
  let s = o.actions || [];
  if (a || (o.actions = s = s.filter((l) => {
    if (typeof l == "string")
      return !r;
    {
      const i = l.visibleIn ?? l.validOn;
      return r ? i !== "form" : i !== "detail";
    }
  })), s.length !== 0)
    return (l = {}) => _(De, { option: o, methods: t, effectData: n, ...l });
}
const mr = W({
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
    return qe(e.name, e.data || {}), t.slots.default;
  }
});
function Qe(e, t, n) {
  var r, o, a, s;
  const { options: l, dictName: i, valueToNumber: u } = e, c = ((o = (r = e.attrs) == null ? void 0 : r.fieldNames) == null ? void 0 : o.label) || "label", b = ((s = (a = e.attrs) == null ? void 0 : a.fieldNames) == null ? void 0 : s.value) || "value", d = R(t || []);
  return typeof l == "function" ? rl(() => {
    Promise.resolve(l(n)).then((v) => {
      d.value = v;
    });
  }) : l ? V(
    () => B(l),
    (v) => d.value = v,
    { immediate: !0 }
  ) : i && re.dictApi && re.dictApi(i).then((v) => d.value = v), {
    optionsRef: k(() => {
      let v = e.labelAsValue ?? e.valueToLabel;
      const p = de(d.value) ? d.value : [];
      return p[0] && !se(p[0]) && !u && (v = !0), se(d.value) || !se(p[0]) ? Object.entries(d.value).map(([f, g]) => ({
        label: g,
        value: v ? g : u ? Number(f) : f
      })) : p.map((f) => ({
        ...f,
        label: f[c],
        value: v ? f[c] : u ? Number(f[b]) : f[b]
      }));
    }),
    setOptions(v) {
      d.value = v;
    }
  };
}
function At(e) {
  const t = { ...e };
  return delete t.labelValue, delete t["onUpdate:labelValue"], t;
}
function $n(e, t) {
  const n = (r) => {
    var o;
    return (o = e.find((a) => Object.is(a.value, r))) == null ? void 0 : o.label;
  };
  return Array.isArray(t) ? t.map(n) : n(t);
}
const lo = {
  picker: ({ option: e, effectData: t }) => ({
    modelBehavior: {
      splitRange: !!(e.endField ?? e.keepField)
    },
    transformProps(n) {
      const r = n.disabledDate;
      return typeof r != "function" ? n : {
        ...n,
        disabledDate: (o) => r(o, t)
      };
    }
  }),
  input: ({ attrs: e }) => {
    const t = R(!1), n = e.onSearch, r = typeof n == "function", o = r ? async (...a) => {
      t.value = !0;
      try {
        await n(...a);
      } finally {
        t.value = !1;
      }
    } : void 0;
    return {
      transformProps: (a) => ({
        ...a,
        search: r,
        searchLoading: t.value,
        ...o && { onSearch: o }
      })
    };
  },
  autoComplete: ({ option: e, effectData: t, attrs: n }) => {
    const { optionsRef: r } = Qe({ ...e, labelAsValue: !0 }, n.options, t);
    return {
      transformProps: (o) => ({ ...o, options: r.value })
    };
  },
  select: ({ option: e, effectData: t, attrs: n }) => {
    const { optionsRef: r, setOptions: o } = Qe(e, n.options, t), a = typeof n.onSearch == "function" ? kn(n.onSearch, 600, { leading: !1 }) : void 0, s = n.showSearch && !a && typeof e.options == "function" ? kn(
      (u) => {
        Promise.resolve(e.options(t, u)).then(o);
      },
      600,
      { leading: !1 }
    ) : void 0;
    let l = {};
    const i = (u) => {
      var c;
      e.labelField && ((c = l["onUpdate:labelValue"]) == null || c.call(l, $n(r.value, u)));
    };
    return {
      transformProps(u) {
        return l = u, {
          ...At(u),
          options: r.value,
          onValueChange: i,
          onSearch: a || s
        };
      }
    };
  },
  radioGroup: ({ option: e, effectData: t, attrs: n }) => {
    const { optionsRef: r } = Qe(e, n.options, t);
    let o = {};
    const a = (s) => {
      var l;
      e.labelField && ((l = o["onUpdate:labelValue"]) == null || l.call(o, $n(r.value, s)));
    };
    return {
      transformProps(s) {
        return o = s, {
          ...At(s),
          options: r.value.map((i) => ({
            ...i,
            label: oe(i.label, t)
          })),
          onValueChange: a
        };
      }
    };
  },
  checkboxGroup: ({ option: e, effectData: t, attrs: n }) => {
    const { optionsRef: r } = Qe(e, n.options, t);
    let o = {};
    const a = (s) => {
      var l;
      e.labelField && ((l = o["onUpdate:labelValue"]) == null || l.call(o, $n(r.value, s)));
    };
    return {
      transformProps(s) {
        return o = s, {
          ...At(s),
          options: r.value,
          onValueChange: a
        };
      }
    };
  },
  treeSelect: ({ option: e, effectData: t }) => {
    const n = R([]), r = e.treeData ?? e.data;
    typeof r == "function" ? He(() => {
      Promise.resolve(r(t)).then((s) => n.value = s || []);
    }) : r && V(
      () => B(r),
      (s) => n.value = s || [],
      { immediate: !0 }
    );
    let o = {};
    const a = (s, l) => {
      var i;
      e.labelField && ((i = o["onUpdate:labelValue"]) == null || i.call(o, l));
    };
    return {
      transformProps(s) {
        return o = s, { ...At(s), treeData: n.value, onValueChange: a };
      }
    };
  },
  switch: ({ option: e, effectData: t, attrs: n, model: r }) => {
    const { optionsRef: o } = Qe(e, n.options, t), a = ie(r, "refData"), [s, l] = e.valueLabels || [], i = e.valueToNumber ?? n.valueToNumber, u = i ? 1 : !0, c = i ? 0 : !1, b = k(() => {
      const [f, g] = o.value;
      return n.firstIsChecked ? {
        trueLabel: (f == null ? void 0 : f.label) ?? l,
        falseLabel: (g == null ? void 0 : g.label) ?? s,
        trueValue: (f == null ? void 0 : f.value) ?? u,
        falseValue: (g == null ? void 0 : g.value) ?? c
      } : {
        trueLabel: (g == null ? void 0 : g.label) ?? l,
        falseLabel: (f == null ? void 0 : f.label) ?? s,
        trueValue: (g == null ? void 0 : g.value) ?? u,
        falseValue: (f == null ? void 0 : f.value) ?? c
      };
    }), d = (f) => {
      if (!e.labelField)
        return;
      const g = o.value.find((h) => Object.is(h.value, f)), m = (g == null ? void 0 : g.label) ?? (Object.is(f, b.value.trueValue) ? b.value.trueLabel : Object.is(f, b.value.falseValue) ? b.value.falseLabel : void 0);
      vt(r.parent, e.labelField, m);
    }, y = k(
      () => n.options !== void 0 || e.options !== void 0 || !!e.dictName
    );
    V(
      [a, o],
      ([f, g]) => {
        if (f === void 0) {
          if (y.value && !g.length)
            return;
          const m = n.defaultChecked ? b.value.trueValue : b.value.falseValue;
          r.refData = m, d(m);
        } else
          d(f);
      },
      { immediate: !0 }
    );
    let v = {};
    const p = (f) => {
      var g;
      (g = v["onUpdate:value"]) == null || g.call(v, f), d(f);
    };
    return {
      transformProps(f) {
        return v = f, { ...At(f), ...b.value, "onUpdate:value": p };
      }
    };
  }
};
function wm(e, t) {
  const n = e.map((r) => {
    var o;
    return (o = lo[r]) == null ? void 0 : o.call(lo, t);
  }).filter(Boolean);
  return {
    modelBehavior: Object.assign({}, ...n.map(({ modelBehavior: r }) => r)),
    transformProps: (r) => n.reduce((o, a) => a.transformProps ? a.transformProps(o) : o, r)
  };
}
const _m = W({
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
    const n = wm(e.processors, {
      option: e.option,
      effectData: e.effectData,
      attrs: t.attrs,
      model: e.model
    }), r = pr(
      {
        option: e.option,
        model: e.model,
        effectData: e.effectData
      },
      void 0,
      n.modelBehavior
    );
    return () => {
      const o = n.transformProps(L({ ...t.attrs, ...r }));
      return Xv(
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
}), Ue = W({
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
    const { type: t, attrs: n, gutter: r = 16, subSpan: o } = e.option, a = { gutter: r, ...e.option.rowProps }, s = we("inheritOptions", {}), l = o ?? s.subSpan, i = k(() => e.model.index), u = [];
    let c;
    const b = [...e.model.children];
    for (let v = 0; v < b.length; v++) {
      const [p, f] = b[v], { type: g, align: m, span: h, hideInForm: C, exclude: T, editable: A } = p, w = p.block ?? p.blocked, S = p.breakAfter ?? p.wrapping, { parent: O, refData: I } = Y(f), D = Te({
        parent: e.effectData,
        current: O,
        field: f.refName,
        value: I,
        ...i.value !== void 0 && {
          index: i,
          record: f.refName ? O : I
        }
      });
      if (g === "Hidden" || (T ? T.includes("form") : C)) {
        pr({ option: p, model: f, effectData: D });
        continue;
      }
      const { hidden: P, required: M, attrs: H } = Ae({
        option: p,
        effectData: D,
        inheritDisabled: s.disabled
      });
      if (g === "Fragment") {
        f.children && b.splice(
          v + 1,
          0,
          ...[...f.children].map(([K, ne]) => [{ ...K, hidden: P, disabled: H.disabled }, ne])
        );
        continue;
      }
      let N = yn(p, f, D, H);
      if (!N)
        continue;
      if ((_n(g) || Na(g)) && A !== void 0 && A !== !0) {
        const K = N, ne = k(() => Ne(A) ? A(D) : A), pe = Wt(p, L({ ...Fe(D), isView: !0 }));
        N = () => ne.value ? K() : pe ? pe() : I.value;
      }
      const q = { ...p.colProps, span: h };
      if (ze(q, { span: l }, J.Col, { span: 8 }), (q.span === 0 || q.flex) && (q.span = void 0), t === "InputGroup" && (n == null ? void 0 : n.compact) !== !1) {
        const K = Number(q.span) && (100 / (24 / q.span)).toFixed(2) + "%";
        u.push(() => !P.value && _(N, te({ style: { width: K } }, q)));
        continue;
      }
      let G = N;
      const Z = [...Vt, "InputList", "InputGroup"].includes(g);
      if (!Z && (!w || p.field && p.label)) {
        const K = kt(f.rules, D), ne = k(
          () => B(H.disabled) ? void 0 : !p.required || M.value ? K : K.slice(1)
        ), pe = te(J.FormItem, p.formItemProps), ve = _t(p, D);
        G = () => gn(
          L({
            ...pe,
            name: f.propChain,
            rules: ne,
            colon: !!ve
          }),
          {
            default: N,
            label: ve
          }
        );
      }
      if (Z) {
        const K = {
          required: M,
          disabled: H.disabled,
          subSpan: p.subSpan ?? l
        };
        G = () => _(mr, { name: "inheritOptions", data: K }, N);
      }
      const ue = w ?? (Vt.includes(g) && !p.span), E = m && `text-align: ${m}`;
      ue ? (c = void 0, u.push(
        () => !P.value && _(
          "div",
          {
            class: ["sup-form-section", g === "Descriptions" && "sup-detail"],
            style: E,
            key: v
          },
          G()
        )
      )) : (g === "InputList" && (q.span = h ?? 24), c || u.push(c = []), c.push(
        () => !P.value && le("col", te({ style: E, key: v }, q), { default: G })
      ), S && (c = void 0));
    }
    let d = !1;
    const y = () => u.map((v) => Array.isArray(v) ? (d = !0, le("row", a, {
      default: () => v.map((p) => p())
    })) : v());
    return () => e.option.isContainer && d ? _(
      ge.Group,
      {
        class: "sup-form-section",
        option: e.option,
        model: e.model,
        effectData: e.effectData
      },
      { innerContent: y }
    ) : y();
  }
});
function yn(e, t, n, r) {
  const { type: o, render: a } = e;
  if (!o)
    return;
  const s = we("rootSlots", {}), l = wt(e.slots, n), i = a ? void 0 : Kt(o), u = i == null ? void 0 : i.processors, c = i ? void 0 : an(o), b = !a && i ? ur(o) : void 0, d = a ? typeof a == "function" ? a : s[a] : (c == null ? void 0 : c.component) || ge[o] || b;
  let y;
  if (o === "InfoSlot")
    y = d && (() => d({ props: r, ...n }));
  else if (o === "Text")
    y = () => _("span", r, t.refData);
  else if (o === "HTML")
    y = () => _("span", { ...r, innerHTML: t.refData });
  else if (o === "Buttons")
    y = () => _(De, { option: e, effectData: n, ...r });
  else if (Vt.includes(o) || o === "InputList")
    y = () => _(ge[o], L({ option: e, model: t, effectData: n, ...r }), l);
  else if (!d)
    console.error(`组件 '${o}' 配置错误，请检查名称或'render'是否正确！`);
  else if (b && (u != null && u.length))
    y = () => _(_m, { ...r, fieldType: o, processors: u, option: e, model: t, effectData: n }, l);
  else {
    const v = pr({ option: e, model: t, effectData: n }), p = { ...r, ...v };
    o === "InputSlot" ? y = () => d == null ? void 0 : d(L({ props: p, ...n })) : b ? y = () => _(b, L(fr(o, p, { option: e, effectData: n })), l) : (c == null ? void 0 : c.source) === "custom" || (c == null ? void 0 : c.source) === "auto" ? y = () => _(d, L(Xa(c, p)), l) : y = () => _(d, L({ option: e, model: t, effectData: n, ...p }), l);
  }
  return y;
}
const Sm = W({
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
    const n = ie(e, "source"), { modelsMap: r } = rt(e.modelsMap, n);
    return qe("exaProvider", { data: ie(e, "source") }), () => {
      var o;
      return _(
        "div",
        { class: ["sup-form-section sup-detail", ((o = t.attrs) == null ? void 0 : o.isContainer) && "sup-container"] },
        _(ge.Descriptions, {
          option: e.option,
          model: { children: r },
          effectData: L({ current: n }),
          isView: !0
        })
      );
    };
  }
}), Ke = W({
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
  setup({ option: e, modelsMap: t, isRoot: n, effectData: r }, o) {
    var a;
    const s = we("exaProvider", {}).attrs, l = we("gridConfig", s), i = {
      ...J.Descriptions,
      ...l
    }, u = ze({ gutter: e.gutter }, e.rowProps || i.rowProps, J.row, {
      gutter: 16
    }), c = {
      subSpan: e.subSpan,
      ...e.descriptionsProps,
      ...o.attrs
    }, b = ze(
      {
        subSpan: e.subSpan ?? i.subSpan,
        rowProps: u,
        ...c
      },
      i
    ), d = b.subSpan ?? (b.subSpan = ((a = J.Col) == null ? void 0 : a.span) ?? 12), y = Hn(t, e, r), v = [];
    let p, f;
    y.forEach((m, h) => {
      m.node ?? (m.node = () => Ge("descriptions", {
        config: c,
        items: m.group,
        class: c.class
      })), m.isBlock ? (m.group || m.option.type === "InputList" ? (f || (f = [], v.push(["section", f])), f.push(m)) : (v.push(["block", m]), f = void 0), p = void 0) : (!p && v.push(["row", p = []]), p.push(m), f = void 0);
    });
    const g = () => _(
      mr,
      { name: "gridConfig", data: b },
      () => v.map(([m, h], C) => {
        let T = h.node;
        return m === "row" ? T = () => le("row", u, {
          default: () => h.map((A, w) => {
            const S = A.option.colProps || {
              span: A.option.span ?? d
            };
            return !B(A.hidden) && le("col", { ...J.Col, ...S, key: w }, { default: A.node });
          })
        }) : m === "section" && (T = () => h.map((A) => !B(A.hidden) && A.node())), !B(h.hidden) && (v.length > 1 ? _("div", { class: "sup-form-section", key: C }, T()) : T());
      })
    );
    return n ? () => _(
      ge.Group,
      te(
        { class: "sup-form-section" },
        {
          option: e,
          model: {},
          effectData: Te({}),
          isView: !0,
          ...c
        }
      ),
      { innerContent: g }
    ) : g;
  }
});
function Hn(e, t, n) {
  const r = [];
  let o;
  const a = we("rootSlots", {});
  return [...e].forEach(([s, l], i) => {
    var u, c, b;
    const { type: d = "", field: y, hideInDescription: v, viewRender: p, exclude: f } = s;
    if (d === "Hidden" || v || f != null && f.includes("description"))
      return;
    const { parent: g, refData: m } = Fe(L(l)), h = Te({
      parent: n,
      current: g,
      isView: !0,
      field: l.refName,
      value: m,
      text: m,
      ..."index" in l && {
        index: l.index,
        record: y ? m : g
      }
    }), { attrs: C, hidden: T } = Ae({ option: s, effectData: h }), A = wt(s.slots, h), w = _t(s, h);
    let S = s.block ?? s.blocked, O;
    const I = [], D = typeof p == "string" ? a[p] : p;
    O = D && (() => oe(D, h));
    const P = l.children || ((u = l.listData) == null ? void 0 : u.modelsMap);
    if (d === "InputGroup") {
      if (!p) {
        let M = s.breakAfter ?? s.wrapping;
        const N = (c = Hn(P, s, h)[0].group) == null ? void 0 : c.map(({ option: q, content: G }) => {
          const Z = q.labelSlot || q.label, ue = (C == null ? void 0 : C.compact) === !1 && Z;
          return M = (q.breakAfter ?? q.wrapping) || M, () => _("span", [ue && oe(Z, h), ue && ": ", G == null ? void 0 : G()]);
        });
        O = () => le(
          "space",
          { direction: M ? "vertical" : "horizontal" },
          {
            default: () => N == null ? void 0 : N.map((q) => q())
          }
        );
      }
      I.push({ option: s, label: w, hidden: T, content: O });
    } else if (d === "Fragment") {
      const M = Hn(P, s, h), H = M[0].group;
      H && (M.shift(), I.push(...H.map((N) => ({ ...N, hidden: T })))), M.length && (o = void 0, r.push(...M));
    } else if (l.children || l.listData || Vt.includes(d)) {
      S ?? (S = !s.span);
      const M = [...Vt, "InputList"].includes(d) ? d : "Group", H = ge[M], N = () => _(
        H,
        L({
          option: s,
          model: l,
          effectData: h,
          isView: !0,
          ...J[M],
          ...C
        }),
        A
      );
      O ?? (O = N), d === "InputList" && (!S || w && !(C != null && C.labelIndex) ? I.push({
        option: { ...s },
        label: w,
        hidden: T,
        content: O
      }) : O = N);
    } else {
      const M = Cm(s, l, h);
      M && I.push({ option: s, label: w, hidden: T, content: M });
    }
    if (!(!I.length && !O))
      if (I.length && !S)
        o || (o = [], r.push({ option: t, isBlock: !0, group: o })), o.push(...I);
      else {
        if (I.length && w)
          r.push({ option: t, isBlock: S, group: I });
        else {
          const M = s.align && { textAlign: s.align };
          O = ((b = I[0]) == null ? void 0 : b.content) || O, r.push({
            option: s,
            isBlock: S,
            node: () => _(O, { style: M }),
            hidden: T
          });
        }
        o = void 0;
      }
  }), r;
}
function Cm(e, t, n) {
  const { parent: r, refData: o } = Fe(L(t)), a = t.refName ? o : void 0, s = Y(r.value) === Y(n.current) ? n : Te({
    parent: n,
    current: r,
    text: a,
    value: a,
    field: t.refName,
    isView: !0
  }), l = Wt(e, s);
  return l === !1 ? void 0 : () => l ? l() : String(t.refData ?? "");
}
const In = W({
  inheritAttrs: !1,
  props: {
    option: { type: Object, required: !0 },
    model: { type: Object, required: !0 },
    effectData: Object,
    isView: Boolean
  },
  setup({ option: e, model: t, effectData: n, isView: r }, o) {
    const { type: a, label: s, title: l = s, buttons: i, contentAttrs: u } = e, c = a === "Descriptions" || r;
    let b;
    if (i) {
      const C = Array.isArray(i) ? { actions: i } : i;
      a === "Descriptions" && (C.visibleIn ?? (C.visibleIn = C.validOn ?? "detail")), b = bt({
        config: C,
        effectData: n,
        isView: c
      });
    }
    const { style: d, class: y, ...v } = o.attrs, p = {
      ...o.slots,
      title: l ? _t(e, n) : void 0,
      actions: b,
      default: () => _(
        "div",
        u,
        o.slots.innerContent ? o.slots.innerContent(v) : c ? _(Ke, {
          option: { descriptionsProps: v, ...e },
          modelsMap: t.children,
          effectData: n
        }) : _(Ue, { option: e, model: t, effectData: n })
      )
    }, f = e.component && Y(e.component);
    let g, m;
    const h = i == null ? void 0 : i.align;
    return b && (i.placement === "bottom" ? m = () => _(
      "div",
      {
        class: "sup-bottom-buttons",
        style: { textAlign: h || "center" }
      },
      b()
    ) : g = () => le(
      "col",
      {
        class: "sup-title-buttons",
        flex: 1,
        style: {
          textAlign: h || (l ? "right" : void 0)
        }
      },
      { default: b }
    )), f ? () => _(f, {}, p) : () => _("div", te({ class: y, style: d }, { class: "sup-group" }), [
      (l || g) && le(
        "row",
        { align: "middle", class: "sup-titlebar" },
        {
          default: () => [
            l && le("col", { class: "sup-title" }, { default: p.title }),
            g == null ? void 0 : g()
          ]
        }
      ),
      p.default(),
      m && m()
    ]);
  }
}), Am = {
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
    var o;
    const a = R(), s = R({}), {
      option: { onSubmit: l, onReset: i, buttons: u, ...c },
      ignoreRules: b,
      compact: d
    } = e, y = L({ formData: s, current: s }), { attrs: v } = Ae({ option: c, effectData: y }), p = /* @__PURE__ */ new Set(), f = (S) => {
      S && p.add(S);
    };
    qe("exaProvider", {
      data: Po(s),
      attrs: v,
      onSubmit: f
    }), qe("inheritOptions", {
      disabled: v.disabled,
      subSpan: c.subSpan
    });
    const g = (S) => Promise.all(
      [...p, l].map(async (O) => {
        const I = await (O == null ? void 0 : O(S));
        return I === !1 || I && I.errMessage ? Promise.reject({ message: I && I.errMessage }) : I;
      })
    );
    b && Object.assign(v, { hideRequiredMark: !0, validateTrigger: "none" });
    const m = {
      dataSource: s,
      submit: () => Nv(a.value).then((...S) => g(s.value).then(
        () => {
          const O = ft(s.value);
          return n("submit", O), O;
        },
        (O) => (typeof O == "object" && O.message && dr("error", O.message), Promise.reject(O))
      )),
      setFieldsValue(S) {
        return a.value && xn(a.value), za(s.value, S, T);
      },
      resetFields(S = {}) {
        vr(s.value, S, T), a.value && xn(a.value);
        const O = ft(s.value);
        return i == null || i(O), n("reset", O), O;
      }
    }, h = Array.isArray(u) ? { actions: u } : u;
    (o = h == null ? void 0 : h.actions) != null && o.length && (c.subItems = [
      ...c.subItems,
      {
        type: "InfoSlot",
        align: h.align || "center",
        block: !0,
        render: () => _(De, {
          option: h,
          methods: {
            submit: m.submit,
            reset: m.resetFields,
            search: m.submit
          },
          effectData: y
        }),
        ...h.placement === "inline" && {
          span: "auto",
          block: !1,
          align: h.align || "right"
        }
      }
    ]);
    const { modelsMap: C } = mt(c.subItems, s), T = ft(s.value);
    V(
      () => B(e.dataSource ?? e.option.dataSource),
      (S) => {
        S && (a.value && xn(a.value), s.value = S);
      },
      { immediate: !0, flush: "sync" }
    );
    const A = L({ ...m }), w = (S) => {
      if (!S) {
        n("register", null);
        return;
      }
      Object.assign(A, S, m), a.value = S, n("register", A);
    };
    return t(A), () => rn(
      {
        ref: w,
        class: ["sup-form", d && "sup-form-compact", b && "sup-form-simple"],
        model: s.value,
        labelAlign: "right",
        ...v
      },
      {
        ...r,
        default: () => _(Ue, {
          option: c,
          model: { refData: s, children: C },
          effectData: y
        })
      }
    );
  }
}, Om = W({
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
    const { option: r, model: o, compact: a } = e, { slots: s } = r, l = R();
    let i = kt(o.rules, e.effectData), u = o.propChain;
    const c = {};
    if (i)
      V(
        () => o.refData,
        () => {
          var p, f;
          return (f = (p = l.value) == null ? void 0 : p.onFieldChange) == null ? void 0 : f.call(p);
        },
        { deep: !0 }
      );
    else if (o.children && a) {
      const p = {
        type: "object",
        required: !1,
        fields: {}
      };
      for (const f of o.children.values())
        if (f.rules && f.fieldName) {
          f.rules[0].required && (p.required = !0);
          const g = L({
            ...e.effectData,
            parent: e.effectData,
            current: f.parent,
            field: f.fieldName,
            value: f.refData
          });
          if (p.fields[f.fieldName] = kt(f.rules, g), !o.refName) {
            u = f.propChain, i = p.fields[f.fieldName], V(
              () => B(f.refData),
              () => {
                var m, h;
                return (h = (m = l.value) == null ? void 0 : m.onFieldChange) == null ? void 0 : h.call(m);
              }
            );
            break;
          }
        }
      o.refName && (i = [p], V(
        () => o.refData,
        () => {
          var f, g;
          return (g = (f = l.value) == null ? void 0 : f.onFieldChange) == null ? void 0 : g.call(f);
        },
        { deep: !0 }
      ));
    } else
      c.style = "margin: 0";
    c.required = !!((n = i[0]) != null && n.required);
    const b = we("inheritOptions", {}), d = k(
      () => e.disabled ? void 0 : !r.required || B(b.required) ? i : i.slice(1)
    ), y = te(J.FormItem, r.formItemProps, c), v = _t(r, e.effectData);
    return () => gn(
      {
        ...y,
        rules: d.value,
        ref: l,
        name: u
      },
      {
        label: v,
        default: (s == null ? void 0 : s.default) || (() => le(a ? "compactSpace" : "space", te(a ? { block: !0 } : {}, t), {
          default: () => _(Ue, {
            option: r,
            model: o,
            effectData: e.effectData
          })
        }))
      }
    );
  }
}), Tm = W({
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
    const { model: t, option: n, isView: r, effectData: o, labelIndex: a } = e, { columns: s, rowButtons: l, label: i, labelSlot: u, compact: c, slots: b, ...d } = n, { modelsMap: y } = t.listData, v = s.length === 1 && s[0].field === "$index", p = !a && (i || u), f = ie(t, "refData");
    let g = 0;
    const m = {
      add: {
        onClick({ index: w }) {
          f.value.splice(w + 1, 0, v ? void 0 : {}), f.value = [...Y(f.value)];
        },
        icon: () => nt("add")
      },
      delete: {
        disabled: () => f.value.length === 1,
        confirmText: "",
        icon: () => nt("remove"),
        onClick({ index: w }) {
          f.value.splice(w, 1), f.value = [...Y(f.value)];
        }
      }
    }, h = !r && l !== !1 && {
      type: "Buttons",
      buttonType: "link",
      size: "small",
      colProps: { flex: "0" },
      labelMode: "icon",
      ...J.rowButtons,
      methods: m,
      actions: ["add", "delete"],
      ...Array.isArray(l) ? { actions: l } : l
    }, C = /* @__PURE__ */ new WeakMap(), T = Pt([]);
    V(
      () => f.value.map((w) => Y(w)),
      (w) => {
        w.length === 0 && f.value.push(v ? void 0 : {});
        const S = w.length ? w : f.value.map((D) => Y(D)), O = T.value;
        v && O.length !== S.length && (g += 1);
        const I = S.map((D, P) => {
          var M;
          const H = Y(D);
          return H !== null && typeof H == "object" ? (C.has(H) || C.set(H, Ut(12)), C.get(H)) : ((M = O[P]) == null ? void 0 : M.baseKey) ?? Ut(12);
        });
        T.value = S.map((D, P) => {
          const M = ie(f.value, P), H = [...t.propChain, P], N = {
            index: P,
            parent: f,
            refData: M,
            propChain: H
          }, q = /* @__PURE__ */ new Map();
          let G;
          if (v)
            G = { ...s[0] }, q.set(G, {
              ...y.get(s[0]),
              ...N
            });
          else if (y.size === 1 || !s[0].field) {
            G = {
              subSpan: "auto",
              ...s[0],
              field: String(P)
            };
            const Z = [...y.values()][0];
            q.set(G, {
              ...Z,
              ...N,
              refName: String(P),
              children: rt(Z.children || /* @__PURE__ */ new Map(), D, H).modelsMap
            });
          } else
            G = c ? {
              ...d,
              type: "InputGroup",
              initialValue: void 0,
              subSpan: n.subSpan ?? "auto",
              field: String(P)
            } : { type: "Group", span: "auto" }, q.set(G, {
              ...N,
              refName: String(P),
              children: rt(y, D, H).modelsMap
            });
          return a && (G.label ?? (G.label = i), G.labelSlot ?? (G.labelSlot = u || G.label + String(P + 1))), h && q.set(h, { parent: f, index: P }), {
            children: q,
            model: { parent: f, children: q, index: P },
            refData: M,
            baseKey: I[P],
            key: v ? `${String(I[P])}:${P}:${g}` : I[P]
            // effectData: reactive({ parent: effectData, current: orgList, index: idx, record: refData }),
          };
        });
      },
      {
        immediate: !0
      }
    );
    const A = () => T.value.map(({ model: w, key: S }) => _(Ue, { model: w, option: n, effectData: o, key: S }));
    if (r) {
      if (p)
        if (v) {
          const { label: O, labelSlot: I = O } = s[0], D = s[0].breakAfter ?? s[0].wrapping;
          return () => le(
            "space",
            { direction: D ? "vertical" : "horizontal" },
            {
              default: () => T.value.map(({ refData: P, key: M }, H) => {
                const N = {
                  ...o,
                  parent: o,
                  current: f.value,
                  field: s[0].field,
                  value: P.value,
                  index: H,
                  record: P.value
                };
                return _("span", { key: M }, [oe(I, N), I ? ": " : "", P.value]);
              })
            }
          );
        } else
          return () => T.value.map(({ children: O, key: I }) => _(Ke, {
            key: I,
            modelsMap: O,
            option: n,
            effectData: o
          }));
      const w = {}, S = k(() => new Map(T.value.flatMap(({ children: O }) => [...O])));
      return () => _(Ke, {
        option: { ...d, label: i, labelSlot: u },
        modelsMap: S.value,
        effectData: o,
        ...w
      });
    } else if (p) {
      const w = /* @__PURE__ */ new Map([
        [
          {
            ...d,
            label: i,
            labelSlot: u,
            type: "InfoSlot",
            block: !1,
            render: A
          },
          t
        ]
      ]);
      return () => _(Ue, { model: { children: w }, option: n, effectData: o });
    } else
      return A;
  }
}), xm = /* @__PURE__ */ W({
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
    isView: r
  }) {
    const {
      label: o,
      title: a = o,
      buttons: s
    } = e;
    return () => Ge("card", {}, {
      title: a && (() => _("div", {
        class: "sup-title"
      }, oe(a, n))),
      extra: () => s && !r && _(De, {
        option: s,
        effectData: n
      }),
      default: () => r ? _(Ke, {
        option: e,
        modelsMap: t.children,
        effectData: n
      }) : _(Ue, {
        option: e,
        model: t,
        effectData: n
      })
    });
  }
}), $m = W({
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
  setup({ model: e, option: t, isView: n, effectData: r }, o) {
    const { buttons: a, rowButtons: s, label: l, title: i = l } = t, { modelsMap: u } = e.listData, { propChain: c } = e, b = ie(e, "refData"), d = tl(), y = d.rowKey || "id", v = () => {
      const w = { ...d };
      return delete w.rowKey, delete w.itemClass, delete w.itemStyle, w;
    }, p = {
      add() {
        b.value.push({});
      },
      delete({ record: w }) {
        const S = b.value.indexOf(w);
        b.value.splice(S, 1);
      }
    }, f = /* @__PURE__ */ new WeakMap(), g = R([]);
    V(
      () => [...b.value],
      (w) => {
        g.value = w.map((S, O) => {
          const I = Y(S);
          f.has(I) || f.set(I, S[y] || Ut(12));
          const D = f.get(I), { modelsMap: P } = rt(u, S, c, O);
          return {
            hash: D,
            model: { refData: R(S), children: P, index: O },
            effectData: L({
              parent: r,
              current: b,
              index: O,
              record: S
            })
          };
        });
      },
      {
        immediate: !0
      }
    );
    const m = { ...o.slots };
    if (m.title || (m.title = i && (() => oe(i, r))), a) {
      const w = a.targetSlot ?? a.forSlot ?? "extra", S = m[w], O = bt({
        config: a,
        effectData: r,
        methods: p,
        isView: n
      });
      (S || O) && (m[w] = () => [S == null ? void 0 : S(), O == null ? void 0 : O()]);
    }
    const { title: h, extra: C, ...T } = m;
    (h || C) && (T.header = () => le(
      "row",
      { align: "middle" },
      {
        default: () => [
          h && le("col", { class: "sup-title", flex: 1 }, { default: h }),
          C && le(
            "col",
            {
              class: "sup-title-buttons",
              style: { textAlign: a == null ? void 0 : a.align }
            },
            { default: C }
          )
        ]
      }
    ));
    const A = s && {
      buttonType: "link",
      size: "small",
      ...J.rowButtons,
      ...Array.isArray(s) ? { actions: s } : s
    };
    return T.renderItem = ({ item: w }) => Ge(
      "listItem",
      { key: w.hash, class: d.itemClass, style: d.itemStyle },
      {
        default: () => {
          var S;
          return [
            n ? _(Ke, {
              option: t,
              modelsMap: w.model.children,
              effectData: w.effectData
            }) : _(Ue, {
              model: w.model,
              option: t,
              class: "sup-list-item-content",
              effectData: w.effectData
            }),
            A && ((S = bt({
              config: A,
              methods: p,
              effectData: w.effectData,
              isView: n
            })) == null ? void 0 : S({ class: "sup-list-item-actions" }))
          ];
        }
      }
    ), () => Ge("list", { ...v(), dataSource: g.value }, T);
  }
}), Im = W({
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
    const { model: n, isView: r, effectData: o, labelIndex: a, rowKey: s = "" } = e, { columns: l, rowButtons: i, slots: u, ...c } = e.option, { modelsMap: b, rules: d } = n.listData, { propChain: y } = n, v = ie(n, "refData"), p = {
      add: {
        icon: () => nt("add"),
        onClick({ index: T }) {
          v.value.splice(T + 1, 0, {}), v.value = [...Y(v.value)];
        }
      },
      delete: {
        hidden: () => v.value.length === 1,
        disabled: !1,
        confirmText: "",
        icon: () => nt("remove"),
        onClick({ index: T }) {
          v.value = v.value.filter((A, w) => w !== T);
        }
      }
    }, f = !r && i !== !1 && {
      type: "Buttons",
      buttonType: "link",
      size: "small",
      labelMode: "icon",
      ...J.rowButtons,
      methods: p,
      actions: ["add", "delete"],
      ...Array.isArray(i) ? { actions: i } : i
    }, g = /* @__PURE__ */ new WeakMap(), m = R([]);
    V(
      v,
      (T) => {
        T.length === 0 && T.push({}), m.value = T.map((A, w) => {
          const S = Y(A);
          g.has(S) || g.set(S, A[s] || Ut(12));
          const { modelsMap: O } = rt(b, A, y, w);
          return {
            key: g.get(S),
            model: { refData: R(A), children: O, index: w },
            effectData: L({
              parent: o,
              current: v,
              index: w,
              record: A
            })
          };
        });
      },
      {
        immediate: !0
      }
    );
    const h = {
      ...c,
      type: "Group",
      buttons: f,
      subItems: l
    }, C = c.title || c.label;
    return typeof C == "string" && a && (h.title = ({ index: T }) => C + String(T + 1)), () => m.value.map(({ model: T, effectData: A, key: w }) => _(ge.Group, { model: T, option: h, effectData: A, key: w, isView: r }, t.slots));
  }
}), Pm = /* @__PURE__ */ W({
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
    const t = R(e.option.activeKey), n = [], r = (a, s, l) => {
      n[a] = l ? void 0 : s, l && t.value === s && (t.value = n.find(Boolean));
    }, o = [...e.model.children].map(([a, s], l) => {
      const {
        key: i,
        field: u,
        label: c,
        icon: b
      } = a, d = Te({
        parent: e.effectData,
        current: ie(s, "parent"),
        field: s.refName,
        value: s.refData
      }), {
        hidden: y,
        attrs: v
      } = Ae({
        option: a,
        effectData: d
      }), p = i || u || String(l), f = () => [hn(b), oe(c, d)];
      return He(() => r(l, p, B(y) || B(v.disabled))), {
        attrs: L({
          ...v,
          key: p,
          label: f
        }),
        hidden: y,
        option: {
          ...a,
          type: "TabPane"
        },
        model: s,
        effectData: d
      };
    });
    return xo(() => {
      t.value ?? (t.value = n.find(Boolean));
    }), () => Ge("tabs", {
      value: t.value,
      "onUpdate:value": (a) => t.value = a
    }, {
      extra: () => !e.isView && e.option.buttons ? _(De, {
        option: e.option.buttons
      }) : void 0,
      default: () => o.map(({
        attrs: a,
        hidden: s,
        option: l,
        model: i,
        effectData: u
      }) => !s.value && Ge("tab", a, {
        default: () => e.isView ? _(Ke, {
          option: l,
          modelsMap: i.children,
          effectData: u
        }) : _(Ue, {
          option: l,
          model: i,
          effectData: u
        })
      }))
    });
  }
}), Dm = W({
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
    const o = R(), a = Dt({
      ...e.schema,
      dataSource: e.dataSource || e.model || ((n = e.schema) == null ? void 0 : n.dataSource),
      attrs: te({ ...J.Form }, { ...(r = e.schema) == null ? void 0 : r.attrs })
    });
    re.schemaDiagnostics && e.schema && Bt(e.schema, "form", "SuperForm");
    const s = {
      setOption: (c) => {
        var b;
        re.schemaDiagnostics && Bt(c, "form", "SuperForm"), ze(a, c), a.attrs = te(a.attrs, { ...c.attrs }, { ...(b = e.schema) == null ? void 0 : b.attrs });
      }
    };
    qe("rootSlots", t.slots), t.emit("register", s);
    const l = (c) => {
      o.value = c, t.emit("register", s, c);
    };
    xo(() => t.expose(o.value));
    const i = k(() => e.isContainer || a.isContainer);
    return () => a.subItems && _(
      ge.Form,
      {
        option: a,
        // dataSource: formData.value,
        onRegister: l,
        compact: e.compact,
        ignoreRules: e.ignoreRules,
        class: { "sup-container": i.value }
      },
      wt(a.slots, Te(), t.slots)
    );
  }
});
function Rm(e) {
  const [t, n] = Ga(), r = Promise.resolve(typeof e == "function" ? e() : e), o = (s, l) => {
    if (s)
      t.value || r.then(s.setOption), t.value = l;
    else
      return (i, u) => _(Dm, { ...i, onRegister: o }, u == null ? void 0 : u.slots);
  }, a = async (s, l) => {
    const i = await n();
    if (s && s in i)
      return typeof i[s] == "function" ? i[s](l) : i[s];
    if (!s)
      return i;
  };
  return [
    o,
    {
      dataSource: k(() => {
        var s;
        return (s = t.value) == null ? void 0 : s.dataSource;
      }),
      getForm: n,
      asyncCall: a,
      getData() {
        var s;
        return ce((s = t.value) == null ? void 0 : s.dataSource);
      },
      submit: () => a("submit"),
      resetFields: (s) => a("resetFields", s),
      setFieldsValue: (s) => a("setFieldsValue", s),
      /**
       * @deprecated 使用`resetFields`
       */
      setData(s) {
        a("resetFields", s);
      }
    }
  ];
}
function Ka(e, { buttons: t, ...n } = {}) {
  const r = R(!1), o = L({ ...n, ...J.Modal }), a = R(), s = t && (() => _(De, { option: t, effectData: { modalRef: a } })), l = R(!1), i = () => {
    var p;
    return l.value = !0, Promise.resolve((p = o.onOk) == null ? void 0 : p.call(o)).then(() => {
      r.value = !1;
    }).catch((f) => console.error(f)).finally(() => l.value = !1);
  }, u = () => o.icon ? [hn(o.icon), oe(o.title)] : oe(o.title), c = (p) => r.value = p;
  return {
    config: o,
    modalRef: a,
    modalSlot: (p, f) => Hv(
      {
        ref: a,
        visible: r.value,
        class: "sup-modal",
        "onUpdate:visible": c,
        confirmLoading: l.value,
        ...o,
        title: void 0,
        ...p,
        onOk: i
      },
      { footer: s, title: u, ...f == null ? void 0 : f.slots, ...e && { default: e } }
    ),
    setModal: (p) => {
      Object.assign(o, p);
    },
    closeModal: () => (r.value = !1, je()),
    openModal: async (p) => (Object.assign(o, p), r.value = !0, je())
  };
}
function Ya(e, t) {
  const { modalSlot: n, openModal: r, modalRef: o, closeModal: a, setModal: s, config: l } = Ka(e, t), i = $o(), u = document.createDocumentFragment();
  let c;
  const b = qv(), d = (p) => zv(
    (f = {}) => n({ ...p, ...f }, {}),
    b,
    p
  ), y = () => {
    Pn(null, u), c = null;
  };
  return ln(() => {
    c && y();
  }), {
    modalRef: o,
    openModal: (p) => {
      if (o.value)
        return r(p);
      if (c = Io(d), c.appContext = i == null ? void 0 : i.appContext, Pn(c, u), l.destroyOnClose) {
        const f = l.afterClose;
        s({
          afterClose() {
            f == null || f(), y();
          }
        });
      }
      return je(() => r(p));
    },
    modalSlot: n,
    closeModal: a,
    setModal: s
  };
}
function jb(e, t = {}) {
  const { title: n, ...r } = e, [o, a] = Rm(r), s = Ya(o(), { maskClosable: !1, title: n, ...t });
  return { ...s, openModal: ({ data: i, onOk: u = t.onOk, ...c } = {}) => {
    const b = () => a.submit().then((d) => u ? u(d) : d);
    return a.resetFields(i), s.openModal({ ...c, onOk: b });
  }, formActions: a };
}
const It = (e, ...t) => cv(e, ...t, (n, r, o, a) => {
  if (r === void 0)
    a[o] = void 0;
  else if (Array.isArray(n))
    return r;
});
function Mm(e) {
  const t = /* @__PURE__ */ new WeakMap(), n = (o) => {
    const a = Y(o);
    let s = t.get(a);
    return s || (s = Dt({
      isEdit: !1
    }), t.set(a, s)), s;
  };
  return {
    getEditInfo: n,
    setEditInfo: (o, a) => {
      const s = n(o);
      if (s.editData)
        vr(s.editData, o), Object.assign(s, a);
      else {
        const l = L(ft(o)), {
          modelsMap: i
        } = qa(Y(e), l);
        Object.assign(s, {
          ...a,
          forms: Dt({}),
          modelsMap: i,
          editData: l
        });
      }
    }
  };
}
function Em({
  childrenMap: e,
  orgList: t,
  listener: n,
  rowEditor: r
}) {
  const o = R(!1), a = R([]);
  V(() => [...t.value], (v) => {
    a.value = v, o.value = !1;
  }, {
    immediate: !0
  });
  const {
    getEditInfo: s,
    setEditInfo: l
  } = Mm(e), i = {
    add({
      index: v,
      resetData: p
    }) {
      const f = {
        ...p
      };
      v !== void 0 ? a.value.splice(v + 1, 0, f) : a.value.push(f), l(f, {
        index: v,
        isEdit: !0,
        isNew: !0
      }), o.value = !0;
    },
    edit({
      record: v,
      selectedRows: p,
      resetData: f
    }) {
      const g = v || p[0];
      l(It(g, f), {
        isEdit: !0
      }), o.value = !0;
    },
    delete({
      record: v,
      selectedRows: p
    }) {
      const f = v ? [v] : p;
      return n.onDelete(f);
    }
  }, u = {
    add: {
      disabled: () => o.value,
      onClick: i.add
    },
    edit: {
      disabled: (v) => {
        var p;
        return o.value || !(v.record || ((p = v.selectedRows) == null ? void 0 : p.length) === 1);
      },
      onClick: i.edit
    },
    delete: {
      disabled: (v) => {
        var p;
        return o.value || !(v.record || ((p = v.selectedRows) == null ? void 0 : p.length) > 0);
      },
      onClick: i.delete
    }
  }, c = [{
    label: "保存",
    loading: !0,
    onClick: async (v) => {
      const {
        record: p
      } = v, f = s(p);
      return Promise.all(Object.values(f.forms).map((g) => g.validate())).then(async () => {
        var g;
        const m = Y(f.editData);
        if (await ((g = r == null ? void 0 : r.onSave) == null ? void 0 : g.call(r, {
          ...v,
          isNew: f.isNew
        })) === !1)
          return !1;
        f.isNew ? (Object.assign(p, m), n.onSave(p, f.index).then(() => {
          f.isNew = !1, f.isEdit = !1;
        })) : n.onUpdate(m, p).then(() => {
          f.isEdit = !1;
        }), o.value = !1;
      }).catch((g) => {
        console.log("error", g), g != null && g.errorFields && dr("error", g.errorFields[0].errors[0]);
      });
    }
  }, {
    label: "取消",
    onClick: async (v) => {
      var p;
      const f = s(v.record);
      await ((p = r == null ? void 0 : r.onCancel) == null ? void 0 : p.call(r, {
        ...v,
        isNew: f.isNew
      })) !== !1 && (f.isNew && a.value.splice(f.index + 1, 1), f.isEdit = !1, o.value = !1);
    }
  }], b = (v, p) => s(v.record).isEdit ? _(De, {
    key: "edit",
    option: {
      ...p,
      actions: c
    },
    effectData: v
  }) : null, d = /* @__PURE__ */ W({
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
      option: v,
      editInfo: p,
      viewRender: f
    }) {
      const {
        editable: g = !0
      } = v, {
        modelsMap: m,
        forms: h
      } = p, C = m.get(Y(v)), {
        index: T,
        parent: A,
        refData: w
      } = Fe(C), S = C.propChain.join("."), O = Te({
        current: A,
        value: w,
        index: T
      }), {
        attrs: I,
        hidden: D
      } = Ae({
        option: v,
        effectData: O
      }), P = k(() => !D.value && (Ne(g) ? g(O) : g)), M = yn(v, C, O, I), H = kt(C.rules, O), N = k(() => B(I.disabled) || B(D) ? [] : H);
      return () => P.value ? rn({
        ref: (q) => {
          q && (h[S] = q);
        },
        model: p.editData
      }, {
        default: () => gn({
          name: C.propChain,
          rules: N.value,
          wrapperCol: {}
        }, {
          default: M
        })
      }) : f ? f({
        ...O,
        isView: !0
      }) : w.value;
    }
  });
  return {
    list: a,
    methods: i,
    buttonMethods: u,
    getEditRender: (v, p) => {
      if (_n(v.type) || v.type === "InputSlot")
        return ({
          record: f
        }) => {
          const g = s(f);
          if (g.isEdit)
            return _(d, {
              option: v,
              editInfo: g,
              viewRender: p
            });
        };
    },
    editButtonsSlot: b
  };
}
function Fm({ rowKey: e, option: t, listener: n }) {
  const r = R(), o = t.rowEditor, a = (o == null ? void 0 : o.form) || t.editForm || t.formSchema || {};
  a.subItems = a.subItems || t.columns.filter((v) => {
    var p;
    return !(v.hideInForm || (p = v.exclude) != null && p.includes("form"));
  });
  const s = R(a.dataSource || {}), l = () => _(ge.Form, {
    option: a,
    dataSource: s,
    onRegister: (v) => r.value = v
  }), i = {
    ...J.Modal,
    maskClosable: !1,
    ...t.modalProps,
    ...o == null ? void 0 : o.modalProps
  }, { modalSlot: u, openModal: c, closeModal: b } = Ka(l, i), d = ({ meta: v, ...p }) => oe(i.title, { meta: v, ...p }) || `${a.title ? a.title + " - " : ""}  ${v.title || v.label}`;
  return { modalSlot: u, methods: {
    add(v = {}) {
      const { meta: p = {}, resetData: f, index: g } = v;
      return s.value = { ...f }, je(() => {
        var m;
        (m = r.value) == null || m.clearValidate();
      }), p.title ?? (p.title = "新增"), p.name = "add", p.isNew = !0, c({
        ...p,
        title: d({ ...v, source: s.value, meta: p }),
        onOk: async () => r.value.submit().then(async (m) => {
          var h;
          if (await ((h = o == null ? void 0 : o.onSave) == null ? void 0 : h.call(o, { ...v, source: m, meta: p })) !== !1)
            return n.onSave(m, g);
        }),
        onCancel: async () => {
          var m;
          return await ((m = o == null ? void 0 : o.onCancel) == null ? void 0 : m.call(o, { ...v, meta: p })), b();
        }
      });
    },
    async edit(v) {
      var p, f, g;
      const { record: m, selectedRows: h, resetData: C, meta: T = {} } = v, A = m || h[0];
      if (!A)
        return Promise.reject(new Error("未选择记录"));
      const w = await ((f = (p = t.apis) == null ? void 0 : p.info) == null ? void 0 : f.call(p, e(A), A));
      return s.value = It({}, A, w, C), ze(T, { name: "edit", title: "编辑", isNew: !1 }), (g = r.value) == null || g.clearValidate(), c({
        ...T,
        title: d({ ...v, source: s.value, meta: T }),
        onOk: async () => r.value.submit().then(async (S) => {
          var O;
          if (await ((O = o == null ? void 0 : o.onSave) == null ? void 0 : O.call(o, { ...v, source: S, meta: T })) !== !1)
            return n.onUpdate(S, A);
        }),
        onCancel: async () => {
          var S;
          return await ((S = o == null ? void 0 : o.onCancel) == null ? void 0 : S.call(o, { ...v, meta: T })), b();
        }
      });
    },
    delete({ record: v, selectedRows: p }) {
      const f = v ? [v] : p;
      return n.onDelete(f);
    }
  } };
}
function jm({
  model: e,
  orgList: t,
  rowKey: n,
  setRowKey: r,
  editableRef: o
}) {
  const {
    modelsMap: a
  } = e.listData, s = R([]), l = /* @__PURE__ */ new WeakMap(), i = /* @__PURE__ */ new WeakMap();
  V(() => [...t.value], (d) => {
    s.value = d.map((y, v) => {
      const p = l.get(Y(y)) || Dt({});
      if (p.index !== v) {
        p.index = v;
        const {
          modelsMap: g
        } = qa(Y(a), y, e.propChain, v);
        p.modelsMap = g;
      }
      p.record ?? (p.record = L({
        ...Fe(y)
      }));
      const f = n(y);
      return r(p.record, f), l.set(Y(y), p), i.set(Y(p.record), p), p.record;
    });
  }, {
    immediate: !0
  });
  const u = {
    add({
      index: d,
      resetData: y
    }) {
      const v = {
        ...y
      };
      d !== void 0 ? t.value.splice(d + 1, 0, v) : t.value.push(v);
    }
    // delete({ record }) {
    //   const orgIdx = orgList.value.indexOf(record)
    //   orgList.value.splice(orgIdx, 1)
    // },
  }, c = /* @__PURE__ */ W({
    inheritAttrs: !1,
    props: {
      option: {
        type: Object,
        required: !0
      }
    },
    setup({
      option: d
    }, y) {
      const {
        record: v
      } = y.attrs, p = k(() => i.get(Y(v)).modelsMap.get(d)), {
        index: f,
        parent: g,
        refData: m
      } = Fe(p.value), h = Te({
        current: g,
        value: m,
        list: t,
        record: v,
        index: f
      }), {
        editable: C = !0
      } = d, {
        attrs: T,
        hidden: A
      } = Ae({
        option: d,
        effectData: h
      }), w = k(() => !A.value && o.value && (Ne(C) ? C(h) : C)), S = yn(d, p.value, h, T), O = Wt(d, L({
        ...Fe(h),
        isView: !0
      })), I = kt(p.value.rules, h), D = I && k(() => B(T.disabled) ? void 0 : I);
      return () => w.value ? gn(L({
        wrapperCol: {},
        name: p.value.propChain,
        rules: D
      }), {
        default: S
      }) : O ? O() : m.value;
    }
  });
  return {
    list: s,
    methods: u,
    getEditRender: (d) => {
      if (_n(d.type) || d.type === "InputSlot" && d.editable !== !1)
        return (y) => _(c, {
          option: d,
          ...y
        });
    }
  };
}
function Lm(e, t, n) {
  const r = R({}), { title: o, apis: a } = e, { modalProps: s, ...l } = e.descriptionsProps || {}, i = () => _(Sm, { option: { descriptionsProps: l }, modelsMap: t, source: r }), u = {
    ...J.Modal,
    footer: null,
    ...e.modalProps,
    ...s
  }, c = (y) => oe(u.title, y) || `${o ? o + " - " : ""}详情`, { openModal: b, modalSlot: d } = Ya(i, u);
  return {
    detailSlot: d,
    openDetail: async ({ record: y, selectedRows: v, meta: p = {}, ...f }) => {
      const g = y || v[0];
      if (a != null && a.info) {
        const m = await a.info(n(g), g);
        r.value = Object.assign({}, g, m);
      } else
        r.value = g;
      p.name = "detail", b({ ...p, title: c({ ...f, source: r.value, meta: p }) });
    }
  };
}
function Um({ option: e, model: t, orgList: n, rowKey: r, setRowKey: o, listener: a, isView: s, effectData: l }) {
  const { modelsMap: i } = t.listData, u = {
    list: n,
    modalSlot: [],
    methods: {
      delete({ record: g, selectedRows: m }) {
        const h = g ? [g] : m;
        return a.onDelete(h);
      }
    }
  }, { edit: c, editable: b = c, rowEditor: d } = e, { editMode: y, addMode: v } = d || e;
  if (!s && b) {
    const g = k(() => Ne(b) ? b(l) : b), { methods: m, ...h } = jm({ model: t, orgList: n, rowKey: r, setRowKey: o, editableRef: g });
    Object.assign(u.methods, m), Object.assign(u, h);
  } else if (y === "inline") {
    const { list: g, methods: m, buttonMethods: h, editButtonsSlot: C, getEditRender: T } = Em({
      childrenMap: i,
      orgList: n,
      listener: a,
      rowEditor: d
    });
    u.list = g, Object.assign(u.methods, m), Object.assign(u, { buttonMethods: h, editButtonsSlot: C, getEditRender: T });
  }
  if (y === "modal" || v === "modal") {
    const { modalSlot: g, methods: m } = Fm({ rowKey: r, option: e, listener: a });
    u.methods.edit ? (u.methods.add = m.add, u.buttonMethods || (u.buttonMethods = {}), u.buttonMethods.add = m.add) : Object.assign(u.methods, m), u.modalSlot.push(g);
  }
  const { detailSlot: p, openDetail: f } = Lm(e, i, r);
  return u.modalSlot.push(p), u.methods.detail = f, u;
}
const Nm = W({
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
  setup(e, { attrs: t, slots: n, emit: r }) {
    const { optionsRef: o } = Qe(
      { ...e, labelAsValue: e.labelAsValue || e.valueToLabel },
      [],
      e.effectData
    ), a = R(e.activeKey ?? e.defaultActiveKey), s = (h) => {
      a.value = h, r("update:activeKey", h);
    }, {
      default: l,
      extra: i,
      rightExtra: u,
      tabBarExtraContent: c,
      tabBarExtra: b,
      title: d,
      titleBar: y,
      ...v
    } = n, p = wt(e.slots, e.effectData), f = b || u || c, g = k(() => {
      var h;
      const C = o.value.map(({ value: T, label: A, ...w }) => ({
        ...w,
        key: w.key ?? T,
        tab: w.tab ?? A
      }));
      return a.value === void 0 && s((h = C[0]) == null ? void 0 : h.key), C;
    }), m = (h) => oe(p.customTab || e.customTab || h.tab, {
      ...e.effectData,
      item: h
    });
    return () => [
      !e.bordered && d ? y == null ? void 0 : y() : null,
      Qv(
        {
          bordered: e.bordered,
          items: g.value.map((h) => ({
            ...h,
            tab: m(h)
          })),
          value: a.value,
          onValueChange: s,
          attrs: t
        },
        {
          ...v,
          ...p,
          default: l,
          title: d,
          tabExtra: f || (d ? void 0 : i),
          cardExtra: f || d ? i : void 0
        }
      )
    ];
  }
}), km = W({
  props: {
    option: { type: Object, required: !0 },
    effectData: { type: Object, required: !0 }
  },
  setup(e) {
    const t = e.option, { field: n, editable: r } = e.option, o = L({});
    V(
      () => e.effectData,
      (v) => Object.assign(o, v),
      { immediate: !0 }
    );
    const a = n.split(".").slice(0, -1), s = k(() => Le(o.record, a)), l = k({
      get: () => Le(o.record, n),
      set: (v) => vt(o.record, n, v)
    }), i = { parent: s, refData: l }, { attrs: u, hidden: c } = Ae({ option: t, effectData: { ...o, inTable: !0 } }), b = yn(t, i, o, u), d = k(() => Ne(r) ? r(o) : B(r)), y = Wt(t, o);
    return () => c.value ? "" : d.value ? _("div", { class: "editable-cell" }, b()) : y ? y() : l.value;
  }
}), Bm = (e) => {
  if (!e.editable)
    return;
  const t = re.buttonRoles && re.buttonRoles() || [];
  if ((!e.roleName || t.includes(e.roleName)) && (_n(e.type) || e.type === "InputSlot"))
    return (r) => _(km, { option: e, effectData: { ...r } });
};
function Vm({
  childrenMap: e,
  context: t,
  option: n,
  attrs: r,
  isView: o,
  effectData: a
}) {
  const { methods: s, buttonMethods: l, getEditRender: i, editButtonsSlot: u } = t, c = Te({ list: a.value, isView: o, parent: a }), b = function v(p = e) {
    const f = [];
    return [...p].forEach(([g, m]) => {
      var h, C;
      if (g.type === "Hidden" || g.hideInTable || g.hidden === !0 || (h = g.exclude) != null && h.includes("table"))
        return;
      const T = _t(g, c);
      if (m.children) {
        const A = v(m.children);
        g.ignoreTableTitle ? f.push(...A) : f.push({
          title: T,
          children: A
        });
      } else {
        const A = {
          title: T,
          key: g.field || g.label,
          dataIndex: m.propChain.length > 1 ? m.propChain : m.propChain[0]
        };
        g.options || g.dictName || g.type === "Switch" || (C = g.type) != null && C.includes("Picker") ? A.align = "center" : g.type === "InputNumber" && (A.align = "right"), Object.assign(A, g.columnProps), ze(A, n.columnProps, J.Column);
        const w = A.customRender || Wt(g) || void 0, S = i ? i(g, w) : Bm(g);
        A.customRender = Hm(w, S, c), f.push(A);
      }
    }), f;
  }(), d = zm(n, r);
  d && b.unshift(d);
  const y = qm({
    buttons: n.rowButtons,
    methods: l || s,
    editButtonsSlot: u,
    isView: o,
    effectData: c
  });
  return y && (ze(y, n.columnProps, J.Column), b.push(y)), b;
}
function Hm(e, t, n) {
  if (t || e) {
    const r = (o) => {
      const a = (t == null ? void 0 : t(o)) ?? (e == null ? void 0 : e({ ...o, isView: !0 })) ?? String(o.text ?? "");
      return a && typeof a == "string" && o.column.ellipsis ? _("span", { title: a }, a) : a;
    };
    return (o) => _(r, { ...n, ...o, current: o.record });
  } else
    return ({ text: r }) => String(r ?? "");
}
function qm({ buttons: e, methods: t, editButtonsSlot: n, isView: r, effectData: o }) {
  const a = {
    buttonType: "link",
    size: "small",
    ...J.rowButtons,
    ...Array.isArray(e) ? { actions: e } : e
  }, { columnProps: s, ...l } = a, i = bt({ config: l, methods: t, isView: r });
  if (!i)
    return;
  const u = (c) => (n == null ? void 0 : n(c, l)) || i({ key: c.record, effectData: c });
  return {
    title: "操作",
    key: "action",
    fixed: "right",
    minWidth: 100,
    width: 100,
    align: "center",
    resizable: !1,
    ...s,
    customRender: (c) => _(u, { ...o, ...c, current: c.record })
  };
}
const zm = (e, t) => {
  var n;
  const r = e.indexColumn ?? ((n = J.Table) == null ? void 0 : n.indexColumn);
  if (r)
    return {
      key: "INDEX",
      title: "序号",
      width: 60,
      align: "center",
      customRender: ({ index: o }) => {
        var a, s;
        return ((((a = t.pagination) == null ? void 0 : a.current) || 1) - 1) * (((s = t.pagination) == null ? void 0 : s.pageSize) || 10) + o + 1;
      },
      ...se(r) && r
    };
}, Gm = W({
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
  setup({ option: e, model: t, reload: n, effectData: r, isView: o, ...a }, s) {
    var l, i, u;
    const c = ((l = e.rowEditor) == null ? void 0 : l.editMode) === "inline", b = s.attrs, d = /* @__PURE__ */ new WeakMap(), y = b.rowKey || "id", v = (x) => {
      const $ = x[y];
      if ($ != null)
        return $;
      const F = Y(x);
      return d.has(F) || d.set(F, Ut(12)), d.get(F);
    }, p = (x, $) => d.set(Y(x), $), f = ie(t, "refData"), g = ((i = e.attrs) == null ? void 0 : i.rowSelection) || void 0, m = g == null ? void 0 : g.selectedRowKeys, h = Je(m) ? m : R(m || []), C = R([]), {
      selectedRowKeys: T,
      onChange: A,
      getCheckboxProps: w,
      ...S
    } = g || {}, O = g && {
      attrs: {
        fixed: !0,
        ...S
      },
      onChange: (x, $, F) => {
        var j;
        h.value = x, C.value = $, (j = g == null ? void 0 : g.onChange) == null || j.call(g, x, $, F);
      },
      isRowSelectable: (x) => {
        var $, F;
        return c && !f.value.includes(x) ? !1 : !((F = ($ = g == null ? void 0 : g.getCheckboxProps) == null ? void 0 : $.call(g, x)) != null && F.disabled);
      }
    }, I = b.childrenColumnName || "children", D = (x, $ = 0, F = 1) => {
      const j = [], ee = $ === F;
      return x.forEach((ye) => {
        ye[I] && (j.push(v(ye)), ee || j.push(...D(ye[I], $, F + 1)));
      }), j;
    }, P = R(((u = e.attrs) == null ? void 0 : u.expandedRowKeys) || []), M = (x) => {
      P.value = x, s.emit("expandedRowsChange", x);
    };
    (a.defaultExpandLevel || b.defaultExpandAllRows) && V(
      f,
      (x, $) => {
        x.length && !($ != null && $.length) && M(D(x, Number(a.defaultExpandLevel)));
      },
      { immediate: !0 }
    );
    const N = Um({
      option: e,
      model: t,
      orgList: f,
      rowKey: v,
      setRowKey: p,
      listener: {
        async onSave(x, $) {
          var F;
          if ((F = e.apis) != null && F.save)
            return await e.apis.save(x), x.parentId && (P.value = [...P.value, x.parentId]), n == null ? void 0 : n();
          $ !== void 0 ? f.value.splice($ + 1, 0, x) : f.value.push(x);
        },
        async onUpdate(x, $) {
          var F;
          (F = e.apis) != null && F.update && await e.apis.update(x), Object.assign($, x);
          const j = v($);
          if (j) {
            const ee = f.value.findIndex((ye) => v(ye) === j);
            ee > -1 && f.value.splice(ee, 1, $);
          }
          return n == null ? void 0 : n();
        },
        async onDelete(x) {
          var $, F;
          const j = x.map((ee) => v(ee));
          try {
            await ((F = ($ = e.apis) == null ? void 0 : $.delete) == null ? void 0 : F.call($, j, x));
          } catch (ee) {
            return console.error(ee), ee;
          }
          return O && (h.value = h.value.filter(
            (ee) => !j.includes(ee)
          ), C.value = C.value.filter(
            (ee) => !j.includes(v(ee))
          )), x.forEach((ee) => {
            f.value.splice(G.value.indexOf(ee), 1);
          }), n == null ? void 0 : n();
        }
      },
      isView: o,
      effectData: r
    }), q = Vm({
      childrenMap: t.listData.modelsMap,
      context: N,
      option: e,
      attrs: b,
      isView: o,
      effectData: r
    }), { list: G, methods: Z, buttonMethods: ue = Z, modalSlot: E } = N, K = {
      selectedRowKeys: h,
      selectedRows: C,
      setSelectedRows: (x) => {
        C.value = x, h.value = x.map(($) => v($));
      },
      expandedRowKeys: P,
      setExpandedRowKeys: M,
      expandAll: () => {
        M(D(f.value));
      },
      add: (x) => {
        var $;
        return ($ = Z.add) == null ? void 0 : $.call(Z, x);
      },
      edit: (x) => {
        var $;
        return ($ = Z.edit) == null ? void 0 : $.call(Z, { ...ve, ...x });
      },
      delete: () => {
        var x;
        return (x = Z.delete) == null ? void 0 : x.call(Z, ve);
      },
      detail: (x) => {
        var $;
        return ($ = Z.detail) == null ? void 0 : $.call(Z, { ...ve, ...x });
      }
    }, ne = L({ ...K }), pe = R();
    V(
      pe,
      (x) => {
        Object.assign(ne, x, K), s.emit("register", ne);
      },
      { flush: "sync" }
    );
    const ve = L({
      ...r,
      selectedRows: C,
      selectedRowKeys: h,
      tableRef: ne
    }), me = { ...s.slots }, be = e.buttons, xe = (be == null ? void 0 : be.targetSlot) ?? (be == null ? void 0 : be.forSlot) ?? "extra";
    if (be) {
      const x = me[xe], $ = bt({
        config: be,
        effectData: ve,
        methods: ue,
        isView: o
      });
      (x || $) && (me[xe] = () => [x == null ? void 0 : x(), $ == null ? void 0 : $()]);
    }
    const Ve = e.title || e.label, {
      title: he = Ve,
      extra: Re,
      ...$e
    } = me, Ie = (he || Re) && (() => le(
      "row",
      { align: "middle", class: "sup-titlebar" },
      {
        default: () => [
          he && le(
            "col",
            { class: "sup-title" },
            {
              default: _t(
                { labelSlot: he, tooltip: e.tooltip },
                r
              )
            }
          ),
          Re && le(
            "col",
            {
              class: "sup-title-buttons",
              flex: 1,
              style: { textAlign: (be == null ? void 0 : be.align) || "right" }
            },
            { default: Re }
          )
        ]
      }
    ));
    $e.headerCell = (x) => {
      var $;
      return (($ = me.headerCell) == null ? void 0 : $.call(me, x)) || oe(x.title, r);
    };
    const ae = () => {
      const {
        rowSelection: x,
        expandedRowKeys: $,
        ...F
      } = b;
      return [
        ...E.map((j) => j()),
        Zv(
          {
            ...J.Table,
            ref: pe,
            data: G.value,
            columns: L(q),
            tableLayout: "fixed",
            pagination: !1,
            ...F,
            selection: O && {
              ...O,
              selectedKeys: h.value
            },
            rowKey: v,
            expandedKeys: P.value,
            onExpandedChange: M,
            class: [
              "sup-table-wrapper",
              e.editable && "sup-table-editable"
            ]
          },
          $e
        )
      ];
    };
    return e.tabs ? () => _(Nm, { ...e.tabs, effectData: r }, {
      [xe]: me[xe],
      title: he && (() => oe(he, r)),
      extra: Re,
      titleBar: Ie,
      default: ae
    }) : () => [Ie == null ? void 0 : Ie(), ae()];
  }
}), Km = /* @__PURE__ */ W({
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
    const r = e.option.title || e.option.label, o = [...e.model.children].map(([s, l], i) => {
      const u = Te({
        parent: e.effectData,
        current: ie(e.model, "parent"),
        field: l.refName,
        value: l.refData
      }), {
        hidden: c,
        attrs: {
          disabled: b,
          ...d
        }
      } = Ae({
        option: s,
        effectData: u
      }), {
        key: y,
        field: v
      } = s;
      return {
        attrs: L(d),
        option: {
          ...s,
          type: "CollapsePanel"
        },
        effectData: u,
        model: l,
        header: () => oe(s.label),
        key: y || v || String(i),
        hidden: c,
        disabled: b
      };
    }), a = R(e.option.activeKey || ((n = o[0]) == null ? void 0 : n.key));
    return () => [r && _("div", {
      class: ["sup-titlebar", "sup-title"]
    }, oe(r, e.effectData)), Ge("collapse", {
      ...t,
      value: a.value,
      "onUpdate:value": (s) => a.value = s
    }, {
      default: () => o.map(({
        attrs: s,
        hidden: l,
        option: i,
        disabled: u,
        model: c,
        header: b,
        effectData: d,
        key: y
      }) => !l.value && Ge("collapsePanel", {
        ...s,
        key: y,
        disabled: B(u)
      }, {
        header: b,
        extra: () => !e.isView && i.buttons ? _(De, {
          option: i.buttons,
          effectData: d
        }) : void 0,
        default: () => e.isView ? _(Ke, {
          option: i,
          modelsMap: c.children,
          effectData: d
        }) : _(Ue, {
          option: i,
          model: c,
          effectData: d
        })
      }))
    })];
  }
}), Ym = /* @__PURE__ */ W({
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
    const n = t, r = e, o = (s) => {
      n("update:value", s);
    }, a = () => Wv({
      images: r.images,
      visible: r.visible,
      current: r.current,
      width: r.width,
      height: r.height,
      "onUpdate:visible": o
    });
    return (s, l) => (Pe(), ct(a));
  }
});
function Wm(e) {
  const t = R(!1), n = L({
    visible: t,
    images: [],
    "onUpdate:value": (i) => t.value = i,
    ...e
  }), r = R(!1), o = () => !r.value && _(Ym, n), a = $o();
  ln(() => {
    r.value = !0;
  });
  let s;
  return { open: (i) => {
    if (typeof i == "string")
      n.images = [i];
    else if (Array.isArray(i))
      n.images = [...i];
    else {
      const { src: u, ...c } = i || {};
      u && (n.images = [u]), Object.assign(n, c);
    }
    if (!s) {
      const u = document.createElement("div");
      s = Io(o, { appContext: a == null ? void 0 : a.appContext }), s.appContext = a == null ? void 0 : a.appContext, Pn(s, u);
    }
    je(() => t.value = !0);
  } };
}
function Zm(e, t) {
  return new Promise((n, r) => {
    const o = new FileReader();
    t === "text" ? o.readAsText(e) : o.readAsDataURL(e), o.onload = () => n({ result: o.result, file: e }), o.onerror = (a) => r(a);
  });
}
function Qm(e, t, n) {
  const r = typeof n < "u" ? [n, e] : [e], o = new Blob(r, { type: "application/octet-stream" }), a = window.URL.createObjectURL(o), s = document.createElement("a");
  s.style.display = "none", s.href = a, s.setAttribute("download", t), typeof s.download > "u" && s.setAttribute("target", "_blank"), document.body.appendChild(s), s.click(), document.body.removeChild(s), window.URL.revokeObjectURL(a);
}
function Jm(e, t) {
  return t.split(",").some((n) => {
    var r;
    return ((r = e.name) == null ? void 0 : r.endsWith(n)) || e.type && new RegExp(`^${n.replace("*", "\\S*")}$`).test(e.type);
  });
}
function Xm(e) {
  const { mode: t, valueKey: n, infoNames: r, maxCount: o, accept: a, minSize: s, maxSize: l, repeatable: i } = e, u = {
    ...n && { [n]: n },
    uid: "uid",
    status: "status",
    url: "url",
    name: "name",
    ...r
  };
  t === "custom" && (u.originFileObj = "originFileObj");
  const c = /* @__PURE__ */ new Map(), b = /* @__PURE__ */ new Map(), d = /* @__PURE__ */ new Map();
  return {
    clearTask: (A) => {
      c.delete(A), b.delete(A);
    },
    convertInfo: (A) => {
      const w = { status: "done", ...A };
      return Object.entries(u).forEach(([S, O]) => {
        O && O !== S && O in w && (w[S] = w[O], delete w[O]);
      }), w;
    },
    getValue: (A, w) => {
      if (w) {
        const S = A[0];
        return n ? (S == null ? void 0 : S[n]) ?? (S == null ? void 0 : S[u.uid]) : S;
      }
      return n ? A.map((S) => S[n] ?? S[u.uid]) : A;
    },
    hasPendingWork: (A) => d.size > 0 || t === "auto" && A.some((w) => w.status === "uploading") || t === "submit" && A.some((w) => w.status !== "done"),
    queueDelete: (A, w) => d.set(A, w),
    reconvert: (A) => {
      const w = {};
      return Object.entries(u).forEach(([S, O]) => {
        const I = A[S];
        O && I !== void 0 && (w[O] = I);
      }), w;
    },
    registerRequest: (A, w) => {
      if (t === "auto") {
        const S = w();
        return c.set(A, S), S;
      }
      t === "submit" && b.set(A, w);
    },
    submit: async (A) => {
      let w = Promise.resolve();
      if (t === "auto") {
        const O = A.find((I) => I.status === "error");
        if (O)
          throw O.response || { message: "文件上传错误，请删除后重新上传！" };
        w = Promise.all(c.values());
      } else if (t === "submit") {
        const O = A.filter((I) => I.status !== "done").map((I) => {
          var D;
          return I.status = "uploading", (D = b.get(I.uid)) == null ? void 0 : D();
        }).filter(Boolean);
        w = Promise.all(O);
      }
      const S = await w;
      return await Promise.all([...d.values()].map((O) => O())).catch((O) => console.error(O)), S;
    },
    validate: (A, w, S) => {
      if (o > 1 && S.length + w.indexOf(A) >= o)
        return `文件数量最多${o}`;
      if (a && !Jm(A, a))
        return "请选择正确的文件类型！";
      if (s || l) {
        const O = (A.size || 0) / 1024 / 1024;
        if (s && s > O)
          return `文件最小需要${s}M`;
        if (l && l < O)
          return `文件最大不超过${l}M`;
      }
      if (!i) {
        const O = S.find((I) => I.name === A.name);
        if (O)
          return `文件重复: ${O.name}`;
      }
    }
  };
}
const eb = ".png,.jpg,.jpeg,.gif,.webp,.svg,.tif,.tiff";
function tb(e) {
  var t, n, r, o;
  if (e.thumbUrl)
    return !0;
  if (e.url || e.originFileObj) {
    const a = (n = (t = e.name || e.url) == null ? void 0 : t.match(/[^\\.]*$/)) == null ? void 0 : n[0];
    if (a && eb.includes(a))
      return !0;
    {
      const s = e.type || ((o = (r = e.url) == null ? void 0 : r.match(/^data:(\S*?);/)) == null ? void 0 : o[1]);
      return s == null ? void 0 : s.startsWith("image");
    }
  }
}
function io(e, t) {
  const n = Vv({
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
  return { setError: (o, a) => {
    n.update({
      icon: () => Ze("error"),
      okButtonProps: {
        loading: !1
      },
      type: "error",
      title: o,
      content: a == null ? void 0 : a.message
    });
  }, ...n };
}
const nb = W({
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
      apis: r = {},
      isSingle: o,
      minSize: a,
      maxSize: s,
      infoNames: l,
      repeatable: i,
      showUploadList: u,
      onPreview: c,
      onDownload: b,
      isImageUrl: d = tb,
      hideOnMax: y,
      valueKey: v
    } = e, p = (o ? 1 : e.maxCount) || 1 / 0, { accept: f, listType: g } = t.attrs, m = Xm({
      mode: n,
      valueKey: v,
      infoNames: l,
      maxCount: p,
      accept: f,
      minSize: a,
      maxSize: s,
      repeatable: i
    }), h = Wm(), { convertInfo: C, reconvert: T } = m, { onSubmit: A } = we("exaProvider", {}), w = R([]), S = Pt([]), O = Pt(), I = (x) => {
      S.value = x.map(T), e.isView || (t.emit("update:fileList", S.value), D()), w.value = x;
    }, D = () => {
      O.value = m.getValue(Y(S.value), !!e.isSingle), t.emit("update:value", O.value);
    };
    V(
      () => Y(e.value),
      (x) => {
        if (x !== O.value)
          if (O.value = x, !x)
            w.value = [];
          else {
            const $ = de(x) ? x : [x];
            S.value = v ? $.map((F) => ({ [v]: F })) : $, w.value = S.value.map(C);
          }
      },
      { immediate: !0, flush: "sync" }
    ), V(
      () => Y(e.fileList),
      (x) => {
        if (x && x !== S.value) {
          const $ = x.map(C);
          I($);
        }
      },
      { immediate: !0 }
    );
    const P = R(!1);
    A == null || A(() => {
      if (P.value = m.hasPendingWork(w.value), P.value) {
        const x = io(" 文件同步中，请稍候...");
        return m.submit(w.value).then(($) => (x.destroy(), $)).catch(($) => (P.value = !1, x.setError("文件上传失败", $), !1)).finally(() => P.value = !1);
      }
      return m.submit(w.value);
    });
    const M = (x, $) => {
      if (e.beforeUpload) {
        const j = e.beforeUpload(x, $);
        if (j !== void 0)
          return j;
      }
      const F = m.validate(x, $, w.value);
      if (F)
        return dr("error", F), Gv();
      if (n === "custom") {
        if (u !== !1)
          return !1;
      } else if (p === 1 && w.value.length) {
        const j = w.value[0];
        if (m.clearTask(j.uid), j.status === "done" && r.delete) {
          const ee = { ...S.value[0] };
          m.queueDelete(ee, () => r.delete(ee));
        }
      }
    };
    function H({ file: x, fileList: $, event: F }) {
      var j;
      x.status === "removed" ? m.clearTask(x.uid) : x.status === "uploading" && !F && n !== "auto" && (x.status = "waiting"), (j = e.onChange) == null || j.call(e, { file: x, fileList: $, event: F }), I([...$]);
    }
    const N = (x) => {
      const { file: $ } = x;
      if (n === "auto")
        return m.registerRequest($.uid, () => Z(x));
      if (n === "submit")
        m.registerRequest($.uid, () => Z(x));
      else if (n === "base64" || n === "text")
        return Zm($, n).then(({ result: F }) => G({ url: F }, $));
    }, q = (x, $) => {
      const F = w.value.find((j) => j.uid === $.uid);
      return Object.assign(F, { error: x, status: "error" }), I([...w.value]), Promise.reject(x);
    }, G = (x, $) => {
      const F = w.value.find((j) => j.uid === $.uid);
      return Object.assign(F, C(x), { status: "done" }), I([...w.value]), x;
    }, Z = (x) => {
      const { file: $, filename: F, onProgress: j, onError: ee, onSuccess: ye } = x;
      if (!r.upload)
        return Promise.resolve().then(() => q(Error("Api config error"), $));
      const St = new FormData();
      St.append(F, $);
      const as = (Me) => {
        Me.total > 0 && (Me.percent = Me.loaded / Me.total * 100), j(Me);
      };
      return r.upload(St, { onUploadProgress: as }).then(
        (Me) => G(Me, $),
        (Me) => q(Me, $)
      );
    }, ue = async (x) => {
      var $;
      let F = await (($ = e.onRemove) == null ? void 0 : $.call(e, x));
      return F !== !1 && r.delete && x.status === "done" ? new Promise((j) => {
        const ee = Va({
          title: "确定删除吗？",
          okText: "确定",
          cancelText: "取消",
          closable: !1,
          maskClosable: !1,
          ...J.Modal,
          onOk() {
            const ye = T(x), St = () => r.delete(ye);
            if (n === "submit")
              m.queueDelete(
                ye,
                () => St()
                // .then(
                //   () => removeFileMap.delete(__file)
                //   // () => updateFileList([...innerFileList.value, __file]) // 删除失败后还原文件
                // )
              ), j(!0);
            else
              return ee.update({
                okCancel: !1,
                title: "文件删除中……"
              }), St().then(j, () => (ee.update({
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
    }, E = R(!1), K = b || ((x) => {
      if (r.download && !E.value) {
        const $ = io("文件下载中，请稍候...");
        r.download(T(x)).then((F) => Qm(F, x.name)).then(() => $.destroy()).catch((F) => {
          $.setError("文件下载失败", F);
        }).finally(() => P.value = !1);
      }
    }), ne = k(
      () => typeof u == "boolean" ? u : {
        showRemoveIcon: !e.isView && !e.disabled,
        showDownloadIcon: e.isView,
        ...u
      }
    ), pe = async (x) => {
      if (c) {
        const $ = await c(T(x));
        $ && h.open($);
      } else if (d(x)) {
        let $;
        const F = w.value.filter((j) => d(j)).map((j, ee) => {
          j === x && ($ = ee);
          const ye = j.url || j.thumbUrl;
          return !ye && j.originFileObj && (j.objectUrl = window.URL.createObjectURL(j.originFileObj)), ye || j.objectUrl;
        });
        h.open({ images: F, current: $ });
      }
    }, ve = ({ file: x, listType: $ }) => x.status === "waiting" ? Ze("sync") : x.status === "uploading" ? Ze("loading") : Ze("attachment"), me = e.title, be = typeof e.title == "string" ? e.title : "上传文件", xe = L({ ...Y(e.effectData), fileList: w }), Ve = Ne(me) && (() => me(xe)), he = [];
    f && he.push("支持文件格式：" + f), s && he.push("单个文件不超过" + s + "MB");
    const Re = e.tip ?? he.join(", "), $e = { ...t.slots };
    g === "picture-card" ? $e.default = () => {
      var x, $;
      return (($ = (x = t.slots).default) == null ? void 0 : $.call(x, xe)) || _("div", [
        Ze("add"),
        Ve ? Ve() : _("div", { style: "margin-top:8px" }, be)
      ]);
    } : $e.default = () => {
      var x, $;
      return [
        (($ = (x = t.slots).default) == null ? void 0 : $.call(x, xe)) || Yv(
          {},
          { default: () => [Ze("upload"), Ve ? Ve() : be] }
        ),
        Re && _("div", { class: "sup-upload-tip" }, Re)
      ];
    };
    const Ie = k(() => e.disabled || e.isView), ae = k(() => y && p && w.value.length >= p);
    return () => Ie.value && w.value.length === 0 ? _("div", { class: "sup-upload-tip" }, "暂无附件") : Kv(
      {
        class: { "upload-disabled": Ie.value },
        customRequest: N,
        beforeUpload: M,
        fileList: w.value,
        onChange: H,
        onPreview: pe,
        onRemove: ue,
        showUploadList: ne.value,
        maxCount: p,
        isImageUrl: d,
        iconRender: ve,
        onDownload: K
      },
      {
        ...$e,
        default: () => Ie.value || (ae.value ? null : $e.default())
      }
    );
  }
}), rb = /* @__PURE__ */ W({
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
    const n = e, r = t, o = R(), a = R(""), s = R(!1), l = k(() => ur("Input")), i = k(
      () => fr(
        "Input",
        {
          value: a.value,
          "onUpdate:value": (g) => a.value = g
        },
        { option: n.option, effectData: n.effectData }
      )
    ), u = (g, m) => typeof n.closable == "function" ? n.closable(g, m) : n.closable, c = k(() => n.value ? typeof n.value == "string" ? n.value.split(",") : n.value : []), b = () => {
      s.value = !0, je(() => {
        o.value.focus();
      });
    }, d = (g) => {
      const m = c.value.filter((h) => h !== g);
      p(m);
    }, y = (g, m) => {
      const h = on(
        "tag",
        {
          removable: u(g, m),
          onRemove: () => d(g)
        },
        { default: () => g.length > 20 ? `${g.slice(0, 20)}...` : g }
      );
      return g.length > 20 ? cr("tooltip", { title: g }, { default: () => h }) : h;
    }, v = () => on(
      "tag",
      { class: "sup-tag-add", onClick: b },
      { default: () => [nt("add"), oe(n.newLabel, n.effectData)] }
    ), p = (g) => {
      n.stringifyValue ? r("update:value", g.join(",")) : r("update:value", g);
    }, f = () => {
      a.value && c.value.indexOf(a.value) === -1 && p([...c.value, a.value]), s.value = !1, a.value = "";
    };
    return (g, m) => (Pe(), en(Dn, null, [
      (Pe(!0), en(Dn, null, Do(c.value, (h, C) => (Pe(), ct(Tt(() => y(h, C)), { key: h }))), 128)),
      s.value ? (Pe(), ct(Tt(l.value), te({
        key: 0,
        ref_key: "inputRef",
        ref: o
      }, i.value, {
        class: "sup-tag-input",
        onBlur: f
      }), null, 16)) : (Pe(), ct(Tt(v), { key: 1 }))
    ], 64));
  }
}), ob = {
  key: 1,
  class: "sup-tag-select-empty"
}, ab = /* @__PURE__ */ W({
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
    const n = e, r = t, { optionsRef: o } = Qe(n.option, n.options, n.effectData), a = k(() => {
      const { value: u } = n, c = n.stringifyValue;
      return u === void 0 ? [] : c ? u.split(",") : Array.isArray(u) ? u : [u];
    }), s = (u, c) => {
      const b = n.multiple ? c ? [...a.value, u] : a.value.filter((d) => d !== u) : [u];
      r("check", u, c), i(b), r("change", u, b);
    }, l = (u, c) => on(
      "checkableTag",
      {
        class: "tag-select",
        selected: a.value.includes(c),
        onSelectedChange: (b) => s(c, b)
      },
      { default: () => u }
    ), i = (u) => {
      n.multiple ? n.stringifyValue ? r("update:value", u.join(",")) : r("update:value", u) : r("update:value", u[0]);
    };
    return (u, c) => B(o).length ? (Pe(!0), en(Dn, { key: 0 }, Do(B(o), ({ label: b, value: d }) => (Pe(), ct(Tt(() => l(b, d)), { key: d }))), 128)) : (Pe(), en("div", ob, ol(e.placeholder), 1));
  }
}), Wa = {
  Form: Am,
  Group: In,
  Card: xm,
  List: $m,
  ListGroup: Im,
  Tabs: Pm,
  Table: Gm,
  Collapse: Km,
  Descriptions: In,
  Fragment: In
}, sb = {
  InputGroup: Om,
  InputList: Tm,
  Upload: nb,
  TagInput: rb,
  TagSelect: ab
}, Vt = Object.keys(Wa), lb = {
  ...Wa,
  ...sb
}, wn = {}, br = {}, qn = /* @__PURE__ */ new Set();
function Za(e) {
  return typeof e == "object" && e && "component" in e ? e : { component: e };
}
function Qa(e, t, n, r = []) {
  const o = /* @__PURE__ */ new Set([
    ...Fa,
    ...r
  ]);
  Object.entries(t).forEach(([a, s]) => {
    if (s) {
      if (o.has(a))
        throw new Error(
          `Schema 类型 '${a}' 为 Core 保留类型，不能注册为 ${n} 组件`
        );
      e[a] = { ...Za(s), source: n };
    }
  });
}
function Ja(e, t = []) {
  Qa(wn, e, "custom", [
    ...qn,
    ...t
  ]);
}
function ib(e) {
  const t = new Set(e);
  for (const n of Object.keys(wn))
    if (t.has(n))
      throw new Error(
        `Schema 类型 '${n}' 已注册为项目组件，不能再由 UIAdapter 接管`
      );
  qn.clear(), t.forEach((n) => qn.add(n));
}
function Lb(e, t = []) {
  const n = Object.fromEntries(
    Object.entries(e).map(([a, s]) => [
      a,
      s && Za(s).component
    ])
  );
  Ua(n, "auto");
  const r = new Set(t), o = Object.fromEntries(
    Object.entries(e).filter(
      ([a]) => !Fa.has(a) && !r.has(a)
    )
  );
  Qa(br, o, "auto");
}
function an(e) {
  return wn[e] || br[e];
}
function _n(e) {
  return !!an(e);
}
function ub() {
  return [
    .../* @__PURE__ */ new Set([
      ...Object.keys(wn),
      ...Object.keys(br)
    ])
  ];
}
function Xa(e, t) {
  const { prop: n = "value", event: r = "update:value" } = e.model || {}, o = { ...t };
  if (n !== "value" && (o[n] = o.value, delete o.value), r !== "update:value") {
    const a = r.startsWith("on") ? r : `on${r[0].toUpperCase()}${r.slice(1)}`;
    o[a] = o["onUpdate:value"], delete o["onUpdate:value"];
  }
  return o;
}
const ge = lb, J = {};
let uo = !1, co;
function cb(e) {
  if (co) {
    Xr(e);
    return;
  }
  ib(Object.keys(e.fields || {})), Xr(e), co = e, uo || (Gt(J, e.defaults || {}), uo = !0);
}
function db(e) {
  return cb(e), e;
}
function fb(e = {}) {
  const { defaultProps: t, ...n } = e;
  Object.assign(re, n), t && es(t);
}
function pb(e, t) {
  Ja({ [e]: t });
}
function vb(e) {
  Ja(e);
}
function es(e) {
  Gt(J, e);
}
const fo = {
  useAdapter: db,
  configure: fb,
  registerComponent: pb,
  registerComponents: vb,
  setDefaultProps: es
}, po = Symbol.for("superform.official-product");
function mb(e, t) {
  let n = !1;
  const r = {
    ...fo,
    initialize(o = {}) {
      var a;
      const s = o.components, l = Object.keys(s || {});
      if (n) {
        if (l.length)
          throw new Error(
            `SuperForm '${e}' 已初始化，不能再追加字段组件`
          );
        return r;
      }
      const i = t(s);
      for (const b of l)
        if (!((a = i.fields) != null && a[b]))
          throw new Error(
            `UIAdapter '${i.name}' 未声明字段 '${b}'，不能初始化对应 UI 组件`
          );
      const u = globalThis, c = u[po];
      if (c && c !== e)
        throw new Error(
          `SuperForm 已初始化官方产品 '${String(
            c
          )}'，不能再初始化 '${e}'`
        );
      return fo.useAdapter(i), u[po] = e, n = !0, r;
    }
  };
  return r;
}
function Ot(e, t, n) {
  return _(e === "row" ? bo : go, t, n);
}
const bb = W({
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
    const t = we("gridConfig", {}), { subSpan: n, column: r } = e.config, {
      layout: o,
      bordered: a,
      mode: s = a && "table",
      rowProps: l,
      colon: i,
      size: u = "middle",
      tableLayout: c,
      ...b
    } = t;
    let d = r || (Number(n) ? Math.floor(24 / n) : t.column);
    d ?? (d = Number(t.subSpan) ? Math.floor(24 / t.subSpan) : 2);
    function y() {
      const f = [];
      let g = [], m = 0;
      return e.items.forEach(({ option: h, label: C, content: T, hidden: A }, w) => {
        if (B(A))
          return;
        const { span: S = h.span } = h.descriptionsProps || {};
        let O = Number(S) ? Math.ceil(S / (24 / d)) : 1;
        O = O > d ? d : O;
        const I = {
          ...b,
          ...h.formItemProps,
          ...h.descriptionsProps
        }, D = {
          ...I.labelAlign && { textAlign: I.labelAlign },
          ...I.labelStyle
        }, P = {
          labelCol: te(I.labelCol, {
            style: D,
            class: { "sup-label-no-colon": I.noColon }
          }),
          wrapperCol: te(
            { style: o === "vertical" && { textAlign: I.labelAlign } },
            { style: I.contentStyle },
            I.wrapperCol
          ),
          option: h,
          attrs: I,
          span: S,
          label: C,
          content: T,
          colspan: O
        };
        if (s === "table")
          if (m + O <= d)
            m += O, g.push(P);
          else {
            if (f.push(g), m < d) {
              const M = d - m;
              g[g.length - 1].colspan += M;
            }
            m = O, g = [P];
          }
        else
          g.push(P);
        (h.breakAfter ?? h.wrapping) && (f.push(g), m = 0, g = []), w === e.items.length - 1 && g.length && f.push(g);
      }), f;
    }
    const v = k(() => y());
    if (s === "table") {
      const f = () => o === "vertical" ? v.value.flatMap((g) => [
        (g.length > 1 || g[0].label) && _(
          "tr",
          { class: "ant-descriptions-row" },
          g.map(
            (m) => {
              var h;
              return _(
                "th",
                te(
                  {
                    class: "ant-descriptions-item-label",
                    colspan: m.colspan,
                    style: `width: ${(m.span / 24 * 100).toFixed(2)}%`
                  },
                  { class: m.labelCol.class, style: m.labelCol.style }
                ),
                (h = m.label) == null ? void 0 : h.call(m)
              );
            }
          )
        ),
        _(
          "tr",
          { class: "ant-descriptions-row" },
          g.map(
            (m) => _(
              "td",
              te(
                { class: "ant-descriptions-item-content", colspan: m.colspan },
                { class: m.wrapperCol.class, style: m.wrapperCol.style }
              ),
              m.content()
            )
          )
        )
      ]) : v.value.map(
        (g) => _(
          "tr",
          { class: "ant-descriptions-row" },
          g.flatMap(
            (m) => m.label ? [
              _("th", te({ class: "ant-descriptions-item-label" }, { class: m.labelCol.class, style: m.labelCol.style }), m.label()),
              _(
                "td",
                te(
                  { class: "ant-descriptions-item-content", style: m.wrapperCol.style, colspan: m.colspan * 2 - 1 },
                  { class: m.wrapperCol.class }
                ),
                m.content()
              )
            ] : [
              _(
                "td",
                { class: "ant-descriptions-item-content", style: m.wrapperCol.style, colspan: m.colspan * 2 },
                m.content()
              )
            ]
          )
        )
      );
      return () => _(
        "div",
        { class: ["ant-descriptions", "ant-descriptions-bordered", u !== "default" && "ant-descriptions-" + u] },
        _("div", { class: "ant-descriptions-view" }, _("table", { style: { tableLayout: c } }, f()))
      );
    }
    const p = () => v.value.map(
      (f) => Ot("row", { class: "ant-descriptions-row", ...l }, {
        default: () => f.map(({ option: g, content: m, span: h, label: C, labelCol: T, wrapperCol: A, attrs: w }) => {
          const S = { span: h, ...w.colProps || g.colProps };
          return S.span === 0 || S.flex ? S.span = void 0 : Number(S.span) || (S.span = t.column ? 24 / t.column : t.subSpan), Ot("col", S, {
            default: () => Ot("row", { class: ["ant-descriptions-item-container"] }, {
              default: () => [
                C && Ot("col", te({ class: "ant-descriptions-item-label" }, T), { default: () => _("label", {}, C()) }),
                Ot("col", { class: "ant-descriptions-item-content", ...A }, {
                  default: () => !w.noInput && s === "form" && C !== void 0 ? _("div", { class: "sup-descriptions-item-input" }, m()) : m()
                })
              ]
            })
          });
        })
      })
    );
    return () => _(
      "div",
      {
        class: [
          "ant-descriptions",
          o === "vertical" && "ant-descriptions-vertical",
          s === "form" ? "sup-descriptions-mode-form" : "sup-descriptions-default",
          i === !1 && "ant-descriptions-item-no-colon",
          u && u !== "default" && "ant-descriptions-" + u
        ]
      },
      _("div", { class: "ant-descriptions-view" }, p())
    );
  }
}), gb = W({
  name: "SuperListItem",
  inheritAttrs: !1,
  setup(e, { attrs: t, slots: n }) {
    return () => {
      var r;
      return _("li", { ...t, class: ["sup-list-item", t.class] }, (r = n.default) == null ? void 0 : r.call(n));
    };
  }
}), hb = W({
  name: "SuperList",
  inheritAttrs: !1,
  props: {
    dataSource: { type: Array, default: () => [] }
  },
  setup(e, { attrs: t, slots: n }) {
    return () => _("section", { ...t, class: ["sup-list", t.class] }, [
      n.header && _("header", { class: "sup-list-header" }, n.header()),
      _(
        "ul",
        { class: "sup-list-items" },
        e.dataSource.map((r, o) => {
          var a;
          return (a = n.renderItem) == null ? void 0 : a.call(n, { item: r, index: o });
        })
      )
    ]);
  }
});
function sn(e, t = {}) {
  return e ? typeof e == "function" ? e(t || {}, {}) : typeof e != "object" ? _("span", e) : _(e, { effectData: t }) : null;
}
function Zt(e, { customIcon: t } = {}) {
  return typeof e == "string" ? (t == null ? void 0 : t(e)) || _("span", { class: `anticon ${e}` }) : e ? _(Y(e)) : void 0;
}
function ts(e) {
  var t, n;
  (n = (t = (e == null ? void 0 : e.domEvent) || e) == null ? void 0 : t.stopPropagation) == null || n.call(t);
}
function vo(e, t, n, r, o) {
  return [
    e.icon && !n ? Zt(e.icon, { customIcon: o }) : void 0,
    !e.icon || !r ? sn(e.label, t) : void 0
  ];
}
function yb(e, t, n, r, o) {
  var u;
  const a = { ...e.attrs, disabled: B((u = e.attrs) == null ? void 0 : u.disabled) }, s = (c) => {
    var b;
    ts(c), (b = e.onClick) == null || b.call(e, c);
  }, l = B(e.menu);
  let i;
  return l ? i = _(
    Gn,
    { disabled: a.disabled, ...e.dropdownProps },
    {
      popupRender: () => _(
        Kn,
        { onClick: s },
        () => l.map(
          (c) => _(
            Yn,
            { key: c.value, disabled: c.disabled },
            {
              icon: c.icon ? () => Zt(c.icon, { customIcon: o }) : void 0,
              default: () => sn(c.label, t)
            }
          )
        )
      ),
      default: () => _(Xe, a, () => [
        ...vo(
          e,
          t,
          n,
          r,
          o
        ),
        _(yo)
      ])
    }
  ) : e.render ? i = e.render({ props: a, ...t }) : i = _(
    Xe,
    { ...a, onClick: s },
    () => vo(e, t, n, r, o)
  ), _(
    zn,
    { title: B(e.tooltipTitle) },
    { default: () => i }
  );
}
function wb(e, t) {
  const {
    groupProps: n,
    buttons: r,
    moreButtons: o,
    defaultButtonProps: a,
    divider: s,
    labelOnly: l,
    iconOnly: i,
    moreLabel: u,
    effectData: c
  } = e, b = r.flatMap((d, y) => [
    yb(d, c, l, i, t),
    s && y < r.length - 1 ? _(Oo, { type: "vertical", class: "sup-buttons-divider" }) : void 0
  ]);
  return o.length && b.push(
    _(
      Gn,
      {},
      {
        default: () => _(
          Xe,
          a,
          () => u ? sn(u, c) : _(ho)
        ),
        popupRender: () => _(
          Kn,
          {},
          () => o.map(
            (d) => {
              var y;
              return _(
                Yn,
                {
                  key: d.label,
                  disabled: B((y = d.attrs) == null ? void 0 : y.disabled),
                  onClick: (v) => {
                    var p;
                    ts(v), (p = d.onClick) == null || p.call(d, v);
                  }
                },
                {
                  icon: d.icon ? () => Zt(d.icon, { customIcon: t }) : void 0,
                  default: () => sn(d.label, c)
                }
              );
            }
          )
        )
      }
    )
  ), _(
    To,
    {
      size: s ? 0 : "small",
      ...n,
      class: ["sup-buttons", n == null ? void 0 : n.class]
    },
    () => b
  );
}
const _b = {
  Form: _s,
  FormItem: Ss,
  Row: bo,
  Col: go,
  Space: To,
  SpaceCompact: Cs,
  Card: So,
  Tabs: Co,
  TabPane: Ao,
  Collapse: As,
  CollapsePanel: Os,
  Button: Xe,
  Divider: Oo,
  Dropdown: Gn,
  Menu: Kn,
  MenuItem: Yn,
  Tooltip: zn,
  Tag: _o,
  CheckableTag: wo
};
function ns() {
  return {
    components: _b,
    form: {
      component: "Form",
      item: "FormItem",
      validate: (t) => t.validate(),
      clearValidate: (t) => t.clearValidate()
    },
    layout: {
      row: "Row",
      col: "Col",
      space: "Space",
      compactSpace: "SpaceCompact"
    },
    containers: {
      card: { component: "Card" },
      tabs: {
        component: "Tabs",
        model: { prop: "activeKey", event: "update:activeKey" },
        render(t, n, r) {
          const { extra: o, ...a } = r;
          return _(
            t,
            n,
            o ? { ...a, rightExtra: o } : a
          );
        }
      },
      tab: {
        component: "TabPane",
        transformProps(t) {
          const { label: n, ...r } = t;
          return { ...r, tab: n };
        }
      },
      collapse: {
        component: "Collapse",
        model: { prop: "activeKey", event: "update:activeKey" }
      },
      collapsePanel: {
        component: "CollapsePanel",
        transformProps(t) {
          const { disabled: n, ...r } = t;
          return { ...r, collapsible: n ? "disabled" : void 0 };
        }
      },
      list: { component: hb },
      listItem: { component: gb },
      descriptions: { component: bb }
    },
    icons: {
      semantic: {
        add: is,
        remove: us,
        more: ho,
        expand: yo,
        collapse: cs,
        info: ds,
        upload: fs,
        attachment: ps,
        loading: vs,
        sync: ms,
        error: bs
      },
      render: Zt
    },
    actions: {
      render: (t, n, r) => t === "group" ? wb(n, re.customIcon) : _(zn, n, r)
    },
    presentation: {
      render(t, n, r) {
        if (t === "checkableTag") {
          const { selected: l, onSelectedChange: i, ...u } = n;
          return _(
            wo,
            { ...u, checked: l, onChange: i },
            r
          );
        }
        const { removable: o, onRemove: a, ...s } = n;
        return _(
          _o,
          { ...s, closable: o, onClose: a },
          r
        );
      }
    },
    services: {
      message: (t, n) => gs[t](n),
      confirm(t) {
        const n = Sn.confirm(t);
        return {
          update: (r) => n.update(r),
          destroy: () => n.destroy()
        };
      },
      info(t) {
        const n = Sn.info(t);
        return {
          update: (r) => n.update(r),
          destroy: () => n.destroy()
        };
      }
    },
    modal: {
      render(t, n) {
        const { visible: r, "onUpdate:visible": o, ...a } = t;
        return _(
          Sn,
          { ...a, open: r, "onUpdate:open": o },
          n
        );
      },
      useContext: hs,
      wrapContext(t, n, r) {
        var l;
        const o = n == null ? void 0 : n.value, a = (l = o == null ? void 0 : o.getPrefixCls) == null ? void 0 : l.call(o), s = r.prefixCls || `${a}-modal`;
        return _(
          ys,
          { ...o, prefixCls: a },
          () => t({ ...r, rootPrefixCls: a, prefixCls: s })
        );
      }
    },
    upload: {
      listIgnore: gr.LIST_IGNORE,
      render: (t, n) => _(gr, t, n),
      renderTrigger: (t, n) => _(Xe, t, n)
    },
    preview: {
      render(t) {
        const {
          visible: n,
          "onUpdate:visible": r,
          images: o = [],
          current: a,
          width: s,
          height: l
        } = t;
        return _(
          hr.PreviewGroup,
          {
            style: { display: "none" },
            preview: { visible: n, current: a, onVisibleChange: r }
          },
          () => o.map(
            (i, u) => _(hr, { key: u, src: i, width: s, height: l })
          )
        );
      }
    },
    table: {
      render(t, n) {
        const {
          data: r,
          selection: o,
          expandedKeys: a,
          onExpandedChange: s,
          pagination: l,
          ...i
        } = t;
        return _(
          ws,
          {
            ...i,
            dataSource: r,
            rowSelection: o && {
              ...o.attrs,
              selectedRowKeys: o.selectedKeys,
              onChange: o.onChange,
              getCheckboxProps: o.isRowSelectable ? (u) => {
                var c;
                return {
                  disabled: !((c = o.isRowSelectable) != null && c.call(o, u))
                };
              } : void 0
            },
            pagination: l && {
              ...l.attrs,
              ...l,
              attrs: void 0
            },
            expandedRowKeys: a,
            "onUpdate:expandedRowKeys": s
          },
          n
        );
      },
      renderFilter(t, n) {
        var d;
        const { bordered: r, items: o, value: a, onValueChange: s, attrs: l = {} } = t, { tabExtra: i, cardExtra: u, ...c } = n;
        return r ? _(
          So,
          {
            tabList: o,
            activeTabKey: a,
            onTabChange: s
          },
          {
            ...c,
            customTab: ({ tab: y }) => y,
            tabBarExtraContent: i,
            extra: u
          }
        ) : [_(
          Co,
          { ...l, activeKey: a, "onUpdate:activeKey": s },
          {
            ...c,
            default: () => o.map(
              (y) => _(Ao, { ...y, tab: () => y.tab })
            ),
            rightExtra: i
          }
        ), (d = n.default) == null ? void 0 : d.call(n)];
      },
      selectors: {
        table: ".ant-table",
        title: ".ant-table-title",
        header: ".ant-table-thead",
        footer: ".ant-table-footer",
        pagination: ".ant-pagination",
        wrapper: ".ant-table-wrapper",
        empty: ".ant-empty",
        emptyCell: ".ant-table-tbody .ant-table-cell",
        body: ".ant-table-body"
      }
    }
  };
}
const Ub = ns();
function Sb(e, t = {}) {
  return e ? typeof e == "function" ? e(t || {}, {}) : typeof e != "object" ? _("span", e) : _(e, { effectData: t }) : null;
}
function Xt(e, t = (n) => [n]) {
  const { onValueChange: n, onChange: r, ...o } = e;
  return n ? {
    ...o,
    onChange: (...a) => (n(...t(...a)), r == null ? void 0 : r(...a))
  } : e;
}
function rs() {
  return {
    Input: {
      component: "Input",
      processors: ["input"],
      transformProps(e, { option: t }) {
        return { placeholder: `请输入${t.label ?? ""}`, ...e };
      },
      render(e, t, n, r) {
        const { search: o, searchLoading: a, addonAfter: s, enterButton: l, ...i } = t;
        if (!o)
          return _(e, { ...i, addonAfter: s }, r);
        const { addonAfter: u, ...c } = r;
        let b = r.enterButton || (l ? void 0 : u);
        const d = l || s;
        if (!b && d && typeof d == "object") {
          const { label: y, icon: v, ...p } = d;
          b = () => [_(Xe, { loading: a, ...p }, {
            icon: () => Zt(v, { customIcon: re.customIcon }),
            default: () => Sb(y)
          })];
        } else
          !b && typeof d == "function" && (b = () => [_(Xe, { type: "primary", loading: a }, d)]);
        return _(e.Search || e, { ...i, enterButton: b ? void 0 : d }, b ? { ...c, enterButton: b } : c);
      }
    },
    TextArea: {
      component: "TextArea",
      transformProps(e, { option: t }) {
        return { allowClear: !0, placeholder: `请输入${t.label ?? ""}`, ...e, style: [{ width: "100%" }, e.style] };
      }
    },
    InputNumber: {
      component: "InputNumber",
      transformProps(e, { option: t }) {
        return { type: "number", placeholder: `请输入${t.label ?? ""}`, ...e, style: [{ width: "100%" }, e.style] };
      }
    },
    InputOTP: { component: "InputOTP" },
    InputPassword: { component: "InputPassword" },
    InputSearch: {
      component: "InputSearch",
      processors: ["input"],
      transformProps(e, { option: t }) {
        const n = { ...e }, r = n.searchLoading;
        return delete n.search, delete n.searchLoading, { placeholder: `请输入${t.label ?? ""}`, ...n, loading: r };
      }
    },
    AutoComplete: {
      component: "AutoComplete",
      processors: ["autoComplete"],
      transformProps(e, { option: t }) {
        return { filterOption: !0, placeholder: `请输入${t.label ?? ""}`, ...e };
      }
    },
    Cascader: { component: "Cascader" },
    ColorPicker: { component: "ColorPicker" },
    Select: {
      component: "Select",
      processors: ["select"],
      transformProps(e, { option: t }) {
        return Xt({ optionFilterProp: "label", placeholder: `请选择${t.label ?? ""}`, ...e });
      }
    },
    Radio: { component: "Radio", model: { prop: "checked", event: "update:checked" } },
    RadioGroup: { component: "RadioGroup", processors: ["radioGroup"], transformProps: (e) => Xt(e, (t) => {
      var n;
      return [(n = t == null ? void 0 : t.target) == null ? void 0 : n.value];
    }) },
    Checkbox: { component: "Checkbox", model: { prop: "checked", event: "update:checked" } },
    CheckboxGroup: { component: "CheckboxGroup", processors: ["checkboxGroup"], transformProps: (e) => Xt(e) },
    DatePicker: { component: "DatePicker", processors: ["picker"] },
    DateRangePicker: { component: "DateRangePicker", processors: ["picker"] },
    DateMonthPicker: { component: "DateMonthPicker", processors: ["picker"] },
    DateQuarterPicker: { component: "DateQuarterPicker", processors: ["picker"] },
    DateWeekPicker: { component: "DateWeekPicker", processors: ["picker"] },
    DateYearPicker: { component: "DateYearPicker", processors: ["picker"] },
    TimePicker: { component: "TimePicker", processors: ["picker"] },
    TimeRangePicker: { component: "TimeRangePicker", processors: ["picker"] },
    TreeSelect: {
      component: "TreeSelect",
      processors: ["treeSelect"],
      transformProps(e, { option: t }) {
        return Xt({ allowClear: !0, placeholder: `请选择${t.label ?? ""}`, ...e }, (n, r) => [n, Array.isArray(n) ? r : Array.isArray(r) ? r[0] : r]);
      }
    },
    Switch: {
      component: "Switch",
      processors: ["switch"],
      model: { prop: "checked", event: "update:checked" },
      transformProps(e) {
        const { trueValue: t, falseValue: n, trueLabel: r, falseLabel: o, ...a } = e;
        return { ...a, checkedValue: t, unCheckedValue: n, checkedChildren: r, unCheckedChildren: o };
      }
    },
    Rate: { component: "Rate" },
    Mentions: { component: "Mentions" },
    Segmented: { component: "Segmented" },
    Slider: { component: "Slider" },
    Transfer: {
      component: "Transfer",
      model: { prop: "targetKeys", event: "update:targetKeys" }
    }
  };
}
const Nb = rs(), kb = {
  FormItem: { validateFirst: !0 },
  Table: { size: "small" },
  TimePicker: { valueFormat: "HH:mm:ss" },
  TimeRangePicker: { valueFormat: "HH:mm:ss" },
  DatePicker: { valueFormat: "YYYY-MM-DD" },
  DateRangePicker: { valueFormat: "YYYY-MM-DD" }
};
function os(e = {}) {
  return {
    name: "antdv-next",
    ...ns(),
    fields: rs(),
    fieldComponents: e.components,
    defaults: {
      FormItem: { validateFirst: !0 },
      Table: { size: "small" },
      TimePicker: { valueFormat: "HH:mm:ss" },
      TimeRangePicker: { valueFormat: "HH:mm:ss" },
      DatePicker: { valueFormat: "YYYY-MM-DD" },
      DateRangePicker: { valueFormat: "YYYY-MM-DD" }
    }
  };
}
const Bb = os();
function Vb(e) {
  return e;
}
const Cb = (e) => {
  var t, n;
  return ((n = (t = re.tableApiSetting) == null ? void 0 : t.resultTransform) == null ? void 0 : n.call(t, e)) || e;
}, Ab = (e) => {
  const { currentField: t, sizeField: n } = re.tableApiSetting || {};
  return t || n ? {
    [t || "current"]: e.current,
    [n || "size"]: e.size
  } : e;
};
function Ob(e, t) {
  const n = L({}), r = R(!1);
  let o = {}, a = 0, s;
  const l = [], i = (h) => l.push(h);
  e.onLoaded && l.push(e.onLoaded);
  const u = async (h) => {
    var C, T, A;
    const w = It({}, Ab(n), o, h), S = ((C = e.beforeQuery) == null ? void 0 : C.call(e, w)) || w, O = (T = e.apis) == null ? void 0 : T.query;
    s == null || s.abort();
    const I = ++a;
    if (!O) {
      s = void 0, r.value = !1;
      return;
    }
    const D = new AbortController();
    s = D, r.value = !0;
    try {
      const P = await O(S, { signal: D.signal });
      if (I !== a || D.signal.aborted)
        return;
      const M = ((A = e.afterQuery) == null ? void 0 : A.call(e, P)) || P;
      return c(Cb(M));
    } finally {
      I === a && (s = void 0, r.value = !1);
    }
  }, c = (h) => (Array.isArray(h) ? (t(h), m.value !== !1 && (n.current = 1, m.value = { ...m.value, total: h.length })) : h != null && h.records && (t(h.records), m.value !== !1 && (n.current = h.current, n.size = h.size, m.value = { ...m.value, total: h.total })), Promise.all(l.map((C) => C(h)))), b = (h, C = n.size) => (n.current = h, n.size = C, u()), d = (h) => (m.value && (n.current = 1), u(h)), y = kn(d, 300, { leading: !1 }), v = () => {
    s == null || s.abort(), s = void 0, a += 1, r.value = !1;
  }, p = {}, f = (h, C) => {
    C === "dynamic" ? o = It({}, p, h) : (Object.assign(p, h), It(o, h));
  }, g = () => o, m = R(!1);
  return V(
    () => {
      var h;
      return e.pagination ?? ((h = e.attrs) == null ? void 0 : h.pagination);
    },
    (h) => {
      if (h === !1) {
        m.value = !1;
        return;
      }
      Object.assign(n, { size: (h == null ? void 0 : h.pageSize) || 10, current: (h == null ? void 0 : h.current) || 1 }), m.value = te(
        {
          onChange: b
          // onShowSizeChange: goPage,
        },
        {
          ...h,
          pageSize: n.size,
          current: n.current
        }
      );
    },
    {
      immediate: !0,
      flush: "sync"
    }
  ), V(n, (h) => {
    m.value && (m.value = { ...m.value, pageSize: h.size, current: h.current });
  }), {
    goPage: b,
    reload: u,
    throttleRequest: y,
    cancelQuery: v,
    setQueryParams: f,
    getQueryParams: g,
    query: d,
    pagination: m,
    setPageData: c,
    onLoaded: i,
    loading: r
  };
}
function Tb(e, t, n) {
  var r;
  const { columns: o, searchForm: a } = e, s = a || e.searchSchema || {}, l = R(), i = s.dataSource || L({}), { buttons: u = {}, searchOnChange: c, limit: b, ...d } = s, y = R(!1), v = [];
  s.subItems.forEach((h) => {
    if (typeof h == "string") {
      const C = o.find((T) => T.field === h);
      C && v.push({
        type: "Input",
        ...Tv(C, "span", "disabled", "hidden"),
        editable: !0,
        exclude: []
      });
    } else
      return v.push({ ...h });
  }), b && v.length > b && v.forEach((h, C) => {
    if (C >= b) {
      const T = h.hidden;
      h.hidden = (...A) => !y.value || (T == null ? void 0 : T(...A));
    }
  });
  const p = {
    search() {
      var h;
      n(i), (h = s.onSubmit) == null || h.call(s, Y(i));
    },
    reset(h) {
      l.value.resetFields(h);
    }
  }, f = Array.isArray(u) ? { actions: u } : { ...u };
  f.actions ?? (f.actions = c ? void 0 : ["search", "reset"]), (r = f.actions) != null && r.length && (b && v.length > b && (f.actions = [
    {
      label: () => [
        y.value ? "收起 " : "展开 ",
        nt(y.value ? "collapse" : "expand")
      ],
      attrs: { type: "link" },
      onClick: () => y.value = !y.value
    },
    ...f.actions
  ]), v.push({
    type: "InfoSlot",
    align: "right",
    span: "auto",
    render: () => _(De, {
      option: f,
      methods: p,
      effectData: Te({ table: t, form: l })
    })
  }));
  const g = V(l, () => {
    n(i), c && V(i, n), g();
  });
  return { formNode: () => _(ge.Form, {
    option: {
      ...d,
      ignoreRules: !0,
      dataSource: i,
      subItems: v
    },
    ref: l,
    onSubmit: p.search,
    onReset: p.search
  }), formRef: l, ...p, dataSource: i };
}
function xb(e) {
  return !e || !e.getBoundingClientRect ? 0 : e.getBoundingClientRect();
}
function mo(e) {
  const t = document.documentElement, n = t.scrollLeft, r = t.scrollTop, o = t.clientLeft, a = t.clientTop, s = window.pageXOffset, l = window.pageYOffset, i = xb(e), { left: u, top: c, width: b, height: d } = i, y = (s || n) - (o || 0), v = (l || r) - (a || 0), p = u + s, f = c + l, g = p - y, m = f - v, h = window.document.documentElement.clientWidth, C = window.document.documentElement.clientHeight;
  return {
    left: g,
    top: m,
    right: h - b - g,
    bottom: C - d - m,
    rightIncludeBody: h - g,
    bottomIncludeBody: C - m
  };
}
function $b(e, t, n, r) {
  const o = Jv(), a = (y, v) => v ? y.querySelector(v) : null, s = Ra(c, 100), l = R({});
  let i = !1;
  const u = () => {
    var y;
    i = !0, r ? window.addEventListener("resize", s, {
      signal: r.signal
    }) : document.addEventListener("redoHeight", s), l.value = (y = e.attrs) == null ? void 0 : y.scroll, V(
      () => {
        var p;
        return [n.value, (p = B(t)) == null ? void 0 : p.length];
      },
      () => {
        s();
      },
      { flush: "post" }
    );
    const v = V(
      n,
      (p) => {
        p && (p.style.overflow = "hidden", new ResizeObserver(() => {
          s();
        }).observe(p), v());
      },
      { immediate: !0, flush: "post" }
    );
  };
  ln(() => {
    i && document.removeEventListener("redoHeight", s);
  });
  function c() {
    i && je(() => {
      d();
    });
  }
  function b(y) {
    l.value = {
      y,
      x: "100%"
      // scrollToFirstRowOnChange: true,
    };
  }
  async function d() {
    var y;
    const { maxHeight: v, inheritHeight: p, isFixedHeight: f, resizeHeightOffset: g } = e, m = B(n);
    if (!m)
      return;
    const h = a(m, o.table);
    if (!h)
      return;
    await je();
    const C = getComputedStyle(m.parentElement), T = mo(h), A = mo(m), w = T.left - A.left, S = (parseInt(C.marginBottom) || 0) + (parseInt(C.paddingBottom) || 0);
    let O = 0;
    m && p ? O = A.bottomIncludeBody - A.bottom - (T.top - A.top) : O = T.bottomIncludeBody - S;
    const I = a(h, o.title), D = (I == null ? void 0 : I.parentElement) === h ? I.offsetHeight ?? 0 : 0, P = a(h, o.header);
    if (!P)
      return;
    let M = 0;
    P && (M = P.offsetHeight);
    let H = 0;
    const N = a(h, o.footer);
    N && N.parentElement === h && (H += N.offsetHeight || 0);
    let q = 0;
    const G = a(m, o.pagination);
    G && (q = G.offsetHeight + 16);
    let Z = Math.ceil(O) - (g || 0) - w - q;
    const ue = v || Z - H - D - M - 1;
    if (v && f && (Z = v + H + D + M + 1), f) {
      h.style.height = `${Z}px`, h.style["overflow-y"] = "hidden", p || (m.style.height = "unset");
      const E = a(m, o.wrapper);
      if (E && (E.style.height = "", E.style["overflow-y"] = ""), !(((y = B(t)) == null ? void 0 : y.length) > 0)) {
        if (a(h, o.empty)) {
          const ne = a(h, o.emptyCell);
          ne && (ne.style.height = `${ue}px`);
        }
        return;
      }
    }
    if (h.scrollHeight > Z)
      b(ue);
    else {
      const E = a(h, o.body);
      E && b(E.scrollHeight <= ue ? null : ue);
    }
  }
  return { getScrollRef: l, redoHeight: c, debounceRedoHeight: s, listenResize: u };
}
const Ib = W({
  name: "SuperTable",
  inheritAttrs: !1,
  props: {
    dataSource: Array,
    schema: Object
  },
  emits: ["register", "load", "update:dataSource"],
  setup(e, t) {
    const { style: n, class: r, ...o } = t.attrs, a = Dt({ attrs: o }), s = R([]), l = R(), i = (E) => {
      s.value = E, t.emit("update:dataSource", E), Je(a.dataSource) && (a.dataSource.value = E);
    };
    He(() => e.dataSource && i(e.dataSource)), He(() => a.dataSource && i(B(a.dataSource)));
    const u = R(), c = (E) => {
      re.schemaDiagnostics && Bt(E, "table", "SuperTable");
      const { isScanHeight: K, inheritHeight: ne, isFixedHeight: pe, isContainer: ve, ...me } = te(
        J.Table,
        { ...E.attrs },
        { ...a.attrs }
      );
      Object.assign(a, { isScanHeight: K, inheritHeight: ne, isFixedHeight: pe, isContainer: ve }, E, { attrs: me });
    };
    He(() => e.schema && c(Y(e.schema)));
    const {
      loading: b,
      pagination: d,
      setPageData: y,
      onLoaded: v,
      goPage: p,
      reload: f,
      query: g,
      throttleRequest: m,
      cancelQuery: h,
      setQueryParams: C,
      getQueryParams: T
    } = Ob(a, i), { getScrollRef: A, redoHeight: w, listenResize: S } = $b(a, s, l), O = Pt(), I = {
      setOption: c,
      setData: (E) => {
        E && i(E);
      },
      redoHeight: w,
      goPage: p,
      reload: f,
      query: g,
      onLoaded: v,
      resetSearchForm(E) {
        try {
          return u.value.formRef.resetFields(E);
        } catch (K) {
          console.warn(K);
        }
      },
      setPageData: y,
      getQueryParams: T,
      getData: () => s.value,
      dataRef: s,
      searchForm: k(() => {
        var E;
        return (E = u.value) == null ? void 0 : E.formRef;
      }),
      validate: async () => {
        var E;
        return (E = O.value) == null ? void 0 : E.validate();
      },
      setColumns: (E) => {
        var K;
        !G && !((K = a.columns) != null && K.length) ? Object.assign(a, { columns: E }) : (Object.assign(a, { columns: E }), ue(E));
      }
    }, D = R({ ...I }), P = (E) => {
      Object.assign(D.value, Fe(L(E)), I), t.emit("register", D.value);
    };
    t.emit("register", D.value), t.expose(D.value);
    const M = L({
      reload: f,
      onRegister: P,
      loading: b
    });
    ln(() => {
      h(), t.emit("register", null);
    }), qe("rootSlots", t.slots);
    const H = R({}), N = R(), q = L({ formData: s, current: s, queryParams: k(T) });
    let G = !1;
    const Z = V(
      a,
      (E) => {
        var K, ne;
        if (!((K = E == null ? void 0 : E.columns) != null && K.length))
          return;
        if (N.value) {
          Z();
          return;
        }
        const { columns: pe, maxHeight: ve, isScanHeight: me = !0, inheritHeight: be } = E, xe = L({
          refData: s,
          listData: mt(pe)
        });
        H.value = wt(a.slots, q, t.slots);
        const Ve = E.searchForm || E.searchSchema, {
          attrs: { onLoad: he, ...Re }
        } = Ae({ option: E, effectData: q });
        Object.assign(M, Re, { pagination: d }), v((ae) => {
          t.emit("load", ae), he == null || he(ae);
        }), Ve && (u.value = Tb(E, D, (ae) => {
          C(ae, "form"), G && m();
        }));
        const $e = E.tabs && E.tabs.field;
        if (E.tabs && $e) {
          const ae = (ne = E.tabs).activeKey ?? (ne.activeKey = R(E.tabs.defaultActiveKey)), x = {};
          V(
            ae,
            ($) => {
              $ !== void 0 && (vt(x, $e, $), C(x), G && m());
            },
            { immediate: !0 }
          );
        }
        if (V(
          R(E.params),
          (ae) => {
            C(ae, "dynamic"), G && m();
          },
          { deep: !0, immediate: !0 }
        ), je(() => {
          G = !0, a.immediate !== !1 && m();
        }), me || be || ve) {
          S(), M.scroll = A;
          const { onChange: ae, onExpandedRowsChange: x } = M;
          M.onChange = (...$) => {
            ae == null || ae(...$);
          }, M.onExpandedRowsChange = ($) => {
            x == null || x($), w();
          }, V(s, w);
        }
        const Ie = () => _(ge.Table, { option: a, effectData: q, model: xe, ...M }, H.value);
        a.editable ? N.value = () => rn({ model: s.value, ref: O }, { default: Ie }) : N.value = Ie;
      },
      {
        immediate: !0
      }
    ), ue = (E) => {
      const K = L({
        refData: s,
        listData: mt(E)
      }), ne = () => _(ge.Table, { option: a, effectData: q, model: K, key: Symbol(), ...M }, H.value);
      a.editable ? N.value = () => rn({ model: s.value, ref: O }, { default: ne }) : N.value = ne;
    };
    return () => N.value && _(
      mr,
      { name: "exaProvider", data: { data: s } },
      () => {
        var E, K;
        return !u.value || (E = a.searchForm) != null && E.teleport ? _(
          "div",
          te(
            {
              ref: l,
              class: [a.isContainer && "sup-container", "sup-table", "sup-form-section"]
            },
            {
              class: r,
              style: n
            }
          ),
          [
            ((K = a.searchForm) == null ? void 0 : K.teleport) && _(
              al,
              { to: a.searchForm.teleport },
              _("div", { class: "sup-form-section sup-table-search" }, _(u.value.formNode))
            ),
            N.value()
          ]
        ) : _(
          "div",
          te(
            { ref: l, class: [a.isContainer && "sup-container", "sup-table"] },
            { class: r, style: n }
          ),
          [
            _("div", { class: "sup-form-section sup-table-search" }, _(u.value.formNode)),
            _("div", { class: "sup-form-section section-last" }, _(N.value))
          ]
        );
      }
    );
  }
}), Hb = (e, t) => {
  const [n, r] = Ga(), o = Promise.resolve(typeof e == "function" ? e() : e), a = (l) => {
    if (l)
      n.value || (o.then(l.setOption), t && l.setData(t)), n.value = l;
    else if (l === null)
      n.value = void 0;
    else
      return (i, u) => _(Ib, { ...i, onRegister: a }, u == null ? void 0 : u.slots);
  }, s = async (l, i) => {
    const u = await r();
    if (l && l in u)
      return typeof u[l] == "function" ? u[l](i) : u[l];
  };
  return [
    a,
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
        return ce((l = n.value) == null ? void 0 : l.dataRef);
      },
      dataSource: k(() => {
        var l;
        return (l = n.value) == null ? void 0 : l.dataRef;
      }),
      /** 跳转到指定页 */
      goPage(l) {
        var i;
        (i = n.value) == null || i.goPage(l);
      },
      /** 设置表格列 */
      setColumns(l) {
        s("setColumns", l);
      },
      /** 刷新数据，不改动查询条件与当前页 */
      reload() {
        var l;
        return (l = n.value) == null ? void 0 : l.reload();
      },
      /** 手动执行条件查询，不覆盖搜索表单参数 */
      query(l) {
        var i;
        return (i = n.value) == null ? void 0 : i.query(l);
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
      selectedRowKeys: k(() => {
        var l;
        return (l = n.value) == null ? void 0 : l.selectedRowKeys;
      }),
      selectedRows: k(() => {
        var l;
        return (l = n.value) == null ? void 0 : l.selectedRows;
      }),
      /** 设置选中行 */
      setSelectedRows: (l) => {
        var i;
        return (i = n.value) == null ? void 0 : i.setSelectedRows(l);
      },
      expandedRowKeys: k(() => {
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
function qb(e) {
  return e;
}
const Pb = W({
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
    const r = (n = t.default) == null ? void 0 : n.call(t), { effectData: o, ...a } = e, s = r ? r.flatMap(({ children: l, props: i = {} }) => {
      const { roleName: u, onClick: c, confirmText: b, tooltip: d, disabledTooltip: y, icon: v, ...p } = bv(
        i,
        (f, g) => Ad(g)
      );
      return !c || !l ? [] : {
        label: l.default || l,
        icon: v,
        tooltip: d,
        disabledTooltip: y,
        roleName: u,
        onClick: c,
        confirmText: b,
        attrs: p
      };
    }) : e.actions;
    return () => _(De, { option: { ...a, actions: s }, effectData: o });
  }
});
function zb(e) {
  return [() => _(Pb, e)];
}
const Db = W({
  props: {
    dataSource: Object,
    schema: Object
  },
  emits: ["register"],
  setup(e, t) {
    var n;
    const r = Pt(e.schema || {});
    re.schemaDiagnostics && e.schema && Bt(e.schema, "detail", "SuperDetail");
    const o = R(((n = e.schema) == null ? void 0 : n.dataSource) || {});
    V(
      () => e.dataSource,
      (l) => {
        l && (o.value = l);
      },
      { immediate: !0 }
    );
    const a = {
      setOption: (l) => {
        re.schemaDiagnostics && Bt(l, "detail", "SuperDetail"), r.value = l, l.dataSource && (o.value = l.dataSource);
      },
      setData: (l) => {
        o.value = l;
      }
    }, s = R();
    return V(
      r,
      (l) => {
        if (!(l != null && l.subItems))
          return;
        const i = mt(l.subItems, o);
        s.value = i.modelsMap;
      },
      { immediate: !0 }
    ), t.expose(a), t.emit("register", a), qe("exaProvider", Po({ data: o })), qe("rootSlots", t.slots), () => s.value && _(
      "div",
      { class: ["sup-detail", r.value.isContainer && "sup-container"] },
      _(Ke, {
        option: {
          type: "Descriptions",
          ...r.value
        },
        ...r.value.attrs,
        ...r.value.descriptionsProps,
        modelsMap: s.value,
        isRoot: !0
      })
    );
  }
});
function Gb(e, t) {
  const n = ie(t), r = R(), o = Promise.resolve(typeof e == "function" ? e() : e), a = (s) => {
    if (s)
      r.value || (o.then(s.setOption), n.value && V(
        n,
        (l) => {
          s.setData(l);
        },
        { immediate: !0 }
      )), r.value = s;
    else
      return (l) => _(Db, { ...l, onRegister: a }, sl());
  };
  return [
    a,
    {
      setData(s) {
        r.value ? r.value.setData(s) : n.value = s;
      }
    }
  ];
}
function Kb(e) {
  return e;
}
const Rb = mb(
  "superform-antdv",
  (e) => os({ components: e })
), Yb = Rb, Wb = {
  Input: Ts,
  TextArea: xs,
  InputNumber: $s,
  InputOTP: Is,
  InputPassword: Ps,
  InputSearch: Ds,
  AutoComplete: Rs,
  Cascader: Ms,
  ColorPicker: Es,
  Select: Fs,
  Radio: js,
  RadioGroup: Ls,
  Checkbox: Us,
  CheckboxGroup: Ns,
  DatePicker: ks,
  DateRangePicker: Bs,
  DateMonthPicker: Vs,
  DateQuarterPicker: Hs,
  DateWeekPicker: qs,
  DateYearPicker: zs,
  TimePicker: Gs,
  TimeRangePicker: Ks,
  TreeSelect: Ys,
  Switch: Ws,
  Rate: Zs,
  Mentions: Qs,
  Segmented: Js,
  Slider: Xs,
  Transfer: el
};
export {
  Pb as SuperButtons,
  Db as SuperDetail,
  Dm as SuperForm,
  Ib as SuperTable,
  Bb as antdvAdapter,
  Ub as antdvCapabilities,
  kb as antdvDefaults,
  Nb as antdvFields,
  fb as configure,
  os as createAntdvAdapter,
  ns as createAntdvCapabilities,
  rs as createAntdvFields,
  Ka as createModal,
  Yb as default,
  Kb as defineDetail,
  Vb as defineForm,
  qb as defineTable,
  Fb as defineUIAdapter,
  mm as diagnoseSchema,
  Wb as fieldComponents,
  Lb as registerAutoImportedComponents,
  pb as registerComponent,
  vb as registerComponents,
  Zt as renderAntdvIcon,
  db as useAdapter,
  zb as useButtons,
  Gb as useDetail,
  Rm as useForm,
  Ya as useModal,
  jb as useModalForm,
  Hb as useTable
};
