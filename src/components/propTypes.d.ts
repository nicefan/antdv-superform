export interface CommonProps<T = ExFormItemOption> {
  option: T
  model: Required<ModelData>
  attrs?: Obj
  effectData: Obj
}
