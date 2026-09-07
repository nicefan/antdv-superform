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
const reservedSchemaTypes = new Set(coreTypes);
export {
  coreTypes as c,
  reservedSchemaTypes as r
};
