/*
 * Module dependencies
 */
var express = require('express')
  , app = express()
  , server = require('http').createServer(app)
  , io = require('socket.io').listen(server)
  , fs = require('fs')
  , stylus = require('stylus')
  , nib = require('nib')
  , tictactoe = require('./tictactoe');

/*
 * Set Up
 */
function compile(str, path) {
  return stylus(str)
    .set('filename', path)
    .use(nib());
}
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.logger('dev'));
app.use(stylus.middleware(
  { src: __dirname + '/public'
  , compile: compile
  }
));
app.use(express.static(__dirname + '/public'));

server.listen(3000);

var game = null;

/*
 * Routes
 */
app.get('/', function (req, res) {
  res.render('index',
  { title : 'Home' }
  );
});

app.get('/game', function (req, res) {
  res.render('game',
  { title : 'TicTacToe' }
  );
  game = tictactoe.createGame();
});

app.get('/smartblock', function (req, res) {
  io.sockets.emit('call', { cli: req.query.cli });
  if (game != null)
    tictactoe.addPlayer(game, req.query.cli, io.sockets);
  res.sendfile('initialBlock.xml', { root: __dirname + '/public/xml/' });
});

app.get('/smartblock/answer', function (req, res) {
  res.sendfile('getTone.xml', { root: __dirname + '/public/xml/' });
});

app.get('/smartblock/tone', function (req, res) {
  if (req.query.tone == '*')
    io.sockets.emit('tone', { tone: 'star'});
  else {
    if (req.query.tone == '#')
      io.sockets.emit('tone', { tone: 'hash' });
    else
      io.sockets.emit('tone', { tone: req.query.tone });
  }
  res.sendfile('getTone.xml', { root: __dirname + '/public/xml/' });
});

/*
 * Sockets
 */
io.sockets.on('connection', function (socket) {

});