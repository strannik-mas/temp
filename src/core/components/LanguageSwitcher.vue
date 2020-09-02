<template>
    <v-container
            :class="needPadding ? 'pa-4' : 'pa-0 ma-0'"
    >
        <v-item-group
                v-model="selectedLanguage"
        >
            <v-item v-slot:default="{ active, toggle }">
                <v-img
                        :src="active ? flag1 : flag2"
                        :height="heightIcon"
                        :width="widthIcon"
                        class="rounded-circle"
                        :style="{
                            //eslint-disable-next-line max-len
                            boxShadow: '2px 2px 2px #000000 inset, -2px -2px 2px #000000 inset, 0px 0px 8px 1px #000000, 0px 0px 8px 1px #ffffff',
                        }"
                        @click="toggle"
                >
                </v-img>
            </v-item>
        </v-item-group>
    </v-container>
</template>
<script type="ts">
import Vue from 'vue';
import i18n from '@/core/plugins/i18n';

export default Vue.extend({
    props: ['heightIcon', 'widthIcon', 'needPadding'],
    data() {
        return {
            selectedLanguage: null,
        };
    },
    watch: {
        selectedLanguage(val) {
            console.log(val);
            switch (i18n.locale) {
                case 'en':
                    this.$vuetify.rtl = true;
                    i18n.locale = 'he';
                    localStorage.setItem('lng', 'he');
                    break;
                case 'he':
                    this.$vuetify.rtl = false;
                    i18n.locale = 'en';
                    localStorage.setItem('lng', 'en');
                    break;
            }
            this.$emit('componentUpdate', true);
            this.$store.dispatch('sphere/fetchUniversalSpheres');
        },
    },
    computed: {
        flag1() {
            if (i18n.locale === 'en') {
                return '/img/isr.svg';
            }
            return '/img/en.svg';
        },
        flag2() {
            if (i18n.locale === 'en') {
                return '/img/en.svg';
            }
            return '/img/isr.svg';
        },
    },
});
</script>
