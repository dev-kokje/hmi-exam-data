<template>
    <div>
        <h4>{{ $t('examData.sideBar.status_title') }}</h4>
        <v-btn-toggle
            v-model="status"
            color="primary"
            class="my-4"
        >
            <v-btn small value="left">
                {{ $t('examData.sideBar.statuses.all') }}
            </v-btn>

            <v-btn small value="center">
                {{ $t('examData.sideBar.statuses.pass') }}
            </v-btn>

            <v-btn small value="right">
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
            v-model="message1"
            :label="$t('examData.sideBar.search_specific')"
            clearable
            outlined
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
    data: () => ({
        status: "left",
        gradeSelect: [
            'Very Good (1 - 1.5)',
            'Good (1.51 - 2.5)',
            'Satisfactory (2.51 - 3.5)',
            'Sufficient (3.51 - 4)',
            'Insufficient (4.01 - 5)'
        ],
        selectedItem: 1,
        matriculationNos: [
            '313931',
            '313932',
            '313933',
            '313934',
            '313935',
            '313936',
            '313937',
            '313938',
            '313939',
            '313940',
        ]
    }),
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