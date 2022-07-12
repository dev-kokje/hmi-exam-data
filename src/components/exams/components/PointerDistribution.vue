<template>
  <div class="dashboard">
    <v-subheader class="grey--text darken-5">{{
      $t("examData.pointerDistribution.pointerDistribution")
    }}</v-subheader>

    <v-container fluid>
      <v-simple-table dense fixed-header height="400px">
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-center">
                {{ $t("examData.pointerDistribution.Marks") }}
              </th>
              <th class="text-center">
                {{ $t("examData.pointerDistribution.Pointer") }}
              </th>
              <th class="text-center">
                {{ $t("examData.pointerDistribution.NumberofStudent") }}
              </th>
              <!-- <th class="text-center">Grade Range</th> -->
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(item,index) in pointerDistribution"
              :key="item.marks"
              :style="{ backgroundColor: getBG(item.gradeRange, index) }"
              :class="getBG(item.gradeRange, index)"
            >
              <td class="text-center">
                {{ item.marks }}
                {{ $t("examData.pointerDistribution.andabove") }}
              </td>
              <td class="text-center">
                {{ item.lowerBracket }} - {{ item.upperBracket }}
              </td>
              <td class="text-center">{{ item.studentCount }}</td>
              <!-- <td class="text-center">{{ item.gradeRange }}</td> -->
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "PointerDistribution",
  props: {
    baseMark: Number,
    examDataProp: Object,
  },
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
      
      console.log('this.pointerDistribution=>', this.pointerDistribution.toString());

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
      });

      // add student count
      this.pointerDistribution.forEach((obj) => {
        obj["studentCount"] = this.getStudentCount(
          Number(obj.lowerBracket),
          Number(obj.upperBracket)
        );
      });
    },
    getBG(range,index) {
        console.log(index);
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
      return backgroundColorArr[index];
    //   if (range == "very good") return "green accent-2";
    //   if (range == "good") return "lime accent-2";
    //   if (range == "satisfactory") return "orange accent-2";
    //   if (range == "insufficient") return "red accent-2";
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