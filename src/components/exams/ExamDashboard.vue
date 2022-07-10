<!-- eslint-disable vue/no-mutating-props -->
<template>
    
    <div>

        <v-alert
            type="info"
            elevation="2"
            dense
            >
            {{ $t('examData.resultDetails.infomessage') }}
        </v-alert>

    <v-row class="pb-4">
      <v-col md="12">
        <v-simple-table fixed-header class="exam-table">
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left border-right">Semester</th>
                <th class="text-left border-right">Course</th>
                <th class="text-left border-right">Maximum Points</th>
                <th class="text-left border-right">Passing Points</th>
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
                    {{ toggleFlag ? "save" : "edit" }}
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
      <!-- xl="4" lg="4" md="6" sm="12" xs="12" cols="12" -->
      <v-col cols="6" class="p-0">
        <PointerDistribution
          :baseMark="baseMark"
          :examDataProp="examDataProp"
        />
      </v-col>
      <!-- xl="4" lg="4" md="6" sm="12" xs="12" cols="12" -->
      <v-col cols="6" class="p-0">
        <StudentDistribution
          :baseMark="baseMark"
          :examDataProp="examDataProp"
        />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import * as axios from "axios";
import PointerDistribution from "./components/PointerDistribution.vue";
import StudentDistribution from "./components/StudentDistribution.vue";
export default {
  data() {
    return {
      toggleFlag: false,
      baseMark: 0,
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
    this.baseMark = Number(this.examDataProp.passingPoints) ?? 0;
  },
  methods: {
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
      let payload = {};
      axios
        .patch(
            // api path to be updated
          `http://localhost:3000/api/student/exam-point-update/${course_id}/${this.baseMark}`,
          payload
        )
        .then((response) => {
          console.log("on marks update=>", response);
        })
        .catch((err) => {
          console.log(err);
        });
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