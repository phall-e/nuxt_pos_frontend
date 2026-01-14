<template>
    <TablesMain
      module-name="uom"
      :page-header-options="{
        pageTitle: 'menu.customer_type',
        breadcrumbs: breadcrumbs
      }"
      crud-path="admin/master-data/customer-type"
      :headers="headers"
      :table-options="options"
    >
      <template #form="{ formRef }">
        <CustomerTypeForm :form-ref="formRef"/>
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
    permissions: ['read-customer-type'],
  });

  const breadcrumbs = ['menu.master_data', 'menu.customer_type'];
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
    
    },
    mapEditValue: (data: any) => ({
      ...data,
    }),
    dialogOptions: {
    }
  }
</script>