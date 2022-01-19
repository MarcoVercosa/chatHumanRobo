import { configureStore, combineReducers } from "@reduxjs/toolkit"
import { getDefaultMiddleware } from '@reduxjs/toolkit';


import changeDadosTelaInicialReducer from "./reducers/telaInicial.reducer"
import receiveMessageRoboReducer from "./reducers/contentChat.reducer"
import openChatRoboReducer from "./reducers/contentChat.reducer";
import socketReducer from "./reducers/socket.reducer"
import listAllChatReducer from "./reducers/contentChat.reducer";
import sendMessageRoboReducer from "./reducers/contentChat.reducer";
import addNewChatPrivateReducer from "./reducers/contentChat.reducer";
import sendMessagePrivateReducer from "./reducers/contentChat.reducer";
import { receiveMessagePrivateReducer } from "./reducers/contentChat.reducer";
const reducer = combineReducers({
    changeDadosTelaInicialReducer,
    receiveMessageRoboReducer,
    sendMessageRoboReducer,
    openChatRoboReducer,
    listAllChatReducer,
    socketReducer,
    addNewChatPrivateReducer,
    sendMessagePrivateReducer,
    receiveMessagePrivateReducer

})


const store = configureStore({
    reducer,

    //Redux não permite Non-Serializable Data (como promessas, símbolos,
    // mapas / conjuntos, funções ou instâncias de classe no estado de armazenamento
    // Redux ou ações despachadas). para permitir armazenar o socket, que é uma instância
    //cria esse midware abaixo para permitir o armazenamento, permitindo pelo action que é o:
    //socketAction/socketReducer, é o action do socket.reducer
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions:
                    ["chatContentAction/contentChatReducer",
                        "changeTelaInicialActions/changeDadosTelaInicialReducer",
                        "chatContentAction/openChatReducer",
                        "chatContentAction/sendMessageReducer",
                        "chatContentAction/receiveMessageReducer",

                    ]
            }
        })

})

export default store