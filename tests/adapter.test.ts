import { beforeAll, describe, expect, it, vi } from "vitest";
import { defineComponent } from "vue";
import {
  Checkbox,
  Input,
  Radio,
  Table,
  TextArea,
  TimeRangePicker,
  Upload,
} from "antdv-next";
import plugin, { globalProps } from "../src/plugin";
import {
  clearUIFormValidation,
  defineUIAdapter,
  getUIAdapter,
  getUIFieldAdapter,
  mapUIContainerProps,
  mapUIFieldProps,
  renderUIContainer,
  renderUIForm,
  renderUIFormItem,
  renderUIAction,
  renderUIPresentation,
  renderUILayout,
  renderUISemanticIcon,
  renderUIModal,
  renderUIUpload,
  renderUIPreview,
  renderUITable,
  registerUIComponents,
  resolveUIComponent,
  validateUIForm,
} from "../src/adapter";
import { antdvAdapter } from "../packages/superform-antdv/src/adapter";
import { getFormComponent } from "../src/components";
import { buildInnerNode } from "../src/components/Collections";
import FieldProcessorRenderer from "../src/components/processors/FieldProcessorRenderer";

beforeAll(() => {
  plugin.useAdapter(antdvAdapter);
  registerUIComponents({ Checkbox, Input, Radio, TextArea, TimeRangePicker });
});

