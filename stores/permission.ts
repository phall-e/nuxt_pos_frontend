import { defineStore } from 'pinia'

export const usePermissionStore = defineStore('permissionStore', ()=> {
  const permissions = ref<string[]>([]);
  const setPermission = (perms: string[]) => {
    permissions.value = [...perms];
  };

  const reset = () => {
    permissions.value = [];
  };

  const can = (permission: string): boolean => {
    return permissions.value.includes(permission)
  }

  return {
    permissions,
    setPermission,
    reset,
    can,
  }
}, { persist: true });
