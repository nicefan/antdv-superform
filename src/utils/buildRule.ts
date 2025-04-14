function formatStr(str: string, data: Obj = {}) {
  const reg = new RegExp('{(\\w*)}', 'g')
  return str.replace(reg, (match, key) => data[key] || '')
}

const ruleTypeMap = {
  email: {
    type: 'email',
    message: '请输入正确的邮箱地址',
  },
  integer: {
    type: 'integer',
    message: '{label}必须为整数',
    pattern: /^[+]{0,1}(\d+)$/,
    transform: (value) => Number(value),
  },
  number: {
    type: 'number',
    message: '{label}必须为数字',
    transform: (value) => Number(value),
  },
  idcard: {
    pattern: /^[1-9]\d{5}(19[4-9]|20[0,1])\d(0[1-9]|1[0-2])([0-2][0-9]|30|31)\d{3}[\d|X|x]$/,
    message: '请输入正确的身份证号',
  },
  phone: {
    pattern: /^(\d{3,4}-?)?\d{7,8}$/,
    message: '请输入正确的电话号码',
  },
  mobile: {
    pattern: /^1[3-9][0-9]\d{8}$/,
    message: '请输入正确的手机号',
  },
  twoDecimal: {
    pattern: /^-?\d+(\.\d{1,2})?$/,
    message: '最多支持2位小数',
  },
  word: {
    pattern: /^[A-Za-z0-9][A-Za-z0-9_]*$/,
    message: '{label}只能为字母数字及下划线，且首字符不能为_',
  },
}
const rangeMsg = {
  'string': {
    len: '{label}长度必须等于{len}',
    max: '{label}长度不能超过{max}',
    min: '{label}长度至少为{min}',
    range: '{label}长度必须{min}至{max}之间',
  },
  'number': {
    len: '{label}需等于{len}',
    max: '{label}需小于{max}',
    min: '{label}需大于{min}',
    range: '{label}需在{min}至{max}之间',
  },
}
// eslint-disable-next-line max-params
function getRangeRule(type, len, max, min) {
  let rule
  if (len) {
    rule = { type, len, message: 'len' }
  } else if (!isNaN(max) && !isNaN(min)) {
    rule = { type, max, min, message: 'range' }
  } else if (!isNaN(max)) {
    rule = { type, max, message: 'max' }
  } else if (!isNaN(min)) {
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
  /** 自定义验证器 */
  validator?: (rule: Obj, value: any) => Promise<any>
  /** 提示消息 */
  message?: string
}
function buildRule(item: RuleConfig, label = '') {
  const { trigger, required, type = 'string', len, max, min, pattern, validator, message } = item || {}
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
        message: message || `请输入${label}！`,
      })
    } else {
      rules.push({ required, trigger, message: message || `请添加${label}` })
    }
  }

  const typeRule = ruleTypeMap[type]
  if (typeRule) {
    const message = formatStr(typeRule.message, { label })
    rules.push({ ...typeRule, trigger, message })
  }

  if (pattern) {
    rules.push({ pattern, trigger, message })
  }

  if (len || !isNaN(Number(max)) || !isNaN(Number(min))) {
    const rule = getRangeRule(type, len, max, min)
    const message = formatStr(rule.message, { label, len, max, min })
    rules.push({ ...rule, trigger, message, type })
  }

  if (validator) {
    rules.push({ validator, trigger })
  }
  return rules
}
export default buildRule
