import Vue from 'vue';
import Vuetify from 'vuetify';

Vue.use(Vuetify);

let rtlDirection = true;
const curLanguage = localStorage.getItem('lng');
if (curLanguage === 'en') {
    rtlDirection = false;
}

export default new Vuetify({
    rtl: rtlDirection,
});
