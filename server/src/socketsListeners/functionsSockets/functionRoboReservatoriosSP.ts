import axios from "axios"
import https from "https"
import { Socket } from "socket.io"

interface IRoboReservatoriosSP {
    message: string;
    author: string;
}

interface IRetorno {
    content: string;
    author: string
    time: string;
    isCharts: Array<{
        currentDate: string;
        reservatorios: string;
        total: string;
        infoGrafico: string;
    }>
}

async function RoboReservatoriosSP(socket: Socket, message: IRoboReservatoriosSP) {

    let time: Date = new Date()
    let year: number = time.getFullYear()
    let mouth: number = time.getMonth() + 1
    let day: number = time.getDate()

    let mensagem = (message.message.toLocaleLowerCase().replace(" ", ""))

    switch (mensagem) {

        case "sim":

            try {
                //rejeita uso de certificado ssl, mesmo sendo https
                const agent: any = new https.Agent({
                    rejectUnauthorized: false
                });

                let response = await axios({
                    method: 'get',
                    url: `https://mananciais.sabesp.com.br/api/Mananciais/ResumoSistemas/${year}-${mouth}-${day}`,
                    httpsAgent: agent
                })

                socket.emit("received_message_from_robo", {
                    content: `${message.author}. Abaixo está a situação atual dos reservatórios de SP`,
                    author: "ROBÔ - Reservatórios SP",
                    time: `${time.getHours()}:${time.getMinutes()}`,
                    isCharts: [
                        {
                            currentDate: response.data.ReturnObj.DataString,
                            reservatorios: response.data.ReturnObj.sistemas,
                            total: response.data.ReturnObj.total,
                            infoGrafico: response.data.ReturnObj.InfoGrafico
                        }
                    ]
                } as IRetorno)
            }
            catch (err) { }


            break

        case "não":
        case "nao":

            socket.emit("received_message_from_robo", {
                content: `OK. Se precisar das informações dos reservartórios, basta enviar "sim"`,
                author: "ROBÔ - Reservatórios SP",
                time: `${time.getHours()}:${time.getMinutes()}`,

            })
            break

        default:
            socket.emit("received_message_from_robo", {
                content: `Não entendi o que você precisa. Digite sim para receber informações ou não para encerrar a conversa !`,
                author: "ROBÔ - Reservatórios SP",
                time: `${time.getHours()}:${time.getMinutes()}`,

            })
            break

    }
}

export { RoboReservatoriosSP }