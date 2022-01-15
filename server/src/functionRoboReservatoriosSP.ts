import axios from "axios"
import https from "https"

async function RoboReservatoriosSP(socket: any, message: any) {


    switch (message.message.toLowerCase()) {

        case "sim":

            try {
                let date = new Date()
                let year = date.getFullYear()
                let mouth = date.getMonth() + 1
                let day = date.getDate()
                console.log(date + "-" + mouth + "-" + year)

                //rejeita uso de certificado ssl, mesmo sendo https
                const agent = new https.Agent({
                    rejectUnauthorized: false
                });

                let response = await axios({
                    method: 'get',
                    url: `https://mananciais.sabesp.com.br/api/Mananciais/ResumoSistemas/${year}-${mouth}-${day}`,
                    httpsAgent: agent
                })

                console.log(response)
            }
            catch (err) { }


            break

        case "não":
        case "nao":

            break

        default:

            break

    }
}

export { RoboReservatoriosSP }