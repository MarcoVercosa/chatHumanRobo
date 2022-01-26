import { Socket } from "socket.io"

interface IRoboIMC {
    message: string;
    author: string;

}

export function RoboIMC(socket: Socket, message: IRoboIMC) {
    let time = new Date()
    console.log("Received Robo IMC")

    switch (message.message.toLowerCase()) {
        case "não":
        case "nao":
            socket.emit("received_message_from_robo", {
                content: `OK ${message.author}. Se precisar de alguma informação relacionado ao seu IMC é só digitar sim a qualquer momento :)`,
                author: "ROBÔ - IMC",
                time: `${time.getHours()}:${time.getMinutes()}`
            })
            break

        case "sim":
            socket.emit("received_message_from_robo", {
                content: `Olá ${message.author}. Tudo bem ? \n
                Vamos saber com está seu "Índice de Massa Corporal ?"`,
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
            //se nem sim e nem não, irá tentar identificar se mandou o peso e a altura
            try {
                //Replace: se vier virgula, substitui pelo ponto
                //split: dividi a string em 1 array de duas casas separando pelo traço
                //faz um map nessas 2 arrays e a transforma em numero com 2 dígitos após o ponto
                let dados: number[] | any =
                    message.message.replace(",", ".")
                        .split("-")
                        .map((result: any) => Number(result).toFixed(2))

                if (dados.length === 2 && !isNaN(dados[0]) && !isNaN(dados[1])) {
                    //se de fato der 2 indices, e ambos resultados forem numeros
                    let imc: string = Number(dados[1] / (dados[0] * dados[0])).toFixed(2)
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
                        content: `Esse é um dado para saber melhor onde você se encaixa`,
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





