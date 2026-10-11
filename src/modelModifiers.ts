export type ModelModifier = 'trim' | 'number'
export type ModelModifierList = readonly ModelModifier[]
export type ModelModifiers = ModelModifierList | Readonly<Record<string, ModelModifierList>>

declare module './exaTypes' {
  interface ExtBaseOption {
    /** v-model 写回修饰符；数组作用于主 value，具名对象按 binding 名分别配置。 */
    modelModifiers?: ModelModifiers
  }
}

export function resolveModelModifiers(
  modifiers: ModelModifiers | undefined,
  name = 'value'
): ModelModifierList | undefined {
  if (!modifiers) return
  if (Array.isArray(modifiers)) return name === 'value' ? modifiers : undefined
  return (modifiers as Readonly<Record<string, ModelModifierList>>)[name]
}

function applyModifier(value: unknown, modifier: ModelModifier): unknown {
  if (Array.isArray(value)) return value.map((item) => applyModifier(item, modifier))

  if (modifier === 'trim') {
    return typeof value === 'string' ? value.trim() : value
  }

  if (modifier === 'number' && typeof value === 'string') {
    const number = Number.parseFloat(value)
    return Number.isNaN(number) ? value : number
  }

  return value
}

export function applyModelModifiers(value: unknown, modifiers?: ModelModifierList): unknown {
  return modifiers?.reduce((result, modifier) => applyModifier(result, modifier), value) ?? value
}
