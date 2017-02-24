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
        //  use moment library to format time or date
    var formattedTime = moment(message.createdAt).format('h:mm a');

    //  select our template wrap
    var template = $('#message-template').html();
        // use mustache method from mustache library to render and define input data
    var html = Mustache.render(template,{
        text: message.text,
        author: message.author,
        time: formattedTime
    });

    $('#message-list').append(html);

});

socket.on('newLocationMessage', function(message){
    var formattedTime = moment(message.createdAt).format('h:mm a');
//  select our template wrap
    var template = $('#location-template').html();
    // use mustache method from mustache library to render and define input data
    var html = Mustache.render(template,{
        url: message.url,
        author: message.author,
        time: formattedTime
    });



    $('#message-list').append(html);
    // var li = $('<li></li>');
    // var a = $('<a target="_blank">My current location</a>');
    //
    // li.text(`${message.from} ${formattedTime}: `);
    // a.attr('href', message.url);
    //
    // li.append(a);
    // $('#message-list').append(li);

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