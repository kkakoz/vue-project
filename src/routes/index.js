import {
    createRouter,
    createWebHistory
} from 'vue-router';
import About from '../pages/About.vue';
import NotFound from '../pages/NotFound.vue';
import Login from '../pages/Login.vue'
import Register from '../pages/Register.vue'
import Video from '../pages/Video/index.vue'
import Home from '../pages/Home/index.vue'
import Person from '../pages/Person.vue'
import Upload from '../pages/Upload.vue'
import User from '../pages/User/index.vue'
import Share from '../pages/Share/index.vue'

const routes = [{
        path: '/',
        // component: () => import('../pages/Home.vue'),
        component: Home,
        meta: {
            title: 'Home'
        },
    },
    {
        path: '/about',
        component: About,
        meta: {
            title: 'About'
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