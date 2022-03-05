import {Image} from '../model/Image'

export interface ProductLineAdmin {
    idBrand:string|null,
    idCategory:string|null,
    idProductLine?:string|null
    nameProduct:string,
    image?:string[]
}