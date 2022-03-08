import {
    createApp
} from 'vue'
import App from './App.vue'
import router from './routes/index'
import store from './store/store'
import './style/index.scss'
import {
    Tabbar,
    TabbarItem,
    Tab, 
    Tabs ,
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
    Button
} from 'vant';

createApp(App).use(router).use(store).
use(Tabbar).use(TabbarItem).use(Tab).use(Tabs).use(Grid).use(GridItem).use(List).use(Icon).use(NavBar).
use(Search).use(Divider).use(Form).use(Field).use(CellGroup).use(Button).
mount('#app')