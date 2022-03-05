import { Autocomplete, Box, Button, IconButton, ModalUnstyled, Paper, styled, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material";
import moment from "moment";
import { useContext, useEffect, useState } from "react";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import { UserContext } from "../../../contexts/UserContext";
import { categoryController } from "../../../controllers/CategoryController";
import { Category } from "../../../model/Category";

type State = {
    dataCategory: Category[]
    categoryInfo: Category
    open:boolean
    openModal:boolean
}

export default function Categorys() {
    const { popupAdd } = useContext(UserContext)
    const [state, setState] = useState<State>({
        dataCategory: [],
        categoryInfo: {id_category:'',name_category:'',create_at:'',update_at:''},
        open: false,
        openModal:false
    })

    const handleOpen = () => setState(prev => ({ ...prev, open: true }))
    const handleClose = () => setState(prev => ({ ...prev, open: false, openModal: false }))

    useEffect(() => {
        categoryController.get().then(res => {
            setState(prev => ({ ...prev, dataCategory: res }))
        })
    }, [])

    const onNoteCategory = (id_category: string) => {
        state.dataCategory.map((item,key) => {
            if (id_category === item.id_category) {
                if (state.categoryInfo.name_category === '') {
                    setState(prev => ({...prev, categoryInfo: {...prev.categoryInfo,name_category: item.name_category}}))
                }
                if (state.categoryInfo.id_category === '') {
                    setState(prev => ({...prev, categoryInfo: {...prev.categoryInfo,id_category: item.id_category}}))
                }
            }
        })
        setState(prev => ({ ...prev, openModal: true }))
    }

    const onUpdateCategory = () => {
        categoryController.update(state.categoryInfo).then(res => {
            setState(prev => ({...prev,dataCategory: res}))
        })
        popupAdd('Update user success !!!')
    }

    const onDeleteCategory = (id_category: string) => {
        categoryController.delete(id_category).then(res => {
            setState(prev => ({...prev,dataCategory: res}))
        })
        popupAdd('Delete user success !!!')
    }

    const onAddCategory = () => {
        categoryController.create(state.categoryInfo).then(res => {
            setState(prev => ({...prev,dataCategory: res}))
        })
        popupAdd('Create user success !!!')
    }

    return (
        <TableContainer sx={{ height: '800px', overflow: 'auto' }} component={Paper}>
            <Table aria-label="collapsible table" >
                <TableHead>
                    <TableRow >
                        <TableCell width='2%'></TableCell>
                        <TableCell width='10%' align="center">Name</TableCell>
                        <TableCell width='6%' align="center">Create</TableCell>
                        <TableCell width='6%' align="center">Update</TableCell>
                        <TableCell width='5%' align="center">
                            <IconButton size="small" color='primary' onClick={handleOpen} ><FaPlus /></IconButton>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody >
                    {state.dataCategory.map((item, key) => {
                        return (
                            <TableRow key={key} >
                                <TableCell sx={{ borderRight: 1, borderColor: '#E0E0E0' }} align='center' > </TableCell>
                                <TableCell sx={{ borderRight: 1, borderColor: '#E0E0E0' }} align='center' >
                                    <TextField id="outlined-basic" type='text' variant="outlined"
                                        defaultValue={item.name_category}
                                        onChange={e => setState(prev => ({ ...prev, categoryInfo: { ...prev.categoryInfo, name_category: e.target.value } }))}
                                    />
                                </TableCell>
                                <TableCell sx={{ borderRight: 1, borderColor: '#E0E0E0' }} align="center" >
                                    {moment(item.create_at).format('HH:mm DD-MM-YYYY')}
                                </TableCell>
                                <TableCell sx={{ borderRight: 1, borderColor: '#E0E0E0' }} align="center" >
                                    {moment(item.update_at).format('HH:mm DD-MM-YYYY')}
                                </TableCell>
                                <TableCell sx={{ borderRight: 1, borderColor: '#E0E0E0' }} align="center" >
                                    <IconButton size="small" color='success' onClick={e => onNoteCategory(item.id_category)} ><FaEdit /></IconButton>
                                    <IconButton size="small" color='error' onClick={e => onDeleteCategory(item.id_category)} ><FaTrash /></IconButton>
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
                    <Box>
                        <p>ADD CATEGORY</p>
                        <TextField sx={{ margin: '30px 0', width: '100%' }} id="outlined-basic" type='email' label="Name" variant="outlined"
                            onChange={e => setState(prev => ({ ...prev, categoryInfo: { ...prev.categoryInfo, name_category: (e.target.value) } }))}
                        />
                        <Box sx={{ textAlign: 'center' }}><Button variant="contained" color="primary" onClick={onAddCategory} >ADD</Button></Box>
                    </Box>
                </Box>
            </StyledModal>
            <StyledModal
                aria-labelledby="unstyled-modal-title"
                aria-describedby="unstyled-modal-description"
                open={state.openModal}
                onClose={handleClose}
                BackdropComponent={Backdrop}
            >
                <Box sx={style2}>
                    <Box>
                        <p>Are you want to update ?</p>
                        <Box sx={{ textAlign: 'center' ,marginTop:5}}><Button variant="contained" color="primary" onClick={onUpdateCategory} >UPDATE</Button></Box>
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
    width: 400,
    height: 230,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    p: 2,
    px: 4,
    pb: 3,
};

const style2= {
    width: 270,
    height: 130,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    p: 2,
    px: 4,
    pb: 3,
};