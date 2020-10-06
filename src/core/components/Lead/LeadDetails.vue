<template>
    <v-container>
        <v-alert
                v-model="alert"
                :type="alertType"
                @close="alert = ! alert"
                dismissible
                light
                class="ma-3"
                id="alertMessage"
        >
            {{alertText}}
        </v-alert>

        <div v-if="! loading && info !== undefined && info.length > 0">
            <v-card
                    v-if="agents && agents.length > 0"
                    max-width="600"
                    class="mx-auto ma-5"
            >
                <v-list>
                    <div class="text-h6 text-center font-weight-bold">
                        <span>{{$t("lead_details_page.agents_header")}}</span>
                    </div>
                    <v-divider :inset="true"></v-divider>
                    <template v-for="(agent, index) in agents">
                        <v-list-item :key="index">
                            <v-list-item-avatar>
                                <v-img v-if="agent.avatar" :src="agent.avatar"></v-img>
                                <v-icon light large v-else :style="{fontSize: '48px'}">mdi-account-circle</v-icon>
                            </v-list-item-avatar>

                            <v-list-item-content>
                                <v-list-item-title class="col-10 text-truncate" v-text="agent.name"></v-list-item-title>
                            </v-list-item-content>

                            <v-list-item-content>
                                <v-list-item-title v-text="agent.company"></v-list-item-title>
                            </v-list-item-content>

                            <v-list-item-content>
                                <v-btn
                                        text
                                        :href="'tel:' + agent.phone"
                                        color="blue"
                                        icon
                                >
                                    <v-icon dark>mdi-cellphone</v-icon>
                                    {{agent.phone}}
                                </v-btn>
                            </v-list-item-content>
                        </v-list-item>
                        <v-divider
                                :key="agent.id"
                                :inset="true"
                        ></v-divider>
                    </template>
                </v-list>
            </v-card>

            <v-card
                    v-if="bids && bids.length > 0"
                    max-width="600"
                    class="mx-auto ma-5"
            >
                <v-list>
                    <div class="text-h6 text-center font-weight-bold">
                        <span>{{$t("lead_details_page.bids_header")}}</span>
                    </div>
                    <v-divider :inset="true"></v-divider>
                    <template v-for="(bid, index) in bids">
                        <v-list-item :key="index">
                            <v-list-item-avatar>
                                <v-img v-if="bid.avatar" :src="bid.avatar"></v-img>
                                <v-icon light large v-else>mdi-account-circle</v-icon>
                            </v-list-item-avatar>

                            <v-list-item-content>
                                <v-list-item-title v-text="bid.name"></v-list-item-title>
                                <!--<v-list-item-subtitle v-text="agent.phone"></v-list-item-subtitle>-->
                            </v-list-item-content>

                            <v-list-item-content>
                                <v-list-item-title v-text="bid.time"></v-list-item-title>
                            </v-list-item-content>

                            <div class="d-inline-block">
                                <v-spacer/>
                                <v-list-item-content>
                                    <v-list-item-title v-text="bid.price" class="font-weight-bold"/>
                                </v-list-item-content>
                            </div>
                        </v-list-item>
                    </template>
                </v-list>
            </v-card>

            <v-layout row wrap class="lead__actions">
                <LeadInfo :info="info" class="mb-2"/>
                <UploadModal
                        :leadId="id"
                        :openedAgents="agents"
                />
            </v-layout>

            <DocumentsList
                    :leadId="+this.id"
                    :agents="agents"
                    :key="componentKey"
            />
        </div>
        <CircularSpinner v-else-if="loading"/>
    </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import Common from '@/core/mixins/Common';
import CircularSpinner from '@/core/components/Utils/CircularSpinner.vue';
import {LeadDetails} from '@/core/store/lead/types';
import UploadModal from '@/components/Utils/UploadModal.vue';
import LeadInfo from '@/core/components/Lead/LeadInfo.vue';
import {TranslateResult} from 'vue-i18n';
import DocumentsList from '@/core/components/Lead/DocumentsList.vue';
// eslint-disable-next-line import/no-cycle
import {eventEmitter} from '@/main';

// eslint-disable-next-line @typescript-eslint/class-name-casing
interface dataObj {
    alert: boolean;
    alertType: string|null;
    alertText: TranslateResult;
    componentKey: number;
}

export default Vue.extend({
    mixins: [Common],
    props: ['id', 'sphereId'],
    components: {DocumentsList, LeadInfo, UploadModal, CircularSpinner},
    computed: {
        agents(): Array<any> {
            const details: LeadDetails|undefined = this.$store.getters['lead/getLeadDetails'](+this.id);
            if (details !== undefined && details.agents !== undefined) {
                return details.agents;
            }
            return [];
        },
        bids() {
            const details: LeadDetails|undefined = this.$store.getters['lead/getLeadDetails'](+this.id);
            if (details !== undefined && details.bids !== undefined) {
                return details.bids;
            }
            return [];
        },
        info() {
            const details: LeadDetails|undefined = this.$store.getters['lead/getLeadDetails'](+this.id);
            if (details !== undefined) {
                return details.info;
            }
            return [];
        },
    },
    data() {
        const data: dataObj = {
            alert: false,
            alertType: null,
            alertText: '',
            componentKey: 0,
        };
        return data;
    },
    created(): void {
        eventEmitter.$on(
            'documentsChanged',
            ($event: {alert: boolean; alertType: string; alertText: TranslateResult}) => {
                this.$data.alert = $event.alert;
                this.$data.alertType = $event.alertType;
                this.$data.alertText = $event.alertText;
                this.$data.componentKey = Math.floor(Math.random() * (100));
            },
        );
    },
});
</script>

<style scoped lang="scss">
    .lead__actions {
        max-width: 600px;
        margin: auto;
        display: flex;
        justify-content: flex-start;
    }

    .v-chip.attach__agent__chip {
        border-width: 2px;
        margin: 0 2px;
    }
</style>
