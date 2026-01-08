export const useNotification = (message: string, type: 'error' | 'success' | 'primary' | 'warning' | 'info' = 'success') => {
  return ElNotification({
    message: message,
    type: type,
    customClass: 'font-Nokora z-[2000]',
  });
}
