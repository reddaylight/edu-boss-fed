import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 引入 ElementUI
import ElementPlus from 'element-plus'
// 引入 ElementPlus 主题文件
// import 'element-plus/theme-chalk/index.css'
import './styles/index.scss'

createApp(App).use(store).use(router).use(ElementPlus).mount('#app')
