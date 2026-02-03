<template>
    <el-row :gutter="20">
      <el-col :md="8">
        <el-form-item
          :label="$t('columns.code')"
          prop="code"
          :rules="[{ required: true }]"
        >
          <el-input 
            v-model="formRef.code"
            :placeholder="$t('columns.code')"
            readonly
            clearable
          />
        </el-form-item>
      </el-col>
      <el-col :md="8">
        <el-form-item
          :label="$t('columns.sale_date')"
          prop="saleDate"
          :rules="[{ required: true }]"
        >
          <el-date-picker 
            v-model="formRef.saleDate"
            type="date"
            :placeholder="$t('columns.choose')"
            clearable
            class="!w-full"
          />
        </el-form-item>
      </el-col>
      <el-col :md="8">
        <el-form-item
          :label="$t('columns.status')"
          prop="status"
          :rules="[{ required: true }]"
        >
          <el-select 
            v-model="formRef.status"
            :placeholder="$t('columns.choose')"
            filterable
            clearable
          >
            <el-option v-for="item in statuses" :key="item" :label="item" :value="item"/>
          </el-select>
        </el-form-item>
      </el-col>
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
          :label="$t('menu.customer')"
          prop="customerId"
          :rules="[{ required: true }]"
        >
          <el-select 
            v-model="formRef.customerId"
            :placeholder="$t('columns.choose')"
            filterable
            clearable
          >
            <el-option 
              v-for="item in customers" 
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
          :label="$t('columns.sale_by')"
          prop="soleById"
          :rules="[{ required: true }]"
        >
          <el-select 
            v-model="formRef.soleById"
            :placeholder="$t('columns.choose')"
            filterable
            clearable
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
          :label="$t('columns.total_amount')"
          prop="totalAmount"
          :rules="[{ required: true }]"
        >
          <el-input 
            v-model="formRef.totalAmount"
            type="number"
            :placeholder="$t('columns.total_amount')"
            readonly
          />
        </el-form-item>
      </el-col>
      <el-col :md="8">
        <el-form-item
          :label="$t('columns.total_paid_amount')"
          prop="totalPaidAmount"
          
          :rules="[{ required: true }]"
        >
          <el-input 
            v-model="formRef.totalPaidAmount"
            type="number"
            :placeholder="$t('columns.total_paid_amount')"
            readonly
            />
        </el-form-item>
      </el-col>
      <el-col :md="8">
        <el-form-item
          :label="$t('columns.description')"
          prop="description"
        >
          <el-input 
            v-model="formRef.description"
            type="textarea"
            :placeholder="$t('columns.description')"
          />
        </el-form-item>
      </el-col>
      <el-col :md="8">
        <el-form-item
          :label="$t('columns.grand_total')"
          prop="totalNetAmount"
          :rules="[{ required: true }]"
        >
          <el-input 
            v-model="formRef.totalNetAmount"
            type="number"
            :placeholder="$t('columns.grand_total')"
            readonly
          />
        </el-form-item>
      </el-col>
      <el-col :md="8">
        <el-form-item
          :label="$t('columns.total_discount')"
          prop="totalDiscount"
          :rules="[{ required: true }]"
        >
          <el-input 
            v-model="formRef.totalDiscount"
            type="number"
            :placeholder="$t('columns.total_discount')"
            readonly
          />
        </el-form-item>
      </el-col>
    </el-row>
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
            :label="$t('menu.uom')"
          >
            <template #default="scope">
              <el-form-item
                :prop="`items.${scope.$index}.uomId`"
                :rules="[{ required: true }]"
              >
                <el-select
                  v-model="scope.row.uomId"
                  :placeholder="$t('columns.choose')"
                  disabled
                >
                  <el-option 
                    v-for="item in uoms" 
                    :key="item.id" 
                    :label="item.nameEn +'-'+ item.nameKh" 
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

                :prop="`items.${scope.$index}.categoryId`"
                :rules="[{ required: true }]"
              >
                <el-select
                v-model="scope.row.categoryId"
                :placeholder="$t('columns.choose')"
                disabled
              >
                <el-option 
                  v-for="item in categories" 
                  :key="item.id" 
                  :label="item.nameEn +'-'+ item.nameKh" 
                  :value="item.id"
                  class="font-Nokora"
                />
              </el-select>
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
                />
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column
            :label="$t('columns.unit_price')"
          >
            <template #default="scope">
              <el-form-item
                :prop="`items.${scope.$index}.unitPrice`"
                :rules="[{ required: true }]"
              >
                <el-input
                  v-model="scope.row.unitPrice"
                  type="number"
                  placeholder="0"
                />
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column
            :label="$t('columns.discount')"
          >
            <template #default="scope">
              <el-form-item
                :prop="`items.${scope.$index}.discount`"
                :rules="[{ required: true }]"
              >
                <el-input
                  v-model="scope.row.discount"
                  type="number"
                  placeholder="0"
                />
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column
            :label="$t('columns.subtotal')"
          >
            <template #default="scope">
              <el-form-item
                :prop="`items.${scope.$index}.totalAmount`"
                :rules="[{ required: true }]"
              >
                <el-input
                  v-model="scope.row.totalAmount"
                  type="number"
                  placeholder="0"
                  readonly
                />
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column
            :label="$t('columns.grand_total')"
          >
            <template #default="scope">
              <el-form-item
                :prop="`items.${scope.$index}.netAmount`"
                :rules="[{ required: true }]"
              >
                <el-input
                  v-model="scope.row.netAmount"
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
      <el-tab-pane name="attachments">
        <template #label>
          <div class="flex items-center gap-1">
            <Icon :size="20" name="hugeicons:attachment-square"/> <div>{{ $t('columns.attachments') }}</div>
          </div>
        </template>
        <DropZone v-model="formRef.attachments"/>
      </el-tab-pane>
    </el-tabs>
