import { Box, FormControl, Button, IconButton, ModalUnstyled, InputLabel, MenuItem, styled, Paper, Select, SelectChangeEvent, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material";
import moment from "moment";
import './css/ProductAdmin.css'
import { useContext, useState } from "react";
import { FaClipboardList, FaEdit, FaPlus, FaPlusCircle, FaSearch, FaTrashAlt } from "react-icons/fa";
import { AdminContext } from "../../contexts/AdminContext";
import ModalAdd from "../admin/modal-product/form-add-edit/ModalAdd";
import ModalEdit from "../admin/modal-product/form-add-edit/ModalEdit";
import ModalProduct from "./modal-product/ModalProduct";
import Pag from "../../components/pagination/Pagination";
import { UserContext } from "../../contexts/UserContext";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../Firebase";

export interface DataRow {
    create_at: string,
    id_product_line: string,
    name_brand: string,
    name_category: string,
    name_product: string,
    update_at: string
}

type State = {
    isOpen: boolean
    isModal: boolean
    search: string
    sort: string
    openImage: boolean
    image: string
}

export default function ProductAdmin() {
    const adminContext = useContext(AdminContext)
    const userContext = useContext(UserContext)

    const [state, setState] = useState<State>({
        isModal: false,
        isOpen: false,
        search: '',
        sort: '',
        openImage: false,
        image: ''
    })

    const handleOpenImage = () => setState(prev => ({ ...prev, openImage: true }))
    const handleCloseImage = () => setState(prev => ({ ...prev, openImage: false }))

    const changeIsOpenAdd = () => {
        adminContext.changeIsOpenModal(true)
        setState(prev => ({ ...prev, isOpen: false }))
    }

    const changeIsOpenProduct = (idProductLine: string) => {
        adminContext.changeIdProductLine(idProductLine)
        adminContext.getProduct(idProductLine)
        adminContext.changeIsOpenProduct(true)
        setState(prev => ({ ...prev, isModal: false }))
    }

    const changeIsOpenEdit = (idProductLine: string, nameProduct: string, category: string, brand: string) => {
        adminContext.changeModalEdit(nameProduct, category, brand)
        adminContext.changeIsOpenModal(true)
        adminContext.changeIdProductLine(idProductLine)
        adminContext.getByIdProductLine(idProductLine)
        setState(prev => ({ ...prev, isOpen: true }))
    }

    const deleteProductLine = (idProductLine: string) => {
        adminContext.deleteProductLine(idProductLine)
        userContext.popupAdd('Add product success !!!')
    }

    const handleSearch = () => {
        adminContext.changeSearch(state.search, '', '')
    }

    const handleChange = (event: SelectChangeEvent) => {
        setState(prev => ({ ...prev, sort: event.target.value }))
        adminContext.changeSearch('', event.target.value, '')
    };

    const page = (page: number) => {
        adminContext.changePage(page)
    }

    const formHandler = (e: any) => {
        e.preventDefault();
        const file = e.target[0].files[0];
        uploadFiles(file);
    };

    const uploadFiles = (file: any) => {
        //
        if (!file) return;
        const sotrageRef = ref(storage, `files/${file.name}`);
        const uploadTask = uploadBytesResumable(sotrageRef, file);

        uploadTask.on(
            "state_changed",
            (snapshot) => {
            },
            (error) => console.log(error),
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    console.log("File available at", downloadURL);
                    setState(prev => ({ ...prev, image: downloadURL }))
                });
            }
        );
    };

    return (
        <>
            <Box sx={{ marginBottom: '10px', alignItems: 'center', display: 'flex', position: 'relative' }}>
                <TextField onChange={e => setState(prev => ({ ...prev, search: e.target.value }))} id="outlined-basic" label="Search" variant="outlined" color="success" />
                <IconButton sx={{ position: 'absolute', top: '12px', left: '200px' }} size="small" onClick={handleSearch}><FaSearch /></IconButton>
                <FormControl sx={{ width: '220px', marginLeft: '20px' }} >
                    <InputLabel id="demo-simple-select-label">Sort</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={state.sort}
                        label="Age"
                        onChange={handleChange}
                    >
                        <MenuItem value={'1'}>Name A - Z</MenuItem>
                        <MenuItem value={'2'}>Name Z - A</MenuItem>
                        <MenuItem value={'3'}>Create up</MenuItem>
                        <MenuItem value={'4'}>Create down</MenuItem>
                        <MenuItem value={'5'}>Update up</MenuItem>
                        <MenuItem value={'6'}>Update down</MenuItem>
                    </Select>
                </FormControl>
                <Button sx={{ height: 55, marginLeft: 5 }} variant="outlined" onClick={handleOpenImage}><FaPlus /></Button>
            </Box>
            <TableContainer sx={{ height: 683 }} component={Paper}>
                <Table aria-label="collapsible table">
                    <TableHead>
                        <TableRow >
                            <TableCell width='3%' component="th" scope="row" />
                            <TableCell width='20%' >Name product</TableCell>
                            <TableCell width='10%' align="center">Brand</TableCell>
                            <TableCell width='10%' align="center">Category</TableCell>
                            <TableCell width='10%' align="center">Create</TableCell>
                            <TableCell width='10%' align="center">Update</TableCell>
                            <TableCell width='8%' align="center" > <IconButton color="info" onClick={changeIsOpenAdd} ><FaPlusCircle /></IconButton> </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {adminContext.rows.map((item, key) => {
                            return (
                                <TableRow key={key}>
                                    <TableCell sx={{ borderRight: 1, borderColor: '#E0E0E0' }} align="center" component="th" scope="row"></TableCell>
                                    <TableCell sx={{ borderRight: 1, borderColor: '#E0E0E0' }} align='left' >
                                        {item.name_product}
                                    </TableCell>
                                    <TableCell sx={{ borderRight: 1, borderColor: '#E0E0E0' }} align="center" >
                                        {item.name_brand}
                                    </TableCell>
                                    <TableCell sx={{ borderRight: 1, borderColor: '#E0E0E0' }} align="center" >
                                        {item.name_category}
                                    </TableCell>
                                    <TableCell sx={{ borderRight: 1, borderColor: '#E0E0E0' }} align="center" >
                                        {moment(item.create_at).format('HH:mm DD-MM-YYYY')}
                                    </TableCell>

                                    <TableCell sx={{ borderRight: 1, borderColor: '#E0E0E0' }} align="center" >
                                        {moment(item.update_at).format('HH:mm DD-MM-YYYY')}
                                    </TableCell>
                                    <TableCell sx={{ borderRight: 1, borderColor: '#E0E0E0' }} align="center" >
                                        <IconButton onClick={e => changeIsOpenProduct(item.id_product_line)} size="small"><FaClipboardList /></IconButton>
                                        <IconButton onClick={e => changeIsOpenEdit(item.id_product_line, item.name_product, item.name_category, item.name_brand)} size="small" color='success' sx={{ margin: '0 15px' }} ><FaEdit /></IconButton>
                                        <IconButton onClick={e => deleteProductLine(item.id_product_line)} size="small" color='error' ><FaTrashAlt /></IconButton>
                                    </TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
                {state.isOpen === false ? <ModalAdd /> : <ModalEdit />}
                <ModalProduct />
            </TableContainer>
            <Pag page={page} pageCount={adminContext.pagination.countPage as number} />
            <StyledModal
                aria-labelledby="unstyled-modal-title"
                aria-describedby="unstyled-modal-description"
                open={state.openImage}
                onClose={handleCloseImage}
                BackdropComponent={Backdrop}
            >
                <Box sx={style}>
                    <Box>
                        <p style={{ textAlign: 'center' }}>ADD IMAGE</p>
                        <form onSubmit={formHandler}>
                            <img style={{ marginTop: 25 }} src={state.image} alt="" />

                                <div style={{marginTop: 20}}>
                                <a href={state.image} style={{color:'black'}} >{state.image}</a>    

                                </div>


                            <TextField id="outlined-basic" type='file' variant="outlined" sx={{marginTop: 5}}/>
                            <button style={{marginTop:40, padding: 19, marginLeft: 3, border: '1px solid wheat'}} type="submit">Upload</button>
                        </form>
                    </Box>
                </Box>
            </StyledModal>
        </>
    );
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
    width: 500,
    height: 500,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    p: 2,
    px: 4,
    pb: 3,
};