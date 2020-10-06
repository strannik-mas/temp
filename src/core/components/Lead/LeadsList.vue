<template>
    <v-layout row wrap>
        <v-flex
                xs12
                sm6
                md4
                class="pa-2"
                v-for="lead in leads"
                :key="lead.id"
        >
            <v-card
                    class="mx-auto"
                    color="#fff"
                    @click="$router.push('/show/lead/' + lead.id + '/' + lead.sphere_id)"
            >
                <v-card-title class="headline">
                    <span class="headline text-h5">{{getSphereName(lead.sphere_id)}}</span>
                </v-card-title>

                <v-card-text class="d-inline-flex">
                    <v-card-title class="headline text-h6 pa-0">{{lead.created_at}}</v-card-title>

                    <v-spacer/>
                    <v-tooltip bottom>
                        <template #activator="{ on }">
                            <v-chip
                                    class="ml-1 mr-1 lead__chip"
                                    color="green"
                                    outlined
                                    large
                                    pill
                                    v-on="on"
                                    :style="{width: '80px', height: '40px'}"
                            >
                                <v-icon left>mdi-eye</v-icon>
                                {{lead.count_review}}
                            </v-chip>
                        </template>
                        <span>{{$t('lead_list.viewed_tooltip')}}</span>
                    </v-tooltip>
                    <v-tooltip bottom>
                        <template #activator="{ on }">
                            <v-chip
                                    class="ml-1 mr-1 lead__chip"
                                    color="blue"
                                    outlined
                                    large
                                    pill
                                    v-on="on"
                                    :style="{width: '80px', height: '40px'}"
                            >
                                <v-icon left>mdi-account-star</v-icon>
                                {{lead.count_interest}}
                            </v-chip>
                        </template>
                        <span>{{$t('lead_list.purchased_tooltip')}}</span>
                    </v-tooltip>
                </v-card-text>

                <!--<v-card-actions>
                    <v-spacer/>
                    <v-list>
                        <v-list-item>
                            <v-chip
                                    class="ml-3 mb-3 lead__chip"
                                    color="green"
                                    outlined
                                    large
                                    pill
                                    :style="{width: '80px', height: '40px'}"
                            >
                                <v-icon left>mdi-eye</v-icon>
                                {{lead.count_review}}
                            </v-chip>
                            <v-chip
                                    class="ml-3 mb-3 lead__chip"
                                    color="blue"
                                    outlined
                                    large
                                    pill
                                    :style="{width: '80px', height: '40px'}"
                            >
                                <v-icon left>mdi-account-star</v-icon>
                                {{lead.count_interest}}
                            </v-chip>
                            <v-chip
                                    class="ml-1 mb-1"
                                    color="red"
                                    text-color="white"
                            >
                                <v-icon left>mdi-gavel</v-icon>
                                {{lead.count_bids}}
                            </v-chip>
                            <v-btn
                                    text
                                    :to="'/show/lead/' + lead.id + '/' + lead.sphere_id"
                            >{{$t('requests_page.details_btn')}}</v-btn>
                        </v-list-item>
                        <v-list-item>
                            <v-spacer/>
                            <v-btn
                                    text
                                    :to="'/show/lead/' + lead.id + '/' + lead.sphere_id"
                            >{{$t('requests_page.details_btn')}}</v-btn>
                        </v-list-item>
                    </v-list>
                </v-card-actions>-->
            </v-card>
        </v-flex>
    </v-layout>
</template>
<script lang="ts">
import Vue from 'vue';
import {SphereArr} from '@/core/store/sphere/types';

export default Vue.extend({
    props: ['leads'],
    methods: {
        getSphereName(id: number): string {
            let sphereName = '';
            const sphereRes: SphereArr|undefined = this.$store.getters['sphere/sphereById'](+id);
            if (sphereRes !== undefined) {
                sphereName = sphereRes.sphere.name;
            }
            return sphereName;
        },
    },
});
</script>

<style scoped lang="scss">
    .request__card {
        margin: 0 8px 12px;
        max-width: 600px;
        display: flex;
        justify-content: space-around;
    }

    .v-chip.lead__chip {
        border-width: 2px;
    }
</style>
