import { Autocomplete, Box, Button, IconButton, ModalUnstyled, Paper, styled, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material";
import moment from "moment";
import { useContext, useEffect,useRef, useState } from "react";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import { UserContext } from "../../../contexts/UserContext";
import { userController } from "../../../controllers/UserController";
import { User } from "../../../model/User";

type State = {
    dataUser: User[]
    open: boolean
    userInfo: User
    openModal: boolean
}

export default function Users() {
    const isInitialMount = useRef(true);
    const { popupAdd } = useContext(UserContext)
    const [state, setState] = useState<State>({
        dataUser: [],
        open: false,
        userInfo: { address: '', email: '', id_order: '', id_user: '', name_user: '', phone: '', role: '', pass: '' },
        openModal:false
    })

    const handleOpen = () => setState(prev => ({ ...prev, open: true }))
    const handleClose = () => setState(prev => ({ ...prev, open: false,openModal: false }))

    useEffect(() => {
        if (isInitialMount.current) {
            userController.list().then(res => {
                setState(prev => ({ ...prev, dataUser: res }))
            })
        }else {

        }
    }, [])

    const onchangeRole = (value: string | null) => {
        setState(prev => ({ ...prev, userInfo: { ...prev.userInfo, role: value as string } }))
    }

    const onNoteUser = (idUser: string) => {
        state.dataUser.map((item) => {
            if (idUser === item.id_user) {
                if(state.userInfo.id_user === '') {
                    setState(prev => ({ ...prev, userInfo: { ...prev.userInfo, id_user: item.id_user } }))
                }
                if (state.userInfo.name_user === '') {
                    setState(prev => ({ ...prev, userInfo: { ...prev.userInfo, name_user: item.name_user } }))
                }
                if (state.userInfo.email === '') {
                    setState(prev => ({ ...prev, userInfo: { ...prev.userInfo, email: item.email } }))
                }
                if (state.userInfo.address === '') {
                    setState(prev => ({ ...prev, userInfo: { ...prev.userInfo, address: item.address } }))
                }
                if (state.userInfo.phone === '') {
                    setState(prev => ({ ...prev, userInfo: { ...prev.userInfo, phone: item.phone } }))
                }
            }
        })
        setState(prev => ({...prev,openModal: true}))
    }

    const onUpdateUser = () => {
        userController.update(state.userInfo).then(res => {
            setState(prev => ({ ...prev, dataUser: res }))
        })
        popupAdd('Update user success !!!')
    }

    const onDeleteUser = (idUser: string) => {
        userController.delete(idUser).then(res => {
            console.log(res);
            
            setState(prev => ({ ...prev, dataUser: res }))
        })
        popupAdd('Delete user success !!!')
    }

    const onAddUser = () => {
        userController.create(state.userInfo).then(res => {
            console.log(res);
            
            setState(prev => ({ ...prev, dataUser: res, open:false }))
        })
        popupAdd('Create user success !!!')
    }

    console.log(state.dataUser);
    

    return (
        <TableContainer sx={{ height: '800px', overflow: 'auto' }} component={Paper}>
            <Table aria-label="collapsible table" >
                <TableHead>
                    <TableRow >
                        <TableCell width='2%'></TableCell>
                        <TableCell width='10%' align="center">Name</TableCell>
                        <TableCell width='10%' align="center">Email</TableCell>
                        <TableCell width='10%' align="center">Address</TableCell>
                        <TableCell width='10%' align="center">Phone</TableCell>
                        <TableCell width='6%' align="center">Create</TableCell>
                        <TableCell width='6%' align="center">Update</TableCell>
                        <TableCell width='5%' align="center">
                            <IconButton size="small" color='primary' onClick={handleOpen} ><FaPlus /></IconButton>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody >
                    {state.dataUser.map((item, key) => {
                        return (
                            <TableRow key={key} >
                                <TableCell sx={{ borderRight: 1, borderColor: '#E0E0E0' }} align='center' > </TableCell>
                                <TableCell sx={{ borderRight: 1, borderColor: '#E0E0E0' }} align='center' >
                                    <TextField id="outlined-basic" type='text' variant="outlined"
                                        value={item.name_user}
                                        onChange={e => setState(prev => ({ ...prev, userInfo: { ...prev.userInfo, name_user: e.target.value } }))}
                                    />
                                </TableCell>
                                <TableCell sx={{ borderRight: 1, borderColor: '#E0E0E0' }} align="center" >
                                    <TextField id="outlined-basic" type='text' variant="outlined"
                                        value={item.email}
                                        onChange={e => setState(prev => ({ ...prev, userInfo: { ...prev.userInfo, email: e.target.value } }))}
                                    />
                                </TableCell>
                                <TableCell sx={{ borderRight: 1, borderColor: '#E0E0E0' }} align="center" >
                                    <TextField id="outlined-basic" type='text' variant="outlined"
                                        value={item.address}
                                        onChange={e => setState(prev => ({ ...prev, userInfo: { ...prev.userInfo, address: e.target.value } }))}
                                    />
                                </TableCell>
                                <TableCell sx={{ borderRight: 1, borderColor: '#E0E0E0' }} align="center" >
                                    <TextField id="outlined-basic" type='text' variant="outlined"
                                        defaultValue={item.phone}
                                        onChange={e => setState(prev => ({ ...prev, userInfo: { ...prev.userInfo, phone: e.target.value } }))}
                                    />
                                </TableCell>
                                <TableCell sx={{ borderRight: 1, borderColor: '#E0E0E0' }} align="center" >
                                    {moment(item.create_at).format('HH:mm DD-MM-YYYY')}
                                </TableCell>
                                <TableCell sx={{ borderRight: 1, borderColor: '#E0E0E0' }} align="center" >
                                    {moment(item.update_at).format('HH:mm DD-MM-YYYY')}
                                </TableCell>
                                <TableCell sx={{ borderRight: 1, borderColor: '#E0E0E0' }} align="center" >
                                    <IconButton size="small" color='success' onClick={e => onNoteUser(item.id_user)} ><FaEdit /></IconButton>
                                    <IconButton size="small" color='error' onClick={e => onDeleteUser(item.id_user)} ><FaTrash /></IconButton>
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
                        <p>ADD USER</p>
                        <Box sx={{ display: 'flex', gridTemplateColumns: 2 }}>
                            <TextField sx={{ margin: '30px 30px 30px 0', width: 250 }} id="outlined-basic" type='text' label="Name user" variant="outlined"
                                onChange={e => setState(prev => ({ ...prev, userInfo: { ...prev.userInfo, name_user: (e.target.value) } }))}
                            />
                            <TextField sx={{ margin: '30px 0', width: 250 }} id="outlined-basic" type='email' label="Email" variant="outlined"
                                onChange={e => setState(prev => ({ ...prev, userInfo: { ...prev.userInfo, email: (e.target.value) } }))}
                            />
                        </Box>

                        <Box sx={{ display: 'flex', gridTemplateColumns: 2 }}>
                            <TextField sx={{ margin: '30px 30px 30px 0', width: 250 }} id="outlined-basic" type='number' label="Phone" variant="outlined"
                                onChange={e => setState(prev => ({ ...prev, userInfo: { ...prev.userInfo, phone: (e.target.value) } }))}
                            />
                            <TextField sx={{ margin: '30px 0', width: 250 }} id="outlined-basic" type='text' label="Address" variant="outlined"
                                onChange={e => setState(prev => ({ ...prev, userInfo: { ...prev.userInfo, address: (e.target.value) } }))}
                            />
                        </Box>

                        <Box sx={{ display: 'flex', gridTemplateColumns: 2 }}>
                            <Autocomplete id="combo-box-demo" disablePortal sx={{ margin: '30px 30px 30px 0', width: 250 }}
                                onChange={(event, value) => onchangeRole(value)}
                                options={dataRole.map((option) => option.role)}
                                renderInput={(params) => <TextField {...params} label="Role" />}
                            />
                            <TextField sx={{ margin: '30px 0', width: 250 }} id="outlined-basic" type='text' label="Password" variant="outlined"
                                onChange={e => setState(prev => ({ ...prev, userInfo: { ...prev.userInfo, pass: (e.target.value) } }))}
                            />
                        </Box>
                        <Box sx={{ textAlign: 'center' }}><Button variant="contained" color="primary" onClick={onAddUser} >ADD</Button></Box>
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
                        <Box sx={{ textAlign: 'center' , marginTop: 5}}><Button variant="contained" color="primary" onClick={onUpdateUser} >UPDATE</Button></Box>
                    </Box>
                </Box>
            </StyledModal>
        </TableContainer>
    )
}

const dataRole = [
    {
        id: 1,
        role: 'user'
    },
    {
        id: 2,
        role: 'admin'
    }
]

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
    width: 600,
    height: 460,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    p: 2,
    px: 4,
    pb: 3,
};

const style2 = {
    width: 270,
    height: 160,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    p: 2,
    px: 4,
    pb: 3,
};