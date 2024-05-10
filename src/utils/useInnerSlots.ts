import { inject } from 'vue'

export function useInnerSlots(slots?: Obj, rootSlots?: Obj) {
  const __rootSlots = rootSlots || inject<Obj>('rootSlots', {})
  const innerSlots = { ...slots }
  if (slots) {
    Object.entries(slots).forEach(([key, value]) => {
      innerSlots[key] = typeof value === 'string' ? __rootSlots[value] : value
    })
  }
  return innerSlots
}
