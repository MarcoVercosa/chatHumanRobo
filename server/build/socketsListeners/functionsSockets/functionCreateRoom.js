"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateRoom = void 0;
var crypto_1 = __importDefault(require("crypto"));
function CreateRoom(data, storeRooms, socket) {
    // console.log("create_room")
    var temp = undefined;
    //checka se ja existe uma sala com o nome solicitado
    for (temp in storeRooms) {
        if (temp === data.roomName) {
            socket.emit("confirm_create_room", {
                sucess: false,
                message: "Name room \"".concat(data.roomName, "\" already exist !")
            });
            return;
        }
    }
    var idRoom = crypto_1.default.randomBytes(8).toString("hex");
    //gera um id na qual será atrelado ao nome da sala
    //ex: SalaFestas:cd9c8d9c8d9c88dc9dc9d8c9dcd
    storeRooms[data.roomName] = idRoom;
    var time = new Date();
    //relaciona o idsocket com a sala
    socket.join(data.roomName);
    //retorna para o solicitante as infos para criação da sala
    socket.emit("confirm_create_room", {
        sucess: true,
        id: idRoom,
        userName: data.userName,
        roomName: data.roomName,
        message: "".concat(data.userName, " criou esta sala"),
        time: "".concat(time.getHours(), ":").concat(time.getMinutes())
    });
    // console.log(`User with ID ${socket.id} joined room: ${data.roomName}`)
    // console.log(socket)
}
exports.CreateRoom = CreateRoom;
