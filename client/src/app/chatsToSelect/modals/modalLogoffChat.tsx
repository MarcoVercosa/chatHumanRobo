import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import IconLogoff from "../../../icons/logoff.png"

import { useDispatch, useSelector } from "react-redux"
import { logoffChatReducer } from '../../../store/reducers/telaInicial.reducer'
import { selectorSocket, socketReconnectReducer } from '../../../store/reducers/socket.reducer';
import { initialStateReconnect } from '../../../store/reducers/contentChat.reducer';


const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '6px solid #c4c4c4',
    borderRadius: "35px",
    boxShadow: 24,
    p: 4,
};

export default function ModalLogoffChat(): JSX.Element {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const dispatch = useDispatch()
    const { socket }: any = useSelector(selectorSocket)


    function Logoff() {
        //altera o estado para renderizar a tela inicial
        dispatch(logoffChatReducer(true))
        //retorna os chat ao estado de inicialização no Redux
        dispatch(initialStateReconnect(true))
        //desloga a conexão com o socket server
        socket.disconnect();
        //reconecta novamente
        dispatch(socketReconnectReducer(true))

        handleClose()
    }

    return (
        <div>

            <img src={IconLogoff} onClick={handleOpen}
                style={{ width: "10%", cursor: "pointer" }}
            />
            <Modal
                keepMounted
                open={open}
                onClose={handleClose}
                aria-labelledby="keep-mounted-modal-title"
                aria-describedby="keep-mounted-modal-description"
            >

                <Box sx={style}>

                    <div style={{ marginBottom: "10%" }}>
                        <p style={{ textAlign: "center" }}>
                            <p>Ao deslogar, sua sessão será apagada !</p>
                            <p>Por segurança, seus Private Chats serão apagados, sendo necessário adicioná-los novamente</p>
                            <p>Seus grupos serão apagados, mas você poderá ingressar neles novamente</p>
                        </p>

                    </div>

                    <div style={{ textAlign: "center" }}>
                        <Button variant="contained" size="large"
                            style={{ width: "30%", marginBottom: "5%", marginRight: "5%" }}
                            onClick={Logoff}
                        >SIM
                        </Button>
                        <Button variant="contained" size="large" color="error"
                            style={{ width: "30%", marginBottom: "5%" }}
                            onClick={handleClose}
                        >NÃO
                        </Button>
                    </div>

                </Box>

            </Modal>
        </div>
    );
}
