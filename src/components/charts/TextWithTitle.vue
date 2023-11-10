<script setup lang="ts">

const props = defineProps<{
    title: string
    text: string
}>()

</script>

<template>
    <div class='h-fit w-fit px-16 py-32'>
        <div class="text-3xl font-bold">
            {{ props.title }}
        </div>
        <div>
            {{ props.text }}
        </div>
    </div>
</template>

<scoped scoped>
</scoped>