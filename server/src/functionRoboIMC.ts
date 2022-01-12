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

    try {
        let dados = message.message.replace(",", ".")
        //retita virgula e coloca ponto
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

        } else { BoasVindas() }
    } catch (error) {
        console.log(error)
        BoasVindas()

    }

    function BoasVindas() {

        if (message !== undefined) {
            socket.emit("received_message_from_robo", {
                content: `Olá ${message.author}. Sou um robô IMC. \n
                Vamos saber com está seu "Índice de massa corporal ?"`,
                author: "ROBÔ - IMC",
                time: `${time.getHours()}:${time.getMinutes()}`
            })
            socket.emit("received_message_from_robo", {
                content: `${message.author}. Digite sua Altura e peso. \n Ex: 1.85-80`,
                author: "ROBÔ - IMC",
                time: `${time.getHours()}:${time.getMinutes()}`

            })

        }
    }





}



