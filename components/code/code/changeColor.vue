<template>
  <div>
    <v-btn v-if="show"  color="black" small  fab dark  fixed bottom right style="margin-bottom: 180px;" @click="colorValue('black')">
      <v-icon>mdi-invert-colors</v-icon>
    </v-btn>
    <v-btn v-if="show" color="white" small  fab dark  fixed bottom right style="margin-bottom: 135px;" @click="colorValue('white')">
      <v-icon color="black">mdi-invert-colors</v-icon>
    </v-btn>
    <v-btn v-if="show" color="green" small  fab dark  fixed bottom right style="margin-bottom: 90px;" @click="colorValue('green')">
      <v-icon>mdi-invert-colors</v-icon>
    </v-btn>
    <v-btn color="red" small  fab dark  fixed bottom right style="margin-bottom: 45px;" @click="actionChange()">
      <v-icon>mdi-palette</v-icon>
    </v-btn>


  </div>
</template>
<script>
export default {
  data: () => ({
    show:false,
   
  }),
  methods: {
    actionChange(){
      this.show = !this.show;
    },
    colorValue(e){
     this.$emit('actionChange',e)
    }
  },
};
</script>
