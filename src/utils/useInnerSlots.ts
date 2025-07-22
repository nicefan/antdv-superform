import { inject } from 'vue'

export function useInnerSlots(slots: Obj | undefined, effectData, rootSlots?: Obj) {
  const __rootSlots = rootSlots || inject<Obj>('rootSlots', {})
  const innerSlots: Obj = {}
  if (slots) {
    Object.entries(slots).forEach(([key, value]) => {
      const slot = typeof value === 'string' ? __rootSlots[value] : value
      if (!slot) return
      innerSlots[key] = (data) => (typeof slot === 'function' ? slot({ ...effectData, ...(data || {}) }) : slot)
    })
  }
  return innerSlots
}
