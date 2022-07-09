<template>
    
    <div>

        <!-- <v-alert
            type="info"
            elevation="2"
            dense
            outlined
            >
            {{ $t('examData.resultDetails.infomessage') }}
        </v-alert> -->

        <v-row class="pb-4">
            <v-col md="12">
                <v-simple-table
                    fixed-header
                    class="exam-table"
                >
                    <template v-slot:default>
                    <thead>
                        <tr>
                            <th class="text-left border-right">
                                Semester
                            </th>
                            <th class="text-left border-right">
                                Course
                            </th>
                            <th class="text-left border-right">
                                Maximum Points
                            </th>
                            <th class="text-left border-right">
                                Passing Points
                            </th>
                            <th class="text-left">
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="border-right font-big">SS21</td>
                            <td class="border-right font-big">HMI - Human Machine Interaction</td>
                            <td class="border-right font-big">100</td>
                            <td class="border-right font-big">50</td>
                            <td class="text-center">
                                <v-btn
                                    color="primary"
                                    small
                                    >
                                        edit
                                    </v-btn>
                            </td>
                        </tr>
                    </tbody>
                    </template>
                </v-simple-table>
            </v-col>
        </v-row>

        <v-divider></v-divider>

        <v-row class="py-4">
            <v-col xl="4" lg="4" md="6" sm="12" xs="12" cols="12">
                <PointerDistribution :baseMark="50" />
            </v-col>
            <v-col xl="4" lg="4" md="6" sm="12" xs="12" cols="12">
                <StudentDistribution :baseMark="50" />
            </v-col>
        </v-row>

    </div>

</template>

<script>
import PointerDistribution from './components/PointerDistribution.vue';
import StudentDistribution from './components/StudentDistribution.vue';
export default {
    components : {
        PointerDistribution,
        StudentDistribution,
    }
}
</script>

<style scoped>
    .exam-table {
        border: 1px solid #aaa;
    }
    .border-right {
        border-right: 1px solid #ddd;
    }
    .font-big {
        font-size: 16px !important;
    }
</style>