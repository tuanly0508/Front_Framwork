import { Image } from "./Image";

export interface ProductLine {
    idProductLine: string,
    idBrand: string,
    idCategory: string,
    nameProduct: string
    sellCount: number
    createAt: string
    updateAt: string
    image?: Image
}
    
