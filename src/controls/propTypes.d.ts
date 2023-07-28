export interface ExInputProps<T = ExFormItemOption> {
  option: T
  model: ModelData
  attrs?: Obj
  effectData: Obj
}
export interface ExGroupProps<T = UniOption> extends ExInputProps<ExGroupOption> {
  children: ModelsMap<T>
}
export interface ExCollapseProps extends ExInputProps<ExCollapseOption> {
  children: ModelsMap<CollapseItem>
}
