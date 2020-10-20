import {RouteConfig} from 'vue-router';
import History from '@/core/components/Lead/History.vue';
import Scheduler from '@/components/Scheduler.vue';
//import Home from '@/components/Home.vue';
import HomeVideo from '@/core/components/HomeVideo.vue';
// import Login from '@/core/components/Auth/Login.vue';
// import Registration from '@/core/components/Auth/Registration.vue';
import SphereLeadForm from '@/core/components/Lead/SphereLeadForm.vue';
import Requests from '@/core/components/Lead/Requests.vue';
import LeadDetails from '@/core/components/Lead/LeadDetails.vue';
import AuthGuard from './auth_guard';
import CheckSphereAttributes from './check_sphere_attributes';
import CheckLeads from './check_leads';
import CheckLeadDetails from './check_lead_details';

export const routes: Array<RouteConfig> = [
    {
        path: '/',
        name: 'home',
        component: HomeVideo,
    },
    /*{
        path: '/login',
        name: 'login',
        component: Login,
    },
    {
        path: '/registration',
        name: 'reg',
        component: Registration,
    },*/
    {
        path: '/requests',
        name: 'requests',
        component: Requests,
        beforeEnter: CheckLeads,
    },
    {
        path: '/history',
        name: 'history',
        component: History,
        beforeEnter: CheckLeads,
    },
    {
        path: '/scheduler',
        name: 'scheduler',
        component: Scheduler,
        beforeEnter: AuthGuard,
    },
    {
        path: '/create/lead/:id/:leadId?',
        props: true,
        name: 'leadCreate',
        component: SphereLeadForm,
        beforeEnter: CheckSphereAttributes,
    },
    {
        path: '/show/lead/:id/:sphereId',
        props: true,
        name: 'showLead',
        component: LeadDetails,
        beforeEnter: CheckLeadDetails,
    },
];
