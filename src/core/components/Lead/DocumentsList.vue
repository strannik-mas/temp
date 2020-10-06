<template>
    <v-card
            v-if="documents && documents !== undefined && documents.length > 0"
            max-width="600"
            class="mx-auto ma-5"
    >
        <v-list>
            <div class="text-h6 text-center font-weight-bold">
                <span>{{$t("lead_details_page.documents_header")}}</span>
            </div>
            <v-divider :inset="true"></v-divider>
            <template v-for="document in documents">
                <v-list-item :key="document.id">
                        <v-list-item-content>
                            <v-btn
                                    text
                                    color="indigo"
                                    class="ma-0 pa-0"
                                    target="_blank"
                                    :href="document.url"
                                    :block="true"
                            >
                                <v-icon light large>mdi-file-document-outline</v-icon>
                                <v-list-item-title v-text="sliceString(document.name, 12)"/>
                            </v-btn>
                        </v-list-item-content>

                        <v-list-item-content v-if="document.agents !== undefined" class="d-block">
                            <!--<v-chip
                                    v-for="(agentId, index) in document.agents"
                                    :key="index"
                                    class="attach__agent__chip"
                                    outlined
                                    close
                                    close-icon="mdi-delete"
                            >-->
                            <v-chip
                                    v-for="(agentId, index) in document.agents"
                                    :key="index"
                                    class="attach__agent__chip"
                                    outlined
                            >
                                <v-avatar left>
                                    <v-img
                                            v-if="getAgentAvatar(agentId, agents)"
                                            :src="getAgentAvatar(agentId, agents)"
                                    />
                                    <v-icon light v-else>mdi-account-circle</v-icon>
                                </v-avatar>
                                {{getAgentName(agentId, agents, 7)}}
                            </v-chip>
                        </v-list-item-content>

                        <v-list-item-action>
                            <DeleteModal :documentId="document.id" :leadId="leadId"/>
                        </v-list-item-action>
                </v-list-item>
                <v-divider :key="document.url"/>
            </template>
        </v-list>
    </v-card>
</template>
<script lang="ts">
import Vue from 'vue';
import DeleteModal from '@/core/components/Lead/DeleteModal.vue';

export default Vue.extend({
    components: {DeleteModal},
    props: {
        leadId: {
            type: Number,
            required: true,
        },
        agents: {
            type: Array,
            required: true,
        },
    },
    computed: {
        documents() {
            //console.log(this.$store.getters['lead/getFilesForLead'](+this.leadId));
            return this.$store.getters['lead/getFilesForLead'](+this.leadId);
        },
    },
    methods: {
        sliceString(name: string, slice: number) {
            if (name.length > slice) {
                // eslint-disable-next-line no-param-reassign
                name = name.slice(0, slice) + '...';
            }
            return name;
        },
        getAgentName(agentId: number, agents: Array<any>, slice: number): string {
            let name = '';
            if (agents.length > 0) {
                const curAgent = agents.find((agent) => agent.id === agentId);
                name = curAgent.name;
                name = this.sliceString(name, slice);
            }
            return name;
        },
        getAgentAvatar(agentId: number, agents: Array<any>): string {
            if (agents.length > 0) {
                const curAgent = agents.find((agent) => agent.id === agentId);
                return curAgent.avatar;
            }
            return '';
        },
    },
});
</script>
