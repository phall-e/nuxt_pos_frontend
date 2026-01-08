import { defineStore } from 'pinia'

export const useAuthenticationStore = defineStore(
  'authenticationStore',
  () => {

    const usePermission = usePermissionStore();
    const isLoggedIn = ref(false)

    const users = ref({
      id: null as number | null,
      username: '',
      isAdmin: false,
      isActive: false,
      createdAt: null as string | null, 
      updatedAt: null as string | null,
      deletedAt: null as string | null,
    })

    const token = ref({
      accessToken: '',
      tokenType: '',
    })

    const login = (formData: {
      users: typeof users.value
      token: typeof token.value
      permissions: string[]
    }) => {
      isLoggedIn.value = true
      users.value = { ...formData.users }
      token.value = { ...formData.token }
      usePermission.setPermission(formData.permissions);
      navigateTo('/')
    }

    const logout = async () => {
      isLoggedIn.value = false
      users.value = {
        id: null,
        username: '',
        isAdmin: false,
        isActive: false,
        createdAt: null,
        updatedAt: null,
        deletedAt: null,
      }
      token.value = {
        accessToken: '',
        tokenType: '',
      }

      usePermission.reset();

      await navigateTo('/auth/login')
    }

    return {
      isLoggedIn,
      // permissions,
      users,
      token,
      login,
      logout,
    }
  },
  {
    persist: true,
  }
)
