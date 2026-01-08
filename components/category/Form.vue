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
</template>

<script lang="ts" setup>
import { CrudDialogState } from '~/types/crud-dialog-state.type';

  const { formRef } = defineProps({
    formRef: {
      type: Object,
      default: () => ({ }),
    }
  });

  const dialogState = useCrudDialogStateStore();

  // Get branch code
  watch(()=> [dialogState.dialogState], async()=> {
    if (dialogState.dialogState === CrudDialogState.CREATE) {
      const response: any = await useApi('admin/master-data/category/next-code');
      if (response) {
        formRef.code = response.payload;
      }
    }
  }, { immediate: true });
</script>

<style>

</style>