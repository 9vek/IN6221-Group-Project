<script setup lang='ts'>
import LineChart from '../components/charts/LineChart.vue'
import TextWithTitle from '../components/charts/TextWithTitle.vue';

import { ref } from 'vue'

const solidEnergyTitle = ref("Total Waste Landfilled")
const solidEnergyY = ref("Million tonnes")
const solidEnergy = ref('./src/data/csv/SolidWasteManagementTotalWasteLandfilledAnnual.csv')

import { p6Text } from '../data/text';
</script>

<template>
  <div class="bg-accent h-screen grid grid-cols-3">
    <div class="col-span-2 bg-purple-50 rounded-r-[32px] w-full h-full">
      <div class="chart-container">
        <LineChart :file="solidEnergy" :title="solidEnergyTitle" :y-text="solidEnergyY"/>
      </div>
    </div>
    <div class="grid-flow-col auto-cols-max place-items-center">
      <TextWithTitle :title="'Waste Landfill'"
        :text="p6Text" />
        <div class="p-5">
          <img src='../assets/img/page6.png' alt="Descriptive text for the image" class="h-auto rounded-[16px]" />
        </div>
    </div> 
  </div>
</template>

<style scoped>
.chart-container {
  margin-top: 0px;
  width: 90%; 
  height: 90%;
  padding: 2rem; 
  box-sizing: border-box; 
  overflow: hidden; 
  display: flex; 
  align-items: center;
  justify-content: center; 
}

</style>