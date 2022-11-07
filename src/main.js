import {
    createApp
} from 'vue'
import App from './App.vue'
import router from './routes/index'
import store from './store/store'
import './style/index.scss'
import 'comment-core-library/dist/css/style.min.css'
import WPlayer from 'vue-wplayer';
import 'vue-wplayer/dist/style.css';


import Vant from 'vant';
import 'vant/lib/index.css';

createApp(App).use(router).use(store).use(WPlayer).use(Vant).mount('#app')