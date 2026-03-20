export interface NavigationChildren {
    title: string
    icon: string
    to: string
    permission?: string,
}

export interface NavigationItem {
    title: string 
    icon: string
    children: NavigationChildren[]
}