<script setup lang='ts'>
import { useRouter } from 'vue-router'

const router = useRouter()

</script>

<template>
    <div class="navbar bg-neutral text-neutral-content">
        <div class="navbar-start">
          <div class="dropdown">
            <label tabindex="0" class="btn btn-ghost lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
            </label>
            <ul tabindex="0" class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                <li @click="() => router.push('/')"><a>Item 1</a></li>
                <li @click="() => router.push('/1')"><a>Item 2</a></li>
                <li @click="() => router.push('/2')"><a>Item 3</a></li>
                <li @click="() => router.push('/3')"><a>Item 4</a></li>
            </ul>
          </div>
          <a @click="() => router.push('/')" class="btn btn-ghost normal-case text-xl">daisyUI</a>
        </div>
        <div class="navbar-center hidden lg:flex">
          <ul class="menu menu-horizontal px-1">
            <li @click="() => router.push('/')"><a>Item 1</a></li>
            <li @click="() => router.push('/1')"><a>Item 2</a></li>
            <li @click="() => router.push('/2')"><a>Item 3</a></li>
            <li @click="() => router.push('/3')"><a>Item 4</a></li>
          </ul>
        </div>
      </div>
</template>

<style scoped></style>