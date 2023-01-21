import {
    createApp
} from 'vue'
import App from './App.vue'
import router from './routes/index'
import store from './store/store'
import './style/index.scss'
import Vant from 'vant';
import 'vant/lib/index.css';

createApp(App).use(router).use(store).use(Vant)
    .mount('#app')