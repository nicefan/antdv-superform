import VIcon from './icon/VIcon'
import zhCN from 'ant-design-vue/es/locale/zh_CN'
import { innerComps } from './components'
import { Component } from 'vue'

interface GlobalConfig {
  locale?: typeof zhCN,
  components?: Record<keyof typeof innerComps, Component>
}
export const install = (app, config?: GlobalConfig) => {
  const locale = config?.locale || zhCN
  app.provide('localeData', { locale: locale, exist: true })
  app.component('VIcon', VIcon)
  Object.assign(innerComps, config?.components)

  return app
}
