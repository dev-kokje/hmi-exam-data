<template>
  <div class="dashboard">

    <v-subheader class="grey--text darken-5">Dashboard</v-subheader>

    <v-container fluid>
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
    </v-container>
  </div>
</template>

<script>
import Tile from "../components/dashboard/Tile.vue";
export default {
  name: "Home-Page",
  components: { Tile },
};
</script>

<style scoped>
</style>