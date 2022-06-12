<template>
  <div class="dashboard">
    <v-subheader class="grey--text darken-5">Dashboard</v-subheader>

    <v-container fluid>
      <!-- BOXES -->
      <v-row class="mb-5" align-content="center" justify="space-around" dense>
        <v-col md="2" xs="12">
          <Tile title="Total Courses" count="50" type="neutral" />
        </v-col>

        <v-col md="2" xs="12">
          <Tile title="Total Students" count="30" type="pass" />
        </v-col>

        <v-col md="2" xs="12">
          <Tile title="Total Questions" count="20" type="fail" />
        </v-col>

        <v-col md="2" xs="12">
          <Tile title="Total X" count="60/100" type="neutral" />
        </v-col>

        <v-col md="2" xs="12">
          <Tile title="Total Y" count="3.7" type="pass" />
        </v-col>
      </v-row>
      <v-divider></v-divider>

      <v-subheader class="mt-5 grey--text darken-5"> Bar Chart </v-subheader>
      <v-row class="my-3 rounded-lg">
        <v-col md="12" sm="12">
          <Bar />
        </v-col>
      </v-row>

      <v-divider></v-divider>

      <v-subheader class="mt-5 grey--text darken-5">
        Bubble and Doughnut Chart
      </v-subheader>
      <v-row class="my-3" align-content="center">
        <v-col md="5" sm="12">
          <Bubble />
        </v-col>
        <v-divider vertical></v-divider>
        <v-col md="5" sm="12">
          <Doughnut />
        </v-col>
      </v-row>

      <v-divider></v-divider>

      <v-subheader class="mt-5 grey--text darken-5">
        Line and Pie Chart
      </v-subheader>
      <v-row class="my-3" align-content="center">
        <v-col md="5" sm="12">
          <LineChart />
        </v-col>
        <v-divider vertical></v-divider>
        <v-col md="5" sm="12">
          <Pie />
        </v-col>
      </v-row>

      <v-divider></v-divider>

      <v-subheader class="mt-5 grey--text darken-5">
        Polar and Radar Chart
      </v-subheader>
      <v-row class="my-3" align-content="center">
        <v-col md="5" sm="12">
          <PolarArea />
        </v-col>
        <v-divider vertical></v-divider>
        <v-col md="5" sm="12">
          <Radar />
        </v-col>
      </v-row>

      <v-divider></v-divider>

      <v-subheader class="mt-5 grey--text darken-5">
        Scatter Chart
      </v-subheader>
      <v-row class="my-3" align-content="center">
        <v-col md="12" sm="12">
          <Scatter />
        </v-col>
      </v-row>

      <v-divider></v-divider>
    </v-container>
  </div>
</template>

<script>
/* eslint-disable vue/multi-word-component-names */
/* eslint-disable vue/no-unused-components */
import Tile from "../components/dashboard/Tile.vue";
import {
  Bar,
  Bubble,
  Doughnut,
  LineChart,
  Pie,
  PolarArea,
  Radar,
  Scatter,
} from "../components/dashboard/charts";
export default {
  name: "Dashboard",
  components: {
    Tile,
    Bar,
    Bubble,
    Doughnut,
    LineChart,
    Pie,
    PolarArea,
    Radar,
    Scatter,
  },
};
</script>

<style scoped>
</style>