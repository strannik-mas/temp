<template>
    <v-container
            class="fill-height Login"
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
                <v-card class="elevation-12">
                    <v-toolbar
                            color="primary"
                            dark
                            flat
                    >
                        <v-toolbar-title>Login form</v-toolbar-title>
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
                        </v-form>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer />
                        <v-btn
                                color="primary"
                                @click="onSubmit"
                                :loading="loading"
                                :disabled="!valid || loading"
                        >Login</v-btn>
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
            valid: false, //автоматически преобразуется в true, если форма будет валидна
            emailRules: [
                (v) => !! v || 'E-mail is required',
                (v) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
            ],
            passwordRules: [
                (v) => !! v || 'Password is required',
                (v) => (v && v.length >= 6) || 'Password must be equal or more than 6 characters',
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
    },
    methods: {
        onSubmit() {
            if (this.$refs.form.validate()) {
                const user = {
                    email: this.email,
                    password: this.password,
                    //eslint-disable-next-line @typescript-eslint/camelcase
                    api_key: process.env.VUE_APP_API_KEY,
                };

                console.log(user);

                this.$store.dispatch('user/loginUser', user)
                    .then(() => {
                        this.$router.push('/');
                    })
                    .catch((err) => console.log(err));
            }
        },
    },
};
</script>
