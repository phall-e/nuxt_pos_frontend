<template>
  <el-container
    style="height: 100vh; background-color: #f5f5f9;"
  >
    <el-aside
      class="border-r bg-blue-800"
      width="250px"
    >
      <Sidebar/>
    </el-aside>
    <el-container>
      <el-header
        class="border-b flex items-center justify-between bg-white"
      >
        <div>
          <Icon name="fe:bar"/>
        </div>
        <div class="flex items-center gap-4">
          <el-dropdown>
            <div class="flex items-center gap-1">
              <Icon :name="language?.icon || ''"/> 
              <span>{{ language?.label }}</span>
            </div>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item 
                  v-for="item in languages"
                  :key="item.key"
                  @click="changeLanguage(item.key)" 
                  class="flex items-center font-Nokora"
                >
                  <Icon :name="item.icon"/>&nbsp;&nbsp;{{ item.label }} 
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
          <el-dropdown>
            <div class="flex items-center gap-1">
              <span class="text-[14px] text-[#606266]">{{$t('hello') + ', ' + auth.users.username }}</span>
              <el-image
                class="h-[35px] w-[35px] rounded-full"
                src="https://imgs.search.brave.com/G3no1L1jBEup9HSgEPGaVi0IIhlssTINXrPx9kBLMqo/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTgz/NDgwMjUzMS9waG90/by9wb3J0cmFpdC1v/Zi1hLXlvdW5nLW1h/bi1iYXNraW5nLWlu/LXRoZS1tb3JuaW5n/LXN1bi5qcGc_cz02/MTJ4NjEyJnc9MCZr/PTIwJmM9TkFfaW5h/azJWeXlUYXQ2a1RB/aUVtdUt3a2puX1ly/aDNvS0dYRmIyS1F3/ND0"
              />
            </div>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item 
                  class="flex items-center flex-col gap-2 font-Nokora"
                  disabled
                >
                  <el-image 
                    class="h-[50px] w-[50px] rounded-full"
                    src="https://imgs.search.brave.com/G3no1L1jBEup9HSgEPGaVi0IIhlssTINXrPx9kBLMqo/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTgz/NDgwMjUzMS9waG90/by9wb3J0cmFpdC1v/Zi1hLXlvdW5nLW1h/bi1iYXNraW5nLWlu/LXRoZS1tb3JuaW5n/LXN1bi5qcGc_cz02/MTJ4NjEyJnc9MCZr/PTIwJmM9TkFfaW5h/azJWeXlUYXQ2a1RB/aUVtdUt3a2puX1ly/aDNvS0dYRmIyS1F3/ND0"
                  />
                  <div class="font-Nokora flex items-center flex-col gap-1">
                    <div>{{ auth.users.username }}</div>
                    <div class="text-[12px]">{{ $t('member_since') +' '+ dateFormatter(auth.users.createdAt) }}</div>
                  </div>
                </el-dropdown-item>
                <el-dropdown-item 
                  class="flex items-center font-Nokora"
                  @click="handleProfileView(true)"
                >
                  <Icon :size="18" name="hugeicons:user-square"/>&nbsp;&nbsp;{{ $t('view_profile') }} 
                </el-dropdown-item>
                <el-dropdown-item 
                  class="flex items-center font-Nokora"
                   @click="handleProfileView(false)"
                >
                  <Icon :size="18" name="akar-icons:edit"/>&nbsp;&nbsp;{{ $t('edit_profile') }} 
                </el-dropdown-item>
                <el-dropdown-item 
                  class="flex items-center font-Nokora"
                  @click="isChangePasswordOpen = true"
                >
                  <Icon :size="18" name="mingcute:lock-line"/>&nbsp;&nbsp;{{ $t('change_password') }} 
                </el-dropdown-item>
                <el-dropdown-item 
                  class="flex items-center font-Nokora"
                  @click="logout"
                >
                  <Icon :size="18" name="ri:logout-circle-r-line"/>&nbsp;&nbsp;{{ $t('logout') }} 
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </el-header>
      <el-main>
        <el-scrollbar>
          <slot/>
        </el-scrollbar>
      </el-main>
    </el-container>
  </el-container>

  <!-- User Information dialog -->
  <el-dialog
    v-model="isProfileOpen"
    :title="isProfileView ? $t('view_profile') : $t('edit_profile')"
    draggable
  >
    <el-form
      ref="formRef"
      label-position="top"
      :model="formData"
      v-loading="profileLoading"
      @submit.prevent="handleProfileEdit"
    >
      <el-form-item
        :label="$t('columns.username')"
        prop="username"
        :rules="[{ required: true }]"
      >
        <el-input 
          v-model="formData.username"
          :placeholder="$t('columns.username')"
          :readonly="isProfileView"
          clearable
        />
      </el-form-item>
      <el-form-item
        :label="$t('menu.branch')"
        prop="branch"
        :rules="[{ required: true }]"
      >
        <el-select
          v-model="formData.branch"
          :placeholder="$t('columns.choose')"
          disabled
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
          v-model="formData.roles"
          :placeholder="$t('columns.choose')"
          disabled
          multiple
        >
          <el-option v-for="item in roles" :key="item.id" :label="item.name" :value="item.id"/>
        </el-select>
      </el-form-item>
      <el-row :gutter="4">
        <el-col :span="12">
          <el-form-item
            :label="$t('columns.is_admin')"
            prop="isAdmin"
          >
            <el-checkbox v-model="formData.isAdmin" :label="$t('columns.is_admin')" border disabled/>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
          :label="$t('columns.is_active')"
          prop="isActive"
        >
          <el-checkbox v-model="formData.isActive" :label="$t('columns.is_active')" border disabled/>
        </el-form-item>
        </el-col>
      </el-row>
      <el-button v-show="false" native-type="submit"/>
    </el-form>  
    <template v-if="!isProfileView" #footer>
      <el-button>{{ $t('cancel') }}</el-button>
      <el-button 
        type="primary" 
        @click="handleProfileEdit"
      >
          <Icon
            name="icon-park-outline:loading-one"
            v-if="profileEditLoading"
            class="animate-spin"
          />
          <span v-else>{{ $t('save') }}</span>
      </el-button>
    </template>
  </el-dialog>

  <!-- Change Password Dialog -->
  <el-dialog
    :title="$t('change_password')"
    v-model="isChangePasswordOpen"
    draggable
  >
    <el-form
      ref="changePasswordFormRef"
      :model="passwordFormData"
      label-position="top"
    >
      <el-form-item
        :label="$t('columns.old_password')"
        prop="oldPassword"
        :rules="[{ required: true }]"
      >
        <el-input
          type="password"
          v-model="passwordFormData.oldPassword"
          :placeholder="$t('columns.old_password')"
          show-password
          clearable
        />
      </el-form-item>
      <el-form-item
        :label="$t('columns.new_password')"
        prop="newPassword"
        :rules="[{ required: true }]"
      >
        <el-input
          type="password"
          v-model="passwordFormData.newPassword"
          :placeholder="$t('columns.new_password')"
          show-password
          clearable
        />
      </el-form-item>
      <el-button v-show="false" native-type="submit"/>
    </el-form>
    <template #footer>
      <el-button>{{ $t('cancel') }}</el-button>
      <el-button 
        type="primary" 
        @click="handleChangePassword"
      >
          <Icon
            name="icon-park-outline:loading-one"
            v-if="changePasswordLoading"
            class="animate-spin"
          />
          <span v-else>{{ $t('save') }}</span>
      </el-button>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
  import type { FormInstance } from 'element-plus';
  const auth = useAuthenticationStore();

  const roles = useMasterData<{id: number; name: string}>('admin/system/roles/select-options');
  const branches = useMasterData<{id: number; nameEn: string; nameKh: string}>('admin/master-data/branch/select-options');

  interface Language {
    label: string;
    icon: string;
    key: 'en' | 'km';
  };

  const languages = ref<Language[]>([
    {
      label: 'English',
      icon: 'emojione-v1:flag-for-united-states',
      key: 'en',
    },
    {
      label: 'ភាសាខ្មែរ',
      icon: 'emojione-v1:flag-for-cambodia',
      key: 'km',
    },
  ]);
  const { locale, setLocale } = useI18n();

  const changeLanguage = (key: 'en' | 'km') => {
    setLocale(key);
  }

  const language = computed<Language | undefined>(() => {
    const item = languages.value.find((i: Language) => i.key === locale.value);
    return item;
  });

  // Authentication
  const logout = () => {
    useMessage($t('logout_successfully'));
    auth.logout();
  };

  // User information
  const isProfileOpen = ref<boolean>(false);
  const isProfileView = ref<boolean>(false);
  const profileLoading = ref<boolean>(false);
  const profileEditLoading = ref<boolean>(false);

  const formRef = ref<FormInstance>();
  const formData = ref<any>({
    username: '',
    isAdmin: false,
    isActive: true,
    roles: [],
    branch: [],
  });

  const handleProfileView = async(isEdit: boolean) => {
    isProfileOpen.value = true;
    profileLoading.value = true;
    isProfileView.value = isEdit;
    try {
      const response: any = await useApi(`admin/system/users/${auth.users.id}`);
      if (response) {
        console.log(response);
        formData.value.username = response.payload.username;
        formData.value.isActive = response.payload.isActive;
        formData.value.isAdmin = response.payload.isAdmin;
        formData.value.roles = response.payload.roles && response.payload.roles.length > 0 ? 
          response.payload.roles.map((i: any) => i.id) : [];
        formData.value.branch = response.payload.branches && response.payload.branches.length > 0 ? 
          response.payload.branches.map((i: any) => i.id) : [];
      }
    } catch (error: any) {
      const message =
            error?.data?.message ||
            error?.message ||
            'Something went wrong'

      useNotification(message, 'error')
    } finally {
      profileLoading.value = false;
    }
  }

  const handleProfileEdit = () => {
    formRef.value?.validate( async (valid) => {
      if (valid) {
        try {
          profileEditLoading.value = true;
          const response: any = await useApi(`admin/system/users/${auth.users.id}`, {
            method: 'put',
            body: formData.value,
          });
          if (response) {
            console.log(response);
            useNotification($t('your_profile_updated_successfully'));
            auth.users.username = response.payload.username;
            isProfileOpen.value = false;
          }
        } catch (error: any) {
          const message =
            error?.data?.message ||
            error?.message ||
            'Something went wrong'

          useNotification(message, 'error')
        } finally {
          profileEditLoading.value = false;
        }
      }
      return;
    })
  };


  // Change password
  const isChangePasswordOpen = ref<boolean>(false);
  const passwordFormData = ref({
    oldPassword: '',
    newPassword: '',
  });

  const changePasswordLoading = ref<boolean>(false);
  const changePasswordFormRef = ref<FormInstance>();
  const handleChangePassword = () => {
    changePasswordFormRef.value?.validate( async (valid) => {
      if (valid) {
        try {
          changePasswordLoading.value = true;
          const response: any = await useApi('admin/system/users/change-password', {
            method: 'post',
            body: passwordFormData.value,
          });
          if (response) {
            useNotification($t('your_password_change_successfully'));
            isChangePasswordOpen.value = false;
          }
        } catch (error: any) {
          const message =
            error?.data?.message ||
            error?.message ||
            'Something went wrong'

          useNotification(message, 'error')
        } finally {
          changePasswordLoading.value = false;
        }
      }
      return;
    })
  };

  watch(()=> [isChangePasswordOpen.value], () => {
    if (isChangePasswordOpen.value === false) {
      changePasswordFormRef.value?.resetFields();
    }
  }, { immediate: true });
</script>

<style>

</style>