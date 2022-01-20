function CreateChatPrivateServer(socket: any, data: any, store: any) {
    let time = new Date()
    console.log(data)

    //checka se o ID ou o username passados existem
    for (let temp in store) {
        if (temp === data.id || store[temp] === data.userName) {
            //se os dois ou um dos dois existirem, retorna abaixo

            //envia ao solicitante os dados para criação do chat
            socket.emit("create_chat_private_client", ({
                sucess: true,
                id: temp,
                userName: store[temp],
                time: `${time.getHours()}:${time.getMinutes()}`
            }))

            //envia para a outra ponta da conversa que alguem adicionou ela para conversar
            socket.to(data.id).emit("create_chat_private_client", {
                sucess: true,
                //envia para a outra ponta o id do solicitante
                id: socket.id,
                userName: data.userNameSource,
                time: `${time.getHours()}:${time.getMinutes()}`

            });
            break
        } else {
            socket.emit("create_chat_private_client", ({
                sucess: false,
                message: "UserName or ID invalid"
            }))
        }
    }
}

export { CreateChatPrivateServer }