/// <reference types="../types" />

import plugin from "./plugin";
import "./style.less";
export * from "./superForm";
export * from "./superTable";
export * from "./superButtons";
export * from "./superDetail";
export * from "./superModal";
export { diagnoseSchema } from "./utils/diagnoseSchema";
export type {
  SchemaDiagnostic,
  SchemaDiagnosticLevel,
  SchemaKind,
} from "./utils/diagnoseSchema";
export { defineUIAdapter } from "./adapter";
export type {
  ActionAdapter,
  ActionRenderType,
  AdapterComponent,
  ContainerAdapter,
  FieldAdapter,
  FieldAdapterContext,
  FieldPropsAdapter,
  FieldState,
  ResolvedField,
  FormAdapter,
  IconAdapter,
  LayoutAdapter,
  LayoutComponentName,
  PresentationAdapter,
  PresentationRenderType,
  PreviewAdapter,
  ModalAdapter,
  ServiceAdapter,
  TableAdapter,
  UIMessageType,
  UIServiceHandle,
  UploadAdapter,
  UITableColumn,
  UITableFilterProps,
  UITablePagination,
  UITableRenderProps,
  UITableSelection,
  UITableSelectors,
  UIAdapter,
} from "./adapter";
export { registerAutoImportedComponents } from "./components";
export {
  configure,
  registerComponent,
  registerComponents,
  useAdapter,
} from "./plugin";
export type {
  ComponentModelConfig,
  FormComponent,
  FormComponentConfig,
  FormComponentProps,
} from "./components";
export type { AdapterDefaultProps, SuperFormConfig } from "./plugin";

export default plugin;

export type * from "./exaTypes";
