<template>
  <div>
    <h2>Images from Firebase Storage:</h2>
    <div v-for="(image, index) in images" :key="index">
      {{ image }}
      <img :src="image" alt="Firebase Image" width="80" />
      <button @click="deleteImage(image)">Delete</button>
    </div>
  </div>
</template>

<script>
import { getStorage, ref, listAll, getDownloadURL, deleteObject } from "firebase/storage";

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
  methods: {
    async deleteImage(imageUrl) {
      const storage = getStorage();
      const imageRef = ref(storage, imageUrl); // Use the full path to the image in Firebase Storage

      try {
        await deleteObject(imageRef);
        console.log("Image deleted successfully:", imageUrl);
        this.images = this.images.filter((image) => image !== imageUrl);
      } catch (error) {
        console.error("Error deleting image:", error);
      }
    },
  },
};
</script>
