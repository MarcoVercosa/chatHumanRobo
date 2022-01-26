import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useSelector } from "react-redux"
import IconGroup from "../../../icons/people.png"

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

export default function ModalJointToRoom(): JSX.Element {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [idType, setIdType] = React.useState("")

    const { socket }: any = useSelector((state: any) => state.socketReducer)
    const contentAllChats: Array<{}> = useSelector((state: any) => state.listAllChatReducer)

    function JointToRoom() {
        //verifica se há caracteres digitados
        if (idType.length < 1) {
            alert("Digite um ID ou nome válido")
            return
        }
        let temp = undefined
        //verifica se já existe algum chat ja add com o ID
        temp = contentAllChats.find((data: any) => data.chatID === idType)
        if (temp) {
            alert("Já existe esse grupo em seu painel. Favor checar !")
            return
        }
        socket.emit("join_room", (
            {
                id: idType,
                userNameSource: localStorage.getItem("name")
            }
        ))
        handleClose()
    }

    return (
        <div>
            {/* <Button onClick={handleOpen} variant="contained" size="large"
                style={{ width: "35%" }}
            >
                <i className="fas fa-2x fa-users"></i>
            </Button> */}

            <img alt="entrar na sala" src={IconGroup}
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
                            Join a Room:
                        </h1>

                    </div>

                    <div style={{ textAlign: "center", marginBottom: "10%" }}>
                        <TextField id="outlined-basic"
                            //se o checkbox room for true... senão ...
                            label="type ID room"
                            variant="outlined"
                            onChange={(event: any) => { setIdType(event.target.value) }}
                            value={idType}
                        />

                    </div>
                    <div style={{ textAlign: "center" }}>
                        <Button onClick={JointToRoom} variant="contained" size="large"
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
