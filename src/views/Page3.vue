<script setup lang='ts'>
import pieChart from '../components/charts/PieChart.vue'
import donutChart from '../components/charts/DonutChart.vue'

import { ref } from 'vue'
const pieChartTest = ref('./src/data/csv/RecyclingRateByWasteType/2000.csv')
</script>

<template>
    <div class="h-screen grid grid-cols-1 place-items-center bg-accent">
      <div class="columns-2">
        <pieChart :file="pieChartTest"/>
        <donutChart :file="pieChartTest"/>
      </div>
    </div>
</template>

<style scoped></style>