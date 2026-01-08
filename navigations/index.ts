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
        title: 'menu.user',
        icon: 'mynaui:user',
        to: '/system/user',
        moduleName: 'user',
    },
];

export default navigationItems;