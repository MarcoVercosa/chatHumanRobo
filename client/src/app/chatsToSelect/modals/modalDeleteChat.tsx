import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import IconDelete from "../../../icons/icons-delete.png"

import { useDispatch, useSelector } from "react-redux"
import { deleteChatReducer } from '../../../store/reducers/contentChat.reducer';
import { selectorSocket } from '../../../store/reducers/socket.reducer';


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

export default function ModalDeleteChat({ data }: any): JSX.Element {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const dispatch = useDispatch()
    const { socket }: any = useSelector(selectorSocket)

    function DeleteChat(confirm: boolean) {
        if (confirm) {
            if (data.isRoom) {

                socket.emit("send_message_to_chat_room", {
                    destination: data.chatNameDestination,
                    message: `${localStorage.getItem("name")} deixou a sala`,
                    author: localStorage.getItem("name"),
                    chatID: data.chatID
                })
                dispatch(deleteChatReducer(data.chatID))
                alert(`A Sala ${data.chatNameDestination} foi deletado com sucesso`)
                handleClose()
                return
            }
            if (!data.isRoom) {
                socket.emit("send_message_to_private", {
                    destination: data.chatNameDestination,
                    message: `${localStorage.getItem("name")} deixou a sala PRIVADA`,
                    author: localStorage.getItem("name"),
                    chatID: data.chatID
                })
                dispatch(deleteChatReducer(data.chatID))
                alert(`O Chat privado ${data.chatNameDestination} foi deletado com sucesso`)
                handleClose()
                return
            }

        } else {
            handleClose()
        }
    }

    return (
        <div>

            <img src={IconDelete} onClick={handleOpen} />

            <Modal
                keepMounted
                open={open}
                onClose={handleClose}
                aria-labelledby="keep-mounted-modal-title"
                aria-describedby="keep-mounted-modal-description"
            >
                <Box sx={style}>
                    <div style={{ marginBottom: "10%" }}>
                        <h1 style={{ textAlign: "center" }}>
                            Você realmente quer deletar o chat {data.chatNameDestination} ?
                        </h1>

                    </div>

                    <div style={{ textAlign: "center" }}>
                        <Button variant="contained" size="large"
                            style={{ width: "30%", marginBottom: "5%", marginRight: "5%" }}
                            onClick={(event: any) => { DeleteChat(true) }}
                        >SIM
                        </Button>
                        <Button variant="contained" size="large" color="error"
                            style={{ width: "30%", marginBottom: "5%" }}
                            onClick={(event: any) => { DeleteChat(false) }}
                        >NÃO
                        </Button>
                    </div>
                </Box>
            </Modal>
        </div>
    );
}
