<script setup lang='ts'>
import { useRouter } from 'vue-router'

const router = useRouter()

</script>

<template>
    <div class="w-full bg-stone-900 h-16 px-2 grid grid-cols-1 place-items-center">
        <div class="flex">
            <div @click="() => router.push('/')" class="h-full cursor-pointer p-4 m-2 text-white grid grid-cols-1 place-items-center">
                1
            </div>
            <div @click="() => router.push('/1')" class="h-full cursor-pointer p-4 m-2 text-white grid grid-cols-1 place-items-center">
                2
            </div>
            <div @click="() => router.push('/2')" class="h-full cursor-pointer p-4 m-2 text-white grid grid-cols-1 place-items-center">
                3
            </div>
            <div @click="() => router.push('/3')" class="h-full cursor-pointer p-4 m-2 text-white grid grid-cols-1 place-items-center">
                4
            </div>
        </div>

    </div>
</template>

<style scoped></style>