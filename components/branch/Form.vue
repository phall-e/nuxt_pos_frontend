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
    :label="$t('columns.manager')"
    prop="managerName"
    :rules="[{ required: true }]"
  >
    <el-input 
      v-model="formRef.managerName"
      :placeholder="$t('columns.manager')"
      clearable
    />
  </el-form-item>
  <el-form-item
    :label="$t('columns.phone_number')"
    prop="phoneNumber"
  >
    <el-input 
      v-model="formRef.phoneNumber"
      :placeholder="$t('columns.phone_number')"
      clearable
    />
  </el-form-item>
  <el-form-item
    :label="$t('columns.address')"
    prop="address"
  >
    <el-input 
      v-model="formRef.address"
      type="textarea"
      :placeholder="$t('columns.address')"
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

  const roles = useMasterData<{id: number; name: string}>('admin/system/roles/select-options');
  const branches = useMasterData<{id: number; nameEn: string; nameKh: string}>('admin/master-data/branch/select-options');

  // Get branch code
  watch(()=> [dialogState.dialogState], async()=> {
    if (dialogState.dialogState === CrudDialogState.CREATE) {
      const response: any = await useApi('admin/master-data/branch/next-code');
      if (response) {
        formRef.code = response.payload;
      }
    }
  }, { immediate: true });
</script>

<style>

</style>