<template>
    <div class="pa-5 mt-5">
        <v-switch
            v-model="$vuetify.theme.dark"
            label="Dark Theme"
        ></v-switch>
    </div>
</template>

<script>
export default {
    methods: {
     toggleTheme() {
        this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
    }
    }
}
</script>