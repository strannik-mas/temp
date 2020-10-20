<template>
    <v-row justify="center">
        <v-dialog v-model="dialogActivator" max-width="600px">
            <template v-slot:activator="{ on, attrs }">
                <v-btn
                        color="purple darken-3"
                        dark
                        v-bind="attrs"
                        v-on="on"
                        width="230px"
                >
                    <v-icon>mdi-information-outline</v-icon>
                    {{$t('lead_info_modal.btn_show_dialog')}}
                </v-btn>
            </template>
            <v-card style="z-index: 9999;">
                <v-card-title class="headline text-center">
                    <span>{{$t("lead_info_modal.title")}}</span>
                    <v-spacer/>
                    <v-btn icon light @click="dialogActivator = false">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </v-card-title>
                <v-list>
                    <!--<div class="text-h6 text-center font-weight-bold">
                        <span>{{$t("lead_info_modal.title")}}</span>
                    </div>-->
                    <v-divider :inset="true"></v-divider>
                    <template v-for="(item, index) in info">
                        <v-list-item :key="index">
                            <v-list-item-content>
                                <v-list-item-title>{{item.field}}</v-list-item-title>
                                <v-list-item-subtitle>{{item.value}}</v-list-item-subtitle>
                            </v-list-item-content>
                        </v-list-item>
                        <v-divider
                                :key="item.field"
                        ></v-divider>
                    </template>
                </v-list>
            </v-card>
        </v-dialog>
    </v-row>
</template>
<script lang="ts">
export default {
    props: ['info'],
    data() {
        return {
            dialogActivator: false,
        };
    },
};
</script>
