<template>
  <div class="font-Nokora">
    <NuxtLayout>
      <NuxtPage v-if="ready" />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
  const ready = computed(() => process.client ? true : false)
</script>
