export function RoboIMC(socket: any, message: any) {
    let time = new Date()

    try {
        let dados = message.message.replace(",", ".")
        //retita virgula e coloca ponto
        dados = message.message.split("-").map((result: any) => Number(result).toFixed(2))
        //divide em 2 arrays, pelo traço e a transforma em numero com 2 casas decimais

        if (dados.length === 2 && !isNaN(dados[0]) && !isNaN(dados[1])) {
            //se de fato der 2 indices, e ambos resultados forem numeros
            socket.emit("received_message_from_robo", {
                content: `Sua Altura é de ${dados[0]} e seu peso é ${dados[1]}`,
                author: "ROBÔ - IMC",
                time: `${time.getHours()}:${time.getMinutes()}`
            })
        } else { BoasVindas() }
    } catch (error) {
        console.log(error)
        BoasVindas()
    }

    function BoasVindas() {

        if (message !== undefined) {
            socket.emit("received_message_from_robo", {
                content: `Olá ${message.author}. Sou um robô IMC ! \n
        Vamos saber com está seu "Índice de massa corporal ?"`,
                author: "ROBÔ - IMC",
                time: `${time.getHours()}:${time.getMinutes()}`
            })
            socket.emit("received_message_from_robo", {
                content: `${message.author}. Digite sua Altura e peso. \n Ex: 1.85-80`,
                author: "ROBÔ - IMC",
                time: `${time.getHours()}:${time.getMinutes()}`

            })

            socket.optionsRoboIMC = [...socket.optionsRoboIMC, { peso: "undefined", altura: undefined, resultado: undefined }]
            console.log(message)

        }
    }





}



