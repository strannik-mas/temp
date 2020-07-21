import {ActionTree} from 'vuex';
import axios, {AxiosResponse} from 'axios';
import {Sphere, SphereState} from './types';
import {RootState} from '../types';

export const actions: ActionTree<SphereState, RootState> = {
    async fetchUniversalSpheres({commit}) {
        commit('clearError', null, {root: true});
        commit('setLoading', true, {root: true});

        const url = `${process.env.VUE_APP_API_URL}client/get/spheres`;
        const resultSpheres: Array<Sphere> = [];
        try {
            await axios.get(url, {
                //eslint-disable-next-line @typescript-eslint/camelcase
                params: {api_key: process.env.VUE_APP_API_KEY},
            }).then((response: AxiosResponse<any>) => {
                const data = response && response.data;
                console.log(data);
                if (data.status === 'success' && typeof data.spheres !== 'undefined') {
                    /*Object.keys(data.spheres).forEach((key: any) => {
                        const sphereObj: Sphere = {
                            id: data.spheres[key].sphere.id,
                            name: data.spheres[key].sphere.name,
                            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minus, nesciunt.',
                            imageSrc: 'https://cdn.vuetifyjs.com/images/carousel/planet.jpg',
                        };
                        resultSpheres.push(sphereObj);
                    });*/
                    commit('spheresLoaded', data.spheres);
                }
            }, (error) => {
                console.log(error);
                commit('setError', error.response.data.errors, {root: true});
            });
        } catch (error) {
            console.log(error);
            commit('setError', error, {root: true});
            throw error;
        } finally {
            commit('setLoading', false, {root: true});
        }
    },
};
