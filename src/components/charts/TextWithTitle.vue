<script setup lang="ts">

const props = defineProps<{
    title: string
    text: string
}>()

</script>

<template>
    <div class='h-fit w-fit px-16 pt-16 pb-8'>
        <div class="text-3xl font-bold">
            {{ props.title }}
        </div>
        <div class="mt-4">
            {{ props.text }}
        </div>
    </div>
</template>

<scoped scoped>
</scoped>