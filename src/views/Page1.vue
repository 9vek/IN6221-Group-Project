<script setup lang='ts'>
//import PieChart from '../components/charts/PieChart.vue'
import DonutChart from '../components/charts/DonutChart.vue'
import TextWithTitle from '../components/charts/TextWithTitle.vue';
import Carousel from '../components/Carousel.vue';

import { ref } from 'vue'
const pieChartTest = ref('./src/data/csv/RecyclingRateByWasteType/')
</script>

<template>
  <div class="bg-primary h-screen grid grid-cols-3">
    <div class="col-span-2 bg-yellow-50 rounded-r-[32px] w-full h-full">
      <DonutChart :file="pieChartTest" />
    </div>
    <div class="grid-flow-col auto-cols-max place-items-center">
      <TextWithTitle :title="'Recyling Rate by Waste Type'"
        :text="'There are three types of waste with highest recycling rate during 2000 to 2015: Construction Debris, Used Slag, and Ferrous Metal.'" />
        <img src='../assets/img/page1-3pic.png' alt="Descriptive text for the image" class="h-auto p-5" />
    </div>
  </div>
</template>

<style scoped></style>