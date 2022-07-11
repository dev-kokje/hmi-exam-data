<template>
  <div class="dashboard">
    <v-subheader class="grey--text darken-5">{{$t('examData.studentDistribution.title')}}</v-subheader>
    <v-container fluid>
      <Doughnut :chartData="chartData" :height="300" :width="300" />
    </v-container>
  </div>
</template>

<script>
import Doughnut from "../../dashboard/charts/Doughnut.vue";
export default {
  name: "StudentDistribution",
  props: {
    baseMark: Number,
    examDataProp: Object,
  },
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
    getStudentCount(min, max) {
      if (this.examDataProp && this.examDataProp.examResults) {
        let arr = this.examDataProp.examResults.filter(
          (obj) => obj.pointer >= min && obj.pointer <= max
        );
        return arr.length;
      } else {
        return 0;
      }
    },
    updatePointerDistribution() {
      this.pointerDistribution = [];
      let increment = Number(Number((100 - this.baseMark) / 10).toFixed(0));
      let deltaJFlag = 1;

      for (
        let i = this.baseMark, j = 4;
        i <= 100, j >= 1;
        i += increment, j -= deltaJFlag % 3 == 0 ? 0.4 : 0.3
      ) {
        let obj = {
          marks: Number(Number(i).toFixed(0)),
          gradeRange: this.getGradeRange(Number(Number(j).toFixed(1))),
          upperBracket: Number(Number(j).toFixed(1)),
        };
        this.pointerDistribution.unshift(obj);
        deltaJFlag++;
        deltaJFlag = deltaJFlag % 3;
      }

      //  get lower and upper brackets
      this.pointerDistribution.forEach((obj, index) => {
        if (index < this.pointerDistribution.length - 1) {
          let nextObject = this.pointerDistribution[index + 1];
          obj["lowerBracket"] = obj["upperBracket"];
          if (index > 0) {
            obj["lowerBracket"] = Number(
              Number(obj["lowerBracket"] + 0.01).toFixed(2)
            );
          }
          obj["upperBracket"] = nextObject["upperBracket"];
        }
        if (index == this.pointerDistribution.length - 1) {
          obj["lowerBracket"] = obj["upperBracket"];
          obj["upperBracket"] = 5;
        }
        // console.log(JSON.parse(JSON.stringify(obj)));
      });

      // add student count
      this.pointerDistribution.forEach((obj) => {
        obj["studentCount"] = this.getStudentCount(
          Number(obj.lowerBracket),
          Number(obj.upperBracket)
        );
      });

      // update chartData object
      let labelArr = [];
      let dataArr = [];
      let backgroundColorArr = [
        "#00FF00",
        "#33ff00",
        "#66ff00",
        "#99ff00",
        "#ccff00",
        "#FFFF00",
        "#FFCC00",
        "#ff9900",
        "#ff6600",
        "#FF3300",
        "#FF0000",
      ];
      this.pointerDistribution.forEach((obj) => {
        labelArr.push(`${obj.lowerBracket} - ${obj.upperBracket}`);
        dataArr.push(obj.studentCount);
      });

      this.chartData = {
        labels: labelArr,
        datasets: [
          {
            backgroundColor: backgroundColorArr,
            data: dataArr,
          },
        ],
      };
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
  },
};
</script>

<style scoped>
</style>