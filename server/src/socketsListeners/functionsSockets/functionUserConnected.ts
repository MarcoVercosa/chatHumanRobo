
function UserConnected(socket: any, store: any, data: any) {
    console.log("socket join_user_idSocket")

    //checka se o user existe na var store. Se não, o adiciona
    let userAlreadyExists: any = false
    //key armazena a chave do obj e o value, o valor
    // for (let [key, value] of Object.entries(store)) {
    for (let temp in store) {
        if (store[temp] === data.userName) {
            console.log("User already exists")
            userAlreadyExists = true
            break
        }
    }
    if (!userAlreadyExists) {
        console.log("User add no store")
        //add no obj store socket.id:userName
        store[socket.id] = data.userName
        console.log(store)

        socket.emit("receive_uservalidation_from_server", ({ sucess: true }))
    } else {
        socket.emit("receive_uservalidation_from_server", ({ sucess: false, message: "User already exist !" }))
    }
}

export { UserConnected }