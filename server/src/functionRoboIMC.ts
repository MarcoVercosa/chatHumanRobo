// class ArmazenaRespostasIMC{
//     idSocket:any

//     constructor(idSocket:any){
//         this.idSocket = idSocket
//     }

//     ChecarIDJaConectado(){

//     }

// }

export function RoboIMC(socket: any, message: any) {
    let time = new Date()
    console.log(message)

    switch (message.message.toLowerCase()) {
        case "não" || "nao":
            socket.emit("received_message_from_robo", {
                content: `OK ${message.author}. Se precisar de alguma informação relacionado ao seu IMC é só digitar sim a qualquer momento :)`,
                author: "ROBÔ - IMC",
                time: `${time.getHours()}:${time.getMinutes()}`
            })
            break

        case "sim":
            socket.emit("received_message_from_robo", {
                content: `Olá ${message.author}. Tudo bem ? \n
                Vamos saber com está seu "Índice de massa corporal ?"`,
                author: "ROBÔ - IMC",
                time: `${time.getHours()}:${time.getMinutes()}`
            })
            socket.emit("received_message_from_robo", {
                content: `${message.author}. Digite sua Altura e peso. \n Ex: 1.85-80`,
                author: "ROBÔ - IMC",
                time: `${time.getHours()}:${time.getMinutes()}`
            })
            break

        default:
            try {
                let dados = message.message.replace(",", ".")
                //retira virgula e coloca ponto
                dados = message.message.split("-").map((result: any) => Number(result).toFixed(2))
                //divide em 2 arrays, pelo traço e a transforma em numero com 2 casas decimais

                if (dados.length === 2 && !isNaN(dados[0]) && !isNaN(dados[1])) {
                    //se de fato der 2 indices, e ambos resultados forem numeros
                    let imc = Number(dados[1] / (dados[0] * dados[0])).toFixed(2)
                    socket.emit("received_message_from_robo", {
                        content: `Sua Altura é de ${dados[0]} cm e seu peso é ${dados[1]} kg`,
                        author: "ROBÔ - IMC",
                        time: `${time.getHours()}:${time.getMinutes()}`
                    })
                    socket.emit("received_message_from_robo", {
                        content: `Seu IMC é de ${imc}`,
                        author: "ROBÔ - IMC",
                        time: `${time.getHours()}:${time.getMinutes()}`
                    })
                    socket.emit("received_message_from_robo", {
                        content: `Esse é um dado para saber melhor onde vc se encaixa`,
                        author: "ROBÔ - IMC",
                        time: `${time.getHours()}:${time.getMinutes()}`,
                        image: "https://www.ricardogozzano.com.br/wp-content/uploads/2020/03/tabela_imc-1024x726.png"
                    })

                } else { UnknownMessage() }
            } catch (error) {
                console.log(error)
                UnknownMessage()
            }
            break
    }

    function UnknownMessage() {
        socket.emit("received_message_from_robo", {
            content: `Puxa ${message.author}. Não entendi bem o que você quis dizer `,
            author: "ROBÔ - IMC",
            time: `${time.getHours()}:${time.getMinutes()}`
        })
        socket.emit("received_message_from_robo", {
            content: `Digite sua Altura e peso. \n Ex: 1.85-80. `,
            author: "ROBÔ - IMC",
            time: `${time.getHours()}:${time.getMinutes()}`
        })
    }
}





