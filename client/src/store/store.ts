import { configureStore, combineReducers } from "@reduxjs/toolkit"

import changeDadosTelaInicialReducer from "./reducers/telaInicial.reducer"
import logoffChatReducer from "./reducers/telaInicial.reducer";

//-------------------T E S T E
import testeTelaInicial from "./reducers/telaInicial.reducer"
import testeContenChat from "./reducers/contentChat.reducer"



import receiveMessageRoboReducer from "./reducers/contentChat.reducer"
import activeWindowChat from "./reducers/contentChat.reducer";
import socketReducer from "./reducers/socket.reducer"
import listAllChatReducer from "./reducers/contentChat.reducer";
import sendMessageRoboReducer from "./reducers/contentChat.reducer";
import addNewChatPrivateReducer from "./reducers/contentChat.reducer";
import sendMessagePrivateReducer from "./reducers/contentChat.reducer";
import receiveMessagePrivateReducer from "./reducers/contentChat.reducer";
import addNewChatRoomReducer from "./reducers/contentChat.reducer";
import receiveMessageRoomReducer from "./reducers/contentChat.reducer";
import sendMessageRoomReducer from "./reducers/contentChat.reducer";
import deleteChatReducer from "./reducers/contentChat.reducer";
import socketReconnectReducer from "./reducers/socket.reducer";
import initialStateReconnect from "./reducers/contentChat.reducer";

const reducer = combineReducers({
    changeDadosTelaInicialReducer,
    receiveMessageRoboReducer,
    sendMessageRoboReducer,
    activeWindowChat,
    listAllChatReducer,
    socketReducer,
    addNewChatPrivateReducer,
    sendMessagePrivateReducer,
    receiveMessagePrivateReducer,
    addNewChatRoomReducer,
    receiveMessageRoomReducer,
    sendMessageRoomReducer,
    deleteChatReducer,
    logoffChatReducer,
    socketReconnectReducer,
    initialStateReconnect,


    testeTelaInicial,
    testeContenChat

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
                        "chatContentAction/sendMessageRoboReducer",
                        "chatContentAction/receiveMessageRoboReducer",
                        "chatContentAction/openChatRoboReducer",
                        "chatContentAction/activeWindowChat",
                        "chatContentAction/addNewChatPrivateReducer",
                        "chatContentAction/sendMessagePrivateReducer",
                        "chatContentAction/addNewChatRoomReducer",
                        "chatContentAction/receiveMessageRoomReducer",
                        "chatContentAction/deleteChatReducer",
                        "chatContentAction/sendMessageRoomReducer"
                    ]
            }
        })

})

export default store