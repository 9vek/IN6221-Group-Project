<script setup lang='ts'>
import MapBubble from '../components/charts/MapWithBubble.vue'
import TextWithTitle from '../components/charts/TextWithTitle.vue';
const ewasteData = './src/data/geo/filtered_WasteTreatmentGEOJSON.geojson'
</script>

<template>
  <div class="bg-primary h-screen grid grid-cols-2 place-items-center">
      <MapBubble :file="ewasteData" />
      <TextWithTitle :title="'test'" :text="'test test test'" />
  </div>
</template>

<style scoped></style>