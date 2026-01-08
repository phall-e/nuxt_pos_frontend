import { defu } from 'defu'

export const useApi = async <T>(
  url: string,
  options: {
    method?: 'get' | 'post' | 'put' | 'patch' | 'delete'
    params?: any
    body?: any
    headers?: Record<string, string>
  } = {},
  authOnly: boolean = true
): Promise<T> => {
  const auth = useAuthenticationStore()
  const config = useRuntimeConfig()

  try {
    return await $fetch<T>(url, {
      baseURL: config.public.apiBaseUrl,
      ...options,
      headers: defu(options.headers, auth.token.accessToken
        ? { Authorization: `Bearer ${auth.token.accessToken}` }
        : {}
      ),
    })
  } catch (error: any) {
    if (authOnly && error?.status === 401) {
      await auth.logout()
    }
    throw error
  }
}
