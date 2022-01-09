import { createSlice } from "@reduxjs/toolkit";

interface ITelaInicial {
    email: string;
    nome: string;
    componentChat: boolean;
    componentTelaInicial: boolean
}

const telaInicialInitialState: ITelaInicial = {
    email: "preencha seu email",
    nome: "preencha seu nome",
    componentChat: false,
    componentTelaInicial: true
}

const dadosTelaInicial = createSlice({
    name: "changeTelaInicialActions",
    initialState: {
        telaInicial: telaInicialInitialState
    },
    reducers: {
        changeDadosTelaInicialReducer: (state, { payload }): any => {
            return { telaInicial: payload }
        }
    }
})

export const { changeDadosTelaInicialReducer } = dadosTelaInicial.actions
export default dadosTelaInicial.reducer