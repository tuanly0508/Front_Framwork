import axios from "axios"
import { Brand } from "../model/Brand"
import { PaginationModel } from "../model/Pagination"
import { Product } from "../model/Product"
import { ProductLineAdmin } from "../model/ProductLineAdmin"
import { DataRow } from "../page/admin/ProductAdmin"
import { Image } from "../model/Image"
import { AuthAxios } from "./AuthAxios"


class ProductController {

    //product user
    async pagination(list:PaginationModel) {
        return await AuthAxios.post('http://localhost:8000/product/list',list).then(res => {      
            let list : Product[] = res.data.dataProduct
            let pageCount: number = res.data.pageCount
            let brand: Brand[] = res.data.brand
            return {list, pageCount,brand}
        })
    }

    async getDetail(idProductLine:string) {
        return await axios.post(`http://localhost:8000/product/detail`,{idProductLine}).then(res => {
            let image = res.data.image
            let product = res.data.product
            let weight =  res.data.weight
            let age = res.data.age
            return {image,product,weight,age}
        })
    }
    
    async update(product: Product, idProduct: string) {
        return await axios.put(`http://localhost:8000/product/update/${idProduct}`,product).then(res => {
            return res.data
        })
    }
    
    //product line
    async getProductLine(list:PaginationModel) {
        return await AuthAxios.post(`http://localhost:8000/product-line/get`,list).then(res => {          
            let list : DataRow[] = res.data.dataProduct
            let pageCount: number = res.data.pageCount
            return {list, pageCount}
        })
    }
    
    async createProductLine(product: ProductLineAdmin,pagination:PaginationModel) {
        return await axios.post('http://localhost:8000/product-line/create',{product,pagination}).then(res => {
            let list : DataRow[] = res.data.dataProduct
            let pageCount: number = res.data.pageCount
            return {list, pageCount}
        })
    }

    async updateProductLine(nameProduct:string,idBrand:string|null,idCategory:string|null,idProductLine: string,pagination:PaginationModel) {
        return await axios.put(`http://localhost:8000/product-line/update`,{nameProduct,idBrand,idCategory,idProductLine,pagination}).then(res => {
            let list : DataRow[] = res.data.dataProduct
            let pageCount: number = res.data.pageCount
            return {list, pageCount}
        })
    }

    async deleteProductLine(idProductLine: string,pagination:PaginationModel) {
        return await axios.post(`http://localhost:8000/product-line/delete`,{idProductLine,pagination}).then(res => {
            let list : DataRow[] = res.data.dataProduct
            let pageCount: number = res.data.pageCount
            return {list, pageCount}
        })
    }

    async getByIdProductLine(idProductLine:string) {
        return await axios.post(`http://localhost:8000/product-line/get-by-id`,{idProductLine}).then(res => {          
            let list : DataRow[] = res.data.product
            let image: Image[] = res.data.image
            return {list, image}
        })
    }

    //product
    async getProduct(idProductLine: string):Promise<Product[]> {
        return await axios.post(`http://localhost:8000/product-admin/get`,{idProductLine}).then(res => {
            return res.data
        })
    }

    async updateProduct(idProduct: string,idWeight:string,price:number,idProductLine:string,idAge:string) {
        return await axios.put(`http://localhost:8000/product-admin/update`,{idProduct,idWeight,price,idProductLine,idAge}).then(res => {
            return res.data
        })
    }

    async createProduct(product:Product) {
        return await axios.post(`http://localhost:8000/product-admin/create`,{product}).then(res => {
            return res.data
        })
    }

    async deleteProduct(idProduct:string,idProductLine:string) {
        return await axios.post(`http://localhost:8000/product-admin/delete`,{idProduct,idProductLine}).then(res => {
            return res.data
        })
    }
}

export const productController = new ProductController()