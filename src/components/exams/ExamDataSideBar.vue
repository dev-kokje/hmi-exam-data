<template>
    <div>
        <h4>Status</h4>
        <v-btn-toggle
            v-model="status"
            color="primary"
            class="my-4"
        >
            <v-btn value="left">
            ALL
            </v-btn>

            <v-btn value="center">
            Pass
            </v-btn>

            <v-btn value="right">
            Fail
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
                    ></v-checkbox>
            </v-flex>
        </v-layout>
        
        <v-divider></v-divider>

        <v-text-field
            v-model="message1"
            label="Search Specific"
            clearable
            outlined
        ></v-text-field>
    </div>
</template>

<script>
export default {
    data: () => ({
        status: "left",
        grades: [
            'Very Good (1 - 1.5)',
            'Good (1.51 - 2.5)',
            'Satisfactory (2.51 - 3.5)',
            'Sufficient (3.51 - 4)',
            'Insufficient (4.01 - 5)'
        ],
        gradeSelect: [
            'Very Good (1 - 1.5)',
            'Good (1.51 - 2.5)',
            'Satisfactory (2.51 - 3.5)',
            'Sufficient (3.51 - 4)',
            'Insufficient (4.01 - 5)'
        ]
    })
}
</script>