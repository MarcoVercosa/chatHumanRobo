import { createSlice } from "@reduxjs/toolkit";

interface ITelaInicial {
    email: string;
    name: string;
    componentChat: boolean;
    componentTelaInicial: boolean
}

const initialState: ITelaInicial = {
    email: "preencha seu email",
    name: "preencha seu nome",
    componentChat: false,
    componentTelaInicial: true
}

const dadosTelaInicial = createSlice({
    name: "changeTelaInicialActions",
    initialState,
    reducers: {
        changeDadosTelaInicialReducer: (state, { payload }): any => {
            console.log("chamou reducer changeDadosTelaInicialReducer")
            return state = payload

        }
    }
})

export const { changeDadosTelaInicialReducer } = dadosTelaInicial.actions
export default dadosTelaInicial.reducer