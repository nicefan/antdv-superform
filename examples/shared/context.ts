import { inject, ref, watch, type InjectionKey } from 'vue'

export function snapshot(value: unknown) {
  const ancestors: object[] = []
  const errors = new WeakMap<Error, object>()
  return (
    JSON.stringify(
      value,
      function (_key, item) {
        if (typeof item === 'bigint') return String(item)
        if (item instanceof File) return { name: item.name, size: item.size, type: item.type }
        if (item instanceof Error) {
          if (!errors.has(item))
            errors.set(item, { ...item, name: item.name, message: item.message, cause: item.cause })
          item = errors.get(item)
        }
        if (typeof item === 'object' && item !== null) {
          // 同一行可能同时出现在来源、展示和选择数据中，只截断真正的循环引用。
          while (ancestors.length && ancestors[ancestors.length - 1] !== this) ancestors.pop()
          if (ancestors.includes(item)) return '[循环引用]'
          ancestors.push(item)
        }
        return item
      },
      2
    ) ?? 'null'
  )
}

export function createInspector() {
  return {
    active: Symbol(),
    open: ref(false),
    paused: ref(false),
    data: ref('{}'),
    changes: ref<{ time: string; path: string; before: string; after: string }[]>([]),
    events: ref<{ time: string; name: string; data: string }[]>([]),
  }
}
export const inspectorKey: InjectionKey<ReturnType<typeof createInspector>> = Symbol('demo-inspector')
export const uiKey: InjectionKey<'antdv' | 'element'> = Symbol('demo-ui')

// 只观察演示数据；不访问组件私有实例，切页后忽略旧异步操作的日志。
export function useDemo(read: () => unknown) {
  const inspector = inject(inspectorKey)!
  const token = Symbol()
  inspector.active = token
  inspector.changes.value = []
  inspector.events.value = []
  const status = ref('可以开始操作，右侧数据观察窗会记录变化。')
  let previous: unknown
  function compare(before: any, after: any, path = '$') {
    if (JSON.stringify(before) === JSON.stringify(after)) return
    if (before && after && typeof before === 'object' && typeof after === 'object') {
      for (const key of new Set([...Object.keys(before), ...Object.keys(after)]))
        compare(before[key], after[key], `${path}.${key}`)
    } else {
      inspector.changes.value.push({
        time: new Date().toLocaleTimeString(),
        path,
        before: before === undefined ? '（未定义）' : snapshot(before),
        after: after === undefined ? '（未定义）' : snapshot(after),
      })
    }
  }
  watch(
    () => [inspector.paused.value, snapshot(read())] as const,
    ([paused, data]) => {
      if (paused || inspector.active !== token) return
      const next = JSON.parse(data)
      if (previous !== undefined) compare(previous, next)
      inspector.changes.value = inspector.changes.value.slice(-80)
      inspector.data.value = data
      previous = next
    },
    { immediate: true }
  )
  function event(name: string, data?: unknown) {
    if (inspector.active !== token || inspector.paused.value) return
    inspector.events.value = [
      ...inspector.events.value.slice(-59),
      { time: new Date().toLocaleTimeString(), name, data: snapshot(data) },
    ]
  }
  async function run(name: string, action: () => unknown) {
    try {
      const data = await action()
      status.value = `${name}完成`
      event(name, data)
      return data
    } catch (error) {
      status.value = error instanceof Error ? error.message : String(error)
      event(`${name}失败`, error)
    }
  }
  return { isElement: inject(uiKey) === 'element', status, event, run, inspector }
}
