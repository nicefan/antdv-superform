import DefaultTheme from 'vitepress/theme'
import { h } from 'vue'
import PlaygroundBridge from '../components/PlaygroundBridge.vue'
import AsyncRepl from '../components/AsyncRepl.vue'
import AsyncExamples from '../components/AsyncExamples.vue'
import AsyncHomeQuickStart from '../components/AsyncHomeQuickStart.vue'
import './styles.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('DocsRepl', AsyncRepl)
    app.component('ExamplesWorkspace', AsyncExamples)
    app.component('HomeQuickStart', AsyncHomeQuickStart)
  },
  Layout() {
    return h(DefaultTheme.Layout, null, {
      'layout-bottom': () => h(PlaygroundBridge),
    })
  },
}
