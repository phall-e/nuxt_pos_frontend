<template>
  <el-row :gutter="10">
    <el-col :md="8">
      <el-form-item
        :label="$t('menu.branch')"
        prop="branchId"
        :rules="[{ required: true }]"
      >
        <el-select 
          v-model="formRef.branchId"
          :placeholder="$t('columns.choose')"
          filterable
          clearable
        >
          <el-option 
            v-for="item in branches" 
            :key="item.id" 
            :label="item.nameEn+'-'+item.nameKh" 
            :value="item.id"
            class="font-Nokora"
          />
        </el-select>
      </el-form-item>
    </el-col>
    <template
      v-if="dialogState.dialogState === CrudDialogState.CREATE"
    >
      <el-col :md="8">
        <el-form-item
          :label="$t('menu.category')"
          prop="categoryId"
        >
          <el-select
            v-model="formRef.categoryId"
            :placeholder="$t('menu.category')"
            clearable
            filterable
          >
            <el-option 
              v-for="item in categories" 
              :key="item.id" :label="item.nameEn + '-' + item.nameKh" :value="item.id"
              class="font-Nokora"
            />
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :md="8">
        <el-form-item
          :label="$t('menu.uom')"
          prop="uomId"
        >
          <el-select
            v-model="formRef.uomId"
            :placeholder="$t('menu.uom')"
            clearable
            filterable
          >
            <el-option 
              v-for="item in uoms" 
              :key="item.id" :label="item.nameEn + '-' + item.nameKh" :value="item.id"
              class="font-Nokora"
            />
          </el-select>
        </el-form-item>
      </el-col>
    </template>
    <template v-else>
      <el-col :span="8">
        <el-form-item
          :label="$t('menu.product')"
          prop="productId"
          :rules="[{ required: true }]"
        >
          <el-select
            v-model="formRef.productId"
            :placeholder="$t('columns.choose')"
            clearable
            filterable
          >
            <el-option 
              v-for="item in productItems" 
              :key="item.id" 
              :label="item.code +' - '+ item.nameEn" 
              :value="item.id"
              class="font-Nokora"
            />
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item
          :label="$t('columns.created_at')"
          prop="createdAt"
          :rules="[{ required: true }]"
        >
          <el-date-picker
            v-model="formRef.createdAt"
            class="!w-full"
            readonly
          />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item
          :label="$t('columns.min_stock')"
          prop="minStock"
          :rules="[{ required: true }]"
        >
          <el-input
            v-model="formRef.minStock"
            type="number"
            placeholder="0"
          />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item
          :label="$t('menu.stock_in')"
          prop="stockIn"
          :rules="[{ required: true }]"
        >
          <el-input
            v-model="formRef.stockIn"
            type="number"
            placeholder="0"
          />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item
          :label="$t('columns.stock_out')"
          prop="stockOut"
          :rules="[{ required: true }]"
        >
          <el-input
            v-model="formRef.stockOut"
            type="number"
            placeholder="0"
          />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item
          :label="$t('menu.stock_adjustment')"
          prop="stockAdjustment"
          :rules="[{ required: true }]"
        >
          <el-input
            v-model="formRef.stockAdjustment"
            type="number"
            placeholder="0"
          />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item
          :label="$t('menu.stock_transfer')"
          prop="stockTransfer"
          :rules="[{ required: true }]"
        >
          <el-input
            v-model="formRef.stockTransfer"
            type="number"
            placeholder="0"
          />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item
          :label="$t('columns.stock_onhand')"
          prop="stockOnhand"
          :rules="[{ required: true }]"
        >
          <el-input
            v-model="formRef.stockOnhand"
            type="number"
            placeholder="0"
            readonly
          />
        </el-form-item>
      </el-col>
    </template>
  </el-row>

  <template
    v-if="dialogState.dialogState === CrudDialogState.CREATE"
  >
    <el-tabs
      v-model="tabActive"
      class="mt-5"
      type="border-card"
    >
      <el-tab-pane name="items">
        <template #label>
          <div class="flex items-center gap-1">
            <Icon :size="20" name="lsicon:list-outline"/> <div>{{ $t('columns.items') }}</div>
          </div>
        </template>
        <el-table
          ref="multipleTableRef"
          :data="products"
          border
          row-key="id"
          @selection-change="handleSelectChange"
          v-loading="productLoading"
        >
          <template #empty>
            {{ $t('no_data') }}
          </template>
          <el-table-column
            :width="40"
            type="selection"
          >
          </el-table-column>
          <el-table-column
            :label="$t('columns.code')"
          >
            <template #default="scope">
              {{ scope.row.code }}
            </template>
          </el-table-column>
          <el-table-column
            :label="$t('columns.product_name')"
          >
            <template #default="scope">
              <span class="line-clamp-1">{{ scope.row.name }}</span>
            </template>
          </el-table-column>
          <el-table-column
            :label="$t('menu.category')"
          >
            <template #default="scope">
              <span class="line-clamp-1">{{ scope.row.category }}</span>
            </template>
          </el-table-column>
          <el-table-column
            :label="$t('menu.uom')"
          >
            <template #default="scope">
              {{ scope.row.uom }}
            </template>
          </el-table-column>
          <el-table-column :label="$t('columns.min_stock')">
            <template #default="scope">
              <el-input
                v-model.number="scope.row.minStock"
                type="number"
                placeholder="0"
                @change="handleSetMinStock(scope.row.minStock, scope.$index)"
              />
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </template>
</template>

