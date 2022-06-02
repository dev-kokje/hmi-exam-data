<template>
    <div>
        <h4>Status</h4>
        <v-btn-toggle
            v-model="status"
            tile
            group
            color="deep-purple accent-3"
            shaped
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
        
        <v-select
            v-model="gradeSelect"
            :items="ticksLabels"
            multiple
            chips
            persistent-hint
            small-chips
            ></v-select>

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
        ticksLabels: [
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