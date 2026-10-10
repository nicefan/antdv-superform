import { shallowRef as Te, defineComponent as oe, reactive as H, provide as Be, h as _, toRef as he, inject as we, mergeProps as ve, unref as ae, toRefs as $e, toRaw as fe, computed as W, watch as Z, ref as $, shallowReactive as Ke, onMounted as Vt, toValue as be, getCurrentInstance as Bt, onUnmounted as $t, readonly as xn, isRef as He, onScopeDispose as Xt, markRaw as fa, watchEffect as Ne, openBlock as Ie, createBlock as Je, resolveDynamicComponent as st, onBeforeUnmount as ct, nextTick as Ae, render as dt, createVNode as kn, createElementBlock as St, Fragment as pa, renderList as va, toDisplayString as ma, cloneVNode as _n, Teleport as ba, useSlots as ha } from "vue";
import { defaults as Ue, get as Re, set as ft, isFunction as lt, isArray as ga, merge as bt, isPlainObject as Ve, cloneDeep as _e, isNumber as Qe, update as ya, uniq as wa, mergeWith as Sa, ElButton as xe, ElDescriptions as Ca, ElDescriptionsItem as xa, ElTabs as An, ElTabPane as Mn, ElCollapse as ka, ElCollapseItem as _a, ElTable as Aa, ElTableColumn as Zt, ElCard as En, ElPagination as Ma, ElDivider as Ea, ElDropdown as Dn, ElDropdownMenu as On, ElDropdownItem as jt, ElSpace as Pn, ElTooltip as In, useNamespace as Da, ElUpload as Oa, ElProgress as Pa, ElForm as Ia, ElFormItem as Ta, ElRow as Ra, ElCol as ja, ElTag as Fa, ElCheckTag as Jt, ElEmpty as La, ElDialog as Tn, ElImageViewer as za, ElMessage as Na, mapKeys as Va, throttle as Ba, omit as $a, debounce as Ua, isEqual as en, camelCase as qa, ElInput as yt, ElInputNumber as Ka, ElInputOtp as Ha, ElInputTag as Wa, ElAutocomplete as Ga, ElMention as Ya, ElSelect as Qa, ElSelectV2 as Xa, ElCascader as Za, ElTreeSelect as Ja, ElRadio as el, ElRadioGroup as tl, ElCheckbox as nl, ElCheckboxGroup as al, ElSwitch as ll, ElDatePicker as tn, ElTimePicker as nn, ElTimeSelect as ol, ElColorPicker as rl, ElRate as sl, ElSlider as il, ElSegmented as ul, ElTransfer as cl } from "./element-plus.js";
let et = (e = 21) => crypto.getRandomValues(new Uint8Array(e)).reduce((t, n) => (n &= 63, n < 36 ? t += n.toString(36) : n < 62 ? t += (n - 26).toString(36).toUpperCase() : n > 62 ? t += "-" : t += "_", t), "");
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
], jn = new Set(Rn), Ct = {
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
}, br = {
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
}, Fn = Te(Ct);
function dl(e = Ct) {
  var t;
  const n = { ...Ct.messages };
  for (const a of Object.keys(n))
    n[a] = ((t = e.messages) == null ? void 0 : t[a]) ?? n[a];
  Fn.value = { name: e.name ?? Ct.name, messages: n };
}
function L(e, t = {}) {
  return Fn.value.messages[e].replace(/\{(\w+)\}/g, (n, a) => String(t[a] ?? ""));
}
function an(e) {
  const t = () => _("div", e.contentAttrs, [e.content()]);
  if (e.component)
    return _(
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
  return _("div", ve(e.attrs || {}, { class: "sup-group" }), [
    (e.title || !n && e.extra) && _(
      "div",
      {
        class: "sup-titlebar",
        style: { display: "flex", alignItems: "center" }
      },
      [
        e.title && _("div", { class: "sup-title" }, [e.title()]),
        !n && e.extra && _(
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
    n && e.extra && _(
      "div",
      {
        class: "sup-bottom-buttons",
        style: { textAlign: e.extraAlign }
      },
      [e.extra()]
    )
  ]);
}
const fl = /* @__PURE__ */ new Set(["group", "card", "tabs", "collapse", "descriptions", "upload"]);
function Ln(e = {}) {
  return Ut(Object.fromEntries(Object.entries(e).map(([t, n]) => [t, { render: n }]))).render;
}
function Ut(e = {}) {
  const t = {}, n = { render: t };
  for (const a of Object.keys(e)) {
    const l = e[a];
    if (!l)
      continue;
    l.service && Object.assign(n, { [a]: l.service }), l.schemaDefaults && (n.defaults = { ...l.schemaDefaults });
    const { defaults: o, adaptProps: r } = l, i = fl.has(a), s = l.render, p = l.component;
    Object.assign(t, {
      [a]: (u = {}, d = {}) => {
        const v = i ? u.attrs || {} : u, g = {
          type: a,
          attrs: o ? { ...o, ...v } : v,
          state: u,
          slots: i && u.slots || d
        };
        return r && (g.attrs = r(g.attrs, g)), i && (g.state = { ...u, attrs: g.attrs, slots: g.slots }), s ? s(g) : _(p, g.attrs, g.slots);
      }
    });
  }
  return n;
}
const zn = /* @__PURE__ */ new Map(), Nn = /* @__PURE__ */ new Map(), it = /* @__PURE__ */ new Map();
function Vn(e, t = "manual") {
  const n = t === "manual" ? zn : Nn;
  Object.entries(e).forEach(([a, l]) => {
    l && n.set(a, l);
  });
}
function qt(e) {
  var t;
  const n = We();
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
  return it.get(a) ?? l.map((o) => zn.get(o)).find(Boolean) ?? l.map((o) => Nn.get(o)).find(Boolean);
}
function pl(e) {
  var t;
  const n = it.get(e);
  if (n)
    return n;
  const a = qt(e);
  if (!a)
    throw new Error(
      `UIAdapter '${We().name}' 支持字段 '${e}'，但组件 '${e}' 尚未注册；请启用自动导入插件，或在 superForm.initialize({ components }) 中提供`
    );
  const l = ((t = We().fieldSources) == null ? void 0 : t[e]) ?? e;
  return it.set(l, a), it.set(e, a), a;
}
function Bn(e) {
  const t = it.get(e);
  if (!t)
    throw new Error(`原始 UI 组件 '${e}' 尚未加载`);
  return t;
}
let Xe;
function vl(e) {
  if (!("uiComponents" in e))
    return e;
  const { uiComponents: t, ...n } = e, a = Ut(t);
  return { ...n, ...a, render: { ...a.render, ...Ln(e.render) } };
}
function We() {
  if (!Xe)
    throw new Error(
      "SuperForm 尚未初始化 UIAdapter；官方产品请先调用 superForm.initialize()，独立 Core 请调用 superForm.useAdapter(adapter)"
    );
  return Xe;
}
function ln(e) {
  if (Xe) {
    if (Xe !== e)
      throw new Error(`UIAdapter 已初始化为 '${Xe.name}'，不能切换为 '${e.name}'`);
    return;
  }
  Xe = e, Vn(e.fieldComponents || {}, "manual");
}
function $n(e, t = {}) {
  const { uiComponents: n, ...a } = t, l = Ut(n);
  return {
    ...e,
    ...l,
    ...a,
    defaults: { ...e.defaults, ...l.defaults },
    render: { ...e.render, ...l.render, ...Ln(t.render) }
  };
}
const on = {};
function X(e) {
  const t = on[e];
  if (t)
    return t;
  const n = We();
  let a = n.render[e];
  if (e === "group") {
    const l = n.render.group || an;
    a = (o) => o.component ? an(o) : l(o);
  } else
    e === "compactSpace" && (a || (a = n.render.space));
  if (!a)
    throw new Error(`UIAdapter '${n.name}' 未提供 render.${e}`);
  return on[e] = a, a;
}
function Ce(e) {
  const t = We(), n = t[e];
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
function ml(e, t) {
  return (...n) => {
    const a = e(...n);
    for (const l of Array.isArray(t) ? t : [t])
      typeof l == "function" && l !== e && l(...n);
    return a;
  };
}
function Kt({ prop: e = "value", event: t = "update:value" } = {}, n) {
  const a = t.startsWith("on") ? t : `on${t[0].toUpperCase()}${t.slice(1)}`;
  return (l, o) => {
    const r = { ...n ? n(l, o) : l }, { binding: i, state: s, option: p, effectData: u } = o;
    s.disabled !== void 0 && (r.disabled = s.disabled), p.disabledDate !== void 0 && (r.disabledDate = (...d) => p.disabledDate(u, ...d));
    for (const [d, v] of Object.entries(i)) {
      if (p.labelField && (d === "labelValue" || d === "onUpdate:labelValue"))
        continue;
      const g = d === "value" ? e : d === "onUpdate:value" ? a : d;
      r[g] = d.startsWith("onUpdate:") && typeof v == "function" ? ml(v, r[g]) : v;
    }
    return r;
  };
}
function bl(e, t) {
  return Object.fromEntries(
    Object.entries(e).map(([n, { model: a, ...l }]) => [
      n,
      {
        ...l,
        // 两条渲染路径共用绑定和属性转换，扩展渲染不能再次合成原生事件。
        adaptProps: Kt(a ?? t, l.adaptProps)
      }
    ])
  );
}
const rn = /* @__PURE__ */ new Map(), hl = Kt();
function qn(e) {
  var t, n;
  const a = rn.get(e);
  if (a)
    return a;
  const l = We();
  if (!l.supportedFields.includes(e))
    return;
  const o = (t = l.fields) == null ? void 0 : t[e], r = (o == null ? void 0 : o.component) ?? (o != null && o.render && !qt(e) ? void 0 : pl(e)), i = (o == null ? void 0 : o.adaptProps) ?? l.adaptFieldProps ?? hl, s = (n = o == null ? void 0 : o.processors) != null && n.some((u) => ["options", "picker", "range"].includes(u)) ? "select" : "input", p = {
    ...o,
    type: e,
    component: r,
    render(u) {
      var d;
      const v = Object.assign(i(u.attrs, u), o == null ? void 0 : o.fixedProps), g = ((d = o == null ? void 0 : o.adaptSlots) == null ? void 0 : d.call(o, u.slots, u)) ?? u.slots;
      return o != null && o.render ? o.render({ ...u, attrs: v, slots: g }) : _(r, v, g);
    },
    // 缓存提示类型，在消费时读取语言和标签，支持已挂载字段切换语言。
    // defaults/attrs 的 class/style 按 Vue 规则合并；fixedProps 最后直接覆盖，不能被用户配置改写。
    getAttrs: (u, d, v = {}) => Object.assign(
      ve(
        { placeholder: v.placeholder ?? L(s, { label: d.label }) },
        (o == null ? void 0 : o.defaults) ?? {},
        u,
        // 两套 UI 均接收标准 options；只在专项结果存在时覆盖，空数组也有效。
        v.options === void 0 ? {} : { options: v.options }
      ),
      o == null ? void 0 : o.fixedProps
    ),
    adaptProps: i
  };
  return rn.set(e, p), p;
}
function Ge(e) {
  var t, n;
  return (n = (t = Ce("icons").semantic) == null ? void 0 : t[e]) == null ? void 0 : n.call(t);
}
function Oe(e) {
  const t = we("exaProvider", {}).data;
  return H({ ...e || {}, formData: t });
}
function sn(e, t) {
  const n = $(He(e) ? e : !!e);
  return typeof e == "function" && Ne(() => {
    n.value = e(t);
  }), n;
}
function Ft(e, t) {
  const n = H({});
  return e && Ne(() => {
    Object.assign(n, e(t));
  }), n;
}
function gl(e = {}, t) {
  const n = {};
  return Object.keys(e).forEach((a) => {
    !e[a] || a === "onUpdate" || (a.match(/^on[A-Z]/) ? n[a] = (...l) => e[a](t, ...l) : a === "on" && Object.entries(e.on).forEach(([l, o]) => {
      const r = "on" + l.charAt(0).toUpperCase() + l.slice(1);
      n[r] = (...i) => o(t, ...i);
    }));
  }), n;
}
function Ht({ option: e, model: t, effectData: n }, a) {
  const {
    field: l,
    endField: o,
    labelField: r,
    stringifyValue: i,
    computed: s,
    value: p,
    onUpdate: u
  } = e, d = {}, v = e.vModelFields || {};
  if (r && (d.labelValue = W(() => Re(t.parent, r)), d["onUpdate:labelValue"] = (c) => {
    const m = i ? c == null ? void 0 : c.toString() : c;
    ft(t.parent, r, m);
  }), Object.entries(v).forEach(([c, m]) => {
    var S;
    typeof m == "string" ? ((S = t.parent)[m] ?? (S[m] = void 0), d[c] = W(() => Re(t.parent, m)), d[`onUpdate:${c}`] = (A) => {
      ft(t.parent, m, A);
    }) : He(m) ? (d[c] = m, d[`onUpdate:${c}`] = (A) => m.value = A) : d[c] = m;
  }), !l)
    return He(p) && Object.assign(d, {
      value: p,
      "onUpdate:value": (c) => p.value = c
    }), d;
  a !== void 0 && (t.refData ?? (t.refData = be(a)));
  const g = he(t, "refData"), y = $(), h = (c = be(a)) => {
    y.value = c, g.value !== c && a !== void 0 && (g.value = c);
  };
  Object.assign(d, {
    value: y,
    "onUpdate:value": h
  }), He(p) && (Z(g, (c) => p.value = c), Z(p, h));
  let b = be(t.refData), k;
  if (o)
    y.value = [g.value, t.parent[o]], k = (c) => {
      const [m, S] = c || [];
      g.value = m, b = m, t.parent[o] = S;
    }, Z([g, () => t.parent[o]], (c) => {
      y.value = c;
    });
  else if (i) {
    const c = (m) => (m == null ? void 0 : m.toString().split(",")) || [];
    y.value = c(g.value), k = (m) => {
      const S = (m == null ? void 0 : m.toString()) || "";
      g.value = S, b = S;
    }, Z(g, (m) => {
      m !== b && (y.value = c(m));
    });
  } else
    y.value = b, k = (c) => {
      g.value = c, b = c;
    }, Z(g, h);
  return Z(y, k, { flush: "sync" }), u && Z(g, () => u(n)), s && Z(
    // 使用ref让计算结果即使一样也会进行后面的赋值
    () => $(s(b, n)),
    (c) => k(ae(c)),
    { immediate: !0 }
  ), d;
}
function De({ option: e, effectData: t, inheritDisabled: n }) {
  const { type: a, dynamicAttrs: l, disabled: o, hidden: r, required: i } = e, s = sn(r, t), p = sn(i, t), u = n === void 0 && o === void 0 ? void 0 : W(() => {
    let b = be(n);
    if (!(!b && o === void 0))
      return b || (typeof o == "function" ? b = !!o(t) : b = be(o)), b;
  }), d = gl(e, t), v = typeof l == "function" ? { ...$e(Ft(l, t)) } : {}, g = ve({ ...ue[a] }, { ...e.attrs }, d, v), y = bt({}, e.attrs, g);
  return { attrs: { ...y, ...u && {
    disabled: W(() => u.value ?? be(y.disabled))
  } }, nativeAttrs: y, disabled: u, hidden: s, required: p };
}
const un = {
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
}, cn = {
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
function yl(e, t, n, a) {
  let l;
  if (t)
    l = { type: e, len: t, message: "len" };
  else if (Qe(n) && Qe(a))
    l = { type: e, max: n, min: a, message: "range" };
  else if (Qe(n))
    l = { type: e, max: n, message: "max" };
  else if (Qe(a))
    l = { type: e, min: a, message: "min" };
  else
    return !1;
  return e === "number" ? (l.message = cn.number[l.message], l.transform = (o) => Number(o)) : l.message = cn.string[l.message], l;
}
function wl(e, t = "") {
  const { trigger: n, required: a, type: l = "string", len: o, max: r, min: i, pattern: s, validator: p, message: u } = e || {}, d = [];
  a && (l === "string" || l in un ? d.push({
    required: a,
    trigger: n,
    // validator: noEmpty,
    pattern: /^[\s\S]*.*[^\s][\s\S]*$/,
    // transform: (value) => value + '',
    // whitespace: true,
    message: u ?? (() => L("required", { label: t }))
  }) : d.push({ required: a, trigger: n, message: u ?? (() => L("required", { label: t })) }));
  const v = un[l];
  if (v) {
    const g = u ?? (() => L(v.message, { label: t }));
    d.push({ ...v, trigger: n, message: g });
  }
  if (s && d.push({ pattern: s, trigger: n, message: u }), o || Qe(r) || Qe(i)) {
    const g = yl(l, o, r, i), y = u ?? (() => L(g.message, { label: t, len: o, max: r, min: i }));
    d.push({ ...g, trigger: n, message: y, type: l });
  }
  return p && d.push({ validator: p, trigger: n }), d;
}
function Kn(e, t, n) {
  const { field: a, columns: l, subItems: o, initialValue: r, value: i } = e, s = e.endField ?? e.labelField, p = a ? a.split(".") : [], u = n.concat(p), d = p.splice(-1)[0], v = H({
    refName: d,
    initialValue: r,
    fieldName: a,
    origin: t,
    parent: t,
    refData: t,
    propChain: u
  });
  return d ? (p.length && (v.parent = W(() => Re(t.value, p))), v.refData = W({
    get: () => Re(t.value, a),
    set: (g) => ft(t.value, a, g)
  }), Z(
    t,
    () => {
      v.refData ?? (v.refData = be(r) ?? be(i) ?? (l && [] || o && {})), s && ya(v.parent, s, (g) => g);
    },
    { immediate: !0, flush: "sync" }
  )) : i && (v.refData = $(i), v.propChain = []), v;
}
const pt = (e, t) => e == null ? void 0 : e.map((n) => n.validator ? { ...n, validator: async (l, ...o) => {
  const r = await n.validator({ ...l, ...t }, ...o);
  if (r === !1 || r instanceof Error)
    throw r;
} } : n);
function nt(e, t, n = []) {
  const a = he(t || {}), l = {}, o = /* @__PURE__ */ new Map();
  return e.forEach((r) => {
    if (typeof r != "object")
      return;
    const i = Kn(r, a, n), { required: s, label: p, subItems: u, columns: d } = r;
    if (r.rules || s) {
      const v = r.rules || [], g = Array.isArray(v) ? v : [v];
      if (s) {
        const h = g[0];
        h ? h.required = s : g.push({ required: s });
      }
      let y = "string";
      if (i.refData) {
        const h = typeof i.refData;
        y = h === "object" && Array.isArray(i.refData) ? "array" : h;
      }
      i.rules = g.map((h) => wl({ type: y, ...h }, p)).flat(), i.propChain.length && (l[i.propChain.join(".")] = i.rules);
    }
    if (u) {
      const v = nt(u, he(i, "refData"), i.propChain);
      Object.assign(l, v.rules), i.children = v.modelsMap;
    } else
      d && (i.listData = nt(d));
    o.set(fa(r), i);
  }), {
    rules: l,
    modelsMap: o
  };
}
function vt(e, t, n) {
  const a = e.propChain;
  if (e.index === n && a.length === t.length && a.every((o, r) => o === t[r]))
    return;
  const l = (o) => {
    var r, i;
    (r = o.propChain) != null && r.length && a.every((s, p) => o.propChain[p] === s) && (o.propChain = [...t, ...o.propChain.slice(a.length)]), o.index !== void 0 && (o.index = n), (i = o.children) == null || i.forEach(l);
  };
  l(e);
}
function Ye(e, t, n = [], a) {
  const l = he(t || {}), o = {}, r = [...e].map(([i, s]) => {
    const { children: p, rules: u, listData: d } = s, v = a !== void 0 ? [...n, a] : n, g = Kn(i, l, v);
    if (a !== void 0 && (g.index = a), g.rules = u, g.propChain.length && u && (o[g.propChain.join(".")] = u), p) {
      const { modelsMap: y, rules: h } = Ye(p, he(g, "refData"), g.propChain);
      Object.assign(o, h), g.children = y;
    }
    return d && (g.listData = d), [i, g];
  });
  return { modelsMap: new Map(r), rules: o };
}
function Hn(e, t, n, a) {
  const { modelsMap: l, rules: o } = Ye(e, t, n, a), r = [];
  return function i(s) {
    for (const [p, u] of s)
      r.push([p, u]), u.children && i(u.children);
  }(l), { modelsMap: new Map(r), rootModels: l, rules: o };
}
const Sl = (e, t) => Object.prototype.hasOwnProperty.call(e, t);
function Wn(e, t = {}, n = {}) {
  for (const [a, l] of Object.entries(e))
    Array.isArray(l) ? e[a] = _e((t == null ? void 0 : t[a]) ?? (n == null ? void 0 : n[a])) : Object.prototype.toString.call(l) === "[object Object]" ? Wn(l, t == null ? void 0 : t[a], n == null ? void 0 : n[a]) : e[a] = (t == null ? void 0 : t[a]) ?? (n == null ? void 0 : n[a]);
}
function Gn(e, t, n = {}) {
  for (const [a, l] of Object.entries(e)) {
    if (!Sl(t, a))
      continue;
    const o = t[a] ?? (n == null ? void 0 : n[a]);
    Ve(l) && Ve(o) ? Gn(l, o, n == null ? void 0 : n[a]) : Array.isArray(o) || Ve(o) ? e[a] = _e(o) : e[a] = o;
  }
}
function dn() {
  let e;
  return { promise: new Promise((n) => {
    e = n;
  }), resolve: e };
}
function Lt() {
  const e = $();
  let t = dn(), n = !0;
  return Z(e, (l) => {
    l ? (t.resolve(!0), n = !1) : n || (t = dn(), n = !0);
  }), [e, () => t.promise.then(() => e.value)];
}
function ie(e, t = {}) {
  return e ? typeof e == "function" ? e(t || {}, {}) : typeof e != "object" ? _("span", e) : _(e, { effectData: t }) : null;
}
const Se = {
  tagViewer: ["pink", "red", "orange", "green", "cyan", "blue", "purple"]
};
function ot(e, t, n) {
  const a = n || we("rootSlots", {}), l = {};
  return e && Object.entries(e).forEach(([o, r]) => {
    const i = typeof r == "string" ? a[r] : r;
    i && (l[o] = (s) => typeof i == "function" ? i({ ...t, ...s || {} }) : i);
  }), l;
}
function Wt(e, t, n = !1, a = {}) {
  if (t != null)
    for (const l of e) {
      const o = l[a.value ?? "value"];
      if (Object.is(o, t) || n && String(o) === t)
        return l;
      const r = l[a.children ?? "children"], i = Array.isArray(r) && Wt(r, t, n, a);
      if (i)
        return i;
    }
}
function At(e, t = {}, n = !0) {
  const a = $([]);
  let l = 0;
  (e == null ? void 0 : e.source) !== void 0 && e.dictName !== void 0 && console.warn("[SuperForm] options.source 与 options.dictName 同时配置，优先使用 source，忽略 dictName");
  const o = async (i = t) => {
    var s;
    const p = ++l, u = ae(e == null ? void 0 : e.source), d = (e == null ? void 0 : e.source) !== void 0 ? typeof u == "function" ? await u(i) : u : (e == null ? void 0 : e.dictName) !== void 0 ? await ((s = Se.dictApi) == null ? void 0 : s.call(Se, e.dictName)) : void 0;
    p === l && (a.value = d ?? []);
  };
  return e && n && Ne(() => {
    o();
  }), { optionsRef: W(() => {
    var i, s, p;
    const u = a.value, d = ((i = e == null ? void 0 : e.fieldNames) == null ? void 0 : i.label) ?? "label", v = ((s = e == null ? void 0 : e.fieldNames) == null ? void 0 : s.value) ?? "value", g = ((p = e == null ? void 0 : e.fieldNames) == null ? void 0 : p.children) ?? "children", y = (h) => h.map((b, k) => {
      const c = Ve(b), m = c ? b[d] : b, S = e != null && e.labelAsValue ? m : c ? b[v] : e != null && e.valueToNumber ? k : b;
      return {
        ...c ? b : {},
        label: m,
        value: e != null && e.valueToNumber && !e.labelAsValue ? Number(S) : S,
        ...c && Array.isArray(b[g]) && { children: y(b[g]) }
      };
    });
    return Array.isArray(u) ? y(u) : Object.entries(u ?? {}).map(([h, b]) => ({
      label: b,
      value: e != null && e.labelAsValue ? b : e != null && e.valueToNumber ? Number(h) : h
    }));
  }), load: o };
}
const fn = (e, t) => {
  const n = {};
  return e.vModelFields && Object.entries(e.vModelFields).forEach(([a, l]) => {
    n[a] = t[l];
  }), n;
}, It = ({ value: e, label: t = e, color: n, icon: a, tagViewer: l = !0 }) => {
  const o = { color: n, label: t, icon: a };
  if (l !== !0 || !n) {
    const r = l === !0 ? Se.tagViewer : l;
    if (typeof r == "function") {
      const i = r(e);
      Ve(i) ? Object.assign(o, i) : o.color = i;
    } else if (Array.isArray(r) && Ve(r[0])) {
      const i = r.find((s) => s.value == e);
      Object.assign(o, i);
    }
    o.color ?? (o.color = n || r[e] || e === !0 && "success" || e === !1 && "error" || "default");
  }
  return X("tag")(
    { color: o.color },
    {
      default: () => o.label || e,
      icon: o.icon
    }
  );
};
function ht(e, t = {}) {
  const { type: n = "", viewRender: a, render: l, labelField: o, tagViewer: r, initialValue: i } = e, s = e.options, p = e.endField, u = we("rootSlots", {}), d = a || n === "InfoSlot" && l, v = typeof d == "string" ? u[d] : d;
  if (d && !v)
    return !1;
  let g = !1;
  const y = (() => {
    if (o)
      return ({ current: b } = t) => String(Re(b, o) ?? "");
    if (p)
      return ({ current: b, text: k } = t) => (k || "") + " - " + (Re(b, p) || "");
    if (s !== void 0) {
      g = !(r === !1 || !r && Se.tagViewer === !1);
      const { optionsRef: b, load: k } = At(s, t, !1);
      let c = !1;
      return (m = t, S) => {
        c || (c = !0, k(m));
        const A = m.text ?? m.value ?? be(i) ?? "";
        if (A === "")
          return "";
        const E = (Array.isArray(A) ? A : e.stringifyValue && typeof A == "string" ? A.split(",") : [A]).map((f) => {
          const w = Wt(b.value, f, e.stringifyValue), x = (w == null ? void 0 : w.label) ?? f;
          return !S && g ? It({ ...w, value: f, label: x, tagViewer: r }) : x;
        });
        return !S && g ? E : E.join(",");
      };
    } else if (n === "Switch")
      return ({ text: b, value: k } = t) => {
        const c = b ?? k ?? be(i);
        return c === !0 ? L("yes") : c === !1 ? L("no") : c;
      };
  })(), h = !0;
  if (v)
    return (b = t) => {
      const k = fn(e, b.current), { attrs: c } = De({ option: e, effectData: b }), m = { ...c };
      delete m.disabled;
      const S = H({
        props: { ...m, ...k },
        ...b,
        ...y && { text: W(() => y(b, h)) },
        isView: !0
      });
      return v(S);
    };
  if (r && !g)
    return (b = t) => {
      const k = b.text ?? be(i);
      return typeof k == "boolean" && r === !0 ? It({
        label: L(k ? "yes" : "no"),
        color: k ? "success" : "error"
      }) : (Array.isArray(k) ? k : typeof k == "string" ? k.split(",") : [k]).map((S) => It({ value: S, tagViewer: r }));
    };
  if (n === "Text" && (e.attrs || e.dynamicAttrs))
    return (b = t) => {
      const k = (y == null ? void 0 : y(b)) || (b.value ?? be(i)), c = Ft(e.dynamicAttrs, b), m = ve({ ...e.attrs, title: k }, c);
      return _("span", m, k);
    };
  if (n === "HTML")
    return (b = t) => {
      const k = Ft(e.dynamicAttrs, b), c = ve({ ...e.attrs, innerHTML: b.value }, k);
      return _("span", c);
    };
  if (n === "TextArea")
    return (b = t) => _("pre", { style: "white-space: break-spaces;" }, b.value ?? be(i));
  if (!y && (n === "Upload" || _t(n)))
    return (b = t) => {
      const k = fn(e, b.current), c = ot(e.slots, b, u), {
        attrs: { disabled: m, ...S }
      } = De({ option: e, effectData: b });
      if (n === "Upload")
        return _(
          Me.Upload,
          H({ option: e, effectData: b, ...S, ...k, value: b.value, isView: !0, disabled: m }),
          c
        );
      const A = _t(n);
      return A && _(
        A.component,
        H(
          la(A, {
            ...S,
            ...k,
            value: b.value,
            disabled: m
          })
        ),
        c
      );
    };
  if (n === "Buttons") {
    const b = Mt({ config: e, isView: !0 });
    return !!b && ((k = t) => b({ param: k }));
  } else
    return y;
}
const rt = (e, t) => {
  const { title: n, label: a, labelSlot: l, tooltip: o } = e, r = o && (Ve(o) ? o : { title: o }), i = n || l || a;
  return i === void 0 ? void 0 : () => [
    ie(i, t),
    o && X("tooltip")(r, {
      title: () => ie(o.title, t),
      default: () => _(
        "span",
        {
          class: "sup-label-tooltip"
        },
        o.icon ? ie(o.icon, t) : Ge("info")
      )
    })
  ];
}, Cl = /* @__PURE__ */ new Set([
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
]), xl = {
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
}, kl = /* @__PURE__ */ new Set(["Input", "InputNumber", "TextArea", "AutoComplete"]), _l = /* @__PURE__ */ new Set(["Select", "TreeSelect"]), Al = /* @__PURE__ */ new Set(["Select", "TreeSelect", "RadioGroup", "CheckboxGroup"]), Ml = /* @__PURE__ */ new Set([
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
]), El = /* @__PURE__ */ new Set(["table", "form", "description"]), Dl = /* @__PURE__ */ new Set([
  "attrs",
  "dynamicAttrs",
  "dataSource",
  "initialValue",
  "options",
  "params",
  "rules",
  "treeData",
  "value"
]), Le = (e) => e !== null && typeof e == "object" && !Array.isArray(e), ne = (e, t, n, a) => ({ level: e, code: t, path: n, message: a });
function zt(e, t, n, a) {
  if (!(!e || typeof e != "object" || a.has(e))) {
    if (a.add(e), Le(e))
      for (const [l, o] of Object.entries(xl))
        Object.prototype.hasOwnProperty.call(e, l) && n.push(ne("warning", "deprecated-api", `${t}.${l}`, `已废弃，${o}。`));
    for (const [l, o] of Object.entries(e))
      typeof o == "function" || Dl.has(l) || (Array.isArray(o) ? o.forEach((r, i) => zt(r, `${t}.${l}[${i}]`, n, a)) : Le(o) && zt(o, `${t}.${l}`, n, a));
  }
}
function Ol(e, t, n, a, l) {
  var o, r, i;
  if (!Le(e)) {
    typeof e != "string" && n.push(ne("error", "invalid-item", t, "字段配置必须是对象。"));
    return;
  }
  const { type: s } = e;
  if (s !== void 0 && (typeof s != "string" || !l.has(s)) && n.push(ne("error", "unknown-type", `${t}.type`, `未知字段类型 ${JSON.stringify(s)}。`)), s === void 0 && a !== "table" && n.push(ne("warning", "missing-type", `${t}.type`, "表单或详情字段建议明确配置 type。")), Array.isArray(e.exclude)) {
    const v = e.exclude.filter((g) => !El.has(g));
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
  ), Al.has(s) && !e.options && !e.dictName && n.push(ne("warning", "missing-options", t, `${s} 未配置 options 或 dictName。`));
  const p = (o = e.attrs) == null ? void 0 : o.placeholder, u = kl.has(s) ? `请输入${typeof e.label == "string" ? e.label : ""}` : _l.has(s) ? `请选择${typeof e.label == "string" ? e.label : ""}` : void 0;
  u !== void 0 && p === u && n.push(
    ne("suggestion", "redundant-default", `${t}.attrs.placeholder`, "与内置 placeholder 相同，可以省略。")
  );
  const d = ["DatePicker", "DateRangePicker"].includes(s) ? "YYYY-MM-DD" : ["TimePicker", "TimeRangePicker"].includes(s) ? "HH:mm:ss" : void 0;
  d && ((r = e.attrs) == null ? void 0 : r.valueFormat) === d && n.push(
    ne("suggestion", "redundant-default", `${t}.attrs.valueFormat`, "与内置 valueFormat 相同，可以省略。")
  ), s === "InputGroup" && ((i = e.attrs) == null ? void 0 : i.compact) === !0 && n.push(
    ne("suggestion", "redundant-default", `${t}.attrs.compact`, "InputGroup 默认使用紧凑布局，可以省略。")
  ), e.block === !1 && !Ml.has(s) && n.push(ne("suggestion", "redundant-default", `${t}.block`, "block: false 是默认行为，可以省略。")), e.breakAfter === !1 && n.push(
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
    Le(e[v]) && Object.keys(e[v]).length === 0 && n.push(ne("suggestion", "empty-config", `${t}.${v}`, `空的 ${v} 配置可以省略。`));
  for (const v of ["rules", "options"])
    Array.isArray(e[v]) && e[v].length === 0 && n.push(ne("suggestion", "empty-config", `${t}.${v}`, `空的 ${v} 配置可以省略。`));
  e.subItems && Ze(e.subItems, `${t}.subItems`, n, a === "table" ? "form" : a, l), e.columns && Ze(e.columns, `${t}.columns`, n, "table", l);
}
function Ze(e, t, n, a, l) {
  if (!Array.isArray(e)) {
    n.push(ne("error", "invalid-items", t, "必须是数组。"));
    return;
  }
  const o = /* @__PURE__ */ new Map();
  e.forEach((r, i) => {
    const s = `${t}[${i}]`;
    Ol(r, s, n, a, l), !(!Le(r) || typeof r.field != "string" || !r.field) && (o.has(r.field) ? n.push(
      ne(
        "warning",
        "duplicate-field",
        `${s}.field`,
        `字段 ${r.field} 与 ${o.get(r.field)} 重复。`
      )
    ) : o.set(r.field, `${t}[${i}].field`));
  });
}
function Pl(e, t = "auto", n = []) {
  var a, l, o, r, i, s, p;
  const u = [];
  if (!Le(e))
    return [ne("error", "invalid-schema", "schema", "schema 必须是对象。")];
  const d = /* @__PURE__ */ new Set([...Cl, ...n]);
  zt(e, "schema", u, /* @__PURE__ */ new WeakSet());
  const v = t === "auto" ? Array.isArray(e.columns) ? "table" : "form" : t;
  if (!["form", "table", "detail"].includes(v))
    return [ne("error", "invalid-schema-type", "schema", `未知 schema 类型 ${JSON.stringify(t)}。`)];
  if (e.subSpan === 8 && u.push(ne("suggestion", "redundant-default", "schema.subSpan", "subSpan: 8 是默认值，可以省略。")), e.gutter === 16 && u.push(ne("suggestion", "redundant-default", "schema.gutter", "gutter: 16 是默认值，可以省略。")), Le(e.params) && Object.keys(e.params).length === 0 && u.push(ne("suggestion", "empty-config", "schema.params", "空的 params 配置可以省略。")), v === "table") {
    for (const g of ["editMode", "addMode"])
      Object.prototype.hasOwnProperty.call(e, g) && u.push(ne("warning", "deprecated-api", `schema.${g}`, `已废弃，使用 rowEditor.${g}。`));
    Array.isArray(e.columns) ? Ze(e.columns, "schema.columns", u, "table", d) : u.push(ne("error", "missing-columns", "schema.columns", "表格必须配置 columns。")), e.immediate === !0 && u.push(
      ne("suggestion", "redundant-default", "schema.immediate", "immediate: true 是默认值，可以省略。")
    ), e.pagination === !1 && u.push(
      ne("suggestion", "redundant-default", "schema.pagination", "pagination: false 是默认值，可以省略。")
    ), ((a = e.attrs) == null ? void 0 : a.rowKey) === "id" && u.push(
      ne("suggestion", "redundant-default", "schema.attrs.rowKey", "rowKey: 'id' 是默认值，可以省略。")
    ), ((l = e.attrs) == null ? void 0 : l.size) === "small" && u.push(
      ne("suggestion", "redundant-default", "schema.attrs.size", "size: 'small' 是默认值，可以省略。")
    ), ((o = e.attrs) == null ? void 0 : o.tableLayout) === "fixed" && u.push(
      ne(
        "suggestion",
        "redundant-default",
        "schema.attrs.tableLayout",
        "tableLayout: 'fixed' 是默认值，可以省略。"
      )
    ), Le(e.pagination) && e.pagination.current === 1 && u.push(
      ne("suggestion", "redundant-default", "schema.pagination.current", "分页 current 默认是 1，可以省略。")
    ), Le(e.pagination) && e.pagination.pageSize === 10 && u.push(
      ne("suggestion", "redundant-default", "schema.pagination.pageSize", "分页 pageSize 默认是 10，可以省略。")
    ), (r = e.searchForm) != null && r.subItems && Ze(e.searchForm.subItems, "schema.searchForm.subItems", u, "form", d), (s = (i = e.rowEditor) == null ? void 0 : i.form) != null && s.subItems && Ze(e.rowEditor.form.subItems, "schema.rowEditor.form.subItems", u, "form", d);
  } else
    Array.isArray(e.subItems) ? (((p = e.attrs) == null ? void 0 : p.labelAlign) === "right" && u.push(
      ne("suggestion", "redundant-default", "schema.attrs.labelAlign", "labelAlign: 'right' 是默认值，可以省略。")
    ), Ze(e.subItems, "schema.subItems", u, v, d)) : u.push(ne("error", "missing-sub-items", "schema.subItems", "表单或详情必须配置 subItems。"));
  return u;
}
function Il(e, t = "auto") {
  return Pl(e, t, Do());
}
function mt(e, t, n) {
  var a, l;
  const o = Il(e, t);
  return o.length && ((a = console.groupCollapsed) == null || a.call(console, `[superform] ${n} schema 诊断：${o.length} 项`), o.forEach(({ level: r, path: i, message: s }) => {
    const p = `[superform] ${i}: ${s}`;
    r === "error" ? console.error(p) : r === "warning" ? console.warn(p) : console.info(p);
  }), (l = console.groupEnd) == null || l.call(console)), o;
}
function ge(e, t = !1) {
  return () => _("svg", {
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
    _("g", [
      ...e.map((n) => _("path", { d: n })),
      ...t ? [_("animateTransform", {
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
const ye = {
  add: ge(["M12 5v14M5 12h14"]),
  remove: ge(["M5 12h14"]),
  delete: ge(["M4 7h16M9 7V4h6v3M6 7l1 14h10l1-14M10 11v6M14 11v6"]),
  edit: ge(["M14 5l5 5M4 20l5-1L21 7l-5-5L4 14z"]),
  detail: ge(["M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z", "M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0"]),
  submit: ge(["M3 11L21 3l-8 18-3-7zM10 14L21 3"]),
  search: ge(["M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0M15 15l6 6"]),
  reset: ge(["M4 10a8 8 0 1 1 1 8M4 4v6h6"]),
  more: ge(["M5 12h.01M12 12h.01M19 12h.01"]),
  expand: ge(["M5 9l7 7 7-7"]),
  collapse: ge(["M5 15l7-7 7 7"]),
  info: ge(["M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0M12 11v6M12 7h.01"]),
  upload: ge(["M12 16V3M7 8l5-5 5 5M4 15v6h16v-6"]),
  attachment: ge(["M8 13l7-7a3 3 0 0 1 4 4L9 20a5 5 0 0 1-7-7L13 2M6 15l8-8"]),
  loading: ge(["M20 12a8 8 0 1 1-8-8"], !0),
  sync: ge(["M4 10a8 8 0 0 1 14-4l2 3M20 3v6h-6M20 14a8 8 0 0 1-14 4l-2-3M4 21v-6h6"]),
  error: ge(["M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0M8 8l8 8M16 8l-8 8"])
}, Tl = {
  add: { label: () => L("add"), icon: ye.add },
  delete: {
    label: () => L("delete"),
    icon: ye.delete,
    confirmText: () => L("deleteConfirm"),
    disabled: (e) => {
      var t;
      return !e.record && !(((t = e.selectedRows) == null ? void 0 : t.length) > 0);
    }
  },
  edit: { label: () => L("edit"), icon: ye.edit, disabled: (e) => {
    var t;
    return !e.record && ((t = e.selectedRows) == null ? void 0 : t.length) !== 1;
  } },
  detail: { label: () => L("detail"), icon: ye.detail, disabled: (e) => {
    var t;
    return !e.record && ((t = e.selectedRows) == null ? void 0 : t.length) !== 1;
  } },
  submit: { label: () => L("submit"), icon: ye.submit },
  search: { label: () => L("search"), icon: ye.search },
  reset: { label: () => L("reset"), icon: ye.reset },
  save: { label: () => L("save") },
  cancel: { label: () => L("cancel") },
  expand: {
    label: (e) => L(e.expanded ? "collapse" : "expand"),
    icon: (e) => be(e == null ? void 0 : e.expanded) ? ye.collapse() : ye.expand()
  }
}, Rl = () => {
  const e = bt(
    {},
    Tl,
    ue.ButtonActions,
    Se.defaultButtons
  );
  return Object.entries(Se.defaultButtons || {}).forEach(([t, n]) => {
    Object.prototype.hasOwnProperty.call(n, "icon") && (e[t].icon = n.icon);
  }), e;
};
function jl(e) {
  const t = Rl();
  return Object.keys(e).forEach((n) => {
    if (t[n])
      if (typeof e[n] == "function")
        t[n].onClick = e[n];
      else {
        const { icon: a, ...l } = e[n];
        bt(t[n], l), Object.prototype.hasOwnProperty.call(e[n], "icon") && (t[n].icon = a);
      }
    else
      t[n] = typeof e[n] == "function" ? { onClick: e[n] } : e[n];
  }), t;
}
function Fl(e, t = {}, n = {}) {
  const a = jl(t), l = [];
  return Array.isArray(e) && e.forEach((o) => {
    const r = typeof o == "string" ? o : o.name, { onClick: i, ...s } = a[r] || {};
    s.attrs = Ue({ ...n }, s.attrs), typeof o == "object" && Object.assign(s, o, { attrs: { ...s.attrs, ...o.attrs } }), s.name = r;
    const p = $(!1), u = $(!1), d = s.attrs.loading, v = He(d);
    !v && d && (s.attrs.loading = u);
    const g = (k) => {
      v || (u.value = k ? d : !1);
    }, y = { label: s.label, ...typeof o == "object" ? o.meta : {} }, h = typeof o == "object" ? o.onClick : void 0, b = (k, c, m) => {
      if (p.value)
        return Promise.resolve();
      p.value = !0;
      const S = async () => {
        g(!0);
        try {
          return await c();
        } finally {
          g(!1);
        }
      };
      return k ? new Promise((A, M) => {
        let E = !1;
        const f = (w) => {
          E || (E = !0, p.value = !1, A(w));
        };
        try {
          Ce("services").confirm({
            title: () => ie(k, m),
            ...ue.Modal,
            onCancel: async (...w) => {
              var x, C;
              const D = await ((C = (x = ue.Modal) == null ? void 0 : x.onCancel) == null ? void 0 : C.call(x, ...w));
              return f(!1), D;
            },
            afterClose: (...w) => {
              var x, C;
              return f(!1), (C = (x = ue.Modal) == null ? void 0 : x.afterClose) == null ? void 0 : C.call(x, ...w);
            },
            onOk: async () => {
              try {
                const w = await S();
                return f(w), w;
              } catch (w) {
                throw M(w), w;
              }
            }
          });
        } catch (w) {
          p.value = !1, M(w);
        }
      }) : S().finally(() => {
        p.value = !1;
      });
    };
    s.onClick = (k) => {
      const c = { ...k, meta: y };
      return h && i ? b(
        s.confirmText,
        () => h(c, async (m) => i({ ...c, ...m })),
        k
      ) : b(s.confirmText, () => {
        var m;
        return (m = i || h) == null ? void 0 : m(c);
      }, k);
    }, l.push({ ...s, pending: p });
  }), l;
}
function Yn(e, t, n, a = {}, l = () => !0) {
  var o, r;
  const { buttonProps: i, limit: s, hidden: p, disabled: u, actions: d } = e, v = e.labelMode === "icon", g = e.labelMode === "label", y = { ...(o = ue.Buttons) == null ? void 0 : o.buttonProps, ...i }, h = (S) => W(() => !!(typeof S == "function" ? S(t) : be(S))), b = h(p), k = h(u), c = (r = Se.buttonRoles) == null ? void 0 : r.call(Se), m = Fl(d, n || e.methods, y).flatMap((S, A) => {
    const M = c && S.roleName && !c.includes(S.roleName), E = S.unauthorized ?? e.unauthorized ?? "hide";
    if (M && E === "hide")
      return [];
    const f = h(S.hidden), w = S.disabled === void 0 ? k : h(S.disabled), x = S.attrs || {}, C = h(x.disabled), D = W(() => !!M || k.value || w.value || C.value), R = typeof S.customRender == "string" ? a[S.customRender] : S.customRender, V = S.dropdown && W(() => {
      const U = typeof S.dropdown == "function" ? S.dropdown(t) : be(S.dropdown);
      return U ? Array.isArray(U) ? wa(U).map(
        (J) => typeof J == "object" && J !== null ? J : { value: J, label: String(J) }
      ) : Object.entries(U).map(([J, F]) => ({ value: J, label: F })) : [];
    }), z = {
      get visible() {
        return l() && !b.value && !f.value;
      },
      get disabled() {
        return D.value;
      },
      get loading() {
        return S.pending.value || !!be(x.loading);
      },
      async execute(U, ee) {
        var J;
        if (!(!z.visible || z.disabled || z.loading))
          return (J = S.onClick) == null ? void 0 : J.call(S, { ...t, ...ee, e: U });
      }
    }, K = W(() => {
      const U = D.value && S.disabledTooltip ? S.disabledTooltip : S.tooltip || (v && S.icon ? S.label : void 0);
      return ie(U, t);
    }), Y = {
      key: A,
      name: S.name,
      label: () => ie(S.label, t),
      icon: S.icon ? () => ie(S.icon, t) : void 0,
      tooltip: () => K.value,
      get disabled() {
        return z.disabled || S.pending.value;
      },
      get attrs() {
        return Object.fromEntries(Object.entries(x).map(([U, ee]) => [U, ae(ee)]));
      },
      get menu() {
        return V ? V.value.map((U, ee) => ({
          key: ee,
          value: U.value,
          label: () => ie(U.label, t),
          icon: U.icon ? () => ie(U.icon, t) : void 0,
          disabled: !!(typeof U.disabled == "function" ? U.disabled(t) : be(U.disabled))
        })) : void 0;
      },
      dropdownProps: S.dropdownProps,
      render: R ? (U) => R({ ...t, props: U }) : void 0,
      onClick: (U) => z.execute(U),
      onSelect: (U, ee) => {
        var J;
        const F = (J = Y.menu) == null ? void 0 : J.find((N) => Object.is(N.value, U));
        if (!(!F || F.disabled))
          return z.execute(ee, { value: U });
      }
    };
    return [{ action: z, uiItem: Y }];
  });
  return {
    render() {
      const S = m.filter((E) => E.action.visible).map((E) => E.uiItem);
      if (!S.length)
        return null;
      const A = s == null || !Number.isFinite(s) ? S.length : Math.max(0, Math.floor(s)), M = v && S.length === A + 1 ? A + 1 : A;
      return X("actionGroup")({
        groupProps: e.attrs,
        buttons: S.slice(0, M),
        moreButtons: S.slice(M),
        defaultButtonProps: y,
        divider: e.divider,
        labelOnly: g,
        iconOnly: v,
        moreLabel: () => e.moreLabel === void 0 ? ye.more() : ie(e.moreLabel, t)
      });
    }
  };
}
const je = /* @__PURE__ */ oe({
  __name: "ButtonGroup",
  props: {
    option: {},
    methods: {},
    effectData: {}
  },
  setup(e) {
    const t = e, n = Array.isArray(t.option) ? { actions: t.option } : t.option, a = Yn(n, H(t.effectData || {}), t.methods, we("rootSlots", {}));
    return (l, o) => (Ie(), Je(st(() => ae(a).render())));
  }
});
function Mt({ config: e, methods: t, effectData: n, isView: a }) {
  const l = Array.isArray(e) ? { actions: e } : e, o = l == null ? void 0 : l.visibleIn;
  if (!l || a && o === "form" || !a && o === "detail")
    return;
  let r = l.actions || [];
  if (o || (r = r.filter((i) => {
    if (typeof i == "string")
      return !a;
    {
      const s = i.visibleIn;
      return a ? s !== "form" : s !== "detail";
    }
  })), r.length !== 0)
    return (i = {}) => _(je, { option: { ...l, actions: r }, methods: t, effectData: n, ...i });
}
function pn({ option: e, effectData: t, attrs: n }) {
  const a = e.options !== void 0;
  if (!a && !e.labelField)
    return;
  const l = n ?? e.attrs ?? {}, o = a ? At(e.options, t).optionsRef : W(() => ae(l.options) ?? []);
  return {
    state: a ? W(() => ({ options: o.value })) : void 0,
    bindModel(r) {
      const i = r["onUpdate:labelValue"];
      i && Z([() => ae(r.value), o, () => a ? void 0 : ae(l.fieldNames)], ([s, p, u]) => {
        const d = (v) => {
          var g;
          return (g = Wt(p, v, e.stringifyValue, u)) == null ? void 0 : g[(u == null ? void 0 : u.label) ?? "label"];
        };
        i(Array.isArray(s) ? s.map(d) : d(s));
      }, { immediate: !0, deep: !0 });
    }
  };
}
const vn = {
  options: pn,
  picker: ({ option: e }) => ({
    state: W(() => ({ placeholder: L("select", { label: e.label }) }))
  }),
  range: ({ option: e }) => ({
    state: W(() => ({
      placeholder: [L("selectStart", { label: e.label }), L("selectEnd", { label: e.label })]
    }))
  }),
  tree: ({ option: e, effectData: t }) => {
    const n = e.treeData;
    if (n === void 0)
      return;
    const a = $([]);
    return Ne(() => {
      const l = typeof n == "function" ? n(t) : ae(n);
      Promise.resolve(l).then((o) => {
        a.value = o ?? [];
      });
    }), { state: W(() => ({ treeData: a.value })) };
  },
  switch: (e) => {
    const t = pn(e);
    return t != null && t.state ? {
      bindModel: t.bindModel,
      state: W(() => {
        const [n = { value: !1 }, a = { value: !0 }] = t.state.value.options;
        return { switch: {
          unchecked: { value: n.value, label: n.label },
          checked: { value: a.value, label: a.label }
        } };
      })
    } : t;
  }
};
function Ll(e, t) {
  const n = e.map((a) => {
    var l;
    return (l = vn[a]) == null ? void 0 : l.call(vn, t);
  }).filter(Boolean);
  return {
    bindModel: (a) => n.forEach((l) => {
      var o;
      return (o = l.bindModel) == null ? void 0 : o.call(l, a);
    }),
    state: W(() => Object.assign({}, ...n.map((a) => {
      var l;
      return (l = a.state) == null ? void 0 : l.value;
    })))
  };
}
const zl = oe({
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
    const n = Ll(e.field.processors || [], {
      option: e.option,
      attrs: H(e.inputAttrs),
      effectData: e.effectData,
      model: e.model
    }), a = Ht({
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
        binding: H(a),
        state: { ...e.state, ...n.state.value }
      }, r = H(l.getAttrs(e.inputAttrs, e.option, o.state));
      return l.render({ ...o, attrs: r, slots: t.slots });
    };
  }
}), Gt = oe({
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
    return Be(e.name, e.data || {}), t.slots.default;
  }
});
function Nl(e, t) {
  const n = we("inheritOptions", {}), a = e.option.subSpan ?? n.subSpan, l = W(() => e.model.index), o = [], r = [...e.model.children];
  for (let i = 0; i < r.length; i++) {
    const [s, p] = r[i], { type: u, align: d, span: v, block: g, breakAfter: y, exclude: h, editable: b } = s, { parent: k, refData: c } = fe(p), m = Oe({
      parent: e.effectData,
      current: k,
      field: p.refName,
      value: c,
      ...l.value !== void 0 && {
        index: l,
        record: p.refName ? k : c
      }
    });
    if (u === "Hidden" || h != null && h.includes("form")) {
      Ht({ option: s, model: p, effectData: m });
      continue;
    }
    const { hidden: S, required: A, attrs: M, nativeAttrs: E, disabled: f } = De({
      option: s,
      effectData: m,
      inheritDisabled: n.disabled
    });
    if (u === "Fragment") {
      p.children && r.splice(
        i + 1,
        0,
        ...[...p.children].map(([z, K]) => [{ ...z, hidden: S, disabled: M.disabled }, K])
      );
      continue;
    }
    let w = t(s, p, m, M, { attrs: E, disabled: f });
    if (!w)
      continue;
    if ((Pt(u) || qt(u)) && b !== void 0 && b !== !0) {
      const z = w, K = W(() => lt(b) ? b(m) : b), Y = ht(s, H({ ...$e(m), isView: !0 }));
      w = () => K.value ? z() : Y ? Y() : c.value;
    }
    const x = { ...s.colProps, ...v !== void 0 && { span: v } };
    Ue(x, { span: a }, ue.Col, { span: 8 }), (x.span === 0 || x.flex) && (x.span = void 0);
    let C = w;
    const D = [...at, "InputList", "InputGroup"].includes(u);
    if (e.fieldWrapper !== "none" && !D && (!g || s.field && s.label)) {
      const z = pt(p.rules, m), K = W(
        () => {
          var ee;
          return ae(M.disabled) || (ee = !s.required || A.value ? z : z.slice(1)) == null ? void 0 : ee.map(
            (J) => n.ignoreRules ? { ...J, trigger: "none", validateTrigger: !1 } : J
          );
        }
      ), Y = ve(ue.FormItem, s.formItemProps), U = rt(s, m);
      C = () => X("formItem")(
        H({
          ...Y,
          name: p.propChain,
          rules: K,
          colon: !!U
        }),
        {
          default: w,
          label: U
        }
      );
    }
    if (D && e.fieldWrapper !== "none") {
      const z = {
        required: A,
        disabled: M.disabled,
        subSpan: s.subSpan ?? a,
        ignoreRules: n.ignoreRules
      };
      C = () => _(Gt, { name: "inheritOptions", data: z }, w);
    }
    const R = g ?? (at.includes(u) && !s.span), V = !R && u === "InputList" ? { ...x, span: v ?? 24 } : x;
    o.push({
      key: i,
      hidden: S,
      content: C,
      layout: {
        block: R,
        breakAfter: y,
        align: d,
        colProps: V,
        compactProps: x,
        detail: u === "Descriptions"
      }
    });
  }
  return o;
}
function Vl(e, t) {
  const n = [];
  let a;
  for (const o of e)
    o.layout.block ? (n.push(o), a = void 0) : (a || n.push(a = []), a.push(o), o.layout.breakAfter && (a = void 0));
  const l = () => {
    if (t.layout === "compact")
      return e.map((i) => {
        if (i.hidden.value)
          return !1;
        const { span: s, flex: p, style: u } = i.layout.compactProps, d = Number(s) ? (Number(s) / 24 * 100).toFixed(2) + "%" : void 0;
        return _(i.content, {
          key: i.key,
          style: ve({
            width: d,
            flex: p ?? (s === "auto" ? "1 1 0" : void 0),
            minWidth: 0
          }, u)
        });
      });
    const { gutter: o = 16 } = t.option, r = { gutter: o, ...t.option.rowProps };
    return n.map((i) => Array.isArray(i) ? X("row")(
      { ...r, key: i[0].key },
      {
        default: () => i.map(
          (s) => !s.hidden.value && X("col")(
            ve(
              {
                key: s.key,
                style: s.layout.align && { textAlign: s.layout.align }
              },
              s.layout.colProps
            ),
            { default: s.content }
          )
        )
      }
    ) : !i.hidden.value && _(
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
    renderNodes: l,
    render: () => t.layout === "grid" ? l() : X(t.layout === "compact" ? "compactSpace" : "space")(
      ve(t.layout === "compact" ? { block: !0 } : {}, t.layoutAttrs || {}),
      // 紧凑容器必须直接接收各字段，不能额外套一个组件层阻断首尾上下文。
      { default: () => l().filter(Boolean) }
    )
  };
}
const ze = oe({
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
    const n = Nl(e, Et), a = Vl(n, e);
    return () => t.default ? t.default({ nodes: a.renderNodes().filter(Boolean) }) : e.option.useSectionStyle && a.hasWrap ? _(
      Me.Group,
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
function Et(e, t, n, a, l) {
  const { type: o, render: r } = e;
  if (!o)
    return;
  const i = we("rootSlots", {}), s = ot(e.slots, n), p = r ? void 0 : qn(o), u = p == null ? void 0 : p.processors, d = (l == null ? void 0 : l.attrs) ?? a, v = H({ disabled: l == null ? void 0 : l.disabled }), g = p ? void 0 : _t(o), y = r ? typeof r == "function" ? r : i[r] : (g == null ? void 0 : g.component) || Me[o] || (p == null ? void 0 : p.component) || (p == null ? void 0 : p.render);
  let h;
  if (o === "InfoSlot")
    h = y && (() => y({ props: a, ...n }));
  else if (o === "Text")
    h = () => _("span", a, t.refData);
  else if (o === "HTML")
    h = () => _("span", { ...a, innerHTML: t.refData });
  else if (o === "Buttons")
    h = () => _(je, { option: e, effectData: n, ...a });
  else if (at.includes(o) || o === "InputList")
    h = () => _(Me[o], H({ option: e, model: t, effectData: n, ...a }), s);
  else if (!y)
    console.error(`组件 '${o}' 配置错误，请检查名称或'render'是否正确！`);
  else if (p && (u != null && u.length))
    h = () => _(zl, { inputAttrs: d, state: v, field: p, option: e, model: t, effectData: n }, s);
  else {
    const b = Ht({ option: e, model: t, effectData: n }), k = { ...a, ...b };
    o === "InputSlot" ? h = () => y == null ? void 0 : y(H({ props: k, ...n })) : p ? h = () => {
      const c = { type: o, option: e, model: t, effectData: n, binding: H(b), state: v }, m = H(p.getAttrs(d, e, c.state));
      return p.render({ ...c, attrs: m, slots: s });
    } : (g == null ? void 0 : g.source) === "custom" || (g == null ? void 0 : g.source) === "auto" ? h = () => _(y, H(la(g, k)), s) : h = () => _(y, H({ option: e, model: t, effectData: n, ...k }), s);
  }
  return h;
}
const Bl = oe({
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
    const n = he(e, "source"), { modelsMap: a } = Ye(e.modelsMap, n);
    return Be("exaProvider", { data: he(e, "source") }), () => {
      var l;
      return _(
        "div",
        { class: ["sup-form-section sup-detail", ((l = t.attrs) == null ? void 0 : l.useSectionStyle) && "sup-container"] },
        _(Me.Descriptions, {
          option: e.option,
          model: { children: a },
          effectData: H({ current: n }),
          isView: !0
        })
      );
    };
  }
}), qe = oe({
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
    const r = we("exaProvider", {}).attrs, i = we("gridConfig", r), s = {
      ...ue.Descriptions,
      ...i
    }, p = Ue({ gutter: e.gutter }, e.rowProps || s.rowProps, ue.row, {
      gutter: 16
    }), u = {
      subSpan: e.subSpan,
      ...e.descriptionsProps,
      ...l.attrs
    }, d = Ue(
      {
        subSpan: e.subSpan ?? s.subSpan,
        rowProps: p,
        ...u
      },
      s
    ), v = d.subSpan ?? (d.subSpan = ((o = ue.Col) == null ? void 0 : o.span) ?? 12), g = Nt(t, e, a), y = [];
    let h, b;
    g.forEach((c, m) => {
      c.node ?? (c.node = () => X("descriptions")($l(c.group, d))), c.isBlock ? (c.group || c.option.type === "InputList" ? (b || (b = [], y.push(["section", b])), b.push(c)) : (y.push(["block", c]), b = void 0), h = void 0) : (!h && y.push(["row", h = []]), h.push(c), b = void 0);
    });
    const k = () => _(
      Gt,
      { name: "gridConfig", data: d },
      () => y.map(([c, m], S) => {
        let A = m.node;
        return c === "row" ? A = () => X("row")(p, {
          default: () => m.map((M, E) => {
            const f = M.option.colProps || {
              span: M.option.span ?? v
            };
            return !ae(M.hidden) && X("col")({ ...ue.Col, ...f, key: E }, { default: M.node });
          })
        }) : c === "section" && (A = () => m.map((M) => !ae(M.hidden) && M.node())), !ae(m.hidden) && (y.length > 1 ? _("div", { class: "sup-form-section", key: S }, A()) : A());
      })
    );
    return n ? () => _(
      Me.Group,
      ve(
        { class: "sup-form-section" },
        {
          option: e,
          model: {},
          effectData: Oe({}),
          isView: !0,
          ...u
        }
      ),
      { innerContent: k }
    ) : k;
  }
});
function $l(e, t) {
  const {
    subSpan: n,
    column: a,
    layout: l,
    bordered: o,
    mode: r = o ? "table" : "default",
    rowProps: i,
    colon: s,
    size: p = "middle",
    tableLayout: u,
    labelCol: d,
    wrapperCol: v,
    ...g
  } = t, y = Math.max(1, Math.floor(Number(a) || (Number(n) ? 24 / Number(n) : 2))), h = [];
  let b = [], k = 0;
  const c = () => {
    b.length && (k < y && (b[b.length - 1].colspan += y - k), h.push(b), b = [], k = 0);
  };
  return e.forEach(({ option: m, label: S, content: A, hidden: M }, E) => {
    if (ae(M))
      return;
    const f = { ...g, ...m.formItemProps, ...m.descriptionsProps }, w = Number(f.span ?? m.span);
    let x = w ? Math.ceil(w / (24 / y)) : 1;
    x = Math.max(1, Math.min(y, x));
    const C = {
      ...f.labelAlign && { textAlign: f.labelAlign },
      ...f.labelStyle
    }, D = { span: f.span ?? m.span, ...f.colProps || m.colProps };
    D.span === 0 || D.flex ? D.span = void 0 : Number(D.span) || (D.span = 24 / y);
    const R = {
      key: E,
      attrs: f,
      colProps: D,
      labelCol: ve(d, f.labelCol, {
        style: C,
        class: { "sup-label-no-colon": f.noColon }
      }),
      wrapperCol: ve(
        v,
        { style: l === "vertical" && { textAlign: f.labelAlign } },
        { style: f.contentStyle },
        f.wrapperCol
      ),
      label: S,
      content: A,
      colspan: x
    };
    k + x > y && c(), b.push(R), k += x, m.breakAfter && c();
  }), c(), { attrs: g, mode: r, layout: l, rowProps: i, colon: s, size: p, tableLayout: u, column: y, rows: h };
}
function Nt(e, t, n) {
  const a = [];
  let l;
  const o = we("rootSlots", {});
  return [...e].forEach(([r, i], s) => {
    var p, u, d;
    const { type: v = "", field: g, viewRender: y, exclude: h } = r;
    if (v === "Hidden" || h != null && h.includes("description"))
      return;
    const { parent: b, refData: k } = $e(H(i)), c = Oe({
      parent: n,
      current: b,
      isView: !0,
      field: i.refName,
      value: k,
      text: k,
      ..."index" in i && {
        index: i.index,
        record: g ? k : b
      }
    }), { attrs: m, hidden: S } = De({ option: r, effectData: c }), A = ot(r.slots, c), M = rt(r, c);
    let E = r.block, f;
    const w = [], x = typeof y == "string" ? o[y] : y;
    f = x && (() => ie(x, c));
    const C = i.children || ((p = i.listData) == null ? void 0 : p.modelsMap);
    if (v === "InputGroup") {
      if (!y) {
        let D = r.breakAfter;
        const V = (u = Nt(C, r, c)[0].group) == null ? void 0 : u.map(({ option: z, content: K }) => {
          const Y = z.labelSlot || z.label, U = (m == null ? void 0 : m.compact) === !1 && Y;
          return D = z.breakAfter || D, () => _("span", [U && ie(Y, c), U && ": ", K == null ? void 0 : K()]);
        });
        f = () => X("space")(
          { direction: D ? "vertical" : "horizontal" },
          {
            default: () => V == null ? void 0 : V.map((z) => z())
          }
        );
      }
      w.push({ option: r, label: M, hidden: S, content: f });
    } else if (v === "Fragment") {
      const D = Nt(C, r, c), R = D[0].group;
      R && (D.shift(), w.push(...R.map((V) => ({ ...V, hidden: S })))), D.length && (l = void 0, a.push(...D));
    } else if (i.children || i.listData || at.includes(v)) {
      E ?? (E = !r.span);
      const D = [...at, "InputList"].includes(v) ? v : "Group", R = Me[D], V = () => _(
        R,
        H({
          option: r,
          model: i,
          effectData: c,
          isView: !0,
          ...ue[D],
          ...m
        }),
        A
      );
      f ?? (f = V), v === "InputList" && (!E || M && !(m != null && m.labelIndex) ? w.push({
        option: { ...r },
        label: M,
        hidden: S,
        content: f
      }) : f = V);
    } else {
      const D = Ul(r, i, c);
      D && w.push({ option: r, label: M, hidden: S, content: D });
    }
    if (!(!w.length && !f))
      if (w.length && !E)
        l || (l = [], a.push({ option: t, isBlock: !0, group: l })), l.push(...w);
      else {
        if (w.length && M)
          a.push({ option: t, isBlock: E, group: w });
        else {
          const D = r.align && { textAlign: r.align };
          f = ((d = w[0]) == null ? void 0 : d.content) || f, a.push({
            option: r,
            isBlock: E,
            node: () => _(f, { style: D }),
            hidden: S
          });
        }
        l = void 0;
      }
  }), a;
}
function Ul(e, t, n) {
  const { parent: a, refData: l } = $e(H(t)), o = t.refName ? l : void 0, r = fe(a.value) === fe(n.current) ? n : Oe({
    parent: n,
    current: a,
    text: o,
    value: o,
    field: t.refName,
    isView: !0
  }), i = ht(e, r);
  return i === !1 ? void 0 : () => i ? i() : String(t.refData ?? "");
}
const Tt = oe({
  inheritAttrs: !1,
  props: {
    option: { type: Object, required: !0 },
    model: { type: Object, required: !0 },
    effectData: Object,
    isView: Boolean
  },
  setup({ option: e, model: t, effectData: n, isView: a }, l) {
    const { type: o, label: r, title: i = r, buttons: s, contentAttrs: p } = e, u = o === "Descriptions" || a;
    let d;
    if (s) {
      const v = Array.isArray(s) ? { actions: s } : s;
      o === "Descriptions" && (v.visibleIn ?? (v.visibleIn = "detail")), d = Mt({
        config: v,
        effectData: n,
        isView: u
      });
    }
    return () => {
      const { style: v, class: g, ...y } = l.attrs, h = l.slots.title || (i ? rt(e, n) : void 0), b = l.slots.extra || l.slots.actions || d, k = (s == null ? void 0 : s.placement) === "bottom" ? "bottom" : "title";
      return X("group")({
        attrs: { class: g, style: v },
        contentAttrs: p,
        component: e.component && fe(e.component),
        slots: l.slots,
        title: h,
        extra: b,
        extraPlacement: k,
        extraAlign: (s == null ? void 0 : s.align) || (k === "bottom" ? "center" : h ? "right" : void 0),
        content: () => l.slots.innerContent ? l.slots.innerContent(y) : l.slots.default ? l.slots.default() : u ? _(qe, {
          option: { descriptionsProps: y, ...e },
          modelsMap: t.children,
          effectData: n
        }) : _(ze, { option: e, model: t, effectData: n })
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
    const o = Te(), r = $({}), {
      option: { onSubmit: i, onReset: s, buttons: p, ...u },
      ignoreRules: d,
      compact: v
    } = e, g = H({ formData: r, current: r }), { attrs: y } = De({ option: u, effectData: g }), h = /* @__PURE__ */ new Set(), b = (x) => {
      if (x)
        return h.add(x), () => h.delete(x);
    }, k = async (x) => {
      if (!o.value || d || !x.length)
        return;
      const C = Ce("form");
      if (!C.validateField)
        throw new Error("当前 UIAdapter 未实现 form.validateField");
      await C.validateField(o.value, x);
    }, c = () => {
      o.value && Ce("form").clearValidate(o.value);
    };
    Be("exaProvider", {
      data: xn(r),
      attrs: y,
      onSubmit: b,
      validateField: k
    }), Be("inheritOptions", {
      disabled: y.disabled,
      subSpan: u.subSpan,
      ignoreRules: d
    });
    const m = (x) => Promise.all(
      [...h, i].map(async (C) => {
        const D = await (C == null ? void 0 : C(x));
        return D === !1 || D && D.errMessage ? Promise.reject({ message: D && D.errMessage }) : D;
      })
    );
    d && Object.assign(y, { hideRequiredMark: !0, validateTrigger: !1 });
    const S = {
      dataSource: r,
      getNativeInstance: () => o.value,
      async validate() {
        if (!o.value)
          throw new Error("表单尚未挂载或已卸载");
        await Ce("form").validate(o.value);
      },
      validateField: k,
      clearValidate: c,
      async submit() {
        await S.validate();
        try {
          await m(r.value);
        } catch (C) {
          throw C && typeof C == "object" && "message" in C && C.message && Ce("services").message("error", C.message), C;
        }
        const x = _e(r.value);
        return n("submit", x), x;
      },
      setFieldsValue(x) {
        return c(), Gn(r.value, x, E);
      },
      resetFields(x = {}) {
        Wn(r.value, x, E), c();
        const C = _e(r.value);
        return s == null || s(C), n("reset", C), C;
      }
    }, A = Array.isArray(p) ? { actions: p } : p;
    (l = A == null ? void 0 : A.actions) != null && l.length && (u.subItems = [
      ...u.subItems,
      {
        type: "InfoSlot",
        align: A.align || "center",
        block: !0,
        render: () => _(je, {
          option: A,
          methods: {
            submit: S.submit,
            reset: S.resetFields,
            search: S.submit
          },
          effectData: g
        }),
        ...A.placement === "inline" && {
          span: "auto",
          block: !1,
          align: A.align || "right"
        }
      }
    ]);
    const { modelsMap: M } = nt(u.subItems, r), E = _e(r.value);
    Z(
      () => ae(e.dataSource ?? e.option.dataSource),
      (x) => {
        x && (c(), r.value = x);
      },
      { immediate: !0, flush: "sync" }
    );
    const f = H({ ...S }), w = (x) => {
      if (o.value = x, !x) {
        n("register", null);
        return;
      }
      n("register", f);
    };
    return ct(() => {
      h.clear(), o.value = void 0;
    }), t(f), () => X("form")(
      {
        ref: w,
        class: ["sup-form", v && "sup-form-compact", d && "sup-form-simple"],
        model: r.value,
        labelAlign: "right",
        ...y
      },
      {
        ...a,
        default: () => _(ze, {
          option: u,
          model: { refData: r, children: M },
          effectData: g
        })
      }
    );
  }
}, ql = oe({
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
    let i = l, s = pt(l.rules, e.effectData), p = he(l, "propChain");
    const u = {}, d = {
      type: "object",
      required: !1,
      fields: {}
    }, v = l.refName !== void 0 || l.index !== void 0;
    if (l.children && o) {
      for (const c of l.children.values())
        if ((n = c.rules) != null && n.length && c.fieldName) {
          c.rules[0].required && (d.required = !0);
          const m = H({
            ...e.effectData,
            parent: e.effectData,
            current: he(c, "parent"),
            field: c.fieldName,
            value: he(c, "refData")
          }), S = d.fields[c.fieldName] = pt(c.rules, m);
          if (!v) {
            p = he(c, "propChain"), s = S, i = c;
            break;
          }
        }
    } else
      u.style = "margin: 0";
    v && (s = (s || []).concat([d])), s || (s = []), u.required = s.some((c) => c.required);
    const g = we("inheritOptions", {}), y = W(
      () => e.disabled ? void 0 : (!a.required || ae(g.required) ? s : s.slice(1)).map(
        (c) => g.ignoreRules ? { ...c, trigger: "none", validateTrigger: !1 } : c
      )
    ), h = ve(ue.FormItem, a.formItemProps, u), b = rt(a, e.effectData), k = we("exaProvider", {});
    return Z(
      () => ae(i.refData),
      () => {
        var c, m;
        !e.disabled && ((c = y.value) != null && c.length) && ((m = k.validateField) == null || m.call(k, p.value).catch(() => {
        }));
      },
      { deep: !0, flush: "post" }
    ), () => X("formItem")(
      {
        ...h,
        rules: y.value,
        name: p.value
      },
      {
        label: b,
        default: (r == null ? void 0 : r.default) || (() => _(ze, {
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
function Dt(e, t) {
  const n = Array.isArray(t) ? { actions: t } : t;
  return {
    ...e,
    ...n,
    buttonProps: { ...e.buttonProps, ...n == null ? void 0 : n.buttonProps }
  };
}
const Kl = oe({
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
    const { model: t, option: n, isView: a, effectData: l, labelIndex: o } = e, { columns: r, rowButtons: i, label: s, labelSlot: p, compact: u, slots: d, ...v } = n, { modelsMap: g } = t.listData, y = r[0], h = g.get(y), b = r.length === 1 && y.field === "$index", k = !o && (s || p), c = he(t, "refData");
    let m = [];
    const S = {
      add: {
        onClick({ index: w }) {
          c.value.splice(w + 1, 0, b ? void 0 : {}), m.splice(w + 1, 0, void 0);
        },
        icon: () => Ge("add")
      },
      delete: {
        disabled: () => c.value.length === 1,
        confirmText: "",
        icon: () => Ge("remove"),
        onClick({ index: w }) {
          c.value.splice(w, 1), m.splice(w, 1);
        }
      }
    }, A = !a && i !== !1 && Dt(
      {
        type: "Buttons",
        colProps: { flex: "0" },
        labelMode: "icon",
        ...ue.rowButtons,
        methods: S,
        actions: ["add", "delete"]
      },
      i
    ), M = Te([]), E = (w, x) => {
      const C = [...t.propChain, x], D = H({ ...b ? h : {}, index: x, parent: c, propChain: C }), R = b ? W({
        get: () => c.value[D.index],
        set: (Y) => {
          c.value[D.index] = Y;
        }
      }) : $(w);
      D.refData = R;
      const V = /* @__PURE__ */ new Map();
      let z;
      b ? (z = { ...y }, Object.assign(D, { initialValue: h.initialValue, rules: h.rules })) : g.size === 1 && !y.field && [...at, "InputGroup", "InputList"].includes(y.type) ? (z = { ...y }, Object.assign(D, {
        initialValue: h.initialValue,
        rules: h.rules,
        listData: h.listData,
        children: Ye(h.children || /* @__PURE__ */ new Map(), R, C).modelsMap
      })) : (z = { type: u ? "InputGroup" : "Group", initialValue: void 0, span: "auto" }, D.children = Ye(g, R, C).modelsMap), V.set(z, D), o && (z.label ?? (z.label = s), z.labelSlot ?? (z.labelSlot = p || (({ index: Y }) => z.label + String(Y + 1)))), A && V.set(A, H({ parent: c, index: x }));
      const K = H({ parent: c, children: V, index: x, propChain: C });
      return {
        children: K.children,
        model: K,
        refData: R,
        key: et(12),
        effectData: H({ parent: l, current: c, index: x })
      };
    };
    if (b)
      Z(
        [() => c.value, () => c.value.length, () => [...t.propChain]],
        () => {
          c.value.length === 0 && c.value.push(void 0), M.value = c.value.map((w, x) => {
            const C = m[x];
            return C ? (vt(C.model, [...t.propChain, x], x), C.effectData.index = x, C) : E(w, x);
          }), m = [...M.value];
        },
        { immediate: !0 }
      );
    else {
      const w = /* @__PURE__ */ new WeakMap();
      Z(
        [() => [...c.value], () => c.value.length, () => [...t.propChain]],
        () => {
          c.value.length === 0 && c.value.push({}), M.value = c.value.map((x, C) => {
            let D = w.get(fe(x));
            return D ? (D.refData.value = x, vt(D.model, [...t.propChain, C], C), D.effectData.index = C) : (D = E(x, C), w.set(fe(x), D)), D;
          });
        },
        { immediate: !0 }
      );
    }
    const f = () => M.value.map(({ model: w, effectData: x, key: C }) => _(ze, { model: w, option: { subSpan: "auto", ...n }, effectData: x, key: C }));
    if (a) {
      if (k)
        if (b) {
          const { label: C, labelSlot: D = C } = r[0], R = r[0].breakAfter;
          return () => X("space")(
            { direction: R ? "vertical" : "horizontal" },
            {
              default: () => M.value.map(({ refData: V, key: z }, K) => {
                const Y = {
                  ...l,
                  parent: l,
                  current: c.value,
                  field: r[0].field,
                  value: V.value,
                  index: K,
                  record: V.value
                };
                return _("span", { key: z }, [ie(D, Y), D ? ": " : "", V.value]);
              })
            }
          );
        } else
          return () => M.value.map(({ children: C, key: D }) => _(qe, {
            key: D,
            modelsMap: C,
            option: n,
            effectData: l
          }));
      const w = {}, x = W(() => new Map(M.value.flatMap(({ children: C }) => [...C])));
      return () => _(qe, {
        option: { ...v, label: s, labelSlot: p },
        modelsMap: x.value,
        effectData: l,
        ...w
      });
    } else if (k) {
      const w = /* @__PURE__ */ new Map([
        [
          {
            ...v,
            formItemProps: { ...v.formItemProps, style: "margin: 0" },
            label: s,
            labelSlot: p,
            type: "InfoSlot",
            block: !1,
            span: 24,
            // FormItem 对单个与多个子节点采用不同包装；固定根节点，避免 1/2 行切换时重挂首行并清除校验状态。
            render: () => _("div", { style: "width: 100%" }, f())
          },
          t
        ]
      ]);
      return () => _(ze, { model: { children: w }, option: n, effectData: l });
    } else
      return f;
  }
}), Hl = oe({
  inheritAttrs: !1,
  props: {
    option: { type: Object, required: !0 },
    model: { type: Object, required: !0 },
    effectData: Object,
    isView: Boolean
  },
  setup(e, { attrs: t, slots: n }) {
    return () => {
      const { option: a, model: l, effectData: o, isView: r } = e, { title: i = a.label, buttons: s } = a;
      return X("card")({
        attrs: t,
        slots: n,
        title: n.title || (i ? () => ie(i, o) : void 0),
        extra: n.extra || (s && !r ? () => _(je, { option: s, effectData: o }) : void 0),
        content: n.default || (() => r ? _(qe, { option: a, modelsMap: l.children, effectData: o }) : _(ze, { option: a, model: l, effectData: o }))
      });
    };
  }
}), Wl = oe({
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
    var n, a;
    const l = $(), o = Ke({
      ...e.schema,
      dataSource: e.dataSource || e.model || ((n = e.schema) == null ? void 0 : n.dataSource),
      attrs: ve({ ...ue.Form }, { ...(a = e.schema) == null ? void 0 : a.attrs })
    });
    Se.schemaDiagnostics && e.schema && mt(e.schema, "form", "SuperForm");
    const r = {
      setOption: (u) => {
        var d;
        Se.schemaDiagnostics && mt(u, "form", "SuperForm"), Ue(o, u), o.attrs = ve(o.attrs, { ...u.attrs }, { ...(d = e.schema) == null ? void 0 : d.attrs });
      }
    };
    Be("rootSlots", t.slots), t.emit("register", r);
    const i = (u) => {
      l.value = u, t.emit("register", r, u);
    };
    Vt(() => t.expose(l.value));
    const s = W(() => e.useSectionStyle || o.useSectionStyle);
    return () => o.subItems && _(
      Me.Form,
      {
        option: o,
        // dataSource: formData.value,
        onRegister: i,
        compact: e.compact,
        ignoreRules: e.ignoreRules,
        class: { "sup-container": s.value }
      },
      ot(o.slots, Oe(), t.slots)
    );
  }
});
function Xn(e) {
  const [t, n] = Lt(), a = Promise.resolve(typeof e == "function" ? e() : e), l = (r, i) => {
    if (r)
      t.value || a.then(r.setOption), t.value = i;
    else
      return (s, p) => _(Wl, { ...s, onRegister: l }, p == null ? void 0 : p.slots);
  }, o = async (r, i) => {
    const s = await n();
    if (r && r in s)
      return typeof s[r] == "function" ? s[r](i) : s[r];
    if (!r)
      return s;
  };
  return [
    l,
    {
      dataSource: W(() => {
        var r;
        return (r = t.value) == null ? void 0 : r.dataSource;
      }),
      getForm: n,
      asyncCall: o,
      getData() {
        var r;
        return be((r = t.value) == null ? void 0 : r.dataSource);
      },
      submit: () => o("submit"),
      validate: () => o("validate"),
      validateField: (r) => o("validateField", r),
      clearValidate: () => o("clearValidate"),
      getNativeInstance: () => o("getNativeInstance"),
      resetFields: (r) => o("resetFields", r),
      setFieldsValue: (r) => o("setFieldsValue", r)
    }
  ];
}
function Yt(e, { buttons: t, ...n } = {}) {
  const a = $(!1), l = H({ ...n, ...ue.Modal }), o = $(), r = t && (() => _(je, { option: t, effectData: { modalRef: o } })), i = $(!1), s = () => {
    if (!(i.value || u))
      return i.value = !0, Promise.resolve().then(() => {
        var k;
        return (k = l.onOk) == null ? void 0 : k.call(l);
      }).then((k) => {
        k !== !1 && (a.value = !1);
      }).catch((k) => console.error(k)).finally(() => i.value = !1);
  }, p = () => l.icon ? [ie(l.icon), ie(l.title)] : ie(l.title);
  let u;
  const d = (...k) => i.value ? Promise.resolve(!1) : u || (u = Promise.resolve().then(() => {
    var c;
    return (c = l.onCancel) == null ? void 0 : c.call(l, ...k);
  }).then((c) => (c !== !1 && (a.value = !1), c)).catch((c) => (console.error(c), !1)).finally(() => {
    u = void 0;
  })), v = (k) => {
    if (k)
      a.value = !0;
    else if (a.value)
      return d();
  };
  return {
    config: l,
    modalRef: o,
    modalSlot: (k, c) => X("modal")(
      {
        ref: o,
        visible: a.value,
        class: "sup-modal",
        "onUpdate:visible": v,
        confirmLoading: i.value,
        okText: L("confirm"),
        cancelText: L("cancel"),
        ...l,
        title: void 0,
        ...k,
        onOk: s,
        onCancel: d
      },
      { footer: r, title: p, ...c == null ? void 0 : c.slots, ...e && { default: e } }
    ),
    setModal: (k) => {
      Object.assign(l, k);
    },
    closeModal: () => (a.value = !1, Ae()),
    openModal: async (k) => (Object.assign(l, k), a.value = !0, Ae())
  };
}
function Zn(e, t) {
  var n;
  const { modalSlot: a, openModal: l, modalRef: o, closeModal: r, setModal: i, config: s } = Yt(e, t), p = Bt(), u = document.createElement("div");
  let d;
  const v = We().modal, g = (n = v == null ? void 0 : v.useContext) == null ? void 0 : n.call(v), y = () => {
    const c = s.afterClose;
    s.destroyOnClose && b(), c == null || c();
  }, h = (c) => {
    var m;
    return ((m = v == null ? void 0 : v.wrapContext) == null ? void 0 : m.call(
      v,
      (S = {}) => a({ ...c, ...S, afterClose: y }, {}),
      g,
      c
    )) ?? a({ ...c, afterClose: y }, {});
  }, b = () => {
    dt(null, u), u.remove(), d = null;
  };
  return $t(b), {
    modalRef: o,
    openModal: (c) => d ? l(c) : (d = kn(h), d.appContext = p == null ? void 0 : p.appContext, document.body.appendChild(u), dt(d, u), Ae(() => l(c))),
    modalSlot: a,
    closeModal: r,
    setModal: i
  };
}
function hr(e, t = {}) {
  const { title: n, ...a } = e, { onSubmitError: l, ...o } = t, [r, i] = Xn(a), s = Zn(r(), { maskClosable: !1, title: n, ...o });
  return { ...s, openModal: ({ data: u, onOk: d = t.onOk, onSubmitError: v = l, ...g } = {}) => {
    const y = async () => {
      try {
        const h = await i.submit();
        return d ? await d(h) : h;
      } catch (h) {
        try {
          await (v == null ? void 0 : v(h));
        } catch (b) {
          console.error(b);
        }
        throw h;
      }
    };
    return i.resetFields(u), s.openModal({ ...g, onOk: y });
  }, formActions: i };
}
const Rt = oe({
  name: "CollectionList",
  inheritAttrs: !1,
  props: {
    option: { type: Object, required: !0 },
    model: { type: Object, required: !0 },
    effectData: { type: Object, required: !0 },
    isView: Boolean
  },
  setup(e, { attrs: t, slots: n }) {
    const a = he(e.model, "refData"), l = Te([]), o = /* @__PURE__ */ new WeakMap(), r = $(), i = $([]), s = $(), p = $({}), u = $(0), d = e.option.editModal && Yt(
      () => {
        var c, m, S;
        return _(Qn, {
          key: u.value,
          option: {
            ...(c = e.option.editModal) == null ? void 0 : c.form,
            subItems: ((S = (m = e.option.editModal) == null ? void 0 : m.form) == null ? void 0 : S.subItems) || e.option.columns
          },
          dataSource: p.value,
          onRegister: (A) => {
            s.value = A;
          }
        });
      },
      { maskClosable: !1, ...e.option.editModal.modalProps }
    ), v = (c) => {
      Ae(() => {
        const m = l.value.find((S) => fe(S.model.refData) === fe(c));
        m && (e.option.type === "TabList" && (r.value = m.key), e.option.type === "CollapseList" && !i.value.includes(m.key) && (i.value = [...i.value, m.key]));
      });
    }, g = (c, m) => {
      var S, A;
      if (!(e.isView || !d))
        return p.value = _e((c == null ? void 0 : c.model.refData) || {}), u.value++, d.openModal({
          title: ((A = (S = e.option.editModal) == null ? void 0 : S.modalProps) == null ? void 0 : A.title) || (() => L(c ? "editTitle" : "add")),
          onOk: async () => {
            if (e.isView)
              return;
            const M = await s.value.submit();
            if (c) {
              const E = l.value.indexOf(c);
              if (E < 0)
                throw new Error(L("recordDeleted"));
              Object.assign(a.value[E], M);
            } else {
              const E = M;
              if (m === null)
                a.value.unshift(E);
              else {
                const f = l.value.indexOf(m);
                if (f < 0)
                  throw new Error(L("insertRecordDeleted"));
                a.value.splice(f + 1, 0, E);
              }
              v(E);
            }
          }
        });
    }, y = {
      add: ({ listItemKey: c } = {}) => {
        if (e.isView)
          return;
        const m = l.value.find((A) => A.key === c);
        if (c !== void 0 && !m)
          throw new Error(L("insertRecordDeleted"));
        if (d)
          return g(void 0, m || null);
        const S = {};
        m ? a.value.splice(l.value.indexOf(m) + 1, 0, S) : a.value.unshift(S), v(S);
      },
      edit: ({ listItemKey: c }) => {
        const m = l.value.find((S) => S.key === c);
        if (m)
          return g(m);
      },
      delete: ({ listItemKey: c }) => {
        const m = l.value.findIndex((S) => S.key === c);
        !e.isView && m >= 0 && a.value.splice(m, 1);
      }
    }, h = we("rootSlots", {}), b = (c, m, S) => {
      if (c !== !1)
        return Yn(
          Dt({ ...ue.rowButtons, actions: S }, c),
          m,
          y,
          h,
          () => !e.isView
        );
    }, k = b(e.option.buttons, e.effectData, ["add"]);
    return Z(
      [() => [...a.value], () => [...e.model.propChain]],
      () => {
        var c;
        const m = l.value, S = m.findIndex((f) => f.key === r.value), A = /* @__PURE__ */ new Map(), M = /* @__PURE__ */ new Set();
        l.value = a.value.map((f, w) => {
          const x = fe(f), C = A.get(x) || 0;
          A.set(x, C + 1);
          const D = o.get(x) || [];
          let R = D[C];
          if (!R) {
            const V = $(f), { modelsMap: z } = Ye(e.model.listData.modelsMap, V, e.model.propChain, w);
            R = {
              key: C ? et(12) : Re(f, String(t.rowKey || "id")) ?? et(12),
              model: H({ refData: V, children: z, index: w, propChain: [...e.model.propChain, w] }),
              effectData: H({ parent: e.effectData, current: a, index: w, record: f })
            }, R.buttons = b(
              e.option.rowButtons,
              R.effectData,
              d ? ["add", "edit", "delete"] : ["add", "delete"]
            ), D[C] = R, o.set(x, D);
          }
          return M.has(R.key) && (R.key = et(12)), M.add(R.key), R.effectData.listItemKey = R.key, R.model.refData = f, R.effectData.record = f, vt(R.model, [...e.model.propChain, w], w), R.effectData.index = w, R;
        }), l.value.some((f) => f.key === r.value) || (r.value = (c = l.value[Math.min(Math.max(S, 0), l.value.length - 1)]) == null ? void 0 : c.key);
        const E = m.findIndex(
          (f) => i.value.includes(f.key) && !l.value.some((w) => w.key === f.key)
        );
        if (i.value = i.value.filter((f) => l.value.some((w) => w.key === f)), E >= 0 && l.value.length) {
          const f = l.value[Math.min(E, l.value.length - 1)].key;
          i.value.includes(f) || i.value.push(f);
        }
      },
      { immediate: !0 }
    ), () => {
      const { option: c, isView: m } = e, { span: S = 24 } = t, A = { ...t };
      delete A.rowKey, delete A.span;
      const M = c.title ?? c.label, E = !m && k ? () => k.render() : void 0, f = n.title || M || E ? () => X("space")(
        {},
        {
          default: () => [n.title ? n.title() : ie(M, e.effectData), E == null ? void 0 : E()]
        }
      ) : void 0, w = l.value.map((C, D) => ({
        key: C.key,
        title: () => c.titleField ? Re(C.model.refData, c.titleField) || ["新建", ie(M, e.effectData)] : [ie(M, e.effectData), String(D + 1)],
        extra: !m && c.type !== "TabList" && C.buttons ? () => C.buttons.render() : void 0,
        content: () => m || d ? _(qe, { option: c, modelsMap: C.model.children, effectData: C.effectData }) : _(ze, { option: c, model: C.model, effectData: C.effectData })
      })), x = () => w.length ? c.type === "TabList" ? X("tabs")({
        attrs: A,
        items: w,
        activeKeys: r.value,
        onActiveChange: (C) => {
          r.value = C;
        },
        extra: m ? void 0 : () => {
          var C, D;
          return (D = (C = l.value.find((R) => R.key === r.value)) == null ? void 0 : C.buttons) == null ? void 0 : D.render();
        }
      }) : c.type === "CollapseList" ? X("collapse")({
        attrs: A,
        items: w,
        activeKeys: i.value,
        onActiveChange: (C) => {
          i.value = Array.isArray(C) ? C : [C];
        }
      }) : X("row")(
        { gutter: c.gutter ?? [16, 16], ...c.rowProps },
        {
          default: () => w.map(
            (C) => X("col")(
              { key: C.key, span: S },
              {
                default: () => X("card")({
                  attrs: A,
                  title: C.title,
                  extra: C.extra,
                  content: C.content
                })
              }
            )
          )
        }
      ) : X("empty")();
      return [X("group")({ title: f, content: x }), d && _(d.modalSlot)];
    };
  }
}), Gl = oe({
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
    const { model: n, isView: a, effectData: l, labelIndex: o, rowKey: r = "" } = e, { columns: i, rowButtons: s, slots: p, ...u } = e.option, { modelsMap: d, rules: v } = n.listData, g = he(n, "refData"), y = {
      add: {
        icon: () => Ge("add"),
        onClick({ index: S }) {
          g.value.splice(S + 1, 0, {}), g.value = [...fe(g.value)];
        }
      },
      delete: {
        hidden: () => g.value.length === 1,
        disabled: !1,
        confirmText: "",
        icon: () => Ge("remove"),
        onClick({ index: S }) {
          g.value = g.value.filter((A, M) => M !== S);
        }
      }
    }, h = !a && s !== !1 && Dt(
      {
        type: "Buttons",
        labelMode: "icon",
        ...ue.rowButtons,
        methods: y,
        actions: ["add", "delete"]
      },
      s
    ), b = /* @__PURE__ */ new WeakMap(), k = $([]);
    Z(
      [() => [...g.value], () => [...n.propChain]],
      () => {
        const S = g.value;
        S.length === 0 && S.push({}), k.value = S.map((A, M) => {
          const E = fe(A), f = b.get(E);
          if (f)
            return f.refData.value = A, vt(f.model, [...n.propChain, M], M), f.effectData.index = M, f;
          const w = $(A), { modelsMap: x } = Ye(d, w, n.propChain, M), C = {
            key: A[r] || et(12),
            refData: w,
            model: H({ refData: w, children: x, index: M, propChain: [...n.propChain, M] }),
            effectData: H({
              parent: l,
              current: g,
              index: M,
              record: A
            })
          };
          return b.set(E, C), C;
        });
      },
      {
        immediate: !0
      }
    );
    const c = {
      ...u,
      type: "Group",
      buttons: h,
      subItems: i
    }, m = u.title || u.label;
    return typeof m == "string" && o && (c.title = ({ index: S }) => m + String(S + 1)), () => k.value.map(({ model: S, effectData: A, key: M }) => _(Me.Group, { model: S, option: c, effectData: A, key: M, isView: a }, t.slots));
  }
}), Yl = /* @__PURE__ */ oe({
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
    const a = $(e.option.activeKey), l = [], o = (i, s, p) => {
      l[i] = p ? void 0 : s, p && a.value === s && (a.value = l.find(Boolean));
    }, r = [...e.model.children].map(([i, s], p) => {
      const {
        key: u,
        field: d,
        label: v,
        icon: g
      } = i, y = Oe({
        parent: e.effectData,
        current: he(s, "parent"),
        field: s.refName,
        value: s.refData
      }), {
        hidden: h,
        attrs: b
      } = De({
        option: i,
        effectData: y
      }), k = u || d || String(p), c = () => [ie(g, y), ie(v, y)];
      return Ne(() => o(p, k, ae(h) || ae(b.disabled))), {
        attrs: H(b),
        key: k,
        title: c,
        hidden: h,
        option: i,
        model: s,
        effectData: y
      };
    });
    return Vt(() => {
      a.value ?? (a.value = l.find(Boolean));
    }), () => X("tabs")({
      attrs: t,
      slots: n,
      content: n.default,
      activeKeys: a.value,
      onActiveChange: (i) => {
        a.value = i;
      },
      extra: n.extra || (!e.isView && e.option.buttons ? () => _(je, {
        option: e.option.buttons,
        effectData: e.effectData
      }) : void 0),
      // 显隐和禁用属于 Schema 语义，两个 Adapter 消费相同的有效子项。
      items: r.filter(({
        hidden: i
      }) => !i.value).map(({
        attrs: i,
        key: s,
        title: p,
        option: u,
        model: d,
        effectData: v
      }) => ({
        key: s,
        attrs: i,
        title: p,
        disabled: ae(i.disabled),
        content: () => e.isView ? _(qe, {
          option: u,
          modelsMap: d.children,
          effectData: v
        }) : _(ze, {
          option: u,
          model: d,
          effectData: v
        })
      }))
    });
  }
}), tt = (e, ...t) => Sa(e, ...t, (n, a, l, o) => {
  if (a === void 0)
    o[l] = void 0;
  else if (Array.isArray(n))
    return a;
});
function Ql({
  childrenMap: e,
  orgList: t,
  listener: n,
  rowEditor: a,
  rowKey: l
}) {
  const o = Ke(/* @__PURE__ */ new Map()), r = W(() => Object.fromEntries([...o.values()].flatMap((f) => [[f.id, f.editData], [f.validationId, f.editData]]))), i = Te();
  let s = Promise.resolve(), p = 0;
  const u = W(() => !!(a != null && a.singleEdit) && o.size > 0), d = (f) => o.get(l(f)) || {
    isEdit: !1
  }, v = (f) => {
    f.isEdit = !1, o.get(f.key) === f && o.delete(f.key);
  }, {
    onLoaded: g
  } = we("exaProvider", {}), y = g == null ? void 0 : g(() => {
    a != null && a.singleEdit && (o.forEach((f) => {
      f.isEdit = !1;
    }), o.clear());
  });
  ct(() => y == null ? void 0 : y());
  const h = W(() => {
    const f = [...t.value];
    for (const w of o.values())
      if (w.isNew) {
        const x = w.anchorKey === void 0 ? f.length - 1 : f.findIndex((C) => l(C) === w.anchorKey);
        f.splice(x < 0 ? Math.min(w.index, f.length) : x + 1, 0, w.record);
      }
    return f;
  }), b = (f, w, x) => {
    const C = H(_e(w)), D = `row_${++p}`, {
      modelsMap: R,
      rules: V
    } = Hn(fe(e), C, [D]), z = Ke({
      id: D,
      validationId: `${D}_validation`,
      record: f,
      key: l(f),
      editData: C,
      modelsMap: R,
      rules: Ke(V),
      fields: Ke({}),
      isEdit: !0,
      saving: !1,
      ...x
    });
    o.set(z.key, z);
  }, k = {
    add({
      index: f,
      record: w,
      resetData: x
    } = {}) {
      if (u.value)
        return;
      const C = w ?? (f === void 0 ? void 0 : t.value[f]);
      if (f !== void 0 && !C)
        throw new Error(L("insertPositionInvalid"));
      const D = {
        ...x
      }, R = C && l(C), V = C ? t.value.findIndex((z) => l(z) === R) + 1 : t.value.length;
      b(D, D, {
        isNew: !0,
        index: V,
        anchorKey: R
      });
    },
    edit({
      record: f,
      selectedRows: w,
      resetData: x
    }) {
      if (u.value)
        return;
      const C = f || (w == null ? void 0 : w[0]);
      !C || d(C).isEdit || b(C, tt({}, C, x), {
        isNew: !1
      });
    },
    delete({
      record: f,
      selectedRows: w
    }) {
      const x = f ? [f] : w || [];
      if (!(u.value || x.some((C) => d(C).isEdit)))
        return n.onDelete(x);
    }
  }, c = {
    add: {
      disabled: () => u.value,
      onClick: k.add
    },
    edit: {
      disabled: (f) => {
        var w, x;
        return u.value || !(f.record || ((w = f.selectedRows) == null ? void 0 : w.length) === 1) || !!d(f.record || ((x = f.selectedRows) == null ? void 0 : x[0]) || {}).isEdit;
      },
      onClick: k.edit
    },
    delete: {
      disabled: (f) => {
        var w;
        return u.value || !(f.record || ((w = f.selectedRows) == null ? void 0 : w.length) > 0) || (f.record ? [f.record] : f.selectedRows || []).some((x) => d(x).isEdit);
      },
      onClick: k.delete
    }
  }, m = [{
    name: "save",
    attrs: {
      loading: !0
    },
    onClick: async (f) => {
      var w;
      const {
        record: x
      } = f, C = d(x);
      if (!(!C.isEdit || C.saving)) {
        C.saving = !0;
        try {
          const D = Ce("form");
          if (await Ae(), !C.isEdit)
            return;
          if (!i.value)
            throw new Error("行编辑表单尚未就绪");
          const R = s.then(() => {
            if (!C.isEdit)
              return;
            const K = [...C.modelsMap.values()].filter((Y) => C.rules[Y.propChain.join(".")]).map((Y) => {
              var U;
              return (U = C.fields[Y.propChain.join(".")]) != null && U.editable.value ? Y.propChain : [C.validationId, ...Y.propChain.slice(1)];
            });
            if (K.length)
              return D.validate(i.value, K);
          });
          if (s = R.catch(() => {
          }), await R, !C.isEdit)
            return;
          if (await ((w = a == null ? void 0 : a.onSave) == null ? void 0 : w.call(a, {
            ...f,
            isNew: C.isNew
          })) === !1 || !C.isEdit)
            return !1;
          const z = _e(fe(C.editData));
          if (C.isNew) {
            const K = C.anchorKey === void 0 ? void 0 : t.value.findIndex((Y) => l(Y) === C.anchorKey);
            if (K === -1)
              throw new Error(L("insertAnchorDeleted"));
            await n.onSave(z, K), C.isNew = !1;
          } else
            await n.onUpdate(z, x);
          v(C);
        } catch (D) {
          throw D instanceof Error && Ce("services").message("error", D.message), D;
        } finally {
          C.saving = !1;
        }
      }
    }
  }, {
    name: "cancel",
    disabled: ({
      record: f
    }) => d(f).saving,
    onClick: async (f) => {
      var w;
      const x = d(f.record);
      if (!(!x.isEdit || x.saving)) {
        x.saving = !0;
        try {
          if (await ((w = a == null ? void 0 : a.onCancel) == null ? void 0 : w.call(a, {
            ...f,
            isNew: x.isNew
          })) === !1)
            return;
          v(x);
        } finally {
          x.saving = !1;
        }
      }
    }
  }], S = (f, w) => d(f.record).isEdit ? _(je, {
    key: "edit",
    option: {
      ...w,
      actions: m
    },
    effectData: f
  }) : null, A = /* @__PURE__ */ oe({
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
      editInfo: w,
      viewRender: x
    }) {
      const {
        editable: C = !0
      } = f, {
        modelsMap: D
      } = w, R = D.get(fe(f)), {
        index: V,
        parent: z,
        refData: K
      } = $e(R), Y = R.propChain.join("."), U = Oe({
        current: z,
        value: K,
        index: V
      }), {
        attrs: ee,
        hidden: J,
        nativeAttrs: F,
        disabled: N
      } = De({
        option: f,
        effectData: U
      }), I = W(() => !J.value && (lt(C) ? C(U) : C)), B = Et(f, R, U, ee, {
        attrs: F,
        disabled: N
      }), q = pt(R.rules, U), Q = W(() => ae(ee.disabled) || ae(J) ? [] : q), le = {
        editable: I
      };
      return w.fields[Y] = le, q && (w.rules[Y] = Q), ct(() => {
        w.fields[Y] === le && delete w.fields[Y];
      }), () => I.value ? X("formItem")({
        name: R.propChain,
        rules: Q.value,
        wrapperCol: {},
        class: "sup-table-edit-item"
      }, {
        default: B
      }) : x ? x({
        ...U,
        isView: !0
      }) : K.value;
    }
  }), M = (f, w) => {
    if (Qt(f.type) === "enhanced" || Pt(f.type) || f.type === "InputSlot")
      return ({
        record: x
      }) => {
        const C = d(x);
        if (C.isEdit)
          return _(A, {
            key: C.id,
            option: f,
            editInfo: C,
            viewRender: w
          });
      };
  }, E = /* @__PURE__ */ oe({
    setup(f, {
      slots: w
    }) {
      return () => X("form")({
        ref: i,
        model: r.value,
        class: "sup-table-inline-form"
      }, {
        default: () => {
          var x;
          return [
            (x = w.default) == null ? void 0 : x.call(w),
            // 未展示或只读列仍须注册整行规则，不能依赖输入框是否挂载。
            ...[...o.values()].map((C) => _("div", {
              key: C.id,
              style: {
                display: "none"
              }
            }, [...C.modelsMap.values()].flatMap((D) => {
              var R;
              const V = D.propChain.join(".");
              return !C.rules[V] || (R = C.fields[V]) != null && R.editable.value ? [] : [X("formItem")({
                key: V,
                name: [C.validationId, ...D.propChain.slice(1)],
                rules: ae(C.rules[V])
              })];
            })))
          ];
        }
      });
    }
  });
  return {
    list: h,
    methods: k,
    buttonMethods: c,
    getEditRender: M,
    editButtonsSlot: S,
    wrapTable: (f) => _(E, null, {
      default: f
    })
  };
}
function Xl({ rowKey: e, option: t, listener: n, orgList: a }) {
  const l = t.rowEditor, o = (l == null ? void 0 : l.form) || {};
  o.subItems = o.subItems || t.columns.filter((y) => {
    var h;
    return !((h = y.exclude) != null && h.includes("form"));
  });
  const [r, i] = Xn(o), s = {
    ...ue.Modal,
    maskClosable: !1,
    destroyOnClose: !0,
    ...t.modalProps,
    ...l == null ? void 0 : l.modalProps
  }, { modalSlot: p, openModal: u, closeModal: d } = Yt(r(), s), v = ({ meta: y, ...h }) => ie(s.title, { meta: y, ...h }) || `${o.title ? o.title + " - " : ""}  ${ie(y.title || y.label, { meta: y, ...h })}`;
  return { modalSlot: p, methods: {
    add(y = {}) {
      const { meta: h = {}, resetData: b, index: k } = y, c = y.record ? a.value.findIndex((m) => e(m) === e(y.record)) : k;
      return h.title ?? (h.title = () => L("add")), h.name = "add", h.isNew = !0, i.resetFields(b), u({
        ...h,
        title: () => v({ ...y, resetData: b, meta: h }),
        onOk: async () => i.submit().then(async (m) => {
          var S;
          return await ((S = l == null ? void 0 : l.onSave) == null ? void 0 : S.call(l, { ...y, source: m, meta: h })) === !1 ? !1 : n.onSave(m, c === -1 ? void 0 : c);
        }),
        onCancel: async () => {
          var m;
          return await ((m = l == null ? void 0 : l.onCancel) == null ? void 0 : m.call(l, { ...y, meta: h })) === !1 ? !1 : d();
        }
      });
    },
    async edit(y) {
      var h, b;
      const { record: k, selectedRows: c, resetData: m, meta: S = {} } = y, A = k || c[0];
      if (!A)
        return Promise.reject(new Error(L("recordNotSelected")));
      const M = await ((b = (h = t.apis) == null ? void 0 : h.info) == null ? void 0 : b.call(h, e(A), A)), E = tt({}, A, M, m);
      return i.resetFields(E), Ue(S, { name: "edit", title: () => L("editTitle"), isNew: !1 }), u({
        ...S,
        title: () => v({ ...y, source: E, meta: S }),
        onOk: async () => i.submit().then(async (f) => {
          var w;
          return await ((w = l == null ? void 0 : l.onSave) == null ? void 0 : w.call(l, { ...y, source: f, meta: S })) === !1 ? !1 : n.onUpdate(f, A);
        }),
        onCancel: async () => {
          var f;
          return await ((f = l == null ? void 0 : l.onCancel) == null ? void 0 : f.call(l, { ...y, meta: S })) === !1 ? !1 : d();
        }
      });
    },
    delete({ record: y, selectedRows: h }) {
      const b = y ? [y] : h;
      return n.onDelete(b);
    }
  } };
}
function Zl({
  model: e,
  orgList: t,
  editableRef: n,
  rowKey: a
}) {
  const {
    modelsMap: l
  } = e.listData, o = he(e, "propChain", []), r = /* @__PURE__ */ new WeakMap(), i = (d, v) => {
    const g = fe(d), y = [...o.value, v];
    let h = r.get(g);
    if (h)
      vt(h.model, y, v);
    else {
      const {
        modelsMap: b,
        rootModels: k
      } = Hn(fe(l), d, o.value, v);
      h = {
        key: Symbol(),
        modelsMap: b,
        model: H({
          children: k,
          index: v,
          propChain: y
        })
      }, r.set(g, h);
    }
    return h;
  };
  Z([() => [...t.value], () => [...o.value]], ([d]) => {
    d.forEach(i);
  }, {
    immediate: !0,
    flush: "sync"
  });
  const s = {
    add({
      index: d,
      record: v,
      resetData: g
    } = {}) {
      const y = {
        ...g
      }, h = v ? t.value.findIndex((b) => a(b) === a(v)) : d;
      if (h !== void 0) {
        if (!t.value[h])
          throw new Error(L("insertPositionInvalid"));
        t.value.splice(h + 1, 0, y);
      } else
        t.value.push(y);
    }
    // delete({ record }) {
    //   const orgIdx = orgList.value.indexOf(record)
    //   orgList.value.splice(orgIdx, 1)
    // },
  }, p = /* @__PURE__ */ oe({
    inheritAttrs: !1,
    props: {
      option: {
        type: Object,
        required: !0
      }
    },
    setup({
      option: d
    }, v) {
      const {
        record: g
      } = v.attrs, y = W(() => r.get(fe(g)).modelsMap.get(d)), {
        index: h,
        parent: b,
        refData: k
      } = $e(y.value), c = Oe({
        current: b,
        value: k,
        list: t,
        record: g,
        index: h
      }), {
        editable: m = !0
      } = d, {
        attrs: S,
        hidden: A,
        nativeAttrs: M,
        disabled: E
      } = De({
        option: d,
        effectData: c
      }), f = W(() => !A.value && n.value && (lt(m) ? m(c) : m)), w = Et(d, y.value, c, S, {
        attrs: M,
        disabled: E
      }), x = ht(d, H({
        ...$e(c),
        isView: !0
      })), C = pt(y.value.rules, c), D = C && W(() => ae(S.disabled) ? void 0 : C);
      return () => f.value ? X("formItem")({
        wrapperCol: {},
        name: y.value.propChain,
        rules: D == null ? void 0 : D.value,
        class: "sup-table-edit-item"
      }, {
        default: w
      }) : x ? x() : k.value;
    }
  });
  return {
    list: t,
    methods: s,
    getEditRender: (d) => {
      if (Qt(d.type) === "enhanced" || Pt(d.type) || d.type === "InputSlot" && d.editable !== !1)
        return (v) => {
          const g = t.value.findIndex((h) => fe(h) === fe(v.record)), y = i(v.record, g < 0 ? v.index : g);
          return _(p, {
            key: y.key,
            option: d,
            ...v
          });
        };
    }
  };
}
const Jn = oe({
  props: {
    dataSource: Object,
    schema: Object
  },
  emits: ["register"],
  setup(e, t) {
    const n = Te(e.schema || {}), a = $({});
    Z(
      () => e.schema,
      (r) => {
        Se.schemaDiagnostics && r && mt(r, "detail", "SuperDetail"), n.value = r || {};
      },
      { immediate: !0 }
    ), Z(
      () => ae(e.dataSource ?? n.value.dataSource),
      (r) => {
        r != null && (a.value = r);
      },
      { immediate: !0 }
    );
    const l = {
      setOption: (r) => {
        Se.schemaDiagnostics && mt(r, "detail", "SuperDetail"), n.value = r;
      },
      setData: (r) => {
        a.value = r;
      }
    }, o = $();
    return Z(
      n,
      (r) => {
        if (!(r != null && r.subItems)) {
          o.value = void 0;
          return;
        }
        const i = nt(r.subItems, a);
        o.value = i.modelsMap;
      },
      { immediate: !0 }
    ), t.expose(l), t.emit("register", l), Be("exaProvider", xn({ data: a })), Be("rootSlots", t.slots), () => o.value && _(
      "div",
      { class: ["sup-detail", n.value.useSectionStyle && "sup-container"] },
      _(qe, {
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
function Jl(e, t, n) {
  const a = $({}), { title: l, apis: o } = e, r = we("rootSlots", {}), { modalProps: i, ...s } = e.detailOption || {}, p = () => e.detailOption ? _(Jn, { schema: s, dataSource: a.value }, r) : _(Bl, { option: {}, modelsMap: t, source: a }), u = {
    ...ue.Modal,
    footer: null,
    ...e.modalProps,
    ...i
  }, d = (y) => ie(u.title, y) || `${l ? l + " - " : ""}${L("detailTitle")}`, { openModal: v, modalSlot: g } = Zn(p, u);
  return {
    detailSlot: g,
    openDetail: async ({ record: y, selectedRows: h, meta: b = {}, ...k }) => {
      const c = y || h[0];
      if (o != null && o.info) {
        const m = await o.info(n(c), c);
        a.value = Object.assign({}, c, m);
      } else
        a.value = c;
      b.name = "detail", v({ ...b, title: () => d({ ...k, source: a.value, meta: b }) });
    }
  };
}
function eo({ option: e, model: t, orgList: n, rowKey: a, listener: l, isView: o, effectData: r }) {
  const { modelsMap: i } = t.listData, s = {
    list: n,
    modalSlot: [],
    methods: {
      delete({ record: h, selectedRows: b }) {
        const k = h ? [h] : b;
        return l.onDelete(k);
      }
    }
  }, { editable: p, rowEditor: u } = e, { editMode: d, addMode: v } = u || {};
  if (!o && p) {
    const h = W(() => lt(p) ? p(r) : p), { methods: b, ...k } = Zl({ model: t, orgList: n, editableRef: h, rowKey: a });
    Object.assign(s.methods, b), Object.assign(s, k);
  } else if (d === "inline") {
    const { list: h, methods: b, buttonMethods: k, editButtonsSlot: c, getEditRender: m, wrapTable: S } = Ql({
      childrenMap: i,
      orgList: n,
      listener: l,
      rowEditor: u,
      rowKey: a
    });
    s.list = h, Object.assign(s.methods, b), Object.assign(s, { buttonMethods: k, editButtonsSlot: c, getEditRender: m, wrapTable: S });
  }
  if (d === "modal" || v === "modal") {
    const { modalSlot: h, methods: b } = Xl({ rowKey: a, option: e, listener: l, orgList: n });
    s.methods.edit ? (s.methods.add = b.add, s.buttonMethods || (s.buttonMethods = {}), s.buttonMethods.add = b.add) : Object.assign(s.methods, b), s.modalSlot.push(h);
  }
  const { detailSlot: g, openDetail: y } = Jl(e, i, a);
  return s.modalSlot.push(g), s.methods.detail = y, s;
}
const to = oe({
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
  setup(e, { attrs: t, slots: n, emit: a }) {
    const { optionsRef: l } = At(e.options, e.effectData), o = $(e.activeKey ?? e.defaultActiveKey), r = (m) => {
      o.value = m, a("update:activeKey", m);
    }, {
      default: i,
      extra: s,
      rightExtra: p,
      tabBarExtraContent: u,
      tabBarExtra: d,
      title: v,
      titleBar: g,
      ...y
    } = n, h = ot(e.slots, e.effectData), b = d || p || u, k = W(() => {
      var m;
      const S = l.value.map(({ value: A, label: M, ...E }) => ({
        ...E,
        key: E.key ?? A,
        tab: E.tab ?? M
      }));
      return o.value === void 0 && r((m = S[0]) == null ? void 0 : m.key), S;
    }), c = (m) => ie(h.customTab || e.customTab || m.tab, {
      ...e.effectData,
      item: m
    });
    return () => [
      !e.bordered && v ? g == null ? void 0 : g() : null,
      X("tableFilter")(
        {
          bordered: e.bordered,
          items: k.value.map((m) => ({
            ...m,
            tab: c(m)
          })),
          value: o.value,
          onValueChange: r,
          attrs: t
        },
        {
          ...y,
          ...h,
          default: i,
          title: v,
          tabExtra: b || (v ? void 0 : s),
          cardExtra: b || v ? s : void 0
        }
      )
    ];
  }
}), no = oe({
  props: {
    option: { type: Object, required: !0 },
    effectData: { type: Object, required: !0 }
  },
  setup(e) {
    const t = e.option, { field: n, editable: a } = e.option, l = H({});
    Z(
      () => e.effectData,
      (b) => Object.assign(l, b),
      { immediate: !0 }
    );
    const o = n.split(".").slice(0, -1), r = W(() => Re(l.record, o)), i = W({
      get: () => Re(l.record, n),
      set: (b) => ft(l.record, n, b)
    }), s = { parent: r, refData: i }, { attrs: p, hidden: u, nativeAttrs: d, disabled: v } = De({
      option: t,
      effectData: { ...l, inTable: !0 }
    }), g = Et(t, s, l, p, { attrs: d, disabled: v }), y = W(() => lt(a) ? a(l) : ae(a)), h = ht(t, l);
    return () => u.value ? "" : y.value ? _("div", { class: "editable-cell" }, g()) : h ? h() : i.value;
  }
}), ao = (e) => {
  if (!e.editable)
    return;
  const t = Se.buttonRoles && Se.buttonRoles() || [];
  if ((!e.roleName || t.includes(e.roleName)) && (Qt(e.type) === "enhanced" || Pt(e.type) || e.type === "InputSlot"))
    return (a) => _(no, { option: e, effectData: { ...a } });
};
function lo({
  childrenMap: e,
  context: t,
  option: n,
  attrs: a,
  isView: l,
  effectData: o
}) {
  var r;
  const { methods: i, buttonMethods: s, getEditRender: p, editButtonsSlot: u } = t, d = Oe({ list: o.value, isView: l, parent: o }), v = ((r = n.rowEditor) == null ? void 0 : r.editMode) !== "modal", g = function b(k = e) {
    const c = [];
    return [...k].forEach(([m, S]) => {
      var A, M;
      if (m.type === "Hidden" || m.hidden === !0 || (A = m.exclude) != null && A.includes("table"))
        return;
      const E = rt(m, d);
      if (S.children) {
        const f = b(S.children);
        m.ignoreTableTitle ? c.push(...f) : c.push({
          title: E,
          children: f
        });
      } else {
        const f = {
          title: E,
          key: m.field || m.label,
          dataIndex: S.propChain.length > 1 ? S.propChain : S.propChain[0]
        };
        m.options || m.type === "Switch" || (M = m.type) != null && M.includes("Picker") ? f.align = "center" : m.type === "InputNumber" && (f.align = "right"), Object.assign(f, m.columnProps), Ue(f, n.columnProps, ue.Column);
        const w = f.customRender || ht(m) || void 0, x = p ? p(m, w) : v ? ao(m) : void 0;
        f.customRender = oo(w, x, d), c.push(f);
      }
    }), c;
  }(), y = so(n, a);
  y && g.unshift(y);
  const h = ro({
    buttons: n.rowButtons,
    // 行内编辑需要覆盖新增/编辑/删除的禁用状态，但不能丢失详情等通用动作。
    methods: { ...i || {}, ...s || {} },
    editButtonsSlot: u,
    isView: l,
    effectData: d
  });
  return h && (Ue(h, n.columnProps, ue.Column), g.push(h)), g;
}
function oo(e, t, n) {
  if (t || e) {
    const a = (l) => {
      const o = (t == null ? void 0 : t(l)) ?? (e == null ? void 0 : e({ ...l, isView: !0 })) ?? String(l.text ?? "");
      return o && typeof o == "string" && l.column.ellipsis ? _("span", { title: o }, o) : o;
    };
    return (l) => _(a, { ...n, ...l, current: l.record });
  } else
    return ({ text: a }) => String(a ?? "");
}
function ro({ buttons: e, methods: t, editButtonsSlot: n, isView: a, effectData: l }) {
  const o = Dt(ue.rowButtons || {}, e), { columnProps: r, ...i } = o, s = Mt({ config: i, methods: t, isView: a });
  if (!s)
    return;
  const p = (u) => (n == null ? void 0 : n(u, i)) || s({ key: u.record, effectData: u });
  return {
    title: () => L("actionColumn"),
    key: "action",
    fixed: "right",
    minWidth: 100,
    // width: 100,
    align: "center",
    resizable: !1,
    ...r,
    customRender: (u) => _(p, { ...l, ...u, current: u.record })
  };
}
const so = (e, t) => {
  var n, a, l;
  const o = e.indexColumn ?? ((n = ue.Table) == null ? void 0 : n.indexColumn);
  if (!o)
    return;
  const { dataPagination: r } = we("exaProvider", {}), i = {
    current: ((a = t.pagination) == null ? void 0 : a.current) || 1,
    pageSize: ((l = t.pagination) == null ? void 0 : l.pageSize) || 10
  };
  return {
    key: "INDEX",
    title: () => L("indexColumn"),
    width: 60,
    align: "center",
    customRender: ({ index: s }) => {
      var p;
      const u = t.pagination && ((p = e.apis) != null && p.query) && r ? r.value ?? i : t.pagination;
      return (((u == null ? void 0 : u.current) || 1) - 1) * ((u == null ? void 0 : u.pageSize) || 10) + s + 1;
    },
    ...Ve(o) && o
  };
}, io = oe({
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
    var i, s, p;
    const u = ((i = e.rowEditor) == null ? void 0 : i.editMode) === "inline", d = r.attrs, v = ue.Table || {}, g = /* @__PURE__ */ new WeakMap(), y = d.rowKey || v.rowKey || "id", h = (O) => {
      const P = typeof y == "function" ? y(O) : O[y];
      if (P != null)
        return P;
      const j = fe(O);
      return g.has(j) || g.set(j, et(12)), g.get(j);
    }, b = he(t, "refData"), k = (((s = e.attrs) == null ? void 0 : s.rowSelection) ?? v.rowSelection) || void 0, c = k == null ? void 0 : k.selectedRowKeys, m = He(c) ? c : $(c || []), S = $([]), {
      selectedRowKeys: A,
      onChange: M,
      getCheckboxProps: E,
      ...f
    } = k || {}, w = k && {
      attrs: {
        fixed: !0,
        ...f
      },
      onChange: (O, P, j) => {
        var te;
        if (k != null && k.preserveSelectedRowKeys) {
          const re = C(), pe = S.value.filter((Pe) => !re.has(h(Pe))), ke = new Map([...pe, ...P].map((Pe) => [h(Pe), Pe]));
          O = [.../* @__PURE__ */ new Set([...pe.map(h), ...O])], P = O.map((Pe) => ke.get(Pe)).filter(Boolean);
        }
        O.length === m.value.length && O.every((re, pe) => re === m.value[pe]) && P.length === S.value.length && P.every((re, pe) => re === S.value[pe]) || (m.value = O, S.value = P, (te = k == null ? void 0 : k.onChange) == null || te.call(k, O, P, j));
      },
      isRowSelectable: (O) => {
        var P, j;
        return u && !b.value.includes(O) ? !1 : !((j = (P = k == null ? void 0 : k.getCheckboxProps) == null ? void 0 : P.call(k, O)) != null && j.disabled);
      }
    }, x = d.childrenColumnName || v.childrenColumnName || "children", C = () => {
      const O = /* @__PURE__ */ new Map(), P = (j) => j.forEach((te) => {
        O.set(h(te), te), Array.isArray(te[x]) && P(te[x]);
      });
      return P(b.value), O;
    };
    Z(
      () => [C(), [...m.value]],
      ([O, P]) => {
        var j;
        const te = k == null ? void 0 : k.preserveSelectedRowKeys, re = te ? [...P] : P.filter((Ee) => O.has(Ee)), pe = new Map(S.value.map((Ee) => [h(Ee), Ee])), ke = re.map((Ee) => O.get(Ee) ?? (te ? pe.get(Ee) : void 0)).filter((Ee) => !!Ee);
        (re.length !== P.length || ke.length !== S.value.length || ke.some((Ee, da) => Ee !== S.value[da])) && (S.value = ke, re.length !== P.length && (m.value = re), (j = k == null ? void 0 : k.onChange) == null || j.call(k, re, ke, { type: "none" }));
      },
      { immediate: !0 }
    );
    const D = (O, P = 0, j = 1) => {
      const te = [], re = P === j;
      return O.forEach((pe) => {
        pe[x] && (te.push(h(pe)), re || te.push(...D(pe[x], P, j + 1)));
      }), te;
    }, R = $(((p = e.attrs) == null ? void 0 : p.expandedRowKeys) ?? v.expandedRowKeys ?? []), V = (O) => {
      R.value = O, r.emit("expandedRowsChange", O);
    };
    (o.defaultExpandLevel || (d.defaultExpandAllRows ?? v.defaultExpandAllRows)) && Z(
      b,
      (O, P) => {
        O.length && !(P != null && P.length) && V(D(O, Number(o.defaultExpandLevel)));
      },
      { immediate: !0 }
    );
    const K = eo({
      option: e,
      model: t,
      orgList: b,
      rowKey: h,
      listener: {
        async onSave(O, P) {
          var j;
          if ((j = e.apis) != null && j.save) {
            await e.apis.save(O), O.parentId && (R.value = [...R.value, O.parentId]), n == null || n();
            return;
          }
          P !== void 0 ? b.value.splice(P + 1, 0, O) : b.value.push(O);
        },
        async onUpdate(O, P) {
          var j;
          (j = e.apis) != null && j.update && await e.apis.update(O), Object.assign(P, O), n == null || n();
        },
        async onDelete(O) {
          var P, j;
          const te = O.map((re) => h(re));
          try {
            await ((j = (P = e.apis) == null ? void 0 : P.delete) == null ? void 0 : j.call(P, te, O));
          } catch (re) {
            return console.error(re), re;
          }
          return w && (m.value = m.value.filter((re) => !te.includes(re)), S.value = S.value.filter((re) => !te.includes(h(re)))), O.forEach((re) => {
            const pe = h(re), ke = b.value.findIndex((Pe) => Pe === re || h(Pe) === pe);
            ke !== -1 && b.value.splice(ke, 1);
          }), n == null ? void 0 : n();
        }
      },
      isView: l,
      effectData: a
    }), Y = lo({
      childrenMap: t.listData.modelsMap,
      context: K,
      option: e,
      attrs: d,
      isView: l,
      effectData: a
    }), { list: U, methods: ee, buttonMethods: J = ee, modalSlot: F } = K, N = {
      selectedRowKeys: m,
      selectedRows: S,
      setSelectedRows: (O) => {
        S.value = O, m.value = O.map((P) => h(P));
      },
      expandedRowKeys: R,
      setExpandedRowKeys: V,
      expandAll: () => {
        V(D(b.value));
      },
      add: (O) => {
        var P;
        return (P = ee.add) == null ? void 0 : P.call(ee, O);
      },
      edit: (O) => {
        var P;
        return (P = ee.edit) == null ? void 0 : P.call(ee, { ...q, ...O });
      },
      delete: () => {
        var O;
        return (O = ee.delete) == null ? void 0 : O.call(ee, q);
      },
      detail: (O) => {
        var P;
        return (P = ee.detail) == null ? void 0 : P.call(ee, { ...q, ...O });
      }
    }, I = H({ ...N }), B = $();
    Z(
      B,
      (O) => {
        Object.assign(I, O, N), r.emit("register", I);
      },
      { flush: "sync" }
    );
    const q = H({
      ...a,
      selectedRows: S,
      selectedRowKeys: m,
      tableRef: I
    }), Q = { ...r.slots }, le = e.buttons, me = (le == null ? void 0 : le.targetSlot) ?? "extra";
    if (le) {
      const O = Q[me], P = Mt({
        config: le,
        effectData: q,
        methods: J,
        isView: l
      });
      (O || P) && (Q[me] = () => [O == null ? void 0 : O(), P == null ? void 0 : P()]);
    }
    const ce = e.title || e.label, { title: de = ce, extra: se, ...Fe } = Q, T = (de || se) && (() => X("row")(
      { align: "middle", class: "sup-titlebar" },
      {
        default: () => [
          de && X("col")(
            // 显式使用内容宽度，避免 Element Plus 的默认 24 栅格将按钮挤到下一行。
            { class: "sup-title", flex: "0 1 auto" },
            {
              default: rt({ labelSlot: de, tooltip: e.tooltip }, a)
            }
          ),
          se && X("col")(
            {
              class: "sup-title-buttons",
              flex: 1,
              style: { textAlign: (le == null ? void 0 : le.align) || "right" }
            },
            { default: se }
          )
        ]
      }
    ));
    Fe.headerCell = (O) => {
      var P;
      return ((P = Q.headerCell) == null ? void 0 : P.call(Q, O)) || ie(O.title, a);
    };
    const G = () => {
      const { rowSelection: O, expandedRowKeys: P, ...j } = d;
      return [
        ...F.map((te) => te()),
        (K.wrapTable || ((te) => te()))(
          () => X("table")(
            {
              tableLayout: "fixed",
              pagination: !1,
              ...ue.Table,
              ref: B,
              data: U.value,
              columns: H(Y),
              ...j,
              selection: w && {
                ...w,
                selectedKeys: m.value
              },
              rowKey: h,
              expandedKeys: R.value,
              onExpandedChange: V,
              class: ["sup-table-wrapper", e.editable && "sup-table-editable"]
            },
            Fe
          )
        )
      ];
    };
    return e.tabs ? () => _(to, { ...e.tabs, effectData: a }, {
      [me]: Q[me],
      title: de && (() => ie(de, a)),
      extra: se,
      titleBar: T,
      default: G
    }) : () => [T == null ? void 0 : T(), G()];
  }
}), uo = /* @__PURE__ */ oe({
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
    const l = e.option.title || e.option.label, o = [...e.model.children].map(([i, s], p) => {
      const u = Oe({
        parent: e.effectData,
        current: he(e.model, "parent"),
        field: s.refName,
        value: s.refData
      }), {
        hidden: d,
        attrs: {
          disabled: v,
          ...g
        }
      } = De({
        option: i,
        effectData: u
      }), {
        key: y,
        field: h
      } = i;
      return {
        attrs: H(g),
        option: i,
        effectData: u,
        model: s,
        header: () => [ie(i.icon, u), ie(i.label, u)],
        key: y || h || String(p),
        hidden: d,
        disabled: v
      };
    }), r = $(e.option.activeKey || ((a = o[0]) == null ? void 0 : a.key));
    return () => X("collapse")({
      attrs: t,
      slots: n,
      content: n.default,
      title: n.title || (l ? () => ie(l, e.effectData) : void 0),
      activeKeys: r.value,
      onActiveChange: (i) => {
        r.value = i;
      },
      items: o.filter(({
        hidden: i
      }) => !i.value).map(({
        attrs: i,
        option: s,
        disabled: p,
        model: u,
        header: d,
        effectData: v,
        key: g
      }) => ({
        key: g,
        attrs: i,
        title: d,
        disabled: ae(p),
        extra: !e.isView && s.buttons ? () => _(je, {
          option: s.buttons,
          effectData: v
        }) : void 0,
        content: () => e.isView ? _(qe, {
          option: s,
          modelsMap: u.children,
          effectData: v
        }) : _(ze, {
          option: s,
          model: u,
          effectData: v
        })
      }))
    });
  }
}), co = /* @__PURE__ */ oe({
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
    }, o = () => X("preview")({
      images: a.images,
      visible: a.visible,
      current: a.current,
      width: a.width,
      height: a.height,
      "onUpdate:visible": l
    });
    return (r, i) => (Ie(), Je(o));
  }
});
function fo(e) {
  const t = $(!1), n = H({
    visible: t,
    images: [],
    "onUpdate:value": (s) => t.value = s,
    ...e
  }), a = $(!1), l = () => !a.value && _(co, n), o = Bt();
  $t(() => {
    a.value = !0;
  });
  let r;
  return { open: (s) => {
    if (typeof s == "string")
      n.images = [s];
    else if (Array.isArray(s))
      n.images = [...s];
    else {
      const { src: p, ...u } = s || {};
      p && (n.images = [p]), Object.assign(n, u);
    }
    if (!r) {
      const p = document.createElement("div");
      r = kn(l, { appContext: o == null ? void 0 : o.appContext }), r.appContext = o == null ? void 0 : o.appContext, dt(r, p);
    }
    Ae(() => t.value = !0);
  } };
}
function po(e, t) {
  return new Promise((n, a) => {
    const l = new FileReader();
    t === "text" ? l.readAsText(e) : l.readAsDataURL(e), l.onload = () => n({ result: l.result, file: e }), l.onerror = (o) => a(o);
  });
}
function vo(e, t, n) {
  const a = typeof n < "u" ? [n, e] : [e], l = new Blob(a, { type: "application/octet-stream" }), o = window.URL.createObjectURL(l), r = document.createElement("a");
  r.style.display = "none", r.href = o, r.setAttribute("download", t), typeof r.download > "u" && r.setAttribute("target", "_blank"), document.body.appendChild(r), r.click(), document.body.removeChild(r), window.URL.revokeObjectURL(o);
}
function mo(e, t) {
  var n, a;
  const l = ((n = e.name) == null ? void 0 : n.toLowerCase()) || "", o = ((a = e.type) == null ? void 0 : a.toLowerCase()) || "";
  return t.split(",").some((r) => {
    const i = r.trim().toLowerCase();
    return i ? i.startsWith(".") ? l.endsWith(i) : i.endsWith("/*") ? o.startsWith(i.slice(0, -1)) : o === i : !1;
  });
}
function bo(e) {
  const { mode: t, valueKey: n, infoNames: a, maxCount: l, accept: o, minSize: r, maxSize: i, repeatable: s } = e, p = {
    ...n && { [n]: n },
    uid: "uid",
    status: "status",
    url: "url",
    name: "name",
    ...a
  };
  t === "custom" && (p.file = "file");
  const u = /* @__PURE__ */ new Map(), d = /* @__PURE__ */ new Map(), v = /* @__PURE__ */ new Map();
  return {
    clearTask: (M) => {
      u.delete(M), d.delete(M);
    },
    convertInfo: (M) => {
      const E = { status: "done", ...M };
      return Object.entries(p).forEach(([f, w]) => {
        w && w !== f && w in E && (E[f] = E[w], delete E[w]);
      }), E;
    },
    getValue: (M, E) => {
      if (E) {
        const f = M[0];
        return n ? (f == null ? void 0 : f[n]) ?? (f == null ? void 0 : f[p.uid]) : f;
      }
      return n ? M.map((f) => f[n] ?? f[p.uid]) : M;
    },
    hasPendingWork: (M) => v.size > 0 || t === "auto" && M.some((E) => E.status === "uploading") || (t === "base64" || t === "text") && M.some((E) => E.status !== "done") || t === "submit" && M.some((E) => E.status !== "done"),
    queueDelete: (M, E) => v.set(M, E),
    reconvert: (M) => {
      const E = {};
      return Object.entries(p).forEach(([f, w]) => {
        const x = M[f];
        w && x !== void 0 && (E[w] = x);
      }), E;
    },
    registerRequest: (M, E) => {
      if (t === "auto" || t === "base64" || t === "text") {
        const f = E();
        return u.set(M, f), f.catch(() => {
        }), f;
      }
      t === "submit" && d.set(M, E);
    },
    submit: async (M) => {
      let E = Promise.resolve();
      if (t === "auto" || t === "base64" || t === "text") {
        const x = M.find((C) => C.status === "error");
        if (x)
          throw x.error || x.response || { message: L("fileProcessFailed") };
        E = Promise.all(u.values());
      } else if (t === "submit") {
        const x = M.filter((C) => C.status !== "done").map((C) => {
          var D;
          return C.status = "uploading", (D = d.get(C.uid)) == null ? void 0 : D();
        }).filter(Boolean);
        E = Promise.all(x);
      }
      const f = await E, w = [...v.values()];
      return v.clear(), await Promise.all(w.map(async (x) => {
        try {
          await x();
        } catch (C) {
          console.error(C);
        }
      })), f;
    },
    validate: (M, E, f) => {
      if (l > 1 && f.length + E.indexOf(M) >= l)
        return L("fileCount", { maxCount: l });
      if (o && !mo(M, o))
        return L("fileType");
      if (r || i) {
        const w = (M.size || 0) / 1024 / 1024;
        if (r && r > w)
          return L("fileMinSize", { minSize: r });
        if (i && i < w)
          return L("fileMaxSize", { maxSize: i });
      }
      if (!s) {
        const w = f.find((x) => x.name === M.name);
        if (w)
          return L("fileDuplicate", { name: w.name });
      }
    }
  };
}
const ho = /* @__PURE__ */ new Set(["png", "jpg", "jpeg", "gif", "webp", "svg", "tif", "tiff"]);
function go(e) {
  var t, n, a, l, o;
  if (e.thumbUrl)
    return !0;
  if (e.url || e.file) {
    const r = (n = (t = e.name || e.url) == null ? void 0 : t.split(/[?#]/)[0].match(/\.([^.\/\\]+)$/)) == null ? void 0 : n[1].toLowerCase();
    if (r && ho.has(r))
      return !0;
    {
      const i = e.type || ((a = e.file) == null ? void 0 : a.type) || ((o = (l = e.url) == null ? void 0 : l.match(/^data:(\S*?);/)) == null ? void 0 : o[1]);
      return i == null ? void 0 : i.startsWith("image");
    }
  }
}
function mn(e, t) {
  const n = Ce("services").info({
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
  return { setError: (l, o) => {
    n.update({
      icon: () => Ge("error"),
      okButtonProps: {
        loading: !1
      },
      type: "error",
      title: l,
      content: o == null ? void 0 : o.message
    });
  }, ...n };
}
let yo = 0;
const wo = oe({
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
      infoNames: i,
      repeatable: s,
      onPreview: p,
      onDownload: u,
      isImage: d = go,
      hideOnMax: v,
      valueKey: g
    } = e, y = (l ? 1 : e.maxCount) || 1 / 0, { accept: h } = t.attrs, b = bo({
      mode: n,
      valueKey: g,
      infoNames: i,
      maxCount: y,
      accept: h,
      minSize: o,
      maxSize: r,
      repeatable: s
    }), k = fo(), { convertInfo: c, reconvert: m } = b, { onSubmit: S } = we("exaProvider", {}), A = $([]), M = /* @__PURE__ */ new Set();
    let E = !1;
    Xt(() => {
      E = !0, M.forEach((T) => URL.revokeObjectURL(T));
    }), Z(A, (T, G) => {
      const O = new Set(T.map((j) => j.uid));
      G.forEach((j) => {
        O.has(j.uid) || b.clearTask(j.uid);
      });
      const P = new Set(T.map((j) => j.objectUrl));
      M.forEach((j) => {
        P.has(j) || (URL.revokeObjectURL(j), M.delete(j));
      });
    });
    const f = Te([]), w = Te(), x = (T) => {
      f.value = T.map(m), e.isView || (t.emit("update:fileList", f.value), C()), A.value = T;
    }, C = () => {
      w.value = b.getValue(fe(f.value), !!e.isSingle), t.emit("update:value", w.value);
    };
    Z(
      () => fe(e.value),
      (T) => {
        if (T !== w.value)
          if (w.value = T, !T)
            A.value = [];
          else {
            const G = ga(T) ? T : [T];
            f.value = g ? G.map((O) => ({ [g]: O })) : G, A.value = f.value.map(c);
          }
      },
      { immediate: !0, flush: "sync" }
    ), Z(
      () => fe(e.fileList),
      (T) => {
        if (T && T !== f.value) {
          const G = T.map(c);
          x(G);
        }
      },
      { immediate: !0 }
    );
    const D = $(!1), R = S == null ? void 0 : S(async () => {
      if (await V, D.value = b.hasPendingWork(A.value), D.value) {
        const T = mn(() => L("uploadSync"));
        return b.submit(A.value).then((G) => (T.destroy(), G)).catch((G) => {
          throw D.value = !1, T.setError(() => L("uploadFailed"), G), G;
        }).finally(() => D.value = !1);
      }
      return b.submit(A.value);
    });
    R && Xt(R);
    let V = Promise.resolve();
    const z = (T) => {
      const G = V.then(async () => {
        var O, P;
        if (E || e.isView || e.disabled || await ((O = e.beforeSelect) == null ? void 0 : O.call(e, T)) === !1 || E || e.isView || e.disabled)
          return;
        const j = {
          uid: `upload-${Date.now()}-${++yo}`,
          file: T,
          name: T.name,
          type: T.type,
          size: T.size,
          status: n === "auto" || n === "base64" || n === "text" ? "uploading" : "waiting"
        }, te = b.validate(j, [j], A.value);
        if (te) {
          Ce("services").message("error", te);
          return;
        }
        d(j) && (j.objectUrl = URL.createObjectURL(T), M.add(j.objectUrl)), (y === 1 ? A.value : []).forEach((pe) => {
          if (b.clearTask(pe.uid), pe.status === "done" && a.delete) {
            const ke = m(pe);
            b.queueDelete(ke, () => a.delete(ke));
          }
        }), x(y === 1 ? [j] : [...A.value, j]), n === "base64" || n === "text" ? b.registerRequest(j.uid, () => po(T, n).then(
          ({ result: pe }) => Y({ url: pe }, j),
          (pe) => K(pe, j)
        )) : n !== "custom" && b.registerRequest(j.uid, () => U(j)), (P = e.onChange) == null || P.call(e, { file: j, fileList: [...A.value] });
      }).catch((O) => {
        Ce("services").message("error", (O == null ? void 0 : O.message) || L("selectFailed"));
      });
      return V = G, G;
    }, K = (T, G) => {
      var O;
      const P = A.value.find((j) => j.uid === G.uid);
      if (!(E || !P))
        return Object.assign(P, { error: T, status: "error" }), x([...A.value]), (O = e.onChange) == null || O.call(e, { file: P, fileList: [...A.value] }), Promise.reject(T);
    }, Y = (T, G) => {
      var O;
      const P = A.value.find((j) => j.uid === G.uid);
      if (!(E || !P))
        return Object.assign(P, c(T), { status: "done" }), x([...A.value]), (O = e.onChange) == null || O.call(e, { file: P, fileList: [...A.value] }), T;
    }, U = (T) => {
      if (!a.upload)
        return Promise.resolve().then(() => K(Error("Api config error"), T));
      const G = new FormData();
      G.append(t.attrs.name || "file", T.file);
      const O = (P) => {
        P.total > 0 && (P.percent = P.loaded / P.total * 100);
        const j = A.value.find((te) => te.uid === T.uid);
        !E && j && (j.percent = P.percent);
      };
      return Promise.resolve().then(() => a.upload(G, { onUploadProgress: O })).then(
        (P) => Y(P, T),
        (P) => K(P, T)
      );
    }, ee = async (T) => {
      var G;
      if (e.isView || e.disabled)
        return !1;
      let O = await ((G = e.beforeRemove) == null ? void 0 : G.call(e, T));
      return O !== !1 && a.delete && T.status === "done" ? new Promise((P) => {
        const j = Ce("services").confirm({
          title: () => L("deleteFileConfirm"),
          closable: !1,
          maskClosable: !1,
          ...ue.Modal,
          onOk() {
            const te = m(T), re = () => a.delete(te);
            if (n === "submit")
              b.queueDelete(te, re), P(!0);
            else
              return j.update({
                okCancel: !1,
                title: () => L("deletingFile")
              }), re().then(P, () => (j.update({
                okCancel: !1,
                title: () => L("deleteFileFailed"),
                type: "error",
                onOk: void 0
              }), P(!1), Promise.reject()));
          },
          onCancel() {
            P(!1);
          }
        });
      }) : O;
    }, J = /* @__PURE__ */ new Set(), F = async (T) => {
      var G;
      if (!(e.isView || e.disabled || !e.removable || J.has(T.uid))) {
        J.add(T.uid);
        try {
          if (await ee(T) === !1 || E)
            return;
          b.clearTask(T.uid), x(A.value.filter((O) => O.uid !== T.uid)), (G = e.onChange) == null || G.call(e, { file: T, fileList: [...A.value] });
        } catch (O) {
          Ce("services").message("error", (O == null ? void 0 : O.message) || L("deleteFileFailed"));
        } finally {
          J.delete(T.uid);
        }
      }
    }, N = $(!1), I = W(() => e.downloadable ?? !!(u || a.download)), B = (T) => {
      if (I.value) {
        if (u)
          return u(T);
        if (a.download && !N.value) {
          N.value = !0;
          const G = mn(() => L("downloadingFile"));
          return Promise.resolve().then(() => a.download(m(T))).then((O) => vo(O, T.name)).then(() => G.destroy()).catch((O) => {
            G.setError(() => L("downloadFileFailed"), O);
          }).finally(() => N.value = !1);
        }
      }
    }, q = async (T) => {
      if (e.previewable)
        if (p) {
          const G = await p(m(T));
          G && k.open(G);
        } else if (d(T)) {
          let G = -1;
          const O = A.value.filter((P) => d(P)).map((P, j) => {
            P.uid === T.uid && (G = j);
            const te = P.url || P.thumbUrl;
            return !te && !P.objectUrl && P.file && (P.objectUrl = window.URL.createObjectURL(P.file), M.add(P.objectUrl)), te || P.objectUrl;
          });
          O[G] ? k.open({ images: O, current: G }) : B(T);
        } else
          B(T);
    }, Q = e.title, le = () => typeof e.title == "string" ? e.title : L("upload"), me = H({ ...fe(e.effectData), fileList: A }), ce = lt(Q) && (() => Q(me)), de = W(() => {
      const T = [];
      return h && T.push(L("fileFormats", { accept: h })), r && T.push(L("fileSizeTip", { maxSize: r })), e.tip ?? T.join(", ");
    }), se = W(() => e.disabled || e.isView), Fe = W(() => v && y && A.value.length >= y);
    return () => X("upload")({
      attrs: t.attrs,
      files: A.value,
      readonly: se.value,
      showList: e.showList,
      removable: e.removable && !se.value,
      downloadable: I.value,
      previewable: e.previewable,
      hideTrigger: se.value || !!Fe.value,
      title: () => ce ? ce() : le(),
      tip: de.value,
      select: z,
      remove: F,
      preview: q,
      download: B,
      isImage: (T) => !!d(T)
    }, {
      ...t.slots,
      ...t.slots.default && { default: () => {
        var T, G;
        return (G = (T = t.slots).default) == null ? void 0 : G.call(T, me);
      } }
    });
  }
}), So = { class: "sup-tag-input-group" }, Co = {
  key: 0,
  class: "sup-tag-input-editor"
}, xo = /* @__PURE__ */ oe({
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
    const n = e, a = t, l = $(), o = $(""), r = $(!1), i = W(() => qn("Input")), s = () => {
      const c = i.value, m = {
        type: "Input",
        option: n.option,
        model: n.model,
        effectData: n.effectData,
        state: {},
        binding: { value: o.value, "onUpdate:value": (A) => o.value = A }
      }, S = c.getAttrs(
        {
          ref: (A) => l.value = A,
          class: "sup-tag-input",
          size: "small",
          onBlur: k,
          onKeydown: b
        },
        n.option,
        m.state
      );
      return c.render({ ...m, attrs: S, slots: {} });
    }, p = (c, m) => typeof n.closable == "function" ? n.closable(c, m) : n.closable, u = W(() => n.value ? typeof n.value == "string" ? n.value.split(",") : n.value : []), d = () => {
      r.value = !0, Ae(() => {
        l.value.focus();
      });
    }, v = (c) => {
      const m = u.value.filter((S) => S !== c);
      h(m);
    }, g = ({ tag: c, index: m }) => {
      const S = X("tag")(
        {
          removable: p(c, m),
          onRemove: () => v(c)
        },
        { default: () => c.length > 20 ? `${c.slice(0, 20)}...` : c }
      );
      return c.length > 20 ? X("tooltip")({ title: c }, { default: () => S }) : S;
    }, y = () => X("button")(
      { size: "small", "aria-label": L("addTag"), onClick: d, class: "sup-tag-add" },
      { default: () => [Ge("add"), ie(n.newLabel, n.effectData)] }
    ), h = (c) => {
      n.stringifyValue ? a("update:value", c.join(",")) : a("update:value", c);
    }, b = (c) => {
      c.key !== "Enter" || c.isComposing || c.keyCode === 229 || (c.preventDefault(), c.stopPropagation(), k());
    }, k = () => {
      o.value && u.value.indexOf(o.value) === -1 && h([...u.value, o.value]), r.value = !1, o.value = "";
    };
    return (c, m) => (Ie(), St("div", So, [
      (Ie(!0), St(pa, null, va(u.value, (S, A) => (Ie(), Je(st(g), {
        key: S,
        tag: S,
        index: A
      }, null, 8, ["tag", "index"]))), 128)),
      r.value ? (Ie(), St("span", Co, [
        (Ie(), Je(st(s)))
      ])) : (Ie(), Je(st(y), { key: 1 }))
    ]));
  }
}), ko = {
  key: 1,
  class: "sup-tag-select-empty"
}, _o = /* @__PURE__ */ oe({
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
    const n = e, a = t, { optionsRef: l } = At(n.option.options, n.effectData), o = W(() => n.option.options === void 0 ? n.options ?? [] : l.value), r = W(() => {
      const { value: u } = n, d = n.stringifyValue;
      return u === void 0 ? [] : d ? u.split(",") : Array.isArray(u) ? u : [u];
    }), i = (u, d) => {
      const v = n.multiple ? d ? [...r.value, u] : r.value.filter((g) => g !== u) : [u];
      a("check", u, d), p(v), a("change", u, v);
    }, s = () => X("checkableTagGroup")({
      options: o.value,
      selected: r.value,
      multiple: n.multiple,
      onSelectedChange: i
    }), p = (u) => {
      n.multiple ? n.stringifyValue ? a("update:value", u.join(",")) : a("update:value", u) : a("update:value", u[0]);
    };
    return (u, d) => o.value.length ? (Ie(), Je(st(s), { key: 0 })) : (Ie(), St("div", ko, ma(e.placeholder), 1));
  }
}), ea = {
  Form: Qn,
  Group: Tt,
  Card: Hl,
  CardList: Rt,
  TabList: Rt,
  CollapseList: Rt,
  GroupList: Gl,
  Tabs: Yl,
  Table: io,
  Collapse: uo,
  Descriptions: Tt,
  Fragment: Tt
}, Ao = {
  InputGroup: ql,
  InputList: Kl,
  Upload: wo,
  TagInput: xo,
  TagSelect: _o
}, at = Object.keys(ea), Mo = {
  ...ea,
  ...Ao
}, gt = {}, Ot = {}, kt = /* @__PURE__ */ new Set();
function ta(e) {
  return typeof e == "object" && e && "component" in e ? e : { component: e };
}
function na(e, t, n, a = []) {
  const l = /* @__PURE__ */ new Set([...jn, ...a]);
  Object.entries(t).forEach(([o, r]) => {
    if (r) {
      if (l.has(o))
        throw new Error(`Schema 类型 '${o}' 为 Core 保留类型，不能注册为 ${n} 组件`);
      e[o] = { ...ta(r), source: n };
    }
  });
}
function aa(e, t = []) {
  na(gt, e, "custom", [...kt, ...t]);
}
function Eo(e) {
  const t = new Set(e);
  for (const n of Object.keys(gt))
    if (t.has(n))
      throw new Error(`Schema 类型 '${n}' 已注册为项目组件，不能再由 UIAdapter 接管`);
  kt.clear(), t.forEach((n) => kt.add(n));
}
function gr(e, t = []) {
  const n = Object.fromEntries(
    Object.entries(e).map(([o, r]) => [o, r && ta(r).component])
  );
  Vn(n, "auto");
  const a = new Set(t), l = Object.fromEntries(
    Object.entries(e).filter(([o]) => !jn.has(o) && !a.has(o))
  );
  na(Ot, l, "auto");
}
function _t(e) {
  return gt[e] || Ot[e];
}
function Pt(e) {
  return !!_t(e);
}
function Do() {
  return [.../* @__PURE__ */ new Set([...Object.keys(gt), ...Object.keys(Ot)])];
}
function Qt(e, t = []) {
  var n, a;
  return Rn.includes(e) ? "core" : kt.has(e) || new Set(t).has(e) ? "enhanced" : ((n = gt[e]) == null ? void 0 : n.source) || ((a = Ot[e]) == null ? void 0 : a.source);
}
function la(e, t) {
  const { prop: n = "value", event: a = "update:value" } = e.model || {}, l = { ...t };
  if (n !== "value" && (l[n] = l.value, delete l.value), a !== "update:value") {
    const o = a.startsWith("on") ? a : `on${a[0].toUpperCase()}${a.slice(1)}`;
    l[o] = l["onUpdate:value"], delete l["onUpdate:value"];
  }
  return l;
}
const Me = Mo, ue = {};
let bn = !1, hn;
function Oo(e) {
  if (hn) {
    ln(e);
    return;
  }
  Eo(e.supportedFields), ln(e), hn = e, bn || (bt(ue, e.defaults || {}), bn = !0);
}
function Po(e) {
  return Oo(e), e;
}
function Io(e = {}) {
  const { defaultProps: t, ...n } = e;
  Object.assign(Se, n), Object.prototype.hasOwnProperty.call(e, "locale") && dl(e.locale), t && oa(t);
}
function To(e, t) {
  aa({ [e]: t });
}
function Ro(e) {
  aa(e);
}
function oa(e) {
  bt(ue, e);
}
const gn = {
  useAdapter: Po,
  configure: Io,
  registerComponent: To,
  registerComponents: Ro,
  setDefaultProps: oa
};
class jo extends Error {
  constructor(t, n) {
    super(t.flatMap((a) => a.messages)[0] || L("validationFailed")), this.fields = t, this.cause = n, this.name = "FormValidationError";
  }
}
const yn = Symbol.for("superform.official-product");
function Fo(e, t) {
  let n = !1;
  const a = {
    ...gn,
    initialize(l = {}) {
      const o = l.components, r = Object.keys(o || {});
      if (n) {
        if (r.length || l.overrides)
          throw new Error(`SuperForm '${e}' 已初始化，不能再追加字段组件或覆盖 UI 协议`);
        return a;
      }
      const i = $n(t(o), l.overrides);
      for (const u of r)
        if (!i.supportedFields.includes(u))
          throw new Error(`UIAdapter '${i.name}' 未声明字段 '${u}'，不能初始化对应 UI 组件`);
      const s = globalThis, p = s[yn];
      if (p && p !== e)
        throw new Error(`SuperForm 已初始化官方产品 '${String(p)}'，不能再初始化 '${e}'`);
      return gn.useAdapter(i), s[yn] = e, n = !0, a;
    }
  };
  return a;
}
const ra = {
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
}, sa = Object.keys(ra), wn = /* @__PURE__ */ new Map(), Lo = Object.fromEntries(
  sa.map((e) => {
    const t = ra[e], n = wn.get(t) ?? e;
    return wn.set(t, n), [e, n];
  })
), zo = oe({
  name: "ElementPlusInputSearchField",
  inheritAttrs: !1,
  props: Un,
  setup(e, { slots: t }) {
    const n = Bn("InputSearch"), a = (l) => {
      var o, r;
      e.attrs.disabled || e.attrs.loading || (r = (o = e.attrs).onSearch) == null || r.call(o, String(e.attrs.modelValue ?? ""), l);
    };
    return () => {
      const { enterButton: l, loading: o, onSearch: r, ref: i, ...s } = e.attrs, p = _(n, ve(s, {
        onKeydown: (u) => {
          u.key !== "Enter" || u.isComposing || u.repeat || u.defaultPrevented || (u.preventDefault(), a(u));
        }
      }), {
        ...t,
        append: t.append ?? (() => _(xe, {
          nativeType: "button",
          disabled: s.disabled,
          loading: o,
          "aria-label": "搜索",
          onClick: a
        }, { default: () => {
          var u;
          return ((u = t.enterButton) == null ? void 0 : u.call(t)) ?? (typeof l == "string" ? l : l ? "搜索" : ye.search());
        } }))
      });
      return i ? _n(p, { ref: i }, !0) : p;
    };
  }
}), No = oe({
  name: "ElementPlusTreeSelectField",
  inheritAttrs: !1,
  props: Un,
  setup(e, { slots: t }) {
    const n = Bn("TreeSelect"), a = Te();
    return e.option.labelField && Z(
      () => {
        var l, o;
        return ae((o = (l = a.value) == null ? void 0 : l.selectRef) == null ? void 0 : o.selectedLabel);
      },
      (l) => {
        var o, r;
        l !== void 0 && ((r = (o = e.binding)["onUpdate:labelValue"]) == null || r.call(o, l));
      },
      { flush: "post" }
    ), () => {
      const l = e.state.treeData === void 0 ? e.attrs : { ...e.attrs, data: e.state.treeData }, o = _(n, l, t);
      return _n(o, { ref: a }, !0);
    };
  }
}), ia = { prop: "modelValue", event: "update:modelValue" }, Vo = Kt(ia), wt = ({ placeholder: e, ...t }) => {
  const [n, a] = Array.isArray(e) ? e : [e, e];
  return {
    ...t,
    startPlaceholder: t.startPlaceholder === void 0 ? n : t.startPlaceholder,
    endPlaceholder: t.endPlaceholder === void 0 ? a : t.endPlaceholder
  };
}, Bo = bl(
  {
    TextArea: { fixedProps: { type: "textarea" } },
    InputPassword: {
      fixedProps: { type: "password" },
      defaults: { showPassword: !0 }
    },
    InputSearch: {
      render: ({ slots: e, ...t }) => _(zo, t, e)
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
      },
      defaults: {
        inlinePrompt: !0
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
      render: ({ slots: e, ...t }) => _(No, t, e)
    },
    DatePicker: {
      processors: ["picker"],
      // 原始组件允许用户选择模式；固定别名不经过这个分支。
      adaptProps: (e, t) => typeof e.type == "string" && e.type.endsWith("range") ? wt(e) : e
    },
    DateRangePicker: {
      fixedProps: { type: "daterange" },
      processors: ["range"],
      adaptProps: wt
    },
    TimePicker: {
      processors: ["picker"],
      adaptProps: (e, t) => e.isRange ? wt(e) : e
    },
    TimeRangePicker: {
      fixedProps: { isRange: !0 },
      processors: ["range"],
      adaptProps: wt
    }
  },
  ia
), $o = oe({
  props: { state: { type: Object, required: !0 } },
  setup(e) {
    return () => {
      const t = e.state;
      return _(
        Ca,
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
              (a) => _(
                xa,
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
function ua(e) {
  return _(
    An,
    ve(e.attrs || {}, {
      modelValue: e.activeKeys,
      "onUpdate:modelValue": e.onActiveChange
    }),
    {
      ...e.slots,
      default: e.content || (() => e.items.map(
        (t) => _(
          Mn,
          { ...t.attrs, key: t.key, name: t.key, disabled: t.disabled },
          {
            label: () => {
              var n;
              return [
                (n = t.title) == null ? void 0 : n.call(t),
                t.extra && _("span", { onClick: (a) => a.stopPropagation() }, [t.extra()])
              ];
            },
            default: t.content
          }
        )
      ))
    }
  );
}
const Uo = oe({
  props: { state: { type: Object, required: !0 } },
  setup(e) {
    const t = $(), n = $(0), a = $(0);
    let l;
    return Vt(() => {
      const o = t.value;
      if (!o)
        return;
      const r = () => {
        n.value = o.offsetWidth, a.value = o.offsetHeight;
      };
      r(), !(typeof ResizeObserver > "u") && (l = new ResizeObserver(r), l.observe(o));
    }), ct(() => l == null ? void 0 : l.disconnect()), () => {
      var r, i, s;
      const o = ((r = e.state.attrs) == null ? void 0 : r.tabPosition) || "top";
      return _(
        "div",
        {
          class: ["sup-tabs-with-extra", `sup-tabs-with-extra-${o}`],
          style: {
            "--sup-tabs-extra-width": `${n.value}px`,
            "--sup-tabs-extra-height": `${a.value}px`
          }
        },
        [
          ua(e.state),
          _("div", { ref: t, class: "sup-tabs-bar-extra" }, [(s = (i = e.state).extra) == null ? void 0 : s.call(i)])
        ]
      );
    };
  }
}), qo = (e) => e.extra ? _(Uo, { state: e }) : ua(e), Ko = qo, Ho = (e) => [
  e.title && _("div", { class: ["sup-titlebar", "sup-title"] }, [e.title()]),
  _(
    ka,
    ve(e.attrs || {}, {
      modelValue: e.activeKeys,
      "onUpdate:modelValue": e.onActiveChange
    }),
    {
      ...e.slots,
      default: e.content || (() => e.items.map(
        (t) => _(
          _a,
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
                t.extra && _(
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
], Wo = Ho, Go = oe({
  inheritAttrs: !1,
  props: ["data", "pagination", "tableRef"],
  setup(e, { attrs: t, slots: n }) {
    const a = { filters: {}, sorters: [] }, l = H({ current: 1, pageSize: 10, changed: !1 });
    Z([
      () => {
        var r, i, s, p, u;
        return ((i = (r = e.pagination) == null ? void 0 : r.attrs) == null ? void 0 : i.currentPage) ?? ((s = e.pagination) == null ? void 0 : s.current) ?? ((u = (p = e.pagination) == null ? void 0 : p.attrs) == null ? void 0 : u.defaultCurrentPage) ?? 1;
      },
      () => {
        var r, i, s, p, u;
        return ((i = (r = e.pagination) == null ? void 0 : r.attrs) == null ? void 0 : i.pageSize) ?? ((s = e.pagination) == null ? void 0 : s.pageSize) ?? ((u = (p = e.pagination) == null ? void 0 : p.attrs) == null ? void 0 : u.defaultPageSize) ?? 10;
      }
    ], ([r, i]) => {
      l.current = r, l.pageSize = i;
    }, { immediate: !0, flush: "sync" });
    const o = W(() => {
      const { data: r, pagination: i } = e, s = l.pageSize, p = (l.current - 1) * s;
      return i && r.length > s ? r.slice(p, p + s) : r;
    });
    return () => Xo({ ...t, data: e.data, pagination: e.pagination, ref: e.tableRef }, n, o.value, a, l);
  }
}), Yo = ({ ref: e, ...t }, n = {}) => _(Go, { ...t, tableRef: e }, n), Qo = (e, ...t) => {
  (Array.isArray(e) ? e : [e]).forEach((a) => a == null ? void 0 : a(...t));
}, Xo = (e, t, n, a, l) => {
  var J;
  const { data: o, columns: r = [], selection: i, expandedKeys: s, onExpandedChange: p, onTableChange: u, pagination: d, rowKey: v, scroll: g, ref: y, ...h } = e, b = [], k = (F) => F.forEach((N) => {
    b.push(N), N.children && k(N.children);
  });
  k(r);
  const c = (F) => {
    const N = F.dataIndex ?? F.key;
    return Array.isArray(N) ? N.join(".") : String(N ?? "");
  }, m = (F) => b.find((N) => String(N.columnKey ?? N.key) === F || c(N) === F), S = (F, N, I = d || void 0) => {
    Qo(u, {
      action: F,
      filters: Object.fromEntries(Object.entries(a.filters).map(([B, q]) => [B, [...q]])),
      sorters: a.sorters.map((B) => ({ ...B })),
      // 本地条件只保留在统一事件中，不能在后续翻页或刷新时带入远程转换。
      remoteParams: {
        filters: Object.fromEntries(Object.entries(a.filters).filter(([B]) => {
          var q;
          return typeof ((q = m(B)) == null ? void 0 : q.filterMethod) != "function";
        }).map(([B, q]) => [B, [...q]])),
        sorters: a.sorters.filter(({ field: B }) => {
          var q;
          return ((q = m(B)) == null ? void 0 : q.sortable) === "custom";
        }).map((B) => ({ ...B }))
      },
      pagination: I && { current: I.current, pageSize: I.pageSize, total: I.total },
      remote: N
    });
  }, A = (F) => typeof v == "function" ? v(F) : F[v], M = (F, N) => (Array.isArray(N) ? N : String(N).split(".")).reduce((I, B) => I == null ? void 0 : I[B], F), E = (F) => F.map((N) => {
    const { dataIndex: I, title: B, children: q, customRender: Q, key: le, ...me } = N;
    return _(
      Zt,
      {
        ...me,
        key: le ?? (Array.isArray(I) ? I.join(".") : I),
        prop: Array.isArray(I) ? I.join(".") : I,
        columnKey: String(me.columnKey ?? le ?? c(N))
      },
      q != null && q.length ? {
        header: () => {
          var ce;
          return (ce = t.headerCell) == null ? void 0 : ce.call(t, { ...N, title: B });
        },
        default: () => E(q)
      } : {
        header: () => {
          var ce;
          return (ce = t.headerCell) == null ? void 0 : ce.call(t, { ...N, title: B });
        },
        default: ({ row: ce, $index: de }) => {
          const se = (Q == null ? void 0 : Q({
            text: M(ce, I),
            record: ce,
            index: de,
            column: N
          })) ?? M(ce, I);
          return se == null ? [] : Array.isArray(se) ? se : [se];
        }
      }
    );
  });
  let f = !0;
  const w = (F) => {
    !F || !i || Ae(() => {
      var B;
      f = !0, (B = F.clearSelection) == null || B.call(F);
      const N = new Set(i.selectedKeys), I = (q) => q.forEach((Q) => {
        var le;
        N.has(A(Q)) && ((le = F.toggleRowSelection) == null || le.call(F, Q, !0)), Array.isArray(Q.children) && I(Q.children);
      });
      I(n), f = !1;
    });
  }, C = _(
    Aa,
    ve({
      ...h,
      ref: (F) => {
        w(F), typeof y == "function" ? y(F) : y && typeof y == "object" && (y.value = F);
      },
      data: n,
      rowKey: v,
      maxHeight: ((J = ae(g)) == null ? void 0 : J.y) ?? h.maxHeight,
      expandRowKeys: s,
      onSortChange: (F) => {
        var Q, le, me, ce;
        const N = (Q = a.sorters[0]) == null ? void 0 : Q.field, I = F.prop || ((le = F.column) == null ? void 0 : le.property) || N, B = m(I);
        a.sorters = F.order && I ? [{ field: I, order: F.order === "ascending" ? "asc" : "desc" }] : [];
        const q = (((me = F.column) == null ? void 0 : me.sortable) ?? (B == null ? void 0 : B.sortable)) === "custom" || N !== void 0 && N !== I && ((ce = m(N)) == null ? void 0 : ce.sortable) === "custom";
        S("sort", q);
      },
      onFilterChange: (F) => {
        let N = !1;
        Object.entries(F).forEach(([I, B]) => {
          const q = m(I), Q = c(q || { key: I });
          Array.isArray(B) && B.length ? a.filters[Q] = [...B] : delete a.filters[Q], N || (N = typeof (q == null ? void 0 : q.filterMethod) != "function");
        }), S("filter", N);
      },
      onExpandChange: (F, N) => {
        if (Array.isArray(N)) {
          p == null || p(N.map(A));
          return;
        }
        const I = new Set(s || []), B = A(F);
        N ? I.add(B) : I.delete(B), p == null || p([...I]);
      },
      onSelectionChange: (F) => {
        var Q;
        if (f || !i)
          return;
        const N = new Set(n.map(A)), I = new Set(i.selectedKeys), q = [...o.filter((le) => I.has(A(le)) && !N.has(A(le))), ...F];
        (Q = i.onChange) == null || Q.call(i, q.map(A), q, {});
      }
    }, { onSortChange: h.onSortChange, onFilterChange: h.onFilterChange }),
    {
      ...t,
      default: () => {
        var F;
        return [
          i && _(Zt, {
            type: "selection",
            fixed: ((F = i.attrs) == null ? void 0 : F.fixed) ?? !0,
            selectable: i.isRowSelectable,
            ...i.attrs
          }),
          ...E(r)
        ];
      }
    }
  );
  if (!d)
    return C;
  const {
    small: D,
    placement: R = d.placement ?? ["bottomEnd"],
    onCurrentChange: V,
    onSizeChange: z,
    onChange: K,
    ...Y
  } = d.attrs || {}, U = ve({
    // 查询结果异步返回前没有 total，Element Plus 会把分页判定为非法；本地数组模式则回退到当前数据量。
    total: d.total ?? o.length,
    pageSizes: d.pageSizeOptions,
    layout: "total, sizes, prev, pager, next, jumper",
    ...Y,
    currentPage: l.current,
    pageSize: l.pageSize,
    onCurrentChange: (F) => {
      F !== l.current && (l.current = F, l.changed = !0);
    },
    onSizeChange: (F) => {
      var N;
      F !== l.pageSize && (l.current = 1, l.pageSize = F, l.changed = !0, (N = d.onShowSizeChange) == null || N.call(d, l.current, F));
    },
    onChange: (F, N) => {
      var I;
      l.changed && (l.changed = !1, S("paginate", !0, { ...d, current: F, pageSize: N }), (I = d.onChange) == null || I.call(d, F, N));
    },
    ...D !== void 0 ? { size: D ? "small" : void 0 } : {},
    small: !1
  }, { onCurrentChange: V, onSizeChange: z, onChange: K }), ee = (F) => F && _("div", {
    class: ["sup-table-pagination", F.startsWith("top") ? "sup-table-pagination-top" : "sup-table-pagination-bottom"],
    style: { justifyContent: F.endsWith("Start") ? "flex-start" : F.endsWith("Center") ? "center" : "flex-end" }
  }, [_(Ma, U)]);
  return _("div", { class: "sup-table-adapter" }, [
    ee(R.find((F) => F.startsWith("top"))),
    C,
    ee(R.find((F) => F.startsWith("bottom")))
  ]);
}, Zo = (e, t = {}) => {
  var g;
  const { bordered: n, items: a, value: l, onValueChange: o, attrs: r = {} } = e, { tabExtra: i, cardExtra: s, ...p } = t, u = _(
    An,
    { ...r, modelValue: l, "onUpdate:modelValue": o },
    {
      default: () => a.map((y) => {
        const { tab: h, key: b, ...k } = y;
        return _(Mn, { ...k, key: b, name: b }, { label: () => h });
      })
    }
  ), v = [_("div", { class: "sup-table-tabs" }, [u, i == null ? void 0 : i()]), (g = p.default) == null ? void 0 : g.call(p)];
  return n ? _(
    En,
    {},
    {
      default: () => v,
      header: p.title || s ? () => {
        var y;
        return [(y = p.title) == null ? void 0 : y.call(p), s == null ? void 0 : s()];
      } : void 0
    }
  ) : v;
}, Jo = {
  table: ".el-table",
  header: ".el-table__header-wrapper",
  footer: ".el-table__footer-wrapper",
  pagination: ".el-pagination",
  empty: ".el-table__empty-block",
  emptyCell: ".el-table__empty-block",
  body: ".el-table__body-wrapper .el-scrollbar__wrap"
};
function ut(e) {
  var t;
  (t = e == null ? void 0 : e.stopPropagation) == null || t.call(e);
}
function er(e, t) {
  return _(
    Dn,
    {
      ...e.dropdownProps,
      disabled: e.disabled,
      onCommand: (n) => e.onSelect(n.value)
    },
    {
      default: () => t,
      dropdown: () => _(
        On,
        {},
        () => {
          var n;
          return (n = e.menu) == null ? void 0 : n.map(
            (a) => _(
              jt,
              {
                key: a.key,
                command: { value: a.value },
                disabled: e.disabled || a.disabled,
                onClick: ut
              },
              () => {
                var l;
                return [(l = a.icon) == null ? void 0 : l.call(a), a.label()];
              }
            )
          );
        }
      )
    }
  );
}
function tr(e, t) {
  var o;
  const n = {
    ...e.attrs,
    disabled: e.disabled,
    onClick: (r) => {
      if (ut(r), !e.menu)
        return e.onClick(r);
    }
  };
  let a = e.render ? e.render(n) : _(xe, n, () => {
    var r;
    return [
      !t.labelOnly && ((r = e.icon) == null ? void 0 : r.call(e)),
      (!t.iconOnly || !e.icon) && e.label(),
      e.menu && ye.expand()
    ];
  });
  e.menu && (a = er(e, a));
  const l = (o = e.tooltip) == null ? void 0 : o.call(e);
  return _(
    In,
    { disabled: !l },
    {
      content: () => l,
      default: () => a
    }
  );
}
function nr(e) {
  const { buttons: t, moreButtons: n, groupProps: a, defaultButtonProps: l } = e, o = e.divider ?? ((a == null ? void 0 : a.direction) !== "vertical" && (!!(l != null && l.link) || (l == null ? void 0 : l.text) === !0)), r = t.flatMap((i, s) => [
    _("span", { key: i.key, style: { display: "flex" } }, [tr(i, e)]),
    o && s < t.length - 1 ? _(Ea, { direction: "vertical" }) : void 0
  ]);
  return n.length && r.push(
    _(
      Dn,
      {
        onCommand: (i) => i.selected ? i.button.onSelect(i.value) : i.button.onClick()
      },
      {
        default: () => _(xe, { ...l, onClick: ut }, e.moreLabel),
        // Element Plus 的 DropdownMenu 只接收 DropdownItem；折叠动作的菜单选项直接列为条目。
        dropdown: () => _(
          On,
          {},
          () => n.flatMap(
            (i) => i.menu ? i.menu.map(
              (s) => _(
                jt,
                {
                  key: `${i.key}:${s.key}`,
                  command: { button: i, value: s.value, selected: !0 },
                  disabled: i.disabled || s.disabled,
                  onClick: ut
                },
                () => {
                  var p;
                  return [i.label(), " / ", (p = s.icon) == null ? void 0 : p.call(s), s.label()];
                }
              )
            ) : [
              _(
                jt,
                {
                  key: i.key,
                  command: { button: i, selected: !1 },
                  disabled: i.disabled,
                  onClick: ut
                },
                () => {
                  var s;
                  return [(s = i.icon) == null ? void 0 : s.call(i), i.label()];
                }
              )
            ]
          )
        )
      }
    )
  ), _(
    Pn,
    { ...a, size: o ? 0 : a == null ? void 0 : a.size, class: ["sup-buttons", a == null ? void 0 : a.class] },
    () => r
  );
}
const ar = oe({
  inheritAttrs: !1,
  props: {
    state: { type: Object, required: !0 }
  },
  setup(e, { slots: t }) {
    const n = Da("upload"), a = $(0), l = /* @__PURE__ */ new Map();
    let o = 0;
    return () => {
      const r = e.state;
      a.value;
      const i = new Set(r.files.map((d) => d.uid));
      l.forEach((d, v) => {
        i.has(v) || l.delete(v);
      });
      const s = r.files.map((d) => (l.has(d.uid) || l.set(d.uid, ++o), {
        name: d.name,
        uid: l.get(d.uid),
        url: d.url || d.thumbUrl || d.objectUrl,
        size: d.size,
        percentage: d.percent ?? 0,
        status: d.status === "waiting" ? "ready" : d.status === "error" ? "fail" : d.status === "uploading" ? "uploading" : "success"
      })), p = (d) => r.files.find((v) => l.get(v.uid) === d.uid), u = r.attrs.listType === "picture-card";
      return _("div", { class: "sup-upload" }, [
        _(Oa, {
          ...r.attrs,
          class: [r.attrs.class, {
            "sup-upload-hide-trigger": r.hideTrigger,
            "sup-upload-no-remove": !r.removable || r.readonly,
            "sup-upload-no-preview": !r.previewable
          }],
          disabled: r.readonly,
          fileList: s,
          showFileList: r.showList,
          limit: void 0,
          autoUpload: !1,
          beforeUpload: () => !1,
          // 不接管原生请求生命周期，避免失败时原生组件移除 Core 文件。
          httpRequest: async () => {
          },
          onChange: async (d) => {
            var v;
            if (!(!d.raw || p(d)))
              try {
                await r.select(d.raw);
              } finally {
                (v = d.url) != null && v.startsWith("blob:") && URL.revokeObjectURL(d.url), a.value++;
              }
          },
          beforeRemove: async (d) => {
            const v = p(d);
            return v && await r.remove(v), !1;
          },
          onPreview: (d) => {
            const v = p(d);
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
            var d;
            return r.hideTrigger ? null : ((d = t.default) == null ? void 0 : d.call(t)) ?? (u ? _("div", [ye.add(), r.title()]) : _(xe, {}, { default: () => [ye.upload(), r.title()] }));
          },
          // ElUpload 没有下载配置；只在需要扩展操作时使用官方文件插槽。
          ...(t.file || r.downloadable) && {
            file: ({ file: d }) => {
              const v = p(d);
              return v ? t.file ? t.file({ file: v }) : [
                r.attrs.listType !== "text" && r.attrs.listType && r.isImage(v) && d.url ? _("img", { class: n.be("list", "item-thumbnail"), src: d.url, alt: v.name }) : null,
                _("div", { class: n.be("list", "item-info") }, [
                  _(xe, { link: !0, disabled: !r.previewable, onClick: () => r.preview(v) }, { default: () => v.name }),
                  v.status === "waiting" && _("span", {}, " " + L("uploadWaiting")),
                  v.status === "error" && _("span", { role: "status" }, " " + L("uploadError")),
                  v.status === "uploading" && _(Pa, { percentage: v.percent ?? 0, strokeWidth: 2 })
                ]),
                _("span", { class: u ? n.be("list", "item-actions") : "sup-upload-actions" }, [
                  u && r.previewable && _(xe, { link: !0, onClick: () => r.preview(v) }, { default: () => L("preview") }),
                  _(xe, { link: !0, onClick: () => r.download(v) }, { default: () => L("download") }),
                  r.removable && !r.readonly && _(xe, { link: !0, onClick: () => r.remove(v) }, { default: () => L("delete") })
                ])
              ] : null;
            }
          },
          tip: () => {
            var d;
            return ((d = t.tip) == null ? void 0 : d.call(t)) ?? (!r.hideTrigger && r.tip && _("div", { class: "sup-upload-tip" }, r.tip));
          }
        }),
        r.readonly && r.showList && !r.files.length && _("div", { class: "sup-upload-tip" }, L("uploadEmpty"))
      ]);
    };
  }
}), lr = (e, t = {}) => _(ar, { state: e }, t);
async function Sn(e, t) {
  try {
    t ? await e.validateField(t.map((n) => n.join("."))) : await e.validate();
  } catch (n) {
    if (!n || typeof n != "object" || n instanceof Error)
      throw n;
    const a = Object.entries(n);
    throw !a.length || !a.every(([, l]) => Array.isArray(l)) ? n : new jo(
      a.map(([l, o]) => ({
        path: (t == null ? void 0 : t.find((r) => r.join(".") === l)) || l.split("."),
        messages: o.flatMap((r) => r.message ? [r.message] : [])
      })),
      n
    );
  }
}
const or = {
  form: {
    service: {
      validate: Sn,
      validateField: (e, t) => Sn(e, [t]),
      clearValidate: (e) => e.clearValidate()
    },
    component: Ia,
    adaptProps: ({ hideRequiredMark: e, validateTrigger: t, ...n }) => e ? { ...n, hideRequiredAsterisk: !0 } : n
  },
  formItem: {
    defaults: { validateEvent: !0 },
    component: Ta,
    adaptProps: ({ name: e, ...t }) => ({ ...t, prop: e == null ? void 0 : e.map(String) })
  },
  row: {
    component: Ra,
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
    component: ja,
    // ElCol 的默认 span 为 24；auto 显式传 null 才不会生成 el-col-24。
    adaptProps: ({ span: e, flex: t, ...n }) => ve(n, { span: e === "auto" || t !== void 0 ? null : e, style: { flex: t ?? (e === "auto" ? "1 1 0" : void 0) } })
  },
  space: { component: Pn },
  card: {
    render: ({ state: e }) => {
      var t;
      return _(En, e.attrs, {
        ...e.slots,
        header: e.title || e.extra ? () => {
          var n;
          return _(
            "div",
            {
              class: "sup-titlebar",
              style: { display: "flex", alignItems: "center", justifyContent: "space-between" }
            },
            [e.title && _("div", { class: "sup-title" }, [e.title()]), (n = e.extra) == null ? void 0 : n.call(e)]
          );
        } : (t = e.slots) == null ? void 0 : t.header,
        default: e.content
      });
    }
  },
  tabs: { render: ({ state: e }) => Ko(e) },
  collapse: { render: ({ state: e }) => Wo(e) },
  descriptions: { render: ({ state: e }) => _($o, { state: e }) },
  actionGroup: {
    schemaDefaults: {
      rowButtons: { buttonProps: { link: !0 } },
      ButtonActions: {
        save: { attrs: { type: "primary" } },
        expand: { attrs: { link: !0 } },
        add: { attrs: { type: "primary" } },
        delete: { attrs: { type: "danger" } },
        submit: { attrs: { type: "primary" } },
        search: { attrs: { type: "primary" } }
      }
    },
    render: ({ attrs: e }) => nr(e)
  },
  tooltip: {
    component: In,
    adaptProps: ({ title: e, ...t }) => ({ ...t, content: e }),
    defaults: { placement: "top" }
  },
  button: { component: xe },
  tag: {
    adaptProps: ({ removable: e, onRemove: t, ...n }) => ({ ...n, closable: e, onClose: t }),
    render: ({ attrs: e, slots: t }) => _(Fa, e, { ...t, default: () => {
      var n, a;
      return [(n = t.icon) == null ? void 0 : n.call(t), (a = t.default) == null ? void 0 : a.call(t)];
    } })
  },
  checkableTag: {
    component: Jt,
    adaptProps: ({ selected: e, onSelectedChange: t, ...n }) => ({
      ...n,
      checked: e,
      onChange: t
    })
  },
  checkableTagGroup: {
    render: ({ attrs: { options: e, selected: t, onSelectedChange: n } }) => _(
      "div",
      { class: "sup-tag-select-group" },
      e.map(
        ({ label: a, value: l, disabled: o }) => _(
          Jt,
          {
            key: l,
            class: "tag-select",
            checked: t.includes(l),
            disabled: o,
            onChange: (r) => n(l, r)
          },
          { default: () => a }
        )
      )
    )
  },
  empty: { component: La },
  modal: {
    render: ({ attrs: e, slots: t }) => {
      const {
        visible: n,
        "onUpdate:visible": a,
        afterClose: l,
        footer: o,
        maskClosable: r,
        keyboard: i,
        closable: s,
        centered: p,
        ...u
      } = e, { title: d, footer: v, ...g } = t, y = () => [
        _(
          xe,
          {
            onClick: async () => {
              var b;
              await ((b = e.onCancel) == null ? void 0 : b.call(e)) !== !1 && (a == null || a(!1));
            }
          },
          () => e.cancelText ?? L("cancel")
        ),
        _(
          xe,
          {
            type: "primary",
            loading: e.confirmLoading,
            onClick: () => {
              var h;
              return (h = e.onOk) == null ? void 0 : h.call(e);
            }
          },
          () => e.okText ?? L("confirm")
        )
      ];
      return _(
        Tn,
        {
          ...u,
          closeOnClickModal: r ?? u.closeOnClickModal,
          closeOnPressEscape: i ?? u.closeOnPressEscape,
          showClose: s ?? u.showClose,
          alignCenter: p ?? u.alignCenter,
          // 关闭图标、遮罩和 Escape 与底部取消按钮使用同一业务拦截。
          beforeClose: u.beforeClose || (async (h) => {
            var b;
            await ((b = e.onCancel) == null ? void 0 : b.call(e)) !== !1 && h();
          }),
          modelValue: n,
          "onUpdate:modelValue": a,
          onClosed: l
        },
        {
          ...g,
          ...d ? { header: d } : {},
          ...o === null ? {} : { footer: v || y }
        }
      );
    }
  },
  upload: { render: ({ state: e, slots: t }) => lr(e, t) },
  preview: {
    render: ({ attrs: e }) => e.visible ? _(za, {
      urlList: e.images ?? [],
      initialIndex: e.current ?? 0,
      onClose: () => {
        var t;
        return (t = e["onUpdate:visible"]) == null ? void 0 : t.call(e, !1);
      }
    }) : null
  },
  table: {
    service: { selectors: Jo, scrollHeightScope: "table" },
    render: ({ attrs: e, slots: t }) => Yo(e, t)
  },
  tableFilter: { render: ({ attrs: e, slots: t }) => Zo(e, t) }
};
function xt(e) {
  return typeof e == "function" ? e() : e;
}
function Cn(e, t) {
  var h;
  const n = Ke({ ...e }), a = $(!1), l = $(!1), o = document.createElement("div"), r = (h = Bt()) == null ? void 0 : h.appContext;
  let i = !1, s = !1, p = !1;
  const u = () => {
    var b;
    i || (i = !0, dt(null, o), o.remove(), (b = n.afterClose) == null || b.call(n));
  }, d = () => {
    i || s || (s = !0, a.value = !1, p || u());
  }, v = async (b, k = "cancel") => {
    var c, m;
    if (!(l.value || s || i)) {
      l.value = !0;
      try {
        b ? await ((c = n.onOk) == null ? void 0 : c.call(n)) : await ((m = n.onCancel) == null ? void 0 : m.call(n, k)), d();
      } catch {
      } finally {
        l.value = !1;
      }
    }
  }, g = oe(() => () => {
    const {
      title: b,
      content: k,
      icon: c,
      type: m,
      onOk: S,
      onCancel: A,
      afterClose: M,
      okText: E,
      cancelText: f,
      okButtonProps: w,
      cancelButtonProps: x,
      okCancel: C,
      closable: D,
      maskClosable: R,
      keyboard: V,
      centered: z,
      ...K
    } = n, Y = c === void 0 ? ye[m] || ye.info : c;
    return _(Tn, {
      width: 420,
      ...K,
      modelValue: a.value,
      showClose: D ?? K.showClose ?? !1,
      closeOnClickModal: R ?? K.closeOnClickModal ?? !1,
      closeOnPressEscape: V ?? K.closeOnPressEscape ?? !0,
      alignCenter: z ?? K.alignCenter,
      beforeClose: () => v(!1, "close"),
      onOpen: () => {
        p = !0;
      },
      onClosed: u
    }, {
      header: () => [xt(Y), xt(b)],
      default: () => xt(k),
      footer: () => [
        (C ?? t) && _(xe, {
          ...x,
          disabled: l.value || (x == null ? void 0 : x.disabled),
          onClick: () => v(!1)
        }, () => f ?? L("cancel")),
        _(xe, {
          type: "primary",
          ...w,
          loading: l.value || (w == null ? void 0 : w.loading),
          onClick: () => v(!0)
        }, () => E ?? L("confirm"))
      ]
    });
  }), y = _(g);
  return y.appContext = r ?? null, document.body.appendChild(o), dt(y, o), Ae(() => {
    !i && !s && (a.value = !0);
  }), {
    update(b) {
      !i && !s && Object.assign(n, b);
    },
    destroy: d
  };
}
function ca(e = {}) {
  return $n(
    vl({
      name: "element-plus",
      uiComponents: or,
      supportedFields: sa,
      fieldSources: Lo,
      adaptFieldProps: Vo,
      fields: Bo,
      fieldComponents: e.components,
      icons: { semantic: ye },
      services: {
        message(t, n) {
          Na({ type: t, message: xt(n) });
        },
        confirm: (t) => Cn(t, !0),
        info: (t) => Cn(t, !1)
      }
    }),
    e.overrides
  );
}
const yr = ca();
function wr(e) {
  return e;
}
function rr(e, t, n) {
  const a = H({ current: 1, size: 10 }), l = $(), o = $(!1), r = H({
    form: {},
    tabs: {},
    dynamic: {},
    table: {}
  }), i = $({ filters: {}, sorters: [] });
  let s = 0, p;
  const u = /* @__PURE__ */ new Set(), d = (f) => (u.add(f), () => u.delete(f)), v = () => _e(tt({}, r.form, r.tabs, r.dynamic, r.table));
  Z(
    [() => {
      var f;
      return (f = e.attrs) == null ? void 0 : f.filterSortTransform;
    }, () => i.value],
    ([f, w]) => {
      const x = _e(w);
      r.table = typeof f == "function" ? _e(f(x) ?? x) : {};
    },
    { immediate: !0, flush: "sync" }
  );
  const g = (f, w = "form") => {
    r[w] = tt({}, f);
  }, y = () => {
    var f;
    if (!E.value)
      return {};
    const w = { ...a }, x = (f = e.attrs) == null ? void 0 : f.pageTransform;
    return x ? x(w) : w;
  }, h = async (f, w = !1) => {
    var x, C, D, R, V, z;
    S.cancel();
    const K = { ...a }, Y = y(), U = tt(
      {},
      Y,
      v(),
      f,
      w ? Y : {}
    ), ee = ((x = e.beforeQuery) == null ? void 0 : x.call(e, U)) ?? U, J = (C = e.apis) == null ? void 0 : C.query;
    p == null || p.abort();
    const F = ++s;
    if (!J) {
      p = void 0, o.value = !1;
      return;
    }
    const N = new AbortController();
    p = N, o.value = !0;
    try {
      const I = await J(ee, { signal: N.signal });
      if (F !== s || N.signal.aborted)
        return;
      const B = ((R = (D = e.attrs) == null ? void 0 : D.resultTransform) == null ? void 0 : R.call(D, I)) ?? I, q = ((V = e.afterQuery) == null ? void 0 : V.call(e, B)) ?? B;
      if (E.value && !Array.isArray(q) && ((z = q == null ? void 0 : q.records) == null ? void 0 : z.length) === 0 && Number.isFinite(q.total)) {
        const Q = Math.max(1, Math.ceil(q.total / (q.size || a.size)));
        if (a.current > Q)
          return a.current = Q, h(f, !0);
      }
      return b(q, K);
    } finally {
      F === s && (p = void 0, o.value = !1);
    }
  }, b = (f, w = { ...a }) => {
    Array.isArray(f) ? (l.value = { current: 1, pageSize: w.size }, t(f), E.value !== !1 && (a.current = 1, E.value = { ...E.value, total: f.length })) : f != null && f.records && (l.value = {
      current: f.current ?? w.current,
      pageSize: f.size ?? w.size
    }, t(f.records), E.value !== !1 && (a.current = l.value.current, a.size = l.value.pageSize, E.value = { ...E.value, total: f.total }));
    const x = e.onLoaded ? [e.onLoaded, ...u] : [...u];
    return Promise.all(x.map((C) => C(f)));
  }, k = (f, w = a.size) => (a.current = w !== a.size ? 1 : f, a.size = w, h()), c = (f) => (E.value && (a.current = 1), h(f)), m = (f) => {
    (f == null ? void 0 : f.name) !== "AbortError" && console.error(f);
  }, S = Ba((f) => c(f).catch(m), 300, { leading: !1 }), A = (f) => {
    var w, x, C, D;
    const R = r.table, V = f.remoteParams ?? (f.remote !== !1 ? { filters: f.filters, sorters: f.sorters } : void 0);
    if (V && !en(i.value, V) && (i.value = _e(V)), f.action === "paginate") {
      if (!E.value || ((w = f.pagination) == null ? void 0 : w.current) === void 0)
        return;
      const z = f.pagination.pageSize ?? a.size, K = z !== a.size ? 1 : f.pagination.current;
      return K === a.current && z === a.size ? void 0 : (a.current = K, a.size = z, (x = e.apis) != null && x.query ? h().catch(m) : void 0);
    }
    if (f.remote === !1) {
      f.action === "filter" && E.value && ((C = f.pagination) == null ? void 0 : C.current) !== void 0 && (a.current = f.pagination.current);
      return;
    }
    if (!(!((D = e.apis) != null && D.query) || en(R, r.table)))
      return c().catch(m);
  }, M = () => {
    S.cancel(), p == null || p.abort(), p = void 0, s += 1, o.value = !1;
  }, E = $(!1);
  return Z(
    () => {
      var f;
      return (f = e.attrs) == null ? void 0 : f.pagination;
    },
    (f) => {
      if (f === !1) {
        E.value = !1;
        return;
      }
      Object.assign(a, { size: (f == null ? void 0 : f.pageSize) || 10, current: (f == null ? void 0 : f.current) || 1 }), E.value = {
        ...f,
        pageSize: a.size,
        current: a.current
      };
    },
    { immediate: !0, flush: "sync" }
  ), Z(
    a,
    (f) => {
      E.value && (E.value = { ...E.value, pageSize: f.size, current: f.current });
    },
    { flush: "sync" }
  ), Z(
    () => {
      var f, w;
      return [
        (f = e.apis) == null ? void 0 : f.query,
        (n == null ? void 0 : n.value.length) ?? ((w = ae(e.dataSource)) == null ? void 0 : w.length),
        a.current,
        a.size,
        E.value === !1
      ];
    },
    ([f, w]) => {
      if (f || !E.value || w === void 0)
        return;
      const x = Math.min(Math.max(1, a.current), Math.max(1, Math.ceil(w / a.size)));
      a.current = x, (E.value.total !== w || E.value.current !== x) && (E.value = { ...E.value, total: w, current: x });
    },
    { immediate: !0 }
  ), {
    goPage: k,
    reload: h,
    throttleRequest: S,
    cancelQuery: M,
    setQueryParams: g,
    getQueryParams: v,
    handleTableChange: A,
    query: c,
    pagination: E,
    dataPagination: l,
    setPageData: b,
    onLoaded: d,
    loading: o
  };
}
function sr(e, t, n) {
  var a;
  const { columns: l, searchForm: o } = e, r = o || {}, i = $(), s = r.dataSource || H({}), { buttons: p = {}, searchOnChange: u, limit: d, ...v } = r, g = $(!1), y = [];
  r.subItems.forEach((m) => {
    if (typeof m == "string") {
      const S = l.find((A) => A.field === m);
      S && y.push({
        type: "Input",
        ...$a(S, "span", "disabled", "hidden"),
        editable: !0,
        exclude: []
      });
    } else
      return y.push({ ...m });
  }), d && y.length > d && y.forEach((m, S) => {
    if (S >= d) {
      const A = m.hidden;
      m.hidden = (...M) => !g.value || (typeof A == "function" ? A(...M) : A);
    }
  });
  const h = {
    search() {
      var m;
      n(s), (m = r.onSubmit) == null || m.call(r, fe(s));
    },
    reset(m) {
      i.value.resetFields(m);
    }
  }, b = Array.isArray(p) ? { actions: p } : { ...p };
  b.actions ?? (b.actions = u ? void 0 : ["search", "reset"]), (a = b.actions) != null && a.length && (d && y.length > d && (b.actions = [
    {
      name: "expand",
      onClick: () => g.value = !g.value
    },
    ...b.actions
  ]), y.push({
    type: "InfoSlot",
    align: "right",
    span: "auto",
    render: () => _("div", { style: { display: "flex", justifyContent: "flex-end", width: "100%" } }, [
      _(je, {
        option: b,
        methods: h,
        effectData: Oe({ table: t, form: i, expanded: g })
      })
    ])
  }));
  const k = Z(i, () => {
    n(s), u && Z(s, n), k();
  });
  return { formNode: () => _(Me.Form, {
    option: {
      ...v,
      ignoreRules: !0,
      dataSource: s,
      subItems: y
    },
    ref: i,
    onSubmit: h.search,
    onReset: h.search
  }), formRef: i, ...h, dataSource: s };
}
function ir(e) {
  return !e || !e.getBoundingClientRect ? 0 : e.getBoundingClientRect();
}
function ur(e) {
  const t = document.documentElement, n = t.scrollLeft, a = t.scrollTop, l = t.clientLeft, o = t.clientTop, r = window.pageXOffset, i = window.pageYOffset, s = ir(e), { left: p, top: u, width: d, height: v } = s, g = (r || n) - (l || 0), y = (i || a) - (o || 0), h = p + r, b = u + i, k = h - g, c = b - y, m = window.document.documentElement.clientWidth, S = window.document.documentElement.clientHeight;
  return {
    left: k,
    top: c,
    right: m - d - k,
    bottom: S - v - c,
    rightIncludeBody: m - k,
    bottomIncludeBody: S - c
  };
}
function cr(e, t, n, a) {
  const { selectors: l, scrollHeightScope: o } = Ce("table"), r = (A, M) => M ? A.querySelector(M) : null, i = Ua(c, 100), s = $({});
  let p = !1, u, d = null;
  const v = [], g = /* @__PURE__ */ new Map();
  function y() {
    g.forEach((A, M) => Object.assign(M.style, A)), g.clear();
  }
  function h(A, M, E = !1) {
    g.has(A) || g.set(A, { height: A.style.height, overflowY: A.style.overflowY }), A.style.height = `${M}px`, E && (A.style.overflowY = "hidden");
  }
  const b = () => {
    var A;
    if (p) {
      i();
      return;
    }
    p = !0, window.addEventListener("resize", i, { signal: a == null ? void 0 : a.signal }), document.addEventListener("redoHeight", i), s.value = (A = e.attrs) == null ? void 0 : A.scroll, v.push(
      Z(
        () => {
          var M;
          return [t.value, (M = ae(t)) == null ? void 0 : M.length, e.maxHeight, e.fixedHeight, e.heightOffset];
        },
        () => i(),
        { flush: "post" }
      ),
      Z(
        n,
        (M, E, f) => {
          if (M) {
            const w = M.style.overflow;
            M.style.overflow = "hidden", u = new ResizeObserver(() => i()), u.observe(M), M.parentElement && u.observe(M.parentElement), f(() => {
              M.style.overflow = w, u == null || u.disconnect(), d = null, y();
            });
          }
        },
        { immediate: !0, flush: "post" }
      )
    );
  };
  function k() {
    var A;
    p = !1, window.removeEventListener("resize", i), document.removeEventListener("redoHeight", i), u == null || u.disconnect(), v.forEach((M) => M()), v.length = 0, y(), i.cancel(), s.value = ae((A = e.attrs) == null ? void 0 : A.scroll);
  }
  $t(k);
  function c() {
    if (p)
      return i.cancel(), S();
  }
  function m(A, M) {
    var E;
    s.value = {
      x: "100%",
      ...ae((E = e.attrs) == null ? void 0 : E.scroll),
      y: A == null ? null : A + (o === "table" ? M : 0)
    };
  }
  async function S() {
    var A, M;
    if (await Ae(), !p)
      return;
    const { maxHeight: E, fixedHeight: f, heightOffset: w } = e;
    if (E == null)
      return;
    const x = ae(n);
    if (!(x != null && x.isConnected) || !x.parentElement)
      return;
    const C = r(x, l.table);
    if (!C)
      return;
    f || y();
    const D = x.parentElement, R = getComputedStyle(D), V = ur(C);
    let z = 0;
    for (let de = C.parentElement; de; de = de.parentElement) {
      const se = getComputedStyle(de);
      if (z += (parseFloat(se.paddingBottom) || 0) + (parseFloat(se.borderBottomWidth) || 0), de === x)
        break;
    }
    const K = (parseFloat(R.marginBottom) || 0) + (parseFloat(R.paddingBottom) || 0);
    let Y = 0;
    if (E === "parent") {
      const de = D.getBoundingClientRect().top + D.clientTop + D.clientHeight, se = getComputedStyle(x);
      Y = de - (parseFloat(R.paddingBottom) || 0) - V.top - (parseFloat(se.marginBottom) || 0);
    } else
      Y = V.bottomIncludeBody - K;
    const U = r(C, l.title), ee = (U == null ? void 0 : U.parentElement) === C ? U.offsetHeight ?? 0 : 0, J = r(C, l.header), F = (J == null ? void 0 : J.offsetHeight) ?? 0;
    let N = 0;
    const I = r(C, l.footer);
    I && (N += I.offsetHeight || 0);
    let B = 0;
    if (l.pagination) {
      const de = C.getBoundingClientRect().top;
      x.querySelectorAll(l.pagination).forEach((se) => {
        se.offsetHeight && se.getBoundingClientRect().top >= de && (B += se.offsetHeight + 16);
      });
    }
    const q = Math.max(
      0,
      Math.floor(Y) - (w || 0) - z - B
    ), Q = N + ee + F + 1, le = Math.max(0, typeof E == "number" ? E : q - Q), me = le + Q;
    if (f && (h(C, me, !0), !(((A = ae(t)) == null ? void 0 : A.length) > 0) && r(C, l.empty))) {
      const se = r(C, l.emptyCell);
      se && h(se, Math.max(0, le - 16));
    }
    const ce = r(C, l.bodyContent);
    if (ce !== d && (d && (u == null || u.unobserve(d)), d = ce, ce && (u == null || u.observe(ce))), ce) {
      const de = r(C, l.body), se = de && getComputedStyle(de), Fe = de && se ? Math.max(
        0,
        de.offsetHeight - de.clientHeight - (parseFloat(se.borderTopWidth) || 0) - (parseFloat(se.borderBottomWidth) || 0)
      ) : 0, T = ((M = ae(t)) == null ? void 0 : M.length) > 0 && ce.getBoundingClientRect().height + Fe > le;
      m(T ? le : null, Q);
    } else
      m(le, Q);
  }
  return { getScrollRef: s, redoHeight: c, debounceRedoHeight: i, listenResize: b, stopResize: k };
}
const dr = oe({
  name: "SuperTable",
  inheritAttrs: !1,
  props: {
    dataSource: Array,
    schema: Object
  },
  emits: ["register", "load", "update:dataSource"],
  setup(e, t) {
    const { style: n, class: a, ...l } = t.attrs, o = Ke({ attrs: l }), r = $([]), i = $(), s = (I) => {
      r.value = I, t.emit("update:dataSource", I), He(o.dataSource) && (o.dataSource.value = I);
    };
    Ne(() => e.dataSource && s(e.dataSource)), Ne(() => o.dataSource && s(ae(o.dataSource)));
    const p = $(), u = (I) => {
      var B, q;
      Se.schemaDiagnostics && mt(I, "table", "SuperTable");
      const { attrs: Q, ...le } = ue.SuperTable || {}, { maxHeight: me, fixedHeight: ce, heightOffset: de, useSectionStyle: se, ...Fe } = ve(
        le,
        { ...I.attrs },
        l
      );
      let T = le.pagination;
      for (const G of [(B = I.attrs) == null ? void 0 : B.pagination, l.pagination])
        G !== void 0 && (T = G === !1 ? !1 : tt({}, T || {}, G));
      Object.assign(o, { maxHeight: me, fixedHeight: ce, heightOffset: de, useSectionStyle: se }, I, {
        attrs: {
          ...Fe,
          pagination: T,
          filterSortTransform: l.filterSortTransform ?? ((q = I.attrs) == null ? void 0 : q.filterSortTransform) ?? le.filterSortTransform
        }
      });
    };
    Ne(() => e.schema && u(fe(e.schema)));
    const {
      loading: d,
      pagination: v,
      dataPagination: g,
      setPageData: y,
      onLoaded: h,
      goPage: b,
      reload: k,
      query: c,
      throttleRequest: m,
      cancelQuery: S,
      setQueryParams: A,
      getQueryParams: M,
      handleTableChange: E
    } = rr(o, s, r), { getScrollRef: f, debounceRedoHeight: w, listenResize: x, stopResize: C } = cr(o, r, i), D = Te(), R = {
      setOption: u,
      setData: (I) => {
        I && s(I);
      },
      redoHeight: w,
      goPage: b,
      reload: k,
      query: c,
      onLoaded: h,
      resetSearchForm(I) {
        var B, q;
        return (q = (B = p.value) == null ? void 0 : B.formRef) == null ? void 0 : q.resetFields(I);
      },
      setPageData: y,
      getQueryParams: M,
      getData: () => r.value,
      dataRef: r,
      searchForm: W(() => {
        var I;
        return (I = p.value) == null ? void 0 : I.formRef;
      }),
      validate: async () => {
        D.value && await Ce("form").validate(D.value);
      },
      setColumns: (I) => {
        var B;
        !J && !((B = o.columns) != null && B.length) ? Object.assign(o, { columns: I }) : (Object.assign(o, { columns: I }), N(I));
      }
    }, V = $({ ...R }), z = (I) => {
      Object.assign(V.value, $e(H(I)), R), t.emit("register", V.value);
    };
    t.emit("register", V.value), t.expose(V.value);
    const K = H({
      reload: k,
      onRegister: z,
      loading: d
    });
    ct(() => {
      S(), t.emit("register", null);
    }), Be("rootSlots", t.slots);
    const Y = $({}), U = $(), ee = H({
      formData: r,
      current: r,
      queryParams: W(M)
    });
    let J = !1;
    const F = Z(
      o,
      (I) => {
        var B, q;
        if (!((B = I == null ? void 0 : I.columns) != null && B.length))
          return;
        if (U.value) {
          F();
          return;
        }
        const { columns: Q } = I, le = H({
          refData: r,
          listData: nt(Q)
        });
        Y.value = ot(o.slots, ee, t.slots);
        const {
          // 查询转换器由 Core 消费，不传给原生 Table。
          attrs: {
            onLoad: me,
            onTableChange: ce,
            filterSortTransform: de,
            pageTransform: se,
            resultTransform: Fe,
            ...T
          }
        } = De({ option: I, effectData: ee });
        Object.assign(K, T, {
          pagination: v,
          onTableChange: (j) => {
            E(j);
            const te = Array.isArray(ce) ? ce : [ce], re = {
              ...j,
              pagination: v.value ? {
                current: v.value.current,
                pageSize: v.value.pageSize,
                total: v.value.total
              } : void 0
            };
            te.forEach((pe) => pe == null ? void 0 : pe(re));
          }
        }), h((j) => {
          t.emit("load", j), me == null || me(j);
        }), I.searchForm && (p.value = sr(I, V, (j) => {
          A(j, "form"), J && m();
        }));
        const G = I.tabs && I.tabs.field;
        if (I.tabs && G) {
          const j = (q = I.tabs).activeKey ?? (q.activeKey = $(I.tabs.defaultActiveKey)), te = {};
          Z(
            j,
            (re) => {
              re === void 0 ? A(void 0, "tabs") : (ft(te, G, re), A(te, "tabs")), J && m();
            },
            { immediate: !0 }
          );
        }
        Z(
          () => I.params && H(I.params),
          (j) => {
            A(j, "dynamic"), J && m();
          },
          { deep: !0, immediate: !0 }
        ), Ae(() => {
          J = !0, o.immediate !== !1 && m();
        }), Z(
          () => {
            var j;
            return [o.maxHeight, (j = o.attrs) == null ? void 0 : j.scroll];
          },
          () => {
            o.maxHeight == null ? (C(), T.scroll === void 0 ? delete K.scroll : K.scroll = T.scroll) : (K.scroll = f, x());
          },
          { immediate: !0 }
        );
        const { onExpandedRowsChange: O } = K;
        K.onExpandedRowsChange = (j) => {
          O == null || O(j), w();
        };
        const P = () => _(Me.Table, { option: o, effectData: ee, model: le, ...K }, Y.value);
        o.editable ? U.value = () => X("form")({ model: r.value, ref: D }, { default: P }) : U.value = P;
      },
      {
        immediate: !0
      }
    ), N = (I) => {
      const B = H({
        refData: r,
        listData: nt(I)
      }), q = Symbol(), Q = () => _(Me.Table, { option: o, effectData: ee, model: B, key: q, ...K }, Y.value);
      o.editable ? U.value = () => X("form")({ model: r.value, ref: D }, { default: Q }) : U.value = Q;
    };
    return () => U.value && _(
      Gt,
      { name: "exaProvider", data: { data: r, dataPagination: g, onLoaded: h } },
      () => {
        var I, B;
        return !p.value || (I = o.searchForm) != null && I.teleport ? _(
          "div",
          ve(
            {
              ref: i,
              class: [o.useSectionStyle && "sup-container", "sup-table", "sup-form-section"]
            },
            {
              class: a,
              style: n
            }
          ),
          [
            ((B = o.searchForm) == null ? void 0 : B.teleport) && _(
              ba,
              { to: o.searchForm.teleport },
              _("div", { class: "sup-form-section sup-table-search" }, _(p.value.formNode))
            ),
            U.value()
          ]
        ) : _(
          "div",
          ve(
            { ref: i, class: [o.useSectionStyle && "sup-container", "sup-table"] },
            { class: a, style: n }
          ),
          [
            _("div", { class: "sup-form-section sup-table-search" }, _(p.value.formNode)),
            _("div", { class: "sup-form-section section-last" }, _(U.value))
          ]
        );
      }
    );
  }
}), Sr = (e) => {
  const [t, n] = Lt(), [a, l] = Lt(), o = Promise.resolve(typeof e == "function" ? e() : e), r = (s) => {
    if (s)
      t.value || o.then(s.setOption), t.value = s, typeof s.setSelectedRows == "function" && (a.value = s);
    else if (s === null)
      t.value = void 0, a.value = void 0;
    else
      return (p, u) => _(dr, { ...p, onRegister: r }, u == null ? void 0 : u.slots);
  }, i = async (s, ...p) => {
    let u = await n();
    if (await o, s && (!(s in u) || ["resetSearchForm", "validate", "redoHeight"].includes(s)) && (u = await l(), await Ae()), s && s in u)
      return typeof u[s] == "function" ? u[s](...p) : u[s];
  };
  return [
    r,
    {
      /** 异步获取表格引用 */
      getTable: n,
      tableRef: t,
      redoHeight() {
        return i("redoHeight");
      },
      setData(s) {
        return i("setPageData", s);
      },
      /** 返回当前表格数据 */
      getData() {
        var s;
        return be((s = t.value) == null ? void 0 : s.dataRef);
      },
      dataSource: W(() => {
        var s;
        return (s = t.value) == null ? void 0 : s.dataRef;
      }),
      /** 跳转到指定页 */
      goPage(s) {
        return i("goPage", s);
      },
      /** 设置表格列 */
      setColumns(s) {
        return i("setColumns", s);
      },
      /** 刷新数据，不改动查询条件与当前页 */
      reload() {
        return i("reload");
      },
      /** 手动执行条件查询，不覆盖搜索表单参数 */
      query(s) {
        return i("query", s);
      },
      /** 查询完成，返回结果回调 */
      onLoaded(s) {
        return i("onLoaded", s);
      },
      /** 重置查询表单，并重新查询 */
      resetSearchForm(s) {
        return i("resetSearchForm", s);
      },
      getQueryParams: () => {
        var s;
        return (s = t.value) == null ? void 0 : s.getQueryParams();
      },
      // setQueryParams: (params: Obj) => asyncCall('setQueryParams', params),
      selectedRowKeys: W(() => {
        var s;
        return (s = t.value) == null ? void 0 : s.selectedRowKeys;
      }),
      selectedRows: W(() => {
        var s;
        return (s = t.value) == null ? void 0 : s.selectedRows;
      }),
      /** 设置选中行 */
      setSelectedRows: (s) => i("setSelectedRows", s),
      expandedRowKeys: W(() => {
        var s;
        return (s = t.value) == null ? void 0 : s.expandedRowKeys;
      }),
      setExpandedRowKeys: (s) => i("setExpandedRowKeys", s),
      expandAll() {
        return i("expandAll");
      },
      /** 新增行 */
      add: (s) => i("add", s),
      /** 修改行，须判断是否已有选中行 */
      edit: (s) => i("edit", s),
      /** 删除行，须判断是否已有选中行 */
      delete: () => i("delete"),
      /** 查看详情，须判断是否已有选中行 */
      detail: (s) => i("detail", s),
      asyncCall: i,
      /** `editable`模式下进行表单校验 */
      validate() {
        return i("validate");
      }
    }
  ];
};
function Cr(e) {
  return e;
}
const fr = oe({
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
    const a = (n = t.default) == null ? void 0 : n.call(t), { effectData: l, ...o } = e, r = a ? a.flatMap(({ children: i, props: s = {} }) => {
      const { roleName: p, onClick: u, confirmText: d, tooltip: v, disabledTooltip: g, icon: y, ...h } = Va(
        s,
        (b, k) => qa(k)
      );
      return !u || !i ? [] : {
        label: i.default || i,
        icon: y,
        tooltip: v,
        disabledTooltip: g,
        roleName: p,
        onClick: u,
        confirmText: d,
        attrs: h
      };
    }) : e.actions;
    return () => _("div", {
      style: { display: "flex", justifyContent: { left: "flex-start", center: "center", right: "flex-end" }[e.align || "left"] }
    }, [_(je, { option: { ...o, actions: r }, effectData: l })]);
  }
});
function xr(e) {
  return [() => _(fr, e)];
}
function kr(e) {
  const t = $(), n = $(), a = Promise.resolve(typeof e == "function" ? e() : e), l = (o) => {
    if (o)
      n.value || (a.then(o.setOption), t.value && Z(
        t,
        (r) => {
          o.setData(r);
        },
        { immediate: !0 }
      )), n.value = o;
    else
      return (r) => _(Jn, { ...r, onRegister: l }, ha());
  };
  return [
    l,
    {
      setData(o) {
        n.value ? n.value.setData(o) : t.value = o;
      }
    }
  ];
}
function _r(e) {
  return e;
}
const pr = Fo(
  "superform-element-plus",
  (e) => ca({ components: e })
), Ar = pr, Mr = {
  Input: yt,
  TextArea: yt,
  InputPassword: yt,
  InputSearch: yt,
  InputNumber: Ka,
  InputOtp: Ha,
  InputTag: Wa,
  Autocomplete: Ga,
  Mention: Ya,
  Select: Qa,
  SelectV2: Xa,
  Cascader: Za,
  TreeSelect: Ja,
  Radio: el,
  RadioGroup: tl,
  Checkbox: nl,
  CheckboxGroup: al,
  Switch: ll,
  DatePicker: tn,
  DateRangePicker: tn,
  TimePicker: nn,
  TimeRangePicker: nn,
  TimeSelect: ol,
  ColorPicker: rl,
  Rate: sl,
  Slider: il,
  Segmented: ul,
  Transfer: cl
};
export {
  jo as FormValidationError,
  fr as SuperButtons,
  Jn as SuperDetail,
  Wl as SuperForm,
  dr as SuperTable,
  Io as configure,
  ca as createElementPlusAdapter,
  Yt as createModal,
  Ar as default,
  _r as defineDetail,
  wr as defineForm,
  Cr as defineTable,
  vl as defineUIAdapter,
  Il as diagnoseSchema,
  yr as elementPlusAdapter,
  Bo as elementPlusFields,
  br as enUS,
  Mr as fieldComponents,
  gr as registerAutoImportedComponents,
  To as registerComponent,
  Ro as registerComponents,
  Po as useAdapter,
  xr as useButtons,
  kr as useDetail,
  Xn as useForm,
  Zn as useModal,
  hr as useModalForm,
  Sr as useTable,
  Ct as zhCN
};
