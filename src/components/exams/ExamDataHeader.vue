<template>
    <v-sheet>
        <v-row class="">
            <v-col class="d-flex pl-5 pb-0">
                <h1>Exam Data</h1>
            </v-col>
        </v-row>
        <v-row>
            <v-col class="pt-0">
                <v-tabs v-model="activeTab">
                    <v-tab v-for="tab in tabList" :key="tab.id" class="tab-text" @click="onTabClick(tab.id)">
                        {{tab.value}}
                    </v-tab>
                </v-tabs>
            </v-col>
        </v-row>
    </v-sheet>
</template>

<script>
export default {
    name : "ExamDataHeader",
    data: () => ({
        activeTab: 0,
        tabList : [
            {id : 0, value : "View Exams"},
            {id : 1, value : "Upload Exams"},
        ],
    }),
    methods: {
        onTabClick(tabValue) {
            this.activeTab = tabValue;
            this.$emit('onTabClick', tabValue);
        },
    }
}
</script>

<style scoped>
.tab-text {
    text-transform: none !important;
}
</style>