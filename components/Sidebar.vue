<template>
  <el-scrollbar>
    <div class="w-full flex items-center justify-center flex-col py-5">
      <el-image
        :src="logo"
        class="h-[80px]"
      />
      <h1 class="text-white text-[20px]">គ្រប់គ្រងការលក់</h1>
    </div>
    <!-- Menu Item -->
    <div class="text-white flex items-center">
      <div class="flex items-center justify-center h-[40px] w-[40px]">
        <Icon :size="20" name="lsicon:setting-outline"/>
      </div>
      <div>ការកំណត់</div>
    </div>
    
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
</script>

<style>

</style>