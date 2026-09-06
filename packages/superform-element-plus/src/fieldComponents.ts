import { ElInput, ElRate, ElSelect, ElSwitch } from "element-plus";
import type { Component } from "vue";
import type { ElementPlusFieldName } from "./adapter";

/** Element Plus 字段全量组件，键名统一使用 Schema 的无 El 前缀名称。 */
export const fieldComponents: Record<ElementPlusFieldName, Component> = {
  Input: ElInput,
  Select: ElSelect,
  Switch: ElSwitch,
  Rate: ElRate,
};
