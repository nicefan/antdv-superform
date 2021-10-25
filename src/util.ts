import buildRule from './buildRule'
import { inject, onMounted, reactive, readonly, ref, shallowReactive, toRefs, watchEffect } from 'vue'

export function useShow(hide, data) {
  const show = ref(!hide)
  if (typeof hide === 'function') {
    const formData = inject('formData')
    const dataRef = readonly({ formData, ...data })
    onMounted(() =>
      watchEffect(() => {
        show.value = !hide(dataRef)
      })
    )
  }
  return show
}

export function useDisabled(dis, data: Obj = {}) {
  if (typeof dis === 'function') {
    const disabled = ref(!!dis)
    const formData = inject('formData')
    const dataRef = readonly({ formData, ...toRefs(shallowReactive(data)) })
    onMounted(() =>
      watchEffect(() => {
        disabled.value = dis(dataRef)
      })
    )
    return disabled
  }
  return !!dis
}

export function getListener(option:Obj<Fn> = {}, formData) {
  // 查找on开头的属性进行事件绑定
  const listener: Obj<Fn> = {}
  Object.entries(option).forEach(([key, fn]) => {
    const name = 'on' + key.charAt(0).toUpperCase() + key.slice(1)
    listener[name] = (...args) => fn(readonly(formData), ...args)
  })
  // Object.keys(option).forEach((key) => {
  //   if (key.startsWith('on')) {
  //     listener[key] = (...args) => option[key](formData, ...args)
  //   }
  // })
  return listener
}

/* eslint-disable no-param-reassign */
/** 当前控件数据初始化 */
export function buildModel(option: Obj, { parent, propChain = [], rules = {} }: ParentModel) {
  const { prop = '', keepProp, label, rules: _rules, initialValue } = option
  const propArr = prop.split('.')
  let refName
  let currentRules
  propArr.forEach((name, idx, arr) => {
    if (idx < arr.length - 1 || !!option.columns) {
      parent[name] = parent[name] || (option.type === 'List' || option.type === 'Table' ? [] : {})
      parent = reactive(parent[name])
      rules = rules[name] = rules[name] || {}
    } else {
      currentRules = rules[name]
      parent[name] = parent[name] ?? initialValue
      if (keepProp) parent[keepProp] = parent[keepProp] ?? undefined
      refName = name
      if (_rules && !currentRules) {
        const _r = Array.isArray(_rules) ? _rules : [_rules]
        currentRules = rules[name] = _r.map((item) => buildRule(item, label)).flat()
      }
    }
  })
  return {
    refName,
    parent,
    rules,
    currentRules,
    propChain: propChain.concat(propArr),
  }
} 

/** 生成默认数据结构 */
export function buildModelDeep(cols: Obj[], { parent, propChain = [], rules = {} }: ParentModel) {
  const parentModel = { parent, propChain, rules }
  const models: [string, ModelData][] = []
  cols.forEach((item) => {
    if (item.prop) {
      const model = buildModel(item, parentModel)
      models.push([model.propChain.join('.'), model])
      if (item.columns) {
        const subs = buildModelDeep(item.columns, model)
        models.push(...subs)
      }
    } else if (item.columns) {
      const subs = buildModelDeep(item.columns, parentModel)
      models.push(...subs)
    }
  })
  return models
}
