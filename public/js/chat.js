//     Define and run socket.io module and it's methods with front-end
    // io() - method request from client to server, to open up web socket
    // and keep connection open

var socket =  io();

//
function scrollToBottom() {
        // Selectors
    var messages = $('#message-list');
    var newMessage = messages.children('li:last-child');
        // Heights
    var clientHeight = messages.prop('clientHeight');
    var scrollTop = messages.prop('scrollTop');
    var scrollHeight = messages.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight();

    if(clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight){
        messages.scrollTop(scrollHeight);
    }


}

//  listener to connect event
socket.on('connect', function () {
        // this one creates object with params from address line
        // keys - name attr from input element
        // value - everything input field will contain
    var params = $.deparam(window.location.search);

    socket.emit('join', params, function(err){
        if(err){
            alert(err);
            window.location.href = '/';
        } else {
            console.log(err);
        }
    });
});

socket.on('disconnect', function () {
    console.log('Disconnected from server');
});

socket.on('updateUserList', function (users) {
    var ol = $('<ol></ol>');
    console.log('1');

    users.forEach(function(user){
        ol.append($('<li></li>').text(user));
    });
    $('#users').html(ol);
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

    scrollToBottom();

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

    scrollToBottom();

});

$('#message-form').on('submit', function(e){
    e.preventDefault();
    var messageTextbox = $('[name=message]');
    socket.emit(
        'createMessage',
        {

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