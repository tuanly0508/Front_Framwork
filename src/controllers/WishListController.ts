import axios from "axios"
import { WishList } from "../model/WishList"

class WishListController {
    async get(idUser:string): Promise<WishList[]> {
        return axios.post(`http://localhost:8000/wishlist`,{idUser}).then(res => {
            return res.data
        })
    }

    async update(wishList:WishList): Promise<WishList[]> {
        return axios.put(`http://localhost:8000/wishlist/update`,{wishList}).then(res => {
            return res.data
        })
    }

    async create(wishList:WishList): Promise<WishList[]> {
        return axios.post(`http://localhost:8000/wishlist/create`,{wishList}).then(res => {
            return res.data
        })
    }

    async delete(wishList:WishList): Promise<WishList[]> {
        return axios.post(`http://localhost:8000/wishlist/delete`,{wishList}).then(res => {
            return res.data
        })
    }
}

export const wishListController = new WishListController()
