export default {
    methods: {
        gradeCalculation(){

            const maxPoints = this.examData.maxPoints
            const passingPoints = this.examData.passingPoints
            
            this.examData.examResults.map(examResult => {
                let scoredPoints = examResult.scored_points
                examResult.pointer = ((maxPoints - scoredPoints) * 3 / (maxPoints - passingPoints)) + 1
                
                examResult.pointer = Math.round(examResult.pointer * 10) / 10

                if(examResult.pointer >= 1 && examResult.pointer <= 1.5) {
                    examResult.grade = "vg"
                    examResult.status = "pass"
                } else if(examResult.pointer >= 1.51 && examResult.pointer <= 2.5) {
                    examResult.grade = "gu"
                    examResult.status = "pass"
                } else if(examResult.pointer >= 2.51 && examResult.pointer <= 3.5) {
                    examResult.grade = "sa"
                    examResult.status = "pass"
                } else if(examResult.pointer >= 3.51 && examResult.pointer <= 4) {
                    examResult.grade = "su"
                    examResult.status = "pass"
                } else {
                    examResult.pointer = 5.0
                    examResult.grade = "in"
                    examResult.status = "fail"
                }
            })
        }
    }
}
