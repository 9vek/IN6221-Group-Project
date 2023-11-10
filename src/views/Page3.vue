<script setup lang='ts'>
//import PieChart from '../components/charts/PieChart.vue'
import DonutChart from '../components/charts/DonutChart.vue'
import TextWithTitle from '../components/charts/TextWithTitle.vue';
import { ref } from 'vue'
const pieChartTest = ref('./src/data/csv/RecyclingRateByWasteType/')
</script>

<template>
  <div class="bg-accent h-screen grid grid-cols-3 place-items-center">
    <div class="col-span-2 grid grid-cols-1 place-items-center bg-purple-50 rounded-[32px] p-16 mx-12">
      <div class="flex justify-center items-center">
        <!-- <PieChart :file="pieChartTest"/> -->
        <DonutChart :file="pieChartTest"/>
      </div>
    </div>
    <TextWithTitle :title="'test'" :text="'test test test'" />
  </div>

    <div class="h-screen flex justify-center items-center bg-accent">
      <div class="flex justify-center items-center">
        <!-- <PieChart :file="pieChartTest"/> -->
        <DonutChart :file="pieChartTest"/>
      </div>
      <!-- <TextWithTitle :title="'test'" :text="'test test test'" /> -->
    </div>
</template>

<style scoped>

</style>