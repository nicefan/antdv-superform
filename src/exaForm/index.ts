export { default as ExaForm } from './ExaForm.vue'
export { useForm } from './useForm'

export function defineForm<T extends keyof OptionType = 'Form'>(option: GetUniOption<T>) {
  return option
}
