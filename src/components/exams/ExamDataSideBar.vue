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
                    v-for="(examResult, i) in examData.examResults"
                    :key="i"
                    :value="examResult._id"
                >
                    <v-list-item-content>
                        <v-list-item-title 
                            v-text="examResult.student_id"></v-list-item-title>
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
                'Very Good (1 - 1.5)',
                'Good (1.51 - 2.5)',
                'Satisfactory (2.51 - 3.5)',
                'Sufficient (3.51 - 4)',
                'Insufficient (4.01 - 5)'
            ],
            selectedItem: 1,
            filterStudent: "",
            examData: {...this.examDataProp}
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
        }
    },
    methods: {
        updateExamData() {
            console.log("Filter updated ", this.status)
            this.examData.examResults = this.examDataProp.examResults.filter(exam => {
                exam.status === this.status.toLowerCase()
            })
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