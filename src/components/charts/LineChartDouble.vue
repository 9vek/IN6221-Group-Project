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
  const margin = { top: 10, right: 60, bottom: 40, left: 60 }
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
          .attr("y", 40)
          .attr("x", width - 10)
          .attr("text-anchor", "end")
          .attr("fill", "black")
          .attr("font-size", "16px")
          .attr("font-weight", "500")
          .text("Year");

        // Max value observed:
        const max1 = d3.max(data1, function (d) { return +d.value; })
        const min1 = d3.min(data1, function (d) { return +d.value; })

        // Max value observed:
        const max2 = d3.max(data2, function (d) { return +d.value; })
        const min2 = d3.min(data2, function (d) { return +d.value; })

        // Add Y axis
        const yl = d3.scaleLinear() // y lft
          .domain([min1 / 1.05, max1 * 1.05])
          .range([height, 0]);
        svg.append("g")
          .call(d3.axisLeft(yl))
          .append("text") // TODO: 样式调整
          .attr("transform", "rotate(-90)")
          .attr("y", 35)
          .attr("dy", "-5.1em")
          .attr("text-anchor", "end")
          .attr("fill", "black")
          .attr("font-size", "13px")
          .attr("font-weight", "500")
          .text(yText1);

        // Add Y axis to the right
        const yr = d3.scaleLinear() // y rt
          .domain([min2 / 1.05, max2  * 1.05])
          .range([height, 0]);
        svg.append("g")
          .attr("transform", `translate(${width}, 0)`) // Move to the right
          .call(d3.axisRight(yr))
          .append("text")
          .attr("transform", `translate(${width+20}, 0), rotate(-90)`)
          .attr("y", -width + 95) // Adjust the y position accordingly
          .attr("x", 6) // Adjust the y position accordingly
          .attr("dy", "-5.1em")
          .attr("text-anchor", "end")
          .attr("fill", "black")
          .attr("font-size", "13px")
          .attr("font-weight", "500")
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
            { offset: "100%", color: "#38bdf8" }
          ])
          .enter().append("stop")
          .attr("offset", function (d) { return d.offset; })
          .attr("stop-color", function (d) { return d.color; });

        // Set the gradient
        svg.append("linearGradient")
          .attr("id", "text-line-gradient1")
          .attr("gradientUnits", "userSpaceOnUse")
          .attr("x1", '0%')
          .attr("y1", '0%')
          .attr("x2", '30%')
          .attr("y2", '0%')
          .selectAll("stop")
          .data([
            { offset: "0%", color: "#2dd4bf" },
            { offset: "100%", color: "#38bdf8" }
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

                
        // Set the gradient
        svg.append("linearGradient")
          .attr("id", "text-line-gradient2")
          .attr("gradientUnits", "userSpaceOnUse")
          .attr("x1", '0%')
          .attr("y1", '0%')
          .attr("x2", '22%')
          .attr("y2", '0%')
          .selectAll("stop")
          .data([
            { offset: "0%", color: "#facc15" },
            { offset: "100%", color: "#e879f9" }
          ])
          .enter().append("stop")
          .attr("offset", function (d) { return d.offset; })
          .attr("stop-color", function (d) { return d.color; });

        svg.append("text")
          .attr("x", 30)
          .attr("y", 50)
          .attr("font-size", "28px")
          .attr("font-weight", "600")
          .attr("fill", 'url(#text-line-gradient1)') // Set color to blue
          .text("Total Waste Incinerated (Million Tonnes)");

        // Title Part 2: "of and"
        svg.append("text")
          .attr("x", 30) // Adjust x position accordingly
          .attr("y", 90)
          .attr("font-size", "28px")
          .text("and");

        // Title Part 3: "Recycled"
        svg.append("text")
          .attr("x", 30) // Adjust x position accordingly
          .attr("y", 130)
          .attr("font-size", "28px")
          .attr("font-weight", "600")
          .attr("fill", 'url(#text-line-gradient2)') // Set color to green
          .text("Energy Produced (MWh)");

        // Add the line
        const linePath1 = svg.append("path")
          .datum(data1)
          .attr("fill", "none")
          .attr("stroke", "url(#line-gradient1)" )
          .attr("stroke-width", 6)
          .attr("stroke-linecap", "round")
          .attr("d", d3.line()
            .x(function(d) { return x(d.date) })
            .y(function(d) { return yl(d.value) })
            .curve(d3.curveCardinal)
            )
          
        const totalLength1 = linePath1.node().getTotalLength();

                // 设置初始状态
        linePath1
          .attr("stroke-dasharray", totalLength1 + " " + totalLength1)
          .attr("stroke-dashoffset", totalLength1)
          .transition()
          .duration(1500) // 调整动画持续时间
          .attr("stroke-dashoffset", 0);

                // Add the line
          const linePath2 = svg.append("path")
          .datum(data2)
          .attr("fill", "none")
          .attr("stroke", "url(#line-gradient2)" )
          .attr("stroke-width", 6)
          .attr("stroke-linecap", "round")
          .attr("d", d3.line()
            .x(function(d) { return x(d.date) })
            .y(function(d) { return yr(d.value) })
            .curve(d3.curveCardinal)
            )
          
          const totalLength2 = linePath2.node().getTotalLength();

          linePath2
          .attr("stroke-dasharray", totalLength2 + " " + totalLength2)
          .attr("stroke-dashoffset", totalLength2)
          .transition()
          .duration(1500) // 调整动画持续时间
          .attr("stroke-dashoffset", 0);


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
