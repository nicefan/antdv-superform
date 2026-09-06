import { describe, expect, it, vi } from "vitest";
import { ElForm, ElPagination, ElTable, ElTableColumn } from "element-plus";
import {
  createElementPlusAdapter,
  elementPlusAdapter,
} from "../packages/superform-element-plus/src/adapter";
import { fieldComponents } from "../packages/superform-element-plus/src/fieldComponents";

describe("Element Plus 最小 Adapter", () => {
  it("在内部 Adapter 中提供 P005 表单能力", () => {
    expect(elementPlusAdapter.form?.component).toBe("Form");
    expect(elementPlusAdapter.components.Form).toBe(ElForm);
    expect(elementPlusAdapter.components).not.toHaveProperty("Input");
    expect(elementPlusAdapter.components).not.toHaveProperty("Select");
    expect(elementPlusAdapter.components).not.toHaveProperty("Switch");
    expect(elementPlusAdapter.fields?.Input?.processors).toEqual(["input"]);
    expect(elementPlusAdapter.fields?.Select?.processors).toEqual(["select"]);
    expect(elementPlusAdapter.fields?.Switch?.processors).toEqual(["switch"]);
    expect(elementPlusAdapter.containers).toHaveProperty("tabs");
    expect(elementPlusAdapter.actions).toBeDefined();
    expect(elementPlusAdapter.presentation).toBeDefined();
    expect(elementPlusAdapter.services).toBeDefined();
    expect(elementPlusAdapter.modal).toBeDefined();
    expect(elementPlusAdapter.upload).toBeDefined();
    expect(elementPlusAdapter.preview).toBeDefined();
    expect(elementPlusAdapter.table).toBeDefined();
  });

  it("Rate 使用无 El 前缀的 Schema 名称，但不直接引入组件", () => {
    expect(elementPlusAdapter.components).not.toHaveProperty("Rate");
    expect(elementPlusAdapter.fields?.Rate).toEqual({
      component: "Rate",
      model: { prop: "modelValue", event: "update:modelValue" },
    });
  });

  it("全量组件表使用无 El 前缀注册全部字段组件", () => {
    expect(Object.keys(fieldComponents)).toEqual([
      "Input",
      "Select",
      "Switch",
      "Rate",
    ]);
    expect(
      createElementPlusAdapter({ components: fieldComponents }).fieldComponents
    ).toEqual(fieldComponents);
  });

  it("Table capability 映射列、选择、展开和分页协议", () => {
    const onSelectionChange = vi.fn();
    const onExpandedChange = vi.fn();
    const onPageChange = vi.fn();
    const rendered = elementPlusAdapter.table?.render(
      {
        data: [{ id: 1, name: "A" }],
        columns: [{ dataIndex: "name", title: "名称" }],
        rowKey: "id",
        selection: { selectedKeys: [1], onChange: onSelectionChange },
        expandedKeys: [],
        onExpandedChange,
        pagination: {
          current: 1,
          pageSize: 10,
          total: 20,
          onChange: onPageChange,
        },
      },
      { headerCell: ({ title }) => title }
    ) as any;

    expect(rendered.type).toBe("div");
    const [table, pagination] = rendered.children;
    expect(table.type).toBe(ElTable);
    expect(pagination.type).toBe(ElPagination);
    const columns = table.children.default();
    expect(columns[0].type).toBe(ElTableColumn);
    expect(columns[0].props.type).toBe("selection");
    expect(columns[1].type).toBe(ElTableColumn);
    expect(columns[1].props.prop).toBe("name");

    table.props.onExpandChange({ id: 1 }, true);
    expect(onExpandedChange).toHaveBeenCalledWith([1]);
    table.props.onSelectionChange([{ id: 1 }]);
    expect(onSelectionChange).toHaveBeenCalledWith([1], [{ id: 1 }], {});
    pagination.props["onUpdate:pageSize"](20);
    expect(onPageChange).toHaveBeenCalledWith(1, 20);
  });
});
