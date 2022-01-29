"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SendMenssageToPrivate = void 0;
function SendMenssageToPrivate(socket, message) {
    // console.log("Solicitado mensagem privada")
    var time = new Date();
    // envia mensagem privada para o cliente
    socket.to(message.chatID).emit("received_message_private", {
        content: message.message,
        author: message.author,
        time: "".concat(time.getHours(), ":").concat(time.getMinutes()),
        idDestiny: message.chatID,
        idSource: socket.id
    });
}
exports.SendMenssageToPrivate = SendMenssageToPrivate;
