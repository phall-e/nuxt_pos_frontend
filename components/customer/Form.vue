<template>
  <el-row :gutter="20">
    <el-col :md="12">
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
    <el-col :md="12">
      <el-form-item
        :label="$t('menu.customer_type')"
        prop="customerTypeId"
        :rules="[{ required: true }]"
      >
        <el-select
          v-model="formRef.customerTypeId"
          :placeholder="$t('menu.customer_type')"
          clearable
          filterable
        >
          <el-option 
            v-for="item in customerTypies" 
            :key="item.id" :label="item.nameEn + '-' + item.nameKh" :value="item.id"
            class="font-Nokora"
          />
        </el-select>
      </el-form-item>
    </el-col>
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
    <!-- <el-col :md="12">
      <el-form-item
        :label="$t('columns.picture')"
        prop="attachment"
      >
        <div>
          <single-upload
            v-model="formRef.profile"
          />
        </div>
      </el-form-item>
    </el-col> -->
  </el-row>
  <el-tabs
    v-model="tabActive"
    class="mt-5"
    type="border-card"
  >
    <el-tab-pane name="attachments">
      <template #label>
        <div class="flex items-center gap-1">
          <Icon :size="20" name="hugeicons:attachment-square"/> <div>{{ $t('columns.attachments') }}</div>
        </div>
      </template>
      <drop-zone v-model="formRef.attachments"/>
    </el-tab-pane>
  </el-tabs>
</template>

<script lang="ts" setup>
import DropZone from '~/@core/components/DropZone.vue';
import SingleUpload from '~/@core/components/SingleUpload.vue';
import { CrudDialogState } from '~/types/crud-dialog-state.type';

  const { formRef } = defineProps({
    formRef: {
      type: Object,
      default: () => ({ }),
    }
  });

  const tabActive = ref<string>('attachments');

  const customerTypies = useMasterData<{ id: number; code: number; nameEn: string; nameKh: string }>('admin/master-data/customer-type/select-options');

  const dialogState = useCrudDialogStateStore();

  // Get branch code
  watch(()=> [dialogState.dialogState], async()=> {
    if (dialogState.dialogState === CrudDialogState.CREATE) {
      const response: any = await useApi('admin/master-data/customer/next-code');
      if (response) {
        formRef.code = response.payload;
      }
    }
  }, { immediate: true });
</script>

<style>

</style>