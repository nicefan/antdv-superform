import { createApp } from 'vue'
import 'antdv-next/dist/antd.css'
import superForm from '../src'
import { antdvAdapter } from '../src/adapter/antdv'
import App from './App.vue'
import { Rate } from 'antdv-next'

createApp(App).use(superForm, { adapter: antdvAdapter, components: { Rate } }).mount('#app')
