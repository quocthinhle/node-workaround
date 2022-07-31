/***
 * You can use: socker.io-redis, it already built an adapter for us using pubsub redis,
 * But I implement a pubsub redis myself, so I just simply use socket.io for a connection between server and client
 */
const server = require('../../http-server');
const { Server } = require('socket.io');
const io = new Server(server);

class SocketHelper {
    constructor() {

    }

    init() {

    }

    emit() {

    }

    listen() {
        
    }
}