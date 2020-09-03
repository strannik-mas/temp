<template>
    <div class="SphereLeadForm pt-2" v-if="typeof sphereById !== 'undefined'">
        <h1 class="text--primary text-center">{{$t("create_lead.header")}}</h1>
        <h2 class="text--secondary text-center">{{$t("create_lead.sphere")}}: {{sphereById.sphere.name}}</h2>
        <v-alert
                v-model="alert"
                :type="alertType"
                @close="alert = !alert"
                dismissible
                light
                class="ma-3"
                id="alertMessage"
        >
            {{alertText}}
            <div class="text--white mt-2" v-if="validationErrors && typeof validationErrors['name'] !== 'undefined'">
                <p
                        v-for="(error, index) in validationErrors['name']"
                        :key="index"
                >{{error}}</p>
            </div>
            <div class="text--white mt-2" v-if="validationErrors && typeof validationErrors['phone'] !== 'undefined'">
                <p
                        v-for="(error, index) in validationErrors['phone']"
                        :key="index"
                >{{error}}</p>
            </div>
        </v-alert>
        <v-form ref="form" id="leadForm" v-if="alertType !== 'success'">
            <input type="hidden" name="sphere_id" :value="sphereById.sphere.id">
            <input type="hidden" name="source" value="client">
            <input type="hidden" name="user_id" :value="getUser.id">
            <div
                    :class="'form-group pr-3 pl-3 pb-6' +
                        ((attribute.name === 'name' || attribute.name === 'phone' || attribute.name === 'email') ?
                         ' hide__block' : '')"
                    v-for="(attribute, index) in attributes"
                    :key="index"
            >
                    <v-card
                        class="mx-auto pl-2 pr-2"
                        :id="attribute.name"
                        :height="(attribute.type === 'text' || attribute.type === 'tel'  ||
                            attribute.type === 'email' || attribute.type === 'date') ? '50px' : 'auto'"
                        :color="(validationErrors &&
                                 (typeof validationErrors[attribute.name] !== 'undefined' ||
                                  typeof validationErrors['fields.' + attribute.name] !== 'undefined')) ?
                                   '#FFC9C9' : ''"
                        :style="{
                            border: '1px solid #c3c3c3',
                            color: '#585858',
                            minHeight: '50px',
                            maxWidth: '600px',
                            borderRadius: '25px',
                        }"
                    >
                        <v-layout v-if="attribute.type !== 'text'
                            && attribute.type !== 'tel'  && attribute.type !== 'email' && attribute.type !== 'date'">
                            <i
                                    class="ic ma-3"
                                    :style="{
                            backgroundImage: 'url(' + attribute.icon + ')'
                        }"
                            />
                            <v-flex xs12 :style="{display: 'inline-block', verticalAlign: 'top'}">
                                <div class="title contact-attr-title mt-3">
                                    {{ attribute.label }}
                                </div>
                            </v-flex>
                        </v-layout>

                    <v-flex xs12 class="ma-0 pa-0"
                            v-if="attribute.type === 'text' || attribute.type === 'tel'  || attribute.type === 'email'"
                    >
                        <i
                                class="ic__text"
                                :style="{
                                    backgroundImage: 'url(' + attribute.icon + ')'
                                }"
                        />
                        <v-text-field
                            :type="attribute.type"
                            :name="attribute.name"
                            :value="getValue(attribute.name)"
                            :placeholder="attribute.label"
                            :hide-details="true"
                            @input="setColor(attribute.name, attribute.type)"
                            font-size="1em"
                            class="ml-10 mr-10 mt-0 pt-2 custom-placeholer-color"
                        />
                        <div class="error--text mt-2" v-if="validationErrors &&
                                 typeof validationErrors[attribute.name] !== 'undefined'">
                            <p
                                    v-for="(error, index) in validationErrors[attribute.name]"
                                    :key="index"
                            >{{error}}</p>
                        </div>
                    </v-flex>

                    <v-flex xs12 v-if="attribute.type === 'date'">
                        <i
                                class="ic__text"
                                :style="{
                            backgroundImage: 'url(' + attribute.icon + ')'
                        }"
                        />
                        <v-menu
                                ref="menu1"
                                v-model="menu1"
                                :close-on-content-click="false"
                                transition="scale-transition"
                                offset-y
                                max-width="290px"
                                min-width="290px"
                        >
                            <template v-slot:activator="{ on, attrs }">
                                <v-text-field
                                        v-model="computedDateFormatted"
                                        :name="'fields[' + attribute.name + ']'"
                                        v-bind="attrs"
                                        class="ml-10 mr-10 mt-0 pt-2 custom-placeholer-color"
                                        :placeholder="attribute.label"
                                        @blur="date = parseDate(dateFormatted)"
                                        @input="setColor(attribute.name, attribute.type)"
                                        v-on="on"
                                />
                            </template>
                            <v-date-picker
                                    v-model="date"
                                    no-title
                                    @input="menu1 = false"
                                    @change="setColor(attribute.name, attribute.type)"
                            />
                        </v-menu>
                    </v-flex>

                    <v-flex xs12 v-if="attribute.type === 'radio' || attribute.type === 'select'">
                        <v-radio-group row wrap>
                            <v-flex
                                    xs12
                                    v-for="(option, index2) in attribute.options"
                                    :key="index2"
                                    @click="setColor(attribute.name, attribute.type)"
                                >
                                <v-radio
                                        :value="option.value"
                                        :label="option.label"
                                        :name="'fields[' + option.value + ']'"
                                        :style="{
                                            margin: '0 12px'
                                        }"
                                />
                            </v-flex>
                        </v-radio-group>
                        <div class="error--text" v-if="validationErrors &&
                                 typeof validationErrors['fields.' + attribute.name] !== 'undefined'">
                            <p
                                    v-for="(error, index) in validationErrors['fields.' + attribute.name]"
                                    :key="index"
                            >{{error}}</p>
                        </div>
                    </v-flex>

                    <v-flex xs12 class="pa-3" v-if="attribute.type === 'checkbox'">
                        <v-layout row wrap>
                            <v-flex
                                    xs12
                                    v-for="(option, index2) in attribute.options"
                                    :key="index2"
                                    @click="setColor(attribute.name, attribute.type)"
                            >
                                <v-checkbox
                                        :value="option.value"
                                        :label="option.label"
                                        :hide-details="true"
                                        :style="{
                                            margin: '0 12px'
                                        }"
                                        :name="'fields[' + option.value + ']'"
                                />
                            </v-flex>
                        </v-layout>
                        <div
                                class="error--text"
                                v-if="validationErrors &&
                                 typeof validationErrors['fields.' + attribute.name] !== 'undefined'">
                            <p
                                    v-for="(error, index) in validationErrors['fields.' + attribute.name]"
                                    :key="index"
                            >{{error}}</p>
                        </div>
                    </v-flex>
                    <v-textarea
                            v-if="attribute.type === 'textarea'"
                            :name="attribute.name"
                            :type="attribute.type"
                            @input="setColor(attribute.name, attribute.type)"
                    />
                </v-card>
            </div>

            <div class="lead__actions">
                <!--<v-btn
                        color="error"
                        @click="reset"
                >
                    Reset Form
                </v-btn>-->

                <v-btn
                        color="success"
                        class="ma-10"
                        @click="submit"
                >
                    {{$t("create_lead.send_lead_btn")}}
                </v-btn>
            </div>
        </v-form>
    </div>
