<template>
    <v-app>
      <NavigationBar />
      <v-main>
        <ExamsData />
      </v-main>
    </v-app>
</template>



<script>
import NavigationBar from '../components/common/NavigationBar.vue';
import ExamsData from '../components/exams/ExamsData.vue';

export default {
    name: "Exam-Data",
    components: { NavigationBar, ExamsData },
    data: () => ({
    //
    })
};
</script>

<style>

</style>
