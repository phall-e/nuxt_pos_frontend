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
        :label="$t('columns.request_date')"
        prop="requestDate"
        :rules="[{ required: true }]"
      >
        <el-date-picker 
          v-model="formRef.requestDate"
          type="date"
          :placeholder="$t('columns.request_date')"
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
        :label="$t('columns.request_by')"
        prop="createdById"
        :rules="[{ required: true }]"
      >
        <el-select 
          v-model="formRef.createdById"
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
    <el-col :md="16">
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
  </el-row>
  <el-tabs
    v-model="tabActive"
    class="mt-5"
  >
    <el-tab-pane :label="$t('columns.items')" name="items">
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
                clearable
                filterable
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
              clearable
              filterable
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
    <el-tab-pane :label="$t('columns.attachments')" name="attachments">

    </el-tab-pane>
  </el-tabs>
</template>

<script lang="ts" setup>
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
  const products = useMasterData<{id: number; code: string; nameEn: string; nameKh: string; categoryId: number; uomId: number}>('admin/master-data/product/select-options');

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
    () => formRef.items?.map((item: any) => item.quantity) ?? [],
    () => {
      if (formRef.items && formRef.items.length > 0) {
        formRef.totalQuantity = formRef.items.reduce(
          (total: number, item: any) => total + Number(item.quantity || 0),
          0
        )
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

  onMounted(() => {
    console.log('Data', formRef);
  })


  const dialogState = useCrudDialogStateStore();

  // Get branch code
  watch(()=> [dialogState.dialogState], async()=> {
    if (dialogState.dialogState === CrudDialogState.CREATE) {
      const response: any = await useApi('admin/purchasing/purchase-request/next-code');
      if (response) {
        formRef.code = response.payload;
      }
    }
  }, { immediate: true });
</script>

<style>

</style>