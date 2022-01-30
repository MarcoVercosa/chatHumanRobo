import { Socket } from "socket.io"

interface ISendMenssageToPrivate {
    message: string;
    author: string;
    chatID: string;
}

interface IRetorno {
    content: string;
    author: string;
    time: string;
    idDestiny: string;
    idSource: string;
}

function SendMenssageToPrivate(socket: Socket, message: ISendMenssageToPrivate) {
    // console.log("Solicitado mensagem privada")
    let time = new Date()

    // envia mensagem privada para o cliente
    socket.to(message.chatID).emit("received_message_private", {
        content: message.message,
        author: message.author,
        time: `${time.getHours()}:${time.getMinutes()}`,
        idDestiny: message.chatID,
        idSource: socket.id
    } as IRetorno);
}

export { SendMenssageToPrivate }