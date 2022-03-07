import { createRouter, createWebHistory } from 'vue-router';
import About from '../pages/About.vue';
import NotFound from '../pages/NotFound.vue';

const routes = [
  {
    path: '/',
    component: () => import ('../pages/Home.vue'),
    meta: { title: 'Home' },
  },
  {
    path: '/About',
    component: About,
    meta: { title: 'About' },
    // example of route level code-splitting
    // this generates a separate chunk (About.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () => import('./views/About.vue')
  },
  { path: '/:path(.*)', component: NotFound },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// 路由全局前置守卫
router.beforeEach((to, from, next) => {
  // console.log("路由全局前置守卫", to, from);
  next();
});

// 路由全局后置守卫
router.afterEach((to, from, next) => {
  console.log('路由全局后置守卫', to, from);
  next();
});

export default router;