<template>
    <div>
        <v-app-bar
            elevation="4"
            flat
            outlined
            dark
            max-height="65px"
            class="my-app-bar"
            >
        
            <v-app-bar-nav-icon @click="toggleShowDrawer"></v-app-bar-nav-icon>

            <v-app-bar-title>HMI EARS </v-app-bar-title>

            <v-spacer></v-spacer>

            <v-btn
                color="primary"
                elevation="2">
                Logout
            </v-btn>

        </v-app-bar>
        
        <NavigationDrawer :showDrawer="showDrawer" />

    </div>   
</template>

<script>
import NavigationDrawer from './NavigationDrawer.vue';
export default {
    components: { NavigationDrawer },
    data() {
        return {
            showDrawer: false
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
    z-index: 900;
}

</style>