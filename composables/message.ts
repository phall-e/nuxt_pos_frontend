export const useMessage = (message: string, type: 'error' | 'success' | 'primary' | 'warning' | 'info' = 'success') => {
  return ElMessage({
    message: message,
    type: type,
    grouping: true,
  });
}
