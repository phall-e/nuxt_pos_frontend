<template>
  <div class="h-screen w-full flex items-center justify-center">
    <el-form
      label-position="top"
      ref="formRef"
      :model="formData"
      @submit.prevent="handleSubmit"
      class="w-[98%] md:w-[25%] border p-2 rounded-sm"
    >
      <div class="w-full flex items-center justify-center flex-col mb-8 mt-4">
        <el-image
          :src="logo"
          class="h-[80px]"
        />
      </div>
      <el-form-item
        :label="$t('username')"
        prop="username"
        :rules="[{ required: true }]"
      >
        <el-input
          v-model="formData.username"
          :placeholder="$t('username')"
          clearable
        />
      </el-form-item>
      <el-form-item
        :label="$t('password')"
        prop="password"
        :rules="[{ required: true }]"
      >
        <el-input
          v-model="formData.password"
          :placeholder="$t('password')"
          show-password
          clearable
        />
      </el-form-item>
      <el-form-item>
        <el-button 
          type="success" 
          native-type="submit"
          class="w-full"
        >
          <Icon 
            v-if="loading"
            name="eos-icons:bubble-loading"
          />
          <span v-else>{{ $t('login') }}</span>
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import type { FormInstance } from 'element-plus';
import type { LoginType } from '~/types/login.type';
import logo from '@/assets/logo/logo.png';

  definePageMeta({
    layout: 'auth',
  });

  useHead({
    title: 'POS - Login',
  });

  const formRef = ref<FormInstance>();
  const formData = reactive<LoginType>({
    username: 'Admin',
    password: '123',
  });

  const loading = ref<boolean>(false);

  
  const auth = useAuthenticationStore();

  const handleLogin = async () => {
    try {
        loading.value = true;
        const response: any = await useApi('auth/login', {
          method: 'post',
          body: formData,
        });
        console.log(response);
        await auth.login(response.payload);
    } catch (error: any) {
      const message =
        error?.data?.message ||
        error?.message ||
        'Login failed'

      useNotification(message, 'error')
    } finally {
      loading.value = false;
    }
  }

  const handleSubmit = async () => {
    if (!formRef.value) return

    const valid = await formRef.value.validate();

    if (valid) {
      await handleLogin();
    }
  }

</script>

<style>

</style>