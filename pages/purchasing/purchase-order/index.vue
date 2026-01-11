<template>

    <TablesMain
      ref="tableRef"
      module-name="purchase-order"
      :page-header-options="{
        pageTitle: 'menu.purchase_order',
        breadcrumbs: breadcrumbs
      }"
      crud-path="admin/purchasing/purchase-order"
      :headers="headers"
      :table-options="options"
    >
      <template #form="{ formRef }">
        <PurchaseOrderForm :form-ref="formRef"/>
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
      <template #item.totalAmount="{ item }">
        {{ formatCurrencyUSD(item.totalAmount) }}
      </template>
      <template #item.action-button="{ row, index }">
        <el-dropdown>
          <el-tag
            type="success"
          >
            <Icon name="ic:baseline-more-vert"/>
          </el-tag>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item v-can="'approve-purchase-receipt'" v-if="row.status === ModuleStatus.PENDING" @click="handleApprove(row, refreshList)">{{ $t('approve') }}</el-dropdown-item>
              <el-dropdown-item v-can="'cancel-purchase-receipt'" v-if="row.status === ModuleStatus.PENDING" @click="handleCancel(row, refreshList)">{{ $t('cancel') }}</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </template>
    </TablesMain>
</template>

<script setup lang="ts">
import type { Headers } from '~/types/header.type';
import { ModuleStatus } from '~/types/Status';
import type { UseCrudOption } from '~/types/UseCrudOption';

  definePageMeta({
    permissions: ['read-purchase-order'],
  });

  const breadcrumbs = ['menu.purchasing', 'menu.purchase_order'];
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
      title: 'columns.order_date',
      key: 'orderDate',
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
      title: 'columns.total_amount',
      key: 'totalAmount',
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
      orderDate: new Date(),
      status: ModuleStatus.PENDING,
      createdById: auth.users.id,
      totalQuantity: 0,
      totalAmount: 0,
      attachments: [],
      items: [
        {
          id: null,
          categoryId: null,
          productId: null,
          uomId: null,
          quantity: 0,
          unitPrice: 0,
          totalAmount: 0,
        }
      ],
    },
     mapEditValue: (data: any) => (console.log(data), {
      ...data,
      purchaseRequestId: data.purchaseRequestId,
      requestedById: data.purchaseRequest.createdById,
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

  const tableRef = ref<any>(null);
  const refreshList = () => 
    tableRef.value?.refreshList();
 
  const { handleApprove, handleCancel } = useApproveCancel('admin/purchasing/purchase-order', 'purchase_order');
</script>