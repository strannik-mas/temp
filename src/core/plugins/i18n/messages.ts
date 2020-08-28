import {LocaleMessageObject} from 'vue-i18n';
import {Messages} from './types';

const en: LocaleMessageObject = require('./translations/en');
const he: LocaleMessageObject = require('./translations/he');

export const messages: Messages = {
    en,
    he,
};
