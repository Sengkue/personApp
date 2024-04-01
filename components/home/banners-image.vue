<template>
  <div v-if="getItem?.length > 0">
    <v-col v-if="isLoading" cols="12" sm="12">
      <div class="d-flex justify-center">
        <v-progress-circular
          :size="40"
          :width="5"
          color="teal"
          indeterminate
        ></v-progress-circular>
      </div>
    </v-col>
    <v-carousel
      v-else
      height="100"
      interval="4500"
      cycle
      hide-delimiters
      show-arrows-on-hover
    >
      <v-carousel-item v-for="(item, index) in getItem" :key="index">
        <v-sheet
          :style="{ background: item.backgroundColor, color: item.color }"
          height="100%"
        >
          <v-row class="fill-height" align="center" justify="center">
            <div class="pa-5">
              {{ item?.title }}
            </div>
          </v-row>
        </v-sheet>
      </v-carousel-item>
    </v-carousel>
  </div>
</template>

<script>
export default {
  name: "EcommerceLandingSlideImg",

  data() {
    return {
      isLoading: false,
    };
  },

  computed: {
    getItem() {
      return this.$store.state.slide?.slideData
        ?.map((item, index) => ({
          ...item,
          index: index + 1,
        }))
        .sort((a, b) => b.index - a.index);
    },
  },
  async mounted() {
    this.isLoading = true;
    await this.$store.dispatch("slide/selectAll");
    this.isLoading = false;
  },
};
</script>

<style lang="scss" scoped>
.text-caption {
  text-shadow: 3px 3px 5px rgba(0, 0, 0, 0.5); /* Adjust values as needed */
}
</style>
