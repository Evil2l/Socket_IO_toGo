
//SOCKET IO
var socket =  io();

//  listener to connect event
socket.on('connect', function () {
    console.log('Connected to server');

    // event emitter to send smt to server from client
    socket.emit('createMessage', {
        author: 'Jack',
        text: 'Not a spam, few AD pages',
        receivedAt: new Date()
    })
});

socket.on('disconnect', function () {
    console.log('Disconnected from server');
});

// event listener to get it from server
socket.on('newMessage', function (email) {
    console.log(JSON.stringify(email))
});