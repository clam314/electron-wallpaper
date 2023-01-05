export interface SearchParameter {
    q?: string,
    categories: string,
    purity: string,
    sorting: string,
    order: string,
    topRange?: string,
    atleast?: string,
    resolutions?: string,
    ratios?: string,
    colors?: string,
    page?: number,
    seed?: string
}