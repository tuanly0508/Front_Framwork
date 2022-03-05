
import styled from "@emotion/styled";
import { Box, ModalUnstyled } from "@mui/material";
import { useContext } from "react";
import { AdminContext } from "../../../contexts/AdminContext";
import TableProduct from "./TableProduct";

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
    width: '75%',
    height: '50%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    p: 2,
    px: 4,
    pb: 3
};

export default function ModalProduct() {
    const adminContext = useContext(AdminContext)
    const handleClose = () => adminContext.changeIsOpenProduct(false);
    
    return (
        <StyledModal
            aria-labelledby="unstyled-modal-title"
            aria-describedby="unstyled-modal-description"
            open={adminContext.isModal}
            onClose={handleClose}
            BackdropComponent={Backdrop}
        >
            <Box sx={style}>
                <TableProduct/>
            </Box>
        </StyledModal>
    )
}