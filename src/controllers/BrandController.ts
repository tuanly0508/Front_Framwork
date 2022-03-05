import axios from "axios"
import { Brand } from "../model/Brand"

class BrandController {

    //get detail
    async get(): Promise<Brand[]> {
        return axios.get(`http://localhost:8000/brand`).then(res => {
            return res.data
        })
    }
}

export const brandController = new BrandController()
