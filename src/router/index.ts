import Vue from 'vue';
import VueRouter, {RouteConfig} from 'vue-router';
import Home from '@/components/Home/Home.vue';
import Login from '@/components/Auth/Login/Login.vue';
import Registration from '@/components/Auth/Registration/Registration.vue';
import History from '@/components/History/History.vue';
import Scheduler from '@/components/Scheduler/Scheduler.vue';

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
    {
        path: '*',
        redirect: '/',
    },
    {
        path: '/history',
        name: 'history',
        component: History,
    },
    {
        path: '/scheduler',
        name: 'scheduler',
        component: Scheduler,
    },
];

const router = new VueRouter({
    mode: 'hash',
    base: process.env.BASE_URL,
    routes,
});

export default router;
