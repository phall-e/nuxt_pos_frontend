import type { NavigationItem } from "~/types/NavigationItem";

const navigationItems: NavigationItem[] = [
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
        title: 'menu.supplier',
        icon: 'solar:user-id-outline',
        to: '/master-data/supplier',
        moduleName: 'supplier',
    },
    {
        title: 'menu.purchase_request',
        icon: 'f7:square-list',
        to: '/purchasing/purchase-request',
        moduleName: 'purchase-request',
    },
    {
        title: 'menu.user',
        icon: 'mynaui:user',
        to: '/system/user',
        moduleName: 'user',
    },
];

export default navigationItems;