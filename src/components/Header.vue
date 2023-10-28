<script lang="ts">
import { useRouter } from 'vue-router'
import { BrandGithub } from '@vicons/tabler'


export default {
    setup () {
        const router = useRouter()
        return {
            router
        }
    },
     components: {
        BrandGithub
     },
    created() {
        this.$router.afterEach((to, _) => {
        switch (to.name) {
            case 'home':
            this.barColor = '#edf1f9'
            this.ghStyle = "btn btn-circle btn-neural"
            break
            case 'page1':
            this.barColor = '#fffae8'
            this.ghStyle = "btn btn-circle btn-primary"
            break
            case 'page2':
            this.barColor = '#e2f4f6'
            this.ghStyle = "btn btn-circle btn-secondary"
            break
            case 'page3':
            this.barColor = '#eee9f6'
            this.ghStyle = "btn btn-circle btn-accent"
            break
            default:
            this.barColor = '#edf1f9'
            this.ghStyle = "btn btn-circle btn-neural"
        }
    })
  },
  data() {
    return {
        barColor: '#edf1f9',
        ghStyle: "btn btn-circle btn-neural"
    }
  },
  methods: {
    getGhStyle () {
        return this.ghStyle
    },
  }
}
</script>

<template>
    <div :style="{ backgroundColor: barColor }" class="navbar">
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
            <button :class="getGhStyle()">
                <BrandGithub class="h-5 w-5"/>
            </button>
        </div>
      </div>
</template>

<style scoped>
</style>