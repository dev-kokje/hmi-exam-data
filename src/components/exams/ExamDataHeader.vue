<template>
    <v-row class="">
        <v-col class="d-flex" xs="12" md="4">
            <h1>Exam Data</h1>
        </v-col>
        <v-col class="d-flex" xs="12" md="1">
            <v-select
                :items="semesters"
                label="Semester"
                ></v-select>
        </v-col>
        <v-col class="d-flex" sm="12" md="3">
            <v-select
                :items="items"
                label="Course"
                ></v-select>
        </v-col>
        <v-col class="d-flex" sm="12" md="2">
            <v-select
                :items="exams"
                label="Exam"
                ></v-select>
        </v-col>
        <v-col class="d-flex justify-center" sm="12" md="2">
            <v-btn
                large
                depressed
                color="primary"
                outlined
                >
                <v-icon class="px-2" dark>
                    mdi-cloud-upload
                </v-icon>
                Add New File
            </v-btn>
        </v-col>
    </v-row>
</template>

<script>
export default {
    data: () => ({
        semesters: ["WS21/22", "SS21/22", "WS22/23"],
        items: ["HMI - Human Machine Interaction", "MobSys - Mobile Systems", "CI - Computational Intelligence"],
        exams: ["Exam 1", "Exam 2", "Exam 3"]
    }),
}
</script>