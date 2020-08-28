import store from '@/core/store';
import {User} from '@/core/store/user/types';
//eslint-disable-next-line import/extensions,import/no-unresolved
import {NavigationGuardNext, Route} from 'vue-router/types/router';

export default (to: Route, from: Route, next: NavigationGuardNext) => {
    //console.log(from);
    const user: User = store.getters['user/userObj'];
    if (typeof user !== 'undefined' && user.state === 2) {
        next();
    } else {
        //console.log(to.path);
        if (to.path.indexOf('create/lead') === -1) {
            next('/');
        }
    }
};
