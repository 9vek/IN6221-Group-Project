<script setup lang='ts'>
import * as d3 from 'd3'
import TextWithTitle from '../components/charts/TextWithTitle.vue';
import hp0 from '../assets/hp0.png'
import hp1 from '../assets/hp1.jpg'
import hp2 from '../assets/hp2.jpg'
import hp3 from '../assets/hp3.jpg'
import hp4 from '../assets/hp4.jpg'
import { hpText } from '../data/text'
import { onMounted } from 'vue';


const drawTest = () => {
  // 模拟的数据
  const nodes = [
    { id: "node1", image: hp0, r: 200 },
    { id: "node2", image: hp1, r: 150 },
    { id: "node3", image: hp2, r: 110 },
    { id: "node4", image: hp3, r: 130 },
    { id: "node5", image: hp4, r: 130 },
    // ... 其他节点
  ];

  const links = [
    // { source: "node1", target: "node2" },
    // ... 其他链接
  ];

  const container = d3.select("#force");
  const width = container.node().getBoundingClientRect().width;
  const height = container.node().getBoundingClientRect().height;

  // 创建 SVG 元素
  const svg = d3.select("#force").append("svg")
    .attr("width", width)
    .attr("height", height);

  // 定义圆形图片
  const defs = svg.append("defs");
  nodes.forEach(function (d) {
    const pattern = defs.append("pattern")
      .attr("id", d.id)
      .attr("height", 1)
      .attr("width", 1)
      .attr("patternContentUnits", "objectBoundingBox");
    pattern.append("image")
      .attr("height", 1)
      .attr("width", 1)
      .attr("preserveAspectRatio", "xMidYMid slice")
      .attr("xlink:href", d.image);
  });

  // 定义力模拟
  const simulation = d3.forceSimulation(nodes)
    .force("link", d3.forceLink(links).id(d => d.id).distance(400)) // 增加链接距离
    .force("charge", d3.forceManyBody().strength(-200)) // 增加排斥力
    .force("center", d3.forceCenter(width / 2, height / 2))
    .force("collide", d3.forceCollide().radius(30)); // 添加碰撞力，半径大于节点半径


  // 添加链接
  const link = svg.append("g")
    .selectAll("line")
    .data(links)
    .enter().append("line")
    .attr("stroke-width", 2);

  // 添加节点
  const node = svg.append("g")
    .selectAll("circle")
    .data(nodes)
    .enter().append("circle")
    .attr("r", function (d) {
      return d.r;
    }) // 节点的半径
    .style("fill", function (d) {
      return "url(#" + d.id + ")";
    })
    .style("stroke", "#ffffff")
    .style("stroke-width", "8px")

  // 力模拟的运动
  simulation.on("tick", () => {
    link.attr("x1", d => d.source.x)
      .attr("y1", d => d.source.y)
      .attr("x2", d => d.target.x)
      .attr("y2", d => d.target.y);

    node.attr("cx", d => d.x)
      .attr("cy", d => d.y);
  });
}
onMounted(() => {
  drawTest()
})
</script>

<template>
  <div class="bg-base-200 h-screen grid grid-cols-2">
    <!-- <div class="col-span-2"> -->
    <div id="force" class=""></div>
    <!-- </div> -->
    <div class="pr-16 grid grid-cols-1 place-items-center">
      <TextWithTitle :title="'Mapping Singapore\'s Green Revolution: A Dive into Waste Management and Recycling Statistics'" :text="hpText" />
    </div>
    
  </div>

  <!-- <img :src="hp1" class="w-96 h-96 bg-stone-50 rounded-full p-2 shadow-md"> -->
  <!-- <div class="hero-content text-center">
        <div class="max-w-md">
          <h1 class="text-5xl font-bold">Hello there</h1>
          <p class="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
          <button class="btn btn-primary">Get Started</button>
        </div>
      </div> -->
</template>

<style scoped></style>