<template>
    <v-container
            class="fill-height"
            fluid
    >
        <v-row
                align="center"
                justify="center"
        >
            <v-col
                    cols="12"
                    sm="8"
                    md="6"
            >
                <v-card class="elevation-12" v-if="step === 1">
                    <v-toolbar
                            color="primary"
                            dark
                            flat
                    >
                        <v-toolbar-title>Registration form</v-toolbar-title>
                    </v-toolbar>
                    <v-card-text>
                        <v-form
                                ref="form"
                                v-model="valid"
                                validation
                        >
                            <v-text-field
                                    label="Email"
                                    name="email"
                                    prepend-icon="email"
                                    type="email"
                                    v-model="email"
                                    :rules="emailRules"
                            />
                            <div
                                    class="error--text"
                                    v-if="errors && typeof errors.email != 'undefined'"
                            >
                                <p v-for="(error, index) of errors.email" :key="index">{{error}}</p>
                            </div>

                            <v-text-field
                                    id="phone"
                                    label="Phone"
                                    name="phone"
                                    prepend-icon="phone"
                                    type="tel"
                                    v-model="phone"
                                    :counter="8"
                                    :rules="phoneRules"
                            />
                            <div
                                    class="error--text"
                                    v-if="errors && typeof errors.phone != 'undefined'"
                            >
                                <p v-for="(error, index) of errors.phone" :key="index">{{error}}</p>
                            </div>

                            <v-text-field
                                    id="password"
                                    label="Password"
                                    name="password"
                                    prepend-icon="lock"
                                    type="password"
                                    v-model="password"
                                    :counter="6"
                                    :rules="passwordRules"
                            />
                            <div
                                    class="error--text"
                                    v-if="errors && typeof errors.password != 'undefined'"
                            >
                                <p v-for="(error, index) of errors.password" :key="index">{{error}}</p>
                            </div>

                            <v-text-field
                                    id="confirm-password"
                                    label="Confirm password"
                                    name="password_confirmation"
                                    prepend-icon="lock"
                                    type="password"
                                    v-model="confirmPassword"
                                    :counter="6"
                                    :rules="confirmPasswordRules"
                            />
                            <div
                                    class="error--text"
                                    v-if="errors && typeof errors.password_confirmation != 'undefined'"
                            >
                                <p v-for="(error, index) of errors.password_confirmation" :key="index">{{error}}</p>
                            </div>
                        </v-form>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer/>
                        <v-btn
                                color="primary"
                                @click="onSubmit"
                                :loading="loading"
                                :disabled="!valid || loading"
                        >Create account
                        </v-btn>
                    </v-card-actions>
                </v-card>
                <v-card class="elevation-12" v-else-if="step === 2">
                    <v-toolbar
                            color="primary"
                            dark
                            flat
                    >
                        <v-toolbar-title>Confirmation email</v-toolbar-title>
                    </v-toolbar>
                    <v-card-text>
                        <v-form
                                ref="form"
                                v-model="valid"
                                validation
                        >
                            <v-text-field
                                    label="Activation Code"
                                    name="code"
                                    prepend-icon="email-check"
                                    type="number"
                                    v-model="code"
                                    :rules="codeRules"
                            />
                            <div
                                    class="error--text"
                                    v-if="errors && typeof errors.code != 'undefined'"
                            >
                                <p v-for="(error, index) of errors.code" :key="index">{{error}}</p>
                            </div>
                        </v-form>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer/>
                        <v-btn
                                color="success"
                                @click="onActivate"
                                :loading="loading"
                                :disabled="!valid || loading"
                        >Activate
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
    data() {
        return {
            email: '',
            password: '',
            confirmPassword: '',
            phone: '',
            code: null,
            valid: false, //автоматически преобразуется в true, если форма будет валидна
            emailRules: [
                (v) => !! v || 'E-mail is required',
                (v) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
            ],
            passwordRules: [
                (v) => !! v || 'Password is required',
                (v) => (v && v.length >= 6) || 'Password must be equal or more than 6 characters',
            ],
            confirmPasswordRules: [
                (v) => !! v || 'Password is required',
                (v) => v === this.password || 'Password should match',
            ],
            phoneRules: [
                (v) => !! v || 'Phone is required',
                (v) => (v && v.length >= 8) || 'Phone must be equal or more than 8 characters',
            ],
            codeRules: [
                (v) => !! v || 'Activation code is required',
                (v) => (v && v.length === 5) || 'Activation code must be equal of 5 characters',
            ],
        };
    },
    computed: {
        errors() {
            return this.$store.getters.errors;
        },
        loading() {
            return this.$store.getters.loading;
        },
        step() {
            const user = this.$store.getters['user/userObj'];
            if (typeof user !== 'undefined') {
                switch (user.state) {
                    case 0:
                        return 2;
                    case 1:
                        return 3;
                    default:
                        return 1;
                }
            }
            return 1;
        },
    },
    methods: {
        onSubmit() {
            if (this.$refs.form.validate()) {
                const user = {
                    email: this.email,
                    phone: this.phone,
                    password: this.password,
                    //eslint-disable-next-line @typescript-eslint/camelcase
                    password_confirmation: this.confirmPassword,
                    //eslint-disable-next-line @typescript-eslint/camelcase
                    api_key: process.env.VUE_APP_API_KEY,
                };

                this.$store.dispatch('user/registerUser', user);
            }
        },
        onActivate() {
            if (this.$refs.form.validate()) {
                const payload = {
                    code: this.code,
                    //eslint-disable-next-line @typescript-eslint/camelcase
                    api_key: process.env.VUE_APP_API_KEY,
                };

                this.$store.dispatch('user/activateUserEmail', payload)
                    .then(() => {
                        if (this.step === 3) {
                            this.$router.push('/');
                        }
                    })
                    .catch((err) => console.log(err));
            }
        },
    },
};
</script>
