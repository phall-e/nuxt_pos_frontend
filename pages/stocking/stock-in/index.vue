<template>

    <TablesMain
      ref="tableRef"
      module-name="stock-in"
      :page-header-options="{
        pageTitle: 'menu.stock_in',
        breadcrumbs: breadcrumbs
      }"
      crud-path="admin/stocking/stock-in"
      :headers="headers"
      :table-options="options"
    >
      <template #form="{ formRef }">
        <StockInForm :form-ref="formRef"/>
      </template>
      <template #item.productCode="{ item }">
        <span class="line-clamp-1">{{ item.product.code }}</span>
      </template>
      <template #item.productName="{ item }">
        <span class="line-clamp-1">{{ item.product.nameEn }}</span>
      </template>
      <template #item.receiptNumber="{ item }">
        {{ item.purchaseReceipt.code }}
      </template>
      <template #item.receiptRef="{ item }">
        {{ item.purchaseReceipt.receiptRef }}
      </template>
      <template #item.receiptDate="{ item }">
        {{ dateFormatter(item.purchaseReceipt.receiptDate) }}
      </template>
      <template #item.supplier="{ item }">
        {{ item.purchaseReceipt.supplier.nameKh }}
      </template>
      <template #item.stockInDate="{ item }">
        {{ dateFormatter(item.stockInDate) }}
      </template>
      <template #item.branch="{ item }">
        {{ item?.branch.nameEn }}
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
    permissions: ['read-stock-in'],
  });

  const breadcrumbs = ['menu.stocking', 'menu.stock_in'];
  const headers: Headers[] = [
    {
      title: 'columns.code',
      key: 'productCode',
      width: 150,
    },
    {
      title: 'columns.product_name',
      key: 'productName',
      width: 350,
    },
    {
      title: 'columns.receipt_number',
      key: 'receiptNumber',
    },
    {
      title: 'columns.receipt_date',
      key: 'receiptDate',
    },
    {
      title: 'columns.receipt_ref',
      key: 'receiptRef',
    },
    {
      title: 'menu.supplier',
      key: 'supplier',
    }, 
    {
      title: 'menu.branch',
      key: 'branch',
    }, 
    {
      title: 'columns.receipt_date',
      key: 'stockInDate',
    },   
    {
      title: 'columns.note',
      key: 'note',
    }, 
    {
      title: 'columns.quantity',
      key: 'quantity',
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
      stockInDate: new Date(),
      totalQuantity: 0,
      items: [],
    },
     mapEditValue: (data: any) => (console.log(data), {
      ...data,
      purchaseReceiptId: data.purchaseReceiptId,
      receiptedById: data.purchaseReceipt.createdById,
      receiptDate: data.purchaseReceipt.receiptDate,
      supplierId: data.purchaseReceipt.supplierId,
      receiptRef: data.purchaseReceipt.receiptRef,
      category: data.product.category.nameKh,
      uom: data.product.uom.nameKh,
      receiptQuantity: Number(data.quantity) / Number(data.product.uom.quantity),
    }),
    dialogOptions: {
      fullscreen: true,
    }
  }
</script>