<template>
  <div>
    <NavBar />
    <router-view />
  </div>
</template>

<script>
import NavBar from "../components/common/NavBar.vue";
export default {
  name: "Dashboard-Page",
  components: {
    NavBar,
  },
};
</script>

<style scoped>
</style>