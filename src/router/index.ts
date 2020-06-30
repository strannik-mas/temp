import Vue from 'vue';
import VueRouter, {RouteConfig} from 'vue-router';
import Home from '@/components/Home/Home.vue';
import Login from '@/components/Auth/Login/Login.vue';
import Registration from '@/components/Auth/Registration/Registration.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
    {
        path: '/',
        name: 'home',
        component: Home,
    },
    {
        path: '/login',
        name: 'login',
        component: Login,
    },
    {
        path: '/registration',
        name: 'reg',
        component: Registration,
    },
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
});

export default router;
