import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createPinia } from 'pinia' // pinia

import axios from 'axios'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import router  from './router'

const app = createApp(App)

axios.defaults.baseURL = `http://localhost:3001` // axios 기본 주소 지정

app.use(createPinia()) // pinia

app.use(ElementPlus) // elementplus

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component) // elementplus 아이콘 사용
}

app.use(router) // router

app.mount('#app')
