import { Input, TextArea, InputNumber, AutoComplete, Select, Radio, RadioGroup, Checkbox, CheckboxGroup, DatePicker, DateRangePicker, TimePicker, TimeRangePicker, TreeSelect, Switch, Rate } from "antdv-next";
import { createAntdvAdapter } from "./index.js";
import { antdvAdapter } from "./index.js";
import "superform/sdk";
import "vue";
import "@antdv-next/icons";
const antdvUIComponents = {
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
  Rate
};
const antdvFull = createAntdvAdapter({ components: antdvUIComponents });
export {
  antdvAdapter,
  antdvFull,
  antdvUIComponents,
  createAntdvAdapter,
  antdvFull as default
};
