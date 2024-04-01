<template>
  <div>
    <h2>Images from Firebase Storage:</h2>
    <v-row class="pa-5">
      <v-card
        v-for="(image, index) in images"
        :key="index"
        cols="4"
        sm="4"
        md="3"
       class="d-flex justify-center align-center ma-1"
      >
       
          <img :src="image" alt="Firebase Image" width="180" height="180" />
        
      </v-card>
      <!-- {{ image }} -->
    </v-row>
  </div>
</template>

<script>
import { getStorage, ref, listAll, getDownloadURL } from "firebase/storage";

export default {
  data() {
    return {
      images: [],
    };
  },
  async created() {
    const storage = getStorage();
    const storageRef = ref(storage, "images"); // Replace with your actual storage folder path

    try {
      const imageRefs = await listAll(storageRef);

      const imageUrls = await Promise.all(
        imageRefs.items.map(async (itemRef) => {
          return getDownloadURL(itemRef);
        })
      );

      this.images = imageUrls;
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  },
};
</script>
