import { mergeProps } from 'vue'
import { getUIAdapter } from './runtime'
import { requireUIComponent } from './fieldRegistry'
import type { ResolvedField } from './types'
import { createFieldPropsAdapter } from './fieldProtocol'

const fieldCache = new Map<string, ResolvedField>()
// 未指定 UI 协议时采用固定 value 协议，同样保留原生更新监听器。
const standardProps = createFieldPropsAdapter()

/** 分别缓存原始组件与最终配置，渲染时不再查询或解释 model 配置。 */
export function resolveUIField(type: string): ResolvedField | undefined {
  const cached = fieldCache.get(type)
  if (cached) return cached
  const adapter = getUIAdapter()
  if (!adapter.supportedFields.includes(type)) return
  const config = adapter.fields?.[type]
  const original = requireUIComponent(type)
  const adapted = !!config?.component && typeof config.component !== 'string'
  const placeholder = config?.processors?.some(name => ['options', 'picker', 'range'].includes(name)) ? '请选择' : '请输入'
  const field: ResolvedField = {
    ...config,
    type,
    component: typeof config?.component === 'string' ? original : config?.component ?? original,
    adapted,
    // 只缓存提示前缀，label 按当前字段读取，避免同类型字段串用提示文案。
    // defaults/attrs 的 class/style 按 Vue 规则合并；fixedProps 最后直接覆盖，不能被用户配置改写。
    getAttrs: (attrs, option, state = {}) => Object.assign(mergeProps(
      { placeholder: state.placeholder ?? `${placeholder}${option.label ?? ''}` },
      config?.defaults ?? {},
      attrs,
      // 两套 UI 均接收标准 options；只在专项结果存在时覆盖，空数组也有效。
      state.options === undefined ? {} : { options: state.options }
    ), config?.fixedProps),
    adaptProps: config?.adaptProps ?? adapter.adaptFieldProps ?? standardProps,
  }
  fieldCache.set(type, field)
  return field
}
