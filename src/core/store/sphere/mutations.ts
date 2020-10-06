import {MutationTree} from 'vuex';
import {SphereArr, SphereState} from './types';

export const mutations: MutationTree<SphereState> = {
    spheresLoaded(state, payload: Array<SphereArr>) {
        state.error = false;
        state.spheres = payload;
    },
    updateSphere(state, payload: {attributes: Array<any>; sphereId: number}) {
        const sphereArr = state.spheres.find(spheres => spheres.sphere.id === payload.sphereId);
        if (sphereArr !== undefined) {
            sphereArr.attributes = payload.attributes;
        }
        /*ad.title = title
        ad.description = description*/
    },
};
