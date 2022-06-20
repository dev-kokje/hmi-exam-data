<template>
  <div>

    <ExamSearchBar @examData="fetchExamData" />

    <v-divider></v-divider>

    <v-row class="mt-2">
      <v-col md="2" class="">
        <ExamDataSideBar :examDataDetails="examResultData" @studentSelect="studentSelected" />
      </v-col>

      <v-divider vertical></v-divider>

      <v-col md="10">
        <ExamQuestionsData 
          :selectedExamResultData="selectedExamResultData" 
          :examData="examData"
          :semesterString="semester"
          :courseString="course"
          class="full-height"  />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import ExamDataSideBar from "./ExamDataSideBar.vue";
import ExamQuestionsData from "./ExamQuestionsData.vue";
import ExamSearchBar from "./ExamSearchBar.vue";

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
    semester: "",
    course: "",
    examData: null,
    examResultData: [],
    selectedExamResultData: null,
  }),
  methods: {
    fetchExamData(val) {
      this.semester = val.semester
      this.course = val.course



      if(this.semester!==null && this.semester!=="" && this.course!==null && this.course!=="") {
        console.log("Reading exam data from parent")

        this.examData = {
          total_questions: "50",
          maximum_points: "100",
          passing_points: "50"
        }

        this.examResultData = [
            {
              enrollment_number: "313931",
              correct_answers: "42",
              scored_points: "84",
              pointer: "1.3",
              grade: 'vg',
              status: 'Pass'
            },
            {
              enrollment_number: "313932",
              correct_answers: "30",
              scored_points: "60",
              pointer: "2.0",
              grade: 'vg',
              status: 'Pass'
            },
            {
              enrollment_number: "313933",
              correct_answers: "10",
              scored_points: "20",
              pointer: "5",
              grade: 'vg',
              status: 'Fail'
            },
            {
              enrollment_number: "313934",
              correct_answers: "25",
              scored_points: "50",
              pointer: "4",
              grade: 'vg',
              status: 'Pass'
            },
            {
              enrollment_number: "313935",
              correct_answers: "13",
              scored_points: "26",
              pointer: "5",
              grade: 'vg',
              status: 'Fail'
            },
            {
              enrollment_number: "313936",
              correct_answers: "40",
              scored_points: "80",
              pointer: "2.0",
              grade: 'vg',
              status: 'Pass'
            },
            {
              enrollment_number: "313937",
              scored_points: "60",
              correct_answers: "30",
              pointer: "3.3",
              grade: 'vg',
              status: 'Pass'
            },
            {
              enrollment_number: "313938",
              scored_points: "60",
              correct_answers: "30",
              pointer: "3.3",
              grade: 'vg',
              status: 'Pass'
            },
            {
              enrollment_number: "313939",
              scored_points: "20",
              correct_answers: "10",
              pointer: "5",
              grade: 'vg',
              status: 'Fail'
            },
            {
              enrollment_number: "313940",
              scored_points: "60",
              correct_answers: "30",
              pointer: "1.3",
              grade: 'vg',
              status: 'Pass'
            },
            {
              enrollment_number: "313941",
              correct_answers: "30",
              scored_points: "60",
              pointer: "1.3",
              grade: 'vg',
              status: 'Pass'
            }
          ]
      }
    },
    studentSelected(val) {

      let studentId = val
      console.log("Selected Student id - ", studentId)
      let examResult = this.examResultData.filter(exam => exam.enrollment_number === studentId)
      console.log("Selected Student data - ", examResult)
      this.selectedExamResultData = examResult[0]
    }
  }
};
</script>

<style scoped>

.full-height {
  min-height: 100vh;
}

</style>