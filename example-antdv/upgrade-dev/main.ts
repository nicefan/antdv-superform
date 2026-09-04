import { createApp } from 'vue'
import 'antdv-next/dist/antd.css'
import superForm from 'superform'
import { antdvAdapter } from 'superform-antdv'
import App from './App.vue'

superForm.useAdapter(antdvAdapter)
createApp(App).mount('#app')
