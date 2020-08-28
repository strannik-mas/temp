import Vue from 'vue';
import VueI18n from 'vue-i18n';
import {messages} from './messages';

Vue.use(VueI18n);

let curLanguage = localStorage.getItem('lng');
if (curLanguage === null) {
    curLanguage = String(process.env.VUE_APP_DEFAULT_LOCALE);
    localStorage.setItem('lng', curLanguage);
}

export default new VueI18n({
    locale: curLanguage,
    messages,
});
