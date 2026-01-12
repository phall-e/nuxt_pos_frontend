<template>
    <TablesMain
      module-name="stock"
      :page-header-options="{
        pageTitle: 'menu.stock',
        breadcrumbs: breadcrumbs
      }"
      crud-path="admin/stocking/stock"
      :headers="headers"
      :table-options="options"
    >
      <template #form="{ formRef }">
        <StockForm :form-ref="formRef"/>
      </template>
      <template #item.code="{ item }">
        {{ item?.product.code }}
      </template>
      <template #item.product="{ item }">
        <span class="line-clamp-1">{{ item?.product.nameEn }}</span>
      </template>
      <template #item.branch="{ item }">
        {{ item?.branch.nameKh }}
      </template>
      <template #item.stockOnhand="{ item }">
        {{ (Number(item.stockIn) + Number(item.stockAdjustment) + Number(item.stockTransfer)) - Number(item.stockOut) }}
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
    permissions: ['read-stock'],
  });

  const breadcrumbs = ['menu.stocking', 'menu.stock'];
  const headers: Headers[] = [
    {
      title: 'columns.code',
      key: 'code',
      width: 100,
    },
    {
      title: 'columns.product_name',
      key: 'product',
      width: 400,
    },
    {
      title: 'menu.branch',
      key: 'branch',
    }, 
    {
      title: 'columns.min_stock',
      key: 'minStock',
    }, 
    {
      title: 'columns.stock_onhand',
      key: 'stockOnhand',
    },  
    {
      title: 'menu.stock_in',
      key: 'stockIn',
    },
    {
      title: 'columns.stock_out',
      key: 'stockOut',
    },
    {
      title: 'menu.stock_adjustment',
      key: 'stockOut',
    },
    {
      title: 'menu.stock_transfer',
      key: 'stockTransfer',
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
      items: [],
    },
    mapEditValue: (data: any) => ({
      ...data,
      stockOnhand: (Number(data.stockIn) + Number(data.stockAdjustment) + Number(data.stockTransfer)) - Number(data.stockOut)
    }),
    dialogOptions: {
      fullscreen: true,
    }
  }
</script>