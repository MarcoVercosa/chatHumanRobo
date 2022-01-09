import { createSlice } from "@reduxjs/toolkit";


interface IChatContent {
    openChat: boolean;
    chatName: string;
    avatar: String;
    color: string;
    ID: number;
    contentChat: [{
        content: string,
        author: string,
        time: any
    }];
}

// interface IChatContent extends Array<IChatContent>{}

const contentChatInitialState: IChatContent[] =
    [
        {
            openChat: false,
            chatName: "ROBÔ - IMC",
            avatar: "fas fa-3x fa-robot",
            color: "rgb(9, 9, 9)",
            ID: 0,
            contentChat: [{
                content: "",
                author: "",
                time: ""
            }]
        },
        {
            openChat: false,
            chatName: "ROBÔ - Reservatórios SP",
            avatar: "fas fa-3x fa-hand-holding-water",
            color: "rgb(79, 135, 255)",
            ID: 0,
            contentChat: [{
                content: "",
                author: "",
                time: ""
            }],
        }

    ]

const contentChat = createSlice({
    name: "chatContentAction",
    initialState: {
        contentChat: contentChatInitialState
    },
    reducers: {
        contentChatReducer: (state, { payload }): any => {
            return { contentChat: payload }
        }
    }
})

export const { contentChatReducer } = contentChat.actions
export default contentChat.reducer