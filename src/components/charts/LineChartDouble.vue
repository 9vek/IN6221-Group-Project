<script setup lang="ts">
import { defineProps, onMounted } from 'vue'
import * as d3 from "d3"

const props = defineProps({
  file1: {
    file1: String,
    default: String,
    required: true,
  },
  yText1: {
    yText1: String,
    default: String,
    required: true,
  },
  file2: {
    file1: String,
    default: String,
    required: true,
  },

  yText2: {
    yText2: String,
    default: String,
    required: true,
  },
  title: {
    title: String,
    default: String,
    required: true,
  }
})

const drawTest = (file1: string, yText1: string,file2: string, yText2: string, title: string) => {

  // set the dimensions and margins of the graph
  const container = d3.select("#lineChartDouble")
  const margin = { top: 10, right: 60, bottom: 30, left: 60 }
  let width = container.node().getBoundingClientRect().width-120
  let height = container.node().getBoundingClientRect().height-80
  width -= margin.left - margin.right
  height -= margin.top - margin.bottom

  // append the svg object to the body of the page
  const svg = d3.select("#lineChartDouble")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  // chart title
  svg.append("text")
    .attr("transform", "translate(100,0)")
    .attr("x", -50)
    .attr("y", 50)
    .attr("font-size", "24px")
    .text(title)

  //Read the data
  Promise.all([
    d3.csv(file1, 
    function (d) {
      console.log(Object.keys(d)[0])
      return { date: d3.timeParse("%Y")(d[Object.keys(d)[0]]), value: d[Object.keys(d)[1]] }
    }),
    d3.csv(file2, 
    function (d) {
      console.log(Object.keys(d)[0])
      return { date: d3.timeParse("%Y")(d[Object.keys(d)[0]]), value: d[Object.keys(d)[1]] }
    }),
  ]).then(

      // Now I can use this dataset:
      function (data) {
        let data1 = data[0]
        let data2 = data[1]
        // Add X axis --> it is a date format
        const x = d3.scaleTime()
          .domain(d3.extent(data1, function (d) { return d.date; }))
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
        const max1 = d3.max(data1, function (d) { return +d.value; })
        const min1 = d3.min(data1, function (d) { return +d.value; })

        // Max value observed:
        const max2 = d3.max(data2, function (d) { return +d.value; })
        const min2 = d3.min(data2, function (d) { return +d.value; })

        // Add Y axis
        const yl = d3.scaleLinear() // y lft
          .domain([min1 / 1.05, max1])
          .range([height, 0]);
        svg.append("g")
          .call(d3.axisLeft(yl))
          .append("text") // TODO: 样式调整
          .attr("transform", "rotate(-90)")
          .attr("y", 6)
          .attr("dy", "-5.1em")
          .attr("text-anchor", "end")
          .attr("stroke", "black")
          .text(yText1);

        // Add Y axis to the right
        const yr = d3.scaleLinear() // y rt
          .domain([min2 / 1.05, max2])
          .range([height, 0]);
        svg.append("g")
          .attr("transform", `translate(${width}, 0)`) // Move to the right
          .call(d3.axisRight(yr))
          .append("text")
          .attr("transform", `translate(${width+20}, 0), rotate(-90)`)
          .attr("y", -width + 60) // Adjust the y position accordingly
          .attr("dy", "-5.1em")
          .attr("text-anchor", "end")
          .attr("stroke", "black")
          .text(yText2);

        // Set the gradient
        svg.append("linearGradient")
          .attr("id", "line-gradient1")
          .attr("gradientUnits", "userSpaceOnUse")
          .attr("x1", 0)
          .attr("y1", yl(min1))
          .attr("x2", 0)
          .attr("y2", yl(max1))
          .selectAll("stop")
          .data([
            { offset: "0%", color: "#5eead4" },
            { offset: "100%", color: "#22d3ee" }
          ])
          .enter().append("stop")
          .attr("offset", function (d) { return d.offset; })
          .attr("stop-color", function (d) { return d.color; });

        // Set the gradient
        svg.append("linearGradient")
          .attr("id", "line-gradient2")
          .attr("gradientUnits", "userSpaceOnUse")
          .attr("x1", 0)
          .attr("y1", yr(min2))
          .attr("x2", 0)
          .attr("y2", yr(max2))
          .selectAll("stop")
          .data([
            { offset: "0%", color: "#facc15" },
            { offset: "100%", color: "#f0abfc" }
          ])
          .enter().append("stop")
          .attr("offset", function (d) { return d.offset; })
          .attr("stop-color", function (d) { return d.color; });



    // Add the line
    svg.append("path")
      .datum(data1)
      .attr("fill", "none")
      .attr("stroke", "url(#line-gradient1)" )
      .attr("stroke-width", 8)
      .attr("d", d3.line()
        .x(function(d) { return x(d.date) })
        .y(function(d) { return yl(d.value) })
        )

            // Add the line
    svg.append("path")
      .datum(data2)
      .attr("fill", "none")
      .attr("stroke", "url(#line-gradient2)" )
      .attr("stroke-width", 8)
      .attr("d", d3.line()
        .x(function(d) { return x(d.date) })
        .y(function(d) { return yr(d.value) })
        )


      })
}


onMounted(() => {
  drawTest(props.file1, props.yText1, props.file2, props.yText2, props.title)
})
</script>

<template>
  <div id="lineChartDouble" class="w-full h-full p-8"></div>
</template>

<style scoped></style>
