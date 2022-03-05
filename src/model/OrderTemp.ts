
import { OrderProduct } from "./OrderProduct";
import { User } from "./User";

export interface OrderTemp {
    idOrder: string;
    idUser: string
    name: string
    email:string
    phone:string
    address:string
    createAt?:string
    status?: string
}

