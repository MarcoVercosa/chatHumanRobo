import { createSlice } from "@reduxjs/toolkit";




interface IChatContent {
    openChat: boolean;
    chatNameDestination: string;
    avatar: String;
    color: string;
    isRoom: boolean;
    startTalkWithRobo: boolean
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
            startTalkWithRobo: false,
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
            startTalkWithRobo: false,
            contentChat: [{
                content: "",
                author: "",
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
        receiveMessageReducer(state: any, { payload }): any {
            state.map((data: any, index: any) => {
                if (payload.author === data.chatNameDestination) {
                    data.contentChat = [...data.contentChat, payload]
                }
            })
            // return state
        },
        sendMessageReducer(state: any, { payload }): any {
            state.map((data: any, index: number) => {
                if (payload.destination === data.chatNameDestination) {
                    data.contentChat = [...data.contentChat, { content: payload.message, author: payload.author, time: payload.time }]
                }
            })
            // return state
        },
        openChatReducer(state: any, { payload }): any {
            //recebe o nome do chat selecionado e deixa o respectivo obj do chat como True
            state.map((data: any, index: number) => {
                if (data.chatNameDestination === payload) {
                    data.openChat = true
                } else {
                    data.openChat = false
                }
            })
            // return state
        }
    }
})

export const { receiveMessageReducer, sendMessageReducer, openChatReducer, listAllChatReducer } = contentChat.actions
export default contentChat.reducer