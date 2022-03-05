export interface OrderItem {
    quantity: number
    product: {
        price:number
        weight: string
        name_age:string
        productLine: {
            createAt:string
            image:string
            nameProduct: string
        }
    }
}