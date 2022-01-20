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

let time = new Date()


const initialState: IChatContent[] =
    [
        {
            openChat: false,
            chatNameDestination: "ROBÔ - IMC",
            avatar: "fas fa-3x fa-drumstick-bite",
            color: "orange",
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
            console.log("chamou reducer receiveMessageRoboReducer")
            state.map((data: any, index: any) => {
                if (payload.author === data.chatNameDestination) {
                    data.contentChat = [...data.contentChat, payload]
                }
            })
            // return state
        },
        sendMessageRoboReducer(state: any, { payload }): any {
            console.log("chamou reducer sendMessageRoboReducer")
            state.map((data: any, index: number) => {
                if (payload.destination === data.chatNameDestination) {
                    data.contentChat = [...data.contentChat, { content: payload.message, author: payload.author, time: payload.time }]
                }
            })
            // return state
        },
        openChatRoboReducer(state: any, { payload }): any {
            console.log("chamou reducer openChatRoboReducer")
            //recebe o nome do chat selecionado e deixa o respectivo obj do chat como True
            state.map((data: any, index: number) => {
                if (data.chatNameDestination === payload) {
                    data.openChat = true
                } else {
                    data.openChat = false
                }
            })
            return state
        },
        addNewChatPrivateReducer(state: any, { payload }): any {
            console.log("chamou reducer addNewChatPrivateReducer")
            console.log(payload)
            state = [...state, {
                openChat: false,
                chatNameDestination: payload.userName,
                avatar: "",
                color: "",
                chatID: payload.id,
                isRoom: false,
                socketDestination: "send_message_to_private",
                isRobo: false,
                contentChat: [{
                    content: `${payload.userName} iniciou conversa com você`,
                    author: payload.userName,
                    time: payload.time
                }]
            }]
            return state
        },
        sendMessagePrivateReducer(state: any, { payload }): any {
            console.log("chamou reducer sendMessagePrivateReducer")
            state.map((data: any, index: any) => {
                if (payload.destination === data.chatNameDestination) {
                    data.contentChat = [...data.contentChat, { content: payload.message, author: payload.author, time: `${time.getHours()}:${time.getMinutes()}` }]
                }
            })

        },
        receiveMessagePrivateReducer(state: any, { payload }): any {
            console.log("chamou reducer receiveMessagePrivateReducer")
            console.log(payload)
            state.map((data: any, index: any) => {
                if (payload.author === data.chatNameDestination) {
                    data.contentChat = [...data.contentChat, payload]
                }
            })
        }

    }
})

export const { receiveMessageRoboReducer, sendMessageRoboReducer,
    addNewChatPrivateReducer, sendMessagePrivateReducer,
    openChatRoboReducer, listAllChatReducer, receiveMessagePrivateReducer
} = contentChat.actions
export default contentChat.reducer