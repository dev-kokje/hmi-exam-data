<template>
  <v-card elevation="7" outlined :class="classes">
    <v-card-text>
      <h4 class="font-weight-bold">{{ title }}</h4>
      <h2 class="display-1">{{ count }}</h2>
    </v-card-text>
  </v-card>
</template>

<script>
/* eslint-disable vue/multi-word-component-names */
export default {
  name: "Tile",
  props: {
    title: String,
    count: String,
    type: String,
  },
  computed: {
    classes() {
      return this.type;
    },
  },
};
</script>


<style scoped>
.neutral {
  border-left: 2px solid #2590fc;
  background: linear-gradient(270deg, #2590fc, #4448ad3d);
}

.fail {
  border-left: 2px solid #ff7a7a;
  background: linear-gradient(270deg, #ff7a7a, #ef101073);
}

.pass {
  border-left: 2px solid #17af394d;
  background: linear-gradient(270deg, #009688, #17af394d);
}
</style>