<script setup lang='ts'>
import MapBubble from '../components/charts/MapWithBubble.vue'
import TextWithTitle from '../components/charts/TextWithTitle.vue';
const ewasteData = './src/data/geo/filtered_EwasteRecycling.geojson'
const wasteTreatmentData = './src/data/geo/filtered_WasteTreatmentGEOJSON.geojson'

</script>

<template>
  <div class="bg-primary h-screen grid grid-cols-3">
    <div class="col-span-2 bg-yellow-50 rounded-xl p-16">
      <MapBubble :file1="ewasteData" :file2="wasteTreatmentData" />
    </div>
    <TextWithTitle :title="'test'" :text="'test test test'" />
  </div>
</template>

<style scoped></style>