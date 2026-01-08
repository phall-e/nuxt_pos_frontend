import type { NavigationItem } from "~/types/NavigationItem";

const navigationItems: NavigationItem[] = [
    {
        title: 'menu.branch',
        icon: 'map:store',
        to: '/master-data/branch',
        moduleName: 'branch',
    },
    {
        title: 'menu.user',
        icon: 'mynaui:user',
        to: '/system/user',
        moduleName: 'user',
    },
];

export default navigationItems;