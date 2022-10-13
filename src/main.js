import {
    createApp
} from 'vue'
import App from './App.vue'
import router from './routes/index'
import store from './store/store'
import './style/index.scss'
import vue3videoPlay from "vue3-video-play"; // 引入组件
import "vue3-video-play/dist/style.css"; // 引入css
import 'mui-player/dist/mui-player.min.css'
import 'comment-core-library/dist/css/style.min.css'

import Vant from 'vant';
import 'vant/lib/index.css';

createApp(App).use(router).use(store).use(vue3videoPlay).use(Vant).mount('#app')