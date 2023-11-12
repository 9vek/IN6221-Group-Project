<script setup lang="ts">
import { defineProps, onMounted } from 'vue'
import * as d3 from "d3"

const props = defineProps({
  file: {
    file: String,
    default: String,
    required: true,
  },
  title: {
    title: String,
    default: String,
    required: true,
  },
  yText: {
    yText: String,
    default: String,
    required: true,
  },

})

const drawTest = (file: string, title: string, yText: string) => {

  // set the dimensions and margins of the graph
  const container = d3.select("#lineChart")
  const margin = { top: 10, right: 30, bottom: 30, left: 60 }
  let width = container.node().getBoundingClientRect().width-60
  let height = container.node().getBoundingClientRect().height-80
  width -= margin.left - margin.right
  height -= margin.top - margin.bottom

  // append the svg object to the body of the page
  const svg = d3.select("#lineChart")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  // chart title
  svg.append("text")
    .attr("transform", "translate(100,0)")
    .attr("x", -50) // TODO: 错位
    .attr("y", 50)
    .attr("font-size", "24px")
    .text(title)

  //Read the data
  d3.csv(file,

    // When reading the csv, I must format variables:
    function (d) {
      console.log(Object.keys(d)[0])
      return { date: d3.timeParse("%Y")(d[Object.keys(d)[0]]), value: d[Object.keys(d)[1]] }
    }).then(

      // Now I can use this dataset:
      function (data) {

        // Add X axis --> it is a date format
        const x = d3.scaleTime()
          .domain(d3.extent(data, function (d) { return d.date; }))
          .range([0, width]);
        svg.append("g")
          .attr("transform", `translate(0, ${height})`)
          .call(d3.axisBottom(x))
          .append("text") // TODO: 错位不显示
          .attr("y", height - 250)
          .attr("x", width - 100)
          .attr("text-anchor", "end")
          .attr("stroke", "black")
          .text("Year");

        // Max value observed:
        const max = d3.max(data, function (d) { return +d.value; })
        const min = d3.min(data, function (d) { return +d.value; })

        // Add Y axis
        const y = d3.scaleLinear()
          .domain([min / 1.05, max])
          .range([height, 0]);
        svg.append("g")
          .call(d3.axisLeft(y))
          .append("text") // TODO: 样式调整
          .attr("transform", "rotate(-90)")
          .attr("y", 6)
          .attr("dy", "-5.1em")
          .attr("text-anchor", "end")
          .attr("stroke", "black")
          .text(yText);

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
            { offset: "0%", color: "#5eead4" },
            { offset: "100%", color: "#22d3ee" }
          ])
          .enter().append("stop")
          .attr("offset", function (d) { return d.offset; })
          .attr("stop-color", function (d) { return d.color; });


    // Add the line
    svg.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "url(#line-gradient)" )
      .attr("stroke-width", 8)
      .attr("d", d3.line()
        .x(function(d) { return x(d.date) })
        .y(function(d) { return y(d.value) })
        )


      })
}


onMounted(() => {
  drawTest(props.file, props.title, props.yText)
})
</script>

<template>
  <div id="lineChart" class="w-full h-full p-8"></div>
</template>

<style scoped></style>
