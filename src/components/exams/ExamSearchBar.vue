<template>
    <v-row class="pt-0 pb-1">

        <v-col md="6" align-self="center" class="px-4">
            <h2> {{ $t('examData.topBar.title') }} </h2>
        </v-col>

        <v-col md="2" align-self="center">
            <v-select 
                v-model="semester" 
                :items="semestersList" 
                item-text="name"
                item-value="_id"
                :label="$t('examData.topBar.semester')"
                @change="fetchCoursesForSemester">
                </v-select>
        </v-col>

        <v-col md="3" align-self="center">
            <v-select v-model="course" 
                :items="coursesList" 
                item-text="displayName"
                item-value="_id"
                :error="courseError"
                :hint="courseHint"
                persistent-hint
                :label="$t('examData.topBar.course')"></v-select>
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
        ],
        coursesList: [
        ],
        semester: "",
        course: "",
        courseError: false,
        courseHint: ""
    }),
    methods: {
        searchCourseData() {
            this.$emit("examData", {
                semester: this.semestersList.find(sem => sem._id === this.semester),
                course: this.coursesList.find(cor => cor._id === this.course)
            })
        },
        fetchCoursesForSemester() {
            let semesterId = this.semester
            const baseUrl = `https://sleepy-meadow-31578.herokuapp.com/api/sem-subjects/${semesterId}`
            this.$http
                .get(baseUrl)
                .then((results) => {
                    this.coursesList = results.data.Data
                    if(this.coursesList.length == 0) {
                        this.courseError = true
                        this.courseHint = "No course data available for the selected semester"
                    } else {
                        this.courseError = false
                        this.courseHint = ""
                    }
                    this.coursesList.map((course) => {
                        course.displayName = course.code + " - " + course.name
                    })
                })
        }
    },
    mounted() {
        const baseUrl = "https://sleepy-meadow-31578.herokuapp.com/api/sem"
        this.$http
            .get(baseUrl)
            .then((results) => {
                this.semestersList = results.data.Data
            })
    }
}
</script>