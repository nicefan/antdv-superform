import "./style.css";
import { m as merge, g as globalConfig, a as getSemanticIconNode, _ as _sfc_main$3, b as getEffectData, C as Controls, c as getUITableSelectors, d as buildModelsMap, u as useInnerSlots, r as render, e as renderUIForm, D as DataProvider, f as reportSchemaDiagnostics, h as globalProps, i as useGetRef, j as DetailLayouts, s as superform } from "./plugin.js";
import { v, o, x, l, k, n, p, q, t, w, y, z } from "./plugin.js";
import { reactive, ref, watch, mergeProps, h, toRaw, onUnmounted, unref, nextTick, defineComponent, shallowReactive, watchEffect, shallowRef, computed, provide, Teleport, isRef, toRefs, toValue, readonly, toRef, useSlots } from "vue";
import { throttle, omit, debounce, set, mapKeys, camelCase } from "lodash-es";
import "nanoid";
import "./schemaTypes.js";
function defineForm(option) {
  return option;
}
const style = "";
const resultTransform = (res) => {
  var _a, _b;
  return ((_b = (_a = globalConfig.tableApiSetting) == null ? void 0 : _a.resultTransform) == null ? void 0 : _b.call(_a, res)) || res;
};
const pageTransform = (param) => {
  const { currentField, sizeField } = globalConfig.tableApiSetting || {};
  if (currentField || sizeField) {
    return {
      [currentField || "current"]: param.current,
      [sizeField || "size"]: param.size
    };
  }
  return param;
};
function useQuery(option, updateSource) {
  const pageParam = reactive({});
  const loading = ref(false);
  let searchParam = {};
  let latestRequestId = 0;
  let activeController;
  const callbacks = [];
  const onLoaded = (cb) => callbacks.push(cb);
  if (option.onLoaded) {
    callbacks.push(option.onLoaded);
  }
  const request = async (param) => {
    var _a, _b, _c;
    const _params = merge({}, pageTransform(pageParam), searchParam, param);
    const _data = ((_a = option.beforeQuery) == null ? void 0 : _a.call(option, _params)) || _params;
    const queryApi = (_b = option.apis) == null ? void 0 : _b.query;
    activeController == null ? void 0 : activeController.abort();
    const requestId = ++latestRequestId;
    if (!queryApi) {
      activeController = void 0;
      loading.value = false;
      return;
    }
    const controller = new AbortController();
    activeController = controller;
    loading.value = true;
    try {
      const res = await queryApi(_data, { signal: controller.signal });
      if (requestId !== latestRequestId || controller.signal.aborted)
        return;
      const _res = ((_c = option.afterQuery) == null ? void 0 : _c.call(option, res)) || res;
      return setPageData(resultTransform(_res));
    } finally {
      if (requestId === latestRequestId) {
        activeController = void 0;
        loading.value = false;
      }
    }
  };
  const setPageData = (res) => {
    if (Array.isArray(res)) {
      updateSource(res);
      if (pagination.value !== false) {
        pageParam.current = 1;
        pagination.value = { ...pagination.value, total: res.length };
      }
    } else if (res == null ? void 0 : res.records) {
      updateSource(res.records);
      if (pagination.value !== false) {
        pageParam.current = res.current;
        pageParam.size = res.size;
        pagination.value = { ...pagination.value, total: res.total };
      }
    }
    return Promise.all(callbacks.map((cb) => cb(res)));
  };
  const goPage = (current, size = pageParam.size) => {
    pageParam.current = current;
    pageParam.size = size;
    return request();
  };
  const query = (param) => {
    if (pagination.value)
      pageParam.current = 1;
    return request(param);
  };
  const throttleRequest = throttle(query, 300, { leading: false });
  const cancelQuery = () => {
    activeController == null ? void 0 : activeController.abort();
    activeController = void 0;
    latestRequestId += 1;
    loading.value = false;
  };
  const formParams = {};
  const setQueryParams = (data, target) => {
    if (target === "dynamic") {
      searchParam = merge({}, formParams, data);
    } else {
      Object.assign(formParams, data);
      merge(searchParam, data);
    }
  };
  const getQueryParams = () => searchParam;
  const pagination = ref(false);
  watch(
    () => {
      var _a;
      return option.pagination ?? ((_a = option.attrs) == null ? void 0 : _a.pagination);
    },
    (def) => {
      if (def === false) {
        pagination.value = false;
        return;
      }
      Object.assign(pageParam, { size: (def == null ? void 0 : def.pageSize) || 10, current: (def == null ? void 0 : def.current) || 1 });
      pagination.value = mergeProps(
        {
          onChange: goPage
          // onShowSizeChange: goPage,
        },
        {
          ...def,
          pageSize: pageParam.size,
          current: pageParam.current
        }
      );
    },
    {
      immediate: true,
      flush: "sync"
    }
  );
  watch(pageParam, (p2) => {
    pagination.value && (pagination.value = { ...pagination.value, pageSize: p2.size, current: p2.current });
  });
  return {
    goPage,
    reload: request,
    throttleRequest,
    cancelQuery,
    setQueryParams,
    getQueryParams,
    query,
    pagination,
    setPageData,
    onLoaded,
    loading
  };
}
function useSearchForm(tableOption, tableRef, onChange) {
  var _a;
  const { columns, searchForm } = tableOption;
  const schema = searchForm || tableOption.searchSchema || {};
  const formRef = ref();
  const dataSource = schema.dataSource || reactive({});
  const { buttons = {}, searchOnChange, limit, ...formOption } = schema;
  const expanded = ref(false);
  const subItems = [];
  schema.subItems.forEach((item) => {
    if (typeof item === "string") {
      const col = columns.find((col2) => col2.field === item);
      col && subItems.push({
        type: "Input",
        ...omit(col, "span", "disabled", "hidden"),
        editable: true,
        exclude: []
      });
    } else {
      return subItems.push({ ...item });
    }
  });
  if (limit && subItems.length > limit) {
    subItems.forEach((item, index) => {
      if (index >= limit) {
        const hidden = item.hidden;
        item.hidden = (...args) => !expanded.value || (hidden == null ? void 0 : hidden(...args));
      }
    });
  }
  const defaultAction = {
    search() {
      var _a2;
      onChange(dataSource);
      (_a2 = schema.onSubmit) == null ? void 0 : _a2.call(schema, toRaw(dataSource));
    },
    reset(data) {
      formRef.value.resetFields(data);
    }
  };
  const buttonsConfig = Array.isArray(buttons) ? { actions: buttons } : { ...buttons };
  buttonsConfig.actions ?? (buttonsConfig.actions = !searchOnChange ? ["search", "reset"] : void 0);
  if ((_a = buttonsConfig.actions) == null ? void 0 : _a.length) {
    if (limit && subItems.length > limit)
      buttonsConfig.actions = [
        {
          label: () => [
            expanded.value ? "收起 " : "展开 ",
            getSemanticIconNode(expanded.value ? "collapse" : "expand")
          ],
          attrs: { type: "link" },
          onClick: () => expanded.value = !expanded.value
        },
        ...buttonsConfig.actions
      ];
    subItems.push({
      type: "InfoSlot",
      align: "right",
      span: "auto",
      render: () => h(_sfc_main$3, {
        option: buttonsConfig,
        methods: defaultAction,
        effectData: getEffectData({ table: tableRef, form: formRef })
      })
    });
  }
  const unWatch = watch(formRef, () => {
    onChange(dataSource);
    if (searchOnChange) {
      watch(dataSource, onChange);
    }
    unWatch();
  });
  const formNode = () => h(Controls.Form, {
    option: {
      ...formOption,
      ignoreRules: true,
      dataSource,
      subItems
    },
    ref: formRef,
    onSubmit: defaultAction.search,
    onReset: defaultAction.search
  });
  return { formNode, formRef, ...defaultAction, dataSource };
}
function getBoundingClientRect(element) {
  if (!element || !element.getBoundingClientRect) {
    return 0;
  }
  return element.getBoundingClientRect();
}
function getViewportOffset(element) {
  const doc = document.documentElement;
  const docScrollLeft = doc.scrollLeft;
  const docScrollTop = doc.scrollTop;
  const docClientLeft = doc.clientLeft;
  const docClientTop = doc.clientTop;
  const pageXOffset = window.pageXOffset;
  const pageYOffset = window.pageYOffset;
  const box = getBoundingClientRect(element);
  const { left: retLeft, top: rectTop, width: rectWidth, height: rectHeight } = box;
  const scrollLeft = (pageXOffset || docScrollLeft) - (docClientLeft || 0);
  const scrollTop = (pageYOffset || docScrollTop) - (docClientTop || 0);
  const offsetLeft = retLeft + pageXOffset;
  const offsetTop = rectTop + pageYOffset;
  const left = offsetLeft - scrollLeft;
  const top = offsetTop - scrollTop;
  const clientWidth = window.document.documentElement.clientWidth;
  const clientHeight = window.document.documentElement.clientHeight;
  return {
    left,
    top,
    right: clientWidth - rectWidth - left,
    bottom: clientHeight - rectHeight - top,
    rightIncludeBody: clientWidth - left,
    bottomIncludeBody: clientHeight - top
  };
}
function useTableScroll(option, dataRef, wrapRef, abortController) {
  const selectors = getUITableSelectors();
  const query = (root, selector) => selector ? root.querySelector(selector) : null;
  const debounceRedoHeight = debounce(redoHeight, 100);
  const getScrollRef = ref({});
  let beResize = false;
  const listenResize = () => {
    var _a;
    beResize = true;
    if (abortController) {
      window.addEventListener("resize", debounceRedoHeight, {
        signal: abortController.signal
      });
    } else {
      document.addEventListener("redoHeight", debounceRedoHeight);
    }
    getScrollRef.value = (_a = option.attrs) == null ? void 0 : _a.scroll;
    watch(
      () => {
        var _a2;
        return [wrapRef.value, (_a2 = unref(dataRef)) == null ? void 0 : _a2.length];
      },
      () => {
        debounceRedoHeight();
      },
      { flush: "post" }
    );
    const unwatch = watch(
      wrapRef,
      (el) => {
        if (el) {
          el.style.overflow = "hidden";
          const resizeObserver = new ResizeObserver(() => {
            debounceRedoHeight();
          });
          resizeObserver.observe(el);
          unwatch();
        }
      },
      { immediate: true, flush: "post" }
    );
  };
  onUnmounted(() => {
    beResize && document.removeEventListener("redoHeight", debounceRedoHeight);
  });
  function redoHeight() {
    if (!beResize)
      return;
    nextTick(() => {
      calcTableHeight();
    });
  }
  function setHeight(height) {
    getScrollRef.value = {
      y: height,
      x: "100%"
      // scrollToFirstRowOnChange: true,
    };
  }
  async function calcTableHeight() {
    var _a;
    const { maxHeight, inheritHeight, isFixedHeight, resizeHeightOffset } = option;
    const wrapEl = unref(wrapRef);
    if (!wrapEl)
      return;
    const tableEl = query(wrapEl, selectors.table);
    if (!tableEl)
      return;
    await nextTick();
    const outerStyle = getComputedStyle(wrapEl.parentElement);
    const tableView = getViewportOffset(tableEl);
    const wrapView = getViewportOffset(wrapEl);
    const paddingHeight = tableView.left - wrapView.left;
    const outerPadding = (parseInt(outerStyle.marginBottom) || 0) + (parseInt(outerStyle.paddingBottom) || 0);
    let bottomIncludeBody = 0;
    if (wrapEl && inheritHeight) {
      bottomIncludeBody = wrapView.bottomIncludeBody - wrapView.bottom - (tableView.top - wrapView.top);
    } else {
      bottomIncludeBody = tableView.bottomIncludeBody - outerPadding;
    }
    const titleEl = query(tableEl, selectors.title);
    const headerHeight = (titleEl == null ? void 0 : titleEl.parentElement) === tableEl ? titleEl.offsetHeight ?? 0 : 0;
    const headEl = query(tableEl, selectors.header);
    if (!headEl)
      return;
    let headerCellHeight = 0;
    if (headEl) {
      headerCellHeight = headEl.offsetHeight;
    }
    let footerHeight = 0;
    const footerEl = query(tableEl, selectors.footer);
    if (footerEl && footerEl.parentElement === tableEl) {
      footerHeight += footerEl.offsetHeight || 0;
    }
    let paginationHeight = 0;
    const paginationEl = query(wrapEl, selectors.pagination);
    if (paginationEl) {
      paginationHeight = paginationEl.offsetHeight + 16;
    }
    let tableHeight = Math.ceil(bottomIncludeBody) - (resizeHeightOffset || 0) - paddingHeight - paginationHeight;
    const innerHeight = maxHeight || tableHeight - footerHeight - headerHeight - headerCellHeight - 1;
    if (maxHeight && isFixedHeight) {
      tableHeight = maxHeight + footerHeight + headerHeight + headerCellHeight + 1;
    }
    if (isFixedHeight) {
      tableEl.style.height = `${tableHeight}px`;
      tableEl.style["overflow-y"] = "hidden";
      if (!inheritHeight) {
        wrapEl.style.height = "unset";
      }
      const tableWrap = query(wrapEl, selectors.wrapper);
      if (tableWrap) {
        tableWrap.style.height = "";
        tableWrap.style["overflow-y"] = "";
      }
      if (!(((_a = unref(dataRef)) == null ? void 0 : _a.length) > 0)) {
        const emptyEl = query(tableEl, selectors.empty);
        if (emptyEl) {
          const emptyCell = query(tableEl, selectors.emptyCell);
          if (emptyCell)
            emptyCell.style.height = `${innerHeight}px`;
        }
        return;
      }
    }
    if (tableEl.scrollHeight > tableHeight) {
      setHeight(innerHeight);
    } else {
      const bodyEl = query(tableEl, selectors.body);
      if (bodyEl) {
        setHeight(bodyEl.scrollHeight <= innerHeight ? null : innerHeight);
      }
    }
  }
  return { getScrollRef, redoHeight, debounceRedoHeight, listenResize };
}
const _sfc_main$2 = defineComponent({
  name: "SuperTable",
  inheritAttrs: false,
  props: {
    dataSource: Array,
    schema: Object
  },
  emits: ["register", "load", "update:dataSource"],
  setup(props, ctx) {
    const { style: style2, class: ctxClass, ...ctxAttrs } = ctx.attrs;
    const option = shallowReactive({ attrs: ctxAttrs });
    const dataRef = ref([]);
    const wrapRef = ref();
    const updateSource = (data) => {
      dataRef.value = data;
      ctx.emit("update:dataSource", data);
      if (isRef(option.dataSource)) {
        option.dataSource.value = data;
      }
    };
    watchEffect(() => props.dataSource && updateSource(props.dataSource));
    watchEffect(() => option.dataSource && updateSource(unref(option.dataSource)));
    const searchForm = ref();
    const setOption = (_option) => {
      if (globalConfig.schemaDiagnostics)
        reportSchemaDiagnostics(_option, "table", "SuperTable");
      const { isScanHeight, inheritHeight, isFixedHeight, isContainer, ...attrs } = mergeProps(
        globalProps.Table,
        { ..._option.attrs },
        { ...option.attrs }
      );
      Object.assign(option, { isScanHeight, inheritHeight, isFixedHeight, isContainer }, _option, { attrs });
    };
    watchEffect(() => props.schema && setOption(toRaw(props.schema)));
    const {
      loading,
      pagination,
      setPageData,
      onLoaded,
      goPage,
      reload,
      query,
      throttleRequest,
      cancelQuery,
      setQueryParams,
      getQueryParams
    } = useQuery(option, updateSource);
    const { getScrollRef, redoHeight, listenResize } = useTableScroll(option, dataRef, wrapRef);
    const tableFormRef = shallowRef();
    const exposed = {
      setOption,
      setData: (data) => {
        data && updateSource(data);
      },
      redoHeight,
      goPage,
      reload,
      query,
      onLoaded,
      resetSearchForm(data) {
        try {
          return searchForm.value.formRef.resetFields(data);
        } catch (e) {
          console.warn(e);
        }
      },
      setPageData,
      getQueryParams,
      getData: () => dataRef.value,
      dataRef,
      searchForm: computed(() => {
        var _a;
        return (_a = searchForm.value) == null ? void 0 : _a.formRef;
      }),
      validate: async () => {
        var _a;
        return (_a = tableFormRef.value) == null ? void 0 : _a.validate();
      },
      setColumns: (cols) => {
        var _a;
        if (!initQuery && !((_a = option.columns) == null ? void 0 : _a.length)) {
          Object.assign(option, { columns: cols });
        } else {
          Object.assign(option, { columns: cols });
          updateColumns(cols);
        }
      }
    };
    const tableRef = ref({ ...exposed });
    const register = (comp) => {
      Object.assign(tableRef.value, toRefs(reactive(comp)), exposed);
      ctx.emit("register", tableRef.value);
    };
    ctx.emit("register", tableRef.value);
    ctx.expose(tableRef.value);
    const tableAttrs = reactive({
      reload,
      onRegister: register,
      loading
    });
    onUnmounted(() => {
      cancelQuery();
      ctx.emit("register", null);
    });
    provide("rootSlots", ctx.slots);
    const slots = ref({});
    const tableSlot = ref();
    const effectData = reactive({ formData: dataRef, current: dataRef, queryParams: computed(getQueryParams) });
    let initQuery = false;
    const unWatch = watch(
      option,
      (opt) => {
        var _a2;
        var _a;
        if (!((_a2 = opt == null ? void 0 : opt.columns) == null ? void 0 : _a2.length))
          return;
        if (tableSlot.value) {
          unWatch();
          return;
        }
        const { columns, maxHeight, isScanHeight = true, inheritHeight } = opt;
        const model = reactive({
          refData: dataRef,
          listData: buildModelsMap(columns)
        });
        slots.value = useInnerSlots(option.slots, effectData, ctx.slots);
        const searchSchema = opt.searchForm || opt.searchSchema;
        const {
          attrs: { onLoad, ...attrs }
        } = render({ option: opt, effectData });
        Object.assign(tableAttrs, attrs, { pagination });
        onLoaded((data) => {
          ctx.emit("load", data);
          onLoad == null ? void 0 : onLoad(data);
        });
        if (searchSchema) {
          searchForm.value = useSearchForm(opt, tableRef, (data) => {
            setQueryParams(data, "form");
            initQuery && throttleRequest();
          });
        }
        const tabsField = opt.tabs && opt.tabs.field;
        if (opt.tabs && tabsField) {
          const tabsKey = (_a = opt.tabs).activeKey ?? (_a.activeKey = ref(opt.tabs.defaultActiveKey));
          const tabParam = {};
          watch(
            tabsKey,
            (key) => {
              if (key === void 0)
                return;
              set(tabParam, tabsField, key);
              setQueryParams(tabParam);
              initQuery && throttleRequest();
            },
            { immediate: true }
          );
        }
        watch(
          ref(opt.params),
          (p2) => {
            setQueryParams(p2, "dynamic");
            initQuery && throttleRequest();
          },
          { deep: true, immediate: true }
        );
        nextTick(() => {
          initQuery = true;
          if (option.immediate !== false) {
            throttleRequest();
          }
        });
        if (isScanHeight || inheritHeight || maxHeight) {
          listenResize();
          tableAttrs.scroll = getScrollRef;
          const { onChange, onExpandedRowsChange } = tableAttrs;
          tableAttrs.onChange = (...args) => {
            onChange == null ? void 0 : onChange(...args);
          };
          tableAttrs.onExpandedRowsChange = (param) => {
            onExpandedRowsChange == null ? void 0 : onExpandedRowsChange(param);
            redoHeight();
          };
          watch(dataRef, redoHeight);
        }
        const table = () => h(Controls.Table, { option, effectData, model, ...tableAttrs }, slots.value);
        if (option.editable) {
          tableSlot.value = () => renderUIForm({ model: dataRef.value, ref: tableFormRef }, { default: table });
        } else {
          tableSlot.value = table;
        }
      },
      {
        immediate: true
      }
    );
    const updateColumns = (cols) => {
      const model = reactive({
        refData: dataRef,
        listData: buildModelsMap(cols)
      });
      const table = () => h(Controls.Table, { option, effectData, model, key: Symbol(), ...tableAttrs }, slots.value);
      if (option.editable) {
        tableSlot.value = () => renderUIForm({ model: dataRef.value, ref: tableFormRef }, { default: table });
      } else {
        tableSlot.value = table;
      }
    };
    return () => tableSlot.value && h(
      DataProvider,
      { name: "exaProvider", data: { data: dataRef } },
      () => {
        var _a, _b;
        return !searchForm.value || ((_a = option.searchForm) == null ? void 0 : _a.teleport) ? h(
          "div",
          mergeProps(
            {
              ref: wrapRef,
              class: [option.isContainer && "sup-container", "sup-table", "sup-form-section"]
            },
            {
              class: ctxClass,
              style: style2
            }
          ),
          [
            ((_b = option.searchForm) == null ? void 0 : _b.teleport) && h(
              Teleport,
              { to: option.searchForm.teleport },
              h("div", { class: "sup-form-section sup-table-search" }, h(searchForm.value.formNode))
            ),
            tableSlot.value()
          ]
        ) : h(
          "div",
          mergeProps(
            { ref: wrapRef, class: [option.isContainer && "sup-container", "sup-table"] },
            { class: ctxClass, style: style2 }
          ),
          [
            h("div", { class: "sup-form-section sup-table-search" }, h(searchForm.value.formNode)),
            h("div", { class: "sup-form-section section-last" }, h(tableSlot.value))
          ]
        );
      }
    );
  }
});
const useTable = (option, data) => {
  const [tableRef, getTable] = useGetRef();
  const syncOption = Promise.resolve(typeof option === "function" ? option() : option);
  const register = (actions) => {
    if (actions) {
      if (!tableRef.value) {
        syncOption.then(actions.setOption);
        data && actions.setData(data);
      }
      tableRef.value = actions;
    } else if (actions === null) {
      tableRef.value = void 0;
    } else {
      return (props, ctx) => h(_sfc_main$2, { ...props, onRegister: register }, ctx == null ? void 0 : ctx.slots);
    }
  };
  const asyncCall = async (key, param) => {
    const form = await getTable();
    if (key && key in form) {
      if (typeof form[key] === "function") {
        return form[key](param);
      } else {
        return form[key];
      }
    }
  };
  return [
    register,
    {
      /** 异步获取表格引用 */
      getTable,
      tableRef,
      redoHeight() {
        asyncCall("redoHeight");
      },
      setData(data2) {
        asyncCall("setPageData", data2);
      },
      /** 返回当前表格数据 */
      getData() {
        var _a;
        return toValue((_a = tableRef.value) == null ? void 0 : _a.dataRef);
      },
      dataSource: computed(() => {
        var _a;
        return (_a = tableRef.value) == null ? void 0 : _a.dataRef;
      }),
      /** 跳转到指定页 */
      goPage(page) {
        var _a;
        (_a = tableRef.value) == null ? void 0 : _a.goPage(page);
      },
      /** 设置表格列 */
      setColumns(cols) {
        asyncCall("setColumns", cols);
      },
      /** 刷新数据，不改动查询条件与当前页 */
      reload() {
        var _a;
        return (_a = tableRef.value) == null ? void 0 : _a.reload();
      },
      /** 手动执行条件查询，不覆盖搜索表单参数 */
      query(param) {
        var _a;
        return (_a = tableRef.value) == null ? void 0 : _a.query(param);
      },
      /** 查询完成，返回结果回调 */
      onLoaded(callback) {
        asyncCall("onLoaded", callback);
      },
      /** 重置查询表单，并重新查询 */
      resetSearchForm(param) {
        var _a;
        (_a = tableRef.value) == null ? void 0 : _a.resetSearchForm(param);
      },
      getQueryParams: () => {
        var _a;
        return (_a = tableRef.value) == null ? void 0 : _a.getQueryParams();
      },
      // setQueryParams: (params: Obj) => asyncCall('setQueryParams', params),
      selectedRowKeys: computed(() => {
        var _a;
        return (_a = tableRef.value) == null ? void 0 : _a.selectedRowKeys;
      }),
      selectedRows: computed(() => {
        var _a;
        return (_a = tableRef.value) == null ? void 0 : _a.selectedRows;
      }),
      /** 设置选中行 */
      setSelectedRows: (arr) => {
        var _a;
        return (_a = tableRef.value) == null ? void 0 : _a.setSelectedRows(arr);
      },
      expandedRowKeys: computed(() => {
        var _a;
        return (_a = tableRef.value) == null ? void 0 : _a.expandedRowKeys;
      }),
      setExpandedRowKeys: (arr) => {
        var _a;
        return (_a = tableRef.value) == null ? void 0 : _a.setExpandedRowKeys(arr);
      },
      expandAll() {
        asyncCall("expandAll");
      },
      /** 新增行 */
      add: (param) => {
        var _a;
        return (_a = tableRef.value) == null ? void 0 : _a.add(param);
      },
      /** 修改行，须判断是否已有选中行 */
      edit: (param) => {
        var _a;
        return (_a = tableRef.value) == null ? void 0 : _a.edit(param);
      },
      /** 删除行，须判断是否已有选中行 */
      delete: () => {
        var _a;
        return (_a = tableRef.value) == null ? void 0 : _a.delete();
      },
      /** 查看详情，须判断是否已有选中行 */
      detail: (param) => {
        var _a;
        return (_a = tableRef.value) == null ? void 0 : _a.detail(param);
      },
      asyncCall,
      /** `editable`模式下进行表单校验 */
      validate() {
        return asyncCall("validate");
      }
    }
  ];
};
function defineTable(option) {
  return option;
}
const _sfc_main$1 = defineComponent({
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
  setup(props, { slots }) {
    var _a;
    const slotsNode = (_a = slots.default) == null ? void 0 : _a.call(slots);
    const { effectData, ...config } = props;
    const __actions = !slotsNode ? props.actions : slotsNode.flatMap(({ children, props: props2 = {} }) => {
      const { roleName, onClick, confirmText, tooltip, disabledTooltip, icon, ...attrs } = mapKeys(
        props2,
        (_, key) => camelCase(key)
      );
      if (!onClick || !children)
        return [];
      return {
        label: children.default || children,
        icon,
        tooltip,
        disabledTooltip,
        roleName,
        onClick,
        confirmText,
        attrs
      };
    });
    return () => h(_sfc_main$3, { option: { ...config, actions: __actions }, effectData });
  }
});
function useButtons(option) {
  const vNode = () => h(_sfc_main$1, option);
  return [vNode];
}
const _sfc_main = defineComponent({
  props: {
    dataSource: Object,
    schema: Object
  },
  emits: ["register"],
  setup(props, ctx) {
    var _a;
    const option = shallowRef(props.schema || {});
    if (globalConfig.schemaDiagnostics && props.schema)
      reportSchemaDiagnostics(props.schema, "detail", "SuperDetail");
    const dataRef = ref(((_a = props.schema) == null ? void 0 : _a.dataSource) || {});
    watch(
      () => props.dataSource,
      (data) => {
        data && (dataRef.value = data);
      },
      { immediate: true }
    );
    const exposed = {
      setOption: (_option) => {
        if (globalConfig.schemaDiagnostics)
          reportSchemaDiagnostics(_option, "detail", "SuperDetail");
        option.value = _option;
        _option.dataSource && (dataRef.value = _option.dataSource);
      },
      setData: (data) => {
        dataRef.value = data;
      }
    };
    const modelsMap = ref();
    watch(
      option,
      (opt) => {
        if (!(opt == null ? void 0 : opt.subItems))
          return;
        const data = buildModelsMap(opt.subItems, dataRef);
        modelsMap.value = data.modelsMap;
      },
      { immediate: true }
    );
    ctx.expose(exposed);
    ctx.emit("register", exposed);
    provide("exaProvider", readonly({ data: dataRef }));
    provide("rootSlots", ctx.slots);
    return () => modelsMap.value && h(
      "div",
      { class: ["sup-detail", option.value.isContainer && "sup-container"] },
      h(DetailLayouts, {
        option: {
          type: "Descriptions",
          ...option.value
        },
        ...option.value.attrs,
        ...option.value.descriptionsProps,
        modelsMap: modelsMap.value,
        isRoot: true
      })
    );
  }
});
function useDetail(option, data) {
  const source = toRef(data);
  const actionsRef = ref();
  const syncOption = Promise.resolve(typeof option === "function" ? option() : option);
  const register = (actions) => {
    if (actions) {
      if (!actionsRef.value) {
        syncOption.then(actions.setOption);
        if (source.value) {
          watch(
            source,
            (_d) => {
              actions.setData(_d);
            },
            { immediate: true }
          );
        }
      }
      actionsRef.value = actions;
    } else {
      return (props) => h(_sfc_main, { ...props, onRegister: register }, useSlots());
    }
  };
  return [
    register,
    {
      setData(data2) {
        if (actionsRef.value) {
          actionsRef.value.setData(data2);
        } else {
          source.value = data2;
        }
      }
    }
  ];
}
function defineDetail(option) {
  return option;
}
export {
  _sfc_main$1 as SuperButtons,
  _sfc_main as SuperDetail,
  v as SuperForm,
  _sfc_main$2 as SuperTable,
  o as configure,
  x as createModal,
  superform as default,
  defineDetail,
  defineForm,
  defineTable,
  l as defineUIAdapter,
  k as diagnoseSchema,
  n as registerAutoImportedComponents,
  p as registerComponent,
  q as registerComponents,
  t as useAdapter,
  useButtons,
  useDetail,
  w as useForm,
  y as useModal,
  z as useModalForm,
  useTable
};
