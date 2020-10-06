import Vue from 'vue';
import VueRouter, {NavigationGuardNext, Route} from 'vue-router';
import {routes} from '@/core/router/routes';
import LoadStartData from '@/core/router/start_data';

Vue.use(VueRouter);

const router = new VueRouter({
    mode: 'hash',
    base: process.env.BASE_URL,
    routes,
});

router.beforeEach((to: Route, from: Route, next: NavigationGuardNext) => {
    LoadStartData(to, from, next);
});

export default router;
