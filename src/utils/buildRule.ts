import { translate } from '../locale'
import { isNumber } from "lodash-es"

const ruleTypeMap = {
  email: {
    type: 'email',
    message: 'email',
  },
  integer: {
    type: 'integer',
    message: 'integer',
    pattern: /^[+]{0,1}(\d+)$/,
    transform: (value) => Number(value),
  },
  number: {
    type: 'number',
    message: 'number',
    transform: (value) => Number(value),
  },
  idcard: {
    pattern: /^[1-9]\d{5}(19[4-9]|20[0,1])\d(0[1-9]|1[0-2])([0-2][0-9]|30|31)\d{3}[\d|X|x]$/,
    message: 'idcard',
  },
  phone: {
    pattern: /^(\d{3,4}-?)?\d{7,8}$/,
    message: 'phone',
  },
  mobile: {
    pattern: /^1[3-9][0-9]\d{8}$/,
    message: 'mobile',
  },
  twoDecimal: {
    pattern: /^-?\d+(\.\d{1,2})?$/,
    message: 'twoDecimal',
  },
  word: {
    pattern: /^[A-Za-z0-9][A-Za-z0-9_]*$/,
    message: 'word',
  },
} as const
const rangeMsg = {
  'string': {
    len: 'stringLen',
    max: 'stringMax',
    min: 'stringMin',
    range: 'stringRange',
  },
  'number': {
    len: 'numberLen',
    max: 'numberMax',
    min: 'numberMin',
    range: 'numberRange',
  },
} as const
// eslint-disable-next-line max-params
function getRangeRule(type, len, max, min) {
  let rule
  if (len) {
    rule = { type, len, message: 'len' }
  } else if (isNumber(max) && isNumber(min)) {
    rule = { type, max, min, message: 'range' }
  } else if (isNumber(max)) {
    rule = { type, max, message: 'max' }
  } else if (isNumber(min)) {
    rule = { type, min, message: 'min' }
  } else {
    return false
  }
  if (type === 'number') {
    rule.message = rangeMsg.number[rule.message]
    rule.transform = (value) => Number(value)
  } else {
    rule.message = rangeMsg.string[rule.message]
  }
  return rule
}
// function noEmpty (rule, value, callback) {
//   if (/^\s+$/.test(value) || value === '') {
//     callback(new Error())
//   } else {
//     callback()
//   }
// }
export interface RuleConfig {
  /** 验证类型 */
  type?: 'string' | keyof typeof ruleTypeMap
  /** 触发方式 */
  trigger?: 'blur' | 'change'
  /** 是否必填 */
  required?: boolean
  pattern?: RegExp
  /** 长度 */
  len?: number
  /** 最大长度/最大值 */
  max?: number
  /** 最小长度/最小值 */
  min?: number
  /** 自定义验证器, 返回true验证通过，返回Error,提示Error中消息 */
  validator?: (effectData: Obj, value: any) => undefined | boolean | Error | Promise<any>
  /** 提示消息 */
  message?: string
}

function buildRule(item: RuleConfig, label = '') {
  const { trigger, required, type = 'string', len, max, min, pattern, validator, message } = item || {}
  // 校验器在失败时调用消息函数，已有模型和列表克隆无需因语言切换而重建。
  const rules: any[] = []
  if (required) {
    if (type === 'string' || type in ruleTypeMap) {
      rules.push({
        required,
        trigger,
        // validator: noEmpty,
        pattern: /^[\s\S]*.*[^\s][\s\S]*$/,
        // transform: (value) => value + '',
        // whitespace: true,
        message: message ?? (() => translate('required', { label })),
      })
    } else {
      rules.push({ required, trigger, message: message ?? (() => translate('required', { label })) })
    }
  }

  const typeRule = ruleTypeMap[type]
  if (typeRule) {
    const ruleMessage = message ?? (() => translate(typeRule.message, { label }))
    rules.push({ ...typeRule, trigger, message: ruleMessage })
  }

  if (pattern) {
    rules.push({ pattern, trigger, message })
  }

  if (len || isNumber(max) || isNumber(min)) {
    const rule = getRangeRule(type, len, max, min)
    const ruleMessage = message ?? (() => translate(rule.message, { label, len, max, min }))
    rules.push({ ...rule, trigger, message: ruleMessage, type })
  }

  if (validator) {
    rules.push({ validator, trigger })
  }
  return rules
}
export default buildRule
