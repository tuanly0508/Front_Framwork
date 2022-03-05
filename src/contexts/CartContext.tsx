import React, { ReactNode, useEffect, useState } from "react";
import { cartController } from "../controllers/CartController";
import { OrderProduct } from "../model/OrderProduct";

interface CartContextProviderProps {
    children: ReactNode
}

type State = {
    quantity: number
    totalPrice:number
    dataCart: OrderProduct []
    changeQuantity: (quantity: number) => void
    changeDataCart: (cart: OrderProduct[],totalPrice:number) => void
}

const StateDefault = {
    quantity: 1,
    totalPrice: 0,
    dataCart:[],
    changeQuantity: () => {},
    changeDataCart:() => {}
}

export const CartContext = React.createContext<State>(StateDefault)

export const CartContextProvider = ({ children }: CartContextProviderProps) => {
    const [state, setState] = useState<State>(StateDefault)
    
    useEffect(() => {
        getCart()
    },[])

    const getCart = () => {
        cartController.get().then(res => {
            setState(prev => ({ ...prev, dataCart: res.dataCart, totalPrice: res.totalPrice,quantity: res.dataCart.length}))
        })
    }

    const changeDataCart = (cart: OrderProduct[],totalPrice:number) => {
        setState(prev => ({...prev,dataCart:cart,totalPrice:totalPrice,quantity:cart.length}))
    }

    const changeQuantity = (quantity: number) => {
        setState(prev => ({ ...prev, quantity: quantity }))
    }

    const data: State = { dataCart:state.dataCart,totalPrice:state.totalPrice,quantity: state.quantity,changeQuantity,changeDataCart}

    return (
        <CartContext.Provider value={data}>
            {children}
        </CartContext.Provider>
    )
}