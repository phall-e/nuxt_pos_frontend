<template>
    <TablesMain
      module-name="purchase-receipt-billing"
      :page-header-options="{
        pageTitle: 'menu.purchase_receipt_billing',
        breadcrumbs: breadcrumbs
      }"
      crud-path="admin/purchasing/purchase-receipt-billing"
      :headers="headers"
      :table-options="options"
    >
      <template #form="{ formRef }">
        <PurchaseReceiptBillingForm :form-ref="formRef"/>
      </template>
      <template #item.purchaseReceipt="{ item }">
        {{ item?.purchaseReceipt.code }}
      </template>
      <template #item.branch="{ item }">
        {{ item?.purchaseReceipt.branch.nameKh }}
      </template>
      <template #item.billingBy="{ item }">
        {{ item?.billingBy.username }}
      </template>
      <template #item.supplier="{ item }">
        {{ item?.purchaseReceipt.supplier.nameKh }}
      </template>
      <template #item.createdBy="{ item }">
        {{ item?.createdBy.username }}
      </template>
      <template #item.billingDate="{ item }">
        {{ dateFormatter(item.billingDate) }}
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
    permissions: ['read-purchase-receipt-billing'],
  });

  const breadcrumbs = ['menu.purchasing', 'menu.purchase_receipt_billing'];
  const headers: Headers[] = [
    {
      title: 'columns.code',
      key: 'code',
    },
    {
      title: 'columns.invoice',
      key: 'purchaseReceipt',
    },
    {
      title: 'menu.branch',
      key: 'branch',
    },
    {
      title: 'columns.billing_date',
      key: 'billingDate',
    }, 
    {
      title: 'menu.supplier',
      key: 'supplier',
    },
    {
      title: 'columns.billing_by',
      key: 'billingBy',
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

  const auth = useAuthenticationStore();
  const options: UseCrudOption = {
    defaultCreateValue: {
      billingDate: new Date(),
      billingById: auth.users.id,
      purchaseReceiptBillings: [],
    },
    mapEditValue: (data: any) => (console.log(data) , {
      ...data,
      branchId: data.purchaseReceipt.branchId,
      supplierId: data.purchaseReceipt.supplierId,
      receiptById: data.purchaseReceipt.createdById,
      description: data.description,
      totalAmount: data.purchaseReceipt.totalAmount,
      totalDiscount: data.purchaseReceipt.totalDiscount,
    }),
    dialogOptions: {
      fullscreen: true,
    }
  }
</script>