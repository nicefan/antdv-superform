import { createOfficialProduct } from "superform/sdk";
import { createElementPlusAdapter, type ElementPlusFieldName } from "./adapter";

const product = createOfficialProduct<ElementPlusFieldName>(
  "superform-element-plus",
  (components) => createElementPlusAdapter({ components })
);

export * from "superform";
export * from "./adapter";
export { fieldComponents } from "./fieldComponents";
export default product;
