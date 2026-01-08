export interface IDialogOptions {
    fullscreen?: boolean
    width?: number;
}

export interface UseCrudOption {
    // defaultFilters?: Record<string, any>
    // orderBy?: string
    // orderDirection?: 'ASC' | 'DESC'
    mapEditValue?: (data: any) => any 
    mapCreateValue?: (data: any) => any
    // mapFormValue?: (data: any) => any 
    defaultCreateValue?: Record<string, any>
    dialogOptions: IDialogOptions
    showSelect?: boolean
    // selectedKeyItem?: string
}