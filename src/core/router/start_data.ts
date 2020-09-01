import {User} from '@/core/store/user/types';
import store from '../store';

export default function (to: any, from: any, next: any) {
    const token: string|null = localStorage.getItem('token');
    const user: User = store.getters['user/userObj'];

    if (token && typeof token !== 'undefined' && typeof user === 'undefined') {
        //если токен есть, а юзера нет, находим юзера
        store.dispatch('user/refreshUser').then((r) => next());
    } else {
        next();
    }

    const spheres = store.getters['sphere/getUniversalSpheres'];
    if (spheres.length === 0) {
        store.dispatch('sphere/fetchUniversalSpheres');
    }
}
