//  declarations

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
//  socket.io description
io.on('connection', (socket)=>{
    console.log('new user connected');

    // event emitter, sends data from server to client
    socket.emit('newMessage', {
        author: 'Kirh',
        text: 'Hey. Long time no see. How are you there',
        receivedAt: new Date()
    });

    // event listener, listen to custom event
    socket.on('createMessage', (message )=>{
        console.log('create message', message);
    });

    socket.on('disconnect', ()=>{
        console.log('User has just disconnected');
    });
});


server.listen(port, () => console.log(`March Hare ready to go on ${port}`));