<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center" class="h-100">
      <v-col cols="12" sm="8" md="8">
        <v-card class="elevation-12">
          <v-window v-model="step">
            <v-window-item :value="1">
              <v-row class="fill-height">
                <!-- SIGNIN FORM -->
                <v-col cols="12" md="8">
                  <v-card-text class="mt-12">
                      <!-- header -->
                    <h1
                      class="
                        text-center
                        display-2
                        teal--text
                        text-accent-3 text-3xl
                        font-bold
                      "
                    >
                      Sign in to EARS
                    </h1>
                    <!-- icons -->
                    <div class="text-center my-4">
                      <v-btn
                        class="mx-2"
                        fab
                        outlined
                        @click="navigateToDashboard()"
                      >
                        <i class="fa-brands fa-facebook fa-lg"></i>
                      </v-btn>
                      <v-btn
                        class="mx-2"
                        fab
                        outlined
                        @click="navigateToDashboard()"
                      >
                        <i class="fa-brands fa-google fa-lg"></i>
                      </v-btn>
                      <v-btn
                        class="mx-2"
                        fab
                        outlined
                        @click="navigateToDashboard()"
                      >
                        <i class="fa-brands fa-linkedin fa-lg"></i>
                      </v-btn>
                    </div>
                    <!-- subheading -->
                    <h4 class="text-center text-md my-3">
                      Ensure your email for registration
                    </h4>
                    <!-- login form -->
                    <v-form>
                      <v-text-field
                        label="Email"
                        name="Email"
                        prepend-inner-icon="mdi-email"
                        type="email"
                        color="teal accent-3"
                        solo
                        required
                      />

                      <v-text-field
                        label="Password"
                        name="Password"
                        prepend-inner-icon="mdi-lock"
                        type="password"
                        color="teal accent-3"
                        solo
                        required
                      />
                    </v-form>

                    <h3 class="text-center mt-3">Forgot your password ?</h3>
                    <!-- submit btn -->
                    <div class="text-center my-3">
                      <v-btn
                        rounded
                        color="teal"
                        dark
                        @click="navigateToDashboard()"
                      >
                        SIGN IN
                      </v-btn>
                    </div>
                  </v-card-text>
                </v-col>
                <!-- SWITCH VIEW -->
                <v-col
                  cols="12"
                  md="4"
                  color="bg-teal accent-3"
                  class="bg-teal"
                >
                  <v-card-text class="white--text mt-12">
                    <h1 class="text-center display-1 mb-3 font-bold">
                      Hello, Friends!
                    </h1>
                    <h5 class="text-center font-bold">
                      Enter your personal details and start journey with us!
                    </h5>
                  </v-card-text>

                  <div class="text-center font-bold">
                    <v-btn rounded outlined dark @click="step++">
                      SIGN UP
                    </v-btn>
                  </div>
                </v-col>
              </v-row>
            </v-window-item>

            <v-window-item :value="2">
              <v-row class="fill-height">
                <!-- SWITCH VIEW -->
                <v-col cols="12" md="4" class="bg-teal accent-3">
                  <v-card-text class="white--text mt-12">
                    <h1 class="text-center display-1 mb-3 font-bold">
                      Welcome back!
                    </h1>
                    <h5 class="text-center font-bold">
                      To keep connected with us please log in with your personal
                      info
                    </h5>
                  </v-card-text>

                  <div class="text-center">
                    <v-btn rounded outlined dark @click="step--">
                      SIGN IN
                    </v-btn>
                  </div>
                </v-col>
                <!-- SIGNUP FORM -->
                <v-col cols="12" md="8">
                  <v-card-text class="mt-12">
                      <!-- header -->
                    <h1
                      class="
                        text-center
                        display-2
                        teal--text
                        text-accent-3 text-3xl
                        font-bold
                      "
                    >
                      Create Account
                    </h1>
                    <!-- icons -->
                    <div class="text-center mt-4">
                      <v-btn
                        class="mx-2"
                        fab
                        outlined
                        @click="navigateToDashboard()"
                      >
                        <i class="fa-brands fa-facebook fa-lg"></i>
                      </v-btn>
                      <v-btn
                        class="mx-2"
                        fab
                        outlined
                        @click="navigateToDashboard()"
                      >
                        <i class="fa-brands fa-google fa-lg"></i>
                      </v-btn>
                      <v-btn
                        class="mx-2"
                        fab
                        outlined
                        @click="navigateToDashboard()"
                      >
                        <i class="fa-brands fa-linkedin fa-lg"></i>
                      </v-btn>
                    </div>
                    <!-- subheading -->
                    <h4 class="text-center my-3">
                      Ensure your email for registration
                    </h4>
                    <!-- registration form -->
                    <v-form>
                      <v-text-field
                        label="Name"
                        name="Name"
                        prepend-inner-icon="mdi-account"
                        type="text"
                        color="teal accent-3"
                        solo
                      />

                      <v-text-field
                        label="Email"
                        name="Email"
                        prepend-inner-icon="mdi-email"
                        type="email"
                        color="teal accent-3"
                        solo
                      />

                      <v-text-field
                        label="Password"
                        name="Password"
                        prepend-inner-icon="mdi-lock"
                        type="password"
                        color="teal accent-3"
                        solo
                      />
                    </v-form>
                    <!-- submit btn -->
                    <div class="text-center my-3">
                      <v-btn
                        rounded
                        color="teal"
                        dark
                        @click="navigateToDashboard()"
                      >
                        SIGN UP
                      </v-btn>
                    </div>

                  </v-card-text>
                </v-col>
              </v-row>
            </v-window-item>
          </v-window>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Login-Page",
  data() {
    return {
      step: 1,
    };
  },
  methods: {
    navigateToDashboard() {
      this.$router.push({ path: "/pages/dashboard" });
    },
  },
};
</script>

<style scoped>
.bg-teal {
    background: #009688;
}
</style>