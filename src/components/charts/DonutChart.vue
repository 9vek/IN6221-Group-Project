<script setup lang="ts">
import { defineProps, onMounted, ref } from 'vue'
import * as d3 from "d3"

const selectedYear = ref(0);

const updateData = ref<(input: number) => void>(() => { });

const nextYear = () => {
  if (selectedYear.value < 15) {
    selectedYear.value += 1
    updateData.value(selectedYear.value);
  }
};

const previousYear = () => {
  if (selectedYear.value > 0) {
    selectedYear.value -= 1
    updateData.value(selectedYear.value);
  }
};

const handleYearChange = (event) => {
  selectedYear.value = Number(event.target.value);
  updateData.value(selectedYear.value);
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

const drawTest = (filePath: string, updateDataRef: any, selectedYearRef: any) => {
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
    .range(['#F49CAB', '#F8A593','#FAB473', '#F6D45C', '#C1EA4E', '#B1E470', '#8EE387', '#75E2CE', '#7CD4F0', '#6AA2E5', '#8286E7', '#9C7FDB', '#D29EF3', '#EFACDC']);

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

  Promise.all([
    d3.csv(filePath + '/2000.csv'),
    d3.csv(filePath + '/2001.csv'),
    d3.csv(filePath + '/2002.csv'),
    d3.csv(filePath + '/2003.csv'),
    d3.csv(filePath + '/2004.csv'),
    d3.csv(filePath + '/2005.csv'),
    d3.csv(filePath + '/2006.csv'),
    d3.csv(filePath + '/2007.csv'),
    d3.csv(filePath + '/2008.csv'),
    d3.csv(filePath + '/2009.csv'),
    d3.csv(filePath + '/2010.csv'),
    d3.csv(filePath + '/2011.csv'),
    d3.csv(filePath + '/2012.csv'),
    d3.csv(filePath + '/2013.csv'),
    d3.csv(filePath + '/2014.csv'),
    d3.csv(filePath + '/2015.csv')
  ]).then(function (data) {

    updateDataRef.value = (input: number) => {
      console.log(input)
      d3.select("#donutChart").selectAll("text").remove();
      d3.select("#donutChart").selectAll("polyline").remove();
      
      const pieData = pie(data[input])

      const slices = svg
        .selectAll('path')
        .data(pieData);

      slices
      .enter()
      .append('path')
      .merge(slices)
      .attr('fill', d => color(d.data.waste_type))
      .attr("stroke", "white")
      .style("stroke-width", "2px")
      .transition()
      .duration(1000)
      .attrTween("d", function (d) {
        // Use d3.interpolate to compute the smooth transition between the old and new data
        const previous = this._current || { startAngle: 0, endAngle: 0 };
        const interpolate = d3.interpolate(previous, d);
        this._current = interpolate(1); // Save the current data for the next update
        return function (t) {
          return arc(interpolate(t));
        };
      });

      slices.exit().remove(); // Remove any unnecessary slices



      // Add the polylines between chart and labels:
      svg
        .selectAll('allPolylines')
        .data(pieData)
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
        .data(pieData)
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
      }

    updateDataRef.value(selectedYearRef.value)
  })
}

onMounted(() => {
  drawTest(props.file, updateData, selectedYear)
})

</script>

<template>
  <div id="chart-container" class="w-full h-full p-16">
    <div class="w-full grid grid-rows-2">
      <div class="join w-full grid grid-cols-2 pb-5">
        <button @click="previousYear" class="join-item btn btn-outline">Previous</button>
        <button @click="nextYear" class="join-item btn btn-outline">Next</button>
      </div>
      <input :value="selectedYear" type="range" min="0" max="15" class="range" step="1" @input="handleYearChange" />
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
  width: 120%;
  display: flex;
  justify-content: center;
}
</style>
