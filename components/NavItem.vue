<template>
   <NuxtLink
    v-if="item.moduleName"
    :to="item.to"
    class="text-white flex items-center"
    active-class="!text-red-500"
    v-can="`read-${item.moduleName}`"
  >
    <div class="flex items-center justify-center" :class="collapse.isCollapsed ? 'h-[50px] w-[50px]' : 'h-[40px] w-[40px]'">
      <Icon :size="20" :name="item.icon"/>
    </div>
    <div v-if="!collapse.isCollapsed" class="text-[15px]">{{ $t(item.title) }}</div>
  </NuxtLink>
  <NuxtLink
    v-else
    :to="item.to"
    class="text-white flex items-center"
    active-class="!text-red-500"
  >
    <div class="flex items-center justify-center" :class="collapse.isCollapsed ? 'h-[50px] w-[50px]' : 'h-[40px] w-[40px]'">
      <Icon :size="20" :name="item.icon"/>
    </div>
    <div v-if="!collapse.isCollapsed" class="text-[15px]">{{ $t(item.title) }}</div>
  </NuxtLink>
</template>

<script setup lang="ts">
import type { NavigationItem } from '~/types/NavigationItem';

defineProps<{ item: NavigationItem }>()

const collapse = useCollapseStore();
</script>