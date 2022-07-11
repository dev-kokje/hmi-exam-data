<!-- eslint-disable no-unreachable -->
<template>
  <v-container class="fill-height" fluid>
    <!-- select fields -->
    <v-row align="center" justify="start">
      <!-- select semester -->
      <v-col xl="2" lg="3" md="6" sm="12" xs="12" cols="12">
        <v-select
          v-model="selectSemester"
          :items="semesterList"
          item-text="name"
          item-value="_id"
          :label="$t('examData.topBar.semester')"
          @change="fetchCoursesForSemester"
        >
        </v-select>
      </v-col>
      <!-- select course -->
      <v-col xl="2" lg="3" md="6" sm="12" xs="12" cols="12">
        <v-select
          v-model="selectCourse"
          :items="courseList"
          item-text="displayName"
          item-value="_id"
          :label="$t('examData.topBar.course')"
        ></v-select>
      </v-col>
      <!-- add new course -->
      <v-col xl="2" lg="3" md="6" sm="12" xs="12" cols="12">
        <v-btn color="success" dark @click="showAddCourse = !showAddCourse">
          {{$t('examData.fileUpload.AddNewCourse')}}
        </v-btn>
      </v-col>
    </v-row>

    <!-- File Upload Button -->
    <v-row align="center" justify="end">
      <v-btn
        class="mr-2 white--text"
        :loading="isUploading"
        :disabled="isUploading || fileList.length == 0"
        color="blue-grey"
        @click="uploadFile()"
      >
        {{$t('examData.fileUpload.Upload')}}
        <v-icon right dark> mdi-cloud-upload </v-icon>
      </v-btn>
    </v-row>

    <!-- select files -->
    <v-row align="center" justify="center" v-if="fileList.length == 0">
      <v-col cols="12" sm="10" md="10">
        <div class="card-heading">
          <h2 class="teal--text">{{$t('examData.fileUpload.FileUpload&Preview')}}</h2>
          <p class="lead">
            {{$t('examData.fileUpload.NoteSelectfileswithreportextension')}}
          </p>
        </div>
        <v-card
          elevation="2"
          class="file_upload_card ma-3 my-5"
          @click.once="$refs.fileUpload.click()"
        >
          <v-card-text class="v-card-text">
            <input
              ref="fileUpload"
              id="file-upload"
              type="file"
              name="fileUpload"
              accept=".report"
              multiple
              @change="handleFileUpload"
              v-show="false"
            />

            <label for="file-upload" id="file-drag" class="file-drag">
              <i
                class="fa fa-download fa-5x teal--text mx-2"
                aria-hidden="true"
              ></i>

              <div class="mt-5 mb-2">{{$t('examData.fileUpload.Selectafileordraghere')}}</div>

              <v-btn depressed color="primary"> {{$t('examData.fileUpload.Selectafile')}} </v-btn>
            </label>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- upload files listing -->
    <v-row v-if="fileList.length > 0">
      <v-col>
        <v-subheader>{{$t('examData.fileUpload.Preview')}}</v-subheader>
        <v-list subheader two-line>
          <v-list-item
            v-for="(item, index) in fileList"
            v-bind:key="item.name + '-' + index"
          >
            <v-list-item-avatar>
              <v-icon color="black"> mdi-file </v-icon>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title v-text="item.name"></v-list-item-title>

              <v-list-item-subtitle
                v-text="item.size / 1000000 + ' MB'"
              ></v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-action>
              <v-btn icon @click.once="removeFile(index)">
                <v-icon color="black">mdi-delete</v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>
        </v-list>
      </v-col>
    </v-row>

    <!-- snackbar -->
    <v-snackbar v-model="snackbar" :timeout="timeout">
      {{ text }}
      <template v-slot:action="{ attrs }">
        <v-btn color="blue" text v-bind="attrs" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>

    <!-- add course form -->
    <v-row justify="center">
      <v-dialog v-model="showAddCourse" persistent max-width="600px">
        <v-card>
          <v-card-title>
            <span class="text-h5">{{$t('examData.fileUpload.AddCourse')}}</span>
          </v-card-title>

          <v-card-text>
            <v-container>
              <v-row>
                <!-- sem -->
                <v-col cols="12">
                  <v-select
                    v-model="course_sem_id"
                    :items="semesterList"
                    item-text="name"
                    item-value="_id"
                    :label="$t('examData.topBar.semester')"
                  >
                  </v-select>
                </v-col>
                <!-- course code -->
                <v-col cols="12">
                  <v-text-field
                    v-model="course_code"
                    label="Enter Course Code"
                  ></v-text-field>
                </v-col>
                <!-- course name -->
                <v-col cols="12">
                  <v-text-field
                    v-model="course_name"
                    label="Enter Course Name"
                  ></v-text-field>
                </v-col>
                <!-- passing points -->
                <v-col cols="12">
                  <v-text-field
                    v-model="passing_points"
                    type="number"
                    label="Enter Passing Points"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="addNewCourse(false)">
              {{$t('examData.fileUpload.Close')}}
            </v-btn>
            <v-btn color="blue darken-1" text @click="addNewCourse(true)">
              {{$t('examData.fileUpload.AddCourse')}}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
import * as _ from "lodash";

