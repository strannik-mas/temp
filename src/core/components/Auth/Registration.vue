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
                                    id="phone"
                                    label="Phone"
                                    name="phone"
                                    prepend-icon="mdi-phone"
                                    type="tel"
                                    :error-messages="phoneErrors"
                                    @blur="$v.phone.$touch()"
                                    @focusin="errorsClear"
                                    v-model="phone"
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

                            <v-text-field
                                    id="confirm-password"
                                    label="Confirm password"
                                    name="password_confirmation"
                                    prepend-icon="mdi-lock"
                                    type="password"
                                    :error-messages="confirmPasswordErrors"
                                    @blur="$v.confirmPassword.$touch()"
                                    @focusin="errorsClear"
                                    v-model="confirmPassword"
                            />
                        </v-form>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer/>
                        <v-btn
                                color="primary"
                                @click="onSubmit"
                                :loading="loading"
                                :disabled="$v.email.$invalid || $v.confirmPassword.$invalid || $v.password.$invalid ||
                                 $v.phone.$invalid || loading"
                        >Create account
                        </v-btn>
                    </v-card-actions>
                </v-card>
                <v-card class="elevation-12 align-center" v-else-if="step === 2">
                    <v-toolbar
                            color="primary"
                            dark
                            flat
                    >
                        <v-toolbar-title>Confirmation email</v-toolbar-title>
                    </v-toolbar>
                    <v-card-text>
                        <v-form>
                            <v-text-field
                                    label="Activation Code"
                                    name="code"
                                    prepend-icon="mdi-email-check"
                                    type="number"
                                    v-model="code"
                                    required
                                    :error-messages="codeErrors"
                                    @blur="$v.code.$touch()"
                                    @focusin="errorsClear"
                            />
                        </v-form>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer/>
                        <v-btn
                                color="success"
                                @click="onActivate"
                                :loading="loading"
                                :disabled="$v.code.$invalid || loading"
                        >Activate
                        </v-btn>
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
            if (! this.$v.email.$invalid && ! this.$v.confirmPassword.$invalid && ! this.$v.password.$invalid
                && ! this.$v.phone.$invalid) {
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
            if (! this.$v.code.$invalid) {
                const payload = {
                    code: this.code,
                    //eslint-disable-next-line @typescript-eslint/camelcase
                    api_key: process.env.VUE_APP_API_KEY,
                };

                this.$store.dispatch('user/activateUserEmail', payload)
                    .then(() => {
                        console.log(this.step);
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
