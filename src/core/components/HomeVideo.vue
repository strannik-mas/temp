import PhoneRegistration from "*.vue";
<template>
    <v-container>
        <v-overlay
            absolute
            :opacity="0.45"
            color="white"
            class="video__overlay"
        />
        <video class="bgvid" playsinline autoplay muted loop preload="auto">
            <source :src="'/video/contact.mp4'" type="video/mp4">
        </video>
        <CircularSpinner v-if="loading"/>
    </v-container>
</template>

<script>
import Common from '@/core/mixins/Common';
import CircularSpinner from '@/core/components/Utils/CircularSpinner.vue';

export default {
    components: {CircularSpinner},
    mixins: [Common],
};
</script>

<style scoped>
    .bgvid {
        margin-top: 56px;
        position: fixed;
        left: 50%;
        top: 50%;
        min-width: 100%;
        min-height: 100%;
        width: auto;
        height: auto;
        /*width: 100%;
        height: auto;
        max-height: 100%;*/
        transform: translateX(-50%) translateY(-50%);
        transition: 1s opacity;
        /*filter: grayscale(10%) blur(2px);*/
    }

    .video__overlay {
        height: calc(100vh - 104px);
        /*filter: blur(2px);*/
    }
</style>
