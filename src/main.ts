import { createApp } from 'vue'
// import './style.css'
import App from './App.vue'
// import router from './router/index';
import 'virtual:windi.css'
// import './styles/app.less';
import { is_neizhi } from '@/utils/check';

if (is_neizhi()) {
	window.location.href = 'https://c.pc.qq.com/middle.html?pfurl=' + window.location.href;
}

const app = createApp(App)
// app.use(router)
app.mount('#app')
