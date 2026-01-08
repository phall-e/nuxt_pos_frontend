import type { RouteLocationNormalized } from 'vue-router'

export default defineNuxtRouteMiddleware((to: RouteLocationNormalized) => {
  // ✅ VERY IMPORTANT: only run on client
  if (process.server) return

  const auth = useAuthenticationStore()
  const permissionStore = usePermissionStore()

  const isAuthenticated =
    auth.isLoggedIn &&
    !!auth.token?.accessToken

  // ✅ Allow all auth pages
  if (to.path.startsWith('/auth')) {
    // redirect logged-in users away from login
    if (isAuthenticated && to.path === '/auth/login') {
      return navigateTo('/')
    }
    return
  }

  // ❌ Not authenticated → login
  if (!isAuthenticated) {
    return navigateTo('/auth/login')
  }

  // ✅ Admin bypass permission checks
  if (auth.users?.isAdmin) {
    return
  }

  // 🔐 Permission-based access
  const requiredPermissions = to.meta.permissions as string[] | undefined

  if (requiredPermissions?.length) {
    const userPermissions = permissionStore.permissions ?? []

    const hasPermission = requiredPermissions.some(p =>
      userPermissions.includes(p),
    )

    if (!hasPermission) {
      return navigateTo('/403')
    }
  }
})
