import axios from "axios"
import { OrderItem } from "../model/OrderItem";
import { OrderProduct } from "../model/OrderProduct";
import { OrderTemp } from "../model/OrderTemp";
import { User } from "../model/User"
import { AuthAxios } from "./AuthAxios";


class OrderController {

    //pagination
    async pagination(idUser:string,page:number,size:number) {
        return await AuthAxios.post('http://localhost:8000/order',{idUser,page,size}).then(res => {
            let orderTemp:OrderTemp = res.data.list[0]
            let orderProduct : OrderItem[] = res.data.list[0].orderProduct
            let pageCount: number = res.data.pageCount
            return {orderTemp,orderProduct,pageCount}
        })
    }

    async update(orderTemp:OrderTemp,sellCount:{ idProductLine : string , sellCount : number}[]) {
        return await axios.put('http://localhost:8000/order/update',{orderTemp,sellCount})
    }

    async get(status:string): Promise<OrderTemp[]> {
        return await axios.post('http://localhost:8000/order/get',{status}).then(res => {
            return res.data
        })
    }

    async updateStatus(idOrder:string,status:string,statusGet:string) {
        return await axios.put('http://localhost:8000/order/updateStatus',{idOrder,status,statusGet})
    }
}

export const orderController = new OrderController()
