<template>
  <div class="font-Nokora">
    <NuxtLayout>
      <NuxtPage/>
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
  const ready = computed(() => process.client ? true : false)
</script>
