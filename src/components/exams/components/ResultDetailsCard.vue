<template>
    <v-card
        outlined
        :class="classes">
        
        <v-card-text>
            <h5> {{ title }} </h5>
            <h2> {{ count }} </h2>
        </v-card-text>

    </v-card>
</template>

<script>
export default {
    props: {
        title: String,
        count: String,
        type: String
    },
    computed: {
        classes() {
            let my_class = "" + this.type
            return my_class
        }
    }
}
</script>

<style scoped>

.neutral {
    border-bottom: 2px solid #2590fc;
}

.fail {
    border-bottom: 2px solid #ff7a7a;
}

.pass {
    border-bottom: 2px solid #67f74b;
}

</style>