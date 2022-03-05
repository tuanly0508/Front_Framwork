import React, { ReactNode, useEffect, useState } from "react";
import { User } from "../model/User";
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { userController } from "../controllers/UserController";

interface UserContextProviderProps {
    children: ReactNode
}

type State = {
    user: User,
    changeUser: (user: User) => void
    popupAdd: (content:string) => void
    popupErr: (content:string) => void
}

const StateDefault = {
    user: { id_user: "", name_user: "", email: "", phone: "", address: "", role: '' ,id_order:''},
    changeUser: () => { },
    popupAdd: () => {},
    popupErr: () => {}
}

export const UserContext = React.createContext<State>(StateDefault)

export const UserContextProvider = ({ children }: UserContextProviderProps) => {
    const [state, setState] = useState<State>(StateDefault)

    useEffect(()=> {
        if(localStorage.getItem('accessToken')) {
            userController.getMe().then(res => {
                setState(prev=>({...prev,user: res}))
            })
        }
    },[])
    
    const changeUser = (user: User) => {
        setState(prev => ({ ...prev, user: user }))
    }

    const popupAdd = (content:string) => {
        toast.success(content, {
            position: 'bottom-right',
            autoClose: 2000
        })
    }

    const popupErr = (content:string) => {
        toast.error(content, {
            position: 'bottom-right',
            autoClose: 2000
        })
    }

    const data: State = { user: state.user, changeUser,popupAdd,popupErr}
    
    return (
        <UserContext.Provider value={data}>
            {children}
            <ToastContainer />
        </UserContext.Provider>
    )
}