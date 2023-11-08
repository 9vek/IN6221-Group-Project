<script setup lang='ts'>
import mapBubble from '../components/charts/MapWithBubble.vue'
const ewasteData = './src/data/geo/filtered_WasteTreatmentGEOJSON.geojson'
</script>

<template>
  <div class="bg-primary h-screen grid grid-cols-1 place-items-center">
      <mapBubble :file="ewasteData" />
  </div>
</template>

<style scoped></style>