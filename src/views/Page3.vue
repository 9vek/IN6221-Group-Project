<script setup lang='ts'>
import pieChart from '../components/charts/PieChart.vue'
import donutChart from '../components/charts/DonutChart.vue'

import { ref } from 'vue'
const pieChartTest = ref('./src/data/csv/PieChartTest.csv')
</script>

<template>
    <div class="hero min-h-screen bg-accent">
      <div class="columns-2">
        <pieChart :file="pieChartTest"/>
        <donutChart :file="pieChartTest"/>
      </div>
    </div>
</template>

<style scoped></style>