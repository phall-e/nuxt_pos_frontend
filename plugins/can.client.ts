export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.directive('can', {
        mounted(el, binding) {
            const auth = useAuthenticationStore();
            const permission = usePermissionStore();
            if (!auth.users.isAdmin) {
                if (!permission.can(binding.value)) {
                    el.style.display = 'none';
                }
            }
        }
    })
})
