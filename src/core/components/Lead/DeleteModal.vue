<template>
    <v-dialog v-model="dialogDelete" persistent max-width="290">
        <template v-slot:activator="{ on, attrs }">
            <v-btn
                    icon
                    color="red"
                    v-bind="attrs"
                    v-on="on"
            >
                <v-icon light>mdi-delete</v-icon>
            </v-btn>
        </template>
        <v-card>
            <v-card-title class="headline">{{$t("file_delete_modal.title")}}</v-card-title>
            <v-card-text v-html="deleteModalText"/>
            <v-card-actions>
                <v-spacer/>
                <v-btn color="red darken-1" text @click="dialogDelete = false">
                    {{$t("file_delete_modal.btn_cancel")}}
                </v-btn>
                <v-btn
                        color="green darken-1"
                        text
                        :loading="loading2"
                        :disabled="loading2"
                        @click="deleteDocument(documentId)"
                >
                    {{$t("file_delete_modal.btn_yes")}}
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>
<script lang="ts">
import Vue from 'vue';
import i18n from '@/core/plugins/i18n';
import {eventEmitter} from '@/main';

export default Vue.extend({
    props: ['documentId', 'leadId'],
    methods: {
        deleteDocument(docId: number): void {
            this.$data.loading2 = true;
            //console.log(this.leadId);
            this.$store.dispatch('lead/deleteFile', {id: docId, leadId: +this.leadId})
                .then((response) => {
                    console.log(response);
                    this.$data.loading2 = false;
                    if (response.status === 'success') {
                        this.$data.dialogDelete = false;
                        eventEmitter.$emit('documentsChanged', {
                            alert: true,
                            alertType: 'success',
                            alertText: i18n.t('lead_details_page.alert_delete_success'),
                        });
                    }
                })
                .catch((err) => console.log(err));
        },
    },
    data() {
        return {
            loading2: false,
            dialogDelete: false,
            deleteModalText: i18n.t('file_delete_modal.msg'),
        };
    },
});
</script>
