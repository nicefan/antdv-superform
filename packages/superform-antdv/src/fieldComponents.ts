import {
  AutoComplete,
  Checkbox,
  CheckboxGroup,
  DatePicker,
  DateRangePicker,
  Input,
  InputNumber,
  Radio,
  RadioGroup,
  Rate,
  Select,
  Switch,
  TextArea,
  TimePicker,
  TimeRangePicker,
  TreeSelect,
} from "antdv-next";
import type { Component } from "vue";
import type { AntdvFieldName } from "./adapter";

/** AntDV Adapter 支持的全量字段组件，适合不使用自动导入插件的应用。 */
export const fieldComponents: Record<AntdvFieldName, Component> = {
  Input,
  TextArea,
  InputNumber,
  AutoComplete,
  Select,
  Radio,
  RadioGroup,
  Checkbox,
  CheckboxGroup,
  DatePicker,
  DateRangePicker,
  TimePicker,
  TimeRangePicker,
  TreeSelect,
  Switch,
  Rate,
};
