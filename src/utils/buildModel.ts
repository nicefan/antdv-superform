import buildRule from './buildRule'
import { reactive, toRef, toValue, watch, markRaw, isRef, computed, ref } from 'vue'
import { update, get as objectGet, set as objectSet } from 'lodash-es'

/* eslint-disable no-param-reassign */
/** 当前控件数据初始化 */
function buildModelData(option: Obj, origin: Ref<Obj>, __chain: string[]) {
  const { field, columns, subItems, initialValue, value } = option
  const relatedField = option.endField ?? option.keepField ?? option.labelField
  const nameArr = field ? field.split('.') : []
  const propChain = __chain.concat(nameArr)
  const refName = nameArr.splice(-1)[0]

  const model = reactive({
    refName,
    initialValue,
    fieldName: field,
    origin,
    parent: origin,
    refData: origin,
    propChain,
  })

  if (refName) {
    if (nameArr.length) model.parent = computed(() => objectGet(origin.value, nameArr))
    model.refData = computed({
      get: () => objectGet(origin.value, field),
      set: (val) => objectSet(origin.value, field, val),
    })
    watch(
      origin,
      () => {
        model.refData ??= toValue(initialValue) ?? toValue(value) ?? ((columns && []) || (subItems && {}))
        if (relatedField) update(model.parent, relatedField, (v) => v)
      },
      { immediate: true, flush: 'sync' }
    )
  } else if (value) {
    model.refData = ref(value)
    model.propChain = []
  }
  return model
}

export const formatRule = (rules, effectData) => {
  return rules?.map((item) => {
    if (!item.validator) return item
    const validator = async (data, ...args) => {
      const re = await item.validator({ ...data, ...effectData }, ...args)
      if (re === false || re instanceof Error) {
        throw re
      }
    }
    return { ...item, validator }
  })
}

export function buildModelsMap(items: any[], data?: Obj | Ref<Obj>, propChain: string[] = []) {
  const currentData: Ref = toRef(data || {})
  const rules = {}
  // const cols = items.sort(({ sort = 1 }, { sort: b_sort = 1 }) => sort - b_sort)
  const modelsMap: ModelsMap = new Map()
  items.forEach((child) => {
    if (typeof child !== 'object') return
    const subModel: ModelData = buildModelData(child, currentData, propChain)
    const { required, label, subItems, columns } = child

    if (child.rules || required) {
      const _rules = child.rules || []
      const _r = Array.isArray(_rules) ? _rules : [_rules]
      if (!_r.length && required) {
        _r.push({ required: true })
      }
      let ruleType = 'string'
      if (subModel.refData) {
        const refValue = toValue(subModel.refData)
        const baseType = typeof refValue
        ruleType = baseType === 'object' && Array.isArray(refValue) ? 'array' : baseType
      }
      if (_r[0] && 'required' in _r[0]) {
        _r[0].type ??= ruleType
      }
      subModel.rules = _r.map((item) => buildRule(item, label)).flat()
      if (subModel.propChain.length) {
        rules[subModel.propChain.join('.')] = subModel.rules
      }
    }
    if (subItems) {
      const children = buildModelsMap(subItems, toRef(subModel, 'refData'), subModel.propChain)
      Object.assign(rules, children.rules)
      subModel.children = children.modelsMap
    } else if (columns) {
      subModel.listData = buildModelsMap(columns)
    }
    modelsMap.set(markRaw(child), subModel)
  })
  return {
    rules,
    modelsMap,
  }
}

/** 行组件会持有初次传入的模型，移动行时保留模型身份并同步整个子树的校验路径。 */
export function updateModelIndex(model: Obj, propChain: any[], index: number) {
  const previousChain = model.propChain
  const updateModel = (current: Obj) => {
    if (current.propChain?.length && previousChain.every((part, idx) => current.propChain[idx] === part)) {
      current.propChain = [...propChain, ...current.propChain.slice(previousChain.length)]
    }
    if (current.index !== undefined) current.index = index
    current.children?.forEach(updateModel)
  }
  // listData 是共享的 schema 模板；嵌套列表通过监听自身路径更新实际行模型。
  updateModel(model)
}

export function cloneModels<T extends ModelsMap>(orgModels: T, data, parentChain: any[] = [], index?: number) {
  const currentData = toRef(data || {})
  const newRules = {}
  const models = [...orgModels].map(([option, model]) => {
    const { children, rules, listData } = model
    const chain = index !== undefined ? [...parentChain, index] : parentChain
    const newModel: ModelData = buildModelData(option, currentData, chain)
    if (index !== undefined) {
      newModel.index = index
    }
    newModel.rules = rules as any
    if (newModel.propChain.length && rules) {
      newRules[newModel.propChain.join('.')] = rules
    }
    if (children) {
      const { modelsMap, rules: childrenRules } = cloneModels(children, toRef(newModel, 'refData'), newModel.propChain)
      Object.assign(newRules, childrenRules)
      newModel.children = modelsMap
    }
    if (listData) {
      newModel.listData = listData
    }
    return [option, newModel] as const
  })
  return { modelsMap: new Map(models), rules: newRules }
}

/** 针对表格行生成平铺数据模型 */
export function cloneModelsFlat<T extends GetBaseOption>(
  orgMaps: ModelsMap<T>,
  data?: Obj,
  chain?: any[],
  index?: number
) {
  const { modelsMap, rules } = cloneModels(orgMaps, data, chain, index)
  const newMaps: [T, ModelData][] = []
  ;(function deepCopy(_maps) {
    for (const [option, model] of _maps) {
      newMaps.push([option, model])
      if (model.children) {
        deepCopy(model.children)
      }
    }
  })(modelsMap as any)
  return { modelsMap: new Map(newMaps), rules }
}
