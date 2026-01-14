<template>
  <div>
    <h1>Hellodfgh {{ auth.isLoggedIn }}</h1>
    <pre>{{ perm.permissions }}</pre>
    <pre>{{ auth.token }}</pre>
    <pre>{{ auth.users }}</pre> 
  </div>
</template>

<script lang="ts" setup>
  const auth = useAuthenticationStore();
  const perm = usePermissionStore();
</script>

<style>

</style>