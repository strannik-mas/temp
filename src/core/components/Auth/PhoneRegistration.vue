<template>
    <div class="register__phone">
        <v-row justify="center">
            <v-dialog v-model="dialog" max-width="600px" @click:outside="closeDialog">
                <v-card>
                    <v-card-title class="headline">
                        <span class="headline">{{$t("registration.first_step.title")}}</span>
                        <v-spacer/>
                        <v-btn icon light @click="closeDialog">
                            <v-icon>mdi-close</v-icon>
                        </v-btn>
                    </v-card-title>
                    <v-card-text>
                        <v-form>
                            <v-text-field
                                    :label="$t('registration.first_step.field_phone')"
                                    name="phone"
                                    prepend-icon="mdi-phone"
                                    type="tel"
                                    :error-messages="phoneErrors"
                                    @blur="$v.phone.$touch()"
                                    @focusin="errorsClear"
                                    v-model="phone"
                            />
                        </v-form>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer/>
                        <v-btn
                                :loading="loading2"
                                color="primary"
                                :disabled="$v.phone.$invalid || loading2"
                                @click="registerPhone"
                        >{{$t("registration.first_step.btn_send")}}</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
            <v-dialog v-model="dialog2" max-width="600px" @click:outside="closeDialog, dialog2=false">
                <v-card>
                    <v-card-title class="headline">
                        <span class="headline">{{$t("registration.second_step.title")}}</span>
                        <v-spacer/>
                        <v-btn icon light @click="closeDialog, dialog2=false">
                            <v-icon>mdi-close</v-icon>
                        </v-btn>
                    </v-card-title>
                    <v-card-text>
                        <v-form>
                            <v-text-field
                                    :label="$t('registration.second_step.field_code')"
                                    name="code"
                                    prepend-icon="mdi-phone-check"
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
                                :loading="loading2"
                                :disabled="$v.code.$invalid || loading2"
                        >{{$t("registration.second_step.btn_activate")}}
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
            <v-dialog v-model="dialog3" max-width="600px" @click:outside="closeDialog, dialog3=false">
                <v-card>
                    <v-card-title class="headline">
                        <span class="headline">{{$t("registration.third_step.title")}}</span>
                        <v-spacer/>
                        <v-btn icon light @click="closeDialog, dialog3=false">
                            <v-icon>mdi-close</v-icon>
                        </v-btn>
                    </v-card-title>
                    <v-card-text>
                        <v-form>
                            <v-text-field
                                    :label="$t('registration.third_step.field_email')"
                                    name="email"
                                    prepend-icon="mdi-email"
                                    type="email"
                                    :error-messages="emailErrors"
                                    @blur="$v.email.$touch()"
                                    @focusin="errorsClear"
                                    v-model="email"
                            />
                            <v-text-field
                                    :label="$t('registration.third_step.field_fn')"
                                    name="first_name"
                                    prepend-icon="mdi-account"
                                    type="text"
                                    :error-messages="nameErrors"
                                    @blur="$v.name.$touch()"
                                    @focusin="errorsClear"
                                    v-model="name"
                            />
                            <v-text-field
                                    :label="$t('registration.third_step.field_ln')"
                                    name="last_name"
                                    prepend-icon="mdi-account"
                                    type="text"
                                    :error-messages="lastNameErrors"
                                    @blur="$v.lastName.$touch()"
                                    @focusin="errorsClear"
                                    v-model="lastName"
                            />
                        </v-form>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer/>
                        <v-btn
                                :loading="loading2"
                                color="primary"
                                :disabled="$v.email.$invalid || $v.name.$invalid || $v.lastName.$invalid ||
                                                loading2"
                                @click="registerUserByPhone"
                        >{{$t("registration.first_step.btn_send")}}</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-row>
    </div>
</template>

<script>
import ValidationRules from '@/core/mixins/ValidationRules';

export default {
    mixins: [ValidationRules],
    computed: {
        step() {
            const user = this.$store.getters['user/userObj'];
            if (typeof user !== 'undefined') {
                switch (user.state) {
                    case 0:
                        return 2;
                    case 1:
                        return 3;
                    case 2:
                        return 4;
                    default:
                        return 1;
                }
            }
            return 1;
        },
    },
    data() {
        return {
            dialog: true,
            dialog2: false,
            dialog3: false,
            loading2: false,
        };
    },
    methods: {
        registerPhone() {
            this.loading2 = true;
            const user = {
                phone: this.phone,
            };
            this.$store.dispatch('user/registerPhone', user).then(() => {
                console.log(this.step);
                if (this.step === 2) {
                    this.dialog = false;
                    this.dialog2 = true;
                }
                this.loading2 = false;
            })
                .catch((err) => console.log(err));
        },
        onActivate() {
            if (! this.$v.code.$invalid) {
                this.loading2 = true;
                const payload = {
                    code: this.code,
                    phone: this.phone,
                };

                this.$store.dispatch('user/activateUserPhone', payload)
                    .then((response) => {
                        console.log(response);
                        console.log(this.step);
                        this.loading2 = false;
                        if (this.step !== 2) {
                            this.dialog2 = false;
                        }
                        if (this.step === 3) {
                            this.dialog3 = true;
                        }

                        //если регистрация прошла
                        if (this.step === 4) {
                            this.redirectAfterLogin();
                        }
                    })
                    .catch((err) => console.log(err));
            }
        },
        registerUserByPhone() {
            this.loading2 = true;
            const user = {
                email: this.email,
                phone: this.phone,
                firstName: this.name,
                lastName: this.lastName,
                device: 1,
            };

            this.$store.dispatch('user/registerUserByPhone', user).then(() => {
                console.log(this.step);
                if (this.step === 4) {
                    this.dialog3 = false;
                    this.redirectAfterLogin();
                }
                this.loading2 = false;
            })
                .catch((err) => console.log(err));
        },
        closeDialog() {
            this.$emit('dialogClose', false);
            this.dialog = true;
        },
        redirectAfterLogin() {
            const route = localStorage.getItem('sphereRoute');
            if (route && route.length > 0) {
                this.$router.push(route);
                localStorage.removeItem('sphereRoute');
            } else {
                this.$router.push('requests');
            }
        },
    },
};
</script>

<style lang="scss">
    /* Chrome, Safari, Edge, Opera */
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }

    /* Firefox */
    input[type=number] {
        -moz-appearance: textfield;
    }
</style>
