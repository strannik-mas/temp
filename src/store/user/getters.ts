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
    email(state): string {
        const {user} = state;
        return (user && user.email) || '';
    },
    userObj(state) {
        return state.user;
    },
    isUserLoggedIn(state) {
        const token = localStorage.getItem('token');
        alert(JSON.stringify(state));
        alert(token);
        return (token !== null && typeof state.user !== 'undefined');
    },
};
