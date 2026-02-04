<template>
  <el-tag
    :type="props.status === 'PENDING' ? 'warning' : props.status === 'APPROVED' ? 'success' : props.status === 'PROCESSING' ? 'primary' : props.status === 'COMPLETED' ? 'success' : props.status === 'PAID' ? 'success' : 'danger'"
  >
    {{ props.status }}
  </el-tag>
</template>

<script lang="ts" setup>
import type { ModuleStatus } from '~/types/Status';

  interface Props {
    status: ModuleStatus;
  };

  const props = defineProps<Props>();
</script>

<style>

</style>