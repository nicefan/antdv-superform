import { inject, reactive, readonly, ref, toRefs, unref, watchEffect } from 'vue'
import { cloneDeep, mergeWith } from 'lodash-es'

/** 统一生成动态属性参数 */
export function getEffectData<T extends Obj>(param?: T) {
  const formData = inject<any>('exaProvider', {})?.data
  return readonly({ formData, ...toRefs(reactive(param || {})) })
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

export function useShow(hide, data) {
  const show = getComputedStatus(hide, data)
  show.value = !show.value
  return show
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

export function getListener(option: Obj<Fn> = {}, formData) {
  const listener: Obj<Fn> = {}
  Object.entries(option).forEach(([key, fn]) => {
    const name = 'on' + key.charAt(0).toUpperCase() + key.slice(1)
    listener[name] = (...args) => fn(readonly(formData), ...args)
  })
  // 查找on开头的属性进行事件绑定
  // Object.keys(option).forEach((key) => {
  //   if (key.startsWith('on')) {
  //     listener[key] = (...args) => option[key](formData, ...args)
  //   }
  // })
  return listener
}

export function resetFields(origin, initial = {}) {
  for (const [key, value] of Object.entries(origin)) {
    if (Array.isArray(value)) {
      value.splice(0)
      if (initial[key]?.length) value.push(...cloneDeep(initial[key]))
    } else if (Object.prototype.toString.call(value) === '[object Object]') {
      resetFields(value, initial[key])
    } else {
      origin[key] = initial[key]
    }
  }
}

export function setFieldsValue(origin, data) {
  mergeWith(origin, data, (objValue, srcValue) => {
    if (Array.isArray(objValue)) {
      objValue.splice(0, objValue.length, ...cloneDeep(srcValue))
      // objValue.push(...srcValue)
      return objValue
    }
  })
}
