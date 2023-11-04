<script setup lang='ts'>
import pie_chart from '../components/pie_chart.vue'
import donut_chart from '../components/donut_chart.vue'
import treemap from '../components/treemap.vue'
</script>

<template>
    <div class="hero min-h-screen bg-accent">
      <div class="columns-2">
        <pie_chart/>
        <donut_chart/>
        <treemap/>
      </div>
    </div>
</template>

<style scoped></style>