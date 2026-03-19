import type { NavigationItem } from "~/types/NavigationItem";

const navigationItems: NavigationItem[] = [
    {
        title: 'menu.dashboard',
        icon: 'fluent-mdl2:b-i-dashboard',
        to: '/',
    },
    {
        title: 'menu.branch',
        icon: 'map:store',
        to: '/master-data/branch',
        moduleName: 'branch',
    },
    {
        title: 'menu.category',
        icon: 'iconamoon:category-bold',
        to: '/master-data/category',
        moduleName: 'category',
    },
    {
        title: 'menu.uom',
        icon: 'ph:pencil-ruler-thin',
        to: '/master-data/uom',
        moduleName: 'uom',
    },
    {
        title: 'menu.product',
        icon: 'fa7-solid:list',
        to: '/master-data/product',
        moduleName: 'product',
    },
    {
        title: 'menu.product_barcode',
        icon: 'ion:barcode-outline',
        to: '/master-data/product-bar-code',
        moduleName: 'product',
    },
    {
        title: 'menu.supplier',
        icon: 'solar:user-id-outline',
        to: '/master-data/supplier',
        moduleName: 'supplier',
    },
    {
        title: 'menu.customer_type',
        icon: 'uil:layer-group',
        to: '/master-data/customer-type',
        moduleName: 'customer-type',
    },
    {
        title: 'menu.customer',
        icon: 'stash:people-group-duotone',
        to: '/master-data/customer',
        moduleName: 'customer',
    },
    {
        title: 'menu.purchase_request',
        icon: 'f7:square-list',
        to: '/purchasing/purchase-request',
        moduleName: 'purchase-request',
    },
    {
        title: 'menu.purchase_order',
        icon: 'lsicon:shopping-cart-outline',
        to: '/purchasing/purchase-order',
        moduleName: 'purchase-order',
    },
    {
        title: 'menu.purchase_receipt',
        icon: 'ph:invoice',
        to: '/purchasing/purchase-receipt',
        moduleName: 'purchase-receipt',
    },
    {
        title: 'menu.purchase_receipt_billing',
        icon: 'mdi:invoice-text-edit-outline',
        to: '/purchasing/purchase-receipt-billing',
        moduleName: 'purchase-receipt-billing',
    },
    {
        title: 'menu.stock',
        icon: 'lucide:store',
        to: '/stocking/stock',
        moduleName: 'stock',
    },
    {
        title: 'menu.stock_in',
        icon: 'hugeicons:shopping-cart-check-in-02',
        to: '/stocking/stock-in',
        moduleName: 'stock-in',
    },
    {
        title: 'menu.stock_adjustment',
        icon: 'heroicons:adjustments-horizontal-solid',
        to: '/stocking/stock-adjustment',
        moduleName: 'stock-adjustment',
    },
    {
        title: 'menu.stock_transfer',
        icon: 'solar:square-transfer-horizontal-outline',
        to: '/stocking/stock-transfer',
        moduleName: 'stock-transfer',
    },
    {
        title: 'menu.sale',
        icon: 'heroicons-outline:currency-dollar',
        to: '/saling/sale',
        moduleName: 'sale',
    },
    {
        title: 'menu.sale_payment_receipt',
        icon: 'mdi:invoice-text-edit-outline',
        to: '/saling/sale-payment-receipt',
        moduleName: 'sale-payment-receipt',
    },
    {
        title: 'menu.user',
        icon: 'mynaui:user',
        to: '/system/user',
        moduleName: 'user',
    },
];

export default navigationItems;