<template>
    <div v-if="!loading">
        <v-container
                grid-list-lg
        >
            <v-layout row wrap>
                <v-flex
                        xs12
                        sm6
                        md4
                        v-for="sphere of spheres"
                        :key="sphere.sphere.id"
                >
                    <v-card
                            class="mx-auto"
                            max-width="400"
                    >
                        <a
                                @click="needRegister = true, redirectToRoute('/create/lead/' + sphere.sphere.id)"
                        >
                            <v-img
                                    class="white--text align-end"
                                    height="200px"
                                    :src="sphere.sphere.imageSrc"
                            >
                            </v-img>
                        </a>

                        <v-card-title class="text-h6">{{sphere.sphere.name}}</v-card-title>
                        <!--<v-card-subtitle class="pb-0">Number 10</v-card-subtitle>-->

                        <v-card-text class="text--primary">
                            <div>{{sphere.sphere.description}}</div>
                        </v-card-text>

                        <v-card-actions>
                            <v-spacer/>
                            <v-btn
                                    text
                                    :to="'/create/lead/' + sphere.sphere.id"
                                    @click="needRegister = true"
                            >
                                {{$t('main_page.open_btn')}}
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
        <PhoneRegistration
                v-if="! this.isUserLoggedIn() && needRegister"
                @dialogClose="needRegister = $event"
        />
    </div>
    <CircularSpinner v-else/>
</template>

<script>
import Common from '@/core/mixins/Common';
import PhoneRegistration from '@/core/components/Auth/PhoneRegistration.vue';
import CircularSpinner from '@/core/components/Utils/CircularSpinner.vue';

export default {
    components: {PhoneRegistration, CircularSpinner},
    mixins: [Common],
    computed: {
        spheres() {
            return this.$store.getters['sphere/getUniversalSpheres'];
        },
    },
    data() {
        return {needRegister: false};
    },
};
</script>
