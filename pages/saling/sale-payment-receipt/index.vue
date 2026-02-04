<template>
    <TablesMain
      module-name="sale-payment-receipt"
      :page-header-options="{
        pageTitle: 'menu.sale_payment_receipt',
        breadcrumbs: breadcrumbs
      }"
      crud-path="admin/saling/sale-payment-receipt"
      :headers="headers"
      :table-options="options"
    >
      <template #form="{ formRef }">
        <SalePaymentReceiptForm :form-ref="formRef"/>
      </template>
      <template #item.sale="{ item }">
        {{ item?.sale.code }}
      </template>
      <template #item.branch="{ item }">
        {{ item?.sale.branch.nameKh }}
      </template>
      <template #item.receiptBy="{ item }">
        {{ item?.receiptBy.username }}
      </template>
      <template #item.createdBy="{ item }">
        {{ item?.createdBy.username }}
      </template>
      <template #item.receiptDate="{ item }">
        {{ dateFormatter(item.receiptDate) }}
      </template>
      <template #item.createdAt="{ item }">
        {{ dateFormatter(item.createdAt) }}
      </template>
      <template #item.amount="{ item }">
        {{ formatCurrencyUSD(item.amount) }}
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
    permissions: ['read-sale-payment-receipt'],
  });

  const breadcrumbs = ['menu.saling', 'menu.sale_payment_receipt'];
  const headers: Headers[] = [
    {
      title: 'columns.code',
      key: 'code',
    },
    {
      title: 'columns.invoice',
      key: 'sale',
    },
    {
      title: 'menu.branch',
      key: 'branch',
    },
    {
      title: 'columns.receipt_date',
      key: 'receiptDate',
    }, 
    {
      title: 'columns.receipt_by',
      key: 'receiptBy',
    },
    {
      title: 'columns.amount',
      key: 'amount',
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
      receiptDate: new Date(),
      salePaymentReceipts: [],
    },
    mapEditValue: (data: any) => (console.log(data) , {
      ...data,
      branchId: data.sale.branchId,
      customerId: data.sale.customerId,
      soleById: data.sale.soleById,
      description: data.description,
      totalAmount: data.sale.totalAmount,
      totalDiscount: data.sale.totalDiscount,
    }),
    dialogOptions: {
      fullscreen: true,
    }
  }
</script>