<template>
    <div>

        <v-tabs
            v-model="currentTab" 
            background-color="#fafafa"
            light>
            <v-tab 
                class="tab-text"
                @click="toggleTab(0)"
                key="0">
                {{ $t('examData.examDashboard.examDashboard') }}
            </v-tab>
            <v-tab 
                class="tab-text"
                @click="toggleTab(1)"
                key="1">
                {{ $t('examData.examDashboard.downloads') }}
            </v-tab>
            <v-tab
                class="tab-text"
                @click="toggleTab(2)"
                key="2"
                :disabled="!studentIdSelectedProp">
                {{ $t('examData.examDashboard.studentDetails') }}
                <!-- <span v-show="studentIdSelectedProp"> {{ examResultDataProp.student_id }} </span> -->
            </v-tab>
        </v-tabs>

        <v-divider></v-divider>

        <ExamDashboard 
            :key="studentIdKey" 
            class="mt-2" 
            v-show="currentTab==0" 
            :examDataProp="examDataProp"
            @updatePassingMarks="updatePassingMarks" />

        <ExamDownloads :key="studentIdKey" :examDataProp="examData" v-show="currentTab==1" />

        <div v-show="currentTab==2">
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
                        <span class="font-weight-bold"> 
                            {{  Object.keys(examResultDataProp).length === 0 ? 0: examResultDataProp.student[0].enrollment_number }} 
                        </span>
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

        <div v-show="currentTab==2">
            <v-row>
                <v-col md="12">
                    <p class="mt-2 mb-0">Questions</p>
                </v-col>
            </v-row>

            <v-row>
                <v-col md="12" class="questions-sheet">
                    <QuestionCard 
                        v-for="(qus, index) in examQuestionsData" 
                        :key="qus._id"
                        :questionNo="index"
                        :questionDataProp="qus"
                        @updateQuestionPoints="updateQuestionPoints"></QuestionCard>
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
        examResultDataProp: Object,
        currentTabProp: Number,
        studentIdKey: Number
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
    data() {

        return {
            examData: {...this.examDataProp},
            examQuestionsData: {...this.examQuestionsDataProp},
            currentTab: this.currentTabProp,
            showContentTop: false,
            showContentQuestions: false,
            enrollmentNumber: ""
        }
    },
    methods: {
        toggleTab(val) {
            this.currentTab = val
        },
        updateQuestionPoints(val) {
            this.$emit("updateQuestionPoints", val)
        },
        updatePassingMarks(val) {
            this.$emit("updatePassingMarks", val)
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