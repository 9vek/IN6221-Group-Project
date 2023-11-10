<script setup lang='ts'>
//import PieChart from '../components/charts/PieChart.vue'
import DonutChart from '../components/charts/DonutChart.vue'
import TextWithTitle from '../components/charts/TextWithTitle.vue';
import Carousel from '../components/Carousel.vue';

import { ref } from 'vue'
const pieChartTest = ref('./src/data/csv/RecyclingRateByWasteType/')
</script>

<template>
  <div class="bg-accent h-screen grid grid-cols-3">
    <div class="col-span-2 bg-purple-50 rounded-r-[32px] w-full h-full">
      
    </div>
    <div>
      <TextWithTitle :title="'Recyling Rate by Waste Type'"
        :text="'There are three types of waste with highest recycling rate during 2000 to 2015: Construction Debris, Used Slag, and Ferrous Metal.'" />
    </div>
  </div>
</template>

<style scoped></style>