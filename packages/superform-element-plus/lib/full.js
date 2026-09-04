import { ElInput, ElSelect, ElSwitch, ElRate } from "element-plus";
import { createElementPlusAdapter } from "./index.js";
import { elementPlusAdapter } from "./index.js";
import "superform/sdk";
import "vue";
const elementPlusUIComponents = {
  Input: ElInput,
  Select: ElSelect,
  Switch: ElSwitch,
  Rate: ElRate
};
const elementPlusFull = createElementPlusAdapter({ components: elementPlusUIComponents });
export {
  createElementPlusAdapter,
  elementPlusFull as default,
  elementPlusAdapter,
  elementPlusFull,
  elementPlusUIComponents
};
