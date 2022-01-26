import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import "./telaInicial.css"
import { changeDadosTelaInicialReducer } from '../../store/reducers/telaInicial.reducer';
import { initialStateReconnect } from "../../store/reducers/contentChat.reducer"


function Tela_Inicial(): JSX.Element {

    console.log("Carregou tela de login")
    const [email, setEmail] = useState<string>("")
    const [name, setNome] = useState<string>("")

    const dispatch = useDispatch()
    const dadosTelaInicialReducer: any = useSelector((state: any) => state.changeDadosTelaInicialReducer)
    let { socket }: any = useSelector((state: any) => state.socketReducer)

    function AbrirChat() {
        //checa se os campos não estão vazios
        if (name.length > 3 && email.length > 5) {
            //quando o usuário desloga, ao relogar checa se ele digitou o mesmo user e email da ultima sessão
            //se sim, permite recuperar o estado do redux, onde estão as conversas e grupos add/criados
            if (name === localStorage.getItem("name") && email === localStorage.getItem("email")) {
                //o server irá relacionar o user ao ID e irá armazenar 
                socket.emit("join_user_idSocket", ({ userName: name }))
                localStorage.setItem("name", name)
                localStorage.setItem("email", email)
            } else {
                //irá zerar o estado do redux, para ter o chat do zero
                dispatch(initialStateReconnect(true))
                //o server irá relacionar o user ao ID e irá armazenar 
                socket.emit("join_user_idSocket", ({ userName: name }))
                localStorage.setItem("name", name)
                localStorage.setItem("email", email)
            }

        } else alert("Preencha os campos para poder entrar")
    }

    useEffect(() => {
        //aqui é o retorno do servidor quando clicar no botao entrar. Será verificado
        //se ja possui algun user com o nome solicitado.
        socket.on("receive_uservalidation_from_server", ({ sucess, message }: any) => {
            //recebe o ok do server após atrelar o id com o userName e torna true o activeComponentChat
            //com essa prop como true, o component Chat é ativado
            if (sucess === true) {
                dispatch(changeDadosTelaInicialReducer({
                    email: localStorage.getItem("email"), name: localStorage.getItem("name"),
                    activeComponentChat: true, componentTelaInicial: false
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
        </>
    )
}

export default Tela_Inicial

