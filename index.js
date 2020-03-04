const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const routes = require('./routes');
const cors = require('cors');

const socketio = require('socket.io');
const http = require('http');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

mongoose.connect('mongodb://localhost:27017/chatbot-telegram', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

io.on('connection', socket => {
    console.log('Usuario conectado', socket.id);

    socket.emit('hello', 'world');
});

app.use((request, response, next) => {
    request.io = io;

    return next();
});

app.use(cors());
app.use(express.json());
app.use(routes);

server.listen(3333);