"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoboIMC = void 0;
function RoboIMC(socket, message) {
    var time = new Date();
    // console.log("Received Robo IMC")
    switch (message.message.toLowerCase()) {
        case "não":
        case "nao":
            socket.emit("received_message_from_robo", {
                content: "OK ".concat(message.author, ". Se precisar de alguma informa\u00E7\u00E3o relacionado ao seu IMC \u00E9 s\u00F3 digitar sim a qualquer momento :)"),
                author: "ROBÔ - IMC",
                time: "".concat(time.getHours(), ":").concat(time.getMinutes())
            });
            break;
        case "sim":
            socket.emit("received_message_from_robo", {
                content: "Ol\u00E1 ".concat(message.author, ". Tudo bem ? \n\n                Vamos saber com est\u00E1 seu \"\u00CDndice de Massa Corporal ?\""),
                author: "ROBÔ - IMC",
                time: "".concat(time.getHours(), ":").concat(time.getMinutes())
            });
            socket.emit("received_message_from_robo", {
                content: "".concat(message.author, ". Digite sua Altura e peso. \n Ex: 1.85-80"),
                author: "ROBÔ - IMC",
                time: "".concat(time.getHours(), ":").concat(time.getMinutes())
            });
            break;
        default:
            //se nem sim e nem não, irá tentar identificar se mandou o peso e a altura
            try {
                //Replace: se vier virgula, substitui pelo ponto
                //split: dividi a string em 1 array de duas casas separando pelo traço
                //faz um map nessas 2 arrays e a transforma em numero com 2 dígitos após o ponto
                var dados = message.message.replace(",", ".")
                    .split("-")
                    .map(function (result) { return Number(result).toFixed(2); });
                if (dados.length === 2 && !isNaN(dados[0]) && !isNaN(dados[1])) {
                    //se de fato der 2 indices, e ambos resultados forem numeros
                    var imc = Number(dados[1] / (dados[0] * dados[0])).toFixed(2);
                    socket.emit("received_message_from_robo", {
                        content: "Sua Altura \u00E9 de ".concat(dados[0], " cm e seu peso \u00E9 ").concat(dados[1], " kg"),
                        author: "ROBÔ - IMC",
                        time: "".concat(time.getHours(), ":").concat(time.getMinutes())
                    });
                    socket.emit("received_message_from_robo", {
                        content: "Seu IMC \u00E9 de ".concat(imc),
                        author: "ROBÔ - IMC",
                        time: "".concat(time.getHours(), ":").concat(time.getMinutes())
                    });
                    socket.emit("received_message_from_robo", {
                        content: "Esse \u00E9 um dado para saber melhor onde voc\u00EA se encaixa",
                        author: "ROBÔ - IMC",
                        time: "".concat(time.getHours(), ":").concat(time.getMinutes()),
                        image: "https://www.ricardogozzano.com.br/wp-content/uploads/2020/03/tabela_imc-1024x726.png"
                    });
                }
                else {
                    UnknownMessage();
                }
            }
            catch (error) {
                // console.log(error)
                UnknownMessage();
            }
            break;
    }
    function UnknownMessage() {
        socket.emit("received_message_from_robo", {
            content: "Puxa ".concat(message.author, ". N\u00E3o entendi bem o que voc\u00EA quis dizer "),
            author: "ROBÔ - IMC",
            time: "".concat(time.getHours(), ":").concat(time.getMinutes())
        });
        socket.emit("received_message_from_robo", {
            content: "Digite sua Altura e peso. \n Ex: 1.85-80. ",
            author: "ROBÔ - IMC",
            time: "".concat(time.getHours(), ":").concat(time.getMinutes())
        });
    }
}
exports.RoboIMC = RoboIMC;
