import React, {ReactNode, useContext, useEffect, useState } from "react";
import { wishListController } from "../controllers/WishListController";
import { WishList } from "../model/WishList";
import { UserContext } from "./UserContext";

interface WishListContextProviderProps {
    children: ReactNode
}

type State = {
    quantity: number
    wishList: WishList[]
    changeWishList: (wishList:WishList[]) => void
}

const StateDefault = {
    quantity:0,
    wishList: [],
    changeWishList: () => {}
}

export const WishListContext = React.createContext<State>(StateDefault)

export const WishListContextProvider = ({ children }: WishListContextProviderProps) => {
    const userContext = useContext(UserContext)
    const [state, setState] = useState<State>(StateDefault)
    
    useEffect(() => {
        if(userContext.user.id_user!==""){
            wishListController.get(userContext.user.id_user).then(res => {
                setState(prev=>({...prev,quantity:res.length ,wishList:res}))
            })
        }
    },[userContext.user])

    const changeWishList = (wishList: WishList[]) => {
        setState(prev=>({...prev,wishList:wishList,quantity:wishList.length}))
    }

    const data: State = {wishList:state.wishList,quantity:state.quantity,changeWishList }
    return (
        <WishListContext.Provider value={data}>
            {children}
        </WishListContext.Provider>
    )
}