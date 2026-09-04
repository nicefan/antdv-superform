import { createApp } from 'vue'
import 'element-plus/dist/index.css'
import superform from 'superform'
import { elementPlusAdapter } from 'superform-element-plus'
import App from './App.vue'

superform.useAdapter(elementPlusAdapter)
createApp(App).mount('#app')
