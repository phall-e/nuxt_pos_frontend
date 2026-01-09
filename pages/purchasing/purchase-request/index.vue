<template>

    <TablesMain
      module-name="purchase-request"
      :page-header-options="{
        pageTitle: 'menu.purchase_request',
        breadcrumbs: breadcrumbs
      }"
      crud-path="admin/purchasing/purchase-request"
      :headers="headers"
      :table-options="options"
    >
      <template #form="{ formRef }">
        <PurchaseRequestForm :form-ref="formRef"/>
      </template>
      <template #item.status="{ item }">
        <StatusModuleStatus :status="item.status"/>
      </template>
      <template #item.branch="{ item }">
        {{ item?.branch.nameEn }}
      </template>
      <template #item.createdBy="{ item }">
        {{ item?.createdBy.username }}
      </template>
      <template #item.approvedBy="{ item }">
        {{ item?.approvedBy ? item?.approvedBy.username : '-'}}
      </template>
      <template #item.createdAt="{ item }">
        {{ dateFormatter(item.createdAt) }}
      </template>
    </TablesMain>
</template>

<script setup lang="ts">
import type { Headers } from '~/types/header.type';
import { ModuleStatus } from '~/types/Status';
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
      title: 'columns.status',
      key: 'status',
    }, 
    {
      title: 'menu.branch',
      key: 'branch',
    }, 
    {
      title: 'columns.request_date',
      key: 'requestDate',
    },   
    {
      title: 'columns.description',
      key: 'description',
    }, 
    {
      title: 'columns.approved_by',
      key: 'approvedBy',
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
      requestDate: new Date(),
      status: ModuleStatus.PENDING,
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
     mapEditValue: (data: any) => (console.log(data), {
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