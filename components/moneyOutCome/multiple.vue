<template>
    <div>
      <v-dialog v-model="dialog" transition="dialog-top-transition" max-width="600px">
        <template v-slot:activator="{ on }">
          <v-btn color="primary" v-on="on">
            <v-icon>mdi-camera-plus</v-icon>
          </v-btn>
        </template>
        <v-card>
          <v-card-title> Select Images </v-card-title>
          <v-card-text>
            <input type="file" multiple @change="handleFileUpload" />
            <!-- Display uploaded images -->
            <div v-for="(url, index) in imageUrls" :key="index">
              <img :src="url" alt="Uploaded Image" width="60"/>
            </div>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="error" @click="dialog = false">Close</v-btn>
            <v-btn color="primary" :loading="loading" @click="uploadImages">
              Upload Images
            </v-btn>
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
        selectedFiles: [], // Use an array to store selected files
        imageUrls: [], // Store the URLs of uploaded images
        dialog: false, // Add a data property to control the dialog
      };
    },
    methods: {
      handleFileUpload(event) {
        // Clear previous selections
        this.selectedFiles = [];
  
        // Append the selected files to the array
        for (let i = 0; i < event.target.files.length; i++) {
          this.selectedFiles.push(event.target.files[i]);
        }
  
        // Clear the previously displayed images
        this.imageUrls = [];
      },
      async uploadImages() {
        if (this.selectedFiles.length === 0) {
          alert("Please select one or more files to upload.");
          return;
        }
        this.loading = true;
  
        const storage = getStorage();
  
        // Loop through the selected files and upload each one
        for (const file of this.selectedFiles) {
          const storageReference = storageRef(
            storage,
            "images/" + file.name
          );
  
          try {
            // Upload the file to Firebase Storage
            await uploadBytes(storageReference, file);
  
            // Get the download URL of the uploaded image
            const downloadURL = await getDownloadURL(storageReference);
  
            console.log("Image uploaded successfully:", downloadURL);
  
            // Add the URL to the array of image URLs
            this.imageUrls.push(downloadURL);
          } catch (error) {
            console.error("Image upload failed:", error);
          }
        }
  
        // Reset the selected files and close the dialog
        this.selectedFiles = [];
        this.dialog = false;
        this.loading = false;
      },
      clearImages() {
        this.imageUrls = [];
      },
    },
  };
  </script>
  