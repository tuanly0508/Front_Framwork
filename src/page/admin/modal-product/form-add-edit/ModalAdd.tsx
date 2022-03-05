import { Autocomplete, Box, Button, IconButton, ModalUnstyled, styled, TextField } from "@mui/material";
import { useContext, useState } from "react";
import { FaPlus, FaTrash } from "react-icons/fa";
import { AdminContext } from "../../../../contexts/AdminContext";
import { UserContext } from "../../../../contexts/UserContext";
import { ProductLineAdmin } from "../../../../model/ProductLineAdmin";

type State = {
    dataProductAdmin: ProductLineAdmin
}

export default function ModalAdd() {
    const userContext = useContext(UserContext)
    const adminContext = useContext(AdminContext)
    const handleClose = () => adminContext.changeIsOpenModal(false);

    const [state, setState] = useState<State>({
        dataProductAdmin: { idBrand: '', idCategory: '', nameProduct: '', image: [] }
    })

    const onchangeBrand = (value: string | null) => {
        adminContext.dataBrand.map((item) => {
            if (item.name_brand === value) {
                setState(prev => ({ ...prev, dataProductAdmin: { ...prev.dataProductAdmin, idBrand: item.id_brand } }))
            }
            return item
        })
    }

    const onchangeCategory = (value: string | null) => {
        adminContext.dataCategory.map((item) => {
            if (item.name_category === value) {
                setState(prev => ({ ...prev, dataProductAdmin: { ...prev.dataProductAdmin, idCategory: item.id_category } }))
            }
            return item
        })
    }

    const handleImage = (e: any) => {
        if (e.target.value !== '') {
            adminContext.changeUrl(e.target.value)
        }
    }

    const addImage = () => {
        setState(prev => ({ ...prev, dataProductAdmin: { ...prev.dataProductAdmin, image: adminContext.url } }))
        userContext.popupAdd('Add image success !!!')
    }

    const handleDeleteImage = (image:string) => {
        adminContext.changeUrlDelete(image)
        userContext.popupAdd('Delete image success !!!')
    }

    const onAddProduct = () => {
        adminContext.createProductLine(state.dataProductAdmin)
        userContext.popupAdd('Add product success !!!')
    }
    
    return (
        <StyledModal
            aria-labelledby="unstyled-modal-title"
            aria-describedby="unstyled-modal-description"
            open={adminContext.isOpen}
            onClose={handleClose}
            BackdropComponent={Backdrop}
        >
            <Box sx={style}>
                <p>ADD PRODUCT</p>
                <Box sx={{marginTop:'20px',display:'grid',gridTemplateColumns:'1fr 1fr'}}>
                    <Box>
                        <TextField sx={{ width: 350, marginTop: '10px' }} id="outlined-basic" label="Name product" variant="outlined"
                            onChange={e => setState({ ...state, dataProductAdmin: { ...state.dataProductAdmin, nameProduct: e.target.value } })}
                        />

                        <Autocomplete sx={{ width: 350, margin: '20px 0' }} disablePortal id="combo-box-demo"
                            onChange={(event, value) => onchangeBrand(value)}
                            options={adminContext.dataBrand.map((option) => option.name_brand)}
                            renderInput={(params) => <TextField {...params} label="Brand" />}
                        />

                        <Autocomplete sx={{ width: 350, margin: '20px 0' }} disablePortal id="combo-box-demo"
                            onChange={(event, value) => onchangeCategory(value)}
                            options={adminContext.dataCategory.map((option) => option.name_category)}
                            renderInput={(params) => <TextField {...params} label="Category" />}
                        />

                        <Box sx={{ display: 'grid', gridTemplateColumns: '88% 12%', marginBottom: '20px' }}>
                            <TextField onChange={e => handleImage(e)} id="outlined-basic" label="Image" variant="outlined" />
                            <IconButton onClick={addImage} size="small" color="primary"><FaPlus /></IconButton>
                        </Box>
                        <Box sx={{textAlign:'center',marginRight:'70px' }}><Button variant="contained" color="primary" onClick={onAddProduct} >ADD</Button></Box>
                    </Box>
                    <Box sx={{ marginLeft:'30px',border: '1px dashed wheat', height: '350px', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', overflow: 'auto' }}>
                        {adminContext.url.map((item, key) => {
                            return (
                                <Box key={key}>
                                    <div style={{ position: 'relative', border: '1px dashed wheat', margin: '10px' }} >
                                        <img key={key} width='100px' height='100px' src={item} alt="" />
                                        <IconButton onClick={e=>handleDeleteImage(item)} style={{ position: 'absolute', top: '-8%', right: '-7%', color: 'tomato', fontSize: '15px' }} ><FaTrash /></IconButton>
                                    </div>
                                </Box>
                            )
                        })}
                    </Box>
                </Box>
            </Box>
        </StyledModal>
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
    width: '45%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    p: 2,
    px: 4,
    pb: 3
};