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
                        <a :href="'#/create/lead/' + sphere.sphere.id">
                            <v-img
                                    class="white--text align-end"
                                    height="200px"
                                    :src="sphere.sphere.imageSrc"
                            >
                            </v-img>
                        </a>

                        <v-card-title>{{sphere.sphere.name}}</v-card-title>
                        <!--<v-card-subtitle class="pb-0">Number 10</v-card-subtitle>-->

                        <v-card-text class="text--primary">
                            <div>{{sphere.sphere.description}}</div>
                        </v-card-text>

                        <v-card-actions>
                            <v-spacer/>
                            <v-btn
                                    text
                                    :to="'/create/lead/' + sphere.sphere.id"
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
