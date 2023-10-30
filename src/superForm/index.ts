import type { OptionType } from '../exaTypes'

export { default as SuperForm } from './SuperForm.vue'
export { useForm } from './useForm'

export function defineForm<T extends keyof OptionType = 'Form'>(option: OptionType[T]) {
  return option
}
