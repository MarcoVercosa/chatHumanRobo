import { createSlice } from "@reduxjs/toolkit";
import io from "socket.io-client"



// const socketInitialState = undefined
const initialState = {

    socket: io("https://chat.mavs.vps-kinghost.net")
    // socket: io("https://192.168.15.143:8889/")
}


const socket = createSlice({
    name: "socketAction",
    initialState,
    reducers: {
        socketReducer: (state: any, { payload }: any): any => {
            return state = payload
        },
        socketReconnectReducer: (state: any, { payload }: any): any => {

            state.socket = io("http://chat.mavs.vps-kinghost.net:8889")
        },
    }
})

export const { socketReducer, socketReconnectReducer } = socket.actions
export default socket.reducer