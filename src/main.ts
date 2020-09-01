import Vue from 'vue';
import Vuelidate from 'vuelidate';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './core/store';
import vuetify from './core/plugins/vuetify';
import i18n from './core/plugins/i18n';
import '@/core/styles/global.scss';

Vue.config.productionTip = false;
Vue.use(Vuelidate);

new Vue({
    router,
    store,
    vuetify,
    i18n,
    render: (h) => h(App),
}).$mount('#app');
