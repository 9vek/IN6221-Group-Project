<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { BrandGithub } from '@vicons/tabler'

const router = useRouter()

const barColor = ref('#edf1f9')
const ghStyle = ref('btn btn-circle btn-neural')

router.afterEach((to, _) => {
  if (to.path == '/') {
    barColor.value = '#edf1f9'
    ghStyle.value = "btn btn-circle btn-neural"
  }
  else if (to.path == '/1') {
    barColor.value = '#fffae8'
    ghStyle.value = "btn btn-circle btn-primary"
  }
  else if (to.path == '/2') {
    barColor.value = '#e2f4f6'
    ghStyle.value = "btn btn-circle btn-secondary"
  }
  else {
    barColor.value = '#eee9f6'
    ghStyle.value = "btn btn-circle btn-accent"
  }
})
</script>

<template>
  <div :style="{ backgroundColor: barColor }" class="navbar transition-all">
    <div class="navbar-start">
      <a @click="() => router.push('/')" class="btn btn-ghost normal-case text-xl">Home</a>
    </div>

    <div class="navbar-center lg:flex">
      <ul class="menu menu-horizontal gap-2">
        <button @click="() => router.push('/1')" class="btn btn-primary">
          Item 1
        </button>
        <button @click="() => router.push('/2')" class="btn btn-secondary">
          Item 2
        </button>
        <button @click="() => router.push('/3')" class="btn btn-accent">
          Item 3
        </button>
      </ul>
    </div>

    <div class="navbar-end">
      <button class="transition-all" :class="ghStyle">
        <BrandGithub class="h-5 w-5" />
      </button>
    </div>
  </div>
</template>

<style scoped></style>