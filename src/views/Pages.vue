<template>
  <div>
    <NavBar />
    <div class="mx-4">
      <router-view />
    </div>
  </div>
</template>

<script>
/* eslint-disable vue/multi-word-component-names */
import NavBar from "../components/common/NavBar.vue";
export default {
  name: "Pages",
  components: {
    NavBar,
  },
};
</script>

<style scoped>
</style>