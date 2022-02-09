import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';
import { useSelector } from "react-redux"
import IconPlus from "../../../icons/plus.png"
import { selectorSocket } from '../../../store/reducers/socket.reducer';
import { selectorChatContent } from '../../../store/reducers/contentChat.reducer';

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

export default function ModalCreatChat(): JSX.Element {
    const [open, setOpen] = useState<boolean>(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [checkedOpenRoom, setCheckedOpenRoom] = useState<boolean>(false);
    const [checkedOpenPrivate, setCheckedOpenPrivate] = useState<boolean>(true);
    const [idType, setIdType] = useState<string>("");

    const { socket }: any = useSelector(selectorSocket)
    const contentAllChats: Array<{}> = useSelector(selectorChatContent)

    function ChatCreate() {
        if (idType.length < 1) {
            alert("Digite um ID ou nome válido")
            return
        }
        //se a solicitação for para criar chat privado
        if (checkedOpenPrivate) {
            //checa se ja existe esse chat criado com esse id
            let temp = contentAllChats.find((data: any) => data.chatID === idType)
            //se temp for verdadeiro, já existe esse ID friend add, e o socket se tentar add ele mesmo
            if (temp || idType === socket.id) {
                alert("Esse nome já existe em sua lista de amigos")
                return
            }
            socket.emit("create_chat_private_server", ({
                id: idType,
                userNameSource: localStorage.getItem("name")

            }))
            handleClose()
            return
        } else {
            //solicitação para criação de chat ROOM
            //checa se ja existe esse chat ROOM criado com esse id
            let temp = contentAllChats.find((state: any) => state.chatID === idType)
            if (temp) {
                alert("Este CHAT ROOM já existe em sua lista de amigos")
                return
            }
            socket.emit("create_room", ({
                id: socket.id,
                roomName: idType,
                userName: localStorage.getItem("name")
            }))
            handleClose()
        }
    }

    return (
        <div>
            <img alt="adicionar private ou room" src={IconPlus}
                onClick={handleOpen}
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
                        <h1 style={{ textAlign: "center" }}>
                            Create a chat: {checkedOpenRoom ? "ROOM" : "PRIVATE"}
                        </h1>

                    </div>
                    <div style={{
                        marginBottom: "10%", display: "flex", justifyContent: "space-around"
                    }}>
                        <FormGroup aria-label="position" row>
                            <FormControlLabel
                                value="top"
                                control={<Switch color="secondary" />}
                                label="ROOM"
                                labelPlacement="start"
                                checked={checkedOpenRoom}
                                onChange={(event: any) => {
                                    setCheckedOpenRoom(event.target.checked)
                                    setCheckedOpenPrivate(!event.target.checked)
                                }}
                            />
                            <FormControlLabel
                                value="start"
                                control={<Switch color="secondary" />}
                                label="PRIVATE"
                                labelPlacement="start"
                                checked={checkedOpenPrivate}
                                onChange={(event: any) => {
                                    setCheckedOpenPrivate(event.target.checked)
                                    setCheckedOpenRoom(!event.target.checked)
                                }}
                            />
                        </FormGroup>
                    </div>
                    <div style={{ textAlign: "center", marginBottom: "10%" }}>
                        <TextField id="outlined-basic"
                            //se o checkbox room for true... senão ...
                            label={checkedOpenRoom ? "type new room name" : "type ID friend"}
                            variant="outlined"
                            onChange={(event: any) => { setIdType(event.target.value) }}
                            value={idType}
                        />
                    </div>
                    <div style={{ textAlign: "center" }}>
                        <Button onClick={ChatCreate} variant="contained" size="large"
                            style={{ width: "30%", marginBottom: "5%", marginRight: "5%" }}
                        >CREATE
                        </Button>
                        <Button onClick={handleClose} variant="contained" size="large" color="error"
                            style={{ width: "30%", marginBottom: "5%" }}
                        >FECHAR
                        </Button>
                    </div>
                </Box>
            </Modal>
        </div>
    );
}
