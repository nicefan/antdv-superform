import { createOfficialProduct } from "superform/sdk";
import { createAntdvAdapter, type AntdvFieldName } from "./adapter";
import "./style.less";

const product = createOfficialProduct<AntdvFieldName>(
  "superform-antdv",
  (components) => createAntdvAdapter({ components })
);

export * from "superform";
export * from "./adapter";
export { fieldComponents } from "./fieldComponents";
export default product;
