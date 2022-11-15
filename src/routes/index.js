import {
    createRouter,
    createWebHistory
} from 'vue-router';
import NotFound from '../pages/NotFound.vue';
import Login from '../pages/Login.vue'
import Register from '../pages/Register.vue'
import Video from '../pages/Video/index.vue'
import Home from '../pages/Home/index.vue'
import Person from '../pages/Person/index.vue'
import Upload from '../pages/Upload.vue'
import User from '../pages/User/index.vue'
import Share from '../pages/Share/index.vue'
import Newsfeed from '../pages/News/index.vue'
import Follower from '../pages/Follows/index.vue'
import History from '../pages/History/index.vue'
import Rankings from "../pages/Rankings/index.vue";
import Search from "../pages/Search/index.vue";
import Fans from "../pages/Fans/index.vue";
import Collect from "../pages/Collect/index.vue"

const routes = [{
        path: '/',
        // components: () => import('../pages/Home.vue'),
        component: Home,
        meta: {
            title: 'Home'
        },
    },
    {
        path: '/login',
        component: Login,
        meta: {
            title: 'Login'
        },
    },
    {
        path: '/fans/:userId',
        component: Fans,
        meta: {
            title: 'Fans'
        },
        props: true
    },
    {
        path: '/video/:videoId',
        component: Video,
        props: true // 开启 Props 传参，说白了就是把路由参数映射到组件的 props 数据中
    },
    {
        path: '/person',
        component: Person,
        meta: {
            title: 'Person'
        },
    },
    {
        path: '/search',
        component: Search,
        meta: {
            title: 'Search'
        },
    },
    {
        path: '/rankings',
        component:Rankings,
        meta: {
            title: 'Rankings'
        },
    },
    {
        path: "/follower/:userId",
        component: Follower,
        meta: {
            title: 'Follower'
        },
        props: true
    },
    {
        path: "/history",
        component: History,
    },
    {
        path: "/collect",
        component: Collect,
    },
    {
        path: '/upload',
        component: Upload,
        meta: {
            title: 'upload'
        },
    },
    {
        path: '/register',
        component: Register,
        meta: {
            title: 'register'
        },
    },
    {
        path: "/newsfeed",
        component:Newsfeed
    },
    {
        path: '/share',
        name: "Share",
        component: Share,
        meta: {
            title: 'share'
        },
        props: true
    },
    {
        path: '/user/:userId',
        component: User,
        props: true
    },
    {
        path: '/:path(.*)',
        component: NotFound
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

// // 路由全局前置守卫
// router.beforeEach((to, from, next) => {
//   // console.log("路由全局前置守卫", to, from);
//   next();
// });

// // 路由全局后置守卫
// router.afterEach((to, from, next) => {
//   console.log('路由全局后置守卫', to, from);
//   next();
// });

export default router;