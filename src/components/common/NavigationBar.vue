<template>
    <v-app-bar
        elevation="4"
        flat
        outlined
        dark
        max-height="65px"
        class="my-app-bar"
        >

        <v-icon large class="mr-4">
            mdi-domain
        </v-icon>

        <v-app-bar-title>HMI EARS </v-app-bar-title>

        <v-spacer></v-spacer>

        <v-btn
            color="primary"
            elevation="2">
            Logout
        </v-btn>

    </v-app-bar> 
</template>

<script>
export default {
    components: {  },
    data() {
        return {
            showDrawer: true
        }
    },
    methods: {
        toggleShowDrawer() {
            this.showDrawer = !this.showDrawer
            console.log(this.showDrawer) 
        }
    }
}
</script>

<style scoped>
.my-app-bar {
    border-bottom: 1px solid #aaa;
}

</style>