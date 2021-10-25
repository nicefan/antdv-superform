import VIcon from './VIcon'
// import moment from 'moment';
import 'moment/dist/locale/zh-cn'
import zhCN from 'ant-design-vue/es/locale/zh_CN'

export const install = (app) => {
  app.provide('localeData', { antLocale: zhCN, exist: true })
  app.component('VIcon', VIcon)
}
