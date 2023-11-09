<script setup lang='ts'>
//import PieChart from '../components/charts/PieChart.vue'
import DonutChart from '../components/charts/DonutChart.vue'
import TextWithTitle from '../components/charts/TextWithTitle.vue';
import { ref } from 'vue'
const pieChartTest = ref('./src/data/csv/RecyclingRateByWasteType/')
</script>

<template>
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