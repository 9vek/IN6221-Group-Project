<script setup lang='ts'>
import LineChart from '../components/charts/LineChart.vue'
import TextWithTitle from '../components/charts/TextWithTitle.vue';

import { ref } from 'vue'

const solidEnergyTitle = ref("Energy Produced From Incineration")
const solidEnergyY = ref("MWh")
const solidEnergy = ref('./src/data/csv/SolidWasteManagementEnergyProducedFromIncinerationAnnual.csv')
</script>

<template>
  <div class="bg-accent h-screen grid grid-cols-3">
    <div class="grid-flow-col auto-cols-max place-items-center">
      <TextWithTitle :title="'Recyling Rate by Waste Type'"
        :text="'There are three types of waste with highest recycling rate during 2000 to 2015: Construction Debris, Used Slag, and Ferrous Metal.'" />
        <img src='../../guide_img/folder_termi.png' alt="Descriptive text for the image" class="h-auto rounded-[16px] m-4" />
    </div>
    <div class="col-span-2 bg-purple-50 rounded-l-[32px] w-full h-full">
      <LineChart :file="solidEnergy" :title="solidEnergyTitle" :y-text="solidEnergyY"/>
    </div>
  </div>
</template>

<style scoped></style>