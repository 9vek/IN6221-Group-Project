<script setup lang='ts'>
import pie_chart from '../components/charts/PieChart.vue'
import donut_chart from '../components/charts/DonutChart.vue'

import { ref } from 'vue'
const pie_chart_test = ref('./src/data/csv/PieChartTest.csv')
</script>

<template>
    <div class="hero min-h-screen bg-accent">
      <div class="columns-2">
        <pie_chart :file="pie_chart_test"/>
        <donut_chart :file="pie_chart_test"/>
      </div>
    </div>
</template>

<style scoped></style>