import { commonjsGlobal as va, Row as ma, Col as ba, Tabs as ha, collapse_default as ss, InternalTable as is, card_default as ga, TabPane as ls, Divider as us, Dropdown as ya, button_default as on, Menu as wa, SubMenu as cs, MenuItem as Sa, Space as _a, InternalTooltip as Ca, Upload as pr, form_default as ds, InternalFormItem as fs, SpaceCompact as ps, Tag as vs, CheckableTag as ms, CheckableTagGroup as bs, Empty as hs, useConfig as gs, ConfigProvider as ys, Modal as Dn, Image as vr, staticMethods as ws, CompoundedInput as Ss, InternalTextArea as _s, InputNumber as Cs, InputOTP as xs, InputPassword as As, InputSearch as Os, AutoComplete as $s, Cascader as Ts, color_picker_default as Ms, Select as Ds, radio_default as Ps, RadioGroup as Is, checkbox_default as Rs, CheckboxGroup as Es, DatePicker as js, DateRangePicker as Fs, DateMonthPicker as Ls, DateQuarterPicker as ks, DateWeekPicker as Ns, DateYearPicker as Us, TimePicker as Bs, TimeRangePicker as zs, TreeSelect as qs, Switch as Hs, Rate as Vs, Mentions as Ks, Segmented as Ys, Slider as Gs, InternalTransfer as Ws } from "./antd.js";
import { shallowRef as Ve, defineComponent as ce, reactive as V, provide as Qe, h as $, toRef as ye, inject as Se, mergeProps as de, unref as oe, toRefs as Je, toRaw as pe, computed as K, watch as X, ref as H, shallowReactive as ft, onMounted as xa, toValue as ge, getCurrentInstance as Aa, onUnmounted as Vn, readonly as Oa, isRef as rt, onScopeDispose as mr, markRaw as Zs, watchEffect as Ze, openBlock as Ue, createBlock as bt, resolveDynamicComponent as Dt, onBeforeUnmount as en, nextTick as ze, render as Pn, createVNode as $a, createElementBlock as Jt, Fragment as Qs, renderList as Js, toDisplayString as Xs, Teleport as ei, useSlots as ti } from "vue";
var ni = { exports: {} }, _n = { exports: {} }, br;
function ri() {
  return br || (br = 1, function(e, t) {
    (function(n, r) {
      e.exports = r();
    })(va, function() {
      var n = 1e3, r = 6e4, a = 36e5, o = "millisecond", s = "second", i = "minute", l = "hour", c = "day", u = "week", f = "month", v = "quarter", h = "year", y = "date", w = "Invalid Date", b = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/, C = /\[([^\]]+)]|YYYY|YY|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g, d = { name: "en", weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), ordinal: function(R) {
        var M = ["th", "st", "nd", "rd"], I = R % 100;
        return "[" + R + (M[(I - 20) % 10] || M[I] || M[0]) + "]";
      } }, m = function(R, M, I) {
        var E = String(R);
        return !E || E.length >= M ? R : "" + Array(M + 1 - E.length).join(I) + R;
      }, x = { s: m, z: function(R) {
        var M = -R.utcOffset(), I = Math.abs(M), E = Math.floor(I / 60), D = I % 60;
        return (M <= 0 ? "+" : "-") + m(E, 2, "0") + ":" + m(D, 2, "0");
      }, m: function R(M, I) {
        if (M.date() < I.date())
          return -R(I, M);
        var E = 12 * (I.year() - M.year()) + (I.month() - M.month()), D = M.clone().add(E, f), B = I - D < 0, U = M.clone().add(E + (B ? -1 : 1), f);
        return +(-(E + (I - D) / (B ? D - U : U - D)) || 0);
      }, a: function(R) {
        return R < 0 ? Math.ceil(R) || 0 : Math.floor(R);
      }, p: function(R) {
        return { M: f, y: h, w: u, d: c, D: y, h: l, m: i, s, ms: o, Q: v }[R] || String(R || "").toLowerCase().replace(/s$/, "");
      }, u: function(R) {
        return R === void 0;
      } }, O = "en", A = {};
      A[O] = d;
      var T = "$isDayjsObject", p = function(R) {
        return R instanceof P || !(!R || !R[T]);
      }, g = function R(M, I, E) {
        var D;
        if (!M)
          return O;
        if (typeof M == "string") {
          var B = M.toLowerCase();
          A[B] && (D = B), I && (A[B] = I, D = B);
          var U = M.split("-");
          if (!D && U.length > 1)
            return R(U[0]);
        } else {
          var W = M.name;
          A[W] = M, D = W;
        }
        return !E && D && (O = D), D || !E && O;
      }, S = function(R, M) {
        if (p(R))
          return R.clone();
        var I = typeof M == "object" ? M : {};
        return I.date = R, I.args = arguments, new P(I);
      }, _ = x;
      _.l = g, _.i = p, _.w = function(R, M) {
        return S(R, { locale: M.$L, utc: M.$u, x: M.$x, $offset: M.$offset });
      };
      var P = function() {
        function R(I) {
          this.$L = g(I.locale, null, !0), this.parse(I), this.$x = this.$x || I.x || {}, this[T] = !0;
        }
        var M = R.prototype;
        return M.parse = function(I) {
          this.$d = function(E) {
            var D = E.date, B = E.utc;
            if (D === null)
              return /* @__PURE__ */ new Date(NaN);
            if (_.u(D))
              return /* @__PURE__ */ new Date();
            if (D instanceof Date)
              return new Date(D);
            if (typeof D == "string" && !/Z$/i.test(D)) {
              var U = D.match(b);
              if (U) {
                var W = U[2] - 1 || 0, ee = (U[7] || "0").substring(0, 3);
                return B ? new Date(Date.UTC(U[1], W, U[3] || 1, U[4] || 0, U[5] || 0, U[6] || 0, ee)) : new Date(U[1], W, U[3] || 1, U[4] || 0, U[5] || 0, U[6] || 0, ee);
              }
            }
            return new Date(D);
          }(I), this.init();
        }, M.init = function() {
          var I = this.$d;
          this.$y = I.getFullYear(), this.$M = I.getMonth(), this.$D = I.getDate(), this.$W = I.getDay(), this.$H = I.getHours(), this.$m = I.getMinutes(), this.$s = I.getSeconds(), this.$ms = I.getMilliseconds();
        }, M.$utils = function() {
          return _;
        }, M.isValid = function() {
          return this.$d.toString() !== w;
        }, M.isSame = function(I, E) {
          var D = S(I);
          return this.startOf(E) <= D && D <= this.endOf(E);
        }, M.isAfter = function(I, E) {
          return S(I) < this.startOf(E);
        }, M.isBefore = function(I, E) {
          return this.endOf(E) < S(I);
        }, M.$g = function(I, E, D) {
          return _.u(I) ? this[E] : this.set(D, I);
        }, M.unix = function() {
          return Math.floor(this.valueOf() / 1e3);
        }, M.valueOf = function() {
          return this.$d.getTime();
        }, M.startOf = function(I, E) {
          var D = this, B = !!_.u(E) || E, U = _.p(I), W = function(ve, J) {
            var re = _.w(D.$u ? Date.UTC(D.$y, J, ve) : new Date(D.$y, J, ve), D);
            return B ? re : re.endOf(c);
          }, ee = function(ve, J) {
            return _.w(D.toDate()[ve].apply(D.toDate("s"), (B ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(J)), D);
          }, z = this.$W, G = this.$M, Q = this.$D, se = "set" + (this.$u ? "UTC" : "");
          switch (U) {
            case h:
              return B ? W(1, 0) : W(31, 11);
            case f:
              return B ? W(1, G) : W(0, G + 1);
            case u:
              var le = this.$locale().weekStart || 0, he = (z < le ? z + 7 : z) - le;
              return W(B ? Q - he : Q + (6 - he), G);
            case c:
            case y:
              return ee(se + "Hours", 0);
            case l:
              return ee(se + "Minutes", 1);
            case i:
              return ee(se + "Seconds", 2);
            case s:
              return ee(se + "Milliseconds", 3);
            default:
              return this.clone();
          }
        }, M.endOf = function(I) {
          return this.startOf(I, !1);
        }, M.$set = function(I, E) {
          var D, B = _.p(I), U = "set" + (this.$u ? "UTC" : ""), W = (D = {}, D[c] = U + "Date", D[y] = U + "Date", D[f] = U + "Month", D[h] = U + "FullYear", D[l] = U + "Hours", D[i] = U + "Minutes", D[s] = U + "Seconds", D[o] = U + "Milliseconds", D)[B], ee = B === c ? this.$D + (E - this.$W) : E;
          if (B === f || B === h) {
            var z = this.clone().set(y, 1);
            z.$d[W](ee), z.init(), this.$d = z.set(y, Math.min(this.$D, z.daysInMonth())).$d;
          } else
            W && this.$d[W](ee);
          return this.init(), this;
        }, M.set = function(I, E) {
          return this.clone().$set(I, E);
        }, M.get = function(I) {
          return this[_.p(I)]();
        }, M.add = function(I, E) {
          var D, B = this;
          I = Number(I);
          var U = _.p(E), W = function(G) {
            var Q = S(B);
            return _.w(Q.date(Q.date() + Math.round(G * I)), B);
          };
          if (U === f)
            return this.set(f, this.$M + I);
          if (U === h)
            return this.set(h, this.$y + I);
          if (U === c)
            return W(1);
          if (U === u)
            return W(7);
          var ee = (D = {}, D[i] = r, D[l] = a, D[s] = n, D)[U] || 1, z = this.$d.getTime() + I * ee;
          return _.w(z, this);
        }, M.subtract = function(I, E) {
          return this.add(-1 * I, E);
        }, M.format = function(I) {
          var E = this, D = this.$locale();
          if (!this.isValid())
            return D.invalidDate || w;
          var B = I || "YYYY-MM-DDTHH:mm:ssZ", U = _.z(this), W = this.$H, ee = this.$m, z = this.$M, G = D.weekdays, Q = D.months, se = D.meridiem, le = function(J, re, Ce, L) {
            return J && (J[re] || J(E, B)) || Ce[re].slice(0, L);
          }, he = function(J) {
            return _.s(W % 12 || 12, J, "0");
          }, ve = se || function(J, re, Ce) {
            var L = J < 12 ? "AM" : "PM";
            return Ce ? L.toLowerCase() : L;
          };
          return B.replace(C, function(J, re) {
            return re || function(Ce) {
              switch (Ce) {
                case "YY":
                  return String(E.$y).slice(-2);
                case "YYYY":
                  return _.s(E.$y, 4, "0");
                case "M":
                  return z + 1;
                case "MM":
                  return _.s(z + 1, 2, "0");
                case "MMM":
                  return le(D.monthsShort, z, Q, 3);
                case "MMMM":
                  return le(Q, z);
                case "D":
                  return E.$D;
                case "DD":
                  return _.s(E.$D, 2, "0");
                case "d":
                  return String(E.$W);
                case "dd":
                  return le(D.weekdaysMin, E.$W, G, 2);
                case "ddd":
                  return le(D.weekdaysShort, E.$W, G, 3);
                case "dddd":
                  return G[E.$W];
                case "H":
                  return String(W);
                case "HH":
                  return _.s(W, 2, "0");
                case "h":
                  return he(1);
                case "hh":
                  return he(2);
                case "a":
                  return ve(W, ee, !0);
                case "A":
                  return ve(W, ee, !1);
                case "m":
                  return String(ee);
                case "mm":
                  return _.s(ee, 2, "0");
                case "s":
                  return String(E.$s);
                case "ss":
                  return _.s(E.$s, 2, "0");
                case "SSS":
                  return _.s(E.$ms, 3, "0");
                case "Z":
                  return U;
              }
              return null;
            }(J) || U.replace(":", "");
          });
        }, M.utcOffset = function() {
          return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);
        }, M.diff = function(I, E, D) {
          var B, U = this, W = _.p(E), ee = S(I), z = (ee.utcOffset() - this.utcOffset()) * r, G = this - ee, Q = function() {
            return _.m(U, ee);
          };
          switch (W) {
            case h:
              B = Q() / 12;
              break;
            case f:
              B = Q();
              break;
            case v:
              B = Q() / 3;
              break;
            case u:
              B = (G - z) / 6048e5;
              break;
            case c:
              B = (G - z) / 864e5;
              break;
            case l:
              B = G / a;
              break;
            case i:
              B = G / r;
              break;
            case s:
              B = G / n;
              break;
            default:
              B = G;
          }
          return D ? B : _.a(B);
        }, M.daysInMonth = function() {
          return this.endOf(f).$D;
        }, M.$locale = function() {
          return A[this.$L];
        }, M.locale = function(I, E) {
          if (!I)
            return this.$L;
          var D = this.clone(), B = g(I, E, !0);
          return B && (D.$L = B), D;
        }, M.clone = function() {
          return _.w(this.$d, this);
        }, M.toDate = function() {
          return new Date(this.valueOf());
        }, M.toJSON = function() {
          return this.isValid() ? this.toISOString() : null;
        }, M.toISOString = function() {
          return this.$d.toISOString();
        }, M.toString = function() {
          return this.$d.toUTCString();
        }, R;
      }(), k = P.prototype;
      return S.prototype = k, [["$ms", o], ["$s", s], ["$m", i], ["$H", l], ["$W", c], ["$M", f], ["$y", h], ["$D", y]].forEach(function(R) {
        k[R[1]] = function(M) {
          return this.$g(M, R[0], R[1]);
        };
      }), S.extend = function(R, M) {
        return R.$i || (R(M, P, S), R.$i = !0), S;
      }, S.locale = g, S.isDayjs = p, S.unix = function(R) {
        return S(1e3 * R);
      }, S.en = A[O], S.Ls = A, S.p = {}, S;
    });
  }(_n)), _n.exports;
}
(function(e, t) {
  (function(n, r) {
    e.exports = r(ri());
  })(va, function(n) {
    function r(s) {
      return s && typeof s == "object" && "default" in s ? s : { default: s };
    }
    var a = r(n), o = { name: "zh-cn", weekdays: "星期日_星期一_星期二_星期三_星期四_星期五_星期六".split("_"), weekdaysShort: "周日_周一_周二_周三_周四_周五_周六".split("_"), weekdaysMin: "日_一_二_三_四_五_六".split("_"), months: "一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月".split("_"), monthsShort: "1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月".split("_"), ordinal: function(s, i) {
      return i === "W" ? s + "周" : s + "日";
    }, weekStart: 1, yearStart: 4, formats: { LT: "HH:mm", LTS: "HH:mm:ss", L: "YYYY/MM/DD", LL: "YYYY年M月D日", LLL: "YYYY年M月D日Ah点mm分", LLLL: "YYYY年M月D日ddddAh点mm分", l: "YYYY/M/D", ll: "YYYY年M月D日", lll: "YYYY年M月D日 HH:mm", llll: "YYYY年M月D日dddd HH:mm" }, relativeTime: { future: "%s内", past: "%s前", s: "几秒", m: "1 分钟", mm: "%d 分钟", h: "1 小时", hh: "%d 小时", d: "1 天", dd: "%d 天", M: "1 个月", MM: "%d 个月", y: "1 年", yy: "%d 年" }, meridiem: function(s, i) {
      var l = 100 * s + i;
      return l < 600 ? "凌晨" : l < 900 ? "早上" : l < 1100 ? "上午" : l < 1300 ? "中午" : l < 1800 ? "下午" : "晚上";
    } };
    return a.default.locale(o, null, !0), o;
  });
})(ni);
var ai = typeof global == "object" && global && global.Object === Object && global;
const Ta = ai;
var oi = typeof self == "object" && self && self.Object === Object && self, si = Ta || oi || Function("return this")();
const Le = si;
var ii = Le.Symbol;
const De = ii;
var Ma = Object.prototype, li = Ma.hasOwnProperty, ui = Ma.toString, Tt = De ? De.toStringTag : void 0;
function ci(e) {
  var t = li.call(e, Tt), n = e[Tt];
  try {
    e[Tt] = void 0;
    var r = !0;
  } catch {
  }
  var a = ui.call(e);
  return r && (t ? e[Tt] = n : delete e[Tt]), a;
}
var di = Object.prototype, fi = di.toString;
function pi(e) {
  return fi.call(e);
}
var vi = "[object Null]", mi = "[object Undefined]", hr = De ? De.toStringTag : void 0;
function tt(e) {
  return e == null ? e === void 0 ? mi : vi : hr && hr in Object(e) ? ci(e) : pi(e);
}
function Ee(e) {
  return e != null && typeof e == "object";
}
var bi = "[object Symbol]";
function sn(e) {
  return typeof e == "symbol" || Ee(e) && tt(e) == bi;
}
function Da(e, t) {
  for (var n = -1, r = e == null ? 0 : e.length, a = Array(r); ++n < r; )
    a[n] = t(e[n], n, e);
  return a;
}
var hi = Array.isArray;
const $e = hi;
var gi = 1 / 0, gr = De ? De.prototype : void 0, yr = gr ? gr.toString : void 0;
function Pa(e) {
  if (typeof e == "string")
    return e;
  if ($e(e))
    return Da(e, Pa) + "";
  if (sn(e))
    return yr ? yr.call(e) : "";
  var t = e + "";
  return t == "0" && 1 / e == -gi ? "-0" : t;
}
var yi = /\s/;
function wi(e) {
  for (var t = e.length; t-- && yi.test(e.charAt(t)); )
    ;
  return t;
}
var Si = /^\s+/;
function _i(e) {
  return e && e.slice(0, wi(e) + 1).replace(Si, "");
}
function Ae(e) {
  var t = typeof e;
  return e != null && (t == "object" || t == "function");
}
var wr = 0 / 0, Ci = /^[-+]0x[0-9a-f]+$/i, xi = /^0b[01]+$/i, Ai = /^0o[0-7]+$/i, Oi = parseInt;
function Sr(e) {
  if (typeof e == "number")
    return e;
  if (sn(e))
    return wr;
  if (Ae(e)) {
    var t = typeof e.valueOf == "function" ? e.valueOf() : e;
    e = Ae(t) ? t + "" : t;
  }
  if (typeof e != "string")
    return e === 0 ? e : +e;
  e = _i(e);
  var n = xi.test(e);
  return n || Ai.test(e) ? Oi(e.slice(2), n ? 2 : 8) : Ci.test(e) ? wr : +e;
}
function ln(e) {
  return e;
}
var $i = "[object AsyncFunction]", Ti = "[object Function]", Mi = "[object GeneratorFunction]", Di = "[object Proxy]";
function Ye(e) {
  if (!Ae(e))
    return !1;
  var t = tt(e);
  return t == Ti || t == Mi || t == $i || t == Di;
}
var Pi = Le["__core-js_shared__"];
const Cn = Pi;
var _r = function() {
  var e = /[^.]+$/.exec(Cn && Cn.keys && Cn.keys.IE_PROTO || "");
  return e ? "Symbol(src)_1." + e : "";
}();
function Ii(e) {
  return !!_r && _r in e;
}
var Ri = Function.prototype, Ei = Ri.toString;
function ut(e) {
  if (e != null) {
    try {
      return Ei.call(e);
    } catch {
    }
    try {
      return e + "";
    } catch {
    }
  }
  return "";
}
var ji = /[\\^$.*+?()[\]{}|]/g, Fi = /^\[object .+?Constructor\]$/, Li = Function.prototype, ki = Object.prototype, Ni = Li.toString, Ui = ki.hasOwnProperty, Bi = RegExp(
  "^" + Ni.call(Ui).replace(ji, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
);
function zi(e) {
  if (!Ae(e) || Ii(e))
    return !1;
  var t = Ye(e) ? Bi : Fi;
  return t.test(ut(e));
}
function qi(e, t) {
  return e == null ? void 0 : e[t];
}
function ct(e, t) {
  var n = qi(e, t);
  return zi(n) ? n : void 0;
}
var Hi = ct(Le, "WeakMap");
const In = Hi;
var Cr = Object.create, Vi = function() {
  function e() {
  }
  return function(t) {
    if (!Ae(t))
      return {};
    if (Cr)
      return Cr(t);
    e.prototype = t;
    var n = new e();
    return e.prototype = void 0, n;
  };
}();
const Ki = Vi;
function Yi(e, t, n) {
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
function Gi() {
}
function Ia(e, t) {
  var n = -1, r = e.length;
  for (t || (t = Array(r)); ++n < r; )
    t[n] = e[n];
  return t;
}
var Wi = 800, Zi = 16, Qi = Date.now;
function Ji(e) {
  var t = 0, n = 0;
  return function() {
    var r = Qi(), a = Zi - (r - n);
    if (n = r, a > 0) {
      if (++t >= Wi)
        return arguments[0];
    } else
      t = 0;
    return e.apply(void 0, arguments);
  };
}
function Xi(e) {
  return function() {
    return e;
  };
}
var el = function() {
  try {
    var e = ct(Object, "defineProperty");
    return e({}, "", {}), e;
  } catch {
  }
}();
const tn = el;
var tl = tn ? function(e, t) {
  return tn(e, "toString", {
    configurable: !0,
    enumerable: !1,
    value: Xi(t),
    writable: !0
  });
} : ln;
const nl = tl;
var rl = Ji(nl);
const Ra = rl;
function al(e, t) {
  for (var n = -1, r = e == null ? 0 : e.length; ++n < r && t(e[n], n, e) !== !1; )
    ;
  return e;
}
function ol(e, t, n, r) {
  for (var a = e.length, o = n + (r ? 1 : -1); r ? o-- : ++o < a; )
    if (t(e[o], o, e))
      return o;
  return -1;
}
function sl(e) {
  return e !== e;
}
function il(e, t, n) {
  for (var r = n - 1, a = e.length; ++r < a; )
    if (e[r] === t)
      return r;
  return -1;
}
function ll(e, t, n) {
  return t === t ? il(e, t, n) : ol(e, sl, n);
}
function ul(e, t) {
  var n = e == null ? 0 : e.length;
  return !!n && ll(e, t, 0) > -1;
}
var cl = 9007199254740991, dl = /^(?:0|[1-9]\d*)$/;
function un(e, t) {
  var n = typeof e;
  return t = t ?? cl, !!t && (n == "number" || n != "symbol" && dl.test(e)) && e > -1 && e % 1 == 0 && e < t;
}
function cn(e, t, n) {
  t == "__proto__" && tn ? tn(e, t, {
    configurable: !0,
    enumerable: !0,
    value: n,
    writable: !0
  }) : e[t] = n;
}
function Ct(e, t) {
  return e === t || e !== e && t !== t;
}
var fl = Object.prototype, pl = fl.hasOwnProperty;
function Kn(e, t, n) {
  var r = e[t];
  (!(pl.call(e, t) && Ct(r, n)) || n === void 0 && !(t in e)) && cn(e, t, n);
}
function xt(e, t, n, r) {
  var a = !n;
  n || (n = {});
  for (var o = -1, s = t.length; ++o < s; ) {
    var i = t[o], l = r ? r(n[i], e[i], i, n, e) : void 0;
    l === void 0 && (l = e[i]), a ? cn(n, i, l) : Kn(n, i, l);
  }
  return n;
}
var xr = Math.max;
function Ea(e, t, n) {
  return t = xr(t === void 0 ? e.length - 1 : t, 0), function() {
    for (var r = arguments, a = -1, o = xr(r.length - t, 0), s = Array(o); ++a < o; )
      s[a] = r[t + a];
    a = -1;
    for (var i = Array(t + 1); ++a < t; )
      i[a] = r[a];
    return i[t] = n(s), Yi(e, this, i);
  };
}
function ja(e, t) {
  return Ra(Ea(e, t, ln), e + "");
}
var vl = 9007199254740991;
function Yn(e) {
  return typeof e == "number" && e > -1 && e % 1 == 0 && e <= vl;
}
function dn(e) {
  return e != null && Yn(e.length) && !Ye(e);
}
function Fa(e, t, n) {
  if (!Ae(n))
    return !1;
  var r = typeof t;
  return (r == "number" ? dn(n) && un(t, n.length) : r == "string" && t in n) ? Ct(n[t], e) : !1;
}
function La(e) {
  return ja(function(t, n) {
    var r = -1, a = n.length, o = a > 1 ? n[a - 1] : void 0, s = a > 2 ? n[2] : void 0;
    for (o = e.length > 3 && typeof o == "function" ? (a--, o) : void 0, s && Fa(n[0], n[1], s) && (o = a < 3 ? void 0 : o, a = 1), t = Object(t); ++r < a; ) {
      var i = n[r];
      i && e(t, i, r, o);
    }
    return t;
  });
}
var ml = Object.prototype;
function Gn(e) {
  var t = e && e.constructor, n = typeof t == "function" && t.prototype || ml;
  return e === n;
}
function bl(e, t) {
  for (var n = -1, r = Array(e); ++n < e; )
    r[n] = t(n);
  return r;
}
var hl = "[object Arguments]";
function Ar(e) {
  return Ee(e) && tt(e) == hl;
}
var ka = Object.prototype, gl = ka.hasOwnProperty, yl = ka.propertyIsEnumerable, wl = Ar(function() {
  return arguments;
}()) ? Ar : function(e) {
  return Ee(e) && gl.call(e, "callee") && !yl.call(e, "callee");
};
const Et = wl;
function Sl() {
  return !1;
}
var Na = typeof exports == "object" && exports && !exports.nodeType && exports, Or = Na && typeof module == "object" && module && !module.nodeType && module, _l = Or && Or.exports === Na, $r = _l ? Le.Buffer : void 0, Cl = $r ? $r.isBuffer : void 0, xl = Cl || Sl;
const jt = xl;
var Al = "[object Arguments]", Ol = "[object Array]", $l = "[object Boolean]", Tl = "[object Date]", Ml = "[object Error]", Dl = "[object Function]", Pl = "[object Map]", Il = "[object Number]", Rl = "[object Object]", El = "[object RegExp]", jl = "[object Set]", Fl = "[object String]", Ll = "[object WeakMap]", kl = "[object ArrayBuffer]", Nl = "[object DataView]", Ul = "[object Float32Array]", Bl = "[object Float64Array]", zl = "[object Int8Array]", ql = "[object Int16Array]", Hl = "[object Int32Array]", Vl = "[object Uint8Array]", Kl = "[object Uint8ClampedArray]", Yl = "[object Uint16Array]", Gl = "[object Uint32Array]", be = {};
be[Ul] = be[Bl] = be[zl] = be[ql] = be[Hl] = be[Vl] = be[Kl] = be[Yl] = be[Gl] = !0;
be[Al] = be[Ol] = be[kl] = be[$l] = be[Nl] = be[Tl] = be[Ml] = be[Dl] = be[Pl] = be[Il] = be[Rl] = be[El] = be[jl] = be[Fl] = be[Ll] = !1;
function Wl(e) {
  return Ee(e) && Yn(e.length) && !!be[tt(e)];
}
function Wn(e) {
  return function(t) {
    return e(t);
  };
}
var Ua = typeof exports == "object" && exports && !exports.nodeType && exports, Pt = Ua && typeof module == "object" && module && !module.nodeType && module, Zl = Pt && Pt.exports === Ua, xn = Zl && Ta.process, Ql = function() {
  try {
    var e = Pt && Pt.require && Pt.require("util").types;
    return e || xn && xn.binding && xn.binding("util");
  } catch {
  }
}();
const wt = Ql;
var Tr = wt && wt.isTypedArray, Jl = Tr ? Wn(Tr) : Wl;
const Zn = Jl;
var Xl = Object.prototype, eu = Xl.hasOwnProperty;
function Ba(e, t) {
  var n = $e(e), r = !n && Et(e), a = !n && !r && jt(e), o = !n && !r && !a && Zn(e), s = n || r || a || o, i = s ? bl(e.length, String) : [], l = i.length;
  for (var c in e)
    (t || eu.call(e, c)) && !(s && // Safari 9 has enumerable `arguments.length` in strict mode.
    (c == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
    a && (c == "offset" || c == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
    o && (c == "buffer" || c == "byteLength" || c == "byteOffset") || // Skip index properties.
    un(c, l))) && i.push(c);
  return i;
}
function za(e, t) {
  return function(n) {
    return e(t(n));
  };
}
var tu = za(Object.keys, Object);
const nu = tu;
var ru = Object.prototype, au = ru.hasOwnProperty;
function ou(e) {
  if (!Gn(e))
    return nu(e);
  var t = [];
  for (var n in Object(e))
    au.call(e, n) && n != "constructor" && t.push(n);
  return t;
}
function Vt(e) {
  return dn(e) ? Ba(e) : ou(e);
}
function su(e) {
  var t = [];
  if (e != null)
    for (var n in Object(e))
      t.push(n);
  return t;
}
var iu = Object.prototype, lu = iu.hasOwnProperty;
function uu(e) {
  if (!Ae(e))
    return su(e);
  var t = Gn(e), n = [];
  for (var r in e)
    r == "constructor" && (t || !lu.call(e, r)) || n.push(r);
  return n;
}
function At(e) {
  return dn(e) ? Ba(e, !0) : uu(e);
}
var cu = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, du = /^\w*$/;
function Qn(e, t) {
  if ($e(e))
    return !1;
  var n = typeof e;
  return n == "number" || n == "symbol" || n == "boolean" || e == null || sn(e) ? !0 : du.test(e) || !cu.test(e) || t != null && e in Object(t);
}
var fu = ct(Object, "create");
const Ft = fu;
function pu() {
  this.__data__ = Ft ? Ft(null) : {}, this.size = 0;
}
function vu(e) {
  var t = this.has(e) && delete this.__data__[e];
  return this.size -= t ? 1 : 0, t;
}
var mu = "__lodash_hash_undefined__", bu = Object.prototype, hu = bu.hasOwnProperty;
function gu(e) {
  var t = this.__data__;
  if (Ft) {
    var n = t[e];
    return n === mu ? void 0 : n;
  }
  return hu.call(t, e) ? t[e] : void 0;
}
var yu = Object.prototype, wu = yu.hasOwnProperty;
function Su(e) {
  var t = this.__data__;
  return Ft ? t[e] !== void 0 : wu.call(t, e);
}
var _u = "__lodash_hash_undefined__";
function Cu(e, t) {
  var n = this.__data__;
  return this.size += this.has(e) ? 0 : 1, n[e] = Ft && t === void 0 ? _u : t, this;
}
function at(e) {
  var t = -1, n = e == null ? 0 : e.length;
  for (this.clear(); ++t < n; ) {
    var r = e[t];
    this.set(r[0], r[1]);
  }
}
at.prototype.clear = pu;
at.prototype.delete = vu;
at.prototype.get = gu;
at.prototype.has = Su;
at.prototype.set = Cu;
function xu() {
  this.__data__ = [], this.size = 0;
}
function fn(e, t) {
  for (var n = e.length; n--; )
    if (Ct(e[n][0], t))
      return n;
  return -1;
}
var Au = Array.prototype, Ou = Au.splice;
function $u(e) {
  var t = this.__data__, n = fn(t, e);
  if (n < 0)
    return !1;
  var r = t.length - 1;
  return n == r ? t.pop() : Ou.call(t, n, 1), --this.size, !0;
}
function Tu(e) {
  var t = this.__data__, n = fn(t, e);
  return n < 0 ? void 0 : t[n][1];
}
function Mu(e) {
  return fn(this.__data__, e) > -1;
}
function Du(e, t) {
  var n = this.__data__, r = fn(n, e);
  return r < 0 ? (++this.size, n.push([e, t])) : n[r][1] = t, this;
}
function Ge(e) {
  var t = -1, n = e == null ? 0 : e.length;
  for (this.clear(); ++t < n; ) {
    var r = e[t];
    this.set(r[0], r[1]);
  }
}
Ge.prototype.clear = xu;
Ge.prototype.delete = $u;
Ge.prototype.get = Tu;
Ge.prototype.has = Mu;
Ge.prototype.set = Du;
var Pu = ct(Le, "Map");
const Lt = Pu;
function Iu() {
  this.size = 0, this.__data__ = {
    hash: new at(),
    map: new (Lt || Ge)(),
    string: new at()
  };
}
function Ru(e) {
  var t = typeof e;
  return t == "string" || t == "number" || t == "symbol" || t == "boolean" ? e !== "__proto__" : e === null;
}
function pn(e, t) {
  var n = e.__data__;
  return Ru(t) ? n[typeof t == "string" ? "string" : "hash"] : n.map;
}
function Eu(e) {
  var t = pn(this, e).delete(e);
  return this.size -= t ? 1 : 0, t;
}
function ju(e) {
  return pn(this, e).get(e);
}
function Fu(e) {
  return pn(this, e).has(e);
}
function Lu(e, t) {
  var n = pn(this, e), r = n.size;
  return n.set(e, t), this.size += n.size == r ? 0 : 1, this;
}
function We(e) {
  var t = -1, n = e == null ? 0 : e.length;
  for (this.clear(); ++t < n; ) {
    var r = e[t];
    this.set(r[0], r[1]);
  }
}
We.prototype.clear = Iu;
We.prototype.delete = Eu;
We.prototype.get = ju;
We.prototype.has = Fu;
We.prototype.set = Lu;
var ku = "Expected a function";
function Jn(e, t) {
  if (typeof e != "function" || t != null && typeof t != "function")
    throw new TypeError(ku);
  var n = function() {
    var r = arguments, a = t ? t.apply(this, r) : r[0], o = n.cache;
    if (o.has(a))
      return o.get(a);
    var s = e.apply(this, r);
    return n.cache = o.set(a, s) || o, s;
  };
  return n.cache = new (Jn.Cache || We)(), n;
}
Jn.Cache = We;
var Nu = 500;
function Uu(e) {
  var t = Jn(e, function(r) {
    return n.size === Nu && n.clear(), r;
  }), n = t.cache;
  return t;
}
var Bu = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, zu = /\\(\\)?/g, qu = Uu(function(e) {
  var t = [];
  return e.charCodeAt(0) === 46 && t.push(""), e.replace(Bu, function(n, r, a, o) {
    t.push(a ? o.replace(zu, "$1") : r || n);
  }), t;
});
const Hu = qu;
function Kt(e) {
  return e == null ? "" : Pa(e);
}
function Yt(e, t) {
  return $e(e) ? e : Qn(e, t) ? [e] : Hu(Kt(e));
}
var Vu = 1 / 0;
function ot(e) {
  if (typeof e == "string" || sn(e))
    return e;
  var t = e + "";
  return t == "0" && 1 / e == -Vu ? "-0" : t;
}
function vn(e, t) {
  t = Yt(t, e);
  for (var n = 0, r = t.length; e != null && n < r; )
    e = e[ot(t[n++])];
  return n && n == r ? e : void 0;
}
function je(e, t, n) {
  var r = e == null ? void 0 : vn(e, t);
  return r === void 0 ? n : r;
}
function Xn(e, t) {
  for (var n = -1, r = t.length, a = e.length; ++n < r; )
    e[a + n] = t[n];
  return e;
}
var Mr = De ? De.isConcatSpreadable : void 0;
function Ku(e) {
  return $e(e) || Et(e) || !!(Mr && e && e[Mr]);
}
function qa(e, t, n, r, a) {
  var o = -1, s = e.length;
  for (n || (n = Ku), a || (a = []); ++o < s; ) {
    var i = e[o];
    t > 0 && n(i) ? t > 1 ? qa(i, t - 1, n, r, a) : Xn(a, i) : r || (a[a.length] = i);
  }
  return a;
}
function Yu(e) {
  var t = e == null ? 0 : e.length;
  return t ? qa(e, 1) : [];
}
function Gu(e) {
  return Ra(Ea(e, void 0, Yu), e + "");
}
var Wu = za(Object.getPrototypeOf, Object);
const er = Wu;
var Zu = "[object Object]", Qu = Function.prototype, Ju = Object.prototype, Ha = Qu.toString, Xu = Ju.hasOwnProperty, ec = Ha.call(Object);
function Be(e) {
  if (!Ee(e) || tt(e) != Zu)
    return !1;
  var t = er(e);
  if (t === null)
    return !0;
  var n = Xu.call(t, "constructor") && t.constructor;
  return typeof n == "function" && n instanceof n && Ha.call(n) == ec;
}
function Va(e, t, n) {
  var r = -1, a = e.length;
  t < 0 && (t = -t > a ? 0 : a + t), n = n > a ? a : n, n < 0 && (n += a), a = t > n ? 0 : n - t >>> 0, t >>>= 0;
  for (var o = Array(a); ++r < a; )
    o[r] = e[r + t];
  return o;
}
function tc(e, t, n) {
  var r = e.length;
  return n = n === void 0 ? r : n, !t && n >= r ? e : Va(e, t, n);
}
var nc = "\\ud800-\\udfff", rc = "\\u0300-\\u036f", ac = "\\ufe20-\\ufe2f", oc = "\\u20d0-\\u20ff", sc = rc + ac + oc, ic = "\\ufe0e\\ufe0f", lc = "\\u200d", uc = RegExp("[" + lc + nc + sc + ic + "]");
function Ka(e) {
  return uc.test(e);
}
function cc(e) {
  return e.split("");
}
var Ya = "\\ud800-\\udfff", dc = "\\u0300-\\u036f", fc = "\\ufe20-\\ufe2f", pc = "\\u20d0-\\u20ff", vc = dc + fc + pc, mc = "\\ufe0e\\ufe0f", bc = "[" + Ya + "]", Rn = "[" + vc + "]", En = "\\ud83c[\\udffb-\\udfff]", hc = "(?:" + Rn + "|" + En + ")", Ga = "[^" + Ya + "]", Wa = "(?:\\ud83c[\\udde6-\\uddff]){2}", Za = "[\\ud800-\\udbff][\\udc00-\\udfff]", gc = "\\u200d", Qa = hc + "?", Ja = "[" + mc + "]?", yc = "(?:" + gc + "(?:" + [Ga, Wa, Za].join("|") + ")" + Ja + Qa + ")*", wc = Ja + Qa + yc, Sc = "(?:" + [Ga + Rn + "?", Rn, Wa, Za, bc].join("|") + ")", _c = RegExp(En + "(?=" + En + ")|" + Sc + wc, "g");
function Cc(e) {
  return e.match(_c) || [];
}
function xc(e) {
  return Ka(e) ? Cc(e) : cc(e);
}
function Ac(e) {
  return function(t) {
    t = Kt(t);
    var n = Ka(t) ? xc(t) : void 0, r = n ? n[0] : t.charAt(0), a = n ? tc(n, 1).join("") : t.slice(1);
    return r[e]() + a;
  };
}
var Oc = Ac("toUpperCase");
const $c = Oc;
function Tc(e) {
  return $c(Kt(e).toLowerCase());
}
function Mc(e, t, n, r) {
  var a = -1, o = e == null ? 0 : e.length;
  for (r && o && (n = e[++a]); ++a < o; )
    n = t(n, e[a], a, e);
  return n;
}
function Dc(e) {
  return function(t) {
    return e == null ? void 0 : e[t];
  };
}
var Pc = {
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
}, Ic = Dc(Pc);
const Rc = Ic;
var Ec = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g, jc = "\\u0300-\\u036f", Fc = "\\ufe20-\\ufe2f", Lc = "\\u20d0-\\u20ff", kc = jc + Fc + Lc, Nc = "[" + kc + "]", Uc = RegExp(Nc, "g");
function Bc(e) {
  return e = Kt(e), e && e.replace(Ec, Rc).replace(Uc, "");
}
var zc = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g;
function qc(e) {
  return e.match(zc) || [];
}
var Hc = /[a-z][A-Z]|[A-Z]{2}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/;
function Vc(e) {
  return Hc.test(e);
}
var Xa = "\\ud800-\\udfff", Kc = "\\u0300-\\u036f", Yc = "\\ufe20-\\ufe2f", Gc = "\\u20d0-\\u20ff", Wc = Kc + Yc + Gc, eo = "\\u2700-\\u27bf", to = "a-z\\xdf-\\xf6\\xf8-\\xff", Zc = "\\xac\\xb1\\xd7\\xf7", Qc = "\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf", Jc = "\\u2000-\\u206f", Xc = " \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000", no = "A-Z\\xc0-\\xd6\\xd8-\\xde", ed = "\\ufe0e\\ufe0f", ro = Zc + Qc + Jc + Xc, ao = "['’]", Dr = "[" + ro + "]", td = "[" + Wc + "]", oo = "\\d+", nd = "[" + eo + "]", so = "[" + to + "]", io = "[^" + Xa + ro + oo + eo + to + no + "]", rd = "\\ud83c[\\udffb-\\udfff]", ad = "(?:" + td + "|" + rd + ")", od = "[^" + Xa + "]", lo = "(?:\\ud83c[\\udde6-\\uddff]){2}", uo = "[\\ud800-\\udbff][\\udc00-\\udfff]", dt = "[" + no + "]", sd = "\\u200d", Pr = "(?:" + so + "|" + io + ")", id = "(?:" + dt + "|" + io + ")", Ir = "(?:" + ao + "(?:d|ll|m|re|s|t|ve))?", Rr = "(?:" + ao + "(?:D|LL|M|RE|S|T|VE))?", co = ad + "?", fo = "[" + ed + "]?", ld = "(?:" + sd + "(?:" + [od, lo, uo].join("|") + ")" + fo + co + ")*", ud = "\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])", cd = "\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])", dd = fo + co + ld, fd = "(?:" + [nd, lo, uo].join("|") + ")" + dd, pd = RegExp([
  dt + "?" + so + "+" + Ir + "(?=" + [Dr, dt, "$"].join("|") + ")",
  id + "+" + Rr + "(?=" + [Dr, dt + Pr, "$"].join("|") + ")",
  dt + "?" + Pr + "+" + Ir,
  dt + "+" + Rr,
  cd,
  ud,
  oo,
  fd
].join("|"), "g");
function vd(e) {
  return e.match(pd) || [];
}
function md(e, t, n) {
  return e = Kt(e), t = n ? void 0 : t, t === void 0 ? Vc(e) ? vd(e) : qc(e) : e.match(t) || [];
}
var bd = "['’]", hd = RegExp(bd, "g");
function gd(e) {
  return function(t) {
    return Mc(md(Bc(t).replace(hd, "")), e, "");
  };
}
var yd = gd(function(e, t, n) {
  return t = t.toLowerCase(), e + (n ? Tc(t) : t);
});
const wd = yd;
function Sd() {
  this.__data__ = new Ge(), this.size = 0;
}
function _d(e) {
  var t = this.__data__, n = t.delete(e);
  return this.size = t.size, n;
}
function Cd(e) {
  return this.__data__.get(e);
}
function xd(e) {
  return this.__data__.has(e);
}
var Ad = 200;
function Od(e, t) {
  var n = this.__data__;
  if (n instanceof Ge) {
    var r = n.__data__;
    if (!Lt || r.length < Ad - 1)
      return r.push([e, t]), this.size = ++n.size, this;
    n = this.__data__ = new We(r);
  }
  return n.set(e, t), this.size = n.size, this;
}
function Re(e) {
  var t = this.__data__ = new Ge(e);
  this.size = t.size;
}
Re.prototype.clear = Sd;
Re.prototype.delete = _d;
Re.prototype.get = Cd;
Re.prototype.has = xd;
Re.prototype.set = Od;
function $d(e, t) {
  return e && xt(t, Vt(t), e);
}
function Td(e, t) {
  return e && xt(t, At(t), e);
}
var po = typeof exports == "object" && exports && !exports.nodeType && exports, Er = po && typeof module == "object" && module && !module.nodeType && module, Md = Er && Er.exports === po, jr = Md ? Le.Buffer : void 0, Fr = jr ? jr.allocUnsafe : void 0;
function vo(e, t) {
  if (t)
    return e.slice();
  var n = e.length, r = Fr ? Fr(n) : new e.constructor(n);
  return e.copy(r), r;
}
function Dd(e, t) {
  for (var n = -1, r = e == null ? 0 : e.length, a = 0, o = []; ++n < r; ) {
    var s = e[n];
    t(s, n, e) && (o[a++] = s);
  }
  return o;
}
function mo() {
  return [];
}
var Pd = Object.prototype, Id = Pd.propertyIsEnumerable, Lr = Object.getOwnPropertySymbols, Rd = Lr ? function(e) {
  return e == null ? [] : (e = Object(e), Dd(Lr(e), function(t) {
    return Id.call(e, t);
  }));
} : mo;
const tr = Rd;
function Ed(e, t) {
  return xt(e, tr(e), t);
}
var jd = Object.getOwnPropertySymbols, Fd = jd ? function(e) {
  for (var t = []; e; )
    Xn(t, tr(e)), e = er(e);
  return t;
} : mo;
const bo = Fd;
function Ld(e, t) {
  return xt(e, bo(e), t);
}
function ho(e, t, n) {
  var r = t(e);
  return $e(e) ? r : Xn(r, n(e));
}
function jn(e) {
  return ho(e, Vt, tr);
}
function go(e) {
  return ho(e, At, bo);
}
var kd = ct(Le, "DataView");
const Fn = kd;
var Nd = ct(Le, "Promise");
const Ln = Nd;
var Ud = ct(Le, "Set");
const ht = Ud;
var kr = "[object Map]", Bd = "[object Object]", Nr = "[object Promise]", Ur = "[object Set]", Br = "[object WeakMap]", zr = "[object DataView]", zd = ut(Fn), qd = ut(Lt), Hd = ut(Ln), Vd = ut(ht), Kd = ut(In), nt = tt;
(Fn && nt(new Fn(new ArrayBuffer(1))) != zr || Lt && nt(new Lt()) != kr || Ln && nt(Ln.resolve()) != Nr || ht && nt(new ht()) != Ur || In && nt(new In()) != Br) && (nt = function(e) {
  var t = tt(e), n = t == Bd ? e.constructor : void 0, r = n ? ut(n) : "";
  if (r)
    switch (r) {
      case zd:
        return zr;
      case qd:
        return kr;
      case Hd:
        return Nr;
      case Vd:
        return Ur;
      case Kd:
        return Br;
    }
  return t;
});
const kt = nt;
var Yd = Object.prototype, Gd = Yd.hasOwnProperty;
function Wd(e) {
  var t = e.length, n = new e.constructor(t);
  return t && typeof e[0] == "string" && Gd.call(e, "index") && (n.index = e.index, n.input = e.input), n;
}
var Zd = Le.Uint8Array;
const nn = Zd;
function nr(e) {
  var t = new e.constructor(e.byteLength);
  return new nn(t).set(new nn(e)), t;
}
function Qd(e, t) {
  var n = t ? nr(e.buffer) : e.buffer;
  return new e.constructor(n, e.byteOffset, e.byteLength);
}
var Jd = /\w*$/;
function Xd(e) {
  var t = new e.constructor(e.source, Jd.exec(e));
  return t.lastIndex = e.lastIndex, t;
}
var qr = De ? De.prototype : void 0, Hr = qr ? qr.valueOf : void 0;
function ef(e) {
  return Hr ? Object(Hr.call(e)) : {};
}
function yo(e, t) {
  var n = t ? nr(e.buffer) : e.buffer;
  return new e.constructor(n, e.byteOffset, e.length);
}
var tf = "[object Boolean]", nf = "[object Date]", rf = "[object Map]", af = "[object Number]", of = "[object RegExp]", sf = "[object Set]", lf = "[object String]", uf = "[object Symbol]", cf = "[object ArrayBuffer]", df = "[object DataView]", ff = "[object Float32Array]", pf = "[object Float64Array]", vf = "[object Int8Array]", mf = "[object Int16Array]", bf = "[object Int32Array]", hf = "[object Uint8Array]", gf = "[object Uint8ClampedArray]", yf = "[object Uint16Array]", wf = "[object Uint32Array]";
function Sf(e, t, n) {
  var r = e.constructor;
  switch (t) {
    case cf:
      return nr(e);
    case tf:
    case nf:
      return new r(+e);
    case df:
      return Qd(e, n);
    case ff:
    case pf:
    case vf:
    case mf:
    case bf:
    case hf:
    case gf:
    case yf:
    case wf:
      return yo(e, n);
    case rf:
      return new r();
    case af:
    case lf:
      return new r(e);
    case of:
      return Xd(e);
    case sf:
      return new r();
    case uf:
      return ef(e);
  }
}
function wo(e) {
  return typeof e.constructor == "function" && !Gn(e) ? Ki(er(e)) : {};
}
var _f = "[object Map]";
function Cf(e) {
  return Ee(e) && kt(e) == _f;
}
var Vr = wt && wt.isMap, xf = Vr ? Wn(Vr) : Cf;
const Af = xf;
var Of = "[object Set]";
function $f(e) {
  return Ee(e) && kt(e) == Of;
}
var Kr = wt && wt.isSet, Tf = Kr ? Wn(Kr) : $f;
const Mf = Tf;
var Df = 1, Pf = 2, If = 4, So = "[object Arguments]", Rf = "[object Array]", Ef = "[object Boolean]", jf = "[object Date]", Ff = "[object Error]", _o = "[object Function]", Lf = "[object GeneratorFunction]", kf = "[object Map]", Nf = "[object Number]", Co = "[object Object]", Uf = "[object RegExp]", Bf = "[object Set]", zf = "[object String]", qf = "[object Symbol]", Hf = "[object WeakMap]", Vf = "[object ArrayBuffer]", Kf = "[object DataView]", Yf = "[object Float32Array]", Gf = "[object Float64Array]", Wf = "[object Int8Array]", Zf = "[object Int16Array]", Qf = "[object Int32Array]", Jf = "[object Uint8Array]", Xf = "[object Uint8ClampedArray]", ep = "[object Uint16Array]", tp = "[object Uint32Array]", fe = {};
fe[So] = fe[Rf] = fe[Vf] = fe[Kf] = fe[Ef] = fe[jf] = fe[Yf] = fe[Gf] = fe[Wf] = fe[Zf] = fe[Qf] = fe[kf] = fe[Nf] = fe[Co] = fe[Uf] = fe[Bf] = fe[zf] = fe[qf] = fe[Jf] = fe[Xf] = fe[ep] = fe[tp] = !0;
fe[Ff] = fe[_o] = fe[Hf] = !1;
function It(e, t, n, r, a, o) {
  var s, i = t & Df, l = t & Pf, c = t & If;
  if (n && (s = a ? n(e, r, a, o) : n(e)), s !== void 0)
    return s;
  if (!Ae(e))
    return e;
  var u = $e(e);
  if (u) {
    if (s = Wd(e), !i)
      return Ia(e, s);
  } else {
    var f = kt(e), v = f == _o || f == Lf;
    if (jt(e))
      return vo(e, i);
    if (f == Co || f == So || v && !a) {
      if (s = l || v ? {} : wo(e), !i)
        return l ? Ld(e, Td(s, e)) : Ed(e, $d(s, e));
    } else {
      if (!fe[f])
        return a ? e : {};
      s = Sf(e, f, i);
    }
  }
  o || (o = new Re());
  var h = o.get(e);
  if (h)
    return h;
  o.set(e, s), Mf(e) ? e.forEach(function(b) {
    s.add(It(b, t, n, b, e, o));
  }) : Af(e) && e.forEach(function(b, C) {
    s.set(C, It(b, t, n, C, e, o));
  });
  var y = c ? l ? go : jn : l ? At : Vt, w = u ? void 0 : y(e);
  return al(w || e, function(b, C) {
    w && (C = b, b = e[C]), Kn(s, C, It(b, t, n, C, e, o));
  }), s;
}
var np = 1, rp = 4;
function Me(e) {
  return It(e, np | rp);
}
var ap = "__lodash_hash_undefined__";
function op(e) {
  return this.__data__.set(e, ap), this;
}
function sp(e) {
  return this.__data__.has(e);
}
function Nt(e) {
  var t = -1, n = e == null ? 0 : e.length;
  for (this.__data__ = new We(); ++t < n; )
    this.add(e[t]);
}
Nt.prototype.add = Nt.prototype.push = op;
Nt.prototype.has = sp;
function ip(e, t) {
  for (var n = -1, r = e == null ? 0 : e.length; ++n < r; )
    if (t(e[n], n, e))
      return !0;
  return !1;
}
function xo(e, t) {
  return e.has(t);
}
var lp = 1, up = 2;
function Ao(e, t, n, r, a, o) {
  var s = n & lp, i = e.length, l = t.length;
  if (i != l && !(s && l > i))
    return !1;
  var c = o.get(e), u = o.get(t);
  if (c && u)
    return c == t && u == e;
  var f = -1, v = !0, h = n & up ? new Nt() : void 0;
  for (o.set(e, t), o.set(t, e); ++f < i; ) {
    var y = e[f], w = t[f];
    if (r)
      var b = s ? r(w, y, f, t, e, o) : r(y, w, f, e, t, o);
    if (b !== void 0) {
      if (b)
        continue;
      v = !1;
      break;
    }
    if (h) {
      if (!ip(t, function(C, d) {
        if (!xo(h, d) && (y === C || a(y, C, n, r, o)))
          return h.push(d);
      })) {
        v = !1;
        break;
      }
    } else if (!(y === w || a(y, w, n, r, o))) {
      v = !1;
      break;
    }
  }
  return o.delete(e), o.delete(t), v;
}
function cp(e) {
  var t = -1, n = Array(e.size);
  return e.forEach(function(r, a) {
    n[++t] = [a, r];
  }), n;
}
function rr(e) {
  var t = -1, n = Array(e.size);
  return e.forEach(function(r) {
    n[++t] = r;
  }), n;
}
var dp = 1, fp = 2, pp = "[object Boolean]", vp = "[object Date]", mp = "[object Error]", bp = "[object Map]", hp = "[object Number]", gp = "[object RegExp]", yp = "[object Set]", wp = "[object String]", Sp = "[object Symbol]", _p = "[object ArrayBuffer]", Cp = "[object DataView]", Yr = De ? De.prototype : void 0, An = Yr ? Yr.valueOf : void 0;
function xp(e, t, n, r, a, o, s) {
  switch (n) {
    case Cp:
      if (e.byteLength != t.byteLength || e.byteOffset != t.byteOffset)
        return !1;
      e = e.buffer, t = t.buffer;
    case _p:
      return !(e.byteLength != t.byteLength || !o(new nn(e), new nn(t)));
    case pp:
    case vp:
    case hp:
      return Ct(+e, +t);
    case mp:
      return e.name == t.name && e.message == t.message;
    case gp:
    case wp:
      return e == t + "";
    case bp:
      var i = cp;
    case yp:
      var l = r & dp;
      if (i || (i = rr), e.size != t.size && !l)
        return !1;
      var c = s.get(e);
      if (c)
        return c == t;
      r |= fp, s.set(e, t);
      var u = Ao(i(e), i(t), r, a, o, s);
      return s.delete(e), u;
    case Sp:
      if (An)
        return An.call(e) == An.call(t);
  }
  return !1;
}
var Ap = 1, Op = Object.prototype, $p = Op.hasOwnProperty;
function Tp(e, t, n, r, a, o) {
  var s = n & Ap, i = jn(e), l = i.length, c = jn(t), u = c.length;
  if (l != u && !s)
    return !1;
  for (var f = l; f--; ) {
    var v = i[f];
    if (!(s ? v in t : $p.call(t, v)))
      return !1;
  }
  var h = o.get(e), y = o.get(t);
  if (h && y)
    return h == t && y == e;
  var w = !0;
  o.set(e, t), o.set(t, e);
  for (var b = s; ++f < l; ) {
    v = i[f];
    var C = e[v], d = t[v];
    if (r)
      var m = s ? r(d, C, v, t, e, o) : r(C, d, v, e, t, o);
    if (!(m === void 0 ? C === d || a(C, d, n, r, o) : m)) {
      w = !1;
      break;
    }
    b || (b = v == "constructor");
  }
  if (w && !b) {
    var x = e.constructor, O = t.constructor;
    x != O && "constructor" in e && "constructor" in t && !(typeof x == "function" && x instanceof x && typeof O == "function" && O instanceof O) && (w = !1);
  }
  return o.delete(e), o.delete(t), w;
}
var Mp = 1, Gr = "[object Arguments]", Wr = "[object Array]", Qt = "[object Object]", Dp = Object.prototype, Zr = Dp.hasOwnProperty;
function Pp(e, t, n, r, a, o) {
  var s = $e(e), i = $e(t), l = s ? Wr : kt(e), c = i ? Wr : kt(t);
  l = l == Gr ? Qt : l, c = c == Gr ? Qt : c;
  var u = l == Qt, f = c == Qt, v = l == c;
  if (v && jt(e)) {
    if (!jt(t))
      return !1;
    s = !0, u = !1;
  }
  if (v && !u)
    return o || (o = new Re()), s || Zn(e) ? Ao(e, t, n, r, a, o) : xp(e, t, l, n, r, a, o);
  if (!(n & Mp)) {
    var h = u && Zr.call(e, "__wrapped__"), y = f && Zr.call(t, "__wrapped__");
    if (h || y) {
      var w = h ? e.value() : e, b = y ? t.value() : t;
      return o || (o = new Re()), a(w, b, n, r, o);
    }
  }
  return v ? (o || (o = new Re()), Tp(e, t, n, r, a, o)) : !1;
}
function mn(e, t, n, r, a) {
  return e === t ? !0 : e == null || t == null || !Ee(e) && !Ee(t) ? e !== e && t !== t : Pp(e, t, n, r, mn, a);
}
var Ip = 1, Rp = 2;
function Ep(e, t, n, r) {
  var a = n.length, o = a, s = !r;
  if (e == null)
    return !o;
  for (e = Object(e); a--; ) {
    var i = n[a];
    if (s && i[2] ? i[1] !== e[i[0]] : !(i[0] in e))
      return !1;
  }
  for (; ++a < o; ) {
    i = n[a];
    var l = i[0], c = e[l], u = i[1];
    if (s && i[2]) {
      if (c === void 0 && !(l in e))
        return !1;
    } else {
      var f = new Re();
      if (r)
        var v = r(c, u, l, e, t, f);
      if (!(v === void 0 ? mn(u, c, Ip | Rp, r, f) : v))
        return !1;
    }
  }
  return !0;
}
function Oo(e) {
  return e === e && !Ae(e);
}
function jp(e) {
  for (var t = Vt(e), n = t.length; n--; ) {
    var r = t[n], a = e[r];
    t[n] = [r, a, Oo(a)];
  }
  return t;
}
function $o(e, t) {
  return function(n) {
    return n == null ? !1 : n[e] === t && (t !== void 0 || e in Object(n));
  };
}
function Fp(e) {
  var t = jp(e);
  return t.length == 1 && t[0][2] ? $o(t[0][0], t[0][1]) : function(n) {
    return n === e || Ep(n, e, t);
  };
}
function Lp(e, t) {
  return e != null && t in Object(e);
}
function kp(e, t, n) {
  t = Yt(t, e);
  for (var r = -1, a = t.length, o = !1; ++r < a; ) {
    var s = ot(t[r]);
    if (!(o = e != null && n(e, s)))
      break;
    e = e[s];
  }
  return o || ++r != a ? o : (a = e == null ? 0 : e.length, !!a && Yn(a) && un(s, a) && ($e(e) || Et(e)));
}
function Np(e, t) {
  return e != null && kp(e, t, Lp);
}
var Up = 1, Bp = 2;
function zp(e, t) {
  return Qn(e) && Oo(t) ? $o(ot(e), t) : function(n) {
    var r = je(n, e);
    return r === void 0 && r === t ? Np(n, e) : mn(t, r, Up | Bp);
  };
}
function qp(e) {
  return function(t) {
    return t == null ? void 0 : t[e];
  };
}
function Hp(e) {
  return function(t) {
    return vn(t, e);
  };
}
function Vp(e) {
  return Qn(e) ? qp(ot(e)) : Hp(e);
}
function Kp(e) {
  return typeof e == "function" ? e : e == null ? ln : typeof e == "object" ? $e(e) ? zp(e[0], e[1]) : Fp(e) : Vp(e);
}
function Yp(e) {
  return function(t, n, r) {
    for (var a = -1, o = Object(t), s = r(t), i = s.length; i--; ) {
      var l = s[e ? i : ++a];
      if (n(o[l], l, o) === !1)
        break;
    }
    return t;
  };
}
var Gp = Yp();
const To = Gp;
function Wp(e, t) {
  return e && To(e, t, Vt);
}
var Zp = function() {
  return Le.Date.now();
};
const On = Zp;
var Qp = "Expected a function", Jp = Math.max, Xp = Math.min;
function Mo(e, t, n) {
  var r, a, o, s, i, l, c = 0, u = !1, f = !1, v = !0;
  if (typeof e != "function")
    throw new TypeError(Qp);
  t = Sr(t) || 0, Ae(n) && (u = !!n.leading, f = "maxWait" in n, o = f ? Jp(Sr(n.maxWait) || 0, t) : o, v = "trailing" in n ? !!n.trailing : v);
  function h(A) {
    var T = r, p = a;
    return r = a = void 0, c = A, s = e.apply(p, T), s;
  }
  function y(A) {
    return c = A, i = setTimeout(C, t), u ? h(A) : s;
  }
  function w(A) {
    var T = A - l, p = A - c, g = t - T;
    return f ? Xp(g, o - p) : g;
  }
  function b(A) {
    var T = A - l, p = A - c;
    return l === void 0 || T >= t || T < 0 || f && p >= o;
  }
  function C() {
    var A = On();
    if (b(A))
      return d(A);
    i = setTimeout(C, w(A));
  }
  function d(A) {
    return i = void 0, v && r ? h(A) : (r = a = void 0, s);
  }
  function m() {
    i !== void 0 && clearTimeout(i), c = 0, r = l = a = i = void 0;
  }
  function x() {
    return i === void 0 ? s : d(On());
  }
  function O() {
    var A = On(), T = b(A);
    if (r = arguments, a = this, l = A, T) {
      if (i === void 0)
        return y(l);
      if (f)
        return clearTimeout(i), i = setTimeout(C, t), h(l);
    }
    return i === void 0 && (i = setTimeout(C, t)), s;
  }
  return O.cancel = m, O.flush = x, O;
}
var Do = Object.prototype, ev = Do.hasOwnProperty, tv = ja(function(e, t) {
  e = Object(e);
  var n = -1, r = t.length, a = r > 2 ? t[2] : void 0;
  for (a && Fa(t[0], t[1], a) && (r = 1); ++n < r; )
    for (var o = t[n], s = At(o), i = -1, l = s.length; ++i < l; ) {
      var c = s[i], u = e[c];
      (u === void 0 || Ct(u, Do[c]) && !ev.call(e, c)) && (e[c] = o[c]);
    }
  return e;
});
const Xe = tv;
function kn(e, t, n) {
  (n !== void 0 && !Ct(e[t], n) || n === void 0 && !(t in e)) && cn(e, t, n);
}
function nv(e) {
  return Ee(e) && dn(e);
}
function Nn(e, t) {
  if (!(t === "constructor" && typeof e[t] == "function") && t != "__proto__")
    return e[t];
}
function rv(e) {
  return xt(e, At(e));
}
function av(e, t, n, r, a, o, s) {
  var i = Nn(e, n), l = Nn(t, n), c = s.get(l);
  if (c) {
    kn(e, n, c);
    return;
  }
  var u = o ? o(i, l, n + "", e, t, s) : void 0, f = u === void 0;
  if (f) {
    var v = $e(l), h = !v && jt(l), y = !v && !h && Zn(l);
    u = l, v || h || y ? $e(i) ? u = i : nv(i) ? u = Ia(i) : h ? (f = !1, u = vo(l, !0)) : y ? (f = !1, u = yo(l, !0)) : u = [] : Be(l) || Et(l) ? (u = i, Et(i) ? u = rv(i) : (!Ae(i) || Ye(i)) && (u = wo(l))) : f = !1;
  }
  f && (s.set(l, u), a(u, l, r, o, s), s.delete(l)), kn(e, n, u);
}
function ar(e, t, n, r, a) {
  e !== t && To(t, function(o, s) {
    if (a || (a = new Re()), Ae(o))
      av(e, t, s, n, ar, r, a);
    else {
      var i = r ? r(Nn(e, s), o, s + "", e, t, a) : void 0;
      i === void 0 && (i = o), kn(e, s, i);
    }
  }, At);
}
var ov = La(function(e, t, n, r) {
  ar(e, t, n, r);
});
const sv = ov;
function iv(e, t, n) {
  for (var r = -1, a = e == null ? 0 : e.length; ++r < a; )
    if (n(t, e[r]))
      return !0;
  return !1;
}
function lv(e) {
  var t = e == null ? 0 : e.length;
  return t ? e[t - 1] : void 0;
}
function uv(e) {
  return typeof e == "function" ? e : ln;
}
function cv(e, t) {
  return t.length < 2 ? e : vn(e, Va(t, 0, -1));
}
function Un(e, t) {
  return mn(e, t);
}
var dv = "[object Number]";
function pt(e) {
  return typeof e == "number" || Ee(e) && tt(e) == dv;
}
function fv(e, t) {
  var n = {};
  return t = Kp(t), Wp(e, function(r, a, o) {
    cn(n, t(r, a, o), r);
  }), n;
}
var pv = La(function(e, t, n) {
  ar(e, t, n);
});
const Gt = pv;
var vv = Object.prototype, mv = vv.hasOwnProperty;
function bv(e, t) {
  t = Yt(t, e);
  var n = -1, r = t.length;
  if (!r)
    return !0;
  for (; ++n < r; ) {
    var a = ot(t[n]);
    if (a === "__proto__" && !mv.call(e, "__proto__") || (a === "constructor" || a === "prototype") && n < r - 1)
      return !1;
  }
  var o = cv(e, t);
  return o == null || delete o[ot(lv(t))];
}
function hv(e) {
  return Be(e) ? void 0 : e;
}
var gv = 1, yv = 2, wv = 4, Sv = Gu(function(e, t) {
  var n = {};
  if (e == null)
    return n;
  var r = !1;
  t = Da(t, function(o) {
    return o = Yt(o, e), r || (r = o.length > 1), o;
  }), xt(e, go(e), n), r && (n = It(n, gv | yv | wv, hv));
  for (var a = t.length; a--; )
    bv(n, t[a]);
  return n;
});
const _v = Sv;
function Po(e, t, n, r) {
  if (!Ae(e))
    return e;
  t = Yt(t, e);
  for (var a = -1, o = t.length, s = o - 1, i = e; i != null && ++a < o; ) {
    var l = ot(t[a]), c = n;
    if (l === "__proto__" || l === "constructor" || l === "prototype")
      return e;
    if (a != s) {
      var u = i[l];
      c = r ? r(u, l, i) : void 0, c === void 0 && (c = Ae(u) ? u : un(t[a + 1]) ? [] : {});
    }
    Kn(i, l, c), i = i[l];
  }
  return e;
}
function Ut(e, t, n) {
  return e == null ? e : Po(e, t, n);
}
var Cv = "Expected a function";
function xv(e, t, n) {
  var r = !0, a = !0;
  if (typeof e != "function")
    throw new TypeError(Cv);
  return Ae(n) && (r = "leading" in n ? !!n.leading : r, a = "trailing" in n ? !!n.trailing : a), Mo(e, t, {
    leading: r,
    maxWait: t,
    trailing: a
  });
}
var Av = 1 / 0, Ov = ht && 1 / rr(new ht([, -0]))[1] == Av ? function(e) {
  return new ht(e);
} : Gi;
const $v = Ov;
var Tv = 200;
function Mv(e, t, n) {
  var r = -1, a = ul, o = e.length, s = !0, i = [], l = i;
  if (n)
    s = !1, a = iv;
  else if (o >= Tv) {
    var c = t ? null : $v(e);
    if (c)
      return rr(c);
    s = !1, a = xo, l = new Nt();
  } else
    l = t ? [] : i;
  e:
    for (; ++r < o; ) {
      var u = e[r], f = t ? t(u) : u;
      if (u = n || u !== 0 ? u : 0, s && f === f) {
        for (var v = l.length; v--; )
          if (l[v] === f)
            continue e;
        t && l.push(f), i.push(u);
      } else
        a(l, f, n) || (l !== i && l.push(f), i.push(u));
    }
  return i;
}
function Dv(e) {
  return e && e.length ? Mv(e) : [];
}
function Pv(e, t, n, r) {
  return Po(e, t, n(vn(e, t)), r);
}
function Iv(e, t, n) {
  return e == null ? e : Pv(e, t, uv(n));
}
let gt = (e = 21) => crypto.getRandomValues(new Uint8Array(e)).reduce((t, n) => (n &= 63, n < 36 ? t += n.toString(36) : n < 62 ? t += (n - 26).toString(36).toUpperCase() : n > 62 ? t += "-" : t += "_", t), "");
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
], Ro = new Set(Io), Xt = {
  name: "zh-CN",
  messages: {
    yes: "是",
    no: "否",
    confirm: "确定",
    cancel: "取消",
    add: "新增",
    delete: "删除",
    edit: "修改",
    detail: "查看",
    submit: "提交",
    search: "查询",
    reset: "重置",
    save: "保存",
    expand: "展开",
    collapse: "收起",
    deleteConfirm: "确定要删除吗？",
    editTitle: "编辑",
    detailTitle: "详情",
    actionColumn: "操作",
    indexColumn: "序号",
    input: "请输入{label}",
    select: "请选择{label}",
    selectStart: "请选择开始{label}",
    selectEnd: "请选择结束{label}",
    validationFailed: "表单校验失败",
    required: "{label}不能为空！",
    email: "请输入正确的邮箱地址",
    integer: "{label}必须为整数",
    number: "{label}必须为数字",
    idcard: "请输入正确的身份证号",
    phone: "请输入正确的电话号码",
    mobile: "请输入正确的手机号",
    twoDecimal: "最多支持2位小数",
    word: "{label}只能为字母数字及下划线，且首字符不能为_",
    stringLen: "{label}长度必须等于{len}",
    stringMax: "{label}长度不能超过{max}",
    stringMin: "{label}长度至少为{min}",
    stringRange: "{label}长度必须{min}至{max}之间",
    numberLen: "{label}需等于{len}",
    numberMax: "{label}需小于{max}",
    numberMin: "{label}需大于{min}",
    numberRange: "{label}需在{min}至{max}之间",
    addTag: "添加标签",
    upload: "上传文件",
    download: "下载",
    preview: "预览",
    uploadWaiting: "待处理",
    uploadError: "处理失败",
    uploadEmpty: "暂无附件",
    uploadSync: "文件同步中，请稍候...",
    uploadFailed: "文件上传失败",
    selectFailed: "文件选择失败",
    deleteFileConfirm: "确定删除吗？",
    deletingFile: "文件删除中……",
    deleteFileFailed: "文件删除失败",
    downloadingFile: "文件下载中，请稍候...",
    downloadFileFailed: "文件下载失败",
    fileFormats: "支持文件格式：{accept}",
    fileSizeTip: "单个文件不超过{maxSize}MB",
    fileCount: "文件数量最多{maxCount}",
    fileType: "请选择正确的文件类型！",
    fileMinSize: "文件最小需要{minSize}M",
    fileMaxSize: "文件最大不超过{maxSize}M",
    fileDuplicate: "文件重复: {name}",
    fileProcessFailed: "文件处理失败，请删除后重新选择！",
    recordDeleted: "当前记录已删除",
    insertRecordDeleted: "新增位置对应的记录已删除",
    insertPositionInvalid: "新增位置已失效，请重新选择插入位置",
    insertAnchorDeleted: "新增锚点已不存在，请取消后重新选择插入位置",
    recordNotSelected: "未选择记录"
  }
}, Eb = {
  name: "en-US",
  messages: {
    yes: "Yes",
    no: "No",
    confirm: "OK",
    cancel: "Cancel",
    add: "Add",
    delete: "Delete",
    edit: "Edit",
    detail: "View",
    submit: "Submit",
    search: "Search",
    reset: "Reset",
    save: "Save",
    expand: "Expand",
    collapse: "Collapse",
    deleteConfirm: "Are you sure you want to delete?",
    editTitle: "Edit",
    detailTitle: "Details",
    actionColumn: "Actions",
    indexColumn: "No.",
    input: "Please enter {label}",
    select: "Please select {label}",
    selectStart: "Please select start {label}",
    selectEnd: "Please select end {label}",
    validationFailed: "Form validation failed",
    required: "{label} is required!",
    email: "Please enter a valid email address",
    integer: "{label} must be an integer",
    number: "{label} must be a number",
    idcard: "Please enter a valid ID card number",
    phone: "Please enter a valid telephone number",
    mobile: "Please enter a valid mobile number",
    twoDecimal: "Use at most 2 decimal places",
    word: "{label} may contain only letters, numbers and underscores, and cannot start with an underscore",
    stringLen: "{label} must be {len} characters long",
    stringMax: "{label} cannot exceed {max} characters",
    stringMin: "{label} must be at least {min} characters long",
    stringRange: "{label} must be between {min} and {max} characters long",
    numberLen: "{label} must equal {len}",
    numberMax: "{label} must be less than {max}",
    numberMin: "{label} must be greater than {min}",
    numberRange: "{label} must be between {min} and {max}",
    addTag: "Add tag",
    upload: "Upload file",
    download: "Download",
    preview: "Preview",
    uploadWaiting: "Waiting",
    uploadError: "Processing failed",
    uploadEmpty: "No attachments",
    uploadSync: "Synchronizing files, please wait...",
    uploadFailed: "File upload failed",
    selectFailed: "File selection failed",
    deleteFileConfirm: "Are you sure you want to delete this file?",
    deletingFile: "Deleting file...",
    deleteFileFailed: "File deletion failed",
    downloadingFile: "Downloading file, please wait...",
    downloadFileFailed: "File download failed",
    fileFormats: "Supported file formats: {accept}",
    fileSizeTip: "Each file must not exceed {maxSize} MB",
    fileCount: "A maximum of {maxCount} files is allowed",
    fileType: "Please select a supported file type!",
    fileMinSize: "File size must be at least {minSize} MB",
    fileMaxSize: "File size must not exceed {maxSize} MB",
    fileDuplicate: "Duplicate file: {name}",
    fileProcessFailed: "File processing failed. Please remove the file and select it again!",
    recordDeleted: "The record has been deleted",
    insertRecordDeleted: "The record at the insertion position has been deleted",
    insertPositionInvalid: "The insertion position is no longer valid. Please select it again",
    insertAnchorDeleted: "The insertion anchor no longer exists. Please cancel and select the position again",
    recordNotSelected: "No record selected"
  }
}, Eo = Ve(Xt);
function Rv(e = Xt) {
  var t;
  const n = { ...Xt.messages };
  for (const r of Object.keys(n))
    n[r] = ((t = e.messages) == null ? void 0 : t[r]) ?? n[r];
  Eo.value = { name: e.name ?? Xt.name, messages: n };
}
function q(e, t = {}) {
  return Eo.value.messages[e].replace(/\{(\w+)\}/g, (n, r) => String(t[r] ?? ""));
}
function Qr(e) {
  const t = () => $("div", e.contentAttrs, [e.content()]);
  if (e.component)
    return $(
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
  return $("div", de(e.attrs || {}, { class: "sup-group" }), [
    (e.title || !n && e.extra) && $(
      "div",
      {
        class: "sup-titlebar",
        style: { display: "flex", alignItems: "center" }
      },
      [
        e.title && $("div", { class: "sup-title" }, [e.title()]),
        !n && e.extra && $(
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
    n && e.extra && $(
      "div",
      {
        class: "sup-bottom-buttons",
        style: { textAlign: e.extraAlign }
      },
      [e.extra()]
    )
  ]);
}
const Ev = /* @__PURE__ */ new Set(["group", "card", "tabs", "collapse", "descriptions", "upload"]);
function jo(e = {}) {
  return or(Object.fromEntries(Object.entries(e).map(([t, n]) => [t, { render: n }]))).render;
}
function or(e = {}) {
  const t = {}, n = { render: t };
  for (const r of Object.keys(e)) {
    const a = e[r];
    if (!a)
      continue;
    a.service && Object.assign(n, { [r]: a.service }), a.schemaDefaults && (n.defaults = { ...a.schemaDefaults });
    const { defaults: o, adaptProps: s } = a, i = Ev.has(r), l = a.render, c = a.component;
    Object.assign(t, {
      [r]: (u = {}, f = {}) => {
        const v = i ? u.attrs || {} : u, h = {
          type: r,
          attrs: o ? { ...o, ...v } : v,
          state: u,
          slots: i && u.slots || f
        };
        return s && (h.attrs = s(h.attrs, h)), i && (h.state = { ...u, attrs: h.attrs, slots: h.slots }), l ? l(h) : $(c, h.attrs, h.slots);
      }
    });
  }
  return n;
}
const Fo = /* @__PURE__ */ new Map(), Lo = /* @__PURE__ */ new Map(), Rt = /* @__PURE__ */ new Map();
function ko(e, t = "manual") {
  const n = t === "manual" ? Fo : Lo;
  Object.entries(e).forEach(([r, a]) => {
    a && n.set(r, a);
  });
}
function sr(e) {
  var t;
  const n = st();
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
  return Rt.get(r) ?? a.map((o) => Fo.get(o)).find(Boolean) ?? a.map((o) => Lo.get(o)).find(Boolean);
}
function jv(e) {
  var t;
  const n = Rt.get(e);
  if (n)
    return n;
  const r = sr(e);
  if (!r)
    throw new Error(
      `UIAdapter '${st().name}' 支持字段 '${e}'，但组件 '${e}' 尚未注册；请启用自动导入插件，或在 superForm.initialize({ components }) 中提供`
    );
  const a = ((t = st().fieldSources) == null ? void 0 : t[e]) ?? e;
  return Rt.set(a, r), Rt.set(e, r), r;
}
function Fv(e) {
  const t = Rt.get(e);
  if (!t)
    throw new Error(`原始 UI 组件 '${e}' 尚未加载`);
  return t;
}
let vt;
function Lv(e) {
  if (!("uiComponents" in e))
    return e;
  const { uiComponents: t, ...n } = e, r = or(t);
  return { ...n, ...r, render: { ...r.render, ...jo(e.render) } };
}
function st() {
  if (!vt)
    throw new Error(
      "SuperForm 尚未初始化 UIAdapter；官方产品请先调用 superForm.initialize()，独立 Core 请调用 superForm.useAdapter(adapter)"
    );
  return vt;
}
function Jr(e) {
  if (vt) {
    if (vt !== e)
      throw new Error(`UIAdapter 已初始化为 '${vt.name}'，不能切换为 '${e.name}'`);
    return;
  }
  vt = e, ko(e.fieldComponents || {}, "manual");
}
function No(e, t = {}) {
  const { uiComponents: n, ...r } = t, a = or(n);
  return {
    ...e,
    ...a,
    ...r,
    defaults: { ...e.defaults, ...a.defaults },
    render: { ...e.render, ...a.render, ...jo(t.render) }
  };
}
const Xr = {};
function Z(e) {
  const t = Xr[e];
  if (t)
    return t;
  const n = st();
  let r = n.render[e];
  if (e === "group") {
    const a = n.render.group || Qr;
    r = (o) => o.component ? Qr(o) : a(o);
  } else
    e === "compactSpace" && (r || (r = n.render.space));
  if (!r)
    throw new Error(`UIAdapter '${n.name}' 未提供 render.${e}`);
  return Xr[e] = r, r;
}
function xe(e) {
  const t = st(), n = t[e];
  if (!n)
    throw new Error(`UIAdapter '${t.name}' 未提供 ${e} 协议`);
  return n;
}
const kv = {
  type: { type: String, required: !0 },
  option: { type: Object, required: !0 },
  model: { type: Object, required: !0 },
  effectData: { type: Object, required: !0 },
  binding: { type: Object, required: !0 },
  state: { type: Object, required: !0 },
  attrs: { type: Object, required: !0 }
};
function Nv(e, t) {
  return (...n) => {
    const r = e(...n);
    for (const a of Array.isArray(t) ? t : [t])
      typeof a == "function" && a !== e && a(...n);
    return r;
  };
}
function ir({ prop: e = "value", event: t = "update:value" } = {}, n) {
  const r = t.startsWith("on") ? t : `on${t[0].toUpperCase()}${t.slice(1)}`;
  return (a, o) => {
    const s = { ...n ? n(a, o) : a }, { binding: i, state: l, option: c, effectData: u } = o;
    l.disabled !== void 0 && (s.disabled = l.disabled), c.disabledDate !== void 0 && (s.disabledDate = (...f) => c.disabledDate(u, ...f));
    for (const [f, v] of Object.entries(i)) {
      if (c.labelField && (f === "labelValue" || f === "onUpdate:labelValue"))
        continue;
      const h = f === "value" ? e : f === "onUpdate:value" ? r : f;
      s[h] = f.startsWith("onUpdate:") && typeof v == "function" ? Nv(v, s[h]) : v;
    }
    return s;
  };
}
function Uv(e, t) {
  return Object.fromEntries(
    Object.entries(e).map(([n, { model: r, ...a }]) => [
      n,
      {
        ...a,
        // 两条渲染路径共用绑定和属性转换，扩展渲染不能再次合成原生事件。
        adaptProps: ir(r ?? t, a.adaptProps)
      }
    ])
  );
}
const ea = /* @__PURE__ */ new Map(), Bv = ir();
function Uo(e) {
  var t, n;
  const r = ea.get(e);
  if (r)
    return r;
  const a = st();
  if (!a.supportedFields.includes(e))
    return;
  const o = (t = a.fields) == null ? void 0 : t[e], s = (o == null ? void 0 : o.component) ?? (o != null && o.render && !sr(e) ? void 0 : jv(e)), i = (o == null ? void 0 : o.adaptProps) ?? a.adaptFieldProps ?? Bv, l = (n = o == null ? void 0 : o.processors) != null && n.some((u) => ["options", "picker", "range"].includes(u)) ? "select" : "input", c = {
    ...o,
    type: e,
    component: s,
    render(u) {
      var f;
      const v = Object.assign(i(u.attrs, u), o == null ? void 0 : o.fixedProps), h = ((f = o == null ? void 0 : o.adaptSlots) == null ? void 0 : f.call(o, u.slots, u)) ?? u.slots;
      return o != null && o.render ? o.render({ ...u, attrs: v, slots: h }) : $(s, v, h);
    },
    // 缓存提示类型，在消费时读取语言和标签，支持已挂载字段切换语言。
    // defaults/attrs 的 class/style 按 Vue 规则合并；fixedProps 最后直接覆盖，不能被用户配置改写。
    getAttrs: (u, f, v = {}) => Object.assign(
      de(
        { placeholder: v.placeholder ?? q(l, { label: f.label }) },
        (o == null ? void 0 : o.defaults) ?? {},
        u,
        // 两套 UI 均接收标准 options；只在专项结果存在时覆盖，空数组也有效。
        v.options === void 0 ? {} : { options: v.options }
      ),
      o == null ? void 0 : o.fixedProps
    ),
    adaptProps: i
  };
  return ea.set(e, c), c;
}
function it(e) {
  var t, n;
  return (n = (t = xe("icons").semantic) == null ? void 0 : t[e]) == null ? void 0 : n.call(t);
}
function ke(e) {
  const t = Se("exaProvider", {}).data;
  return V({ ...e || {}, formData: t });
}
function ta(e, t) {
  const n = H(rt(e) ? e : !!e);
  return typeof e == "function" && Ze(() => {
    n.value = e(t);
  }), n;
}
function Bn(e, t) {
  const n = V({});
  return e && Ze(() => {
    Object.assign(n, e(t));
  }), n;
}
function zv(e = {}, t) {
  const n = {};
  return Object.keys(e).forEach((r) => {
    !e[r] || r === "onUpdate" || (r.match(/^on[A-Z]/) ? n[r] = (...a) => e[r](t, ...a) : r === "on" && Object.entries(e.on).forEach(([a, o]) => {
      const s = "on" + a.charAt(0).toUpperCase() + a.slice(1);
      n[s] = (...i) => o(t, ...i);
    }));
  }), n;
}
function lr({ option: e, model: t, effectData: n }, r) {
  const {
    field: a,
    endField: o,
    labelField: s,
    stringifyValue: i,
    computed: l,
    value: c,
    onUpdate: u
  } = e, f = {}, v = e.vModelFields || {};
  if (s && (f.labelValue = K(() => je(t.parent, s)), f["onUpdate:labelValue"] = (d) => {
    const m = i ? d == null ? void 0 : d.toString() : d;
    Ut(t.parent, s, m);
  }), Object.entries(v).forEach(([d, m]) => {
    var x;
    typeof m == "string" ? ((x = t.parent)[m] ?? (x[m] = void 0), f[d] = K(() => je(t.parent, m)), f[`onUpdate:${d}`] = (O) => {
      Ut(t.parent, m, O);
    }) : rt(m) ? (f[d] = m, f[`onUpdate:${d}`] = (O) => m.value = O) : f[d] = m;
  }), !a)
    return rt(c) && Object.assign(f, {
      value: c,
      "onUpdate:value": (d) => c.value = d
    }), f;
  r !== void 0 && (t.refData ?? (t.refData = ge(r)));
  const h = ye(t, "refData"), y = H(), w = (d = ge(r)) => {
    y.value = d, h.value !== d && r !== void 0 && (h.value = d);
  };
  Object.assign(f, {
    value: y,
    "onUpdate:value": w
  }), rt(c) && (X(h, (d) => c.value = d), X(c, w));
  let b = ge(t.refData), C;
  if (o)
    y.value = [h.value, t.parent[o]], C = (d) => {
      const [m, x] = d || [];
      h.value = m, b = m, t.parent[o] = x;
    }, X([h, () => t.parent[o]], (d) => {
      y.value = d;
    });
  else if (i) {
    const d = (m) => (m == null ? void 0 : m.toString().split(",")) || [];
    y.value = d(h.value), C = (m) => {
      const x = (m == null ? void 0 : m.toString()) || "";
      h.value = x, b = x;
    }, X(h, (m) => {
      m !== b && (y.value = d(m));
    });
  } else
    y.value = b, C = (d) => {
      h.value = d, b = d;
    }, X(h, w);
  return X(y, C, { flush: "sync" }), u && X(h, () => u(n)), l && X(
    // 使用ref让计算结果即使一样也会进行后面的赋值
    () => H(l(b, n)),
    (d) => C(oe(d)),
    { immediate: !0 }
  ), f;
}
function Fe({ option: e, effectData: t, inheritDisabled: n }) {
  const { type: r, dynamicAttrs: a, disabled: o, hidden: s, required: i } = e, l = ta(s, t), c = ta(i, t), u = n === void 0 && o === void 0 ? void 0 : K(() => {
    let b = ge(n);
    if (!(!b && o === void 0))
      return b || (typeof o == "function" ? b = !!o(t) : b = ge(o)), b;
  }), f = zv(e, t), v = typeof a == "function" ? { ...Je(Bn(a, t)) } : {}, h = de({ ...ue[r] }, { ...e.attrs }, f, v), y = Gt({}, e.attrs, h);
  return { attrs: { ...y, ...u && {
    disabled: K(() => u.value ?? ge(y.disabled))
  } }, nativeAttrs: y, disabled: u, hidden: l, required: c };
}
const na = {
  email: {
    type: "email",
    message: "email"
  },
  integer: {
    type: "integer",
    message: "integer",
    pattern: /^[+]{0,1}(\d+)$/,
    transform: (e) => Number(e)
  },
  number: {
    type: "number",
    message: "number",
    transform: (e) => Number(e)
  },
  idcard: {
    pattern: /^[1-9]\d{5}(19[4-9]|20[0,1])\d(0[1-9]|1[0-2])([0-2][0-9]|30|31)\d{3}[\d|X|x]$/,
    message: "idcard"
  },
  phone: {
    pattern: /^(\d{3,4}-?)?\d{7,8}$/,
    message: "phone"
  },
  mobile: {
    pattern: /^1[3-9][0-9]\d{8}$/,
    message: "mobile"
  },
  twoDecimal: {
    pattern: /^-?\d+(\.\d{1,2})?$/,
    message: "twoDecimal"
  },
  word: {
    pattern: /^[A-Za-z0-9][A-Za-z0-9_]*$/,
    message: "word"
  }
}, ra = {
  string: {
    len: "stringLen",
    max: "stringMax",
    min: "stringMin",
    range: "stringRange"
  },
  number: {
    len: "numberLen",
    max: "numberMax",
    min: "numberMin",
    range: "numberRange"
  }
};
function qv(e, t, n, r) {
  let a;
  if (t)
    a = { type: e, len: t, message: "len" };
  else if (pt(n) && pt(r))
    a = { type: e, max: n, min: r, message: "range" };
  else if (pt(n))
    a = { type: e, max: n, message: "max" };
  else if (pt(r))
    a = { type: e, min: r, message: "min" };
  else
    return !1;
  return e === "number" ? (a.message = ra.number[a.message], a.transform = (o) => Number(o)) : a.message = ra.string[a.message], a;
}
function Hv(e, t = "") {
  const { trigger: n, required: r, type: a = "string", len: o, max: s, min: i, pattern: l, validator: c, message: u } = e || {}, f = [];
  r && (a === "string" || a in na ? f.push({
    required: r,
    trigger: n,
    // validator: noEmpty,
    pattern: /^[\s\S]*.*[^\s][\s\S]*$/,
    // transform: (value) => value + '',
    // whitespace: true,
    message: u ?? (() => q("required", { label: t }))
  }) : f.push({ required: r, trigger: n, message: u ?? (() => q("required", { label: t })) }));
  const v = na[a];
  if (v) {
    const h = u ?? (() => q(v.message, { label: t }));
    f.push({ ...v, trigger: n, message: h });
  }
  if (l && f.push({ pattern: l, trigger: n, message: u }), o || pt(s) || pt(i)) {
    const h = qv(a, o, s, i), y = u ?? (() => q(h.message, { label: t, len: o, max: s, min: i }));
    f.push({ ...h, trigger: n, message: y, type: a });
  }
  return c && f.push({ validator: c, trigger: n }), f;
}
function Bo(e, t, n) {
  const { field: r, columns: a, subItems: o, initialValue: s, value: i } = e, l = e.endField ?? e.labelField, c = r ? r.split(".") : [], u = n.concat(c), f = c.splice(-1)[0], v = V({
    refName: f,
    initialValue: s,
    fieldName: r,
    origin: t,
    parent: t,
    refData: t,
    propChain: u
  });
  return f ? (c.length && (v.parent = K(() => je(t.value, c))), v.refData = K({
    get: () => je(t.value, r),
    set: (h) => Ut(t.value, r, h)
  }), X(
    t,
    () => {
      v.refData ?? (v.refData = ge(s) ?? ge(i) ?? (a && [] || o && {})), l && Iv(v.parent, l, (h) => h);
    },
    { immediate: !0, flush: "sync" }
  )) : i && (v.refData = H(i), v.propChain = []), v;
}
const Bt = (e, t) => e == null ? void 0 : e.map((n) => n.validator ? { ...n, validator: async (a, ...o) => {
  const s = await n.validator({ ...a, ...t }, ...o);
  if (s === !1 || s instanceof Error)
    throw s;
} } : n);
function St(e, t, n = []) {
  const r = ye(t || {}), a = {}, o = /* @__PURE__ */ new Map();
  return e.forEach((s) => {
    if (typeof s != "object")
      return;
    const i = Bo(s, r, n), { required: l, label: c, subItems: u, columns: f } = s;
    if (s.rules || l) {
      const v = s.rules || [], h = Array.isArray(v) ? v : [v];
      if (l) {
        const w = h[0];
        w ? w.required = l : h.push({ required: l });
      }
      let y = "string";
      if (i.refData) {
        const w = typeof i.refData;
        y = w === "object" && Array.isArray(i.refData) ? "array" : w;
      }
      i.rules = h.map((w) => Hv({ type: y, ...w }, c)).flat(), i.propChain.length && (a[i.propChain.join(".")] = i.rules);
    }
    if (u) {
      const v = St(u, ye(i, "refData"), i.propChain);
      Object.assign(a, v.rules), i.children = v.modelsMap;
    } else
      f && (i.listData = St(f));
    o.set(Zs(s), i);
  }), {
    rules: a,
    modelsMap: o
  };
}
function zt(e, t, n) {
  const r = e.propChain;
  if (e.index === n && r.length === t.length && r.every((o, s) => o === t[s]))
    return;
  const a = (o) => {
    var s, i;
    (s = o.propChain) != null && s.length && r.every((l, c) => o.propChain[c] === l) && (o.propChain = [...t, ...o.propChain.slice(r.length)]), o.index !== void 0 && (o.index = n), (i = o.children) == null || i.forEach(a);
  };
  a(e);
}
function lt(e, t, n = [], r) {
  const a = ye(t || {}), o = {}, s = [...e].map(([i, l]) => {
    const { children: c, rules: u, listData: f } = l, v = r !== void 0 ? [...n, r] : n, h = Bo(i, a, v);
    if (r !== void 0 && (h.index = r), h.rules = u, h.propChain.length && u && (o[h.propChain.join(".")] = u), c) {
      const { modelsMap: y, rules: w } = lt(c, ye(h, "refData"), h.propChain);
      Object.assign(o, w), h.children = y;
    }
    return f && (h.listData = f), [i, h];
  });
  return { modelsMap: new Map(s), rules: o };
}
function zo(e, t, n, r) {
  const { modelsMap: a, rules: o } = lt(e, t, n, r), s = [];
  return function i(l) {
    for (const [c, u] of l)
      s.push([c, u]), u.children && i(u.children);
  }(a), { modelsMap: new Map(s), rootModels: a, rules: o };
}
const Vv = (e, t) => Object.prototype.hasOwnProperty.call(e, t);
function qo(e, t = {}, n = {}) {
  for (const [r, a] of Object.entries(e))
    Array.isArray(a) ? e[r] = Me((t == null ? void 0 : t[r]) ?? (n == null ? void 0 : n[r])) : Object.prototype.toString.call(a) === "[object Object]" ? qo(a, t == null ? void 0 : t[r], n == null ? void 0 : n[r]) : e[r] = (t == null ? void 0 : t[r]) ?? (n == null ? void 0 : n[r]);
}
function Ho(e, t, n = {}) {
  for (const [r, a] of Object.entries(e)) {
    if (!Vv(t, r))
      continue;
    const o = t[r] ?? (n == null ? void 0 : n[r]);
    Be(a) && Be(o) ? Ho(a, o, n == null ? void 0 : n[r]) : Array.isArray(o) || Be(o) ? e[r] = Me(o) : e[r] = o;
  }
}
function aa() {
  let e;
  return { promise: new Promise((n) => {
    e = n;
  }), resolve: e };
}
function zn() {
  const e = H();
  let t = aa(), n = !0;
  return X(e, (a) => {
    a ? (t.resolve(!0), n = !1) : n || (t = aa(), n = !0);
  }), [e, () => t.promise.then(() => e.value)];
}
function ie(e, t = {}) {
  return e ? typeof e == "function" ? e(t || {}, {}) : typeof e != "object" ? $("span", e) : $(e, { effectData: t }) : null;
}
const _e = {
  tagViewer: ["pink", "red", "orange", "green", "cyan", "blue", "purple"]
};
function Ot(e, t, n) {
  const r = n || Se("rootSlots", {}), a = {};
  return e && Object.entries(e).forEach(([o, s]) => {
    const i = typeof s == "string" ? r[s] : s;
    i && (a[o] = (l) => typeof i == "function" ? i({ ...t, ...l || {} }) : i);
  }), a;
}
function ur(e, t, n = !1, r = {}) {
  if (t != null)
    for (const a of e) {
      const o = a[r.value ?? "value"];
      if (Object.is(o, t) || n && String(o) === t)
        return a;
      const s = a[r.children ?? "children"], i = Array.isArray(s) && ur(s, t, n, r);
      if (i)
        return i;
    }
}
function bn(e, t = {}, n = !0) {
  const r = H([]);
  let a = 0;
  (e == null ? void 0 : e.source) !== void 0 && e.dictName !== void 0 && console.warn("[SuperForm] options.source 与 options.dictName 同时配置，优先使用 source，忽略 dictName");
  const o = async (i = t) => {
    var l;
    const c = ++a, u = oe(e == null ? void 0 : e.source), f = (e == null ? void 0 : e.source) !== void 0 ? typeof u == "function" ? await u(i) : u : (e == null ? void 0 : e.dictName) !== void 0 ? await ((l = _e.dictApi) == null ? void 0 : l.call(_e, e.dictName)) : void 0;
    c === a && (r.value = f ?? []);
  };
  return e && n && Ze(() => {
    o();
  }), { optionsRef: K(() => {
    var i, l, c;
    const u = r.value, f = ((i = e == null ? void 0 : e.fieldNames) == null ? void 0 : i.label) ?? "label", v = ((l = e == null ? void 0 : e.fieldNames) == null ? void 0 : l.value) ?? "value", h = ((c = e == null ? void 0 : e.fieldNames) == null ? void 0 : c.children) ?? "children", y = (w) => w.map((b, C) => {
      const d = Be(b), m = d ? b[f] : b, x = e != null && e.labelAsValue ? m : d ? b[v] : e != null && e.valueToNumber ? C : b;
      return {
        ...d ? b : {},
        label: m,
        value: e != null && e.valueToNumber && !e.labelAsValue ? Number(x) : x,
        ...d && Array.isArray(b[h]) && { children: y(b[h]) }
      };
    });
    return Array.isArray(u) ? y(u) : Object.entries(u ?? {}).map(([w, b]) => ({
      label: b,
      value: e != null && e.labelAsValue ? b : e != null && e.valueToNumber ? Number(w) : w
    }));
  }), load: o };
}
const oa = (e, t) => {
  const n = {};
  return e.vModelFields && Object.entries(e.vModelFields).forEach(([r, a]) => {
    n[r] = t[a];
  }), n;
}, $n = ({ value: e, label: t = e, color: n, icon: r, tagViewer: a = !0 }) => {
  const o = { color: n, label: t, icon: r };
  if (a !== !0 || !n) {
    const s = a === !0 ? _e.tagViewer : a;
    if (typeof s == "function") {
      const i = s(e);
      Be(i) ? Object.assign(o, i) : o.color = i;
    } else if (Array.isArray(s) && Be(s[0])) {
      const i = s.find((l) => l.value == e);
      Object.assign(o, i);
    }
    o.color ?? (o.color = n || s[e] || e === !0 && "success" || e === !1 && "error" || "default");
  }
  return Z("tag")(
    { color: o.color },
    {
      default: () => o.label || e,
      icon: o.icon
    }
  );
};
function Wt(e, t = {}) {
  const { type: n = "", viewRender: r, render: a, labelField: o, tagViewer: s, initialValue: i } = e, l = e.options, c = e.endField, u = Se("rootSlots", {}), f = r || n === "InfoSlot" && a, v = typeof f == "string" ? u[f] : f;
  if (f && !v)
    return !1;
  let h = !1;
  const y = (() => {
    if (o)
      return ({ current: b } = t) => String(je(b, o) ?? "");
    if (c)
      return ({ current: b, text: C } = t) => (C || "") + " - " + (je(b, c) || "");
    if (l !== void 0) {
      h = !(s === !1 || !s && _e.tagViewer === !1);
      const { optionsRef: b, load: C } = bn(l, t, !1);
      let d = !1;
      return (m = t, x) => {
        d || (d = !0, C(m));
        const O = m.text ?? m.value ?? ge(i) ?? "";
        if (O === "")
          return "";
        const T = (Array.isArray(O) ? O : e.stringifyValue && typeof O == "string" ? O.split(",") : [O]).map((p) => {
          const g = ur(b.value, p, e.stringifyValue), S = (g == null ? void 0 : g.label) ?? p;
          return !x && h ? $n({ ...g, value: p, label: S, tagViewer: s }) : S;
        });
        return !x && h ? T : T.join(",");
      };
    } else if (n === "Switch")
      return ({ text: b, value: C } = t) => {
        const d = b ?? C ?? ge(i);
        return d === !0 ? q("yes") : d === !1 ? q("no") : d;
      };
  })(), w = !0;
  if (v)
    return (b = t) => {
      const C = oa(e, b.current), { attrs: d } = Fe({ option: e, effectData: b }), m = { ...d };
      delete m.disabled;
      const x = V({
        props: { ...m, ...C },
        ...b,
        ...y && { text: K(() => y(b, w)) },
        isView: !0
      });
      return v(x);
    };
  if (s && !h)
    return (b = t) => {
      const C = b.text ?? ge(i);
      return typeof C == "boolean" && s === !0 ? $n({
        label: q(C ? "yes" : "no"),
        color: C ? "success" : "error"
      }) : (Array.isArray(C) ? C : typeof C == "string" ? C.split(",") : [C]).map((x) => $n({ value: x, tagViewer: s }));
    };
  if (n === "Text" && (e.attrs || e.dynamicAttrs))
    return (b = t) => {
      const C = (y == null ? void 0 : y(b)) || (b.value ?? ge(i)), d = Bn(e.dynamicAttrs, b), m = de({ ...e.attrs, title: C }, d);
      return $("span", m, C);
    };
  if (n === "HTML")
    return (b = t) => {
      const C = Bn(e.dynamicAttrs, b), d = de({ ...e.attrs, innerHTML: b.value }, C);
      return $("span", d);
    };
  if (n === "TextArea")
    return (b = t) => $("pre", { style: "white-space: break-spaces;" }, b.value ?? ge(i));
  if (!y && (n === "Upload" || an(n)))
    return (b = t) => {
      const C = oa(e, b.current), d = Ot(e.slots, b, u), {
        attrs: { disabled: m, ...x }
      } = Fe({ option: e, effectData: b });
      if (n === "Upload")
        return $(
          Pe.Upload,
          V({ option: e, effectData: b, ...x, ...C, value: b.value, isView: !0, disabled: m }),
          d
        );
      const O = an(n);
      return O && $(
        O.component,
        V(
          es(O, {
            ...x,
            ...C,
            value: b.value,
            disabled: m
          })
        ),
        d
      );
    };
  if (n === "Buttons") {
    const b = hn({ config: e, isView: !0 });
    return !!b && ((C = t) => b({ param: C }));
  } else
    return y;
}
const $t = (e, t) => {
  const { title: n, label: r, labelSlot: a, tooltip: o } = e, s = o && (Be(o) ? o : { title: o }), i = n || a || r;
  return i === void 0 ? void 0 : () => [
    ie(i, t),
    o && Z("tooltip")(s, {
      title: () => ie(o.title, t),
      default: () => $(
        "span",
        {
          class: "sup-label-tooltip"
        },
        o.icon ? ie(o.icon, t) : it("info")
      )
    })
  ];
}, Kv = /* @__PURE__ */ new Set([
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
]), Yv = {
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
}, Gv = /* @__PURE__ */ new Set(["Input", "InputNumber", "TextArea", "AutoComplete"]), Wv = /* @__PURE__ */ new Set(["Select", "TreeSelect"]), Zv = /* @__PURE__ */ new Set(["Select", "TreeSelect", "RadioGroup", "CheckboxGroup"]), Qv = /* @__PURE__ */ new Set([
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
]), Jv = /* @__PURE__ */ new Set(["table", "form", "description"]), Xv = /* @__PURE__ */ new Set([
  "attrs",
  "dynamicAttrs",
  "dataSource",
  "initialValue",
  "options",
  "params",
  "rules",
  "treeData",
  "value"
]), He = (e) => e !== null && typeof e == "object" && !Array.isArray(e), ne = (e, t, n, r) => ({ level: e, code: t, path: n, message: r });
function qn(e, t, n, r) {
  if (!(!e || typeof e != "object" || r.has(e))) {
    if (r.add(e), He(e))
      for (const [a, o] of Object.entries(Yv))
        Object.prototype.hasOwnProperty.call(e, a) && n.push(ne("warning", "deprecated-api", `${t}.${a}`, `已废弃，${o}。`));
    for (const [a, o] of Object.entries(e))
      typeof o == "function" || Xv.has(a) || (Array.isArray(o) ? o.forEach((s, i) => qn(s, `${t}.${a}[${i}]`, n, r)) : He(o) && qn(o, `${t}.${a}`, n, r));
  }
}
function em(e, t, n, r, a) {
  var o, s, i;
  if (!He(e)) {
    typeof e != "string" && n.push(ne("error", "invalid-item", t, "字段配置必须是对象。"));
    return;
  }
  const { type: l } = e;
  if (l !== void 0 && (typeof l != "string" || !a.has(l)) && n.push(ne("error", "unknown-type", `${t}.type`, `未知字段类型 ${JSON.stringify(l)}。`)), l === void 0 && r !== "table" && n.push(ne("warning", "missing-type", `${t}.type`, "表单或详情字段建议明确配置 type。")), Array.isArray(e.exclude)) {
    const v = e.exclude.filter((h) => !Jv.has(h));
    v.length && n.push(
      ne(
        "error",
        "invalid-exclude",
        `${t}.exclude`,
        `只支持 table、form、description，当前包含：${v.join("、")}。`
      )
    );
  } else
    e.exclude !== void 0 && n.push(ne("error", "invalid-exclude", `${t}.exclude`, "exclude 必须是字符串数组。"));
  e.visibleIn !== void 0 && !["form", "detail", "both"].includes(e.visibleIn) && n.push(
    ne("error", "invalid-visible-in", `${t}.visibleIn`, "visibleIn 只支持 'form'、'detail'、'both'。")
  ), e.unauthorized !== void 0 && !["hide", "disable"].includes(e.unauthorized) && n.push(
    ne("error", "invalid-unauthorized", `${t}.unauthorized`, "unauthorized 只支持 'hide'、'disable'。")
  ), Zv.has(l) && !e.options && !e.dictName && n.push(ne("warning", "missing-options", t, `${l} 未配置 options 或 dictName。`));
  const c = (o = e.attrs) == null ? void 0 : o.placeholder, u = Gv.has(l) ? `请输入${typeof e.label == "string" ? e.label : ""}` : Wv.has(l) ? `请选择${typeof e.label == "string" ? e.label : ""}` : void 0;
  u !== void 0 && c === u && n.push(
    ne("suggestion", "redundant-default", `${t}.attrs.placeholder`, "与内置 placeholder 相同，可以省略。")
  );
  const f = ["DatePicker", "DateRangePicker"].includes(l) ? "YYYY-MM-DD" : ["TimePicker", "TimeRangePicker"].includes(l) ? "HH:mm:ss" : void 0;
  f && ((s = e.attrs) == null ? void 0 : s.valueFormat) === f && n.push(
    ne("suggestion", "redundant-default", `${t}.attrs.valueFormat`, "与内置 valueFormat 相同，可以省略。")
  ), l === "InputGroup" && ((i = e.attrs) == null ? void 0 : i.compact) === !0 && n.push(
    ne("suggestion", "redundant-default", `${t}.attrs.compact`, "InputGroup 默认使用紧凑布局，可以省略。")
  ), e.block === !1 && !Qv.has(l) && n.push(ne("suggestion", "redundant-default", `${t}.block`, "block: false 是默认行为，可以省略。")), e.breakAfter === !1 && n.push(
    ne("suggestion", "redundant-default", `${t}.breakAfter`, "breakAfter: false 是默认行为，可以省略。")
  ), (e.options || e.dictName) && e.tagViewer === !0 && n.push(
    ne("suggestion", "redundant-default", `${t}.tagViewer`, "选项字段默认使用 Tag 展示，可以省略。")
  );
  for (const v of ["hidden", "disabled"])
    e[v] === !1 && n.push(ne("suggestion", "redundant-default", `${t}.${v}`, `${v}: false 可以省略。`));
  Object.prototype.hasOwnProperty.call(e, "initialValue") && e.initialValue === void 0 && n.push(
    ne("suggestion", "redundant-default", `${t}.initialValue`, "initialValue: undefined 可以省略。")
  );
  for (const v of ["attrs", "rowProps"])
    He(e[v]) && Object.keys(e[v]).length === 0 && n.push(ne("suggestion", "empty-config", `${t}.${v}`, `空的 ${v} 配置可以省略。`));
  for (const v of ["rules", "options"])
    Array.isArray(e[v]) && e[v].length === 0 && n.push(ne("suggestion", "empty-config", `${t}.${v}`, `空的 ${v} 配置可以省略。`));
  e.subItems && mt(e.subItems, `${t}.subItems`, n, r === "table" ? "form" : r, a), e.columns && mt(e.columns, `${t}.columns`, n, "table", a);
}
function mt(e, t, n, r, a) {
  if (!Array.isArray(e)) {
    n.push(ne("error", "invalid-items", t, "必须是数组。"));
    return;
  }
  const o = /* @__PURE__ */ new Map();
  e.forEach((s, i) => {
    const l = `${t}[${i}]`;
    em(s, l, n, r, a), !(!He(s) || typeof s.field != "string" || !s.field) && (o.has(s.field) ? n.push(
      ne(
        "warning",
        "duplicate-field",
        `${l}.field`,
        `字段 ${s.field} 与 ${o.get(s.field)} 重复。`
      )
    ) : o.set(s.field, `${t}[${i}].field`));
  });
}
function tm(e, t = "auto", n = []) {
  var r, a, o, s, i, l, c;
  const u = [];
  if (!He(e))
    return [ne("error", "invalid-schema", "schema", "schema 必须是对象。")];
  const f = /* @__PURE__ */ new Set([...Kv, ...n]);
  qn(e, "schema", u, /* @__PURE__ */ new WeakSet());
  const v = t === "auto" ? Array.isArray(e.columns) ? "table" : "form" : t;
  if (!["form", "table", "detail"].includes(v))
    return [ne("error", "invalid-schema-type", "schema", `未知 schema 类型 ${JSON.stringify(t)}。`)];
  if (e.subSpan === 8 && u.push(ne("suggestion", "redundant-default", "schema.subSpan", "subSpan: 8 是默认值，可以省略。")), e.gutter === 16 && u.push(ne("suggestion", "redundant-default", "schema.gutter", "gutter: 16 是默认值，可以省略。")), He(e.params) && Object.keys(e.params).length === 0 && u.push(ne("suggestion", "empty-config", "schema.params", "空的 params 配置可以省略。")), v === "table") {
    for (const h of ["editMode", "addMode"])
      Object.prototype.hasOwnProperty.call(e, h) && u.push(ne("warning", "deprecated-api", `schema.${h}`, `已废弃，使用 rowEditor.${h}。`));
    Array.isArray(e.columns) ? mt(e.columns, "schema.columns", u, "table", f) : u.push(ne("error", "missing-columns", "schema.columns", "表格必须配置 columns。")), e.immediate === !0 && u.push(
      ne("suggestion", "redundant-default", "schema.immediate", "immediate: true 是默认值，可以省略。")
    ), e.pagination === !1 && u.push(
      ne("suggestion", "redundant-default", "schema.pagination", "pagination: false 是默认值，可以省略。")
    ), ((r = e.attrs) == null ? void 0 : r.rowKey) === "id" && u.push(
      ne("suggestion", "redundant-default", "schema.attrs.rowKey", "rowKey: 'id' 是默认值，可以省略。")
    ), ((a = e.attrs) == null ? void 0 : a.size) === "small" && u.push(
      ne("suggestion", "redundant-default", "schema.attrs.size", "size: 'small' 是默认值，可以省略。")
    ), ((o = e.attrs) == null ? void 0 : o.tableLayout) === "fixed" && u.push(
      ne(
        "suggestion",
        "redundant-default",
        "schema.attrs.tableLayout",
        "tableLayout: 'fixed' 是默认值，可以省略。"
      )
    ), He(e.pagination) && e.pagination.current === 1 && u.push(
      ne("suggestion", "redundant-default", "schema.pagination.current", "分页 current 默认是 1，可以省略。")
    ), He(e.pagination) && e.pagination.pageSize === 10 && u.push(
      ne("suggestion", "redundant-default", "schema.pagination.pageSize", "分页 pageSize 默认是 10，可以省略。")
    ), (s = e.searchForm) != null && s.subItems && mt(e.searchForm.subItems, "schema.searchForm.subItems", u, "form", f), (l = (i = e.rowEditor) == null ? void 0 : i.form) != null && l.subItems && mt(e.rowEditor.form.subItems, "schema.rowEditor.form.subItems", u, "form", f);
  } else
    Array.isArray(e.subItems) ? (((c = e.attrs) == null ? void 0 : c.labelAlign) === "right" && u.push(
      ne("suggestion", "redundant-default", "schema.attrs.labelAlign", "labelAlign: 'right' 是默认值，可以省略。")
    ), mt(e.subItems, "schema.subItems", u, v, f)) : u.push(ne("error", "missing-sub-items", "schema.subItems", "表单或详情必须配置 subItems。"));
  return u;
}
function nm(e, t = "auto") {
  return tm(e, t, Jm());
}
function qt(e, t, n) {
  var r, a;
  const o = nm(e, t);
  return o.length && ((r = console.groupCollapsed) == null || r.call(console, `[superform] ${n} schema 诊断：${o.length} 项`), o.forEach(({ level: s, path: i, message: l }) => {
    const c = `[superform] ${i}: ${l}`;
    s === "error" ? console.error(c) : s === "warning" ? console.warn(c) : console.info(c);
  }), (a = console.groupEnd) == null || a.call(console)), o;
}
function we(e, t = !1) {
  return () => $("svg", {
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
    $("g", [
      ...e.map((n) => $("path", { d: n })),
      ...t ? [$("animateTransform", {
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
const Oe = {
  add: we(["M12 5v14M5 12h14"]),
  remove: we(["M5 12h14"]),
  delete: we(["M4 7h16M9 7V4h6v3M6 7l1 14h10l1-14M10 11v6M14 11v6"]),
  edit: we(["M14 5l5 5M4 20l5-1L21 7l-5-5L4 14z"]),
  detail: we(["M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z", "M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0"]),
  submit: we(["M3 11L21 3l-8 18-3-7zM10 14L21 3"]),
  search: we(["M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0M15 15l6 6"]),
  reset: we(["M4 10a8 8 0 1 1 1 8M4 4v6h6"]),
  more: we(["M5 12h.01M12 12h.01M19 12h.01"]),
  expand: we(["M5 9l7 7 7-7"]),
  collapse: we(["M5 15l7-7 7 7"]),
  info: we(["M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0M12 11v6M12 7h.01"]),
  upload: we(["M12 16V3M7 8l5-5 5 5M4 15v6h16v-6"]),
  attachment: we(["M8 13l7-7a3 3 0 0 1 4 4L9 20a5 5 0 0 1-7-7L13 2M6 15l8-8"]),
  loading: we(["M20 12a8 8 0 1 1-8-8"], !0),
  sync: we(["M4 10a8 8 0 0 1 14-4l2 3M20 3v6h-6M20 14a8 8 0 0 1-14 4l-2-3M4 21v-6h6"]),
  error: we(["M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0M8 8l8 8M16 8l-8 8"])
}, rm = {
  add: { label: () => q("add"), icon: Oe.add },
  delete: {
    label: () => q("delete"),
    icon: Oe.delete,
    confirmText: () => q("deleteConfirm"),
    disabled: (e) => {
      var t;
      return !e.record && !(((t = e.selectedRows) == null ? void 0 : t.length) > 0);
    }
  },
  edit: { label: () => q("edit"), icon: Oe.edit, disabled: (e) => {
    var t;
    return !e.record && ((t = e.selectedRows) == null ? void 0 : t.length) !== 1;
  } },
  detail: { label: () => q("detail"), icon: Oe.detail, disabled: (e) => {
    var t;
    return !e.record && ((t = e.selectedRows) == null ? void 0 : t.length) !== 1;
  } },
  submit: { label: () => q("submit"), icon: Oe.submit },
  search: { label: () => q("search"), icon: Oe.search },
  reset: { label: () => q("reset"), icon: Oe.reset },
  save: { label: () => q("save") },
  cancel: { label: () => q("cancel") },
  expand: {
    label: (e) => q(e.expanded ? "collapse" : "expand"),
    icon: (e) => ge(e == null ? void 0 : e.expanded) ? Oe.collapse() : Oe.expand()
  }
}, am = () => {
  const e = Gt(
    {},
    rm,
    ue.ButtonActions,
    _e.defaultButtons
  );
  return Object.entries(_e.defaultButtons || {}).forEach(([t, n]) => {
    Object.prototype.hasOwnProperty.call(n, "icon") && (e[t].icon = n.icon);
  }), e;
};
function om(e) {
  const t = am();
  return Object.keys(e).forEach((n) => {
    if (t[n])
      if (typeof e[n] == "function")
        t[n].onClick = e[n];
      else {
        const { icon: r, ...a } = e[n];
        Gt(t[n], a), Object.prototype.hasOwnProperty.call(e[n], "icon") && (t[n].icon = r);
      }
    else
      t[n] = typeof e[n] == "function" ? { onClick: e[n] } : e[n];
  }), t;
}
function sm(e, t = {}, n = {}) {
  const r = om(t), a = [];
  return Array.isArray(e) && e.forEach((o) => {
    const s = typeof o == "string" ? o : o.name, { onClick: i, ...l } = r[s] || {};
    l.attrs = Xe({ ...n }, l.attrs), typeof o == "object" && Object.assign(l, o, { attrs: { ...l.attrs, ...o.attrs } }), l.name = s;
    const c = H(!1), u = H(!1), f = l.attrs.loading, v = rt(f);
    !v && f && (l.attrs.loading = u);
    const h = (C) => {
      v || (u.value = C ? f : !1);
    }, y = { label: l.label, ...typeof o == "object" ? o.meta : {} }, w = typeof o == "object" ? o.onClick : void 0, b = (C, d, m) => {
      if (c.value)
        return Promise.resolve();
      c.value = !0;
      const x = async () => {
        h(!0);
        try {
          return await d();
        } finally {
          h(!1);
        }
      };
      return C ? new Promise((O, A) => {
        let T = !1;
        const p = (g) => {
          T || (T = !0, c.value = !1, O(g));
        };
        try {
          xe("services").confirm({
            title: () => ie(C, m),
            ...ue.Modal,
            onCancel: async (...g) => {
              var S, _;
              const P = await ((_ = (S = ue.Modal) == null ? void 0 : S.onCancel) == null ? void 0 : _.call(S, ...g));
              return p(!1), P;
            },
            afterClose: (...g) => {
              var S, _;
              return p(!1), (_ = (S = ue.Modal) == null ? void 0 : S.afterClose) == null ? void 0 : _.call(S, ...g);
            },
            onOk: async () => {
              try {
                const g = await x();
                return p(g), g;
              } catch (g) {
                throw A(g), g;
              }
            }
          });
        } catch (g) {
          c.value = !1, A(g);
        }
      }) : x().finally(() => {
        c.value = !1;
      });
    };
    l.onClick = (C) => {
      const d = { ...C, meta: y };
      return w && i ? b(
        l.confirmText,
        () => w(d, async (m) => i({ ...d, ...m })),
        C
      ) : b(l.confirmText, () => {
        var m;
        return (m = i || w) == null ? void 0 : m(d);
      }, C);
    }, a.push({ ...l, pending: c });
  }), a;
}
function Vo(e, t, n, r = {}, a = () => !0) {
  var o, s;
  const { buttonProps: i, limit: l, hidden: c, disabled: u, actions: f } = e, v = e.labelMode === "icon", h = e.labelMode === "label", y = { ...(o = ue.Buttons) == null ? void 0 : o.buttonProps, ...i }, w = (x) => K(() => !!(typeof x == "function" ? x(t) : ge(x))), b = w(c), C = w(u), d = (s = _e.buttonRoles) == null ? void 0 : s.call(_e), m = sm(f, n || e.methods, y).flatMap((x, O) => {
    const A = d && x.roleName && !d.includes(x.roleName), T = x.unauthorized ?? e.unauthorized ?? "hide";
    if (A && T === "hide")
      return [];
    const p = w(x.hidden), g = x.disabled === void 0 ? C : w(x.disabled), S = x.attrs || {}, _ = w(S.disabled), P = K(() => !!A || C.value || g.value || _.value), k = typeof x.customRender == "string" ? r[x.customRender] : x.customRender, R = x.dropdown && K(() => {
      const D = typeof x.dropdown == "function" ? x.dropdown(t) : ge(x.dropdown);
      return D ? Array.isArray(D) ? Dv(D).map(
        (U) => typeof U == "object" && U !== null ? U : { value: U, label: String(U) }
      ) : Object.entries(D).map(([U, W]) => ({ value: U, label: W })) : [];
    }), M = {
      get visible() {
        return a() && !b.value && !p.value;
      },
      get disabled() {
        return P.value;
      },
      get loading() {
        return x.pending.value || !!ge(S.loading);
      },
      async execute(D, B) {
        var U;
        if (!(!M.visible || M.disabled || M.loading))
          return (U = x.onClick) == null ? void 0 : U.call(x, { ...t, ...B, e: D });
      }
    }, I = K(() => {
      const D = P.value && x.disabledTooltip ? x.disabledTooltip : x.tooltip || (v && x.icon ? x.label : void 0);
      return ie(D, t);
    }), E = {
      key: O,
      name: x.name,
      label: () => ie(x.label, t),
      icon: x.icon ? () => ie(x.icon, t) : void 0,
      tooltip: () => I.value,
      get disabled() {
        return M.disabled || x.pending.value;
      },
      get attrs() {
        return Object.fromEntries(Object.entries(S).map(([D, B]) => [D, oe(B)]));
      },
      get menu() {
        return R ? R.value.map((D, B) => ({
          key: B,
          value: D.value,
          label: () => ie(D.label, t),
          icon: D.icon ? () => ie(D.icon, t) : void 0,
          disabled: !!(typeof D.disabled == "function" ? D.disabled(t) : ge(D.disabled))
        })) : void 0;
      },
      dropdownProps: x.dropdownProps,
      render: k ? (D) => k({ ...t, props: D }) : void 0,
      onClick: (D) => M.execute(D),
      onSelect: (D, B) => {
        var U;
        const W = (U = E.menu) == null ? void 0 : U.find((ee) => Object.is(ee.value, D));
        if (!(!W || W.disabled))
          return M.execute(B, { value: D });
      }
    };
    return [{ action: M, uiItem: E }];
  });
  return {
    render() {
      const x = m.filter((T) => T.action.visible).map((T) => T.uiItem);
      if (!x.length)
        return null;
      const O = l == null || !Number.isFinite(l) ? x.length : Math.max(0, Math.floor(l)), A = v && x.length === O + 1 ? O + 1 : O;
      return Z("actionGroup")({
        groupProps: e.attrs,
        buttons: x.slice(0, A),
        moreButtons: x.slice(A),
        defaultButtonProps: y,
        divider: e.divider,
        labelOnly: h,
        iconOnly: v,
        moreLabel: () => e.moreLabel === void 0 ? Oe.more() : ie(e.moreLabel, t)
      });
    }
  };
}
const qe = /* @__PURE__ */ ce({
  __name: "ButtonGroup",
  props: {
    option: {},
    methods: {},
    effectData: {}
  },
  setup(e) {
    const t = e, n = Array.isArray(t.option) ? { actions: t.option } : t.option, r = Vo(n, V(t.effectData || {}), t.methods, Se("rootSlots", {}));
    return (a, o) => (Ue(), bt(Dt(() => oe(r).render())));
  }
});
function hn({ config: e, methods: t, effectData: n, isView: r }) {
  const a = Array.isArray(e) ? { actions: e } : e, o = a == null ? void 0 : a.visibleIn;
  if (!a || r && o === "form" || !r && o === "detail")
    return;
  let s = a.actions || [];
  if (o || (s = s.filter((i) => {
    if (typeof i == "string")
      return !r;
    {
      const l = i.visibleIn;
      return r ? l !== "form" : l !== "detail";
    }
  })), s.length !== 0)
    return (i = {}) => $(qe, { option: { ...a, actions: s }, methods: t, effectData: n, ...i });
}
function sa({ option: e, effectData: t, attrs: n }) {
  const r = e.options !== void 0;
  if (!r && !e.labelField)
    return;
  const a = n ?? e.attrs ?? {}, o = r ? bn(e.options, t).optionsRef : K(() => oe(a.options) ?? []);
  return {
    state: r ? K(() => ({ options: o.value })) : void 0,
    bindModel(s) {
      const i = s["onUpdate:labelValue"];
      i && X([() => oe(s.value), o, () => r ? void 0 : oe(a.fieldNames)], ([l, c, u]) => {
        const f = (v) => {
          var h;
          return (h = ur(c, v, e.stringifyValue, u)) == null ? void 0 : h[(u == null ? void 0 : u.label) ?? "label"];
        };
        i(Array.isArray(l) ? l.map(f) : f(l));
      }, { immediate: !0, deep: !0 });
    }
  };
}
const ia = {
  options: sa,
  picker: ({ option: e }) => ({
    state: K(() => ({ placeholder: q("select", { label: e.label }) }))
  }),
  range: ({ option: e }) => ({
    state: K(() => ({
      placeholder: [q("selectStart", { label: e.label }), q("selectEnd", { label: e.label })]
    }))
  }),
  tree: ({ option: e, effectData: t }) => {
    const n = e.treeData;
    if (n === void 0)
      return;
    const r = H([]);
    return Ze(() => {
      const a = typeof n == "function" ? n(t) : oe(n);
      Promise.resolve(a).then((o) => {
        r.value = o ?? [];
      });
    }), { state: K(() => ({ treeData: r.value })) };
  },
  switch: (e) => {
    const t = sa(e);
    return t != null && t.state ? {
      bindModel: t.bindModel,
      state: K(() => {
        const [n = { value: !1 }, r = { value: !0 }] = t.state.value.options;
        return { switch: {
          unchecked: { value: n.value, label: n.label },
          checked: { value: r.value, label: r.label }
        } };
      })
    } : t;
  }
};
function im(e, t) {
  const n = e.map((r) => {
    var a;
    return (a = ia[r]) == null ? void 0 : a.call(ia, t);
  }).filter(Boolean);
  return {
    bindModel: (r) => n.forEach((a) => {
      var o;
      return (o = a.bindModel) == null ? void 0 : o.call(a, r);
    }),
    state: K(() => Object.assign({}, ...n.map((r) => {
      var a;
      return (a = r.state) == null ? void 0 : a.value;
    })))
  };
}
const lm = ce({
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
    const n = im(e.field.processors || [], {
      option: e.option,
      attrs: V(e.inputAttrs),
      effectData: e.effectData,
      model: e.model
    }), r = lr({
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
        binding: V(r),
        state: { ...e.state, ...n.state.value }
      }, s = V(a.getAttrs(e.inputAttrs, e.option, o.state));
      return a.render({ ...o, attrs: s, slots: t.slots });
    };
  }
}), cr = ce({
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
    return Qe(e.name, e.data || {}), t.slots.default;
  }
});
function um(e, t) {
  const n = Se("inheritOptions", {}), r = e.option.subSpan ?? n.subSpan, a = K(() => e.model.index), o = [], s = [...e.model.children];
  for (let i = 0; i < s.length; i++) {
    const [l, c] = s[i], { type: u, align: f, span: v, block: h, breakAfter: y, exclude: w, editable: b } = l, { parent: C, refData: d } = pe(c), m = ke({
      parent: e.effectData,
      current: C,
      field: c.refName,
      value: d,
      ...a.value !== void 0 && {
        index: a,
        record: c.refName ? C : d
      }
    });
    if (u === "Hidden" || w != null && w.includes("form")) {
      lr({ option: l, model: c, effectData: m });
      continue;
    }
    const { hidden: x, required: O, attrs: A, nativeAttrs: T, disabled: p } = Fe({
      option: l,
      effectData: m,
      inheritDisabled: n.disabled
    });
    if (u === "Fragment") {
      c.children && s.splice(
        i + 1,
        0,
        ...[...c.children].map(([M, I]) => [{ ...M, hidden: x, disabled: A.disabled }, I])
      );
      continue;
    }
    let g = t(l, c, m, A, { attrs: T, disabled: p });
    if (!g)
      continue;
    if ((Sn(u) || sr(u)) && b !== void 0 && b !== !0) {
      const M = g, I = K(() => Ye(b) ? b(m) : b), E = Wt(l, V({ ...Je(m), isView: !0 }));
      g = () => I.value ? M() : E ? E() : d.value;
    }
    const S = { ...l.colProps, ...v !== void 0 && { span: v } };
    Xe(S, { span: r }, ue.Col, { span: 8 }), (S.span === 0 || S.flex) && (S.span = void 0);
    let _ = g;
    const P = [..._t, "InputList", "InputGroup"].includes(u);
    if (e.fieldWrapper !== "none" && !P && (!h || l.field && l.label)) {
      const M = Bt(c.rules, m), I = K(
        () => {
          var B;
          return oe(A.disabled) || (B = !l.required || O.value ? M : M.slice(1)) == null ? void 0 : B.map(
            (U) => n.ignoreRules ? { ...U, trigger: "none", validateTrigger: !1 } : U
          );
        }
      ), E = de(ue.FormItem, l.formItemProps), D = $t(l, m);
      _ = () => Z("formItem")(
        V({
          ...E,
          name: c.propChain,
          rules: I,
          colon: !!D
        }),
        {
          default: g,
          label: D
        }
      );
    }
    if (P && e.fieldWrapper !== "none") {
      const M = {
        required: O,
        disabled: A.disabled,
        subSpan: l.subSpan ?? r,
        ignoreRules: n.ignoreRules
      };
      _ = () => $(cr, { name: "inheritOptions", data: M }, g);
    }
    const k = h ?? (_t.includes(u) && !l.span), R = !k && u === "InputList" ? { ...S, span: v ?? 24 } : S;
    o.push({
      key: i,
      hidden: x,
      content: _,
      layout: {
        block: k,
        breakAfter: y,
        align: f,
        colProps: R,
        compactProps: S,
        detail: u === "Descriptions"
      }
    });
  }
  return o;
}
function cm(e, t) {
  const n = [];
  let r;
  for (const o of e)
    o.layout.block ? (n.push(o), r = void 0) : (r || n.push(r = []), r.push(o), o.layout.breakAfter && (r = void 0));
  const a = () => {
    if (t.layout === "compact")
      return e.map((i) => {
        if (i.hidden.value)
          return !1;
        const { span: l, flex: c, style: u } = i.layout.compactProps, f = Number(l) ? (Number(l) / 24 * 100).toFixed(2) + "%" : void 0;
        return $(i.content, {
          key: i.key,
          style: de({
            width: f,
            flex: c ?? (l === "auto" ? "1 1 0" : void 0),
            minWidth: 0
          }, u)
        });
      });
    const { gutter: o = 16 } = t.option, s = { gutter: o, ...t.option.rowProps };
    return n.map((i) => Array.isArray(i) ? Z("row")(
      { ...s, key: i[0].key },
      {
        default: () => i.map(
          (l) => !l.hidden.value && Z("col")(
            de(
              {
                key: l.key,
                style: l.layout.align && { textAlign: l.layout.align }
              },
              l.layout.colProps
            ),
            { default: l.content }
          )
        )
      }
    ) : !i.hidden.value && $(
      "div",
      {
        key: i.key,
        class: ["sup-form-section", i.layout.detail && "sup-detail"],
        style: i.layout.align && { textAlign: i.layout.align }
      },
      [i.content()]
    ));
  };
  return {
    // 首次渲染前即可确定是否需要 Group，不依赖 renderNodes 的执行副作用。
    hasWrap: t.layout === "grid" && n.some(Array.isArray),
    renderNodes: a,
    render: () => t.layout === "grid" ? a() : Z(t.layout === "compact" ? "compactSpace" : "space")(
      de(t.layout === "compact" ? { block: !0 } : {}, t.layoutAttrs || {}),
      // 紧凑容器必须直接接收各字段，不能额外套一个组件层阻断首尾上下文。
      { default: () => a().filter(Boolean) }
    )
  };
}
const Ke = ce({
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
    const n = um(e, gn), r = cm(n, e);
    return () => t.default ? t.default({ nodes: r.renderNodes().filter(Boolean) }) : e.option.useSectionStyle && r.hasWrap ? $(
      Pe.Group,
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
function gn(e, t, n, r, a) {
  const { type: o, render: s } = e;
  if (!o)
    return;
  const i = Se("rootSlots", {}), l = Ot(e.slots, n), c = s ? void 0 : Uo(o), u = c == null ? void 0 : c.processors, f = (a == null ? void 0 : a.attrs) ?? r, v = V({ disabled: a == null ? void 0 : a.disabled }), h = c ? void 0 : an(o), y = s ? typeof s == "function" ? s : i[s] : (h == null ? void 0 : h.component) || Pe[o] || (c == null ? void 0 : c.component) || (c == null ? void 0 : c.render);
  let w;
  if (o === "InfoSlot")
    w = y && (() => y({ props: r, ...n }));
  else if (o === "Text")
    w = () => $("span", r, t.refData);
  else if (o === "HTML")
    w = () => $("span", { ...r, innerHTML: t.refData });
  else if (o === "Buttons")
    w = () => $(qe, { option: e, effectData: n, ...r });
  else if (_t.includes(o) || o === "InputList")
    w = () => $(Pe[o], V({ option: e, model: t, effectData: n, ...r }), l);
  else if (!y)
    console.error(`组件 '${o}' 配置错误，请检查名称或'render'是否正确！`);
  else if (c && (u != null && u.length))
    w = () => $(lm, { inputAttrs: f, state: v, field: c, option: e, model: t, effectData: n }, l);
  else {
    const b = lr({ option: e, model: t, effectData: n }), C = { ...r, ...b };
    o === "InputSlot" ? w = () => y == null ? void 0 : y(V({ props: C, ...n })) : c ? w = () => {
      const d = { type: o, option: e, model: t, effectData: n, binding: V(b), state: v }, m = V(c.getAttrs(f, e, d.state));
      return c.render({ ...d, attrs: m, slots: l });
    } : (h == null ? void 0 : h.source) === "custom" || (h == null ? void 0 : h.source) === "auto" ? w = () => $(y, V(es(h, C)), l) : w = () => $(y, V({ option: e, model: t, effectData: n, ...C }), l);
  }
  return w;
}
const dm = ce({
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
    const n = ye(e, "source"), { modelsMap: r } = lt(e.modelsMap, n);
    return Qe("exaProvider", { data: ye(e, "source") }), () => {
      var a;
      return $(
        "div",
        { class: ["sup-form-section sup-detail", ((a = t.attrs) == null ? void 0 : a.useSectionStyle) && "sup-container"] },
        $(Pe.Descriptions, {
          option: e.option,
          model: { children: r },
          effectData: V({ current: n }),
          isView: !0
        })
      );
    };
  }
}), et = ce({
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
    const s = Se("exaProvider", {}).attrs, i = Se("gridConfig", s), l = {
      ...ue.Descriptions,
      ...i
    }, c = Xe({ gutter: e.gutter }, e.rowProps || l.rowProps, ue.row, {
      gutter: 16
    }), u = {
      subSpan: e.subSpan,
      ...e.descriptionsProps,
      ...a.attrs
    }, f = Xe(
      {
        subSpan: e.subSpan ?? l.subSpan,
        rowProps: c,
        ...u
      },
      l
    ), v = f.subSpan ?? (f.subSpan = ((o = ue.Col) == null ? void 0 : o.span) ?? 12), h = Hn(t, e, r), y = [];
    let w, b;
    h.forEach((d, m) => {
      d.node ?? (d.node = () => Z("descriptions")(fm(d.group, f))), d.isBlock ? (d.group || d.option.type === "InputList" ? (b || (b = [], y.push(["section", b])), b.push(d)) : (y.push(["block", d]), b = void 0), w = void 0) : (!w && y.push(["row", w = []]), w.push(d), b = void 0);
    });
    const C = () => $(
      cr,
      { name: "gridConfig", data: f },
      () => y.map(([d, m], x) => {
        let O = m.node;
        return d === "row" ? O = () => Z("row")(c, {
          default: () => m.map((A, T) => {
            const p = A.option.colProps || {
              span: A.option.span ?? v
            };
            return !oe(A.hidden) && Z("col")({ ...ue.Col, ...p, key: T }, { default: A.node });
          })
        }) : d === "section" && (O = () => m.map((A) => !oe(A.hidden) && A.node())), !oe(m.hidden) && (y.length > 1 ? $("div", { class: "sup-form-section", key: x }, O()) : O());
      })
    );
    return n ? () => $(
      Pe.Group,
      de(
        { class: "sup-form-section" },
        {
          option: e,
          model: {},
          effectData: ke({}),
          isView: !0,
          ...u
        }
      ),
      { innerContent: C }
    ) : C;
  }
});
function fm(e, t) {
  const {
    subSpan: n,
    column: r,
    layout: a,
    bordered: o,
    mode: s = o ? "table" : "default",
    rowProps: i,
    colon: l,
    size: c = "middle",
    tableLayout: u,
    labelCol: f,
    wrapperCol: v,
    ...h
  } = t, y = Math.max(1, Math.floor(Number(r) || (Number(n) ? 24 / Number(n) : 2))), w = [];
  let b = [], C = 0;
  const d = () => {
    b.length && (C < y && (b[b.length - 1].colspan += y - C), w.push(b), b = [], C = 0);
  };
  return e.forEach(({ option: m, label: x, content: O, hidden: A }, T) => {
    if (oe(A))
      return;
    const p = { ...h, ...m.formItemProps, ...m.descriptionsProps }, g = Number(p.span ?? m.span);
    let S = g ? Math.ceil(g / (24 / y)) : 1;
    S = Math.max(1, Math.min(y, S));
    const _ = {
      ...p.labelAlign && { textAlign: p.labelAlign },
      ...p.labelStyle
    }, P = { span: p.span ?? m.span, ...p.colProps || m.colProps };
    P.span === 0 || P.flex ? P.span = void 0 : Number(P.span) || (P.span = 24 / y);
    const k = {
      key: T,
      attrs: p,
      colProps: P,
      labelCol: de(f, p.labelCol, {
        style: _,
        class: { "sup-label-no-colon": p.noColon }
      }),
      wrapperCol: de(
        v,
        { style: a === "vertical" && { textAlign: p.labelAlign } },
        { style: p.contentStyle },
        p.wrapperCol
      ),
      label: x,
      content: O,
      colspan: S
    };
    C + S > y && d(), b.push(k), C += S, m.breakAfter && d();
  }), d(), { attrs: h, mode: s, layout: a, rowProps: i, colon: l, size: c, tableLayout: u, column: y, rows: w };
}
function Hn(e, t, n) {
  const r = [];
  let a;
  const o = Se("rootSlots", {});
  return [...e].forEach(([s, i], l) => {
    var c, u, f;
    const { type: v = "", field: h, viewRender: y, exclude: w } = s;
    if (v === "Hidden" || w != null && w.includes("description"))
      return;
    const { parent: b, refData: C } = Je(V(i)), d = ke({
      parent: n,
      current: b,
      isView: !0,
      field: i.refName,
      value: C,
      text: C,
      ..."index" in i && {
        index: i.index,
        record: h ? C : b
      }
    }), { attrs: m, hidden: x } = Fe({ option: s, effectData: d }), O = Ot(s.slots, d), A = $t(s, d);
    let T = s.block, p;
    const g = [], S = typeof y == "string" ? o[y] : y;
    p = S && (() => ie(S, d));
    const _ = i.children || ((c = i.listData) == null ? void 0 : c.modelsMap);
    if (v === "InputGroup") {
      if (!y) {
        let P = s.breakAfter;
        const R = (u = Hn(_, s, d)[0].group) == null ? void 0 : u.map(({ option: M, content: I }) => {
          const E = M.labelSlot || M.label, D = (m == null ? void 0 : m.compact) === !1 && E;
          return P = M.breakAfter || P, () => $("span", [D && ie(E, d), D && ": ", I == null ? void 0 : I()]);
        });
        p = () => Z("space")(
          { direction: P ? "vertical" : "horizontal" },
          {
            default: () => R == null ? void 0 : R.map((M) => M())
          }
        );
      }
      g.push({ option: s, label: A, hidden: x, content: p });
    } else if (v === "Fragment") {
      const P = Hn(_, s, d), k = P[0].group;
      k && (P.shift(), g.push(...k.map((R) => ({ ...R, hidden: x })))), P.length && (a = void 0, r.push(...P));
    } else if (i.children || i.listData || _t.includes(v)) {
      T ?? (T = !s.span);
      const P = [..._t, "InputList"].includes(v) ? v : "Group", k = Pe[P], R = () => $(
        k,
        V({
          option: s,
          model: i,
          effectData: d,
          isView: !0,
          ...ue[P],
          ...m
        }),
        O
      );
      p ?? (p = R), v === "InputList" && (!T || A && !(m != null && m.labelIndex) ? g.push({
        option: { ...s },
        label: A,
        hidden: x,
        content: p
      }) : p = R);
    } else {
      const P = pm(s, i, d);
      P && g.push({ option: s, label: A, hidden: x, content: P });
    }
    if (!(!g.length && !p))
      if (g.length && !T)
        a || (a = [], r.push({ option: t, isBlock: !0, group: a })), a.push(...g);
      else {
        if (g.length && A)
          r.push({ option: t, isBlock: T, group: g });
        else {
          const P = s.align && { textAlign: s.align };
          p = ((f = g[0]) == null ? void 0 : f.content) || p, r.push({
            option: s,
            isBlock: T,
            node: () => $(p, { style: P }),
            hidden: x
          });
        }
        a = void 0;
      }
  }), r;
}
function pm(e, t, n) {
  const { parent: r, refData: a } = Je(V(t)), o = t.refName ? a : void 0, s = pe(r.value) === pe(n.current) ? n : ke({
    parent: n,
    current: r,
    text: o,
    value: o,
    field: t.refName,
    isView: !0
  }), i = Wt(e, s);
  return i === !1 ? void 0 : () => i ? i() : String(t.refData ?? "");
}
const Tn = ce({
  inheritAttrs: !1,
  props: {
    option: { type: Object, required: !0 },
    model: { type: Object, required: !0 },
    effectData: Object,
    isView: Boolean
  },
  setup({ option: e, model: t, effectData: n, isView: r }, a) {
    const { type: o, label: s, title: i = s, buttons: l, contentAttrs: c } = e, u = o === "Descriptions" || r;
    let f;
    if (l) {
      const v = Array.isArray(l) ? { actions: l } : l;
      o === "Descriptions" && (v.visibleIn ?? (v.visibleIn = "detail")), f = hn({
        config: v,
        effectData: n,
        isView: u
      });
    }
    return () => {
      const { style: v, class: h, ...y } = a.attrs, w = a.slots.title || (i ? $t(e, n) : void 0), b = a.slots.extra || a.slots.actions || f, C = (l == null ? void 0 : l.placement) === "bottom" ? "bottom" : "title";
      return Z("group")({
        attrs: { class: h, style: v },
        contentAttrs: c,
        component: e.component && pe(e.component),
        slots: a.slots,
        title: w,
        extra: b,
        extraPlacement: C,
        extraAlign: (l == null ? void 0 : l.align) || (C === "bottom" ? "center" : w ? "right" : void 0),
        content: () => a.slots.innerContent ? a.slots.innerContent(y) : a.slots.default ? a.slots.default() : u ? $(et, {
          option: { descriptionsProps: y, ...e },
          modelsMap: t.children,
          effectData: n
        }) : $(Ke, { option: e, model: t, effectData: n })
      });
    };
  }
}), Ko = {
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
    const o = Ve(), s = H({}), {
      option: { onSubmit: i, onReset: l, buttons: c, ...u },
      ignoreRules: f,
      compact: v
    } = e, h = V({ formData: s, current: s }), { attrs: y } = Fe({ option: u, effectData: h }), w = /* @__PURE__ */ new Set(), b = (S) => {
      if (S)
        return w.add(S), () => w.delete(S);
    }, C = async (S) => {
      if (!o.value || f || !S.length)
        return;
      const _ = xe("form");
      if (!_.validateField)
        throw new Error("当前 UIAdapter 未实现 form.validateField");
      await _.validateField(o.value, S);
    }, d = () => {
      o.value && xe("form").clearValidate(o.value);
    };
    Qe("exaProvider", {
      data: Oa(s),
      attrs: y,
      onSubmit: b,
      validateField: C
    }), Qe("inheritOptions", {
      disabled: y.disabled,
      subSpan: u.subSpan,
      ignoreRules: f
    });
    const m = (S) => Promise.all(
      [...w, i].map(async (_) => {
        const P = await (_ == null ? void 0 : _(S));
        return P === !1 || P && P.errMessage ? Promise.reject({ message: P && P.errMessage }) : P;
      })
    );
    f && Object.assign(y, { hideRequiredMark: !0, validateTrigger: !1 });
    const x = {
      dataSource: s,
      getNativeInstance: () => o.value,
      async validate() {
        if (!o.value)
          throw new Error("表单尚未挂载或已卸载");
        await xe("form").validate(o.value);
      },
      validateField: C,
      clearValidate: d,
      async submit() {
        await x.validate();
        try {
          await m(s.value);
        } catch (_) {
          throw _ && typeof _ == "object" && "message" in _ && _.message && xe("services").message("error", _.message), _;
        }
        const S = Me(s.value);
        return n("submit", S), S;
      },
      setFieldsValue(S) {
        return d(), Ho(s.value, S, T);
      },
      resetFields(S = {}) {
        qo(s.value, S, T), d();
        const _ = Me(s.value);
        return l == null || l(_), n("reset", _), _;
      }
    }, O = Array.isArray(c) ? { actions: c } : c;
    (a = O == null ? void 0 : O.actions) != null && a.length && (u.subItems = [
      ...u.subItems,
      {
        type: "InfoSlot",
        align: O.align || "center",
        block: !0,
        render: () => $(qe, {
          option: O,
          methods: {
            submit: x.submit,
            reset: x.resetFields,
            search: x.submit
          },
          effectData: h
        }),
        ...O.placement === "inline" && {
          span: "auto",
          block: !1,
          align: O.align || "right"
        }
      }
    ]);
    const { modelsMap: A } = St(u.subItems, s), T = Me(s.value);
    X(
      () => oe(e.dataSource ?? e.option.dataSource),
      (S) => {
        S && (d(), s.value = S);
      },
      { immediate: !0, flush: "sync" }
    );
    const p = V({ ...x }), g = (S) => {
      if (o.value = S, !S) {
        n("register", null);
        return;
      }
      n("register", p);
    };
    return en(() => {
      w.clear(), o.value = void 0;
    }), t(p), () => Z("form")(
      {
        ref: g,
        class: ["sup-form", v && "sup-form-compact", f && "sup-form-simple"],
        model: s.value,
        labelAlign: "right",
        ...y
      },
      {
        ...r,
        default: () => $(Ke, {
          option: u,
          model: { refData: s, children: A },
          effectData: h
        })
      }
    );
  }
}, vm = ce({
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
    let i = a, l = Bt(a.rules, e.effectData), c = ye(a, "propChain");
    const u = {}, f = {
      type: "object",
      required: !1,
      fields: {}
    }, v = a.refName !== void 0 || a.index !== void 0;
    if (a.children && o) {
      for (const d of a.children.values())
        if ((n = d.rules) != null && n.length && d.fieldName) {
          d.rules[0].required && (f.required = !0);
          const m = V({
            ...e.effectData,
            parent: e.effectData,
            current: ye(d, "parent"),
            field: d.fieldName,
            value: ye(d, "refData")
          }), x = f.fields[d.fieldName] = Bt(d.rules, m);
          if (!v) {
            c = ye(d, "propChain"), l = x, i = d;
            break;
          }
        }
    } else
      u.style = "margin: 0";
    v && (l = (l || []).concat([f])), l || (l = []), u.required = l.some((d) => d.required);
    const h = Se("inheritOptions", {}), y = K(
      () => e.disabled ? void 0 : (!r.required || oe(h.required) ? l : l.slice(1)).map(
        (d) => h.ignoreRules ? { ...d, trigger: "none", validateTrigger: !1 } : d
      )
    ), w = de(ue.FormItem, r.formItemProps, u), b = $t(r, e.effectData), C = Se("exaProvider", {});
    return X(
      () => oe(i.refData),
      () => {
        var d, m;
        !e.disabled && ((d = y.value) != null && d.length) && ((m = C.validateField) == null || m.call(C, c.value).catch(() => {
        }));
      },
      { deep: !0, flush: "post" }
    ), () => Z("formItem")(
      {
        ...w,
        rules: y.value,
        name: c.value
      },
      {
        label: b,
        default: (s == null ? void 0 : s.default) || (() => $(Ke, {
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
function yn(e, t) {
  const n = Array.isArray(t) ? { actions: t } : t;
  return {
    ...e,
    ...n,
    buttonProps: { ...e.buttonProps, ...n == null ? void 0 : n.buttonProps }
  };
}
const mm = ce({
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
    const { model: t, option: n, isView: r, effectData: a, labelIndex: o } = e, { columns: s, rowButtons: i, label: l, labelSlot: c, compact: u, slots: f, ...v } = n, { modelsMap: h } = t.listData, y = s[0], w = h.get(y), b = s.length === 1 && y.field === "$index", C = !o && (l || c), d = ye(t, "refData");
    let m = [];
    const x = {
      add: {
        onClick({ index: g }) {
          d.value.splice(g + 1, 0, b ? void 0 : {}), m.splice(g + 1, 0, void 0);
        },
        icon: () => it("add")
      },
      delete: {
        disabled: () => d.value.length === 1,
        confirmText: "",
        icon: () => it("remove"),
        onClick({ index: g }) {
          d.value.splice(g, 1), m.splice(g, 1);
        }
      }
    }, O = !r && i !== !1 && yn(
      {
        type: "Buttons",
        colProps: { flex: "0" },
        labelMode: "icon",
        ...ue.rowButtons,
        methods: x,
        actions: ["add", "delete"]
      },
      i
    ), A = Ve([]), T = (g, S) => {
      const _ = [...t.propChain, S], P = V({ ...b ? w : {}, index: S, parent: d, propChain: _ }), k = b ? K({
        get: () => d.value[P.index],
        set: (E) => {
          d.value[P.index] = E;
        }
      }) : H(g);
      P.refData = k;
      const R = /* @__PURE__ */ new Map();
      let M;
      b ? (M = { ...y }, Object.assign(P, { initialValue: w.initialValue, rules: w.rules })) : h.size === 1 && !y.field && [..._t, "InputGroup", "InputList"].includes(y.type) ? (M = { ...y }, Object.assign(P, {
        initialValue: w.initialValue,
        rules: w.rules,
        listData: w.listData,
        children: lt(w.children || /* @__PURE__ */ new Map(), k, _).modelsMap
      })) : (M = { type: u ? "InputGroup" : "Group", initialValue: void 0, span: "auto" }, P.children = lt(h, k, _).modelsMap), R.set(M, P), o && (M.label ?? (M.label = l), M.labelSlot ?? (M.labelSlot = c || (({ index: E }) => M.label + String(E + 1)))), O && R.set(O, V({ parent: d, index: S }));
      const I = V({ parent: d, children: R, index: S, propChain: _ });
      return {
        children: I.children,
        model: I,
        refData: k,
        key: gt(12),
        effectData: V({ parent: a, current: d, index: S })
      };
    };
    if (b)
      X(
        [() => d.value, () => d.value.length, () => [...t.propChain]],
        () => {
          d.value.length === 0 && d.value.push(void 0), A.value = d.value.map((g, S) => {
            const _ = m[S];
            return _ ? (zt(_.model, [...t.propChain, S], S), _.effectData.index = S, _) : T(g, S);
          }), m = [...A.value];
        },
        { immediate: !0 }
      );
    else {
      const g = /* @__PURE__ */ new WeakMap();
      X(
        [() => [...d.value], () => d.value.length, () => [...t.propChain]],
        () => {
          d.value.length === 0 && d.value.push({}), A.value = d.value.map((S, _) => {
            let P = g.get(pe(S));
            return P ? (P.refData.value = S, zt(P.model, [...t.propChain, _], _), P.effectData.index = _) : (P = T(S, _), g.set(pe(S), P)), P;
          });
        },
        { immediate: !0 }
      );
    }
    const p = () => A.value.map(({ model: g, effectData: S, key: _ }) => $(Ke, { model: g, option: { subSpan: "auto", ...n }, effectData: S, key: _ }));
    if (r) {
      if (C)
        if (b) {
          const { label: _, labelSlot: P = _ } = s[0], k = s[0].breakAfter;
          return () => Z("space")(
            { direction: k ? "vertical" : "horizontal" },
            {
              default: () => A.value.map(({ refData: R, key: M }, I) => {
                const E = {
                  ...a,
                  parent: a,
                  current: d.value,
                  field: s[0].field,
                  value: R.value,
                  index: I,
                  record: R.value
                };
                return $("span", { key: M }, [ie(P, E), P ? ": " : "", R.value]);
              })
            }
          );
        } else
          return () => A.value.map(({ children: _, key: P }) => $(et, {
            key: P,
            modelsMap: _,
            option: n,
            effectData: a
          }));
      const g = {}, S = K(() => new Map(A.value.flatMap(({ children: _ }) => [..._])));
      return () => $(et, {
        option: { ...v, label: l, labelSlot: c },
        modelsMap: S.value,
        effectData: a,
        ...g
      });
    } else if (C) {
      const g = /* @__PURE__ */ new Map([
        [
          {
            ...v,
            formItemProps: { ...v.formItemProps, style: "margin: 0" },
            label: l,
            labelSlot: c,
            type: "InfoSlot",
            block: !1,
            span: 24,
            // FormItem 对单个与多个子节点采用不同包装；固定根节点，避免 1/2 行切换时重挂首行并清除校验状态。
            render: () => $("div", { style: "width: 100%" }, p())
          },
          t
        ]
      ]);
      return () => $(Ke, { model: { children: g }, option: n, effectData: a });
    } else
      return p;
  }
}), bm = ce({
  inheritAttrs: !1,
  props: {
    option: { type: Object, required: !0 },
    model: { type: Object, required: !0 },
    effectData: Object,
    isView: Boolean
  },
  setup(e, { attrs: t, slots: n }) {
    return () => {
      const { option: r, model: a, effectData: o, isView: s } = e, { title: i = r.label, buttons: l } = r;
      return Z("card")({
        attrs: t,
        slots: n,
        title: n.title || (i ? () => ie(i, o) : void 0),
        extra: n.extra || (l && !s ? () => $(qe, { option: l, effectData: o }) : void 0),
        content: n.default || (() => s ? $(et, { option: r, modelsMap: a.children, effectData: o }) : $(Ke, { option: r, model: a, effectData: o }))
      });
    };
  }
}), hm = ce({
  name: "SuperForm",
  props: {
    schema: Object,
    model: Object,
    dataSource: Object,
    useSectionStyle: Boolean,
    compact: { type: Boolean, default: void 0 },
    ignoreRules: { type: Boolean, default: void 0 }
  },
  emits: ["register"],
  setup(e, t) {
    var n, r;
    const a = H(), o = ft({
      ...e.schema,
      dataSource: e.dataSource || e.model || ((n = e.schema) == null ? void 0 : n.dataSource),
      attrs: de({ ...ue.Form }, { ...(r = e.schema) == null ? void 0 : r.attrs })
    });
    _e.schemaDiagnostics && e.schema && qt(e.schema, "form", "SuperForm");
    const s = {
      setOption: (u) => {
        var f;
        _e.schemaDiagnostics && qt(u, "form", "SuperForm"), Xe(o, u), o.attrs = de(o.attrs, { ...u.attrs }, { ...(f = e.schema) == null ? void 0 : f.attrs });
      }
    };
    Qe("rootSlots", t.slots), t.emit("register", s);
    const i = (u) => {
      a.value = u, t.emit("register", s, u);
    };
    xa(() => t.expose(a.value));
    const l = K(() => e.useSectionStyle || o.useSectionStyle);
    return () => o.subItems && $(
      Pe.Form,
      {
        option: o,
        // dataSource: formData.value,
        onRegister: i,
        compact: e.compact,
        ignoreRules: e.ignoreRules,
        class: { "sup-container": l.value }
      },
      Ot(o.slots, ke(), t.slots)
    );
  }
});
function Yo(e) {
  const [t, n] = zn(), r = Promise.resolve(typeof e == "function" ? e() : e), a = (s, i) => {
    if (s)
      t.value || r.then(s.setOption), t.value = i;
    else
      return (l, c) => $(hm, { ...l, onRegister: a }, c == null ? void 0 : c.slots);
  }, o = async (s, i) => {
    const l = await n();
    if (s && s in l)
      return typeof l[s] == "function" ? l[s](i) : l[s];
    if (!s)
      return l;
  };
  return [
    a,
    {
      dataSource: K(() => {
        var s;
        return (s = t.value) == null ? void 0 : s.dataSource;
      }),
      getForm: n,
      asyncCall: o,
      getData() {
        var s;
        return ge((s = t.value) == null ? void 0 : s.dataSource);
      },
      submit: () => o("submit"),
      validate: () => o("validate"),
      validateField: (s) => o("validateField", s),
      clearValidate: () => o("clearValidate"),
      getNativeInstance: () => o("getNativeInstance"),
      resetFields: (s) => o("resetFields", s),
      setFieldsValue: (s) => o("setFieldsValue", s)
    }
  ];
}
function dr(e, { buttons: t, ...n } = {}) {
  const r = H(!1), a = V({ ...n, ...ue.Modal }), o = H(), s = t && (() => $(qe, { option: t, effectData: { modalRef: o } })), i = H(!1), l = () => {
    if (!(i.value || u))
      return i.value = !0, Promise.resolve().then(() => {
        var C;
        return (C = a.onOk) == null ? void 0 : C.call(a);
      }).then((C) => {
        C !== !1 && (r.value = !1);
      }).catch((C) => console.error(C)).finally(() => i.value = !1);
  }, c = () => a.icon ? [ie(a.icon), ie(a.title)] : ie(a.title);
  let u;
  const f = (...C) => i.value ? Promise.resolve(!1) : u || (u = Promise.resolve().then(() => {
    var d;
    return (d = a.onCancel) == null ? void 0 : d.call(a, ...C);
  }).then((d) => (d !== !1 && (r.value = !1), d)).catch((d) => (console.error(d), !1)).finally(() => {
    u = void 0;
  })), v = (C) => {
    if (C)
      r.value = !0;
    else if (r.value)
      return f();
  };
  return {
    config: a,
    modalRef: o,
    modalSlot: (C, d) => Z("modal")(
      {
        ref: o,
        visible: r.value,
        class: "sup-modal",
        "onUpdate:visible": v,
        confirmLoading: i.value,
        okText: q("confirm"),
        cancelText: q("cancel"),
        ...a,
        title: void 0,
        ...C,
        onOk: l,
        onCancel: f
      },
      { footer: s, title: c, ...d == null ? void 0 : d.slots, ...e && { default: e } }
    ),
    setModal: (C) => {
      Object.assign(a, C);
    },
    closeModal: () => (r.value = !1, ze()),
    openModal: async (C) => (Object.assign(a, C), r.value = !0, ze())
  };
}
function Go(e, t) {
  var n;
  const { modalSlot: r, openModal: a, modalRef: o, closeModal: s, setModal: i, config: l } = dr(e, t), c = Aa(), u = document.createElement("div");
  let f;
  const v = st().modal, h = (n = v == null ? void 0 : v.useContext) == null ? void 0 : n.call(v), y = () => {
    const d = l.afterClose;
    l.destroyOnClose && b(), d == null || d();
  }, w = (d) => {
    var m;
    return ((m = v == null ? void 0 : v.wrapContext) == null ? void 0 : m.call(
      v,
      (x = {}) => r({ ...d, ...x, afterClose: y }, {}),
      h,
      d
    )) ?? r({ ...d, afterClose: y }, {});
  }, b = () => {
    Pn(null, u), u.remove(), f = null;
  };
  return Vn(b), {
    modalRef: o,
    openModal: (d) => f ? a(d) : (f = $a(w), f.appContext = c == null ? void 0 : c.appContext, document.body.appendChild(u), Pn(f, u), ze(() => a(d))),
    modalSlot: r,
    closeModal: s,
    setModal: i
  };
}
function jb(e, t = {}) {
  const { title: n, ...r } = e, { onSubmitError: a, ...o } = t, [s, i] = Yo(r), l = Go(s(), { maskClosable: !1, title: n, ...o });
  return { ...l, openModal: ({ data: u, onOk: f = t.onOk, onSubmitError: v = a, ...h } = {}) => {
    const y = async () => {
      try {
        const w = await i.submit();
        return f ? await f(w) : w;
      } catch (w) {
        try {
          await (v == null ? void 0 : v(w));
        } catch (b) {
          console.error(b);
        }
        throw w;
      }
    };
    return i.resetFields(u), l.openModal({ ...h, onOk: y });
  }, formActions: i };
}
const Mn = ce({
  name: "CollectionList",
  inheritAttrs: !1,
  props: {
    option: { type: Object, required: !0 },
    model: { type: Object, required: !0 },
    effectData: { type: Object, required: !0 },
    isView: Boolean
  },
  setup(e, { attrs: t, slots: n }) {
    const r = ye(e.model, "refData"), a = Ve([]), o = /* @__PURE__ */ new WeakMap(), s = H(), i = H([]), l = H(), c = H({}), u = H(0), f = e.option.editModal && dr(
      () => {
        var d, m, x;
        return $(Ko, {
          key: u.value,
          option: {
            ...(d = e.option.editModal) == null ? void 0 : d.form,
            subItems: ((x = (m = e.option.editModal) == null ? void 0 : m.form) == null ? void 0 : x.subItems) || e.option.columns
          },
          dataSource: c.value,
          onRegister: (O) => {
            l.value = O;
          }
        });
      },
      { maskClosable: !1, ...e.option.editModal.modalProps }
    ), v = (d) => {
      ze(() => {
        const m = a.value.find((x) => pe(x.model.refData) === pe(d));
        m && (e.option.type === "TabList" && (s.value = m.key), e.option.type === "CollapseList" && !i.value.includes(m.key) && (i.value = [...i.value, m.key]));
      });
    }, h = (d, m) => {
      var x, O;
      if (!(e.isView || !f))
        return c.value = Me((d == null ? void 0 : d.model.refData) || {}), u.value++, f.openModal({
          title: ((O = (x = e.option.editModal) == null ? void 0 : x.modalProps) == null ? void 0 : O.title) || (() => q(d ? "editTitle" : "add")),
          onOk: async () => {
            if (e.isView)
              return;
            const A = await l.value.submit();
            if (d) {
              const T = a.value.indexOf(d);
              if (T < 0)
                throw new Error(q("recordDeleted"));
              Object.assign(r.value[T], A);
            } else {
              const T = A;
              if (m === null)
                r.value.unshift(T);
              else {
                const p = a.value.indexOf(m);
                if (p < 0)
                  throw new Error(q("insertRecordDeleted"));
                r.value.splice(p + 1, 0, T);
              }
              v(T);
            }
          }
        });
    }, y = {
      add: ({ listItemKey: d } = {}) => {
        if (e.isView)
          return;
        const m = a.value.find((O) => O.key === d);
        if (d !== void 0 && !m)
          throw new Error(q("insertRecordDeleted"));
        if (f)
          return h(void 0, m || null);
        const x = {};
        m ? r.value.splice(a.value.indexOf(m) + 1, 0, x) : r.value.unshift(x), v(x);
      },
      edit: ({ listItemKey: d }) => {
        const m = a.value.find((x) => x.key === d);
        if (m)
          return h(m);
      },
      delete: ({ listItemKey: d }) => {
        const m = a.value.findIndex((x) => x.key === d);
        !e.isView && m >= 0 && r.value.splice(m, 1);
      }
    }, w = Se("rootSlots", {}), b = (d, m, x) => {
      if (d !== !1)
        return Vo(
          yn({ ...ue.rowButtons, actions: x }, d),
          m,
          y,
          w,
          () => !e.isView
        );
    }, C = b(e.option.buttons, e.effectData, ["add"]);
    return X(
      [() => [...r.value], () => [...e.model.propChain]],
      () => {
        var d;
        const m = a.value, x = m.findIndex((p) => p.key === s.value), O = /* @__PURE__ */ new Map(), A = /* @__PURE__ */ new Set();
        a.value = r.value.map((p, g) => {
          const S = pe(p), _ = O.get(S) || 0;
          O.set(S, _ + 1);
          const P = o.get(S) || [];
          let k = P[_];
          if (!k) {
            const R = H(p), { modelsMap: M } = lt(e.model.listData.modelsMap, R, e.model.propChain, g);
            k = {
              key: _ ? gt(12) : je(p, String(t.rowKey || "id")) ?? gt(12),
              model: V({ refData: R, children: M, index: g, propChain: [...e.model.propChain, g] }),
              effectData: V({ parent: e.effectData, current: r, index: g, record: p })
            }, k.buttons = b(
              e.option.rowButtons,
              k.effectData,
              f ? ["add", "edit", "delete"] : ["add", "delete"]
            ), P[_] = k, o.set(S, P);
          }
          return A.has(k.key) && (k.key = gt(12)), A.add(k.key), k.effectData.listItemKey = k.key, k.model.refData = p, k.effectData.record = p, zt(k.model, [...e.model.propChain, g], g), k.effectData.index = g, k;
        }), a.value.some((p) => p.key === s.value) || (s.value = (d = a.value[Math.min(Math.max(x, 0), a.value.length - 1)]) == null ? void 0 : d.key);
        const T = m.findIndex(
          (p) => i.value.includes(p.key) && !a.value.some((g) => g.key === p.key)
        );
        if (i.value = i.value.filter((p) => a.value.some((g) => g.key === p)), T >= 0 && a.value.length) {
          const p = a.value[Math.min(T, a.value.length - 1)].key;
          i.value.includes(p) || i.value.push(p);
        }
      },
      { immediate: !0 }
    ), () => {
      const { option: d, isView: m } = e, { span: x = 24 } = t, O = { ...t };
      delete O.rowKey, delete O.span;
      const A = d.title ?? d.label, T = !m && C ? () => C.render() : void 0, p = n.title || A || T ? () => Z("space")(
        {},
        {
          default: () => [n.title ? n.title() : ie(A, e.effectData), T == null ? void 0 : T()]
        }
      ) : void 0, g = a.value.map((_, P) => ({
        key: _.key,
        title: () => d.titleField ? je(_.model.refData, d.titleField) || ["新建", ie(A, e.effectData)] : [ie(A, e.effectData), String(P + 1)],
        extra: !m && d.type !== "TabList" && _.buttons ? () => _.buttons.render() : void 0,
        content: () => m || f ? $(et, { option: d, modelsMap: _.model.children, effectData: _.effectData }) : $(Ke, { option: d, model: _.model, effectData: _.effectData })
      })), S = () => g.length ? d.type === "TabList" ? Z("tabs")({
        attrs: O,
        items: g,
        activeKeys: s.value,
        onActiveChange: (_) => {
          s.value = _;
        },
        extra: m ? void 0 : () => {
          var _, P;
          return (P = (_ = a.value.find((k) => k.key === s.value)) == null ? void 0 : _.buttons) == null ? void 0 : P.render();
        }
      }) : d.type === "CollapseList" ? Z("collapse")({
        attrs: O,
        items: g,
        activeKeys: i.value,
        onActiveChange: (_) => {
          i.value = Array.isArray(_) ? _ : [_];
        }
      }) : Z("row")(
        { gutter: d.gutter ?? [16, 16], ...d.rowProps },
        {
          default: () => g.map(
            (_) => Z("col")(
              { key: _.key, span: x },
              {
                default: () => Z("card")({
                  attrs: O,
                  title: _.title,
                  extra: _.extra,
                  content: _.content
                })
              }
            )
          )
        }
      ) : Z("empty")();
      return [Z("group")({ title: p, content: S }), f && $(f.modalSlot)];
    };
  }
}), gm = ce({
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
    const { model: n, isView: r, effectData: a, labelIndex: o, rowKey: s = "" } = e, { columns: i, rowButtons: l, slots: c, ...u } = e.option, { modelsMap: f, rules: v } = n.listData, h = ye(n, "refData"), y = {
      add: {
        icon: () => it("add"),
        onClick({ index: x }) {
          h.value.splice(x + 1, 0, {}), h.value = [...pe(h.value)];
        }
      },
      delete: {
        hidden: () => h.value.length === 1,
        disabled: !1,
        confirmText: "",
        icon: () => it("remove"),
        onClick({ index: x }) {
          h.value = h.value.filter((O, A) => A !== x);
        }
      }
    }, w = !r && l !== !1 && yn(
      {
        type: "Buttons",
        labelMode: "icon",
        ...ue.rowButtons,
        methods: y,
        actions: ["add", "delete"]
      },
      l
    ), b = /* @__PURE__ */ new WeakMap(), C = H([]);
    X(
      [() => [...h.value], () => [...n.propChain]],
      () => {
        const x = h.value;
        x.length === 0 && x.push({}), C.value = x.map((O, A) => {
          const T = pe(O), p = b.get(T);
          if (p)
            return p.refData.value = O, zt(p.model, [...n.propChain, A], A), p.effectData.index = A, p;
          const g = H(O), { modelsMap: S } = lt(f, g, n.propChain, A), _ = {
            key: O[s] || gt(12),
            refData: g,
            model: V({ refData: g, children: S, index: A, propChain: [...n.propChain, A] }),
            effectData: V({
              parent: a,
              current: h,
              index: A,
              record: O
            })
          };
          return b.set(T, _), _;
        });
      },
      {
        immediate: !0
      }
    );
    const d = {
      ...u,
      type: "Group",
      buttons: w,
      subItems: i
    }, m = u.title || u.label;
    return typeof m == "string" && o && (d.title = ({ index: x }) => m + String(x + 1)), () => C.value.map(({ model: x, effectData: O, key: A }) => $(Pe.Group, { model: x, option: d, effectData: O, key: A, isView: r }, t.slots));
  }
}), ym = /* @__PURE__ */ ce({
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
    const r = H(e.option.activeKey), a = [], o = (i, l, c) => {
      a[i] = c ? void 0 : l, c && r.value === l && (r.value = a.find(Boolean));
    }, s = [...e.model.children].map(([i, l], c) => {
      const {
        key: u,
        field: f,
        label: v,
        icon: h
      } = i, y = ke({
        parent: e.effectData,
        current: ye(l, "parent"),
        field: l.refName,
        value: l.refData
      }), {
        hidden: w,
        attrs: b
      } = Fe({
        option: i,
        effectData: y
      }), C = u || f || String(c), d = () => [ie(h, y), ie(v, y)];
      return Ze(() => o(c, C, oe(w) || oe(b.disabled))), {
        attrs: V(b),
        key: C,
        title: d,
        hidden: w,
        option: i,
        model: l,
        effectData: y
      };
    });
    return xa(() => {
      r.value ?? (r.value = a.find(Boolean));
    }), () => Z("tabs")({
      attrs: t,
      slots: n,
      content: n.default,
      activeKeys: r.value,
      onActiveChange: (i) => {
        r.value = i;
      },
      extra: n.extra || (!e.isView && e.option.buttons ? () => $(qe, {
        option: e.option.buttons,
        effectData: e.effectData
      }) : void 0),
      // 显隐和禁用属于 Schema 语义，两个 Adapter 消费相同的有效子项。
      items: s.filter(({
        hidden: i
      }) => !i.value).map(({
        attrs: i,
        key: l,
        title: c,
        option: u,
        model: f,
        effectData: v
      }) => ({
        key: l,
        attrs: i,
        title: c,
        disabled: oe(i.disabled),
        content: () => e.isView ? $(et, {
          option: u,
          modelsMap: f.children,
          effectData: v
        }) : $(Ke, {
          option: u,
          model: f,
          effectData: v
        })
      }))
    });
  }
}), yt = (e, ...t) => sv(e, ...t, (n, r, a, o) => {
  if (r === void 0)
    o[a] = void 0;
  else if (Array.isArray(n))
    return r;
});
function wm({
  childrenMap: e,
  orgList: t,
  listener: n,
  rowEditor: r,
  rowKey: a
}) {
  const o = ft(/* @__PURE__ */ new Map()), s = K(() => Object.fromEntries([...o.values()].flatMap((p) => [[p.id, p.editData], [p.validationId, p.editData]]))), i = Ve();
  let l = Promise.resolve(), c = 0;
  const u = K(() => !!(r != null && r.singleEdit) && o.size > 0), f = (p) => o.get(a(p)) || {
    isEdit: !1
  }, v = (p) => {
    p.isEdit = !1, o.get(p.key) === p && o.delete(p.key);
  }, {
    onLoaded: h
  } = Se("exaProvider", {}), y = h == null ? void 0 : h(() => {
    r != null && r.singleEdit && (o.forEach((p) => {
      p.isEdit = !1;
    }), o.clear());
  });
  en(() => y == null ? void 0 : y());
  const w = K(() => {
    const p = [...t.value];
    for (const g of o.values())
      if (g.isNew) {
        const S = g.anchorKey === void 0 ? p.length - 1 : p.findIndex((_) => a(_) === g.anchorKey);
        p.splice(S < 0 ? Math.min(g.index, p.length) : S + 1, 0, g.record);
      }
    return p;
  }), b = (p, g, S) => {
    const _ = V(Me(g)), P = `row_${++c}`, {
      modelsMap: k,
      rules: R
    } = zo(pe(e), _, [P]), M = ft({
      id: P,
      validationId: `${P}_validation`,
      record: p,
      key: a(p),
      editData: _,
      modelsMap: k,
      rules: ft(R),
      fields: ft({}),
      isEdit: !0,
      saving: !1,
      ...S
    });
    o.set(M.key, M);
  }, C = {
    add({
      index: p,
      record: g,
      resetData: S
    } = {}) {
      if (u.value)
        return;
      const _ = g ?? (p === void 0 ? void 0 : t.value[p]);
      if (p !== void 0 && !_)
        throw new Error(q("insertPositionInvalid"));
      const P = {
        ...S
      }, k = _ && a(_), R = _ ? t.value.findIndex((M) => a(M) === k) + 1 : t.value.length;
      b(P, P, {
        isNew: !0,
        index: R,
        anchorKey: k
      });
    },
    edit({
      record: p,
      selectedRows: g,
      resetData: S
    }) {
      if (u.value)
        return;
      const _ = p || (g == null ? void 0 : g[0]);
      !_ || f(_).isEdit || b(_, yt({}, _, S), {
        isNew: !1
      });
    },
    delete({
      record: p,
      selectedRows: g
    }) {
      const S = p ? [p] : g || [];
      if (!(u.value || S.some((_) => f(_).isEdit)))
        return n.onDelete(S);
    }
  }, d = {
    add: {
      disabled: () => u.value,
      onClick: C.add
    },
    edit: {
      disabled: (p) => {
        var g, S;
        return u.value || !(p.record || ((g = p.selectedRows) == null ? void 0 : g.length) === 1) || !!f(p.record || ((S = p.selectedRows) == null ? void 0 : S[0]) || {}).isEdit;
      },
      onClick: C.edit
    },
    delete: {
      disabled: (p) => {
        var g;
        return u.value || !(p.record || ((g = p.selectedRows) == null ? void 0 : g.length) > 0) || (p.record ? [p.record] : p.selectedRows || []).some((S) => f(S).isEdit);
      },
      onClick: C.delete
    }
  }, m = [{
    name: "save",
    attrs: {
      loading: !0
    },
    onClick: async (p) => {
      var g;
      const {
        record: S
      } = p, _ = f(S);
      if (!(!_.isEdit || _.saving)) {
        _.saving = !0;
        try {
          const P = xe("form");
          if (await ze(), !_.isEdit)
            return;
          if (!i.value)
            throw new Error("行编辑表单尚未就绪");
          const k = l.then(() => {
            if (!_.isEdit)
              return;
            const I = [..._.modelsMap.values()].filter((E) => _.rules[E.propChain.join(".")]).map((E) => {
              var D;
              return (D = _.fields[E.propChain.join(".")]) != null && D.editable.value ? E.propChain : [_.validationId, ...E.propChain.slice(1)];
            });
            if (I.length)
              return P.validate(i.value, I);
          });
          if (l = k.catch(() => {
          }), await k, !_.isEdit)
            return;
          if (await ((g = r == null ? void 0 : r.onSave) == null ? void 0 : g.call(r, {
            ...p,
            isNew: _.isNew
          })) === !1 || !_.isEdit)
            return !1;
          const M = Me(pe(_.editData));
          if (_.isNew) {
            const I = _.anchorKey === void 0 ? void 0 : t.value.findIndex((E) => a(E) === _.anchorKey);
            if (I === -1)
              throw new Error(q("insertAnchorDeleted"));
            await n.onSave(M, I), _.isNew = !1;
          } else
            await n.onUpdate(M, S);
          v(_);
        } catch (P) {
          throw P instanceof Error && xe("services").message("error", P.message), P;
        } finally {
          _.saving = !1;
        }
      }
    }
  }, {
    name: "cancel",
    disabled: ({
      record: p
    }) => f(p).saving,
    onClick: async (p) => {
      var g;
      const S = f(p.record);
      if (!(!S.isEdit || S.saving)) {
        S.saving = !0;
        try {
          if (await ((g = r == null ? void 0 : r.onCancel) == null ? void 0 : g.call(r, {
            ...p,
            isNew: S.isNew
          })) === !1)
            return;
          v(S);
        } finally {
          S.saving = !1;
        }
      }
    }
  }], x = (p, g) => f(p.record).isEdit ? $(qe, {
    key: "edit",
    option: {
      ...g,
      actions: m
    },
    effectData: p
  }) : null, O = /* @__PURE__ */ ce({
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
      option: p,
      editInfo: g,
      viewRender: S
    }) {
      const {
        editable: _ = !0
      } = p, {
        modelsMap: P
      } = g, k = P.get(pe(p)), {
        index: R,
        parent: M,
        refData: I
      } = Je(k), E = k.propChain.join("."), D = ke({
        current: M,
        value: I,
        index: R
      }), {
        attrs: B,
        hidden: U,
        nativeAttrs: W,
        disabled: ee
      } = Fe({
        option: p,
        effectData: D
      }), z = K(() => !U.value && (Ye(_) ? _(D) : _)), G = gn(p, k, D, B, {
        attrs: W,
        disabled: ee
      }), Q = Bt(k.rules, D), se = K(() => oe(B.disabled) || oe(U) ? [] : Q), le = {
        editable: z
      };
      return g.fields[E] = le, Q && (g.rules[E] = se), en(() => {
        g.fields[E] === le && delete g.fields[E];
      }), () => z.value ? Z("formItem")({
        name: k.propChain,
        rules: se.value,
        wrapperCol: {},
        class: "sup-table-edit-item"
      }, {
        default: G
      }) : S ? S({
        ...D,
        isView: !0
      }) : I.value;
    }
  }), A = (p, g) => {
    if (fr(p.type) === "enhanced" || Sn(p.type) || p.type === "InputSlot")
      return ({
        record: S
      }) => {
        const _ = f(S);
        if (_.isEdit)
          return $(O, {
            key: _.id,
            option: p,
            editInfo: _,
            viewRender: g
          });
      };
  }, T = /* @__PURE__ */ ce({
    setup(p, {
      slots: g
    }) {
      return () => Z("form")({
        ref: i,
        model: s.value,
        class: "sup-table-inline-form"
      }, {
        default: () => {
          var S;
          return [
            (S = g.default) == null ? void 0 : S.call(g),
            // 未展示或只读列仍须注册整行规则，不能依赖输入框是否挂载。
            ...[...o.values()].map((_) => $("div", {
              key: _.id,
              style: {
                display: "none"
              }
            }, [..._.modelsMap.values()].flatMap((P) => {
              var k;
              const R = P.propChain.join(".");
              return !_.rules[R] || (k = _.fields[R]) != null && k.editable.value ? [] : [Z("formItem")({
                key: R,
                name: [_.validationId, ...P.propChain.slice(1)],
                rules: oe(_.rules[R])
              })];
            })))
          ];
        }
      });
    }
  });
  return {
    list: w,
    methods: C,
    buttonMethods: d,
    getEditRender: A,
    editButtonsSlot: x,
    wrapTable: (p) => $(T, null, {
      default: p
    })
  };
}
function Sm({ rowKey: e, option: t, listener: n, orgList: r }) {
  const a = t.rowEditor, o = (a == null ? void 0 : a.form) || {};
  o.subItems = o.subItems || t.columns.filter((y) => {
    var w;
    return !((w = y.exclude) != null && w.includes("form"));
  });
  const [s, i] = Yo(o), l = {
    ...ue.Modal,
    maskClosable: !1,
    destroyOnClose: !0,
    ...t.modalProps,
    ...a == null ? void 0 : a.modalProps
  }, { modalSlot: c, openModal: u, closeModal: f } = dr(s(), l), v = ({ meta: y, ...w }) => ie(l.title, { meta: y, ...w }) || `${o.title ? o.title + " - " : ""}  ${ie(y.title || y.label, { meta: y, ...w })}`;
  return { modalSlot: c, methods: {
    add(y = {}) {
      const { meta: w = {}, resetData: b, index: C } = y, d = y.record ? r.value.findIndex((m) => e(m) === e(y.record)) : C;
      return w.title ?? (w.title = () => q("add")), w.name = "add", w.isNew = !0, i.resetFields(b), u({
        ...w,
        title: () => v({ ...y, resetData: b, meta: w }),
        onOk: async () => i.submit().then(async (m) => {
          var x;
          return await ((x = a == null ? void 0 : a.onSave) == null ? void 0 : x.call(a, { ...y, source: m, meta: w })) === !1 ? !1 : n.onSave(m, d === -1 ? void 0 : d);
        }),
        onCancel: async () => {
          var m;
          return await ((m = a == null ? void 0 : a.onCancel) == null ? void 0 : m.call(a, { ...y, meta: w })) === !1 ? !1 : f();
        }
      });
    },
    async edit(y) {
      var w, b;
      const { record: C, selectedRows: d, resetData: m, meta: x = {} } = y, O = C || d[0];
      if (!O)
        return Promise.reject(new Error(q("recordNotSelected")));
      const A = await ((b = (w = t.apis) == null ? void 0 : w.info) == null ? void 0 : b.call(w, e(O), O)), T = yt({}, O, A, m);
      return i.resetFields(T), Xe(x, { name: "edit", title: () => q("editTitle"), isNew: !1 }), u({
        ...x,
        title: () => v({ ...y, source: T, meta: x }),
        onOk: async () => i.submit().then(async (p) => {
          var g;
          return await ((g = a == null ? void 0 : a.onSave) == null ? void 0 : g.call(a, { ...y, source: p, meta: x })) === !1 ? !1 : n.onUpdate(p, O);
        }),
        onCancel: async () => {
          var p;
          return await ((p = a == null ? void 0 : a.onCancel) == null ? void 0 : p.call(a, { ...y, meta: x })) === !1 ? !1 : f();
        }
      });
    },
    delete({ record: y, selectedRows: w }) {
      const b = y ? [y] : w;
      return n.onDelete(b);
    }
  } };
}
function _m({
  model: e,
  orgList: t,
  editableRef: n,
  rowKey: r
}) {
  const {
    modelsMap: a
  } = e.listData, o = ye(e, "propChain", []), s = /* @__PURE__ */ new WeakMap(), i = (f, v) => {
    const h = pe(f), y = [...o.value, v];
    let w = s.get(h);
    if (w)
      zt(w.model, y, v);
    else {
      const {
        modelsMap: b,
        rootModels: C
      } = zo(pe(a), f, o.value, v);
      w = {
        key: Symbol(),
        modelsMap: b,
        model: V({
          children: C,
          index: v,
          propChain: y
        })
      }, s.set(h, w);
    }
    return w;
  };
  X([() => [...t.value], () => [...o.value]], ([f]) => {
    f.forEach(i);
  }, {
    immediate: !0,
    flush: "sync"
  });
  const l = {
    add({
      index: f,
      record: v,
      resetData: h
    } = {}) {
      const y = {
        ...h
      }, w = v ? t.value.findIndex((b) => r(b) === r(v)) : f;
      if (w !== void 0) {
        if (!t.value[w])
          throw new Error(q("insertPositionInvalid"));
        t.value.splice(w + 1, 0, y);
      } else
        t.value.push(y);
    }
    // delete({ record }) {
    //   const orgIdx = orgList.value.indexOf(record)
    //   orgList.value.splice(orgIdx, 1)
    // },
  }, c = /* @__PURE__ */ ce({
    inheritAttrs: !1,
    props: {
      option: {
        type: Object,
        required: !0
      }
    },
    setup({
      option: f
    }, v) {
      const {
        record: h
      } = v.attrs, y = K(() => s.get(pe(h)).modelsMap.get(f)), {
        index: w,
        parent: b,
        refData: C
      } = Je(y.value), d = ke({
        current: b,
        value: C,
        list: t,
        record: h,
        index: w
      }), {
        editable: m = !0
      } = f, {
        attrs: x,
        hidden: O,
        nativeAttrs: A,
        disabled: T
      } = Fe({
        option: f,
        effectData: d
      }), p = K(() => !O.value && n.value && (Ye(m) ? m(d) : m)), g = gn(f, y.value, d, x, {
        attrs: A,
        disabled: T
      }), S = Wt(f, V({
        ...Je(d),
        isView: !0
      })), _ = Bt(y.value.rules, d), P = _ && K(() => oe(x.disabled) ? void 0 : _);
      return () => p.value ? Z("formItem")({
        wrapperCol: {},
        name: y.value.propChain,
        rules: P == null ? void 0 : P.value,
        class: "sup-table-edit-item"
      }, {
        default: g
      }) : S ? S() : C.value;
    }
  });
  return {
    list: t,
    methods: l,
    getEditRender: (f) => {
      if (fr(f.type) === "enhanced" || Sn(f.type) || f.type === "InputSlot" && f.editable !== !1)
        return (v) => {
          const h = t.value.findIndex((w) => pe(w) === pe(v.record)), y = i(v.record, h < 0 ? v.index : h);
          return $(c, {
            key: y.key,
            option: f,
            ...v
          });
        };
    }
  };
}
const Wo = ce({
  props: {
    dataSource: Object,
    schema: Object
  },
  emits: ["register"],
  setup(e, t) {
    const n = Ve(e.schema || {}), r = H({});
    X(
      () => e.schema,
      (s) => {
        _e.schemaDiagnostics && s && qt(s, "detail", "SuperDetail"), n.value = s || {};
      },
      { immediate: !0 }
    ), X(
      () => oe(e.dataSource ?? n.value.dataSource),
      (s) => {
        s != null && (r.value = s);
      },
      { immediate: !0 }
    );
    const a = {
      setOption: (s) => {
        _e.schemaDiagnostics && qt(s, "detail", "SuperDetail"), n.value = s;
      },
      setData: (s) => {
        r.value = s;
      }
    }, o = H();
    return X(
      n,
      (s) => {
        if (!(s != null && s.subItems)) {
          o.value = void 0;
          return;
        }
        const i = St(s.subItems, r);
        o.value = i.modelsMap;
      },
      { immediate: !0 }
    ), t.expose(a), t.emit("register", a), Qe("exaProvider", Oa({ data: r })), Qe("rootSlots", t.slots), () => o.value && $(
      "div",
      { class: ["sup-detail", n.value.useSectionStyle && "sup-container"] },
      $(et, {
        option: {
          type: "Descriptions",
          ...n.value
        },
        mode: n.value.mode,
        ...n.value.attrs,
        ...n.value.descriptionsProps,
        modelsMap: o.value,
        isRoot: !0
      })
    );
  }
});
function Cm(e, t, n) {
  const r = H({}), { title: a, apis: o } = e, s = Se("rootSlots", {}), { modalProps: i, ...l } = e.detailOption || {}, c = () => e.detailOption ? $(Wo, { schema: l, dataSource: r.value }, s) : $(dm, { option: {}, modelsMap: t, source: r }), u = {
    ...ue.Modal,
    footer: null,
    ...e.modalProps,
    ...i
  }, f = (y) => ie(u.title, y) || `${a ? a + " - " : ""}${q("detailTitle")}`, { openModal: v, modalSlot: h } = Go(c, u);
  return {
    detailSlot: h,
    openDetail: async ({ record: y, selectedRows: w, meta: b = {}, ...C }) => {
      const d = y || w[0];
      if (o != null && o.info) {
        const m = await o.info(n(d), d);
        r.value = Object.assign({}, d, m);
      } else
        r.value = d;
      b.name = "detail", v({ ...b, title: () => f({ ...C, source: r.value, meta: b }) });
    }
  };
}
function xm({ option: e, model: t, orgList: n, rowKey: r, listener: a, isView: o, effectData: s }) {
  const { modelsMap: i } = t.listData, l = {
    list: n,
    modalSlot: [],
    methods: {
      delete({ record: w, selectedRows: b }) {
        const C = w ? [w] : b;
        return a.onDelete(C);
      }
    }
  }, { editable: c, rowEditor: u } = e, { editMode: f, addMode: v } = u || {};
  if (!o && c) {
    const w = K(() => Ye(c) ? c(s) : c), { methods: b, ...C } = _m({ model: t, orgList: n, editableRef: w, rowKey: r });
    Object.assign(l.methods, b), Object.assign(l, C);
  } else if (f === "inline") {
    const { list: w, methods: b, buttonMethods: C, editButtonsSlot: d, getEditRender: m, wrapTable: x } = wm({
      childrenMap: i,
      orgList: n,
      listener: a,
      rowEditor: u,
      rowKey: r
    });
    l.list = w, Object.assign(l.methods, b), Object.assign(l, { buttonMethods: C, editButtonsSlot: d, getEditRender: m, wrapTable: x });
  }
  if (f === "modal" || v === "modal") {
    const { modalSlot: w, methods: b } = Sm({ rowKey: r, option: e, listener: a, orgList: n });
    l.methods.edit ? (l.methods.add = b.add, l.buttonMethods || (l.buttonMethods = {}), l.buttonMethods.add = b.add) : Object.assign(l.methods, b), l.modalSlot.push(w);
  }
  const { detailSlot: h, openDetail: y } = Cm(e, i, r);
  return l.modalSlot.push(h), l.methods.detail = y, l;
}
const Am = ce({
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
  inheritAttrs: !1,
  setup(e, { attrs: t, slots: n, emit: r }) {
    const { optionsRef: a } = bn(e.options, e.effectData), o = H(e.activeKey ?? e.defaultActiveKey), s = (m) => {
      o.value = m, r("update:activeKey", m);
    }, {
      default: i,
      extra: l,
      rightExtra: c,
      tabBarExtraContent: u,
      tabBarExtra: f,
      title: v,
      titleBar: h,
      ...y
    } = n, w = Ot(e.slots, e.effectData), b = f || c || u, C = K(() => {
      var m;
      const x = a.value.map(({ value: O, label: A, ...T }) => ({
        ...T,
        key: T.key ?? O,
        tab: T.tab ?? A
      }));
      return o.value === void 0 && s((m = x[0]) == null ? void 0 : m.key), x;
    }), d = (m) => ie(w.customTab || e.customTab || m.tab, {
      ...e.effectData,
      item: m
    });
    return () => [
      !e.bordered && v ? h == null ? void 0 : h() : null,
      Z("tableFilter")(
        {
          bordered: e.bordered,
          items: C.value.map((m) => ({
            ...m,
            tab: d(m)
          })),
          value: o.value,
          onValueChange: s,
          attrs: t
        },
        {
          ...y,
          ...w,
          default: i,
          title: v,
          tabExtra: b || (v ? void 0 : l),
          cardExtra: b || v ? l : void 0
        }
      )
    ];
  }
}), Om = ce({
  props: {
    option: { type: Object, required: !0 },
    effectData: { type: Object, required: !0 }
  },
  setup(e) {
    const t = e.option, { field: n, editable: r } = e.option, a = V({});
    X(
      () => e.effectData,
      (b) => Object.assign(a, b),
      { immediate: !0 }
    );
    const o = n.split(".").slice(0, -1), s = K(() => je(a.record, o)), i = K({
      get: () => je(a.record, n),
      set: (b) => Ut(a.record, n, b)
    }), l = { parent: s, refData: i }, { attrs: c, hidden: u, nativeAttrs: f, disabled: v } = Fe({
      option: t,
      effectData: { ...a, inTable: !0 }
    }), h = gn(t, l, a, c, { attrs: f, disabled: v }), y = K(() => Ye(r) ? r(a) : oe(r)), w = Wt(t, a);
    return () => u.value ? "" : y.value ? $("div", { class: "editable-cell" }, h()) : w ? w() : i.value;
  }
}), $m = (e) => {
  if (!e.editable)
    return;
  const t = _e.buttonRoles && _e.buttonRoles() || [];
  if ((!e.roleName || t.includes(e.roleName)) && (fr(e.type) === "enhanced" || Sn(e.type) || e.type === "InputSlot"))
    return (r) => $(Om, { option: e, effectData: { ...r } });
};
function Tm({
  childrenMap: e,
  context: t,
  option: n,
  attrs: r,
  isView: a,
  effectData: o
}) {
  var s;
  const { methods: i, buttonMethods: l, getEditRender: c, editButtonsSlot: u } = t, f = ke({ list: o.value, isView: a, parent: o }), v = ((s = n.rowEditor) == null ? void 0 : s.editMode) !== "modal", h = function b(C = e) {
    const d = [];
    return [...C].forEach(([m, x]) => {
      var O, A;
      if (m.type === "Hidden" || m.hidden === !0 || (O = m.exclude) != null && O.includes("table"))
        return;
      const T = $t(m, f);
      if (x.children) {
        const p = b(x.children);
        m.ignoreTableTitle ? d.push(...p) : d.push({
          title: T,
          children: p
        });
      } else {
        const p = {
          title: T,
          key: m.field || m.label,
          dataIndex: x.propChain.length > 1 ? x.propChain : x.propChain[0]
        };
        m.options || m.type === "Switch" || (A = m.type) != null && A.includes("Picker") ? p.align = "center" : m.type === "InputNumber" && (p.align = "right"), Object.assign(p, m.columnProps), Xe(p, n.columnProps, ue.Column);
        const g = p.customRender || Wt(m) || void 0, S = c ? c(m, g) : v ? $m(m) : void 0;
        p.customRender = Mm(g, S, f), d.push(p);
      }
    }), d;
  }(), y = Pm(n, r);
  y && h.unshift(y);
  const w = Dm({
    buttons: n.rowButtons,
    // 行内编辑需要覆盖新增/编辑/删除的禁用状态，但不能丢失详情等通用动作。
    methods: { ...i || {}, ...l || {} },
    editButtonsSlot: u,
    isView: a,
    effectData: f
  });
  return w && (Xe(w, n.columnProps, ue.Column), h.push(w)), h;
}
function Mm(e, t, n) {
  if (t || e) {
    const r = (a) => {
      const o = (t == null ? void 0 : t(a)) ?? (e == null ? void 0 : e({ ...a, isView: !0 })) ?? String(a.text ?? "");
      return o && typeof o == "string" && a.column.ellipsis ? $("span", { title: o }, o) : o;
    };
    return (a) => $(r, { ...n, ...a, current: a.record });
  } else
    return ({ text: r }) => String(r ?? "");
}
function Dm({ buttons: e, methods: t, editButtonsSlot: n, isView: r, effectData: a }) {
  const o = yn(ue.rowButtons || {}, e), { columnProps: s, ...i } = o, l = hn({ config: i, methods: t, isView: r });
  if (!l)
    return;
  const c = (u) => (n == null ? void 0 : n(u, i)) || l({ key: u.record, effectData: u });
  return {
    title: () => q("actionColumn"),
    key: "action",
    fixed: "right",
    minWidth: 100,
    // width: 100,
    align: "center",
    resizable: !1,
    ...s,
    customRender: (u) => $(c, { ...a, ...u, current: u.record })
  };
}
const Pm = (e, t) => {
  var n, r, a;
  const o = e.indexColumn ?? ((n = ue.Table) == null ? void 0 : n.indexColumn);
  if (!o)
    return;
  const { dataPagination: s } = Se("exaProvider", {}), i = {
    current: ((r = t.pagination) == null ? void 0 : r.current) || 1,
    pageSize: ((a = t.pagination) == null ? void 0 : a.pageSize) || 10
  };
  return {
    key: "INDEX",
    title: () => q("indexColumn"),
    width: 60,
    align: "center",
    customRender: ({ index: l }) => {
      var c;
      const u = t.pagination && ((c = e.apis) != null && c.query) && s ? s.value ?? i : t.pagination;
      return (((u == null ? void 0 : u.current) || 1) - 1) * ((u == null ? void 0 : u.pageSize) || 10) + l + 1;
    },
    ...Be(o) && o
  };
}, Im = ce({
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
    var i, l, c;
    const u = ((i = e.rowEditor) == null ? void 0 : i.editMode) === "inline", f = s.attrs, v = ue.Table || {}, h = /* @__PURE__ */ new WeakMap(), y = f.rowKey || v.rowKey || "id", w = (j) => {
      const F = typeof y == "function" ? y(j) : j[y];
      if (F != null)
        return F;
      const N = pe(j);
      return h.has(N) || h.set(N, gt(12)), h.get(N);
    }, b = ye(t, "refData"), C = (((l = e.attrs) == null ? void 0 : l.rowSelection) ?? v.rowSelection) || void 0, d = C == null ? void 0 : C.selectedRowKeys, m = rt(d) ? d : H(d || []), x = H([]), {
      selectedRowKeys: O,
      onChange: A,
      getCheckboxProps: T,
      ...p
    } = C || {}, g = C && {
      attrs: {
        fixed: !0,
        ...p
      },
      onChange: (j, F, N) => {
        var te;
        if (C != null && C.preserveSelectedRowKeys) {
          const ae = _(), me = x.value.filter((Ne) => !ae.has(w(Ne))), Te = new Map([...me, ...F].map((Ne) => [w(Ne), Ne]));
          j = [.../* @__PURE__ */ new Set([...me.map(w), ...j])], F = j.map((Ne) => Te.get(Ne)).filter(Boolean);
        }
        j.length === m.value.length && j.every((ae, me) => ae === m.value[me]) && F.length === x.value.length && F.every((ae, me) => ae === x.value[me]) || (m.value = j, x.value = F, (te = C == null ? void 0 : C.onChange) == null || te.call(C, j, F, N));
      },
      isRowSelectable: (j) => {
        var F, N;
        return u && !b.value.includes(j) ? !1 : !((N = (F = C == null ? void 0 : C.getCheckboxProps) == null ? void 0 : F.call(C, j)) != null && N.disabled);
      }
    }, S = f.childrenColumnName || v.childrenColumnName || "children", _ = () => {
      const j = /* @__PURE__ */ new Map(), F = (N) => N.forEach((te) => {
        j.set(w(te), te), Array.isArray(te[S]) && F(te[S]);
      });
      return F(b.value), j;
    };
    X(
      () => [_(), [...m.value]],
      ([j, F]) => {
        var N;
        const te = C == null ? void 0 : C.preserveSelectedRowKeys, ae = te ? [...F] : F.filter((Ie) => j.has(Ie)), me = new Map(x.value.map((Ie) => [w(Ie), Ie])), Te = ae.map((Ie) => j.get(Ie) ?? (te ? me.get(Ie) : void 0)).filter((Ie) => !!Ie);
        (ae.length !== F.length || Te.length !== x.value.length || Te.some((Ie, os) => Ie !== x.value[os])) && (x.value = Te, ae.length !== F.length && (m.value = ae), (N = C == null ? void 0 : C.onChange) == null || N.call(C, ae, Te, { type: "none" }));
      },
      { immediate: !0 }
    );
    const P = (j, F = 0, N = 1) => {
      const te = [], ae = F === N;
      return j.forEach((me) => {
        me[S] && (te.push(w(me)), ae || te.push(...P(me[S], F, N + 1)));
      }), te;
    }, k = H(((c = e.attrs) == null ? void 0 : c.expandedRowKeys) ?? v.expandedRowKeys ?? []), R = (j) => {
      k.value = j, s.emit("expandedRowsChange", j);
    };
    (o.defaultExpandLevel || (f.defaultExpandAllRows ?? v.defaultExpandAllRows)) && X(
      b,
      (j, F) => {
        j.length && !(F != null && F.length) && R(P(j, Number(o.defaultExpandLevel)));
      },
      { immediate: !0 }
    );
    const I = xm({
      option: e,
      model: t,
      orgList: b,
      rowKey: w,
      listener: {
        async onSave(j, F) {
          var N;
          if ((N = e.apis) != null && N.save) {
            await e.apis.save(j), j.parentId && (k.value = [...k.value, j.parentId]), n == null || n();
            return;
          }
          F !== void 0 ? b.value.splice(F + 1, 0, j) : b.value.push(j);
        },
        async onUpdate(j, F) {
          var N;
          (N = e.apis) != null && N.update && await e.apis.update(j), Object.assign(F, j), n == null || n();
        },
        async onDelete(j) {
          var F, N;
          const te = j.map((ae) => w(ae));
          try {
            await ((N = (F = e.apis) == null ? void 0 : F.delete) == null ? void 0 : N.call(F, te, j));
          } catch (ae) {
            return console.error(ae), ae;
          }
          return g && (m.value = m.value.filter((ae) => !te.includes(ae)), x.value = x.value.filter((ae) => !te.includes(w(ae)))), j.forEach((ae) => {
            const me = w(ae), Te = b.value.findIndex((Ne) => Ne === ae || w(Ne) === me);
            Te !== -1 && b.value.splice(Te, 1);
          }), n == null ? void 0 : n();
        }
      },
      isView: a,
      effectData: r
    }), E = Tm({
      childrenMap: t.listData.modelsMap,
      context: I,
      option: e,
      attrs: f,
      isView: a,
      effectData: r
    }), { list: D, methods: B, buttonMethods: U = B, modalSlot: W } = I, ee = {
      selectedRowKeys: m,
      selectedRows: x,
      setSelectedRows: (j) => {
        x.value = j, m.value = j.map((F) => w(F));
      },
      expandedRowKeys: k,
      setExpandedRowKeys: R,
      expandAll: () => {
        R(P(b.value));
      },
      add: (j) => {
        var F;
        return (F = B.add) == null ? void 0 : F.call(B, j);
      },
      edit: (j) => {
        var F;
        return (F = B.edit) == null ? void 0 : F.call(B, { ...Q, ...j });
      },
      delete: () => {
        var j;
        return (j = B.delete) == null ? void 0 : j.call(B, Q);
      },
      detail: (j) => {
        var F;
        return (F = B.detail) == null ? void 0 : F.call(B, { ...Q, ...j });
      }
    }, z = V({ ...ee }), G = H();
    X(
      G,
      (j) => {
        Object.assign(z, j, ee), s.emit("register", z);
      },
      { flush: "sync" }
    );
    const Q = V({
      ...r,
      selectedRows: x,
      selectedRowKeys: m,
      tableRef: z
    }), se = { ...s.slots }, le = e.buttons, he = (le == null ? void 0 : le.targetSlot) ?? "extra";
    if (le) {
      const j = se[he], F = hn({
        config: le,
        effectData: Q,
        methods: U,
        isView: a
      });
      (j || F) && (se[he] = () => [j == null ? void 0 : j(), F == null ? void 0 : F()]);
    }
    const ve = e.title || e.label, { title: J = ve, extra: re, ...Ce } = se, L = (J || re) && (() => Z("row")(
      { align: "middle", class: "sup-titlebar" },
      {
        default: () => [
          J && Z("col")(
            // 显式使用内容宽度，避免 Element Plus 的默认 24 栅格将按钮挤到下一行。
            { class: "sup-title", flex: "0 1 auto" },
            {
              default: $t({ labelSlot: J, tooltip: e.tooltip }, r)
            }
          ),
          re && Z("col")(
            {
              class: "sup-title-buttons",
              flex: 1,
              style: { textAlign: (le == null ? void 0 : le.align) || "right" }
            },
            { default: re }
          )
        ]
      }
    ));
    Ce.headerCell = (j) => {
      var F;
      return ((F = se.headerCell) == null ? void 0 : F.call(se, j)) || ie(j.title, r);
    };
    const Y = () => {
      const { rowSelection: j, expandedRowKeys: F, ...N } = f;
      return [
        ...W.map((te) => te()),
        (I.wrapTable || ((te) => te()))(
          () => Z("table")(
            {
              tableLayout: "fixed",
              pagination: !1,
              ...ue.Table,
              ref: G,
              data: D.value,
              columns: V(E),
              ...N,
              selection: g && {
                ...g,
                selectedKeys: m.value
              },
              rowKey: w,
              expandedKeys: k.value,
              onExpandedChange: R,
              class: ["sup-table-wrapper", e.editable && "sup-table-editable"]
            },
            Ce
          )
        )
      ];
    };
    return e.tabs ? () => $(Am, { ...e.tabs, effectData: r }, {
      [he]: se[he],
      title: J && (() => ie(J, r)),
      extra: re,
      titleBar: L,
      default: Y
    }) : () => [L == null ? void 0 : L(), Y()];
  }
}), Rm = /* @__PURE__ */ ce({
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
    const a = e.option.title || e.option.label, o = [...e.model.children].map(([i, l], c) => {
      const u = ke({
        parent: e.effectData,
        current: ye(e.model, "parent"),
        field: l.refName,
        value: l.refData
      }), {
        hidden: f,
        attrs: {
          disabled: v,
          ...h
        }
      } = Fe({
        option: i,
        effectData: u
      }), {
        key: y,
        field: w
      } = i;
      return {
        attrs: V(h),
        option: i,
        effectData: u,
        model: l,
        header: () => [ie(i.icon, u), ie(i.label, u)],
        key: y || w || String(c),
        hidden: f,
        disabled: v
      };
    }), s = H(e.option.activeKey || ((r = o[0]) == null ? void 0 : r.key));
    return () => Z("collapse")({
      attrs: t,
      slots: n,
      content: n.default,
      title: n.title || (a ? () => ie(a, e.effectData) : void 0),
      activeKeys: s.value,
      onActiveChange: (i) => {
        s.value = i;
      },
      items: o.filter(({
        hidden: i
      }) => !i.value).map(({
        attrs: i,
        option: l,
        disabled: c,
        model: u,
        header: f,
        effectData: v,
        key: h
      }) => ({
        key: h,
        attrs: i,
        title: f,
        disabled: oe(c),
        extra: !e.isView && l.buttons ? () => $(qe, {
          option: l.buttons,
          effectData: v
        }) : void 0,
        content: () => e.isView ? $(et, {
          option: l,
          modelsMap: u.children,
          effectData: v
        }) : $(Ke, {
          option: l,
          model: u,
          effectData: v
        })
      }))
    });
  }
}), Em = /* @__PURE__ */ ce({
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
    }, o = () => Z("preview")({
      images: r.images,
      visible: r.visible,
      current: r.current,
      width: r.width,
      height: r.height,
      "onUpdate:visible": a
    });
    return (s, i) => (Ue(), bt(o));
  }
});
function jm(e) {
  const t = H(!1), n = V({
    visible: t,
    images: [],
    "onUpdate:value": (l) => t.value = l,
    ...e
  }), r = H(!1), a = () => !r.value && $(Em, n), o = Aa();
  Vn(() => {
    r.value = !0;
  });
  let s;
  return { open: (l) => {
    if (typeof l == "string")
      n.images = [l];
    else if (Array.isArray(l))
      n.images = [...l];
    else {
      const { src: c, ...u } = l || {};
      c && (n.images = [c]), Object.assign(n, u);
    }
    if (!s) {
      const c = document.createElement("div");
      s = $a(a, { appContext: o == null ? void 0 : o.appContext }), s.appContext = o == null ? void 0 : o.appContext, Pn(s, c);
    }
    ze(() => t.value = !0);
  } };
}
function Fm(e, t) {
  return new Promise((n, r) => {
    const a = new FileReader();
    t === "text" ? a.readAsText(e) : a.readAsDataURL(e), a.onload = () => n({ result: a.result, file: e }), a.onerror = (o) => r(o);
  });
}
function Lm(e, t, n) {
  const r = typeof n < "u" ? [n, e] : [e], a = new Blob(r, { type: "application/octet-stream" }), o = window.URL.createObjectURL(a), s = document.createElement("a");
  s.style.display = "none", s.href = o, s.setAttribute("download", t), typeof s.download > "u" && s.setAttribute("target", "_blank"), document.body.appendChild(s), s.click(), document.body.removeChild(s), window.URL.revokeObjectURL(o);
}
function km(e, t) {
  var n, r;
  const a = ((n = e.name) == null ? void 0 : n.toLowerCase()) || "", o = ((r = e.type) == null ? void 0 : r.toLowerCase()) || "";
  return t.split(",").some((s) => {
    const i = s.trim().toLowerCase();
    return i ? i.startsWith(".") ? a.endsWith(i) : i.endsWith("/*") ? o.startsWith(i.slice(0, -1)) : o === i : !1;
  });
}
function Nm(e) {
  const { mode: t, valueKey: n, infoNames: r, maxCount: a, accept: o, minSize: s, maxSize: i, repeatable: l } = e, c = {
    ...n && { [n]: n },
    uid: "uid",
    status: "status",
    url: "url",
    name: "name",
    ...r
  };
  t === "custom" && (c.file = "file");
  const u = /* @__PURE__ */ new Map(), f = /* @__PURE__ */ new Map(), v = /* @__PURE__ */ new Map();
  return {
    clearTask: (A) => {
      u.delete(A), f.delete(A);
    },
    convertInfo: (A) => {
      const T = { status: "done", ...A };
      return Object.entries(c).forEach(([p, g]) => {
        g && g !== p && g in T && (T[p] = T[g], delete T[g]);
      }), T;
    },
    getValue: (A, T) => {
      if (T) {
        const p = A[0];
        return n ? (p == null ? void 0 : p[n]) ?? (p == null ? void 0 : p[c.uid]) : p;
      }
      return n ? A.map((p) => p[n] ?? p[c.uid]) : A;
    },
    hasPendingWork: (A) => v.size > 0 || t === "auto" && A.some((T) => T.status === "uploading") || (t === "base64" || t === "text") && A.some((T) => T.status !== "done") || t === "submit" && A.some((T) => T.status !== "done"),
    queueDelete: (A, T) => v.set(A, T),
    reconvert: (A) => {
      const T = {};
      return Object.entries(c).forEach(([p, g]) => {
        const S = A[p];
        g && S !== void 0 && (T[g] = S);
      }), T;
    },
    registerRequest: (A, T) => {
      if (t === "auto" || t === "base64" || t === "text") {
        const p = T();
        return u.set(A, p), p.catch(() => {
        }), p;
      }
      t === "submit" && f.set(A, T);
    },
    submit: async (A) => {
      let T = Promise.resolve();
      if (t === "auto" || t === "base64" || t === "text") {
        const S = A.find((_) => _.status === "error");
        if (S)
          throw S.error || S.response || { message: q("fileProcessFailed") };
        T = Promise.all(u.values());
      } else if (t === "submit") {
        const S = A.filter((_) => _.status !== "done").map((_) => {
          var P;
          return _.status = "uploading", (P = f.get(_.uid)) == null ? void 0 : P();
        }).filter(Boolean);
        T = Promise.all(S);
      }
      const p = await T, g = [...v.values()];
      return v.clear(), await Promise.all(g.map(async (S) => {
        try {
          await S();
        } catch (_) {
          console.error(_);
        }
      })), p;
    },
    validate: (A, T, p) => {
      if (a > 1 && p.length + T.indexOf(A) >= a)
        return q("fileCount", { maxCount: a });
      if (o && !km(A, o))
        return q("fileType");
      if (s || i) {
        const g = (A.size || 0) / 1024 / 1024;
        if (s && s > g)
          return q("fileMinSize", { minSize: s });
        if (i && i < g)
          return q("fileMaxSize", { maxSize: i });
      }
      if (!l) {
        const g = p.find((S) => S.name === A.name);
        if (g)
          return q("fileDuplicate", { name: g.name });
      }
    }
  };
}
const Um = /* @__PURE__ */ new Set(["png", "jpg", "jpeg", "gif", "webp", "svg", "tif", "tiff"]);
function Bm(e) {
  var t, n, r, a, o;
  if (e.thumbUrl)
    return !0;
  if (e.url || e.file) {
    const s = (n = (t = e.name || e.url) == null ? void 0 : t.split(/[?#]/)[0].match(/\.([^.\/\\]+)$/)) == null ? void 0 : n[1].toLowerCase();
    if (s && Um.has(s))
      return !0;
    {
      const i = e.type || ((r = e.file) == null ? void 0 : r.type) || ((o = (a = e.url) == null ? void 0 : a.match(/^data:(\S*?);/)) == null ? void 0 : o[1]);
      return i == null ? void 0 : i.startsWith("image");
    }
  }
}
function la(e, t) {
  const n = xe("services").info({
    title: e,
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
      icon: () => it("error"),
      okButtonProps: {
        loading: !1
      },
      type: "error",
      title: a,
      content: o == null ? void 0 : o.message
    });
  }, ...n };
}
let zm = 0;
const qm = ce({
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
      infoNames: i,
      repeatable: l,
      onPreview: c,
      onDownload: u,
      isImage: f = Bm,
      hideOnMax: v,
      valueKey: h
    } = e, y = (a ? 1 : e.maxCount) || 1 / 0, { accept: w } = t.attrs, b = Nm({
      mode: n,
      valueKey: h,
      infoNames: i,
      maxCount: y,
      accept: w,
      minSize: o,
      maxSize: s,
      repeatable: l
    }), C = jm(), { convertInfo: d, reconvert: m } = b, { onSubmit: x } = Se("exaProvider", {}), O = H([]), A = /* @__PURE__ */ new Set();
    let T = !1;
    mr(() => {
      T = !0, A.forEach((L) => URL.revokeObjectURL(L));
    }), X(O, (L, Y) => {
      const j = new Set(L.map((N) => N.uid));
      Y.forEach((N) => {
        j.has(N.uid) || b.clearTask(N.uid);
      });
      const F = new Set(L.map((N) => N.objectUrl));
      A.forEach((N) => {
        F.has(N) || (URL.revokeObjectURL(N), A.delete(N));
      });
    });
    const p = Ve([]), g = Ve(), S = (L) => {
      p.value = L.map(m), e.isView || (t.emit("update:fileList", p.value), _()), O.value = L;
    }, _ = () => {
      g.value = b.getValue(pe(p.value), !!e.isSingle), t.emit("update:value", g.value);
    };
    X(
      () => pe(e.value),
      (L) => {
        if (L !== g.value)
          if (g.value = L, !L)
            O.value = [];
          else {
            const Y = $e(L) ? L : [L];
            p.value = h ? Y.map((j) => ({ [h]: j })) : Y, O.value = p.value.map(d);
          }
      },
      { immediate: !0, flush: "sync" }
    ), X(
      () => pe(e.fileList),
      (L) => {
        if (L && L !== p.value) {
          const Y = L.map(d);
          S(Y);
        }
      },
      { immediate: !0 }
    );
    const P = H(!1), k = x == null ? void 0 : x(async () => {
      if (await R, P.value = b.hasPendingWork(O.value), P.value) {
        const L = la(() => q("uploadSync"));
        return b.submit(O.value).then((Y) => (L.destroy(), Y)).catch((Y) => {
          throw P.value = !1, L.setError(() => q("uploadFailed"), Y), Y;
        }).finally(() => P.value = !1);
      }
      return b.submit(O.value);
    });
    k && mr(k);
    let R = Promise.resolve();
    const M = (L) => {
      const Y = R.then(async () => {
        var j, F;
        if (T || e.isView || e.disabled || await ((j = e.beforeSelect) == null ? void 0 : j.call(e, L)) === !1 || T || e.isView || e.disabled)
          return;
        const N = {
          uid: `upload-${Date.now()}-${++zm}`,
          file: L,
          name: L.name,
          type: L.type,
          size: L.size,
          status: n === "auto" || n === "base64" || n === "text" ? "uploading" : "waiting"
        }, te = b.validate(N, [N], O.value);
        if (te) {
          xe("services").message("error", te);
          return;
        }
        f(N) && (N.objectUrl = URL.createObjectURL(L), A.add(N.objectUrl)), (y === 1 ? O.value : []).forEach((me) => {
          if (b.clearTask(me.uid), me.status === "done" && r.delete) {
            const Te = m(me);
            b.queueDelete(Te, () => r.delete(Te));
          }
        }), S(y === 1 ? [N] : [...O.value, N]), n === "base64" || n === "text" ? b.registerRequest(N.uid, () => Fm(L, n).then(
          ({ result: me }) => E({ url: me }, N),
          (me) => I(me, N)
        )) : n !== "custom" && b.registerRequest(N.uid, () => D(N)), (F = e.onChange) == null || F.call(e, { file: N, fileList: [...O.value] });
      }).catch((j) => {
        xe("services").message("error", (j == null ? void 0 : j.message) || q("selectFailed"));
      });
      return R = Y, Y;
    }, I = (L, Y) => {
      var j;
      const F = O.value.find((N) => N.uid === Y.uid);
      if (!(T || !F))
        return Object.assign(F, { error: L, status: "error" }), S([...O.value]), (j = e.onChange) == null || j.call(e, { file: F, fileList: [...O.value] }), Promise.reject(L);
    }, E = (L, Y) => {
      var j;
      const F = O.value.find((N) => N.uid === Y.uid);
      if (!(T || !F))
        return Object.assign(F, d(L), { status: "done" }), S([...O.value]), (j = e.onChange) == null || j.call(e, { file: F, fileList: [...O.value] }), L;
    }, D = (L) => {
      if (!r.upload)
        return Promise.resolve().then(() => I(Error("Api config error"), L));
      const Y = new FormData();
      Y.append(t.attrs.name || "file", L.file);
      const j = (F) => {
        F.total > 0 && (F.percent = F.loaded / F.total * 100);
        const N = O.value.find((te) => te.uid === L.uid);
        !T && N && (N.percent = F.percent);
      };
      return Promise.resolve().then(() => r.upload(Y, { onUploadProgress: j })).then(
        (F) => E(F, L),
        (F) => I(F, L)
      );
    }, B = async (L) => {
      var Y;
      if (e.isView || e.disabled)
        return !1;
      let j = await ((Y = e.beforeRemove) == null ? void 0 : Y.call(e, L));
      return j !== !1 && r.delete && L.status === "done" ? new Promise((F) => {
        const N = xe("services").confirm({
          title: () => q("deleteFileConfirm"),
          closable: !1,
          maskClosable: !1,
          ...ue.Modal,
          onOk() {
            const te = m(L), ae = () => r.delete(te);
            if (n === "submit")
              b.queueDelete(te, ae), F(!0);
            else
              return N.update({
                okCancel: !1,
                title: () => q("deletingFile")
              }), ae().then(F, () => (N.update({
                okCancel: !1,
                title: () => q("deleteFileFailed"),
                type: "error",
                onOk: void 0
              }), F(!1), Promise.reject()));
          },
          onCancel() {
            F(!1);
          }
        });
      }) : j;
    }, U = /* @__PURE__ */ new Set(), W = async (L) => {
      var Y;
      if (!(e.isView || e.disabled || !e.removable || U.has(L.uid))) {
        U.add(L.uid);
        try {
          if (await B(L) === !1 || T)
            return;
          b.clearTask(L.uid), S(O.value.filter((j) => j.uid !== L.uid)), (Y = e.onChange) == null || Y.call(e, { file: L, fileList: [...O.value] });
        } catch (j) {
          xe("services").message("error", (j == null ? void 0 : j.message) || q("deleteFileFailed"));
        } finally {
          U.delete(L.uid);
        }
      }
    }, ee = H(!1), z = K(() => e.downloadable ?? !!(u || r.download)), G = (L) => {
      if (z.value) {
        if (u)
          return u(L);
        if (r.download && !ee.value) {
          ee.value = !0;
          const Y = la(() => q("downloadingFile"));
          return Promise.resolve().then(() => r.download(m(L))).then((j) => Lm(j, L.name)).then(() => Y.destroy()).catch((j) => {
            Y.setError(() => q("downloadFileFailed"), j);
          }).finally(() => ee.value = !1);
        }
      }
    }, Q = async (L) => {
      if (e.previewable)
        if (c) {
          const Y = await c(m(L));
          Y && C.open(Y);
        } else if (f(L)) {
          let Y = -1;
          const j = O.value.filter((F) => f(F)).map((F, N) => {
            F.uid === L.uid && (Y = N);
            const te = F.url || F.thumbUrl;
            return !te && !F.objectUrl && F.file && (F.objectUrl = window.URL.createObjectURL(F.file), A.add(F.objectUrl)), te || F.objectUrl;
          });
          j[Y] ? C.open({ images: j, current: Y }) : G(L);
        } else
          G(L);
    }, se = e.title, le = () => typeof e.title == "string" ? e.title : q("upload"), he = V({ ...pe(e.effectData), fileList: O }), ve = Ye(se) && (() => se(he)), J = K(() => {
      const L = [];
      return w && L.push(q("fileFormats", { accept: w })), s && L.push(q("fileSizeTip", { maxSize: s })), e.tip ?? L.join(", ");
    }), re = K(() => e.disabled || e.isView), Ce = K(() => v && y && O.value.length >= y);
    return () => Z("upload")({
      attrs: t.attrs,
      files: O.value,
      readonly: re.value,
      showList: e.showList,
      removable: e.removable && !re.value,
      downloadable: z.value,
      previewable: e.previewable,
      hideTrigger: re.value || !!Ce.value,
      title: () => ve ? ve() : le(),
      tip: J.value,
      select: M,
      remove: W,
      preview: Q,
      download: G,
      isImage: (L) => !!f(L)
    }, {
      ...t.slots,
      ...t.slots.default && { default: () => {
        var L, Y;
        return (Y = (L = t.slots).default) == null ? void 0 : Y.call(L, he);
      } }
    });
  }
}), Hm = { class: "sup-tag-input-group" }, Vm = {
  key: 0,
  class: "sup-tag-input-editor"
}, Km = /* @__PURE__ */ ce({
  inheritAttrs: !1,
  __name: "TagInput",
  props: {
    option: {},
    model: {},
    effectData: {},
    value: {},
    stringifyValue: { type: Boolean },
    newLabel: { default: "" },
    isView: { type: Boolean },
    closable: { type: Boolean, default: !0 }
  },
  emits: ["update:value"],
  setup(e, { emit: t }) {
    const n = e, r = t, a = H(), o = H(""), s = H(!1), i = K(() => Uo("Input")), l = () => {
      const d = i.value, m = {
        type: "Input",
        option: n.option,
        model: n.model,
        effectData: n.effectData,
        state: {},
        binding: { value: o.value, "onUpdate:value": (O) => o.value = O }
      }, x = d.getAttrs(
        {
          ref: (O) => a.value = O,
          class: "sup-tag-input",
          size: "small",
          onBlur: C,
          onKeydown: b
        },
        n.option,
        m.state
      );
      return d.render({ ...m, attrs: x, slots: {} });
    }, c = (d, m) => typeof n.closable == "function" ? n.closable(d, m) : n.closable, u = K(() => n.value ? typeof n.value == "string" ? n.value.split(",") : n.value : []), f = () => {
      s.value = !0, ze(() => {
        a.value.focus();
      });
    }, v = (d) => {
      const m = u.value.filter((x) => x !== d);
      w(m);
    }, h = ({ tag: d, index: m }) => {
      const x = Z("tag")(
        {
          removable: c(d, m),
          onRemove: () => v(d)
        },
        { default: () => d.length > 20 ? `${d.slice(0, 20)}...` : d }
      );
      return d.length > 20 ? Z("tooltip")({ title: d }, { default: () => x }) : x;
    }, y = () => Z("button")(
      { size: "small", "aria-label": q("addTag"), onClick: f, class: "sup-tag-add" },
      { default: () => [it("add"), ie(n.newLabel, n.effectData)] }
    ), w = (d) => {
      n.stringifyValue ? r("update:value", d.join(",")) : r("update:value", d);
    }, b = (d) => {
      d.key !== "Enter" || d.isComposing || d.keyCode === 229 || (d.preventDefault(), d.stopPropagation(), C());
    }, C = () => {
      o.value && u.value.indexOf(o.value) === -1 && w([...u.value, o.value]), s.value = !1, o.value = "";
    };
    return (d, m) => (Ue(), Jt("div", Hm, [
      (Ue(!0), Jt(Qs, null, Js(u.value, (x, O) => (Ue(), bt(Dt(h), {
        key: x,
        tag: x,
        index: O
      }, null, 8, ["tag", "index"]))), 128)),
      s.value ? (Ue(), Jt("span", Vm, [
        (Ue(), bt(Dt(l)))
      ])) : (Ue(), bt(Dt(y), { key: 1 }))
    ]));
  }
}), Ym = {
  key: 1,
  class: "sup-tag-select-empty"
}, Gm = /* @__PURE__ */ ce({
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
    const n = e, r = t, { optionsRef: a } = bn(n.option.options, n.effectData), o = K(() => n.option.options === void 0 ? n.options ?? [] : a.value), s = K(() => {
      const { value: u } = n, f = n.stringifyValue;
      return u === void 0 ? [] : f ? u.split(",") : Array.isArray(u) ? u : [u];
    }), i = (u, f) => {
      const v = n.multiple ? f ? [...s.value, u] : s.value.filter((h) => h !== u) : [u];
      r("check", u, f), c(v), r("change", u, v);
    }, l = () => Z("checkableTagGroup")({
      options: o.value,
      selected: s.value,
      multiple: n.multiple,
      onSelectedChange: i
    }), c = (u) => {
      n.multiple ? n.stringifyValue ? r("update:value", u.join(",")) : r("update:value", u) : r("update:value", u[0]);
    };
    return (u, f) => o.value.length ? (Ue(), bt(Dt(l), { key: 0 })) : (Ue(), Jt("div", Ym, Xs(e.placeholder), 1));
  }
}), Zo = {
  Form: Ko,
  Group: Tn,
  Card: bm,
  CardList: Mn,
  TabList: Mn,
  CollapseList: Mn,
  GroupList: gm,
  Tabs: ym,
  Table: Im,
  Collapse: Rm,
  Descriptions: Tn,
  Fragment: Tn
}, Wm = {
  InputGroup: vm,
  InputList: mm,
  Upload: qm,
  TagInput: Km,
  TagSelect: Gm
}, _t = Object.keys(Zo), Zm = {
  ...Zo,
  ...Wm
}, Zt = {}, wn = {}, rn = /* @__PURE__ */ new Set();
function Qo(e) {
  return typeof e == "object" && e && "component" in e ? e : { component: e };
}
function Jo(e, t, n, r = []) {
  const a = /* @__PURE__ */ new Set([...Ro, ...r]);
  Object.entries(t).forEach(([o, s]) => {
    if (s) {
      if (a.has(o))
        throw new Error(`Schema 类型 '${o}' 为 Core 保留类型，不能注册为 ${n} 组件`);
      e[o] = { ...Qo(s), source: n };
    }
  });
}
function Xo(e, t = []) {
  Jo(Zt, e, "custom", [...rn, ...t]);
}
function Qm(e) {
  const t = new Set(e);
  for (const n of Object.keys(Zt))
    if (t.has(n))
      throw new Error(`Schema 类型 '${n}' 已注册为项目组件，不能再由 UIAdapter 接管`);
  rn.clear(), t.forEach((n) => rn.add(n));
}
function Fb(e, t = []) {
  const n = Object.fromEntries(
    Object.entries(e).map(([o, s]) => [o, s && Qo(s).component])
  );
  ko(n, "auto");
  const r = new Set(t), a = Object.fromEntries(
    Object.entries(e).filter(([o]) => !Ro.has(o) && !r.has(o))
  );
  Jo(wn, a, "auto");
}
function an(e) {
  return Zt[e] || wn[e];
}
function Sn(e) {
  return !!an(e);
}
function Jm() {
  return [.../* @__PURE__ */ new Set([...Object.keys(Zt), ...Object.keys(wn)])];
}
function fr(e, t = []) {
  var n, r;
  return Io.includes(e) ? "core" : rn.has(e) || new Set(t).has(e) ? "enhanced" : ((n = Zt[e]) == null ? void 0 : n.source) || ((r = wn[e]) == null ? void 0 : r.source);
}
function es(e, t) {
  const { prop: n = "value", event: r = "update:value" } = e.model || {}, a = { ...t };
  if (n !== "value" && (a[n] = a.value, delete a.value), r !== "update:value") {
    const o = r.startsWith("on") ? r : `on${r[0].toUpperCase()}${r.slice(1)}`;
    a[o] = a["onUpdate:value"], delete a["onUpdate:value"];
  }
  return a;
}
const Pe = Zm, ue = {};
let ua = !1, ca;
function Xm(e) {
  if (ca) {
    Jr(e);
    return;
  }
  Qm(e.supportedFields), Jr(e), ca = e, ua || (Gt(ue, e.defaults || {}), ua = !0);
}
function eb(e) {
  return Xm(e), e;
}
function tb(e = {}) {
  const { defaultProps: t, ...n } = e;
  Object.assign(_e, n), Object.prototype.hasOwnProperty.call(e, "locale") && Rv(e.locale), t && ts(t);
}
function nb(e, t) {
  Xo({ [e]: t });
}
function rb(e) {
  Xo(e);
}
function ts(e) {
  Gt(ue, e);
}
const da = {
  useAdapter: eb,
  configure: tb,
  registerComponent: nb,
  registerComponents: rb,
  setDefaultProps: ts
};
class ab extends Error {
  constructor(t, n) {
    super(t.flatMap((r) => r.messages)[0] || q("validationFailed")), this.fields = t, this.cause = n, this.name = "FormValidationError";
  }
}
const fa = Symbol.for("superform.official-product");
function ob(e, t) {
  let n = !1;
  const r = {
    ...da,
    initialize(a = {}) {
      const o = a.components, s = Object.keys(o || {});
      if (n) {
        if (s.length || a.overrides)
          throw new Error(`SuperForm '${e}' 已初始化，不能再追加字段组件或覆盖 UI 协议`);
        return r;
      }
      const i = No(t(o), a.overrides);
      for (const u of s)
        if (!i.supportedFields.includes(u))
          throw new Error(`UIAdapter '${i.name}' 未声明字段 '${u}'，不能初始化对应 UI 组件`);
      const l = globalThis, c = l[fa];
      if (c && c !== e)
        throw new Error(`SuperForm 已初始化官方产品 '${String(c)}'，不能再初始化 '${e}'`);
      return da.useAdapter(i), l[fa] = e, n = !0, r;
    }
  };
  return r;
}
const sb = [
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
], ib = ce({
  name: "AntdvTreeSelectField",
  inheritAttrs: !1,
  props: kv,
  setup(e, { slots: t }) {
    const n = Fv("TreeSelect"), r = K(() => e.state.treeData ?? e.attrs.treeData ?? []);
    return e.option.labelField && X(
      () => [e.binding.value, r.value, e.attrs.fieldNames, e.attrs.treeNodeLabelProp],
      () => {
        var u, f;
        const a = e.attrs.fieldNames || {}, o = e.attrs.treeNodeLabelProp || a.label || "title", s = (v, h) => {
          for (const y of v) {
            if (Object.is(y[a.value || "value"], h))
              return y[o] ?? y.label ?? h;
            const w = y[a.children || "children"], b = Array.isArray(w) ? s(w, h) : void 0;
            if (b !== void 0)
              return b;
          }
        }, i = (v) => {
          if (v == null)
            return;
          const h = typeof v == "object" ? v.value : v;
          return s(r.value, h) ?? v.label ?? h;
        }, l = e.binding.value, c = Array.isArray(l) ? l.map(i) : i(l);
        Un(c, e.binding.labelValue) || (f = (u = e.binding)["onUpdate:labelValue"]) == null || f.call(u, c);
      },
      { immediate: !0, deep: !0 }
    ), () => $(n, { ...e.attrs, treeData: r.value }, t);
  }
}), lb = ir();
function ns() {
  return Uv({
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
      render: ({ slots: e, ...t }) => $(ib, t, e)
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
const Lb = ns();
function Mt(e, t, n) {
  return $(e === "row" ? ma : ba, t, n);
}
const ub = ce({
  props: { state: { type: Object, required: !0 } },
  setup(e) {
    const t = (n) => n.label ? [
      $("th", de({ class: "ant-descriptions-item-label" }, n.labelCol), [n.label()]),
      $(
        "td",
        de({ class: "ant-descriptions-item-content", colspan: n.colspan * 2 - 1 }, n.wrapperCol),
        [n.content()]
      )
    ] : [
      $(
        "td",
        de({ class: "ant-descriptions-item-content", colspan: n.colspan * 2 }, n.wrapperCol),
        [n.content()]
      )
    ];
    return () => {
      const n = e.state;
      if (n.mode === "table") {
        const a = n.layout === "vertical" ? n.rows.flatMap((o) => [
          (o.length > 1 || o[0].label) && $(
            "tr",
            { class: "ant-descriptions-row" },
            o.map(
              (s) => {
                var i;
                return $(
                  "th",
                  de({ class: "ant-descriptions-item-label", colspan: s.colspan }, s.labelCol),
                  [(i = s.label) == null ? void 0 : i.call(s)]
                );
              }
            )
          ),
          $(
            "tr",
            { class: "ant-descriptions-row" },
            o.map(
              (s) => $(
                "td",
                de({ class: "ant-descriptions-item-content", colspan: s.colspan }, s.wrapperCol),
                [s.content()]
              )
            )
          )
        ]) : n.rows.map((o) => $("tr", { class: "ant-descriptions-row" }, o.flatMap(t)));
        return $(
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
          $("div", { class: "ant-descriptions-view" }, $("table", { style: { tableLayout: n.tableLayout } }, a))
        );
      }
      const r = n.rows.map(
        (a) => Mt(
          "row",
          { class: "ant-descriptions-row", ...n.rowProps },
          {
            default: () => a.map((o) => Mt(
              "col",
              { ...o.colProps, key: o.key },
              {
                default: () => Mt(
                  "row",
                  { class: "ant-descriptions-item-container" },
                  {
                    default: () => [
                      o.label && Mt("col", de({ class: "ant-descriptions-item-label" }, o.labelCol), {
                        default: () => {
                          var s;
                          return $("label", {}, [(s = o.label) == null ? void 0 : s.call(o)]);
                        }
                      }),
                      Mt(
                        "col",
                        de({ class: "ant-descriptions-item-content" }, o.wrapperCol),
                        {
                          default: () => !o.attrs.noInput && n.mode === "form" && o.label ? $("div", { class: "sup-descriptions-item-input" }, [o.content()]) : o.content()
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
      return $(
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
        $("div", { class: "ant-descriptions-view" }, r)
      );
    };
  }
}), cb = (e) => {
  var s;
  const t = (i) => e.content ? String(i) : typeof i == "number" ? "number:" + i : /^(number:|string:)/.test(i) ? "string:" + i : i, n = new Map(e.items.map((i) => [t(i.key), i])), r = e.content ? void 0 : e.items.map((i) => {
    const { closeIcon: l, ...c } = i.attrs || {};
    return {
      ...c,
      key: t(i.key),
      label: i.title,
      content: i.content,
      disabled: i.disabled,
      closeIcon: typeof l == "function" ? l() : l
    };
  }), { tabPosition: a, ...o } = e.attrs || {};
  return $(
    ha,
    de(a === void 0 ? o : { ...o, tabPlacement: a }, {
      items: r,
      activeKey: e.activeKeys === void 0 ? void 0 : t(e.activeKeys),
      "onUpdate:activeKey": (i) => {
        var c, u;
        const l = n.get(i);
        e.content ? (c = e.onActiveChange) == null || c.call(e, i) : l && ((u = e.onActiveChange) == null || u.call(e, l.key));
      }
    }),
    {
      ...e.slots,
      rightExtra: e.extra || ((s = e.slots) == null ? void 0 : s.rightExtra),
      default: e.content
    }
  );
}, db = cb, fb = (e) => {
  const t = e.content ? void 0 : e.items.map((n) => {
    var r;
    return {
      ...n.attrs,
      key: n.key,
      // Collapse 的 items 接收节点而非插槽函数；用函数组件延迟求值，保留依赖追踪与面板懒挂载。
      label: n.title && $(n.title),
      extra: n.extra && $(n.extra),
      content: $(n.content),
      collapsible: n.disabled ? "disabled" : (r = n.attrs) == null ? void 0 : r.collapsible
    };
  });
  return [
    e.title && $("div", { class: ["sup-titlebar", "sup-title"] }, [e.title()]),
    $(
      ss,
      de(e.attrs || {}, {
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
}, pb = fb, vb = ce({
  inheritAttrs: !1,
  props: ["tableRef"],
  setup(e, { attrs: t, slots: n }) {
    const r = { filters: {}, sorters: [] };
    return () => hb({ ...t, ref: e.tableRef }, n, r);
  }
}), mb = ({ ref: e, ...t }, n = {}) => $(vb, { ...t, tableRef: e }, n), bb = (e, ...t) => {
  (Array.isArray(e) ? e : [e]).forEach((r) => r == null ? void 0 : r(...t));
}, hb = (e, t, n) => {
  const { data: r, selection: a, expandedKeys: o, onExpandedChange: s, onTableChange: i, pagination: l, ...c } = e, u = [], f = (b = []) => b.forEach((C) => {
    u.push(C), f(C.children);
  });
  f(c.columns);
  const v = (b) => {
    const C = b.dataIndex ?? b.key;
    return Array.isArray(C) ? C.join(".") : String(C ?? "");
  }, h = (b) => u.find((C) => String(C.key) === b || v(C) === b), y = (b, C, d, m) => {
    const x = {};
    Object.entries(C || {}).forEach(([g, S]) => {
      Array.isArray(S) && S.length && (x[v(h(g) || { key: g })] = [...S]);
    });
    const A = (Array.isArray(d) ? d : [d]).flatMap((g) => {
      if (!(g != null && g.order))
        return [];
      const S = v(g.column || { dataIndex: g.field, key: g.columnKey });
      return S ? [{ field: S, order: g.order === "ascend" ? "asc" : "desc" }] : [];
    }), T = (m == null ? void 0 : m.action) || "paginate";
    let p = !0;
    T === "sort" ? p = [...n.sorters, ...A].some(({ field: g }) => {
      var R, M, I;
      const S = n.sorters.findIndex((E) => E.field === g), _ = A.findIndex((E) => E.field === g), P = S !== _ || ((R = n.sorters[S]) == null ? void 0 : R.order) !== ((M = A[_]) == null ? void 0 : M.order), k = (I = h(g)) == null ? void 0 : I.sorter;
      return P && !!k && typeof k != "function" && typeof k.compare != "function";
    }) : T === "filter" && (p = [.../* @__PURE__ */ new Set([...Object.keys(n.filters), ...Object.keys(x)])].some((g) => {
      var k;
      const S = n.filters[g] || [], _ = x[g] || [];
      return (S.length !== _.length || S.some((R, M) => R !== _[M])) && typeof ((k = h(g)) == null ? void 0 : k.onFilter) != "function";
    })), Object.assign(n, { filters: x, sorters: A }), bb(i, {
      action: T,
      filters: Object.fromEntries(Object.entries(x).map(([g, S]) => [g, [...S]])),
      sorters: A.map((g) => ({ ...g })),
      // 本地条件只保留在统一事件中，不能在后续翻页或刷新时带入远程转换。
      remoteParams: {
        filters: Object.fromEntries(Object.entries(x).filter(([g]) => {
          var S;
          return typeof ((S = h(g)) == null ? void 0 : S.onFilter) != "function";
        }).map(([g, S]) => [g, [...S]])),
        sorters: A.filter(({ field: g }) => {
          var _;
          const S = (_ = h(g)) == null ? void 0 : _.sorter;
          return !!S && typeof S != "function" && typeof S.compare != "function";
        }).map((g) => ({ ...g }))
      },
      pagination: l ? { current: b.current, pageSize: b.pageSize, total: b.total } : void 0,
      remote: p
    });
  }, w = (b = []) => b.map((C) => {
    const { customRender: d, children: m, ...x } = C;
    return {
      ...x,
      ...d ? {
        // antdv-next 使用 render，Core 的 customRender 参数需要在 Adapter 边界转换。
        render: (O, A, T) => d({ text: O, record: A, index: T, column: C })
      } : {},
      ...m != null && m.length ? { children: w(m) } : {}
    };
  });
  return $(
    is,
    de({
      ...c,
      dataSource: r,
      columns: w(c.columns),
      onChange: y,
      rowSelection: a && {
        ...a.attrs,
        selectedRowKeys: a.selectedKeys,
        onChange: a.onChange,
        getCheckboxProps: a.isRowSelectable ? (b) => {
          var C;
          return {
            disabled: !((C = a.isRowSelectable) != null && C.call(a, b))
          };
        } : void 0
      },
      pagination: l && {
        ...l.attrs,
        ...l,
        attrs: void 0
      },
      expandedRowKeys: o,
      "onUpdate:expandedRowKeys": s
    }, { onChange: c.onChange }),
    t
  );
}, gb = (e, t = {}) => {
  var h;
  const { bordered: n, items: r, value: a, onValueChange: o, attrs: s = {} } = e, { tabExtra: i, cardExtra: l, ...c } = t;
  if (n)
    return $(
      ga,
      {
        tabList: r,
        activeTabKey: a,
        onTabChange: o
      },
      {
        ...c,
        customTab: ({ tab: y }) => y,
        tabBarExtraContent: i,
        extra: l
      }
    );
  const { tabPosition: u, ...f } = s;
  return [$(
    ha,
    {
      ...f,
      ...u === void 0 ? {} : { tabPlacement: u },
      activeKey: a,
      "onUpdate:activeKey": o
    },
    {
      ...c,
      default: () => r.map((y) => $(ls, { ...y, tab: () => y.tab })),
      rightExtra: i
    }
  ), (h = t.default) == null ? void 0 : h.call(t)];
}, yb = {
  table: ".ant-table",
  title: ".ant-table-title",
  header: ".ant-table-thead",
  footer: ".ant-table-footer",
  pagination: ".ant-pagination",
  wrapper: ".ant-table-wrapper",
  empty: ".ant-empty",
  emptyCell: ".ant-table-tbody .ant-table-cell",
  body: ".ant-table-body, .ant-table-content",
  bodyContent: ".ant-table-tbody"
};
function Ht(e) {
  var t, n;
  (n = (t = (e == null ? void 0 : e.domEvent) || e) == null ? void 0 : t.stopPropagation) == null || n.call(t);
}
function rs(e) {
  var t;
  return (t = e.menu) == null ? void 0 : t.map((n) => $(Sa, {
    key: `${e.key}:${n.key}`,
    disabled: e.disabled || n.disabled,
    onClick: (r) => (Ht(r), e.onSelect(n.value, r.domEvent || r))
  }, { icon: n.icon, default: n.label }));
}
function wb(e, t) {
  const n = {
    ...e.attrs,
    disabled: e.disabled,
    onClick: (a) => {
      if (Ht(a), !e.menu)
        return e.onClick(a);
    }
  };
  let r = e.render ? e.render(n) : $(on, n, () => {
    var a;
    return [
      !t.labelOnly && ((a = e.icon) == null ? void 0 : a.call(e)),
      (!t.iconOnly || !e.icon) && e.label(),
      e.menu && Oe.expand()
    ];
  });
  if (e.menu) {
    const a = r;
    r = $(ya, { ...e.dropdownProps, disabled: e.disabled }, {
      default: () => a,
      popupRender: () => $(wa, {}, () => rs(e))
    });
  }
  return $(Ca, {}, { title: e.tooltip, default: () => $("span", { onClick: Ht }, [r]) });
}
function Sb(e) {
  const { groupProps: t, buttons: n, moreButtons: r, defaultButtonProps: a } = e, o = e.divider ?? ((t == null ? void 0 : t.direction) !== "vertical" && ["link", "text"].includes(String((a == null ? void 0 : a.variant) ?? (a == null ? void 0 : a.type) ?? ""))), s = n.flatMap((i, l) => [
    $("span", { key: i.key }, [wb(i, e)]),
    o && l < n.length - 1 ? $(us, { type: "vertical", class: "sup-buttons-divider" }) : void 0
  ]);
  return r.length && s.push($(ya, {}, {
    default: () => $(on, { ...a, onClick: Ht }, e.moreLabel),
    popupRender: () => $(wa, {}, () => r.map((i) => i.menu ? $(cs, { key: i.key, disabled: i.disabled }, {
      title: i.label,
      icon: i.icon,
      default: () => rs(i)
    }) : $(Sa, {
      key: i.key,
      disabled: i.disabled,
      onClick: (l) => (Ht(l), i.onClick(l.domEvent || l))
    }, { icon: i.icon, default: i.label })))
  })), $(_a, { size: o ? 0 : "small", ...t, class: ["sup-buttons", t == null ? void 0 : t.class] }, () => s);
}
const _b = (e, t = {}) => {
  const n = (r) => e.files.find((a) => a.uid === r.uid);
  return $("div", { class: "sup-upload" }, [
    $(pr, {
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
          return ((a = n(r)) == null ? void 0 : a.status) === "waiting" ? " " + q("uploadWaiting") : null;
        }
      },
      maxCount: void 0,
      customRequest: void 0,
      // 选入及请求仍由 Core 管理，原生列表只消费受控状态。
      beforeUpload: (r) => (e.select(r), pr.LIST_IGNORE),
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
        return e.hideTrigger ? null : ((r = t.default) == null ? void 0 : r.call(t)) ?? (e.attrs.listType === "picture-card" ? $("div", [Oe.add(), e.title()]) : $(on, {}, { default: () => [Oe.upload(), e.title()] }));
      }
    }),
    !e.hideTrigger && e.tip && $("div", { class: "sup-upload-tip" }, e.tip),
    e.readonly && e.showList && !e.files.length && $("div", { class: "sup-upload-tip" }, q("uploadEmpty"))
  ]);
};
async function pa(e, t) {
  try {
    t ? await e.validateFields(t) : await e.validate();
  } catch (n) {
    throw Array.isArray(n == null ? void 0 : n.errorFields) ? new ab(
      n.errorFields.map((r) => ({ path: r.name, messages: r.errors })),
      n
    ) : n;
  }
}
const Cb = {
  form: {
    service: {
      validate: pa,
      validateField: (e, t) => pa(e, [t]),
      clearValidate: (e) => e.clearValidate()
    },
    component: ds,
    adaptProps: ({ hideRequiredMark: e, ...t }) => e ? { ...t, requiredMark: !1 } : t
  },
  formItem: { defaults: { validateFirst: !0 }, component: fs },
  row: { component: ma },
  col: { component: ba },
  space: { component: _a },
  compactSpace: { component: ps },
  card: {
    render: ({ state: e }) => $(ga, e.attrs, {
      ...e.slots,
      title: e.title && (() => $("div", { class: "sup-title" }, [e.title()])),
      extra: e.extra,
      default: e.content
    })
  },
  tabs: { render: ({ state: e }) => db(e) },
  collapse: { render: ({ state: e }) => pb(e) },
  descriptions: { render: ({ state: e }) => $(ub, { state: e }) },
  actionGroup: {
    schemaDefaults: {
      rowButtons: { buttonProps: { type: "link", variant: "link", size: "small" } },
      ButtonActions: {
        save: { attrs: { color: "primary" } },
        expand: { attrs: { type: "link" } },
        add: { attrs: { color: "primary" } },
        delete: { attrs: { danger: !0 } },
        submit: { attrs: { color: "primary" } },
        search: { attrs: { color: "primary" } }
      }
    },
    render: ({ attrs: e }) => Sb(e)
  },
  tooltip: { component: Ca },
  button: { component: on },
  tag: {
    component: vs,
    adaptProps: ({ removable: e, onRemove: t, ...n }) => ({ ...n, closable: e, onClose: t })
  },
  checkableTag: {
    component: ms,
    adaptProps: ({ selected: e, onSelectedChange: t, ...n }) => ({
      ...n,
      checked: e,
      onChange: t
    })
  },
  checkableTagGroup: {
    render: ({ attrs: { options: e, selected: t, multiple: n, onSelectedChange: r } }) => $(bs, {
      options: e,
      classes: { item: "tag-select" },
      multiple: n,
      value: n ? t : t[0] ?? null,
      onChange: (a) => {
        const o = Array.isArray(a) ? a : a === null ? [] : [a], s = o.find((l) => !t.includes(l)), i = t.find((l) => !o.includes(l));
        s !== void 0 ? r(s, !0) : i !== void 0 && r(i, !1);
      }
    })
  },
  empty: { component: hs },
  modal: {
    service: {
      useContext: gs,
      wrapContext: (e, t, n) => {
        var s;
        const r = t == null ? void 0 : t.value, a = (s = r == null ? void 0 : r.getPrefixCls) == null ? void 0 : s.call(r), o = n.prefixCls || `${a}-modal`;
        return $(
          ys,
          { ...r, prefixCls: a },
          () => e({ ...n, rootPrefixCls: a, prefixCls: o })
        );
      }
    },
    component: Dn,
    adaptProps: ({ visible: e, "onUpdate:visible": t, destroyOnClose: n, ...r }) => ({
      ...r,
      open: e,
      destroyOnHidden: n,
      "onUpdate:open": t
    })
  },
  upload: { render: ({ state: e, slots: t }) => _b(e, t) },
  preview: {
    render: ({ attrs: e }) => {
      const { visible: t, "onUpdate:visible": n, images: r = [], current: a, width: o, height: s } = e;
      return $(
        vr.PreviewGroup,
        {
          style: { display: "none" },
          preview: { visible: t, current: a, onVisibleChange: n }
        },
        () => r.map((i, l) => $(vr, { key: l, src: i, width: o, height: s }))
      );
    }
  },
  table: {
    service: { selectors: yb },
    defaults: { size: "small" },
    render: ({ attrs: e, slots: t }) => mb(e, t)
  },
  tableFilter: { render: ({ attrs: e, slots: t }) => gb(e, t) }
};
function as(e = {}) {
  return No(
    Lv({
      name: "antdv-next",
      uiComponents: Cb,
      supportedFields: sb,
      adaptFieldProps: lb,
      fields: ns(),
      fieldComponents: e.components,
      icons: { semantic: Oe },
      services: {
        message: (t, n) => ws[t](n),
        confirm(t) {
          const n = Dn.confirm({
            ...t,
            okText: t.okText ?? $(() => q("confirm")),
            cancelText: t.cancelText ?? $(() => q("cancel"))
          });
          return {
            update: (r) => n.update(r),
            destroy: () => n.destroy()
          };
        },
        info(t) {
          const n = Dn.info({ ...t, okText: t.okText ?? $(() => q("confirm")) });
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
const kb = as();
function Nb(e) {
  return e;
}
function xb(e, t, n) {
  const r = V({ current: 1, size: 10 }), a = H(), o = H(!1), s = V({
    form: {},
    tabs: {},
    dynamic: {},
    table: {}
  }), i = H({ filters: {}, sorters: [] });
  let l = 0, c;
  const u = /* @__PURE__ */ new Set(), f = (p) => (u.add(p), () => u.delete(p)), v = () => Me(yt({}, s.form, s.tabs, s.dynamic, s.table));
  X(
    [() => {
      var p;
      return (p = e.attrs) == null ? void 0 : p.filterSortTransform;
    }, () => i.value],
    ([p, g]) => {
      const S = Me(g);
      s.table = typeof p == "function" ? Me(p(S) ?? S) : {};
    },
    { immediate: !0, flush: "sync" }
  );
  const h = (p, g = "form") => {
    s[g] = yt({}, p);
  }, y = () => {
    var p;
    if (!T.value)
      return {};
    const g = { ...r }, S = (p = e.attrs) == null ? void 0 : p.pageTransform;
    return S ? S(g) : g;
  }, w = async (p, g = !1) => {
    var S, _, P, k, R, M;
    x.cancel();
    const I = { ...r }, E = y(), D = yt(
      {},
      E,
      v(),
      p,
      g ? E : {}
    ), B = ((S = e.beforeQuery) == null ? void 0 : S.call(e, D)) ?? D, U = (_ = e.apis) == null ? void 0 : _.query;
    c == null || c.abort();
    const W = ++l;
    if (!U) {
      c = void 0, o.value = !1;
      return;
    }
    const ee = new AbortController();
    c = ee, o.value = !0;
    try {
      const z = await U(B, { signal: ee.signal });
      if (W !== l || ee.signal.aborted)
        return;
      const G = ((k = (P = e.attrs) == null ? void 0 : P.resultTransform) == null ? void 0 : k.call(P, z)) ?? z, Q = ((R = e.afterQuery) == null ? void 0 : R.call(e, G)) ?? G;
      if (T.value && !Array.isArray(Q) && ((M = Q == null ? void 0 : Q.records) == null ? void 0 : M.length) === 0 && Number.isFinite(Q.total)) {
        const se = Math.max(1, Math.ceil(Q.total / (Q.size || r.size)));
        if (r.current > se)
          return r.current = se, w(p, !0);
      }
      return b(Q, I);
    } finally {
      W === l && (c = void 0, o.value = !1);
    }
  }, b = (p, g = { ...r }) => {
    Array.isArray(p) ? (a.value = { current: 1, pageSize: g.size }, t(p), T.value !== !1 && (r.current = 1, T.value = { ...T.value, total: p.length })) : p != null && p.records && (a.value = {
      current: p.current ?? g.current,
      pageSize: p.size ?? g.size
    }, t(p.records), T.value !== !1 && (r.current = a.value.current, r.size = a.value.pageSize, T.value = { ...T.value, total: p.total }));
    const S = e.onLoaded ? [e.onLoaded, ...u] : [...u];
    return Promise.all(S.map((_) => _(p)));
  }, C = (p, g = r.size) => (r.current = g !== r.size ? 1 : p, r.size = g, w()), d = (p) => (T.value && (r.current = 1), w(p)), m = (p) => {
    (p == null ? void 0 : p.name) !== "AbortError" && console.error(p);
  }, x = xv((p) => d(p).catch(m), 300, { leading: !1 }), O = (p) => {
    var g, S, _, P;
    const k = s.table, R = p.remoteParams ?? (p.remote !== !1 ? { filters: p.filters, sorters: p.sorters } : void 0);
    if (R && !Un(i.value, R) && (i.value = Me(R)), p.action === "paginate") {
      if (!T.value || ((g = p.pagination) == null ? void 0 : g.current) === void 0)
        return;
      const M = p.pagination.pageSize ?? r.size, I = M !== r.size ? 1 : p.pagination.current;
      return I === r.current && M === r.size ? void 0 : (r.current = I, r.size = M, (S = e.apis) != null && S.query ? w().catch(m) : void 0);
    }
    if (p.remote === !1) {
      p.action === "filter" && T.value && ((_ = p.pagination) == null ? void 0 : _.current) !== void 0 && (r.current = p.pagination.current);
      return;
    }
    if (!(!((P = e.apis) != null && P.query) || Un(k, s.table)))
      return d().catch(m);
  }, A = () => {
    x.cancel(), c == null || c.abort(), c = void 0, l += 1, o.value = !1;
  }, T = H(!1);
  return X(
    () => {
      var p;
      return (p = e.attrs) == null ? void 0 : p.pagination;
    },
    (p) => {
      if (p === !1) {
        T.value = !1;
        return;
      }
      Object.assign(r, { size: (p == null ? void 0 : p.pageSize) || 10, current: (p == null ? void 0 : p.current) || 1 }), T.value = {
        ...p,
        pageSize: r.size,
        current: r.current
      };
    },
    { immediate: !0, flush: "sync" }
  ), X(
    r,
    (p) => {
      T.value && (T.value = { ...T.value, pageSize: p.size, current: p.current });
    },
    { flush: "sync" }
  ), X(
    () => {
      var p, g;
      return [
        (p = e.apis) == null ? void 0 : p.query,
        (n == null ? void 0 : n.value.length) ?? ((g = oe(e.dataSource)) == null ? void 0 : g.length),
        r.current,
        r.size,
        T.value === !1
      ];
    },
    ([p, g]) => {
      if (p || !T.value || g === void 0)
        return;
      const S = Math.min(Math.max(1, r.current), Math.max(1, Math.ceil(g / r.size)));
      r.current = S, (T.value.total !== g || T.value.current !== S) && (T.value = { ...T.value, total: g, current: S });
    },
    { immediate: !0 }
  ), {
    goPage: C,
    reload: w,
    throttleRequest: x,
    cancelQuery: A,
    setQueryParams: h,
    getQueryParams: v,
    handleTableChange: O,
    query: d,
    pagination: T,
    dataPagination: a,
    setPageData: b,
    onLoaded: f,
    loading: o
  };
}
function Ab(e, t, n) {
  var r;
  const { columns: a, searchForm: o } = e, s = o || {}, i = H(), l = s.dataSource || V({}), { buttons: c = {}, searchOnChange: u, limit: f, ...v } = s, h = H(!1), y = [];
  s.subItems.forEach((m) => {
    if (typeof m == "string") {
      const x = a.find((O) => O.field === m);
      x && y.push({
        type: "Input",
        ..._v(x, "span", "disabled", "hidden"),
        editable: !0,
        exclude: []
      });
    } else
      return y.push({ ...m });
  }), f && y.length > f && y.forEach((m, x) => {
    if (x >= f) {
      const O = m.hidden;
      m.hidden = (...A) => !h.value || (typeof O == "function" ? O(...A) : O);
    }
  });
  const w = {
    search() {
      var m;
      n(l), (m = s.onSubmit) == null || m.call(s, pe(l));
    },
    reset(m) {
      i.value.resetFields(m);
    }
  }, b = Array.isArray(c) ? { actions: c } : { ...c };
  b.actions ?? (b.actions = u ? void 0 : ["search", "reset"]), (r = b.actions) != null && r.length && (f && y.length > f && (b.actions = [
    {
      name: "expand",
      onClick: () => h.value = !h.value
    },
    ...b.actions
  ]), y.push({
    type: "InfoSlot",
    align: "right",
    span: "auto",
    render: () => $("div", { style: { display: "flex", justifyContent: "flex-end", width: "100%" } }, [
      $(qe, {
        option: b,
        methods: w,
        effectData: ke({ table: t, form: i, expanded: h })
      })
    ])
  }));
  const C = X(i, () => {
    n(l), u && X(l, n), C();
  });
  return { formNode: () => $(Pe.Form, {
    option: {
      ...v,
      ignoreRules: !0,
      dataSource: l,
      subItems: y
    },
    ref: i,
    onSubmit: w.search,
    onReset: w.search
  }), formRef: i, ...w, dataSource: l };
}
function Ob(e) {
  return !e || !e.getBoundingClientRect ? 0 : e.getBoundingClientRect();
}
function $b(e) {
  const t = document.documentElement, n = t.scrollLeft, r = t.scrollTop, a = t.clientLeft, o = t.clientTop, s = window.pageXOffset, i = window.pageYOffset, l = Ob(e), { left: c, top: u, width: f, height: v } = l, h = (s || n) - (a || 0), y = (i || r) - (o || 0), w = c + s, b = u + i, C = w - h, d = b - y, m = window.document.documentElement.clientWidth, x = window.document.documentElement.clientHeight;
  return {
    left: C,
    top: d,
    right: m - f - C,
    bottom: x - v - d,
    rightIncludeBody: m - C,
    bottomIncludeBody: x - d
  };
}
function Tb(e, t, n, r) {
  const { selectors: a, scrollHeightScope: o } = xe("table"), s = (O, A) => A ? O.querySelector(A) : null, i = Mo(d, 100), l = H({});
  let c = !1, u, f = null;
  const v = [], h = /* @__PURE__ */ new Map();
  function y() {
    h.forEach((O, A) => Object.assign(A.style, O)), h.clear();
  }
  function w(O, A, T = !1) {
    h.has(O) || h.set(O, { height: O.style.height, overflowY: O.style.overflowY }), O.style.height = `${A}px`, T && (O.style.overflowY = "hidden");
  }
  const b = () => {
    var O;
    if (c) {
      i();
      return;
    }
    c = !0, window.addEventListener("resize", i, { signal: r == null ? void 0 : r.signal }), document.addEventListener("redoHeight", i), l.value = (O = e.attrs) == null ? void 0 : O.scroll, v.push(
      X(
        () => {
          var A;
          return [t.value, (A = oe(t)) == null ? void 0 : A.length, e.maxHeight, e.fixedHeight, e.heightOffset];
        },
        () => i(),
        { flush: "post" }
      ),
      X(
        n,
        (A, T, p) => {
          if (A) {
            const g = A.style.overflow;
            A.style.overflow = "hidden", u = new ResizeObserver(() => i()), u.observe(A), A.parentElement && u.observe(A.parentElement), p(() => {
              A.style.overflow = g, u == null || u.disconnect(), f = null, y();
            });
          }
        },
        { immediate: !0, flush: "post" }
      )
    );
  };
  function C() {
    var O;
    c = !1, window.removeEventListener("resize", i), document.removeEventListener("redoHeight", i), u == null || u.disconnect(), v.forEach((A) => A()), v.length = 0, y(), i.cancel(), l.value = oe((O = e.attrs) == null ? void 0 : O.scroll);
  }
  Vn(C);
  function d() {
    if (c)
      return i.cancel(), x();
  }
  function m(O, A) {
    var T;
    l.value = {
      x: "100%",
      ...oe((T = e.attrs) == null ? void 0 : T.scroll),
      y: O == null ? null : O + (o === "table" ? A : 0)
    };
  }
  async function x() {
    var O, A;
    if (await ze(), !c)
      return;
    const { maxHeight: T, fixedHeight: p, heightOffset: g } = e;
    if (T == null)
      return;
    const S = oe(n);
    if (!(S != null && S.isConnected) || !S.parentElement)
      return;
    const _ = s(S, a.table);
    if (!_)
      return;
    p || y();
    const P = S.parentElement, k = getComputedStyle(P), R = $b(_);
    let M = 0;
    for (let J = _.parentElement; J; J = J.parentElement) {
      const re = getComputedStyle(J);
      if (M += (parseFloat(re.paddingBottom) || 0) + (parseFloat(re.borderBottomWidth) || 0), J === S)
        break;
    }
    const I = (parseFloat(k.marginBottom) || 0) + (parseFloat(k.paddingBottom) || 0);
    let E = 0;
    if (T === "parent") {
      const J = P.getBoundingClientRect().top + P.clientTop + P.clientHeight, re = getComputedStyle(S);
      E = J - (parseFloat(k.paddingBottom) || 0) - R.top - (parseFloat(re.marginBottom) || 0);
    } else
      E = R.bottomIncludeBody - I;
    const D = s(_, a.title), B = (D == null ? void 0 : D.parentElement) === _ ? D.offsetHeight ?? 0 : 0, U = s(_, a.header), W = (U == null ? void 0 : U.offsetHeight) ?? 0;
    let ee = 0;
    const z = s(_, a.footer);
    z && (ee += z.offsetHeight || 0);
    let G = 0;
    if (a.pagination) {
      const J = _.getBoundingClientRect().top;
      S.querySelectorAll(a.pagination).forEach((re) => {
        re.offsetHeight && re.getBoundingClientRect().top >= J && (G += re.offsetHeight + 16);
      });
    }
    const Q = Math.max(
      0,
      Math.floor(E) - (g || 0) - M - G
    ), se = ee + B + W + 1, le = Math.max(0, typeof T == "number" ? T : Q - se), he = le + se;
    if (p && (w(_, he, !0), !(((O = oe(t)) == null ? void 0 : O.length) > 0) && s(_, a.empty))) {
      const re = s(_, a.emptyCell);
      re && w(re, Math.max(0, le - 16));
    }
    const ve = s(_, a.bodyContent);
    if (ve !== f && (f && (u == null || u.unobserve(f)), f = ve, ve && (u == null || u.observe(ve))), ve) {
      const J = s(_, a.body), re = J && getComputedStyle(J), Ce = J && re ? Math.max(
        0,
        J.offsetHeight - J.clientHeight - (parseFloat(re.borderTopWidth) || 0) - (parseFloat(re.borderBottomWidth) || 0)
      ) : 0, L = ((A = oe(t)) == null ? void 0 : A.length) > 0 && ve.getBoundingClientRect().height + Ce > le;
      m(L ? le : null, se);
    } else
      m(le, se);
  }
  return { getScrollRef: l, redoHeight: d, debounceRedoHeight: i, listenResize: b, stopResize: C };
}
const Mb = ce({
  name: "SuperTable",
  inheritAttrs: !1,
  props: {
    dataSource: Array,
    schema: Object
  },
  emits: ["register", "load", "update:dataSource"],
  setup(e, t) {
    const { style: n, class: r, ...a } = t.attrs, o = ft({ attrs: a }), s = H([]), i = H(), l = (z) => {
      s.value = z, t.emit("update:dataSource", z), rt(o.dataSource) && (o.dataSource.value = z);
    };
    Ze(() => e.dataSource && l(e.dataSource)), Ze(() => o.dataSource && l(oe(o.dataSource)));
    const c = H(), u = (z) => {
      var G, Q;
      _e.schemaDiagnostics && qt(z, "table", "SuperTable");
      const { attrs: se, ...le } = ue.SuperTable || {}, { maxHeight: he, fixedHeight: ve, heightOffset: J, useSectionStyle: re, ...Ce } = de(
        le,
        { ...z.attrs },
        a
      );
      let L = le.pagination;
      for (const Y of [(G = z.attrs) == null ? void 0 : G.pagination, a.pagination])
        Y !== void 0 && (L = Y === !1 ? !1 : yt({}, L || {}, Y));
      Object.assign(o, { maxHeight: he, fixedHeight: ve, heightOffset: J, useSectionStyle: re }, z, {
        attrs: {
          ...Ce,
          pagination: L,
          filterSortTransform: a.filterSortTransform ?? ((Q = z.attrs) == null ? void 0 : Q.filterSortTransform) ?? le.filterSortTransform
        }
      });
    };
    Ze(() => e.schema && u(pe(e.schema)));
    const {
      loading: f,
      pagination: v,
      dataPagination: h,
      setPageData: y,
      onLoaded: w,
      goPage: b,
      reload: C,
      query: d,
      throttleRequest: m,
      cancelQuery: x,
      setQueryParams: O,
      getQueryParams: A,
      handleTableChange: T
    } = xb(o, l, s), { getScrollRef: p, debounceRedoHeight: g, listenResize: S, stopResize: _ } = Tb(o, s, i), P = Ve(), k = {
      setOption: u,
      setData: (z) => {
        z && l(z);
      },
      redoHeight: g,
      goPage: b,
      reload: C,
      query: d,
      onLoaded: w,
      resetSearchForm(z) {
        var G, Q;
        return (Q = (G = c.value) == null ? void 0 : G.formRef) == null ? void 0 : Q.resetFields(z);
      },
      setPageData: y,
      getQueryParams: A,
      getData: () => s.value,
      dataRef: s,
      searchForm: K(() => {
        var z;
        return (z = c.value) == null ? void 0 : z.formRef;
      }),
      validate: async () => {
        P.value && await xe("form").validate(P.value);
      },
      setColumns: (z) => {
        var G;
        !U && !((G = o.columns) != null && G.length) ? Object.assign(o, { columns: z }) : (Object.assign(o, { columns: z }), ee(z));
      }
    }, R = H({ ...k }), M = (z) => {
      Object.assign(R.value, Je(V(z)), k), t.emit("register", R.value);
    };
    t.emit("register", R.value), t.expose(R.value);
    const I = V({
      reload: C,
      onRegister: M,
      loading: f
    });
    en(() => {
      x(), t.emit("register", null);
    }), Qe("rootSlots", t.slots);
    const E = H({}), D = H(), B = V({
      formData: s,
      current: s,
      queryParams: K(A)
    });
    let U = !1;
    const W = X(
      o,
      (z) => {
        var G, Q;
        if (!((G = z == null ? void 0 : z.columns) != null && G.length))
          return;
        if (D.value) {
          W();
          return;
        }
        const { columns: se } = z, le = V({
          refData: s,
          listData: St(se)
        });
        E.value = Ot(o.slots, B, t.slots);
        const {
          // 查询转换器由 Core 消费，不传给原生 Table。
          attrs: {
            onLoad: he,
            onTableChange: ve,
            filterSortTransform: J,
            pageTransform: re,
            resultTransform: Ce,
            ...L
          }
        } = Fe({ option: z, effectData: B });
        Object.assign(I, L, {
          pagination: v,
          onTableChange: (N) => {
            T(N);
            const te = Array.isArray(ve) ? ve : [ve], ae = {
              ...N,
              pagination: v.value ? {
                current: v.value.current,
                pageSize: v.value.pageSize,
                total: v.value.total
              } : void 0
            };
            te.forEach((me) => me == null ? void 0 : me(ae));
          }
        }), w((N) => {
          t.emit("load", N), he == null || he(N);
        }), z.searchForm && (c.value = Ab(z, R, (N) => {
          O(N, "form"), U && m();
        }));
        const Y = z.tabs && z.tabs.field;
        if (z.tabs && Y) {
          const N = (Q = z.tabs).activeKey ?? (Q.activeKey = H(z.tabs.defaultActiveKey)), te = {};
          X(
            N,
            (ae) => {
              ae === void 0 ? O(void 0, "tabs") : (Ut(te, Y, ae), O(te, "tabs")), U && m();
            },
            { immediate: !0 }
          );
        }
        X(
          () => z.params && V(z.params),
          (N) => {
            O(N, "dynamic"), U && m();
          },
          { deep: !0, immediate: !0 }
        ), ze(() => {
          U = !0, o.immediate !== !1 && m();
        }), X(
          () => {
            var N;
            return [o.maxHeight, (N = o.attrs) == null ? void 0 : N.scroll];
          },
          () => {
            o.maxHeight == null ? (_(), L.scroll === void 0 ? delete I.scroll : I.scroll = L.scroll) : (I.scroll = p, S());
          },
          { immediate: !0 }
        );
        const { onExpandedRowsChange: j } = I;
        I.onExpandedRowsChange = (N) => {
          j == null || j(N), g();
        };
        const F = () => $(Pe.Table, { option: o, effectData: B, model: le, ...I }, E.value);
        o.editable ? D.value = () => Z("form")({ model: s.value, ref: P }, { default: F }) : D.value = F;
      },
      {
        immediate: !0
      }
    ), ee = (z) => {
      const G = V({
        refData: s,
        listData: St(z)
      }), Q = Symbol(), se = () => $(Pe.Table, { option: o, effectData: B, model: G, key: Q, ...I }, E.value);
      o.editable ? D.value = () => Z("form")({ model: s.value, ref: P }, { default: se }) : D.value = se;
    };
    return () => D.value && $(
      cr,
      { name: "exaProvider", data: { data: s, dataPagination: h, onLoaded: w } },
      () => {
        var z, G;
        return !c.value || (z = o.searchForm) != null && z.teleport ? $(
          "div",
          de(
            {
              ref: i,
              class: [o.useSectionStyle && "sup-container", "sup-table", "sup-form-section"]
            },
            {
              class: r,
              style: n
            }
          ),
          [
            ((G = o.searchForm) == null ? void 0 : G.teleport) && $(
              ei,
              { to: o.searchForm.teleport },
              $("div", { class: "sup-form-section sup-table-search" }, $(c.value.formNode))
            ),
            D.value()
          ]
        ) : $(
          "div",
          de(
            { ref: i, class: [o.useSectionStyle && "sup-container", "sup-table"] },
            { class: r, style: n }
          ),
          [
            $("div", { class: "sup-form-section sup-table-search" }, $(c.value.formNode)),
            $("div", { class: "sup-form-section section-last" }, $(D.value))
          ]
        );
      }
    );
  }
}), Ub = (e) => {
  const [t, n] = zn(), [r, a] = zn(), o = Promise.resolve(typeof e == "function" ? e() : e), s = (l) => {
    if (l)
      t.value || o.then(l.setOption), t.value = l, typeof l.setSelectedRows == "function" && (r.value = l);
    else if (l === null)
      t.value = void 0, r.value = void 0;
    else
      return (c, u) => $(Mb, { ...c, onRegister: s }, u == null ? void 0 : u.slots);
  }, i = async (l, ...c) => {
    let u = await n();
    if (await o, l && (!(l in u) || ["resetSearchForm", "validate", "redoHeight"].includes(l)) && (u = await a(), await ze()), l && l in u)
      return typeof u[l] == "function" ? u[l](...c) : u[l];
  };
  return [
    s,
    {
      /** 异步获取表格引用 */
      getTable: n,
      tableRef: t,
      redoHeight() {
        return i("redoHeight");
      },
      setData(l) {
        return i("setPageData", l);
      },
      /** 返回当前表格数据 */
      getData() {
        var l;
        return ge((l = t.value) == null ? void 0 : l.dataRef);
      },
      dataSource: K(() => {
        var l;
        return (l = t.value) == null ? void 0 : l.dataRef;
      }),
      /** 跳转到指定页 */
      goPage(l) {
        return i("goPage", l);
      },
      /** 设置表格列 */
      setColumns(l) {
        return i("setColumns", l);
      },
      /** 刷新数据，不改动查询条件与当前页 */
      reload() {
        return i("reload");
      },
      /** 手动执行条件查询，不覆盖搜索表单参数 */
      query(l) {
        return i("query", l);
      },
      /** 查询完成，返回结果回调 */
      onLoaded(l) {
        return i("onLoaded", l);
      },
      /** 重置查询表单，并重新查询 */
      resetSearchForm(l) {
        return i("resetSearchForm", l);
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
      setSelectedRows: (l) => i("setSelectedRows", l),
      expandedRowKeys: K(() => {
        var l;
        return (l = t.value) == null ? void 0 : l.expandedRowKeys;
      }),
      setExpandedRowKeys: (l) => i("setExpandedRowKeys", l),
      expandAll() {
        return i("expandAll");
      },
      /** 新增行 */
      add: (l) => i("add", l),
      /** 修改行，须判断是否已有选中行 */
      edit: (l) => i("edit", l),
      /** 删除行，须判断是否已有选中行 */
      delete: () => i("delete"),
      /** 查看详情，须判断是否已有选中行 */
      detail: (l) => i("detail", l),
      asyncCall: i,
      /** `editable`模式下进行表单校验 */
      validate() {
        return i("validate");
      }
    }
  ];
};
function Bb(e) {
  return e;
}
const Db = ce({
  props: {
    align: String,
    divider: { type: Boolean, default: void 0 },
    moreLabel: [String, Function, Object],
    attrs: Object,
    methods: Object,
    visibleIn: String,
    limit: Number,
    buttonProps: Object,
    /** 按钮显示方式icon/label */
    labelMode: String,
    hidden: [Boolean, Function],
    /** 无权限时的展示方式，默认隐藏 */
    unauthorized: String,
    disabled: [Boolean, Function],
    actions: Array,
    effectData: Object
  },
  setup(e, { slots: t }) {
    var n;
    const r = (n = t.default) == null ? void 0 : n.call(t), { effectData: a, ...o } = e, s = r ? r.flatMap(({ children: i, props: l = {} }) => {
      const { roleName: c, onClick: u, confirmText: f, tooltip: v, disabledTooltip: h, icon: y, ...w } = fv(
        l,
        (b, C) => wd(C)
      );
      return !u || !i ? [] : {
        label: i.default || i,
        icon: y,
        tooltip: v,
        disabledTooltip: h,
        roleName: c,
        onClick: u,
        confirmText: f,
        attrs: w
      };
    }) : e.actions;
    return () => $("div", {
      style: { display: "flex", justifyContent: { left: "flex-start", center: "center", right: "flex-end" }[e.align || "left"] }
    }, [$(qe, { option: { ...o, actions: s }, effectData: a })]);
  }
});
function zb(e) {
  return [() => $(Db, e)];
}
function qb(e) {
  const t = H(), n = H(), r = Promise.resolve(typeof e == "function" ? e() : e), a = (o) => {
    if (o)
      n.value || (r.then(o.setOption), t.value && X(
        t,
        (s) => {
          o.setData(s);
        },
        { immediate: !0 }
      )), n.value = o;
    else
      return (s) => $(Wo, { ...s, onRegister: a }, ti());
  };
  return [
    a,
    {
      setData(o) {
        n.value ? n.value.setData(o) : t.value = o;
      }
    }
  ];
}
function Hb(e) {
  return e;
}
const Pb = ob(
  "superform-antdv",
  (e) => as({ components: e })
), Vb = Pb, Kb = {
  Input: Ss,
  TextArea: _s,
  InputNumber: Cs,
  InputOTP: xs,
  InputPassword: As,
  InputSearch: Os,
  AutoComplete: $s,
  Cascader: Ts,
  ColorPicker: Ms,
  Select: Ds,
  Radio: Ps,
  RadioGroup: Is,
  Checkbox: Rs,
  CheckboxGroup: Es,
  DatePicker: js,
  DateRangePicker: Fs,
  DateMonthPicker: Ls,
  DateQuarterPicker: ks,
  DateWeekPicker: Ns,
  DateYearPicker: Us,
  TimePicker: Bs,
  TimeRangePicker: zs,
  TreeSelect: qs,
  Switch: Hs,
  Rate: Vs,
  Mentions: Ks,
  Segmented: Ys,
  Slider: Gs,
  Transfer: Ws
};
export {
  ab as FormValidationError,
  Db as SuperButtons,
  Wo as SuperDetail,
  hm as SuperForm,
  Mb as SuperTable,
  kb as antdvAdapter,
  Lb as antdvFields,
  tb as configure,
  as as createAntdvAdapter,
  ns as createAntdvFields,
  dr as createModal,
  Vb as default,
  Hb as defineDetail,
  Nb as defineForm,
  Bb as defineTable,
  Lv as defineUIAdapter,
  nm as diagnoseSchema,
  Eb as enUS,
  Kb as fieldComponents,
  Fb as registerAutoImportedComponents,
  nb as registerComponent,
  rb as registerComponents,
  eb as useAdapter,
  zb as useButtons,
  qb as useDetail,
  Yo as useForm,
  Go as useModal,
  jb as useModalForm,
  Ub as useTable,
  Xt as zhCN
};
