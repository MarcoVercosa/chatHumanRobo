"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var https_1 = __importDefault(require("https"));
var socket_io_1 = require("socket.io");
var fs_1 = __importDefault(require("fs"));
var path = require("path");
var socketListeners_1 = require("./socketsListeners/socketListeners");
var app = (0, express_1.default)();
// app.use(cors)
var options = {
    key: fs_1.default.readFileSync(path.resolve(__dirname, "../security/certificado.key")),
    cert: fs_1.default.readFileSync(path.resolve(__dirname, "../security/certificado.cert"))
};
var server = https_1.default.createServer(options, app);
app.get("/", function (req, res) {
    res.send('Hello World!');
});
var io = new socket_io_1.Server(server, {
    cors: {
        origin: "*",
        methods: ["GET,", "POST"]
    }
});
//chama função ativando os listeners dos Sockets
(0, socketListeners_1.Sockets)(io);
// server.listen(8889, () => {
//     console.log("Server is running 8889");
// })
server.listen(443, function () {
    console.log("Server is running 443");
});
