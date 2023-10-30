import type { ExtFormItemOption } from '../exaTypes'

export interface CommonProps<T = ExtFormItemOption> {
  option: T
  model: Required<ModelData>
  attrs?: Obj
  effectData: Obj
}
