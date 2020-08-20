<template>
    <div class="register__phone">
        <v-row justify="center">
            <v-dialog v-model="dialog" persistent max-width="600px">
                <v-card>
                    <v-card-title class="headline">
                        <span class="headline">Enter your phone</span>
                    </v-card-title>
                    <v-card-text>
                        <v-form>
                            <v-text-field
                                    label="Phone"
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
                        >Send</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
            <v-dialog v-model="dialog2" persistent max-width="600px">
                <v-card>
                    <v-card-title class="headline">
                        <span class="headline">Confirmation phone</span>
                    </v-card-title>
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
                                :loading="loading2"
                                :disabled="$v.code.$invalid || loading2"
                        >Activate
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
            <v-dialog v-model="dialog3" persistent max-width="600px">
                <v-card>
                    <v-card-title class="headline">
                        <span class="headline">Enter your email, first name and last name</span>
                    </v-card-title>
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
                                    label="First name"
                                    name="first_name"
                                    prepend-icon="mdi-account"
                                    type="text"
                                    :error-messages="nameErrors"
                                    @blur="$v.name.$touch()"
                                    @focusin="errorsClear"
                                    v-model="name"
                            />
                            <v-text-field
                                    label="Last name"
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
                        >Send</v-btn>
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
                //eslint-disable-next-line @typescript-eslint/camelcase
                api_key: process.env.VUE_APP_API_KEY,
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
                    //eslint-disable-next-line @typescript-eslint/camelcase
                    api_key: process.env.VUE_APP_API_KEY,
                };

                this.$store.dispatch('user/activateUserPhone', payload)
                    .then(() => {
                        console.log(this.step);
                        this.loading2 = false;
                        if (this.step !== 2) {
                            this.dialog2 = false;
                        }
                        if (this.step === 3) {
                            this.dialog3 = true;
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
                //eslint-disable-next-line @typescript-eslint/camelcase
                api_key: process.env.VUE_APP_API_KEY,
            };

            this.$store.dispatch('user/registerUserByPhone', user).then(() => {
                console.log(this.step);
                if (this.step === 4) {
                    this.dialog3 = false;
                }
                this.loading2 = false;
            })
                .catch((err) => console.log(err));
        },
    },
};
</script>

<style scoped>

</style>
