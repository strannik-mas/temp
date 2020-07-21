import {MutationTree} from 'vuex';
import {SphereArr, SphereState} from './types';

export const mutations: MutationTree<SphereState> = {
    spheresLoaded(state, payload: Array<SphereArr>) {
        state.error = false;
        state.spheres = payload;
    },
};
