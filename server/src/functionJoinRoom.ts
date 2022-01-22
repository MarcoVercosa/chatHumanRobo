function JoinRoom(data: any, storeRooms: any, socket: any) {
    let temp: any = undefined
    for (temp in storeRooms) {
        //se existir uma key no obj com o nome da sala solicitado
        //quer dizer que a sala existe de fato, então pode ser add o id nesta sala
        if (storeRooms[temp] === data.id) {
            //add o id na sala solicitada
            socket.join(temp)
            console.log(`User with ID ${socket.id} joined room: ${data.temp}`)
            //envia para o solicitante a confirmação e os dados para criar renderizar a sala             
            let time = new Date()
            socket.emit("add_chat_room", {
                sucess: true,
                id: storeRooms[temp],//armazena o id da sala
                userName: data.userNameSource,//nome do solicitante q quer ingressar na sala
                roomName: temp,//a key do objeto storeRoom que tem o nome da sala
                message: `${data.userNameSource} ingressou na sala`,
                time: `${time.getHours()}:${time.getMinutes()}`
            })
            //emvia para a sala criada que o solicitante ingressou na sala
            socket.in(temp).emit("received_message_room", {
                author: data.userNameSource,//nome do solicitante q quer ingressar na sala
                destination: temp,//a key do objeto storeRoom que tem o nome da sala
                message: `${data.userNameSource} ingressou na sala`,
                time: `${time.getHours()}:${time.getMinutes()}`
            })
            break
            //sai do loop if e for                
        }
    }
    //criar mensagem de sala não encontrada
}

export { JoinRoom }