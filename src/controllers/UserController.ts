import axios from "axios"
import { User } from "../model/User"
import { AuthAxios } from "./AuthAxios"

class UserController {

    async getMe():Promise<User> {
        return AuthAxios.get(`http://localhost:8000/users/getMe`).then(res => {
            return res.data[0]
        })
    }

    async list():Promise<User[]> {
        return axios.get(`http://localhost:8000/users/list`).then(res => {
            return res.data
        })
    }

    async login(email: string,pass:string){
        return await axios.post(`http://localhost:8000/users/login`,{email,pass}).then(res => {
            localStorage.setItem('accessToken', res.data.accessToken)
            AuthAxios.defaults.headers.common['authorization'] = res.data.accessToken
            return res.data
        })
    }

    async getUserDetail(idUser: string): Promise<User[]> {
        return axios.get(`http://localhost:8000/users/detail/${idUser}`).then(res => {
            return res.data
        })
    }                       

    async create(user:User):Promise<User[]>{
        return await axios.post(`http://localhost:8000/users/register`,{user}).then(res => {
            return res.data
        })
    }

    async delete(idUser:string):Promise<User[]>{
        return await axios.post(`http://localhost:8000/users/delete`,{idUser}).then(res => {
            return res.data
        })
    }

    async update(user:User):Promise<User[]> {
        return await axios.put(`http://localhost:8000/users/update`,{user}).then(res => {
            return res.data
        })
    }
}

export const userController = new UserController()

    




