import { commonjsGlobal as Zr, SpaceCompact as As, form_default as xs, InternalFormItem as Ds, InternalTooltip as Xt, button_default as Dt, Space as rn, card_default as Ms, Descriptions as Is, DescriptionsItem as Ps, Modal as an, InternalTable as Rs, Tabs as js, TabPane as Fs, CollapsePanel as Es, collapse_default as Ns, CompoundedInput as Ls, InputNumber as ks, InputSearch as Bs, InternalTextArea as Us, Select as Vs, Switch as Hs, DateRangePicker as qs, TimeRangePicker as zs, DatePicker as Ys, TimePicker as Gs, RadioButton as Jr, radio_default as Qr, RadioGroup as Ks, checkbox_default as Ws, CheckboxGroup as Zs, TreeSelect as Js, Row as et, Col as Pe, Upload as Xr, Tag as ea, CheckableTag as Qs, AutoComplete as Xs, InfoCircleOutlined as eo, Dropdown as nr, Menu as rr, MenuItem as ar, DownOutlined as ta, Divider as to, EllipsisOutlined as no, staticMethods as Ln, PlusOutlined as sn, MinusOutlined as na, ConfigProvider as ro, Image as sr, SyncOutlined as ao, LoadingOutlined as so, PaperClipOutlined as oo, UploadOutlined as io, CloseCircleOutlined as lo, UpOutlined as uo } from "./antd.js";
import { defineComponent as Q, h as w, inject as Ie, reactive as ee, ref as V, isRef as mt, watchEffect as st, computed as J, toValue as Oe, toRef as Se, watch as W, unref as P, toRefs as Ye, mergeProps as ae, markRaw as co, openBlock as q, createBlock as X, withModifiers as fo, withCtx as ie, createElementBlock as ve, Fragment as Ce, renderList as Ge, createVNode as Me, createSlots as kn, resolveDynamicComponent as De, createCommentVNode as Fe, normalizeProps as ra, guardReactiveProps as aa, provide as tt, toRaw as le, readonly as sa, shallowRef as Rt, useAttrs as oa, onMounted as ia, shallowReactive as jt, getCurrentInstance as la, onUnmounted as on, nextTick as Ke, render as On, watchPostEffect as ua, renderSlot as po, createTextVNode as Cn, toDisplayString as en, Teleport as bo, useSlots as go } from "vue";
var mo = { exports: {} }, vn = { exports: {} }, or;
function ho() {
  return or || (or = 1, function(e, t) {
    (function(n, r) {
      e.exports = r();
    })(Zr, function() {
      var n = 1e3, r = 6e4, a = 36e5, s = "millisecond", o = "second", i = "minute", l = "hour", u = "day", g = "week", b = "month", h = "quarter", m = "year", c = "date", f = "Invalid Date", d = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/, y = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g, p = { name: "en", weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), ordinal: function(F) {
        var D = ["th", "st", "nd", "rd"], x = F % 100;
        return "[" + F + (D[(x - 20) % 10] || D[x] || D[0]) + "]";
      } }, v = function(F, D, x) {
        var M = String(F);
        return !M || M.length >= D ? F : "" + Array(D + 1 - M.length).join(x) + F;
      }, S = { s: v, z: function(F) {
        var D = -F.utcOffset(), x = Math.abs(D), M = Math.floor(x / 60), I = x % 60;
        return (D <= 0 ? "+" : "-") + v(M, 2, "0") + ":" + v(I, 2, "0");
      }, m: function F(D, x) {
        if (D.date() < x.date())
          return -F(x, D);
        var M = 12 * (x.year() - D.year()) + (x.month() - D.month()), I = D.clone().add(M, b), H = x - I < 0, R = D.clone().add(M + (H ? -1 : 1), b);
        return +(-(M + (x - I) / (H ? I - R : R - I)) || 0);
      }, a: function(F) {
        return F < 0 ? Math.ceil(F) || 0 : Math.floor(F);
      }, p: function(F) {
        return { M: b, y: m, w: g, d: u, D: c, h: l, m: i, s: o, ms: s, Q: h }[F] || String(F || "").toLowerCase().replace(/s$/, "");
      }, u: function(F) {
        return F === void 0;
      } }, _ = "en", C = {};
      C[_] = p;
      var $ = "$isDayjsObject", O = function(F) {
        return F instanceof E || !(!F || !F[$]);
      }, T = function F(D, x, M) {
        var I;
        if (!D)
          return _;
        if (typeof D == "string") {
          var H = D.toLowerCase();
          C[H] && (I = H), x && (C[H] = x, I = H);
          var R = D.split("-");
          if (!I && R.length > 1)
            return F(R[0]);
        } else {
          var z = D.name;
          C[z] = D, I = z;
        }
        return !M && I && (_ = I), I || !M && _;
      }, A = function(F, D) {
        if (O(F))
          return F.clone();
        var x = typeof D == "object" ? D : {};
        return x.date = F, x.args = arguments, new E(x);
      }, j = S;
      j.l = T, j.i = O, j.w = function(F, D) {
        return A(F, { locale: D.$L, utc: D.$u, x: D.$x, $offset: D.$offset });
      };
      var E = function() {
        function F(x) {
          this.$L = T(x.locale, null, !0), this.parse(x), this.$x = this.$x || x.x || {}, this[$] = !0;
        }
        var D = F.prototype;
        return D.parse = function(x) {
          this.$d = function(M) {
            var I = M.date, H = M.utc;
            if (I === null)
              return /* @__PURE__ */ new Date(NaN);
            if (j.u(I))
              return /* @__PURE__ */ new Date();
            if (I instanceof Date)
              return new Date(I);
            if (typeof I == "string" && !/Z$/i.test(I)) {
              var R = I.match(d);
              if (R) {
                var z = R[2] - 1 || 0, G = (R[7] || "0").substring(0, 3);
                return H ? new Date(Date.UTC(R[1], z, R[3] || 1, R[4] || 0, R[5] || 0, R[6] || 0, G)) : new Date(R[1], z, R[3] || 1, R[4] || 0, R[5] || 0, R[6] || 0, G);
              }
            }
            return new Date(I);
          }(x), this.init();
        }, D.init = function() {
          var x = this.$d;
          this.$y = x.getFullYear(), this.$M = x.getMonth(), this.$D = x.getDate(), this.$W = x.getDay(), this.$H = x.getHours(), this.$m = x.getMinutes(), this.$s = x.getSeconds(), this.$ms = x.getMilliseconds();
        }, D.$utils = function() {
          return j;
        }, D.isValid = function() {
          return this.$d.toString() !== f;
        }, D.isSame = function(x, M) {
          var I = A(x);
          return this.startOf(M) <= I && I <= this.endOf(M);
        }, D.isAfter = function(x, M) {
          return A(x) < this.startOf(M);
        }, D.isBefore = function(x, M) {
          return this.endOf(M) < A(x);
        }, D.$g = function(x, M, I) {
          return j.u(x) ? this[M] : this.set(I, x);
        }, D.unix = function() {
          return Math.floor(this.valueOf() / 1e3);
        }, D.valueOf = function() {
          return this.$d.getTime();
        }, D.startOf = function(x, M) {
          var I = this, H = !!j.u(M) || M, R = j.p(x), z = function(k, B) {
            var ne = j.w(I.$u ? Date.UTC(I.$y, B, k) : new Date(I.$y, B, k), I);
            return H ? ne : ne.endOf(u);
          }, G = function(k, B) {
            return j.w(I.toDate()[k].apply(I.toDate("s"), (H ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(B)), I);
          }, se = this.$W, oe = this.$M, be = this.$D, Te = "set" + (this.$u ? "UTC" : "");
          switch (R) {
            case m:
              return H ? z(1, 0) : z(31, 11);
            case b:
              return H ? z(1, oe) : z(0, oe + 1);
            case g:
              var he = this.$locale().weekStart || 0, Ae = (se < he ? se + 7 : se) - he;
              return z(H ? be - Ae : be + (6 - Ae), oe);
            case u:
            case c:
              return G(Te + "Hours", 0);
            case l:
              return G(Te + "Minutes", 1);
            case i:
              return G(Te + "Seconds", 2);
            case o:
              return G(Te + "Milliseconds", 3);
            default:
              return this.clone();
          }
        }, D.endOf = function(x) {
          return this.startOf(x, !1);
        }, D.$set = function(x, M) {
          var I, H = j.p(x), R = "set" + (this.$u ? "UTC" : ""), z = (I = {}, I[u] = R + "Date", I[c] = R + "Date", I[b] = R + "Month", I[m] = R + "FullYear", I[l] = R + "Hours", I[i] = R + "Minutes", I[o] = R + "Seconds", I[s] = R + "Milliseconds", I)[H], G = H === u ? this.$D + (M - this.$W) : M;
          if (H === b || H === m) {
            var se = this.clone().set(c, 1);
            se.$d[z](G), se.init(), this.$d = se.set(c, Math.min(this.$D, se.daysInMonth())).$d;
          } else
            z && this.$d[z](G);
          return this.init(), this;
        }, D.set = function(x, M) {
          return this.clone().$set(x, M);
        }, D.get = function(x) {
          return this[j.p(x)]();
        }, D.add = function(x, M) {
          var I, H = this;
          x = Number(x);
          var R = j.p(M), z = function(oe) {
            var be = A(H);
            return j.w(be.date(be.date() + Math.round(oe * x)), H);
          };
          if (R === b)
            return this.set(b, this.$M + x);
          if (R === m)
            return this.set(m, this.$y + x);
          if (R === u)
            return z(1);
          if (R === g)
            return z(7);
          var G = (I = {}, I[i] = r, I[l] = a, I[o] = n, I)[R] || 1, se = this.$d.getTime() + x * G;
          return j.w(se, this);
        }, D.subtract = function(x, M) {
          return this.add(-1 * x, M);
        }, D.format = function(x) {
          var M = this, I = this.$locale();
          if (!this.isValid())
            return I.invalidDate || f;
          var H = x || "YYYY-MM-DDTHH:mm:ssZ", R = j.z(this), z = this.$H, G = this.$m, se = this.$M, oe = I.weekdays, be = I.months, Te = I.meridiem, he = function(B, ne, fe, re) {
            return B && (B[ne] || B(M, H)) || fe[ne].slice(0, re);
          }, Ae = function(B) {
            return j.s(z % 12 || 12, B, "0");
          }, k = Te || function(B, ne, fe) {
            var re = B < 12 ? "AM" : "PM";
            return fe ? re.toLowerCase() : re;
          };
          return H.replace(y, function(B, ne) {
            return ne || function(fe) {
              switch (fe) {
                case "YY":
                  return String(M.$y).slice(-2);
                case "YYYY":
                  return j.s(M.$y, 4, "0");
                case "M":
                  return se + 1;
                case "MM":
                  return j.s(se + 1, 2, "0");
                case "MMM":
                  return he(I.monthsShort, se, be, 3);
                case "MMMM":
                  return he(be, se);
                case "D":
                  return M.$D;
                case "DD":
                  return j.s(M.$D, 2, "0");
                case "d":
                  return String(M.$W);
                case "dd":
                  return he(I.weekdaysMin, M.$W, oe, 2);
                case "ddd":
                  return he(I.weekdaysShort, M.$W, oe, 3);
                case "dddd":
                  return oe[M.$W];
                case "H":
                  return String(z);
                case "HH":
                  return j.s(z, 2, "0");
                case "h":
                  return Ae(1);
                case "hh":
                  return Ae(2);
                case "a":
                  return k(z, G, !0);
                case "A":
                  return k(z, G, !1);
                case "m":
                  return String(G);
                case "mm":
                  return j.s(G, 2, "0");
                case "s":
                  return String(M.$s);
                case "ss":
                  return j.s(M.$s, 2, "0");
                case "SSS":
                  return j.s(M.$ms, 3, "0");
                case "Z":
                  return R;
              }
              return null;
            }(B) || R.replace(":", "");
          });
        }, D.utcOffset = function() {
          return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);
        }, D.diff = function(x, M, I) {
          var H, R = this, z = j.p(M), G = A(x), se = (G.utcOffset() - this.utcOffset()) * r, oe = this - G, be = function() {
            return j.m(R, G);
          };
          switch (z) {
            case m:
              H = be() / 12;
              break;
            case b:
              H = be();
              break;
            case h:
              H = be() / 3;
              break;
            case g:
              H = (oe - se) / 6048e5;
              break;
            case u:
              H = (oe - se) / 864e5;
              break;
            case l:
              H = oe / a;
              break;
            case i:
              H = oe / r;
              break;
            case o:
              H = oe / n;
              break;
            default:
              H = oe;
          }
          return I ? H : j.a(H);
        }, D.daysInMonth = function() {
          return this.endOf(b).$D;
        }, D.$locale = function() {
          return C[this.$L];
        }, D.locale = function(x, M) {
          if (!x)
            return this.$L;
          var I = this.clone(), H = T(x, M, !0);
          return H && (I.$L = H), I;
        }, D.clone = function() {
          return j.w(this.$d, this);
        }, D.toDate = function() {
          return new Date(this.valueOf());
        }, D.toJSON = function() {
          return this.isValid() ? this.toISOString() : null;
        }, D.toISOString = function() {
          return this.$d.toISOString();
        }, D.toString = function() {
          return this.$d.toUTCString();
        }, F;
      }(), L = E.prototype;
      return A.prototype = L, [["$ms", s], ["$s", o], ["$m", i], ["$H", l], ["$W", u], ["$M", b], ["$y", m], ["$D", c]].forEach(function(F) {
        L[F[1]] = function(D) {
          return this.$g(D, F[0], F[1]);
        };
      }), A.extend = function(F, D) {
        return F.$i || (F(D, E, A), F.$i = !0), A;
      }, A.locale = T, A.isDayjs = O, A.unix = function(F) {
        return A(1e3 * F);
      }, A.en = C[_], A.Ls = C, A.p = {}, A;
    });
  }(vn)), vn.exports;
}
(function(e, t) {
  (function(n, r) {
    e.exports = r(ho());
  })(Zr, function(n) {
    function r(o) {
      return o && typeof o == "object" && "default" in o ? o : { default: o };
    }
    var a = r(n), s = { name: "zh-cn", weekdays: "星期日_星期一_星期二_星期三_星期四_星期五_星期六".split("_"), weekdaysShort: "周日_周一_周二_周三_周四_周五_周六".split("_"), weekdaysMin: "日_一_二_三_四_五_六".split("_"), months: "一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月".split("_"), monthsShort: "1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月".split("_"), ordinal: function(o, i) {
      return i === "W" ? o + "周" : o + "日";
    }, weekStart: 1, yearStart: 4, formats: { LT: "HH:mm", LTS: "HH:mm:ss", L: "YYYY/MM/DD", LL: "YYYY年M月D日", LLL: "YYYY年M月D日Ah点mm分", LLLL: "YYYY年M月D日ddddAh点mm分", l: "YYYY/M/D", ll: "YYYY年M月D日", lll: "YYYY年M月D日 HH:mm", llll: "YYYY年M月D日dddd HH:mm" }, relativeTime: { future: "%s内", past: "%s前", s: "几秒", m: "1 分钟", mm: "%d 分钟", h: "1 小时", hh: "%d 小时", d: "1 天", dd: "%d 天", M: "1 个月", MM: "%d 个月", y: "1 年", yy: "%d 年" }, meridiem: function(o, i) {
      var l = 100 * o + i;
      return l < 600 ? "凌晨" : l < 900 ? "早上" : l < 1100 ? "上午" : l < 1300 ? "中午" : l < 1800 ? "下午" : "晚上";
    } };
    return a.default.locale(s, null, !0), s;
  });
})(mo);
var vo = typeof global == "object" && global && global.Object === Object && global;
const ca = vo;
var yo = typeof self == "object" && self && self.Object === Object && self, So = ca || yo || Function("return this")();
const Le = So;
var wo = Le.Symbol;
const Re = wo;
var fa = Object.prototype, $o = fa.hasOwnProperty, _o = fa.toString, xt = Re ? Re.toStringTag : void 0;
function Oo(e) {
  var t = $o.call(e, xt), n = e[xt];
  try {
    e[xt] = void 0;
    var r = !0;
  } catch {
  }
  var a = _o.call(e);
  return r && (t ? e[xt] = n : delete e[xt]), a;
}
var Co = Object.prototype, To = Co.toString;
function Ao(e) {
  return To.call(e);
}
var xo = "[object Null]", Do = "[object Undefined]", ir = Re ? Re.toStringTag : void 0;
function Je(e) {
  return e == null ? e === void 0 ? Do : xo : ir && ir in Object(e) ? Oo(e) : Ao(e);
}
function je(e) {
  return e != null && typeof e == "object";
}
var Mo = "[object Symbol]";
function ln(e) {
  return typeof e == "symbol" || je(e) && Je(e) == Mo;
}
function da(e, t) {
  for (var n = -1, r = e == null ? 0 : e.length, a = Array(r); ++n < r; )
    a[n] = t(e[n], n, e);
  return a;
}
var Io = Array.isArray;
const we = Io;
var Po = 1 / 0, lr = Re ? Re.prototype : void 0, ur = lr ? lr.toString : void 0;
function pa(e) {
  if (typeof e == "string")
    return e;
  if (we(e))
    return da(e, pa) + "";
  if (ln(e))
    return ur ? ur.call(e) : "";
  var t = e + "";
  return t == "0" && 1 / e == -Po ? "-0" : t;
}
var Ro = /\s/;
function jo(e) {
  for (var t = e.length; t-- && Ro.test(e.charAt(t)); )
    ;
  return t;
}
var Fo = /^\s+/;
function Eo(e) {
  return e && e.slice(0, jo(e) + 1).replace(Fo, "");
}
function $e(e) {
  var t = typeof e;
  return e != null && (t == "object" || t == "function");
}
var cr = 0 / 0, No = /^[-+]0x[0-9a-f]+$/i, Lo = /^0b[01]+$/i, ko = /^0o[0-7]+$/i, Bo = parseInt;
function fr(e) {
  if (typeof e == "number")
    return e;
  if (ln(e))
    return cr;
  if ($e(e)) {
    var t = typeof e.valueOf == "function" ? e.valueOf() : e;
    e = $e(t) ? t + "" : t;
  }
  if (typeof e != "string")
    return e === 0 ? e : +e;
  e = Eo(e);
  var n = Lo.test(e);
  return n || ko.test(e) ? Bo(e.slice(2), n ? 2 : 8) : No.test(e) ? cr : +e;
}
function un(e) {
  return e;
}
var Uo = "[object AsyncFunction]", Vo = "[object Function]", Ho = "[object GeneratorFunction]", qo = "[object Proxy]";
function Ue(e) {
  if (!$e(e))
    return !1;
  var t = Je(e);
  return t == Vo || t == Ho || t == Uo || t == qo;
}
var zo = Le["__core-js_shared__"];
const yn = zo;
var dr = function() {
  var e = /[^.]+$/.exec(yn && yn.keys && yn.keys.IE_PROTO || "");
  return e ? "Symbol(src)_1." + e : "";
}();
function Yo(e) {
  return !!dr && dr in e;
}
var Go = Function.prototype, Ko = Go.toString;
function ut(e) {
  if (e != null) {
    try {
      return Ko.call(e);
    } catch {
    }
    try {
      return e + "";
    } catch {
    }
  }
  return "";
}
var Wo = /[\\^$.*+?()[\]{}|]/g, Zo = /^\[object .+?Constructor\]$/, Jo = Function.prototype, Qo = Object.prototype, Xo = Jo.toString, ei = Qo.hasOwnProperty, ti = RegExp(
  "^" + Xo.call(ei).replace(Wo, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
);
function ni(e) {
  if (!$e(e) || Yo(e))
    return !1;
  var t = Ue(e) ? ti : Zo;
  return t.test(ut(e));
}
function ri(e, t) {
  return e == null ? void 0 : e[t];
}
function ct(e, t) {
  var n = ri(e, t);
  return ni(n) ? n : void 0;
}
var ai = ct(Le, "WeakMap");
const Tn = ai;
var pr = Object.create, si = function() {
  function e() {
  }
  return function(t) {
    if (!$e(t))
      return {};
    if (pr)
      return pr(t);
    e.prototype = t;
    var n = new e();
    return e.prototype = void 0, n;
  };
}();
const oi = si;
function ii(e, t, n) {
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
function li() {
}
function ba(e, t) {
  var n = -1, r = e.length;
  for (t || (t = Array(r)); ++n < r; )
    t[n] = e[n];
  return t;
}
var ui = 800, ci = 16, fi = Date.now;
function di(e) {
  var t = 0, n = 0;
  return function() {
    var r = fi(), a = ci - (r - n);
    if (n = r, a > 0) {
      if (++t >= ui)
        return arguments[0];
    } else
      t = 0;
    return e.apply(void 0, arguments);
  };
}
function pi(e) {
  return function() {
    return e;
  };
}
var bi = function() {
  try {
    var e = ct(Object, "defineProperty");
    return e({}, "", {}), e;
  } catch {
  }
}();
const tn = bi;
var gi = tn ? function(e, t) {
  return tn(e, "toString", {
    configurable: !0,
    enumerable: !1,
    value: pi(t),
    writable: !0
  });
} : un;
const mi = gi;
var hi = di(mi);
const ga = hi;
function vi(e, t) {
  for (var n = -1, r = e == null ? 0 : e.length; ++n < r && t(e[n], n, e) !== !1; )
    ;
  return e;
}
function yi(e, t, n, r) {
  for (var a = e.length, s = n + (r ? 1 : -1); r ? s-- : ++s < a; )
    if (t(e[s], s, e))
      return s;
  return -1;
}
function Si(e) {
  return e !== e;
}
function wi(e, t, n) {
  for (var r = n - 1, a = e.length; ++r < a; )
    if (e[r] === t)
      return r;
  return -1;
}
function $i(e, t, n) {
  return t === t ? wi(e, t, n) : yi(e, Si, n);
}
function _i(e, t) {
  var n = e == null ? 0 : e.length;
  return !!n && $i(e, t, 0) > -1;
}
var Oi = 9007199254740991, Ci = /^(?:0|[1-9]\d*)$/;
function cn(e, t) {
  var n = typeof e;
  return t = t ?? Oi, !!t && (n == "number" || n != "symbol" && Ci.test(e)) && e > -1 && e % 1 == 0 && e < t;
}
function fn(e, t, n) {
  t == "__proto__" && tn ? tn(e, t, {
    configurable: !0,
    enumerable: !0,
    value: n,
    writable: !0
  }) : e[t] = n;
}
function $t(e, t) {
  return e === t || e !== e && t !== t;
}
var Ti = Object.prototype, Ai = Ti.hasOwnProperty;
function Bn(e, t, n) {
  var r = e[t];
  (!(Ai.call(e, t) && $t(r, n)) || n === void 0 && !(t in e)) && fn(e, t, n);
}
function _t(e, t, n, r) {
  var a = !n;
  n || (n = {});
  for (var s = -1, o = t.length; ++s < o; ) {
    var i = t[s], l = r ? r(n[i], e[i], i, n, e) : void 0;
    l === void 0 && (l = e[i]), a ? fn(n, i, l) : Bn(n, i, l);
  }
  return n;
}
var br = Math.max;
function ma(e, t, n) {
  return t = br(t === void 0 ? e.length - 1 : t, 0), function() {
    for (var r = arguments, a = -1, s = br(r.length - t, 0), o = Array(s); ++a < s; )
      o[a] = r[t + a];
    a = -1;
    for (var i = Array(t + 1); ++a < t; )
      i[a] = r[a];
    return i[t] = n(o), ii(e, this, i);
  };
}
function ha(e, t) {
  return ga(ma(e, t, un), e + "");
}
var xi = 9007199254740991;
function Un(e) {
  return typeof e == "number" && e > -1 && e % 1 == 0 && e <= xi;
}
function dn(e) {
  return e != null && Un(e.length) && !Ue(e);
}
function va(e, t, n) {
  if (!$e(n))
    return !1;
  var r = typeof t;
  return (r == "number" ? dn(n) && cn(t, n.length) : r == "string" && t in n) ? $t(n[t], e) : !1;
}
function ya(e) {
  return ha(function(t, n) {
    var r = -1, a = n.length, s = a > 1 ? n[a - 1] : void 0, o = a > 2 ? n[2] : void 0;
    for (s = e.length > 3 && typeof s == "function" ? (a--, s) : void 0, o && va(n[0], n[1], o) && (s = a < 3 ? void 0 : s, a = 1), t = Object(t); ++r < a; ) {
      var i = n[r];
      i && e(t, i, r, s);
    }
    return t;
  });
}
var Di = Object.prototype;
function Vn(e) {
  var t = e && e.constructor, n = typeof t == "function" && t.prototype || Di;
  return e === n;
}
function Mi(e, t) {
  for (var n = -1, r = Array(e); ++n < e; )
    r[n] = t(n);
  return r;
}
var Ii = "[object Arguments]";
function gr(e) {
  return je(e) && Je(e) == Ii;
}
var Sa = Object.prototype, Pi = Sa.hasOwnProperty, Ri = Sa.propertyIsEnumerable, ji = gr(function() {
  return arguments;
}()) ? gr : function(e) {
  return je(e) && Pi.call(e, "callee") && !Ri.call(e, "callee");
};
const Ft = ji;
function Fi() {
  return !1;
}
var wa = typeof exports == "object" && exports && !exports.nodeType && exports, mr = wa && typeof module == "object" && module && !module.nodeType && module, Ei = mr && mr.exports === wa, hr = Ei ? Le.Buffer : void 0, Ni = hr ? hr.isBuffer : void 0, Li = Ni || Fi;
const Et = Li;
var ki = "[object Arguments]", Bi = "[object Array]", Ui = "[object Boolean]", Vi = "[object Date]", Hi = "[object Error]", qi = "[object Function]", zi = "[object Map]", Yi = "[object Number]", Gi = "[object Object]", Ki = "[object RegExp]", Wi = "[object Set]", Zi = "[object String]", Ji = "[object WeakMap]", Qi = "[object ArrayBuffer]", Xi = "[object DataView]", el = "[object Float32Array]", tl = "[object Float64Array]", nl = "[object Int8Array]", rl = "[object Int16Array]", al = "[object Int32Array]", sl = "[object Uint8Array]", ol = "[object Uint8ClampedArray]", il = "[object Uint16Array]", ll = "[object Uint32Array]", de = {};
de[el] = de[tl] = de[nl] = de[rl] = de[al] = de[sl] = de[ol] = de[il] = de[ll] = !0;
de[ki] = de[Bi] = de[Qi] = de[Ui] = de[Xi] = de[Vi] = de[Hi] = de[qi] = de[zi] = de[Yi] = de[Gi] = de[Ki] = de[Wi] = de[Zi] = de[Ji] = !1;
function ul(e) {
  return je(e) && Un(e.length) && !!de[Je(e)];
}
function Hn(e) {
  return function(t) {
    return e(t);
  };
}
var $a = typeof exports == "object" && exports && !exports.nodeType && exports, Mt = $a && typeof module == "object" && module && !module.nodeType && module, cl = Mt && Mt.exports === $a, Sn = cl && ca.process, fl = function() {
  try {
    var e = Mt && Mt.require && Mt.require("util").types;
    return e || Sn && Sn.binding && Sn.binding("util");
  } catch {
  }
}();
const yt = fl;
var vr = yt && yt.isTypedArray, dl = vr ? Hn(vr) : ul;
const qn = dl;
var pl = Object.prototype, bl = pl.hasOwnProperty;
function _a(e, t) {
  var n = we(e), r = !n && Ft(e), a = !n && !r && Et(e), s = !n && !r && !a && qn(e), o = n || r || a || s, i = o ? Mi(e.length, String) : [], l = i.length;
  for (var u in e)
    (t || bl.call(e, u)) && !(o && // Safari 9 has enumerable `arguments.length` in strict mode.
    (u == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
    a && (u == "offset" || u == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
    s && (u == "buffer" || u == "byteLength" || u == "byteOffset") || // Skip index properties.
    cn(u, l))) && i.push(u);
  return i;
}
function Oa(e, t) {
  return function(n) {
    return e(t(n));
  };
}
var gl = Oa(Object.keys, Object);
const ml = gl;
var hl = Object.prototype, vl = hl.hasOwnProperty;
function yl(e) {
  if (!Vn(e))
    return ml(e);
  var t = [];
  for (var n in Object(e))
    vl.call(e, n) && n != "constructor" && t.push(n);
  return t;
}
function Gt(e) {
  return dn(e) ? _a(e) : yl(e);
}
function Sl(e) {
  var t = [];
  if (e != null)
    for (var n in Object(e))
      t.push(n);
  return t;
}
var wl = Object.prototype, $l = wl.hasOwnProperty;
function _l(e) {
  if (!$e(e))
    return Sl(e);
  var t = Vn(e), n = [];
  for (var r in e)
    r == "constructor" && (t || !$l.call(e, r)) || n.push(r);
  return n;
}
function Ot(e) {
  return dn(e) ? _a(e, !0) : _l(e);
}
var Ol = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, Cl = /^\w*$/;
function zn(e, t) {
  if (we(e))
    return !1;
  var n = typeof e;
  return n == "number" || n == "symbol" || n == "boolean" || e == null || ln(e) ? !0 : Cl.test(e) || !Ol.test(e) || t != null && e in Object(t);
}
var Tl = ct(Object, "create");
const Nt = Tl;
function Al() {
  this.__data__ = Nt ? Nt(null) : {}, this.size = 0;
}
function xl(e) {
  var t = this.has(e) && delete this.__data__[e];
  return this.size -= t ? 1 : 0, t;
}
var Dl = "__lodash_hash_undefined__", Ml = Object.prototype, Il = Ml.hasOwnProperty;
function Pl(e) {
  var t = this.__data__;
  if (Nt) {
    var n = t[e];
    return n === Dl ? void 0 : n;
  }
  return Il.call(t, e) ? t[e] : void 0;
}
var Rl = Object.prototype, jl = Rl.hasOwnProperty;
function Fl(e) {
  var t = this.__data__;
  return Nt ? t[e] !== void 0 : jl.call(t, e);
}
var El = "__lodash_hash_undefined__";
function Nl(e, t) {
  var n = this.__data__;
  return this.size += this.has(e) ? 0 : 1, n[e] = Nt && t === void 0 ? El : t, this;
}
function ot(e) {
  var t = -1, n = e == null ? 0 : e.length;
  for (this.clear(); ++t < n; ) {
    var r = e[t];
    this.set(r[0], r[1]);
  }
}
ot.prototype.clear = Al;
ot.prototype.delete = xl;
ot.prototype.get = Pl;
ot.prototype.has = Fl;
ot.prototype.set = Nl;
function Ll() {
  this.__data__ = [], this.size = 0;
}
function pn(e, t) {
  for (var n = e.length; n--; )
    if ($t(e[n][0], t))
      return n;
  return -1;
}
var kl = Array.prototype, Bl = kl.splice;
function Ul(e) {
  var t = this.__data__, n = pn(t, e);
  if (n < 0)
    return !1;
  var r = t.length - 1;
  return n == r ? t.pop() : Bl.call(t, n, 1), --this.size, !0;
}
function Vl(e) {
  var t = this.__data__, n = pn(t, e);
  return n < 0 ? void 0 : t[n][1];
}
function Hl(e) {
  return pn(this.__data__, e) > -1;
}
function ql(e, t) {
  var n = this.__data__, r = pn(n, e);
  return r < 0 ? (++this.size, n.push([e, t])) : n[r][1] = t, this;
}
function Qe(e) {
  var t = -1, n = e == null ? 0 : e.length;
  for (this.clear(); ++t < n; ) {
    var r = e[t];
    this.set(r[0], r[1]);
  }
}
Qe.prototype.clear = Ll;
Qe.prototype.delete = Ul;
Qe.prototype.get = Vl;
Qe.prototype.has = Hl;
Qe.prototype.set = ql;
var zl = ct(Le, "Map");
const Lt = zl;
function Yl() {
  this.size = 0, this.__data__ = {
    hash: new ot(),
    map: new (Lt || Qe)(),
    string: new ot()
  };
}
function Gl(e) {
  var t = typeof e;
  return t == "string" || t == "number" || t == "symbol" || t == "boolean" ? e !== "__proto__" : e === null;
}
function bn(e, t) {
  var n = e.__data__;
  return Gl(t) ? n[typeof t == "string" ? "string" : "hash"] : n.map;
}
function Kl(e) {
  var t = bn(this, e).delete(e);
  return this.size -= t ? 1 : 0, t;
}
function Wl(e) {
  return bn(this, e).get(e);
}
function Zl(e) {
  return bn(this, e).has(e);
}
function Jl(e, t) {
  var n = bn(this, e), r = n.size;
  return n.set(e, t), this.size += n.size == r ? 0 : 1, this;
}
function Xe(e) {
  var t = -1, n = e == null ? 0 : e.length;
  for (this.clear(); ++t < n; ) {
    var r = e[t];
    this.set(r[0], r[1]);
  }
}
Xe.prototype.clear = Yl;
Xe.prototype.delete = Kl;
Xe.prototype.get = Wl;
Xe.prototype.has = Zl;
Xe.prototype.set = Jl;
var Ql = "Expected a function";
function Yn(e, t) {
  if (typeof e != "function" || t != null && typeof t != "function")
    throw new TypeError(Ql);
  var n = function() {
    var r = arguments, a = t ? t.apply(this, r) : r[0], s = n.cache;
    if (s.has(a))
      return s.get(a);
    var o = e.apply(this, r);
    return n.cache = s.set(a, o) || s, o;
  };
  return n.cache = new (Yn.Cache || Xe)(), n;
}
Yn.Cache = Xe;
var Xl = 500;
function eu(e) {
  var t = Yn(e, function(r) {
    return n.size === Xl && n.clear(), r;
  }), n = t.cache;
  return t;
}
var tu = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, nu = /\\(\\)?/g, ru = eu(function(e) {
  var t = [];
  return e.charCodeAt(0) === 46 && t.push(""), e.replace(tu, function(n, r, a, s) {
    t.push(a ? s.replace(nu, "$1") : r || n);
  }), t;
});
const au = ru;
function Kt(e) {
  return e == null ? "" : pa(e);
}
function Wt(e, t) {
  return we(e) ? e : zn(e, t) ? [e] : au(Kt(e));
}
var su = 1 / 0;
function it(e) {
  if (typeof e == "string" || ln(e))
    return e;
  var t = e + "";
  return t == "0" && 1 / e == -su ? "-0" : t;
}
function gn(e, t) {
  t = Wt(t, e);
  for (var n = 0, r = t.length; e != null && n < r; )
    e = e[it(t[n++])];
  return n && n == r ? e : void 0;
}
function We(e, t, n) {
  var r = e == null ? void 0 : gn(e, t);
  return r === void 0 ? n : r;
}
function Gn(e, t) {
  for (var n = -1, r = t.length, a = e.length; ++n < r; )
    e[a + n] = t[n];
  return e;
}
var yr = Re ? Re.isConcatSpreadable : void 0;
function ou(e) {
  return we(e) || Ft(e) || !!(yr && e && e[yr]);
}
function Ca(e, t, n, r, a) {
  var s = -1, o = e.length;
  for (n || (n = ou), a || (a = []); ++s < o; ) {
    var i = e[s];
    t > 0 && n(i) ? t > 1 ? Ca(i, t - 1, n, r, a) : Gn(a, i) : r || (a[a.length] = i);
  }
  return a;
}
function iu(e) {
  var t = e == null ? 0 : e.length;
  return t ? Ca(e, 1) : [];
}
function lu(e) {
  return ga(ma(e, void 0, iu), e + "");
}
var uu = Oa(Object.getPrototypeOf, Object);
const Kn = uu;
var cu = "[object Object]", fu = Function.prototype, du = Object.prototype, Ta = fu.toString, pu = du.hasOwnProperty, bu = Ta.call(Object);
function ye(e) {
  if (!je(e) || Je(e) != cu)
    return !1;
  var t = Kn(e);
  if (t === null)
    return !0;
  var n = pu.call(t, "constructor") && t.constructor;
  return typeof n == "function" && n instanceof n && Ta.call(n) == bu;
}
function Aa(e, t, n) {
  var r = -1, a = e.length;
  t < 0 && (t = -t > a ? 0 : a + t), n = n > a ? a : n, n < 0 && (n += a), a = t > n ? 0 : n - t >>> 0, t >>>= 0;
  for (var s = Array(a); ++r < a; )
    s[r] = e[r + t];
  return s;
}
function gu(e, t, n) {
  var r = e.length;
  return n = n === void 0 ? r : n, !t && n >= r ? e : Aa(e, t, n);
}
var mu = "\\ud800-\\udfff", hu = "\\u0300-\\u036f", vu = "\\ufe20-\\ufe2f", yu = "\\u20d0-\\u20ff", Su = hu + vu + yu, wu = "\\ufe0e\\ufe0f", $u = "\\u200d", _u = RegExp("[" + $u + mu + Su + wu + "]");
function xa(e) {
  return _u.test(e);
}
function Ou(e) {
  return e.split("");
}
var Da = "\\ud800-\\udfff", Cu = "\\u0300-\\u036f", Tu = "\\ufe20-\\ufe2f", Au = "\\u20d0-\\u20ff", xu = Cu + Tu + Au, Du = "\\ufe0e\\ufe0f", Mu = "[" + Da + "]", An = "[" + xu + "]", xn = "\\ud83c[\\udffb-\\udfff]", Iu = "(?:" + An + "|" + xn + ")", Ma = "[^" + Da + "]", Ia = "(?:\\ud83c[\\udde6-\\uddff]){2}", Pa = "[\\ud800-\\udbff][\\udc00-\\udfff]", Pu = "\\u200d", Ra = Iu + "?", ja = "[" + Du + "]?", Ru = "(?:" + Pu + "(?:" + [Ma, Ia, Pa].join("|") + ")" + ja + Ra + ")*", ju = ja + Ra + Ru, Fu = "(?:" + [Ma + An + "?", An, Ia, Pa, Mu].join("|") + ")", Eu = RegExp(xn + "(?=" + xn + ")|" + Fu + ju, "g");
function Nu(e) {
  return e.match(Eu) || [];
}
function Lu(e) {
  return xa(e) ? Nu(e) : Ou(e);
}
function ku(e) {
  return function(t) {
    t = Kt(t);
    var n = xa(t) ? Lu(t) : void 0, r = n ? n[0] : t.charAt(0), a = n ? gu(n, 1).join("") : t.slice(1);
    return r[e]() + a;
  };
}
var Bu = ku("toUpperCase");
const Uu = Bu;
function Vu(e) {
  return Uu(Kt(e).toLowerCase());
}
function Hu(e, t, n, r) {
  var a = -1, s = e == null ? 0 : e.length;
  for (r && s && (n = e[++a]); ++a < s; )
    n = t(n, e[a], a, e);
  return n;
}
function qu(e) {
  return function(t) {
    return e == null ? void 0 : e[t];
  };
}
var zu = {
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
}, Yu = qu(zu);
const Gu = Yu;
var Ku = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g, Wu = "\\u0300-\\u036f", Zu = "\\ufe20-\\ufe2f", Ju = "\\u20d0-\\u20ff", Qu = Wu + Zu + Ju, Xu = "[" + Qu + "]", ec = RegExp(Xu, "g");
function tc(e) {
  return e = Kt(e), e && e.replace(Ku, Gu).replace(ec, "");
}
var nc = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g;
function rc(e) {
  return e.match(nc) || [];
}
var ac = /[a-z][A-Z]|[A-Z]{2}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/;
function sc(e) {
  return ac.test(e);
}
var Fa = "\\ud800-\\udfff", oc = "\\u0300-\\u036f", ic = "\\ufe20-\\ufe2f", lc = "\\u20d0-\\u20ff", uc = oc + ic + lc, Ea = "\\u2700-\\u27bf", Na = "a-z\\xdf-\\xf6\\xf8-\\xff", cc = "\\xac\\xb1\\xd7\\xf7", fc = "\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf", dc = "\\u2000-\\u206f", pc = " \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000", La = "A-Z\\xc0-\\xd6\\xd8-\\xde", bc = "\\ufe0e\\ufe0f", ka = cc + fc + dc + pc, Ba = "['’]", Sr = "[" + ka + "]", gc = "[" + uc + "]", Ua = "\\d+", mc = "[" + Ea + "]", Va = "[" + Na + "]", Ha = "[^" + Fa + ka + Ua + Ea + Na + La + "]", hc = "\\ud83c[\\udffb-\\udfff]", vc = "(?:" + gc + "|" + hc + ")", yc = "[^" + Fa + "]", qa = "(?:\\ud83c[\\udde6-\\uddff]){2}", za = "[\\ud800-\\udbff][\\udc00-\\udfff]", pt = "[" + La + "]", Sc = "\\u200d", wr = "(?:" + Va + "|" + Ha + ")", wc = "(?:" + pt + "|" + Ha + ")", $r = "(?:" + Ba + "(?:d|ll|m|re|s|t|ve))?", _r = "(?:" + Ba + "(?:D|LL|M|RE|S|T|VE))?", Ya = vc + "?", Ga = "[" + bc + "]?", $c = "(?:" + Sc + "(?:" + [yc, qa, za].join("|") + ")" + Ga + Ya + ")*", _c = "\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])", Oc = "\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])", Cc = Ga + Ya + $c, Tc = "(?:" + [mc, qa, za].join("|") + ")" + Cc, Ac = RegExp([
  pt + "?" + Va + "+" + $r + "(?=" + [Sr, pt, "$"].join("|") + ")",
  wc + "+" + _r + "(?=" + [Sr, pt + wr, "$"].join("|") + ")",
  pt + "?" + wr + "+" + $r,
  pt + "+" + _r,
  Oc,
  _c,
  Ua,
  Tc
].join("|"), "g");
function xc(e) {
  return e.match(Ac) || [];
}
function Dc(e, t, n) {
  return e = Kt(e), t = n ? void 0 : t, t === void 0 ? sc(e) ? xc(e) : rc(e) : e.match(t) || [];
}
var Mc = "['’]", Ic = RegExp(Mc, "g");
function Pc(e) {
  return function(t) {
    return Hu(Dc(tc(t).replace(Ic, "")), e, "");
  };
}
var Rc = Pc(function(e, t, n) {
  return t = t.toLowerCase(), e + (n ? Vu(t) : t);
});
const jc = Rc;
function Fc() {
  this.__data__ = new Qe(), this.size = 0;
}
function Ec(e) {
  var t = this.__data__, n = t.delete(e);
  return this.size = t.size, n;
}
function Nc(e) {
  return this.__data__.get(e);
}
function Lc(e) {
  return this.__data__.has(e);
}
var kc = 200;
function Bc(e, t) {
  var n = this.__data__;
  if (n instanceof Qe) {
    var r = n.__data__;
    if (!Lt || r.length < kc - 1)
      return r.push([e, t]), this.size = ++n.size, this;
    n = this.__data__ = new Xe(r);
  }
  return n.set(e, t), this.size = n.size, this;
}
function Ee(e) {
  var t = this.__data__ = new Qe(e);
  this.size = t.size;
}
Ee.prototype.clear = Fc;
Ee.prototype.delete = Ec;
Ee.prototype.get = Nc;
Ee.prototype.has = Lc;
Ee.prototype.set = Bc;
function Uc(e, t) {
  return e && _t(t, Gt(t), e);
}
function Vc(e, t) {
  return e && _t(t, Ot(t), e);
}
var Ka = typeof exports == "object" && exports && !exports.nodeType && exports, Or = Ka && typeof module == "object" && module && !module.nodeType && module, Hc = Or && Or.exports === Ka, Cr = Hc ? Le.Buffer : void 0, Tr = Cr ? Cr.allocUnsafe : void 0;
function Wa(e, t) {
  if (t)
    return e.slice();
  var n = e.length, r = Tr ? Tr(n) : new e.constructor(n);
  return e.copy(r), r;
}
function qc(e, t) {
  for (var n = -1, r = e == null ? 0 : e.length, a = 0, s = []; ++n < r; ) {
    var o = e[n];
    t(o, n, e) && (s[a++] = o);
  }
  return s;
}
function Za() {
  return [];
}
var zc = Object.prototype, Yc = zc.propertyIsEnumerable, Ar = Object.getOwnPropertySymbols, Gc = Ar ? function(e) {
  return e == null ? [] : (e = Object(e), qc(Ar(e), function(t) {
    return Yc.call(e, t);
  }));
} : Za;
const Wn = Gc;
function Kc(e, t) {
  return _t(e, Wn(e), t);
}
var Wc = Object.getOwnPropertySymbols, Zc = Wc ? function(e) {
  for (var t = []; e; )
    Gn(t, Wn(e)), e = Kn(e);
  return t;
} : Za;
const Ja = Zc;
function Jc(e, t) {
  return _t(e, Ja(e), t);
}
function Qa(e, t, n) {
  var r = t(e);
  return we(e) ? r : Gn(r, n(e));
}
function Dn(e) {
  return Qa(e, Gt, Wn);
}
function Xa(e) {
  return Qa(e, Ot, Ja);
}
var Qc = ct(Le, "DataView");
const Mn = Qc;
var Xc = ct(Le, "Promise");
const In = Xc;
var ef = ct(Le, "Set");
const ht = ef;
var xr = "[object Map]", tf = "[object Object]", Dr = "[object Promise]", Mr = "[object Set]", Ir = "[object WeakMap]", Pr = "[object DataView]", nf = ut(Mn), rf = ut(Lt), af = ut(In), sf = ut(ht), of = ut(Tn), at = Je;
(Mn && at(new Mn(new ArrayBuffer(1))) != Pr || Lt && at(new Lt()) != xr || In && at(In.resolve()) != Dr || ht && at(new ht()) != Mr || Tn && at(new Tn()) != Ir) && (at = function(e) {
  var t = Je(e), n = t == tf ? e.constructor : void 0, r = n ? ut(n) : "";
  if (r)
    switch (r) {
      case nf:
        return Pr;
      case rf:
        return xr;
      case af:
        return Dr;
      case sf:
        return Mr;
      case of:
        return Ir;
    }
  return t;
});
const kt = at;
var lf = Object.prototype, uf = lf.hasOwnProperty;
function cf(e) {
  var t = e.length, n = new e.constructor(t);
  return t && typeof e[0] == "string" && uf.call(e, "index") && (n.index = e.index, n.input = e.input), n;
}
var ff = Le.Uint8Array;
const nn = ff;
function Zn(e) {
  var t = new e.constructor(e.byteLength);
  return new nn(t).set(new nn(e)), t;
}
function df(e, t) {
  var n = t ? Zn(e.buffer) : e.buffer;
  return new e.constructor(n, e.byteOffset, e.byteLength);
}
var pf = /\w*$/;
function bf(e) {
  var t = new e.constructor(e.source, pf.exec(e));
  return t.lastIndex = e.lastIndex, t;
}
var Rr = Re ? Re.prototype : void 0, jr = Rr ? Rr.valueOf : void 0;
function gf(e) {
  return jr ? Object(jr.call(e)) : {};
}
function es(e, t) {
  var n = t ? Zn(e.buffer) : e.buffer;
  return new e.constructor(n, e.byteOffset, e.length);
}
var mf = "[object Boolean]", hf = "[object Date]", vf = "[object Map]", yf = "[object Number]", Sf = "[object RegExp]", wf = "[object Set]", $f = "[object String]", _f = "[object Symbol]", Of = "[object ArrayBuffer]", Cf = "[object DataView]", Tf = "[object Float32Array]", Af = "[object Float64Array]", xf = "[object Int8Array]", Df = "[object Int16Array]", Mf = "[object Int32Array]", If = "[object Uint8Array]", Pf = "[object Uint8ClampedArray]", Rf = "[object Uint16Array]", jf = "[object Uint32Array]";
function Ff(e, t, n) {
  var r = e.constructor;
  switch (t) {
    case Of:
      return Zn(e);
    case mf:
    case hf:
      return new r(+e);
    case Cf:
      return df(e, n);
    case Tf:
    case Af:
    case xf:
    case Df:
    case Mf:
    case If:
    case Pf:
    case Rf:
    case jf:
      return es(e, n);
    case vf:
      return new r();
    case yf:
    case $f:
      return new r(e);
    case Sf:
      return bf(e);
    case wf:
      return new r();
    case _f:
      return gf(e);
  }
}
function ts(e) {
  return typeof e.constructor == "function" && !Vn(e) ? oi(Kn(e)) : {};
}
var Ef = "[object Map]";
function Nf(e) {
  return je(e) && kt(e) == Ef;
}
var Fr = yt && yt.isMap, Lf = Fr ? Hn(Fr) : Nf;
const kf = Lf;
var Bf = "[object Set]";
function Uf(e) {
  return je(e) && kt(e) == Bf;
}
var Er = yt && yt.isSet, Vf = Er ? Hn(Er) : Uf;
const Hf = Vf;
var qf = 1, zf = 2, Yf = 4, ns = "[object Arguments]", Gf = "[object Array]", Kf = "[object Boolean]", Wf = "[object Date]", Zf = "[object Error]", rs = "[object Function]", Jf = "[object GeneratorFunction]", Qf = "[object Map]", Xf = "[object Number]", as = "[object Object]", ed = "[object RegExp]", td = "[object Set]", nd = "[object String]", rd = "[object Symbol]", ad = "[object WeakMap]", sd = "[object ArrayBuffer]", od = "[object DataView]", id = "[object Float32Array]", ld = "[object Float64Array]", ud = "[object Int8Array]", cd = "[object Int16Array]", fd = "[object Int32Array]", dd = "[object Uint8Array]", pd = "[object Uint8ClampedArray]", bd = "[object Uint16Array]", gd = "[object Uint32Array]", ue = {};
ue[ns] = ue[Gf] = ue[sd] = ue[od] = ue[Kf] = ue[Wf] = ue[id] = ue[ld] = ue[ud] = ue[cd] = ue[fd] = ue[Qf] = ue[Xf] = ue[as] = ue[ed] = ue[td] = ue[nd] = ue[rd] = ue[dd] = ue[pd] = ue[bd] = ue[gd] = !0;
ue[Zf] = ue[rs] = ue[ad] = !1;
function It(e, t, n, r, a, s) {
  var o, i = t & qf, l = t & zf, u = t & Yf;
  if (n && (o = a ? n(e, r, a, s) : n(e)), o !== void 0)
    return o;
  if (!$e(e))
    return e;
  var g = we(e);
  if (g) {
    if (o = cf(e), !i)
      return ba(e, o);
  } else {
    var b = kt(e), h = b == rs || b == Jf;
    if (Et(e))
      return Wa(e, i);
    if (b == as || b == ns || h && !a) {
      if (o = l || h ? {} : ts(e), !i)
        return l ? Jc(e, Vc(o, e)) : Kc(e, Uc(o, e));
    } else {
      if (!ue[b])
        return a ? e : {};
      o = Ff(e, b, i);
    }
  }
  s || (s = new Ee());
  var m = s.get(e);
  if (m)
    return m;
  s.set(e, o), Hf(e) ? e.forEach(function(d) {
    o.add(It(d, t, n, d, e, s));
  }) : kf(e) && e.forEach(function(d, y) {
    o.set(y, It(d, t, n, y, e, s));
  });
  var c = u ? l ? Xa : Dn : l ? Ot : Gt, f = g ? void 0 : c(e);
  return vi(f || e, function(d, y) {
    f && (y = d, d = e[y]), Bn(o, y, It(d, t, n, y, e, s));
  }), o;
}
var md = 1, hd = 4;
function vt(e) {
  return It(e, md | hd);
}
var vd = "__lodash_hash_undefined__";
function yd(e) {
  return this.__data__.set(e, vd), this;
}
function Sd(e) {
  return this.__data__.has(e);
}
function Bt(e) {
  var t = -1, n = e == null ? 0 : e.length;
  for (this.__data__ = new Xe(); ++t < n; )
    this.add(e[t]);
}
Bt.prototype.add = Bt.prototype.push = yd;
Bt.prototype.has = Sd;
function wd(e, t) {
  for (var n = -1, r = e == null ? 0 : e.length; ++n < r; )
    if (t(e[n], n, e))
      return !0;
  return !1;
}
function ss(e, t) {
  return e.has(t);
}
var $d = 1, _d = 2;
function os(e, t, n, r, a, s) {
  var o = n & $d, i = e.length, l = t.length;
  if (i != l && !(o && l > i))
    return !1;
  var u = s.get(e), g = s.get(t);
  if (u && g)
    return u == t && g == e;
  var b = -1, h = !0, m = n & _d ? new Bt() : void 0;
  for (s.set(e, t), s.set(t, e); ++b < i; ) {
    var c = e[b], f = t[b];
    if (r)
      var d = o ? r(f, c, b, t, e, s) : r(c, f, b, e, t, s);
    if (d !== void 0) {
      if (d)
        continue;
      h = !1;
      break;
    }
    if (m) {
      if (!wd(t, function(y, p) {
        if (!ss(m, p) && (c === y || a(c, y, n, r, s)))
          return m.push(p);
      })) {
        h = !1;
        break;
      }
    } else if (!(c === f || a(c, f, n, r, s))) {
      h = !1;
      break;
    }
  }
  return s.delete(e), s.delete(t), h;
}
function Od(e) {
  var t = -1, n = Array(e.size);
  return e.forEach(function(r, a) {
    n[++t] = [a, r];
  }), n;
}
function Jn(e) {
  var t = -1, n = Array(e.size);
  return e.forEach(function(r) {
    n[++t] = r;
  }), n;
}
var Cd = 1, Td = 2, Ad = "[object Boolean]", xd = "[object Date]", Dd = "[object Error]", Md = "[object Map]", Id = "[object Number]", Pd = "[object RegExp]", Rd = "[object Set]", jd = "[object String]", Fd = "[object Symbol]", Ed = "[object ArrayBuffer]", Nd = "[object DataView]", Nr = Re ? Re.prototype : void 0, wn = Nr ? Nr.valueOf : void 0;
function Ld(e, t, n, r, a, s, o) {
  switch (n) {
    case Nd:
      if (e.byteLength != t.byteLength || e.byteOffset != t.byteOffset)
        return !1;
      e = e.buffer, t = t.buffer;
    case Ed:
      return !(e.byteLength != t.byteLength || !s(new nn(e), new nn(t)));
    case Ad:
    case xd:
    case Id:
      return $t(+e, +t);
    case Dd:
      return e.name == t.name && e.message == t.message;
    case Pd:
    case jd:
      return e == t + "";
    case Md:
      var i = Od;
    case Rd:
      var l = r & Cd;
      if (i || (i = Jn), e.size != t.size && !l)
        return !1;
      var u = o.get(e);
      if (u)
        return u == t;
      r |= Td, o.set(e, t);
      var g = os(i(e), i(t), r, a, s, o);
      return o.delete(e), g;
    case Fd:
      if (wn)
        return wn.call(e) == wn.call(t);
  }
  return !1;
}
var kd = 1, Bd = Object.prototype, Ud = Bd.hasOwnProperty;
function Vd(e, t, n, r, a, s) {
  var o = n & kd, i = Dn(e), l = i.length, u = Dn(t), g = u.length;
  if (l != g && !o)
    return !1;
  for (var b = l; b--; ) {
    var h = i[b];
    if (!(o ? h in t : Ud.call(t, h)))
      return !1;
  }
  var m = s.get(e), c = s.get(t);
  if (m && c)
    return m == t && c == e;
  var f = !0;
  s.set(e, t), s.set(t, e);
  for (var d = o; ++b < l; ) {
    h = i[b];
    var y = e[h], p = t[h];
    if (r)
      var v = o ? r(p, y, h, t, e, s) : r(y, p, h, e, t, s);
    if (!(v === void 0 ? y === p || a(y, p, n, r, s) : v)) {
      f = !1;
      break;
    }
    d || (d = h == "constructor");
  }
  if (f && !d) {
    var S = e.constructor, _ = t.constructor;
    S != _ && "constructor" in e && "constructor" in t && !(typeof S == "function" && S instanceof S && typeof _ == "function" && _ instanceof _) && (f = !1);
  }
  return s.delete(e), s.delete(t), f;
}
var Hd = 1, Lr = "[object Arguments]", kr = "[object Array]", Jt = "[object Object]", qd = Object.prototype, Br = qd.hasOwnProperty;
function zd(e, t, n, r, a, s) {
  var o = we(e), i = we(t), l = o ? kr : kt(e), u = i ? kr : kt(t);
  l = l == Lr ? Jt : l, u = u == Lr ? Jt : u;
  var g = l == Jt, b = u == Jt, h = l == u;
  if (h && Et(e)) {
    if (!Et(t))
      return !1;
    o = !0, g = !1;
  }
  if (h && !g)
    return s || (s = new Ee()), o || qn(e) ? os(e, t, n, r, a, s) : Ld(e, t, l, n, r, a, s);
  if (!(n & Hd)) {
    var m = g && Br.call(e, "__wrapped__"), c = b && Br.call(t, "__wrapped__");
    if (m || c) {
      var f = m ? e.value() : e, d = c ? t.value() : t;
      return s || (s = new Ee()), a(f, d, n, r, s);
    }
  }
  return h ? (s || (s = new Ee()), Vd(e, t, n, r, a, s)) : !1;
}
function Qn(e, t, n, r, a) {
  return e === t ? !0 : e == null || t == null || !je(e) && !je(t) ? e !== e && t !== t : zd(e, t, n, r, Qn, a);
}
var Yd = 1, Gd = 2;
function Kd(e, t, n, r) {
  var a = n.length, s = a, o = !r;
  if (e == null)
    return !s;
  for (e = Object(e); a--; ) {
    var i = n[a];
    if (o && i[2] ? i[1] !== e[i[0]] : !(i[0] in e))
      return !1;
  }
  for (; ++a < s; ) {
    i = n[a];
    var l = i[0], u = e[l], g = i[1];
    if (o && i[2]) {
      if (u === void 0 && !(l in e))
        return !1;
    } else {
      var b = new Ee();
      if (r)
        var h = r(u, g, l, e, t, b);
      if (!(h === void 0 ? Qn(g, u, Yd | Gd, r, b) : h))
        return !1;
    }
  }
  return !0;
}
function is(e) {
  return e === e && !$e(e);
}
function Wd(e) {
  for (var t = Gt(e), n = t.length; n--; ) {
    var r = t[n], a = e[r];
    t[n] = [r, a, is(a)];
  }
  return t;
}
function ls(e, t) {
  return function(n) {
    return n == null ? !1 : n[e] === t && (t !== void 0 || e in Object(n));
  };
}
function Zd(e) {
  var t = Wd(e);
  return t.length == 1 && t[0][2] ? ls(t[0][0], t[0][1]) : function(n) {
    return n === e || Kd(n, e, t);
  };
}
function Jd(e, t) {
  return e != null && t in Object(e);
}
function Qd(e, t, n) {
  t = Wt(t, e);
  for (var r = -1, a = t.length, s = !1; ++r < a; ) {
    var o = it(t[r]);
    if (!(s = e != null && n(e, o)))
      break;
    e = e[o];
  }
  return s || ++r != a ? s : (a = e == null ? 0 : e.length, !!a && Un(a) && cn(o, a) && (we(e) || Ft(e)));
}
function Xd(e, t) {
  return e != null && Qd(e, t, Jd);
}
var ep = 1, tp = 2;
function np(e, t) {
  return zn(e) && is(t) ? ls(it(e), t) : function(n) {
    var r = We(n, e);
    return r === void 0 && r === t ? Xd(n, e) : Qn(t, r, ep | tp);
  };
}
function rp(e) {
  return function(t) {
    return t == null ? void 0 : t[e];
  };
}
function ap(e) {
  return function(t) {
    return gn(t, e);
  };
}
function sp(e) {
  return zn(e) ? rp(it(e)) : ap(e);
}
function op(e) {
  return typeof e == "function" ? e : e == null ? un : typeof e == "object" ? we(e) ? np(e[0], e[1]) : Zd(e) : sp(e);
}
function ip(e) {
  return function(t, n, r) {
    for (var a = -1, s = Object(t), o = r(t), i = o.length; i--; ) {
      var l = o[e ? i : ++a];
      if (n(s[l], l, s) === !1)
        break;
    }
    return t;
  };
}
var lp = ip();
const us = lp;
function up(e, t) {
  return e && us(e, t, Gt);
}
var cp = function() {
  return Le.Date.now();
};
const $n = cp;
var fp = "Expected a function", dp = Math.max, pp = Math.min;
function cs(e, t, n) {
  var r, a, s, o, i, l, u = 0, g = !1, b = !1, h = !0;
  if (typeof e != "function")
    throw new TypeError(fp);
  t = fr(t) || 0, $e(n) && (g = !!n.leading, b = "maxWait" in n, s = b ? dp(fr(n.maxWait) || 0, t) : s, h = "trailing" in n ? !!n.trailing : h);
  function m(C) {
    var $ = r, O = a;
    return r = a = void 0, u = C, o = e.apply(O, $), o;
  }
  function c(C) {
    return u = C, i = setTimeout(y, t), g ? m(C) : o;
  }
  function f(C) {
    var $ = C - l, O = C - u, T = t - $;
    return b ? pp(T, s - O) : T;
  }
  function d(C) {
    var $ = C - l, O = C - u;
    return l === void 0 || $ >= t || $ < 0 || b && O >= s;
  }
  function y() {
    var C = $n();
    if (d(C))
      return p(C);
    i = setTimeout(y, f(C));
  }
  function p(C) {
    return i = void 0, h && r ? m(C) : (r = a = void 0, o);
  }
  function v() {
    i !== void 0 && clearTimeout(i), u = 0, r = l = a = i = void 0;
  }
  function S() {
    return i === void 0 ? o : p($n());
  }
  function _() {
    var C = $n(), $ = d(C);
    if (r = arguments, a = this, l = C, $) {
      if (i === void 0)
        return c(l);
      if (b)
        return clearTimeout(i), i = setTimeout(y, t), m(l);
    }
    return i === void 0 && (i = setTimeout(y, t)), o;
  }
  return _.cancel = v, _.flush = S, _;
}
var fs = Object.prototype, bp = fs.hasOwnProperty, gp = ha(function(e, t) {
  e = Object(e);
  var n = -1, r = t.length, a = r > 2 ? t[2] : void 0;
  for (a && va(t[0], t[1], a) && (r = 1); ++n < r; )
    for (var s = t[n], o = Ot(s), i = -1, l = o.length; ++i < l; ) {
      var u = o[i], g = e[u];
      (g === void 0 || $t(g, fs[u]) && !bp.call(e, u)) && (e[u] = s[u]);
    }
  return e;
});
const nt = gp;
function Pn(e, t, n) {
  (n !== void 0 && !$t(e[t], n) || n === void 0 && !(t in e)) && fn(e, t, n);
}
function mp(e) {
  return je(e) && dn(e);
}
function Rn(e, t) {
  if (!(t === "constructor" && typeof e[t] == "function") && t != "__proto__")
    return e[t];
}
function hp(e) {
  return _t(e, Ot(e));
}
function vp(e, t, n, r, a, s, o) {
  var i = Rn(e, n), l = Rn(t, n), u = o.get(l);
  if (u) {
    Pn(e, n, u);
    return;
  }
  var g = s ? s(i, l, n + "", e, t, o) : void 0, b = g === void 0;
  if (b) {
    var h = we(l), m = !h && Et(l), c = !h && !m && qn(l);
    g = l, h || m || c ? we(i) ? g = i : mp(i) ? g = ba(i) : m ? (b = !1, g = Wa(l, !0)) : c ? (b = !1, g = es(l, !0)) : g = [] : ye(l) || Ft(l) ? (g = i, Ft(i) ? g = hp(i) : (!$e(i) || Ue(i)) && (g = ts(l))) : b = !1;
  }
  b && (o.set(l, g), a(g, l, r, s, o), o.delete(l)), Pn(e, n, g);
}
function Xn(e, t, n, r, a) {
  e !== t && us(t, function(s, o) {
    if (a || (a = new Ee()), $e(s))
      vp(e, t, o, n, Xn, r, a);
    else {
      var i = r ? r(Rn(e, o), s, o + "", e, t, a) : void 0;
      i === void 0 && (i = s), Pn(e, o, i);
    }
  }, Ot);
}
var yp = ya(function(e, t, n, r) {
  Xn(e, t, n, r);
});
const Sp = yp;
function wp(e, t, n) {
  for (var r = -1, a = e == null ? 0 : e.length; ++r < a; )
    if (n(t, e[r]))
      return !0;
  return !1;
}
function $p(e) {
  var t = e == null ? 0 : e.length;
  return t ? e[t - 1] : void 0;
}
function _p(e) {
  return typeof e == "function" ? e : un;
}
var Op = "[object String]";
function Cp(e) {
  return typeof e == "string" || !we(e) && je(e) && Je(e) == Op;
}
function Tp(e, t) {
  return t.length < 2 ? e : gn(e, Aa(t, 0, -1));
}
var Ap = "[object Number]";
function bt(e) {
  return typeof e == "number" || je(e) && Je(e) == Ap;
}
function xp(e, t) {
  var n = {};
  return t = op(t), up(e, function(r, a, s) {
    fn(n, t(r, a, s), r);
  }), n;
}
var Dp = ya(function(e, t, n) {
  Xn(e, t, n);
});
const mn = Dp;
var Mp = Object.prototype, Ip = Mp.hasOwnProperty;
function Pp(e, t) {
  t = Wt(t, e);
  var n = -1, r = t.length;
  if (!r)
    return !0;
  for (; ++n < r; ) {
    var a = it(t[n]);
    if (a === "__proto__" && !Ip.call(e, "__proto__") || (a === "constructor" || a === "prototype") && n < r - 1)
      return !1;
  }
  var s = Tp(e, t);
  return s == null || delete s[it($p(t))];
}
function Rp(e) {
  return ye(e) ? void 0 : e;
}
var jp = 1, Fp = 2, Ep = 4, Np = lu(function(e, t) {
  var n = {};
  if (e == null)
    return n;
  var r = !1;
  t = da(t, function(s) {
    return s = Wt(s, e), r || (r = s.length > 1), s;
  }), _t(e, Xa(e), n), r && (n = It(n, jp | Fp | Ep, Rp));
  for (var a = t.length; a--; )
    Pp(n, t[a]);
  return n;
});
const Lp = Np;
function ds(e, t, n, r) {
  if (!$e(e))
    return e;
  t = Wt(t, e);
  for (var a = -1, s = t.length, o = s - 1, i = e; i != null && ++a < s; ) {
    var l = it(t[a]), u = n;
    if (l === "__proto__" || l === "constructor" || l === "prototype")
      return e;
    if (a != o) {
      var g = i[l];
      u = r ? r(g, l, i) : void 0, u === void 0 && (u = $e(g) ? g : cn(t[a + 1]) ? [] : {});
    }
    Bn(i, l, u), i = i[l];
  }
  return e;
}
function Ut(e, t, n) {
  return e == null ? e : ds(e, t, n);
}
var kp = "Expected a function";
function jn(e, t, n) {
  var r = !0, a = !0;
  if (typeof e != "function")
    throw new TypeError(kp);
  return $e(n) && (r = "leading" in n ? !!n.leading : r, a = "trailing" in n ? !!n.trailing : a), cs(e, t, {
    leading: r,
    maxWait: t,
    trailing: a
  });
}
var Bp = 1 / 0, Up = ht && 1 / Jn(new ht([, -0]))[1] == Bp ? function(e) {
  return new ht(e);
} : li;
const Vp = Up;
var Hp = 200;
function qp(e, t, n) {
  var r = -1, a = _i, s = e.length, o = !0, i = [], l = i;
  if (n)
    o = !1, a = wp;
  else if (s >= Hp) {
    var u = t ? null : Vp(e);
    if (u)
      return Jn(u);
    o = !1, a = ss, l = new Bt();
  } else
    l = t ? [] : i;
  e:
    for (; ++r < s; ) {
      var g = e[r], b = t ? t(g) : g;
      if (g = n || g !== 0 ? g : 0, o && b === b) {
        for (var h = l.length; h--; )
          if (l[h] === b)
            continue e;
        t && l.push(b), i.push(g);
      } else
        a(l, b, n) || (l !== i && l.push(b), i.push(g));
    }
  return i;
}
function zp(e) {
  return e && e.length ? qp(e) : [];
}
function Yp(e, t, n, r) {
  return ds(e, t, n(gn(e, t)), r);
}
function Gp(e, t, n) {
  return e == null ? e : Yp(e, t, _p(n));
}
const Kp = Q({
  name: "SuperListItem",
  inheritAttrs: !1,
  setup(e, { attrs: t, slots: n }) {
    return () => {
      var r;
      return w("li", { ...t, class: ["sup-list-item", t.class] }, (r = n.default) == null ? void 0 : r.call(n));
    };
  }
}), Wp = Q({
  name: "SuperList",
  inheritAttrs: !1,
  props: {
    dataSource: { type: Array, default: () => [] }
  },
  setup(e, { attrs: t, slots: n }) {
    return () => w("section", { ...t, class: ["sup-list", t.class] }, [
      n.header && w("header", { class: "sup-list-header" }, n.header()),
      w(
        "ul",
        { class: "sup-list-items" },
        e.dataSource.map((r, a) => {
          var s;
          return (s = n.renderItem) == null ? void 0 : s.call(n, { item: r, index: a });
        })
      )
    ]);
  }
}), Zp = {
  SpaceCompact: As,
  Form: xs,
  FormItem: Ds,
  Tooltip: Xt,
  Button: Dt,
  Space: rn,
  Card: Ms,
  Descriptions: Is,
  DescriptionsItem: Ps,
  SuperList: Wp,
  SuperListItem: Kp,
  Modal: an,
  Table: Rs,
  Tabs: js,
  TabPane: Fs,
  CollapsePanel: Es,
  Collapse: Ns,
  Input: Ls,
  InputNumber: ks,
  InputSearch: Bs,
  TextArea: Us,
  Select: Vs,
  Switch: Hs,
  DateRangePicker: qs,
  TimeRangePicker: zs,
  DatePicker: Ys,
  TimePicker: Gs,
  RadioButton: Jr,
  Radio: Qr,
  RadioGroup: Ks,
  Checkbox: Ws,
  CheckboxGroup: Zs,
  TreeSelect: Js,
  Row: et,
  Col: Pe,
  Upload: Xr,
  Tag: ea,
  CheckableTag: Qs,
  AutoComplete: Xs
}, Z = Zp;
function Jp(e) {
  Object.keys(e).forEach((t) => {
    const n = t;
    e[n] && (Z[n] = e[n]);
  });
}
function qe(e) {
  var t;
  return typeof e == "string" ? ((t = ge.customIcon) == null ? void 0 : t.call(ge, e)) || w("span", { class: "anticon " + e }) : e && w(e);
}
function ke(e) {
  const t = Ie("exaProvider", {}).data;
  return ee({ ...e || {}, formData: t });
}
function Vt(e, t) {
  const n = V(mt(e) ? e : !!e);
  return typeof e == "function" && st(() => {
    n.value = e(t);
  }), n;
}
function Ur(e, t) {
  return Vt(e, t);
}
function Fn(e, t) {
  const n = ee({});
  return e && st(() => {
    Object.assign(n, e(t));
  }), n;
}
function Qp(e = {}, t) {
  const n = {};
  return Object.keys(e).forEach((r) => {
    !e[r] || r === "onUpdate" || (r.match(/^on[A-Z]/) ? n[r] = (...a) => e[r](t, ...a) : r === "on" && Object.entries(e.on).forEach(([a, s]) => {
      const o = "on" + a.charAt(0).toUpperCase() + a.slice(1);
      n[o] = (...i) => s(t, ...i);
    }));
  }), n;
}
function ps({ option: e, model: t, effectData: n }, r) {
  const {
    type: a,
    field: s,
    endField: o,
    keepField: i,
    labelField: l,
    stringifyValue: u,
    valueToString: g,
    computed: b,
    value: h,
    onUpdate: m
  } = e, c = o ?? i, f = u ?? g, d = {}, y = e.vModelFields || {};
  if (l && (d.labelValue = J(() => We(t.parent, l)), d["onUpdate:labelValue"] = ($) => {
    const O = f ? $ == null ? void 0 : $.toString() : $;
    Ut(t.parent, l, O);
  }), Object.entries(y).forEach(([$, O]) => {
    var T;
    typeof O == "string" ? ((T = t.parent)[O] ?? (T[O] = void 0), d[$] = J(() => We(t.parent, O)), d[`onUpdate:${$}`] = (A) => {
      Ut(t.parent, O, A);
    }) : mt(O) ? (d[$] = O, d[`onUpdate:${$}`] = (A) => O.value = A) : d[$] = O;
  }), !s)
    return mt(h) && Object.assign(d, {
      value: h,
      "onUpdate:value": ($) => h.value = $
    }), d;
  r !== void 0 && (t.refData ?? (t.refData = Oe(r)));
  const p = Se(t, "refData"), v = V(), S = ($ = Oe(r)) => {
    v.value = $, p.value !== $ && r !== void 0 && (p.value = $);
  };
  Object.assign(d, {
    value: v,
    "onUpdate:value": S
  }), mt(h) && (W(p, ($) => h.value = $), W(h, S));
  let _ = Oe(t.refData), C;
  if (a.endsWith("Range") && c)
    v.value = [p.value, t.parent[c]], C = ($) => {
      const [O, T] = $ || [];
      p.value = O, _ = O, t.parent[c] = T;
    }, W([p, () => t.parent[c]], ($) => {
      v.value = $;
    });
  else if (f) {
    const $ = (O) => (O == null ? void 0 : O.toString().split(",")) || [];
    v.value = $(p.value), C = (O) => {
      const T = (O == null ? void 0 : O.toString()) || "";
      p.value = T, _ = T;
    }, W(p, (O) => {
      O !== _ && (v.value = $(O));
    });
  } else
    v.value = _, C = ($) => {
      p.value = $, _ = $;
    }, W(p, S, { flush: "sync" });
  return W(v, C, { flush: "sync" }), m && W(p, () => m(n)), b && W(
    // 使用ref让计算结果即使一样也会进行后面的赋值
    () => V(b(_, n)),
    ($) => C(P($)),
    { immediate: !0 }
  ), d;
}
function Ne({ option: e, effectData: t, inheritDisabled: n }) {
  const { type: r, dynamicAttrs: a, disabled: s, hidden: o, required: i } = e, l = Vt(o, t), u = Vt(i, t), g = n === void 0 && s === void 0 ? void 0 : J(() => {
    let f = Oe(n);
    return f || (typeof s == "function" ? f = !!s(t) : f = Oe(s)), f;
  }), b = Qp(e, t), h = typeof a == "function" ? { ...Ye(Fn(a, t)) } : {}, m = ae({ ...pe[r] }, { ...e.attrs }, b, h);
  return { attrs: mn({}, e.attrs, m, { disabled: g }), hidden: l, required: u };
}
function Vr(e, t = {}) {
  const n = new RegExp("{(\\w*)}", "g");
  return e.replace(n, (r, a) => t[a] || "");
}
const Hr = {
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
}, qr = {
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
function Xp(e, t, n, r) {
  let a;
  if (t)
    a = { type: e, len: t, message: "len" };
  else if (bt(n) && bt(r))
    a = { type: e, max: n, min: r, message: "range" };
  else if (bt(n))
    a = { type: e, max: n, message: "max" };
  else if (bt(r))
    a = { type: e, min: r, message: "min" };
  else
    return !1;
  return e === "number" ? (a.message = qr.number[a.message], a.transform = (s) => Number(s)) : a.message = qr.string[a.message], a;
}
function eb(e, t = "") {
  const { trigger: n, required: r, type: a = "string", len: s, max: o, min: i, pattern: l, validator: u, message: g } = e || {}, b = [];
  r && (a === "string" || a in Hr ? b.push({
    required: r,
    trigger: n,
    // validator: noEmpty,
    pattern: /^[\s\S]*.*[^\s][\s\S]*$/,
    // transform: (value) => value + '',
    // whitespace: true,
    message: g || `${t}不能为空！`
  }) : b.push({ required: r, trigger: n, message: g || `${t}不能为空！` }));
  const h = Hr[a];
  if (h) {
    const m = Vr(h.message, { label: t });
    b.push({ ...h, trigger: n, message: m });
  }
  if (l && b.push({ pattern: l, trigger: n, message: g }), s || bt(o) || bt(i)) {
    const m = Xp(a, s, o, i), c = Vr(m.message, { label: t, len: s, max: o, min: i });
    b.push({ ...m, trigger: n, message: c, type: a });
  }
  return u && b.push({ validator: u, trigger: n }), b;
}
function bs(e, t, n) {
  const { field: r, columns: a, subItems: s, initialValue: o, value: i } = e, l = e.endField ?? e.keepField ?? e.labelField, u = r ? r.split(".") : [], g = n.concat(u), b = u.splice(-1)[0], h = ee({
    refName: b,
    initialValue: o,
    fieldName: r,
    origin: t,
    parent: t,
    refData: t,
    propChain: g
  });
  return b ? (u.length && (h.parent = J(() => We(t.value, u))), h.refData = J({
    get: () => We(t.value, r),
    set: (m) => Ut(t.value, r, m)
  }), W(
    t,
    () => {
      h.refData ?? (h.refData = Oe(o) ?? Oe(i) ?? (a && [] || s && {})), l && Gp(h.parent, l, (m) => m);
    },
    { immediate: !0, flush: "sync" }
  )) : i && (h.refData = V(i), h.propChain = []), h;
}
const Ht = (e, t) => e == null ? void 0 : e.map((n) => n.validator ? { ...n, validator: async (a, ...s) => {
  const o = await n.validator({ ...a, ...t }, ...s);
  if (o === !1 || o instanceof Error)
    throw o;
} } : n);
function St(e, t, n = []) {
  const r = Se(t || {}), a = {}, s = /* @__PURE__ */ new Map();
  return e.forEach((o) => {
    if (typeof o != "object")
      return;
    const i = bs(o, r, n), { required: l, label: u, subItems: g, columns: b } = o;
    if ((o.rules || l) && i.propChain.length) {
      const h = o.rules || [], m = Array.isArray(h) ? h : [h];
      if (l) {
        const f = m[0];
        f ? f.required = l : m.push({ required: l });
      }
      let c = "string";
      if (i.refData) {
        const f = typeof i.refData;
        c = f === "object" && Array.isArray(i.refData) ? "array" : f;
      }
      i.rules = m.map((f) => eb({ type: c, ...f }, u)).flat(), a[i.propChain.join(".")] = i.rules;
    }
    if (g) {
      const h = St(g, Se(i, "refData"), i.propChain);
      Object.assign(a, h.rules), i.children = h.modelsMap;
    } else
      b && (i.listData = St(b));
    s.set(co(o), i);
  }), {
    rules: a,
    modelsMap: s
  };
}
function lt(e, t, n = [], r) {
  const a = Se(t || {}), s = {}, o = [...e].map(([i, l]) => {
    const { children: u, rules: g, listData: b } = l, h = r !== void 0 ? [...n, r] : n, m = bs(i, a, h);
    if (r !== void 0 && (m.index = r), m.rules = g, m.propChain.length && g && (s[m.propChain.join(".")] = g), u) {
      const { modelsMap: c, rules: f } = lt(u, Se(m, "refData"), m.propChain);
      Object.assign(s, f), m.children = c;
    }
    return b && (m.listData = b), [i, m];
  });
  return { modelsMap: new Map(o), rules: s };
}
function gs(e, t, n, r) {
  const { modelsMap: a, rules: s } = lt(e, t, n, r), o = [];
  return function i(l) {
    for (const [u, g] of l)
      o.push([u, g]), g.children && i(g.children);
  }(a), { modelsMap: new Map(o), rules: s };
}
const tb = (e, t) => Object.prototype.hasOwnProperty.call(e, t);
function er(e, t = {}, n = {}) {
  for (const [r, a] of Object.entries(e))
    Array.isArray(a) ? e[r] = vt((t == null ? void 0 : t[r]) ?? (n == null ? void 0 : n[r])) : Object.prototype.toString.call(a) === "[object Object]" ? er(a, t == null ? void 0 : t[r], n == null ? void 0 : n[r]) : e[r] = (t == null ? void 0 : t[r]) ?? (n == null ? void 0 : n[r]);
}
function ms(e, t, n = {}) {
  for (const [r, a] of Object.entries(e)) {
    if (!tb(t, r))
      continue;
    const s = t[r] ?? (n == null ? void 0 : n[r]);
    ye(a) && ye(s) ? ms(a, s, n == null ? void 0 : n[r]) : Array.isArray(s) || ye(s) ? e[r] = vt(s) : e[r] = s;
  }
}
function zr() {
  let e;
  return { promise: new Promise((n) => {
    e = n;
  }), resolve: e };
}
function hs() {
  const e = V();
  let t = zr(), n = !0;
  return W(e, (a) => {
    a ? (t.resolve(!0), n = !1) : n || (t = zr(), n = !0);
  }), [e, () => t.promise.then(() => e.value)];
}
function ce(e, t = {}) {
  return e ? typeof e == "function" ? e(t || {}, {}) : typeof e != "object" ? w("span", e) : w(e, { effectData: t }) : null;
}
function Ct(e, t, n) {
  const r = n || Ie("rootSlots", {}), a = {};
  return e && Object.entries(e).forEach(([s, o]) => {
    const i = typeof o == "string" ? r[o] : o;
    i && (a[s] = (l) => typeof i == "function" ? i({ ...t, ...l || {} }) : i);
  }), a;
}
const Yr = (e, t) => {
  const n = {};
  return e.vModelFields && Object.entries(e.vModelFields).forEach(([r, a]) => {
    n[r] = t[a];
  }), n;
}, Gr = (e, t, n) => ye(e) || !ye(e == null ? void 0 : e[0]) ? Object.entries(e).map(([r, a]) => ({ value: r, label: a })) : Array.isArray(e) ? e.map((r) => ({ label: r[t], value: r[n] })) : [], nb = (e, t, n) => {
  var l, u, g, b;
  const { options: r, dictName: a } = e, s = ((u = (l = e.attrs) == null ? void 0 : l.fieldNames) == null ? void 0 : u.label) || "label", o = ((b = (g = e.attrs) == null ? void 0 : g.fieldNames) == null ? void 0 : b.value) || "value", i = P(r);
  a && ge.dictApi ? ge.dictApi(a).then((h) => n.value = h) : typeof r == "function" ? Promise.resolve(r(t)).then((h) => {
    n.value = Gr(h, s, o);
  }).catch((h) => {
    console.warn("useOptionsLabel", h);
  }) : n.value = Gr(i, s, o);
}, Qt = ({ value: e, label: t = e, color: n, icon: r, tagViewer: a = !0 }) => {
  const s = { color: n, label: t, icon: r };
  if (a !== !0 || !n) {
    const o = a === !0 ? ge.tagViewer : a;
    if (typeof o == "function") {
      const i = o(e);
      ye(i) ? Object.assign(s, i) : s.color = i;
    } else if (Array.isArray(o) && ye(o[0])) {
      const i = o.find((l) => l.value == e);
      Object.assign(s, i);
    }
    s.color ?? (s.color = n || o[e] || e === !0 && "success" || e === !1 && "error" || "default");
  }
  return w(
    ea,
    { color: s.color },
    { default: () => s.label || e, icon: s.icon || (() => qe(s.icon)) }
  );
};
function Zt(e, t = {}) {
  const {
    type: n = "",
    viewRender: r,
    render: a,
    options: s,
    dictName: o,
    labelField: i,
    valueToNumber: l,
    tagViewer: u,
    initialValue: g
  } = e, b = e.endField ?? e.keepField, h = Ie("rootSlots", {}), m = r || n === "InfoSlot" && a, c = typeof m == "string" ? h[m] : m;
  if (m && !c)
    return !1;
  let f = !1;
  const d = (() => {
    var p, v;
    if (i)
      return ({ current: S } = t) => String(We(S, i) ?? "");
    if (b)
      return ({ current: S, text: _ } = t) => (_ || "") + " - " + (We(S, b) || "");
    if ((s || o) && n !== "AutoComplete") {
      f = !(u === !1 || !u && ge.tagViewer === !1);
      let S = e.labelAsValue ?? e.valueToLabel;
      (p = P(s)) != null && p[0] && !ye((v = P(s)) == null ? void 0 : v[0]) && !l && (S = !0);
      const _ = V();
      return (C = t, $) => {
        const O = [], T = (C.text || C.value) ?? Oe(g) ?? "";
        if (T === "")
          return "";
        if (S)
          return !$ && f ? Qt({ value: T, label: T, tagViewer: u }) : T;
        _.value || nb(e, C, _);
        const j = (Array.isArray(T) ? T : typeof T == "string" ? T.split(",") : [T]).map((E) => {
          var F;
          const L = (F = P(_)) == null ? void 0 : F.find(({ value: D }) => D == E);
          return !$ && f && O.push(Qt({ value: E, label: E, ...L, tagViewer: u })), L ? L.label : E;
        });
        return O.length ? O : j.join(",");
      };
    } else if (n === "Switch")
      return ({ text: S } = t) => (e.valueLabels || "否是")[S ?? Oe(g)];
  })(), y = !0;
  if (c)
    return (p = t) => {
      const v = Yr(e, p.current), {
        attrs: { disabled: S, ..._ }
      } = Ne({ option: e, effectData: p }), C = ee({
        props: { ..._, ...v },
        ...p,
        ...d && { text: J(() => d(p, y)) },
        isView: !0
      });
      return c(C);
    };
  if (u && !f)
    return (p = t) => {
      const v = p.text ?? Oe(g);
      return typeof v == "boolean" && u === !0 ? Qt({ label: v ? "是" : "否", color: v ? "success" : "error" }) : (Array.isArray(v) ? v : typeof v == "string" ? v.split(",") : [v]).map((C) => Qt({ value: C, tagViewer: u }));
    };
  if (n === "Text" && (e.attrs || e.dynamicAttrs))
    return (p = t) => {
      const v = (d == null ? void 0 : d(p)) || (p.value ?? Oe(g)), S = Fn(e.dynamicAttrs, p), _ = ae({ ...e.attrs, title: v }, S);
      return w("span", _, v);
    };
  if (n === "HTML")
    return (p = t) => {
      const v = Fn(e.dynamicAttrs, p), S = ae({ ...e.attrs, innerHTML: p.value }, v);
      return w("span", S);
    };
  if (n === "Textarea")
    return (p = t) => w("pre", { style: "white-space: break-spaces;" }, p.value ?? Oe(g));
  if (!d && (n === "Upload" || n.startsWith("Ext")))
    return (p = t) => {
      const v = Yr(e, p.current), S = Ct(e.slots, p, h), {
        attrs: { disabled: _, ...C }
      } = Ne({ option: e, effectData: p });
      return w(
        _e[n],
        ee({ option: e, effectData: p, ...C, ...v, value: p.value, isView: !0, disabled: _ }),
        S
      );
    };
  if (n === "Buttons") {
    const p = wt({ config: e, isView: !0 });
    return !!p && ((v = t) => p({ param: v }));
  } else
    return d;
}
const Tt = (e, t) => {
  const { title: n, label: r, labelSlot: a, tooltip: s } = e, o = s && (ye(s) ? s : { title: s }), i = n || a || r;
  return i === void 0 ? void 0 : () => [
    ce(i, t),
    s && w(Xt, o, {
      title: () => ce(s.title, t),
      default: () => w(
        "a",
        { class: "ant-typography ant-typography-secondary", style: { marginLeft: "4px" } },
        qe(s.icon || eo)
      )
    })
  ];
}, rb = /* @__PURE__ */ new Set([
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
]), ab = {
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
}, sb = /* @__PURE__ */ new Set(["Input", "InputNumber", "Textarea", "AutoComplete"]), ob = /* @__PURE__ */ new Set(["Select", "TreeSelect"]), ib = /* @__PURE__ */ new Set(["Select", "TreeSelect", "Radio", "Checkbox"]), lb = /* @__PURE__ */ new Set([
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
]), ub = /* @__PURE__ */ new Set(["table", "form", "description"]), cb = /* @__PURE__ */ new Set([
  "attrs",
  "dynamicAttrs",
  "dataSource",
  "initialValue",
  "options",
  "params",
  "rules",
  "treeData",
  "value"
]), ze = (e) => e !== null && typeof e == "object" && !Array.isArray(e), te = (e, t, n, r) => ({ level: e, code: t, path: n, message: r });
function En(e, t, n, r) {
  if (!(!e || typeof e != "object" || r.has(e))) {
    if (r.add(e), ze(e))
      for (const [a, s] of Object.entries(ab))
        Object.prototype.hasOwnProperty.call(e, a) && n.push(te("warning", "deprecated-api", `${t}.${a}`, `已废弃，${s}。`));
    for (const [a, s] of Object.entries(e))
      typeof s == "function" || cb.has(a) || (Array.isArray(s) ? s.forEach((o, i) => En(o, `${t}.${a}[${i}]`, n, r)) : ze(s) && En(s, `${t}.${a}`, n, r));
  }
}
function fb(e, t, n, r) {
  var l, u, g;
  if (!ze(e)) {
    typeof e != "string" && n.push(te("error", "invalid-item", t, "字段配置必须是对象。"));
    return;
  }
  const { type: a } = e;
  if (a !== void 0 && (typeof a != "string" || !rb.has(a) && !a.startsWith("Ext")) && n.push(te("error", "unknown-type", `${t}.type`, `未知字段类型 ${JSON.stringify(a)}。`)), a === void 0 && r !== "table" && n.push(te("warning", "missing-type", `${t}.type`, "表单或详情字段建议明确配置 type。")), Array.isArray(e.exclude)) {
    const b = e.exclude.filter((h) => !ub.has(h));
    b.length && n.push(
      te(
        "error",
        "invalid-exclude",
        `${t}.exclude`,
        `只支持 table、form、description，当前包含：${b.join("、")}。`
      )
    );
  } else
    e.exclude !== void 0 && n.push(te("error", "invalid-exclude", `${t}.exclude`, "exclude 必须是字符串数组。"));
  e.visibleIn !== void 0 && !["form", "detail", "both"].includes(e.visibleIn) && n.push(
    te("error", "invalid-visible-in", `${t}.visibleIn`, "visibleIn 只支持 'form'、'detail'、'both'。")
  ), e.unauthorized !== void 0 && !["hide", "disable"].includes(e.unauthorized) && n.push(
    te("error", "invalid-unauthorized", `${t}.unauthorized`, "unauthorized 只支持 'hide'、'disable'。")
  ), ib.has(a) && !e.options && !e.dictName && n.push(te("warning", "missing-options", t, `${a} 未配置 options 或 dictName。`));
  const s = (l = e.attrs) == null ? void 0 : l.placeholder, o = sb.has(a) ? `请输入${typeof e.label == "string" ? e.label : ""}` : ob.has(a) ? `请选择${typeof e.label == "string" ? e.label : ""}` : void 0;
  o !== void 0 && s === o && n.push(
    te("suggestion", "redundant-default", `${t}.attrs.placeholder`, "与内置 placeholder 相同，可以省略。")
  );
  const i = ["DatePicker", "DateRange"].includes(a) ? "YYYY-MM-DD" : ["TimePicker", "TimeRange"].includes(a) ? "HH:mm:ss" : void 0;
  i && ((u = e.attrs) == null ? void 0 : u.valueFormat) === i && n.push(
    te("suggestion", "redundant-default", `${t}.attrs.valueFormat`, "与内置 valueFormat 相同，可以省略。")
  ), a === "InputGroup" && ((g = e.attrs) == null ? void 0 : g.compact) === !0 && n.push(
    te("suggestion", "redundant-default", `${t}.attrs.compact`, "InputGroup 默认使用紧凑布局，可以省略。")
  ), e.block === !1 && !lb.has(a) && n.push(te("suggestion", "redundant-default", `${t}.block`, "block: false 是默认行为，可以省略。")), e.breakAfter === !1 && n.push(
    te("suggestion", "redundant-default", `${t}.breakAfter`, "breakAfter: false 是默认行为，可以省略。")
  ), (e.options || e.dictName) && e.tagViewer === !0 && n.push(
    te("suggestion", "redundant-default", `${t}.tagViewer`, "选项字段默认使用 Tag 展示，可以省略。")
  );
  for (const b of ["hidden", "disabled"])
    e[b] === !1 && n.push(te("suggestion", "redundant-default", `${t}.${b}`, `${b}: false 可以省略。`));
  Object.prototype.hasOwnProperty.call(e, "initialValue") && e.initialValue === void 0 && n.push(
    te("suggestion", "redundant-default", `${t}.initialValue`, "initialValue: undefined 可以省略。")
  );
  for (const b of ["attrs", "rowProps"])
    ze(e[b]) && Object.keys(e[b]).length === 0 && n.push(te("suggestion", "empty-config", `${t}.${b}`, `空的 ${b} 配置可以省略。`));
  for (const b of ["rules", "options"])
    Array.isArray(e[b]) && e[b].length === 0 && n.push(te("suggestion", "empty-config", `${t}.${b}`, `空的 ${b} 配置可以省略。`));
  e.subItems && gt(e.subItems, `${t}.subItems`, n, r === "table" ? "form" : r), e.columns && gt(e.columns, `${t}.columns`, n, "table");
}
function gt(e, t, n, r) {
  if (!Array.isArray(e)) {
    n.push(te("error", "invalid-items", t, "必须是数组。"));
    return;
  }
  const a = /* @__PURE__ */ new Map();
  e.forEach((s, o) => {
    const i = `${t}[${o}]`;
    fb(s, i, n, r), !(!ze(s) || typeof s.field != "string" || !s.field) && (a.has(s.field) ? n.push(
      te(
        "warning",
        "duplicate-field",
        `${i}.field`,
        `字段 ${s.field} 与 ${a.get(s.field)} 重复。`
      )
    ) : a.set(s.field, `${t}[${o}].field`));
  });
}
function db(e, t = "auto") {
  var a, s, o, i, l, u, g;
  const n = [];
  if (!ze(e))
    return [te("error", "invalid-schema", "schema", "schema 必须是对象。")];
  En(e, "schema", n, /* @__PURE__ */ new WeakSet());
  const r = t === "auto" ? Array.isArray(e.columns) ? "table" : "form" : t;
  if (!["form", "table", "detail"].includes(r))
    return [te("error", "invalid-schema-type", "schema", `未知 schema 类型 ${JSON.stringify(t)}。`)];
  if (e.subSpan === 8 && n.push(te("suggestion", "redundant-default", "schema.subSpan", "subSpan: 8 是默认值，可以省略。")), e.gutter === 16 && n.push(te("suggestion", "redundant-default", "schema.gutter", "gutter: 16 是默认值，可以省略。")), ze(e.params) && Object.keys(e.params).length === 0 && n.push(te("suggestion", "empty-config", "schema.params", "空的 params 配置可以省略。")), r === "table") {
    for (const b of ["editMode", "addMode"])
      Object.prototype.hasOwnProperty.call(e, b) && n.push(te("warning", "deprecated-api", `schema.${b}`, `已废弃，使用 rowEditor.${b}。`));
    Array.isArray(e.columns) ? gt(e.columns, "schema.columns", n, "table") : n.push(te("error", "missing-columns", "schema.columns", "表格必须配置 columns。")), e.immediate === !0 && n.push(
      te("suggestion", "redundant-default", "schema.immediate", "immediate: true 是默认值，可以省略。")
    ), e.pagination === !1 && n.push(
      te("suggestion", "redundant-default", "schema.pagination", "pagination: false 是默认值，可以省略。")
    ), ((a = e.attrs) == null ? void 0 : a.rowKey) === "id" && n.push(
      te("suggestion", "redundant-default", "schema.attrs.rowKey", "rowKey: 'id' 是默认值，可以省略。")
    ), ((s = e.attrs) == null ? void 0 : s.size) === "small" && n.push(
      te("suggestion", "redundant-default", "schema.attrs.size", "size: 'small' 是默认值，可以省略。")
    ), ((o = e.attrs) == null ? void 0 : o.tableLayout) === "fixed" && n.push(
      te(
        "suggestion",
        "redundant-default",
        "schema.attrs.tableLayout",
        "tableLayout: 'fixed' 是默认值，可以省略。"
      )
    ), ze(e.pagination) && e.pagination.current === 1 && n.push(
      te("suggestion", "redundant-default", "schema.pagination.current", "分页 current 默认是 1，可以省略。")
    ), ze(e.pagination) && e.pagination.pageSize === 10 && n.push(
      te("suggestion", "redundant-default", "schema.pagination.pageSize", "分页 pageSize 默认是 10，可以省略。")
    ), (i = e.searchForm) != null && i.subItems && gt(e.searchForm.subItems, "schema.searchForm.subItems", n, "form"), (u = (l = e.rowEditor) == null ? void 0 : l.form) != null && u.subItems && gt(e.rowEditor.form.subItems, "schema.rowEditor.form.subItems", n, "form");
  } else
    Array.isArray(e.subItems) ? (((g = e.attrs) == null ? void 0 : g.labelAlign) === "right" && n.push(
      te("suggestion", "redundant-default", "schema.attrs.labelAlign", "labelAlign: 'right' 是默认值，可以省略。")
    ), gt(e.subItems, "schema.subItems", n, r)) : n.push(te("error", "missing-sub-items", "schema.subItems", "表单或详情必须配置 subItems。"));
  return n;
}
function pb(e, t = "auto") {
  return db(e, t);
}
function qt(e, t, n) {
  var a, s;
  const r = pb(e, t);
  return r.length && ((a = console.groupCollapsed) == null || a.call(console, `[antdv-superform] ${n} schema 诊断：${r.length} 项`), r.forEach(({ level: o, path: i, message: l }) => {
    const u = `[antdv-superform] ${i}: ${l}`;
    o === "error" ? console.error(u) : o === "warning" ? console.warn(u) : console.info(u);
  }), (s = console.groupEnd) == null || s.call(console)), r;
}
const bb = () => mn(
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
  ge.defaultButtons
);
function gb(e) {
  const t = bb();
  return Object.keys(e).forEach((n) => {
    t[n] ? typeof e[n] == "function" ? t[n].onClick = e[n] : mn(t[n], { attrs: { title: t[n].label } }, e[n]) : t[n] = e[n];
  }), t;
}
function mb(e, t = {}, n = {}) {
  const r = gb(t), a = [];
  return Array.isArray(e) && e.forEach((s) => {
    const o = typeof s == "string" ? s : s.name, { onClick: i, ...l } = r[o] || {};
    l.attrs = nt({ ...n }, l.attrs), typeof s == "object" && Object.assign(l, s, { attrs: { ...l.attrs, ...s.attrs } });
    const u = V(!1), g = l.attrs.loading, b = mt(g);
    !b && g && (l.attrs.loading = u);
    const h = (d) => {
      b || (u.value = d ? g : !1);
    }, m = { label: l.label, ...s.meta }, c = s.onClick, f = (d, y, p) => {
      d ? an.confirm({
        title: () => ce(d, p),
        okText: "确定",
        cancelText: "取消",
        ...pe.Modal,
        onOk: y
      }) : (h(!0), Promise.resolve(y()).finally(() => {
        h(!1);
      }));
    };
    l.onClick = (d) => {
      const y = { ...d, meta: m };
      c && i ? f(
        l.confirmText,
        () => c(y, async (p) => i({ ...y, ...p })),
        d
      ) : f(l.confirmText, () => {
        var p;
        return (p = i || c) == null ? void 0 : p(y);
      }, d);
    }, a.push(l);
  }), a;
}
function hb(e, t, n) {
  const { size: r, buttonShape: a, buttonType: s, limit: o, hidden: i, disabled: l, actions: u } = e, g = e.unauthorized ?? (e.invalidDisabled || e.roleMode === "disable" ? "disable" : e.roleMode && "hide"), b = e.labelMode === "icon", h = { size: r, type: s, shape: a }, m = Ur(l, t), c = Vt(i, t);
  let f = mb(u, n, h);
  if (ge.buttonRoles) {
    const S = ge.buttonRoles();
    f = f.filter((_) => {
      if (!(!_.roleName || S.includes(_.roleName)))
        if ((_.unauthorized ?? (_.invalidDisabled || _.roleMode === "disable" ? "disable" : _.roleMode && "hide") ?? g ?? "hide") === "disable")
          _.disabled = !0;
        else
          return !1;
      return !0;
    });
  }
  const d = Ie("rootSlots", {}), y = f.map((S) => {
    const _ = Vt(S.hidden, t), C = S.disabled !== void 0 ? Ur(S.disabled, t) : m, $ = (E) => {
      var L;
      (E.domEvent || E).stopPropagation(), (L = S.onClick) == null || L.call(S, { ...t, e: E });
    }, O = S.color && `ant-btn-${S.color}`, T = S.dropdown && J(() => {
      const E = Oe(S.dropdown);
      return ye(E) ? Object.entries(E).map(([L, F]) => ({ value: L, label: F })) : typeof E[0] != "object" ? zp(E).map((L) => ({ value: L, label: L })) : E;
    }), A = typeof S.customRender == "string" ? d[S.customRender] : S.customRender, j = J(() => {
      const E = C.value && S.disabledTooltip ? S.disabledTooltip : S.tooltip || (b && S.icon ? S.label : void 0);
      return typeof E == "function" ? E(t) : E;
    });
    return {
      isHide: _,
      render: A,
      menu: T,
      ...S,
      tooltipTitle: j,
      onClick: $,
      attrs: { ...h, class: O, ...S.attrs, disabled: C }
    };
  }), p = V([]), v = V([]);
  return st(() => {
    const S = c.value ? [] : y.filter(({ isHide: _ }) => !_.value);
    if (p.value = S, o != null) {
      const _ = b && S.length === o + 1 ? o + 1 : o;
      p.value = S.slice(0, _), v.value = S.slice(_);
    }
  }), { btns: p, moreBtns: v, defaultAttrs: h };
}
const Ve = /* @__PURE__ */ Q({
  __name: "ButtonGroup",
  props: {
    option: {},
    methods: {},
    effectData: {}
  },
  setup(e) {
    const t = e, { option: n, methods: r, effectData: a } = t, s = Array.isArray(n) ? { actions: n } : n, { attrs: o, moreLabel: i, divider: l, buttonType: u } = s, g = s.labelMode === "icon", b = s.labelMode === "label", { btns: h, moreBtns: m, defaultAttrs: c } = hb(s, ee(a || {}), r || s.methods), f = l ?? ((o == null ? void 0 : o.direction) !== "vertical" && ["link", "text"].includes(u || ""));
    return (d, y) => (q(), X(P(rn), ae({
      class: "sup-buttons",
      onClick: y[0] || (y[0] = fo(() => {
      }, ["stop"])),
      size: P(f) ? 0 : "small"
    }, P(o)), {
      default: ie(() => [
        (q(!0), ve(Ce, null, Ge(P(h), ({ attrs: p, icon: v, label: S, tooltipTitle: _, dropdownProp: C, menu: $, render: O, onClick: T }, A) => (q(), ve(Ce, { key: S }, [
          Me(P(Xt), { title: _ }, {
            default: ie(() => [
              $ ? (q(), X(P(nr), ae({
                key: 0,
                disabled: p.disabled
              }, { ref_for: !0 }, C), {
                popupRender: ie(() => [
                  Me(P(rr), { onClick: T }, {
                    default: ie(() => [
                      (q(!0), ve(Ce, null, Ge($, (j) => (q(), X(P(ar), {
                        key: j.value,
                        disabled: j.disabled
                      }, kn({
                        default: ie(() => [
                          (q(), X(De(() => P(ce)(j.label, P(a)))))
                        ]),
                        _: 2
                      }, [
                        j.icon ? {
                          name: "icon",
                          fn: ie(() => [
                            (q(), X(De(P(qe)(j.icon))))
                          ]),
                          key: "0"
                        } : void 0
                      ]), 1032, ["disabled"]))), 128))
                    ]),
                    _: 2
                  }, 1032, ["onClick"])
                ]),
                default: ie(() => [
                  Me(P(Dt), ae({ ref_for: !0 }, p), {
                    default: ie(() => [
                      v ? (q(), X(De(P(qe)(v)), { key: 0 })) : Fe("", !0),
                      (q(), X(De(() => P(ce)(S, P(a))))),
                      Me(P(ta))
                    ]),
                    _: 2
                  }, 1040)
                ]),
                _: 2
              }, 1040, ["disabled"])) : O ? (q(), X(De(() => O({ props: p, ...P(a) })), { key: 1 })) : (q(), X(P(Dt), ae({
                key: 2,
                ref_for: !0
              }, p, { onClick: T }), {
                default: ie(() => [
                  v && !b ? (q(), X(De(P(qe)(v)), { key: 0 })) : Fe("", !0),
                  !v || !g ? (q(), X(De(() => P(ce)(S, P(a))), { key: 1 })) : Fe("", !0)
                ]),
                _: 2
              }, 1040, ["onClick"]))
            ]),
            _: 2
          }, 1032, ["title"]),
          P(f) && A < P(h).length - 1 ? (q(), X(P(to), {
            key: 0,
            type: "vertical",
            class: "buttons-divider"
          })) : Fe("", !0)
        ], 64))), 128)),
        P(m).length ? (q(), X(P(nr), { key: 0 }, {
          popupRender: ie(() => [
            Me(P(rr), null, {
              default: ie(() => [
                (q(!0), ve(Ce, null, Ge(P(m), ({ attrs: p, icon: v, label: S, tooltipTitle: _, onClick: C }) => (q(), X(P(ar), {
                  key: S,
                  disabled: p.disabled
                }, {
                  default: ie(() => [
                    Me(P(Xt), { title: _ }, {
                      default: ie(() => [
                        Me(P(Dt), ae({ block: "" }, { ref_for: !0 }, p, {
                          shape: "",
                          onClick: C
                        }), {
                          default: ie(() => [
                            v ? (q(), X(De(P(qe)(v)), { key: 0 })) : Fe("", !0),
                            (q(), X(De(() => P(ce)(S, P(a)))))
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
          default: ie(() => [
            Me(P(Dt), ra(aa(P(c))), {
              default: ie(() => [
                P(i) ? (q(), X(De(() => P(ce)(P(i), P(a))), { key: 0 })) : (q(), X(P(no), { key: 1 }))
              ]),
              _: 1
            }, 16)
          ]),
          _: 1
        })) : Fe("", !0)
      ]),
      _: 1
    }, 16, ["size"]));
  }
});
function wt({ config: e, methods: t, effectData: n, isView: r }) {
  const a = Array.isArray(e) ? { actions: e } : e, s = (a == null ? void 0 : a.visibleIn) ?? (a == null ? void 0 : a.validOn);
  if (!a || r && s === "form" || !r && s === "detail")
    return;
  let o = a.actions || [];
  if (s || (a.actions = o = o.filter((i) => {
    if (typeof i == "string")
      return !r;
    {
      const l = i.visibleIn ?? i.validOn;
      return r ? l !== "form" : l !== "detail";
    }
  })), o.length !== 0)
    return (i = {}) => w(Ve, { option: a, methods: t, effectData: n, ...i });
}
const tr = Q({
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
    return tt(e.name, e.data || {}), t.slots.default;
  }
}), Ze = Q({
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
  setup(e, t) {
    const { type: n, attrs: r, gutter: a = 16, subSpan: s } = e.option, o = { gutter: a, ...e.option.rowProps, ...t.attrs }, i = Ie("inheritOptions", {}), l = s ?? i.subSpan, u = J(() => e.model.index), g = [];
    let b;
    const h = [...e.model.children];
    for (let f = 0; f < h.length; f++) {
      const [d, y] = h[f], { type: p, align: v, span: S, hideInForm: _, exclude: C, editable: $ } = d, O = d.block ?? d.blocked, T = d.breakAfter ?? d.wrapping, { parent: A, refData: j } = le(y), E = ke({
        parent: e.effectData,
        current: A,
        field: y.refName,
        value: j,
        ...u.value !== void 0 && {
          index: u,
          record: y.refName ? A : j
        }
      });
      if (p === "Hidden" || (C ? C.includes("form") : _)) {
        ps({ option: d, model: y, effectData: E });
        continue;
      }
      const { hidden: L, required: F, attrs: D } = Ne({
        option: d,
        effectData: E,
        inheritDisabled: i.disabled
      });
      if (p === "Fragment") {
        y.children && h.splice(
          f + 1,
          0,
          ...[...y.children].map(([G, se]) => [{ ...G, hidden: L, disabled: D.disabled }, se])
        );
        continue;
      }
      let x = hn(d, y, E, D);
      if (!x)
        continue;
      if (gg.includes(p) && $ !== void 0 && $ !== !0) {
        const G = x, se = J(() => Ue($) ? $(E) : $), oe = Zt(d, ee({ ...Ye(E), isView: !0 }));
        x = () => se.value ? G() : oe ? oe() : j.value;
      }
      const M = { ...d.colProps, span: S };
      if (nt(M, { span: l }, pe.Col, { span: 8 }), (M.span === 0 || M.flex) && (M.span = void 0), n === "InputGroup" && (r == null ? void 0 : r.compact) !== !1) {
        const G = Number(M.span) && (100 / (24 / M.span)).toFixed(2) + "%";
        g.push(() => !L.value && w(x, ae({ style: { width: G } }, M)));
        continue;
      }
      let I = x;
      const H = [...Yt, "InputList", "InputGroup"].includes(p);
      if (!H && (!O || d.field && d.label)) {
        const G = Ht(y.rules, E), se = J(
          () => P(D.disabled) ? void 0 : !d.required || F.value ? G : G.slice(1)
        ), oe = ae(pe.FormItem, d.formItemProps), be = Tt(d, E);
        I = () => w(Z.FormItem, ee({ ...oe, name: y.propChain, rules: se, colon: !!be }), {
          default: x,
          label: be
        });
      }
      if (H) {
        const G = {
          required: F,
          disabled: D.disabled,
          subSpan: d.subSpan ?? l
        };
        I = () => w(tr, { name: "inheritOptions", data: G }, x);
      }
      const R = O ?? (Yt.includes(p) && !d.span), z = v && `text-align: ${v}`;
      R ? (b = void 0, g.push(
        () => !L.value && w(
          "div",
          {
            class: ["sup-form-section", p === "Descriptions" && "sup-detail"],
            style: z,
            key: f,
            ...t.attrs
          },
          I()
        )
      )) : (p === "InputList" && (M.span = S ?? 24), b || g.push(b = []), b.push(() => !L.value && w(Pe, ae({ style: z, key: f }, M), I)), T && (b = void 0));
    }
    let m = !1;
    const c = () => g.map((f, d) => Array.isArray(f) ? (m = !0, w(et, o, () => f.map((y) => y()))) : f());
    return () => e.option.isContainer && m ? w(_e.Group, { class: "sup-form-section", ...t.attrs, ...e }, { innerContent: c }) : c();
  }
});
function hn(e, t, n, r) {
  const { type: a, render: s } = e;
  if (!a)
    return;
  const o = Ie("rootSlots", {}), i = Ct(e.slots, n), l = s ? typeof s == "function" ? s : o[s] : _e[a];
  let u;
  if (a === "InfoSlot")
    u = l && (() => l({ props: r, ...n }));
  else if (a === "Text")
    u = () => w("span", r, t.refData);
  else if (a === "HTML")
    u = () => w("span", { ...r, innerHTML: t.refData });
  else if (a === "Buttons")
    u = () => w(Ve, { option: e, effectData: n, ...r });
  else if (Yt.includes(a) || a === "InputList")
    u = () => w(_e[a], ee({ option: e, model: t, effectData: n, ...r }), i);
  else {
    const g = ps({ option: e, model: t, effectData: n }), b = { ...r, ...g };
    l ? a === "InputSlot" ? u = () => l == null ? void 0 : l(ee({ props: b, ...n })) : a.startsWith("Ext") ? u = () => w(l, ee({ option: e, effectData: n, ...b }), i) : u = () => w(l, ee({ option: e, model: t, effectData: n, ...b }), i) : console.error(`组件 '${a}' 配置错误，请检查名称或'render'是否正确！`);
  }
  return u;
}
const vb = Q({
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
    const n = Se(e, "source"), { modelsMap: r } = lt(e.modelsMap, n);
    return tt("exaProvider", { data: Se(e, "source") }), () => {
      var a;
      return w(
        "div",
        { class: ["sup-form-section sup-detail", ((a = t.attrs) == null ? void 0 : a.isContainer) && "sup-container"] },
        w(_e.Descriptions, {
          option: e.option,
          model: { children: r },
          effectData: ee({ current: n }),
          isView: !0
        })
      );
    };
  }
}), yb = Q({
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
    const t = Ie("gridConfig", {}), { subSpan: n, column: r } = e.config, {
      layout: a,
      bordered: s,
      mode: o = s && "table",
      labelBgColor: i,
      borderColor: l,
      rowProps: u,
      colon: g,
      size: b = "middle",
      tableLayout: h,
      ...m
    } = t;
    let c = r || (Number(n) ? Math.floor(24 / n) : t.column);
    c ?? (c = Number(t.subSpan) ? Math.floor(24 / t.subSpan) : 2);
    function f() {
      const y = [];
      let p = [], v = 0;
      return e.items.forEach(({ option: S, label: _, content: C, hidden: $ }, O) => {
        if (P($))
          return;
        const { span: T = S.span } = S.descriptionsProps || {};
        let A = Number(T) ? Math.ceil(T / (24 / c)) : 1;
        A = A > c ? c : A;
        const j = { ...m, ...S.formItemProps, ...S.descriptionsProps }, E = { ...j.labelAlign && { textAlign: j.labelAlign }, ...j.labelStyle }, L = {
          labelCol: ae(j.labelCol, { style: E, class: { "sup-label-no-colon": j.noColon } }),
          wrapperCol: ae(
            { style: a === "vertical" && { textAlign: j.labelAlign } },
            { style: j.contentStyle },
            j.wrapperCol
          ),
          option: S,
          attrs: j,
          span: T,
          label: _,
          content: C,
          colspan: A
        };
        if (o === "table")
          if (v + A <= c)
            v += A, p.push(L);
          else {
            if (y.push(p), v < c) {
              const F = c - v;
              p[p.length - 1].colspan += F;
            }
            v = A, p = [L];
          }
        else
          p.push(L);
        (S.breakAfter ?? S.wrapping) && (y.push(p), v = 0, p = []), O === e.items.length - 1 && p.length && y.push(p);
      }), y;
    }
    const d = J(() => f());
    if (o === "table") {
      let y = "";
      l && (y += `--descriptions-border-color:${l};`), i && (y += `--descriptions-bg-color:${i};`);
      const p = () => a === "vertical" ? d.value.flatMap((v) => [
        (v.length > 1 || v[0].label) && w(
          "tr",
          { class: "ant-descriptions-row" },
          v.map(
            (S) => {
              var _;
              return w(
                "th",
                ae(
                  {
                    class: "ant-descriptions-item-label",
                    colspan: S.colspan,
                    style: `width: ${(S.span / 24 * 100).toFixed(2)}%`
                  },
                  { class: S.labelCol.class, style: S.labelCol.style }
                ),
                (_ = S.label) == null ? void 0 : _.call(S)
              );
            }
          )
        ),
        w(
          "tr",
          { class: "ant-descriptions-row" },
          v.map(
            (S) => w(
              "td",
              ae(
                { class: "ant-descriptions-item-content", colspan: S.colspan },
                { class: S.wrapperCol.class, style: S.wrapperCol.style }
              ),
              S.content()
            )
          )
        )
      ]) : (
        // 横向排列
        d.value.map(
          (v, S) => w(
            "tr",
            { class: "ant-descriptions-row" },
            v.flatMap(
              (_) => _.label ? [
                w(
                  "th",
                  ae(
                    { class: "ant-descriptions-item-label" },
                    { class: _.labelCol.class, style: _.labelCol.style }
                  ),
                  _.label()
                ),
                w(
                  "td",
                  ae(
                    {
                      class: "ant-descriptions-item-content",
                      style: _.wrapperCol.style,
                      colspan: _.colspan * 2 - 1
                    },
                    { class: _.wrapperCol.class }
                  ),
                  _.content()
                )
              ] : [
                w(
                  "td",
                  {
                    class: "ant-descriptions-item-content",
                    style: _.wrapperCol.style,
                    colspan: _.colspan * 2
                  },
                  _.content()
                )
              ]
            )
          )
        )
      );
      return () => w(
        "div",
        {
          style: y,
          class: ["ant-descriptions", "ant-descriptions-bordered", b !== "default" && "ant-descriptions-" + b]
        },
        w("div", { class: "ant-descriptions-view" }, w("table", { style: { tableLayout: h } }, p()))
      );
    } else {
      const y = () => d.value.map(
        (p) => w(
          et,
          { class: "ant-descriptions-row", ...u },
          () => p.map(({ option: v, content: S, span: _, label: C, labelCol: $, wrapperCol: O, attrs: T }) => {
            const A = { span: _, ...T.colProps || v.colProps };
            return A.span === 0 || A.flex ? A.span = void 0 : Number(A.span) || (A.span = t.column ? 24 / t.column : t.subSpan), w(
              Pe,
              A,
              () => w(et, { class: ["ant-descriptions-item-container"] }, () => [
                C && w(
                  Pe,
                  ae({ class: "ant-descriptions-item-label" }, $),
                  () => w("label", {}, C())
                ),
                w(
                  Pe,
                  { class: "ant-descriptions-item-content", ...O },
                  () => !T.noInput && o === "form" && C !== void 0 ? w("div", { class: "sup-descriptions-item-input" }, S()) : S()
                )
              ])
            );
          })
        )
      );
      return () => w(
        "div",
        {
          class: [
            "ant-descriptions",
            a === "vertical" && "ant-descriptions-vertical",
            o === "form" ? "sup-descriptions-mode-form" : "sup-descriptions-default",
            g === !1 && "ant-descriptions-item-no-colon",
            b && b !== "default" && "ant-descriptions-" + b
          ]
        },
        w("div", { class: "ant-descriptions-view" }, y())
      );
    }
  }
}), rt = Q({
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
    var y;
    const s = Ie("exaProvider", {}).attrs, o = Ie("gridConfig", s), i = {
      ...pe.Descriptions,
      ...o
    }, l = nt({ gutter: e.gutter }, e.rowProps || i.rowProps, pe.row, {
      gutter: 16
    }), u = { subSpan: e.subSpan, ...e.descriptionsProps, ...a.attrs }, g = nt(
      {
        subSpan: e.subSpan ?? i.subSpan,
        rowProps: l,
        ...u
      },
      i
    ), b = g.subSpan ?? (g.subSpan = ((y = pe.Col) == null ? void 0 : y.span) ?? 12), h = Nn(t, e, r), m = [];
    let c, f;
    h.forEach((p, v) => {
      p.node ?? (p.node = () => w(yb, { config: u, items: p.group, class: u.class })), p.isBlock ? (p.group || p.option.type === "InputList" ? (f || (f = [], m.push(["section", f])), f.push(p)) : (m.push(["block", p]), f = void 0), c = void 0) : (!c && m.push(["row", c = []]), c.push(p), f = void 0);
    });
    const d = () => w(
      tr,
      { name: "gridConfig", data: g },
      () => m.map(([p, v], S) => {
        let _ = v.node;
        return p === "row" ? _ = () => w(
          et,
          l,
          () => v.map((C, $) => {
            const O = C.option.colProps || { span: C.option.span ?? b };
            return !P(C.hidden) && w(Pe, { ...pe.Col, ...O, key: $ }, C.node);
          })
        ) : p === "section" && (_ = () => v.map((C) => !P(C.hidden) && C.node())), !P(v.hidden) && (m.length > 1 ? w("div", { class: "sup-form-section", key: S }, _()) : _());
      })
    );
    return n ? () => w(
      _e.Group,
      ae(
        { class: "sup-form-section" },
        {
          option: e,
          model: {},
          effectData: ke({}),
          isView: !0,
          ...u
        }
      ),
      { innerContent: d }
    ) : d;
  }
});
function Nn(e, t, n) {
  const r = [];
  let a;
  const s = Ie("rootSlots", {});
  return [...e].forEach(([o, i], l) => {
    var A, j, E;
    const { type: u = "", field: g, hideInDescription: b, viewRender: h, exclude: m } = o;
    if (u === "Hidden" || b || m != null && m.includes("description"))
      return;
    const { parent: c, refData: f } = Ye(i), d = ke({
      parent: n,
      current: c,
      isView: !0,
      field: i.refName,
      value: f,
      text: f,
      ..."index" in i && { index: i.index, record: g ? f : c }
    }), { attrs: y, hidden: p } = Ne({ option: o, effectData: d }), v = Ct(o.slots, d), S = Tt(o, d);
    let _ = o.block ?? o.blocked, C;
    const $ = [], O = typeof h == "string" ? s[h] : h;
    C = O && (() => ce(O, d));
    const T = i.children || ((A = i.listData) == null ? void 0 : A.modelsMap);
    if (u === "InputGroup") {
      if (!h) {
        let L = o.breakAfter ?? o.wrapping;
        const D = (j = Nn(T, o, d)[0].group) == null ? void 0 : j.map(({ option: x, content: M }) => {
          const I = x.labelSlot || x.label, H = (y == null ? void 0 : y.compact) === !1 && I;
          return L = (x.breakAfter ?? x.wrapping) || L, () => w("span", [H && ce(I, d), H && ": ", M == null ? void 0 : M()]);
        });
        C = () => w(rn, { direction: L ? "vertical" : "horizontal" }, () => D == null ? void 0 : D.map((x) => x()));
      }
      $.push({ option: o, label: S, hidden: p, content: C });
    } else if (u === "Fragment") {
      const L = Nn(T, o, d), F = L[0].group;
      F && (L.shift(), $.push(...F.map((D) => ({ ...D, hidden: p })))), L.length && (a = void 0, r.push(...L));
    } else if (i.children || i.listData || Yt.includes(u)) {
      _ ?? (_ = !o.span);
      const L = [...Yt, "InputList"].includes(u) ? u : "Group", F = _e[L], D = () => w(F, ee({ option: o, model: i, effectData: d, isView: !0, ...pe[L], ...y }), v);
      C ?? (C = D), u === "InputList" && (!_ || S && !(y != null && y.labelIndex) ? $.push({
        option: { ...o },
        label: S,
        hidden: p,
        content: C
      }) : C = D);
    } else {
      const L = Sb(o, i, d);
      L && $.push({ option: o, label: S, hidden: p, content: L });
    }
    if (!(!$.length && !C))
      if ($.length && !_)
        a || (a = [], r.push({ option: t, isBlock: !0, group: a })), a.push(...$);
      else {
        if ($.length && S)
          r.push({ option: t, isBlock: _, group: $ });
        else {
          const L = o.align && { textAlign: o.align };
          C = ((E = $[0]) == null ? void 0 : E.content) || C, r.push({ option: o, isBlock: _, node: () => w(C, { style: L }), hidden: p });
        }
        a = void 0;
      }
  }), r;
}
function Sb(e, t, n) {
  const { parent: r, refData: a } = Ye(t), s = t.refName ? a : void 0, o = le(r.value) === le(n.current) ? n : ke({ parent: n, current: r, text: s, value: s, field: t.refName, isView: !0 }), i = Zt(e, o);
  return i === !1 ? void 0 : () => i ? i() : String(t.refData ?? "");
}
const _n = Q({
  inheritAttrs: !1,
  props: {
    option: { type: Object, required: !0 },
    model: { type: Object, required: !0 },
    effectData: Object,
    isView: Boolean
  },
  setup({ option: e, model: t, effectData: n, isView: r }, a) {
    const { type: s, label: o, title: i = o, buttons: l, contentAttrs: u } = e, g = s === "Descriptions" || r;
    let b;
    if (l) {
      const S = Array.isArray(l) ? { actions: l } : l;
      s === "Descriptions" && (S.visibleIn ?? (S.visibleIn = S.validOn ?? "detail")), b = wt({ config: S, effectData: n, isView: g });
    }
    const { style: h, class: m, ...c } = a.attrs, f = {
      ...a.slots,
      title: i ? Tt(e, n) : void 0,
      actions: b,
      default: () => w(
        "div",
        u,
        a.slots.innerContent ? a.slots.innerContent(c) : g ? w(rt, {
          option: { descriptionsProps: c, ...e },
          modelsMap: t.children,
          effectData: n,
          ...c
        }) : w(Ze, { option: e, model: t, effectData: n, ...c })
      )
    }, d = e.component && le(e.component);
    let y, p;
    const v = l == null ? void 0 : l.align;
    return b && (l.placement === "bottom" ? p = () => w("div", { class: "sup-bottom-buttons", style: { textAlign: v || "center" } }, b()) : y = () => w(
      Pe,
      { class: "sup-title-buttons", flex: 1, style: { textAlign: v || (i ? "right" : void 0) } },
      b
    )), d ? () => w(d, {}, f) : () => w("div", ae({ class: m, style: h }, { class: "sup-group" }), [
      (i || y) && w(et, { align: "middle", class: "sup-titlebar" }, () => [
        i && w(Pe, { class: "sup-title" }, f.title),
        y == null ? void 0 : y()
      ]),
      f.default(),
      p && p()
    ]);
  }
}), wb = {
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
    var $;
    const a = V(), s = V({}), {
      option: { onSubmit: o, onReset: i, buttons: l, ...u },
      ignoreRules: g,
      compact: b
    } = e, h = ee({ formData: s, current: s }), { attrs: m } = Ne({ option: u, effectData: h }), c = /* @__PURE__ */ new Set(), f = (O) => {
      O && c.add(O);
    };
    tt("exaProvider", {
      data: sa(s),
      attrs: m,
      onSubmit: f
    }), tt("inheritOptions", {
      disabled: m.disabled,
      subSpan: u.subSpan
    });
    const d = (O) => Promise.all(
      [...c, o].map(async (T) => {
        const A = await (T == null ? void 0 : T(O));
        return A === !1 || A && A.errMessage ? Promise.reject({ message: A && A.errMessage }) : A;
      })
    );
    g && Object.assign(m, { hideRequiredMark: !0, validateTrigger: "none" });
    const y = {
      dataSource: s,
      submit: () => a.value.validate().then((...O) => d(s.value).then(
        () => {
          const T = vt(s.value);
          return n("submit", T), T;
        },
        (T) => (typeof T == "object" && T.message && Ln.error(T.message), Promise.reject(T))
      )),
      setFieldsValue(O) {
        var T;
        return (T = a.value) == null || T.clearValidate(), ms(s.value, O, S);
      },
      resetFields(O = {}) {
        var A;
        er(s.value, O, S), (A = a.value) == null || A.clearValidate();
        const T = vt(s.value);
        return i == null || i(T), n("reset", T), T;
      }
    }, p = Array.isArray(l) ? { actions: l } : l;
    ($ = p == null ? void 0 : p.actions) != null && $.length && (u.subItems = [
      ...u.subItems,
      {
        type: "InfoSlot",
        align: p.align || "center",
        block: !0,
        render: () => w(Ve, {
          option: p,
          methods: { submit: y.submit, reset: y.resetFields, search: y.submit },
          effectData: h
        }),
        ...p.placement === "inline" && { span: "auto", block: !1, align: p.align || "right" }
      }
    ]);
    const { modelsMap: v } = St(u.subItems, s), S = vt(s.value);
    W(
      () => P(e.dataSource ?? e.option.dataSource),
      (O) => {
        var T;
        O && ((T = a.value) == null || T.clearValidate(), s.value = O);
      },
      { immediate: !0, flush: "sync" }
    );
    const _ = ee({ ...y }), C = (O) => {
      if (!O) {
        n("register", null);
        return;
      }
      Object.assign(_, O, y), a.value = O, n("register", _);
    };
    return t(_), () => w(
      Z.Form,
      {
        ref: C,
        class: ["sup-form", b && "sup-form-compact", g && "sup-form-simple"],
        model: s.value,
        labelAlign: "right",
        ...m
      },
      {
        ...r,
        default: () => w(Ze, {
          option: u,
          model: { refData: s, children: v },
          effectData: h
        })
      }
    );
  }
}, $b = Q({
  inheritAttrs: !1,
  props: {
    option: { type: Object, required: !0 },
    model: { type: Object, required: !0 },
    effectData: Object,
    compact: { type: Boolean, default: !0 },
    disabled: void 0
  },
  setup(e, { attrs: t }) {
    var f;
    const { option: n, model: r, compact: a } = e, { field: s, slots: o } = n, i = V();
    let l = Ht(r.rules, e.effectData), u = r.propChain;
    const g = {};
    if (l)
      W(
        () => r.refData,
        () => {
          var d;
          return (d = i.value) == null ? void 0 : d.onFieldChange();
        },
        { deep: !0 }
      );
    else if (r.children && a) {
      const d = {
        type: "object",
        required: !1,
        fields: {}
      };
      for (const y of r.children.values())
        if (y.rules && y.fieldName) {
          y.rules[0].required && (d.required = !0);
          const p = ee({
            ...e.effectData,
            parent: e.effectData,
            current: y.parent,
            field: y.fieldName,
            value: y.refData
          });
          if (d.fields[y.fieldName] = Ht(y.rules, p), !r.refName) {
            u = y.propChain, l = d.fields[y.fieldName], W(
              () => P(y.refData),
              () => {
                var v;
                return (v = i.value) == null ? void 0 : v.onFieldChange();
              }
            );
            break;
          }
        }
      r.refName && (l = [d], W(
        () => r.refData,
        () => {
          var y;
          return (y = i.value) == null ? void 0 : y.onFieldChange();
        },
        { deep: !0 }
      ));
    } else
      g.style = "margin: 0";
    g.required = !!((f = l[0]) != null && f.required);
    const b = Ie("inheritOptions", {}), h = J(
      () => e.disabled ? void 0 : !n.required || P(b.required) ? l : l.slice(1)
    ), m = ae(pe.FormItem, n.formItemProps, g), c = Tt(n, e.effectData);
    return () => w(
      Z.FormItem,
      { ...m, rules: h.value, ref: i, name: u },
      {
        label: c,
        default: (o == null ? void 0 : o.default) || (() => w(
          a ? Z.SpaceCompact : Z.Space,
          ae(a ? { block: !0 } : {}, t),
          () => w(Ze, { option: n, model: r, effectData: e.effectData })
        ))
      }
    );
  }
});
let zt = (e = 21) => crypto.getRandomValues(new Uint8Array(e)).reduce((t, n) => (n &= 63, n < 36 ? t += n.toString(36) : n < 62 ? t += (n - 26).toString(36).toUpperCase() : n > 62 ? t += "-" : t += "_", t), "");
const _b = Q({
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
    const { model: t, option: n, isView: r, effectData: a, labelIndex: s } = e, { columns: o, rowButtons: i, label: l, labelSlot: u, compact: g, slots: b, ...h } = n, { modelsMap: m } = t.listData, c = o.length === 1 && o[0].field === "$index", f = !s && (l || u), d = Se(t, "refData");
    let y = 0;
    const p = {
      add: {
        onClick({ index: $ }) {
          d.value.splice($ + 1, 0, c ? void 0 : {}), d.value = [...le(d.value)];
        },
        icon: () => w(sn)
      },
      delete: {
        disabled: () => d.value.length === 1,
        confirmText: "",
        icon: () => w(na),
        onClick({ index: $ }) {
          d.value.splice($, 1), d.value = [...le(d.value)];
        }
      }
    }, v = !r && i !== !1 && {
      type: "Buttons",
      buttonType: "link",
      size: "small",
      colProps: { flex: "0" },
      labelMode: "icon",
      ...pe.rowButtons,
      methods: p,
      actions: ["add", "delete"],
      ...Array.isArray(i) ? { actions: i } : i
    }, S = /* @__PURE__ */ new WeakMap(), _ = Rt([]);
    W(
      () => d.value.map(($) => le($)),
      ($) => {
        $.length === 0 && d.value.push(c ? void 0 : {});
        const O = $.length ? $ : d.value.map((j) => le(j)), T = _.value;
        c && T.length !== O.length && (y += 1);
        const A = O.map((j, E) => {
          var F;
          const L = le(j);
          return L !== null && typeof L == "object" ? (S.has(L) || S.set(L, zt(12)), S.get(L)) : ((F = T[E]) == null ? void 0 : F.baseKey) ?? zt(12);
        });
        _.value = O.map((j, E) => {
          const L = Se(d.value, E), F = [...t.propChain, E], D = {
            index: E,
            parent: d,
            refData: L,
            propChain: F
          }, x = /* @__PURE__ */ new Map();
          let M;
          if (c)
            M = { ...o[0] }, x.set(M, {
              ...m.get(o[0]),
              ...D
            });
          else if (m.size === 1 || !o[0].field) {
            M = { subSpan: "auto", ...o[0], field: String(E) };
            const I = [...m.values()][0];
            x.set(M, {
              ...I,
              ...D,
              refName: String(E),
              children: lt(I.children || /* @__PURE__ */ new Map(), j, F).modelsMap
            });
          } else
            M = g ? {
              ...h,
              type: "InputGroup",
              initialValue: void 0,
              subSpan: n.subSpan ?? "auto",
              field: String(E)
            } : { type: "Group", span: "auto" }, x.set(M, {
              ...D,
              refName: String(E),
              children: lt(m, j, F).modelsMap
            });
          return s && (M.label ?? (M.label = l), M.labelSlot ?? (M.labelSlot = u || M.label + String(E + 1))), v && x.set(v, { parent: d, index: E }), {
            children: x,
            model: { parent: d, children: x, index: E },
            refData: L,
            baseKey: A[E],
            key: c ? `${String(A[E])}:${E}:${y}` : A[E]
            // effectData: reactive({ parent: effectData, current: orgList, index: idx, record: refData }),
          };
        });
      },
      {
        immediate: !0
      }
    );
    const C = () => _.value.map(({ model: $, key: O }) => w(Ze, { model: $, option: n, effectData: a, key: O }));
    if (r) {
      if (f)
        if (c) {
          const { label: T, labelSlot: A = T } = o[0], j = o[0].breakAfter ?? o[0].wrapping;
          return () => w(
            rn,
            { direction: j ? "vertical" : "horizontal" },
            () => _.value.map(({ refData: E, key: L }, F) => {
              const D = {
                ...a,
                parent: a,
                current: d.value,
                field: o[0].field,
                value: E.value,
                index: F,
                record: E.value
              };
              return w("span", { key: L }, [ce(A, D), A ? ": " : "", E.value]);
            })
          );
        } else
          return () => _.value.map(({ children: T, key: A }) => w(rt, {
            key: A,
            modelsMap: T,
            option: n,
            effectData: a
          }));
      const $ = {}, O = J(() => new Map(_.value.flatMap(({ children: T }) => [...T])));
      return () => w(rt, {
        option: { ...h, label: l, labelSlot: u },
        modelsMap: O.value,
        effectData: a,
        ...$
      });
    } else if (f) {
      const $ = /* @__PURE__ */ new Map([
        [
          {
            ...h,
            label: l,
            labelSlot: u,
            type: "InfoSlot",
            block: !1,
            render: C
          },
          t
        ]
      ]);
      return () => w(Ze, { model: { children: $ }, option: n, effectData: a });
    } else
      return C;
  }
}), Ob = /* @__PURE__ */ Q({
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
      label: a,
      title: s = a,
      buttons: o
    } = e;
    return () => w(Z.Card, {}, {
      title: s && (() => w("div", {
        class: "sup-title"
      }, ce(s, n))),
      extra: () => o && !r && w(Ve, {
        option: o,
        effectData: n
      }),
      default: () => r ? w(rt, {
        option: e,
        modelsMap: t.children,
        effectData: n
      }) : w(Ze, {
        option: e,
        model: t,
        effectData: n
      })
    });
  }
}), Cb = Q({
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
  setup({ model: e, option: t, isView: n, effectData: r }, a) {
    const { buttons: s, rowButtons: o, label: i, title: l = i } = t, { modelsMap: u, rules: g } = e.listData, { propChain: b } = e, h = Se(e, "refData"), m = oa(), c = m.rowKey || "id", f = () => {
      const O = { ...m };
      return delete O.rowKey, delete O.itemClass, delete O.itemStyle, O;
    }, d = {
      add() {
        h.value.push({});
      },
      delete({ record: O }) {
        const T = h.value.indexOf(O);
        h.value.splice(T, 1);
      }
    }, y = /* @__PURE__ */ new WeakMap(), p = V([]);
    W(
      () => [...h.value],
      (O) => {
        p.value = O.map((T, A) => {
          const j = le(T);
          y.has(j) || y.set(j, T[c] || zt(12));
          const E = y.get(j), { modelsMap: L } = lt(u, T, b, A);
          return {
            hash: E,
            model: { refData: V(T), children: L, index: A },
            effectData: ee({ parent: r, current: h, index: A, record: T })
          };
        });
      },
      {
        immediate: !0
      }
    );
    const v = { ...a.slots };
    if (v.title || (v.title = l && (() => ce(l, r))), s) {
      const O = s.targetSlot ?? s.forSlot ?? "extra", T = v[O], A = wt({
        config: s,
        effectData: r,
        methods: d,
        isView: n
      });
      (T || A) && (v[O] = () => [T == null ? void 0 : T(), A == null ? void 0 : A()]);
    }
    const { title: S, extra: _, ...C } = v;
    (S || _) && (C.header = () => w(et, { align: "middle" }, () => [
      S && w(Pe, { class: "sup-title", flex: 1 }, S),
      _ && w(Pe, { class: "sup-title-buttons", style: { textAlign: s == null ? void 0 : s.align } }, _)
    ]));
    const $ = o && {
      buttonType: "link",
      size: "small",
      ...pe.rowButtons,
      ...Array.isArray(o) ? { actions: o } : o
    };
    return C.renderItem = ({ item: O }) => w(
      Z.SuperListItem,
      { key: O.hash, class: m.itemClass, style: m.itemStyle },
      {
        default: () => {
          var T;
          return [
            n ? w(rt, { option: t, modelsMap: O.model.children, effectData: O.effectData }) : w(Ze, { model: O.model, option: t, class: "ant-list-item-meta", effectData: O.effectData }),
            $ && ((T = wt({
              config: $,
              methods: d,
              effectData: O.effectData,
              isView: n
            })) == null ? void 0 : T({ class: "ant-list-item-action" }))
          ];
        }
      }
    ), () => w(Z.SuperList, { ...f(), dataSource: p.value }, C);
  }
}), Tb = Q({
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
    const { model: n, isView: r, effectData: a, labelIndex: s, rowKey: o = "" } = e, { columns: i, rowButtons: l, slots: u, ...g } = e.option, { modelsMap: b, rules: h } = n.listData, { propChain: m } = n, c = Se(n, "refData"), f = {
      add: {
        icon: () => w(sn),
        onClick({ index: _ }) {
          c.value.splice(_ + 1, 0, {}), c.value = [...le(c.value)];
        }
      },
      delete: {
        hidden: () => c.value.length === 1,
        disabled: !1,
        confirmText: "",
        icon: () => w(na),
        onClick({ index: _ }) {
          c.value = c.value.filter((C, $) => $ !== _);
        }
      }
    }, d = !r && l !== !1 && {
      type: "Buttons",
      buttonType: "link",
      size: "small",
      labelMode: "icon",
      ...pe.rowButtons,
      methods: f,
      actions: ["add", "delete"],
      ...Array.isArray(l) ? { actions: l } : l
    }, y = /* @__PURE__ */ new WeakMap(), p = V([]);
    W(
      c,
      (_) => {
        _.length === 0 && _.push({}), p.value = _.map((C, $) => {
          const O = le(C);
          y.has(O) || y.set(O, C[o] || zt(12));
          const { modelsMap: T } = lt(b, C, m, $);
          return {
            key: y.get(O),
            model: { refData: V(C), children: T, index: $ },
            effectData: ee({ parent: a, current: c, index: $, record: C })
          };
        });
      },
      {
        immediate: !0
      }
    );
    const v = {
      ...g,
      type: "Group",
      buttons: d,
      subItems: i
    }, S = g.title || g.label;
    return typeof S == "string" && s && (v.title = ({ index: _ }) => S + String(_ + 1)), () => p.value.map(({ model: _, effectData: C, key: $ }) => w(_e.Group, { model: _, option: v, effectData: C, key: $, isView: r }, t.slots));
  }
}), Ab = {
  name: "ExTabs"
}, xb = /* @__PURE__ */ Q({
  ...Ab,
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
      Tabs: t,
      TabPane: n
    } = Z, r = V(e.option.activeKey), a = [], s = (i, l, u) => {
      a[i] = !u && l, u && r.value === l && (r.value = a.find((g) => g));
    };
    ia(() => {
      r.value ?? (r.value = a.find((i) => i));
    });
    const o = [...e.model.children].map(([i, l], u) => {
      const {
        key: g,
        field: b,
        label: h,
        icon: m
      } = i, c = ke({
        parent: e.effectData,
        current: Se(l, "parent"),
        field: l.refName,
        value: l.refData
      }), {
        hidden: f,
        attrs: d
      } = Ne({
        option: i,
        effectData: c
      }), y = g || b || String(u), p = () => [qe(m), ce(h, c)];
      return st(() => {
        s(u, y, P(f) || P(d.disabled));
      }), {
        attrs: ee({
          ...d,
          key: y,
          tab: p
        }),
        hidden: f,
        option: {
          ...i,
          type: "TabPane"
        },
        model: l,
        effectData: c
      };
    });
    return (i, l) => (q(), X(P(t), {
      activeKey: r.value,
      "onUpdate:activeKey": l[0] || (l[0] = (u) => r.value = u)
    }, {
      rightExtra: ie(() => [!e.isView && e.option.buttons ? (q(), X(P(Ve), {
        key: 0,
        option: e.option.buttons
      }, null, 8, ["option"])) : Fe("", !0)]),
      default: ie(() => [(q(!0), ve(Ce, null, Ge(P(o), ({
        attrs: u,
        hidden: g,
        option: b,
        model: h,
        effectData: m
      }) => (q(), ve(Ce, {
        key: u.key
      }, [g.value ? Fe("", !0) : (q(), X(P(n), ae({
        key: 0,
        ref_for: !0
      }, u), {
        default: ie(() => [e.isView ? (q(), X(P(rt), {
          key: 0,
          option: b,
          modelsMap: h.children,
          effectData: m
        }, null, 8, ["option", "modelsMap", "effectData"])) : (q(), X(P(Ze), {
          key: 1,
          option: b,
          model: h,
          effectData: m
        }, null, 8, ["option", "model", "effectData"]))]),
        _: 2
      }, 1040))], 64))), 128))]),
      _: 1
    }, 8, ["activeKey"]));
  }
}), Db = Q({
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
    var l, u;
    const n = V(), r = jt({
      ...e.schema,
      dataSource: e.dataSource || e.model || ((l = e.schema) == null ? void 0 : l.dataSource),
      attrs: ae({ ...pe.Form }, { ...(u = e.schema) == null ? void 0 : u.attrs })
    });
    ge.schemaDiagnostics && e.schema && qt(e.schema, "form", "SuperForm");
    const a = {
      setOption: (g) => {
        var b;
        ge.schemaDiagnostics && qt(g, "form", "SuperForm"), nt(r, g), r.attrs = ae(r.attrs, { ...g.attrs }, { ...(b = e.schema) == null ? void 0 : b.attrs });
      }
    };
    tt("rootSlots", t.slots), t.emit("register", a);
    const s = (g) => {
      n.value = g, t.emit("register", a, g);
    };
    ia(() => t.expose(n.value));
    const o = J(() => e.isContainer || r.isContainer);
    return () => r.subItems && w(
      _e.Form,
      {
        option: r,
        // dataSource: formData.value,
        onRegister: s,
        compact: e.compact,
        ignoreRules: e.ignoreRules,
        class: { "sup-container": o.value }
      },
      Ct(r.slots, ke(), t.slots)
    );
  }
});
function Mb(e) {
  const [t, n] = hs(), r = Promise.resolve(typeof e == "function" ? e() : e), a = (o, i) => {
    if (o)
      t.value || r.then(o.setOption), t.value = i;
    else
      return (l, u) => w(Db, { ...l, onRegister: a }, u == null ? void 0 : u.slots);
  }, s = async (o, i) => {
    const l = await n();
    if (o && o in l)
      return typeof l[o] == "function" ? l[o](i) : l[o];
    if (!o)
      return l;
  };
  return [
    a,
    {
      dataSource: J(() => {
        var o;
        return (o = t.value) == null ? void 0 : o.dataSource;
      }),
      getForm: n,
      asyncCall: s,
      getData() {
        var o;
        return Oe((o = t.value) == null ? void 0 : o.dataSource);
      },
      submit: () => s("submit"),
      resetFields: (o) => s("resetFields", o),
      setFieldsValue: (o) => s("setFieldsValue", o),
      /**
       * @deprecated 使用`resetFields`
       */
      setData(o) {
        s("resetFields", o);
      }
    }
  ];
}
function Mg(e) {
  return e;
}
function vs(e, { buttons: t, ...n } = {}) {
  const r = V(!1), a = ee({ ...n, ...pe.Modal }), s = V(), o = t && (() => w(Ve, { option: t, effectData: { modalRef: s } })), i = V(!1), l = () => {
    var f;
    return i.value = !0, Promise.resolve((f = a.onOk) == null ? void 0 : f.call(a)).then(() => {
      r.value = !1;
    }).catch((d) => console.error(d)).finally(() => i.value = !1);
  }, u = () => a.icon ? [qe(a.icon), ce(a.title)] : ce(a.title), g = (f) => r.value = f;
  return {
    modalRef: s,
    modalSlot: (f, d) => w(
      Z.Modal,
      {
        ref: s,
        visible: r.value,
        class: "sup-modal",
        "onUpdate:visible": g,
        confirmLoading: i.value,
        ...a,
        title: void 0,
        ...f,
        onOk: l
      },
      { footer: o, title: u, ...d == null ? void 0 : d.slots, ...e && { default: e } }
    ),
    setModal: (f) => {
      Object.assign(a, f);
    },
    closeModal: () => (r.value = !1, Ke()),
    openModal: async (f) => (Object.assign(a, f), r.value = !0, Ke())
  };
}
function ys(e, t) {
  const { modalSlot: n, openModal: r, modalRef: a, closeModal: s, setModal: o } = vs(e, t), i = la(), l = document.createDocumentFragment();
  let u;
  const g = Ie("configProvider"), b = (c) => {
    var y;
    const f = (y = g == null ? void 0 : g.getPrefixCls) == null ? void 0 : y.call(g), d = c.prefixCls || "".concat(f, "-modal");
    return w(
      ro,
      { ...g, notUpdateGlobalConfig: !0, prefixCls: f },
      () => n({ ...c, rootPrefixCls: f, prefixCls: d }, {})
    );
  }, h = () => {
    On(null, l), u = null;
  };
  return g && on(() => {
    u && h();
  }), {
    modalRef: a,
    openModal: (c) => {
      var f, d;
      if (a.value)
        return r(c);
      if (u = Me(b), u.appContext = i == null ? void 0 : i.appContext, On(u, l), (f = a.value) != null && f.destroyOnClose) {
        const y = (d = a.value) == null ? void 0 : d.afterClose;
        o({
          afterClose() {
            y == null || y(), h();
          }
        });
      }
      return Ke(() => r(c));
    },
    modalSlot: n,
    closeModal: s,
    setModal: o
  };
}
function Ig(e, t = {}) {
  const { title: n, ...r } = e, [a, s] = Mb(r), o = ys(a(), { maskClosable: !1, title: n, ...t });
  return { ...o, openModal: ({ data: l, onOk: u = t.onOk, ...g } = {}) => {
    const b = () => s.submit().then((h) => u ? u(h) : h);
    return s.resetFields(l), o.openModal({ ...g, onOk: b });
  }, formActions: s };
}
const Pt = (e, ...t) => Sp(e, ...t, (n, r, a, s) => {
  if (r === void 0)
    s[a] = void 0;
  else if (Array.isArray(n))
    return r;
});
function Ib(e) {
  const t = /* @__PURE__ */ new WeakMap(), n = (a) => {
    const s = le(a);
    let o = t.get(s);
    return o || (o = jt({
      isEdit: !1
    }), t.set(s, o)), o;
  };
  return {
    getEditInfo: n,
    setEditInfo: (a, s) => {
      const o = n(a);
      if (o.editData)
        er(o.editData, a), Object.assign(o, s);
      else {
        const i = ee(vt(a)), {
          modelsMap: l
        } = gs(le(e), i);
        Object.assign(o, {
          ...s,
          forms: jt({}),
          modelsMap: l,
          editData: i
        });
      }
    }
  };
}
function Pb({
  childrenMap: e,
  orgList: t,
  listener: n,
  rowEditor: r
}) {
  const a = V(!1), s = V([]);
  W(() => [...t.value], (c) => {
    s.value = c, a.value = !1;
  }, {
    immediate: !0
  });
  const {
    getEditInfo: o,
    setEditInfo: i
  } = Ib(e), l = {
    add({
      index: c,
      resetData: f
    }) {
      const d = {
        ...f
      };
      c !== void 0 ? s.value.splice(c + 1, 0, d) : s.value.push(d), i(d, {
        index: c,
        isEdit: !0,
        isNew: !0
      }), a.value = !0;
    },
    edit({
      record: c,
      selectedRows: f,
      resetData: d
    }) {
      const y = c || f[0];
      i(Pt(y, d), {
        isEdit: !0
      }), a.value = !0;
    },
    delete({
      record: c,
      selectedRows: f
    }) {
      const d = c ? [c] : f;
      return n.onDelete(d);
    }
  }, u = {
    add: {
      disabled: () => a.value,
      onClick: l.add
    },
    edit: {
      disabled: (c) => {
        var f;
        return a.value || !(c.record || ((f = c.selectedRows) == null ? void 0 : f.length) === 1);
      },
      onClick: l.edit
    },
    delete: {
      disabled: (c) => {
        var f;
        return a.value || !(c.record || ((f = c.selectedRows) == null ? void 0 : f.length) > 0);
      },
      onClick: l.delete
    }
  }, g = [{
    label: "保存",
    loading: !0,
    onClick: async (c) => {
      const {
        record: f
      } = c, d = o(f);
      return Promise.all(Object.values(d.forms).map((y) => y.validate())).then(async () => {
        var v;
        const y = le(d.editData);
        if (await ((v = r == null ? void 0 : r.onSave) == null ? void 0 : v.call(r, {
          ...c,
          isNew: d.isNew
        })) === !1)
          return !1;
        d.isNew ? (Object.assign(f, y), n.onSave(f, d.index).then(() => {
          d.isNew = !1, d.isEdit = !1;
        })) : n.onUpdate(y, f).then(() => {
          d.isEdit = !1;
        }), a.value = !1;
      }).catch((y) => {
        console.log("error", y), y != null && y.errorFields && Ln.error(y.errorFields[0].errors[0]);
      });
    }
  }, {
    label: "取消",
    onClick: async (c) => {
      var y;
      const f = o(c.record);
      await ((y = r == null ? void 0 : r.onCancel) == null ? void 0 : y.call(r, {
        ...c,
        isNew: f.isNew
      })) !== !1 && (f.isNew && s.value.splice(f.index + 1, 1), f.isEdit = !1, a.value = !1);
    }
  }], b = (c, f) => o(c.record).isEdit ? w(Ve, {
    key: "edit",
    option: {
      ...f,
      actions: g
    },
    effectData: c
  }) : null, h = /* @__PURE__ */ Q({
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
      editInfo: f,
      viewRender: d
    }) {
      const {
        editable: y = !0
      } = c, {
        modelsMap: p,
        forms: v
      } = f, S = p.get(le(c)), {
        index: _,
        parent: C,
        refData: $
      } = Ye(S), O = S.propChain.join("."), T = ke({
        current: C,
        value: $,
        index: _
      }), {
        attrs: A,
        hidden: j
      } = Ne({
        option: c,
        effectData: T
      }), E = J(() => !j.value && (Ue(y) ? y(T) : y)), L = hn(c, S, T, A), F = Ht(S.rules, T), D = J(() => P(A.disabled) || P(j) ? [] : F);
      return () => E.value ? w(Z.Form, {
        ref: (x) => {
          x && (v[O] = x);
        },
        model: f.editData
      }, {
        default: () => w(Z.FormItem, {
          name: S.propChain,
          rules: D.value,
          wrapperCol: {}
        }, L)
      }) : d ? d({
        ...T,
        isView: !0
      }) : $.value;
    }
  });
  return {
    list: s,
    methods: l,
    buttonMethods: u,
    getEditRender: (c, f) => {
      if (_e[c.type] || c.type === "InputSlot")
        return ({
          record: y
        }) => {
          const p = o(y);
          if (p.isEdit)
            return w(h, {
              option: c,
              editInfo: p,
              viewRender: f
            });
        };
    },
    editButtonsSlot: b
  };
}
function Rb({ rowKey: e, option: t, listener: n }) {
  const r = V(), a = t.rowEditor, s = (a == null ? void 0 : a.form) || t.editForm || t.formSchema || {};
  s.subItems = s.subItems || t.columns.filter((c) => {
    var f;
    return !(c.hideInForm || (f = c.exclude) != null && f.includes("form"));
  });
  const o = V(s.dataSource || {}), i = () => w(_e.Form, {
    option: s,
    dataSource: o,
    onRegister: (c) => r.value = c
  }), l = {
    ...pe.Modal,
    maskClosable: !1,
    ...t.modalProps,
    ...a == null ? void 0 : a.modalProps
  }, { modalSlot: u, openModal: g, closeModal: b } = vs(i, l), h = ({ meta: c, ...f }) => ce(l.title, { meta: c, ...f }) || `${s.title ? s.title + " - " : ""}  ${c.title || c.label}`;
  return { modalSlot: u, methods: {
    add(c = {}) {
      const { meta: f = {}, resetData: d, index: y } = c;
      return o.value = { ...d }, Ke(() => {
        var p;
        (p = r.value) == null || p.clearValidate();
      }), f.title ?? (f.title = "新增"), f.name = "add", f.isNew = !0, g({
        ...f,
        title: h({ ...c, source: o.value, meta: f }),
        onOk: async () => r.value.submit().then(async (p) => {
          var S;
          if (await ((S = a == null ? void 0 : a.onSave) == null ? void 0 : S.call(a, { ...c, source: p, meta: f })) !== !1)
            return n.onSave(p, y);
        }),
        onCancel: async () => {
          var p;
          return await ((p = a == null ? void 0 : a.onCancel) == null ? void 0 : p.call(a, { ...c, meta: f })), b();
        }
      });
    },
    async edit(c) {
      var _, C, $;
      const { record: f, selectedRows: d, resetData: y, meta: p = {} } = c, v = f || d[0];
      if (!v)
        return Promise.reject(new Error("未选择记录"));
      const S = await ((C = (_ = t.apis) == null ? void 0 : _.info) == null ? void 0 : C.call(_, e(v), v));
      return o.value = Pt({}, v, S, y), nt(p, { name: "edit", title: "编辑", isNew: !1 }), ($ = r.value) == null || $.clearValidate(), g({
        ...p,
        title: h({ ...c, source: o.value, meta: p }),
        onOk: async () => r.value.submit().then(async (O) => {
          var A;
          if (await ((A = a == null ? void 0 : a.onSave) == null ? void 0 : A.call(a, { ...c, source: O, meta: p })) !== !1)
            return n.onUpdate(O, v);
        }),
        onCancel: async () => {
          var O;
          return await ((O = a == null ? void 0 : a.onCancel) == null ? void 0 : O.call(a, { ...c, meta: p })), b();
        }
      });
    },
    delete({ record: c, selectedRows: f }) {
      const d = c ? [c] : f;
      return n.onDelete(d);
    }
  } };
}
function jb({
  model: e,
  orgList: t,
  rowKey: n,
  setRowKey: r,
  editableRef: a
}) {
  const {
    modelsMap: s
  } = e.listData, o = V([]), i = /* @__PURE__ */ new WeakMap(), l = /* @__PURE__ */ new WeakMap();
  W(() => [...t.value], (h) => {
    o.value = h.map((m, c) => {
      const f = i.get(le(m)) || jt({});
      if (f.index !== c) {
        f.index = c;
        const {
          modelsMap: y
        } = gs(le(s), m, e.propChain, c);
        f.modelsMap = y;
      }
      f.record ?? (f.record = ee({
        ...Ye(m)
      }));
      const d = n(m);
      return r(f.record, d), i.set(le(m), f), l.set(le(f.record), f), f.record;
    });
  }, {
    immediate: !0
  });
  const u = {
    add({
      index: h,
      resetData: m
    }) {
      const c = {
        ...m
      };
      h !== void 0 ? t.value.splice(h + 1, 0, c) : t.value.push(c);
    }
    // delete({ record }) {
    //   const orgIdx = orgList.value.indexOf(record)
    //   orgList.value.splice(orgIdx, 1)
    // },
  }, g = /* @__PURE__ */ Q({
    inheritAttrs: !1,
    props: {
      option: {
        type: Object,
        required: !0
      }
    },
    setup({
      option: h
    }, m) {
      const {
        record: c
      } = m.attrs, f = J(() => l.get(le(c)).modelsMap.get(h)), {
        index: d,
        parent: y,
        refData: p
      } = Ye(f.value), v = ke({
        current: y,
        value: p,
        list: t,
        record: c,
        index: d
      }), {
        editable: S = !0
      } = h, {
        attrs: _,
        hidden: C
      } = Ne({
        option: h,
        effectData: v
      }), $ = J(() => !C.value && a.value && (Ue(S) ? S(v) : S)), O = hn(h, f.value, v, _), T = Zt(h, ee({
        ...Ye(v),
        isView: !0
      })), A = Ht(f.value.rules, v), j = A && J(() => P(_.disabled) ? void 0 : A);
      return () => $.value ? w(Z.FormItem, ee({
        wrapperCol: {},
        name: f.value.propChain,
        rules: j
      }), O) : T ? T() : p.value;
    }
  });
  return {
    list: o,
    methods: u,
    getEditRender: (h) => {
      if (_e[h.type] || h.type === "InputSlot" && h.editable !== !1)
        return (c) => w(g, {
          option: h,
          ...c
        });
    }
  };
}
function Fb(e, t, n) {
  const r = V({}), { title: a, apis: s } = e, { modalProps: o, ...i } = e.descriptionsProps || {}, l = () => w(vb, { option: { descriptionsProps: i }, modelsMap: t, source: r }), u = {
    ...pe.Modal,
    footer: null,
    ...e.modalProps,
    ...o
  }, g = (m) => ce(u.title, m) || `${a ? a + " - " : ""}详情`, { openModal: b, modalSlot: h } = ys(l, u);
  return {
    detailSlot: h,
    openDetail: async ({ record: m, selectedRows: c, meta: f = {}, ...d }) => {
      const y = m || c[0];
      if (s != null && s.info) {
        const p = await s.info(n(y), y);
        r.value = Object.assign({}, y, p);
      } else
        r.value = y;
      f.name = "detail", b({ ...f, title: g({ ...d, source: r.value, meta: f }) });
    }
  };
}
function Eb({ option: e, model: t, orgList: n, rowKey: r, setRowKey: a, listener: s, isView: o, effectData: i }) {
  const { modelsMap: l } = t.listData, u = {
    list: n,
    modalSlot: [],
    methods: {
      delete({ record: y, selectedRows: p }) {
        const v = y ? [y] : p;
        return s.onDelete(v);
      }
    }
  }, { edit: g, editable: b = g, rowEditor: h } = e, { editMode: m, addMode: c } = h || e;
  if (!o && b) {
    const y = J(() => Ue(b) ? b(i) : b), { methods: p, ...v } = jb({ model: t, orgList: n, rowKey: r, setRowKey: a, editableRef: y });
    Object.assign(u.methods, p), Object.assign(u, v);
  } else if (m === "inline") {
    const { list: y, methods: p, buttonMethods: v, editButtonsSlot: S, getEditRender: _ } = Pb({
      childrenMap: l,
      orgList: n,
      listener: s,
      rowEditor: h
    });
    u.list = y, Object.assign(u.methods, p), Object.assign(u, { buttonMethods: v, editButtonsSlot: S, getEditRender: _ });
  }
  if (m === "modal" || c === "modal") {
    const { modalSlot: y, methods: p } = Rb({ rowKey: r, option: e, listener: s });
    u.methods.edit ? (u.methods.add = p.add, u.buttonMethods || (u.buttonMethods = {}), u.buttonMethods.add = p.add) : Object.assign(u.methods, p), u.modalSlot.push(y);
  }
  const { detailSlot: f, openDetail: d } = Fb(e, l, r);
  return u.modalSlot.push(f), u.methods.detail = d, u;
}
function ft(e, t, n) {
  var g, b, h, m;
  const { options: r, dictName: a, valueToNumber: s } = e, o = ((b = (g = e.attrs) == null ? void 0 : g.fieldNames) == null ? void 0 : b.label) || "label", i = ((m = (h = e.attrs) == null ? void 0 : h.fieldNames) == null ? void 0 : m.value) || "value", l = V(t || []);
  return typeof r == "function" ? ua(() => {
    Promise.resolve(r(n)).then((c) => {
      l.value = c;
    });
  }) : r ? W(
    () => P(r),
    (c) => l.value = c,
    { immediate: !0 }
  ) : a && ge.dictApi && ge.dictApi(a).then((c) => l.value = c), {
    optionsRef: J(() => {
      let c = e.labelAsValue ?? e.valueToLabel;
      const f = we(l.value) ? l.value : [];
      return f[0] && !ye(f[0]) && !s && (c = !0), ye(l.value) || !ye(f[0]) ? Object.entries(l.value).map(([d, y]) => ({
        label: y,
        value: c ? y : s ? Number(d) : d
      })) : f.map((d) => ({
        ...d,
        label: d[o],
        value: c ? d[o] : s ? Number(d[i]) : d[i]
      }));
    }),
    setOptions(c) {
      l.value = c;
    }
  };
}
const Nb = Q({
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
    const { Card: a, Tabs: s, TabPane: o } = Z, { optionsRef: i } = ft(
      { ...e, labelAsValue: e.labelAsValue || e.valueToLabel },
      [],
      e.effectData
    ), l = V(e.activeKey ?? e.defaultActiveKey), u = (C) => {
      l.value = C, r("update:activeKey", C);
    }, {
      default: g,
      extra: b,
      rightExtra: h,
      tabBarExtraContent: m,
      tabBarExtra: c,
      title: f,
      titleBar: d,
      ...y
    } = n, p = Ct(e.slots, e.effectData), v = c || h || m, S = J(() => {
      var $;
      const C = i.value.map(({ value: O, label: T, ...A }) => ({
        ...A,
        key: A.key ?? O,
        tab: A.tab ?? T
      }));
      return l.value === void 0 && u(($ = C[0]) == null ? void 0 : $.key), C;
    }), _ = (C) => ce(p.customTab || e.customTab || C.tab, { ...e.effectData, item: C });
    return e.bordered ? () => w(
      a,
      {
        tabList: S.value,
        activeTabKey: l.value,
        onTabChange: u
      },
      {
        ...y,
        default: g,
        customTab: _,
        title: f,
        tabBarExtraContent: v || (f ? void 0 : b),
        extra: v || f ? b : void 0,
        ...p
      }
    ) : () => [
      f ? d == null ? void 0 : d() : null,
      w(
        s,
        {
          ...t,
          activeKey: l.value,
          "onUpdate:activeKey": u
        },
        {
          ...y,
          default: () => S.value.map((C) => w(o, { ...C, tab: () => _(C) })),
          rightExtra: v || (f ? void 0 : b),
          ...p
        }
      ),
      g == null ? void 0 : g()
    ];
  }
}), Lb = Q({
  props: {
    option: { type: Object, required: !0 },
    effectData: { type: Object, required: !0 }
  },
  setup(e) {
    const t = e.option, { field: n, editable: r } = e.option, a = ee({});
    W(
      () => e.effectData,
      (c) => Object.assign(a, c),
      { immediate: !0 }
    );
    const s = n.split(".").slice(0, -1), o = J(() => We(a.record, s)), i = J({
      get: () => We(a.record, n),
      set: (c) => Ut(a.record, n, c)
    }), l = { parent: o, refData: i }, { attrs: u, hidden: g } = Ne({ option: t, effectData: { ...a, inTable: !0 } }), b = hn(t, l, a, u), h = J(() => Ue(r) ? r(a) : P(r)), m = Zt(t, a);
    return () => g.value ? "" : h.value ? w("div", { class: "editable-cell" }, b()) : m ? m() : i.value;
  }
}), kb = (e) => {
  if (!e.editable)
    return;
  const t = ge.buttonRoles && ge.buttonRoles() || [], n = !e.roleName || t.includes(e.roleName), r = _e[e.type];
  if (n && (r || e.type === "InputSlot"))
    return (a) => w(Lb, { option: e, effectData: { ...a } });
};
function Bb({ childrenMap: e, context: t, option: n, attrs: r, isView: a, effectData: s }) {
  const { list: o, methods: i, buttonMethods: l, getEditRender: u, editButtonsSlot: g } = t, b = ke({ list: s.value, isView: a, parent: s }), h = function f(d = e) {
    const y = [];
    return [...d].forEach(([p, v]) => {
      var _, C;
      if (p.type === "Hidden" || p.hideInTable || p.hidden === !0 || (_ = p.exclude) != null && _.includes("table"))
        return;
      const S = Tt(p, b);
      if (v.children) {
        const $ = f(v.children);
        p.ignoreTableTitle ? y.push(...$) : y.push({
          title: S,
          children: $
        });
      } else {
        const $ = {
          title: S,
          key: p.field || p.label,
          dataIndex: v.propChain.length > 1 ? v.propChain : v.propChain[0]
        };
        p.options || p.dictName || p.type === "Switch" || (C = p.type) != null && C.includes("Picker") ? $.align = "center" : p.type === "InputNumber" && ($.align = "right"), Object.assign($, p.columnProps), nt($, n.columnProps, pe.Column);
        const O = $.customRender || Zt(p) || void 0, T = u ? u(p, O) : kb(p);
        $.customRender = Ub(O, T, b), y.push($);
      }
    }), y;
  }(), m = Hb(n, r);
  m && h.unshift(m);
  const c = Vb({
    buttons: n.rowButtons,
    methods: l || i,
    editButtonsSlot: g,
    isView: a,
    effectData: b
  });
  return c && (nt(c, n.columnProps, pe.Column), h.push(c)), h;
}
function Ub(e, t, n) {
  if (t || e) {
    const r = (a) => {
      const s = (t == null ? void 0 : t(a)) ?? (e == null ? void 0 : e({ ...a, isView: !0 })) ?? String(a.text ?? "");
      return s && typeof s == "string" && a.column.ellipsis ? w("span", { title: s }, s) : s;
    };
    return (a) => w(r, { ...n, ...a, current: a.record });
  } else
    return ({ text: r }) => String(r ?? "");
}
function Vb({ buttons: e, methods: t, editButtonsSlot: n, isView: r, effectData: a }) {
  const s = {
    buttonType: "link",
    size: "small",
    ...pe.rowButtons,
    ...Array.isArray(e) ? { actions: e } : e
  }, { columnProps: o, ...i } = s, l = wt({ config: i, methods: t, isView: r });
  if (!l)
    return;
  const u = (g) => (n == null ? void 0 : n(g, i)) || l({ key: g.record, effectData: g });
  return {
    title: "操作",
    key: "action",
    fixed: "right",
    minWidth: 100,
    width: 100,
    align: "center",
    resizable: !1,
    ...o,
    customRender: (g) => w(u, { ...a, ...g, current: g.record })
  };
}
const Hb = (e, t) => {
  var r;
  const n = e.indexColumn ?? ((r = pe.Table) == null ? void 0 : r.indexColumn);
  if (n)
    return {
      key: "INDEX",
      title: "序号",
      width: 60,
      align: "center",
      customRender: ({ index: a }) => {
        var s, o;
        return ((((s = t.pagination) == null ? void 0 : s.current) || 1) - 1) * (((o = t.pagination) == null ? void 0 : o.pageSize) || 10) + a + 1;
      },
      ...ye(n) && n
    };
}, qb = Q({
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
  setup({ option: e, model: t, reload: n, effectData: r, isView: a, ...s }, o) {
    var Te, he, Ae;
    const i = ((Te = e.rowEditor) == null ? void 0 : Te.editMode) === "inline", l = o.attrs, u = /* @__PURE__ */ new WeakMap(), g = l.rowKey || "id", b = (k) => {
      const B = k[g];
      if (B)
        return B;
      const ne = le(k);
      return u.has(ne) || u.set(ne, zt(12)), u.get(ne);
    }, h = (k, B) => u.set(le(k), B), m = Se(t, "refData"), c = ((he = e.attrs) == null ? void 0 : he.rowSelection) || void 0, f = V((c == null ? void 0 : c.selectedRowKeys) || []), d = V([]), y = c && {
      fixed: !0,
      ...c,
      selectedRowKeys: f,
      onChange: (k, B, ne) => {
        var fe;
        f.value = k, d.value = B, (fe = c == null ? void 0 : c.onChange) == null || fe.call(c, k, B, ne);
      },
      ...i && {
        getCheckboxProps: (k) => {
          var B;
          return {
            disabled: !m.value.includes(k),
            ...(B = c == null ? void 0 : c.getCheckboxProps) == null ? void 0 : B.call(c, k)
          };
        }
      }
    }, p = l.childrenColumnName || "children", v = (k, B = 0, ne = 1) => {
      const fe = [], re = B === ne;
      return k.forEach((me) => {
        me[p] && (fe.push(b(me)), re || fe.push(...v(me[p], B, ne + 1)));
      }), fe;
    }, S = V(((Ae = e.attrs) == null ? void 0 : Ae.expandedRowKeys) || []), _ = (k) => {
      S.value = k, o.emit("expandedRowsChange", k);
    };
    (s.defaultExpandLevel || l.defaultExpandAllRows) && W(
      m,
      (k, B) => {
        k.length && !(B != null && B.length) && _(v(k, Number(s.defaultExpandLevel)));
      },
      { immediate: !0 }
    );
    const $ = Eb({ option: e, model: t, orgList: m, rowKey: b, setRowKey: h, listener: {
      async onSave(k, B) {
        var ne;
        if ((ne = e.apis) != null && ne.save)
          return await e.apis.save(k), k.parentId && (S.value = [...S.value, k.parentId]), n == null ? void 0 : n();
        B !== void 0 ? m.value.splice(B + 1, 0, k) : m.value.push(k);
      },
      async onUpdate(k, B) {
        var fe;
        (fe = e.apis) != null && fe.update && await e.apis.update(k), Object.assign(B, k);
        const ne = b(B);
        if (ne) {
          const re = m.value.findIndex((me) => b(me) === ne);
          re > -1 && m.value.splice(re, 1, B);
        }
        return n == null ? void 0 : n();
      },
      async onDelete(k) {
        var ne, fe;
        const B = k.map((re) => b(re));
        try {
          await ((fe = (ne = e.apis) == null ? void 0 : ne.delete) == null ? void 0 : fe.call(ne, B, k));
        } catch (re) {
          return console.error(re), re;
        }
        return y && (f.value = f.value.filter((re) => !B.includes(re)), d.value = d.value.filter((re) => !B.includes(b(re)))), k.forEach((re) => {
          m.value.splice(T.value.indexOf(re), 1);
        }), n == null ? void 0 : n();
      }
    }, isView: a, effectData: r }), O = Bb({ childrenMap: t.listData.modelsMap, context: $, option: e, attrs: l, isView: a, effectData: r }), { list: T, methods: A, buttonMethods: j = A, modalSlot: E } = $, L = {
      selectedRowKeys: f,
      selectedRows: d,
      setSelectedRows: (k) => {
        d.value = k, f.value = k.map((B) => b(B));
      },
      expandedRowKeys: S,
      setExpandedRowKeys: _,
      expandAll: () => {
        _(v(m.value));
      },
      add: (k) => {
        var B;
        return (B = A.add) == null ? void 0 : B.call(A, k);
      },
      edit: (k) => {
        var B;
        return (B = A.edit) == null ? void 0 : B.call(A, { ...x, ...k });
      },
      delete: () => {
        var k;
        return (k = A.delete) == null ? void 0 : k.call(A, x);
      },
      detail: (k) => {
        var B;
        return (B = A.detail) == null ? void 0 : B.call(A, { ...x, ...k });
      }
    }, F = ee({ ...L }), D = V();
    W(
      D,
      (k) => {
        Object.assign(F, k, L), o.emit("register", F);
      },
      { flush: "sync" }
    );
    const x = ee({ ...r, selectedRows: d, selectedRowKeys: f, tableRef: F }), M = { ...o.slots }, I = e.buttons, H = (I == null ? void 0 : I.targetSlot) ?? (I == null ? void 0 : I.forSlot) ?? "extra";
    if (I) {
      const k = M[H], B = wt({
        config: I,
        effectData: x,
        methods: j,
        isView: a
      });
      (k || B) && (M[H] = () => [k == null ? void 0 : k(), B == null ? void 0 : B()]);
    }
    const R = e.title || e.label, { title: z = R, extra: G, ...se } = M, oe = (z || G) && (() => w(et, { align: "middle", class: "sup-titlebar" }, () => [
      z && w(
        Pe,
        { class: "sup-title" },
        Tt({ labelSlot: z, tooltip: e.tooltip }, r)
      ),
      G && w(
        Pe,
        { class: "sup-title-buttons", flex: 1, style: { textAlign: (I == null ? void 0 : I.align) || "right" } },
        G
      )
    ]));
    se.headerCell = (k) => {
      var B;
      return ((B = M.headerCell) == null ? void 0 : B.call(M, k)) || ce(k.title, r);
    };
    const be = () => [
      ...E.map((k) => k()),
      w(
        Z.Table,
        {
          ...pe.Table,
          ref: D,
          dataSource: T.value,
          columns: ee(O),
          tableLayout: "fixed",
          pagination: !1,
          ...l,
          rowSelection: y,
          rowKey: b,
          expandedRowKeys: S.value,
          "onUpdate:expandedRowKeys": _,
          class: ["sup-table-wrapper", e.editable && "sup-table-editable"]
        },
        se
      )
    ];
    return e.tabs ? () => w(Nb, { ...e.tabs, effectData: r }, {
      [H]: M[H],
      title: z && (() => ce(z, r)),
      extra: G,
      titleBar: oe,
      default: be
    }) : () => [oe == null ? void 0 : oe(), be()];
  }
}), zb = Q({
  props: {
    option: { type: Object, required: !0 },
    model: Object,
    effectData: Object
  },
  setup(e) {
    return () => w(Z.TextArea, { style: "width: 100%", allowClear: !0, placeholder: `请输入${e.option.label}` });
  }
}), Yb = {
  key: 0,
  class: "sup-title ant-descriptions-header"
}, Gb = /* @__PURE__ */ Q({
  inheritAttrs: !1,
  __name: "Collapse",
  props: {
    option: {},
    model: {},
    effectData: {},
    isView: { type: Boolean }
  },
  setup(e) {
    const { Collapse: t, CollapsePanel: n } = Z, r = e, a = r.option.title || r.option.label, s = [...r.model.children].map(([i, l], u) => {
      const g = ke({
        parent: r.effectData,
        current: Se(r.model, "parent"),
        field: l.refName,
        value: l.refData
      }), {
        hidden: b,
        attrs: { disabled: h, ...m }
      } = Ne({ option: i, effectData: g }), { key: c, field: f } = i;
      return {
        attrs: ee(m),
        option: { ...i, type: "CollapsePanel" },
        effectData: g,
        model: l,
        header: () => ce(i.label),
        key: c || f || String(u),
        hidden: b,
        disabled: h
      };
    }), o = V(r.option.activeKey || s[0].key);
    return (i, l) => (q(), ve(Ce, null, [
      P(a) ? (q(), ve("div", Yb, [
        (q(), X(De(P(ce)(P(a), e.effectData))))
      ])) : Fe("", !0),
      Me(P(t), ae({
        activeKey: o.value,
        "onUpdate:activeKey": l[0] || (l[0] = (u) => o.value = u)
      }, i.$attrs), {
        default: ie(() => [
          (q(!0), ve(Ce, null, Ge(P(s), ({ attrs: u, hidden: g, option: b, disabled: h, model: m, header: c, effectData: f, key: d }) => (q(), ve(Ce, { key: d }, [
            g.value ? Fe("", !0) : (q(), X(P(n), ae({
              key: 0,
              collapsible: P(h) ? "disabled" : void 0
            }, { ref_for: !0 }, u), kn({
              header: ie(() => [
                (q(), X(De(c)))
              ]),
              default: ie(() => [
                e.isView ? (q(), X(P(rt), {
                  key: 0,
                  option: b,
                  modelsMap: m.children,
                  effectData: f
                }, null, 8, ["option", "modelsMap", "effectData"])) : (q(), X(P(Ze), {
                  key: 1,
                  option: b,
                  model: m,
                  effectData: f
                }, null, 8, ["option", "model", "effectData"]))
              ]),
              _: 2
            }, [
              e.isView ? void 0 : {
                name: "extra",
                fn: ie(() => [
                  b.buttons ? (q(), X(P(Ve), {
                    key: 0,
                    option: b.buttons,
                    effectData: f
                  }, null, 8, ["option", "effectData"])) : Fe("", !0)
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
}), Kb = Q({
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
  setup(e, { slots: t }) {
    const { option: n, effectData: r, addonAfter: a, enterButton: s, onSearch: o } = e, i = ee({
      placeholder: "请输入" + (Cp(n.label) ? n.label : ""),
      disabled: Se(e, "disabled")
    });
    if (o) {
      const l = V(!1), { addonAfter: u, ...g } = t;
      let b = t.enterButton || (s ? void 0 : u);
      const h = s || a;
      if (!b)
        if ($e(h)) {
          const { label: m, icon: c, ...f } = s;
          b = () => w(
            Z.Button,
            { loading: l.value, ...f },
            { icon: () => qe(c), default: () => ce(m) }
          );
        } else
          Ue(h) && (b = () => w(Z.Button, { type: "primary", loading: l.value }, h));
      return i.onSearch = async (...m) => {
        l.value = !0;
        try {
          await (o == null ? void 0 : o(...m));
        } finally {
          l.value = !1;
        }
      }, b ? () => w(Z.InputSearch, i, { ...g, enterButton: b }) : () => w(Z.InputSearch, { ...i, enterButton: h }, g);
    } else
      return () => w(Z.Input, { ...i, addonAfter: a }, t);
  }
}), Wb = /* @__PURE__ */ Q({
  __name: "InputNumber",
  props: {
    option: {},
    model: {},
    effectData: {}
  },
  setup(e) {
    const { InputNumber: t } = Z;
    return (n, r) => (q(), X(P(t), {
      style: { width: "100%" },
      type: "number",
      placeholder: "请输入" + e.option.label
    }, null, 8, ["placeholder"]));
  }
}), Zb = /* @__PURE__ */ Q({
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
  setup(e, { emit: t }) {
    var h;
    const { Select: n } = Z, r = t, a = e, { options: s, labelField: o } = a.option, i = oa(), { optionsRef: l, setOptions: u } = ft(a.option, a.options, a.effectData);
    let g = a.onChange;
    if (o) {
      const m = ((h = a.fieldNames) == null ? void 0 : h.label) || "label";
      g = (...c) => {
        var d;
        const f = c[1];
        r("update:labelValue", Array.isArray(f) ? f.map((y) => y[m]) : f == null ? void 0 : f[m]), (d = a.onChange) == null || d.call(a, ...c);
      };
    }
    let b = a.onSearch && jn(a.onSearch, 600, { leading: !1 });
    return i.showSearch && !b && typeof s == "function" && (b = jn((c) => {
      Promise.resolve(s(a.effectData, c)).then((f) => {
        u(f);
      });
    }, 600, { leading: !1 })), (m, c) => (q(), X(P(n), {
      "option-filter-prop": "label",
      placeholder: "请选择" + e.option.label,
      options: P(l),
      onChange: P(g),
      onSearch: P(b)
    }, kn({ _: 2 }, [
      Ge(m.$slots, (f, d) => ({
        name: d,
        fn: ie((y) => [
          po(m.$slots, d, ra(aa(y || {})))
        ])
      }))
    ]), 1032, ["placeholder", "options", "onChange", "onSearch"]));
  }
}), Jb = Q({
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
    options: null,
    labelValue: null,
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
  emits: ["update:value", "update:labelValue"],
  setup(e, { attrs: t, emit: n }) {
    const [r, a] = e.option.valueLabels || [], { optionsRef: s } = ft(e.option, e.options, e.effectData), o = e.option.valueToNumber ?? e.valueToNumber, i = o ? 1 : !0, l = o ? 0 : !1, u = J(() => {
      const [m, c] = s.value;
      return e.firstIsChecked ? {
        checkedChildren: (m == null ? void 0 : m.label) ?? a,
        unCheckedChildren: (c == null ? void 0 : c.label) ?? r,
        checkedValue: (m == null ? void 0 : m.value) ?? i,
        unCheckedValue: (c == null ? void 0 : c.value) ?? l
      } : {
        checkedChildren: (c == null ? void 0 : c.label) ?? a,
        unCheckedChildren: (m == null ? void 0 : m.label) ?? r,
        checkedValue: (c == null ? void 0 : c.value) ?? i,
        unCheckedValue: (m == null ? void 0 : m.value) ?? l
      };
    }), g = (m, c = s.value) => {
      if (!e.option.labelField)
        return;
      const f = c.find((p) => Object.is(p.value, m)), d = u.value, y = (f == null ? void 0 : f.label) ?? (Object.is(m, d.checkedValue) ? d.checkedChildren : Object.is(m, d.unCheckedValue) ? d.unCheckedChildren : void 0);
      n("update:labelValue", y);
    }, b = J(
      () => e.options !== void 0 || e.option.options !== void 0 || !!e.option.dictName
    );
    W(
      () => [e.value, s.value],
      ([m, c]) => {
        if (m === void 0) {
          if (b.value && !c.length)
            return;
          const f = e.defaultChecked ? u.value.checkedValue : u.value.unCheckedValue;
          n("update:value", f), g(f, c);
        } else
          g(m, c);
      },
      { immediate: !0 }
    );
    const h = (m) => {
      n("update:value", m), g(m);
    };
    return () => w(
      Z.Switch,
      {
        ...t,
        ...u.value,
        checked: e.value,
        "onUpdate:checked": h
      }
    );
  }
}), Qb = Q({
  props: {
    option: Object,
    model: Object,
    effectData: Object,
    disabledDate: Function
  },
  setup(e, t) {
    const n = (r) => {
      var a;
      return (a = e.disabledDate) == null ? void 0 : a.call(e, r, e.effectData);
    };
    return () => w(Z.DateRangePicker, { valueFormat: "YYYY-MM-DD", disabledDate: n }, t.slots);
  }
}), Xb = Q({
  props: {
    option: Object,
    model: Object,
    effectData: Object,
    disabledDate: Function
  },
  setup(e, t) {
    const n = (r) => {
      var a;
      return (a = e.disabledDate) == null ? void 0 : a.call(e, r, e.effectData);
    };
    return () => w(Z.DatePicker, { valueFormat: "YYYY-MM-DD", disabledDate: n }, t.slots);
  }
}), eg = Q({
  props: {
    option: { type: Object, required: !0 },
    model: Object,
    effectData: Object,
    options: null,
    /** 字典名称 */
    dictName: String
  },
  setup(e, t) {
    const { optionsRef: n } = ft({ ...e.option, labelAsValue: !0 }, e.options, e.effectData);
    return () => w(
      Z.AutoComplete,
      { placeholder: `请输入${e.option.label}`, options: n.value, filterOption: !0 },
      t.slots
    );
  }
}), tg = Q({
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
  setup(e, { attrs: t, emit: n }) {
    const { optionsRef: r } = ft(e.option, e.options, e.effectData), a = t.optionType || t.buttonStyle && "button";
    let s = e.onChange;
    return e.option.labelField && (s = (o) => {
      var l, u;
      const i = (l = r.value.find((g) => g.value === o.target.value)) == null ? void 0 : l.label;
      n("update:labelValue", i), (u = e.onChange) == null || u.call(e, o);
    }), () => w(
      Z.RadioGroup,
      { name: e.option.field, optionType: a, onChange: s },
      () => r.value.map(
        (o) => w(
          a === "button" ? Jr : Qr,
          { value: o.value, disabled: o.disabled },
          () => ce(o.label, e.effectData)
        )
      )
    );
  }
}), ng = Q({
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
  setup(e, t) {
    const { optionsRef: n } = ft(e.option, e.options, e.effectData);
    let r = e.onChange;
    return e.option.labelField && (r = (s) => {
      var i;
      const o = s.map((l) => {
        var u;
        return (u = n.value.find(({ value: g }) => g == l)) == null ? void 0 : u.label;
      });
      t.emit("update:labelValue", o), (i = e.onChange) == null || i.call(e, s);
    }), () => w(Z.CheckboxGroup, { options: n.value, name: e.option.field, onChange: r });
  }
}), rg = Q({
  props: {
    option: { type: Object, required: !0 },
    effectData: { type: Object, required: !0 },
    model: Object,
    onChange: Function
  },
  emits: ["update:labelValue"],
  setup(e, t) {
    const n = V([]), { data: r, treeData: a = r, labelField: s, label: o } = e.option;
    typeof a == "function" ? ua(() => {
      Promise.resolve(a(e.effectData)).then((l) => {
        n.value = l || [];
      });
    }) : a && W(
      () => P(a),
      (l) => n.value = l,
      { immediate: !0 }
    );
    let i = e.onChange;
    return s && (i = (...l) => {
      var b;
      const [u, g] = l;
      t.emit("update:labelValue", Array.isArray(u) ? g : g[0]), (b = e.onChange) == null || b.call(e, ...l);
    }), () => w(
      Z.TreeSelect,
      { allowClear: !0, placeholder: `请选择${o}`, onChange: i, treeData: n.value },
      t.slots
    );
  }
}), ag = /* @__PURE__ */ Q({
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
    const n = t, r = (a) => {
      n("update:value", a);
    };
    return (a, s) => (q(), X(P(sr).PreviewGroup, {
      style: { display: "none" },
      preview: {
        visible: e.visible,
        onVisibleChange: r,
        current: e.current
      }
    }, {
      default: ie(() => [
        (q(!0), ve(Ce, null, Ge(e.images, (o, i) => (q(), X(P(sr), {
          key: i,
          width: e.width,
          src: o,
          height: e.height
        }, null, 8, ["width", "src", "height"]))), 128))
      ]),
      _: 1
    }, 8, ["preview"]));
  }
});
function sg(e) {
  const t = V(!1), n = ee({
    visible: t,
    images: [],
    "onUpdate:value": (l) => t.value = l,
    ...e
  }), r = V(!1), a = () => !r.value && w(ag, n), s = la();
  on(() => {
    r.value = !0;
  });
  let o;
  return { open: (l) => {
    if (typeof l == "string")
      n.images = [l];
    else if (Array.isArray(l))
      n.images = [...l];
    else {
      const { src: u, ...g } = l || {};
      u && (n.images = [u]), Object.assign(n, g);
    }
    if (!o) {
      const u = document.createElement("div");
      o = Me(a, { appContext: s == null ? void 0 : s.appContext }), o.appContext = s == null ? void 0 : s.appContext, On(o, u);
    }
    Ke(() => t.value = !0);
  } };
}
function og(e, t) {
  return new Promise((n, r) => {
    const a = new FileReader();
    t === "text" ? a.readAsText(e) : a.readAsDataURL(e), a.onload = () => n({ result: a.result, file: e }), a.onerror = (s) => r(s);
  });
}
function ig(e, t, n) {
  const r = typeof n < "u" ? [n, e] : [e], a = new Blob(r, { type: "application/octet-stream" }), s = window.URL.createObjectURL(a), o = document.createElement("a");
  o.style.display = "none", o.href = s, o.setAttribute("download", t), typeof o.download > "u" && o.setAttribute("target", "_blank"), document.body.appendChild(o), o.click(), document.body.removeChild(o), window.URL.revokeObjectURL(s);
}
function lg(e, t) {
  return t.split(",").some((n) => {
    var r;
    return ((r = e.name) == null ? void 0 : r.endsWith(n)) || e.type && new RegExp(`^${n.replace("*", "\\S*")}$`).test(e.type);
  });
}
const ug = ".png,.jpg,.jpeg,.gif,.webp,.svg,.tif,.tiff";
function cg(e) {
  var t, n, r, a;
  if (e.thumbUrl)
    return !0;
  if (e.url || e.originFileObj) {
    const s = (n = (t = e.name || e.url) == null ? void 0 : t.match(/[^\\.]*$/)) == null ? void 0 : n[0];
    if (s && ug.includes(s))
      return !0;
    {
      const o = e.type || ((a = (r = e.url) == null ? void 0 : r.match(/^data:(\S*?);/)) == null ? void 0 : a[1]);
      return o == null ? void 0 : o.startsWith("image");
    }
  }
}
function Kr(e, t) {
  const n = an.info({
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
  return { setError: (a, s) => {
    n.update({
      icon: () => w(lo),
      okButtonProps: {
        loading: !1
      },
      type: "error",
      title: a,
      content: s == null ? void 0 : s.message
    });
  }, ...n };
}
const fg = Q({
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
      isSingle: a,
      minSize: s,
      maxSize: o,
      infoNames: i,
      repeatable: l,
      showUploadList: u,
      onPreview: g,
      onDownload: b,
      isImageUrl: h = cg,
      hideOnMax: m,
      valueKey: c
    } = e, f = (a ? 1 : e.maxCount) || 1 / 0, { accept: d, listType: y } = t.attrs, p = sg(), v = {
      ...c && { [c]: c },
      uid: "uid",
      status: "status",
      url: "url",
      name: "name",
      ...i
    };
    n === "custom" && (v.originFileObj = "originFileObj");
    const S = (N) => {
      const U = { status: "done", ...N };
      return Object.entries(v).forEach(([K, Y]) => {
        Y && Y !== K && Y in U && (U[K] = U[Y], delete U[Y]);
      }), U;
    }, _ = (N) => {
      const U = {};
      return Object.entries(v).forEach(([K, Y]) => {
        const xe = N[K];
        Y && xe !== void 0 && (U[Y] = xe);
      }), U;
    }, { onSubmit: C } = Ie("exaProvider", {}), $ = V([]), O = Rt([]), T = Rt(), A = /* @__PURE__ */ new Map(), j = /* @__PURE__ */ new Map(), E = (N) => {
      O.value = N.map(_), e.isView || (t.emit("update:fileList", O.value), L()), $.value = N;
    }, L = () => {
      if (e.isSingle) {
        const N = le(O.value[0]);
        T.value = c ? (N == null ? void 0 : N[c]) ?? (N == null ? void 0 : N[v.uid]) : N;
      } else
        c ? T.value = O.value.map((N) => N[c] ?? N[v.uid]) : T.value = O.value;
      t.emit("update:value", T.value);
    };
    W(
      () => le(e.value),
      (N) => {
        if (N !== T.value)
          if (T.value = N, !N)
            $.value = [];
          else {
            const U = we(N) ? N : [N];
            O.value = c ? U.map((K) => ({ [c]: K })) : U, $.value = O.value.map(S);
          }
      },
      { immediate: !0, flush: "sync" }
    ), W(
      () => le(e.fileList),
      (N) => {
        if (N && N !== O.value) {
          const U = N.map(S);
          E(U);
        }
      },
      { immediate: !0 }
    );
    const F = V(!1);
    C == null || C(() => {
      let N = Promise.resolve();
      if (n === "auto")
        for (const U of $.value) {
          if (U.status === "error") {
            const K = U.response || { message: "文件上传错误，请删除后重新上传！" };
            return Promise.reject(K);
          } else
            U.status === "uploading" && (F.value = !0);
          N = Promise.all(A.values());
        }
      else if (n === "submit") {
        const U = [];
        for (const K of $.value) {
          if (K.status !== "done") {
            F.value = !0, K.status = "uploading";
            const Y = j.get(K.uid);
            U.push(Y());
          }
          N = Promise.all(U);
        }
      }
      if (z.size && (F.value = !0), F.value) {
        const U = Kr(" 文件同步中，请稍候...");
        return N.then(
          (K) => (
            // 文件删除出错不中断提交
            Promise.all([...z.values()].map((Y) => Y())).then(() => K).catch((Y) => console.error(Y)).finally(() => (U == null || U.destroy(), F.value = !1, K))
          )
        ).catch((K) => (F.value = !1, U.setError("文件上传失败", K), !1));
      }
      return N;
    });
    const D = (N, U) => {
      if (e.beforeUpload) {
        const Y = e.beforeUpload(N, U);
        if (Y !== void 0)
          return Y;
      }
      const K = (() => {
        if (f > 1 && O.value.length + U.indexOf(N) >= f)
          return "文件数量最多" + f;
        if (d && !lg(N, d))
          return "请选择正确的文件类型！";
        if (s || o) {
          const Y = N.size / 1024 / 1024;
          if (s && s > Y)
            return "文件最小需要" + s + "M";
          if (o && o < Y)
            return "文件最大不超过" + o + "M";
        }
        if (!l) {
          const Y = $.value.find((xe) => xe.name === N.name);
          if (Y)
            return `文件重复: ${Y.name}`;
        }
      })();
      if (K)
        return Ln.error(K), Xr.LIST_IGNORE;
      if (n === "custom") {
        if (u !== !1)
          return !1;
      } else if (f === 1 && $.value.length) {
        const Y = $.value[0];
        if (A.delete(Y.uid), j.delete(Y.uid), Y.status === "done" && r.delete) {
          const xe = { ...O.value[0] };
          z.set(xe, () => r.delete(xe));
        }
      }
    };
    function x({ file: N, fileList: U, event: K }) {
      var Y;
      N.status === "removed" ? (A.delete(N.uid), j.delete(N.uid)) : N.status === "uploading" && !K && n !== "auto" && (N.status = "waiting"), (Y = e.onChange) == null || Y.call(e, { file: N, fileList: U, event: K }), E([...U]);
    }
    const M = (N) => {
      const { file: U } = N;
      if (n === "auto") {
        const K = R(N);
        return A.set(U.uid, K), K;
      } else if (n === "submit")
        j.set(U.uid, () => R(N));
      else if (n === "base64" || n === "text")
        return og(U, n).then(({ result: K }) => H({ url: K }, U));
    }, I = (N, U) => {
      const K = $.value.find((Y) => Y.uid === U.uid);
      return Object.assign(K, { error: N, status: "error" }), E([...$.value]), Promise.reject(N);
    }, H = (N, U) => {
      const K = $.value.find((Y) => Y.uid === U.uid);
      return Object.assign(K, S(N), { status: "done" }), E([...$.value]), N;
    }, R = (N) => {
      const { file: U, filename: K, onProgress: Y, onError: xe, onSuccess: dt } = N;
      if (!r.upload)
        return Promise.resolve().then(() => I(Error("Api config error"), U));
      const At = new FormData();
      At.append(K, U);
      const Ts = (He) => {
        He.total > 0 && (He.percent = He.loaded / He.total * 100), Y(He);
      };
      return r.upload(At, { onUploadProgress: Ts }).then(
        (He) => H(He, U),
        (He) => I(He, U)
      );
    }, z = /* @__PURE__ */ new Map(), G = async (N) => {
      var K;
      let U = await ((K = e.onRemove) == null ? void 0 : K.call(e, N));
      return U !== !1 && r.delete && N.status === "done" ? new Promise((Y) => {
        const xe = an.confirm({
          title: "确定删除吗？",
          okText: "确定",
          cancelText: "取消",
          closable: !1,
          maskClosable: !1,
          ...pe.Modal,
          onOk() {
            const dt = _(N), At = () => r.delete(dt);
            if (n === "submit")
              z.set(
                dt,
                () => At()
                // .then(
                //   () => removeFileMap.delete(__file)
                //   // () => updateFileList([...innerFileList.value, __file]) // 删除失败后还原文件
                // )
              ), Y(!0);
            else
              return xe.update({
                okCancel: !1,
                title: "文件删除中……"
              }), At().then(Y, () => (xe.update({
                okCancel: !1,
                title: "文件删除失败",
                type: "error",
                onOk: void 0
              }), Y(!1), Promise.reject()));
          },
          onCancel() {
            Y(!1);
          }
        });
      }) : U;
    }, se = V(!1), oe = b || ((N) => {
      if (r.download && !se.value) {
        const U = Kr("文件下载中，请稍候...");
        r.download(_(N)).then((K) => ig(K, N.name)).then(() => U.destroy()).catch((K) => {
          U.setError("文件下载失败", K);
        }).finally(() => F.value = !1);
      }
    }), be = J(
      () => typeof u == "boolean" ? u : {
        showRemoveIcon: !e.isView && !e.disabled,
        showDownloadIcon: e.isView,
        ...u
      }
    ), Te = async (N) => {
      if (g) {
        const U = await g(_(N));
        U && p.open(U);
      } else if (h(N)) {
        let U;
        const K = $.value.filter((Y) => h(Y)).map((Y, xe) => {
          Y === N && (U = xe);
          const dt = Y.url || Y.thumbUrl;
          return !dt && Y.originFileObj && (Y.objectUrl = window.URL.createObjectURL(Y.originFileObj)), dt || Y.objectUrl;
        });
        p.open({ images: K, current: U });
      }
    }, he = ({ file: N, listType: U }) => N.status === "waiting" ? w(ao) : N.status === "uploading" ? w(so) : w(oo), Ae = e.title, k = typeof e.title == "string" ? e.title : "上传文件", B = ee({ ...le(e.effectData), fileList: $ }), ne = Ue(Ae) && (() => Ae(B)), fe = [];
    d && fe.push("支持文件格式：" + d), o && fe.push("单个文件不超过" + o + "MB");
    const re = e.tip ?? fe.join(", "), me = { ...t.slots };
    y === "picture-card" ? me.default = () => {
      var N, U;
      return ((U = (N = t.slots).default) == null ? void 0 : U.call(N, B)) || w("div", [w(sn), ne ? ne() : w("div", { style: "margin-top:8px" }, k)]);
    } : me.default = () => {
      var N, U;
      return [
        ((U = (N = t.slots).default) == null ? void 0 : U.call(N, B)) || w(Z.Button, {}, () => [w(io), ne ? ne() : k]),
        re && w("div", { class: "sup-upload-tip" }, re)
      ];
    };
    const Be = J(() => e.disabled || e.isView), Cs = J(() => m && f && $.value.length >= f);
    return () => Be.value && $.value.length === 0 ? w("div", { class: "sup-upload-tip" }, "暂无附件") : w(
      Z.Upload,
      {
        class: { "upload-disabled": Be.value },
        customRequest: M,
        beforeUpload: D,
        fileList: $.value,
        onChange: x,
        onPreview: Te,
        onRemove: G,
        showUploadList: be.value,
        maxCount: f,
        isImageUrl: h,
        iconRender: he,
        onDownload: oe
      },
      {
        ...me,
        default: () => Be.value || (Cs.value ? null : me.default())
      }
    );
  }
}), dg = /* @__PURE__ */ Q({
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
  setup(e, { emit: t }) {
    const { Input: n, Tooltip: r, Tag: a } = Z, s = e, o = t, i = V(), l = V(""), u = V(!1), g = (d, y) => typeof s.closable == "function" ? s.closable(d, y) : s.closable, b = J(() => s.value ? typeof s.value == "string" ? s.value.split(",") : s.value : []), h = () => {
      u.value = !0, Ke(() => {
        i.value.focus();
      });
    }, m = (d) => {
      const y = b.value.filter((p) => p !== d);
      c(y);
    }, c = (d) => {
      s.stringifyValue || s.valueToString ? o("update:value", d.join(",")) : o("update:value", d);
    }, f = () => {
      l.value && b.value.indexOf(l.value) === -1 && c([...b.value, l.value]), u.value = !1, l.value = "";
    };
    return (d, y) => (q(), ve(Ce, null, [
      (q(!0), ve(Ce, null, Ge(b.value, (p, v) => (q(), ve(Ce, { key: p }, [
        p.length > 20 ? (q(), X(P(r), {
          key: 0,
          title: p
        }, {
          default: ie(() => [
            Me(P(a), ae({
              closable: g(p, v),
              onClose: (S) => m(p)
            }, { ref_for: !0 }, d.$attrs), {
              default: ie(() => [
                Cn(en(`${p.slice(0, 20)}...`), 1)
              ]),
              _: 2
            }, 1040, ["closable", "onClose"])
          ]),
          _: 2
        }, 1032, ["title"])) : (q(), X(P(a), ae({
          key: 1,
          closable: g(p, v),
          onClose: (S) => m(p)
        }, { ref_for: !0 }, d.$attrs), {
          default: ie(() => [
            Cn(en(p), 1)
          ]),
          _: 2
        }, 1040, ["closable", "onClose"]))
      ], 64))), 128)),
      u.value ? (q(), X(P(n), {
        key: 0,
        ref_key: "inputRef",
        ref: i,
        value: l.value,
        "onUpdate:value": y[0] || (y[0] = (p) => l.value = p),
        type: "text",
        size: "small",
        style: { width: "78px" },
        onBlur: f
      }, null, 8, ["value"])) : (q(), X(P(a), {
        key: 1,
        style: { background: "#fff", "border-style": "dashed" },
        onClick: h
      }, {
        default: ie(() => [
          Me(P(sn)),
          (q(), X(De(() => P(ce)(e.newLabel, e.effectData))))
        ]),
        _: 1
      }))
    ], 64));
  }
}), pg = {
  key: 1,
  class: "ant-form-item-extra"
}, bg = /* @__PURE__ */ Q({
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
  setup(e, { emit: t }) {
    const { CheckableTag: n } = Z, r = e, a = t, { optionsRef: s } = ft(r.option, r.options, r.effectData), o = J(() => {
      const { value: u } = r, g = r.stringifyValue || r.valueToString;
      return u === void 0 ? [] : g ? u.split(",") : Array.isArray(u) ? u : [u];
    }), i = (u, g) => {
      const b = r.multiple ? g ? [...o.value, u] : o.value.filter((h) => h !== u) : [u];
      a("check", u, g), l(b), a("change", u, b);
    }, l = (u) => {
      r.multiple ? r.stringifyValue || r.valueToString ? a("update:value", u.join(",")) : a("update:value", u) : a("update:value", u[0]);
    };
    return (u, g) => P(s).length ? (q(!0), ve(Ce, { key: 0 }, Ge(P(s), ({ label: b, value: h }) => (q(), X(P(n), ae({ ref_for: !0 }, u.$attrs, {
      class: "tag-select",
      key: h,
      checked: o.value.indexOf(h) > -1,
      onChange: (m) => i(h, m)
    }), {
      default: ie(() => [
        Cn(en(b), 1)
      ]),
      _: 2
    }, 1040, ["checked", "onChange"]))), 128)) : (q(), ve("div", pg, en(e.placeholder), 1));
  }
}), Ss = {
  Form: wb,
  Group: _n,
  Card: Ob,
  List: Cb,
  ListGroup: Tb,
  Tabs: xb,
  Table: qb,
  Collapse: Gb,
  Descriptions: _n,
  Fragment: _n
}, ws = {
  Textarea: zb,
  Input: Kb,
  InputNumber: Wb,
  InputGroup: $b,
  InputList: _b,
  AutoComplete: eg,
  Select: Zb,
  Switch: Jb,
  DateRange: Qb,
  TimeRange: Z.TimeRangePicker,
  DatePicker: Xb,
  TimePicker: Z.TimePicker,
  Radio: tg,
  Checkbox: ng,
  TreeSelect: rg,
  Upload: fg,
  TagInput: dg,
  TagSelect: bg
}, Yt = Object.keys(Ss), gg = Object.keys(ws), $s = { ...ws, ...Ss };
function mg(e, t) {
  const n = `Ext${e}`;
  $s[n] = (r) => w(t, r);
}
const _e = $s, ge = {
  tagViewer: ["pink", "red", "orange", "green", "cyan", "blue", "purple"]
}, pe = {
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
}, hg = async (e, t = {}) => {
  const { locale: n, components: r, defaultProps: a, ...s } = t;
  e.provide("localeData", { locale: n, exist: !0 }), Object.assign(ge, s), r && Jp(r), a && Os(a);
};
function _s(e, t) {
  mg(e, t);
}
function vg(e, t) {
  _s(e, t);
}
function Os(e) {
  mn(pe, e);
}
const Pg = {
  install: hg,
  registerComponent: _s,
  registComponent: vg,
  setDefaultProps: Os
};
const yg = (e) => {
  var t, n;
  return ((n = (t = ge.tableApiSetting) == null ? void 0 : t.resultTransform) == null ? void 0 : n.call(t, e)) || e;
}, Sg = (e) => {
  const { currentField: t, sizeField: n } = ge.tableApiSetting || {};
  return t || n ? {
    [t || "current"]: e.current,
    [n || "size"]: e.size
  } : e;
};
function wg(e, t) {
  const n = ee({}), r = V(!1);
  let a = {}, s = 0, o;
  const i = [], l = (v) => i.push(v);
  e.onLoaded && i.push(e.onLoaded);
  const u = async (v) => {
    var T, A, j;
    const S = Pt({}, Sg(n), a, v), _ = ((T = e.beforeQuery) == null ? void 0 : T.call(e, S)) || S, C = (A = e.apis) == null ? void 0 : A.query;
    o == null || o.abort();
    const $ = ++s;
    if (!C) {
      o = void 0, r.value = !1;
      return;
    }
    const O = new AbortController();
    o = O, r.value = !0;
    try {
      const E = await C(_, { signal: O.signal });
      if ($ !== s || O.signal.aborted)
        return;
      const L = ((j = e.afterQuery) == null ? void 0 : j.call(e, E)) || E;
      return g(yg(L));
    } finally {
      $ === s && (o = void 0, r.value = !1);
    }
  }, g = (v) => (Array.isArray(v) ? (t(v), p.value !== !1 && (n.current = 1, p.value = { ...p.value, total: v.length })) : v != null && v.records && (t(v.records), p.value !== !1 && (n.current = v.current, n.size = v.size, p.value = { ...p.value, total: v.total })), Promise.all(i.map((S) => S(v)))), b = (v, S = n.size) => (n.current = v, n.size = S, u()), h = (v) => (p.value && (n.current = 1), u(v)), m = jn(h, 300, { leading: !1 }), c = () => {
    o == null || o.abort(), o = void 0, s += 1, r.value = !1;
  }, f = {}, d = (v, S) => {
    S === "dynamic" ? a = Pt({}, f, v) : (Object.assign(f, v), Pt(a, v));
  }, y = () => a, p = V(!1);
  return W(
    () => {
      var v;
      return e.pagination ?? ((v = e.attrs) == null ? void 0 : v.pagination);
    },
    (v) => {
      if (v === !1) {
        p.value = !1;
        return;
      }
      Object.assign(n, { size: (v == null ? void 0 : v.pageSize) || 10, current: (v == null ? void 0 : v.current) || 1 }), p.value = ae(
        {
          onChange: b
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
  ), W(n, (v) => {
    p.value && (p.value = { ...p.value, pageSize: v.size, current: v.current });
  }), {
    goPage: b,
    reload: u,
    throttleRequest: m,
    cancelQuery: c,
    setQueryParams: d,
    getQueryParams: y,
    query: h,
    pagination: p,
    setPageData: g,
    onLoaded: l,
    loading: r
  };
}
function $g(e, t, n) {
  var p;
  const { columns: r, searchForm: a } = e, s = a || e.searchSchema || {}, o = V(), i = s.dataSource || ee({}), { buttons: l = {}, searchOnChange: u, limit: g, ...b } = s, h = V(!1), m = [];
  s.subItems.forEach((v) => {
    if (typeof v == "string") {
      const S = r.find((_) => _.field === v);
      S && m.push({ type: "Input", ...Lp(S, "span", "disabled", "hidden"), editable: !0, exclude: [] });
    } else
      return m.push({ ...v });
  }), g && m.length > g && m.forEach((v, S) => {
    if (S >= g) {
      const _ = v.hidden;
      v.hidden = (...C) => !h.value || (_ == null ? void 0 : _(...C));
    }
  });
  const c = {
    search() {
      var v;
      n(i), (v = s.onSubmit) == null || v.call(s, le(i));
    },
    reset(v) {
      o.value.resetFields(v);
    }
  }, f = Array.isArray(l) ? { actions: l } : { ...l };
  f.actions ?? (f.actions = u ? void 0 : ["search", "reset"]), (p = f.actions) != null && p.length && (g && m.length > g && (f.actions = [
    {
      label: () => h.value ? ["收起 ", w(uo)] : ["展开 ", w(ta)],
      attrs: { type: "link" },
      onClick: () => h.value = !h.value
    },
    ...f.actions
  ]), m.push({
    type: "InfoSlot",
    align: "right",
    span: "auto",
    render: () => w(Ve, {
      option: f,
      methods: c,
      effectData: ke({ table: t, form: o })
    })
  }));
  const d = W(o, () => {
    n(i), u && W(i, n), d();
  });
  return { formNode: () => w(_e.Form, {
    option: {
      ...b,
      ignoreRules: !0,
      dataSource: i,
      subItems: m
    },
    ref: o,
    onSubmit: c.search,
    onReset: c.search
  }), formRef: o, ...c, dataSource: i };
}
function _g(e) {
  return !e || !e.getBoundingClientRect ? 0 : e.getBoundingClientRect();
}
function Wr(e) {
  const t = document.documentElement, n = t.scrollLeft, r = t.scrollTop, a = t.clientLeft, s = t.clientTop, o = window.pageXOffset, i = window.pageYOffset, l = _g(e), { left: u, top: g, width: b, height: h } = l, m = (o || n) - (a || 0), c = (i || r) - (s || 0), f = u + o, d = g + i, y = f - m, p = d - c, v = window.document.documentElement.clientWidth, S = window.document.documentElement.clientHeight;
  return {
    left: y,
    top: p,
    right: v - b - y,
    bottom: S - h - p,
    rightIncludeBody: v - y,
    bottomIncludeBody: S - p
  };
}
function Og(e, t, n, r) {
  const a = cs(l, 100), s = V({});
  let o = !1;
  const i = () => {
    var h;
    o = !0, r ? window.addEventListener("resize", a, { signal: r.signal }) : document.addEventListener("redoHeight", a), s.value = (h = e.attrs) == null ? void 0 : h.scroll, W(
      () => {
        var m;
        return [n.value, (m = P(t)) == null ? void 0 : m.length];
      },
      () => {
        a();
      },
      { flush: "post" }
    );
    const b = W(
      n,
      (m) => {
        m && (m.style.overflow = "hidden", new ResizeObserver(() => {
          a();
        }).observe(m), b());
      },
      { immediate: !0, flush: "post" }
    );
  };
  on(() => {
    o && document.removeEventListener("redoHeight", a);
  });
  function l() {
    o && Ke(() => {
      g();
    });
  }
  function u(b) {
    s.value = {
      y: b,
      x: "100%"
      // scrollToFirstRowOnChange: true,
    };
  }
  async function g() {
    var M;
    const { maxHeight: b, inheritHeight: h, isFixedHeight: m, resizeHeightOffset: c } = e, f = P(n);
    if (!f)
      return;
    const d = f.querySelector(".ant-table");
    if (!d)
      return;
    await Ke();
    const y = getComputedStyle(f.parentElement), p = Wr(d), v = Wr(f), S = p.left - v.left, _ = (parseInt(y.marginBottom) || 0) + (parseInt(y.paddingBottom) || 0);
    let C = 0;
    f && h ? C = v.bottomIncludeBody - v.bottom - (p.top - v.top) : C = p.bottomIncludeBody - _;
    const $ = d.querySelector(".ant-table-title"), O = ($ == null ? void 0 : $.parentElement) === d ? $.offsetHeight ?? 0 : 0, T = d.querySelector(".ant-table-thead ");
    if (!T)
      return;
    let A = 0;
    T && (A = T.offsetHeight);
    let j = 0;
    const E = d.querySelector(".ant-table-footer");
    E && E.parentElement === d && (j += E.offsetHeight || 0);
    let L = 0;
    const F = f.querySelector(".ant-pagination");
    F && (L = F.offsetHeight + 16);
    let D = Math.ceil(C) - (c || 0) - S - L;
    const x = b || D - j - O - A - 1;
    if (b && m && (D = b + j + O + A + 1), m) {
      d.style.height = `${D}px`, d.style["overflow-y"] = "hidden", h || (f.style.height = "unset");
      const I = f.querySelector(".ant-table-wrapper");
      if (I.style.height = "", I.style["overflow-y"] = void 0, !(((M = P(t)) == null ? void 0 : M.length) > 0)) {
        if (d.querySelector(".ant-empty")) {
          const R = d.querySelector(".ant-table-tbody .ant-table-cell");
          R.style.height = `${x}px`;
        }
        return;
      }
    }
    if (d.scrollHeight > D)
      u(x);
    else {
      const I = d.querySelector(".ant-table-body");
      I && u(I.scrollHeight <= x ? null : x);
    }
  }
  return { getScrollRef: s, redoHeight: l, debounceRedoHeight: a, listenResize: i };
}
const Cg = Q({
  name: "SuperTable",
  inheritAttrs: !1,
  props: {
    dataSource: Array,
    schema: Object
  },
  emits: ["register", "load", "update:dataSource"],
  setup(e, t) {
    const { style: n, class: r, ...a } = t.attrs, s = jt({ attrs: a }), o = V([]), i = V(), l = (R) => {
      o.value = R, t.emit("update:dataSource", R), mt(s.dataSource) && (s.dataSource.value = R);
    };
    st(() => e.dataSource && l(e.dataSource)), st(() => s.dataSource && l(P(s.dataSource)));
    const u = V(), g = (R) => {
      ge.schemaDiagnostics && qt(R, "table", "SuperTable");
      const { isScanHeight: z, inheritHeight: G, isFixedHeight: se, isContainer: oe, ...be } = ae(
        pe.Table,
        { ...R.attrs },
        { ...s.attrs }
      );
      Object.assign(s, { isScanHeight: z, inheritHeight: G, isFixedHeight: se, isContainer: oe }, R, { attrs: be });
    };
    st(() => e.schema && g(le(e.schema)));
    const {
      loading: b,
      pagination: h,
      setPageData: m,
      onLoaded: c,
      goPage: f,
      reload: d,
      query: y,
      throttleRequest: p,
      cancelQuery: v,
      setQueryParams: S,
      getQueryParams: _
    } = wg(s, l), { getScrollRef: C, redoHeight: $, listenResize: O } = Og(s, o, i), T = Rt(), A = {
      setOption: g,
      setData: (R) => {
        R && l(R);
      },
      redoHeight: $,
      goPage: f,
      reload: d,
      query: y,
      onLoaded: c,
      resetSearchForm(R) {
        try {
          return u.value.formRef.resetFields(R);
        } catch (z) {
          console.warn(z);
        }
      },
      setPageData: m,
      getQueryParams: _,
      getData: () => o.value,
      dataRef: o,
      searchForm: J(() => {
        var R;
        return (R = u.value) == null ? void 0 : R.formRef;
      }),
      validate: async () => {
        var R;
        return (R = T.value) == null ? void 0 : R.validate();
      },
      setColumns: (R) => {
        var z;
        !M && !((z = s.columns) != null && z.length) ? Object.assign(s, { columns: R }) : (Object.assign(s, { columns: R }), H(R));
      }
    }, j = V({ ...A }), E = (R) => {
      Object.assign(j.value, Ye(R), A), t.emit("register", j.value);
    };
    t.emit("register", j.value), t.expose(j.value);
    const L = ee({
      reload: d,
      onRegister: E,
      loading: b
    });
    on(() => {
      v(), t.emit("register", null);
    }), tt("rootSlots", t.slots);
    const F = V({}), D = V(), x = ee({ formData: o, current: o, queryParams: J(_) });
    let M = !1;
    const I = W(
      s,
      (R) => {
        var ne, fe;
        if (!((ne = R == null ? void 0 : R.columns) != null && ne.length))
          return;
        if (D.value) {
          I();
          return;
        }
        const { columns: z, maxHeight: G, isScanHeight: se = !0, inheritHeight: oe } = R, be = ee({
          refData: o,
          listData: St(z)
        });
        F.value = Ct(s.slots, x, t.slots);
        const Te = R.searchForm || R.searchSchema, {
          attrs: { onLoad: he, ...Ae }
        } = Ne({ option: R, effectData: x });
        Object.assign(L, Ae, { pagination: h }), c((re) => {
          t.emit("load", re), he == null || he(re);
        }), Te && (u.value = $g(R, j, (re) => {
          S(re, "form"), M && p();
        }));
        const k = R.tabs && R.tabs.field;
        if (R.tabs && k) {
          const re = (fe = R.tabs).activeKey ?? (fe.activeKey = V(R.tabs.defaultActiveKey)), me = {};
          W(
            re,
            (Be) => {
              Be !== void 0 && (Ut(me, k, Be), S(me), M && p());
            },
            { immediate: !0 }
          );
        }
        if (W(
          V(R.params),
          (re) => {
            S(re, "dynamic"), M && p();
          },
          { deep: !0, immediate: !0 }
        ), Ke(() => {
          M = !0, s.immediate !== !1 && p();
        }), se || oe || G) {
          O(), L.scroll = C;
          const { onChange: re, onExpandedRowsChange: me } = L;
          L.onChange = (...Be) => {
            re == null || re(...Be);
          }, L.onExpandedRowsChange = (Be) => {
            me == null || me(Be), $();
          }, W(o, $);
        }
        const B = () => w(_e.Table, { option: s, effectData: x, model: be, ...L }, F.value);
        s.editable ? D.value = () => w(Z.Form, { model: o.value, ref: T }, B) : D.value = B;
      },
      {
        immediate: !0
      }
    ), H = (R) => {
      const z = ee({
        refData: o,
        listData: St(R)
      }), G = () => w(_e.Table, { option: s, effectData: x, model: z, key: Symbol(), ...L }, F.value);
      s.editable ? D.value = () => w(Z.Form, { model: o.value, ref: T }, G) : D.value = G;
    };
    return () => D.value && w(
      tr,
      { name: "exaProvider", data: { data: o } },
      () => {
        var R, z;
        return !u.value || (R = s.searchForm) != null && R.teleport ? w(
          "div",
          ae(
            {
              ref: i,
              class: [s.isContainer && "sup-container", "sup-table", "sup-form-section"]
            },
            {
              class: r,
              style: n
            }
          ),
          [
            ((z = s.searchForm) == null ? void 0 : z.teleport) && w(
              bo,
              { to: s.searchForm.teleport },
              w("div", { class: "sup-form-section sup-table-search" }, w(u.value.formNode))
            ),
            D.value()
          ]
        ) : w(
          "div",
          ae(
            { ref: i, class: [s.isContainer && "sup-container", "sup-table"] },
            { class: r, style: n }
          ),
          [
            w("div", { class: "sup-form-section sup-table-search" }, w(u.value.formNode)),
            w("div", { class: "sup-form-section section-last" }, w(D.value))
          ]
        );
      }
    );
  }
}), Rg = (e, t) => {
  const [n, r] = hs(), a = Promise.resolve(typeof e == "function" ? e() : e), s = (i) => {
    if (i)
      n.value || (a.then(i.setOption), t && i.setData(t)), n.value = i;
    else if (i === null)
      n.value = void 0;
    else
      return (l, u) => w(Cg, { ...l, onRegister: s }, u == null ? void 0 : u.slots);
  }, o = async (i, l) => {
    const u = await r();
    if (i && i in u)
      return typeof u[i] == "function" ? u[i](l) : u[i];
  };
  return [
    s,
    {
      /** 异步获取表格引用 */
      getTable: r,
      tableRef: n,
      redoHeight() {
        o("redoHeight");
      },
      setData(i) {
        o("setPageData", i);
      },
      /** 返回当前表格数据 */
      getData() {
        var i;
        return Oe((i = n.value) == null ? void 0 : i.dataRef);
      },
      dataSource: J(() => {
        var i;
        return (i = n.value) == null ? void 0 : i.dataRef;
      }),
      /** 跳转到指定页 */
      goPage(i) {
        var l;
        (l = n.value) == null || l.goPage(i);
      },
      /** 设置表格列 */
      setColumns(i) {
        o("setColumns", i);
      },
      /** 刷新数据，不改动查询条件与当前页 */
      reload() {
        var i;
        return (i = n.value) == null ? void 0 : i.reload();
      },
      /** 手动执行条件查询，不覆盖搜索表单参数 */
      query(i) {
        var l;
        return (l = n.value) == null ? void 0 : l.query(i);
      },
      /** 查询完成，返回结果回调 */
      onLoaded(i) {
        o("onLoaded", i);
      },
      /** 重置查询表单，并重新查询 */
      resetSearchForm(i) {
        var l;
        (l = n.value) == null || l.resetSearchForm(i);
      },
      getQueryParams: () => {
        var i;
        return (i = n.value) == null ? void 0 : i.getQueryParams();
      },
      // setQueryParams: (params: Obj) => asyncCall('setQueryParams', params),
      selectedRowKeys: J(() => {
        var i;
        return (i = n.value) == null ? void 0 : i.selectedRowKeys;
      }),
      selectedRows: J(() => {
        var i;
        return (i = n.value) == null ? void 0 : i.selectedRows;
      }),
      /** 设置选中行 */
      setSelectedRows: (i) => {
        var l;
        return (l = n.value) == null ? void 0 : l.setSelectedRows(i);
      },
      expandedRowKeys: J(() => {
        var i;
        return (i = n.value) == null ? void 0 : i.expandedRowKeys;
      }),
      setExpandedRowKeys: (i) => {
        var l;
        return (l = n.value) == null ? void 0 : l.setExpandedRowKeys(i);
      },
      expandAll() {
        o("expandAll");
      },
      /** 新增行 */
      add: (i) => {
        var l;
        return (l = n.value) == null ? void 0 : l.add(i);
      },
      /** 修改行，须判断是否已有选中行 */
      edit: (i) => {
        var l;
        return (l = n.value) == null ? void 0 : l.edit(i);
      },
      /** 删除行，须判断是否已有选中行 */
      delete: () => {
        var i;
        return (i = n.value) == null ? void 0 : i.delete();
      },
      /** 查看详情，须判断是否已有选中行 */
      detail: (i) => {
        var l;
        return (l = n.value) == null ? void 0 : l.detail(i);
      },
      asyncCall: o,
      /** `editable`模式下进行表单校验 */
      validate() {
        return o("validate");
      }
    }
  ];
};
function jg(e) {
  return e;
}
const Tg = Q({
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
    var o;
    const n = (o = t.default) == null ? void 0 : o.call(t), { effectData: r, ...a } = e, s = n ? n.flatMap(({ children: i, props: l = {} }) => {
      const { roleName: u, onClick: g, confirmText: b, tooltip: h, disabledTooltip: m, icon: c, ...f } = xp(
        l,
        (d, y) => jc(y)
      );
      return !g || !i ? [] : {
        label: i.default || i,
        icon: c,
        tooltip: h,
        disabledTooltip: m,
        roleName: u,
        onClick: g,
        confirmText: b,
        attrs: f
      };
    }) : e.actions;
    return () => w(Ve, { option: { ...a, actions: s }, effectData: r });
  }
});
function Fg(e) {
  return [() => w(Tg, e)];
}
const Ag = Q({
  props: {
    dataSource: Object,
    schema: Object
  },
  emits: ["register"],
  setup(e, t) {
    var o;
    const n = Rt(e.schema || {});
    ge.schemaDiagnostics && e.schema && qt(e.schema, "detail", "SuperDetail");
    const r = V(((o = e.schema) == null ? void 0 : o.dataSource) || {});
    W(
      () => e.dataSource,
      (i) => {
        i && (r.value = i);
      },
      { immediate: !0 }
    );
    const a = {
      setOption: (i) => {
        ge.schemaDiagnostics && qt(i, "detail", "SuperDetail"), n.value = i, i.dataSource && (r.value = i.dataSource);
      },
      setData: (i) => {
        r.value = i;
      }
    }, s = V();
    return W(
      n,
      (i) => {
        if (!(i != null && i.subItems))
          return;
        const l = St(i.subItems, r);
        s.value = l.modelsMap;
      },
      { immediate: !0 }
    ), t.expose(a), t.emit("register", a), tt("exaProvider", sa({ data: r })), tt("rootSlots", t.slots), () => s.value && w(
      "div",
      { class: ["sup-detail", n.value.isContainer && "sup-container"] },
      w(rt, {
        option: {
          type: "Descriptions",
          ...n.value
        },
        ...n.value.attrs,
        ...n.value.descriptionsProps,
        modelsMap: s.value,
        isRoot: !0
      })
    );
  }
});
function Eg(e, t) {
  const n = Se(t), r = V(), a = Promise.resolve(typeof e == "function" ? e() : e), s = (o) => {
    if (o)
      r.value || (a.then(o.setOption), n.value && W(
        n,
        (i) => {
          o.setData(i);
        },
        { immediate: !0 }
      )), r.value = o;
    else
      return (i) => w(Ag, { ...i, onRegister: s }, go());
  };
  return [
    s,
    {
      setData(o) {
        r.value ? r.value.setData(o) : n.value = o;
      }
    }
  ];
}
function Ng(e) {
  return e;
}
export {
  Tg as SuperButtons,
  Ag as SuperDetail,
  Db as SuperForm,
  Cg as SuperTable,
  vs as createModal,
  Pg as default,
  Ng as defineDetail,
  Mg as defineForm,
  jg as defineTable,
  pb as diagnoseSchema,
  Fg as useButtons,
  Eg as useDetail,
  Mb as useForm,
  ys as useModal,
  Ig as useModalForm,
  Rg as useTable
};
