<script setup lang='ts'>
import BarChart from '../components/charts/BarChart.vue'
import TextWithTitle from '../components/charts/TextWithTitle.vue';
import { ref } from 'vue'
const wasteDisposedRecycledTitle = ref("Waste Disposed of and Recycled")
const wasteDisposedRecycledY = ref("Million Tons")
const wasteDisposedRecycled = ref('./src/data/csv/WasteDisposedOfAndRecycledAnnual.csv')

import { p2Text } from '../data/text';

const solidFilled = ref('./src/data/csv/SolidWasteManagementTotalWasteLandfilledAnnual.csv')
const solidFilledTitle = ref("Total Waste Landfilled")
const solidFilledY = ref("Million Tonnes")


const solidEnergyTitle = ref("Energy Produced From Incineration")
const solidEnergyY = ref("MWh")
const solidEnergy = ref('./src/data/csv/SolidWasteManagementEnergyProducedFromIncinerationAnnual.csv')
</script>

<template>
  <div class="h-screen grid grid-cols-3 bg-primary">
    <div class="col-span-2 h-full w-full bg-yellow-50 p-16 rounded-r-[32px] pb-32 pr-12">
      <BarChart :file="wasteDisposedRecycled" :title="wasteDisposedRecycledTitle" :y-text="wasteDisposedRecycledY" />
    </div>
    <TextWithTitle :title="'Charting the Green Shift: Singapore\'s Journey in Waste Management and Recycling (2000-2014)'" :text="p2Text" />
  </div>
</template>

<style scoped></style>