/**
 * Module dependencies.
 */

var app = require('./app');
var debug = require('debug')('writing.io:server');
var http = require('http');

/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

/**
 * Create HTTP server.
 */

var server = http.createServer(app);

var State = require('./state');

var io = require('socket.io')(server);
console.log("Starting socket.io");
io.on('connection', function (socket) {
    console.log('a user connected');
    socket.on('client:login', function (nickname) {
        console.log('login: nickname= ' + nickname);
// todo: replace with setter addPlayer
        State.state.players.push({
            nickname: nickname
        });
        io.emit('server:state', State.state);
    });
    socket.on('client:quit', function (nickname) {
        console.log('quit: nickname= ' + nickname);
        // remove me from the list of players
        var myindex = state.players.findIndex(function (element) {
            return element.nickname == nickname;
        })
        console.assert(myindex !== -1, "Failed to find current player");
        State.state.players.splice(myindex, 1);
        io.emit('server:state', State.state);
    });
    socket.on('disconnect', function () {
        console.log('user disconnected');
    });
});

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    var bind = typeof port === 'string' ?
        'Pipe ' + port :
        'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string' ?
        'pipe ' + addr :
        'port ' + addr.port;
    debug('Listening on ' + bind);
}

module.exports = {
    io : io
};