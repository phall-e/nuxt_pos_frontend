<template>
  <el-scrollbar>
    <div class="w-full flex items-center justify-center flex-col py-5">
      <el-image
        :src="logo"
        :class="collapse.isCollapsed ? 'w-[40px]' : 'w-[210px]'"
      />
      <h1 v-if="!collapse.isCollapsed" class="text-white text-[16px] mt-2">ប្រព័ន្ធ គ្រប់គ្រងការលក់​ ខ្នាតតូច</h1>
    </div>
    <!-- Menu Item -->    
    <NavItem
      v-for="item in navigationItems"
      :key="item.title"
      :item="item"
    />

  </el-scrollbar>
</template>

<script lang="ts" setup>
  import logo from '@/assets/logo/logo.png';
  import navigationItems from '~/navigations';

  const collapse = useCollapseStore();
</script>

<style>

</style>