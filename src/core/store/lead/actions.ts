import {ActionTree} from 'vuex';
import {AxiosResponse} from 'axios';
import axios, {config} from '@/core/plugins/axios';
import {LeadsState} from '@/core/store/lead/types';
import {RootState} from '../types';

export const actions: ActionTree<LeadsState, RootState> = {
    async setLeads({commit}, payload: {active: number; id: number}): Promise<any> {
        commit('clearError', null, {root: true});
        commit('setLoading', true, {root: true});
        let data = null;
        //console.log(payload.active);

        const url = 'client/get/leads';

        try {
            await axios.get(url, {params: {id: payload.id, active: payload.active}})
                .then((response: AxiosResponse<any>) => {
                    data = response && response.data;
                    //console.log(data);
                    commit('updateLeads', {leads: data.leads, active: payload.active});
                }, (error) => {
                    console.log(error);
                    if (error.response !== undefined && error.response.data !== undefined) {
                        commit('setError', error.response.data.errors, {root: true});
                    } else {
                        commit('setError', error, {root: true});
                    }
                });
        } catch (error) {
            console.log(error);
            commit('setError', error, {root: true});
        } finally {
            commit('setLoading', false, {root: true});
        }
        return data;
    },
    async saveLead({commit}, payload): Promise<any> {
        commit('clearError', null, {root: true});
        let resp = null;
        const url = 'sphere/form/data/save';
        config.baseURL = process.env.VUE_APP_API_OLD_URL;

        try {
            await axios.post(url, payload, config).then(response => {
                //handle success
                resp = response && response.data;
                if (resp.status === 'success') {
                    commit('addLead', resp.lead);
                }
            })
                .catch((response) => {
                    commit('setError', response.errors, {root: true});
                    resp = response;
                });
        } catch (error) {
            console.log(error);
            commit('setError', error, {root: true});
        }
        return resp;
    },
    async uploadLeadFiles(
        {commit, getters},
        payload: {id: number; files: Array<File>; agents: Array<number>; openLeads: Array<number>},
    ): Promise<any> {
        commit('clearError', null, {root: true});
        let resp = null;
        const url = 'client/lead/upload/files';
        console.log(payload);
        const formData = new FormData();
        for (let i = 0; i < payload.files.length; i++) {
            const file = payload.files[i];
            formData.append('files[' + i + ']', file);
        }
        formData.append('lead_id', String(payload.id));
        if (payload.openLeads !== undefined) {
            for (let i = 0; i < payload.openLeads.length; i++) {
                const openLeadId = payload.openLeads[i];
                formData.append('openLeads[' + i + ']', String(openLeadId));
            }
        }

        try {
            await axios.post(url, formData).then(response => {
                //handle success
                resp = response && response.data;
                console.log(resp);
                if (resp.status === 'success') {
                    for (let i = 0; i < resp.uploadedDocuments.length; i++) {
                        if (payload.agents !== undefined) {
                            resp.uploadedDocuments[i].agents = payload.agents;
                        }
                    }
                    commit('updateDocuments', {id: payload.id, documents: resp.uploadedDocuments, getters});
                }
            })
                .catch((response) => {
                    commit('setError', response.errors, {root: true});
                    resp = response;
                });
        } catch (error) {
            console.log(error);
            commit('setError', error, {root: true});
        }
        return resp;
    },
    async setLeadDetails({commit}, payload: {id: number; active: number}): Promise<any> {
        commit('clearError', null, {root: true});
        commit('setLoading', true, {root: true});
        let resp = null;
        const url = 'client/lead/details';

        try {
            await axios.get(url, {params: {id: payload.id, active: payload.active}})
                .then((response: AxiosResponse<any>) => {
                    resp = response && response.data;
                    //console.log(resp);
                    if (resp.status === 'success') {
                        commit(
                            'updateLeadDetails',
                            {id: payload.id, leadDetails: resp.leadDetails, active: payload.active},
                        );
                    }
                }, (error) => {
                    console.log(error);
                    if (error.response !== undefined && error.response.data !== undefined) {
                        commit('setError', error.response.data.errors, {root: true});
                    } else {
                        commit('setError', error, {root: true});
                    }
                });
        } catch (error) {
            console.log(error);
            commit('setError', error, {root: true});
        } finally {
            commit('setLoading', false, {root: true});
        }
        return resp;
    },
    async deleteFile({commit, getters}, payload: {id: number; leadId: number}): Promise<any> {
        commit('clearError', null, {root: true});
        let resp = null;
        const url = 'client/lead/file/delete';

        try {
            await axios.post(url, {id: payload.id}).then(response => {
                //handle success
                resp = response && response.data;
                if (resp.status === 'success') {
                    commit('deleteDocument', {id: payload.id, leadId: payload.leadId, getters});
                }
            })
                .catch((response) => {
                    commit('setError', response.errors, {root: true});
                    resp = response;
                });
        } catch (error) {
            console.log(error);
            commit('setError', error, {root: true});
        }
        return resp;
    },
};
