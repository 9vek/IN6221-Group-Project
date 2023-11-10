<script setup lang='ts'>
//import PieChart from '../components/charts/PieChart.vue'
import DonutChart from '../components/charts/DonutChart.vue'
import TextWithTitle from '../components/charts/TextWithTitle.vue';
import Carousel from '../components/Carousel.vue';
import Image from '../../guide_img/folder_termi.png'

import { ref } from 'vue'
const pieChartTest = ref('./src/data/csv/RecyclingRateByWasteType/')
</script>

<template>
  <div class="bg-secondary h-screen grid grid-cols-3">
    <div class="col-span-2 bg-[#e2f4f6] rounded-r-[32px] w-full h-full">
      <img src='../assets/img/page4.png' alt="Descriptive text for the image" class="max-w-full h-auto rounded-r-[32px]" />
    </div>
    <div>
      <TextWithTitle :title="'Benifits of Waste Management'"
        :text="''" />
    </div>
  </div>
</template>

<style scoped></style>