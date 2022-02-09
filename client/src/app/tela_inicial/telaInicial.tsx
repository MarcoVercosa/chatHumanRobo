import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import "./telaInicial.css"
import { changeDadosTelaInicialReducer, selectorTelaInicial } from '../../store/reducers/telaInicial.reducer';
import { selectorSocket } from '../../store/reducers/socket.reducer';

function Tela_Inicial(): JSX.Element {

    // console.log("Carregou tela de login")
    const [email, setEmail] = useState<string>("")
    const [name, setNome] = useState<string>("")

    const dispatch = useDispatch()
    const dadosTelaInicialReducer: any = useSelector(selectorTelaInicial)
    let { socket }: any = useSelector(selectorSocket)

    function AbrirChat() {
        //checa se os campos não estão vazios
        if (name.length > 3 && email.length > 5) {
            //o server irá atrelar o id socket com o username
            socket.emit("join_user_idSocket", ({ userName: name }))
            localStorage.setItem("name", name)
            localStorage.setItem("email", email)

        } else alert("Preencha os campos para poder entrar")
    }

    useEffect(() => {
        //aqui é o retorno do servidor quando clicar no botao entrar. Será verificado
        //se ja possui algun user com o nome solicitado.
        socket.on("receive_uservalidation_from_server", ({ sucess, message }: { sucess: Boolean, message: string }) => {
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
                                onChange={(data: any) => {
                                    if (email.length < 31) { setEmail(data.target.value) }
                                    else { setEmail(email.slice(0, -1)) }
                                    //o else não deixa bater no ultimo caracter permitido, deletando o ultmo caracter
                                    //permitindo assim deletar caracteres
                                }}

                            />
                        </div>
                        <div className='main-telainicial-div-nome'>
                            <TextField id="outlined-basic" label="Nome..." variant="outlined" name="name" value={name}
                                onChange={(data: any) => {
                                    if (name.length < 20) {
                                        setNome(data.target.value)
                                    } else { { setNome(name.slice(0, -1)) } }
                                }}
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

