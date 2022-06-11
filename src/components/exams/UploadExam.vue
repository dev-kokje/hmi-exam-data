<template>
  <v-container class="fill-height" fluid>
    <!-- select fields -->
    <v-row align="start">
      <v-col lg="3" md="4" sm="6" xs="12">
        <v-select
          v-model="selectSemester"
          :items="semList"
          item-text="value"
          item-value="id"
          label="Select Semester"
          return-object
        ></v-select>
      </v-col>

      <v-col lg="3" md="4" sm="6" xs="12">
        <v-menu
          ref="menu"
          v-model="menu"
          :close-on-content-click="true"
          transition="scale-transition"
          offset-y
          min-width="auto"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="date"
              label="Select Year"
              prepend-icon="mdi-calendar"
              readonly
              v-bind="attrs"
              v-on="on"
            >
            </v-text-field>
          </template>

          <v-date-picker
            v-model="date"
            :active-picker.sync="activePicker"
            :max="
              new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
                .toISOString()
                .substr(0, 10)
            "
            min="1950-01-01"
            @change="save"
            no-title
            reactive
          ></v-date-picker>
        </v-menu>
      </v-col>
    </v-row>

    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="8">
        <v-card class="elevation-12"> </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "UploadExam",
  created: {},
  data: () => ({
    selectSemester: { id: 0, value: "Winter Semester" },
    semList: [
      { id: 0, value: "Winter Semester" },
      { id: 1, value: "Summer Semester" },
    ],
    currYear: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .substr(0, 10),
    maxYear: new Date().getFullYear(),

    activePicker: null,
    date: null,
    menu: false,
  }),
  methods: {
    save(date) {
      this.$refs.menu.save(date);
      this.activePicker = "YEAR";
      this.menu = false;
    },
  },
  watch: {
    menu(val) {
      val && setTimeout(() => (this.activePicker = "YEAR"));
      val && this.$nextTick(() => (this.activePicker = "YEAR"));
    },
  },
};
</script>

<style scoped>
</style>