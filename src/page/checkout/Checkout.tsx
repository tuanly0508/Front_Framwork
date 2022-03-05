import { Autocomplete, Box, TextField } from '@mui/material'
import { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { CartContext } from '../../contexts/CartContext'
import { UserContext } from '../../contexts/UserContext'
import { orderController } from '../../controllers/OrderController'
import { OrderTemp } from '../../model/OrderTemp'
import CheckoutMid from './CheckoutMid'
import emailjs from 'emailjs-com'
import './css/Checkout.css'

type State = {
    dataInput: OrderTemp
}

export default function Checkout() {
    const userContext = useContext(UserContext)
    const cartContext = useContext(CartContext)

    const [state, setState] = useState<State>({
        dataInput: { idOrder: userContext.user.id_order, idUser: userContext.user.id_user, name: '',email:'', phone: '', address: '' }
    })

    // const sendMail = (e:any) => {
    //     e.preventDefault();

    //     emailjs.sendForm();
    // }

    const handlePlace = () => {
        let sellCount : { idProductLine : string , sellCount : number}[] = []
        cartContext.dataCart.map((item) => {
            sellCount.push({idProductLine:item.id_product_line,sellCount:item.quantity})          
        })
        orderController.update(state.dataInput,sellCount).then(res => {
            orderController.pagination(userContext.user.id_user,1,1)
        })
        cartContext.changeQuantity(0)
        userContext.popupAdd('Checkout success !!!')
    }

    return (
        <section>
            <div>
                <img src="https://bizweb.dktcdn.net/100/432/370/themes/828992/assets/breadcrumb.png?1627705031688" alt="" />
            </div>
            <div className="container-checkout">
                <div className="content-checkout">
                    <div className='checkout-left'>
                        <p className='check-out-left-title'>Delivery information</p>
                        <Box  >
                            <form >
                                <TextField sx={{ margin: '10px 0', width: '80%' }} onChange={e => setState(prev => ({...prev,dataInput:{...prev.dataInput,name:e.target.value}}))} id="outlined-basic" label="Name" variant="outlined" required />
                                <TextField sx={{ margin: '10px 0', width: '80%' }} onChange={e => setState(prev => ({...prev,dataInput:{...prev.dataInput,email:e.target.value}}))} id="outlined-basic" label="Email" variant="outlined" />
                                <TextField sx={{ margin: '10px 0', width: '80%' }} onChange={e => setState(prev => ({...prev,dataInput:{...prev.dataInput,phone:e.target.value}}))} id="outlined-basic" label="Phone" variant="outlined" required />
                                <TextField sx={{ margin: '10px 0', width: '80%' }} onChange={e => setState(prev => ({...prev,dataInput:{...prev.dataInput,address:e.target.value}}))} id="outlined-basic" label="Address" variant="outlined" required />
                                
                            </form>
                        </Box>
                    </div>
                    <CheckoutMid />
                    <div className='checkout-right'>
                        <p>Order</p>
                        <div className="checkout-order">
                            {cartContext.dataCart.map((item, key) => {
                                return (
                                    <div className="checkout-order-item" key={key}>
                                        <div className="checkout-quantity">
                                            <img src={item.image} alt="" />
                                            <i>{item.quantity}</i>
                                        </div>
                                        <p>{item.name_product}</p>
                                        <p>{item.quantity * item.price} $</p>
                                    </div>
                                )
                            })}
                        </div>
                        <div className="checkout-payment">
                            <p>Temporary: <span>{cartContext.totalPrice} $</span></p>

                        </div>
                        <div className="checkout-total">
                            <Link to='/cart'><button className="btn-back">Back to cart</button></Link>
                            <Link to='/orders'><button onClick={handlePlace}>Place</button></Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

const top100Films = [
    { label: 'The Redemption', year: 1994 },
    { label: 'The Godfather', year: 1972 }
]