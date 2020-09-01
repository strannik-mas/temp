import axios from 'axios';
import i18n from '@/core/plugins/i18n';

const defaultTransformers = (): any => {
    const {transformRequest} = axios.defaults;
    if (! transformRequest) {
        return [];
    } if (transformRequest instanceof Array) {
        return transformRequest;
    }
    return [transformRequest];
};

export const config: any = {
    baseURL: process.env.VUE_APP_API_URL,
    transformRequest: [
        (data: any, headers: any) => {
            if (data !== undefined) {
                const token: string|null = localStorage.getItem('token');

                if (token && typeof token !== 'undefined') {
                    //eslint-disable-next-line no-param-reassign
                    data.token = token;
                    //eslint-disable-next-line no-param-reassign
                    headers.Authorization = 'Bearer ' + token;
                }

                //eslint-disable-next-line no-param-reassign,@typescript-eslint/camelcase
                data.api_key = process.env.VUE_APP_API_KEY;

                let currentLocale: string = i18n.locale;

                if (! currentLocale) {
                    currentLocale = process.env.VUE_APP_DEFAULT_LOCALE;
                }

                //eslint-disable-next-line no-param-reassign
                data.locale = currentLocale;
            }

            return data;
        },
        ...defaultTransformers(),
    ],
};

export default axios.create(config);
