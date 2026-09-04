import { globalConfig, defineUIAdapter } from "superform/sdk";
import { defineComponent, inject, computed, h, unref, mergeProps, toRaw } from "vue";
import { Row, Col, Tooltip, CheckableTag, Tag, Divider, Dropdown, Button, Menu, MenuItem, Space, Form, FormItem, SpaceCompact, Card, Tabs, TabPane, Collapse, CollapsePanel } from "antdv-next";
import { PlusOutlined, MinusOutlined, EllipsisOutlined, DownOutlined, UpOutlined, InfoCircleOutlined } from "@antdv-next/icons";
function renderLayout(type, props, slots) {
  return h(type === "row" ? Row : Col, props, slots);
}
const AntdvDescriptions = defineComponent({
  props: {
    items: {
      type: Array,
      required: true
    },
    config: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const gridConfig = inject("gridConfig", {});
    const { subSpan, column } = props.config;
    const {
      layout,
      bordered,
      mode = bordered && "table",
      rowProps,
      colon,
      size = "middle",
      tableLayout,
      ...descriptionsProps
    } = gridConfig;
    let colNum = column || (Number(subSpan) ? Math.floor(24 / subSpan) : gridConfig.column);
    colNum ?? (colNum = Number(gridConfig.subSpan) ? Math.floor(24 / gridConfig.subSpan) : 2);
    function getRowGroup() {
      const group = [];
      let current = [];
      let n = 0;
      props.items.forEach(({ option, label, content, hidden }, idx) => {
        if (unref(hidden))
          return;
        const { span = option.span } = option.descriptionsProps || {};
        let ceil = Number(span) ? Math.ceil(span / (24 / colNum)) : 1;
        ceil = ceil > colNum ? colNum : ceil;
        const attrs = {
          ...descriptionsProps,
          ...option.formItemProps,
          ...option.descriptionsProps
        };
        const labelStyle = {
          ...attrs.labelAlign && { textAlign: attrs.labelAlign },
          ...attrs.labelStyle
        };
        const item = {
          labelCol: mergeProps(attrs.labelCol, {
            style: labelStyle,
            class: { "sup-label-no-colon": attrs.noColon }
          }),
          wrapperCol: mergeProps(
            { style: layout === "vertical" && { textAlign: attrs.labelAlign } },
            { style: attrs.contentStyle },
            attrs.wrapperCol
          ),
          option,
          attrs,
          span,
          label,
          content,
          colspan: ceil
        };
        if (mode === "table") {
          if (n + ceil <= colNum) {
            n += ceil;
            current.push(item);
          } else {
            group.push(current);
            if (n < colNum) {
              const mod = colNum - n;
              current[current.length - 1].colspan += mod;
            }
            n = ceil;
            current = [item];
          }
        } else {
          current.push(item);
        }
        if (option.breakAfter ?? option.wrapping) {
          group.push(current);
          n = 0;
          current = [];
        }
        if (idx === props.items.length - 1 && current.length)
          group.push(current);
      });
      return group;
    }
    const rowGroup = computed(() => getRowGroup());
    if (mode === "table") {
      const rows = () => layout === "vertical" ? rowGroup.value.flatMap((group) => [
        (group.length > 1 || group[0].label) && h(
          "tr",
          { class: "ant-descriptions-row" },
          group.map(
            (item) => {
              var _a;
              return h(
                "th",
                mergeProps(
                  {
                    class: "ant-descriptions-item-label",
                    colspan: item.colspan,
                    style: `width: ${(item.span / 24 * 100).toFixed(2)}%`
                  },
                  { class: item.labelCol.class, style: item.labelCol.style }
                ),
                (_a = item.label) == null ? void 0 : _a.call(item)
              );
            }
          )
        ),
        h(
          "tr",
          { class: "ant-descriptions-row" },
          group.map(
            (item) => h(
              "td",
              mergeProps(
                { class: "ant-descriptions-item-content", colspan: item.colspan },
                { class: item.wrapperCol.class, style: item.wrapperCol.style }
              ),
              item.content()
            )
          )
        )
      ]) : rowGroup.value.map(
        (group) => h(
          "tr",
          { class: "ant-descriptions-row" },
          group.flatMap(
            (item) => !item.label ? [
              h(
                "td",
                { class: "ant-descriptions-item-content", style: item.wrapperCol.style, colspan: item.colspan * 2 },
                item.content()
              )
            ] : [
              h("th", mergeProps({ class: "ant-descriptions-item-label" }, { class: item.labelCol.class, style: item.labelCol.style }), item.label()),
              h(
                "td",
                mergeProps(
                  { class: "ant-descriptions-item-content", style: item.wrapperCol.style, colspan: item.colspan * 2 - 1 },
                  { class: item.wrapperCol.class }
                ),
                item.content()
              )
            ]
          )
        )
      );
      return () => h(
        "div",
        { class: ["ant-descriptions", "ant-descriptions-bordered", size !== "default" && "ant-descriptions-" + size] },
        h("div", { class: "ant-descriptions-view" }, h("table", { style: { tableLayout } }, rows()))
      );
    }
    const render = () => rowGroup.value.map(
      (group) => renderLayout("row", { class: "ant-descriptions-row", ...rowProps }, {
        default: () => group.map(({ option, content, span, label, labelCol, wrapperCol, attrs }) => {
          const colProps = { span, ...attrs.colProps || option.colProps };
          if (colProps.span === 0 || colProps.flex)
            colProps.span = void 0;
          else if (!Number(colProps.span))
            colProps.span = gridConfig.column ? 24 / gridConfig.column : gridConfig.subSpan;
          return renderLayout("col", colProps, {
            default: () => renderLayout("row", { class: ["ant-descriptions-item-container"] }, {
              default: () => [
                label && renderLayout("col", mergeProps({ class: "ant-descriptions-item-label" }, labelCol), { default: () => h("label", {}, label()) }),
                renderLayout("col", { class: "ant-descriptions-item-content", ...wrapperCol }, {
                  default: () => !attrs.noInput && mode === "form" && label !== void 0 ? h("div", { class: "sup-descriptions-item-input" }, content()) : content()
                })
              ]
            })
          });
        })
      })
    );
    return () => h(
      "div",
      {
        class: [
          "ant-descriptions",
          layout === "vertical" && "ant-descriptions-vertical",
          mode === "form" ? "sup-descriptions-mode-form" : "sup-descriptions-default",
          colon === false && "ant-descriptions-item-no-colon",
          size && size !== "default" && "ant-descriptions-" + size
        ]
      },
      h("div", { class: "ant-descriptions-view" }, render())
    );
  }
});
const SuperListItem = defineComponent({
  name: "SuperListItem",
  inheritAttrs: false,
  setup(_, { attrs, slots }) {
    return () => {
      var _a;
      return h("li", { ...attrs, class: ["sup-list-item", attrs.class] }, (_a = slots.default) == null ? void 0 : _a.call(slots));
    };
  }
});
const SuperList = defineComponent({
  name: "SuperList",
  inheritAttrs: false,
  props: {
    dataSource: { type: Array, default: () => [] }
  },
  setup(props, { attrs, slots }) {
    return () => h("section", { ...attrs, class: ["sup-list", attrs.class] }, [
      slots.header && h("header", { class: "sup-list-header" }, slots.header()),
      h(
        "ul",
        { class: "sup-list-items" },
        props.dataSource.map((item, index) => {
          var _a;
          return (_a = slots.renderItem) == null ? void 0 : _a.call(slots, { item, index });
        })
      )
    ]);
  }
});
function toNode$1(node, param = {}) {
  if (!node)
    return null;
  if (typeof node === "function")
    return node(param || {}, {});
  return typeof node !== "object" ? h("span", node) : h(node, { effectData: param });
}
function renderAntdvIcon(icon, { customIcon } = {}) {
  if (typeof icon === "string")
    return (customIcon == null ? void 0 : customIcon(icon)) || h("span", { class: `anticon ${icon}` });
  return icon ? h(toRaw(icon)) : void 0;
}
function stopActionEvent(event) {
  var _a, _b;
  (_b = (_a = (event == null ? void 0 : event.domEvent) || event) == null ? void 0 : _a.stopPropagation) == null ? void 0 : _b.call(_a);
}
function renderActionContent(button, effectData, labelOnly, iconOnly, customIcon) {
  return [
    button.icon && !labelOnly ? renderAntdvIcon(button.icon, { customIcon }) : void 0,
    !button.icon || !iconOnly ? toNode$1(button.label, effectData) : void 0
  ];
}
function renderActionButton(button, effectData, labelOnly, iconOnly, customIcon) {
  var _a;
  const attrs = { ...button.attrs, disabled: unref((_a = button.attrs) == null ? void 0 : _a.disabled) };
  const callAction = (event) => {
    var _a2;
    stopActionEvent(event);
    (_a2 = button.onClick) == null ? void 0 : _a2.call(button, event);
  };
  const menu = unref(button.menu);
  let content;
  if (menu) {
    content = h(
      Dropdown,
      { disabled: attrs.disabled, ...button.dropdownProps },
      {
        popupRender: () => h(Menu, { onClick: callAction }, () => menu.map((item) => h(MenuItem, { key: item.value, disabled: item.disabled }, {
          icon: item.icon ? () => renderAntdvIcon(item.icon, { customIcon }) : void 0,
          default: () => toNode$1(item.label, effectData)
        }))),
        default: () => h(Button, attrs, () => [...renderActionContent(button, effectData, labelOnly, iconOnly, customIcon), h(DownOutlined)])
      }
    );
  } else if (button.render) {
    content = button.render({ props: attrs, ...effectData });
  } else {
    content = h(Button, { ...attrs, onClick: callAction }, () => renderActionContent(button, effectData, labelOnly, iconOnly, customIcon));
  }
  return h(Tooltip, { title: unref(button.tooltipTitle) }, { default: () => content });
}
function renderActionGroup(props, customIcon) {
  const { groupProps, buttons, moreButtons, defaultButtonProps, divider, labelOnly, iconOnly, moreLabel, effectData } = props;
  const content = buttons.flatMap((button, index) => [
    renderActionButton(button, effectData, labelOnly, iconOnly, customIcon),
    divider && index < buttons.length - 1 ? h(Divider, { type: "vertical", class: "sup-buttons-divider" }) : void 0
  ]);
  if (moreButtons.length) {
    content.push(h(Dropdown, {}, {
      default: () => h(Button, defaultButtonProps, () => moreLabel ? toNode$1(moreLabel, effectData) : h(EllipsisOutlined)),
      popupRender: () => h(Menu, {}, () => moreButtons.map((button) => {
        var _a;
        return h(MenuItem, {
          key: button.label,
          disabled: unref((_a = button.attrs) == null ? void 0 : _a.disabled),
          onClick: (event) => {
            var _a2;
            stopActionEvent(event);
            (_a2 = button.onClick) == null ? void 0 : _a2.call(button, event);
          }
        }, {
          icon: button.icon ? () => renderAntdvIcon(button.icon, { customIcon }) : void 0,
          default: () => toNode$1(button.label, effectData)
        });
      }))
    }));
  }
  return h(Space, { size: divider ? 0 : "small", ...groupProps, class: ["sup-buttons", groupProps == null ? void 0 : groupProps.class] }, () => content);
}
const fixedComponents = {
  Form,
  FormItem,
  Row,
  Col,
  Space,
  SpaceCompact,
  Card,
  Tabs,
  TabPane,
  Collapse,
  CollapsePanel,
  Button,
  Divider,
  Dropdown,
  Menu,
  MenuItem,
  Tooltip,
  Tag,
  CheckableTag
};
function createAntdvCapabilities() {
  const components = fixedComponents;
  return {
    components,
    form: {
      component: "Form",
      item: "FormItem",
      validate: (instance) => instance.validate(),
      clearValidate: (instance) => instance.clearValidate()
    },
    layout: { row: "Row", col: "Col", space: "Space", compactSpace: "SpaceCompact" },
    containers: {
      card: { component: "Card" },
      tabs: {
        component: "Tabs",
        model: { prop: "activeKey", event: "update:activeKey" },
        render(component, props, slots) {
          const { extra, ...restSlots } = slots;
          return h(component, props, extra ? { ...restSlots, rightExtra: extra } : restSlots);
        }
      },
      tab: {
        component: "TabPane",
        transformProps(props) {
          const { label, ...rest } = props;
          return { ...rest, tab: label };
        }
      },
      collapse: { component: "Collapse", model: { prop: "activeKey", event: "update:activeKey" } },
      collapsePanel: {
        component: "CollapsePanel",
        transformProps(props) {
          const { disabled, ...rest } = props;
          return { ...rest, collapsible: disabled ? "disabled" : void 0 };
        }
      },
      list: { component: SuperList },
      listItem: { component: SuperListItem },
      descriptions: { component: AntdvDescriptions }
    },
    icons: {
      semantic: { add: PlusOutlined, remove: MinusOutlined, more: EllipsisOutlined, expand: DownOutlined, collapse: UpOutlined, info: InfoCircleOutlined },
      render: renderAntdvIcon
    },
    actions: {
      render: (type, props, slots) => type === "group" ? renderActionGroup(props, globalConfig.customIcon) : h(Tooltip, props, slots)
    },
    presentation: {
      render(type, props, slots) {
        if (type === "checkableTag") {
          const { selected, onSelectedChange, ...rest2 } = props;
          return h(CheckableTag, { ...rest2, checked: selected, onChange: onSelectedChange }, slots);
        }
        const { removable, onRemove, ...rest } = props;
        return h(Tag, { ...rest, closable: removable, onClose: onRemove }, slots);
      }
    }
  };
}
const antdvCapabilities = createAntdvCapabilities();
function toNode(node, param = {}) {
  if (!node)
    return null;
  if (typeof node === "function")
    return node(param || {}, {});
  return typeof node !== "object" ? h("span", node) : h(node, { effectData: param });
}
function mapChangeEvent(props, normalize = (value) => [value]) {
  const { onValueChange, onChange, ...rest } = props;
  if (!onValueChange)
    return props;
  return {
    ...rest,
    onChange: (...args) => {
      onValueChange(...normalize(...args));
      return onChange == null ? void 0 : onChange(...args);
    }
  };
}
function createAntdvFields() {
  return {
    Input: {
      component: "Input",
      processors: ["input"],
      transformProps(props, { option }) {
        return { placeholder: `请输入${option.label ?? ""}`, ...props };
      },
      render(component, props, _context, slots) {
        const { search, searchLoading, addonAfter, enterButton, ...rest } = props;
        if (!search)
          return h(component, { ...rest, addonAfter }, slots);
        const { addonAfter: addonAfterSlot, ...restSlots } = slots;
        let enterButtonSlot = slots.enterButton || (enterButton ? void 0 : addonAfterSlot);
        const enterButtonProp = enterButton || addonAfter;
        if (!enterButtonSlot && enterButtonProp && typeof enterButtonProp === "object") {
          const { label, icon, ...buttonProps } = enterButtonProp;
          enterButtonSlot = () => [h(Button, { loading: searchLoading, ...buttonProps }, {
            icon: () => renderAntdvIcon(icon, { customIcon: globalConfig.customIcon }),
            default: () => toNode(label)
          })];
        } else if (!enterButtonSlot && typeof enterButtonProp === "function") {
          enterButtonSlot = () => [h(Button, { type: "primary", loading: searchLoading }, enterButtonProp)];
        }
        return h(component.Search || component, { ...rest, enterButton: enterButtonSlot ? void 0 : enterButtonProp }, enterButtonSlot ? { ...restSlots, enterButton: enterButtonSlot } : restSlots);
      }
    },
    TextArea: {
      component: "TextArea",
      transformProps(props, { option }) {
        return { allowClear: true, placeholder: `请输入${option.label ?? ""}`, ...props, style: [{ width: "100%" }, props.style] };
      }
    },
    InputNumber: {
      component: "InputNumber",
      transformProps(props, { option }) {
        return { type: "number", placeholder: `请输入${option.label ?? ""}`, ...props, style: [{ width: "100%" }, props.style] };
      }
    },
    AutoComplete: {
      component: "AutoComplete",
      processors: ["autoComplete"],
      transformProps(props, { option }) {
        return { filterOption: true, placeholder: `请输入${option.label ?? ""}`, ...props };
      }
    },
    Select: {
      component: "Select",
      processors: ["select"],
      transformProps(props, { option }) {
        return mapChangeEvent({ optionFilterProp: "label", placeholder: `请选择${option.label ?? ""}`, ...props });
      }
    },
    Radio: { component: "Radio", model: { prop: "checked", event: "update:checked" } },
    RadioGroup: { component: "RadioGroup", processors: ["radioGroup"], transformProps: (props) => mapChangeEvent(props, (event) => {
      var _a;
      return [(_a = event == null ? void 0 : event.target) == null ? void 0 : _a.value];
    }) },
    Checkbox: { component: "Checkbox", model: { prop: "checked", event: "update:checked" } },
    CheckboxGroup: { component: "CheckboxGroup", processors: ["checkboxGroup"], transformProps: (props) => mapChangeEvent(props) },
    DatePicker: { component: "DatePicker", processors: ["picker"] },
    DateRangePicker: { component: "DateRangePicker", processors: ["picker"] },
    TimePicker: { component: "TimePicker", processors: ["picker"] },
    TimeRangePicker: { component: "TimeRangePicker", processors: ["picker"] },
    TreeSelect: {
      component: "TreeSelect",
      processors: ["treeSelect"],
      transformProps(props, { option }) {
        return mapChangeEvent({ allowClear: true, placeholder: `请选择${option.label ?? ""}`, ...props }, (value, labels) => [value, Array.isArray(value) ? labels : Array.isArray(labels) ? labels[0] : labels]);
      }
    },
    Switch: {
      component: "Switch",
      processors: ["switch"],
      model: { prop: "checked", event: "update:checked" },
      transformProps(props) {
        const { trueValue, falseValue, trueLabel, falseLabel, ...rest } = props;
        return { ...rest, checkedValue: trueValue, unCheckedValue: falseValue, checkedChildren: trueLabel, unCheckedChildren: falseLabel };
      }
    },
    Rate: { component: "Rate" }
  };
}
const antdvFields = createAntdvFields();
const antdvDefaults = {
  FormItem: { validateFirst: true },
  Table: { size: "small" },
  TimePicker: { valueFormat: "HH:mm:ss" },
  TimeRangePicker: { valueFormat: "HH:mm:ss" },
  DatePicker: { valueFormat: "YYYY-MM-DD" },
  DateRangePicker: { valueFormat: "YYYY-MM-DD" }
};
function createAntdvAdapter(options = {}) {
  return defineUIAdapter({
    name: "antdv-next",
    ...createAntdvCapabilities(),
    fields: createAntdvFields(),
    fieldComponents: options.components,
    defaults: {
      FormItem: { validateFirst: true },
      Table: { size: "small" },
      TimePicker: { valueFormat: "HH:mm:ss" },
      TimeRangePicker: { valueFormat: "HH:mm:ss" },
      DatePicker: { valueFormat: "YYYY-MM-DD" },
      DateRangePicker: { valueFormat: "YYYY-MM-DD" }
    }
  });
}
const antdvAdapter = createAntdvAdapter();
export {
  antdvAdapter,
  antdvCapabilities,
  antdvDefaults,
  antdvFields,
  createAntdvAdapter,
  createAntdvCapabilities,
  createAntdvFields,
  antdvAdapter as default,
  renderAntdvIcon
};
