"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var http_1 = __importDefault(require("http"));
var socket_io_1 = require("socket.io");
var socketListeners_1 = require("./socketsListeners/socketListeners");
var app = (0, express_1.default)();
// app.use(cors)
app.get("/", function (req, res) {
    res.send('Hello World!');
});
var server = http_1.default.createServer(app);
// const io = new Server(server, {
//     cors: {
//         origin: ["http://localhost:3000", "http://192.168.15.143:3000"],
//         methods: ["GET,", "POST"]
//     }
// })
var io = new socket_io_1.Server(server, {
    cors: {
        origin: "*",
        methods: ["GET,", "POST"]
    }
});
//listeners dos Sockets
(0, socketListeners_1.Sockets)(io);
server.listen(8889, function () {
    console.log("Server is running 8889");
});