<script lang="ts" setup>
import type { TableInstance } from 'element-plus';
import { CrudDialogState } from '~/types/crud-dialog-state.type';

  const { formRef } = defineProps({
    formRef: {
      type: Object,
      default: () => ({ }),
    }
  });

  const dialogState = useCrudDialogStateStore();

  const branches = useMasterData<{id: number; nameEn: string; nameKh: string}>('admin/master-data/branch/select-options');
  const categories = useMasterData<{id: number; nameEn: string; nameKh: string}>('admin/master-data/category/select-options');
  const uoms = useMasterData<{id: number; nameEn: string; nameKh: string}>('admin/master-data/uom/select-options');
  const productItems = useMasterData<{id: number; code: string; nameEn: string; nameKh: string; categoryId: number; uomId: number}>('admin/master-data/product/select-options');
  const tabActive = ref<string>('items');

  
  interface Product {
    id: number;
    code: string;
    name: string;
    category: string;
    uom: string;
    minStock: number;

  }
  const products = ref<Product[]>([]);

  watch(() => [dialogState.dialogState], ()=>{
    if (dialogState.dialogState === CrudDialogState.CREATE) {
      products.value = []; 
    }
  }, { immediate: true });

  const productLoading = ref<boolean>(false);

  watch(() => [formRef.branchId, formRef.categoryId, formRef.uomId], async ()=>{
    if (dialogState.dialogState === CrudDialogState.CREATE) {
      try {
        productLoading.value = true;
        products.value = [];
        const stockResponse: any = await useApi(`admin/stocking/stock/branch-product/${formRef.branchId}`);
        if (stockResponse) {
          const ids = ref<number[]>([])
          if (stockResponse.payload?.length) {
            ids.value = stockResponse.payload.map((i: any) => i.productId)
          }

          const query: Record<string, any> = {
            ids: ids.value.join(','),
          }

          // only append when exists
          if (formRef.categoryId) {
            query.categoryId = formRef.categoryId
          }

          if (formRef.uomId) {
            query.uomId = formRef.uomId
          }

          if (stockResponse.payload.length > 0) {
            ids.value = stockResponse.payload.map((i: any) => i.productId)
          }

          const productResponse: any = await useApi(
            `admin/master-data/product/not-in?${ids.value.length > 0 ? 'ids=' + ids.value : ''}${formRef.categoryId ? '&categoryId='+formRef.categoryId : ''}${formRef.uomId ? '&uomId='+formRef.uomId : ''}`,
          )
          if (productResponse.payload.length > 0) {
            products.value = productResponse.payload.map((item: any) => ({
              id: item.id,
              code: item.code,
              name: item.nameEn,
              category: item.category.nameKh,
              uom: item.uom.nameKh,
              minStock: 0,
            }));
          }
        }
      } catch (error: any) {
        const message =
              error?.data?.message ||
              error?.message ||
              'Something went wrong'

        useNotification(message, 'error');
      } finally {
        productLoading.value = false;
      }
    }
  }, { deep: true });

  const multipleTableRef = ref<TableInstance>();
  
  const handleSelectChange = (val: Product[]) => {
    if (!formRef.branchId) {
      console.error('branchId is missing')
      return
    }

    formRef.items = val.map(product => ({
      branchId: Number(formRef.branchId), // ✅ FIXED
      productId: product.id,
      minStock: product.minStock ?? 0,
      stockOut: 0,
      stockIn: 0,
      stockAdjustment: 0,
      stockTransfer: 0,
    }))
  }



  const handleSetMinStock = (val: number, index: number) => {
    if (!formRef.items || formRef.items.length === 0) return

    formRef.items[index].minStock = val
  }


  
</script>
