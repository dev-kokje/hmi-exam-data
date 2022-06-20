<template>
    <div>
        <h4>{{ $t('examData.sideBar.status_title') }}</h4>
        <v-btn-toggle
            v-model="status"
            color="primary"
            class="my-4"
            @change="updateExamData"
        >
            <v-btn small value="All">
                {{ $t('examData.sideBar.statuses.all') }}
            </v-btn>

            <v-btn small value="Pass">
                {{ $t('examData.sideBar.statuses.pass') }}
            </v-btn>

            <v-btn small value="Fail">
                {{ $t('examData.sideBar.statuses.fail') }}
            </v-btn>
        </v-btn-toggle>

        <h4 class="mt-2">Grade</h4>

        <v-layout column wrap class="mb-5">
            <v-flex v-for="grade in grades" v-bind:key="grade">
                <v-checkbox
                    v-model="gradeSelect"
                    :label="grade"
                    color="info"
                    :value="grade"
                    hide-details
                    dense
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
            @click:clear="updateExamData()"
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
                    v-for="(matriculationNo, i) in matriculationNos"
                    :key="i"
                >
                <v-list-item-content>
                    <v-list-item-title v-text="matriculationNo"></v-list-item-title>
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
        examDataDetails: Array
    },
    data() {
        return {
            status: "All",
            gradeSelect: [
                'Very Good (1 - 1.5)',
                'Good (1.51 - 2.5)',
                'Satisfactory (2.51 - 3.5)',
                'Sufficient (3.51 - 4)',
                'Insufficient (4.01 - 5)'
            ],
            selectedItem: 1,
            examData: this.examDataDetails,
            filterStudent: ""
        }
    },
    watch: {
        examDataDetails: function(newVal, oldVal) {
            console.log(oldVal)
            this.examData = newVal
            this.updateExamData()
        }
    },
    computed: {
        grades() {
            return (
                [
                    this.$t('examData.sideBar.grades.vg'),
                    this.$t('examData.sideBar.grades.gd'),
                    this.$t('examData.sideBar.grades.sa'),
                    this.$t('examData.sideBar.grades.su'),
                    this.$t('examData.sideBar.grades.in')
                ]
            )
        },
        matriculationNos() {
            let result = this.examData.map(exam => exam.enrollment_number)
            return result
        }
    },
    methods: {
        updateExamData() {
            console.log("Filter updated ", this.status)

            let filterString = this.filterStudent

            if(filterString !== null && filterString!=="") {
                console.log("Filter string provided - ", filterString)
                let result = this.examDataDetails.filter(exam => exam.enrollment_number.includes(filterString))
                this.examData = result
            } else {
                let filterStatus = this.status
                if(filterStatus === "All") {
                    this.examData = this.examDataDetails
                } else {
                    let result = this.examDataDetails.filter(exam => exam.status == filterStatus)
                    this.examData = result
                }
            }
        },

        selectStudent() {
            this.$emit("studentSelect", this.matriculationNos[this.selectedItem])
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