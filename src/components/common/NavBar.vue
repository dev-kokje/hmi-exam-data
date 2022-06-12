<template>
  <nav>
    <v-toolbar flat text>
      <v-app-bar-nav-icon @click="toggleMenu()"></v-app-bar-nav-icon>
      <!-- <v-toolbar-title class="text-capitalise grey--text">
          Hello
      </v-toolbar-title> -->

      <v-spacer></v-spacer>

      <v-btn text dark color="teal" router to="/">
        <span>Sign Out</span>
        <v-icon right> mdi-logout </v-icon>
      </v-btn>

      <LanguageSwitcher />
    </v-toolbar>

    <v-navigation-drawer v-model="drawer" text class="teal" app>
      <!-- https://pictogrammers.github.io/@mdi/font/1.1.34/ -->
      <!-- logo -->
      <div class="text-center my-7">
        <v-icon class="white-text logo" size="80">
          mdi-image-filter-tilt-shift
        </v-icon>
      </div>

      <v-divider></v-divider>

      <!-- side menus -->
      <v-list class="my-3">
        <v-list-item
          v-for="link in links"
          :key="link.text"
          route
          :to="link.route"
        >
          <v-list-item-action>
            <v-icon class="white-text">{{ link.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title class="white--text">
              {{ link.text }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>

<script>
import LanguageSwitcher from './LanguageSwitcher.vue';
export default {
    name: "NavBar",
    data() {
        return {
            drawer: false,
            links: [
                {
                    icon: "mdi-view-dashboard",
                    text: "Dashboard",
                    route: "/pages/dashboard",
                },
                {
                    icon: "mdi-book-open",
                    text: "Exam Data",
                    route: "/pages/exam-data",
                },
            ],
        };
    },
    methods: {
        toggleMenu() {
            this.drawer = !this.drawer;
        },
    },
    components: { LanguageSwitcher }
};
</script>

<style scoped>
</style>