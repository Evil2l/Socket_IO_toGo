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
    var li = $('<li></li>');
    li.text(`${message.author}: ${message.text}`);

    $('#message-list').append(li);
});


$('#message-form').on('submit', function(e){
    e.preventDefault();
    socket.emit(
        'createMessage',
        {
            author: 'User',
            text: $('[name=message]').val()
        },
        function(){}
    )
});