import * as base from './baseComps'

const _base = { ...base }

export function override(comps) {
  Object.keys(comps).forEach((key) => {
    _base[key] = comps[key]
  })
}

export function getOverride<T extends Obj | Obj[]>(comp: T): T {
  if (Array.isArray(comp)) {
    return comp.map(getOverride) as T
  } else {
    return _base[comp.name] || comp
  }
}
export default _base
