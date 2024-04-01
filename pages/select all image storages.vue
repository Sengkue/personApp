<template>
  <div>
    <h2>Images from Firebase Storage:</h2>
    <div v-for="(image, index) in images" :key="index">
      {{ image }}
      <img :src="image" alt="Firebase Image" width="80"/>
    </div>
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
