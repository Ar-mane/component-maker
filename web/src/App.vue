<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { marked } from 'marked'

const readmeContent = ref<string>(''); // to store the content of the README

onMounted(async () => {
  try {
    const response = await fetch('/README.md');
    if (response.ok) {
      readmeContent.value = await response.text();
    } else {
      console.error('Failed to fetch README:', response.status, response.statusText);
    }
  } catch (error) {
    console.error('Error fetching README:', error);
  }
});
</script>

<template>
  <div class="w-full flex items-center text-center flex-col p-20">
    <a href="https://marketplace.visualstudio.com/items?itemName=Ar-mane.component-maker" target="_blank">
      <img src="/ico.svg" class="w-60" alt="CM Logo" />
    </a>
    <a href="https://github.com/Ar-mane/component-maker" target="_blank">
      <div class="flex flex-row gap-2 bg-blue-100 rounded-lg p-5 hover:bg-blue-400"> <img src="/github-logo.png"
          class="w-6" alt="contibute" /> Contibute ? </div>
    </a>
    <div v-html="marked(readmeContent)"></div>
  </div>
</template>
 