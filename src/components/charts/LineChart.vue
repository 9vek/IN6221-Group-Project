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

const drawTest = (file: string) => {

  // set the dimensions and margins of the graph
  const margin = {top: 10, right: 30, bottom: 30, left: 60},
      width = 460 - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom;

  // append the svg object to the body of the page
  const svg = d3.select("#lineChart")
    .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

//Read the data
  d3.csv(file,

    // When reading the csv, I must format variables:
    function(d){
      console.log(Object.keys(d)[0])
      return { date : d3.timeParse("%Y")(d[Object.keys(d)[0]]), value : d[Object.keys(d)[1]] }
    }).then(

    // Now I can use this dataset:
    function(data) {

    // Add X axis --> it is a date format
    const x = d3.scaleTime()
      .domain(d3.extent(data, function(d) { return d.date; }))
      .range([ 0, width ]);
    svg.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(x));

    // Max value observed:
    const max = d3.max(data, function(d) { return +d.value; })

    // Add Y axis
    const y = d3.scaleLinear()
      .domain([0, max])
      .range([ height, 0 ]);
    svg.append("g")
      .call(d3.axisLeft(y));

    // Set the gradient
    svg.append("linearGradient")
      .attr("id", "line-gradient")
      .attr("gradientUnits", "userSpaceOnUse")
      .attr("x1", 0)
      .attr("y1", y(0))
      .attr("x2", 0)
      .attr("y2", y(max))
      .selectAll("stop")
        .data([
          {offset: "0%", color: "blue"},
          {offset: "100%", color: "red"}
        ])
      .enter().append("stop")
        .attr("offset", function(d) { return d.offset; })
        .attr("stop-color", function(d) { return d.color; });

    // Add the line
    svg.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "url(#line-gradient)" )
      .attr("stroke-width", 2)
      .attr("d", d3.line()
        .x(function(d) { return x(d.date) })
        .y(function(d) { return y(d.value) })
        )

  })
}


//周期函数
onMounted(() => {
  drawTest(props.file)
})
</script>

<template>
  <div id="lineChart"></div>
</template>

<style scoped>
</style>