<script setup lang='ts'>
import mapBubble from '../components/charts/Map+Bubble.vue'

import { ref } from 'vue'
const ewasteRec = ref('./src/data/geo/EwasteRecycling_NEW.geojson')
</script>

<template>
    <div class="bg-primary">
      <div class="columns-2">
        <mapBubble :file="ewasteRec"/>
      </div>
    </div>
</template>

<style scoped></style>