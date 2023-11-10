<script setup lang="ts">
import { defineProps, onMounted, ref } from 'vue'
import * as d3 from "d3"

const selectedYear = ref(2000);

const nextYear = () => {
  if (selectedYear.value < 2015) {
    selectedYear.value += 1
    drawTest(props.file);
  }
};

const previousYear = () => {
  if (selectedYear.value > 2000) {
    selectedYear.value -= 1
    drawTest(props.file);
  }
};

const handleYearChange = (event) => {
  selectedYear.value = event.target.value;
  drawTest(props.file);
};

const props = defineProps({
  file: {
    file: String,
    default: String,
    required: true,
  }
})

const isSliceLargeEnough = function (d) {
  return getPercentageForLabel(d) > 2;
};

const getPercentageForLabel = function (d) {
  const percentage = (d.endAngle - d.startAngle) * (180 / Math.PI) / 360
  return Math.round(percentage * 1000) / 10
}

const drawTest = (filePath: string) => {
  const file = filePath + selectedYear.value + '.csv';
  console.log(file)
  d3.select("#donutChart").selectAll("*").remove();


  // set the dimensions and margins of the graph
  const container = d3.select("#donutChart");
  const width = container.node().getBoundingClientRect().width;
  const height = container.node().getBoundingClientRect().height;
  const margin = 70;

  // The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
  const radius = Math.min(width, height) / 2 - margin

  // append the svg object to the div called 'my_dataviz'
  const svg = d3.select("#donutChart")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", `translate(${width / 2},${height / 2})`);

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

  d3.csv(file).then(function (data) {
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
      .attrTween("d", function (d) {
        const interpolate = d3.interpolate({ startAngle: 0, endAngle: 0 }, d);
        return function (t) {
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
      .attr('points', function (d) {
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
      .text(d => isSliceLargeEnough(d) ? d.data.waste_type + " " + String(getPercentageForLabel(d)) + "%" : '')
      .attr('transform', function (d) {
        const pos = outerArc.centroid(d);
        const midangle = d.startAngle + (d.endAngle - d.startAngle) / 2
        pos[0] = radius * 0.99 * (midangle < Math.PI ? 1 : -1);
        pos[1] = pos[1] + 6;
        return `translate(${pos})`;
      })
      .style('text-anchor', function (d) {
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
  drawTest(props.file)
})

</script>

<template>
  <div id="chart-container" class="w-full h-full p-16">
    <div class="w-full grid grid-rows-2">
      <div class="join w-full grid grid-cols-2 pb-5">
        <button @click="previousYear" class="join-item btn btn-outline">Previous</button>
        <button @click="nextYear" class="join-item btn btn-outline">Next</button>
      </div>
      <input :value="selectedYear" type="range" min="2000" max="2015" class="range" step="1" @input="handleYearChange" />
      <div class="w-full flex justify-between text-xl px-2">
        <span>2000</span>
        <span>2003</span>
        <span>2006</span>
        <span>2009</span>
        <span>2012</span>
        <span>2015</span>
      </div>
    </div>
    <div id="donutChart" class="w-full h-full">
    </div>
  </div>
</template>

<style scoped>
#chart-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

#donutChart {
  width: 90%;
  display: flex;
  justify-content: center;
}
</style>
