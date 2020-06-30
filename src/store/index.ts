import Vue from 'vue';
import Vuex, {StoreOptions} from 'vuex';
import {RootState, ValidationErrors} from '@/store/types';
import {user} from '@/store/user';
import {sphere} from '@/store/sphere';

Vue.use(Vuex);

const store: StoreOptions<RootState> = {
    state: {
        loading: false,
        errors: null,
    },
    mutations: {
        setLoading(state: RootState, payload: boolean) {
            state.loading = payload;
        },
        setError(state: RootState, payload: ValidationErrors) {
            state.errors = payload;
        },
        clearError(state: RootState) {
            state.errors = null;
        },
    },
    actions: {
        setLoading({commit}: any, payload: boolean) {
            commit('setLoading', payload);
        },
        setError({commit}: any, payload: ValidationErrors) {
            commit('setError', payload);
        },
        clearError({commit}: any) {
            commit('clearError');
        },
    },
    getters: {
        loading(state: {loading: boolean}) {
            return state.loading;
        },
        errors(state: {errors: ValidationErrors}) {
            return state.errors;
        },
    },
    modules: {
        user, sphere,
    },
};

export default new Vuex.Store<RootState>(store);
