import Vue from 'vue';
import Vuex, {StoreOptions} from 'vuex';
import {RootState, ValidationErrors} from './types';
import {user} from './user';
import {sphere} from './sphere';

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
        delError(state: RootState, payload: string) {
            if (state.errors !== null) {
                //eslint-disable-next-line @typescript-eslint/ban-ts-ignore
                //@ts-ignore
                delete state.errors[payload];
                /*const keysArr = Object.keys(state.errors);
                for (let i = 0; i < keysArr.length; i++) {
                    if (keysArr[i] === payload) {
                        //eslint-disable-next-line @typescript-eslint/ban-ts-ignore
                        //@ts-ignore
                        delete state.errors[keysArr[i]];
                    }
                }*/
            }
        },
    },
    actions: {
        setLoading({commit}: any, payload: boolean) {
            commit('setLoading', payload);
        },
        setError({commit}: any, payload: ValidationErrors) {
            commit('setError', payload);
        },
        delError({commit}: any, payload: string) {
            commit('delError', payload);
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
