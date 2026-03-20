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
     
    <el-collapse
      v-model="activeName"
      accordion
    >
      <template v-for="item in navigationItems" :key="item.title">
        <ElCollapseItem 
          v-if="item.children && item.children.length > 0" 
          :name="item.title" 
          class="bg-blue-900 text-white"
        >
          <template #title>
            <div class="flex items-center">
              <div class="h-[35px] w-[50px] flex items-center justify-center">
                <Icon :size="20" :name="item.icon"/>
              </div>
              <span v-if="!collapse.isCollapsed">{{ $t(item.title) }}</span>
            </div>
          </template>
          <NuxtLink v-for="subItem in item.children" :key="subItem.to" :to="subItem.to" class="flex items-center" exact-active-class="text-red-500">
            <div class="flex items-center">
              <div class="h-[35px] w-[50px] flex items-center justify-center">
                <Icon :size="20" :name="subItem.icon"/>
              </div>
              <span v-if="!collapse.isCollapsed">{{ $t(subItem.title) }}</span>
            </div>
          </NuxtLink>
        </ElCollapseItem>
      </template>
    </el-collapse>
  </el-scrollbar>
</template>

<script lang="ts" setup>
  import logo from '@/assets/logo/logo.png';
  import useNavigationItems from '~/navigations';

  const collapse = useCollapseStore();
  const activeName = ref('menu.dashboard');
  const navigationItems = useNavigationItems();
</script>

<style scoped>
::v-deep(.el-collapse) {
  background-color: white;
  color: white;
  border: none;
}

::v-deep(.el-collapse-item__header),
::v-deep(.el-collapse-item__wrap),
::v-deep(.el-collapse-item__content) {
  background-color: #1e40af;
  color: white;
  border:  none;
}
</style>
