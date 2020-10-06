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
            return this.$store.getters['lead/activeLeads'];
        },
    },
});
</script>

<style scoped lang="scss">
    /*.request__card {
        margin: 0 8px 12px;
        max-width: 600px;
        display: flex;
        justify-content: space-around;
    }*/

    .v-chip.lead__chip {
        border-width: 2px;
    }
</style>
