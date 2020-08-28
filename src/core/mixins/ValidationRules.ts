import Vue from 'vue';
import {required, email, minLength, sameAs, numeric} from 'vuelidate/lib/validators';
import i18n from '@/core/plugins/i18n';
import {TranslateResult} from 'vue-i18n';

export default Vue.extend({
    data() {
        return {
            email: '',
            name: '',
            lastName: '',
            password: '',
            confirmPassword: '',
            phone: '',
            code: '',
        };
    },
    computed: {
        errors() {
            return this.$store.getters.errors;
        },
        loading() {
            return this.$store.getters.loading;
        },
        phoneErrors() {
            let errors: Array<string> = [];
            if (! this.$v.phone.$dirty) return errors;
            if (this.errors && typeof this.errors.phone !== 'undefined') {
                errors = this.errors.phone;
            }
            //eslint-disable-next-line no-unused-expressions
            ! this.$v.phone.minLength && errors.push(String(this.translate('validation.min_length', {
                field: String(this.translate('registration.first_step.field_phone')).toLowerCase(),
                //eslint-disable-next-line @typescript-eslint/camelcase
                min_l: this.$v.phone.$params.minLength.min,
                //eslint-disable-next-line @typescript-eslint/camelcase
                cur_l: this.phone.length,
            })));
            //eslint-disable-next-line no-unused-expressions
            ! this.$v.phone.required && errors.push(String(this.translate('validation.required', {
                field: this.translate('registration.first_step.field_phone'),
            })));
            return errors;
        },
        confirmPasswordErrors() {
            let errors: Array<string> = [];
            if (! this.$v.confirmPassword.$dirty) return errors;
            if (this.errors && typeof this.errors.password_confirmation !== 'undefined') {
                errors = this.errors.password_confirmation;
            }
            //eslint-disable-next-line no-unused-expressions
            ! this.$v.confirmPassword.sameAs && errors.push('This field must be same as password');
            //eslint-disable-next-line no-unused-expressions
            ! this.$v.confirmPassword.required && errors.push('Confirm password is required.');
            return errors;
        },
        codeErrors() {
            let errors: Array<string> = [];
            if (! this.$v.code.$dirty) return errors;
            if (this.errors && typeof this.errors.code !== 'undefined') {
                errors = this.errors.code;
            }
            //eslint-disable-next-line no-unused-expressions
            ! this.$v.code.minLength && errors.push(String(this.translate('validation.min_length', {
                field: String(this.translate('registration.second_step.field_code')).toLowerCase(),
                //eslint-disable-next-line @typescript-eslint/camelcase
                min_l: this.$v.code.$params.minLength.min,
                //eslint-disable-next-line @typescript-eslint/camelcase
                cur_l: this.code.length,
            })));
            //eslint-disable-next-line no-unused-expressions
            ! this.$v.code.required && errors.push(String(this.translate('validation.required', {
                field: this.translate('registration.second_step.field_code'),
            })));
            return errors;
        },
        emailErrors() {
            let errors: Array<string> = [];
            if (! this.$v.email.$dirty) return errors;
            if (this.errors && typeof this.errors.email !== 'undefined') {
                errors = this.errors.email;
            }
            //eslint-disable-next-line no-unused-expressions
            ! this.$v.email.email && errors.push(String(this.translate('validation.valid', {
                field: String(this.translate('registration.third_step.field_email')).toLowerCase(),
            })));
            //eslint-disable-next-line no-unused-expressions
            ! this.$v.email.required && errors.push(String(this.translate('validation.required', {
                field: this.translate('registration.third_step.field_email'),
            })));
            return errors;
        },
        passwordErrors() {
            let errors: Array<string> = [];
            if (! this.$v.password.$dirty) return errors;
            if (this.errors && typeof this.errors.password !== 'undefined') {
                errors = this.errors.password;
            }
            //eslint-disable-next-line no-unused-expressions
            ! this.$v.password.minLength && errors.push(`Min length of password is ${
                this.$v.password.$params.minLength.min}. Now it is ${this.password.length}`);
            //eslint-disable-next-line no-unused-expressions
            ! this.$v.password.required && errors.push('Password is required.');
            return errors;
        },
        nameErrors() {
            let errors: Array<string> = [];
            if (! this.$v.name.$dirty) return errors;
            if (this.errors && typeof this.errors.first_name !== 'undefined') {
                errors = this.errors.first_name;
            }
            //eslint-disable-next-line no-unused-expressions
            ! this.$v.name.required && errors.push(String(this.translate('validation.required', {
                field: this.translate('registration.third_step.field_fn'),
            })));
            return errors;
        },
        lastNameErrors() {
            let errors: Array<string> = [];
            if (! this.$v.lastName.$dirty) return errors;
            if (this.errors && typeof this.errors.last_name !== 'undefined') {
                errors = this.errors.last_name;
            }
            //eslint-disable-next-line no-unused-expressions
            ! this.$v.lastName.required && errors.push(String(this.translate('validation.required', {
                field: this.translate('registration.third_step.field_ln'),
            })));
            return errors;
        },
    },
    methods: {
        errorsClear() {
            this.$store.dispatch('setError', null, {root: true});
        },
        translate(key: string, options?: object): TranslateResult {
            return i18n.t(key, options);
        },
    },
    validations: {
        email: {
            required,
            email,
        },
        name: {
            required,
        },
        lastName: {
            required,
        },
        password: {
            minLength: minLength(6),
            required,
        },
        phone: {
            required,
            minLength: minLength(8),
        },
        confirmPassword: {
            required,
            sameAs: sameAs('password'),
        },
        code: {
            required,
            numeric,
            minLength: minLength(5),
        },
    },
});
