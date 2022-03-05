import React, { useContext, useEffect, useState } from 'react';
import { FaBoxOpen, FaCaretDown, FaCaretUp, FaTruckMoving } from 'react-icons/fa';
import { FcOk } from 'react-icons/fc';
import { CartContext } from '../../../contexts/CartContext';
import { UserContext } from '../../../contexts/UserContext';
import { cartController } from '../../../controllers/CartController';
import { Age } from '../../../model/Age';
import { Cart } from '../../../model/Cart';
import { Product } from '../../../model/Product';
import { Weight } from '../../../model/Weight';

interface Props {
    productDetail: Product
    dataWeight: Weight[]
    product: Product[]
    price: number
    dataAge: Age[]
    nameAge:{id : string , value : string} []
    idWeight: (idWeight:string) => void
    idProduct: (idProduct:string) => void
    sellCount: number

    handleAddCart: (cart:Cart) => void
}

type State = {
    quantity: number
    price: number
    idProduct: string
    idWeight:string
    idAge:string
    cart:Cart
}

export default function ProductRight(props: Props) {
    const userContext = useContext(UserContext)
    const cartContext = useContext(CartContext)

    const [state, setState] = useState<State>({
        quantity: 1,
        price: props.price,
        idProduct: '',
        idWeight:'',
        idAge:'',
        cart: {idOrder:userContext.user.id_order,idProduct:'',quantity:0}
    })

    useEffect(() => {
        if(state.cart.idProduct !== '') props.handleAddCart(state.cart)
    },[state.cart])

    const handlePlusQuantity = () => {
        let plus: any = state.quantity
        plus = plus + 1
        cartContext.changeQuantity(plus)
        setState(prev => ({ ...prev, quantity: plus }))
    }

    const handleMinusQuantity = () => {
        if (state.quantity > 1) {
            let minus: any = state.quantity
            minus = minus - 1
            setState({ ...state, quantity: minus })
        } else setState({ ...state, quantity: 1 })
        cartContext.changeQuantity(state.quantity)
    }

    const setPrice = (idWeight: string) => {
        props.product.map((item) => {
            if (item.id_weight === idWeight) {
                props.idWeight(idWeight)
                setState(prev => ({ ...prev, price: item.price as number, idProduct: item.id_product,idWeight:idWeight}))
            }
            return item
        })
    }

    const handleAddCart = () => {
        if(state.idProduct === '') setState(prev => ({...prev,cart: {...prev.cart,idProduct:props.productDetail.id_product,quantity:state.quantity,idUser:userContext.user.id_user}}))
        else setState(prev => ({...prev,cart: {...prev.cart,idProduct:state.idProduct,quantity:state.quantity,idUser:userContext.user.id_user}}))
    }

    const setIdProduct = (idProduct:string) => {
        props.idProduct(idProduct)
        setState(prev=>({...prev,idProduct:idProduct,idAge:idProduct}))
    }
    
    return (
        <React.Fragment>
            <div className='child-top'  >
                <h2>{props.productDetail.name_product}</h2>
                <div className='child-top-mid'>
                    <p>Brand:<span>{props.productDetail.name_brand}</span></p>
                    <p> Status: <span>Stocking</span></p>
                    <p> Sell number: <span>{props.sellCount}</span></p>
                </div>
                <p className='price-child'>{props.price} $</p>
            </div>

            <div className='child-mid'>
                <div className='weight'>
                    <p>Weight: </p>
                    {props.dataWeight.map((item, key) => {
                        if (item.id_weight === state.idWeight) {
                            return (
                                <button className='btn-select' key={key} onClick={e => setPrice(item.id_weight)} >{item.name_weight}<i className='icon-select'><FcOk /></i></button>
                            )
                        }
                        return (
                            <button key={key} onClick={e => setPrice(item.id_weight)} >{item.name_weight}<i><FcOk /></i></button>
                        )
                    })}
                </div>

                <div className='weight'>
                    <p>Age: </p>
                    {props.nameAge.map((item,key) => {
                        if(item.id === state.idAge) {
                            return(
                                <button className='btn-select' key={key} onClick={e => setIdProduct(item.id)} >{item.value}<i className='icon-select'><FcOk /></i></button>
                            )
                        }
                        return(
                            <button key={key} onClick={e => setIdProduct(item.id)} >{item.value}<i><FcOk /></i></button>
                        )
                    })}
                </div>

                <div className='count-child'>
                    <div className='count'>Count:
                        <p>{state.quantity}</p>
                        <div className='icon-child'>
                            <div><i onClick={handlePlusQuantity} ><FaCaretUp /></i></div>
                            <div><i onClick={handleMinusQuantity} ><FaCaretDown /></i></div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='child-bot'>
                <div className='child-bot-button'>
                    <button className='btn-buy'>BUY NOW</button>
                    <button className='btn-add' onClick={handleAddCart} >ADD TO CART</button>
                </div>
                <div className='child-bot-content'>
                    <i><FaTruckMoving /><p>Nationwide shipping: <span>Free shipping within a radius of 15km</span></p></i>
                    <i><FaBoxOpen /><p>Support return: <span>Within 15 days of purchase</span></p></i>
                </div>
            </div>
        </React.Fragment>
    )
}
