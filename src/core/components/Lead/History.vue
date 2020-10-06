<template>
    <v-container>
        <LeadsList
                v-if="! loading"
                :leads="leads"
        />
        <CircularSpinner v-else/>
    </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import Common from '@/core/mixins/Common';
import CircularSpinner from '@/core/components/Utils/CircularSpinner.vue';
import {Lead} from '@/core/store/lead/types';
import LeadsList from '@/core/components/Lead/LeadsList.vue';

export default Vue.extend({
    mixins: [Common],
    components: {LeadsList, CircularSpinner},
    computed: {
        leads(): Array<Lead>|undefined {
            return this.$store.getters['lead/historyLeads'];
        },
    },
});
</script>
