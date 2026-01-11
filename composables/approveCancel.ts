export const useApproveCancel = (url: string, feature: string) => {
  const config = useRuntimeConfig();
  const { t: $t } = useI18n()
  const handleApprove = async (item: any, refreshList: Function) => {
    ElMessageBox.confirm(
      `${$t('confirm_approve_feature', { code: item.code , feature: $t(`menu.${feature}`)})}`,
      $t('are_you_sure'),
      {
        confirmButtonText: $t('ok'),
        cancelButtonText: $t('cancel'),
        draggable: true,
        type: 'warning',
        center: true,
      },
    )
    .then( async() => {
      try {
        const response = await useApi(`${config.public.apiBaseUrl}${url}/approve/${item.id}`, {
          method: 'post',
        });
        if (response) {
          await refreshList();
        }
      } catch (error: any) {
        const message =
          error?.data?.message ||
          error?.message ||
          'Something went wrong'

        useNotification(message, 'error');
      } 
    }).catch(() => {
      useMessage($t('approve_canceled'), 'info');
    })
  }

  return { handleApprove }

}
