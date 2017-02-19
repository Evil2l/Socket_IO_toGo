//     Define and run socket.io module and it's methods with front-end
    // io() - method request from client to server, to open up web socket
    // and keep connection open

var socket =  io();

//  listener to connect event
socket.on('connect', function () {
    console.log('Connected to server');
});

socket.on('disconnect', function () {
    console.log('Disconnected from server');
});

// event listener to get it from server
socket.on('newMessage', function (message) {
    console.log(message);
});