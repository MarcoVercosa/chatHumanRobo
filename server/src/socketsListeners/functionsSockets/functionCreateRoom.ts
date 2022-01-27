import crypto from "crypto"
import { Socket } from "socket.io"

interface ICreateRoom {
    roomName: string;
    userName: string;
}

function CreateRoom(data: ICreateRoom, storeRooms: {} | any, socket: Socket) {
    console.log("create_room")
    let temp = undefined
    //checka se ja existe uma sala com o nome solicitado
    for (temp in storeRooms) {
        if (temp === data.roomName) {
            socket.emit("confirm_create_room", {
                sucess: false,
                message: `Name room "${data.roomName}" already exist !`
            })
            return
        }
    }

    const idRoom = crypto.randomBytes(8).toString("hex")
    //gera um id na qual será atrelado ao nome da sala
    //ex: SalaFestas:cd9c8d9c8d9c88dc9dc9d8c9dcd
    storeRooms[data.roomName] = idRoom

    let time = new Date()
    //relaciona o idsocket com a sala
    socket.join(data.roomName)
    //retorna para o solicitante as infos para criação da sala
    socket.emit("confirm_create_room", {
        sucess: true,
        id: idRoom,
        userName: data.userName,
        roomName: data.roomName,
        message: `${data.userName} criou esta sala`,
        time: `${time.getHours()}:${time.getMinutes()}`
    })
    console.log(`User with ID ${socket.id} joined room: ${data.roomName}`)
    // console.log(socket)
}

export { CreateRoom }