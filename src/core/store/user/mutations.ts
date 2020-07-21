import {MutationTree} from 'vuex';
import {ProfileState, User} from './types';

export const mutations: MutationTree<ProfileState> = {
    profileLoaded(state, payload: User|undefined) {
        state.error = false;
        state.user = payload;
    },
    profileError(state) {
        state.error = true;
        state.user = undefined;
    },
    changeUserState(state, payload: number) {
        const {user} = state;
        if (typeof user !== 'undefined') {
            user.state = payload;
        }
    },
};
