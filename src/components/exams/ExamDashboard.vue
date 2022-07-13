<!-- eslint-disable vue/no-mutating-props -->
<template>
  <div>
    <v-alert type="info" elevation="2" dense>
      {{ $t("examData.resultDetails.infomessage") }}
    </v-alert>

    <v-row class="pb-4">
      <v-col md="12">
        <v-simple-table fixed-header class="exam-table">
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left border-right">
                  {{ $t("examData.examDashboard.Semester") }}
                </th>
                <th class="text-left border-right">
                  {{ $t("examData.examDashboard.Course") }}
                </th>
                <th class="text-left border-right">
                  {{ $t("examData.examDashboard.MaximumPoints") }}
                </th>
                <th class="text-left border-right">
                  {{ $t("examData.examDashboard.PassingPoints") }}
                </th>
                <th class="text-left"></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="border-right font-big">
                  {{ examDataProp.semester.name }}
                </td>
                <td class="border-right font-big">
                  {{ examDataProp.course.displayName }}
                </td>
                <td class="border-right font-big">
                  {{ examDataProp.maxPoints }}
                </td>
                <td class="border-right font-big">
                  <v-text-field
                    type="number"
                    v-model="examDataProp.passingPoints"
                    :disabled="!toggleFlag"
                  />
                </td>
                <td class="text-center">
                  <v-btn
                    color="primary"
                    small
                    @click="editToggle()"
                    :disabled="
                      toggleFlag &&
                      (examDataProp.passingPoints > examDataProp.maxPoints ||
                        examDataProp.passingPoints < 0)
                    "
                  >
                    {{
                      toggleFlag
                        ? $t("examData.examDashboard.save")
                        : $t("examData.examDashboard.edit")
                    }}
                  </v-btn>
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-col>
    </v-row>

    <v-divider></v-divider>

    <v-row class="mt-4 p-0">
      <v-col xs="12" sm="12" md="12" lg="6" xl="6" class="p-0">
        <PointerDistribution
          :baseMark="baseMark"
          :examDataProp="examDataProp"
        />
      </v-col>
      <v-col xs="12" sm="12" md="12" lg="6" xl="6" class="p-0">
        <StudentDistribution
          :baseMark="baseMark"
          :examDataProp="examDataProp"
        />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import axios from "axios";
import PointerDistribution from "./components/PointerDistribution.vue";
import StudentDistribution from "./components/StudentDistribution.vue";
export default {
  data() {
    return {
      toggleFlag: false,
      baseMark: 0,
      componentWidth : 0,
    };
  },
  props: {
    examDataProp: Object,
  },
  components: {
    PointerDistribution,
    StudentDistribution,
  },
  mounted() {
    this.setBaseMark();
  },
  methods: {
    setBaseMark() {
      this.baseMark = Number(this.examDataProp.passingPoints) ?? 0;
    },
    editToggle() {
      if (this.toggleFlag) {
        this.updatePassPoint();
      }
      this.toggleFlag = !this.toggleFlag;
    },
    updatePassPoint() {
      this.baseMark = Number(this.examDataProp.passingPoints) ?? 0;
      // update marks api call
      let course_id = this.examDataProp.course._id;
      let payload = {
        passing_points : this.baseMark,
      }
      axios
        .patch(
          // api path to be updated
          `https://sleepy-meadow-31578.herokuapp.com/api/sem/update-points/${course_id}`,
          payload
        )
        .then((response) => {
          console.log("on marks update=>", response);
          this.$emit("updatePassingMarks", {passingPoints: this.baseMark})
        })
        .catch((err) => {
          console.log(err);
        });
    }
  },
  watch: {
    baseMark: {
      // the callback will be called immediately after the start of the observation
      deep: true,
      immediate: true,
      handler(val, oldVal) {
        console.log(val, oldVal);
        this.setBaseMark();
      },
    },
  },
};
</script>

<style scoped>
.exam-table {
  border: 1px solid #aaa;
}
.border-right {
  border-right: 1px solid #ddd;
}
.font-big {
  font-size: 16px !important;
}
</style>