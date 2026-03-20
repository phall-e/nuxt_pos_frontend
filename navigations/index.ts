import type { NavigationItem } from '~/types/NavigationItem'

const navigationItems: NavigationItem[] = [
  {
    title: 'menu.dashboard',
    icon: 'solar:chart-2-outline',
    children: [
      {
        title: 'menu.dashboard',
        icon: 'mage:dashboard-check',
        to: '/',
      },
    ],
  },
  {
    title: 'menu.master_data',
    icon: 'hugeicons:dashboard-square-setting',
    children: [
      {
        title: 'menu.branch',
        icon: 'map:store',
        to: '/master-data/branch',
        permission: 'read-branch',
      },
      {
        title: 'menu.category',
        icon: 'iconamoon:category-bold',
        to: '/master-data/category',
        permission: 'read-category',
      },
      {
        title: 'menu.uom',
        icon: 'ph:pencil-ruler-thin',
        to: '/master-data/uom',
        permission: 'read-uom',
      },
      {
        title: 'menu.product',
        icon: 'fa7-solid:list',
        to: '/master-data/product',
        permission: 'read-product',
      },
      {
        title: 'menu.product_barcode',
        icon: 'ion:barcode-outline',
        to: '/master-data/product-bar-code',
        permission: 'read-product',
      },
      {
        title: 'menu.supplier',
        icon: 'solar:user-id-outline',
        to: '/master-data/supplier',
        permission: 'read-supplier',
      },
      {
        title: 'menu.customer_type',
        icon: 'uil:layer-group',
        to: '/master-data/customer-type',
        permission: 'read-customer-type',
      },
      {
        title: 'menu.customer',
        icon: 'stash:people-group-duotone',
        to: '/master-data/customer',
        permission: 'read-customer',
      },
    ],
  },
  {
    title: 'menu.purchasing',
    icon: 'wordpress:list',
    children: [
      {
        title: 'menu.purchase_request',
        icon: 'f7:square-list',
        to: '/purchasing/purchase-request',
        permission: 'read-purchase-request',
      },
      {
        title: 'menu.purchase_order',
        icon: 'lsicon:shopping-cart-outline',
        to: '/purchasing/purchase-order',
        permission: 'read-purchase-order',
      },
      {
        title: 'menu.purchase_receipt',
        icon: 'ph:invoice',
        to: '/purchasing/purchase-receipt',
        permission: 'read-purchase-receipt',
      },
      {
        title: 'menu.purchase_receipt_billing',
        icon: 'mdi:invoice-text-edit-outline',
        to: '/purchasing/purchase-receipt-billing',
        permission: 'read-purchase-receipt-billing',
      },
    ],
  },
  {
    title: 'menu.stocking',
    icon: 'lucide:store',
    children: [
      {
        title: 'menu.stock',
        icon: 'tabler:list-filled',
        to: '/stocking/stock',
        permission: 'read-stock',
      },
      {
        title: 'menu.stock_in',
        icon: 'hugeicons:shopping-cart-check-in-02',
        to: '/stocking/stock-in',
        permission: 'read-stock-in',
      },
      {
        title: 'menu.stock_adjustment',
        icon: 'heroicons:adjustments-horizontal-solid',
        to: '/stocking/stock-adjustment',
        permission: 'read-stock-adjustment',
      },
      {
        title: 'menu.stock_transfer',
        icon: 'solar:square-transfer-horizontal-outline',
        to: '/stocking/stock-transfer',
        permission: 'read-stock-transfer',
      },
    ],
  },
  {
    title: 'menu.saling',
    icon: 'iconoir:home-sale',
    children: [
      {
        title: 'menu.sale',
        icon: 'heroicons-outline:currency-dollar',
        to: '/saling/sale',
        permission: 'read-sale',
      },
      {
        title: 'menu.sale_payment_receipt',
        icon: 'mdi:invoice-text-edit-outline',
        to: '/saling/sale-payment-receipt',
        permission: 'read-sale-payment-receipt',
      },
    ],
  },
  {
    title: 'menu.system',
    icon: 'lsicon:setting-outline',
    children: [
      {
        title: 'menu.user',
        icon: 'mynaui:user',
        to: '/system/user',
        permission: 'read-user',
      },
      {
        title: 'menu.role',
        icon: 'proicons:lock',
        to: '/system/role',
        permission: 'read-role',
      },
    ],
  },
]

export const useNavigationItems = () => {
  const authStore = useAuthenticationStore()
  const permissionStore = usePermissionStore()

  return computed(() =>
    navigationItems
      .map((item) => ({
        ...item,
        children: item.children.filter((child) => {
          if (!child.permission) return true
          if (authStore.users?.isAdmin) return true

          return permissionStore.can(child.permission)
        }),
      }))
      .filter((item) => item.children.length > 0)
  )
}

export default useNavigationItems
