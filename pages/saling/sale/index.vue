<template>
    <TablesMain
      ref="tableRef"
      module-name="sale"
      :page-header-options="{
        pageTitle: 'menu.sale',
        breadcrumbs: breadcrumbs,
        rightActions: [
          {
            title: 'scanning',
            color: 'success',
            icon: 'fluent:barcode-scanner-16-filled',
            onClick: handleScanning,
          },
          {
            title: 'create',
            color: 'primary',
            icon: 'icons8:plus',
            onClick: handleCreating,
          },
        ]
      }"
      crud-path="admin/saling/sale"
      :headers="headers"
      :table-options="options"
      :show-create-button="false"
      is-item-printable
    >
      <template #printable="{ printItem }">
        <SalePrint
          :item="printItem"
        />
      </template>
      <template #form="{ formRef }">
        <SaleForm :form-ref="formRef"/>
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
      <template #item.customer="{ item }">
        {{ item?.customer.nameKh }}
      </template>
      <template #item.soleBy="{ item }">
        {{ item?.soleBy.username }}
      </template>
      <template #item.saleDate="{ item }">
        {{ dateFormatter(item.saleDate)}}
      </template>
      <template #item.createdAt="{ item }">
        {{ dateFormatter(item.createdAt) }}
      </template>
      <template #item.totalAmount="{ item }">
        {{ formatCurrencyUSD(item.totalAmount) }}
      </template>
      <template #item.totalDiscount="{ item }">
        {{ formatCurrencyUSD(item.totalDiscount) }}
      </template>
      <template #item.totalPaidAmount="{ item }">
        {{ formatCurrencyUSD(item.totalPaidAmount) }}
      </template>
    </TablesMain>
</template>

<script setup lang="ts">
import type { Headers } from '~/types/header.type';
import { ModuleStatus } from '~/types/Status';
import type { UseCrudOption } from '~/types/UseCrudOption';

  definePageMeta({
    permissions: ['read-sale'],
  });

  const breadcrumbs = ['menu.saling', 'menu.sale'];
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
      title: 'columns.sale_date',
      key: 'saleDate',
    },   
    {
      title: 'menu.customer',
      key: 'customer',
    },  
    {
      title: 'columns.sale_by',
      key: 'soleBy',
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
      title: 'columns.total_amount',
      key: 'totalAmount',
    },
    {
      title: 'columns.total_discount',
      key: 'totalDiscount',
    },
    {
      title: 'columns.total_paid_amount',
      key: 'totalPaidAmount',
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
      saleDate: new Date(),
      status: ModuleStatus.PENDING,
      customerId: 1,
      soleById: auth.users.id,
      totalNetAmount: 0,
      totalQuantity: 0,
      totalAmount: 0,
      totalPaidAmount: 0,
      attachments: [],
      items: [
        {
          id: null,
          categoryId: null,
          productId: null,
          uomId: null,
          quantity: 0,
          tax: 0,
          unitPrice: 0,
          discount: 0,
          totalAmount: 0,
          totalNetAmount: 0,
          note: '',
        }
      ],
    },
     mapEditValue: (data: any) => (console.log(data), {
      ...data,
      totalNetAmount: 0,
      items: data.items && data.items.length > 0 ? data.items.map((item: any) => ({
        ...item,
        uomId: item.product.uomId,
        categoryId: item.product.categoryId,
      })) : [],
    }),
    dialogOptions: {
      fullscreen: true,
    }
  }

  const tableRef = ref<any>(null);
  const refreshList = () => 
    tableRef.value?.refreshList();
 
  const { handleApprove, handleCancel } = useApproveCancel('admin/purchasing/purchase-order', 'purchase_order');

  const handleScanning = () => {
    alert('Yes')
  }

  const handleCreating = () => {
    navigateTo('/saling/sale/create');
  }
</script>