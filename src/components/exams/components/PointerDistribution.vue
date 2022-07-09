<template>
  <div class="dashboard">
    <v-subheader class="grey--text darken-5">Pointer Distribution</v-subheader>

    <v-container fluid>
      <v-simple-table dense fixed-header height="300px">
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">Marks</th>
              <th class="text-left">Pointer</th>
              <th class="text-left">Number of Student</th>
              <th class="text-left">Grade Range</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="item in pointerDistribution"
              :key="item.marks"
              :class="getBG(item.gradeRange)"
            >
              <td>{{ item.marks }}</td>
              <td>{{ item.pointer }}</td>
              <td>{{ item.studentCount }}</td>
              <td>{{ item.gradeRange }}</td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-container>
  </div>
</template>

<script>
/* eslint-disable no-debugger */
export default {
  name: "PointerDistribution",
  props: ["baseMark"],
  data() {
    return {
      pointerDistribution: [],
    };
  },
  methods: {
    getGradeRange(value) {
      if (1 <= value && value <= 1.5) {
        return "very good";
      }
      if (1.51 <= value && value <= 2.5) {
        return "good";
      }
      if (2.51 <= value && value <= 3.5) {
        return "satisfactory";
      }
      return "insufficient";
    },
    updatePointerDistribution() {
      this.pointerDistribution = [];
      let increment = Number(Number((100 - this.baseMark) / 10).toFixed(0));
      for (
        let i = this.baseMark, j = 4;
        i <= 100, j >= 1;
        i += increment, j -= 0.3
      ) {
        let obj = {
          marks: Number(Number(i).toFixed(0)),
          pointer: Number(Number(j).toFixed(1)),
          studentCount: 10,
          gradeRange: this.getGradeRange(Number(Number(j).toFixed(1))),
        };
        this.pointerDistribution.unshift(obj);
      }
    },
    getBG(range) {
      if (range == "very good") return "green accent-2";
      if (range == "good") return "lime accent-2";
      if (range == "satisfactory") return "orange accent-2";
      if (range == "insufficient") return "red accent-2";
    },
  },
  watch: {
    baseMark: {
      // the callback will be called immediately after the start of the observation
      deep: true,
      immediate: true,
      handler(val, oldVal) {
        console.log(val, oldVal);
        this.updatePointerDistribution();
      },
    },
    // $props: {
    //   // deep: true so it not only watches $props but also it's nested values like e.g. props.myProp
    //   deep: true,
    //   immediate: true,
    //   handler() {
    //     this.updatePointerDistribution();
    //   },
    // },
  },
};
</script>

<style>
</style>