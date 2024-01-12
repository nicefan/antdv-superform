import { inject, reactive, ref, unref, watchEffect } from 'vue'

/** 统一生成动态属性参数 */
export function getEffectData<T extends Obj>(param?: T) {
  const formData = inject<any>('exaProvider', {}).data
  return reactive({ ...((param || {}) as T), formData })
}

export function getComputedStatus(org: undefined | boolean | Ref<boolean> | Fn<boolean>, dataRef: Obj) {
  const res = ref(!!unref(org))
  if (typeof org === 'function') {
    watchEffect(() => {
      res.value = org(dataRef)
    })
  }
  return res
}

export function useDisabled(dis, data) {
  return getComputedStatus(dis, data)
}

/** 动态属性监听 */
export function getComputedAttr(handler: Fn<Obj>, dataRef: Obj) {
  const result: Obj = reactive({})
  if (handler) {
    watchEffect(() => {
      Object.assign(result, handler(dataRef))
    })
  }
  return result
}

export function getListener(option: Obj<Fn> = {}, effectData) {
  const listener: Obj<Fn> = {}
  // 查找on开头的属性进行事件绑定
  Object.keys(option).forEach((key) => {
    if (key.match(/^on[A-Z]/)) {
      listener[key] = (...args) => option[key](effectData, ...args)
    } else if (key === 'on') {
      Object.entries(option.on).forEach(([key, fn]) => {
        const name = 'on' + key.charAt(0).toUpperCase() + key.slice(1)
        listener[name] = (...args) => fn(effectData, ...args)
      })
    }
  })
  return listener
}
