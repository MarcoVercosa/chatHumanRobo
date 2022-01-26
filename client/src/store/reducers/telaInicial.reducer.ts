import { createSlice } from "@reduxjs/toolkit";

interface ITelaInicial {
    email: string;
    name: string;
    activeComponentChat: boolean;
    componentTelaInicial: boolean
}

const initialState: ITelaInicial = {
    email: "",
    name: "",
    activeComponentChat: false,
    componentTelaInicial: true
}

const dadosTelaInicial = createSlice({
    name: "changeTelaInicialActions",
    initialState,
    reducers: {
        changeDadosTelaInicialReducer: (state, { payload }): any => {
            return state = payload

        },
        logoffChatReducer: (state: any, { payload }): any => {
            state.email = ""
            state.name = ""
            state.activeComponentChat = false
            state.componentTelaInicial = true
        },

    }
})

export const { changeDadosTelaInicialReducer, logoffChatReducer } = dadosTelaInicial.actions
export default dadosTelaInicial.reducer