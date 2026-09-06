import { defineUIAdapter, type UIAdapter } from "superform/sdk";
import type { Component } from "vue";
import { elementPlusCapabilities } from "./capabilities";
import { elementPlusDefaults, elementPlusFields } from "./fields";
import "./schemaTypes";

export interface ElementPlusAdapterOptions {
  /** 不使用自动导入插件时，显式提供实际使用的字段组件。 */
  components?: Partial<Record<ElementPlusFieldName, Component>>;
}

export type ElementPlusFieldName = "Input" | "Select" | "Switch" | "Rate";

/** 创建 Element Plus Adapter；调用只组装对象，不初始化 Core 全局状态。 */
export function createElementPlusAdapter(
  options: ElementPlusAdapterOptions = {}
): UIAdapter {
  return defineUIAdapter({
    name: "element-plus",
    ...elementPlusCapabilities,
    fields: elementPlusFields,
    fieldComponents: options.components,
    defaults: elementPlusDefaults,
  });
}

/** 无字段组件的 Adapter 实例，供测试和第三方组合使用。 */
export const elementPlusAdapter = createElementPlusAdapter();

export { elementPlusCapabilities, elementPlusDefaults, elementPlusFields };
