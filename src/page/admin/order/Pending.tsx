import { Box, Button, IconButton, ModalUnstyled, Paper, styled, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import moment from "moment";
import { useContext, useEffect, useState } from "react";
import { ImForward3 } from "react-icons/im";
import { TiDeleteOutline } from "react-icons/ti";
import { UserContext } from "../../../contexts/UserContext";
import { orderController } from "../../../controllers/OrderController";
import { OrderTemp } from "../../../model/OrderTemp";

type State = {
    status: string
    dataOrder: OrderTemp[]
    open: boolean
    idOrder: string
}

export default function Pending() {
    const userContext = useContext(UserContext)
    const [state, setState] = useState<State>({
        status: '',
        dataOrder: [],
        open: false,
        idOrder: ''
    })

    const handleOpen = (idOrder: string) => {
        setState(prev => ({ ...prev, open: true,idOrder: idOrder }))
    }
    const handleClose = () => setState(prev => ({ ...prev, open: false }))

    useEffect(() => {
        orderController.get('Pending').then(res => {
            setState(prev => ({ ...prev, dataOrder: res }))
        })
    }, [])

    const handleChangeStatus = (idOrder: string) => {
        orderController.updateStatus(idOrder, 'Delivering', 'Pending').then(res => {
            setState(prev => ({ ...prev, dataOrder: res.data }))
        })
    }

    const handleDeleteOrder = (idOrder: string) => {
        orderController.updateStatus(idOrder, 'Cancel', 'Pending').then(res => {
            setState(prev => ({ ...prev, dataOrder: res.data ,open:false}))
        })
        userContext.popupAdd('Cancel order success !!!')
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
                                <TableCell sx={{ borderRight: 1, borderColor: '#E0E0E0', color: 'green' }} align="center" >
                                    {item.status}
                                </TableCell>
                                <TableCell sx={{ borderRight: 1, borderColor: '#E0E0E0' }} align="center" >
                                    <IconButton size="medium" color='error' onClick={e => handleOpen(item.idOrder)} ><TiDeleteOutline /></IconButton>
                                    <IconButton size="medium" color='primary' onClick={e => handleChangeStatus(item.idOrder)} ><ImForward3 /></IconButton>
                                </TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
            <StyledModal
                aria-labelledby="unstyled-modal-title"
                aria-describedby="unstyled-modal-description"
                open={state.open}
                onClose={handleClose}
                BackdropComponent={Backdrop}
            >
                <Box sx={style}>
                    <p>Are you want to cancel order?</p>
                    <Box sx={{ display: 'flex' , marginTop: 5,justifyContent: 'center'}}>
                        <Button onClick={handleClose} variant="contained">Cancel</Button>
                        <Button variant="outlined" color="error" sx={{marginLeft:2}} onClick={e => handleDeleteOrder(state.idOrder)} > Delete </Button>
                    </Box>
                </Box>
            </StyledModal>
        </TableContainer>
    )
}

const StyledModal = styled(ModalUnstyled)`
  position: fixed;
  z-index: 1300;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Backdrop = styled('div')`
  z-index: -1;
  position: fixed;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  -webkit-tap-highlight-color: transparent;
`;

const style = {
    width: 305,
    height: 150,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    p: 2,
    px: 4,
    pb: 3,
};