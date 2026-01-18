<template>
    <TablesMain
      ref="tableRef"
      module-name="product"
      :page-header-options="{
        pageTitle: 'menu.product_barcode',
        breadcrumbs: breadcrumbs,
        actions: [
          {
            title: 'print_barcode',
            color: 'danger',
            icon: 'material-symbols:print-outline-rounded',
            onClick: printElement,
          }
        ]
      }"
      crud-path="admin/stocking/stock"
      :headers="headers"
      :table-options="options"
      :show-create-button="false"
      :show-action-button="false"
    >
      <template #item.barcode="{ item }">
        <BarcodesGenerating
          :value="item.id"
          :height="25"
          :display-value="false"
        />
      </template>
      <template #item.code="{ item }">
        {{ item?.product.code }}
      </template>
      <template #item.branch="{ item }">
        {{ item?.branch[$t('name_lang')] }}
      </template>
      <template #item.productNameEn="{ item }">
        <span class="line-clamp-1">{{ item?.product.nameEn }}</span>
      </template>
      <template #item.productNameKh="{ item }">
        <span class="line-clamp-1">{{ item?.product.nameKh }}</span>
      </template>
      <template #item.category="{ item }">
        <span class="line-clamp-1">{{ item?.product.category[$t('name_lang')] }}</span>
      </template>
      <template #item.uom="{ item }">
        <span class="line-clamp-1">{{ item?.product.uom[$t('name_lang')] }}</span>
      </template>
      <template #item.unitPrice="{ item }">
        {{ formatCurrencyUSD(item?.product.unitPrice) }}
      </template>
      <template #item.description="{ item }">
        <span class="line-clamp-1">{{ item?.product.description }}</span>
      </template>
      <template #item.createdBy="{ item }">
        {{ item?.createdBy.username }}
      </template>
      <template #item.createdAt="{ item }">
        {{ dateFormatter(item.createdAt) }}
      </template>
      <template #item.attachment="{ item }">
        <el-image
          :src="item?.product.attachment"
          style="width: 50px; height: 50px"
          fit="cover"
        />
      </template>
    </TablesMain>

    <!-- Barcode Print Area -->
    <div ref="printRef" class="print-area">
      <div v-for="item in selectedIds">
        <BarcodesGenerating
          :value="item"
          :height="60"
          :display-value="false"
        />
        
      </div>
    </div>
</template>

<script setup lang="ts">
import type { Headers } from '~/types/header.type';
import type { UseCrudOption } from '~/types/UseCrudOption';

  definePageMeta({
    permissions: ['read-product'],
  });

  const tableRef = ref<{ itemSelectedIds: number[] } | null>(null)

  const selectedIds = computed(() => tableRef.value?.itemSelectedIds || [])


  const breadcrumbs = ['menu.master_data', 'menu.product'];
  const headers: Headers[] = [
    {
      title: 'columns.barcode',
      key: 'barcode',
    },
    {
      title: 'columns.code',
      key: 'code',
    },
    {
      title: 'menu.branch',
      key: 'branch',
    }, 
    {
      title: 'columns.name_en',
      key: 'productNameEn',
    }, 
    {
      title: 'columns.name_kh',
      key: 'productNameKh',
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

  const printRef = ref<HTMLElement | null>(null)

  const printElement = () => {
   
    if (!printRef.value) return

    const content = printRef.value.innerHTML

    const printWindow = window.open('', '', 'width=800,height=600')
    if (!printWindow) return

    printWindow.document.write(`
      <html>
        <head>
          <title>Print</title>
          <style>
            body {
              font-family: Arial;
              padding: 20px;
            }
          </style>
        </head>
        <body>
          ${content}
        </body>
      </html>
    `)

    printWindow.document.close()
    printWindow.focus()
    printWindow.print()
    // printWindow.close()
  }
</script>

<style scoped>
  @media print {
    body {
      visibility: hidden;
    }

    #print-area, 
    #print-area * {
      visibility: visible;
    }

    #print-area {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
    }
  }

</style>