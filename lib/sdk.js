import { s as superform } from "./plugin.js";
import { l, g, A, B } from "./plugin.js";
import "lodash-es";
import "vue";
import "nanoid";
import "./schemaTypes.js";
const officialProductKey = Symbol.for("superform.official-product");
function createOfficialProduct(productName, createAdapter) {
  let initialized = false;
  const product = {
    ...superform,
    initialize(options = {}) {
      var _a;
      const components = options.components;
      const componentNames = Object.keys(components || {});
      if (initialized) {
        if (componentNames.length) {
          throw new Error(
            `SuperForm '${productName}' 已初始化，不能再追加字段组件`
          );
        }
        return product;
      }
      const adapter = createAdapter(components);
      for (const name of componentNames) {
        if (!((_a = adapter.fields) == null ? void 0 : _a[name])) {
          throw new Error(
            `UIAdapter '${adapter.name}' 未声明字段 '${name}'，不能初始化对应 UI 组件`
          );
        }
      }
      const scope = globalThis;
      const activeProduct = scope[officialProductKey];
      if (activeProduct && activeProduct !== productName) {
        throw new Error(
          `SuperForm 已初始化官方产品 '${String(
            activeProduct
          )}'，不能再初始化 '${productName}'`
        );
      }
      superform.useAdapter(adapter);
      scope[officialProductKey] = productName;
      initialized = true;
      return product;
    }
  };
  return product;
}
export {
  createOfficialProduct,
  l as defineUIAdapter,
  g as globalConfig,
  A as registerUIComponents,
  B as toNode
};
