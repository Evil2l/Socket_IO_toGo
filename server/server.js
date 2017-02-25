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
const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');

let users = new Users();

//  server middleware
    // shows to server where to find static files, in this case front-end files
app.use(express.static(publicPath));
//  socket.io description
io.on('connection', (socket)=>{

    console.log('new user connected');


    socket.on('join', (params, callback)=>{
        if(!isRealString(params.name) || !isRealString(params.room)){
            return callback('Name and room are required!')
        }

        socket.join(params.room);

        users.removeUser(socket.id);

        users.addUser(socket.id, params.name, params.room);

        io.to(params.room).emit('updateUserList', users.getUserList(params.room));

        // emit - event creation only inside socket
        socket.emit('newMessage', generateMessage('Admin', 'Welcome to chat app'));

        // .broadcast creates event which will be visible to everyone but that socket
        socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin',`${params.name} has joined`));

        callback();
    });

    // event listener on socket scope, listen to custom event
    socket.on('createMessage', (message, callback )=>{
        let user = users.getUser(socket.id);

        if(user && isRealString(message.text)){
            // event emitter(start event) on every connection
            io.to(user.room).emit('newMessage', generateMessage(user.name, message.text));

        }

        callback();
    });

    socket.on('createLocationMessage', (cords)=>{
        let user = users.getUser(socket.id);

        if(user) {

            io.to(user.room)
                .emit(
                    // name of event
                    'newLocationMessage',
                    // callback
                    generateLocationMessage(user.name, cords.lat, cords.lon)
                );
        }
    });


    socket.on('disconnect', ()=>{
        var user =users.removeUser(socket.id);

        if(user){
            io.to(user.room).emit('updateUserList', users.getUserList(user.room));
            io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left.`));
        }

    });


});


server.listen(port, () => console.log(`March Hare ready to go on ${port}`));