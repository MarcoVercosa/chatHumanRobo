"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sockets = void 0;
var functionUserConnected_1 = require("./functionsSockets/functionUserConnected");
var functionRoboIMC_1 = require("./functionsSockets/functionRoboIMC");
var functionRoboReservatoriosSP_1 = require("./functionsSockets/functionRoboReservatoriosSP");
var functionCreateChatPrivate_1 = require("./functionsSockets/functionCreateChatPrivate");
var functionSendMessageToPrivate_1 = require("./functionsSockets/functionSendMessageToPrivate");
var functionCreateRoom_1 = require("./functionsSockets/functionCreateRoom");
var functionJoinRoom_1 = require("./functionsSockets/functionJoinRoom");
var store = {};
//var para armazenar id e seus respectivos userNames
//a var é composta por obj socket.id:userName
//ex: 389389e9cdc8cdc8dcd:Marco vercosa
var storeRooms = {};
//var para armazenar id e seus respectivos rooms
//a var é composta por obj roomName:socket.id:
//ex: NewRoom:2j32k32323kknjjnj3
function Sockets(io) {
    var _this = this;
    //ao Carregar a página de login, o socket ja será conectado
    io.on("connection", function (socket) {
        console.log("User Connected", socket.id);
        //Tela de login - Ao clicar no botao entrar
        //armazenar id e seus respectivo userName
        socket.on("join_user_idSocket", function (data) {
            console.log("join_user_idSocket");
            console.log(store);
            (0, functionUserConnected_1.UserConnected)(socket, store, data);
        });
        //checa se o id ou user existem, devolve as info para o solicitante
        // para que o client crie um chat no navegador
        // e envia para o destinatario a solicitaçao para criar um chat no navegador e notificá-lo
        socket.on("create_chat_private_server", function (data) {
            (0, functionCreateChatPrivate_1.CreateChatPrivateServer)(socket, data, store);
        });
        //conversa com unica pessoa - Chat Privado
        socket.on("send_message_to_private", function (message) {
            (0, functionSendMessageToPrivate_1.SendMenssageToPrivate)(socket, message);
        });
        //cria uma sala
        //gera um ID por fora do socket.io, relacionao ao nome e devolve para o solicitante
        socket.on("create_room", function (data) {
            (0, functionCreateRoom_1.CreateRoom)(data, storeRooms, socket);
        });
        //adiciona o usuario a uma sala já criada
        //checka primeiro se a sala já existe
        //devolve as infos para o client criar a janela de conversa do grupo
        //envia para todos da sala a notificação do novo participante
        socket.on("join_room", function (data) {
            (0, functionJoinRoom_1.JoinRoom)(data, storeRooms, socket);
        });
        //enviar mensagem a todos da sala
        socket.on("send_message_to_chat_room", function (data) {
            socket.in(data.destination).emit("received_message_room", data);
        });
        socket.on("send_message_to_robo_imc", function (data) {
            // console.log("ROBO IMC")
            (0, functionRoboIMC_1.RoboIMC)(socket, data);
        });
        socket.on("send_message_to_robo_reservatorios_sp", function (data) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                (0, functionRoboReservatoriosSP_1.RoboReservatoriosSP)(socket, data);
                return [2 /*return*/];
            });
        }); });
        //disconectar
        socket.on("disconnect", function () {
            //deleta o id do usuário na variavel store
            delete store[socket.id];
            console.log("User Disconnecteddd", socket.id);
            console.log(store);
        });
    });
}
exports.Sockets = Sockets;
