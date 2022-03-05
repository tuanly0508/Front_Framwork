import axios from "axios"
import { Category } from "../model/Category"

class CategoryController {

    async get(): Promise<Category[]> {
        return await axios.get(`http://localhost:8000/category`).then(res => {
            return res.data
        })
    }

    async create(category: Category): Promise<Category[]> {
        return await axios.post(`http://localhost:8000/category/create`,{category}).then(res => {
            return res.data
        })
    }

    async update(category: Category): Promise<Category[]> {
        return await axios.put(`http://localhost:8000/category/update`,{category}).then(res => {
            return res.data
        })
    }

    async delete(id_category: string): Promise<Category[]> {
        return await axios.post(`http://localhost:8000/category/delete`,{id_category}).then(res => {
            return res.data
        })
    }
}

export const categoryController = new CategoryController()
