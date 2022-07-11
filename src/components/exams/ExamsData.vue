<template>
  <div>

    <v-overlay :value="overlay">
      <v-progress-circular
        indeterminate
        size="64"
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
    overlay: false
  }),
  methods: {
    fetchExamData(val) {
      this.semester = val.semester
      this.course = val.course

      console.log("Semester - ", val.semester)
      console.log("Course - ", val.course)

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
            this.examData.examResults = results.data.Data
            this.gradeCalculation()
            this.sideBarReload++
            this.sideBarLoaded = true
          })
      }
    },
    studentSelected(val) {

      this.overlay = true

      let examResultId = val
      this.examResultData =  this.examData.examResults.find(exam => exam._id === examResultId)
      console.log("Selected exam result id - ", examResultId)
      const baseUrl = `https://sleepy-meadow-31578.herokuapp.com/api/students/exam/${examResultId}`;
      console.log("Request made to ", baseUrl)
      this.$http
        .get(baseUrl)
        .then((results) => {
          this.examQuestionsData = results.data.Data
          this.studentIdSelected = true
          this.studentIdKey++
          this.overlay = false
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