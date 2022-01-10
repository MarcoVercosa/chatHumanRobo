import { createSlice } from "@reduxjs/toolkit";
import io from "socket.io-client"



// const socketInitialState = undefined
const socketInitialState = {
    socket: io("http://localhost:3001")
}
console.log(socketInitialState.socket)


const socket = createSlice({
    name: "socketAction",
    initialState: {
        socketContent: socketInitialState
    },
    reducers: {
        socketReducer: (state, { payload }): any => {
            return { socketContent: payload }
        }
    }
})

export const { socketReducer } = socket.actions
export default socket.reducer