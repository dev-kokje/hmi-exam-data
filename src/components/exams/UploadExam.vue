<template>
  <v-container class="fill-height" fluid>
    <!-- select fields -->
    <v-row align="center" justify="start">
      <!-- select semester -->
      <v-col lg="3" md="4" sm="6" xs="12">
        <v-select
          v-model="selectSemester"
          :items="semesterList"
          item-text="value"
          item-value="id"
          label="Select Semester"
          return-object
        ></v-select>
      </v-col>
      <!-- select year -->
      <v-col lg="3" md="4" sm="6" xs="12">
        <v-menu
          ref="menu"
          v-model="menu"
          :close-on-content-click="false"
          transition="scale-transition"
          offset-y
          min-width="auto"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="displayedDate"
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
            @input="save"
            no-title
            reactive
          ></v-date-picker>
        </v-menu>
      </v-col>
    </v-row>

    <!-- File Upload Button -->
    <v-row align="center" justify="end">
      <!-- :disabled="isUploading || files.length == 0" -->
      <v-btn
        class="mr-2 white--text"
        :loading="isUploading"
        :disabled="isUploading"
        color="blue-grey"
        @click.once="submitFiles()"
      >
        Upload
        <v-icon right dark> mdi-cloud-upload </v-icon>
      </v-btn>
    </v-row>

    <!-- select files -->
    <v-row align="center" justify="center" v-if="files.length == 0">
      <v-col cols="12" sm="10" md="10">
        <div class="card-heading">
          <h2 class="teal--text">File Upload & Preview</h2>
          <p class="lead">
            Note: Select files with <b> ".record" extension </b> and proper
            formatting
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
              accept=".pdf"
              multiple
              @change="handleFileUpload"
              v-show="false"
            />

            <label for="file-upload" id="file-drag" class="file-drag">
              <i
                class="fa fa-download fa-5x teal--text mx-2"
                aria-hidden="true"
              ></i>

              <div class="mt-5 mb-2">Select a file or drag here</div>

              <v-btn depressed color="primary"> Select a file </v-btn>
            </label>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- upload files listing -->
    <v-row v-if="files.length > 0">
      <v-col>
        <v-subheader>Preview Files</v-subheader>
        <v-list subheader two-line>
          <v-list-item v-for="(item, index) in files" :key="item.name">
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
  </v-container>
</template>

<script>
export default {
  name: "UploadExam",
  created: {},
  data: () => ({
    selectSemester: { id: 0, value: "Winter Semester" },
    semesterList: [
      { id: 0, value: "Winter Semester" },
      { id: 1, value: "Summer Semester" },
    ],

    activePicker: null,
    date: null,
    menu: false,
    displayedDate: "2022",

    files: [],
    isUploading: false,
  }),
  methods: {
    save(date) {
      this.$refs.menu.save(date);
      this.activePicker = "YEAR";
      this.menu = false;
      this.displayedDate = new Date(date).getFullYear();
    },
    handleFileUpload(event) {
      let files = event.target.files;
      this.files = Array.from(files); // convert theFileList to array
    },
    submitFiles() {
      if (this.isUploading) return;
      this.isUploading = true;

      let formData = new FormData();
      for (var i = 0; i < this.files.length; i++) {
        let file = this.files[i];
        formData.append("files[" + i + "]", file);
      }
      console.log("formData=>", formData);
    },
    removeFile(index) {
      this.$delete(this.files, index);
      //   console.log(index);
      //   this.files = this.files.filter((item, id) => id !== index);
      //   this.$forceUpdate();
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
