import React, { } from 'react'
import { useDispatch, useSelector } from "react-redux"
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import "./telaInicial.css"
import Chat from '../chat/chat';
import { changeDadosTelaInicialReducer } from '../../store/reducers/telaInicial.reducer';


function Tela_Inicial() {

    console.log("renderizou tela inicial")

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
        //atualiza nome e email tela inicial
        let temp = dadosTelaInicialReducer.telaInicial
        temp = { ...temp, [data.target.name]: data.target.value }
        //salve no estado Redux
        dispatch(changeDadosTelaInicialReducer(temp))
        //salva no Storage local
        localStorage.setItem(data.target.name, data.target.value)
    }

    return (
        <>
            {dadosTelaInicialReducer.telaInicial.componentTelaInicial &&
                <main className='main-telainicial'>
                    <h1 className='main-telainicial-h1'>Entrar no CHAT</h1>
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

