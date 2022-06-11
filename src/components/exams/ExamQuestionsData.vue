<template>
    <div>
        Result Details - Matrikelnummer 98574
        <v-row class="py-2">
            <v-col md="2">
                <ResultDetailsCard 
                    title="Total Questions"
                    count="50"
                    type="neutral"
                />
            </v-col>

            <v-col md="2">
                <ResultDetailsCard 
                    title="Correct"
                    count="30"
                    type="neutral"
                />
            </v-col>

            <v-col md="2">
                <ResultDetailsCard 
                    title="Incorrect"
                    count="20"
                    type="neutral"
                />
            </v-col>

            <v-col md="2">
                <ResultDetailsCard 
                    title="Score"
                    count="60/100"
                    type="neutral"
                />
            </v-col>

            <v-col md="2">
                <ResultDetailsCard 
                    title="Pointer"
                    count="3.7"
                    type="neutral"
                />
            </v-col>

            <v-col md="2">
                <ResultDetailsCard 
                    title="Result"
                    count="Pass"
                    type="neutral"
                />
            </v-col>
        </v-row>

    <v-divider></v-divider>

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
</template>

<script>

import ResultDetailsCard from './components/ResultDetailsCard.vue'
import QuestionCard from './components/QuestionCard.vue'

export default {
    components: { ResultDetailsCard, QuestionCard },
    data: () => ({
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