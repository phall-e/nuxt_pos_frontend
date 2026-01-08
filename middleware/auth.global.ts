export default defineNuxtRouteMiddleware((to) => {
  // ✅ VERY IMPORTANT: only run on client
  if (process.server) return

  const auth = useAuthenticationStore()

  const isAuthenticated =
    auth.isLoggedIn &&
    !!auth.token?.accessToken

  // ✅ allow all auth pages
  if (to.path.startsWith('/auth')) {
    // redirect logged-in user away from login
    if (isAuthenticated && to.path === '/auth/login') {
      return navigateTo('/')
    }
    return
  }

  // ❌ protect all other pages
  if (!isAuthenticated) {
    return navigateTo('/auth/login')
  }
})
