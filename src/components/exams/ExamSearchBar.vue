<template>
    <v-row class="pt-0 pb-1">

        <v-col md="6" align-self="center" class="px-4">
            <h2> {{ $t('examData.topBar.title') }} </h2>
        </v-col>

        <v-col md="2" align-self="center">
            <v-select v-model="semester" :items="semestersList" :label="$t('examData.topBar.semester')"></v-select>
        </v-col>

        <v-col md="3" align-self="center">
            <v-select v-model="course" :items="coursesList" :label="$t('examData.topBar.course')"></v-select>
        </v-col>

        <v-col md="1" align-self="center">
            <v-btn outlined color="primary" @click="searchCourseData">
                {{ $t('examData.topBar.search') }}
            </v-btn>
        </v-col>
    </v-row>
</template>

<script>
export default {
    data: () => ({
        semestersList: [
            "SS21",
            "WS21",
            "SS22",
            "WS22"
        ],
        coursesList: [
            "HMI - Human Machine Interaction",
            "3DCC - 3D Content Creation",
            "CI - Computational Intelligence"
        ],
        semester: "",
        course: "",
    }),
    methods: {
        searchCourseData() {
            console.log("Selected semester and course - ", this.semester, this.course)
            this.$emit("examData", {
                semester: this.semester,
                course: this.course
            })
        }
    }
}
</script>