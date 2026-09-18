import { merge } from "lodash-es";
import {
  registerAdapterFieldTypes,
  registerCustomComponents,
  type FormComponent,
} from "./components";
import { initializeUIAdapter, type UIAdapter } from "./adapter";
import { globalConfig, type GlobalConfig } from "./config";

export type AdapterDefaultProps = Record<string, Obj | undefined>;

export interface SuperFormConfig extends GlobalConfig {
  /** 组件默认参数 */
  defaultProps?: AdapterDefaultProps;
}
const globalProps: Obj = {};
let adapterApplied = false;
let configuredAdapter: UIAdapter | undefined;

function applyAdapter(adapter: UIAdapter) {
  // 重复传入同一实例可以安全复用；切换检查必须先于字段名注册，避免失败后污染保留类型。
  if (configuredAdapter) {
    initializeUIAdapter(adapter);
    return;
  }
  registerAdapterFieldTypes(adapter.supportedFields);
  initializeUIAdapter(adapter);
  configuredAdapter = adapter;
  if (!adapterApplied) {
    merge(globalProps, adapter.defaults || {});
    adapterApplied = true;
  }
}

/** 显式初始化应用级 Adapter；首次初始化后不允许切换协议。 */
export function useAdapter(adapter: UIAdapter) {
  applyAdapter(adapter);
  return adapter;
}

/** 配置 Core 的应用级行为和默认属性。 */
export function configure(config: SuperFormConfig = {}) {
  const { defaultProps, ...runtimeConfig } = config;
  Object.assign(globalConfig, runtimeConfig);
  if (defaultProps) setDefaultProps(defaultProps);
}

/** 注册一个项目自定义 Schema 组件。 */
export function registerComponent(name: string, component: FormComponent) {
  registerCustomComponents({ [name]: component });
}

/** 注册项目自定义 Schema 组件。 */
export function registerComponents(
  components: Record<string, FormComponent | undefined>
) {
  registerCustomComponents(components);
}

/** 合并组件默认参数。 */
export function setDefaultProps(props: Obj) {
  merge(globalProps, props);
}

const superform = {
  useAdapter,
  configure,
  registerComponent,
  registerComponents,
  setDefaultProps,
};

export { globalConfig, globalProps };
export default superform;
