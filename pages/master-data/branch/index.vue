<template>

    <TablesMain
      module-name="branch"
      :page-header-options="{
        pageTitle: 'menu.branch',
        breadcrumbs: breadcrumbs
      }"
      crud-path="admin/master-data/branch"
      :headers="headers"
      :table-options="options"
    >
      <template #form="{ formRef }">
        <BranchForm :form-ref="formRef"/>
      </template>
      <template #item.createdBy="{ item }">
        {{ item?.createdBy.username }}
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
    permissions: ['read-branch'],
  });

  const breadcrumbs = ['menu.master_data', 'menu.branch'];
  const headers: Headers[] = [
    {
      title: 'columns.code',
      key: 'code',
    },
    {
      title: 'columns.name_en',
      key: 'nameEn',
    }, 
    {
      title: 'columns.name_kh',
      key: 'nameKh',
    },   
    {
      title: 'columns.manager',
      key: 'managerName',
    },   
    {
      title: 'columns.phone_number',
      key: 'phoneNumber',
    }, 
    {
      title: 'columns.address',
      key: 'address',
    }, 
    {
      title: 'columns.created_by',
      key: 'createdBy',
    }, 
    {
      title: 'columns.created_at',
      key: 'createdAt',
    }, 
  ];


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