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
                            ></v-radio>
                        </v-radio-group>

                        <v-btn
                            :loading="loading3"
                            :disabled="disabled"
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
                            class="mt-5"
                            :items="students"
                            item-text="student_id"
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
                            ></v-radio>
                        </v-radio-group>

                        <v-btn
                            :loading="loading3"
                            :disabled="disabled"
                            color="primary"
                            class="my-2 white--text"
                            @click="loader = 'loading3'"
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
    export default {
        props: {
            examDataProp: Object
        },
        data() {
            return {
                loading3: false,
                disabled: false,
                fileTypes: [
                    "Reports (.report)",
                    "PDF (.pdf)",
                    "Excel (.xlsx)"
                ],
                students: [...this.examDataProp.examResults],
                examQuestionsData: []
            }
        },
        methods: {
            showData() {
                console.log("Downloads Data - ", JSON.stringify(this.examDataProp))
                console.log("Downloads Exam Result Data - ", this.students)
            },
            downloadAllFiles() {

                let fileData = []
                fileData.push(`Matrikelnummer: ${JSON.stringify(this.examDataProp)}`)

                let fetchDataPromise = new Promise(function(myResolve, myReject) {      

                    let files = []

                    let examResultsData = this.examDataProp.examResults
                    examResultsData.forEach((examResult) => {

                        let fileContent = []
                        fileContent.push(`Matrikelnummer: ${JSON.stringify(examResult.student_id)}`)

                        const examResultId = examResult._id
                        const baseUrl = `https://sleepy-meadow-31578.herokuapp.com/api/students/exam/${examResultId}`;
                        console.log("Downloads Request made to ", baseUrl)
                        this.$http
                            .get(baseUrl)
                            .then((results) => {
                                this.examQuestionsData = results.data.Data
                                this.examQuestionsData.forEach((examQuestion, index) => {
                                    const line1 = `Frage: (${JSON.stringify(examQuestion.type)}) ${index+1}) ${examQuestion.question} [${examQuestion.maximum_points}]`
                                    const line2 = `Korrekte Anwort:${examQuestion.correct_answer}`
                                    const line3 = `Ihre Anwort:${examQuestion.given_answer}`
                                    const line4 = `Punkte: ${examQuestion.scored_points}/${examQuestion.maximum_points}`
                                    fileContent.push(line1)
                                    fileContent.push(line2)
                                    fileContent.push(line3)
                                    fileContent.push(line4)
                                })
                                const blob = new Blob(fileContent, {type : 'text/html'});
                                files.push(blob)
                            })
                    })

                    if(files.length > 0) {
                        myResolve("Success")
                    } else {
                        myReject("Failure")
                    }
                })

                fetchDataPromise.then(

                ).error(

                )
                
                
                // const link = document.createElement('a')
                // link.href = URL.createObjectURL(blob);
                // link.download = "test";
                // link.click();
                // URL.revokeObjectURL(link.href);
            }
        }
    }
</script>