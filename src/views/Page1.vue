<script setup lang='ts'>
import map_bubble from '../components/charts/Map+Bubble.vue'

import { ref } from 'vue'
const ewaste_rec = ref('./src/data/geo/EwasteRecycling_NEW.geojson')
</script>

<template>
    <div class="bg-primary">
      <div class="columns-2">
        <map_bubble :file="ewaste_rec"/>
      </div>
    </div>
</template>

<style scoped></style>