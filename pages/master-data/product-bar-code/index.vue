<template>
    <TablesMain
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
</template>

<script setup lang="ts">
import type { Headers } from '~/types/header.type';
import type { UseCrudOption } from '~/types/UseCrudOption';

  definePageMeta({
    permissions: ['read-product'],
  });

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

  const printElement = () => {
    const content = document.getElementById('label')?.innerHTML
    if (!content) return

    const printWindow = window.open('', '', 'width=100px')
    if (!printWindow) return

    printWindow.document.writeln(`
      <html>
        <head>
          <title>Print</title>
          <style>
            /* 🔥 THIS controls printer size */
            @page {
              size: 50mm 30mm;
              margin: 0;
            }

            body {
              width: 50mm;
              height: 30mm;
              margin: 0;
              display: flex;
              align-items: center;
              justify-content: center;
              font-family: Arial, sans-serif;
            }

            .label {
              text-align: center;
            }

            svg {
              width: 45mm;
              height: auto;
            }
          </style>
        </head>
        <body>
          ${content}
        </body>
      </html>
    `);

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