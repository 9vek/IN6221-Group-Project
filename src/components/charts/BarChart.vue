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
  }
})

const drawTest = (file: string, title: string, yText: string) => {
  // set the dimensions and margins of the graph
  const container = d3.select("#barChart")
  const margin = { top: 10, right: 30, bottom: 20, left: 50 }
  let width = container.node().getBoundingClientRect().width
  let height = container.node().getBoundingClientRect().height
  width -= margin.left - margin.right
  height -= margin.top - margin.bottom

  // append the svg object to the body of the page
  const svg = d3.select("#barChart")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  svg.append("text")
    .attr("transform", "translate(100,0)")
    .attr("x", -50)
    .attr("y", 50) // TODO: 错位
    .attr("font-size", "24px")
    .text(title)

  // Parse the Data
  d3.csv(file).then(function (data) {

    // List of subgroups = header of the csv files = soil condition here
    const subgroups = data.columns.slice(1)

    // List of groups = species here = value of the first column called group -> I show them on the X axis
    const groups = data.map(d => d[Object.keys(d)[0]])

    // Add X axis
    const x = d3.scaleBand()
      .domain(groups)
      .range([0, width])
      .padding([0.2])
    svg.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(x).tickSize(0))
      .append("text")
      .attr("y", height - 250) //TODO: 错位不显示
      .attr("x", width - 50)
      .attr("text-anchor", "end")
      .attr("stroke", "black")
      .text("Year");

    const max = d3.max(data, function (d) { return d.value; })

    // Add Y axis
    const y = d3.scaleLinear()
      .domain([0, 40])
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

    // Another scale for subgroup position?
    const xSubgroup = d3.scaleBand()
      .domain(subgroups)
      .range([0, x.bandwidth()])
      .padding([0.05])

    // color palette = one color per subgroup
    const color = d3.scaleOrdinal()
      .domain(subgroups)
      .range(['#8EB5F1', '#9ED399'])

    // Show the bars
    svg.append("g")
      .selectAll("g")
      // Enter in data = loop group per group
      .data(data)
      .join("g")
      .attr("transform", d => `translate(${x(d.year)}, 0)`)
      .selectAll("rect")
      .data(function (d) { return subgroups.map(function (key) { return { key: key, value: d[key] }; }); })
      .join("rect")
      .attr("x", d => xSubgroup(d.key))
      .attr("y", d => y(d.value))
      .attr("width", xSubgroup.bandwidth())
      .attr("height", d => height - y(d.value))
      .attr("fill", d => color(d.key));

  })

}

onMounted(() => {
  drawTest(props.file, props.title, props.yText)
})
</script>

<template>
  <div id="barChart" class="w-full h-full"></div>
</template>

<style scoped></style>
