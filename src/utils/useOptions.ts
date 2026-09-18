import { globalConfig } from '../config'
import { isPlainObject } from 'lodash-es'
import { ref, watchEffect, unref, computed } from 'vue'
import type { OptionsConfig } from '../exaTypes'

/** 选项分组和树形选项共用递归查找，避免漏掉子节点的标签。 */
export function findOption(
  options: Obj[], value: unknown, stringifyValue = false, fieldNames: OptionsConfig['fieldNames'] = {}
): Obj | undefined {
  if (value === undefined || value === null) return
  for (const item of options) {
    const itemValue = item[fieldNames.value ?? 'value']
    if (Object.is(itemValue, value) || (stringifyValue && String(itemValue) === value)) return item
    const children = item[fieldNames.children ?? 'children']
    const child = Array.isArray(children) && findOption(children, value, stringifyValue, fieldNames)
    if (child) return child
  }
}

/** 统一归一化选项；原生搜索等其它属性不参与解析。 */
export function useOptions(config: OptionsConfig | undefined, effectData: Obj = {}, immediate = true) {
  const list = ref<any>([])
  let requestId = 0
  if (config?.source !== undefined && config.dictName !== undefined) {
    console.warn('[SuperForm] options.source 与 options.dictName 同时配置，优先使用 source，忽略 dictName')
  }
  const load = async (context: Obj = effectData) => {
    const id = ++requestId
    const source = unref(config?.source)
    // 按 source 是否配置决定优先级，空数组或暂时为空的 Ref 不回退到字典。
    const data = config?.source !== undefined
      ? typeof source === 'function' ? await source(context) : source
      : config?.dictName !== undefined
        ? await globalConfig.dictApi?.(config.dictName)
        : undefined
    if (id === requestId) list.value = data ?? []
  }
  if (config && immediate) watchEffect(() => { void load() })

  const optionsRef = computed<Obj[]>(() => {
    const data = list.value
    const labelName = config?.fieldNames?.label ?? 'label'
    const valueName = config?.fieldNames?.value ?? 'value'
    const childrenName = config?.fieldNames?.children ?? 'children'
    const normalize = (items: any[]): Obj[] => items.map((item, index) => {
      const object = isPlainObject(item)
      const label = object ? item[labelName] : item
      const value = config?.labelAsValue ? label : object ? item[valueName] : config?.valueToNumber ? index : item
      return {
        ...(object ? item : {}),
        label,
        value: config?.valueToNumber && !config.labelAsValue ? Number(value) : value,
        ...(object && Array.isArray(item[childrenName]) && { children: normalize(item[childrenName]) }),
      }
    })
    if (Array.isArray(data)) return normalize(data)
    return Object.entries(data ?? {}).map(([key, label]) => ({
      label,
      value: config?.labelAsValue ? label : config?.valueToNumber ? Number(key) : key,
    }))
  })
  return { optionsRef, load }
}
