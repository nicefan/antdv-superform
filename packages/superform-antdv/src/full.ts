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
} from 'antdv-next'
import type { Component } from 'vue'
import { createAntdvAdapter } from './index'

export { antdvAdapter, createAntdvAdapter } from './index'

/** AntDV Adapter 支持的全量字段组件，适合不使用自动导入插件的应用。 */
export const antdvUIComponents: Record<string, Component> = {
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
}

/** 已附带全部字段组件，可直接传给 superform.useAdapter。 */
export const antdvFull = createAntdvAdapter({ components: antdvUIComponents })

export default antdvFull
