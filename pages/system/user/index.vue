<template>

    <TablesMain
      module-name="user"
      :page-header-options="{
        pageTitle: 'menu.user',
        breadcrumbs: breadcrumbs
      }"
      crud-path="admin/system/users"
      :headers="headers"
      :table-options="options"
      ref="listRef"
    >
      <template #form="{ formRef }">
        <UserForm :form-ref="formRef"/>
      </template>
      <template #item.roles="{ item }">
        <el-tag 
          v-if="item.roles && item.roles.length > 0"
          round
        >
          {{ item.roles.length }}
        </el-tag>
        <span v-else />
      </template>
      <template #item.branches="{ item }">
        <el-tag 
          v-if="item.branches && item.branches.length > 0"
          type="primary"
          round
        >
          {{ item.branches.length }}
        </el-tag>
        <span v-else />
      </template>
      <template #item.isAdmin="{ item }">
        <Icon 
          name="bitcoin-icons:verify-outline"
          v-if="item.isAdmin === true"
          class="text-blue-700"
          :size="30"
        />
        <span v-else></span>
      </template>
      <template #item.isActive="{ item }">
       <el-tag
       @click="callList"
        :type="item.isActive ? 'success' : 'danger'"
       >
        {{ item.isActive ? $t('active') : $t('inactive') }}
       </el-tag>
      </template>
      <template #item.createdAt="{ item }">
        {{ dateFormatter(item.createdAt) }}
      </template>
    </TablesMain>
</template>

<script setup lang="ts">
import type { Headers } from '~/types/header.type';
import type { UseCrudOption } from '~/types/UseCrudOption';

  definePageMeta({
    permissions: ['read-stock-in'],
  });

  const breadcrumbs = ['menu.system', 'menu.user'];
  const headers: Headers[] = [
    {
      title: 'columns.username',
      key: 'username',
    },
    {
      title: 'menu.role',
      key: 'roles',
    }, 
    {
      title: 'menu.branch',
      key: 'branches',
    },   
    {
      title: 'columns.is_admin',
      key: 'isAdmin',
    },   
    {
      title: 'columns.status',
      key: 'isActive',
    }, 
    {
      title: 'columns.created_at',
      key: 'createdAt',
    }, 
  ];

  const listRef = ref<any>(null);

  const callList = () => {
    listRef.value?.refreshList();
  }

  const options: UseCrudOption = {
    defaultCreateValue: {
      isActive: true,
    },
    mapEditValue: (data: any) => (console.log(data), {
      ...data,
      branch: data.branches && data.branches.length > 0 ? data.branches.map((e: any) => e.id) : [],
      roles: data.roles && data.roles.length > 0 ? data.roles.map((e: any) => e.id) : [],
    }),
    dialogOptions: {
    }
  }
</script>