/* eslint-disable */
// @ts-nocheck
import * as _base from './baseComps'

// @ts-ignore
const base = { ..._base }

export function override(comps) {
  Object.keys(comps).forEach((key) => {
    base[key] = comps[key]
  })
}

export function getOverride<T extends Obj | Obj[]>(comp: T): T {
  if (Array.isArray(comp)) {
    return comp.map(getOverride) as T
  } else {
    return base[comp.name] || comp
  }
}
// @ts-ignore
export default base
