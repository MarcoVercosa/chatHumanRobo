"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JoinRoom = void 0;
function JoinRoom(data, storeRooms, socket) {
    console.log("join_room2");
    var temp = undefined;
    for (temp in storeRooms) {
        //se existir uma key no obj com o nome da sala solicitado
        //quer dizer que a sala existe de fato, então pode ser add o id nesta sala
        if (storeRooms[temp] === data.id) {
            // console.log("Sala encontrada")
            //add o id na sala solicitada
            socket.join(temp);
            // console.log(`User with ID ${socket.id} joined room: ${temp}`)
            //envia para o solicitante a confirmação e os dados para criar e renderizar a sala             
            var time = new Date();
            socket.emit("add_chat_room", {
                sucess: true,
                id: storeRooms[temp],
                userName: data.userNameSource,
                roomName: temp,
                message: "".concat(data.userNameSource, " ingressou na sala"),
                time: "".concat(time.getHours(), ":").concat(time.getMinutes())
            });
            //envia para todos da sala criada que o solicitante ingressou na sala
            socket.in(temp).emit("received_message_room", {
                author: data.userNameSource,
                destination: temp,
                message: "".concat(data.userNameSource, " ingressou na sala"),
                time: "".concat(time.getHours(), ":").concat(time.getMinutes()),
                chatID: storeRooms[temp] //o ID do chat, o cliente usará para identificar qual chat se trata
            });
            return;
            //sai do loop if e for                
        }
    }
    //criar mensagem de sala não encontrada
    // console.log("Sala não encontrada")
    socket.emit("add_chat_room", {
        sucess: false,
        message: "N\u00E3o foi encontrado esse ID ROOM: ".concat(data.id, " ")
    });
}
exports.JoinRoom = JoinRoom;
