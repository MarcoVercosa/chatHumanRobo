function SendMenssageToPrivate(socket: any, message: any) {
    console.log("Solicitado mensagem privada")
    let time = new Date()

    // envia mensagem privada para o cliente
    socket.to(message.chatID).emit("received_message_private", {
        content: message.message,
        author: message.author,
        time: `${time.getHours()}:${time.getMinutes()}`,
        id: message.chatID
    });
}

export { SendMenssageToPrivate }