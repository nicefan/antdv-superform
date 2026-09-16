import type { Component } from "vue";
import { defineUIAdapter, type UIAdapter } from "superform/sdk";
import { createAntdvCapabilities } from "./antdv/capabilities";
import { createAntdvFields } from "./antdv/fields";
import "./antdv/schemaTypes";

export interface AntdvAdapterOptions {
  /** 不使用自动导入插件时，显式提供实际使用的字段组件。 */
  components?: Partial<Record<AntdvFieldName, Component>>;
}

export type AntdvFieldName =
  | "Input"
  | "TextArea"
  | "InputNumber"
  | "InputOTP"
  | "InputPassword"
  | "InputSearch"
  | "AutoComplete"
  | "Cascader"
  | "ColorPicker"
  | "Select"
  | "Radio"
  | "RadioGroup"
  | "Checkbox"
  | "CheckboxGroup"
  | "DatePicker"
  | "DateRangePicker"
  | "DateMonthPicker"
  | "DateQuarterPicker"
  | "DateWeekPicker"
  | "DateYearPicker"
  | "TimePicker"
  | "TimeRangePicker"
  | "TreeSelect"
  | "Switch"
  | "Rate"
  | "Mentions"
  | "Segmented"
  | "Slider"
  | "Transfer";

/** 创建独立的 AntDV Adapter；调用只组装对象，不初始化 Core 全局状态。 */
export function createAntdvAdapter(
  options: AntdvAdapterOptions = {}
): UIAdapter {
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
      DateRangePicker: { valueFormat: "YYYY-MM-DD" },
    },
  });
}

/** 无字段组件的 Adapter 实例，供测试和第三方组合使用。 */
export const antdvAdapter = createAntdvAdapter();

export {
  antdvCapabilities,
  createAntdvCapabilities,
} from "./antdv/capabilities";
export { antdvDefaults, antdvFields, createAntdvFields } from "./antdv/fields";
