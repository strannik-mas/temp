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
                        :key="sphere.id"
                >
                    <v-card
                            class="mx-auto"
                            max-width="400"
                    >
                        <v-img
                                class="white--text align-end"
                                height="200px"
                                :src="sphere.imageSrc"
                        >
                            <!--<v-card-title>Top 10 Australian beaches</v-card-title>-->
                        </v-img>

                        <v-card-title>{{sphere.name}}</v-card-title>
                        <!--<v-card-subtitle class="pb-0">Number 10</v-card-subtitle>-->

                        <v-card-text class="text--primary">
                            <div>{{sphere.description}}</div>
                        </v-card-text>

                        <v-card-actions>
                            <v-spacer/>
                            <v-btn
                                    text
                                    :to="'/create/lead' + sphere.id"
                            >
                                Open
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
    </div>
</template>

<script>
export default {
    computed: {
        isUserLoggedIn() {
            return this.$store.getters['user/isUserLoggedIn'];
        },
        loading() {
            return this.$store.getters.loading;
        },
        spheres() {
            return this.$store.getters['sphere/getUniversalSpheres'];
        },
    },
    created() {
        console.log(this.isUserLoggedIn);
        /*if (! this.isUserLoggedIn) {
            this.$router.push('/login');
        }*/
    },
};
</script>
