<template>
    <v-navigation-drawer
      absolute
      dark
      v-model="drawer"
      class="mt-15 navigation-drawer"
    >
      test
    </v-navigation-drawer> 
</template>

<script>
export default {
    props: {
        showDrawer: Boolean
    },
    data() {
        return {
            drawer: this.showDrawer
        }
    }
}
</script>

<style scoped>

.navigation-drawer {
    z-index: 800;
}

</style>