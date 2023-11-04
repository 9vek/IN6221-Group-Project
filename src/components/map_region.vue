<script setup lang="ts">
import { onMounted } from 'vue'
import * as d3 from "d3"

const drawTest = () => {
// set width and height of svg
const width = 800
const height = 400

// The svg
const svg = d3.select("#map")
  .append("svg")
  .attr("width", width)
  .attr("height", height)

// Map and projection
const projection = d3.geoMercator()
    .center([103.84, 1.32])                // GPS of location to zoom on
    .scale(width*90)                       // This is like the zoom
    .translate([ width/2, height/2 ])

// Load external data and boot
Promise.all([
  d3.json("./src/data/geo/Singapore.geojson"),
  d3.json("./src/data/geo/SingaporeCoastalHabitatsMapfromHighResolutionSatelliteImagery20102011.geojson")
]).then(function(data) {
	let map_data = data[0]
	let info_data = data[1]
console.log(info_data)
    // Draw the map
    svg.append("g")
        .selectAll("path")
        .data(map_data.features)
        .join("path")
          .attr("fill", "#b8b8b8")
          .attr("d", d3.geoPath()
              .projection(projection)
          )
        .style("stroke", "black")
        .style("opacity", .3)


    // Add regions:
    svg
      .selectAll("regions")
      .data(info_data.features)
      .join("path")
        .attr("d", d3.geoPath()
              .projection(projection)
          )
        .style("fill", "69b3a2")
        .attr("stroke", "#69b3a2")
        .attr("stroke-width", 1)
        .attr("fill-opacity", .3)
})
}

onMounted(() => {
  drawTest()
})
</script>

<template>
  <div id="map"></div>
</template>

<style scoped>
</style>
