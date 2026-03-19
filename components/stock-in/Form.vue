<template>
  <el-row :gutter="20">
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
    <el-col :md="8">
      <el-form-item
        :label="$t('columns.receipt_number')"
        prop="purchaseReceiptId"
        :rules="[{ required: true }]"
      >
        <el-select 
          v-model="formRef.purchaseReceiptId"
          :placeholder="$t('columns.choose')"
          filterable
          clearable
        >
          <el-option 
            v-for="item in purchaseReceipts" 
            :key="item.id" 
            :label="item.code" 
            :value="item.id"
            class="font-Nokora"
          />
        </el-select>
      </el-form-item>
    </el-col>
    <el-col v-if="dialogState.dialogState === CrudDialogState.CREATE" :md="8">
      <el-form-item
        :label="$t('columns.total_quantity')"
        prop="totalQuantity"
        :rules="[{ required: true }]"
      >
        <el-input 
          v-model="formRef.totalQuantity"
          type="number"
          :placeholder="$t('columns.total_quantity')"
          readonly
        />
      </el-form-item>
    </el-col>
    <el-col :md="8">
      <el-form-item
        :label="$t('columns.receipt_by')"
        prop="receiptedById"
        :rules="[{ required: true }]"
      >
        <el-select 
          v-model="formRef.receiptedById"
          :placeholder="$t('columns.choose')"
          disabled
        >
          <el-option 
            v-for="item in users" 
            :key="item.id" 
            :label="item.username" 
            :value="item.id"
            class="font-Nokora"
          />
        </el-select>
      </el-form-item>
    </el-col>
    <el-col :md="8">
      <el-form-item
        :label="$t('menu.supplier')"
        prop="supplierId"
        :rules="[{ required: true }]"
      >
        <el-select 
          v-model="formRef.supplierId"
          :placeholder="$t('columns.choose')"
          filterable
          clearable
          disabled
        >
          <el-option 
            v-for="item in suppliers" 
            :key="item.id" 
            :label="item.nameEn +'-' + item.nameKh" 
            :value="item.id"
            class="font-Nokora"
          />
        </el-select>
      </el-form-item>
    </el-col>
    <el-col :md="8">
      <el-form-item
        :label="$t('columns.receipt_date')"
        prop="receiptDate"
        :rules="[{ required: true }]"
      >
        <el-date-picker 
          v-model="formRef.receiptDate"
          type="date"
          :placeholder="$t('columns.receipt_date')"
          clearable
          class="!w-full"
          readonly
        />
      </el-form-item>
    </el-col>
    <el-col :md="8">
      <el-form-item
        :label="$t('columns.receipt_ref')"
        prop="receiptRef"
        :rules="[{ required: true }]"
      >
        <el-input 
          v-model="formRef.receiptRef"
          :placeholder="$t('columns.receipt_ref')"
          readonly
          clearable
        />
      </el-form-item>
    </el-col>
    <el-col :md="8">
      <el-form-item
        :label="$t('columns.stock_in_date')"
        prop="stockInDate"
        :rules="[{ required: true }]"
      >
        <el-date-picker 
          v-model="formRef.stockInDate"
          type="date"
          :placeholder="$t('columns.stock_in_date')"
          clearable
          class="!w-full"
        />
      </el-form-item>
    </el-col>
    <template v-if="dialogState.dialogState !== CrudDialogState.CREATE">
      <el-col :md="8">
        <el-form-item
          :label="$t('menu.category')"
          prop="category"
          :rules="[{ required: true }]"
        >
          <el-input 
            v-model="formRef.category"
            :placeholder="$t('menu.category')"
            readonly
            clearable
          />
        </el-form-item>
      </el-col>
      <el-col :md="8">
        <el-form-item
          :label="$t('menu.uom')"
          prop="uom"
          :rules="[{ required: true }]"
        >
          <el-input 
            v-model="formRef.uom"
            :placeholder="$t('menu.uom')"
            readonly
            clearable
          />
        </el-form-item>
      </el-col>
      <el-col :md="8">
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
              v-for="item in products" 
              :key="item.id" 
              :label="item.code +' - '+ item.nameEn" 
              :value="item.id"
              class="font-Nokora"
            />
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :md="8">
        <el-form-item
          :label="$t('columns.quantity')"
          prop="receiptQuantity"
          :rules="[{ required: true }]"
        >
          <el-input 
            v-model="formRef.receiptQuantity"
            type="number"
            :placeholder="$t('columns.quantity')"
            clearable
          />
        </el-form-item>
      </el-col>
      <el-col :md="8">
        <el-form-item
          :label="$t('columns.stock_in_quantity')"
          prop="quantity"
          :rules="[{ required: true }]"
        >
          <el-input 
            v-model="formRef.quantity"
            type="number"
            :placeholder="$t('columns.stock_in_quantity')"
            clearable
          />
        </el-form-item>
      </el-col>
      <el-col :md="16">
        <el-form-item
          :label="$t('columns.note')"
          prop="note"
          :rules="[{ required: true }]"
        >
          <el-input 
            v-model="formRef.note"
            type="textarea"
            :placeholder="$t('columns.note')"
          />
        </el-form-item>
      </el-col>
    </template>
  </el-row>
  <template v-if="dialogState.dialogState === CrudDialogState.CREATE">
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
          :data="formRef.items"
          border
        >
          <template #empty>{{ $t('no_data') }}</template>
          <el-table-column
            :width="60"
            align="centere"
          >
            <template #header>
              <el-button
                type="primary"
                plain
                circle
                @click="addItem"
              >
                <Icon name="ei:plus"/>
              </el-button>
            </template>
            <template #default="scope">
              <el-button
                type="danger"
                plain
                circle
                @click="removeItem(scope.$index)"
              >
                <Icon name="material-symbols-light:delete-outline-rounded"/>
              </el-button>
            </template>
          </el-table-column>
          <el-table-column
            :label="$t('menu.product')"
          >
            <template #default="scope">
              <el-form-item
                :prop="`items.${scope.$index}.productId`"
                :rules="[{ required: true }]"
              >
                <el-select
                  v-model="scope.row.productId"
                  :placeholder="$t('columns.choose')"
                  clearable
                  filterable
                  @change="setCategoryAndUom(scope.row.productId, scope.$index)"
                >
                  <el-option 
                    v-for="item in products" 
                    :key="item.id" 
                    :label="item.code +' - '+ item.nameEn" 
                    :value="item.id"
                    class="font-Nokora"
                  />
                </el-select>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column
            :label="$t('menu.category')"
          >
            <template #default="scope">
              <el-form-item
                :prop="`items.${scope.$index}.category`"
                :rules="[{ required: true }]"
              >
                <el-input
                  v-model="scope.row.category"
                  readonly
                />
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column
            :label="$t('menu.uom')"
          >
            <template #default="scope">
              <el-form-item
                :prop="`items.${scope.$index}.uom`"
                :rules="[{ required: true }]"
              >
              <el-input
                v-model="scope.row.uom"
                readonly
              />
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column
            :label="$t('columns.quantity')"
          >
            <template #default="scope">
              <el-form-item
                :prop="`items.${scope.$index}.quantity`"
                :rules="[{ required: true }]"
              >
                <el-input
                  v-model="scope.row.quantity"
                  type="number"
                  placeholder="0"
                  readonly
                />
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column
            :label="$t('columns.note')"
          >
            <template #default="scope">
              <el-form-item
                :prop="`items.${scope.$index}.note`"
              >
                <el-input
                  v-model="scope.row.note"
                  :placeholder="$t('columns.note')"
                  clearable
                />
              </el-form-item>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </template>
