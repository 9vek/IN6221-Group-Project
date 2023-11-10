<script setup lang='ts'>
import BarChart from '../components/charts/BarChart.vue'
import LineChart from '../components/charts/LineChart.vue'
import TextWithTitle from '../components/charts/TextWithTitle.vue';
import { ref } from 'vue'
const wasteDisposedRecycledTitle = ref("Waste Disposed of and Recycled")
const wasteDisposedRecycledY = ref("Million Tons")
const wasteDisposedRecycled = ref('./src/data/csv/WasteDisposedOfAndRecycledAnnual.csv')

const solidFilled = ref('./src/data/csv/SolidWasteManagementTotalWasteLandfilledAnnual.csv')
const solidFilledTitle = ref("Total Waste Landfilled")
const solidFilledY = ref("Million Tonnes")


const solidEnergyTitle = ref("Energy Produced From Incineration")
const solidEnergyY = ref("MWh")
const solidEnergy = ref('./src/data/csv/SolidWasteManagementEnergyProducedFromIncinerationAnnual.csv')
</script>

<template>
  <div class="h-screen grid grid-cols-3 bg-secondary">
    <div class="col-span-2 h-full w-full bg-[#e2f4f6] p-16 pb-24 pr-24">
      <BarChart :file="wasteDisposedRecycled" :title="wasteDisposedRecycledTitle" :y-text="wasteDisposedRecycledY" />
      <!-- <BarChart :file="wasteDisposedRecycled" :title="wasteDisposedRecycledTitle" :y-text="wasteDisposedRecycledY" /> -->
      <!-- <LineChart :file="solidFilled" :title="solidFilledTitle" :y-text="solidFilledY" /> -->
      <!-- <LineChart :file="solidEnergy" :title="solidEnergyTitle" :y-text="solidEnergyY" /> -->
    </div>
    <TextWithTitle :title="'test'" :text="'test test test'" />
  </div>
</template>

<style scoped></style>