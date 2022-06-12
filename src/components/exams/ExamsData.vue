<template>
  <div>
    
    <v-row class="pt-0 pb-1">

      <v-col md="6" align-self="center" class="px-4">
        <h2> {{ $t('examData.topBar.title') }} </h2>
      </v-col>

      <v-col md="2" align-self="center">
        <v-select
          :items="items"
          :label="$t('examData.topBar.semester')"

        ></v-select>
      </v-col>

      <v-col md="3" align-self="center">
        <v-select
          :items="courses"
          :label="$t('examData.topBar.course')"
        ></v-select>
      </v-col>

      <v-col md="1" align-self="center">
        <v-btn
          outlined
          color="primary"
        >
          {{ $t('examData.topBar.search') }}
        </v-btn>
      </v-col>
    </v-row>

    <v-divider></v-divider>

    <v-row class="mt-2">
      <v-col md="2" class="">
        <ExamDataSideBar />
      </v-col>

      <v-divider vertical></v-divider>

      <v-col md="10">
        <ExamQuestionsData />
      </v-col>
    </v-row>
  </div>
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
  data: () => ({
    items: [
      "SS21", 
      "WS21",
      "SS22",
      "WS22" 
    ],
    courses: [
      "HMI - Human Machine Interaction",
      "3DCC - 3D Content Creation",
      "CI - Computational Intelligence"
    ]
  })
};
</script>