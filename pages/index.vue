<template>
  <div>
    <h1>Hellodfgh {{ auth.isLoggedIn }}</h1>
    <pre>{{ perm.permissions }}</pre>
    <pre>{{ auth.token }}</pre>
    <pre>{{ auth.users }}</pre> 
    <h1 @click="counter.increment">{{ counter.count }}</h1>
  </div>
</template>

<script lang="ts" setup>
  const auth = useAuthenticationStore();
  const counter = useMyCountStore();
  const perm = usePermissionStore();
</script>

<style>

</style>