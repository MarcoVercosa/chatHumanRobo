import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useSelector } from "react-redux"

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

export default function ModalAddFriendToRoom() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [idType, setIdType] = React.useState("");
    const [userNameType, setUsernameType] = React.useState("");

    const { socket }: any = useSelector((state: any) => state.socketReducer)

    function AddFriendToChat() {
        if (idType.length < 1 || userNameType.length < 1) {
            alert("Digite um ID ou nome válido")
            return
        }


    }

    return (
        <div>
            <Button onClick={handleOpen} variant="contained" size="large"
                style={{ width: "35%" }}
            >
                <i className="fas fa-user-plus"></i>
            </Button>
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
                            Add friend:
                        </h1>

                    </div>

                    <div style={{ textAlign: "center", marginBottom: "10%" }}>
                        <TextField id="outlined-basic"
                            //se o checkbox room for true... senão ...
                            label="type new room name"
                            variant="outlined"
                            onChange={(event: any) => { setIdType(event.target.value) }}
                            onClick={() => { setUsernameType("") }}
                            value={idType}
                        />
                        <p>Or</p>
                        <TextField id="outlined-basic"
                            //se o checkbox room true... senão ...
                            label="type User person friend"
                            variant="outlined"
                            onChange={(event: any) => { setUsernameType(event.target.value) }}
                            onClick={() => { setIdType("") }}
                            value={userNameType}

                        />
                    </div>
                    <div style={{ textAlign: "center" }}>
                        <Button onClick={AddFriendToChat} variant="contained" size="large"
                            style={{ width: "35%", marginBottom: "5%" }}
                        >CREATE
                        </Button>
                    </div>
                </Box>
            </Modal>
        </div>
    );
}
