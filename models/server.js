// servidor de express
const express = require('express');
const http= require('http');
const socketio= require('socket.io');
const path =require('path');
const Sockets = require('./sockets');
const cors = require('cors');

class Server{

    constructor(){
        this.app= express();
        this.port=process.env.PORT;

        //Http severes
        this.server=http.createServer(this.app);
        
        // configuracion del socket server
        this.io = socketio(this.server);
    }

    middlewares(){
        // desplegar directorio publico
        this.app.use(express.static( path.resolve(__dirname,  '../public')));

        // CORS
        this.app.use(cors());
    }

    configurarSockets(){
        new Sockets(this.io);
    }

    execute(){
    
    // Inicializar middlewares
    this.middlewares();

    // Incializarsockets

    this.configurarSockets();
    
    // Donde se conecta el server
    this.server.listen(this.port, () => {
    console.log("servidor corriendo en puerto:", this.port);
});
    }
}

module.exports = Server;