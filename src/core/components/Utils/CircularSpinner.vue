<template>
    <v-flex class="text-center">
        <v-progress-circular
                :size="sizeSpinner"
                :width="widthSpinner"
                indeterminate
                :color="colorSpinner"
        />
    </v-flex>
</template>
<script>
export default {
    props: {
        sizeSpinner: {
            type: Number,
            default: 100,
        },
        widthSpinner: {
            type: Number,
            default: 10,
        },
        colorSpinner: {
            type: String,
            default: 'purple',
        },
    },
};
</script>
<style lang="scss">
</style>
