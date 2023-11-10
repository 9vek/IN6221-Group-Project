<script setup lang="ts">
import { ref, defineProps, onMounted } from 'vue'
import * as d3 from "d3"

const props = defineProps({
  file1: String,
  file2: String,
})

const updateData = ref<(input: string) => void>(() => { })

const drawTest = (file1: String, file2: String, updateDataRef: any) => {
  // set width and height of svg
  const container = d3.select("#map");
  const width = container.node().getBoundingClientRect().width;
  const height = container.node().getBoundingClientRect().height;
  // const width = 600
  // const height = 800

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
        tipString += "<b>" + key + ": </b>" + value + "<br/>"
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
      svg.selectAll(".circle").remove();

      var data = infoData1
      var fill = "#60a5fa"
      var stroke = "#60a5fa"
      var r = 6

      if (input == "2") {
        data = infoData2
        fill = "#c084fc"
        stroke = "#c084fc"
        r = 7
      }

      if (input == "1") {
        data = infoData1
        fill = "#60a5fa"
        stroke = "#60a5fa"
        r = 6
      }

      svg
        .selectAll("myCircles")
        .data(data.features)
        .join("circle")
        .attr("cx", d => projection(d.geometry.coordinates)[0])
        .attr("cy", d => projection(d.geometry.coordinates)[1])
        .attr("r", 0)
        .attr("class", "circle")
        .style("fill", fill)
        .attr("stroke", stroke)
        .attr("stroke-width", 1)
        .attr("fill-opacity", .2)
        .on("mouseover", mouseover)
        .on("mousemove", mousemove)
        .on("mouseleave", mouseleave)
        .transition()
        .attr("r", r);
    }

    updateDataRef.value("1")
  })
}

onMounted(() => {
  drawTest(props.file1 as string, props.file2 as string, updateData)
})
</script>

<template>
  <div class="w-full h-full">
    <div class="h-16 grid grid-cols-2 join">
      <div @click="updateData('1')" class="join-item btn bg-blue-200 hover:bg-blue-300">
        E-Waste Recycling Points
      </div>
      <div @click="updateData('2')" class="join-item btn bg-purple-200 hover:bg-purple-300">
        Toxic Industrial Wastes Treatment and Disposal Facilities
      </div>
    </div>
    <div id="map" class="h-full w-full"></div>
  </div>
</template>

<style scoped>
.circle:hover {
  stroke: black;
  stroke-width: 4px;
}
</style>
