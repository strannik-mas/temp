import Vue from 'vue';
import Vuelidate from 'vuelidate';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './core/store';
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false;
Vue.use(Vuelidate);

new Vue({
    router,
    store,
    vuetify,
    render: (h) => h(App),
}).$mount('#app');
