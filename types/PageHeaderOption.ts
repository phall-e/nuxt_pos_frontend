export interface IButtonAction {
    title: string
    variant?: any
    color?: string
    disabled?: boolean
    onClick: () => any
}
export interface IPageHeaderOption {
    pageTitle: string
    breadcrumbs?: string[]
    actions?: IButtonAction[]
}