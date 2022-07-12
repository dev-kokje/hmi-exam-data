<template>
    <div>
        <v-row>
            <v-col md="4" class="mt-4">
                <v-card
                    elevation="1"
                    outlined
                    >
                    <v-card-text>
                        <h2>Download all files for the exam</h2>
                        <v-radio-group>
                            <v-radio
                                v-for="type in fileTypes"
                                :key="type"
                                :label="type"
                                :value="type"
                                @change="createZipAllFiles"
                            ></v-radio>
                        </v-radio-group>

                        <v-btn
                            :loading="loadingAllFiles"
                            :disabled="disabledAllFiles"
                            color="primary"
                            class="my-2 white--text"
                            @click="downloadAllFiles"
                            width="100%"
                            large
                            >
                            Download
                            <v-icon
                                right
                                dark
                            >
                                mdi-cloud-download
                            </v-icon>
                            </v-btn>

                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>

        <v-row>
            <v-col md="4" class="mt-4">
                <v-card
                    elevation="1"
                    outlined
                    >
                    <v-card-text>
                        <h2>Download file for a specific students</h2>

                        <v-autocomplete
                            v-model="selectedStudents"
                            class="mt-5"
                            :items="students"
                            item-text="student[0].enrollment_number"
                            clearable
                            multiple
                            small-chips
                            outlined
                            dense
                            hint="Select students from the list"
                            persistent-hint
                            ></v-autocomplete>

                        <v-radio-group>
                            <v-radio
                                v-for="type in fileTypes"
                                :key="type"
                                :label="type"
                                :value="type"
                                @change="createZipSelectedFiles"
                            ></v-radio>
                        </v-radio-group>

                        <v-btn
                            :loading="loadingSelectedFiles"
                            :disabled="disabledSelectedFiles"
                            color="primary"
                            class="my-2 white--text"
                            @click="downloadAllFiles"
                            width="100%"
                            large
                            >
                            Download
                            <v-icon
                                right
                                dark
                            >
                                mdi-cloud-download
                            </v-icon>
                            </v-btn>

                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </div>
    
</template>

<script>

import JsZip from "jszip"
import fileSaver from "file-saver"

export default {
    props: {
        examDataProp: Object,
    },
    data() {
        return {
            loadingAllFiles: false,
            disabledAllFiles: false,
            loadingSelectedFiles: false,
            disabledSelectedFiles: false,
            fileTypes: [
                "Reports (.report)",
                "PDF (.pdf)"
            ],
            students: [...this.examDataProp.examResults],
            examQuestionsData: [],
            zip: null,
            selectedStudents: []
        }
    },
    methods: {
        createZipAllFiles() {
            this.loadingAllFiles = true
            this.disabledAllFiles = true

            let zip = new JsZip()

            let examResultsData = this.examDataProp.examResults
            examResultsData.forEach((examResult) => {

            let fileContent = []
            fileContent.push(`Matrikelnummer: ${examResult.student[0].enrollment_number}\n`)

            const examResultId = examResult._id
            const baseUrl = `https://sleepy-meadow-31578.herokuapp.com/api/students/exam/${examResultId}`;
            this.$http
                .get(baseUrl)
                .then((results) => {
                    this.examQuestionsData = results.data.Data
                    this.examQuestionsData.forEach((examQuestion, index) => {
                        const line1 = `Frage: (${examQuestion.question_type}) ${index+1}) ${examQuestion.question} [${examQuestion.maximum_points}]\n`
                        const line2 = `Korrekte Anwort:${examQuestion.correct_answer}\n`
                        const line3 = `Ihre Anwort:${examQuestion.given_answer}\n`
                        const line4 = `Punkte: ${examQuestion.scored_points}/${examQuestion.maximum_points}\n`
                        fileContent.push(line1)
                        fileContent.push(line2)
                        fileContent.push(line3)
                        fileContent.push(line4)
                    })
                    const blob = new Blob(fileContent, {type : 'text/plain'});
                    const filename = `${examResult.student[0].enrollment_number}.report`
                    zip.file(filename ,blob)
                    console.log("Data saved")
                    this.loadingAllFiles = false
                    this.disabledAllFiles = false
                })
            })
            this.zip = zip
        },
        createZipSelectedFiles() {
            console.log("Selected students - ", this.selectedStudents)
            this.loadingSelectedFiles = true
            this.disabledSelectedFiles = true

            let zip = new JsZip()

            let examResultsData = this.examDataProp.examResults.filter(result => this.selectedStudents.includes(result.student[0].enrollment_number))
            examResultsData.forEach((examResult) => {

            let fileContent = []
            fileContent.push(`Matrikelnummer: ${examResult.student[0].enrollment_number}\n`)

            const examResultId = examResult._id
            const baseUrl = `https://sleepy-meadow-31578.herokuapp.com/api/students/exam/${examResultId}`;
            this.$http
                .get(baseUrl)
                .then((results) => {
                    this.examQuestionsData = results.data.Data
                    this.examQuestionsData.forEach((examQuestion, index) => {
                        const line1 = `Frage: (${examQuestion.question_type}) ${index+1}) ${examQuestion.question} [${examQuestion.maximum_points}]\n`
                        const line2 = `Korrekte Anwort:${examQuestion.correct_answer}\n`
                        const line3 = `Ihre Anwort:${examQuestion.given_answer}\n`
                        const line4 = `Punkte: ${examQuestion.scored_points}/${examQuestion.maximum_points}\n`
                        fileContent.push(line1)
                        fileContent.push(line2)
                        fileContent.push(line3)
                        fileContent.push(line4)
                    })
                    const blob = new Blob(fileContent, {type : 'text/plain'});
                    const filename = `${examResult.student[0].enrollment_number}.report`
                    zip.file(filename ,blob)
                    console.log("Data saved")
                    this.loadingSelectedFiles = false
                    this.disabledSelectedFiles = false
                })
            })
            this.zip = zip
        },
        downloadAllFiles() {

            if(this.zip != null) {
                const fileName = this.examDataProp.semester.name + "_" + this.examDataProp.course.name 
                this.zip.generateAsync({type:"blob"}).then(function (blob) { 
                    console.log("Downloading....")
                    fileSaver.saveAs(blob, `${fileName}.zip`)
                })
            } else {
                console.log("No files created")
            }
        }
    }
}
</script>