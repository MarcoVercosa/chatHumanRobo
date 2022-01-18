import { createSlice } from "@reduxjs/toolkit";


interface IChatContent {
    openChat: boolean;
    chatNameDestination: string;
    avatar: String;
    color: string;
    isRoom: boolean;
    socketDestination: string;
    isRobo: boolean
    chatID: number | undefined;
    contentChat: Array<{
        content: string,
        author: string,
        time: any
    }>;
}

// interface IChatContent extends Array<IChatContent>{}

const initialState: IChatContent[] =
    [
        {
            openChat: false,
            chatNameDestination: "ROBÔ - IMC",
            avatar: "fas fa-3x fa-robot",
            color: "rgb(9, 9, 9)",
            isRoom: false,
            socketDestination: "send_message_to_robo_imc",
            isRobo: true,
            chatID: undefined,
            contentChat: [{
                content: "Olá, tudo bem ? Sou o Robô- IMC. Posso lhe ajudar com seu IMC (Índice de Massa Corporal) ?",
                author: "ROBÔ - IMC",
                time: ""
            }, {
                content: "Por favor, digite sim para lhe ajudar ou não para encerrar:",
                author: "ROBÔ - IMC",
                time: ""
            }]
        },
        {
            openChat: false,
            chatNameDestination: "ROBÔ - Reservatórios SP",
            avatar: "fas fa-3x fa-hand-holding-water",
            color: "rgb(79, 135, 255)",
            chatID: undefined,
            isRoom: false,
            socketDestination: "send_message_to_robo_reservatorios_sp",
            isRobo: true,
            contentChat: [{
                content: "Olá, tudo bem ? Sou o ROBÔ - Reservatórios SP. Digite sim par saber como está a situação dos nossos reservatórios ou digite não para cancelar",
                author: "ROBÔ - Reservatórios SP",
                time: ""
            }],
        }

    ]

const contentChat = createSlice({
    name: "chatContentAction",
    initialState,
    reducers: {
        listAllChatReducer(state: any, { payload }): any {            // return { contentChat: payload }

            return state
        },
        receiveMessageRoboReducer(state: any, { payload }): any {
            state.map((data: any, index: any) => {
                if (payload.author === data.chatNameDestination) {
                    data.contentChat = [...data.contentChat, payload]
                }
            })
            // return state
        },
        sendMessageRoboReducer(state: any, { payload }): any {
            state.map((data: any, index: number) => {
                if (payload.destination === data.chatNameDestination) {
                    data.contentChat = [...data.contentChat, { content: payload.message, author: payload.author, time: payload.time }]
                }
            })
            // return state
        },
        openChatRoboReducer(state: any, { payload }): any {
            //recebe o nome do chat selecionado e deixa o respectivo obj do chat como True
            state.map((data: any, index: number) => {
                if (data.chatNameDestination === payload) {
                    data.openChat = true
                } else {
                    data.openChat = false
                }
            })
            // return state
        },
        addNewChatSingle(state: any, { payload }): any {
            state = [...state, {
                openChat: false,
                chatNameDestination: payload.chatNameDestination,
                avatar: "",
                color: "",
                chatID: undefined,
                isRoom: false,
                socketDestination: "send_message_to_single_person",
                isRobo: false,
                contentChat: [{
                    content: "Chat criado com sucesso",
                    author: "Chat",
                    time: ""
                }]
            }]
        },
        sendMessageSingleReducer(state: any, { payload }): any {
            state.map((data: any, index: any) => {
                if (payload.author === data.chatNameDestination) {
                    data.contentChat = [...data.contentChat, payload]
                }
            })
        }

    }
})

export const { receiveMessageRoboReducer, sendMessageRoboReducer,
    addNewChatSingle, sendMessageSingleReducer,
    openChatRoboReducer, listAllChatReducer
} = contentChat.actions
export default contentChat.reducer