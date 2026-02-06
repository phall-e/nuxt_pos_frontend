export interface IButtonAction {
    title: string
    color: 'primary' | 'info' | 'success' | 'danger',
    disabled?: boolean,
    icon: string,
    onClick: () => any
}
export interface IPageHeaderOption {
    pageTitle: string
    breadcrumbs?: string[]
    actions?: IButtonAction[],
    rightActions?: IButtonAction[],
}