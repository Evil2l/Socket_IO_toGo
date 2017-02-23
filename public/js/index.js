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
    var li = $('<li></li>');
    li.text(`${message.author}: ${message.text}`);

    $('#message-list').append(li);
});

socket.on('newLocationMessage', function(message){
    var li = $('<li></li>');
    var a = $('<a target="_blank">My current location</a>');

    li.text(`${message.from}: `);
    a.attr('href', message.url);

    li.append(a);
    $('#message-list').append(li);

});

$('#message-form').on('submit', function(e){
    e.preventDefault();
    var messageTextbox = $('[name=message]');
    socket.emit(
        'createMessage',
        {
            author: 'User',
            text: messageTextbox.val()
        },
        function(){
            messageTextbox.val('');
        }
    )
});

var locationBtn = $('#send-location');
locationBtn.on('click', function(){
    if(!navigator.geolocation){
        return alert("Geolocation not supported")
    }
    locationBtn.attr('disabled', 'disabled').text('Sending location...');
    navigator.geolocation
        .getCurrentPosition(function(position){
            locationBtn.removeAttr('disabled').text('Send location');
            socket.emit('createLocationMessage', {
                lat: position.coords.latitude,
                lon: position.coords.longitude
            });

        }, function(){
            locationBtn.removeAttr('disabled').text('Send location');

            alert('Unable to fetch position');
        }
    )
});