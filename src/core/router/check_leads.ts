import {Lead} from '@/core/store/lead/types';
// eslint-disable-next-line import/extensions,import/no-unresolved
import {NavigationGuardNext, Route} from 'vue-router/types/router';
import store from '../store';
import AuthGuard from './auth_guard';

export default function (to: Route, from: Route, next: NavigationGuardNext) {
    let getterStr = 'lead/activeLeads';
    let isActive = 1;
    if (to.path === '/history') {
        getterStr = 'lead/historyLeads';
        isActive = 0;
    }
    console.log(to.path);
    const leads: Array<Lead> = store.getters[getterStr];
    //console.log(getterStr);
    console.log(leads);
    //если лидов нет - догружаем их с сервера
    if (leads === undefined) {
        const userId: number|null = store.getters['user/userId'];
        if (userId) {
            //console.log(isActive);
            store.dispatch('lead/setLeads', {active: isActive, id: userId}).then((resp) => {
                console.log(resp);
                if (resp.status === 'success') {
                    AuthGuard(to, from, next);
                }
            })
                .catch((err) => console.log(err));
        }
    } else {
        AuthGuard(to, from, next);
    }
}
