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

const isSliceLargeEnough = function(d) {
  return getPercentageForLabel(d) > 2;
};

const getPercentageForLabel = function(d) {
  const percentage = (d.endAngle - d.startAngle) * (180 / Math.PI) / 360
  return Math.round(percentage*1000) / 10
}

const drawTest = (file: String) => {

  d3.select("#donutChart").selectAll("*").remove();


// set the dimensions and margins of the graph
const width = 900,
    height = 500,
    margin = 70;

// The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
const radius = Math.min(width, height) / 2 - margin

// append the svg object to the div called 'my_dataviz'
const svg = d3.select("#donutChart")
  .append("svg")
    .attr("width", width)
    .attr("height", height)
  .append("g")
    .attr("transform", `translate(${width/2},${height/2})`);

// set the color scale
const color = d3.scaleOrdinal()
  .range(d3.schemeDark2);

// Compute the position of each group on the pie:
const pie = d3.pie()
  .sort(null) // Do not sort group by size
  .value(d => d.recycling_rate)

// The arc generator
const arc = d3.arc()
  .innerRadius(radius * 0.5)         // This is the size of the donut hole
  .outerRadius(radius * 0.8)

// Another arc that won't be drawn. Just for labels positioning
const outerArc = d3.arc()
  .innerRadius(radius * 0.9)
  .outerRadius(radius * 0.9)

  d3.csv(file).then(function(data) {
// Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
svg
  .selectAll('allSlices')
  .data(pie(data))
  .join('path')
  .attr('d', arc)
  .attr('fill', d => color(d.data.waste_type))
  .attr("stroke", "white")
  .style("stroke-width", "2px")
  .style("opacity", 0.7)
  .transition()
    .duration(1000)
    .attrTween("d", function(d) {
        const interpolate = d3.interpolate({ startAngle: 0, endAngle: 0 }, d);
        return function(t) {
          return arc(interpolate(t));
        };
      });

// Add the polylines between chart and labels:
svg
  .selectAll('allPolylines')
  .data(pie(data))
  .join('polyline')
    .filter(d => isSliceLargeEnough(d))
    .attr("stroke", "black")
    .style("fill", "none")
    .attr("stroke-width", 1)
    .attr('points', function(d) {
      const posA = arc.centroid(d) // line insertion in the slice
      const posB = outerArc.centroid(d) // line break: we use the other arc generator that has been built only for that
      const posC = outerArc.centroid(d); // Label position = almost the same as posB
      const midangle = d.startAngle + (d.endAngle - d.startAngle) / 2 // we need the angle to see if the X position will be at the extreme right or extreme left
      posC[0] = radius * 0.95 * (midangle < Math.PI ? 1 : -1); // multiply by 1 or -1 to put it on the right or on the left
      return [posA, posB, posC]
    })
    .style("opacity", 0) // Set initial opacity to 0
      .transition()
      .duration(1000)
      .style("opacity", 1); // Transition opacity to 1


// Add the polylines between chart and labels:
svg
  .selectAll('allLabels')
  .data(pie(data))
  .join('text')
    .text(d => isSliceLargeEnough(d) ? d.data.waste_type + " " + String(getPercentageForLabel(d)) + "%": '')
    .attr('transform', function(d) {
        const pos = outerArc.centroid(d);
        const midangle = d.startAngle + (d.endAngle - d.startAngle) / 2
        pos[0] = radius * 0.99 * (midangle < Math.PI ? 1 : -1);
        pos[1] = pos[1] + 6;
        return `translate(${pos})`;
    })
    .style('text-anchor', function(d) {
        const midangle = d.startAngle + (d.endAngle - d.startAngle) / 2
        return (midangle < Math.PI ? 'start' : 'end')
    })
    .style("font-size", "14px")  // 设置字体大小为12像素
    .style("opacity", 0) // Set initial opacity to 0
    .transition()
    .duration(1000)
    .style("opacity", 1); // Transition opacity to 1
  })
}

onMounted(() => {
  drawTest(props.file + "2000.csv")
})

</script>

<template>
   <div id="chart-container">
    <div id="button-container">
      <button class="btn" @click="drawTest(props.file + '2000.csv')">2000</button>
      <button class="btn" @click="drawTest(props.file + '2001.csv')">2001</button>
      <button class="btn" @click="drawTest(props.file + '2002.csv')">2002</button>
      <button class="btn" @click="drawTest(props.file + '2003.csv')">2003</button>
      <button class="btn" @click="drawTest(props.file + '2004.csv')">2004</button>
      <button class="btn" @click="drawTest(props.file + '2005.csv')">2005</button>
      <button class="btn" @click="drawTest(props.file + '2006.csv')">2006</button>
      <button class="btn" @click="drawTest(props.file + '2007.csv')">2007</button>
      <button class="btn" @click="drawTest(props.file + '2008.csv')">2008</button>
      <button class="btn" @click="drawTest(props.file + '2009.csv')">2009</button>
      <button class="btn" @click="drawTest(props.file + '2010.csv')">2010</button>
      <button class="btn" @click="drawTest(props.file + '2011.csv')">2011</button>
      <button class="btn" @click="drawTest(props.file + '2012.csv')">2012</button>
      <button class="btn" @click="drawTest(props.file + '2013.csv')">2013</button>
      <button class="btn" @click="drawTest(props.file + '2014.csv')">2014</button>
      <button class="btn" @click="drawTest(props.file + '2015.csv')">2015</button>
    </div>
    <div id="donutChart"></div>
  </div>
</template>

<style scoped>
#chart-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

#button-container {
  margin-bottom: 0px; 
}

button {
  margin: 0 10px; 
}

#donutChart {
  width: 90%;
  display: flex;
  justify-content: center;
}
</style>
