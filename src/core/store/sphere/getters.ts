import {GetterTree} from 'vuex';
import {Sphere, SphereArr, SphereState} from './types';
import {RootState} from '../types';

export const getters: GetterTree<SphereState, RootState> = {
    getUniversalSpheres(state): Array<SphereArr> {
        return state.spheres;
    },
    sphereById(state): (sphereId: number) => any {
        return (sphereId: number) => state.spheres.find((sphereArr: SphereArr) => sphereArr.sphere.id === sphereId);
    },
};
