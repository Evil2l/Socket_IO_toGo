//  declarations of modules
const express = require('express');
const app = express();
const socketIo = require('socket.io');

//  node build-in modules
const http = require('http');
const path = require('path');

// variable that saves the path to front-end folder
const publicPath = path.join(__dirname, '../public');
// variable that check if
const port = process.env.PORT || 5500;
// create a server using http library for socketIo
let server = http.createServer(app);
// that how we define our WebSocket server
let io = socketIo(server);

//  outside modules and it's methods
const {generateMessage} = require('./utils/message');


//  server middleware
    // shows to server where to find static files, in this case front-end files
app.use(express.static(publicPath));
//  socket.io description
io.on('connection', (socket)=>{

    console.log('new user connected');

    // emit - event creation
    socket.emit('newMessage', generateMessage('Bill', 'Welcome to chat app'));

    // .broadcast creates event which will be visible to everyone but that socket
    socket.broadcast.emit('newMessage', generateMessage('Bill','New user joined'));

    // event listener on socket scope, listen to custom event
    socket.on('createMessage', (message, callback )=>{

        console.log('create message', message);

        // event emitter(start event) on every connection
        io.emit('newMessage', generateMessage(message.author,message.text));
        callback('This answer from server, create message heard');
    });

    socket.on('disconnect', ()=>{
        console.log('User has just disconnected');
    });
});


server.listen(port, () => console.log(`March Hare ready to go on ${port}`));