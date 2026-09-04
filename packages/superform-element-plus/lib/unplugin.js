const fields = {
  Input: "ElInput",
  Select: "ElSelect",
  Switch: "ElSwitch",
  Rate: "ElRate"
};
function createElementPlusResolver() {
  const resolver = (type) => {
    const importName = fields[type];
    return importName ? { from: "element-plus", importName, adapterField: true, registrationName: type } : void 0;
  };
  resolver.adapterFields = Object.keys(fields);
  return resolver;
}
export {
  createElementPlusResolver,
  createElementPlusResolver as default
};
