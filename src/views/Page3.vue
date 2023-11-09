<script setup lang='ts'>
import PieChart from '../components/charts/PieChart.vue'
import DonutChart from '../components/charts/DonutChart.vue'
import TextWithTitle from '../components/charts/TextWithTitle.vue';
import { ref } from 'vue'
const pieChartTest = ref('./src/data/csv/RecyclingRateByWasteType/2000.csv')
</script>

<template>
    <div class="h-screen grid grid-cols-2 place-items-center bg-accent">
      <div class="columns-2">
        <PieChart :file="pieChartTest"/>
        <DonutChart :file="pieChartTest"/>
      </div>
      <TextWithTitle :title="'test'" :text="'test test test'" />
    </div>
</template>

<style scoped></style>