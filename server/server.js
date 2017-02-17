// declarations

const express = require('express');
const app = express();
const http = require('http');
const path = require('path');
const socketIo = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 5500;
let server = http.createServer(app);
let io = socketIo(server);


//  server middleware

app.use(express.static(publicPath));

io.on('connection', (socket)=>{
    console.log('new user connected');
    console.log(socket);
    socket.on('disconnect', ()=>{
        console.log('User has just disconnected');
    });
});


server.listen(port, () => console.log(`March Hare ready to go on ${port}`));