import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';



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

export default function ModalCreatChat() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [checkedOpenRoom, setCheckedOpenRoom] = React.useState(false);
    const [checkedOpenPrivate, setCheckedOpenPrivate] = React.useState(true);
    const [textType, setTextType] = React.useState("");

    return (
        <div>
            <Button onClick={handleOpen} variant="contained" size="large"
                style={{ width: "35%" }}
            >
                <i className="far fa-2x fa-plus-square"></i>
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
                            //se o checkbox room true... senão ...
                            label={checkedOpenRoom ? "type new room name" : "type ID person "}
                            variant="outlined"
                            onChange={(event: any) => { setTextType(event.target.value) }}
                            value={textType}
                        />
                    </div>
                    <div style={{ textAlign: "center" }}>
                        <Button onClick={handleOpen} variant="contained" size="large"
                            style={{ width: "35%", marginBottom: "5%" }}>CREATE
                        </Button>
                    </div>
                </Box>
            </Modal>
        </div>
    );
}
