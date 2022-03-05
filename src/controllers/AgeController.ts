import axios from "axios"
import { Age } from "../model/Age"

class AgeController {

    //get detail
    async get(): Promise<Age[]> {
        return axios.get(`http://localhost:8000/age`).then(res => {
            return res.data
        })
    }
}

export const ageController = new AgeController()
