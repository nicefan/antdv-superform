import type { ExtButtonGroup, ExtButtons } from '../../exaTypes'

/** 公共外观按属性覆盖，局部只改尺寸时仍保留 UI 默认的按钮风格。 */
export function mergeButtonConfig<T extends ExtButtonGroup>(base: T, option?: ExtButtons): ExtButtonGroup {
  const local = Array.isArray(option) ? { actions: option } : option
  return {
    ...base,
    ...local,
    buttonProps: { ...base.buttonProps, ...local?.buttonProps },
  }
}
