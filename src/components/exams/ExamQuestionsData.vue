<template>
    <div>
        
        <div v-if="showContentTop">
            <v-row class="">
                <v-col md="2" class="pb-0">
                    <h3> {{ $t('examData.resultDetails.title') }} </h3>
                </v-col>

                <v-col md="2" class="pb-0">
                    <p> {{ $t('examData.resultDetails.semester') }}: 
                        <span class="font-weight-bold"> {{ semesterString }} </span>
                    </p>
                </v-col>

                <v-col md="4" class="pb-0">
                    <p> {{ $t('examData.resultDetails.course') }}: 
                        <span class="font-weight-bold"> {{ courseString }} </span>
                    </p>
                </v-col>

                <v-col md="3" class="pb-0">
                    <p> {{ $t('examData.resultDetails.enrollment_number') }}: 
                        <span class="font-weight-bold"> {{ enrollmentNumber }} </span>
                    </p>
                </v-col>
            </v-row>

            <v-row class="pb-2">
                <v-col md="2">
                    <ResultDetailsCard 
                        :title="$t('examData.resultDetails.chips.total_questions')"
                        :count="totalQuestions"
                        type="neutral"
                    />
                </v-col>

                <v-col md="2">
                    <ResultDetailsCard 
                        :title="$t('examData.resultDetails.chips.correct')"
                        :count="correctAns"
                        type="neutral"
                    />
                </v-col>

                <v-col md="2">
                    <ResultDetailsCard 
                        :title="$t('examData.resultDetails.chips.incorrect')"
                        :count="incorrectAns"
                        type="neutral"
                    />
                </v-col>

                <v-col md="2">
                    <ResultDetailsCard 
                        :title="$t('examData.resultDetails.chips.score')"
                        :count="displayScore"
                        type="neutral"
                    />
                </v-col>

                <v-col md="2">
                    <ResultDetailsCard 
                        :title="$t('examData.resultDetails.chips.pointer')"
                        :count="pointer"
                        type="neutral"
                    />
                </v-col>

                <v-col md="2">
                    <ResultDetailsCard 
                        :title="$t('examData.resultDetails.chips.result')"
                        :count="resultStatus"
                        type="neutral"
                    />
                </v-col>
            </v-row>

            <v-divider></v-divider>
        </div>
        <div v-else>
            <v-row class="pa-5">
                <h5>Please select course to display content</h5>
            </v-row>
        </div>

        <div  v-if="showContentQuestions">
            <v-row>
                <v-col md="12">
                    <p class="mt-2 mb-0">Questions</p>
                </v-col>
            </v-row>

            <v-row>
                <v-col md="12" class="questions-sheet">
                    <QuestionCard
                        v-for="qus in questions"
                        :key="qus.number"
                        :questionData="qus"
                    ></QuestionCard>
                </v-col>
            </v-row>
        </div>
        <div v-else-if="showContentTop">
            <v-row class="pa-5">
                <h5>Please select student enrollment number to display content</h5>
            </v-row>
        </div>

    </div>    
</template>

<script>

import ResultDetailsCard from './components/ResultDetailsCard.vue'
import QuestionCard from './components/QuestionCard.vue'

export default {
    components: { ResultDetailsCard, QuestionCard },
    props: {
        examData: Object,
        selectedExamResultData: Object,
        semesterString: String,
        courseString: String
    },
    watch: {
        examData: function(newVal, oldVal) {
            oldVal
            if(newVal === null) {
                this.totalQuestions = "0"
                this.maxPoints = "0"
                this.showContentTop = false
            } else {
                this.totalQuestions = newVal.total_questions,
                this.maxPoints = newVal.maximum_points
                this.enrollmentNumber = newVal.enrollment_number
                this.showContentTop = true
            }
        },

        selectedExamResultData: function(newVal, oldVal) {
            oldVal
            if(newVal === null) {
                this.correctAns = "0"
                this.scoredPoints = "0"
                this.pointer = "0"
                this.resultStatus = "NA"
                this.incorrectAns="0"
                this.enrollmentNumber = ""
                this.showContentQuestions = false
            } else {
                this.correctAns = newVal.correct_answers
                this.scoredPoints = newVal.scored_points
                this.pointer = newVal.pointer
                this.resultStatus = newVal.status
                this.incorrectAns = (parseInt(this.totalQuestions) - parseInt(newVal.correct_answers)).toString()
                this.enrollmentNumber = newVal.enrollment_number
                this.showContentQuestions = true
            }
        }
    },
    computed: {
        displayScore() {
            return this.scoredPoints.concat("/").concat(this.maxPoints) 
        }
    },
    data: () => ({
        showContentTop: false,
        showContentQuestions: false,
        enrollmentNumber: "",
        correctAns: "0",
        scoredPoints: "0",
        pointer: "0",
        resultStatus: "NA",
        totalQuestions: "0",
        maxPoints: "0",
        incorrectAns: "0",
        questions: [
            {
                number: 1,
                question: "Das Projektbudget für ein 10-Monate-Projekt beträgt 1.000.000€ (PK, geplante Kosten). Es war geplant, dass jeden Monat jeweils genau 10% der Arbeiten abgeschlossen werden. Nach fünf Monaten repräsentieren die abgeschlossenen Arbeit 40% des Gesamtumfangs aller Arbeiten. Wie hoch ist der Fertigstellungswert zu diesem Zeitpunkt?",
                type: "SA",
                correctAnswer: "400000€",
                givenAnswer: "400000€",
                maxPoints: 1,
                points: 1,
                right: true
            },
            {
                number: 2,
                question: "Das Projektbudget für ein 12-Monate-Projekt beträgt 1.200.000€ (PK, geplante Kosten). Die Kosten verteilen sich gleichmäßig über den gesamten Zeitraum. Nach sechs Monaten repräsentieren die abgeschlossenen Arbeit 60% des Gesamtumfangs aller Arbeiten. Die bis dahin angefallenen Kosten betragen 400.000€. Berechnen Sie den Kostenleistungsindex (KLI/CPI).",
                type: "SA",
                correctAnswer: "1,8",
                givenAnswer: "",
                maxPoints: 2,
                points: 0,
                right: false
            },
            {
                number: 3,
                question: "Die PMO-Datenbank weist für eine bestimmte Aktivität folgende Kostenschätzungen aus: optimistisch: 100€, wahrscheinlich: 250€, pessimistisch: 400€. Welchen Kostenansatz liefert die parametrische Schätzung nach der Beta-Verteilung.",
                type: "SA",
                correctAnswer: "250€",
                givenAnswer: "250€",
                maxPoints: 2,
                points: 2,
                right: true
            },
            {
                number: 4,
                question: "Welche Aussagen zum Kritischen Pfad sind nicht richtig?",
                type: "PM",
                correctAnswer: "Der Kritische Pfad zeigt die Dauer an, die das Projekt höchstens haben wird.;Der freie Puffer einer einzelnen Aktivität auf dem Kritischen Pfad kann größer als null sein.",
                givenAnswer: "Der Kritische Pfad zeigt die Dauer an, die das Projekt höchstens haben wird.; Der Kritische Pfad ist der längste aller Pfade durch ein Projekt.",
                maxPoints: 2,
                points: 0,
                right: false
            }
        ]
    })
}
</script>

<style scoped>
 .questions-sheet {
    max-height: 65vh;
    overflow-y: scroll;
    scrollbar-width: thin;
    scrollbar-color: #2196F3;
 }

</style>