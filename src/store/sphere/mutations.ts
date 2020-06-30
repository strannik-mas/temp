import {MutationTree} from 'vuex';
import {Sphere, SphereState} from './types';

export const mutations: MutationTree<SphereState> = {
    spheresLoaded(state, payload: Array<Sphere>) {
        state.error = false;
        state.spheres = payload;
    },
};
