<template>
    <div>

        <v-tabs 
            background-color="#fafafa"
            light>
            <v-tab 
                class="tab-text"
                @click="toggleTab(1)">
                Exam Dashboard
            </v-tab>
            <v-tab 
                class="tab-text"
                @click="toggleTab(2)">
                Downloads
            </v-tab>
            <v-tab 
                class="tab-text"
                @click="toggleTab(3)"
                :disabled="!studentIdSelectedProp">
                Student Specific Details
                <!-- <span v-show="studentIdSelectedProp"> {{ examResultDataProp.student_id }} </span> -->
            </v-tab>
        </v-tabs>

        <v-divider></v-divider>

        <ExamDashboard class="mt-2" v-show="currentTab==1" :examDataProp="examDataProp" />

        <ExamDownloads :examDataProp="examData" v-show="currentTab==2" />

        <div v-show="currentTab==3">
            <v-row class="mt-2">
                <v-col md="2" class="pb-0 ml-1">
                    <p> {{ $t('examData.resultDetails.semester') }}:
                        <span class="font-weight-bold"> {{ examData.semester.name }} </span>
                    </p>
                </v-col>

                <v-col md="4" class="pb-0">
                    <p> {{ $t('examData.resultDetails.course') }}:
                        <span class="font-weight-bold"> {{ examData.course.displayName }} </span>
                    </p>
                </v-col>

                <v-col md="4" class="pb-0">
                    <p> {{ $t('examData.resultDetails.enrollment_number') }}:
                        <span class="font-weight-bold"> {{ examResultDataProp.student_id }} </span>
                    </p>
                </v-col>
            </v-row>

            <v-row class="pb-2">
                <v-col md="2">
                    <ResultDetailsCard :title="$t('examData.resultDetails.chips.total_questions')"
                        :count="examQuestionsMetaData.totalQuestions" type="neutral" />
                </v-col>

                <v-col md="2">
                    <ResultDetailsCard :title="$t('examData.resultDetails.chips.correct')" :count="examQuestionsMetaData.correctAns"
                        type="neutral" />
                </v-col>

                <v-col md="2">
                    <ResultDetailsCard :title="$t('examData.resultDetails.chips.incorrect')" :count="examQuestionsMetaData.incorrectAns"
                        type="neutral" />
                </v-col>

                <v-col md="2">
                    <ResultDetailsCard :title="$t('examData.resultDetails.chips.score')" :count="displayScore"
                        type="neutral" />
                </v-col>

                <v-col md="2">
                    <ResultDetailsCard :title="$t('examData.resultDetails.chips.pointer')" :count="examQuestionsMetaData.pointer"
                        type="neutral" />
                </v-col>

                <v-col md="2">
                    <ResultDetailsCard :title="$t('examData.resultDetails.chips.result')" :count="examQuestionsMetaData.resultStatus"
                        type="neutral" />
                </v-col>
            </v-row>

            <v-divider></v-divider>
        </div>

        <div v-show="currentTab==3">
            <v-row>
                <v-col md="12">
                    <p class="mt-2 mb-0">Questions</p>
                </v-col>
            </v-row>

            <v-row>
                <v-col md="12" class="questions-sheet">
                    <QuestionCard v-for="qus in examQuestionsData" :key="qus._id" :questionDataProp="qus"></QuestionCard>
                </v-col>
            </v-row>
        </div>

    </div>
</template>

<script>

import ResultDetailsCard from './components/ResultDetailsCard.vue'
import QuestionCard from './components/QuestionCard.vue'
import ExamDashboard from './ExamDashboard.vue'
import ExamDownloads from './ExamDownloads.vue'

export default {
    components: { ResultDetailsCard, QuestionCard, ExamDashboard, ExamDownloads },
    props: {
        examDataProp: Object,
        examQuestionsDataProp: Array,
        studentIdSelectedProp: Boolean,
        examResultDataProp: Object
    },
    watch: {
        studentIdSelectedProp(newVal, oldVal) {
            if(newVal != oldVal) {
                this.currentTab = 2
            }
        }        
    },
    computed: {
        displayScore() {
            return this.examResultDataProp.scored_points + "/" + this.examData.maxPoints
        },
        examQuestionsMetaData() {
            let result = {}
            result.totalQuestions = this.examQuestionsDataProp.length + ""
            result.correctAns = this.examQuestionsDataProp.filter(examQuestion => examQuestion.scored_points > 0).length + ""
            result.incorrectAns = result.totalQuestions - result.correctAns + ""
            result.pointer = this.examResultDataProp.pointer + ""
            result.resultStatus = this.examResultDataProp.status
            return result
        }
    },
    updated() {
        console.log(this.examData)
    },
    data() {

        return {
            examData: {...this.examDataProp},
            examQuestionsData: {...this.examQuestionsDataProp},
            currentTab: 1,
            showContentTop: false,
            showContentQuestions: false,
            enrollmentNumber: ""
        }
    },
    methods: {
        toggleTab(val) {
            this.currentTab = val
            console.log("Student questions data - ", this.examQuestionsData)
        }
    }
}
</script>

<style scoped>
.questions-sheet {
    max-height: 65vh;
    overflow-y: scroll;
    scrollbar-width: thin;
    scrollbar-color: #2196F3;
}
.tab-text {
    text-transform: none !important;
}
</style>