<template>
  <div class="dashboard">
    <v-subheader class="grey--text darken-5">Student Distribution</v-subheader>
    <v-container fluid>
      <Doughnut :chartData="chartData" :height="300" :width="300" />
    </v-container>
  </div>
</template>

<script>
import Doughnut from "../../dashboard/charts/Doughnut.vue";
export default {
  name: "StudentDistribution",
  props: [],
  data() {
    return {
      chartData: {
        labels: ["VueJs", "EmberJs", "ReactJs", "AngularJs"],
        datasets: [
          {
            backgroundColor: ["#41B883", "#E46651", "#00D8FF", "#DD1B16"],
            data: [40, 20, 80, 10],
          },
        ],
      },
    };
  },
  components: {
    Doughnut,
  },
  methods: {},
  watch: {},
};
</script>

<style scoped>
</style>