/**
 * Module dependencies.
 */

var app = require('./dev-server.js')
var debug = require('debug')('writing.io:server');
var http = require('http');
var assert = require('assert')
var opn = require('opn')

/**
 * Create HTTP server.
 */

var server = http.createServer(app);

var io = require('socket.io')(server);
var State = require('../api/state')

assert(app.session)
var sharedsession = require("express-socket.io-session");
io.use(sharedsession(app.session, {
  autoSave: true
}));

console.log("Starting socket.io");
io.on('connection', function (socket) {
  console.log('a user connected');

  socket.on('disconnect', function () {
    if (socket.handshake.session.playerId) {
      var playerId = socket.handshake.session.playerId
      var nickname = socket.handshake.session.nickname
      console.log(`socket disconnected, playerId=${playerId}, nickname=${nickname}`);
      State.removePlayer(playerId)
      io.emit('server:state')
    } else {
      console.log('socket disconnected');
    }
  });
});
console.log("Successfully Started socket.io");

/**
 * Listen on provided port, on all network interfaces.
 */
var port = app.get('port')
server.listen(port, function (err) {
  if (err) {
    console.log(err)
    return
  }

  // when env is testing, don't need open it
  if (process.env.NODE_ENV !== 'testing') {
    var uri = 'http://localhost:' + port
    opn(uri)
  }
})
console.log(`Server listening on port ${port}`)

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

module.exports.test = 'test';
module.exports.io = io;
