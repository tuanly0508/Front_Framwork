import axios from "axios"
import { useContext } from "react"
import { UserContext } from "../contexts/UserContext"
import { Cart } from "../model/Cart"
import { OrderProduct } from "../model/OrderProduct"
import { AuthAxios } from "./AuthAxios"

class CartController {

    async get() {
        return AuthAxios.get(`http://localhost:8000/cart`).then(res => {
            let dataCart: OrderProduct[] = res.data.dataCart
            let totalPrice: number = res.data.totalPrice
            return {dataCart,totalPrice}
        })
    }
    
    async create(cart:Cart) {
        return axios.post(`http://localhost:8000/cart/create`,{cart}).then(res => {        
            let dataCart: OrderProduct[] = res.data.dataCart
            let totalPrice: number = res.data.totalPrice
            return {dataCart,totalPrice}
        })
    }

    async delete(cart:Cart) {
        return axios.post(`http://localhost:8000/cart/delete`,{cart}).then(res => {        
            let dataCart: OrderProduct[] = res.data.dataCart
            let totalPrice: number = res.data.totalPrice
            return {dataCart,totalPrice}
        })
    }

    async update(cart:Cart) {
        return axios.put(`http://localhost:8000/cart/update`,{cart}).then(res => {        
            let dataCart: OrderProduct[] = res.data.dataCart
            let totalPrice: number = res.data.totalPrice
            return {dataCart,totalPrice}
        })
    }
}

export const cartController = new CartController()
