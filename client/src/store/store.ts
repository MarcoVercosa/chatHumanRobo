import { configureStore, combineReducers } from "@reduxjs/toolkit"

import changeDadosTelaInicialReducer from "./reducers/telaInicial.reducer"
import contentChatReducer from "./reducers/contentChat.reducer"

const reducer = combineReducers({ changeDadosTelaInicialReducer, contentChatReducer })


const store = configureStore({
    reducer
})

export default store