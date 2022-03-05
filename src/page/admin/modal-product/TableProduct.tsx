import { Autocomplete, Box, Button, IconButton, ModalUnstyled, Paper, styled, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material";
import moment from "moment";
import { useContext, useState } from "react";
import { FaEdit, FaPlus, FaTrashAlt } from "react-icons/fa";
import { AdminContext } from "../../../contexts/AdminContext";
import { UserContext } from "../../../contexts/UserContext";
import { Product } from "../../../model/Product";

type State = {
    idProduct: string
    open: boolean
    product: Product
    price: number
}

export default function TableProduct() {
    const userContext = useContext(UserContext)
    const adminContext = useContext(AdminContext)

    const [state, setState] = useState<State>({
        idProduct: '',
        open: false,
        price:0,
        product: { id_product: '', id_product_line: adminContext.idProductLine, id_weight: '', price: 0, id_age: '' }
    })

    const handleOpen = () => setState(prev => ({ ...prev, open: true }))
    const handleClose = () => setState(prev => ({ ...prev, open: false }))

    const onchangeWeight = (value: string | null) => {
        adminContext.dataWeight.map((item) => {
            if (item.name_weight === value) setState(prev => ({ ...prev, product: { ...prev.product, id_weight: item.id_weight } }))
            return item
        })
    }

    const onchangeAge = (value: string | null) => {
        adminContext.dataAge.map((item) => {
            if (item.name_age === value) setState(prev => ({ ...prev, product: { ...prev.product, id_age: item.id_age } }))
            return item
        })
    }

    const handleCreateProduct = () => {
        adminContext.createProduct(state.product)
        userContext.popupAdd('Add product success !!!')
    }

    const handleDeleteProduct = (idProduct: string) => {
        adminContext.deleteProduct(idProduct)
        userContext.popupAdd('Delete product success !!!')
    }

    const handleUpdateProduct = (idProduct: string) => {
        let idWeight = ''
        let price = 0
        let idAge = ''

        if (state.product.id_weight === '') {
            adminContext.product.map((item) => {
                if (item.id_product === idProduct) idWeight = item.id_weight as string
                return item
            })
        } else idWeight = state.product.id_weight as string

        if (state.product.id_age === '') {
            adminContext.product.map((item) => {
                if (item.id_product === idProduct) idAge = item.id_age as string
                return item
            })
        } else idAge = state.product.id_age as string

        if (state.price === 0) {
            adminContext.product.map((item) => {
                if (item.id_product === idProduct) price = item.price as number
                return item
            })
        } else price = state.price
        
        adminContext.updateProduct(idProduct, idWeight, price, idAge)
        userContext.popupAdd('Update product success !!!')
    }

    return (
        <>
            <TableContainer sx={{height:'400px',overflow:'auto'}} component={Paper}>
                <Table aria-label="collapsible table" >
                    <TableHead>
                        <TableRow >
                            <TableCell width='15%' >Name product</TableCell>
                            <TableCell width='10%' align="center">Weight</TableCell>
                            <TableCell width='10%' align="center">Age</TableCell>
                            <TableCell width='10%' align="center">Price</TableCell>
                            <TableCell width='10%' align="center">Create</TableCell>
                            <TableCell width='10%' align="center">Update</TableCell>
                            <TableCell width='6%' align="center" ><IconButton color="primary" size="small" onClick={handleOpen}><FaPlus /></IconButton></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody >
                        {adminContext.product.map((item, key) => {
                            return (
                                <TableRow key={key}>
                                    <TableCell sx={{ borderRight: 1, borderColor: '#E0E0E0' }} align='left' >
                                        {item.name_product}
                                    </TableCell>
                                    <TableCell sx={{ borderRight: 1, borderColor: '#E0E0E0' }} align="center" >
                                        <Autocomplete id="combo-box-demo" disablePortal
                                            value={item.name_weight}
                                            onChange={(event, value) => onchangeWeight(value)}
                                            options={adminContext.dataWeight.map((option) => option.name_weight)}
                                            renderInput={(params) => <TextField {...params} label="Brand" />}
                                        />
                                    </TableCell>
                                    <TableCell sx={{ borderRight: 1, borderColor: '#E0E0E0' }} align="center" >
                                        <Autocomplete id="combo-box-demo" disablePortal
                                            value={item.name_age}
                                            onChange={(event, value) => onchangeAge(value)}
                                            options={adminContext.dataAge.map((option) => option.name_age)}
                                            renderInput={(params) => <TextField {...params} label="Age" />}
                                        />
                                    </TableCell>
                                    <TableCell sx={{ borderRight: 1, borderColor: '#E0E0E0' }} align="center" >
                                        <TextField id="outlined-basic" type='number' label="Price" variant="outlined"
                                            defaultValue={item.price}
                                            onChange={e => setState(prev => ({ ...prev, price: parseInt(e.target.value) }))}
                                        />
                                    </TableCell>
                                    <TableCell sx={{ borderRight: 1, borderColor: '#E0E0E0' }} align="center" >
                                        {moment(item.create_at).format('HH:mm DD-MM-YYYY')}
                                    </TableCell>
                                    <TableCell sx={{ borderRight: 1, borderColor: '#E0E0E0' }} align="center" >
                                        {moment(item.update_at).format('HH:mm DD-MM-YYYY')}
                                    </TableCell>
                                    <TableCell sx={{ borderRight: 1, borderColor: '#E0E0E0' }} align="center" >
                                        <IconButton size="small" color='error' onClick={e => handleDeleteProduct(item.id_product)} ><FaTrashAlt /></IconButton>
                                        <IconButton size="small" color='success' onClick={e => handleUpdateProduct(item.id_product)} ><FaEdit /></IconButton>
                                    </TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <StyledModal
                aria-labelledby="unstyled-modal-title"
                aria-describedby="unstyled-modal-description"
                open={state.open}
                onClose={handleClose}
                BackdropComponent={Backdrop}
            >
                <Box sx={style}>
                    <Box>
                        <p>ADD PRODUCT</p>
                        <Autocomplete id="combo-box-demo" disablePortal sx={{ marginTop: '30px' }}
                            onChange={(event, value) => onchangeWeight(value)}
                            options={adminContext.dataWeight.map((option) => option.name_weight)}
                            renderInput={(params) => <TextField {...params} label="Weight" />}
                        />
                        <Autocomplete id="combo-box-demo" disablePortal sx={{ marginTop: '30px ' }}
                            onChange={(event, value) => onchangeAge(value)}
                            options={adminContext.dataAge.map((option) => option.name_age)}
                            renderInput={(params) => <TextField {...params} label="Age" />}
                        />
                        <TextField sx={{ margin: '30px 0' }} id="outlined-basic" type='number' label="Price" variant="outlined"
                            onChange={e => setState(prev => ({ ...prev, product: { ...prev.product, price: parseInt(e.target.value) } }))}
                        />
                        <Box sx={{ textAlign: 'center' }}><Button variant="contained" color="primary" onClick={handleCreateProduct} >ADD</Button></Box>
                    </Box>
                </Box>
            </StyledModal>
        </>
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
    width: 300,
    height: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    p: 2,
    px: 4,
    pb: 3,
};