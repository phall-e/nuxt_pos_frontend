<template>
    <TablesMain
      module-name="stock-transfer"
      :page-header-options="{
        pageTitle: 'menu.stock_transfer',
        breadcrumbs: breadcrumbs
      }"
      crud-path="admin/stocking/stock-transfer"
      :headers="headers"
      :table-options="options"
    >
      <template #form="{ formRef }">
        <StockTransferForm :form-ref="formRef"/>
      </template>
      <template #item.fromBranch="{ item }">
        {{ item?.fromBranch[$t('name_lang')] }}
      </template>
      <template #item.toBranch="{ item }">
        {{ item?.toBranch[$t('name_lang')] }}
      </template>
      <template #item.transferDate="{ item }">
        {{ dateFormatter(item.transferDate) }}
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
    permissions: ['read-stock-transfer'],
  });

  const breadcrumbs = ['menu.stocking', 'menu.stock_transfer'];
  const headers: Headers[] = [
    {
      title: 'columns.code',
      key: 'code',
    },
    {
      title: 'columns.from_branch',
      key: 'fromBranch',
    }, 
    {
      title: 'columns.to_branch',
      key: 'toBranch',
    }, 
    {
      title: 'columns.transfer_date',
      key: 'transferDate',
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
      transferDate: new Date(),
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