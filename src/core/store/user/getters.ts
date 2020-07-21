import {GetterTree} from 'vuex';
import {ProfileState} from './types';
import {RootState} from '../types';

export const getters: GetterTree<ProfileState, RootState> = {
    fullName(state): string {
        const {user} = state;
        const firstName = (user && user.firstName) || '';
        const lastName = (user && user.lastName) || '';
        return `${firstName} ${lastName}`;
    },
    userObj(state) {
        return state.user;
    },
    isUserLoggedIn(state) {
        const ttl: number|null = Number(localStorage.getItem('expires_token'));
        const token: string|null = localStorage.getItem('token');
        console.log(state.user);
        console.log(token);
        console.log(ttl);
        console.log(new Date(ttl));
        return (token !== null && typeof state.user !== 'undefined');
    },
};
