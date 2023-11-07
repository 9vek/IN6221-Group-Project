<script setup lang='ts'>
import BarChart from '../components/charts/BarChart.vue'
import LineChart from '../components/charts/LineChart.vue'

import { ref } from 'vue'
const waste_disposed_recycled = ref('./src/data/csv/WasteDisposedOfAndRecycledAnnual.csv')
const solid_filled = ref('./src/data/csv/SolidWasteManagementTotalWasteLandfilledAnnual.csv')
const solid_energy = ref('./src/data/csv/SolidWasteManagementEnergyProducedFromIncinerationAnnual.csv')
</script>

<template>
    <div class="hero min-h-screen bg-secondary">
      <div class="columns-2">
        <BarChart :file="waste_disposed_recycled"/>
        <BarChart :file="waste_disposed_recycled"/>
        <LineChart :file="solid_filled" />
        <LineChart :file="solid_energy"/>
      </div>
      </div>
</template>

<style scoped></style>