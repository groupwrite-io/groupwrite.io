var socket = io();

$.postJSON = function (url, data, callback) {
    return jQuery.ajax({
        'type': 'POST',
        'url': url,
        'contentType': 'application/json',
        'data': JSON.stringify(data),
        'dataType': 'json',
        'success': callback
    });
};

socket.on('server:state', function (state) {
    pages.game.players = state.players;
});

var myNickname = '';
var socket = io();
