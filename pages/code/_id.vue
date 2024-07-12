<template>
  <div>
    <v-app-bar v-if="$vuetify.breakpoint.xs" fixed app>
      <v-btn class="pa-0 ma-0" icon @click="$router.push('/')">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
      <v-spacer />
      <v-toolbar-title class="ml-n10">coding</v-toolbar-title>
      <v-spacer />
      <div></div>
    </v-app-bar>
    <!-- app bar for desktop -->
    <LayoutsNavbar v-else />
    <div style="z-index: 15;">
      <CodeCodeInsert />
      <CodeCodeChangeColor @actionChange="colorValue" />
    </div>
    <v-card class="rounded-0" elevation="0">
      <v-row
        class="px-2"
        no-gutters
        v-for="(answer, index) in getPostAnswer"
        :key="index"
      >
        <v-col cols="12" class="my-1 py-0">
          <v-card-title
            class="d-flex justify-center align-center arounded-4"
            dark
          >
            <v-divider></v-divider>
            <div class="d-flex justify-center align-center">
              <v-icon>mdi-arrow-down-thin</v-icon>
              <h2></h2>
              <div v-if="answer?.indexChild" class="animate-charcter py-2">
                {{ answer?.index }} | {{ answer?.indexChild }}
              </div>
              <div v-else class="animate-charcter py-2">
                {{ answer?.index }}
              </div>
              <v-icon>mdi-arrow-down-thin</v-icon>
            </div>
            <v-divider></v-divider>
          </v-card-title>
        </v-col>
        <v-col
          cols="12"
          class="mt-n5 pb-5"
          style="font-size: bold; text-shadow: 1px 1px 1px black"
        >
          {{ answer?.title }}
        </v-col>
        <v-col cols="12" sm="11" md="11" lg="11" xl="11">
          <div>
            <div
              class="mb-2"
              :style="{
                backgroundColor: colorChange,
                color: 'white',
                padding: '10px',
              }"
            >
              <div>
                <div v-html="!showfullcode? answer.description.slice(0, 50) + '...' : answer.description"></div>
           
                <span>
                  <v-btn color="white" text @click="toggleDescription">
                   {{ !showfullcode? "more":"less" }}
                  </v-btn>
                </span>
              </div>
            </div>

            <div v-if="isYouTubeVideo(answer?.v_video)">
              <!-- eslint-disable-next-line vue/no-v-html -->
              <!-- display in desktop -->
              <div v-if="!$vuetify.breakpoint.xs">
                <iframe
                  width="560"
                  height="315"
                  :src="
                    'https://www.youtube.com/embed/' +
                    getYouTubeVideoId(answer?.v_video)
                  "
                  frameborder="0"
                  allowfullscreen
                ></iframe>
              </div>
              <!-- display in mobile -->
              <div
                v-if="$vuetify.breakpoint.xs"
                :style="{
                  position: 'relative',
                  paddingBottom: '56.25%',
                  height: '0',
                  overflow: 'hidden',
                }"
              >
                <iframe
                  :style="{
                    position: 'absolute',
                    top: '0',
                    left: '0',
                    width: '100%',
                    height: '100%',
                  }"
                  :src="
                    'https://www.youtube.com/embed/' +
                    getYouTubeVideoId(answer?.v_video)
                  "
                  frameborder="16"
                ></iframe>
              </div>
            </div>
          </div>
        </v-col>
        <v-col class="mt-1" cols="12">
          <v-card elevation="0" class="d-flex justify-start">
            <CodeCodeDelete :item="answer?.id" />
            <CodeCodeEdit :item="answer" />
          </v-card>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script>
import DOMPurify from "dompurify";

export default {
  name: "ItcSeerLandingBody",
  layout: "report",
  data() {
    return {
      colorChange: "black",
      dialogDelete: false,
      direction: "top",
      fab: false,
      fling: false,
      hover: false,
      tabs: null,
      top: false,
      right: true,
      bottom: true,
      left: false,
      transition: "slide-y-reverse-transition",
      showfullcode: false,
    };
  },
  computed: {
    getPostAnswer() {
      const typeId = this.$route.params.id;
      const videosData = this.$store.state.code.codingData;
      if (typeId) {
        let filteredVideos = videosData.filter(
          (code) => code.typeId === typeId
        );
        let indexChild = 1;
        filteredVideos = filteredVideos.map((item) => {
          return { ...item, indexChild: indexChild++ };
        });

        return filteredVideos;
      } else {
        return videosData;
      }
    },
  },
  mounted() {
    this.$store.dispatch("code/selectAll");
  },
  methods: {
    colorValue(e) {
      this.colorChange = e;
    },
    isYouTubeVideo(url) {
      if (url && typeof url === "string") {
        return url.includes("youtube.com") || url.includes("youtu.be");
      }
      return false;
    },
    getYouTubeVideoId(url) {
      let videoId = "";
      if (url && typeof url === "string") {
        if (url.includes("youtube.com")) {
          if (url.includes("/live/")) {
            // For live stream URLs
            videoId = url.split("/live/")[1].split("?")[0];
          } else {
            // For regular video URLs
            videoId = url.split("v=")[1].split("&")[0];
          }
        } else if (url.includes("youtu.be")) {
          videoId = url.split("/")[3];
        }
      }
      return videoId;
    },
    toggleDescription() {
      this.showfullcode = !this.showfullcode;
    },
    truncatedDescription(description) {
      if (description.length > 35) {
        return description.slice(0, 35) + "...";
      } else {
        return description;
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.font-size {
  font-size: 15px;
}

.pointer {
  cursor: pointer;
}
.youtubeSize {
  height: 315;
  width: 560;
}
.animate-charcter {
  text-transform: uppercase;
  background-image: linear-gradient(
    -235deg,
    #3700ff 0%,
    #03611f 29%,
    #ff1361 67%,
    #fff800 100%
  );
  background-size: auto auto;
  background-clip: border-box;
  background-size: 200% auto;
  color: #fff;
  background-clip: text;
  text-fill-color: transparent;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: textclip 3s linear infinite;
  display: inline-block;
  font-size: 35px;
  font-weight: bold;
}

@keyframes textclip {
  to {
    background-position: 100% center;
  }
}
</style>
