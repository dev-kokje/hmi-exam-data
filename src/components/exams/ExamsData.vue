<template>
  <div>

    <v-overlay :value="overlay">
      <v-progress-circular
        indeterminate
        size="128"
        color="primary"
      ></v-progress-circular>
    </v-overlay>

    <ExamSearchBar @examData="fetchExamData" />

    <v-divider></v-divider>

    <v-row class="mt-2">
      <v-col md="2" class="">
        <ExamDataSideBar 
          v-if="sideBarLoaded" 
          :key="sideBarReload" 
          :examDataProp="examData"
          @studentSelect="studentSelected" />
      </v-col>

      <v-divider vertical></v-divider>

      <v-col md="10">
        <ExamQuestionsData 
          v-if="sideBarLoaded"
          :key="studentIdKey"
          :examQuestionsDataProp="examQuestionsData" 
          :examDataProp="examData"
          :examResultDataProp="examResultData"
          :studentIdSelectedProp="studentIdSelected"
          :currentTabProp="currentTabProp"
          @updateQuestionPoints="updateQuestionPoints"
          class="full-height" />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import ExamDataSideBar from "./ExamDataSideBar.vue";
import ExamQuestionsData from "./ExamQuestionsData.vue";
import ExamSearchBar from "./ExamSearchBar.vue";
import examDataMixin from "../../mixins/examDataMixin";

export default {
  name: "ExamData",
  components: {
    ExamDataSideBar,
    ExamQuestionsData,
    ExamSearchBar
  },
  data: () => ({
    semestersList: [
      "SS21",
      "WS21",
      "SS22",
      "WS22"
    ],
    coursesList: [
      "HMI - Human Machine Interaction",
      "3DCC - 3D Content Creation",
      "CI - Computational Intelligence"
    ],
    semester: {},
    course: {},
    examData: {},
    examQuestionsData: [],
    examResultData: {},
    selectedExamResultId: 0,
    sideBarLoaded: false,
    studentIdSelected: false,
    studentIdKey: 0,
    overlay: false,
    sideBarReload: 0,
    currentTabProp: 0
  }),
  methods: {
    fetchExamData(val) {
      this.semester = val.semester
      this.course = val.course

      this.examData = {
        semester: val.semester,
        course: val.course,
        maxPoints: 100,
        passingPoints: 50
      }

      if (Object.keys(this.semester).length !== 0 && Object.keys(this.course).length !== 0) {

        const baseUrl = `https://sleepy-meadow-31578.herokuapp.com/api/students/${this.course._id}`;
        this.$http
          .get(baseUrl)
          .then((results) => {
            console.log("Results output - ", results)
            this.examData.examResults = results.data.Data
            this.gradeCalculation()
            this.sideBarReload++
            this.sideBarLoaded = true
          })
      }
    },
    studentSelected(val) {

      this.overlay = true

      console.log("Exam result id - ", val)

      let examResultId = val
      this.examResultData =  this.examData.examResults.find(exam => exam._id === examResultId)
      console.log("Exam data examDataResultProp", this.examResultData)
      const baseUrl = `https://sleepy-meadow-31578.herokuapp.com/api/students/exam/${examResultId}`;
      this.$http
        .get(baseUrl)
        .then((results) => {
          this.examQuestionsData = results.data.Data
          this.examData.examResults.map(examResult => {
            if(examResult._id === examResultId) {
              examResult.scored_points = Math.round(examResult.scored_points * 100) / 100
            }
          })
          this.currentTabProp = 2
          this.studentIdSelected = true
          this.studentIdKey++
          this.overlay = false
        })
    },
    updateQuestionPoints(val) {

      const questionId = val.questionId
      const points = val.points

      const baseUrl = `https://sleepy-meadow-31578.herokuapp.com/api/student/mark-update/${questionId}/${points}`;
      this.$http
        .patch(baseUrl)
        .then((result) => {
          console.log("Message - ", result.Message)
          console.log("Marks updated")
          this.examQuestionsData.map(examQuestion => {
              if(examQuestion._id === questionId) {
                examQuestion.scored_points = points
              }
          })
          
          let totalScore = 0
          for(const examQuestion of this.examQuestionsData) {
            totalScore += parseFloat(examQuestion.scored_points)
            totalScore = Math.round(totalScore * 10) / 10
          }
          this.examResultData.scored_points = totalScore

          this.updateExamResultsPoints(totalScore)

          this.examData.examResults.map(examResult => {
            if(examResult._id === this.examResultData._id) {
              examResult = this.examResultData
            }
          })
          this.gradeCalculation()
          this.examResultData = this.examData.examResults.find(exam => exam._id = this.examResultData._id)
          this.currentTabProp = 2
          this.studentIdKey++
          console.log("re-render component")

        })
    },
    updateExamResultsPoints(totalScore) {

      const baseUrl = `https://sleepy-meadow-31578.herokuapp.com/api/student/exam-point-update/${this.examResultData._id}/${totalScore}`;

      console.log("Sending axios request - ", baseUrl)

      this.$http
        .patch(baseUrl)
        .then((result) => {
          console.log(result)
        })

    }
  },
  mixins: [examDataMixin]
};
</script>

<style scoped>
.full-height {
  min-height: 100vh;
}
</style>