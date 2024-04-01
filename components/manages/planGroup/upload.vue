<template>
  <div>
    <v-dialog v-model="dialog" max-width="600px">
      <template v-slot:activator="{ on }">
        <v-btn color="primary" v-on="on">
          <v-icon>mdi-camera-plus</v-icon></v-btn
        >
      </template>
      <v-card>
        <v-card-title> Select an Image </v-card-title>
        <v-card-text>
          <input type="file" @change="handleFileUpload" />

          <!-- <div v-if="imageUrl">
              <img :src="imageUrl" alt="Uploaded Image" />
            </div> -->
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" @click="dialog = false">Close</v-btn>
          <v-btn color="primary" :loading="loading" @click="uploadImage"
            >Upload Image</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import {
  getStorage,
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";

export default {
  data() {
    return {
      loading: false,
      selectedFile: null,
      imageUrl: null,
      dialog: false, // Add a data property to control the dialog
    };
  },
  methods: {
    handleFileUpload(event) {
      this.selectedFile = event.target.files[0];
      this.imageUrl = null; // Clear the previously displayed image
    },
    async uploadImage() {
      if (!this.selectedFile) {
        alert("Please select a file to upload.");
        return;
      }
      this.loading = true;

      const storage = getStorage();

      // Construct the storage reference for the "images" directory
      const storageReference = storageRef(
        storage,
        "images/" + this.selectedFile.name
      );

      try {
        // Upload the selected file to Firebase Storage
        await uploadBytes(storageReference, this.selectedFile);

        // Get the download URL of the uploaded image
        const downloadURL = await getDownloadURL(storageReference);

        console.log("Image uploaded successfully:", downloadURL);
        this.imageUrl = downloadURL; // Set the URL to display the uploaded image

        // Emit an event to send imageUrl back to the parent component
        this.$emit("image-uploaded", downloadURL);
        this.dialog = false;
        this.loading = false;
      } catch (error) {
        console.error("Image upload failed:", error);
      }
    },
    clearImage() {
      this.imageUrl = null;
    },
  },
};
</script>