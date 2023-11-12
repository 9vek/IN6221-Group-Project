<script setup lang="ts">
import { onMounted } from 'vue'
import * as d3 from "d3"
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'

const data = [10, 20, 30, 40, 50]
const width = 500
const height = 300
const margin = { top: 20, right: 20, bottom: 30, left: 40 }

const drawTest = () => {
  // Set up scales
  const xScale = d3.scaleBand()
    .domain(data.map((_, i) => i.toString()))
    .range([margin.left, width - margin.right])
    .padding(0.1)


  const yScale = d3.scaleLinear()
    .domain([0, d3.max(data) || 0])
    .range([height - margin.bottom, margin.top])

  // Create SVG canvas
  const svg = d3.select(".svg-canvas")
    .append("svg")
    .attr("width", width)
    .attr("height", height)

  // Draw bars
  svg.selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
    .attr("x", (_, i) => xScale(i.toString()) || 0)
    .attr("y", d => yScale(d))
    .attr("width", xScale.bandwidth())
    .attr("height", d => height - margin.bottom - yScale(d))
    .attr("fill", "steelblue")
}

onMounted(() => {
  drawTest()
  drawTest()
})
</script>

<template>
  <div ref="outmost" class="h-screen overflow-scroll scrollbar-none">
    <Header />
    <div class="h-screen overflow-hidden scrollbar-none">
      <router-view></router-view>
    </div>
    <Footer/>
  </div>
</template>

<style scoped></style>
