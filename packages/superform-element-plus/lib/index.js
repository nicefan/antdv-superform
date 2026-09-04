import { toNode, defineUIAdapter } from "superform/sdk";
import { defineComponent, h, toRaw, unref } from "vue";
import { ElForm, ElFormItem, ElRow, ElCol, ElSpace, ElCard, ElTabs, ElTabPane, ElTooltip, ElCheckTag, ElTag, ElButton, ElOption } from "element-plus";
const AddIcon = defineComponent({
  name: "SuperFormElementPlusAddIcon",
  setup: () => () => h("span", { "aria-hidden": "true" }, "+")
});
function renderButton(button, effectData) {
  var _a;
  const attrs = { ...button.attrs, disabled: unref((_a = button.attrs) == null ? void 0 : _a.disabled) };
  if (button.render)
    return button.render({ props: attrs, ...effectData });
  return h(
    ElTooltip,
    { content: unref(button.tooltipTitle), disabled: !unref(button.tooltipTitle) },
    {
      default: () => h(ElButton, { ...attrs, onClick: (event) => {
        var _a2;
        return (_a2 = button.onClick) == null ? void 0 : _a2.call(button, event);
      } }, () => toNode(button.label, effectData))
    }
  );
}
const elementPlusCapabilities = {
  components: {
    Form: ElForm,
    FormItem: ElFormItem,
    Row: ElRow,
    Col: ElCol,
    Space: ElSpace,
    Card: ElCard,
    Tabs: ElTabs,
    TabPane: ElTabPane
  },
  form: {
    component: "Form",
    item: "FormItem",
    validate: (instance) => instance.validate(),
    clearValidate: (instance) => instance.clearValidate()
  },
  layout: {
    row: "Row",
    col: "Col",
    space: "Space"
  },
  containers: {
    card: { component: "Card" },
    tabs: {
      component: "Tabs",
      model: { prop: "modelValue", event: "update:modelValue" }
    },
    tab: {
      component: "TabPane",
      render(component, props, slots) {
        const { label, ...rest } = props;
        return h(component, rest, { ...slots, label });
      }
    }
  },
  icons: {
    semantic: { add: AddIcon },
    render(icon) {
      return typeof icon === "string" ? h("span", icon) : icon ? h(toRaw(icon)) : void 0;
    }
  },
  actions: {
    render(type, props, slots) {
      if (type === "tooltip") {
        const { title, ...rest } = props;
        return h(ElTooltip, { ...rest, content: title }, slots);
      }
      const { buttons, moreButtons, groupProps, effectData } = props;
      return h(
        ElSpace,
        groupProps,
        () => [...buttons, ...moreButtons].map((button) => renderButton(button, effectData))
      );
    }
  },
  presentation: {
    render(type, props, slots) {
      if (type === "checkableTag") {
        const { selected, onSelectedChange, ...rest2 } = props;
        return h(ElCheckTag, { ...rest2, checked: selected, onChange: onSelectedChange }, slots);
      }
      const { removable, onRemove, ...rest } = props;
      return h(ElTag, { ...rest, closable: removable, onClose: onRemove }, slots);
    }
  }
};
const inputField = {
  component: "Input",
  model: { prop: "modelValue", event: "update:modelValue" },
  processors: ["input"],
  transformProps(props, { option }) {
    return { placeholder: `请输入${option.label ?? ""}`, ...props };
  },
  render(component, props, _context, slots) {
    const { search, searchLoading, ...rest } = props;
    if (!search)
      return h(component, rest, slots);
    return h(component, rest, {
      ...slots,
      append: slots.append || (() => h(ElButton, { loading: searchLoading, onClick: () => {
        var _a;
        return (_a = props.onSearch) == null ? void 0 : _a.call(props, props.modelValue);
      } }, () => "搜索"))
    });
  }
};
const elementPlusFields = {
  Input: inputField,
  Switch: {
    component: "Switch",
    processors: ["switch"],
    model: { prop: "modelValue", event: "update:modelValue" },
    transformProps(props) {
      const { trueValue, falseValue, trueLabel, falseLabel, ...rest } = props;
      return {
        ...rest,
        activeValue: trueValue,
        inactiveValue: falseValue,
        activeText: trueLabel,
        inactiveText: falseLabel
      };
    }
  },
  Select: {
    component: "Select",
    processors: ["select"],
    model: { prop: "modelValue", event: "update:modelValue" },
    transformProps(props, { option }) {
      const { options, onValueChange, onChange, ...rest } = props;
      return {
        placeholder: `请选择${option.label ?? ""}`,
        ...rest,
        options,
        onChange: (value) => {
          onValueChange == null ? void 0 : onValueChange(value);
          onChange == null ? void 0 : onChange(value);
        }
      };
    },
    render(component, props, _context, slots) {
      const { options = [], ...rest } = props;
      return h(component, rest, {
        ...slots,
        default: () => options.map((item) => h(ElOption, item))
      });
    }
  },
  Rate: {
    component: "Rate",
    model: { prop: "modelValue", event: "update:modelValue" }
  }
};
const elementPlusDefaults = {
  FormItem: { validateEvent: true }
};
function createElementPlusAdapter(options = {}) {
  return defineUIAdapter({
    name: "element-plus",
    ...elementPlusCapabilities,
    fields: elementPlusFields,
    fieldComponents: options.components,
    defaults: elementPlusDefaults
  });
}
const elementPlusAdapter = createElementPlusAdapter();
export {
  createElementPlusAdapter,
  elementPlusAdapter as default,
  elementPlusAdapter,
  elementPlusCapabilities,
  elementPlusDefaults,
  elementPlusFields
};
