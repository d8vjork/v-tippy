<template>
  <div class="flex flex-col items-center space-y-6 justify-center container py-16">
    <div v-tooltip.left="content">
      Hover me
    </div>

    <div v-tooltip.bottom="content">
      Hover me (bottom)
    </div>
    
    <div v-tooltip="{ content, class: 'font-bold' }">
      Hover me (another bottom)
    </div>

    <button @click="changeTooltips">Change tooltips</button>
  </div>
</template>

<script setup>
import { ref } from '@vue/reactivity';

const content = ref("Hello world")

const changeTooltips = () => content.value = content.value === "Hello world" ? "Hola mundo" : "Hello world"
</script>