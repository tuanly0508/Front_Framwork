export interface PaginationModel {
    size: number,
    page: number,
    search?: string,
    field?: string,
    sort?: string
    countPage?:number
}