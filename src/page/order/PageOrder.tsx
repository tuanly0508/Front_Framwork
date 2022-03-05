import  './css/PageOrder.css'
import { Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import moment from 'moment';
import Pagination from '../../components/pagination/Pagination';
import { orderController } from '../../controllers/OrderController';
import { OrderTemp } from '../../model/OrderTemp';
import { OrderItem } from '../../model/OrderItem';
import { UserContext } from '../../contexts/UserContext';
import { PaginationModel } from '../../model/Pagination';

type State = {
    orderTemp: OrderTemp
    orderProduct: OrderItem[]
    pagination: PaginationModel
    totalPrice: number
}

export default function PageOrder() {
    const userContext = useContext(UserContext)
    const [state,setState] = useState<State> ({
        orderTemp: {idOrder:'',idUser:'',name:'',email:'',phone:'',address:'',status:''},
        orderProduct: [],
        pagination: {size:0,page:1,countPage:1},
        totalPrice: 0
    })    

    const changePage = (page:number) => { 
        setState(prev => ({...prev,pagination:{...prev.pagination,page:page}}))
    }

    useEffect(() => {
        getOrder()
    },[userContext.user.id_user,state.pagination.page])

    const getOrder = () => {
        orderController.pagination(userContext.user.id_user,state.pagination.page,1).then(res => {
            let total = 0
            res.orderProduct.map((item) => {
                total += item.quantity*item.product.price
                return total
            })
            setState(prev => ({...prev,orderTemp: res.orderTemp,orderProduct:res.orderProduct,pagination:{...prev.pagination,countPage: res.pageCount},totalPrice: total}))
        })
    }
    
    return (
        <section>
            <div>
            <img src="https://bizweb.dktcdn.net/100/432/370/themes/828992/assets/breadcrumb.png?1627705031688" alt="" />
            </div>
            <div className="container-order">
                <div className="content-order">
                    <p className='order-title'>YOUR ORDER</p>
                    <TableContainer sx={{height:'450px'}} component={Paper}>
                        <Table sx={{ minWidth: 650}} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align='center' >{moment(state.orderTemp.createAt).format('HH:mm DD-MM-YYYY')} <br/> <span style={{color:'green'}} >{state.orderTemp.status}</span> </TableCell>
                                    <TableCell align="center" ></TableCell>
                                    <TableCell align="center" ></TableCell>
                                    <TableCell align="right" >
                                        <div>
                                            <p>{state.orderTemp.name},{state.orderTemp.phone},{state.orderTemp.email}</p>
                                            <p>{state.orderTemp.address}</p>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody sx={{overflow:'auto'}} >
                                {state.orderProduct.map((item,key) => {
                                    return (
                                        <TableRow key={key}>
                                            <TableCell sx={{ borderRight: 1, borderColor: '#E0E0E0' }} width='22%' align='center' component="th" scope="row">
                                                <img width='30%' src={item.product.productLine.image} alt="" />
                                            </TableCell>
                                            <TableCell sx={{ borderRight: 1, borderColor: '#E0E0E0' }} align="center" width='48%'> 
                                                {item.product.productLine.nameProduct} <br/> {item.product.weight} - {item.product.name_age}
                                            </TableCell>
                                            <TableCell sx={{ borderRight: 1, borderColor: '#E0E0E0' }} align="center" width='10%'>
                                                x {item.quantity}
                                            </TableCell>
                                            <TableCell sx={{ borderRight: 1, borderColor: '#E0E0E0' }} align="center" width='20%'>
                                                {item.quantity*item.product.price} $
                                            </TableCell>
                                        </TableRow>
                                    )
                                })}
                            </TableBody>
                            <TableFooter>
                                <TableRow>
                                    <TableCell align="right"></TableCell>
                                    <TableCell align="right"></TableCell>
                                    <TableCell sx={{fontSize:'17px'}} align="right">Total:</TableCell>
                                    <TableCell sx={{color:'tomato',fontSize:'17px'}} align="center">{state.totalPrice} $</TableCell>
                                </TableRow>
                            </TableFooter>
                        </Table>
                    </TableContainer>
                    <Pagination page={changePage} pageCount={Math.ceil(state.pagination.countPage as number)} />
                </div>
            </div>
        </section>
    )
}
