import axios from "axios"
import { DataRow } from "../page/admin/ProductAdmin"
import {Image} from '../model/Image'

class ImageController {

    async createImage(idProductLine:string,image:string) {
        return axios.post('http://localhost:8000/image/create',{idProductLine,image}).then(res => {
            let list : DataRow[] = res.data.product
            let image: Image[] = res.data.image
            return {list, image}
        })
    }

    async deleteImage(image: string, idProductLine: string) {
        return axios.post(`http://localhost:8000/image/delete`,{image,idProductLine}).then(res => {
            let list : DataRow[] = res.data.product
            let image: Image[] = res.data.image
            return {list, image}
        })
    }
}

export const imageController = new ImageController()
