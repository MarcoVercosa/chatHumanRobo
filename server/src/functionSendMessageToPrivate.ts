function SendMenssageToPrivate(socket: any, message: any) {
    let time = new Date()

    // envia mensagem privada para o cliente
    console.log(message)
    socket.to(message.chatID).emit("received_message_private", {
        content: message.message,
        author: message.author,
        time: `${time.getHours()}:${time.getMinutes()}`,
        id: message.chatID
    });
}

export { SendMenssageToPrivate }