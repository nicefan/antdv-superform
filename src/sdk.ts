/**
 * Adapter 开发 SDK。独立 Adapter 包只能依赖这里的稳定契约，不能引用 Core 源码路径。
 */
export { defineUIAdapter, registerUIComponents, requireUIComponent, useUIComponent } from "./adapter";
export { createOfficialProduct } from "./officialProduct";
export type {
  OfficialProductInitializeOptions,
  OfficialSuperFormProduct,
} from "./officialProduct";
export type {
  ActionAdapter,
  ActionRenderType,
  AdapterComponent,
  ComponentModelConfig,
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
export { globalConfig } from "./config";
export { toNode } from "./utils/toNode";

export { builtInIcons } from "./icons";

export { fieldComponentProps, createFieldPropsAdapter, defineFieldAdapters, combineFieldHandlers } from './adapter/fieldProtocol';
