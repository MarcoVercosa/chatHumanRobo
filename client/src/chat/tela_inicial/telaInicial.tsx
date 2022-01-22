import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import "./telaInicial.css"
import Chat from '../chat/chat';
import { changeDadosTelaInicialReducer } from '../../store/reducers/telaInicial.reducer';


function Tela_Inicial() {

    const [email, setEmail] = useState<string>("")
    const [name, setNome] = useState<string>("")

    const dispatch = useDispatch()
    const dadosTelaInicialReducer: any = useSelector((state: any) => state.changeDadosTelaInicialReducer)
    const { socket }: any = useSelector((state: any) => state.socketReducer)


    function AbrirChat() {
        if (name.length > 3 && email.length > 5) {
            //o server irá relacionar o user ao ID e irá armazenar 
            socket.emit("join_user_idSocket", ({ userName: name }))
            localStorage.setItem("name", name)
            localStorage.setItem("email", email)
        } else alert("Preencha os campos para poder entrar")
    }

    useEffect(() => {
        //aqui é o retorno do servidor quando clicar no botao entrar. Será verificado
        //se ja possui algun user com o nome solicitado.
        socket.on("receive_uservalidation_from_server", ({ sucess, message }: any) => {
            if (sucess === true) {
                dispatch(changeDadosTelaInicialReducer({
                    email: localStorage.getItem("email"), name: localStorage.getItem("name"),
                    componentChat: true, componentTelaInicial: false
                }))
            } else {
                alert(message)
            }
        })
    }, [socket])

    return (
        <>
            {dadosTelaInicialReducer.componentTelaInicial &&
                <main className='main-telainicial'>
                    <h1 className='main-telainicial-h1'>Entrar no CHAT</h1>
                    <div className='main-telainicial-div'>

                        <div className='main-telainicial-div-email'>
                            <TextField id="outlined-basic" label="E-mail..." variant="outlined" name="email" value={email}
                                onChange={(data: any) => { setEmail(data.target.value) }}
                            />
                        </div>
                        <div className='main-telainicial-div-nome'>
                            <TextField id="outlined-basic" label="Nome..." variant="outlined" name="name" value={name}
                                onChange={(data: any) => { setNome(data.target.value) }}
                            />
                        </div>
                        <div className='main-telainicial-div-button_entrar'>
                            <Button variant="contained" size="large" style={{ width: "100%" }}
                                onClick={AbrirChat}
                            >Entrar</Button>
                        </div>
                    </div>


                </main>
            }
            {dadosTelaInicialReducer.componentChat &&
                <Chat />
            }
        </>
    )
}

export default Tela_Inicial