</template>

<script lang="ts" setup>
import DropZone from '~/@core/components/DropZone.vue';
import { CrudDialogState } from '~/types/crud-dialog-state.type';
import statuses from '~/types/Status';

  const { formRef } = defineProps({
    formRef: {
      type: Object,
      default: () => ({ }),
    }
  });


  const branches = useMasterData<{id: number; nameEn: string; nameKh: string}>('admin/master-data/branch/select-options');
  const users = useMasterData<{id: number; username: string}>('admin/system/users/select-options');
  const categories = useMasterData<{id: number; nameEn: string; nameKh: string}>('admin/master-data/category/select-options');
  const uoms = useMasterData<{id: number; nameEn: string; nameKh: string}>('admin/master-data/uom/select-options');
  const customers = useMasterData<{id: number; nameEn: string; nameKh: string}>('admin/master-data/customer/select-options');
  const products = useMasterData<{id: number; code: string; nameEn: string; nameKh: string; categoryId: number; uomId: number}>('admin/master-data/product/select-options');

  const tabActive = ref<string>('items');

  const addItem = () => {
    formRef.items.push({
      id: null,
      categoryId: null,
      productId: null,
      uomId: null,
      quantity: 0,
      unitPrice: 0,
      discount: 0,
      totalAmount: 0,
      netAmount: 0,
      note: '',
    });
  }

  const removeItem = (index: number) => {
    formRef.items.splice(index, 1);
  }

  watch(
    () => formRef.items?.map((item: any) => [item.quantity, item.unitPrice, item.discount]) ?? [],
    () => {
      if (formRef.items && formRef.items.length > 0) {
        formRef.items.forEach((element: any) => {
          element.totalAmount = Number(element.unitPrice) * Number(element.quantity);
          element.netAmount = Number(element.totalAmount) - Number(element.discount);
        });
        formRef.totalQuantity = formRef.items.reduce(
          (total: number, item: any) => total + Number(item.quantity || 0),
          0
        );
        formRef.totalAmount = formRef.items.reduce(
          (total: number, item: any) => total + Number(item.totalAmount || 0),
          0
        );
        formRef.totalDiscount = formRef.items.reduce(
          (total: number, item: any) => total + Number(item.discount || 0),
          0
        );
        formRef.totalNetAmount = Number(formRef.totalAmount) - Number(formRef.totalDiscount);
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

</script>

<style>

</style>
