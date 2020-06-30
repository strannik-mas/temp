import {GetterTree} from 'vuex';
import {Sphere, SphereState} from './types';
import {RootState} from '../types';

export const getters: GetterTree<SphereState, RootState> = {
    getUniversalSpheres(state): Array<Sphere> {
        return state.spheres;
    },
};
