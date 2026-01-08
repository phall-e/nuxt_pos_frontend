<template>
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
  <el-form-item
    :label="$t('columns.name_en')"
    prop="nameEn"
    :rules="[{ required: true }]"
  >
    <el-input 
      v-model="formRef.nameEn"
      :placeholder="$t('columns.name_en')"
      clearable
    />
  </el-form-item>
  <el-form-item
    :label="$t('columns.name_kh')"
    prop="nameKh"
    :rules="[{ required: true }]"
  >
    <el-input 
      v-model="formRef.nameKh"
      :placeholder="$t('columns.name_kh')"
      clearable
    />
  </el-form-item> 
  <el-form-item
    :label="$t('menu.category')"
    prop="categoryId"
    :rules="[{ required: true }]"
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
  <el-form-item
    :label="$t('menu.uom')"
    prop="uomId"
    :rules="[{ required: true }]"
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
  <el-form-item
    :label="$t('columns.unit_price')"
    prop="unitPrice"
    :rules="[{ required: true }]"
  >
    <el-input 
      v-model="formRef.unitPrice"
      type="number"
      :placeholder="$t('columns.unit_price')"
      clearable
    />
  </el-form-item>
  <el-form-item
    :label="$t('columns.description')"
    prop="description"
  >
    <el-input 
      v-model="formRef.description"
      type="textarea"
      :placeholder="$t('columns.description')"
      clearable
    />
  </el-form-item>
</template>

<script lang="ts" setup>
import { CrudDialogState } from '~/types/crud-dialog-state.type';

  const { formRef } = defineProps({
    formRef: {
      type: Object,
      default: () => ({ }),
    }
  });

  const categories = useMasterData<{id: number; nameEn: string; nameKh: string}>('admin/master-data/category/select-options');
  const uoms = useMasterData<{id: number; nameEn: string; nameKh: string}>('admin/master-data/uom/select-options');

  const dialogState = useCrudDialogStateStore();

  // Get product code
  watch(()=> [dialogState.dialogState], async()=> {
    if (dialogState.dialogState === CrudDialogState.CREATE) {
      const response: any = await useApi('admin/master-data/product/next-code');
      if (response) {
        formRef.code = response.payload;
      }
    }
  }, { immediate: true });


</script>
