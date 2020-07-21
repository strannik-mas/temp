import {Module} from 'vuex';
import {getters} from './getters';
import {actions} from './actions';
import {mutations} from './mutations';
import {SphereState} from './types';
import {RootState} from '../types';

export const state: SphereState = {
    spheres: [],
    error: false,
};

const namespaced = true;

export const sphere: Module<SphereState, RootState> = {
    namespaced,
    state,
    getters,
    actions,
    mutations,
};
