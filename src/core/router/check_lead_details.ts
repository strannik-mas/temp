import {Lead, LeadDetails} from '@/core/store/lead/types';
// eslint-disable-next-line import/extensions,import/no-unresolved
import {NavigationGuardNext, Route} from 'vue-router/types/router';
import AuthGuard from '@/core/router/auth_guard';
import store from '../store';

export default function (to: Route, from: Route, next: NavigationGuardNext) {
    let isActive = 1;
    if (from.path === '/history') {
        isActive = 0;
    }

    const details: LeadDetails|undefined = store.getters['lead/getLeadDetails'](+to.params.id);
    if (details === undefined) {
        //при перезагрузке нужно подгрузить еще и лиды
        const lead: Lead|undefined = store.getters['lead/getLeadById'](+to.params.id);
        if (lead === undefined) {
            const userId: number|null = store.getters['user/userId'];
            if (userId) {
                store.dispatch('lead/setLeads', {active: 0, id: userId}).then((resp) => {
                    console.log(resp);
                    if (resp.status === 'success') {
                        store.dispatch('lead/setLeads', {active: 1, id: userId}).then((resp2) => {
                            console.log(resp2);
                            if (resp2.status === 'success') {
                                store.dispatch('lead/setLeadDetails', {id: +to.params.id, active: isActive}).then((resp3) => {
                                    console.log(resp3);
                                    if (resp3.status === 'success') {
                                        AuthGuard(to, from, next);
                                    }
                                })
                                    .catch((err) => console.log(err));
                            }
                        })
                            .catch((err) => console.log(err));
                    }
                })
                    .catch((err) => console.log(err));
            }
        } else {
            store.dispatch('lead/setLeadDetails', {id: +to.params.id, active: isActive}).then((resp) => {
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
