<template>
  <el-row :gutter="20">
    <el-col :span="12">
      <el-form-item
        :label="$t('columns.name')"
        prop="name"
        :rules="[{ required: true }]"
      >
        <el-input 
          v-model="formRef.name"
          :placeholder="$t('columns.name')"
          clearable
        />
      </el-form-item>
    </el-col>
    <el-col :span="12">
      <el-form-item
        :label="$t('columns.description')"
        prop="description"
        :rules="[{ required: true }]"
      >
        <el-input 
          v-model="formRef.description"
          :placeholder="$t('columns.description')"
          clearable
        />
      </el-form-item>
    </el-col>
  </el-row>
  <el-text class="my-5">{{ $t('menu.permission') }}</el-text>
  <div v-for="(items, key) in groupedPermissions" :key="key">
    <el-checkbox
      :model-value="isGroupChecked(items)"
      :indeterminate="isGroupIndeterminate(items)"
      @change="handleCheckAllChange(items, $event)"
    >
      {{ $t(`menu.${key}`)}}
    </el-checkbox>
    <el-checkbox-group
      v-model="formRef.permissions"
    >
      <el-row class="mb-2">
        <el-col 
          :span="8"
          v-for="perm in items" :key="perm.id"
        >
          <el-checkbox :label="perm.name" :value="perm.id">
            {{ perm.description.replace('-', ' ') }}
          </el-checkbox>
        </el-col>
      </el-row>
    </el-checkbox-group>
  </div>

</template>

<script lang="ts" setup>
import type { CheckboxValueType } from 'element-plus';

  const { formRef } = defineProps({
    formRef: {
      type: Object,
      default: () => ({ }),
    }
  });

  type Permission = {
    id: number;
    name: string;
    description: string;
  };

  const permissions = useMasterData<Permission>(
    'admin/system/permissions/select-options'
  );


  const groupedPermissions = computed(() => {
    return (permissions.value || []).reduce((acc, item) => {
      const parts = item.name.split('-');
      const module = parts[1];

      if (!module) return acc; // ✅ guard

      if (!acc[module]) acc[module] = [];

      acc[module].push(item);

      return acc;
    }, {} as Record<string, Permission[]>);
  });

  const selectedPermissions = computed<number[]>({
    get: () => Array.isArray(formRef.permissions) ? formRef.permissions : [],
    set: (value) => {
      formRef.permissions = value;
    },
  });

  const isGroupChecked = (items: Permission[]) => {
    if (!items.length) return false;

    return items.every(item => selectedPermissions.value.includes(item.id));
  };

  const isGroupIndeterminate = (items: Permission[]) => {
    const checkedCount = items.filter(item => selectedPermissions.value.includes(item.id)).length;

    return checkedCount > 0 && checkedCount < items.length;
  };

  const handleCheckAllChange = (items: Permission[], val: CheckboxValueType) => {
    const itemIds = items.map(item => item.id);

    if (val) {
      selectedPermissions.value = Array.from(new Set([
        ...selectedPermissions.value,
        ...itemIds,
      ]));

      return;
    }

    selectedPermissions.value = selectedPermissions.value.filter(
      permissionId => !itemIds.includes(permissionId)
    );
  };

</script>
