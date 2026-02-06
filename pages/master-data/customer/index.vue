<template>

    <TablesMain
      module-name="customer"
      :page-header-options="{
        pageTitle: 'menu.customer',
        breadcrumbs: breadcrumbs
      }"
      crud-path="admin/master-data/customer"
      :headers="headers"
      :table-options="options"
    >
      <template #form="{ formRef }">
        <CustomerForm :form-ref="formRef"/>
      </template>
      <template #item.createdBy="{ item }">
        {{ item?.createdBy?.username }}
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
    permissions: ['read-customer'],
  });

  const breadcrumbs = ['menu.master_data', 'menu.customer'];
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
      title: 'columns.phone_number',
      key: 'phoneNumber',
    }, 
    {
      title: 'columns.address',
      key: 'address',
    }, 
    {
      title: 'columns.note',
      key: 'note',
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
      customerTypeId: 1,
    },
    mapEditValue: (data: any) => (console.log(data), {
      ...data,
    }),
    dialogOptions: {
      fullscreen: true,
    }
  }
</script>