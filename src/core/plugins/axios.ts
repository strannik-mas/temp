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

export default axios.create({
    baseURL: process.env.VUE_APP_API_URL,
    transformRequest: [
        (data: any, headers: any) => {
            data.append('locale', i18n.locale);
            return data;
        },
    ],
    ...defaultTransformers(),
});
