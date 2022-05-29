<template>
    <v-container>
        <ExamDataHeader />
        <v-divider />
        <v-row class="mt-3">
            <v-col md="3" class="">
                <ExamDataSideBar />
            </v-col>
            <v-divider
                vertical
            ></v-divider>
            <v-col md="9">
                Result Details
                <v-row class="py-2">
                    <v-col md="2">
                        <ResultDetailsCard 
                            title="Total Questions"
                            count="50"
                            type="neutral"
                        />
                    </v-col>

                    <v-col md="2">
                        <ResultDetailsCard 
                            title="Correct"
                            count="30"
                            type="pass"
                        />
                    </v-col>

                    <v-col md="2">
                        <ResultDetailsCard 
                            title="Incorrect"
                            count="20"
                            type="fail"
                        />
                    </v-col>

                    <v-col md="2">
                        <ResultDetailsCard 
                            title="Score"
                            count="60/100"
                            type="neutral"
                        />
                    </v-col>

                    <v-col md="2">
                        <ResultDetailsCard 
                            title="Pointer"
                            count="3.7"
                            type="pass"
                        />
                    </v-col>

                    <v-col md="2">
                        <ResultDetailsCard 
                            title="Result"
                            count="Pass"
                            type="pass"
                        />
                    </v-col>
                </v-row>

            <v-divider></v-divider>

            <v-row>
                <v-col md="12">
                    <p class="mt-2 mb-0">Questions</p>
                </v-col>
            </v-row>

            <v-row>
                <v-col md="12">
                    <v-card 
                        outlined
                        class="pa-2">
                        <v-card-text>
                            <v-row>
                                <v-col md="2" class="">
                                    <h3>Q. 1</h3>
                                    <h5>Type - Short Answer</h5>
                                    <h3>Points - 2/2</h3>
                                </v-col>
                                <v-divider
                                    vertical></v-divider>
                                <v-col md="10"></v-col>
                            </v-row>
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>

            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import ExamDataHeader from './ExamDataHeader.vue';
import ExamDataSideBar from './ExamDataSideBar.vue';
import ResultDetailsCard from './components/ResultDetailsCard.vue';
export default {
    data: () => ({
    }), 
    components: { ExamDataHeader, ExamDataSideBar, ResultDetailsCard }
}
</script>

<style scoped>

.red-background {
    background-color: #ff7a7a;
}

.green-background {
    background-color: #b7ffa9;
}

</style>