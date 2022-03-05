import { ProductLine } from "./ProductLine";
import { Weight } from "./Weight";

export interface Product{
   id_product: string
   id_product_line: string
   id_weight?:string 
   name_weight?:string
   price?: number
   image?:string
   name_product?: string
   name_brand?: string
   id_brand?: string
   create_at?:string
   update_at?:string
   id_age?:string
   name_age?:string
   likes?: boolean
   sell_count?:number
}

