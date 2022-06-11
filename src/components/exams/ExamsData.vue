<template>
  <v-row>
    <v-col md="2" class="">
      <ExamDataSideBar />
    </v-col>

    <v-divider vertical></v-divider>

    <v-col md="10">
      <ExamQuestionsData />
    </v-col>
  </v-row>
</template>

<script>
import ExamDataSideBar from "./ExamDataSideBar.vue";
import ExamQuestionsData from "./ExamQuestionsData.vue";

export default {
  name: "ExamData",
  components: {
    ExamDataSideBar,
    ExamQuestionsData,
  },
};
</script>