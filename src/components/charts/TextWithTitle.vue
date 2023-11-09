<script setup lang="ts">

const props = defineProps<{
    title: string
    text: string
}>()

</script>

<template>
    <div class='h-full w-full px-16 py-64'>
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