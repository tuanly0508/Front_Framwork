import axios from "axios"
import { Brand } from "../model/Brand"
import { Weight } from "../model/Weight"

class WeightController {

    //get detail
    async list(idProductLine:string): Promise<Weight[]> {
        return axios.get(`http://localhost:8000/weight/${idProductLine}`).then(res => {
            return res.data
        })
    }

    //get detail
    async get(): Promise<Weight[]> {
        return axios.get(`http://localhost:8000/weight`).then(res => {
            return res.data
        })
    }
}

export const weightController = new WeightController()
