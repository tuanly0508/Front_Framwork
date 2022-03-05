import { Box, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material";
import moment from "moment";
import { useEffect, useState } from "react";
import { ImForward3,ImBackward2 } from "react-icons/im";
import { orderController } from "../../../controllers/OrderController";
import { OrderTemp } from "../../../model/OrderTemp";

type State = {
    status: string
    dataOrder: OrderTemp[]
}

export default function Delivering() {
    const [state, setState] = useState<State>({
        status: '',
        dataOrder: []
    })

    useEffect(() => {
        orderController.get('Delivering').then(res => {
            setState(prev => ({ ...prev, dataOrder: res }))
        })
    }, [])

    const handleChangeStatus = (idOrder:string) => {
        orderController.updateStatus(idOrder,'Delivered','Delivering').then(res => {
            setState(prev=>({...prev,dataOrder: res.data}))
        })
    }

    const handleChangeBackStatus = (idOrder:string) => {
        orderController.updateStatus(idOrder,'Pending','Delivering').then(res => {
            setState(prev=>({...prev,dataOrder: res.data}))
        })
    }

    return (
        <TableContainer sx={{ height: '400px', overflow: 'auto' }} component={Paper}>
            <Table aria-label="collapsible table" >
                <TableHead>
                    <TableRow >
                        <TableCell width='2%'></TableCell>
                        <TableCell width='10%' align="center">Code Bill</TableCell>
                        <TableCell width='10%' align="center">Date created</TableCell>
                        <TableCell width='10%' align="center">Name</TableCell>
                        <TableCell width='10%' align="center">Phone</TableCell>
                        <TableCell width='6%' align="center">Status</TableCell>
                        <TableCell width='5%' align="center" ></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody >
                    {state.dataOrder.map((item, key) => {
                        return (
                            <TableRow key={key} >
                                <TableCell sx={{ borderRight: 1, borderColor: '#E0E0E0' }} align='center' > </TableCell>
                                <TableCell sx={{ borderRight: 1, borderColor: '#E0E0E0' }} align='center' >
                                    {item.idOrder}
                                </TableCell>
                                <TableCell sx={{ borderRight: 1, borderColor: '#E0E0E0' }} align="center" >
                                    {moment(item.createAt).format('HH:mm DD-MM-YYYY')}
                                </TableCell>
                                <TableCell sx={{ borderRight: 1, borderColor: '#E0E0E0' }} align="center" >
                                    {item.name}
                                </TableCell>
                                <TableCell sx={{ borderRight: 1, borderColor: '#E0E0E0' }} align="center" >
                                    {item.phone}
                                </TableCell>
                                <TableCell sx={{ borderRight: 1, borderColor: '#E0E0E0' ,color:'chocolate'}} align="center" >
                                    {item.status}
                                </TableCell>
                                <TableCell sx={{ borderRight: 1, borderColor: '#E0E0E0' }} align="center" >
                                    <IconButton size="medium" color='primary' onClick={e=>handleChangeBackStatus(item.idOrder)}><ImBackward2 /></IconButton>
                                    <IconButton size="medium" color='primary' onClick={e=>handleChangeStatus(item.idOrder)} ><ImForward3 /></IconButton>
                                </TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    )
}
