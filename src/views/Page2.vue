<script setup lang='ts'>
import BarChart from '../components/charts/BarChart.vue'
import LineChart from '../components/charts/LineChart.vue'

import { ref } from 'vue'
const wasteDisposedRecycled = ref('./src/data/csv/WasteDisposedOfAndRecycledAnnual.csv')
const solidFilled = ref('./src/data/csv/SolidWasteManagementTotalWasteLandfilledAnnual.csv')
const solidEnergy = ref('./src/data/csv/SolidWasteManagementEnergyProducedFromIncinerationAnnual.csv')
</script>

<template>
    <div class="hero h-screen bg-secondary">
      <div class="columns-2">
        <BarChart :file="wasteDisposedRecycled"/>
        <BarChart :file="wasteDisposedRecycled"/>
        <LineChart :file="solidFilled" />
        <LineChart :file="solidEnergy"/>
      </div>
      </div>
</template>

<style scoped></style>