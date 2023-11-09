<script setup lang="ts">
import { ref, defineProps, onMounted } from 'vue'
import * as d3 from "d3"

const props = defineProps({
  file1: String,
  file2: String,
})

const updateData = ref<(input: string) => void>(() => {})

const drawTest = (file1: String, file2: String, updateDataRef: any) => {
  // set width and height of svg
  const width = 600
  const height = 400

  // The svg
  const svg = d3.select("#map")
    .append("svg")
    .attr("width", width)
    .attr("height", height)

  // Map and projection
  const projection = d3.geoMercator()
    .center([103.85, 1.32])                // GPS of location to zoom on
    .scale(width * 116)                       // This is like the zoom
    .translate([width / 2, height / 2])

  // Load external data and boot
  Promise.all([
    d3.json("./src/data/geo/Singapore.geojson"),
    d3.json(file1 as string),
    d3.json(file2 as string)
  ]).then(function (data) {
    let mapData = data[0]
    let infoData1 = data[1]
    let infoData2 = data[2]

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

      const color = d3.scaleOrdinal()
      .domain(["A", "B", "C" ])
      .range([ "#402D54", "#D18975", "#8FD175"])

    // create a tooltip
    const Tooltip = d3.select("#map")
      .append("div")
      .attr("class", "tooltip absolute")
      .style("opacity", 1)
      .style("background-color", "white")
      .style("border", "solid")
      .style("border-width", "2px")
      .style("border-radius", "5px")
      .style("padding", "5px")

    // Three function that change the tooltip when user hover / move / leave a cell
    const mouseover = function (event, d) {
      Tooltip.style("opacity", 1)
    }
    const mousemove = function (event, d) {
      var xPosition = event.pageX;
      var yPosition = event.pageY;

    var tipString: string = ""
    for (const [key, value] of Object.entries(d.properties)) {
        console.log(key, ":",value);
        tipString += key + ": " + value + "<br/>"
    }

      Tooltip
        .html(tipString)
        .style("left", xPosition + "px")
        .style("top", yPosition + "px")
    }
    const mouseleave = function () {
      Tooltip.style("opacity", 0)
    }

    updateDataRef.value = (input: string) => {
      var data = infoData1

        if (input == "2") {
          data = infoData2
        }

        if (input == "1") {
          data = infoData1
        }
          // Add circles
      svg
        .selectAll("myCircles")
        .data(data.features)
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
    }
  })
}

onMounted(() => {
  drawTest(props.file1 as string, props.file2 as string, updateData)
})
</script>

<template>
  <div>
    <div @click="updateData('1')" class="btn"> Data1 </div>
    <div @click="updateData('2')" class="btn"> Data2 </div>
    <div id="map" class="w-full h-full"></div>
  </div>
</template>

<style scoped>
.circle:hover {
  stroke: black;
  stroke-width: 4px;
}
</style>
