import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { MdDeleteOutline } from 'react-icons/md';
import { UserContext } from '../../contexts/UserContext';
import { Cart } from '../../model/Cart';
import { OrderProduct } from '../../model/OrderProduct';

interface Props {
    handleUpdateCart: (cart:Cart) => void
    handleRemoveCart: (cart:Cart) => void
    dataCart: OrderProduct[]
}

type State = {
    cart: Cart
}

export default function ItemCart(props:Props) {
    const userContext = useContext(UserContext)

    const [state,setState] = useState<State>({
        cart: {idProduct:'',idOrder: '',quantity:0,is:false,idUser:userContext.user.id_user}
    })

    useEffect(() => {
        if(state.cart.idProduct !== '' && state.cart.is === true) props.handleRemoveCart(state.cart)
        if(state.cart.idProduct !== '' && state.cart.is === false) props.handleUpdateCart(state.cart)
    },[state.cart])
    
    const handleMinusQuantity = (quantity:number,idProduct: string) => {
        let minus = quantity
        if (minus > 1) {
            minus = minus - 1
        } else minus = 1
        setState(prev=>({...prev,cart: {...prev.cart,quantity:minus,idOrder:userContext.user.id_order,idProduct:idProduct,is:false}}))
    }

    const handlePlusQuantity = (quantity:number, idProduct: string) => {
        let plus = quantity
        plus = plus+1
        setState(prev=>({...prev,cart: {...prev.cart,quantity:plus,idOrder:userContext.user.id_order,idProduct:idProduct,is:false}}))
    }

    const handleRemoveCart = (idProduct: string) => {
        setState(prev => ({...prev,cart:{...prev.cart,idProduct:idProduct,idOrder:userContext.user.id_order,is:true}}))
        userContext.popupAdd('Delete cart success !!!')
    }
    
    return (
        <section>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ borderRight: 1, borderColor: '#E0E0E0' }} width='15%' align='center'>Image product</TableCell>
                            <TableCell sx={{ borderRight: 1, borderColor: '#E0E0E0' }} width='25%' align="center">Name product</TableCell>
                            <TableCell sx={{ borderRight: 1, borderColor: '#E0E0E0' }} width='12%' align="center">Price</TableCell>
                            <TableCell sx={{ borderRight: 1, borderColor: '#E0E0E0' }} width='15%' align="center">Quantity</TableCell>
                            <TableCell sx={{ borderRight: 1, borderColor: '#E0E0E0' }} width='12%' align="center">Total</TableCell>
                            <TableCell sx={{ borderRight: 1, borderColor: '#E0E0E0' }} width='5%' align="center">Remove</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.dataCart.map((item, key) => {
                            return(
                                <TableRow key={key} >
                                    <TableCell sx={{ borderRight: 1, borderColor: '#E0E0E0' }} align='center' component="th" scope="row"><img width='40%' src={item.image} alt="" /></TableCell>
                                    <TableCell sx={{ borderRight: 1, borderColor: '#E0E0E0' }} align="center"><div>{item.name_product} <br/> {item.name_weight} - {item.name_age}</div></TableCell>
                                    <TableCell sx={{ borderRight: 1, borderColor: '#E0E0E0' }} align="center"><span>{item.price} $</span></TableCell>
                                    <TableCell sx={{ borderRight: 1, borderColor: '#E0E0E0' }} align="center">
                                        <div className='quantity-cart'>
                                            <button onClick={e=>handleMinusQuantity(item.quantity, item.id_product)} >-</button>
                                            <p>{item.quantity}</p>
                                            <button onClick={e=>handlePlusQuantity(item.quantity, item.id_product)} >+</button>
                                        </div>
                                    </TableCell>
                                    <TableCell sx={{ borderRight: 1, borderColor: '#E0E0E0' }} align="center"><span>{item.quantity * item.price} $</span></TableCell>
                                    <TableCell sx={{ borderRight: 1, borderColor: '#E0E0E0' }} align="center"><i onClick={e => handleRemoveCart(item.id_product)} ><MdDeleteOutline /></i></TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </section>
    )
}