</template>

<script>
import axios from 'axios';
import * as easings from 'vuetify/es5/services/goto/easing-patterns';
import Common from '@/core/mixins/Common';
import i18n from '@/core/plugins/i18n';

export default {
    mixins: [Common],
    props: ['id'],
    computed: {
        sphereById() {
            return this.$store.getters['sphere/sphereById'](+this.id);
        },
        attributes() {
            const sphere = this.sphereById;
            if (typeof sphere !== 'undefined' && typeof sphere.attributes !== 'undefined') {
                return sphere.attributes;
            }
            return null;
        },
        getUser() {
            return this.$store.getters['user/userObj'];
        },
        validationErrors() {
            const {errors} = this.$store.getters;
            //console.log(errors);
            let target = '';
            if (errors && typeof errors !== 'undefined') {
                if (errors.hasOwnProperty('name')) {
                    target = '#name';
                } else if (errors.hasOwnProperty('phone')) {
                    target = '#phone';
                }

                if (target !== '') {
                    this.$vuetify.goTo(target, {
                        duration: 300,
                        offset: 0,
                        easing: 'easeInOutCubic',
                    });
                }
                console.log(errors);
                return errors;
            }
            return null;
        },
        computedDateFormatted() {
            return this.formatDate(this.date);
        },
    },
    watch: {
        date(val) {
            this.dateFormatted = this.formatDate(this.date);
        },
    },
    data() {
        return {
            date: null,
            dateFormatted: null,
            menu1: false,
            name: '',
            phone: '',
            alert: false,
            alertType: null,
            alertText: '',
        };
    },
    methods: {
        reset() {
            this.$refs.form.reset();

            this.$store.dispatch('setError', null, {root: true});
            this.$vuetify.goTo(0, {
                duration: 300,
                offset: 0,
                easing: 'easeInOutCubic',
            });

            this.attributes.forEach(attribute => {
                this.setColor(attribute.name, attribute.type);
            });
        },
        submit() {
            const formElement = document.getElementById('leadForm');
            const data = new FormData(formElement);
            data.append('api_key', process.env.VUE_APP_API_KEY);
            data.append('locale', i18n.locale);
            try {
                axios({
                    method: 'post',
                    url: `${process.env.VUE_APP_API_OLD_URL}sphere/form/data/save`,
                    data,
                    config: {headers: {'Content-Type': 'multipart/form-data'}},
                }).then(response => {
                    //handle success
                    const dataResp = response && response.data;
                    console.log(dataResp);
                    this.$vuetify.goTo('#alertMessage', {
                        duration: 300,
                        offset: 0,
                        easing: 'easeInOutCubic',
                    });
                    if (dataResp.status === 'success') {
                        this.$store.dispatch('setError', null, {root: true});
                        this.alert = true;
                        this.alertText = i18n.t('create_lead.success_msg');
                        this.alertType = 'success';

                        let route = '/';
                        if (this.isUserLoggedIn()) {
                            route = '/history';
                        }
                        setTimeout(() => { this.$router.push(route); }, 2000);
                    } else if (dataResp.status === 'error') {
                        this.alert = true;
                        this.alertText = dataResp.error.message;
                        this.alertType = 'error';
                    }
                    if (typeof dataResp.error !== 'undefined' && dataResp.status !== 'error') {
                        console.log(dataResp.error);
                        this.$store.dispatch('setError', dataResp.error, {root: true});
                        this.alert = true;
                        this.alertText = i18n.t('create_lead.error_msg');
                        this.alertType = 'warning';
                    }
                })
                    .catch((response) => {
                        this.$store.dispatch('setError', response.errors, {root: true});
                        console.log(response.errors);
                    });
            } catch (error) {
                console.log(error);
                this.$store.dispatch('setError', error, {root: true});
            }
        },
        formatDate(date) {
            if (! date) return null;

            const [year, month, day] = date.split('-');
            return `${day}/${month}/${year}`;
        },
        parseDate(date) {
            if (! date) return null;

            const [day, month, year] = date.split('/');
            return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
        },
        setColor(name, type) {
            let collections = [];
            let val = '';
            let field = name;
            if (type === 'text' || type === 'tel' || type === 'email' || type === 'textarea') {
                collections = document.getElementsByName(name);
                val = collections[0].value;
            } else if (type === 'date') {
                collections = document.getElementsByName(`fields[${name}]`);
                val = this.computedDateFormatted;
            } else if (type === 'radio' || type === 'checkbox') {
                field = `fields.${name}`;
                collections = document.getElementById(name).getElementsByTagName('input');
                //const res = [].filter.call(collections, (node) => node.checked === true);
                for (let i = 0; i < collections.length; i++) {
                    if (collections[i].checked) {
                        val = 'checked';
                        break;
                    }
                }
            }

            if (typeof collections[0] !== 'undefined') {
                //console.log(val);
                if (val !== '') {
                    //document.getElementById(name).style.background = 'none';
                    //console.log(document.getElementById(name));
                    document.getElementById(name).style.backgroundColor = '#B6FFB6';

                    this.deleteError(field);
                    const errorDiv = document.getElementById(name).getElementsByClassName('error--text')[0];
                    if (typeof errorDiv !== 'undefined') {
                        errorDiv.style.display = 'none';
                    }
                } else {
                    document.getElementById(name).style.backgroundColor = '#fff';
                }
            }
        },
        getValue(name) {
            if (this.isUserLoggedIn()) {
                const user = this.getUser;
                let fName, lName;
                let fullName = null;
                switch (name) {
                    case 'name':
                        fName = user.firstName ? user.firstName : '';
                        lName = user.lastName ? user.lastName : '';
                        if (fName || lName) {
                            fullName = fName + ' ' + lName;
                        }
                        return fullName;
                    case 'phone':
                        return user.phone;
                    case 'email':
                        return user.email;
                    default:
                        return null;
                }
            }
            return null;
        },
        deleteError(field) {
            this.$store.dispatch('delError', field, {root: true});
        },
    },
    beforeDestroy() {
        this.$store.dispatch('setError', null, {root: true});
        console.log(this.validationErrors);
    },
    mounted() {
        if (this.isUserLoggedIn()) {
            this.setColor('name', 'text');
            this.setColor('phone', 'text');
            this.setColor('email', 'text');
        }
        this.$store.dispatch('setError', null, {root: true});
        console.log(this.validationErrors);
        this.$vuetify.goTo(0, {
            duration: 300,
            offset: 0,
            easing: 'easeInOutCubic',
        });
    },
};
</script>

<style lang="scss">
    i.ic, .ic__text {
        height: 25px;
        width: 25px;
        display: inline-block;
        background-size: contain;
        background-position: 50%;
        background-repeat: no-repeat;
    }

    .ic__text {
        position: absolute;
        margin: 0 10px;
        top: 10px;
    }

    .lead__actions {
        text-align: center;
        margin-bottom: 20px;
    }

    input[type~="text"], input[type~="tel"], input[type~="email"], textarea {
        /*font-size: 20px;
        font-weight: bold;*/
    }

    .SphereLeadForm .custom-placeholer-color input::placeholder {
        color: black!important;
        opacity: 1;
    }

    .SphereLeadForm .v-input__slot:after, .SphereLeadForm .v-input__slot:before {
        width: 0 !important;
    }

    .SphereLeadForm {
        background-color: #f7f7f7;
    }

    .SphereLeadForm input:-webkit-autofill {
        -webkit-box-shadow: inset 0 0 0 16px #B6FFB6 !important; /* Цвет фона */
    }

    .hide__block {
        display: none;
    }
</style>
