<template>
    <TablesMain
      module-name="stock-adjustment"
      :page-header-options="{
        pageTitle: 'menu.stock_adjustment',
        breadcrumbs: breadcrumbs
      }"
      crud-path="admin/stocking/stock-adjustment"
      :headers="headers"
      :table-options="options"
    >
      <template #form="{ formRef }">
        <StockAdjustmentForm :form-ref="formRef"/>
      </template>
      <template #item.branch="{ item }">
        {{ item?.branch[$t('name_lang')] }}
      </template>
      <template #item.adjustmentDate="{ item }">
        {{ dateFormatter(item.adjustmentDate) }}
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
    permissions: ['read-stock-adjustment'],
  });

  const breadcrumbs = ['menu.stocking', 'menu.stock_adjustment'];
  const headers: Headers[] = [
    {
      title: 'columns.code',
      key: 'code',
    },
    {
      title: 'menu.branch',
      key: 'branch',
    }, 
    {
      title: 'columns.adjustment_date',
      key: 'adjustmentDate',
    },   
    {
      title: 'columns.description',
      key: 'description',
    }, 
    {
      title: 'columns.total_quantity',
      key: 'totalQuantity',
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

  const auth = useAuthenticationStore();

  const options: UseCrudOption = {
    defaultCreateValue: {
      adjustmentDate: new Date(),
      createdById: auth.users.id,
      totalQuantity: 0,
      items: [
        {
          id: null,
          categoryId: null,
          productId: null,
          uomId: null,
          quantity: 0,
        }
      ],
    },
     mapEditValue: (data: any) => ({
      ...data,
      items: data.items && data.items.length > 0 ? 
        data.items.map((item: any) => ({
          ...item,
          categoryId: item.product.categoryId,
          uomId: item.product.uomId,
        })) : [],
    }),
    dialogOptions: {
      fullscreen: true,
    }
  }
</script>