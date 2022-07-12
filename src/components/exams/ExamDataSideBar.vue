<template>
    <div>
        <h4>{{ $t('examData.sideBar.status_title') }}</h4>
        <v-btn-toggle
            v-model="status"
            color="primary"
            class="my-4"
            @change="updateExamData"
        >
            <v-btn small value="all">
                {{ $t('examData.sideBar.statuses.all') }}
            </v-btn>

            <v-btn small value="pass">
                {{ $t('examData.sideBar.statuses.pass') }}
            </v-btn>

            <v-btn small value="fail">
                {{ $t('examData.sideBar.statuses.fail') }}
            </v-btn>
        </v-btn-toggle>

        <h4 class="mt-2">Grade</h4>

        <v-layout column wrap class="mb-5">
            <v-flex v-for="grade in grades" :key="grade.value">

                <v-checkbox
                    v-model="gradeSelect"
                    :label="grade.text"
                    :disabled="grade.disabled"
                    color="info"
                    :value="grade.value"
                    hide-details
                    dense
                    @change="updateExamDataOnGrade"
                    ></v-checkbox>
            </v-flex>
        </v-layout>
        
        <v-divider></v-divider>

        <v-text-field
            v-model="filterStudent"
            :label="$t('examData.sideBar.search_specific')"
            clearable
            outlined
            @keyup="updateExamData"
            @click:clear="clearFilterStudent"
        ></v-text-field>

        <v-card
            class="mx-auto matriculation-nos-card"
            max-width="300"
            elevation="0"
        >
            <v-list dense>
            <v-list-item-group
                v-model="selectedItem"
                color="primary"
                @change="selectStudent"
            >
                <v-list-item
                    v-for="(examResult, i) in filteredExamData.examResults"
                    :key="i"
                    :value="examResult._id"
                >
                    <v-list-item-content>
                        <v-list-item-title 
                            v-text="examResult.student[0].enrollment_number"></v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list-item-group>
            </v-list>
        </v-card>
    </div>
</template>

<script>
export default {
    props: {
        examDataProp: Object
    },
    data() {
        return {
            status: "all",
            gradeSelect: [
                "vg",
                "gd",
                "sa",
                "su",
                "in"
            ],
            selectedItem: 1,
            filterStudent: "",
            examData: {...this.examDataProp},
            filteredExamData: {...this.examDataProp}
        }
    },
    mounted() {
        console.log("Stydent data - ", this.examData)
    },
    computed: {
        grades() {
            return (
                [
                    {
                        text: this.$t('examData.sideBar.grades.vg'),
                        value: "vg",
                        disabled: this.status === "fail"
                    },
                    {
                        text: this.$t('examData.sideBar.grades.gd'),
                        value: "gd",
                        disabled: this.status === "fail"
                    }, 
                    {
                        text: this.$t('examData.sideBar.grades.sa'),
                        value: "sa",
                        disabled: this.status === "fail" 
                    }, 
                    {
                        text: this.$t('examData.sideBar.grades.su'),
                        value: "su",
                        disabled: this.status === "fail" 
                    }, 
                    {
                        text: this.$t('examData.sideBar.grades.in'),
                        value: "in",
                        disabled: this.status === "pass" 
                    }
                ]
            )
        }
    },
    methods: {
        clearFilterStudent() {
            this.filterStudent = ""
            this.updateExamData()
        },
        updateExamDataOnGrade() {
                let examResults = this.examData.examResults
                examResults = examResults.filter(result => this.gradeSelect.includes(result.grade))
                this.filteredExamData.examResults = examResults
        },
        updateExamData() {
            if(this.status == "all") {
                this.gradeSelect = ["vg", "gd", "sa", "su", "in"]
                this.filteredExamData = {...this.examData}
            } else {
                let examResults = this.examData.examResults
                examResults = examResults.filter(result => result.status === this.status)
                this.filteredExamData.examResults = examResults
                if(this.status === "pass") {
                    this.gradeSelect = ["vg", "gd", "sa", "su"]
                } else {
                    this.gradeSelect = ["in"]
                }
            }

            if(this.filterStudent != "") {
                let examResults = this.examData.examResults
                examResults = examResults.filter(result => result.student[0].enrollment_number.toString().includes(this.filterStudent))
                this.filteredExamData.examResults = examResults
            }
        },

        selectStudent() {
            console.log("Selected student id - ", this.selectedItem)
            this.$emit("studentSelect", this.selectedItem)
        }
    }
}
</script>

<style scoped>

.matriculation-nos-card {
    max-height: 370px;
    overflow-y: scroll;
    scrollbar-width: thin;
}

</style>