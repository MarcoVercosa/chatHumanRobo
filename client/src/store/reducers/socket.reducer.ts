import { createSlice } from "@reduxjs/toolkit";
import io from "socket.io-client"



// const socketInitialState = undefined
const initialState = {
    socket: io("http://localhost:3001")
}


const socket = createSlice({
    name: "socketAction",
    initialState,
    reducers: {
        socketReducer: (state: any, { payload }: any): any => {
            return state = payload
        }
    }
})

export const { socketReducer } = socket.actions
export default socket.reducer