<template>
    <TablesMain
       module-name="user"
      :page-header-options="{
        pageTitle: 'menu.role',
        breadcrumbs: breadcrumbs
      }"
      crud-path="admin/system/roles"
      :headers="headers"
      :table-options="options"
      ref="listRef"
    >
      <template #form="{ formRef }">
        <RoleForm :form-ref="formRef"/>
      </template>
    </TablesMain>
</template>

<script setup lang="ts">
import type { Headers } from '~/types/header.type';
import type { UseCrudOption } from '~/types/UseCrudOption';

    definePageMeta({
      permissions: ['read-role'],
    });

    const breadcrumbs = ['system', 'role', 'list'];
    const headers: Headers[] = [
    {
      title: 'columns.name',
      key: 'name',
      width: 400,
    },
    {
      title: 'columns.description',
      key: 'description',
      width: 400,
    },    
  ];

  const options: UseCrudOption = {
    defaultCreateValue: {
      permissions: [],
    },
    mapEditValue: (data: any) => (console.log(data), {
      ...data,
      permissions: data.permissions && data.permissions.length > 0 ?
        data.permissions.map((item: any) => item.id)
        : [],
    }),
    dialogOptions: {
      fullscreen: true,
    }
  }
</script>
