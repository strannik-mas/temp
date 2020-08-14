import Vue from 'vue';
import {required, email, minLength, sameAs, numeric} from 'vuelidate/lib/validators';

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
            ! this.$v.phone.minLength && errors.push(`Min length of phone is ${
                this.$v.phone.$params.minLength.min}. Now it is ${this.phone.length}`);
            //eslint-disable-next-line no-unused-expressions
            ! this.$v.phone.required && errors.push('Phone is required.');
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
            ! this.$v.code.minLength && errors.push(`Min length of code is ${
                this.$v.code.$params.minLength.min}. Now it is ${this.code.length}`);
            //eslint-disable-next-line no-unused-expressions
            ! this.$v.code.numeric && errors.push('Accepts only numerics');
            //eslint-disable-next-line no-unused-expressions
            ! this.$v.code.required && errors.push('Code is required.');
            return errors;
        },
        emailErrors() {
            let errors: Array<string> = [];
            if (! this.$v.email.$dirty) return errors;
            if (this.errors && typeof this.errors.email !== 'undefined') {
                errors = this.errors.email;
            }
            //eslint-disable-next-line no-unused-expressions
            ! this.$v.email.email && errors.push('Must be valid e-mail');
            //eslint-disable-next-line no-unused-expressions
            ! this.$v.email.required && errors.push('E-mail is required');
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
            ! this.$v.name.required && errors.push('First Name is required.');
            return errors;
        },
        lastNameErrors() {
            let errors: Array<string> = [];
            if (! this.$v.lastName.$dirty) return errors;
            if (this.errors && typeof this.errors.last_name !== 'undefined') {
                errors = this.errors.last_name;
            }
            //eslint-disable-next-line no-unused-expressions
            ! this.$v.lastName.required && errors.push('Last Name is required.');
            return errors;
        },
    },
    methods: {
        errorsClear() {
            this.$store.dispatch('setError', null, {root: true});
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
