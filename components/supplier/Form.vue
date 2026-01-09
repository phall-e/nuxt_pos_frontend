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
  <el-row :gutter="20">
    <el-col :md="12">
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
    </el-col>
    <el-col :md="12">
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
    </el-col>
    <el-col :md="12">
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
    </el-col>
    <el-col :md="12">
      <el-form-item
        :label="$t('columns.address')"
        prop="address"
      >
        <el-input 
          v-model="formRef.address"
          :placeholder="$t('columns.address')"
          clearable
        />
      </el-form-item>
    </el-col>
    <el-col :md="12">
      <el-form-item
        :label="$t('columns.note')"
        prop="note"
      >
        <el-input 
          v-model="formRef.note"
          type="textarea"
          :placeholder="$t('columns.note')"
          clearable
        />
      </el-form-item>
    </el-col>
    <el-col :md="12">
      <el-form-item
        :label="$t('columns.attachment')"
        prop="attachment"
      >
        <div>
          <single-upload
            v-model="formRef.attachment"
          />
        </div>
      </el-form-item>
    </el-col>
  </el-row>
</template>

<script lang="ts" setup>
import SingleUpload from '~/@core/components/SingleUpload.vue';
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
      const response: any = await useApi('admin/master-data/supplier/next-code');
      if (response) {
        formRef.code = response.payload;
      }
    }
  }, { immediate: true });
</script>

<style>

</style>