<template>
    <TablesMain
      module-name="product"
      :page-header-options="{
        pageTitle: 'menu.product',
        breadcrumbs: breadcrumbs
      }"
      crud-path="admin/master-data/product"
      :headers="headers"
      :table-options="options"
    >
      <template #form="{ formRef }">
        <ProductForm :form-ref="formRef"/>
      </template>
      <template #item.category="{ item }">
        {{ item?.category.nameEn }}
      </template>
      <template #item.uom="{ item }">
        {{ item?.uom.nameEn }}
      </template>
      <template #item.createdBy="{ item }">
        {{ item?.createdBy.username }}
      </template>
      <template #item.createdAt="{ item }">
        {{ dateFormatter(item.createdAt) }}
      </template>
      <template #item.unitPrice="{ item }">
        {{ formatCurrencyUSD(item.unitPrice) }}
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
    permissions: ['read-product'],
  });

  const breadcrumbs = ['menu.master_data', 'menu.product'];
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
      title: 'menu.category',
      key: 'category',
    }, 
    {
      title: 'menu.uom',
      key: 'uom',
    }, 
    {
      title: 'columns.unit_price',
      key: 'unitPrice',
    }, 
    {
      title: 'columns.description',
      key: 'description',
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
      
    },
    mapEditValue: (data: any) => ({
      ...data,
    }),
    dialogOptions: {
    }
  }
</script>