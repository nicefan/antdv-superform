import { requireDayjs_min as es, commonjsGlobal as ts, Row as ua, Col as ca, Tabs as da, collapse_default as ns, InternalTable as rs, card_default as fa, TabPane as as, Divider as os, Dropdown as pa, button_default as Wt, Menu as va, MenuItem as ma, Space as ba, InternalTooltip as ga, Upload as ha, form_default as ss, InternalFormItem as ls, SpaceCompact as is, Tag as us, CheckableTag as cs, Empty as ds, useConfig as fs, ConfigProvider as ps, Modal as An, Image as lr, staticMethods as vs, CompoundedInput as ms, InternalTextArea as bs, InputNumber as gs, InputOTP as hs, InputPassword as ys, InputSearch as ws, AutoComplete as _s, Cascader as Ss, color_picker_default as Cs, Select as xs, radio_default as As, RadioGroup as Os, checkbox_default as Ts, CheckboxGroup as $s, DatePicker as Is, DateRangePicker as Ms, DateMonthPicker as Ps, DateQuarterPicker as Ds, DateWeekPicker as Rs, DateYearPicker as Es, TimePicker as js, TimeRangePicker as Fs, TreeSelect as Ls, Switch as ks, Rate as Ns, Mentions as Us, Segmented as Bs, Slider as Vs, InternalTransfer as qs } from "./antd.js";
import { defineComponent as Z, reactive as k, provide as Ze, h as x, toRef as oe, inject as we, mergeProps as X, unref as Y, toRefs as Qe, toRaw as ee, computed as L, watch as z, shallowRef as Be, ref as j, shallowReactive as Zt, onMounted as ya, toValue as ie, getCurrentInstance as wa, onUnmounted as Nn, isRef as rt, onScopeDispose as zs, markRaw as Hs, watchEffect as Ye, openBlock as Le, createBlock as vt, resolveDynamicComponent as Tt, readonly as _a, onBeforeUnmount as Sa, nextTick as Ve, createVNode as Ca, render as On, createElementBlock as Qt, Fragment as Tn, renderList as xa, toDisplayString as Gs, Teleport as Ks, useSlots as Ys } from "vue";
var Ws = { exports: {} };
(function(e, t) {
  (function(n, r) {
    e.exports = r(es());
  })(ts, function(n) {
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
})(Ws);
var Zs = typeof global == "object" && global && global.Object === Object && global;
const Aa = Zs;
var Qs = typeof self == "object" && self && self.Object === Object && self, Js = Aa || Qs || Function("return this")();
const De = Js;
var Xs = De.Symbol;
const Ce = Xs;
var Oa = Object.prototype, el = Oa.hasOwnProperty, tl = Oa.toString, At = Ce ? Ce.toStringTag : void 0;
function nl(e) {
  var t = el.call(e, At), n = e[At];
  try {
    e[At] = void 0;
    var r = !0;
  } catch {
  }
  var o = tl.call(e);
  return r && (t ? e[At] = n : delete e[At]), o;
}
var rl = Object.prototype, al = rl.toString;
function ol(e) {
  return al.call(e);
}
var sl = "[object Null]", ll = "[object Undefined]", ir = Ce ? Ce.toStringTag : void 0;
function et(e) {
  return e == null ? e === void 0 ? ll : sl : ir && ir in Object(e) ? nl(e) : ol(e);
}
function Ie(e) {
  return e != null && typeof e == "object";
}
var il = "[object Symbol]";
function nn(e) {
  return typeof e == "symbol" || Ie(e) && et(e) == il;
}
function Ta(e, t) {
  for (var n = -1, r = e == null ? 0 : e.length, o = Array(r); ++n < r; )
    o[n] = t(e[n], n, e);
  return o;
}
var ul = Array.isArray;
const me = ul;
var cl = 1 / 0, ur = Ce ? Ce.prototype : void 0, cr = ur ? ur.toString : void 0;
function $a(e) {
  if (typeof e == "string")
    return e;
  if (me(e))
    return Ta(e, $a) + "";
  if (nn(e))
    return cr ? cr.call(e) : "";
  var t = e + "";
  return t == "0" && 1 / e == -cl ? "-0" : t;
}
var dl = /\s/;
function fl(e) {
  for (var t = e.length; t-- && dl.test(e.charAt(t)); )
    ;
  return t;
}
var pl = /^\s+/;
function vl(e) {
  return e && e.slice(0, fl(e) + 1).replace(pl, "");
}
function pe(e) {
  var t = typeof e;
  return e != null && (t == "object" || t == "function");
}
var dr = 0 / 0, ml = /^[-+]0x[0-9a-f]+$/i, bl = /^0b[01]+$/i, gl = /^0o[0-7]+$/i, hl = parseInt;
function fr(e) {
  if (typeof e == "number")
    return e;
  if (nn(e))
    return dr;
  if (pe(e)) {
    var t = typeof e.valueOf == "function" ? e.valueOf() : e;
    e = pe(t) ? t + "" : t;
  }
  if (typeof e != "string")
    return e === 0 ? e : +e;
  e = vl(e);
  var n = bl.test(e);
  return n || gl.test(e) ? hl(e.slice(2), n ? 2 : 8) : ml.test(e) ? dr : +e;
}
function rn(e) {
  return e;
}
var yl = "[object AsyncFunction]", wl = "[object Function]", _l = "[object GeneratorFunction]", Sl = "[object Proxy]";
function ze(e) {
  if (!pe(e))
    return !1;
  var t = et(e);
  return t == wl || t == _l || t == yl || t == Sl;
}
var Cl = De["__core-js_shared__"];
const hn = Cl;
var pr = function() {
  var e = /[^.]+$/.exec(hn && hn.keys && hn.keys.IE_PROTO || "");
  return e ? "Symbol(src)_1." + e : "";
}();
function xl(e) {
  return !!pr && pr in e;
}
var Al = Function.prototype, Ol = Al.toString;
function it(e) {
  if (e != null) {
    try {
      return Ol.call(e);
    } catch {
    }
    try {
      return e + "";
    } catch {
    }
  }
  return "";
}
var Tl = /[\\^$.*+?()[\]{}|]/g, $l = /^\[object .+?Constructor\]$/, Il = Function.prototype, Ml = Object.prototype, Pl = Il.toString, Dl = Ml.hasOwnProperty, Rl = RegExp(
  "^" + Pl.call(Dl).replace(Tl, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
);
function El(e) {
  if (!pe(e) || xl(e))
    return !1;
  var t = ze(e) ? Rl : $l;
  return t.test(it(e));
}
function jl(e, t) {
  return e == null ? void 0 : e[t];
}
function ut(e, t) {
  var n = jl(e, t);
  return El(n) ? n : void 0;
}
var Fl = ut(De, "WeakMap");
const $n = Fl;
var vr = Object.create, Ll = function() {
  function e() {
  }
  return function(t) {
    if (!pe(t))
      return {};
    if (vr)
      return vr(t);
    e.prototype = t;
    var n = new e();
    return e.prototype = void 0, n;
  };
}();
const kl = Ll;
function Nl(e, t, n) {
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
function Ul() {
}
function Ia(e, t) {
  var n = -1, r = e.length;
  for (t || (t = Array(r)); ++n < r; )
    t[n] = e[n];
  return t;
}
var Bl = 800, Vl = 16, ql = Date.now;
function zl(e) {
  var t = 0, n = 0;
  return function() {
    var r = ql(), o = Vl - (r - n);
    if (n = r, o > 0) {
      if (++t >= Bl)
        return arguments[0];
    } else
      t = 0;
    return e.apply(void 0, arguments);
  };
}
function Hl(e) {
  return function() {
    return e;
  };
}
var Gl = function() {
  try {
    var e = ut(Object, "defineProperty");
    return e({}, "", {}), e;
  } catch {
  }
}();
const Jt = Gl;
var Kl = Jt ? function(e, t) {
  return Jt(e, "toString", {
    configurable: !0,
    enumerable: !1,
    value: Hl(t),
    writable: !0
  });
} : rn;
const Yl = Kl;
var Wl = zl(Yl);
const Ma = Wl;
function Zl(e, t) {
  for (var n = -1, r = e == null ? 0 : e.length; ++n < r && t(e[n], n, e) !== !1; )
    ;
  return e;
}
function Ql(e, t, n, r) {
  for (var o = e.length, a = n + (r ? 1 : -1); r ? a-- : ++a < o; )
    if (t(e[a], a, e))
      return a;
  return -1;
}
function Jl(e) {
  return e !== e;
}
function Xl(e, t, n) {
  for (var r = n - 1, o = e.length; ++r < o; )
    if (e[r] === t)
      return r;
  return -1;
}
function ei(e, t, n) {
  return t === t ? Xl(e, t, n) : Ql(e, Jl, n);
}
function ti(e, t) {
  var n = e == null ? 0 : e.length;
  return !!n && ei(e, t, 0) > -1;
}
var ni = 9007199254740991, ri = /^(?:0|[1-9]\d*)$/;
function an(e, t) {
  var n = typeof e;
  return t = t ?? ni, !!t && (n == "number" || n != "symbol" && ri.test(e)) && e > -1 && e % 1 == 0 && e < t;
}
function on(e, t, n) {
  t == "__proto__" && Jt ? Jt(e, t, {
    configurable: !0,
    enumerable: !0,
    value: n,
    writable: !0
  }) : e[t] = n;
}
function wt(e, t) {
  return e === t || e !== e && t !== t;
}
var ai = Object.prototype, oi = ai.hasOwnProperty;
function Un(e, t, n) {
  var r = e[t];
  (!(oi.call(e, t) && wt(r, n)) || n === void 0 && !(t in e)) && on(e, t, n);
}
function _t(e, t, n, r) {
  var o = !n;
  n || (n = {});
  for (var a = -1, s = t.length; ++a < s; ) {
    var l = t[a], i = r ? r(n[l], e[l], l, n, e) : void 0;
    i === void 0 && (i = e[l]), o ? on(n, l, i) : Un(n, l, i);
  }
  return n;
}
var mr = Math.max;
function Pa(e, t, n) {
  return t = mr(t === void 0 ? e.length - 1 : t, 0), function() {
    for (var r = arguments, o = -1, a = mr(r.length - t, 0), s = Array(a); ++o < a; )
      s[o] = r[t + o];
    o = -1;
    for (var l = Array(t + 1); ++o < t; )
      l[o] = r[o];
    return l[t] = n(s), Nl(e, this, l);
  };
}
function Da(e, t) {
  return Ma(Pa(e, t, rn), e + "");
}
var si = 9007199254740991;
function Bn(e) {
  return typeof e == "number" && e > -1 && e % 1 == 0 && e <= si;
}
function sn(e) {
  return e != null && Bn(e.length) && !ze(e);
}
function Ra(e, t, n) {
  if (!pe(n))
    return !1;
  var r = typeof t;
  return (r == "number" ? sn(n) && an(t, n.length) : r == "string" && t in n) ? wt(n[t], e) : !1;
}
function Ea(e) {
  return Da(function(t, n) {
    var r = -1, o = n.length, a = o > 1 ? n[o - 1] : void 0, s = o > 2 ? n[2] : void 0;
    for (a = e.length > 3 && typeof a == "function" ? (o--, a) : void 0, s && Ra(n[0], n[1], s) && (a = o < 3 ? void 0 : a, o = 1), t = Object(t); ++r < o; ) {
      var l = n[r];
      l && e(t, l, r, a);
    }
    return t;
  });
}
var li = Object.prototype;
function Vn(e) {
  var t = e && e.constructor, n = typeof t == "function" && t.prototype || li;
  return e === n;
}
function ii(e, t) {
  for (var n = -1, r = Array(e); ++n < e; )
    r[n] = t(n);
  return r;
}
var ui = "[object Arguments]";
function br(e) {
  return Ie(e) && et(e) == ui;
}
var ja = Object.prototype, ci = ja.hasOwnProperty, di = ja.propertyIsEnumerable, fi = br(function() {
  return arguments;
}()) ? br : function(e) {
  return Ie(e) && ci.call(e, "callee") && !di.call(e, "callee");
};
const Dt = fi;
function pi() {
  return !1;
}
var Fa = typeof exports == "object" && exports && !exports.nodeType && exports, gr = Fa && typeof module == "object" && module && !module.nodeType && module, vi = gr && gr.exports === Fa, hr = vi ? De.Buffer : void 0, mi = hr ? hr.isBuffer : void 0, bi = mi || pi;
const Rt = bi;
var gi = "[object Arguments]", hi = "[object Array]", yi = "[object Boolean]", wi = "[object Date]", _i = "[object Error]", Si = "[object Function]", Ci = "[object Map]", xi = "[object Number]", Ai = "[object Object]", Oi = "[object RegExp]", Ti = "[object Set]", $i = "[object String]", Ii = "[object WeakMap]", Mi = "[object ArrayBuffer]", Pi = "[object DataView]", Di = "[object Float32Array]", Ri = "[object Float64Array]", Ei = "[object Int8Array]", ji = "[object Int16Array]", Fi = "[object Int32Array]", Li = "[object Uint8Array]", ki = "[object Uint8ClampedArray]", Ni = "[object Uint16Array]", Ui = "[object Uint32Array]", te = {};
te[Di] = te[Ri] = te[Ei] = te[ji] = te[Fi] = te[Li] = te[ki] = te[Ni] = te[Ui] = !0;
te[gi] = te[hi] = te[Mi] = te[yi] = te[Pi] = te[wi] = te[_i] = te[Si] = te[Ci] = te[xi] = te[Ai] = te[Oi] = te[Ti] = te[$i] = te[Ii] = !1;
function Bi(e) {
  return Ie(e) && Bn(e.length) && !!te[et(e)];
}
function qn(e) {
  return function(t) {
    return e(t);
  };
}
var La = typeof exports == "object" && exports && !exports.nodeType && exports, $t = La && typeof module == "object" && module && !module.nodeType && module, Vi = $t && $t.exports === La, yn = Vi && Aa.process, qi = function() {
  try {
    var e = $t && $t.require && $t.require("util").types;
    return e || yn && yn.binding && yn.binding("util");
  } catch {
  }
}();
const gt = qi;
var yr = gt && gt.isTypedArray, zi = yr ? qn(yr) : Bi;
const zn = zi;
var Hi = Object.prototype, Gi = Hi.hasOwnProperty;
function ka(e, t) {
  var n = me(e), r = !n && Dt(e), o = !n && !r && Rt(e), a = !n && !r && !o && zn(e), s = n || r || o || a, l = s ? ii(e.length, String) : [], i = l.length;
  for (var f in e)
    (t || Gi.call(e, f)) && !(s && // Safari 9 has enumerable `arguments.length` in strict mode.
    (f == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
    o && (f == "offset" || f == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
    a && (f == "buffer" || f == "byteLength" || f == "byteOffset") || // Skip index properties.
    an(f, i))) && l.push(f);
  return l;
}
function Na(e, t) {
  return function(n) {
    return e(t(n));
  };
}
var Ki = Na(Object.keys, Object);
const Yi = Ki;
var Wi = Object.prototype, Zi = Wi.hasOwnProperty;
function Qi(e) {
  if (!Vn(e))
    return Yi(e);
  var t = [];
  for (var n in Object(e))
    Zi.call(e, n) && n != "constructor" && t.push(n);
  return t;
}
function Vt(e) {
  return sn(e) ? ka(e) : Qi(e);
}
function Ji(e) {
  var t = [];
  if (e != null)
    for (var n in Object(e))
      t.push(n);
  return t;
}
var Xi = Object.prototype, eu = Xi.hasOwnProperty;
function tu(e) {
  if (!pe(e))
    return Ji(e);
  var t = Vn(e), n = [];
  for (var r in e)
    r == "constructor" && (t || !eu.call(e, r)) || n.push(r);
  return n;
}
function St(e) {
  return sn(e) ? ka(e, !0) : tu(e);
}
var nu = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, ru = /^\w*$/;
function Hn(e, t) {
  if (me(e))
    return !1;
  var n = typeof e;
  return n == "number" || n == "symbol" || n == "boolean" || e == null || nn(e) ? !0 : ru.test(e) || !nu.test(e) || t != null && e in Object(t);
}
var au = ut(Object, "create");
const Et = au;
function ou() {
  this.__data__ = Et ? Et(null) : {}, this.size = 0;
}
function su(e) {
  var t = this.has(e) && delete this.__data__[e];
  return this.size -= t ? 1 : 0, t;
}
var lu = "__lodash_hash_undefined__", iu = Object.prototype, uu = iu.hasOwnProperty;
function cu(e) {
  var t = this.__data__;
  if (Et) {
    var n = t[e];
    return n === lu ? void 0 : n;
  }
  return uu.call(t, e) ? t[e] : void 0;
}
var du = Object.prototype, fu = du.hasOwnProperty;
function pu(e) {
  var t = this.__data__;
  return Et ? t[e] !== void 0 : fu.call(t, e);
}
var vu = "__lodash_hash_undefined__";
function mu(e, t) {
  var n = this.__data__;
  return this.size += this.has(e) ? 0 : 1, n[e] = Et && t === void 0 ? vu : t, this;
}
function at(e) {
  var t = -1, n = e == null ? 0 : e.length;
  for (this.clear(); ++t < n; ) {
    var r = e[t];
    this.set(r[0], r[1]);
  }
}
at.prototype.clear = ou;
at.prototype.delete = su;
at.prototype.get = cu;
at.prototype.has = pu;
at.prototype.set = mu;
function bu() {
  this.__data__ = [], this.size = 0;
}
function ln(e, t) {
  for (var n = e.length; n--; )
    if (wt(e[n][0], t))
      return n;
  return -1;
}
var gu = Array.prototype, hu = gu.splice;
function yu(e) {
  var t = this.__data__, n = ln(t, e);
  if (n < 0)
    return !1;
  var r = t.length - 1;
  return n == r ? t.pop() : hu.call(t, n, 1), --this.size, !0;
}
function wu(e) {
  var t = this.__data__, n = ln(t, e);
  return n < 0 ? void 0 : t[n][1];
}
function _u(e) {
  return ln(this.__data__, e) > -1;
}
function Su(e, t) {
  var n = this.__data__, r = ln(n, e);
  return r < 0 ? (++this.size, n.push([e, t])) : n[r][1] = t, this;
}
function He(e) {
  var t = -1, n = e == null ? 0 : e.length;
  for (this.clear(); ++t < n; ) {
    var r = e[t];
    this.set(r[0], r[1]);
  }
}
He.prototype.clear = bu;
He.prototype.delete = yu;
He.prototype.get = wu;
He.prototype.has = _u;
He.prototype.set = Su;
var Cu = ut(De, "Map");
const jt = Cu;
function xu() {
  this.size = 0, this.__data__ = {
    hash: new at(),
    map: new (jt || He)(),
    string: new at()
  };
}
function Au(e) {
  var t = typeof e;
  return t == "string" || t == "number" || t == "symbol" || t == "boolean" ? e !== "__proto__" : e === null;
}
function un(e, t) {
  var n = e.__data__;
  return Au(t) ? n[typeof t == "string" ? "string" : "hash"] : n.map;
}
function Ou(e) {
  var t = un(this, e).delete(e);
  return this.size -= t ? 1 : 0, t;
}
function Tu(e) {
  return un(this, e).get(e);
}
function $u(e) {
  return un(this, e).has(e);
}
function Iu(e, t) {
  var n = un(this, e), r = n.size;
  return n.set(e, t), this.size += n.size == r ? 0 : 1, this;
}
function Ge(e) {
  var t = -1, n = e == null ? 0 : e.length;
  for (this.clear(); ++t < n; ) {
    var r = e[t];
    this.set(r[0], r[1]);
  }
}
Ge.prototype.clear = xu;
Ge.prototype.delete = Ou;
Ge.prototype.get = Tu;
Ge.prototype.has = $u;
Ge.prototype.set = Iu;
var Mu = "Expected a function";
function Gn(e, t) {
  if (typeof e != "function" || t != null && typeof t != "function")
    throw new TypeError(Mu);
  var n = function() {
    var r = arguments, o = t ? t.apply(this, r) : r[0], a = n.cache;
    if (a.has(o))
      return a.get(o);
    var s = e.apply(this, r);
    return n.cache = a.set(o, s) || a, s;
  };
  return n.cache = new (Gn.Cache || Ge)(), n;
}
Gn.Cache = Ge;
var Pu = 500;
function Du(e) {
  var t = Gn(e, function(r) {
    return n.size === Pu && n.clear(), r;
  }), n = t.cache;
  return t;
}
var Ru = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, Eu = /\\(\\)?/g, ju = Du(function(e) {
  var t = [];
  return e.charCodeAt(0) === 46 && t.push(""), e.replace(Ru, function(n, r, o, a) {
    t.push(o ? a.replace(Eu, "$1") : r || n);
  }), t;
});
const Fu = ju;
function qt(e) {
  return e == null ? "" : $a(e);
}
function zt(e, t) {
  return me(e) ? e : Hn(e, t) ? [e] : Fu(qt(e));
}
var Lu = 1 / 0;
function ot(e) {
  if (typeof e == "string" || nn(e))
    return e;
  var t = e + "";
  return t == "0" && 1 / e == -Lu ? "-0" : t;
}
function cn(e, t) {
  t = zt(t, e);
  for (var n = 0, r = t.length; e != null && n < r; )
    e = e[ot(t[n++])];
  return n && n == r ? e : void 0;
}
function Me(e, t, n) {
  var r = e == null ? void 0 : cn(e, t);
  return r === void 0 ? n : r;
}
function Kn(e, t) {
  for (var n = -1, r = t.length, o = e.length; ++n < r; )
    e[o + n] = t[n];
  return e;
}
var wr = Ce ? Ce.isConcatSpreadable : void 0;
function ku(e) {
  return me(e) || Dt(e) || !!(wr && e && e[wr]);
}
function Ua(e, t, n, r, o) {
  var a = -1, s = e.length;
  for (n || (n = ku), o || (o = []); ++a < s; ) {
    var l = e[a];
    t > 0 && n(l) ? t > 1 ? Ua(l, t - 1, n, r, o) : Kn(o, l) : r || (o[o.length] = l);
  }
  return o;
}
function Nu(e) {
  var t = e == null ? 0 : e.length;
  return t ? Ua(e, 1) : [];
}
function Uu(e) {
  return Ma(Pa(e, void 0, Nu), e + "");
}
var Bu = Na(Object.getPrototypeOf, Object);
const Yn = Bu;
var Vu = "[object Object]", qu = Function.prototype, zu = Object.prototype, Ba = qu.toString, Hu = zu.hasOwnProperty, Gu = Ba.call(Object);
function Te(e) {
  if (!Ie(e) || et(e) != Vu)
    return !1;
  var t = Yn(e);
  if (t === null)
    return !0;
  var n = Hu.call(t, "constructor") && t.constructor;
  return typeof n == "function" && n instanceof n && Ba.call(n) == Gu;
}
function Va(e, t, n) {
  var r = -1, o = e.length;
  t < 0 && (t = -t > o ? 0 : o + t), n = n > o ? o : n, n < 0 && (n += o), o = t > n ? 0 : n - t >>> 0, t >>>= 0;
  for (var a = Array(o); ++r < o; )
    a[r] = e[r + t];
  return a;
}
function Ku(e, t, n) {
  var r = e.length;
  return n = n === void 0 ? r : n, !t && n >= r ? e : Va(e, t, n);
}
var Yu = "\\ud800-\\udfff", Wu = "\\u0300-\\u036f", Zu = "\\ufe20-\\ufe2f", Qu = "\\u20d0-\\u20ff", Ju = Wu + Zu + Qu, Xu = "\\ufe0e\\ufe0f", ec = "\\u200d", tc = RegExp("[" + ec + Yu + Ju + Xu + "]");
function qa(e) {
  return tc.test(e);
}
function nc(e) {
  return e.split("");
}
var za = "\\ud800-\\udfff", rc = "\\u0300-\\u036f", ac = "\\ufe20-\\ufe2f", oc = "\\u20d0-\\u20ff", sc = rc + ac + oc, lc = "\\ufe0e\\ufe0f", ic = "[" + za + "]", In = "[" + sc + "]", Mn = "\\ud83c[\\udffb-\\udfff]", uc = "(?:" + In + "|" + Mn + ")", Ha = "[^" + za + "]", Ga = "(?:\\ud83c[\\udde6-\\uddff]){2}", Ka = "[\\ud800-\\udbff][\\udc00-\\udfff]", cc = "\\u200d", Ya = uc + "?", Wa = "[" + lc + "]?", dc = "(?:" + cc + "(?:" + [Ha, Ga, Ka].join("|") + ")" + Wa + Ya + ")*", fc = Wa + Ya + dc, pc = "(?:" + [Ha + In + "?", In, Ga, Ka, ic].join("|") + ")", vc = RegExp(Mn + "(?=" + Mn + ")|" + pc + fc, "g");
function mc(e) {
  return e.match(vc) || [];
}
function bc(e) {
  return qa(e) ? mc(e) : nc(e);
}
function gc(e) {
  return function(t) {
    t = qt(t);
    var n = qa(t) ? bc(t) : void 0, r = n ? n[0] : t.charAt(0), o = n ? Ku(n, 1).join("") : t.slice(1);
    return r[e]() + o;
  };
}
var hc = gc("toUpperCase");
const yc = hc;
function wc(e) {
  return yc(qt(e).toLowerCase());
}
function _c(e, t, n, r) {
  var o = -1, a = e == null ? 0 : e.length;
  for (r && a && (n = e[++o]); ++o < a; )
    n = t(n, e[o], o, e);
  return n;
}
function Sc(e) {
  return function(t) {
    return e == null ? void 0 : e[t];
  };
}
var Cc = {
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
}, xc = Sc(Cc);
const Ac = xc;
var Oc = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g, Tc = "\\u0300-\\u036f", $c = "\\ufe20-\\ufe2f", Ic = "\\u20d0-\\u20ff", Mc = Tc + $c + Ic, Pc = "[" + Mc + "]", Dc = RegExp(Pc, "g");
function Rc(e) {
  return e = qt(e), e && e.replace(Oc, Ac).replace(Dc, "");
}
var Ec = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g;
function jc(e) {
  return e.match(Ec) || [];
}
var Fc = /[a-z][A-Z]|[A-Z]{2}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/;
function Lc(e) {
  return Fc.test(e);
}
var Za = "\\ud800-\\udfff", kc = "\\u0300-\\u036f", Nc = "\\ufe20-\\ufe2f", Uc = "\\u20d0-\\u20ff", Bc = kc + Nc + Uc, Qa = "\\u2700-\\u27bf", Ja = "a-z\\xdf-\\xf6\\xf8-\\xff", Vc = "\\xac\\xb1\\xd7\\xf7", qc = "\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf", zc = "\\u2000-\\u206f", Hc = " \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000", Xa = "A-Z\\xc0-\\xd6\\xd8-\\xde", Gc = "\\ufe0e\\ufe0f", eo = Vc + qc + zc + Hc, to = "['’]", _r = "[" + eo + "]", Kc = "[" + Bc + "]", no = "\\d+", Yc = "[" + Qa + "]", ro = "[" + Ja + "]", ao = "[^" + Za + eo + no + Qa + Ja + Xa + "]", Wc = "\\ud83c[\\udffb-\\udfff]", Zc = "(?:" + Kc + "|" + Wc + ")", Qc = "[^" + Za + "]", oo = "(?:\\ud83c[\\udde6-\\uddff]){2}", so = "[\\ud800-\\udbff][\\udc00-\\udfff]", ct = "[" + Xa + "]", Jc = "\\u200d", Sr = "(?:" + ro + "|" + ao + ")", Xc = "(?:" + ct + "|" + ao + ")", Cr = "(?:" + to + "(?:d|ll|m|re|s|t|ve))?", xr = "(?:" + to + "(?:D|LL|M|RE|S|T|VE))?", lo = Zc + "?", io = "[" + Gc + "]?", ed = "(?:" + Jc + "(?:" + [Qc, oo, so].join("|") + ")" + io + lo + ")*", td = "\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])", nd = "\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])", rd = io + lo + ed, ad = "(?:" + [Yc, oo, so].join("|") + ")" + rd, od = RegExp([
  ct + "?" + ro + "+" + Cr + "(?=" + [_r, ct, "$"].join("|") + ")",
  Xc + "+" + xr + "(?=" + [_r, ct + Sr, "$"].join("|") + ")",
  ct + "?" + Sr + "+" + Cr,
  ct + "+" + xr,
  nd,
  td,
  no,
  ad
].join("|"), "g");
function sd(e) {
  return e.match(od) || [];
}
function ld(e, t, n) {
  return e = qt(e), t = n ? void 0 : t, t === void 0 ? Lc(e) ? sd(e) : jc(e) : e.match(t) || [];
}
var id = "['’]", ud = RegExp(id, "g");
function cd(e) {
  return function(t) {
    return _c(ld(Rc(t).replace(ud, "")), e, "");
  };
}
var dd = cd(function(e, t, n) {
  return t = t.toLowerCase(), e + (n ? wc(t) : t);
});
const fd = dd;
function pd() {
  this.__data__ = new He(), this.size = 0;
}
function vd(e) {
  var t = this.__data__, n = t.delete(e);
  return this.size = t.size, n;
}
function md(e) {
  return this.__data__.get(e);
}
function bd(e) {
  return this.__data__.has(e);
}
var gd = 200;
function hd(e, t) {
  var n = this.__data__;
  if (n instanceof He) {
    var r = n.__data__;
    if (!jt || r.length < gd - 1)
      return r.push([e, t]), this.size = ++n.size, this;
    n = this.__data__ = new Ge(r);
  }
  return n.set(e, t), this.size = n.size, this;
}
function $e(e) {
  var t = this.__data__ = new He(e);
  this.size = t.size;
}
$e.prototype.clear = pd;
$e.prototype.delete = vd;
$e.prototype.get = md;
$e.prototype.has = bd;
$e.prototype.set = hd;
function yd(e, t) {
  return e && _t(t, Vt(t), e);
}
function wd(e, t) {
  return e && _t(t, St(t), e);
}
var uo = typeof exports == "object" && exports && !exports.nodeType && exports, Ar = uo && typeof module == "object" && module && !module.nodeType && module, _d = Ar && Ar.exports === uo, Or = _d ? De.Buffer : void 0, Tr = Or ? Or.allocUnsafe : void 0;
function co(e, t) {
  if (t)
    return e.slice();
  var n = e.length, r = Tr ? Tr(n) : new e.constructor(n);
  return e.copy(r), r;
}
function Sd(e, t) {
  for (var n = -1, r = e == null ? 0 : e.length, o = 0, a = []; ++n < r; ) {
    var s = e[n];
    t(s, n, e) && (a[o++] = s);
  }
  return a;
}
function fo() {
  return [];
}
var Cd = Object.prototype, xd = Cd.propertyIsEnumerable, $r = Object.getOwnPropertySymbols, Ad = $r ? function(e) {
  return e == null ? [] : (e = Object(e), Sd($r(e), function(t) {
    return xd.call(e, t);
  }));
} : fo;
const Wn = Ad;
function Od(e, t) {
  return _t(e, Wn(e), t);
}
var Td = Object.getOwnPropertySymbols, $d = Td ? function(e) {
  for (var t = []; e; )
    Kn(t, Wn(e)), e = Yn(e);
  return t;
} : fo;
const po = $d;
function Id(e, t) {
  return _t(e, po(e), t);
}
function vo(e, t, n) {
  var r = t(e);
  return me(e) ? r : Kn(r, n(e));
}
function Pn(e) {
  return vo(e, Vt, Wn);
}
function mo(e) {
  return vo(e, St, po);
}
var Md = ut(De, "DataView");
const Dn = Md;
var Pd = ut(De, "Promise");
const Rn = Pd;
var Dd = ut(De, "Set");
const mt = Dd;
var Ir = "[object Map]", Rd = "[object Object]", Mr = "[object Promise]", Pr = "[object Set]", Dr = "[object WeakMap]", Rr = "[object DataView]", Ed = it(Dn), jd = it(jt), Fd = it(Rn), Ld = it(mt), kd = it($n), nt = et;
(Dn && nt(new Dn(new ArrayBuffer(1))) != Rr || jt && nt(new jt()) != Ir || Rn && nt(Rn.resolve()) != Mr || mt && nt(new mt()) != Pr || $n && nt(new $n()) != Dr) && (nt = function(e) {
  var t = et(e), n = t == Rd ? e.constructor : void 0, r = n ? it(n) : "";
  if (r)
    switch (r) {
      case Ed:
        return Rr;
      case jd:
        return Ir;
      case Fd:
        return Mr;
      case Ld:
        return Pr;
      case kd:
        return Dr;
    }
  return t;
});
const Ft = nt;
var Nd = Object.prototype, Ud = Nd.hasOwnProperty;
function Bd(e) {
  var t = e.length, n = new e.constructor(t);
  return t && typeof e[0] == "string" && Ud.call(e, "index") && (n.index = e.index, n.input = e.input), n;
}
var Vd = De.Uint8Array;
const Xt = Vd;
function Zn(e) {
  var t = new e.constructor(e.byteLength);
  return new Xt(t).set(new Xt(e)), t;
}
function qd(e, t) {
  var n = t ? Zn(e.buffer) : e.buffer;
  return new e.constructor(n, e.byteOffset, e.byteLength);
}
var zd = /\w*$/;
function Hd(e) {
  var t = new e.constructor(e.source, zd.exec(e));
  return t.lastIndex = e.lastIndex, t;
}
var Er = Ce ? Ce.prototype : void 0, jr = Er ? Er.valueOf : void 0;
function Gd(e) {
  return jr ? Object(jr.call(e)) : {};
}
function bo(e, t) {
  var n = t ? Zn(e.buffer) : e.buffer;
  return new e.constructor(n, e.byteOffset, e.length);
}
var Kd = "[object Boolean]", Yd = "[object Date]", Wd = "[object Map]", Zd = "[object Number]", Qd = "[object RegExp]", Jd = "[object Set]", Xd = "[object String]", ef = "[object Symbol]", tf = "[object ArrayBuffer]", nf = "[object DataView]", rf = "[object Float32Array]", af = "[object Float64Array]", of = "[object Int8Array]", sf = "[object Int16Array]", lf = "[object Int32Array]", uf = "[object Uint8Array]", cf = "[object Uint8ClampedArray]", df = "[object Uint16Array]", ff = "[object Uint32Array]";
function pf(e, t, n) {
  var r = e.constructor;
  switch (t) {
    case tf:
      return Zn(e);
    case Kd:
    case Yd:
      return new r(+e);
    case nf:
      return qd(e, n);
    case rf:
    case af:
    case of:
    case sf:
    case lf:
    case uf:
    case cf:
    case df:
    case ff:
      return bo(e, n);
    case Wd:
      return new r();
    case Zd:
    case Xd:
      return new r(e);
    case Qd:
      return Hd(e);
    case Jd:
      return new r();
    case ef:
      return Gd(e);
  }
}
function go(e) {
  return typeof e.constructor == "function" && !Vn(e) ? kl(Yn(e)) : {};
}
var vf = "[object Map]";
function mf(e) {
  return Ie(e) && Ft(e) == vf;
}
var Fr = gt && gt.isMap, bf = Fr ? qn(Fr) : mf;
const gf = bf;
var hf = "[object Set]";
function yf(e) {
  return Ie(e) && Ft(e) == hf;
}
var Lr = gt && gt.isSet, wf = Lr ? qn(Lr) : yf;
const _f = wf;
var Sf = 1, Cf = 2, xf = 4, ho = "[object Arguments]", Af = "[object Array]", Of = "[object Boolean]", Tf = "[object Date]", $f = "[object Error]", yo = "[object Function]", If = "[object GeneratorFunction]", Mf = "[object Map]", Pf = "[object Number]", wo = "[object Object]", Df = "[object RegExp]", Rf = "[object Set]", Ef = "[object String]", jf = "[object Symbol]", Ff = "[object WeakMap]", Lf = "[object ArrayBuffer]", kf = "[object DataView]", Nf = "[object Float32Array]", Uf = "[object Float64Array]", Bf = "[object Int8Array]", Vf = "[object Int16Array]", qf = "[object Int32Array]", zf = "[object Uint8Array]", Hf = "[object Uint8ClampedArray]", Gf = "[object Uint16Array]", Kf = "[object Uint32Array]", J = {};
J[ho] = J[Af] = J[Lf] = J[kf] = J[Of] = J[Tf] = J[Nf] = J[Uf] = J[Bf] = J[Vf] = J[qf] = J[Mf] = J[Pf] = J[wo] = J[Df] = J[Rf] = J[Ef] = J[jf] = J[zf] = J[Hf] = J[Gf] = J[Kf] = !0;
J[$f] = J[yo] = J[Ff] = !1;
function It(e, t, n, r, o, a) {
  var s, l = t & Sf, i = t & Cf, f = t & xf;
  if (n && (s = o ? n(e, r, o, a) : n(e)), s !== void 0)
    return s;
  if (!pe(e))
    return e;
  var u = me(e);
  if (u) {
    if (s = Bd(e), !l)
      return Ia(e, s);
  } else {
    var v = Ft(e), b = v == yo || v == If;
    if (Rt(e))
      return co(e, l);
    if (v == wo || v == ho || b && !o) {
      if (s = i || b ? {} : go(e), !l)
        return i ? Id(e, wd(s, e)) : Od(e, yd(s, e));
    } else {
      if (!J[v])
        return o ? e : {};
      s = pf(e, v, l);
    }
  }
  a || (a = new $e());
  var g = a.get(e);
  if (g)
    return g;
  a.set(e, s), _f(e) ? e.forEach(function(d) {
    s.add(It(d, t, n, d, e, a));
  }) : gf(e) && e.forEach(function(d, m) {
    s.set(m, It(d, t, n, m, e, a));
  });
  var h = f ? i ? mo : Pn : i ? St : Vt, w = u ? void 0 : h(e);
  return Zl(w || e, function(d, m) {
    w && (m = d, d = e[m]), Un(s, m, It(d, t, n, m, e, a));
  }), s;
}
var Yf = 1, Wf = 4;
function We(e) {
  return It(e, Yf | Wf);
}
var Zf = "__lodash_hash_undefined__";
function Qf(e) {
  return this.__data__.set(e, Zf), this;
}
function Jf(e) {
  return this.__data__.has(e);
}
function Lt(e) {
  var t = -1, n = e == null ? 0 : e.length;
  for (this.__data__ = new Ge(); ++t < n; )
    this.add(e[t]);
}
Lt.prototype.add = Lt.prototype.push = Qf;
Lt.prototype.has = Jf;
function Xf(e, t) {
  for (var n = -1, r = e == null ? 0 : e.length; ++n < r; )
    if (t(e[n], n, e))
      return !0;
  return !1;
}
function _o(e, t) {
  return e.has(t);
}
var ep = 1, tp = 2;
function So(e, t, n, r, o, a) {
  var s = n & ep, l = e.length, i = t.length;
  if (l != i && !(s && i > l))
    return !1;
  var f = a.get(e), u = a.get(t);
  if (f && u)
    return f == t && u == e;
  var v = -1, b = !0, g = n & tp ? new Lt() : void 0;
  for (a.set(e, t), a.set(t, e); ++v < l; ) {
    var h = e[v], w = t[v];
    if (r)
      var d = s ? r(w, h, v, t, e, a) : r(h, w, v, e, t, a);
    if (d !== void 0) {
      if (d)
        continue;
      b = !1;
      break;
    }
    if (g) {
      if (!Xf(t, function(m, c) {
        if (!_o(g, c) && (h === m || o(h, m, n, r, a)))
          return g.push(c);
      })) {
        b = !1;
        break;
      }
    } else if (!(h === w || o(h, w, n, r, a))) {
      b = !1;
      break;
    }
  }
  return a.delete(e), a.delete(t), b;
}
function np(e) {
  var t = -1, n = Array(e.size);
  return e.forEach(function(r, o) {
    n[++t] = [o, r];
  }), n;
}
function Qn(e) {
  var t = -1, n = Array(e.size);
  return e.forEach(function(r) {
    n[++t] = r;
  }), n;
}
var rp = 1, ap = 2, op = "[object Boolean]", sp = "[object Date]", lp = "[object Error]", ip = "[object Map]", up = "[object Number]", cp = "[object RegExp]", dp = "[object Set]", fp = "[object String]", pp = "[object Symbol]", vp = "[object ArrayBuffer]", mp = "[object DataView]", kr = Ce ? Ce.prototype : void 0, wn = kr ? kr.valueOf : void 0;
function bp(e, t, n, r, o, a, s) {
  switch (n) {
    case mp:
      if (e.byteLength != t.byteLength || e.byteOffset != t.byteOffset)
        return !1;
      e = e.buffer, t = t.buffer;
    case vp:
      return !(e.byteLength != t.byteLength || !a(new Xt(e), new Xt(t)));
    case op:
    case sp:
    case up:
      return wt(+e, +t);
    case lp:
      return e.name == t.name && e.message == t.message;
    case cp:
    case fp:
      return e == t + "";
    case ip:
      var l = np;
    case dp:
      var i = r & rp;
      if (l || (l = Qn), e.size != t.size && !i)
        return !1;
      var f = s.get(e);
      if (f)
        return f == t;
      r |= ap, s.set(e, t);
      var u = So(l(e), l(t), r, o, a, s);
      return s.delete(e), u;
    case pp:
      if (wn)
        return wn.call(e) == wn.call(t);
  }
  return !1;
}
var gp = 1, hp = Object.prototype, yp = hp.hasOwnProperty;
function wp(e, t, n, r, o, a) {
  var s = n & gp, l = Pn(e), i = l.length, f = Pn(t), u = f.length;
  if (i != u && !s)
    return !1;
  for (var v = i; v--; ) {
    var b = l[v];
    if (!(s ? b in t : yp.call(t, b)))
      return !1;
  }
  var g = a.get(e), h = a.get(t);
  if (g && h)
    return g == t && h == e;
  var w = !0;
  a.set(e, t), a.set(t, e);
  for (var d = s; ++v < i; ) {
    b = l[v];
    var m = e[b], c = t[b];
    if (r)
      var p = s ? r(c, m, b, t, e, a) : r(m, c, b, e, t, a);
    if (!(p === void 0 ? m === c || o(m, c, n, r, a) : p)) {
      w = !1;
      break;
    }
    d || (d = b == "constructor");
  }
  if (w && !d) {
    var y = e.constructor, _ = t.constructor;
    y != _ && "constructor" in e && "constructor" in t && !(typeof y == "function" && y instanceof y && typeof _ == "function" && _ instanceof _) && (w = !1);
  }
  return a.delete(e), a.delete(t), w;
}
var _p = 1, Nr = "[object Arguments]", Ur = "[object Array]", Yt = "[object Object]", Sp = Object.prototype, Br = Sp.hasOwnProperty;
function Cp(e, t, n, r, o, a) {
  var s = me(e), l = me(t), i = s ? Ur : Ft(e), f = l ? Ur : Ft(t);
  i = i == Nr ? Yt : i, f = f == Nr ? Yt : f;
  var u = i == Yt, v = f == Yt, b = i == f;
  if (b && Rt(e)) {
    if (!Rt(t))
      return !1;
    s = !0, u = !1;
  }
  if (b && !u)
    return a || (a = new $e()), s || zn(e) ? So(e, t, n, r, o, a) : bp(e, t, i, n, r, o, a);
  if (!(n & _p)) {
    var g = u && Br.call(e, "__wrapped__"), h = v && Br.call(t, "__wrapped__");
    if (g || h) {
      var w = g ? e.value() : e, d = h ? t.value() : t;
      return a || (a = new $e()), o(w, d, n, r, a);
    }
  }
  return b ? (a || (a = new $e()), wp(e, t, n, r, o, a)) : !1;
}
function dn(e, t, n, r, o) {
  return e === t ? !0 : e == null || t == null || !Ie(e) && !Ie(t) ? e !== e && t !== t : Cp(e, t, n, r, dn, o);
}
var xp = 1, Ap = 2;
function Op(e, t, n, r) {
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
    var i = l[0], f = e[i], u = l[1];
    if (s && l[2]) {
      if (f === void 0 && !(i in e))
        return !1;
    } else {
      var v = new $e();
      if (r)
        var b = r(f, u, i, e, t, v);
      if (!(b === void 0 ? dn(u, f, xp | Ap, r, v) : b))
        return !1;
    }
  }
  return !0;
}
function Co(e) {
  return e === e && !pe(e);
}
function Tp(e) {
  for (var t = Vt(e), n = t.length; n--; ) {
    var r = t[n], o = e[r];
    t[n] = [r, o, Co(o)];
  }
  return t;
}
function xo(e, t) {
  return function(n) {
    return n == null ? !1 : n[e] === t && (t !== void 0 || e in Object(n));
  };
}
function $p(e) {
  var t = Tp(e);
  return t.length == 1 && t[0][2] ? xo(t[0][0], t[0][1]) : function(n) {
    return n === e || Op(n, e, t);
  };
}
function Ip(e, t) {
  return e != null && t in Object(e);
}
function Mp(e, t, n) {
  t = zt(t, e);
  for (var r = -1, o = t.length, a = !1; ++r < o; ) {
    var s = ot(t[r]);
    if (!(a = e != null && n(e, s)))
      break;
    e = e[s];
  }
  return a || ++r != o ? a : (o = e == null ? 0 : e.length, !!o && Bn(o) && an(s, o) && (me(e) || Dt(e)));
}
function Pp(e, t) {
  return e != null && Mp(e, t, Ip);
}
var Dp = 1, Rp = 2;
function Ep(e, t) {
  return Hn(e) && Co(t) ? xo(ot(e), t) : function(n) {
    var r = Me(n, e);
    return r === void 0 && r === t ? Pp(n, e) : dn(t, r, Dp | Rp);
  };
}
function jp(e) {
  return function(t) {
    return t == null ? void 0 : t[e];
  };
}
function Fp(e) {
  return function(t) {
    return cn(t, e);
  };
}
function Lp(e) {
  return Hn(e) ? jp(ot(e)) : Fp(e);
}
function kp(e) {
  return typeof e == "function" ? e : e == null ? rn : typeof e == "object" ? me(e) ? Ep(e[0], e[1]) : $p(e) : Lp(e);
}
function Np(e) {
  return function(t, n, r) {
    for (var o = -1, a = Object(t), s = r(t), l = s.length; l--; ) {
      var i = s[e ? l : ++o];
      if (n(a[i], i, a) === !1)
        break;
    }
    return t;
  };
}
var Up = Np();
const Ao = Up;
function Bp(e, t) {
  return e && Ao(e, t, Vt);
}
var Vp = function() {
  return De.Date.now();
};
const _n = Vp;
var qp = "Expected a function", zp = Math.max, Hp = Math.min;
function Oo(e, t, n) {
  var r, o, a, s, l, i, f = 0, u = !1, v = !1, b = !0;
  if (typeof e != "function")
    throw new TypeError(qp);
  t = fr(t) || 0, pe(n) && (u = !!n.leading, v = "maxWait" in n, a = v ? zp(fr(n.maxWait) || 0, t) : a, b = "trailing" in n ? !!n.trailing : b);
  function g(C) {
    var S = r, O = o;
    return r = o = void 0, f = C, s = e.apply(O, S), s;
  }
  function h(C) {
    return f = C, l = setTimeout(m, t), u ? g(C) : s;
  }
  function w(C) {
    var S = C - i, O = C - f, A = t - S;
    return v ? Hp(A, a - O) : A;
  }
  function d(C) {
    var S = C - i, O = C - f;
    return i === void 0 || S >= t || S < 0 || v && O >= a;
  }
  function m() {
    var C = _n();
    if (d(C))
      return c(C);
    l = setTimeout(m, w(C));
  }
  function c(C) {
    return l = void 0, b && r ? g(C) : (r = o = void 0, s);
  }
  function p() {
    l !== void 0 && clearTimeout(l), f = 0, r = i = o = l = void 0;
  }
  function y() {
    return l === void 0 ? s : c(_n());
  }
  function _() {
    var C = _n(), S = d(C);
    if (r = arguments, o = this, i = C, S) {
      if (l === void 0)
        return h(i);
      if (v)
        return clearTimeout(l), l = setTimeout(m, t), g(i);
    }
    return l === void 0 && (l = setTimeout(m, t)), s;
  }
  return _.cancel = p, _.flush = y, _;
}
var To = Object.prototype, Gp = To.hasOwnProperty, Kp = Da(function(e, t) {
  e = Object(e);
  var n = -1, r = t.length, o = r > 2 ? t[2] : void 0;
  for (o && Ra(t[0], t[1], o) && (r = 1); ++n < r; )
    for (var a = t[n], s = St(a), l = -1, i = s.length; ++l < i; ) {
      var f = s[l], u = e[f];
      (u === void 0 || wt(u, To[f]) && !Gp.call(e, f)) && (e[f] = a[f]);
    }
  return e;
});
const Je = Kp;
function En(e, t, n) {
  (n !== void 0 && !wt(e[t], n) || n === void 0 && !(t in e)) && on(e, t, n);
}
function Yp(e) {
  return Ie(e) && sn(e);
}
function jn(e, t) {
  if (!(t === "constructor" && typeof e[t] == "function") && t != "__proto__")
    return e[t];
}
function Wp(e) {
  return _t(e, St(e));
}
function Zp(e, t, n, r, o, a, s) {
  var l = jn(e, n), i = jn(t, n), f = s.get(i);
  if (f) {
    En(e, n, f);
    return;
  }
  var u = a ? a(l, i, n + "", e, t, s) : void 0, v = u === void 0;
  if (v) {
    var b = me(i), g = !b && Rt(i), h = !b && !g && zn(i);
    u = i, b || g || h ? me(l) ? u = l : Yp(l) ? u = Ia(l) : g ? (v = !1, u = co(i, !0)) : h ? (v = !1, u = bo(i, !0)) : u = [] : Te(i) || Dt(i) ? (u = l, Dt(l) ? u = Wp(l) : (!pe(l) || ze(l)) && (u = go(i))) : v = !1;
  }
  v && (s.set(i, u), o(u, i, r, a, s), s.delete(i)), En(e, n, u);
}
function Jn(e, t, n, r, o) {
  e !== t && Ao(t, function(a, s) {
    if (o || (o = new $e()), pe(a))
      Zp(e, t, s, n, Jn, r, o);
    else {
      var l = r ? r(jn(e, s), a, s + "", e, t, o) : void 0;
      l === void 0 && (l = a), En(e, s, l);
    }
  }, St);
}
var Qp = Ea(function(e, t, n, r) {
  Jn(e, t, n, r);
});
const Jp = Qp;
function Xp(e, t, n) {
  for (var r = -1, o = e == null ? 0 : e.length; ++r < o; )
    if (n(t, e[r]))
      return !0;
  return !1;
}
function ev(e) {
  var t = e == null ? 0 : e.length;
  return t ? e[t - 1] : void 0;
}
function tv(e) {
  return typeof e == "function" ? e : rn;
}
function nv(e, t) {
  return t.length < 2 ? e : cn(e, Va(t, 0, -1));
}
function rv(e, t) {
  return dn(e, t);
}
var av = "[object Number]";
function dt(e) {
  return typeof e == "number" || Ie(e) && et(e) == av;
}
function ov(e, t) {
  var n = {};
  return t = kp(t), Bp(e, function(r, o, a) {
    on(n, t(r, o, a), r);
  }), n;
}
var sv = Ea(function(e, t, n) {
  Jn(e, t, n);
});
const Ht = sv;
var lv = Object.prototype, iv = lv.hasOwnProperty;
function uv(e, t) {
  t = zt(t, e);
  var n = -1, r = t.length;
  if (!r)
    return !0;
  for (; ++n < r; ) {
    var o = ot(t[n]);
    if (o === "__proto__" && !iv.call(e, "__proto__") || (o === "constructor" || o === "prototype") && n < r - 1)
      return !1;
  }
  var a = nv(e, t);
  return a == null || delete a[ot(ev(t))];
}
function cv(e) {
  return Te(e) ? void 0 : e;
}
var dv = 1, fv = 2, pv = 4, vv = Uu(function(e, t) {
  var n = {};
  if (e == null)
    return n;
  var r = !1;
  t = Ta(t, function(a) {
    return a = zt(a, e), r || (r = a.length > 1), a;
  }), _t(e, mo(e), n), r && (n = It(n, dv | fv | pv, cv));
  for (var o = t.length; o--; )
    uv(n, t[o]);
  return n;
});
const mv = vv;
function $o(e, t, n, r) {
  if (!pe(e))
    return e;
  t = zt(t, e);
  for (var o = -1, a = t.length, s = a - 1, l = e; l != null && ++o < a; ) {
    var i = ot(t[o]), f = n;
    if (i === "__proto__" || i === "constructor" || i === "prototype")
      return e;
    if (o != s) {
      var u = l[i];
      f = r ? r(u, i, l) : void 0, f === void 0 && (f = pe(u) ? u : an(t[o + 1]) ? [] : {});
    }
    Un(l, i, f), l = l[i];
  }
  return e;
}
function kt(e, t, n) {
  return e == null ? e : $o(e, t, n);
}
var bv = "Expected a function";
function gv(e, t, n) {
  var r = !0, o = !0;
  if (typeof e != "function")
    throw new TypeError(bv);
  return pe(n) && (r = "leading" in n ? !!n.leading : r, o = "trailing" in n ? !!n.trailing : o), Oo(e, t, {
    leading: r,
    maxWait: t,
    trailing: o
  });
}
var hv = 1 / 0, yv = mt && 1 / Qn(new mt([, -0]))[1] == hv ? function(e) {
  return new mt(e);
} : Ul;
const wv = yv;
var _v = 200;
function Sv(e, t, n) {
  var r = -1, o = ti, a = e.length, s = !0, l = [], i = l;
  if (n)
    s = !1, o = Xp;
  else if (a >= _v) {
    var f = t ? null : wv(e);
    if (f)
      return Qn(f);
    s = !1, o = _o, i = new Lt();
  } else
    i = t ? [] : l;
  e:
    for (; ++r < a; ) {
      var u = e[r], v = t ? t(u) : u;
      if (u = n || u !== 0 ? u : 0, s && v === v) {
        for (var b = i.length; b--; )
          if (i[b] === v)
            continue e;
        t && i.push(v), l.push(u);
      } else
        o(i, v, n) || (i !== l && i.push(v), l.push(u));
    }
  return l;
}
function Cv(e) {
  return e && e.length ? Sv(e) : [];
}
function xv(e, t, n, r) {
  return $o(e, t, n(cn(e, t)), r);
}
function Av(e, t, n) {
  return e == null ? e : xv(e, t, tv(n));
}
let bt = (e = 21) => crypto.getRandomValues(new Uint8Array(e)).reduce((t, n) => (n &= 63, n < 36 ? t += n.toString(36) : n < 62 ? t += (n - 26).toString(36).toUpperCase() : n > 62 ? t += "-" : t += "_", t), "");
const Io = [
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
], Mo = new Set(Io);
function Vr(e) {
  const t = () => x("div", e.contentAttrs, [e.content()]);
  if (e.component)
    return x(
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
  return x("div", X(e.attrs || {}, { class: "sup-group" }), [
    (e.title || !n && e.extra) && x(
      "div",
      {
        class: "sup-titlebar",
        style: { display: "flex", alignItems: "center" }
      },
      [
        e.title && x("div", { class: "sup-title" }, [e.title()]),
        !n && e.extra && x(
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
    n && e.extra && x(
      "div",
      {
        class: "sup-bottom-buttons",
        style: { textAlign: e.extraAlign }
      },
      [e.extra()]
    )
  ]);
}
const Ov = /* @__PURE__ */ new Set(["group", "card", "tabs", "collapse", "descriptions"]);
function Po(e = {}) {
  return Xn(Object.fromEntries(Object.entries(e).map(([t, n]) => [t, { render: n }]))).render;
}
function Xn(e = {}) {
  const t = {}, n = { render: t };
  for (const r of Object.keys(e)) {
    const o = e[r];
    if (!o)
      continue;
    o.service && Object.assign(n, { [r]: o.service }), o.schemaDefaults && (n.defaults = { ...o.schemaDefaults });
    const { defaults: a, adaptProps: s } = o, l = Ov.has(r), i = o.render, f = o.component;
    Object.assign(t, {
      [r]: (u = {}, v = {}) => {
        const b = l ? u.attrs || {} : u, g = {
          type: r,
          attrs: a ? { ...a, ...b } : b,
          state: u,
          slots: l && u.slots || v
        };
        return s && (g.attrs = s(g.attrs, g)), l && (g.state = { ...u, attrs: g.attrs, slots: g.slots }), i ? i(g) : x(f, g.attrs, g.slots);
      }
    });
  }
  return n;
}
const Do = /* @__PURE__ */ new Map(), Ro = /* @__PURE__ */ new Map(), Mt = /* @__PURE__ */ new Map();
function Eo(e, t = "manual") {
  const n = t === "manual" ? Do : Ro;
  Object.entries(e).forEach(([r, o]) => {
    o && n.set(r, o);
  });
}
function er(e) {
  var t;
  const n = st();
  if (!n.supportedFields.includes(e))
    return;
  const r = ((t = n.fieldSources) == null ? void 0 : t[e]) ?? e, o = [
    r,
    ...Object.keys(n.fieldSources || {}).filter(
      (a) => {
        var s;
        return a !== r && ((s = n.fieldSources) == null ? void 0 : s[a]) === r;
      }
    )
  ];
  return Mt.get(r) ?? o.map((a) => Do.get(a)).find(Boolean) ?? o.map((a) => Ro.get(a)).find(Boolean);
}
function Tv(e) {
  var t;
  const n = Mt.get(e);
  if (n)
    return n;
  const r = er(e);
  if (!r)
    throw new Error(
      `UIAdapter '${st().name}' 支持字段 '${e}'，但组件 '${e}' 尚未注册；请启用自动导入插件，或在 superForm.initialize({ components }) 中提供`
    );
  const o = ((t = st().fieldSources) == null ? void 0 : t[e]) ?? e;
  return Mt.set(o, r), Mt.set(e, r), r;
}
function $v(e) {
  const t = Mt.get(e);
  if (!t)
    throw new Error(`原始 UI 组件 '${e}' 尚未加载`);
  return t;
}
let ft;
function Iv(e) {
  if (!("uiComponents" in e))
    return e;
  const { uiComponents: t, ...n } = e, r = Xn(t);
  return { ...n, ...r, render: { ...r.render, ...Po(e.render) } };
}
function st() {
  if (!ft)
    throw new Error(
      "SuperForm 尚未初始化 UIAdapter；官方产品请先调用 superForm.initialize()，独立 Core 请调用 superForm.useAdapter(adapter)"
    );
  return ft;
}
function qr(e) {
  if (ft) {
    if (ft !== e)
      throw new Error(`UIAdapter 已初始化为 '${ft.name}'，不能切换为 '${e.name}'`);
    return;
  }
  ft = e, Eo(e.fieldComponents || {}, "manual");
}
function jo(e, t = {}) {
  const { uiComponents: n, ...r } = t, o = Xn(n);
  return {
    ...e,
    ...o,
    ...r,
    defaults: { ...e.defaults, ...o.defaults },
    render: { ...e.render, ...o.render, ...Po(t.render) }
  };
}
const zr = {};
function q(e) {
  const t = zr[e];
  if (t)
    return t;
  const n = st();
  let r = n.render[e];
  if (e === "group") {
    const o = n.render.group || Vr;
    r = (a) => a.component ? Vr(a) : o(a);
  } else
    e === "compactSpace" && (r || (r = n.render.space));
  if (!r)
    throw new Error(`UIAdapter '${n.name}' 未提供 render.${e}`);
  return zr[e] = r, r;
}
function ve(e) {
  const t = st(), n = t[e];
  if (!n)
    throw new Error(`UIAdapter '${t.name}' 未提供 ${e} 协议`);
  return n;
}
const Mv = {
  type: { type: String, required: !0 },
  option: { type: Object, required: !0 },
  model: { type: Object, required: !0 },
  effectData: { type: Object, required: !0 },
  binding: { type: Object, required: !0 },
  state: { type: Object, required: !0 },
  attrs: { type: Object, required: !0 }
};
function Pv(e, t) {
  return (...n) => {
    const r = e(...n);
    for (const o of Array.isArray(t) ? t : [t])
      typeof o == "function" && o !== e && o(...n);
    return r;
  };
}
function tr({ prop: e = "value", event: t = "update:value" } = {}, n) {
  const r = t.startsWith("on") ? t : `on${t[0].toUpperCase()}${t.slice(1)}`;
  return (o, a) => {
    const s = { ...n ? n(o, a) : o }, { binding: l, state: i, option: f, effectData: u } = a;
    i.disabled !== void 0 && (s.disabled = i.disabled), f.disabledDate !== void 0 && (s.disabledDate = (...v) => f.disabledDate(u, ...v));
    for (const [v, b] of Object.entries(l)) {
      if (f.labelField && (v === "labelValue" || v === "onUpdate:labelValue"))
        continue;
      const g = v === "value" ? e : v === "onUpdate:value" ? r : v;
      s[g] = v.startsWith("onUpdate:") && typeof b == "function" ? Pv(b, s[g]) : b;
    }
    return s;
  };
}
function Dv(e, t) {
  return Object.fromEntries(
    Object.entries(e).map(([n, { model: r, ...o }]) => [
      n,
      {
        ...o,
        // 两条渲染路径共用绑定和属性转换，扩展渲染不能再次合成原生事件。
        adaptProps: tr(r ?? t, o.adaptProps)
      }
    ])
  );
}
const Hr = /* @__PURE__ */ new Map(), Rv = tr();
function Fo(e) {
  var t, n;
  const r = Hr.get(e);
  if (r)
    return r;
  const o = st();
  if (!o.supportedFields.includes(e))
    return;
  const a = (t = o.fields) == null ? void 0 : t[e], s = (a == null ? void 0 : a.component) ?? (a != null && a.render && !er(e) ? void 0 : Tv(e)), l = (a == null ? void 0 : a.adaptProps) ?? o.adaptFieldProps ?? Rv, i = (n = a == null ? void 0 : a.processors) != null && n.some((u) => ["options", "picker", "range"].includes(u)) ? "请选择" : "请输入", f = {
    ...a,
    type: e,
    component: s,
    render(u) {
      var v;
      const b = Object.assign(l(u.attrs, u), a == null ? void 0 : a.fixedProps), g = ((v = a == null ? void 0 : a.adaptSlots) == null ? void 0 : v.call(a, u.slots, u)) ?? u.slots;
      return a != null && a.render ? a.render({ ...u, attrs: b, slots: g }) : x(s, b, g);
    },
    // 只缓存提示前缀，label 按当前字段读取，避免同类型字段串用提示文案。
    // defaults/attrs 的 class/style 按 Vue 规则合并；fixedProps 最后直接覆盖，不能被用户配置改写。
    getAttrs: (u, v, b = {}) => Object.assign(
      X(
        { placeholder: b.placeholder ?? `${i}${v.label ?? ""}` },
        (a == null ? void 0 : a.defaults) ?? {},
        u,
        // 两套 UI 均接收标准 options；只在专项结果存在时覆盖，空数组也有效。
        b.options === void 0 ? {} : { options: b.options }
      ),
      a == null ? void 0 : a.fixedProps
    ),
    adaptProps: l
  };
  return Hr.set(e, f), f;
}
function ye(e) {
  var t, n;
  return (n = (t = ve("icons").semantic) == null ? void 0 : t[e]) == null ? void 0 : n.call(t);
}
function Re(e) {
  const t = we("exaProvider", {}).data;
  return k({ ...e || {}, formData: t });
}
function Gr(e, t) {
  const n = j(rt(e) ? e : !!e);
  return typeof e == "function" && Ye(() => {
    n.value = e(t);
  }), n;
}
function Fn(e, t) {
  const n = k({});
  return e && Ye(() => {
    Object.assign(n, e(t));
  }), n;
}
function Ev(e = {}, t) {
  const n = {};
  return Object.keys(e).forEach((r) => {
    !e[r] || r === "onUpdate" || (r.match(/^on[A-Z]/) ? n[r] = (...o) => e[r](t, ...o) : r === "on" && Object.entries(e.on).forEach(([o, a]) => {
      const s = "on" + o.charAt(0).toUpperCase() + o.slice(1);
      n[s] = (...l) => a(t, ...l);
    }));
  }), n;
}
function nr({ option: e, model: t, effectData: n }, r) {
  const {
    field: o,
    endField: a,
    labelField: s,
    stringifyValue: l,
    computed: i,
    value: f,
    onUpdate: u
  } = e, v = {}, b = e.vModelFields || {};
  if (s && (v.labelValue = L(() => Me(t.parent, s)), v["onUpdate:labelValue"] = (c) => {
    const p = l ? c == null ? void 0 : c.toString() : c;
    kt(t.parent, s, p);
  }), Object.entries(b).forEach(([c, p]) => {
    var y;
    typeof p == "string" ? ((y = t.parent)[p] ?? (y[p] = void 0), v[c] = L(() => Me(t.parent, p)), v[`onUpdate:${c}`] = (_) => {
      kt(t.parent, p, _);
    }) : rt(p) ? (v[c] = p, v[`onUpdate:${c}`] = (_) => p.value = _) : v[c] = p;
  }), !o)
    return rt(f) && Object.assign(v, {
      value: f,
      "onUpdate:value": (c) => f.value = c
    }), v;
  r !== void 0 && (t.refData ?? (t.refData = ie(r)));
  const g = oe(t, "refData"), h = j(), w = (c = ie(r)) => {
    h.value = c, g.value !== c && r !== void 0 && (g.value = c);
  };
  Object.assign(v, {
    value: h,
    "onUpdate:value": w
  }), rt(f) && (z(g, (c) => f.value = c), z(f, w));
  let d = ie(t.refData), m;
  if (a)
    h.value = [g.value, t.parent[a]], m = (c) => {
      const [p, y] = c || [];
      g.value = p, d = p, t.parent[a] = y;
    }, z([g, () => t.parent[a]], (c) => {
      h.value = c;
    });
  else if (l) {
    const c = (p) => (p == null ? void 0 : p.toString().split(",")) || [];
    h.value = c(g.value), m = (p) => {
      const y = (p == null ? void 0 : p.toString()) || "";
      g.value = y, d = y;
    }, z(g, (p) => {
      p !== d && (h.value = c(p));
    });
  } else
    h.value = d, m = (c) => {
      g.value = c, d = c;
    }, z(g, w);
  return z(h, m, { flush: "sync" }), u && z(g, () => u(n)), i && z(
    // 使用ref让计算结果即使一样也会进行后面的赋值
    () => j(i(d, n)),
    (c) => m(Y(c)),
    { immediate: !0 }
  ), v;
}
function Pe({ option: e, effectData: t, inheritDisabled: n }) {
  const { type: r, dynamicAttrs: o, disabled: a, hidden: s, required: l } = e, i = Gr(s, t), f = Gr(l, t), u = n === void 0 && a === void 0 ? void 0 : L(() => {
    let d = ie(n);
    if (!(!d && a === void 0))
      return d || (typeof a == "function" ? d = !!a(t) : d = ie(a)), d;
  }), v = Ev(e, t), b = typeof o == "function" ? { ...Qe(Fn(o, t)) } : {}, g = X({ ...W[r] }, { ...e.attrs }, v, b), h = Ht({}, e.attrs, g);
  return { attrs: { ...h, ...u && {
    disabled: L(() => u.value ?? ie(h.disabled))
  } }, nativeAttrs: h, disabled: u, hidden: i, required: f };
}
function Kr(e, t = {}) {
  const n = new RegExp("{(\\w*)}", "g");
  return e.replace(n, (r, o) => t[o] || "");
}
const Yr = {
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
}, Wr = {
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
function jv(e, t, n, r) {
  let o;
  if (t)
    o = { type: e, len: t, message: "len" };
  else if (dt(n) && dt(r))
    o = { type: e, max: n, min: r, message: "range" };
  else if (dt(n))
    o = { type: e, max: n, message: "max" };
  else if (dt(r))
    o = { type: e, min: r, message: "min" };
  else
    return !1;
  return e === "number" ? (o.message = Wr.number[o.message], o.transform = (a) => Number(a)) : o.message = Wr.string[o.message], o;
}
function Fv(e, t = "") {
  const { trigger: n, required: r, type: o = "string", len: a, max: s, min: l, pattern: i, validator: f, message: u } = e || {}, v = [];
  r && (o === "string" || o in Yr ? v.push({
    required: r,
    trigger: n,
    // validator: noEmpty,
    pattern: /^[\s\S]*.*[^\s][\s\S]*$/,
    // transform: (value) => value + '',
    // whitespace: true,
    message: u || `${t}不能为空！`
  }) : v.push({ required: r, trigger: n, message: u || `${t}不能为空！` }));
  const b = Yr[o];
  if (b) {
    const g = Kr(b.message, { label: t });
    v.push({ ...b, trigger: n, message: g });
  }
  if (i && v.push({ pattern: i, trigger: n, message: u }), a || dt(s) || dt(l)) {
    const g = jv(o, a, s, l), h = Kr(g.message, { label: t, len: a, max: s, min: l });
    v.push({ ...g, trigger: n, message: h, type: o });
  }
  return f && v.push({ validator: f, trigger: n }), v;
}
function Lo(e, t, n) {
  const { field: r, columns: o, subItems: a, initialValue: s, value: l } = e, i = e.endField ?? e.labelField, f = r ? r.split(".") : [], u = n.concat(f), v = f.splice(-1)[0], b = k({
    refName: v,
    initialValue: s,
    fieldName: r,
    origin: t,
    parent: t,
    refData: t,
    propChain: u
  });
  return v ? (f.length && (b.parent = L(() => Me(t.value, f))), b.refData = L({
    get: () => Me(t.value, r),
    set: (g) => kt(t.value, r, g)
  }), z(
    t,
    () => {
      b.refData ?? (b.refData = ie(s) ?? ie(l) ?? (o && [] || a && {})), i && Av(b.parent, i, (g) => g);
    },
    { immediate: !0, flush: "sync" }
  )) : l && (b.refData = j(l), b.propChain = []), b;
}
const Nt = (e, t) => e == null ? void 0 : e.map((n) => n.validator ? { ...n, validator: async (o, ...a) => {
  const s = await n.validator({ ...o, ...t }, ...a);
  if (s === !1 || s instanceof Error)
    throw s;
} } : n);
function ht(e, t, n = []) {
  const r = oe(t || {}), o = {}, a = /* @__PURE__ */ new Map();
  return e.forEach((s) => {
    if (typeof s != "object")
      return;
    const l = Lo(s, r, n), { required: i, label: f, subItems: u, columns: v } = s;
    if (s.rules || i) {
      const b = s.rules || [], g = Array.isArray(b) ? b : [b];
      if (i) {
        const w = g[0];
        w ? w.required = i : g.push({ required: i });
      }
      let h = "string";
      if (l.refData) {
        const w = typeof l.refData;
        h = w === "object" && Array.isArray(l.refData) ? "array" : w;
      }
      l.rules = g.map((w) => Fv({ type: h, ...w }, f)).flat(), l.propChain.length && (o[l.propChain.join(".")] = l.rules);
    }
    if (u) {
      const b = ht(u, oe(l, "refData"), l.propChain);
      Object.assign(o, b.rules), l.children = b.modelsMap;
    } else
      v && (l.listData = ht(v));
    a.set(Hs(s), l);
  }), {
    rules: o,
    modelsMap: a
  };
}
function Ut(e, t, n) {
  const r = e.propChain;
  if (e.index === n && r.length === t.length && r.every((a, s) => a === t[s]))
    return;
  const o = (a) => {
    var s, l;
    (s = a.propChain) != null && s.length && r.every((i, f) => a.propChain[f] === i) && (a.propChain = [...t, ...a.propChain.slice(r.length)]), a.index !== void 0 && (a.index = n), (l = a.children) == null || l.forEach(o);
  };
  o(e);
}
function lt(e, t, n = [], r) {
  const o = oe(t || {}), a = {}, s = [...e].map(([l, i]) => {
    const { children: f, rules: u, listData: v } = i, b = r !== void 0 ? [...n, r] : n, g = Lo(l, o, b);
    if (r !== void 0 && (g.index = r), g.rules = u, g.propChain.length && u && (a[g.propChain.join(".")] = u), f) {
      const { modelsMap: h, rules: w } = lt(f, oe(g, "refData"), g.propChain);
      Object.assign(a, w), g.children = h;
    }
    return v && (g.listData = v), [l, g];
  });
  return { modelsMap: new Map(s), rules: a };
}
function ko(e, t, n, r) {
  const { modelsMap: o, rules: a } = lt(e, t, n, r), s = [];
  return function l(i) {
    for (const [f, u] of i)
      s.push([f, u]), u.children && l(u.children);
  }(o), { modelsMap: new Map(s), rootModels: o, rules: a };
}
const Lv = (e, t) => Object.prototype.hasOwnProperty.call(e, t);
function No(e, t = {}, n = {}) {
  for (const [r, o] of Object.entries(e))
    Array.isArray(o) ? e[r] = We((t == null ? void 0 : t[r]) ?? (n == null ? void 0 : n[r])) : Object.prototype.toString.call(o) === "[object Object]" ? No(o, t == null ? void 0 : t[r], n == null ? void 0 : n[r]) : e[r] = (t == null ? void 0 : t[r]) ?? (n == null ? void 0 : n[r]);
}
function Uo(e, t, n = {}) {
  for (const [r, o] of Object.entries(e)) {
    if (!Lv(t, r))
      continue;
    const a = t[r] ?? (n == null ? void 0 : n[r]);
    Te(o) && Te(a) ? Uo(o, a, n == null ? void 0 : n[r]) : Array.isArray(a) || Te(a) ? e[r] = We(a) : e[r] = a;
  }
}
function Zr() {
  let e;
  return { promise: new Promise((n) => {
    e = n;
  }), resolve: e };
}
function Bo() {
  const e = j();
  let t = Zr(), n = !0;
  return z(e, (o) => {
    o ? (t.resolve(!0), n = !1) : n || (t = Zr(), n = !0);
  }), [e, () => t.promise.then(() => e.value)];
}
function ne(e, t = {}) {
  return e ? typeof e == "function" ? e(t || {}, {}) : typeof e != "object" ? x("span", e) : x(e, { effectData: t }) : null;
}
const ue = {
  tagViewer: ["pink", "red", "orange", "green", "cyan", "blue", "purple"]
};
function Ct(e, t, n) {
  const r = n || we("rootSlots", {}), o = {};
  return e && Object.entries(e).forEach(([a, s]) => {
    const l = typeof s == "string" ? r[s] : s;
    l && (o[a] = (i) => typeof l == "function" ? l({ ...t, ...i || {} }) : l);
  }), o;
}
function rr(e, t, n = !1, r = {}) {
  if (t != null)
    for (const o of e) {
      const a = o[r.value ?? "value"];
      if (Object.is(a, t) || n && String(a) === t)
        return o;
      const s = o[r.children ?? "children"], l = Array.isArray(s) && rr(s, t, n, r);
      if (l)
        return l;
    }
}
function fn(e, t = {}, n = !0) {
  const r = j([]);
  let o = 0;
  (e == null ? void 0 : e.source) !== void 0 && e.dictName !== void 0 && console.warn("[SuperForm] options.source 与 options.dictName 同时配置，优先使用 source，忽略 dictName");
  const a = async (l = t) => {
    var i;
    const f = ++o, u = Y(e == null ? void 0 : e.source), v = (e == null ? void 0 : e.source) !== void 0 ? typeof u == "function" ? await u(l) : u : (e == null ? void 0 : e.dictName) !== void 0 ? await ((i = ue.dictApi) == null ? void 0 : i.call(ue, e.dictName)) : void 0;
    f === o && (r.value = v ?? []);
  };
  return e && n && Ye(() => {
    a();
  }), { optionsRef: L(() => {
    var l, i, f;
    const u = r.value, v = ((l = e == null ? void 0 : e.fieldNames) == null ? void 0 : l.label) ?? "label", b = ((i = e == null ? void 0 : e.fieldNames) == null ? void 0 : i.value) ?? "value", g = ((f = e == null ? void 0 : e.fieldNames) == null ? void 0 : f.children) ?? "children", h = (w) => w.map((d, m) => {
      const c = Te(d), p = c ? d[v] : d, y = e != null && e.labelAsValue ? p : c ? d[b] : e != null && e.valueToNumber ? m : d;
      return {
        ...c ? d : {},
        label: p,
        value: e != null && e.valueToNumber && !e.labelAsValue ? Number(y) : y,
        ...c && Array.isArray(d[g]) && { children: h(d[g]) }
      };
    });
    return Array.isArray(u) ? h(u) : Object.entries(u ?? {}).map(([w, d]) => ({
      label: d,
      value: e != null && e.labelAsValue ? d : e != null && e.valueToNumber ? Number(w) : w
    }));
  }), load: a };
}
const Qr = (e, t) => {
  const n = {};
  return e.vModelFields && Object.entries(e.vModelFields).forEach(([r, o]) => {
    n[r] = t[o];
  }), n;
}, Sn = ({ value: e, label: t = e, color: n, icon: r, tagViewer: o = !0 }) => {
  const a = { color: n, label: t, icon: r };
  if (o !== !0 || !n) {
    const s = o === !0 ? ue.tagViewer : o;
    if (typeof s == "function") {
      const l = s(e);
      Te(l) ? Object.assign(a, l) : a.color = l;
    } else if (Array.isArray(s) && Te(s[0])) {
      const l = s.find((i) => i.value == e);
      Object.assign(a, l);
    }
    a.color ?? (a.color = n || s[e] || e === !0 && "success" || e === !1 && "error" || "default");
  }
  return q("tag")(
    { color: a.color },
    {
      default: () => a.label || e,
      icon: a.icon
    }
  );
};
function Gt(e, t = {}) {
  const { type: n = "", viewRender: r, render: o, labelField: a, tagViewer: s, initialValue: l } = e, i = e.options, f = e.endField, u = we("rootSlots", {}), v = r || n === "InfoSlot" && o, b = typeof v == "string" ? u[v] : v;
  if (v && !b)
    return !1;
  let g = !1;
  const h = (() => {
    if (a)
      return ({ current: d } = t) => String(Me(d, a) ?? "");
    if (f)
      return ({ current: d, text: m } = t) => (m || "") + " - " + (Me(d, f) || "");
    if (i !== void 0) {
      g = !(s === !1 || !s && ue.tagViewer === !1);
      const { optionsRef: d, load: m } = fn(i, t, !1);
      let c = !1;
      return (p = t, y) => {
        c || (c = !0, m(p));
        const _ = p.text ?? p.value ?? ie(l) ?? "";
        if (_ === "")
          return "";
        const S = (Array.isArray(_) ? _ : e.stringifyValue && typeof _ == "string" ? _.split(",") : [_]).map((O) => {
          const A = rr(d.value, O, e.stringifyValue), T = (A == null ? void 0 : A.label) ?? O;
          return !y && g ? Sn({ ...A, value: O, label: T, tagViewer: s }) : T;
        });
        return !y && g ? S : S.join(",");
      };
    } else if (n === "Switch")
      return ({ text: d, value: m } = t) => {
        const c = d ?? m ?? ie(l);
        return c === !0 ? "是" : c === !1 ? "否" : c;
      };
  })(), w = !0;
  if (b)
    return (d = t) => {
      const m = Qr(e, d.current), { attrs: c } = Pe({ option: e, effectData: d }), p = { ...c };
      delete p.disabled;
      const y = k({
        props: { ...p, ...m },
        ...d,
        ...h && { text: L(() => h(d, w)) },
        isView: !0
      });
      return b(y);
    };
  if (s && !g)
    return (d = t) => {
      const m = d.text ?? ie(l);
      return typeof m == "boolean" && s === !0 ? Sn({
        label: m ? "是" : "否",
        color: m ? "success" : "error"
      }) : (Array.isArray(m) ? m : typeof m == "string" ? m.split(",") : [m]).map((y) => Sn({ value: y, tagViewer: s }));
    };
  if (n === "Text" && (e.attrs || e.dynamicAttrs))
    return (d = t) => {
      const m = (h == null ? void 0 : h(d)) || (d.value ?? ie(l)), c = Fn(e.dynamicAttrs, d), p = X({ ...e.attrs, title: m }, c);
      return x("span", p, m);
    };
  if (n === "HTML")
    return (d = t) => {
      const m = Fn(e.dynamicAttrs, d), c = X({ ...e.attrs, innerHTML: d.value }, m);
      return x("span", c);
    };
  if (n === "TextArea")
    return (d = t) => x("pre", { style: "white-space: break-spaces;" }, d.value ?? ie(l));
  if (!h && (n === "Upload" || tn(n)))
    return (d = t) => {
      const m = Qr(e, d.current), c = Ct(e.slots, d, u), {
        attrs: { disabled: p, ...y }
      } = Pe({ option: e, effectData: d });
      if (n === "Upload")
        return x(
          _e.Upload,
          k({ option: e, effectData: d, ...y, ...m, value: d.value, isView: !0, disabled: p }),
          c
        );
      const _ = tn(n);
      return _ && x(
        _.component,
        k(
          Wo(_, {
            ...y,
            ...m,
            value: d.value,
            disabled: p
          })
        ),
        c
      );
    };
  if (n === "Buttons") {
    const d = pn({ config: e, isView: !0 });
    return !!d && ((m = t) => d({ param: m }));
  } else
    return h;
}
const xt = (e, t) => {
  const { title: n, label: r, labelSlot: o, tooltip: a } = e, s = a && (Te(a) ? a : { title: a }), l = n || o || r;
  return l === void 0 ? void 0 : () => [
    ne(l, t),
    a && q("tooltip")(s, {
      title: () => ne(a.title, t),
      default: () => x(
        "span",
        {
          class: "sup-label-tooltip"
        },
        a.icon ? a.icon() : ye("info")
      )
    })
  ];
}, kv = /* @__PURE__ */ new Set([
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
]), Nv = {
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
}, Uv = /* @__PURE__ */ new Set(["Input", "InputNumber", "TextArea", "AutoComplete"]), Bv = /* @__PURE__ */ new Set(["Select", "TreeSelect"]), Vv = /* @__PURE__ */ new Set(["Select", "TreeSelect", "RadioGroup", "CheckboxGroup"]), qv = /* @__PURE__ */ new Set([
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
]), zv = /* @__PURE__ */ new Set(["table", "form", "description"]), Hv = /* @__PURE__ */ new Set([
  "attrs",
  "dynamicAttrs",
  "dataSource",
  "initialValue",
  "options",
  "params",
  "rules",
  "treeData",
  "value"
]), Ue = (e) => e !== null && typeof e == "object" && !Array.isArray(e), K = (e, t, n, r) => ({ level: e, code: t, path: n, message: r });
function Ln(e, t, n, r) {
  if (!(!e || typeof e != "object" || r.has(e))) {
    if (r.add(e), Ue(e))
      for (const [o, a] of Object.entries(Nv))
        Object.prototype.hasOwnProperty.call(e, o) && n.push(K("warning", "deprecated-api", `${t}.${o}`, `已废弃，${a}。`));
    for (const [o, a] of Object.entries(e))
      typeof a == "function" || Hv.has(o) || (Array.isArray(a) ? a.forEach((s, l) => Ln(s, `${t}.${o}[${l}]`, n, r)) : Ue(a) && Ln(a, `${t}.${o}`, n, r));
  }
}
function Gv(e, t, n, r, o) {
  var a, s, l;
  if (!Ue(e)) {
    typeof e != "string" && n.push(K("error", "invalid-item", t, "字段配置必须是对象。"));
    return;
  }
  const { type: i } = e;
  if (i !== void 0 && (typeof i != "string" || !o.has(i)) && n.push(K("error", "unknown-type", `${t}.type`, `未知字段类型 ${JSON.stringify(i)}。`)), i === void 0 && r !== "table" && n.push(K("warning", "missing-type", `${t}.type`, "表单或详情字段建议明确配置 type。")), Array.isArray(e.exclude)) {
    const b = e.exclude.filter((g) => !zv.has(g));
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
  ), Vv.has(i) && !e.options && !e.dictName && n.push(K("warning", "missing-options", t, `${i} 未配置 options 或 dictName。`));
  const f = (a = e.attrs) == null ? void 0 : a.placeholder, u = Uv.has(i) ? `请输入${typeof e.label == "string" ? e.label : ""}` : Bv.has(i) ? `请选择${typeof e.label == "string" ? e.label : ""}` : void 0;
  u !== void 0 && f === u && n.push(
    K("suggestion", "redundant-default", `${t}.attrs.placeholder`, "与内置 placeholder 相同，可以省略。")
  );
  const v = ["DatePicker", "DateRangePicker"].includes(i) ? "YYYY-MM-DD" : ["TimePicker", "TimeRangePicker"].includes(i) ? "HH:mm:ss" : void 0;
  v && ((s = e.attrs) == null ? void 0 : s.valueFormat) === v && n.push(
    K("suggestion", "redundant-default", `${t}.attrs.valueFormat`, "与内置 valueFormat 相同，可以省略。")
  ), i === "InputGroup" && ((l = e.attrs) == null ? void 0 : l.compact) === !0 && n.push(
    K("suggestion", "redundant-default", `${t}.attrs.compact`, "InputGroup 默认使用紧凑布局，可以省略。")
  ), e.block === !1 && !qv.has(i) && n.push(K("suggestion", "redundant-default", `${t}.block`, "block: false 是默认行为，可以省略。")), e.breakAfter === !1 && n.push(
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
    Ue(e[b]) && Object.keys(e[b]).length === 0 && n.push(K("suggestion", "empty-config", `${t}.${b}`, `空的 ${b} 配置可以省略。`));
  for (const b of ["rules", "options"])
    Array.isArray(e[b]) && e[b].length === 0 && n.push(K("suggestion", "empty-config", `${t}.${b}`, `空的 ${b} 配置可以省略。`));
  e.subItems && pt(e.subItems, `${t}.subItems`, n, r === "table" ? "form" : r, o), e.columns && pt(e.columns, `${t}.columns`, n, "table", o);
}
function pt(e, t, n, r, o) {
  if (!Array.isArray(e)) {
    n.push(K("error", "invalid-items", t, "必须是数组。"));
    return;
  }
  const a = /* @__PURE__ */ new Map();
  e.forEach((s, l) => {
    const i = `${t}[${l}]`;
    Gv(s, i, n, r, o), !(!Ue(s) || typeof s.field != "string" || !s.field) && (a.has(s.field) ? n.push(
      K(
        "warning",
        "duplicate-field",
        `${i}.field`,
        `字段 ${s.field} 与 ${a.get(s.field)} 重复。`
      )
    ) : a.set(s.field, `${t}[${l}].field`));
  });
}
function Kv(e, t = "auto", n = []) {
  var r, o, a, s, l, i, f;
  const u = [];
  if (!Ue(e))
    return [K("error", "invalid-schema", "schema", "schema 必须是对象。")];
  const v = /* @__PURE__ */ new Set([...kv, ...n]);
  Ln(e, "schema", u, /* @__PURE__ */ new WeakSet());
  const b = t === "auto" ? Array.isArray(e.columns) ? "table" : "form" : t;
  if (!["form", "table", "detail"].includes(b))
    return [K("error", "invalid-schema-type", "schema", `未知 schema 类型 ${JSON.stringify(t)}。`)];
  if (e.subSpan === 8 && u.push(K("suggestion", "redundant-default", "schema.subSpan", "subSpan: 8 是默认值，可以省略。")), e.gutter === 16 && u.push(K("suggestion", "redundant-default", "schema.gutter", "gutter: 16 是默认值，可以省略。")), Ue(e.params) && Object.keys(e.params).length === 0 && u.push(K("suggestion", "empty-config", "schema.params", "空的 params 配置可以省略。")), b === "table") {
    for (const g of ["editMode", "addMode"])
      Object.prototype.hasOwnProperty.call(e, g) && u.push(K("warning", "deprecated-api", `schema.${g}`, `已废弃，使用 rowEditor.${g}。`));
    Array.isArray(e.columns) ? pt(e.columns, "schema.columns", u, "table", v) : u.push(K("error", "missing-columns", "schema.columns", "表格必须配置 columns。")), e.immediate === !0 && u.push(
      K("suggestion", "redundant-default", "schema.immediate", "immediate: true 是默认值，可以省略。")
    ), e.pagination === !1 && u.push(
      K("suggestion", "redundant-default", "schema.pagination", "pagination: false 是默认值，可以省略。")
    ), ((r = e.attrs) == null ? void 0 : r.rowKey) === "id" && u.push(
      K("suggestion", "redundant-default", "schema.attrs.rowKey", "rowKey: 'id' 是默认值，可以省略。")
    ), ((o = e.attrs) == null ? void 0 : o.size) === "small" && u.push(
      K("suggestion", "redundant-default", "schema.attrs.size", "size: 'small' 是默认值，可以省略。")
    ), ((a = e.attrs) == null ? void 0 : a.tableLayout) === "fixed" && u.push(
      K(
        "suggestion",
        "redundant-default",
        "schema.attrs.tableLayout",
        "tableLayout: 'fixed' 是默认值，可以省略。"
      )
    ), Ue(e.pagination) && e.pagination.current === 1 && u.push(
      K("suggestion", "redundant-default", "schema.pagination.current", "分页 current 默认是 1，可以省略。")
    ), Ue(e.pagination) && e.pagination.pageSize === 10 && u.push(
      K("suggestion", "redundant-default", "schema.pagination.pageSize", "分页 pageSize 默认是 10，可以省略。")
    ), (s = e.searchForm) != null && s.subItems && pt(e.searchForm.subItems, "schema.searchForm.subItems", u, "form", v), (i = (l = e.rowEditor) == null ? void 0 : l.form) != null && i.subItems && pt(e.rowEditor.form.subItems, "schema.rowEditor.form.subItems", u, "form", v);
  } else
    Array.isArray(e.subItems) ? (((f = e.attrs) == null ? void 0 : f.labelAlign) === "right" && u.push(
      K("suggestion", "redundant-default", "schema.attrs.labelAlign", "labelAlign: 'right' 是默认值，可以省略。")
    ), pt(e.subItems, "schema.subItems", u, b, v)) : u.push(K("error", "missing-sub-items", "schema.subItems", "表单或详情必须配置 subItems。"));
  return u;
}
function Yv(e, t = "auto") {
  return Kv(e, t, Bm());
}
function Bt(e, t, n) {
  var r, o;
  const a = Yv(e, t);
  return a.length && ((r = console.groupCollapsed) == null || r.call(console, `[superform] ${n} schema 诊断：${a.length} 项`), a.forEach(({ level: s, path: l, message: i }) => {
    const f = `[superform] ${l}: ${i}`;
    s === "error" ? console.error(f) : s === "warning" ? console.warn(f) : console.info(f);
  }), (o = console.groupEnd) == null || o.call(console)), a;
}
function ce(e, t = !1) {
  return () => x("svg", {
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
    x("g", [
      ...e.map((n) => x("path", { d: n })),
      ...t ? [x("animateTransform", {
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
const Fe = {
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
}, Wv = () => {
  const e = Ht(
    {
      add: {
        icon: Fe.add,
        label: "新增"
      },
      delete: {
        icon: Fe.delete,
        label: "删除",
        confirmText: "确定要删除吗？",
        disabled: (t) => {
          var n;
          return !t.record && !(((n = t.selectedRows) == null ? void 0 : n.length) > 0);
        }
      },
      edit: {
        icon: Fe.edit,
        label: "修改",
        disabled: (t) => {
          var n;
          return !t.record && ((n = t.selectedRows) == null ? void 0 : n.length) !== 1;
        }
      },
      detail: {
        icon: Fe.detail,
        label: "查看",
        disabled: (t) => {
          var n;
          return !t.record && ((n = t.selectedRows) == null ? void 0 : n.length) !== 1;
        }
      },
      submit: {
        icon: Fe.submit,
        label: "提交"
      },
      search: {
        icon: Fe.search,
        label: "查询"
      },
      reset: {
        icon: Fe.reset,
        label: "重置"
      }
    },
    W.ButtonActions,
    ue.defaultButtons
  );
  return Object.entries(ue.defaultButtons || {}).forEach(([t, n]) => {
    Object.prototype.hasOwnProperty.call(n, "icon") && (e[t].icon = n.icon);
  }), e;
};
function Zv(e) {
  const t = Wv();
  return Object.keys(e).forEach((n) => {
    if (t[n])
      if (typeof e[n] == "function")
        t[n].onClick = e[n];
      else {
        const { icon: r, ...o } = e[n];
        Ht(t[n], { attrs: { title: t[n].label } }, o), Object.prototype.hasOwnProperty.call(e[n], "icon") && (t[n].icon = r);
      }
    else
      t[n] = e[n];
  }), t;
}
function Qv(e, t = {}, n = {}) {
  const r = Zv(t), o = [];
  return Array.isArray(e) && e.forEach((a) => {
    const s = typeof a == "string" ? a : a.name, { onClick: l, ...i } = r[s] || {};
    i.attrs = Je({ ...n }, i.attrs), typeof a == "object" && Object.assign(i, a, { attrs: { ...i.attrs, ...a.attrs } }), i.name = s;
    const f = j(!1), u = j(!1), v = i.attrs.loading, b = rt(v);
    !b && v && (i.attrs.loading = u);
    const g = (m) => {
      b || (u.value = m ? v : !1);
    }, h = { label: i.label, ...typeof a == "object" ? a.meta : {} }, w = typeof a == "object" ? a.onClick : void 0, d = (m, c, p) => {
      if (f.value)
        return Promise.resolve();
      f.value = !0;
      const y = async () => {
        g(!0);
        try {
          return await c();
        } finally {
          g(!1);
        }
      };
      return m ? new Promise((_, C) => {
        let S = !1;
        const O = (A) => {
          S || (S = !0, f.value = !1, _(A));
        };
        try {
          ve("services").confirm({
            title: () => ne(m, p),
            okText: "确定",
            cancelText: "取消",
            ...W.Modal,
            onCancel: async (...A) => {
              var T, $;
              const M = await (($ = (T = W.Modal) == null ? void 0 : T.onCancel) == null ? void 0 : $.call(T, ...A));
              return O(!1), M;
            },
            afterClose: (...A) => {
              var T, $;
              return O(!1), ($ = (T = W.Modal) == null ? void 0 : T.afterClose) == null ? void 0 : $.call(T, ...A);
            },
            onOk: async () => {
              try {
                const A = await y();
                return O(A), A;
              } catch (A) {
                throw C(A), A;
              }
            }
          });
        } catch (A) {
          f.value = !1, C(A);
        }
      }) : y().finally(() => {
        f.value = !1;
      });
    };
    i.onClick = (m) => {
      const c = { ...m, meta: h };
      return w && l ? d(
        i.confirmText,
        () => w(c, async (p) => l({ ...c, ...p })),
        m
      ) : d(i.confirmText, () => {
        var p;
        return (p = l || w) == null ? void 0 : p(c);
      }, m);
    }, o.push({ ...i, pending: f });
  }), o;
}
function Vo(e, t, n, r = {}, o = () => !0) {
  var a, s;
  const { buttonProps: l, limit: i, hidden: f, disabled: u, actions: v } = e, b = e.labelMode === "icon", g = e.labelMode === "label", h = { ...(a = W.Buttons) == null ? void 0 : a.buttonProps, ...l }, w = (_) => L(() => !!(typeof _ == "function" ? _(t) : ie(_))), d = w(f), m = w(u), c = (_) => _.unauthorized ?? (_.invalidDisabled || _.roleMode === "disable" ? "disable" : _.roleMode && "hide"), p = (s = ue.buttonRoles) == null ? void 0 : s.call(ue), y = Qv(v, n || e.methods, h).flatMap((_) => {
    const C = p && _.roleName && !p.includes(_.roleName), S = c(_) ?? c(e) ?? "hide";
    if (C && S === "hide")
      return [];
    const O = w(_.hidden), A = _.disabled === void 0 ? m : w(_.disabled), T = _.attrs || {}, $ = w(T.disabled), M = L(() => !!C || A.value || $.value), P = typeof _.customRender == "string" ? r[_.customRender] : _.customRender, H = _.dropdown && L(() => {
      const B = ie(_.dropdown);
      return Te(B) ? Object.entries(B).map(([G, re]) => ({ value: G, label: re })) : typeof (B == null ? void 0 : B[0]) != "object" ? Cv(B || []).map((G) => ({ value: G, label: G })) : B;
    }), N = {
      get visible() {
        return o() && !d.value && !O.value;
      },
      get disabled() {
        return M.value;
      },
      get loading() {
        return _.pending.value || !!ie(T.loading);
      },
      async execute(B) {
        var G;
        if (!(!N.visible || N.disabled || N.loading))
          return (G = _.onClick) == null ? void 0 : G.call(_, { ...t, e: B });
      }
    }, V = L(() => {
      const B = M.value && _.disabledTooltip ? _.disabledTooltip : _.tooltip || (b && _.icon ? _.label : void 0);
      return typeof B == "function" ? B(t) : B;
    });
    return [
      {
        ..._,
        action: N,
        render: P,
        menu: H,
        tooltipTitle: V,
        onClick: N.execute,
        attrs: { ...h, ..._.attrs, disabled: L(() => N.disabled || _.pending.value) }
      }
    ];
  });
  return {
    render() {
      const _ = y.filter((S) => S.action.visible);
      if (!_.length)
        return null;
      const C = i == null ? _.length : b && _.length === i + 1 ? i + 1 : i;
      return q("actionGroup")({
        groupProps: e.attrs,
        buttons: _.slice(0, C),
        moreButtons: _.slice(C),
        defaultButtonProps: h,
        divider: e.divider,
        labelOnly: g,
        iconOnly: b,
        moreLabel: e.moreLabel,
        effectData: t
      });
    }
  };
}
const ke = /* @__PURE__ */ Z({
  __name: "ButtonGroup",
  props: {
    option: {},
    methods: {},
    effectData: {}
  },
  setup(e) {
    const t = e, n = Array.isArray(t.option) ? { actions: t.option } : t.option, r = Vo(n, k(t.effectData || {}), t.methods, we("rootSlots", {}));
    return (o, a) => (Le(), vt(Tt(() => Y(r).render())));
  }
});
function pn({ config: e, methods: t, effectData: n, isView: r }) {
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
    return (l = {}) => x(ke, { option: o, methods: t, effectData: n, ...l });
}
function Jr({ option: e, effectData: t, attrs: n }) {
  const r = e.options !== void 0;
  if (!r && !e.labelField)
    return;
  const o = n ?? e.attrs ?? {}, a = r ? fn(e.options, t).optionsRef : L(() => Y(o.options) ?? []);
  return {
    state: r ? L(() => ({ options: a.value })) : void 0,
    bindModel(s) {
      const l = s["onUpdate:labelValue"];
      l && z([() => Y(s.value), a, () => r ? void 0 : Y(o.fieldNames)], ([i, f, u]) => {
        const v = (b) => {
          var g;
          return (g = rr(f, b, e.stringifyValue, u)) == null ? void 0 : g[(u == null ? void 0 : u.label) ?? "label"];
        };
        l(Array.isArray(i) ? i.map(v) : v(i));
      }, { immediate: !0, deep: !0 });
    }
  };
}
const Xr = {
  options: Jr,
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
    const r = j([]);
    return Ye(() => {
      const o = typeof n == "function" ? n(t) : Y(n);
      Promise.resolve(o).then((a) => {
        r.value = a ?? [];
      });
    }), { state: L(() => ({ treeData: r.value })) };
  },
  switch: (e) => {
    const t = Jr(e);
    return t != null && t.state ? {
      bindModel: t.bindModel,
      state: L(() => {
        const [n = { value: !1 }, r = { value: !0 }] = t.state.value.options;
        return { switch: {
          unchecked: { value: n.value, label: n.label },
          checked: { value: r.value, label: r.label }
        } };
      })
    } : t;
  }
};
function Jv(e, t) {
  const n = e.map((r) => {
    var o;
    return (o = Xr[r]) == null ? void 0 : o.call(Xr, t);
  }).filter(Boolean);
  return {
    bindModel: (r) => n.forEach((o) => {
      var a;
      return (a = o.bindModel) == null ? void 0 : a.call(o, r);
    }),
    state: L(() => Object.assign({}, ...n.map((r) => {
      var o;
      return (o = r.state) == null ? void 0 : o.value;
    })))
  };
}
const Xv = Z({
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
    const n = Jv(e.field.processors || [], {
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
      const o = e.field, a = {
        type: o.type,
        option: e.option,
        model: e.model,
        effectData: e.effectData,
        binding: k(r),
        state: { ...e.state, ...n.state.value }
      }, s = k(o.getAttrs(e.inputAttrs, e.option, a.state));
      return o.render({ ...a, attrs: s, slots: t.slots });
    };
  }
}), ar = Z({
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
    return Ze(e.name, e.data || {}), t.slots.default;
  }
});
function em(e, t) {
  const n = we("inheritOptions", {}), r = e.option.subSpan ?? n.subSpan, o = L(() => e.model.index), a = [], s = [...e.model.children];
  for (let l = 0; l < s.length; l++) {
    const [i, f] = s[l], { type: u, align: v, span: b, hideInForm: g, exclude: h, editable: w } = i, d = i.block ?? i.blocked, m = i.breakAfter ?? i.wrapping, { parent: c, refData: p } = ee(f), y = Re({
      parent: e.effectData,
      current: c,
      field: f.refName,
      value: p,
      ...o.value !== void 0 && {
        index: o,
        record: f.refName ? c : p
      }
    });
    if (u === "Hidden" || (h ? h.includes("form") : g)) {
      nr({ option: i, model: f, effectData: y });
      continue;
    }
    const { hidden: _, required: C, attrs: S, nativeAttrs: O, disabled: A } = Pe({
      option: i,
      effectData: y,
      inheritDisabled: n.disabled
    });
    if (u === "Fragment") {
      f.children && s.splice(
        l + 1,
        0,
        ...[...f.children].map(([V, B]) => [{ ...V, hidden: _, disabled: S.disabled }, B])
      );
      continue;
    }
    let T = t(i, f, y, S, { attrs: O, disabled: A });
    if (!T)
      continue;
    if ((gn(u) || er(u)) && w !== void 0 && w !== !0) {
      const V = T, B = L(() => ze(w) ? w(y) : w), G = Gt(i, k({ ...Qe(y), isView: !0 }));
      T = () => B.value ? V() : G ? G() : p.value;
    }
    const $ = { ...i.colProps, span: b };
    Je($, { span: r }, W.Col, { span: 8 }), ($.span === 0 || $.flex) && ($.span = void 0);
    let M = T;
    const P = [...yt, "InputList", "InputGroup"].includes(u);
    if (e.fieldWrapper !== "none" && !P && (!d || i.field && i.label)) {
      const V = Nt(f.rules, y), B = L(
        () => Y(S.disabled) ? void 0 : !i.required || C.value ? V : V.slice(1)
      ), G = X(W.FormItem, i.formItemProps), re = xt(i, y);
      M = () => q("formItem")(
        k({
          ...G,
          name: f.propChain,
          rules: B,
          colon: !!re
        }),
        {
          default: T,
          label: re
        }
      );
    }
    if (P && e.fieldWrapper !== "none") {
      const V = {
        required: C,
        disabled: S.disabled,
        subSpan: i.subSpan ?? r
      };
      M = () => x(ar, { name: "inheritOptions", data: V }, T);
    }
    const H = d ?? (yt.includes(u) && !i.span), N = !H && u === "InputList" ? { ...$, span: b ?? 24 } : $;
    a.push({
      key: l,
      hidden: _,
      content: M,
      layout: {
        block: H,
        breakAfter: m,
        align: v,
        colProps: N,
        compactProps: $,
        detail: u === "Descriptions"
      }
    });
  }
  return a;
}
function tm(e, t) {
  const n = [];
  let r;
  for (const a of e)
    a.layout.block ? (n.push(a), r = void 0) : (r || n.push(r = []), r.push(a), a.layout.breakAfter && (r = void 0));
  const o = () => {
    if (t.layout === "compact")
      return e.map((l) => {
        if (l.hidden.value)
          return !1;
        const { span: i, flex: f } = l.layout.compactProps, u = Number(i) ? (Number(i) / 24 * 100).toFixed(2) + "%" : void 0;
        return x(l.content, {
          key: l.key,
          style: {
            width: u,
            flex: f ?? (i === "auto" ? "1 1 0" : void 0),
            minWidth: 0
          }
        });
      });
    const { gutter: a = 16 } = t.option, s = { gutter: a, ...t.option.rowProps };
    return n.map((l) => Array.isArray(l) ? q("row")(
      { ...s, key: l[0].key },
      {
        default: () => l.map(
          (i) => !i.hidden.value && q("col")(
            X(
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
    ) : !l.hidden.value && x(
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
    renderNodes: o,
    render: () => t.layout === "grid" ? o() : q(t.layout === "compact" ? "compactSpace" : "space")(
      X(t.layout === "compact" ? { block: !0 } : {}, t.layoutAttrs || {}),
      // 紧凑容器必须直接接收各字段，不能额外套一个组件层阻断首尾上下文。
      { default: () => o().filter(Boolean) }
    )
  };
}
const qe = Z({
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
    const n = em(e, vn), r = tm(n, e);
    return () => t.default ? t.default({ nodes: r.renderNodes().filter(Boolean) }) : e.option.isContainer && r.hasWrap ? x(
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
function vn(e, t, n, r, o) {
  const { type: a, render: s } = e;
  if (!a)
    return;
  const l = we("rootSlots", {}), i = Ct(e.slots, n), f = s ? void 0 : Fo(a), u = f == null ? void 0 : f.processors, v = (o == null ? void 0 : o.attrs) ?? r, b = k({ disabled: o == null ? void 0 : o.disabled }), g = f ? void 0 : tn(a), h = s ? typeof s == "function" ? s : l[s] : (g == null ? void 0 : g.component) || _e[a] || (f == null ? void 0 : f.component) || (f == null ? void 0 : f.render);
  let w;
  if (a === "InfoSlot")
    w = h && (() => h({ props: r, ...n }));
  else if (a === "Text")
    w = () => x("span", r, t.refData);
  else if (a === "HTML")
    w = () => x("span", { ...r, innerHTML: t.refData });
  else if (a === "Buttons")
    w = () => x(ke, { option: e, effectData: n, ...r });
  else if (yt.includes(a) || a === "InputList")
    w = () => x(_e[a], k({ option: e, model: t, effectData: n, ...r }), i);
  else if (!h)
    console.error(`组件 '${a}' 配置错误，请检查名称或'render'是否正确！`);
  else if (f && (u != null && u.length))
    w = () => x(Xv, { inputAttrs: v, state: b, field: f, option: e, model: t, effectData: n }, i);
  else {
    const d = nr({ option: e, model: t, effectData: n }), m = { ...r, ...d };
    a === "InputSlot" ? w = () => h == null ? void 0 : h(k({ props: m, ...n })) : f ? w = () => {
      const c = { type: a, option: e, model: t, effectData: n, binding: k(d), state: b }, p = k(f.getAttrs(v, e, c.state));
      return f.render({ ...c, attrs: p, slots: i });
    } : (g == null ? void 0 : g.source) === "custom" || (g == null ? void 0 : g.source) === "auto" ? w = () => x(h, k(Wo(g, m)), i) : w = () => x(h, k({ option: e, model: t, effectData: n, ...m }), i);
  }
  return w;
}
const nm = Z({
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
    const n = oe(e, "source"), { modelsMap: r } = lt(e.modelsMap, n);
    return Ze("exaProvider", { data: oe(e, "source") }), () => {
      var o;
      return x(
        "div",
        { class: ["sup-form-section sup-detail", ((o = t.attrs) == null ? void 0 : o.isContainer) && "sup-container"] },
        x(_e.Descriptions, {
          option: e.option,
          model: { children: r },
          effectData: k({ current: n }),
          isView: !0
        })
      );
    };
  }
}), Xe = Z({
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
      ...W.Descriptions,
      ...l
    }, f = Je({ gutter: e.gutter }, e.rowProps || i.rowProps, W.row, {
      gutter: 16
    }), u = {
      subSpan: e.subSpan,
      ...e.descriptionsProps,
      ...o.attrs
    }, v = Je(
      {
        subSpan: e.subSpan ?? i.subSpan,
        rowProps: f,
        ...u
      },
      i
    ), b = v.subSpan ?? (v.subSpan = ((a = W.Col) == null ? void 0 : a.span) ?? 12), g = kn(t, e, r), h = [];
    let w, d;
    g.forEach((c, p) => {
      c.node ?? (c.node = () => q("descriptions")(rm(c.group, v))), c.isBlock ? (c.group || c.option.type === "InputList" ? (d || (d = [], h.push(["section", d])), d.push(c)) : (h.push(["block", c]), d = void 0), w = void 0) : (!w && h.push(["row", w = []]), w.push(c), d = void 0);
    });
    const m = () => x(
      ar,
      { name: "gridConfig", data: v },
      () => h.map(([c, p], y) => {
        let _ = p.node;
        return c === "row" ? _ = () => q("row")(f, {
          default: () => p.map((C, S) => {
            const O = C.option.colProps || {
              span: C.option.span ?? b
            };
            return !Y(C.hidden) && q("col")({ ...W.Col, ...O, key: S }, { default: C.node });
          })
        }) : c === "section" && (_ = () => p.map((C) => !Y(C.hidden) && C.node())), !Y(p.hidden) && (h.length > 1 ? x("div", { class: "sup-form-section", key: y }, _()) : _());
      })
    );
    return n ? () => x(
      _e.Group,
      X(
        { class: "sup-form-section" },
        {
          option: e,
          model: {},
          effectData: Re({}),
          isView: !0,
          ...u
        }
      ),
      { innerContent: m }
    ) : m;
  }
});
function rm(e, t) {
  const {
    subSpan: n,
    column: r,
    layout: o,
    bordered: a,
    mode: s = a ? "table" : "default",
    rowProps: l,
    colon: i,
    size: f = "middle",
    tableLayout: u,
    labelCol: v,
    wrapperCol: b,
    ...g
  } = t, h = Math.max(1, Math.floor(Number(r) || (Number(n) ? 24 / Number(n) : 2))), w = [];
  let d = [], m = 0;
  const c = () => {
    d.length && (m < h && (d[d.length - 1].colspan += h - m), w.push(d), d = [], m = 0);
  };
  return e.forEach(({ option: p, label: y, content: _, hidden: C }, S) => {
    if (Y(C))
      return;
    const O = { ...g, ...p.formItemProps, ...p.descriptionsProps }, A = Number(O.span ?? p.span);
    let T = A ? Math.ceil(A / (24 / h)) : 1;
    T = Math.max(1, Math.min(h, T));
    const $ = {
      ...O.labelAlign && { textAlign: O.labelAlign },
      ...O.labelStyle
    }, M = { span: O.span ?? p.span, ...O.colProps || p.colProps };
    M.span === 0 || M.flex ? M.span = void 0 : Number(M.span) || (M.span = 24 / h);
    const P = {
      key: S,
      attrs: O,
      colProps: M,
      labelCol: X(v, O.labelCol, {
        style: $,
        class: { "sup-label-no-colon": O.noColon }
      }),
      wrapperCol: X(
        b,
        { style: o === "vertical" && { textAlign: O.labelAlign } },
        { style: O.contentStyle },
        O.wrapperCol
      ),
      label: y,
      content: _,
      colspan: T
    };
    m + T > h && c(), d.push(P), m += T, (p.breakAfter ?? p.wrapping) && c();
  }), c(), { attrs: g, mode: s, layout: o, rowProps: l, colon: i, size: f, tableLayout: u, column: h, rows: w };
}
function kn(e, t, n) {
  const r = [];
  let o;
  const a = we("rootSlots", {});
  return [...e].forEach(([s, l], i) => {
    var f, u, v;
    const { type: b = "", field: g, hideInDescription: h, viewRender: w, exclude: d } = s;
    if (b === "Hidden" || h || d != null && d.includes("description"))
      return;
    const { parent: m, refData: c } = Qe(k(l)), p = Re({
      parent: n,
      current: m,
      isView: !0,
      field: l.refName,
      value: c,
      text: c,
      ..."index" in l && {
        index: l.index,
        record: g ? c : m
      }
    }), { attrs: y, hidden: _ } = Pe({ option: s, effectData: p }), C = Ct(s.slots, p), S = xt(s, p);
    let O = s.block ?? s.blocked, A;
    const T = [], $ = typeof w == "string" ? a[w] : w;
    A = $ && (() => ne($, p));
    const M = l.children || ((f = l.listData) == null ? void 0 : f.modelsMap);
    if (b === "InputGroup") {
      if (!w) {
        let P = s.breakAfter ?? s.wrapping;
        const N = (u = kn(M, s, p)[0].group) == null ? void 0 : u.map(({ option: V, content: B }) => {
          const G = V.labelSlot || V.label, re = (y == null ? void 0 : y.compact) === !1 && G;
          return P = (V.breakAfter ?? V.wrapping) || P, () => x("span", [re && ne(G, p), re && ": ", B == null ? void 0 : B()]);
        });
        A = () => q("space")(
          { direction: P ? "vertical" : "horizontal" },
          {
            default: () => N == null ? void 0 : N.map((V) => V())
          }
        );
      }
      T.push({ option: s, label: S, hidden: _, content: A });
    } else if (b === "Fragment") {
      const P = kn(M, s, p), H = P[0].group;
      H && (P.shift(), T.push(...H.map((N) => ({ ...N, hidden: _ })))), P.length && (o = void 0, r.push(...P));
    } else if (l.children || l.listData || yt.includes(b)) {
      O ?? (O = !s.span);
      const P = [...yt, "InputList"].includes(b) ? b : "Group", H = _e[P], N = () => x(
        H,
        k({
          option: s,
          model: l,
          effectData: p,
          isView: !0,
          ...W[P],
          ...y
        }),
        C
      );
      A ?? (A = N), b === "InputList" && (!O || S && !(y != null && y.labelIndex) ? T.push({
        option: { ...s },
        label: S,
        hidden: _,
        content: A
      }) : A = N);
    } else {
      const P = am(s, l, p);
      P && T.push({ option: s, label: S, hidden: _, content: P });
    }
    if (!(!T.length && !A))
      if (T.length && !O)
        o || (o = [], r.push({ option: t, isBlock: !0, group: o })), o.push(...T);
      else {
        if (T.length && S)
          r.push({ option: t, isBlock: O, group: T });
        else {
          const P = s.align && { textAlign: s.align };
          A = ((v = T[0]) == null ? void 0 : v.content) || A, r.push({
            option: s,
            isBlock: O,
            node: () => x(A, { style: P }),
            hidden: _
          });
        }
        o = void 0;
      }
  }), r;
}
function am(e, t, n) {
  const { parent: r, refData: o } = Qe(k(t)), a = t.refName ? o : void 0, s = ee(r.value) === ee(n.current) ? n : Re({
    parent: n,
    current: r,
    text: a,
    value: a,
    field: t.refName,
    isView: !0
  }), l = Gt(e, s);
  return l === !1 ? void 0 : () => l ? l() : String(t.refData ?? "");
}
const Cn = Z({
  inheritAttrs: !1,
  props: {
    option: { type: Object, required: !0 },
    model: { type: Object, required: !0 },
    effectData: Object,
    isView: Boolean
  },
  setup({ option: e, model: t, effectData: n, isView: r }, o) {
    const { type: a, label: s, title: l = s, buttons: i, contentAttrs: f } = e, u = a === "Descriptions" || r;
    let v;
    if (i) {
      const b = Array.isArray(i) ? { actions: i } : i;
      a === "Descriptions" && (b.visibleIn ?? (b.visibleIn = b.validOn ?? "detail")), v = pn({
        config: b,
        effectData: n,
        isView: u
      });
    }
    return () => {
      const { style: b, class: g, ...h } = o.attrs, w = o.slots.title || (l ? xt(e, n) : void 0), d = o.slots.extra || o.slots.actions || v, m = (i == null ? void 0 : i.placement) === "bottom" ? "bottom" : "title";
      return q("group")({
        attrs: { class: g, style: b },
        contentAttrs: f,
        component: e.component && ee(e.component),
        slots: o.slots,
        title: w,
        extra: d,
        extraPlacement: m,
        extraAlign: (i == null ? void 0 : i.align) || (m === "bottom" ? "center" : w ? "right" : void 0),
        content: () => o.slots.innerContent ? o.slots.innerContent(h) : o.slots.default ? o.slots.default() : u ? x(Xe, {
          option: { descriptionsProps: h, ...e },
          modelsMap: t.children,
          effectData: n
        }) : x(qe, { option: e, model: t, effectData: n })
      });
    };
  }
}), qo = {
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
    const a = Be(), s = j({}), {
      option: { onSubmit: l, onReset: i, buttons: f, ...u },
      ignoreRules: v,
      compact: b
    } = e, g = k({ formData: s, current: s }), { attrs: h } = Pe({ option: u, effectData: g }), w = /* @__PURE__ */ new Set(), d = (T) => {
      if (T)
        return w.add(T), () => w.delete(T);
    }, m = async (T) => {
      if (!a.value || v || !T.length)
        return;
      const $ = ve("form");
      if (!$.validateField)
        throw new Error("当前 UIAdapter 未实现 form.validateField");
      await $.validateField(a.value, T);
    }, c = () => {
      a.value && ve("form").clearValidate(a.value);
    };
    Ze("exaProvider", {
      data: _a(s),
      attrs: h,
      onSubmit: d,
      validateField: m
    }), Ze("inheritOptions", {
      disabled: h.disabled,
      subSpan: u.subSpan
    });
    const p = (T) => Promise.all(
      [...w, l].map(async ($) => {
        const M = await ($ == null ? void 0 : $(T));
        return M === !1 || M && M.errMessage ? Promise.reject({ message: M && M.errMessage }) : M;
      })
    );
    v && Object.assign(h, { hideRequiredMark: !0, validateTrigger: "none" });
    const y = {
      dataSource: s,
      getNativeInstance: () => a.value,
      async validate() {
        if (!a.value)
          throw new Error("表单尚未挂载或已卸载");
        await ve("form").validate(a.value);
      },
      validateField: m,
      clearValidate: c,
      async submit() {
        await y.validate();
        try {
          await p(s.value);
        } catch ($) {
          throw $ && typeof $ == "object" && "message" in $ && $.message && ve("services").message("error", $.message), $;
        }
        const T = We(s.value);
        return n("submit", T), T;
      },
      setFieldsValue(T) {
        return c(), Uo(s.value, T, S);
      },
      resetFields(T = {}) {
        No(s.value, T, S), c();
        const $ = We(s.value);
        return i == null || i($), n("reset", $), $;
      }
    }, _ = Array.isArray(f) ? { actions: f } : f;
    (o = _ == null ? void 0 : _.actions) != null && o.length && (u.subItems = [
      ...u.subItems,
      {
        type: "InfoSlot",
        align: _.align || "center",
        block: !0,
        render: () => x(ke, {
          option: _,
          methods: {
            submit: y.submit,
            reset: y.resetFields,
            search: y.submit
          },
          effectData: g
        }),
        ..._.placement === "inline" && {
          span: "auto",
          block: !1,
          align: _.align || "right"
        }
      }
    ]);
    const { modelsMap: C } = ht(u.subItems, s), S = We(s.value);
    z(
      () => Y(e.dataSource ?? e.option.dataSource),
      (T) => {
        T && (c(), s.value = T);
      },
      { immediate: !0, flush: "sync" }
    );
    const O = k({ ...y }), A = (T) => {
      if (a.value = T, !T) {
        n("register", null);
        return;
      }
      n("register", O);
    };
    return Sa(() => {
      w.clear(), a.value = void 0;
    }), t(O), () => q("form")(
      {
        ref: A,
        class: ["sup-form", b && "sup-form-compact", v && "sup-form-simple"],
        model: s.value,
        labelAlign: "right",
        ...h
      },
      {
        ...r,
        default: () => x(qe, {
          option: u,
          model: { refData: s, children: C },
          effectData: g
        })
      }
    );
  }
}, om = Z({
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
    const { option: r, model: o, compact: a } = e, { slots: s } = r;
    let l = o, i = Nt(o.rules, e.effectData), f = oe(o, "propChain");
    const u = {}, v = {
      type: "object",
      required: !1,
      fields: {}
    }, b = o.refName !== void 0 || o.index !== void 0;
    if (o.children && a) {
      for (const c of o.children.values())
        if ((n = c.rules) != null && n.length && c.fieldName) {
          c.rules[0].required && (v.required = !0);
          const p = k({
            ...e.effectData,
            parent: e.effectData,
            current: oe(c, "parent"),
            field: c.fieldName,
            value: oe(c, "refData")
          }), y = v.fields[c.fieldName] = Nt(c.rules, p);
          if (!b) {
            f = oe(c, "propChain"), i = y, l = c;
            break;
          }
        }
    } else
      u.style = "margin: 0";
    b && (i = (i || []).concat([v])), i || (i = []), u.required = i.some((c) => c.required);
    const g = we("inheritOptions", {}), h = L(
      () => e.disabled ? void 0 : !r.required || Y(g.required) ? i : i.slice(1)
    ), w = X(W.FormItem, r.formItemProps, u), d = xt(r, e.effectData), m = we("exaProvider", {});
    return z(
      () => Y(l.refData),
      () => {
        var c, p;
        !e.disabled && ((c = h.value) != null && c.length) && ((p = m.validateField) == null || p.call(m, f.value).catch(() => {
        }));
      },
      { deep: !0, flush: "post" }
    ), () => q("formItem")(
      {
        ...w,
        rules: h.value,
        name: f.value
      },
      {
        label: d,
        default: (s == null ? void 0 : s.default) || (() => x(qe, {
          option: r,
          model: o,
          effectData: e.effectData,
          layout: a ? "compact" : "space",
          fieldWrapper: a ? "none" : "formItem",
          layoutAttrs: t
        }))
      }
    );
  }
});
function mn(e, t) {
  const n = Array.isArray(t) ? { actions: t } : t;
  return {
    ...e,
    ...n,
    buttonProps: { ...e.buttonProps, ...n == null ? void 0 : n.buttonProps }
  };
}
const sm = Z({
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
    const { model: t, option: n, isView: r, effectData: o, labelIndex: a } = e, { columns: s, rowButtons: l, label: i, labelSlot: f, compact: u, slots: v, ...b } = n, { modelsMap: g } = t.listData, h = s[0], w = g.get(h), d = s.length === 1 && h.field === "$index", m = !a && (i || f), c = oe(t, "refData");
    let p = [];
    const y = {
      add: {
        onClick({ index: A }) {
          c.value.splice(A + 1, 0, d ? void 0 : {}), p.splice(A + 1, 0, void 0);
        },
        icon: () => ye("add")
      },
      delete: {
        disabled: () => c.value.length === 1,
        confirmText: "",
        icon: () => ye("remove"),
        onClick({ index: A }) {
          c.value.splice(A, 1), p.splice(A, 1);
        }
      }
    }, _ = !r && l !== !1 && mn(
      {
        type: "Buttons",
        colProps: { flex: "0" },
        labelMode: "icon",
        ...W.rowButtons,
        methods: y,
        actions: ["add", "delete"]
      },
      l
    ), C = Be([]), S = (A, T) => {
      const $ = [...t.propChain, T], M = k({ ...d ? w : {}, index: T, parent: c, propChain: $ }), P = d ? L({
        get: () => c.value[M.index],
        set: (B) => {
          c.value[M.index] = B;
        }
      }) : j(A);
      M.refData = P;
      const H = /* @__PURE__ */ new Map();
      let N;
      d ? (N = { ...h }, Object.assign(M, { initialValue: w.initialValue, rules: w.rules })) : g.size === 1 && !h.field && [...yt, "InputGroup", "InputList"].includes(h.type) ? (N = { ...h }, Object.assign(M, {
        initialValue: w.initialValue,
        rules: w.rules,
        listData: w.listData,
        children: lt(w.children || /* @__PURE__ */ new Map(), P, $).modelsMap
      })) : (N = { type: u ? "InputGroup" : "Group", initialValue: void 0, span: "auto" }, M.children = lt(g, P, $).modelsMap), H.set(N, M), a && (N.label ?? (N.label = i), N.labelSlot ?? (N.labelSlot = f || (({ index: B }) => N.label + String(B + 1)))), _ && H.set(_, k({ parent: c, index: T }));
      const V = k({ parent: c, children: H, index: T, propChain: $ });
      return {
        children: V.children,
        model: V,
        refData: P,
        key: bt(12),
        effectData: k({ parent: o, current: c, index: T })
      };
    };
    if (d)
      z(
        [() => c.value, () => c.value.length, () => [...t.propChain]],
        () => {
          c.value.length === 0 && c.value.push(void 0), C.value = c.value.map((A, T) => {
            const $ = p[T];
            return $ ? (Ut($.model, [...t.propChain, T], T), $.effectData.index = T, $) : S(A, T);
          }), p = [...C.value];
        },
        { immediate: !0 }
      );
    else {
      const A = /* @__PURE__ */ new WeakMap();
      z(
        [() => [...c.value], () => c.value.length, () => [...t.propChain]],
        () => {
          c.value.length === 0 && c.value.push({}), C.value = c.value.map((T, $) => {
            let M = A.get(ee(T));
            return M ? (M.refData.value = T, Ut(M.model, [...t.propChain, $], $), M.effectData.index = $) : (M = S(T, $), A.set(ee(T), M)), M;
          });
        },
        { immediate: !0 }
      );
    }
    const O = () => C.value.map(({ model: A, effectData: T, key: $ }) => x(qe, { model: A, option: { subSpan: "auto", ...n }, effectData: T, key: $ }));
    if (r) {
      if (m)
        if (d) {
          const { label: $, labelSlot: M = $ } = s[0], P = s[0].breakAfter ?? s[0].wrapping;
          return () => q("space")(
            { direction: P ? "vertical" : "horizontal" },
            {
              default: () => C.value.map(({ refData: H, key: N }, V) => {
                const B = {
                  ...o,
                  parent: o,
                  current: c.value,
                  field: s[0].field,
                  value: H.value,
                  index: V,
                  record: H.value
                };
                return x("span", { key: N }, [ne(M, B), M ? ": " : "", H.value]);
              })
            }
          );
        } else
          return () => C.value.map(({ children: $, key: M }) => x(Xe, {
            key: M,
            modelsMap: $,
            option: n,
            effectData: o
          }));
      const A = {}, T = L(() => new Map(C.value.flatMap(({ children: $ }) => [...$])));
      return () => x(Xe, {
        option: { ...b, label: i, labelSlot: f },
        modelsMap: T.value,
        effectData: o,
        ...A
      });
    } else if (m) {
      const A = /* @__PURE__ */ new Map([
        [
          {
            ...b,
            formItemProps: { ...b.formItemProps, style: "margin: 0" },
            label: i,
            labelSlot: f,
            type: "InfoSlot",
            block: !1,
            span: 24,
            // FormItem 对单个与多个子节点采用不同包装；固定根节点，避免 1/2 行切换时重挂首行并清除校验状态。
            render: () => x("div", O())
          },
          t
        ]
      ]);
      return () => x(qe, { model: { children: A }, option: n, effectData: o });
    } else
      return O;
  }
}), lm = Z({
  inheritAttrs: !1,
  props: {
    option: { type: Object, required: !0 },
    model: { type: Object, required: !0 },
    effectData: Object,
    isView: Boolean
  },
  setup(e, { attrs: t, slots: n }) {
    return () => {
      const { option: r, model: o, effectData: a, isView: s } = e, { title: l = r.label, buttons: i } = r;
      return q("card")({
        attrs: t,
        slots: n,
        title: n.title || (l ? () => ne(l, a) : void 0),
        extra: n.extra || (i && !s ? () => x(ke, { option: i, effectData: a }) : void 0),
        content: n.default || (() => s ? x(Xe, { option: r, modelsMap: o.children, effectData: a }) : x(qe, { option: r, model: o, effectData: a }))
      });
    };
  }
}), im = Z({
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
    const o = j(), a = Zt({
      ...e.schema,
      dataSource: e.dataSource || e.model || ((n = e.schema) == null ? void 0 : n.dataSource),
      attrs: X({ ...W.Form }, { ...(r = e.schema) == null ? void 0 : r.attrs })
    });
    ue.schemaDiagnostics && e.schema && Bt(e.schema, "form", "SuperForm");
    const s = {
      setOption: (u) => {
        var v;
        ue.schemaDiagnostics && Bt(u, "form", "SuperForm"), Je(a, u), a.attrs = X(a.attrs, { ...u.attrs }, { ...(v = e.schema) == null ? void 0 : v.attrs });
      }
    };
    Ze("rootSlots", t.slots), t.emit("register", s);
    const l = (u) => {
      o.value = u, t.emit("register", s, u);
    };
    ya(() => t.expose(o.value));
    const i = L(() => e.isContainer || a.isContainer);
    return () => a.subItems && x(
      _e.Form,
      {
        option: a,
        // dataSource: formData.value,
        onRegister: l,
        compact: e.compact,
        ignoreRules: e.ignoreRules,
        class: { "sup-container": i.value }
      },
      Ct(a.slots, Re(), t.slots)
    );
  }
});
function um(e) {
  const [t, n] = Bo(), r = Promise.resolve(typeof e == "function" ? e() : e), o = (s, l) => {
    if (s)
      t.value || r.then(s.setOption), t.value = l;
    else
      return (i, f) => x(im, { ...i, onRegister: o }, f == null ? void 0 : f.slots);
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
      dataSource: L(() => {
        var s;
        return (s = t.value) == null ? void 0 : s.dataSource;
      }),
      getForm: n,
      asyncCall: a,
      getData() {
        var s;
        return ie((s = t.value) == null ? void 0 : s.dataSource);
      },
      submit: () => a("submit"),
      validate: () => a("validate"),
      validateField: (s) => a("validateField", s),
      clearValidate: () => a("clearValidate"),
      getNativeInstance: () => a("getNativeInstance"),
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
function or(e, { buttons: t, ...n } = {}) {
  const r = j(!1), o = k({ ...n, ...W.Modal }), a = j(), s = t && (() => x(ke, { option: t, effectData: { modalRef: a } })), l = j(!1), i = () => {
    if (!(l.value || u))
      return l.value = !0, Promise.resolve().then(() => {
        var m;
        return (m = o.onOk) == null ? void 0 : m.call(o);
      }).then((m) => {
        m !== !1 && (r.value = !1);
      }).catch((m) => console.error(m)).finally(() => l.value = !1);
  }, f = () => o.icon ? [o.icon(), ne(o.title)] : ne(o.title);
  let u;
  const v = (...m) => l.value ? Promise.resolve(!1) : u || (u = Promise.resolve().then(() => {
    var c;
    return (c = o.onCancel) == null ? void 0 : c.call(o, ...m);
  }).then((c) => (c !== !1 && (r.value = !1), c)).catch((c) => (console.error(c), !1)).finally(() => {
    u = void 0;
  })), b = (m) => {
    if (m)
      r.value = !0;
    else if (r.value)
      return v();
  };
  return {
    config: o,
    modalRef: a,
    modalSlot: (m, c) => q("modal")(
      {
        ref: a,
        visible: r.value,
        class: "sup-modal",
        "onUpdate:visible": b,
        confirmLoading: l.value,
        ...o,
        title: void 0,
        ...m,
        onOk: i,
        onCancel: v
      },
      { footer: s, title: f, ...c == null ? void 0 : c.slots, ...e && { default: e } }
    ),
    setModal: (m) => {
      Object.assign(o, m);
    },
    closeModal: () => (r.value = !1, Ve()),
    openModal: async (m) => (Object.assign(o, m), r.value = !0, Ve())
  };
}
function zo(e, t) {
  var n;
  const { modalSlot: r, openModal: o, modalRef: a, closeModal: s, setModal: l, config: i } = or(e, t), f = wa(), u = document.createElement("div");
  document.body.appendChild(u);
  let v;
  const b = st().modal, g = (n = b == null ? void 0 : b.useContext) == null ? void 0 : n.call(b), h = (m) => {
    var c;
    return ((c = b == null ? void 0 : b.wrapContext) == null ? void 0 : c.call(
      b,
      (p = {}) => r({ ...m, ...p }, {}),
      g,
      m
    )) ?? r(m, {});
  }, w = () => {
    On(null, u), u.remove(), v = null;
  };
  return Nn(() => {
    v && w();
  }), {
    modalRef: a,
    openModal: (m) => {
      if (a.value)
        return o(m);
      if (v = Ca(h), v.appContext = f == null ? void 0 : f.appContext, On(v, u), i.destroyOnClose) {
        const c = i.afterClose;
        l({
          afterClose() {
            c == null || c(), w();
          }
        });
      }
      return Ve(() => o(m));
    },
    modalSlot: r,
    closeModal: s,
    setModal: l
  };
}
function _b(e, t = {}) {
  const { title: n, ...r } = e, [o, a] = um(r), s = zo(o(), { maskClosable: !1, title: n, ...t });
  return { ...s, openModal: ({ data: i, onOk: f = t.onOk, ...u } = {}) => {
    const v = () => a.submit().then((b) => f ? f(b) : b);
    return a.resetFields(i), s.openModal({ ...u, onOk: v });
  }, formActions: a };
}
const xn = Z({
  name: "CollectionList",
  inheritAttrs: !1,
  props: {
    option: { type: Object, required: !0 },
    model: { type: Object, required: !0 },
    effectData: { type: Object, required: !0 },
    isView: Boolean
  },
  setup(e, { attrs: t, slots: n }) {
    const r = oe(e.model, "refData"), o = Be([]), a = /* @__PURE__ */ new WeakMap(), s = j(), l = j([]), i = j(), f = j({}), u = j(0), v = e.option.editModal && or(
      () => {
        var c, p, y;
        return x(qo, {
          key: u.value,
          option: {
            ...(c = e.option.editModal) == null ? void 0 : c.form,
            subItems: ((y = (p = e.option.editModal) == null ? void 0 : p.form) == null ? void 0 : y.subItems) || e.option.columns
          },
          dataSource: f.value,
          onRegister: (_) => {
            i.value = _;
          }
        });
      },
      { maskClosable: !1, ...e.option.editModal.modalProps }
    ), b = (c) => {
      Ve(() => {
        const p = o.value.find((y) => ee(y.model.refData) === ee(c));
        p && (e.option.type === "TabList" && (s.value = p.key), e.option.type === "CollapseList" && !l.value.includes(p.key) && (l.value = [...l.value, p.key]));
      });
    }, g = (c, p) => {
      var y, _;
      if (!(e.isView || !v))
        return f.value = We((c == null ? void 0 : c.model.refData) || {}), u.value++, v.openModal({
          title: ((_ = (y = e.option.editModal) == null ? void 0 : y.modalProps) == null ? void 0 : _.title) || (c ? "编辑" : "新增"),
          onOk: async () => {
            if (e.isView)
              return;
            const C = await i.value.submit();
            if (c) {
              const S = o.value.indexOf(c);
              if (S < 0)
                throw new Error("当前记录已删除");
              Object.assign(r.value[S], C);
            } else {
              const S = C;
              if (p === null)
                r.value.unshift(S);
              else {
                const O = o.value.indexOf(p);
                if (O < 0)
                  throw new Error("新增位置对应的记录已删除");
                r.value.splice(O + 1, 0, S);
              }
              b(S);
            }
          }
        });
    }, h = {
      add: ({ listItemKey: c } = {}) => {
        if (e.isView)
          return;
        const p = o.value.find((_) => _.key === c);
        if (c !== void 0 && !p)
          throw new Error("新增位置对应的记录已删除");
        if (v)
          return g(void 0, p || null);
        const y = {};
        p ? r.value.splice(o.value.indexOf(p) + 1, 0, y) : r.value.unshift(y), b(y);
      },
      edit: ({ listItemKey: c }) => {
        const p = o.value.find((y) => y.key === c);
        if (p)
          return g(p);
      },
      delete: ({ listItemKey: c }) => {
        const p = o.value.findIndex((y) => y.key === c);
        !e.isView && p >= 0 && r.value.splice(p, 1);
      }
    }, w = we("rootSlots", {}), d = (c, p, y) => {
      if (c !== !1)
        return Vo(
          mn({ ...W.rowButtons, actions: y }, c),
          p,
          h,
          w,
          () => !e.isView
        );
    }, m = d(e.option.buttons, e.effectData, ["add"]);
    return z(
      [() => [...r.value], () => [...e.model.propChain]],
      () => {
        var c;
        const p = o.value, y = p.findIndex((O) => O.key === s.value), _ = /* @__PURE__ */ new Map(), C = /* @__PURE__ */ new Set();
        o.value = r.value.map((O, A) => {
          const T = ee(O), $ = _.get(T) || 0;
          _.set(T, $ + 1);
          const M = a.get(T) || [];
          let P = M[$];
          if (!P) {
            const H = j(O), { modelsMap: N } = lt(e.model.listData.modelsMap, H, e.model.propChain, A);
            P = {
              key: $ ? bt(12) : Me(O, String(t.rowKey || "id")) ?? bt(12),
              model: k({ refData: H, children: N, index: A, propChain: [...e.model.propChain, A] }),
              effectData: k({ parent: e.effectData, current: r, index: A, record: O })
            }, P.buttons = d(
              e.option.rowButtons,
              P.effectData,
              v ? ["add", "edit", "delete"] : ["add", "delete"]
            ), M[$] = P, a.set(T, M);
          }
          return C.has(P.key) && (P.key = bt(12)), C.add(P.key), P.effectData.listItemKey = P.key, P.model.refData = O, P.effectData.record = O, Ut(P.model, [...e.model.propChain, A], A), P.effectData.index = A, P;
        }), o.value.some((O) => O.key === s.value) || (s.value = (c = o.value[Math.min(Math.max(y, 0), o.value.length - 1)]) == null ? void 0 : c.key);
        const S = p.findIndex(
          (O) => l.value.includes(O.key) && !o.value.some((A) => A.key === O.key)
        );
        if (l.value = l.value.filter((O) => o.value.some((A) => A.key === O)), S >= 0 && o.value.length) {
          const O = o.value[Math.min(S, o.value.length - 1)].key;
          l.value.includes(O) || l.value.push(O);
        }
      },
      { immediate: !0 }
    ), () => {
      const { option: c, isView: p } = e, { span: y = 24 } = t, _ = { ...t };
      delete _.rowKey, delete _.span;
      const C = c.title ?? c.label, S = !p && m ? () => m.render() : void 0, O = n.title || C || S ? () => q("space")(
        {},
        {
          default: () => [n.title ? n.title() : ne(C, e.effectData), S == null ? void 0 : S()]
        }
      ) : void 0, A = o.value.map(($, M) => ({
        key: $.key,
        title: () => ne(c.titleField ? Me($.model.refData, c.titleField) : String(M + 1), $.effectData),
        extra: !p && c.type !== "TabList" && $.buttons ? () => $.buttons.render() : void 0,
        content: () => p || v ? x(Xe, { option: c, modelsMap: $.model.children, effectData: $.effectData }) : x(qe, { option: c, model: $.model, effectData: $.effectData })
      })), T = () => A.length ? c.type === "TabList" ? q("tabs")({
        attrs: _,
        items: A,
        activeKeys: s.value,
        onActiveChange: ($) => {
          s.value = $;
        },
        extra: p ? void 0 : () => {
          var $, M;
          return (M = ($ = o.value.find((P) => P.key === s.value)) == null ? void 0 : $.buttons) == null ? void 0 : M.render();
        }
      }) : c.type === "CollapseList" ? q("collapse")({
        attrs: _,
        items: A,
        activeKeys: l.value,
        onActiveChange: ($) => {
          l.value = Array.isArray($) ? $ : [$];
        }
      }) : q("row")(
        { gutter: c.gutter ?? [16, 16], ...c.rowProps },
        {
          default: () => A.map(
            ($) => q("col")(
              { key: $.key, span: y },
              {
                default: () => q("card")({
                  attrs: _,
                  title: $.title,
                  extra: $.extra,
                  content: $.content
                })
              }
            )
          )
        }
      ) : q("empty")();
      return [q("group")({ title: O, content: T }), v && x(v.modalSlot)];
    };
  }
}), cm = Z({
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
    const { model: n, isView: r, effectData: o, labelIndex: a, rowKey: s = "" } = e, { columns: l, rowButtons: i, slots: f, ...u } = e.option, { modelsMap: v, rules: b } = n.listData, g = oe(n, "refData"), h = {
      add: {
        icon: () => ye("add"),
        onClick({ index: y }) {
          g.value.splice(y + 1, 0, {}), g.value = [...ee(g.value)];
        }
      },
      delete: {
        hidden: () => g.value.length === 1,
        disabled: !1,
        confirmText: "",
        icon: () => ye("remove"),
        onClick({ index: y }) {
          g.value = g.value.filter((_, C) => C !== y);
        }
      }
    }, w = !r && i !== !1 && mn(
      {
        type: "Buttons",
        labelMode: "icon",
        ...W.rowButtons,
        methods: h,
        actions: ["add", "delete"]
      },
      i
    ), d = /* @__PURE__ */ new WeakMap(), m = j([]);
    z(
      [() => [...g.value], () => [...n.propChain]],
      () => {
        const y = g.value;
        y.length === 0 && y.push({}), m.value = y.map((_, C) => {
          const S = ee(_), O = d.get(S);
          if (O)
            return O.refData.value = _, Ut(O.model, [...n.propChain, C], C), O.effectData.index = C, O;
          const A = j(_), { modelsMap: T } = lt(v, A, n.propChain, C), $ = {
            key: _[s] || bt(12),
            refData: A,
            model: k({ refData: A, children: T, index: C, propChain: [...n.propChain, C] }),
            effectData: k({
              parent: o,
              current: g,
              index: C,
              record: _
            })
          };
          return d.set(S, $), $;
        });
      },
      {
        immediate: !0
      }
    );
    const c = {
      ...u,
      type: "Group",
      buttons: w,
      subItems: l
    }, p = u.title || u.label;
    return typeof p == "string" && a && (c.title = ({ index: y }) => p + String(y + 1)), () => m.value.map(({ model: y, effectData: _, key: C }) => x(_e.Group, { model: y, option: c, effectData: _, key: C, isView: r }, t.slots));
  }
}), dm = /* @__PURE__ */ Z({
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
    const r = j(e.option.activeKey), o = [], a = (l, i, f) => {
      o[l] = f ? void 0 : i, f && r.value === i && (r.value = o.find(Boolean));
    }, s = [...e.model.children].map(([l, i], f) => {
      const {
        key: u,
        field: v,
        label: b,
        icon: g
      } = l, h = Re({
        parent: e.effectData,
        current: oe(i, "parent"),
        field: i.refName,
        value: i.refData
      }), {
        hidden: w,
        attrs: d
      } = Pe({
        option: l,
        effectData: h
      }), m = u || v || String(f), c = () => [g == null ? void 0 : g(), ne(b, h)];
      return Ye(() => a(f, m, Y(w) || Y(d.disabled))), {
        attrs: k(d),
        key: m,
        title: c,
        hidden: w,
        option: l,
        model: i,
        effectData: h
      };
    });
    return ya(() => {
      r.value ?? (r.value = o.find(Boolean));
    }), () => q("tabs")({
      attrs: t,
      slots: n,
      content: n.default,
      activeKeys: r.value,
      onActiveChange: (l) => {
        r.value = l;
      },
      extra: n.extra || (!e.isView && e.option.buttons ? () => x(ke, {
        option: e.option.buttons,
        effectData: e.effectData
      }) : void 0),
      // 显隐和禁用属于 Schema 语义，两个 Adapter 消费相同的有效子项。
      items: s.filter(({
        hidden: l
      }) => !l.value).map(({
        attrs: l,
        key: i,
        title: f,
        option: u,
        model: v,
        effectData: b
      }) => ({
        key: i,
        attrs: l,
        title: f,
        disabled: Y(l.disabled),
        content: () => e.isView ? x(Xe, {
          option: u,
          modelsMap: v.children,
          effectData: b
        }) : x(qe, {
          option: u,
          model: v,
          effectData: b
        })
      }))
    });
  }
}), Pt = (e, ...t) => Jp(e, ...t, (n, r, o, a) => {
  if (r === void 0)
    a[o] = void 0;
  else if (Array.isArray(n))
    return r;
});
function fm({
  childrenMap: e,
  orgList: t,
  listener: n,
  rowEditor: r,
  rowKey: o
}) {
  const a = Be(), s = L(() => {
    var d;
    return !!((d = a.value) != null && d.isEdit);
  }), l = (d) => {
    const m = a.value;
    return m != null && m.isEdit && o(d) === m.key ? m : {
      isEdit: !1
    };
  }, i = L(() => {
    const d = [...t.value], m = a.value;
    if (!(m != null && m.isEdit))
      return d;
    if (m.isNew) {
      const c = m.anchorKey === void 0 ? d.length - 1 : d.findIndex((p) => o(p) === m.anchorKey);
      d.splice(c < 0 ? Math.min(m.index, d.length) : c + 1, 0, m.record);
    } else
      d.some((c) => o(c) === m.key) || d.splice(Math.min(m.index, d.length), 0, m.record);
    return d;
  }), f = (d, m, c) => {
    const p = k(We(m)), {
      modelsMap: y
    } = ko(ee(e), p);
    a.value = Zt({
      record: d,
      key: o(d),
      editData: p,
      modelsMap: y,
      forms: Zt({}),
      isEdit: !0,
      saving: !1,
      ...c
    });
  }, u = {
    add({
      index: d,
      record: m,
      resetData: c
    } = {}) {
      if (s.value)
        return;
      const p = m ?? (d === void 0 ? void 0 : t.value[d]);
      if (d !== void 0 && !p)
        throw new Error("新增位置已失效，请重新选择插入位置");
      const y = {
        ...c
      }, _ = p && o(p), C = p ? t.value.findIndex((S) => o(S) === _) + 1 : t.value.length;
      f(y, y, {
        isNew: !0,
        index: C,
        anchorKey: _
      });
    },
    edit({
      record: d,
      selectedRows: m,
      resetData: c
    }) {
      if (s.value)
        return;
      const p = d || (m == null ? void 0 : m[0]), y = p ? t.value.findIndex((_) => o(_) === o(p)) : -1;
      if (y < 0)
        throw new Error("编辑记录已不存在，请重新选择");
      f(t.value[y], Pt({}, t.value[y], c), {
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
      onClick: u.add
    },
    edit: {
      disabled: (d) => {
        var m;
        return s.value || !(d.record || ((m = d.selectedRows) == null ? void 0 : m.length) === 1);
      },
      onClick: u.edit
    },
    delete: {
      disabled: (d) => {
        var m;
        return s.value || !(d.record || ((m = d.selectedRows) == null ? void 0 : m.length) > 0);
      },
      onClick: u.delete
    }
  }, b = [{
    label: "保存",
    loading: !0,
    onClick: async (d) => {
      var m;
      const {
        record: c
      } = d, p = l(c);
      if (!(!p.isEdit || p.saving)) {
        p.saving = !0;
        try {
          const y = ve("form");
          if (await Promise.all(Object.values(p.forms).map((S) => y.validate(S))), await ((m = r == null ? void 0 : r.onSave) == null ? void 0 : m.call(r, {
            ...d,
            isNew: p.isNew
          })) === !1)
            return !1;
          const C = We(ee(p.editData));
          if (p.isNew) {
            const S = p.anchorKey === void 0 ? void 0 : t.value.findIndex((O) => o(O) === p.anchorKey);
            if (S === -1)
              throw new Error("新增锚点已不存在，请取消后重新选择插入位置");
            await n.onSave(C, S), p.isNew = !1;
          } else {
            const S = t.value.find((O) => o(O) === p.key);
            if (!S)
              throw new Error("编辑记录已被移除，请取消本次编辑");
            await n.onUpdate(C, S);
          }
          p.isEdit = !1, a.value = void 0;
        } catch (y) {
          throw y instanceof Error && ve("services").message("error", y.message), y;
        } finally {
          p.saving = !1;
        }
      }
    }
  }, {
    label: "取消",
    disabled: ({
      record: d
    }) => l(d).saving,
    onClick: async (d) => {
      var m;
      const c = l(d.record);
      if (!(!c.isEdit || c.saving)) {
        c.saving = !0;
        try {
          if (await ((m = r == null ? void 0 : r.onCancel) == null ? void 0 : m.call(r, {
            ...d,
            isNew: c.isNew
          })) === !1)
            return;
          c.isEdit = !1, a.value = void 0;
        } finally {
          c.saving = !1;
        }
      }
    }
  }], g = (d, m) => l(d.record).isEdit ? x(ke, {
    key: "edit",
    option: {
      ...m,
      actions: b
    },
    effectData: d
  }) : null, h = /* @__PURE__ */ Z({
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
      viewRender: c
    }) {
      const {
        editable: p = !0
      } = d, {
        modelsMap: y,
        forms: _
      } = m, C = y.get(ee(d)), {
        index: S,
        parent: O,
        refData: A
      } = Qe(C), T = C.propChain.join("."), $ = Re({
        current: O,
        value: A,
        index: S
      }), {
        attrs: M,
        hidden: P,
        nativeAttrs: H,
        disabled: N
      } = Pe({
        option: d,
        effectData: $
      }), V = L(() => !P.value && (ze(p) ? p($) : p)), B = vn(d, C, $, M, {
        attrs: H,
        disabled: N
      }), G = Nt(C.rules, $), re = L(() => Y(M.disabled) || Y(P) ? [] : G);
      return () => V.value ? q("form")({
        ref: (F) => {
          F ? _[T] = F : delete _[T];
        },
        model: m.editData
      }, {
        default: () => q("formItem")({
          name: C.propChain,
          rules: re.value,
          wrapperCol: {}
        }, {
          default: B
        })
      }) : c ? c({
        ...$,
        isView: !0
      }) : A.value;
    }
  });
  return {
    list: i,
    methods: u,
    buttonMethods: v,
    getEditRender: (d, m) => {
      if (sr(d.type) === "enhanced" || gn(d.type) || d.type === "InputSlot")
        return ({
          record: c
        }) => {
          const p = l(c);
          if (p.isEdit)
            return x(h, {
              key: p.key,
              option: d,
              editInfo: p,
              viewRender: m
            });
        };
    },
    editButtonsSlot: g
  };
}
function pm({ rowKey: e, option: t, listener: n, orgList: r }) {
  const o = Be(), a = t.rowEditor, s = (a == null ? void 0 : a.form) || t.editForm || t.formSchema || {};
  s.subItems = s.subItems || t.columns.filter((d) => {
    var m;
    return !(d.hideInForm || (m = d.exclude) != null && m.includes("form"));
  });
  let l;
  const i = (d) => {
    o.value ? o.value.resetFields(d) : l = d;
  }, f = () => x(_e.Form, {
    option: s,
    onRegister: (d) => {
      if (o.value = d, d && l) {
        const m = l;
        l = void 0, d.resetFields(m);
      }
    }
  }), u = {
    ...W.Modal,
    maskClosable: !1,
    ...t.modalProps,
    ...a == null ? void 0 : a.modalProps
  }, { modalSlot: v, openModal: b, closeModal: g } = or(f, u), h = ({ meta: d, ...m }) => ne(u.title, { meta: d, ...m }) || `${s.title ? s.title + " - " : ""}  ${d.title || d.label}`;
  return { modalSlot: v, methods: {
    add(d = {}) {
      const { meta: m = {}, resetData: c, index: p } = d;
      let y = d.record ?? (p === void 0 ? void 0 : r.value[p]);
      (p !== void 0 || d.record) && (!y || !r.value.some((S) => e(S) === e(y))) && (console.warn("[SuperForm] 新增位置已失效，将追加到末尾"), y = void 0);
      const _ = y && e(y), C = { ...c };
      return i(C), m.title ?? (m.title = "新增"), m.name = "add", m.isNew = !0, b({
        ...m,
        title: h({ ...d, source: C, meta: m }),
        onOk: async () => o.value.submit().then(async (S) => {
          var O;
          if (await ((O = a == null ? void 0 : a.onSave) == null ? void 0 : O.call(a, { ...d, source: S, meta: m })) === !1)
            return !1;
          let T = _ === void 0 ? void 0 : r.value.findIndex(($) => e($) === _);
          return T === -1 && (console.warn("[SuperForm] 新增锚点已不存在，将追加到末尾"), T = void 0), n.onSave(S, T);
        }),
        onCancel: async () => {
          var S;
          return await ((S = a == null ? void 0 : a.onCancel) == null ? void 0 : S.call(a, { ...d, meta: m })) === !1 ? !1 : g();
        }
      });
    },
    async edit(d) {
      var m, c;
      const { record: p, selectedRows: y, resetData: _, meta: C = {} } = d, S = p || y[0];
      if (!S)
        return Promise.reject(new Error("未选择记录"));
      const O = await ((c = (m = t.apis) == null ? void 0 : m.info) == null ? void 0 : c.call(m, e(S), S)), A = Pt({}, S, O, _);
      return i(A), Je(C, { name: "edit", title: "编辑", isNew: !1 }), b({
        ...C,
        title: h({ ...d, source: A, meta: C }),
        onOk: async () => o.value.submit().then(async (T) => {
          var $;
          return await (($ = a == null ? void 0 : a.onSave) == null ? void 0 : $.call(a, { ...d, source: T, meta: C })) === !1 ? !1 : n.onUpdate(T, S);
        }),
        onCancel: async () => {
          var T;
          return await ((T = a == null ? void 0 : a.onCancel) == null ? void 0 : T.call(a, { ...d, meta: C })) === !1 ? !1 : g();
        }
      });
    },
    delete({ record: d, selectedRows: m }) {
      const c = d ? [d] : m;
      return n.onDelete(c);
    }
  } };
}
function vm({
  model: e,
  orgList: t,
  editableRef: n,
  rowKey: r
}) {
  const {
    modelsMap: o
  } = e.listData, a = oe(e, "propChain", []), s = /* @__PURE__ */ new WeakMap(), l = (v, b) => {
    const g = ee(v), h = [...a.value, b];
    let w = s.get(g);
    if (w)
      Ut(w.model, h, b);
    else {
      const {
        modelsMap: d,
        rootModels: m
      } = ko(ee(o), v, a.value, b);
      w = {
        key: Symbol(),
        modelsMap: d,
        model: k({
          children: m,
          index: b,
          propChain: h
        })
      }, s.set(g, w);
    }
    return w;
  };
  z([() => [...t.value], () => [...a.value]], ([v]) => {
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
      }, w = b ? t.value.findIndex((d) => r(d) === r(b)) : v;
      if (w !== void 0) {
        if (!t.value[w])
          throw new Error("新增位置已失效，请重新选择插入位置");
        t.value.splice(w + 1, 0, h);
      } else
        t.value.push(h);
    }
    // delete({ record }) {
    //   const orgIdx = orgList.value.indexOf(record)
    //   orgList.value.splice(orgIdx, 1)
    // },
  }, f = /* @__PURE__ */ Z({
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
      } = b.attrs, h = L(() => s.get(ee(g)).modelsMap.get(v)), {
        index: w,
        parent: d,
        refData: m
      } = Qe(h.value), c = Re({
        current: d,
        value: m,
        list: t,
        record: g,
        index: w
      }), {
        editable: p = !0
      } = v, {
        attrs: y,
        hidden: _,
        nativeAttrs: C,
        disabled: S
      } = Pe({
        option: v,
        effectData: c
      }), O = L(() => !_.value && n.value && (ze(p) ? p(c) : p)), A = vn(v, h.value, c, y, {
        attrs: C,
        disabled: S
      }), T = Gt(v, k({
        ...Qe(c),
        isView: !0
      })), $ = Nt(h.value.rules, c), M = $ && L(() => Y(y.disabled) ? void 0 : $);
      return () => O.value ? q("formItem")({
        wrapperCol: {},
        name: h.value.propChain,
        rules: M == null ? void 0 : M.value
      }, {
        default: A
      }) : T ? T() : m.value;
    }
  });
  return {
    list: t,
    methods: i,
    getEditRender: (v) => {
      if (sr(v.type) === "enhanced" || gn(v.type) || v.type === "InputSlot" && v.editable !== !1)
        return (b) => {
          const g = t.value.findIndex((w) => ee(w) === ee(b.record)), h = l(b.record, g < 0 ? b.index : g);
          return x(f, {
            key: h.key,
            option: v,
            ...b
          });
        };
    }
  };
}
function mm(e, t, n) {
  const r = j({}), { title: o, apis: a } = e, { modalProps: s, ...l } = e.descriptionsProps || {}, i = () => x(nm, { option: { descriptionsProps: l }, modelsMap: t, source: r }), f = {
    ...W.Modal,
    footer: null,
    ...e.modalProps,
    ...s
  }, u = (g) => ne(f.title, g) || `${o ? o + " - " : ""}详情`, { openModal: v, modalSlot: b } = zo(i, f);
  return {
    detailSlot: b,
    openDetail: async ({ record: g, selectedRows: h, meta: w = {}, ...d }) => {
      const m = g || h[0];
      if (a != null && a.info) {
        const c = await a.info(n(m), m);
        r.value = Object.assign({}, m, c);
      } else
        r.value = m;
      w.name = "detail", v({ ...w, title: u({ ...d, source: r.value, meta: w }) });
    }
  };
}
function bm({ option: e, model: t, orgList: n, rowKey: r, listener: o, isView: a, effectData: s }) {
  const { modelsMap: l } = t.listData, i = {
    list: n,
    modalSlot: [],
    methods: {
      delete({ record: d, selectedRows: m }) {
        const c = d ? [d] : m;
        return o.onDelete(c);
      }
    }
  }, { edit: f, editable: u = f, rowEditor: v } = e, { editMode: b, addMode: g } = v || e;
  if (!a && u) {
    const d = L(() => ze(u) ? u(s) : u), { methods: m, ...c } = vm({ model: t, orgList: n, editableRef: d, rowKey: r });
    Object.assign(i.methods, m), Object.assign(i, c);
  } else if (b === "inline") {
    const { list: d, methods: m, buttonMethods: c, editButtonsSlot: p, getEditRender: y } = fm({
      childrenMap: l,
      orgList: n,
      listener: o,
      rowEditor: v,
      rowKey: r
    });
    i.list = d, Object.assign(i.methods, m), Object.assign(i, { buttonMethods: c, editButtonsSlot: p, getEditRender: y });
  }
  if (b === "modal" || g === "modal") {
    const { modalSlot: d, methods: m } = pm({ rowKey: r, option: e, listener: o, orgList: n });
    i.methods.edit ? (i.methods.add = m.add, i.buttonMethods || (i.buttonMethods = {}), i.buttonMethods.add = m.add) : Object.assign(i.methods, m), i.modalSlot.push(d);
  }
  const { detailSlot: h, openDetail: w } = mm(e, l, r);
  return i.modalSlot.push(h), i.methods.detail = w, i;
}
const gm = Z({
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
    const { optionsRef: o } = fn(e.options, e.effectData), a = j(e.activeKey ?? e.defaultActiveKey), s = (p) => {
      a.value = p, r("update:activeKey", p);
    }, {
      default: l,
      extra: i,
      rightExtra: f,
      tabBarExtraContent: u,
      tabBarExtra: v,
      title: b,
      titleBar: g,
      ...h
    } = n, w = Ct(e.slots, e.effectData), d = v || f || u, m = L(() => {
      var p;
      const y = o.value.map(({ value: _, label: C, ...S }) => ({
        ...S,
        key: S.key ?? _,
        tab: S.tab ?? C
      }));
      return a.value === void 0 && s((p = y[0]) == null ? void 0 : p.key), y;
    }), c = (p) => ne(w.customTab || e.customTab || p.tab, {
      ...e.effectData,
      item: p
    });
    return () => [
      !e.bordered && b ? g == null ? void 0 : g() : null,
      q("tableFilter")(
        {
          bordered: e.bordered,
          items: m.value.map((p) => ({
            ...p,
            tab: c(p)
          })),
          value: a.value,
          onValueChange: s,
          attrs: t
        },
        {
          ...h,
          ...w,
          default: l,
          title: b,
          tabExtra: d || (b ? void 0 : i),
          cardExtra: d || b ? i : void 0
        }
      )
    ];
  }
}), hm = Z({
  props: {
    option: { type: Object, required: !0 },
    effectData: { type: Object, required: !0 }
  },
  setup(e) {
    const t = e.option, { field: n, editable: r } = e.option, o = k({});
    z(
      () => e.effectData,
      (d) => Object.assign(o, d),
      { immediate: !0 }
    );
    const a = n.split(".").slice(0, -1), s = L(() => Me(o.record, a)), l = L({
      get: () => Me(o.record, n),
      set: (d) => kt(o.record, n, d)
    }), i = { parent: s, refData: l }, { attrs: f, hidden: u, nativeAttrs: v, disabled: b } = Pe({
      option: t,
      effectData: { ...o, inTable: !0 }
    }), g = vn(t, i, o, f, { attrs: v, disabled: b }), h = L(() => ze(r) ? r(o) : Y(r)), w = Gt(t, o);
    return () => u.value ? "" : h.value ? x("div", { class: "editable-cell" }, g()) : w ? w() : l.value;
  }
}), ym = (e) => {
  if (!e.editable)
    return;
  const t = ue.buttonRoles && ue.buttonRoles() || [];
  if ((!e.roleName || t.includes(e.roleName)) && (sr(e.type) === "enhanced" || gn(e.type) || e.type === "InputSlot"))
    return (r) => x(hm, { option: e, effectData: { ...r } });
};
function wm({
  childrenMap: e,
  context: t,
  option: n,
  attrs: r,
  isView: o,
  effectData: a
}) {
  const { methods: s, buttonMethods: l, getEditRender: i, editButtonsSlot: f } = t, u = Re({ list: a.value, isView: o, parent: a }), v = (n.rowEditor || n).editMode !== "modal", b = function w(d = e) {
    const m = [];
    return [...d].forEach(([c, p]) => {
      var y, _;
      if (c.type === "Hidden" || c.hideInTable || c.hidden === !0 || (y = c.exclude) != null && y.includes("table"))
        return;
      const C = xt(c, u);
      if (p.children) {
        const S = w(p.children);
        c.ignoreTableTitle ? m.push(...S) : m.push({
          title: C,
          children: S
        });
      } else {
        const S = {
          title: C,
          key: c.field || c.label,
          dataIndex: p.propChain.length > 1 ? p.propChain : p.propChain[0]
        };
        c.options || c.type === "Switch" || (_ = c.type) != null && _.includes("Picker") ? S.align = "center" : c.type === "InputNumber" && (S.align = "right"), Object.assign(S, c.columnProps), Je(S, n.columnProps, W.Column);
        const O = S.customRender || Gt(c) || void 0, A = i ? i(c, O) : v ? ym(c) : void 0;
        S.customRender = _m(O, A, u), m.push(S);
      }
    }), m;
  }(), g = Cm(n, r);
  g && b.unshift(g);
  const h = Sm({
    buttons: n.rowButtons,
    // 行内编辑需要覆盖新增/编辑/删除的禁用状态，但不能丢失详情等通用动作。
    methods: { ...s || {}, ...l || {} },
    editButtonsSlot: f,
    isView: o,
    effectData: u
  });
  return h && (Je(h, n.columnProps, W.Column), b.push(h)), b;
}
function _m(e, t, n) {
  if (t || e) {
    const r = (o) => {
      const a = (t == null ? void 0 : t(o)) ?? (e == null ? void 0 : e({ ...o, isView: !0 })) ?? String(o.text ?? "");
      return a && typeof a == "string" && o.column.ellipsis ? x("span", { title: a }, a) : a;
    };
    return (o) => x(r, { ...n, ...o, current: o.record });
  } else
    return ({ text: r }) => String(r ?? "");
}
function Sm({ buttons: e, methods: t, editButtonsSlot: n, isView: r, effectData: o }) {
  const a = mn(W.rowButtons || {}, e), { columnProps: s, ...l } = a, i = pn({ config: l, methods: t, isView: r });
  if (!i)
    return;
  const f = (u) => (n == null ? void 0 : n(u, l)) || i({ key: u.record, effectData: u });
  return {
    title: "操作",
    key: "action",
    fixed: "right",
    minWidth: 100,
    width: 100,
    align: "center",
    resizable: !1,
    ...s,
    customRender: (u) => x(f, { ...o, ...u, current: u.record })
  };
}
const Cm = (e, t) => {
  var n;
  const r = e.indexColumn ?? ((n = W.Table) == null ? void 0 : n.indexColumn);
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
      ...Te(r) && r
    };
}, xm = Z({
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
    var l, i, f;
    const u = ((l = e.rowEditor) == null ? void 0 : l.editMode) === "inline", v = s.attrs, b = /* @__PURE__ */ new WeakMap(), g = v.rowKey || "id", h = (R) => {
      const I = typeof g == "function" ? g(R) : R[g];
      if (I != null)
        return I;
      const D = ee(R);
      return b.has(D) || b.set(D, bt(12)), b.get(D);
    }, w = oe(t, "refData"), d = ((i = e.attrs) == null ? void 0 : i.rowSelection) || void 0, m = d == null ? void 0 : d.selectedRowKeys, c = rt(m) ? m : j(m || []), p = j([]), {
      selectedRowKeys: y,
      onChange: _,
      getCheckboxProps: C,
      ...S
    } = d || {}, O = d && {
      attrs: {
        fixed: !0,
        ...S
      },
      onChange: (R, I, D) => {
        var U;
        if (d != null && d.preserveSelectedRowKeys) {
          const E = T(), Q = p.value.filter((de) => !E.has(h(de))), le = new Map([...Q, ...I].map((de) => [h(de), de]));
          R = [.../* @__PURE__ */ new Set([...Q.map(h), ...R])], I = R.map((de) => le.get(de)).filter(Boolean);
        }
        R.length === c.value.length && R.every((E, Q) => E === c.value[Q]) && I.length === p.value.length && I.every((E, Q) => E === p.value[Q]) || (c.value = R, p.value = I, (U = d == null ? void 0 : d.onChange) == null || U.call(d, R, I, D));
      },
      isRowSelectable: (R) => {
        var I, D;
        return u && !w.value.includes(R) ? !1 : !((D = (I = d == null ? void 0 : d.getCheckboxProps) == null ? void 0 : I.call(d, R)) != null && D.disabled);
      }
    }, A = v.childrenColumnName || "children", T = () => {
      const R = /* @__PURE__ */ new Map(), I = (D) => D.forEach((U) => {
        R.set(h(U), U), Array.isArray(U[A]) && I(U[A]);
      });
      return I(w.value), R;
    };
    z(
      () => [T(), [...c.value]],
      ([R, I]) => {
        var D;
        const U = d == null ? void 0 : d.preserveSelectedRowKeys, E = U ? [...I] : I.filter((he) => R.has(he)), Q = new Map(p.value.map((he) => [h(he), he])), le = E.map((he) => R.get(he) ?? (U ? Q.get(he) : void 0)).filter((he) => !!he);
        (E.length !== I.length || le.length !== p.value.length || le.some((he, Oe) => he !== p.value[Oe])) && (p.value = le, E.length !== I.length && (c.value = E), (D = d == null ? void 0 : d.onChange) == null || D.call(d, E, le, { type: "none" }));
      },
      { immediate: !0 }
    );
    const $ = (R, I = 0, D = 1) => {
      const U = [], E = I === D;
      return R.forEach((Q) => {
        Q[A] && (U.push(h(Q)), E || U.push(...$(Q[A], I, D + 1)));
      }), U;
    }, M = j(((f = e.attrs) == null ? void 0 : f.expandedRowKeys) || []), P = (R) => {
      M.value = R, s.emit("expandedRowsChange", R);
    };
    (a.defaultExpandLevel || v.defaultExpandAllRows) && z(
      w,
      (R, I) => {
        R.length && !(I != null && I.length) && P($(R, Number(a.defaultExpandLevel)));
      },
      { immediate: !0 }
    );
    const N = bm({
      option: e,
      model: t,
      orgList: w,
      rowKey: h,
      listener: {
        async onSave(R, I) {
          var D;
          if ((D = e.apis) != null && D.save)
            return await e.apis.save(R), R.parentId && (M.value = [...M.value, R.parentId]), n == null ? void 0 : n();
          I !== void 0 ? w.value.splice(I + 1, 0, R) : w.value.push(R);
        },
        async onUpdate(R, I) {
          var D;
          const U = h(I), E = () => w.value.findIndex((le) => h(le) === U);
          if (E() < 0)
            throw new Error("编辑记录已被移除，请取消本次编辑");
          (D = e.apis) != null && D.update && await e.apis.update(R);
          const Q = E();
          if (Q < 0)
            throw new Error("保存期间记录已被移除，请刷新确认服务端结果");
          return Object.assign(w.value[Q], R), n == null ? void 0 : n();
        },
        async onDelete(R) {
          var I, D;
          const U = R.map((E) => h(E));
          try {
            await ((D = (I = e.apis) == null ? void 0 : I.delete) == null ? void 0 : D.call(I, U, R));
          } catch (E) {
            return console.error(E), E;
          }
          return O && (c.value = c.value.filter((E) => !U.includes(E)), p.value = p.value.filter((E) => !U.includes(h(E)))), R.forEach((E) => {
            const Q = h(E), le = w.value.findIndex((de) => de === E || h(de) === Q);
            le !== -1 && w.value.splice(le, 1);
          }), n == null ? void 0 : n();
        }
      },
      isView: o,
      effectData: r
    }), V = wm({
      childrenMap: t.listData.modelsMap,
      context: N,
      option: e,
      attrs: v,
      isView: o,
      effectData: r
    }), { list: B, methods: G, buttonMethods: re = G, modalSlot: F } = N, ae = {
      selectedRowKeys: c,
      selectedRows: p,
      setSelectedRows: (R) => {
        p.value = R, c.value = R.map((I) => h(I));
      },
      expandedRowKeys: M,
      setExpandedRowKeys: P,
      expandAll: () => {
        P($(w.value));
      },
      add: (R) => {
        var I;
        return (I = G.add) == null ? void 0 : I.call(G, R);
      },
      edit: (R) => {
        var I;
        return (I = G.edit) == null ? void 0 : I.call(G, { ...Ee, ...R });
      },
      delete: () => {
        var R;
        return (R = G.delete) == null ? void 0 : R.call(G, Ee);
      },
      detail: (R) => {
        var I;
        return (I = G.detail) == null ? void 0 : I.call(G, { ...Ee, ...R });
      }
    }, fe = k({ ...ae }), xe = j();
    z(
      xe,
      (R) => {
        Object.assign(fe, R, ae), s.emit("register", fe);
      },
      { flush: "sync" }
    );
    const Ee = k({
      ...r,
      selectedRows: p,
      selectedRowKeys: c,
      tableRef: fe
    }), Se = { ...s.slots }, be = e.buttons, Ne = (be == null ? void 0 : be.targetSlot) ?? (be == null ? void 0 : be.forSlot) ?? "extra";
    if (be) {
      const R = Se[Ne], I = pn({
        config: be,
        effectData: Ee,
        methods: re,
        isView: o
      });
      (R || I) && (Se[Ne] = () => [R == null ? void 0 : R(), I == null ? void 0 : I()]);
    }
    const tt = e.title || e.label, { title: ge = tt, extra: je, ...Ke } = Se, Ae = (ge || je) && (() => q("row")(
      { align: "middle", class: "sup-titlebar" },
      {
        default: () => [
          ge && q("col")(
            { class: "sup-title" },
            {
              default: xt({ labelSlot: ge, tooltip: e.tooltip }, r)
            }
          ),
          je && q("col")(
            {
              class: "sup-title-buttons",
              flex: 1,
              style: { textAlign: (be == null ? void 0 : be.align) || "right" }
            },
            { default: je }
          )
        ]
      }
    ));
    Ke.headerCell = (R) => {
      var I;
      return ((I = Se.headerCell) == null ? void 0 : I.call(Se, R)) || ne(R.title, r);
    };
    const se = () => {
      const { rowSelection: R, expandedRowKeys: I, ...D } = v;
      return [
        ...F.map((U) => U()),
        q("table")(
          {
            ...W.Table,
            ref: xe,
            data: B.value,
            columns: k(V),
            tableLayout: "fixed",
            pagination: !1,
            ...D,
            selection: O && {
              ...O,
              selectedKeys: c.value
            },
            rowKey: h,
            expandedKeys: M.value,
            onExpandedChange: P,
            class: ["sup-table-wrapper", e.editable && "sup-table-editable"]
          },
          Ke
        )
      ];
    };
    return e.tabs ? () => x(gm, { ...e.tabs, effectData: r }, {
      [Ne]: Se[Ne],
      title: ge && (() => ne(ge, r)),
      extra: je,
      titleBar: Ae,
      default: se
    }) : () => [Ae == null ? void 0 : Ae(), se()];
  }
}), Am = /* @__PURE__ */ Z({
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
    const o = e.option.title || e.option.label, a = [...e.model.children].map(([l, i], f) => {
      const u = Re({
        parent: e.effectData,
        current: oe(e.model, "parent"),
        field: i.refName,
        value: i.refData
      }), {
        hidden: v,
        attrs: {
          disabled: b,
          ...g
        }
      } = Pe({
        option: l,
        effectData: u
      }), {
        key: h,
        field: w
      } = l;
      return {
        attrs: k(g),
        option: l,
        effectData: u,
        model: i,
        header: () => {
          var d;
          return [(d = l.icon) == null ? void 0 : d.call(l), ne(l.label, u)];
        },
        key: h || w || String(f),
        hidden: v,
        disabled: b
      };
    }), s = j(e.option.activeKey || ((r = a[0]) == null ? void 0 : r.key));
    return () => q("collapse")({
      attrs: t,
      slots: n,
      content: n.default,
      title: n.title || (o ? () => ne(o, e.effectData) : void 0),
      activeKeys: s.value,
      onActiveChange: (l) => {
        s.value = l;
      },
      items: a.filter(({
        hidden: l
      }) => !l.value).map(({
        attrs: l,
        option: i,
        disabled: f,
        model: u,
        header: v,
        effectData: b,
        key: g
      }) => ({
        key: g,
        attrs: l,
        title: v,
        disabled: Y(f),
        extra: !e.isView && i.buttons ? () => x(ke, {
          option: i.buttons,
          effectData: b
        }) : void 0,
        content: () => e.isView ? x(Xe, {
          option: i,
          modelsMap: u.children,
          effectData: b
        }) : x(qe, {
          option: i,
          model: u,
          effectData: b
        })
      }))
    });
  }
}), Om = /* @__PURE__ */ Z({
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
    }, a = () => q("preview")({
      images: r.images,
      visible: r.visible,
      current: r.current,
      width: r.width,
      height: r.height,
      "onUpdate:visible": o
    });
    return (s, l) => (Le(), vt(a));
  }
});
function Tm(e) {
  const t = j(!1), n = k({
    visible: t,
    images: [],
    "onUpdate:value": (i) => t.value = i,
    ...e
  }), r = j(!1), o = () => !r.value && x(Om, n), a = wa();
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
      const { src: f, ...u } = i || {};
      f && (n.images = [f]), Object.assign(n, u);
    }
    if (!s) {
      const f = document.createElement("div");
      s = Ca(o, { appContext: a == null ? void 0 : a.appContext }), s.appContext = a == null ? void 0 : a.appContext, On(s, f);
    }
    Ve(() => t.value = !0);
  } };
}
function $m(e, t) {
  return new Promise((n, r) => {
    const o = new FileReader();
    t === "text" ? o.readAsText(e) : o.readAsDataURL(e), o.onload = () => n({ result: o.result, file: e }), o.onerror = (a) => r(a);
  });
}
function Im(e, t, n) {
  const r = typeof n < "u" ? [n, e] : [e], o = new Blob(r, { type: "application/octet-stream" }), a = window.URL.createObjectURL(o), s = document.createElement("a");
  s.style.display = "none", s.href = a, s.setAttribute("download", t), typeof s.download > "u" && s.setAttribute("target", "_blank"), document.body.appendChild(s), s.click(), document.body.removeChild(s), window.URL.revokeObjectURL(a);
}
function Mm(e, t) {
  return t.split(",").some((n) => {
    var r;
    return ((r = e.name) == null ? void 0 : r.endsWith(n)) || e.type && new RegExp(`^${n.replace("*", "\\S*")}$`).test(e.type);
  });
}
function Pm(e) {
  const { mode: t, valueKey: n, infoNames: r, maxCount: o, accept: a, minSize: s, maxSize: l, repeatable: i } = e, f = {
    ...n && { [n]: n },
    uid: "uid",
    status: "status",
    url: "url",
    name: "name",
    ...r
  };
  t === "custom" && (f.originFileObj = "originFileObj");
  const u = /* @__PURE__ */ new Map(), v = /* @__PURE__ */ new Map(), b = /* @__PURE__ */ new Map();
  return {
    clearTask: (C) => {
      u.delete(C), v.delete(C);
    },
    convertInfo: (C) => {
      const S = { status: "done", ...C };
      return Object.entries(f).forEach(([O, A]) => {
        A && A !== O && A in S && (S[O] = S[A], delete S[A]);
      }), S;
    },
    getValue: (C, S) => {
      if (S) {
        const O = C[0];
        return n ? (O == null ? void 0 : O[n]) ?? (O == null ? void 0 : O[f.uid]) : O;
      }
      return n ? C.map((O) => O[n] ?? O[f.uid]) : C;
    },
    hasPendingWork: (C) => b.size > 0 || t === "auto" && C.some((S) => S.status === "uploading") || t === "submit" && C.some((S) => S.status !== "done"),
    queueDelete: (C, S) => b.set(C, S),
    reconvert: (C) => {
      const S = {};
      return Object.entries(f).forEach(([O, A]) => {
        const T = C[O];
        A && T !== void 0 && (S[A] = T);
      }), S;
    },
    registerRequest: (C, S) => {
      if (t === "auto") {
        const O = S();
        return u.set(C, O), O;
      }
      t === "submit" && v.set(C, S);
    },
    submit: async (C) => {
      let S = Promise.resolve();
      if (t === "auto") {
        const A = C.find((T) => T.status === "error");
        if (A)
          throw A.response || { message: "文件上传错误，请删除后重新上传！" };
        S = Promise.all(u.values());
      } else if (t === "submit") {
        const A = C.filter((T) => T.status !== "done").map((T) => {
          var $;
          return T.status = "uploading", ($ = v.get(T.uid)) == null ? void 0 : $();
        }).filter(Boolean);
        S = Promise.all(A);
      }
      const O = await S;
      return await Promise.all([...b.values()].map((A) => A())).catch((A) => console.error(A)), O;
    },
    validate: (C, S, O) => {
      if (o > 1 && O.length + S.indexOf(C) >= o)
        return `文件数量最多${o}`;
      if (a && !Mm(C, a))
        return "请选择正确的文件类型！";
      if (s || l) {
        const A = (C.size || 0) / 1024 / 1024;
        if (s && s > A)
          return `文件最小需要${s}M`;
        if (l && l < A)
          return `文件最大不超过${l}M`;
      }
      if (!i) {
        const A = O.find((T) => T.name === C.name);
        if (A)
          return `文件重复: ${A.name}`;
      }
    }
  };
}
const Dm = ".png,.jpg,.jpeg,.gif,.webp,.svg,.tif,.tiff";
function Rm(e) {
  var t, n, r, o;
  if (e.thumbUrl)
    return !0;
  if (e.url || e.originFileObj) {
    const a = (n = (t = e.name || e.url) == null ? void 0 : t.match(/[^\\.]*$/)) == null ? void 0 : n[0];
    if (a && Dm.includes(a))
      return !0;
    {
      const s = e.type || ((o = (r = e.url) == null ? void 0 : r.match(/^data:(\S*?);/)) == null ? void 0 : o[1]);
      return s == null ? void 0 : s.startsWith("image");
    }
  }
}
function ea(e, t) {
  const n = ve("services").info({
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
      icon: () => ye("error"),
      okButtonProps: {
        loading: !1
      },
      type: "error",
      title: o,
      content: a == null ? void 0 : a.message
    });
  }, ...n };
}
const Em = Z({
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
      showUploadList: f,
      onPreview: u,
      onDownload: v,
      isImageUrl: b = Rm,
      hideOnMax: g,
      valueKey: h
    } = e, w = (o ? 1 : e.maxCount) || 1 / 0, { accept: d, listType: m } = t.attrs, c = Pm({
      mode: n,
      valueKey: h,
      infoNames: l,
      maxCount: w,
      accept: d,
      minSize: a,
      maxSize: s,
      repeatable: i
    }), p = Tm(), { convertInfo: y, reconvert: _ } = c, { onSubmit: C } = we("exaProvider", {}), S = j([]), O = Be([]), A = Be(), T = (I) => {
      O.value = I.map(_), e.isView || (t.emit("update:fileList", O.value), $()), S.value = I;
    }, $ = () => {
      A.value = c.getValue(ee(O.value), !!e.isSingle), t.emit("update:value", A.value);
    };
    z(
      () => ee(e.value),
      (I) => {
        if (I !== A.value)
          if (A.value = I, !I)
            S.value = [];
          else {
            const D = me(I) ? I : [I];
            O.value = h ? D.map((U) => ({ [h]: U })) : D, S.value = O.value.map(y);
          }
      },
      { immediate: !0, flush: "sync" }
    ), z(
      () => ee(e.fileList),
      (I) => {
        if (I && I !== O.value) {
          const D = I.map(y);
          T(D);
        }
      },
      { immediate: !0 }
    );
    const M = j(!1), P = C == null ? void 0 : C(() => {
      if (M.value = c.hasPendingWork(S.value), M.value) {
        const I = ea(" 文件同步中，请稍候...");
        return c.submit(S.value).then((D) => (I.destroy(), D)).catch((D) => (M.value = !1, I.setError("文件上传失败", D), !1)).finally(() => M.value = !1);
      }
      return c.submit(S.value);
    });
    P && zs(P);
    const H = (I, D) => {
      if (e.beforeUpload) {
        const E = e.beforeUpload(I, D);
        if (E !== void 0)
          return E;
      }
      const U = c.validate(I, D, S.value);
      if (U)
        return ve("services").message("error", U), ve("upload").listIgnore;
      if (n === "custom") {
        if (f !== !1)
          return !1;
      } else if (w === 1 && S.value.length) {
        const E = S.value[0];
        if (c.clearTask(E.uid), E.status === "done" && r.delete) {
          const Q = { ...O.value[0] };
          c.queueDelete(Q, () => r.delete(Q));
        }
      }
    };
    function N({ file: I, fileList: D, event: U }) {
      var E;
      I.status === "removed" ? c.clearTask(I.uid) : I.status === "uploading" && !U && n !== "auto" && (I.status = "waiting"), (E = e.onChange) == null || E.call(e, { file: I, fileList: D, event: U }), T([...D]);
    }
    const V = (I) => {
      const { file: D } = I;
      if (n === "auto")
        return c.registerRequest(D.uid, () => re(I));
      if (n === "submit")
        c.registerRequest(D.uid, () => re(I));
      else if (n === "base64" || n === "text")
        return $m(D, n).then(({ result: U }) => G({ url: U }, D));
    }, B = (I, D) => {
      const U = S.value.find((E) => E.uid === D.uid);
      return Object.assign(U, { error: I, status: "error" }), T([...S.value]), Promise.reject(I);
    }, G = (I, D) => {
      const U = S.value.find((E) => E.uid === D.uid);
      return Object.assign(U, y(I), { status: "done" }), T([...S.value]), I;
    }, re = (I) => {
      const { file: D, filename: U, onProgress: E, onError: Q, onSuccess: le } = I;
      if (!r.upload)
        return Promise.resolve().then(() => B(Error("Api config error"), D));
      const de = new FormData();
      de.append(U, D);
      const he = (Oe) => {
        Oe.total > 0 && (Oe.percent = Oe.loaded / Oe.total * 100), E(Oe);
      };
      return r.upload(de, { onUploadProgress: he }).then(
        (Oe) => G(Oe, D),
        (Oe) => B(Oe, D)
      );
    }, F = async (I) => {
      var D;
      let U = await ((D = e.onRemove) == null ? void 0 : D.call(e, I));
      return U !== !1 && r.delete && I.status === "done" ? new Promise((E) => {
        const Q = ve("services").confirm({
          title: "确定删除吗？",
          okText: "确定",
          cancelText: "取消",
          closable: !1,
          maskClosable: !1,
          ...W.Modal,
          onOk() {
            const le = _(I), de = () => r.delete(le);
            if (n === "submit")
              c.queueDelete(
                le,
                () => de()
                // .then(
                //   () => removeFileMap.delete(__file)
                //   // () => updateFileList([...innerFileList.value, __file]) // 删除失败后还原文件
                // )
              ), E(!0);
            else
              return Q.update({
                okCancel: !1,
                title: "文件删除中……"
              }), de().then(E, () => (Q.update({
                okCancel: !1,
                title: "文件删除失败",
                type: "error",
                onOk: void 0
              }), E(!1), Promise.reject()));
          },
          onCancel() {
            E(!1);
          }
        });
      }) : U;
    }, ae = j(!1), fe = v || ((I) => {
      if (r.download && !ae.value) {
        const D = ea("文件下载中，请稍候...");
        r.download(_(I)).then((U) => Im(U, I.name)).then(() => D.destroy()).catch((U) => {
          D.setError("文件下载失败", U);
        }).finally(() => M.value = !1);
      }
    }), xe = L(
      () => typeof f == "boolean" ? f : {
        showRemoveIcon: !e.isView && !e.disabled,
        showDownloadIcon: e.isView,
        ...f
      }
    ), Ee = async (I) => {
      if (u) {
        const D = await u(_(I));
        D && p.open(D);
      } else if (b(I)) {
        let D;
        const U = S.value.filter((E) => b(E)).map((E, Q) => {
          E === I && (D = Q);
          const le = E.url || E.thumbUrl;
          return !le && E.originFileObj && (E.objectUrl = window.URL.createObjectURL(E.originFileObj)), le || E.objectUrl;
        });
        p.open({ images: U, current: D });
      }
    }, Se = ({ file: I, listType: D }) => I.status === "waiting" ? ye("sync") : I.status === "uploading" ? ye("loading") : ye("attachment"), be = e.title, Ne = typeof e.title == "string" ? e.title : "上传文件", tt = k({ ...ee(e.effectData), fileList: S }), ge = ze(be) && (() => be(tt)), je = [];
    d && je.push("支持文件格式：" + d), s && je.push("单个文件不超过" + s + "MB");
    const Ke = e.tip ?? je.join(", "), Ae = { ...t.slots };
    m === "picture-card" ? Ae.default = () => {
      var I, D;
      return ((D = (I = t.slots).default) == null ? void 0 : D.call(I, tt)) || x("div", [ye("add"), ge ? ge() : x("div", { style: "margin-top:8px" }, Ne)]);
    } : Ae.default = () => {
      var I, D;
      return [
        ((D = (I = t.slots).default) == null ? void 0 : D.call(I, tt)) || q("uploadTrigger")(
          {},
          { default: () => [ye("upload"), ge ? ge() : Ne] }
        ),
        Ke && x("div", { class: "sup-upload-tip" }, Ke)
      ];
    };
    const se = L(() => e.disabled || e.isView), R = L(() => g && w && S.value.length >= w);
    return () => se.value && S.value.length === 0 ? x("div", { class: "sup-upload-tip" }, "暂无附件") : q("upload")(
      {
        class: { "upload-disabled": se.value },
        customRequest: V,
        beforeUpload: H,
        fileList: S.value,
        onChange: N,
        onPreview: Ee,
        onRemove: F,
        showUploadList: xe.value,
        maxCount: w,
        isImageUrl: b,
        iconRender: Se,
        onDownload: fe
      },
      {
        ...Ae,
        default: () => se.value || (R.value ? null : Ae.default())
      }
    );
  }
}), jm = /* @__PURE__ */ Z({
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
    const n = e, r = t, o = j(), a = j(""), s = j(!1), l = L(() => Fo("Input")), i = () => {
      const m = l.value, c = {
        type: "Input",
        option: n.option,
        model: n.model,
        effectData: n.effectData,
        state: {},
        binding: { value: a.value, "onUpdate:value": (y) => a.value = y }
      }, p = m.getAttrs(
        {
          ref: (y) => o.value = y,
          class: "sup-tag-input",
          onBlur: d
        },
        n.option,
        c.state
      );
      return m.render({ ...c, attrs: p, slots: {} });
    }, f = (m, c) => typeof n.closable == "function" ? n.closable(m, c) : n.closable, u = L(() => n.value ? typeof n.value == "string" ? n.value.split(",") : n.value : []), v = () => {
      s.value = !0, Ve(() => {
        o.value.focus();
      });
    }, b = (m) => {
      const c = u.value.filter((p) => p !== m);
      w(c);
    }, g = (m, c) => {
      const p = q("tag")(
        {
          removable: f(m, c),
          onRemove: () => b(m)
        },
        { default: () => m.length > 20 ? `${m.slice(0, 20)}...` : m }
      );
      return m.length > 20 ? q("tooltip")({ title: m }, { default: () => p }) : p;
    }, h = () => q("tag")(
      { class: "sup-tag-add", onClick: v },
      { default: () => [ye("add"), ne(n.newLabel, n.effectData)] }
    ), w = (m) => {
      n.stringifyValue ? r("update:value", m.join(",")) : r("update:value", m);
    }, d = () => {
      a.value && u.value.indexOf(a.value) === -1 && w([...u.value, a.value]), s.value = !1, a.value = "";
    };
    return (m, c) => (Le(), Qt(Tn, null, [
      (Le(!0), Qt(Tn, null, xa(u.value, (p, y) => (Le(), vt(Tt(() => g(p, y)), { key: p }))), 128)),
      s.value ? (Le(), vt(Tt(i), { key: 0 })) : (Le(), vt(Tt(h), { key: 1 }))
    ], 64));
  }
}), Fm = {
  key: 1,
  class: "sup-tag-select-empty"
}, Lm = /* @__PURE__ */ Z({
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
    const n = e, r = t, { optionsRef: o } = fn(n.option.options, n.effectData), a = L(() => n.option.options === void 0 ? n.options ?? [] : o.value), s = L(() => {
      const { value: u } = n, v = n.stringifyValue;
      return u === void 0 ? [] : v ? u.split(",") : Array.isArray(u) ? u : [u];
    }), l = (u, v) => {
      const b = n.multiple ? v ? [...s.value, u] : s.value.filter((g) => g !== u) : [u];
      r("check", u, v), f(b), r("change", u, b);
    }, i = (u, v) => q("checkableTag")(
      {
        class: "tag-select",
        selected: s.value.includes(v),
        onSelectedChange: (b) => l(v, b)
      },
      { default: () => u }
    ), f = (u) => {
      n.multiple ? n.stringifyValue ? r("update:value", u.join(",")) : r("update:value", u) : r("update:value", u[0]);
    };
    return (u, v) => a.value.length ? (Le(!0), Qt(Tn, { key: 0 }, xa(a.value, ({ label: b, value: g }) => (Le(), vt(Tt(() => i(b, g)), { key: g }))), 128)) : (Le(), Qt("div", Fm, Gs(e.placeholder), 1));
  }
}), Ho = {
  Form: qo,
  Group: Cn,
  Card: lm,
  CardList: xn,
  TabList: xn,
  CollapseList: xn,
  GroupList: cm,
  Tabs: dm,
  Table: xm,
  Collapse: Am,
  Descriptions: Cn,
  Fragment: Cn
}, km = {
  InputGroup: om,
  InputList: sm,
  Upload: Em,
  TagInput: jm,
  TagSelect: Lm
}, yt = Object.keys(Ho), Nm = {
  ...Ho,
  ...km
}, Kt = {}, bn = {}, en = /* @__PURE__ */ new Set();
function Go(e) {
  return typeof e == "object" && e && "component" in e ? e : { component: e };
}
function Ko(e, t, n, r = []) {
  const o = /* @__PURE__ */ new Set([...Mo, ...r]);
  Object.entries(t).forEach(([a, s]) => {
    if (s) {
      if (o.has(a))
        throw new Error(`Schema 类型 '${a}' 为 Core 保留类型，不能注册为 ${n} 组件`);
      e[a] = { ...Go(s), source: n };
    }
  });
}
function Yo(e, t = []) {
  Ko(Kt, e, "custom", [...en, ...t]);
}
function Um(e) {
  const t = new Set(e);
  for (const n of Object.keys(Kt))
    if (t.has(n))
      throw new Error(`Schema 类型 '${n}' 已注册为项目组件，不能再由 UIAdapter 接管`);
  en.clear(), t.forEach((n) => en.add(n));
}
function Sb(e, t = []) {
  const n = Object.fromEntries(
    Object.entries(e).map(([a, s]) => [a, s && Go(s).component])
  );
  Eo(n, "auto");
  const r = new Set(t), o = Object.fromEntries(
    Object.entries(e).filter(([a]) => !Mo.has(a) && !r.has(a))
  );
  Ko(bn, o, "auto");
}
function tn(e) {
  return Kt[e] || bn[e];
}
function gn(e) {
  return !!tn(e);
}
function Bm() {
  return [.../* @__PURE__ */ new Set([...Object.keys(Kt), ...Object.keys(bn)])];
}
function sr(e, t = []) {
  var n, r;
  return Io.includes(e) ? "core" : en.has(e) || new Set(t).has(e) ? "enhanced" : ((n = Kt[e]) == null ? void 0 : n.source) || ((r = bn[e]) == null ? void 0 : r.source);
}
function Wo(e, t) {
  const { prop: n = "value", event: r = "update:value" } = e.model || {}, o = { ...t };
  if (n !== "value" && (o[n] = o.value, delete o.value), r !== "update:value") {
    const a = r.startsWith("on") ? r : `on${r[0].toUpperCase()}${r.slice(1)}`;
    o[a] = o["onUpdate:value"], delete o["onUpdate:value"];
  }
  return o;
}
const _e = Nm, W = {};
let ta = !1, na;
function Vm(e) {
  if (na) {
    qr(e);
    return;
  }
  Um(e.supportedFields), qr(e), na = e, ta || (Ht(W, e.defaults || {}), ta = !0);
}
function qm(e) {
  return Vm(e), e;
}
function zm(e = {}) {
  const { defaultProps: t, ...n } = e;
  Object.assign(ue, n), t && Zo(t);
}
function Hm(e, t) {
  Yo({ [e]: t });
}
function Gm(e) {
  Yo(e);
}
function Zo(e) {
  Ht(W, e);
}
const ra = {
  useAdapter: qm,
  configure: zm,
  registerComponent: Hm,
  registerComponents: Gm,
  setDefaultProps: Zo
};
class Km extends Error {
  constructor(t, n) {
    super(t.flatMap((r) => r.messages)[0] || "表单校验失败"), this.fields = t, this.cause = n, this.name = "FormValidationError";
  }
}
const aa = Symbol.for("superform.official-product");
function Ym(e, t) {
  let n = !1;
  const r = {
    ...ra,
    initialize(o = {}) {
      const a = o.components, s = Object.keys(a || {});
      if (n) {
        if (s.length || o.overrides)
          throw new Error(`SuperForm '${e}' 已初始化，不能再追加字段组件或覆盖 UI 协议`);
        return r;
      }
      const l = jo(t(a), o.overrides);
      for (const u of s)
        if (!l.supportedFields.includes(u))
          throw new Error(`UIAdapter '${l.name}' 未声明字段 '${u}'，不能初始化对应 UI 组件`);
      const i = globalThis, f = i[aa];
      if (f && f !== e)
        throw new Error(`SuperForm 已初始化官方产品 '${String(f)}'，不能再初始化 '${e}'`);
      return ra.useAdapter(l), i[aa] = e, n = !0, r;
    }
  };
  return r;
}
const Wm = [
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
], Zm = Z({
  name: "AntdvTreeSelectField",
  inheritAttrs: !1,
  props: Mv,
  setup(e, { slots: t }) {
    const n = $v("TreeSelect"), r = L(() => e.state.treeData ?? e.attrs.treeData ?? []);
    return e.option.labelField && z(
      () => [e.binding.value, r.value, e.attrs.fieldNames, e.attrs.treeNodeLabelProp],
      () => {
        var u, v;
        const o = e.attrs.fieldNames || {}, a = e.attrs.treeNodeLabelProp || o.label || "title", s = (b, g) => {
          for (const h of b) {
            if (Object.is(h[o.value || "value"], g))
              return h[a] ?? h.label ?? g;
            const w = h[o.children || "children"], d = Array.isArray(w) ? s(w, g) : void 0;
            if (d !== void 0)
              return d;
          }
        }, l = (b) => {
          if (b == null)
            return;
          const g = typeof b == "object" ? b.value : b;
          return s(r.value, g) ?? b.label ?? g;
        }, i = e.binding.value, f = Array.isArray(i) ? i.map(l) : l(i);
        rv(f, e.binding.labelValue) || (v = (u = e.binding)["onUpdate:labelValue"]) == null || v.call(u, f);
      },
      { immediate: !0, deep: !0 }
    ), () => x(n, { ...e.attrs, treeData: r.value }, t);
  }
}), Qm = tr();
function Qo() {
  return Dv({
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
      render: ({ slots: e, ...t }) => x(Zm, t, e)
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
const Cb = Qo();
function Ot(e, t, n) {
  return x(e === "row" ? ua : ca, t, n);
}
const Jm = Z({
  props: { state: { type: Object, required: !0 } },
  setup(e) {
    const t = (n) => n.label ? [
      x("th", X({ class: "ant-descriptions-item-label" }, n.labelCol), [n.label()]),
      x(
        "td",
        X({ class: "ant-descriptions-item-content", colspan: n.colspan * 2 - 1 }, n.wrapperCol),
        [n.content()]
      )
    ] : [
      x(
        "td",
        X({ class: "ant-descriptions-item-content", colspan: n.colspan * 2 }, n.wrapperCol),
        [n.content()]
      )
    ];
    return () => {
      const n = e.state;
      if (n.mode === "table") {
        const o = n.layout === "vertical" ? n.rows.flatMap((a) => [
          (a.length > 1 || a[0].label) && x(
            "tr",
            { class: "ant-descriptions-row" },
            a.map(
              (s) => {
                var l;
                return x(
                  "th",
                  X({ class: "ant-descriptions-item-label", colspan: s.colspan }, s.labelCol),
                  [(l = s.label) == null ? void 0 : l.call(s)]
                );
              }
            )
          ),
          x(
            "tr",
            { class: "ant-descriptions-row" },
            a.map(
              (s) => x(
                "td",
                X({ class: "ant-descriptions-item-content", colspan: s.colspan }, s.wrapperCol),
                [s.content()]
              )
            )
          )
        ]) : n.rows.map((a) => x("tr", { class: "ant-descriptions-row" }, a.flatMap(t)));
        return x(
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
          x("div", { class: "ant-descriptions-view" }, x("table", { style: { tableLayout: n.tableLayout } }, o))
        );
      }
      const r = n.rows.map(
        (o) => Ot(
          "row",
          { class: "ant-descriptions-row", ...n.rowProps },
          {
            default: () => o.map((a) => Ot(
              "col",
              { ...a.colProps, key: a.key },
              {
                default: () => Ot(
                  "row",
                  { class: "ant-descriptions-item-container" },
                  {
                    default: () => [
                      a.label && Ot("col", X({ class: "ant-descriptions-item-label" }, a.labelCol), {
                        default: () => {
                          var s;
                          return x("label", {}, [(s = a.label) == null ? void 0 : s.call(a)]);
                        }
                      }),
                      Ot(
                        "col",
                        X({ class: "ant-descriptions-item-content" }, a.wrapperCol),
                        {
                          default: () => !a.attrs.noInput && n.mode === "form" && a.label ? x("div", { class: "sup-descriptions-item-input" }, [a.content()]) : a.content()
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
      return x(
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
        x("div", { class: "ant-descriptions-view" }, r)
      );
    };
  }
}), Xm = (e) => {
  var s;
  const t = (l) => e.content ? String(l) : typeof l == "number" ? "number:" + l : /^(number:|string:)/.test(l) ? "string:" + l : l, n = new Map(e.items.map((l) => [t(l.key), l])), r = e.content ? void 0 : e.items.map((l) => {
    const { closeIcon: i, ...f } = l.attrs || {};
    return {
      ...f,
      key: t(l.key),
      label: l.title,
      content: l.content,
      disabled: l.disabled,
      closeIcon: typeof i == "function" ? i() : i
    };
  }), { tabPosition: o, ...a } = e.attrs || {};
  return x(
    da,
    X(o === void 0 ? a : { ...a, tabPlacement: o }, {
      items: r,
      activeKey: e.activeKeys === void 0 ? void 0 : t(e.activeKeys),
      "onUpdate:activeKey": (l) => {
        var f, u;
        const i = n.get(l);
        e.content ? (f = e.onActiveChange) == null || f.call(e, l) : i && ((u = e.onActiveChange) == null || u.call(e, i.key));
      }
    }),
    {
      ...e.slots,
      rightExtra: e.extra || ((s = e.slots) == null ? void 0 : s.rightExtra),
      default: e.content
    }
  );
}, eb = Xm, tb = (e) => {
  const t = e.content ? void 0 : e.items.map((n) => {
    var r;
    return {
      ...n.attrs,
      key: n.key,
      // Collapse 的 items 接收节点而非插槽函数；用函数组件延迟求值，保留依赖追踪与面板懒挂载。
      label: n.title && x(n.title),
      extra: n.extra && x(n.extra),
      content: x(n.content),
      collapsible: n.disabled ? "disabled" : (r = n.attrs) == null ? void 0 : r.collapsible
    };
  });
  return [
    e.title && x("div", { class: ["sup-titlebar", "sup-title"] }, [e.title()]),
    x(
      ns,
      X(e.attrs || {}, {
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
}, nb = tb, rb = (e, t = {}) => {
  const { data: n, selection: r, expandedKeys: o, onExpandedChange: a, pagination: s, ...l } = e, i = (f = []) => f.map((u) => {
    const { customRender: v, children: b, ...g } = u;
    return {
      ...g,
      ...v ? {
        // antdv-next 使用 render，Core 的 customRender 参数需要在 Adapter 边界转换。
        render: (h, w, d) => v({ text: h, record: w, index: d, column: u })
      } : {},
      ...b != null && b.length ? { children: i(b) } : {}
    };
  });
  return x(
    rs,
    {
      ...l,
      dataSource: n,
      columns: i(l.columns),
      rowSelection: r && {
        ...r.attrs,
        selectedRowKeys: r.selectedKeys,
        onChange: r.onChange,
        getCheckboxProps: r.isRowSelectable ? (f) => {
          var u;
          return {
            disabled: !((u = r.isRowSelectable) != null && u.call(r, f))
          };
        } : void 0
      },
      pagination: s && {
        ...s.attrs,
        ...s,
        attrs: void 0
      },
      expandedRowKeys: o,
      "onUpdate:expandedRowKeys": a
    },
    t
  );
}, ab = (e, t = {}) => {
  var g;
  const { bordered: n, items: r, value: o, onValueChange: a, attrs: s = {} } = e, { tabExtra: l, cardExtra: i, ...f } = t;
  if (n)
    return x(
      fa,
      {
        tabList: r,
        activeTabKey: o,
        onTabChange: a
      },
      {
        ...f,
        customTab: ({ tab: h }) => h,
        tabBarExtraContent: l,
        extra: i
      }
    );
  const { tabPosition: u, ...v } = s;
  return [x(
    da,
    {
      ...v,
      ...u === void 0 ? {} : { tabPlacement: u },
      activeKey: o,
      "onUpdate:activeKey": a
    },
    {
      ...f,
      default: () => r.map((h) => x(as, { ...h, tab: () => h.tab })),
      rightExtra: l
    }
  ), (g = t.default) == null ? void 0 : g.call(t)];
}, ob = {
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
function Jo(e) {
  var t, n;
  (n = (t = (e == null ? void 0 : e.domEvent) || e) == null ? void 0 : t.stopPropagation) == null || n.call(t);
}
function oa(e, t, n, r) {
  return [
    e.icon && !n ? e.icon() : void 0,
    !e.icon || !r ? ne(e.label, t) : void 0
  ];
}
function sb(e, t, n, r) {
  var i, f;
  const o = { ...e.attrs, disabled: Y((i = e.attrs) == null ? void 0 : i.disabled), loading: Y((f = e.attrs) == null ? void 0 : f.loading) }, a = (u) => {
    var v;
    return Jo(u), (v = e.onClick) == null ? void 0 : v.call(e, u);
  }, s = Y(e.menu);
  let l;
  return s ? l = x(
    pa,
    { disabled: o.disabled, ...e.dropdownProps },
    {
      popupRender: () => x(
        va,
        { onClick: a },
        () => s.map(
          (u) => x(
            ma,
            { key: u.value, disabled: u.disabled },
            {
              icon: u.icon,
              default: () => ne(u.label, t)
            }
          )
        )
      ),
      default: () => x(Wt, o, () => [
        ...oa(e, t, n, r),
        Fe.expand()
      ])
    }
  ) : e.render ? l = e.render({ props: o, ...t }) : l = x(
    Wt,
    { ...o, onClick: a },
    () => oa(e, t, n, r)
  ), x(ga, { title: Y(e.tooltipTitle) }, { default: () => l });
}
function lb(e) {
  const { groupProps: t, buttons: n, moreButtons: r, defaultButtonProps: o, labelOnly: a, iconOnly: s, moreLabel: l, effectData: i } = e, f = e.divider ?? ((t == null ? void 0 : t.direction) !== "vertical" && ["link", "text"].includes(String((o == null ? void 0 : o.variant) ?? (o == null ? void 0 : o.type) ?? ""))), u = n.flatMap((v, b) => [
    sb(v, i, !!a, !!s),
    f && b < n.length - 1 ? x(os, { type: "vertical", class: "sup-buttons-divider" }) : void 0
  ]);
  return r.length && u.push(
    x(
      pa,
      {},
      {
        default: () => x(Wt, o, () => l ? ne(l, i) : Fe.more()),
        popupRender: () => x(
          va,
          {},
          () => r.map(
            (v) => {
              var b;
              return x(
                ma,
                {
                  key: v.label,
                  disabled: Y((b = v.attrs) == null ? void 0 : b.disabled),
                  onClick: (g) => {
                    var h;
                    return Jo(g), (h = v.onClick) == null ? void 0 : h.call(v, g);
                  }
                },
                {
                  icon: v.icon,
                  default: () => ne(v.label, i)
                }
              );
            }
          )
        )
      }
    )
  ), x(
    ba,
    {
      size: f ? 0 : "small",
      ...t,
      class: ["sup-buttons", t == null ? void 0 : t.class]
    },
    () => u
  );
}
const ib = (e, t) => x(ha, e, t);
async function sa(e, t) {
  try {
    t ? await e.validateFields([t]) : await e.validate();
  } catch (n) {
    throw Array.isArray(n == null ? void 0 : n.errorFields) ? new Km(
      n.errorFields.map((r) => ({ path: r.name, messages: r.errors })),
      n
    ) : n;
  }
}
const ub = {
  form: {
    service: {
      validate: (e) => sa(e),
      validateField: sa,
      clearValidate: (e) => e.clearValidate()
    },
    component: ss
  },
  formItem: { defaults: { validateFirst: !0 }, component: ls },
  row: { component: ua },
  col: { component: ca },
  space: { component: ba },
  compactSpace: { component: is },
  card: {
    render: ({ state: e }) => x(fa, e.attrs, {
      ...e.slots,
      title: e.title && (() => x("div", { class: "sup-title" }, [e.title()])),
      extra: e.extra,
      default: e.content
    })
  },
  tabs: { render: ({ state: e }) => eb(e) },
  collapse: { render: ({ state: e }) => nb(e) },
  descriptions: { render: ({ state: e }) => x(Jm, { state: e }) },
  actionGroup: {
    schemaDefaults: {
      rowButtons: { buttonProps: { type: "link", size: "small" } },
      ButtonActions: {
        expand: { attrs: { type: "link" } },
        add: { attrs: { type: "primary" } },
        delete: { attrs: { danger: !0 } },
        submit: { attrs: { type: "primary" } },
        search: { attrs: { type: "primary" } }
      }
    },
    render: ({ attrs: e }) => lb(e)
  },
  tooltip: { component: ga },
  tag: {
    component: us,
    adaptProps: ({ removable: e, onRemove: t, ...n }) => ({ ...n, closable: e, onClose: t })
  },
  checkableTag: {
    component: cs,
    adaptProps: ({ selected: e, onSelectedChange: t, ...n }) => ({
      ...n,
      checked: e,
      onChange: t
    })
  },
  empty: { component: ds },
  modal: {
    service: {
      useContext: fs,
      wrapContext: (e, t, n) => {
        var s;
        const r = t == null ? void 0 : t.value, o = (s = r == null ? void 0 : r.getPrefixCls) == null ? void 0 : s.call(r), a = n.prefixCls || `${o}-modal`;
        return x(
          ps,
          { ...r, prefixCls: o },
          () => e({ ...n, rootPrefixCls: o, prefixCls: a })
        );
      }
    },
    component: An,
    adaptProps: ({ visible: e, "onUpdate:visible": t, ...n }) => ({
      ...n,
      open: e,
      "onUpdate:open": t
    })
  },
  upload: { service: { listIgnore: ha.LIST_IGNORE }, render: ({ attrs: e, slots: t }) => ib(e, t) },
  uploadTrigger: { component: Wt },
  preview: {
    render: ({ attrs: e }) => {
      const { visible: t, "onUpdate:visible": n, images: r = [], current: o, width: a, height: s } = e;
      return x(
        lr.PreviewGroup,
        {
          style: { display: "none" },
          preview: { visible: t, current: o, onVisibleChange: n }
        },
        () => r.map((l, i) => x(lr, { key: i, src: l, width: a, height: s }))
      );
    }
  },
  table: {
    service: { selectors: ob },
    defaults: { size: "small" },
    render: ({ attrs: e, slots: t }) => rb(e, t)
  },
  tableFilter: { render: ({ attrs: e, slots: t }) => ab(e, t) }
};
function Xo(e = {}) {
  return jo(
    Iv({
      name: "antdv-next",
      uiComponents: ub,
      supportedFields: Wm,
      adaptFieldProps: Qm,
      fields: Qo(),
      fieldComponents: e.components,
      icons: { semantic: Fe },
      services: {
        message: (t, n) => vs[t](n),
        confirm(t) {
          const n = An.confirm(t);
          return {
            update: (r) => n.update(r),
            destroy: () => n.destroy()
          };
        },
        info(t) {
          const n = An.info(t);
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
const xb = Xo();
function Ab(e) {
  return e;
}
const cb = (e) => {
  var t, n;
  return ((n = (t = ue.tableApiSetting) == null ? void 0 : t.resultTransform) == null ? void 0 : n.call(t, e)) || e;
}, la = (e) => {
  const { currentField: t, sizeField: n } = ue.tableApiSetting || {};
  return t || n ? {
    [t || "current"]: e.current,
    [n || "size"]: e.size
  } : e;
};
function db(e, t, n) {
  const r = k({}), o = j(!1);
  let a = {}, s = 0, l;
  const i = [], f = (y) => i.push(y);
  e.onLoaded && i.push(e.onLoaded);
  const u = async (y) => {
    var _, C, S, O;
    const A = Pt({}, la(r), a, y), T = ((_ = e.beforeQuery) == null ? void 0 : _.call(e, A)) || A, $ = (C = e.apis) == null ? void 0 : C.query;
    l == null || l.abort();
    const M = ++s;
    if (!$) {
      l = void 0, o.value = !1;
      return;
    }
    const P = new AbortController();
    l = P, o.value = !0;
    try {
      const H = await $(T, { signal: P.signal });
      if (M !== s || P.signal.aborted)
        return;
      const N = ((S = e.afterQuery) == null ? void 0 : S.call(e, H)) || H, V = cb(N);
      if (p.value && !Array.isArray(V) && ((O = V == null ? void 0 : V.records) == null ? void 0 : O.length) === 0 && Number.isFinite(V.total)) {
        const B = Math.max(1, Math.ceil(V.total / (V.size || r.size)));
        if (r.current > B)
          return r.current = B, u({ ...y, ...la(r) });
      }
      return v(V);
    } finally {
      M === s && (l = void 0, o.value = !1);
    }
  }, v = (y) => (Array.isArray(y) ? (t(y), p.value !== !1 && (r.current = 1, p.value = { ...p.value, total: y.length })) : y != null && y.records && (t(y.records), p.value !== !1 && (r.current = y.current, r.size = y.size, p.value = { ...p.value, total: y.total })), Promise.all(i.map((_) => _(y)))), b = (y, _ = r.size) => (r.current = y, r.size = _, u()), g = (y) => (p.value && (r.current = 1), u(y)), h = gv((y) => g(y).catch((_) => {
    (_ == null ? void 0 : _.name) !== "AbortError" && console.error(_);
  }), 300, { leading: !1 }), w = () => {
    l == null || l.abort(), l = void 0, s += 1, o.value = !1;
  }, d = {}, m = (y, _) => {
    _ === "dynamic" ? a = Pt({}, d, y) : (Object.assign(d, y), Pt(a, y));
  }, c = () => a, p = j(!1);
  return z(
    () => {
      var y;
      return e.pagination ?? ((y = e.attrs) == null ? void 0 : y.pagination);
    },
    (y) => {
      if (y === !1) {
        p.value = !1;
        return;
      }
      Object.assign(r, { size: (y == null ? void 0 : y.pageSize) || 10, current: (y == null ? void 0 : y.current) || 1 });
      const _ = y == null ? void 0 : y.onChange, C = y == null ? void 0 : y.onShowSizeChange;
      p.value = {
        ...y,
        onChange: (S, O) => {
          const A = b(S, O);
          return _ == null || _(S, O), A;
        },
        onShowSizeChange: (S, O) => {
          const A = b(S, O);
          return C == null || C(S, O), A;
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
    p.value && (p.value = { ...p.value, pageSize: y.size, current: y.current });
  }), z(
    () => {
      var y, _;
      return [(y = e.apis) == null ? void 0 : y.query, (n == null ? void 0 : n.value.length) ?? ((_ = Y(e.dataSource)) == null ? void 0 : _.length), r.current, r.size, p.value === !1];
    },
    ([y, _]) => {
      if (y || !p.value || _ === void 0)
        return;
      const C = Math.min(Math.max(1, r.current), Math.max(1, Math.ceil(_ / r.size)));
      r.current = C, (p.value.total !== _ || p.value.current !== C) && (p.value = { ...p.value, total: _, current: C });
    },
    { immediate: !0 }
  ), {
    goPage: b,
    reload: u,
    throttleRequest: h,
    cancelQuery: w,
    setQueryParams: m,
    getQueryParams: c,
    query: g,
    pagination: p,
    setPageData: v,
    onLoaded: f,
    loading: o
  };
}
function fb(e, t, n) {
  var r;
  const { columns: o, searchForm: a } = e, s = a || e.searchSchema || {}, l = j(), i = s.dataSource || k({}), { buttons: f = {}, searchOnChange: u, limit: v, ...b } = s, g = j(!1), h = [];
  s.subItems.forEach((p) => {
    if (typeof p == "string") {
      const y = o.find((_) => _.field === p);
      y && h.push({
        type: "Input",
        ...mv(y, "span", "disabled", "hidden"),
        editable: !0,
        exclude: []
      });
    } else
      return h.push({ ...p });
  }), v && h.length > v && h.forEach((p, y) => {
    if (y >= v) {
      const _ = p.hidden;
      p.hidden = (...C) => !g.value || (_ == null ? void 0 : _(...C));
    }
  });
  const w = {
    search() {
      var p;
      n(i), (p = s.onSubmit) == null || p.call(s, ee(i));
    },
    reset(p) {
      l.value.resetFields(p);
    }
  }, d = Array.isArray(f) ? { actions: f } : { ...f };
  d.actions ?? (d.actions = u ? void 0 : ["search", "reset"]), (r = d.actions) != null && r.length && (v && h.length > v && (d.actions = [
    {
      label: () => [
        g.value ? "收起 " : "展开 ",
        ye(g.value ? "collapse" : "expand")
      ],
      name: "expand",
      onClick: () => g.value = !g.value
    },
    ...d.actions
  ]), h.push({
    type: "InfoSlot",
    align: "right",
    span: "auto",
    render: () => x(ke, {
      option: d,
      methods: w,
      effectData: Re({ table: t, form: l })
    })
  }));
  const m = z(l, () => {
    n(i), u && z(i, n), m();
  });
  return { formNode: () => x(_e.Form, {
    option: {
      ...b,
      ignoreRules: !0,
      dataSource: i,
      subItems: h
    },
    ref: l,
    onSubmit: w.search,
    onReset: w.search
  }), formRef: l, ...w, dataSource: i };
}
function pb(e) {
  return !e || !e.getBoundingClientRect ? 0 : e.getBoundingClientRect();
}
function ia(e) {
  const t = document.documentElement, n = t.scrollLeft, r = t.scrollTop, o = t.clientLeft, a = t.clientTop, s = window.pageXOffset, l = window.pageYOffset, i = pb(e), { left: f, top: u, width: v, height: b } = i, g = (s || n) - (o || 0), h = (l || r) - (a || 0), w = f + s, d = u + l, m = w - g, c = d - h, p = window.document.documentElement.clientWidth, y = window.document.documentElement.clientHeight;
  return {
    left: m,
    top: c,
    right: p - v - m,
    bottom: y - b - c,
    rightIncludeBody: p - m,
    bottomIncludeBody: y - c
  };
}
function vb(e, t, n, r) {
  const o = ve("table").selectors, a = (g, h) => h ? g.querySelector(h) : null, s = Oo(u, 100), l = j({});
  let i = !1;
  const f = () => {
    var g;
    i = !0, r ? window.addEventListener("resize", s, {
      signal: r.signal
    }) : document.addEventListener("redoHeight", s), l.value = (g = e.attrs) == null ? void 0 : g.scroll, z(
      () => {
        var w;
        return [n.value, (w = Y(t)) == null ? void 0 : w.length];
      },
      () => {
        s();
      },
      { flush: "post" }
    );
    const h = z(
      n,
      (w) => {
        w && (w.style.overflow = "hidden", new ResizeObserver(() => {
          s();
        }).observe(w), h());
      },
      { immediate: !0, flush: "post" }
    );
  };
  Nn(() => {
    i && document.removeEventListener("redoHeight", s);
  });
  function u() {
    i && Ve(() => {
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
    const { maxHeight: h, inheritHeight: w, isFixedHeight: d, resizeHeightOffset: m } = e, c = Y(n);
    if (!c)
      return;
    const p = a(c, o.table);
    if (!p)
      return;
    await Ve();
    const y = getComputedStyle(c.parentElement), _ = ia(p), C = ia(c), S = _.left - C.left, O = (parseInt(y.marginBottom) || 0) + (parseInt(y.paddingBottom) || 0);
    let A = 0;
    c && w ? A = C.bottomIncludeBody - C.bottom - (_.top - C.top) : A = _.bottomIncludeBody - O;
    const T = a(p, o.title), $ = (T == null ? void 0 : T.parentElement) === p ? T.offsetHeight ?? 0 : 0, M = a(p, o.header);
    if (!M)
      return;
    let P = 0;
    M && (P = M.offsetHeight);
    let H = 0;
    const N = a(p, o.footer);
    N && N.parentElement === p && (H += N.offsetHeight || 0);
    let V = 0;
    const B = a(c, o.pagination);
    B && (V = B.offsetHeight + 16);
    let G = Math.ceil(A) - (m || 0) - S - V;
    const re = h || G - H - $ - P - 1;
    if (h && d && (G = h + H + $ + P + 1), d) {
      p.style.height = `${G}px`, p.style["overflow-y"] = "hidden", w || (c.style.height = "unset");
      const F = a(c, o.wrapper);
      if (F && (F.style.height = "", F.style["overflow-y"] = ""), !(((g = Y(t)) == null ? void 0 : g.length) > 0)) {
        if (a(p, o.empty)) {
          const fe = a(p, o.emptyCell);
          fe && (fe.style.height = `${re}px`);
        }
        return;
      }
    }
    if (p.scrollHeight > G)
      v(re);
    else {
      const F = a(p, o.body);
      F && v(F.scrollHeight <= re ? null : re);
    }
  }
  return { getScrollRef: l, redoHeight: u, debounceRedoHeight: s, listenResize: f };
}
const mb = Z({
  name: "SuperTable",
  inheritAttrs: !1,
  props: {
    dataSource: Array,
    schema: Object
  },
  emits: ["register", "load", "update:dataSource"],
  setup(e, t) {
    const { style: n, class: r, ...o } = t.attrs, a = Zt({ attrs: o }), s = j([]), l = j(), i = (F) => {
      s.value = F, t.emit("update:dataSource", F), rt(a.dataSource) && (a.dataSource.value = F);
    };
    Ye(() => e.dataSource && i(e.dataSource)), Ye(() => a.dataSource && i(Y(a.dataSource)));
    const f = j(), u = (F) => {
      ue.schemaDiagnostics && Bt(F, "table", "SuperTable");
      const { isScanHeight: ae, inheritHeight: fe, isFixedHeight: xe, isContainer: Ee, ...Se } = X(
        W.Table,
        { ...F.attrs },
        { ...a.attrs }
      );
      Object.assign(a, { isScanHeight: ae, inheritHeight: fe, isFixedHeight: xe, isContainer: Ee }, F, { attrs: Se });
    };
    Ye(() => e.schema && u(ee(e.schema)));
    const {
      loading: v,
      pagination: b,
      setPageData: g,
      onLoaded: h,
      goPage: w,
      reload: d,
      query: m,
      throttleRequest: c,
      cancelQuery: p,
      setQueryParams: y,
      getQueryParams: _
    } = db(a, i, s), { getScrollRef: C, redoHeight: S, listenResize: O } = vb(a, s, l), A = Be(), T = {
      setOption: u,
      setData: (F) => {
        F && i(F);
      },
      redoHeight: S,
      goPage: w,
      reload: d,
      query: m,
      onLoaded: h,
      resetSearchForm(F) {
        try {
          return f.value.formRef.resetFields(F);
        } catch (ae) {
          console.warn(ae);
        }
      },
      setPageData: g,
      getQueryParams: _,
      getData: () => s.value,
      dataRef: s,
      searchForm: L(() => {
        var F;
        return (F = f.value) == null ? void 0 : F.formRef;
      }),
      validate: async () => {
        A.value && await ve("form").validate(A.value);
      },
      setColumns: (F) => {
        var ae;
        !B && !((ae = a.columns) != null && ae.length) ? Object.assign(a, { columns: F }) : (Object.assign(a, { columns: F }), re(F));
      }
    }, $ = j({ ...T }), M = (F) => {
      Object.assign($.value, Qe(k(F)), T), t.emit("register", $.value);
    };
    t.emit("register", $.value), t.expose($.value);
    const P = k({
      reload: d,
      onRegister: M,
      loading: v
    });
    Sa(() => {
      p(), t.emit("register", null);
    }), Ze("rootSlots", t.slots);
    const H = j({}), N = j(), V = k({ formData: s, current: s, queryParams: L(_) });
    let B = !1;
    const G = z(
      a,
      (F) => {
        var ae, fe;
        if (!((ae = F == null ? void 0 : F.columns) != null && ae.length))
          return;
        if (N.value) {
          G();
          return;
        }
        const { columns: xe, maxHeight: Ee, isScanHeight: Se = !0, inheritHeight: be } = F, Ne = k({
          refData: s,
          listData: ht(xe)
        });
        H.value = Ct(a.slots, V, t.slots);
        const tt = F.searchForm || F.searchSchema, {
          attrs: { onLoad: ge, ...je }
        } = Pe({ option: F, effectData: V });
        Object.assign(P, je, { pagination: b }), h((se) => {
          t.emit("load", se), ge == null || ge(se);
        }), tt && (f.value = fb(F, $, (se) => {
          y(se, "form"), B && c();
        }));
        const Ke = F.tabs && F.tabs.field;
        if (F.tabs && Ke) {
          const se = (fe = F.tabs).activeKey ?? (fe.activeKey = j(F.tabs.defaultActiveKey)), R = {};
          z(
            se,
            (I) => {
              I !== void 0 && (kt(R, Ke, I), y(R), B && c());
            },
            { immediate: !0 }
          );
        }
        if (z(
          j(F.params),
          (se) => {
            y(se, "dynamic"), B && c();
          },
          { deep: !0, immediate: !0 }
        ), Ve(() => {
          B = !0, a.immediate !== !1 && c();
        }), Se || be || Ee) {
          O(), P.scroll = C;
          const { onChange: se, onExpandedRowsChange: R } = P;
          P.onChange = (...I) => {
            se == null || se(...I);
          }, P.onExpandedRowsChange = (I) => {
            R == null || R(I), S();
          }, z(s, S);
        }
        const Ae = () => x(_e.Table, { option: a, effectData: V, model: Ne, ...P }, H.value);
        a.editable ? N.value = () => q("form")({ model: s.value, ref: A }, { default: Ae }) : N.value = Ae;
      },
      {
        immediate: !0
      }
    ), re = (F) => {
      const ae = k({
        refData: s,
        listData: ht(F)
      }), fe = Symbol(), xe = () => x(_e.Table, { option: a, effectData: V, model: ae, key: fe, ...P }, H.value);
      a.editable ? N.value = () => q("form")({ model: s.value, ref: A }, { default: xe }) : N.value = xe;
    };
    return () => N.value && x(
      ar,
      { name: "exaProvider", data: { data: s } },
      () => {
        var F, ae;
        return !f.value || (F = a.searchForm) != null && F.teleport ? x(
          "div",
          X(
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
            ((ae = a.searchForm) == null ? void 0 : ae.teleport) && x(
              Ks,
              { to: a.searchForm.teleport },
              x("div", { class: "sup-form-section sup-table-search" }, x(f.value.formNode))
            ),
            N.value()
          ]
        ) : x(
          "div",
          X(
            { ref: l, class: [a.isContainer && "sup-container", "sup-table"] },
            { class: r, style: n }
          ),
          [
            x("div", { class: "sup-form-section sup-table-search" }, x(f.value.formNode)),
            x("div", { class: "sup-form-section section-last" }, x(N.value))
          ]
        );
      }
    );
  }
}), Ob = (e, t) => {
  const [n, r] = Bo(), o = Promise.resolve(typeof e == "function" ? e() : e), a = (l) => {
    if (l)
      n.value || (o.then(l.setOption), t && l.setData(t)), n.value = l;
    else if (l === null)
      n.value = void 0;
    else
      return (i, f) => x(mb, { ...i, onRegister: a }, f == null ? void 0 : f.slots);
  }, s = async (l, ...i) => {
    const f = await r();
    if (l && l in f)
      return typeof f[l] == "function" ? f[l](...i) : f[l];
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
        return ie((l = n.value) == null ? void 0 : l.dataRef);
      },
      dataSource: L(() => {
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
      selectedRowKeys: L(() => {
        var l;
        return (l = n.value) == null ? void 0 : l.selectedRowKeys;
      }),
      selectedRows: L(() => {
        var l;
        return (l = n.value) == null ? void 0 : l.selectedRows;
      }),
      /** 设置选中行 */
      setSelectedRows: (l) => {
        var i;
        return (i = n.value) == null ? void 0 : i.setSelectedRows(l);
      },
      expandedRowKeys: L(() => {
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
function Tb(e) {
  return e;
}
const bb = Z({
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
    const r = (n = t.default) == null ? void 0 : n.call(t), { effectData: o, ...a } = e, s = r ? r.flatMap(({ children: l, props: i = {} }) => {
      const { roleName: f, onClick: u, confirmText: v, tooltip: b, disabledTooltip: g, icon: h, ...w } = ov(
        i,
        (d, m) => fd(m)
      );
      return !u || !l ? [] : {
        label: l.default || l,
        icon: h,
        tooltip: b,
        disabledTooltip: g,
        roleName: f,
        onClick: u,
        confirmText: v,
        attrs: w
      };
    }) : e.actions;
    return () => x(ke, { option: { ...a, actions: s }, effectData: o });
  }
});
function $b(e) {
  return [() => x(bb, e)];
}
const gb = Z({
  props: {
    dataSource: Object,
    schema: Object
  },
  emits: ["register"],
  setup(e, t) {
    const n = Be(e.schema || {}), r = j({});
    z(
      () => e.schema,
      (s) => {
        ue.schemaDiagnostics && s && Bt(s, "detail", "SuperDetail"), n.value = s || {};
      },
      { immediate: !0 }
    ), z(
      () => Y(e.dataSource ?? n.value.dataSource),
      (s) => {
        s != null && (r.value = s);
      },
      { immediate: !0 }
    );
    const o = {
      setOption: (s) => {
        ue.schemaDiagnostics && Bt(s, "detail", "SuperDetail"), n.value = s;
      },
      setData: (s) => {
        r.value = s;
      }
    }, a = j();
    return z(
      n,
      (s) => {
        if (!(s != null && s.subItems)) {
          a.value = void 0;
          return;
        }
        const l = ht(s.subItems, r);
        a.value = l.modelsMap;
      },
      { immediate: !0 }
    ), t.expose(o), t.emit("register", o), Ze("exaProvider", _a({ data: r })), Ze("rootSlots", t.slots), () => a.value && x(
      "div",
      { class: ["sup-detail", n.value.isContainer && "sup-container"] },
      x(Xe, {
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
function Ib(e, t) {
  const n = oe(t), r = j(), o = Promise.resolve(typeof e == "function" ? e() : e), a = (s) => {
    if (s)
      r.value || (o.then(s.setOption), n.value && z(
        n,
        (l) => {
          s.setData(l);
        },
        { immediate: !0 }
      )), r.value = s;
    else
      return (l) => x(gb, { ...l, onRegister: a }, Ys());
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
function Mb(e) {
  return e;
}
const hb = Ym(
  "superform-antdv",
  (e) => Xo({ components: e })
), Pb = hb, Db = {
  Input: ms,
  TextArea: bs,
  InputNumber: gs,
  InputOTP: hs,
  InputPassword: ys,
  InputSearch: ws,
  AutoComplete: _s,
  Cascader: Ss,
  ColorPicker: Cs,
  Select: xs,
  Radio: As,
  RadioGroup: Os,
  Checkbox: Ts,
  CheckboxGroup: $s,
  DatePicker: Is,
  DateRangePicker: Ms,
  DateMonthPicker: Ps,
  DateQuarterPicker: Ds,
  DateWeekPicker: Rs,
  DateYearPicker: Es,
  TimePicker: js,
  TimeRangePicker: Fs,
  TreeSelect: Ls,
  Switch: ks,
  Rate: Ns,
  Mentions: Us,
  Segmented: Bs,
  Slider: Vs,
  Transfer: qs
};
export {
  Km as FormValidationError,
  bb as SuperButtons,
  gb as SuperDetail,
  im as SuperForm,
  mb as SuperTable,
  xb as antdvAdapter,
  Cb as antdvFields,
  zm as configure,
  Xo as createAntdvAdapter,
  Qo as createAntdvFields,
  or as createModal,
  Pb as default,
  Mb as defineDetail,
  Ab as defineForm,
  Tb as defineTable,
  Iv as defineUIAdapter,
  Yv as diagnoseSchema,
  Db as fieldComponents,
  Sb as registerAutoImportedComponents,
  Hm as registerComponent,
  Gm as registerComponents,
  qm as useAdapter,
  $b as useButtons,
  Ib as useDetail,
  um as useForm,
  zo as useModal,
  _b as useModalForm,
  Ob as useTable
};
