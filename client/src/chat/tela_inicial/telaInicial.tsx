import React, { useState } from 'react'
import "./telaInicial.css"
import Chat from '../chat/chat';
import { useDispatch, useSelector } from "react-redux"
import { changeDadosTelaInicialReducer } from '../../store/reducers/telaInicial.reducer';

import io from "socket.io-client"

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';


var socket = io("http://localhost:3001")

function Tela_Inicial() {

    const dispatch = useDispatch()

    const dadosTelaInicialReducer: any = useSelector((state: any) => state.changeDadosTelaInicialReducer)


    function AbrirChat() {
        if (dadosTelaInicialReducer.telaInicial.nome.length > 3 && dadosTelaInicialReducer.telaInicial.email.length > 5) {
            let temp = dadosTelaInicialReducer.telaInicial
            temp = { ...temp, componentChat: true, componentTelaInicial: false }
            dispatch(changeDadosTelaInicialReducer(temp))

        } else alert("Preencha os campos para pode entrar")
    }

    function AtualizaComponenteStore(data: any) {
        let temp = dadosTelaInicialReducer.telaInicial
        temp = { ...temp, [data.target.name]: data.target.value }
        dispatch(changeDadosTelaInicialReducer(temp))
    }

    return (
        <>
            {dadosTelaInicialReducer.telaInicial.componentTelaInicial &&
                <main className='main-telainicial'>
                    <h1 className='main-telainicial-h1'>Entrarrr no CHAT</h1>
                    <div className='main-telainicial-div'>

                        <div className='main-telainicial-div-email'>
                            <TextField id="outlined-basic" label="E-mail..." variant="outlined" name="email"
                                onChange={(data: any) => { AtualizaComponenteStore(data) }}
                            />
                        </div>
                        <div className='main-telainicial-div-nome'>
                            <TextField id="outlined-basic" label="Nome..." variant="outlined" name="nome"
                                onChange={(data: any) => { AtualizaComponenteStore(data) }}
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
            {dadosTelaInicialReducer.telaInicial.componentChat &&
                <Chat />
            }
        </>
    )
}

export default Tela_Inicial

