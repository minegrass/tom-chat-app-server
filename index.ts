import express from 'express';
const app = express();
import http from 'http';
import { Server } from 'socket.io';

const server = http.createServer(app);
const io = new Server(server,{
    cors: {
        origin:"http://localhost:3000",
        methods:["GET","POST"],
    }
})