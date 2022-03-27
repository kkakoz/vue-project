import {
    createRouter,
    createWebHistory
} from 'vue-router';
import About from '../pages/About.vue';
import NotFound from '../pages/NotFound.vue';
import Login from '../pages/Login.vue'
import Register from '../pages/Register.vue'
import Video from '../pages/Video.vue'
import Comment from '../components/Comment.vue'
import Home from '../pages/Home.vue'
import Person from '../pages/Person.vue'
import Upload from '../pages/Upload.vue'

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
        path: '/video',
        component: Video,
        meta: {
            title: 'Video'
        },
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