</template>

<script lang="ts" setup>
import { CrudDialogState } from '~/types/crud-dialog-state.type';

  const { formRef } = defineProps({
    formRef: {
      type: Object,
      default: () => ({ }),
    }
  });

  const branches = useMasterData<{id: number; nameEn: string; nameKh: string}>('admin/master-data/branch/select-options');
  const users = useMasterData<{id: number; username: string}>('admin/system/users/select-options');
  const suppliers = useMasterData<{id: number; nameEn: string; nameKh: string}>('admin/master-data/supplier/select-options');
  const products = useMasterData<{id: number; code: string; nameEn: string; nameKh: string; categoryId: number; uomId: number}>('admin/master-data/product/select-options');

  const purchaseReceipts = ref<any>([]);

    watch(
      () => formRef.branchId,
      async (branchId) => {
        if (
          !branchId
        ) {
          purchaseReceipts.value = []
          return
        }
        
        if (dialogState.dialogState === CrudDialogState.CREATE) {
          formRef.purchaseReceiptId = null;
          formRef.receiptedById = null;
          formRef.supplierId = null;
          formRef.receiptDate = null;
          formRef.receiptRef = null;
          formRef.totalQuantity = 0;
        }

        const response: any = await useApi(
          `admin/purchasing/purchase-receipt/select-options/stock/${branchId}/${dialogState.dialogState === CrudDialogState.CREATE ? 'true' : 'false'}`
        );
        purchaseReceipts.value = response.payload;
        console.log(response);
      },
      { immediate: true }
  );
  
  const purchaseRequestLoading = ref<boolean>(false);
  watch(() => [formRef.purchaseReceiptId], async()=>{
    if (dialogState.dialogState === CrudDialogState.CREATE) {
      if (formRef.purchaseReceiptId) {
        Object.assign(formRef, {
          items: [],
        })
        try {
          purchaseRequestLoading.value = true;
          const response: any = await useApi(`admin/purchasing/purchase-receipt/${formRef.purchaseReceiptId}`);
          if (response?.payload) {
            Object.assign(formRef, {
              receiptedById: response.payload.createdById,
              supplierId: response.payload.supplierId,
              receiptRef: response.payload.receiptRef,
              receiptDate: response.payload.receiptDate,
              items: response.payload.items?.length
                ? response.payload.items.map((item: any) => ({
                    ...item,
                    unitPrice: item.product?.unitPrice,
                    category: item.product?.category.nameKh,
                    uom: item.product?.uom.nameKh,
                    quantity: Number(item.quantity),
                  }))
                : [],
            })
          }
        } catch (error: any) {
          const message =
            error?.data?.message ||
            error?.message ||
            'Something went wrong'

          useNotification(message, 'error');
        } finally {
          purchaseRequestLoading.value = false;
        }
      }

    }
  });

  const tabActive = ref<string>('items');

  const addItem = () => {
    formRef.items.push({
      id: null,
      categoryId: null,
      productId: null,
      uomId: null,
      quantity: 0,
    });
  }

  const removeItem = (index: number) => {
    formRef.items.splice(index, 1);
  }

  watch(
    () => formRef.items?.map((item: any) => [item.quantity]) ?? [],
    () => {
      if (formRef.items && formRef.items.length > 0) {
        formRef.totalQuantity = formRef.items.reduce(
          (total: number, item: any) => total + Number(item.quantity || 0),
          0
        );
      }
    }, { immediate: true },
  );

  const setCategoryAndUom = (id: number, index: number) => {
    const item = products.value.find((i) => i.id === id);
    if (item) { 
      formRef.items[index].categoryId = item.categoryId;
      formRef.items[index].uomId = item.uomId;
    }
  }


  const dialogState = useCrudDialogStateStore();
</script>

<style>

</style>