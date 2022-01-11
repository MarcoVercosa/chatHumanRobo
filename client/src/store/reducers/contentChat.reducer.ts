import { createSlice } from "@reduxjs/toolkit";


interface IChatContent {
    openChat: boolean;
    nameSource: any
    emailSource: any;
    chatNameDestination: string;
    avatar: String;
    color: string;
    isRoom: boolean;
    chatID: number | undefined;
    contentChat: [{
        content: string,
        author: string,
        time: any
    }];
}

// interface IChatContent extends Array<IChatContent>{}

const initialState: IChatContent[] =
    [
        {
            openChat: false,
            nameSource: localStorage.getItem("nome"),
            emailSource: localStorage.getItem("email"),
            chatNameDestination: "ROBÔ - IMC",
            avatar: "fas fa-3x fa-robot",
            color: "rgb(9, 9, 9)",
            isRoom: false,
            chatID: undefined,
            contentChat: [{
                content: "",
                author: "",
                time: ""
            }]
        },
        {
            openChat: false,
            nameSource: localStorage.getItem("nome"),
            emailSource: localStorage.getItem("email"),
            chatNameDestination: "ROBÔ - Reservatórios SP",
            avatar: "fas fa-3x fa-hand-holding-water",
            color: "rgb(79, 135, 255)",
            chatID: undefined,
            isRoom: false,
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
        contentChatReducer(state: any, { payload }): any {            // return { contentChat: payload }

            return state = payload
        }
    }
})

export const { contentChatReducer } = contentChat.actions
export default contentChat.reducer