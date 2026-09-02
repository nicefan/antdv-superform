import { createApp } from 'vue'
import 'antdv-next/dist/antd.css'
import superForm, { antdvAdapter } from '../src'
import App from './App.vue'
import { Rate } from 'antdv-next'
// superForm.registerComponent('Rate', Rate)

createApp(App).use(superForm, { adapter: antdvAdapter, components: { Rate } }).mount('#app')
