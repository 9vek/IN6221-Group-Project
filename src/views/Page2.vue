<script setup lang='ts'>
import bar_chart from '../components/bar_chart.vue'
import line_chart from '../components/line_chart.vue'
</script>

<template>
    <div class="hero min-h-screen bg-secondary">
      <div class="columns-2">
        <bar_chart/>
        <bar_chart/>
        <line_chart/>
        <line_chart/>
      </div>
      </div>
</template>

<style scoped></style>