export default {
  name: "UploadExam",
  async mounted() {
    this.fetchSemList();
  },
  data() {
    return {
      selectSemester: "",
      semesterList: [],

      selectCourse: "",
      courseList: [],

      fileList: [],
      isUploading: false,

      //   uploadFlagArr: [],

      snackbar: false,
      text: "",
      timeout: 2000,

      showAddCourse: false,
      course_sem_id: "",
      course_code: "",
      course_name: "",
      maximum_points: 100,
      passing_points: 50,
    };
  },
  methods: {
    async fetchSems() {
      let start = 2000;
      let year = new Date().getFullYear() + 1;
      let range = _.range(start, year);
      let semList = [];
      range.forEach((num) => {
        let numStr = num % 100 < 10 ? `0${num % 100}` : `${num % 100}`;
        semList.push(`SS${numStr}`);
        semList.push(`WS${numStr}`);
      });
      this.semesterList = semList?.reverse() ?? [];
      this.selectSemester = this.semesterList[0] ?? "";
    },
    async fetchCourses() {
      const response = await axios.get("https://sleepy-meadow-31578.herokuapp.com/api/courses");
      let courseList = response?.data?.Data || [];
      if (courseList.length == 0) {
        this.courseList = [];
        return;
      }

      let arr = [];
      courseList.forEach((obj) => {
        let course = {
          id: obj._id,
          code: obj.code,
          name: obj.name,
        };
        arr.push(course);
      });

      this.courseList = arr;
      this.selectCourse = this.courseList[0] ?? null;
    },
    handleFileUpload(event) {
      let files = event.target.files;
      this.fileList = Array.from(files); // convert theFileList to array
      //   this.uploadFlagArr = new Array(this.fileList.length).fill(false);
    },
    uploadFile() {
      if (this.isUploading) {
        this.snackbar = true;
        this.text = "Please wait..";
        return;
      }
      if (!this.selectSemester || !this.selectCourse) {
        this.snackbar = true;
        this.text = "Please select Semester and Course..";
        return;
      }

      this.isUploading = true;

      let len = this.fileList.length;
      let promiseArr = [];
      for (var i = 0; i < len; i++) {
        // add to upload only if flag is false
        // if (!this.uploadFlagArr[i] || this.uploadFlagArr[i] == false) {}
        let formData = new FormData();
        formData.append("files", this.fileList[i]);
        let promise = axios.post(
          `https://sleepy-meadow-31578.herokuapp.com/api/fileupload/${this.selectCourse}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        promiseArr.push(promise);
      }

      Promise.all(promiseArr)
        .then((responseArr) => {
          console.log("responseArr=>", responseArr);
          this.snackbar = true;
          this.text = "All files uploaded successfully!";
          //   responseArr.forEach((response, index) => {
          //     if (response.status == 200) {
          //       this.uploadFlagArr[index] = true;
          //     } else {
          //       this.uploadFlagArr[index] = false;
          //     }
          //   });
          // remove all files
          setTimeout(() => {
            this.clearAll();
          });
        })
        .catch((err) => {
          console.log(err);
          this.snackbar = true;
          this.text = "Internal Error. Please try later..";
        })
        .finally(() => {
          this.isUploading = false;
        });
    },
    removeFile(index) {
      this.fileList.splice(index, 1);
      //   this.uploadFlagArr = new Array(this.fileList.length).fill(false);
      this.$forceUpdate();
    },
    clearAll() {
      this.fileList = [];
      //   this.uploadFlagArr = new Array(this.fileList.length).fill(false);
      this.$forceUpdate();
    },

    // new fetch sem and course methods
    fetchSemList() {
      const baseUrl = "https://sleepy-meadow-31578.herokuapp.com/api/sem";
      this.$http.get(baseUrl).then((results) => {
        this.semesterList = results.data.Data;
      });
    },
    fetchCoursesForSemester() {
      let semesterId = this.selectSemester;
      const baseUrl = `https://sleepy-meadow-31578.herokuapp.com/api/sem-subjects/${semesterId}`;
      this.$http.get(baseUrl).then((results) => {
        this.courseList = results.data.Data;
        this.courseList.map((course) => {
          course.displayName = course.code + " - " + course.name;
        });
      });
    },

    addNewCourse(flag) {
      if (!flag) {
        this.closeDialog();
        return;
      }

      // add new course API
      let semID = this.course_sem_id;
      let payload = {
        code: this.course_code,
        name: this.course_name,
        maximum_points: "100",
        passing_points: this.passing_points,
      };

      axios
        .post(`https://sleepy-meadow-31578.herokuapp.com/api/add-course/${semID}`, payload)
        .then((response) => {
          console.log("response=>", response);
          if (response.status == 200) {
            this.snackbar = true;
            this.text = "New Course added successfully";
          }
          this.closeDialog();
        })
        .catch((error) => {
          console.log("error=>", error);
          this.snackbar = true;
          this.text = "Internal Server Error..";
          this.closeDialog();
        });
    },
    closeDialog() {
      this.course_code = "";
      this.course_name = "";
      this.passing_points = 50;
      this.showAddCourse = false;
    },
  },
  watch: {
    // menu(val) {
    //   val && setTimeout(() => (this.activePicker = "YEAR"));
    //   val && this.$nextTick(() => (this.activePicker = "YEAR"));
    // },
  },
};
</script>

<style scoped>
.file_upload_card {
  border-radius: 25px;
  border: 5px solid transparent;
}
.file_upload_card:hover {
  border: 5px solid teal;
}

.card-heading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.v-card-text,
.file-drag {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