describe("UIAdapter", () => {
  it("显式初始化 AntDV Adapter 后可解析字段组件协议", () => {
    expect(getUIAdapter()).toBe(antdvAdapter);
    expect(resolveUIComponent("Input")).toBe(Input);
    expect(resolveUIComponent("TimeRangePicker")).toBe(TimeRangePicker);
    expect(getUIFieldAdapter("Switch")?.model).toEqual({
      prop: "checked",
      event: "update:checked",
    });
  });

  it("UI 字段只使用真实组件名，不注册旧别名", () => {
    expect(resolveUIComponent("TextArea")).toBe(TextArea);
    expect(resolveUIComponent("TimeRangePicker")).toBe(TimeRangePicker);
    expect(getFormComponent("RadioGroup")).toBeUndefined();
    expect(getFormComponent("CheckboxGroup")).toBeUndefined();
    expect(getUIFieldAdapter("RadioGroup")?.processors).toEqual(["radioGroup"]);
    expect(getUIFieldAdapter("CheckboxGroup")?.processors).toEqual([
      "checkboxGroup",
    ]);

    const aliases = ["Textarea", "DateRange", "TimeRange"];
    aliases.forEach((type) => {
      expect(resolveUIComponent(type)).toBeUndefined();
      expect(getFormComponent(type)).toBeUndefined();
    });

    const rawCheckedComponents = ["Radio", "Checkbox"];
    rawCheckedComponents.forEach((type) => {
      expect(resolveUIComponent(type)).toBe(
        type === "Radio" ? Radio : Checkbox
      );
      expect(getFormComponent(type)).toBeUndefined();
      expect(getUIFieldAdapter(type)?.model).toEqual({
        prop: "checked",
        event: "update:checked",
      });
    });
  });

  it("普通 UI 字段由 Adapter 补充默认属性后直接渲染", () => {
    expect(
      mapUIFieldProps(
        "TextArea",
        { value: "说明" },
        {
          option: { label: "备注" },
          effectData: {},
        }
      )
    ).toMatchObject({
      value: "说明",
      allowClear: true,
      placeholder: "请输入备注",
    });
  });

  it("字段处理器不会把组件的 type 属性误认为 Schema 字段类型", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => undefined);
    const render = buildInnerNode(
      { type: "Input" },
      { refData: undefined, parent: {}, propChain: [] },
      {},
      { type: "number" }
    );

    const vnode = render?.();
    warn.mockRestore();

    expect(vnode?.type).toBe(FieldProcessorRenderer);
    expect(vnode?.props).toMatchObject({
      fieldType: "Input",
      type: "number",
    });
  });

  it("AntDV Adapter 将字段 change 参数转换为 Core 标准值", () => {
    const onValueChange = vi.fn();
    const onChange = vi.fn();
    const context = { option: {}, effectData: {} };

    const selectProps = mapUIFieldProps(
      "Select",
      { onValueChange, onChange },
      context
    );
    selectProps.onChange("published", { label: "发布", value: "published" });
    expect(onValueChange).toHaveBeenLastCalledWith("published");
    expect(onChange).toHaveBeenCalledWith("published", {
      label: "发布",
      value: "published",
    });

    const radioProps = mapUIFieldProps(
      "RadioGroup",
      { onValueChange },
      context
    );
    radioProps.onChange({ target: { value: "important" } });
    expect(onValueChange).toHaveBeenLastCalledWith("important");

    const treeProps = mapUIFieldProps("TreeSelect", { onValueChange }, context);
    treeProps.onChange("root", ["根节点"]);
    expect(onValueChange).toHaveBeenLastCalledWith("root", "根节点");
  });

  it("Adapter 默认值先于用户 defaultProps 合并", () => {
    plugin.configure({
      defaultProps: {
        FormItem: { validateFirst: false },
      },
    });

    expect(getUIAdapter()).toBe(antdvAdapter);
    expect(globalProps.FormItem).toEqual({ validateFirst: false });
    expect(globalProps.TimeRangePicker).toEqual({ valueFormat: "HH:mm:ss" });
  });

  it("通过 Adapter 渲染表单、表单项和布局原语", () => {
    expect(renderUIForm({ model: {} }).type).toBe(antdvAdapter.components.Form);
    expect(renderUIFormItem({ name: ["name"] }).type).toBe(
      antdvAdapter.components.FormItem
    );
    expect(renderUILayout("row", { gutter: 16 }).type).toBe(
      antdvAdapter.components.Row
    );
    expect(renderUILayout("col", { span: 8 }).type).toBe(
      antdvAdapter.components.Col
    );
    expect(renderUILayout("space").type).toBe(antdvAdapter.components.Space);
    expect(renderUILayout("compactSpace").type).toBe(
      antdvAdapter.components.SpaceCompact
    );
  });

  it("通过 Form capability 调用 UI 表单实例", async () => {
    const instance = {
      validate: vi.fn().mockResolvedValue({ name: "张三" }),
      clearValidate: vi.fn(),
    };

    await expect(validateUIForm(instance)).resolves.toEqual({ name: "张三" });
    clearUIFormValidation(instance);
    expect(instance.validate).toHaveBeenCalledOnce();
    expect(instance.clearValidate).toHaveBeenCalledOnce();
  });

  it("通过容器 capability 转换受控状态和 UI 专属属性", () => {
    const onUpdate = vi.fn();
    expect(
      mapUIContainerProps("tabs", { value: "base", "onUpdate:value": onUpdate })
    ).toEqual({
      activeKey: "base",
      "onUpdate:activeKey": onUpdate,
    });
    expect(mapUIContainerProps("collapsePanel", { disabled: true })).toEqual({
      collapsible: "disabled",
    });
    expect(renderUIContainer("card").type).toBe(antdvAdapter.components.Card);
    expect(renderUIContainer("list").type).toBe(
      antdvAdapter.containers?.list?.component
    );
    expect(antdvAdapter.components).not.toHaveProperty("SuperList");
  });

  it("通过 Adapter 渲染动作、展示原语和语义图标", () => {
    expect(renderUIAction("tooltip", { title: "提示" }).type).toBe(
      antdvAdapter.components.Tooltip
    );
    expect(
      renderUIAction("group", {
        groupProps: {},
        buttons: [],
        moreButtons: [],
        defaultButtonProps: {},
        effectData: {},
      }).type
    ).toBe(antdvAdapter.components.Space);
    expect((renderUISemanticIcon("add") as any)?.type).toBe(
      "svg"
    );
    expect((renderUISemanticIcon("remove") as any)?.type).toBe(
      "svg"
    );
    expect(renderUIPresentation("tag").type).toBe(antdvAdapter.components.Tag);
    expect((renderUIModal({ visible: true }) as any).props?.open).toBe(true);
    expect((renderUIUpload() as any).type).toBe(Upload);
    expect(renderUIPreview({ images: [], visible: false })).toBeTruthy();
  });

  it("AntDV Table capability 映射选择、展开和分页协议", () => {
    const onSelectionChange = vi.fn();
    const onExpandedChange = vi.fn();
    const onPageChange = vi.fn();
    const vnode = renderUITable({
      data: [{ id: 1 }],
      columns: [],
      rowKey: "id",
      selection: {
        selectedKeys: [1],
        onChange: onSelectionChange,
        isRowSelectable: () => false,
      },
      expandedKeys: [1],
      onExpandedChange,
      pagination: {
        current: 1,
        pageSize: 10,
        total: 20,
        onChange: onPageChange,
      },
    }) as any;

    expect(vnode.type).toBe(Table);
    expect(vnode.props.dataSource).toEqual([{ id: 1 }]);
    expect(vnode.props.rowSelection.selectedRowKeys).toEqual([1]);
    expect(vnode.props.rowSelection.onChange).toBe(onSelectionChange);
    expect(vnode.props.rowSelection.getCheckboxProps({ id: 1 })).toEqual({
      disabled: true,
    });
    expect(vnode.props.expandedRowKeys).toEqual([1]);
    expect(vnode.props["onUpdate:expandedRowKeys"]).toBe(onExpandedChange);
    expect(vnode.props.pagination.onChange).toBe(onPageChange);
  });

  it("AntDV Action/Presentation 在 Adapter 内转换内部 UI 协议", () => {
    const onClick = vi.fn();
    const stopPropagation = vi.fn();
    const group = renderUIAction("group", {
      groupProps: {},
      buttons: [{ attrs: {}, label: "保存", onClick }],
      moreButtons: [],
      defaultButtonProps: {},
      divider: false,
      labelOnly: false,
      iconOnly: false,
      effectData: {},
    });
    const tooltip = (group.children as Obj).default()[0];
    const button = tooltip.children.default();
    const event = { stopPropagation };
    button.props.onClick(event);

    expect(stopPropagation).toHaveBeenCalledOnce();
    expect(onClick).toHaveBeenCalledWith(event);

    const onSelectedChange = vi.fn();
    const checkableTag = renderUIPresentation("checkableTag", {
      selected: true,
      onSelectedChange,
    });
    expect(checkableTag.props).toMatchObject({
      checked: true,
      onChange: onSelectedChange,
    });

    const onRemove = vi.fn();
    const tag = renderUIPresentation("tag", { removable: true, onRemove });
    expect(tag.props).toMatchObject({ closable: true, onClose: onRemove });
  });

  it("初始化后拒绝切换为其他 Adapter", () => {
    const adapter = defineUIAdapter({
      name: "other-ui",
      components: { Input: defineComponent(() => () => null) },
    });

    expect(() => plugin.useAdapter(adapter)).toThrow("不能切换为 'other-ui'");
    expect(getUIAdapter()).toBe(antdvAdapter);
  });

  it("初始化前读取 Adapter 时提供明确错误", async () => {
    vi.resetModules();
    const freshAdapterModule = await import("../src/adapter");

    expect(() => freshAdapterModule.getUIAdapter()).toThrow(
      "尚未初始化 UIAdapter"
    );
  });

  it("手动字段组件始终优先于自动导入", async () => {
    vi.resetModules();
    const {
      defineUIAdapter,
      initializeUIAdapter,
      registerUIComponents,
      resolveUIComponent,
    } = await import("../src/adapter");
    const ManualInput = defineComponent(() => () => null);
    const AutoInput = defineComponent(() => () => null);
    const ManualRate = defineComponent(() => () => null);
    const AutoRate = defineComponent(() => () => null);

    registerUIComponents({ Input: AutoInput, Rate: AutoRate }, "auto");
    initializeUIAdapter(
      defineUIAdapter({
        name: "priority-ui",
        components: {},
        fields: {
          Input: { component: "Input" },
          Rate: { component: "Rate" },
        },
        fieldComponents: { Input: ManualInput },
      })
    );
    registerUIComponents({ Input: AutoInput }, "auto");
    registerUIComponents({ Rate: ManualRate }, "manual");

    expect(resolveUIComponent("Input")).toBe(ManualInput);
    expect(resolveUIComponent("Rate")).toBe(ManualRate);
  });

  it("非 AntDV Adapter 可以消费 Core 标准字段和复合组件协议", async () => {
    vi.resetModules();
    const {
      defineUIAdapter,
      initializeUIAdapter,
      mapUIFieldProps,
      registerUIComponents,
      renderUIAction,
      renderUIPresentation,
    } = await import("../src/adapter");
    const Field = defineComponent(() => () => null);
    const adapter = defineUIAdapter({
      name: "simple-ui",
      components: {},
      fields: {
        Choice: {
          component: "ChoiceField",
          transformProps(props) {
            const { onValueChange, ...rest } = props;
            return { ...rest, onSelect: onValueChange };
          },
        },
      },
      actions: {
        render(type) {
          return `action:${type}`;
        },
      },
      presentation: {
        render(type) {
          return `presentation:${type}`;
        },
      },
    });
    initializeUIAdapter(adapter);
    registerUIComponents({ ChoiceField: Field });

    const onValueChange = vi.fn();
    const mapped = mapUIFieldProps(
      "Choice",
      { onValueChange },
      { option: {}, effectData: {} }
    );
    mapped.onSelect("selected");

    expect(mapped).not.toHaveProperty("onValueChange");
    expect(onValueChange).toHaveBeenCalledWith("selected");
    expect(renderUIAction("group")).toBe("action:group");
    expect(renderUIPresentation("checkableTag")).toBe(
      "presentation:checkableTag"
    );
  });
});
