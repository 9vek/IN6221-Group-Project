<script setup lang="ts">
import { defineProps, onMounted } from 'vue'
import * as d3 from "d3"

const props = defineProps({
  file: {
    file: String,
    default: String,
    required: true,
  }
})

const drawTest = (file: String) => {
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
  d3.json(file)
]).then(function(data) {
	let mapData = data[0]
	let infoData = data[1]

    // Draw the map
    svg.append("g")
        .selectAll("path")
        .data(mapData.features)
        .join("path")
          .attr("fill", "#b8b8b8")
          .attr("d", d3.geoPath()
              .projection(projection)
          )
        .style("stroke", "black")
        .style("opacity", .3)

    // create a tooltip
    const Tooltip = d3.select("#map")
      .append("div")
      .attr("class", "tooltip")
      .style("opacity", 1)
      .style("background-color", "white")
      .style("border", "solid")
      .style("border-width", "2px")
      .style("border-radius", "5px")
      .style("padding", "5px")
      
      // Three function that change the tooltip when user hover / move / leave a cell
    const mouseover = function(event, d) {
      Tooltip.style("opacity", 1)
    }
    const mousemove = function(event, d) {
      var xPosition = event.pageX;
		  var yPosition = event.pageY;

      Tooltip
        .html(d.properties.Name + "<br>" + d.properties.Description)
        .style("left", xPosition + "px")
		  	.style("top", yPosition + "px")
    }
    const mouseleave = function(event, d) {
      Tooltip.style("opacity", 0)
    }

    // Add circles:
    svg
      .selectAll("myCircles")
      .data(infoData.features)
      .join("circle")
        .attr("cx", d => projection(d.geometry.coordinates)[0])
        .attr("cy", d => projection(d.geometry.coordinates)[1])
        .attr("r", 8)
        .attr("class", "circle")
        .style("fill", "69b3a2")
        .attr("stroke", "#69b3a2")
        .attr("stroke-width", 1)
        .attr("fill-opacity", .3)
        .on("mouseover", mouseover)
        .on("mousemove", mousemove)
        .on("mouseleave", mouseleave)
})
}

onMounted(() => {
  drawTest(props.file)
})
</script>

<template>
  <div id="map"></div>
</template>

<style scoped>
.circle:hover{
  stroke: black;
  stroke-width: 4px;
}
</style>
