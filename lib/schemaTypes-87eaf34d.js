const coreTypes = [
  "Form",
  "Group",
  "Card",
  "List",
  "ListGroup",
  "Tabs",
  "Table",
  "Collapse",
  "Descriptions",
  "Fragment",
  "Buttons",
  "Hidden",
  "InputSlot",
  "InfoSlot",
  "Text",
  "HTML",
  "Upload",
  "InputGroup",
  "InputList",
  "TagInput",
  "TagSelect"
];
const enhancedTypes = [
  "Input",
  "AutoComplete",
  "Select",
  "RadioGroup",
  "CheckboxGroup",
  "DatePicker",
  "DateRangePicker",
  "TimePicker",
  "TimeRangePicker",
  "TreeSelect",
  "Switch"
];
const reservedSchemaTypes = /* @__PURE__ */ new Set([...coreTypes, ...enhancedTypes]);
export {
  coreTypes as c,
  enhancedTypes as e,
  reservedSchemaTypes as r
};
