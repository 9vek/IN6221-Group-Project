<script setup lang='ts'>
import LineChartDouble from '../components/charts/LineChartDouble.vue'
import TextWithTitle from '../components/charts/TextWithTitle.vue';

import { p5Text } from '../data/text';

import { ref } from 'vue'

const solidEnergyTitle = ref("Energy Produced From Incineration")
const solidEnergyY = ref("MWh")
const solidEnergy = ref('./src/data/csv/SolidWasteManagementEnergyProducedFromIncinerationAnnual.csv')
const solidIncineratedY = ref("Million tonnes")
const solidIncinerated = ref('./src/data/csv/SolidWasteManagementTotalWasteIncinerated.csv')
</script>

<template>
  <div class="bg-accent h-screen grid grid-cols-3">
    <div class="col-span-2 bg-purple-50 rounded-r-[32px] w-full h-full">
      <div class="chart-container">
        <LineChartDouble :file1="solidIncinerated" :y-text1="solidIncineratedY" :file2="solidEnergy" :y-text2="solidEnergyY" :title="solidEnergyTitle"/>
      </div>
    </div>
    <div class="grid-flow-col auto-cols-max place-items-center">
      <TextWithTitle :title="'Discover the symbiotic relationship between waste incineration and energy generation as illustrated in our comprehensive graph. This visualization captures the steady increase in energy production as a result of the rising volumes of waste processed. The trend underscores a significant correlation between our waste management strategies and their energy-producing outcomes. This graph serves as a testament to the efficiency and technological strides in the waste-to-energy sector.'"
        :text="p5Text" />
        <!-- <img src='../assets/img/page5.png' alt="Descriptive text for the image" class="h-auto p-5 rounded-[16px]" /> -->
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