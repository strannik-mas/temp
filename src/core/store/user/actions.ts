import {ActionTree} from 'vuex';
import axios from '@/core/plugins/axios';
import {AxiosResponse} from 'axios';
import {ProfileState, User} from './types';
import {RootState} from '../types';

export const actions: ActionTree<ProfileState, RootState> = {
    async registerPhone({commit}, payload: User) {
        commit('clearError', null, {root: true});
        const url = `${process.env.VUE_APP_API_URL}auth/client/registerPhoneStepOne`;

        const user = payload;

        try {
            await axios.post(url, payload).then((response: AxiosResponse<any>) => {
                const data = response && response.data;
                console.log(data);
                if (data.status === 'success') {
                    user.state = data.state;
                    commit('profileLoaded', user);

                    /**
                     * если отключен сервис смс (то придет code в ответе сервера)
                     * и это demo сервер, то выводим alert с кодом активации
                     */
                    if (process.env.VUE_APP_API_URL.indexOf('demo') >= 0 && typeof data.code !== 'undefined') {
                        //eslint-disable-next-line no-alert
                        alert('Activation code:' + data.code);
                    }
                }
            }, (error) => {
                console.log(error.response.data.errors);
                commit('setError', error.response.data.errors, {root: true});
                commit('profileError');
            });
        } catch (e) {
            commit('setError', e, {root: true});
        }
    },
    async activateUserPhone({commit, getters}, payload: {code: number; phone: string; api_key: string}) {
        commit('clearError', null, {root: true});

        const url = `${process.env.VUE_APP_API_URL}auth/client/activationPhone`;
        try {
            await axios.post(url, payload).then((response: AxiosResponse<any>) => {
                const data = response && response.data;
                console.log(data);
                const user = getters.userObj;
                if (data.status === 'success' && user.state !== 2) {
                    if (typeof data.email !== 'undefined' && typeof data.token !== 'undefined') {
                        localStorage.setItem('token', data.token);
                        user.email = data.email;
                        user.firstName = data.first_name;
                        user.lastName = data.last_name;
                        user.state = data.state;
                        commit('profileLoaded', user);
                    } else {
                        commit('changeUserState', 1);
                    }
                } else if (data.status === 'fail') {
                    commit('setError', {code: [data.message]}, {root: true});
                }
            }, (error) => {
                console.log(error);
                console.log(error.response.data.errors);
                commit('setError', error.response.data.errors, {root: true});
            });
        } catch (error) {
            commit('setError', error, {root: true});
        }
    },
    async registerUserByPhone({commit}, payload: User) {
        commit('clearError', null, {root: true});
        const user = payload;

        const url = `${process.env.VUE_APP_API_URL}auth/client/registerUserByPhone`;
        try {
            await axios.post(url, payload).then((response: AxiosResponse<any>) => {
                const data = response && response.data;
                console.log(data);
                if (data.status === 'success') {
                    localStorage.setItem('token', data.token);
                    user.state = data.state;
                    user.id = data.id;
                    commit('profileLoaded', user);
                }
            }, (error) => {
                console.log(error.response.data.errors);
                commit('setError', error.response.data.errors, {root: true});
                commit('profileError');
            });
        } catch (error) {
            commit('setError', error, {root: true});
            throw error;
        }
    },
    async refreshUser({commit}) {
        commit('clearError', null, {root: true});
        const url = `${process.env.VUE_APP_API_URL}auth/client/refreshClient`;

        try {
            await axios.post(url, {}).then((response: AxiosResponse<any>) => {
                const data = response && response.data;
                console.log(data);
                if (data.status === 'success') {
                    commit('profileLoaded', data.user);
                } else {
                    localStorage.removeItem('token');
                }
            }, (error) => {
                console.log(error.response.data.errors);
                commit('setError', error.response.data.errors, {root: true});
                commit('profileError');
                localStorage.removeItem('token');
            });
        } catch (error) {
            commit('setError', error, {root: true});
            localStorage.removeItem('token');
        }
    },
    async registerUser({commit}, payload: User) {
        commit('clearError', null, {root: true});
        commit('setLoading', true, {root: true});
        const user = payload;

        const url = `${process.env.VUE_APP_API_URL}auth/client/registerStepOne`;
        try {
            await axios.post(url, payload).then((response: AxiosResponse<any>) => {
                const data = response && response.data;
                console.log(data);
                if (data.status === 'success') {
                    localStorage.setItem('token', data.token);
                    localStorage.setItem('expires_token', data.expires_in);
                    user.state = 0;
                    commit('profileLoaded', user);
                }
            }, (error) => {
                console.log(error.response.data.errors);
                commit('setError', error.response.data.errors, {root: true});
                commit('profileError');
            });
        } catch (error) {
            commit('setError', error, {root: true});
            throw error;
        } finally {
            commit('setLoading', false, {root: true});
        }
    },
    async activateUserEmail({commit}, payload: {code: number}) {
        commit('clearError', null, {root: true});
        commit('setLoading', true, {root: true});

        const url = `${process.env.VUE_APP_API_URL}auth/client/activation?token=${localStorage.getItem('token')}`;
        try {
            await axios.post(url, payload).then((response: AxiosResponse<any>) => {
                const data = response && response.data;
                console.log(data);
                if (data.status === 'success') {
                    commit('changeUserState', 1);
                } else if (data.status === 'fail') {
                    commit('setError', {code: [data.message]}, {root: true});
                }
            }, (error) => {
                console.log(error);
                commit('setError', error.response.data.errors, {root: true});
            });
        } catch (error) {
            commit('setError', error, {root: true});
            throw error;
        } finally {
            commit('setLoading', false, {root: true});
        }
    },
    async loginUser({commit}, payload: User) {
        commit('clearError', null, {root: true});
        commit('setLoading', true, {root: true});
        const user = payload;

        const url = `${process.env.VUE_APP_API_URL}auth/client/login`;
        try {
            await axios.post(url, payload).then((response: AxiosResponse<any>) => {
                const data = response && response.data;
                console.log(data);
                if (data.status === 'success') {
                    localStorage.setItem('token', data.access_token);
                    localStorage.setItem('expires_token', data.expires_in);
                    user.firstName = data.first_name;
                    user.lastName = data.last_name;
                    user.phone = data.phone;
                    user.state = data.state;
                    commit('profileLoaded', user);
                } else {
                    commit('setError', {message: [data.info]}, {root: true});
                }
            }, (error) => {
                console.log(error.response.data.errors);
                commit('setError', error.response.data.errors, {root: true});
                commit('profileError');
            });
        } catch (error) {
            commit('setError', error, {root: true});
            throw error;
        } finally {
            commit('setLoading', false, {root: true});
        }
    },
    logoutUser({commit}) {
        localStorage.removeItem('token');
        commit('profileLoaded', undefined);
    },
};
