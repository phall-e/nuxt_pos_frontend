<template>
  <el-form-item
    :label="$t('columns.username')"
    prop="username"
    :rules="[{ required: true }]"
  >
    <el-input 
      v-model="formRef.username"
      :placeholder="$t('columns.username')"
      clearable
    />
  </el-form-item>
  <el-form-item
    :label="$t('menu.branch')"
    prop="branch"
    :rules="[{ required: true }]"
  >
    <el-select
      v-model="formRef.branch"
      :placeholder="$t('menu.branch')"
      filterable
      multiple
    >
      <el-option v-for="item in branches" :key="item.id" :label="item.nameEn + '-' + item.nameKh" :value="item.id"/>
    </el-select>
  </el-form-item>
  <el-form-item
    :label="$t('menu.role')"
    prop="roles"
    :rules="[{ required: true }]"
  >
    <el-select
      v-model="formRef.roles"
      :placeholder="$t('menu.role')"
      filterable
      multiple
    >
      <el-option v-for="item in roles" :key="item.id" :label="item.name" :value="item.id"/>
    </el-select>
  </el-form-item>
  <template v-if="dialogState.dialogState === CrudDialogState.CREATE">
    <el-form-item
      :label="$t('columns.password')"
      prop="password"
      :rules="[{ required: true }]"
    >
      <el-input 
        type="password"
        v-model="formRef.password"
        :placeholder="$t('columns.password')"
        show-password
        clearable
      />
    </el-form-item>
    <el-form-item
      :label="$t('columns.re_password')"
      prop="rePassword"
      :rules="[
        { required: true },
        { validator: validateRePassword, trigger: 'blur' }
      ]"
    >
      <el-input
        type="password"
        v-model="formRef.rePassword"
        :placeholder="$t('columns.re_password')"
        show-password
        clearable
      />
    </el-form-item>
  </template>
  <el-form-item
    :label="$t('columns.is_active')"
    prop="isActive"
  >
    <el-switch
      v-model="formRef.isActive"
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

  const validateRePassword = (
    _rule: any,
    value: string,
    callback: (error?: Error) => void
  ) => {
    if (!value) {
      callback(new Error('Please confirm password'))
    } else if (value !== formRef.password) {
      callback(new Error('Passwords do not match'))
    } else {
      callback()
    }
  }
</script>

<style>

</style>