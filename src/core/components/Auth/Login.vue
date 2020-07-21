<template>
    <v-container
            class="fill-height Login d-flex justify-center"
            fluid
    >
        <div class="alert__msg">
            <v-alert type="error" v-if="errors">
                Invalid login or password
            </v-alert>
        </div>
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
                        <v-form>
                            <v-text-field
                                    label="Email"
                                    name="email"
                                    prepend-icon="mdi-email"
                                    type="email"
                                    :error-messages="emailErrors"
                                    @blur="$v.email.$touch()"
                                    @focusin="errorsClear"
                                    v-model="email"
                            />

                            <v-text-field
                                    id="password"
                                    label="Password"
                                    name="password"
                                    prepend-icon="mdi-lock"
                                    type="password"
                                    :error-messages="passwordErrors"
                                    @blur="$v.password.$touch()"
                                    @focusin="errorsClear"
                                    v-model="password"
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
                                :disabled="$v.email.$invalid || $v.password.$invalid || loading"
                        >Login</v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import ValidationRules from '@/core/mixins/ValidationRules';

export default {
    mixins: [ValidationRules],
    methods: {
        onSubmit() {
            if (! this.$v.email.$invalid && ! this.$v.password.$invalid) {
                const user = {
                    email: this.email,
                    password: this.password,
                    //eslint-disable-next-line @typescript-eslint/camelcase
                    api_key: process.env.VUE_APP_API_KEY,
                };

                console.log(user);

                this.$store.dispatch('user/loginUser', user)
                    .then(() => {
                        if (this.errors === null) {
                            if (this.step < 3) {
                                this.$router.push('/registration');
                            } else {
                                this.$router.push('/');
                            }
                        }
                    })
                    .catch((err) => console.log(err));
            }
        },
    },
};
</script>

<style lang="scss">
    .alert__msg {
        position: absolute;
        top: 75px;
    }
</style>
