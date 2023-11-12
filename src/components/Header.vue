<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { BrandGithub } from '@vicons/tabler'

const router = useRouter()

const barColor = ref('#edf1f9')
const ghStyle = ref('btn btn-circle btn-neural')
const btn1Style = ref('btn btn-primary')
const btn2Style = ref('btn btn-primary')
const btn3Style = ref('btn btn-secondary')
const btn4Style = ref('btn btn-secondary')
const btn5Style = ref('btn btn-accent')
const btn6Style = ref('btn btn-accent')

const gh = () => {
  window.open("https://github.com/9vek/IN6221-Group-Project")
};

router.afterEach((to, _) => {
  if (to.path == '/') {
    barColor.value = '#edf1f9'
    ghStyle.value = "btn btn-circle btn-neural"
    btn1Style.value = 'btn btn-primary'
    btn2Style.value = 'btn btn-primary'
    btn3Style.value = 'btn btn-secondary'
    btn4Style.value = 'btn btn-secondary'
    btn5Style.value = 'btn btn-accent'
    btn6Style.value = 'btn btn-accent'
  }
  else if (to.path == '/1') {
    barColor.value = '#fffae8'
    ghStyle.value = "btn btn-circle btn-primary"
    btn1Style.value += ' btn-active'
    btn2Style.value = 'btn btn-primary'
    btn3Style.value = 'btn btn-secondary'
    btn4Style.value = 'btn btn-secondary'
    btn5Style.value = 'btn btn-accent'
    btn6Style.value = 'btn btn-accent'
  }
  else if (to.path == '/2') {
    barColor.value = '#fffae8'
    ghStyle.value = "btn btn-circle btn-primary"
    btn1Style.value = 'btn btn-primary'
    btn2Style.value += ' btn-active'
    btn3Style.value = 'btn btn-secondary'
    btn4Style.value = 'btn btn-secondary'
    btn5Style.value = 'btn btn-accent'
    btn6Style.value = 'btn btn-accent'
  }
  else if (to.path == '/3'){
    barColor.value = '#e2f4f6'
    ghStyle.value = "btn btn-circle btn-secondary"
    btn1Style.value = 'btn btn-primary'
    btn2Style.value = 'btn btn-primary'
    btn3Style.value += ' btn-active'
    btn4Style.value = 'btn btn-secondary'
    btn5Style.value = 'btn btn-accent'
    btn6Style.value = 'btn btn-accent'
  }  
  else if (to.path == '/4'){
    barColor.value = '#e2f4f6'
    ghStyle.value = "btn btn-circle btn-secondary"
    btn1Style.value = 'btn btn-primary'
    btn2Style.value = 'btn btn-primary'
    btn3Style.value = 'btn btn-secondary'
    btn4Style.value += ' btn-active'
    btn5Style.value = 'btn btn-accent'
    btn6Style.value = 'btn btn-accent'
  }
  else if (to.path == '/5'){
    barColor.value = '#eee9f6'
    ghStyle.value = "btn btn-circle btn-accent"
    btn1Style.value = 'btn btn-primary'
    btn2Style.value = 'btn btn-primary'
    btn3Style.value = 'btn btn-secondary'
    btn4Style.value = 'btn btn-secondary'
    btn5Style.value += ' btn-active'
    btn6Style.value = 'btn btn-accent'
  }
  else if (to.path == '/6'){
    barColor.value = '#eee9f6'
    ghStyle.value = "btn btn-circle btn-accent"
    btn1Style.value = 'btn btn-primary'
    btn2Style.value = 'btn btn-primary'
    btn3Style.value = 'btn btn-secondary'
    btn4Style.value = 'btn btn-secondary'
    btn5Style.value = 'btn btn-accent'
    btn6Style.value += ' btn-active'
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
        <button @click="() => router.push('/1')" :class="btn1Style">
          Recycling Rates
        </button>
        <button @click="() => router.push('/2')" :class="btn2Style">
          Recycling Journey
        </button>
        <button @click="() => router.push('/3')" :class="btn3Style">
          SG Recycling Map
        </button>
        <button @click="() => router.push('/4')" :class="btn4Style">
          Recycling Benifits
        </button>
        <button @click="() => router.push('/5')" :class="btn5Style">
          Waste Incineration
        </button>
        <button @click="() => router.push('/6')" :class="btn6Style">
          Waste Landfill
        </button>
      </ul>
    </div>

    <div class="navbar-end">
      <button @click="gh" class="transition-all" :class="ghStyle">
        <BrandGithub class="h-5 w-5" />
      </button>
    </div>
  </div>
</template>

<style scoped></style>