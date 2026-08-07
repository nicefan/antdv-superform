import DefaultTheme from 'vitepress/theme'
import { h } from 'vue'
import PlaygroundBridge from '../components/PlaygroundBridge.vue'
import AsyncRepl from '../components/AsyncRepl.vue'
import './styles.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('DocsRepl', AsyncRepl)
  },
  Layout() {
    return h(DefaultTheme.Layout, null, {
      'layout-bottom': () => h(PlaygroundBridge),
    })
  },
}
