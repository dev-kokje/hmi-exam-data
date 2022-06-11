<template>
    <v-container fluid class="background-gray pa-0 pb-10">
        <ExamDataHeader />
        <v-divider />

        <v-sheet 
            elevation="2"
            class="my-10 mx-5 pa-5">
            
            <v-row class="mt-3">
                <v-col md="2" class="">
                    <ExamDataSideBar />
                </v-col>

            <v-divider
                vertical
            ></v-divider>

            <v-col md="10">
                <ExamQuestionsData />
            </v-col>
        </v-row>

        </v-sheet>

        
    </v-container>
</template>

<script>
import ExamDataHeader from './ExamDataHeader.vue';
import ExamDataSideBar from './ExamDataSideBar.vue';
import ExamQuestionsData from './ExamQuestionsData.vue';
export default { 
    components: { ExamDataHeader, ExamDataSideBar, ExamQuestionsData }
}
</script>

<style scoped>

.background-gray {
    background-color: #efefef;
}

</style>