<template>
    <v-card 
        outlined
        :class="classes"
        elevation="2">
        <v-card-text>
            <v-row>
                <v-col md="1" class="d-flex flex-column align-center">
                    <h2>Q.{{ qus.number }}</h2>
                    <v-chip
                        class="ma-2 my-4"
                        :color="questionType"
                        label
                        text-color="white"
                        >
                            {{ qus.type }}
                    </v-chip>
                    Points:
                    <v-text-field
                        v-model="points"
                        outlined
                        dense
                        class="my-1 pa-0 edit-point"
                        :suffix="'/'.concat(qus.maxPoints)"
                        v-if="editPoints"
                        @focusout="changePoints"
                    ></v-text-field>
                    <v-chip
                        outlined
                        class="ma-2"
                        color=""
                        label
                        v-else
                        @click="changePoints"
                        >
                            {{ qus.points }}/{{ qus.maxPoints }}
                    </v-chip>
                </v-col>
                <v-divider
                    vertical></v-divider>
                <v-col md="11">
                    <v-row>
                        <v-col md="12">
                            <p>
                                {{ qus.question }}
                            </p>
                            <p>
                                <span class="green-text">Correct Answer</span> 
                                - {{ qus.correctAnswer }}</p>
                            <p>
                                <span class="blue-text">Given Answer</span>
                                 - {{ qus.givenAnswer }}</p>
                        </v-col>
                    </v-row>
                    
                </v-col>
            </v-row>
        </v-card-text>
    </v-card>
</template>

<script>
export default {
    data: () => ({
        editPoints: false,
        points: 0
    }),
    props: {
        correctAns: Boolean,
        questionData: Object
    },
    watch: {
        questionData: function(oldVal, newVal) {
            oldVal
            console.output(oldVal)
            console.output(newVal)
            this.points = newVal.points
        }
    },
    computed: {
        classes() {
            let cls = this.questionData.right===true ? "green-background" : "red-background"
            return cls + " my-2"
        },
        qus() {
            console.log(this.questionData)
            return this.questionData
        },
        questionType() {
            let type = this.questionData.type
            if(type === "SA") {
                return "pink"
            } else {
                return "warning"
            }
        }
    },
    methods: {
        changePoints() {
            this.editPoints = !this.editPoints
        }
    }
}
</script>

<style scoped>
    .blue-text {
        color: orangered
    }
    .green-text {
        color: green
    }
    .red-background {
        background-color: #fde8e8;
    }
    .green-background {
        background-color: #e9f9e6;
    }
    .edit-point {
        max-width: 60px;
        text-align: center;
    }
</style>