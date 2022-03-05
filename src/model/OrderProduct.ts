import { Product } from "./Product";

export interface OrderProduct{
    id_order: string
    id_product: string
    image: string
    name_product:string
    name_weight:string
    name_age:string
    price:number
    quantity: number
    id_product_line:string
}