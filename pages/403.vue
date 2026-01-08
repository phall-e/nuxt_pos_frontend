<template>
  <div class="text-center mt-20">
    <el-image
      :src="accessDenied"
      class="h-[150px] mb-5 animate-bounce"
    />
    <h1 class="text-3xl font-bold text-red-500">403 - Access Denied</h1>
    <p>អ្នកមិនមានសិទ្ធិចូលទំព័រនេះទេ។</p>

    <NuxtLink to="/" class="text-blue-500 underline">
      ត្រឡប់ទៅទំព័រដើម
    </NuxtLink>
  </div>
</template>

<script lang="ts" setup>
  import accessDenied from '@/assets/system/access-denied.png';

</script>
