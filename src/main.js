import {
    createApp
} from 'vue'
import App from './App.vue'
import router from './routes/index'
import store from './store/store'
import './style/index.scss'
import vue3videoPlay from "vue3-video-play"; // 引入组件
import "vue3-video-play/dist/style.css"; // 引入css
import {
    Tabbar,
    TabbarItem,
    Tab,
    Tabs,
    Grid,
    GridItem,
    List,
    Icon,
    NavBar,
    Search,
    Divider,
    Form,
    Field,
    CellGroup,
    Button,
    Dialog,
    Toast,
    Image as VanImage,
    ActionSheet,
    Uploader 
} from 'vant';

createApp(App).use(router).use(store).use(vue3videoPlay).
use(Tabbar).use(TabbarItem).use(Tab).use(Tabs).use(Grid).use(GridItem).use(List).use(Icon).use(NavBar).
use(Search).use(Divider).use(Form).use(Field).use(CellGroup).use(Button).
use(Dialog).use(Uploader).use(VanImage).use(ActionSheet).
mount('#app')