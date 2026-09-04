const fields = [
  "Input",
  "TextArea",
  "InputNumber",
  "AutoComplete",
  "Select",
  "Radio",
  "RadioGroup",
  "Checkbox",
  "CheckboxGroup",
  "DatePicker",
  "DateRangePicker",
  "TimePicker",
  "TimeRangePicker",
  "TreeSelect",
  "Switch",
  "Rate"
];
function createAntdvResolver() {
  const resolver = (type) => fields.includes(type) ? { from: "antdv-next", importName: type, adapterField: true, registrationName: type } : void 0;
  resolver.adapterFields = [...fields];
  return resolver;
}
const antdvResolver = createAntdvResolver();
export {
  antdvResolver,
  createAntdvResolver,
  createAntdvResolver as default
};
