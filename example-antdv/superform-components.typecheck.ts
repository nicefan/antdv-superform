import type { OptionType } from 'superform'

/** 验证自动生成的组件映射会把 attrs 绑定到 RateProps。 */
export const rateOption: OptionType['Rate'] = {
  type: 'Rate',
  field: 'rating',
  attrs: {
    allowHalf: true,
  },
}
