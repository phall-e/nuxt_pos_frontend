<template>

    <TablesMain
      module-name="supplier"
      :page-header-options="{
        pageTitle: 'menu.supplier',
        breadcrumbs: breadcrumbs
      }"
      crud-path="admin/master-data/supplier"
      :headers="headers"
      :table-options="options"
    >
      <template #form="{ formRef }">
        <SupplierForm :form-ref="formRef"/>
      </template>
      <template #item.createdBy="{ item }">
        {{ item?.createdBy.username }}
      </template>
      <template #item.createdAt="{ item }">
        {{ dateFormatter(item.createdAt) }}
      </template>
      <template #item.attachment="{ item }">
        <el-image
          :src="item?.attachment"
          style="width: 50px; height: 50px"
          fit="cover"
        />
      </template>
    </TablesMain>
</template>

<script setup lang="ts">
import type { Headers } from '~/types/header.type';
import type { UseCrudOption } from '~/types/UseCrudOption';

  definePageMeta({
    permissions: ['read-supplier'],
  });

  const breadcrumbs = ['menu.master_data', 'menu.supplier'];
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
    {
      title: 'columns.attachment',
      key: 'attachment',
    }, 
  ];


  const options: UseCrudOption = {
    defaultCreateValue: {
      isActive: true,
    },
    mapEditValue: (data: any) => (console.log(data), {
      ...data,
    }),
    dialogOptions: {
      width: 900
    }
  }
</script>