import {Module} from 'vuex';
import {LeadsState} from '@/core/store/lead/types';
import {getters} from './getters';
import {actions} from './actions';
import {mutations} from './mutations';
import {RootState} from '../types';

export const state: LeadsState = {
    error: false,
    requests_leads: undefined,
    hisory_leads: undefined,
};

const namespaced = true;

export const lead: Module<LeadsState, RootState> = {
    namespaced,
    state,
    getters,
    actions,
    mutations,
};
