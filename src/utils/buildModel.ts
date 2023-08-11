import buildRule from './buildRule'
import { inject, reactive, readonly, ref, shallowReactive, toRef, toRefs, unref, watch, watchEffect } from 'vue'
import { cloneDeep, mergeWith } from 'lodash-es'

/** 统一生成动态属性参数 */
export function getEffectData<T extends { record: Obj; [k: string]: any }>(param: T) {
  const formData = inject<any>('exaProvider')?.data
  return readonly({ formData, ...toRefs(shallowReactive(param)) } as { formData: Obj } & T)
}

export function getComputedStatus(
  org: undefined | boolean | Ref<boolean> | Fn<boolean>,
  dataRef: { record: Obj } & Obj
) {
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
export function getComputedAttr(handler: Fn<Obj>, dataRef: { record: Obj } & Obj) {
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

/* eslint-disable no-param-reassign */
/** 当前控件数据初始化 */
export function buildModelData(option: Obj, parentData: Ref<Obj>, __chain: string[]) {
  const { field, initialValue, columns, subItems } = option
  const nameArr = field ? field.split('.') : []
  const propChain = __chain.concat(nameArr)
  const refName = nameArr.splice(-1)
  let currentRules: Obj[] | undefined

  const parent = ref(parentData.value)
  const currentValue = ref(parentData.value)
  if (refName) {
    watch(parentData, (data) => {
      parent.value = data
      nameArr.forEach((name) => {
        parent.value = parent.value[name] ??= {}
      })
      if (columns || subItems) {
        parent.value[refName] ??= columns ? [] : {}
      } else {
        parent.value[refName] ??= initialValue
      }
      currentValue.value = parent.value[refName]
    })
  }

  return shallowReactive({
    refName,
    initialValue,
    fieldName: field,
    parent,
    refData: currentValue,
    rules: currentRules,
    propChain,
  })
}

export function buildModelsMap(items: any[], data?: Obj | Ref<Obj>, propChain: string[] = []) {
  const currentData = toRef(data || {})
  const rules = {}
  const cols = items.sort(({ sort = 1 }, { sort: b_sort = 1 }) => sort - b_sort)
  const modelsMap: ModelsMap = new Map()
  cols.forEach((child) => {
    const subModel: ModelData = buildModelData(child, currentData, propChain)
    const { rules: _rules, label, subItems, columns } = child
    if (_rules) {
      const _r = Array.isArray(_rules) ? _rules : [_rules]
      subModel.rules = _r.map((item) => buildRule(item, label)).flat()
      rules[subModel.propChain.join('.')] = subModel.rules
    }
    if (subItems) {
      const children = buildModelsMap(subItems, subModel.refData, subModel.propChain)
      Object.assign(rules, children.rules)
      subModel.children = children
    } else if (columns) {
      subModel.listData = buildModelsMap(columns)
    }
    modelsMap.set(child, subModel)
  })
  return {
    rules,
    modelsMap,
    initialData: cloneDeep(currentData),
  }
}

export function cloneModels<T extends ModelsMap>(orgModels: T, data, parentChain: any[] = []) {
  const currentData = toRef(data || {})
  const newRules = {}
  const models = [...orgModels].map(([option, model]) => {
    const { children, propChain, rules } = model
    const newModel: ModelData = buildModelData(option, currentData, parentChain)
    newModel.rules = rules
    newRules[propChain.join('.')] = rules
    if (children) {
      const { modelsMap, rules: childrenRules } = cloneModels(children.modelsMap, newModel.refData, newModel.propChain)
      Object.assign(newRules, childrenRules)
      newModel.children = { ...children, modelsMap, rules: childrenRules }
    }
    return [option, newModel] as const
  })
  return { modelsMap: new Map(models), rules: newRules }
}

/** 针对表格行生成平铺数据模型 */
export function cloneModelsFlat<T extends ExBaseOption>(orgMaps: ModelsMap<T>, data?: Obj, chain?: any[]) {
  const { modelsMap, rules } = cloneModels(orgMaps, data, chain)
  const newMaps: [T, ModelData][] = []
  ;(function deepCopy(_maps) {
    for (const [option, model] of _maps) {
      newMaps.push([option, model])
      if (model.children) {
        deepCopy(model.children.modelsMap)
      }
    }
  })(modelsMap as any)
  return { modelsMap: new Map(newMaps), rules }
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
