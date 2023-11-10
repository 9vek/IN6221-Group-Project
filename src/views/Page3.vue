<script setup lang='ts'>
import MapBubble from '../components/charts/MapWithBubble.vue'
import TextWithTitle from '../components/charts/TextWithTitle.vue';
const ewasteData = './src/data/geo/filtered_EwasteRecycling.geojson'
const wasteTreatmentData = './src/data/geo/filtered_WasteTreatmentGEOJSON.geojson'
import { p1Text1, p1Text2 } from '../data/text';

</script>

<template>
  <div class="bg-secondary h-screen grid grid-cols-3">
    <div class="col-span-2 bg-[#e2f4f6] rounded-r-[32px] p-16">
      <MapBubble :file1="ewasteData" :file2="wasteTreatmentData" />
    </div>
    <div class="grid-flow-col auto-cols-max place-items-center">
      <TextWithTitle :title="'Environmental Waste Management and Recycling Facilities Distribution Map'" :text="p1Text1 + p1Text2" />
        <div class="place-items-center p-5">
          <img src='../assets/img/page3-2.jpg' alt="Descriptive text for the image" class="mx-auto h-auto place-items-center rounded-[16px]" />
        </div>
    </div> 
  </div>
</template>

<style scoped></style>



