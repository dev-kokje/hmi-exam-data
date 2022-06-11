<template>
    <v-sheet>
        <v-row class="">
            <v-col class="d-flex pl-5 pb-0">
                <h1>Exam Data</h1>
            </v-col>
        </v-row>
        <v-row>
            <v-col class="pt-0">
                <v-tabs>
                    <v-tab class="tab-text">01 View Exams</v-tab>
                    <v-tab class="tab-text">02 Upload Exams</v-tab>
                </v-tabs>
            </v-col>
        </v-row>
    </v-sheet>
</template>

<script>
export default {
    data: () => ({
        tab: null,
        items: [
          'web', 'shopping', 'videos', 'images', 'news',
        ],
    }),
}
</script>

<style scoped>
.tab-text {
    text-transform: none !important;
}
</style>